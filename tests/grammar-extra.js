/* Нові теми граматики (articles / causative / reported / adj+prep) і пари «прикметник + прийменник» */
const fs = require('fs');
const path = require('path');
const { boot, APP } = require('./_boot');
const { window, doc, errs, go, ok, click } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];

const NEW_TOPICS = {
  articles: ['art-sound', 'art-first-second', 'art-geo', 'art-fixed', 'art-text', 'art-mix'],
  causative: ['caus-form', 'caus-choose', 'caus-tenses', 'caus-rewrite'],
  reported: ['rep-saytell', 'rep-backshift', 'rep-questions', 'rep-commands'],
  'adj-prep': ['ap-of', 'ap-at-in-on', 'ap-to-for-with', 'ap-tricky']
};

(async () => {
  try {
    const src = fs.readFileSync(path.join(APP, 'js/data.js'), 'utf8') + ';' + fs.readFileSync(path.join(APP, 'js/grammar-extra.js'), 'utf8');
    const COURSE = (new Function(src + ';return COURSE'))();
    const subOf = id => COURSE.grammar.subs.find(s => s.id === id);

    let total = 0, exercises = 0;
    COURSE.grammar.subs.forEach(s => s.topics.forEach(t => { total++; exercises += t.exercises.length; }));
    ok(total === 107 && exercises === 1045, 'course grew to ' + total + ' topics / ' + exercises + ' exercises');

    for (const [subId, ids] of Object.entries(NEW_TOPICS)) {
      const sub = subOf(subId);
      ok(!!sub, subId + ': category exists');
      ids.forEach(id => {
        const t = sub.topics.find(x => x.id === id);
        if (!t) return ok(false, subId + ': topic ' + id + ' added');
        ok(!!t.title && !!t.emoji && !!t.level && t.minutes > 0, id + ': has title, emoji, level and duration');
        ok(!!t.theory && !!t.theory.intro && t.theory.rules.length >= 1 && !!t.theory.tip, id + ': has theory with rules and a tip');
        ok(t.exercises.length >= 8, id + ': ' + t.exercises.length + ' exercises');
      });
      const seen = sub.topics.map(t => t.id);
      ok(seen.length === new Set(seen).size, subId + ': no duplicate topic ids');
    }

    /* усі вправи придатні для рушія */
    const bad = [];
    COURSE.grammar.subs.forEach(s => s.topics.forEach(t => t.exercises.forEach((e, i) => {
      const where = s.id + '/' + t.id + '#' + (i + 1);
      if (!['choice', 'fill', 'reorder'].includes(e.type)) bad.push(where + ' unknown type ' + e.type);
      else if (e.type === 'choice' && (!e.options || e.answer == null || !e.options[e.answer])) bad.push(where + ' broken choice');
      else if (e.type === 'fill' && (!e.answers || !e.answers.length || e.answers.some(a => !String(a).trim()))) bad.push(where + ' broken fill');
    })));
    ok(!bad.length, 'every exercise is playable (' + bad.slice(0, 3).join('; ') + ')');

    /* жодне питання не повторюється в двох темах */
    const qnorm = q => String(q || '').toLowerCase().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ').trim();
    const seenQ = {};
    COURSE.grammar.subs.forEach(s2 => s2.topics.forEach(t => t.exercises.forEach(e => {
      const k = qnorm(e.q);
      if (!/[a-z]/i.test(k)) return;             /* «оберіть правильне речення» — це інструкція, зміст у варіантах */
      (seenQ[k] = seenQ[k] || []).push(s2.id + '/' + t.id);
    })));
    const dupQ = Object.entries(seenQ).filter(([, w]) => w.length > 1);
    ok(!dupQ.length, 'no exercise text repeats across topics (' + dupQ.slice(0, 2).map(([q, w]) => q.slice(0, 30) + ': ' + w.join('+')).join('; ') + ')');

    /* сторінки й сесія у застосунку */
    go('#/grammar/articles');
    ok($$('.grid-cards .topic-card').length === 9, 'articles: 9 topics on the category page');
    go('#/grammar/articles/art-geo');
    ok(/the Alps/.test($('#view').textContent) && /Ukraine/.test($('#view').textContent), 'art-geo: theory renders');
    go('#/grammar/articles/art-geo/practice');
    ok($$('.opts .opt').length === 4, 'art-geo: choice exercise with 4 options');
    const correct = subOf('articles').topics.find(t => t.id === 'art-geo').exercises[0];
    const btn = $$('.opts .opt').find(b => b.textContent.includes(correct.options[correct.answer]));
    click(btn);
    ok(/Правильно/.test($('#view').textContent), 'art-geo: correct answer accepted');

    go('#/grammar/causative/caus-rewrite/practice');
    ok(!!$('#fill-input'), 'caus-rewrite: fill exercise');
    const rw = subOf('causative').topics.find(t => t.id === 'caus-rewrite').exercises[0];
    $('#fill-input').value = rw.answers[0];
    click($('#fill-check'));
    ok(/Правильно/.test($('#view').textContent), 'caus-rewrite: rewriting accepted');

    go('#/grammar/reported/rep-backshift/practice');
    const bs = subOf('reported').topics.find(t => t.id === 'rep-backshift').exercises[0];
    $('#fill-input').value = bs.answers[0].toUpperCase();
    click($('#fill-check'));
    ok(/Правильно/.test($('#view').textContent), 'rep-backshift: answer checked case-insensitively');

    /* словник: прикметник + прийменник */
    const asrc = fs.readFileSync(path.join(APP, 'js/lexis/adjs-data.js'), 'utf8') + ';' + fs.readFileSync(path.join(APP, 'js/lexis/adjs-prep-data.js'), 'utf8');
    const A = (new Function(asrc + ';return {LEX_ADJS, LEX_ADJ_CATS, LEX_ADJ_SUBS}'))();
    ok(A.LEX_ADJS.length === 2539, 'adjectives grew to ' + A.LEX_ADJS.length);
    ok(A.LEX_ADJS.slice(0, 2494).every((w, i) => w._id === i), 'existing adjectives keep their ids (appended, not inserted)');
    const ids = A.LEX_ADJS.map(w => w._id);
    ok(new Set(ids).size === ids.length, 'every adjective has a unique id');
    const names = A.LEX_ADJS.map(w => w.en.toLowerCase());
    ok(names.length === new Set(names).size, 'no duplicate adjectives after the merge');
    ok(!!A.LEX_ADJ_CATS.adjprep && Object.keys(A.LEX_ADJ_CATS).pop() === 'adult', 'adjprep category registered before 18+');
    const tagged = A.LEX_ADJS.filter(w => w.cats.includes('adjprep'));
    ok(tagged.length === 111 && tagged.every(w => w.prep), '111 adjectives carry their preposition');
    const subs = Object.keys(A.LEX_ADJ_SUBS).filter(s => s.startsWith('ap_'));
    ok(subs.length === 9 && subs.every(s => tagged.some(w => w.cats.includes(s))), '9 preposition subgroups, each with words');
    ok(A.LEX_ADJS.find(w => w.en === 'afraid').prep === 'of' && A.LEX_ADJS.find(w => w.en === 'good').prep.includes('at'), 'afraid + of, good + at');

    ok(A.LEX_ADJS.filter(w => w.prepEx).length === 66, 'enriched adjectives keep the example that shows the preposition sense');
    ok(A.LEX_ADJS.find(w => w.en === 'short').prepEx[0].en === "We're short of time.", 'short + of carries its own sense example');

    go('#/vocab/adjs/browser');
    const q = $('#lex-search');
    q.value = 'afraid'; q.dispatchEvent(new window.Event('input', { bubbles: true }));
    const card = $$('.word-card').find(c => /afraid/.test(c.textContent));
    ok(!!card && /\+ of/.test(card.textContent), 'browser shows the preposition badge');
  } catch (e) { errs.push('TEST THREW: ' + e.stack); }

  console.log(errs.length ? 'FAILURES: ' + errs.join(' | ') : 'GRAMMAR EXTRA OK ✓');
  process.exit(errs.length ? 1 : 0);
})();
