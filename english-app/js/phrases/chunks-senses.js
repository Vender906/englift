/* EngLift — значення багатозначних скорочень у тренажері «chunks».
   Кожне скорочення, що має кілька різних значень, отримує розклад із прикладами.
   Вантажиться слідом за chunks-data.js. */
(function () {
  const D = window.PHRASE_DATA && window.PHRASE_DATA['chunks'];
  if (!D) return;

  const SENSES = {
    outta: [
      { uk: 'Вийти / бути назовні з чогось', en: 'He walked <b>outta</b> the room without a word.', exUk: 'Він вийшов з кімнати, не сказавши ні слова.' },
      { uk: 'Дістати щось із чогось', en: 'She pulled a coin <b>outta</b> her pocket.', exUk: 'Вона дістала монету з кишені.' },
      { uk: 'Закінчитися, не залишитися', en: 'We are <b>outta</b> milk again.', exUk: 'У нас знову закінчилося молоко.' },
      { uk: 'Втекти, забратися з місця', en: 'Let us get <b>outta</b> here!', exUk: 'Забираймося звідси!' },
      { uk: 'Зробити щось із матеріалу', en: 'He built the shed <b>outta</b> old boards.', exUk: 'Він збудував сарай зі старих дощок.' },
      { uk: 'Через щось, з якоїсь причини', en: 'I asked <b>outta</b> curiosity, not to judge.', exUk: 'Я спитав із цікавості, а не щоб осудити.' },
      { uk: 'Вибір із певної кількості', en: 'Nine <b>outta</b> ten people say yes.', exUk: 'Девʼять із десяти людей кажуть «так».' }
    ],
    gonna: [
      { uk: 'Намір: я вже вирішив це зробити', en: 'I am <b>gonna</b> call him tonight.', exUk: 'Я подзвоню йому сьогодні ввечері.' },
      { uk: 'Прогноз: видно, що так станеться', en: 'Look at those clouds — it is <b>gonna</b> rain.', exUk: 'Глянь на хмари — буде дощ.' },
      { uk: 'Обіцянка або погроза', en: 'You are <b>gonna</b> regret this.', exUk: 'Ти про це пошкодуєш.' }
    ],
    wanna: [
      { uk: 'want to — хотіти щось зробити', en: 'I <b>wanna</b> go home.', exUk: 'Хочу додому.' },
      { uk: 'want a — хотіти якусь річ', en: 'I <b>wanna</b> coffee, please.', exUk: 'Хочу каву, будь ласка.' },
      { uk: 'Запрошення у формі питання', en: '<b>Wanna</b> grab lunch?', exUk: 'Пообідаємо разом?' }
    ],
    gotta: [
      { uk: 'have got to — мусити, бути зобовʼязаним', en: 'I <b>gotta</b> go, sorry.', exUk: 'Мені треба йти, вибач.' },
      { uk: 'have got a — мати якусь річ', en: 'He <b>gotta</b> new phone last week.', exUk: 'Він минулого тижня придбав новий телефон.' },
      { uk: 'У питанні: чи є в тебе…', en: '<b>Gotta</b> minute?', exUk: 'Маєш хвилинку?' }
    ],
    kinda: [
      { uk: 'Трохи, певною мірою', en: 'It is <b>kinda</b> cold in here.', exUk: 'Тут трохи холодно.' },
      { uk: 'Щось на кшталт (kind of a)', en: 'It is <b>kinda</b> like a soup, but thicker.', exUk: 'Це щось на кшталт супу, тільки густіше.' },
      { uk: 'Помʼякшує дієслово: «наче», «якось»', en: 'I <b>kinda</b> forgot about it.', exUk: 'Я якось про це забув.' }
    ],
    "ain't": [
      { uk: 'am not / is not / are not', en: 'I <b>ain\'t</b> hungry right now.', exUk: 'Я зараз не голодний.' },
      { uk: 'have not / has not', en: 'He <b>ain\'t</b> seen the new episode yet.', exUk: 'Він ще не бачив нову серію.' },
      { uk: 'do not / does not (діалектне)', en: 'She <b>ain\'t</b> got a clue.', exUk: 'Вона й гадки не має.' }
    ],
    gotcha: [
      { uk: 'Зрозумів, ясно', en: '<b>Gotcha</b> — six o\'clock at the station.', exUk: 'Зрозумів — о шостій на вокзалі.' },
      { uk: 'Спіймав, тримаю (фізично)', en: '<b>Gotcha</b>! I caught the ball.', exUk: 'Спіймав! М\'яч мій.' },
      { uk: 'Каверзне питання, підлов', en: 'That was a <b>gotcha</b> question.', exUk: 'Це було каверзне питання.' }
    ],
    "c'mon": [
      { uk: 'Ходімо, давай (спонукання до дії)', en: '<b>C\'mon</b>, we are already late.', exUk: 'Ходімо, ми вже й так спізнюємося.' },
      { uk: 'Та годі, не вигадуй (недовіра)', en: 'Oh <b>c\'mon</b>, that is not true.', exUk: 'Та годі, це неправда.' },
      { uk: 'Ну будь ласка (умовляння)', en: '<b>C\'mon</b>, just one more episode.', exUk: 'Ну будь ласка, ще одну серію.' }
    ],
    whatcha: [
      { uk: 'what are you — що ти зараз робиш', en: '<b>Whatcha</b> doing tonight?', exUk: 'Що робиш сьогодні ввечері?' },
      { uk: 'what do you — що ти думаєш / хочеш', en: '<b>Whatcha</b> think about this one?', exUk: 'Що думаєш про цей варіант?' },
      { uk: 'what have you — що в тебе є', en: '<b>Whatcha</b> got there?', exUk: 'Що це в тебе там?' }
    ],
    ya: [
      { uk: 'you — ти, тебе', en: 'See <b>ya</b> tomorrow!', exUk: 'До завтра!' },
      { uk: 'your — твій', en: 'Grab <b>ya</b> coat, it is freezing.', exUk: 'Бери куртку, надворі мороз.' },
      { uk: 'yeah — так (у письмі)', en: '<b>Ya</b>, sounds good to me.', exUk: 'Ага, мене влаштовує.' }
    ],
    gimme: [
      { uk: 'Дай мені (пряме прохання)', en: '<b>Gimme</b> the keys, I will drive.', exUk: 'Дай ключі, я поведу.' },
      { uk: 'Дай мені (часу): секунду, хвилину', en: '<b>Gimme</b> a sec, I am almost done.', exUk: 'Дай секунду, я майже закінчив.' },
      { uk: 'gimme a break — та годі, не смішіть', en: '<b>Gimme</b> a break, he cannot be serious.', exUk: 'Та годі, він же не серйозно.' }
    ],
    "y'know": [
      { uk: 'Філлер: заповнює паузу в думці', en: 'It is, <b>y\'know</b>, complicated.', exUk: 'Це, ну, складно.' },
      { uk: 'Апеляція: ти ж памʼятаєш його?', en: '<b>Y\'know</b> Dave? He called yesterday.', exUk: 'Памʼятаєш Дейва? Він учора дзвонив.' },
      { uk: 'Перевірка: ти розумієш, про що я', en: 'It just felt wrong, <b>y\'know</b>?', exUk: 'Просто відчувалося неправильно, розумієш?' }
    ],
    betcha: [
      { uk: 'you betcha — авжеж, звісно', en: 'Need a hand? — <b>You betcha</b>.', exUk: 'Потрібна допомога? — Авжеж.' },
      { uk: 'I betcha — бʼюсь об заклад', en: 'I <b>betcha</b> he forgets again.', exUk: 'Бʼюсь об заклад, він знову забуде.' }
    ],
    "cuz / 'cause": [
      { uk: 'because — бо, тому що', en: 'I left early <b>cuz</b> I was tired.', exUk: 'Я пішов раніше, бо втомився.' },
      { uk: 'Звертання до друга (AmE, від cousin)', en: 'What is up, <b>cuz</b>?', exUk: 'Як справи, бро?' }
    ],
    "wassup / 'sup": [
      { uk: 'Привітання: як справи?', en: '<b>Sup</b>, man? Long time no see.', exUk: 'Як воно? Давно не бачилися.' },
      { uk: 'Справжнє питання: що сталося?', en: 'What is <b>up</b> with your phone?', exUk: 'Що з твоїм телефоном?' }
    ],
    imma: [
      { uk: 'Я збираюся (намір на майбутнє)', en: '<b>Imma</b> call her later.', exUk: 'Я подзвоню їй пізніше.' },
      { uk: 'Я просто зараз це роблю', en: '<b>Imma</b> head out, see you.', exUk: 'Я пішов, бувай.' }
    ],
    innit: [
      { uk: 'isn\'t it — хіба ні? (питальний хвіст)', en: 'Lovely day, <b>innit</b>?', exUk: 'Гарний день, правда ж?' },
      { uk: 'Універсальний хвіст замість будь-якого (BrE)', en: 'They already left, <b>innit</b>?', exUk: 'Вони вже пішли, так?' }
    ],
    dontcha: [
      { uk: 'don\'t you — питальний хвіст', en: 'You like it, <b>dontcha</b>?', exUk: 'Тобі ж подобається, правда?' },
      { uk: 'dontcha know — регіональна вставка', en: 'It gets cold here, <b>dontcha</b> know.', exUk: 'Тут буває холодно, знаєш.' }
    ],
    "how'd / what'd / where'd": [
      { uk: '\'d = did — питання про минуле', en: '<b>How\'d</b> you do that?', exUk: 'Як ти це зробив?' },
      { uk: '\'d = would — пропозиція або припущення', en: '<b>How\'d</b> you like some coffee?', exUk: 'Може, кави?' },
      { uk: '\'d = had — дія до іншої дії в минулому', en: 'She told me where\'d he been all night.', exUk: 'Вона розповіла, де він був усю ніч.' }
    ]
  };

  /* коротка підказка в шапці картки — щоб було видно, що значень кілька */
  const UK_OVERRIDE = {
    outta: 'з / із чогось — 7 значень',
    gotcha: 'зрозумів / спіймав / підлов',
    "c'mon": 'ходімо / та годі / ну будь ласка',
    ya: 'ти / твій / так',
    "cuz / 'cause": 'бо / звертання до друга'
  };

  const TIPS = {
    outta: '💡 Окремо варто запамʼятати <b>outta nowhere</b> — «як грім серед ясного неба»: <i>He came outta nowhere.</i>',
    gonna: '⚠️ Про рух «gonna» не кажуть: <i>I\'m going to the store</i> не скорочується до «gonna the store».',
    gotta: '⚠️ Значення «мати річ» (got a) чують рідше — його впізнають за іменником одразу після gotta.'
  };

  const by = {};
  D.MARKERS.forEach(m => { by[m.name] = m; });
  Object.keys(SENSES).forEach(name => {
    const m = by[name];
    if (!m) return;
    m.senses = SENSES[name];
    if (UK_OVERRIDE[name]) m.uk = UK_OVERRIDE[name];
    if (TIPS[name]) m.tip = (m.tip ? m.tip + ' ' : '') + TIPS[name];
  });
})();
