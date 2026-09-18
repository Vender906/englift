const fs = require('fs');
const path = require('path');
const { JSDOM } = require('./node_modules/jsdom');
const { APP } = require('./_boot');

const html = fs.readFileSync(path.join(APP, 'index.html'), 'utf8');
const dom = new JSDOM(html, { url: 'http://localhost:8000/#/', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom; const doc = window.document;
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
window.speechSynthesis = { cancel() {}, speak() {}, getVoices: () => [] };
window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
window.HTMLElement.prototype.scrollIntoView = function () {};
window.HTMLElement.prototype.scrollTo = function () {};
window.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve({ responseData: { translatedText: 'онлайн-переклад' } }) });

const errs = [];
const ok = (c, m) => { console.log((c ? '✓' : '✗') + ' ' + m); if (!c) errs.push(m); };
window.addEventListener('error', e => errs.push('window error: ' + e.message));
const ev = f => { try { window.eval(fs.readFileSync(path.join(APP, f), 'utf8')); } catch (e) { errs.push(f + ' THREW: ' + e.stack); } };

const bundle = ['js/themes.js', "window.FLThemes.apply('dark', true);", 'js/core.js', 'js/data.js', 'js/lexis/verbs-data.js', 'js/lexis/nouns-data.js', 'js/lexis/adjs-data.js', 'js/lexis/advs-data.js', 'js/reader.js', 'js/lexis.js', 'js/grammar.js', 'js/app.js']
  .map(f => f.endsWith('.js') && !f.includes('(') ? fs.readFileSync(path.join(APP, f), 'utf8') : f).join('\n;\n');
try { window.eval(bundle); } catch (e) { errs.push('BUNDLE THREW: ' + e.stack); }

const go = h => { window.location.hash = h.replace(/^#/, ''); window.dispatchEvent(new window.HashChangeEvent('hashchange')); };
const click = el => el && el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, clientX: 100, clientY: 100 }));
const key = k => doc.dispatchEvent(new window.KeyboardEvent('keydown', { key: k, bubbles: true }));
const tick = () => new Promise(r => setTimeout(r, 80));
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];

