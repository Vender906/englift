/* ============================================================
   EngLift — розділ «Вимова»: американські звуки, скорочення,
   наголос, числа й дати вголос, слова-пастки й мінімальні пари.
   Дані (js/sound/pron-data.js) вантажаться лише тут.
   ============================================================ */
(function () {
  'use strict';

  const SECTION = 'Вимова';
  const SRC = 'js/sound/pron-data.js';
  const XP_PER_OK = 5;
  const C = () => window.FLCore;
  const esc = s => C().esc(s);
  const shuffle = arr => C().shuffle(arr);
  const pick = (arr, n) => shuffle(arr).slice(0, n);
  const $ = id => document.getElementById(id);
  const say = (text, btn, rate) => C().speakLang(String(text).replace(/[«»]/g, ''), 'en-US', rate || 0.9, btn);

  const TABS = [['guide', '📖 Як це працює'], ['list', '📋 Список'], ['cards', '🃏 Картки'], ['practice', '🎧 Вправа'], ['mix', '🏆 Мікс']];
  const KIND_LABEL = {
    sound: 'Як це звучить', weak: 'Сильна чи слабка', endings: 'Який звук у кінці',
    stress: 'Де наголос', tricky: 'Як це вимовити', variant: 'Американський варіант', minimal: 'Яке слово',
    say: 'Як це прочитати'
  };

  let DATA = null, loading = null;
  /* дані могли завантажитися й іншим шляхом (тести, прелоад) — підхоплюємо */
  const ready = () => DATA || (window.PRON_DATA ? (DATA = window.PRON_DATA) : null);
  const state = {};
  const st = key => state[key] || (state[key] = { fc: { idx: 0, flipped: false, status: {} }, quiz: {} });

  function ensure() {
    if (ready()) return Promise.resolve(DATA);
    if (loading) return loading;
    loading = new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = SRC;
      el.onload = () => { DATA = window.PRON_DATA; DATA ? resolve(DATA) : reject(new Error('no data')); };
      el.onerror = () => { loading = null; el.remove(); reject(new Error('load failed')); };
      document.head.appendChild(el);
    });
    return loading;
  }
  const topicOf = id => ready() && DATA.TOPICS.filter(t => t.id === id)[0];

  /* ============================ МАРШРУТ ============================ */
  function route(view, parts) {
    const id = parts[1];
    const tab = parts[2] || 'guide';
    if (parts.length > 3 || (parts.length === 3 && !TABS.some(t => t[0] === tab))) return C().notFound(view);
    const draw = () => {
      if (!id) return hub(view);
      const topic = topicOf(id);
      if (!topic) return C().notFound(view);
      C().setCrumbs([{ label: SECTION, hash: '#/sound' }, { label: topic.title, hash: '#/sound/' + id },
        { label: TABS.filter(t => t[0] === tab)[0][1].replace(/^\S+\s/, '') }]);
      view.innerHTML = shell(topic, tab);
      const panel = $('pr-panel');
      if (tab === 'guide') guidePanel(panel, topic);
      else if (tab === 'list') listPanel(panel, topic);
      else if (tab === 'cards') cardsPanel(panel, topic);
      else if (tab === 'practice') quiz(panel, topic, 'practice');
      else quiz(panel, topic, 'mix');
      panel.addEventListener('click', e => {
        const b = e.target.closest('[data-say]');
        if (b) { e.stopPropagation(); say(b.dataset.say, b, b.dataset.rate ? +b.dataset.rate : 0.9); }
      });
    };
    if (ready()) return draw();
    view.innerHTML = '<div class="rd-loading"><div class="rd-book-anim"><span></span><span></span><span></span></div>' +
      '<h2>Готуємо вимову…</h2><p>Звуки, скорочення й вправи на слух</p></div>';
    ensure().then(() => {
      const cur = location.hash.replace(/^#\//, '').split('/').filter(Boolean);
      if (cur[0] !== 'sound') return;
      draw();
    }).catch(() => {
      view.innerHTML = '<div class="page-head"><span class="emoji-big">📡</span><h1>Не вдалося завантажити розділ</h1>' +
        '<p>Перевір зʼєднання й спробуй ще раз.</p></div><button class="btn btn-primary" id="pr-retry">🔁 Спробувати ще раз</button>';
      const b = $('pr-retry');
      if (b) b.addEventListener('click', () => route(view, parts));
    });
  }

  function hub(view) {
    C().setCrumbs([{ label: SECTION }]);
    view.innerHTML =
      '<div class="page-head"><span class="emoji-big">🗣️</span><h1>' + SECTION + '</h1><p>' + DATA.META.lead + '</p></div>' +
      DATA.GROUPS.map(g =>
        '<h2 class="section-title">' + g.emoji + ' ' + esc(g.title) + ' <span class="g-count">' + g.items.length + '</span></h2>' +
        '<div class="zone-grid">' + g.items.map(id => {
          const t = topicOf(id);
          return '<a class="card clickable zone-card ph-hub-card" href="#/sound/' + id + '"><div class="zone-icon">' + t.emoji + '</div>' +
            '<h3>' + esc(t.title) + '</h3><div class="ph-hub-uk">' + esc(t.uk) + '</div><p>' + esc(t.lead) + '</p>' +
            '<span class="btn btn-ghost ph-hub-btn">' + t.items.length + ' позицій →</span></a>';
        }).join('') + '</div>'
      ).join('') +
      '<div class="card pr-note">💡 Усе озвучується: тисни 🔊 біля слова. Для скорочень типу <b>gonna / wanna</b> є окремий тренажер — ' +
      '<a href="#/phrases/chunks/reductions">Chunks → Скорочення</a>.</div>';
  }

  function shell(topic, tab) {
    return '<div class="ph-root"><a class="back-link" href="#/sound">← ' + SECTION + '</a>' +
      '<div class="ph-hero"><div class="ph-hero-emoji">' + topic.emoji + '</div>' +
      '<div class="ph-hero-main"><h1>' + esc(topic.title) + '</h1><p>' + esc(topic.lead) + '</p>' +
      '<div class="ph-hero-stats"><span>📊 <b>' + topic.items.length + '</b> позицій</span>' +
      '<span class="ph-lvl lvl-' + topic.level + '">' + topic.level + '</span>' +
      '<span>🎧 ' + esc(KIND_LABEL[topic.kind]) + '</span></div></div></div>' +
      '<div class="tabs ph-tabs">' + TABS.map(([id, label]) =>
        '<a class="tab' + (id === tab ? ' active' : '') + '" href="#/sound/' + topic.id + (id === 'guide' ? '' : '/' + id) + '">' + label + '</a>').join('') + '</div>' +
      '<div id="pr-panel" class="ph-panel"></div></div>';
  }

  /* ============================ ГАЙД ============================ */
  function guidePanel(panel, topic) {
    panel.innerHTML = '<div class="ph-guide">' + topic.intro + '</div>' +
      '<h2 class="section-title">📐 Правила з прикладами</h2>' +
      '<div class="pr-rules">' + topic.rules.map(r =>
        '<div class="card pr-rule"><h4>' + esc(r.t) + '</h4><p>' + r.d + '</p>' +
        (r.ex || []).map(e => '<div class="pr-rule-ex"><b>' + esc(e[0]) + '</b>' +
          '<button class="ph-say sm" data-say="' + esc(e[0]) + '">🔊</button><span>' + esc(e[1]) + '</span></div>').join('') +
        '</div>').join('') + '</div>' +
      '<div class="card pr-note">🎧 У вкладці «Список» кожну позицію можна прослухати двічі: як пишеться і як звучить насправді.</div>';
  }

  /* ============================ СПИСОК ============================ */
  const sayBtn = (text, label, rate) => '<button class="ph-say sm" data-say="' + esc(text) + '"' + (rate ? ' data-rate="' + rate + '"' : '') + '>' + (label || '🔊') + '</button>';

  function itemRow(topic, it) {
    if (topic.kind === 'minimal') {
      return '<div class="card pr-item pr-pair">' +
        ['a', 'b'].map(k => '<div class="pr-half"><b lang="en">' + esc(it[k].w) + '</b>' + sayBtn(it[k].w) +
          '<div class="pr-ipa">' + esc(it[k].ipa) + '</div><div class="ph-word-uk">🇺🇦 ' + esc(it[k].uk) + '</div></div>').join('<span class="pr-vs">vs</span>') +
        (it.note ? '<div class="ph-tip">💡 ' + esc(it.note) + '</div>' : '') + '</div>';
    }
    if (topic.kind === 'variant') {
      return '<div class="card pr-item"><div class="pr-head"><b lang="en">' + esc(it.en) + '</b>' + sayBtn(it.en) +
        '<span class="ph-word-uk">🇺🇦 ' + esc(it.uk) + '</span></div>' +
        '<div class="pr-two"><div class="pr-us"><span class="pr-flag">🗽 США</span><b>' + esc(it.us) + '</b><span class="pr-ipa">' + esc(it.usIpa) + '</span></div>' +
        '<div class="pr-gb"><span class="pr-flag">☕ Британія</span><b>' + esc(it.gb) + '</b><span class="pr-ipa">' + esc(it.gbIpa) + '</span></div></div>' +
        (it.note ? '<div class="ph-tip">💡 ' + esc(it.note) + '</div>' : '') + '</div>';
    }
    if (topic.kind === 'stress') {
      return '<div class="card pr-item"><div class="pr-head">' +
        '<b lang="en">' + it.syl.map((s, i) => '<span class="' + (i === it.idx ? 'pr-stressed' : 'pr-weak') + '">' + esc(s) + '</span>').join('<span class="pr-dot">·</span>') + '</b>' +
        sayBtn(it.en) + '<span class="ph-word-uk">🇺🇦 ' + esc(it.uk) + '</span></div>' +
        (it.note ? '<div class="ph-tip">💡 ' + esc(it.note) + '</div>' : '') + '</div>';
    }
    if (topic.kind === 'endings') {
      return '<div class="card pr-item"><div class="pr-head"><b lang="en">' + esc(it.en) + '</b>' + sayBtn(it.en) +
        '<span class="pr-cls">' + esc(it.cls) + '</span><span class="ph-word-uk">🇺🇦 ' + esc(it.uk) + '</span></div>' +
        '<div class="pr-rule-line">' + esc(it.base) + ' + ' + (/^\/[tdɪ]/.test(it.cls) ? '-ed' : '-s') + ' · ' + esc(it.rule) + '</div></div>';
    }
    if (topic.kind === 'tricky') {
      return '<div class="card pr-item"><div class="pr-head"><b lang="en">' + esc(it.en) + '</b>' + sayBtn(it.en) +
        '<span class="ph-word-uk">🇺🇦 ' + esc(it.uk) + '</span></div>' +
        '<div class="pr-two"><div class="pr-us"><span class="pr-flag">✅ звучить</span><b>' + esc(it.say) + '</b><span class="pr-ipa">' + esc(it.ipa) + '</span></div>' +
        '<div class="pr-bad"><span class="pr-flag">❌ типова помилка</span><b>' + esc(it.wrong) + '</b></div></div></div>';
    }
    if (topic.kind === 'say') {
      return '<div class="card pr-item"><div class="pr-head"><b class="pr-written" lang="en">' + esc(it.en) + '</b>' +
        '<span class="pr-arrow">→</span><b class="pr-spoken-word">' + esc(it.spoken) + '</b>' + sayBtn(it.spoken, '🔊 Прочитати') +
        '<span class="ph-word-uk">🇺🇦 ' + esc(it.uk) + '</span></div>' +
        (it.alt ? '<div class="pr-rule-line">або: ' + esc(it.alt) + ' ' + sayBtn(it.alt, '🔉') + '</div>' : '') +
        '<div class="pr-ex"><span lang="en">' + esc(it.ex.en) + '</span>' + sayBtn(it.ex.spoken, '🔊') +
        '<div class="pr-spoken">🔉 ' + esc(it.ex.spoken) + '</div><div class="ph-word-uk">🇺🇦 ' + esc(it.ex.uk) + '</div></div>' +
        (it.note ? '<div class="ph-tip">💡 ' + esc(it.note) + '</div>' : '') + '</div>';
    }
    if (topic.kind === 'weak') {
      return '<div class="card pr-item"><div class="pr-head"><b lang="en">' + esc(it.en) + '</b>' + sayBtn(it.en) +
        '<span class="ph-word-uk">🇺🇦 ' + esc(it.uk) + '</span></div>' +
        '<div class="pr-two"><div class="pr-gb"><span class="pr-flag">під наголосом</span><b>' + esc(it.strong) + '</b></div>' +
        '<div class="pr-us"><span class="pr-flag">у потоці мови</span><b>' + esc(it.weak) + '</b></div></div>' +
        '<div class="pr-ex"><span lang="en">' + esc(it.ex.en) + '</span>' + sayBtn(it.ex.en) +
        '<div class="pr-spoken">🔉 ' + esc(it.ex.spoken) + '</div><div class="ph-word-uk">🇺🇦 ' + esc(it.ex.uk) + '</div></div>' +
        (it.note ? '<div class="ph-tip">💡 ' + esc(it.note) + '</div>' : '') + '</div>';
    }
    /* sound */
    return '<div class="card pr-item"><div class="pr-head"><b lang="en">' + esc(it.en) + '</b>' + sayBtn(it.en, '🔊 як пишеться') +
      '<span class="pr-arrow">→</span><b class="pr-spoken-word">' + esc(it.spoken) + '</b>' + sayBtn(it.spoken, '🔉 як звучить', 0.82) +
      '<span class="pr-ipa">' + esc(it.ipa) + '</span></div>' +
      '<div class="ph-word-uk">🇺🇦 ' + esc(it.uk) + '</div>' +
      '<div class="pr-ex"><span lang="en">' + esc(it.ex.en) + '</span>' + sayBtn(it.ex.en) +
      '<div class="pr-spoken">🔉 ' + esc(it.ex.spoken) + '</div><div class="ph-word-uk">🇺🇦 ' + esc(it.ex.uk) + '</div></div>' +
      (it.note ? '<div class="ph-tip">💡 ' + esc(it.note) + '</div>' : '') + '</div>';
  }

  function listPanel(panel, topic) {
    panel.innerHTML = '<div class="ph-hint">🎧 Клацай 🔊, щоб почути. Для звуків є дві кнопки: як слово пишеться і як воно звучить у живій мові.</div>' +
      '<div class="pr-list">' + topic.items.map(it => itemRow(topic, it)).join('') + '</div>';
  }

  /* ============================ КАРТКИ ============================ */
  const faceOf = (topic, it) => {
    if (topic.kind === 'minimal') return { front: it.a.w + ' / ' + it.b.w, back: it.a.w + ' ' + it.a.ipa + ' — ' + it.a.uk + '<br>' + it.b.w + ' ' + it.b.ipa + ' — ' + it.b.uk, say: it.a.w };
    if (topic.kind === 'stress') return { front: it.en, back: it.syl.map((s, i) => i === it.idx ? '<b class="pr-stressed">' + s + '</b>' : s).join('·') + ' — ' + it.uk, say: it.en };
    if (topic.kind === 'endings') return { front: it.en, back: it.cls + ' · ' + it.rule + ' — ' + it.uk, say: it.en };
    if (topic.kind === 'tricky') return { front: it.en, back: it.say + ' ' + it.ipa + ' — ' + it.uk, say: it.en };
    if (topic.kind === 'variant') return { front: it.en, back: '🗽 ' + it.us + ' · ☕ ' + it.gb + ' — ' + it.uk, say: it.en };
    if (topic.kind === 'say') return { front: it.en, back: '🗣️ ' + it.spoken + (it.alt ? '<br><span class="pr-alt">або ' + it.alt + '</span>' : '') + ' — ' + it.uk, say: it.spoken };
    if (topic.kind === 'weak') return { front: it.en, back: 'сильна ' + it.strong + ' · слабка ' + it.weak + ' — ' + it.uk, say: it.ex.en };
    return { front: it.en, back: '🔉 ' + it.spoken + ' ' + it.ipa + ' — ' + it.uk, say: it.spoken };
  };

  function cardsPanel(panel, topic) {
    const S = st(topic.id).fc;
    let deck = shuffle(topic.items);
    panel.innerHTML =
      '<div class="fc-stats"><span class="stat-k">✓ Знаю: <b id="pr-k">0</b></span><span class="stat-u">✗ Ще ні: <b id="pr-u">0</b></span><span class="stat-r">⏳ Лишилось: <b id="pr-r">0</b></span></div>' +
      '<div class="ph-card-wrap"><div class="ph-card" id="pr-card"><div class="ph-card-inner">' +
      '<div class="ph-face ph-front" id="pr-front"></div><div class="ph-face ph-back" id="pr-back"></div></div></div></div>' +
      '<div class="ph-card-counter" id="pr-counter"></div>' +
      '<div class="fc-nav"><button class="fc-btn" data-fc="prev">← Попередня</button><button class="fc-btn unknown" data-fc="unknown">✗ Ще ні</button>' +
      '<button class="fc-btn known" data-fc="known">✓ Знаю</button><button class="fc-btn" data-fc="next">Далі →</button></div>' +
      '<div class="fc-nav"><button class="fc-btn" data-fc="shuffle">🔀 Перемішати</button><button class="fc-btn" data-fc="reset">🔄 Скинути</button></div>';

    /* у деяких темах слово повторюється (record як іменник і як дієслово) — тому ключ за позицією */
    const idOf = it => topic.items.indexOf(it);
    const render = () => {
      if (S.idx >= deck.length) S.idx = 0;
      const it = deck[S.idx], f = faceOf(topic, it);
      let k = 0, u = 0;
      deck.forEach(x => { const s = S.status[idOf(x)]; if (s === 'known') k++; else if (s === 'unknown') u++; });
      $('pr-k').textContent = k; $('pr-u').textContent = u; $('pr-r').textContent = deck.length - k - u;
      $('pr-front').innerHTML = '<div class="ph-card-word" lang="en">' + esc(f.front) + '</div>' +
        sayBtn(f.say, '🔊 Послухати') + '<div class="ph-card-hint">клацни, щоб перевірити</div>';
      $('pr-back').innerHTML = '<div class="ph-card-uk">' + f.back + '</div>';
      $('pr-card').classList.toggle('flipped', S.flipped);
      $('pr-counter').innerHTML = 'Картка <b>' + (S.idx + 1) + '</b> / <b>' + deck.length + '</b>';
    };
    const move = d => { S.idx = (S.idx + d + deck.length) % deck.length; S.flipped = false; render(); };
    $('pr-card').addEventListener('click', e => {
      if (e.target.closest('[data-say]')) return;
      S.flipped = !S.flipped; $('pr-card').classList.toggle('flipped', S.flipped);
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
  function question(topic, it) {
    const others = topic.items.filter(x => x !== it);
    if (topic.kind === 'sound') {
      const opts = shuffle([it.spoken].concat(pick(others, 3).map(x => x.spoken)));
      return {
        badge: '🎧 Як це звучить',
        prompt: '<div class="ph-hint">🎧 Як американець вимовить це насправді?</div><div class="ph-target" lang="en">' + esc(it.en) + '</div>' +
          '<div class="ph-sub">🇺🇦 ' + esc(it.uk) + '</div><div class="pr-listen">' + sayBtn(it.en, '🔊 Послухати слово') + '</div>',
        options: opts, ok: it.spoken,
        explain: '<span class="ph-chip">' + esc(it.en) + ' → ' + esc(it.spoken) + ' ' + esc(it.ipa) + '</span>' +
          '<div class="ph-extra">' + esc(it.ex.en) + ' → 🔉 ' + esc(it.ex.spoken) + '</div>' + sayBtn(it.ex.spoken, '🔉 Послухати', 0.82)
      };
    }
    if (topic.kind === 'say') {
      const opts = shuffle([it.spoken].concat(pick(others, 3).map(x => x.spoken)));
      return {
        badge: '🔢 Як це прочитати',
        prompt: '<div class="ph-hint">🔢 Як це прочитають уголос?</div><div class="ph-target" lang="en">' + esc(it.en) + '</div>' +
          '<div class="ph-sub">🇺🇦 ' + esc(it.uk) + '</div>',
        options: opts, ok: it.spoken, col1: true,
        explain: '<span class="ph-chip">' + esc(it.en) + ' → ' + esc(it.spoken) + '</span>' +
          (it.alt ? '<div class="ph-extra">або: ' + esc(it.alt) + '</div>' : '') +
          '<div class="ph-extra">' + esc(it.ex.en) + ' → 🔉 ' + esc(it.ex.spoken) + '</div>' + sayBtn(it.ex.spoken, '🔉 Послухати')
      };
    }
    if (topic.kind === 'weak') {
      const opts = shuffle([it.weak, it.strong].concat(pick(others, 2).map(x => x.weak)));
      return {
        badge: '🪶 У потоці мови',
        prompt: '<div class="ph-hint">🪶 Як це слово звучить <b>усередині речення</b>, без наголосу?</div>' +
          '<div class="ph-target" lang="en">' + esc(it.en) + '</div><div class="ph-sentence" lang="en">' + esc(it.ex.en) + '</div>' +
          '<div class="pr-listen">' + sayBtn(it.ex.en, '🔊 Послухати речення') + '</div>',
        options: opts, ok: it.weak,
        explain: '<span class="ph-chip">' + esc(it.en) + ': під наголосом ' + esc(it.strong) + ', у потоці ' + esc(it.weak) + '</span>' +
          '<div class="ph-extra">' + esc(it.ex.spoken) + '</div>'
      };
    }
    if (topic.kind === 'endings') {
      const set = /^\/[tdɪ]/.test(it.cls) && it.cls !== '/ɪz/' ? ['/t/', '/d/', '/ɪd/'] : ['/s/', '/z/', '/ɪz/'];
      return {
        badge: '🔚 Звук у кінці',
        prompt: '<div class="ph-hint">🔚 Як звучить закінчення?</div><div class="ph-target" lang="en">' + esc(it.en) + '</div>' +
          '<div class="ph-sub">🇺🇦 ' + esc(it.uk) + '</div><div class="pr-listen">' + sayBtn(it.en, '🔊 Послухати слово') + '</div>',
        options: set, ok: it.cls, col1: false,
        explain: '<span class="ph-chip">' + esc(it.en) + ' → ' + esc(it.cls) + '</span><div class="ph-extra">' + esc(it.rule) + '</div>' + sayBtn(it.en, '🔊 Послухати')
      };
    }
    if (topic.kind === 'stress') {
      return {
        badge: '🥁 Наголос',
        prompt: '<div class="ph-hint">🥁 На який склад падає наголос?</div><div class="ph-target" lang="en">' + esc(it.en) + '</div>' +
          '<div class="ph-sub">🇺🇦 ' + esc(it.uk) + '</div><div class="pr-listen">' + sayBtn(it.en, '🔊 Послухати слово') + '</div>',
        options: it.syl.map(s => s.toLowerCase()), ok: it.syl[it.idx].toLowerCase(),
        explain: '<span class="ph-chip">' + it.syl.map((s, i) => i === it.idx ? '<b class="pr-stressed">' + esc(s.toUpperCase()) + '</b>' : esc(s.toLowerCase())).join('·') + '</span>' +
          (it.note ? '<div class="ph-extra">' + esc(it.note) + '</div>' : '') + sayBtn(it.en, '🔊 Послухати')
      };
    }
    if (topic.kind === 'tricky') {
      const opts = shuffle([it.say, it.wrong].concat(pick(others, 2).map(x => x.wrong)));
      return {
        badge: '🪤 Як вимовити',
        prompt: '<div class="ph-hint">🪤 Як це слово звучить насправді?</div><div class="ph-target" lang="en">' + esc(it.en) + '</div>' +
          '<div class="ph-sub">🇺🇦 ' + esc(it.uk) + '</div><div class="pr-listen">' + sayBtn(it.en, '🔊 Послухати слово') + '</div>',
        options: opts, ok: it.say, col1: true,
        explain: '<span class="ph-chip">' + esc(it.say) + ' ' + esc(it.ipa) + '</span><div class="ph-extra">❌ Не «' + esc(it.wrong) + '»</div>' + sayBtn(it.en, '🔊 Послухати')
      };
    }
    if (topic.kind === 'variant') {
      const opts = shuffle([it.us, it.gb].concat(pick(others, 2).map(x => x.gb)));
      return {
        badge: '🗽 Американський варіант',
        prompt: '<div class="ph-hint">🗽 Як це звучить саме в американській вимові?</div><div class="ph-target" lang="en">' + esc(it.en) + '</div>' +
          '<div class="ph-sub">🇺🇦 ' + esc(it.uk) + '</div><div class="pr-listen">' + sayBtn(it.en, '🔊 Послухати слово') + '</div>',
        options: opts, ok: it.us, col1: true,
        explain: '<span class="ph-chip">🗽 ' + esc(it.us) + ' ' + esc(it.usIpa) + '</span><div class="ph-extra">☕ у британській: ' + esc(it.gb) + ' ' + esc(it.gbIpa) + '</div>' + sayBtn(it.en, '🔊 Послухати')
      };
    }
    /* minimal */
    const first = Math.random() < 0.5 ? it.a : it.b;
    const second = first === it.a ? it.b : it.a;
    return {
      badge: '👂 Яке слово',
      prompt: '<div class="ph-hint">👂 Яке слово має таку вимову й значення?</div><div class="ph-target">' + esc(first.ipa) + '</div>' +
        '<div class="ph-sub">🇺🇦 ' + esc(first.uk) + '</div>',
      options: shuffle([first.w, second.w]), ok: first.w,
      explain: '<span class="ph-chip">' + esc(first.w) + ' ' + esc(first.ipa) + ' — ' + esc(first.uk) + '</span>' +
        '<div class="ph-extra">' + esc(second.w) + ' ' + esc(second.ipa) + ' — ' + esc(second.uk) + (it.note ? ' · ' + esc(it.note) : '') + '</div>' +
        sayBtn(first.w, '🔊 ' + first.w) + sayBtn(second.w, '🔊 ' + second.w)
    };
  }

  /* ============================ ВІКТОРИНА ============================ */
  function quiz(panel, topic, mode) {
    const S = st(topic.id).quiz;
    const size = Math.min(mode === 'mix' ? 15 : 12, topic.items.length);
    let q = S[mode];
    const box = document.createElement('div');
    box.className = 'ph-quiz card';
    panel.appendChild(box);

    const restart = () => { S[mode] = q = { items: pick(topic.items, size), idx: 0, score: 0, answered: false, rendered: null }; draw(); };
    if (!q) return restart();

    function draw() {
      if (q.idx >= q.items.length) {
        const pct = Math.round(q.score / q.items.length * 100);
        const msg = pct === 100 ? ['🏆', 'Бездоганно!'] : pct >= 80 ? ['🌟', 'Відмінно!'] : pct >= 60 ? ['👏', 'Добре!'] : ['📚', 'Послухай ще раз і спробуй знову'];
        C().touchStreak();
        box.innerHTML = '<div class="ph-final"><div class="ph-final-emoji">' + msg[0] + '</div>' +
          '<div class="ph-final-score">' + q.score + ' / ' + q.items.length + '</div>' +
          '<div class="ph-final-pct">' + pct + '% правильних</div><h2>' + msg[1] + '</h2>' +
          '<button class="btn btn-primary" data-restart>🔄 Ще раз</button></div>';
        box.querySelector('[data-restart]').addEventListener('click', restart);
        return;
      }
      const it = q.items[q.idx];
      const r = q.rendered && q.rendered.idx === q.idx ? q.rendered.r : (q.rendered = { idx: q.idx, r: question(topic, it) }).r;
      box.innerHTML =
        '<div class="ph-q-head"><div class="progress"><i style="width:' + Math.round(q.idx / q.items.length * 100) + '%"></i></div>' +
        '<div class="ph-q-stats"><span>Питання ' + (q.idx + 1) + ' / ' + q.items.length + '</span><span class="tag">' + r.badge + '</span>' +
        '<span class="ph-q-score">✓ ' + q.score + '</span></div></div>' +
        '<div class="ph-q-prompt">' + r.prompt + '</div>' +
        '<div class="opts ' + (r.col1 ? 'ph-col1' : '') + '">' + r.options.map((o, i) =>
          '<button class="opt" data-i="' + i + '">' + (r.col1 ? '' : '<span class="opt-key">' + String.fromCharCode(65 + i) + '</span>') +
          '<span lang="en">' + esc(o) + '</span></button>').join('') + '</div><div id="pr-fb"></div>';
      q.answered = false;
      box.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
        if (q.answered) return;
        q.answered = true;
        const val = r.options[+btn.dataset.i], ok = val === r.ok;
        box.querySelectorAll('.opt').forEach((b, i) => {
          b.disabled = true;
          if (r.options[i] === r.ok) b.classList.add('correct');
          else if (b === btn) b.classList.add('wrong');
          else b.classList.add('dim');
        });
        if (ok) { q.score++; C().addXp(XP_PER_OK); }
        $('pr-fb').innerHTML = '<div class="feedback ' + (ok ? 'good' : 'bad') + '" role="status" aria-live="polite">' +
          '<span class="fb-icon">' + (ok ? '✅' : '❌') + '</span><div>' + r.explain + '</div></div>' +
          '<div class="session-foot"><button class="btn btn-primary" data-next>' + (q.idx + 1 < q.items.length ? 'Далі →' : 'Результат 🏁') + '</button></div>';
        const nb = box.querySelector('[data-next]');
        nb.addEventListener('click', () => { q.idx++; draw(); });
        if (nb.focus) nb.focus();
      }));
    }
    draw();
  }

  /* ---------- питання для «Виклику» ---------- */
  function challengePool() {
    if (!ready()) return [];
    const out = [];
    DATA.TOPICS.forEach(topic => {
      pick(topic.items, 2).forEach(it => {
        const r = question(topic, it);
        const opts = r.options.slice();
        out.push({
          type: 'choice',
          q: String(r.prompt).replace(/<div class="pr-listen">[\s\S]*?<\/div>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
          options: opts,
          answer: opts.indexOf(r.ok),
          explain: String(r.explain).replace(/<button[\s\S]*?<\/button>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
          tag: '🗣️ ' + topic.title
        });
      });
    });
    return out.filter(q => q.answer >= 0);
  }

  /* ============================ ЕКСПОРТ ============================ */
  window.FLSound = {
    route, SECTION, ensure, challengePool,
    summary: () => (ready() ? { topics: DATA.TOPICS.length, items: DATA.TOPICS.reduce((n, t) => n + t.items.length, 0) } : { topics: 10, items: 200 }),
    navGroups: () => (ready() ? DATA.GROUPS : NAV_FALLBACK).map(g => ({
      id: g.id, emoji: g.emoji, title: g.title,
      items: g.items.map(id => {
        const t = DATA && topicOf(id);
        return { hash: '#/sound/' + id, label: t ? t.title : NAV_TITLES[id], emoji: t ? t.emoji : NAV_EMOJI[id] };
      })
    }))
  };
  /* меню будується до завантаження даних — тримаємо короткий дубль назв */
  const NAV_FALLBACK = [
    { id: 'pr-sounds', emoji: '🔊', title: 'Звуки в потоці мови', items: ['flap', 'glottal', 'linking', 'weak'] },
    { id: 'pr-rules', emoji: '📐', title: 'Правила читання', items: ['endings', 'stress', 'numbers'] },
    { id: 'pr-traps', emoji: '🪤', title: 'Пастки й відмінності', items: ['tricky', 'variant', 'minimal'] }
  ];
  const NAV_TITLES = { flap: 'Flap T', glottal: 'Проковтнуте T', linking: 'Злиття слів', weak: 'Слабкі форми', endings: 'Закінчення -ed і -s', stress: 'Наголос у слові', numbers: 'Числа, дати, час і гроші', tricky: 'Слова-пастки', variant: 'США проти Британії', minimal: 'Пари звуків' };
  const NAV_EMOJI = { flap: '💧', glottal: '🔇', linking: '🔗', weak: '🪶', endings: '🔚', stress: '🥁', numbers: '🔢', tricky: '🪤', variant: '🗽', minimal: '👂' };
})();
