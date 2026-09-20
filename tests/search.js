/* Глобальний пошук: індекс, ранжування, клавіатура, переходи в розділи */
const fs = require('fs');
const path = require('path');
const { boot, APP } = require('./_boot');
const { window, doc, errs, go, ok, click } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const key = (el, k, opts) => el.dispatchEvent(new window.KeyboardEvent('keydown', Object.assign({ key: k, bubbles: true, cancelable: true }, opts || {})));
const type = v => { const i = $('#srch-input'); i.value = v; i.dispatchEvent(new window.Event('input', { bubbles: true })); };

(async () => {
  try {
    /* індекс вантажиться ліниво — у тесті підключаємо вручну */
    window.eval(fs.readFileSync(path.join(APP, 'js/search/index-data.js'), 'utf8'));
    const IDX = window.SEARCH_INDEX;

    /* ---------- дані індексу ---------- */
    ok(IDX.v === 1 && Array.isArray(IDX.items) && Array.isArray(IDX.pool), 'index has version, pool and items');
    ok(IDX.items.length > 11000, IDX.items.length + ' entries in the index');
    ok(IDX.items.every(r => r[0] && typeof r[2] === 'number' && IDX.pool[r[3]]), 'every entry has a term, a kind and a route');
    const kinds = new Set(IDX.items.map(r => r[2]));
    ok([0, 1, 2, 3, 4, 5].every(k => kinds.has(k)), 'all six kinds are present: words, phrases, pronunciation, grammar, books, sections');
    ok(IDX.items.some(r => r[5] === 1), 'adult entries are flagged');
    const hashes = IDX.items.map(r => IDX.pool[r[3]]);
    ok(hashes.every(h => h.startsWith('#/')), 'every route is an in-app hash link');

    /* індекс не застарів: кількість слів збігається з лічильниками словника */
    const meta = window.LEX_META;
    const wantWords = Object.keys(meta).reduce((n, k) => n + meta[k].total, 0);
    const haveWords = IDX.items.filter(r => r[2] === 0).length;
    ok(haveWords === wantWords, 'index covers every dictionary word (' + haveWords + ' of ' + wantWords + ') — rebuild with tools/build-search-index.js if this fails');

    await window.FLSearch.ensure();

    /* ---------- ранжування ---------- */
    const top = q => window.FLSearch.search(q, '')[0];
    ok(top('decision').r.t.toLowerCase() === 'decision', 'exact English match wins: decision');
    const uaHits = window.FLSearch.search('рішення', '').map(o => o.r.t.toLowerCase());
    ok(uaHits[0] === 'solution' && uaHits.includes('decision'),
      'Ukrainian query finds English words, exact gloss first (' + uaHits.slice(0, 3).join(', ') + ')');
    ok(top('outta').r.t === 'outta', 'finds a reduction by its short form');
    ok(top('present perfect').r.t.toLowerCase().includes('present perfect'), 'multi-word query works');
    const books = window.FLSearch.search('ugly duckling', '');
    ok(books.some(o => o.r.k === 4 && /Ugly Duckling/i.test(o.r.t)), 'finds a book by its title');
    ok(window.FLSearch.search('вимова', '').some(o => o.r.k === 5), 'finds a section by its Ukrainian name');
    const filtered = window.FLSearch.search('water', '2');
    ok(filtered.length > 0 && filtered.every(o => o.r.k === 2), 'filter narrows results to one kind');
    ok(window.FLSearch.search('zzzqqq', '').length === 0, 'no false hits for nonsense');
    /* 18+ слова приховані, доки режим вимкнено */
    const adultTerm = IDX.items.filter(r => r[5] === 1)[0][0];
    ok(window.FLSearch.search(adultTerm, '').every(o => !o.r.adult), 'adult entries stay hidden while 18+ is off');

    /* ---------- відкриття ---------- */
    go('#/'); await sleep(10);
    ok(!!$('#search-btn'), 'header has a search button');
    click($('#search-btn')); await sleep(10);
    ok(!!$('#srch-input') && window.FLSearch.isOpen(), 'clicking the button opens the palette');
    ok($$('.srch-chip').length === 7, 'filter chips are rendered');
    ok(/записів/.test($('.srch-foot-hint').textContent), 'footer shows the index size');

    type('decision'); await sleep(120);
    const items = $$('.srch-item[data-i]');
    ok(items.length > 1, 'results are listed (' + items.length + ')');
    ok(!!$('.srch-item.sel') && $('.srch-item.sel').dataset.i === '0', 'the first result is preselected');
    ok($$('.srch-group-head').length >= 1, 'results are grouped by kind');
    ok(/<mark>/i.test($('.srch-item').innerHTML), 'matches are highlighted');

    /* ---------- клавіатура ---------- */
    key($('#srch-input'), 'ArrowDown');
    ok($('.srch-item.sel').dataset.i === '1', 'ArrowDown moves the selection');
    key($('#srch-input'), 'ArrowUp');
    ok($('.srch-item.sel').dataset.i === '0', 'ArrowUp moves it back');
    key($('#srch-input'), 'Escape');
    ok(!$('#srch-input') && !window.FLSearch.isOpen(), 'Escape closes the palette');

    window.FLSearch.open();
    key(doc, 'k', { ctrlKey: true });
    ok(!window.FLSearch.isOpen(), 'Ctrl+K closes an open palette');
    key(doc, 'k', { ctrlKey: true }); await sleep(10);
    ok(window.FLSearch.isOpen(), 'Ctrl+K opens it again');
    ok($('#srch-input').value === 'decision', 'reopening keeps the previous query at hand');

    /* ---------- перехід за результатом ---------- */
    type('Present Perfect'); await sleep(120);
    const gram = state => $$('.srch-item[data-i]').find(el => /grammar/.test(el.getAttribute('href')));
    const target = gram();
    ok(!!target, 'a grammar topic is among the results');
    const href = target.getAttribute('href');
    click(target); await sleep(30);
    window.dispatchEvent(new window.HashChangeEvent('hashchange')); await sleep(20);
    ok(!window.FLSearch.isOpen(), 'palette closes after choosing a result');
    ok(window.location.hash === href, 'navigates to the chosen route (' + window.location.hash + ')');

    /* слово зі словника підставляється в пошук розділу */
    window.FLSearch.open();
    type('decision'); await sleep(120);
    const word = $$('.srch-item[data-i]').find(el => el.getAttribute('href').startsWith('#/vocab/'));
    ok(!!word, 'dictionary words are among the results');
    click(word); await sleep(30);
    window.dispatchEvent(new window.HashChangeEvent('hashchange')); await sleep(400);
    ok(/^#\/vocab\//.test(window.location.hash), 'opens the dictionary section');
    const lex = $('#lex-search');
    ok(!!lex && lex.value.toLowerCase() === 'decision', 'the word is put into the section search (' + (lex && lex.value) + ')');
    ok($$('.word-box, .lex-word, .wb').length > 0, 'the filtered word list is shown');

    /* ---------- нещодавні запити ---------- */
    window.FLSearch.open(''); await sleep(10);
    const rec = $$('.srch-recent');
    ok(rec.length > 0 && /decision|present perfect/i.test(rec.map(el => el.dataset.q).join(' ')), 'recent queries are remembered');
    click(rec[0]); await sleep(120);
    ok($('#srch-input').value === rec[0].dataset.q && $$('.srch-item[data-i]').length > 0, 'clicking a recent query repeats the search');
    key($('#srch-input'), 'Escape');

    /* ---------- «/» відкриває, але не заважає вводу ---------- */
    go('#/vocab/verbs'); await sleep(200);
    const box = $('#lex-search');
    if (box) {
      box.focus();
      key(box, '/');
      ok(!window.FLSearch.isOpen(), 'pressing / inside an input does not hijack typing');
    }
    key(doc.body, '/'); await sleep(10);
    ok(window.FLSearch.isOpen(), 'pressing / opens the search');
    key($('#srch-input'), 'Escape');
  } catch (e) { errs.push('TEST THREW: ' + e.stack); }

  console.log(errs.length ? 'FAILURES: ' + errs.join(' | ') : 'SEARCH OK ✓');
  process.exit(errs.length ? 1 : 0);
})();
