/* ============================================================
   EngLift — словник за частинами мови: браузер, картки, тренажери на введення
   Дані (js/lexis/*.js) підвантажуються лише при вході в розділ.
   ============================================================ */
(function () {
  'use strict';

  const C = window.FLCore;
  const { $, $$, esc, norm, fillEq, plural, shuffle, store, save, topicKey, touchStreak,
    markKnown, isKnown, showToast, updateStreak, addXp, confetti, speakLang, speak, ttsClean,
    progressBar, setCrumbs, notFound } = C;

  /* ---------- словник за частинами мови ---------- */
  const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  /* дані словників (js/lexis/*.js) вантажаться лише при вході в розділ, тому
     words / cats / subs — справжні геттери (Object.assign копіював би значення). */
  const lazy = (base, words, cats, subs) => Object.defineProperties(base, {
    words: { get: () => words() || [], enumerable: true },
    cats: { get: () => cats() || {}, enumerable: true },
    subs: { get: () => subs() || {}, enumerable: true }
  });
  const POS = {
    verbs: lazy({ id: 'verbs', emoji: '💪', en: 'Verbs', uk: 'Дієслова', isVerbs: true, multiCat: true, tabs: ['browser', 'cards', 'enuk', 'uken', 'forms', 'ctx', 'wod', 'mix'] },
      () => typeof LEX_VERBS !== 'undefined' ? LEX_VERBS : null,
      () => typeof LEX_VERB_CATS !== 'undefined' ? LEX_VERB_CATS : null,
      () => typeof LEX_VERB_SUBS !== 'undefined' ? LEX_VERB_SUBS : null),
    nouns: lazy({ id: 'nouns', emoji: '📦', en: 'Nouns', uk: 'Іменники', isNouns: true, multiCat: true, tabs: ['browser', 'cards', 'enuk', 'uken', 'cu', 'mix'] },
      () => typeof LEX_NOUNS !== 'undefined' ? LEX_NOUNS : null,
      () => typeof LEX_NOUN_CATS !== 'undefined' ? LEX_NOUN_CATS : null,
      () => typeof LEX_NOUN_SUBS !== 'undefined' ? LEX_NOUN_SUBS : null),
    adjs: lazy({ id: 'adjs', emoji: '🎨', en: 'Adjectives', uk: 'Прикметники', isAdjs: true, multiCat: true, tabs: ['browser', 'cards', 'enuk', 'uken', 'forms', 'ctx', 'stories', 'mix'] },
      () => typeof LEX_ADJS !== 'undefined' ? LEX_ADJS : null,
      () => typeof LEX_ADJ_CATS !== 'undefined' ? LEX_ADJ_CATS : null,
      () => typeof LEX_ADJ_SUBS !== 'undefined' ? LEX_ADJ_SUBS : null),
    advs: lazy({ id: 'advs', emoji: '🏃', en: 'Adverbs', uk: 'Прислівники', isAdvs: true, multiCat: true, tabs: ['browser', 'cards', 'enuk', 'uken', 'ctx', 'mix'] },
      () => typeof LEX_ADVS !== 'undefined' ? LEX_ADVS : null,
      () => typeof LEX_ADV_CATS !== 'undefined' ? LEX_ADV_CATS : null,
      () => typeof LEX_ADV_SUBS !== 'undefined' ? LEX_ADV_SUBS : null)
  };

  const POS_ORDER = ['verbs', 'nouns', 'adjs', 'advs'];
  /* ---------- ліниве завантаження ---------- */
  const LEX_SRC = {
    verbs: ['js/lexis/verbs-data.js', 'js/lexis/verbs-phrasal-data.js', 'js/lexis/verbs-merge.js'],
    nouns: ['js/lexis/nouns-data.js'],
    adjs: ['js/lexis/adjs-data.js', 'js/lexis/adjs-prep-data.js', 'js/lexis/adj-stories.js'],
    advs: ['js/lexis/advs-data.js']
  };
  const META = () => window.LEX_META || {};
  const loaded = posId => !!POS[posId].words.length;
  const loading = {};
  function ensure(posId) {
    if (loaded(posId)) return Promise.resolve();
    if (loading[posId]) return loading[posId];
    loading[posId] = LEX_SRC[posId].reduce((chain, src) => chain.then(() => new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = src;
      el.onload = resolve;
      el.onerror = () => { el.remove(); reject(new Error('не вдалося завантажити ' + src)); };
      document.head.appendChild(el);
    })), Promise.resolve()).then(() => { adultWords = null; }).catch(e => { loading[posId] = null; throw e; });
    return loading[posId];
  }
  /* скільки слів у частині мови — з даних або з лічильників, поки їх нема */
  function posCount(posId) {
    if (loaded(posId)) return POS[posId].words.filter(wVisible).length;
    const m = META()[posId] || {};
    return (adultOn() ? m.total : m.safe) || 0;
  }
  function catCount(posId) {
    if (loaded(posId)) return Object.keys(POS[posId].cats).filter(c => catVisible(POS[posId].cats[c])).length;
    return (META()[posId] || {}).cats || 0;
  }



  function wordInCat(P, w, catId) {
    return P.multiCat ? (w.cats || []).includes(catId) : (w.cat === catId || w.sub === catId);
  }
  /* 18+ visibility: hidden by default, unlocked via "18+" / "unlock18" in the lex search */
  const adultOn = () => !!store.adult;
  /* 18+ слово = позначка adult АБО належність хоча б до однієї 18+ категорії/підкатегорії
     (деякі слова стоять і в звичайних, і в 18+ категоріях, без позначки на самому слові) */
  let adultWords = null;
  function isAdultWord(w) {
    if (!adultWords) {
      adultWords = new Set();
      POS_ORDER.forEach(p => {
        const P = POS[p];
        const ids = new Set([...Object.entries(P.cats), ...Object.entries(P.subs)].filter(([, c]) => c && c.adult).map(([id]) => id));
        P.words.forEach(v => {
          if (v.adult || [].concat(v.cats || [], v.cat || [], v.sub || []).some(id => ids.has(id))) adultWords.add(v);
        });
      });
    }
    return adultWords.has(w);
  }
  const wVisible = w => adultOn() || !isAdultWord(w);
  const catVisible = c => adultOn() || !c.adult;
  function poolForScope(P, scope) {
    if (scope === 'all') return P.words.filter(wVisible);
    return P.words.filter(w => wVisible(w) && wordInCat(P, w, scope));
  }
  function splitLabel(label) {
    const parts = String(label || '').split(' — ');
    return { en: parts[0] || label, uk: parts[1] || '' };
  }

  function lexStats() {
    const totalWords = POS_ORDER.reduce((a, p) => a + posCount(p), 0);
    const knownWords = POS_ORDER.reduce((a, p) => a + (store.words[p] || []).length, 0);
    return { totalWords, knownWords };
  }

  /* ============================ СЛОВНИК (за частинами мови) ============================ */
  const TAB_META = {
    browser: { icon: '📚', label: 'Браузер' },
    cards: { icon: '🃏', label: 'Картки' },
    enuk: { icon: '🇬🇧', label: 'EN → UK' },
    uken: { icon: '🇺🇦', label: 'UK → EN' },
    forms: { icon: '🔧', label: 'Форми' },
    ctx: { icon: '🧩', label: 'Контекст' },
    cu: { icon: '⚖️', label: 'C / U' },
    mix: { icon: '🎲', label: 'Мікс' },
    stories: { icon: '📖', label: 'Історії' },
    wod: { icon: '🎯', label: 'Word on Demand' }
  };

  const lexUI = {};
  function lexState(posId) {
    return lexUI[posId] || (lexUI[posId] = { cat: null, sub: null, q: '', lvls: new Set(LEVELS), expanded: null });
  }
  const cardsMem = {};
  const quizMem = {};

  function vocabHub(view) {
    setCrumbs([{ label: 'Словник' }]);
    const ls = lexStats();
    view.innerHTML =
      '<div class="page-head"><span class="emoji-big">🗂️</span><h1>Словник</h1><p>Обери частину мови. Всередині — браузер слів з пошуком і фільтрами, картки «Знаю / Не знаю» та тренажери на введення.</p></div>' +
      '<div class="grid-cards">' + POS_ORDER.map(id => {
        const P = POS[id];
        const known = (store.words[id] || []).length;
        const total = posCount(id);
        const pct = total ? known / total : 0;
        return '<a class="card clickable topic-card" href="#/vocab/' + id + '">' +
          '<div class="t-top"><h3>' + P.emoji + ' ' + P.en + ' — ' + P.uk + '</h3></div>' +
          '<div class="t-meta"><span class="tag">' + posCount(id) + ' слів</span><span class="tag cyan">' + P.tabs.length + ' ' + plural(P.tabs.length, 'вкладка', 'вкладки', 'вкладок') + '</span></div>' +
          progressBar(pct) +
          '<div class="progress-label"><span>вивчено ' + known + '</span><span>' + Math.round(pct * 100) + '%</span></div>' +
          '</a>';
      }).join('') + '</div>' +
      (window.FLPhrases ? '<h2 class="section-title">🎲 Поглиблено</h2><div class="grid-cards">' +
        ['polysemy', 'chunks', 'intensifiers'].map(k => {
          const T = window.FLPhrases.TRAINERS[k];
          return '<a class="card clickable xlink-card" href="#/phrases/' + k + '">' +
            '<div class="t-top"><h3>' + T.emoji + ' ' + esc(T.short) + '</h3></div>' +
            '<div class="t-meta"><span class="tag">' + esc(T.uk) + '</span></div>' +
            '<p class="t-desc">' + esc(T.desc) + '</p></a>';
        }).join('') + '</div>' : '') +
      '<div style="height:14px"></div>' +
      '<div class="card" style="padding:18px 20px;font-size:13.5px;color:var(--muted);line-height:1.6">💡 У браузері клацни на картку слова, щоб побачити приклад і озвучення. У картках позначай <b>✓ Знаю</b> / <b>✗ Не знаю</b> — вивчені слова зберігаються у твоєму прогресі.</div>';
  }

  function posPage(view, posId, tab) {
    const P = POS[posId];
    /* навігація збоку завжди повертає браузер до хаба категорій */
    const st = lexState(posId);
    st.cat = null; st.sub = null; st.q = ''; st.expanded = null;
    setCrumbs([{ label: 'Словник', hash: '#/vocab' }, { label: P.uk }, { label: TAB_META[tab].label }]);
    view.innerHTML =
      '<a class="back-link" href="#/vocab">← Словник</a>' +
      '<div class="page-head" style="margin-bottom:14px"><span class="emoji-big">' + P.emoji + '</span><h1>' + P.en + ' — ' + P.uk + '</h1>' +
      '<p>' + P.words.filter(wVisible).length + ' слів · рівні A1–C2 · озвучення 🔊' + (adultOn() ? ' · 🔞 18+' : '') + '</p></div>' +
      '<div class="tabs" id="pos-tabs">' + P.tabs.map(t =>
        '<a class="tab ' + (t === tab ? 'active' : '') + '" href="#/vocab/' + posId + (t === 'browser' ? '' : '/' + t) + '">' + TAB_META[t].icon + ' ' + TAB_META[t].label + '</a>'
      ).join('') + '</div>' +
      '<div class="panel" id="lex-panel"></div>';

    const panel = $('#lex-panel');
    if (tab === 'browser') renderBrowser(panel, posId);
    else if (tab === 'cards') renderCards(panel, posId);
    else if (tab === 'stories') renderStories(panel);
    else if (tab === 'wod') window.FLWod.render(panel);
    else renderTyping(panel, posId, tab);
  }

  /* ---------- ІСТОРІЇ З ПРОПУСКАМИ (прикметники) ---------- */
  const STORY_LEVELS = ['A2', 'B1', 'B2', 'C1'];
  const storyUI = { cur: null, st: {} };
  const storyList = () => typeof LEX_ADJ_STORIES !== 'undefined' ? LEX_ADJ_STORIES : (window.LEX_ADJ_STORIES || []);
  const parsedStories = {};
  function parseStory(s) {
    if (parsedStories[s.id]) return parsedStories[s.id];
    const parts = [], gaps = [], re = /\[([^\]|]+)\|([^\]|]*)\|([^\]]+)\]/g;
    let last = 0, m;
    while ((m = re.exec(s.text))) {
      parts.push(s.text.slice(last, m.index));
      gaps.push({ en: m[1].trim(), syn: m[2].split(',').map(x => x.trim()).filter(Boolean), uk: m[3].trim() });
      last = re.lastIndex;
    }
    parts.push(s.text.slice(last));
    return (parsedStories[s.id] = { parts, gaps });
  }
  const gapClean = s => String(s).toLowerCase().replace(/[‘’ʼ`]/g, "'").replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
  const { oneTypo } = C;
  function judgeGap(g, val) {
    const v = gapClean(val);
    if (!v) return { r: 'empty' };
    if (v === gapClean(g.en)) return { r: 'ok' };
    if (g.syn.some(s => gapClean(s) === v)) return { r: 'syn' };
    const near = v.length >= 4 && [g.en].concat(g.syn).find(s => oneTypo(v, gapClean(s)));
    return near ? { r: 'almost', fix: near } : { r: 'bad' };
  }
  function adjInfo(en) {
    const w = POS.adjs.words.find(x => x.en.toLowerCase() === en.toLowerCase());
    return w ? { ipa: w.ipa, lvl: w.lvl } : {};
  }
  function storyBest(id) { return (store.stories || {})[id]; }

  function renderStories(panel) {
    const list = storyList();
    const cur = list.find(s => s.id === storyUI.cur);
    if (cur) return drawStory(panel, cur);

    panel.innerHTML =
      '<div class="quiz-hint" style="text-align:left;margin-bottom:16px">📖 Прочитай історію й заповни пропуски прикметниками за українською підказкою. ' +
      'Синоніми теж зараховуються — після перевірки побачиш усі варіанти.</div>' +
      STORY_LEVELS.filter(l => list.some(s => s.lvl === l)).map(l =>
        '<h2 class="section-title">' + lvlBadge(l) + ' Рівень ' + l + '</h2><div class="grid-cards">' +
        list.filter(s => s.lvl === l).map(s => {
          const n = parseStory(s).gaps.length, best = storyBest(s.id);
          return '<button class="card clickable topic-card st-pick" data-id="' + s.id + '">' +
            '<div class="t-top"><h3>' + s.emoji + ' ' + esc(s.title) + '</h3></div>' +
            '<div class="t-meta"><span>' + esc(s.uk) + '</span><span class="tag">' + n + ' пропусків</span>' +
            (best != null ? '<span class="tag ' + (best === n ? 'green' : 'cyan') + '">⭐ ' + best + ' / ' + n + '</span>' : '<span class="tag pink">нова</span>') +
            '</div></button>';
        }).join('') + '</div>'
      ).join('');
    $$('.st-pick', panel).forEach(b => b.addEventListener('click', () => { storyUI.cur = b.dataset.id; renderStories(panel); }));
  }

  function drawStory(panel, s) {
    const list = storyList();
    const { parts, gaps } = parseStory(s);
    const st = storyUI.st[s.id] || (storyUI.st[s.id] = { vals: gaps.map(() => ''), res: gaps.map(() => null), scored: false });

    const gapHtml = (g, i) => {
      const w = Math.min(Math.max(g.uk.length, g.en.length, 7), 22) + 2;
      return '<span class="st-gap"><input class="st-in" data-i="' + i + '" style="width:' + w + 'ch" placeholder="' + esc(g.uk) + '" title="' + esc(g.uk) + '" ' +
        'autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Пропуск ' + (i + 1) + ': ' + esc(g.uk) + '"><span class="st-fix"></span></span>';
    };
    const body = parts.map((p, i) => esc(p).replace(/\n\n/g, '</p><p>') + (i < gaps.length ? gapHtml(gaps[i], i) : '')).join('');

    panel.innerHTML =
      '<button class="back-link st-back" type="button">← Усі історії</button>' +
      '<div class="st-head"><span class="st-emoji">' + s.emoji + '</span><div><h2>' + esc(s.title) + '</h2>' +
      '<div class="t-meta">' + lvlBadge(s.lvl) + ' <span>' + esc(s.uk) + '</span> · <span id="st-count"></span></div></div></div>' +
      '<div class="quiz-hint" style="text-align:left">Впиши прикметник англійською. Під пропуском — підказка українською. <b>Enter</b> — до наступного пропуску.</div>' +
      '<div class="st-text"><p>' + body + '</p></div>' +
      '<div class="quiz-fb" id="st-fb" role="status" aria-live="polite"></div>' +
      '<div class="quiz-actions">' +
      '<button class="btn btn-good" id="st-check">✓ Перевірити</button>' +
      '<button class="btn btn-ghost" id="st-hint">💡 Перша літера</button>' +
      '<button class="btn btn-ghost" id="st-show">👁 Відповіді</button>' +
      '<button class="btn btn-ghost" id="st-reset">🔁 Заново</button>' +
      '<button class="btn btn-primary" id="st-next">Наступна →</button>' +
      '</div><div id="st-review"></div>';

    const inputs = $$('.st-in', panel);
    const fb = $('#st-fb', panel);

    function paint(i) {
      const inp = inputs[i], res = st.res[i], fix = inp.nextElementSibling, g = gaps[i];
      inp.value = st.vals[i];
      inp.className = 'st-in' + (res ? ' ' + res.r : '');
      inp.readOnly = !!res && (res.r === 'ok' || res.r === 'syn' || res.r === 'shown');
      fix.textContent = !res ? '' : res.r === 'syn' ? '✓ ' + g.en : res.r === 'almost' ? '≈ ' + res.fix : res.r === 'bad' ? '→ ' + g.en : '';
    }
    function counts() {
      const c = { ok: 0, syn: 0, almost: 0, bad: 0, shown: 0 };
      st.res.forEach(r => { if (r && c[r.r] != null) c[r.r]++; });
      return c;
    }
    function updCount() {
      const filled = st.vals.filter(v => v.trim()).length;
      $('#st-count', panel).textContent = 'заповнено ' + filled + ' / ' + gaps.length;
    }
    function review() {
      const box = $('#st-review', panel);
      if (!st.res.some(Boolean)) { box.innerHTML = ''; return; }
      box.innerHTML = '<h3 class="st-rev-title">📋 Розбір і синоніми <button class="btn btn-ghost st-listen" type="button">🔊 Прослухати історію</button></h3><div class="st-rev">' +
        gaps.map((g, i) => {
          const r = st.res[i] ? st.res[i].r : 'empty', info = adjInfo(g.en);
          const icon = { ok: '✅', syn: '✅', almost: '🟡', bad: '❌', shown: '👁', empty: '⬜' }[r];
          return '<div class="st-rev-row ' + r + '"><span class="st-rev-n">' + icon + '</span>' +
            '<button class="st-say" data-say="' + esc(g.en) + '" aria-label="Озвучити">🔊</button>' +
            '<div><b>' + esc(g.en) + '</b>' + (info.ipa ? ' <span class="st-ipa">' + esc(info.ipa) + '</span>' : '') + (info.lvl ? ' ' + lvlBadge(info.lvl) : '') +
            ' <span class="st-uk">— ' + esc(g.uk) + '</span>' +
            (g.syn.length ? '<div class="st-syn">≈ ' + g.syn.map(esc).join(', ') + '</div>' : '') +
            ((r === 'bad' || r === 'almost') && st.vals[i].trim() ? '<div class="st-yours">твоя відповідь: ' + esc(st.vals[i]) + '</div>' : '') +
            '</div></div>';
        }).join('') + '</div>';
      $('.st-listen', box).addEventListener('click', e => {
        const full = parts.map((p, i) => p + (i < gaps.length ? (st.res[i] && (st.res[i].r === 'ok' || st.res[i].r === 'syn') ? st.vals[i] : gaps[i].en) : '')).join('');
        speak(full.replace(/\n+/g, ' '), e.currentTarget);
      });
      $$('.st-say', box).forEach(b => b.addEventListener('click', () => speak(b.dataset.say, b)));
    }

    function check() {
      if (!st.vals.some(v => v.trim())) { showToast('✍️ Спершу заповни хоча б один пропуск'); inputs[0].focus(); return; }
      gaps.forEach((g, i) => {
        const prev = st.res[i];
        if (prev && (prev.r === 'ok' || prev.r === 'syn' || prev.r === 'shown')) return;
        const j = judgeGap(g, st.vals[i]);
        st.res[i] = j.r === 'empty' ? null : j;
        paint(i);
      });
      const c = counts(), good = c.ok + c.syn;
      if (!st.scored) {
        st.scored = true;
        store.stories = store.stories || {};
        store.stories[s.id] = Math.max(store.stories[s.id] || 0, good);
        if (good) addXp(good * 5);
        if (good === gaps.length) { store.perfect++; confetti(); }
        touchStreak(); save();
      }
      const left = gaps.length - good - c.shown;
      fb.className = 'quiz-fb ' + (left ? (good ? 'skip' : 'no') : 'ok');
      fb.innerHTML = (left ? '' : '🎉 ') + '<b>' + good + ' / ' + gaps.length + '</b> правильно' +
        (c.syn ? ' · зокрема ' + c.syn + ' ' + plural(c.syn, 'синонім', 'синоніми', 'синонімів') : '') +
        (c.almost ? ' · 🟡 ' + c.almost + ' з одруківкою' : '') +
        (left ? ' · виправ червоні й жовті пропуски та перевір ще раз' : '');
      review();
      const firstOpen = inputs.find(x => !x.readOnly && x.className.match(/bad|almost/)) || inputs.find(x => !x.readOnly && !x.value);
      if (firstOpen) firstOpen.focus();
    }

    inputs.forEach((inp, i) => {
      paint(i);
      inp.addEventListener('input', () => {
        st.vals[i] = inp.value;
        if (st.res[i]) { st.res[i] = null; inp.className = 'st-in'; inp.nextElementSibling.textContent = ''; }
        updCount();
      });
      inp.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const next = inputs.slice(i + 1).find(x => !x.readOnly);
        if (next) next.focus(); else check();
      });
    });
    updCount(); review();

    $('.st-back', panel).addEventListener('click', () => { storyUI.cur = null; renderStories(panel); });
    $('#st-check', panel).addEventListener('click', check);
    $('#st-hint', panel).addEventListener('click', () => {
      let n = 0;
      inputs.forEach((inp, i) => {
        if (inp.readOnly || gapClean(st.vals[i]).startsWith(gaps[i].en[0].toLowerCase())) return;
        st.vals[i] = gaps[i].en[0]; st.res[i] = null; paint(i); n++;
      });
      updCount();
      const f = inputs.find(x => !x.readOnly && x.value.length <= 1); if (f) f.focus();
      if (!n) showToast('💡 Усі перші літери вже на місці');
    });
    $('#st-show', panel).addEventListener('click', () => {
      st.scored = true;
      gaps.forEach((g, i) => {
        const r = st.res[i] && st.res[i].r;
        if (r === 'ok' || r === 'syn') return;
        st.vals[i] = g.en; st.res[i] = { r: 'shown' }; paint(i);
      });
      fb.className = 'quiz-fb skip'; fb.innerHTML = '👁 Відповіді показано. Натисни <b>🔁 Заново</b>, щоб пройти історію ще раз.';
      updCount(); review();
    });
    $('#st-reset', panel).addEventListener('click', () => { delete storyUI.st[s.id]; drawStory(panel, s); });
    $('#st-next', panel).addEventListener('click', () => {
      const nx = list[(list.indexOf(s) + 1) % list.length];
      storyUI.cur = nx.id; drawStory(panel, nx);
      window.scrollTo(0, 0);
    });
  }

  /* ---------- BRAUSER ---------- */
  function lvlBadge(lvl) { return '<span class="wb lvl-' + lvl + '">' + lvl + '</span>'; }

  /* правильна форма минулого часу за правилами правопису: like→liked, carry→carried, stop→stopped */
  const DOUBLING = new Set(['admit', 'permit', 'commit', 'submit', 'omit', 'transmit', 'acquit', 'prefer', 'refer', 'infer', 'occur', 'regret', 'control', 'patrol', 'equip', 'propel', 'expel', 'compel', 'repel', 'rebel', 'allot', 'format', 'kidnap', 'unwrap', 'worship']);
  function regularPast(base) {
    const b = base.toLowerCase();
    if (/e$/.test(b)) return base + 'd';
    if (/[^aeiou]y$/.test(b)) return base.slice(0, -1) + 'ied';
    if (/c$/.test(b)) return base + 'ked';                       // panic → panicked
    if (/[^aeiou][aeiou]l$/.test(b)) return base + 'led';        // travel → travelled (брит.)
    if (DOUBLING.has(b)) return base + base.slice(-1) + 'ed';    // admit → admitted
    if (/^[^aeiou]*[aeiou][^aeiouwxy]$/.test(b)) return base + base.slice(-1) + 'ed';
    return base + 'ed';
  }
  /* для фразових дієслів частка лишається на місці: check in → checked in */
  function regularFormsOf(en) {
    const parts = en.split(' ');
    return regularPast(parts[0]) + (parts.length > 1 ? ' ' + parts.slice(1).join(' ') : '');
  }
  function verbFormsOf(v) {
    const past = v.past || regularFormsOf(v.en);
    const pp = v.pp || past;
    return { past, pp };
  }
  /* неправильне — лише те, що справді не збігається з правилом (carry on → carried on усе ще правильне) */
  const isIrreg = v => {
    if (!v.past && !v.pp) return v.reg === false;
    const given = String(v.past || '').split('/')[0].trim().split(' ')[0].toLowerCase();
    return given !== regularPast(v.en.split(' ')[0]).toLowerCase();
  };

  function renderBrowser(panel, posId) {
    const P = POS[posId], st = lexState(posId);
    panel.innerHTML =
      '<details class="legend">' +
      '<summary>📖 Що означають бейджі? (клац)</summary>' +
      '<div class="legend-body">' +
      '<div class="legend-item"><span class="wb lvl-A1">A1</span><span><b>CEFR-рівень</b> від A1 (базовий) до C2 (вільне володіння).</span></div>' +
      (P.isVerbs ? (
        '<div class="legend-item"><span class="demo-ctx">spend <i>(money)</i></span><span><b>Контекст-компаньйон</b> — підказує, з яким словом дієслово часто вживається.</span></div>' +
        '<div class="legend-item"><span class="wb wb-reg">reg</span><span><b>Правильне</b> дієслово: просто +ed.</span></div>' +
        '<div class="legend-item"><span class="wb wb-irreg">irreg</span><span><b>Неправильне</b> — усі 3 форми показано на картці.</span></div>' +
        '<div class="legend-item"><span class="wb wb-formal">🎩 formal</span><span><b>Регістр</b>: 🌸 casual — розмовне, 🎩 formal — офіційне.</span></div>'
      ) : '') +
      (P.isNouns ? (
        '<div class="legend-item"><span class="wb wb-cu">C</span><span><b>Countable</b> — злічуваний: a cat, two cats.</span></div>' +
        '<div class="legend-item"><span class="wb wb-cu-u">U</span><span><b>Uncountable</b> — незлічуваний: water, money (без a/an і множини).</span></div>' +
        '<div class="legend-item"><span class="demo-ctx">tooth → teeth</span><span><b>Множина</b> — показана на картці, якщо вона нестандартна.</span></div>' +
        '<div class="legend-item"><span class="wb wb-med">⚕️ medical</span><span><b>Регістр</b>: 🌸 casual — розмовне, 🎩 formal — офіційне, ⚕️ — медичний термін.</span></div>'
      ) : '') +
      (P.isAdjs ? (
        '<div class="legend-item"><span class="demo-ctx">kind → kinder → kindest</span><span><b>Ступені порівняння</b> — компаратив і суперлатив показано на картці та у тренажері «Форми».</span></div>' +
        '<div class="legend-item"><span class="demo-ctx">syn / ant</span><span><b>Синоніми й антоніми</b> — усередині картки.</span></div>' +
        '<div class="legend-item"><span class="wb wb-formal">🎩 formal</span><span><b>Регістр</b>: 🌸 casual — розмовне, 🎩 formal — офіційне.</span></div>'
      ) : '') +
      (P.isAdvs ? (
        '<div class="legend-item"><span class="demo-ctx">deeply <i>(ashamed)</i></span><span><b>Контекст-компаньйон</b> — підказує, з яким словом прислівник часто вживається.</span></div>' +
        '<div class="legend-item"><span class="demo-ctx">hard ≠ hardly</span><span><b>Пастки</b> — деякі прислівники виглядають оманливо: <b>hardly</b> = «майже не», а не «тяжко». Дивись 💡-нотатки.</span></div>' +
        '<div class="legend-item"><span class="wb wb-formal">🎩 formal</span><span><b>Регістр</b>: 🌸 casual — розмовне, 🎩 formal — офіційне.</span></div>'
      ) : '') +
      '<div class="legend-item"><span style="font-size:17px">🔊</span><span><b>Клац на картці</b> — розгортає деталі: приклад, переклад і кнопки <b>🇺🇸 US · 🇬🇧 UK · 🐢 Slow</b>.</span></div>' +
      '<div class="legend-item"><span style="font-size:17px">📚</span><span><b>Кнопка 📚</b> — форми дієслова та похідні слова.</span></div>' +
      '</div></details>' +
      '<div class="crumb-line" id="lex-crumb"></div>' +
      '<div class="lex-toolbar">' +
      '<input type="text" class="text-input lex-search" id="lex-search" placeholder="🔍 Пошук по слову або перекладу…" value="' + esc(st.q) + '" autocomplete="off">' +
      '<div class="chip-row"><span class="chip-label">Рівень:</span>' + LEVELS.map(l =>
        '<button class="chip-lvl ' + (st.lvls.has(l) ? 'active' : '') + '" data-l="' + l + '"><span class="wb lvl-' + l + '">' + l + '</span></button>'
      ).join('') + '</div>' +
      '</div>' +
      '<div id="lex-content"></div>';

    $('#lex-search').addEventListener('input', e => {
      const raw = e.target.value.trim();
      /* прихований режим 18+: "18+" перемикає, unlock18/lock18 — явно */
      if (/^(18\+|unlock ?18|lock ?18|18-)$/i.test(raw)) {
        const turnOn = /^unlock ?18$/i.test(raw) ? true : /^(lock ?18|18-)$/i.test(raw) ? false : !store.adult;
        store.adult = turnOn; save();
        /* колоди карток і тренажери збираються заново — без «застряглих» 18+ слів */
        Object.keys(cardsMem).forEach(k => delete cardsMem[k]);
        Object.keys(quizMem).forEach(k => delete quizMem[k]);
        e.target.value = ''; st.q = '';
        if (!turnOn) { st.cat = null; st.sub = null; }
        showToast(turnOn ? '🔞 Режим 18+ увімкнено — прихована категорія тепер у браузері' : '🔒 Режим 18+ вимкнено');
        renderLexContent(posId);
        return;
      }
      st.q = raw;
      renderLexContent(posId);
      const inp = $('#lex-search');
      if (inp) { inp.focus(); const L = inp.value.length; inp.setSelectionRange(L, L); }
    });
    $$('.chip-lvl', panel).forEach(b => b.addEventListener('click', () => {
      const l = b.dataset.l;
      st.lvls.has(l) ? st.lvls.delete(l) : st.lvls.add(l);
      b.classList.toggle('active');
      renderLexContent(posId);
    }));
    renderLexContent(posId);
  }

  function renderLexContent(posId) {
    const P = POS[posId], st = lexState(posId);
    const box = $('#lex-content');
    const crumb = $('#lex-crumb');
    if (!box) return;

    const lvlOk = v => st.lvls.has(v.lvl);

    /* пошук */
    if (st.q) {
      const q = st.q.toLowerCase();
      let matches = P.words.filter(v => lvlOk(v) && wVisible(v) &&
        (v.en.toLowerCase().includes(q) || v.uk.toLowerCase().includes(q) || (v.ctx && v.ctx.toLowerCase().includes(q))));
      const capped = matches.slice(0, 240);
      box.innerHTML = '<div class="hub-section-title">🔍 Знайдено: ' + matches.length + (matches.length > capped.length ? ' (показано перші ' + capped.length + ')' : '') + '</div>' +
        '<div class="words-grid">' + capped.map((v, i) => wordCardHtml(posId, v)).join('') + '</div>';
      if (crumb) crumb.style.display = 'none';
      bindWordCards(box, posId);
      return;
    }

    if (crumb) crumb.style.display = 'flex';

    /* delex hub (лише дієслова) */
    if (P.isVerbs && st.cat === 'delex') {
      if (crumb) crumb.innerHTML = lexCrumbHtml(posId, '<span class="crumb-cur">🧩 Delexical — Make / Take / Have / Do / Get</span>');
      const DELEX = (typeof LEX_DELEX !== 'undefined' ? LEX_DELEX : {});
      box.innerHTML = '<div class="hub-grid">' + Object.entries(DELEX).map(([id, hub]) =>
        '<div class="hub-card has-sub" data-delex="' + id + '"><div class="h-emoji">' + hub.emoji + '</div><div class="h-title">' + hub.en + '</div><div class="h-uk">' + esc(hub.uk) + '</div><div class="h-count">' + hub.chunks.length + ' виразів</div></div>'
      ).join('') + '</div>';
      $$('.hub-card', box).forEach(c => c.addEventListener('click', () => { st.cat = 'delex_' + c.dataset.delex; st.sub = null; renderLexContent(posId); }));
      return;
    }
    if (P.isVerbs && typeof st.cat === 'string' && st.cat.startsWith('delex_')) {
      const DELEX = (typeof LEX_DELEX !== 'undefined' ? LEX_DELEX : {});
      const hub = DELEX[st.cat.slice(6)];
      if (hub) {
        if (crumb) crumb.innerHTML = lexCrumbHtml(posId, '<a class="crumb-link" data-goto="delex">🧩 Delexical</a><span class="crumb-sep">›</span><span class="crumb-cur">' + hub.emoji + ' ' + hub.en + '</span>');
        box.innerHTML =
          '<div class="cat-header"><div class="c-emoji">' + hub.emoji + '</div><div><h2>' + hub.en + ' <span class="c-ctx">+ noun / adj / adv</span></h2><div class="c-uk">' + esc(hub.uk) + ' · ' + hub.ipa + ' · ' + hub.past + ' / ' + hub.pp + '</div></div><div class="c-cnt">' + hub.chunks.length + '</div></div>' +
          '<div class="word-note" style="margin-bottom:12px">' + esc(hub.hint) + '</div>' +
          '<div class="delex-grid">' + hub.chunks.map(c =>
            '<div class="delex-chunk"><div class="dx-line"><span class="dx-verb">' + hub.en + '</span> <span class="dx-rest">' + esc(c.en.replace(new RegExp('^' + hub.en + ' ?'), '')) + '</span>' +
            '<button class="speak-btn dx-say" data-say="' + esc(ttsClean(c.en)) + '">🔊</button></div><div class="dx-uk">' + esc(c.uk) + '</div></div>'
          ).join('') + '</div>';
        bindCrumbLinks(posId);
        $$('.dx-say', box).forEach(b => b.addEventListener('click', e => { e.stopPropagation(); speakLang(b.dataset.say, 'en-US', 1); }));
        return;
      }
    }

    /* хаб категорій */
    if (!st.cat) {
      if (crumb) crumb.style.display = 'none';
      let html = '<div class="hub-grid">';
      for (const [k, c] of Object.entries(P.cats)) {
        if (c.special !== 'delexHub' && !catVisible(c)) continue;
        if (c.special === 'delexHub') {
          const chunks = (typeof LEX_DELEX !== 'undefined' ? Object.values(LEX_DELEX).reduce((a, h) => a + h.chunks.length, 0) : 0);
          html += '<div class="hub-card has-sub" data-delexhub="1"><div class="h-emoji">' + c.emoji + '</div><div class="h-title">Delexical</div><div class="h-uk">Make / Take / Have / Do / Get</div><div class="h-count">' + chunks + ' виразів</div></div>';
          continue;
        }
        const cnt = P.words.filter(v => lvlOk(v) && wVisible(v) && wordInCat(P, v, k)).length;
        const hasSub = Object.values(P.subs).some(s => s.parent === k && catVisible(s));
        const lab = splitLabel(c.label);
        html += '<div class="hub-card' + (hasSub ? ' has-sub' : '') + '" data-cat="' + k + '"><div class="h-emoji">' + c.emoji + '</div><div class="h-title">' + esc(lab.en) + '</div><div class="h-uk">' + esc(lab.uk) + '</div><div class="h-count">' + cnt + ' слів</div></div>';
      }
      html += '</div>';
      box.innerHTML = html;
      $$('.hub-card', box).forEach(c => c.addEventListener('click', () => {
        if (c.dataset.delexhub) { st.cat = 'delex'; }
        else { st.cat = c.dataset.cat; st.sub = null; }
        renderLexContent(posId);
      }));
      return;
    }

    /* конкретна категорія */
    const cat = P.cats[st.cat] || (P.subs[st.sub] ? P.subs[st.sub] : null);
    const activeId = st.sub || st.cat;
    if (!cat || !catVisible(cat)) { if (!cat) return; st.cat = null; st.sub = null; return renderLexContent(posId); }
    const words = P.words.filter(v => lvlOk(v) && wVisible(v) && wordInCat(P, v, activeId));
    const lab = splitLabel(cat.label);

    let subsHtml = '';
    const related = Object.entries(P.subs).filter(([id, s]) => s.parent === st.cat && catVisible(s));
    if (!st.sub && related.length) {
      subsHtml = '<div class="sub-row">' + related.map(([id, s]) => {
        const cnt = P.words.filter(v => lvlOk(v) && wVisible(v) && wordInCat(P, v, id)).length;
        const sl = splitLabel(s.label);
        return '<button class="sub-chip" data-sub="' + id + '">' + s.emoji + ' <b>' + esc(sl.en) + '</b>' + (sl.uk ? ' <span class="sub-uk">' + esc(sl.uk) + '</span>' : '') + ' <span class="sub-cnt">(' + cnt + ')</span></button>';
      }).join('') + '</div>';
    }

    if (crumb) {
      let c = '<a class="crumb-link" data-goto="">🗂️ Категорії</a>';
      const parentCat = st.sub ? P.cats[P.subs[st.sub].parent] : cat;
      if (st.sub) {
        c += '<span class="crumb-sep">›</span><a class="crumb-link" data-goto="' + P.subs[st.sub].parent + '">' + parentCat.emoji + ' ' + esc(splitLabel(parentCat.label).en) + '</a>';
        c += '<span class="crumb-sep">›</span><span class="crumb-cur">' + cat.emoji + ' ' + esc(lab.en) + '</span>';
      } else {
        c += '<span class="crumb-sep">›</span><span class="crumb-cur">' + cat.emoji + ' ' + esc(lab.en) + '</span>';
      }
      crumb.innerHTML = lexCrumbHtml(posId, c);
    }

    box.innerHTML =
      '<div class="cat-header"><div class="c-emoji">' + cat.emoji + '</div><div><h2>' + esc(lab.en) + '</h2><div class="c-uk">' + esc(lab.uk) + '</div></div><div class="c-cnt">' + words.length + '</div></div>' +
      subsHtml +
      (words.length ? '<div class="words-grid">' + words.map(v => wordCardHtml(posId, v)).join('') + '</div>' : '<div class="empty-note">Для вибраних рівнів слів немає 🤷</div>');

    bindCrumbLinks(posId);
    $$('.sub-chip', box).forEach(b => b.addEventListener('click', () => { st.sub = b.dataset.sub; renderLexContent(posId); }));
    bindWordCards(box, posId);
  }

  function lexCrumbHtml(posId, inner) {
    return '<a class="crumb-link" data-goto="home">🏠 ' + esc(POS[posId].uk) + '</a><span class="crumb-sep">›</span>' + inner;
  }
  function bindCrumbLinks(posId) {
    const st = lexState(posId);
    $$('#lex-crumb .crumb-link').forEach(a => a.addEventListener('click', () => {
      const g = a.dataset.goto;
      if (g === 'home') { location.hash = '#/vocab/' + posId; return; }
      st.cat = g || null; st.sub = null;
      renderLexContent(posId);
    }));
  }

  function wordCardHtml(posId, v) {
    const P = POS[posId];
    const key = v.en + '|' + v.uk;
    const expanded = lexState(posId).expanded === key;
    const idx = v._id != null ? v._id : P.words.indexOf(v);
    const known = isKnown(posId, idx);
    const ctxHtml = v.ctx ? ' <span class="word-ctx">(' + esc(v.ctx) + ')</span>' : '';
    const uCtxHtml = v.uCtx ? ' <span class="u-ctx">(' + esc(v.uCtx) + ')</span>' : '';
    let badges = lvlBadge(v.lvl);
    if (v.adult) badges += '<span class="wb wb-adult">🔞</span>';
    if (P.isVerbs) {
      badges += '<span class="wb ' + (isIrreg(v) ? 'wb-irreg' : 'wb-reg') + '">' + (isIrreg(v) ? 'irreg' : 'reg') + '</span>';
      if (v.sense) badges += '<span class="wb wb-sense" title="Це слово має кілька різних значень">знач. ' + v.sense + '/' + v.senseOf + '</span>';
      if (v.reg2 === 'casual') badges += '<span class="wb wb-casual">🌸 casual</span>';
      if (v.reg2 === 'formal') badges += '<span class="wb wb-formal">🎩 formal</span>';
      if (v.note) badges += '<span class="wb wb-note">📝</span>';
    }
    if (P.isNouns) {
      if (v.cu === 'C') badges += '<span class="wb wb-cu">C</span>';
      if (v.cu === 'U') badges += '<span class="wb wb-cu-u">U</span>';
      if (v.reg === 'casual') badges += '<span class="wb wb-casual">🌸 casual</span>';
      if (v.reg === 'formal') badges += '<span class="wb wb-formal">🎩 formal</span>';
      if (v.reg === 'medical') badges += '<span class="wb wb-med">⚕️ medical</span>';
      if (v.note) badges += '<span class="wb wb-note">📝</span>';
    }
    if (P.isAdjs) {
      if (v.prep) badges += '<span class="wb wb-prep">+ ' + esc(v.prep) + '</span>';
      if (v.reg2 === 'casual') badges += '<span class="wb wb-casual">🌸 casual</span>';
      if (v.reg2 === 'formal') badges += '<span class="wb wb-formal">🎩 formal</span>';
      if (v.note) badges += '<span class="wb wb-note">📝</span>';
    }
    if (P.isAdvs) {
      if (v.reg2 === 'casual') badges += '<span class="wb wb-casual">🌸 casual</span>';
      if (v.reg2 === 'formal') badges += '<span class="wb wb-formal">🎩 formal</span>';
      if (v.reg2 === 'vulgar') badges += '<span class="wb wb-adult">🔞</span>';
      if (v.note) badges += '<span class="wb wb-note">📝</span>';
    }
    const forms = P.isVerbs ? verbFormsOf(v) : null;
    const spoken = ttsClean(v.en + ' ' + (v.ctx || ''));

    return '<div class="word-card' + (expanded ? ' expanded' : '') + '" data-wkey="' + esc(key) + '">' +
      '<div class="word-head">' +
      '<span class="word-emoji">' + (v.emoji || '📝') + '</span>' +
      '<span class="word-en" lang="en">' + esc(v.en) + '</span>' + ctxHtml +
      (v.ipa ? '<span class="word-ipa">' + esc(v.ipa) + '</span>' : '') +
      badges +
      (known ? '<span class="known-mark" title="Вивчено">✓</span>' : '') +
      (P.isVerbs ? '<button class="wc-info-btn" data-winfo="' + idx + '" title="Форми та похідні">📚</button>' : '') +
      '</div>' +
      '<div class="word-uk">' + esc(v.uk) + uCtxHtml + '</div>' +
      (forms ? '<div class="verb-forms ' + (isIrreg(v) ? 'irreg' : '') + '">' + esc(v.en) + ' · ' + esc(forms.past) + ' · ' + esc(forms.pp) + '</div>' : '') +
      (P.isNouns && v.plural ? '<div class="verb-forms">pl: ' + esc(v.plural) + '</div>' : '') +
      (P.isAdjs && v.comp ? '<div class="verb-forms">' + esc(v.en) + ' · ' + esc(v.comp) + ' · ' + esc(v.sup || '') + '</div>' : '') +
      ((P.isAdjs || P.isAdvs) && (v.syn || v.ant) ? '<div class="word-note" style="margin-top:6px">' + (v.syn ? '≈ ' + esc(v.syn) : '') + (v.ant ? ' · ⇄ ' + esc(v.ant) : '') + '</div>' : '') +
      (P.isNouns && v.syn && v.syn.length ? '<div class="word-note" style="margin-top:6px">≈ ' + esc(v.syn.join(', ')) + '</div>' : '') +
      '<div class="word-body">' +
      '<div class="word-example"><div class="we-en">' + esc(v.ex || '') + '</div>' + (v.exUk ? '<div class="we-uk">' + esc(v.exUk) + '</div>' : '') + '</div>' +
      (v.ex2 ? '<div class="word-example"><div class="we-en">' + esc(v.ex2) + '</div>' + (v.ex2Uk ? '<div class="we-uk">' + esc(v.ex2Uk) + '</div>' : '') + '</div>' : '') +
      (v.prepEx ? v.prepEx.map(pe => '<div class="word-example prep-example"><div class="we-en"><b>' + esc(v.en + ' ' + pe.p) + '</b> · ' + esc(pe.en) + '</div><div class="we-uk">' + esc(pe.uk) + '</div></div>').join('') : '') +
      (v.note ? '<div class="word-note">' + esc(v.note) + '</div>' : '') +
      '<div class="word-audios">' +
      '<button class="audio-btn us" data-say="' + esc(spoken) + '" data-lang="en-US">🇺🇸 US</button>' +
      '<button class="audio-btn uk" data-say="' + esc(spoken) + '" data-lang="en-GB">🇬🇧 UK</button>' +
      '<button class="audio-btn slow" data-say="' + esc(spoken) + '" data-lang="en-US" data-rate="0.6">🐢 Slow</button>' +
      '</div></div></div>';
  }

  function bindWordCards(root, posId) {
    const st = lexState(posId);
    $$('.word-card', root).forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('.audio-btn') || e.target.closest('.wc-info-btn')) return;
        const key = card.dataset.wkey;
        st.expanded = st.expanded === key ? null : key;
        card.classList.toggle('expanded');
      });
    });
    $$('.audio-btn', root).forEach(b => b.addEventListener('click', e => {
      e.stopPropagation();
      speakLang(b.dataset.say, b.dataset.lang || 'en-US', parseFloat(b.dataset.rate || '1'));
    }));
    $$('.wc-info-btn', root).forEach(b => b.addEventListener('click', e => {
      e.stopPropagation();
      openWordInfo(posId, +b.dataset.winfo);
    }));
  }

  /* ---------- WORD INFO MODAL (форми + похідні) ---------- */
  function ingForm(v) {
    if (v.ing) return v.ing;
    const sp = v.en.indexOf(' ');
    const head = sp > 0 ? v.en.slice(0, sp) : v.en;
    const tail = sp > 0 ? v.en.slice(sp) : '';
    let h = head;
    if (/ie$/.test(h)) h = h.slice(0, -2) + 'ying';
    else if (/(ee|oe)$/.test(h)) h = h + 'ing';
    else if (/e$/.test(h) && h.length > 2) h = h.slice(0, -1) + 'ing';
    else if (/[^aeiou][aeiou][^aeiouwxy]$/.test(h) && h.length <= 4) h = h + h.slice(-1) + 'ing';
    else h = h + 'ing';
    return h + tail;
  }

  function openWordInfo(posId, idx) {
    const P = POS[posId];
    const v = P.words[idx];
    if (!v) return;
    const forms = verbFormsOf(v);
    const rows = [
      ['Infinitive', v.en],
      ['Past Simple', forms.past],
      ['Past Participle', forms.pp],
      ['-ing form', ingForm(v)]
    ];
    const DERIV = (typeof LEX_DERIV !== 'undefined' ? LEX_DERIV : {});
    const derivs = DERIV[v.en] || v.derivatives || [];

    const head = (v.en || '').split(' ')[0].toLowerCase();
    const related = [];
    const seen = new Set([v.en.toLowerCase()]);
    for (const x of P.words) {
      const en = (x.en || '').trim();
      const low = en.toLowerCase();
      if (!seen.has(low) && /\s/.test(en) && low.startsWith(head + ' ')) {
        seen.add(low); related.push(x);
        if (related.length >= 8) break;
      }
    }

    $('#modal-root').innerHTML =
      '<div class="modal-backdrop" id="vw-backdrop"><div class="modal vw-modal">' +
      '<div class="vw-head">' +
      '<button class="vw-close" id="vw-close">✕</button>' +
      '<div class="vw-title"><span class="vw-emoji">' + (v.emoji || '💪') + '</span><span class="vw-word">' + esc(v.en) + '</span>' +
      (v.ctx ? '<span class="vw-ctx">(' + esc(v.ctx) + ')</span>' : '') + '</div>' +
      '<div class="vw-sub">' + esc(v.uk) + (v.uCtx ? ' (' + esc(v.uCtx) + ')' : '') + (v.ipa ? ' · ' + esc(v.ipa) : '') + ' · ' + lvlBadge(v.lvl) + ' ' +
      '<span class="wb ' + (isIrreg(v) ? 'wb-irreg' : 'wb-reg') + '">' + (isIrreg(v) ? 'irreg' : 'reg') + '</span></div>' +
      '</div>' +
      '<div class="vw-body">' +
      '<div class="vw-section-title">🔧 Форми дієслова</div>' +
      '<div class="vw-forms">' + rows.filter(r => r[1]).map(r =>
        '<div class="vw-form-row"><span class="vw-form-label">' + r[0] + '</span><span class="vw-form-val">' + esc(r[1]) + '</span>' +
        '<button class="speak-btn vw-say" data-say="' + esc(ttsClean(r[1])) + '">🔊</button></div>'
      ).join('') + '</div>' +
      (derivs.length ?
        '<div class="vw-section-title">🌱 Похідні слова</div>' +
        derivs.map(d => {
          const en = Array.isArray(d) ? d[0] : d.en;
          const pos = Array.isArray(d) ? d[1] : d.pos;
          const uk = Array.isArray(d) ? d[2] : d.uk;
          return '<div class="vw-deriv-row"><span class="vw-deriv-en">' + esc(en) + '</span>' +
            (pos ? '<span class="vw-deriv-pos">' + esc(pos) + '</span>' : '') +
            '<span class="vw-deriv-uk">' + esc(uk || '') + '</span>' +
            '<button class="speak-btn vw-say" data-say="' + esc(ttsClean(en)) + '">🔊</button></div>';
        }).join('') : '') +
      (related.length ?
        '<div class="vw-section-title" style="margin-top:14px">🔗 Споріднені вирази</div>' +
        related.map(r =>
          '<div class="vw-deriv-row"><span class="vw-deriv-en">' + esc(r.en) + '</span><span class="vw-deriv-uk">' + esc(r.uk || '') + '</span>' +
          '<button class="speak-btn vw-say" data-say="' + esc(ttsClean(r.en + ' ' + (r.ctx || ''))) + '">🔊</button></div>'
        ).join('') : '') +
      (!derivs.length && !related.length ? '<div class="vw-empty">Похідних слів поки немає.</div>' : '') +
      '</div></div></div>';

    const close = () => { $('#modal-root').innerHTML = ''; };
    $('#vw-backdrop').addEventListener('click', e => { if (e.target.id === 'vw-backdrop') close(); });
    $('#vw-close').addEventListener('click', close);
    $$('.vw-say').forEach(b => b.addEventListener('click', () => speakLang(b.dataset.say, 'en-US', 1)));
  }

  /* ---------- КАРТКИ ---------- */
  function cardState(posId) {
    return cardsMem[posId] || (cardsMem[posId] = { scope: 'all', queue: [], idx: 0, flipped: false, status: {}, rewarded: false });
  }

  function scopeOptionsHtml(P) {
    let html = '<option value="all">🌐 Всі слова (' + P.words.filter(wVisible).length + ')</option>';
    for (const [k, c] of Object.entries(P.cats)) {
      if (c.special || !catVisible(c)) continue;
      const lab = splitLabel(c.label);
      const subs = Object.entries(P.subs).filter(([id, s]) => s.parent === k && catVisible(s));
      const cnt = P.words.filter(w => wVisible(w) && wordInCat(P, w, k)).length;
      if (subs.length) {
        html += '<optgroup label="' + c.emoji + ' ' + esc(c.label) + '">';
        html += '<option value="' + k + '">' + c.emoji + ' ' + esc(lab.en) + ' — вся категорія (' + cnt + ')</option>';
        html += subs.map(([id, s]) => {
          const sc = P.words.filter(w => wVisible(w) && wordInCat(P, w, id)).length;
          return '<option value="' + id + '">' + s.emoji + ' ' + esc(splitLabel(s.label).en) + ' (' + sc + ')</option>';
        }).join('');
        html += '</optgroup>';
      } else {
        html += '<option value="' + k + '">' + c.emoji + ' ' + esc(c.label) + ' (' + cnt + ')</option>';
      }
    }
    return html;
  }

  function renderCards(panel, posId) {
    const P = POS[posId], cs = cardState(posId);
    const scopeOk = cs.scope === 'all' || (P.cats[cs.scope] ? catVisible(P.cats[cs.scope]) : P.subs[cs.scope] ? catVisible(P.subs[cs.scope]) : false);
    if (!scopeOk) cs.scope = 'all';
    if ((!cs.queue.length && !cs.startedOnce) || !scopeOk || cs.queue.some(v => !wVisible(v))) startCardSession(posId);

    panel.innerHTML =
      '<div class="fc-container">' +
      '<div class="lex-toolbar" style="margin-bottom:10px">' +
      '<div class="chip-row"><span class="chip-label">📂 Колода:</span>' +
      '<select class="select-scope" id="card-scope">' + scopeOptionsHtml(P) + '</select>' +
      '<button class="btn btn-ghost" id="card-shuffle" style="padding:9px 16px;font-size:13px">🔀 Перемішати</button></div>' +
      '</div>' +
      '<div class="fc-stats">' +
      '<span class="stat-k">✓ Знаю: <b id="kCount">0</b></span>' +
      '<span class="stat-u">✗ Не знаю: <b id="uCount">0</b></span>' +
      '<span class="stat-r">⏳ Лишилось: <b id="rCount">0</b></span>' +
      '</div>' +
      '<div id="card-slot"></div>' +
      '<div class="fc-nav">' +
      '<button class="fc-btn" id="fc-prev">← Попередня</button>' +
      '<button class="fc-btn unknown" id="fc-unknown">✗ Не знаю</button>' +
      '<button class="fc-btn known" id="fc-known">✓ Знаю</button>' +
      '<button class="fc-btn" id="fc-next">Далі →</button>' +
      '</div>' +
      '<div class="fc-nav">' +
      '<button class="fc-btn" id="fc-review">🔁 Повторити невідомі</button>' +
      '<button class="fc-btn danger" id="fc-reset">🔄 Скинути</button>' +
      '</div>' +
      '</div>';

    $('#card-scope').value = cs.scope;
    $('#card-scope').addEventListener('change', e => { cs.scope = e.target.value; startCardSession(posId); });
    $('#card-shuffle').addEventListener('click', () => startCardSession(posId));
    $('#fc-reset').addEventListener('click', () => startCardSession(posId));
    $('#fc-prev').addEventListener('click', () => { cs.idx = Math.max(0, cs.idx - 1); cs.flipped = false; renderFlashcard(posId); });
    $('#fc-next').addEventListener('click', () => { cs.idx++; cs.flipped = false; renderFlashcard(posId); });
    $('#fc-known').addEventListener('click', () => markCardKnown(posId));
    $('#fc-unknown').addEventListener('click', () => {
      const v = cs.queue[cs.idx]; if (!v) return;
      cs.status[cardKey(v)] = 'unknown'; cs.flipped = true; renderFlashcard(posId);
    });
    $('#fc-review').addEventListener('click', () => {
      const un = cs.queue.filter(v => cs.status[cardKey(v)] === 'unknown');
      if (!un.length) { showToast('🎉 Невідомих у цій сесії немає!'); return; }
      cs.queue = shuffle(un); cs.idx = 0; cs.flipped = false; cs.status = {}; cs.rewarded = false;
      renderFlashcard(posId);
    });

    renderFlashcard(posId);
  }

  const cardKey = v => v.en + '|' + v.uk;
  function startCardSession(posId) {
    const P = POS[posId], cs = cardState(posId);
    cs.queue = shuffle(poolForScope(P, cs.scope).slice());
    cs.idx = 0; cs.flipped = false; cs.status = {}; cs.rewarded = false; cs.startedOnce = true;
    if ($('#card-slot')) renderFlashcard(posId);
  }

  function markCardKnown(posId) {
    const P = POS[posId], cs = cardState(posId);
    const v = cs.queue[cs.idx]; if (!v) return;
    cs.status[cardKey(v)] = 'known';
    const idx = v._id != null ? v._id : P.words.indexOf(v);
    markKnown(posId, idx);
    renderFlashcard(posId);
    setTimeout(() => { cs.idx++; cs.flipped = false; renderFlashcard(posId); }, 280);
  }

  function renderFlashcard(posId) {
    const P = POS[posId], cs = cardState(posId);
    const slot = $('#card-slot');
    if (!slot) return;
    const kEl = $('#kCount'), uEl = $('#uCount'), rEl = $('#rCount');
    const k = Object.values(cs.status).filter(x => x === 'known').length;
    const u = Object.values(cs.status).filter(x => x === 'unknown').length;
    const r = Math.max(0, cs.queue.length - cs.idx);
    if (kEl) kEl.textContent = k;
    if (uEl) uEl.textContent = u;
    if (rEl) rEl.textContent = r;

    if (!cs.queue.length) {
      slot.innerHTML = '<div class="flashcard"><div class="fc-emoji">📭</div><div class="fc-en">Немає слів</div><div class="fc-hint">змініть колоду</div></div>';
      return;
    }

    if (cs.idx >= cs.queue.length) {
      if (!cs.rewarded && cs.queue.length >= 3) {
        cs.rewarded = true;
        const xp = k * 5 + (u === 0 && k > 0 ? 25 : 0);
        addXp(xp); touchStreak();
        if (u === 0 && k > 0) { store.perfect++; save(); confetti(); }
      }
      slot.innerHTML = '<div class="flashcard done">' +
        '<div class="fc-emoji">' + (u === 0 ? '🏆' : '🎉') + '</div>' +
        '<div class="fc-en">Сесію завершено!</div>' +
        '<div class="fc-uk">Знаю: ' + k + ' · Не знаю: ' + u + '</div>' +
        (u > 0 ? '<div class="fc-hint">натисни «🔁 Повторити невідомі», щоб закріпити</div>' : '<div class="fc-hint">усі слова підкорено!</div>') +
        '</div>';
      return;
    }

    const v = cs.queue[cs.idx];
    const forms = P.isVerbs ? verbFormsOf(v) : null;
    const status = cs.status[cardKey(v)];
    const ctxHtml = v.ctx ? ' <span class="fc-ctx">(' + esc(v.ctx) + ')</span>' : '';
    slot.innerHTML =
      '<div class="flashcard ' + (cs.flipped ? 'flipped' : '') + (status === 'known' ? ' known-flash' : status === 'unknown' ? ' unknown-flash' : '') + '" id="theCard">' +
      '<div class="fc-front">' +
      '<div class="fc-emoji">' + (v.emoji || '📝') + '</div>' +
      '<div class="fc-en">' + esc(v.en) + ctxHtml + '</div>' +
      '<div class="fc-ipa">' + esc(v.ipa || '') + (v.ipa ? ' · ' : '') + v.lvl + (v.adult ? ' · 🔞' : '') + '</div>' +
      (!cs.flipped ? '<div class="fc-hint">клацни, щоб побачити переклад</div>' : '') +
      '</div>' +
      '<div class="fc-hidden">' +
      '<div class="fc-uk">' + esc(v.uk) + (v.uCtx ? ' <span class="fc-uctx">(' + esc(v.uCtx) + ')</span>' : '') + '</div>' +
      (forms ? '<div class="fc-forms">' + esc(v.en) + ' · ' + esc(forms.past) + ' · ' + esc(forms.pp) + '</div>' : '') +
      (P.isAdjs && v.comp ? '<div class="fc-forms">' + esc(v.en) + ' · ' + esc(v.comp) + ' · ' + esc(v.sup || '') + '</div>' : '') +
      ((P.isAdjs || P.isAdvs) && (v.syn || v.ant) ? '<div class="fc-ex">' + (v.syn ? '≈ ' + esc(v.syn) : '') + (v.ant ? ' · ⇄ ' + esc(v.ant) : '') + '</div>' : '') +
      (P.isNouns && (v.plural || v.cu) ? '<div class="fc-forms">' + (v.cu === 'U' ? '⚖️ uncountable' : v.cu === 'C' ? '⚖️ countable' : '') + (v.plural ? (v.cu ? ' · ' : '') + 'pl: ' + esc(v.plural) : '') + '</div>' : '') +
      (P.isNouns && v.syn && v.syn.length ? '<div class="fc-ex">≈ ' + esc(v.syn.join(', ')) + '</div>' : '') +
      (v.note ? '<div class="fc-note">💡 ' + esc(v.note) + '</div>' : '') +
      '<div class="fc-ex">' + esc(v.ex || '') + (v.exUk ? '<br><span class="fc-ex-uk">' + esc(v.exUk) + '</span>' : '') + '</div>' +
      '</div></div>';

    $('#theCard').addEventListener('click', () => { cs.flipped = !cs.flipped; renderFlashcard(posId); });
  }

  /* ---------- ТРЕНАЖЕРИ НА ВВЕДЕННЯ ---------- */
  function quizPool(posId) {
    const P = POS[posId], st = lexState(posId);
    return P.words.filter(v => st.lvls.has(v.lvl) && wVisible(v));
  }
  function qMem(posId, mode) {
    const m = quizMem[posId] || (quizMem[posId] = {});
    return m[mode] || (m[mode] = { cur: null, mode: null });
  }
  function pickRandom(pool) { return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null; }

  function renderTyping(panel, posId, mode) {
    const P = POS[posId];
    const mem = qMem(posId, mode);
    const isMix = mode === 'mix';

    function nextWord() {
      const pool = quizPool(posId);
      if (mode === 'ctx') {
        const p = pool.filter(v => v.ctx);
        mem.cur = pickRandom(p.length ? p : pool);
      } else if (mode === 'cu') {
        const p = pool.filter(v => v.cu);
        mem.cur = pickRandom(p.length ? p : pool);
      } else if (mode === 'forms' && P.isAdjs) {
        const p = pool.filter(v => v.comp);
        mem.cur = pickRandom(p.length ? p : pool);
      } else {
        mem.cur = pickRandom(pool);
      }
      if (isMix) {
        const modes = P.isVerbs ? ['enuk', 'uken', 'forms', 'ctx'] : P.isAdjs ? ['enuk', 'uken', 'forms', 'ctx'] : P.isNouns ? ['enuk', 'uken', 'cu'] : P.isAdvs ? ['enuk', 'uken', 'ctx'] : ['enuk', 'uken'];
        let m = modes[Math.floor(Math.random() * modes.length)];
        if (m === 'ctx' && !mem.cur.ctx) m = 'enuk';
        if (m === 'cu' && !mem.cur.cu) m = 'enuk';
        if (m === 'forms' && P.isAdjs && !mem.cur.comp) m = 'enuk';
        mem.mode = m;
      } else mem.mode = mode;
      draw();
      const inp = $('#quiz-input'); if (inp) inp.focus();
    }

    function check(show) {
      const v = mem.cur; if (!v) return;
      const inp = $('#quiz-input'), fb = $('#quiz-fb');
      const val = (inp.value || '').trim();
      if (!show && !val) { showToast('✍️ Спершу впиши відповідь'); return; }
      const m = mem.mode;
      let ok = false, answer = '';

      if (show) {
        ok = null;
      } else if (m === 'enuk') {
        const answers = v.uk.split(/[\/,]/).map(s => norm(s).replace(/'/g, ''));
        const a = norm(val).replace(/'/g, '');
        ok = a.length > 0 && answers.some(x => x && (x.includes(a) || a.includes(x)));
      } else if (m === 'uken' || m === 'ctx') {
        ok = norm(val).replace(/'/g, '') === norm(v.en).replace(/'/g, '');
      } else if (m === 'forms') {
        if (P.isVerbs) {
          const f = verbFormsOf(v);
          /* для фразових приймаємо і «gave up given up», і коротке «gave given» */
          const tail = v.en.split(' ').slice(1).join(' ').toLowerCase();
          const forms = s => s.split('/').flatMap(x => {
            const full = x.trim().toLowerCase().replace(/\s+/g, ' ');
            const short = tail && full.endsWith(' ' + tail) ? full.slice(0, -(tail.length + 1)).trim() : full;
            return short === full ? [full] : [full, short];
          });
          const a = val.toLowerCase().replace(/\s+/g, ' ').trim();
          ok = forms(f.past).some(p => forms(f.pp).some(q => a === p + ' ' + q || (a === p && p === q)));
        } else if (P.isAdjs) {
          const a = norm(val).toLowerCase().replace(/\s+/g, ' ');
          const comps = String(v.comp || '').toLowerCase().split('/').map(x => x.trim()).filter(Boolean);
          const sups = String(v.sup || v.comp || '').toLowerCase().split('/').map(x => x.trim()).filter(Boolean);
          ok = comps.includes(a) || comps.some(c => sups.some(s => a === c + ' ' + s));
        }
      } else if (m === 'cu') {
        const a = norm(val).toLowerCase();
        ok = (v.cu === 'C' && (a === 'c' || a.includes('countable') && !a.includes('un'))) ||
             (v.cu === 'U' && (a === 'u' || a.startsWith('un')));
      }

      if (m === 'enuk') answer = v.uk + (v.uCtx ? ' (' + v.uCtx + ')' : '');
      else if (m === 'forms') {
        answer = P.isVerbs
          ? v.en + ' · ' + verbFormsOf(v).past + ' · ' + verbFormsOf(v).pp
          : v.en + ' · ' + (v.comp || '—') + ' · ' + (v.sup || '—');
      }
      else if (m === 'cu') answer = v.en + ' — ' + (v.cu === 'U' ? 'U (uncountable)' : 'C (countable)');
      else answer = v.en + (v.ctx ? ' (' + v.ctx + ')' : '');

      if (ok === null) {
        fb.className = 'quiz-fb skip'; fb.innerHTML = '👁 ' + esc(answer);
      } else if (ok) {
        fb.className = 'quiz-fb ok'; fb.innerHTML = '✅ ' + esc(answer) + (v.note ? ' · 💡 ' + esc(v.note) : '');
        addXp(10); touchStreak();
        inp.classList.add('good');
        setTimeout(() => nextWord(), 900);
        return;
      } else {
        fb.className = 'quiz-fb no'; fb.innerHTML = '❌ Правильно: ' + esc(answer) + (v.note ? ' · 💡 ' + esc(v.note) : '');
        inp.classList.add('bad');
      }
      inp.disabled = true;
      $('#quiz-next').focus();
    }

    function draw() {
      if (!panel.isConnected) return; // view was replaced (e.g. user navigated away)
      const v = mem.cur;
      if (!v) {
        panel.innerHTML = '<div class="empty-note">Для вибраних рівнів немає слів — увімкни більше рівнів у браузері 🙃</div>';
        return;
      }
      const m = mem.mode;
      let prompt = '', hint = '', placeholder = '';
      const ctxSpan = v.ctx ? ' <span class="qctx">(' + esc(v.ctx) + ')</span>' : '';

      if (m === 'enuk') {
        prompt = '<span class="q-mode">EN → UK · переклад</span><div class="quiz-question"><span class="q-word">' + esc(v.en) + '</span>' + ctxSpan + '</div>';
        hint = v.ipa || 'Рівень: ' + v.lvl;
        placeholder = 'переклад українською…';
      } else if (m === 'uken') {
        const uCtx = v.uCtx ? ' <span class="qctx">(' + esc(v.uCtx) + ')</span>' : ctxSpan;
        prompt = '<span class="q-mode">UK → EN · слово англійською</span><div class="quiz-question"><span class="q-word">' + esc(v.uk) + '</span>' + uCtx + '</div>';
        hint = 'Рівень: ' + v.lvl;
        placeholder = (P.isVerbs ? 'verb' : 'word') + '…';
      } else if (m === 'forms') {
        if (P.isVerbs) {
          prompt = '<span class="q-mode">🔧 Форми: past · past participle</span><div class="quiz-question"><span class="q-word">' + esc(v.en) + '</span>' + ctxSpan + '</div>';
          hint = 'Вводь через пробіл: <code>took taken</code> · або лише past, якщо правильне';
          placeholder = 'past  past-participle';
        } else {
          prompt = '<span class="q-mode">🔧 Ступені порівняння: comparative · superlative</span><div class="quiz-question"><span class="q-word">' + esc(v.en) + '</span>' + ctxSpan + '</div>';
          hint = 'Вводь через пробіл: <code>kinder kindest</code> або <code>more beautiful most beautiful</code>';
          placeholder = 'comparative  superlative';
        }
      } else if (m === 'ctx') {
        prompt = '<span class="q-mode">🧩 Контекст → слово</span><div class="quiz-question"><span class="qctx">(' + esc(v.ctx || '') + ')</span> — <span class="q-word">' + esc(v.uk) + '</span></div>';
        hint = 'За контекстом і перекладом вгадай слово: <i>(money)</i> витрачати → <b>spend</b>';
        placeholder = 'слово (базова форма)';
      } else if (m === 'cu') {
        prompt = '<span class="q-mode">⚖️ Countable чи Uncountable?</span><div class="quiz-question"><span class="q-word">' + esc(v.en) + '</span></div>';
        hint = 'Введи <code>C</code> (злічуваний: a cat, two cats) або <code>U</code> (незлічуваний: water)';
        placeholder = 'C або U';
      }

      panel.innerHTML =
        '<div class="quiz-box">' + prompt +
        (hint ? '<div class="quiz-hint">' + hint + '</div>' : '') +
        '<input type="text" class="text-input quiz-input" id="quiz-input" placeholder="' + placeholder + '" autocomplete="off" autocapitalize="off" spellcheck="false">' +
        '<div class="quiz-fb" id="quiz-fb" role="status" aria-live="polite"></div>' +
        '<div class="quiz-actions">' +
        '<button class="btn btn-good" id="quiz-check">✓ Перевірити</button>' +
        '<button class="btn btn-primary" id="quiz-next">Далі →</button>' +
        '<button class="btn btn-ghost" id="quiz-show">👁 Показати</button>' +
        '</div></div>';

      $('#quiz-check').addEventListener('click', () => check(false));
      $('#quiz-next').addEventListener('click', nextWord);
      $('#quiz-show').addEventListener('click', () => check(true));
      $('#quiz-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') { if ($('#quiz-input').disabled) nextWord(); else check(false); }
      });
    }

    if (!mem.cur || !wVisible(mem.cur)) nextWord(); else draw();
  }

  function lexChoicePool() {
    const out = [];
    const mk = (words, label, n) => {
      if (!words.length) return;
      shuffle(words).slice(0, n).forEach(w => {
        const correct = w.uk;
        const dset = [];
        for (const x of shuffle(words)) {
          if (x.uk !== correct && !dset.includes(x.uk)) dset.push(x.uk);
          if (dset.length === 3) break;
        }
        const opts = shuffle([correct].concat(dset));
        out.push({
          type: 'choice',
          q: 'Що означає «' + w.en + (w.ctx ? ' (' + w.ctx + ')' : '') + '»?',
          options: opts, answer: opts.indexOf(correct),
          explain: w.en + ' — «' + w.uk + '».' + (w.ex ? ' Приклад: “' + w.ex + '”' : ''),
          tag: label
        });
      });
    };
    mk(LEX_VERBS.filter(wVisible), 'Словник · Дієслова', 3);
    mk(LEX_NOUNS.filter(wVisible), 'Словник · Іменники', 2);
    mk(LEX_ADJS.filter(wVisible), 'Словник · Прикметники', 2);
    mk(LEX_ADVS.filter(wVisible), 'Словник · Прислівники', 1);
    return out;
  }

  function route(view, parts) {
    const posId = parts[1];
    if (parts.length > 1 && !POS[posId]) return notFound(view);
    const tab = parts[2] || 'browser';
    if (parts.length > 1 && !POS[posId].tabs.includes(tab)) return notFound(view);
    const draw = () => { if (parts.length === 1) vocabHub(view); else posPage(view, posId, tab); };
    if (parts.length === 1 || loaded(posId)) return draw();

    view.innerHTML = '<div class="rd-loading"><div class="rd-book-anim"><span></span><span></span><span></span></div>' +
      '<h2>Завантажуємо словник…</h2><p>' + esc(POS[posId].uk) + ' · ' + posCount(posId) + ' слів</p></div>';
    ensure(posId).then(() => {
      const cur = location.hash.replace(/^#\//, '').split('/').filter(Boolean);
      if (cur[0] !== 'vocab' || cur[1] !== posId) return;   /* користувач уже пішов далі */
      draw();
    }).catch(() => {
      view.innerHTML = '<div class="page-head"><span class="emoji-big">📡</span><h1>Не вдалося завантажити словник</h1>' +
        '<p>Перевір зʼєднання й спробуй ще раз.</p></div><button class="btn btn-primary" id="lex-retry">🔁 Спробувати ще раз</button>';
      const b = document.getElementById('lex-retry');
      if (b) b.addEventListener('click', () => route(view, parts));
    });
  }

  /* скидання кешів після перемикача 18+ */
  function resetCaches() {
    adultWords = null;
    Object.keys(cardsMem).forEach(k => delete cardsMem[k]);
    Object.keys(quizMem).forEach(k => delete quizMem[k]);
  }

  window.FLLexis = {
    route, POS, POS_ORDER, LEVELS, lexStats, lexChoicePool,
    adultOn, isAdultWord, wVisible, resetCaches, verbFormsOf, ensure, loaded, posCount, catCount
  };

})();
