/* ============================================================
   EngLift — навчальний контент
   ============================================================ */

const COURSE = {

  /* ========================= ГРАМАТИКА ========================= */
  grammar: {
    title: 'Граматика',
    /* підгрупи для меню та сторінки граматики; категорія, не вказана тут, потрапить в «Інше» */
    groups: [
      { id: 'g-tenses', emoji: '⏳', title: 'Часи', subs: ['tenses', 'time-clauses', 'used-to', 'stative'] },
      { id: 'g-modals', emoji: '💪', title: 'Модальні та умовні', subs: ['modals', 'conditionals', 'preferences'] },
      { id: 'g-verbs', emoji: '🔄', title: 'Дієслівні конструкції', subs: ['passive', 'causative', 'gerund-infinitive'] },
      { id: 'g-sentences', emoji: '❓', title: 'Речення і питання', subs: ['questions', 'tags', 'short-responses', 'relative', 'reported', 'starters', 'word-order'] },
      { id: 'g-words', emoji: '🧩', title: 'Частини мови', subs: ['articles', 'pronouns', 'indefinite', 'quantifiers', 'prepositions', 'adj-prep', 'comparison', 'intensifiers'] },
      { id: 'g-style', emoji: '🔗', title: 'Зв’язки і стиль', subs: ['linkers', 'advanced'] }
    ],
    subs: [
      /* ---------- ЧАСИ ---------- */
      {
        id: 'tenses', title: 'Часи дієслова', emoji: '⏳',
        desc: 'Усі 12 часів англійської — від базових рутинних дій до планів на майбутнє.',
        cheat: {
          title: 'усі 12 часів — те саме речення крізь час',
          head: ['Час', 'Формула', 'Приклад', 'Маркери'],
          rows: [
            [{ t: 'Present Simple', topic: 'present-simple' }, 'V / V-s', 'I drink coffee every morning.', 'always · every day'],
            [{ t: 'Present Continuous', topic: 'present-continuous' }, 'am/is/are + V-ing', 'I am drinking coffee now.', 'now · at the moment'],
            [{ t: 'Present Perfect', topic: 'present-perfect' }, 'have/has + V3', 'I have just drunk my coffee.', 'already · just · ever'],
            [{ t: 'Present Perfect Continuous', topic: 'present-perfect-continuous' }, 'have/has been + V-ing', 'I have been drinking coffee all morning.', 'for · since · all day'],
            [{ t: 'Past Simple', topic: 'past-simple' }, 'V2 / did', 'I drank coffee yesterday.', 'yesterday · ago'],
            [{ t: 'Past Continuous', topic: 'past-continuous' }, 'was/were + V-ing', 'I was drinking coffee at 8 am.', 'at 8 am · while'],
            [{ t: 'Past Perfect', topic: 'past-perfect' }, 'had + V3', 'I had drunk my coffee before he came.', 'before · by the time'],
            [{ t: 'Past Perfect Continuous', topic: 'past-perfect-continuous' }, 'had been + V-ing', 'I had been drinking coffee for an hour when he came.', 'for + до моменту в минулому'],
            [{ t: 'Future Simple', topic: 'future-will-going-to' }, 'will + V', 'I will drink coffee tomorrow.', 'tomorrow · I think'],
            [{ t: 'Future Continuous', topic: 'future-continuous' }, 'will be + V-ing', 'I will be drinking coffee at 9 tomorrow.', 'this time tomorrow'],
            [{ t: 'Future Perfect', topic: 'future-perfect' }, 'will have + V3', 'I will have drunk my coffee by 9.', 'by Friday · by the time'],
            [{ t: 'Future Perfect Continuous', topic: 'future-perfect-continuous' }, 'will have been + V-ing', 'By June I will have been drinking this tea for a year.', 'by + for']
          ]
        },
        topics: [
          {
            id: 'present-simple', title: 'Present Simple', emoji: '☕', level: 'A1', minutes: 7,
            theory: {
              intro: 'Present Simple описує регулярні дії, звички та загальні факти — те, що відбувається завжди, часто або ніколи.',
              rules: [
                { t: 'Ствердження', d: 'I / You / We / They + дієслово; He / She / It + дієслово + <b>-s</b>.', ex: [['I drink tea every morning.', 'Я п’ю чай щоранку.'], ['She works in a hospital.', 'Вона працює в лікарні.']] },
                { t: 'Питання і заперечення', d: 'Утворюються за допомогою <b>do / does</b> + інфінітив.', ex: [['Do you like jazz?', 'Ти любиш джаз?'], ['He doesn’t like coffee.', 'Він не любить каву.']] },
                { t: 'Слова-маркери', d: '<b>always, usually, often, sometimes, never, every day</b> — підказують, що час саме цей.', ex: [['I usually get up at 7.', 'Зазвичай я встаю о 7-й.']] }
              ],
              tip: 'Не забувай закінчення -s у третій особі однини (he / she / it) — це найпоширеніша помилка!'
            },
            exercises: [
              { type: 'choice', q: 'She ___ coffee every morning.', options: ['drink', 'drinks', 'is drinking', 'drinking'], answer: 1, explain: 'Третя особа однини (she) у Present Simple отримує закінчення -s.' },
              { type: 'choice', q: 'Оберіть правильне питання:', options: ['Where do you live?', 'Where you live?', 'Where does you live?', 'Where are you live?'], answer: 0, explain: 'Питання у Present Simple будується з do/does на початку.' },
              { type: 'fill', q: 'I ___ pizza very much.', hint: 'to like', answers: ['like'], explain: 'Перша особа однини — дієслово без змін.' },
              { type: 'fill', q: 'My brother ___ in a bank.', hint: 'to work', answers: ['works'], explain: 'My brother = he → додаємо -s.' },
              { type: 'choice', q: 'They ___ TV every evening.', options: ['watch', 'watches', 'watching', 'are watch'], answer: 0, explain: 'They — множина, дієслово без змін.' },
              { type: 'fill', q: 'We ___ meat.', hint: 'not / to eat', answers: ["don't eat", 'do not eat'], explain: 'Заперечення: don’t + інфінітив.' },
              { type: 'reorder', words: ['English', 'study', 'every day', 'we'], answer: 'We study English every day', uk: 'Ми вивчаємо англійську щодня.' },
              { type: 'choice', q: 'Яке речення правильне? (загальний факт)', options: ['Water boils at 100 degrees.', 'Water is boil at 100 degrees.', 'Water boiling at 100 degrees.', 'Water boil at 100 degrees.'], answer: 0, explain: 'Факти та закони природи — це завжди Present Simple.' },
              { type: 'reorder', words: ["doesn't", 'my sister', 'eat', 'meat'], answer: "My sister doesn't eat meat", uk: 'Моя сестра не їсть м’ясо.' }
            ]
          },
          {
            id: 'present-continuous', title: 'Present Continuous', emoji: '🏃', level: 'A1', minutes: 7,
            theory: {
              intro: 'Present Continuous описує дію, яка відбувається прямо зараз, у момент мовлення, або тимчасово.',
              rules: [
                { t: 'Форма', d: '<b>am / is / are</b> + дієслово з <b>-ing</b>.', ex: [['I am reading a book now.', 'Я зараз читаю книжку.']] },
                { t: 'Питання', d: 'Дієслово to be виходить на перше місце.', ex: [['Are you listening to me?', 'Ти мене слухаєш?']] },
                { t: 'Слова-маркери', d: '<b>now, at the moment, right now, Look!, Listen!</b>', ex: [['Look! It is snowing.', 'Глянь! Іде сніг.']] },
                { t: 'Дієслова стану', d: '<b>like, love, know, want, understand</b> зазвичай не вживаються в Continuous.', ex: [['I want a coffee. ✅ / I am wanting a coffee. ❌', '']] }
              ],
              tip: 'Бачиш «Look!» або «Listen!» у завданні — майже напевно це Present Continuous.'
            },
            exercises: [
              { type: 'choice', q: 'Look! It ___.', options: ['rains', 'is raining', 'rain', 'rained'], answer: 1, explain: 'Look! — дія відбувається просто зараз.' },
              { type: 'fill', q: 'I ___ a book right now.', hint: 'to read', answers: ['am reading', "i'm reading"], explain: 'am + reading — дія триває зараз.' },
              { type: 'choice', q: 'Оберіть правильне питання:', options: ['Are they working now?', 'Do they working now?', 'Are they work now?', 'They are working now?'], answer: 0, explain: 'Are виносімо вперед, дієслово з -ing.' },
              { type: 'fill', q: 'She ___ TV now.', hint: 'not / to watch', answers: ["isn't watching", 'is not watching'], explain: 'Заперечення: is not + watching.' },
              { type: 'choice', q: 'Яке речення правильне? (дієслово стану)', options: ['I want a new phone.', 'I am wanting a new phone.', 'I wanting a new phone.', 'I wants a new phone.'], answer: 0, explain: 'Want — дієслово стану, його не вживають у Continuous.' },
              { type: 'reorder', words: ['at the moment', 'is', 'he', 'a letter', 'writing'], answer: 'He is writing a letter at the moment', uk: 'Зараз він пише лист.' },
              { type: 'choice', q: 'Listen! Somebody ___.', options: ['sings', 'is singing', 'sing', 'sang'], answer: 1, explain: 'Listen! підказує: дія триває зараз.' },
              { type: 'fill', q: 'We ___ for the bus now.', hint: 'to wait', answers: ['are waiting', "we're waiting"], explain: 'We + are + waiting.' }
            ]
          },
          {
            id: 'past-simple', title: 'Past Simple', emoji: '🕰️', level: 'A1', minutes: 8,
            theory: {
              intro: 'Past Simple — завершена дія в минулому, у конкретний момент часу: вчора, минулого тижня, у 2010 році.',
              rules: [
                { t: 'Правильні та неправильні дієслова', d: 'Правильні отримують <b>-ed</b> (work → worked). Неправильні треба вчити: go → <b>went</b>, see → <b>saw</b>, buy → <b>bought</b>.', ex: [['We watched a great film.', 'Ми подивилися чудовий фільм.']] },
                { t: 'was / were', d: 'Минулий час дієслова to be: I/he/she/it — <b>was</b>, you/we/they — <b>were</b>.', ex: [['They were very happy.', 'Вони були дуже щасливі.']] },
                { t: 'Питання і заперечення', d: '<b>did</b> + інфінітив (без -ed!).', ex: [['Did you see that film?', 'Ти бачив той фільм?'], ['I didn’t go to school.', 'Я не пішов до школи.']] },
                { t: 'Слова-маркери', d: '<b>yesterday, last week, two days ago, in 2010</b>.', ex: [] }
              ],
              tip: 'Після did дієслово повертається у початкову форму: Did you enjoy…? — а не «enjoyed».'
            },
            exercises: [
              { type: 'choice', q: 'Yesterday I ___ to the cinema.', options: ['go', 'went', 'gone', 'going'], answer: 1, explain: 'Go — неправильне дієслово: go → went.' },
              { type: 'fill', q: 'She ___ a new car last month.', hint: 'to buy', answers: ['bought'], explain: 'Buy → bought (неправильне дієслово).' },
              { type: 'choice', q: 'Оберіть правильне питання:', options: ['Did you enjoy the party?', 'Did you enjoyed the party?', 'Do you enjoyed the party?', 'Were you enjoy the party?'], answer: 0, explain: 'Після did — інфінітив без змін.' },
              { type: 'fill', q: 'They ___ at home yesterday.', hint: 'to be', answers: ['were'], explain: 'They → were.' },
              { type: 'choice', q: 'We ___ the film last night.', options: ["didn't see", "didn't saw", "don't see", "weren't see"], answer: 0, explain: 'Didn’t + інфінітив: didn’t see.' },
              { type: 'reorder', words: ['last summer', 'to Italy', 'she', 'travelled'], answer: 'She travelled to Italy last summer', uk: 'Минулого літа вона їздила до Італії.' },
              { type: 'fill', q: 'I ___ my keys, so I couldn’t open the door.', hint: 'to lose', answers: ['lost'], explain: 'Lose → lost.' },
              { type: 'choice', q: 'Оберіть правильне питання:', options: ['When did the lesson start?', 'When started the lesson?', 'When does the lesson start?', 'When the lesson started?'], answer: 0, explain: 'Питання про минуле: When did + інфінітив?' }
            ]
          },
          {
            id: 'past-continuous', title: 'Past Continuous', emoji: '🌧️', level: 'A2', minutes: 8,
            theory: {
              intro: 'Past Continuous — дія, яка тривала в певний момент у минулому. Часто працює в парі з Past Simple.',
              rules: [
                { t: 'Форма', d: '<b>was / were</b> + дієслово з <b>-ing</b>.', ex: [['At 8 p.m. I was watching a film.', 'О 20:00 я дивився фільм.']] },
                { t: 'Паралельні дії', d: 'Дві тривалі дії одночасно — <b>while</b>.', ex: [['While I was cooking, my sister was reading.', 'Поки я готував, сестра читала.']] },
                { t: 'Перервана дія', d: 'Довга дія (Past Continuous) + коротка, що перервала (Past Simple) через <b>when</b>.', ex: [['I was reading when he called.', 'Я читав, коли він зателефонував.']] }
              ],
              tip: 'Формула: while + тривала дія, when + коротка дія, що «вклинюється».'
            },
            exercises: [
              { type: 'choice', q: 'At 7 o’clock yesterday I ___ dinner.', options: ['cooked', 'was cooking', 'cook', 'am cooking'], answer: 1, explain: 'Конкретний момент у минулому → Past Continuous.' },
              { type: 'fill', q: 'While she ___, her brother was playing games.', hint: 'to listen to music', answers: ['was listening to music'], explain: 'Паралельні дії: was + listening.' },
              { type: 'choice', q: 'I was having a shower when somebody ___ the door.', options: ['was knocking', 'knocked', 'knocks', 'knock'], answer: 1, explain: 'Коротка дія, що перервала → Past Simple.' },
              { type: 'choice', q: 'Оберіть правильне питання:', options: ['Were you working at 10 a.m.?', 'Was you working at 10 a.m.?', 'Did you working at 10 a.m.?', 'You were work at 10 a.m.?'], answer: 0, explain: 'You → were; were виносимо вперед.' },
              { type: 'fill', q: 'They ___ TV at midnight.', hint: 'not / to watch', answers: ["weren't watching", 'were not watching'], explain: 'Заперечення: were not + watching.' },
              { type: 'reorder', words: ['was raining', 'it', 'all day'], answer: 'It was raining all day', uk: 'Увесь день ішов дощ.' },
              { type: 'choice', q: 'While we ___ in the park, it started to rain.', options: ['walked', 'were walking', 'walk', 'are walking'], answer: 1, explain: 'Тривала дія на фоні → Past Continuous.' },
              { type: 'choice', q: 'This time yesterday we ___ tennis.', options: ['played', 'were playing', 'play', 'have played'], answer: 1, explain: '«Цієї миті вчора» — тривала дія в минулому.' }
            ]
          },
          {
            id: 'past-perfect', title: 'Past Perfect', emoji: '⏪', level: 'B1', minutes: 9,
            theory: {
              intro: 'Past Perfect — це «передминулий» час: дія, що сталася РАНІШЕ за іншу дію в минулому. Він показує, що було «до».',
              rules: [
                { t: 'Утворення', d: '<b>had + V3</b> (третя форма дієслова) для всіх осіб.', ex: [['She had left before I arrived.', 'Вона пішла до того, як я приїхав.'], ['We had never seen snow before that trip.', 'Ми ніколи не бачили снігу до тієї поїздки.']] },
                { t: 'Дві дії в минулому', d: 'Раніша дія — Past Perfect, пізніша — Past Simple. Часто з <b>before, after, by the time, when</b>.', ex: [['When we got to the station, the train had already left.', 'Коли ми дісталися вокзалу, потяг уже пішов.']] },
                { t: 'Питання і заперечення', d: '<b>hadn’t + V3</b>; питання: <b>Had</b> + особа + V3.', ex: [['I hadn’t finished my homework when Mum came home.', 'Я не встиг доробити домашку, коли прийшла мама.'], ['Had you met him before the party?', 'Ти зустрічав його до вечірки?']] }
              ],
              tip: 'Якщо дія лише одна або порядок очевидний (then, after that) — сміливо став Past Simple. Past Perfect потрібен, щоб підкреслити «що було раніше».'
            },
            exercises: [
              { type: 'choice', q: 'When I arrived home, my sister ___ dinner.', options: ['had already cooked', 'has already cooked', 'already cooks', 'is already cook'], answer: 0, explain: 'Вечеря була готова ДО мого приїзду (раніша з двох минулих дій) → Past Perfect.' },
              { type: 'choice', q: 'The film ___ by the time we got to the cinema.', options: ['had started', 'has started', 'starts', 'is starting'], answer: 0, explain: 'by the time + минула подія → Past Perfect.' },
              { type: 'fill', q: 'She ___ abroad before 2020. (ніколи / не бути)', hint: 'never / to be', answers: ['had never been'], explain: 'Досвід ДО певного моменту в минулому → had never been.' },
              { type: 'choice', q: '___ you ___ the book before you watched the film?', options: ['Had … read', 'Have … read', 'Did … read', 'Were … reading'], answer: 0, explain: 'Дія до іншої минулої дії → Past Perfect: Had you read…?' },
              { type: 'choice', q: 'After he ___ his homework, he went out.', options: ['had finished', 'has finished', 'finishes', 'finishing'], answer: 0, explain: 'Спершу доробив (раніше), потім вийшов → had finished.' },
              { type: 'fill', q: 'By midnight they ___ the project. (завершити)', hint: 'to finish', answers: ['had finished'], explain: 'by + момент у минулому → Past Perfect.' },
              { type: 'reorder', words: ['the bus', 'had left', 'we', 'arrived', 'when'], answer: 'The bus had left when we arrived', uk: 'Автобус уже поїхав, коли ми приїхали.' },
              { type: 'reorder', words: ['never', 'she', 'had', 'sushi', 'tried', 'before'], answer: 'She had never tried sushi before', uk: 'Вона ніколи раніше не куштувала суші.' }
            ]
          },
          {
            id: 'past-perfect-continuous', title: 'Past Perfect Continuous', emoji: '🌀', level: 'B2', minutes: 9,
            theory: {
              intro: 'Past Perfect Continuous — дія ТРИВАЛА до певного моменту в минулому. Фокус на тривалості процесу, а не на результаті.',
              rules: [
                { t: 'Утворення', d: '<b>had been + V-ing</b> для всіх осіб.', ex: [['They had been waiting for two hours when the bus finally came.', 'Вони чекали вже дві години, коли автобус нарешті приїхав.']] },
                { t: 'Коли вживати', d: 'Процес, що почався раніше і тривав ДО (або аж до) іншого моменту в минулому. Маркери: <b>for, since, all morning/day</b>.', ex: [['She had been working at the company for five years before she got promoted.', 'Вона пропрацювала у компанії п’ять років, перш ніж її підвищили.']] },
                { t: 'Past Continuous vs Past Perfect Continuous', d: 'Past Continuous — процес У момент; PPC — процес ДО моменту.', ex: [['At 8 pm I was watching TV.', 'О 8-й я дивився ТБ (процес у момент).'], ['By 8 pm I had been watching TV for two hours.', 'До 8-ї я вже дві години дивився ТБ (тривалість до моменту).']] }
              ],
              tip: 'Дієслова стану (know, love, understand) у Continuous не вживаємо — ставимо Past Perfect: She had known him for years.'
            },
            exercises: [
              { type: 'choice', q: 'They ___ for an hour before the taxi arrived.', options: ['had been waiting', 'have been waiting', 'had been wait', 'were been waiting'], answer: 0, explain: 'Очікування тривало ДО приїзду таксі → Past Perfect Continuous.' },
              { type: 'choice', q: 'Her eyes were red because she ___.', options: ['had been crying', 'has cried', 'was cry', 'is crying'], answer: 0, explain: 'Видимий наслідок у минулому від тривалого процесу до того → had been crying.' },
              { type: 'fill', q: 'He ___ all day, so he was exhausted. (вести машину)', hint: 'to drive', answers: ['had been driving'], explain: 'Тривалий процес до моменту в минулому → had been driving.' },
              { type: 'choice', q: 'How long ___ at the university before he dropped out?', options: ['had he been studying', 'has he been studying', 'did he studying', 'was he study'], answer: 0, explain: 'Питання про тривалість до моменту в минулому → had he been studying.' },
              { type: 'choice', q: 'Оберіть правильне речення:', options: ['I had been living in Lviv for ten years before I moved to Kyiv.', 'I had been live in Lviv for ten years before I moved.', 'I was lived in Lviv for ten years before I moved.', 'I have been living in Lviv before I moved last year.'], answer: 0, explain: 'had been + V-ing — правильна форма Past Perfect Continuous.' },
              { type: 'fill', q: 'We ___ football for 20 minutes when it started to rain. (грати)', hint: 'to play', answers: ['had been playing'], explain: 'Грали 20 хвилин ДО того, як пішов дощ → had been playing.' },
              { type: 'reorder', words: ['had been raining', 'the ground', 'was wet', 'because', 'all night', 'it'], answer: 'The ground was wet because it had been raining all night', uk: 'Земля була мокра, бо всю ніч ішов дощ.' },
              { type: 'reorder', words: ['the team', 'had been working', 'for two hours', 'already'], answer: 'The team had been working for two hours already', uk: 'Команда вже пропрацювала дві години.' }
            ]
          },
          {
            id: 'present-perfect', title: 'Present Perfect', emoji: '🎒', level: 'A2', minutes: 9,
            theory: {
              intro: 'Present Perfect пов’язує минуле з теперішнім: досвід, результат, дії, що почалися раніше й тривають досі.',
              rules: [
                { t: 'Форма', d: '<b>have / has</b> + третя форма дієслова (V3).', ex: [['I have finished my homework.', 'Я закінчив домашку. (результат зараз)']] },
                { t: 'Досвід: ever / never', d: 'Питаємо про досвід життя без точного часу.', ex: [['Have you ever been to Paris?', 'Ти колись бував у Парижі?']] },
                { t: 'since / for', d: '<b>since</b> — з якого моменту; <b>for</b> — як довго.', ex: [['I have lived here for 5 years.', 'Я живу тут 5 років.'], ['She has worked here since 2020.', 'Вона працює тут із 2020 року.']] },
                { t: 'Головна відмінність від Past Simple', d: 'З точним часом у минулому (yesterday, last year) Present Perfect <b>не вживається</b>.', ex: [['I saw him yesterday. ✅', 'I have seen him yesterday. ❌']] }
              ],
              tip: 'Слова-маркери: just, already, yet, ever, never, since, for.'
            },
            exercises: [
              { type: 'choice', q: 'I ___ this book twice.', options: ['read', 'have read', 'am reading', 'reads'], answer: 1, explain: 'Досвід без точного часу → Present Perfect.' },
              { type: 'choice', q: 'She ___ to London three times.', options: ['has been', 'was been', 'is been', 'have been'], answer: 0, explain: 'She + has + been.' },
              { type: 'fill', q: 'We ___ here since 2019.', hint: 'to live', answers: ['have lived'], explain: 'since 2019 → Present Perfect: have lived.' },
              { type: 'choice', q: '___ you ever ___ sushi?', options: ['Have / tried', 'Did / tried', 'Do / try', 'Have / try'], answer: 0, explain: 'Конструкція досвіду: Have you ever + V3?' },
              { type: 'choice', q: 'Оберіть правильне речення:', options: ['I have just finished the report.', 'I have finished the report yesterday.', 'I just finish the report yesterday.', 'I am just finished the report.'], answer: 0, explain: 'Зі словом yesterday був би Past Simple; just — маркер Perfect.' },
              { type: 'fill', q: 'He ___ his homework yet.', hint: 'not / to do', answers: ["hasn't done", 'has not done'], explain: 'Yet у запереченні → has not done.' },
              { type: 'reorder', words: ['never', 'I', 'have', 'sushi', 'tried'], answer: 'I have never tried sushi', uk: 'Я ніколи не куштував суші.' },
              { type: 'choice', q: 'They have known each other ___ ten years.', options: ['for', 'since', 'during', 'from'], answer: 0, explain: 'For — про тривалість (як довго), since — про точку старту.' }
            ]
          },
          {
            id: 'present-perfect-continuous', title: 'Present Perfect Continuous', emoji: '⏳', level: 'B1', minutes: 9,
            theory: {
              intro: 'Present Perfect Continuous — дія почалася в минулому й триває ДОСИ (або щойно закінчилася), і нам важливо, СКІЛЬКИ вона триває.',
              rules: [
                { t: 'Утворення', d: '<b>have/has been + V-ing</b>.', ex: [['I have been learning English for three years.', 'Я вивчаю англійську вже три роки.'], ['She has been working here since March.', 'Вона працює тут із березня.']] },
                { t: 'Слова-маркери', d: '<b>for</b> (тривалість), <b>since</b> (точка початку), <b>all day/week, lately, recently</b>.', ex: [['It has been raining all morning.', 'Дощ іде все ранку.']] },
                { t: 'Видимий результат зараз', d: 'Процес щойно завершився, і ми бачимо наслідок.', ex: [['You look tired. — I have been running.', 'Ти виглядаєш втомленим. — Я бігав.']] },
                { t: 'PP Continuous vs Present Perfect', d: 'Continuous підкреслює тривалість процесу; Perfect — результат і завершеність.', ex: [['I have been reading this book for two hours.', 'Читаю цю книжку вже дві години (досі читаю).'], ['I have read 50 pages.', 'Я прочитав 50 сторінок (результат).']] }
              ],
              tip: 'Дієслова стану (know, love, understand, have у значенні «мати») у Continuous не вживаємо: I have known her for ages (не «have been knowing»).'
            },
            exercises: [
              { type: 'choice', q: 'She ___ yoga for 40 minutes and doesn’t want to stop.', options: ['has been doing', 'does', 'was doing', 'has doing'], answer: 0, explain: 'Процес триває вже 40 хв і досі → Present Perfect Continuous.' },
              { type: 'choice', q: 'I ___ you since primary school.', options: ['have known', 'have been knowing', 'am knowing', 'had knowing'], answer: 0, explain: 'know — дієслово стану, тому Present Perfect, а не Continuous.' },
              { type: 'fill', q: 'They ___ for the bus for 25 minutes already. (чекати)', hint: 'to wait', answers: ['have been waiting'], explain: 'Очікування триває досі → have been waiting.' },
              { type: 'choice', q: 'Your hands are dirty! What ___?', options: ['have you been doing', 'have you done', 'did you do', 'are you doing'], answer: 0, explain: 'Є видимі сліди недавнього процесу → Present Perfect Continuous.' },
              { type: 'choice', q: 'How long ___ here?', options: ['have you been living', 'are you living', 'do you live since', 'did you live'], answer: 0, explain: 'How long + дія, що триває → have you been living.' },
              { type: 'fill', q: 'It ___ since early morning. (йти про дощ)', hint: 'to rain', answers: ['has been raining'], explain: 'Дощ іде з самого ранку й досі → has been raining.' },
              { type: 'reorder', words: ['has been sleeping', 'the cat', 'all morning'], answer: 'The cat has been sleeping all morning', uk: 'Кіт спить усе ранку.' },
              { type: 'reorder', words: ['English', 'for two years', 'I', 'have been learning'], answer: 'I have been learning English for two years', uk: 'Я вивчаю англійську вже два роки.' }
            ]
          },
          {
            id: 'future-will-going-to', title: 'Future: will / going to', emoji: '🚀', level: 'A2', minutes: 8,
            theory: {
              intro: 'Два основні способи говорити про майбутнє: спонтанне рішення чи прогноз (will) та плани й наміри (going to).',
              rules: [
                { t: 'will', d: 'Спонтанні рішення, обіцянки, прогнози без очевидних ознак.', ex: [['I will help you!', 'Я тобі допоможу! (вирішив щойно)']] },
                { t: 'be going to', d: 'Плани та наміри, а також прогнози з видимими ознаками.', ex: [['Look at the clouds — it is going to rain.', 'Глянь на хмари — буде дощ.']] },
                { t: 'Домовленості', d: 'Точні плани-домовленості часто передають через Present Continuous.', ex: [['I’m meeting Ann at 6.', 'Я зустрічаюсь із Енн о 6-й.']] }
              ],
              tip: 'Телефон дзвонить → «I’ll answer it!» — рішення в момент мовлення, завжди will.'
            },
            exercises: [
              { type: 'choice', q: 'Look at those clouds! It ___ rain.', options: ['will', 'is going to', 'is', 'would'], answer: 1, explain: 'Є очевидна ознака (хмари) → going to.' },
              { type: 'choice', q: 'The phone is ringing. — I ___ answer it!', options: ['will', 'am going to', 'am', 'would'], answer: 0, explain: 'Спонтанне рішення в момент мовлення → will.' },
              { type: 'fill', q: 'Next summer we ___ around Europe. (план уже є)', hint: 'to travel', answers: ['are going to travel'], explain: 'Намір/план → are going to travel.' },
              { type: 'choice', q: 'I promise I ___ late.', options: ["won't be", "amn't being", "don't be", 'not be'], answer: 0, explain: 'Обіцянка → will (won’t).' },
              { type: 'choice', q: '— What are your plans for the weekend? — I ___ my grandparents.', options: ['am going to visit', 'will visiting', 'visit', 'visited'], answer: 0, explain: 'Плани → going to.' },
              { type: 'reorder', words: ['I', 'you', 'help', 'will'], answer: 'I will help you', uk: 'Я тобі допоможу.' },
              { type: 'fill', q: 'Be careful! You ___ drop those glasses.', hint: 'to be going to', answers: ['are going to drop'], explain: 'Очевидна ситуація → are going to drop.' },
              { type: 'choice', q: 'Оберіть правильне речення (домовленість):', options: ["I'm seeing the doctor tomorrow at 10.", 'I see the doctor tomorrow at 10 will.', 'I will to see the doctor tomorrow.', 'I going to see doctor tomorrow.'], answer: 0, explain: 'Зафіксована домовленість → Present Continuous.' }
            ]
          },
          {
            id: 'future-continuous', title: 'Future Continuous', emoji: '🎬', level: 'B1', minutes: 8,
            theory: {
              intro: 'Future Continuous — дія ТРИВАТИМЕ в конкретний момент у майбутньому. Уяви, що ти «всередині» процесу завтра о цій порі.',
              rules: [
                { t: 'Утворення', d: '<b>will be + V-ing</b> для всіх осіб.', ex: [['This time tomorrow I will be flying to Berlin.', 'Завтра в цей час я летітиму до Берліна.']] },
                { t: 'Коли вживати', d: 'Процес у точний момент майбутнього. Маркери: <b>this time tomorrow, at 8 pm tomorrow, all evening</b>.', ex: [['At noon we will be having lunch.', 'О півдні ми обідатимемо.']] },
                { t: 'Ввічливі питання про плани', d: 'Will you be …? звучить м’якше, ніж Will you …?', ex: [['Will you be using the car tonight?', 'Ти користуватимешся авто сьогодні ввечері?']] }
              ],
              tip: 'Не плутай із Future Simple: will be doing — процес у момент; will do — просто факт дії чи рішення.'
            },
            exercises: [
              { type: 'choice', q: 'This time tomorrow I ___ on the beach.', options: ['will be lying', 'will lying', 'am being lying', 'will to lie'], answer: 0, explain: 'Процес у конкретний момент майбутнього → will be lying.' },
              { type: 'choice', q: 'At 9 pm tonight she ___ her exam.', options: ['will be taking', 'will taking', 'takes being', 'will have take'], answer: 0, explain: 'О 9-й вона буде в процесі складання → Future Continuous.' },
              { type: 'fill', q: '___ you ___ the laptop at 6 pm? (користуватися)', hint: 'to use', answers: ['Will you be using'], explain: 'Питання про процес у момент майбутнього → Will you be using.' },
              { type: 'choice', q: 'Don’t call at 8 — I ___ dinner.', options: ['will be having', 'will have', 'am have', 'will having'], answer: 0, explain: 'О 8-й я буду в процесі вечері → will be having.' },
              { type: 'choice', q: 'This time next week we ___ in the mountains.', options: ['will be hiking', 'will hiking', 'are hike', 'will to hike'], answer: 0, explain: 'Процес у момент майбутнього → will be hiking.' },
              { type: 'fill', q: 'In ten minutes the train ___ the border. (перетинати)', hint: 'to cross', answers: ['will be crossing'], explain: 'Через 10 хвилин потяг буде в процесі перетину → will be crossing.' },
              { type: 'reorder', words: ['will be working', 'at midnight', 'I', 'still'], answer: 'I will still be working at midnight', uk: 'О півночі я все ще працюватиму.' },
              { type: 'reorder', words: ['this time tomorrow', 'she', 'will be flying', 'to London'], answer: 'This time tomorrow she will be flying to London', uk: 'Цього часу завтра вона летітиме до Лондона.' }
            ]
          },
          {
            id: 'future-perfect', title: 'Future Perfect', emoji: '🏁', level: 'B2', minutes: 8,
            theory: {
              intro: 'Future Perfect — дія ЗАВЕРШИТЬСЯ до певного моменту в майбутньому. Дедлайни, результати й «встигну до…».',
              rules: [
                { t: 'Утворення', d: '<b>will have + V3</b> для всіх осіб.', ex: [['By Friday I will have finished the report.', 'До п’ятниці я завершу звіт.']] },
                { t: 'Слова-маркери', d: '<b>by + час, by the time, by the end of, before</b>.', ex: [['By the end of the year she will have saved €2000.', 'До кінця року вона назбирає 2000 євро.']] },
                { t: 'Часова послідовність', d: 'Після by the time / before майбутню дію НЕ ставимо — там Present Simple.', ex: [['By the time you arrive, we will have cooked dinner.', 'До твого приїзду ми вже приготуємо вечерю.']] }
              ],
              tip: 'Will finish — просто «закінчу», will have finished — «уже буде закінчено до…» Якщо є «до такого-то моменту» — бери Future Perfect.'
            },
            exercises: [
              { type: 'choice', q: 'By 2030 scientists ___ a cure.', options: ['will have found', 'will finding', 'will have find', 'are finding'], answer: 0, explain: 'До 2030 року дія завершиться → Future Perfect.' },
              { type: 'choice', q: 'By the time you get home, I ___ dinner.', options: ['will have cooked', 'will cooking', 'cook', 'am cook'], answer: 0, explain: 'by the time → дія завершиться до моменту → will have cooked.' },
              { type: 'fill', q: 'By June she ___ her thesis. (написати)', hint: 'to write', answers: ['will have written'], explain: 'До червня дія завершиться → will have written.' },
              { type: 'choice', q: 'We ___ the project by Friday, I promise.', options: ['will have finished', 'will finishing', 'have finish', 'will to finish'], answer: 0, explain: 'Обіцянка про результат до дедлайну → will have finished.' },
              { type: 'choice', q: 'How many words ___ by the end of the course?', options: ['will you have learned', 'will you learning', 'do you learn', 'are you learned'], answer: 0, explain: 'Питання про результат до моменту → will you have learned.' },
              { type: 'fill', q: 'By midnight they ___ 500 km. (проїхати)', hint: 'to drive', answers: ['will have driven'], explain: 'До півночі буде подолано 500 км → will have driven.' },
              { type: 'reorder', words: ['will have left', 'by then', 'the train'], answer: 'The train will have left by then', uk: 'До того часу потяг уже поїде.' },
              { type: 'reorder', words: ['by next year', 'I', 'will have finished', 'my studies'], answer: 'I will have finished my studies by next year', uk: 'Наступного року я завершу навчання.' }
            ]
          },
          {
            id: 'future-perfect-continuous', title: 'Future Perfect Continuous', emoji: '🔭', level: 'B2', minutes: 9,
            theory: {
              intro: 'Future Perfect Continuous — дія триватиме вже якийсь час ДО певного моменту в майбутньому. Рідкісний, але дуже точний час для підсумків тривалості.',
              rules: [
                { t: 'Утворення', d: '<b>will have been + V-ing</b>.', ex: [['In December I will have been working here for ten years.', 'У грудні буде десять років, як я тут працюю.']] },
                { t: 'Коли вживати', d: 'Підсумок тривалості до моменту в майбутньому: <b>by / when + for</b>.', ex: [['By 6 pm we will have been travelling for 12 hours.', 'До 18:00 ми будемо в дорозі вже 12 годин.']] },
                { t: 'Future Perfect vs FPC', d: 'FP — дія завершиться («зроблю до»); FPC — процес триватиме стільки-то («буду робити вже стільки»).', ex: [['I will have written the book by May.', 'Я допишу книжку до травня.'], ['I will have been writing the book for two years by May.', 'До травня буде два роки, як я пишу книжку.']] }
              ],
              tip: 'З дієсловами стану (know, love) Continuous неможливий — став Future Perfect: By then I will have known her for a year.'
            },
            exercises: [
              { type: 'choice', q: 'By June he ___ at the bank for 20 years.', options: ['will have been working', 'will have working', 'will being working', 'works'], answer: 0, explain: 'Тривалість до моменту в майбутньому → Future Perfect Continuous.' },
              { type: 'choice', q: 'When you arrive, we ___ for three hours.', options: ['will have been waiting', 'will been waiting', 'will have been wait', 'are waiting'], answer: 0, explain: 'Очікування триватиме вже три години до приїзду → will have been waiting.' },
              { type: 'fill', q: 'In May they ___ here for a decade. (жити)', hint: 'to live', answers: ['will have been living'], explain: 'У травні буде десять років, як вони тут живуть → will have been living.' },
              { type: 'choice', q: 'By midnight she ___ for eight hours straight.', options: ['will have been studying', 'will have studying', 'will been studying', 'will study been'], answer: 0, explain: 'Вісім годин безперервного процесу до півночі → will have been studying.' },
              { type: 'choice', q: 'Next month I ___ Spanish for five years.', options: ['will have been learning', 'will have learning', 'am learning', 'learn'], answer: 0, explain: 'Підсумок тривалості наступного місяця → will have been learning.' },
              { type: 'fill', q: 'By 5 pm the team ___ the app all day. (тестувати)', hint: 'to test', answers: ['will have been testing'], explain: 'Команда тестуватиме застосунок весь день до 17:00 → will have been testing.' },
              { type: 'reorder', words: ['will have been teaching', 'for 30 years', 'she', 'by then'], answer: 'She will have been teaching for 30 years by then', uk: 'До того часу вона викладатиме вже 30 років.' },
              { type: 'reorder', words: ['for two hours', 'by 8 pm', 'we', 'will have been driving'], answer: 'By 8 pm we will have been driving for two hours', uk: 'До восьмої ми вже дві години будемо за кермом.' }
            ]
          }
        ]
      },
      /* ---------- АРТИКЛІ ---------- */
      {
        id: 'articles', title: 'Артиклі', emoji: '🍎',
        desc: 'a / an, the або нульовий артикль — раз і назавжди.',
        cheat: {
          title: 'три артиклі за 30 секунд',
          head: ['Артикль', 'Коли вживаємо', 'Приклад'],
          rows: [
            [{ t: 'a / an', topic: 'a-an' }, 'однина, згадуємо вперше, «якийсь один»', 'I saw a dog. (an + голосний звук: an hour)'],
            [{ t: 'the', topic: 'the' }, 'відомий обом / уже згаданий; унікальний об’єкт', 'Close the door. The Sun rises.'],
            [{ t: '— (нульовий)', topic: 'zero-article' }, 'множина і незлічувані загалом; імена, їжа, спорт', 'I love music. We had lunch.']
          ]
        },
        topics: [
          {
            id: 'a-an', title: 'Артиклі a / an', emoji: '🍏', level: 'A1', minutes: 6,
            theory: {
              intro: 'Неозначений артикль означає «один із багатьох» і вживається з однинними исчислими іменниками, коли згадуємо їх уперше.',
              rules: [
                { t: 'a чи an?', d: '<b>a</b> — перед приголосним звуком, <b>an</b> — перед голосним звуком. Важливий саме звук, а не літера!', ex: [['a cat, a university (звук /ju/)', ''], ['an apple, an hour (h не читається)', '']] },
                { t: 'Професії', d: 'Називаючи професію, завжди ставимо a/an.', ex: [['She is a doctor.', 'Вона лікарка.']] },
                { t: 'Стійкі вирази', d: '<b>have a shower, have a good time, twice a week</b>.', ex: [['I work out twice a week.', 'Я тренуюся двічі на тиждень.']] }
              ],
              tip: 'Кажіть уголос: якщо слово починається зі звука голосної — an. «An hour», але «a university».'
            },
            exercises: [
              { type: 'choice', q: 'She eats ___ apple every day.', options: ['a', 'an', 'the', '—'], answer: 1, explain: 'Apple починається зі звука /æ/ → an.' },
              { type: 'choice', q: 'He is ___ engineer.', options: ['a', 'an', 'the', '—'], answer: 1, explain: 'Професія + голосний звук /ɪ/ → an.' },
              { type: 'choice', q: 'It takes ___ hour to get there.', options: ['a', 'an', 'the', '—'], answer: 1, explain: 'У слові hour літера h не читається → an.' },
              { type: 'choice', q: 'I saw ___ interesting film yesterday.', options: ['a', 'an', 'the', '—'], answer: 1, explain: 'Звук /ɪ/ на початку → an.' },
              { type: 'fill', q: 'My sister is ___ nurse.', answers: ['a'], explain: 'Професія однини → a nurse.' },
              { type: 'choice', q: 'We have English lessons twice ___ week.', options: ['a', 'an', 'the', '—'], answer: 0, explain: 'Twice a week — сталий вираз.' },
              { type: 'choice', q: 'There is ___ university near my house.', options: ['a', 'an', 'the', '—'], answer: 0, explain: 'University починається зі звука /ju/ → a.' },
              { type: 'choice', q: 'I need ___ new phone.', options: ['a', 'an', 'the', '—'], answer: 0, explain: 'Один із багатьох, згадуємо вперше → a.' }
            ]
          },
          {
            id: 'the', title: 'Означений артикль the', emoji: '🎯', level: 'A1', minutes: 6,
            theory: {
              intro: 'The вказує на конкретний предмет, відомий і мовцю, і слухачу, або на єдиний у своєму роді.',
              rules: [
                { t: 'Уже згадане або зрозуміле з контексту', d: '«Я купив телефон. Телефон чудовий.»', ex: [['I bought a phone. The phone is great.', '']] },
                { t: 'Унікальні об’єкти, найвищі ступені, порядкові', d: '<b>the sun, the best film, the first day</b>.', ex: [['This is the best day of my life.', 'Це найкращий день мого життя.']] },
                { t: 'Країни', d: 'The з множинними назвами та назвами зі словами states/kingdom: <b>the USA, the UK, the Netherlands</b>. Україна, Польща — без артикля.', ex: [] },
                { t: 'Музичні інструменти', d: 'Грати на інструменті → play <b>the</b> piano / the guitar.', ex: [] }
              ],
              tip: 'Поставте подумки «цей самий» перед іменником. Якщо виходить природно — скоріш за все, потрібен the.'
            },
            exercises: [
              { type: 'choice', q: '___ sun rises in the east.', options: ['A', 'An', 'The', '—'], answer: 2, explain: 'Унікальний об’єкт → the.' },
              { type: 'choice', q: 'This is ___ best film I have ever seen.', options: ['a', 'an', 'the', '—'], answer: 2, explain: 'Найвищий ступінь → the best.' },
              { type: 'choice', q: 'They live in ___ Netherlands.', options: ['a', 'an', 'the', '—'], answer: 2, explain: 'Множинна назва країни → the Netherlands.' },
              { type: 'choice', q: 'She plays ___ piano very well.', options: ['a', 'an', 'the', '—'], answer: 2, explain: 'Музичні інструменти → play the piano.' },
              { type: 'choice', q: 'I read a book yesterday. ___ book was fantastic.', options: ['A', 'An', 'The', '—'], answer: 2, explain: 'Уже згадана конкретна книжка → the.' },
              { type: 'choice', q: 'Kyiv is ___ capital of Ukraine.', options: ['a', 'an', 'the', '—'], answer: 2, explain: 'Єдина столиця → the.' },
              { type: 'fill', q: 'Yesterday was ___ hottest day of the year.', answers: ['the'], explain: 'Найвищий ступінь → the hottest.' },
              { type: 'choice', q: 'We went to ___ Alps last winter.', options: ['a', 'an', 'the', '—'], answer: 2, explain: 'Гірські масиви у множині → the Alps.' }
            ]
          },
          {
            id: 'zero-article', title: 'Нульовий артикль', emoji: '🚫', level: 'A2', minutes: 6,
            theory: {
              intro: 'Є чимало ситуацій, коли артикль не потрібен взагалі. Їх варто просто запам’ятати.',
              rules: [
                { t: 'Загальні поняття', d: 'Множина та незчислювані іменники в загальному значенні.', ex: [['I love music.', 'Я люблю музику.'], ['Cats are cute.', 'Котики милі.']] },
                { t: 'Приймання їжі', d: '<b>breakfast, lunch, dinner</b> — без артикля (якщо немає прикметника).', ex: [['We had lunch at noon.', 'Ми пообідали опівдні.']] },
                { t: 'Мови, спорт, шкільні предмети', d: '<b>English, chess, maths</b>. Але: play the piano!', ex: [['She speaks French.', 'Вона говорить французькою.']] },
                { t: 'Стійкі вирази', d: '<b>go to work / school / bed, go home, on Monday, in 2024</b>.', ex: [] }
              ],
              tip: 'Home майже ніколи не приймає артикля: go home, at home, be home.'
            },
            exercises: [
              { type: 'choice', q: 'I usually have ___ breakfast at 8.', options: ['a', 'an', 'the', '—'], answer: 3, explain: 'Приймання їжі → без артикля.' },
              { type: 'choice', q: '___ life is beautiful.', options: ['A', 'An', 'The', '—'], answer: 3, explain: 'Загальне поняття → без артикля.' },
              { type: 'choice', q: 'She speaks ___ French and ___ Spanish.', options: ['the / the', '— / —', 'a / a', 'the / —'], answer: 1, explain: 'Мови → без артикля.' },
              { type: 'choice', q: 'Children love playing ___ football.', options: ['a', 'an', 'the', '—'], answer: 3, explain: 'Види спорту → без артикля.' },
              { type: 'choice', q: 'We go to ___ work by bus.', options: ['a', 'the', '—', 'an'], answer: 2, explain: 'Go to work — сталий вираз без артикля.' },
              { type: 'choice', q: 'He went to ___ school at the age of six.', options: ['a', 'an', 'the', '—'], answer: 3, explain: 'Go to school (як учень) → без артикля.' },
              { type: 'choice', q: 'See you on ___ Monday!', options: ['a', 'the', '—', 'an'], answer: 2, explain: 'Дні тижня → без артикля.' },
              { type: 'choice', q: '___ money can’t buy happiness.', options: ['A', 'An', 'The', '—'], answer: 3, explain: 'Незчислюване в загальному значенні → без артикля.' }
            ]
          }
        ]
      },
      /* ---------- ПРИЙМЕННИКИ ---------- */
      {
        id: 'prepositions', title: 'Прийменники', emoji: '📍',
        desc: 'Усі типи прийменників: час, місце, рух, діяч та інструмент, залежні прийменники і підступні пари.',
        cheat: {
          tables: [
            {
              title: '⏰ Час — коли?',
              head: ['Прийменник', 'Коли вживаємо', 'Приклад'],
              rows: [
                [{ t: 'in', topic: 'prep-time' }, 'місяці, роки, пори дня', 'in May · in 2026 · in the morning'],
                [{ t: 'on', topic: 'prep-time' }, 'дні тижня, дати', 'on Monday · on 1 May'],
                [{ t: 'at', topic: 'prep-time' }, 'точний час', 'at 7 pm · at night · at the weekend'],
                [{ t: 'for / since / during', topic: 'prep-tricky' }, 'тривалість / точка старту / «протягом»', 'for two hours · since 2015 · during the film'],
                [{ t: 'until / by', topic: 'prep-tricky' }, 'аж до / не пізніше дедлайну', 'until Monday · by Friday']
              ]
            },
            {
              title: '📍 Місце — де?',
              head: ['Прийменник', 'Коли вживаємо', 'Приклад'],
              rows: [
                [{ t: 'in', topic: 'prep-place' }, 'закритий простір, країни, міста', 'in the room · in Ukraine'],
                [{ t: 'on', topic: 'prep-place' }, 'поверхні', 'on the table · on the wall'],
                [{ t: 'at', topic: 'prep-place' }, 'точка, конкретне місце', 'at the door · at the bus stop'],
                [{ t: 'under / above / below', topic: 'prep-tricky' }, 'під / над (без контакту)', 'under the table · above the clouds'],
                [{ t: 'next to / between / behind / in front of', topic: 'prep-place' }, 'сусідство й положення', 'next to the bank · between two shops'],
                [{ t: 'by / near', topic: 'prep-place' }, 'впритул біля / поблизу (в радіусі)', 'sit by the fire · near the station']
              ]
            },
            {
              title: '🚶 Рух — куди? звідки?',
              head: ['Прийменник', 'Коли вживаємо', 'Приклад'],
              rows: [
                [{ t: 'to / into / onto', topic: 'prep-movement' }, 'напрям / всередину / на поверхню', 'go to school · walk into the room · jump onto the bed'],
                [{ t: 'from / out of / off', topic: 'prep-movement' }, 'звідки / зсередини / з поверхні', 'from work · out of the house · off the wall'],
                [{ t: 'through / across / along', topic: 'prep-movement' }, 'крізь / через / уздовж', 'through the forest · across the street · along the river'],
                [{ t: 'towards / past / over', topic: 'prep-movement' }, 'у бік / повз / через (зверху)', 'towards the exit · past the bank · over the bridge']
              ]
            },
            {
              title: '🛠️ Діяч та інструмент — ким? чим?',
              head: ['Прийменник', 'Коли вживаємо', 'Приклад'],
              rows: [
                [{ t: 'by', topic: 'prep-agent' }, 'виконавець дії; спосіб (без артикля)', 'written by her · by car · by phone'],
                [{ t: 'with', topic: 'prep-agent' }, 'інструмент, матеріал', 'opened with a key · filled with water'],
                [{ t: 'from', topic: 'prep-agent' }, 'джерело, походження', 'a letter from her · made from grapes']
              ]
            },
            {
              title: '🔗 Залежні прийменники — слово + прийменник',
              head: ['Тип', 'Комбінації', 'Приклад'],
              rows: [
                [{ t: 'дієслово + прийменник', topic: 'prep-dependent' }, 'listen to · wait for · look at · depend on · apologize for · arrive at/in', 'I’m waiting for the bus.'],
                [{ t: 'прикметник + прийменник', topic: 'prep-dependent' }, 'interested in · good at · afraid of · proud of · married to · famous for', 'She is good at languages.'],
                [{ t: 'іменник + прийменник', topic: 'prep-dependent' }, 'reason for · answer to · solution to · invitation to', 'What’s the reason for this?']
              ]
            },
            {
              title: '⚔️ Підступні пари — не переплутай',
              head: ['Пара', 'Переклад і різниця', 'Приклад'],
              rows: [
                [{ t: 'despite / in spite of', topic: 'prep-tricky' }, 'попри, незважаючи на · + іменник/герундій (після despite НЕМАЄ of)', 'Despite the rain, we went out.'],
                [{ t: 'because of / due to / owing to', topic: 'prep-tricky' }, 'через, внаслідок · + іменник (бо because + речення)', 'We stayed home because of the rain.'],
                [{ t: 'until vs by', topic: 'prep-tricky' }, 'аж до (процес) / до — дедлайн «не пізніше»', 'I work until 6. Send it by 6.'],
                [{ t: 'over/above vs under/below', topic: 'prep-tricky' }, 'над / під · контакт і рух (over/under) чи лише позиція (above/below)', 'over the bridge · above the clouds'],
                [{ t: 'in front of vs opposite', topic: 'prep-tricky' }, 'перед / навпроти (через дорогу)', 'in front of the house · opposite the bank'],
                [{ t: 'like vs as', topic: 'prep-manner' }, 'як (подібність) / у ролі (функція)', 'swim like a fish · work as a teacher']
              ]
            },
            {
              title: '💥 Причина — через що? чому?',
              head: ['Прийменник', 'Переклад і коли вживаємо', 'Приклад'],
              rows: [
                [{ t: 'because of / due to', topic: 'prep-cause' }, 'через, внаслідок · + іменник (формальніше — due to / owing to)', 'The flight was delayed due to technical problems.'],
                [{ t: 'thanks to', topic: 'prep-cause' }, 'завдяки (позитивна причина)', 'Thanks to her help, we finished on time.'],
                [{ t: 'out of', topic: 'prep-cause' }, 'з (почуття, внутрішній мотив)', 'He acted out of jealousy.'],
                [{ t: 'from / with', topic: 'prep-cause' }, 'від · стан/хвороба (from) · видима реакція (with)', 'suffer from pain · trembling with fear']
              ]
            },
            {
              title: '🎯 Мета — щоб? для чого?',
              head: ['Конструкція', 'Переклад і коли вживаємо', 'Приклад'],
              rows: [
                [{ t: 'for + іменник', topic: 'prep-purpose' }, 'для (призначення, вигода)', 'a gift for you · for relaxation'],
                [{ t: 'to / in order to / so as to', topic: 'prep-purpose' }, 'щоб + інфінітив (формальніше — in order to; заперечення: so as not to)', 'She left early to catch the train.'],
                [{ t: 'so that', topic: 'prep-purpose' }, 'щоб + речення (з підметом і дієсловом)', 'She saved money so that she could travel.'],
                [{ t: 'for + V-ing', topic: 'prep-purpose' }, 'для + дія (призначення інструмента)', 'This tool is used for cutting metal.']
              ]
            },
            {
              title: '✍️ Спосіб — як? яким чином?',
              head: ['Прийменник', 'Переклад і коли вживаємо', 'Приклад'],
              rows: [
                [{ t: 'by + V-ing', topic: 'prep-manner' }, 'способом, шляхом (також транспорт без артикля: by car)', 'learn by doing · go by bike'],
                [{ t: 'with / in', topic: 'prep-manner' }, 'інструмент / мова, стиль', 'with a pen · in English · in a whisper'],
                [{ t: 'on / via', topic: 'prep-manner' }, 'засіб зв’язку / платформа, маршрут', 'on the phone · via email · via Frankfurt'],
                [{ t: 'without / like / as', topic: 'prep-manner' }, 'без / як (подібність) / у ролі', 'without help · like the wind · as a consultant']
              ]
            }
          ]
        },
        topics: [
          {
            id: 'prep-time', title: 'Час: in / on / at', emoji: '⏰', level: 'A1', minutes: 7,
            theory: {
              intro: 'Класична трійка прийменників часу. Уяви піраміду: вершина — найточніший час.',
              rules: [
                { t: 'at — точка часу', d: 'Години та «моменти»: <b>at 7 o’clock, at night, at the weekend, at Christmas</b>.', ex: [['The lesson starts at 9.', 'Урок починається о 9-й.']] },
                { t: 'on — дні та дати', d: '<b>on Monday, on 5 May, on my birthday</b>.', ex: [['See you on Friday!', 'До зустрічі в п’ятницю!']] },
                { t: 'in — тривалі періоди', d: 'Місяці, роки, сезони, частини дня: <b>in May, in 2024, in summer, in the morning</b>. Також «через якийсь час»: <b>in five minutes</b>.', ex: [['I’ll be back in ten minutes.', 'Я повернуся за десять хвилин.']] }
              ],
              tip: 'Піраміда: at (найточніше) → on (дні) → in (найдовші періоди).'
            },
            exercises: [
              { type: 'choice', q: 'The lesson starts ___ 9 o’clock.', options: ['in', 'on', 'at', 'by'], answer: 2, explain: 'Точний час → at.' },
              { type: 'choice', q: 'My birthday is ___ July.', options: ['in', 'on', 'at', 'by'], answer: 0, explain: 'Місяці → in.' },
              { type: 'choice', q: 'We usually visit grandma ___ Sundays.', options: ['in', 'on', 'at', 'from'], answer: 1, explain: 'Дні тижня → on.' },
              { type: 'choice', q: 'I like reading ___ the evening.', options: ['in', 'on', 'at', 'by'], answer: 0, explain: 'Частини дня → in the evening.' },
              { type: 'fill', q: 'The meeting is ___ 3 May.', answers: ['on'], explain: 'Дати → on.' },
              { type: 'choice', q: 'She always drinks coffee ___ night.', options: ['in', 'on', 'at', 'by'], answer: 2, explain: 'Виняток: at night.' },
              { type: 'choice', q: 'The taxi will be here ___ five minutes.', options: ['in', 'on', 'at', 'after'], answer: 0, explain: '«Через п’ять хвилин» → in.' },
              { type: 'choice', q: 'I was born ___ 1999.', options: ['in', 'on', 'at', 'by'], answer: 0, explain: 'Роки → in.' }
            ]
          },
          {
            id: 'prep-place', title: 'Місце: in / on / at', emoji: '🏠', level: 'A1', minutes: 7,
            theory: {
              intro: 'Та сама трійка, але для місця. Логіка: точка → поверхня → простір.',
              rules: [
                { t: 'at — точка', d: '<b>at the bus stop, at the door, at work, at school</b>.', ex: [['Meet me at the station.', 'Зустрінь мене на вокзалі.']] },
                { t: 'on — поверхня', d: '<b>on the table, on the wall, on the second floor</b>. Також великий транспорт: <b>on the bus / plane / train</b>.', ex: [['Your keys are on the desk.', 'Твої ключі на столі.']] },
                { t: 'in — всередині', d: '<b>in the room, in London, in Ukraine</b>. Малю транспорт: <b>in a car / taxi</b>.', ex: [['She lives in a small town.', 'Вона живе в маленькому містечку.']] }
              ],
              tip: 'Автобус і потяг — це «палуба», на яку заходять: on the bus. А в авто сідають: in the car.'
            },
            exercises: [
              { type: 'choice', q: 'There is a cat ___ the sofa.', options: ['in', 'on', 'at', 'under'], answer: 1, explain: 'Поверхня → on.' },
              { type: 'choice', q: 'She works ___ a hospital.', options: ['in', 'on', 'at', 'by'], answer: 0, explain: 'Всередині будівлі → in.' },
              { type: 'choice', q: 'I’m waiting for you ___ the bus stop.', options: ['in', 'on', 'at', 'under'], answer: 2, explain: 'Точка на карті → at.' },
              { type: 'choice', q: 'We were ___ the plane when it started to rain.', options: ['in', 'on', 'at', 'by'], answer: 1, explain: 'Великий транспорт → on.' },
              { type: 'choice', q: 'He lives ___ a small town ___ the west of Ukraine.', options: ['in / in', 'on / in', 'in / at', 'at / on'], answer: 0, explain: 'Місто → in; частині країни → in the west.' },
              { type: 'fill', q: 'The picture is ___ the wall.', answers: ['on'], explain: 'Поверхня → on.' },
              { type: 'choice', q: 'Her office is ___ the second floor.', options: ['in', 'on', 'at', 'by'], answer: 1, explain: 'Поверхи → on.' },
              { type: 'choice', q: 'Get ___ the car, we’ve arrived!', options: ['in', 'into', 'on', 'at'], answer: 1, explain: 'Рух усередину → into.' }
            ]
          },
          {
            id: 'prep-movement', title: 'Прийменники руху', emoji: '🧭', level: 'A2', minutes: 7,
            theory: {
              intro: 'Коли є рух і напрямок, потрібні спеціальні прийменники: to, into, across, along, through.',
              rules: [
                { t: 'to', d: 'Напрямок до мети: <b>go to school, fly to Paris</b>. Виняток: <b>go home</b> — без to!', ex: [['We go to work at 8.', 'Ми їдемо на роботу о 8-й.']] },
                { t: 'into / out of', d: 'Рух всередину / назовні.', ex: [['He jumped into the water.', 'Він стрибнув у воду.']] },
                { t: 'across / along / through', d: '<b>across</b> — через (з боку в бік), <b>along</b> — вздовж, <b>through</b> — крізь (тунель, ліс, натовп).', ex: [['We walked through the forest.', 'Ми йшли крізь ліс.']] }
              ],
              tip: 'Go home, come home, get home — завжди без to. Це просто запам’ятовуємо.'
            },
            exercises: [
              { type: 'choice', q: 'She goes ___ work by bike.', options: ['to', 'at', 'in', '—'], answer: 0, explain: 'Напрямок → to work.' },
              { type: 'choice', q: 'He jumped ___ the pool.', options: ['to', 'into', 'at', 'across'], answer: 1, explain: 'Рух усередину → into.' },
              { type: 'choice', q: 'Be careful when you go ___ the road.', options: ['across', 'along', 'into', 'at'], answer: 0, explain: 'З одного боку на інший → across.' },
              { type: 'choice', q: 'We walked ___ the bridge to the other side.', options: ['across', 'into', 'at', 'from'], answer: 0, explain: 'Через міст → across.' },
              { type: 'choice', q: 'The train went ___ the tunnel.', options: ['through', 'across', 'on', 'at'], answer: 0, explain: 'Крізь тунель → through.' },
              { type: 'choice', q: 'They are going ___ home now.', options: ['to', '—', 'at', 'into'], answer: 1, explain: 'Go home — без прийменника.' },
              { type: 'fill', q: 'The cat climbed ___ the tree.', answers: ['up'], explain: 'Рух угору → up.' },
              { type: 'choice', q: 'Walk ___ this street and turn left.', options: ['along', 'into', 'through', 'at'], answer: 0, explain: 'Вздовж вулиці → along.' }
            ]
          },
          {
            id: 'prep-agent', title: 'by / with / from — діяч та інструмент', emoji: '🛠️', level: 'B1', minutes: 8,
            theory: {
              intro: 'Ці три малі слова показують, ХТО зробив дію, ЧИМ її зробили і ЗВІДКИ щось прийшло. Особливо важливі в пасивному стані.',
              rules: [
                { t: 'by — виконавець', d: 'Хто (або що) зробив дію. Також спосіб: <b>by car, by bus, by phone, by email</b> — без артикля!', ex: [['The picture was painted by Monet.', 'Картину написав Моне.'], ['I’ll contact you by email.', 'Я напишу тобі імейлом.']] },
                { t: 'with — інструмент', d: 'Чим виконали дію; чим наповнено.', ex: [['He opened the door with a key.', 'Він відкрив двері ключем.'], ['The glass is filled with water.', 'Склянка наповнена водою.']] },
                { t: 'from — джерело', d: 'Звідки щось або від кого.', ex: [['I got a letter from her.', 'Я отримав від неї листа.'], ['This wine is made from grapes.', 'Це вино роблять із винограду.']] }
              ],
              tip: 'Питання-підказка: by відповідає на «ким?», with — на «чим?». Made of — матеріал не змінився (made of wood), made from — змінився (made from grapes).'
            },
            exercises: [
              { type: 'choice', q: '«Hamlet» was written ___ Shakespeare.', options: ['by', 'with', 'from', 'of'], answer: 0, explain: 'Виконавець у пасиві → by.' },
              { type: 'choice', q: 'She cut the cake ___ a knife.', options: ['with', 'by', 'from', 'at'], answer: 0, explain: 'Інструмент → with.' },
              { type: 'choice', q: 'We travelled to Italy ___ car.', options: ['by', 'with', 'in', 'on'], answer: 0, explain: 'Спосіб пересування → by car (без артикля).' },
              { type: 'choice', q: 'This wine is made ___ grapes.', options: ['from', 'by', 'with', 'of'], answer: 0, explain: 'Матеріал змінився (вино ≠ виноград) → from.' },
              { type: 'fill', q: 'I heard the news ___ a friend.', answers: ['from'], explain: 'Джерело інформації → from.' },
              { type: 'fill', q: 'The house was built ___ my grandfather.', answers: ['by'], explain: 'Виконавець → by.' },
              { type: 'reorder', words: ['was opened', 'the door', 'with a key'], answer: 'The door was opened with a key', uk: 'Двері відчинили ключем.' },
              { type: 'reorder', words: ['she spoke', 'to me', 'by phone', 'yesterday'], answer: 'She spoke to me by phone yesterday', uk: 'Учора вона говорила зі мною телефоном.' }
            ]
          },
          {
            id: 'prep-dependent', title: 'Залежні прийменники', emoji: '🔗', level: 'B1', minutes: 9,
            theory: {
              intro: 'Багато слів вимагають конкретного прийменника — логіки мало, просто запам’ятовуємо парою: depend on, interested in, good at.',
              rules: [
                { t: 'Дієслово + прийменник', d: '<b>listen to</b> · <b>wait for</b> · <b>look at</b> · <b>depend on</b> · <b>agree with</b> · <b>apologize for</b> · <b>arrive at/in</b>.', ex: [['I’m waiting for the bus.', 'Я чекаю на автобус.'], ['He apologized for being late.', 'Він вибачився за запізнення.']] },
                { t: 'Прикметник + прийменник', d: '<b>interested in</b> · <b>good at</b> · <b>afraid of</b> · <b>proud of</b> · <b>married to</b> · <b>famous for</b> · <b>different from</b>.', ex: [['She is very good at languages.', 'У неї хист до мов.'], ['Are you interested in art?', 'Ти цікавишся мистецтвом?']] },
                { t: 'Іменник + прийменник', d: '<b>reason for</b> · <b>answer to</b> · <b>solution to</b> · <b>invitation to</b>.', ex: [['What’s the reason for this?', 'Яка причина цього?'], ['I don’t know the answer to this question.', 'Я не знаю відповіді на це питання.']] }
              ],
              tip: 'Вчи слово ОДРАЗУ з прийменником як одне ціле: «залежати ВІД» → depend on. Найчастіша помилка — чекати «за» як for замість wait FOR.'
            },
            exercises: [
              { type: 'choice', q: 'She is very good ___ languages.', options: ['at', 'in', 'on', 'for'], answer: 0, explain: 'good at — мати хист до.' },
              { type: 'choice', q: 'I’m waiting ___ the bus.', options: ['for', 'after', 'to', 'at'], answer: 0, explain: 'wait for — чекати на.' },
              { type: 'choice', q: 'He apologized ___ being late.', options: ['for', 'about', 'of', 'to'], answer: 0, explain: 'apologize for — вибачатися за.' },
              { type: 'choice', q: 'The train arrived ___ the station at noon.', options: ['at', 'in', 'on', 'to'], answer: 0, explain: 'arrive at + конкретне місце (але arrive in + місто).' },
              { type: 'fill', q: 'Are you interested ___ modern art?', answers: ['in'], explain: 'interested in — цікавитися чимось.' },
              { type: 'fill', q: 'I don’t agree ___ you on this one.', answers: ['with'], explain: 'agree with — погоджуватися з кимось.' },
              { type: 'reorder', words: ['depends on', 'it', 'the weather'], answer: 'It depends on the weather', uk: 'Це залежить від погоди.' },
              { type: 'reorder', words: ['is afraid of', 'she', 'spiders'], answer: 'She is afraid of spiders', uk: 'Вона боїться павуків.' }
            ]
          },
          {
            id: 'prep-tricky', title: 'Підступні пари прийменників', emoji: '⚔️', level: 'B2', minutes: 9,
            theory: {
              intro: 'Пари прийменників, які плутають навіть на високому рівні. Кожна — з перекладом і різницею.',
              rules: [
                { t: 'despite (попри) = in spite of', d: '<b>+ іменник або герундій</b>. Після despite НІКОЛИ немає of! <b>although</b> (хоча) натомість вимагає речення.', ex: [['Despite the rain, we went for a walk.', 'Попри дощ, ми пішли гуляти.'], ['Although it was raining, we went for a walk.', 'Хоча йшов дощ, ми пішли гуляти.']] },
                { t: 'because of / due to (через, внаслідок)', d: '<b>+ іменник</b>; а <b>because</b> (тому що) — + речення. <b>due to</b> — формальніше, <b>owing to</b> — офіційне.', ex: [['We stayed home because of the storm.', 'Ми лишилися вдома через шторм.'], ['The road was closed owing to flooding.', 'Дорогу закрили через повінь.']] },
                { t: 'for (протягом) / since (з) / during (під час)', d: '<b>for</b> + тривалість, <b>since</b> + точка старту, <b>during</b> + іменник.', ex: [['I have known her for ten years.', 'Я знаю її десять років.'], ['She fell asleep during the film.', 'Вона заснула під час фільму.']] },
                { t: 'until (аж до) vs by (до — дедлайн)', d: '<b>until</b> — дія триває аж до моменту; <b>by</b> — дедлайн «не пізніше ніж».', ex: [['I work until 6.', 'Я працюю до шостої (увесь час).'], ['Send the report by 6.', 'Надішли звіт до шостої (дедлайн).']] },
                { t: 'over/above (над) vs under/below (під)', d: '<b>over/under</b> — часто з контактом або рухом; <b>above/below</b> — лише позиція вище/нижче.', ex: [['The plane flew above the clouds.', 'Літак летів над хмарами.'], ['Put the book under your pillow.', 'Поклади книжку під подушку.']] },
                { t: 'in front of (перед) vs opposite (навпроти)', d: '<b>in front of</b> — прямо перед чимось; <b>opposite</b> — навпроти, через дорогу/стіл.', ex: [['There is a fountain in front of the museum.', 'Перед музеєм є фонтан.'], ['The bank is opposite the post office.', 'Банк навпроти пошти.']] }
              ],
              tip: 'Міні-тест для себе: після цього слова йде ІМЕННИК чи РЕЧЕННЯ? Despite + іменник, although + речення — і помилка зникне.'
            },
            exercises: [
              { type: 'choice', q: '___ the rain, we went for a walk.', options: ['Despite', 'Although', 'Because', 'During'], answer: 0, explain: 'despite + іменник (the rain).' },
              { type: 'choice', q: 'We stayed inside ___ the storm.', options: ['during', 'until', 'since', 'despite'], answer: 0, explain: 'during + іменник: протягом шторму.' },
              { type: 'choice', q: 'Please send the report ___ Friday. (дедлайн)', options: ['by', 'until', 'during', 'since'], answer: 0, explain: 'Дедлайн «не пізніше» → by.' },
              { type: 'choice', q: 'He has lived here ___ 2015.', options: ['since', 'for', 'during', 'until'], answer: 0, explain: 'Точка старту → since.' },
              { type: 'fill', q: 'I have known her ___ ten years.', answers: ['for'], explain: 'Тривалість → for.' },
              { type: 'fill', q: 'She passed the exam in spite ___ being ill.', answers: ['of'], explain: 'in spite of — попри.' },
              { type: 'reorder', words: ['the plane', 'flew above', 'the clouds'], answer: 'The plane flew above the clouds', uk: 'Літак летів над хмарами.' },
              { type: 'reorder', words: ['in front of', 'there is a fountain', 'the museum'], answer: 'There is a fountain in front of the museum', uk: 'Перед музеєм є фонтан.' }
            ]
          },
          {
            id: 'prep-cause', title: 'Причина: through що? чому?', emoji: '💥', level: 'B2', minutes: 9,
            theory: {
              intro: 'Коли треба сказати «через щось», «завдяки» чи «з почуття» — в англійської є ціла родина прийменників причини, і кожен має свій відтінок.',
              rules: [
                { t: 'because of / due to / owing to — через', d: '<b>+ іменник</b>. «Через, внаслідок». <b>due to</b> і <b>owing to</b> — формальніші (новини, документи).', ex: [['The flight was delayed due to technical problems.', 'Рейс затримали через технічні проблеми.'], ['The road was closed owing to flooding.', 'Дорогу закрили через повінь.']] },
                { t: 'thanks to — завдяки', d: 'Позитивна причина: щось вдалося ЗАВДЯКИ комусь/чомусь.', ex: [['Thanks to her help, we finished on time.', 'Завдяки її допомозі ми встигли вчасно.'], ['Thanks to modern medicine, many diseases are curable.', 'Завдяки сучасній медицині багато хвороб виліковні.']] },
                { t: 'out of — з (почуття, мотив)', d: 'Дія з внутрішнього мотиву: <b>out of jealousy</b> — з ревнощів, <b>out of curiosity</b> — з цікавості.', ex: [['He acted out of jealousy.', 'Він вчинив так з ревнощів.'], ['She helped him out of a sense of duty.', 'Вона допомогла йому з почуття обов’язку.']] },
                { t: 'from / with — від', d: '<b>from</b> — стан, хвороба: suffer from, die from. <b>with</b> — видима фізична реакція: тремтіти ВІД страху.', ex: [['He suffers from chronic back pain.', 'Він страждає від хронічного болю в спині.'], ['She was shaking with cold.', 'Її трусило від холоду.']] }
              ],
              tip: 'Формула вибору: негативна/нейтральна причина → because of / due to; позитивна → thanks to; емоція-мотив → out of; фізична реакція → with.'
            },
            exercises: [
              { type: 'choice', q: 'The flight was delayed ___ technical problems.', options: ['due to', 'thanks to', 'out of', 'because'], answer: 0, explain: 'Причина — іменник, нейтральна/офіційна → due to.' },
              { type: 'choice', q: '___ her effort, the project succeeded.', options: ['Thanks to', 'Because of', 'Owing to', 'Out of'], answer: 0, explain: 'Позитивна причина → thanks to.' },
              { type: 'choice', q: 'He was trembling ___ fear.', options: ['with', 'because of', 'due to', 'from'], answer: 0, explain: 'Видима фізична реакція → trembling with fear.' },
              { type: 'choice', q: 'She suffers ___ migraines every week.', options: ['from', 'with', 'out of', 'because of'], answer: 0, explain: 'Страждає від стану/хвороби → suffer from.' },
              { type: 'fill', q: 'He acted ___ jealousy. (з почуття)', answers: ['out of'], explain: 'Внутрішній мотив → out of.' },
              { type: 'fill', q: 'The road was closed ___ flooding. (через, офіційно)', answers: ['owing to', 'due to'], explain: 'Офіційне «через» → owing to (також ок due to).' },
              { type: 'reorder', words: ['thanks to', 'we finished on time', 'her help'], answer: 'Thanks to her help we finished on time', uk: 'Завдяки її допомозі ми встигли вчасно.' },
              { type: 'choice', q: 'She gave money to charity ___ kindness.', options: ['out of', 'due to', 'thanks to', 'from'], answer: 0, explain: 'З почуття доброти → out of kindness.' }
            ]
          },
          {
            id: 'prep-purpose', title: 'Мета: for, to, in order to, so that', emoji: '🎯', level: 'B1', minutes: 9,
            theory: {
              intro: '«Щоб» і «для» англійською — це цілий набір конструкцій. Вибір залежить від того, що стоїть після: іменник, інфінітив чи ціле речення.',
              rules: [
                { t: 'for + іменник — для', d: 'Призначення, вигода, мета-іменник.', ex: [['a gift for you', 'подарунок для тебе'], ['He went abroad for a year of experience.', 'Він поїхав за кордон заради року досвіду.']] },
                { t: 'to / in order to / so as to — щоб + інфінітив', d: 'Найпоширеніший спосіб. <b>in order to</b> і <b>so as to</b> — формальніші. Заперечення: <b>so as not to</b>.', ex: [['She went to the gym to lose weight.', 'Вона пішла в зал, щоб схуднути.'], ['She spoke quietly so as not to wake the baby.', 'Вона говорила тихо, щоб не розбудити немовля.']] },
                { t: 'so that — щоб + речення', d: 'Коли після «щоб» іде повне речення з підметом і дієсловом (часто can/could/will).', ex: [['She saved money so that she could travel.', 'Вона відкладала гроші, щоб могла подорожувати.']] },
                { t: 'for + V-ing — призначення', d: 'Для чого призначений предмет: <b>used for cutting</b>.', ex: [['This tool is used for cutting metal.', 'Цей інструмент використовують для різання металу.']] }
              ],
              tip: 'Пастка: НЕ кажіть «to + V-ing» для мети. I went to the shop to buy milk (не «for buying»).'
            },
            exercises: [
              { type: 'choice', q: 'This tool is used ___ cutting metal.', options: ['for', 'to', 'in order', 'so that'], answer: 0, explain: 'Призначення інструмента → for + V-ing.' },
              { type: 'choice', q: 'She went to the gym ___ lose weight.', options: ['to', 'for', 'so that', 'in order'], answer: 0, explain: 'Мета + інфінітив → to.' },
              { type: 'choice', q: 'He spoke quietly ___ wake the baby.', options: ['so as not to', 'for not', 'to not', 'as not to'], answer: 0, explain: 'Заперечення мети → so as not to.' },
              { type: 'choice', q: 'She saved money ___ she could travel.', options: ['so that', 'in order to', 'for', 'to'], answer: 0, explain: 'Після «щоб» — повне речення → so that.' },
              { type: 'fill', q: 'I study English ___ ___ get a better job. (офіційніше «щоб»)', answers: ['in order to'], explain: 'Формальніша мета + інфінітив → in order to.' },
              { type: 'fill', q: 'He went abroad ___ experience. (заради)', answers: ['for'], explain: 'Мета-іменник → for.' },
              { type: 'reorder', words: ['she left early', 'in order to', 'catch the train'], answer: 'She left early in order to catch the train', uk: 'Вона вийшла раніше, щоб встигнути на потяг.' },
              { type: 'choice', q: 'Оберіть правильне речення:', options: ['I called to confirm the booking.', 'I called for confirm the booking.', 'I called to confirming the booking.', 'I called so that confirm the booking.'], answer: 0, explain: 'Мета → to + інфінітив.' }
            ]
          },
          {
            id: 'prep-manner', title: 'Спосіб: як? яким чином?', emoji: '✍️', level: 'B2', minutes: 9,
            theory: {
              intro: 'Як саме виконана дія? Способом (by), інструментом (with), мовою чи стилем (in), каналом (on / via) — кожен прийменник відповідає на своє «як?».',
              rules: [
                { t: 'by — способом', d: '<b>by + V-ing</b> — яким чином; транспорт ЗАВЖДИ без артикля: <b>by car, by bike, by post</b>.', ex: [['You learn a language by practising.', 'Мову вчиш, практикуючись.'], ['She goes to work by bike.', 'Вона їздить на роботу велосипедом.']] },
                { t: 'with / in — інструмент / стиль', d: '<b>with</b> — фізичний інструмент; <b>in</b> — мова, стиль, стан.', ex: [['He wrote the letter with a blue pen.', 'Він написав листа синьою ручкою.'], ['She spoke in a whisper.', 'Вона говорила пошепки.']] },
                { t: 'on / via — засіб зв’язку / платформа', d: '<b>on</b> — телефон, радіо, ТБ; <b>via</b> — через платформу чи маршрут.', ex: [['I heard the news on the radio.', 'Я почув новини по радіо.'], ['They communicate via video calls.', 'Вони спілкуються через відеодзвінки.']] },
                { t: 'without / like / as', d: '<b>without</b> — без; <b>like</b> — як (подібність); <b>as</b> — у ролі.', ex: [['She left without saying a word.', 'Вона пішла, не сказавши й слова.'], ['He works as a consultant.', 'Він працює консультантом.']] }
              ],
              tip: 'Like vs as: «співає як Анджеліна» (схоже) — sings LIKE her; «працює як консультант» (роль) — works AS a consultant.'
            },
            exercises: [
              { type: 'choice', q: 'She sent the documents ___ email.', options: ['by', 'with', 'in', 'at'], answer: 0, explain: 'Спосіб передачі → by (також ок via).' },
              { type: 'choice', q: 'He wrote the letter ___ a blue pen.', options: ['with', 'by', 'in', 'on'], answer: 0, explain: 'Фізичний інструмент → with.' },
              { type: 'choice', q: 'She spoke ___ a whisper.', options: ['in', 'with', 'by', 'at'], answer: 0, explain: 'Стиль/манера → in a whisper.' },
              { type: 'choice', q: 'He works ___ a consultant.', options: ['as', 'like', 'for', 'by'], answer: 0, explain: 'Роль/функція → as.' },
              { type: 'fill', q: 'I heard the news ___ the radio.', answers: ['on'], explain: 'Засіб зв’язку → on the radio.' },
              { type: 'fill', q: 'She left ___ saying a word.', answers: ['without'], explain: 'Без чогось → without.' },
              { type: 'reorder', words: ['she goes to work', 'by bike'], answer: 'She goes to work by bike', uk: 'Вона їздить на роботу велосипедом.' },
              { type: 'reorder', words: ['he learned it', 'through practice'], answer: 'He learned it through practice', uk: 'Він навчився цьому через практику.' }
            ]
          }
        ]
      },
      /* ---------- МОДАЛЬНІ ---------- */
      {
        id: 'modals', title: 'Модальні дієслова', emoji: '💪',
        desc: 'can, must, have to, should та інші — здатність, обов’язок, ймовірність і поради.',
        cheat: {
          title: 'модальні дієслова та їхня «суперсила»',
          head: ['Дієслово', 'Значення', 'Приклад'],
          rows: [
            [{ t: 'can / could', topic: 'can-could' }, 'здатність · дозвіл · ввічливе прохання', 'I can swim. Could you help me?'],
            [{ t: 'must / have to', topic: 'must-have-to' }, 'must — обов’язок і впевнений висновок; have to — зовнішні обставини', 'You must stop. I have to work on Sundays.'],
            [{ t: 'should', topic: 'should' }, 'порада, рекомендація', 'You should see a doctor.'],
            [{ t: 'may / might', topic: 'may-might' }, 'дозвіл (формальний) · ймовірність', 'It may rain. She might come.'],
            [{ t: 'must / can’t / might + be', topic: 'deduction' }, 'впевнені припущення: майже так / неможливо / можливо', 'He must be tired. It can’t be true.'],
            [{ t: 'mustn’t / don’t have to', topic: 'may-might' }, 'заборона / відсутність обов’язку — НЕ плутати!', 'You mustn’t smoke here. You don’t have to pay.'],
            [{ t: 'should have / could have + V3', topic: 'modal-perfect' }, 'треба було / міг би (але не зробив)', 'You should have called. We could have won.'],
            [{ t: 'needn’t have + V3 ≠ didn’t need to', topic: 'modal-perfect' }, 'зробив, а даремно / не було потреби', 'I needn’t have cooked — they’d eaten.']
          ]
        },
        topics: [
          {
            id: 'can-could', title: 'can / could', emoji: '🤸', level: 'A1', minutes: 6,
            theory: {
              intro: 'Can виражає вміння та можливість, could — минулий час або ввічливе прохання.',
              rules: [
                { t: 'Вміння', d: '<b>can</b> — зараз, <b>could</b> — у минулому.', ex: [['I can swim.', 'Я вмію плавати.'], ['I could read when I was five.', 'Я вмів читати з п’яти років.']] },
                { t: 'Прохання', d: '<b>Can you help me?</b> — звичайне; <b>Could you help me?</b> — ввічливіше.', ex: [] },
                { t: 'Без to!', d: 'Після can/could дієслово стоїть без частки to і без закінчень.', ex: [['She can speak three languages. ✅', 'She can to speak… ❌']] }
              ],
              tip: 'Can’t часто звучить як /kɑːnt/ — тренуй сприйняття на слух.'
            },
            exercises: [
              { type: 'choice', q: 'My little brother ___ already read.', options: ['can', 'must', 'should', 'may'], answer: 0, explain: 'Вміння → can.' },
              { type: 'choice', q: '___ you pass me the salt, please?', options: ['Can', 'Must', 'Need', 'Should'], answer: 0, explain: 'Прохання → can.' },
              { type: 'choice', q: 'I ___ swim when I was five.', options: ['can', 'could', 'must', 'should'], answer: 1, explain: 'Вміння в минулому → could.' },
              { type: 'choice', q: 'Оберіть правильне речення:', options: ['She can speak three languages.', 'She can speaks three languages.', 'She can to speak three languages.', 'She cans speak three languages.'], answer: 0, explain: 'Після can — інфінітив без to і без -s.' },
              { type: 'fill', q: 'Sorry, I ___ come to the party tomorrow.', hint: 'not / can', answers: ["can't", 'cannot', 'can not'], explain: 'Заперечення: can’t / cannot.' },
              { type: 'choice', q: 'When I was younger, I ___ run very fast.', options: ['could', 'can', 'may', 'must'], answer: 0, explain: 'Минуле вміння → could.' },
              { type: 'choice', q: 'Оберіть найввічливіше прохання:', options: ['Could you open the door, please?', 'Must you open the door?', 'Should you open the door?', 'You open the door.'], answer: 0, explain: 'Could — ввічливіша форма прохання.' },
              { type: 'fill', q: '___ I use your phone? My battery is dead.', answers: ['can', 'could'], explain: 'Дозвіл: Can/Could I…?' }
            ]
          },
          {
            id: 'must-have-to', title: 'must / have to', emoji: '⚠️', level: 'A2', minutes: 7,
            theory: {
              intro: 'Обидва — про обов’язок, але джерело обов’язку різне. А ще є підступна пара mustn’t ≠ don’t have to.',
              rules: [
                { t: 'must', d: 'Особисте рішення, сильна порада, наказ.', ex: [['You must see this film!', 'Тобі обов’язково треба подивитися цей фільм!']] },
                { t: 'have to', d: 'Зовнішні обставини: правила, графіки, закони.', ex: [['I have to work on Saturdays.', 'Мушу працювати по суботах. (так треба на роботі)']] },
                { t: 'Головна пастка', d: '<b>mustn’t</b> = заборонено. <b>don’t have to</b> = не обов’язково (можна, якщо хочеш).', ex: [['You mustn’t smoke here. = Не можна.', 'You don’t have to pay. = Не треба, безкоштовно.']] }
              ],
              tip: 'Запитай себе: «Це заборона чи відсутність потреби?» — і обирай між mustn’t і don’t have to.'
            },
            exercises: [
              { type: 'choice', q: 'You ___ smoke in hospitals. It’s prohibited.', options: ["mustn't", "don't have to", 'can', 'should'], answer: 0, explain: 'Заборона → mustn’t.' },
              { type: 'choice', q: 'Tomorrow is Sunday. I ___ get up early.', options: ["mustn't", "don't have to", "can't", "shouldn't"], answer: 1, explain: 'Немає потреби → don’t have to.' },
              { type: 'choice', q: 'The museum is free. You ___ pay.', options: ["mustn't", "don't have to", "can't", 'may not'], answer: 1, explain: 'Не обов’язково → don’t have to.' },
              { type: 'choice', q: 'You look terrible. You ___ see a doctor!', options: ['must', 'may', 'might', 'can'], answer: 0, explain: 'Сильна порада → must.' },
              { type: 'fill', q: 'Students ___ wear a uniform at this school. (правило школи)', answers: ['have to', 'must'], explain: 'Зовнішнє правило → have to (must теж пасує).' },
              { type: 'choice', q: 'I ___ go now — my taxi is waiting.', options: ['must', "can't", 'may not', "shouldn't"], answer: 0, explain: 'Особисте рішення в моменті → must.' },
              { type: 'choice', q: 'You ___ touch the animals in the zoo. It’s dangerous.', options: ["mustn't", "don't have to", 'may', 'could'], answer: 0, explain: 'Небезпека і заборона → mustn’t.' },
              { type: 'choice', q: 'She ___ work two jobs to pay the rent.', options: ['has to', 'musts', 'have to', 'must to'], answer: 0, explain: 'She + has to.' }
            ]
          },
          {
            id: 'should', title: 'should — поради', emoji: '🤝', level: 'A2', minutes: 6,
            theory: {
              intro: 'Should — м’яка порада або рекомендація: «варто було б…».',
              rules: [
                { t: 'Порада', d: '<b>should / shouldn’t</b> + інфінітив.', ex: [['You should drink more water.', 'Тобі варто пити більше води.']] },
                { t: 'Минуле: should have + V3', d: 'Дорікання чи жаль про минуле.', ex: [['You should have called me.', 'Треба було мені подзвонити.']] },
                { t: 'Синонім', d: '<b>ought to</b> = should, трохи формальніше.', ex: [['You ought to rest more.', 'Тобі варто більше відпочивати.']] }
              ],
              tip: 'Should не про накази — це дружня рекомендація. Для заборон є mustn’t.'
            },
            exercises: [
              { type: 'choice', q: 'You look tired. You ___ go to bed earlier.', options: ['should', 'must not', "can't", 'may'], answer: 0, explain: 'Порада → should.' },
              { type: 'choice', q: 'You ___ eat so much sugar. It’s bad for your teeth.', options: ["shouldn't", "don't have to", "can't", 'may not'], answer: 0, explain: 'Порада-застереження → shouldn’t.' },
              { type: 'choice', q: '___ I take an umbrella? It looks cloudy.', options: ['Should', 'Must', "Couldn't", 'May not'], answer: 0, explain: 'Питаємо поради → Should I…?' },
              { type: 'fill', q: 'You ___ apologize to her. It was your mistake.', answers: ['should'], explain: 'Рекомендація → should.' },
              { type: 'choice', q: 'You should have ___ me about the meeting.', options: ['told', 'tell', 'telling', 'tells'], answer: 0, explain: 'should have + V3: told.' },
              { type: 'choice', q: 'His lights are on — he ___ be at home.', options: ['should', "shouldn't", "can't", 'must not'], answer: 0, explain: 'Очікування «мав би бути» → should.' },
              { type: 'choice', q: 'Оберіть правильне речення:', options: ['You ought to rest more.', 'You ought rest more.', 'You ought to resting more.', 'You oughts to rest.'], answer: 0, explain: 'Ought to + інфінітив.' },
              { type: 'choice', q: 'You’ve got an exam on Friday. You ___ study every evening.', options: ['should', 'may', 'might', "can't"], answer: 0, explain: 'Порада → should.' }
            ]
          },
          {
            id: 'may-might', title: 'may / might — дозвіл і ймовірність', emoji: '🎲', level: 'B1', minutes: 8,
            theory: {
              intro: 'may і might говорять про ДОЗВІЛ і ЙМОВІРНІСТЬ. might звучить обережніше — шанс менший. А ще тут ховається найпідступніша пара: mustn’t ≠ don’t have to.',
              rules: [
                { t: 'Дозвіл', d: '<b>May I…?</b> — формальний ввічливий дозвіл.', ex: [['May I use your phone?', 'Можна скористатися твоїм телефоном?'], ['You may go now.', 'Можете йти.']] },
                { t: 'Ймовірність', d: '<b>may</b> — можливо (десь 50/50); <b>might</b> — менш упевнено.', ex: [['It may rain later.', 'Можливо, пізніше буде дощ.'], ['She might come to the party.', 'Вона, може, й прийде на вечірку (не певен).']] },
                { t: 'mustn’t ≠ don’t have to', d: '<b>mustn’t</b> = заборона («не можна!»); <b>don’t have to</b> = немає обов’язку («можна, але не треба»).', ex: [['You mustn’t take photos here.', 'Тут заборонено фотографувати.'], ['You don’t have to pay — it’s free.', 'Платити не треба — це безкоштовно.']] }
              ],
              tip: 'Заперечення ймовірності — may not / might not. А от «не може бути, що…» — це вже can’t, не mustn’t!'
            },
            exercises: [
              { type: 'choice', q: '___ I use your phone? Mine is dead.', options: ['May', 'Must', 'Should', 'Will'], answer: 0, explain: 'Ввічливе прохання дозволу → May I…?' },
              { type: 'choice', q: 'Take an umbrella. It ___ rain later.', options: ['might', 'mustn’t', 'shouldn’t', 'can’t'], answer: 0, explain: 'Невпевнена ймовірність → might.' },
              { type: 'choice', q: 'It’s free. You ___ pay anything.', options: ["don't have to", "mustn't", "may not", "couldn't"], answer: 0, explain: 'Немає обов’язку (але можна) → don’t have to.' },
              { type: 'choice', q: 'You ___ smoke in hospital. It’s forbidden.', options: ["mustn't", "don't have to", "might not", "shouldn't have"], answer: 0, explain: 'Заборона → mustn’t.' },
              { type: 'fill', q: 'She isn’t sure yet. She ___ join us tomorrow. (можливо)', answers: ['might', 'may'], explain: 'Невпевнена ймовірність → might або may.' },
              { type: 'fill', q: '___ I sit here? (формальний дозвіл)', answers: ['May'], explain: 'Формальний дозвіл → May I…?' },
              { type: 'reorder', words: ['it', 'might', 'rain', 'this evening'], answer: 'It might rain this evening', uk: 'Увечері, можливо, буде дощ.' },
              { type: 'reorder', words: ['you', "don't have to", 'hurry', 'we have time'], answer: "You don't have to hurry we have time", uk: 'Можна не поспішати — у нас є час.' }
            ]
          },
          {
            id: 'deduction', title: 'must / can’t / might — припущення', emoji: '🕵️', level: 'B2', minutes: 9,
            theory: {
              intro: 'Коли ми «детективи» — робимо висновки з доказів. Англійська має для цього спеціальні модальні інструменти: від «майже впевнений» до «можливо».',
              rules: [
                { t: 'Майже впевнений: must', d: '<b>must + V</b> — «має бути, напевно так».', ex: [['He has been working for 12 hours. He must be exhausted.', 'Він працював 12 годин — має бути виснажений.']] },
                { t: 'Неможливо: can’t', d: '<b>can’t + V</b> — «не може бути» (протилежність must у припущеннях; НЕ mustn’t!).', ex: [['That can’t be Anna — she’s in Paris.', 'Це не може бути Анна — вона в Парижі.']] },
                { t: 'Можливо: might / could / may', d: 'Невпевнене припущення.', ex: [['She could be at home now.', 'Вона, можливо, зараз удома.']] },
                { t: 'Припущення про минуле', d: '<b>must have + V3</b>, <b>can’t have + V3</b>, <b>might have + V3</b>.', ex: [['The keys must have fallen under the sofa.', 'Ключі, напевно, впали під диван.'], ['He can’t have left — his car is here.', 'Не може бути, щоб він поїхав — його авто тут.']] }
              ],
              tip: 'Схема проста: доказ → впевненість. Впевнений «так» → must, впевнений «ні» → can’t, сумніваєшся → might/could.'
            },
            exercises: [
              { type: 'choice', q: 'He has been working all day. He ___ be exhausted.', options: ['must', "mustn't", "shouldn't", 'can'], answer: 0, explain: 'Сильний висновок із доказу → must.' },
              { type: 'choice', q: 'That ___ be Anna — she is in Paris right now.', options: ["can't", "mustn't", "shouldn't", "won't"], answer: 0, explain: 'Неможливо → can’t (не mustn’t!).' },
              { type: 'choice', q: 'I can’t find my keys. I ___ them in the office.', options: ['must have left', 'must leave', 'can’t have left', 'might leaving'], answer: 0, explain: 'Впевнений висновок про минуле → must have + V3.' },
              { type: 'choice', q: 'Someone is knocking. It ___ be Mark — he always visits at this time.', options: ['could', "mustn't", "can't have", 'should to'], answer: 0, explain: 'Можливе припущення → could (також ок might/may).' },
              { type: 'fill', q: 'You’ve just eaten — you ___ be hungry already!', answers: ["can't", 'cannot'], explain: 'Не може бути, щоб… → can’t.' },
              { type: 'fill', q: 'She speaks five languages. She ___ be very smart.', answers: ['must'], explain: 'Впевнений висновок → must.' },
              { type: 'reorder', words: ['he', 'must', 'be', 'tired'], answer: 'He must be tired', uk: 'Він, напевно, втомлений.' },
              { type: 'reorder', words: ['they', 'might have fallen', 'behind the sofa'], answer: 'They might have fallen behind the sofa', uk: 'Вони могли впасти за диван.' }
            ]
          },
          {
            id: 'modal-perfect', title: 'should have / could have / needn’t have — модальні в минулому', emoji: '⏮️', level: 'B2', minutes: 10,
            theory: {
              intro: '«Треба було», «міг би», «даремно я…» — жалі, критика й упущені можливості. Формула одна на всіх: модальне + have + V3.',
              rules: [
                { t: 'should have + V3 — треба було', d: 'Жаль або критика: треба було, а не зробили. <b>shouldn’t have + V3</b> — не треба було, а зробили.', ex: [['I should have studied harder.', 'Треба було старанніше вчитися.'], ['You shouldn’t have told her.', 'Не треба було їй казати.']] },
                { t: 'could have + V3 — міг би', d: 'Упущена можливість або закид «міг би й…».', ex: [['You could have called me!', 'Міг би мені й подзвонити!'], ['We could have won the match.', 'Ми могли виграти матч.']] },
                { t: 'would have + V3 — зробив би', d: 'Уявна дія в минулому, часто з if (Third Conditional).', ex: [['I would have helped you, but I didn’t know.', 'Я б тобі допоміг, але не знав.']] },
                { t: 'needn’t have ≠ didn’t need to', d: '<b>needn’t have + V3</b> — зробив, а виявилося, що не треба було. <b>didn’t need to + V</b> — потреби не було (зазвичай і не робив).', ex: [['I needn’t have cooked — they had already eaten.', 'Даремно я готував — вони вже поїли.'], ['I didn’t need to cook, so I watched TV.', 'Готувати не треба було, тож я дивився телевізор.']] },
                { t: 'Нагадування: припущення про минуле', d: '<b>must have</b> — напевно; <b>might / may / could have</b> — можливо; <b>can’t have</b> — не може бути.', ex: [['She must have missed the train.', 'Вона, напевно, запізнилася на потяг.']] }
              ],
              tip: 'Після модального — завжди have (не has, не had): She should have come ✓. У мові звучить should’ve, could’ve — але пишеться НЕ «should of»!'
            },
            exercises: [
              { type: 'choice', q: 'I failed the test. I ___ harder.', options: ['should have studied', 'should study', 'must have studied', 'could study'], answer: 0, explain: 'Жаль про минуле → should have + V3.' },
              { type: 'choice', q: 'You ___ me! I would have picked you up from the station.', options: ['could have called', 'should call', 'must have called', 'can call'], answer: 0, explain: 'Закид, упущена можливість → could have + V3.' },
              { type: 'choice', q: 'I ___ so much food — nobody was hungry.', options: ['needn’t have cooked', 'didn’t need cook', 'mustn’t have cooked', 'shouldn’t cook'], answer: 0, explain: 'Зробив, але даремно → needn’t have + V3.' },
              { type: 'choice', q: 'You ___ her secret. Now she’s upset.', options: ['shouldn’t have told', 'shouldn’t tell', 'couldn’t have told', 'needn’t tell'], answer: 0, explain: 'Критика вчинку → shouldn’t have + V3.' },
              { type: 'choice', q: 'It was a public holiday, so I ___ get up early.', options: ['didn’t need to', 'needn’t have', 'shouldn’t have', 'mustn’t'], answer: 0, explain: 'Потреби не було (і не вставав) → didn’t need to.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['She should have come earlier.', 'She should has come earlier.', 'She should of come earlier.', 'She should have came earlier.'], answer: 0, explain: 'should + have + V3 (come).' },
              { type: 'fill', q: 'I ___ have helped you, but you didn’t ask. (би)', answers: ['would', 'could'], explain: 'would / could have + V3.' },
              { type: 'fill', q: 'We should have ___ a taxi.', hint: 'to take', answers: ['taken'], explain: 'V3 від take → taken.' },
              { type: 'fill', q: 'The streets are wet. It must ___ rained at night.', answers: ['have'], explain: 'must have + V3.' },
              { type: 'reorder', words: ['you', 'should have', 'told me', 'the truth'], answer: 'You should have told me the truth', uk: 'Треба було сказати мені правду.' }
            ]
          }
        ]
      },
      /* ---------- УМОВНІ ---------- */
      {
        id: 'conditionals', title: 'Умовні речення', emoji: '🔀',
        desc: 'Zero, First, Second, Third та Mixed Conditionals — від фактів до жалю.',
        cheat: {
          title: 'п’ять типів умовних речень',
          head: ['Тип', 'Схема', 'Приклад'],
          rows: [
            [{ t: 'Zero — факти', topic: 'zero-first' }, 'If + PresS, PresS', 'If you heat ice, it melts.'],
            [{ t: 'First — реальне майбутнє', topic: 'zero-first' }, 'If + PresS, will + V', 'If it rains, we will stay home.'],
            [{ t: 'Second — уявне тепер', topic: 'second-conditional' }, 'If + Past, would + V', 'If I had time, I would travel.'],
            [{ t: 'Third — жаль про минуле', topic: 'third-conditional' }, 'If + Past Perf, would have + V3', 'If I had known, I would have called.'],
            [{ t: 'Mixed — минуле → тепер', topic: 'mixed-conditional' }, 'If + Past Perf, would + V', 'If I had studied, I would be fluent now.'],
            [{ t: 'wish + Past / could · wish + Past Perfect', topic: 'regret-reflection' }, 'жаль про тепер / про минуле', 'I wish I could swim. · I wish I had called.'],
            [{ t: 'should have · regret -ing · looking back', topic: 'regret-reflection' }, 'треба було · шкодую, що зробив · оглядаючись назад', 'I regret saying that.']
          ]
        },
        topics: [
          {
            id: 'zero-first', title: 'Zero & First Conditional', emoji: '🔗', level: 'A2', minutes: 8,
            theory: {
              intro: 'Zero — загальні істини, First — реальні умови в майбутньому.',
              rules: [
                { t: 'Zero Conditional', d: '<b>If + Present Simple, Present Simple</b> — факти та закономірності.', ex: [['If you heat ice, it melts.', 'Якщо нагріти лід, він тане.']] },
                { t: 'First Conditional', d: '<b>If + Present Simple, will + V1</b> — реальна умова в майбутньому.', ex: [['If it rains, we will stay at home.', 'Якщо буде дощ, залишимося вдома.']] },
                { t: 'Головне правило', d: 'Після <b>if</b> ніколи не ставимо will!', ex: [['If I see him, I’ll tell him. ✅', 'If I will see him… ❌']] }
              ],
              tip: 'Бачиш if — автоматично перевіряй, чи немає поруч зайвого will.'
            },
            exercises: [
              { type: 'choice', q: 'If you heat water to 100°C, it ___.', options: ['boils', 'will boil', 'boiled', 'would boil'], answer: 0, explain: 'Zero Conditional — загальна істина.' },
              { type: 'choice', q: 'If it rains tomorrow, we ___ at home.', options: ['stay', 'will stay', 'would stay', 'stayed'], answer: 1, explain: 'First Conditional: will у головній частині.' },
              { type: 'choice', q: 'Оберіть правильне речення:', options: ['If I see Anna, I will tell her.', 'If I will see Anna, I will tell her.', 'If I see Anna, I would tell her.', 'If I saw Anna, I will tell her.'], answer: 0, explain: 'Після if — Present Simple, без will.' },
              { type: 'fill', q: 'If she ___ hard, she will pass the exam.', hint: 'to study', answers: ['studies'], explain: 'If + Present Simple: she studies.' },
              { type: 'choice', q: 'You will miss the train if you ___ now.', options: ["don't leave", "won't leave", "didn't leave", "wouldn't leave"], answer: 0, explain: 'В умовній частині — Present Simple.' },
              { type: 'reorder', words: ['I', 'will', 'if', 'you', 'come', 'wait'], answer: 'I will wait if you come', uk: 'Я зачекаю, якщо ти прийдеш.' },
              { type: 'choice', q: 'If I ___ time tonight, I will watch a film.', options: ['have', 'will have', 'had', 'would have'], answer: 0, explain: 'If + Present Simple.' },
              { type: 'fill', q: 'Unless you ___, you will be late.', hint: 'to hurry', answers: ['hurry'], explain: 'Unless = if not; далі Present Simple.' }
            ]
          },
          {
            id: 'second-conditional', title: 'Second Conditional', emoji: '💭', level: 'B1', minutes: 8,
            theory: {
              intro: 'Уявні, нереальні ситуації в теперішньому чи майбутньому: «якби та якби…».',
              rules: [
                { t: 'Форма', d: '<b>If + Past Simple, would + V1</b>.', ex: [['If I won the lottery, I would travel the world.', 'Якби я виграв у лотерею, я б подорожував світом.']] },
                { t: 'If I were you', d: 'Класична порада. Зwere вживається для всіх осіб.', ex: [['If I were you, I would take the job.', 'На твоєму місці я б узяв цю роботу.']] },
                { t: 'Сенс', d: 'Ситуація уявна: я не виграв лотерею і, скоріш за все, не виграю.', ex: [] }
              ],
              tip: 'Past Simple тут не про минуле, а про «нереальність». Не плутай із часом!'
            },
            exercises: [
              { type: 'choice', q: 'If I ___ more money, I would buy a car.', options: ['have', 'had', 'will have', 'would have'], answer: 1, explain: 'If + Past Simple: had.' },
              { type: 'choice', q: 'What would you do if you ___ the lottery?', options: ['win', 'won', 'will win', 'would win'], answer: 1, explain: 'В умовній частині — Past Simple.' },
              { type: 'choice', q: 'Порада: If I ___ you, I would talk to her.', options: ['am', 'was', 'were', 'be'], answer: 2, explain: 'Стала форма: If I were you.' },
              { type: 'fill', q: 'If she lived closer, we ___ more often.', hint: 'to meet', answers: ['would meet'], explain: 'Головна частина: would + V1.' },
              { type: 'choice', q: 'Оберіть правильне речення:', options: ['If I had wings, I would fly to you.', 'If I have wings, I would fly to you.', 'If I had wings, I will fly to you.', 'If I would have wings, I would fly.'], answer: 0, explain: 'If + Past Simple, would + V1.' },
              { type: 'choice', q: 'I ___ around the world if I didn’t have to work.', options: ['travel', 'would travel', 'will travel', 'travelled'], answer: 1, explain: 'Уявна ситуація → would travel.' },
              { type: 'choice', q: 'If I ___ the answer, I would tell you.', options: ['know', 'knew', 'known', 'will know'], answer: 1, explain: 'If + Past Simple: knew.' },
              { type: 'reorder', words: ['if', 'I', 'rich', 'were', 'would', 'travel', 'I'], answer: 'If I were rich I would travel', uk: 'Якби я був багатий, я б подорожував.' }
            ]
          },
          {
            id: 'third-conditional', title: 'Third Conditional', emoji: '⏳', level: 'B1', minutes: 9,
            theory: {
              intro: 'Жаль про минуле: уявляємо, як усе могло б бути, якби минуле склалося інакше.',
              rules: [
                { t: 'Форма', d: '<b>If + Past Perfect, would have + V3</b>.', ex: [['If I had known, I would have helped.', 'Якби я знав, я б допоміг. (але не знав)']] },
                { t: 'Коли вживаємо', d: 'Минуле вже не змінити — ми лише розмірковуємо про альтернативи.', ex: [['If we had left earlier, we wouldn’t have missed the train.', 'Якби виїхали раніше — не спізнилися б на потяг.']] },
                { t: 'Обережно', d: 'Пишемо <b>would have</b>, а не «would of» — це дуже часта помилка навіть у носіїв.', ex: [] }
              ],
              tip: 'Схема «два кроки в минуле»: had done → would have done.'
            },
            exercises: [
              { type: 'choice', q: 'If I ___ about the meeting, I would have come.', options: ['knew', 'had known', 'have known', 'know'], answer: 1, explain: 'If + Past Perfect: had known.' },
              { type: 'choice', q: 'She would have called you if she ___ your number.', options: ['knew', 'had known', 'knows', 'would know'], answer: 1, explain: 'Умова в минулому → Past Perfect.' },
              { type: 'fill', q: 'If we had left earlier, we ___ the train.', hint: 'not / to miss', answers: ["wouldn't have missed", 'would not have missed'], explain: 'Головна частина: would have + V3.' },
              { type: 'choice', q: 'Оберіть правильне речення:', options: ['If you had told me, I would have helped.', 'If you told me, I would have helped.', 'If you had told me, I will help.', 'If you have told me, I would helped.'], answer: 0, explain: 'If + had told, would have helped.' },
              { type: 'choice', q: 'I would have bought that jacket if it ___ so expensive.', options: ["wasn't", "hadn't been", "wouldn't be", "isn't"], answer: 1, explain: 'Умова → Past Perfect: hadn’t been.' },
              { type: 'choice', q: 'If they ___ the map, they wouldn’t have got lost.', options: ['had checked', 'checked', 'have checked', 'would check'], answer: 0, explain: 'Past Perfect: had checked.' },
              { type: 'reorder', words: ['would', 'I', 'harder', 'studied', 'had', 'if', 'I', 'passed', 'have'], answer: 'If I had studied harder I would have passed', uk: 'Якби я вчився старанніше, я б склав іспит.' },
              { type: 'choice', q: 'She ___ the job if she had applied.', options: ['would have got', 'will get', 'would get', 'had got'], answer: 0, explain: 'Результат в уявному минулому: would have got.' }
            ]
          },
          {
            id: 'mixed-conditional', title: 'Mixed Conditional', emoji: '🔀', level: 'B2', minutes: 9,
            theory: {
              intro: 'Mixed Conditional змішує часи: умова з минулого впливає на ТЕПЕР, або теперішній стан вплинув на минуле. Це «мікс» 2-го і 3-го типів.',
              rules: [
                { t: 'Минуле → тепер', d: 'Умова в минулому, результат тепер: <b>If + Past Perfect, would + V</b>.', ex: [['If I had studied harder at school, I would speak English fluently now.', 'Якби я старанніше вчився в школі, я б тепер вільно говорив англійською.']] },
                { t: 'Тепер → минуле', d: 'Постійна риса/стан тепер вплинула на минулий результат: <b>If + Past, would have + V3</b>.', ex: [['If he weren’t so shy, he would have asked her out.', 'Якби він не був таким сорм’язливим, він би запросив її.']] },
                { t: 'Підказки', d: 'Слова-маркери результату: <b>now, today</b> (тепер) або <b>last year, yesterday</b> (минуле) показують, яку частину «змішувати».', ex: [['If she had taken that job, she would live in London now.', 'Якби вона взяла ту роботу, вона б тепер жила в Лондоні.']] }
              ],
              tip: 'Спершу запитай себе: умова — про минуле чи про тепер? А результат — про минуле чи тепер? Так і збереш формулу.'
            },
            exercises: [
              { type: 'choice', q: 'If I had gone to bed earlier, I ___ so tired now.', options: ["wouldn't be", "wouldn't have been", "won't be", "didn't be"], answer: 0, explain: 'Умова в минулому, результат ТЕПЕР → would + V.' },
              { type: 'choice', q: 'If she ___ a car, she would have driven us there yesterday.', options: ['had', 'had had', 'has', 'would have'], answer: 0, explain: 'Постійний стан тепер → минулий результат: If + Past.' },
              { type: 'choice', q: 'If we ___ the flight, we would be on the beach now.', options: ["hadn't missed", "didn't miss", "don't miss", "wouldn't miss"], answer: 0, explain: 'Умова в минулому → Past Perfect: hadn’t missed.' },
              { type: 'fill', q: 'If he had listened to me, he ___ in trouble now. (not / to be)', answers: ["wouldn't be", 'would not be'], explain: 'Минуле → тепер: would + V.' },
              { type: 'choice', q: 'Оберіть правильне речення:', options: ['If I had saved money, I would own a flat now.', 'If I saved money, I would own a flat now.', 'If I had saved money, I would have own a flat now.', 'If I save money, I would own a flat now.'], answer: 0, explain: 'Mixed: had saved (минуле) + would own now (тепер).' },
              { type: 'fill', q: 'If I ___ afraid of flying, I would have travelled with you. (not / to be)', answers: ["weren't", "wasn't", 'were not', 'was not'], explain: 'Стан тепер вплинув на минуле: If + Past (were/wasn’t).' },
              { type: 'reorder', words: ['had', 'I', 'studied', 'if', 'would', 'in', 'English', 'now', 'fluent', 'be', 'I'], answer: 'If I had studied I would be fluent in English now', uk: 'Якби я вчився, я б тепер вільно володів англійською.' },
              { type: 'choice', q: 'She would have passed the exam if she ___ so lazy.', options: ["weren't", "hadn't been", "isn't", "wouldn't be"], answer: 0, explain: 'Постійна риса (вона ледачача загалом) → If + Past: weren’t.' }
            ]
          },
          {
            id: 'wish', title: 'wish / if only — жаль і мрії', emoji: '💫', level: 'B1', minutes: 8,
            theory: {
              intro: 'wish та if only — це «от би ж то…»: шкодуємо про теперішнє або минуле, або хочемо, щоб хтось змінив поведінку.',
              rules: [
                { t: 'Жаль про ТЕПЕР', d: '<b>wish + Past</b> — хочемо, щоб теперішня ситуація була іншою.', ex: [['I wish I had a car.', 'От би мені авто! (зараз його немає)'], ['If only I knew the answer.', 'Якби ж я знав відповідь.']] },
                { t: 'Жаль про МИНУЛЕ', d: '<b>wish + Past Perfect</b> — шкодуємо про те, що сталося (або не сталося).', ex: [['I wish I had studied medicine.', 'Шкода, що я не вчився на медика.'], ['If only we hadn’t missed the bus.', 'От би ми не спізнилися на автобус.']] },
                { t: 'Подразнення: wish + would', d: 'Хочемо, щоб ХТОСЬ (або щось) змінив поведінку. НЕ про себе!', ex: [['I wish you would stop tapping your pen.', 'От би ти перестав стукати ручкою.']] }
              ],
              tip: 'if only звучить емоційніше за wish, але граматика та сама: if only + Past / Past Perfect.'
            },
            exercises: [
              { type: 'choice', q: 'I don’t like my flat. I wish I ___ in a bigger one.', options: ['lived', 'live', 'would live', 'had lived'], answer: 0, explain: 'Жаль про тепер → wish + Past.' },
              { type: 'choice', q: 'I wish I ___ so much cake yesterday.', options: ["hadn't eaten", "didn't eat", "wouldn't eat", "don't eat"], answer: 0, explain: 'Жаль про минуле → Past Perfect.' },
              { type: 'choice', q: 'I wish you ___ making that noise!', options: ['would stop', 'stopped making', 'stop', 'had stopped'], answer: 0, explain: 'Подразнення від чужої поведінки → wish + would.' },
              { type: 'fill', q: 'If only I ___ more free time! (to have, тепер)', answers: ['had'], explain: 'Жаль про тепер → Past: had.' },
              { type: 'choice', q: 'She wishes she ___ French at school.', options: ['had learned', 'learned', 'learns', 'would learn'], answer: 0, explain: 'Шкодує про минуле → Past Perfect.' },
              { type: 'fill', q: 'I wish it ___ raining. I want to go out! (to stop)', answers: ['would stop'], explain: 'Хочемо, щоб дощ (щось) змінився → would stop.' },
              { type: 'reorder', words: ['I', 'had', 'wish', 'I', 'a bike'], answer: 'I wish I had a bike', uk: 'От би мені велосипед!' },
              { type: 'reorder', words: ['if only', 'had told', 'we', 'her', 'the truth'], answer: 'If only we had told her the truth', uk: 'От би ми сказали їй правду.' }
            ]
          },
          {
            id: 'regret-reflection', title: 'Жаль і рефлексія: wish, if only, should have, regret', emoji: '🌠', level: 'B1', minutes: 11,
            theory: {
              intro: 'Щоденник — місце, де ми шкодуємо, мріємо й робимо висновки. Тут зібрано всі способи сказати «шкода, що…», «треба було…», «якби ж…» і «оглядаючись назад…» — з формулами для теперішнього, минулого й чужих звичок.',
              rules: [
                { t: 'Жаль про теперішнє: wish + Past · could · were', d: '<b>wish + Past Simple</b> — хотілося б, щоб зараз було інакше. <b>wish + could</b> — хочу вміти / мати змогу. <b>I wish I were</b> — формально were для всіх осіб (розмовно was).', ex: [['I wish I had more time.', 'Шкода, що в мене немає більше часу.'], ['I wish I could speak French.', 'Хотілося б мені вміти говорити французькою.']] },
                { t: 'Жаль про минуле: wish / if only + Past Perfect', d: '<b>wish + had + V3</b> — шкода, що так сталося (або не сталося). <b>If only</b> — те саме, але емоційніше: «якби ж…».', ex: [['I wish I had studied harder.', 'Шкода, що я не вчився старанніше.'], ['If only I hadn’t said that!', 'Якби ж я цього не сказав!']] },
                { t: 'Чужа звичка: wish + would', d: 'Хочемо, щоб ХТОСЬ змінив поведінку — роздратування. Про себе <b>«I wish I would» ✗</b> → I wish I could / I wish I had.', ex: [['I wish he would stop interrupting me.', 'Хоч би він перестав мене перебивати.'], ['I wish they wouldn’t park here.', 'Хоч би вони тут не паркувалися.']] },
                { t: 'should have / shouldn’t have / could have', d: '<b>should have + V3</b> — треба було (а не зробив); <b>shouldn’t have + V3</b> — не варто було (а зробив); <b>could have + V3</b> — міг би.', ex: [['I should have called her.', 'Треба було їй подзвонити.'], ['I shouldn’t have eaten so much.', 'Не варто було стільки їсти.']] },
                { t: 'regret + -ing / regret not + -ing', d: '<b>regret doing</b> — шкодую, що зробив; <b>regret not doing</b> — шкодую, що не зробив. <b>regret to inform</b> — формально: «з жалем повідомляю».', ex: [['I regret quitting my job.', 'Шкодую, що звільнився.'], ['I regret not travelling more when I was young.', 'Шкодую, що мало подорожував замолоду.']] },
                { t: 'It’s a shame · Looking back · In hindsight', d: '<b>It’s a shame / It’s a pity (that)…</b> — шкода, що… <b>Looking back</b> — оглядаючись назад; <b>In hindsight</b> — заднім числом, тепер я розумію.', ex: [['It’s a shame we didn’t meet earlier.', 'Шкода, що ми не познайомилися раніше.'], ['In hindsight, it was the right decision.', 'Тепер я розумію, що це було правильне рішення.']] }
              ],
              tip: 'Карта жалю: ЗАРАЗ → wish + Past (could); РАНІШЕ → wish + had V3 / should have V3; ЧУЖА ЗВИЧКА → wish + would; «шкодую, що зробив» → regret + -ing.'
            },
            exercises: [
              { type: 'choice', q: 'I can’t swim. I wish I ___ swim.', options: ['could', 'can', 'would', 'had'], answer: 0, explain: 'Хочу вміти → wish + could.' },
              { type: 'choice', q: 'I wish I ___ more time for my hobbies. (зараз не маю)', options: ['had', 'have', 'would have', 'had had'], answer: 0, explain: 'Жаль про теперішнє → Past Simple.' },
              { type: 'choice', q: 'If only I ___ that! Now she’s angry with me.', options: ['hadn’t said', 'didn’t say', 'wouldn’t say', 'haven’t said'], answer: 0, explain: 'Жаль про минуле → Past Perfect.' },
              { type: 'choice', q: 'I wish my neighbour ___ playing loud music at night.', options: ['would stop', 'stopped', 'had stopped', 'stops'], answer: 0, explain: 'Чужа звичка, що дратує → would.' },
              { type: 'choice', q: 'Обери правильне речення про себе:', options: ['I wish I could sleep more.', 'I wish I would sleep more.', 'I wish I can sleep more.', 'I wish I will sleep more.'], answer: 0, explain: 'Про себе не буває wish + would → could.' },
              { type: 'choice', q: 'I missed the train. I ___ earlier.', options: ['should have left', 'should leave', 'must have left', 'would leave'], answer: 0, explain: 'Жаль про минуле → should have + V3.' },
              { type: 'choice', q: 'I regret ___ him my secret.', options: ['telling', 'to tell', 'tell', 'told'], answer: 0, explain: 'Шкодую про зроблене → regret + -ing.' },
              { type: 'choice', q: '___, I wish I had chosen a different university.', options: ['Looking back', 'Look back', 'Looked back', 'To look back'], answer: 0, explain: 'Оглядаючись назад → Looking back.' },
              { type: 'fill', q: 'It’s a ___ that you can’t come to the party. (шкода)', answers: ['shame', 'pity'], explain: 'It’s a shame / pity that…' },
              { type: 'fill', q: 'I wish I ___ taller. (be — формально)', answers: ['were', 'was'], explain: 'wish I were (розмовно — was).' },
              { type: 'fill', q: 'In ___, it was the best decision of my life. (заднім числом)', answers: ['hindsight'], explain: 'In hindsight — заднім числом, тепер я розумію.' },
              { type: 'reorder', words: ['I shouldn’t have', 'eaten', 'so much cake'], answer: 'I shouldn’t have eaten so much cake', uk: 'Не варто було мені їсти стільки торта.' },
              { type: 'reorder', words: ['if only', 'I had', 'listened to you'], answer: 'If only I had listened to you', uk: 'Якби ж я тебе послухав.' }
            ]
          }
        ]
      },
      /* ---------- ПАСИВ ---------- */
      {
        id: 'passive', title: 'Пасивний стан', emoji: '🏗️',
        desc: 'Коли важлива дія, а не той, хто її виконує.',
        cheat: {
          title: 'Passive = be + V3 — у будь-якому часі',
          head: ['Час', 'Схема', 'Приклад'],
          rows: [
            [{ t: 'Present Simple', topic: 'passive-simple' }, 'am/is/are + V3', 'Coffee is grown in Brazil.'],
            [{ t: 'Past Simple', topic: 'passive-simple' }, 'was/were + V3', 'The letter was sent yesterday.'],
            [{ t: 'Future Simple', topic: 'passive-advanced' }, 'will be + V3', 'The results will be published soon.'],
            [{ t: 'Present Perfect', topic: 'passive-advanced' }, 'have/has been + V3', 'The work has been done.'],
            [{ t: 'Модальні', topic: 'passive-advanced' }, 'modal + be + V3', 'This must be finished today.'],
            [{ t: 'Виконавець і інструмент', topic: 'two-objects' }, 'by + хто · with + чим', 'The house was built by my uncle with stone.']
          ]
        },
        topics: [
          {
            id: 'passive-simple', title: 'Passive: Simple часи', emoji: '🏗️', level: 'A2', minutes: 8,
            theory: {
              intro: 'У пасиві головним стає об’єкт дії: «будинок збудовано», «сир виробляють у Франції».',
              rules: [
                { t: 'Форма', d: '<b>be + V3</b>. Виконавця додаємо через <b>by</b>, якщо він важливий.', ex: [['English is spoken all over the world.', 'Англійською говорять у всьому світі.']] },
                { t: 'Present Passive', d: '<b>am / is / are + V3</b>.', ex: [['These cars are made in Japan.', 'Ці авто виробляють у Японії.']] },
                { t: 'Past Passive', d: '<b>was / were + V3</b>.', ex: [['This house was built in 1900.', 'Цей будинок збудовано 1900 року.']] },
                { t: 'Коли вживати', d: 'Виконавець невідомий, неважливий або очевидний.', ex: [['My bike was stolen.', 'Мій велосипед вкрали. (хто — невідомо)']] }
              ],
              tip: 'Перевір себе: чи можна поставити питання «ким?» / «чим?» — якщо так, пасив доречний.'
            },
            exercises: [
              { type: 'choice', q: 'This cheese ___ in France.', options: ['makes', 'is made', 'made', 'is make'], answer: 1, explain: 'Present Passive: is + V3.' },
              { type: 'choice', q: 'The telephone ___ by Alexander Bell.', options: ['invented', 'was invented', 'is invented', 'has invented'], answer: 1, explain: 'Минуле + виконавець через by → was invented.' },
              { type: 'fill', q: 'These cars ___ in Japan.', hint: 'to make', answers: ['are made'], explain: 'Множина → are made.' },
              { type: 'choice', q: 'The window ___ by the boys yesterday.', options: ['was broken', 'is broken', 'broke', 'broken'], answer: 0, explain: 'Минулий час, однина → was broken.' },
              { type: 'choice', q: '“Romeo and Juliet” ___ by Shakespeare.', options: ['wrote', 'was written', 'is writing', 'written'], answer: 1, explain: 'Пасив минулого: was written.' },
              { type: 'choice', q: 'They clean the office every day. → Пасив:', options: ['The office is cleaned every day.', 'The office was cleaned every day.', 'The office cleans every day.', 'The office is clean every day.'], answer: 0, explain: 'Present Simple Passive: is cleaned.' },
              { type: 'fill', q: 'My bike ___ last night.', hint: 'to steal', answers: ['was stolen'], explain: 'Past Passive: was stolen.' },
              { type: 'choice', q: 'Dinner ___ at 7 p.m. in this hotel.', options: ['serves', 'is served', 'served', 'is serving'], answer: 1, explain: 'Вечерю «подають» → is served.' }
            ]
          },
          {
            id: 'passive-advanced', title: 'Passive: Perfect, Future, Modals', emoji: '🏛️', level: 'B1', minutes: 8,
            theory: {
              intro: 'Пасив працює в будь-якому часі та з модальними — змінюється лише форма be.',
              rules: [
                { t: 'Present Perfect Passive', d: '<b>have / has been + V3</b>.', ex: [['The work has been done.', 'Роботу виконано.']] },
                { t: 'Future Passive', d: '<b>will be + V3</b>.', ex: [['The results will be published tomorrow.', 'Результати опублікують завтра.']] },
                { t: 'Пасив із модальними', d: '<b>must / can / should be + V3</b>.', ex: [['This must be finished today.', 'Це має бути завершено сьогодні.']] }
              ],
              tip: 'Схема одна: [допоміжні] + been/be + V3. Вивчи її — і всі часи стануть простими.'
            },
            exercises: [
              { type: 'choice', q: 'The results ___ tomorrow.', options: ['will publish', 'will be published', 'will be publish', 'are publish'], answer: 1, explain: 'Future Passive: will be + V3.' },
              { type: 'choice', q: 'The room ___ yet.', options: ["hasn't cleaned", "hasn't been cleaned", "isn't cleaned", "wasn't clean"], answer: 1, explain: 'Perfect Passive: hasn’t been cleaned.' },
              { type: 'fill', q: 'This form ___ filled in before Friday.', hint: 'must', answers: ['must be'], explain: 'Модальний пасив: must be + V3.' },
              { type: 'choice', q: 'My order ___ already ___.', options: ['has / been sent', 'has / sent', 'was / been send', 'is / sent'], answer: 0, explain: 'has been sent — Perfect Passive.' },
              { type: 'choice', q: 'The problem ___ by tomorrow.', options: ['will be solved', 'will solve', 'is solved', 'solved'], answer: 0, explain: 'Future Passive: will be solved.' },
              { type: 'choice', q: 'The meeting ___ postponed until Monday.', options: ['has been', 'has', 'was been', 'is be'], answer: 0, explain: 'has been postponed — Perfect Passive.' },
              { type: 'fill', q: 'The letter ___ tomorrow morning.', hint: 'to send, майбутній пасив', answers: ['will be sent'], explain: 'will be + V3: will be sent.' },
              { type: 'choice', q: 'This exercise ___ in ten minutes.', options: ['can be done', 'can done', 'can be do', 'can doing'], answer: 0, explain: 'Модальний пасив: can be done.' }
            ]
          },
          {
            id: 'two-objects', title: 'Passive: два додатки, by / with, get', emoji: '👥', level: 'B1', minutes: 8,
            theory: {
              intro: 'Деякі дієслова (give, send, show, offer, tell) мають ДВА додатки — тому пасив можна зібрати двома способами. А ще є розмовний get-passive.',
              rules: [
                { t: 'Два варіанти пасиву', d: 'Актив: They gave me a book. → Пасив 1: <b>I was given</b> a book. Пасив 2: A book <b>was given to</b> me.', ex: [['They offered her the job. → She was offered the job.', 'Їй запропонували роботу.'], ['The job was offered to her.', 'Роботу запропонували їй.']] },
                { t: 'by ≠ with', d: '<b>by + хто</b> (виконавець), <b>with + чим</b> (інструмент).', ex: [['The house was built by my uncle.', 'Будинок збудував мій дядько.'], ['The window was broken with a stone.', 'Вікно розбили каменем.']] },
                { t: 'Get-passive', d: 'У розмовній мові замість be часто <b>get</b>: get fired, get married, get lost.', ex: [['He got fired last week.', 'Його звільнили минулого тижня.']] }
              ],
              tip: 'Пасив із «людиною»-додатком (I was given…) звучить природніше, ніж A book was given to me.'
            },
            exercises: [
              { type: 'choice', q: 'They sent me an invitation. → I ___ an invitation.', options: ['was sent', 'was send', 'sent', 'am sent'], answer: 0, explain: 'Пасив із першим додатком: I was sent.' },
              { type: 'choice', q: 'The letter was written ___ my grandmother ___ a fountain pen.', options: ['by / with', 'with / by', 'by / by', 'with / with'], answer: 0, explain: 'by + хто, with + чим.' },
              { type: 'choice', q: 'They offered him a promotion. → He ___ a promotion.', options: ['was offered', 'were offered', 'is offering', 'was offer'], answer: 0, explain: 'He was offered — пасив із додатком-особою.' },
              { type: 'choice', q: 'My phone ___ on the train last night. (розмовний пасив)', options: ['got stolen', 'was steal', 'gets stolen', 'has steal'], answer: 0, explain: 'Get-passive: got stolen.' },
              { type: 'fill', q: 'She showed me her photos. → I ___ her photos.', hint: 'to show, минулий пасив', answers: ['was shown'], explain: 'was shown — пасив із додатком-особою.' },
              { type: 'fill', q: 'The bridge was designed ___ a famous architect.', hint: 'ким?', answers: ['by'], explain: 'Виконавець → by.' },
              { type: 'reorder', words: ['was given', 'she', 'a gold watch', 'on her last day'], answer: 'She was given a gold watch on her last day', uk: 'Востанній робочий день їй подарували золотий годинник.' },
              { type: 'reorder', words: ['my wallet', 'on the bus', 'got stolen'], answer: 'My wallet got stolen on the bus', uk: 'Мій гаманець вкрали в автобусі.' }
            ]
          },
          {
            id: 'reporting', title: 'Passive: it is said that…', emoji: '🗣️', level: 'B2', minutes: 9,
            theory: {
              intro: 'Коли «усі кажуть / вважають / знають», новини та чутки передають спеціальним пасивом: It is said that… або He is said to…',
              rules: [
                { t: 'Форма 1: It + пасив', d: '<b>It is said / believed / known / expected / reported that…</b>', ex: [['It is said that he is a millionaire.', 'Кажуть, що він мільйонер.'], ['It is expected that prices will rise.', 'Очікується, що ціни зростуть.']] },
                { t: 'Форма 2: підмет + is said to', d: '<b>He is said to be / to have + V3…</b> — той самий зміст, компактніша форма.', ex: [['He is said to be a millionaire.', 'Кажуть, він мільйонер.'], ['The painting is believed to have been stolen.', 'Вважається, що картину вкрали.']] },
                { t: 'Минуле в формі 2', d: 'Якщо дія була РАНІШЕ за «кажуть» → <b>to have + V3</b>.', ex: [['She is said to have left the country.', 'Кажуть, вона покинула країну.']] }
              ],
              tip: 'Найчастіші дієслова: say, believe, think, know, expect, report, understand. Це улюблена конструкція новин.'
            },
            exercises: [
              { type: 'choice', q: 'People say that he is rich. → It ___ that he is rich.', options: ['is said', 'says', 'is saying', 'said'], answer: 0, explain: 'Безособовий пасив: It is said that…' },
              { type: 'choice', q: 'People believe the church was built in 1500. → The church ___ in 1500.', options: ['is believed to have been built', 'is believing to build', 'believes to build', 'is believed to build'], answer: 0, explain: 'Дія раніше за «вважають» → to have been built.' },
              { type: 'choice', q: 'They expect that the president will arrive at noon. → The president ___ at noon.', options: ['is expected to arrive', 'expects to arrive', 'is expecting to arrive', 'is expected arriving'], answer: 0, explain: 'is expected to + V.' },
              { type: 'fill', q: 'It is ___ that smoking causes cancer. (відомо)', answers: ['known'], explain: 'It is known that… — відомо, що…' },
              { type: 'choice', q: 'She is said ___ the country last month.', options: ['to have left', 'to leave', 'leaving', 'left'], answer: 0, explain: 'Минула дія щодо «кажуть» → to have + V3.' },
              { type: 'fill', q: 'It is ___ that the company will close two factories. (очікується)', answers: ['expected'], explain: 'It is expected that… — очікується, що…' },
              { type: 'reorder', words: ['is said', 'he', 'to be', 'the best chef', 'in town'], answer: 'He is said to be the best chef in town', uk: 'Кажуть, він найкращий шеф у місті.' },
              { type: 'reorder', words: ['it', 'is reported', 'the storm', 'that', 'has stopped'], answer: 'It is reported that the storm has stopped', uk: 'Повідомляють, що шторм припинився.' }
            ]
          }
        ]
      },
      /* ---------- USED TO ---------- */
      {
        id: 'used-to', title: 'used to / be used to', emoji: '🔄',
        desc: 'Звичка в минулому, стан «я звик» і процес «звикаю» — три конструкції, які легко переплутати.',
        cheat: {
          title: 'одна форма — три значення',
          head: ['Конструкція', 'Переклад і значення', 'Приклад'],
          rows: [
            [{ t: 'used to + V', topic: 'used-to' }, 'колись (звичка в минулому, якої вже немає)', 'I used to smoke.'],
            [{ t: 'didn’t use to', topic: 'used-to' }, 'колись не… (заперечення звички)', 'She didn’t use to like coffee.'],
            [{ t: 'be used to + V-ing / іменник', topic: 'used-to' }, 'бути звиклим (стан)', 'I’m used to the cold.'],
            [{ t: 'get used to + V-ing / іменник', topic: 'used-to' }, 'звикати (процес)', 'I’m getting used to driving here.']
          ]
        },
        topics: [
          {
            id: 'used-to', title: 'used to / be used to / get used to', emoji: '🔄', level: 'B1', minutes: 9,
            theory: {
              intro: 'Три майже однакові на вигляд конструкції з різними значеннями: звичка в минулому, стан «я звик» і процес «звикаю». Розібравшись один раз, більше не переплутаєш.',
              rules: [
                { t: 'used to + V — колись', d: 'Звичка або стан у МИНУЛОМУ, якого вже немає. Заперечення: <b>didn’t use to</b>; питання: <b>Did you use to…?</b>', ex: [['I used to live in a small town.', 'Колись я жив у маленькому місті.'], ['She didn’t use to like coffee.', 'Раніше вона не любила каву.']] },
                { t: 'be used to + V-ing / іменник — бути звиклим', d: 'СТАН: це вже не дивно й не складно. Увага: тут <b>to</b> — прийменник, тому далі іменник або <b>V-ing</b>!', ex: [['I’m used to the cold weather.', 'Я звик до холодної погоди.'], ['Are you used to working at night?', 'Ти звик працювати вночі?']] },
                { t: 'get used to + V-ing / іменник — звикати', d: 'ПРОЦЕС переходу: стає нормальним поступово.', ex: [['I’m getting used to driving on the left.', 'Поступово звикаю їздити ліворуч.'], ['You’ll get used to the noise soon.', 'Незабаром ти звикнеш до шуму.']] }
              ],
              tip: 'Головна пастка: у be/get used to після to йде V-ing, а НЕ інфінітив! I’m used to getting up early (не «to get up»).'
            },
            exercises: [
              { type: 'choice', q: 'I ___ live in a small town, but now I live in Kyiv.', options: ['used to', 'am used to', 'get used to', 'use to'], answer: 0, explain: 'Звичка в минулому, якої вже немає → used to + V.' },
              { type: 'choice', q: 'She ___ getting up early — she’s a nurse.', options: ['is used to', 'used to', 'gets used', 'uses to'], answer: 0, explain: 'Стан «звикла» → is used to + V-ing.' },
              { type: 'choice', q: 'I moved to London last month. I’m slowly ___ to driving on the left.', options: ['getting used', 'used', 'use', 'being used'], answer: 0, explain: 'Процес звикання → getting used to.' },
              { type: 'choice', q: 'He ___ use to play football when he was at school.', options: ["didn't", "don't", "doesn't to", "isn't"], answer: 0, explain: 'Заперечення звички в минулому → didn’t use to.' },
              { type: 'fill', q: 'We ___ ___ drink so much coffee. (колись, звичка в минулому)', answers: ['used to'], explain: 'Звичка в минулому → used to.' },
              { type: 'fill', q: 'Are you used to ___ at night? (працювати)', answers: ['working'], explain: 'Після be used to → V-ing: working.' },
              { type: 'reorder', words: ['she', 'used to', 'have long hair'], answer: 'She used to have long hair', uk: 'Колись у неї було довге волосся.' },
              { type: 'reorder', words: ["I'm getting used to", 'the cold weather', 'here'], answer: "I'm getting used to the cold weather here", uk: 'Звикаю до холодної погоди тут.' }
            ]
          }
        ]
      },
      /* ---------- CAUSATIVE ---------- */
      {
        id: 'causative', title: 'Causative: have / get', emoji: '✂️',
        desc: '«I had my hair cut» — хтось зробив це для тебе. Замовлення послуг і несподівані пригоди.',
        cheat: {
          title: 'have / get something done',
          head: ['Конструкція', 'Переклад і значення', 'Приклад'],
          rows: [
            [{ t: 'have + щось + V3', topic: 'causative' }, 'замовити послугу (хтось робить для тебе)', 'I had my hair cut.'],
            [{ t: 'get + щось + V3', topic: 'causative' }, 'те саме, але розмовніше', 'I got my car fixed.'],
            [{ t: 'have sb do / get sb to do', topic: 'causative' }, 'попросити/вмовити когось зробити', 'I’ll get my brother to help us.'],
            [{ t: 'had / got + щось + V3 (неприємність)', topic: 'causative' }, 'щось сталося не з твоєї вини', 'He had his wallet stolen.']
          ]
        },
        topics: [
          {
            id: 'causative', title: 'Causative: have / get something done', emoji: '✂️', level: 'B2', minutes: 9,
            theory: {
              intro: '«I had my hair cut» — це НЕ «я підстриг собі волосся». Це значить, що хтось зробив це ДЛЯ тебе. Конструкція замовлення послуг і несподіваних пригод.',
              rules: [
                { t: 'have + щось + V3', d: 'Ти організував, щоб хтось виконав роботу (сервіс, послуга).', ex: [['I had my hair cut yesterday.', 'Учора я підстригся (у перукаря).'], ['We’re having our house painted next month.', 'Наступного місяця нам фарбуватимуть будинок.']] },
                { t: 'get + щось + V3', d: 'Те саме, але РОЗМОВНІШЕ.', ex: [['I got my car fixed at the garage.', 'Мені відремонтували авто в гаражі.'], ['She got her phone repaired at the shop.', 'Їй відремонтували телефон у крамниці.']] },
                { t: 'Порівняй із активом', d: 'I cut my hair — сам собі (або фізично). I had my hair cut — хтось для тебе.', ex: [['I washed my car. vs I had my car washed.', 'Я сам помив авто — мені помили авто.']] },
                { t: 'Бонус-значення', d: '<b>have sb do / get sb to do</b> — попросити когось; <b>had/got щось + V3</b> — неприємність, що сталася з тобою.', ex: [['I’ll get my brother to help us.', 'Я попрошу брата нам допомогти.'], ['He had his wallet stolen on the bus.', 'У нього в автобусі вкрали гаманець.']] }
              ],
              tip: 'Формула: have/get + РЕЧ (об’єкт) + V3. Слово «річ» завжди стоїть між have/get і третьою формою.'
            },
            exercises: [
              { type: 'choice', q: 'I had my hair ___ yesterday.', options: ['cut', 'to cut', 'cutting', 'cuts'], answer: 0, explain: 'have + об’єкт + V3: had my hair cut.' },
              { type: 'choice', q: 'We’re having our house ___ next month.', options: ['painted', 'paint', 'to paint', 'painting'], answer: 0, explain: 'Пасивна третя форма → painted.' },
              { type: 'choice', q: 'She got her phone ___ at the shop.', options: ['repaired', 'repair', 'to repair', 'repairing'], answer: 0, explain: 'get + об’єкт + V3 → repaired.' },
              { type: 'choice', q: 'He had his wallet ___ on the bus. (неприємність)', options: ['stolen', 'steal', 'to steal', 'stealing'], answer: 0, explain: 'had + об’єкт + V3 — неприємна подія: stolen.' },
              { type: 'fill', q: 'I need to ___ my car serviced before the trip. (організувати)', answers: ['have', 'get'], explain: 'have/get + об’єкт + V3.' },
              { type: 'fill', q: 'I’ll get my brother ___ us move. (допомогти)', answers: ['to help'], explain: 'get sb TO do sth → to help.' },
              { type: 'reorder', words: ['she had', 'her nails done', 'yesterday'], answer: 'She had her nails done yesterday', uk: 'Учора вона зробила манікюр (їй зробили).' },
              { type: 'reorder', words: ['I got', 'my laptop fixed', 'this morning'], answer: 'I got my laptop fixed this morning', uk: 'Сьогодні зранку мені відремонтували ноутбук.' }
            ]
          }
        ]
      },
      /* ---------- STARTERS ---------- */
      {
        id: 'starters', title: 'Початок речення: it / this / that / there', emoji: '🚀',
        desc: 'Як правильно починати речення: it is… / this is… / there is… — фундаментальні блоки англійської.',
        cheat: {
          title: 'з чого почати речення',
          head: ['Початок', 'Переклад і коли вживаємо', 'Приклад'],
          rows: [
            [{ t: 'It is…', topic: 'starters' }, 'погода, час, відстань; формальне «це»', 'It’s raining. It’s 7 o’clock. It’s important to learn.'],
            [{ t: 'This / That is…', topic: 'starters' }, 'вказуємо: це (близько) / те (далі); знайомство', 'This is my brother. That was a great idea.'],
            [{ t: 'There is / There are…', topic: 'starters' }, 'щось ІСНУЄ десь', 'There is a park near my house.'],
            [{ t: 'it ≠ there', topic: 'starters' }, 'it — про відомий предмет; there — про існування', 'Where is the cat? — It’s on the sofa. / There’s a cat in the garden.']
          ]
        },
        topics: [
          {
            id: 'starters', title: 'Sentence starters: it / this / that / there', emoji: '🚀', level: 'A2', minutes: 9,
            theory: {
              intro: 'В англійській речення майже завжди починається з підмета. Коли «підмета» за змістом немає, на допомогу приходять it, this/that і there.',
              rules: [
                { t: 'it — безособове', d: 'Погода, час, відстань, оцінка: <b>it</b> — формальний підмет.', ex: [['It’s raining outside.', 'Надворі дощить.'], ['It’s 7 o’clock. It’s far from here.', 'Сьома година. Це далеко звідси.'], ['It’s important to practise every day.', 'Важливо практикувати щодня.']] },
                { t: 'this / that — вказуємо', d: '<b>this</b> — близько/зараз, <b>that</b> — далеко/тоді. Також для знайомства по телефону.', ex: [['This is my brother Tom.', 'Це мій брат Том.'], ['That was a great party!', 'То була чудова вечірка!'], ['Hi, this is Anna speaking.', 'Привіт, це Анна.']] },
                { t: 'there is / there are — існування', d: '«Є щось десь»: <b>there is</b> + одн./незліч., <b>there are</b> + множина.', ex: [['There is a nice café next to my house.', 'Біля мого дому є гарна кав’ярня.'], ['There were many people at the concert.', 'На концерті було багато людей.']] },
                { t: 'it ≠ there', d: '<b>it</b> — про предмет, який уже відомий; <b>there</b> — коли повідомляємо, що щось існує.', ex: [['Where is my book? — It’s on the table.', 'Де моя книжка? — На столі.'], ['There’s a book on the table.', 'На столі є книжка.']] }
              ],
              tip: 'Ніколи не починай із дієслова: не «Is raining» і не «In the park is a fountain» → It’s raining. There is a fountain in the park.'
            },
            exercises: [
              { type: 'choice', q: '___ is raining outside.', options: ['It', 'There', 'This', 'What'], answer: 0, explain: 'Погода → безособове It.' },
              { type: 'choice', q: '___ is a nice café next to my house.', options: ['There', 'It', 'This', 'Where'], answer: 0, explain: 'Існування («є») → There is.' },
              { type: 'choice', q: '___ 7 o’clock. We’re late!', options: ['It’s', 'There’s', 'That’s', 'Here’s'], answer: 0, explain: 'Час → It’s.' },
              { type: 'choice', q: '___ was a great party yesterday!', options: ['That', 'There', 'This is', 'It has'], answer: 0, explain: 'Оцінка минулої події → That was…' },
              { type: 'fill', q: '___ are many books on the shelf.', answers: ['There'], explain: 'Існування у множині → There are.' },
              { type: 'fill', q: '___ seems that she is right.', answers: ['It'], explain: 'Формальний підмет → It seems that…' },
              { type: 'reorder', words: ['there is', 'a park', 'near my house'], answer: 'There is a park near my house', uk: 'Біля мого дому є парк.' },
              { type: 'reorder', words: ['this is', 'my brother', 'Tom'], answer: 'This is my brother Tom', uk: 'Це мій брат Том.' }
            ]
          }
        ]
      },
      /* ---------- INTENSIFIERS + DEGREE ---------- */
      {
        id: 'intensifiers', title: 'Підсилювачі: so / such / very / too / enough', emoji: '🔥',
        desc: 'Як підсилити та показати ступінь: дуже, такий, надто, достатньо — всі структури в одному місці.',
        cheat: {
          title: 'дуже · такий · надто · достатньо',
          head: ['Структура', 'Переклад і формула', 'Приклад'],
          rows: [
            [{ t: 'very + прикм./присл.', topic: 'intensifiers' }, 'дуже (нейтрально)', 'very tired · very quickly'],
            [{ t: 'so + прикм./присл.', topic: 'intensifiers' }, 'так!, такий! (БЕЗ іменника)', 'so beautiful! so quickly!'],
            [{ t: 'such + (a) прикм. + іменник', topic: 'intensifiers' }, 'такий! (З іменником)', 'such a nice day · such kind people'],
            [{ t: 'absolutely + «екстрим»-прикм.', topic: 'intensifiers' }, 'абсолютно, повністю', 'absolutely exhausted / amazing'],
            [{ t: 'too + прикм. + to V', topic: 'intensifiers' }, 'надто, щоб… (проблема)', 'too hot to drink'],
            [{ t: 'прикм. + enough + to V', topic: 'intensifiers' }, 'достатньо, щоб…', 'old enough to drive'],
            [{ t: 'enough + іменник / too many / too much', topic: 'intensifiers' }, 'достатньо / забагато чогось', 'enough money · too many people'],
            [{ t: 'so / such … that', topic: 'intensifiers' }, 'настільки…, що…', 'so tired that I fell asleep']
          ]
        },
        topics: [
          {
            id: 'intensifiers', title: 'Intensifiers & degree: so / such / very / too / enough', emoji: '🔥', level: 'B1', minutes: 10,
            theory: {
              intro: '«ДУЖЕ», «ТАКИЙ!», «надто», «достатньо» — в англійської для цього цілий набір слів, і кожне має свою формулу. Зібрано все в одну тему.',
              rules: [
                { t: 'very — нейтральне «дуже»', d: '<b>very</b> + прикметник або прислівник.', ex: [['I’m very tired.', 'Я дуже втомився.'], ['She sings very well.', 'Вона співає дуже добре.']] },
                { t: 'so — емоційне «так/такий!»', d: '<b>so</b> + прикм./присл. БЕЗ іменника. Часто + наслідок <b>that</b>.', ex: [['The film was so boring!', 'Фільм був такий нудний!'], ['I’m so tired that I can’t stand.', 'Я настільки втомлений, що не можу стояти.']] },
                { t: 'such — «такий!» з іменником', d: '<b>such + (a/an) прикм. + іменник</b>. Пастка: не «so nice day», а <b>such a nice day</b>!', ex: [['It was such a nice day!', 'Був такий гарний день!'], ['They are such kind people.', 'Вони такі добрі люди.']] },
                { t: 'absolutely + «екстрим»-прикм.', d: 'З вичерпними прикметниками (exhausted, freezing, amazing) — <b>absolutely</b>, а не very.', ex: [['The food was absolutely amazing.', 'Їжа була просто неймовірна.'], ['I’m absolutely exhausted.', 'Я абсолютно виснажений.']] },
                { t: 'too — «надто» (проблема)', d: '<b>too</b> + прикм. + <b>to V</b>. Також <b>too many</b> + злічувані, <b>too much</b> + незлічувані.', ex: [['The soup is too hot to eat.', 'Суп надто гарячий, щоб їсти.'], ['There are too many people here.', 'Тут забагато людей.']] },
                { t: 'enough — «достатньо»', d: 'Прикм. ПЕРЕД enough (<b>old enough</b>), але enough ПЕРЕД іменником (<b>enough money</b>).', ex: [['She is old enough to drive.', 'Вона достатньо доросла, щоб водити.'], ['We have enough time to catch the train.', 'У нас достатньо часу на потяг.']] }
              ],
              tip: 'Тести: далі йде ІМЕННИК? → such. Лише прикметник? → so. Просте «дуже»? → very. too = проблема, enough = норма.'
            },
            exercises: [
              { type: 'choice', q: 'It was ___ a boring film that I fell asleep.', options: ['such', 'so', 'very', 'too'], answer: 0, explain: 'such + a + прикм. + іменник.' },
              { type: 'choice', q: 'The soup is ___ hot to eat.', options: ['too', 'enough', 'so', 'such'], answer: 0, explain: 'Надто, щоб їсти → too + прикм. + to V.' },
              { type: 'choice', q: 'She is old ___ to drive a car.', options: ['enough', 'too', 'so', 'such'], answer: 0, explain: 'Достатньо доросла → прикм. + enough.' },
              { type: 'choice', q: 'I’m ___ tired I can’t stand.', options: ['so', 'such', 'very much', 'too'], answer: 0, explain: 'so + прикм. (+ that-речення).' },
              { type: 'choice', q: 'The concert was absolutely ___.', options: ['amazing', 'good', 'nice', 'fine'], answer: 0, explain: 'absolutely + «екстрим»-прикметник → amazing.' },
              { type: 'fill', q: 'He drives very ___. (повільно)', answers: ['slowly'], explain: 'very + прислівник → slowly.' },
              { type: 'fill', q: 'I don’t have ___ money for this trip. (достатньо)', answers: ['enough'], explain: 'enough + іменник.' },
              { type: 'reorder', words: ['it was', 'such a nice day', 'yesterday'], answer: 'It was such a nice day yesterday', uk: 'Учора був такий гарний день!' },
              { type: 'reorder', words: ['is too expensive', 'this phone', 'to buy'], answer: 'This phone is too expensive to buy', uk: 'Цей телефон задорогий, щоб купувати.' }
            ]
          }
        ]
      },
      /* ---------- INDEFINITE ---------- */
      {
        id: 'indefinite', title: 'Some / Any / No / Every', emoji: '🎯',
        desc: 'Неозначені займенники: скільки і які слова ставити у ствердженнях, питаннях і запереченнях.',
        cheat: {
          title: 'хтось · щось · нічого · все',
          head: ['Слово', 'Переклад і коли вживаємо', 'Приклад'],
          rows: [
            [{ t: 'some', topic: 'indefinite' }, 'трохи, кілька · ствердження; прохання/пропозиції', 'I need some help. Would you like some tea?'],
            [{ t: 'any', topic: 'indefinite' }, 'жодного, будь-який · заперечення і питання', 'I don’t have any money. Any questions?'],
            [{ t: 'no = not any', topic: 'indefinite' }, 'без «не» · тільки один not у реченні!', 'There is no milk.'],
            [{ t: 'every + іменник одн.', topic: 'indefinite' }, 'кожен, всі', 'every day · every student'],
            [{ t: 'somebody / anything / nothing…', topic: 'indefinite' }, '+ дієслово в однині; прикм. ПІСЛЯ', 'something interesting · nothing special']
          ]
        },
        topics: [
          {
            id: 'indefinite', title: 'Some / Any / No / Every', emoji: '🎯', level: 'A2', minutes: 9,
            theory: {
              intro: 'Скільки? Якийсь? Жодного? Усе? Ця четвірка слів і їхні похідні (somebody, anything, nowhere…) закривають тему неозначених займенників.',
              rules: [
                { t: 'some — ствердження', d: 'У звичайних ствердженнях; а ще у ввічливих <b>проханнях і пропозиціях</b> (хоча це питання!).', ex: [['I need some help.', 'Мені потрібна допомога.'], ['Would you like some cake?', 'Хочеш торта?']] },
                { t: 'any — заперечення і питання', d: '«Жодного» у запереченнях, «який-небудь» у питаннях.', ex: [['I don’t have any money.', 'У мене немає грошей.'], ['Do you have any questions?', 'Маєте якісь запитання?']] },
                { t: 'no = not any', d: 'Одне речення — тільки ОДИН not. Не «don’t have no»!', ex: [['There is no milk. = There isn’t any milk.', 'Молока немає.']] },
                { t: 'every та похідні', d: '<b>every</b> + іменник в однині (кожен). Похідні: everybody, everything, somewhere, nothing — + дієслово в <b>однині</b>; прикметник — ПІСЛЯ.', ex: [['Every student has a laptop.', 'У кожного студента є ноутбук.'], ['Something interesting happened.', 'Сталося щось цікаве.']] }
              ],
              tip: 'Подвійне заперечення — помилка: I don’t have no money ✗ → I have no money ✓ або I don’t have any money ✓.'
            },
            exercises: [
              { type: 'choice', q: 'There isn’t ___ milk in the fridge.', options: ['any', 'some', 'no', 'every'], answer: 0, explain: 'Заперечення → any.' },
              { type: 'choice', q: 'Would you like ___ cake?', options: ['some', 'any', 'no', 'a'], answer: 0, explain: 'Пропозиція → some навіть у питанні.' },
              { type: 'choice', q: '___ called while you were out. (хтось)', options: ['Somebody', 'Anybody', 'Nobody', 'Every'], answer: 0, explain: 'Хтось у ствердженні → Somebody.' },
              { type: 'choice', q: 'I know ___ about cars. (зовсім нічого)', options: ['nothing', 'anything', 'something', 'none'], answer: 0, explain: 'Нічого без додаткового not → nothing.' },
              { type: 'fill', q: '___ student in our class has a laptop. (кожен)', answers: ['Every'], explain: 'every + іменник в однині.' },
              { type: 'fill', q: 'Is there ___ interesting in this book? (щось)', answers: ['anything'], explain: 'Питання → anything; прикм. після.' },
              { type: 'reorder', words: ['there is', 'no milk', 'left'], answer: 'There is no milk left', uk: 'Молока більше не лишилося.' },
              { type: 'reorder', words: ['she knows everybody', 'in this town'], answer: 'She knows everybody in this town', uk: 'Вона знає всіх у цьому місті.' }
            ]
          }
        ]
      },
      /* ---------- QUANTIFIERS ---------- */
      {
        id: 'quantifiers', title: 'Кількісні слова: much / many / few / little', emoji: '📊',
        desc: 'Детермінативи: скільки чогось — злічуване чи незлічуване, і чому «a few» і «few» — різні речі.',
        cheat: {
          title: 'скільки? багато? мало?',
          head: ['Слово', 'Переклад і з чим поєднується', 'Приклад'],
          rows: [
            [{ t: 'many / few', topic: 'quantifiers' }, 'багато / мало · ЗЛІЧУВАНІ', 'many books · few friends'],
            [{ t: 'much / little', topic: 'quantifiers' }, 'багато / мало · НЕЗЛІЧУВАНІ', 'much time · little water'],
            [{ t: 'a few / a little', topic: 'quantifiers' }, 'трохи, достатньо (позитивно)', 'a few friends · a little time'],
            [{ t: 'few / little (без a)', topic: 'quantifiers' }, 'майже нема (негативно)', 'few friends · little hope'],
            [{ t: 'a lot of / plenty of', topic: 'quantifiers' }, 'для обох типів', 'a lot of books / time']
          ]
        },
        topics: [
          {
            id: 'quantifiers', title: 'Quantifiers: much / many / few / little', emoji: '📊', level: 'B1', minutes: 9,
            theory: {
              intro: 'Скільки? Багато? Мало? Головне питання тут одне: злічуване це чи незлічуване. Відповідь визначає слово.',
              rules: [
                { t: 'many / few — злічувані', d: 'Предмети, які можна порахувати (книжки, друзі).', ex: [['How many students are there?', 'Скільки там студентів?'], ['He has few friends in this city.', 'У нього мало друзів у цьому місті.']] },
                { t: 'much / little — незлічувані', d: 'Те, що не рахуємо поштучно (час, вода, гроші, інформація).', ex: [['How much time do we have?', 'Скільки в нас часу?'], ['There is little water in the bottle.', 'У пляшці мало води.']] },
                { t: 'a few / a little ≠ few / little', d: 'З артиклем <b>a</b> — «трохи, але достатньо» (позитивно); без нього — «майже нема» (негативно).', ex: [['I have a few friends here. (і це добре)', 'У мене тут є кілька друзів.'], ['I have few friends here. (сумно)', 'У мене тут майже нема друзів.']] },
                { t: 'Універсальні: a lot of / plenty of', d: 'Працюють з обома типами, особливо у ствердженнях.', ex: [['I have a lot of books and a lot of free time.', 'У мене багато книжок і багато вільного часу.'], ['We have plenty of time.', 'У нас вдосталь часу.']] }
              ],
              tip: 'Швидкий тест: можеш поставити цифру перед словом? 3 books — так → many/few. Water — ні → much/little.'
            },
            exercises: [
              { type: 'choice', q: 'How ___ time do we have?', options: ['much', 'many', 'few', 'a few'], answer: 0, explain: 'Час незлічуваний → how much.' },
              { type: 'choice', q: 'There are ___ students in the class today. (багато)', options: ['many', 'much', 'a little', 'little'], answer: 0, explain: 'Студенти злічувані → many.' },
              { type: 'choice', q: 'He has ___ friends — he’s quite lonely.', options: ['few', 'a few', 'little', 'much'], answer: 0, explain: 'Майже нема (негативно) → few без a.' },
              { type: 'choice', q: 'Add ___ sugar to the tea. (трохи)', options: ['a little', 'a few', 'many', 'few'], answer: 0, explain: 'Цукор незлічуваний, трішки й достатньо → a little.' },
              { type: 'fill', q: 'We have ___ of time before the trip. (вдосталь)', answers: ['plenty', 'a lot', 'lots'], explain: 'plenty of / a lot of / lots of + незлічуване.' },
              { type: 'fill', q: 'How ___ money did you spend?', answers: ['much'], explain: 'Гроші як сума незлічувані → how much.' },
              { type: 'reorder', words: ['she has few friends', 'in this city'], answer: 'She has few friends in this city', uk: 'У неї мало друзів у цьому місті.' },
              { type: 'reorder', words: ['we have a little time', 'before the meeting'], answer: 'We have a little time before the meeting', uk: 'У нас є трохи часу перед зустріччю.' }
            ]
          }
        ]
      },
      /* ---------- ПОРІВНЯННЯ ---------- */
      {
        id: 'comparison', title: 'Ступені порівняння', emoji: '⛰️',
        desc: 'tall → taller → the tallest, more / most і винятки better / worse — як порівнювати правильно.',
        cheat: {
          title: 'вищий · найвищий · найкращий',
          head: ['Правило', 'Переклад і формула', 'Приклад'],
          rows: [
            [{ t: 'короткі: -er / the -est', topic: 'comparison' }, 'вищий / найвищий', 'tall → taller → the tallest'],
            [{ t: 'довгі: more / the most', topic: 'comparison' }, 'більш / найбільш', 'beautiful → more beautiful → the most beautiful'],
            [{ t: 'винятки', topic: 'comparison' }, 'краще · гірше · далі', 'good → better → the best · bad → worse → the worst · far → further'],
            [{ t: 'as … as / not as … as', topic: 'comparison' }, 'такий як / не такий як', 'as tall as · not as cold as'],
            [{ t: 'than / the + найвища', topic: 'comparison' }, 'ніж (порівняння) / серед усіх', 'taller than · the best film'],
            [{ t: 'правопис: bigger · happier · nicer', topic: 'comparison-spelling' }, 'подвоєння · y → i · -e + r', 'big → bigger · happy → happier'],
            [{ t: 'прислівники: harder · more carefully', topic: 'comparison-spelling' }, 'короткі -er · на -ly → more / most', 'drive more carefully'],
            [{ t: 'much / a bit + comparative', topic: 'comparison-structures' }, 'набагато / трохи (НЕ very bigger)', 'much cheaper · a bit better'],
            [{ t: 'the …-er, the …-er', topic: 'comparison-structures' }, 'чим…, тим…', 'The sooner, the better.'],
            [{ t: 'twice as … as · the same as', topic: 'comparison-structures' }, 'удвічі · такий самий, як', 'twice as big as ours']
          ]
        },
        topics: [
          {
            id: 'comparison', title: 'Ступені порівняння прикметників', emoji: '⛰️', level: 'A2', minutes: 9,
            theory: {
              intro: 'Вищий? Найвищий? Найкращий? Правила прості, але з винятками. І головне — не змішувати два способи в один.',
              rules: [
                { t: 'Короткі: -er / the -est', d: '1–2 склади: <b>-er</b> у порівнянні, <b>the -est</b> у найвищій. Правопис: big → bigger, nice → nicer, happy → happier.', ex: [['My brother is taller than me.', 'Мій брат вищий за мене.'], ['This is the tallest building in town.', 'Це найвища будівля в місті.']] },
                { t: 'Довгі: more / the most', d: '3+ складів: <b>more</b> + прикм., <b>the most</b> + прикм.', ex: [['Gold is more expensive than silver.', 'Золото дорожче за срібло.'], ['It was the most interesting book this year.', 'Це найцікавіша книжка року.']] },
                { t: 'Винятки', d: '<b>good → better → the best</b>; <b>bad → worse → the worst</b>; <b>far → farther/further</b>.', ex: [['This idea is better than yours.', 'Ця ідея краща за твою.'], ['Today is the worst day of the week.', 'Сьогодні найгірший день тижня.']] },
                { t: 'Конструкції', d: '<b>as … as</b> — такий як; <b>than</b> після порівняльної форми; <b>the</b> перед найвищою.', ex: [['She is not as tall as her sister.', 'Вона не така висока, як сестра.'], ['one of the most famous cities', 'одне з найвідоміших міст']] }
              ],
              tip: 'Головна помилка: «більш вищий» — так само помилка й англійською: NOT «more taller». Один спосіб за раз!'
            },
            exercises: [
              { type: 'choice', q: 'My brother is ___ than me.', options: ['taller', 'more tall', 'tallest', 'the taller'], answer: 0, explain: 'Короткий прикм. + than → taller.' },
              { type: 'choice', q: 'This is the ___ film I’ve ever seen.', options: ['best', 'goodest', 'better', 'most good'], answer: 0, explain: 'Виняток: good → better → the best.' },
              { type: 'choice', q: 'She is not as ___ as her sister.', options: ['tall', 'taller', 'tallest', 'more tall'], answer: 0, explain: 'as + звичайна форма + as.' },
              { type: 'choice', q: 'Today is even ___ than yesterday. (спекотніше)', options: ['hotter', 'more hot', 'hottest', 'hoter'], answer: 0, explain: 'hot → hotter (подвоєння літери).' },
              { type: 'fill', q: 'This is the most ___ book I’ve read this year. (цікавий)', answers: ['interesting'], explain: 'the most + довгий прикм.' },
              { type: 'fill', q: 'The weather is getting ___. (гірше)', answers: ['worse'], explain: 'bad → worse.' },
              { type: 'reorder', words: ['she is', 'the tallest', 'in our class'], answer: 'She is the tallest in our class', uk: 'Вона найвища в нашому класі.' },
              { type: 'reorder', words: ['gold is', 'more expensive', 'than silver'], answer: 'Gold is more expensive than silver', uk: 'Золото дорожче за срібло.' }
            ]
          },
          {
            id: 'comparison-spelling', title: 'Правопис і прислівники: bigger, happier, more carefully', emoji: '✏️', level: 'A2', minutes: 8,
            theory: {
              intro: 'Як саме утворити форму: подвоїти літеру, змінити y на i чи додати more? А ще прислівники: fast → faster, carefully → more carefully.',
              rules: [
                { t: 'Правопис -er / -est', d: 'На <b>-e</b> → лише r / st: nice → nicer. <b>Голосна + приголосна</b> в односкладових → подвоєння: big → bigger, hot → hotter. <b>Приголосна + y</b> → i: happy → happier, easy → the easiest.', ex: [['This bag is bigger than mine.', 'Ця сумка більша за мою.'], ['It was the happiest day of my life.', 'Це був найщасливіший день мого життя.']] },
                { t: 'Двоскладові прикметники', d: 'На <b>-y</b> → -ier (busy → busier). Більшість інших — <b>more / most</b>: more modern, more careful. Деякі мають обидва варіанти: clever, narrow, quiet, simple.', ex: [['Mornings are busier than evenings.', 'Ранки напруженіші за вечори.'], ['This model is more modern.', 'Ця модель сучасніша.']] },
                { t: 'Прислівники', d: 'Короткі (fast, hard, early, late) → <b>-er / -est</b>. На <b>-ly</b> → <b>more / most</b>: more slowly, more carefully. Винятки: <b>well → better → best</b>, <b>badly → worse → worst</b>.', ex: [['She works harder than anyone.', 'Вона працює старанніше за всіх.'], ['Please drive more carefully.', 'Будь ласка, їдь обережніше.']] },
                { t: 'less / the least', d: 'Порівняння «в менший бік» — з будь-якими прикметниками: <b>less expensive, the least interesting</b>.', ex: [['This hotel is less expensive than that one.', 'Цей готель дешевший (менш дорогий) за той.']] }
              ],
              tip: 'early → earlier (y тут частина кореня), але quickly → more quickly: -ly — це суфікс прислівника.'
            },
            exercises: [
              { type: 'choice', q: 'Your suitcase is ___ than mine.', options: ['bigger', 'biger', 'more big', 'biggest'], answer: 0, explain: 'big → bigger: подвоєння g.' },
              { type: 'choice', q: 'Today is the ___ day of the year.', options: ['hottest', 'hotest', 'most hot', 'hotter'], answer: 0, explain: 'hot → the hottest.' },
              { type: 'choice', q: 'She looks ___ than yesterday.', options: ['happier', 'happyer', 'more happy', 'happiest'], answer: 0, explain: 'y → i: happier.' },
              { type: 'choice', q: 'Could you speak ___, please?', options: ['more slowly', 'slowlier', 'more slow', 'most slowly'], answer: 0, explain: 'Прислівник на -ly → more slowly.' },
              { type: 'choice', q: 'He plays tennis ___ than his brother.', options: ['better', 'gooder', 'more well', 'best'], answer: 0, explain: 'well → better.' },
              { type: 'choice', q: 'This film is ___ interesting than the book.', options: ['less', 'least', 'fewer', 'lesser'], answer: 0, explain: 'less + прикметник.' },
              { type: 'fill', q: 'I get up ___ than my wife. (раніше)', hint: 'early', answers: ['earlier'], explain: 'early → earlier.' },
              { type: 'fill', q: 'This is the ___ exercise in the book. (найлегша)', hint: 'easy', answers: ['easiest'], explain: 'easy → the easiest.' },
              { type: 'fill', q: 'You should drive ___ in the city. (обережніше)', hint: 'carefully', answers: ['more carefully'], explain: 'more + прислівник на -ly.' },
              { type: 'reorder', words: ['she works', 'harder', 'than anyone else'], answer: 'She works harder than anyone else', uk: 'Вона працює старанніше за всіх інших.' }
            ]
          },
          {
            id: 'comparison-structures', title: 'the sooner, the better · much bigger · twice as big', emoji: '📐', level: 'B1', minutes: 9,
            theory: {
              intro: 'Порівняння можна підсилити, пом’якшити, показати зміну або пропорцію. Ці конструкції звучать дуже природно в розмові.',
              rules: [
                { t: 'Підсилення і пом’якшення', d: '<b>much / far / a lot</b> + comparative — набагато; <b>a bit / slightly / a little</b> — трохи. НЕ «very bigger»!', ex: [['This phone is much cheaper.', 'Цей телефон набагато дешевший.'], ['I feel a bit better today.', 'Сьогодні мені трохи краще.']] },
                { t: 'the …-er, the …-er', d: 'Пропорція «чим…, тим…».', ex: [['The sooner, the better.', 'Чим швидше, тим краще.'], ['The more you practise, the more confident you feel.', 'Що більше практикуєшся, то впевненіше почуваєшся.']] },
                { t: 'Зміна: -er and -er / more and more', d: 'Поступове посилення: <b>colder and colder</b>, <b>more and more expensive</b>.', ex: [['It’s getting colder and colder.', 'Стає дедалі холодніше.'], ['Flights are becoming more and more expensive.', 'Перельоти стають дедалі дорожчими.']] },
                { t: 'twice as … as · the same as · different from', d: '<b>twice / three times as + прикм. + as</b> — удвічі, утричі. <b>the same as</b> — такий самий, як; <b>different from</b> — відмінний від.', ex: [['Our flat is twice as big as theirs.', 'Наша квартира вдвічі більша за їхню.'], ['My phone is the same as yours.', 'Мій телефон такий самий, як твій.']] },
                { t: 'Один із найкращих', d: '<b>one of the + найвищий ступінь + множина</b>.', ex: [['It’s one of the best films I’ve ever seen.', 'Це один із найкращих фільмів, які я бачив.']] }
              ],
              tip: 'very + звичайна форма (very big), а much / far / a lot + порівняльна (much bigger). «very bigger» ✗.'
            },
            exercises: [
              { type: 'choice', q: 'This car is ___ faster than mine.', options: ['much', 'very', 'more', 'most'], answer: 0, explain: 'Підсилення comparative → much.' },
              { type: 'choice', q: '___ you start, the sooner you’ll finish.', options: ['The earlier', 'Earlier', 'The earliest', 'More early'], answer: 0, explain: 'the + comparative, the + comparative.' },
              { type: 'choice', q: 'It’s getting ___.', options: ['darker and darker', 'more and more dark', 'dark and dark', 'the darker'], answer: 0, explain: 'Поступова зміна → darker and darker.' },
              { type: 'choice', q: 'Their house is ___ ours.', options: ['twice as big as', 'twice bigger as', 'two times big as', 'twice as bigger as'], answer: 0, explain: 'twice as + звичайна форма + as.' },
              { type: 'choice', q: 'Your answer is the same ___ mine.', options: ['as', 'like', 'than', 'that'], answer: 0, explain: 'the same as.' },
              { type: 'choice', q: 'Venice is one of the most beautiful ___ in the world.', options: ['cities', 'city', 'city’s', 'cityes'], answer: 0, explain: 'one of the + superlative + множина.' },
              { type: 'fill', q: 'I feel ___ bit better today. (трохи)', answers: ['a'], explain: 'a bit better — трохи краще.' },
              { type: 'fill', q: 'The ___ you read, the more words you learn.', answers: ['more'], explain: 'The more…, the more…' },
              { type: 'fill', q: 'Food is getting more and ___ expensive.', answers: ['more'], explain: 'more and more + довгий прикметник.' },
              { type: 'reorder', words: ['the more', 'I practise', 'the better', 'I speak'], answer: 'The more I practise the better I speak', uk: 'Що більше я практикуюся, то краще говорю.' }
            ]
          }
        ]
      },
      /* ---------- ADJ + PREP ---------- */
      {
        id: 'adj-prep', title: 'Прикметник + прийменник', emoji: '💞',
        desc: 'afraid OF, married TO, good AT, angry WITH — який прийменник стоїть після якого прикметника.',
        cheat: {
          title: 'прикметник + прийменник',
          head: ['Прийменник', 'Комбінації', 'Приклад'],
          rows: [
            [{ t: '+ of', topic: 'adj-prep' }, 'afraid of · tired of · proud of · fond of · full of · jealous of · capable of · aware of', 'She is afraid of spiders.'],
            [{ t: '+ at / in', topic: 'adj-prep' }, 'good at · bad at · brilliant at · interested in', 'He is good at maths.'],
            [{ t: '+ to', topic: 'adj-prep' }, 'married to · similar to · kind to · polite to · addicted to', 'She is married to a doctor.'],
            [{ t: '+ about / for / with', topic: 'adj-prep' }, 'excited about · worried about · famous for · ready for · angry with (sb)', 'I’m excited about the trip!'],
            [{ t: 'пастки для укр. мовця', topic: 'adj-prep' }, 'одружений з = married TO · злий на = angry WITH · добрий у = good AT', 'NOT married with!'],
            [{ t: 'bored / fed up / pleased with', topic: 'adj-prep-feelings' }, 'знуджений · набридло · задоволений', 'I’m fed up with waiting.'],
            [{ t: 'keen on · crazy about · shocked by', topic: 'adj-prep-feelings' }, 'захоплюватися · без розуму · шокований', 'He’s keen on photography.'],
            [{ t: 'good at / for / with', topic: 'adj-prep-meaning' }, 'вміє / корисний / ладнає з', 'good for your health'],
            [{ t: 'angry with sb / about sth', topic: 'adj-prep-meaning' }, 'людина → with, ситуація → about', 'angry about the delay']
          ]
        },
        topics: [
          {
            id: 'adj-prep', title: 'Adjective + Preposition', emoji: '💞', level: 'B1', minutes: 9,
            theory: {
              intro: 'В англійській прикметники «дружать» із конкретними прийменниками — і часто не з тими, що в українській. Вчимо парою, як залежні прийменники.',
              rules: [
                { t: '+ of', d: '<b>afraid of</b> (боюся), <b>tired of</b> (втомився від), <b>proud of</b> (пишаюся), <b>fond of</b> (люблю), <b>full of</b>, <b>jealous of</b>, <b>capable of</b>, <b>aware of</b>.', ex: [['She is afraid of spiders.', 'Вона боїться павуків.'], ['They are proud of their children.', 'Вони пишаються дітьми.']] },
                { t: '+ at / in', d: '<b>good/bad/brilliant at</b> — добрий у чомусь; <b>interested in</b> — цікавитися чимось.', ex: [['He is good at mathematics.', 'У нього хист до математики.'], ['Are you interested in art?', 'Ти цікавишся мистецтвом?']] },
                { t: '+ to', d: '<b>married to</b> (одружений з — НЕ with!), <b>similar to</b> (схожий на), <b>kind/polite to</b> (добрий до), <b>addicted to</b>.', ex: [['She is married to a doctor.', 'Вона заміжня за лікарем.'], ['This film is similar to the previous one.', 'Цей фільм схожий на попередній.']] },
                { t: '+ about / for / with', d: '<b>excited/worried about</b>, <b>famous for</b>, <b>ready for</b>, <b>sorry for</b>, <b>angry with</b> (кимсь) / <b>about</b> (чимось).', ex: [['I’m really excited about the trip!', 'Я в захваті від поїздки!'], ['He is angry with his brother about the money.', 'Він злий на брата через гроші.']] }
              ],
              tip: 'Топ-3 пастки: married TO (не with), good AT (не in), angry WITH (не on). Просто закарбуйте трійку.'
            },
            exercises: [
              { type: 'choice', q: 'She is afraid ___ spiders.', options: ['of', 'from', 'with', 'about'], answer: 0, explain: 'afraid of — боятися чогось.' },
              { type: 'choice', q: 'He is married ___ a doctor.', options: ['to', 'with', 'by', 'for'], answer: 0, explain: 'married TO — одружений з.' },
              { type: 'choice', q: 'They are proud ___ their children.', options: ['of', 'about', 'for', 'with'], answer: 0, explain: 'proud of — пишатися кимось.' },
              { type: 'choice', q: 'I’m really excited ___ the trip!', options: ['about', 'of', 'for', 'with'], answer: 0, explain: 'excited about — у захваті від.' },
              { type: 'fill', q: 'She is very good ___ mathematics.', answers: ['at'], explain: 'good at — мати хист до.' },
              { type: 'fill', q: 'This film is similar ___ the one we saw last year.', answers: ['to'], explain: 'similar to — схожий на.' },
              { type: 'reorder', words: ['she is fond of', 'classical music'], answer: 'She is fond of classical music', uk: 'Вона любить класичну музику.' },
              { type: 'reorder', words: ['he is angry with', 'his brother', 'about the money'], answer: 'He is angry with his brother about the money', uk: 'Він злий на брата через гроші.' }
            ]
          },
          {
            id: 'adj-prep-feelings', title: 'Почуття і ставлення: fed up with, keen on, grateful to', emoji: '😤', level: 'B1', minutes: 9,
            theory: {
              intro: 'Прикметники емоцій — найчастіша пастка: «набридло», «захоплююся», «вдячний за» — і кожен має свій прийменник, часто не той, що підказує українська.',
              rules: [
                { t: '+ with', d: '<b>bored with</b> (знуджений), <b>fed up with</b> (набридло), <b>pleased / satisfied with</b> (задоволений), <b>disappointed with</b> (чимось), <b>annoyed with</b> (кимось).', ex: [['I’m fed up with this weather.', 'Мені набридла ця погода.'], ['Are you satisfied with the result?', 'Ти задоволений результатом?']] },
                { t: '+ about', d: '<b>nervous / worried / anxious about</b>, <b>excited about</b>, <b>crazy about</b> (без розуму від), <b>upset about</b>.', ex: [['She’s crazy about K-pop.', 'Вона без розуму від K-pop.'], ['Don’t be nervous about the interview.', 'Не нервуй через співбесіду.']] },
                { t: '+ on / by / at', d: '<b>keen on</b> (захоплюватися), <b>surprised / shocked at / by</b>, <b>amazed at / by</b>, <b>impressed by / with</b>.', ex: [['He’s really keen on photography.', 'Він дуже захоплюється фотографією.'], ['We were shocked by the news.', 'Нас шокувала новина.']] },
                { t: '+ for / to', d: '<b>grateful to</b> кому <b>for</b> що, <b>famous / responsible for</b>, <b>used to</b> (звиклий до), <b>rude / nice to</b> кому.', ex: [['I’m grateful to you for your help.', 'Я вдячний тобі за допомогу.'], ['Who is responsible for this project?', 'Хто відповідає за цей проєкт?']] }
              ],
              tip: 'Після прийменника — іменник або -ing: keen on playing ✓, keen on play ✗; fed up with waiting ✓.'
            },
            exercises: [
              { type: 'choice', q: 'I’m fed up ___ doing the same thing every day.', options: ['with', 'of', 'from', 'about'], answer: 0, explain: 'fed up with — набридло.' },
              { type: 'choice', q: 'She’s crazy ___ horses.', options: ['about', 'on', 'for', 'of'], answer: 0, explain: 'crazy about — без розуму від.' },
              { type: 'choice', q: 'He’s very keen ___ cooking.', options: ['on', 'in', 'at', 'of'], answer: 0, explain: 'keen on + -ing.' },
              { type: 'choice', q: 'We were impressed ___ his English.', options: ['by', 'of', 'at', 'for'], answer: 0, explain: 'impressed by / with.' },
              { type: 'choice', q: 'I’m really grateful ___ my parents for their support.', options: ['to', 'for', 'with', 'at'], answer: 0, explain: 'grateful to кому for що.' },
              { type: 'choice', q: 'Are you nervous ___ the exam?', options: ['about', 'for', 'of', 'on'], answer: 0, explain: 'nervous about.' },
              { type: 'fill', q: 'Who is responsible ___ the budget?', answers: ['for'], explain: 'responsible for.' },
              { type: 'fill', q: 'I was surprised ___ the price. (at / by)', answers: ['at', 'by'], explain: 'surprised at / by.' },
              { type: 'fill', q: 'The teacher was pleased ___ our work.', answers: ['with'], explain: 'pleased with.' },
              { type: 'reorder', words: ['I’m not keen on', 'getting up', 'early'], answer: 'I’m not keen on getting up early', uk: 'Я не люблю рано вставати.' }
            ]
          },
          {
            id: 'adj-prep-meaning', title: 'Один прикметник — різні прийменники: good at / good for', emoji: '🔀', level: 'B2', minutes: 9,
            theory: {
              intro: 'Деякі прикметники змінюють значення залежно від прийменника. Змінив прийменник — змінився зміст речення.',
              rules: [
                { t: 'good at / good for / good with', d: '<b>good at</b> — вмілий у чомусь; <b>good for</b> — корисний для; <b>good with</b> — вміє поводитися з (дітьми, тваринами, руками); <b>good to</b> — добрий до когось.', ex: [['She’s good at chess.', 'Вона добре грає в шахи.'], ['Walking is good for your health.', 'Ходьба корисна для здоров’я.']] },
                { t: 'angry / annoyed with vs about', d: '<b>with</b> + людина, <b>about</b> + ситуація.', ex: [['I’m angry with Tom.', 'Я злий на Тома.'], ['I’m angry about the delay.', 'Я злий через затримку.']] },
                { t: 'sorry for / sorry about', d: '<b>sorry about</b> + ситуація (шкода, що…); <b>sorry for</b> + дія, за яку вибачаєшся (sorry for being late); <b>feel sorry for</b> + людина — жаліти.', ex: [['Sorry for being late.', 'Вибач, що запізнився.'], ['I feel sorry for him.', 'Мені його шкода.']] },
                { t: 'tired of / from · concerned about / with', d: '<b>tired of</b> — набридло; <b>tired from</b> — утомився через (фізично). <b>concerned about</b> — стурбований; <b>concerned with</b> — стосується, присвячений.', ex: [['I’m tired of your excuses.', 'Мені набридли твої відмовки.'], ['The book is concerned with climate change.', 'Книжка присвячена зміні клімату.']] },
                { t: 'different from · similar to · independent of', d: '<b>different from</b> (у брит. також to), <b>similar to</b>, <b>dependent on</b>, але <b>independent of</b>.', ex: [['She wants to be independent of her parents.', 'Вона хоче бути незалежною від батьків.']] }
              ],
              tip: 'Людина → with (angry with you), ситуація → about (angry about the noise). Уміння → at, користь → for.'
            },
            exercises: [
              { type: 'choice', q: 'Vegetables are good ___ you.', options: ['for', 'at', 'with', 'to'], answer: 0, explain: 'Корисний для → good for.' },
              { type: 'choice', q: 'My brother is good ___ fixing things.', options: ['at', 'for', 'to', 'of'], answer: 0, explain: 'Уміння → good at.' },
              { type: 'choice', q: 'She’s very good ___ animals — they love her.', options: ['with', 'at', 'for', 'of'], answer: 0, explain: 'Уміє поводитися з → good with.' },
              { type: 'choice', q: 'Don’t be angry ___ me! It wasn’t my fault.', options: ['with', 'about', 'on', 'at'], answer: 0, explain: 'Людина → angry with.' },
              { type: 'choice', q: 'Everyone was angry ___ the new rules.', options: ['about', 'with', 'on', 'to'], answer: 0, explain: 'Ситуація → angry about.' },
              { type: 'choice', q: 'I’m tired ___ hearing the same excuses.', options: ['of', 'from', 'with', 'by'], answer: 0, explain: 'Набридло → tired of.' },
              { type: 'fill', q: 'I feel sorry ___ people who live alone. (жаліти)', answers: ['for'], explain: 'feel sorry for + людина.' },
              { type: 'fill', q: 'Sorry ___ the noise last night.', answers: ['about', 'for'], explain: 'sorry about / for + ситуація.' },
              { type: 'fill', q: 'He wants to be independent ___ his parents.', answers: ['of'], explain: 'independent of (а dependent on).' },
              { type: 'reorder', words: ['she is', 'very good', 'with children'], answer: 'She is very good with children', uk: 'Вона вміє ладнати з дітьми.' }
            ]
          }
        ]
      },
      /* ---------- TAG QUESTIONS ---------- */
      {
        id: 'tags', title: 'Розділові питання (tag questions)', emoji: '🏷️',
        desc: 'He can’t drive, can he? — короткі «хвостики» для перевірки та уточнення.',
        cheat: {
          title: 'правило гойдалки',
          head: ['Правило', 'Переклад і формула', 'Приклад'],
          rows: [
            [{ t: 'ствердження → заперечний хвостик', topic: 'tags' }, '+ … , не так?', 'She is nice, isn’t she?'],
            [{ t: 'заперечення → ствердний хвостик', topic: 'tags' }, '− … , чи так?', 'He can’t drive, can he?'],
            [{ t: 'немає допоміжного → do/does/did', topic: 'tags' }, 'для Present/Past Simple', 'She lives here, doesn’t she?'],
            [{ t: 'I am → aren’t I? · Let’s → shall we?', topic: 'tags' }, 'особливі форми', 'I’m late, aren’t I? · Let’s go, shall we?'],
            [{ t: 'never / nothing → ствердний хвостик', topic: 'tags' }, 'речення вже заперечне за змістом', 'He never smiles, does he?'],
            [{ t: 'наказ → will you? · Let’s → shall we?', topic: 'tags-special' }, 'прохання: «гаразд?»', 'Close the door, will you?'],
            [{ t: 'there is → isn’t there? · somebody → they', topic: 'tags-special' }, 'особливі підмети', 'Someone called, didn’t they?'],
            [{ t: 'reply questions: Have you?', topic: 'tags-reply' }, '«Справді?» — допоміжне + підмет', '— I’ve been there. — Have you?'],
            [{ t: 'інтонація ↗ / ↘', topic: 'tags-reply' }, 'справжнє питання / очікую згоди', 'It’s nice, isn’t it? ↘']
          ]
        },
        topics: [
          {
            id: 'tags', title: 'Розділові питання', emoji: '🏷️', level: 'B1', minutes: 9,
            theory: {
              intro: '«Правда ж?», «так?» — англійською це маленький хвостик у кінці речення. Правило одне: гойдалка між «так» і «ні».',
              rules: [
                { t: 'Гойдалка', d: 'Ствердження → заперечний хвостик; заперечення → ствердний.', ex: [['She is a doctor, isn’t she?', 'Вона лікар, правда?'], ['You can’t swim, can you?', 'Ти ж не вмієш плавати?']] },
                { t: 'Допоміжне дієслово з речення', d: 'is/isn’t, can/can’t, will/won’t, have/haven’t. Якщо його немає — <b>do/does/did</b>.', ex: [['They will come, won’t they?', 'Вони прийдуть, правда?'], ['She lives here, doesn’t she?', 'Вона тут живе, чи ні?']] },
                { t: 'Особливі випадки', d: '<b>I am</b> → aren’t I? · <b>Let’s</b> → shall we? · наказовий спосіб → will you?', ex: [['I’m late, aren’t I?', 'Я спізнився, чи не так?'], ['Let’s take a break, shall we?', 'Зробімо перерву, гаразд?']] },
                { t: 'never / nothing / nobody', d: 'Таке речення вважається заперечним → хвостик ствердний.', ex: [['He never smiles, does he?', 'Він ніколи не посміхається, правда?'], ['Nothing is wrong, is it?', 'Нічого ж не сталося?']] }
              ],
              tip: 'Інтуїція гойдалки: зліва «+» — справа «−», і навпаки. А never/hardly/nothing хитають речення в «−» самі по собі.'
            },
            exercises: [
              { type: 'choice', q: 'She is a doctor, ___?', options: ['isn’t she', 'is she', 'doesn’t she', 'don’t she'], answer: 0, explain: 'Ствердження з is → isn’t she.' },
              { type: 'choice', q: 'You can’t swim, ___?', options: ['can you', 'can’t you', 'do you', 'don’t you'], answer: 0, explain: 'Заперечення → ствердний хвостик.' },
              { type: 'choice', q: 'They went home early, ___?', options: ['didn’t they', 'don’t they', 'weren’t they', 'hadn’t they'], answer: 0, explain: 'Past Simple без допоміжного → didn’t.' },
              { type: 'choice', q: 'I am late, ___?', options: ['aren’t I', 'amn’t I', 'don’t I', 'isn’t it'], answer: 0, explain: 'I am → особлива форма aren’t I?' },
              { type: 'fill', q: 'He plays the guitar, ___ he?', answers: ['doesn’t'], explain: 'Present Simple, ствердження → doesn’t.' },
              { type: 'fill', q: 'Let’s take a break, ___ we?', answers: ['shall'], explain: 'Let’s → shall we?' },
              { type: 'reorder', words: ['it is cold today', 'isn’t it'], answer: 'It is cold today isn’t it', uk: 'Сьогодні холодно, правда?' },
              { type: 'reorder', words: ['you don’t like coffee', 'do you'], answer: 'You don’t like coffee do you', uk: 'Ти ж не любиш каву?' }
            ]
          },
          {
            id: 'tags-special', title: 'Хитрі хвостики: Let’s…, shall we? · Nobody…, did they?', emoji: '🧩', level: 'B2', minutes: 9,
            theory: {
              intro: 'Правило «гойдалки» працює завжди, але є конструкції, де хвостик неочевидний: наказовий спосіб, there is, somebody, used to, had better.',
              rules: [
                { t: 'Наказовий спосіб', d: 'Прохання → <b>will you? / would you? / can you?</b> Заперечний наказ → <b>will you?</b> Let’s → <b>shall we?</b>', ex: [['Open the window, will you?', 'Відчини вікно, гаразд?'], ['Don’t tell anyone, will you?', 'Нікому не кажи, добре?']] },
                { t: 'there is / there are', d: 'Хвостик теж із <b>there</b>: There’s a problem, <b>isn’t there?</b>', ex: [['There are no tickets left, are there?', 'Квитків уже не лишилося, так?']] },
                { t: 'somebody, everyone, nobody → they; nothing, everything → it', d: 'Люди → <b>they</b>; речі → <b>it</b>. nobody / nothing — заперечні → хвостик ствердний.', ex: [['Everyone was happy, weren’t they?', 'Усі були щасливі, правда?'], ['Nothing happened, did it?', 'Нічого ж не сталося?']] },
                { t: 'used to, had better, would rather, I think', d: '<b>used to</b> → didn’t; <b>’d better</b> → hadn’t; <b>’d rather</b> → wouldn’t. Після <b>I think / I suppose</b> хвостик — до підрядного речення.', ex: [['You used to live here, didn’t you?', 'Ти ж колись тут жив?'], ['I think it’s going to rain, isn’t it?', 'Здається, буде дощ, так?']] }
              ],
              tip: 'Шукай справжній «двигун» речення: у «I think it’s late» це it is → isn’t it, а не don’t I.'
            },
            exercises: [
              { type: 'choice', q: 'Let’s go to the cinema, ___?', options: ['shall we', 'will we', 'don’t we', 'let we'], answer: 0, explain: 'Let’s → shall we?' },
              { type: 'choice', q: 'Close the door, ___?', options: ['will you', 'do you', 'don’t you', 'are you'], answer: 0, explain: 'Прохання в наказовому способі → will you?' },
              { type: 'choice', q: 'There’s a bank near here, ___?', options: ['isn’t there', 'isn’t it', 'is there', 'hasn’t it'], answer: 0, explain: 'there is → isn’t there?' },
              { type: 'choice', q: 'Somebody called me, ___?', options: ['didn’t they', 'didn’t he', 'did they', 'wasn’t it'], answer: 0, explain: 'somebody → they; ствердження → didn’t they?' },
              { type: 'choice', q: 'Nothing is impossible, ___?', options: ['is it', 'isn’t it', 'is there', 'aren’t they'], answer: 0, explain: 'nothing → it, речення заперечне → is it?' },
              { type: 'choice', q: 'You’d better leave now, ___?', options: ['hadn’t you', 'wouldn’t you', 'didn’t you', 'don’t you'], answer: 0, explain: '’d better = had better → hadn’t you?' },
              { type: 'fill', q: 'You used to smoke, ___ you?', answers: ['didn’t', 'did not'], explain: 'used to → didn’t.' },
              { type: 'fill', q: 'Nobody noticed, ___ they?', answers: ['did'], explain: 'nobody — заперечне → did they?' },
              { type: 'fill', q: 'I think she’s right, ___ she?', answers: ['isn’t', 'is not'], explain: 'Хвостик до «she is» → isn’t she?' },
              { type: 'reorder', words: ['don’t be late', 'will you'], answer: 'Don’t be late will you', uk: 'Не запізнюйся, добре?' }
            ]
          },
          {
            id: 'tags-reply', title: 'Інтонація і відповіді-питання: Oh, have you?', emoji: '🎙️', level: 'B2', minutes: 8,
            theory: {
              intro: 'Той самий хвостик може бути справжнім питанням або проханням погодитися — усе вирішує інтонація. А короткі «відповіді-питання» показують, що ти уважно слухаєш.',
              rules: [
                { t: 'Інтонація ↗ vs ↘', d: '<b>↗ вгору</b> — справді не знаю, питаю. <b>↘ вниз</b> — майже впевнений, чекаю згоди.', ex: [['You’re from Lviv, aren’t you? ↘', 'Ти ж зі Львова, так? (впевнений)'], ['You’re from Lviv, aren’t you? ↗', 'Ти зі Львова, чи не так? (не певен)']] },
                { t: 'Reply questions — «Справді?»', d: 'Реакція на почуте: допоміжне + підмет — <b>Have you? Did she? Is it?</b> Знак такий самий, як у почутому реченні.', ex: [['— I’ve been to Japan. — Have you? What was it like?', '— Я був у Японії. — Справді? І як там?'], ['— She didn’t come. — Didn’t she? Why?', '— Вона не прийшла. — Не прийшла? Чому?']] },
                { t: 'Однаковий знак: So you’re leaving, are you?', d: 'Ствердження + ствердний хвостик = здивування, іронія або уточнення почутого.', ex: [['So you’ve bought a new car, have you?', 'То ти, значить, купив нову машину?']] },
                { t: 'Відповідь — про факт', d: 'Відповідаємо на факт: <b>Yes, I am / No, I’m not</b>, а не «так / ні» на хвостик.', ex: [['— You aren’t tired, are you? — No, I’m not.', '— Ти ж не втомився? — Ні, не втомився.']] }
              ],
              tip: 'Відповідай на факт, а не на хвостик: «You don’t smoke, do you?» — «No, I don’t» (не палю) ✓; «Yes, I do» = палю.'
            },
            exercises: [
              { type: 'choice', q: '— I’ve just won a prize! — ___? That’s great!', options: ['Have you', 'Did you', 'Haven’t you', 'Are you'], answer: 0, explain: 'Reply question: have → Have you?' },
              { type: 'choice', q: '— She can speak five languages. — ___? Wow!', options: ['Can she', 'Does she', 'Can’t she', 'Is she'], answer: 0, explain: 'can → Can she?' },
              { type: 'choice', q: '— We didn’t get the email. — ___? I sent it yesterday.', options: ['Didn’t you', 'Did you', 'Don’t you', 'Haven’t you'], answer: 0, explain: 'Заперечення → Didn’t you?' },
              { type: 'choice', q: 'Хвостик з інтонацією вниз ↘ означає, що мовець…', options: ['майже впевнений і чекає згоди', 'справді не знає відповіді', 'віддає наказ', 'ввічливо просить'], answer: 0, explain: 'Вниз ↘ — очікуємо згоди.' },
              { type: 'choice', q: '— You don’t eat meat, do you? — ___ (не їм)', options: ['No, I don’t.', 'Yes, I don’t.', 'Yes, I do.', 'No, I do.'], answer: 0, explain: 'Відповідь про факт: не їм → No, I don’t.' },
              { type: 'choice', q: 'So you’re the new manager, ___?', options: ['are you', 'aren’t you', 'do you', 'is it'], answer: 0, explain: 'Однаковий знак — здивування або уточнення.' },
              { type: 'fill', q: '— It’s my birthday today. — ___ it? Happy birthday!', answers: ['Is'], explain: 'is → Is it?' },
              { type: 'fill', q: '— Tom lives in London now. — ___ he? Since when?', answers: ['Does'], explain: 'Present Simple → Does he?' },
              { type: 'reorder', words: ['so you’ve met', 'my sister', 'have you'], answer: 'So you’ve met my sister have you', uk: 'То ти вже знайомий з моєю сестрою?' }
            ]
          }
        ]
      },
      /* ---------- RELATIVE CLAUSES ---------- */
      {
        id: 'relative', title: 'Relative Clauses: who / which / where', emoji: '🧬',
        desc: 'Підрядні означальні: хто, який, де, чий, чому — з комами і без.',
        cheat: {
          title: 'хто · що · де · чий',
          head: ['Слово', 'Переклад і коли вживаємо', 'Приклад'],
          rows: [
            [{ t: 'who / that', topic: 'relative' }, 'хто / який (про людей; that — лише без коми)', 'the woman who lives next door'],
            [{ t: 'which / that', topic: 'relative' }, 'що / який (про речі)', 'the book that I’m reading'],
            [{ t: 'where / when / why', topic: 'relative' }, 'де / коли / чому', 'the café where we met'],
            [{ t: 'whose', topic: 'relative' }, 'чий (приналежність)', 'the boy whose bike was stolen'],
            [{ t: 'з комою ≠ без коми', topic: 'relative' }, 'уточнення з комами; that після коми заборонено', 'My brother, who is five, starts school.'],
            [{ t: ', which — про ціле речення', topic: 'relative-nondefining' }, '«що», «і це» · завжди з комою', 'He was late, which annoyed me.'],
            [{ t: 'defining vs non-defining', topic: 'relative-nondefining' }, 'без ком (that ок, можна пропустити) / з комами (без that)', 'My sister, who lives in Kyiv, …'],
            [{ t: 'прийменник: the man I spoke to', topic: 'relative-advanced' }, 'розмовно — в кінці · формально — to whom', 'the flat I told you about'],
            [{ t: 'what = the thing that', topic: 'relative-advanced' }, 'те, що · НЕ після іменника', 'What I need is sleep.'],
            [{ t: 'скорочені: sitting / written', topic: 'relative-advanced' }, 'who is V-ing → V-ing · which was V3 → V3', 'the woman sitting there']
          ]
        },
        topics: [
          {
            id: 'relative', title: 'Relative Clauses', emoji: '🧬', level: 'B1', minutes: 10,
            theory: {
              intro: 'Підрядні означальні додають інформацію про іменник: «жінка, ЯКА живе поруч», «кав’ярня, ДЕ ми зустрілися». Головне — обрати правильне слово-сполучник.',
              rules: [
                { t: 'who / which / that', d: '<b>who</b> — люди, <b>which</b> — речі, <b>that</b> — обидва (лише без коми). У розмовній that перемагає.', ex: [['The woman who lives next door is a doctor.', 'Жінка, що живе поруч, — лікар.'], ['The book that I’m reading is great.', 'Книжка, яку я читаю, чудова.']] },
                { t: 'where / when / why / whose', d: '<b>where</b> — місце, <b>when</b> — час, <b>why</b> — причина, <b>whose</b> — приналежність (чий).', ex: [['This is the café where we met.', 'Це кав’ярня, де ми зустрілися.'], ['The boy whose bike was stolen called the police.', 'Хлопець, чий велосипед украли, викликав поліцію.']] },
                { t: 'Без коми ≠ з комою', d: 'Без коми — визначаємо, про кого/що йдеться (that ок). З комою — лише уточнюємо (та заборонено).', ex: [['My brother, who is five, starts school next year.', 'Мій брат, якому п’ять, іде до школи наступного року.']] },
                { t: 'Слово можна пропустити', d: 'Якщо займенник — додаток (далі йде підмет): The book (that) I read…', ex: [['The film (that) we watched was boring.', 'Фільм, який ми дивилися, був нудний.']] }
              ],
              tip: 'Тест на кому: якщо речення без підрядного й так зрозуміло, про кого мова — ставте кому і беріть who/which, НЕ that.'
            },
            exercises: [
              { type: 'choice', q: 'The woman ___ lives next door is a doctor.', options: ['who', 'which', 'where', 'whose'], answer: 0, explain: 'Людина → who.' },
              { type: 'choice', q: 'This is the café ___ we met.', options: ['where', 'which', 'who', 'whose'], answer: 0, explain: 'Місце → where.' },
              { type: 'choice', q: 'The book ___ I’m reading is great.', options: ['that', 'who', 'where', 'when'], answer: 0, explain: 'Річ → that (або which).' },
              { type: 'choice', q: 'The boy ___ bike was stolen called the police.', options: ['whose', 'who', 'which', 'where'], answer: 0, explain: 'Приналежність (чий?) → whose.' },
              { type: 'fill', q: 'That’s the reason ___ I was late.', answers: ['why'], explain: 'Причина → why.' },
              { type: 'fill', q: 'My brother, ___ is five, starts school next year.', answers: ['who'], explain: 'Уточнення з комою про людину → who (не that!).' },
              { type: 'reorder', words: ['the man', 'who called you', 'is my uncle'], answer: 'The man who called you is my uncle', uk: 'Чоловік, який тобі телефонував, — мій дядько.' },
              { type: 'reorder', words: ['the city where', 'I was born', 'is small'], answer: 'The city where I was born is small', uk: 'Місто, де я народився, маленьке.' }
            ]
          },
          {
            id: 'relative-nondefining', title: 'З комами чи без: defining vs non-defining', emoji: '🪄', level: 'B1', minutes: 9,
            theory: {
              intro: 'Одне й те саме підрядне може бути визначальним (без ком — без нього незрозуміло, про кого мова) або додатковим (з комами — просто цікава деталь). Від цього залежать коми, that і чи можна пропустити займенник.',
              rules: [
                { t: 'Defining — без ком', d: 'Уточнює, ПРО КОГО саме. Можна <b>that</b>; якщо займенник — додаток, його можна пропустити.', ex: [['The girl (that) I met yesterday is Italian.', 'Дівчина, з якою я вчора познайомився, — італійка.'], ['People who exercise live longer.', 'Люди, які займаються спортом, живуть довше.']] },
                { t: 'Non-defining — з комами', d: 'Додаткова інформація про вже відоме. Лише <b>who / which / whose / where</b>; <b>that</b> заборонено, пропускати займенник не можна.', ex: [['My sister, who lives in Kyiv, is a nurse.', 'Моя сестра, яка живе в Києві, — медсестра.'], ['Lviv, which I visited last year, is beautiful.', 'Львів, де я був торік, — гарне місто.']] },
                { t: ', which — про ціле речення', d: '<b>, which</b> може стосуватися всієї попередньої думки: «що», «і це».', ex: [['He passed the exam, which surprised everyone.', 'Він склав іспит, що всіх здивувало.'], ['It rained all day, which was annoying.', 'Цілий день ішов дощ, і це дратувало.']] },
                { t: 'Кома змінює зміст', d: 'Без ком — вибираємо одного з кількох; з комами — він один, а решта — деталь.', ex: [['My brother who lives in Canada is a doctor.', 'Мій брат, що живе в Канаді, лікар (у мене кілька братів).'], ['My brother, who lives in Canada, is a doctor.', 'Мій брат (а він живе в Канаді) — лікар (брат один).']] }
              ],
              tip: 'Тест: викресли підрядне. Речення все ще зрозуміле? → коми + who / which, без that.'
            },
            exercises: [
              { type: 'choice', q: 'My mother, ___ is 60, still runs every morning.', options: ['who', 'that', 'which', 'whose'], answer: 0, explain: 'Non-defining про людину → who (that заборонено).' },
              { type: 'choice', q: 'The laptop ___ I bought last week is already broken.', options: ['that', 'who', 'whose', 'where'], answer: 0, explain: 'Defining про річ → that / which (можна й пропустити).' },
              { type: 'choice', q: 'He didn’t call me back, ___ was really rude.', options: ['which', 'that', 'what', 'who'], answer: 0, explain: ', which — про всю ситуацію.' },
              { type: 'choice', q: 'Kyiv, ___ my parents live, is the capital of Ukraine.', options: ['where', 'which', 'that', 'when'], answer: 0, explain: 'Місце в non-defining → where.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['Paris, which I love, is expensive.', 'Paris, that I love, is expensive.', 'Paris which I love, is expensive.', 'Paris, I love, is expensive.'], answer: 0, explain: 'Non-defining: дві коми + which.' },
              { type: 'choice', q: 'У якому реченні займенник МОЖНА пропустити?', options: ['The film that we watched was long.', 'The man who called you is my uncle.', 'My dad, who is a pilot, travels a lot.', 'The dog that bit me ran away.'], answer: 0, explain: 'Пропускаємо, коли займенник — додаток: we watched it.' },
              { type: 'fill', q: 'The book ___ you gave me is fantastic. (який)', answers: ['that', 'which'], explain: 'Defining → that / which.' },
              { type: 'fill', q: 'She won the lottery, ___ changed her life.', answers: ['which'], explain: ', which — про всю подію.' },
              { type: 'fill', q: 'Anna, ___ brother works with me, is coming tonight. (чий)', answers: ['whose'], explain: 'Приналежність → whose.' },
              { type: 'reorder', words: ['my car', 'which is ten years old', 'still works perfectly'], answer: 'My car which is ten years old still works perfectly', uk: 'Моя машина, якій десять років, досі чудово їздить.' }
            ]
          },
          {
            id: 'relative-advanced', title: 'Прийменники, whom, what і скорочені звороти', emoji: '🧷', level: 'B2', minutes: 10,
            theory: {
              intro: 'Просунуті підрядні: де ставити прийменник, коли потрібне whom, чим what відрізняється від which і як скоротити речення до звороту.',
              rules: [
                { t: 'Прийменник: у кінці чи на початку', d: 'Розмовно — у кінці: <b>the man I spoke to</b>. Формально — перед <b>whom / which</b>: <b>the man to whom I spoke</b>. Після прийменника НЕ who і НЕ that.', ex: [['This is the flat (that) I told you about.', 'Це квартира, про яку я тобі розповідав.'], ['The person to whom this letter is addressed…', 'Особа, якій адресовано цей лист…']] },
                { t: 'whom', d: 'Формальний додаток про людину: <b>whom</b> замість who після прийменника або в офіційному стилі.', ex: [['The candidate whom we interviewed was excellent.', 'Кандидат, з яким ми провели співбесіду, був чудовий.']] },
                { t: 'what = the thing(s) that', d: '<b>what</b> не стоїть після іменника: це «те, що». Порівняй: the thing <b>that</b> I need = <b>what</b> I need.', ex: [['What I need is a holiday.', 'Що мені потрібно — це відпустка.'], ['I didn’t understand what he said.', 'Я не зрозумів, що він сказав.']] },
                { t: 'Скорочені підрядні: -ing / V3', d: 'who is sitting → <b>sitting</b>; which was written → <b>written</b>.', ex: [['The woman sitting next to me was a doctor.', 'Жінка, яка сиділа поруч, була лікарем.'], ['Most of the books written by him are bestsellers.', 'Більшість книжок, написаних ним, — бестселери.']] },
                { t: 'where / when = in which / on which', d: '<b>the house where I grew up</b> = the house in which I grew up; <b>the day when we met</b>.', ex: [['I remember the day when we first met.', 'Я пам’ятаю день, коли ми вперше зустрілися.']] }
              ],
              tip: '«This is the thing what I want» ✗ → the thing that I want ✓ або what I want ✓. what не йде після іменника.'
            },
            exercises: [
              { type: 'choice', q: 'That’s the girl I told you ___.', options: ['about', 'about her', 'whom', 'what'], answer: 0, explain: 'Прийменник у кінці: told you about.' },
              { type: 'choice', q: 'The man to ___ I spoke was very helpful.', options: ['whom', 'who', 'that', 'which'], answer: 0, explain: 'Після прийменника про людину → whom.' },
              { type: 'choice', q: '___ I love most about summer is the long evenings.', options: ['What', 'Which', 'That', 'The thing what'], answer: 0, explain: 'Те, що → What.' },
              { type: 'choice', q: 'This is the thing ___ I wanted to show you.', options: ['that', 'what', 'who', 'whom'], answer: 0, explain: 'Після іменника → that / which, не what.' },
              { type: 'choice', q: 'The people ___ in the queue were getting angry.', options: ['waiting', 'waited', 'who waiting', 'were waiting'], answer: 0, explain: 'who were waiting → waiting.' },
              { type: 'choice', q: 'A lot of the houses ___ in the 1960s need repair.', options: ['built', 'building', 'which built', 'were built'], answer: 0, explain: 'which were built → built.' },
              { type: 'fill', q: 'I’ll never forget the day ___ I got my first job. (коли)', answers: ['when', 'that'], explain: 'Час → when.' },
              { type: 'fill', q: 'The hotel ___ we stayed was near the beach. (де)', answers: ['where'], explain: 'Місце → where.' },
              { type: 'fill', q: 'Do you understand ___ I mean? (що)', answers: ['what'], explain: 'Те, що → what.' },
              { type: 'reorder', words: ['the woman', 'sitting next to me', 'was reading a book'], answer: 'The woman sitting next to me was reading a book', uk: 'Жінка, що сиділа поруч зі мною, читала книжку.' }
            ]
          }
        ]
      },
      /* ---------- REPORTED SPEECH ---------- */
      {
        id: 'reported', title: 'Reported Speech — непряма мова', emoji: '🗨️',
        desc: 'Він сказав, що… — крок часу назад, займенники, маркери та питання без інверсії.',
        cheat: {
          title: 'пряма мова → непряма',
          head: ['Трансформація', 'Переклад і формула', 'Приклад'],
          rows: [
            [{ t: 'Present → Past', topic: 'reported' }, 'am/is → was · work → worked', '«I am tired» → She said she was tired.'],
            [{ t: 'Past → Past Perfect', topic: 'reported' }, 'did → had done', '«I saw him» → She said she had seen him.'],
            [{ t: 'will / can / must', topic: 'reported' }, 'would / could / had to', '«I will call» → He said he would call.'],
            [{ t: 'маркери часу/місця', topic: 'reported' }, 'tomorrow → the next day · here → there · now → then', '«tomorrow» → the next day'],
            [{ t: 'питання', topic: 'reported' }, 'if/whether + порядок розповіді', 'He asked if I was tired.'],
            [{ t: 'told me (not) to V · asked me to V', topic: 'reported-commands' }, 'накази й прохання', '«Sit down» → She told me to sit down.'],
            [{ t: 'suggest / admit / deny + -ing', topic: 'reported-commands' }, 'пропозиції, визнання · НЕ suggested me to', 'He suggested going out.'],
            [{ t: 'promise / refuse to · advise / warn sb to', topic: 'reported-commands' }, 'обіцянки, відмови, поради', 'She advised me to rest.'],
            [{ t: 'без зсуву: says / досі правда', topic: 'reported-no-backshift' }, 'час лишається тим самим', 'He says he’s tired.'],
            [{ t: 'should / could / might / would', topic: 'reported-no-backshift' }, 'не змінюються', 'She said I should apologise.']
          ]
        },
        topics: [
          {
            id: 'reported', title: 'Reported Speech', emoji: '🗨️', level: 'B2', minutes: 10,
            theory: {
              intro: 'Переказуємо чужі слова: час робить крок назад, займенники змінюються, а питання стають розповідними. Зате звучить як справжній рівень B2.',
              rules: [
                { t: 'Крок часу назад', d: 'Present → Past, Past → Past Perfect, <b>will → would</b>, <b>can → could</b>, <b>must → had to</b>.', ex: [['«I am tired» → She said she was tired.', 'Вона сказала, що втомилася.'], ['«We will call you» → They said they would call me.', 'Вони сказали, що зателефонують.']] },
                { t: 'Займенники та маркери', d: 'today → that day, yesterday → the day before, tomorrow → the next day, here → there, this → that, now → then.', ex: [['«I’ll do it tomorrow» → He said he would do it the next day.', 'Він сказав, що зробить це наступного дня.']] },
                { t: 'Питання', d: '<b>asked if/whether</b> (так/ні) або питальне слово + <b>порядок розповіді</b> — без did і без інверсії!', ex: [['«Are you tired?» → He asked if I was tired.', 'Він запитав, чи я втомився.'], ['«Where do you live?» → He asked where I lived.', 'Він запитав, де я живу.']] },
                { t: 'say vs tell', d: '<b>tell</b> + КОМУСЬ (tell me), <b>say</b> — без адресата або say to me.', ex: [['She told me that she was busy.', 'Вона сказала мені, що зайнята.']] }
              ],
              tip: 'У непрямому питанні завжди порядок РОЗПОВІДІ: he asked where I lived — жодного «did» і жодної інверсії!'
            },
            exercises: [
              { type: 'choice', q: '«I am tired» → She said she ___ tired.', options: ['was', 'is', 'were', 'has been'], answer: 0, explain: 'am → was (крок назад).' },
              { type: 'choice', q: '«We will call you» → They said they ___ call me.', options: ['would', 'will', 'could have', 'can'], answer: 0, explain: 'will → would.' },
              { type: 'choice', q: '«Where do you live?» → He asked me where I ___.', options: ['lived', 'live', 'do live', 'am living'], answer: 0, explain: 'Питання → порядок розповіді, do зникає, час крок назад.' },
              { type: 'choice', q: 'She ___ me that she was busy.', options: ['told', 'said', 'spoke', 'talked'], answer: 0, explain: 'tell + кому: told me.' },
              { type: 'fill', q: '«I have finished» → He said he ___ finished.', answers: ['had'], explain: 'Present Perfect → Past Perfect: had.' },
              { type: 'fill', q: 'He asked ___ I wanted tea or coffee. (чи)', answers: ['if', 'whether'], explain: 'Питання так/ні → if або whether.' },
              { type: 'reorder', words: ['she said', 'she was hungry'], answer: 'She said she was hungry', uk: 'Вона сказала, що голодна.' },
              { type: 'reorder', words: ['he asked me', 'where I lived'], answer: 'He asked me where I lived', uk: 'Він запитав мене, де я живу.' }
            ]
          },
          {
            id: 'reported-commands', title: 'Накази, прохання і дієслова переказу: told me to, suggested', emoji: '📣', level: 'B2', minutes: 10,
            theory: {
              intro: 'Переказувати можна не лише «він сказав, що…». Накази, прохання, поради, обіцянки й відмови мають свої дієслова та свою граматику.',
              rules: [
                { t: 'Накази і прохання: tell / ask + кого + (not) to V', d: 'Наказ → <b>told me to</b>; прохання → <b>asked me to</b>; заперечення → <b>not to</b>.', ex: [['«Sit down.» → She told me to sit down.', 'Вона сказала мені сісти.'], ['«Please don’t shout.» → He asked us not to shout.', 'Він попросив нас не кричати.']] },
                { t: 'Дієслово + to V', d: '<b>promise, agree, refuse, offer, threaten</b> + to V.', ex: [['«I’ll help you.» → She promised to help me.', 'Вона пообіцяла мені допомогти.'], ['«I won’t pay.» → He refused to pay.', 'Він відмовився платити.']] },
                { t: 'Дієслово + кого + to V', d: '<b>advise, warn, remind, invite, encourage, persuade</b> + кого + to V (warn … not to).', ex: [['«You should rest.» → The doctor advised me to rest.', 'Лікар порадив мені відпочити.'], ['«Don’t forget your keys!» → Mum reminded me to take my keys.', 'Мама нагадала мені взяти ключі.']] },
                { t: 'Дієслово + -ing', d: '<b>suggest, admit, deny, recommend</b> + -ing; <b>apologise for, insist on, accuse sb of</b> + -ing.', ex: [['«Let’s go out.» → He suggested going out.', 'Він запропонував піти кудись.'], ['«I didn’t take it.» → She denied taking it.', 'Вона заперечила, що взяла це.']] },
                { t: 'Пастка: suggest', d: '<b>suggest</b> НЕ буває + кого + to V: «suggested me to go» ✗ → <b>suggested (that) I (should) go</b> ✓ або <b>suggested going</b> ✓.', ex: [['She suggested that I should call him.', 'Вона запропонувала, щоб я йому подзвонив.']] }
              ],
              tip: 'Спершу визнач ТИП фрази: наказ / прохання → tell / ask sb to; пропозиція → suggest -ing; обіцянка / відмова → promise / refuse to.'
            },
            exercises: [
              { type: 'choice', q: '«Close the window.» → She told me ___ the window.', options: ['to close', 'close', 'closing', 'that I close'], answer: 0, explain: 'tell + кого + to V.' },
              { type: 'choice', q: '«Don’t be late.» → He told us ___ late.', options: ['not to be', 'to not being', 'don’t be', 'not being'], answer: 0, explain: 'Заперечний наказ → not to V.' },
              { type: 'choice', q: '«I’ll call you tomorrow.» → She promised ___ me the next day.', options: ['to call', 'calling', 'call', 'that calling'], answer: 0, explain: 'promise + to V.' },
              { type: 'choice', q: '«Let’s take a taxi.» → He suggested ___ a taxi.', options: ['taking', 'to take', 'take', 'us to take'], answer: 0, explain: 'suggest + -ing.' },
              { type: 'choice', q: '«I broke the vase.» → Tom admitted ___ the vase.', options: ['breaking', 'to break', 'break', 'broke'], answer: 0, explain: 'admit + -ing.' },
              { type: 'choice', q: '«You should see a doctor.» → My friend ___ me to see a doctor.', options: ['advised', 'suggested', 'said', 'told that'], answer: 0, explain: 'advise + кого + to V.' },
              { type: 'fill', q: '«Please help me.» → She asked me ___ her.', answers: ['to help'], explain: 'ask + кого + to V.' },
              { type: 'fill', q: '«I’m sorry I’m late.» → He apologised ___ being late.', answers: ['for'], explain: 'apologise for + -ing.' },
              { type: 'fill', q: '«Don’t touch the dog!» → She warned the kids ___ to touch the dog.', answers: ['not'], explain: 'warn + кого + not to V.' },
              { type: 'reorder', words: ['the teacher', 'told us', 'not to use', 'our phones'], answer: 'The teacher told us not to use our phones', uk: 'Учитель сказав нам не користуватися телефонами.' }
            ]
          },
          {
            id: 'reported-no-backshift', title: 'Коли час НЕ змінюється + таблиця змін', emoji: '📋', level: 'B2', minutes: 9,
            theory: {
              intro: 'Правило «крок часу назад» — не догма. Якщо сказане досі правда або переказуємо щойно почуте, час часто лишається тим самим. А ще — повна таблиця змін для модальних і маркерів часу.',
              rules: [
                { t: 'Досі правда — можна без зсуву', d: 'Факти і те, що не змінилося: обидва варіанти правильні, без зсуву — природніше.', ex: [['«I live in Kyiv.» → She said she lives / lived in Kyiv.', 'Вона сказала, що живе в Києві.'], ['«Water boils at 100°C.» → The teacher said water boils at 100°C.', 'Учитель сказав, що вода кипить при 100°C.']] },
                { t: 'says / has said — без зсуву', d: 'Дієслово переказу в теперішньому часі → час не змінюється.', ex: [['«I’m tired.» → He says he’s tired.', 'Він каже, що втомився.'], ['The forecast says it will rain.', 'У прогнозі кажуть, що буде дощ.']] },
                { t: 'Модальні: що змінюється', d: '<b>will → would, can → could, may → might, must → had to</b> (обов’язок). <b>would, could, should, might, ought to</b> — без змін.', ex: [['«You should apologise.» → She said I should apologise.', 'Вона сказала, що мені варто вибачитися.'], ['«I must go.» → He said he had to go.', 'Він сказав, що мусить іти.']] },
                { t: 'Час і місце', d: '<b>now → then, today → that day, tonight → that night, yesterday → the day before, tomorrow → the next day, last week → the week before, next month → the following month, ago → before, here → there</b>.', ex: [['«I saw her yesterday.» → He said he had seen her the day before.', 'Він сказав, що бачив її напередодні.']] },
                { t: 'Питання: whether … or not', d: '<b>whether</b> — формальніший за if, особливо з «or not»; порядок слів — як у розповіді.', ex: [['«Do you want to come or not?» → She asked whether I wanted to come or not.', 'Вона запитала, чи хочу я піти, чи ні.']] }
              ],
              tip: 'Переказуєш одразу («Tom says…») або факт досі правдивий — сміливо лишай час без змін.'
            },
            exercises: [
              { type: 'choice', q: 'Tom says he ___ hungry. (щойно сказав «I’m hungry»)', options: ['is', 'was', 'had been', 'would be'], answer: 0, explain: 'says (теперішній час) → без зсуву.' },
              { type: 'choice', q: '«You should rest.» → The doctor said I ___ rest.', options: ['should', 'shoulded', 'would should', 'shall'], answer: 0, explain: 'should не змінюється.' },
              { type: 'choice', q: '«I must finish it.» → She said she ___ finish it.', options: ['had to', 'musted', 'must have', 'has to have'], answer: 0, explain: 'must (обов’язок) → had to.' },
              { type: 'choice', q: '«I’ll see you tomorrow.» → He said he would see me ___.', options: ['the next day', 'tomorrow', 'yesterday', 'the day before'], answer: 0, explain: 'tomorrow → the next day.' },
              { type: 'choice', q: '«We met two years ago.» → They said they had met two years ___.', options: ['before', 'ago', 'later', 'after'], answer: 0, explain: 'ago → before.' },
              { type: 'choice', q: '«The Earth goes round the Sun.» → She explained that the Earth ___ round the Sun.', options: ['goes', 'had gone', 'is going to', 'would go'], answer: 0, explain: 'Загальна істина — без зсуву.' },
              { type: 'fill', q: '«I can swim.» → He said he ___ swim.', answers: ['could'], explain: 'can → could.' },
              { type: 'fill', q: '«Are you coming or not?» → She asked ___ I was coming or not.', answers: ['whether', 'if'], explain: 'whether … or not.' },
              { type: 'fill', q: '«I’m leaving tonight.» → He said he was leaving that ___.', answers: ['night'], explain: 'tonight → that night.' },
              { type: 'reorder', words: ['she said', 'she had seen him', 'the day before'], answer: 'She said she had seen him the day before', uk: 'Вона сказала, що бачила його напередодні.' }
            ]
          }
        ]
      },
      /* ---------- GERUND / INFINITIVE ---------- */
      {
        id: 'gerund-infinitive', title: 'Gerund чи Infinitive: doing / to do', emoji: '🧩',
        desc: 'enjoy doing чи want to do? Які дієслова тягнуть -ing, які — to, і коли від вибору змінюється зміст.',
        cheat: {
          title: 'doing чи to do?',
          head: ['Після чого', 'Форма і дієслова', 'Приклад'],
          rows: [
            [{ t: 'enjoy · mind · avoid · finish', topic: 'gerund' }, '+ V-ing · також suggest, keep, miss, practise, imagine, can’t stand, give up', 'I enjoy reading.'],
            [{ t: 'прийменник (in, at, of, without…)', topic: 'gerund' }, '+ V-ing ЗАВЖДИ · і look forward to doing', 'She’s good at drawing.'],
            [{ t: 'want · decide · hope · plan', topic: 'infinitive' }, '+ to V · також agree, refuse, promise, learn, manage, afford, would like', 'I want to leave.'],
            [{ t: 'want / tell / ask + кого + to V', topic: 'infinitive' }, 'хочу, щоб ти… (НЕ want that you)', 'He told me to wait.'],
            [{ t: 'make / let + кого + V', topic: 'infinitive' }, 'БЕЗ to', 'She made me laugh. · Let me help.'],
            [{ t: 'stop · remember · forget · try · regret', topic: 'gerund-inf-meaning' }, '-ing ≠ to V — змінюється зміст', 'stop smoking ≠ stop to smoke'],
            [{ t: 'like · love · hate · start · begin', topic: 'gerund-inf-meaning' }, 'обидві форми, зміст майже той самий', 'It started raining / to rain.']
          ]
        },
        topics: [
          {
            id: 'gerund', title: 'Gerund: дієслово + -ing', emoji: '🎧', level: 'B1', minutes: 9,
            theory: {
              intro: 'Gerund — це дієслово з -ing, яке працює як іменник: «читання», «плавання». Його ставимо після певних дієслів, після всіх прийменників і на місці підмета.',
              rules: [
                { t: 'Дієслова + -ing', d: '<b>enjoy, mind, avoid, finish, suggest, keep, miss, practise, imagine, can’t stand, give up</b> — після них тільки -ing.', ex: [['I enjoy cooking for friends.', 'Я люблю готувати для друзів.'], ['Would you mind opening the window?', 'Ви не проти відчинити вікно?']] },
                { t: 'Після прийменника — завжди -ing', d: '<b>interested in, good at, afraid of, tired of, before, after, without, instead of</b> + V-ing.', ex: [['She is interested in learning Japanese.', 'Вона цікавиться вивченням японської.'], ['He left without saying goodbye.', 'Він пішов, не попрощавшись.']] },
                { t: 'Пастка: to як прийменник', d: 'У <b>look forward to, be used to, object to</b> слово to — прийменник, тому далі -ing!', ex: [['I’m looking forward to seeing you.', 'З нетерпінням чекаю на зустріч.']] },
                { t: 'Gerund як підмет', d: 'На початку речення «дія як річ» → -ing.', ex: [['Swimming is good for your health.', 'Плавання корисне для здоров’я.'], ['Learning languages takes time.', 'Вивчення мов потребує часу.']] }
              ],
              tip: 'Бачиш прийменник (in, at, of, about, without…)? Далі тільки -ing. Навіть якщо прийменник — to у look forward to!'
            },
            exercises: [
              { type: 'choice', q: 'I enjoy ___ in the mountains.', options: ['hiking', 'to hike', 'hike', 'hiked'], answer: 0, explain: 'enjoy + V-ing.' },
              { type: 'choice', q: 'Would you mind ___ the door?', options: ['closing', 'to close', 'close', 'closed'], answer: 0, explain: 'mind + V-ing.' },
              { type: 'choice', q: 'She is good at ___ portraits.', options: ['drawing', 'to draw', 'draw', 'draws'], answer: 0, explain: 'Після прийменника at → -ing.' },
              { type: 'choice', q: 'I’m looking forward to ___ you.', options: ['seeing', 'see', 'to see', 'saw'], answer: 0, explain: 'look forward to: to тут прийменник → -ing.' },
              { type: 'choice', q: '___ is my favourite sport.', options: ['Swimming', 'Swim', 'To swimming', 'Swims'], answer: 0, explain: 'Дія в ролі підмета → gerund.' },
              { type: 'fill', q: 'He finally gave up ___.', hint: 'to smoke', answers: ['smoking'], explain: 'give up + V-ing.' },
              { type: 'fill', q: 'We should avoid ___ during rush hour.', hint: 'to drive', answers: ['driving'], explain: 'avoid + V-ing.' },
              { type: 'fill', q: 'He left without ___ goodbye.', hint: 'to say', answers: ['saying'], explain: 'without — прийменник → -ing.' },
              { type: 'reorder', words: ['I can’t stand', 'waiting', 'in long queues'], answer: 'I can’t stand waiting in long queues', uk: 'Терпіти не можу стояти в довгих чергах.' },
              { type: 'reorder', words: ['she suggested', 'going', 'to the cinema'], answer: 'She suggested going to the cinema', uk: 'Вона запропонувала піти в кіно.' }
            ]
          },
          {
            id: 'infinitive', title: 'Infinitive: to do і do без to', emoji: '🚩', level: 'B1', minutes: 9,
            theory: {
              intro: 'Інфінітив з to часто означає намір, план або мету — те, що ще попереду. А після make, let і модальних дієслів to зникає.',
              rules: [
                { t: 'Дієслова + to V', d: '<b>want, decide, hope, plan, agree, refuse, promise, learn, manage, afford, offer, would like</b>.', ex: [['We decided to stay at home.', 'Ми вирішили залишитися вдома.'], ['I can’t afford to buy a new car.', 'Я не можу дозволити собі нову машину.']] },
                { t: 'Дієслово + кого + to V', d: '<b>want / ask / tell / advise / expect / allow + кого + to V</b>. Українське «хочу, щоб ти…» — НЕ «want that you».', ex: [['I want you to help me.', 'Я хочу, щоб ти мені допоміг.'], ['The doctor told him to rest.', 'Лікар сказав йому відпочивати.']] },
                { t: 'Без to: make, let, модальні', d: '<b>make / let + кого + V</b>; після <b>can, must, should, will</b> — теж без to.', ex: [['My mum made me clean my room.', 'Мама змусила мене прибрати кімнату.'], ['Let me help you.', 'Дозволь тобі допомогти.']] },
                { t: 'Мета і прикметник + to V', d: 'Навіщо? → <b>to V</b>. Також <b>easy / hard / nice + to V</b> і <b>too / enough + to V</b>.', ex: [['I went to the shop to buy some bread.', 'Я пішов у магазин купити хліба.'], ['English is not hard to learn.', 'Англійську не важко вивчити.']] }
              ],
              tip: 'Найчастіші помилки: «I want that you come» ✗ → I want you to come ✓. «She made me to laugh» ✗ → She made me laugh ✓.'
            },
            exercises: [
              { type: 'choice', q: 'We decided ___ at home.', options: ['to stay', 'staying', 'stay', 'stayed'], answer: 0, explain: 'decide + to V.' },
              { type: 'choice', q: 'I want you ___ me.', options: ['to help', 'help', 'helping', 'that you help'], answer: 0, explain: 'want + кого + to V.' },
              { type: 'choice', q: 'The film made me ___.', options: ['cry', 'to cry', 'crying', 'cried'], answer: 0, explain: 'make + кого + V без to.' },
              { type: 'choice', q: 'My parents let me ___ late on Fridays.', options: ['stay up', 'to stay up', 'staying up', 'stayed up'], answer: 0, explain: 'let + кого + V без to.' },
              { type: 'choice', q: 'I went to the bank ___ some money.', options: ['to get', 'for get', 'for getting', 'get'], answer: 0, explain: 'Мета (навіщо?) → to V. «for get» — калька з української.' },
              { type: 'fill', q: 'She promised ___ me back.', hint: 'to call', answers: ['to call'], explain: 'promise + to V.' },
              { type: 'fill', q: 'I can’t afford ___ a new phone.', hint: 'to buy', answers: ['to buy'], explain: 'afford + to V.' },
              { type: 'fill', q: 'The teacher told us ___ quiet.', hint: 'to be', answers: ['to be'], explain: 'tell + кого + to V.' },
              { type: 'reorder', words: ['he refused', 'to answer', 'my question'], answer: 'He refused to answer my question', uk: 'Він відмовився відповідати на моє питання.' },
              { type: 'reorder', words: ['the doctor', 'advised him', 'to rest'], answer: 'The doctor advised him to rest', uk: 'Лікар порадив йому відпочити.' }
            ]
          },
          {
            id: 'gerund-inf-meaning', title: 'stop / remember / try: коли змінюється зміст', emoji: '⚖️', level: 'B2', minutes: 10,
            theory: {
              intro: 'Кілька дієслів приймають обидві форми, але зміст різний. Загальна логіка: -ing дивиться на дію, що вже була або триває, а to V — на дію, що ще попереду.',
              rules: [
                { t: 'stop', d: '<b>stop doing</b> — припинити дію; <b>stop to do</b> — зупинитися, ЩОБ щось зробити.', ex: [['He stopped smoking last year.', 'Він кинув палити минулого року.'], ['He stopped to smoke.', 'Він зупинився, щоб покурити.']] },
                { t: 'remember / forget', d: '<b>remember doing</b> — пам’ятати, що вже зробив; <b>remember to do</b> — не забути зробити. Так само <b>forget</b>.', ex: [['I remember locking the door.', 'Я пам’ятаю, що замкнув двері.'], ['Remember to lock the door!', 'Не забудь замкнути двері!']] },
                { t: 'try', d: '<b>try to do</b> — намагатися (важко); <b>try doing</b> — спробувати як експеримент.', ex: [['I tried to open the window, but it was stuck.', 'Я намагався відчинити вікно, але його заклинило.'], ['Try turning it off and on again.', 'Спробуй вимкнути й увімкнути знову.']] },
                { t: 'regret / go on', d: '<b>regret doing</b> — шкодувати про зроблене; <b>regret to tell/inform</b> — з жалем повідомити. <b>go on doing</b> — продовжувати те саме; <b>go on to do</b> — перейти до наступного.', ex: [['I regret saying that.', 'Шкодую, що сказав це.'], ['We regret to inform you that the flight is cancelled.', 'З жалем повідомляємо, що рейс скасовано.']] },
                { t: 'Без різниці: like, love, hate, start, begin', d: 'Обидві форми, зміст майже однаковий. Але <b>would like</b> — тільки <b>to V</b>!', ex: [['It started raining. = It started to rain.', 'Почався дощ.'], ['I’d like to order a pizza.', 'Я б хотів замовити піцу.']] }
              ],
              tip: 'Правило стрілки: -ing ← дія вже була; to V → дія ще попереду. remember doing (було) vs remember to do (треба зробити).'
            },
            exercises: [
              { type: 'choice', q: 'He stopped ___ because it was bad for his health.', options: ['smoking', 'to smoke', 'smoke', 'smoked'], answer: 0, explain: 'Кинув звичку → stop doing.' },
              { type: 'choice', q: 'We stopped ___ some coffee on the way.', options: ['to buy', 'buying', 'buy', 'bought'], answer: 0, explain: 'Зупинились, щоб купити → stop to do.' },
              { type: 'choice', q: 'Remember ___ the lights before you leave!', options: ['to turn off', 'turning off', 'turn off', 'turned off'], answer: 0, explain: 'Не забудь зробити → remember to do.' },
              { type: 'choice', q: 'I remember ___ this film as a child.', options: ['watching', 'to watch', 'watch', 'watched'], answer: 0, explain: 'Спогад про минуле → remember doing.' },
              { type: 'choice', q: 'The app keeps freezing? Try ___ it — maybe that will help.', options: ['restarting', 'restart', 'restarted', 'to restarting'], answer: 0, explain: 'Порада-експеримент «а спробуй так» → try doing.' },
              { type: 'choice', q: 'I’d like ___ a table for two.', options: ['to book', 'booking', 'book', 'booked'], answer: 0, explain: 'would like — тільки to V.' },
              { type: 'fill', q: 'I’ll never forget ___ the ocean for the first time.', hint: 'to see', answers: ['seeing'], explain: 'Спогад про минуле → forget doing.' },
              { type: 'fill', q: 'I regret ___ him my password.', hint: 'to tell', answers: ['telling'], explain: 'Шкодую про зроблене → regret doing.' },
              { type: 'fill', q: 'She tried ___ the heavy box, but she couldn’t.', hint: 'to lift', answers: ['to lift'], explain: 'Намагалася, але не змогла → try to do.' },
              { type: 'reorder', words: ['don’t forget', 'to send', 'me the photos'], answer: 'Don’t forget to send me the photos', uk: 'Не забудь надіслати мені фото.' },
              { type: 'reorder', words: ['I stopped', 'eating sugar', 'a month ago'], answer: 'I stopped eating sugar a month ago', uk: 'Я перестав їсти цукор місяць тому.' }
            ]
          }
        ]
      },
      /* ---------- QUESTIONS ---------- */
      {
        id: 'questions', title: 'Питання: Who called? / Who did you call?', emoji: '❓',
        desc: 'Як будувати питання: питання до підмета без do, прийменник у кінці та ввічливі непрямі питання.',
        cheat: {
          title: 'хто кого? · ввічливі питання',
          head: ['Тип', 'Формула', 'Приклад'],
          rows: [
            [{ t: 'загальне питання', topic: 'question-forms' }, 'допоміжне + підмет + V ?', 'Do you like jazz? · Have you seen it?'],
            [{ t: 'спеціальне питання', topic: 'question-forms' }, 'Wh- + допоміжне + підмет + V ?', 'Where do you live?'],
            [{ t: 'питання до підмета', topic: 'question-forms' }, 'Who / What + V (БЕЗ do/did)', 'Who called you? · What happened?'],
            [{ t: 'питання до додатка', topic: 'question-forms' }, 'Who / What + do/did + підмет + V', 'Who did you call?'],
            [{ t: 'прийменник у кінці', topic: 'question-forms' }, 'Who … for? · What … about?', 'Who are you waiting for?'],
            [{ t: 'непряме питання', topic: 'indirect-questions' }, 'Could you tell me + Wh-/if + порядок розповіді', 'Could you tell me where the station is?']
          ]
        },
        topics: [
          {
            id: 'question-forms', title: 'Питання до підмета і до додатка', emoji: '🔎', level: 'A2', minutes: 9,
            theory: {
              intro: 'В українській «Хто подзвонив?» і «Кому ти подзвонив?» різняться лише відмінком. В англійській — усією будовою питання. Розберемо, коли do потрібне, а коли зайве.',
              rules: [
                { t: 'Звичайне питання: інверсія', d: 'Допоміжне дієслово стає ПЕРЕД підметом: <b>(Wh-) + do/does/did, is/are, have, can + підмет + V</b>.', ex: [['Where does she work?', 'Де вона працює?'], ['Have you ever been to London?', 'Ти колись був у Лондоні?']] },
                { t: 'Питання до підмета — без do', d: 'Якщо <b>who / what</b> — сам виконавець дії, порядок як у ствердженні, <b>do/did не потрібні</b>.', ex: [['Who broke the window?', 'Хто розбив вікно?'], ['What happened?', 'Що сталося?']] },
                { t: 'Питання до додатка — з do', d: 'Якщо питаємо, КОГО чи ЩО, — звичайна схема з do/did.', ex: [['Who did you see at the party?', 'Кого ти бачив на вечірці?'], ['What did she say?', 'Що вона сказала?']] },
                { t: 'Прийменник у кінці', d: 'У розмовній англійській прийменник стоїть у КІНЦІ питання.', ex: [['Who are you waiting for?', 'На кого ти чекаєш?'], ['What are you talking about?', 'Про що ви говорите?']] }
              ],
              tip: 'Тест: заміни who на he/him. «He called you» → Who called you? (без did). «You called him» → Who did you call? (з did).'
            },
            exercises: [
              { type: 'choice', q: 'Who ___ the window?', options: ['broke', 'did break', 'did broke', 'breaked'], answer: 0, explain: 'Хто розбив? — питання до підмета → без did.' },
              { type: 'choice', q: 'Who ___ at the party? (Кого ти бачив?)', options: ['did you see', 'you saw', 'saw you', 'did you saw'], answer: 0, explain: 'Питання до додатка → did + підмет + V.' },
              { type: 'choice', q: 'What ___? (Що сталося?)', options: ['happened', 'did happen', 'did it happen', 'was happen'], answer: 0, explain: 'What — підмет → без did.' },
              { type: 'choice', q: 'Обери правильне питання:', options: ['Where does your brother work?', 'Where your brother works?', 'Where does your brother works?', 'Where works your brother?'], answer: 0, explain: 'Wh- + does + підмет + V без -s.' },
              { type: 'choice', q: 'Who are you waiting ___?', options: ['for', 'on', 'to', 'at'], answer: 0, explain: 'wait for → прийменник у кінці питання.' },
              { type: 'fill', q: 'Who ___ you this present? (подарував)', hint: 'to give', answers: ['gave'], explain: 'Хто подарував? — підмет → Past Simple без did.' },
              { type: 'fill', q: 'What ___ she say? (сказала)', answers: ['did'], explain: 'Що вона сказала? — питання до додатка → did.' },
              { type: 'fill', q: 'What are you talking ___? (про що)', answers: ['about'], explain: 'talk about → about у кінці.' },
              { type: 'reorder', words: ['who', 'lives', 'in this house'], answer: 'Who lives in this house', uk: 'Хто живе в цьому будинку?' },
              { type: 'reorder', words: ['what', 'did you', 'buy', 'yesterday'], answer: 'What did you buy yesterday', uk: 'Що ти купив учора?' }
            ]
          },
          {
            id: 'indirect-questions', title: 'Непрямі (ввічливі) питання', emoji: '🎩', level: 'B1', minutes: 8,
            theory: {
              intro: 'Щоб звучати ввічливо, англійці «загортають» питання: Could you tell me…?, Do you know…? Усередині такого питання — звичайний порядок слів, як у розповіді.',
              rules: [
                { t: 'Вступні фрази', d: '<b>Could you tell me…? · Do you know…? · I wonder… · I’d like to know…</b>', ex: [['Could you tell me what time it is?', 'Не підкажете, котра година?']] },
                { t: 'Порядок розповіді', d: 'Після вступу — підмет ПЕРЕД дієсловом, <b>без do/does/did</b>.', ex: [['Where is the station? → Do you know where the station is?', 'Ви не знаєте, де вокзал?'], ['What time does it open? → Could you tell me what time it opens?', 'Не підкажете, о котрій відкривається?']] },
                { t: 'if / whether для так/ні', d: 'Немає питального слова → <b>if</b> або <b>whether</b>.', ex: [['Is there a bank nearby? → Do you know if there is a bank nearby?', 'Ви не знаєте, чи є поблизу банк?']] },
                { t: 'Знак у кінці', d: 'Після Could you tell me / Do you know — «?»; після I wonder / I’d like to know — крапка.', ex: [['I wonder why he left.', 'Цікаво, чому він пішов.']] }
              ],
              tip: 'Дві типові помилки: «Can you tell me where is the station?» ✗ → where the station is ✓. «…what time does it open?» ✗ → what time it opens ✓.'
            },
            exercises: [
              { type: 'choice', q: 'Could you tell me where ___?', options: ['the station is', 'is the station', 'the station', 'is it the station'], answer: 0, explain: 'Непряме питання → порядок розповіді: підмет + is.' },
              { type: 'choice', q: 'Do you know what time ___?', options: ['the museum opens', 'does the museum open', 'the museum does open', 'opens the museum'], answer: 0, explain: 'Без does, дієслово з -s.' },
              { type: 'choice', q: 'Can you tell me ___ this bus goes to the airport?', options: ['if', 'that', 'what', 'does'], answer: 0, explain: 'Питання так/ні → if / whether.' },
              { type: 'choice', q: 'I wonder why ___.', options: ['she left so early', 'did she leave so early', 'she did leave so early', 'left she so early'], answer: 0, explain: 'Після I wonder — порядок розповіді, без did.' },
              { type: 'fill', q: 'Do you know how much this jacket ___?', hint: 'to cost', answers: ['costs'], explain: 'Порядок розповіді: this jacket costs.' },
              { type: 'fill', q: 'Could you tell me ___ the shop is open on Sundays? (чи)', answers: ['if', 'whether'], explain: 'Так/ні → if або whether.' },
              { type: 'fill', q: 'I’d like to know where you ___ English.', hint: 'to learn (минулий час)', answers: ['learned', 'learnt'], explain: 'Без did: where you learned.' },
              { type: 'reorder', words: ['could you tell me', 'where', 'the nearest pharmacy is'], answer: 'Could you tell me where the nearest pharmacy is', uk: 'Не підкажете, де найближча аптека?' },
              { type: 'reorder', words: ['do you know', 'if', 'he is at home'], answer: 'Do you know if he is at home', uk: 'Ви не знаєте, чи він удома?' }
            ]
          }
        ]
      },
      /* ---------- LINKING WORDS ---------- */
      {
        id: 'linkers', title: 'Сполучники та слова-зв’язки', emoji: '🪢',
        desc: 'but, although, despite, however, because, therefore, moreover, unless, in case, eventually — усі головні зв’язки: протиставлення, причина, додавання, умова, послідовність.',
        cheat: {
          tables: [
            {
              title: '🌓 Протиставлення — але, хоча, попри',
              head: ['Зв’язка', 'Переклад і граматика', 'Приклад'],
              rows: [
                [{ t: 'but / yet', topic: 'link-contrast' }, 'але · yet — «проте», трохи сильніше', 'It’s cheap but good.'],
                [{ t: 'although / though / even though', topic: 'link-contrast' }, 'хоча · + РЕЧЕННЯ (even though — сильніше)', 'Although it rained, we went out.'],
                [{ t: 'despite / in spite of', topic: 'link-contrast' }, 'попри · + ІМЕННИК або -ing (despite БЕЗ of)', 'Despite the rain, we went out.'],
                [{ t: 'despite the fact that', topic: 'link-contrast' }, 'попри те що · + речення', 'Despite the fact that it rained, …'],
                [{ t: 'however / nevertheless / even so', topic: 'link-contrast' }, 'однак, проте · на початку нового речення, з комою', 'It was late. However, we stayed.'],
                [{ t: 'whereas / while', topic: 'link-contrast' }, 'тоді як · протиставлення двох фактів', 'I like tea, whereas she likes coffee.'],
                [{ t: 'on the other hand / in contrast', topic: 'link-contrast' }, 'з іншого боку / натомість', 'On the other hand, it’s noisy.']
              ]
            },
            {
              title: '💡 Причина і наслідок — бо, через, тому',
              head: ['Зв’язка', 'Переклад і граматика', 'Приклад'],
              rows: [
                [{ t: 'because / since / as', topic: 'link-cause' }, 'тому що, оскільки · + РЕЧЕННЯ', 'I stayed in because I was ill.'],
                [{ t: 'because of / due to / owing to', topic: 'link-cause' }, 'через · + ІМЕННИК', 'because of the rain'],
                [{ t: 'so', topic: 'link-cause' }, 'тож, тому · розмовне, після коми', 'I was tired, so I went to bed.'],
                [{ t: 'that’s why', topic: 'link-cause' }, 'ось чому · розмовне', 'I missed the bus. That’s why I’m late.'],
                [{ t: 'therefore / as a result / consequently / thus', topic: 'link-cause' }, 'тому, внаслідок цього · формально', 'Prices rose. As a result, sales fell.']
              ]
            },
            {
              title: '➕ Додавання і приклади — також, крім того, наприклад',
              head: ['Зв’язка', 'Переклад і граматика', 'Приклад'],
              rows: [
                [{ t: 'also / too / as well', topic: 'link-addition' }, 'також · also перед дієсловом, too / as well у кінці', 'She also sings. / She sings too.'],
                [{ t: 'either (у запереченні)', topic: 'link-addition' }, 'теж не', 'I don’t like it either.'],
                [{ t: 'moreover / furthermore / in addition / besides / what’s more', topic: 'link-addition' }, 'крім того, більше того · на початку речення', 'Moreover, it’s free.'],
                [{ t: 'as well as / in addition to / apart from', topic: 'link-addition' }, 'а також, на додачу до, окрім · + ІМЕННИК або -ing', 'As well as English, he speaks Polish.'],
                [{ t: 'not only … but also', topic: 'link-addition' }, 'не лише…, а й', 'not only smart but also kind'],
                [{ t: 'both … and / either … or / neither … nor', topic: 'link-addition' }, 'і… і / або… або / ні… ні', 'Neither Tom nor Ann came.'],
                [{ t: 'for example / for instance / such as / like', topic: 'link-addition' }, 'наприклад, як-от · such as / like — прямо перед іменником', 'fruit such as apples']
              ]
            },
            {
              title: '🚦 Умова — якщо не, за умови, на випадок',
              head: ['Зв’язка', 'Переклад і граматика', 'Приклад'],
              rows: [
                [{ t: 'if / unless', topic: 'link-condition' }, 'якщо / якщо НЕ (= if not) · без will', 'Unless you hurry, you’ll be late.'],
                [{ t: 'as long as / provided (that)', topic: 'link-condition' }, 'за умови що, лише якщо', 'You can go as long as you’re back by 10.'],
                [{ t: 'in case', topic: 'link-condition' }, 'на випадок, якщо (заздалегідь)', 'Take an umbrella in case it rains.'],
                [{ t: 'otherwise / or (else)', topic: 'link-condition' }, 'інакше, а то', 'Hurry, otherwise we’ll be late.'],
                [{ t: 'even if ≠ even though', topic: 'link-condition' }, 'навіть якщо (може бути) / хоча (факт)', 'I’ll go even if it rains.'],
                [{ t: 'whether … or (not)', topic: 'link-condition' }, 'чи… чи ні, незалежно від', 'Whether you like it or not, …']
              ]
            },
            {
              title: '🪜 Послідовність, підсумок, розмовні зв’язки',
              head: ['Зв’язка', 'Переклад і коли вживаємо', 'Приклад'],
              rows: [
                [{ t: 'first(ly) / then / next / after that', topic: 'link-sequence' }, 'спершу / потім / далі / після цього', 'First, boil the water. Then add pasta.'],
                [{ t: 'afterwards / later / meanwhile', topic: 'link-sequence' }, 'згодом / пізніше / тим часом', 'We had lunch and afterwards went out.'],
                [{ t: 'finally / eventually / at last', topic: 'link-sequence' }, 'нарешті (останній пункт) / зрештою (після довгого) / нарешті! (емоційно)', 'At last you’re here!'],
                [{ t: 'in the end ≠ at the end of', topic: 'link-sequence' }, 'зрештою (результат) / у кінці чогось', 'In the end we agreed. · at the end of May'],
                [{ t: 'in conclusion / to sum up / overall / all in all', topic: 'link-sequence' }, 'на завершення, підсумовуючи, загалом', 'To sum up, it was a success.'],
                [{ t: 'actually / in fact · anyway · by the way', topic: 'link-sequence' }, 'насправді (НЕ «актуально») · у всякому разі · до речі', 'Actually, he’s 45.']
              ]
            }
          ]
        },
        topics: [
          {
            id: 'link-contrast', title: 'Протиставлення: but, although, despite, however', emoji: '🌓', level: 'B1', minutes: 10,
            theory: {
              intro: 'Сказати «але» англійською можна десятком способів. Різниця не стільки в значенні, скільки в граматиці: що йде після слова — ціле речення чи іменник, і де стоїть кома.',
              rules: [
                { t: 'but / yet', d: '<b>but</b> — звичайне «але» всередині речення. <b>yet</b> — «проте», звучить трохи сильніше й книжніше.', ex: [['The hotel was cheap but clean.', 'Готель був дешевий, але чистий.'], ['He is rich, yet he is unhappy.', 'Він багатий, проте нещасливий.']] },
                { t: 'although / though / even though + речення', d: 'Далі — підмет + дієслово. <b>even though</b> — підсилене «хоча». <b>though</b> буває й у кінці речення: «…, though» = «хоча».', ex: [['Although it was raining, we went for a walk.', 'Хоча йшов дощ, ми пішли гуляти.'], ['The film was long. I enjoyed it, though.', 'Фільм був довгий. Хоча мені сподобався.']] },
                { t: 'despite / in spite of + іменник / -ing', d: 'Після них НЕ речення, а іменник або -ing. <b>despite</b> — без of! Щоб додати речення: <b>despite the fact that</b>.', ex: [['Despite the rain, we went for a walk.', 'Попри дощ, ми пішли гуляти.'], ['In spite of feeling tired, she finished the report.', 'Попри втому, вона закінчила звіт.']] },
                { t: 'however / nevertheless / even so', d: 'З’єднують два окремі РЕЧЕННЯ: зазвичай стоять на початку другого, після крапки, і з комою після себе.', ex: [['The plan is good. However, it is too expensive.', 'План добрий. Однак він надто дорогий.'], ['It was risky. Nevertheless, they did it.', 'Це було ризиковано. Проте вони це зробили.']] },
                { t: 'whereas / while / on the other hand', d: '<b>whereas / while</b> — «тоді як»: два протилежні факти в одному реченні. <b>on the other hand</b> — «з іншого боку»: зважуємо аргументи.', ex: [['I love the sea, whereas my wife prefers the mountains.', 'Я люблю море, тоді як дружина — гори.'], ['The city is exciting. On the other hand, it’s very noisy.', 'Місто цікаве. З іншого боку, воно дуже шумне.']] }
              ],
              tip: 'Українське «Хоча…, але…» не перенось: Although it was late, but we stayed ✗ → Although it was late, we stayed ✓. Одне слово — although АБО but.'
            },
            exercises: [
              { type: 'choice', q: '___ it was raining, we went for a walk.', options: ['Although', 'Despite', 'However', 'In spite of'], answer: 0, explain: 'Далі речення (it was raining) → although.' },
              { type: 'choice', q: '___ his age, he still runs marathons.', options: ['Despite', 'Although', 'Even though', 'However'], answer: 0, explain: 'Далі іменник (his age) → despite.' },
              { type: 'choice', q: 'The plan is good. ___, it’s too expensive.', options: ['However', 'Although', 'Despite', 'Whereas'], answer: 0, explain: 'Зв’язок між двома реченнями, з комою → However.' },
              { type: 'choice', q: 'She passed the exam in spite ___ studying very little.', options: ['of', 'that', 'to', 'from'], answer: 0, explain: 'in spite OF + -ing.' },
              { type: 'choice', q: 'I like tea, ___ my sister prefers coffee.', options: ['whereas', 'despite', 'however', 'in spite of'], answer: 0, explain: 'Два протилежні факти в одному реченні → whereas.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['Although he was tired, he kept working.', 'Although he was tired, but he kept working.', 'Despite he was tired, he kept working.', 'Despite of being tired, he kept working.'], answer: 0, explain: 'although — без but; despite — без of і без речення.' },
              { type: 'fill', q: 'Despite ___ tired, she finished the report.', hint: 'to feel', answers: ['feeling'], explain: 'despite + -ing.' },
              { type: 'fill', q: 'He is very rich, ___ he isn’t happy. (але)', answers: ['but', 'yet'], explain: 'but / yet — між двома частинами речення.' },
              { type: 'fill', q: 'I didn’t get the job, ___ though I had all the qualifications. (навіть)', answers: ['even'], explain: 'even though — підсилене «хоча».' },
              { type: 'reorder', words: ['despite the fact that', 'he was ill', 'he went to work'], answer: 'Despite the fact that he was ill he went to work', uk: 'Попри те що він хворів, він пішов на роботу.' },
              { type: 'reorder', words: ['I love the sea', 'whereas my wife', 'prefers the mountains'], answer: 'I love the sea whereas my wife prefers the mountains', uk: 'Я люблю море, тоді як дружина — гори.' }
            ]
          },
          {
            id: 'link-cause', title: 'Причина і наслідок: because, so, therefore', emoji: '💡', level: 'B1', minutes: 9,
            theory: {
              intro: 'Чому? → причина (because, since, due to). І що з того? → наслідок (so, therefore, as a result). Знову головне — що стоїть після зв’язки: речення чи іменник.',
              rules: [
                { t: 'because / since / as + речення', d: '<b>because</b> — нейтральне «тому що». <b>since / as</b> — «оскільки», коли причина відома; часто на початку речення.', ex: [['I stayed at home because I felt ill.', 'Я залишився вдома, бо почувався погано.'], ['As it was late, we took a taxi.', 'Оскільки було пізно, ми взяли таксі.']] },
                { t: 'because of / due to / owing to + іменник', d: '«Через щось». <b>due to / owing to</b> — формальніші. НЕ «because the rain» ✗.', ex: [['The match was cancelled because of the rain.', 'Матч скасували через дощ.'], ['The delay was due to technical problems.', 'Затримка сталася через технічні проблеми.']] },
                { t: 'so / that’s why — розмовний наслідок', d: '<b>so</b> — «тож, тому», усередині речення після коми. <b>That’s why</b> — «ось чому», зазвичай нове речення.', ex: [['It was cold, so I put on a jacket.', 'Було холодно, тож я вдягнув куртку.'], ['I missed the bus. That’s why I’m late.', 'Я пропустив автобус. Ось чому спізнився.']] },
                { t: 'therefore / as a result / consequently / thus', d: 'Формальний наслідок — есе, звіти, листи. Зазвичай на початку нового речення з комою; <b>therefore</b> може стояти й перед дієсловом.', ex: [['Prices went up. As a result, sales fell.', 'Ціни зросли. Внаслідок цього продажі впали.'], ['He was ill and therefore couldn’t come.', 'Він захворів і тому не зміг прийти.']] },
                { t: 'Не плутай причину з метою', d: 'Причина — ЧОМУ? (because). Мета — НАВІЩО? (<b>to V, in order to, so that</b>).', ex: [['I’m saving money because I want a car.', 'Я відкладаю гроші, бо хочу авто.'], ['I’m saving money to buy a car.', 'Я відкладаю гроші, щоб купити авто.']] }
              ],
              tip: 'because = + речення, because of = + іменник. І не став because та so разом: «Because it was cold, so I stayed in» ✗.'
            },
            exercises: [
              { type: 'choice', q: 'The flight was delayed ___ the storm.', options: ['because of', 'because', 'so', 'since'], answer: 0, explain: 'Далі іменник → because of.' },
              { type: 'choice', q: 'I stayed at home ___ I felt ill.', options: ['because', 'because of', 'due to', 'so'], answer: 0, explain: 'Далі речення → because.' },
              { type: 'choice', q: 'It was very cold, ___ I put on a warm jacket.', options: ['so', 'because', 'due to', 'although'], answer: 0, explain: 'Наслідок → so.' },
              { type: 'choice', q: 'Sales fell sharply. ___, the company closed two shops.', options: ['As a result', 'Because of', 'Due to', 'Since'], answer: 0, explain: 'Наслідок, нове речення → As a result.' },
              { type: 'choice', q: '___ it was late, we decided to take a taxi.', options: ['As', 'Because of', 'Due to', 'So'], answer: 0, explain: 'Оскільки + речення → As.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['Because it was cold, I stayed in.', 'Because it was cold, so I stayed in.', 'Because of it was cold, I stayed in.', 'It was cold, because of I stayed in.'], answer: 0, explain: 'because + речення, і без so.' },
              { type: 'fill', q: 'The delay was ___ to bad weather. (через)', answers: ['due', 'owing'], explain: 'due to / owing to + іменник.' },
              { type: 'fill', q: 'I missed the bus. That’s ___ I’m late. (ось чому)', answers: ['why'], explain: 'That’s why — ось чому.' },
              { type: 'fill', q: 'He didn’t study and ___ failed the exam. (тому — формально)', answers: ['therefore', 'consequently', 'thus'], explain: 'therefore може стояти перед дієсловом.' },
              { type: 'reorder', words: ['the match was cancelled', 'because of', 'the heavy rain'], answer: 'The match was cancelled because of the heavy rain', uk: 'Матч скасували через сильний дощ.' },
              { type: 'reorder', words: ['it started to rain', 'so we', 'went home'], answer: 'It started to rain so we went home', uk: 'Почався дощ, тож ми пішли додому.' }
            ]
          },
          {
            id: 'link-addition', title: 'Додавання і приклади: also, moreover, not only… but also', emoji: '➕', level: 'B1', minutes: 10,
            theory: {
              intro: '«І», «також», «крім того», «наприклад» роблять мовлення зв’язним. Головні пастки: де стоять also і too та як працюють пари both…and, either…or, neither…nor.',
              rules: [
                { t: 'also / too / as well / either', d: '<b>also</b> — перед основним дієсловом (але після to be). <b>too / as well</b> — у кінці речення. У запереченні «теж не» — <b>either</b>.', ex: [['She also speaks French. = She speaks French too.', 'Вона також говорить французькою.'], ['I don’t like it either.', 'Мені це теж не подобається.']] },
                { t: 'moreover / furthermore / in addition / besides / what’s more', d: '«Крім того, більше того» — додаємо ще аргумент. На початку речення, з комою. <b>besides / what’s more</b> — розмовніші.', ex: [['The flat is cheap. Moreover, it’s close to the centre.', 'Квартира дешева. До того ж вона близько до центру.'], ['I don’t want to go out. Besides, it’s raining.', 'Не хочу виходити. Та й дощ іде.']] },
                { t: 'as well as / in addition to / apart from + іменник / -ing', d: '«А також, на додачу до, окрім» — далі іменник або -ing, не речення.', ex: [['As well as English, he speaks Polish.', 'Окрім англійської, він говорить польською.'], ['In addition to teaching, she writes books.', 'Окрім викладання, вона пише книжки.']] },
                { t: 'Пари: both…and, either…or, neither…nor, not only…but also', d: '<b>both…and</b> — і…і; <b>either…or</b> — або…або; <b>neither…nor</b> — ні…ні (дієслово стверджувальне!); <b>not only…but also</b> — не лише…, а й.', ex: [['Neither Tom nor Anna came to the party.', 'Ні Том, ні Анна не прийшли на вечірку.'], ['She is not only clever but also very kind.', 'Вона не лише розумна, а й дуже добра.']] },
                { t: 'Приклади: for example / for instance / such as / like', d: '<b>for example / for instance</b> — окреме речення або вставка між комами. <b>such as / like</b> — прямо перед іменниками.', ex: [['I love Italian food, such as pizza and pasta.', 'Я люблю італійську їжу, як-от піцу й пасту.'], ['Some animals, for example bears, sleep all winter.', 'Деякі тварини, наприклад ведмеді, сплять усю зиму.']] }
              ],
              tip: 'neither…nor уже містить заперечення: «Neither Tom nor Anna didn’t come» ✗ → Neither Tom nor Anna came ✓.'
            },
            exercises: [
              { type: 'choice', q: 'She speaks English, and she ___ speaks German.', options: ['also', 'too', 'as well', 'either'], answer: 0, explain: 'also — перед основним дієсловом.' },
              { type: 'choice', q: 'I don’t eat meat, and my wife doesn’t ___.', options: ['either', 'too', 'also', 'neither'], answer: 0, explain: 'Заперечення → either у кінці.' },
              { type: 'choice', q: '___ Tom nor Anna came to the meeting.', options: ['Neither', 'Either', 'Both', 'Not only'], answer: 0, explain: 'ні… ні → neither… nor.' },
              { type: 'choice', q: 'You can pay ___ by card or in cash.', options: ['either', 'neither', 'both', 'whether'], answer: 0, explain: 'або… або → either… or.' },
              { type: 'choice', q: 'The hotel was cheap. ___, the staff were very friendly.', options: ['Moreover', 'However', 'Although', 'Such as'], answer: 0, explain: 'Додаємо ще один плюс → Moreover.' },
              { type: 'choice', q: 'I like water sports ___ surfing and diving.', options: ['such as', 'for example', 'moreover', 'as well'], answer: 0, explain: 'Прямо перед іменниками → such as.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['Neither my brother nor my sister lives here.', 'Neither my brother nor my sister doesn’t live here.', 'Neither my brother or my sister lives here.', 'Either my brother nor my sister lives here.'], answer: 0, explain: 'neither… nor + стверджувальне дієслово.' },
              { type: 'fill', q: 'She is not only smart ___ also very funny.', answers: ['but'], explain: 'not only… but also.' },
              { type: 'fill', q: '___ well as English, he speaks Polish.', answers: ['As'], explain: 'as well as + іменник.' },
              { type: 'fill', q: '___ my parents and my friends came to the party. (і… і)', answers: ['Both'], explain: 'both… and — і… і.' },
              { type: 'reorder', words: ['in addition to', 'teaching', 'she writes books'], answer: 'In addition to teaching she writes books', uk: 'Окрім викладання, вона пише книжки.' }
            ]
          },
          {
            id: 'link-condition', title: 'Умова: unless, as long as, in case, otherwise', emoji: '🚦', level: 'B2', minutes: 10,
            theory: {
              intro: '«Якщо» — це не тільки if. Є «якщо не» (unless), «за умови що» (as long as), «на випадок» (in case) та «інакше» (otherwise). Як і після if, майбутнє тут без will.',
              rules: [
                { t: 'unless = if … not', d: '«Якщо не». Дієслово після unless стверджувальне і <b>без will</b>.', ex: [['You’ll miss the train unless you hurry.', 'Ти спізнишся на потяг, якщо не поквапишся.'], ['I won’t go unless you come with me.', 'Я не піду, якщо ти не підеш зі мною.']] },
                { t: 'as long as / provided (that)', d: '«За умови що; лише якщо». Сильніше за if — наголошує на умові.', ex: [['You can borrow my car as long as you drive carefully.', 'Можеш узяти мою машину, якщо їздитимеш обережно.'], ['We’ll finish on time provided that nobody gets ill.', 'Ми закінчимо вчасно за умови, що ніхто не захворіє.']] },
                { t: 'in case ≠ if', d: '<b>in case</b> — «на випадок, якщо»: робимо щось ЗАЗДАЛЕГІДЬ. <b>if</b> — робимо, лише КОЛИ це станеться.', ex: [['Take an umbrella in case it rains.', 'Візьми парасольку — раптом піде дощ.'], ['Call me if you need help.', 'Подзвони, якщо знадобиться допомога.']] },
                { t: 'otherwise / or (else)', d: '«Інакше, а то» — що буде, якщо НЕ виконати першу частину.', ex: [['Hurry up, otherwise we’ll be late.', 'Поквапся, інакше ми спізнимося.'], ['Put your coat on, or you’ll catch a cold.', 'Вдягни пальто, а то застудишся.']] },
                { t: 'even if / even though / whether…or', d: '<b>even if</b> — навіть якщо (може статися); <b>even though</b> — хоча (це факт). <b>whether…or not</b> — незалежно від того, чи.', ex: [['I’ll go even if it rains.', 'Я піду, навіть якщо піде дощ.'], ['Whether you like it or not, we’re leaving.', 'Подобається тобі чи ні — ми їдемо.']] }
              ],
              tip: 'Після unless, as long as, in case, provided — Present Simple замість will: unless it rains ✓, unless it will rain ✗.'
            },
            exercises: [
              { type: 'choice', q: 'You’ll be late ___ you leave now.', options: ['unless', 'in case', 'as long as', 'otherwise'], answer: 0, explain: 'Якщо НЕ вийдеш зараз → unless.' },
              { type: 'choice', q: 'Take some water ___ you get thirsty on the way.', options: ['in case', 'unless', 'otherwise', 'even though'], answer: 0, explain: 'Заздалегідь, на випадок → in case.' },
              { type: 'choice', q: 'You can use my laptop ___ you’re careful with it.', options: ['as long as', 'unless', 'in case', 'otherwise'], answer: 0, explain: 'За умови що → as long as.' },
              { type: 'choice', q: 'Write it down, ___ you’ll forget it.', options: ['otherwise', 'unless', 'in case', 'provided'], answer: 0, explain: 'Інакше → otherwise.' },
              { type: 'choice', q: 'I won’t call you unless something ___.', options: ['happens', 'will happen', 'doesn’t happen', 'happened'], answer: 0, explain: 'Після unless — Present Simple, стверджувальне.' },
              { type: 'choice', q: 'We’re going to the beach tomorrow ___ it’s cloudy. (навіть якщо)', options: ['even if', 'even though', 'in case', 'unless'], answer: 0, explain: 'Можливе, а не факт → even if.' },
              { type: 'fill', q: '___ you like it or not, you have to do it. (чи… чи ні)', answers: ['Whether'], explain: 'whether… or not.' },
              { type: 'fill', q: 'We’ll have a picnic ___ it rains. (якщо не)', answers: ['unless'], explain: 'unless = if not.' },
              { type: 'fill', q: 'I’ll lend you the money as ___ as you pay me back next week. (за умови що)', answers: ['long'], explain: 'as long as — за умови що.' },
              { type: 'reorder', words: ['take a jacket', 'in case', 'it gets cold'], answer: 'Take a jacket in case it gets cold', uk: 'Візьми куртку — раптом похолоднішає.' }
            ]
          },
          {
            id: 'link-sequence', title: 'Послідовність, підсумок і розмовні зв’язки', emoji: '🪜', level: 'B1', minutes: 9,
            theory: {
              intro: 'Щоб розповідь чи есе звучали логічно, потрібні «дороговкази»: спершу, потім, нарешті, отже. А в розмові — actually, anyway, by the way.',
              rules: [
                { t: 'Порядок дій', d: '<b>first / firstly, second / secondly, then, next, after that, finally</b>. Саме <b>after</b> — прийменник (after lunch), тож як зв’язку між реченнями бери <b>after that</b>.', ex: [['First, boil the water. Then add the pasta.', 'Спершу закип’яти воду. Потім додай пасту.'], ['We had dinner. After that, we watched a film.', 'Ми повечеряли. Після цього подивилися фільм.']] },
                { t: 'afterwards / later / meanwhile', d: '<b>afterwards</b> — згодом, після того; <b>later</b> — пізніше; <b>meanwhile / in the meantime</b> — тим часом.', ex: [['We went to the museum and had lunch afterwards.', 'Ми сходили в музей, а потім пообідали.'], ['I’ll cook dinner. Meanwhile, you can set the table.', 'Я приготую вечерю. А ти тим часом накрий на стіл.']] },
                { t: 'finally / eventually / at last', d: '<b>finally</b> — нарешті, останній пункт; <b>eventually</b> — зрештою, після довгого процесу; <b>at last</b> — нарешті! (довгоочікуване, емоційно).', ex: [['After hours of searching, we eventually found the hotel.', 'Після годин пошуків ми зрештою знайшли готель.'], ['At last! I’ve been waiting for ages!', 'Нарешті! Я чекаю цілу вічність!']] },
                { t: 'in the end ≠ at the end of', d: '<b>in the end</b> — зрештою (результат). <b>at the end of</b> — у кінці чогось (часу, місця, події).', ex: [['We argued a lot, but in the end we agreed.', 'Ми довго сперечалися, але зрештою погодилися.'], ['I get paid at the end of the month.', 'Я отримую зарплату в кінці місяця.']] },
                { t: 'Підсумок', d: '<b>in conclusion, to sum up, overall, in short, all in all</b> — для висновку в есе чи виступі.', ex: [['To sum up, the project was a success.', 'Підсумовуючи, проєкт був успішним.']] },
                { t: 'Розмовні: actually, in fact, anyway, by the way', d: '<b>actually / in fact</b> — насправді (НЕ «актуально»!); <b>anyway</b> — у всякому разі, ну гаразд; <b>by the way</b> — до речі.', ex: [['I thought he was 30. Actually, he’s 45.', 'Я думав, йому 30. Насправді — 45.'], ['By the way, have you seen my keys?', 'До речі, ти не бачив моїх ключів?']] }
              ],
              tip: 'actually — фальшивий друг перекладача: це «насправді», а не «актуально». «Актуальний» англійською — relevant або current.'
            },
            exercises: [
              { type: 'choice', q: 'First, wash the vegetables. ___, cut them into small pieces.', options: ['Then', 'After', 'At last', 'In the end'], answer: 0, explain: 'Наступний крок → Then.' },
              { type: 'choice', q: 'We argued for hours, but ___ we agreed.', options: ['in the end', 'at the end', 'at last', 'after'], answer: 0, explain: 'Зрештою (результат) → in the end.' },
              { type: 'choice', q: 'Please pay the bill ___ the month.', options: ['at the end of', 'in the end of', 'in the end', 'finally'], answer: 0, explain: 'У кінці чогось → at the end of.' },
              { type: 'choice', q: '___! The bus is here. We’ve been waiting for 40 minutes!', options: ['At last', 'Eventually', 'Afterwards', 'In conclusion'], answer: 0, explain: 'Довгоочікуване, емоційно → At last.' },
              { type: 'choice', q: 'I thought the film was new. ___, it was made in 1995.', options: ['Actually', 'Currently', 'Anyway', 'Meanwhile'], answer: 0, explain: 'Насправді → Actually.' },
              { type: 'choice', q: 'We had lunch, and ___ we went to the beach.', options: ['afterwards', 'after', 'at last', 'in the end'], answer: 0, explain: 'Згодом → afterwards; after без додатка тут не стоїть.' },
              { type: 'fill', q: 'I’ll cook. ___, you can set the table. (тим часом)', answers: ['Meanwhile', 'In the meantime'], explain: 'Meanwhile — тим часом.' },
              { type: 'fill', q: '___ the way, did you call your mum? (до речі)', answers: ['By'], explain: 'By the way — до речі.' },
              { type: 'fill', q: 'To sum ___, the trip was a great success.', answers: ['up'], explain: 'To sum up — підсумовуючи.' },
              { type: 'reorder', words: ['we had dinner', 'after that', 'we watched a film'], answer: 'We had dinner after that we watched a film', uk: 'Ми повечеряли. Після цього подивилися фільм.' }
            ]
          }
        ]
      },
      /* ---------- TIME CLAUSES ---------- */
      {
        id: 'time-clauses', title: 'Речення часу: when / until / as soon as', emoji: '⏱️',
        desc: 'When I get home, I’ll call you — чому після when, until, as soon as немає will, і як обрати while, during, for, until чи by.',
        cheat: {
          title: 'коли · поки · до · під час',
          head: ['Конструкція', 'Переклад і формула', 'Приклад'],
          rows: [
            [{ t: 'when / as soon as / before / after / once + Present', topic: 'time-future' }, 'про майбутнє, але БЕЗ will', 'When I get home, I’ll call you.'],
            [{ t: 'when / after / as soon as + Present Perfect', topic: 'time-future' }, 'коли вже повністю завершиться', 'I’ll call you when I have finished.'],
            [{ t: 'until / not … until', topic: 'time-future' }, 'поки НЕ (без заперечення!) / лише коли', 'Wait until I come back.'],
            [{ t: 'while / as + речення', topic: 'time-linkers' }, 'поки, у той час як', 'While I was cooking, he called.'],
            [{ t: 'during + іменник · for + скільки', topic: 'time-linkers' }, 'під час / протягом', 'during the film · for two hours'],
            [{ t: 'until ≠ by', topic: 'time-linkers' }, 'аж до (процес) / не пізніше (дедлайн)', 'I’ll wait until 6. Finish it by 6.'],
            [{ t: 'by the time + речення', topic: 'time-linkers' }, 'на момент, коли · часто Past Perfect', 'By the time we arrived, the film had started.']
          ]
        },
        topics: [
          {
            id: 'time-future', title: 'Майбутнє після when, as soon as, until — без will', emoji: '⏱️', level: 'B1', minutes: 9,
            theory: {
              intro: 'Українською кажемо «Коли я прийду, я подзвоню» — обидва дієслова в майбутньому. Англійською після слів часу майбутнє передає Present Simple, а will лишається тільки в головній частині.',
              rules: [
                { t: 'Головне правило', d: 'Після <b>when, as soon as, after, before, until, once, by the time</b> про майбутнє — <b>Present Simple</b>, НЕ will.', ex: [['When I get home, I’ll call you.', 'Коли я прийду додому, я тобі подзвоню.'], ['I’ll wait here until you come back.', 'Я чекатиму тут, поки ти не повернешся.']] },
                { t: 'Кома і порядок частин', d: 'Частини можна міняти місцями. Якщо речення часу стоїть першим — ставимо кому.', ex: [['As soon as I finish, I’ll help you. = I’ll help you as soon as I finish.', 'Щойно закінчу, я тобі допоможу.']] },
                { t: 'Present Perfect — «коли вже завершиться»', d: 'Щоб підкреслити, що дія буде ПОВНІСТЮ завершена до наступної: <b>when / after / as soon as + have done</b>.', ex: [['I’ll go out when I have finished my homework.', 'Я вийду, коли зроблю домашнє.'], ['You can leave after you have signed the form.', 'Можете йти, щойно підпишете бланк.']] },
                { t: 'until = «поки не»', d: 'Українське «поки НЕ» в англійській — без заперечення: <b>until you come</b>, а не «until you don’t come». <b>not … until</b> — «лише коли, не раніше ніж».', ex: [['Don’t start until I say so.', 'Не починай, поки я не скажу.'], ['She didn’t go to bed until midnight.', 'Вона лягла спати лише опівночі.']] },
                { t: 'when ≠ if', d: '<b>when</b> — дія точно буде; <b>if</b> — може, буде, а може, ні. Правило «без will» — для обох.', ex: [['When I see Tom, I’ll tell him. (точно побачу)', 'Коли побачу Тома, скажу йому.'], ['If I see Tom, I’ll tell him. (можливо)', 'Якщо побачу Тома, скажу йому.']] }
              ],
              tip: 'Стоп-сигнал: when / until / as soon as / before / after про майбутнє → will тут заборонений. «When I will come» ✗ → When I come ✓.'
            },
            exercises: [
              { type: 'choice', q: 'When I ___ home, I’ll call you.', options: ['get', 'will get', 'got', 'would get'], answer: 0, explain: 'Після when про майбутнє → Present Simple.' },
              { type: 'choice', q: 'I’ll wait here until you ___ back.', options: ['come', 'will come', 'don’t come', 'came'], answer: 0, explain: 'until = поки не; без will і без заперечення.' },
              { type: 'choice', q: 'As soon as the film ___, we’ll go to a café.', options: ['ends', 'will end', 'ended', 'would end'], answer: 0, explain: 'as soon as + Present Simple.' },
              { type: 'choice', q: 'We ___ dinner as soon as Dad comes home tonight.', options: ['will have', 'have had', 'would have', 'had had'], answer: 0, explain: 'Головна частина про майбутнє → will.' },
              { type: 'choice', q: 'I’ll go out after I ___ all my homework. (коли повністю зроблю)', options: ['have finished', 'will finish', 'will have finished', 'had finished'], answer: 0, explain: 'Завершеність → Present Perfect після after.' },
              { type: 'choice', q: 'Don’t open the door ___ I tell you.', options: ['until', 'by', 'while', 'during'], answer: 0, explain: 'Поки не скажу → until.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['Before you leave, turn off the lights.', 'Before you will leave, turn off the lights.', 'Before you don’t leave, turn off the lights.', 'Before leave you, turn off the lights.'], answer: 0, explain: 'Після before — Present Simple без will.' },
              { type: 'fill', q: 'I’ll tell her the news when I ___ her tomorrow.', hint: 'to see', answers: ['see'], explain: 'when + Present Simple.' },
              { type: 'fill', q: 'She won’t be happy until she ___ the truth.', hint: 'to know', answers: ['knows'], explain: 'until + Present Simple, she → knows.' },
              { type: 'fill', q: 'Once you ___ the form, send it to us.', hint: 'to complete', answers: ['complete', 'have completed'], explain: 'once + Present Simple або Present Perfect.' },
              { type: 'reorder', words: ['as soon as I arrive', 'I will', 'send you a message'], answer: 'As soon as I arrive I will send you a message', uk: 'Щойно приїду, надішлю тобі повідомлення.' }
            ]
          },
          {
            id: 'time-linkers', title: 'while / during / for, until / by, by the time', emoji: '⌛', level: 'B1', minutes: 9,
            theory: {
              intro: '«Поки», «під час», «протягом», «до» — українською це часто одне слово, а англійською вибір залежить від того, що далі: речення чи іменник, процес чи дедлайн.',
              rules: [
                { t: 'while / as + речення', d: '«Поки, у той час як» — дві дії одночасно. Часто з Continuous.', ex: [['While I was cooking, the phone rang.', 'Поки я готував, задзвонив телефон.'], ['As I was leaving, it started to rain.', 'Коли я виходив, почався дощ.']] },
                { t: 'during + іменник', d: '«Під час» чогось. Після during — НЕ речення.', ex: [['He fell asleep during the film.', 'Він заснув під час фільму.'], ['Phones must be off during the exam.', 'Під час іспиту телефони мають бути вимкнені.']] },
                { t: 'for — як довго', d: '<b>for</b> + відрізок часу. <b>during</b> відповідає на «коли?», <b>for</b> — на «як довго?».', ex: [['I lived in Lviv for five years.', 'Я жив у Львові п’ять років.'], ['It rained for three days during our holiday.', 'Під час нашої відпустки три дні йшов дощ.']] },
                { t: 'until ≠ by', d: '<b>until</b> — дія ТРИВАЄ аж до моменту. <b>by</b> — дедлайн: не пізніше ніж.', ex: [['I’ll be at the office until 6.', 'Я буду в офісі до 6-ї.'], ['Please send the report by Friday.', 'Надішли звіт до п’ятниці (не пізніше).']] },
                { t: 'by the time + речення', d: '«На той момент, коли». Про минуле — зазвичай з Past Perfect; про майбутнє — Present Simple + will have done.', ex: [['By the time we arrived, the film had started.', 'Коли ми приїхали, фільм уже почався.'], ['By the time you read this, I will have left.', 'Коли ти це прочитаєш, я вже поїду.']] }
              ],
              tip: 'Тест: далі речення (підмет + дієслово)? → while. Іменник? → during. Скільки часу? → for. Процес аж до межі → until, дедлайн → by.'
            },
            exercises: [
              { type: 'choice', q: 'He fell asleep ___ the lecture.', options: ['during', 'while', 'for', 'until'], answer: 0, explain: 'Далі іменник → during.' },
              { type: 'choice', q: '___ I was waiting for the bus, I read the news.', options: ['While', 'During', 'For', 'By'], answer: 0, explain: 'Далі речення → while.' },
              { type: 'choice', q: 'We stayed in Rome ___ a week.', options: ['for', 'during', 'while', 'since'], answer: 0, explain: 'Як довго → for.' },
              { type: 'choice', q: 'Please return the book ___ Monday. (не пізніше)', options: ['by', 'until', 'during', 'while'], answer: 0, explain: 'Дедлайн → by.' },
              { type: 'choice', q: 'The shop is open ___ 9 pm.', options: ['until', 'by', 'during', 'for'], answer: 0, explain: 'Відкрито весь час аж до 9-ї → until.' },
              { type: 'choice', q: '___ we got to the station, the train had already left.', options: ['By the time', 'Until', 'During', 'For'], answer: 0, explain: 'На момент, коли → By the time + Past Perfect.' },
              { type: 'fill', q: 'The phone rang ___ I was having a shower.', answers: ['while', 'as', 'when'], explain: 'while / as / when + речення.' },
              { type: 'fill', q: 'I have to finish this project ___ the end of the month. (не пізніше)', answers: ['by'], explain: 'Дедлайн → by.' },
              { type: 'fill', q: 'By the time I woke up, everyone ___ already had breakfast.', hint: 'Past Perfect', answers: ['had'], explain: 'By the time у минулому → Past Perfect: had had.' },
              { type: 'reorder', words: ['it rained', 'for three days', 'during our holiday'], answer: 'It rained for three days during our holiday', uk: 'Під час нашої відпустки три дні йшов дощ.' }
            ]
          }
        ]
      },
      /* ---------- PRONOUNS ---------- */
      {
        id: 'pronouns', title: 'Займенники: I / me / my / mine / myself', emoji: '👤',
        desc: 'Особові, присвійні, зворотні й вказівні займенники, each other, one / ones, another / other і all / both / either / neither.',
        cheat: {
          tables: [
            {
              title: '👤 Особові, присвійні, зворотні',
              head: ['Підмет', 'Додаток', 'Присвійний + ім.', 'Присвійний без ім.', 'Зворотний'],
              rows: [
                [{ t: 'I', topic: 'pron-personal' }, 'me', 'my', 'mine', 'myself'],
                [{ t: 'you', topic: 'pron-personal' }, 'you', 'your', 'yours', 'yourself / yourselves'],
                [{ t: 'he', topic: 'pron-personal' }, 'him', 'his', 'his', 'himself'],
                [{ t: 'she', topic: 'pron-personal' }, 'her', 'her', 'hers', 'herself'],
                [{ t: 'it', topic: 'pron-personal' }, 'it', 'its (без апострофа!)', '—', 'itself'],
                [{ t: 'we', topic: 'pron-personal' }, 'us', 'our', 'ours', 'ourselves'],
                [{ t: 'they', topic: 'pron-personal' }, 'them', 'their', 'theirs', 'themselves']
              ]
            },
            {
              title: '🪞 Зворотні та взаємні',
              head: ['Конструкція', 'Переклад і коли вживаємо', 'Приклад'],
              rows: [
                [{ t: 'myself / yourself…', topic: 'pron-reflexive' }, 'себе / сам · дія на себе або підсилення', 'She cut herself. · I did it myself.'],
                [{ t: 'by myself', topic: 'pron-reflexive' }, 'сам-один, без допомоги', 'He lives by himself.'],
                [{ t: 'wash · dress · feel · relax · meet · worry', topic: 'pron-reflexive' }, 'БЕЗ -self (хоча українською «-ся»)', 'I feel good. · Just relax.'],
                [{ t: 'enjoy / help / behave yourself', topic: 'pron-reflexive' }, 'розважайся / пригощайся / поводься чемно', 'Help yourself to some cake!'],
                [{ t: 'each other ≠ themselves', topic: 'pron-reflexive' }, 'один одного / кожен себе', 'They love each other.']
              ]
            },
            {
              title: '👉 Вказівні, one / ones, other',
              head: ['Слово', 'Переклад і коли вживаємо', 'Приклад'],
              rows: [
                [{ t: 'this / these', topic: 'pron-demonstrative' }, 'цей / ці · близько, теперішнє', 'this week · these shoes'],
                [{ t: 'that / those', topic: 'pron-demonstrative' }, 'той / ті · далеко, минуле', 'that day · those people'],
                [{ t: 'one / ones', topic: 'pron-demonstrative' }, 'замість повтору злічуваного іменника', 'the red one · the black ones'],
                [{ t: 'another', topic: 'pron-demonstrative' }, 'ще один / інший · + ОДНИНА', 'another cup · another day'],
                [{ t: 'other / others', topic: 'pron-demonstrative' }, 'інші · other + множина, others — без іменника', 'other people · some…, others…'],
                [{ t: 'the other / the others', topic: 'pron-demonstrative' }, 'інший (з двох) / решта', 'one hand…, the other hand…']
              ]
            },
            {
              title: '🧮 Усі, обидва, жоден, кожен',
              head: ['Слово', 'Скільки в групі і граматика', 'Приклад'],
              rows: [
                [{ t: 'both', topic: 'pron-quantity' }, 'обидва · ДВОЄ, + множина', 'Both answers are correct.'],
                [{ t: 'either / neither', topic: 'pron-quantity' }, 'будь-який / жоден із ДВОХ · + одн.', 'Neither answer is correct.'],
                [{ t: 'all / none (of)', topic: 'pron-quantity' }, 'усі / жоден · ТРОЄ і більше', 'None of the students came.'],
                [{ t: 'each ≠ every', topic: 'pron-quantity' }, 'кожен окремо (each of) / усі без винятку (без of)', 'each of us · every day'],
                [{ t: '… of + them / us / the', topic: 'pron-quantity' }, 'з займенником чи the — через of', 'both of them · all of us']
              ]
            }
          ]
        },
        topics: [
          {
            id: 'pron-personal', title: 'Особові й присвійні: me, my, mine', emoji: '👤', level: 'A2', minutes: 9,
            theory: {
              intro: 'I чи me? my чи mine? its чи it’s? Англійські займенники змінюють форму залежно від ролі в реченні — і тут українські звички часто підводять.',
              rules: [
                { t: 'Підмет чи додаток', d: '<b>I, he, she, we, they</b> — хто робить дію. <b>me, him, her, us, them</b> — на кого вона спрямована, а також після прийменників.', ex: [['She called me yesterday.', 'Вона мені вчора дзвонила.'], ['This present is for him.', 'Цей подарунок для нього.']] },
                { t: 'Короткі відповіді', d: 'У живій мові після to be і в коротких репліках — форма додатка: <b>It’s me. Me too. Not me.</b>', ex: [['— Who’s there? — It’s me.', '— Хто там? — Це я.'], ['— I’m hungry. — Me too.', '— Я голодний. — Я теж.']] },
                { t: 'my ≠ mine', d: '<b>my, your, his, her, our, their</b> — ТІЛЬКИ перед іменником. <b>mine, yours, his, hers, ours, theirs</b> — БЕЗ іменника. А ще <b>a friend of mine</b>.', ex: [['This is my phone. This phone is mine.', 'Це мій телефон. Цей телефон — мій.'], ['She’s a friend of mine.', 'Вона моя подруга (одна з моїх).']] },
                { t: 'its ≠ it’s', d: '<b>its</b> — його/її (про річ чи тварину), без апострофа! <b>it’s</b> = it is / it has.', ex: [['The dog wagged its tail.', 'Собака махав хвостом.'], ['It’s been a long day.', 'Це був довгий день.']] },
                { t: '«свій» — окремого слова немає', d: 'Українське «свій» перекладаємо за особою: я — <b>my</b>, він — <b>his</b>, вона — <b>her</b>, ми — <b>our</b>, вони — <b>their</b>.', ex: [['He loves his job, and she loves her job.', 'Він любить свою роботу, і вона — свою.']] }
              ],
              tip: '«Me and my friend went…» — розмовно, але в тестах пиши «My friend and I went…». Перевірка: прибери друга — «I went» ✓, «me went» ✗.'
            },
            exercises: [
              { type: 'choice', q: 'She called ___ yesterday.', options: ['me', 'I', 'my', 'mine'], answer: 0, explain: 'Додаток → me.' },
              { type: 'choice', q: 'Is this pen yours or ___?', options: ['mine', 'my', 'me', 'I'], answer: 0, explain: 'Без іменника → mine.' },
              { type: 'choice', q: 'The cat is playing with ___ toy.', options: ['its', 'it’s', 'it', 'it is'], answer: 0, explain: 'Присвійний для тварини чи речі → its.' },
              { type: 'choice', q: 'He loves ___ wife very much.', options: ['his', 'her', 'its', 'him'], answer: 0, explain: '«свою» для he → his.' },
              { type: 'choice', q: 'My sister and ___ went to the cinema.', options: ['I', 'me', 'my', 'mine'], answer: 0, explain: 'Частина підмета → I.' },
              { type: 'choice', q: 'Between you and ___, I don’t like him.', options: ['me', 'I', 'my', 'mine'], answer: 0, explain: 'Після прийменника between → me.' },
              { type: 'choice', q: 'Tom is an old friend of ___.', options: ['mine', 'me', 'my', 'I'], answer: 0, explain: 'a friend of + mine.' },
              { type: 'fill', q: 'These aren’t my keys. They are ___. (її)', answers: ['hers'], explain: 'Без іменника → hers (без апострофа!).' },
              { type: 'fill', q: 'The children did ___ homework. (свою)', answers: ['their'], explain: 'they → their.' },
              { type: 'fill', q: '— Who wants ice cream? — ___! (я)', answers: ['Me', 'I do'], explain: 'Коротка розмовна відповідь → Me!' },
              { type: 'reorder', words: ['this house', 'is', 'ours'], answer: 'This house is ours', uk: 'Цей будинок — наш.' }
            ]
          },
          {
            id: 'pron-reflexive', title: 'Зворотні займенники і each other', emoji: '🪞', level: 'B1', minutes: 9,
            theory: {
              intro: 'myself, yourself, themselves — це «себе» і «сам». Але головна пастка для україномовних — не ставити -self там, де в нас просто «-ся».',
              rules: [
                { t: 'Дія на себе', d: 'Коли підмет і додаток — та сама особа: <b>myself, yourself, himself, herself, itself, ourselves, yourselves, themselves</b>.', ex: [['Be careful! You’ll cut yourself.', 'Обережно! Поріжешся.'], ['She taught herself to play the guitar.', 'Вона сама навчилася грати на гітарі.']] },
                { t: 'Сам; by myself — сам-один', d: 'Для підсилення: <b>I did it myself</b> — сам. <b>by myself</b> — без допомоги або на самоті.', ex: [['I fixed the car myself.', 'Я сам полагодив машину.'], ['He lives by himself.', 'Він живе сам.']] },
                { t: 'Пастка «-ся»: БЕЗ -self', d: '<b>wash, shave, dress, feel, relax, concentrate, meet, worry, hurry</b> — зазвичай без зворотного займенника.', ex: [['I got up, washed and got dressed.', 'Я встав, умився й одягнувся.'], ['Just relax and don’t worry.', 'Просто розслабся й не хвилюйся.']] },
                { t: 'Сталі вирази', d: '<b>enjoy yourself</b> — розважайся, <b>help yourself</b> — пригощайся, <b>make yourself at home</b> — почувайся як удома, <b>behave yourself</b> — поводься чемно.', ex: [['Help yourself to some cake!', 'Пригощайся тортом!'], ['Did you enjoy yourselves at the party?', 'Вам сподобалося на вечірці?']] },
                { t: 'each other ≠ themselves', d: '<b>each other / one another</b> — один одного (взаємно). <b>themselves</b> — кожен себе.', ex: [['They looked at each other.', 'Вони подивилися одне на одного.'], ['They looked at themselves in the mirror.', 'Вони подивилися на себе в дзеркало.']] }
              ],
              tip: 'enjoy без додатка не буває: «I enjoyed» ✗ → I enjoyed myself ✓ або I enjoyed the party ✓.'
            },
            exercises: [
              { type: 'choice', q: 'Be careful with that knife — don’t cut ___!', options: ['yourself', 'you', 'yours', 'your'], answer: 0, explain: 'Дія на себе → yourself.' },
              { type: 'choice', q: 'We really enjoyed ___ at the party.', options: ['ourselves', 'us', 'ours', 'each other'], answer: 0, explain: 'enjoy + зворотний займенник → ourselves.' },
              { type: 'choice', q: 'Just ___ — everything will be fine.', options: ['relax', 'relax yourself', 'relax you', 'relaxing'], answer: 0, explain: 'relax — без -self.' },
              { type: 'choice', q: 'Anna and Tom love ___ very much.', options: ['each other', 'themselves', 'theirselves', 'them'], answer: 0, explain: 'Взаємно → each other.' },
              { type: 'choice', q: 'She lives by ___.', options: ['herself', 'her', 'hers', 'she'], answer: 0, explain: 'by + зворотний → by herself.' },
              { type: 'choice', q: 'Please, help ___ to some sandwiches!', options: ['yourself', 'you', 'your', 'yours'], answer: 0, explain: 'help yourself — пригощайся.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['I feel great today.', 'I feel myself great today.', 'I feel me great today.', 'I am feeling myself great today.'], answer: 0, explain: 'feel — без -self.' },
              { type: 'fill', q: 'The children made the cake ___. (самі)', answers: ['themselves'], explain: 'they → themselves.' },
              { type: 'fill', q: 'He taught ___ to play the piano. (сам себе)', answers: ['himself'], explain: 'he → himself.' },
              { type: 'fill', q: 'We don’t talk to ___ any more. (одне з одним)', answers: ['each other', 'one another'], explain: 'Взаємно → each other.' },
              { type: 'reorder', words: ['make yourself', 'at home'], answer: 'Make yourself at home', uk: 'Почувайся як удома.' }
            ]
          },
          {
            id: 'pron-demonstrative', title: 'this / that, one / ones, another / other', emoji: '👉', level: 'A2', minutes: 9,
            theory: {
              intro: 'Цей чи той? Ще один чи інший? А щоб не повторювати іменник — one. Ці маленькі слова постійно звучать у мові й часто плутаються.',
              rules: [
                { t: 'this / these ≠ that / those', d: '<b>this / these</b> — близько (цей, ці). <b>that / those</b> — далеко (той, ті). А ще this — теперішнє, that — минуле: <b>this week / that day</b>.', ex: [['This bag is mine, and those bags are yours.', 'Ця сумка моя, а ті — твої.'], ['That was a great evening.', 'То був чудовий вечір.']] },
                { t: 'one / ones замість повтору', d: 'Щоб не повторювати злічуваний іменник: <b>one</b> (одн.), <b>ones</b> (множ.). З незлічуваними не вживається.', ex: [['— Which shirt do you want? — The blue one.', '— Яку сорочку хочеш? — Синю.'], ['These shoes are nice, but I prefer the black ones.', 'Ці туфлі гарні, але мені більше подобаються чорні.']] },
                { t: 'another = ще один / інший (одн.)', d: '<b>another</b> + іменник в ОДНИНІ; пишеться разом (an + other).', ex: [['Can I have another cup of tea?', 'Можна ще чашку чаю?'], ['Let’s meet another day.', 'Зустріньмося іншого дня.']] },
                { t: 'other / others / the other', d: '<b>other</b> + множина (other people). <b>others</b> — без іменника. <b>the other</b> — другий, той інший (з двох); <b>the others</b> — решта.', ex: [['Some people like tea; others prefer coffee.', 'Хтось любить чай, інші — каву.'], ['I have two brothers. One is a doctor, the other is a teacher.', 'У мене два брати. Один лікар, інший — учитель.']] }
              ],
              tip: 'another — тільки з одниною: another book ✓, another books ✗ → other books ✓. А the other — коли варіантів лишився один.'
            },
            exercises: [
              { type: 'choice', q: 'Can I have ___ piece of cake?', options: ['another', 'other', 'others', 'the others'], answer: 0, explain: 'Ще один, одн. → another.' },
              { type: 'choice', q: 'Some students came by bus; ___ walked.', options: ['others', 'other', 'another', 'the other'], answer: 0, explain: 'Без іменника, множ. → others.' },
              { type: 'choice', q: 'I have two cats. One is black, and ___ is white.', options: ['the other', 'another', 'other', 'others'], answer: 0, explain: 'Другий із двох → the other.' },
              { type: 'choice', q: 'I don’t like the red dress. I prefer the green ___.', options: ['one', 'ones', 'it', 'other'], answer: 0, explain: 'Замість dress (одн.) → one.' },
              { type: 'choice', q: 'Look at ___ birds over there!', options: ['those', 'these', 'this', 'that'], answer: 0, explain: 'Далеко + множина → those.' },
              { type: 'choice', q: 'Are there any ___ questions?', options: ['other', 'another', 'others', 'the other'], answer: 0, explain: 'other + множина.' },
              { type: 'fill', q: 'These shoes are too small. Do you have bigger ___?', answers: ['ones'], explain: 'Множина → ones.' },
              { type: 'fill', q: 'Let’s talk about it ___ time. (іншим разом)', answers: ['another'], explain: 'another + одн.' },
              { type: 'fill', q: 'Do you remember ___ day when we first met? (той)', answers: ['that'], explain: 'Минуле, «той» → that.' },
              { type: 'reorder', words: ['one is a doctor', 'and the other', 'is a teacher'], answer: 'One is a doctor and the other is a teacher', uk: 'Один — лікар, а інший — учитель.' }
            ]
          },
          {
            id: 'pron-quantity', title: 'all / both / either / neither / none / each', emoji: '🧮', level: 'B1', minutes: 9,
            theory: {
              intro: 'Усі, обидва, будь-який із двох, жоден, кожен — ці слова показують «скільки з групи». Ключове питання: йдеться про двох чи про більше?',
              rules: [
                { t: 'Про ДВОХ: both / either / neither', d: '<b>both</b> — обидва (+ множина). <b>either</b> — будь-який із двох (+ одн.). <b>neither</b> — жоден із двох (+ одн., дієслово стверджувальне).', ex: [['Both answers are correct.', 'Обидві відповіді правильні.'], ['Neither answer is correct.', 'Жодна з двох відповідей не правильна.']] },
                { t: 'Про ТРЬОХ і більше: all / any / none', d: '<b>all</b> — усі; <b>any</b> — будь-який; <b>none (of)</b> — жоден. Про двох — не all, а <b>both</b>!', ex: [['All my friends came.', 'Прийшли всі мої друзі.'], ['None of the students passed the test.', 'Жоден зі студентів не склав тест.']] },
                { t: '… of + займенник / the', d: 'Перед займенником або the — через <b>of</b>: <b>both of them, all of us, neither of you, none of the books</b>.', ex: [['Both of them are doctors.', 'Обоє вони лікарі.'], ['Neither of us knew the answer.', 'Ніхто з нас двох не знав відповіді.']] },
                { t: 'each ≠ every', d: '<b>each</b> — кожен окремо (від двох), можна <b>each of</b>. <b>every</b> — усі без винятку (від трьох), без of.', ex: [['Each of the children got a present.', 'Кожна дитина отримала подарунок.'], ['I go to the gym every day.', 'Я ходжу в спортзал щодня.']] },
                { t: 'Позиція all / both', d: 'Перед основним дієсловом, але ПІСЛЯ to be і допоміжного.', ex: [['We all agree. / We are all tired.', 'Ми всі згодні. / Ми всі втомлені.'], ['They have both finished.', 'Вони обидва закінчили.']] }
              ],
              tip: '«Neither of them didn’t come» ✗ → Neither of them came ✓. neither і none уже містять «не».'
            },
            exercises: [
              { type: 'choice', q: 'I have two sisters. ___ of them live in Lviv.', options: ['Both', 'All', 'Either', 'Each'], answer: 0, explain: 'Двоє, «обидві» + live → Both.' },
              { type: 'choice', q: 'You can take ___ seat — they’re both free.', options: ['either', 'both', 'neither', 'all'], answer: 0, explain: 'Будь-яке з двох → either.' },
              { type: 'choice', q: '___ of my parents speaks English. (жоден із двох)', options: ['Neither', 'None', 'Either', 'Both'], answer: 0, explain: 'Двоє, жоден → Neither.' },
              { type: 'choice', q: '___ of the twenty students passed the test. (жоден)', options: ['None', 'Neither', 'Either', 'Both'], answer: 0, explain: 'Більше двох → None.' },
              { type: 'choice', q: '___ of the ten children got a small present.', options: ['Each', 'Every', 'Both', 'Neither'], answer: 0, explain: 'each of + множина; every без of не вживається.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['Neither of us knew the answer.', 'Neither of us didn’t know the answer.', 'Neither us knew the answer.', 'None of us two knew the answer.'], answer: 0, explain: 'neither of + стверджувальне дієслово.' },
              { type: 'fill', q: 'We are ___ very tired after the trip. (усі)', answers: ['all'], explain: 'all — після to be.' },
              { type: 'fill', q: 'I go jogging ___ morning. (кожного)', answers: ['every'], explain: 'every + іменник, без of.' },
              { type: 'fill', q: '___ of them are doctors. (обоє)', answers: ['Both'], explain: 'Both of them.' },
              { type: 'reorder', words: ['all of my friends', 'came', 'to my birthday party'], answer: 'All of my friends came to my birthday party', uk: 'Усі мої друзі прийшли на мій день народження.' }
            ]
          }
        ]
      },
      /* ---------- SHORT RESPONSES ---------- */
      {
        id: 'short-responses', title: 'Короткі відповіді: So do I / Neither do I', emoji: '💬',
        desc: 'Я теж! Я теж ні! — So do I, Neither can I, I think so, I hope not і короткі відповіді Yes, I do.',
        cheat: {
          title: 'я теж · я теж ні · думаю, що так',
          head: ['Конструкція', 'Переклад і формула', 'Приклад'],
          rows: [
            [{ t: 'So + допоміжне + підмет', topic: 'so-neither' }, 'я теж (на ствердження)', '— I love jazz. — So do I.'],
            [{ t: 'Neither / Nor + допоміжне + підмет', topic: 'so-neither' }, 'я теж ні (на заперечення)', '— I can’t swim. — Neither can I.'],
            [{ t: 'I do / I don’t', topic: 'so-neither' }, 'незгода: а я — так / а я — ні', '— I like winter. — I don’t.'],
            [{ t: 'Me too / Me neither', topic: 'so-neither' }, 'розмовні скорочення', '— I’m tired. — Me too.'],
            [{ t: 'Yes, I do / No, I haven’t', topic: 'short-answers' }, 'коротка відповідь допоміжним', '— Have you seen it? — Yes, I have.'],
            [{ t: 'I think so / I hope not / I’m afraid not', topic: 'short-answers' }, 'думаю, так / сподіваюся, ні / на жаль, ні', '— Will it rain? — I hope not.']
          ]
        },
        topics: [
          {
            id: 'so-neither', title: 'So do I / Neither do I — «я теж»', emoji: '🤜', level: 'A2', minutes: 8,
            theory: {
              intro: 'Щоб сказати «я теж» чи «я теж ні», англійці не повторюють усе речення — лише So / Neither + допоміжне дієслово + підмет. І порядок слів тут перевернутий!',
              rules: [
                { t: 'So + допоміжне + підмет', d: 'Згода зі ствердженням. Допоміжне — те саме, що в реченні: am → <b>so am I</b>, can → <b>so can I</b>, have → <b>so have I</b>.', ex: [['— I’m hungry. — So am I.', '— Я голодний. — Я теж.'], ['— I can drive. — So can my sister.', '— Я вмію водити. — Моя сестра теж.']] },
                { t: 'Немає допоміжного → do / does / did', d: 'Present Simple → <b>so do I</b>; Past Simple → <b>so did I</b>.', ex: [['— I love pizza. — So do I.', '— Я люблю піцу. — Я теж.'], ['— We went to the beach. — So did we.', '— Ми ходили на пляж. — Ми теж.']] },
                { t: 'Neither / Nor + допоміжне + підмет', d: 'Згода із запереченням: «я теж ні». Допоміжне — стверджувальне: <b>neither can I</b>, не «neither can’t I».', ex: [['— I don’t like horror films. — Neither do I.', '— Я не люблю жахи. — Я теж.'], ['— I haven’t seen it. — Nor have I.', '— Я цього не бачив. — Я теж ні.']] },
                { t: 'Незгода: I do / I don’t', d: 'Якщо в тебе навпаки — підмет + допоміжне з протилежним знаком.', ex: [['— I love winter. — Oh, I don’t.', '— Я люблю зиму. — А я ні.'], ['— I can’t cook. — I can!', '— Я не вмію готувати. — А я вмію!']] },
                { t: 'Розмовно: Me too / Me neither', d: '<b>Me too</b> = So do I; <b>Me neither</b> = Neither do I. Неформально, але дуже часто.', ex: [['— I’m so tired. — Me too.', '— Я так утомився. — Я теж.']] }
              ],
              tip: '«Я теж» на заперечення — це НЕ «so do I» і не «me too», а Neither do I / Me neither. «— I don’t smoke. — Me too» ✗.'
            },
            exercises: [
              { type: 'choice', q: '— I’m really tired. — ___.', options: ['So am I', 'So do I', 'Neither am I', 'So I am'], answer: 0, explain: 'am → So am I.' },
              { type: 'choice', q: '— I love chocolate. — ___.', options: ['So do I', 'So am I', 'Neither do I', 'So I do'], answer: 0, explain: 'Present Simple → So do I.' },
              { type: 'choice', q: '— I can’t swim. — ___.', options: ['Neither can I', 'So can I', 'Neither can’t I', 'Me too'], answer: 0, explain: 'Заперечення + can → Neither can I.' },
              { type: 'choice', q: '— I didn’t go to the party. — ___.', options: ['Neither did I', 'So did I', 'Neither didn’t I', 'Neither went I'], answer: 0, explain: 'Past Simple, заперечення → Neither did I.' },
              { type: 'choice', q: '— I’ve been to Paris. — ___.', options: ['So have I', 'So did I', 'So am I', 'Neither have I'], answer: 0, explain: 'have → So have I.' },
              { type: 'choice', q: '— I don’t eat meat. — ___. (я теж — розмовно)', options: ['Me neither', 'Me too', 'So do I', 'Neither I'], answer: 0, explain: 'На заперечення → Me neither.' },
              { type: 'choice', q: '— I really like this song. — Oh, ___. I think it’s boring.', options: ['I don’t', 'I do', 'so do I', 'neither do I'], answer: 0, explain: 'Незгода → I don’t.' },
              { type: 'fill', q: '— My brother lives in Kyiv. — So ___ my sister.', answers: ['does'], explain: 'Present Simple, she → does.' },
              { type: 'fill', q: '— I won’t be at the meeting. — Neither ___ I.', answers: ['will'], explain: 'won’t → Neither will I.' },
              { type: 'reorder', words: ['neither', 'have', 'I'], answer: 'Neither have I', uk: '(— I haven’t finished yet.) — Я теж ще ні.' },
              { type: 'reorder', words: ['so', 'did', 'we'], answer: 'So did we', uk: '(— We watched the match.) — Ми теж.' }
            ]
          },
          {
            id: 'short-answers', title: 'Yes, I do / I think so / I hope not', emoji: '🙋', level: 'A2', minutes: 8,
            theory: {
              intro: 'Відповісти одним «Yes» — сухо, а повторювати все питання — задовго. Англійці кажуть коротко: Yes, I do. No, she hasn’t. А ще — I think so, I hope not.',
              rules: [
                { t: 'Yes / No + підмет + допоміжне', d: 'Беремо допоміжне з питання: Do you…? → <b>Yes, I do / No, I don’t</b>. Can she…? → <b>Yes, she can</b>.', ex: [['— Do you like coffee? — Yes, I do.', '— Ти любиш каву? — Так.'], ['— Has he finished? — No, he hasn’t.', '— Він закінчив? — Ні.']] },
                { t: 'Без смислового дієслова', d: 'НЕ «Yes, I like», а <b>Yes, I do</b>. У стверджувальній короткій відповіді — без скорочення: <b>Yes, I am</b> (не «Yes, I’m»).', ex: [['— Are you ready? — Yes, I am.', '— Ти готовий? — Так.']] },
                { t: 'I think so / I don’t think so', d: '<b>so</b> замінює ціле речення: «думаю, що так». Заперечення — зазвичай <b>I don’t think so</b>.', ex: [['— Is the shop open? — I think so.', '— Магазин відчинений? — Думаю, так.'], ['— Will he come? — I don’t think so.', '— Він прийде? — Навряд.']] },
                { t: 'I hope so / not, I’m afraid so / not', d: 'З <b>hope</b> і <b>be afraid</b> заперечення через <b>not</b>: <b>I hope not</b> (НЕ «I don’t hope so»), <b>I’m afraid not</b> — на жаль, ні.', ex: [['— Will it rain tomorrow? — I hope not.', '— Завтра буде дощ? — Сподіваюся, що ні.'], ['— Is there any cake left? — I’m afraid not.', '— Торт ще лишився? — На жаль, ні.']] }
              ],
              tip: '«I don’t hope so» ✗ → I hope not ✓. А «I don’t think so» ✓ — навпаки, звичайна форма.'
            },
            exercises: [
              { type: 'choice', q: '— Do you speak German? — Yes, I ___.', options: ['do', 'speak', 'am', 'does'], answer: 0, explain: 'Do you…? → Yes, I do.' },
              { type: 'choice', q: '— Is she your sister? — No, ___.', options: ['she isn’t', 'she doesn’t', 'she not', 'isn’t she'], answer: 0, explain: 'Is she…? → No, she isn’t.' },
              { type: 'choice', q: '— Have you ever been to Japan? — ___.', options: ['No, I haven’t', 'No, I didn’t', 'No, I don’t', 'No, I haven’t been'], answer: 0, explain: 'Have you…? → No, I haven’t.' },
              { type: 'choice', q: '— Are you ready? — Yes, ___.', options: ['I am', 'I’m', 'I do', 'I ready'], answer: 0, explain: 'У стверджувальній короткій відповіді — без скорочення.' },
              { type: 'choice', q: '— Will the train be late? — I hope ___.', options: ['not', 'no', 'don’t', 'so not'], answer: 0, explain: 'hope → I hope not.' },
              { type: 'choice', q: '— Is the museum open on Mondays? — I don’t think ___.', options: ['so', 'it', 'that', 'yes'], answer: 0, explain: 'I don’t think so.' },
              { type: 'choice', q: '— Can I pay by card? — I’m afraid ___.', options: ['not', 'no', 'don’t', 'isn’t'], answer: 0, explain: 'На жаль, ні → I’m afraid not.' },
              { type: 'fill', q: '— Can your brother cook? — Yes, he ___.', answers: ['can'], explain: 'Can…? → Yes, he can.' },
              { type: 'fill', q: '— Did they win the match? — No, they ___.', answers: ['didn’t', 'did not'], explain: 'Did…? → No, they didn’t.' },
              { type: 'fill', q: '— Is it going to be sunny tomorrow? — I hope ___!', answers: ['so'], explain: 'Сподіваюся, що так → I hope so.' }
            ]
          }
        ]
      },
      /* ---------- PREFERENCES ---------- */
      {
        id: 'preferences', title: 'would rather / had better / prefer', emoji: '🍽️',
        desc: 'Краще б…, варто…, віддаю перевагу — would rather, had better, prefer і would prefer: форми після них і типові пастки.',
        cheat: {
          title: 'краще б · варто · віддаю перевагу',
          head: ['Конструкція', 'Переклад і формула', 'Приклад'],
          rows: [
            [{ t: 'had better (’d better) + V', topic: 'rather-better' }, 'краще б, варто (а то буде погано) · БЕЗ to', 'You’d better hurry.'],
            [{ t: '’d better not + V', topic: 'rather-better' }, 'краще не', 'You’d better not be late.'],
            [{ t: 'would rather (’d rather) + V (than + V)', topic: 'rather-better' }, 'я б краще… (ніж) · БЕЗ to', 'I’d rather stay home than go out.'],
            [{ t: 'would rather + хтось + Past Simple', topic: 'rather-better' }, 'краще б ти… / я б волів, щоб…', 'I’d rather you didn’t smoke.'],
            [{ t: 'prefer A to B', topic: 'prefer' }, 'віддаю перевагу загалом · іменник або -ing', 'I prefer tea to coffee.'],
            [{ t: 'would prefer + to V / хтось + to V', topic: 'prefer' }, 'хотів би (конкретний раз)', 'I’d prefer to walk. · I’d prefer you to call.']
          ]
        },
        topics: [
          {
            id: 'rather-better', title: 'had better / would rather', emoji: '🎛️', level: 'B1', minutes: 9,
            theory: {
              intro: 'Обидва скорочуються до ’d і обидва без to — через це їх постійно плутають. Але had better — порада-попередження, а would rather — особиста перевага.',
              rules: [
                { t: 'had better (’d better) + V', d: '«Краще, варто» — порада з наслідком: інакше буде проблема. Форма <b>had</b>, але мова про теперішнє чи майбутнє. Без to!', ex: [['You’d better take an umbrella. It’s going to rain.', 'Краще візьми парасольку — буде дощ.'], ['We’d better leave now, or we’ll miss the train.', 'Нам краще вийти зараз, а то пропустимо потяг.']] },
                { t: '’d better not', d: 'Заперечення — <b>’d better not + V</b> (НЕ «hadn’t better»).', ex: [['You’d better not tell anyone.', 'Краще нікому не кажи.']] },
                { t: 'would rather (’d rather) + V', d: '«Я б краще…». Без to. Порівняння — <b>than</b> + V. Заперечення — <b>’d rather not</b>.', ex: [['I’d rather stay at home tonight.', 'Я б краще залишився сьогодні вдома.'], ['I’d rather walk than take the bus.', 'Я б краще пройшовся, ніж їхати автобусом.']] },
                { t: 'would rather + хтось + Past Simple', d: 'Коли хочемо, щоб ІНШИЙ щось зробив: після підмета — Past Simple, хоча мова про тепер.', ex: [['I’d rather you didn’t smoke here.', 'Я б волів, щоб ти тут не курив.'], ['I’d rather you came tomorrow.', 'Краще б ти прийшов завтра.']] }
              ],
              tip: 'Розшифруй ’d: ’d better → had, ’d rather → would. Обидва — БЕЗ to: You’d better to go ✗, I’d rather to stay ✗.'
            },
            exercises: [
              { type: 'choice', q: 'It’s late. You ___ go home.', options: ['had better', 'would better', 'had better to', 'better had'], answer: 0, explain: 'Порада-попередження → had better + V.' },
              { type: 'choice', q: 'I ___ stay at home than go to the party.', options: ['would rather', 'had better', 'prefer', 'would prefer'], answer: 0, explain: 'Я б краще…, ніж → would rather … than.' },
              { type: 'choice', q: 'You’d better ___ late for the exam.', options: ['not be', 'not to be', 'don’t be', 'be not'], answer: 0, explain: '’d better not + V.' },
              { type: 'choice', q: 'I’d rather ___ by train.', options: ['travel', 'to travel', 'travelling', 'travelled'], answer: 0, explain: 'would rather + V без to.' },
              { type: 'choice', q: 'I’d rather you ___ my phone without asking.', options: ['didn’t use', 'don’t use', 'not use', 'wouldn’t use'], answer: 0, explain: 'would rather + хтось + Past Simple.' },
              { type: 'choice', q: '— Do you want to come with us? — Thanks, but I’d rather ___.', options: ['not', 'don’t', 'not to', 'no'], answer: 0, explain: 'I’d rather not — я б краще ні.' },
              { type: 'fill', q: 'We’d ___ hurry, or we’ll miss the bus.', answers: ['better'], explain: '’d better — краще (а то…).' },
              { type: 'fill', q: 'I’d ___ watch a comedy than a horror film.', answers: ['rather'], explain: '’d rather … than.' },
              { type: 'fill', q: 'You ___ better see a doctor about that cough.', answers: ['had'], explain: 'had better + V.' },
              { type: 'reorder', words: ['I’d rather', 'walk', 'than take a taxi'], answer: 'I’d rather walk than take a taxi', uk: 'Я б краще пройшовся пішки, ніж брати таксі.' }
            ]
          },
          {
            id: 'prefer', title: 'prefer / would prefer', emoji: '⭐', level: 'B1', minutes: 8,
            theory: {
              intro: 'prefer — «віддаю перевагу» загалом, а would prefer — «хотів би» в конкретній ситуації. І в кожного свої слова для порівняння: to, than, rather than.',
              rules: [
                { t: 'prefer A to B', d: 'Загальна перевага — з іменниками або -ing. Порівнюємо саме через <b>to</b>, не than!', ex: [['I prefer tea to coffee.', 'Я більше люблю чай, ніж каву.'], ['She prefers walking to driving.', 'Вона більше любить ходити пішки, ніж їздити.']] },
                { t: 'prefer + to V … rather than V', d: 'З інфінітивом теж можна; тоді порівняння — <b>rather than</b> + V.', ex: [['I prefer to cook at home rather than eat out.', 'Я волію готувати вдома, а не їсти в ресторанах.']] },
                { t: 'would prefer — конкретний раз', d: '<b>would prefer + to V</b> або + іменник. Ввічлива відповідь на пропозицію.', ex: [['— Coffee? — I’d prefer tea, please.', '— Кави? — Я б краще чаю, будь ласка.'], ['I’d prefer to stay in tonight.', 'Сьогодні я б краще залишився вдома.']] },
                { t: 'would prefer + хтось + to V', d: 'Коли хочемо, щоб інший щось зробив: <b>I’d prefer you to…</b> (порівняй: I’d rather you + Past).', ex: [['I’d prefer you to call me first.', 'Я б волів, щоб ти спершу подзвонив.']] }
              ],
              tip: 'prefer A TO B, а would rather A THAN B. «I prefer tea than coffee» ✗ → I prefer tea to coffee ✓.'
            },
            exercises: [
              { type: 'choice', q: 'I prefer football ___ basketball.', options: ['to', 'than', 'from', 'over than'], answer: 0, explain: 'prefer A to B.' },
              { type: 'choice', q: 'She prefers ___ to driving.', options: ['cycling', 'to cycle', 'cycle', 'cycled'], answer: 0, explain: 'prefer + -ing to + -ing.' },
              { type: 'choice', q: '— Shall we take a taxi? — I’d prefer ___.', options: ['to walk', 'walking', 'walk', 'walked'], answer: 0, explain: 'would prefer + to V.' },
              { type: 'choice', q: 'I’d prefer you ___ me before you come.', options: ['to call', 'called', 'call', 'calling'], answer: 0, explain: 'would prefer + хтось + to V.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['I prefer tea to coffee.', 'I prefer tea than coffee.', 'I’d rather tea to coffee.', 'I prefer more tea than coffee.'], answer: 0, explain: 'prefer … to …' },
              { type: 'fill', q: 'I prefer to read at home rather ___ go to the cinema.', answers: ['than'], explain: 'prefer to V rather than V.' },
              { type: 'fill', q: 'Would you ___ an aisle seat or a window seat? (віддати перевагу)', answers: ['prefer', 'like'], explain: 'Would you prefer…? — ввічливе питання.' },
              { type: 'fill', q: 'He prefers cats ___ dogs.', answers: ['to'], explain: 'prefer A to B.' },
              { type: 'reorder', words: ['I’d prefer', 'to stay in', 'tonight'], answer: 'I’d prefer to stay in tonight', uk: 'Сьогодні я б краще залишився вдома.' }
            ]
          }
        ]
      },
      /* ---------- WORD ORDER ---------- */
      {
        id: 'word-order', title: 'Порядок слів: прислівники і прикметники', emoji: '🧱',
        desc: 'Де стоять often, always, already і yet; як скласти «a lovely old wooden table»; куди ставити місце й час.',
        cheat: {
          title: 'хто → що робить → що → де → коли',
          head: ['Правило', 'Формула', 'Приклад'],
          rows: [
            [{ t: 'базовий порядок', topic: 'order-basic' }, 'Підмет + Дієслово + Додаток + Місце + Час', 'I met Tom at the café yesterday.'],
            [{ t: 'дієслово + додаток разом', topic: 'order-basic' }, 'нічого між ними не вставляємо', 'I like coffee very much.'],
            [{ t: 'always / often / never', topic: 'order-adverbs' }, 'ПЕРЕД основним дієсловом, ПІСЛЯ to be і допоміжного', 'I often go. · She is always late.'],
            [{ t: 'already / just / still · yet', topic: 'order-adverbs' }, 'у середині речення · yet — у кінці', 'I have already finished. · Not yet.'],
            [{ t: 'well / carefully / quickly', topic: 'order-adverbs' }, 'після дієслова й додатка', 'He drives his car carefully.'],
            [{ t: 'порядок прикметників', topic: 'order-adjectives' }, 'думка · розмір · вік · форма · колір · походження · матеріал · призначення', 'a lovely big old wooden table']
          ]
        },
        topics: [
          {
            id: 'order-basic', title: 'Базовий порядок: S + V + O + місце + час', emoji: '🚂', level: 'A2', minutes: 8,
            theory: {
              intro: 'Українською можна сказати «Каву я люблю дуже» — і все зрозуміло. Англійська порядок слів майже не прощає: від нього залежить, хто що робить.',
              rules: [
                { t: 'S + V + O', d: 'Підмет → дієслово → додаток. Поміняєш — зміниться зміст: <b>The dog bit the man ≠ The man bit the dog</b>.', ex: [['My brother plays the guitar.', 'Мій брат грає на гітарі.']] },
                { t: 'Не розривай дієслово й додаток', d: 'Між дієсловом і прямим додатком нічого не вставляємо.', ex: [['I like coffee very much. (не «like very much coffee»)', 'Я дуже люблю каву.'], ['She speaks English well. (не «speaks well English»)', 'Вона добре говорить англійською.']] },
                { t: 'Місце → час', d: 'Спершу ДЕ, потім КОЛИ — у кінці речення. Час можна винести й на початок.', ex: [['We go to the gym every morning.', 'Ми щоранку ходимо в спортзал.'], ['Yesterday I stayed at home.', 'Учора я залишався вдома.']] },
                { t: 'Два додатки', d: '<b>give / send / show + кому + що</b>, або <b>що + to + кому</b>.', ex: [['I sent my mum a postcard. = I sent a postcard to my mum.', 'Я надіслав мамі листівку.']] },
                { t: 'Підмет обов’язковий', d: 'Навіть коли в українській його немає: <b>It’s cold. It’s raining. It’s late.</b>', ex: [['It’s five o’clock.', 'Зараз п’ята.']] }
              ],
              tip: 'Формула-«потяг»: Хто → Що робить → Що/Кого → Де → Коли. Вагони міняти не можна.'
            },
            exercises: [
              { type: 'choice', q: 'Обери правильне речення:', options: ['I like coffee very much.', 'I like very much coffee.', 'I like very coffee much.', 'Very much I like coffee.'], answer: 0, explain: 'Дієслово + додаток разом, very much — після.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['She speaks English very well.', 'She speaks very well English.', 'She very well speaks English.', 'She speaks English very good.'], answer: 0, explain: 'Дієслово + додаток разом, прислівник після.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['I go to the gym every morning.', 'I every morning go to the gym.', 'I go every morning the gym to.', 'Every morning to the gym I go.'], answer: 0, explain: 'Спершу місце, потім час.' },
              { type: 'choice', q: '— What time is it? — ___ seven o’clock.', options: ['It’s', 'Is', 'This is', 'There is'], answer: 0, explain: 'Підмет it обов’язковий.' },
              { type: 'choice', q: 'I gave ___.', options: ['my sister a present', 'to my sister a present', 'a present my sister', 'my sister to a present'], answer: 0, explain: 'give + кому + що.' },
              { type: 'fill', q: 'I sent the documents ___ my manager.', answers: ['to'], explain: 'що + to + кому.' },
              { type: 'fill', q: '___ is raining again.', answers: ['It'], explain: 'Формальний підмет it.' },
              { type: 'reorder', words: ['I', 'bought', 'a new laptop', 'last week'], answer: 'I bought a new laptop last week', uk: 'Минулого тижня я купив новий ноутбук.' },
              { type: 'reorder', words: ['she', 'reads', 'books', 'in bed', 'every evening'], answer: 'She reads books in bed every evening', uk: 'Щовечора вона читає книжки в ліжку.' }
            ]
          },
          {
            id: 'order-adverbs', title: 'Де стоять always, often, already, still, yet', emoji: '📌', level: 'B1', minutes: 9,
            theory: {
              intro: 'Прислівники частоти й «часові» слова мають свої місця. Українське «Я завжди п’ю каву» підказує правильно, але з to be і допоміжними дієсловами є нюанс.',
              rules: [
                { t: 'Частота: always, usually, often, sometimes, rarely, never', d: 'ПЕРЕД основним дієсловом, але ПІСЛЯ <b>to be</b>.', ex: [['I often drink tea in the evening.', 'Я часто п’ю чай увечері.'], ['She is always late.', 'Вона завжди запізнюється.']] },
                { t: 'З допоміжними і модальними', d: 'Між допоміжним / модальним і основним дієсловом.', ex: [['I have never been to Spain.', 'Я ніколи не був в Іспанії.'], ['You can always call me.', 'Ти завжди можеш мені подзвонити.']] },
                { t: 'sometimes, usually — гнучкі', d: 'Можуть стояти й на початку: <b>Sometimes I work from home.</b> А <b>always</b> і <b>never</b> — ні.', ex: [['Usually we have dinner at 7.', 'Зазвичай ми вечеряємо о 7-й.']] },
                { t: 'already, just, still — у середині; yet — у кінці', d: '<b>already / just / still</b> — перед основним дієсловом (після to be і допоміжного). <b>yet</b> — у кінці питань і заперечень.', ex: [['I have already finished.', 'Я вже закінчив.'], ['Have you finished yet? — No, I’m still working.', 'Ти вже закінчив? — Ні, я ще працюю.']] },
                { t: 'Спосіб: well, carefully, quickly', d: 'Зазвичай у кінці — після дієслова й додатка.', ex: [['He drives his car carefully.', 'Він обережно водить машину.']] }
              ],
              tip: 'Правило «be — перед, решта — після»: прислівник частоти стоїть ПІСЛЯ am / is / are, але ПЕРЕД go, like, work.'
            },
            exercises: [
              { type: 'choice', q: 'Обери правильне речення:', options: ['She is always late.', 'She always is late.', 'Always she is late.', 'She is late always.'], answer: 0, explain: 'Після to be → is always.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['I usually get up at 7.', 'I get usually up at 7.', 'I get up at usually 7.', 'Usually get I up at 7.'], answer: 0, explain: 'Перед основним дієсловом → usually get up.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['I have never been to Australia.', 'I have been to Australia never.', 'I have been never to Australia.', 'Never I have been to Australia.'], answer: 0, explain: 'Між have і V3 → have never been.' },
              { type: 'choice', q: 'Have you finished your homework ___?', options: ['yet', 'already', 'still', 'just'], answer: 0, explain: 'Питання «вже?» → yet у кінці.' },
              { type: 'choice', q: 'It’s 11 pm and he is ___ working.', options: ['still', 'yet', 'already', 'ever'], answer: 0, explain: 'Досі → still.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['He drives his car carefully.', 'He drives carefully his car.', 'He carefully his car drives.', 'Carefully he his car drives.'], answer: 0, explain: 'Спосіб → після додатка.' },
              { type: 'fill', q: 'I have ___ finished the report. (щойно)', answers: ['just'], explain: 'just — між have і V3.' },
              { type: 'fill', q: 'We don’t know the results ___. (ще)', answers: ['yet'], explain: 'Заперечення + yet у кінці.' },
              { type: 'reorder', words: ['we', 'often', 'go', 'to the cinema'], answer: 'We often go to the cinema', uk: 'Ми часто ходимо в кіно.' },
              { type: 'reorder', words: ['you', 'can', 'always', 'call me'], answer: 'You can always call me', uk: 'Ти завжди можеш мені подзвонити.' }
            ]
          },
          {
            id: 'order-adjectives', title: 'Порядок прикметників: a lovely old wooden table', emoji: '🪑', level: 'B1', minutes: 8,
            theory: {
              intro: 'Коли перед іменником кілька прикметників, англійці ставлять їх у певному порядку — інтуїтивно для носіїв і зовсім неінтуїтивно для нас. Допоможе формула OSASCOMP.',
              rules: [
                { t: 'OSASCOMP', d: '<b>O</b>pinion (думка) → <b>S</b>ize (розмір) → <b>A</b>ge (вік) → <b>S</b>hape (форма) → <b>C</b>olour (колір) → <b>O</b>rigin (походження) → <b>M</b>aterial (матеріал) → <b>P</b>urpose (призначення) + іменник.', ex: [['a beautiful big old house', 'гарний великий старий будинок'], ['a small round black leather bag', 'маленька кругла чорна шкіряна сумка']] },
                { t: 'Думка — завжди першою', d: 'Суб’єктивні оцінки (nice, lovely, ugly, boring) — перед об’єктивними фактами.', ex: [['a lovely little Italian restaurant', 'чудовий маленький італійський ресторанчик']] },
                { t: 'Призначення — впритул до іменника', d: 'Часто це іменник або -ing: <b>running shoes, a sleeping bag, a coffee table</b>.', ex: [['new red running shoes', 'нові червоні кросівки для бігу']] },
                { t: 'Коми та and', d: 'Між прикметниками різних груп — без ком і без and. and — між кольорами або після дієслова: <b>The house is big and old.</b>', ex: [['a black and white photo', 'чорно-біле фото']] }
              ],
              tip: 'На практиці рідко буває більше 2–3 прикметників. Найчастіше: думка + розмір/вік + колір/матеріал: a nice old wooden chair.'
            },
            exercises: [
              { type: 'choice', q: 'She lives in a ___ house.', options: ['beautiful old', 'old beautiful', 'beautifully old', 'old and beautiful old'], answer: 0, explain: 'Думка перед віком.' },
              { type: 'choice', q: 'He bought a ___ car.', options: ['new red Japanese', 'red new Japanese', 'Japanese red new', 'new Japanese red'], answer: 0, explain: 'Вік → колір → походження.' },
              { type: 'choice', q: 'I need a ___ bag.', options: ['small black leather', 'leather black small', 'black small leather', 'small leather black'], answer: 0, explain: 'Розмір → колір → матеріал.' },
              { type: 'choice', q: 'They have a ___ dog.', options: ['lovely little', 'little lovely', 'lovely and little', 'little and lovely'], answer: 0, explain: 'Думка перед розміром.' },
              { type: 'choice', q: 'She wore a ___ dress.', options: ['long blue silk', 'silk blue long', 'blue long silk', 'long silk blue'], answer: 0, explain: 'Розмір → колір → матеріал.' },
              { type: 'choice', q: 'I want to buy some ___ shoes.', options: ['comfortable new running', 'running new comfortable', 'new running comfortable', 'comfortable running new'], answer: 0, explain: 'Думка → вік → призначення.' },
              { type: 'reorder', words: ['a', 'nice', 'old', 'wooden', 'table'], answer: 'a nice old wooden table', uk: 'гарний старий дерев’яний стіл' },
              { type: 'reorder', words: ['a', 'big', 'round', 'glass', 'bowl'], answer: 'a big round glass bowl', uk: 'велика кругла скляна миска' }
            ]
          }
        ]
      },
      /* ---------- STATIVE VERBS ---------- */
      {
        id: 'stative', title: 'Дієслова стану: know, like, want', emoji: '🧠',
        desc: 'Чому не можна сказати «I am knowing» і коли think, have, see, taste усе ж бувають у Continuous — із різним змістом.',
        cheat: {
          title: 'стан — без Continuous',
          head: ['Група', 'Дієслова', 'Приклад'],
          rows: [
            [{ t: 'думки', topic: 'stative-verbs' }, 'know · believe · understand · remember · mean · realise · suppose', 'I know him. (не am knowing)'],
            [{ t: 'почуття і бажання', topic: 'stative-verbs' }, 'like · love · hate · want · need · prefer · wish', 'She wants a coffee.'],
            [{ t: 'чуття і враження', topic: 'stative-verbs' }, 'see · hear · smell · taste · sound · seem · look like', 'That sounds great.'],
            [{ t: 'володіння', topic: 'stative-verbs' }, 'have (= мати) · own · belong', 'This car belongs to me.'],
            [{ t: 'характеристики', topic: 'stative-verbs' }, 'cost · weigh · contain · consist of · depend · matter', 'It depends on the weather.'],
            [{ t: 'think · have · see · taste · be', topic: 'stative-dynamic' }, 'і стан, і дія — зміст різний', 'I think so ≠ I’m thinking about it.']
          ]
        },
        topics: [
          {
            id: 'stative-verbs', title: 'Дієслова стану: чому не «I am knowing»', emoji: '🧠', level: 'B1', minutes: 8,
            theory: {
              intro: 'Деякі дієслова описують не дію, а СТАН: знати, любити, хотіти, мати. Стан не «триває в процесі» — тому в Continuous ці дієслова зазвичай не вживаються, навіть коли йдеться про «зараз».',
              rules: [
                { t: 'Думки й розуміння', d: '<b>know, believe, understand, remember, forget, mean, realise, suppose, recognise</b>.', ex: [['I don’t understand this word.', 'Я не розумію цього слова.'], ['Do you remember her name?', 'Ти пам’ятаєш, як її звати?']] },
                { t: 'Почуття і бажання', d: '<b>like, love, hate, want, need, prefer, wish, mind</b>.', ex: [['I want a cup of tea right now.', 'Я хочу чашку чаю просто зараз.'], ['She needs help at the moment.', 'Їй зараз потрібна допомога.']] },
                { t: 'Чуття і враження', d: '<b>see, hear, smell, taste, sound, seem, appear, look like</b>.', ex: [['This soup tastes delicious.', 'Цей суп дуже смачний.'], ['That sounds like a great idea!', 'Звучить як чудова ідея!']] },
                { t: 'Володіння і характеристики', d: '<b>have (= мати), own, belong, cost, weigh, contain, consist of, depend, matter</b>.', ex: [['This bag belongs to Anna.', 'Ця сумка належить Анні.'], ['It depends on the weather.', 'Це залежить від погоди.']] },
                { t: 'Навіть із now — Simple', d: 'Слова now, at the moment не скасовують правило для дієслів стану.', ex: [['I know the answer now.', 'Тепер я знаю відповідь.']] }
              ],
              tip: 'Виняток-легенда «I’m lovin’ it» — рекламна гра слів, а не граматика. У тестах: I love it ✓.'
            },
            exercises: [
              { type: 'choice', q: 'I ___ what you mean.', options: ['understand', 'am understanding', 'understanding', 'am understand'], answer: 0, explain: 'understand — стан → Simple.' },
              { type: 'choice', q: 'Look! She ___ a new dress today.', options: ['is wearing', 'wears', 'wear', 'is wear'], answer: 0, explain: 'wear — дія, не стан → Continuous можна.' },
              { type: 'choice', q: 'This coffee ___ strange.', options: ['tastes', 'is tasting', 'taste', 'tasting'], answer: 0, explain: 'taste (= мати смак) — стан.' },
              { type: 'choice', q: 'Right now I ___ a glass of water.', options: ['want', 'am wanting', 'wanting', 'am want'], answer: 0, explain: 'want — стан, навіть з right now.' },
              { type: 'choice', q: 'Who does this umbrella ___ to?', options: ['belong', 'belonging', 'belongs', 'is belonging'], answer: 0, explain: 'belong — стан; після does → V.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['I know him very well.', 'I am knowing him very well.', 'I knowing him very well.', 'I am know him very well.'], answer: 0, explain: 'know — лише Simple.' },
              { type: 'choice', q: 'The price ___ on the season.', options: ['depends', 'is depending', 'depend', 'depending'], answer: 0, explain: 'depend — стан.' },
              { type: 'fill', q: 'Sorry, I ___ your name. (не пам’ятаю)', answers: ['don’t remember', 'do not remember', 'can’t remember'], explain: 'remember — стан → Simple.' },
              { type: 'fill', q: 'This phone ___ 500 dollars.', hint: 'to cost', answers: ['costs'], explain: 'cost — стан.' },
              { type: 'reorder', words: ['this book', 'belongs', 'to my brother'], answer: 'This book belongs to my brother', uk: 'Ця книжка належить моєму братові.' }
            ]
          },
          {
            id: 'stative-dynamic', title: 'think, have, see, taste: стан чи дія?', emoji: '🎭', level: 'B2', minutes: 9,
            theory: {
              intro: 'Хитрість у тому, що кілька дієслів мають ДВА значення. Одне — стан (без Continuous), друге — активна дія (Continuous можна). Від вибору форми змінюється зміст.',
              rules: [
                { t: 'think', d: '<b>I think</b> — я вважаю (думка). <b>I’m thinking</b> — обмірковую, розмірковую.', ex: [['I think it’s a good idea.', 'Я вважаю, що це гарна ідея.'], ['I’m thinking about changing jobs.', 'Я думаю про те, щоб змінити роботу.']] },
                { t: 'have', d: '<b>have</b> = мати (стан). Але <b>have breakfast / a shower / a party / fun</b> — дії, Continuous можна.', ex: [['She has two children.', 'У неї двоє дітей.'], ['She’s having a shower right now.', 'Вона зараз у душі.']] },
                { t: 'see', d: '<b>see</b> — бачити, розуміти. <b>be seeing</b> — зустрічатися з кимось, мати зустріч.', ex: [['I see what you mean.', 'Я розумію, що ти маєш на увазі.'], ['I’m seeing the doctor tomorrow.', 'Завтра в мене прийом у лікаря.']] },
                { t: 'taste / smell / look', d: 'Стан — «має смак / пахне / виглядає». Дія — пробувати, нюхати, дивитися.', ex: [['The soup tastes great.', 'Суп смачний.'], ['He’s tasting the soup to check the salt.', 'Він пробує суп, щоб перевірити сіль.']] },
                { t: 'be', d: '<b>He is rude</b> — він грубий за характером. <b>He is being rude</b> — зараз поводиться грубо (тимчасово).', ex: [['He’s being very silly today.', 'Він сьогодні поводиться дуже безглуздо.']] }
              ],
              tip: 'Тест: чи можна «почати й закінчити» це в моменті? Обмірковувати, приймати душ, пробувати — так → Continuous. Вважати, мати, мати смак — ні → Simple.'
            },
            exercises: [
              { type: 'choice', q: 'I ___ you’re right.', options: ['think', 'am thinking', 'thinking', 'am think'], answer: 0, explain: 'Думка (вважаю) → think.' },
              { type: 'choice', q: 'Be quiet, please. I ___ about the problem.', options: ['am thinking', 'think', 'thinks', 'am think'], answer: 0, explain: 'Процес обмірковування → am thinking.' },
              { type: 'choice', q: 'They ___ a big house near the sea.', options: ['have', 'are having', 'having', 'are have'], answer: 0, explain: 'Мати (володіти) → have.' },
              { type: 'choice', q: 'Can I call you back? We ___ dinner.', options: ['are having', 'have', 'has', 'having'], answer: 0, explain: 'have dinner — дія → Continuous.' },
              { type: 'choice', q: 'I ___ Tom tonight. We’re going to the cinema.', options: ['am seeing', 'see', 'seeing', 'am see'], answer: 0, explain: 'Домовлена зустріч → am seeing.' },
              { type: 'choice', q: 'Mmm, this cake ___ wonderful!', options: ['smells', 'is smelling', 'smell', 'smelling'], answer: 0, explain: 'Пахне (стан) → smells.' },
              { type: 'choice', q: 'You ___ very rude today! What’s wrong?', options: ['are being', 'being', 'is being', 'be'], answer: 0, explain: 'Тимчасова поведінка → are being.' },
              { type: 'fill', q: 'Why ___ you smelling the milk? Is it bad?', answers: ['are'], explain: 'Нюхати (дія) → Continuous.' },
              { type: 'fill', q: 'Oh, I ___ what you mean now. (розумію)', answers: ['see'], explain: 'see = розуміти → Simple.' },
              { type: 'reorder', words: ['I’m thinking', 'of buying', 'a new car'], answer: 'I’m thinking of buying a new car', uk: 'Я думаю купити нову машину.' }
            ]
          }
        ]
      },
      /* ---------- ADVANCED C1 ---------- */
      {
        id: 'advanced', title: 'Просунута граматика C1: інверсія, емфаза, звороти', emoji: '🎓',
        desc: 'Never have I seen…, What I need is…, Having finished the work… — структури, які роблять мову виразною та «дорослою».',
        cheat: {
          tables: [
            {
              title: '🔄 Інверсія — «питальний» порядок у ствердженні',
              head: ['Початок', 'Формула', 'Приклад'],
              rows: [
                [{ t: 'Never / Rarely / Seldom', topic: 'inversion' }, '+ допоміжне + підмет + V', 'Never have I seen such a mess.'],
                [{ t: 'Not only … but also', topic: 'inversion' }, 'Not only + допоміжне + підмет …', 'Not only did he lie, but he also stole.'],
                [{ t: 'Hardly … when · No sooner … than', topic: 'inversion' }, 'щойно…, як · + Past Perfect', 'Hardly had I arrived when it rained.'],
                [{ t: 'Only then / Only when / Not until', topic: 'inversion' }, 'інверсія в ГОЛОВНІЙ частині', 'Only then did I understand.'],
                [{ t: 'Little did I know', topic: 'inversion' }, 'я й гадки не мав', 'Little did she know the truth.'],
                [{ t: 'Should / Were / Had (замість if)', topic: 'inversion' }, 'умова без if', 'Should you need help, call me.']
              ]
            },
            {
              title: '🔦 Емфаза — «саме»',
              head: ['Конструкція', 'Переклад', 'Приклад'],
              rows: [
                [{ t: 'It is / was … who / that', topic: 'cleft' }, 'саме … (виділяємо частину)', 'It was Tom who broke it.'],
                [{ t: 'What + S + V + is / was', topic: 'cleft' }, 'що мені потрібно, так це…', 'What I need is a holiday.'],
                [{ t: 'What … did was + V', topic: 'cleft' }, 'що ми зробили — це…', 'What we did was call the police.'],
                [{ t: 'All / The reason … is', topic: 'cleft' }, 'усе, чого… / причина в тому, що…', 'All I want is some sleep.'],
                [{ t: 'do / does / did + V', topic: 'cleft' }, 'таки, справді', 'I did lock the door!']
              ]
            },
            {
              title: '✂️ Дієприкметникові звороти',
              head: ['Форма', 'Значення', 'Приклад'],
              rows: [
                [{ t: 'V-ing', topic: 'participle' }, 'одночасна дія або причина (активно)', 'Walking home, I met Anna.'],
                [{ t: 'Having + V3', topic: 'participle' }, 'дія, що сталася раніше', 'Having finished, she went home.'],
                [{ t: 'V3', topic: 'participle' }, 'пасивне значення', 'Built in 1900, the house…'],
                [{ t: 'Not + V-ing', topic: 'participle' }, 'заперечення', 'Not knowing the way, we got lost.'],
                [{ t: 'той самий підмет!', topic: 'participle' }, 'інакше виходить «висячий» зворот', 'Walking home, the rain started ✗']
              ]
            }
          ]
        },
        topics: [
          {
            id: 'inversion', title: 'Інверсія: Never have I…, Hardly had I…', emoji: '🔄', level: 'C1', minutes: 11,
            theory: {
              intro: 'Інверсія — це «питальний» порядок слів у стверджувальному реченні. Вона вмикається після заперечних і обмежувальних слів на початку і додає драматизму: так пишуть у книжках, промовах і на іспитах рівня C1.',
              rules: [
                { t: 'Заперечні прислівники на початку', d: '<b>Never, Rarely, Seldom, At no time, Under no circumstances</b> + допоміжне + підмет + V.', ex: [['Never have I seen such a beautiful sunset.', 'Ніколи я не бачив такого гарного заходу сонця.'], ['Under no circumstances should you open this door.', 'Ні за яких обставин не відчиняй цих дверей.']] },
                { t: 'Not only … but also', d: 'Інверсія лише в першій частині. Present / Past Simple → <b>do / does / did</b>.', ex: [['Not only did she win, but she also broke the record.', 'Вона не лише перемогла, а й побила рекорд.']] },
                { t: 'Hardly … when; No sooner … than', d: '«Щойно…, як» про минуле — з Past Perfect. Hardly → <b>when</b>, No sooner → <b>than</b>.', ex: [['Hardly had I got home when the phone rang.', 'Щойно я прийшов додому, як задзвонив телефон.'], ['No sooner had we left than it started to rain.', 'Щойно ми вийшли, як почався дощ.']] },
                { t: 'Only when / Not until / Little', d: '<b>Only then, Only when…, Not until…</b> — інверсія в ГОЛОВНІЙ частині. <b>Little did I know</b> — «я й гадки не мав».', ex: [['Only when I left home did I realise how much I loved it.', 'Лише поїхавши з дому, я зрозумів, як його любив.'], ['Little did she know what was waiting for her.', 'Вона й гадки не мала, що на неї чекає.']] },
                { t: 'Умова без if: Should / Were / Had', d: '<b>Should you need</b> = If you need; <b>Were I you</b> = If I were you; <b>Had I known</b> = If I had known.', ex: [['Should you have any questions, please contact us.', 'Якщо матимете запитання, звертайтеся.'], ['Had I known about it, I would have helped.', 'Якби я знав, я б допоміг.']] }
              ],
              tip: 'Порядок — як у питанні, але з крапкою в кінці: Never HAVE I seen… Rarely DOES he call… Немає допоміжного? Додай do / does / did.'
            },
            exercises: [
              { type: 'choice', q: 'Never ___ such a delicious meal.', options: ['have I eaten', 'I have eaten', 'I ate', 'did I ate'], answer: 0, explain: 'Never + have + I + V3.' },
              { type: 'choice', q: 'Rarely ___ to the cinema these days.', options: ['do we go', 'we go', 'we do go', 'go we'], answer: 0, explain: 'Present Simple → do + we + go.' },
              { type: 'choice', q: 'Not only ___ late, but he also forgot the tickets.', options: ['did he arrive', 'he arrived', 'arrived he', 'he did arrive'], answer: 0, explain: 'Past Simple → did + he + arrive.' },
              { type: 'choice', q: 'Hardly had I sat down ___ the phone rang.', options: ['when', 'than', 'that', 'then'], answer: 0, explain: 'Hardly … when.' },
              { type: 'choice', q: 'No sooner had we arrived ___ it started to snow.', options: ['than', 'when', 'then', 'that'], answer: 0, explain: 'No sooner … than.' },
              { type: 'choice', q: '___ you need any help, just call me.', options: ['Should', 'Would', 'Did', 'Were'], answer: 0, explain: 'Should you… = If you…' },
              { type: 'choice', q: 'Only when I read the letter ___ what had happened.', options: ['did I understand', 'I understood', 'I did understand', 'understood I'], answer: 0, explain: 'Only when… → інверсія в головній частині.' },
              { type: 'fill', q: '___ I known you were ill, I would have visited you. (якби)', answers: ['Had'], explain: 'Had I known = If I had known.' },
              { type: 'fill', q: 'Little ___ he know that his life was about to change.', answers: ['did'], explain: 'Little did he know.' },
              { type: 'reorder', words: ['under no circumstances', 'should you', 'give your password', 'to anyone'], answer: 'Under no circumstances should you give your password to anyone', uk: 'Ні за яких обставин нікому не повідомляйте свій пароль.' }
            ]
          },
          {
            id: 'cleft', title: 'Емфаза: It was… who, What I need is…', emoji: '🔦', level: 'C1', minutes: 9,
            theory: {
              intro: 'Українською ми виділяємо головне інтонацією або словом «саме». Англійська для цього перебудовує речення — «розщеплює» його на дві частини. Звідси назва cleft sentences.',
              rules: [
                { t: 'It is / It was … who / that', d: 'Виділяє будь-яку частину: хто, що, де, коли. Про людей — who або that, про решту — that.', ex: [['It was my brother who broke the window.', 'Саме мій брат розбив вікно.'], ['It was in Paris that they first met.', 'Саме в Парижі вони вперше зустрілися.']] },
                { t: 'What + підмет + дієслово + is / was', d: '«Що мені потрібно, так це…» — виділяє річ чи ідею.', ex: [['What I need is a long holiday.', 'Що мені потрібно, так це довга відпустка.'], ['What annoys me is his attitude.', 'Мене дратує саме його ставлення.']] },
                { t: 'What … do is / did was + V', d: 'Виділяємо ДІЮ: <b>What we did was call the police.</b>', ex: [['What you should do is talk to her.', 'Що тобі варто зробити — це поговорити з нею.']] },
                { t: 'All / The reason … is', d: '<b>All I want is…</b> — усе, чого я хочу; <b>The reason (why) … is that…</b> — причина в тому, що…', ex: [['All I want is a bit of peace and quiet.', 'Усе, чого я хочу, — трохи тиші й спокою.'], ['The reason I’m calling is to ask for your help.', 'Я телефоную, щоб попросити про допомогу.']] },
                { t: 'Підсилювальне do / does / did', d: 'У ствердженні перед дієсловом — «таки, справді»: заперечуємо чужий сумнів.', ex: [['I did lock the door — I’m sure!', 'Я таки замкнув двері — я впевнений!'], ['She does look tired.', 'Вона справді виглядає втомленою.']] }
              ],
              tip: 'Порівняй: Tom broke the window (факт) → It was TOM who broke the window (саме Том, а не хтось інший). Емфаза = «саме».'
            },
            exercises: [
              { type: 'choice', q: 'It was my sister ___ found the keys.', options: ['who', 'which', 'what', 'where'], answer: 0, explain: 'It was + людина + who.' },
              { type: 'choice', q: '___ I need is a good night’s sleep.', options: ['What', 'That', 'Which', 'It'], answer: 0, explain: 'What + I need + is.' },
              { type: 'choice', q: 'It was in 2015 ___ we moved to Kyiv.', options: ['that', 'which', 'what', 'who'], answer: 0, explain: 'It was + час + that.' },
              { type: 'choice', q: '___ I want is to be left alone.', options: ['All', 'Every', 'Whole', 'Each'], answer: 0, explain: 'All I want is…' },
              { type: 'choice', q: 'I ___ tell you about the meeting! You just forgot.', options: ['did', 'was', 'have', 'had'], answer: 0, explain: 'Підсилювальне did + V.' },
              { type: 'choice', q: 'What we did ___ call the police.', options: ['was', 'is being', 'did', 'were'], answer: 0, explain: 'What … did was + V.' },
              { type: 'fill', q: 'The reason ___ I called is to invite you. (чому)', answers: ['why', 'that'], explain: 'The reason why / that…' },
              { type: 'fill', q: 'It wasn’t me ___ ate the cake! (хто)', answers: ['who', 'that'], explain: 'It wasn’t + людина + who.' },
              { type: 'reorder', words: ['what annoys me', 'is', 'his attitude'], answer: 'What annoys me is his attitude', uk: 'Мене дратує саме його ставлення.' }
            ]
          },
          {
            id: 'participle', title: 'Дієприкметникові звороти: Having finished…, Built in 1900…', emoji: '✂️', level: 'C1', minutes: 10,
            theory: {
              intro: 'Participle clauses стискають підрядне речення до одного звороту: «Коли я йшов додому, я…» → «Walking home, I…». Так звучать книжки, новини й академічні тексти.',
              rules: [
                { t: 'V-ing — одночасна дія або причина', d: 'Замінює when / while / because + активне дієслово.', ex: [['Walking along the beach, we found a shell.', 'Гуляючи пляжем, ми знайшли мушлю.'], ['Feeling tired, she went to bed early.', 'Відчуваючи втому, вона рано лягла спати.']] },
                { t: 'Having + V3 — дія раніше', d: 'Одна дія повністю завершилася до іншої.', ex: [['Having finished her work, she went home.', 'Закінчивши роботу, вона пішла додому.'], ['Having lived in London, he speaks perfect English.', 'Проживши в Лондоні, він чудово говорить англійською.']] },
                { t: 'V3 — пасивне значення', d: 'Замінює пасивне речення: which was built → <b>built</b>.', ex: [['Built in 1900, the house needs repair.', 'Збудований у 1900 році, будинок потребує ремонту.'], ['The man injured in the accident is now in hospital.', 'Чоловік, травмований в аварії, зараз у лікарні.']] },
                { t: 'Заперечення: Not + V-ing', d: '<b>Not</b> ставимо перед зворотом.', ex: [['Not knowing what to do, I called my dad.', 'Не знаючи, що робити, я подзвонив татові.']] },
                { t: 'Той самий підмет!', d: 'Підмет звороту = підмет головного речення. Інакше виходить смішна «висяча» конструкція.', ex: [['Walking home, I got caught in the rain. ✓', 'Коли я йшов додому, мене застав дощ.'], ['Walking home, the rain started. ✗ (дощ ішов додому?)', '']] }
              ],
              tip: 'Це як українські дієприслівники: «Прочитавши листа, вона заплакала» = Having read the letter, she cried. І правило одного підмета — теж спільне!'
            },
            exercises: [
              { type: 'choice', q: '___ along the street, I saw an old friend.', options: ['Walking', 'Walked', 'Having walk', 'To walk'], answer: 0, explain: 'Одночасна активна дія → V-ing.' },
              { type: 'choice', q: '___ my homework, I went out to play football.', options: ['Having finished', 'Finished', 'Have finished', 'Having finish'], answer: 0, explain: 'Дія раніше → Having + V3.' },
              { type: 'choice', q: '___ in 1889, the Eiffel Tower is a symbol of Paris.', options: ['Built', 'Building', 'Having built', 'To build'], answer: 0, explain: 'Пасивне значення → V3.' },
              { type: 'choice', q: '___ what to say, he stayed silent.', options: ['Not knowing', 'Knowing not', 'Don’t knowing', 'Not known'], answer: 0, explain: 'Заперечення → Not + V-ing.' },
              { type: 'choice', q: 'The letter ___ yesterday was from my bank.', options: ['delivered', 'delivering', 'having delivered', 'deliver'], answer: 0, explain: 'Лист доставили (пасив) → delivered.' },
              { type: 'choice', q: 'Обери правильне речення:', options: ['Opening the door, I saw a strange man.', 'Opening the door, a strange man was there.', 'Opened the door, I saw a strange man.', 'Having open the door, I saw a strange man.'], answer: 0, explain: 'Підмет звороту = підмет речення (I).' },
              { type: 'fill', q: '___ lost my keys, I couldn’t get into the flat. (загубивши)', answers: ['Having'], explain: 'Having + V3 — дія раніше.' },
              { type: 'fill', q: 'The people ___ in the survey were mostly students.', hint: 'to interview', answers: ['interviewed'], explain: 'Людей опитали (пасив) → V3.' },
              { type: 'fill', q: '___ tired, I decided to stay at home. (відчуваючи)', answers: ['Feeling'], explain: 'Причина, активно → V-ing.' },
              { type: 'reorder', words: ['having read the letter', 'she', 'started to cry'], answer: 'Having read the letter she started to cry', uk: 'Прочитавши листа, вона заплакала.' }
            ]
          }
        ]
      }
    ]
  },

  /* ========================= СЛОВНИК =========================
   Дані словника тепер організовані за частинами мови:
   див. js/lexis/verbs-data.js та js/lexis/word-pos.js
   ========================= */

/* ========================= АУДІЮВАННЯ ========================= */
  listening: {
    title: 'Аудіювання',
    subs: [
      {
        id: 'easy', title: 'Рівень 1 — Легкі речення', emoji: '🌱',
        desc: 'Короткі повсякденні речення. Слухай і записуй.',
        items: [
          { text: 'I drink coffee every morning.', uk: 'Я п’ю каву щоранку.' },
          { text: 'The weather is nice today.', uk: 'Сьогодні гарна погода.' },
          { text: 'She lives in a small town.', uk: 'Вона живе в маленькому містечку.' },
          { text: 'We went to the cinema yesterday.', uk: 'Учора ми ходили в кіно.' },
          { text: 'Can you help me, please?', uk: 'Чи можеш ти мені допомогти?' },
          { text: 'The train leaves at nine o’clock.', uk: 'Потяг відправляється о дев’ятій годині.' }
        ]
      },
      {
        id: 'hard', title: 'Рівень 2 — Складніші речення', emoji: '🌿',
        desc: 'Довші речення з граматикою рівня A2–B1.',
        items: [
          { text: 'I have never been to London before.', uk: 'Я ніколи раніше не був у Лондоні.' },
          { text: 'If it rains tomorrow, we will stay at home.', uk: 'Якщо завтра буде дощ, ми залишимося вдома.' },
          { text: 'The report was finished two days ago.', uk: 'Звіт завершили два дні тому.' },
          { text: 'You should drink more water every day.', uk: 'Тобі варто пити більше води щодня.' },
          { text: 'She has been working here since May.', uk: 'Вона працює тут із травня.' },
          { text: 'Could you tell me where the nearest bank is?', uk: 'Не підкажете, де найближчий банк?' }
        ]
      }
    ]
  }
};
