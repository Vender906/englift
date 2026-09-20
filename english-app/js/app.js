/* ============================================================
   EngLift — оболонка: навігація, роутер, дашборд, налаштування, ефекти, backup
   Розділи живуть у своїх модулях: core / lexis / grammar / reader / diary / placement / phrases.
   ============================================================ */
(function () {
  'use strict';

  const C = window.FLCore;
  const { $, $$, esc, plural, shuffle, KEY, defaultStore, FX_LIST, FX_DEFAULTS, store, save,
    levelInfo, topicKey, touchStreak, showToast, updateHeader, updateStreak, addXp, confetti,
    speakLang, speak, progressBar, setCrumbs, notFound, ringSvg, animateRings } = C;
  const LX = () => window.FLLexis;
  const GR = () => window.FLGrammar;
  const POS = window.FLLexis.POS, POS_ORDER = window.FLLexis.POS_ORDER;
  const { lexStats } = window.FLLexis;
  const { allTopics, getSub } = window.FLGrammar;

  function stats() {
    const topics = allTopics();
    const doneTopics = topics.filter(x => (store.topics[topicKey(x.sub.id, x.topic.id)] || {}).done).length;
    const ls = lexStats();
    const listenTotal = COURSE.listening.subs.length;
    const listenDone = COURSE.listening.subs.filter(s => (store.listen[s.id] || {}).best >= Math.ceil(s.items.length * 0.7)).length;
    return { topicsTotal: topics.length, doneTopics, totalWords: ls.totalWords, knownWords: ls.knownWords, listenTotal, listenDone };
  }

  function nextStep() {
    const t = allTopics().find(x => !(store.topics[topicKey(x.sub.id, x.topic.id)] || {}).done);
    if (t) return { hash: '#/grammar/' + t.sub.id + '/' + t.topic.id, label: '📚 ' + t.topic.title };
    const p = POS_ORDER.find(id => (store.words[id] || []).length < Math.min(50, LX().posCount(id)));
    if (p) return { hash: '#/vocab/' + p + '/cards', label: POS[p].emoji + ' Картки: ' + POS[p].uk };
    return { hash: '#/challenge', label: '⚡ Пройти Виклик' };
  }

  /* ============================ NAV ============================ */
  const ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="13" height="14" rx="2.5"/><path d="M8.5 3.5H19a2 2 0 0 1 2 2V16"/><path d="m7 13 2 2 3.5-4"/></svg>',
    headphones: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 11-13h-7l1-7z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.8A8 8 0 1 1 21 12z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 5.5C4.5 4 7.5 4 10 5.5v14C7.5 18 4.5 18 2 19.5z"/><path d="M22 5.5C19.5 4 16.5 4 14 5.5v14c2.5-1.5 5.5-1.5 8 0z"/><path d="M10 5.5c.7-.4 1.3-.6 2-.6s1.3.2 2 .6"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10.5a7 7 0 0 0 14 0"/><path d="M12 17.5V22"/><path d="M8.5 22h7"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>'
  };

  function navLink(hash, icon, label) {
    return '<button class="nav-item" data-hash="' + hash + '">' + ICONS[icon] + '<span>' + label + '</span></button>';
  }
  function navGroup(key, icon, label, hash, subs) {
    return '<div class="nav-group" data-key="' + key + '">' +
      '<button class="nav-item" data-hash="' + hash + '">' + ICONS[icon] + '<span>' + label + '</span>' + ICONS.chev + '</button>' +
      '<div class="nav-sub">' + subs.map(s =>
        '<a href="' + s.hash + '" data-hash="' + s.hash + '"' + (s.exact ? ' data-exact="1"' : '') + '><span class="dot"></span>' + s.emoji + ' ' + esc(s.label) + '</a>'
      ).join('') + '</div></div>';
  }

  const NAV_SG_KEY = 'fluentlab_nav_groups';
  const navSgOpen = () => { try { return new Set(JSON.parse(localStorage.getItem(NAV_SG_KEY) || '[]')); } catch (e) { return new Set(); } };
  const saveNavSg = set => { try { localStorage.setItem(NAV_SG_KEY, JSON.stringify([...set])); } catch (e) { } };

  /* меню з підгрупами: groups = [{ id, emoji, title, items:[{hash,label,emoji}] }] */
  function navGrouped(key, icon, title, hash, groups) {
    const open = navSgOpen();
    return '<div class="nav-group" data-key="' + key + '">' +
      '<button class="nav-item" data-hash="' + hash + '">' + ICONS[icon] + '<span>' + esc(title) + '</span>' + ICONS.chev + '</button>' +
      '<div class="nav-sub nav-sub-grouped">' + groups.map(g =>
        '<div class="nav-sg' + (open.has(g.id) ? ' open' : '') + '" data-sg="' + g.id + '">' +
        '<button class="nav-sg-head" type="button"><span class="nav-sg-title">' + g.emoji + ' ' + esc(g.title) + '</span><span class="nav-sg-count">' + g.items.length + '</span>' + ICONS.chev + '</button>' +
        '<div class="nav-sg-body"><div class="nav-sg-inner">' + g.items.map(s =>
          '<a href="' + s.hash + '" data-hash="' + s.hash + '"><span class="dot"></span>' + s.emoji + ' ' + esc(s.label) + '</a>'
        ).join('') + '</div></div></div>'
      ).join('') + '</div></div>';
  }

  function navGrammarGroup() {
    return navGrouped('grammar', 'book', COURSE.grammar.title, '#/grammar', GR().grammarGroups().map(g => ({
      id: g.id, emoji: g.emoji, title: g.title,
      items: g.items.map(s => ({ hash: '#/grammar/' + s.id, label: s.title, emoji: s.emoji }))
    })));
  }

  function buildNav() {
    const nav = $('#nav');
    nav.innerHTML =
      navLink('#/', 'home', 'Дашборд') +
      navGrammarGroup() +
      navGroup('vocab', 'cards', 'Словник', '#/vocab',
        POS_ORDER.map(p => ({ hash: '#/vocab/' + p, label: POS[p].uk, emoji: POS[p].emoji }))) +
      (window.FLPhrases ? navGrouped('phrases', 'chat', window.FLPhrases.SECTION, '#/phrases', window.FLPhrases.navGroups()) : '') +
      navLink('#/read', 'library', 'Читання') +
      navGroup('diary', 'pen', 'Diary', '#/diary', [
        { hash: '#/diary', label: 'Написати', emoji: '✍️', exact: true },
        { hash: '#/diary/entries', label: 'Мої записи', emoji: '📚' },
        { hash: '#/diary/settings', label: 'Налаштування / Backup', emoji: '⚙️' }
      ]) +
      (window.FLSound ? navGrouped('sound', 'mic', window.FLSound.SECTION, '#/sound', window.FLSound.navGroups()) : '') +
      navGroup('listen', 'headphones', COURSE.listening.title, '#/listen',
        COURSE.listening.subs.map(s => ({ hash: '#/listen/' + s.id, label: (s.id === 'easy' ? 'Легкі речення' : 'Складніші речення'), emoji: s.emoji }))) +
      navLink('#/challenge', 'zap', 'Виклик') +
      navLink('#/placement', 'target', 'Тест рівня');

    $$('.nav-sg-head', nav).forEach(head => {
      head.addEventListener('click', () => {
        const sg = head.parentElement;
        sg.classList.toggle('open');
        const set = navSgOpen();
        sg.classList.contains('open') ? set.add(sg.dataset.sg) : set.delete(sg.dataset.sg);
        saveNavSg(set);
      });
    });
    $$('.nav-group > .nav-item', nav).forEach(btn => {
      btn.addEventListener('click', () => {
        const g = btn.parentElement, willOpen = !g.classList.contains('open');
        g.classList.toggle('open', willOpen);
        if (willOpen && location.hash !== btn.dataset.hash) location.hash = btn.dataset.hash;
      });
    });
    $$('.nav > .nav-item', nav).forEach(btn => {
      btn.addEventListener('click', () => { location.hash = btn.dataset.hash; });
    });
  }

  function syncNav(hash) {
    const n = hash === '' ? '#/' : hash;
    $$('#nav .nav-item').forEach(b => {
      const h = b.dataset.hash;
      b.classList.toggle('active', h === '#/' ? n === '#/' : (n === h || n.startsWith(h + '/')));
    });
    $$('#nav .nav-sub a').forEach(a => {
      const h = a.dataset.hash;
      a.classList.toggle('active', n === h || (!a.dataset.exact && n.startsWith(h + '/')));
    });
    $$('#nav .nav-sg').forEach(sg => {
      if ($('a.active', sg)) sg.classList.add('open');
    });
    $$('#nav .nav-group').forEach(g => {
      if ($('.nav-sub a.active', g)) g.classList.add('open');
    });
  }

  /* кнопка пошуку в шапці — сам модуль живе в js/search.js */
  ['#search-btn', '#search-side'].forEach(sel => {
    const b = $(sel);
    if (b) b.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      if (window.FLSearch) window.FLSearch.open();
    });
  });

  /* ============================ ROUTER ============================ */
  function route() {
    document.body.classList.remove('nav-open');
    const hash = location.hash || '#/';
    const parts = hash.replace(/^#\//, '').split('/').filter(Boolean);
    const view = $('#view');
    window.scrollTo(0, 0);
    document.body.classList.toggle('view-wide', parts[0] === 'diary');
    try {
      if (!parts.length) dashboard(view);
      else if (parts[0] === 'grammar') GR().route(view, parts);
      else if (parts[0] === 'vocab') LX().route(view, parts);
      else if (parts[0] === 'listen') GR().listenRoute(view, parts);
      else if (parts[0] === 'challenge') GR().challengeRoute(view, parts);
      else if (parts[0] === 'read' && window.FLReader) window.FLReader.route(view, parts);
      else if (parts[0] === 'diary' && window.FLDiary) window.FLDiary.route(view, parts);
      else if (parts[0] === 'placement' && window.FLPlacement) window.FLPlacement.route(view, parts);
      else if (parts[0] === 'phrases' && window.FLPhrases) window.FLPhrases.route(view, parts);
      else if (parts[0] === 'sound' && window.FLSound) window.FLSound.route(view, parts);
      else notFound(view);
    } catch (e) {
      console.error(e);
      notFound(view);
    }
    syncNav(hash);
  }

  /* ============================ DASHBOARD ============================ */
  function dashboard(view) {
    setCrumbs([{ label: 'Дашборд' }]);
    const s = stats(), li = levelInfo(), step = nextStep();
    const hour = new Date().getHours();
    const hello = hour < 6 ? 'Доброї ночі' : hour < 12 ? 'Доброго ранку' : hour < 18 ? 'Доброго дня' : 'Доброго вечора';

    const grammarPct = s.topicsTotal ? s.doneTopics / s.topicsTotal : 0;
    const vocabPct = s.totalWords ? s.knownWords / s.totalWords : 0;
    const listenPct = s.listenTotal ? s.listenDone / s.listenTotal : 0;

    const ACH = [
      { icon: '🚀', name: 'Перший крок', desc: 'Зароби перші XP', ok: store.xp > 0 },
      { icon: '🔥', name: 'У вогні', desc: 'Серія з 3 днів', ok: store.streak.n >= 3 },
      { icon: '📚', name: 'Книжник', desc: 'Заверши 5 тем граматики', ok: s.doneTopics >= 5 },
      { icon: '🧠', name: 'Словотворець', desc: 'Вивчи 30 слів у словнику', ok: s.knownWords >= 30 },
      { icon: '💯', name: 'Перфекціоніст', desc: 'Ідеальний результат у тренажері', ok: store.perfect > 0 },
      { icon: '⚡', name: 'Енерджайзер', desc: 'Набери 500 XP', ok: store.xp >= 500 }
    ];

    view.innerHTML =
      '<div class="hero">' +
      '<h2>' + hello + '! 👋</h2>' +
      '<p>Кожні 15 хвилин практики наближають тебе до вільної англійської. Обери розділ і починаймо!</p>' +
      '<a class="btn btn-primary" href="' + step.hash + '">' + step.label + ' →</a>' +
      '</div>' +

      '<div class="stats-row">' +
      '<div class="card stat-card"><div class="stat-top"><div class="ring-wrap">' + ringSvg(li.pct, 46, 5) + '</div><span class="stat-icon">🏅</span></div><div class="stat-value">' + li.lvl + '</div><div class="stat-label">Рівень · ' + li.name + ' (' + store.xp + ' XP)</div></div>' +
      '<div class="card stat-card"><div class="stat-top"><span></span><span class="stat-icon">🔥</span></div><div class="stat-value">' + store.streak.n + '</div><div class="stat-label">' + plural(store.streak.n, 'день', 'дні', 'днів') + ' поспіль</div></div>' +
      '<div class="card stat-card"><div class="stat-top"><span></span><span class="stat-icon">📚</span></div><div class="stat-value">' + s.doneTopics + '/' + s.topicsTotal + '</div><div class="stat-label">тем граматики завершено</div></div>' +
      '<div class="card stat-card"><div class="stat-top"><span></span><span class="stat-icon">🧠</span></div><div class="stat-value">' + s.knownWords + '</div><div class="stat-label">слів вивчено (у базі ' + s.totalWords + ')</div></div>' +
      '</div>' +

      '<h2 class="section-title">Розділи</h2>' +
      '<div class="zone-grid">' +
      zoneCard('#/grammar', '📗', COURSE.grammar.title, COURSE.grammar.subs.length + ' категорій, ' + stats().topicsTotal + ' тем і понад 300 вправ із поясненнями.', grammarPct, s.doneTopics + ' з ' + s.topicsTotal + ' тем') +
      zoneCard('#/vocab', '🗂️', 'Словник', 'За частинами мови: дієслова, іменники, прикметники, прислівники — ' + s.totalWords + ' слів.', vocabPct, 'вивчено ' + s.knownWords + ' слів') +
      (window.FLPhrases ? zoneCard('#/phrases', '🗣️', window.FLPhrases.SECTION, 'Звʼязки, конструкції, підсилювачі, багатозначні слова й розмовні уточнення — ' + window.FLPhrases.ORDER.length + ' тренажерів у ' + window.FLPhrases.GROUPS.length + ' групах.', 0, window.FLPhrases.ORDER.length + ' тренажерів') : '') +
      (window.FLSound ? (() => { const s2 = window.FLSound.summary(); return zoneCard('#/sound', '🗣️', window.FLSound.SECTION, 'Американські звуки: flap T, злиття слів, наголос, слова-пастки, а також числа, дати, час і гроші вголос — ' + s2.items + ' ' + plural(s2.items, 'позиція', 'позиції', 'позицій') + ' з озвученням.', 0, s2.topics + ' ' + plural(s2.topics, 'тема', 'теми', 'тем')); })() : '') +
      (window.FLReader ? (() => { const r = window.FLReader.summary(); return zoneCard('#/read', '📚', 'Читання', r.total + ' адаптованих книг A2–C1: переклад слова по кліку, озвучення, підсвітка розмовних фраз.', r.done / r.total, 'прочитано ' + r.done + ' з ' + r.total + (r.started ? ' · в процесі ' + r.started : '')); })() : '') +
      (window.FLDiary ? (() => { const d = window.FLDiary.summary(); return zoneCard('#/diary', '📝', 'Diary', 'Щоденник англійською: 660 слів і довідник на 582 фрази вставляються в текст одним кліком.', Math.min(1, d.count / 30), d.count ? d.count + ' ' + plural(d.count, 'запис', 'записи', 'записів') + ' · ' + d.words + ' слів' + (d.streak ? ' · 🔥 ' + d.streak : '') : 'ще немає записів'); })() : '') +
      zoneCard('#/listen', '🎧', COURSE.listening.title, 'Диктанти: слухай речення і записуй почуте.', listenPct, s.listenDone + ' з ' + s.listenTotal + ' рівнів') +
      (window.FLPlacement ? (() => { const p = window.FLPlacement.summary(); return zoneCard('#/placement', '🎯', 'Тест рівня', p ? 'Твій рівень ' + p.level + '. Пройди ще раз, щоб побачити прогрес і нові рекомендації.' : '30 питань A1–C1: дізнайся свій рівень і отримай план — теми, книги, словник.', p ? p.correct / p.total : 0, p ? 'рівень ' + p.level + ' · ' + p.correct + '/' + p.total : 'ще не проходив'); })() : '') +
      zoneCard('#/challenge', '⚡', 'Виклик', 'Мікс із 10 випадкових питань з усіх розділів.', store.challengeBest ? store.challengeBest / 10 : 0, store.challengeBest ? 'найкращий: ' + store.challengeBest + '/10' : 'ще не проходив') +
      '</div>' +

      '<h2 class="section-title">Досягнення <small>' + ACH.filter(a => a.ok).length + ' з ' + ACH.length + '</small></h2>' +
      '<div class="badge-row">' +
      ACH.map(a => '<div class="badge ' + (a.ok ? '' : 'locked') + '"><span class="b-icon">' + a.icon + '</span><span><span class="b-name">' + a.name + '</span><br><span class="b-desc">' + a.desc + '</span></span></div>').join('') +
      '</div>';

    animateRings(view);
  }

  function zoneCard(hash, icon, title, desc, pct, label) {
    return '<a class="card clickable zone-card" href="' + hash + '"><div class="zone-icon">' + icon + '</div><h3>' + title + '</h3><p>' + desc + '</p>' +
      progressBar(Math.min(1, pct)) + '<div class="progress-label"><span>' + label + '</span><span>' + Math.round(Math.min(1, pct) * 100) + '%</span></div></a>';
  }

  /* ============================ SETTINGS ============================ */
  function applyTheme(animate) {
    const T = window.FLThemes;
    const root = document.documentElement;
    if (animate) {
      root.classList.add('theme-switching');
      clearTimeout(applyTheme.t);
      applyTheme.t = setTimeout(() => root.classList.remove('theme-switching'), 520);
    }
    if (T) {
      const t = T.apply(store.settings.theme, store.settings.motion);
      if (t.id !== store.settings.theme) { store.settings.theme = t.id; save(); }
    } else {
      root.dataset.theme = store.settings.theme === 'light' ? 'light' : 'dark';
      root.dataset.mode = root.dataset.theme;
    }
    if (window.FLReader) window.FLReader.syncMode();
  }

  /* ============================ СВІТЛОВІ ЕФЕКТИ ============================ */
  const FX_CLASS = { cardGlow: 'fx-card-glow', hoverGlow: 'fx-hover-glow', spotlight: 'fx-spotlight', rim: 'fx-rim', aura: 'fx-aura', shine: 'fx-shine', neon: 'fx-neon', sparks: 'fx-sparks' };
  const FX_LEVELS = [['Слабко', 0.6], ['Середньо', 1], ['Яскраво', 1.6]];
  const fxOn = id => !!(store.settings.fx || {})[id];

  function applyFx() {
    const root = document.documentElement;
    Object.keys(FX_CLASS).forEach(id => root.classList.toggle(FX_CLASS[id], fxOn(id)));
    const lvl = FX_LEVELS[store.settings.fxLevel] || FX_LEVELS[1];
    root.style.setProperty('--fx-i', lvl[1]);
    const aura = document.getElementById('fx-aura');
    if (aura && !fxOn('aura')) aura.classList.remove('on');
  }

  let fxRaf = 0, fxEvt = null, litCard = null;
  function fxPointer(e) {
    fxEvt = e;
    if (fxRaf) return;
    fxRaf = requestAnimationFrame(() => {
      fxRaf = 0;
      const ev = fxEvt;
      if (fxOn('spotlight')) {
        const card = ev.target && ev.target.closest ? ev.target.closest('.card') : null;
        if (litCard && litCard !== card) { litCard.classList.remove('fx-lit'); litCard = null; }
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
          card.style.setProperty('--my', (ev.clientY - r.top) + 'px');
          if (!card.classList.contains('clickable')) { card.classList.add('fx-lit'); litCard = card; }
        }
      }
      if (fxOn('aura') && store.settings.motion) {
        const aura = document.getElementById('fx-aura');
        if (aura) { aura.classList.add('on'); aura.style.transform = 'translate(' + ev.clientX + 'px,' + ev.clientY + 'px)'; }
      }
    });
  }
  function fxSparks(e) {
    if (!fxOn('sparks') || !store.settings.motion || e.button > 0) return;
    const t = e.target.closest && e.target.closest('button, .btn, a.card, .card.clickable, .opt, .nav-item, .tab, .sub-chip');
    if (!t) return;
    const cs = getComputedStyle(document.documentElement);
    const colors = ['--a1', '--a2', '--a3'].map(v => cs.getPropertyValue(v).trim()).filter(c => c && !c.includes('var('));
    if (!colors.length) colors.push('#fff');
    const n = Math.round(10 * (FX_LEVELS[store.settings.fxLevel] || FX_LEVELS[1])[1]);
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      const ang = Math.PI * 2 * i / n + Math.random() * 0.5, dist = 26 + Math.random() * 38;
      s.className = 'fx-spark';
      s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
      s.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
      s.style.setProperty('--dy', Math.sin(ang) * dist + 'px');
      s.style.setProperty('--c', colors[i % colors.length]);
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 700);
    }
  }

  function openFxPanel(onClose) {
    const root = $('#modal-root');
    const draw = () => {
      root.innerHTML =
        '<div class="modal-backdrop" id="fx-m"><div class="modal fx-modal">' +
        '<h3>✨ Світлові ефекти</h3><p class="fx-sub">Вмикай і вимикай — зміни видно одразу.' + (store.settings.motion ? '' : ' ⏸️ Анімації фону вимкнено, тож рухомі ефекти (світло за курсором, іскри, обертання контуру) неактивні.') + '</p>' +
        '<div class="fx-scroll">' +
        '<a class="card clickable fx-preview" href="javascript:void 0" data-preview><h4>👆 Спробуй на мені</h4><p>Наведи курсор і клацни, щоб побачити вибрані ефекти</p><span class="btn btn-primary">Кнопка з відблиском</span></a>' +
        '<div class="fx-opts">' + FX_LIST.map(([id, emoji, name, desc]) =>
          '<label class="fx-item' + (fxOn(id) ? ' on' : '') + '"><span class="fx-item-emoji">' + emoji + '</span>' +
          '<span class="fx-item-body"><span class="fx-item-name">' + name + '</span><span class="fx-item-desc">' + desc + '</span></span>' +
          '<span class="switch"><input type="checkbox" data-fx="' + id + '"' + (fxOn(id) ? ' checked' : '') + '><span class="track"></span></span></label>'
        ).join('') + '</div>' +
        '<div class="fx-row"><span class="m-label">Інтенсивність</span><span class="fx-seg">' + FX_LEVELS.map((l, i) => '<button type="button" data-lvl="' + i + '"' + ((store.settings.fxLevel == null ? 1 : store.settings.fxLevel) === i ? ' class="on"' : '') + '>' + l[0] + '</button>').join('') + '</span></div>' +
        '<div class="fx-quick"><button type="button" data-preset="all">🌟 Увімкнути все</button><button type="button" data-preset="default">↺ Як за замовчуванням</button><button type="button" data-preset="none">🚫 Вимкнути все</button></div>' +
        '</div>' +
        '<div class="m-actions"><button class="btn btn-primary btn-block" id="fx-close">Готово</button></div>' +
        '</div></div>';
    };
    const close = () => { root.innerHTML = ''; if (onClose) onClose(); };
    const bind = () => {
      $('#fx-m').addEventListener('click', e => {
        if (e.target.id === 'fx-m' || e.target.closest('#fx-close')) return close();
        if (e.target.closest('[data-preview]')) { e.preventDefault(); return; }
        const lvl = e.target.closest('[data-lvl]');
        if (lvl) { store.settings.fxLevel = +lvl.dataset.lvl; save(); applyFx(); draw(); bind(); return; }
        const p = e.target.closest('[data-preset]');
        if (p) {
          const v = p.dataset.preset;
          store.settings.fx = v === 'default' ? Object.assign({}, FX_DEFAULTS) : FX_LIST.reduce((o, f) => { o[f[0]] = v === 'all'; return o; }, {});
          save(); applyFx(); draw(); bind();
          showToast(v === 'all' ? '🌟 Усі ефекти увімкнено' : v === 'none' ? '🚫 Ефекти вимкнено' : '↺ Ефекти за замовчуванням');
        }
      });
      $$('#fx-m [data-fx]').forEach(inp => inp.addEventListener('change', () => {
        store.settings.fx = Object.assign({}, store.settings.fx, { [inp.dataset.fx]: inp.checked });
        save(); applyFx();
        inp.closest('.fx-item').classList.toggle('on', inp.checked);
      }));
    };
    draw(); bind();
  }

  const themeName = () => { const t = window.FLThemes && window.FLThemes.get(store.settings.theme); return t ? t.emoji + ' ' + t.name : '🌙 Неон'; };

  function openThemeGallery(onClose) {
    const T = window.FLThemes;
    if (!T) return;
    const root = $('#modal-root');
    const card = t => {
      const vars = '--p-bg:' + t.bg + ';--p-soft:' + t.bgSoft + ';--p-text:' + t.text + ';--p-a1:' + t.a1 + ';--p-a2:' + t.a2 + ';--p-a3:' + t.a3 + ';--p-grad:' + t.grad;
      return '<button class="tm-card' + (t.group === 'dynamic' ? ' dynamic' : '') + (t.id === store.settings.theme ? ' active' : '') + '" data-theme-id="' + t.id + '">' +
        '<div class="tm-preview" style="' + esc(vars) + '">' +
        (t.group === 'dynamic' ? '<span class="tm-live">✨ LIVE</span>' : '') +
        '<div class="tm-mini-card"><span class="tm-mini-dot"></span><span class="tm-mini-line"></span></div>' +
        '<div class="tm-mini-btn"></div>' +
        '</div>' +
        '<div class="tm-meta"><div class="tm-name">' + t.emoji + ' ' + esc(t.name) + '</div>' +
        '<div class="tm-desc">' + esc(t.desc || (t.mode === 'dark' ? 'Темна' : 'Світла')) + '</div></div>' +
        '</button>';
    };
    const group = (title, list) => list.length ? '<div class="tm-group-title">' + title + '</div><div class="tm-grid">' + list.map(card).join('') + '</div>' : '';
    const L = T.list;
    root.innerHTML =
      '<div class="modal-backdrop" id="tm-backdrop"><div class="modal theme-modal">' +
      '<h3>🎨 Теми оформлення</h3>' +
      '<div class="tm-sub">' + L.length + ' тем: ' + L.filter(t => t.group === 'dynamic').length + ' динамічних з анімованим фоном і ' + L.filter(t => t.group !== 'dynamic').length + ' статичних. Тема застосовується одразу.</div>' +
      '<div class="tm-scroll">' +
      group('✨ Динамічні', L.filter(t => t.group === 'dynamic')) +
      group('🌙 Темні', L.filter(t => t.group !== 'dynamic' && t.mode === 'dark')) +
      group('☀️ Світлі', L.filter(t => t.group !== 'dynamic' && t.mode === 'light')) +
      '</div>' +
      '<div class="tm-foot">' +
      '<div class="tm-foot-row"><label class="switch"><input type="checkbox" id="tm-motion" ' + (store.settings.motion ? 'checked' : '') + '><span class="track"></span></label>' +
      '<span><span class="m-label">Анімації фону</span><div class="m-sub">Вимкни, якщо пристрій слабкий або анімації відволікають</div></span></div>' +
      '<span class="tm-foot-row"><button class="btn btn-ghost" id="tm-fx">✨ Ефекти</button><button class="btn btn-primary" id="tm-close">Готово</button></span>' +
      '</div></div></div>';

    const close = () => { root.innerHTML = ''; if (onClose) onClose(); };
    $('#tm-backdrop').addEventListener('click', e => {
      if (e.target.id === 'tm-backdrop') return close();
      const c = e.target.closest('[data-theme-id]');
      if (!c) return;
      store.settings.theme = c.dataset.themeId; save(); applyTheme(true);
      $$('.tm-card', root).forEach(x => x.classList.toggle('active', x === c));
      const t = T.get(store.settings.theme);
      showToast(t.emoji + ' Тема «' + esc(t.name) + '»');
    });
    $('#tm-motion').addEventListener('change', e => {
      store.settings.motion = e.target.checked; save(); applyTheme();
      showToast(e.target.checked ? '✨ Анімації фону увімкнено' : '⏸️ Анімації фону вимкнено');
    });
    $('#tm-close').addEventListener('click', close);
    $('#tm-fx').addEventListener('click', () => openFxPanel(() => openThemeGallery(onClose)));
  }

  function openSettings() {
    const root = $('#modal-root');
    root.innerHTML =
      '<div class="modal-backdrop" id="m-backdrop"><div class="modal">' +
      '<h3>⚙️ Налаштування</h3>' +
      '<div class="m-row"><span><span class="m-label">Тема оформлення</span><div class="m-sub">Зараз: ' + esc(themeName()) + '</div></span>' +
      '<button class="btn btn-ghost" id="set-theme" style="padding:9px 14px;font-size:13px">🎨 Обрати</button></div>' +
      '<div class="m-row"><span><span class="m-label">✨ Світлові ефекти</span><div class="m-sub">Підсвітка карток, прожектор, неон, іскри · увімкнено ' + FX_LIST.filter(f => fxOn(f[0])).length + ' з ' + FX_LIST.length + '</div></span>' +
      '<button class="btn btn-ghost" id="set-fx" style="padding:9px 14px;font-size:13px">Налаштувати</button></div>' +
      '<div class="m-row"><span><span class="m-label">Анімації фону</span><div class="m-sub">Для динамічних тем ✨</div></span>' +
      '<label class="switch"><input type="checkbox" id="set-motion" ' + (store.settings.motion ? 'checked' : '') + '><span class="track"></span></label></div>' +
      '<div class="m-row"><span><span class="m-label">Озвучення англійською</span><div class="m-sub">Синтез мовлення у словнику та аудіюванні</div></span>' +
      '<label class="switch"><input type="checkbox" id="set-sound" ' + (store.settings.sound ? 'checked' : '') + '><span class="track"></span></label></div>' +
      '<div class="m-row"><span><span class="m-label">💾 Резервна копія</span><div class="m-sub">Увесь прогрес: XP, граматика, слова, читання, щоденник, теми</div></span>' +
      '<span class="m-btns"><button class="btn btn-ghost" id="set-export" style="padding:9px 12px;font-size:13px">📤 Експорт</button>' +
      '<button class="btn btn-ghost" id="set-import" style="padding:9px 12px;font-size:13px">📥 Імпорт</button>' +
      '<input type="file" id="set-import-file" accept=".json,application/json" hidden></span></div>' +
      '<div class="m-row"><span><span class="m-label">Скинути прогрес</span><div class="m-sub">XP, серія та всі результати буде видалено</div></span>' +
      '<button class="btn btn-ghost" id="set-reset" style="padding:9px 14px;font-size:13px">Скинути</button></div>' +
      '<div class="m-actions"><button class="btn btn-primary btn-block" id="m-close">Готово</button></div>' +
      '</div></div>';

    $('#m-backdrop').addEventListener('click', e => { if (e.target.id === 'm-backdrop') close(); });
    $('#m-close').addEventListener('click', close);
    $('#set-theme').addEventListener('click', () => openThemeGallery(openSettings));
    $('#set-fx').addEventListener('click', () => openFxPanel(openSettings));
    $('#set-motion').addEventListener('change', e => { store.settings.motion = e.target.checked; save(); applyTheme(); });
    $('#set-sound').addEventListener('change', e => { store.settings.sound = e.target.checked; save(); showToast(e.target.checked ? '🔊 Озвучення увімкнено' : '🔇 Озвучення вимкнено'); });
    $('#set-export').addEventListener('click', exportBackup);
    $('#set-import').addEventListener('click', () => $('#set-import-file').click());
    $('#set-import-file').addEventListener('change', e => { const f = e.target.files[0]; e.target.value = ''; if (f) importBackup(f); });
    $('#set-reset').addEventListener('click', function () {
      if (this.dataset.armed) {
        localStorage.removeItem(KEY);
        C.resetStore();
        applyTheme(); applyFx(); updateHeader(); updateStreak();
        close(); showToast('🗑️ Прогрес скинуто'); route();
      } else {
        this.dataset.armed = '1'; this.textContent = 'Точно? 😱'; this.classList.add('btn-primary');
        setTimeout(() => { if (document.body.contains(this)) { this.dataset.armed = ''; this.textContent = 'Скинути'; this.classList.remove('btn-primary'); } }, 2500);
      }
    });
    function close() { root.innerHTML = ''; }
  }

  /* ============================ BACKUP ============================ */
  const BACKUP_PREFIXES = ['fluentlab_', 'reader_', 'diary_'];
  /* застосунок раніше звався FluentLab — його копії теж відновлюємо */
  const BACKUP_APPS = ['EngLift', 'FluentLab'];
  const backupKeys = () => {
    const out = [];
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (BACKUP_PREFIXES.some(p => k.startsWith(p))) out.push(k); } } catch (e) { }
    return out.sort();
  };
  const localDate = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

  function backupSummary(data) {
    const j = k => { try { return JSON.parse(data[k] || 'null'); } catch (e) { return null; } };
    const st = j(KEY) || {};
    const topicsDone = Object.values(st.topics || {}).filter(t => t && t.done).length;
    const words = Object.values(st.words || {}).reduce((a, arr) => a + (Array.isArray(arr) ? arr.length : 0), 0);
    const diary = j('diary_entries_v1');
    const books = j('reader_done');
    const place = j('fluentlab_placement_v1');
    return [
      ['⭐ XP', st.xp || 0], ['🔥 Серія днів', (st.streak && st.streak.n) || 0], ['📗 Тем граматики пройдено', topicsDone],
      ['🧠 Слів вивчено', words], ['📚 Книг прочитано', Array.isArray(books) ? books.length : 0],
      ['📝 Записів у щоденнику', Array.isArray(diary) ? diary.length : 0], ['🎯 Рівень з тесту', place && place.level ? place.level : '—']
    ];
  }

  function exportBackup() {
    const data = {};
    backupKeys().forEach(k => { data[k] = localStorage.getItem(k); });
    const payload = { app: 'EngLift', kind: 'full-backup', version: 1, exportedAt: new Date().toISOString(), keys: Object.keys(data).length, data };
    const blob = new Blob([JSON.stringify(payload, null, 1)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'englift-backup-' + localDate(new Date()) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('📤 Резервну копію збережено (' + payload.keys + ' розділів даних)');
  }

  function importBackup(file) {
    const reader = new FileReader();
    reader.onload = ev => {
      let p;
      try { p = JSON.parse(ev.target.result); } catch (e) { showToast('❌ Файл пошкоджено або це не JSON'); return; }
      if (p && Array.isArray(p.entries) && !p.data) { showToast('📝 Це backup лише щоденника — імпортуй його в Diary → Налаштування / Backup'); return; }
      const ok = p && BACKUP_APPS.includes(p.app) && p.data && typeof p.data === 'object' &&
        Object.entries(p.data).every(([k, v]) => typeof v === 'string' && BACKUP_PREFIXES.some(px => k.startsWith(px)));
      if (!ok || !Object.keys(p.data).length) { showToast('❌ Це не резервна копія EngLift'); return; }
      const rows = backupSummary(p.data);
      const root = $('#modal-root');
      root.innerHTML = '<div class="modal-backdrop" id="bk-m"><div class="modal">' +
        '<h3>📥 Відновити з резервної копії?</h3>' +
        '<p class="bk-sub">Копія від <b>' + esc(p.exportedAt ? new Date(p.exportedAt).toLocaleString('uk-UA') : 'невідомої дати') + '</b>. Поточний прогрес на цьому пристрої буде <b>замінено</b> даними з файлу.</p>' +
        '<div class="bk-grid">' + rows.map(([l, v]) => '<div class="bk-row"><span>' + l + '</span><b>' + esc(v) + '</b></div>').join('') + '</div>' +
        '<div class="m-actions"><button class="btn btn-ghost btn-block" data-no>Скасувати</button><button class="btn btn-primary btn-block" data-yes>Відновити</button></div>' +
        '</div></div>';
      $('#bk-m').addEventListener('click', e => {
        if (e.target.id === 'bk-m' || e.target.closest('[data-no]')) { root.innerHTML = ''; return; }
        if (!e.target.closest('[data-yes]')) return;
        try {
          backupKeys().forEach(k => localStorage.removeItem(k));
          Object.entries(p.data).forEach(([k, v]) => localStorage.setItem(k, v));
        } catch (err) { showToast('❌ Не вдалося записати дані: ' + esc(err.message)); return; }
        root.innerHTML = '';
        showToast('✅ Відновлено! Перезавантажую…');
        setTimeout(() => location.reload(), 700);
      });
    };
    reader.readAsText(file);
  }

  /* API для модулів (Читання) */
  window.FL = { $, $$, esc, plural, setCrumbs, speakLang, showToast, addXp, touchStreak, confetti, progressBar, notFound: v => notFound(v) };

  /* ============================ INIT ============================ */
  function init() {
    const defs = document.createElement('div');
    defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    defs.innerHTML = '<svg width="0" height="0"><defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--a1)"/><stop offset="1" style="stop-color:var(--a2)"/></linearGradient></defs></svg>';
    document.body.appendChild(defs);

    applyTheme();
    applyFx();
    document.addEventListener('pointermove', fxPointer, { passive: true });
    document.addEventListener('pointerdown', fxSparks, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => { const a = document.getElementById('fx-aura'); if (a) a.classList.remove('on'); });
    buildNav();
    updateHeader();
    updateStreak();

    $('#hamburger').addEventListener('click', () => document.body.classList.toggle('nav-open'));
    $('#sidebar-backdrop').addEventListener('click', () => document.body.classList.remove('nav-open'));
    $('#theme-toggle').addEventListener('click', () => openThemeGallery());
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const onMq = () => { if (mq.matches && store.settings.motion) { store.settings.motion = false; save(); applyTheme(); } };
      if (mq.addEventListener) mq.addEventListener('change', onMq);
    }
    $('#settings-btn').addEventListener('click', openSettings);
    window.addEventListener('scroll', () => $('.topbar').classList.toggle('scrolled', window.scrollY > 8));
    window.addEventListener('hashchange', route);
    if (!location.hash) history.replaceState(null, '', '#/');
    route();
  }

  init();
})();

