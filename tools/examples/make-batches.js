/* Нарізка слів словника на пачки для переписування прикладів (див. SPEC.md).
   node tools/examples/make-batches.js <verbs|adjs|nouns> [розмір=50] → tools/examples/batches/<pos>/NNN.json
   Слова, для яких уже є out/<pos>/*.json, пропускаються. */
const fs = require('fs');
const path = require('path');
const { posArg, load, outDir, batchDir } = require('./common');

const pos = posArg(process.argv.slice(2));
const SIZE = +process.argv[3] || 50;
const { words, cats, isAdult } = load(pos);

const out = outDir(pos), dir = batchDir(pos);
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(dir, { recursive: true });
const outFiles = fs.readdirSync(out).filter(f => f.endsWith('.json'));
const done = new Set();
outFiles.forEach(f => JSON.parse(fs.readFileSync(path.join(out, f), 'utf8')).forEach(e => done.add(e.id)));
const taken = new Set(outFiles.map(f => f.slice(0, 3)));

const byEn = {};
words.forEach(v => (byEn[v.en.toLowerCase()] = byEn[v.en.toLowerCase()] || []).push(v));
/* _id від 10000 — слова з Oxford (їхнє джерело — tools/oxford/out), тут не беремо */
const todo = words.filter(v => !done.has(v._id) && v._id < 10000).sort((a, b) => a._id - b._id);

fs.readdirSync(dir).forEach(f => fs.unlinkSync(path.join(dir, f)));
let n = 0, made = 0;
for (let i = 0; i < todo.length; i += SIZE) {
  do n++; while (taken.has(String(n).padStart(3, '0')));
  const batch = todo.slice(i, i + SIZE).map(v => {
    const o = { id: v._id, en: v.en, uk: v.uk, lvl: v.lvl };
    if (v.ctx) o.ctx = v.ctx;
    if (v.uCtx) o.uCtx = v.uCtx;
    if (isAdult(v)) o.adult = true;
    o.topics = [...new Set(v.cats)].map(c => cats[c] ? cats[c].label : c).join('; ');
    if (v.comp) o.comp = v.comp + ' / ' + (v.sup || '');
    if (v.syn) o.syn = [].concat(v.syn).join(', ');
    if (v.ant) o.ant = [].concat(v.ant).join(', ');
    if (v.prep) o.prep = v.prep;
    if (v.cu) o.cu = v.cu === 'U' ? 'uncountable' : v.cu === 'C' ? 'countable' : v.cu;
    if (v.plural) o.plural = v.plural;
    if (v.note) o.note = v.note;
    o.ex = v.ex || '';
    o.exUk = v.exUk || '';
    if (v.ex2) { o.ex2 = v.ex2; o.ex2Uk = v.ex2Uk || ''; }
    const others = (byEn[v.en.toLowerCase()] || []).filter(x => x !== v);
    if (others.length) o.otherMeanings = others.map(x => x.uk).join(' | ');
    return o;
  });
  fs.writeFileSync(path.join(dir, String(n).padStart(3, '0') + '.json'), JSON.stringify(batch, null, 1));
  made++;
}
console.log(pos + ': ' + todo.length + ' words → ' + made + ' batches of ≤' + SIZE);
