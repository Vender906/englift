const { boot } = require('./_boot');
const { doc, go, ok, click, storeGet, finish } = boot();

/* ---- 1. flashcards: flip + know ---- */
go('#/vocab/nouns/cards');
let card = doc.querySelector('.flashcard');
ok(!!card, 'flashcard rendered on nouns/cards');
card.dispatchEvent(new (require('./node_modules/jsdom').window ? Object.getPrototypeOf(doc.defaultView.MouseEvent) : doc.defaultView.MouseEvent)('click', { bubbles: true }));
card = doc.querySelector('.flashcard');
ok(card.classList.contains('flipped'), 'card flips on click');
ok(!!card.querySelector('.fc-hidden .fc-uk'), 'ukrainian translation visible after flip');
click(doc.querySelector('.fc-btn.known'));
ok((storeGet().words || {}).nouns && storeGet().words.nouns.length === 1, 'known word persisted to localStorage');
click(doc.querySelector('.fc-btn.unknown'));
ok(storeGet().words.nouns.length === 1, 'unknown click does NOT persist');

/* ---- 2. enuk quiz feedback ---- */
go('#/vocab/nouns/enuk');
let inp = doc.querySelector('.quiz-input');
ok(!!inp, 'enuk quiz rendered');
inp.value = 'zzz_wrong';
click(doc.querySelector('#quiz-check'));
let fb = doc.querySelector('.quiz-fb');
ok(fb && fb.classList.contains('no') && /Правильно:/.test(fb.textContent), 'wrong answer shows correct answer');

/* ---- 3. scope select ---- */
go('#/vocab/verbs/cards');
const sel = doc.querySelector('.select-scope');
ok(!!sel && sel.querySelectorAll('optgroup').length > 30, 'verbs scope select has optgroups (' + sel.querySelectorAll('optgroup').length + ')');
const someOpt = [...sel.options].find(o => o.value && o.value !== 'all');
sel.value = someOpt.value;
sel.dispatchEvent(new doc.defaultView.Event('change', { bubbles: true }));
ok(!!doc.querySelector('.flashcard'), 'cards re-render after scope change (' + someOpt.value + ')');

/* ---- 4. verbs browser search + expand ---- */
go('#/vocab/verbs');
let search = doc.querySelector('#lex-search');
search.value = 'walk';
search.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
let cards = doc.querySelectorAll('.word-card');
ok(cards.length >= 1 && cards.length < 60, 'search "walk" yields results: ' + cards.length);
click(cards[0]);
ok(cards[0].classList.contains('expanded'), 'word card expands on click');
ok(cards[0].querySelectorAll('.audio-btn').length === 3, 'expanded card shows 3 audio buttons');

/* ---- 5. nouns drill-down + plural ---- */
go('#/vocab/nouns');
let nounHubs = doc.querySelectorAll('.hub-card');
ok(nounHubs.length >= 17, 'nouns hub (' + nounHubs.length + ' cards)');
click([...nounHubs].find(h => h.textContent.includes('Food')));
ok(doc.querySelectorAll('.word-card').length > 20, 'food category lists words');
ok(doc.querySelectorAll('.sub-chip').length >= 5, 'food shows sub-chips');
search = doc.querySelector('#lex-search');
search.value = 'tooth';
search.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
const tooth = [...doc.querySelectorAll('.word-card')].find(c => c.textContent.includes('tooth'));
click(tooth);
ok(tooth.textContent.includes('teeth'), 'irregular plural "teeth" displayed');

/* ---- 6. adjectives: hub, drill-down, forms row, syn/ant ---- */
go('#/vocab/adjs');
const adjHubs = doc.querySelectorAll('.hub-card');
ok(adjHubs.length >= 20, 'adjs hub (' + adjHubs.length + ' cards)');
search = doc.querySelector('#lex-search');
search.value = 'beautiful';
search.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
const bcard = [...doc.querySelectorAll('.word-card')].find(c => c.textContent.includes('beautiful'));
ok(!!bcard, 'search finds "beautiful"');
click(bcard);
ok(/more beautiful/.test(bcard.textContent), 'comparative shown on card');
ok(/≈/.test(bcard.textContent), 'synonyms shown on card');

