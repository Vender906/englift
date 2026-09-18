/* Перевірка тексту в Diary, тест на рівень, повна резервна копія, нові теми граматики */
const fs = require('fs');
const path = require('path');
const { boot, APP } = require('./_boot');
const { window, doc, errs, go, ok, click } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const input = (el, v) => { el.value = v; el.dispatchEvent(new window.Event('input', { bubbles: true })); };
const LS = k => { try { return JSON.parse(window.localStorage.getItem(k) || 'null'); } catch (e) { return null; } };

let downloaded = null, blobText = null;
window.URL.createObjectURL = b => { blobText = b; return 'blob:x'; };
window.URL.revokeObjectURL = () => {};
window.HTMLAnchorElement.prototype.click = function () { downloaded = this.download; };

(async () => {
  try {
    /* ---------- нові теми граматики ---------- */
    for (const [sub, n] of [['comparison', 3], ['adj-prep', 7], ['tags', 3], ['relative', 3], ['reported', 7]]) {
      go('#/grammar/' + sub);
      ok($$('.grid-cards .topic-card').length === n, sub + ': ' + n + ' topics on category page');
    }
    for (const r of ['#/grammar/comparison/comparison-structures', '#/grammar/tags/tags-reply', '#/grammar/relative/relative-advanced', '#/grammar/reported/reported-commands/practice', '#/grammar/adj-prep/adj-prep-meaning/practice']) {
      go(r);
      ok($('#view').textContent.trim().length > 60, 'renders ' + r);
    }

    /* ---------- Diary: перевірка тексту ---------- */
    window.eval(fs.readFileSync(path.join(APP, 'js/diary/diary-data.js'), 'utf8'));
    go('#/diary'); await sleep(50);
    const ta = $('#dy-text');
    input(ta, 'Yesterday i go to the park. I am agree that it is more better then me. She don’t like rain.');
    await sleep(800);
    const cnt = +$('#dy-check-count').textContent;
    ok(!$('#dy-check-count').hidden && cnt >= 4, 'live badge counts issues (' + cnt + ')');
    click($('#dy-check-btn'));
    ok(!$('#dy-check').hidden && $$('#dy-check .dy-issue').length === cnt, 'check panel lists issues');
    ok($$('#dy-check .dy-issue-topic').length >= 3 && $('#dy-check .dy-issue-topic').getAttribute('href').startsWith('#/grammar/'), 'issues link to grammar topics');
    ok(!!$('#dy-check mark'), 'context with highlighted fragment');
    const firstFix = $('#dy-check [data-cact="fix"]');
    const before = ta.value;
    click(firstFix);
    ok(ta.value !== before && LS('diary_draft_v1').text === ta.value, 'single fix applied & draft saved: ' + ta.value.slice(0, 40));
    click($('#dy-check [data-cact="show"]'));
    ok(ta.selectionEnd > ta.selectionStart, '«Показати» selects fragment');
    const fixAll = $('#dy-check [data-cact="fix-all"]');
    if (fixAll) click(fixAll);
    ok(/I agree/.test(ta.value) && /She doesn’t like/.test(ta.value) && /better than/.test(ta.value) && /Yesterday I/.test(ta.value), 'fix all: ' + ta.value);
    input(ta, 'I went to the park yesterday. It was lovely.');
    await sleep(800);
    ok($('#dy-check-count').hidden && /не знайдено/.test($('#dy-check').textContent), 'clean text → no issues');

    /* ---------- тест на рівень ---------- */
    go('#/');
    ok(/Тест рівня/.test($('#view').textContent) && /ще не проходив/.test($('#view').textContent), 'dashboard placement card');
    ok(!!$('#nav [data-hash="#/placement"]'), 'nav link «Тест рівня»');
    go('#/placement');
    ok(/30 питань/.test($('#view').textContent), 'placement intro');
    const Q = window.FLPlacement.QUESTIONS;
    const correctText = q => q.o[0];

    const answerAll = async pickCorrect => {
      go('#/placement/run');
      for (let i = 0; i < 30; i++) {
        const qText = $('#pl-card .q-text').textContent.replace('…', '___');
        const q = Q.find(x => x.q === qText);
        if (!q) throw new Error('question not found: ' + qText);
        const opts = $$('#pl-card .opt');
        const target = pickCorrect ? opts.find(o => o.textContent.slice(1) === correctText(q)) : opts.find(o => o.textContent.slice(1) !== correctText(q));
        click(target);
        await sleep(300);
      }
      window.dispatchEvent(new window.HashChangeEvent('hashchange'));
      await sleep(30);
    };

    const xp0 = (LS('fluentlab_v2') || {}).xp || 0;
    await answerAll(true);
    const r1 = LS('fluentlab_placement_v1');
    ok(r1 && r1.level === 'C1' && r1.correct === 30 && r1.mistakes.length === 0, 'all correct → C1 30/30');
    ok(((LS('fluentlab_v2') || {}).xp || 0) === xp0 + 30, '+30 XP once');
    ok(/C1/.test($('#view').textContent) && $$('.pl-bar i.ok').length === 5, 'result page with 5 passed bars');

    await answerAll(false);
    const r2 = LS('fluentlab_placement_v1');
    ok(r2.level === 'A1' && !r2.passedAny && r2.mistakes.length === 30, 'all wrong → A1 (not passed)');
    ok(((LS('fluentlab_v2') || {}).xp || 0) === xp0 + 30, 'no second XP reward');
    ok($$('.pl-topic').length > 3 && $$('.pl-mis').length === 30, 'mistake topics & review list');
    click($('[data-reader]'));
    ok(window.localStorage.getItem('reader_flt_level') === 'A2', 'books link sets reader level filter');

    /* skip button */
    go('#/placement'); click($('[data-start]')); go('#/placement/run');
    click($('#pl-card [data-skip]')); await sleep(120);
    ok(/2 \/ 30/.test($('.session-count').textContent), '«Не знаю» moves to next question');

    /* ---------- резервна копія ---------- */
    window.localStorage.setItem('diary_entries_v1', JSON.stringify([{ id: 'x', date: '2026-01-01', title: 'T', text: 'Hello world', words: 2 }]));
    window.localStorage.setItem('reader_done', JSON.stringify(['ugly-duckling']));
    window.localStorage.setItem('unrelated_key', 'keep-me');
    go('#/');
    click($('#settings-btn'));
    ok(!!$('#set-export') && !!$('#set-import'), 'settings has backup buttons');
    click($('#set-export'));
    ok(/^englift-backup-\d{4}-\d{2}-\d{2}\.json$/.test(downloaded || ''), 'export filename ' + downloaded);
    const text = await blobText.text();
    const payload = JSON.parse(text);
    ok(payload.app === 'EngLift' && payload.data.diary_entries_v1 && payload.data.reader_done && payload.data.fluentlab_placement_v1 && !payload.data.unrelated_key, 'export contains app keys only (' + payload.keys + ')');

    // змінюємо дані, потім відновлюємо
    window.localStorage.setItem('diary_entries_v1', '[]');
    window.localStorage.setItem('reader_extra_junk', '1');
    const importFile = new window.File([text], 'b.json', { type: 'application/json' });
    const inp = $('#set-import-file');
    Object.defineProperty(inp, 'files', { value: [importFile], configurable: true });
    inp.dispatchEvent(new window.Event('change', { bubbles: true }));
    await sleep(150);
    ok(!!$('#bk-m') && /Записів у щоденнику\s*1/.test($('#bk-m').textContent.replace(/\s+/g, ' ')) && /Книг прочитано\s*1/.test($('#bk-m').textContent.replace(/\s+/g, ' ')), 'import preview shows summary');
    click($('#bk-m [data-yes]'));
    ok(LS('diary_entries_v1').length === 1 && window.localStorage.getItem('reader_extra_junk') === null && window.localStorage.getItem('unrelated_key') === 'keep-me', 'import replaced app data, kept unrelated keys');

    // копія, зроблена ще під старою назвою FluentLab, теж відновлюється
    const legacy = JSON.stringify(Object.assign({}, payload, { app: 'FluentLab' }));
    click($('#settings-btn'));
    Object.defineProperty($('#set-import-file'), 'files', { value: [new window.File([legacy], 'old.json')], configurable: true });
    $('#set-import-file').dispatchEvent(new window.Event('change', { bubbles: true }));
    await sleep(150);
    ok(!!$('#bk-m'), 'legacy FluentLab backup is accepted');
    click($('#bk-m [data-no]'));

    // чужий файл і backup щоденника
    const bad = new window.File(['{"hello":1}'], 'x.json');
    click($('#settings-btn'));
    Object.defineProperty($('#set-import-file'), 'files', { value: [bad], configurable: true });
    $('#set-import-file').dispatchEvent(new window.Event('change', { bubbles: true }));
    await sleep(120);
    ok(/не резервна копія/.test($('#toast').textContent), 'rejects foreign json');
    const diaryOnly = new window.File(['{"entries":[]}'], 'd.json');
    Object.defineProperty($('#set-import-file'), 'files', { value: [diaryOnly], configurable: true });
    $('#set-import-file').dispatchEvent(new window.Event('change', { bubbles: true }));
    await sleep(120);
    ok(/лише щоденника/.test($('#toast').textContent), 'detects diary-only backup');
  } catch (e) { errs.push('TEST THREW: ' + e.stack); }

  console.log(errs.length ? 'FAILURES: ' + errs.join(' | ') : 'FEATURES OK ✓');
  process.exit(errs.length ? 1 : 0);
})();
