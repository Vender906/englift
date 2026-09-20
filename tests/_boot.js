const fs = require('fs');
const path = require('path');
const { JSDOM } = require('./node_modules/jsdom');

const APP = process.env.APP_DIR || path.join(__dirname, '..', 'english-app');
const FILES = ['js/themes.js', 'js/core.js', 'js/lexis/meta.js', 'js/data.js', 'js/grammar-extra.js', 'js/lexis/verbs-data.js', 'js/lexis/nouns-data.js', 'js/lexis/adjs-data.js', 'js/lexis/advs-data.js', 'js/lexis/verbs-phrasal-data.js', 'js/lexis/verbs-merge.js', 'js/lexis/adjs-prep-data.js', 'js/reader.js', 'js/diary/checker.js', 'js/diary.js', 'js/placement.js', 'js/phrases.js', 'js/sound.js', 'js/lexis.js', 'js/grammar.js', 'js/search.js', 'js/app.js'];

function boot() {
  const html = fs.readFileSync(path.join(APP, 'index.html'), 'utf8');
  const dom = new JSDOM(html, { url: 'http://localhost:8000/#/', runScripts: 'outside-only', pretendToBeVisual: true });
  const { window } = dom;
  const doc = window.document;
  window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  window.speechSynthesis = { cancel() {}, speak() {}, getVoices: () => [] };
  window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
  window.localStorage.clear();

  const errs = [];
  window.addEventListener('error', e => errs.push('window error: ' + e.message));
  const bundle = FILES.map(f => fs.readFileSync(path.join(APP, f), 'utf8')).join('\n;\n');
  try { window.eval(bundle); } catch (e) { errs.push('BUNDLE THREW: ' + e.message); }

  const go = h => { window.location.hash = h.replace(/^#/, ''); window.dispatchEvent(new window.HashChangeEvent('hashchange')); };
  const ok = (cond, msg) => { console.log((cond ? '✓ PASS' : '✗ FAIL') + '  ' + msg); if (!cond) errs.push(msg); };
  const click = el => el && el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  const storeGet = () => JSON.parse(window.localStorage.getItem('fluentlab_v2') || '{}');
  const finish = label => {
    console.log('---');
    if (errs.length) { console.log('FAILURES: ' + errs.length); process.exit(1); }
    console.log(label);
  };
  return { window, doc, errs, go, ok, click, storeGet, finish };
}

module.exports = { boot, APP };
