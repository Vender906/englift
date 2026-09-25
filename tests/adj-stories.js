/* Прикметники → «Історії»: дані, синоніми, одруківки, збереження результату */
const { boot } = require('./_boot');
const { window, doc, go, ok, click, storeGet, finish } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];
const RE = /\[([^\]|]+)\|([^\]|]*)\|([^\]]+)\]/g;

const stories = window.LEX_ADJ_STORIES;
ok(Array.isArray(stories) && stories.length >= 10, 'stories loaded: ' + (stories || []).length);
const ids = new Set();
stories.forEach(s => {
  ok(!ids.has(s.id), s.id + ': unique id'); ids.add(s.id);
  const gaps = [...s.text.matchAll(RE)];
  ok(gaps.length >= 8, s.id + ': ' + gaps.length + ' gaps');
  ok(!/[[\]]/.test(s.text.replace(RE, '')), s.id + ': no broken gap brackets');
  gaps.forEach(g => {
    const syn = g[2].split(',').map(x => x.trim().toLowerCase()).filter(Boolean);
    ok(!syn.includes(g[1].toLowerCase()), s.id + '/' + g[1] + ': synonym list does not repeat the answer');
  });
});

go('#/vocab/adjs/stories');
ok($$('#pos-tabs .tab').some(t => t.textContent.includes('Історії')), 'adjectives have the Stories tab');
ok($$('.st-pick').length === stories.length, 'picker lists every story');

click($('.st-pick[data-id="flat"]'));
const inputs = $$('.st-in');
ok(inputs.length === 11, 'flat: 11 inputs');
const type = (i, v) => { inputs[i].value = v; inputs[i].dispatchEvent(new window.Event('input', { bubbles: true })); };
/* new, big, bright, clean, small, comfortable, friendly, quiet, noisy, expensive, happy */
type(0, 'new'); type(1, 'large'); type(2, 'Sunny'); type(3, 'claen'); type(4, 'green');
type(5, 'comfortable'); type(6, 'friendly'); type(7, 'quiet'); type(8, 'noisy'); type(9, 'expensive'); type(10, 'happy');
click($('#st-check'));
ok(inputs[0].classList.contains('ok'), 'exact answer accepted');
ok(inputs[1].classList.contains('syn') && inputs[2].classList.contains('syn'), 'synonyms accepted (case-insensitive)');
ok(inputs[3].classList.contains('almost'), 'one-letter typo marked as almost');
ok(inputs[4].classList.contains('bad'), 'wrong word rejected');
ok(inputs[0].readOnly && !inputs[4].readOnly, 'correct gaps lock, wrong stay editable');
ok(/9 \/ 11/.test($('#st-fb').textContent), 'score 9 / 11 shown: ' + $('#st-fb').textContent);
ok($$('.st-rev-row').length === 11, 'review lists all gaps');
ok(storeGet().stories && storeGet().stories.flat === 9, 'best score saved');

type(3, 'clean'); type(4, 'tiny');
click($('#st-check'));
ok($$('.st-in.bad, .st-in.almost').length === 0, 'fixed gaps pass on re-check');
ok(storeGet().stories.flat === 9, 're-check does not inflate the saved score');

click($('#st-next'));
ok($('.st-head h2').textContent === stories[1].title, 'next story opens');
click($('#st-show'));
ok($$('.st-in.shown').length === $$('.st-in').length, 'show answers fills every gap');
click($('.st-back'));
ok($$('.st-pick').length === stories.length && /9 \/ 11/.test($('.st-pick[data-id="flat"]').textContent), 'picker shows best score');

finish('ADJ STORIES OK');
