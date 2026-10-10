/* Перевірка нових записів словника з Oxford 3000/5000 (див. SPEC.md).
   node tools/oxford/validate.js <verbs|nouns|adjs|advs>          — усі out/<pos>/*.json
   node tools/oxford/validate.js <pos> 003 007                    — лише вказані файли */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { load } = require('../examples/common');
const { checkSentence } = require('../examples/validate');

const POSES = ['verbs', 'nouns', 'adjs', 'advs'];
const NEW = require('./categories.json');
const missing = require('./missing.json');
const OX_LVL = new Map();
const P1 = { v: 'verbs', n: 'nouns', adj: 'adjs', adv: 'advs' };
missing.forEach(x => { const k = P1[x.pos] + '|' + x.en; if (!OX_LVL.has(k)) OX_LVL.set(k, x.lvl); });

const cache = {};
function app(pos) {
  if (cache[pos]) return cache[pos];
  let words, cats, subs;
  if (pos === 'advs') {
    const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', '..', 'english-app', 'js', 'lexis', 'advs-data.js'), 'utf8') + ';window.W=LEX_ADVS;window.C=LEX_ADV_CATS;window.S=LEX_ADV_SUBS;', ctx);
    const ox = path.join(__dirname, '..', '..', 'english-app', 'js', 'lexis', 'advs-oxford-data.js');
    if (fs.existsSync(ox)) vm.runInContext(fs.readFileSync(ox, 'utf8'), ctx);
    words = ctx.W; cats = ctx.C; subs = ctx.S;
  } else {
    const a = load(pos);
    words = a.words;
    cats = Object.fromEntries(Object.entries(a.cats).filter(([, c]) => !c.parent));
    subs = Object.fromEntries(Object.entries(a.cats).filter(([, c]) => c.parent));
  }
  cats = Object.assign({}, cats, NEW[pos].cats);
  subs = Object.assign({}, subs, NEW[pos].subs);
  const adultIds = new Set([...Object.entries(cats), ...Object.entries(subs)].filter(([k, c]) => c.adult || k === 'adult' || c.parent === 'adult').map(([k]) => k));
  return (cache[pos] = { words, cats, subs, adultIds });
}

