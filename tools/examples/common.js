/* Спільне для tools/examples: частини мови, завантаження словника (так само, як у застосунку),
   шляхи до пачок і результатів, словоформи для перевірки.
   Кожна частина мови: out/<pos>/NNN.json — джерело прикладів, batches/<pos>/NNN.json — завдання. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const APP = path.join(__dirname, '..', '..', 'english-app');
const read = f => fs.readFileSync(path.join(APP, f), 'utf8');

const POS = {
  verbs: {
    list: 'LEX_VERBS', cats: 'LEX_VERB_CATS', subs: 'LEX_VERB_SUBS',
    files: ['verbs-data.js', 'verbs-phrasal-data.js', 'verbs-merge.js', 'verbs-oxford-data.js']
  },
  adjs: {
    list: 'LEX_ADJS', cats: 'LEX_ADJ_CATS', subs: 'LEX_ADJ_SUBS',
    files: ['adjs-data.js', 'adjs-prep-data.js', 'adjs-oxford-data.js']
  },
  nouns: {
    list: 'LEX_NOUNS', cats: 'LEX_NOUN_CATS', subs: 'LEX_NOUN_SUBS',
    files: ['nouns-data.js', 'nouns-oxford-data.js']
  }
};

function posArg(argv) {
  const pos = argv[0];
  if (!POS[pos]) { console.log('First argument: part of speech — ' + Object.keys(POS).join(' | ')); process.exit(1); }
  return pos;
}

function load(pos) {
  const P = POS[pos];
  const ctx = {};
  ctx.window = ctx;
  vm.createContext(ctx);
  const [first, ...rest] = P.files;
  vm.runInContext(read('js/lexis/' + first) + ';window.' + P.list + '=' + P.list + ';window.' + P.cats + '=' + P.cats + ';window.' + P.subs + '=' + P.subs + ';', ctx);
  /* *-oxford-data.js може ще не існувати; його приклади живуть у tools/oxford/out, а не в tools/examples */
  rest.forEach(f => { if (fs.existsSync(path.join(APP, 'js', 'lexis', f))) vm.runInContext(read('js/lexis/' + f), ctx); });
  const cats = Object.assign({}, ctx[P.cats], ctx[P.subs]);
  const adultIds = new Set(Object.entries(cats).filter(([, c]) => c.adult).map(([k]) => k));
  return {
    words: ctx[P.list], cats,
    isAdult: v => !!v.adult || (v.cats || []).some(c => adultIds.has(c))
  };
}
const loadVerbs = () => { const a = load('verbs'); return { LEX_VERBS: a.words }; };

const outDir = pos => path.join(__dirname, 'out', pos);
const batchDir = pos => path.join(__dirname, 'batches', pos);

/* ---------- словоформи ---------- */
function wodForms() {
  const dir = path.join(__dirname, '..', 'wod', 'out');
  const m = new Map();
  if (!fs.existsSync(dir)) return m;
  fs.readdirSync(dir).filter(f => f.endsWith('.json')).forEach(f =>
    JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).forEach(e => { if (e.id != null && e.forms) m.set(e.id, e.forms); }));
  return m;
}
function guessVerbForms(v) {
  const w = v.en.toLowerCase().split(/[\s/]+/)[0];
  const set = new Set([w, w + 's', w + 'es', w + 'ed', w + 'd', w + 'ing']);
  if (/e$/.test(w)) set.add(w.slice(0, -1) + 'ing');
  if (/[^aeiou]y$/.test(w)) { set.add(w.slice(0, -1) + 'ies'); set.add(w.slice(0, -1) + 'ied'); }
  /* подвоєння приголосної: stop → stopped, а також equip → equipped, permit → permitted, compel → compelled */
  if (/[aeiou][^aeiouwxy]$/.test(w)) { set.add(w + w.slice(-1) + 'ed'); set.add(w + w.slice(-1) + 'ing'); }
  if (/ie$/.test(w)) set.add(w.slice(0, -2) + 'ying');
  [v.past, v.pp].forEach(f => String(f || '').split('/').forEach(x => x.trim() && set.add(x.trim().toLowerCase().split(/\s+/)[0])));
  return [...set].join('|');
}
let wf = null;
function verbFormsOf(v) {
  wf = wf || wodForms();
  const own = guessVerbForms(v);
  const fromWod = wf.get(v._id);
  return fromWod ? fromWod + '|' + own : own;
}

module.exports = { APP, read, POS, posArg, load, loadVerbs, outDir, batchDir, verbFormsOf, formsOf: verbFormsOf };
