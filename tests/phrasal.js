/* Фразові дієслова: нові слова у словнику, категорія за часткою, теми, форми дієслів */
const fs = require('fs');
const path = require('path');
const { boot, APP } = require('./_boot');
const { window, doc, errs, go, ok, click } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];

(async () => {
  try {
    const src = ['js/lexis/verbs-data.js', 'js/lexis/verbs-phrasal-data.js', 'js/lexis/verbs-merge.js']
      .map(f => fs.readFileSync(path.join(APP, f), 'utf8')).join(';');
    const V = (new Function(src + ';return LEX_VERBS'))();
    const CATS = (new Function(src + ';return LEX_VERB_CATS'))();
    const SUBS = (new Function(src + ';return LEX_VERB_SUBS'))();

    ok(V.length === 3250, 'verbs dataset: ' + V.length + ' after adding phrasals and merging duplicates');
    ok(new Set(V.map(w => w._id)).size === V.length, 'every verb has a unique _id (progress stays intact)');
    ok(V.filter(w => w._id < 3003).every((w, i, a) => i === 0 || w._id > a[i - 1]._id), 'original verbs keep their ids in order (appended, not renumbered)');

    /* категорія «Phrasal verbs» */
    ok(!!CATS.phrasal && Object.keys(CATS).pop() === 'adult', 'phrasal category registered before 18+');
    const ph = V.filter(w => w.cats.includes('phrasal'));
    ok(ph.length > 800, 'phrasal category has ' + ph.length + ' verbs (old ones tagged too)');
    const subs = Object.keys(SUBS).filter(s => SUBS[s].parent === 'phrasal');
    ok(subs.length === 9, '9 particle subgroups');
    ok(subs.every(s => ph.some(w => w.cats.includes(s))), 'every particle subgroup has verbs');
    ok(ph.every(w => subs.filter(s => w.cats.includes(s)).length === 1), 'each phrasal verb sits in exactly one particle group');
    ok(!V.some(w => /^(fall in love|bear in mind|knock on wood|go on vacation)$/.test(w.en) && w.cats.includes('phrasal')), 'noun phrases like «fall in love» are not tagged phrasal');

    /* нові слова мають повний набір полів і тематичні категорії */
    const NEW = V.filter(w => w._id >= 3003);
    ok(NEW.length > 400, NEW.length + ' new phrasal verbs added');
    const req = ['en', 'ctx', 'ipa', 'emoji', 'uk', 'uCtx', 'lvl', 'past', 'pp', 'ex', 'exUk'];
    ok(NEW.every(w => req.every(k => w[k])), 'every new verb has all fields filled');
    ok(NEW.every(w => /^\/.+\/$/.test(w.ipa)), 'every new verb has IPA');
    ok(NEW.every(w => ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(w.lvl)), 'levels are valid');
    const themed = NEW.filter(w => w.cats.some(c => CATS[c] && c !== 'phrasal'));
    ok(themed.length === NEW.length, 'every new verb also belongs to a topic category');
    const topics = new Set();
    NEW.forEach(w => w.cats.filter(c => CATS[c] && c !== 'phrasal').forEach(c => topics.add(c)));
    ok(topics.size >= 35, 'new verbs spread across ' + topics.size + ' topic categories');
    const nrm = x => String(x).toLowerCase().replace(/[’ʼ']/g, "'").replace(/\s+/g, ' ').trim();
    /* «зʼявлятися / здаватися» і «здаватися / зʼявлятися» — те саме значення */
    const ukKey = x => nrm(x).replace(/[().,]/g, ' ').split('/').map(y => y.replace(/\s+/g, ' ').trim()).filter(Boolean).sort().join(' / ');
    const pairs = V.map(w => nrm(w.en) + '|' + ukKey(w.uk));
    ok(pairs.length === new Set(pairs).size, 'no word repeats with the same meaning (duplicates merged)');
    ok(V.filter(w => w.sense).length === 540, 'homonyms are numbered (540 entries carry a sense number)');
    ok(V.filter(w => w.ex2).length === 142, '142 merged entries kept the second example');

    /* дедуплікація видно в застосунку */
    go('#/vocab/verbs/browser');
    const qq = $('#lex-search');
    qq.value = 'appear'; qq.dispatchEvent(new window.Event('input', { bubbles: true }));
    const wordEn = c => (c.querySelector('.word-en') || {}).textContent;
    const appear = $$('.word-card').filter(c => wordEn(c) === 'appear');
    ok(appear.length === 1, 'the duplicate «appear» is gone from the browser (' + appear.length + ')');
    qq.value = 'chew'; qq.dispatchEvent(new window.Event('input', { bubbles: true }));
    ok($$('.word-card').filter(c => wordEn(c) === 'chew').length === 1, 'the exact copy «chew» is gone too');
    qq.value = 'come'; qq.dispatchEvent(new window.Event('input', { bubbles: true }));
    const senseCards = $$('.word-card').filter(c => /знач\. \d\/\d/.test(c.textContent));
    ok(senseCards.length >= 2, 'homonyms show a sense badge (знач. 1/2)');
    qq.value = ''; qq.dispatchEvent(new window.Event('input', { bubbles: true }));

    /* форми дієслів у застосунку */
    go('#/vocab/verbs/browser');
    const q = $('#lex-search');
    ok(!!q, 'browser has a search box');
    q.value = 'talk into'; q.dispatchEvent(new window.Event('input', { bubbles: true }));
    const card = $$('.word-card').find(c => /talk into/.test(c.textContent));
    ok(!!card, 'new verb «talk into» is searchable');
    ok(/talked into/.test(card.textContent), 'phrasal keeps its particle in past forms');

    q.value = 'check in'; q.dispatchEvent(new window.Event('input', { bubbles: true }));
    const chk = $$('.word-card').find(c => /check in/.test(c.textContent));
    ok(!!chk && /checked in/.test(chk.textContent), 'regular phrasal auto-forms keep the particle (checked in)');
    ok(!!chk && !/irreg/.test(chk.textContent), '«check in» is no longer labelled irregular');
    q.value = 'give up'; q.dispatchEvent(new window.Event('input', { bubbles: true }));
    const gu = $$('.word-card').find(c => /give up/.test(c.textContent));
    ok(!!gu && /gave up/.test(gu.textContent) && /irreg/.test(gu.textContent), '«give up» still shows as irregular');
    q.value = ''; q.dispatchEvent(new window.Event('input', { bubbles: true }));

    /* категорія відкривається з браузера */
    const catCard = $('[data-cat="phrasal"]');
    ok(!!catCard, 'Phrasal verbs card is on the category list');
    click(catCard);
    ok(/Phrasal verbs/.test($('#view').textContent) && $$('.sub-chip, .c-sub, [data-sub]').length > 0, 'category opens with particle chips');

    /* тренажер «Форми»: фразове дієслово приймається разом із часткою */
    go('#/vocab/verbs/forms');
    let single = false, phrasal = false, tries = 0;
    while ((!single || !phrasal) && tries < 80) {
      tries++;
      const word = $('.quiz-question .q-word');
      if (!word) break;
      const en = word.textContent.trim();
      const same = V.filter(x => x.en === en);
      const w = same[0];
      if (!w) break;
      /* у наборі є слова-дублі з різними формами — їх пропускаємо, бо не знаємо, яке саме питання */
      if (same.length > 1 && new Set(same.map(x => (x.past || '') + '|' + (x.pp || ''))).size > 1) { click($('#quiz-next')); continue; }
      const past = (w.past || '').split('/')[0].trim();
      const pp = (w.pp || past).split('/')[0].trim();
      const inp = $('#quiz-input');
      inp.disabled = false;
      inp.value = past && pp ? past + ' ' + pp : '';
      if (!inp.value) { click($('#quiz-next')); continue; }
      click($('#quiz-check'));
      const fb = $('.quiz-fb');
      const good = fb && fb.classList.contains('ok');
      if (!good) { ok(false, 'forms trainer rejected «' + en + '» ← "' + inp.value + '"'); break; }
      if (en.includes(' ')) phrasal = true; else single = true;
      click($('#quiz-next'));
    }
    ok(single, 'forms trainer accepts single-word verbs');
    ok(phrasal, 'forms trainer accepts phrasal verbs with the particle');
  } catch (e) { errs.push('TEST THREW: ' + e.stack); }

  console.log(errs.length ? 'FAILURES: ' + errs.join(' | ') : 'PHRASAL OK ✓');
  process.exit(errs.length ? 1 : 0);
})();
