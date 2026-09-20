/* EngLift — збирає індекс глобального пошуку з усіх даних застосунку.
   Запуск:  node tools/build-search-index.js
   Результат: english-app/js/search/index-data.js (вантажиться ліниво, при першому пошуку).

   Формат запису: [term, uk, kind, hash, extra, adult?]
     kind: 0 слово · 1 фраза · 2 вимова · 3 тема граматики · 4 книга · 5 розділ
   Коротко навмисне: індекс тримає тисячі рядків, і кожен зайвий байт помітний. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const APP = path.join(ROOT, 'english-app');
const read = f => fs.readFileSync(path.join(APP, f), 'utf8');
const evalFile = (files, ret) => (new Function('var window = {};\n' + files.map(read).join(';\n') + ';\nreturn ' + ret))();

const K = { WORD: 0, PHRASE: 1, PRON: 2, GRAMMAR: 3, BOOK: 4, SECTION: 5 };
const items = [];
const add = (term, uk, kind, hash, extra, adult) => {
  if (!term || !hash) return;
  const row = [String(term).replace(/<[^>]+>/g, '').trim(), String(uk || '').replace(/<[^>]+>/g, '').trim(), kind, hash, extra || ''];
  if (adult) row.push(1);
  items.push(row);
};

/* ---------------- 1. СЛОВНИК ---------------- */
const POS = {
  verbs: { files: ['js/lexis/verbs-data.js', 'js/lexis/verbs-phrasal-data.js', 'js/lexis/verbs-merge.js'], v: 'LEX_VERBS', cats: 'LEX_VERB_CATS', subs: 'LEX_VERB_SUBS', uk: 'Дієслова' },
  nouns: { files: ['js/lexis/nouns-data.js'], v: 'LEX_NOUNS', cats: 'LEX_NOUN_CATS', subs: 'LEX_NOUN_SUBS', uk: 'Іменники' },
  adjs: { files: ['js/lexis/adjs-data.js', 'js/lexis/adjs-prep-data.js'], v: 'LEX_ADJS', cats: 'LEX_ADJ_CATS', subs: 'LEX_ADJ_SUBS', uk: 'Прикметники' },
  advs: { files: ['js/lexis/advs-data.js'], v: 'LEX_ADVS', cats: 'LEX_ADV_CATS', subs: 'LEX_ADV_SUBS', uk: 'Прислівники' }
};
let wordCount = 0;
Object.entries(POS).forEach(([id, p]) => {
  const { words, cats, subs } = evalFile(p.files, '{ words: ' + p.v + ', cats: ' + p.cats + ', subs: ' + p.subs + ' }');
  /* 18+ = позначка на слові або належність до 18+ категорії (як у lexis.js) */
  const adultCats = new Set(Object.entries(Object.assign({}, cats, subs)).filter(([, c]) => c && c.adult).map(([k2]) => k2));
  words.forEach(w => {
    const isAdult = !!w.adult || [].concat(w.cats || [], w.cat || [], w.sub || []).some(c => adultCats.has(c));
    add(w.en, w.uk, K.WORD, '#/vocab/' + id, p.uk + (w.lvl ? ' · ' + w.lvl : ''), isAdult);
    wordCount++;
  });
});

/* ---------------- 2. ФРАЗИ І КОНСТРУКЦІЇ ---------------- */
const phrasesSrc = read('js/phrases.js');
const TRAINERS = [];
const reTrainer = /(\w+): \{ emoji: '([^']+)', short: '([^']+)', uk: '([^']+)', kind: '(\w+)', src: (\[[^\]]+\]|'[^']+')/g;
let m;
while ((m = reTrainer.exec(phrasesSrc))) {
  const files = m[6].startsWith('[') ? m[6].replace(/[[\]']/g, '').split(',').map(s => s.trim()) : [m[6].replace(/'/g, '')];
  TRAINERS.push({ key: m[1], emoji: m[2], short: m[3], uk: m[4], kind: m[5], files });
}
if (TRAINERS.length < 17) throw new Error('не вдалося прочитати список тренажерів із phrases.js: ' + TRAINERS.length);

let phraseCount = 0;
TRAINERS.forEach(t => {
  const tab = t.kind === 'words' ? 'browse' : 'browser';
  add(t.short, t.uk, K.SECTION, '#/phrases/' + t.key, 'Тренажер фраз ' + t.emoji);
  const D = (new Function('var window={PHRASE_DATA:{}};' + t.files.map(read).join(';\n') + ';return window.PHRASE_DATA["' + t.key + '"]'))();
  (D.MARKERS || D.WORDS || []).forEach(x => {
    /* підпис українською: так тренажер знаходиться й за назвою розділу («ідіоми», «вимова») */
    add(x.name || x.en, x.uk, K.PHRASE, '#/phrases/' + t.key + '/' + tab, t.uk);
    phraseCount++;
  });
  /* назви категорій усередині тренажера — щоб «переговори» чи «компліменти» теж щось знаходили */
  Object.values(D.CATS || {}).forEach(c => add(c.label, c.desc || '', K.SECTION, '#/phrases/' + t.key + '/' + tab, t.uk + ' · категорія ' + (c.emoji || '')));
  /* ситуації розмовника — окремі сторінки всередині тренажера */
  if (t.key === 'situational') (D.SITUATIONS || []).forEach(s => add(s.label, s.desc, K.SECTION, '#/phrases/situational/phrasebook', 'Розмовник ' + s.emoji));
});

