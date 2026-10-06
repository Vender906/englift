/* Розділ «Практика» → «Рух і розташування»: дані, сторінки, картки, вибір, введення, картинки, мікс */
const fs = require('fs');
const path = require('path');
const { boot, APP } = require('./_boot');
const { window, doc, errs, go, ok, click } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

const playQuiz = async (label, max) => {
  for (let i = 0; i < max + 2; i++) {
    if ($('.ph-final')) break;
    const opts = $$('.ph-quiz .opt');
    if (!opts.length) { ok(false, label + ': no options'); return; }
    click(opts[0]);
    if (!$$('.ph-quiz .opt.correct').length) { ok(false, label + ': no correct option marked'); return; }
    const next = $('[data-next]');
    if (!next) { ok(false, label + ': no next button'); return; }
    click(next);
    await sleep(0);
  }
  ok(!!$('.ph-final') && /\d+ \/ \d+/.test($('.ph-final').textContent), label + ': reaches the final screen');
};

(async () => {
  try {
    window.eval(fs.readFileSync(path.join(APP, 'js/practice/motion-data.js'), 'utf8'));
    const D = window.PRACTICE_DATA.motion;
    const P = window.FLPractice;
    const pack = P.PACKS.filter(p => p.id === 'motion')[0];

    /* ---------- дані ---------- */
    const total = D.TOPICS.reduce((n, t) => n + t.items.length, 0);
    ok(D.TOPICS.length === 8 && D.GROUPS.length === 3, '8 topics in 3 groups');
    ok(pack.counts.topics === D.TOPICS.length && pack.counts.items === total && pack.counts.scenes === D.SCENES.length,
      'counts in the registry match the data (' + total + ' sentences, ' + D.SCENES.length + ' scenes)');
    ok(pack.topics.map(t => t[0]).join() === D.TOPICS.map(t => t.id).join(), 'nav fallback lists the same topics in the same order');
    ok(D.TOPICS.every(t => !['scenes', 'mix'].includes(t.id)), 'no topic id clashes with the scenes / mix routes');
    const ids = D.GROUPS.reduce((a, g) => a.concat(g.items), []);
    ok(ids.length === 8 && ids.every(id => D.TOPICS.some(t => t.id === id)), 'groups cover every topic');
    ok(D.TOPICS.every(t => t.intro.length > 300 && /intro-box/.test(t.intro) && t.rules.length >= 3 && t.items.length >= 20),
      'every topic has a guide, 3+ rules and 20+ sentences');

    const items = D.TOPICS.reduce((a, t) => a.concat(t.items), []);
    const low = s => s.toLowerCase();
    ok(items.every(i => i.en.split('___').length === 2), 'every sentence has exactly one gap');
    ok(items.every(i => i.a && i.uk && i.w.length === 3 && new Set(i.w.map(low)).size === 3), 'every sentence has an answer, a translation and 3 distinct wrong options');
    ok(items.every(i => !i.w.map(low).includes(low(i.a))), 'the answer is never among the wrong options');
    ok(items.every(i => i.alt.every(a => !i.w.map(low).includes(low(a)))), 'an accepted alternative is never offered as a wrong option');
    ok(new Set(items.map(i => i.en)).size === items.length, 'no sentence repeats');

    ok(D.SCENES.every(s => /^<svg[\s\S]*<\/svg>$/.test(s.svg) && /sc-ball|sc-plank/.test(s.svg)), 'every scene is an SVG with the red ball (or the leaning board)');
    ok(D.SCENES.filter(s => s.kind === 'move').every(s => /sc-path/.test(s.svg) && /sc-head/.test(s.svg)), 'every motion scene draws its path with an arrow');
    ok(D.SCENES.every(s => s.w.length === 3 && !s.w.includes(s.a) && new RegExp('\\b' + s.a.replace(/ /g, '\\s') + '\\b').test(s.en)),
      'every scene: 3 wrong options and a sentence that contains the answer');
    ok(!D.SCENES.some(s => /NaN|undefined/.test(s.svg)), 'no scene has broken coordinates');

    /* ---------- перевірка введеного ---------- */
    const byEn = en => items.filter(i => i.en === en)[0];
    const road = byEn('Be careful when you walk ___ the road.');
    ok(P.checkTyped(road, 'across').ok && P.checkTyped(road, ' Across. ').ok, 'typed answer: exact, any case and punctuation');
    ok(!P.checkTyped(road, 'through').ok, 'typed answer: a wrong preposition is rejected');
    ok(P.checkTyped(road, 'acros').ok && P.checkTyped(road, 'acros').typo, 'typed answer: one typo in a long word is forgiven');
    const keys = byEn('The keys are ___ the drawer.');
    ok(!P.checkTyped(keys, 'on').ok && !P.checkTyped(keys, 'an').ok, 'typed answer: no typo tolerance for short words (in ≠ on)');
    const front = byEn("Let's meet ___ the cinema.");
    ok(!P.checkTyped(front, 'in front').ok && P.checkTyped(front, 'in front of').ok, 'typed answer: multi-word answers must be complete');
    const cat = byEn('The cat is sleeping ___ the bed.');
    const alt = P.checkTyped(cat, 'underneath');
    ok(alt.ok && !alt.exact, 'typed answer: an accepted alternative counts');
    ok(P.checkTyped(byEn("___ in, I'll give you a lift."), 'hop').ok, 'typed answer: capitalised answers match lower case');

    /* ---------- хаб і сторінка пакета ---------- */
    go('#/practice'); await sleep(10);
    ok($$('.pc-pack-card').length === P.PACKS.length && /Рух і розташування/.test($('#view').textContent), 'section hub lists the packs');
    go('#/practice/motion'); await sleep(10);
    ok($$('.ph-hub-card').length === 8 && $$('.section-title').length === 3, 'pack page shows 8 topics in 3 groups');
    ok(!!$('a[href="#/practice/motion/scenes"]') && !!$('a[href="#/practice/motion/mix"]'), 'pack page links to scenes and mix');
    ok(!!$('a[href="#/grammar/prepositions/prep-movement"]'), 'pack page links to the grammar theory');
    go('#/grammar/prepositions/prep-movement'); await sleep(10);
    ok(!/не знайдено/i.test($('#view').textContent), 'the linked grammar topic exists');

    /* ---------- кожна тема ---------- */
    for (const t of D.TOPICS) {
      const base = '#/practice/motion/' + t.id;
      go(base); await sleep(10);
      ok($$('.ph-tabs .tab').length === 5 && $$('.pr-rule').length === t.rules.length, t.id + '/guide: 5 tabs, rules render');
      if (t.dialogs) ok($$('.pc-dialog').length === t.dialogs.length, t.id + '/guide: dialogues render');

      go(base + '/list'); await sleep(10);
      ok($$('.pr-item').length === t.items.length && $$('.pr-item .pc-fill').length === t.items.length, t.id + '/list: every sentence with the answer highlighted');

      go(base + '/cards'); await sleep(10);
      ok(/Картка 1 \/ \d+/.test($('#pc-counter').textContent) && /_____/.test($('#pc-front').textContent), t.id + '/cards: deck built, front shows the gap');
      click($('#pc-card'));
      ok($('#pc-card').classList.contains('flipped'), t.id + '/cards: card flips');
      click($('[data-fc="known"]')); await sleep(250);
      ok($('#pc-k').textContent === '1', t.id + '/cards: marking «знаю» counts');

      go(base + '/choose'); await sleep(10);
      ok($$('.ph-quiz .opt').length === 4, t.id + '/choose: 4 options');
      await playQuiz(t.id + '/choose', 12);
    }

    /* ---------- «Напиши сам»: правильна відповідь, помилка, підказка ---------- */
    go('#/practice/motion/obstacles/write'); await sleep(10);
    const xp0 = window.FLCore.store.xp;
    for (let i = 0; i < 12 && !$('.ph-final'); i++) {
      const uk = $('.pc-w-uk').textContent.replace(/^🇺🇦\s*/, '');
      const it = items.filter(x => x.uk === uk)[0];
      if (!it) { ok(false, 'write: cannot find the sentence for «' + uk + '»'); break; }
      const inp = $('#pc-in');
      if (i === 0) {
        click($('#pc-hint'));
        ok(new RegExp('^💡 Починається на ' + it.a[0]).test($('#pc-hint-line').textContent), 'write: the first hint shows the first letter');
      }
      inp.value = i === 1 ? 'zzz' : it.a;
      click($('#pc-check'));
      ok(!!$('.feedback.' + (i === 1 ? 'bad' : 'good')), 'write #' + (i + 1) + ': ' + (i === 1 ? 'wrong answer marked' : 'right answer accepted'));
      click($('[data-next]')); await sleep(0);
    }
    ok(!!$('.ph-final') && /9 \/ 10/.test($('.ph-final').textContent), 'write: 10 sentences, final score 9 / 10');
    ok(window.FLCore.store.xp - xp0 === 8 * 5 + 2, 'write: +5 XP per answer, +2 when a hint was used');
    ok(window.FLCore.store.practice['motion/obstacles'].write === 90, 'write: the best result is saved');
    go('#/practice/motion'); await sleep(10);
    ok(/найкраще 90%/.test($('#view a[href="#/practice/motion/obstacles"]').textContent), 'pack page shows the best result on the topic card');

    /* «Не знаю» показує правильну відповідь */
    go('#/practice/motion/where/write'); await sleep(10);
    click($('#pc-skip'));
    ok(!!$('.feedback.bad') && !!$('.feedback .pc-fill'), 'write: «Не знаю» reveals the answer');

    /* ---------- картинки й мікс ---------- */
    go('#/practice/motion/scenes'); await sleep(10);
    ok(!!$('.pc-scene svg') && $$('.ph-quiz .opt').length === 4, 'scenes: a picture with 4 options');
    await playQuiz('scenes', 12);
    go('#/practice/motion/scenes/all'); await sleep(10);
    ok($$('.pc-tile').length === D.SCENES.length, 'scenes gallery shows all ' + D.SCENES.length + ' pictures');
    go('#/practice/motion/mix'); await sleep(10);
    await playQuiz('mix', 15);

    /* ---------- озвучення ---------- */
    let spoken = null;
    window.speechSynthesis.speak = u => { spoken = u.text; };
    go('#/practice/motion/where/list'); await sleep(10);
    click($('.pr-item [data-say]'));
    ok(spoken === 'The keys are in the drawer.', 'pressing 🔊 speaks the filled sentence (' + spoken + ')');
    go('#/practice/motion/asking/list'); await sleep(10);
    click($('.pr-item [data-say]'));
    ok(spoken && !/—/.test(spoken), 'dialogue dashes are not read out (' + spoken + ')');

    /* ---------- маршрути ---------- */
    for (const h of ['#/practice/nope', '#/practice/motion/nope', '#/practice/motion/where/nope', '#/practice/motion/scenes/nope', '#/practice/motion/mix/x']) {
      go(h); await sleep(10);
      ok(/не знайдено/i.test($('#view').textContent), h + ' → 404');
    }

    /* ---------- «Виклик», меню, дашборд ---------- */
    const pool = P.challengePool();
    ok(pool.length === 8 && pool.every(q => q.type === 'choice' && q.options[q.answer] && q.options.length === 4 && q.tag && !/</.test(q.q)),
      'challenge gets one valid text question per topic');
    ok($$('#nav .nav-group[data-key="practice"] .nav-sub a').length === 10, 'nav lists 8 topics + scenes + mix');
    go('#/');
    ok(/Практика/.test($('#view').textContent) && !!$('a.zone-card[href="#/practice"]'), 'dashboard has a Практика card');

    /* ---------- офлайн ---------- */
    const sw = fs.readFileSync(path.join(APP, 'sw.js'), 'utf8');
    ok(['./js/practice.js', './css/practice.css', './js/practice/motion-data.js'].every(f => sw.includes("'" + f + "'")), 'service worker caches the section');
  } catch (e) { errs.push('TEST THREW: ' + e.stack); }

  console.log(errs.length ? 'FAILURES: ' + errs.join(' | ') : 'PRACTICE OK ✓');
  process.exit(errs.length ? 1 : 0);
})();
