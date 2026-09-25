/* Збирання даних Word on Demand: tools/wod/out/*.json → english-app/js/lexis/wod/verbs-NN.js
   node tools/wod/build.js [файли…]   (без аргументів — усі out/*.json)
   Спершу все проходить validate.js; з помилками нічого не записується.
   Частини ~700 КБ кожна вантажаться застосунком лише при відкритті тренажера; їхній список
   вписується в PARTS у js/wod.js. */
const fs = require('fs');
const path = require('path');
const { validateFiles } = require('./validate.js');

const ROOT = path.join(__dirname, '..', '..');
const OUT = path.join(__dirname, 'out');
const DEST = path.join(ROOT, 'english-app', 'js', 'lexis', 'wod');
const WOD_JS = path.join(ROOT, 'english-app', 'js', 'wod.js');
const PART_BYTES = 700 * 1024;

const files = process.argv.length > 2 ? process.argv.slice(2).map(f => path.resolve(f))
  : fs.readdirSync(OUT).filter(f => f.endsWith('.json')).sort().map(f => path.join(OUT, f));
const { total, bad, report } = validateFiles(files);
if (bad) {
  report.forEach(l => console.log(l));
  console.log('---\n' + bad + ' of ' + total + ' entries have errors — nothing written.');
  process.exit(1);
}

const FIELDS = ['id', 'w', 'uk', 'lvl', 'cats', 'forms', 'tail', 'near', 'tasks'];
const entries = files.flatMap(f => JSON.parse(fs.readFileSync(f, 'utf8')))
  .map(e => Object.fromEntries(FIELDS.filter(k => e[k] != null).map(k => [k, e[k]])))
  .sort((a, b) => (a.id ?? -1) - (b.id ?? -1));

const parts = [];
let cur = [], size = 0;
entries.forEach(e => {
  const line = JSON.stringify(e);
  if (size + line.length > PART_BYTES && cur.length) { parts.push(cur); cur = []; size = 0; }
  cur.push(line); size += line.length;
});
if (cur.length) parts.push(cur);

fs.mkdirSync(DEST, { recursive: true });
fs.readdirSync(DEST).filter(f => /^verbs-\d+\.js$/.test(f)).forEach(f => fs.unlinkSync(path.join(DEST, f)));
const names = parts.map((lines, i) => {
  const name = 'verbs-' + String(i + 1).padStart(2, '0');
  fs.writeFileSync(path.join(DEST, name + '.js'),
    '/* EngLift — Word on Demand: ситуації для дієслів, частина ' + (i + 1) + ' з ' + parts.length + '.\n' +
    '   Згенеровано tools/wod/build.js з tools/wod/out/*.json — не редагуйте вручну. Формат описано в tools/wod/SPEC.md. */\n' +
    '(window.LEX_WOD_VERBS = window.LEX_WOD_VERBS || []).push(\n' + lines.join(',\n') + '\n);\n' +
    '(window.LEX_WOD_LOADED = window.LEX_WOD_LOADED || {})[' + JSON.stringify(name) + '] = true;\n');
  return name;
});

const src = fs.readFileSync(WOD_JS, 'utf8');
const next = src.replace(/const PARTS = \[\/\* @wod-parts \*\/[^\]]*\];/, 'const PARTS = [/* @wod-parts */' + names.map(n => "'" + n + "'").join(', ') + '];');
if (next === src && !src.includes('/* @wod-parts */' + names.map(n => "'" + n + "'").join(', '))) throw new Error('PARTS marker not found in wod.js');
fs.writeFileSync(WOD_JS, next);

const tasks = entries.reduce((a, e) => a + e.tasks.length, 0);
const bytes = names.reduce((a, n) => a + fs.statSync(path.join(DEST, n + '.js')).size, 0);
console.log(entries.length + ' verbs, ' + tasks + ' situations → ' + names.length + ' parts, ' + (bytes / 1024 / 1024).toFixed(2) + ' MB');