const CYR = /[а-яіїєґ]/i;
function validateItem(pos, e, tag, E, W) {
  const A = app(pos);
  if (!e || typeof e.key !== 'string') return E(tag + ': missing key');
  if (!e.key.startsWith(pos + '|')) E(tag + ': key must start with «' + pos + '|»');
  if (e.skip !== undefined) {
    if (typeof e.skip !== 'string' || e.skip.length < 8) E(tag + ': skip needs a reason');
    return;
  }
  const want = ['en', 'uk', 'ipa', 'emoji', 'lvl', 'cats', 'ex', 'exUk'];
  want.forEach(f => { if (e[f] == null || e[f] === '' || (Array.isArray(e[f]) && !e[f].length)) E(tag + ': missing ' + f); });
  if (e.en && e.key !== pos + '|' + e.en.toLowerCase()) E(tag + ': en «' + e.en + '» must match the key');
  const ox = OX_LVL.get(e.key);
  if (ox && e.lvl !== ox) E(tag + ': lvl must be ' + ox + ' (Oxford)');
  if (e.uk && !CYR.test(e.uk)) E(tag + ': uk must be Ukrainian');
  if (e.uk && /[ыэъё]/i.test(e.uk + (e.uCtx || '') + (e.note || ''))) E(tag + ': Russian letters');
  if (/[а-яіїєґ]['’][а-яіїєґ]/i.test((e.uk || '') + (e.uCtx || '') + (e.exUk || ''))) E(tag + ': use ʼ (U+02BC) as the Ukrainian apostrophe');
  if (e.ipa && !/^\/[^/]+\/$/.test(e.ipa)) E(tag + ': ipa must look like /…/');
  if (e.ipa && /[a-z]\.[a-z]/.test(e.ipa)) W(tag + ': ipa has dots — use the dictionary style without syllable dots');
  if (e.emoji && /^[\x00-\x7f]*$/.test(e.emoji)) E(tag + ': emoji must be an emoji');
  if ((e.ctx && !e.uCtx) || (!e.ctx && e.uCtx)) E(tag + ': ctx and uCtx go together');
  if (e.reg2 && !['formal', 'casual'].includes(e.reg2)) E(tag + ': reg2 is "formal" or "casual"');
  /* категорії */
  if (Array.isArray(e.cats)) {
    const bad = e.cats.filter(c => !A.cats[c] && !A.subs[c]);
    if (bad.length) E(tag + ': unknown category ids: ' + bad.join(', '));
    if (e.cats.some(c => A.adultIds.has(c))) E(tag + ': adult categories are not allowed');
    const topCats = e.cats.filter(c => A.cats[c]);
    if (!topCats.length) E(tag + ': cats must include a category id');
    if (topCats.length > 2) W(tag + ': more than two topics');
    e.cats.filter(c => A.subs[c]).forEach(s => { if (!e.cats.includes(A.subs[s].parent)) E(tag + ': subcategory «' + s + '» needs its category «' + A.subs[s].parent + '» in cats'); });
    topCats.forEach(c => {
      const hasSubs = Object.values(A.subs).some(s => s.parent === c);
      if (hasSubs && !e.cats.some(s => A.subs[s] && A.subs[s].parent === c)) E(tag + ': category «' + c + '» needs one of its subcategories');
    });
  }
  /* частина мови */
  if (pos === 'verbs') {
    const irr = e.past || e.pp || e.reg === false;
    if (irr && !(e.past && e.pp && e.reg === false)) E(tag + ': irregular verb needs past, pp and "reg": false together');
  }
  if (pos === 'nouns') {
    if (e.cu && !['C', 'U'].includes(e.cu)) E(tag + ': cu is "C" or "U"');
    if (!e.cu && !/plural only/i.test(e.note || '')) E(tag + ': cu missing (or note "plural only")');
  }
  if (pos === 'adjs') {
    if (e.grad === false && (e.comp || e.sup)) E(tag + ': grad:false and comp/sup exclude each other');
    if (e.grad !== false && !(e.comp && e.sup)) E(tag + ': gradable adjectives need comp and sup (or "grad": false)');
  }
  /* дубль наявної картки */
  if (e.en && e.uk) {
    const same = A.words.find(w => !(w._id >= 10000) && String(w.en).toLowerCase() === e.en.toLowerCase() && String(w.uk).toLowerCase() === e.uk.toLowerCase());
    if (same) E(tag + ': the app already has «' + same.en + '» = «' + same.uk + '» — write the missing meaning or skip');
  }
  /* приклад — ті самі правила, що в tools/examples */
  if (e.ex) {
    const er = [], wr = [];
    const v = Object.assign({ _id: -1 }, e);
    checkSentence(pos === 'advs' ? 'adjs' : pos, v, e.ex, e.exUk, 'ex', er, wr);
    er.forEach(m => E(tag + ' ' + m));
    wr.forEach(m => W(tag + ' ' + m));
  }
}

function validateFile(pos, file) {
  const errs = [], warns = [];
  let data;
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (err) { return { errs: ['bad JSON: ' + err.message], warns, n: 0, skips: 0 }; }
  if (!Array.isArray(data)) return { errs: ['must be an array'], warns, n: 0, skips: 0 };
  const batchFile = path.join(__dirname, 'batches', pos, path.basename(file));
  if (fs.existsSync(batchFile)) {
    const want = JSON.parse(fs.readFileSync(batchFile, 'utf8')).map(x => x.key);
    const got = new Set(data.map(x => x && x.key));
    const miss = want.filter(k => !got.has(k));
    if (miss.length) errs.push('missing keys from the batch: ' + miss.join(', '));
  }
  const seen = new Set();
  data.forEach((e, i) => {
    const tag = '#' + i + ' ' + (e && e.key);
    if (e && seen.has(e.key)) errs.push(tag + ': duplicate key');
    if (e) seen.add(e.key);
    validateItem(pos, e, tag, m => errs.push(m), m => warns.push(m));
  });
  return { errs, warns, n: data.length, skips: data.filter(e => e && e.skip).length };
}

if (require.main === module) {
  const pos = process.argv[2];
  if (!POSES.includes(pos)) { console.log('First argument: ' + POSES.join(' | ')); process.exit(1); }
  const dir = path.join(__dirname, 'out', pos);
  const only = process.argv.slice(3).map(a => a.replace(/\.json$/, '').padStart(3, '0'));
  const files = (fs.existsSync(dir) ? fs.readdirSync(dir) : []).filter(f => f.endsWith('.json') && (!only.length || only.includes(f.slice(0, -5)))).sort();
  if (!files.length) { console.log('no files in out/' + pos + '/'); process.exit(1); }
  let bad = 0, total = 0, skips = 0;
  for (const f of files) {
    const r = validateFile(pos, path.join(dir, f));
    total += r.n; skips += r.skips;
    if (r.errs.length) bad++;
    console.log((r.errs.length ? '✗ ' : '✓ ') + f + ' — ' + r.n + ' items (' + r.skips + ' skipped), ' + r.errs.length + ' errors, ' + r.warns.length + ' warnings');
    r.errs.forEach(m => console.log('   ✗ ' + m));
    r.warns.forEach(m => console.log('   ⚠ ' + m));
  }
  console.log(bad ? '\n' + bad + ' file(s) with errors' : '\nALL OK — ' + total + ' items, ' + skips + ' skipped');
  process.exit(bad ? 1 : 0);
}

module.exports = { validateFile, POSES };
