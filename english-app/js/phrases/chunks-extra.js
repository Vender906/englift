/* EngLift — доповнення до тренажера «chunks»: компліменти, співчуття, самопочуття,
   стосунки й сучасний розмовний сленг. Вантажиться слідом за chunks-data.js. */
(function () {
  const D = window.PHRASE_DATA && window.PHRASE_DATA['chunks'];
  if (!D) return;

  const CATS = {
    compliment: { emoji: '🌟', label: 'Компліменти й похвала', desc: 'You look great / Nice job' },
    sympathy: { emoji: '🤍', label: 'Співчуття й втішання', desc: 'I am so sorry / That is rough' },
    health: { emoji: '🤒', label: 'Самопочуття й здоровʼя', desc: 'I do not feel well / Get well soon' },
    love: { emoji: '💞', label: 'Стосунки й побачення', desc: 'I have a crush on / We broke up' },
    slang: { emoji: '🛹', label: 'Сучасний сленг', desc: 'lowkey / no cap / it slaps' }
  };

  const MARKERS = [
    /* ---------------- КОМПЛІМЕНТИ ---------------- */
    { name: 'You look great', uk: 'Ти чудово виглядаєш', emoji: '🌟', cat: 'compliment', lvl: 'A2', reg: 'casual', when: 'Найбезпечніший комплімент зовнішності. Безпечніше за «you are beautiful» — про вигляд, а не про людину.', examples: [{ en: '<b>You look great</b> — did you get a haircut?', uk: 'Ти чудово виглядаєш — підстригся?' }], dialog: { a: 'Hey! Long time no see.', b: 'You look great — did you get a haircut?' } },
    { name: 'That is really impressive', uk: 'Це справді вражає', emoji: '👏', cat: 'compliment', lvl: 'B1', reg: 'neutral', when: 'Похвала за досягнення — роботу, спорт, навчання.', examples: [{ en: 'You did it in two weeks? <b>That is really impressive.</b>', uk: 'Ти зробив це за два тижні? Це справді вражає.' }] },
    { name: 'You did an amazing job', uk: 'Ти зробив неймовірну роботу', emoji: '🏅', cat: 'compliment', lvl: 'B1', reg: 'neutral', when: 'Конкретна похвала за виконану справу — на роботі й поза нею.', examples: [{ en: '<b>You did an amazing job</b> with the party.', uk: 'Ти неймовірно все організував із цією вечіркою.' }] },
    { name: 'I am proud of you', uk: 'Я тобою пишаюся', emoji: '🥹', cat: 'compliment', lvl: 'A2', reg: 'casual', when: 'Найтепліша фраза підтримки — від близької людини.', examples: [{ en: 'You finished it — <b>I am proud of you</b>.', uk: 'Ти таки завершив — я тобою пишаюся.' }] },
    { name: 'Way to go', uk: 'Молодець! Так тримати!', emoji: '🎉', cat: 'compliment', lvl: 'B1', reg: 'casual', when: 'Коротке американське «молодець» — одразу після успіху.', examples: [{ en: 'You passed? <b>Way to go!</b>', uk: 'Склав? Молодець!' }], dialog: { a: 'I passed the exam!', b: 'Way to go!' } },
    { name: 'Keep it up', uk: 'Так тримати', emoji: '💪', cat: 'compliment', lvl: 'A2', reg: 'casual', when: 'Похвала за процес, а не за результат: продовжуй у тому ж дусі.', examples: [{ en: 'Great progress — <b>keep it up!</b>', uk: 'Чудовий прогрес — так тримати!' }] },
    { name: 'It suits you', uk: 'Тобі пасує', emoji: '👗', cat: 'compliment', lvl: 'B1', reg: 'casual', when: 'Про одяг, зачіску, окуляри. Про розмір кажуть it fits you.', examples: [{ en: 'Nice jacket — <b>it suits you</b>.', uk: 'Гарна куртка — тобі пасує.' }], tip: '💡 suit = пасує за стилем, fit = підходить за розміром.' },
    { name: 'That means a lot', uk: 'Це для мене багато значить', emoji: '💗', cat: 'compliment', lvl: 'B1', reg: 'casual', when: 'Відповідь на комплімент чи підтримку — тепліша за просте «thanks».', examples: [{ en: 'Thank you — <b>that means a lot</b>.', uk: 'Дякую — це для мене багато значить.' }], dialog: { a: 'You handled that really well.', b: 'Thank you — that means a lot.' } },
    { name: 'I could not have done it without you', uk: 'Без тебе я б не впорався', emoji: '🤝', cat: 'compliment', lvl: 'B2', reg: 'neutral', when: 'Подяка за реальну допомогу — сильніша за «thanks for help».', examples: [{ en: '<b>I could not have done it without you.</b>', uk: 'Без тебе я б не впорався.' }] },
    { name: 'You are a lifesaver', uk: 'Ти мене врятував', emoji: '🛟', cat: 'compliment', lvl: 'B1', reg: 'casual', when: 'Коли хтось виручив у скрутний момент.', examples: [{ en: 'You brought my charger? <b>You are a lifesaver!</b>', uk: 'Ти привіз мою зарядку? Ти мене врятував!' }] },
    { name: 'You deserve it', uk: 'Ти на це заслужив', emoji: '🏆', cat: 'compliment', lvl: 'B1', reg: 'casual', when: 'Реакція на чужий успіх — підвищення, нагороду, відпустку.', examples: [{ en: 'Congrats on the promotion — <b>you deserve it</b>.', uk: 'Вітаю з підвищенням — ти на це заслужив.' }] },
    { name: 'I really appreciate it', uk: 'Я дуже це ціную', emoji: '🙏', cat: 'compliment', lvl: 'B1', reg: 'neutral', when: 'Ввічлива подяка, доречна і в роботі, і в побуті.', examples: [{ en: 'Thanks for covering for me — <b>I really appreciate it</b>.', uk: 'Дякую, що прикрив мене, — дуже це ціную.' }] },

    /* ---------------- СПІВЧУТТЯ Й ПІДТРИМКА ---------------- */
    { name: 'I am so sorry to hear that', uk: 'Мені дуже прикро це чути', emoji: '🤍', cat: 'sympathy', lvl: 'B1', reg: 'neutral', when: 'Перша реакція на погану новину. Sorry тут — співчуття, а не вибачення.', examples: [{ en: '<b>I am so sorry to hear that.</b> How are you holding up?', uk: 'Мені дуже прикро це чути. Як ти тримаєшся?' }], dialog: { a: 'My grandmother passed away last week.', b: "I'm so sorry to hear that." } },
    { name: 'That is rough', uk: 'Це важко, співчуваю', emoji: '😔', cat: 'sympathy', lvl: 'B1', reg: 'casual', when: 'Коротке дружнє співчуття без пафосу.', examples: [{ en: 'Two exams in one day? <b>That is rough.</b>', uk: 'Два іспити за день? Це важко.' }] },
    { name: 'I am here for you', uk: 'Я поруч, якщо що', emoji: '🫂', cat: 'sympathy', lvl: 'B1', reg: 'casual', when: 'Пропозиція підтримки без конкретних порад.', examples: [{ en: 'Whatever you decide, <b>I am here for you</b>.', uk: 'Що б ти не вирішив, я поруч.' }] },
    { name: 'I am rooting for you', uk: 'Я вболіваю за тебе', emoji: '📣', cat: 'sympathy', lvl: 'B2', reg: 'casual', when: 'Тепліше за «good luck»: я на твоєму боці й чекаю твоєї перемоги.', examples: [{ en: 'Whatever happens, <b>I am rooting for you</b>.', uk: 'Що б не сталося, я вболіваю за тебе.' }], dialog: { a: 'The interview is tomorrow.', b: "I'm rooting for you." } },
    { name: 'You have got this', uk: 'Ти впораєшся', emoji: '🔥', cat: 'sympathy', lvl: 'B1', reg: 'casual', when: 'Перед іспитом, співбесідою, виступом.', examples: [{ en: 'Go in there — <b>you have got this</b>.', uk: 'Іди — ти впораєшся.' }] },
    { name: 'Let me know if you need anything', uk: 'Кажи, якщо щось буде потрібно', emoji: '📞', cat: 'sympathy', lvl: 'B1', reg: 'neutral', when: 'Ввічлива пропозиція допомоги, коли не знаєш, чим саме допомогти.', examples: [{ en: '<b>Let me know if you need anything</b>, okay?', uk: 'Кажи, якщо щось буде потрібно, добре?' }] },
    { name: 'It is not your fault', uk: 'Це не твоя провина', emoji: '🕊️', cat: 'sympathy', lvl: 'A2', reg: 'casual', when: 'Знімає з людини почуття провини.', examples: [{ en: 'Hey, <b>it is not your fault</b>.', uk: 'Слухай, це не твоя провина.' }] },
    { name: 'Take all the time you need', uk: 'Не поспішай, візьми стільки часу, скільки треба', emoji: '⏳', cat: 'sympathy', lvl: 'B1', reg: 'neutral', when: 'Коли людині потрібен час — на роботі чи в житті.', examples: [{ en: '<b>Take all the time you need.</b>', uk: 'Не поспішай, часу скільки треба.' }] },
    { name: 'These things happen', uk: 'Буває, з усіма таке трапляється', emoji: '🤷', cat: 'sympathy', lvl: 'B1', reg: 'casual', when: 'Заспокоюєш того, хто припустився помилки.', examples: [{ en: 'Do not beat yourself up — <b>these things happen</b>.', uk: 'Не картай себе — буває.' }], dialog: { a: 'I deleted the whole file.', b: "Don't beat yourself up — these things happen." } },
    { name: 'Everything is going to be okay', uk: 'Усе буде добре', emoji: '🌤️', cat: 'sympathy', lvl: 'A2', reg: 'casual', when: 'Найпростіше втішання в момент паніки.', examples: [{ en: 'Breathe. <b>Everything is going to be okay.</b>', uk: 'Дихай. Усе буде добре.' }] },

    /* ---------------- САМОПОЧУТТЯ ---------------- */
    { name: 'I do not feel well', uk: 'Я погано почуваюся', emoji: '🤒', cat: 'health', lvl: 'A2', reg: 'neutral', when: 'Базова фраза про нездужання — доречна і в лікаря, і в листі на роботу.', examples: [{ en: 'I am going home, <b>I do not feel well</b>.', uk: 'Я йду додому, погано почуваюся.' }] },
    { name: 'I have a headache', uk: 'У мене болить голова', emoji: '🤕', cat: 'health', lvl: 'A2', reg: 'neutral', when: 'Модель «I have a + біль»: a sore throat, a fever, a cough.', examples: [{ en: '<b>I have a headache</b> and a sore throat.', uk: 'У мене болить голова й горло.' }], tip: '💡 Англійською хворобу «мають»: I have a cold, а не «I am cold» (це «мені холодно»).' },
    { name: 'It hurts here', uk: 'Болить ось тут', emoji: '👉', cat: 'health', lvl: 'A2', reg: 'neutral', when: 'Показуєш лікарю місце болю. Про орган: my back hurts.', examples: [{ en: '<b>It hurts here</b>, when I press.', uk: 'Болить ось тут, коли натискаю.' }] },
    { name: 'I am coming down with something', uk: 'Здається, я захворюю', emoji: '🤧', cat: 'health', lvl: 'B1', reg: 'casual', when: 'Симптоми тільки почалися й діагнозу ще немає.', examples: [{ en: 'I think <b>I am coming down with something</b>.', uk: 'Здається, я захворюю.' }] },
    { name: 'I need to see a doctor', uk: 'Мені треба до лікаря', emoji: '🩺', cat: 'health', lvl: 'A2', reg: 'neutral', when: 'У США та Британії спершу телефонують і записуються на appointment.', examples: [{ en: '<b>I need to see a doctor</b> today if possible.', uk: 'Мені треба до лікаря, якщо можливо, сьогодні.' }] },
    { name: 'How are you feeling', uk: 'Як ти себе почуваєш?', emoji: '💬', cat: 'health', lvl: 'A2', reg: 'casual', when: 'Питання до того, хто хворів або переживав складний момент — не плутати з «how are you».', examples: [{ en: '<b>How are you feeling</b> today?', uk: 'Як ти сьогодні почуваєшся?' }], dialog: { a: 'How are you feeling today?', b: 'A bit better, thanks.' } },
    { name: 'Get well soon', uk: 'Одужуй швидше', emoji: '🌷', cat: 'health', lvl: 'A2', reg: 'casual', when: 'Побажання хворому — у повідомленні чи листівці.', examples: [{ en: '<b>Get well soon!</b> We miss you at the office.', uk: 'Одужуй швидше! Нам тебе бракує в офісі.' }] },
    { name: 'Take care of yourself', uk: 'Бережи себе', emoji: '🧣', cat: 'health', lvl: 'A2', reg: 'casual', when: 'І побажання здоровʼя, і тепле прощання.', examples: [{ en: 'Rest up and <b>take care of yourself</b>.', uk: 'Відпочивай і бережи себе.' }] },
    { name: 'I am exhausted', uk: 'Я виснажений', emoji: '🪫', cat: 'health', lvl: 'B1', reg: 'casual', when: 'Сильніше за tired. Перед ним не кажуть very — лише absolutely / completely.', examples: [{ en: 'After that week I am absolutely <b>exhausted</b>.', uk: 'Після такого тижня я геть виснажений.' }] },
    { name: 'I could not sleep', uk: 'Я не міг заснути', emoji: '🌙', cat: 'health', lvl: 'A2', reg: 'casual', when: 'Найчастіше пояснення поганого вигляду зранку.', examples: [{ en: '<b>I could not sleep</b> last night at all.', uk: 'Я взагалі не міг заснути вночі.' }] },

    /* ---------------- СТОСУНКИ ---------------- */
    { name: 'Do you want to grab a coffee sometime', uk: 'Може, якось вип’ємо кави?', emoji: '☕', cat: 'love', lvl: 'B1', reg: 'casual', when: 'Найбезпечніше запрошення: і як побачення, і як дружня зустріч.', examples: [{ en: '<b>Do you want to grab a coffee sometime?</b>', uk: 'Може, якось вип’ємо кави?' }], dialog: { a: 'Do you want to grab a coffee sometime?', b: 'Sure, how about Friday?' } },
    { name: 'We are seeing each other', uk: 'Ми зустрічаємося', emoji: '💑', cat: 'love', lvl: 'B1', reg: 'casual', when: 'Рання стадія, ще без офіційного статусу.', examples: [{ en: '<b>We are seeing each other</b>, but it is early.', uk: 'Ми зустрічаємося, але це ще початок.' }] },
    { name: 'I have a crush on someone', uk: 'Мені хтось подобається', emoji: '💘', cat: 'love', lvl: 'B1', reg: 'casual', when: 'Про закоханість без стосунків — часто ще й таємну.', examples: [{ en: 'I think <b>I have a crush on</b> him.', uk: 'Здається, я в нього закохалася.' }] },
    { name: 'We are just friends', uk: 'Ми просто друзі', emoji: '🙌', cat: 'love', lvl: 'A2', reg: 'casual', when: 'Найчастіша відповідь на натяки.', examples: [{ en: 'No, <b>we are just friends</b>.', uk: 'Ні, ми просто друзі.' }] },
    { name: 'We broke up', uk: 'Ми розійшлися', emoji: '💔', cat: 'love', lvl: 'B1', reg: 'casual', when: 'Про розрив стосунків. Про розлучення — we got divorced.', examples: [{ en: '<b>We broke up</b> a month ago.', uk: 'Ми розійшлися місяць тому.' }] },
    { name: 'It is not you, it is me', uk: 'Річ не в тобі, а в мені', emoji: '🙃', cat: 'love', lvl: 'B1', reg: 'casual', when: 'Кліше розставання — усі його знають і всі з нього жартують.', examples: [{ en: 'Please do not say «<b>it is not you, it is me</b>».', uk: 'Тільки не кажи «річ не в тобі, а в мені».' }] },
    { name: 'We are taking it slow', uk: 'Ми не поспішаємо', emoji: '🐢', cat: 'love', lvl: 'B1', reg: 'casual', when: 'Свідомий темп у нових стосунках.', examples: [{ en: '<b>We are taking it slow</b> this time.', uk: 'Цього разу ми не поспішаємо.' }] },
    { name: 'He is not my type', uk: 'Він не в моєму смаку', emoji: '🤔', cat: 'love', lvl: 'B1', reg: 'casual', when: 'Мʼяка відмова від знайомства.', examples: [{ en: 'He is nice, but <b>he is not my type</b>.', uk: 'Він хороший, але не в моєму смаку.' }] },
    { name: 'We hit it off', uk: 'Ми одразу порозумілися', emoji: '✨', cat: 'love', lvl: 'B2', reg: 'casual', when: 'Про вдале перше побачення чи знайомство.', examples: [{ en: '<b>We hit it off</b> right away.', uk: 'Ми одразу знайшли спільну мову.' }] },
    { name: 'You are the one', uk: 'Ти — та сама людина', emoji: '💍', cat: 'love', lvl: 'B1', reg: 'casual', when: 'Кіношна, але жива фраза про «того самого». Повна форма — «You are the one for me».', examples: [{ en: 'I knew right away <b>you were the one</b>.', uk: 'Я одразу знав, що ти — та сама.' }] },
    { name: 'I am not ready for anything serious', uk: 'Я не готовий до серйозного', emoji: '🚧', cat: 'love', lvl: 'B2', reg: 'casual', when: 'Чесна межа на початку стосунків.', examples: [{ en: '<b>I am not ready for anything serious</b> right now.', uk: 'Зараз я не готовий до чогось серйозного.' }] },

    /* ---------------- СЛЕНГ ---------------- */
    { name: 'lowkey', uk: 'трохи, потай, якщо чесно', emoji: '🤫', cat: 'slang', lvl: 'B2', reg: 'casual', when: 'Помʼякшує зізнання: «lowkey хочу додому». Протилежне — highkey (відверто).', examples: [{ en: 'I am <b>lowkey</b> nervous about tomorrow.', uk: 'Я трохи нервуюся через завтра.' }], tip: '⚠️ Лише в неформальному спілкуванні — на роботі так не пишуть.' },
    { name: 'no cap', uk: 'без брехні, серйозно', emoji: '🧢', cat: 'slang', lvl: 'B2', reg: 'casual', when: 'Молодіжне «клянуся». Cap = брехня.', examples: [{ en: 'That was the best pizza ever, <b>no cap</b>.', uk: 'Це була найкраща піца, серйозно.' }] },
    { name: 'it slaps', uk: 'це жара, дуже круто', emoji: '🎧', cat: 'slang', lvl: 'B2', reg: 'casual', when: 'Найчастіше про музику або їжу.', examples: [{ en: 'Have you heard the new album? <b>It slaps.</b>', uk: 'Чув новий альбом? Це жара.' }] },
    { name: 'that is mid', uk: 'так собі, посередньо', emoji: '😐', cat: 'slang', lvl: 'B2', reg: 'casual', when: 'Оцінка «нічого особливого» — часто з розчаруванням.', examples: [{ en: 'The sequel? Honestly, <b>that is mid</b>.', uk: 'Продовження? Чесно, так собі.' }] },
    { name: 'to flex', uk: 'хизуватися, понтуватися', emoji: '💪', cat: 'slang', lvl: 'B2', reg: 'casual', when: 'Про показ статусу чи покупок, часто з іронією.', examples: [{ en: 'He is just <b>flexing</b> his new phone.', uk: 'Він просто хизується новим телефоном.' }] },
    { name: 'salty', uk: 'ображений, злий через дрібницю', emoji: '🧂', cat: 'slang', lvl: 'B2', reg: 'casual', when: 'Про програш, жарт або чужий успіх.', examples: [{ en: 'Do not be <b>salty</b> — it is just a game.', uk: 'Не ображайся — це лише гра.' }] },
    { name: 'sus', uk: 'підозрілий, дивний', emoji: '🕵️', cat: 'slang', lvl: 'B2', reg: 'casual', when: 'Скорочення від suspicious, популяризоване іграми.', examples: [{ en: 'That link looks <b>sus</b>.', uk: 'Те посилання виглядає підозріло.' }] },
    { name: 'to ghost someone', uk: 'зникнути без пояснень', emoji: '👻', cat: 'slang', lvl: 'B2', reg: 'casual', when: 'Про людину, яка раптово перестала відповідати.', examples: [{ en: 'She <b>ghosted</b> me after two weeks.', uk: 'Вона зникла після двох тижнів.' }] },
    { name: 'to vibe with someone', uk: 'бути на одній хвилі', emoji: '🌊', cat: 'slang', lvl: 'B2', reg: 'casual', when: 'Про легкість у спілкуванні. Ще кажуть просто good vibes.', examples: [{ en: 'We really <b>vibe</b> — conversation is easy.', uk: 'Ми справді на одній хвилі — говорити легко.' }] },
    { name: 'it is a vibe', uk: 'атмосферно, класна атмосфера', emoji: '🎆', cat: 'slang', lvl: 'B2', reg: 'casual', when: 'Про місце, музику, вечір, що дає правильний настрій.', examples: [{ en: 'This café at night? <b>It is a vibe.</b>', uk: 'Це кафе ввечері? Атмосфера!' }] },
    { name: 'to touch grass', uk: 'вийти з інтернету в реальність', emoji: '🌱', cat: 'slang', lvl: 'C1', reg: 'casual', when: 'Жартівлива порада тому, хто надто занурений в онлайн.', examples: [{ en: 'You have been online for ten hours — go <b>touch grass</b>.', uk: 'Ти в мережі вже десять годин — вийди на вулицю.' }] },
    { name: 'main character energy', uk: 'енергія головного героя', emoji: '🎬', cat: 'slang', lvl: 'C1', reg: 'casual', when: 'Про людину, яка тримається так, ніби світ обертається навколо неї — частіше зі схваленням.', examples: [{ en: 'She walked in with total <b>main character energy</b>.', uk: 'Вона зайшла так, наче головна героїня фільму.' }] },
    { name: 'to be living rent-free in my head', uk: 'не йде мені з голови', emoji: '🏠', cat: 'slang', lvl: 'C1', reg: 'casual', when: 'Про думку чи пісню, що засіла в голові.', examples: [{ en: 'That song is <b>living rent-free in my head</b>.', uk: 'Та пісня не йде мені з голови.' }] }
  ];

  const SITUATIONS = [
    { sit: 'Подруга показує диплом, який щойно отримала.', correctEn: 'I am proud of you' },
    { sit: 'Колега тиждень готував презентацію — і вона вийшла чудово.', correctEn: 'You did an amazing job' },
    { sit: 'Друг розповідає, що в нього померла бабуся.', correctEn: 'I am so sorry to hear that' },
    { sit: 'У друга важкий місяць, і він каже, що вже не витягує.', correctEn: 'Hang in there' },
    { sit: 'Подруга через годину йде на співбесіду й дуже хвилюється.', correctEn: 'You have got this' },
    { sit: 'Тобі зранку болить голова й дере горло.', correctEn: 'I am coming down with something' },
    { sit: 'Пишеш колезі, який захворів і не вийшов на роботу.', correctEn: 'Get well soon' },
    { sit: 'Хочеш обережно запросити нового знайомого на зустріч.', correctEn: 'Do you want to grab a coffee sometime' },
    { sit: 'Знайомий випадково видалив важливий файл і картає себе.', correctEn: 'These things happen' },
    { sit: 'Друг привіз тобі зарядку за 20 хвилин до презентації.', correctEn: 'You are a lifesaver' },
    { sit: 'Тебе питають про хлопця, з яким ти просто товаришуєш.', correctEn: 'We are just friends' },
    { sit: 'Тобі подякували за підтримку, і це зворушило.', correctEn: 'That means a lot' }
  ];

  Object.assign(D.CATS, CATS);
  MARKERS.forEach(m => D.MARKERS.push(m));
  SITUATIONS.forEach(s => D.SITUATIONS.push(s));
})();
