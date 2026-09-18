/* ============================================================
   EngLift — граматика, аудіювання, «Виклик» і рушій вправ
   Сторінки категорій і тем, теорія, практика, диктанти, підсумкові сесії.
   ============================================================ */
(function () {
  'use strict';

  const C = window.FLCore;
  const { $, $$, esc, norm, fillEq, plural, shuffle, store, save, topicKey, touchStreak,
    showToast, addXp, confetti, speakLang, speak, ringSvg, animateRings, progressBar,
    setCrumbs, notFound } = C;
  const LX = () => window.FLLexis;

  /* ============================ DATA HELPERS ============================ */
  const getSub = id => COURSE.grammar.subs.find(s => s.id === id);
  const getTopic = (subId, topicId) => { const s = getSub(subId); return s && s.topics.find(t => t.id === topicId); };
  const getListenSub = id => COURSE.listening.subs.find(s => s.id === id);
  const allTopics = () => { const out = []; COURSE.grammar.subs.forEach(s => s.topics.forEach(t => out.push({ sub: s, topic: t }))); return out; };

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

  /* ============================ GRAMMAR ============================ */
  function grammarHome(view) {
    setCrumbs([{ label: 'Граматика' }]);
    view.innerHTML =
      '<div class="page-head"><span class="emoji-big">📗</span><h1>Граматика</h1><p>Обери категорію — всередині на тебе чекають теорія з прикладами та інтерактивні тренажери.</p></div>' +
      '<div class="g-jump">' + grammarGroups().map(g => '<a class="sub-chip rd-chip" href="#/grammar" data-jump="' + g.id + '">' + g.emoji + ' ' + esc(g.title) + ' <span class="rd-cnt">' + g.items.length + '</span></a>').join('') + '</div>' +
      grammarGroups().map(g => {
        const topics = g.items.reduce((a, s) => a + s.topics.length, 0);
        const done = g.items.reduce((a, s) => a + s.topics.filter(t => (store.topics[topicKey(s.id, t.id)] || {}).done).length, 0);
        return '<section class="g-section" id="' + g.id + '">' +
          '<h2 class="section-title">' + g.emoji + ' ' + esc(g.title) + ' <small>' + done + ' / ' + topics + ' тем</small></h2>' +
          '<div class="grid-cards">' + g.items.map(s => {
            const d = s.topics.filter(t => (store.topics[topicKey(s.id, t.id)] || {}).done).length;
            return '<a class="card clickable topic-card" href="#/grammar/' + s.id + '">' +
              '<div class="t-top"><h3>' + s.emoji + ' ' + s.title + '</h3></div>' +
              '<div class="t-meta"><span class="tag">' + s.topics.length + ' ' + plural(s.topics.length, 'тема', 'теми', 'тем') + '</span></div>' +
              '<p style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px">' + s.desc + '</p>' +
              progressBar(s.topics.length ? d / s.topics.length : 0) +
              '<div class="progress-label"><span>' + d + ' з ' + s.topics.length + ' тем</span><span>' + Math.round(d / s.topics.length * 100) + '%</span></div>' +
              '</a>';
          }).join('') + '</div></section>';
      }).join('');
    $$('[data-jump]', view).forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      const sec = document.getElementById(a.dataset.jump);
      if (sec && sec.scrollIntoView) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  }

  function cheatTableHtml(sub) {
    if (!sub.cheat) return '';
    const tables = sub.cheat.tables || (sub.cheat.rows && sub.cheat.rows.length ? [sub.cheat] : []);
    if (!tables.length) return '';
    const renderTable = (tb) => {
      const cell = (c) => {
        if (c && typeof c === 'object') return '<a class="ct-link" href="#/grammar/' + sub.id + '/' + c.topic + '">' + esc(c.t) + '</a>';
        return esc(String(c));
      };
      return '<div class="cheat-table">' +
        '<div class="ct-title">' + (tables.length > 1 ? '' : '📋 Шпаргалка: ') + esc(tb.title) + '</div>' +
        '<div class="ct-scroll"><table>' +
        '<thead><tr>' + tb.head.map(h => '<th>' + esc(h) + '</th>').join('') + '</tr></thead>' +
        '<tbody>' + tb.rows.map(r =>
          '<tr>' + r.map((c, i) => '<td' + (i === 0 ? ' class="ct-first"' : '') + '>' + cell(c) + '</td>').join('') + '</tr>'
        ).join('') + '</tbody></table></div></div>';
    };
    if (tables.length === 1) return renderTable(tables[0]);
    return '<div class="cheat-multi"><div class="cm-head">📋 Шпаргалка: ' + esc(sub.title.toLowerCase()) + ' за типами</div>' +
      tables.map(renderTable).join('') + '</div>';
  }

  function grammarSub(view, subId) {
    const sub = getSub(subId);
    setCrumbs([{ label: 'Граматика', hash: '#/grammar' }, { label: sub.title }]);
    view.innerHTML =
      '<a class="back-link" href="#/grammar">← Граматика</a>' +
      '<div class="page-head"><span class="emoji-big">' + sub.emoji + '</span><h1>' + sub.title + '</h1><p>' + sub.desc + '</p></div>' +
      '<div class="grid-cards">' + sub.topics.map(t => {
        const rec = store.topics[topicKey(sub.id, t.id)] || {};
        return '<a class="card clickable topic-card" href="#/grammar/' + sub.id + '/' + t.id + '">' +
          (rec.done ? '<span class="t-check">✓</span>' : '') +
          '<div class="t-top"><h3>' + t.emoji + ' ' + t.title + '</h3></div>' +
          '<div class="t-meta"><span class="tag">' + t.level + '</span><span class="tag cyan">~' + t.minutes + ' хв</span><span class="tag pink">' + t.exercises.length + ' вправ</span></div>' +
          progressBar(rec.done ? 1 : (rec.best || 0) / t.exercises.length, 'tiny') +
          '<div class="progress-label"><span>' + (rec.done ? 'Завершено · найкращий ' + rec.best + '/' + t.exercises.length : 'Не пройдено') + '</span></div>' +
          '</a>';
      }).join('') + '</div>' +
      trainerLinkHtml(sub.id) +
      cheatTableHtml(sub);
  }

  /* тренажери з розділу «Фрази і конструкції», доречні для категорії граматики */
  const TRAINER_LINKS = {
    intensifiers: ['intensifiers'], comparison: ['intensifiers'],
    modals: ['would', 'softeners'], conditionals: ['would'], preferences: ['would'], reported: ['express'],
    linkers: ['transitions', 'constructions'], 'time-clauses': ['constructions', 'timeseq'],
    questions: ['choice', 'situational'], pronouns: ['choice'], 'short-responses': ['chunks', 'choice'],
    advanced: ['constructions'], 'used-to': ['constructions'], starters: ['discourse', 'express'],
    tags: ['chunks'], indefinite: ['chunks'], prepositions: ['situational'], articles: ['chunks']
  };
  function trainerLinkHtml(subId) {
    if (!window.FLPhrases) return '';
    const keys = (TRAINER_LINKS[subId] || []).filter(k => window.FLPhrases.TRAINERS[k]);
    if (!keys.length) return '';
    return '<h2 class="section-title">🎯 Потренувати це в «' + esc(window.FLPhrases.SECTION) + '»</h2>' +
      '<div class="grid-cards">' + keys.map(k => {
        const T = window.FLPhrases.TRAINERS[k];
        return '<a class="card clickable xlink-card" href="#/phrases/' + k + '">' +
          '<div class="t-top"><h3>' + T.emoji + ' ' + esc(T.short) + '</h3></div>' +
          '<div class="t-meta"><span class="tag">' + esc(T.uk) + '</span></div>' +
          '<p class="t-desc">' + esc(T.desc) + '</p></a>';
      }).join('') + '</div>';
  }

  function topicPage(view, subId, topicId) {
    const sub = getSub(subId), t = getTopic(subId, topicId);
    const rec = store.topics[topicKey(subId, topicId)] || {};
    setCrumbs([{ label: 'Граматика', hash: '#/grammar' }, { label: sub.title, hash: '#/grammar/' + sub.id }, { label: t.title }]);

    const theory = t.theory;
    view.innerHTML =
      '<a class="back-link" href="#/grammar/' + sub.id + '">← ' + esc(sub.title) + '</a>' +
      '<div class="page-head"><span class="emoji-big">' + t.emoji + '</span><h1>' + t.title + '</h1>' +
      '<p><span class="tag">' + t.level + '</span>&nbsp; <span class="tag cyan">~' + t.minutes + ' хв читання</span>&nbsp; <span class="tag pink">' + t.exercises.length + ' вправ у тренажері</span></p></div>' +

      '<div class="topic-layout">' +
      '<div class="card theory">' +
      '<div class="intro">' + theory.intro + '</div>' +
      theory.rules.map((r, i) =>
        '<div class="rule-block"><h4><span class="rule-num">' + (i + 1) + '</span>' + r.t + '</h4><p>' + r.d + '</p>' +
        r.ex.map(e => '<div class="ex-line"><span class="ex-en">' + esc(e[0]) + '</span>' + (e[1] ? '<span class="ex-uk">' + esc(e[1]) + '</span>' : '') + '</div>').join('') +
        '</div>'
      ).join('') +
      (theory.tip ? '<div class="tip-callout"><span class="tip-icon">💡</span><span><b>Порада.</b> ' + theory.tip + '</span></div>' : '') +
      '</div>' +

      '<div class="topic-side">' +
      '<div class="card side-card"><h3>🎯 Тренажер</h3><p>' + t.exercises.length + ' інтерактивних вправ: тест, введення відповіді та збирання речень.</p>' +
      '<a class="btn btn-primary btn-block" href="#/grammar/' + sub.id + '/' + topicId + '/practice">' + (rec.done ? 'Пройти ще раз' : 'Почати практику') + '</a>' +
      '<div class="best-line">' + (rec.done ? '✅ Найкращий результат: <b>&nbsp;' + rec.best + '/' + t.exercises.length + '</b>' : '⏳ Тема ще не пройдена') + '</div>' +
      '</div>' +
      '<div class="card side-card"><h3>🗺️ Як вчити</h3><p>1. Прочитай теорію.<br>2. Зверни увагу на слова-маркери.<br>3. Пройди тренажер.<br>4. Повтори, якщо помилок більше половини.</p></div>' +
      '</div>' +
      '</div>';
  }

  function practiceSession(view, subId, topicId) {
    const sub = getSub(subId), t = getTopic(subId, topicId);
    setCrumbs([{ label: 'Граматика', hash: '#/grammar' }, { label: sub.title, hash: '#/grammar/' + sub.id }, { label: t.title, hash: '#/grammar/' + sub.id + '/' + topicId }, { label: 'Тренажер' }]);
    runSession(view, {
      items: t.exercises,
      title: t.emoji + ' ' + t.title,
      backHash: '#/grammar/' + subId + '/' + topicId,
      onResult: (correct, total) => {
        const k = topicKey(subId, topicId);
        const rec = store.topics[k] || (store.topics[k] = {});
        rec.done = true; rec.total = total; rec.best = Math.max(rec.best || 0, correct);
        if (correct === total) { store.perfect++; addXp(25); }
        save(); touchStreak();
      }
    });
  }

  /* ============================ АУДІЮВАННЯ ============================ */
  function listenHome(view) {
    setCrumbs([{ label: 'Аудіювання' }]);
    view.innerHTML =
      '<div class="page-head"><span class="emoji-big">🎧</span><h1>Аудіювання</h1><p>Тренажер диктантів: слухай речення, записуй його та перевіряй себе. Працює озвучення англійською.</p></div>' +
      '<div class="grid-cards">' + COURSE.listening.subs.map(s => {
        const best = (store.listen[s.id] || {}).best || 0;
        return '<a class="card clickable topic-card" href="#/listen/' + s.id + '">' +
          '<div class="t-top"><h3>' + s.emoji + ' ' + s.title + '</h3></div>' +
          '<div class="t-meta"><span class="tag cyan">' + s.items.length + ' речень</span></div>' +
          '<p style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px">' + s.desc + '</p>' +
          progressBar(best / s.items.length) +
          '<div class="progress-label"><span>найкращий: ' + best + '/' + s.items.length + '</span><span>' + Math.round(best / s.items.length * 100) + '%</span></div>' +
          '</a>';
      }).join('') + '</div>';
  }

  function listenSession(view, sub) {
    setCrumbs([{ label: 'Аудіювання', hash: '#/listen' }, { label: sub.title }]);
    const items = sub.items;
    let idx = 0, correct = 0, answered = false;

    const normWord = w => norm(w).replace(/'/g, '');

    function render() {
      const it = items[idx];
      answered = false;
      view.innerHTML =
        '<div class="session-wrap">' +
        '<div class="session-head">' +
        '<button class="s-close" id="s-close" title="Вийти">✕</button>' +
        '<div class="session-progress">' + progressBar(idx / items.length) + '</div>' +
        '<span class="session-count">' + (idx + 1) + ' / ' + items.length + '</span>' +
        '</div>' +
        '<div class="card listen-card">' +
        '<div class="q-type">Диктант · ' + esc(sub.title) + '</div>' +
        '<div class="q-text" style="text-align:center">Прослухай речення і запиши його англійською</div>' +
        '<button class="listen-play" id="play-btn">🔊</button>' +
        '<div class="listen-hint" id="hint-zone"><button class="btn btn-ghost" id="hint-btn" style="padding:8px 16px;font-size:13px">💡 Показати підказку</button></div>' +
        '<div style="height:18px"></div>' +
        '<div class="fill-row"><input class="text-input" id="listen-input" placeholder="Запиши, що чув…" autocomplete="off" autocapitalize="off"><button class="btn btn-primary" id="listen-check">Перевірити</button></div>' +
        '<div id="slot"></div>' +
        '</div></div>';

      $('#s-close').addEventListener('click', () => { location.hash = '#/listen'; });
      $('#play-btn').addEventListener('click', e => speakLang(it.text, 'en-US', 0.94, e.currentTarget));
      $('#hint-btn').addEventListener('click', () => {
        $('#hint-zone').innerHTML = '<span class="tag pink">Підказка: ' + esc(it.uk) + '</span>';
      });
      const check = () => {
        if (answered) return;
        const typed = $('#listen-input').value;
        if (!typed.trim()) { showToast('✍️ Спершу запиши речення'); return; }
        answered = true;
        const targetWords = it.text.split(/\s+/);
        const typedBag = typed.split(/\s+/).map(normWord).filter(Boolean);
        let matched = 0;
        const diff = targetWords.map(tw => {
          const nw = normWord(tw);
          const at = typedBag.indexOf(nw);
          if (at >= 0) { typedBag.splice(at, 1); matched++; return { raw: tw, ok: true }; }
          return { raw: tw, ok: false };
        });
        const ratio = matched / targetWords.length;
        const isOk = ratio >= 0.75;
        if (isOk) { correct++; addXp(10); }
        $('#listen-input').classList.add(isOk ? 'good' : 'bad');
        $('#hint-zone').innerHTML = '<span class="tag pink">Переклад: ' + esc(it.uk) + '</span>';
        $('#slot').innerHTML =
          '<div class="diff-wrap">' + diff.map(d => '<span class="diff-word ' + (d.ok ? 'ok' : 'no') + '">' + esc(d.raw) + '</span>').join('') + '</div>' +
          '<div class="feedback ' + (isOk ? 'good' : 'bad') + '"><span class="fb-icon">' + (isOk ? '✅' : '❌') + '</span><div><b>Збіг ' + matched + '/' + targetWords.length + '</b>' + esc(it.text) + '</div></div>' +
          '<div class="session-foot"><button class="btn btn-primary" id="next-btn">' + (idx + 1 < items.length ? 'Далі →' : 'Результати 🏁') + '</button></div>';
        $('#next-btn').addEventListener('click', () => { idx++; idx < items.length ? render() : finish(); });
      };
      $('#listen-check').addEventListener('click', check);
      $('#listen-input').addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
      $('#listen-input').focus();
    }

    function finish() {
      touchStreak();
      const rec = store.listen[sub.id] || (store.listen[sub.id] = {});
      rec.best = Math.max(rec.best || 0, correct);
      if (correct === items.length) { store.perfect++; addXp(25); }
      save();
      const pct = correct / items.length;
      if (pct >= 0.8) confetti();
      view.innerHTML =
        '<div class="session-wrap"><div class="card results-card">' +
        '<div class="results-emoji">' + (pct === 1 ? '🏆' : pct >= 0.8 ? '🎉' : pct >= 0.5 ? '💪' : '📖') + '</div>' +
        '<h2>' + (pct === 1 ? 'Ідеальний слух!' : pct >= 0.8 ? 'Чудова робота!' : pct >= 0.5 ? 'Непогано!' : 'Продовжуй тренуватися!') + '</h2>' +
        '<p class="r-sub">Диктант завершено</p>' +
        '<div class="score-ring-wrap">' + ringSvg(pct, 150, 12) + '<div class="score-center"><span class="sc-num">' + Math.round(pct * 100) + '%</span><span class="sc-lab">точність</span></div></div>' +
        '<div class="results-stats"><div class="r-stat">✅ <span>Правильних</span> ' + correct + '/' + items.length + '</div><div class="r-stat">⭐ <span>Разом</span> +' + (correct * 10 + (pct === 1 ? 25 : 0)) + ' XP</div></div>' +
        '<div class="results-actions"><button class="btn btn-ghost" id="l-retry">🔁 Ще раз</button><a class="btn btn-primary" href="#/listen">До аудіювання</a></div>' +
        '</div></div>';
      animateRings(view);
      $('#l-retry').addEventListener('click', () => listenSession(view, sub));
    }

    render();
  }

  /* ============================ ВИКЛИК ============================ */
  function challengeHome(view) {
    if (window.FLPhrases) window.FLPhrases.preloadRandom();
    if (window.FLSound) window.FLSound.ensure().catch(function () { });
    setCrumbs([{ label: 'Виклик' }]);
    view.innerHTML =
      '<div class="challenge-hero">' +
      '<span class="c-emoji">⚡</span>' +
      '<h1>Виклик</h1>' +
      '<p>10 випадкових питань з усіх розділів: граматика і словник по частинам мови. Перевір, наскільки ти готовий!</p>' +
      (store.challengeBest ? '<p style="color:var(--text);font-weight:700;margin-bottom:20px">🏅 Твій рекорд: ' + store.challengeBest + '/10</p>' : '') +
      '<a class="btn btn-primary btn-big" href="#/challenge/play">Почати виклик 🔥</a>' +
      '</div>';
  }

  function challengePlay(view) {
    setCrumbs([{ label: 'Виклик', hash: '#/challenge' }, { label: 'Гра' }]);
    const pool = [];
    allTopics().forEach(({ topic }) => {
      topic.exercises.forEach(ex => {
        if (ex.type === 'choice' || ex.type === 'fill') pool.push(Object.assign({}, ex, { tag: topic.title }));
      });
    });
    LX().lexChoicePool().forEach(q => pool.push(q));
    if (window.FLPhrases) window.FLPhrases.challengePool().forEach(q => pool.push(q));
    if (window.FLSound) window.FLSound.challengePool().forEach(q => pool.push(q));
    const items = shuffle(pool).slice(0, 10);
    runSession(view, {
      items,
      title: '⚡ Виклик',
      backHash: '#/challenge',
      showTag: true,
      onResult: (correct, total) => {
        store.challengeBest = Math.max(store.challengeBest, correct);
        if (correct === total) { store.perfect++; addXp(25); }
        save(); touchStreak();
      }
    });
  }

  /* ============================ SESSION ENGINE ============================ */
  function runSession(view, cfg) {
    const items = cfg.items.map(prepareItem);
    let idx = 0, correct = 0, answered = false;

    function prepareItem(it) {
      if (it.type === 'choice') {
        const opts = it.options.map((o, i) => ({ text: o, ok: i === it.answer }));
        return Object.assign({}, it, { opts: shuffle(opts) });
      }
      if (it.type === 'reorder') {
        let bank = shuffle(it.words.slice());
        if (bank.join(' ').toLowerCase() === it.answer.toLowerCase()) bank = bank.reverse();
        return Object.assign({}, it, { bank });
      }
      return it;
    }

    function render() {
      const it = items[idx];
      answered = false;
      view.innerHTML =
        '<div class="session-wrap">' +
        '<div class="session-head">' +
        '<button class="s-close" id="s-close" title="Вийти">✕</button>' +
        '<div class="session-progress">' + progressBar(idx / items.length) + '</div>' +
        '<span class="session-count">' + (idx + 1) + ' / ' + items.length + '</span>' +
        '</div>' +
        '<div class="card q-card">' +
        '<div class="q-type">' + (cfg.showTag && it.tag ? esc(it.tag) + ' · ' : '') + typeLabel(it.type) + '</div>' +
        questionHtml(it) +
        '<div id="slot"></div>' +
        '</div></div>';

      $('#s-close').addEventListener('click', () => { location.hash = cfg.backHash; });

      if (it.type === 'choice') bindChoice(it);
      else if (it.type === 'fill') bindFill(it);
      else if (it.type === 'reorder') bindReorder(it);
    }

    function typeLabel(t) {
      return t === 'choice' ? 'Обери відповідь' : t === 'fill' ? 'Впиши відповідь' : 'Збери речення';
    }

    function questionHtml(it) {
      if (it.type === 'choice') {
        return '<div class="q-text">' + esc(it.q) + '</div>' +
          '<div class="opts">' + it.opts.map((o, i) =>
            '<button class="opt" data-i="' + i + '"><span class="opt-key">' + String.fromCharCode(65 + i) + '</span><span>' + esc(o.text) + '</span></button>'
          ).join('') + '</div>';
      }
      if (it.type === 'fill') {
        return '<div class="q-text">' + esc(it.q).replace('___', '<span class="blank">…</span>') + '</div>' +
          (it.hint ? '<div class="hint-chip">💡 Підказка: <b>' + esc(it.hint) + '</b></div>' : '') +
          '<div style="height:14px"></div>' +
          '<div class="fill-row"><input class="text-input" id="fill-input" placeholder="Твоя відповідь…" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="btn btn-primary" id="fill-check">Перевірити</button></div>';
      }
      return '<div class="q-text">Склади речення зі слів</div>' +
        (it.uk ? '<div class="q-note">Переклад: ' + esc(it.uk) + '</div>' : '') +
        '<div class="reorder-zone" id="zone"></div>' +
        '<div class="word-bank" id="bank">' + it.bank.map((w, i) => '<button class="word-chip" data-bank="' + i + '">' + esc(w) + '</button>').join('') + '</div>' +
        '<button class="btn btn-primary" id="reorder-check">Перевірити</button>';
    }

    function feedback(isOk, html) {
      $('#slot').innerHTML =
        '<div class="feedback ' + (isOk ? 'good' : 'bad') + '" role="status" aria-live="polite"><span class="fb-icon">' + (isOk ? '✅' : '❌') + '</span><div>' + html + '</div></div>' +
        '<div class="session-foot"><button class="btn btn-primary" id="next-btn">' + (idx + 1 < items.length ? 'Далі →' : 'Результати 🏁') + '</button></div>';
      $('#next-btn').addEventListener('click', () => { idx++; idx < items.length ? render() : finish(); });
      $('#next-btn').focus();
    }

    function bindChoice(it) {
      $$('.opt', view).forEach(btn => btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const chosen = +btn.dataset.i;
        const isOk = it.opts[chosen].ok;
        $$('.opt', view).forEach((b, i) => {
          b.disabled = true;
          if (it.opts[i].ok) b.classList.add('correct');
          else if (i === chosen) b.classList.add('wrong');
          else b.classList.add('dim');
        });
        if (isOk) { correct++; addXp(10); }
        feedback(isOk, '<b>' + (isOk ? 'Правильно!' : 'Неправильно') + '</b>' + esc(it.explain || ''));
      }));
    }

    function bindFill(it) {
      const input = $('#fill-input');
      input.focus();
      const check = () => {
        if (answered) return;
        const typed = input.value;
        if (!typed.trim()) { showToast('✍️ Впиши відповідь'); return; }
        answered = true;
        const isOk = it.answers.some(a => fillEq(typed, a));
        input.classList.add(isOk ? 'good' : 'bad');
        input.disabled = true; $('#fill-check').disabled = true;
        if (isOk) { correct++; addXp(10); }
        feedback(isOk, '<b>' + (isOk ? 'Правильно!' : 'Неправильно') + '</b>' +
          (isOk ? (it.explain ? esc(it.explain) : 'Так тримати!') : 'Правильна відповідь: <b>' + esc(it.answers[0]) + '</b>' + (it.explain ? '<br>' + esc(it.explain) : '')));
      };
      $('#fill-check').addEventListener('click', check);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
    }

    function bindReorder(it) {
      const zone = $('#zone'), bank = $('#bank');
      const move = (chip, toZone) => { (toZone ? zone : bank).appendChild(chip); };
      $$('.word-chip', view).forEach(chip => chip.addEventListener('click', () => {
        if (answered) return;
        move(chip, chip.parentElement === bank);
      }));
      $('#reorder-check').addEventListener('click', () => {
        if (answered) return;
        const built = $$('.word-chip', zone).map(c => c.textContent).join(' ');
        if (!built.trim()) { showToast('🧩 Спершу склади речення'); return; }
        answered = true;
        const isOk = norm(built) === norm(it.answer);
        zone.classList.add(isOk ? 'good' : 'bad');
        $$('.word-chip', view).forEach(c => c.style.pointerEvents = 'none');
        $('#reorder-check').style.display = 'none';
        if (isOk) { correct++; addXp(10); }
        feedback(isOk, '<b>' + (isOk ? 'Правильно!' : 'Неправильно') + '</b>' +
          (isOk ? esc(it.uk || '') : 'Правильна відповідь: <b>' + esc(it.answer) + '</b>' + (it.uk ? '<br>' + esc(it.uk) : '')));
      });
    }

    function finish() {
      const total = items.length;
      const pct = total ? correct / total : 0;
      cfg.onResult(correct, total);
      if (pct >= 0.8) confetti();
      view.innerHTML =
        '<div class="session-wrap"><div class="card results-card">' +
        '<div class="results-emoji">' + (pct === 1 ? '🏆' : pct >= 0.8 ? '🎉' : pct >= 0.5 ? '💪' : '📖') + '</div>' +
        '<h2>' + (pct === 1 ? 'Ідеальний результат!' : pct >= 0.8 ? 'Чудова робота!' : pct >= 0.5 ? 'Непогано!' : 'Буває! Повтори теорію') + '</h2>' +
        '<p class="r-sub">' + esc(cfg.title) + '</p>' +
        '<div class="score-ring-wrap">' + ringSvg(pct, 150, 12) + '<div class="score-center"><span class="sc-num">' + Math.round(pct * 100) + '%</span><span class="sc-lab">результат</span></div></div>' +
        '<div class="results-stats">' +
        '<div class="r-stat">✅ <span>Правильних</span> ' + correct + '/' + total + '</div>' +
        '<div class="r-stat">⭐ <span>Зароблено</span> +' + (correct * 10 + (pct === 1 ? 25 : 0)) + ' XP</div>' +
        '</div>' +
        '<div class="results-actions"><button class="btn btn-ghost" id="s-retry">🔁 Ще раз</button><a class="btn btn-primary" href="' + cfg.backHash + '">Завершити</a></div>' +
        '</div></div>';
      animateRings(view);
      $('#s-retry').addEventListener('click', () => runSession(view, cfg));
    }

    render();
  }

  function route(view, parts) {
    if (parts.length === 1) grammarHome(view);
    else if (parts.length === 2) { getSub(parts[1]) ? grammarSub(view, parts[1]) : notFound(view); }
    else if (parts.length === 3) { getTopic(parts[1], parts[2]) ? topicPage(view, parts[1], parts[2]) : notFound(view); }
    else if (parts.length === 4 && parts[3] === 'practice') { getTopic(parts[1], parts[2]) ? practiceSession(view, parts[1], parts[2]) : notFound(view); }
    else notFound(view);
  }
  function listenRoute(view, parts) {
    if (parts.length === 1) listenHome(view);
    else if (parts.length === 2) { const s = getListenSub(parts[1]); s ? listenSession(view, s) : notFound(view); }
    else notFound(view);
  }
  function challengeRoute(view, parts) {
    if (parts.length === 1) challengeHome(view);
    else if (parts.length === 2 && parts[1] === 'play') challengePlay(view);
    else notFound(view);
  }

  window.FLGrammar = {
    route, listenRoute, challengeRoute,
    getSub, getTopic, getListenSub, allTopics, grammarGroups, runSession
  };

})();
