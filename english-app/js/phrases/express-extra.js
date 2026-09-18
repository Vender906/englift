/* EngLift — доповнення до тренажера «express»: незгода, суперечка й переговори.
   Вантажиться слідом за express-data.js. */
(function () {
  const D = window.PHRASE_DATA && window.PHRASE_DATA['express'];
  if (!D) return;

  const CATS = {
    negotiate: { emoji: '🤝', label: 'Суперечка й переговори', desc: 'With all due respect / Can we meet in the middle' }
  };

  const MARKERS = [
    { name: 'With all due respect,', uk: 'При всій повазі, …', emoji: '🎩', cat: 'negotiate', lvl: 'C1', reg: 'formal', when: '⚔️ НЕЗГОДА. Формально ввічливо, але всі розуміють: далі буде заперечення. Працює лише в серйозній розмові — у дружній звучить саркастично.', examples: [{ en: '<b>With all due respect,</b> the numbers say otherwise.', uk: 'При всій повазі, цифри свідчать про інше.' }], tip: '⚠️ Це «ввічлива зброя»: пом’якшує форму, але не зміст.' },
    { name: 'I see your point, but', uk: 'Розумію вашу думку, але…', emoji: '⚖️', cat: 'negotiate', lvl: 'B1', reg: 'neutral', when: '⚔️ НЕЗГОДА. Золотий стандарт: спершу визнай чужий аргумент, потім свій.', examples: [{ en: '<b>I see your point, but</b> we cannot afford the delay.', uk: 'Розумію вас, але ми не можемо дозволити собі затримку.' }] },
    { name: 'That is a fair point, however', uk: 'Слушне зауваження, проте…', emoji: '👌', cat: 'negotiate', lvl: 'B2', reg: 'formal', when: '⚔️ НЕЗГОДА. Ще мʼякше: визнаєш правоту співрозмовника як факт.', examples: [{ en: '<b>That is a fair point, however</b> the timing is wrong.', uk: 'Слушно, проте момент невдалий.' }] },
    { name: 'I am afraid I have to disagree', uk: 'Боюся, мушу не погодитися', emoji: '🙅', cat: 'negotiate', lvl: 'B2', reg: 'formal', when: '⚔️ НЕЗГОДА. Пряма, але ввічлива форма — доречна на нараді.', examples: [{ en: '<b>I am afraid I have to disagree</b> on that one.', uk: 'Боюся, тут я мушу не погодитися.' }] },
    { name: 'That is not quite what I meant', uk: 'Я мав на увазі трохи інше', emoji: '🔄', cat: 'negotiate', lvl: 'B1', reg: 'neutral', when: '🛠️ ВИПРАВЛЕННЯ. Тебе зрозуміли не так — виправ, не звинувачуючи.', examples: [{ en: '<b>That is not quite what I meant</b> — let me rephrase.', uk: 'Я мав на увазі трохи інше — сформулюю ще раз.' }] },
    { name: 'Hear me out', uk: 'Вислухай мене до кінця', emoji: '👂', cat: 'negotiate', lvl: 'B2', reg: 'casual', when: '🛡️ ЗАХИСТ ІДЕЇ. Просиш не перебивати, поки не договорив.', examples: [{ en: 'I know it sounds crazy — <b>hear me out</b>.', uk: 'Знаю, звучить божевільно, — але вислухай.' }] },
    { name: 'Let us agree to disagree', uk: 'Лишімося кожен при своїй думці', emoji: '🤷', cat: 'negotiate', lvl: 'B2', reg: 'neutral', when: '🏳️ ВИХІД ІЗ СУПЕРЕЧКИ. Коли далі сперечатися немає сенсу.', examples: [{ en: 'Okay, <b>let us agree to disagree</b>.', uk: 'Гаразд, лишімося кожен при своїй думці.' }] },
    { name: 'Can we meet in the middle', uk: 'Може, знайдімо компроміс?', emoji: '🤝', cat: 'negotiate', lvl: 'B2', reg: 'neutral', when: '💼 ПЕРЕГОВОРИ. Пропозиція поступитися з обох боків.', examples: [{ en: '<b>Can we meet in the middle</b> at 15%?', uk: 'Може, зійдемося на 15%?' }] },
    { name: 'What if we', uk: 'А що, як ми…?', emoji: '💡', cat: 'negotiate', lvl: 'B1', reg: 'neutral', when: '💼 ПЕРЕГОВОРИ. Пропозиція як питання — її легше прийняти, ніж вимогу.', examples: [{ en: '<b>What if we</b> split the cost?', uk: 'А що, як ми розділимо витрати?' }] },
    { name: 'I would be willing to', uk: 'Я був би готовий…', emoji: '✍️', cat: 'negotiate', lvl: 'B2', reg: 'formal', when: '💼 ПЕРЕГОВОРИ. Називаєш свою поступку в обмін на іншу.', examples: [{ en: '<b>I would be willing to</b> start earlier if the rate is higher.', uk: 'Я був би готовий почати раніше, якщо ставка буде вищою.' }] },
    { name: 'That does not work for me', uk: 'Мене це не влаштовує', emoji: '🚫', cat: 'negotiate', lvl: 'B1', reg: 'neutral', when: '💼 ПЕРЕГОВОРИ. Чітке «ні» без агресії — про умову, а не про людину.', examples: [{ en: 'Honestly, <b>that does not work for me</b>.', uk: 'Чесно кажучи, мене це не влаштовує.' }] },
    { name: 'Where do you stand on', uk: 'Яка ваша позиція щодо…?', emoji: '🧭', cat: 'negotiate', lvl: 'B2', reg: 'formal', when: '🔍 РОЗВІДКА. Питаєш позицію іншої сторони, перш ніж називати свою.', examples: [{ en: '<b>Where do you stand on</b> the deadline?', uk: 'Яка ваша позиція щодо дедлайну?' }] },
    { name: 'Just to play devil’s advocate', uk: 'Зіграю роль адвоката диявола', emoji: '😈', cat: 'negotiate', lvl: 'C1', reg: 'neutral', when: '🔍 РОЗВІДКА. Наводиш заперечення не від себе, а щоб перевірити ідею.', examples: [{ en: '<b>Just to play devil’s advocate</b> — what if nobody buys it?', uk: 'Зіграю адвоката диявола: а якщо ніхто це не купить?' }] },
    { name: 'Let us take a step back', uk: 'Погляньмо на це ширше', emoji: '🔭', cat: 'negotiate', lvl: 'B2', reg: 'neutral', when: '🧊 ОХОЛОДЖЕННЯ. Коли суперечка загрузла в деталях.', examples: [{ en: '<b>Let us take a step back</b> and look at the goal.', uk: 'Погляньмо ширше — на саму мету.' }] },
    { name: 'I hear you, and', uk: 'Я тебе чую, і…', emoji: '🫱', cat: 'negotiate', lvl: 'B2', reg: 'casual', when: '🧊 ОХОЛОДЖЕННЯ. «And» замість «but» — не знецінює сказане співрозмовником.', examples: [{ en: '<b>I hear you, and</b> I still think it is worth trying.', uk: 'Я тебе чую, і все ж вважаю, що варто спробувати.' }], tip: '💡 Заміна «but» на «and» знімає половину напруги в суперечці.' },
    { name: 'Correct me if I am wrong, but', uk: 'Виправ мене, якщо помиляюся, але…', emoji: '✏️', cat: 'negotiate', lvl: 'B1', reg: 'neutral', when: '🔍 РОЗВІДКА. Перевіряєш факт, не звинувачуючи нікого в помилці.', examples: [{ en: '<b>Correct me if I am wrong, but</b> we agreed on Friday.', uk: 'Виправ мене, якщо помиляюся, але ми домовлялися на пʼятницю.' }] }
  ];

  const EXPRESS_QS = [
    { uk: 'Хочу заперечити керівнику на нараді — ввічливо, але твердо.', tone: '🎩 формальна незгода', target: '___ the numbers say otherwise.', correct: 'With all due respect,', distractors: ['Hear me out', 'What if we', 'Let us agree to disagree'], note: 'Формальна зброя: мʼяка форма, тверда суть.' },
    { uk: 'Спершу визнаю чужий аргумент, потім наводжу свій.', tone: '⚖️ мʼяка незгода', target: '___ we cannot afford the delay.', correct: 'I see your point, but', distractors: ['That does not work for me', 'Where do you stand on', 'I would be willing to'], note: 'Визнання + заперечення — найбезпечніша модель суперечки.' },
    { uk: 'Пропоную компроміс у переговорах про ціну.', tone: '🤝 компроміс', target: '___ at 15%?', correct: 'Can we meet in the middle', distractors: ['I am afraid I have to disagree', 'Just to play devil’s advocate', 'Let us take a step back'], note: 'Компроміс краще пропонувати питанням.' },
    { uk: 'Моя ідея звучить дивно, і я прошу не перебивати.', tone: '🛡️ захист ідеї', target: 'I know it sounds crazy — ___.', correct: 'Hear me out', distractors: ['That is not quite what I meant', 'I hear you, and', 'Correct me if I am wrong, but'], note: 'Просиш кредит довіри на 30 секунд.' },
    { uk: 'Сперечатися далі немає сенсу — мирно виходжу з розмови.', tone: '🏳️ вихід', target: 'Okay, ___.', correct: 'Let us agree to disagree', distractors: ['What if we', 'With all due respect,', 'Where do you stand on'], note: 'Закриває суперечку без переможених.' },
    { uk: 'Мене зрозуміли не так — виправляю без звинувачень.', tone: '🛠️ виправлення', target: '___ — let me rephrase.', correct: 'That is not quite what I meant', distractors: ['That does not work for me', 'Hear me out', 'I would be willing to'], note: 'Проблема в формулюванні, а не в співрозмовнику.' },
    { uk: 'Хочу перевірити ідею запереченням, яке сам не поділяю.', tone: '😈 перевірка', target: '___ — what if nobody buys it?', correct: 'Just to play devil’s advocate', distractors: ['I see your point, but', 'Let us agree to disagree', 'Can we meet in the middle'], note: 'Сигнал: я не проти тебе, я тестую ідею.' },
    { uk: 'Умова мене не влаштовує, але сваритися я не хочу.', tone: '🚫 тверде «ні»', target: 'Honestly, ___.', correct: 'That does not work for me', distractors: ['I hear you, and', 'Correct me if I am wrong, but', 'Let us take a step back'], note: 'Відмова від умови, а не від людини.' }
  ];

  Object.assign(D.CATS, CATS);
  MARKERS.forEach(m => D.MARKERS.push(m));
  EXPRESS_QS.forEach(q => D.EXPRESS_QS.push(q));
})();
