/* Запуск усіх тестів: node run-all.js  (або npm test) */
const { spawnSync } = require('child_process');
const path = require('path');
const TESTS = ['smoke.js', 'interact.js', 'forms-check.js', 'adult-test.js', 'reader-themes.js', 'diary.js', 'adult-cards.js', 'checker.js', 'features.js', 'phrases.js', 'effects.js', 'phrasal.js', 'trainers.js', 'grammar-extra.js', 'modules.js', 'sound.js'];
let failed = 0;
for (const t of TESTS) {
  const started = Date.now();
  const r = spawnSync(process.execPath, [path.join(__dirname, t)], { encoding: 'utf8', cwd: __dirname });
  const ok = r.status === 0;
  if (!ok) failed++;
  console.log((ok ? '✓' : '✗') + ' ' + t.padEnd(18) + ((Date.now() - started) / 1000).toFixed(1) + 's');
  if (!ok) console.log((r.stdout + r.stderr).split('\n').filter(l => /✗|FAIL|Error|THREW/.test(l)).slice(0, 12).join('\n'));
}
console.log(failed ? '\n' + failed + ' FAILED' : '\nALL TESTS PASSED ✓');
process.exit(failed ? 1 : 0);
