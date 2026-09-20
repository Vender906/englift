/* Тренажери «Фрази і конструкції»: дані, режими та злиття з HTML-оригіналів */
const fs = require('fs');
const path = require('path');
const { boot, APP } = require('./_boot');
const { window, doc, errs, go, ok, click } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

const SPEC = {
  constructions: { items: 50, cats: 5, tabs: ['guide', 'browser', 'cards', 'match', 'fill', 'translate', 'mix'] },
  intensifiers: { items: 36, cats: 7, tabs: ['guide', 'browser', 'cards', 'power', 'sosuch', 'grad', 'dialogue', 'mix'] },
  choice: { items: 48, cats: 8, tabs: ['guide', 'browser', 'cards', 'match', 'qa', 'situation', 'dialogue', 'translate', 'mix'] },
  polysemy: { items: 53, cats: 22, tabs: ['guide', 'browser', 'cards', 'meaning', 'pick', 'trchoice', 'story', 'mix'] },
  would: { items: 23, cats: 10, tabs: ['guide', 'browser', 'cards', 'match', 'fill', 'translate', 'story', 'mix'] },
  chunks: { items: 338, cats: 31, tabs: ['guide', 'browser', 'cards', 'reductions', 'template', 'recombine', 'sitchunk', 'reply2', 'register', 'story', 'trinput', 'mix'] },
  situational: { items: 361, cats: 18, tabs: ['guide', 'phrasebook', 'browser', 'cards', 'response', 'role', 'missing', 'mix'] },
  softeners: { items: 67, cats: 10, tabs: ['guide', 'browser', 'cards', 'match', 'level', 'soften', 'fillbank', 'mix'] },
  express: { items: 97, cats: 9, tabs: ['guide', 'browser', 'cards', 'match', 'express', 'models', 'tell', 'mix'] },
  collocations: { items: 177, cats: 15, tabs: ['guide', 'browser', 'cards', 'verbpick', 'mistakes', 'context', 'life', 'mix'] },
  confusing: { items: 49, cats: 8, tabs: ['guide', 'browser', 'cards', 'pairchoice', 'rightwrong', 'translate', 'mix'] },
  idioms: { items: 121, cats: 9, tabs: ['guide', 'browser', 'cards', 'match', 'sitchunk', 'translate', 'mix'] },
  work: { items: 80, cats: 8, tabs: ['guide', 'browser', 'cards', 'match', 'fill', 'sitchunk', 'translate', 'mix'] },
  academic: { items: 56, cats: 7, tabs: ['guide', 'browser', 'cards', 'match', 'fill', 'translate', 'mix'] }
};
/* тренажери, дані яких доповнює окремий файл */
const EXTRA = { chunks: ['chunks-extra.js', 'chunks-senses.js'], express: ['express-extra.js'], situational: ['situational-extra.js'] };
const NO_LVL = ['softeners', 'situational'];
const MIXED_LVL = ['chunks'];
/* у цих двох тренажерів в оригіналі не було вкладки «Гайд» — текст написаний для застосунку */
const OWN_GUIDE = ['collocations', 'confusing', 'idioms'];
const SKIP_TABS = ['guide', 'browser', 'cards', 'dialogue', 'story', 'phrasebook', 'models', 'tell', 'life'];

/* грає вікторину до фінального екрана, завжди тиснучи правильний варіант */
const playQuiz = async (label, max) => {
  for (let i = 0; i < max + 2; i++) {
    if ($('.ph-final')) break;
    const opts = $$('.ph-quiz .opt');
    if (!opts.length) {
      const inp = $('#ph-inp');
      if (!inp) { ok(false, label + ': no options and no input'); return; }
      click($('[data-show]'));
    } else {
      click(opts[0]);
      const correct = $$('.ph-quiz .opt.correct').length;
      if (!correct) { ok(false, label + ': no correct option highlighted'); return; }
    }
    const next = $('[data-next]');
    if (!next) { ok(false, label + ': no next button after answering'); return; }
    click(next);
    await sleep(0);
  }
  ok(!!$('.ph-final') && /\d+ \/ \d+/.test($('.ph-final').textContent), label + ': reaches the final screen');
};

