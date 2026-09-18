/* ============================================================
   EngLift — Diary: щоденник англійською з довідником
   Функції перенесено з english-diary-studio.html:
   ✍️ Написати — дата, заголовок, настрій, текст, лічильники слів/символів,
      ціль дня, автозбереження чернетки; ліворуч «Words» (660 слів, пошук,
      фільтр A1–C1, клік = вставити), праворуч «Довідник» (21 категорія,
      582 фрази, пошук, клік = вставити), банери вимови, слова-паразити,
      префікси, шаблон BE, розмовні скорочення, 💡 ідеї для запису (50).
   📚 Мої записи — пошук, фільтр за настроєм, розгортання, редагування, видалення.
   ⚙️ Налаштування — статистика, експорт/імпорт .json, ціль слів, видалити все.
   Дані (js/diary/diary-data.js) підвантажуються лише тут.
   ============================================================ */
(function () {
  'use strict';

  const DATA_SRC = 'js/diary/diary-data.js';
  const K_ENTRIES = 'diary_entries_v1';
  const K_DRAFT = 'diary_draft_v1';
  const K_GOAL = 'diary_goal_v1';
  const K_INSERTS = 'diary_insert_count_v1';
  const K_LAST_PROMPT = 'diary_last_prompt_v1';
  const K_GOAL_XP = 'diary_goal_xp_v1';
  const K_PRON = 'diary_pron_open_v1';
  const ENTRY_XP = 10, GOAL_XP = 20;
  const MOODS = [['😊', 'happy'], ['😌', 'calm'], ['🤔', 'thoughtful'], ['😴', 'tired'], ['😤', 'frustrated'], ['😢', 'sad'], ['🔥', 'motivated'], ['🎉', 'excited']];
  const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

  const FL = () => window.FL;
  const esc = s => FL().esc(s);
  const ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { } },
    json(k, d) { try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v == null ? d : v; } catch (e) { return d; } }
  };

  let D = null, loading = null;
  let entries = ls.json(K_ENTRIES, []);
  if (!Array.isArray(entries)) entries = [];
  let goal = parseInt(ls.get(K_GOAL, '100'), 10) || 100;
  let insertCount = parseInt(ls.get(K_INSERTS, '0'), 10) || 0;
  let promptIdx = parseInt(ls.get(K_LAST_PROMPT, '0'), 10) || 0;
  let currentMood = '', editingEntryId = null;
  let cefrFilter = '', wordsQuery = '', refQuery = '';
  let entriesQuery = '', moodFilter = '';
  let indTimer = null;

  function ensureData() {
    if (window.DIARY_DATA) { D = window.DIARY_DATA; return Promise.resolve(D); }
    if (loading) return loading;
    loading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = DATA_SRC;
      s.onload = () => { if (window.DIARY_DATA) { D = window.DIARY_DATA; resolve(D); } else { loading = null; reject(new Error('no data')); } };
      s.onerror = () => { loading = null; s.remove(); reject(new Error('load failed')); };
      document.head.appendChild(s);
    });
    return loading;
  }

  /* ============================ HELPERS ============================ */
  const pad = n => String(n).padStart(2, '0');
  const dateStr = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const today = () => dateStr(new Date());
  function countWords(t) { const s = (t || '').trim(); return s ? s.split(/\s+/).length : 0; }
  function saveEntries() {
    if (!ls.set(K_ENTRIES, JSON.stringify(entries))) FL().showToast('❌ Помилка збереження. Можливо, сховище повне.');
  }
  function totalWords() { return entries.reduce((s, e) => s + (e.words || 0), 0); }
  function calculateStreak() {
    if (!entries.length) return 0;
    const set = new Set(entries.map(e => e.date));
    const now = new Date();
    const yest = new Date(now.getTime() - 86400000);
    let cursor;
    if (set.has(dateStr(now))) cursor = now;
    else if (set.has(dateStr(yest))) cursor = yest;
    else return 0;
    let streak = 0;
    while (set.has(dateStr(cursor))) { streak++; cursor = new Date(cursor.getTime() - 86400000); }
    return streak;
  }
  const $ = id => document.getElementById(id);

  function confirmModal(title, html, onConfirm, danger) {
    const root = $('modal-root');
    root.innerHTML = '<div class="modal-backdrop" id="dy-m"><div class="modal">' +
      '<h3>' + esc(title) + '</h3><p class="dy-modal-text">' + html + '</p>' +
      '<div class="m-actions"><button class="btn btn-ghost btn-block" data-no>Скасувати</button>' +
      '<button class="btn ' + (danger ? 'dy-btn-danger' : 'btn-primary') + ' btn-block" data-yes>Так</button></div></div></div>';
    const close = () => { root.innerHTML = ''; };
    $('dy-m').addEventListener('click', e => {
      if (e.target.id === 'dy-m' || e.target.closest('[data-no]')) close();
      else if (e.target.closest('[data-yes]')) { close(); onConfirm(); }
    });
  }

  /* ============================ ROUTES ============================ */
  function route(view, parts) {
    const tab = parts[1] || 'write';
    if (!['write', 'entries', 'settings'].includes(tab) || parts.length > 2 || (parts[1] === 'write')) return FL().notFound(view);
    FL().setCrumbs(tab === 'write' ? [{ label: 'Diary' }] : [{ label: 'Diary', hash: '#/diary' }, { label: tab === 'entries' ? 'Мої записи' : 'Налаштування' }]);
    if (!D) view.innerHTML = '<div class="rd-loading"><div class="rd-book-anim"><span></span><span></span><span></span></div><h2>Відкриваємо щоденник…</h2><p>Завантажуємо довідник і словник — лише першого разу.</p></div>';
    ensureData().then(() => {
      const cur = location.hash.replace(/^#\//, '').split('/').filter(Boolean);
      if (cur[0] !== 'diary' || (cur[1] || 'write') !== tab) return;
      view.innerHTML = shell(tab);
      bindShell(view);
      if (tab === 'write') mountWrite(view);
      else if (tab === 'entries') mountEntries(view);
      else mountSettings(view);
    }).catch(() => {
      view.innerHTML = '<div class="page-head"><span class="emoji-big">📡</span><h1>Не вдалося завантажити щоденник</h1><p>Перевір з’єднання й спробуй ще раз.</p></div><button class="btn btn-primary" id="dy-retry">🔁 Спробувати ще раз</button>';
      $('dy-retry').addEventListener('click', () => route(view, parts));
    });
  }

  function shell(tab) {
    const tabLink = (id, hash, label) => '<a class="tab' + (tab === id ? ' active' : '') + '" href="' + hash + '">' + label + '</a>';
    return '<div class="dy-root">' +
      '<div class="dy-hero">' +
      '<div class="dy-hero-main"><span class="dy-hero-emoji">📝</span><div>' +
      '<h1>English <span class="dy-accent">Diary Studio</span></h1>' +
      '<p>Щоденник англійською з довідником: клацай слово чи фразу — вона вставиться в текст.</p></div></div>' +
      '<div class="dy-hero-stats">' +
      '<span class="dy-stat">📚 Записів: <b id="dy-h-count">' + entries.length + '</b></span>' +
      '<span class="dy-stat">✍️ Слів усього: <b id="dy-h-words">' + totalWords().toLocaleString('uk-UA') + '</b></span>' +
      '<span class="dy-stat dy-streak">🔥 Стрік: <b id="dy-h-streak">' + calculateStreak() + '</b> дн.</span>' +
      '<button class="dy-idea-btn" data-act="idea" title="Ідея для запису">💡</button>' +
      '</div></div>' +
      '<div class="tabs dy-tabs">' +
      tabLink('write', '#/diary', '✍️ Написати') +
      tabLink('entries', '#/diary/entries', '📚 Мої записи <span class="dy-pill" id="dy-pill">' + entries.length + '</span>') +
      tabLink('settings', '#/diary/settings', '⚙️ Налаштування / Backup') +
      '</div>' +
      '<div id="dy-panel"></div>' +
      '</div>';
  }

  function bindShell(view) {
    view.querySelector('.dy-idea-btn').addEventListener('click', showPromptModal);
  }

  function updateHeaderStats() {
    const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
    set('dy-h-count', entries.length);
    set('dy-h-words', totalWords().toLocaleString('uk-UA'));
    set('dy-h-streak', calculateStreak());
    set('dy-pill', entries.length);
  }

  /* ---------- 💡 ідеї ---------- */
  function showPromptModal() {
    if (promptIdx >= D.PROMPTS.length || promptIdx < 0) promptIdx = 0;
    const p = D.PROMPTS[promptIdx];
    const root = $('modal-root');
    root.innerHTML = '<div class="modal-backdrop" id="dy-idea"><div class="modal dy-idea-modal">' +
      '<button class="dy-x" data-close title="Закрити">✕</button>' +
      '<h3>💡 Ідея для запису</h3>' +
      '<div class="dy-idea-text" id="dy-idea-text">' + esc(p.text) + '</div>' +
      '<div class="dy-idea-tip" id="dy-idea-tip">🎯 ' + esc(p.tip) + '</div>' +
      '<div class="m-actions">' +
      '<button class="btn btn-ghost btn-block" data-next>🎲 Інша ідея</button>' +
      (location.hash.startsWith('#/diary') && !/entries|settings/.test(location.hash) ? '<button class="btn btn-primary btn-block" data-use>✍️ Вставити як заголовок</button>' : '') +
      '</div></div></div>';
    ls.set(K_LAST_PROMPT, String(promptIdx));
    $('dy-idea').addEventListener('click', e => {
      if (e.target.id === 'dy-idea' || e.target.closest('[data-close]')) root.innerHTML = '';
      else if (e.target.closest('[data-next]')) {
        promptIdx = (promptIdx + 1) % D.PROMPTS.length;
        ls.set(K_LAST_PROMPT, String(promptIdx));
        const q = D.PROMPTS[promptIdx];
        $('dy-idea-text').textContent = q.text;
        $('dy-idea-tip').textContent = '🎯 ' + q.tip;
      } else if (e.target.closest('[data-use]')) {
        const t = $('dy-title');
        if (t) { t.value = D.PROMPTS[promptIdx].text; saveDraft(); flashIndicator(); }
        root.innerHTML = '';
        FL().showToast('✍️ Тему додано в заголовок');
      }
    });
  }

  /* ============================ WRITE ============================ */
  function mountWrite(view) {
    const S = D.STATIC;
    const pronOpen = ls.get(K_PRON, '1') === '1';
    const panel = $('dy-panel');
    panel.innerHTML =
      '<details class="dy-pron card" id="dy-pron"' + (pronOpen ? ' open' : '') + '>' +
      '<summary>🔊 Як звучить розмовна англійська <small>зв’язки · Flap T · Schwa · зникаюче H</small></summary>' +
      '<div class="dy-pron-grid">' + S.banners.map((b, i) =>
        '<div class="dy-strip dy-strip-' + i + '"><b class="dy-strip-title">' + esc(b.title) + '</b>' +
        b.items.map(it => /<b>/.test(it) ? '<span class="dy-chunk">' + it + '</span>' : '<span class="dy-strip-desc">' + it + '</span>').join('') +
        b.notes.map(n => '<span class="dy-strip-note">' + n + '</span>').join('') +
        '</div>').join('') +
      '</div></details>' +

      '<div class="dy-layout">' +
      /* ---- words ---- */
      '<aside class="dy-side dy-words" id="dy-words">' +
      '<div class="dy-side-head"><div class="dy-side-title">📚 Words</div><button class="dy-x dy-close-words" data-act="close-words" title="Закрити">✕</button></div>' +
      '<div class="dy-hint">💡 Клацай на слово — <b>вставиться в щоденник</b>.</div>' +
      '<input class="text-input dy-search" id="dy-words-search" placeholder="🔍 Шукати слово..." autocomplete="off" value="' + esc(wordsQuery) + '">' +
      '<div class="dy-cefr" id="dy-cefr">' + [''].concat(LEVELS).map(l => '<button class="dy-cefr-chip' + (cefrFilter === l ? ' active' : '') + '" data-lvl="' + l + '">' + (l || 'Усі') + '</button>').join('') + '</div>' +
      '<div id="dy-words-list"></div>' +
      '</aside>' +

      /* ---- main ---- */
      '<section class="dy-main">' +
      '<div class="dy-strip dy-fillers"><b class="dy-strip-title">💬 Слова-паразити:</b>' +
      S.fillers.map((f, i) => '<button class="dy-tipchip" data-tip="f' + i + '">' + esc(f.w) + '</button>').join('') +
      '<span class="dy-degree"><span>(kind of / sorta / like — <b>пом’якшення</b>)</span>' +
      S.degree.map((f, i) => '<button class="dy-tipchip" data-tip="d' + i + '"><b>' + esc(f.w) + '</b></button>').join(' / ') + ' — <b>ступінь</b></span>' +
      '</div>' +
      '<div class="dy-strip dy-prefixes"><b class="dy-strip-title">📎 Префікси / Суфікси:</b>' +
      S.prefixes.map((f, i) => '<button class="dy-tipchip" data-tip="p' + i + '">' + esc(f.w) + '</button>').join('') +
      '</div>' +
      '<div class="dy-tip-pop" id="dy-tip-pop" hidden></div>' +

      '<div class="dy-cat dy-be" data-id="be-main">' +
      '<button class="dy-cat-head" data-toggle="be-main"><span class="dy-cat-emoji">💡</span><span class="dy-cat-name">BE — основний шаблон (бути)</span><span class="dy-cat-arrow">▶</span></button>' +
      '<div class="dy-cat-body">' + beHtml(S.be) + '</div></div>' +

      '<div class="dy-meta">' +
      '<input type="date" class="text-input" id="dy-date">' +
      '<input type="text" class="text-input" id="dy-title" placeholder="Заголовок (опційно): напр. My Monday" autocomplete="off">' +
      '<span class="dy-wc">Слів: <b id="dy-wc1">0</b></span>' +
      '</div>' +
      '<div class="dy-editing" id="dy-editing" hidden>✏️ Редагуєш збережений запис <button data-act="cancel-edit">Скасувати редагування</button></div>' +
      '<div class="dy-moods"><span class="dy-moods-label">Настрій:</span>' +
      MOODS.map(([m, t]) => '<button class="dy-mood" data-mood="' + m + '" title="' + t + '">' + m + '</button>').join('') +
      '</div>' +
      '<textarea id="dy-text" class="dy-text" placeholder="Today I..." spellcheck="true"></textarea>' +
      '<div class="dy-foot">' +
      '<div class="dy-stats-line"><span>📝 Слів: <b id="dy-wc2">0</b></span><span>🔤 Символів: <b id="dy-chars">0</b></span><span id="dy-goal">🎯 Ціль дня: <b>' + goal + '</b> слів</span></div>' +
      '<div class="dy-actions">' +
      '<button class="btn btn-ghost dy-check-btn" data-act="check" id="dy-check-btn" title="Знайти типові помилки">🔍 Перевірити <span class="dy-check-count" id="dy-check-count" hidden></span></button>' +
      '<button class="btn btn-ghost" data-act="clear" title="Очистити чернетку">🗑️ Очистити</button>' +
      '<button class="btn btn-ghost" data-act="draft" title="Ручне збереження чернетки">💾 Зберегти чернетку</button>' +
      '<button class="btn btn-primary" data-act="save">✅ Зберегти запис</button>' +
      '</div></div>' +
      '<div class="dy-goalbar"><i id="dy-goalbar"></i></div>' +
      '<div class="dy-check card" id="dy-check" hidden></div>' +
      '<div class="dy-autosave" id="dy-autosave">💾 Автозбереження чернетки — увімкнено</div>' +
      '<div class="dy-strip dy-contr"><b class="dy-strip-title">🗣️ Розмовні скорочення:</b>' + S.contractions.map(c => '<span class="dy-chunk">' + c + '</span>').join('') + '</div>' +
      '</section>' +

      /* ---- reference ---- */
      '<aside class="dy-side dy-ref">' +
      '<div class="dy-side-head"><div class="dy-side-title">📚 Довідник</div></div>' +
      '<div class="dy-hint">💡 Клацай на фразу — вона <b>вставиться в щоденник</b> у місце курсору.</div>' +
      '<input class="text-input dy-search" id="dy-ref-search" placeholder="🔍 Шукати у довіднику..." autocomplete="off" value="' + esc(refQuery) + '">' +
      '<div id="dy-ref-list"></div>' +
      '</aside>' +
      '</div>' +
      '<button class="dy-words-fab" data-act="open-words">📚 Слова</button>' +
      '<div class="dy-backdrop" id="dy-backdrop" data-act="close-words"></div>';

    renderWords();
    renderReference();
    applyRefSearch();
    loadDraft();
    updateWordStats();

    $('dy-pron').addEventListener('toggle', e => ls.set(K_PRON, e.target.open ? '1' : '0'));
    $('dy-words-search').addEventListener('input', e => {
      wordsQuery = e.target.value; renderWords();
      if (wordsQuery.trim()) document.querySelectorAll('#dy-words-list .dy-cat').forEach(c => c.classList.add('open'));
    });
    $('dy-cefr').addEventListener('click', e => {
      const c = e.target.closest('[data-lvl]'); if (!c) return;
      cefrFilter = c.dataset.lvl;
      document.querySelectorAll('#dy-cefr .dy-cefr-chip').forEach(x => x.classList.toggle('active', x === c));
      renderWords();
    });
    $('dy-ref-search').addEventListener('input', e => { refQuery = e.target.value; applyRefSearch(); });

    const text = $('dy-text'), title = $('dy-title'), date = $('dy-date');
    text.addEventListener('input', () => { updateWordStats(); onDraftInput(); scheduleCheck(); });
    $('dy-check').addEventListener('click', onCheckClick);
    scheduleCheck(0);
    [title, date].forEach(el => el.addEventListener('input', onDraftInput));

    panel.addEventListener('click', onWriteClick);
  }

  function beHtml(items) {
    return items.map(it => {
      if (it.h) return '<div class="dy-sub dy-tone-' + it.tone + '">' + esc(it.h) + '</div>';
      if (it.note) return '<div class="dy-note dy-note-' + it.tone + '">' + esc(it.note) + '</div>';
      if (it.en) return '<div class="dy-ex dy-ex-' + it.tone + '"><b>' + esc(it.en) + '</b> <span>→ ' + esc(it.uk) + '</span></div>';
      if (it.table) return tableHtml(it.table, false);
      if (it.formula) return '<div class="dy-formula"><b>' + esc(it.formula[0]) + '</b>' + it.formula.slice(1).map(l => {
        const k = l.indexOf('→');
        return '<div><span class="dy-k">' + esc(l.slice(0, k).trim()) + '</span> → ' + esc(l.slice(k + 1).trim()) + '</div>';
      }).join('') + '</div>';
      return '';
    }).join('');
  }

  function tableHtml(rows, keyCol) {
    const [head, ...body] = rows;
    return '<div class="dy-table-wrap"><table class="dy-table"><thead><tr>' + head.map(h => '<th>' + esc(h) + '</th>').join('') + '</tr></thead><tbody>' +
      body.map(r => '<tr>' + r.map((c, i) => '<td' + (keyCol && i === 1 ? ' class="k"' : '') + '>' + esc(c) + '</td>').join('') + '</tr>').join('') +
      '</tbody></table></div>';
  }

  function onWriteClick(e) {
    const t = e.target;
    const ins = t.closest('[data-insert]');
    if (ins) { e.stopPropagation(); insertText(ins.dataset.insert); return; }
    const tog = t.closest('[data-toggle]');
    if (tog) { toggleCat(tog.closest('.dy-cat')); return; }
    const mood = t.closest('[data-mood]');
    if (mood) { currentMood = currentMood === mood.dataset.mood ? '' : mood.dataset.mood; highlightMood(); saveDraft(); return; }
    const chip = t.closest('[data-tip]');
    if (chip) { showTip(chip); return; }
    const act = t.closest('[data-act]');
    if (act) {
      const a = act.dataset.act;
      if (a === 'check') toggleCheck();
      else if (a === 'save') saveEntry();
      else if (a === 'draft') { saveDraft(); FL().showToast('💾 Чернетку збережено!'); }
      else if (a === 'clear') clearDraft();
      else if (a === 'open-words' || a === 'close-words') toggleWordsDrawer(a === 'open-words');
      else if (a === 'cancel-edit') cancelEdit();
      else if (a === 'tip-insert') insertText(act.dataset.text);
      return;
    }
    if (!t.closest('#dy-tip-pop')) hideTip();
  }

  function showTip(chip) {
    const S = D.STATIC, id = chip.dataset.tip, n = +id.slice(1);
    const item = id[0] === 'f' ? S.fillers[n] : id[0] === 'd' ? S.degree[n] : S.prefixes[n];
    const pop = $('dy-tip-pop');
    if (!pop.hidden && pop.dataset.for === id) { hideTip(); return; }
    pop.dataset.for = id;
    pop.innerHTML = '<div class="dy-tip-w">' + esc(item.w) + '</div>' +
      (item.ex ? '<div class="dy-tip-ex">' + esc(item.ex) + '</div>' : '') +
      '<div class="dy-tip-uk">→ ' + esc(item.uk) + '</div>' +
      (item.ex ? '<button class="dy-tip-ins" data-act="tip-insert" data-text="' + esc(item.w.replace(/\?$/, '')) + '">Вставити «' + esc(item.w) + '» →</button>' : '');
    pop.hidden = false;
    const main = chip.closest('.dy-main').getBoundingClientRect();
    const r = chip.getBoundingClientRect();
    pop.style.left = Math.max(0, Math.min(r.left - main.left, main.width - 260)) + 'px';
    pop.style.top = (r.bottom - main.top + 6) + 'px';
    document.querySelectorAll('.dy-tipchip.on').forEach(x => x.classList.remove('on'));
    chip.classList.add('on');
  }
  function hideTip() {
    const pop = $('dy-tip-pop'); if (pop) pop.hidden = true;
    document.querySelectorAll('.dy-tipchip.on').forEach(x => x.classList.remove('on'));
  }

  function toggleCat(el) {
    if (!el) return;
    el.parentElement.querySelectorAll(':scope > .dy-cat').forEach(c => { if (c === el) c.classList.toggle('open'); else c.classList.remove('open'); });
  }
  function toggleWordsDrawer(open) {
    const sb = $('dy-words'), bd = $('dy-backdrop');
    if (!sb) return;
    sb.classList.toggle('mobile-open', open);
    if (bd) bd.classList.toggle('show', open);
  }

  /* ---------- 🔍 перевірка тексту ---------- */
  let checkTimer = null, issues = [];
  const topicInfo = t => {
    const sub = typeof COURSE !== 'undefined' && COURSE.grammar.subs.find(s => s.id === t[0]);
    const tp = sub && sub.topics.find(x => x.id === t[1]);
    return tp ? { hash: '#/grammar/' + t[0] + '/' + t[1], title: tp.title, emoji: tp.emoji } : null;
  };

  function scheduleCheck(delay) {
    clearTimeout(checkTimer);
    checkTimer = setTimeout(() => {
      const ta = $('dy-text');
      if (!ta || !window.FLChecker) return;
      issues = window.FLChecker.check(ta.value);
      const cnt = $('dy-check-count');
      if (cnt) { cnt.hidden = !issues.length; cnt.textContent = issues.length; }
      const panel = $('dy-check');
      if (panel && !panel.hidden) renderCheck();
    }, delay == null ? 700 : delay);
  }

  function toggleCheck() {
    const panel = $('dy-check'); if (!panel) return;
    if (!panel.hidden) { panel.hidden = true; return; }
    issues = window.FLChecker ? window.FLChecker.check($('dy-text').value) : [];
    panel.hidden = false;
    renderCheck();
    if (panel.scrollIntoView) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderCheck() {
    const panel = $('dy-check'), ta = $('dy-text');
    if (!panel || !ta) return;
    const text = ta.value;
    const cnt = $('dy-check-count');
    if (cnt) { cnt.hidden = !issues.length; cnt.textContent = issues.length; }
    if (!text.trim()) {
      panel.innerHTML = '<div class="dy-check-head"><b>🔍 Перевірка тексту</b><button class="dy-x" data-cact="close">✕</button></div><p class="dy-check-empty">Спершу напиши кілька речень англійською.</p>';
      return;
    }
    const fixable = issues.filter(x => x.fix != null).length;
    panel.innerHTML =
      '<div class="dy-check-head">' +
      '<b>' + (issues.length ? '🔍 Знайдено ' + issues.length + ' ' + FL().plural(issues.length, 'підказку', 'підказки', 'підказок') : '✅ Типових помилок не знайдено') + '</b>' +
      (fixable > 1 ? '<button class="btn btn-primary dy-fix-all" data-cact="fix-all">✨ Виправити все (' + fixable + ')</button>' : '') +
      '<button class="dy-x" data-cact="close" title="Закрити">✕</button></div>' +
      (issues.length ? issues.map((x, n) => {
        const a = Math.max(0, x.start - 32), b = Math.min(text.length, x.end + 32);
        const t = topicInfo(x.topic);
        return '<div class="dy-issue" style="animation-delay:' + Math.min(n, 10) * 40 + 'ms">' +
          '<div class="dy-issue-ctx">' + (a > 0 ? '…' : '') + esc(text.slice(a, x.start)) + '<mark>' + esc(x.text) + '</mark>' + esc(text.slice(x.end, b)) + (b < text.length ? '…' : '') + '</div>' +
          '<div class="dy-issue-msg">' + esc(x.msg) + '</div>' +
          '<div class="dy-issue-actions">' +
          (x.fix != null ? '<button class="dy-issue-fix" data-cact="fix" data-n="' + n + '"><s>' + esc(x.text) + '</s> → <b>' + esc(x.fix) + '</b></button>' : '') +
          '<button class="dy-issue-btn" data-cact="show" data-n="' + n + '">👁️ Показати</button>' +
          (t ? '<a class="dy-issue-topic" href="' + t.hash + '">' + t.emoji + ' ' + esc(t.title) + ' →</a>' : '') +
          '</div></div>';
      }).join('') : '<p class="dy-check-empty">Чудово! Перевірка ловить найпоширеніші помилки україномовних (часи, прийменники, порівняння, артиклі…), але не всі — перечитай текст ще раз уголос 😉</p>');
  }

  function onCheckClick(e) {
    const b = e.target.closest('[data-cact]'); if (!b) return;
    const act = b.dataset.cact, ta = $('dy-text');
    if (act === 'close') { $('dy-check').hidden = true; return; }
    if (act === 'fix-all') {
      let v = ta.value, applied = 0;
      /* кілька проходів: правила можуть перекриватися («more better then») */
      for (let pass = 0; pass < 5; pass++) {
        const fx = window.FLChecker.check(v).filter(x => x.fix != null);
        if (!fx.length) break;
        fx.reverse().forEach(x => { v = v.slice(0, x.start) + x.fix + v.slice(x.end); applied++; });
      }
      ta.value = v;
      afterEdit();
      FL().showToast('✨ Виправлено: ' + applied);
      return;
    }
    const x = issues[+b.dataset.n]; if (!x) return;
    if (ta.value.slice(x.start, x.end) !== x.text) { issues = window.FLChecker.check(ta.value); renderCheck(); return; }
    if (act === 'fix') {
      ta.value = ta.value.slice(0, x.start) + x.fix + ta.value.slice(x.end);
      ta.focus();
      ta.setSelectionRange(x.start, x.start + x.fix.length);
      afterEdit();
      FL().showToast('✅ Виправлено');
    } else if (act === 'show') {
      ta.focus();
      ta.setSelectionRange(x.start, x.end);
      const line = ta.value.slice(0, x.start).split('\n').length;
      const lh = parseFloat(getComputedStyle(ta).lineHeight) || 28;
      ta.scrollTop = Math.max(0, (line - 3) * lh);
      if (ta.scrollIntoView) ta.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function afterEdit() {
    updateWordStats();
    saveDraft();
    issues = window.FLChecker.check($('dy-text').value);
    renderCheck();
  }

  /* ---------- words ---------- */
  function renderWords() {
    const list = $('dy-words-list'); if (!list) return;
    const q = wordsQuery.toLowerCase().trim();
    const grouped = {};
    D.WORDS.forEach(g => {
      const items = g.items.filter(it => (!cefrFilter || it.lvl === cefrFilter) && (!q || (it.en + ' ' + it.uk).toLowerCase().includes(q)));
      if (!items.length) return;
      (grouped[g.cat] = grouped[g.cat] || []).push({ sub: g.sub, items });
    });
    const keys = Object.keys(grouped);
    if (!keys.length) { list.innerHTML = '<div class="dy-empty-small">Нічого не знайдено</div>'; return; }
    list.innerHTML = keys.map(k => {
      const meta = D.CAT_META[k] || { emoji: '📖', name: k };
      const total = grouped[k].reduce((s, g) => s + g.items.length, 0);
      return '<div class="dy-cat" data-id="w_' + k + '">' +
        '<button class="dy-cat-head" data-toggle="w_' + k + '"><span class="dy-cat-emoji">' + meta.emoji + '</span><span class="dy-cat-name">' + esc(meta.name) + '</span><span class="dy-cat-count">' + total + '</span><span class="dy-cat-arrow">▶</span></button>' +
        '<div class="dy-cat-body">' + grouped[k].map(g =>
          '<div class="dy-word-sub">' + esc(g.sub) + '</div>' + g.items.map(it =>
            '<div class="dy-word" data-insert="' + esc(it.en) + '"><span class="dy-w-en">' + esc(it.en) + '</span><span class="dy-w-uk">— ' + esc(it.uk) + '</span><span class="dy-cefr-badge cefr-' + it.lvl + '">' + it.lvl + '</span></div>'
          ).join('')).join('') + '</div></div>';
    }).join('');
  }

  /* ---------- reference ---------- */
  function renderReference() {
    const list = $('dy-ref-list'); if (!list) return;
    list.innerHTML = D.REFERENCE.map(cat => {
      const body = cat.items.map(it => {
        if (it.table) return tableHtml(it.table, true);
        if (it.formula) return '<div class="dy-formula mono">' + esc(it.formula) + '</div>';
        if (it.note2) return '<div class="dy-sub dy-tone-purple">' + esc(it.note2) + '</div>';
        if (it.warning) return '<div class="dy-warning">' + esc(it.warning) + '</div>';
        if (it.insert) return '<div class="dy-ref-item" data-insert="' + esc(it.insert) + '"><div><div class="dy-ref-en">' + esc(it.insert).replace(/___/g, '<b>___</b>') + '</div>' +
          (it.uk ? '<span class="dy-ref-uk">🇺🇦 ' + esc(it.uk) + '</span>' : '') + '</div><button class="dy-ins-btn" data-insert="' + esc(it.insert) + '">Insert →</button></div>';
        return '';
      }).join('');
      const count = cat.items.filter(i => i.insert).length;
      return '<div class="dy-cat" data-id="' + esc(cat.id) + '">' +
        '<button class="dy-cat-head" data-toggle="' + esc(cat.id) + '"><span class="dy-cat-emoji">' + cat.emoji + '</span><span class="dy-cat-name">' + esc(cat.name) + '</span>' +
        (count ? '<span class="dy-cat-count">' + count + '</span>' : '') + '<span class="dy-cat-arrow">▶</span></button>' +
        '<div class="dy-cat-body">' + (cat.note ? '<div class="dy-note dy-note-gold">💡 ' + esc(cat.note) + '</div>' : '') + body + '</div></div>';
    }).join('');
  }
  function applyRefSearch() {
    const q = refQuery.toLowerCase().trim();
    const cats = document.querySelectorAll('#dy-ref-list .dy-cat');
    cats.forEach(cat => {
      if (!q) { cat.style.display = ''; cat.querySelectorAll('.dy-ref-item, .dy-warning, .dy-formula').forEach(x => { x.style.display = ''; }); return; }
      let hit = false;
      cat.querySelectorAll('.dy-ref-item, .dy-warning, .dy-formula').forEach(x => {
        const ok = x.textContent.toLowerCase().includes(q);
        x.style.display = ok ? '' : 'none';
        if (ok) hit = true;
      });
      cat.style.display = hit ? '' : 'none';
      if (hit) cat.classList.add('open');
    });
  }

  /* ---------- editor ---------- */
  function insertText(txt) {
    const ta = $('dy-text'); if (!ta) return;
    const start = ta.selectionStart || 0, end = ta.selectionEnd || 0;
    const before = ta.value.substring(0, start), after = ta.value.substring(end);
    const insertion = (before.length > 0 && !/\s$/.test(before) ? ' ' : '') + txt;
    ta.value = before + insertion + after;
    const pos = start + insertion.length;
    ta.focus();
    ta.setSelectionRange(pos, pos);
    updateWordStats();
    saveDraft();
    scheduleCheck();
    insertCount++;
    ls.set(K_INSERTS, String(insertCount));
    toggleWordsDrawer(false);
    hideTip();
    FL().showToast('✅ Вставлено!');
  }

  function updateWordStats() {
    const ta = $('dy-text'); if (!ta) return;
    const w = countWords(ta.value);
    $('dy-wc1').textContent = w;
    $('dy-wc2').textContent = w;
    $('dy-chars').textContent = ta.value.length;
    $('dy-goal').classList.toggle('goal-met', w >= goal);
    const bar = $('dy-goalbar'); if (bar) bar.style.width = Math.min(100, Math.round(w / goal * 100)) + '%';
  }

  function highlightMood() {
    document.querySelectorAll('.dy-mood').forEach(b => b.classList.toggle('active', b.dataset.mood === currentMood));
  }

  function setToday() { const d = $('dy-date'); if (d && !d.value) d.value = today(); }

  function loadDraft() {
    const draft = ls.json(K_DRAFT, null);
    const ta = $('dy-text');
    ta.value = ''; $('dy-title').value = ''; $('dy-date').value = '';
    currentMood = '';
    if (draft) {
      if (draft.text) ta.value = draft.text;
      if (draft.title) $('dy-title').value = draft.title;
      if (draft.date) $('dy-date').value = draft.date;
      if (draft.mood) currentMood = draft.mood;
      editingEntryId = draft.editingId && entries.some(e => e.id === draft.editingId) ? draft.editingId : editingEntryId;
    }
    setToday();
    highlightMood();
    showEditing();
  }

  function saveDraft() {
    const ta = $('dy-text'); if (!ta) return;
    ls.set(K_DRAFT, JSON.stringify({ text: ta.value, title: $('dy-title').value, date: $('dy-date').value, mood: currentMood, editingId: editingEntryId }));
  }

  function onDraftInput() {
    saveDraft();
    clearTimeout(indTimer);
    indTimer = setTimeout(flashIndicator, 800);
  }
  function flashIndicator() {
    const ind = $('dy-autosave'); if (!ind) return;
    ind.textContent = '💾 Чернетку автоматично збережено';
    ind.classList.add('flash');
    setTimeout(() => { if (document.body.contains(ind)) { ind.textContent = '💾 Автозбереження чернетки — увімкнено'; ind.classList.remove('flash'); } }, 1500);
  }

  function resetEditor() {
    $('dy-text').value = '';
    $('dy-title').value = '';
    $('dy-date').value = '';
    currentMood = '';
    editingEntryId = null;
    ls.del(K_DRAFT);
    highlightMood();
    setToday();
    updateWordStats();
    showEditing();
    const panel = $('dy-check'); if (panel) panel.hidden = true;
    scheduleCheck(0);
  }

  function clearDraft() {
    if (!$('dy-text').value.trim() && !$('dy-title').value.trim()) return;
    confirmModal('Очистити чернетку?', 'Всі незбережені зміни будуть втрачені (записи в «Мої записи» не постраждають).', () => {
      resetEditor();
      FL().showToast('🗑️ Чернетку очищено');
    });
  }

  function showEditing() {
    const el = $('dy-editing'); if (el) el.hidden = editingEntryId === null;
  }
  function cancelEdit() {
    resetEditor();
    FL().showToast('↩️ Редагування скасовано');
  }

  function saveEntry() {
    const text = $('dy-text').value.trim();
    const title = $('dy-title').value.trim() || 'Untitled';
    const date = $('dy-date').value || today();
    if (!text) { FL().showToast('⚠️ Спочатку напиши щось у щоденнику!'); return; }
    const words = countWords(text);
    let isNew = false;
    const idx = editingEntryId !== null ? entries.findIndex(e => e.id === editingEntryId) : -1;
    if (idx >= 0) {
      entries[idx] = Object.assign({}, entries[idx], { text, title, date, mood: currentMood, words, updatedAt: Date.now() });
      FL().showToast('✅ Запис оновлено!');
    } else {
      isNew = true;
      entries.unshift({ id: 'e_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7), date, title, text, mood: currentMood, words, createdAt: Date.now() });
      FL().showToast('✅ Запис збережено!');
    }
    saveEntries();
    rewardXp(isNew, date);
    resetEditor();
    updateHeaderStats();
  }

  function rewardXp(isNew, date) {
    FL().touchStreak();
    let xp = isNew ? ENTRY_XP : 0;
    const dayWords = entries.filter(e => e.date === date).reduce((s, e) => s + (e.words || 0), 0);
    const got = ls.json(K_GOAL_XP, []);
    if (dayWords >= goal && Array.isArray(got) && !got.includes(date)) {
      got.push(date); ls.set(K_GOAL_XP, JSON.stringify(got.slice(-400)));
      xp += GOAL_XP;
      setTimeout(() => { try { FL().confetti(); } catch (e) { } FL().showToast('🎯 Ціль дня виконано: ' + dayWords + ' слів! +' + GOAL_XP + ' XP'); }, 900);
    }
    if (xp) FL().addXp(xp);
  }

  /* ============================ ENTRIES ============================ */
  function mountEntries() {
    const panel = $('dy-panel');
    panel.innerHTML =
      '<div class="dy-entries-bar card">' +
      '<input class="text-input dy-search" id="dy-entries-search" placeholder="🔍 Шукати в записах (текст, заголовок, дата)..." autocomplete="off" value="' + esc(entriesQuery) + '">' +
      '<div class="dy-mood-filter" id="dy-mood-filter">' +
      '<button class="sub-chip rd-chip' + (moodFilter === '' ? ' active' : '') + '" data-fmood="">Усі</button>' +
      MOODS.map(([m]) => '<button class="sub-chip rd-chip' + (moodFilter === m ? ' active' : '') + '" data-fmood="' + m + '">' + m + '</button>').join('') +
      '</div></div>' +
      '<div id="dy-entries"></div>';
    $('dy-entries-search').addEventListener('input', e => { entriesQuery = e.target.value; renderEntries(); });
    $('dy-mood-filter').addEventListener('click', e => {
      const c = e.target.closest('[data-fmood]'); if (!c) return;
      moodFilter = c.dataset.fmood;
      document.querySelectorAll('#dy-mood-filter [data-fmood]').forEach(x => x.classList.toggle('active', x === c));
      renderEntries();
    });
    $('dy-entries').addEventListener('click', e => {
      const b = e.target.closest('[data-eact]'); if (!b) return;
      const id = b.closest('.dy-entry').dataset.id;
      if (b.dataset.eact === 'edit') editEntry(id);
      else if (b.dataset.eact === 'del') deleteEntry(id);
      else if (b.dataset.eact === 'expand') {
        const card = b.closest('.dy-entry');
        card.classList.toggle('expanded');
        b.textContent = card.classList.contains('expanded') ? 'Згорнути ▲' : 'Показати повністю ▼';
      }
    });
    renderEntries();
  }

  function renderEntries() {
    const list = $('dy-entries'); if (!list) return;
    updateHeaderStats();
    const q = entriesQuery.toLowerCase().trim();
    let f = entries.slice();
    if (moodFilter) f = f.filter(e => e.mood === moodFilter);
    if (q) f = f.filter(e => (e.title || '').toLowerCase().includes(q) || (e.text || '').toLowerCase().includes(q) || (e.date || '').includes(q));
    f.sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.createdAt || 0) - (a.createdAt || 0));
    if (!f.length) {
      list.innerHTML = '<div class="dy-empty"><div class="dy-empty-emoji">📖</div><h3>' + (entries.length ? 'Нічого не знайдено' : 'Ще жодного запису') + '</h3>' +
        '<p>' + (entries.length ? 'Спробуй інший пошук або фільтр.' : 'Напиши свій перший запис у вкладці <a href="#/diary"><b>✍️ Написати</b></a>!') + '</p></div>';
      return;
    }
    list.innerHTML = f.map((e, i) =>
      '<article class="card dy-entry" data-id="' + esc(e.id) + '" style="animation-delay:' + Math.min(i, 12) * 30 + 'ms">' +
      '<div class="dy-entry-head"><div class="dy-entry-info">' +
      '<div class="dy-entry-title">' + esc(e.title || 'Untitled') + '</div>' +
      '<div class="dy-entry-meta"><span class="dy-date-badge">📅 ' + esc(e.date) + '</span>' +
      (e.mood ? '<span class="dy-mood-badge">' + esc(e.mood) + '</span>' : '') +
      '<span class="dy-words-badge">✍️ ' + (e.words || 0) + ' слів</span>' +
      (e.updatedAt ? '<span class="dy-upd">оновлено</span>' : '') + '</div></div>' +
      '<div class="dy-entry-actions"><button data-eact="edit">✏️ Ред.</button><button data-eact="del" class="del">🗑️ Del</button></div></div>' +
      '<div class="dy-entry-body">' + esc(e.text || '') + '</div>' +
      ((e.text || '').length > 400 ? '<button class="dy-expand" data-eact="expand">Показати повністю ▼</button>' : '') +
      '</article>').join('');
  }

  function editEntry(id) {
    const e = entries.find(x => x.id === id); if (!e) return;
    editingEntryId = id;
    ls.set(K_DRAFT, JSON.stringify({ text: e.text, title: e.title || '', date: e.date, mood: e.mood || '', editingId: id }));
    location.hash = '#/diary';
    setTimeout(() => { FL().showToast('✏️ Редагуй запис і натисни «Зберегти»'); const t = $('dy-text'); if (t) t.focus(); }, 60);
  }

  function deleteEntry(id) {
    confirmModal('Видалити запис?', 'Ця дія незворотна. Запис буде видалено назавжди.', () => {
      entries = entries.filter(e => e.id !== id);
      if (editingEntryId === id) editingEntryId = null;
      saveEntries();
      renderEntries();
      FL().showToast('🗑️ Запис видалено');
    }, true);
  }

  /* ============================ SETTINGS ============================ */
  function mountSettings() {
    const panel = $('dy-panel');
    panel.innerHTML =
      '<div class="dy-settings">' +
      '<div class="card dy-set-card"><h3>📊 Твоя статистика</h3><div class="dy-tiles" id="dy-tiles"></div></div>' +

      '<div class="card dy-set-card"><h3>💾 Резервне копіювання (Backup)</h3>' +
      '<p>Твої записи зберігаються в цьому браузері (<b>localStorage</b>). Вони не зникають при оновленні сторінки, але <b>можуть зникнути</b>, якщо:</p>' +
      '<ul><li>очистиш кеш браузера / cookies</li><li>переінсталюєш браузер</li><li>відкриєш застосунок з іншої адреси (інший домен або файл)</li><li>відкриєш у режимі Інкогніто</li></ul>' +
      '<div class="dy-info warn">⚠️ <b>Рекомендую раз на тиждень робити backup</b> — просто натисни «📤 Експортувати» і збережи файл у Google Drive / Telegram Saved Messages.</div>' +
      '<div class="dy-actions"><button class="btn btn-primary" data-sact="export">📤 Експортувати всі записи (.json)</button>' +
      '<button class="btn btn-ghost" data-sact="import">📥 Імпортувати з .json</button>' +
      '<input type="file" id="dy-import" accept=".json,application/json" hidden></div></div>' +

      '<div class="card dy-set-card"><h3>⚙️ Налаштування</h3><p>🎯 <b>Ціль слів на день:</b></p>' +
      '<div class="dy-actions" id="dy-goals">' + [50, 100, 200, 300].map(n => '<button class="btn btn-ghost' + (goal === n ? ' dy-goal-on' : '') + '" data-goal="' + n + '">' + n + ' слів</button>').join('') + '</div>' +
      '<div class="dy-muted">Поточна ціль: <b id="dy-cur-goal">' + goal + '</b> слів/день · за виконану ціль дня +' + GOAL_XP + ' XP, за кожен новий запис +' + ENTRY_XP + ' XP</div></div>' +

      '<div class="card dy-set-card dy-danger"><h3>⚠️ Небезпечна зона</h3>' +
      '<p>Це видалить <b>ВСІ твої записи назавжди</b>. Спочатку зроби експорт!</p>' +
      '<button class="btn dy-btn-danger-ghost" data-sact="wipe">🗑️ Видалити все</button></div>' +
      '</div>';
    renderTiles();
    panel.addEventListener('click', e => {
      const g = e.target.closest('[data-goal]');
      if (g) { setGoal(+g.dataset.goal); return; }
      const b = e.target.closest('[data-sact]'); if (!b) return;
      if (b.dataset.sact === 'export') exportEntries();
      else if (b.dataset.sact === 'import') $('dy-import').click();
      else if (b.dataset.sact === 'wipe') deleteAll();
    });
    $('dy-import').addEventListener('change', importEntries);
  }

  function renderTiles() {
    const el = $('dy-tiles'); if (!el) return;
    const tw = totalWords();
    let days = 0;
    if (entries.length) {
      const first = entries.reduce((min, e) => (e.date < min ? e.date : min), entries[0].date);
      days = Math.max(1, Math.round((new Date() - new Date(first + 'T00:00:00')) / 86400000) + 1);
    }
    const tile = (n, l) => '<div class="dy-tile"><div class="dy-tile-num">' + n + '</div><div class="dy-tile-lbl">' + l + '</div></div>';
    el.innerHTML = tile(entries.length, 'Записів') + tile(tw.toLocaleString('uk-UA'), 'Слів') + tile(calculateStreak(), 'Днів стрік') +
      tile(entries.length ? Math.round(tw / entries.length) : 0, 'Середнє слів/запис') + tile(days, 'Днів з першого запису') + tile(insertCount, 'Використань довідника');
    updateHeaderStats();
  }

  function setGoal(n) {
    goal = n;
    ls.set(K_GOAL, String(n));
    const cur = $('dy-cur-goal'); if (cur) cur.textContent = n;
    document.querySelectorAll('#dy-goals [data-goal]').forEach(b => b.classList.toggle('dy-goal-on', +b.dataset.goal === n));
    FL().showToast('🎯 Ціль: ' + n + ' слів/день');
  }

  function exportEntries() {
    if (!entries.length) { FL().showToast('⚠️ Немає записів для експорту'); return; }
    const data = { exportedAt: new Date().toISOString(), version: 1, entries, goal, insertCount };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'diary-backup-' + today() + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    FL().showToast('📤 Backup завантажено!');
  }

  function importEntries(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      let data;
      try { data = JSON.parse(ev.target.result); } catch (err) { FL().showToast('❌ Помилка читання файлу'); event.target.value = ''; return; }
      event.target.value = '';
      if (!data || !Array.isArray(data.entries)) { FL().showToast('❌ Неправильний формат файлу'); return; }
      const valid = data.entries.filter(x => x && typeof x === 'object' && typeof x.text === 'string');
      confirmModal('Імпортувати записи?', 'Знайдено <b>' + valid.length + '</b> записів у файлі. Об’єднати з поточними? (записи з однаковим ID замінять поточні)', () => {
        let added = 0, updated = 0;
        valid.forEach(src => {
          const ent = {
            id: typeof src.id === 'string' && src.id ? src.id : 'imp_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
            date: /^\d{4}-\d{2}-\d{2}$/.test(src.date || '') ? src.date : today(),
            title: String(src.title || 'Untitled'), text: src.text, mood: String(src.mood || ''),
            words: typeof src.words === 'number' ? src.words : countWords(src.text),
            createdAt: src.createdAt || Date.now()
          };
          if (src.updatedAt) ent.updatedAt = src.updatedAt;
          const i = entries.findIndex(e => e.id === ent.id);
          if (i >= 0) { entries[i] = ent; updated++; } else { entries.push(ent); added++; }
        });
        saveEntries();
        renderTiles();
        FL().showToast('✅ Імпортовано: +' + added + ' нових, ' + updated + ' оновлено');
      });
    };
    reader.readAsText(file);
  }

  function deleteAll() {
    if (!entries.length) { FL().showToast('Ще немає записів для видалення'); return; }
    confirmModal('⚠️ УВАГА! Видалити ВСІ записи?', 'Це видалить <b>' + entries.length + '</b> записів назавжди. Спочатку зроби експорт (📤). Продовжити?', () => {
      entries = [];
      editingEntryId = null;
      saveEntries();
      renderTiles();
      FL().showToast('🗑️ Усі записи видалено');
    }, true);
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('#dy-tip-pop') && !e.target.closest('[data-tip]')) hideTip();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { hideTip(); toggleWordsDrawer(false); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && document.activeElement && document.activeElement.id === 'dy-text') { e.preventDefault(); saveEntry(); }
  });

  window.FLDiary = {
    route,
    summary() {
      const list = ls.json(K_ENTRIES, []);
      const arr = Array.isArray(list) ? list : [];
      entries = arr;
      return { count: arr.length, words: arr.reduce((s, e) => s + (e.words || 0), 0), streak: calculateStreak() };
    }
  };
})();
