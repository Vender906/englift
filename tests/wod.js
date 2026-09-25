/* Дієслова → Word on Demand: контент, перевірка відповіді, підказки, інтервали, вибір категорій, статистика */
const { boot } = require('./_boot');
const { window, doc, go, ok, click, storeGet, finish } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];
const F = window.FLWod;

/* ---------- 1. контент: кожна відповідь-еталон проходить ту саму перевірку, що й відповідь учня ---------- */
const WORDS = F.words();
ok(WORDS.length >= 10, 'situations for ' + WORDS.length + ' verbs');
const bad = [], ids = new Set(), keys = new Set();
let nTasks = 0;
WORDS.forEach(W => {
  const B = m => bad.push(W.k + ': ' + m);
  if (keys.has(W.k)) B('duplicate progress key'); keys.add(W.k);
  if (W.slots.length !== 5) B('forms need 5 slots (base|-s|V2|V3|-ing)');
  if (W.tasks.length < 3) B(W.tasks.length + ' situations');
  W.tasks.forEach(T => {
    nTasks++;
    if (ids.has(T.id)) B(T.id + ' duplicate id'); ids.add(T.id);
    if (!(T.sit && T.say && Object.keys(T.keys || {}).length)) B(T.id + ' needs situation, thought and meaning keys');
    if (!(T.ans.length === 3 && new Set(T.ans).size === 3)) B(T.id + ' needs three different answers');
    if (/[a-z]/i.test(T.say.replace(/\b[A-Z][A-Z0-9-]{1,5}\b/g, ''))) B(T.id + ' thought must be Ukrainian');
    T.ans.forEach((a, i) => {
      const r = F.judge(W, T, a), tag = T.id + '/' + 'ABC'[i] + ' «' + a + '»';
      if (r.verdict !== 'ok' || r.missing.length) B(tag + ' → ' + r.verdict + (r.missing && r.missing.length ? ', missing ' + r.missing : ''));
      else if (r.grammar.length) B(tag + ' → false grammar alarm: ' + r.grammar.join(' | '));
      if (!F.targetWords(W, a).set.size) B(tag + ' → target not found for hints');
    });
  });
});
ok(!bad.length, nTasks + ' situations: every reference answer uses the target, covers the meaning and raises no grammar alarm' +
  (bad.length ? ' — ' + bad.length + ' problems:\n    ' + bad.slice(0, 25).join('\n    ') : ''));
const dupW = WORDS.filter(W => WORDS.some(X => X !== W && X.w === W.w));
ok(dupW.every(W => W.k !== W.w && W.k.startsWith(W.w + '@')), 'several meanings of one word keep separate progress (' + dupW.length + ' such entries)');

/* ---------- 2. перевірка: зміст + слово + граматика, а не точний збіг ---------- */
const PID = { forget: 105, realize: 103, avoid: null, stumble: 712 };
const W = w => WORDS.find(x => x.w === w && (x.id ?? null) === PID[w]);
const T = (w, n) => W(w).tasks[n - 1];
const J = (w, n, text) => F.judge(W(w), T(w, n), text);
let r = J('stumble', 1, 'I stumbled when I walked on the stairs but I didn\'t fall.');
ok(r.verdict === 'ok' && !r.grammar.length && !r.missing.length, 'own wording that differs from the references is accepted');
ok(r.closest.sim < 0.85, 'and it is not a copy of a reference, so a more natural option is offered');
ok(J('forget', 1, 'I forgot to take my phone with me').verdict === 'ok' && J('forget', 1, 'i forgot my phone').verdict === 'ok', 'several natural answers accepted, case and punctuation ignored');
ok(J('realize', 1, 'I realised I had forgotten my keys').verdict === 'ok', 'British spelling of the target accepted');
r = J('stumble', 1, 'I tripped on the stairs, but I didn\'t fall.');
ok(r.verdict === 'notarget' && r.near === 'tripped', 'synonym instead of the target is not accepted and is named');
ok(J('stumble', 1, 'I stumbeld on the stairs but did not fall').verdict === 'typo', 'typo in the target word is flagged as a typo');
ok(J('stumble', 1, 'stumbled').verdict === 'short', 'a single word is not a sentence');
ok(J('stumble', 1, 'Yesterday I stumbled a lot.').verdict === 'unsure', 'target present but the thought is missing → unsure (user can confirm)');
ok(J('forget', 1, 'Sorry, I have forgot my phone.').grammar.some(g => /forgotten/.test(g)), 'have + V2 → suggests V3');
ok(J('realize', 1, 'I didn\'t realized I had forgotten my keys').grammar.some(g => /did/.test(g) && /realize\b/.test(g)), 'did not + V2 → suggests the base form');
ok(J('stumble', 1, 'He stumble on the stairs but he didn\'t fall').grammar.some(g => /stumbles/.test(g)), 'he + base → 3rd person hint');
ok(J('avoid', 3, 'I think she is avoid me').grammar.some(g => /avoiding/.test(g)), 'is + base → suggests -ing');

