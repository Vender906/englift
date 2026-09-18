/* ============================================================
   EngLift — Тест на рівень (A1–C1)
   30 питань, по 6 на рівень. Рівень зараховано, якщо ≥ 4 з 6
   і всі нижчі рівні теж зараховано. Кожне питання прив’язане
   до теми граматики — з помилок будуються рекомендації.
   ============================================================ */
(function () {
  'use strict';

  const KEY = 'fluentlab_placement_v1';
  const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const PASS = 4, XP = 30;
  const LEVEL_INFO = {
    A1: { name: 'Початковий', emoji: '🌱', desc: 'Базові фрази, to be, Present Simple.' },
    A2: { name: 'Елементарний', emoji: '🌿', desc: 'Прості розмови про себе, минуле і плани.' },
    B1: { name: 'Середній', emoji: '🌳', desc: 'Упевнено в побуті й подорожах, можеш розповісти історію.' },
    B2: { name: 'Вище середнього', emoji: '🏔️', desc: 'Вільна розмова, складні часи, модальні в минулому.' },
    C1: { name: 'Просунутий', emoji: '🚀', desc: 'Інверсія, емфаза, тонкі нюанси — майже як носій.' }
  };

  const Q = [
    /* A1 */
    { lvl: 'A1', q: 'She ___ a doctor.', o: ['is', 'are', 'am', 'be'], t: ['tenses', 'present-simple'] },
    { lvl: 'A1', q: 'I ___ coffee every morning.', o: ['drink', 'drinks', 'am drink', 'drinking'], t: ['tenses', 'present-simple'] },
    { lvl: 'A1', q: 'There ___ two cats in the garden.', o: ['are', 'is', 'be', 'has'], t: ['starters', 'starters'] },
    { lvl: 'A1', q: '___ your brother like pizza?', o: ['Does', 'Do', 'Is', 'Are'], t: ['tenses', 'present-simple'] },
    { lvl: 'A1', q: 'I’d like ___ apple, please.', o: ['an', 'a', 'the', 'some'], t: ['articles', 'a-an'] },
    { lvl: 'A1', q: 'My sister can ___ three languages.', o: ['speak', 'to speak', 'speaking', 'speaks'], t: ['modals', 'can-could'] },
    /* A2 */
    { lvl: 'A2', q: 'I ___ to Italy last summer.', o: ['went', 'go', 'have gone', 'was go'], t: ['tenses', 'past-simple'] },
    { lvl: 'A2', q: 'Look! It ___.', o: ['is raining', 'rains', 'rain', 'rained'], t: ['tenses', 'present-continuous'] },
    { lvl: 'A2', q: 'My brother is ___ than me.', o: ['taller', 'more tall', 'tallest', 'the tallest'], t: ['comparison', 'comparison'] },
    { lvl: 'A2', q: 'We have lived here ___ 2015.', o: ['since', 'for', 'from', 'at'], t: ['tenses', 'present-perfect'] },
    { lvl: 'A2', q: 'It’s Sunday tomorrow, so we ___ get up early.', o: ['don’t have to', 'mustn’t', 'can’t', 'shouldn’t to'], t: ['modals', 'must-have-to'] },
    { lvl: 'A2', q: 'There isn’t ___ milk in the fridge.', o: ['any', 'some', 'no', 'many'], t: ['indefinite', 'indefinite'] },
    /* B1 */
    { lvl: 'B1', q: 'If I ___ rich, I would travel the world.', o: ['were', 'am', 'will be', 'would be'], t: ['conditionals', 'second-conditional'] },
    { lvl: 'B1', q: 'I’m looking forward to ___ you.', o: ['seeing', 'see', 'to see', 'saw'], t: ['gerund-infinitive', 'gerund'] },
    { lvl: 'B1', q: 'The book ___ I bought yesterday is great.', o: ['that', 'who', 'where', 'what'], t: ['relative', 'relative'] },
    { lvl: 'B1', q: 'This bridge ___ in 1920.', o: ['was built', 'built', 'is building', 'has built'], t: ['passive', 'passive-simple'] },
    { lvl: 'B1', q: 'When I ___ home tonight, I’ll call you.', o: ['get', 'will get', 'got', 'would get'], t: ['time-clauses', 'time-future'] },
    { lvl: 'B1', q: 'She asked me where I ___.', o: ['lived', 'do live', 'did live', 'does live'], t: ['reported', 'reported'] },
    /* B2 */
    { lvl: 'B2', q: 'I wish I ___ harder at school.', o: ['had studied', 'studied', 'would study', 'have studied'], t: ['conditionals', 'wish'] },
    { lvl: 'B2', q: 'Her car is outside, so she ___ be at home.', o: ['must', 'can’t', 'mustn’t', 'should to'], t: ['modals', 'deduction'] },
    { lvl: 'B2', q: 'You ___ me earlier — now it’s too late!', o: ['should have told', 'should tell', 'must tell', 'would tell'], t: ['modals', 'modal-perfect'] },
    { lvl: 'B2', q: 'By the time we arrived, the film ___.', o: ['had started', 'started', 'has started', 'was starting'], t: ['tenses', 'past-perfect'] },
    { lvl: 'B2', q: 'I’d rather you ___ smoke in the car.', o: ['didn’t', 'don’t', 'won’t', 'not'], t: ['preferences', 'rather-better'] },
    { lvl: 'B2', q: 'He suggested ___ a taxi.', o: ['taking', 'to take', 'us to take', 'take'], t: ['reported', 'reported-commands'] },
    /* C1 */
    { lvl: 'C1', q: 'Never ___ such a beautiful place.', o: ['have I seen', 'I have seen', 'I saw', 'did I saw'], t: ['advanced', 'inversion'] },
    { lvl: 'C1', q: '___ I known about the problem, I would have helped.', o: ['Had', 'If', 'Have', 'Were'], t: ['advanced', 'inversion'] },
    { lvl: 'C1', q: '___ the report, she went home.', o: ['Having finished', 'Had finished', 'Being finished', 'To finishing'], t: ['advanced', 'participle'] },
    { lvl: 'C1', q: 'It was my brother ___ broke the window, not me.', o: ['who', 'which', 'what', 'whom'], t: ['advanced', 'cleft'] },
    { lvl: 'C1', q: 'If she had taken that job, she ___ in London now.', o: ['would be living', 'would have lived', 'will live', 'had lived'], t: ['conditionals', 'mixed-conditional'] },
    { lvl: 'C1', q: 'Hardly had we sat down ___ the phone rang.', o: ['when', 'than', 'that', 'then'], t: ['advanced', 'inversion'] }
  ];

  const FL = () => window.FL;
  const esc = s => FL().esc(s);
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } };
  const persist = r => { try { localStorage.setItem(KEY, JSON.stringify(r)); } catch (e) { } };
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  let run = null; // { items: [{ i, opts:[{text, ok}] }], answers: [], idx }

  function topicOf(t) {
    const sub = (typeof COURSE !== 'undefined' ? COURSE.grammar.subs : []).find(s => s.id === t[0]);
    const topic = sub && sub.topics.find(x => x.id === t[1]);
    return topic ? { hash: '#/grammar/' + t[0] + '/' + t[1], title: topic.title, emoji: topic.emoji, level: topic.level } : null;
  }

  function route(view, parts) {
    const sub = parts[1];
    if (parts.length > 2 || (sub && !['run', 'result'].includes(sub))) return FL().notFound(view);
    if (sub === 'run') return runPage(view);
    if (sub === 'result') { const r = load(); return r ? resultPage(view, r) : (location.hash = '#/placement'); }
    introPage(view);
  }

  /* ---------- intro ---------- */
  function introPage(view) {
    FL().setCrumbs([{ label: 'Тест на рівень' }]);
    const last = load();
    view.innerHTML =
      '<div class="pl-hero">' +
      '<div class="pl-hero-emoji">🎯</div>' +
      '<h1>Тест на рівень англійської</h1>' +
      '<p>30 питань від A1 до C1 — приблизно 8 хвилин. Підказок немає: відповідай чесно, а якщо не знаєш — тисни «🤷 Не знаю», так результат буде точнішим.</p>' +
      '<div class="pl-levels">' + LEVELS.map((l, i) => '<span class="pl-lvl" style="animation-delay:' + i * 90 + 'ms">' + LEVEL_INFO[l].emoji + ' <b>' + l + '</b></span>').join('<span class="pl-arrow">→</span>') + '</div>' +
      '<div class="pl-actions"><a class="btn btn-primary btn-big" href="#/placement/run" data-start>' + (last ? '🔁 Пройти ще раз' : '🚀 Почати тест') + '</a>' +
      (run && run.idx < run.items.length ? '<a class="btn btn-ghost btn-big" href="#/placement/run">▶ Продовжити (' + run.idx + '/' + run.items.length + ')</a>' : '') + '</div>' +
      '</div>' +
      (last ? '<a class="card clickable pl-last" href="#/placement/result"><span class="pl-last-badge">' + last.level + '</span><div><div class="pl-last-title">Останній результат: ' + LEVEL_INFO[last.level].emoji + ' ' + last.level + ' · ' + LEVEL_INFO[last.level].name + '</div>' +
        '<div class="pl-last-sub">' + last.correct + ' з ' + last.total + ' правильних · ' + new Date(last.date).toLocaleDateString('uk-UA') + ' · переглянути розбір →</div></div></a>' : '') +
      '<div class="pl-how card"><h3>Як рахується рівень</h3><p>По 6 питань на кожен рівень. Рівень зараховано, якщо правильно <b>щонайменше 4 з 6</b> і зараховано всі нижчі рівні. Після тесту — розбір помилок і посилання на теми граматики, книги й словник твого рівня.</p></div>';
    const start = view.querySelector('[data-start]');
    start.addEventListener('click', () => { run = null; });
  }

  /* ---------- run ---------- */
  function newRun() {
    const items = [];
    LEVELS.forEach(l => Q.forEach((q, i) => { if (q.lvl === l) items.push(i); }));
    run = { items: items.map(i => ({ i, opts: shuffle(Q[i].o.map((text, k) => ({ text, ok: k === 0 }))) })), answers: [], idx: 0 };
  }

  function runPage(view) {
    FL().setCrumbs([{ label: 'Тест на рівень', hash: '#/placement' }, { label: 'Проходження' }]);
    if (!run || run.idx >= run.items.length) newRun();
    draw(view);
  }

  function draw(view) {
    const it = run.items[run.idx];
    const q = Q[it.i];
    const pct = run.idx / run.items.length;
    view.innerHTML =
      '<div class="session-wrap pl-run">' +
      '<div class="session-head">' +
      '<a class="s-close" href="#/placement" title="Вийти">✕</a>' +
      '<div class="session-progress">' + FL().progressBar(pct) + '</div>' +
      '<span class="session-count">' + (run.idx + 1) + ' / ' + run.items.length + '</span>' +
      '</div>' +
      '<div class="card q-card pl-card" id="pl-card">' +
      '<div class="q-type">Рівень ' + q.lvl + ' · ' + LEVEL_INFO[q.lvl].emoji + ' ' + LEVEL_INFO[q.lvl].name + '</div>' +
      '<div class="q-text">' + esc(q.q).replace('___', '<span class="blank">…</span>') + '</div>' +
      '<div class="opts">' + it.opts.map((o, k) => '<button class="opt" data-k="' + k + '"><span class="opt-key">' + String.fromCharCode(65 + k) + '</span><span>' + esc(o.text) + '</span></button>').join('') + '</div>' +
      '<div class="pl-skip-row"><button class="btn btn-ghost" data-skip>🤷 Не знаю</button></div>' +
      '</div></div>';
    const card = view.querySelector('#pl-card');
    card.addEventListener('click', e => {
      const b = e.target.closest('.opt');
      const skip = e.target.closest('[data-skip]');
      if (!b && !skip) return;
      if (card.dataset.locked) return;
      card.dataset.locked = '1';
      const k = b ? +b.dataset.k : -1;
      run.answers[run.idx] = k;
      if (b) b.classList.add('pl-picked');
      setTimeout(() => {
        run.idx++;
        if (run.idx >= run.items.length) finish();
        else if (location.hash === '#/placement/run') draw(view);
      }, b ? 260 : 60);
    });
  }

  document.addEventListener('keydown', e => {
    if (location.hash !== '#/placement/run' || !run) return;
    if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
    const k = 'abcd'.indexOf(e.key.toLowerCase());
    const n = ['1', '2', '3', '4'].indexOf(e.key);
    const idx = k >= 0 ? k : n;
    if (idx >= 0) { const b = document.querySelectorAll('#pl-card .opt')[idx]; if (b) b.click(); }
  });

  function finish() {
    const per = {};
    LEVELS.forEach(l => { per[l] = { ok: 0, total: 0 }; });
    const mistakes = [];
    run.items.forEach((it, n) => {
      const q = Q[it.i], a = run.answers[n];
      const ok = a >= 0 && it.opts[a].ok;
      per[q.lvl].total++;
      if (ok) per[q.lvl].ok++;
      else mistakes.push({ i: it.i, your: a >= 0 ? it.opts[a].text : null });
    });
    let level = 'A1';
    for (const l of LEVELS) { if (per[l].ok >= PASS) level = l; else break; }
    const passedAny = per.A1.ok >= PASS;
    const prev = load();
    const result = {
      date: Date.now(), level, passedAny, per, mistakes,
      correct: LEVELS.reduce((s, l) => s + per[l].ok, 0), total: run.items.length,
      rewarded: !!(prev && prev.rewarded)
    };
    if (!result.rewarded) { result.rewarded = true; FL().addXp(XP); }
    persist(result);
    run = null;
    FL().touchStreak();
    location.hash = '#/placement/result';
    setTimeout(() => { try { FL().confetti(); } catch (e) { } }, 300);
  }

  /* ---------- result ---------- */
  function resultPage(view, r) {
    FL().setCrumbs([{ label: 'Тест на рівень', hash: '#/placement' }, { label: 'Результат' }]);
    const info = LEVEL_INFO[r.level];
    const next = LEVELS[LEVELS.indexOf(r.level) + 1];
    const course = typeof COURSE !== 'undefined' ? COURSE.grammar.subs : [];
    const topicsAt = lvl => {
      const out = [];
      course.forEach(s => s.topics.forEach(t => { if (t.level === lvl) out.push({ hash: '#/grammar/' + s.id + '/' + t.id, title: t.title, emoji: t.emoji, level: t.level }); }));
      return out;
    };
    const mistakeTopics = [];
    const seen = new Set();
    r.mistakes.forEach(m => { const t = topicOf(Q[m.i].t); if (t && !seen.has(t.hash)) { seen.add(t.hash); mistakeTopics.push(t); } });
    const nextTopics = next ? topicsAt(next).filter(t => !seen.has(t.hash)).slice(0, 4) : topicsAt('C1').filter(t => !seen.has(t.hash)).slice(0, 4);
    const readerLvl = r.level === 'A1' ? 'A2' : r.level;
    const vocabMax = next || 'C2';

    view.innerHTML =
      '<div class="pl-result">' +
      '<div class="pl-res-hero">' +
      '<div class="pl-badge-big"><span>' + r.level + '</span></div>' +
      '<div class="pl-res-main">' +
      '<div class="pl-kicker">Твій рівень</div>' +
      '<h1>' + info.emoji + ' ' + r.level + ' · ' + info.name + '</h1>' +
      '<p>' + (r.passedAny ? info.desc : 'Поки що рівень A1 не зараховано повністю — почнімо з основ, це швидко!') + '</p>' +
      '<div class="pl-score">✅ ' + r.correct + ' з ' + r.total + ' правильних' + (next ? ' · наступна ціль: <b>' + next + '</b>' : ' · максимальний рівень тесту 🏆') + '</div>' +
      '</div></div>' +

      '<div class="card pl-bars">' + LEVELS.map(l => {
        const p = r.per[l], ok = p.ok >= PASS;
        return '<div class="pl-bar-row"><span class="pl-bar-lvl">' + l + '</span>' +
          '<div class="pl-bar"><i class="' + (ok ? 'ok' : '') + '" style="width:' + Math.round(p.ok / p.total * 100) + '%"></i></div>' +
          '<span class="pl-bar-num">' + p.ok + '/' + p.total + ' ' + (ok ? '✓' : '') + '</span></div>';
      }).join('') + '<div class="pl-bars-hint">Рівень зараховано при ≥ ' + PASS + ' з 6</div></div>' +

      '<h2 class="section-title">Що робити далі</h2>' +
      '<div class="zone-grid">' +
      '<a class="card clickable zone-card" href="#/read" data-reader="' + readerLvl + '"><div class="zone-icon">📚</div><h3>Книги рівня ' + readerLvl + '</h3><p>Відкрию бібліотеку з фільтром ' + readerLvl + ' — читай із перекладом слів по кліку.</p></a>' +
      '<a class="card clickable zone-card" href="#/vocab"><div class="zone-icon">🗂️</div><h3>Словник до ' + vocabMax + '</h3><p>У браузері слів і тренажерах залиш рівні A1–' + vocabMax + ': вивчене закріпиш, нове буде посильним.</p></a>' +
      '<a class="card clickable zone-card" href="#/diary"><div class="zone-icon">📝</div><h3>Пиши щоденник</h3><p>Кілька речень щодня з конструкціями рівня ' + (next || r.level) + ' — і перевір текст кнопкою 🔍.</p></a>' +
      '</div>' +

      (mistakeTopics.length ? '<h2 class="section-title">📌 Повтори теми з помилками <small>' + mistakeTopics.length + '</small></h2><div class="pl-topics">' + mistakeTopics.map(topicLink).join('') + '</div>' : '') +
      (nextTopics.length ? '<h2 class="section-title">🎯 Теми для рівня ' + (next || 'C1') + '</h2><div class="pl-topics">' + nextTopics.map(topicLink).join('') + '</div>' : '') +

      (r.mistakes.length ? '<details class="card pl-review"><summary>🔎 Розбір помилок (' + r.mistakes.length + ')</summary>' + r.mistakes.map(m => {
        const q = Q[m.i], t = topicOf(q.t);
        return '<div class="pl-mis"><div class="pl-mis-q"><span class="tag">' + q.lvl + '</span> ' + esc(q.q).replace('___', '<b class="pl-blank">' + esc(q.o[0]) + '</b>') + '</div>' +
          '<div class="pl-mis-a">' + (m.your ? 'Твоя відповідь: <s>' + esc(m.your) + '</s> · ' : '🤷 Без відповіді · ') + 'правильно: <b>' + esc(q.o[0]) + '</b>' +
          (t ? ' · <a href="' + t.hash + '">' + t.emoji + ' ' + esc(t.title) + ' →</a>' : '') + '</div></div>';
      }).join('') + '</details>' : '<div class="card pl-perfect">🏆 Жодної помилки — ідеальний результат!</div>') +

      '<div class="pl-actions"><a class="btn btn-ghost" href="#/placement/run" data-again>🔁 Пройти ще раз</a><a class="btn btn-primary" href="' + (mistakeTopics[0] || nextTopics[0] || { hash: '#/grammar' }).hash + '">Почати навчання →</a></div>' +
      '</div>';

    view.querySelector('[data-reader]').addEventListener('click', e => { try { localStorage.setItem('reader_flt_level', e.currentTarget.dataset.reader); localStorage.setItem('reader_flt_genre', ''); } catch (err) { } });
    view.querySelector('[data-again]').addEventListener('click', () => { run = null; });
  }

  function topicLink(t) {
    return '<a class="card clickable pl-topic" href="' + t.hash + '"><span class="pl-topic-emoji">' + t.emoji + '</span><span class="pl-topic-title">' + esc(t.title) + '</span><span class="tag">' + t.level + '</span></a>';
  }

  window.FLPlacement = {
    route,
    QUESTIONS: Q,
    summary() { const r = load(); return r ? { level: r.level, correct: r.correct, total: r.total, date: r.date } : null; }
  };
})();
