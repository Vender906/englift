/* Запис переписаних прикладів (out/<pos>/*.json) у дані словника.
   node tools/examples/apply.js <verbs|adjs|nouns>   — спершу validate, потім запис
   Куди пишеться:
   verbs: verbs-data.js (рядок LEX_VERBS — компактний JSON) · verbs-phrasal-data.js (рядок запису за en + ctx)
          · verbs-merge.js (ex2 — другий приклад злитого дубля, MERGES[].ex2 у записі keep)
   adjs:  adjs-data.js (рядок LEX_ADJS — компактний JSON) · adjs-prep-data.js (масив FRESH, запис за en)
   nouns: nouns-data.js (рядок LEX_NOUNS — компактний JSON) */
const fs = require('fs');
const path = require('path');
const { APP, posArg, load, outDir } = require('./common');
const { validateFile } = require('./validate');

const pos = posArg(process.argv.slice(2));
const dir = outDir(pos);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
let bad = 0;
const items = new Map();
for (const f of files) {
  const r = validateFile(pos, path.join(dir, f));
  if (r.errs.length) { bad++; console.log('✗ ' + f + ': ' + r.errs.length + ' errors (node tools/examples/validate.js ' + pos + ' ' + f.slice(0, 3) + ')'); continue; }
  JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).forEach(e => items.set(e.id, e));
}
if (bad) { console.log('Nothing written: fix the errors first.'); process.exit(1); }
const allOut = new Map(items);

const byId = new Map(load(pos).words.map(v => [v._id, v]));
const P = f => path.join(APP, 'js', 'lexis', f);
const report = [];

/* основний файл: рядок «const <LIST> = [ … ];» — компактний JSON */
function applyJsonLine(file, list) {
  const src = fs.readFileSync(P(file), 'utf8').split('\n');
  const li = src.findIndex(l => l.startsWith('const ' + list + ' = ['));
  const a = src[li].indexOf('['), b = src[li].lastIndexOf(']');
  const arr = JSON.parse(src[li].slice(a, b + 1));
  let n = 0;
  arr.forEach(w => {
    const e = items.get(w._id);
    if (!e) return;
    if (w.ex !== e.ex || w.exUk !== e.exUk) { w.ex = e.ex; w.exUk = e.exUk; n++; }
    items.delete(w._id);
  });
  src[li] = src[li].slice(0, a) + JSON.stringify(arr) + src[li].slice(b + 1);
  fs.writeFileSync(P(file), src.join('\n'));
  report.push(file + ': ' + n);
}

const STR = `(?:'(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*")`;
const left = [];

if (pos === 'verbs') {
  applyJsonLine('verbs-data.js', 'LEX_VERBS');

  /* ex2 → verbs-merge.js */
  let merge = fs.readFileSync(P('verbs-merge.js'), 'utf8');
  let nEx2 = 0;
  merge = merge.replace(/\{ "keep": (\d+), ([^{}]*?)"ex2": \{ "en": ("(?:[^"\\]|\\.)*"), "uk": ("(?:[^"\\]|\\.)*") \}/g, (all, id, mid, en, uk) => {
    const e = allOut.get(+id);
    if (!e || !e.ex2) return all;
    if (JSON.parse(en) === e.ex2 && JSON.parse(uk) === e.ex2Uk) return all;
    nEx2++;
    return '{ "keep": ' + id + ', ' + mid + '"ex2": { "en": ' + JSON.stringify(e.ex2) + ', "uk": ' + JSON.stringify(e.ex2Uk) + ' }';
  });
  fs.writeFileSync(P('verbs-merge.js'), merge);
  report.push('verbs-merge.js (ex2): ' + nEx2);

  /* фразові: один запис — один рядок «{ en: '…', ctx: '…', … ex: '…', exUk: '…' }» */
  const q = s => s.includes("'") ? JSON.stringify(s) : "'" + s.replace(/\\/g, '\\\\') + "'";
  const ph = fs.readFileSync(P('verbs-phrasal-data.js'), 'utf8').split('\n');
  let nPh = 0;
  for (const [id, e] of items) {
    const v = byId.get(id);
    const i = ph.findIndex(l => /^\s*\{ en: /.test(l) && l.includes('en: ' + q(v.en) + ', ctx: ' + q(v.ctx || '') + ','));
    if (i < 0) { left.push(id + ' «' + v.en + '»'); continue; }
    const re = new RegExp('ex: ' + STR + ', exUk: ' + STR);
    if (!re.test(ph[i])) { left.push(id + ' «' + v.en + '» (no ex/exUk in the line)'); continue; }
    const next = ph[i].replace(re, () => 'ex: ' + q(e.ex) + ', exUk: ' + q(e.exUk));
    if (next !== ph[i]) { ph[i] = next; nPh++; }
  }
  fs.writeFileSync(P('verbs-phrasal-data.js'), ph.join('\n'));
  report.push('verbs-phrasal-data.js: ' + nPh);
}

if (pos === 'nouns') applyJsonLine('nouns-data.js', 'LEX_NOUNS');

if (pos === 'adjs') {
  applyJsonLine('adjs-data.js', 'LEX_ADJS');

  /* FRESH у adjs-prep-data.js: «{ "en": "…", … "ex": "…", "exUk": "…" }» в одному рядку */
  let src = fs.readFileSync(P('adjs-prep-data.js'), 'utf8');
  let nFresh = 0;
  for (const [id, e] of items) {
    const v = byId.get(id);
    const start = src.indexOf('{ "en": ' + JSON.stringify(v.en) + ', ');
    const end = start < 0 ? -1 : src.indexOf(' }', start);
    if (start < 0 || end < 0) { left.push(id + ' «' + v.en + '»'); continue; }
    const obj = src.slice(start, end);
    const re = new RegExp('"ex": ' + STR + ', "exUk": ' + STR);
    if (!re.test(obj)) { left.push(id + ' «' + v.en + '» (no ex/exUk)'); continue; }
    const next = obj.replace(re, () => '"ex": ' + JSON.stringify(e.ex) + ', "exUk": ' + JSON.stringify(e.exUk));
    if (next !== obj) { src = src.slice(0, start) + next + src.slice(end); nFresh++; }
  }
  fs.writeFileSync(P('adjs-prep-data.js'), src);
  report.push('adjs-prep-data.js: ' + nFresh);
}

console.log(report.join(' · '));
if (left.length) { console.log('✗ not found in the sources: ' + left.join(', ')); process.exit(1); }
