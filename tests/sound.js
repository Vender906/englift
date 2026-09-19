/* Розділ «Вимова»: дані, сторінки, картки, вправи всіх типів */
const fs = require('fs');
const path = require('path');
const { boot, APP } = require('./_boot');
const { window, doc, errs, go, ok, click } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

const KINDS = { flap: 'sound', glottal: 'sound', linking: 'sound', weak: 'weak', endings: 'endings', stress: 'stress', numbers: 'say', numtalk: 'say', blend: 'sound', tricky: 'tricky', variant: 'variant', minimal: 'minimal' };

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
    /* дані вантажаться ліниво — у тесті підключаємо вручну */
    window.eval(fs.readFileSync(path.join(APP, 'js/sound/pron-data.js'), 'utf8'));
    const D = window.PRON_DATA;

    ok(D.TOPICS.length === 12 && D.GROUPS.length === 4, '12 topics in 4 groups');
    ok(D.TOPICS.reduce((n, t) => n + t.items.length, 0) === 264, '264 entries in total');
    ok(D.TOPICS.every(t => t.id && t.emoji && t.title && t.uk && t.lead && t.level && t.kind), 'every topic has its meta');
    ok(D.TOPICS.every(t => t.intro.length > 400 && /intro-box/.test(t.intro) && t.rules.length >= 3), 'every topic has a guide and at least 3 rules');
    ok(D.TOPICS.every(t => KINDS[t.id] === t.kind), 'every topic declares the right exercise kind');
    const ids = D.GROUPS.reduce((a, g) => a.concat(g.items), []);
    ok(ids.length === 12 && ids.every(id => D.TOPICS.some(t => t.id === id)), 'groups cover every topic');

    /* цілісність даних по типах */
    const byId = id => D.TOPICS.filter(t => t.id === id)[0];
    ['flap', 'glottal', 'linking', 'blend'].forEach(id => {
      const t = byId(id);
      ok(t.items.every(i => i.en && i.spoken && i.ipa && i.uk && i.ex && i.ex.en && i.ex.spoken && i.ex.uk),
        id + ': every entry has spelling, spoken form, IPA and an example');
      ok(t.items.every(i => i.spoken !== i.en), id + ': the spoken form always differs from the spelling');
    });
    ok(byId('weak').items.every(i => /^\/.+\/$/.test(i.strong) && /^\/.+\/$/.test(i.weak)), 'weak forms: both strong and weak transcriptions');
    ok(byId('endings').items.every(i => ['/t/', '/d/', '/ɪd/', '/s/', '/z/', '/ɪz/'].includes(i.cls) && i.base && i.rule), 'endings: valid sound class and rule');
    ok(byId('stress').items.every(i => i.syl.length >= 2 && i.syl[i.idx]), 'stress: syllables with a marked one');
    ok(byId('tricky').items.every(i => i.say && i.ipa && i.wrong && i.say !== i.wrong), 'traps: real pronunciation and the typical mistake differ');
    ok(byId('variant').items.every(i => i.us && i.gb && i.usIpa && i.gbIpa && i.us !== i.gb), 'US / UK: both variants and they differ');
    ok(byId('minimal').items.every(i => i.a.w && i.b.w && i.a.ipa !== i.b.ipa), 'minimal pairs: two words with different transcriptions');
    ok(byId('numbers').items.every(i => i.en && i.spoken && i.uk && i.ex && i.ex.en && i.ex.spoken && i.ex.uk && i.spoken !== i.en && i.alt !== i.spoken),
      'numbers: written form, spoken form, an optional alternative and an example');
    ok(byId('numtalk').items.every(i => i.en && i.spoken && i.uk && i.ex && i.ex.spoken && i.spoken !== i.en),
      'numtalk: each informal form differs from the written one');

    /* не дублюємо те, що вже є у Chunks */
    const CH = (new Function('var window={PHRASE_DATA:{}};' + fs.readFileSync(path.join(APP, 'js/phrases/chunks-data.js'), 'utf8') + ';return window.PHRASE_DATA["chunks"]'))();
    const chunkRed = new Set(CH.MARKERS.filter(m => m.type === 'red').map(m => m.name.toLowerCase()));
    const mine = D.TOPICS.reduce((a, t) => a.concat(t.items.map(i => String(i.en || '').toLowerCase())), []);
    ok(!mine.some(w => chunkRed.has(w)), 'no entry repeats the reductions list from Chunks');

    /* хаб і сторінки */
    go('#/sound'); await sleep(20);
    ok($$('.ph-hub-card').length === 12 && $$('.section-title').length === 4, 'hub lists 12 topics in 4 groups');
    ok(/Chunks/.test($('#view').textContent), 'hub points to the Chunks trainer for gonna / wanna');

    for (const t of D.TOPICS) {
      go('#/sound/' + t.id); await sleep(10);
      ok($$('.ph-tabs .tab').length === 5, t.id + ': 5 tabs');
      ok($$('.pr-rule').length === t.rules.length && /intro-box/.test($('#view').innerHTML), t.id + '/guide: rules and guide render');

      go('#/sound/' + t.id + '/list'); await sleep(10);
      ok($$('.pr-item').length === t.items.length, t.id + '/list: every entry is listed (' + $$('.pr-item').length + ')');
      ok($$('.pr-item [data-say]').length >= t.items.length, t.id + '/list: every entry can be played');

      go('#/sound/' + t.id + '/cards'); await sleep(10);
      ok(/Картка 1 \/ \d+/.test($('#pr-counter').textContent), t.id + '/cards: deck built');
      click($('#pr-card'));
      ok($('#pr-card').classList.contains('flipped'), t.id + '/cards: card flips');
      click($('[data-fc="known"]')); await sleep(250);
      ok($('#pr-k').textContent === '1', t.id + '/cards: marking «знаю» counts');

      go('#/sound/' + t.id + '/practice'); await sleep(10);
      await playQuiz(t.id + '/practice', 12);
      go('#/sound/' + t.id + '/mix'); await sleep(10);
      await playQuiz(t.id + '/mix', 15);
    }

    /* озвучення справді викликається */
    let spoken = null;
    window.speechSynthesis.speak = u => { spoken = u.text; };
    go('#/sound/flap/list'); await sleep(10);
    click($('.pr-item [data-say]'));
    ok(spoken === 'water', 'pressing 🔊 speaks the word (' + spoken + ')');

    /* маршрути */
    go('#/sound/nope');
    ok(/не знайдено/i.test($('#view').textContent), 'unknown topic → 404');
    go('#/sound/flap/nope');
    ok(/не знайдено/i.test($('#view').textContent), 'unknown tab → 404');

    /* питання з вимови у «Виклику» */
    const pool = window.FLSound.challengePool();
    ok(pool.length === 24, 'challenge gets ' + pool.length + ' pronunciation questions (2 per topic)');
    ok(pool.every(q => q.type === 'choice' && q.options[q.answer] && q.tag && !/Послухати/.test(q.q)),
      'every challenge question is valid and free of button text');

    /* меню й дашборд */
    ok($$('#nav .nav-group[data-key="sound"] .nav-sg').length === 4 &&
      $$('#nav .nav-group[data-key="sound"] .nav-sub a').length === 12, 'nav shows 12 topics in 4 subgroups');
    go('#/');
    ok(/Вимова/.test($('#view').textContent), 'dashboard has a Вимова card');
  } catch (e) { errs.push('TEST THREW: ' + e.stack); }

  console.log(errs.length ? 'FAILURES: ' + errs.join(' | ') : 'SOUND OK ✓');
  process.exit(errs.length ? 1 : 0);
})();
