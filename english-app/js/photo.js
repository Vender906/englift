/* ============================================================
   EngLift — тренажер «Що на фото» (розділ «Практика»).
   Фото змінюються, а ти за відведений час пишеш англійською якомога більше
   того, що бачиш: іменники, прикметники, дієслова або мікс.
   Без ШІ: кожне слово звіряється зі списком, складеним для фото заздалегідь
   (js/practice/photo-data.js, джерело — tools/photo). Після раунду — що пропущено.
   ============================================================ */
(function () {
  'use strict';

  const SRC = 'js/practice/photo-data.js';
  const C = () => window.FLCore;
  const esc = s => C().esc(s);
  const $ = id => document.getElementById(id);
  const say = (text, btn) => C().speakLang(text, 'en-US', 0.9, btn);

  const MODES = [
    ['nouns', '📦', 'Іменники', 'речі, люди, місця'],
    ['adjs', '🎨', 'Прикметники', 'кольори, розмір, якість'],
    ['verbs', '🏃', 'Дієслова', 'що відбувається'],
    ['mix', '🎲', 'Мікс', 'усе, що бачиш']
  ];
  const POS_UK = { nouns: 'іменник', adjs: 'прикметник', verbs: 'дієслово' };
  const TIMES = [[60, '1 хв'], [90, '1,5 хв'], [120, '2 хв'], [0, 'без таймера']];

  /* ---------- дані (ліниво) ---------- */
  let loading = null;
  const data = () => window.PHOTO_DATA || null;
  function ensure() {
    if (data()) return Promise.resolve(data());
    if (loading) return loading;
    loading = new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = SRC;
      el.onload = () => (data() ? resolve(data()) : reject(new Error('no data')));
      el.onerror = () => { loading = null; el.remove(); reject(new Error('load failed')); };
      document.head.appendChild(el);
    });
    return loading;
  }
  const sceneOf = id => (data() ? data().scenes.filter(s => s.id === id)[0] : null);

  /* ---------- прогрес: найкращий результат по сцені й режиму ---------- */
  const prog = () => C().store.photo || (C().store.photo = {});
  const prefs = () => prog()._prefs || (prog()._prefs = { mode: 'nouns', time: 90 });
  const bestOf = (id, mode) => ((prog()[id] || {})[mode] || 0);
  function saveBest(id, mode, n) {
    const p = prog();
    const rec = p[id] || (p[id] = {});
    const better = n > (rec[mode] || 0);
    if (better) rec[mode] = n;
    rec.played = (rec.played || 0) + 1;
    C().save();
    return better;
  }

  /* ============================ ПЕРЕВІРКА СЛОВА ============================ */
  const IRREG = {
    children: 'child', people: 'person', men: 'man', women: 'woman', feet: 'foot', teeth: 'tooth', mice: 'mouse',
    geese: 'goose', sheep: 'sheep', fish: 'fish', knives: 'knife', leaves: 'leaf', shelves: 'shelf', loaves: 'loaf',
    wolves: 'wolf', halves: 'half', lives: 'life', wives: 'wife', scarves: 'scarf', calves: 'calf',
    sat: 'sit', ran: 'run', stood: 'stand', held: 'hold', wore: 'wear', worn: 'wear', ate: 'eat', eaten: 'eat',
    drank: 'drink', drunk: 'drink', swam: 'swim', flew: 'fly', flown: 'fly', drove: 'drive', driven: 'drive',
    rode: 'ride', ridden: 'ride', lay: 'lie', lain: 'lie', made: 'make', bought: 'buy', brought: 'bring',
    caught: 'catch', taught: 'teach', thought: 'think', sold: 'sell', told: 'tell', said: 'say', went: 'go',
    gone: 'go', came: 'come', saw: 'see', seen: 'see', took: 'take', taken: 'take', gave: 'give', given: 'give',
    wrote: 'write', written: 'write', read: 'read', spoke: 'speak', spoken: 'speak', fell: 'fall', fallen: 'fall',
    grew: 'grow', grown: 'grow', threw: 'throw', thrown: 'throw', hung: 'hang', shone: 'shine', slept: 'sleep',
    kept: 'keep', left: 'leave', met: 'meet', paid: 'pay', put: 'put', cut: 'cut', hit: 'hit', built: 'build',
    sang: 'sing', sung: 'sing', laughed: 'laugh', smiled: 'smile', better: 'good', best: 'good', worse: 'bad', worst: 'bad',
    bigger: 'big', biggest: 'big', older: 'old', oldest: 'old'
  };
  const norm = s => String(s || '').toLowerCase().replace(/[’‘ʼ`]/g, "'").replace(/[^a-z' -]/g, ' ')
    .replace(/^\s*(a|an|the|some)\s+/, '').replace(/\s+/g, ' ').trim();

  /* можливі базові форми слова: як є, без -s/-es/-ies/-ves, -ing, -ed, -er/-est, неправильні */
  function lemmas(word) {
    const out = new Set([word]);
    const add = x => { if (x && x.length > 1) out.add(x); };
    if (IRREG[word]) add(IRREG[word]);
    const w = word;
    if (/ies$/.test(w)) add(w.slice(0, -3) + 'y');
    if (/ves$/.test(w)) { add(w.slice(0, -3) + 'f'); add(w.slice(0, -3) + 'fe'); }
    if (/(ses|xes|zes|ches|shes|oes)$/.test(w)) add(w.slice(0, -2));
    if (/s$/.test(w) && !/ss$/.test(w)) add(w.slice(0, -1));
    if (/ing$/.test(w) && w.length > 5) {
      const b = w.slice(0, -3);
      add(b); add(b + 'e');
      if (/([bcdfghjklmnpqrstvwz])\1$/.test(b)) add(b.slice(0, -1));
      if (/y$/.test(b)) add(b.slice(0, -1) + 'ie');
    }
    if (/ied$/.test(w)) add(w.slice(0, -3) + 'y');
    if (/ed$/.test(w) && w.length > 4) {
      const b = w.slice(0, -2);
      add(b); add(b + 'e'); add(w.slice(0, -1));
      if (/([bcdfghjklmnpqrstvwz])\1$/.test(b)) add(b.slice(0, -1));
    }
    if (/(er|est)$/.test(w) && w.length > 5) {
      const b = w.replace(/(er|est)$/, '');
      add(b); add(b + 'e');
      if (/i$/.test(b)) add(b.slice(0, -1) + 'y');
      if (/([bcdfghjklmnpqrstvwz])\1$/.test(b)) add(b.slice(0, -1));
    }
    return [...out];
  }
  /* для фраз (pick up, picking up) — форми першого слова + решта як є */
  function forms(typed) {
    const t = norm(typed);
    if (!t) return [];
    const parts = t.split(' ');
    return lemmas(parts[0]).map(f => [f].concat(parts.slice(1)).join(' ')).concat(lemmas(t)).filter((x, i, a) => a.indexOf(x) === i);
  }

  /* індекс сцени: ключ (en або alt) → { item, pos } */
  function indexOf(scene) {
    const idx = new Map();
    ['nouns', 'adjs', 'verbs'].forEach(pos => scene[pos].forEach(item => {
      [item.en].concat(item.alt || []).forEach(k => {
        const key = norm(k);
        if (!idx.has(key)) idx.set(key, []);
        idx.get(key).push({ item, pos });
      });
    }));
    return idx;
  }
  /* знайти слово: точний збіг форми → збіг з однією опискою (для слів від 5 літер) */
  function lookup(scene, typed, idx) {
    idx = idx || indexOf(scene);
    const fs = forms(typed);
    for (const f of fs) if (idx.has(f)) return { hits: idx.get(f), typo: false };
    const t = norm(typed);
    if (t.length >= 5) {
      for (const [key, hits] of idx) if (key.length >= 5 && C().oneTypo(key, t)) return { hits, typo: true };
    }
    return null;
  }
  /* результат для режиму: ok — новий збіг; dup — уже знайдено; other — є на фото, але інша частина мови; miss — немає */
  function judge(scene, mode, typed, found, idx) {
    const r = lookup(scene, typed, idx);
    if (!r) return { kind: 'miss' };
    const good = r.hits.filter(h => mode === 'mix' || h.pos === mode);
    if (!good.length) return { kind: 'other', pos: r.hits[0].pos, item: r.hits[0].item };
    const fresh = good.filter(h => !found.has(h.pos + '|' + h.item.en))[0];
    if (!fresh) return { kind: 'dup', item: good[0].item, pos: good[0].pos };
    return { kind: 'ok', item: fresh.item, pos: fresh.pos, typo: r.typo };
  }
  const poolOf = (scene, mode) => (mode === 'mix' ? ['nouns', 'adjs', 'verbs'] : [mode])
    .reduce((a, pos) => a.concat(scene[pos].map(item => ({ item, pos }))), []);

  /* ============================ МАРШРУТ ============================ */
  function route(view, parts) {
    const draw = () => {
      if (!parts[2]) return gallery(view);
      const scene = parts[2] === 'random' ? null : sceneOf(parts[2]);
      if (parts[2] === 'random') {
        const all = data().scenes;
        location.hash = '#/practice/photo/' + all[Math.floor(Math.random() * all.length)].id;
        return;
      }
      if (!scene || parts.length > 3) return C().notFound(view);
      scenePage(view, scene);
    };
    if (data()) return draw();
    view.innerHTML = '<div class="rd-loading"><div class="rd-book-anim"><span></span><span></span><span></span></div><h2>Готуємо фото…</h2></div>';
    ensure().then(() => {
      const cur = location.hash.replace(/^#\//, '').split('/').filter(Boolean);
      if (cur[0] === 'practice' && cur[1] === 'photo') draw();
    }).catch(() => {
      view.innerHTML = '<div class="page-head"><span class="emoji-big">📡</span><h1>Не вдалося завантажити фото</h1>' +
        '<p>Перевір зʼєднання й спробуй ще раз.</p></div><button class="btn btn-primary" id="pf-retry">🔁 Спробувати ще раз</button>';
      const b = $('pf-retry');
      if (b) b.addEventListener('click', () => route(view, parts));
    });
  }

  /* ============================ ГАЛЕРЕЯ ============================ */
  function gallery(view) {
    C().setCrumbs([{ label: 'Практика', hash: '#/practice' }, { label: 'Що на фото' }]);
    const D = data();
    view.innerHTML =
      '<div class="page-head"><span class="emoji-big">📸</span><h1>Що на фото</h1>' +
      '<p>Дивишся на фото й за відведений час пишеш англійською якомога більше того, що бачиш: речі, кольори, дії. ' +
      'Форми слів і дрібні описки зараховуються. Після раунду — список пропущених слів з перекладом.</p></div>' +
      '<div class="pf-top"><a class="btn btn-primary" href="#/practice/photo/random">🎲 Випадкове фото</a></div>' +
      '<div class="pf-gallery">' + D.scenes.map(s => {
        const b = Math.max(...MODES.map(m => bestOf(s.id, m[0])));
        return '<a class="card clickable pf-tile" href="#/practice/photo/' + s.id + '">' +
          '<img src="' + esc(s.img) + '" alt="' + esc(s.en) + '" loading="lazy" width="' + s.w + '" height="' + s.h + '">' +
          '<div class="pf-tile-cap"><b>' + s.emoji + ' ' + esc(s.uk) + '</b><span>' + (b ? '🏆 ' + b + ' сл.' : 'ще не грано') + '</span></div></a>';
      }).join('') + '</div>';
  }

  /* ============================ СЦЕНА: НАЛАШТУВАННЯ → ГРА → ПІДСУМОК ============================ */
  const game = {};
  function scenePage(view, scene) {
    C().setCrumbs([{ label: 'Практика', hash: '#/practice' }, { label: 'Що на фото', hash: '#/practice/photo' }, { label: scene.uk }]);
    stopTimer();
    const P = prefs();
    const credit = scene.credit;
    view.innerHTML =
      '<div class="pf-wrap">' +
      '<div class="pf-photo"><img id="pf-img" src="' + esc(scene.img) + '" alt="' + esc(scene.en) + '" width="' + scene.w + '" height="' + scene.h + '">' +
      '<div class="pf-timer" id="pf-timer" hidden></div></div>' +
      '<div class="pf-credit">📷 <a href="' + esc(credit.page) + '" target="_blank" rel="noopener">' + esc(credit.author) + '</a> · ' +
      (credit.licenseUrl ? '<a href="' + esc(credit.licenseUrl) + '" target="_blank" rel="noopener">' + esc(credit.license) + '</a>' : esc(credit.license)) + ' · Wikimedia Commons</div>' +
      '<div id="pf-panel"></div></div>';
    const img = $('pf-img');
    img.addEventListener('error', () => { img.replaceWith(Object.assign(document.createElement('div'), { className: 'pf-noimg', textContent: '📡 Фото не завантажилося — потрібен інтернет для першого перегляду.' })); });
    setupPanel(scene, P);
  }

  function setupPanel(scene, P) {
    const panel = $('pf-panel');
    const chip = (attr, val, active, html) => '<button class="pf-opt' + (active ? ' active' : '') + '" data-' + attr + '="' + val + '">' + html + '</button>';
    panel.innerHTML =
      '<div class="card pf-setup"><h2>' + scene.emoji + ' ' + esc(scene.uk) + ' <span class="pf-en">' + esc(scene.en) + '</span></h2>' +
      '<div class="pf-row"><span class="pf-lbl">Що шукаємо:</span>' + MODES.map(m =>
        chip('mode', m[0], P.mode === m[0], m[1] + ' ' + m[2] + ' <small>' + poolOf(scene, m[0]).length + '</small>')).join('') + '</div>' +
      '<div class="pf-row"><span class="pf-lbl">Час:</span>' + TIMES.map(t => chip('time', t[0], P.time === t[0], t[1])).join('') + '</div>' +
      '<div class="pf-best" id="pf-best"></div>' +
      '<button class="btn btn-primary pf-start" id="pf-start">▶ Почати</button></div>';
    const showBest = () => {
      const b = bestOf(scene.id, P.mode);
      $('pf-best').textContent = b ? '🏆 Твій рекорд у цьому режимі: ' + b + ' з ' + poolOf(scene, P.mode).length : 'Режим ще не пройдено — побий свій перший рекорд!';
    };
    showBest();
    panel.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => {
      P.mode = b.dataset.mode; C().save();
      panel.querySelectorAll('[data-mode]').forEach(x => x.classList.toggle('active', x === b)); showBest();
    }));
    panel.querySelectorAll('[data-time]').forEach(b => b.addEventListener('click', () => {
      P.time = +b.dataset.time; C().save();
      panel.querySelectorAll('[data-time]').forEach(x => x.classList.toggle('active', x === b));
    }));
    $('pf-start').addEventListener('click', () => play(scene, P.mode, P.time));
  }

  let timerId = null;
  const stopTimer = () => { if (timerId) clearInterval(timerId); timerId = null; };

  function play(scene, mode, time) {
    const G = Object.assign(game, { scene, mode, time, found: new Map(), rejected: [], tries: 0, hints: 0, left: time, idx: indexOf(scene), over: false });
    const total = poolOf(scene, mode).length;
    const panel = $('pf-panel');
    panel.innerHTML =
      '<div class="card pf-play">' +
      '<div class="pf-play-head"><span>' + MODES.filter(m => m[0] === mode)[0].slice(1, 3).join(' ') + '</span>' +
      '<span class="pf-score" id="pf-score">0 / ' + total + '</span></div>' +
      '<form id="pf-form" class="pf-form" autocomplete="off"><input class="text-input pf-input" id="pf-input" placeholder="grass, tree, sky… — Enter або «Додати»" ' +
      'autocapitalize="off" autocorrect="off" spellcheck="false" lang="en"><button class="btn btn-primary" type="submit">➕ Додати</button></form>' +
      '<div class="pf-tip">Можна по одному слову або кілька через кому.</div>' +
      '<div class="pf-msg" id="pf-msg" aria-live="polite"></div>' +
      '<div class="pf-chips" id="pf-chips"></div>' +
      '<div class="pf-actions"><button class="btn btn-ghost" id="pf-hint">💡 Підказка</button>' +
      '<button class="btn btn-ghost" id="pf-finish">🏁 Завершити</button></div></div>';
    const inp = $('pf-input');
    inp.focus();
    $('pf-form').addEventListener('submit', e => { e.preventDefault(); submit(inp.value); inp.value = ''; inp.focus(); });
    $('pf-finish').addEventListener('click', () => finish());
    $('pf-hint').addEventListener('click', () => hint());
    const tEl = $('pf-timer');
    if (time) {
      tEl.hidden = false;
      const tick = () => {
        tEl.textContent = '⏱ ' + Math.floor(G.left / 60) + ':' + String(G.left % 60).padStart(2, '0');
        tEl.classList.toggle('pf-hurry', G.left <= 10);
      };
      tick();
      stopTimer();
      timerId = setInterval(() => {
        if (!document.body.contains(tEl)) return stopTimer();
        G.left--; tick();
        if (G.left <= 0) finish();
      }, 1000);
    }
  }

  function msg(text, cls) {
    const el = $('pf-msg');
    if (!el) return;
    el.className = 'pf-msg ' + (cls || '');
    el.innerHTML = text;
  }

  /* введення: одне слово або кілька через кому / крапку з комою */
  const splitInput = raw => String(raw || '').split(/[,;\n]+/).map(s => s.trim()).filter(s => norm(s));

  function submit(raw) {
    const G = game;
    if (G.over) return;
    const words = splitInput(raw);
    if (!words.length) return;
    const res = words.map(w => ({ w, r: submitOne(w) })).filter(x => x.r);
    if (G.over) return;
    if (res.length === 1) return msg(describe(res[0].w, res[0].r), res[0].r.kind);
    /* кілька слів — коротке зведення */
    const ok = res.filter(x => x.r.kind === 'ok'), rest = res.filter(x => x.r.kind !== 'ok');
    msg((ok.length ? '✅ Зараховано ' + ok.length + ': ' + ok.map(x => '<b>' + esc(x.r.item.en) + '</b>').join(', ') : '') +
      (rest.length ? (ok.length ? '<br>' : '') + rest.map(x => describe(x.w, x.r)).join('<br>') : ''), ok.length ? 'ok' : rest[0].r.kind);
  }
  function describe(w, r) {
    if (r.kind === 'ok') return '✅ <b>' + esc(r.item.en) + '</b> — ' + esc(r.item.uk) + (r.typo ? ' <small>(з невеликою опискою)</small>' : '');
    if (r.kind === 'dup') return '↩️ <b>' + esc(r.item.en) + '</b> уже є';
    if (r.kind === 'other') return '🔀 <b>' + esc(r.item.en) + '</b> є на фото, але це ' + POS_UK[r.pos] + ' — зараз шукаємо ' + MODES.filter(m => m[0] === game.mode)[0][2].toLowerCase();
    return '🤔 «' + esc(w) + '» — такого слова для цього фото немає в списку';
  }
  function submitOne(w) {
    const G = game;
    if (G.over) return null;
    G.tries++;
    const r = judge(G.scene, G.mode, w, G.found, G.idx);
    if (r.kind === 'ok') {
      G.found.set(r.pos + '|' + r.item.en, r);
      C().addXp(1);
      const chips = $('pf-chips');
      if (chips) chips.insertAdjacentHTML('afterbegin', '<span class="pf-chip pf-' + r.pos + '" title="' + esc(r.item.uk) + '">' + esc(r.item.en) + ' <small>' + esc(r.item.uk) + '</small></span>');
      const sc = $('pf-score');
      if (sc) sc.textContent = G.found.size + ' / ' + poolOf(G.scene, G.mode).length;
      if (G.found.size === poolOf(G.scene, G.mode).length) finish();
    } else if (r.kind === 'miss' || r.kind === 'other') G.rejected.push({ w, r });
    return r;
  }

  function hint() {
    const G = game;
    if (G.over) return;
    const left = poolOf(G.scene, G.mode).filter(h => !G.found.has(h.pos + '|' + h.item.en));
    if (!left.length) return;
    /* спершу підказуємо легші слова */
    const order = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const lvl = Math.min(...left.map(h => order.indexOf(h.item.lvl)));
    const easy = left.filter(h => order.indexOf(h.item.lvl) === lvl);
    const h = easy[Math.floor(Math.random() * easy.length)];
    G.hints++;
    msg('💡 Знайди на фото: <b>' + esc(h.item.uk) + '</b> <small>(' + POS_UK[h.pos] + ', починається на «' + esc(h.item.en[0]) + '»)</small>', 'hint');
    $('pf-input').focus();
  }

  function finish() {
    const G = game;
    if (G.over) return;
    /* слова, що лишилися в полі без Enter, теж зараховуємо */
    const inp = $('pf-input');
    if (inp && inp.value.trim()) { const pending = inp.value; inp.value = ''; splitInput(pending).forEach(w => submitOne(w)); if (G.over) return; }
    G.over = true;
    stopTimer();
    const pool = poolOf(G.scene, G.mode);
    const n = G.found.size;
    const record = n > 0 && saveBest(G.scene.id, G.mode, n);
    if (n === pool.length) C().addXp(10);
    const missed = pool.filter(h => !G.found.has(h.pos + '|' + h.item.en));
    const order = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    missed.sort((a, b) => order.indexOf(a.item.lvl) - order.indexOf(b.item.lvl));
    const row = h => '<li><button class="ph-say sm" data-say="' + esc(h.item.en) + '" title="Послухати">🔊</button> <b lang="en">' + esc(h.item.en) + '</b> — ' + esc(h.item.uk) +
      ' <span class="wb lvl-' + h.item.lvl + '">' + h.item.lvl + '</span>' + (G.mode === 'mix' ? ' <small class="pf-pos">' + POS_UK[h.pos] + '</small>' : '') + '</li>';
    const tEl = $('pf-timer');
    if (tEl) tEl.hidden = true;
    const panel = $('pf-panel');
    const all = data().scenes;
    const next = all[(all.indexOf(G.scene) + 1) % all.length];
    panel.innerHTML =
      '<div class="card pf-result">' +
      '<h2>' + (n === pool.length ? '🎉 Усі слова знайдено!' : '🏁 Раунд завершено') + '</h2>' +
      '<div class="pf-big">' + n + ' <small>з ' + pool.length + '</small></div>' +
      (record ? '<div class="pf-record">🏆 Новий рекорд!</div>' : '<div class="pf-sub">Рекорд: ' + bestOf(G.scene.id, G.mode) + '</div>') +
      (G.hints ? '<div class="pf-sub">Підказок: ' + G.hints + '</div>' : '') +
      (n ? '<h3>✅ Ти знайшов</h3><div class="pf-chips">' + [...G.found.values()].map(r => '<span class="pf-chip pf-' + r.pos + '">' + esc(r.item.en) + ' <small>' + esc(r.item.uk) + '</small></span>').join('') + '</div>' : '') +
      (G.rejected.length ? '<h3>🤔 Не зараховано (' + G.rejected.length + ')</h3><ul class="pf-rejected">' + G.rejected.map(x => '<li>' +
        (x.r.kind === 'other' ? '<b lang="en">' + esc(x.w) + '</b> — це ' + POS_UK[x.r.pos] + ' (є на фото, але режим інший)' : '<b lang="en">' + esc(x.w) + '</b> — немає в списку слів цього фото') + '</li>').join('') + '</ul>' : '') +
      (missed.length ? '<h3>🔎 Що ще було на фото (' + missed.length + ')</h3><ul class="pf-missed">' + missed.map(row).join('') + '</ul>' : '') +
      '<div class="pf-actions"><button class="btn btn-primary" id="pf-again">🔁 Ще раз</button>' +
      '<a class="btn btn-ghost" href="#/practice/photo/' + next.id + '">➡️ Наступне фото</a>' +
      '<button class="btn btn-ghost" id="pf-setup">⚙️ Інший режим</button></div></div>';
    $('pf-again').addEventListener('click', () => play(G.scene, G.mode, G.time));
    $('pf-setup').addEventListener('click', () => setupPanel(G.scene, prefs()));
    panel.querySelectorAll('[data-say]').forEach(b => b.addEventListener('click', () => say(b.dataset.say, b)));
  }

  /* ---------- для хабу «Практики» ---------- */
  function summary() {
    const p = C().store.photo || {};
    const played = Object.keys(p).filter(k => k !== '_prefs' && p[k].played).length;
    return { played };
  }

  window.FLPhoto = { route, ensure, summary, lookup, judge, lemmas, forms, poolOf, indexOf, MODES };
})();
