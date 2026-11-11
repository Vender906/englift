/* Збірка тренажера «Що на фото»: перевіряє tools/photo/out/<id>.json (+ <id>.photo.json, фото в english-app/img/photo)
   і пише english-app/js/practice/photo-data.js (window.PHOTO_DATA).
   node tools/photo/build.js            — усі сцени з out/
   node tools/photo/build.js --check    — лише перевірка, без запису */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'out');
const APP = path.join(__dirname, '..', '..', 'english-app');
const CHECK_ONLY = process.argv.includes('--check');
const LISTS = { nouns: [25, 45], adjs: [12, 25], verbs: [10, 20] };
const LVL = /^(A1|A2|B1|B2|C1|C2)$/;
const CYR = /[а-яіїєґ]/i;

const scenes = [];
let bad = 0;
const ids = fs.readdirSync(OUT).filter(f => /^[a-z0-9-]+\.json$/.test(f) && !f.endsWith('.photo.json')).map(f => f.slice(0, -5)).sort();
for (const id of ids) {
  const errs = [], warns = [];
  const E = m => errs.push(m), W = m => warns.push(m);
  let s, credit;
  try { s = JSON.parse(fs.readFileSync(path.join(OUT, id + '.json'), 'utf8')); } catch (e) { E('bad JSON: ' + e.message); }
  try { credit = JSON.parse(fs.readFileSync(path.join(OUT, id + '.photo.json'), 'utf8')); } catch (e) { E('missing ' + id + '.photo.json — run prep.py'); }
  if (s) {
    if (s.id !== id) E('id must be "' + id + '"');
    ['uk', 'en', 'emoji'].forEach(k => { if (!s[k]) E('missing ' + k); });
    if (s.uk && !CYR.test(s.uk)) E('uk must be Ukrainian');
    for (const [list, [min, max]] of Object.entries(LISTS)) {
      const arr = s[list];
      if (!Array.isArray(arr)) { E('missing list ' + list); continue; }
      if (arr.length < min) E(list + ': ' + arr.length + ' items, need at least ' + min);
      if (arr.length > max) W(list + ': ' + arr.length + ' items (max ' + max + ')');
      const seen = new Map();
      arr.forEach((w, i) => {
        const tag = list + '#' + i + ' «' + (w && w.en) + '»';
        if (!w || typeof w.en !== 'string' || !w.en.trim()) return E(tag + ': missing en');
        if (w.en !== w.en.toLowerCase().trim()) E(tag + ': en must be lowercase');
        if (!w.uk || !CYR.test(w.uk)) E(tag + ': uk must be Ukrainian');
        if (/[а-яіїєґ]['’][а-яіїєґ]/i.test(w.uk || '')) E(tag + ': use ʼ (U+02BC) as the Ukrainian apostrophe');
        if (/[ыэъё]/i.test(w.uk || '')) E(tag + ': Russian letters');
        if (!LVL.test(w.lvl || '')) E(tag + ': lvl A1–C2');
        if (w.alt !== undefined && (!Array.isArray(w.alt) || w.alt.some(a => typeof a !== 'string' || a !== a.toLowerCase().trim()))) E(tag + ': alt must be an array of lowercase words');
        [w.en].concat(w.alt || []).forEach(k => {
          if (seen.has(k)) E(tag + ': «' + k + '» is already used by «' + seen.get(k) + '» in ' + list);
          else seen.set(k, w.en);
        });
      });
    }
  }
  if (credit) {
    ['file', 'page', 'author', 'license'].forEach(k => { if (!credit[k]) E('photo.json: missing ' + k); });
    if (credit.file && !fs.existsSync(path.join(APP, credit.file))) E('photo file not found: english-app/' + credit.file);
  }
  console.log((errs.length ? '✗ ' : '✓ ') + id + (s ? ' — ' + ['nouns', 'adjs', 'verbs'].map(l => (s[l] || []).length + ' ' + l).join(', ') : '') + (warns.length ? ' (' + warns.length + ' warnings)' : ''));
  errs.forEach(m => console.log('   ✗ ' + m));
  warns.forEach(m => console.log('   ⚠ ' + m));
  if (errs.length) { bad++; continue; }
  const pick = arr => arr.map(w => { const o = { en: w.en, uk: w.uk, lvl: w.lvl }; if (w.alt && w.alt.length) o.alt = w.alt; return o; });
  scenes.push({ id, uk: s.uk, en: s.en, emoji: s.emoji, img: credit.file, w: credit.width, h: credit.height,
    credit: { author: credit.author, license: credit.license, licenseUrl: credit.licenseUrl || '', page: credit.page },
    nouns: pick(s.nouns), adjs: pick(s.adjs), verbs: pick(s.verbs) });
}
if (bad) { console.log('\n' + bad + ' scene(s) with errors — nothing written'); process.exit(1); }
if (CHECK_ONLY) { console.log('\nALL OK — ' + scenes.length + ' scenes'); process.exit(0); }
/* порядок сцен — як у scenes.json */
const order = require('./scenes.json').map(x => x.id);
scenes.sort((a, b) => (order.indexOf(a.id) + 1 || 999) - (order.indexOf(b.id) + 1 || 999));
const file = path.join(APP, 'js', 'practice', 'photo-data.js');
fs.writeFileSync(file, '/* EngLift — тренажер «Що на фото»: сцени й списки слів (згенеровано tools/photo/build.js — не редагувати вручну).\n' +
  '   Фото — Wikimedia Commons (Public domain / CC0 / CC BY / CC BY-SA), автор і ліцензія — у credit. */\n' +
  'window.PHOTO_DATA = ' + JSON.stringify({ scenes }) + ';\n');
console.log('\nphoto-data.js: ' + scenes.length + ' scenes, ' + scenes.reduce((n, s) => n + s.nouns.length + s.adjs.length + s.verbs.length, 0) + ' words');