(async () => {
  ok(!errs.length, 'app boots without errors ' + errs.join(' | '));
  ok($$('#nav [data-hash="#/read"]').length === 1, 'nav has «Читання»');
  ok(/Читання/.test($('#view').textContent) && /135 адаптованих книг/.test($('#view').textContent), 'dashboard shows reading zone card');

  // library loads data lazily
  ev('js/reader/books-data.js');
  go('#/read'); await tick();
  ok($$('.rd-book').length === 135, 'library lists 135 books (got ' + $$('.rd-book').length + ')');
  ok($$('#rd-levels [data-level]').length === 5 && $$('#rd-genres [data-genre]').length === 11, 'level & genre filter chips');
  click($('#rd-levels [data-level="B1"]'));
  ok($$('.rd-book').length === 71, 'B1 filter → 71 books (got ' + $$('.rd-book').length + ')');
  click($('#rd-levels [data-level="A2"]'));
  click($('#rd-genres [data-genre="horror"]'));
  const hb = $$('.rd-book').length;
  ok(hb === 4, 'A2 + horror → 4 books (' + hb + ')');
  const cnt = $('#rd-levels [data-level="B1"] .rd-cnt').textContent;
  ok(cnt === '0', 'chip counts respect other filter (B1 horror = ' + cnt + ')');
  click($('#rd-levels [data-level=""]')); click($('#rd-genres [data-genre=""]'));
  const s = $('#rd-search'); s.value = 'andersen'; s.dispatchEvent(new window.Event('input', { bubbles: true }));
  ok($$('.rd-book').length >= 1, 'search by author works (' + $$('.rd-book').length + ')');
  s.value = ''; s.dispatchEvent(new window.Event('input', { bubbles: true }));

  // reader
  go('#/read/ugly-duckling'); await tick();
  const sents = $$('.rd-text .sent').length;
  ok(sents > 100, 'book renders sentences (' + sents + ')');
  ok($$('.rd-text .chapter-title').length > 1 && $$('.rd-text .book-para').length > 5, 'chapters & paragraphs rendered');
  ok(!!$('.rd-text .sent.active') && /Речення 2 \//.test($('#rd-info').textContent), 'opens on first real sentence (skips chapter title)');
  ok(/Речення \d+ \/ \d+/.test($('#rd-info').textContent), 'page info: ' + $('#rd-info').textContent);

  const w = $$('.rd-text .wd').find(x => x.dataset.w === 'meadow');
  click(w); await tick();
  ok($('#rd-tooltip') && !$('#rd-tooltip').hidden && /луг/.test($('#rd-tooltip').textContent), 'tap word → book translation tooltip (' + ($('#rd-tooltip') || {}).textContent + ')');
  const w2 = $$('.rd-text .wd').find(x => x.dataset.w.toLowerCase() === 'the');
  click(w2); await tick();
  ok(!$('#rd-tooltip').hidden, 'fallback dictionary word tooltip: ' + $('#rd-tooltip').textContent.slice(0, 40));
  const w3 = $$('.rd-text .wd').find(x => x.dataset.w === 'Egyptian');
  click(w3); await tick(); await tick();
  ok(/онлайн-переклад|єгипет/i.test($('#rd-tooltip').textContent), 'unknown word → online translation (' + $('#rd-tooltip').textContent.slice(0, 50) + ')');
  click(doc.body); ok($('#rd-tooltip').hidden, 'outside click hides tooltip');

  const firstIdx = $('.rd-text .sent').id.slice(2);
  click($('.rd-text [data-uk="' + firstIdx + '"]'));
  ok(!$('#uk-' + firstIdx).hidden, '💬 shows sentence translation');
  click($('#rd-all-uk'));
  ok($$('.rd-text .uk-inline').every(e => !e.hidden), '🇺🇦 all translations on');
  click($('#rd-all-uk'));
  ok($$('.rd-text .uk-inline').every(e => e.hidden), '🇺🇦 all translations off');

  const fsBefore = $('#rd-text').className;
  click($('[data-act="font+"]'));
  ok($('#rd-text').className !== fsBefore && window.localStorage.getItem('reader_font_size') === '2', 'A+ font size persisted');
  click($('[data-act="width-"]'));
  ok($('#rd-frame').classList.contains('w-narrow') && window.localStorage.getItem('reader_width') === '0', '⇤ width persisted');
  click($('#rd-hl'));
  ok($('#rd-root').classList.contains('no-highlights') && window.localStorage.getItem('reader_hl_off') === '1', '🎨 highlights off persisted');
  click($('#rd-hl'));
  click($('#rd-legend-btn'));
  ok(!$('#rd-legend').hidden && window.localStorage.getItem('reader_legend_on') === '1', '🎯 legend shown & persisted');
  click($('#rd-themes-btn'));
  ok(!$('#rd-theme-picker').hidden && $$('.rd-swatch').length === 8, '🖌️ reader theme picker with 8 themes');
  click($('.rd-swatch[data-rtheme="sepia"]'));
  ok($('#rd-root').dataset.rtheme === 'sepia' && $('#rd-root').dataset.rmode === 'dark' && window.localStorage.getItem('reader_theme') === 'sepia', 'reader theme sepia applied');

  const hlSpans = $$('.rd-text [class^="hl-"]').length;
  console.log('  highlight spans in book:', hlSpans);

  const info1 = $('#rd-info').textContent;
  click($('[data-act="next"]'));
  const info2 = $('#rd-info').textContent;
  ok(info1 !== info2, 'Далі › moves +10: ' + info2);
  key('ArrowLeft');
  ok($('#rd-info').textContent === info1, '← back returns');
  key('ArrowRight');
  ok($('#rd-info').textContent === info2, '→ key forward');
  const act = $('.rd-text .sent.active').id.slice(2);
  key('t');
  ok(!$('#uk-' + act).hidden, 'T toggles active translation');
  const sp = $$('.rd-text [data-speak]')[5];
  click(sp);
  ok($('.rd-text .sent.active').id === 's-' + sp.dataset.speak, '🔊 on sentence makes it active');
  ok(JSON.parse(window.localStorage.getItem('reader_progress'))['ugly-duckling'] == sp.dataset.speak, 'progress saved to reader_progress');

  // finish the book
  const xp0 = JSON.parse(window.localStorage.getItem('fluentlab_v2')).xp || 0;
  for (let i = 0; i < 200 && !$('#rd-m'); i++) click($('[data-act="next"]'));
  ok(!!$('#rd-m') && /Прочитано/.test($('#rd-m').textContent), 'finish modal «Прочитано!» shown');
  ok((JSON.parse(window.localStorage.getItem('fluentlab_v2')).xp || 0) === xp0 + 50, '+50 XP for finished book');
  ok(JSON.parse(window.localStorage.getItem('reader_done')).includes('ugly-duckling'), 'book marked done');
  ok(!!$('#rd-m a[href^="#/read/"]'), '«Наступна» button present');
  click($('#rd-m a[data-close]'));

  go('#/read'); await tick();
  ok(/Прочитано/.test($$('.rd-book')[0].textContent) || $$('.rd-book').some(b => /Прочитано/.test(b.textContent)), 'library shows ✓ Прочитано badge');
  go('#/read/does-not-exist'); await tick();
  ok(/не знайдено/i.test($('#view').textContent), 'unknown book → 404');

  // themes
  const T = window.FLThemes;
  ok(T.list.length === 25, 'themes: ' + T.list.length + ' (' + T.list.filter(t => t.group === 'dynamic').length + ' dynamic)');
  for (const t of T.list) {
    try { T.apply(t.id, true); } catch (e) { errs.push('apply ' + t.id + ': ' + e.message); }
    if (doc.documentElement.dataset.theme !== t.id || !doc.documentElement.style.getPropertyValue('--a1')) errs.push('theme vars ' + t.id);
    const fx = (t.fx || {}).css;
    if (fx && !$('#bg-fx i')) errs.push('fx layers missing ' + t.id);
  }
  ok(!errs.some(e => /apply|theme vars|fx layers/.test(e)), 'all themes apply with vars & fx layers');
  go('#/');
  click($('#theme-toggle'));
  ok($$('.tm-card').length === 25, 'gallery shows 25 theme cards');
  click($('.tm-card[data-theme-id="aurora"]'));
  ok(JSON.parse(window.localStorage.getItem('fluentlab_v2')).settings.theme === 'aurora' && doc.documentElement.dataset.theme === 'aurora', 'pick aurora → saved & applied');
  ok($$('#bg-fx .fx-aurora').length === 3, 'aurora layers present');
  const m = $('#tm-motion'); m.checked = false; m.dispatchEvent(new window.Event('change', { bubbles: true }));
  ok(doc.documentElement.classList.contains('no-motion') && JSON.parse(window.localStorage.getItem('fluentlab_v2')).settings.motion === false, 'motion toggle off');
  click($('#tm-close'));
  click($('#settings-btn'));
  ok(/Північне сяйво/.test($('#modal-root').textContent), 'settings shows current theme');
  click($('#set-theme'));
  ok($$('.tm-card').length === 25, 'settings → gallery');
  click($('#tm-close'));
  ok(/Налаштування/.test($('#modal-root').textContent), 'closing gallery returns to settings');

  // other routes still fine
  for (const r of ['#/grammar', '#/grammar/pronouns/pron-personal', '#/vocab/verbs', '#/listen', '#/challenge']) {
    go(r); if ($('#view').textContent.trim().length < 40) errs.push('route ' + r);
  }
  ok(!errs.some(e => e.startsWith('route')), 'existing routes still render');

  console.log('---');
  if (errs.length) { console.log('FAILURES:\n' + errs.join('\n')); process.exit(1); }
  console.log('INTEGRATION OK ✓');
  process.exit(0);
})();