/* стійкі вирази: частка може стояти після додатка; без неї — «бракує частини виразу» */
const GU = F.prepWord({ id: 1, w: 'give up', uk: 'кинути', lvl: 'A2', forms: 'give|gives|gave|given|giving', tail: 'up', near: 'quit*',
  tasks: [{ sit: 'с', say: 'Я кинув курити.', ans: ['I gave up smoking.', 'I gave smoking up.', 'I gave it up.'], keys: { 'курити': 'smok*|it' } }] });
const JG = t => F.judge(GU, GU.tasks[0], t);
ok(JG('I gave up smoking last year').verdict === 'ok' && JG('I finally gave smoking up').verdict === 'ok' && JG('She has given it up, smoking I mean').verdict === 'ok', 'phrasal verb: joined and separated forms accepted');
r = JG('I gave smoking a break');
ok(r.verdict === 'partial' && r.form === 'gave', 'verb without its particle → partial, the particle is not revealed');
ok(JG('I quit smoking last year').verdict === 'notarget', 'synonym of a phrasal verb → not the target');
ok(F.targetWords(GU, 'I gave smoking up.').set.size === 2, 'both words of a separated phrasal verb are found for hints and highlighting');
const TW = F.prepWord({ id: 2, w: 'bear in mind', uk: 'мати на увазі', lvl: 'B2', forms: 'bear|bears|bore|borne|bearing', near: '', tasks: [] });
ok(TW.tail.length === 2 && F.judge(TW, { ans: ['x'], keys: {} }, 'Please bear that in mind').verdict === 'ok', 'tail taken from the expression when not given');
const DC = F.prepWord({ id: 3, w: 'double-check', uk: 'перевірити ще раз', lvl: 'B1', forms: 'double-check|double-checks|double-checked|double-checked|double-checking', tasks: [] });
ok(F.judge(DC, { ans: ['x'], keys: {} }, 'I double-checked the address twice').verdict === 'ok' && F.targetWords(DC, 'I double-checked it.').set.size === 1, 'hyphenated verb is one word');
const SA = F.prepWord({ id: 4, w: 'sauté', uk: 'обсмажити', lvl: 'B2', forms: 'sauté|sautés|sautéed|sautéed|sautéing', tasks: [] });
ok(F.judge(SA, { ans: ['x'], keys: {} }, 'I sauteed the onions first').verdict === 'ok', 'accents do not matter');

