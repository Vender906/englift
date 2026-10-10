/* Збірка нових слів з Oxford 3000/5000 у застосунок.
   node tools/oxford/build.js
   1) перевіряє tools/oxford/out/<pos>/*.json (validate.js) — з помилками нічого не пише;
   2) дає кожному запису сталий _id (реєстр tools/oxford/ids.json: від 10000, нові — в кінець), щоб прогрес не зсувався;
   3) пише english-app/js/lexis/<pos>-oxford-data.js — нові категорії (перед «18+») + записи;
   4) перераховує english-app/js/lexis/meta.js (лічильники для дашборда). */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { validateFile, POSES } = require('./validate');

const ROOT = path.join(__dirname, '..', '..');
const LEX = path.join(ROOT, 'english-app', 'js', 'lexis');
const NEW = require('./categories.json');
const ID_FILE = path.join(__dirname, 'ids.json');
const ID_BASE = 10000;
const VARS = {
  verbs: { list: 'LEX_VERBS', cats: 'LEX_VERB_CATS', subs: 'LEX_VERB_SUBS' },
  nouns: { list: 'LEX_NOUNS', cats: 'LEX_NOUN_CATS', subs: 'LEX_NOUN_SUBS' },
  adjs: { list: 'LEX_ADJS', cats: 'LEX_ADJ_CATS', subs: 'LEX_ADJ_SUBS' },
  advs: { list: 'LEX_ADVS', cats: 'LEX_ADV_CATS', subs: 'LEX_ADV_SUBS' }
};
const FIELD_ORDER = ['en', 'ctx', 'ipa', 'emoji', 'uk', 'uCtx', 'lvl', 'cats', 'past', 'pp', 'reg', 'cu', 'plural', 'comp', 'sup', 'grad', 'prep', 'syn', 'ant', 'reg2', 'note', 'ex', 'exUk'];

/* 1. перевірка */
let bad = 0;
const entries = {};
for (const pos of POSES) {
  entries[pos] = [];
  const dir = path.join(__dirname, 'out', pos);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.json')).sort()) {
    const r = validateFile(pos, path.join(dir, f));
    if (r.errs.length) { bad++; console.log('✗ ' + pos + '/' + f + ': ' + r.errs.length + ' errors (node tools/oxford/validate.js ' + pos + ' ' + f.slice(0, 3) + ')'); continue; }
    JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).forEach(e => { if (!e.skip) entries[pos].push(e); });
  }
}
if (bad) { console.log('Nothing written: fix the errors first.'); process.exit(1); }

/* 2. сталі _id */
const ids = fs.existsSync(ID_FILE) ? JSON.parse(fs.readFileSync(ID_FILE, 'utf8')) : {};
for (const pos of POSES) {
  ids[pos] = ids[pos] || {};
  let next = Math.max(ID_BASE - 1, ...Object.values(ids[pos])) + 1;
  entries[pos].forEach(e => { if (ids[pos][e.key] == null) ids[pos][e.key] = next++; });
}
fs.writeFileSync(ID_FILE, JSON.stringify(ids, null, 1));

