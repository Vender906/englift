/* Модулі, ліниве завантаження словників, «Виклик» із фразами, доступність */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('./node_modules/jsdom');
const { APP } = require('./_boot');

const errs = [];
const ok = (c, m) => { console.log((c ? '✓ PASS' : '✗ FAIL') + '  ' + m); if (!c) errs.push(m); };

/* ---------- 1. оболонка без словників: лічильники з meta.js ---------- */
{
  const html = fs.readFileSync(path.join(APP, 'index.html'), 'utf8');
  const dom = new JSDOM(html, { url: 'http://localhost:8000/#/', runScripts: 'outside-only', pretendToBeVisual: true });
  const { window } = dom, doc = window.document;
  window.matchMedia = () => ({ matches: false, addEventListener() { }, removeEventListener() { } });
  window.speechSynthesis = { cancel() { }, speak() { }, getVoices: () => [] };
  window.localStorage.clear();

  /* рівно те, що index.html вантажить синхронно */
  const SYNC = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
  ok(!SYNC.some(f => /lexis\/(verbs|nouns|adjs|advs)-data/.test(f)), 'index.html no longer loads dictionaries up front');
  ok(SYNC.includes('js/lexis/meta.js'), 'index.html loads the small counts file instead');
  const syncKB = Math.round(SYNC.reduce((a, f) => a + fs.statSync(path.join(APP, f)).size, 0) / 1024);
  ok(syncKB < 1200, 'startup payload is ' + syncKB + ' KB (was ~3500 KB)');

  const bundle = SYNC.map(f => fs.readFileSync(path.join(APP, f), 'utf8')).join('\n;\n');
  try { window.eval(bundle); } catch (e) { errs.push('BUNDLE THREW: ' + e.message); }

  ok(!!window.FLCore && !!window.FLLexis && !!window.FLGrammar && !!window.FL, 'core / lexis / grammar modules registered');
  const L = window.FLLexis;
  ok(['verbs', 'nouns', 'adjs', 'advs'].every(p => !L.loaded(p)), 'no dictionary is loaded at startup');
  ok(L.posCount('verbs') === 3137 && L.posCount('nouns') === 2465, 'word counts come from meta.js while data is missing');

  const view = doc.getElementById('view');
  const go = h => { window.location.hash = h.replace(/^#/, ''); window.dispatchEvent(new window.HashChangeEvent('hashchange')); };
  go('#/');
  ok(/у базі 8\d{3}/.test(view.textContent), 'dashboard shows the total word count without the dictionaries');
  go('#/vocab');
  ok(/3137/.test(view.textContent), 'vocabulary hub shows per-part counts');
  go('#/vocab/verbs/browser');
  ok(/Завантажуємо словник/.test(view.textContent), 'opening a part of speech shows the loader');
  go('#/grammar');
  ok(/Граматика/.test(view.textContent) && !/Завантажуємо/.test(view.textContent), 'grammar works without dictionaries');
}

/* ---------- 2. повний бандл: словники на місці ---------- */
{
  const { boot } = require('./_boot');
  const { window, doc, go, click } = boot();
  const L = window.FLLexis;
  ok(['verbs', 'nouns', 'adjs', 'advs'].every(p => L.loaded(p)), 'dictionaries work once loaded');
  ok(L.posCount('verbs') === 3137, 'the same count comes from the data itself (' + L.posCount('verbs') + ')');

  go('#/vocab/verbs/browser');
  ok(!!doc.querySelector('#lex-search'), 'browser renders after the data is there');

  /* «Виклик» бере питання і з тренажерів фраз */
  const P = window.FLPhrases;
  ok(P.challengePool().length === 0, 'challenge pool is empty while no trainer is loaded');
  window.eval(fs.readFileSync(path.join(APP, 'js/phrases/chunks-data.js'), 'utf8'));
  const pool = P.challengePool();
  ok(pool.length >= 4, 'loaded trainer adds ' + pool.length + ' questions to the challenge');
  ok(pool.every(q => q.type === 'choice' && q.options.length === 4 && q.options[q.answer] && q.tag), 'every added question is a valid 4-option item with a tag');

  go('#/challenge/play');
  const tags = [...doc.querySelectorAll('.q-type')].map(e => e.textContent).join(' ');
  ok(/\d \/ 10/.test(doc.getElementById('view').textContent), 'challenge session starts with 10 questions');

  /* доступність */
  go('#/grammar/articles/art-geo/practice');
  click(doc.querySelector('.opts .opt'));
  const fb = doc.querySelector('.feedback');
  ok(!!fb && fb.getAttribute('aria-live') === 'polite' && fb.getAttribute('role') === 'status', 'exercise feedback is announced to screen readers');
  go('#/vocab/verbs/browser');
  const q = doc.querySelector('#lex-search');
  q.value = 'run'; q.dispatchEvent(new window.Event('input', { bubbles: true }));
  const en = doc.querySelector('.word-card .word-en');
  ok(!!en && en.getAttribute('lang') === 'en', 'English words are marked with lang="en"');
  const css = fs.readFileSync(path.join(APP, 'css/styles.css'), 'utf8');
  ok(/:focus-visible\s*\{/.test(css), 'keyboard focus is visible');
}

console.log(errs.length ? 'FAILURES: ' + errs.join(' | ') : 'MODULES OK ✓');
process.exit(errs.length ? 1 : 0);
