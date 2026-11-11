/* «Що на фото»: дані сцен, перевірка слів (форми, синоніми, описки, інша частина мови), повний раунд в інтерфейсі */
const fs = require('fs');
const path = require('path');
const { boot, APP } = require('./_boot');
const { window, doc, errs, go, ok, click, storeGet } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  try {
    window.eval(fs.readFileSync(path.join(APP, 'js/practice/photo-data.js'), 'utf8'));
    const D = window.PHOTO_DATA, F = window.FLPhoto;
    ok(!!F && !!D && D.scenes.length >= 1, 'photo trainer and ' + D.scenes.length + ' scenes loaded');

    /* ---------- дані ---------- */
    const bad = [];
    D.scenes.forEach(s => {
      if (!fs.existsSync(path.join(APP, s.img))) bad.push(s.id + ': no image');
      if (s.nouns.length < 25 || s.adjs.length < 12 || s.verbs.length < 10) bad.push(s.id + ': too few words');
      if (!(s.credit && s.credit.author && s.credit.license && s.credit.page)) bad.push(s.id + ': no credit');
    });
    ok(!bad.length, 'every scene has a photo, enough words and a credit' + (bad.length ? ': ' + bad.join('; ') : ''));
    ok(!/["']\.\.\/|https?:/.test(D.scenes.map(s => s.img).join()), 'photos are local files (work offline after the first view)');

    /* ---------- перевірка слова ---------- */
    const S = D.scenes.find(s => s.id === 'park');
    const J = (mode, typed, found) => F.judge(S, mode, typed, found || new Map());
    ok(J('nouns', 'grass').kind === 'ok', 'exact noun is accepted');
    ok(J('nouns', 'Children').kind === 'ok' && J('nouns', 'Children').item.en === 'child', 'irregular plural children → child');
    ok(J('nouns', 'the girls').item.en === 'girl', 'article and plural are ignored');
    ok(J('nouns', 'kids').item.en === 'child', 'synonym from alt counts for the same item');
    ok(J('nouns', 'trash').item.en === 'litter' && J('nouns', 'pants').item.en === 'trousers', 'AmE / BrE variants');
    ok(J('nouns', 'blankett').kind === 'ok' && J('nouns', 'blankett').typo, 'one typo in a long word is forgiven');
    ok(J('nouns', 'gras').kind === 'miss' || J('nouns', 'gras').item.en === 'grass', 'short words: typo rule does not explode');
    ok(J('verbs', 'sitting').item.en === 'sit' && J('verbs', 'ran').item.en === 'run' && J('verbs', 'carries').item.en === 'carry', 'verb forms: -ing, irregular past, -ies');
    ok(J('verbs', 'picking up').item.en === 'pick up', 'phrasal verb in -ing form');
    ok(J('adjs', 'colorful').item.en === 'colourful', 'adjective spelling variant');
    const o = J('nouns', 'green');
    ok(o.kind === 'other' && o.pos === 'adjs', 'right word, wrong part of speech → «other» hint');
    ok(J('mix', 'green').kind === 'ok', 'mix accepts every part of speech');
    ok(J('nouns', 'elephant').kind === 'miss', 'words not in the photo are rejected');
    const found = new Map([['nouns|child', {}]]);
    ok(J('nouns', 'kid', found).kind === 'dup', 'the same item twice → «already found»');

    /* ---------- інтерфейс ---------- */
    go('#/practice'); await sleep(30);
    ok(!!$('a[href="#/practice/photo"]'), 'practice hub has the photo trainer card');
    go('#/practice/photo'); await sleep(30);
    ok($$('.pf-tile').length === D.scenes.length, 'gallery shows every scene');
    go('#/practice/photo/park'); await sleep(30);
    ok(!!$('#pf-img') && /Wikimedia/.test($('.pf-credit').textContent), 'scene page: photo and author / licence credit');
    click($('[data-mode="nouns"]'));
    click($('[data-time="0"]'));
    click($('#pf-start'));
    const inp = $('#pf-input');
    const type = w => { inp.value = w; $('#pf-form').dispatchEvent(new window.Event('submit', { cancelable: true, bubbles: true })); };
    ok(!!inp && $('#pf-timer').hidden, 'round started without a timer');
    type('grass'); type('children'); type('trees and stuff'); type('green'); type('grass');
    ok($$('#pf-chips .pf-chip').length === 2 && /2 \//.test($('#pf-score').textContent), 'two words counted (grass, children)');
    ok(/уже є/.test($('#pf-msg').textContent), 'repeat → «already found»');
    click($('#pf-hint'));
    ok(/Знайди на фото/.test($('#pf-msg').textContent), 'hint shows a Ukrainian word to find');
    click($('#pf-finish'));
    ok(/2/.test($('.pf-big').textContent) && $$('.pf-missed li').length === S.nouns.length - 2, 'result: score and the list of missed words');
    ok(/Новий рекорд/.test($('.pf-result').textContent) && storeGet().photo.park.nouns === 2, 'record is saved per scene and mode');
    click($('#pf-again'));
    ok(!!$('#pf-input') && $$('#pf-chips .pf-chip').length === 0, '«Ще раз» starts a fresh round');

    /* кілька слів через кому + слово, що лишилося в полі без Enter */
    const inp2 = $('#pf-input');
    inp2.value = 'grass, girls ;  trees,'; $('#pf-form').dispatchEvent(new window.Event('submit', { cancelable: true, bubbles: true }));
    ok($$('#pf-chips .pf-chip').length === 2 && /Зараховано 2/.test($('#pf-msg').textContent) && /trees/.test($('#pf-msg').textContent), 'comma-separated input: each word is checked separately');
    inp2.value = 'boy';
    click($('#pf-finish'));
    ok(/^3/.test($('.pf-big').textContent.trim()), 'text left in the field is counted when the round ends');
    ok(!!$('.pf-rejected') && /trees/.test($('.pf-rejected').textContent), 'result lists rejected words with the reason');
    click($('#pf-again'));
    ok(!!$('#pf-form button[type="submit"]'), 'there is an «Add» button next to the field');

    /* таймер */
    click($('#pf-finish'));
    click($('#pf-setup'));
    click($('[data-time="60"]'));
    click($('#pf-start'));
    ok(!$('#pf-timer').hidden && /1:00/.test($('#pf-timer').textContent), 'timer starts at 1:00');
    await sleep(1100);
    ok(/0:59/.test($('#pf-timer').textContent), 'timer counts down');
    click($('#pf-finish'));

    go('#/practice/photo/nope'); await sleep(30);
    ok(/не знайдено/i.test($('#view').textContent), 'unknown scene → 404');
  } catch (e) { errs.push('TEST THREW: ' + e.stack); }

  console.log(errs.length ? 'FAILURES: ' + errs.join(' | ') : 'PHOTO OK ✓');
  process.exit(errs.length ? 1 : 0);
})();
