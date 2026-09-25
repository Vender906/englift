/* ============================================================
   EngLift — Word on Demand: активне пригадування слова під думку.
   Користувач бачить українську ситуацію і сам формулює її англійською,
   використовуючи цільове слово, якого йому НЕ показують до спроби чи підказки.
   Блоки: ДАНІ · ПЕРЕВІРКА (judge) · ІНТЕРВАЛИ (SCHED) · ЖУРНАЛ · СТАТИСТИКА · UI.
   Дані — js/lexis/wod-verbs.js (LEX_WOD_VERBS), вантажаться разом із дієсловами.
   Прогрес — store.wod: { words: { слово: стан }, log: [спроби] }.
   ============================================================ */
(function () {
  'use strict';

  const C = window.FLCore;
  const { $, $$, esc, plural, oneTypo, store, save, touchStreak, showToast, addXp, speak, progressBar } = C;

  /* ============================ ДАНІ ============================ */
  /* Ситуації лежать у кількох файлах js/lexis/wod/verbs-NN.js (≈6 МБ разом) і вантажаться лише
     при першому відкритті тренажера. Кожен файл дописує записи в LEX_WOD_VERBS і позначає себе в LEX_WOD_LOADED.
     Список частин оновлює tools/wod/build.js. */
  const PARTS = [/* @wod-parts */'verbs-01', 'verbs-02', 'verbs-03', 'verbs-04', 'verbs-05', 'verbs-06'];
  const rawList = () => window.LEX_WOD_VERBS || [];
  const partsLoaded = () => PARTS.every(p => (window.LEX_WOD_LOADED || {})[p]);
  let dataLoading = null;
  function ensureData() {
    if (partsLoaded()) return Promise.resolve();
    return dataLoading || (dataLoading = Promise.all(PARTS.filter(p => !(window.LEX_WOD_LOADED || {})[p]).map(p => new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = 'js/lexis/wod/' + p + '.js';
      el.onload = resolve;
      el.onerror = () => { el.remove(); reject(new Error('не вдалося завантажити ' + p)); };
      document.head.appendChild(el);
    }))).catch(e => { dataLoading = null; throw e; }));
  }

  const LVL_ORDER = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5 };
  let prepared = null, preparedN = -1;
  /* ключ прогресу — саме слово; якщо в слова кілька значень (rise: вставати / сходити / підніматися), — слово@id */
  function words() {
    const raw = rawList();
    if (prepared && preparedN === raw.length) return prepared;
    preparedN = raw.length;
    const cnt = {};
    raw.forEach(e => { cnt[e.w] = (cnt[e.w] || 0) + 1; });
    const order = e => (LVL_ORDER[e.lvl] ?? 9) * 1e5 + (e.id ?? 0);
    return (prepared = raw.slice().sort((a, b) => order(a) - order(b))
      .map(e => prepWord(cnt[e.w] > 1 ? Object.assign({ k: e.w + '@' + e.id }, e) : e)));
  }
  /* категорії слова — зі словника дієслів (за id), або власні cats запису */
  let verbById = null;
  function catsOf(W) {
    if (W.cats) return W.cats;
    const P = window.FLLexis && window.FLLexis.POS.verbs;
    if (!P || !P.words.length) return [];
    if (!verbById || verbById.size !== P.words.length) verbById = new Map(P.words.map(v => [v._id, v]));
    const v = verbById.get(W.id);
    return v && v.en === W.w ? v.cats || [] : [];
  }
  /* Стійкі вирази (give up, bear in mind): forms — форми першого слова, tail — решта слів.
     Якщо tail не задано, його беремо з w (без дужок і присвійних займенників). */
  const FLEX = new Set(['a', 'an', 'the', 'your', 'my', 'his', 'her', 'its', 'our', 'their', "one's", "someone's", 'sb', 'sth', 'somebody', 'something', 'someone', 'oneself', 'yourself']);
  const plain = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[‘’ʼ`´]/g, "'").trim();
  function tailOf(e) {
    const src = e.tail != null ? e.tail : e.w.replace(/\([^)]*\)/g, ' ').trim().split(/\s+/).slice(1).filter(x => !FLEX.has(plain(x))).join(' ');
    /* множина теж підходить: lunch → lunches, favor → favors */
    return src.trim() ? src.trim().split(/\s+/).map(tok => new RegExp('^(?:' + tok.split('/').map(a => plain(a)
      .replace(/[.?+^$()[\]{}\\]/g, '\\$&').replace(/\*/g, "[a-z0-9'-]*")).join('|') + ')(?:s|es)?$')) : [];
  }
  function prepWord(e) {
    const slots = e.forms.split('|').map(s => s.split('/').map(plain));
    const forms = new Map();                     // форма → набір слотів (V2 і V3 часто збігаються)
    slots.forEach((alts, i) => alts.forEach(f => (forms.get(f) || forms.set(f, new Set()).get(f)).add(i)));
    return Object.assign({}, e, {
      k: e.k || e.w,
      slots, forms, tail: tailOf(e),
      tasks: e.tasks.map((t, i) => Object.assign({ id: (e.k || e.w) + '#' + (i + 1) }, t))
    });
  }
  const wordById = k => words().find(W => W.k === k);
  const taskById = (W, id) => W.tasks.find(t => t.id === id) || W.tasks[0];

  /* ============================ ПЕРЕВІРКА ============================ */
  /* нижній регістр, прямі апострофи, розгорнуті скорочення: didn't → did not, I'm → I am;
     дефіс усередині слова зберігаємо (double-check), наголоси знімаємо (sauté → saute) */
  function tokens(s) {
    const t = ' ' + plain(s || '') + ' ';
    return t
      .replace(/\bwon't\b/g, 'will not').replace(/\bcan't\b/g, 'can not').replace(/\bcannot\b/g, 'can not').replace(/\bshan't\b/g, 'shall not')
      .replace(/n't\b/g, ' not')
      .replace(/'m\b/g, ' am').replace(/'re\b/g, ' are').replace(/'ve\b/g, ' have').replace(/'ll\b/g, ' will').replace(/'d\b/g, " 'd")
      .replace(/\blet's\b/g, 'let us')
      .replace(/\b(it|that|what|there|he|she|who|here|where|how|this)'s\b/g, '$1 is')
      .replace(/'s\b/g, '')                     // присвійне: pharmacy's → pharmacy
      .replace(/[^a-z0-9'\- ]+/g, ' ')
      .split(' ').map(x => x === "'d" ? x : x.replace(/^['-]+|['-]+$/g, '')).filter(Boolean);
  }
  const padded = toks => ' ' + toks.join(' ') + ' ';

  /* шаблон 'stair*|not fall' → регулярний вираз по словах */
  const rxCache = {};
  function patRx(p) {
    /* межа слова — пробіл або дефіс: ключ «ten» знаходить і «ten-kilo» */
    return rxCache[p] || (rxCache[p] = new RegExp('(?<=[ -])(?:' + p.split('|').map(a => plain(a)
      .replace(/[.?+^$()[\]{}\\]/g, '\\$&').replace(/\*/g, "[a-z0-9'-]*").replace(/\s+/g, ' ')).join('|') + ')(?=[ -])'));
  }

  /* цільове слово в токенах: перше слово виразу + решта слів у вікні після нього (у будь-якому порядку,
     бо частка може стояти після додатка: give it up, put your makeup on).
     → { i, form, slots, span: [індекси] } або { partial: форма }, якщо є лише дієслово без решти виразу */
  function matchTarget(W, toks) {
    const m = scanTarget(W, toks);
    /* «peer-reviewed» для виразу «peer review»: якщо цілим словом не знайшлося — ділимо слова з дефісом */
    if ((!m || m.partial) && toks.some(t => t.includes('-'))) {
      const m2 = scanTarget(W, toks.flatMap(t => t.split('-')).filter(Boolean));
      if (m2 && !m2.partial) return m2;
    }
    return m;
  }
  function scanTarget(W, toks) {
    let partial = null;
    for (let i = 0; i < toks.length; i++) {
      if (!W.forms.has(toks[i])) continue;
      const span = [i], used = new Set(span), end = Math.min(toks.length, i + 1 + W.tail.length + 5);
      /* спершу після дієслова; прислівник виразу може стояти й перед ним: I deeply appreciate */
      const all = W.tail.every(rx => {
        for (let j = i + 1; j < end; j++) if (!used.has(j) && rx.test(toks[j])) { used.add(j); span.push(j); return true; }
        for (let j = i - 1; j >= Math.max(0, i - 3); j--) if (!used.has(j) && rx.test(toks[j])) { used.add(j); span.push(j); return true; }
        return false;
      });
      if (all) return { i, form: toks[i], slots: W.forms.get(toks[i]), span, toks };
      partial = partial || toks[i];
    }
    return partial ? { partial } : null;
  }
  function findTarget(W, toks) {
    const m = matchTarget(W, toks);
    return m && !m.partial ? m : null;
  }
  function findTypo(W, toks) {
    const forms = [...W.forms.keys()];
    return toks.find(t => t.length >= 4 && forms.some(f => oneTypo(t, f))) || null;
  }

  /* граматика навколо цільового дієслова: що стоїть перед ним */
  const SKIP = new Set(['not', 'never', 'even', 'just', 'really', 'ever', 'always', 'also', 'still', 'already', 'almost', 'nearly', 'suddenly', 'finally', 'actually', 'accidentally', 'completely', 'totally', 'simply', 'barely', 'hardly', 'only', 'definitely', 'probably', 'then', 'eventually', 'immediately', 'honestly']);
  const BASE_AFTER = new Set(['do', 'does', 'did', 'can', 'could', 'will', 'would', 'should', 'must', 'might', 'may', 'shall', 'let']);
  const BE = new Set(['am', 'is', 'are', 'was', 'were', 'be', 'been', 'being']);
  const HAVE = new Set(['have', 'has', 'had', 'having']);
  const SUBJ3 = new Set(['he', 'she', 'it']);
  const SUBJ = new Set(['i', 'you', 'we', 'they']);
  function verbIssues(W, toks, hit) {
    let j = hit.i - 1;
    while (j >= 0 && SKIP.has(toks[j])) j--;
    const prev = j >= 0 ? toks[j] : '', S = hit.slots, f = n => W.slots[n][0];
    const base = f(0), form = hit.form;
    const isBase = S.has(0), is3 = S.has(1), isPast = S.has(2), isPP = S.has(3), isIng = S.has(4);
    if (BASE_AFTER.has(prev) && !isBase)
      return ['Після «' + prev + '» дієслово стоїть у базовій формі: ' + prev + ' … ' + base + ', а не «' + form + '».'];
    if (prev === 'to' && !isBase && !isIng)
      return ['Після «to» потрібна базова форма: to ' + base + ', а не «to ' + form + '».'];
    if (BE.has(prev) && (isBase || is3) && !isPast && !isPP)
      return ['Після «' + prev + '» потрібна -ing форма (' + prev + ' ' + f(4) + ') або третя форма для пасиву (' + prev + ' ' + f(3) + ').'];
    if (HAVE.has(prev) && !isPP)
      return ['Після «' + prev + '» у перфекті потрібна третя форма: ' + prev + ' ' + f(3) + '.'];
    /* питання: Does she nap…? / Will it shrink…? — допоміжне дієслово перед підметом, база правильна */
    const aux = toks[j - 1] === 'not' ? toks[j - 2] : toks[j - 1];   // why doesn't he…? → does not he
    if (j >= 1 && BASE_AFTER.has(aux) && (SUBJ3.has(prev) || SUBJ.has(prev))) return [];
    if (SUBJ3.has(prev) && isBase && !isPast)
      return ['He / she / it: ' + prev + ' ' + f(1) + ' (теперішній час) або ' + prev + ' ' + f(2) + ' (минулий).'];
    if (SUBJ.has(prev) && is3 && !isBase)
      return ['З «' + prev + '» дієслово без -s: ' + prev + ' ' + base + '.'];
    return [];
  }
  /* загальні помилки — правила офлайн-перевірки з Diary */
  function checkerIssues(text) {
    if (!window.FLChecker) return [];
    try { return window.FLChecker.check(text).map(x => x.msg + (x.fix ? ' → ' + x.fix : '')); } catch (e) { return []; }
  }

  /* схожість із варіантами носія: коефіцієнт Дайса за парами сусідніх слів (враховує порядок і вставки) */
  const bigrams = toks => new Set(['^'].concat(toks, '$').slice(1).map((t, i, arr) => (i ? arr[i - 1] : '^') + ' ' + t));
  function closestRef(task, toks) {
    const a = bigrams(toks);
    let best = { i: 0, sim: 0 };
    task.ans.forEach((ref, i) => {
      const b = bigrams(tokens(ref));
      let common = 0; a.forEach(t => { if (b.has(t)) common++; });
      const sim = (a.size + b.size) ? 2 * common / (a.size + b.size) : 0;
      if (sim > best.sim) best = { i, sim };
    });
    return best;
  }

  /* judge → { verdict: 'short' | 'notarget' | 'partial' | 'typo' | 'unsure' | 'ok', … }
     Оцінюємо зміст (ключові поняття), цільове слово, граматику й близькість до варіантів носія —
     точного збігу з еталоном не вимагаємо. */
  function judge(W, task, text) {
    const toks = tokens(text);
    if (toks.length < 3) return { verdict: 'short' };
    const p = padded(toks);
    const keys = Object.entries(task.keys || {});
    const missing = keys.filter(([, pat]) => !patRx(pat).test(p)).map(([uk]) => uk);
    const closest = closestRef(task, toks);
    const hit = matchTarget(W, toks);
    if (hit && hit.partial) return { verdict: 'partial', form: hit.partial, missing, closest };
    if (!hit) {
      const typo = findTypo(W, toks);
      if (typo) return { verdict: 'typo', typo, missing, closest };
      const m = W.near ? patRx(W.near).exec(p) : null;
      return { verdict: 'notarget', near: m ? m[0].trim() : '', missing, closest };
    }
    const grammar = [...new Set(verbIssues(W, hit.toks, hit).concat(checkerIssues(text)))];
    const covered = keys.length ? (keys.length - missing.length) / keys.length : 1;
    return { verdict: covered < 0.5 ? 'unsure' : 'ok', form: hit.form, missing, grammar, closest };
  }

  /* ============================ ІНТЕРВАЛИ ============================ */
  /* Оцінка картки → наступний показ. Логіку зібрано в одну таблицю, щоб її було легко замінити
     (наприклад, на SM-2 / FSRS): next(стан, оцінка, now) → { step, due }. */
  const MIN = 60e3, DAY = 864e5;
  const SCHED = {
    steps: [10 * MIN, DAY, 3 * DAY, 7 * DAY, 16 * DAY, 35 * DAY, 80 * DAY],
    rules: {
      recall: { step: +1 },                 // сам, без підказки — сильне пригадування
      hint1: { step: 0, min: 1, factor: 0.5 }, // з першою підказкою — ще не зовсім доступне
      hint2: { step: -1 },                  // лише з першою літерою — слабке пригадування
      examples: { reset: true, wait: 10 * MIN }, // знадобилися всі варіанти — повторити раніше
      wrong: { reset: true, wait: 3 * MIN },     // не вийшло — повторити скоро і в новій ситуації
      skip: { wait: 2 * MIN }
    },
    next(st, grade, now) {
      const r = this.rules[grade] || this.rules.skip, max = this.steps.length - 1;
      if (r.reset) return { step: 0, due: now + r.wait };
      if (r.wait) return { step: st.step || 0, due: now + r.wait };
      const step = Math.max(r.min || 0, Math.min(max, (st.step || 0) + r.step));
      return { step, due: now + Math.round(this.steps[step] * (r.factor || 1)) };
    }
  };
  /* картка → оцінка: наскільки самостійно вдалося дістати слово */
  function gradeOf(card) {
    if (card.solved) {
      if (card.hint === 0 && !card.wrong) return 'recall';
      if (card.hint <= 1) return 'hint1';
      return card.hint === 2 ? 'hint2' : 'examples';
    }
    if (card.wrong) return 'wrong';
    return card.hint >= 3 ? 'examples' : 'skip';
  }
  const GRADE_LABEL = {
    recall: '💪 без підказок', hint1: '💡 з підказкою 1', hint2: '🔤 з першою літерою',
    examples: '👀 після прикладів', wrong: '❌ не вдалося', skip: '⏭ пропущено'
  };
  const XP = { recall: 15, hint1: 10, hint2: 6, examples: 3 };

  /* ============================ ЖУРНАЛ ============================ */
  const LOG_MAX = 400;
  function db() {
    const d = store.wod || (store.wod = {});
    if (!d.words) d.words = {};
    if (!d.log) d.log = [];
    return d;
  }
  function wordState(w) {
    const d = db();
    return d.words[w] || (d.words[w] = { step: 0, due: 0, seen: 0, last: 0, lastTask: '', tasks: {}, solved: [], hist: [], cnt: {} });
  }
  /* кожна спроба: { word, task, attempt, result, used_hint, hint_level, response_time, at } */
  function logAttempt(card, result) {
    const d = db();
    card.attempts++;
    d.log.push({
      word: card.w, task: card.task, attempt: card.attempts, result,
      used_hint: card.hint > 0, hint_level: card.hint,
      response_time: Math.round((Date.now() - card.t0) / 100) / 10, at: Date.now()
    });
    if (d.log.length > LOG_MAX) d.log.splice(0, d.log.length - LOG_MAX);
    save();
  }
  /* підсумок картки → стан слова й наступний показ */
  function commit(card) {
    const grade = gradeOf(card), st = wordState(card.w), now = Date.now();
    st.seen++; st.last = now; st.lastTask = card.task; st.tasks[card.task] = now;
    if (card.solved && !st.solved.includes(card.task)) st.solved.push(card.task);
    st.hist.push(grade); if (st.hist.length > 20) st.hist.shift();
    st.cnt[grade] = (st.cnt[grade] || 0) + 1;
    Object.assign(st, SCHED.next(st, grade, now));
    card.grade = grade;
    save();
    return grade;
  }

  /* ============================ СТАТИСТИКА ============================ */
  const HELPED = new Set(['hint1', 'hint2', 'examples']);
  function wordStats(W) {
    const st = db().words[W.k];
    if (!st) return null;
    const h = st.hist.filter(g => g !== 'skip').slice(-10);
    const indep = h.length ? h.filter(g => g === 'recall').length / h.length : 0;
    return {
      W, st, n: h.length, indep,
      contexts: st.solved.length,
      needsHints: st.hist.slice(-5).filter(g => HELPED.has(g)).length >= 2,
      struggles: h.filter(g => g === 'wrong' || g === 'examples').length
    };
  }
  function indepNote(s) {
    if (!s.n) return 'Ще не тренувалося.';
    if (s.indep >= 0.8) return 'Зазвичай дістаєш це слово сам, без допомоги.';
    if (s.indep >= 0.5) return 'Часто згадуєш сам, але інколи потрібна підказка.';
    if (s.indep > 0) return 'Поки що частіше потрібна допомога.';
    return 'Ще жодного разу без підказки.';
  }
  function summary() {
    const d = db(), all = words().map(wordStats).filter(Boolean);
    const cnt = k => all.filter(s => (s.st.cnt[k] || 0) > 0).length;
    const rts = d.log.filter(e => e.result === 'correct').map(e => e.response_time);
    return {
      practised: all.length,
      recalled: all.filter(s => s.st.solved.length > 0).length,
      noHints: cnt('recall'),
      withHints: all.filter(s => (s.st.cnt.hint1 || 0) + (s.st.cnt.hint2 || 0) > 0).length,
      avgTime: rts.length ? rts.reduce((a, b) => a + b, 0) / rts.length : null,
      needHints: all.filter(s => s.needsHints),
      multi: all.filter(s => s.contexts >= 2),
      hardest: all.filter(s => s.n >= 2 && s.indep < 0.5).sort((a, b) => a.indep - b.indep || b.struggles - a.struggles).slice(0, 3),
      all
    };
  }

  /* ============================ ВИБІР КАТЕГОРІЙ ============================ */
  /* store.wod.scope — id категорій і підкатегорій словника дієслів; порожньо = усі дієслова */
  const scopeIds = () => db().scope || [];
  const inScope = (W, S) => !S.size || catsOf(W).some(c => S.has(c));
  let scopedCache = null;
  function scoped(ids) {
    const S = new Set(ids || scopeIds()), list = words();
    const P = window.FLLexis && window.FLLexis.POS.verbs;
    const key = [...S].sort().join(',') + '|' + list.length + '|' + (P ? P.words.length : 0);
    if (scopedCache && scopedCache.key === key) return scopedCache.list;
    const res = S.size ? list.filter(W => inScope(W, S)) : list;
    if (!ids) scopedCache = { key, list: res };
    return res;
  }
  /* дерево для вибору: категорії → підкатегорії, лише ті, де є ситуації; кількість слів у кожній */
  const splitLab = l => { const p = String(l || '').split(' — '); return { en: p[0], uk: p[1] || '' }; };
  function catTree() {
    const P = window.FLLexis && window.FLLexis.POS.verbs;
    if (!P) return [];
    const n = {};
    words().forEach(W => new Set(catsOf(W)).forEach(c => { n[c] = (n[c] || 0) + 1; }));
    const ok = c => c && !c.special && !c.adult;
    return Object.entries(P.cats).filter(([k, c]) => ok(c) && n[k]).map(([k, c]) => ({
      id: k, c, n: n[k],
      subs: Object.entries(P.subs).filter(([s, sc]) => sc.parent === k && ok(sc) && n[s]).map(([s, sc]) => ({ id: s, c: sc, n: n[s] }))
    }));
  }
  function scopeLabel(ids) {
    if (!ids.length) return 'Усі дієслова';
    const P = window.FLLexis.POS.verbs, c = id => P.cats[id] || P.subs[id];
    const names = ids.filter(c).map(id => c(id).emoji + ' ' + splitLab(c(id).label).en);
    return names.slice(0, 3).join(', ') + (names.length > 3 ? ' +' + (names.length - 3) : '');
  }

  /* ============================ ЧЕРГА ============================ */
  function pickWord(force, exclude) {
    const d = db(), now = Date.now(), list = scoped();
    const byDue = (a, b) => d.words[a.k].due - d.words[b.k].due;
    const due = list.filter(W => d.words[W.k] && d.words[W.k].due <= now).sort(byDue);
    const fresh = list.filter(W => !d.words[W.k]);
    const pick = [due.find(W => W.k !== exclude), fresh.find(W => W.k !== exclude), due[0], fresh[0]].find(Boolean);
    if (pick || !force) return pick || null;
    const seen = list.filter(W => d.words[W.k]).sort(byDue);
    return seen.find(W => W.k !== exclude) || seen[0] || null;
  }
  /* нова ситуація: спершу ще не бачені, потім найдавніші; ніколи — та сама, що минулого разу */
  function pickTask(W) {
    const st = db().words[W.k], used = st ? st.tasks : {};
    let pool = W.tasks.filter(t => !st || t.id !== st.lastTask);
    if (!pool.length) pool = W.tasks;
    const oldest = Math.min(...pool.map(t => used[t.id] || 0));
    const cand = pool.filter(t => (used[t.id] || 0) === oldest);
    return cand[Math.floor(Math.random() * cand.length)];
  }
  function queueInfo() {
    const d = db(), now = Date.now(), list = scoped();
    const seen = list.filter(W => d.words[W.k]);
    const next = seen.map(W => d.words[W.k].due).filter(t => t > now).sort((a, b) => a - b)[0];
    return { due: seen.filter(W => d.words[W.k].due <= now).length, fresh: list.length - seen.length, next };
  }
  function whenText(t) {
    const m = Math.max(1, Math.round((t - Date.now()) / MIN));
    if (m < 60) return 'через ' + m + ' хв';
    const h = Math.round(m / 60);
    if (h < 24) return 'через ' + h + ' год';
    const dd = Math.round(h / 24);
    return 'через ' + dd + ' ' + plural(dd, 'день', 'дні', 'днів');
  }

  /* ============================ UI ============================ */
  const ui = { view: 'train', card: null, force: false };
  const SR = () => window.SpeechRecognition || window.webkitSpeechRecognition;

  function newCard(exclude) {
    const W = pickWord(ui.force, exclude);
    ui.card = W ? { w: W.k, task: pickTask(W).id, hint: 0, attempts: 0, wrong: 0, solved: false, grade: null, t0: Date.now(), val: '', fb: null, unsure: false } : null;
  }

  function render(panel) {
    if (!partsLoaded()) {
      panel.innerHTML = '<div class="empty-note">⏳ Завантажую ситуації…</div>';
      const seq = ui.seq = (ui.seq || 0) + 1;
      const still = () => ui.seq === seq && panel.isConnected && /\/wod$/.test(location.hash);
      ensureData().then(() => { if (still()) render(panel); },
        () => { if (still()) panel.innerHTML = '<div class="empty-note">Не вдалося завантажити ситуації 🙃 Перевір інтернет і відкрий вкладку ще раз.</div>'; });
      return;
    }
    if (!words().length) { panel.innerHTML = '<div class="empty-note">Ситуації ще не завантажилися 🙃</div>'; return; }
    if (ui.view === 'stats') return drawStats(panel);
    if (ui.view === 'scope') return drawScope(panel);
    const S = new Set(scopeIds());
    if (!ui.card || !wordById(ui.card.w) || !inScope(wordById(ui.card.w), S)) newCard();
    drawCard(panel);
  }

  /* рядок «Що тренуємо» над карткою */
  function scopeBarHtml() {
    const ids = scopeIds();
    return '<div class="wod-scope-bar"><span class="wod-scope-k">📂 Що тренуємо:</span>' +
      '<span class="wod-scope-v">' + esc(scopeLabel(ids)) + ' <span class="wod-muted">· ' + scoped().length + ' ' + plural(scoped().length, 'дієслово', 'дієслова', 'дієслів') + '</span></span>' +
      '<button class="btn btn-ghost wod-scope-btn" id="wod-scope-open" type="button">Змінити</button></div>';
  }

  /* вибір категорій і підкатегорій галочками */
  function drawScope(panel) {
    const tree = catTree();
    const draft = ui.draft || (ui.draft = new Set(scopeIds()));
    const row = (x, cls) => '<label class="wod-ck-row ' + cls + '"><input type="checkbox" class="wod-ck" data-id="' + x.id + '">' +
      '<span class="wod-ck-name">' + x.c.emoji + ' <b>' + esc(splitLab(x.c.label).en) + '</b>' +
      (splitLab(x.c.label).uk ? ' <span class="wod-ck-uk">' + esc(splitLab(x.c.label).uk) + '</span>' : '') + '</span>' +
      '<span class="wod-ck-n">' + x.n + '</span></label>';
    panel.innerHTML = '<div class="wod-wide">' + headHtml() +
      '<div class="card wod-scope">' +
      '<div class="wod-scope-top"><h3>📂 Що тренуємо</h3><div class="wod-scope-sum" id="wod-scope-sum" role="status" aria-live="polite"></div></div>' +
      '<div class="wod-scope-hint">Познач категорії цілком або відкрий ▾ і вибери окремі підкатегорії. Нічого не позначено — тренуються всі дієслова.</div>' +
      '<div class="wod-scope-tools"><input type="search" class="text-input wod-scope-q" id="wod-scope-q" placeholder="🔍 Знайти категорію…" autocomplete="off" aria-label="Пошук категорії">' +
      '<button class="btn btn-ghost" id="wod-scope-none" type="button">Зняти все</button></div>' +
      '<div class="wod-cats">' + tree.map(t =>
        '<div class="wod-cat" data-cat="' + t.id + '"><div class="wod-cat-head">' + row(t, 'wod-ck-cat') +
        (t.subs.length ? '<button class="wod-exp" type="button" data-exp="' + t.id + '" aria-expanded="false" title="Підкатегорії">▾ ' + t.subs.length + '</button>' : '') + '</div>' +
        (t.subs.length ? '<div class="wod-subs" hidden>' + t.subs.map(s => row(s, 'wod-ck-sub')).join('') + '</div>' : '') +
        '</div>').join('') + '</div>' +
      '<div class="wod-scope-foot"><button class="btn btn-primary" id="wod-scope-go" type="button">Тренувати →</button>' +
      '<button class="btn btn-ghost" id="wod-scope-cancel" type="button">Скасувати</button></div>' +
      '</div></div>';
    bindHead(panel);

    const parentOf = {};
    tree.forEach(t => t.subs.forEach(s => { parentOf[s.id] = t.id; }));
    function paint() {
      $$('.wod-ck', panel).forEach(ck => {
        const id = ck.dataset.id, p = parentOf[id];
        if (p) { ck.checked = draft.has(id) || draft.has(p); ck.disabled = draft.has(p); }
        else {
          ck.checked = draft.has(id);
          ck.indeterminate = !ck.checked && tree.find(t => t.id === id).subs.some(s => draft.has(s.id));
        }
      });
      const n = scoped([...draft]).length;
      $('#wod-scope-sum', panel).innerHTML = draft.size
        ? 'Обрано: <b>' + esc(scopeLabel([...draft])) + '</b> · ' + n + ' ' + plural(n, 'дієслово', 'дієслова', 'дієслів')
        : '<b>Усі дієслова</b> · ' + words().length;
    }
    $$('.wod-ck', panel).forEach(ck => ck.addEventListener('change', () => {
      const id = ck.dataset.id;
      if (ck.checked) {
        draft.add(id);
        if (!parentOf[id]) tree.find(t => t.id === id).subs.forEach(s => draft.delete(s.id));
      } else draft.delete(id);
      paint();
    }));
    $$('.wod-exp', panel).forEach(b => b.addEventListener('click', () => {
      const box = b.closest('.wod-cat').querySelector('.wod-subs'), open = box.hidden;
      box.hidden = !open; b.setAttribute('aria-expanded', open); b.classList.toggle('open', open);
    }));
    /* відкрити категорії, де вже є вибрані підкатегорії */
    tree.forEach(t => { if (t.subs.some(s => draft.has(s.id))) $('.wod-exp[data-exp="' + t.id + '"]', panel).click(); });
    $('#wod-scope-q', panel).addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      $$('.wod-cat', panel).forEach(el => {
        const t = tree.find(x => x.id === el.dataset.cat);
        const hit = x => x.c.label.toLowerCase().includes(q);
        const subHit = t.subs.filter(hit);
        el.hidden = !!q && !hit(t) && !subHit.length;
        $$('.wod-ck-sub', el).forEach((r, i) => { r.hidden = !!q && !hit(t) && !hit(t.subs[i]); });
        const box = $('.wod-subs', el), b = $('.wod-exp', el);
        if (box && q && subHit.length && box.hidden) b.click();
      });
    });
    $('#wod-scope-none', panel).addEventListener('click', () => { draft.clear(); paint(); });
    const close = () => { ui.draft = null; ui.view = 'train'; render(panel); };
    $('#wod-scope-cancel', panel).addEventListener('click', close);
    $('#wod-scope-go', panel).addEventListener('click', () => {
      db().scope = [...draft]; save();
      ui.force = false; ui.card = null;
      close();
    });
    paint();
  }

  function headHtml() {
    const q = queueInfo();
    return '<div class="wod-head"><div><h2 class="wod-title">🎯 Word on Demand</h2>' +
      '<div class="wod-sub">Say what you mean. Find the word you need.</div></div>' +
      '<div class="wod-head-side"><span class="tag cyan" title="Слова, яким уже час на повторення">🔁 ' + q.due + '</span>' +
      '<span class="tag pink" title="Нові слова">🆕 ' + q.fresh + '</span>' +
      '<button class="btn btn-ghost wod-stats-btn" id="wod-view" type="button">' + (ui.view === 'stats' ? '← До тренування' : '📊 Прогрес') + '</button></div></div>';
  }

  /* скорочення в реченні-еталоні — до форми, яку бачить перевірка: I'm → am, didn't → did, won't → will */
  const CONTR = { m: 'am', re: 'are', s: 'is', ve: 'have', ll: 'will', d: 'had' };
  function contracted(w) {
    if (!w.includes("'")) return w;
    if (w === "won't") return 'will';
    if (w === "can't") return 'can';
    if (/n't$/.test(w)) return w.slice(0, -3);
    const m = w.match(/'(m|re|s|ve|ll|d)$/);
    return m ? CONTR[m[1]] : w;
  }
  /* слова цільового виразу в реченні-еталоні → Set позицій слів; words — [{ text, at }] */
  const WORD_RX = /[\p{L}0-9][\p{L}0-9'’-]*/gu;
  function targetWords(W, s) {
    const words = [...String(s).matchAll(WORD_RX)].map(m => ({ text: m[0], at: m.index }));
    const hit = matchTarget(W, words.map(w => contracted(plain(w.text).replace(/['-]+$/, ''))));
    return { words, set: new Set(hit && !hit.partial ? hit.span : []) };
  }
  /* замінює слова цільового виразу через fn(слово), решту тексту екранує */
  function mapTarget(W, s, fn) {
    const { words, set } = targetWords(W, s);
    let out = '', last = 0;
    words.forEach((w, i) => {
      if (!set.has(i)) return;
      out += esc(s.slice(last, w.at)) + fn(w.text);
      last = w.at + w.text.length;
    });
    return out + esc(s.slice(last));
  }
  /* цільове слово у варіантах — підсвічене */
  function markTarget(W, s) {
    return mapTarget(W, s, m => '<mark class="wod-mark">' + esc(m) + '</mark>');
  }
  function wordChip(W) {
    const P = window.FLLexis && window.FLLexis.POS.verbs;
    const lx = P && (P.words.find(v => v._id === W.id && v.en === W.w) || P.words.find(v => v.en === W.w));
    return '<div class="wod-word"><span class="wod-word-en" lang="en">' + esc(W.w) + '</span>' +
      (lx && lx.ipa ? '<span class="wod-ipa">' + esc(lx.ipa) + '</span>' : '') +
      '<span class="wb lvl-' + W.lvl + '">' + W.lvl + '</span>' +
      '<span class="wod-word-uk">— ' + esc(W.uk) + '</span>' +
      '<button class="speak-btn wod-say" type="button" data-say="' + esc(W.w) + '" aria-label="Озвучити">🔊</button></div>';
  }
  function refsHtml(W, T, skip) {
    return '<ol class="wod-refs">' + [0, 1, 2].filter(i => i !== skip).map(i =>
      '<li><span lang="en">' + markTarget(W, T.ans[i]) + '</span>' +
      '<button class="speak-btn wod-say" type="button" data-say="' + esc(T.ans[i].replace(/’/g, "'")) + '" aria-label="Озвучити">🔊</button></li>'
    ).join('') + '</ol>';
  }

  /* підказки 1–2: усі три варіанти-відповіді з пропуском на місці цільового слова;
     на підказці 2 у кожен пропуск вписано першу літеру (кількість рисочок = кількість літер) */
  function gapHtml(W, sentence, withLetter) {
    return mapTarget(W, sentence, m =>
      '<span class="wod-gap">' + (withLetter ? esc(m[0]) + ' ' + '_ '.repeat(m.length - 1).trim() : '_ _ _ _ _') + '</span>');
  }

  function hintsHtml(W, T, card) {
    if (!card.hint) return '';
    let h = '<div class="wod-hint"><span class="wod-hint-k">' + (card.hint >= 2 ? '🔤 Підказки 1–2 · одне слово в трьох реченнях + перша літера' : '💡 Підказка 1 · одне й те саме слово пропущене в трьох реченнях') + '</span>' +
      '<ol class="wod-refs wod-cue" lang="en">' + T.ans.map(a => '<li>' + gapHtml(W, a, card.hint >= 2) + '</li>').join('') + '</ol>';
    h += '</div>';
    if (card.hint >= 3 && !card.solved)
      h += '<div class="wod-hint wod-hint-full"><span class="wod-hint-k">👀 Підказка 3 · так це можна сказати</span>' + wordChip(W) + refsHtml(W, T) +
        '<div class="wod-hint-note">Обери будь-який варіант або скажи по-своєму — і напиши його в полі нижче, щоб закріпити.</div></div>';
    return h;
  }

  function fbHtml(W, T, card) {
    const r = card.fb;
    if (!r) return '';
    if (r.verdict === 'partial') return '<div class="quiz-fb skip">🧩 Дієслово «' + esc(r.form) + '» на місці, але тут потрібен цілий вираз — у ньому бракує ще слова. Спробуй доповнити або візьми підказку 💡</div>';
    if (r.verdict === 'typo') return '<div class="quiz-fb skip">✏️ Схоже на одруківку в ключовому слові: «' + esc(r.typo) + '». Перевір написання і спробуй ще раз.</div>';
    if (r.verdict === 'notarget') return '<div class="quiz-fb skip">' + (r.near
      ? '🙂 «' + esc(r.near) + '» за змістом підходить, але тут ми тренуємо інше слово. Спробуй сказати це з ним — або візьми підказку.'
      : '🔍 У реченні немає слова, яке ми тренуємо. Спробуй сформулювати інакше — або візьми підказку 💡') + '</div>';
    if (r.verdict === 'unsure' && !card.solved) return '<div class="quiz-fb skip">✓ Ключове слово на місці. 🤔 Але я не впевнений, що передано всю думку: бракує «' + r.missing.map(esc).join('», «') + '».' +
      '<div class="wod-self"><button class="btn btn-good" id="wod-accept" type="button">✓ Мій варіант передає цю думку</button>' +
      '<button class="btn btn-ghost" id="wod-edit" type="button">✎ Виправлю</button></div></div>';

    /* зараховано */
    const clean = !r.grammar.length && !r.missing.length;
    const near = r.closest.sim >= 0.85;
    let h = '<div class="quiz-fb ' + (clean ? 'ok' : 'skip') + '">' +
      (card.grade === 'recall' ? '🎯 <b>Excellent!</b> Слово дістав сам, без підказок.' : '✓ <b>Good!</b> ' + (GRADE_LABEL[card.grade] ? 'Слово використано — ' + GRADE_LABEL[card.grade] + '.' : '')) +
      (r.grammar.length ? '<div class="wod-fix"><b>✏️ Варто виправити:</b><ul>' + r.grammar.map(g => '<li>' + esc(g) + '</li>').join('') + '</ul></div>' : '') +
      (r.missing.length ? '<div class="wod-fix">🤔 Можливо, бракує частини думки: «' + r.missing.map(esc).join('», «') + '».</div>' : '') +
      (near ? '<div class="wod-fix">👌 Майже так само сказав би носій.</div>'
        : '<div class="wod-fix">💬 ' + (clean ? 'Носій міг би сказати і так' : 'More natural') + ': <b lang="en">' + markTarget(W, T.ans[r.closest.i]) + '</b></div>') +
      '</div>';
    h += '<div class="wod-after">' + wordChip(W) +
      '<div class="wod-after-k">💬 Ще способи сказати це — усі з цим словом:</div>' + refsHtml(W, T, near ? null : r.closest.i) +
      '<div class="wod-hint-note">Твій варіант не мусить збігатися з цими — це приклади природних формулювань.</div></div>';
    return h;
  }

  function drawCard(panel) {
    const card = ui.card;
    if (!card) return drawDone(panel);
    const W = wordById(card.w), T = taskById(W, card.task);
    const mic = SR() ? '<button class="btn btn-ghost wod-mic" id="wod-mic" type="button" title="Сказати вголос" aria-label="Голосовий ввід">🎤</button>' : '';
    const hintLbl = card.hint === 0 ? '💡 Підказка' : card.hint === 1 ? '🔤 Перша літера' : '👀 Показати варіанти';
    panel.innerHTML = headHtml() + scopeBarHtml() +
      '<div class="quiz-box wod-card">' +
      '<span class="q-mode">🇺🇦 What do you want to say?</span>' +
      '<div class="wod-sit">' + esc(T.sit) + '</div>' +
      '<div class="wod-say-uk">' + esc(T.say) + '</div>' +
      '<div class="wod-hints">' + hintsHtml(W, T, card) + '</div>' +
      '<div class="wod-input-row"><textarea class="text-input wod-input" id="wod-input" rows="2" lang="en" placeholder="Type your answer…" autocomplete="off" autocapitalize="sentences" spellcheck="false" aria-label="Твоя відповідь англійською">' + esc(card.val) + '</textarea>' + mic + '</div>' +
      '<div id="wod-fb" role="status" aria-live="polite">' + fbHtml(W, T, card) + '</div>' +
      '<div class="quiz-actions">' +
      '<button class="btn btn-good" id="wod-check" type="button">' + (card.solved ? '✓ Перевірити ще раз' : '✓ Перевірити') + '</button>' +
      (!card.solved && card.hint < 3 ? '<button class="btn btn-ghost" id="wod-hint" type="button">' + hintLbl + '</button>' : '') +
      (!card.solved && card.hint < 3 ? '<button class="btn btn-ghost" id="wod-giveup" type="button">🤷 Не можу згадати</button>' : '') +
      (card.solved || card.hint >= 3 || card.wrong ? '<button class="btn btn-primary" id="wod-next" type="button">Далі →</button>' : '') +
      '</div>' +
      (!card.solved && card.hint < 3 && !card.wrong ? '<button class="wod-skip" id="wod-skip" type="button">Пропустити ⏭</button>' : '') +
      '</div>';
    bindCard(panel, W, T);
  }

  function drawDone(panel) {
    const q = queueInfo();
    panel.innerHTML = headHtml() + scopeBarHtml() +
      '<div class="quiz-box wod-card wod-done"><div class="wod-done-emoji">🎉</div>' +
      '<h3>' + (scopeIds().length ? 'У вибраних категоріях усе повторено' : 'На зараз усе повторено') + '</h3>' +
      '<p>' + (q.next ? 'Наступне повторення ' + whenText(q.next) + '.' : 'Нових слів тут більше немає.') + ' Повторювати раніше теж можна — інтервали підлаштуються.' +
      (scopeIds().length ? ' Або вибери інші категорії.' : '') + '</p>' +
      '<button class="btn btn-primary" id="wod-more" type="button">Потренуватися ще →</button></div>';
    bindHead(panel);
    $('#wod-more', panel).addEventListener('click', () => { ui.force = true; newCard(); drawCard(panel); });
  }

  function bindHead(panel) {
    $('#wod-view', panel).addEventListener('click', () => { ui.view = ui.view === 'stats' ? 'train' : 'stats'; ui.draft = null; render(panel); });
    const sc = $('#wod-scope-open', panel);
    if (sc) sc.addEventListener('click', () => { ui.view = 'scope'; ui.draft = null; render(panel); });
    $$('.wod-say', panel).forEach(b => b.addEventListener('click', () => speak(b.dataset.say, b)));
  }

  function bindCard(panel, W, T) {
    const card = ui.card, inp = $('#wod-input', panel);
    bindHead(panel);
    const redraw = () => { drawCard(panel); const i = $('#wod-input', panel); if (i && !card.solved) i.focus(); };

    function solve(r) {
      card.solved = true; card.unsure = false; card.fb = r;
      const g = commit(card);
      addXp(XP[g] || 0); touchStreak();
    }
    function check() {
      card.val = inp.value;
      const text = inp.value.trim();
      if (!text) { showToast('✍️ Спершу напиши відповідь англійською'); inp.focus(); return; }
      const r = judge(W, T, text);
      if (r.verdict === 'short') { showToast('✍️ Спробуй сказати цілим реченням'); inp.focus(); return; }
      if (card.solved) { card.fb = r.verdict === 'ok' || r.verdict === 'unsure' ? Object.assign(r, { verdict: 'ok' }) : r; drawCard(panel); return; }
      if (r.verdict === 'ok') { logAttempt(card, 'correct'); solve(r); }
      else {
        logAttempt(card, r.verdict === 'notarget' ? 'incorrect' : r.verdict);
        if (r.verdict === 'notarget') card.wrong++;
        card.fb = r;
      }
      redraw();
    }
    function next() {
      if (!card.solved) {
        if (!card.attempts && !card.hint) logAttempt(card, 'skipped');
        commit(card);
      }
      newCard(card.w);
      redraw();
    }

    inp.addEventListener('input', () => { card.val = inp.value; });
    inp.addEventListener('keydown', e => {
      if (e.key !== 'Enter' || e.shiftKey) return;
      e.preventDefault();
      if (card.solved && inp.value === (card.checked || '')) next(); else { card.checked = inp.value; check(); }
    });
    $('#wod-check', panel).addEventListener('click', () => { card.checked = inp.value; check(); });
    const hintBtn = $('#wod-hint', panel);
    if (hintBtn) hintBtn.addEventListener('click', () => { card.val = inp.value; card.hint = Math.min(3, card.hint + 1); if (card.fb && card.fb.verdict !== 'ok') card.fb = null; redraw(); });
    const give = $('#wod-giveup', panel);
    if (give) give.addEventListener('click', () => { card.val = inp.value; card.hint = 3; card.fb = null; redraw(); });
    const nx = $('#wod-next', panel);
    if (nx) nx.addEventListener('click', next);
    const sk = $('#wod-skip', panel);
    if (sk) sk.addEventListener('click', next);
    const acc = $('#wod-accept', panel);
    if (acc) acc.addEventListener('click', () => { logAttempt(card, 'correct'); solve(Object.assign({}, card.fb, { verdict: 'ok', grammar: card.fb.grammar || [] })); redraw(); });
    const ed = $('#wod-edit', panel);
    if (ed) ed.addEventListener('click', () => { card.fb = null; redraw(); });
    const mic = $('#wod-mic', panel);
    if (mic) mic.addEventListener('click', () => listen(mic, inp));
    if (card.solved) { const n2 = $('#wod-next', panel); if (n2 && document.activeElement !== inp) n2.focus(); }
  }

  /* голосовий ввід — лише якщо браузер уміє розпізнавати мовлення */
  let rec = null;
  function listen(btn, inp) {
    const Rec = SR();
    if (!Rec) return;
    if (rec) { try { rec.stop(); } catch (e) { } return; }
    rec = new Rec();
    rec.lang = 'en-US'; rec.interimResults = false; rec.maxAlternatives = 1;
    btn.classList.add('wod-rec');
    rec.onresult = e => {
      const said = e.results[0][0].transcript;
      inp.value = (inp.value.trim() ? inp.value.trim() + ' ' : '') + said;
      if (ui.card) ui.card.val = inp.value;
    };
    rec.onerror = e => { if (e.error === 'not-allowed') showToast('🎤 Немає доступу до мікрофона'); };
    rec.onend = () => { btn.classList.remove('wod-rec'); rec = null; inp.focus(); };
    try { rec.start(); } catch (e) { rec = null; btn.classList.remove('wod-rec'); }
  }

  /* ============================ ПРОГРЕС ============================ */
  function drawStats(panel) {
    const s = summary();
    const tile = (v, label) => '<div class="card wod-tile"><div class="wod-tile-v">' + v + '</div><div class="wod-tile-l">' + label + '</div></div>';
    const chips = (list, empty) => list.length ? list.map(x => '<span class="tag">' + esc(x.W.w) + '</span>').join(' ') : '<span class="wod-muted">' + empty + '</span>';
    panel.innerHTML = '<div class="wod-wide">' + headHtml() +
      '<h3 class="section-title">📊 Word on Demand Progress</h3>' +
      (!s.practised ? '<div class="empty-note">Ще немає жодної спроби — поверніться до тренування 🙂</div>' :
        '<div class="wod-tiles">' +
        tile(s.recalled + ' / ' + words().length, 'слів успішно пригадано') +
        tile(s.noHints, 'пригадано без підказок') +
        tile(s.withHints, 'пригадано з підказками') +
        tile(s.avgTime != null ? s.avgTime.toFixed(1) + ' с' : '—', 'середній час відповіді') +
        '</div>' +
        '<div class="wod-lists">' +
        '<div class="card wod-list"><b>🧗 Найскладніші</b><div>' + chips(s.hardest, 'поки немає') + '</div></div>' +
        '<div class="card wod-list"><b>💡 Часто потребують підказок</b><div>' + chips(s.needHints, 'поки немає') + '</div></div>' +
        '<div class="card wod-list"><b>🌍 Використано в кількох ситуаціях</b><div>' + chips(s.multi, 'поки немає') + '</div></div>' +
        '</div>' +
        '<h3 class="section-title">🧠 Independent Recall <small>частка останніх спроб, коли слово згадано без жодної підказки</small></h3>' +
        '<div class="wod-recall">' + s.all.sort((a, b) => b.indep - a.indep).map(x =>
          '<div class="card wod-recall-row"><div class="wod-recall-top"><b lang="en">' + esc(x.W.w) + '</b>' +
          '<span class="wod-recall-pct">' + Math.round(x.indep * 100) + '%</span></div>' +
          progressBar(x.indep, 'tiny') +
          '<div class="wod-recall-note">' + indepNote(x) + '</div>' +
          '<div class="wod-recall-meta">' + x.n + ' ' + plural(x.n, 'спроба', 'спроби', 'спроб') + ' · ' + x.contexts + ' з ' + x.W.tasks.length + ' ситуацій · ' +
          (x.st.due > Date.now() ? 'повтор ' + whenText(x.st.due) : 'пора повторити') + '</div></div>'
        ).join('') + '</div>') +
      '<div class="wod-legend">Незнайомі слова в цьому списку не показуються, доки ти їх не зустрінеш у тренуванні — щоб не підглядати 😉</div></div>';
    bindHead(panel);
  }

  window.FLWod = { render, judge, tokens, targetWords, prepWord, SCHED, gradeOf, summary, wordStats, words, pickTask, ui };
})();