/* ---------- 3. інтервали ---------- */
const S = F.SCHED, DAY = 864e5;
ok(S.next({ step: 2 }, 'recall', 0).step === 3 && S.next({ step: 0 }, 'recall', 0).due === DAY, 'recall without hints moves the word further');
ok(S.next({ step: 0 }, 'hint1', 0).step === 1 && S.next({ step: 0 }, 'hint1', 0).due === DAY / 2, 'hint 1 → shorter interval');
ok(S.next({ step: 3 }, 'hint2', 0).step === 2, 'hint 2 → one step back');
ok(S.next({ step: 4 }, 'examples', 0).step === 0 && S.next({ step: 4 }, 'wrong', 0).due < S.next({ step: 4 }, 'examples', 0).due, 'examples and mistakes reset; a mistake comes back sooner');
ok(F.gradeOf({ solved: true, hint: 0, wrong: 0 }) === 'recall' && F.gradeOf({ solved: true, hint: 0, wrong: 1 }) === 'hint1' &&
  F.gradeOf({ solved: true, hint: 3 }) === 'examples' && F.gradeOf({ solved: false, hint: 0, wrong: 1 }) === 'wrong' && F.gradeOf({ solved: false, hint: 0, wrong: 0 }) === 'skip', 'card outcomes graded');

/* ---------- 4. екран ---------- */
go('#/vocab/verbs/wod');
ok($$('#pos-tabs .tab').some(t => /Word on Demand/.test(t.textContent)), 'verbs have the Word on Demand tab');
ok(/Say what you mean\. Find the word you need\./.test($('#lex-panel').textContent), 'subtitle shown');
ok($$('#pos-tabs .tab').length === 8, 'other verb trainers are still there');
ok(/Усі дієслова/.test($('.wod-scope-bar').textContent), 'by default all verbs are trained');

