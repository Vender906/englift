/* ============================================================
   EngLift — глобальний пошук по всьому застосунку.
   Індекс (js/search/index-data.js) вантажиться ліниво: при першому
   відкритті пошуку, а не на старті.
   Ctrl/⌘ + K або «/» — відкрити, ↑ ↓ — вибір, Enter — перейти, Esc — закрити.
   ============================================================ */
(function () {
  'use strict';

  const SRC = 'js/search/index-data.js';
  const RECENT_KEY = 'fluentlab_search_recent';
  const MAX_RECENT = 6;
  const PER_GROUP = 6;
  const MAX_TOTAL = 30;

  const KINDS = [
    { id: 0, emoji: '🗂️', label: 'Словник' },
    { id: 1, emoji: '🗣️', label: 'Фрази і конструкції' },
    { id: 2, emoji: '🎧', label: 'Вимова' },
    { id: 3, emoji: '📗', label: 'Граматика' },
    { id: 4, emoji: '📚', label: 'Книги' },
    { id: 5, emoji: '🧭', label: 'Розділи' }
  ];
  const FILTERS = [['', 'Усе'], ['0', '🗂️ Слова'], ['1', '🗣️ Фрази'], ['2', '🎧 Вимова'], ['3', '📗 Граматика'], ['4', '📚 Книги'], ['5', '🧭 Розділи']];

  const C = () => window.FLCore || window.FL;
  const esc = s => C().esc(String(s == null ? '' : s));
  const $ = id => document.getElementById(id);

  /* довжину не змінюємо — так позиції збігів підходять і для підсвітки */
  const normLoose = s => String(s || '').toLowerCase().replace(/[’‘ʼ`´]/g, "'").replace(/[«»"“”(),.!?;:…]/g, ' ');
  const norm = s => normLoose(s).replace(/\s+/g, ' ').trim();

  let DATA = null, loading = null, rows = null;
  let state = { q: '', filter: '', sel: 0, results: [], open: false, lastFocus: null };

  /* ---------------------------- дані ---------------------------- */
  function prepare(raw) {
    DATA = raw;
    /* словник маршрутів і підписів нормалізуємо один раз — рядків тисячі, а значень десятки */
    const normPool = raw.pool.map(norm);
    rows = raw.items.map(r => ({
      t: r[0], u: r[1], k: r[2], h: raw.pool[r[3]], x: raw.pool[r[4]], adult: r[5] === 1,
      nt: norm(r[0]), nu: norm(r[1]), nx: normPool[r[4]]
    }));
    return rows;
  }

  function ensure() {
    if (rows) return Promise.resolve(rows);
    if (window.SEARCH_INDEX) return Promise.resolve(prepare(window.SEARCH_INDEX));
    if (loading) return loading;
    loading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SRC;
      s.onload = () => window.SEARCH_INDEX ? resolve(prepare(window.SEARCH_INDEX)) : reject(new Error('no index'));
      s.onerror = () => { loading = null; s.remove(); reject(new Error('load failed')); };
      document.head.appendChild(s);
    });
    return loading;
  }

  /* ---------------------------- пошук ---------------------------- */
  const adultOk = () => !!(window.FLLexis && window.FLLexis.adultOn && window.FLLexis.adultOn());

  /* один токен проти одного поля: що точніше збіг — то більший бал */
  function fieldScore(field, token) {
    if (!field) return 0;
    const i = field.indexOf(token);
    if (i < 0) return 0;
    if (field === token) return 1000;
    if (i === 0) return 780 - Math.min(120, field.length - token.length);
    if (field[i - 1] === ' ' || field[i - 1] === '-' || field[i - 1] === "'") return 560 - Math.min(120, field.length - token.length);
    return 320 - Math.min(120, field.length - token.length);
  }

  /* один прохід по індексу для заданого набору токенів */
  function pass(tokens, filter, penalty, seen, out) {
    const showAdult = adultOk();
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      if (seen.has(r)) continue;
      if (r.adult && !showAdult) continue;
      if (filter !== '' && r.k !== +filter) continue;
      let total = 0, ok = true;
      for (let j = 0; j < tokens.length; j++) {
        const tk = tokens[j];
        /* підпис (розділ, частина мови, тренажер) теж шукаємо — але він важить менше за саме слово */
        const best = Math.max(fieldScore(r.nt, tk), fieldScore(r.nu, tk) * 0.94, fieldScore(r.nx, tk) * 0.5);
        if (!best) { ok = false; break; }
        total += best;
      }
      if (!ok) continue;
      let score = total / tokens.length * penalty;
      if (r.k === 5) score += 70;              /* розділи легше знайти навігацією */
      if (r.nt.length <= 12) score += 15;      /* короткі слова — частіше саме те, що шукають */
      seen.add(r);
      out.push({ r: r, score: score });
    }
  }

  /* українські відмінки: «співбесіда» не збігається з «на співбесіді», тому
     другим проходом шукаємо по основі слова — без останніх літер */
  const stem = t => t.length >= 6 ? t.slice(0, t.length - 2) : (t.length >= 5 ? t.slice(0, t.length - 1) : t);

  function search(q, filter) {
    const query = norm(q);
    if (!query || !rows) return [];
    const tokens = query.split(' ');
    const out = [], seen = new Set();
    pass(tokens, filter, 1, seen, out);
    const stems = tokens.map(stem);
    if (out.length < 5 && stems.some((s2, i) => s2 !== tokens[i])) pass(stems, filter, 0.72, seen, out);
    out.sort((a, b) => b.score - a.score || a.r.t.length - b.r.t.length);
    /* рівномірно між групами: не даємо словнику зайняти весь список */
    const groups = new Map();
    let taken = 0;
    out.forEach(o => {
      const g = groups.get(o.r.k) || (groups.set(o.r.k, []), groups.get(o.r.k));
      if (g.length < PER_GROUP && taken < MAX_TOTAL) { g.push(o); taken++; }
    });
    /* кожен тип — одним блоком, блоки за найкращим результатом усередині */
    return [].concat.apply([], [...groups.values()].sort((x, y) => y[0].score - x[0].score));
  }

  /* ---------------------------- підсвітка ---------------------------- */
  function mark(text, q) {
    const raw = String(text || '');
    const tokens = norm(q).split(' ').filter(Boolean);
    if (!tokens.length) return esc(raw);
    const low = normLoose(raw);
    const hits = [];
    tokens.forEach(tk => {
      let from = 0, i;
      while ((i = low.indexOf(tk, from)) >= 0) { hits.push([i, i + tk.length]); from = i + tk.length; }
    });
    if (!hits.length) return esc(raw);
    hits.sort((a, b) => a[0] - b[0]);
    /* нормалізація може зсунути позиції — підстраховуємось довжиною */
    let res = '', pos = 0;
    hits.forEach(([a, b]) => {
      if (a < pos || b > raw.length) return;
      res += esc(raw.slice(pos, a)) + '<mark>' + esc(raw.slice(a, b)) + '</mark>';
      pos = b;
    });
    return res + esc(raw.slice(pos));
  }

  /* ---------------------------- недавні запити ---------------------------- */
  function recents() {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]').slice(0, MAX_RECENT); } catch (e) { return []; }
  }
  function remember(q) {
    const v = String(q || '').trim();
    if (v.length < 2) return;
    try {
      const list = [v].concat(recents().filter(x => x.toLowerCase() !== v.toLowerCase())).slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(list));
    } catch (e) { /* приватний режим — просто не памʼятаємо */ }
  }

  /* ---------------------------- перехід до результату ---------------------------- */
  /* після переходу підставляємо слово в локальний пошук розділу або підсвічуємо рядок */
  function afterJump(r) {
    const tries = 24;
    const term = r.t;
    let n = 0;
    const tick = () => {
      if (++n > tries) return;
      if (r.k === 0 || r.k === 1) {
        const inp = document.getElementById(r.k === 0 ? 'lex-search' : 'ph-q');
        if (!inp) return setTimeout(tick, 120);
        if (inp.value !== term) {
          inp.value = term;
          inp.dispatchEvent(new Event('input', { bubbles: true }));
        }
        return;
      }
      if (r.k === 2) {
        const want = norm(term);
        const item = [].slice.call(document.querySelectorAll('.pr-item')).find(el => norm(el.textContent).indexOf(want) >= 0);
        if (!item) return setTimeout(tick, 120);
        item.classList.add('srch-flash');
        if (item.scrollIntoView) item.scrollIntoView({ block: 'center', behavior: C().reducedMotion && C().reducedMotion() ? 'auto' : 'smooth' });
        setTimeout(() => item.classList.remove('srch-flash'), 1600);
      }
    };
    setTimeout(tick, 60);
  }

  function go(r) {
    remember(state.q);
    close();
    if (location.hash === r.h) window.dispatchEvent(new HashChangeEvent('hashchange'));
    else location.hash = r.h;
    afterJump(r);
  }

  /* ---------------------------- рендер ---------------------------- */
  function resultsHtml() {
    if (!rows) return '<div class="srch-note">⏳ Готуємо індекс…</div>';
    if (!state.q.trim()) {
      const rec = recents();
      return (rec.length ? '<div class="srch-group"><div class="srch-group-head">🕘 Нещодавнє</div>' +
        rec.map(q => '<button class="srch-item srch-recent" data-q="' + esc(q) + '"><span class="srch-kind">🕘</span>' +
          '<span class="srch-main">' + esc(q) + '</span></button>').join('') + '</div>' : '') +
        '<div class="srch-note">Шукай слова, фрази, теми граматики, книги й розділи — українською або англійською. ' +
        'Наприклад: <b>decision</b>, <b>рішення</b>, <b>outta</b>, <b>Present Perfect</b>, <b>ідіоми</b>.</div>';
    }
    if (!state.results.length) {
      return '<div class="srch-note">Нічого не знайшли за запитом «' + esc(state.q) + '».<br>' +
        'Спробуй коротший запит або зніми фільтр.</div>';
    }
    let html = '', lastKind = null, i = 0;
    state.results.forEach(o => {
      const r = o.r;
      if (r.k !== lastKind) {
        if (lastKind !== null) html += '</div>';
        const k = KINDS[r.k];
        html += '<div class="srch-group"><div class="srch-group-head">' + k.emoji + ' ' + esc(k.label) + '</div>';
        lastKind = r.k;
      }
      html += '<a class="srch-item' + (i === state.sel ? ' sel' : '') + '" role="option" aria-selected="' + (i === state.sel) + '"' +
        ' id="srch-opt-' + i + '" data-i="' + i + '" href="' + esc(r.h) + '">' +
        '<span class="srch-kind">' + KINDS[r.k].emoji + '</span>' +
        '<span class="srch-main"><b>' + mark(r.t, state.q) + '</b>' + (r.u ? '<span class="srch-uk">' + mark(r.u, state.q) + '</span>' : '') + '</span>' +
        (r.x ? '<span class="srch-extra">' + esc(r.x) + '</span>' : '') + '</a>';
      i++;
    });
    return html + (lastKind !== null ? '</div>' : '');
  }

  function draw() {
    const box = $('srch-results');
    if (!box) return;
    box.innerHTML = resultsHtml();
    const count = $('srch-count');
    if (count) count.textContent = state.q.trim() && rows ? state.results.length + (state.results.length >= MAX_TOTAL ? '+' : '') + ' знайдено' : '';
    const sel = box.querySelector('.srch-item.sel');
    if (sel) {
      if (sel.scrollIntoView) sel.scrollIntoView({ block: 'nearest' });
      const inp = $('srch-input');
      if (inp) inp.setAttribute('aria-activedescendant', sel.id || '');
    }
  }

  function runQuery() {
    state.results = search(state.q, state.filter);
    state.sel = 0;
    draw();
  }

  function shell() {
    return '<div class="srch-backdrop" id="srch-backdrop"></div>' +
      '<div class="srch-box" role="dialog" aria-modal="true" aria-label="Пошук по застосунку">' +
      '<div class="srch-head"><span class="srch-ico">🔍</span>' +
      '<input id="srch-input" class="srch-input" type="search" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="srch-results" ' +
      'placeholder="Слово, фраза, тема, книга…" value="' + esc(state.q) + '">' +
      '<span class="srch-count" id="srch-count"></span>' +
      '<button class="srch-close" id="srch-close" aria-label="Закрити пошук">✕</button></div>' +
      '<div class="srch-chips" id="srch-chips">' + FILTERS.map(([v, label]) =>
        '<button class="srch-chip' + (state.filter === v ? ' on' : '') + '" data-f="' + v + '">' + esc(label) + '</button>').join('') + '</div>' +
      '<div class="srch-results" id="srch-results" role="listbox" aria-label="Результати пошуку"></div>' +
      '<div class="srch-foot"><span><kbd>↑</kbd><kbd>↓</kbd> вибір</span><span><kbd>Enter</kbd> відкрити</span>' +
      '<span><kbd>Esc</kbd> закрити</span><span class="srch-foot-hint">' + (rows ? rows.length.toLocaleString('uk-UA') + ' записів' : 'індекс вантажиться…') + '</span></div>' +
      '</div>';
  }

  function move(step) {
    if (!state.results.length) return;
    state.sel = (state.sel + step + state.results.length) % state.results.length;
    draw();
  }

  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); return; }
    if (e.key === 'Enter') {
      e.preventDefault();
      const hit = state.results[state.sel];
      if (hit) go(hit.r);
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const idx = FILTERS.findIndex(f => f[0] === state.filter);
      setFilter(FILTERS[(idx + (e.shiftKey ? -1 : 1) + FILTERS.length) % FILTERS.length][0]);
    }
  }

  function setFilter(v) {
    state.filter = v;
    const chips = $('srch-chips');
    if (chips) [].forEach.call(chips.children, el => el.classList.toggle('on', el.dataset.f === v));
    runQuery();
  }

  function open(preset) {
    if (state.open) { const i = $('srch-input'); if (i) i.focus(); return; }
    state.open = true;
    state.lastFocus = document.activeElement;
    if (preset != null) state.q = preset;
    const root = document.getElementById('search-root') || (() => {
      const d = document.createElement('div');
      d.id = 'search-root';
      document.body.appendChild(d);
      return d;
    })();
    root.innerHTML = shell();
    document.body.classList.add('srch-open');
    const inp = $('srch-input');
    inp.focus();
    /* попередній запит лишається під рукою, але виділений — новий ввід одразу його замінює */
    if (inp.value) inp.select();

    let t = null;
    inp.addEventListener('input', () => {
      state.q = inp.value;
      clearTimeout(t);
      t = setTimeout(runQuery, 70);
    });
    inp.addEventListener('keydown', onKey);
    $('srch-close').addEventListener('click', close);
    $('srch-backdrop').addEventListener('click', close);
    $('srch-chips').addEventListener('click', e => {
      const chip = e.target.closest('[data-f]');
      if (chip) { setFilter(chip.dataset.f); inp.focus(); }
    });
    $('srch-results').addEventListener('click', e => {
      const rec = e.target.closest('.srch-recent');
      if (rec) { inp.value = state.q = rec.dataset.q; runQuery(); inp.focus(); return; }
      const item = e.target.closest('.srch-item[data-i]');
      if (item) { e.preventDefault(); const hit = state.results[+item.dataset.i]; if (hit) go(hit.r); }
    });
    $('srch-results').addEventListener('mousemove', e => {
      const item = e.target.closest('.srch-item[data-i]');
      if (item && +item.dataset.i !== state.sel) { state.sel = +item.dataset.i; draw(); }
    });

    draw();
    ensure().then(() => {
      const hint = document.querySelector('.srch-foot-hint');
      if (hint) hint.textContent = rows.length.toLocaleString('uk-UA') + ' записів';
      if (state.open) runQuery();
    }).catch(() => {
      const box = $('srch-results');
      if (box) box.innerHTML = '<div class="srch-note">😕 Не вдалося завантажити індекс пошуку. Перевір зʼєднання.</div>';
    });
  }

  function close() {
    if (!state.open) return;
    state.open = false;
    const root = document.getElementById('search-root');
    if (root) root.innerHTML = '';
    document.body.classList.remove('srch-open');
    if (state.lastFocus && state.lastFocus.focus) state.lastFocus.focus();
  }

  /* ---------------------------- гарячі клавіші ---------------------------- */
  function typing(el) {
    return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
  }
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K' || e.key === 'л' || e.key === 'Л')) {
      e.preventDefault();
      state.open ? close() : open();
      return;
    }
    if (e.key === '/' && !state.open && !typing(e.target)) { e.preventDefault(); open(); }
  });

  window.FLSearch = { open, close, ensure, search, isOpen: () => state.open };
})();
