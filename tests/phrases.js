/* Мовні маркери (3 тренажери), підгрупи граматики в меню, тема «Жаль і рефлексія» */
const fs = require('fs');
const path = require('path');
const { boot, APP } = require('./_boot');
const { window, doc, errs, go, ok, click } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  try {
    /* ---------- граматика: підгрупи ---------- */
    const groups = $$('#nav .nav-group[data-key="grammar"] .nav-sg');
    const links = $$('#nav .nav-group[data-key="grammar"] .nav-sg a');
    ok(groups.length === 6, 'grammar nav has 6 subgroups (' + groups.length + ')');
    ok(links.length === 27 && new Set(links.map(a => a.getAttribute('href'))).size === 27, 'all 27 categories in subgroups, no duplicates');
    go('#/grammar/relative');
    const activeSg = $('#nav .nav-sg.open a.active');
    ok(!!activeSg && activeSg.getAttribute('href') === '#/grammar/relative', 'active category opens its subgroup');
    const head = $$('#nav .nav-sg-head')[0];
    const wasOpen = head.parentElement.classList.contains('open');
    click(head);
    ok(head.parentElement.classList.contains('open') !== wasOpen && window.localStorage.getItem('fluentlab_nav_groups') !== null, 'subgroup toggles & remembers state');
    go('#/grammar');
    ok($$('.g-section').length === 6 && $$('.g-jump [data-jump]').length === 6 && $$('.grid-cards .topic-card').length === 27, 'grammar page grouped into 6 sections');

    /* ---------- жаль і рефлексія ---------- */
    go('#/grammar/conditionals');
    ok($$('.grid-cards .topic-card').length === 6, 'conditionals now has 6 topics');
    go('#/grammar/conditionals/regret-reflection');
    ok(/Looking back/.test($('#view').textContent) && /I wish I could/.test($('#view').textContent), 'regret topic renders theory');
    go('#/grammar/conditionals/regret-reflection/practice');
    ok($('#view').textContent.trim().length > 60, 'regret practice renders');

    /* ---------- мовні маркери ---------- */
    ok($$('#nav .nav-group[data-key="phrases"] .nav-sg').length === 7 && $$('#nav .nav-group[data-key="phrases"] .nav-sub a').length === 17, 'nav «Фрази і конструкції»: 17 тренажерів у 7 групах');
    go('#/phrases');
    ok($$('.ph-hub-card').length === 17 && $$('.section-title').length === 7, 'hub lists 17 trainers in 7 groups');
    for (const k of ['transitions', 'discourse', 'timeseq']) window.eval(fs.readFileSync(path.join(APP, 'js/phrases/' + k + '-data.js'), 'utf8'));

    const playQuiz = async (label, maxQ) => {
      let n = 0;
      for (; n < maxQ + 2; n++) {
        if ($('.ph-final')) break;
        const inp = $('#ph-inp');
        if (inp) {
          click($('[data-show]'));
        } else {
          const opts = $$('.ph-quiz .opt');
          if (!opts.length) break;
          click(opts[0]);
        }
        const next = $('[data-next]');
        if (!next) { errs.push(label + ': no next button'); break; }
        click(next);
      }
      ok(!!$('.ph-final') && n >= 1, label + ': quiz reaches final screen after ' + n + ' questions');
      click($('.ph-final [data-restart]'));
      ok(!$('.ph-final') && !!$('.ph-q-prompt'), label + ': restart works');
    };

    /* transitions */
    go('#/phrases/transitions'); await sleep(20);
    ok($$('.ph-word').length === 149, 'transitions browse: 149 words after the connectors merge (' + $$('.ph-word').length + ')');
    ok(!!$('.ph-bonus') && /Royal Order/.test($('.ph-bonus').textContent), 'Royal Order bonus box');
    click($$('#ph-b-filters [data-lvl="__all"]')[0]);
    ok($$('.ph-word').length === 0 && /Немає слів/.test($('#ph-b-list').textContent), '«Усі» toggles off all levels');
    click($('#ph-b-filters [data-lvl="__all"]'));
    click($('#ph-b-filters [data-lvl="A1"]'));
    const noA1 = $$('.ph-word').length;
    ok(noA1 > 0 && noA1 < 149, 'level chip toggles (' + noA1 + ')');
    click($('#ph-b-filters [data-lvl="A1"]'));
    click($('.ph-word'));
    ok($('.ph-word').classList.contains('expanded'), 'word card expands');
    go('#/phrases/transitions/cards'); await sleep(20);
    const first = $('#ph-front').textContent;
    ok(/Картка 1 \/ 149/.test($('#ph-counter').textContent), 'cards deck 149');
    click($('#ph-card'));
    ok($('#ph-card').classList.contains('flipped'), 'card flips');
    click($('[data-fc="unknown"]')); await sleep(300);
    ok($('#ph-u').textContent === '1' && /Картка 2/.test($('#ph-counter').textContent), 'mark unknown → next card');
    click($('[data-fc="known"]')); await sleep(300);
    ok($('#ph-k').textContent === '1', 'mark known');
    click($('[data-fc="review"]'));
    ok(/Картка 1 \/ 1/.test($('#ph-counter').textContent), 'review unknown → deck of 1');
    click($('[data-fc="reset"]')); click($('#ph-m [data-yes]'));
    ok(/\/ 149/.test($('#ph-counter').textContent) && $('#ph-k').textContent === '0', 'reset restores deck');
    for (const [tab, max] of [['enuk', 12], ['uken', 12], ['syn', 10], ['func', 12], ['ctx', 12], ['mix', 21]]) {
      go('#/phrases/transitions/' + tab); await sleep(10);
      await playQuiz('transitions/' + tab, max);
    }

    /* discourse & timeseq */
    for (const [k, count, cats] of [['discourse', 84, 8], ['timeseq', 58, 7]]) {
      go('#/phrases/' + k); await sleep(20);
      ok($$('.ph-guide .intro-box').length >= 3 && $$('.ph-cat-card').length === cats, k + ': guide with intro & ' + cats + ' function cards');
      const catId = $('.ph-cat-card').dataset.cat;
      click($('.ph-cat-card'));
      go('#/phrases/' + k + '/browser'); await sleep(20);
      ok($('#ph-cat').value === catId && $$('.ph-marker').length > 0 && $$('.ph-marker').length < count, k + ': function card filters browser');
      const sel = $('#ph-cat'); sel.value = ''; sel.dispatchEvent(new window.Event('change', { bubbles: true }));
      ok($$('.ph-marker').length === count, k + ': browser lists ' + count + ' markers');
      const q = $('#ph-q'); q.value = 'anyway'; q.dispatchEvent(new window.Event('input', { bubbles: true }));
      ok(/Знайдено: \d+/.test($('#ph-count').textContent), k + ': search works (' + $$('.ph-marker').length + ')');
      q.value = ''; q.dispatchEvent(new window.Event('input', { bubbles: true }));
      go('#/phrases/' + k + '/cards'); await sleep(20);
      ok(new RegExp('/ ' + count).test($('#ph-counter').textContent), k + ': cards deck ' + count);
      const reg = $('#ph-fc-reg'); reg.value = 'formal'; reg.dispatchEvent(new window.Event('change', { bubbles: true }));
      ok(!new RegExp('/ ' + count + '$').test($('#ph-counter').textContent), k + ': register filter changes deck (' + $('#ph-counter').textContent + ')');
      for (const [tab, max] of [['match', 12], ['fill', 12], ['translate', 10], ['mix', 15]]) {
        go('#/phrases/' + k + '/' + tab); await sleep(10);
        await playQuiz(k + '/' + tab, max);
      }
      // перевірка правильного перекладу
      go('#/phrases/' + k + '/translate'); await sleep(10);
      const D = window.PHRASE_DATA[k];
      const shown = $('.ph-q-prompt').textContent;
      const item = D.TR_QS.find(t => shown.includes(t.uk));
      const inp = $('#ph-inp'); inp.value = item.answers[0].toUpperCase() + '!';
      click($('[data-check]'));
      ok(/✅/.test($('#ph-fb').textContent) && inp.classList.contains('good'), k + ': translation check accepts correct answer (case/punctuation-insensitive)');
    }

    go('#/phrases/nope'); ok(/не знайдено/i.test($('#view').textContent), 'unknown trainer → 404');
    go('#/phrases/discourse/syn'); ok(/не знайдено/i.test($('#view').textContent), 'unknown tab → 404');
  } catch (e) { errs.push('TEST THREW: ' + e.stack); }

  console.log(errs.length ? 'FAILURES: ' + errs.join(' | ') : 'PHRASES OK ✓');
  process.exit(errs.length ? 1 : 0);
})();