/* 3. файли даних */
for (const pos of POSES) {
  const V = VARS[pos];
  const words = entries[pos].map(e => {
    const w = {};
    FIELD_ORDER.forEach(k => { if (e[k] !== undefined && e[k] !== '') w[k] = e[k]; });
    w.cats = [...new Set(w.cats)];   /* ["society_n", "law_crime", "society_n", "politics_n"] → без повторів */
    /* формат полів як в основних даних: у іменників syn — масив, у прикметників і прислівників — рядок */
    if (w.syn !== undefined) w.syn = pos === 'nouns' ? [].concat(w.syn).flatMap(x => String(x).split(/\s*,\s*/)).filter(Boolean) : [].concat(w.syn).join(', ');
    if (w.ant !== undefined) w.ant = pos === 'nouns' ? [].concat(w.ant).flatMap(x => String(x).split(/\s*,\s*/)).filter(Boolean) : [].concat(w.ant).join(', ');
    w._id = ids[pos][e.key];
    return w;
  }).sort((a, b) => a._id - b._id);
  const file = path.join(LEX, pos + '-oxford-data.js');
  if (!words.length) { if (fs.existsSync(file)) fs.unlinkSync(file); continue; }
  /* лише ті нові категорії, в яких є слова (порожні не показуємо) */
  const used = new Set(words.flatMap(w => w.cats));
  const cats = Object.fromEntries(Object.entries(NEW[pos].cats).filter(([k]) => used.has(k)));
  const subs = Object.fromEntries(Object.entries(NEW[pos].subs).filter(([k]) => used.has(k)));
  const src = `/* EngLift — слова з Oxford 3000/5000, яких бракувало у словнику (${words.length}).
   Згенеровано tools/oxford/build.js з tools/oxford/out/${pos}/*.json — не редагувати вручну.
   Сталі _id від ${ID_BASE} (реєстр tools/oxford/ids.json), тож прогрес не зсувається. */
(function () {
  if (typeof ${V.list} === 'undefined') return;
  const CATS = ${JSON.stringify(cats)};
  const SUBS = ${JSON.stringify(subs)};
  /* нові категорії — перед «18+», щоб дорослі лишалися останніми */
  if (typeof ${V.cats} !== 'undefined') {
    const adult = ${V.cats}.adult;
    if (adult) delete ${V.cats}.adult;
    Object.keys(CATS).forEach(k => { if (!${V.cats}[k]) ${V.cats}[k] = CATS[k]; });
    if (adult) ${V.cats}.adult = adult;
  }
  if (typeof ${V.subs} !== 'undefined') Object.keys(SUBS).forEach(k => { if (!${V.subs}[k]) ${V.subs}[k] = SUBS[k]; });
  const W = ${JSON.stringify(words)};
  const have = new Set(${V.list}.map(w => w._id));
  W.forEach(w => { if (!have.has(w._id)) ${V.list}.push(w); });
})();
`;
  fs.writeFileSync(file, src);
  console.log(pos + '-oxford-data.js: ' + words.length + ' words');
}

/* 4. meta.js — лічильники як у застосунку (усі файли частини мови в порядку завантаження) */
const LOAD = {
  verbs: ['verbs-data.js', 'verbs-phrasal-data.js', 'verbs-merge.js', 'verbs-oxford-data.js'],
  nouns: ['nouns-data.js', 'nouns-oxford-data.js'],
  adjs: ['adjs-data.js', 'adjs-prep-data.js', 'adjs-oxford-data.js'],
  advs: ['advs-data.js', 'advs-oxford-data.js']
};
const meta = {};
for (const pos of POSES) {
  const V = VARS[pos];
  const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
  LOAD[pos].forEach((f, i) => {
    const p = path.join(LEX, f);
    if (!fs.existsSync(p)) return;
    vm.runInContext(fs.readFileSync(p, 'utf8') + (i === 0 ? `;window.${V.list}=${V.list};window.${V.cats}=${V.cats};window.${V.subs}=${V.subs};` : ''), ctx);
  });
  const cats = ctx[V.cats], subs = ctx[V.subs];
  const adultIds = new Set([...Object.entries(cats), ...Object.entries(subs)].filter(([k, c]) => c.adult || k === 'adult').map(([k]) => k));
  const words = ctx[V.list];
  meta[pos] = { total: words.length, safe: words.filter(w => !w.adult && !(w.cats || []).some(c => adultIds.has(c))).length, cats: Object.keys(cats).length };
}
const metaFile = path.join(LEX, 'meta.js');
const old = fs.readFileSync(metaFile, 'utf8');
fs.writeFileSync(metaFile, old.replace(/window\.LEX_META = .*;/, 'window.LEX_META = ' + JSON.stringify(meta).replace(/,"/g, ', "').replace(/\{"/g, '{ "').replace(/\}/g, ' }').replace(/":/g, '": ') + ';'));
console.log('meta.js: ' + POSES.map(p => p + ' ' + meta[p].total + ' (' + meta[p].safe + ' safe, ' + meta[p].cats + ' cats)').join(' · '));
