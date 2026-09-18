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
window.URL.createObjectURL = () => 'blob:x'; window.URL.revokeObjectURL = () => {};
let downloaded = null;
window.HTMLAnchorElement.prototype.click = function () { downloaded = this.download; };

const errs = [];
const ok = (c, m) => { console.log((c ? '✓' : '✗') + ' ' + m); if (!c) errs.push(m); };
window.addEventListener('error', e => errs.push('window error: ' + e.message));
const bundle = ['js/themes.js', 'js/core.js', 'js/data.js', 'js/lexis/verbs-data.js', 'js/lexis/nouns-data.js', 'js/lexis/adjs-data.js', 'js/lexis/advs-data.js', 'js/reader.js', 'js/diary.js', 'js/lexis.js', 'js/grammar.js', 'js/app.js']
  .map(f => fs.readFileSync(path.join(APP, f), 'utf8')).join('\n;\n');
try { window.eval(bundle); } catch (e) { errs.push('BUNDLE THREW: ' + e.stack); }

const go = h => { window.location.hash = h.replace(/^#/, ''); window.dispatchEvent(new window.HashChangeEvent('hashchange')); };
const click = el => { if (!el) throw new Error('no element to click'); el.dispatchEvent(new window.MouseEvent('click', { bubbles: true })); };
const input = (el, v) => { el.value = v; el.dispatchEvent(new window.Event('input', { bubbles: true })); };
const tick = (ms) => new Promise(r => setTimeout(r, ms || 60));
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];
const mood = m => $$('.dy-mood').find(b => b.dataset.mood === m);
const fmood = m => $$('#dy-mood-filter [data-fmood]').find(b => b.dataset.fmood === m);
const LS = k => JSON.parse(window.localStorage.getItem(k) || 'null');

(async () => {
  try {
    ok(!errs.length, 'app boots ' + errs.join('|'));
    ok($$('#nav .nav-group[data-key="diary"] .nav-sub a').length === 3, 'nav: Diary group with 3 subs');
    ok(/Diary/.test($('#view').textContent) && /ще немає записів/.test($('#view').textContent), 'dashboard Diary card');

    window.eval(fs.readFileSync(path.join(APP, 'js/diary/diary-data.js'), 'utf8'));
    go('#/diary'); await tick();
    ok(doc.body.classList.contains('view-wide'), 'wide layout on diary');
    ok(!!$('#dy-text') && $$('.dy-tabs .tab').length === 3, 'write page with 3 tabs');
    ok($('#nav a[data-hash="#/diary"]').classList.contains('active') && !$('#nav a[data-hash="#/diary/entries"]').classList.contains('active'), 'nav sub active state');
    ok($('#dy-date').value === new Date().toISOString().slice(0, 10) || /^\d{4}-\d{2}-\d{2}$/.test($('#dy-date').value), 'date defaults to today: ' + $('#dy-date').value);
    ok($$('#dy-pron .dy-strip').length === 4 && $$('#dy-pron .dy-chunk').length === 24 && $$('#dy-pron .dy-strip-desc').length === 3, 'pronunciation banners 4 strips / 24 chunks + 3 descriptions (' + $$('#dy-pron .dy-chunk').length + ')');
    ok($$('.dy-fillers .dy-tipchip').length === 21 && $$('.dy-prefixes .dy-tipchip').length === 6, 'fillers 18+3 and prefixes 6');
    ok($$('.dy-contr .dy-chunk').length === 13, 'contractions 13');
    ok($$('.dy-be .dy-ex').length === 17 && !!$('.dy-be .dy-table') && !!$('.dy-be .dy-formula'), 'BE template: 17 examples + table + formula');

    // words sidebar
    const wordsTotal = $$('#dy-words-list .dy-word').length;
    ok(wordsTotal === 660 && $$('#dy-words-list > .dy-cat').length === 8, 'words: 660 in 8 categories (' + wordsTotal + ')');
    click($('#dy-cefr [data-lvl="C1"]'));
    ok($$('#dy-words-list .dy-word').length === 11, 'CEFR C1 → 11 words');
    click($('#dy-cefr [data-lvl=""]'));
    input($('#dy-words-search'), 'colleague');
    ok($$('#dy-words-list .dy-word').length >= 1 && $$('#dy-words-list .dy-cat.open').length >= 1, 'word search + auto-open');
    input($('#dy-words-search'), '');

    // reference
    ok($$('#dy-ref-list > .dy-cat').length === 21 && $$('#dy-ref-list .dy-ref-item').length === 582, 'reference 21 categories / 582 phrases');
    input($('#dy-ref-search'), 'I wish I');
    const visCats = $$('#dy-ref-list > .dy-cat').filter(c => c.style.display !== 'none');
    ok(visCats.length >= 1 && visCats.length < 21, 'reference search filters categories (' + visCats.length + ')');
    input($('#dy-ref-search'), '');
    click($('#dy-ref-list .dy-cat[data-id="tenses"] .dy-cat-head'));
    ok($('#dy-ref-list .dy-cat[data-id="tenses"]').classList.contains('open'), 'accordion opens');
    click($('#dy-ref-list .dy-cat[data-id="passive"] .dy-cat-head'));
    ok(!$('#dy-ref-list .dy-cat[data-id="tenses"]').classList.contains('open') && $('#dy-ref-list .dy-cat[data-id="passive"]').classList.contains('open'), 'opening one closes sibling');

    // writing
    input($('#dy-title'), 'My Monday');
    input($('#dy-text'), 'Today I went to work');
    ok($('#dy-wc2').textContent === '5' && $('#dy-chars').textContent === '20', 'word & char count');
    ok(LS('diary_draft_v1').text === 'Today I went to work', 'draft autosaved');
    const ta = $('#dy-text'); ta.setSelectionRange(ta.value.length, ta.value.length);
    click($$('#dy-words-list .dy-word').find(w => w.dataset.insert === 'colleague'));
    ok(ta.value === 'Today I went to work colleague', 'click word inserts with space: "' + ta.value + '"');
    click($('#dy-ref-list .dy-cat[data-id="tenses"] .dy-ins-btn'));
    ok(/colleague I have been V-ing since ___$/.test(ta.value), 'Insert → from reference');
    ok(window.localStorage.getItem('diary_insert_count_v1') === '2', 'insert counter = 2');
    click(mood('🔥'));
    ok(mood('🔥').classList.contains('active') && LS('diary_draft_v1').mood === '🔥', 'mood selected & saved in draft');

    click($('.dy-fillers .dy-tipchip'));
    ok(!$('#dy-tip-pop').hidden && /знаєш/.test($('#dy-tip-pop').textContent), 'filler chip shows example + translation');
    click($('#dy-tip-pop .dy-tip-ins'));
    ok(/you know$/.test(ta.value) && $('#dy-tip-pop').hidden, 'tip insert works');

    // draft survives navigation
    go('#/'); go('#/diary'); await tick();
    ok($('#dy-text').value.endsWith('you know') && $('#dy-title').value === 'My Monday' && mood('🔥').classList.contains('active'), 'draft restored after navigation');

    // save
    const xp0 = (LS('fluentlab_v2') || {}).xp || 0;
    click($('[data-act="save"]'));
    const E = LS('diary_entries_v1');
    ok(E.length === 1 && E[0].title === 'My Monday' && E[0].mood === '🔥' && E[0].words === countW(E[0].text), 'entry saved');
    ok($('#dy-text').value === '' && !window.localStorage.getItem('diary_draft_v1'), 'editor cleared after save');
    ok(((LS('fluentlab_v2') || {}).xp || 0) === xp0 + 10, '+10 XP for new entry');
    ok($('#dy-h-count').textContent === '1' && $('#dy-h-streak').textContent === '1', 'header stats updated (1 entry, streak 1)');
    click($('[data-act="save"]'));
    ok(LS('diary_entries_v1').length === 1, 'empty text not saved');

    // goal bonus
    click($$('.dy-tabs .tab')[2]); go('#/diary/settings'); await tick();
    click($('[data-goal="50"]'));
    ok(window.localStorage.getItem('diary_goal_v1') === '50', 'goal set to 50');
    go('#/diary'); await tick();
    ok(/Ціль дня: 50/.test($('#dy-goal').textContent.replace(/\s+/g, ' ')), 'goal shown in editor');
    input($('#dy-text'), Array.from({ length: 60 }, (_, i) => 'word' + i).join(' '));
    ok($('#dy-goal').classList.contains('goal-met'), 'goal-met highlight');
    const xp1 = (LS('fluentlab_v2') || {}).xp;
    click($('[data-act="save"]'));
    ok((LS('fluentlab_v2') || {}).xp === xp1 + 30, 'new entry + goal bonus = +30 XP');

    // entries
    go('#/diary/entries'); await tick();
    ok($$('.dy-entry').length === 2, 'entries list shows 2');
    input($('#dy-entries-search'), 'monday');
    ok($$('.dy-entry').length === 1, 'search entries');
    input($('#dy-entries-search'), '');
    click(fmood('🔥'));
    ok($$('.dy-entry').length === 1, 'mood filter');
    click(fmood(''));
    ok(!!$('.dy-expand'), 'long entry has expand button');
    click($('.dy-expand'));
    ok($('.dy-expand').closest('.dy-entry').classList.contains('expanded'), 'expand toggles');

    // edit
    const mondayCard = $$('.dy-entry').find(c => /My Monday/.test(c.textContent));
    click(mondayCard.querySelector('[data-eact="edit"]')); await tick(100);
    window.dispatchEvent(new window.HashChangeEvent('hashchange')); await tick(100);
    ok(window.location.hash === '#/diary' && $('#dy-title').value === 'My Monday' && !$('#dy-editing').hidden, 'edit opens writer with entry');
    input($('#dy-title'), 'My Monday (edited)');
    click($('[data-act="save"]'));
    const E2 = LS('diary_entries_v1');
    ok(E2.length === 2 && E2.some(e => e.title === 'My Monday (edited)' && e.updatedAt), 'edit updates existing entry (no duplicate)');

    // delete
    go('#/diary/entries'); await tick();
    click($$('.dy-entry')[0].querySelector('[data-eact="del"]'));
    ok(!!$('#dy-m'), 'delete asks confirmation');
    click($('#dy-m [data-yes]'));
    ok(LS('diary_entries_v1').length === 1 && $$('.dy-entry').length === 1, 'entry deleted');

    // settings, export, import
    go('#/diary/settings'); await tick();
    ok($$('#dy-tiles .dy-tile').length === 6, '6 stat tiles');
    click($('[data-sact="export"]'));
    ok(/^diary-backup-\d{4}-\d{2}-\d{2}\.json$/.test(downloaded || ''), 'export downloads ' + downloaded);
    const file = new window.File([JSON.stringify({ entries: [{ id: 'imp1', date: '2026-09-01', title: 'Imported', text: 'Hello from backup', mood: '😊', words: 3 }, LS('diary_entries_v1')[0]] })], 'b.json', { type: 'application/json' });
    const inp = $('#dy-import');
    Object.defineProperty(inp, 'files', { value: [file], configurable: true });
    inp.dispatchEvent(new window.Event('change', { bubbles: true }));
    await tick(150);
    ok(!!$('#dy-m') && /2/.test($('#dy-m').textContent), 'import asks confirmation with count');
    click($('#dy-m [data-yes]'));
    ok(LS('diary_entries_v1').length === 2, 'import merged: +1 new, 1 updated');
    click($('[data-sact="wipe"]'));
    click($('#dy-m [data-yes]'));
    ok(LS('diary_entries_v1').length === 0, 'delete all');

    // idea modal
    go('#/diary'); await tick();
    click($('.dy-idea-btn'));
    const t1 = $('#dy-idea-text').textContent;
    click($('#dy-idea [data-next]'));
    ok($('#dy-idea-text').textContent !== t1 && window.localStorage.getItem('diary_last_prompt_v1') === '1', '💡 idea modal & next idea');
    click($('#dy-idea [data-use]'));
    ok($('#dy-title').value === $$('#dy-title')[0].value && $('#dy-title').value.length > 10, 'idea → title');

    go('#/diary/nope'); await tick();
    ok(/не знайдено/i.test($('#view').textContent), 'unknown diary tab → 404');
    go('#/grammar'); ok(!doc.body.classList.contains('view-wide'), 'wide layout removed elsewhere');
    go('#/'); ok(/1 запис|записів|ще немає/.test($('#view').textContent), 'dashboard card still renders');
  } catch (e) { errs.push('TEST THREW: ' + e.stack); }

  console.log('---');
  if (errs.length) { console.log('FAILURES:\n' + errs.join('\n')); process.exit(1); }
  console.log('DIARY OK ✓'); process.exit(0);
})();
function countW(t) { return t.trim().split(/\s+/).length; }
