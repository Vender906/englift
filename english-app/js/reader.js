/* ============================================================
   EngLift — Читання: бібліотека адаптованих книг
   Функції перенесено з reader.html: фільтри за рівнем і жанром,
   прогрес, переклад слова по кліку (слова книги → словник →
   кеш → онлайн), озвучення й переклад речень, «усі переклади»,
   підсвітка розмовних фраз із легендою, розмір шрифту, ширина
   колонки, теми читалки, клавіші ← → Enter Space T.
   Дані (js/reader/books-data.js) підвантажуються лише тут.
   ============================================================ */
(function () {
  'use strict';

  const DATA_SRC = 'js/reader/books-data.js';
  const BOOK_COUNT = 135;
  const FINISH_XP = 50;

  /* ---------- storage (ті самі ключі, що й у reader.html) ---------- */
  const ls = {
    get(k, def) { try { const v = localStorage.getItem(k); return v == null ? def : v; } catch (e) { return def; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } },
    json(k, def) { try { return JSON.parse(localStorage.getItem(k) || '') || def; } catch (e) { return def; } }
  };

  const FONT_CLASSES = ['fs-s', 'fs-m', 'fs-l', 'fs-xl'];
  const WIDTH_CLASSES = ['w-narrow', 'w-medium', 'w-wide', 'w-full'];
  const READER_THEMES = [
    { id: 'app', label: '✨ Як застосунок', bg: 'var(--bg-soft)', accent: 'var(--a1)' },
    { id: 'cream', label: '📜 Кремова', bg: '#f2ead4', accent: '#8b6b3f' },
    { id: 'paper', label: '📄 Папір', bg: '#f5f5f0', accent: '#4a4a4a' },
    { id: 'sepia', label: '🕯️ Сепія', bg: '#1a1410', accent: '#d4a373' },
    { id: 'midnight', label: '🌌 Опівнічна', bg: '#0d1526', accent: '#7dd3fc' },
    { id: 'charcoal', label: '🌑 Вугільна', bg: '#0f0f0f', accent: '#c9a86a' },
    { id: 'forest', label: '🌲 Лісова', bg: '#0f1a15', accent: '#86efac' },
    { id: 'slate', label: '🌫️ Сталева', bg: '#0a0a0f', accent: '#cbd5e1' }
  ];
  const DARK_RTHEMES = ['sepia', 'midnight', 'charcoal', 'forest', 'slate'];

  let fontSize = clampInt(ls.get('reader_font_size', '1'), 0, 3, 1);
  let widthIdx = clampInt(ls.get('reader_width', '1'), 0, 3, 1);
  let filterLevel = ls.get('reader_flt_level', '');
  let filterGenre = ls.get('reader_flt_genre', '');
  let search = '';
  let progress = ls.json('reader_progress', {});
  let doneBooks = new Set(ls.json('reader_done', []));
  let translationCache = ls.json('reader_tr_cache', {});
  let readerTheme = ls.get('reader_theme', 'app');
  if (!READER_THEMES.some(t => t.id === readerTheme)) readerTheme = 'app';

  let D = null;              // READER_DATA
  let currentBook = null;
  let currentIdx = 0;
  let allUkOn = false;
  let loading = null;

  function clampInt(v, min, max, def) { const n = parseInt(v, 10); return isNaN(n) ? def : Math.max(min, Math.min(max, n)); }
  const FL = () => window.FL;
  const esc = s => FL().esc(s);

  function saveProgress() {
    ls.set('reader_progress', JSON.stringify(progress));
    ls.set('reader_done', JSON.stringify([...doneBooks]));
  }

  function ensureData() {
    if (window.READER_DATA) { D = window.READER_DATA; return Promise.resolve(D); }
    if (loading) return loading;
    loading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = DATA_SRC;
      s.onload = () => { if (window.READER_DATA) { D = window.READER_DATA; resolve(D); } else { loading = null; reject(new Error('no data')); } };
      s.onerror = () => { loading = null; s.remove(); reject(new Error('load failed')); };
      document.head.appendChild(s);
    });
    return loading;
  }

  /* ============================ ROUTES ============================ */
  function route(view, parts) {
    hideTooltip();
    if (window.speechSynthesis) { try { speechSynthesis.cancel(); } catch (e) { } }
    const bookId = parts[1];
    if (parts.length > 2) return FL().notFound(view);
    FL().setCrumbs(bookId ? [{ label: 'Читання', hash: '#/read' }, { label: '…' }] : [{ label: 'Читання' }]);
    if (!D) view.innerHTML = loadingHtml();
    ensureData().then(() => {
      if (location.hash.replace(/^#\//, '').split('/')[0] !== 'read') return; // користувач уже пішов
      const cur = location.hash.replace(/^#\//, '').split('/').filter(Boolean);
      if ((cur[1] || '') !== (bookId || '')) return;
      if (bookId) {
        const b = D.BOOKS.find(x => x.id === bookId);
        b ? readerPage(view, b) : FL().notFound(view);
      } else {
        currentBook = null;
        libraryPage(view);
      }
    }).catch(() => {
      view.innerHTML = '<div class="page-head"><span class="emoji-big">📡</span><h1>Не вдалося завантажити книги</h1>' +
        '<p>Перевір з’єднання й спробуй ще раз. Після першого завантаження бібліотека працює офлайн.</p></div>' +
        '<button class="btn btn-primary" id="rd-retry">🔁 Спробувати ще раз</button>';
      document.getElementById('rd-retry').addEventListener('click', () => route(view, parts));
    });
  }

  function loadingHtml() {
    return '<div class="rd-loading"><div class="rd-book-anim"><span></span><span></span><span></span></div>' +
      '<h2>Відкриваємо бібліотеку…</h2><p>Завантажуємо ' + BOOK_COUNT + ' адаптованих книг — лише першого разу, далі все працює офлайн.</p></div>';
  }

  /* ============================ LIBRARY ============================ */
  function libraryPage(view) {
    const books = D.BOOKS;
    const read = books.filter(b => doneBooks.has(b.id)).length;
    const inProgress = books.filter(b => !doneBooks.has(b.id) && (progress[b.id] || 0) > 0);
    const lastId = ls.get('reader_last', '');
    const last = books.find(b => b.id === lastId && !doneBooks.has(b.id)) || inProgress[0];

    view.innerHTML =
      '<div class="page-head"><span class="emoji-big">📚</span><h1>Читання</h1>' +
      '<p>Адаптовані книги англійською: клацай будь-яке слово — побачиш переклад, 🔊 озвучить речення, 💬 покаже переклад. Розмовні фрази підсвічено кольорами.</p></div>' +
      '<div class="stats-row rd-stats">' +
      statCard('📚', books.length, 'книг у бібліотеці') +
      statCard('✅', read, 'прочитано до кінця') +
      statCard('📖', inProgress.length, 'у процесі') +
      statCard('📝', books.reduce((a, b) => a + b.sentences.filter(s => s.en).length, 0).toLocaleString('uk-UA'), 'речень з перекладом') +
      '</div>' +
      (last ? continueCard(last) : '') +
      '<div class="lex-toolbar rd-filters">' +
      '<input class="text-input lex-search" id="rd-search" placeholder="🔎 Пошук за назвою або автором…" autocomplete="off" value="' + esc(search) + '">' +
      '<div class="chip-row" id="rd-levels"></div>' +
      '<div class="chip-row" id="rd-genres"></div>' +
      '</div>' +
      '<div id="rd-grid" class="rd-grid"></div>';

    const inp = document.getElementById('rd-search');
    inp.addEventListener('input', () => { search = inp.value; renderGrid(); });
    view.querySelector('.rd-filters').addEventListener('click', e => {
      const lv = e.target.closest('[data-level]'), gn = e.target.closest('[data-genre]');
      if (lv) { filterLevel = lv.dataset.level; ls.set('reader_flt_level', filterLevel); renderGrid(); }
      if (gn) { filterGenre = gn.dataset.genre; ls.set('reader_flt_genre', filterGenre); renderGrid(); }
    });
    renderGrid();
  }

  function statCard(icon, value, label) {
    return '<div class="card stat-card"><div class="stat-top"><span></span><span class="stat-icon">' + icon + '</span></div>' +
      '<div class="stat-value">' + value + '</div><div class="stat-label">' + label + '</div></div>';
  }

  function continueCard(b) {
    const pct = bookPct(b);
    return '<a class="card clickable rd-continue" href="#/read/' + b.id + '">' +
      '<div class="rd-continue-emoji">' + (b.emoji || '📖') + '</div>' +
      '<div class="rd-continue-body"><div class="rd-kicker">Продовжити читання</div>' +
      '<h3>' + esc(b.title_uk || b.title) + '</h3>' +
      '<div class="rd-continue-sub">' + esc(b.title) + ' · ' + esc(b.author || '') + ' · ' + b.level + '</div>' +
      FL().progressBar(pct / 100) + '<div class="progress-label"><span>Речення ' + ((progress[b.id] || 0) + 1) + ' з ' + b.sentences.length + '</span><span>' + pct + '%</span></div></div>' +
      '<span class="btn btn-primary rd-continue-btn">Читати →</span></a>';
  }

  function bookPct(b) { return Math.round(100 * (progress[b.id] || 0) / Math.max(1, b.sentences.length - 1)); }

  function matchesSearch(b) {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    return [b.title, b.title_uk, b.author].some(x => String(x || '').toLowerCase().includes(q));
  }

  function renderGrid() {
    const lvWrap = document.getElementById('rd-levels'), gnWrap = document.getElementById('rd-genres'), grid = document.getElementById('rd-grid');
    if (!grid) return;
    const bySearch = D.BOOKS.filter(matchesSearch);
    const cntLevel = l => bySearch.filter(b => (!filterGenre || b.genre === filterGenre) && (!l || b.level === l)).length;
    const cntGenre = g => bySearch.filter(b => (!filterLevel || b.level === filterLevel) && (!g || b.genre === g)).length;

    lvWrap.innerHTML = '<span class="chip-label">Рівень</span>' +
      chip('data-level', '', 'Усі рівні', cntLevel(''), filterLevel === '') +
      D.LEVELS.map(l => chip('data-level', l, l, cntLevel(l), filterLevel === l)).join('');
    gnWrap.innerHTML = '<span class="chip-label">Жанр</span>' +
      chip('data-genre', '', 'Усі жанри', cntGenre(''), filterGenre === '') +
      Object.entries(D.GENRES).map(([k, v]) => chip('data-genre', k, v.emoji + ' ' + v.label, cntGenre(k), filterGenre === k)).join('');

    const filtered = bySearch.filter(b => (!filterLevel || b.level === filterLevel) && (!filterGenre || b.genre === filterGenre));
    if (!filtered.length) { grid.innerHTML = '<div class="empty-note">Немає книг для цих фільтрів.</div>'; return; }

    grid.innerHTML = filtered.map((b, i) => {
      const g = D.GENRES[b.genre] || { emoji: '📖', label: '' };
      const done = doneBooks.has(b.id);
      const prog = progress[b.id] || 0;
      const percent = bookPct(b);
      const badge = done ? '<span class="tag green">✓ Прочитано</span>' : (percent > 0 ? '<span class="tag cyan">' + percent + '%</span>' : '');
      return '<a class="card clickable rd-book" href="#/read/' + b.id + '" style="animation-delay:' + Math.min(i, 24) * 22 + 'ms">' +
        '<div class="rd-book-emoji">' + (b.emoji || g.emoji) + '</div>' +
        '<div class="rd-book-body">' +
        '<div class="rd-book-title">' + esc(b.title_uk || b.title) + '</div>' +
        '<div class="rd-book-author">' + esc(b.title_uk ? b.title : '') + (b.title_uk && b.author ? ' · ' : '') + esc(b.author || '') + '</div>' +
        '<div class="rd-book-meta"><span class="tag">' + b.level + '</span><span class="tag pink">' + g.emoji + ' ' + esc(g.label) + '</span>' +
        '<span class="rd-meta-txt">' + b.sentences.filter(s => s.en).length + ' реч. · ~' + (b.minutes || 10) + ' хв</span>' + badge + '</div>' +
        '<div class="rd-book-blurb">' + esc(b.blurb || '') + '</div>' +
        (prog > 0 ? FL().progressBar(percent / 100, 'tiny') : '') +
        '</div></a>';
    }).join('');
  }

  function chip(attr, val, label, count, active) {
    return '<button class="sub-chip rd-chip' + (active ? ' active' : '') + '" ' + attr + '="' + esc(val) + '">' + esc(label) + ' <span class="rd-cnt">' + count + '</span></button>';
  }

  /* ============================ READER ============================ */
  function readerPage(view, b) {
    currentBook = b;
    currentIdx = progress[b.id] || 0;
    if (currentIdx >= b.sentences.length) currentIdx = 0;
    while (currentIdx < b.sentences.length - 1 && isMarker(b.sentences[currentIdx])) currentIdx++;
    allUkOn = false;
    ls.set('reader_last', b.id);
    FL().setCrumbs([{ label: 'Читання', hash: '#/read' }, { label: b.title_uk || b.title }]);
    FL().touchStreak();

    const legendOn = ls.get('reader_legend_on', '0') === '1';
    const hlOff = ls.get('reader_hl_off', '0') === '1';
    const g = D.GENRES[b.genre] || { emoji: '📖', label: '' };

    view.innerHTML =
      '<div class="rd-root' + (hlOff ? ' no-highlights' : '') + '" id="rd-root">' +
      '<div class="rd-head">' +
      '<a class="back-link" href="#/read">← Бібліотека</a>' +
      '<div class="rd-head-main"><span class="rd-head-emoji">' + (b.emoji || g.emoji) + '</span><div>' +
      '<h1>' + esc(b.title_uk || b.title) + '</h1>' +
      '<div class="rd-head-sub">' + esc(b.title) + ' · ' + esc(b.author || '') + ' · <span class="tag">' + b.level + '</span> <span class="tag pink">' + g.emoji + ' ' + esc(g.label) + '</span></div>' +
      '</div></div></div>' +

      '<div class="rd-toolbar" id="rd-toolbar">' +
      '<div class="rd-tgroup"><button data-act="font-" title="Менший шрифт">A−</button><button data-act="font+" title="Більший шрифт">A+</button></div>' +
      '<div class="rd-tgroup"><button data-act="width-" title="Вужча колонка">⇤</button><button data-act="width+" title="Ширша колонка">⇥</button></div>' +
      '<button data-act="all-uk" id="rd-all-uk">🇺🇦 Переклади</button>' +
      '<button data-act="hl" id="rd-hl" class="' + (hlOff ? '' : 'on') + '" title="Підсвітка розмовних фраз">🎨 Фрази</button>' +
      '<button data-act="legend" id="rd-legend-btn" class="' + (legendOn ? 'on' : '') + '" title="Легенда кольорів підсвітки">🎯 Легенда</button>' +
      '<button data-act="themes" id="rd-themes-btn" title="Тема читалки">🖌️ Тема</button>' +
      '</div>' +

      '<div class="rd-theme-picker" id="rd-theme-picker" hidden><div class="rd-picker-title">Тема сторінки</div><div class="rd-theme-grid" id="rd-theme-grid"></div></div>' +

      '<div class="rd-legend" id="rd-legend"' + (legendOn ? '' : ' hidden') + '>' +
      '<div class="rd-legend-title">🎨 Що означає підсвітка</div>' +
      '<div><span class="hl-cx">gonna</span> · <span class="hl-cx">kinda</span> · <span class="hl-cx">dunno</span> — <b>casual скорочення</b> (розмовна мова)</div>' +
      '<div><span class="hl-cn">however</span> · <span class="hl-cn">as for</span> · <span class="hl-cn">speaking of</span> · <span class="hl-cn">when it comes to</span> · <span class="hl-cn">mind you</span> · <span class="hl-cn">meanwhile</span> · <span class="hl-cn">all of a sudden</span> — <b>connectors + discourse markers 2.0</b> (зв’язки, оповідь)</div>' +
      '<div><span class="hl-wr">I should have called</span> · <span class="hl-wr">in hindsight</span> — <b>wish / regret</b> (рефлексія, жаль)</div>' +
      '<div><span class="hl-cp">the thing is</span> · <span class="hl-cp">to be honest</span> · <span class="hl-cp">kind of</span> · <span class="hl-cp">sort of</span> · <span class="hl-cp">a bit</span> · <span class="hl-cp">I guess</span> — <b>casual фрази + softeners</b> (розмовні звороти, пом’якшувачі)</div>' +
      '<div>You know<span class="hl-tq">, don’t you?</span> — <b>tag questions</b> (розділові питання)</div>' +
      '<div class="rd-legend-hint">💡 Тисни 🎨, щоб вимкнути підсвітку · 🎯 — щоб сховати легенду</div>' +
      '</div>' +

      '<div class="rd-progress"><i id="rd-bar"></i></div>' +
      '<div class="rd-page-info" id="rd-info">—</div>' +
      '<div class="rd-frame ' + WIDTH_CLASSES[widthIdx] + '" id="rd-frame">' +
      '<div class="rd-text ' + FONT_CLASSES[fontSize] + '" id="rd-text"></div>' +
      '</div>' +
      '<div class="rd-nav">' +
      '<button class="btn btn-ghost" data-act="prev" title="Назад на 10 речень (←)">‹ Назад</button>' +
      '<button class="btn btn-primary" data-act="speak-active" id="rd-speak" title="Озвучити активне речення">🔊 Слухати активне речення</button>' +
      '<button class="btn btn-ghost" data-act="next" title="Далі на 10 речень (→ / Enter / Space)">Далі ›</button>' +
      '</div>' +
      '<div class="rd-keys">⌨️ <b>→</b> / <b>Enter</b> / <b>Space</b> — далі · <b>←</b> — назад · <b>T</b> — переклад активного речення</div>' +
      '</div>';

    applyReaderTheme(readerTheme);
    document.getElementById('rd-toolbar').addEventListener('click', onToolbar);
    view.querySelector('.rd-nav').addEventListener('click', onToolbar);
    document.getElementById('rd-theme-grid').addEventListener('click', e => {
      const sw = e.target.closest('[data-rtheme]');
      if (sw) applyReaderTheme(sw.dataset.rtheme);
    });
    document.getElementById('rd-text').addEventListener('click', onTextClick);
    renderBook();
  }

  function onToolbar(e) {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.dataset.act;
    if (act === 'font-' || act === 'font+') { fontSize = Math.max(0, Math.min(3, fontSize + (act === 'font+' ? 1 : -1))); applyFontClass(); }
    else if (act === 'width-' || act === 'width+') { widthIdx = Math.max(0, Math.min(3, widthIdx + (act === 'width+' ? 1 : -1))); applyWidthClass(); }
    else if (act === 'all-uk') toggleAllUk();
    else if (act === 'hl') toggleHighlights();
    else if (act === 'legend') toggleLegend();
    else if (act === 'themes') { const p = document.getElementById('rd-theme-picker'); p.hidden = !p.hidden; btn.classList.toggle('on', !p.hidden); }
    else if (act === 'prev') prevSentence();
    else if (act === 'next') nextSentence();
    else if (act === 'speak-active') speakSentence(btn);
  }

  function onTextClick(e) {
    const w = e.target.closest('.wd');
    const sp = e.target.closest('[data-speak]');
    const uk = e.target.closest('[data-uk]');
    if (sp) { e.stopPropagation(); speakAt(+sp.dataset.speak, sp); return; }
    if (uk) { e.stopPropagation(); toggleUk(+uk.dataset.uk); return; }
    if (w) tapWord(e, w.dataset.w);
  }

  /* ---------- theme / font / width ---------- */
  function applyReaderTheme(id) {
    readerTheme = id;
    ls.set('reader_theme', id);
    const root = document.getElementById('rd-root');
    if (!root) return;
    root.dataset.rtheme = id;
    const mode = id === 'app' ? (document.documentElement.dataset.mode || 'dark') : (DARK_RTHEMES.includes(id) ? 'dark' : 'light');
    root.dataset.rmode = mode;
    const grid = document.getElementById('rd-theme-grid');
    if (grid) grid.innerHTML = READER_THEMES.map(t =>
      '<button class="rd-swatch' + (t.id === readerTheme ? ' active' : '') + '" data-rtheme="' + t.id + '">' +
      '<span class="rd-dot" style="background:' + t.bg + ';box-shadow:inset 0 0 0 3px ' + t.accent + '"></span>' + t.label + '</button>'
    ).join('');
  }
  function applyFontClass() {
    const c = document.getElementById('rd-text'); if (!c) return;
    FONT_CLASSES.forEach(cl => c.classList.remove(cl)); c.classList.add(FONT_CLASSES[fontSize]);
    ls.set('reader_font_size', String(fontSize));
    refreshActive(true);
  }
  function applyWidthClass() {
    const f = document.getElementById('rd-frame'); if (!f) return;
    WIDTH_CLASSES.forEach(cl => f.classList.remove(cl)); f.classList.add(WIDTH_CLASSES[widthIdx]);
    ls.set('reader_width', String(widthIdx));
  }

  /* ---------- highlight (без змін з reader.html) ---------- */
  function findHighlightRanges(text) {
    const ranges = [];
    for (const p of D.HL_PATTERNS) {
      p.re.lastIndex = 0;
      let m;
      while ((m = p.re.exec(text)) !== null) {
        ranges.push({ s: m.index, e: m.index + m[0].length, cls: p.cls });
        if (m[0].length === 0) p.re.lastIndex++;
      }
    }
    ranges.sort((a, b) => a.s - b.s || (b.e - b.s) - (a.e - a.s));
    const clean = [];
    let lastEnd = -1;
    for (const r of ranges) {
      if (r.s >= lastEnd) { clean.push(r); lastEnd = r.e; }
    }
    return clean;
  }

  function renderItemHtml(item, idx, activeIdx) {
    if (item.chapter) return '<div class="chapter-title">' + esc(item.chapter) + '</div>';
    if (item.paragraph) return '__PARA__';
    const text = item.en;
    const ranges = findHighlightRanges(text);
    const clsAt = new Array(text.length).fill(null);
    for (const r of ranges) for (let i = r.s; i < r.e; i++) clsAt[i] = r.cls;
    let out = '', curCls = null, pos = 0;
    const tokens = text.split(/(\s+)/);
    for (const tok of tokens) {
      if (tok.length === 0) continue;
      if (/^\s+$/.test(tok)) {
        const insideHl = clsAt[pos] === curCls && curCls !== null;
        if (!insideHl && curCls) { out += '</span>'; curCls = null; }
        out += tok;
        pos += tok.length;
        continue;
      }
      const tokCls = clsAt[pos];
      if (tokCls !== curCls) {
        if (curCls) out += '</span>';
        if (tokCls) out += '<span class="' + tokCls + '">';
        curCls = tokCls;
      }
      const clean = tok.replace(/[^\p{L}ʼ\-']/gu, '');
      out += clean ? '<span class="wd" data-w="' + esc(clean) + '">' + esc(tok) + '</span>' : esc(tok);
      pos += tok.length;
    }
    if (curCls) out += '</span>';
    return '<span class="sent' + (idx === activeIdx ? ' active' : '') + '" id="s-' + idx + '">' + out + ' ' +
      '<button class="s-speak" data-speak="' + idx + '" title="Озвучити">🔊</button>' +
      '<button class="s-uk" data-uk="' + idx + '" title="Переклад">💬</button>' +
      '<span class="uk-inline" id="uk-' + idx + '"' + (allUkOn ? '' : ' hidden') + '> — ' + esc(item.uk) + '</span>' +
      '</span> ';
  }

  function renderItemsHtml(items, startIdx, activeIdx) {
    let raw = '';
    for (let i = 0; i < items.length; i++) raw += renderItemHtml(items[i], startIdx + i, activeIdx);
    return raw.split('__PARA__').map(p => p.trim() ? '<p class="book-para">' + p + '</p>' : '').join('');
  }

  function renderBook() {
    const c = document.getElementById('rd-text');
    if (!currentBook || !c) return;
    c.innerHTML = renderItemsHtml(currentBook.sentences, 0, currentIdx);
    setTimeout(() => scrollToActive('auto'), 50);
    updateProgress();
  }

  /* ---------- navigation: крок ~10 речень ---------- */
  const isMarker = s => s.chapter || s.paragraph;
  function nextSentence() {
    if (!currentBook) return;
    const total = currentBook.sentences.length;
    let target = Math.min(total - 1, currentIdx + 10);
    while (target < total && isMarker(currentBook.sentences[target])) target++;
    if (target >= total) {
      currentIdx = total - 1;
      refreshActive();
      updateProgress();
      FL().showToast('🎉 Кінець книги!');
      return;
    }
    currentIdx = target;
    refreshActive();
    updateProgress();
  }
  function prevSentence() {
    if (!currentBook) return;
    let target = Math.max(0, currentIdx - 10);
    while (target > 0 && isMarker(currentBook.sentences[target])) target--;
    currentIdx = target;
    refreshActive();
    updateProgress();
  }
  function scrollToActive(behavior) {
    const el = document.getElementById('s-' + currentIdx);
    const frame = document.getElementById('rd-frame');
    if (!el || !frame) return;
    const top = el.getBoundingClientRect().top - frame.getBoundingClientRect().top + frame.scrollTop;
    frame.scrollTo({ top: Math.max(0, top - frame.clientHeight / 2 + el.offsetHeight / 2), behavior: behavior || 'smooth' });
  }
  function refreshActive(instant) {
    document.querySelectorAll('.rd-text .sent.active').forEach(el => el.classList.remove('active'));
    const el = document.getElementById('s-' + currentIdx);
    if (el) { el.classList.add('active'); scrollToActive(instant ? 'auto' : 'smooth'); }
  }

  function updateProgress() {
    if (!currentBook) return;
    const total = currentBook.sentences.length;
    const p = Math.round(100 * currentIdx / Math.max(1, total - 1));
    const bar = document.getElementById('rd-bar');
    if (bar) bar.style.width = p + '%';
    const info = document.getElementById('rd-info');
    if (info) info.textContent = 'Речення ' + (currentIdx + 1) + ' / ' + total + ' · ' + p + '%';
    progress[currentBook.id] = currentIdx;
    if (currentIdx >= total - 1 && !doneBooks.has(currentBook.id)) {
      doneBooks.add(currentBook.id);
      saveProgress();
      celebrate(currentBook);
      return;
    }
    saveProgress();
  }

  function celebrate(b) {
    FL().addXp(FINISH_XP);
    setTimeout(() => { try { FL().confetti(); } catch (e) { } }, 0);
    const idx = D.BOOKS.indexOf(b);
    const nxt = D.BOOKS[idx + 1];
    const root = document.getElementById('modal-root');
    root.innerHTML =
      '<div class="modal-backdrop" id="rd-m"><div class="modal rd-done-modal">' +
      '<div class="rd-done-emoji">🎉</div><h3>Прочитано!</h3>' +
      '<p>«' + esc(b.title_uk || b.title) + '» — до останнього речення. Молодці! +' + FINISH_XP + ' XP. Хочете ще?</p>' +
      '<div class="m-actions"><a class="btn btn-ghost btn-block" href="#/read" data-close>📚 До списку</a>' +
      (nxt ? '<a class="btn btn-primary btn-block" href="#/read/' + nxt.id + '" data-close>📖 Наступна</a>' : '') +
      '</div></div></div>';
    root.querySelector('#rd-m').addEventListener('click', e => { if (e.target.id === 'rd-m' || e.target.closest('[data-close]')) root.innerHTML = ''; });
  }

  /* ---------- speech & translations ---------- */
  function speakText(text, btn) { return FL().speakLang(text, 'en-US', 0.9, btn); }
  function speakSentence(btn) {
    if (!currentBook) return;
    const s = currentBook.sentences[currentIdx];
    if (s && s.en) speakText(s.en, btn);
  }
  function speakAt(idx, btn) {
    if (!currentBook) return;
    const s = currentBook.sentences[idx];
    if (s && s.en) speakText(s.en, btn);
    currentIdx = idx;
    refreshActive();
    updateProgress();
  }
  function toggleUk(idx) {
    const el = document.getElementById('uk-' + idx);
    if (el) el.hidden = !el.hidden;
  }
  function toggleAllUk() {
    allUkOn = !allUkOn;
    document.querySelectorAll('.rd-text .uk-inline').forEach(e => { e.hidden = !allUkOn; });
    const b = document.getElementById('rd-all-uk'); if (b) b.classList.toggle('on', allUkOn);
  }
  function toggleHighlights() {
    const root = document.getElementById('rd-root'); if (!root) return;
    const off = root.classList.toggle('no-highlights');
    ls.set('reader_hl_off', off ? '1' : '0');
    const b = document.getElementById('rd-hl'); if (b) b.classList.toggle('on', !off);
  }
  function toggleLegend() {
    const el = document.getElementById('rd-legend'); if (!el) return;
    el.hidden = !el.hidden;
    ls.set('reader_legend_on', el.hidden ? '0' : '1');
    const b = document.getElementById('rd-legend-btn'); if (b) b.classList.toggle('on', !el.hidden);
  }

  function normalize(w) { return w.toLowerCase().replace(/[^\p{L}ʼ\-']/gu, ''); }

  async function fetchOnlineTranslation(word) {
    if (translationCache[word]) return translationCache[word];
    try {
      const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(word) + '&langpair=en|uk';
      const resp = await fetch(url);
      if (!resp.ok) return null;
      const data = await resp.json();
      const tr = (data && data.responseData && data.responseData.translatedText) || null;
      if (!tr) return null;
      if (/^no query|^please|^\?/i.test(tr)) return null;
      if (tr.toLowerCase() === word.toLowerCase()) return null;
      translationCache[word] = tr;
      ls.set('reader_tr_cache', JSON.stringify(translationCache));
      return tr;
    } catch (e) { return null; }
  }

  function translateWord(w, book) {
    const n = normalize(w);
    if (!n) return null;
    const s = book && book.sentences[currentIdx];
    if (s && s.words && s.words[n]) return s.words[n];
    if (book) for (const st of book.sentences) if (st.words && st.words[n]) return st.words[n];
    if (D.FALLBACK[n]) return D.FALLBACK[n];
    if (translationCache[n]) return translationCache[n];
    return null;
  }

  /* ---------- word tooltip ---------- */
  let tipWord = '';
  function tooltipEl() {
    let tt = document.getElementById('rd-tooltip');
    if (!tt) {
      tt = document.createElement('div');
      tt.id = 'rd-tooltip'; tt.className = 'rd-tooltip'; tt.hidden = true;
      tt.addEventListener('click', e => {
        e.stopPropagation();
        const b = e.target.closest('[data-say]');
        if (b) speakText(b.dataset.say, b);
      });
      document.body.appendChild(tt);
    }
    return tt;
  }
  function showTooltip(x, y, word, translation, isLoading) {
    const tt = tooltipEl();
    const trHtml = isLoading ? '<em class="rd-tt-dim">завантажую переклад…</em>'
      : (translation ? esc(translation) : '<em class="rd-tt-dim">немає перекладу</em>');
    tt.innerHTML = '<div class="rd-tt-word">' + esc(word) + '</div><div class="rd-tt-tr">' + trHtml + '</div>' +
      '<button class="rd-tt-say" data-say="' + esc(word.toLowerCase()) + '">🔊 Вимова</button>';
    tt.hidden = false;
    tt.style.left = Math.max(8, Math.min(x, window.innerWidth - 240)) + 'px';
    tt.style.top = Math.max(8, Math.min(y + 20, window.innerHeight - 130)) + 'px';
  }
  function hideTooltip() { const tt = document.getElementById('rd-tooltip'); if (tt) tt.hidden = true; }
  function tapWord(e, word) {
    e.stopPropagation();
    document.querySelectorAll('.rd-text .wd.tapped').forEach(x => x.classList.remove('tapped'));
    const target = e.target.closest('.wd'); if (target) target.classList.add('tapped');
    const x = e.clientX, y = e.clientY;
    tipWord = word;
    const local = translateWord(word, currentBook);
    if (local) { showTooltip(x, y, word, local, false); return; }
    showTooltip(x, y, word, null, true);
    fetchOnlineTranslation(normalize(word)).then(tr => {
      const tt = document.getElementById('rd-tooltip');
      if (!tt || tt.hidden || tipWord !== word) return;
      showTooltip(x, y, word, tr, false);
    });
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('.rd-tooltip') && !e.target.closest('.wd')) {
      hideTooltip();
      document.querySelectorAll('.rd-text .wd.tapped').forEach(x => x.classList.remove('tapped'));
    }
  });
  window.addEventListener('scroll', hideTooltip, { passive: true });

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', e => {
    if (!currentBook || !document.getElementById('rd-text')) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable) return;
    if (document.querySelector('#modal-root .modal-backdrop')) return;
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.code === 'Space') {
      if (e.target.closest && e.target.closest('button, a') && e.key !== 'ArrowRight') return;
      e.preventDefault(); nextSentence();
    }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSentence(); }
    else if (e.key === 't' || e.key === 'T' || e.key === 'е' || e.key === 'Е') toggleUk(currentIdx);
  });

  /* ============================ PUBLIC ============================ */
  window.FLReader = {
    route,
    BOOK_COUNT,
    summary() {
      const done = new Set(ls.json('reader_done', []));
      const prog = ls.json('reader_progress', {});
      return { total: BOOK_COUNT, done: done.size, started: Object.keys(prog).filter(k => prog[k] > 0 && !done.has(k)).length };
    },
    syncMode() {
      const root = document.getElementById('rd-root');
      if (root && readerTheme === 'app') root.dataset.rmode = document.documentElement.dataset.mode || 'dark';
    }
  };
})();
