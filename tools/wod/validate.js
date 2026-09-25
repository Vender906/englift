/* Перевірка даних Word on Demand тим самим судією, що й у застосунку.
   node tools/wod/validate.js out/001.a.json [out/001.b.json …]   (або без аргументів — усі out/*.json)
   Кожен файл — JSON-масив записів { id, w, uk, lvl, forms, tail?, near, tasks: [{ sit, say, ans[3], keys }] }. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..', '..');
const APP = path.join(ROOT, 'english-app');
const read = f => fs.readFileSync(path.join(APP, f), 'utf8');

function loadApp() {
  const ctx = { console };
  ctx.window = ctx;
  vm.createContext(ctx);
  const run = (code, name) => vm.runInContext(code, ctx, { filename: name });
  run(read('js/lexis/verbs-data.js') + ';window.LEX_VERBS=LEX_VERBS;window.LEX_VERB_CATS=LEX_VERB_CATS;window.LEX_VERB_SUBS=LEX_VERB_SUBS;', 'verbs-data.js');
  run(read('js/lexis/verbs-phrasal-data.js'), 'verbs-phrasal-data.js');
  run(read('js/lexis/verbs-merge.js'), 'verbs-merge.js');
  run(read('js/diary/checker.js'), 'checker.js');
  /* мінімальне ядро: судді потрібні лише oneTypo та дрібниці */
  run(`window.FLCore = {
    $: () => null, $$: () => [], esc: s => String(s), plural: (n, a) => a, store: {}, save() {}, touchStreak() {}, showToast() {}, addXp() {}, speak() {}, progressBar: () => '',
    oneTypo: ${oneTypoSrc()}
  };`, 'core-stub');
  run(read('js/wod.js'), 'wod.js');
  return ctx;
}
function oneTypoSrc() {
  const core = read('js/core.js');
  const m = core.match(/function oneTypo\(a, b\) \{[\s\S]*?\n  \}/);
  if (!m) throw new Error('oneTypo not found in core.js');
  return m[0];
}

const ctx = loadApp();
const F = ctx.FLWod;
const VERBS = ctx.LEX_VERBS;
const byId = new Map(VERBS.map(v => [v._id, v]));
const adultIds = new Set([...Object.entries(ctx.LEX_VERB_CATS), ...Object.entries(ctx.LEX_VERB_SUBS)].filter(([, c]) => c.adult).map(([k]) => k));
const isAdult = v => v.adult || (v.cats || []).some(c => adultIds.has(c));