/* ---- 7. adjs forms quiz ---- */
go('#/vocab/adjs/forms');
inp = doc.querySelector('.quiz-input');
ok(!!inp && /Ступені порівняння/.test(doc.querySelector('.quiz-box').textContent), 'adjs forms quiz rendered');
const qword = doc.querySelector('.quiz-question .q-word').textContent.trim();
inp.value = 'zzz';
click(doc.querySelector('#quiz-check'));
fb = doc.querySelector('.quiz-fb');
ok(fb && fb.classList.contains('no'), 'forms quiz negative feedback on wrong answer');
// answer from feedback, then a correct one via new word
const reveal = fb.textContent.match(/Правильно:\s*(.+)/);
ok(!!reveal, 'forms feedback reveals: ' + (reveal ? reveal[1].slice(0, 60) : '?'));

/* ---- 8. adjs ctx quiz ---- */
go('#/vocab/adjs/ctx');
ok(!!doc.querySelector('.quiz-input'), 'adjs ctx quiz rendered');

/* ---- 9. nav reset: leaving and returning resets browser to hub ---- */
go('#/vocab/verbs');
click([...doc.querySelectorAll('.hub-card')].find(h => h.dataset && h.dataset.cat));
const inCat = !!doc.querySelector('.cat-header');
ok(inCat, 'entered a verbs category');
go('#/grammar'); // switch section via hash (like sidebar)
go('#/vocab/verbs');
ok(doc.querySelectorAll('.hub-card').length > 0 && !doc.querySelector('.cat-header'), 'returning to verbs shows category hub again');
search = doc.querySelector('#lex-search');
ok(search && search.value === '', 'search field cleared on re-entry');

/* ---- 10. word info modal (verbs) ---- */
go('#/vocab/verbs');
search = doc.querySelector('#lex-search');
search.value = 'go';
search.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
const infoBtn = doc.querySelector('.wc-info-btn');
click(infoBtn);
ok(!!doc.querySelector('.vw-modal'), '📚 word-info modal opens');
click(doc.querySelector('.vw-close'));
ok(!doc.querySelector('.vw-modal'), 'modal closes');

/* ---- 11. adverbs: hub, drill-down, ctx badge, note ---- */
go('#/vocab/advs');
const advHubs = doc.querySelectorAll('.hub-card');
ok(advHubs.length >= 9, 'advs hub (' + advHubs.length + ' cards)');
click([...advHubs].find(h => h.dataset && h.dataset.cat === 'frequency'));
ok(doc.querySelectorAll('.word-card').length > 20, 'frequency category lists words');
ok(doc.querySelectorAll('.sub-chip').length >= 3, 'frequency shows sub-chips');
let sAdv = doc.querySelector('#lex-search');
sAdv.value = 'hardly';
sAdv.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
const hardly = [...doc.querySelectorAll('.word-card')].find(c => {
  const en = c.querySelector('.word-en');
  return en && en.textContent.trim() === 'hardly';
});
ok(!!hardly, 'search finds "hardly"');
click(hardly);
ok(/майже не/.test(hardly.textContent) && !!hardly.querySelector('.word-note'), 'hardly trap-note visible (hard ≠ hardly)');

/* ---- 12. adverbs ctx quiz ---- */
go('#/vocab/advs/ctx');
ok(!!doc.querySelector('.quiz-input') && /Контекст/.test(doc.querySelector('.quiz-box').textContent), 'advs ctx quiz rendered');

/* ---- 13. adverbs cards ---- */
go('#/vocab/advs/cards');
const advSel = doc.querySelector('.select-scope');
ok(!!advSel && advSel.querySelectorAll('optgroup').length >= 8, 'advs cards scope has optgroups (' + advSel.querySelectorAll('optgroup').length + ')');
ok(!!doc.querySelector('.flashcard'), 'advs flashcard renders');

/* ---- 14. adult hidden in advs too ---- */
go('#/vocab/advs');
ok(![...doc.querySelectorAll('.hub-card')].some(h => /Adult|18\+/i.test(h.textContent)), 'advs hub hides Adult when locked');