const byK = k => F.words().find(x => x.k === k);
const cur = () => { const c = F.ui.card, w = byK(c.w); return { c, W: w, T: w.tasks.find(t => t.id === c.task) }; };
/* ситуація, думка, підказки й відгук не видають слова до спроби */
const hidden = () => {
  const { W: w } = cur(), txt = $$('.wod-sit, .wod-say-uk, .wod-hints, #wod-fb').map(e => e.textContent).join(' ').toLowerCase();
  return ![...w.forms.keys()].some(f => new RegExp('\\b' + f + '\\b').test(txt)) && !txt.includes(w.uk.split(/[,;(]/)[0].trim().toLowerCase());
};
const answer = v => { const i = $('#wod-input'); i.value = v; i.dispatchEvent(new window.Event('input', { bubbles: true })); click($('#wod-check')); };
const targetOf = (w, s) => { const t = F.targetWords(w, s); return t.words.filter((x, i) => t.set.has(i)).map(x => x.text); };

/* картка 1: сам, без підказок */
let c1 = cur();
ok(c1.W.lvl === 'A1' || !WORDS.some(x => x.lvl === 'A1'), 'new words start from the easiest level (' + c1.W.w + ', ' + c1.W.lvl + ')');
ok(hidden(), 'before any attempt the target word and its translation are not on the screen');
ok($('.wod-say-uk').textContent === c1.T.say, 'the Ukrainian thought is shown');
const xp0 = storeGet().xp || 0;
answer(c1.T.ans[1]);
ok(/Excellent/.test($('#wod-fb').textContent), 'correct without hints → Excellent');
ok($$('.wod-refs li').length + $$('.wod-fix b[lang]').length === 3 && $('.wod-word-en').textContent === c1.W.w, 'after the answer: the word and three ways to say it');
let st = storeGet().wod.words[c1.W.k];
ok(st.hist[0] === 'recall' && st.step === 1 && st.due - Date.now() > DAY * 0.9, 'recall saved with a 1-day interval');
let log = storeGet().wod.log;
ok(log.length === 1 && log[0].word === c1.W.k && log[0].attempt === 1 && log[0].result === 'correct' && log[0].used_hint === false && log[0].hint_level === 0 && typeof log[0].response_time === 'number', 'attempt logged: word, attempt, result, hint, response time');
ok((storeGet().xp || 0) > xp0, 'XP awarded');

/* картка 2: драбина підказок */
click($('#wod-next'));
const c2 = cur();
ok(c2.W.k !== c1.W.k, 'next card is another word');
click($('#wod-hint'));
const cue = () => $$('.wod-cue li').map((li, i) => ({ gaps: [...li.querySelectorAll('.wod-gap')].map(g => g.textContent), words: targetOf(c2.W, c2.T.ans[i]) }));
ok(cue().length === 3 && cue().every(x => x.gaps.length === x.words.length && x.gaps.every(g => g === '_ _ _ _ _')) && hidden(),
  'hint 1: all three answer sentences with the word gapped, word still hidden');
click($('#wod-hint'));
ok(cue().every(x => x.gaps.every((g, j) => g[0] === x.words[j][0] && g.replace(/ /g, '').length === x.words[j].length)) && $$('.wod-hint').length === 1 && hidden(),
  'hint 2: first letter and letter count in every gap');
click($('#wod-hint'));
ok($$('.wod-hint-full .wod-refs li').length === 3 && !$('#wod-hint') && !$('#wod-giveup'), 'hint 3: three full answers, no more hints');
answer(c2.T.ans[2]);
st = storeGet().wod.words[c2.W.k];
ok(st.hist[0] === 'examples' && st.step === 0, 'correct after examples → repeat soon');
ok(storeGet().wod.log.slice(-1)[0].hint_level === 3, 'hint level logged');

/* картка 3: «Не можу згадати» одразу показує 3 варіанти; помилка */
click($('#wod-next'));
const c3 = cur();
const wrongAns = ['I have no idea how to say this.', 'Sorry, no clue at all, mate.', 'Hmm, let me pass on this one.'].find(a => F.judge(c3.W, c3.T, a).verdict === 'notarget');
answer(wrongAns);
ok(/немає слова/.test($('#wod-fb').textContent) && $('#wod-next'), 'answer without the target word is rejected, can move on');
click($('#wod-giveup'));
ok($$('.wod-hint-full .wod-refs li').length === 3, '«Не можу згадати» shows three possible answers');
click($('#wod-next'));
st = storeGet().wod.words[c3.W.k];
ok(st.hist[0] === 'wrong', 'unsolved card with a wrong attempt → wrong');
ok(storeGet().wod.log.some(e => e.word === c3.W.k && e.result === 'incorrect'), 'incorrect attempt logged');

/* картка 4: пропуск; картка 5: не впевнений → підтверджую сам */
const c4 = cur();
click($('#wod-skip'));
ok(storeGet().wod.words[c4.W.k].hist[0] === 'skip' && storeGet().wod.log.slice(-1)[0].result === 'skipped', 'skip logged');
const c5 = cur();
answer('Umm… ' + targetOf(c5.W, c5.T.ans[0]).join(' ') + ', umm, yeah.');
ok(!!$('#wod-accept'), 'unsure answer → user can confirm it conveys the thought');
click($('#wod-accept'));
ok(storeGet().wod.words[c5.W.k].hist[0] === 'recall', 'self-confirmed answer counts');

/* нова ситуація для повтору */
const w1 = byK(c1.W.k);
const picks = new Set(Array.from({ length: 40 }, () => F.pickTask(w1).id));
ok(!picks.has(c1.T.id), 'the next review of a word uses a different situation');

/* ---------- 5. вибір категорій ---------- */
click($('#wod-scope-open'));
const cats = $$('.wod-ck-cat .wod-ck');
ok(cats.length >= 3 && $$('.wod-ck-sub .wod-ck').length > cats.length, 'picker lists categories and subcategories: ' + cats.length + ' / ' + $$('.wod-ck-sub .wod-ck').length);
ok(!$$('.wod-ck').some(ck => /adult|delex/.test(ck.dataset.id)), '18+ and service categories are not offered');
const check = ck => { ck.checked = !ck.checked; ck.dispatchEvent(new window.Event('change', { bubbles: true })); };
const P = window.FLLexis.POS.verbs;
const catsOf = w => { const v = P.words.find(x => x._id === w.id); return w.cats || (v ? v.cats : []); };
/* підкатегорія: після вибору — лише її слова */
const subCk = $$('.wod-ck-sub .wod-ck')[0], subId = subCk.dataset.id, parentId = P.subs[subId].parent;
check(subCk);
const parentCk = $$('.wod-ck-cat .wod-ck').find(ck => ck.dataset.id === parentId);
ok(parentCk.indeterminate && !parentCk.checked, 'a chosen subcategory marks its category as partly chosen');
ok(/Обрано/.test($('#wod-scope-sum').textContent), 'summary shows the choice and word count');
click($('#wod-scope-go'));
ok(JSON.stringify(storeGet().wod.scope) === JSON.stringify([subId]), 'choice saved');
ok(/Що тренуємо/.test($('.wod-scope-bar').textContent) && !/Усі дієслова/.test($('.wod-scope-bar').textContent), 'scope bar shows the chosen subcategory');
let inside = true;
for (let i = 0; i < 6 && $('#wod-input'); i++) {
  if (!catsOf(cur().W).includes(subId)) inside = false;
  click($('#wod-skip') || $('#wod-next'));
}
ok(inside, 'cards come only from the chosen subcategory');
/* цілу категорію + ще одну; категорія поглинає свої підкатегорії */
click($('#wod-scope-open'));
const p2 = $$('.wod-ck-cat .wod-ck').find(ck => ck.dataset.id === parentId);
check(p2);
ok($$('.wod-subs .wod-ck').filter(ck => P.subs[ck.dataset.id].parent === parentId).every(ck => ck.checked && ck.disabled), 'whole category checked → its subcategories are included');
const other = $$('.wod-ck-cat .wod-ck').find(ck => ck.dataset.id !== parentId);
check(other);
click($('#wod-scope-go'));
ok(JSON.stringify(storeGet().wod.scope.slice().sort()) === JSON.stringify([parentId, other.dataset.id].sort()), 'several categories saved; the subcategory folded into its category');
const scopedN = F.words().filter(w => catsOf(w).some(c => c === parentId || c === other.dataset.id)).length;
ok(new RegExp('· ' + scopedN + ' ').test($('.wod-scope-bar').textContent), 'scope bar counts ' + scopedN + ' verbs');
/* пошук у списку і скасування */
click($('#wod-scope-open'));
const q = $('#wod-scope-q'); q.value = P.cats[other.dataset.id].label.split(' — ')[0].toLowerCase(); q.dispatchEvent(new window.Event('input', { bubbles: true }));
ok(!$(`.wod-cat[data-cat="${other.dataset.id}"]`).hidden && $$('.wod-cat').some(el => el.hidden), 'category search filters the list');
click($('#wod-scope-none'));
ok(/Усі дієслова/.test($('#wod-scope-sum').textContent), '«Зняти все» → all verbs');
click($('#wod-scope-cancel'));
ok(storeGet().wod.scope.length === 2, 'cancel keeps the saved choice');
click($('#wod-scope-open')); click($('#wod-scope-none')); click($('#wod-scope-go'));
ok(!storeGet().wod.scope.length && /Усі дієслова/.test($('.wod-scope-bar').textContent), 'back to all verbs');

/* ---------- 6. прогрес ---------- */
click($('#wod-view'));
ok(/Word on Demand Progress/.test($('#lex-panel').textContent), 'progress view opens');
ok($$('.wod-recall-row').length >= 5, 'Independent Recall row for every practised word');
const row = $$('.wod-recall-row').find(x => x.querySelector('b').textContent === c1.W.w);
ok(/100%/.test(row.textContent) && /без допомоги/.test(row.textContent), 'recall without help → 100% and a note');
const sm = F.summary();
ok(sm.recalled === 3 && sm.noHints === 2 && typeof sm.avgTime === 'number' && sm.avgTime >= 0, 'summary: recalled ' + sm.recalled + ', without hints ' + sm.noHints);
click($('#wod-view'));
ok(!!$('#wod-input'), 'back to training');

/* інші тренажери не зачеплено */
go('#/vocab/verbs/uken');
ok(!!$('#quiz-input'), 'UK → EN trainer still works');

finish('WORD ON DEMAND OK');