/* ---------------- 3. ВИМОВА ---------------- */
const PRON = evalFile(['js/sound/pron-data.js'], 'window.PRON_DATA');
let pronCount = 0;
PRON.TOPICS.forEach(t => {
  add(t.title, t.uk, K.SECTION, '#/sound/' + t.id, 'Вимова ' + t.emoji);
  t.items.forEach(i => {
    const term = i.en || (i.a && i.a.w) || '';
    const uk = i.uk || (i.a && i.a.uk) || '';
    const extra = t.title + (i.spoken ? ' · ' + i.spoken : '');
    add(term, uk, K.PRON, '#/sound/' + t.id + '/list', extra);
    pronCount++;
  });
});

/* ---------------- 4. ГРАМАТИКА ---------------- */
const COURSE = evalFile(['js/data.js', 'js/grammar-extra.js'], 'COURSE');
let topicCount = 0;
COURSE.grammar.subs.forEach(sub => {
  add(sub.title, sub.desc || '', K.SECTION, '#/grammar/' + sub.id, 'Категорія граматики');
  sub.topics.forEach(t => {
    add(t.title, t.subtitle || t.desc || '', K.GRAMMAR, '#/grammar/' + sub.id + '/' + t.id, sub.title + (t.level ? ' · ' + t.level : ''));
    topicCount++;
  });
});
(COURSE.listen ? COURSE.listen.subs || [] : []).forEach(s => add(s.title, s.desc || '', K.SECTION, '#/listen/' + s.id, 'Аудіювання 🎧'));

/* ---------------- 5. КНИГИ ---------------- */
const READER = evalFile(['js/reader/books-data.js'], 'window.READER_DATA');
READER.BOOKS.forEach(b => add(b.title, b.title_uk, K.BOOK, '#/read/' + b.id, (b.author || '') + (b.level ? ' · ' + b.level : '')));

/* ---------------- 6. РОЗДІЛИ ЗАСТОСУНКУ ---------------- */
[
  ['Dashboard', 'Дашборд', '#/', 'Головна 🏠'],
  ['Grammar', 'Граматика', '#/grammar', 'Розділ 📗'],
  ['Vocabulary', 'Словник', '#/vocab', 'Розділ 🗂️'],
  ['Verbs', 'Дієслова', '#/vocab/verbs', 'Словник 💪'],
  ['Nouns', 'Іменники', '#/vocab/nouns', 'Словник 📦'],
  ['Adjectives', 'Прикметники', '#/vocab/adjs', 'Словник 🎨'],
  ['Adverbs', 'Прислівники', '#/vocab/advs', 'Словник 🏃'],
  ['Phrases', 'Фрази і конструкції', '#/phrases', 'Розділ 🗣️'],
  ['Pronunciation', 'Вимова', '#/sound', 'Розділ 🗣️'],
  ['Reading', 'Читання', '#/read', 'Розділ 📚'],
  ['Diary', 'Щоденник англійською', '#/diary', 'Розділ 📝'],
  ['Listening', 'Аудіювання', '#/listen', 'Розділ 🎧'],
  ['Challenge', 'Виклик', '#/challenge', 'Розділ ⚡'],
  ['Placement test', 'Тест рівня', '#/placement', 'Розділ 🎯']
].forEach(([en, uk, hash, extra]) => add(en, uk, K.SECTION, hash, extra));

/* ---------------- запис ---------------- */
/* Маршрути й підписи повторюються тисячі разів, тож тримаємо їх у словнику,
   а в рядку лишаємо тільки номер — файл виходить майже вдвічі менший. */
const pool = [];
const poolIdx = new Map();
const intern = v => {
  if (poolIdx.has(v)) return poolIdx.get(v);
  poolIdx.set(v, pool.length);
  pool.push(v);
  return pool.length - 1;
};
const rows = items.map(r => {
  const row = [r[0], r[1], r[2], intern(r[3]), intern(r[4])];
  if (r[5]) row.push(1);
  return row;
});
const out = 'window.SEARCH_INDEX = ' + JSON.stringify({ v: 1, pool: pool, items: rows }) + ';\n';
const dir = path.join(APP, 'js/search');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'index-data.js'), out, 'utf8');

const adult = items.filter(r => r[5]).length;
console.log('слова: ' + wordCount + ' (18+: ' + adult + ')');
console.log('фрази: ' + phraseCount + ' · вимова: ' + pronCount + ' · теми граматики: ' + topicCount + ' · книги: ' + READER.BOOKS.length);
console.log('усього записів: ' + items.length + ' · розмір: ' + (out.length / 1024).toFixed(0) + ' KB');