// ===== 15. Шпаргалка-таблиця внизу категорій граматики =====
console.log('\n=== 15. Grammar cheat tables ===');
for (const s of ['tenses', 'articles', 'prepositions', 'modals', 'conditionals', 'passive']) {
  go('#/grammar/' + s);
  const ct = doc.querySelector('.cheat-table');
  const grid = doc.querySelector('.grid-cards');
  ok(!!ct && !!grid && grid.compareDocumentPosition(ct) === 4, 'cheat table present AFTER topic cards: ' + s);
}
go('#/grammar/tenses');
const tRows = doc.querySelectorAll('.cheat-table tbody tr');
ok(tRows.length === 12, 'tenses table has 12 rows (got ' + tRows.length + ')');
const ppLink = Array.from(doc.querySelectorAll('.cheat-table .ct-link')).find(a => a.textContent === 'Past Perfect');
ok(!!ppLink && ppLink.getAttribute('href') === '#/grammar/tenses/past-perfect', 'Past Perfect row links to topic');
ppLink && ppLink.click();
ok(doc.getElementById('view').textContent.includes('Past Perfect') && doc.getElementById('view').textContent.includes('had'), 'cheat link click opens Past Perfect topic');
go('#/grammar/modals');
ok(doc.querySelectorAll('.grid-cards .topic-card').length === 6, 'modals now has 6 topics');
go('#/grammar/conditionals');
ok(doc.querySelectorAll('.grid-cards .topic-card').length === 6, 'conditionals now has 6 topics');
go('#/grammar/passive');
ok(doc.querySelectorAll('.grid-cards .topic-card').length === 4, 'passive now has 4 topics');
go('#/grammar/prepositions');
ok(doc.querySelectorAll('.grid-cards .topic-card').length === 9, 'prepositions now has 9 topics');
ok(doc.querySelectorAll('.cheat-multi .cheat-table').length === 9, 'prepositions cheat has 9 tables (got ' + doc.querySelectorAll('.cheat-multi .cheat-table').length + ')');
ok(!!doc.querySelector('.cm-head'), 'multi-table heading visible');
const depRow = Array.from(doc.querySelectorAll('.cheat-multi .ct-link')).find(a => a.textContent.includes('дієслово'));
ok(!!depRow && depRow.getAttribute('href') === '#/grammar/prepositions/prep-dependent', 'dependent-prep table links to topic');
ok(doc.getElementById('view').textContent.includes('попри'), 'tricky-pair translations visible (попри)');
ok(doc.getElementById('view').textContent.includes('завдяки'), 'cause table translation visible (завдяки)');
go('#/grammar');
ok(doc.querySelectorAll('.grid-cards a').length === 27, 'grammar home lists 27 separate categories');
go('#/grammar/used-to');
ok(doc.querySelectorAll('.grid-cards .topic-card').length === 1, 'used-to sub has its own page');
ok(doc.querySelectorAll('.cheat-table tbody tr').length === 4, 'used-to cheat has 4 rows');
go('#/grammar/used-to/used-to');
ok(doc.getElementById('view').textContent.includes('звикати') && doc.getElementById('view').textContent.includes('колись'), 'used-to theory translations visible');
go('#/grammar/causative');
ok(doc.querySelectorAll('.grid-cards .topic-card').length === 5, 'causative sub has its own page (1 + 4 нові теми)');
ok(doc.querySelectorAll('.cheat-table tbody tr').length === 4, 'causative cheat has 4 rows');
go('#/grammar/causative/causative');
ok(doc.getElementById('view').textContent.includes('I had my hair cut'), 'causative example visible');
for (const s of ['starters', 'intensifiers', 'indefinite', 'quantifiers', 'comparison', 'adj-prep', 'tags', 'relative', 'reported']) {
  go('#/grammar/' + s);
  const expected = { 'adj-prep': 7, reported: 7, comparison: 3, tags: 3, relative: 3 }[s] || 1;
  ok(doc.querySelectorAll('.grid-cards .topic-card').length === expected && !!doc.querySelector('.cheat-table'), s + ' sub renders ' + expected + ' topic card(s) + cheat table');
}
go('#/grammar/reported/reported');
ok(doc.getElementById('view').textContent.includes('крок') && doc.getElementById('view').textContent.includes('if'), 'reported speech theory visible');
go('#/grammar/intensifiers/intensifiers');
ok(doc.getElementById('view').textContent.includes('надто') && doc.getElementById('view').textContent.includes('достатньо') && doc.getElementById('view').textContent.includes('дуже'), 'merged intensifiers theory covers so/such/very/too/enough');
go('#/grammar/intensifiers/intensifiers/practice');
ok(!!doc.querySelector('.opt'), 'merged intensifiers practice renders');

// ===== 16. Практика нового часу: past-perfect =====
console.log('\n=== 16. Past Perfect practice session ===');
go('#/grammar/tenses/past-perfect/practice');
const ppQ1 = doc.querySelector('.opt');
ppQ1 && ppQ1.click();
if (doc.querySelector('.feedback.good, .feedback.bad')) console.log('✓ past-perfect first question answered');
else ok(false, 'pp quiz feedback');
const qCount = doc.querySelector('.session-count') ? doc.querySelector('.session-count').textContent.trim() : '(missing)';
if (qCount.includes('/ 8')) console.log('✓ 8 questions in session (' + qCount + ')');
else ok(false, 'pp question count: ' + qCount);

finish('ALL INTERACTION TESTS PASSED ✓');
