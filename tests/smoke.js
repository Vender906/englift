const { boot } = require('./_boot');
const { doc, errs, go, finish } = boot();

const routes = [
  '#/', '#/grammar', '#/vocab',
  '#/vocab/verbs', '#/vocab/verbs/cards', '#/vocab/verbs/enuk', '#/vocab/verbs/uken', '#/vocab/verbs/forms', '#/vocab/verbs/ctx', '#/vocab/verbs/mix',
  '#/vocab/nouns', '#/vocab/nouns/cards', '#/vocab/nouns/enuk', '#/vocab/nouns/cu', '#/vocab/nouns/mix',
  '#/vocab/adjs', '#/vocab/adjs/cards', '#/vocab/adjs/enuk', '#/vocab/adjs/forms', '#/vocab/adjs/ctx', '#/vocab/adjs/mix',
  '#/vocab/advs', '#/vocab/advs/cards', '#/vocab/advs/enuk', '#/vocab/advs/uken', '#/vocab/advs/ctx', '#/vocab/advs/mix',
  '#/listen', '#/challenge', '#/read', '#/diary', '#/diary/entries', '#/diary/settings', '#/nonexistent'
];

for (const r of routes) {
  go(r);
  const view = doc.getElementById('view');
  const len = view ? view.textContent.trim().length : 0;
  if (len < 40) errs.push('route ' + r + ' rendered almost nothing (' + len + ' chars)');
  console.log(r.padEnd(26), '→', len, 'chars,', view.textContent.trim().slice(0, 52).replace(/\s+/g, ' '));
}

const navLinks = [...doc.querySelectorAll('.nav-sub a')].map(a => a.getAttribute('href'));
console.log('vocab nav links:', navLinks.filter(h => h && h.startsWith('#/vocab')).join(', '));
if (!errs.length) console.log('ALL ROUTES RENDERED OK ✓');

/* extra: cheat tables on all grammar subs + new topics */
for (const s of ['tenses', 'articles', 'prepositions', 'modals', 'conditionals', 'passive', 'used-to', 'causative', 'starters', 'intensifiers', 'indefinite', 'quantifiers', 'comparison', 'adj-prep', 'tags', 'relative', 'reported', 'gerund-infinitive', 'questions', 'linkers', 'time-clauses', 'pronouns', 'short-responses', 'preferences', 'word-order', 'stative', 'advanced']) {
  go('#/grammar/' + s);
  const ct = doc.querySelector('.cheat-table');
  const rows = doc.querySelectorAll('.cheat-table tbody tr').length;
  if (ct && rows >= 3) console.log('✓ cheat table on ' + s + ' (' + rows + ' rows)');
  else { console.log('✗ cheat table issue on ' + s + ' (rows: ' + rows + ')'); errs.push('cheat ' + s); }
}
for (const r of ['#/grammar/tenses/past-perfect', '#/grammar/tenses/past-perfect-continuous', '#/grammar/tenses/present-perfect-continuous', '#/grammar/tenses/future-continuous', '#/grammar/tenses/future-perfect', '#/grammar/tenses/future-perfect-continuous', '#/grammar/modals/may-might', '#/grammar/modals/deduction', '#/grammar/conditionals/mixed-conditional', '#/grammar/conditionals/wish', '#/grammar/passive/two-objects', '#/grammar/passive/reporting', '#/grammar/prepositions/prep-agent', '#/grammar/prepositions/prep-dependent', '#/grammar/prepositions/prep-tricky', '#/grammar/prepositions/prep-cause', '#/grammar/prepositions/prep-purpose', '#/grammar/prepositions/prep-manner', '#/grammar/used-to', '#/grammar/used-to/used-to', '#/grammar/causative', '#/grammar/causative/causative', '#/grammar/causative/causative/practice', '#/grammar/starters/starters', '#/grammar/intensifiers/intensifiers', '#/grammar/indefinite/indefinite', '#/grammar/quantifiers/quantifiers', '#/grammar/comparison/comparison', '#/grammar/adj-prep/adj-prep', '#/grammar/tags/tags', '#/grammar/relative/relative', '#/grammar/reported/reported', '#/grammar/reported/reported/practice', '#/grammar/gerund-infinitive/gerund', '#/grammar/gerund-infinitive/infinitive', '#/grammar/gerund-infinitive/gerund-inf-meaning', '#/grammar/gerund-infinitive/gerund-inf-meaning/practice', '#/grammar/questions/question-forms', '#/grammar/questions/indirect-questions', '#/grammar/questions/indirect-questions/practice', '#/grammar/linkers/link-contrast', '#/grammar/linkers/link-cause', '#/grammar/linkers/link-addition', '#/grammar/linkers/link-condition', '#/grammar/linkers/link-sequence/practice', '#/grammar/time-clauses/time-future', '#/grammar/time-clauses/time-linkers/practice', '#/grammar/pronouns/pron-personal', '#/grammar/pronouns/pron-reflexive', '#/grammar/pronouns/pron-demonstrative', '#/grammar/pronouns/pron-quantity/practice', '#/grammar/modals/modal-perfect', '#/grammar/short-responses/so-neither', '#/grammar/short-responses/short-answers/practice', '#/grammar/preferences/rather-better', '#/grammar/preferences/prefer/practice', '#/grammar/word-order/order-basic', '#/grammar/word-order/order-adverbs', '#/grammar/word-order/order-adjectives/practice', '#/grammar/stative/stative-verbs', '#/grammar/stative/stative-dynamic/practice', '#/grammar/advanced/inversion', '#/grammar/advanced/cleft', '#/grammar/advanced/participle/practice', '#/grammar/intensifiers/intensifiers/practice']) {
  go(r);
  const len = doc.getElementById('view').textContent.trim().length;
  if (len < 40) { console.log('✗ thin route: ' + r); errs.push(r); } else console.log('✓ ' + r + ' → ' + len + ' chars');
}
console.log(errs.length ? 'SMOKE EXTRA FAILURES' : 'SMOKE EXTRA OK ✓');
if (errs.length) process.exit(1);
