/* ============================================================
   EngLift — Фрази і конструкції: 8 тренажерів у 4 групах.
   Перенесено з HTML-тренажерів з усіма режимами:
   • transitions: браузер (фільтри рівня й категорії, Royal Order),
     картки з пам’яттю, EN→UA, UA→EN, синоніми, «за функцією»,
     у контексті, підсумковий мікс;
   • discourse / timeseq / constructions / would: гайд, браузер,
     картки, Match Function, Fill Blank, переклад UA→EN, Mix;
   • intensifiers: сила підсилювача, so/such, gradable→extreme, діалоги;
   • choice: питання-відповідь, ситуації, діалоги;
   • polysemy / would: історії з розбором значень.
   Дані (js/phrases/*-data.js) підвантажуються лише тут.
   ============================================================ */
(function () {
  'use strict';

  const TRAINERS = {
    transitions: { emoji: '🔗', short: 'Transition Words', uk: 'Перехідні слова', kind: 'words', src: 'js/phrases/transitions-data.js',
      desc: 'Сполучники й зв’язки: додавання, контраст, причина, наслідок, мета, умова, час, підсумок — з рівнями A1–C1, регістром і потоком думки.' },
    discourse: { emoji: '🎙️', short: 'Discourse Markers', uk: 'Маркери розмови', kind: 'markers', src: 'js/phrases/discourse-data.js',
      desc: 'as for, speaking of, mind you, I mean, at the end of the day — маркери, що роблять мову живою й «нейтивною».' },
    timeseq: { emoji: '📖', short: 'Time & Sequence', uk: 'Маркери оповіді', kind: 'markers', src: 'js/phrases/timeseq-data.js',
      desc: 'the other day, meanwhile, all of a sudden, by the time — каркас будь-якої історії в щоденнику.' },
    constructions: { emoji: '🏛️', short: 'Constructions', uk: 'Конструкції речення', kind: 'markers', src: 'js/phrases/constructions-data.js',
      tabs: ['guide', 'browser', 'cards', 'match', 'fill', 'translate', 'mix'], unit: 'конструкцій', unitCat: 'груп',
      desc: 'used to, be about to, the more… the more, no matter what, in case — каркас дорослого речення для часу, логіки, причини й умови.' },
    intensifiers: { emoji: '🔥', short: 'Intensifiers', uk: 'Підсилювачі', kind: 'markers', src: 'js/phrases/intensifiers-data.js',
      tabs: ['guide', 'browser', 'cards', 'power', 'sosuch', 'grad', 'dialogue', 'mix'], unit: 'підсилювачів', unitCat: 'типів',
      desc: 'a bit → pretty → really → absolutely: 5 рівнів сили, so чи such, і чому «very freezing» — помилка.' },
    choice: { emoji: '🤔', short: 'Choice & Clarification', uk: 'Вибір і уточнення', kind: 'markers', src: 'js/phrases/choice-data.js',
      tabs: ['guide', 'browser', 'cards', 'match', 'qa', 'situation', 'dialogue', 'translate', 'mix'], unit: 'фраз', unitCat: 'функцій',
      desc: 'Which one? — This one. What do you mean? — Кава чи чай? Питання вибору й уточнення для кафе, магазину й роботи.' },
    polysemy: { emoji: '🎲', short: 'Polysemy Verbs', uk: 'Дієслова-універсали', kind: 'markers', src: 'js/phrases/polysemy-data.js',
      tabs: ['guide', 'browser', 'cards', 'meaning', 'pick', 'trchoice', 'story', 'mix'], unit: 'значень', unitCat: 'смислових груп',
      desc: 'GET, TAKE, MAKE, HAVE, GO, PUT, RUN, BREAK: 8 дієслів, які покривають половину побутової мови, — за значеннями.' },
    would: { emoji: '🌀', short: 'WOULD', uk: 'Усі 10 значень', kind: 'markers', src: 'js/phrases/would-data.js',
      tabs: ['guide', 'browser', 'cards', 'match', 'fill', 'translate', 'story', 'mix'], unit: 'моделей', unitCat: 'значень',
      desc: 'Не лише «б би»: ввічливість, звичка в минулому, would rather, would like, непряма мова — 10 значень одного слова.' },
    chunks: { emoji: '🧩', short: 'Chunks', uk: 'Готові фрази', kind: 'markers', src: ['js/phrases/chunks-data.js', 'js/phrases/chunks-extra.js'],
      tabs: ['guide', 'browser', 'cards', 'reductions', 'template', 'recombine', 'sitchunk', 'reply2', 'register', 'story', 'trinput', 'mix'], unit: 'фраз', unitCat: 'тем',
      desc: 'Мова — це блоки, а не окремі слова: щоденні фрази, реакції в розмові, скорочення gonna / wanna / gotta і шаблони «Have you ever ___?».' },
    situational: { emoji: '🗺️', short: 'Situational English', uk: 'Фрази за ситуаціями', kind: 'markers', src: ['js/phrases/situational-data.js', 'js/phrases/situational-extra.js'],
      tabs: ['guide', 'phrasebook', 'browser', 'cards', 'response', 'role', 'missing', 'mix'], unit: 'фраз', unitCat: 'ситуацій',
      desc: 'Кафе, лікар, аеропорт, співбесіда, банк: що кажеш ти, що кажуть тобі — з діалогами й корисними дрібницями.' },
    softeners: { emoji: '🕊️', short: 'Softeners & Hedges', uk: 'Мʼякість і ввічливість', kind: 'markers', src: 'js/phrases/softeners-data.js',
      tabs: ['guide', 'browser', 'cards', 'match', 'level', 'soften', 'fillbank', 'mix'], unit: 'помʼякшувачів', unitCat: 'функцій',
      desc: 'Щоб не звучати грубо: kind of, I was wondering, I’m afraid — і шкала мʼякості від прямого «You’re wrong» до ввічливого.' },
    express: { emoji: '🎤', short: 'Express Yourself', uk: 'Як розповідати й переконувати', kind: 'markers', src: ['js/phrases/express-data.js', 'js/phrases/express-extra.js'],
      tabs: ['guide', 'browser', 'cards', 'match', 'express', 'models', 'tell', 'mix'], unit: 'моделей', unitCat: 'цілей',
      desc: 'Storytelling, думка, пояснення, переконання: готові каркаси, щоб тебе слухали — і зразки живих історій.' },
    collocations: { emoji: '🔗', short: 'Collocations', uk: 'Сталі сполучення', kind: 'markers', src: 'js/phrases/collocations-data.js',
      tabs: ['guide', 'browser', 'cards', 'verbpick', 'mistakes', 'context', 'life', 'mix'], unit: 'сполучень', unitCat: 'дієслів',
      desc: 'do homework, але make a decision: 177 пар «дієслово + іменник», які треба знати цілим шматком, із типовими помилками поруч.' },
    confusing: { emoji: '🔀', short: 'Confusing Pairs', uk: 'Слова, які плутають', kind: 'markers', src: 'js/phrases/confusing-data.js',
      tabs: ['guide', 'browser', 'cards', 'pairchoice', 'rightwrong', 'translate', 'mix'], unit: 'пар', unitCat: 'тем',
      desc: 'say чи tell, lend чи borrow, bored чи boring: 49 пар, що українською звучать однаково, з підказкою-тригером до кожної.' },
    idioms: { emoji: '🎨', short: 'Idioms & Sayings', uk: 'Ідіоми та приказки', kind: 'markers', src: 'js/phrases/idioms-data.js',
      tabs: ['guide', 'browser', 'cards', 'match', 'sitchunk', 'translate', 'mix'], unit: 'ідіом', unitCat: 'тем',
      desc: 'under the weather, call it a day, a blessing in disguise: понад 120 образних виразів і приказок — із поясненням, коли їх справді кажуть.' },
    work: { emoji: '💼', short: 'Work English', uk: 'Робоча англійська', kind: 'markers', src: 'js/phrases/work-data.js',
      tabs: ['guide', 'browser', 'cards', 'match', 'fill', 'sitchunk', 'translate', 'mix'], unit: 'формул', unitCat: 'блоків',
      desc: 'Ділові листи, нагадування, наради й відеодзвінки: від «Please find attached» до «You are on mute» — 80 робочих формул.' },
    academic: { emoji: '🎓', short: 'Academic English', uk: 'Есе та іспити', kind: 'markers', src: 'js/phrases/academic-data.js',
      tabs: ['guide', 'browser', 'cards', 'match', 'fill', 'translate', 'mix'], unit: 'формул', unitCat: 'блоків',
      desc: 'Каркас есе, посилання на дані, обережні твердження й фрази для усного іспиту — академічний регістр замість розмовного.' }
  };
  const GROUPS = [
    { id: 'ph-links', emoji: '🔗', title: 'Звʼязки в тексті', items: ['transitions', 'discourse', 'timeseq'] },
    { id: 'ph-build', emoji: '🏗️', title: 'Конструкції та підсилення', items: ['constructions', 'intensifiers'] },
    { id: 'ph-multi', emoji: '🎭', title: 'Багатозначні слова', items: ['polysemy', 'would'] },
    { id: 'ph-talk', emoji: '💬', title: 'Жива розмова', items: ['chunks', 'situational', 'choice', 'idioms'] },
    { id: 'ph-tone', emoji: '🎩', title: 'Тон і подача', items: ['softeners', 'express'] },
    { id: 'ph-precision', emoji: '🎯', title: 'Точність слова', items: ['collocations', 'confusing'] },
    { id: 'ph-formal', emoji: '💼', title: 'Робота й навчання', items: ['work', 'academic'] }
  ];
  const ORDER = GROUPS.reduce((a, g) => a.concat(g.items), []);
  const WORD_TABS = [['browse', '📚 Браузер'], ['cards', '🃏 Картки'], ['enuk', '🔤 EN → UA'], ['uken', '🔤 UA → EN'], ['syn', '≈ Синоніми'], ['func', '🎯 За функцією'], ['ctx', '📝 У контексті'],
    ['thought', '💭 Продовж думку'], ['reply', '💬 Відповідь у діалозі'], ['nuance', '🔬 Відтінки'], ['speech', '📻 Уривки'], ['mix', '🏆 Підсумок']];
  const TAB_LABEL = {
    guide: '📖 Гайд', browser: '🔍 Браузер', cards: '🃏 Картки', match: '🎯 Match Function',
    fill: '✏️ Fill Blank', translate: '✍️ UA → EN', mix: '🏆 Mix',
    power: '⚡ Сила', sosuch: '🔀 so / such', grad: '📈 Gradable → Extreme', dialogue: '💬 Діалоги',
    qa: '🗣️ Питання → відповідь', situation: '🎭 Ситуації', story: '📚 Історії',
    meaning: '🎯 Яке значення', pick: '🧩 Обери дієслово', trchoice: '🇺🇦 → 🇬🇧 Переклад',
    reductions: '🗜️ Скорочення', template: '🧱 Шаблони', recombine: '🔗 Зліпи фразу', sitchunk: '🎭 Ситуації',
    trinput: '✍️ UA → EN', phrasebook: '📕 Розмовник', response: '↩️ Що відповісти', role: '🙋 Хто це каже',
    missing: '🧩 Пропущене слово', level: '📉 Рівень мʼякості', soften: '🕊️ Помʼякши фразу', fillbank: '✏️ Впиши слово',
    express: '🎤 Обери подачу', models: '📚 Зразки', tell: '🎬 Розкажи історію',
    reply2: '💬 Що відповісти', register: '🎚️ Регістр', verbpick: '🎯 Обери дієслово',
    mistakes: '⚠️ Типові помилки', context: '📝 У контексті', life: '🌍 За сферами життя',
    pairchoice: '🔀 Обери слово', rightwrong: '✅ Правильно чи ні'
  };
  const DEFAULT_MARKER_TABS = ['guide', 'browser', 'cards', 'match', 'fill', 'translate', 'mix'];
  const tabsOf = T => T.kind === 'words' ? WORD_TABS : (T.tabs || DEFAULT_MARKER_TABS).map(id => [id, TAB_LABEL[id]]);
  const XP_PER_OK = 5;
  const REG_LABEL = { casual: '🌸 casual', neutral: '💼 neutral', formal: '🎩 formal' };

  const SECTION = 'Фрази і конструкції';
  const FL = () => window.FL;
  const esc = s => FL().esc(s);
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (arr, n) => shuffle(arr).slice(0, n);
  const lvlBadge = l => l ? '<span class="ph-lvl lvl-' + l + '">' + l + '</span>' : '';
  const regBadge = r => r ? '<span class="ph-reg reg-' + r + '">' + (REG_LABEL[r] || r) + '</span>' : '';
  const renderEx = en => String(en).replace(/<b>/g, '<span class="ph-h">').replace(/<\/b>/g, '</span>');
  const normTr = s => String(s || '').trim().toLowerCase().replace(/[.,!?;:]/g, '').replace(/[’‘ʼ'`]/g, "'").replace(/\s+/g, ' ');
  const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const $ = id => document.getElementById(id);

  const loaded = {}, loading = {};
  const state = {};
  function st(key) {
    return state[key] || (state[key] = { fc: { deck: [], idx: 0, flipped: false, status: {}, lvls: null, cats: null, cat: '', reg: '' }, browse: { lvls: null, cats: null, q: '', cat: '', reg: '', lvl: '' }, quiz: {} });
  }

  function ensure(key) {
    const data = window.PHRASE_DATA && window.PHRASE_DATA[key];
    if (data) { loaded[key] = data; return Promise.resolve(data); }
    if (loading[key]) return loading[key];
    const srcs = [].concat(TRAINERS[key].src);          /* файл даних + необовʼязкові доповнення */
    const one = src => new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => { s.remove(); reject(new Error('load failed: ' + src)); };
      document.head.appendChild(s);
    });
    loading[key] = srcs.reduce((chain, src) => chain.then(() => one(src)), Promise.resolve())
      .then(() => {
        const d = window.PHRASE_DATA && window.PHRASE_DATA[key];
        if (!d) throw new Error('no data');
        loaded[key] = d; return d;
      })
      .catch(e => { loading[key] = null; throw e; });
    return loading[key];
  }

  /* ============================ ROUTES ============================ */
  function route(view, parts) {
    const key = parts[1];
    if (!key) return hub(view);
    const T = TRAINERS[key];
    if (!T || parts.length > 3) return FL().notFound(view);
    const tabs = tabsOf(T);
    const tab = parts[2] || tabs[0][0];
    if (!tabs.some(t => t[0] === tab)) return FL().notFound(view);
    FL().setCrumbs([{ label: SECTION, hash: '#/phrases' }, { label: T.short, hash: '#/phrases/' + key }, { label: tabs.find(t => t[0] === tab)[1].replace(/^\S+\s/, '') }]);
    if (!loaded[key]) view.innerHTML = '<div class="rd-loading"><div class="rd-book-anim"><span></span><span></span><span></span></div><h2>Завантажуємо тренажер…</h2><p>' + esc(T.short) + '</p></div>';
    ensure(key).then(D => {
      const cur = location.hash.replace(/^#\//, '').split('/').filter(Boolean);
      if (cur[0] !== 'phrases' || cur[1] !== key || (cur[2] || tabs[0][0]) !== tab) return;
      view.innerHTML = shell(key, D, tabs, tab);
      const panel = $('ph-panel');
      if (T.kind === 'words') WORDS_MODE[tab](panel, key, D);
      else MARKERS_MODE[tab](panel, key, D);
    }).catch(() => {
      view.innerHTML = '<div class="page-head"><span class="emoji-big">📡</span><h1>Не вдалося завантажити тренажер</h1><p>Перевір з’єднання й спробуй ще раз.</p></div><button class="btn btn-primary" id="ph-retry">🔁 Спробувати ще раз</button>';
      $('ph-retry').addEventListener('click', () => route(view, parts));
    });
  }

  function hub(view) {
    FL().setCrumbs([{ label: SECTION }]);
    view.innerHTML =
      '<div class="page-head"><span class="emoji-big">🗣️</span><h1>' + SECTION + '</h1>' +
      '<p>' + ORDER.length + ' тренажерів про те, як слова тримаються купи: чим зшивати думки, як будувати складне речення, як підсилювати й помʼякшувати, що сказати в кафе чи на співбесіді — і що насправді означають найуніверсальніші слова мови.</p></div>' +
      GROUPS.map(g =>
        '<h2 class="section-title">' + g.emoji + ' ' + esc(g.title) + ' <span class="g-count">' + g.items.length + '</span></h2>' +
        '<div class="zone-grid">' + g.items.map(k => {
          const T = TRAINERS[k];
          return '<a class="card clickable zone-card ph-hub-card" href="#/phrases/' + k + '"><div class="zone-icon">' + T.emoji + '</div>' +
            '<h3>' + esc(T.short) + '</h3><div class="ph-hub-uk">' + esc(T.uk) + '</div><p>' + esc(T.desc) + '</p>' +
            '<span class="btn btn-ghost ph-hub-btn">Відкрити →</span></a>';
        }).join('') + '</div>'
      ).join('');
  }

  function shell(key, D, tabs, tab) {
    const T = TRAINERS[key];
    const items = T.kind === 'words' ? D.WORDS : D.MARKERS;
    const cats = T.kind === 'words' ? D.CATS.length : Object.keys(D.CATS).length;
    const lvls = {};
    items.forEach(w => { lvls[w.lvl] = (lvls[w.lvl] || 0) + 1; });
    return '<div class="ph-root">' +
      '<div class="ph-hero">' +
      '<div class="ph-hero-emoji">' + T.emoji + '</div>' +
      '<div class="ph-hero-main"><h1>' + esc(D.META.title.replace(/^\S+\s/, '')) + '</h1><p>' + D.META.lead + '</p>' +
      '<div class="ph-hero-stats"><span>📊 <b>' + items.length + '</b> ' + (T.unit || (T.kind === 'words' ? 'слів' : 'маркерів')) + '</span><span>🧠 <b>' + cats + '</b> ' + (T.unitCat || (T.kind === 'words' ? 'категорій' : 'функцій')) + '</span>' +
      ['A1', 'A2', 'B1', 'B2', 'C1'].filter(l => lvls[l]).map(l => '<span>' + lvlBadge(l) + ' ' + lvls[l] + '</span>').join('') + '</div>' +
      '</div></div>' +
      '<div class="tabs ph-tabs">' + tabs.map(([id, label]) => '<a class="tab' + (id === tab ? ' active' : '') + '" href="#/phrases/' + key + (id === tabs[0][0] ? '' : '/' + id) + '">' + label + '</a>').join('') + '</div>' +
      '<div id="ph-panel" class="ph-panel"></div></div>';
  }

  /* ============================ SHARED: chips ============================ */
  function toggleChip(set, all, val) {
    if (val === '__all') return set.size === all.length ? new Set() : new Set(all);
    const s = new Set(set);
    s.has(val) ? s.delete(val) : s.add(val);
    return s;
  }
  function chipsHtml(label, all, set, labelOf, countOf, attr) {
    return '<div class="chip-row"><span class="chip-label">' + label + '</span>' +
      '<button class="sub-chip rd-chip' + (set.size === all.length ? ' active' : '') + '" ' + attr + '="__all">Усі</button>' +
      all.map(v => '<button class="sub-chip rd-chip' + (set.has(v) ? ' active' : '') + '" ' + attr + '="' + esc(v) + '">' + labelOf(v) + (countOf ? ' <span class="rd-cnt">' + countOf(v) + '</span>' : '') + '</button>').join('') + '</div>';
  }

  /* ============================ SHARED: quiz ============================ */
  function finalHtml(score, total) {
    const pct = total ? Math.round(score / total * 100) : 0;
    const msg = pct === 100 ? ['🏆', 'Бездоганно!'] : pct >= 80 ? ['🌟', 'Відмінно!'] : pct >= 60 ? ['👏', 'Добре!'] : pct >= 40 ? ['📚', 'Потрібна додаткова практика'] : ['💪', 'Перечитай теорію та спробуй ще'];
    return '<div class="ph-final"><div class="ph-final-emoji">' + msg[0] + '</div><div class="ph-final-score">' + score + ' / ' + total + '</div>' +
      '<div class="ph-final-pct">' + pct + '% правильних відповідей</div><h2>' + msg[1] + '</h2>' +
      '<button class="btn btn-primary" data-restart>🔄 Почати знову з новими питаннями</button></div>';
  }

  /* quiz(panel, { key, id, build: () => items[], render: item => { prompt, options:[{val,label}], isOk(val), explain(ok) , input? }, topHtml? }) */
  function quiz(panel, cfg) {
    const S = st(cfg.key).quiz;
    let q = S[cfg.id];
    const restart = () => { S[cfg.id] = q = { items: cfg.build(), idx: 0, score: 0, answered: false, rendered: null, rewarded: false }; draw(); };
    const box = document.createElement('div');
    box.className = 'ph-quiz card';
    panel.appendChild(box);
    if (!q) return restart();

    function draw() {
      if (!q) return restart();
      if (!q.items.length) { box.innerHTML = '<div class="empty-note">' + (cfg.emptyText || 'Немає питань для цих фільтрів.') + '</div>'; return; }
      if (q.idx >= q.items.length) {
        if (!q.rewarded) { q.rewarded = true; FL().touchStreak(); if (q.score === q.items.length && q.items.length >= 8) { try { FL().confetti(); } catch (e) { } } }
        box.innerHTML = finalHtml(q.score, q.items.length);
        box.querySelector('[data-restart]').addEventListener('click', restart);
        return;
      }
      const item = q.items[q.idx];
      const r = q.rendered && q.rendered.idx === q.idx ? q.rendered.r : (q.rendered = { idx: q.idx, r: cfg.render(item) }).r;
      box.innerHTML =
        '<div class="ph-q-head"><div class="progress"><i style="width:' + Math.round(q.idx / q.items.length * 100) + '%"></i></div>' +
        '<div class="ph-q-stats"><span>Питання ' + (q.idx + 1) + ' / ' + q.items.length + '</span>' + (r.badge || '') + '<span class="ph-q-score">✓ ' + q.score + '</span></div></div>' +
        '<div class="ph-q-prompt">' + r.prompt + '</div>' +
        (r.input ? '<div class="fill-row ph-tr-row"><input class="text-input" id="ph-inp" placeholder="напиши англійською…" autocomplete="off" spellcheck="false"><button class="btn btn-primary" data-check>Перевірити</button></div><div class="ph-tr-actions"><button class="btn btn-ghost" data-show>👁 Показати відповідь</button></div>'
          : '<div class="opts ' + (r.col1 ? 'ph-col1' : '') + '">' + r.options.map((o, i) => '<button class="opt" data-i="' + i + '">' + (r.col1 ? '' : '<span class="opt-key">' + String.fromCharCode(65 + i) + '</span>') + '<span>' + o.label + '</span></button>').join('') + '</div>') +
        '<div id="ph-fb"></div>';

      const done = (ok, html, show) => {
        if (q.answered) return;
        q.answered = true;
        if (ok) { q.score++; FL().addXp(XP_PER_OK); }
        $('ph-fb').innerHTML = '<div class="feedback ' + (ok ? 'good' : 'bad') + '" role="status" aria-live="polite"><span class="fb-icon">' + (show ? '📖' : ok ? '✅' : '❌') + '</span><div>' + html + '</div></div>' +
          '<div class="session-foot"><button class="btn btn-primary" data-next>' + (q.idx + 1 < q.items.length ? 'Далі →' : 'Результати 🏁') + '</button></div>';
        const nb = box.querySelector('[data-next]');
        nb.addEventListener('click', () => { q.idx++; q.answered = false; draw(); });
        if (nb.focus) nb.focus();
      };
      q.answered = false;
      if (r.input) {
        const inp = $('ph-inp');
        const check = () => {
          if (q.answered) return;
          if (!inp.value.trim()) { FL().showToast('✍️ Спершу напиши переклад'); return; }
          const ok = r.isOk(inp.value);
          inp.classList.add(ok ? 'good' : 'bad'); inp.disabled = true;
          done(ok, r.explain(ok));
        };
        box.querySelector('[data-check]').addEventListener('click', check);
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
        box.querySelector('[data-show]').addEventListener('click', () => { inp.disabled = true; done(false, r.explain(false), true); });
        if (inp.focus) inp.focus();
      } else {
        box.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
          if (q.answered) return;
          const o = r.options[+btn.dataset.i];
          const ok = r.isOk(o.val);
          box.querySelectorAll('.opt').forEach((b, i) => {
            b.disabled = true;
            if (r.isOk(r.options[i].val)) b.classList.add('correct');
            else if (b === btn) b.classList.add('wrong');
            else b.classList.add('dim');
          });
          done(ok, r.explain(ok));
        }));
      }
    }
    draw();
  }

  /* ============================ SHARED: flashcards ============================ */
  function flashcards(panel, key, cfg) {
    const F = st(key).fc;
    panel.insertAdjacentHTML('beforeend',
      '<div class="lex-toolbar ph-fc-filters" id="ph-fc-filters"></div>' +
      '<div class="fc-stats"><span class="stat-k">✓ Знаю: <b id="ph-k">0</b></span><span class="stat-u">✗ Не знаю: <b id="ph-u">0</b></span><span class="stat-r">⏳ Лишилось: <b id="ph-r">0</b></span></div>' +
      '<div class="ph-card-wrap"><div class="ph-card" id="ph-card"><div class="ph-card-inner"><div class="ph-face ph-front" id="ph-front"></div><div class="ph-face ph-back" id="ph-back"></div></div></div></div>' +
      '<div class="ph-card-counter" id="ph-counter"></div>' +
      '<div class="fc-nav"><button class="fc-btn" data-fc="prev">← Попередня</button><button class="fc-btn unknown" data-fc="unknown">✗ Не знаю</button><button class="fc-btn known" data-fc="known">✓ Знаю</button><button class="fc-btn" data-fc="next">Далі →</button></div>' +
      '<div class="fc-nav"><button class="fc-btn" data-fc="shuffle">🔀 Перемішати</button><button class="fc-btn" data-fc="review">🔁 Повторити невідомі</button><button class="fc-btn danger" data-fc="reset">🔄 Скинути прогрес</button></div>');

    const idOf = cfg.idOf;
    const rebuild = () => { F.deck = cfg.deck(); F.idx = 0; F.flipped = false; render(); };
    const render = () => {
      cfg.renderFilters($('ph-fc-filters'), rebuild);
      let k = 0, u = 0;
      F.deck.forEach(w => { if (F.status[idOf(w)] === 'known') k++; else if (F.status[idOf(w)] === 'unknown') u++; });
      $('ph-k').textContent = k; $('ph-u').textContent = u; $('ph-r').textContent = F.deck.length - k - u;
      const card = $('ph-card');
      if (!F.deck.length) {
        $('ph-front').innerHTML = '<div class="ph-card-empty">Оберіть рівень / категорію</div>';
        $('ph-back').innerHTML = '';
        $('ph-counter').innerHTML = 'Колода: <b>0</b>';
        card.classList.remove('flipped');
        return;
      }
      if (F.idx >= F.deck.length) F.idx = 0;
      const w = F.deck[F.idx];
      const status = F.status[idOf(w)];
      $('ph-front').innerHTML = cfg.front(w) + (status ? '<span class="ph-status ' + status + '">' + (status === 'known' ? '✓ Знаю' : '✗ Не знаю') + '</span>' : '') + '<div class="ph-card-hint">клацни, щоб перевернути</div>';
      $('ph-back').innerHTML = cfg.back(w);
      card.classList.toggle('flipped', F.flipped);
      $('ph-counter').innerHTML = 'Картка <b>' + (F.idx + 1) + '</b> / <b>' + F.deck.length + '</b>';
    };
    const flash = cls => { const c = $('ph-card'); if (!c) return; c.classList.add(cls); setTimeout(() => c.classList.remove(cls), 240); };
    const move = d => { if (!F.deck.length) return; F.idx = (F.idx + d + F.deck.length) % F.deck.length; F.flipped = false; render(); };
    const mark = s => {
      if (!F.deck.length) return;
      F.status[idOf(F.deck[F.idx])] = s;
      flash(s === 'known' ? 'known-flash' : 'unknown-flash');
      render();
      setTimeout(() => { if ($('ph-card')) move(1); }, 250);
    };

    $('ph-card').addEventListener('click', e => {
      if (e.target.closest('[data-say]')) { e.stopPropagation(); FL().speakLang(e.target.closest('[data-say]').dataset.say, 'en-US', 0.92); return; }
      F.flipped = !F.flipped; $('ph-card').classList.toggle('flipped', F.flipped);
    });
    panel.addEventListener('click', e => {
      const b = e.target.closest('[data-fc]'); if (!b) return;
      const a = b.dataset.fc;
      if (a === 'prev') move(-1);
      else if (a === 'next') move(1);
      else if (a === 'known' || a === 'unknown') mark(a);
      else if (a === 'shuffle') { F.deck = shuffle(F.deck); F.idx = 0; F.flipped = false; render(); }
      else if (a === 'review') {
        const un = F.deck.filter(w => F.status[idOf(w)] === 'unknown');
        if (!un.length) { FL().showToast('🎉 Немає карток, позначених «не знаю»'); return; }
        un.forEach(w => delete F.status[idOf(w)]);
        F.deck = shuffle(un); F.idx = 0; F.flipped = false; render();
      } else if (a === 'reset') {
        const root = $('modal-root');
        root.innerHTML = '<div class="modal-backdrop" id="ph-m"><div class="modal"><h3>Скинути прогрес колоди?</h3><p class="dy-modal-text">Позначки ✓ / ✗ для цієї колоди буде очищено.</p><div class="m-actions"><button class="btn btn-ghost btn-block" data-no>Скасувати</button><button class="btn btn-primary btn-block" data-yes>Скинути</button></div></div></div>';
        $('ph-m').addEventListener('click', ev => {
          if (ev.target.id === 'ph-m' || ev.target.closest('[data-no]')) root.innerHTML = '';
          else if (ev.target.closest('[data-yes]')) { root.innerHTML = ''; F.status = {}; rebuild(); }
        });
      }
    });
    if (!F.deck.length || F.stale) { F.stale = false; rebuild(); } else render();
  }

  /* ============================ WORDS MODE (transitions) ============================ */
  const WORDS_MODE = {
    browse(panel, key, D) {
      const B = st(key).browse;
      if (!B.lvls) { B.lvls = new Set(D.LEVELS); B.cats = new Set(D.CATS.map(c => c.id)); }
      panel.innerHTML =
        '<div class="ph-bonus card"><h4>📚 Бонус: порядок прикметників (Royal Order)</h4>' +
        '<div class="ph-formula">Opinion → Size → Age → Shape → Color → Origin → Material → Purpose → NOUN</div>' +
        '<div class="ph-bonus-ex">A <b>lovely small old round red Italian wooden coffee</b> table 🪑</div>' +
        '<div class="ph-bonus-ex">A <b>beautiful big new rectangular blue French silk evening</b> dress 👗</div></div>' +
        '<div class="ph-legend"><b>📊 Рівні CEFR:</b> ' + [['A1', 'базовий'], ['A2', 'елементарний'], ['B1', 'середній'], ['B2', 'вище середнього'], ['C1', 'просунутий']].map(([l, n]) => '<span>' + lvlBadge(l) + ' ' + n + '</span>').join('') + '</div>' +
        '<div class="lex-toolbar" id="ph-b-filters"></div><div id="ph-b-list"></div>';
      const draw = () => {
        $('ph-b-filters').innerHTML =
          chipsHtml('Рівень', D.LEVELS, B.lvls, l => lvlBadge(l), l => D.WORDS.filter(w => w.lvl === l).length, 'data-lvl') +
          chipsHtml('Категорія', D.CATS.map(c => c.id), B.cats, id => esc(D.CATS.find(c => c.id === id).short), id => D.WORDS.filter(w => w.cat === id).length, 'data-cat');
        let shown = 0;
        $('ph-b-list').innerHTML = D.CATS.filter(c => B.cats.has(c.id)).map(c => {
          const items = D.WORDS.filter(w => w.cat === c.id && B.lvls.has(w.lvl));
          if (!items.length) return '';
          shown += items.length;
          return '<section class="ph-cat"><div class="ph-cat-head"><span>' + esc(c.name) + '</span><span class="ph-cnt">' + items.length + ' слів</span></div><div class="ph-grid">' +
            items.map(w => '<div class="card ph-word" tabindex="0">' +
              '<div class="ph-word-head"><b>' + w.en + '</b>' + lvlBadge(w.lvl) + regBadge(w.reg) + '<button class="ph-say" data-say="' + esc(w.en.replace(/\s*\.\.\.\s*/g, ' ')) + '" title="Озвучити">🔊</button></div>' +
              '<div class="ph-word-uk">' + w.uk + '</div>' +
              '<div class="ph-word-details"><div><span class="ph-label">Def:</span> ' + w.def + '</div><div class="ph-ex">“' + w.ex + '”</div>' +
              (w.syn && w.syn.length ? '<div class="ph-syns"><span class="ph-label">≈ Syn:</span> ' + w.syn.map(s => '<span class="ph-syn">' + s + '</span>').join('') + '</div>' : '') +
              (w.ant && w.ant.length ? '<div class="ph-syns"><span class="ph-label">↔ Ant:</span> ' + w.ant.map(s => '<span class="ph-ant">' + s + '</span>').join('') + '</div>' : '') +
              (w.tip ? '<div class="ph-tip">' + w.tip + '</div>' : '') +
              (w.flow ? '<div class="ph-flow-block"><div class="ph-when">📌 <b>У потоці думки:</b> ' + esc(w.flow.when) + '</div>' +
                (w.flow.pairs || []).map(p => '<div class="ph-example"><div>' + esc(p.a) + ' <b class="ph-h">' + esc(p.b) + '</b></div><span>🇺🇦 ' + esc(p.uk) + '</span></div>').join('') +
                (w.flow.nuance ? '<div class="ph-tip">🔬 ' + esc(w.flow.nuance) + '</div>' : '') + '</div>' : '') +
              '</div></div>').join('') +
            '</div></section>';
        }).join('') || '';
        if (!shown) $('ph-b-list').innerHTML = '<div class="empty-note">🔍 Немає слів за вибраними фільтрами.</div>';
      };
      panel.addEventListener('click', e => {
        const say = e.target.closest('[data-say]');
        if (say) { e.stopPropagation(); FL().speakLang(say.dataset.say, 'en-US', 0.92, say); return; }
        const l = e.target.closest('[data-lvl]'), c = e.target.closest('[data-cat]');
        if (l) { B.lvls = toggleChip(B.lvls, D.LEVELS, l.dataset.lvl); draw(); return; }
        if (c) { B.cats = toggleChip(B.cats, D.CATS.map(x => x.id), c.dataset.cat); draw(); return; }
        const card = e.target.closest('.ph-word'); if (card) card.classList.toggle('expanded');
      });
      draw();
    },

    cards(panel, key, D) {
      const F = st(key).fc;
      if (!F.lvls) { F.lvls = new Set(D.LEVELS); F.cats = new Set(D.CATS.map(c => c.id)); }
      flashcards(panel, key, {
        idOf: w => w.en,
        deck: () => D.WORDS.filter(w => F.lvls.has(w.lvl) && F.cats.has(w.cat)),
        renderFilters(el, rebuild) {
          el.innerHTML = chipsHtml('Рівень', D.LEVELS, F.lvls, l => lvlBadge(l), null, 'data-flvl') +
            chipsHtml('Категорія', D.CATS.map(c => c.id), F.cats, id => esc(D.CATS.find(c => c.id === id).short), null, 'data-fcat');
          if (!el.dataset.bound) {
            el.dataset.bound = '1';
            el.addEventListener('click', e => {
              const l = e.target.closest('[data-flvl]'), c = e.target.closest('[data-fcat]');
              if (l) { F.lvls = toggleChip(F.lvls, D.LEVELS, l.dataset.flvl); rebuild(); }
              if (c) { F.cats = toggleChip(F.cats, D.CATS.map(x => x.id), c.dataset.fcat); rebuild(); }
            });
          }
        },
        front: w => '<div class="ph-card-cat">' + esc((D.CATS.find(c => c.id === w.cat) || {}).name || '') + '</div>' + lvlBadge(w.lvl) +
          '<div class="ph-card-word">' + w.en + '</div><button class="ph-say big" data-say="' + esc(w.en.replace(/\s*\.\.\.\s*/g, ' ')) + '">🔊</button>',
        back: w => '<div class="ph-card-uk">' + w.uk + '</div>' + regBadge(w.reg) +
          '<div class="ph-card-def">' + w.def + '</div><div class="ph-ex">“' + w.ex + '”</div>' +
          (w.syn && w.syn.length ? '<div class="ph-syns">' + w.syn.map(s => '<span class="ph-syn">≈ ' + s + '</span>').join('') + '</div>' : '') +
          (w.tip ? '<div class="ph-tip">' + w.tip + '</div>' : '')
      });
    },

    enuk(panel, key, D) { wordsTranslateQuiz(panel, key, D, 'enuk'); },
    uken(panel, key, D) { wordsTranslateQuiz(panel, key, D, 'uken'); },

    syn(panel, key, D) {
      quiz(panel, {
        key, id: 'syn',
        build: () => pick(D.WORDS.filter(w => w.syn && w.syn.length), 10),
        render: q => {
          const correct = q.syn[Math.floor(Math.random() * q.syn.length)];
          const banned = [q.en].concat(q.syn || [], q.ant || []);
          const pool = shuffle(D.WORDS.map(w => w.en).filter(w => !banned.includes(w)));
          const options = shuffle([correct].concat(pool.slice(0, 3))).map(v => ({ val: v, label: v }));
          return {
            badge: lvlBadge(q.lvl),
            prompt: '<div class="ph-target">' + q.en + '</div><div class="ph-hint">Оберіть <b>СИНОНІМ</b> (≈ те саме значення)</div>',
            options, isOk: v => q.syn.includes(v),
            explain: () => '<b>' + q.en + '</b> (' + q.uk + ') ≈ <b>' + q.syn.join(', ') + '</b>' + tipHtml(q)
          };
        }
      });
    },

    func(panel, key, D) {
      quiz(panel, {
        key, id: 'func',
        build: () => pick(D.WORDS, 12),
        render: q => {
          const cats = shuffle([q.cat].concat(shuffle(D.CATS.map(c => c.id).filter(c => c !== q.cat)).slice(0, 3)));
          const cc = D.CATS.find(c => c.id === q.cat);
          return {
            badge: lvlBadge(q.lvl), col1: true,
            prompt: '<div class="ph-target">' + q.en + '</div><div class="ph-hint">🇺🇦 <b>' + q.uk + '</b> — до якої <b>функції</b> належить це слово?</div>',
            options: cats.map(id => ({ val: id, label: esc(D.CATS.find(c => c.id === id).name) })),
            isOk: v => v === q.cat,
            explain: () => '<b>' + q.en + '</b> → <b>' + esc(cc.name) + '</b><br><i>' + q.def + '</i><br>📝 <i>“' + q.ex + '”</i>' + tipHtml(q)
          };
        }
      });
    },

    ctx(panel, key, D) {
      quiz(panel, {
        key, id: 'ctx',
        build: () => pick(D.WORDS.filter(w => w.ex.toLowerCase().includes(firstWord(w.en).toLowerCase())), 12),
        render: q => wordsCtxQuestion(D, q, true)
      });
    },

    /* ---------- потік думки: продовж власну думку ---------- */
    thought(panel, key, D) {
      quiz(panel, { key, id: 'thought', build: () => pick(D.THOUGHT_QS, 12), render: q => thoughtQuestion(D, q) });
    },

    /* ---------- потік думки: відповідь у діалозі ---------- */
    reply(panel, key, D) {
      quiz(panel, { key, id: 'reply', build: () => pick(D.DLG_QS, 12), render: q => replyQuestion(D, q) });
    },

    /* ---------- відтінки близьких конекторів ---------- */
    nuance(panel, key, D) {
      quiz(panel, { key, id: 'nuance', build: () => pick(D.NUANCE_QS, 10), render: q => nuanceQuestion(q) });
    },

    /* ---------- уривки живої мови ---------- */
    speech(panel, key, D) { passagePanel(panel, key, D); },

    mix(panel, key, D) {
      quiz(panel, {
        key, id: 'mix',
        build: () => shuffle([].concat(
          pick(D.WORDS, 5).map(item => ({ kind: 'enuk', item })),
          pick(D.WORDS, 5).map(item => ({ kind: 'uken', item })),
          pick(D.WORDS.filter(w => w.syn && w.syn.length), 4).map(item => ({ kind: 'syn', item })),
          pick(D.WORDS, 3).map(item => ({ kind: 'cat', item })),
          pick(D.WORDS.filter(w => w.ex.toLowerCase().includes(w.en.toLowerCase())), 4).map(item => ({ kind: 'ctx', item }))
        )),
        render: ({ kind, item: it }) => {
          const others = n => pick(D.WORDS.filter(w => w.en !== it.en), n);
          let r;
          if (kind === 'enuk') {
            const opts = shuffle([it].concat(others(3)));
            r = { prompt: '<div class="ph-target">' + it.en + '</div><div class="ph-hint">Що це означає українською?</div>', options: opts.map(o => ({ val: o.en, label: o.uk })), isOk: v => v === it.en, explain: () => '<b>' + it.en + '</b> = ' + it.uk + ' — <i>' + it.def + '</i>' + tipHtml(it) };
          } else if (kind === 'uken') {
            const opts = shuffle([it].concat(others(3)));
            r = { prompt: '<div class="ph-target uk">«' + it.uk + '»</div><div class="ph-hint">Як це англійською?</div>', options: opts.map(o => ({ val: o.en, label: o.en })), isOk: v => v === it.en, explain: () => '<b>' + it.uk + '</b> = ' + it.en + ' — <i>' + it.def + '</i>' + tipHtml(it) };
          } else if (kind === 'syn') {
            const correct = it.syn[Math.floor(Math.random() * it.syn.length)];
            const banned = [it.en].concat(it.syn || [], it.ant || []);
            const opts = shuffle([correct].concat(shuffle(D.WORDS.map(w => w.en).filter(w => !banned.includes(w))).slice(0, 3)));
            r = { prompt: '<div class="ph-target">' + it.en + '</div><div class="ph-hint">Оберіть <b>СИНОНІМ</b> (≈)</div>', options: opts.map(v => ({ val: v, label: v })), isOk: v => it.syn.includes(v), explain: () => '<b>' + it.en + '</b> ≈ ' + it.syn.join(', ') + ' (' + it.uk + ')' + tipHtml(it) };
          } else if (kind === 'cat') {
            const cats = shuffle([it.cat].concat(shuffle(D.CATS.map(c => c.id).filter(c => c !== it.cat)).slice(0, 3)));
            r = { col1: true, prompt: '<div class="ph-target">' + it.en + '</div><div class="ph-hint">🇺🇦 <b>' + it.uk + '</b> — до якої <b>функції</b> належить?</div>', options: cats.map(id => ({ val: id, label: esc(D.CATS.find(c => c.id === id).name) })), isOk: v => v === it.cat, explain: () => '<b>' + it.en + '</b> → <b>' + esc(D.CATS.find(c => c.id === it.cat).name) + '</b> — <i>' + it.def + '</i>' + tipHtml(it) };
          } else r = wordsCtxQuestion(D, it, false);
          r.badge = '<span class="tag">🏆 Підсумок</span>' + lvlBadge(it.lvl);
          return r;
        }
      });
    }
  };

  const firstWord = w => w.split(/\s+/)[0].replace(/[.,;:!?()]/g, '');
  const tipHtml = w => (w.reg ? ' ' + regBadge(w.reg) : '') + (w.tip ? '<div class="ph-tip">' + w.tip + '</div>' : '');

  function wordsCtxQuestion(D, q, sameCatDistractors) {
    const fullRe = new RegExp('\\b' + escapeRe(q.en) + '\\b', 'i');
    const blanked = fullRe.test(q.ex) ? q.ex.replace(fullRe, '_____') : q.ex.replace(new RegExp('\\b' + escapeRe(firstWord(q.en)) + '\\b', 'i'), '_____');
    let distr = sameCatDistractors ? pick(D.WORDS.filter(w => w.cat === q.cat && w.en !== q.en), 3) : [];
    const rest = shuffle(D.WORDS.filter(w => w.en !== q.en && !distr.includes(w)));
    while (distr.length < 3 && rest.length) distr.push(rest.pop());
    const opts = shuffle([q].concat(distr));
    return {
      badge: lvlBadge(q.lvl),
      prompt: '<div class="ph-sentence">“' + blanked.replace('_____', '<span class="ph-gap">_____</span>') + '”</div><div class="ph-hint">💡 Підказка (укр.): <b>' + q.uk + '</b></div>',
      options: opts.map(o => ({ val: o.en, label: o.en })), isOk: v => v === q.en,
      explain: () => '“' + q.ex + '”<br><b>' + q.en + '</b> = ' + q.uk + ' — <i>' + q.def + '</i>' + tipHtml(q)
    };
  }

  function wordsTranslateQuiz(panel, key, D, dir) {
    const S = st(key);
    const lk = dir + 'Lvls';
    if (!S[lk]) S[lk] = new Set(D.LEVELS);
    const filters = document.createElement('div');
    filters.className = 'lex-toolbar';
    panel.appendChild(filters);
    const drawFilters = () => { filters.innerHTML = chipsHtml('Рівні', D.LEVELS, S[lk], l => lvlBadge(l), l => D.WORDS.filter(w => w.lvl === l).length, 'data-qlvl'); };
    drawFilters();
    const host = document.createElement('div');
    panel.appendChild(host);
    const start = () => {
      host.innerHTML = '';
      quiz(host, {
        key, id: dir, emptyText: 'Оберіть хоча б один рівень.',
        build: () => pick(D.WORDS.filter(w => S[lk].has(w.lvl)), 12),
        render: q => {
          let distr = pick(D.WORDS.filter(w => w.cat === q.cat && w.en !== q.en), 3);
          const rest = shuffle(D.WORDS.filter(w => w.cat !== q.cat));
          while (distr.length < 3 && rest.length) distr.push(rest.pop());
          const opts = shuffle([q].concat(distr));
          return dir === 'enuk' ? {
            badge: lvlBadge(q.lvl),
            prompt: '<div class="ph-target">' + q.en + '</div><div class="ph-hint">Що це означає українською?</div>',
            options: opts.map(o => ({ val: o.en, label: o.uk })), isOk: v => v === q.en,
            explain: () => '<b>' + q.en + '</b> = <b>' + q.uk + '</b> ' + lvlBadge(q.lvl) + '<br><i>' + q.def + '</i><div class="ph-ex">“' + q.ex + '”</div>' + tipHtml(q)
          } : {
            badge: lvlBadge(q.lvl),
            prompt: '<div class="ph-target uk">«' + q.uk + '»</div><div class="ph-hint">Як це англійською?</div>',
            options: opts.map(o => ({ val: o.en, label: o.en })), isOk: v => v === q.en,
            explain: () => '<b>' + q.uk + '</b> = <b>' + q.en + '</b> ' + lvlBadge(q.lvl) + '<br><i>' + q.def + '</i><div class="ph-ex">“' + q.ex + '”</div>' + tipHtml(q)
          };
        }
      });
    };
    filters.addEventListener('click', e => {
      const l = e.target.closest('[data-qlvl]'); if (!l) return;
      S[lk] = toggleChip(S[lk], D.LEVELS, l.dataset.qlvl);
      drawFilters();
      delete S.quiz[dir];
      start();
    });
    start();
  }

  /* ============================ MARKERS MODE (discourse, timeseq) ============================ */
  /* ============================ ПОТІК ДУМКИ (transitions) ============================ */
  function thoughtQuestion(D, q) {
    const opts = shuffle([q.correct].concat(q.distractors));
    return {
      badge: '<span class="tag">💭 Продовж думку</span>',
      prompt: '<div class="ph-hint">💭 Ти вже сказав першу частину. Чим звʼязати другу?</div>' +
        '<div class="ph-flow"><div class="ph-flow-a">' + esc(q.a) + '</div>' +
        '<div class="ph-flow-b">' + esc(q.b).replace('___', '<span class="ph-gap">___</span>') + '</div></div>' +
        (q.uk ? '<div class="ph-sub">🇺🇦 ' + esc(q.uk) + '</div>' : ''),
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.correct,
      explain: () => '<span class="ph-chip">' + esc(q.correct) + '</span><div class="ph-extra">' + esc(q.relation) + '</div>'
    };
  }
  function replyQuestion(D, q) {
    const opts = shuffle([q.correct].concat(q.distractors));
    return {
      badge: '<span class="tag">💬 Відповідь у діалозі</span>',
      prompt: '<div class="ph-hint">💬 Що поставити на початку своєї відповіді?</div>' +
        '<div class="ph-msg them ph-msg-solo"><span class="ph-who">👤 Them</span>' + esc(q.them) + '</div>' +
        '<div class="ph-msg me ph-msg-solo"><span class="ph-who">🙋 You</span>' + esc(q.you).replace('___', '<span class="ph-gap">___</span>') + '</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.correct,
      explain: () => '<span class="ph-chip">' + esc(q.correct) + '</span><div class="ph-extra">' + esc(q.relation) + '</div>'
    };
  }
  function nuanceQuestion(q) {
    const opts = shuffle(q.options.slice());
    return {
      badge: '<span class="tag">🔬 Відтінки</span>', col1: true,
      prompt: '<div class="ph-hint">🔬 Усі варіанти граматично можливі — але який тут доречний за змістом?</div>' +
        '<div class="ph-sentence">' + esc(q.context).replace('___', '<span class="ph-gap">___</span>') + '</div>',
      options: opts.map(o => ({ val: o.en, label: esc(o.en) })),
      isOk: v => v === q.correct,
      explain: () => q.options.map(o => '<div class="ph-extra">' + (o.en === q.correct ? '✅ ' : '▫️ ') + '<b>' + esc(o.en) + '</b> — ' + esc(String(o.why).replace(/^[✅❌]\s*/, '')) + '</div>').join('')
    };
  }
  /* уривок живої мови: вставляєш конектори з банку */
  function passagePanel(panel, key, D) {
    const S = st(key);
    const box = document.createElement('div');
    box.className = 'ph-quiz card';
    panel.appendChild(box);
    let idx = S.passage || 0, fills = {};

    const draw = () => {
      const s = D.PASSAGES[idx];
      const parts = String(s.text).split(/\{\{([^}]+)\}\}/);
      const total = Math.floor(parts.length / 2);
      let g = -1;
      const html = parts.map((p, i) => {
        if (i % 2 === 0) return esc(p);
        g++;
        return fills[g] ? '<b class="ph-h">' + esc(p) + '</b>' : '<span class="ph-gap">___</span>';
      }).join('');
      let cur = -1;
      for (let i = 0; i < total; i++) if (!fills[i]) { cur = i; break; }
      const answer = cur < 0 ? null : parts[cur * 2 + 1];
      box.innerHTML =
        '<div class="ph-q-head"><div class="progress"><i style="width:' + Math.round((total - (cur < 0 ? 0 : total - cur)) / total * 100) + '%"></i></div>' +
        '<div class="ph-q-stats"><span>Уривок ' + (idx + 1) + ' / ' + D.PASSAGES.length + '</span><span class="tag">📻 ' + esc(s.title) + '</span></div></div>' +
        '<div class="ph-hint">📻 Так говорять насправді: віднови звʼязки в живому мовленні.</div>' +
        '<div class="ph-story"><p>' + html + '</p></div>' +
        (cur < 0
          ? '<div class="ph-story-uk">🇺🇦 ' + esc(s.uk) + '</div><div class="ph-dlg-done">✅ Уривок відновлено!</div>' +
            '<div class="session-foot">' + (idx + 1 < D.PASSAGES.length ? '<button class="btn btn-primary" data-next>Наступний уривок →</button>' : '<button class="btn btn-primary" data-restart>🔄 Спочатку</button>') + '</div>'
          : '<div class="ph-q-prompt"><div class="ph-hint">🔗 Обери звʼязку для пропуску №' + (cur + 1) + ':</div></div>' +
            '<div class="opts">' + shuffle((s.pool || []).slice()).map(o => '<button class="opt" data-o="' + esc(o) + '"><span>' + esc(o) + '</span></button>').join('') + '</div>') +
        '<div id="ph-fb"></div>';

      box.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
        const ok = btn.dataset.o === answer;
        box.querySelectorAll('.opt').forEach(b => {
          b.disabled = true;
          if (b.dataset.o === answer) b.classList.add('correct');
          else if (b === btn) b.classList.add('wrong');
          else b.classList.add('dim');
        });
        if (ok) FL().addXp(XP_PER_OK);
        const w = D.WORDS.find(x => normTr(x.en) === normTr(answer));
        $('ph-fb').innerHTML = '<div class="feedback ' + (ok ? 'good' : 'bad') + '" role="status" aria-live="polite"><span class="fb-icon">' + (ok ? '✅' : '❌') + '</span><div><span class="ph-chip">' + esc(answer) + '</span>' +
          (w ? '<div class="ph-extra">🇺🇦 ' + esc(w.uk) + ' — ' + esc(w.def || '') + '</div>' : '') + '</div></div>' +
          '<div class="session-foot"><button class="btn btn-primary" data-go>Далі →</button></div>';
        box.querySelector('[data-go]').addEventListener('click', () => { fills[cur] = answer; draw(); });
      }));
      const nb = box.querySelector('[data-next]'), rb = box.querySelector('[data-restart]');
      if (nb) nb.addEventListener('click', () => { idx++; S.passage = idx; fills = {}; FL().touchStreak(); draw(); });
      if (rb) rb.addEventListener('click', () => { idx = 0; S.passage = 0; fills = {}; draw(); });
    };
    draw();
  }

  const catLabel = (D, c) => D.CATS[c] ? D.CATS[c].emoji + ' ' + D.CATS[c].label : c;
  const catCount = (D, c) => D.MARKERS.filter(m => m.cat === c).length;

  const MARKERS_MODE = {
    guide(panel, key, D) {
      const T = TRAINERS[key];
      panel.innerHTML = '<div class="ph-guide">' + D.INTRO + '</div>' +
        (D.VERBS ? '<h2 class="section-title">🎲 ' + Object.keys(D.VERBS).length + ' дієслів-універсалів</h2>' +
          '<div class="ph-verbs">' + Object.keys(D.VERBS).map(v =>
            '<div class="card ph-verb"><div class="ph-verb-emoji">' + D.VERBS[v].emoji + '</div><b>' + esc(v.toUpperCase()) + '</b>' +
            '<div class="ph-verb-forms">' + esc(D.VERBS[v].forms) + '</div><div class="ph-verb-tag">' + esc(D.VERBS[v].tag) + '</div>' +
            '<div class="ph-verb-cnt">' + D.MARKERS.filter(m => m.verb === v).length + ' значень</div></div>').join('') + '</div>' : '') +
        '<h2 class="section-title">🧠 ' + Object.keys(D.CATS).length + ' ' + (T.unitCat || 'функцій') + ' — клацай для огляду</h2>' +
        '<div class="ph-cat-overview">' + Object.keys(D.CATS).map(c =>
          '<a class="card clickable ph-cat-card" href="#/phrases/' + key + '/browser" data-cat="' + c + '">' +
          '<div class="ph-cat-card-head"><span class="ph-cat-emoji">' + D.CATS[c].emoji + '</span><span class="ph-cat-label">' + esc(D.CATS[c].label) + '</span><span class="ph-cnt">' + catCount(D, c) + '</span></div>' +
          '<div class="ph-cat-desc">' + esc(D.CATS[c].desc) + '</div>' +
          '<div class="ph-cat-samples">' + D.MARKERS.filter(m => m.cat === c).slice(0, 3).map(m => esc(m.name)).join(' · ') + '</div></a>'
        ).join('') + '</div>';
      panel.querySelectorAll('[data-cat]').forEach(a => a.addEventListener('click', () => { const B = st(key).browse; B.cat = a.dataset.cat; B.q = ''; B.reg = ''; B.lvl = ''; }));
    },

    browser(panel, key, D) {
      const B = st(key).browse;
      const lvls = ['A1', 'A2', 'B1', 'B2', 'C1'].filter(l => D.MARKERS.some(m => m.lvl === l));
      panel.innerHTML =
        '<div class="lex-toolbar ph-m-filters">' +
        '<input class="text-input lex-search" id="ph-q" placeholder="🔍 Пошук: ' + esc(D.MARKERS.slice(0, 3).map(m => m.name).join(', ')) + '…" autocomplete="off" value="' + esc(B.q) + '">' +
        '<div class="ph-selects">' +
        '<label>🧠 Функція<select id="ph-cat"><option value="">Усі функції</option>' + Object.keys(D.CATS).map(c => '<option value="' + c + '"' + (B.cat === c ? ' selected' : '') + '>' + esc(catLabel(D, c)) + ' (' + catCount(D, c) + ')</option>').join('') + '</select></label>' +
        '<label>🌸 Регістр<select id="ph-reg"><option value="">Усі</option>' + Object.keys(REG_LABEL).map(r => '<option value="' + r + '"' + (B.reg === r ? ' selected' : '') + '>' + REG_LABEL[r] + '</option>').join('') + '</select></label>' +
        (lvls.length ? '<label>📊 Рівень<select id="ph-lvl"><option value="">Усі</option>' + lvls.map(l => '<option' + (B.lvl === l ? ' selected' : '') + '>' + l + '</option>').join('') + '</select></label>' : '') +
        '</div></div><div class="ph-results" id="ph-count"></div><div id="ph-list"></div>';
      const draw = () => {
        const q = B.q.toLowerCase().trim();
        const f = D.MARKERS.filter(m => (!B.cat || m.cat === B.cat) && (!B.reg || m.reg === B.reg) && (!B.lvl || m.lvl === B.lvl) &&
          (!q || (m.name + ' ' + m.uk + ' ' + m.when).toLowerCase().includes(q)));
        $('ph-count').innerHTML = 'Знайдено: <b>' + f.length + '</b> / ' + D.MARKERS.length + ' маркерів';
        const groups = {};
        f.forEach(m => (groups[m.cat] = groups[m.cat] || []).push(m));
        $('ph-list').innerHTML = Object.keys(groups).map(c =>
          '<section class="ph-cat"><div class="ph-cat-head big"><span class="ph-cat-emoji">' + D.CATS[c].emoji + '</span><div><div>' + esc(D.CATS[c].label) + ' <span class="ph-cnt">' + groups[c].length + '</span></div><small>' + esc(D.CATS[c].desc) + '</small></div></div>' +
          groups[c].map(m => '<div class="card ph-marker" tabindex="0">' +
            '<div class="ph-marker-head"><span class="ph-marker-emoji">' + m.emoji + '</span><b class="ph-marker-name">' + esc(m.name) + '</b>' + lvlBadge(m.lvl) + regBadge(m.reg) +
            '<button class="ph-say" data-say="' + esc(m.name) + '" title="Озвучити">🔊</button></div>' +
            '<div class="ph-word-uk">🇺🇦 ' + m.uk + '</div>' +
            '<div class="ph-word-details">' +
            (m.formula ? '<div class="ph-formula">📐 <b>Формула:</b> ' + m.formula + '</div>' : '') +
            '<div class="ph-when">📌 <b>Коли вживати:</b> ' + m.when + '</div>' +
            '<div class="ph-examples">' + m.examples.map(ex => '<div class="ph-example"><div>' + renderEx(ex.en) + ' <button class="ph-say sm" data-say="' + esc(ex.en.replace(/<[^>]+>/g, '')) + '">🔊</button></div><span>🇺🇦 ' + ex.uk + '</span></div>').join('') + '</div>' +
            (m.tip ? '<div class="ph-tip">' + m.tip + '</div>' : '') + (m.vs ? '<div class="ph-vs">' + m.vs + '</div>' : '') +
            '</div></div>').join('') + '</section>'
        ).join('') || '<div class="empty-note">Нічого не знайдено</div>';
      };
      $('ph-q').addEventListener('input', e => { B.q = e.target.value; draw(); });
      [['ph-cat', 'cat'], ['ph-reg', 'reg'], ['ph-lvl', 'lvl']].forEach(([id, k]) => { const el = $(id); if (el) el.addEventListener('change', e => { B[k] = e.target.value; draw(); }); });
      $('ph-list').addEventListener('click', e => {
        const say = e.target.closest('[data-say]');
        if (say) { e.stopPropagation(); FL().speakLang(say.dataset.say, 'en-US', 0.92, say); return; }
        const card = e.target.closest('.ph-marker'); if (card) card.classList.toggle('expanded');
      });
      draw();
    },

    cards(panel, key, D) {
      const F = st(key).fc;
      flashcards(panel, key, {
        idOf: m => m.name,
        deck: () => shuffle(D.MARKERS.filter(m => (!F.cat || m.cat === F.cat) && (!F.reg || m.reg === F.reg))),
        renderFilters(el, rebuild) {
          if (el.dataset.bound) return;
          el.dataset.bound = '1';
          el.innerHTML = '<div class="ph-selects">' +
            '<label>🧠 Функція<select id="ph-fc-cat"><option value="">Усі функції</option>' + Object.keys(D.CATS).map(c => '<option value="' + c + '"' + (F.cat === c ? ' selected' : '') + '>' + esc(catLabel(D, c)) + ' (' + catCount(D, c) + ')</option>').join('') + '</select></label>' +
            '<label>🌸 Регістр<select id="ph-fc-reg"><option value="">Усі регістри</option>' + Object.keys(REG_LABEL).map(r => '<option value="' + r + '"' + (F.reg === r ? ' selected' : '') + '>' + REG_LABEL[r] + '</option>').join('') + '</select></label></div>';
          $('ph-fc-cat').addEventListener('change', e => { F.cat = e.target.value; F.status = {}; rebuild(); });
          $('ph-fc-reg').addEventListener('change', e => { F.reg = e.target.value; F.status = {}; rebuild(); });
        },
        front: m => '<div class="ph-card-emoji">' + m.emoji + '</div><div class="ph-card-word">' + esc(m.name) + '</div><div class="ph-card-meta">' + lvlBadge(m.lvl) + regBadge(m.reg) + '</div>' +
          '<button class="ph-say big" data-say="' + esc(m.name) + '">🔊</button>',
        back: m => '<div class="ph-card-cat">' + esc(catLabel(D, m.cat)) + '</div><div class="ph-card-uk">' + m.uk + '</div><div class="ph-when">📌 ' + m.when + '</div>' +
          m.examples.slice(0, 2).map(ex => '<div class="ph-ex">' + renderEx(ex.en) + '</div>').join('') + (m.tip ? '<div class="ph-tip">' + m.tip + '</div>' : '')
      });
    },

    match(panel, key, D) {
      quiz(panel, { key, id: 'match', build: () => pick(D.MARKERS, 12), render: q => matchQuestion(D, q) });
    },

    fill(panel, key, D) {
      quiz(panel, { key, id: 'fill', build: () => pick(D.FILL_QS, 12), render: q => fillQuestion(D, q) });
    },

    translate(panel, key, D) {
      quiz(panel, {
        key, id: 'translate',
        build: () => pick(D.TR_QS, 10),
        render: q => ({
          badge: '<span class="tag">✍️ UA → EN</span>', input: true,
          prompt: '<div class="ph-hint">🇺🇦 Переклади англійською. <b>Підказка:</b> ' + esc(q.hint) + '</div><div class="ph-target uk">🇺🇦 ' + esc(q.uk) + '</div>',
          isOk: v => q.answers.map(normTr).includes(normTr(v)),
          explain: () => '✅ <b>' + esc(q.answers[0]) + '</b>' + (q.answers.length > 1 ? '<div class="ph-alt">Альтернативи: ' + q.answers.slice(1).map(esc).join(' / ') + '</div>' : '') +
            ' <button class="ph-say sm" data-say="' + esc(q.answers[0]) + '">🔊</button>'
        })
      });
      panel.addEventListener('click', e => { const say = e.target.closest('[data-say]'); if (say) FL().speakLang(say.dataset.say, 'en-US', 0.92, say); });
    },

    /* ---------- підсилювачі: рівень сили ---------- */
    power(panel, key, D) {
      quiz(panel, { key, id: 'power', build: () => pick(D.INT_QS, 12), render: q => powerQuestion(D, q) });
    },

    /* ---------- підсилювачі: so чи such ---------- */
    sosuch(panel, key, D) {
      panel.innerHTML = '<div class="ph-guide"><div class="intro-box blue"><h3>🔀 Правило в одному рядку</h3>' +
        '<p><b>SO</b> + прикметник (<i>It\'s so cold</i>) · <b>SUCH</b> + (a) + прикметник + <b>іменник</b> (<i>It\'s such a cold day</i>). Є іменник — значить such.</p></div></div>';
      quiz(panel, { key, id: 'sosuch', build: () => pick(D.SS_QS, 12), render: q => soSuchQuestion(q) });
    },

    /* ---------- підсилювачі: gradable → extreme ---------- */
    grad(panel, key, D) {
      panel.innerHTML = '<div class="ph-guide"><div class="intro-box orange"><h3>📈 Градуйовані та екстремальні</h3>' +
        '<p><b>Gradable</b> (cold, good, tired) підсилюються словами very / a bit / really. <b>Extreme</b> (freezing, amazing, exhausted) уже містять «дуже», тож із ними йдуть absolutely / totally, а не very.</p></div></div>';
      quiz(panel, { key, id: 'grad', build: () => pick(D.GRAD_PAIRS, 12), render: q => gradQuestion(D, q) });
    },

    /* ---------- питання → природна відповідь ---------- */
    qa(panel, key, D) {
      quiz(panel, { key, id: 'qa', build: () => pick(D.QA_PAIRS, 12), render: q => qaQuestion(D, q) });
    },

    /* ---------- реальні ситуації ---------- */
    situation(panel, key, D) {
      quiz(panel, { key, id: 'situation', build: () => pick(D.SITUATIONS, 12), render: q => situationQuestion(q) });
    },

    /* ---------- полісемія: яке значення ---------- */
    meaning(panel, key, D) {
      quiz(panel, { key, id: 'meaning', build: () => pick(D.MARKERS, 12), render: q => meaningQuestion(D, q) });
    },

    /* ---------- полісемія: обери дієслово ---------- */
    pick(panel, key, D) {
      quiz(panel, { key, id: 'pick', build: () => pick(D.MARKERS.filter(m => m.examples.some(ex => /<b>/.test(ex.en))), 12), render: q => pickVerbQuestion(D, q) });
    },

    /* ---------- переклад із варіантами ---------- */
    trchoice(panel, key, D) {
      quiz(panel, { key, id: 'trchoice', build: () => pick(D.MARKERS, 10), render: q => trChoiceQuestion(D, q) });
      panel.addEventListener('click', e => { const say = e.target.closest('[data-say]'); if (say) FL().speakLang(say.dataset.say, 'en-US', 0.92, say); });
    },

    /* ---------- діалоги з пропусками ---------- */
    dialogue(panel, key, D) { dialoguePanel(panel, key, D); },

    /* ---------- історії з розбором ---------- */
    story(panel, key, D) { storyPanel(panel, key, D); },

    /* ---------- chunks: скорочення gonna / wanna ---------- */
    reductions(panel, key, D) {
      const red = D.MARKERS.filter(m => m.type === 'red');
      panel.innerHTML = '<div class="ph-guide"><div class="intro-box orange"><h3>🗜️ Як звучить жива мова</h3>' +
        '<p>Нейтиви не вимовляють кожне слово окремо: <b>going to → gonna</b>, <b>want to → wanna</b>, <b>got to → gotta</b>. Це не сленг і не помилка — це нормальна вимова. Писати так у листі не варто, а от чути й розуміти — обовʼязково.</p></div></div>' +
        '<div class="ph-red-grid">' + red.map(m =>
          '<div class="card ph-red"><div class="ph-red-top"><b>' + esc(m.name) + '</b>' +
          (m.full ? '<span class="ph-red-full">← ' + esc(m.full) + '</span>' : '') +
          '<button class="ph-say sm" data-say="' + esc(m.name) + '">🔊</button></div>' +
          '<div class="ph-word-uk">🇺🇦 ' + esc(m.uk) + '</div>' +
          (m.examples[0] ? '<div class="ph-ex">' + renderEx(m.examples[0].en) + '</div>' : '') + '</div>').join('') + '</div>';
      panel.addEventListener('click', e => { const s = e.target.closest('[data-say]'); if (s) FL().speakLang(s.dataset.say, 'en-US', 0.9, s); });
      quiz(panel, { key, id: 'reductions', build: () => pick(red, 12), render: q => reductionQuestion(D, q) });
    },

    /* ---------- chunks: шаблони ---------- */
    template(panel, key, D) {
      quiz(panel, { key, id: 'template', build: () => pick(D.TPL_BANK, 12), render: q => templateQuestion(D, q) });
    },

    /* ---------- chunks: зліпити фразу з двох ---------- */
    recombine(panel, key, D) {
      quiz(panel, {
        key, id: 'recombine', build: () => pick(D.RECOMB_BANK, 6),
        render: q => ({
          badge: '<span class="tag">🔗 Зліпи фразу</span>', input: true,
          prompt: '<div class="ph-hint">🔗 Склади одне речення з двох блоків. <b>Підказка:</b> ' + esc(q.hint) + '</div>' +
            '<div class="ph-target">' + esc(q.c2) + ' <span class="ph-plus">+</span> ' + esc(q.c1) + '</div>' +
            '<div class="ph-sub">🇺🇦 ' + esc(q.uk) + '</div>',
          isOk: v => normTr(v) === normTr(q.target),
          explain: () => '<span class="ph-chip">' + esc(q.target) + '</span> <button class="ph-say sm" data-say="' + esc(q.target) + '">🔊</button>'
        })
      });
      panel.addEventListener('click', e => { const s = e.target.closest('[data-say]'); if (s) FL().speakLang(s.dataset.say, 'en-US', 0.92, s); });
    },

    /* ---------- chunks: ситуація → фраза ---------- */
    sitchunk(panel, key, D) {
      quiz(panel, { key, id: 'sitchunk', build: () => pick(D.SITUATIONS, 12), render: q => chunkSituationQuestion(D, q) });
    },

    /* ---------- chunks: переклад із введенням ---------- */
    trinput(panel, key, D) {
      const pool = D.MARKERS.filter(m => !/_/.test(m.name) && m.name.split(' ').length <= 6);
      quiz(panel, {
        key, id: 'trinput', build: () => pick(pool, 12),
        render: q => ({
          badge: '<span class="tag">✍️ UA → EN</span>', input: true,
          prompt: '<div class="ph-hint">✍️ Як сказати це англійською однією готовою фразою?</div><div class="ph-target uk">🇺🇦 ' + esc(q.uk) + '</div>',
          isOk: v => normTr(v) === normTr(q.name) || q.name.split(/\s*\/\s*/).some(x => normTr(v) === normTr(x)),
          explain: () => '<span class="ph-chip">' + esc(q.name) + '</span> <button class="ph-say sm" data-say="' + esc(q.name) + '">🔊</button>' +
            '<div class="ph-extra">📌 ' + esc(q.when) + '</div>'
        })
      });
      panel.addEventListener('click', e => { const s = e.target.closest('[data-say]'); if (s) FL().speakLang(s.dataset.say, 'en-US', 0.92, s); });
    },

    /* ---------- chunks: що відповісти в діалозі ---------- */
    reply2(panel, key, D) {
      quiz(panel, { key, id: 'reply2', build: () => pick(D.MARKERS.filter(m => m.dialog), 12), render: q => chunkReplyQuestion(D, q) });
    },

    /* ---------- chunks: регістр фрази ---------- */
    register(panel, key, D) {
      panel.innerHTML = '<div class="ph-guide"><div class="intro-box blue"><h3>🎚️ Три регістри</h3>' +
        '<p><b>Casual</b> — із друзями (<i>No way! / Yeah, totally</i>), <b>neutral</b> — майже скрізь (<i>Really? / I agree</i>), <b>formal</b> — на роботі й із незнайомими (<i>I see your point / I’m afraid I disagree</i>). Та сама думка різними словами — це і є відчуття доречності.</p></div></div>';
      quiz(panel, { key, id: 'register', build: () => pick(D.MARKERS.filter(m => m.reg), 12), render: q => registerQuestion(D, q) });
    },

    /* ---------- collocations ---------- */
    verbpick(panel, key, D) {
      quiz(panel, { key, id: 'verbpick', build: () => pick(D.MARKERS, 12), render: q => verbPickQuestion(D, q) });
    },
    mistakes(panel, key, D) {
      quiz(panel, { key, id: 'mistakes', build: () => pick(D.MISTAKES, 12), render: q => mistakeQuestion(D, q) });
    },
    context(panel, key, D) {
      quiz(panel, { key, id: 'context', build: () => pick(D.MARKERS.filter(m => m.examples[0] && m.examples[0].en), 12), render: q => collContextQuestion(D, q) });
    },
    life(panel, key, D) { lifePanel(panel, key, D); },

    /* ---------- confusing pairs ---------- */
    pairchoice(panel, key, D) {
      quiz(panel, { key, id: 'pairchoice', build: () => pick(D.TESTS, 14), render: q => pairChoiceQuestion(D, q) });
    },
    rightwrong(panel, key, D) {
      quiz(panel, { key, id: 'rightwrong', build: () => pick(D.RIGHT_WRONG, 12), render: q => rightWrongQuestion(q) });
    },

    /* ---------- situational: розмовник ---------- */
    phrasebook(panel, key, D) { phrasebookPanel(panel, key, D); },

    /* ---------- situational: що відповісти ---------- */
    response(panel, key, D) {
      quiz(panel, { key, id: 'response', build: () => pick(responsePairs(D), 12), render: q => responseQuestion(D, q) });
    },

    /* ---------- situational: хто це каже ---------- */
    role(panel, key, D) {
      quiz(panel, {
        key, id: 'role', build: () => pick(D.MARKERS.filter(m => m.role === 'you' || m.role === 'them'), 12),
        render: q => ({
          badge: '<span class="tag">🙋 Хто це каже</span>',
          prompt: '<div class="ph-hint">🙋 Хто вимовляє цю фразу?</div><span class="ph-context">' + (D.CATS[q.cat] ? D.CATS[q.cat].emoji + ' ' + esc(D.CATS[q.cat].label) : '') + '</span>' +
            '<div class="ph-target">' + esc(q.name) + '</div><div class="ph-sub">🇺🇦 ' + esc(q.uk) + '</div>',
          options: [{ val: 'you', label: '🙋 <b>Я</b><small>клієнт, гість, пасажир</small>' }, { val: 'them', label: '👤 <b>Співрозмовник</b><small>бариста, лікар, персонал</small>' }],
          isOk: v => v === q.role,
          explain: () => '<span class="ph-chip">' + (q.role === 'you' ? '🙋 Це кажеш ти' : '👤 Це кажуть тобі') + '</span>' +
            (q.tip ? '<div class="ph-extra">💡 ' + esc(q.tip) + '</div>' : '')
        })
      });
    },

    /* ---------- situational: пропущене слово ---------- */
    missing(panel, key, D) {
      quiz(panel, {
        key, id: 'missing', build: () => pick(D.MISSING_BANK, 12),
        render: q => ({
          badge: '<span class="tag">🧩 Пропущене слово</span>', input: true,
          prompt: '<div class="ph-hint">🧩 Впиши слово, якого бракує. <b>Підказка:</b> ' + esc(q.hint) + '</div>' +
            '<span class="ph-context">' + esc(q.sit) + '</span><div class="ph-sentence">' + esc(q.missing).replace('___', '<span class="ph-gap">___</span>') + '</div>',
          isOk: v => normTr(v) === normTr(q.answer),
          explain: () => '<span class="ph-chip">' + esc(q.full) + '</span> <button class="ph-say sm" data-say="' + esc(q.full) + '">🔊</button>'
        })
      });
      panel.addEventListener('click', e => { const s = e.target.closest('[data-say]'); if (s) FL().speakLang(s.dataset.say, 'en-US', 0.92, s); });
    },

    /* ---------- softeners: рівень мʼякості ---------- */
    level(panel, key, D) {
      panel.innerHTML = '<div class="ph-guide"><div class="intro-box blue"><h3>📉 Шкала мʼякості</h3>' +
        '<p>1 — ледь помітне пом’якшення (<i>just</i>), 5 — максимально обережно (<i>I was wondering if you might possibly…</i>). Що вищий рівень, то більша дистанція між тобою і тим, що ти кажеш.</p></div></div>';
      quiz(panel, { key, id: 'level', build: () => pick(D.MARKERS.filter(m => m.softness), 12), render: q => softLevelQuestion(D, q) });
    },

    /* ---------- softeners: помʼякши фразу ---------- */
    soften(panel, key, D) {
      quiz(panel, { key, id: 'soften', build: () => pick(D.SOFTEN_BANK, 10), render: q => softenQuestion(q) });
    },

    /* ---------- softeners: впиши слово ---------- */
    fillbank(panel, key, D) {
      quiz(panel, {
        key, id: 'fillbank', build: () => pick(D.FILL_BANK, 10),
        render: q => ({
          badge: '<span class="tag">✏️ Впиши слово</span>', input: true,
          prompt: '<div class="ph-hint">✏️ Яке слово робить фразу ввічливою? <b>Підказка:</b> ' + esc(q.hint) + '</div>' +
            '<div class="ph-sentence">' + esc(q.ctx).replace('___', '<span class="ph-gap">___</span>') + '</div>',
          isOk: v => normTr(v) === normTr(q.answer),
          explain: () => '<span class="ph-chip">' + esc(q.answer) + '</span><div class="ph-extra">📖 ' + esc(q.ctx).replace('___', '<b class="ph-h">' + esc(q.answer) + '</b>') + '</div>'
        })
      });
    },

    /* ---------- express: обери подачу ---------- */
    express(panel, key, D) {
      quiz(panel, { key, id: 'express', build: () => pick(D.EXPRESS_QS, 12), render: q => expressQuestion(D, q) });
    },

    /* ---------- express: зразки історій ---------- */
    models(panel, key, D) { storyPanel(panel, key, D, D.MODELS, 'Зразок'); },

    /* ---------- express: розкажи сам ---------- */
    tell(panel, key, D) { tellPanel(panel, key, D); },

    mix(panel, key, D) {
      const gens = [];
      if (D.FILL_QS) D.FILL_QS.forEach(f => gens.push({ t: '✏️ Fill', r: () => fillQuestion(D, f) }));
      if (D.TPL_BANK) D.TPL_BANK.forEach(q => gens.push({ t: '🧱 Шаблон', r: () => templateQuestion(D, q) }));
      if (D.SITUATIONS && D.SITUATIONS[0] && D.SITUATIONS[0].correctEn) D.SITUATIONS.forEach(q => gens.push({ t: '🎭 Ситуація', r: () => chunkSituationQuestion(D, q) }));
      if (D.MISSING_BANK) {
        D.MISSING_BANK.forEach(q => gens.push({ t: '🧩 Пропуск', r: () => missingQuestion(q) }));
        responsePairs(D).forEach(q => gens.push({ t: '↩️ Відповідь', r: () => responseQuestion(D, q) }));
      }
      if (D.SOFTEN_BANK) {
        D.SOFTEN_BANK.forEach(q => gens.push({ t: '🕊️ Помʼякшення', r: () => softenQuestion(q) }));
        D.MARKERS.filter(m => m.softness).forEach(m => gens.push({ t: '📉 Рівень', r: () => softLevelQuestion(D, m) }));
      }
      if (D.EXPRESS_QS) D.EXPRESS_QS.forEach(q => gens.push({ t: '🎤 Подача', r: () => expressQuestion(D, q) }));
      if (D.REACT_SITS) {
        D.MARKERS.filter(m => m.dialog).forEach(m => gens.push({ t: '💬 Відповідь', r: () => chunkReplyQuestion(D, m) }));
        D.MARKERS.filter(m => m.reg).forEach(m => gens.push({ t: '🎚️ Регістр', r: () => registerQuestion(D, m) }));
      }
      if (D.MISTAKES && D.LIFE) {
        D.MISTAKES.forEach(q => gens.push({ t: '⚠️ Помилка', r: () => mistakeQuestion(D, q) }));
        D.MARKERS.forEach(m => gens.push({ t: '🎯 Дієслово', r: () => verbPickQuestion(D, m) }));
        D.MARKERS.filter(m => m.examples[0] && m.examples[0].en).forEach(m => gens.push({ t: '📝 Контекст', r: () => collContextQuestion(D, m) }));
      }
      if (D.TESTS) {
        D.TESTS.forEach(q => gens.push({ t: '🔀 Пара', r: () => pairChoiceQuestion(D, q) }));
        D.RIGHT_WRONG.forEach(q => gens.push({ t: '✅ Правильно', r: () => rightWrongQuestion(q) }));
      }
      if (D.INT_QS) D.INT_QS.forEach(q => gens.push({ t: '⚡ Сила', r: () => powerQuestion(D, q) }));
      if (D.SS_QS) D.SS_QS.forEach(q => gens.push({ t: '🔀 so / such', r: () => soSuchQuestion(q) }));
      if (D.GRAD_PAIRS) D.GRAD_PAIRS.forEach(q => gens.push({ t: '📈 Extreme', r: () => gradQuestion(D, q) }));
      if (D.QA_PAIRS) D.QA_PAIRS.forEach(q => gens.push({ t: '🗣️ Відповідь', r: () => qaQuestion(D, q) }));
      if (D.SITUATIONS && D.SITUATIONS[0] && D.SITUATIONS[0].correct) D.SITUATIONS.forEach(q => gens.push({ t: '🎭 Ситуація', r: () => situationQuestion(q) }));
      if (D.VERBS) D.MARKERS.forEach(m => gens.push({ t: '🎯 Значення', r: () => meaningQuestion(D, m) }));
      else D.MARKERS.forEach(m => gens.push({ t: '🎯 Match', r: () => matchQuestion(D, m) }));
      quiz(panel, {
        key, id: 'mix',
        build: () => pick(gens, 15),
        render: it => { const r = it.r(); r.badge = '<span class="tag">🏆 Mix · ' + it.t + '</span>'; return r; }
      });
    }
  };

  /* ============================ ПИТАННЯ ДЛЯ НОВИХ РЕЖИМІВ ============================ */
  function powerQuestion(D, q) {
    const opts = shuffle([q.correct].concat(q.distractors));
    const item = D.MARKERS.find(m => m.name === q.correct);
    return {
      badge: '<span class="tag">⚡ Рівень сили</span>',
      prompt: '<div class="ph-hint">⚡ Який <b>рівень сили</b> тут потрібен? Читай контекст.</div>' +
        '<div class="ph-power">' + powerBar(q.power) + '</div><span class="ph-context">' + esc(q.context) + '</span>' +
        '<div class="ph-sentence"><span class="ph-gap">___</span> ' + esc(q.adj) + '</div><div class="ph-sub">🇺🇦 ' + esc(q.uk) + '</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.correct,
      explain: () => '<span class="ph-chip">' + esc(q.correct) + ' ' + esc(q.adj) + '</span>' +
        '<div class="ph-extra">' + powerBar(q.power) + '</div>' + (item ? '<div class="ph-extra">📌 ' + item.when + '</div>' : '')
    };
  }
  const powerBar = p => '⚡ Сила: ' + '<b>' + '●'.repeat(Math.max(1, p || 1)) + '</b>' + '○'.repeat(Math.max(0, 5 - (p || 1))) + ' (' + (p || 1) + ' / 5)';

  function soSuchQuestion(q) {
    return {
      badge: '<span class="tag">🔀 so / such</span>',
      prompt: '<div class="ph-hint">🔀 <b>so</b> чи <b>such</b>?</div><div class="ph-sentence">' + esc(q.sentence).replace('___', '<span class="ph-gap">___</span>') + '</div>' +
        '<div class="ph-sub">🇺🇦 ' + esc(q.uk) + '</div>',
      options: ['so', 'such'].map(o => ({ val: o, label: '<b>' + o + '</b>' })),
      isOk: v => v === q.correct,
      explain: () => '<span class="ph-chip">' + esc(q.sentence.replace('___', q.correct)) + '</span><div class="ph-extra">💡 ' + esc(q.explain) + '</div>'
    };
  }

  function gradQuestion(D, q) {
    const wrong = shuffle(D.GRAD_PAIRS.filter(p => p.extreme !== q.extreme)).slice(0, 3).map(p => p.extreme);
    const opts = shuffle([q.extreme].concat(wrong));
    const alts = (q.extreme_alts || []).map(esc).join(' / ');
    return {
      badge: '<span class="tag">📈 Gradable → Extreme</span>',
      prompt: '<div class="ph-hint">📈 Яке слово — <b>екстремальна</b> версія цього прикметника?</div>' +
        '<div class="ph-target">' + esc(q.gradable) + ' <span class="ph-gap">→ ?</span></div><div class="ph-sub">🇺🇦 ' + esc(q.uk) + '</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.extreme,
      explain: () => '<span class="ph-chip">very ' + esc(q.gradable) + ' = <b>' + esc(q.extreme) + '</b></span>' +
        (alts ? '<div class="ph-extra">Ще варіанти: ' + alts + '</div>' : '') +
        '<div class="ph-extra">⚠️ З extreme кажемо <b>absolutely ' + esc(q.extreme) + '</b>, а не «very ' + esc(q.extreme) + '».</div>'
    };
  }

  function qaQuestion(D, q) {
    const wrong = shuffle(D.QA_PAIRS.filter(p => p.a !== q.a)).slice(0, 3).map(p => p.a);
    const opts = shuffle([q.a].concat(wrong));
    return {
      badge: '<span class="tag">🗣️ Питання → відповідь</span>', col1: true,
      prompt: '<div class="ph-hint">🗣️ Що природно відповісти?</div><div class="ph-target">' + esc(q.q) + '</div><div class="ph-sub">🇺🇦 ' + esc(q.uk_q) + '</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.a,
      explain: () => '<span class="ph-chip">' + esc(q.a) + '</span><div class="ph-extra">🇺🇦 ' + esc(q.uk_a) + '</div>' +
        (D.CATS[q.cat] ? '<div class="ph-extra">📚 ' + esc(catLabel(D, q.cat)) + '</div>' : '')
    };
  }

  function situationQuestion(q) {
    const opts = shuffle([q.correct].concat(q.distractors));
    return {
      badge: '<span class="tag">🎭 Ситуація</span>', col1: true,
      prompt: '<div class="ph-hint">🎭 Що сказати в цій ситуації?</div><span class="ph-context">' + esc(q.ctx) + '</span>' +
        '<div class="ph-sentence">' + esc(q.scenario) + '</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.correct,
      explain: () => '<span class="ph-chip">' + esc(q.correct) + '</span><div class="ph-extra">🇺🇦 ' + esc(q.uk) + '</div>'
    };
  }

  const stripB = s => String(s).replace(/<\/?b>/g, '');
  function meaningQuestion(D, q) {
    const sameVerb = D.MARKERS.filter(m => m.verb === q.verb && m.name !== q.name);
    const pool = sameVerb.length >= 3 ? sameVerb : D.MARKERS.filter(m => m.name !== q.name);
    const opts = shuffle([q].concat(shuffle(pool).slice(0, 3)));
    const ex = q.examples[0];
    return {
      badge: '<span class="tag">🎯 Яке значення</span>', col1: true,
      prompt: '<div class="ph-hint">🎯 У цьому реченні <b>' + esc(String(q.verb || '').toUpperCase()) + '</b> означає:</div>' +
        '<div class="ph-example center"><div>' + renderEx(ex.en) + '</div><span>🇺🇦 ' + ex.uk + '</span></div>',
      options: opts.map(o => ({ val: o.name, label: o.emoji + ' <b>' + esc(o.name) + '</b><small>' + esc(o.uk) + '</small>' })),
      isOk: v => v === q.name,
      explain: () => '<span class="ph-chip">' + q.emoji + ' ' + esc(q.name) + ' = ' + esc(q.uk) + '</span>' +
        '<div class="ph-extra">📚 ' + esc(catLabel(D, q.cat)) + '</div>' +
        (q.collocations ? '<div class="ph-extra">🔗 ' + q.collocations.map(esc).join(' · ') + '</div>' : '')
    };
  }

  function pickVerbQuestion(D, q) {
    const ex = q.examples.find(e => /<b>/.test(e.en)) || q.examples[0];
    const target = (stripB(ex.en.match(/<b>([^<]+)<\/b>/) ? ex.en.match(/<b>([^<]+)<\/b>/)[1] : q.verb)).trim();
    const sentence = ex.en.replace(/<b>[^<]+<\/b>/, '<span class="ph-gap">___</span>').replace(/<\/?b>/g, '');
    const verbs = Object.keys(D.VERBS || {});
    const opts = shuffle([q.verb].concat(shuffle(verbs.filter(v => v !== q.verb)).slice(0, 3)));
    return {
      badge: '<span class="tag">🧩 Обери дієслово</span>',
      prompt: '<div class="ph-hint">🧩 Яке дієслово підходить у цьому реченні?</div><div class="ph-sentence">' + sentence + '</div>' +
        '<div class="ph-sub">🇺🇦 ' + ex.uk + '</div>',
      options: opts.map(o => ({ val: o, label: (D.VERBS[o] ? D.VERBS[o].emoji + ' ' : '') + '<b>' + esc(o.toUpperCase()) + '</b>' })),
      isOk: v => v === q.verb,
      explain: () => '<span class="ph-chip">' + esc(target) + '</span><div class="ph-extra">📖 ' + renderEx(ex.en) + '</div>' +
        '<div class="ph-extra">🎯 ' + q.emoji + ' ' + esc(q.name) + ' = ' + esc(q.uk) + '</div>'
    };
  }

  function trChoiceQuestion(D, q) {
    const ex = q.examples[0];
    const correct = stripB(ex.en);
    const wrong = shuffle(D.MARKERS.filter(m => m.name !== q.name)).slice(0, 3).map(m => stripB(m.examples[0].en));
    const opts = shuffle([correct].concat(wrong));
    return {
      badge: '<span class="tag">🇺🇦 → 🇬🇧</span>', col1: true,
      prompt: '<div class="ph-hint">🇺🇦 Який варіант — правильний переклад?</div><div class="ph-target uk">' + esc(ex.uk) + '</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === correct,
      explain: () => '<span class="ph-chip">' + esc(correct) + ' <button class="ph-say sm" data-say="' + esc(correct) + '">🔊</button></span>' +
        '<div class="ph-extra">🎯 ' + q.emoji + ' ' + esc(q.name) + ' = ' + esc(q.uk) + '</div>'
    };
  }

  /* ---------- chunks ---------- */
  function reductionQuestion(D, q) {
    const pool = D.MARKERS.filter(m => m.type === 'red' && m.full && m.full !== q.full);
    const opts = shuffle([q.full].concat(shuffle(pool).slice(0, 3).map(m => m.full)));
    return {
      badge: '<span class="tag">🗜️ Скорочення</span>',
      prompt: '<div class="ph-hint">🗜️ Від чого це скорочення?</div><div class="ph-target">' + esc(q.name) + '</div>' +
        (q.examples[0] ? '<div class="ph-example center"><div>' + renderEx(q.examples[0].en) + '</div><span>🇺🇦 ' + q.examples[0].uk + '</span></div>' : ''),
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.full,
      explain: () => '<span class="ph-chip">' + esc(q.name) + ' = ' + esc(q.full) + '</span><div class="ph-extra">📌 ' + esc(q.when) + '</div>'
    };
  }

  function templateQuestion(D, q) {
    const correct = q.tpl.replace('___', q.fill);
    const wrong = shuffle(D.TPL_BANK.filter(t => t.tpl !== q.tpl)).slice(0, 3).map(t => q.tpl.replace('___', t.fill));
    const opts = shuffle([correct].concat(wrong));
    return {
      badge: '<span class="tag">🧱 Шаблон</span>', col1: true,
      prompt: '<div class="ph-hint">🧱 Встав у шаблон те, що дає потрібний зміст. <b>Підказка:</b> ' + esc(q.hint) + '</div>' +
        '<div class="ph-target">' + esc(q.tpl).replace('___', '<span class="ph-gap">___</span>') + '</div><div class="ph-sub">🇺🇦 ' + esc(q.uk) + '</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === correct,
      explain: () => '<span class="ph-chip">' + esc(correct) + '</span> <button class="ph-say sm" data-say="' + esc(correct) + '">🔊</button>'
    };
  }

  function chunkSituationQuestion(D, q) {
    const pool = D.MARKERS.filter(m => normTr(m.name) !== normTr(q.correctEn));
    const opts = shuffle([q.correctEn].concat(shuffle(pool).slice(0, 3).map(m => m.name)));
    const item = D.MARKERS.find(m => normTr(m.name) === normTr(q.correctEn));
    return {
      badge: '<span class="tag">🎭 Ситуація</span>', col1: true,
      prompt: '<div class="ph-hint">🎭 Яку готову фразу тут сказати?</div><span class="ph-context">' + esc(q.sit) + '</span>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.correctEn,
      explain: () => '<span class="ph-chip">' + esc(q.correctEn) + '</span>' +
        (item ? '<div class="ph-extra">🇺🇦 ' + esc(item.uk) + '</div><div class="ph-extra">📌 ' + esc(item.when) + '</div>' : '')
    };
  }

  function chunkReplyQuestion(D, q) {
    const pool = D.MARKERS.filter(m => m.dialog && m.name !== q.name);
    const opts = shuffle([q.name].concat(shuffle(pool).slice(0, 3).map(m => m.name)));
    return {
      badge: '<span class="tag">💬 Що відповісти</span>', col1: true,
      prompt: '<div class="ph-hint">💬 Що природно відповісти?</div>' +
        '<div class="ph-msg them ph-msg-solo"><span class="ph-who">👤 Them</span>' + esc(q.dialog.a) + '</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.name,
      explain: () => '<span class="ph-chip">' + esc(q.dialog.b) + '</span>' +
        (q.dialog.uk ? '<div class="ph-extra">🇺🇦 ' + esc(q.dialog.uk) + '</div>' : '') +
        '<div class="ph-extra">📌 ' + esc(q.when) + '</div>'
    };
  }
  const REG_HINT = { casual: '🌸 з друзями', neutral: '💼 майже скрізь', formal: '🎩 офіційно' };
  function registerQuestion(D, q) {
    return {
      badge: '<span class="tag">🎚️ Регістр</span>',
      prompt: '<div class="ph-hint">🎚️ Де доречна ця фраза?</div><div class="ph-target">' + esc(q.name) + '</div>' +
        '<div class="ph-sub">🇺🇦 ' + esc(q.uk) + '</div>',
      options: ['casual', 'neutral', 'formal'].map(r => ({ val: r, label: REG_LABEL[r] + '<small>' + REG_HINT[r] + '</small>' })),
      isOk: v => v === q.reg,
      explain: () => '<span class="ph-chip">' + REG_LABEL[q.reg] + '</span><div class="ph-extra">📌 ' + esc(q.when) + '</div>'
    };
  }

  /* ---------- collocations ---------- */
  function verbPickQuestion(D, q) {
    const verbs = [...new Set(D.MARKERS.map(m => m.verb))];
    const wrong = shuffle([q.wrong].concat(verbs.filter(v => v !== q.verb && v !== q.wrong))).filter(Boolean).slice(0, 3);
    const opts = shuffle([q.verb].concat(wrong));
    return {
      badge: '<span class="tag">🎯 Обери дієслово</span>',
      prompt: '<div class="ph-hint">🎯 Яке дієслово йде з цим іменником?</div>' +
        '<div class="ph-target"><span class="ph-gap">___</span> ' + esc(q.noun) + '</div><div class="ph-sub">🇺🇦 ' + esc(q.uk) + '</div>',
      options: opts.map(o => ({ val: o, label: '<b>' + esc(o) + '</b>' })),
      isOk: v => v === q.verb,
      explain: () => '<span class="ph-chip">' + esc(q.name) + '</span><div class="ph-extra">📖 ' + esc(q.examples[0].en) + '</div>' +
        (q.wrong ? '<div class="ph-extra">⚠️ Не кажи «' + esc(q.wrong + ' ' + q.noun) + '».</div>' : '')
    };
  }
  function mistakeQuestion(D, q) {
    const pool = D.MISTAKES.filter(m => m.right !== q.right).map(m => m.wrong);
    const opts = shuffle([q.right].concat(shuffle(pool).slice(0, 3)));
    return {
      badge: '<span class="tag">⚠️ Типова помилка</span>', col1: true,
      prompt: '<div class="ph-hint">⚠️ Так кажуть неправильно. Як правильно?</div><div class="ph-blunt">' + esc(q.wrong) + '</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.right,
      explain: () => '<span class="ph-chip">' + esc(q.right) + '</span><div class="ph-extra">💡 ' + esc(q.why) + '</div>'
    };
  }
  function collContextQuestion(D, q) {
    const ex = q.examples[0];
    const re = new RegExp(escapeRe(q.noun), 'i');
    const sentence = ex.en.replace(re, '<span class="ph-gap">___</span>');
    const pool = D.MARKERS.filter(m => m.verb === q.verb && m.noun !== q.noun);
    const opts = shuffle([q.noun].concat(shuffle(pool.length >= 3 ? pool : D.MARKERS.filter(m => m.noun !== q.noun)).slice(0, 3).map(m => m.noun)));
    return {
      badge: '<span class="tag">📝 У контексті</span>',
      prompt: '<div class="ph-hint">📝 Заверши сполучення в реченні:</div><div class="ph-sentence">' + sentence + '</div>' +
        '<div class="ph-sub">🇺🇦 ' + esc(ex.uk) + '</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.noun,
      explain: () => '<span class="ph-chip">' + esc(q.name) + '</span><div class="ph-extra">🇺🇦 ' + esc(q.uk) + '</div>'
    };
  }
  function lifePanel(panel, key, D) {
    const B = st(key).browse;
    const ids = Object.keys(D.LIFE).filter(id => D.MARKERS.some(m => m.life === id));
    if (!B.life || ids.indexOf(B.life) < 0) B.life = ids[0];
    panel.innerHTML = '<div class="ph-hint">🌍 Ті самі сполучення, згруповані за сферами життя — так їх легше згадати в потрібний момент.</div>' +
      '<div class="ph-sit-tabs">' + ids.map(id =>
        '<button class="ph-sit-tab' + (id === B.life ? ' on' : '') + '" data-life="' + id + '">' + D.LIFE[id].emoji + ' ' + esc(D.LIFE[id].label) +
        ' <span class="ph-cnt">' + D.MARKERS.filter(m => m.life === id).length + '</span></button>').join('') + '</div><div id="ph-life-body"></div>';
    const draw = () => {
      const items = D.MARKERS.filter(m => m.life === B.life);
      $('ph-life-body').innerHTML = '<div class="ph-red-grid">' + items.map(m =>
        '<div class="card ph-red"><div class="ph-red-top"><b>' + esc(m.name) + '</b>' +
        '<button class="ph-say sm" data-say="' + esc(m.name) + '">🔊</button></div>' +
        '<div class="ph-word-uk">🇺🇦 ' + esc(m.uk) + '</div>' +
        '<div class="ph-ex">' + esc(m.examples[0].en) + '</div>' +
        (m.wrong ? '<div class="ph-tip">⚠️ не «' + esc(m.wrong + ' ' + m.noun) + '»</div>' : '') + '</div>').join('') + '</div>';
    };
    panel.addEventListener('click', e => {
      const say = e.target.closest('[data-say]');
      if (say) { e.stopPropagation(); FL().speakLang(say.dataset.say, 'en-US', 0.92, say); return; }
      const tab = e.target.closest('[data-life]');
      if (tab) { B.life = tab.dataset.life; panel.querySelectorAll('.ph-sit-tab').forEach(b => b.classList.toggle('on', b === tab)); draw(); }
    });
    draw();
  }

  /* ---------- confusing pairs ---------- */
  function pairChoiceQuestion(D, q) {
    const pair = D.MARKERS.find(m => m.id === q.pairId);
    const opts = shuffle(q.options.slice());
    return {
      badge: '<span class="tag">🔀 Обери слово</span>',
      prompt: '<div class="ph-hint">🔀 Яке слово тут правильне?</div><div class="ph-sentence">' + esc(q.ex).replace('___', '<span class="ph-gap">___</span>') + '</div>',
      options: opts.map(o => ({ val: o, label: '<b>' + esc(o) + '</b>' })),
      isOk: v => v === q.answer,
      explain: () => '<span class="ph-chip">' + esc(String(q.ex).replace('___', q.answer)) + '</span>' +
        '<div class="ph-extra">💡 ' + esc(q.why) + '</div>' + (pair ? '<div class="ph-extra">🧠 ' + esc(pair.when) + '</div>' : '')
    };
  }
  function rightWrongQuestion(q) {
    const opts = shuffle([q.right, q.wrong]);
    return {
      badge: '<span class="tag">✅ Правильно чи ні</span>', col1: true,
      prompt: '<div class="ph-hint">✅ Який варіант правильний?</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.right,
      explain: () => '<span class="ph-chip">' + esc(q.right) + '</span><div class="ph-extra">❌ ' + esc(q.wrong) + '</div>' +
        '<div class="ph-extra">💡 ' + esc(q.why) + '</div>'
    };
  }

  /* ---------- situational ---------- */
  function responsePairs(D) {
    const out = [];
    (D.SITUATIONS || []).forEach(s => {
      const d = s.dialog || [];
      for (let i = 0; i < d.length - 1; i++) if (d[i].sp === 'them' && d[i + 1].sp === 'you') out.push({ sit: s, them: d[i], you: d[i + 1] });
    });
    return out;
  }
  function responseQuestion(D, q) {
    const pool = responsePairs(D).filter(p => p.you.en !== q.you.en);
    const opts = shuffle([q.you.en].concat(shuffle(pool).slice(0, 3).map(p => p.you.en)));
    return {
      badge: '<span class="tag">↩️ Що відповісти</span>', col1: true,
      prompt: '<div class="ph-hint">↩️ Що відповісти в цій ситуації?</div><span class="ph-context">' + q.sit.emoji + ' ' + esc(q.sit.label) + '</span>' +
        '<div class="ph-msg them ph-msg-solo"><span class="ph-who">👤 Them</span>' + esc(q.them.en) + '</div><div class="ph-sub">🇺🇦 ' + esc(q.them.uk) + '</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.you.en,
      explain: () => '<span class="ph-chip">' + esc(q.you.en) + '</span><div class="ph-extra">🇺🇦 ' + esc(q.you.uk) + '</div>'
    };
  }
  function missingQuestion(q) {
    return {
      badge: '<span class="tag">🧩 Пропущене слово</span>', input: true,
      prompt: '<div class="ph-hint">🧩 Впиши слово, якого бракує. <b>Підказка:</b> ' + esc(q.hint) + '</div>' +
        '<span class="ph-context">' + esc(q.sit) + '</span><div class="ph-sentence">' + esc(q.missing).replace('___', '<span class="ph-gap">___</span>') + '</div>',
      isOk: v => normTr(v) === normTr(q.answer),
      explain: () => '<span class="ph-chip">' + esc(q.full) + '</span>'
    };
  }

  function phrasebookPanel(panel, key, D) {
    const B = st(key).browse;
    const ids = Object.keys(D.CATS);
    if (!B.cat || !D.CATS[B.cat]) B.cat = ids[0];
    const ROLE = { you: ['🙋', 'Що кажеш ти'], them: ['👤', 'Що кажуть тобі'], useful: ['💡', 'Корисні дрібниці'], warning: ['⚠️', 'Обережно'] };
    panel.innerHTML = '<div class="ph-sit-tabs">' + ids.map(id =>
      '<button class="ph-sit-tab' + (id === B.cat ? ' on' : '') + '" data-sit="' + id + '">' + D.CATS[id].emoji + ' ' + esc(D.CATS[id].label) + '</button>').join('') + '</div><div id="ph-sit-body"></div>';
    const draw = () => {
      const s = (D.SITUATIONS || []).find(x => x.id === B.cat);
      if (!s) return;
      $('ph-sit-body').innerHTML =
        '<div class="ph-sit-head"><span class="ph-sit-emoji">' + s.emoji + '</span><div><h2>' + esc(s.label) + '</h2><p>' + esc(s.desc) + '</p></div></div>' +
        Object.keys(ROLE).filter(r => (s.phrases || {})[r] && s.phrases[r].length).map(r =>
          '<section class="ph-sit-block"><h3>' + ROLE[r][0] + ' ' + ROLE[r][1] + ' <span class="ph-cnt">' + s.phrases[r].length + '</span></h3>' +
          s.phrases[r].map(p => '<div class="card ph-sit-phrase"><div class="ph-sit-en">' + esc(p.en) +
            '<button class="ph-say sm" data-say="' + esc(p.en) + '">🔊</button></div><div class="ph-word-uk">🇺🇦 ' + esc(p.uk) + '</div>' +
            (p.note ? '<div class="ph-tip">💡 ' + esc(p.note) + '</div>' : '') + '</div>').join('') + '</section>').join('') +
        (s.dialog && s.dialog.length ? '<section class="ph-sit-block"><h3>💬 Як це звучить разом</h3><div class="ph-dialogue">' +
          s.dialog.map(l => '<div class="ph-msg ' + (l.sp === 'you' ? 'me' : 'them') + '"><span class="ph-who">' + (l.sp === 'you' ? '🙋 You' : '👤 Them') + '</span>' +
            esc(l.en) + '<span class="ph-msg-uk">' + esc(l.uk) + '</span></div>').join('') + '</div>' +
          '<button class="btn btn-ghost ph-say-story" data-say="' + esc(s.dialog.map(l => l.en).join(' ')) + '">🔊 Прослухати діалог</button></section>' : '');
    };
    panel.addEventListener('click', e => {
      const say = e.target.closest('[data-say]');
      if (say) { e.stopPropagation(); FL().speakLang(say.dataset.say, 'en-US', 0.92, say); return; }
      const tab = e.target.closest('[data-sit]');
      if (tab) { B.cat = tab.dataset.sit; panel.querySelectorAll('.ph-sit-tab').forEach(b => b.classList.toggle('on', b === tab)); draw(); }
    });
    draw();
  }

  /* ---------- softeners ---------- */
  const SOFT_NAME = ['', 'ледь помітно', 'легко', 'помітно', 'дуже мʼяко', 'максимально обережно'];
  function softLevelQuestion(D, q) {
    const ex = q.examples[0];
    return {
      badge: '<span class="tag">📉 Рівень мʼякості</span>',
      prompt: '<div class="ph-hint">📉 Наскільки сильно цей вираз помʼякшує сказане?</div><div class="ph-target">' + esc(q.name) + '</div>' +
        '<div class="ph-sub">🇺🇦 ' + esc(q.uk) + '</div>' +
        (ex ? '<div class="ph-example center"><div>' + esc(ex.en) + '</div>' + (ex.blunt ? '<span>прямо: ' + esc(ex.blunt) + '</span>' : '') + '</div>' : ''),
      options: [1, 2, 3, 4, 5].map(n => ({ val: n, label: '<b>' + n + '</b><small>' + SOFT_NAME[n] + '</small>' })),
      isOk: v => v === q.softness,
      explain: () => '<span class="ph-chip">' + esc(q.name) + ' — рівень ' + q.softness + ' (' + SOFT_NAME[q.softness] + ')</span>' +
        '<div class="ph-extra">📌 ' + esc(q.when) + '</div>'
    };
  }
  function softenQuestion(q) {
    const opts = shuffle(q.options.slice());
    return {
      badge: '<span class="tag">🕊️ Помʼякши фразу</span>', col1: true,
      prompt: '<div class="ph-hint">🕊️ Як сказати це ввічливо, не образивши?</div><div class="ph-blunt">' + esc(q.blunt) + '</div>' +
        '<div class="ph-sub">🇺🇦 ' + esc(q.uk) + '</div>',
      options: opts.map(o => ({ val: o.en, label: esc(o.en) })),
      isOk: v => (q.options.find(o => o.en === v) || {}).correct === true,
      explain: ok => {
        const right = q.options.find(o => o.correct);
        return '<span class="ph-chip">' + esc(right.en) + '</span>' +
          q.options.map(o => '<div class="ph-extra">' + (o.correct ? '✅' : '▫️') + ' <b>' + esc(o.en) + '</b> — ' + esc(o.note || '') + '</div>').join('');
      }
    };
  }

  /* ---------- express ---------- */
  function expressQuestion(D, q) {
    const opts = shuffle([q.correct].concat(q.distractors));
    return {
      badge: '<span class="tag">🎤 Обери подачу</span>', col1: true,
      prompt: '<div class="ph-hint">🎤 Яка подача дає потрібний ефект?</div><span class="ph-context">' + esc(q.tone) + '</span>' +
        '<div class="ph-sentence">' + esc(q.target).replace('___', '<span class="ph-gap">___</span>') + '</div><div class="ph-sub">🇺🇦 ' + esc(q.uk) + '</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.correct,
      explain: () => '<span class="ph-chip">' + esc(q.correct) + '</span>' + (q.note ? '<div class="ph-extra">💡 ' + esc(q.note) + '</div>' : '')
    };
  }

  /* сценарій: текст із пропусками, які заповнюєш із банку фраз */
  function tellPanel(panel, key, D) {
    const S = st(key);
    const box = document.createElement('div');
    box.className = 'ph-quiz card';
    panel.appendChild(box);
    let idx = S.tell || 0, fills = {};

    const draw = () => {
      const s = D.SCENARIOS[idx];
      const parts = String(s.text).split(/\{\{([^}]+)\}\}/);
      let gap = -1;
      const html = parts.map((p, i) => {
        if (i % 2 === 0) return esc(p);
        gap++;
        const g = gap;
        return fills[g] ? '<b class="ph-h">' + esc(parts[i]) + '</b>' : '<span class="ph-gap">___</span>';
      }).join('');
      const total = Math.floor(parts.length / 2);
      const next = [];
      for (let i = 0; i < total; i++) if (!fills[i]) next.push(i);
      const cur = next[0];
      const answer = cur === undefined ? null : parts[cur * 2 + 1];
      box.innerHTML =
        '<div class="ph-q-head"><div class="progress"><i style="width:' + Math.round((total - next.length) / total * 100) + '%"></i></div>' +
        '<div class="ph-q-stats"><span>Сценарій ' + (idx + 1) + ' / ' + D.SCENARIOS.length + '</span><span class="tag">🎬 ' + esc(s.title) + '</span></div></div>' +
        '<div class="ph-hint">🎬 ' + esc(s.task) + '</div>' +
        '<div class="ph-story"><p>' + html + '</p></div>' +
        (cur === undefined
          ? '<div class="ph-story-uk">🇺🇦 ' + esc(s.uk) + '</div><div class="ph-dlg-done">✅ Історія зібрана!</div>' +
            '<div class="session-foot">' + (idx + 1 < D.SCENARIOS.length ? '<button class="btn btn-primary" data-next>Наступний сценарій →</button>' : '<button class="btn btn-primary" data-restart>🔄 Спочатку</button>') + '</div>'
          : '<div class="ph-q-prompt"><div class="ph-hint">🧩 Обери фразу для пропуску №' + (cur + 1) + ':</div></div>' +
            '<div class="opts ph-col1">' + shuffle(s.pool.slice()).map(o => '<button class="opt" data-o="' + esc(o) + '"><span>' + esc(o) + '</span></button>').join('') + '</div>') +
        '<div id="ph-fb"></div>';

      box.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
        const ok = btn.dataset.o === answer;
        box.querySelectorAll('.opt').forEach(b => {
          b.disabled = true;
          if (b.dataset.o === answer) b.classList.add('correct');
          else if (b === btn) b.classList.add('wrong');
          else b.classList.add('dim');
        });
        if (ok) FL().addXp(XP_PER_OK);
        $('ph-fb').innerHTML = '<div class="feedback ' + (ok ? 'good' : 'bad') + '" role="status" aria-live="polite"><span class="fb-icon">' + (ok ? '✅' : '❌') + '</span><div><span class="ph-chip">' + esc(answer) + '</span></div></div>' +
          '<div class="session-foot"><button class="btn btn-primary" data-go>Далі →</button></div>';
        box.querySelector('[data-go]').addEventListener('click', () => { fills[cur] = answer; draw(); });
      }));
      const nb = box.querySelector('[data-next]'), rb = box.querySelector('[data-restart]');
      if (nb) nb.addEventListener('click', () => { idx++; S.tell = idx; fills = {}; FL().touchStreak(); draw(); });
      if (rb) rb.addEventListener('click', () => { idx = 0; S.tell = 0; fills = {}; draw(); });
    };
    draw();
  }

  /* ============================ ДІАЛОГИ ============================ */
  function dialoguePanel(panel, key, D) {
    const S = st(key);
    const box = document.createElement('div');
    box.className = 'ph-quiz card';
    panel.appendChild(box);
    let idx = S.dlg || 0, fills = {};

    const draw = () => {
      const d = D.DIALOGUES[idx];
      const gaps = d.parts.map((p, i) => (p.correct ? i : -1)).filter(i => i >= 0);
      const next = gaps.find(i => !fills[i]);
      box.innerHTML =
        '<div class="ph-q-head"><div class="progress"><i style="width:' + Math.round(Object.keys(fills).length / gaps.length * 100) + '%"></i></div>' +
        '<div class="ph-q-stats"><span>Діалог ' + (idx + 1) + ' / ' + D.DIALOGUES.length + '</span><span class="tag">💬 ' + esc(d.title) + '</span></div></div>' +
        '<div class="ph-dialogue">' + d.parts.map((p, i) => {
          const text = p.correct
            ? esc(p.text).replace('___', fills[i] ? '<b class="ph-h">' + esc(fills[i]) + '</b>' : '<span class="ph-gap">___</span>')
            : esc(p.text);
          return '<div class="ph-msg ' + (p.who === 'you' ? 'me' : 'them') + '"><span class="ph-who">' + (p.who === 'you' ? '🙋 You' : '👤 Them') + '</span>' + text + '</div>';
        }).join('') + '</div>' +
        (next === undefined
          ? '<div class="ph-dlg-done">✅ Діалог заповнено!</div><div class="session-foot">' +
            (idx + 1 < D.DIALOGUES.length ? '<button class="btn btn-primary" data-next>Наступний діалог →</button>' : '<button class="btn btn-primary" data-restart>🔄 Спочатку</button>') +
            '</div>'
          : '<div class="ph-q-prompt"><div class="ph-hint">💬 Обери, що сказати:</div></div>' +
            '<div class="opts">' + shuffle(d.parts[next].options).map(o => '<button class="opt" data-o="' + esc(o) + '"><span>' + esc(o) + '</span></button>').join('') + '</div>') +
        '<div id="ph-fb"></div>';

      box.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
        const part = d.parts[next], val = btn.dataset.o, ok = val === part.correct;
        box.querySelectorAll('.opt').forEach(b => {
          b.disabled = true;
          if (b.dataset.o === part.correct) b.classList.add('correct');
          else if (b === btn) b.classList.add('wrong');
          else b.classList.add('dim');
        });
        if (ok) FL().addXp(XP_PER_OK);
        $('ph-fb').innerHTML = '<div class="feedback ' + (ok ? 'good' : 'bad') + '" role="status" aria-live="polite"><span class="fb-icon">' + (ok ? '✅' : '❌') + '</span><div>' +
          '<span class="ph-chip">' + esc(part.correct) + '</span>' + (part.note ? '<div class="ph-extra">💡 ' + esc(part.note) + '</div>' : '') + '</div></div>' +
          '<div class="session-foot"><button class="btn btn-primary" data-go>Далі →</button></div>';
        box.querySelector('[data-go]').addEventListener('click', () => { fills[next] = part.correct; draw(); });
      }));
      const nb = box.querySelector('[data-next]'), rb = box.querySelector('[data-restart]');
      if (nb) nb.addEventListener('click', () => { idx++; S.dlg = idx; fills = {}; FL().touchStreak(); draw(); });
      if (rb) rb.addEventListener('click', () => { idx = 0; S.dlg = 0; fills = {}; draw(); });
    };
    draw();
  }

  /* ============================ ІСТОРІЇ ============================ */
  /* breakdown у різних наборах зветься по-різному і буває просто списком фраз */
  const breakdownOf = s => (s.breakdown || s.chunks || s.pats || []).map(b =>
    typeof b === 'string' ? { word: b, meaning: '' } : { word: b.word || b.phrase || b.en || '', meaning: b.meaning || b.use || b.uk || '' });

  function storyPanel(panel, key, D, list, label) {
    const S = st(key);
    const items = list || D.STORIES;
    const word = label || 'Історія';
    const box = document.createElement('div');
    box.className = 'ph-quiz card';
    panel.appendChild(box);
    let idx = S.story || 0;
    if (idx >= items.length) idx = 0;

    const draw = () => {
      const s = items[idx];
      const bd = breakdownOf(s);
      box.innerHTML =
        '<div class="ph-q-head"><div class="progress"><i style="width:' + Math.round((idx + 1) / items.length * 100) + '%"></i></div>' +
        '<div class="ph-q-stats"><span>' + word + ' ' + (idx + 1) + ' / ' + items.length + '</span><span class="tag">📚 Метод історії</span></div></div>' +
        '<div class="ph-hint">📖 Подивись, як ті самі слова в різних значеннях живуть в одному тексті — так вони й запамʼятовуються.</div>' +
        '<div class="ph-story"><h3>' + esc(s.title) + '</h3><p>' + esc(s.text).replace(/\{\{([^}]+)\}\}/g, '<b class="ph-h">$1</b>') + '</p>' +
        '<button class="btn btn-ghost ph-say-story" data-say="' + esc(s.text.replace(/\{\{|\}\}/g, '')) + '">🔊 Прослухати</button></div>' +
        '<div class="ph-story-uk">🇺🇦 ' + esc(s.uk) + '</div>' +
        (bd.length ? '<div class="ph-story-break"><h4>🔎 Розбір (' + bd.length + ')</h4>' +
          bd.map(b => '<div class="ph-break-item"><b>' + esc(b.word) + '</b>' + (b.meaning ? ' — ' + esc(b.meaning) : '') + '</div>').join('') + '</div>' : '') +
        '<div class="session-foot"><button class="btn btn-ghost" data-prev>← Попередня</button><button class="btn btn-primary" data-next>Наступна →</button></div>';
      box.querySelector('[data-prev]').addEventListener('click', () => { idx = (idx - 1 + items.length) % items.length; S.story = idx; draw(); });
      box.querySelector('[data-next]').addEventListener('click', () => { idx = (idx + 1) % items.length; S.story = idx; FL().touchStreak(); draw(); });
      box.querySelector('[data-say]').addEventListener('click', e => FL().speakLang(e.currentTarget.dataset.say, 'en-US', 0.92, e.currentTarget));
    };
    draw();
  }

  function matchQuestion(D, q) {
    const cats = shuffle([q.cat].concat(shuffle(Object.keys(D.CATS).filter(c => c !== q.cat)).slice(0, 3)));
    const ex = q.examples[0];
    return {
      badge: '<span class="tag">🎯 Match Function</span>', col1: true,
      prompt: '<div class="ph-hint">🎯 Яку <b>функцію</b> виконує цей маркер?</div><div class="ph-target">' + esc(q.name) + '</div><div class="ph-sub">🇺🇦 ' + q.uk + '</div>' +
        '<div class="ph-example center"><div>' + renderEx(ex.en) + '</div><span>🇺🇦 ' + ex.uk + '</span></div>',
      options: cats.map(c => ({ val: c, label: D.CATS[c].emoji + ' <b>' + esc(D.CATS[c].label) + '</b><small>' + esc(D.CATS[c].desc) + '</small>' })),
      isOk: v => v === q.cat,
      explain: () => '<span class="ph-chip">' + esc(catLabel(D, q.cat)) + '</span><div class="ph-extra">📌 ' + q.when + '</div>' + (q.tip ? '<div class="ph-extra">' + q.tip + '</div>' : '')
    };
  }

  function fillQuestion(D, q) {
    const opts = shuffle([q.correct].concat(q.distractors));
    const marker = D.MARKERS.find(m => m.name.toLowerCase() === q.correct.toLowerCase());
    return {
      badge: '<span class="tag">✏️ Fill Blank</span>',
      prompt: '<div class="ph-hint">✏️ Заповни пропуск правильним маркером:</div><span class="ph-context">📍 ' + esc(q.ctx) + '</span>' +
        '<div class="ph-sentence">' + esc(q.target).replace('___', '<span class="ph-gap">___</span>') + '</div><div class="ph-sub">🇺🇦 ' + esc(q.uk) + '</div>',
      options: opts.map(o => ({ val: o, label: esc(o) })),
      isOk: v => v === q.correct,
      explain: () => '<span class="ph-chip">' + esc(q.correct) + '</span><div class="ph-extra">📖 ' + esc(q.target).replace('___', '<b class="ph-h">' + esc(q.correct) + '</b>') + '</div>' +
        '<div class="ph-extra">🇺🇦 ' + esc(q.uk) + '</div>' + (marker && marker.tip ? '<div class="ph-extra">' + marker.tip + '</div>' : '')
    };
  }

  /* ---------- питання для «Виклику» з уже завантажених тренажерів ---------- */
  function challengePool() {
    const out = [];
    ORDER.forEach(key => {
      const D = window.PHRASE_DATA && window.PHRASE_DATA[key];
      if (!D) return;
      const items = (D.MARKERS || D.WORDS || []).filter(m => (m.name || m.en) && m.uk);
      if (items.length < 6) return;
      pick(items, 4).forEach(m => {
        const name = m.name || m.en;
        const others = shuffle(items.filter(x => (x.name || x.en) !== name)).slice(0, 3).map(x => x.name || x.en);
        const opts = shuffle([name].concat(others));
        out.push({
          type: 'choice',
          q: 'Як це сказати англійською: «' + String(m.uk).replace(/<[^>]+>/g, '') + '»?',
          options: opts,
          answer: opts.indexOf(name),
          explain: name + (m.when ? ' — ' + String(m.when).replace(/<[^>]+>/g, '') : ''),
          tag: TRAINERS[key].short
        });
      });
    });
    return out;
  }
  /* перед грою тихо підвантажуємо один тренажер, щоб у «Виклику» були й фрази */
  function preloadRandom() {
    const rest = ORDER.filter(k => !(window.PHRASE_DATA && window.PHRASE_DATA[k]));
    if (!rest.length) return;
    ensure(rest[Math.floor(Math.random() * rest.length)]).catch(() => { });
  }

  window.FLPhrases = {
    route, challengePool, preloadRandom,
    TRAINERS, ORDER, GROUPS, SECTION,
    navSubs: () => ORDER.map(k => ({ hash: '#/phrases/' + k, label: TRAINERS[k].short, emoji: TRAINERS[k].emoji })),
    navGroups: () => GROUPS.map(g => ({
      id: g.id, emoji: g.emoji, title: g.title,
      items: g.items.map(k => ({ hash: '#/phrases/' + k, label: TRAINERS[k].uk, emoji: TRAINERS[k].emoji }))
    }))
  };
})();