const plain = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[‘’ʼ`´]/g, "'").trim();
const firstWords = s => String(s || '').split('/').map(x => plain(x).split(/\s+/)[0]);

function validateEntry(e) {
  const errs = [];
  const E = m => errs.push(m);
  /* слово поза словником дієслів: id = null, категорії задано в самому записі */
  const v = e.id == null && Array.isArray(e.cats) && e.cats.length
    ? { en: e.w, lvl: e.lvl, cats: e.cats }
    : byId.get(e.id);
  if (!v) return ['id ' + e.id + ' not found in LEX_VERBS'];
  if (v.en !== e.w) E('w must be exactly "' + v.en + '" (LEX_VERBS id ' + e.id + ')');
  if (isAdult(v)) E('adult verb — must not be included');
  if (e.lvl !== v.lvl) E('lvl must be ' + v.lvl);
  if (!e.uk || !/[а-яіїєґ]/i.test(e.uk)) E('uk must be a Ukrainian translation');
  if (typeof e.forms !== 'string' || e.forms.split('|').length !== 5) return errs.concat('forms must have 5 slots: base|-s|V2|V3|-ing');
  if (e.near != null && typeof e.near !== 'string') E('near must be a string');

  let W;
  try { W = F.prepWord(e); } catch (x) { return errs.concat('prepWord failed: ' + x.message); }
  const head = plain(e.w.replace(/\([^)]*\)/g, ' ')).split(/\s+/)[0];
  if (!W.slots[0].includes(head)) E('forms slot 1 (base) must contain "' + head + '"');
  if (/\s/.test(e.forms)) E('forms must contain only the FIRST word of the expression (the rest goes to tail): ' + e.forms);
  const past = firstWords(v.past), pp = firstWords(v.pp);
  if (v.past && !past.some(p => W.slots[2].includes(p))) E('V2 slot must include ' + past.join('/') + ' (from dictionary past "' + v.past + '")');
  if (v.pp && !pp.some(p => W.slots[3].includes(p))) E('V3 slot must include ' + pp.join('/') + ' (from dictionary pp "' + v.pp + '")');
  const isMulti = /\s/.test(e.w.replace(/\([^)]*\)/g, ' ').trim());
  if (isMulti && !W.tail.length) E('multi-word expression needs a non-empty tail');

  if (!Array.isArray(e.tasks) || e.tasks.length !== 3) return errs.concat('exactly 3 tasks required');
  const sits = new Set();
  e.tasks.forEach((t, n) => {
    const id = 'task ' + (n + 1);
    if (!t.sit || !t.say) { E(id + ': sit and say required'); return; }
    if (sits.has(t.sit)) E(id + ': duplicate sit'); sits.add(t.sit);
    if (/[a-z]/i.test(t.say.replace(/\b[A-Z][A-Z0-9-]{1,5}\b/g, ''))) E(id + ': say must be Ukrainian only (Latin allowed only for abbreviations like GPS, TV)');
    if (!Array.isArray(t.ans) || t.ans.length !== 3 || new Set(t.ans).size !== 3) { E(id + ': ans must be 3 different sentences'); return; }
    const keys = Object.entries(t.keys || {});
    if (!keys.length) E(id + ': keys required (at least 1)');
    keys.forEach(([k, p]) => {
      if (/[a-z]/i.test(k)) E(id + ': key label "' + k + '" must be Ukrainian');
      if (typeof p !== 'string' || !p.trim() || /(^|\|)\s*\*?\s*(\||$)/.test(p)) E(id + ': bad key pattern "' + p + '"');
    });
    t.ans.forEach((a, i) => {
      const tag = id + '/' + 'ABC'[i] + ' "' + a + '"';
      let r;
      try { r = F.judge(W, t, a); } catch (x) { E(tag + ': judge threw ' + x.message); return; }
      if (r.verdict !== 'ok') E(tag + ': verdict ' + r.verdict + (r.form ? ' (found only "' + r.form + '")' : '') + (r.missing && r.missing.length ? ' missing keys: ' + r.missing.join(', ') : ''));
      else {
        if (r.missing.length) E(tag + ': keys not matched: ' + r.missing.join(', '));
        if (r.grammar.length) E(tag + ': grammar alarm: ' + r.grammar.join(' | '));
      }
      if (!F.targetWords(W, a).set.size) E(tag + ': target not locatable for hints/highlight');
      if (/[а-яіїєґ]/i.test(a)) E(tag + ': Cyrillic in English answer');
    });
  });
  return errs;
}

function validateFiles(files) {
  let total = 0, bad = 0;
  const seen = new Map();
  const report = [];
  files.forEach(f => {
    let list;
    try { list = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (x) { report.push(f + ': INVALID JSON — ' + x.message); bad++; return; }
    if (!Array.isArray(list)) { report.push(f + ': must be a JSON array'); bad++; return; }
    list.forEach(e => {
      total++;
      const errs = validateEntry(e);
      if (seen.has(e.id)) errs.push('duplicate id (also in ' + seen.get(e.id) + ')');
      seen.set(e.id, path.basename(f));
      if (errs.length) { bad++; report.push('✗ ' + e.w + ' (id ' + e.id + ') [' + path.basename(f) + ']\n    - ' + errs.join('\n    - ')); }
    });
  });
  return { total, bad, report };
}

if (require.main === module) {
  let files = process.argv.slice(2);
  if (!files.length) {
    const dir = path.join(__dirname, 'out');
    files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).map(f => path.join(dir, f));
  }
  const { total, bad, report } = validateFiles(files);
  report.forEach(l => console.log(l));
  console.log('---\n' + total + ' entries, ' + bad + ' with errors');
  process.exit(bad ? 1 : 0);
}

module.exports = { validateFiles, validateEntry, loadApp };
