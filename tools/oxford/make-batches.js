/* Нарізка відсутніх слів Oxford 3000/5000 на пачки для створення нових записів словника (див. SPEC.md).
   node tools/oxford/make-batches.js <рівні> [розмір=40]     напр.: A1,A2,B1   або   B2,C1
   → tools/oxford/batches/<pos>/NNN.json + tools/oxford/catalog/<pos>.md (усі категорії й підкатегорії).
   Пропускає слова, для яких уже є запис (або skip) у tools/oxford/out/<pos>/*.json. */
const fs = require('fs');
const path = require('path');
const { load } = require('../examples/common');

const LEVELS = (process.argv[2] || 'A1,A2,B1').split(',');
const SIZE = +process.argv[3] || 40;
const POS_OF = { v: 'verbs', n: 'nouns', adj: 'adjs', adv: 'advs' };
const NEW = require('./categories.json');
const missing = require('./missing.json');

/* словник застосунку: переклади того самого слова в усіх частинах мови */
const apps = {};
for (const pos of Object.values(POS_OF)) apps[pos] = pos === 'advs' ? loadAdvs() : load(pos);
function loadAdvs() {
  const vm = require('vm');
  const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', '..', 'english-app', 'js', 'lexis', 'advs-data.js'), 'utf8') + ';window.W=LEX_ADVS;window.C=LEX_ADV_CATS;window.S=LEX_ADV_SUBS;', ctx);
    const ox = path.join(__dirname, '..', '..', 'english-app', 'js', 'lexis', 'advs-oxford-data.js');
    if (fs.existsSync(ox)) vm.runInContext(fs.readFileSync(ox, 'utf8'), ctx);
  return { words: ctx.W, cats: Object.assign({}, ctx.C, ctx.S), rawCats: ctx.C, rawSubs: ctx.S };
}
const known = en => {
  const out = [];
  for (const [pos, a] of Object.entries(apps)) a.words.forEach(w => {
    const e = String(w.en).toLowerCase();
    if (e === en || e.replace(/-/g, ' ') === en.replace(/-/g, ' ')) out.push(pos + ': ' + w.en + ' = ' + w.uk);
  });
  return out;
};
const inPhrases = en => {
  const out = [];
  for (const [pos, a] of Object.entries(apps)) a.words.forEach(w => {
    const e = ' ' + String(w.en).toLowerCase() + ' ';
    if (e.trim() !== en && e.includes(' ' + en + ' ')) out.push(w.en);
  });
  return out.slice(0, 5);
};

/* каталог категорій для авторів */
const catDir = path.join(__dirname, 'catalog');
fs.mkdirSync(catDir, { recursive: true });
for (const pos of Object.values(POS_OF)) {
  const a = apps[pos];
  const cats = Object.assign({}, a.rawCats || pickCats(a.cats), NEW[pos].cats);
  const subs = Object.assign({}, a.rawSubs || pickSubs(a.cats), NEW[pos].subs);
  let md = '# ' + pos + ' — categories (`cat id` → its subcategories)\n\nUse ids exactly. In `cats` put the category id and then one of its subcategory ids, e.g. `["motion", "walking"]`; a word may belong to up to 2 such pairs. New categories are marked 🆕.\n\n';
  for (const [k, c] of Object.entries(cats)) {
    if (c.adult || k === 'adult' || k === 'delex' || k === 'phrasal' || k === 'adjprep') continue;
    const ss = Object.entries(subs).filter(([, s]) => s.parent === k);
    md += '- **' + k + '** ' + (NEW[pos].cats[k] ? '🆕 ' : '') + c.label + (ss.length ? '' : ' *(no subcategories — use the category id alone)*') + '\n';
    ss.forEach(([id, s]) => { md += '  - `' + id + '` ' + (NEW[pos].subs[id] ? '🆕 ' : '') + s.label + '\n'; });
  }
  fs.writeFileSync(path.join(catDir, pos + '.md'), md);
}
function pickCats(all) { return Object.fromEntries(Object.entries(all).filter(([, c]) => !c.parent)); }
function pickSubs(all) { return Object.fromEntries(Object.entries(all).filter(([, c]) => c.parent)); }

/* пачки */
const outRoot = path.join(__dirname, 'out');
const batchRoot = path.join(__dirname, 'batches');
let total = 0;
for (const [p, pos] of Object.entries(POS_OF)) {
  const out = path.join(outRoot, pos), dir = path.join(batchRoot, pos);
  fs.mkdirSync(out, { recursive: true });
  fs.mkdirSync(dir, { recursive: true });
  const outFiles = fs.readdirSync(out).filter(f => f.endsWith('.json'));
  const done = new Set();
  outFiles.forEach(f => JSON.parse(fs.readFileSync(path.join(out, f), 'utf8')).forEach(e => done.add(e.key)));
  const taken = new Set(outFiles.map(f => f.slice(0, 3)));
  const seen = new Set();
  const todo = missing.filter(x => x.pos === p && LEVELS.includes(x.lvl)).filter(x => {
    const key = pos + '|' + x.en;
    if (done.has(key) || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  fs.readdirSync(dir).forEach(f => fs.unlinkSync(path.join(dir, f)));
  let n = 0;
  for (let i = 0; i < todo.length; i += SIZE) {
    do n++; while (taken.has(String(n).padStart(3, '0')));
    const batch = todo.slice(i, i + SIZE).map(x => {
      const o = { key: pos + '|' + x.en, en: x.en, lvl: x.lvl, list: x.list };
      const k = known(x.en);
      if (k.length) o.alreadyInApp = k;
      const ph = inPhrases(x.en);
      if (ph.length) o.inPhrases = ph;
      return o;
    });
    fs.writeFileSync(path.join(dir, String(n).padStart(3, '0') + '.json'), JSON.stringify(batch, null, 1));
  }
  total += todo.length;
  console.log(pos + ': ' + todo.length + ' words → ' + n + ' batches');
}
console.log('levels ' + LEVELS.join(',') + ': ' + total + ' words');
