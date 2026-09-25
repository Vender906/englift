/* ============================================================
   EngLift — спільне ядро: сховище прогресу, XP, серія, утиліти, озвучення
   Усі інші модулі беруть звідси все спільне: window.FLCore.
   ============================================================ */
(function () {
  'use strict';

  /* ============================ UTILS ============================ */
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; };
  const norm = s => String(s).toLowerCase().replace(/[‘’ʼ`]/g, "'").replace(/[.,!?;:()«»""']/g, '').replace(/\s+/g, ' ').trim();
  const fillEq = (a, b) => norm(a).replace(/'/g, '') === norm(b).replace(/'/g, '');
  const plural = (n, one, few, many) => { const m10 = n % 10, m100 = n % 100; if (m10 === 1 && m100 !== 11) return one; if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few; return many; };
  /* відстань Дамерау-Левенштейна ≤ 1: одна зайва, пропущена, замінена чи переставлена літера */
  function oneTypo(a, b) {
    if (a === b) return true;
    if (Math.abs(a.length - b.length) > 1) return false;
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    if (a.length === b.length) return a.slice(i + 1) === b.slice(i + 1) || (a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2));
    return a.length > b.length ? a.slice(i + 1) === b.slice(i) : a.slice(i) === b.slice(i + 1);
  }

  /* ============================ STORE ============================ */
  const KEY = 'fluentlab_v2';
  const reducedMotion = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  /* світлові ефекти: id → [emoji, назва, опис, за замовчуванням] */
  const FX_LIST = [
    ['cardGlow', '🔆', 'Підсвітка карток', 'М’яке кольорове сяйво навколо всіх карток', false],
    ['hoverGlow', '💡', 'Сяйво при наведенні', 'Картка світиться, коли наводиш курсор', true],
    ['spotlight', '🔦', 'Прожектор за курсором', 'Світлова пляма рухається за мишею всередині картки', true],
    ['rim', '🌈', 'Неоновий контур', 'Кольоровий обідок, що обертається навколо картки під курсором', false],
    ['aura', '✨', 'Світло за курсором', 'Велике м’яке світло рухається за мишею по фону', false],
    ['shine', '💫', 'Відблиск на кнопках', 'Блиск пробігає по головних кнопках при наведенні', true],
    ['neon', '🟣', 'Неонові заголовки', 'Легке світіння заголовків і активного пункту меню', false],
    ['sparks', '🎆', 'Іскри при кліку', 'Кольорові іскри розлітаються від кнопок і карток', false]
  ];
  const FX_DEFAULTS = FX_LIST.reduce((o, f) => { o[f[0]] = f[4]; return o; }, {});
  const defaultStore = { xp: 0, streak: { n: 0, last: '' }, topics: {}, words: {}, listen: {}, challengeBest: 0, perfect: 0, adult: false, settings: { theme: 'dark', sound: true, motion: !reducedMotion(), fx: Object.assign({}, FX_DEFAULTS), fxLevel: 1 } };

  function loadStore() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return JSON.parse(JSON.stringify(defaultStore));
      const s = JSON.parse(raw);
      const base = JSON.parse(JSON.stringify(defaultStore));
      const settings = Object.assign(base.settings, s.settings || {});
      settings.fx = Object.assign({}, FX_DEFAULTS, (s.settings && s.settings.fx) || {});
      return Object.assign(base, s, { settings });
    } catch (e) { return JSON.parse(JSON.stringify(defaultStore)); }
  }
  let store = loadStore();
  const save = () => localStorage.setItem(KEY, JSON.stringify(store));
  /* скидання прогресу: об'єкт той самий (на нього посилаються всі модулі), вміст новий */
  function resetStore() {
    const fresh = JSON.parse(JSON.stringify(defaultStore));
    Object.keys(store).forEach(k => delete store[k]);
    Object.assign(store, fresh);
    save();
  }

  const LEVEL_XP = 150;
  const levelNames = ['Новачок', 'Учень', 'Дослідник', 'Студент', 'Знавець', 'Експерт', 'Профі', 'Гуру', 'Майстер', 'Легенда'];
  function levelInfo() {
    const lvl = Math.floor(store.xp / LEVEL_XP) + 1;
    const into = store.xp % LEVEL_XP;
    return { lvl, into, pct: into / LEVEL_XP, name: levelNames[Math.min(lvl - 1, levelNames.length - 1)] };
  }

  const topicKey = (subId, topicId) => subId + '__' + topicId;

  function touchStreak() {
    const today = new Date();
    const key = today.toISOString().slice(0, 10);
    const y = new Date(today); y.setDate(y.getDate() - 1);
    const yKey = y.toISOString().slice(0, 10);
    if (store.streak.last === key) return;
    store.streak.n = (store.streak.last === yKey) ? store.streak.n + 1 : 1;
    store.streak.last = key;
    save(); updateStreak();
  }

  function markKnown(posId, idx) {
    const arr = store.words[posId] || (store.words[posId] = []);
    if (!arr.includes(idx)) { arr.push(idx); save(); }
  }
  const isKnown = (posId, idx) => ((store.words[posId] || []).includes(idx));

  /* ============================ UI HELPERS ============================ */
  let toastTimer;
  function showToast(msg) {
    const t = $('#toast'); t.innerHTML = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  function updateHeader(bump) {
    const li = levelInfo();
    $('#xp-value').textContent = store.xp;
    $('#level-value').textContent = 'Рівень ' + li.lvl + ' · ' + li.name;
    if (bump) {
      const pill = $('#xp-pill');
      pill.classList.remove('bump'); void pill.offsetWidth; pill.classList.add('bump');
    }
  }
  function updateStreak() { $('#streak-count').textContent = store.streak.n; }

  function addXp(n) {
    if (!n || n <= 0) return;
    store.xp += n; save(); updateHeader(true);
    const rect = $('#xp-pill').getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'xp-float'; el.textContent = '+' + n + ' XP';
    el.style.left = (rect.left + rect.width / 2 - 20) + 'px';
    el.style.top = (rect.bottom + 6) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  }

  /* confetti */
  const cv = $('#confetti'), cx = cv.getContext('2d');
  let parts = [], raf = null;
  function confetti() {
    if (!cx) return;
    cv.width = innerWidth; cv.height = innerHeight;
    const cs = getComputedStyle(document.documentElement);
    const colors = ['--a1', '--a2', '--a3'].map(v => cs.getPropertyValue(v).trim()).filter(c => c && !c.includes('var(')).concat(['#34e39a', '#ffc857']);
    for (let i = 0; i < 160; i++) parts.push({
      x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * 0.4,
      vx: (Math.random() - 0.5) * 2.6, vy: 2 + Math.random() * 3.4,
      s: 5 + Math.random() * 6, c: colors[i % colors.length],
      r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3
    });
    if (!raf) loop();
  }
  function loop() {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.r += p.vr;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
      cx.fillStyle = p.c; cx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.62); cx.restore();
    });
    parts = parts.filter(p => p.y < cv.height + 30);
    if (parts.length) raf = requestAnimationFrame(loop);
    else { raf = null; cx.clearRect(0, 0, cv.width, cv.height); }
  }

  /* speech */
  let voicesCache = [];
  function loadVoices() { if (window.speechSynthesis) voicesCache = speechSynthesis.getVoices(); }
  if (window.speechSynthesis) { speechSynthesis.onvoiceschanged = loadVoices; loadVoices(); }

  function speakLang(text, lang, rate, btn) {
    if (!window.speechSynthesis) { showToast('😕 Браузер не підтримує синтез мовлення'); return false; }
    if (!store.settings.sound) { showToast('🔇 Озвучення вимкнено в налаштуваннях'); return false; }
    try { speechSynthesis.cancel(); } catch (e) { }
    const u = new SpeechSynthesisUtterance(String(text).trim());
    u.lang = lang || 'en-US'; u.rate = rate || 0.94;
    const exact = voicesCache.filter(v => v.lang === u.lang);
    const fam = voicesCache.filter(v => v.lang && v.lang.startsWith(u.lang.slice(0, 2)));
    const v = exact.find(v => /google|microsoft/i.test(v.name)) || exact[0] || fam[0];
    if (v) u.voice = v;
    if (btn) { btn.classList.add('playing'); u.onend = u.onerror = () => btn.classList.remove('playing'); }
    speechSynthesis.speak(u);
    return true;
  }
  const speak = (text, btn) => speakLang(text, 'en-US', 0.94, btn);
  const ttsClean = t => String(t || '').replace(/[()\/]/g, ' ').replace(/\s+/g, ' ').trim();

  /* svg rings */
  function ringSvg(pct, size, stroke) {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r;
    return '<svg width="' + size + '" height="' + size + '">' +
      '<circle class="ring-bg" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke-width="' + stroke + '"/>' +
      '<circle class="ring-fg" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke-width="' + stroke + '" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + c.toFixed(1) + '" data-target="' + (c * (1 - Math.max(0, Math.min(1, pct)))).toFixed(1) + '"/></svg>';
  }
  function animateRings(root) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      $$('.ring-fg', root).forEach(c => { c.style.strokeDashoffset = c.dataset.target; });
    }));
  }

  const progressBar = (pct, cls) => '<div class="progress ' + (cls || '') + '"><i style="width:' + Math.round(pct * 100) + '%"></i></div>';

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

  /* групи граматики: категорія без групи потрапляє в «Інше» */
  function grammarGroups() {
    const byId = id => COURSE.grammar.subs.find(s => s.id === id);
    const used = new Set();
    const groups = (COURSE.grammar.groups || []).map(g => {
      const subs = g.subs.map(byId).filter(Boolean);
      subs.forEach(s => used.add(s.id));
      return Object.assign({}, g, { items: subs });
    }).filter(g => g.items.length);
    const rest = COURSE.grammar.subs.filter(s => !used.has(s.id));
    if (rest.length) groups.push({ id: 'g-other', emoji: '📦', title: 'Інше', items: rest });
    return groups;
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
    return navGrouped('grammar', 'book', COURSE.grammar.title, '#/grammar', grammarGroups().map(g => ({
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

  function setCrumbs(parts) {
    $('#crumbs').innerHTML = parts.map((p, i) =>
      (i < parts.length - 1 && p.hash ? '<a href="' + p.hash + '">' + esc(p.label) + '</a>' : '<span class="crumb-last">' + esc(p.label) + '</span>')
    ).join('<span class="crumb-sep">›</span>');
  }

  function notFound(view) {
    setCrumbs([{ label: '404' }]);
    view.innerHTML = '<div class="page-head"><span class="emoji-big">🧭</span><h1>Сторінку не знайдено</h1><p>Схоже, такого розділу не існує.</p></div><a class="btn btn-primary" href="#/">← На дашборд</a>';
  }

  window.FLCore = {
    $, $$, esc, norm, fillEq, plural, oneTypo, shuffle, reducedMotion,
    KEY, defaultStore, FX_LIST, FX_DEFAULTS, store, save, loadStore, resetStore,
    levelInfo, topicKey, touchStreak, markKnown, isKnown,
    showToast, updateHeader, updateStreak, addXp, confetti,
    speakLang, speak, ttsClean, ringSvg, animateRings, progressBar,
    setCrumbs, notFound
  };

})();
