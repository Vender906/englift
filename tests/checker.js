const fs = require('fs'), vm = require('vm'), path = require('path');
const { APP } = require('./_boot');
const rel = f => path.join(APP, f);
const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(rel('js/diary/checker.js'), 'utf8'), ctx);
const C = ctx.window.FLChecker;
const bad = [
  ['I am agree with you.', 'am-agree'], ['She don’t like coffee.', 'he-dont'], ['He have a big dog.', 'he-have'], ['My friend said she like jazz but she go to bed early.', 'he-have'],
  ['She doesn’t likes it.', 'does-verb-s'], ['Did you went there?', 'does-verb-s'], ['Where did they went?', 'does-verb-s'], ['I can to swim.', 'modal-to'], ['You should of told me.', 'should-of'],
  ['When I will come home, I will call you.', 'when-will'], ['If it will rain, we stay home.', 'if-will'], ['I have seen him yesterday.', 'perfect-past-time'],
  ['I have lived here since three years.', 'since-duration'], ['I am born in 1995.', 'am-born'], ['This is more better.', 'more-er'], ['It is more easy.', 'more-short'],
  ['It was the most big city.', 'most-short'], ['It is very better now.', 'very-er'], ['She is taller then me.', 'er-then'], ['She is married with a doctor.', 'married-with'],
  ['It depends from the weather.', 'depend-from'], ['I am interested about art.', 'interested-about'], ['I am afraid from spiders.', 'afraid-from'], ['Don’t be angry on me.', 'angry-on'],
  ['He is good in math.', 'good-in'], ['We arrived to Kyiv.', 'arrive-to'], ['Let’s discuss about it.', 'discuss-about'], ['I listen music every day.', 'listen-no-to'],
  ['Can you explain me this rule?', 'explain-me'], ['He said me the truth.', 'say-me'], ['See you in Monday.', 'in-day'], ['My birthday is on May.', 'on-month'],
  ['I run at the morning.', 'at-morning'], ['I work in night.', 'in-night'], ['Despite of the rain, we went out.', 'despite-of'], ['I want that you help me.', 'want-that'],
  ['I enjoy to read books.', 'enjoy-to'], ['I look forward to see you.', 'look-forward'], ['She made me to laugh.', 'make-to'], ['He suggested me to go.', 'suggest-me-to'],
  ['Can you give me an advice?', 'a-uncount'], ['Thanks for the informations.', 'plural-uncount'], ['There are much people here.', 'much-count'], ['I ate a apple.', 'a-vowel'],
  ['She studies at an university.', 'an-consonant'], ['People is nice here.', 'people-is'], ['There is many problems.', 'there-is-plural'], ['I don’t know nothing.', 'double-neg'],
  ['Yesterday i went home.', 'lowercase-i'], ['I go there every days.', 'every-days'], ['I make my homework.', 'make-homework'], ['I did a mistake.', 'do-mistake'],
  ['Although it was late, but we stayed.', 'although-but'], ['I stayed home because of I was ill.', 'because-of-clause'], ['How is it called in English?', 'how-called'],
  ['They are live in Lviv.', 'be-base-verb']
];
const good = [
  'I don’t know when he will come.', 'I wonder if it will rain tomorrow.', 'I have lived here since last year.', 'I have worked here for two years.',
  'There are more good ideas in this book.', 'Most good teachers are patient.', 'I read more books then went to bed.', 'She says her name is Anna.',
  'He explained her idea to the team.', 'I woke up in the night.', 'It happened on the morning of my birthday.', 'Keep to the left.', 'We started a research project.',
  'Does she like pizza?', 'Can he swim?', 'Let it go.', 'It will make sense later.', 'I am like my mother.', 'I think she likes it.', 'Did you go there?',
  'i.e. the best option', 'He is good at math.', 'Although it was late, we stayed.', 'I stayed home because I was ill.', 'What is it called?',
  'He is the most interesting person.', 'I get up early in the morning.', 'I have never seen it.', 'I saw him yesterday.', 'This one is better than that one.',
  'I made a mistake.', 'I do my homework.', 'There are many problems.', 'I don’t know anything.', 'Nobody knows.', 'She is a doctor.', 'an hour ago', 'a university',
  'I enjoy reading.', 'I’m looking forward to seeing you.', 'I’m looking forward to the weekend.', 'She made me laugh.', 'He suggested going out.', 'Can you give me some advice?',
  'When will you come?', 'I heard it say hello.', 'He made up his mind to leave.', 'There was no more cold.', 'Is it worse then?', 'He might have gained it last night.', 'I have been thinking about last night.', 'We just don’t say them out loud.', 'a boy in Sunday clothes', 'on the morning after the party', 'with all his might of wonder', 'dot another i', 'If you will excuse me, I have to go.', 'He told me the truth.', 'We arrived in Kyiv.', 'Let’s discuss it.', 'I listen to music.', 'He has been there.'
];
let fail = 0;
for (const [s, id] of bad) { const r = C.check(s); if (!r.some(x => x.id === id)) { fail++; console.log('MISS', id, '|', s, '| got', r.map(x => x.id).join(',')); } }
for (const s of good) { const r = C.check(s); if (r.length) { fail++; console.log('FALSE+', s, '|', r.map(x => x.id + ':' + x.text).join(', ')); } }
console.log('bad caught', bad.length - bad.filter(([s, id]) => !C.check(s).some(x => x.id === id)).length, '/', bad.length, '· good clean', good.filter(s => !C.check(s).length).length, '/', good.length);
// book corpus
const rd = { window: {} }; vm.runInNewContext(fs.readFileSync(rel('js/reader/books-data.js'), 'utf8'), rd);
const counts = {}, samples = {}; let n = 0;
rd.window.READER_DATA.BOOKS.forEach(b => b.sentences.forEach(x => { if (!x.en) return; n++; C.check(x.en).forEach(h => { counts[h.id] = (counts[h.id] || 0) + 1; (samples[h.id] = samples[h.id] || []).length < 4 && samples[h.id].push(h.text + '  «' + x.en.slice(0, 90) + '»'); }); }));
console.log('\nbook sentences', n, 'hits by rule:');
Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => { console.log(String(v).padStart(5), k); samples[k].forEach(s => console.log('        ', s)); });
const totalHits = Object.values(counts).reduce((a, b) => a + b, 0);
if (totalHits > 20) { fail++; console.log('✗ too many hits on book corpus: ' + totalHits); }
/* правила посилаються на існуючі теми */
const d = {}; vm.runInNewContext(fs.readFileSync(rel('js/data.js'), 'utf8') + ';this.C=COURSE;', d);
C.RULES.forEach(r => { const sub = d.C.grammar.subs.find(x => x.id === r.topic[0]); if (!sub || !sub.topics.some(t => t.id === r.topic[1])) { fail++; console.log('✗ broken topic link', r.id); } });
console.log(fail ? 'CHECKER FAILURES: ' + fail : 'CHECKER OK ✓');
process.exit(fail ? 1 : 0);
