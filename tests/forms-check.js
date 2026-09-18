const fs = require('fs');
const { boot } = require('./_boot');
const { doc, go, ok, finish } = boot();

eval(fs.readFileSync(require('path').join(require('./_boot').APP, 'js/lexis/adjs-data.js'), 'utf8') + ';globalThis.A = LEX_ADJS;');
const A = globalThis.A;

let passSingle = false, passMulti = false, tries = 0;
go('#/vocab/adjs/forms');

while ((!passSingle || !passMulti) && tries < 60) {
  tries++;
  const wordEl = doc.querySelector('.quiz-question .q-word');
  const en = wordEl.textContent.trim();
  const w = A.find(x => x.en === en && x.comp);
  if (!w) break;
  const answer = w.comp + ' ' + (w.sup || w.comp);
  const inp = doc.querySelector('#quiz-input');
  inp.disabled = false;
  inp.value = answer;
  doc.querySelector('#quiz-check').dispatchEvent(new doc.defaultView.MouseEvent('click', { bubbles: true }));
  const fb = doc.querySelector('.quiz-fb');
  if (fb && fb.classList.contains('ok')) {
    if (w.comp.includes(' ')) passMulti = true; else passSingle = true;
    console.log('  ✓ correct:', en, '→', answer, w.comp.includes(' ') ? '(multi-word)' : '(single)');
  } else {
    ok(false, 'expected OK for "' + en + '" with "' + answer + '" but got: ' + (fb ? fb.textContent.slice(0, 60) : 'no fb'));
    break;
  }
  // wait out the 900ms auto-advance by clicking next? The code schedules nextWord(); advance manually:
  const next = doc.querySelector('#quiz-next');
  if (next) next.dispatchEvent(new doc.defaultView.MouseEvent('click', { bubbles: true }));
}
ok(passSingle, 'single-word forms accepted (kinder kindest style)');
ok(passMulti, 'multi-word forms accepted (more X most X style)');
finish('FORMS CHECK PASSED ✓ (' + tries + ' tries)');
