/* Словник → Картки: частини (Parts) великих категорій — розбиття, стабільний порядок,
   змішані підкатегорії, прогрес кожної частини, «Продовжити», посилання, 404 */
const { boot } = require('./_boot');
const { window, doc, errs, go, ok, click, storeGet } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  try {
    const L = window.FLLexis;
    const key = v => v.en + '|' + (v.ctx || '') + '|' + v.uk;
    const N = L.PART_SIZE;

    /* ---------- розбиття ---------- */
    const parts = L.catParts('verbs', 'motion');
    const motion = L.POS.verbs.words.filter(v => L.wVisible(v) && (v.cats || []).includes('motion'));
    ok(N === 25, 'part size is 25');
    ok(parts.length === Math.ceil(motion.length / N), 'motion: ' + motion.length + ' words → ' + parts.length + ' parts');
    ok(parts.slice(0, -1).every(p => p.length === N) && parts[parts.length - 1].length <= N + Math.ceil(N / 3), 'every part but the last has exactly ' + N + ' words');
    const flat = parts.flat();
    ok(flat.length === motion.length && new Set(flat.map(key)).size === motion.length && motion.every(v => flat.includes(v)), 'parts cover every word exactly once');
    ok(parts[0].map(key).join() !== motion.slice(0, N).map(key).join(), 'part 1 is not just the first ' + N + ' words of the list');

    /* C1 і C2 — в останніх частинах: у кожній категорії кожної частини мови рівні не спадають A1–B2 → C1 → C2 */
    const tier = v => ['C1', 'C2'].indexOf(v.lvl) + 1;
    const sorted = ws => ws.every((v, i) => !i || tier(ws[i - 1]) <= tier(v));
    ok(sorted(flat) && tier(flat[0]) === 0 && flat.some(v => v.lvl === 'C1'), 'motion: C1 words come after all A1–B2 words');
    const badLvl = [];
    for (const posId of Object.keys(L.POS)) for (const id of Object.keys(L.POS[posId].cats))
      if (L.hasParts(posId, id) && !sorted(L.catParts(posId, id).flat())) badLvl.push(posId + '/' + id);
    ok(!badLvl.length, 'every category puts C1/C2 into its last parts' + (badLvl.length ? ': ' + badLvl.join(', ') : ''));

    /* підкатегорії перемішані в кожній частині */
    const subs = Object.entries(L.POS.verbs.subs).filter(([, s]) => s.parent === 'motion').map(([id]) => id);
    const subsIn = p => new Set(p.flatMap(v => (v.cats || []).filter(c => subs.includes(c)))).size;
    ok(parts.every(p => subsIn(p) >= 3), 'every motion part mixes 3+ subcategories (' + parts.map(subsIn).join(',') + ')');

    /* стабільність: той самий порядок при повторному виклику й у «новому» запуску */
    ok(L.catParts('verbs', 'motion') === parts, 'parts are cached');
    const again = require('./_boot').boot().window.FLLexis.catParts('verbs', 'motion');
    ok(again.map(p => p.map(key).join()).join('#') === parts.map(p => p.map(key).join()).join('#'), 'a fresh app start gives the same parts');
    ok(L.catParts('verbs', 'comm')[0].map(key).join() !== parts[0].map(key).join(), 'every category has its own order');

    /* короткий хвіст доливається до попередньої частини */
    const cats = L.POS.verbs.cats;
    for (const id of Object.keys(cats)) {
      if (!L.hasParts('verbs', id)) continue;
      const ps = L.catParts('verbs', id);
      const last = ps[ps.length - 1].length;
      if (last < Math.ceil(N / 3) || last > N + Math.ceil(N / 3)) { ok(false, id + ': bad tail ' + last); break; }
    }
    ok(true, 'no category ends with a tiny part');
    ok(!L.hasParts('verbs', 'walking') && !L.hasParts('verbs', 'delex'), 'subcategories and special hubs have no parts');

    /* ---------- вкладка «Картки» ---------- */
    go('#/vocab/verbs/cards');
    ok(!$('.lp-box'), 'all words: no parts block');
    go('#/vocab/verbs/cards/motion');
    ok($$('.lp-chip[data-part]:not(.lp-all)').length === parts.length && !!$('.lp-chip.lp-all.active'), 'motion: ' + parts.length + ' parts listed, whole category active by default');
    ok($$('.lp-chip.lp-new').length === parts.length && /не почато/.test($('.lp-chip').textContent), 'all parts start as «не почато»');
    ok(/Продовжити · Part 1/.test($('.lp-continue').textContent), 'continue points to Part 1');
    ok($('#card-scope').value === 'motion', 'the deck select shows the category');

    click($('.lp-continue'));
    ok(/Part 1 · 1\/25/.test($('.lp-card-tag').textContent) && $('.lp-chip.active').dataset.part === '0', 'continue opens Part 1 at card 1');
    ok(window.location.hash === '#/vocab/verbs/cards/motion/1', 'address follows the part (' + window.location.hash + ')');
    const shown = () => $('#theCard .fc-en').childNodes[0].textContent.trim();
    ok(shown() === parts[0][0].en, 'Part 1 starts with its first word in the stable order');

    for (let i = 0; i < 3; i++) { click($('#fc-known')); await sleep(300); }
    click($('#fc-unknown'));
    click($('#fc-next'));
    const rec = storeGet().parts['verbs/motion'];
    ok(Object.keys(rec.s).length === 4 && Object.values(rec.s).filter(x => x === 'k').length === 3 && rec.last === 0, 'progress of the part is saved (3 known, 1 unknown)');
    ok(/4\/25/.test($('.lp-chip[data-part="0"]').textContent) && $('.lp-chip[data-part="0"]').classList.contains('lp-started'), 'Part 1 chip shows 4/25');
    ok((storeGet().words.verbs || []).length === 3, '«знаю» still marks the word as learned globally');

    /* повернення «через тиждень»: нова сесія відкриває ту саму частину з пʼятої картки */
    L.resetCaches();
    go('#/vocab/verbs');
    go('#/vocab/verbs/cards/motion/next');
    ok(/Part 1 · 5\/25/.test($('.lp-card-tag').textContent) && shown() === parts[0][4].en, 'continue resumes Part 1 at the first unanswered card');
    ok($('#kCount').textContent === '3' && $('#uCount').textContent === '1' && $('#rCount').textContent === '21', 'counters restored: 3 known, 1 unknown, 21 left');

    /* інша частина — окремий прогрес */
    click($('.lp-chip[data-part="2"]'));
    ok(/Part 3 · 1\/25/.test($('.lp-card-tag').textContent) && $('#rCount').textContent === '25', 'Part 3 opens fresh');
    click($('#fc-known')); await sleep(300);
    ok(/1\/25/.test($('.lp-chip[data-part="2"]').textContent) && /4\/25/.test($('.lp-chip[data-part="0"]').textContent), 'parts keep separate progress');
    ok(/Продовжити · Part 3/.test($('.lp-continue').textContent), 'continue follows the last opened unfinished part');

    /* завершити Part 1 */
    click($('.lp-chip[data-part="0"]'));
    for (let i = 0; i < 30 && $('#theCard'); i++) { click($('#fc-known')); await sleep(300); }
    ok(/Part 1 завершено/.test($('.flashcard.done').textContent), 'finishing every card completes the part');
    ok($('.lp-chip[data-part="0"]').classList.contains('lp-done') && /Завершено/.test($('.lp-chip[data-part="0"]').textContent), 'Part 1 chip shows «Завершено»');
    const nextBtn = $('.flashcard.done [data-part]');
    ok(!!nextBtn && nextBtn.dataset.part === '1', 'done screen offers the next unfinished part (Part 2)');
    click(nextBtn);
    ok(/Part 2 · 1\/25/.test($('.lp-card-tag').textContent), 'next part opens');

    /* пропущені картки не завершують частину */
    for (let i = 0; i < 25; i++) click($('#fc-next'));
    ok(/пропущено 25/.test($('.flashcard.done').textContent) && !!$('#lp-skipped'), 'skipping cards leaves the part unfinished');
    click($('#lp-skipped'));
    ok(/Part 2 · 1\/25/.test($('.lp-card-tag').textContent), '«До пропущених» returns to the first skipped card');

    /* скинути частину */
    click($('.lp-chip[data-part="2"]'));
    click($('#fc-reset'));
    ok(!/\d+\/25/.test($('.lp-chip[data-part="2"]').textContent) && /не почато/.test($('.lp-chip[data-part="2"]').textContent), 'reset clears only the progress of that part');
    ok($('.lp-chip[data-part="0"]').classList.contains('lp-done'), 'other parts keep their progress');

    /* уся категорія й підкатегорії працюють як раніше */
    click($('.lp-chip.lp-all'));
    ok(!$('.lp-card-tag') && /\/cards\/motion$/.test(window.location.hash) && $('#rCount').textContent === String(motion.length), 'whole category: classic shuffled deck of ' + motion.length);
    const sel = $('#card-scope');
    sel.value = 'walking'; sel.dispatchEvent(new window.Event('change', { bubbles: true }));
    ok(!$('.lp-box') && !!$('#theCard'), 'subcategory deck: no parts, cards as before');

    /* ---------- браузер категорії ---------- */
    go('#/vocab/verbs');
    click([...$$('.hub-card')].find(h => h.dataset.cat === 'motion'));
    const link = $('.lp-link');
    ok(!!link && link.getAttribute('href') === '#/vocab/verbs/cards/motion' && link.textContent.includes(parts.length + ' × ~25') && link.textContent.includes('завершено 1/' + parts.length), 'category page links to the parts');
    ok(/Продовжити · Part 3/.test($('.lp-link-go').textContent), 'category page has a continue button');
    ok($$('.sub-chip').length === subs.length, 'subcategory chips are still there');

    /* ---------- маршрути ---------- */
    for (const h of ['#/vocab/verbs/cards/motion/' + (parts.length + 1), '#/vocab/verbs/cards/motion/0', '#/vocab/verbs/cards/motion/x', '#/vocab/verbs/cards/nope', '#/vocab/verbs/cards/walking/1', '#/vocab/verbs/cards/motion/1/x']) {
      go(h);
      ok(/не знайдено/i.test($('#view').textContent), h + ' → 404');
    }
    go('#/vocab/verbs/cards/walking');
    ok($('#card-scope').value === 'walking' && !!$('#theCard'), 'a link to a subcategory deck works');

    /* ---------- фото на картках (Pixabay, tools/pics) ---------- */
    const fs = require('fs'), path = require('path');
    const picIds = (window.LEX_PICS || {}).nouns || [];
    const nounIds = new Set(L.POS.nouns.words.map(v => v._id));
    const picFile = id => path.join(__dirname, '..', 'english-app', 'img', 'pics', 'nouns', id + '.jpg');
    ok(picIds.length > 150 && picIds.every(id => nounIds.has(id) && fs.existsSync(picFile(id))), 'every noun photo (' + picIds.length + ') belongs to a noun and has a file');
    const food = L.POS.nouns.words.filter(v => L.wVisible(v) && (v.cats || []).includes('food'));
    ok(food.every(v => picIds.includes(v._id)), 'every Food & kitchen noun has a photo');
    ok(!$('.fc-pic'), 'verb cards have no pictures');
    go('#/vocab/nouns/cards/food/1');
    let picShown = 0, badSrc = 0, picOnFront = 0, noCredit = 0;
    for (let i = 0; i < 25 && $('#fc-next') && $('#theCard'); i++) {
      if ($('#theCard .fc-pic') || !$('#theCard .fc-emoji')) picOnFront++;   /* лицьовий бік — емодзі, фото ще не видно */
      click($('#theCard'));
      const img = $('#theCard.flipped .fc-hidden .fc-pic');
      if (img) {
        picShown++;
        const id = +img.getAttribute('src').match(/(\d+)\.jpg$/)[1];
        if (!picIds.includes(id)) badSrc++;
        if (!/Pixabay/.test($('#theCard .fc-pic-credit').textContent)) noCredit++;
      }
      click($('#fc-next'));   /* «Знаю» гортає з затримкою, «Далі» — одразу */
    }
    ok(picShown === 25 && !badSrc && !picOnFront && !noCredit, 'food Part 1: emoji on the front, photo with the Pixabay credit appears after flipping (' + picShown + '/25)');

    /* приклад англійською — на лицьовому боці, переклад прикладу — на звороті (усі частини мови) */
    for (const pos of ['verbs', 'nouns', 'adjs', 'advs']) {
      go(pos === 'nouns' ? '#/vocab/nouns/cards/food/5' : '#/vocab/' + pos + '/cards');   /* загальну колоду іменників уже пройдено вище */
      let bad = 0, checked = 0;
      for (let i = 0; i < 15 && $('#theCard') && $('#fc-next'); i++) {
        const fr = $('#theCard .fc-front .fc-ex-front'), ukBack = $('#theCard .fc-hidden .fc-ex-uk');
        const txt = $('#theCard .fc-front').textContent;
        if (!fr || !fr.textContent.trim() || (ukBack && txt.includes(ukBack.textContent)) || $('#theCard .fc-front .fc-ex-uk')) bad++;
        if (!ukBack || !ukBack.textContent.trim()) bad++;
        checked++;
        click($('#fc-next'));
      }
      ok(checked > 5 && !bad, pos + ': English example on the front, its translation only on the back (' + checked + ' cards)');
    }

    /* перемикач «Емодзі на картках» у налаштуваннях */
    click($('#settings-btn'));
    const es = $('#set-card-emoji');
    ok(!!es && es.checked, 'settings: card emoji switch is on by default');
    es.checked = false; es.dispatchEvent(new window.Event('change', { bubbles: true })); click($('#m-close'));
    ok(storeGet().settings.cardEmoji === false, 'settings: switching card emoji off is saved');
    for (const h of ['#/vocab/verbs/cards', '#/vocab/nouns/cards/food/6', '#/vocab/adjs/cards', '#/vocab/advs/cards']) {
      go(h);
      ok(!!$('#theCard .fc-en') && !$('#theCard .fc-emoji'), 'emoji off: no emoji on ' + h);
    }
    click($('#settings-btn')); const es2 = $('#set-card-emoji');
    es2.checked = true; es2.dispatchEvent(new window.Event('change', { bubbles: true })); click($('#m-close'));
    go('#/vocab/nouns/cards/food/7');
    ok(storeGet().settings.cardEmoji === true && !!$('#theCard .fc-front .fc-emoji'), 'emoji back on: card shows the emoji');

    /* перемикач «Фото на картках» у налаштуваннях */
    click($('#settings-btn'));
    const sw = $('#set-pics');
    ok(!!sw && sw.checked, 'settings: photo switch is on by default');
    sw.checked = false; sw.dispatchEvent(new window.Event('change', { bubbles: true }));
    ok(storeGet().settings.pics === false, 'settings: switching photos off is saved');
    click($('#m-close'));
    go('#/vocab/nouns/cards/food/3'); click($('#theCard'));
    ok($('#theCard.flipped') && !$('.fc-pic') && !$('.fc-pic-credit'), 'photos off: flipped card has no photo');
    click($("#settings-btn")); const sw2 = $('#set-pics');
    ok(!sw2.checked, 'settings: switch shows the off state');
    sw2.checked = true; sw2.dispatchEvent(new window.Event('change', { bubbles: true })); click($('#m-close'));
    go('#/vocab/nouns/cards/food/2'); click($('#theCard'));
    ok(storeGet().settings.pics === true && !!$('#theCard.flipped .fc-pic'), 'photos back on: flipped card shows the photo');
  } catch (e) { errs.push('TEST THREW: ' + e.stack); }

  console.log(errs.length ? 'FAILURES: ' + errs.join(' | ') : 'LEXIS PARTS OK ✓');
  process.exit(errs.length ? 1 : 0);
})();