(async () => {
  try {
    /* дані підвантажуються ліниво — вантажимо вручну, як у phrases.js */
    for (const k of Object.keys(SPEC)) window.eval(fs.readFileSync(path.join(APP, 'js/phrases/' + k + '-data.js'), 'utf8'));
    for (const files of Object.values(EXTRA)) files.forEach(f => window.eval(fs.readFileSync(path.join(APP, 'js/phrases/' + f), 'utf8')));

    for (const [key, spec] of Object.entries(SPEC)) {
      const D = window.PHRASE_DATA[key];
      ok(D.MARKERS.length === spec.items && Object.keys(D.CATS).length === spec.cats,
        key + ': ' + D.MARKERS.length + ' items in ' + Object.keys(D.CATS).length + ' categories');
      ok(D.MARKERS.every(m => m.name && m.uk && m.emoji && m.cat && m.when && m.examples && m.examples.length),
        key + ': every item has name, translation, usage note and examples');
      ok(NO_LVL.includes(key) ? D.MARKERS.every(m => !m.lvl)
        : MIXED_LVL.includes(key) ? D.MARKERS.filter(m => m.lvl).length >= 200 && D.MARKERS.every(m => !m.lvl || ['A1', 'A2', 'B1', 'B2', 'C1'].includes(m.lvl))
        : D.MARKERS.every(m => m.lvl),
        key + (NO_LVL.includes(key) ? ': no invented CEFR levels (source had none)'
          : MIXED_LVL.includes(key) ? ': levels kept where the source had them, none invented'
          : ': every item has a CEFR level'));
      ok(D.MARKERS.every(m => D.CATS[m.cat]), key + ': every item points at an existing category');
      ok(D.INTRO.length > (OWN_GUIDE.includes(key) ? 400 : 1000) && /intro-box/.test(D.INTRO),
        key + (OWN_GUIDE.includes(key) ? ': guide written for the app (source had none)' : ': guide text carried over'));

      go('#/phrases/' + key); await sleep(20);
      ok(/[А-Яа-яЇїІіЄєҐґ]/.test($('#view').textContent) && $$('.ph-cat-card').length === spec.cats, key + ': guide lists all categories');
      ok($$('.ph-tabs .tab').length === spec.tabs.length, key + ': ' + spec.tabs.length + ' tabs');

      go('#/phrases/' + key + '/browser'); await sleep(20);
      ok($$('.ph-marker').length === spec.items, key + '/browser: lists every item');
      const q = $('#ph-q');
      q.value = D.MARKERS[0].name.slice(0, 5); q.dispatchEvent(new window.Event('input', { bubbles: true }));
      ok($$('.ph-marker').length > 0 && $$('.ph-marker').length < spec.items, key + '/browser: search filters');
      q.value = ''; q.dispatchEvent(new window.Event('input', { bubbles: true }));

      go('#/phrases/' + key + '/cards'); await sleep(20);
      ok(/\/ \d+/.test($('#ph-counter').textContent), key + '/cards: deck built');
      click($('#ph-card'));
      ok($('#ph-card').classList.contains('flipped'), key + '/cards: card flips');
    }

    /* режими-вікторини */
    for (const [key, spec] of Object.entries(SPEC)) {
      for (const tab of spec.tabs) {
        if (SKIP_TABS.includes(tab)) continue;
        go('#/phrases/' + key + '/' + tab); await sleep(10);
        await playQuiz(key + '/' + tab, tab === 'mix' ? 15 : 12);
      }
    }

    /* діалоги */
    for (const key of ['intensifiers', 'choice']) {
      go('#/phrases/' + key + '/dialogue'); await sleep(20);
      ok($$('.ph-msg').length > 2 && $$('.ph-msg.me').length > 0, key + '/dialogue: chat rendered');
      const D = window.PHRASE_DATA[key];
      const first = D.DIALOGUES[0];
      const gaps = first.parts.filter(p => p.correct).length;
      for (let i = 0; i < gaps; i++) {
        const opts = $$('.ph-quiz .opt');
        ok(opts.length > 1, key + '/dialogue: options shown for gap ' + (i + 1));
        click(opts[0]);
        click($('[data-go]'));
        await sleep(0);
      }
      ok(/Діалог заповнено/.test($('#view').textContent), key + '/dialogue: finishing a dialogue');
      ok($$('.ph-msg b.ph-h').length === gaps, key + '/dialogue: answers are written into the chat');
      click($('[data-next]'));
      ok(/Діалог 2 \//.test($('#view').textContent), key + '/dialogue: next dialogue opens');
    }

    /* історії */
    for (const key of ['polysemy', 'would', 'chunks']) {
      go('#/phrases/' + key + '/story'); await sleep(20);
      const D = window.PHRASE_DATA[key];
      ok($$('.ph-story .ph-h').length >= 3, key + '/story: target words highlighted');
      const bd = D.STORIES[0].breakdown || D.STORIES[0].chunks;
      ok($$('.ph-break-item').length === bd.length && $$('.ph-break-item').every(el => el.textContent.replace(/[—\s]/g, '').length > 6), key + '/story: breakdown shown with text');
      click($('[data-next]'));
      ok(/Історія 2 \//.test($('#view').textContent), key + '/story: next story opens');
      click($('[data-prev]'));
      ok(/Історія 1 \//.test($('#view').textContent), key + '/story: previous story opens');
    }

    /* багатозначні скорочення: розклад значень */
    const CH = window.PHRASE_DATA.chunks;
    const withSenses = CH.MARKERS.filter(m => m.senses);
    ok(withSenses.length === 19, 'chunks: ' + withSenses.length + ' reductions list all their meanings');
    ok(withSenses.every(m => m.senses.length >= 2 && m.senses.every(sn => sn.uk && sn.en && sn.exUk)),
      'every meaning has a label, an English example and its translation');
    ok(CH.MARKERS.filter(m => m.name === 'outta')[0].senses.length === 7, 'outta lists all 7 meanings');
    go('#/phrases/chunks/browser'); await sleep(20);
    const outta = [...doc.querySelectorAll('.ph-marker')].find(el => el.querySelector('.ph-marker-name').textContent === 'outta');
    ok(!!outta && outta.querySelectorAll('.ph-senses li').length === 7, 'browser shows all meanings of outta');
    ok(outta.querySelectorAll('.ph-senses .ph-sense-ex [data-say]').length === 7, 'every meaning can be played');
    go('#/phrases/chunks/reductions'); await sleep(20);
    ok($$('.ph-red-senses').length === 19, 'reductions tab marks every multi-meaning entry');

    /* пари, які плутають: варіанти завжди містять правильну форму */
    const CF = window.PHRASE_DATA.confusing;
    ok(CF.TESTS.every(t => t.options.length >= 2 && t.options.includes(t.answer)), 'confusing: every test offers its own correct form');
    ok(CF.TESTS.filter(t => t.options.length >= 3).length >= 110, 'confusing: most tests have 3–4 options');
    ok(CF.MARKERS.every(m => m.words.length >= 2 && m.when), 'confusing: every pair has both words and a trigger hint');

    /* сталі сполучення */
    const CL = window.PHRASE_DATA.collocations;
    ok(CL.MARKERS.every(m => m.verb && m.noun && m.examples[0].en), 'collocations: verb, noun and example everywhere');
    ok(CL.MARKERS.filter(m => m.wrong).length === 47, '47 collocations name the verb learners wrongly use instead');
    go('#/phrases/collocations/life'); await sleep(20);
    ok($$('.ph-sit-tab').length === Object.keys(CL.LIFE).filter(id => CL.MARKERS.some(m => m.life === id)).length, 'collocations/life: a tab per life area');
    ok($$('.ph-red').length > 3, 'collocations/life: cards for the first area');
    click($$('.ph-sit-tab')[2]);
    ok($$('.ph-red').length > 3, 'collocations/life: switching areas');

    /* розмовник за ситуаціями */
    go('#/phrases/situational/phrasebook'); await sleep(20);
    const SIT = window.PHRASE_DATA.situational;
    ok($$('.ph-sit-tab').length === 18, 'situational/phrasebook: 18 situation tabs');
    const firstSit = SIT.SITUATIONS[0];
    ok($$('.ph-sit-phrase').length === Object.values(firstSit.phrases).flat().length, 'situational/phrasebook: all phrases of the first situation');
    ok($$('.ph-dialogue .ph-msg').length === firstSit.dialog.length, 'situational/phrasebook: dialogue shown');
    click($$('.ph-sit-tab')[3]);
    ok($$('.ph-sit-phrase').length === Object.values(SIT.SITUATIONS[3].phrases).flat().length, 'situational/phrasebook: switching situations');

    /* сценарій «розкажи історію» */
    go('#/phrases/express/tell'); await sleep(20);
    const SC = window.PHRASE_DATA.express.SCENARIOS[0];
    const scGaps = (SC.text.match(/\{\{/g) || []).length;
    for (let i = 0; i < scGaps; i++) {
      const opts = $$('.ph-quiz .opt');
      ok(opts.length > 1, 'express/tell: options for gap ' + (i + 1));
      click(opts[0]); click($('[data-go]')); await sleep(0);
    }
    ok(/Історія зібрана/.test($('#view').textContent), 'express/tell: scenario completed');

    /* зразки історій */
    go('#/phrases/express/models'); await sleep(20);
    ok($$('.ph-story .ph-h').length >= 3 && $$('.ph-break-item').length === window.PHRASE_DATA.express.MODELS[0].pats.length, 'express/models: model story with its patterns');

    /* злиття connectors-in-flow у Transition Words */
    window.eval(fs.readFileSync(path.join(APP, 'js/phrases/transitions-data.js'), 'utf8'));
    const TR = window.PHRASE_DATA.transitions;
    ok(TR.WORDS.length === 149, 'transitions: grew to ' + TR.WORDS.length + ' words after the merge');
    ok(TR.WORDS.filter(w => w.flow).length === 65, '65 connectors enriched with flow context');
    const trNames = TR.WORDS.map(w => w.en.toLowerCase());
    ok(trNames.length === new Set(trNames).size, 'transitions: no duplicates after the merge');
    ok(TR.THOUGHT_QS.length === 20 && TR.DLG_QS.length === 12 && TR.NUANCE_QS.length === 10 && TR.PASSAGES.length === 5, 'flow exercises carried over');
    window.eval(fs.readFileSync(path.join(APP, 'js/phrases/discourse-data.js'), 'utf8'));
    const DIS = window.PHRASE_DATA.discourse;
    ok(DIS.MARKERS.length === 84, 'discourse: grew to ' + DIS.MARKERS.length + ' markers');
    const disNames = DIS.MARKERS.map(m => m.name.toLowerCase());
    ok(disNames.length === new Set(disNames).size, 'discourse: no duplicates after the merge');

    go('#/phrases/transitions/browse'); await sleep(20);
    ok(/У потоці думки/.test($('#view').textContent), 'transitions/browser: flow context is displayed');
    for (const tab of ['thought', 'reply', 'nuance']) {
      go('#/phrases/transitions/' + tab); await sleep(10);
      await playQuiz('transitions/' + tab, 12);
    }
    go('#/phrases/transitions/speech'); await sleep(20);
    const PS = TR.PASSAGES[0];
    const psGaps = (PS.text.match(/\{\{/g) || []).length;
    for (let i = 0; i < psGaps; i++) {
      const opts = $$('.ph-quiz .opt');
      ok(opts.length > 1, 'transitions/speech: options for gap ' + (i + 1));
      click(opts[0]); click($('[data-go]')); await sleep(0);
    }
    ok(/Уривок відновлено/.test($('#view').textContent), 'transitions/speech: passage restored');

    /* дієслова-універсали на сторінці гайду */
    go('#/phrases/polysemy'); await sleep(20);
    ok($$('.ph-verb').length === 8, 'polysemy: 8 universal verbs on the guide page');

    /* хаб і маршрути */
    go('#/phrases');
    ok($$('.ph-hub-card').length === 17 && $$('.section-title').length === 7, 'hub lists 17 trainers in 7 groups');
    go('#/phrases/polysemy/fill');
    ok(/не знайдено/i.test($('#view').textContent), 'tab that a trainer does not have → 404');
  } catch (e) { errs.push('TEST THREW: ' + e.stack); }

  console.log(errs.length ? 'FAILURES: ' + errs.join(' | ') : 'TRAINERS OK ✓');
  process.exit(errs.length ? 1 : 0);
})();
