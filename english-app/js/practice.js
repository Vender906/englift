/* ============================================================
   EngLift — розділ «Практика»: вузькі теми, які треба «набити»
   до автоматизму. Кожна тема — пакет (js/practice/<id>-data.js),
   вантажиться лише при вході в нього.
   Перший пакет — «Рух і розташування».
   ============================================================ */
(function () {
  'use strict';

  const SECTION = 'Практика';
  const XP_PER_OK = 5;
  const XP_HINTED = 2;
  const C = () => window.FLCore;
  const esc = s => C().esc(s);
  const shuffle = arr => C().shuffle(arr);
  const pick = (arr, n) => shuffle(arr).slice(0, n);
  const $ = id => document.getElementById(id);
  const say = (text, btn) => C().speakLang(String(text).replace(/(^|\s)— /g, '$1').replace(/_+/g, ' '), 'en-US', 0.9, btn);

  /* реєстр пакетів: меню будується до завантаження даних, тому назви тем тут продубльовано */
  const PACKS = [
    {
      id: 'motion', emoji: '🧭', title: 'Рух і розташування', src: 'js/practice/motion-data.js',
      short: 'where, across, through, over, past, around, how do I get to…',
      desc: 'Де хто знаходиться, куди й як рухається, через що перелазить, як питати дорогу й вибирати маршрут.',
      grammar: [['#/grammar/prepositions/prep-place', '🏠 Місце: in / on / at'], ['#/grammar/prepositions/prep-movement', '🧭 Прийменники руху']],
      topics: [['where', '📍', 'Де хто знаходиться'], ['precise', '🎯', 'Уточнюємо місце'], ['direction', '➡️', 'Куди і звідки'],
        ['obstacles', '🌉', 'Через, крізь, повз, навколо'], ['moveverbs', '🧗', 'Дієслова руху'], ['asking', '💬', 'Питаємо й уточнюємо'],
        ['route', '🗺️', 'Вибираємо маршрут'], ['traps', '🪤', 'Пастки']],
      counts: { topics: 8, items: 212, scenes: 31 }
    }
  ];
  const packOf = id => PACKS.filter(p => p.id === id)[0];

  const TABS = [['guide', '📖 Як це працює'], ['list', '📋 Речення'], ['cards', '🃏 Картки'], ['choose', '🎯 Вибір'], ['write', '✍️ Напиши сам']];

  const loaded = {}, loading = {};
  const data = id => loaded[id] || (window.PRACTICE_DATA && window.PRACTICE_DATA[id] ? (loaded[id] = window.PRACTICE_DATA[id]) : null);
  const state = {};
  const st = key => state[key] || (state[key] = { fc: { idx: 0, flipped: false, status: {} }, quiz: {} });

  function ensure(id) {
    const p = packOf(id);
    if (!p) return Promise.reject(new Error('no pack'));
    if (data(id)) return Promise.resolve(loaded[id]);
    if (loading[id]) return loading[id];
    loading[id] = new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = p.src;
      el.onload = () => (data(id) ? resolve(loaded[id]) : reject(new Error('no data')));
      el.onerror = () => { loading[id] = null; el.remove(); reject(new Error('load failed')); };
      document.head.appendChild(el);
    });
    return loading[id];
  }
  const topicOf = (D, id) => D.TOPICS.filter(t => t.id === id)[0];

  /* ---------- прогрес: найкращий результат вправ у кожній темі ---------- */
  const prog = () => C().store.practice || (C().store.practice = {});
  function saveBest(key, mode, pct) {
    const p = prog();
    const rec = p[key] || (p[key] = {});
    if (!(rec[mode] >= pct)) { rec[mode] = pct; C().save(); }
  }
  const bestOf = key => { const r = prog()[key] || {}; return Math.max(r.choose || 0, r.write || 0); };

  /* ============================ МАРШРУТ ============================ */
  function route(view, parts) {
    if (!parts[1]) return hub(view);
    const pack = packOf(parts[1]);
    if (!pack) return C().notFound(view);
    const draw = () => {
      const D = loaded[pack.id];
      const sub = parts[2], tab = parts[3];
      if (!sub) return packPage(view, pack, D);
      if (sub === 'scenes') {
        if (parts.length > 4 || (tab && tab !== 'all')) return C().notFound(view);
        return scenesPage(view, pack, D, tab === 'all');
      }
      if (sub === 'mix') return parts.length > 3 ? C().notFound(view) : mixPage(view, pack, D);
      const topic = topicOf(D, sub);
      const t = tab || 'guide';
      if (!topic || parts.length > 4 || !TABS.some(x => x[0] === t)) return C().notFound(view);
      topicPage(view, pack, D, topic, t);
    };
    if (data(pack.id)) return draw();
    view.innerHTML = '<div class="rd-loading"><div class="rd-book-anim"><span></span><span></span><span></span></div>' +
      '<h2>Готуємо практику…</h2><p>' + esc(pack.title) + '</p></div>';
    ensure(pack.id).then(() => {
      const cur = location.hash.replace(/^#\//, '').split('/').filter(Boolean);
      if (cur[0] !== 'practice' || cur[1] !== pack.id) return;
      draw();
    }).catch(() => {
      view.innerHTML = '<div class="page-head"><span class="emoji-big">📡</span><h1>Не вдалося завантажити тему</h1>' +
        '<p>Перевір зʼєднання й спробуй ще раз.</p></div><button class="btn btn-primary" id="pc-retry">🔁 Спробувати ще раз</button>';
      const b = $('pc-retry');
      if (b) b.addEventListener('click', () => route(view, parts));
    });
  }

  /* ============================ ХАБ РОЗДІЛУ ============================ */
  function hub(view) {
    C().setCrumbs([{ label: SECTION }]);
    view.innerHTML =
      '<div class="page-head"><span class="emoji-big">🏋️</span><h1>' + SECTION + '</h1>' +
      '<p>Вузькі теми, які треба «набити» до автоматизму: правила коротко, багато живих речень, картинки, вибір варіанта й самостійне введення.</p></div>' +
      '<div class="zone-grid">' + PACKS.map(p => {
        const done = p.topics.filter(t => bestOf(p.id + '/' + t[0]) >= 80).length;
        return '<a class="card clickable zone-card pc-pack-card" href="#/practice/' + p.id + '"><div class="zone-icon">' + p.emoji + '</div>' +
          '<h3>' + esc(p.title) + '</h3><div class="ph-hub-uk" lang="en">' + esc(p.short) + '</div><p>' + esc(p.desc) + '</p>' +
          C().progressBar(done / p.topics.length) +
          '<div class="progress-label"><span>' + p.counts.topics + ' тем · ' + p.counts.items + ' речень · ' + p.counts.scenes + ' картинок</span>' +
          '<span>' + done + '/' + p.topics.length + '</span></div></a>';
      }).join('') + '</div>';
  }

  /* ============================ СТОРІНКА ПАКЕТА ============================ */
  function packPage(view, pack, D) {
    C().setCrumbs([{ label: SECTION, hash: '#/practice' }, { label: pack.title }]);
    const total = D.TOPICS.reduce((n, t) => n + t.items.length, 0);
    view.innerHTML =
      '<div class="ph-root"><a class="back-link" href="#/practice">← ' + SECTION + '</a>' +
      '<div class="ph-hero"><div class="ph-hero-emoji">' + pack.emoji + '</div><div class="ph-hero-main"><h1>' + esc(pack.title) + '</h1>' +
      '<p>' + esc(D.META.lead) + '</p><div class="ph-hero-stats"><span>📚 <b>' + D.TOPICS.length + '</b> тем</span>' +
      '<span>✏️ <b>' + total + '</b> речень</span><span>🖼️ <b>' + D.SCENES.length + '</b> картинок</span></div></div></div>' +
      '<div class="zone-grid pc-quick">' +
      '<a class="card clickable zone-card" href="#/practice/' + pack.id + '/scenes"><div class="zone-icon">🖼️</div><h3>Що на картинці</h3>' +
      '<p>Бачиш, де кулька або куди вона котиться, — обираєш прийменник. Найшвидший спосіб відчути різницю across / through / over.</p>' +
      '<span class="btn btn-ghost ph-hub-btn">' + D.SCENES.length + ' картинок →</span></a>' +
      '<a class="card clickable zone-card" href="#/practice/' + pack.id + '/mix"><div class="zone-icon">🏆</div><h3>Мікс усієї теми</h3>' +
      '<p>15 питань із усіх підтем упереміш — речення й картинки. Перевірка, що все склалося в голові.</p>' +
      '<span class="btn btn-ghost ph-hub-btn">15 питань →</span></a></div>' +
      D.GROUPS.map(g =>
        '<h2 class="section-title">' + g.emoji + ' ' + esc(g.title) + ' <span class="g-count">' + g.items.length + '</span></h2>' +
        '<div class="zone-grid">' + g.items.map(id => {
          const t = topicOf(D, id), best = bestOf(pack.id + '/' + id);
          return '<a class="card clickable zone-card ph-hub-card" href="#/practice/' + pack.id + '/' + id + '"><div class="zone-icon">' + t.emoji + '</div>' +
            '<h3>' + esc(t.title) + ' <span class="ph-lvl lvl-' + t.level + '">' + t.level + '</span></h3><div class="ph-hub-uk" lang="en">' + esc(t.uk) + '</div>' +
            '<p>' + esc(t.lead) + '</p>' + C().progressBar(best / 100) +
            '<div class="progress-label"><span>' + t.items.length + ' речень</span><span>' + (best ? 'найкраще ' + best + '%' : 'ще не пробував') + '</span></div></a>';
        }).join('') + '</div>'
      ).join('') +
      (pack.grammar ? '<div class="card pr-note">📗 Коротка теорія є і в граматиці: ' +
        pack.grammar.map(g => '<a href="' + g[0] + '">' + esc(g[1]) + '</a>').join(' · ') + '.</div>' : '') +
      '</div>';
  }

  /* ============================ СТОРІНКА ТЕМИ ============================ */
  function topicPage(view, pack, D, topic, tab) {
    C().setCrumbs([{ label: SECTION, hash: '#/practice' }, { label: pack.title, hash: '#/practice/' + pack.id },
      { label: topic.title, hash: '#/practice/' + pack.id + '/' + topic.id }, { label: TABS.filter(t => t[0] === tab)[0][1].replace(/^\S+\s/, '') }]);
    const base = '#/practice/' + pack.id + '/' + topic.id;
    view.innerHTML = '<div class="ph-root"><a class="back-link" href="#/practice/' + pack.id + '">← ' + esc(pack.title) + '</a>' +
      '<div class="ph-hero"><div class="ph-hero-emoji">' + topic.emoji + '</div>' +
      '<div class="ph-hero-main"><h1>' + esc(topic.title) + '</h1><p>' + esc(topic.lead) + '</p>' +
      '<div class="ph-hero-stats"><span>✏️ <b>' + topic.items.length + '</b> речень</span>' +
      '<span class="ph-lvl lvl-' + topic.level + '">' + topic.level + '</span><span lang="en">' + esc(topic.uk) + '</span></div></div></div>' +
      '<div class="tabs ph-tabs">' + TABS.map(([id, label]) =>
        '<a class="tab' + (id === tab ? ' active' : '') + '" href="' + base + (id === 'guide' ? '' : '/' + id) + '">' + label + '</a>').join('') + '</div>' +
      '<div id="pc-panel" class="ph-panel"></div></div>';
    const panel = $('pc-panel');
    panel.addEventListener('click', e => {
      const b = e.target.closest('[data-say]');
      if (b) { e.stopPropagation(); say(b.dataset.say, b); }
    });
    const key = pack.id + '/' + topic.id;
    if (tab === 'guide') guidePanel(panel, topic, base);
    else if (tab === 'list') listPanel(panel, topic);
    else if (tab === 'cards') cardsPanel(panel, topic, key);
    else if (tab === 'choose') quiz(panel, key, 'choose', () => pick(topic.items, 12).map(it => chooseQ(it, topic)));
    else writeQuiz(panel, key, topic);
  }

  /* ---------- допоміжне ---------- */
  const sayBtn = (text, label) => '<button class="ph-say sm" data-say="' + esc(text) + '">' + (label || '🔊') + '</button>';
  const filled = it => it.en.replace('___', it.a);
  /* речення з підсвіченою відповіддю (HTML) */
  const filledHtml = (it, word) => esc(it.en).replace('___', '<span class="pc-fill">' + esc(word || it.a) + '</span>');
  const gapHtml = it => esc(it.en).replace('___', '<span class="pc-gap">_____</span>');

  /* ============================ ГАЙД ============================ */
  function guidePanel(panel, topic, base) {
    panel.innerHTML = '<div class="ph-guide">' + topic.intro + '</div>' +
      '<h2 class="section-title">📐 Правила з прикладами</h2>' +
      '<div class="pr-rules">' + topic.rules.map(r =>
        '<div class="card pr-rule"><h4>' + esc(r.t) + '</h4><p>' + esc(r.d) + '</p>' +
        (r.ex || []).map(e => '<div class="pr-rule-ex"><b lang="en">' + esc(e[0]) + '</b>' + sayBtn(e[0]) + '<span>' + esc(e[1]) + '</span></div>').join('') +
        '</div>').join('') + '</div>' +
      (topic.dialogs ? '<h2 class="section-title">🗨️ Як це звучить у розмові</h2><div class="pc-dialogs">' + topic.dialogs.map(d =>
        '<div class="card pc-dialog"><h4>' + esc(d.title) + '</h4>' + d.lines.map(l =>
          '<div class="pc-line pc-' + (l[0] === 'A' ? 'a' : 'b') + '"><span class="pc-who">' + l[0] + '</span><div><span lang="en">' + esc(l[1]) + '</span>' + sayBtn(l[1]) +
          '<div class="ph-word-uk">' + esc(l[2]) + '</div></div></div>').join('') + '</div>').join('') + '</div>' : '') +
      '<div class="card pr-note">✏️ Далі: <a href="' + base + '/list">переглянь речення</a>, погортай <a href="' + base + '/cards">картки</a>, ' +
      'а потім перевір себе — <a href="' + base + '/choose">обери варіант</a> або <a href="' + base + '/write">впиши сам</a>.</div>';
  }

  /* ============================ СПИСОК ============================ */
  function listPanel(panel, topic) {
    panel.innerHTML = '<div class="ph-hint">🔊 Клацни, щоб почути речення. Підсвічене — саме те слово, яке тренуємо.</div>' +
      '<div class="pr-list">' + topic.items.map(it =>
        '<div class="card pr-item"><div class="pr-head"><span class="pc-sent" lang="en">' + filledHtml(it) + '</span>' + sayBtn(filled(it)) + '</div>' +
        '<div class="ph-word-uk">🇺🇦 ' + esc(it.uk) + '</div>' +
        (it.alt.length ? '<div class="pr-rule-line">також правильно: <span lang="en">' + it.alt.map(esc).join(' · ') + '</span></div>' : '') +
        (it.n ? '<div class="ph-tip">💡 ' + esc(it.n) + '</div>' : '') + '</div>').join('') + '</div>';
  }

  /* ============================ КАРТКИ ============================ */
  function cardsPanel(panel, topic, key) {
    const S = st(key).fc;
    let deck = shuffle(topic.items);
    panel.innerHTML =
      '<div class="ph-hint">🃏 На лицьовому боці — думка українською. Скажи її англійською вголос, а тоді переверни картку.</div>' +
      '<div class="fc-stats"><span class="stat-k">✓ Знаю: <b id="pc-k">0</b></span><span class="stat-u">✗ Ще ні: <b id="pc-u">0</b></span><span class="stat-r">⏳ Лишилось: <b id="pc-r">0</b></span></div>' +
      '<div class="ph-card-wrap"><div class="ph-card" id="pc-card"><div class="ph-card-inner">' +
      '<div class="ph-face ph-front" id="pc-front"></div><div class="ph-face ph-back" id="pc-back"></div></div></div></div>' +
      '<div class="ph-card-counter" id="pc-counter"></div>' +
      '<div class="fc-nav"><button class="fc-btn" data-fc="prev">← Попередня</button><button class="fc-btn unknown" data-fc="unknown">✗ Ще ні</button>' +
      '<button class="fc-btn known" data-fc="known">✓ Знаю</button><button class="fc-btn" data-fc="next">Далі →</button></div>' +
      '<div class="fc-nav"><button class="fc-btn" data-fc="shuffle">🔀 Перемішати</button><button class="fc-btn" data-fc="reset">🔄 Скинути</button></div>';

    const idOf = it => topic.items.indexOf(it);
    const render = () => {
      if (S.idx >= deck.length) S.idx = 0;
      const it = deck[S.idx];
      let k = 0, u = 0;
      deck.forEach(x => { const s = S.status[idOf(x)]; if (s === 'known') k++; else if (s === 'unknown') u++; });
      $('pc-k').textContent = k; $('pc-u').textContent = u; $('pc-r').textContent = deck.length - k - u;
      $('pc-front').innerHTML = '<div class="ph-card-cat">як сказати англійською?</div><div class="pc-card-uk">' + esc(it.uk) + '</div>' +
        '<div class="pc-card-gap" lang="en">' + gapHtml(it) + '</div><div class="ph-card-hint">клацни, щоб перевірити</div>';
      $('pc-back').innerHTML = '<div class="pc-card-en" lang="en">' + filledHtml(it) + '</div>' + sayBtn(filled(it), '🔊 Послухати') +
        (it.n ? '<div class="ph-tip">💡 ' + esc(it.n) + '</div>' : '');
      $('pc-card').classList.toggle('flipped', S.flipped);
      $('pc-counter').innerHTML = 'Картка <b>' + (S.idx + 1) + '</b> / <b>' + deck.length + '</b>';
    };
    const move = d => { S.idx = (S.idx + d + deck.length) % deck.length; S.flipped = false; render(); };
    $('pc-card').addEventListener('click', e => {
      if (e.target.closest('[data-say]')) return;
      S.flipped = !S.flipped; $('pc-card').classList.toggle('flipped', S.flipped);
    });
    panel.addEventListener('click', e => {
      const b = e.target.closest('[data-fc]');
      if (!b) return;
      const a = b.dataset.fc;
      if (a === 'prev') move(-1);
      else if (a === 'next') move(1);
      else if (a === 'known' || a === 'unknown') { S.status[idOf(deck[S.idx])] = a; if (a === 'known') C().addXp(2); render(); setTimeout(() => move(1), 200); }
      else if (a === 'shuffle') { deck = shuffle(deck); S.idx = 0; S.flipped = false; render(); }
      else if (a === 'reset') { S.status = {}; S.idx = 0; S.flipped = false; render(); }
    });
    render();
  }

  /* ============================ ПИТАННЯ ============================ */
  function chooseQ(it, topic) {
    return {
      badge: topic.emoji + ' ' + topic.title,
      prompt: '<div class="ph-hint">🎯 Яке слово пропущено?</div><div class="pc-q-sent" lang="en">' + gapHtml(it) + '</div>' +
        '<div class="ph-sub">🇺🇦 ' + esc(it.uk) + '</div>',
      options: shuffle([it.a].concat(it.w)), ok: it.a,
      explain: explainOf(it)
    };
  }
  const explainOf = (it, word) => '<div class="pc-fb-sent" lang="en">' + filledHtml(it, word) + ' ' + sayBtn(filled(it)) + '</div>' +
    (it.alt.length ? '<div class="ph-extra">також правильно: ' + it.alt.map(esc).join(' · ') + '</div>' : '') +
    (it.n ? '<div class="ph-extra">💡 ' + esc(it.n) + '</div>' : '');

  function sceneQ(sc) {
    return {
      badge: sc.kind === 'move' ? '🖼️ Рух' : '🖼️ Місце',
      prompt: '<div class="ph-hint">🖼️ ' + esc(sc.q || (sc.kind === 'move' ? 'Як рухається червона кулька?' : 'Де червона кулька?')) + '</div>' +
        '<div class="pc-scene">' + sc.svg + '</div>',
      options: shuffle([sc.a].concat(sc.w)), ok: sc.a,
      explain: '<div class="pc-fb-sent" lang="en">' + esc(sc.en).replace(new RegExp('\\b' + sc.a.replace(/ /g, '\\s') + '\\b'), '<span class="pc-fill">' + esc(sc.a) + '</span>') +
        ' ' + sayBtn(sc.en) + '</div><div class="ph-extra">🇺🇦 ' + esc(sc.uk) + '</div>'
    };
  }

  /* ============================ ВІКТОРИНА (вибір) ============================ */
  function quiz(panel, key, mode, build) {
    const S = st(key).quiz;
    let q = S[mode];
    const box = document.createElement('div');
    box.className = 'ph-quiz card';
    panel.appendChild(box);
    box.addEventListener('click', e => {
      const b = e.target.closest('[data-say]');
      if (b) { e.stopPropagation(); say(b.dataset.say, b); }
    });

    const restart = () => { S[mode] = q = { qs: build(), idx: 0, score: 0, answered: false }; draw(); };
    if (!q) return restart();

    function draw() {
      if (q.idx >= q.qs.length) return finalScreen(box, q.score, q.qs.length, key, mode, restart);
      const r = q.qs[q.idx];
      box.innerHTML =
        '<div class="ph-q-head"><div class="progress"><i style="width:' + Math.round(q.idx / q.qs.length * 100) + '%"></i></div>' +
        '<div class="ph-q-stats"><span>Питання ' + (q.idx + 1) + ' / ' + q.qs.length + '</span><span class="tag">' + esc(r.badge) + '</span>' +
        '<span class="ph-q-score">✓ ' + q.score + '</span></div></div>' +
        '<div class="ph-q-prompt">' + r.prompt + '</div>' +
        '<div class="opts">' + r.options.map((o, i) =>
          '<button class="opt" data-i="' + i + '"><span class="opt-key">' + String.fromCharCode(65 + i) + '</span><span lang="en">' + esc(o) + '</span></button>').join('') +
        '</div><div id="pc-fb"></div>';
      q.answered = false;
      box.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
        if (q.answered) return;
        q.answered = true;
        const ok = r.options[+btn.dataset.i] === r.ok;
        box.querySelectorAll('.opt').forEach((b, i) => {
          b.disabled = true;
          if (r.options[i] === r.ok) b.classList.add('correct');
          else if (b === btn) b.classList.add('wrong');
          else b.classList.add('dim');
        });
        if (ok) { q.score++; C().addXp(XP_PER_OK); }
        feedback(ok, r.explain, q.idx + 1 < q.qs.length, () => { q.idx++; draw(); });
      }));
    }
    draw();
  }

  function feedback(ok, html, more, next) {
    $('pc-fb').innerHTML = '<div class="feedback ' + (ok ? 'good' : 'bad') + '" role="status" aria-live="polite">' +
      '<span class="fb-icon">' + (ok ? '✅' : '❌') + '</span><div>' + html + '</div></div>' +
      '<div class="session-foot"><button class="btn btn-primary" data-next>' + (more ? 'Далі →' : 'Результат 🏁') + '</button></div>';
    const nb = $('pc-fb').querySelector('[data-next]');
    nb.addEventListener('click', next);
    if (nb.focus) nb.focus();
  }

  function finalScreen(box, score, total, key, mode, restart) {
    const pct = Math.round(score / total * 100);
    const msg = pct === 100 ? ['🏆', 'Бездоганно!'] : pct >= 80 ? ['🌟', 'Відмінно!'] : pct >= 60 ? ['👏', 'Добре!'] : ['📚', 'Переглянь речення й спробуй ще раз'];
    if (mode === 'choose' || mode === 'write') saveBest(key, mode, pct);
    if (pct === 100) { C().store.perfect++; C().save(); }
    C().touchStreak();
    box.innerHTML = '<div class="ph-final"><div class="ph-final-emoji">' + msg[0] + '</div>' +
      '<div class="ph-final-score">' + score + ' / ' + total + '</div>' +
      '<div class="ph-final-pct">' + pct + '% правильних</div><h2>' + msg[1] + '</h2>' +
      '<button class="btn btn-primary" data-restart>🔄 Ще раз</button></div>';
    box.querySelector('[data-restart]').addEventListener('click', restart);
  }

  /* ============================ НАПИШИ САМ ============================ */
  const clean = s => C().norm(s).replace(/[—–-]/g, ' ').replace(/\s+/g, ' ').trim();
  /* правильна відповідь чи прийнятний варіант; для довгих слів прощаємо одну описку,
     але не тоді, коли набране — це інший прийменник зі списку (on ≠ in) */
  function checkTyped(it, typed) {
    const t = clean(typed);
    if (!t) return { ok: false, empty: true };
    const good = [it.a].concat(it.alt);
    const hit = good.filter(g => clean(g) === t)[0];
    if (hit) return { ok: true, word: hit, exact: hit === it.a };
    if (it.w.some(w => clean(w) === t)) return { ok: false };
    const near = good.filter(g => clean(g).length >= 5 && C().oneTypo(clean(g), t))[0];
    return near ? { ok: true, word: near, typo: true } : { ok: false };
  }

  function writeQuiz(panel, key, topic) {
    const S = st(key).quiz;
    let q = S.write;
    const box = document.createElement('div');
    box.className = 'ph-quiz card';
    panel.appendChild(box);
    box.addEventListener('click', e => {
      const b = e.target.closest('[data-say]');
      if (b) { e.stopPropagation(); say(b.dataset.say, b); }
    });
    const restart = () => { S.write = q = { items: pick(topic.items, 10), idx: 0, score: 0, hints: 0 }; draw(); };
    if (!q) return restart();

    function draw() {
      if (q.idx >= q.items.length) return finalScreen(box, q.score, q.items.length, key, 'write', restart);
      const it = q.items[q.idx];
      const parts = esc(it.en).split('___');
      q.hints = 0;
      box.innerHTML =
        '<div class="ph-q-head"><div class="progress"><i style="width:' + Math.round(q.idx / q.items.length * 100) + '%"></i></div>' +
        '<div class="ph-q-stats"><span>Речення ' + (q.idx + 1) + ' / ' + q.items.length + '</span><span class="tag">✍️ Напиши сам</span>' +
        '<span class="ph-q-score">✓ ' + q.score + '</span></div></div>' +
        '<div class="ph-q-prompt"><div class="ph-hint">✍️ Впиши пропущене слово (або кілька слів)</div>' +
        '<div class="ph-sub pc-w-uk">🇺🇦 ' + esc(it.uk) + '</div>' +
        '<div class="pc-q-sent pc-w-sent" lang="en">' + parts[0] +
        '<input class="text-input pc-inline" id="pc-in" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Пропущене слово" size="' + Math.max(6, it.a.length + 2) + '">' +
        (parts[1] || '') + '</div></div>' +
        '<div class="pc-w-actions"><button class="btn btn-primary" id="pc-check">Перевірити</button>' +
        '<button class="btn btn-ghost" id="pc-hint">💡 Підказка</button><button class="btn btn-ghost" id="pc-skip">🤷 Не знаю</button></div>' +
        '<div id="pc-hint-line" class="ph-hint"></div><div id="pc-fb"></div>';
      const inp = $('pc-in');
      let done = false;
      const finish = (ok, html) => {
        done = true;
        inp.disabled = true;
        inp.classList.add(ok ? 'good' : 'bad');
        ['pc-check', 'pc-hint', 'pc-skip'].forEach(id => { $(id).disabled = true; });
        feedback(ok, html, q.idx + 1 < q.items.length, () => { q.idx++; draw(); });
      };
      const check = () => {
        if (done) return;
        const r = checkTyped(it, inp.value);
        if (r.empty) { inp.focus(); return; }
        if (r.ok) {
          q.score++;
          C().addXp(q.hints ? XP_HINTED : XP_PER_OK);
          finish(true, (r.typo ? '<div class="ph-extra">✏️ Майже: пишеться <b class="pc-inline-b">' + esc(r.word) + '</b></div>' : '') +
            (!r.exact && !r.typo ? '<div class="ph-extra">👍 Теж правильно. Найчастіше кажуть: ' + esc(it.a) + '</div>' : '') + explainOf(it, r.word));
        } else {
          finish(false, '<div class="ph-extra">Твоя відповідь: <s>' + esc(inp.value.trim()) + '</s></div>' + explainOf(it));
        }
      };
      $('pc-check').addEventListener('click', check);
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); check(); } });
      $('pc-hint').addEventListener('click', () => {
        q.hints++;
        const a = it.a;
        const shown = q.hints === 1 ? a[0] + '…' : q.hints === 2 ? a.slice(0, Math.ceil(a.length / 2)) + '…' : null;
        if (!shown) {
          $('pc-hint-line').innerHTML = '🎯 Один із цих: <b lang="en">' + shuffle([a].concat(it.w)).map(esc).join(' · ') + '</b>';
          $('pc-hint').disabled = true;
        } else {
          $('pc-hint-line').innerHTML = '💡 Починається на <b lang="en">' + esc(shown) + '</b>' + (a.indexOf(' ') > 0 ? ' · слів: ' + a.split(' ').length : '');
        }
        inp.focus();
      });
      $('pc-skip').addEventListener('click', () => { if (!done) finish(false, explainOf(it)); });
      if (inp.focus) inp.focus();
    }
    draw();
  }

  /* ============================ КАРТИНКИ ============================ */
  function scenesPage(view, pack, D, gallery) {
    C().setCrumbs([{ label: SECTION, hash: '#/practice' }, { label: pack.title, hash: '#/practice/' + pack.id }, { label: 'Що на картинці' }]);
    const base = '#/practice/' + pack.id + '/scenes';
    view.innerHTML = '<div class="ph-root"><a class="back-link" href="#/practice/' + pack.id + '">← ' + esc(pack.title) + '</a>' +
      '<div class="ph-hero"><div class="ph-hero-emoji">🖼️</div><div class="ph-hero-main"><h1>Що на картинці</h1>' +
      '<p>Червона кулька стоїть десь або кудись котиться. Пунктир — її шлях. Назви, що відбувається, одним прийменником.</p>' +
      '<div class="ph-hero-stats"><span>📍 <b>' + D.SCENES.filter(s => s.kind === 'place').length + '</b> «де»</span>' +
      '<span>🚶 <b>' + D.SCENES.filter(s => s.kind === 'move').length + '</b> «куди / як»</span></div></div></div>' +
      '<div class="tabs ph-tabs"><a class="tab' + (gallery ? '' : ' active') + '" href="' + base + '">🎯 Вправа</a>' +
      '<a class="tab' + (gallery ? ' active' : '') + '" href="' + base + '/all">🗂️ Усі картинки</a></div>' +
      '<div id="pc-panel" class="ph-panel"></div></div>';
    const panel = $('pc-panel');
    if (!gallery) return quiz(panel, pack.id + '/scenes', 'scenes', () => pick(D.SCENES, 12).map(sceneQ));
    panel.innerHTML = [['place', '📍 Де це'], ['move', '🚶 Куди і як']].map(([kind, title]) =>
      '<h2 class="section-title">' + title + '</h2><div class="pc-gallery">' + D.SCENES.filter(s => s.kind === kind).map(sc =>
        '<div class="card pc-tile"><div class="pc-scene sm">' + sc.svg + '</div>' +
        '<div class="pc-tile-word" lang="en">' + esc(sc.a) + '</div><div class="pc-tile-en" lang="en">' + esc(sc.en) + ' ' + sayBtn(sc.en) + '</div>' +
        '<div class="ph-word-uk">' + esc(sc.uk) + '</div></div>').join('') + '</div>').join('');
    panel.addEventListener('click', e => {
      const b = e.target.closest('[data-say]');
      if (b) { e.stopPropagation(); say(b.dataset.say, b); }
    });
  }

  /* ============================ МІКС ============================ */
  function mixPage(view, pack, D) {
    C().setCrumbs([{ label: SECTION, hash: '#/practice' }, { label: pack.title, hash: '#/practice/' + pack.id }, { label: 'Мікс' }]);
    view.innerHTML = '<div class="ph-root"><a class="back-link" href="#/practice/' + pack.id + '">← ' + esc(pack.title) + '</a>' +
      '<div class="ph-hero"><div class="ph-hero-emoji">🏆</div><div class="ph-hero-main"><h1>Мікс: ' + esc(pack.title) + '</h1>' +
      '<p>15 питань з усіх підтем і картинок упереміш.</p></div></div><div id="pc-panel" class="ph-panel"></div></div>';
    quiz($('pc-panel'), pack.id + '/mix', 'mix', () => {
      const pool = [];
      D.TOPICS.forEach(t => t.items.forEach(it => pool.push(() => chooseQ(it, t))));
      const qs = pick(pool, 11).map(f => f()).concat(pick(D.SCENES, 4).map(sceneQ));
      return shuffle(qs);
    });
  }

  /* ---------- питання для «Виклику»: лише текстові, по одному з кожної теми ---------- */
  function challengePool() {
    const out = [];
    PACKS.forEach(p => {
      const D = data(p.id);
      if (!D) return;
      D.TOPICS.forEach(t => pick(t.items, 1).forEach(it => {
        const opts = shuffle([it.a].concat(it.w));
        out.push({
          type: 'choice', q: it.en.replace('___', '_____') + ' (' + it.uk + ')', options: opts, answer: opts.indexOf(it.a),
          explain: filled(it) + (it.n ? ' — ' + it.n : ''), tag: p.emoji + ' ' + t.title
        });
      }));
    });
    return out;
  }

  /* ============================ ЕКСПОРТ ============================ */
  window.FLPractice = {
    route, SECTION, PACKS, ensure, challengePool, checkTyped,
    summary: () => {
      const topics = PACKS.reduce((n, p) => n + p.topics.length, 0);
      const done = PACKS.reduce((n, p) => n + p.topics.filter(t => bestOf(p.id + '/' + t[0]) >= 80).length, 0);
      return { packs: PACKS.length, topics, done, items: PACKS.reduce((n, p) => n + p.counts.items, 0) };
    },
    navGroups: () => PACKS.map(p => ({
      id: 'pc-' + p.id, emoji: p.emoji, title: p.title,
      items: p.topics.map(t => ({ hash: '#/practice/' + p.id + '/' + t[0], label: t[2], emoji: t[1] }))
        .concat([{ hash: '#/practice/' + p.id + '/scenes', label: 'Що на картинці', emoji: '🖼️' }, { hash: '#/practice/' + p.id + '/mix', label: 'Мікс', emoji: '🏆' }])
    }))
  };
})();
