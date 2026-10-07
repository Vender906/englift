/* Перевірка переписаних прикладів (див. SPEC.md).
   node tools/examples/validate.js adjs          — усі out/adjs/*.json
   node tools/examples/validate.js adjs 007 012  — лише вказані файли
   Помилки (✗) треба виправити; попередження (⚠) — переглянути. */
const fs = require('fs');
const path = require('path');
const { posArg, load, outDir, batchDir, verbFormsOf } = require('./common');

const cache = {};
const byIdOf = pos => cache[pos] || (cache[pos] = new Map(load(pos).words.map(v => [v._id, v])));

const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[‘’ʼ`´]/g, "'");
const words = s => norm(s).match(/[a-z]+(?:[-'][a-z]+)*/g) || [];
const PARTICLES = new Set(['up', 'out', 'off', 'on', 'down', 'in', 'back', 'over', 'away', 'through', 'around', 'about', 'along', 'apart', 'aside', 'by', 'forward', 'into', 'onto']);

function checkSentence(pos, v, en, uk, label, errs, warns) {
  const E = m => errs.push(label + ': ' + m), W = m => warns.push(label + ': ' + m);
  if (typeof en !== 'string' || !en.trim()) return E('empty');
  if (typeof uk !== 'string' || !uk.trim()) E('missing Ukrainian translation');
  const ws = words(en);
  if (ws.length < 7) E('too short (' + ws.length + ' words, need 8–18)');
  else if (ws.length < 8) W('7 words — a bit short');
  if (ws.length > 22) E('too long (' + ws.length + ' words)');
  else if (ws.length > 18) W(ws.length + ' words — a bit long');
  if (!/[.!?…]["')]?$/.test(en.trim())) E('must end with . ! or ?');
  if (/[а-яіїєґ]/i.test(en)) E('Cyrillic in the English sentence');
  if (uk && !/[а-яіїєґ]/i.test(uk)) E('Ukrainian translation has no Cyrillic');
  if (uk && /[ыэъё]/i.test(uk)) E('Russian letters in Ukrainian');
  if (uk && /[a-z]'[а-яіїєґ]|[а-яіїєґ]'[а-яіїєґ]|[а-яіїєґ]’[а-яіїєґ]/i.test(uk)) W('use ʼ (U+02BC) as the Ukrainian apostrophe');
  if (/[\u{1F300}-\u{1FAFF}]/u.test(en + uk)) E('no emoji');
  if (pos === 'verbs') checkVerb(v, en, ws, E, W);
  else checkPhrase(v, en, E);
}

/* прикметник (та ін.): увесь вираз як є (дефіс = пробіл) або ступені порівняння comp / sup */
function checkPhrase(v, en, E) {
  const flat = s => ' ' + (norm(s).match(/[a-z]+(?:'[a-z]+)*/g) || []).join(' ') + ' ';
  const sent = flat(en);
  const variants = [v.en, v.comp, v.sup].filter(Boolean).flatMap(x => String(x).split('/'))
    .map(x => flat(x.replace(/\(.*?\)/g, '')).trim()).filter(Boolean);
  if (!variants.some(x => sent.includes(' ' + x + ' '))) E('target word «' + v.en + '» not found as is' + (v.comp ? ' (or ' + v.comp + ' / ' + v.sup + ')' : ''));
}

/* дієслово: перше слово виразу в будь-якій формі + частка фразового дієслова */
function checkVerb(v, en, ws, E, W) {
  const forms = new Set(verbFormsOf(v).split(/[|/]/).map(x => norm(x).trim().split(/\s+/)[0]).filter(Boolean));
  const head = norm(v.en).split(/[\s/]+/)[0];
  const has = ws.some(w => forms.has(w) || forms.has(w.replace(/'s$/, '')));
  const hyphenHead = head.includes('-') && norm(en).includes(head.split('-')[0]);
  const beShort = head === 'be' && ws.some(w => /'(m|re|s)$/.test(w));   /* I'm broke, you're late */
  if (!has && !hyphenHead && !beShort) E('target verb «' + v.en + '» not found (forms: ' + [...forms].slice(0, 6).join(', ') + ')');
  const rest = norm(v.en).split(/\s+/).slice(1).filter(w => PARTICLES.has(w));
  if (rest.length && !rest.every(p => ws.includes(p))) W('particle «' + rest.join(' ') + '» not found');
}

function validateFile(pos, file) {
  const byId = byIdOf(pos);
  const errs = [], warns = [];
  let data;
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return { errs: ['bad JSON: ' + e.message], warns, n: 0 }; }
  if (!Array.isArray(data)) return { errs: ['must be an array'], warns, n: 0 };
  const batchFile = path.join(batchDir(pos), path.basename(file));
  if (fs.existsSync(batchFile)) {
    const want = JSON.parse(fs.readFileSync(batchFile, 'utf8')).map(x => x.id);
    const got = data.map(x => x.id);
    const missing = want.filter(id => !got.includes(id));
    if (missing.length) errs.push('missing ids from the batch: ' + missing.join(', '));
  }
  const seen = new Set();
  data.forEach((e, i) => {
    const tag = '#' + i + ' id ' + e.id + ' «' + e.en + '»';
    const v = byId.get(e.id);
    if (!v) return errs.push(tag + ': id not found');
    if (seen.has(e.id)) errs.push(tag + ': duplicate id');
    seen.add(e.id);
    if (e.en !== v.en) errs.push(tag + ': en must be exactly «' + v.en + '»');
    const er = [], wr = [];
    checkSentence(pos, v, e.ex, e.exUk, 'ex', er, wr);
    if (v.ex2) {
      if (!e.ex2) er.push('ex2: this word has a second example — rewrite it too');
      else {
        checkSentence(pos, v, e.ex2, e.ex2Uk, 'ex2', er, wr);
        if (norm(e.ex2) === norm(e.ex)) er.push('ex2 must differ from ex');
      }
    } else if (e.ex2) er.push('ex2 given, but this word has no second example');
    er.forEach(m => errs.push(tag + ' ' + m));
    wr.forEach(m => warns.push(tag + ' ' + m));
  });
  return { errs, warns, n: data.length };
}

if (require.main === module) {
  const pos = posArg(process.argv.slice(2));
  const dir = outDir(pos);
  const only = process.argv.slice(3).map(a => a.replace(/\.json$/, '').padStart(3, '0'));
  const files = (fs.existsSync(dir) ? fs.readdirSync(dir) : []).filter(f => f.endsWith('.json') && (!only.length || only.includes(f.slice(0, -5)))).sort();
  if (!files.length) { console.log('no files in out/' + pos + '/' + (only.length ? ' for ' + only.join(', ') : '')); process.exit(1); }
  let bad = 0, total = 0;
  for (const f of files) {
    const r = validateFile(pos, path.join(dir, f));
    total += r.n;
    if (r.errs.length) bad++;
    console.log((r.errs.length ? '✗ ' : '✓ ') + f + ' — ' + r.n + ' items, ' + r.errs.length + ' errors, ' + r.warns.length + ' warnings');
    r.errs.forEach(m => console.log('   ✗ ' + m));
    r.warns.forEach(m => console.log('   ⚠ ' + m));
  }
  console.log(bad ? '\n' + bad + ' file(s) with errors' : '\nALL OK — ' + total + ' items');
  process.exit(bad ? 1 : 0);
}

module.exports = { validateFile };
