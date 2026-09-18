/* EngLift — американська вимова: звуки, скорочення, наголос, пастки.
   Вантажиться лише при вході в розділ «Вимова». */
window.PRON_DATA = (function () {

/* ============================================================
   1. FLAP T — «водяне» T між голосними звучить як коротке D
   ============================================================ */
const FLAP = {
  id: 'flap', emoji: '💧', title: 'Flap T', uk: 'T між голосними звучить як D',
  level: 'A2', kind: 'sound',
  lead: 'water → «ВОдер», not at all → «нарарОл». Найпомітніша риса американської вимови.',
  intro: '<div class="intro-box blue"><h3>🎯 Правило в один рядок</h3>' +
    '<p>Якщо <b>T</b> стоїть <b>між двома голосними</b> і наголос падає <b>не</b> на склад після нього — американець вимовляє його як швидке <b>D</b> (фонетично це «flap» /ɾ/, удар кінчиком язика).</p></div>' +
    '<div class="intro-box orange"><h3>⚠️ Коли T лишається T</h3>' +
    '<p>Якщо наголос падає саме на склад після T: <b>atTEND, reTURN, hoTEL</b> — тут звичайне чітке /t/. Так само на початку слова: <b>table, take</b>.</p></div>' +
    '<div class="intro-box pink"><h3>🔗 Працює й між словами</h3>' +
    '<p>Правило не зупиняється на межі слова: <i>got it</i> → «ГАдит», <i>a lot of</i> → «елАдов», <i>put it on</i> → «пУдидОн». Саме тому американська мова на слух «зливається».</p></div>',
  rules: [
    { t: 'Між голосними', d: 'water, better, city — T звучить як коротке D.', ex: [['I need some water.', 'звучить «ВОдер»']] },
    { t: 'Після R теж працює', d: 'party, thirty, dirty — після R між голосними те саме.', ex: [['It was a great party.', '«пАрді»']] },
    { t: 'NT після наголосу → часто зникає', d: 'twenty → «твЕні», internet → «Інернет», wanted → «вОнід».', ex: [['I have twenty dollars.', '«твЕні»']] }
  ],
  items: [
    { en: 'water', spoken: 'wader', ipa: '/ˈwɑːɾɚ/', uk: 'вода', ex: { en: 'Can I have some water?', spoken: 'Can I have some wader?', uk: 'Можна мені води?' } },
    { en: 'better', spoken: 'bedder', ipa: '/ˈbeɾɚ/', uk: 'краще', ex: { en: 'You look better today.', spoken: 'You look bedder today.', uk: 'Ти сьогодні маєш кращий вигляд.' } },
    { en: 'city', spoken: 'siddy', ipa: '/ˈsɪɾi/', uk: 'місто', ex: { en: 'I live in the city.', spoken: 'I live in the siddy.', uk: 'Я живу в місті.' } },
    { en: 'letter', spoken: 'ledder', ipa: '/ˈleɾɚ/', uk: 'лист, літера', ex: { en: 'I got your letter.', spoken: 'I god your ledder.', uk: 'Я отримав твого листа.' } },
    { en: 'later', spoken: 'lader', ipa: '/ˈleɪɾɚ/', uk: 'пізніше', ex: { en: 'See you later!', spoken: 'See you lader!', uk: 'До зустрічі!' } },
    { en: 'party', spoken: 'pardy', ipa: '/ˈpɑːrɾi/', uk: 'вечірка', ex: { en: 'It was a great party.', spoken: 'It was a great pardy.', uk: 'Це була чудова вечірка.' } },
    { en: 'computer', spoken: 'compuder', ipa: '/kəmˈpjuːɾɚ/', uk: 'компʼютер', ex: { en: 'My computer is slow.', spoken: 'My compuder is slow.', uk: 'Мій компʼютер повільний.' } },
    { en: 'little', spoken: 'liddle', ipa: '/ˈlɪɾl̩/', uk: 'маленький', ex: { en: 'Just a little bit.', spoken: 'Just a liddle bit.', uk: 'Зовсім трохи.' } },
    { en: 'bottle', spoken: 'boddle', ipa: '/ˈbɑːɾl̩/', uk: 'пляшка', ex: { en: 'Pass me the bottle.', spoken: 'Pass me the boddle.', uk: 'Передай пляшку.' } },
    { en: 'whatever', spoken: 'whadever', ipa: '/wʌˈɾevɚ/', uk: 'байдуже / будь-що', ex: { en: 'Whatever you want.', spoken: 'Whadever you want.', uk: 'Що завгодно.' } },
    { en: 'thirty', spoken: 'thirdy', ipa: '/ˈθɜːrɾi/', uk: 'тридцять', note: 'Часто ще й без N-звуку: «тхЕрді».', ex: { en: 'It costs thirty bucks.', spoken: 'It costs thirdy bucks.', uk: 'Це коштує тридцять баксів.' } },
    { en: 'twenty', spoken: 'twenny', ipa: '/ˈtweni/', uk: 'двадцять', note: 'Після N звук T часто зникає повністю.', ex: { en: 'I am twenty-one.', spoken: 'I am twenny-one.', uk: 'Мені двадцять один.' } },
    { en: 'internet', spoken: 'innernet', ipa: '/ˈɪnɚnet/', uk: 'інтернет', note: 'Те саме: NT після наголосу → просто N.', ex: { en: 'The internet is down.', spoken: 'The innernet is down.', uk: 'Інтернет не працює.' } },
    { en: 'got it', spoken: 'goddit', ipa: '/ˈɡɑːɾɪt/', uk: 'зрозумів', ex: { en: 'Got it, thanks.', spoken: 'Goddit, thanks.', uk: 'Зрозумів, дякую.' } },
    { en: 'a lot of', spoken: 'a lodda', ipa: '/əˈlɑːɾə/', uk: 'багато', ex: { en: 'That is a lot of work.', spoken: 'That is a lodda work.', uk: 'Це багато роботи.' } },
    { en: 'shut up', spoken: 'shuddup', ipa: '/ʃʌˈɾʌp/', uk: 'замовкни', ex: { en: 'Oh, shut up!', spoken: 'Oh, shuddup!', uk: 'Та замовкни!' } },
    { en: 'put it on', spoken: 'puddidon', ipa: '/ˈpʊɾɪɾɑːn/', uk: 'надінь це', ex: { en: 'Put it on the table.', spoken: 'Puddit on the table.', uk: 'Поклади це на стіл.' } },
    { en: 'not at all', spoken: 'nodadall', ipa: '/ˌnɑːɾəˈɾɔːl/', uk: 'зовсім ні', ex: { en: 'Not at all, go ahead.', spoken: 'Nodadall, go ahead.', uk: 'Та нічого, давай.' } }
  ]
};

/* ============================================================
   2. GLOTTAL T — T перед складовим N ковтається
   ============================================================ */
const GLOTTAL = {
  id: 'glottal', emoji: '🔇', title: 'Проковтнуте T', uk: 'button → «БАʔн»',
  level: 'B1', kind: 'sound',
  lead: 'button, mountain, important — замість T американець робить коротку паузу в горлі.',
  intro: '<div class="intro-box pink"><h3>🎯 Що відбувається</h3>' +
    '<p>Коли після <b>T</b> іде <b>N</b> (button, written, certain), звук не вимовляється язиком — горло на мить змикається, і одразу йде носове «н». Виходить <b>«БАʔн»</b>, ніби слово спіткнулося.</p></div>' +
    '<div class="intro-box blue"><h3>🧠 Як тренувати</h3>' +
    '<p>Скажи «uh-oh» — та сама пауза в горлі посередині. Тепер устав її замість T: <i>bu-ʔ-on</i>, <i>impor-ʔ-nt</i>. Головне — <b>не</b> вимовляти «баттон» із чітким T: так звучить іноземець.</p></div>' +
    '<div class="intro-box orange"><h3>📍 Ще одне місце</h3>' +
    '<p>T у кінці слова перед приголосним теж ковтається: <i>that one</i> → «дЕʔ ван», <i>right now</i> → «раʔ нАу», <i>can\'t stop</i> → «кЕнʔ стап».</p></div>',
  rules: [
    { t: 'T + N', d: 'button, cotton, kitten, written — язик не торкається піднебіння.', ex: [['Press the button.', '«БАʔн»']] },
    { t: '-ain / -ent', d: 'mountain, certain, important, sentence.', ex: [['This is important.', '«імПОрʔнт»']] },
    { t: 'У кінці перед приголосним', d: 'that one, right now, quite good.', ex: [['Right now!', '«раʔ нАу»']] }
  ],
  items: [
    { en: 'button', spoken: 'buʔ-n', ipa: '/ˈbʌʔn̩/', uk: 'кнопка', ex: { en: 'Press the green button.', spoken: 'Press the green buʔ-n.', uk: 'Натисни зелену кнопку.' } },
    { en: 'mountain', spoken: 'mounʔ-n', ipa: '/ˈmaʊʔn̩/', uk: 'гора', ex: { en: 'We climbed the mountain.', spoken: 'We climbed the mounʔ-n.', uk: 'Ми піднялися на гору.' } },
    { en: 'important', spoken: 'imporʔnt', ipa: '/ɪmˈpɔːrʔn̩t/', uk: 'важливий', ex: { en: 'This is important.', spoken: 'This is imporʔnt.', uk: 'Це важливо.' } },
    { en: 'certain', spoken: 'cerʔ-n', ipa: '/ˈsɜːrʔn̩/', uk: 'певний', ex: { en: 'I am not certain.', spoken: 'I am not cerʔ-n.', uk: 'Я не певен.' } },
    { en: 'kitten', spoken: 'kiʔ-n', ipa: '/ˈkɪʔn̩/', uk: 'кошеня', ex: { en: 'Look at that kitten!', spoken: 'Look at that kiʔ-n!', uk: 'Глянь на це кошеня!' } },
    { en: 'written', spoken: 'wriʔ-n', ipa: '/ˈrɪʔn̩/', uk: 'написаний', ex: { en: 'It is written here.', spoken: 'It is wriʔ-n here.', uk: 'Це написано тут.' } },
    { en: 'sentence', spoken: 'senʔns', ipa: '/ˈsenʔn̩s/', uk: 'речення', ex: { en: 'Read the sentence.', spoken: 'Read the senʔns.', uk: 'Прочитай речення.' } },
    { en: 'forgotten', spoken: 'forgoʔ-n', ipa: '/fɚˈɡɑːʔn̩/', uk: 'забутий', ex: { en: 'I had forgotten about it.', spoken: 'I had forgoʔ-n about it.', uk: 'Я про це забув.' } },
    { en: 'cotton', spoken: 'coʔ-n', ipa: '/ˈkɑːʔn̩/', uk: 'бавовна', ex: { en: 'It is 100% cotton.', spoken: 'It is 100% coʔ-n.', uk: 'Це 100% бавовна.' } },
    { en: 'curtain', spoken: 'curʔ-n', ipa: '/ˈkɜːrʔn̩/', uk: 'штора', ex: { en: 'Close the curtain.', spoken: 'Close the curʔ-n.', uk: 'Закрий штору.' } },
    { en: 'didn\'t', spoken: 'diʔnt', ipa: '/ˈdɪʔn̩t/', uk: 'не зробив', ex: { en: 'I didn\'t see it.', spoken: 'I diʔnt see it.', uk: 'Я цього не бачив.' } },
    { en: 'wouldn\'t', spoken: 'wouʔnt', ipa: '/ˈwʊʔn̩t/', uk: 'не став би', ex: { en: 'I wouldn\'t do that.', spoken: 'I wouʔnt do that.', uk: 'Я б цього не робив.' } },
    { en: 'that one', spoken: 'thaʔ one', ipa: '/ˈðæʔ wʌn/', uk: 'оцей', ex: { en: 'I want that one.', spoken: 'I want thaʔ one.', uk: 'Я хочу оцей.' } },
    { en: 'right now', spoken: 'righʔ now', ipa: '/ˈraɪʔ naʊ/', uk: 'прямо зараз', ex: { en: 'Come here right now.', spoken: 'Come here righʔ now.', uk: 'Іди сюди негайно.' } }
  ]
};

/* ============================================================
   3. LINKING — слова зливаються в один потік
   ============================================================ */
const LINKING = {
  id: 'linking', emoji: '🔗', title: 'Злиття слів', uk: 'an apple → «енЕпл»',
  level: 'A2', kind: 'sound',
  lead: 'Американець говорить не словами, а групами. Останній приголосний чіпляється до наступного голосного.',
  intro: '<div class="intro-box blue"><h3>🎯 Чому «не чути слів»</h3>' +
    '<p>Здається, що говорять швидко. Насправді слова <b>склеєні</b>: приголосний у кінці слова перестрибує на початок наступного. <i>an apple</i> → «е-нЕпл», <i>turn it off</i> → «тЕрнідОф».</p></div>' +
    '<div class="intro-box orange"><h3>🔤 Три типи склейки</h3>' +
    '<p><b>1. Приголосний + голосний:</b> pick it up → «пІкідАп». <b>2. Однакові приголосні зливаються в один:</b> what time → «уатАйм». <b>3. Між голосними виникає /w/ або /j/:</b> go on → «ґоуwОн», I am → «айjЕм».</p></div>' +
    '<div class="intro-box pink"><h3>💡 Найкорисніша вправа</h3>' +
    '<p>Записуй почуте так, як чуєш, а не як пишеться. Коли навчишся <b>чути</b> склейку, почнеш і сам говорити плавно — це та сама навичка.</p></div>',
  rules: [
    { t: 'Приголосний → голосний', d: 'Кінцевий приголосний стає початком наступного слова.', ex: [['Turn it off.', '«тЕр-ні-тОф»']] },
    { t: 'H у займенниках зникає', d: 'tell him → «тЕлім», ask her → «Ескер».', ex: [['Give him a call.', '«ґІвіма кол»']] },
    { t: '-ing → -in\'', d: 'У невимушеній мові «g» на кінці не звучить: doing → doin\'.', ex: [['What are you doing?', '«Уадаю дУїн»']] }
  ],
  items: [
    { en: 'an apple', spoken: 'anapple', ipa: '/əˈnæpl̩/', uk: 'яблуко', ex: { en: 'I ate an apple.', spoken: 'I ate anapple.', uk: 'Я зʼїв яблуко.' } },
    { en: 'turn it off', spoken: 'turnidoff', ipa: '/ˈtɜːrnɪɾɔːf/', uk: 'вимкни це', ex: { en: 'Please turn it off.', spoken: 'Please turnidoff.', uk: 'Вимкни це, будь ласка.' } },
    { en: 'pick it up', spoken: 'pickidup', ipa: '/ˈpɪkɪɾʌp/', uk: 'підніми це', ex: { en: 'Pick it up, please.', spoken: 'Pickidup, please.', uk: 'Підніми це, будь ласка.' } },
    { en: 'look at it', spoken: 'lookadit', ipa: '/ˈlʊkəɾɪt/', uk: 'подивись на це', ex: { en: 'Look at it closely.', spoken: 'Lookadit closely.', uk: 'Придивись до цього.' } },
    { en: 'hold on', spoken: 'holdon', ipa: '/ˈhoʊldɑːn/', uk: 'зачекай', ex: { en: 'Hold on a second.', spoken: 'Holdona second.', uk: 'Зачекай секунду.' } },
    { en: 'come on', spoken: 'c\'mon', ipa: '/kəˈmɑːn/', uk: 'ну ж бо', ex: { en: 'Come on, we are late!', spoken: 'C\'mon, we\'re late!', uk: 'Ну ж бо, ми запізнюємось!' } },
    { en: 'what time', spoken: 'whatime', ipa: '/wʌˈtaɪm/', uk: 'о котрій', note: 'Два однакові звуки зливаються в один.', ex: { en: 'What time is it?', spoken: 'Whatime is it?', uk: 'Котра година?' } },
    { en: 'go on', spoken: 'gowon', ipa: '/ɡoʊˈwɑːn/', uk: 'продовжуй', note: 'Між голосними зʼявляється /w/.', ex: { en: 'Go on, I am listening.', spoken: 'Gowon, I\'m listening.', uk: 'Продовжуй, я слухаю.' } },
    { en: 'I am', spoken: 'I-yam', ipa: '/aɪˈjæm/', uk: 'я є', note: 'Між голосними зʼявляється /j/.', ex: { en: 'I am ready.', spoken: 'I-yam ready.', uk: 'Я готовий.' } },
    { en: 'tell him', spoken: 'tell\'im', ipa: '/ˈtelɪm/', uk: 'скажи йому', note: 'H у ненаголошених him/her/his зникає.', ex: { en: 'Tell him I called.', spoken: 'Tell\'im I called.', uk: 'Скажи йому, що я дзвонив.' } },
    { en: 'ask her', spoken: 'asker', ipa: '/ˈæskɚ/', uk: 'спитай її', ex: { en: 'Ask her about it.', spoken: 'Asker about it.', uk: 'Спитай її про це.' } },
    { en: 'doing', spoken: 'doin\'', ipa: '/ˈduːɪn/', uk: 'роблю', ex: { en: 'What are you doing?', spoken: 'Whaddaya doin\'?', uk: 'Що ти робиш?' } },
    { en: 'in a minute', spoken: 'inaminute', ipa: '/ɪnəˈmɪnɪt/', uk: 'за хвилину', ex: { en: 'I will be there in a minute.', spoken: 'I\'ll be there inaminute.', uk: 'Я буду за хвилину.' } },
    { en: 'at all', spoken: 'adall', ipa: '/əˈɾɔːl/', uk: 'узагалі', ex: { en: 'I do not mind at all.', spoken: 'I don\'t mind adall.', uk: 'Я зовсім не проти.' } }
  ]
};

/* ============================================================
   4. WEAK FORMS — службові слова стискаються до /ə/
   ============================================================ */
const WEAK = {
  id: 'weak', emoji: '🪶', title: 'Слабкі форми', uk: 'to /tə/, of /ə/, and /ən/',
  level: 'B1', kind: 'weak',
  lead: 'Службові слова майже не звучать — і саме через це «ковтання» мова здається швидкою.',
  intro: '<div class="intro-box orange"><h3>🎯 Головна ідея англійського ритму</h3>' +
    '<p>В англійській наголос падає на <b>слова зі змістом</b> (іменники, дієслова, прикметники), а службові (<i>to, of, and, for, can, was</i>) — стискаються до нейтрального «ə». Речення тримає ритм, а не кількість складів.</p></div>' +
    '<div class="intro-box blue"><h3>🔊 Порівняй</h3>' +
    '<p><b>I want to go to the store</b> звучить як «ай вОна ґОу дə стОр». Слова <i>to</i> й <i>the</i> майже зникли — але носій чує їх, бо знає ритм.</p></div>' +
    '<div class="intro-box pink"><h3>⚠️ Коли форма сильна</h3>' +
    '<p>У кінці речення й під логічним наголосом слово звучить повністю: <i>— Who is it for? — It\'s for ME.</i> Тут <b>for</b> вимовляється чітко /fɔːr/.</p></div>',
  rules: [
    { t: 'to → /tə/', d: 'Перед приголосним: I need to go → «нІдтə ґоу».', ex: [['I have to run.', '«хЕфтə ран»']] },
    { t: 'of → /ə/', d: 'a cup of coffee → «кАпə кОфі», kind of → «кАйндə».', ex: [['A glass of water.', '«ґлЕсə вОдер»']] },
    { t: 'and → /ən/ або /n/', d: 'rock and roll → «рок-н-рол», you and me → «юəн мі».', ex: [['Fish and chips.', '«фішн чіпс»']] }
  ],
  items: [
    { en: 'to', strong: '/tuː/', weak: '/tə/', uk: 'до, щоб', ex: { en: 'I want to go.', spoken: 'I wanna go. → «ай вОнə ґоу»', uk: 'Я хочу піти.' } },
    { en: 'of', strong: '/ʌv/', weak: '/ə/', uk: 'з, від', ex: { en: 'A cup of tea.', spoken: '«е кАпə ті»', uk: 'Чашка чаю.' } },
    { en: 'and', strong: '/ænd/', weak: '/ən/', uk: 'і', ex: { en: 'Bread and butter.', spoken: '«брЕдн бАдер»', uk: 'Хліб з маслом.' } },
    { en: 'for', strong: '/fɔːr/', weak: '/fɚ/', uk: 'для', ex: { en: 'This is for you.', spoken: '«дІсіз фər ю»', uk: 'Це для тебе.' } },
    { en: 'can', strong: '/kæn/', weak: '/kən/', uk: 'можу', note: 'Саме тому can і can\'t на слух різні: can — слабке, can\'t — чітке.', ex: { en: 'I can swim.', spoken: '«ай кəн свім»', uk: 'Я вмію плавати.' } },
    { en: 'have', strong: '/hæv/', weak: '/əv/', uk: 'мати (допоміжне)', ex: { en: 'I should have known.', spoken: '«шУдəв нОун»', uk: 'Я мав би знати.' } },
    { en: 'was', strong: '/wɑːz/', weak: '/wəz/', uk: 'був', ex: { en: 'He was here.', spoken: '«хі wəz хІр»', uk: 'Він був тут.' } },
    { en: 'them', strong: '/ðem/', weak: '/əm/', uk: 'їх', ex: { en: 'Give them to me.', spoken: '«ґів əм тə мі»', uk: 'Дай їх мені.' } },
    { en: 'your', strong: '/jɔːr/', weak: '/jɚ/', uk: 'твій', ex: { en: 'Where is your car?', spoken: '«вер з jər кар»', uk: 'Де твоє авто?' } },
    { en: 'are', strong: '/ɑːr/', weak: '/ɚ/', uk: 'є (мн.)', ex: { en: 'What are you doing?', spoken: '«вАдəю дУїн»', uk: 'Що ти робиш?' } },
    { en: 'at', strong: '/æt/', weak: '/ət/', uk: 'у, на', ex: { en: 'Look at this.', spoken: '«лУкəт діс»', uk: 'Глянь на це.' } },
    { en: 'but', strong: '/bʌt/', weak: '/bət/', uk: 'але', ex: { en: 'Nice but expensive.', spoken: '«найс bət ікспЕнсів»', uk: 'Гарно, але дорого.' } },
    { en: 'from', strong: '/frɑːm/', weak: '/frəm/', uk: 'з, від', ex: { en: 'I am from Ukraine.', spoken: '«айм frəm юкрЕйн»', uk: 'Я з України.' } },
    { en: 'some', strong: '/sʌm/', weak: '/səm/', uk: 'трохи, кілька', ex: { en: 'I need some help.', spoken: '«нід səm хелп»', uk: 'Мені потрібна допомога.' } },
    { en: 'as', strong: '/æz/', weak: '/əz/', uk: 'як', ex: { en: 'As soon as possible.', spoken: '«əз сун əз пАсəбл»', uk: 'Якнайшвидше.' } },
    { en: 'the', strong: '/ðiː/', weak: '/ðə/', uk: 'означений артикль', note: 'Перед голосним — /ðiː/: the apple, the end.', ex: { en: 'Close the door.', spoken: '«клОуз ðə дор»', uk: 'Зачини двері.' } }
  ]
};

/* ============================================================
   5. ЗАКІНЧЕННЯ -ED і -S — три вимови кожного
   ============================================================ */
const ENDINGS = {
  id: 'endings', emoji: '🔚', title: 'Закінчення -ed і -s', uk: 'три звуки замість одного',
  level: 'A2', kind: 'endings',
  lead: 'worked = /t/, played = /d/, wanted = /ɪd/. Правило механічне — вирішує останній звук основи.',
  intro: '<div class="intro-box blue"><h3>🎯 -ED: три варіанти</h3>' +
    '<p><b>/ɪd/</b> — якщо основа закінчується на <b>t</b> або <b>d</b> (wanted, needed): додається зайвий склад. ' +
    '<b>/t/</b> — після глухих звуків (worked, stopped, washed). ' +
    '<b>/d/</b> — після дзвінких і голосних (played, lived, opened).</p></div>' +
    '<div class="intro-box orange"><h3>🎯 -S: теж три</h3>' +
    '<p><b>/ɪz/</b> — після шиплячих і свистячих (watches, buses, changes). <b>/s/</b> — після глухих (books, cats, stops). <b>/z/</b> — після дзвінких і голосних (dogs, plays, phones).</p></div>' +
    '<div class="intro-box pink"><h3>💡 Як перевірити швидко</h3>' +
    '<p>Приклади долоню до горла й вимов останній звук основи. Гуде — буде /d/ або /z/. Не гуде — /t/ або /s/. А якщо основа вже закінчується схожим звуком (t/d для -ed, s/z/ʃ для -s) — додається окремий склад.</p></div>',
  rules: [
    { t: '-ed після t / d', d: 'wanted, needed, started — зайвий склад /ɪd/.', ex: [['I wanted to help.', '«вОн-тід»']] },
    { t: '-ed після глухих', d: 'worked, stopped, washed, laughed — звучить /t/.', ex: [['He worked late.', '«вЕркт»']] },
    { t: '-ed після дзвінких', d: 'played, lived, opened, called — звучить /d/.', ex: [['She called me.', '«колд»']] }
  ],
  items: [
    { en: 'wanted', base: 'want', cls: '/ɪd/', uk: 'хотів', rule: 'основа на t → окремий склад' },
    { en: 'needed', base: 'need', cls: '/ɪd/', uk: 'потребував', rule: 'основа на d → окремий склад' },
    { en: 'started', base: 'start', cls: '/ɪd/', uk: 'почав', rule: 'основа на t → окремий склад' },
    { en: 'decided', base: 'decide', cls: '/ɪd/', uk: 'вирішив', rule: 'основа на d → окремий склад' },
    { en: 'worked', base: 'work', cls: '/t/', uk: 'працював', rule: 'глухий /k/ → /t/' },
    { en: 'stopped', base: 'stop', cls: '/t/', uk: 'зупинився', rule: 'глухий /p/ → /t/' },
    { en: 'washed', base: 'wash', cls: '/t/', uk: 'мив', rule: 'глухий /ʃ/ → /t/' },
    { en: 'laughed', base: 'laugh', cls: '/t/', uk: 'сміявся', rule: 'глухий /f/ → /t/' },
    { en: 'watched', base: 'watch', cls: '/t/', uk: 'дивився', rule: 'глухий /tʃ/ → /t/' },
    { en: 'played', base: 'play', cls: '/d/', uk: 'грав', rule: 'голосний → /d/' },
    { en: 'lived', base: 'live', cls: '/d/', uk: 'жив', rule: 'дзвінкий /v/ → /d/' },
    { en: 'opened', base: 'open', cls: '/d/', uk: 'відкрив', rule: 'дзвінкий /n/ → /d/' },
    { en: 'called', base: 'call', cls: '/d/', uk: 'дзвонив', rule: 'дзвінкий /l/ → /d/' },
    { en: 'changed', base: 'change', cls: '/d/', uk: 'змінив', rule: 'дзвінкий /dʒ/ → /d/' },
    { en: 'watches', base: 'watch', cls: '/ɪz/', uk: 'дивиться', rule: 'шиплячий → окремий склад' },
    { en: 'buses', base: 'bus', cls: '/ɪz/', uk: 'автобуси', rule: 'свистячий → окремий склад' },
    { en: 'changes', base: 'change', cls: '/ɪz/', uk: 'зміни', rule: 'шиплячий → окремий склад' },
    { en: 'boxes', base: 'box', cls: '/ɪz/', uk: 'коробки', rule: '/ks/ → окремий склад' },
    { en: 'books', base: 'book', cls: '/s/', uk: 'книги', rule: 'глухий /k/ → /s/' },
    { en: 'cats', base: 'cat', cls: '/s/', uk: 'коти', rule: 'глухий /t/ → /s/' },
    { en: 'stops', base: 'stop', cls: '/s/', uk: 'зупиняє', rule: 'глухий /p/ → /s/' },
    { en: 'dogs', base: 'dog', cls: '/z/', uk: 'собаки', rule: 'дзвінкий /ɡ/ → /z/' },
    { en: 'plays', base: 'play', cls: '/z/', uk: 'грає', rule: 'голосний → /z/' },
    { en: 'phones', base: 'phone', cls: '/z/', uk: 'телефони', rule: 'дзвінкий /n/ → /z/' }
  ]
};

/* ============================================================
   6. НАГОЛОС — де він падає і що це змінює
   ============================================================ */
const STRESS = {
  id: 'stress', emoji: '🥁', title: 'Наголос у слові', uk: 'REcord чи reCORD',
  level: 'B1', kind: 'stress',
  lead: 'Одне написання — два слова. Наголос на першому складі робить іменник, на другому — дієслово.',
  intro: '<div class="intro-box blue"><h3>🎯 Правило іменник / дієслово</h3>' +
    '<p>У двоскладових парах наголос на <b>першому</b> складі — це <b>іменник</b> (<i>a REcord</i> — запис), на <b>другому</b> — <b>дієслово</b> (<i>to reCORD</i> — записувати). Так працює для десятків слів.</p></div>' +
    '<div class="intro-box orange"><h3>⚠️ Ненаголошене = «ə»</h3>' +
    '<p>Ненаголошений склад майже завжди стискається до нейтрального «ə»: <i>PHOtograph</i> — «фОутəґрЕф», але <i>phoTOgraphy</i> — «фəтАґрəфі». Той самий корінь звучить зовсім по-різному.</p></div>' +
    '<div class="intro-box pink"><h3>💡 Чому це важливо</h3>' +
    '<p>Неправильний наголос ламає слово сильніше, ніж неправильний звук: «comfortABLE» носій може просто не впізнати, хоча всі звуки правильні.</p></div>',
  rules: [
    { t: 'Іменник ← → дієслово', d: 'PREsent (подарунок) vs preSENT (представляти).', ex: [['I have a present for you.', 'наголос на PRE']] },
    { t: 'Суфікси тягнуть наголос', d: '-tion, -sion, -ic, -ity → наголос на склад перед ними: inforMAtion, phoTOgraphic, opportUnity.', ex: [['That is good information.', 'інфор-МЕЙ-шн']] },
    { t: 'Складені іменники', d: 'У парах «іменник + іменник» наголос на першому: BLACKboard, GREENhouse.', ex: [['Look at the blackboard.', 'БЛЕК-борд']] }
  ],
  items: [
    { en: 'record', syl: ['RE', 'cord'], idx: 0, uk: 'запис (іменник)', note: 'a REcord — платівка, запис' },
    { en: 'record', syl: ['re', 'CORD'], idx: 1, uk: 'записувати (дієслово)', note: 'to reCORD — записувати' },
    { en: 'present', syl: ['PRE', 'sent'], idx: 0, uk: 'подарунок (іменник)' },
    { en: 'present', syl: ['pre', 'SENT'], idx: 1, uk: 'представляти (дієслово)' },
    { en: 'object', syl: ['OB', 'ject'], idx: 0, uk: 'обʼєкт (іменник)' },
    { en: 'object', syl: ['ob', 'JECT'], idx: 1, uk: 'заперечувати (дієслово)' },
    { en: 'increase', syl: ['IN', 'crease'], idx: 0, uk: 'зростання (іменник)' },
    { en: 'increase', syl: ['in', 'CREASE'], idx: 1, uk: 'зростати (дієслово)' },
    { en: 'contract', syl: ['CON', 'tract'], idx: 0, uk: 'договір (іменник)' },
    { en: 'suspect', syl: ['SUS', 'pect'], idx: 0, uk: 'підозрюваний (іменник)' },
    { en: 'suspect', syl: ['sus', 'PECT'], idx: 1, uk: 'підозрювати (дієслово)' },
    { en: 'photograph', syl: ['PHO', 'to', 'graph'], idx: 0, uk: 'фотографія' },
    { en: 'photography', syl: ['pho', 'TO', 'gra', 'phy'], idx: 1, uk: 'фотографія (мистецтво)' },
    { en: 'comfortable', syl: ['COM', 'for', 'ta', 'ble'], idx: 0, uk: 'зручний', note: 'Насправді звучить у три склади: «КАМФ-тер-бл».' },
    { en: 'necessary', syl: ['NE', 'ces', 'sa', 'ry'], idx: 0, uk: 'необхідний' },
    { en: 'opportunity', syl: ['op', 'por', 'TU', 'ni', 'ty'], idx: 2, uk: 'можливість' },
    { en: 'develop', syl: ['de', 'VE', 'lop'], idx: 1, uk: 'розвивати' },
    { en: 'information', syl: ['in', 'for', 'MA', 'tion'], idx: 2, uk: 'інформація' },
    { en: 'hotel', syl: ['ho', 'TEL'], idx: 1, uk: 'готель' },
    { en: 'interesting', syl: ['IN', 'te', 'res', 'ting'], idx: 0, uk: 'цікавий', note: 'Часто в три склади: «Інтрестінг».' }
  ]
};

/* ============================================================
   7. СЛОВА-ПАСТКИ — пишеться одне, звучить інше
   ============================================================ */
const TRICKY = {
  id: 'tricky', emoji: '🪤', title: 'Слова-пастки', uk: 'comfortable, Wednesday, colonel',
  level: 'B1', kind: 'tricky',
  lead: 'Слова, які майже всі читають «як написано» — і саме тому їх не розуміють.',
  intro: '<div class="intro-box pink"><h3>🎯 Чому так вийшло</h3>' +
    '<p>Англійська пишеться так, як вимовлялася 500 років тому. Звуки змінилися, написання — ні. Тому <i>Wednesday</i> — це «УЕНЗдей», а <i>colonel</i> — узагалі «КЕРнл».</p></div>' +
    '<div class="intro-box blue"><h3>🔇 Німі букви</h3>' +
    '<p>Цілі групи букв не звучать: <b>kn-</b> (knee, know), <b>wr-</b> (write, wrong), <b>-mb</b> (climb, thumb), <b>-stle</b> (castle, whistle), <b>h</b> у hour, honest.</p></div>' +
    '<div class="intro-box orange"><h3>✂️ Зникає цілий склад</h3>' +
    '<p>У довгих словах американці з’їдають середину: <i>comfortable</i> → «КАМФ-тер-бл», <i>vegetable</i> → «ВЕДЖ-тə-бл», <i>chocolate</i> → «ЧОК-лıт», <i>every</i> → «ЕВ-рі».</p></div>',
  rules: [
    { t: 'Зникає склад', d: 'comfortable, vegetable, chocolate, restaurant, business.', ex: [['This chair is comfortable.', '«КАМФ-тер-бл»']] },
    { t: 'Німа буква', d: 'know, write, climb, castle, honest, hour.', ex: [['I know the answer.', '«нОу»']] },
    { t: 'Зовсім не як пишеться', d: 'colonel /ˈkɜːrnl̩/, choir /ˈkwaɪɚ/, suite /swiːt/.', ex: [['He is a colonel.', '«КЕРнл»']] }
  ],
  items: [
    { en: 'comfortable', say: 'КАМФ-тер-бл', ipa: '/ˈkʌmftɚbl̩/', uk: 'зручний', wrong: 'ком-фор-ТЕЙ-бл' },
    { en: 'vegetable', say: 'ВЕДЖ-тə-бл', ipa: '/ˈvedʒtəbl̩/', uk: 'овоч', wrong: 'ве-ге-ТЕЙ-бл' },
    { en: 'Wednesday', say: 'УЕНЗ-дей', ipa: '/ˈwenzdeɪ/', uk: 'середа', wrong: 'вед-НЕС-дей' },
    { en: 'chocolate', say: 'ЧОК-лıт', ipa: '/ˈtʃɑːklət/', uk: 'шоколад', wrong: 'чо-ко-ЛЕЙТ' },
    { en: 'restaurant', say: 'РЕСТ-рант', ipa: '/ˈrestrɑːnt/', uk: 'ресторан', wrong: 'рес-тау-РАНТ' },
    { en: 'colonel', say: 'КЕР-нл', ipa: '/ˈkɜːrnl̩/', uk: 'полковник', wrong: 'ко-ло-НЕЛ' },
    { en: 'recipe', say: 'РЕ-сə-пі', ipa: '/ˈresəpi/', uk: 'рецепт', wrong: 'ре-САЙП' },
    { en: 'clothes', say: 'КЛОУЗ', ipa: '/kloʊz/', uk: 'одяг', wrong: 'кло-ТХЕС' },
    { en: 'months', say: 'МАНТС', ipa: '/mʌnθs/', uk: 'місяці', wrong: 'мон-ТХЕС' },
    { en: 'February', say: 'ФЕБ-ю-ері', ipa: '/ˈfebjueri/', uk: 'лютий', wrong: 'феб-РУ-арі' },
    { en: 'library', say: 'ЛАЙ-брері', ipa: '/ˈlaɪbreri/', uk: 'бібліотека', wrong: 'лі-БРА-рі' },
    { en: 'jewelry', say: 'ДЖУЛ-рі', ipa: '/ˈdʒuːlri/', uk: 'прикраси', wrong: 'дже-ВЕЛ-рі' },
    { en: 'choir', say: 'КВА-єр', ipa: '/ˈkwaɪɚ/', uk: 'хор', wrong: 'ЧОЙР' },
    { en: 'suite', say: 'СВІТ', ipa: '/swiːt/', uk: 'номер (у готелі)', wrong: 'СʼЮТ' },
    { en: 'receipt', say: 'рі-СІТ', ipa: '/rɪˈsiːt/', uk: 'чек', wrong: 'ре-СЕЙПТ' },
    { en: 'salmon', say: 'СЕ-мəн', ipa: '/ˈsæmən/', uk: 'лосось', wrong: 'САЛ-мон' },
    { en: 'island', say: 'АЙ-ленд', ipa: '/ˈaɪlənd/', uk: 'острів', wrong: 'ІС-ленд' },
    { en: 'answer', say: 'ЕН-сер', ipa: '/ˈænsɚ/', uk: 'відповідь', wrong: 'ЕН-свер' },
    { en: 'castle', say: 'КЕ-сл', ipa: '/ˈkæsl̩/', uk: 'замок', wrong: 'КАСТ-л' },
    { en: 'muscle', say: 'МА-сл', ipa: '/ˈmʌsl̩/', uk: 'мʼяз', wrong: 'МУС-кл' },
    { en: 'debt', say: 'ДЕТ', ipa: '/det/', uk: 'борг', wrong: 'ДЕБТ' },
    { en: 'doubt', say: 'ДАУТ', ipa: '/daʊt/', uk: 'сумнів', wrong: 'ДОУБТ' },
    { en: 'honest', say: 'А-ніст', ipa: '/ˈɑːnɪst/', uk: 'чесний', wrong: 'ХО-нест' },
    { en: 'hour', say: 'АУ-ер', ipa: '/ˈaʊɚ/', uk: 'година', wrong: 'ХАУР' },
    { en: 'knee', say: 'НІ', ipa: '/niː/', uk: 'коліно', wrong: 'КНІ' },
    { en: 'business', say: 'БІЗ-ніс', ipa: '/ˈbɪznəs/', uk: 'бізнес, справа', wrong: 'бі-ЗІ-нес' }
  ]
};

/* ============================================================
   8. АМЕРИКАНСЬКА vs БРИТАНСЬКА
   ============================================================ */
const AMEBRE = {
  id: 'variant', emoji: '🗽', title: 'США проти Британії', uk: 'water, schedule, can\'t',
  level: 'B1', kind: 'variant',
  lead: 'Ті самі слова — різні звуки. Тут те, що найчастіше збиває з пантелику в серіалах.',
  intro: '<div class="intro-box blue"><h3>🎯 Три головні відмінності</h3>' +
    '<p><b>1. R вимовляється завжди:</b> car, park, teacher — американець його чує й вимовляє, британець — ні. ' +
    '<b>2. T між голосними стає D</b> (water). ' +
    '<b>3. Звук /æ/ замість /ɑː/:</b> dance, can\'t, ask — в американця «денс», у британця «данс».</p></div>' +
    '<div class="intro-box orange"><h3>🔤 Yod-dropping</h3>' +
    '<p>Після t, d, n американці не вставляють «й»: <i>new</i> — «НУ» (а не «НЬЮ»), <i>duty</i> — «ДУ-ді», <i>Tuesday</i> — «ТУЗ-дей».</p></div>' +
    '<div class="intro-box pink"><h3>💡 Що обрати</h3>' +
    '<p>Головне — послідовність. Змішувати можна, але якщо мета — американська мова, тримайся правого стовпчика й слухай серіали США.</p></div>',
  rules: [
    { t: 'Rhotic R', d: 'В американській R звучить скрізь: car, hard, teacher.', ex: [['Park the car.', 'US: «парк ðə кар»']] },
    { t: '/æ/ у dance, ask', d: 'US: «денс, еск». UK: «данс, аск».', ex: [['I can\'t dance.', 'US: «ай кент денс»']] },
    { t: 'Наголос буває різний', d: 'adVERtisement (US) vs adVERtisment (UK), garAGE (US) vs GARage (UK).', ex: [['I saw the advertisement.', 'US: «едвер-ТАЙЗ-мент»']] }
  ],
  items: [
    { en: 'water', us: 'ВО-дер', gb: 'УО-тə', usIpa: '/ˈwɑːɾɚ/', gbIpa: '/ˈwɔːtə/', uk: 'вода' },
    { en: 'schedule', us: 'СКЕ-джул', gb: 'ШЕ-дʼюл', usIpa: '/ˈskedʒuːl/', gbIpa: '/ˈʃedjuːl/', uk: 'розклад' },
    { en: 'can\'t', us: 'КЕНТ', gb: 'КАНТ', usIpa: '/kænt/', gbIpa: '/kɑːnt/', uk: 'не можу' },
    { en: 'dance', us: 'ДЕНС', gb: 'ДАНС', usIpa: '/dæns/', gbIpa: '/dɑːns/', uk: 'танцювати' },
    { en: 'tomato', us: 'тə-МЕЙ-доу', gb: 'тə-МА-тоу', usIpa: '/təˈmeɪɾoʊ/', gbIpa: '/təˈmɑːtəʊ/', uk: 'помідор' },
    { en: 'new', us: 'НУ', gb: 'НЬЮ', usIpa: '/nuː/', gbIpa: '/njuː/', uk: 'новий' },
    { en: 'duty', us: 'ДУ-ді', gb: 'ДʼЮ-ті', usIpa: '/ˈduːɾi/', gbIpa: '/ˈdjuːti/', uk: 'обовʼязок' },
    { en: 'Tuesday', us: 'ТУЗ-дей', gb: 'ТʼЮЗ-дей', usIpa: '/ˈtuːzdeɪ/', gbIpa: '/ˈtjuːzdeɪ/', uk: 'вівторок' },
    { en: 'advertisement', us: 'ед-вер-ТАЙЗ-мент', gb: 'ед-ВЕР-тіс-мент', usIpa: '/ˌædvɚˈtaɪzmənt/', gbIpa: '/ədˈvɜːtɪsmənt/', uk: 'реклама' },
    { en: 'garage', us: 'ґə-РАЖ', gb: 'ҐЕ-рідж', usIpa: '/ɡəˈrɑːʒ/', gbIpa: '/ˈɡærɑːʒ/', uk: 'гараж' },
    { en: 'herb', us: 'ЕРБ', gb: 'ХЕРБ', usIpa: '/ɜːrb/', gbIpa: '/hɜːb/', uk: 'трава, зілля', note: 'В американській H німе.' },
    { en: 'vitamin', us: 'ВАЙ-тə-мін', gb: 'ВІ-тə-мін', usIpa: '/ˈvaɪɾəmɪn/', gbIpa: '/ˈvɪtəmɪn/', uk: 'вітамін' },
    { en: 'mobile', us: 'МОУ-бл', gb: 'МОУ-байл', usIpa: '/ˈmoʊbl̩/', gbIpa: '/ˈməʊbaɪl/', uk: 'мобільний' },
    { en: 'privacy', us: 'ПРАЙ-вə-сі', gb: 'ПРІ-вə-сі', usIpa: '/ˈpraɪvəsi/', gbIpa: '/ˈprɪvəsi/', uk: 'приватність' },
    { en: 'either', us: 'І-ðер', gb: 'АЙ-ðə', usIpa: '/ˈiːðɚ/', gbIpa: '/ˈaɪðə/', uk: 'будь-який з двох' },
    { en: 'leisure', us: 'ЛІ-жер', gb: 'ЛЕ-жə', usIpa: '/ˈliːʒɚ/', gbIpa: '/ˈleʒə/', uk: 'дозвілля' },
    { en: 'route', us: 'РАУТ', gb: 'РУТ', usIpa: '/raʊt/', gbIpa: '/ruːt/', uk: 'маршрут' },
    { en: 'car', us: 'КАР (R чутно)', gb: 'КА (без R)', usIpa: '/kɑːr/', gbIpa: '/kɑː/', uk: 'авто' }
  ]
};

/* ============================================================
   9. ЗВУКИ, ЯКІ ПЛУТАЮТЬ — мінімальні пари
   ============================================================ */
const MINIMAL = {
  id: 'minimal', emoji: '👂', title: 'Пари звуків', uk: 'ship чи sheep',
  level: 'A2', kind: 'minimal',
  lead: 'В українській цих пар немає — тому вухо їх спершу не розрізняє. Це тренується.',
  intro: '<div class="intro-box orange"><h3>🎯 Чому це важко</h3>' +
    '<p>В українській один звук «і» — в англійській два: коротке <b>/ɪ/</b> (ship) і довге напружене <b>/iː/</b> (sheep). Для носія це різні слова, для нашого вуха — те саме. Так само /æ/ vs /e/, /ʊ/ vs /uː/.</p></div>' +
    '<div class="intro-box blue"><h3>🔊 Як спіймати різницю</h3>' +
    '<p><b>/ɪ/</b> — розслаблене, коротке, губи майже не рухаються. <b>/iː/</b> — губи розтягнуті в усмішку, звук довший. Спробуй: <i>ship — sheep — ship — sheep</i>.</p></div>' +
    '<div class="intro-box pink"><h3>⚠️ Куди це веде</h3>' +
    '<p>Помилка в парі змінює зміст: <i>I want to leave</i> («піти») vs <i>I want to live</i> («жити»), <i>beach</i> vs дуже грубе слово. Тому пари варто відпрацювати окремо.</p></div>',
  rules: [
    { t: '/ɪ/ vs /iː/', d: 'ship — sheep, live — leave, bit — beat.', ex: [['I want to leave.', 'довге /iː/ — «лів»']] },
    { t: '/æ/ vs /e/', d: 'bad — bed, man — men, sad — said.', ex: [['This bed is bad.', '/e/ потім /æ/']] },
    { t: '/ʊ/ vs /uː/', d: 'full — fool, pull — pool.', ex: [['The pool is full.', 'довге, потім коротке']] }
  ],
  items: [
    { a: { w: 'ship', ipa: '/ʃɪp/', uk: 'корабель' }, b: { w: 'sheep', ipa: '/ʃiːp/', uk: 'вівця' }, note: 'коротке /ɪ/ проти довгого /iː/' },
    { a: { w: 'live', ipa: '/lɪv/', uk: 'жити' }, b: { w: 'leave', ipa: '/liːv/', uk: 'залишати, їхати' }, note: 'найчастіша пара в розмові' },
    { a: { w: 'bit', ipa: '/bɪt/', uk: 'трохи' }, b: { w: 'beat', ipa: '/biːt/', uk: 'бити, ритм' }, note: 'коротке проти довгого' },
    { a: { w: 'bad', ipa: '/bæd/', uk: 'поганий' }, b: { w: 'bed', ipa: '/bed/', uk: 'ліжко' }, note: '/æ/ — рот ширше, ніж для /e/' },
    { a: { w: 'man', ipa: '/mæn/', uk: 'чоловік' }, b: { w: 'men', ipa: '/men/', uk: 'чоловіки' }, note: 'однина vs множина — лише звуком' },
    { a: { w: 'sad', ipa: '/sæd/', uk: 'сумний' }, b: { w: 'said', ipa: '/sed/', uk: 'сказав' }, note: 'said читається через /e/' },
    { a: { w: 'full', ipa: '/fʊl/', uk: 'повний' }, b: { w: 'fool', ipa: '/fuːl/', uk: 'дурень' }, note: 'коротке /ʊ/ проти довгого /uː/' },
    { a: { w: 'pull', ipa: '/pʊl/', uk: 'тягнути' }, b: { w: 'pool', ipa: '/puːl/', uk: 'басейн' }, note: 'та сама пара' },
    { a: { w: 'cat', ipa: '/kæt/', uk: 'кіт' }, b: { w: 'cut', ipa: '/kʌt/', uk: 'різати' }, note: '/æ/ спереду, /ʌ/ глибше' },
    { a: { w: 'work', ipa: '/wɜːrk/', uk: 'робота' }, b: { w: 'walk', ipa: '/wɔːk/', uk: 'гуляти' }, note: 'у walk звук L не вимовляється' },
    { a: { w: 'thin', ipa: '/θɪn/', uk: 'тонкий' }, b: { w: 'sin', ipa: '/sɪn/', uk: 'гріх' }, note: 'для /θ/ язик між зубами' },
    { a: { w: 'then', ipa: '/ðen/', uk: 'тоді' }, b: { w: 'den', ipa: '/den/', uk: 'лігво' }, note: 'дзвінке /ð/ проти /d/' },
    { a: { w: 'van', ipa: '/væn/', uk: 'фургон' }, b: { w: 'ban', ipa: '/bæn/', uk: 'заборона' }, note: '/v/ — губа й зуби, /b/ — дві губи' },
    { a: { w: 'rice', ipa: '/raɪs/', uk: 'рис' }, b: { w: 'rise', ipa: '/raɪz/', uk: 'підніматися' }, note: 'глухе /s/ проти дзвінкого /z/' },
    { a: { w: 'cheap', ipa: '/tʃiːp/', uk: 'дешевий' }, b: { w: 'jeep', ipa: '/dʒiːp/', uk: 'джип' }, note: 'глухе /tʃ/ проти дзвінкого /dʒ/' }
  ]
};

/* ============================================================
   10. ЧИСЛА, ДАТИ, ЧАС І ГРОШІ — як це читають уголос
   ============================================================ */
const NUMBERS = {
  id: 'numbers', emoji: '🔢', title: 'Числа, дати, час і гроші', uk: 'Як це читають уголос',
  level: 'B1', kind: 'say',
  lead: '$19.99 → «nineteen ninety-nine», 1984 → «nineteen eighty-four», 10:45 → «a quarter to eleven».',
  intro: '<div class="intro-box blue"><h3>🎯 Найтихіша дірка в аудіюванні</h3>' +
    '<p>Ти можеш знати тисячу слів — і не зрозуміти ціну, час чи номер рейсу. Причина в тому, що <b>записане й вимовлене — це різні речі</b>: «7:15» ніхто не читає як «seven one five», а «$19.99» звучить як «<i>nineteen ninety-nine</i>», без слова «dollars». Ці моделі треба вивчити окремо — як маленький словник.</p></div>' +
    '<div class="intro-box green"><h3>🕐 Час: дві системи одночасно</h3>' +
    '<p><b>Розмовна:</b> хвилини + <b>past</b> (до 30) або <b>to</b> (після 30): <i>a quarter past seven, ten to nine, half past three</i>. <b>Цифрова:</b> просто дві частини: <i>seven fifteen, eight fifty</i>. Американці частіше беруть другу, британці — першу. Обидві треба впізнавати на слух.</p></div>' +
    '<div class="intro-box orange"><h3>📅 Роки читають парами</h3>' +
    '<p>1984 → <i>nineteen eighty-four</i>, 1900 → <i>nineteen hundred</i>. Виняток — 2000–2009: <i>two thousand and five</i>. А з 2010-го знову парами: <i>twenty twenty-six</i>. Десятиліття — з артиклем і -s: <i>the nineteen nineties</i>.</p></div>' +
    '<div class="intro-box pink"><h3>💵 Гроші, дроби й нулі</h3>' +
    '<p>Ціну кажуть «двома шматками» без валюти: <i>$19.99 → nineteen ninety-nine</i>. У номері телефону нуль — це <b>oh</b> (AmE часто <i>zero</i>), у рахунку матчу — <b>nil</b> (BrE). Дроби: <i>3/4 → three quarters</i>, <i>0.5 → point five</i> — саме point, а не «comma».</p></div>',
  rules: [
    { t: '🕐 Час: past і to', d: 'До 30 хвилин — <b>past</b> (після), після 30 — <b>to</b> (до наступної години). 15 хвилин — <i>a quarter</i>, 30 — <i>half past</i> (без «to»). Рівна година — <i>o’clock</i> або <i>sharp</i>, якщо точно.', ex: [['It’s a quarter past seven.', '7:15 — чверть на восьму'], ['Let’s meet at ten to nine.', '8:50 — за десять девʼята'], ['The class starts at nine o’clock sharp.', 'Рівно о девʼятій']] },
    { t: '📅 Роки й дати', d: 'Рік читають двома парами цифр: <b>19-84</b>. Роки 2000–2009 — через <i>two thousand (and)</i>. У даті число — порядкове: <i>May third</i> (AmE) або <i>the third of May</i> (BrE), навіть якщо написано «May 3».', ex: [['I was born in nineteen eighty-four.', '1984'], ['It happened in two thousand and five.', '2005'], ['The deadline is the third of May.', '3 травня']] },
    { t: '💵 Ціни', d: 'Ціну з копійками кажуть як два числа поспіль, валюту часто опускають: <b>$19.99 → nineteen ninety-nine</b>. Якщо валюту називають, вона стоїть після першого числа: <i>four pounds fifty</i>.', ex: [['That’ll be nineteen ninety-nine.', '$19.99'], ['It costs four pounds fifty.', '£4.50'], ['Two fifty for a coffee?', '$2.50 — дорого!']] },
    { t: '🔢 Великі числа й «and»', d: 'Британці ставлять <b>and</b> перед останньою частиною: <i>a hundred and fifty</i>. Американці частіше без нього: <i>one hundred fifty</i>. Hundred, thousand, million після числа <b>не набувають -s</b>: <i>two hundred</i>, а не «two hundreds».', ex: [['There were about a hundred and fifty people.', '≈150 людей'], ['The company has two thousand employees.', '2 000 працівників'], ['Sales hit two point three million.', '2 300 000']] },
    { t: '🔟 Нуль має три імені', d: 'У числах і рахунку — <b>zero</b>, у номерах телефонів і кімнат — <b>oh</b>, у спортивному рахунку (BrE) — <b>nil</b>, у тенісі — <b>love</b>. Температура й математика — завжди zero.', ex: [['My room is two oh four.', 'Кімната 204'], ['They won two nil.', 'Виграли 2:0'], ['It’s five degrees below zero.', '−5°']] }
  ],
  items: [
    /* ---------- час ---------- */
    { en: '7:15', spoken: 'a quarter past seven', alt: 'seven fifteen', uk: 'чверть на восьму', ex: { en: 'The train leaves at 7:15.', spoken: 'The train leaves at a quarter past seven.', uk: 'Потяг відходить о 7:15.' }, note: 'AmE частіше каже «seven fifteen» і навіть «a quarter after seven».' },
    { en: '10:45', spoken: 'a quarter to eleven', alt: 'ten forty-five', uk: 'за чверть одинадцята', ex: { en: 'I’ll be there by 10:45.', spoken: 'I’ll be there by a quarter to eleven.', uk: 'Я буду там до 10:45.' } },
    { en: '3:30', spoken: 'half past three', alt: 'three thirty', uk: 'пів на четверту', ex: { en: 'The meeting is at 3:30.', spoken: 'The meeting is at half past three.', uk: 'Нарада о 15:30.' }, note: 'Ніколи не кажуть «half to four» — лише half past.' },
    { en: '6:05', spoken: 'five past six', alt: 'six oh five', uk: 'пʼять по шостій', ex: { en: 'He called at 6:05.', spoken: 'He called at five past six.', uk: 'Він подзвонив о 6:05.' } },
    { en: '8:50', spoken: 'ten to nine', alt: 'eight fifty', uk: 'за десять девʼята', ex: { en: 'We left at 8:50.', spoken: 'We left at ten to nine.', uk: 'Ми вийшли о 8:50.' } },
    { en: '12:00', spoken: 'twelve noon', alt: 'midday', uk: 'полудень', ex: { en: 'The office closes at 12:00.', spoken: 'The office closes at twelve noon.', uk: 'Офіс зачиняється опівдні.' }, note: 'Опівночі — midnight; «12 a.m.» плутає навіть носіїв.' },
    { en: '9:00 sharp', spoken: 'nine o’clock sharp', alt: 'nine on the dot', uk: 'рівно о девʼятій', ex: { en: 'Be here at 9:00 sharp.', spoken: 'Be here at nine o’clock sharp.', uk: 'Будь тут рівно о девʼятій.' } },
    { en: '19:30', spoken: 'seven thirty p.m.', alt: 'half past seven in the evening', uk: 'пів на восьму вечора', ex: { en: 'The show starts at 19:30.', spoken: 'The show starts at seven thirty p.m.', uk: 'Вистава починається о 19:30.' }, note: '24-годинний формат у побутовій мові майже не звучить — його одразу переводять у 12-годинний.' },
    /* ---------- дати ---------- */
    { en: 'May 3', spoken: 'May third', alt: 'the third of May', uk: 'третє травня', ex: { en: 'The exam is on May 3.', spoken: 'The exam is on May third.', uk: 'Іспит третього травня.' }, note: 'AmE: May third · BrE: the third of May. Число завжди порядкове.' },
    { en: '1st September', spoken: 'the first of September', alt: 'September first', uk: 'перше вересня', ex: { en: 'School starts on 1st September.', spoken: 'School starts on the first of September.', uk: 'Школа починається першого вересня.' } },
    { en: '1984', spoken: 'nineteen eighty-four', alt: '', uk: 'тисяча девʼятсот вісімдесят четвертий', ex: { en: 'The book came out in 1984.', spoken: 'The book came out in nineteen eighty-four.', uk: 'Книжка вийшла 1984 року.' } },
    { en: '2005', spoken: 'two thousand and five', alt: 'two thousand five', uk: 'дві тисячі пʼятий', ex: { en: 'We moved here in 2005.', spoken: 'We moved here in two thousand and five.', uk: 'Ми переїхали сюди 2005 року.' }, note: 'Роки 2000–2009 — єдиний виняток із читання парами.' },
    { en: '2026', spoken: 'twenty twenty-six', alt: 'two thousand and twenty-six', uk: 'дві тисячі двадцять шостий', ex: { en: 'The contract ends in 2026.', spoken: 'The contract ends in twenty twenty-six.', uk: 'Договір завершується 2026 року.' } },
    { en: '1900', spoken: 'nineteen hundred', alt: '', uk: 'тисяча девʼятисотий', ex: { en: 'The house was built in 1900.', spoken: 'The house was built in nineteen hundred.', uk: 'Будинок збудовано 1900 року.' } },
    { en: 'the 1990s', spoken: 'the nineteen nineties', alt: 'the nineties', uk: 'девʼяності роки', ex: { en: 'It was popular in the 1990s.', spoken: 'It was popular in the nineteen nineties.', uk: 'Це було популярно в девʼяності.' } },
    { en: 'the 4th of July', spoken: 'the fourth of July', alt: '', uk: 'четверте липня', ex: { en: 'We fly out on the 4th of July.', spoken: 'We fly out on the fourth of July.', uk: 'Ми вилітаємо четвертого липня.' } },
    /* ---------- числа ---------- */
    { en: '150', spoken: 'a hundred and fifty', alt: 'one hundred fifty', uk: 'сто пʼятдесят', ex: { en: 'About 150 people came.', spoken: 'About a hundred and fifty people came.', uk: 'Прийшло близько 150 людей.' }, note: 'BrE вимагає «and», AmE його часто пропускає.' },
    { en: '1,500', spoken: 'fifteen hundred', alt: 'one thousand five hundred', uk: 'тисяча пʼятсот', ex: { en: 'The flight costs 1,500 dollars.', spoken: 'The flight costs fifteen hundred dollars.', uk: 'Переліт коштує 1500 доларів.' }, note: 'Круглі числа до 9900 часто читають сотнями: 2 400 → twenty-four hundred.' },
    { en: '2,300,000', spoken: 'two point three million', alt: 'two million three hundred thousand', uk: 'два мільйони триста тисяч', ex: { en: 'The city has 2,300,000 residents.', spoken: 'The city has two point three million residents.', uk: 'У місті 2,3 мільйона мешканців.' } },
    { en: '0.5', spoken: 'point five', alt: 'zero point five', uk: 'нуль цілих пʼять десятих', ex: { en: 'Add 0.5 litres of water.', spoken: 'Add point five litres of water.', uk: 'Додай 0,5 літра води.' }, note: 'Десятковий роздільник — крапка, і читають її як point, а не «comma».' },
    { en: '3/4', spoken: 'three quarters', alt: 'three fourths', uk: 'три чверті', ex: { en: 'Nearly 3/4 of the class passed.', spoken: 'Nearly three quarters of the class passed.', uk: 'Майже три чверті класу склали.' } },
    { en: '1½', spoken: 'one and a half', alt: '', uk: 'півтора', ex: { en: 'It took 1½ hours.', spoken: 'It took one and a half hours.', uk: 'Це зайняло півтори години.' } },
    { en: '25%', spoken: 'twenty-five percent', alt: 'a quarter', uk: 'двадцять пʼять відсотків', ex: { en: 'Everything is 25% off today.', spoken: 'Everything is twenty-five percent off today.', uk: 'Сьогодні все зі знижкою 25%.' } },
    { en: '204', spoken: 'two oh four', alt: 'two hundred and four', uk: 'двісті чотири (номер кімнати)', ex: { en: 'I’m in room 204.', spoken: 'I’m in room two oh four.', uk: 'Я в кімнаті 204.' }, note: 'У номерах кімнат, рейсів і телефонів нуль — це «oh».' },
    { en: '555-0132', spoken: 'five five five, oh one three two', alt: 'triple five, oh one three two', uk: 'номер телефону', ex: { en: 'Call me on 555-0132.', spoken: 'Call me on five five five, oh one three two.', uk: 'Дзвони на 555-0132.' }, note: 'Цифри читають по одній; BrE любить «double»/«triple» для повторів.' },
    { en: '2-0', spoken: 'two nil', alt: 'two to nothing', uk: 'два-нуль (рахунок)', ex: { en: 'They won 2-0.', spoken: 'They won two nil.', uk: 'Вони виграли 2:0.' }, note: 'nil — британський футбол; AmE каже «two to nothing» або «two zero».' },
    { en: '21st', spoken: 'twenty-first', alt: '', uk: 'двадцять перший', ex: { en: 'It’s his 21st birthday.', spoken: 'It’s his twenty-first birthday.', uk: 'Це його двадцять перший день народження.' } },
    /* ---------- гроші ---------- */
    { en: '$19.99', spoken: 'nineteen ninety-nine', alt: 'nineteen dollars and ninety-nine cents', uk: 'девʼятнадцять доларів девʼяносто девʼять', ex: { en: 'That’ll be $19.99.', spoken: 'That’ll be nineteen ninety-nine.', uk: 'З вас $19.99.' }, note: 'Повну форму кажуть хіба що в банку чи в суді.' },
    { en: '£4.50', spoken: 'four pounds fifty', alt: 'four fifty', uk: 'чотири фунти пʼятдесят', ex: { en: 'A coffee is £4.50 here.', spoken: 'A coffee is four pounds fifty here.', uk: 'Кава тут £4.50.' } },
    { en: '€1,200', spoken: 'twelve hundred euros', alt: 'one thousand two hundred euros', uk: 'тисяча двісті євро', ex: { en: 'The rent is €1,200 a month.', spoken: 'The rent is twelve hundred euros a month.', uk: 'Оренда — €1200 на місяць.' } },
    { en: '50¢', spoken: 'fifty cents', alt: 'half a dollar', uk: 'пʼятдесят центів', ex: { en: 'It only costs 50¢.', spoken: 'It only costs fifty cents.', uk: 'Це коштує лише 50 центів.' } },
    { en: '$1.5M', spoken: 'one and a half million dollars', alt: 'one point five million dollars', uk: 'півтора мільйона доларів', ex: { en: 'They raised $1.5M.', spoken: 'They raised one and a half million dollars.', uk: 'Вони залучили $1,5 млн.' } },
    /* ---------- міри ---------- */
    { en: '6 ft 2', spoken: 'six foot two', alt: 'six feet two inches', uk: 'шість футів два дюйми (≈188 см)', ex: { en: 'He’s 6 ft 2.', spoken: 'He’s six foot two.', uk: 'Він шість футів два (≈188 см).' }, note: 'Про зріст кажуть саме «six foot two», однина — це виняток.' },
    { en: '72°F', spoken: 'seventy-two degrees', alt: 'seventy-two degrees Fahrenheit', uk: 'сімдесят два за Фаренгейтом (≈22 °C)', ex: { en: 'It’s 72°F outside.', spoken: 'It’s seventy-two degrees outside.', uk: 'Надворі 72 °F (≈22 °C).' }, note: 'У США шкалу не називають — вона зрозуміла з контексту.' },
    { en: 'flight AA 1120', spoken: 'flight A A eleven twenty', alt: 'flight A A one one two oh', uk: 'рейс AA 1120', ex: { en: 'Flight AA 1120 is now boarding.', spoken: 'Flight A A eleven twenty is now boarding.', uk: 'Розпочато посадку на рейс AA 1120.' }, note: 'Номери рейсів і поїздів читають парами — так швидше.' }
  ]
};

const TOPICS = [FLAP, GLOTTAL, LINKING, WEAK, ENDINGS, STRESS, NUMBERS, TRICKY, AMEBRE, MINIMAL];
const GROUPS = [
  { id: 'pr-sounds', emoji: '🔊', title: 'Звуки в потоці мови', items: ['flap', 'glottal', 'linking', 'weak'] },
  { id: 'pr-rules', emoji: '📐', title: 'Правила читання', items: ['endings', 'stress', 'numbers'] },
  { id: 'pr-traps', emoji: '🪤', title: 'Пастки й відмінності', items: ['tricky', 'variant', 'minimal'] }
];
const META = {
  title: '🗣️ Американська вимова',
  lead: 'Чому «water» звучить як «вОдер», куди зникає T у «button» і як почути різницю між ship і sheep. Десять тем із прикладами, озвученням і вправами на слух.'
};

return { TOPICS: TOPICS, GROUPS: GROUPS, META: META };
})();
