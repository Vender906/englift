const { boot } = require('./_boot');
const { window, doc, errs, go, ok, click } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];

/* множина 18+ слів за тим самим правилом: позначка або 18+ категорія */
const adultSet = {};
const src = { verbs: ['LEX_VERBS', 'LEX_VERB_CATS', 'LEX_VERB_SUBS'], nouns: ['LEX_NOUNS', 'LEX_NOUN_CATS', 'LEX_NOUN_SUBS'], adjs: ['LEX_ADJS', 'LEX_ADJ_CATS', 'LEX_ADJ_SUBS'], advs: ['LEX_ADVS', 'LEX_ADV_CATS', 'LEX_ADV_SUBS'] };
const LX = {};
require('vm').runInNewContext(['verbs', 'nouns', 'adjs', 'advs'].map(f => require('fs').readFileSync(require('path').join(require('./_boot').APP, 'js/lexis/' + f + '-data.js'), 'utf8')).join('\n;\n') +
  ';' + Object.values(src).flat().map(n => 'LX.' + n + ' = typeof ' + n + ' !== "undefined" ? ' + n + ' : {};').join(''), { LX });
for (const [p, [W, C, S]] of Object.entries(src)) {
  const words = LX[W], cats = LX[C], subs = LX[S];
  const ids = new Set([...Object.entries(cats), ...Object.entries(subs)].filter(([, c]) => c && c.adult).map(([id]) => id));
  adultSet[p] = new Set(words.filter(v => v.adult || (v.cats || []).some(id => ids.has(id))).map(v => v.en + '|' + (v.ctx || '') + '|' + v.uk));
}
const cardWord = () => { const en = $('#theCard .fc-en'); if (!en) return null; const c = en.querySelector('.fc-ctx'); const uk = $('#theCard .fc-uk'); return en.childNodes[0].textContent.trim() + '|' + (c ? c.textContent.replace(/^\(|\)$/g, '') : '') + '|' + (uk ? uk.childNodes[0].textContent.trim() : ''); };
const collect = (p, n) => {
  const seen = new Set();
  for (let i = 0; i < n && $('#theCard'); i++) {
    const en = cardWord(), uk = null;
    seen.add(en);
    click($('#fc-next'));
  }
  return seen;
};
const hasAdultEn = (p, set) => [...set].filter(key => adultSet[p].has(key));

const setSearch = v => { const s = $('#lex-search'); s.value = v; s.dispatchEvent(new window.Event('input', { bubbles: true })); };

for (const p of ['adjs', 'verbs', 'nouns', 'advs']) {
  go('#/vocab/' + p + '/cards');
  const seen = collect(p, 3000);
  const leak = hasAdultEn(p, seen);
  ok(leak.length === 0, p + ': cards without 18+ (' + seen.size + ' cards seen, leaked: ' + leak.slice(0, 8).join(', ') + ')');
}

// turn 18+ on, build adult-containing deck, then off
go('#/vocab/adjs'); setSearch('18+');
go('#/vocab/adjs/cards');
let seenOn = collect('adjs', 3000);
ok(hasAdultEn('adjs', seenOn).length > 50, '18+ ON: adult words present in deck (' + hasAdultEn('adjs', seenOn).length + ')');
go('#/vocab/adjs/cards'); // re-enter, keep in-progress deck
go('#/vocab/adjs'); setSearch('18+');
ok(!JSON.parse(window.localStorage.getItem('fluentlab_v2')).adult, '18+ turned off');
go('#/vocab/adjs/cards');
const seenOff = collect('adjs', 3000);
ok(hasAdultEn('adjs', seenOff).length === 0, 'after 18+ OFF: deck rebuilt without adult words (seen ' + seenOff.size + ')');

// typing trainer: 200 prompts in enuk
go('#/vocab/adjs/enuk');
const leakQ = [];
for (let i = 0; i < 300; i++) {
  const q = $('.quiz-question'); const txt = q ? q.textContent : '';
  [...adultSet.adjs].forEach(k => { const en = k.split('|')[0]; if (new RegExp('(^|\\s)' + en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(\\s|$|\\()').test(txt)) leakQ.push(en); });
  const skip = $$('button').find(b => /Пропустити|Далі|Показати/.test(b.textContent));
  if (skip) click(skip);
  const nxt = $$('button').find(b => /Далі|Наступ/.test(b.textContent)); if (nxt) click(nxt);
}
ok(leakQ.length === 0, 'typing trainer: no adult words (' + [...new Set(leakQ)].slice(0, 5).join(', ') + ')');

console.log('visible adjs:', LX.LEX_ADJS.length - adultSet.adjs.size, 'of', LX.LEX_ADJS.length);
console.log(errs.length ? 'FAILURES: ' + errs.join(' | ') : 'ADULT CARDS OK ✓');
process.exit(errs.length ? 1 : 0);
