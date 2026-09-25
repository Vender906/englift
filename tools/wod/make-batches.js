/* Нарізка дієслів словника на пачки для генерації ситуацій Word on Demand.
   node tools/wod/make-batches.js [розмір=50] → tools/wod/batches/NNN.json */
const fs = require('fs');
const path = require('path');
const { loadApp } = require('./validate.js');

const SIZE = +process.argv[2] || 50;
const app = loadApp();
const cats = Object.assign({}, app.LEX_VERB_CATS, app.LEX_VERB_SUBS);
const adultIds = new Set(Object.entries(cats).filter(([, c]) => c.adult).map(([k]) => k));
const isAdult = v => v.adult || (v.cats || []).some(c => adultIds.has(c));

const done = new Set();
const outDir = path.join(__dirname, 'out');
fs.readdirSync(outDir).filter(f => f.endsWith('.json')).forEach(f => JSON.parse(fs.readFileSync(path.join(outDir, f), 'utf8')).forEach(e => e.id != null && done.add(e.id)));

const safe = app.LEX_VERBS.filter(v => !isAdult(v) && !done.has(v._id)).sort((a, b) => a._id - b._id);
const byEn = {};
app.LEX_VERBS.filter(v => !isAdult(v)).forEach(v => (byEn[v.en] = byEn[v.en] || []).push(v));

const dir = path.join(__dirname, 'batches');
fs.readdirSync(dir).forEach(f => fs.unlinkSync(path.join(dir, f)));
let n = 0;
for (let i = 0; i < safe.length; i += SIZE) {
  n++;
  const batch = safe.slice(i, i + SIZE).map(v => {
    const o = { id: v._id, en: v.en, uk: v.uk, lvl: v.lvl };
    if (v.ctx) o.ctx = v.ctx;
    if (v.uCtx) o.uCtx = v.uCtx;
    if (v.past) o.past = v.past;
    if (v.pp) o.pp = v.pp;
    if (v.ex) o.ex = v.ex + (v.exUk ? ' — ' + v.exUk : '');
    o.topics = [...new Set(v.cats)].map(c => cats[c] ? cats[c].label : c).join('; ');
    const others = (byEn[v.en] || []).filter(x => x !== v);
    if (others.length) o.otherMeanings = others.map(x => x.uk).join(' | ') + ' — ці значення тренуються окремо, НЕ використовуй їх тут';
    return o;
  });
  fs.writeFileSync(path.join(dir, String(n).padStart(3, '0') + '.json'), JSON.stringify(batch, null, 1));
}
console.log(safe.length + ' verbs → ' + n + ' batches of ≤' + SIZE);
