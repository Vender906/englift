/* EngLift — доповнення до тренажера «situational»: побутові послуги, потяг і оренда авто,
   гроші та оплата. Вантажиться слідом за situational-data.js.
   MARKERS будуються з фраз ситуацій за тією самою схемою, що й в основному файлі. */
(function () {
  const D = window.PHRASE_DATA && window.PHRASE_DATA['situational'];
  if (!D) return;

  const SITUATIONS = [
    {
      id: 'services', emoji: '🔧', label: 'Послуги й ремонт', desc: 'Перукарня, майстер, гарантія, повернення товару',
      phrases: {
        you: [
          { en: 'I would like to book an appointment.', uk: 'Я хотів би записатися.', note: 'Універсально: перукар, лікар, сервіс. Розмовніше — «Can I book a slot?»' },
          { en: 'Do you have anything available this week?', uk: 'Є вільні місця цього тижня?', note: 'Питання про вільний час — available, а не «free time»' },
          { en: 'Just a trim, please.', uk: 'Просто підрівняйте, будь ласка.', note: 'Найкорисніша фраза в перукарні: trim = підрівняти кінчики' },
          { en: 'Not too short on the sides.', uk: 'З боків не занадто коротко.', note: 'Уточнення для перукаря: on the sides / on top / at the back' },
          { en: 'It stopped working yesterday.', uk: 'Воно перестало працювати вчора.', note: 'Найпростіший опис поломки' },
          { en: 'Can you fix it?', uk: 'Ви можете це полагодити?', note: 'fix = полагодити; repair — трохи офіційніше' },
          { en: 'How much do you charge for that?', uk: 'Скільки ви берете за це?', note: 'charge for — брати плату за послугу' },
          { en: 'When will it be ready?', uk: 'Коли буде готово?', note: 'Стандартне питання в будь-якому сервісі' },
          { en: 'Is it still under warranty?', uk: 'Гарантія ще діє?', note: 'under warranty = на гарантії' },
          { en: 'I would like to return this.', uk: 'Я хотів би це повернути.', note: 'У крамниці попросять чек — receipt' },
          { en: 'It does not fit.', uk: 'Не підходить за розміром.', note: 'fit — про розмір; suit — про те, чи пасує стиль' },
          { en: 'Can I get a refund?', uk: 'Можна повернути гроші?', note: 'refund = гроші назад, exchange = обмін на інше' },
          { en: 'There is a leak under the sink.', uk: 'Під раковиною тече.', note: 'Класичний виклик сантехніка: a leak = протікання' },
          { en: 'The heating is not working.', uk: 'Опалення не працює.', note: 'Про техніку в помешканні: the boiler, the heating, the AC' }
        ],
        them: [
          { en: 'What time works for you?', uk: 'О котрій вам зручно?', note: 'Питання про зручний час запису' },
          { en: 'Do you have an appointment?', uk: 'Ви записані?', note: 'Без запису — «I am a walk-in»' },
          { en: 'We can take a look at it.', uk: 'Ми можемо це подивитися.', note: 'take a look = оглянути, ще без обіцянок' },
          { en: 'It will take about three days.', uk: 'Це займе близько трьох днів.', note: 'Стандартна відповідь сервісу про строки' },
          { en: 'Do you have proof of purchase?', uk: 'У вас є підтвердження покупки?', note: 'proof of purchase — чек або виписка з картки' },
          { en: 'We will call you when it is done.', uk: 'Ми зателефонуємо, коли буде готово.', note: 'Тоді варто уточнити: «Could you text me instead?»' }
        ],
        useful: [
          { en: 'How long is the wait?', uk: 'Скільки чекати?', note: 'Про чергу — the wait, а не «the queue time»' },
          { en: 'Is there a call-out fee?', uk: 'Виїзд майстра оплачується окремо?', note: 'call-out fee — плата за сам приїзд майстра' },
          { en: 'Could you give me a quote first?', uk: 'Можете спершу назвати ціну?', note: 'a quote = попередній кошторис до початку робіт' }
        ],
        warning: [
          { en: '❌ Make me a haircut.', uk: '❌ Зроби мені стрижку. (калька)', note: '⚠️ Правильно: «I would like a haircut» або «Can I get a haircut?». «Make me a haircut» звучить дивно.' },
          { en: '❌ Can you repair my hairs?', uk: '❌ (hair — незлічуване)', note: '⚠️ hair у значенні «волосся» — однина: «My hair is too long», а не «hairs are».' }
        ]
      },
      dialog: [
        { sp: 'them', en: 'Hi, do you have an appointment?', uk: 'Вітаю, ви записані?' },
        { sp: 'you', en: 'No, I am a walk-in. How long is the wait?', uk: 'Ні, я без запису. Скільки чекати?' },
        { sp: 'them', en: 'About twenty minutes. What are we doing today?', uk: 'Хвилин двадцять. Що робимо сьогодні?' },
        { sp: 'you', en: 'Just a trim, please. Not too short on the sides.', uk: 'Просто підрівняйте. З боків не занадто коротко.' },
        { sp: 'them', en: 'Sure. Take a seat, I will be right with you.', uk: 'Звісно. Сідайте, я зараз підійду.' }
      ]
    },
    {
      id: 'train', emoji: '🚆', label: 'Потяг і оренда авто', desc: 'Квитки, платформа, пересадка, прокат авто',
      phrases: {
        you: [
          { en: 'A one-way ticket to Manchester, please.', uk: 'Один квиток до Манчестера в один бік, будь ласка.', note: 'BrE: single; AmE: one-way' },
          { en: 'A return ticket, please.', uk: 'Квиток туди й назад, будь ласка.', note: 'BrE: return; AmE: round-trip' },
          { en: 'What time does the train leave?', uk: 'О котрій відправляється потяг?', note: 'leave / depart — про відправлення' },
          { en: 'Which platform is it?', uk: 'З якої платформи?', note: 'BrE: platform; AmE: track' },
          { en: 'Is this seat taken?', uk: 'Це місце зайняте?', note: 'Найввічливіший спосіб сісти поруч' },
          { en: 'Do I need to change trains?', uk: 'Мені треба робити пересадку?', note: 'change trains = пересадка; a direct train = прямий' },
          { en: 'I missed my train.', uk: 'Я запізнився на потяг.', note: 'miss the train / the flight — саме miss' },
          { en: 'I would like to rent a car.', uk: 'Я хотів би орендувати авто.', note: 'AmE: rent; BrE також hire a car' },
          { en: 'Is insurance included?', uk: 'Страховка входить у ціну?', note: 'Ключове питання прокату' },
          { en: 'Do I have to return it with a full tank?', uk: 'Треба повернути з повним баком?', note: 'a full tank — типова умова прокату' },
          { en: 'Is there a mileage limit?', uk: 'Є обмеження пробігу?', note: 'AmE: mileage; BrE: mileage теж уживають' },
          { en: 'Where can I drop it off?', uk: 'Де можна його залишити?', note: 'drop off = здати авто; pick up = забрати' }
        ],
        them: [
          { en: 'Single or return?', uk: 'В один бік чи туди й назад?', note: 'Стандартне питання в британській касі' },
          { en: 'The train is delayed by twenty minutes.', uk: 'Потяг затримується на двадцять хвилин.', note: 'delayed by + час' },
          { en: 'Tickets, please.', uk: 'Ваші квитки, будь ласка.', note: 'Фраза контролера' },
          { en: 'Can I see your driving licence?', uk: 'Можна ваші права?', note: 'BrE: driving licence; AmE: driver’s license' },
          { en: 'There is a deposit on the card.', uk: 'На картці блокується застава.', note: 'a deposit — заблокована сума, повертається' }
        ],
        useful: [
          { en: 'Does this train stop at York?', uk: 'Цей потяг зупиняється в Йорку?', note: 'Найшвидший спосіб перевірити маршрут' },
          { en: 'Is there a direct train?', uk: 'Є прямий потяг?', note: 'Альтернатива пересадкам' },
          { en: 'Can I change my ticket?', uk: 'Чи можу я поміняти квиток?', note: 'Залежить від тарифу: flexible / non-refundable' }
        ],
        warning: [
          { en: '❌ I want ticket to London.', uk: '❌ (без артикля й без «please»)', note: '⚠️ Потрібен артикль і ввічливість: «A ticket to London, please».' },
          { en: '❌ I lost the train.', uk: '❌ Я загубив потяг.', note: '⚠️ Запізнитися — «I missed the train». Lose = загубити річ.' }
        ]
      },
      dialog: [
        { sp: 'you', en: 'Hi, a return ticket to Manchester, please.', uk: 'Вітаю, квиток до Манчестера туди й назад, будь ласка.' },
        { sp: 'them', en: 'Travelling today? That will be £42.', uk: 'Їдете сьогодні? З вас £42.' },
        { sp: 'you', en: 'Yes. Which platform is it?', uk: 'Так. З якої платформи?' },
        { sp: 'them', en: 'Platform 4, but it is delayed by ten minutes.', uk: 'Четверта платформа, але затримка десять хвилин.' },
        { sp: 'you', en: 'Thanks. Do I need to change trains?', uk: 'Дякую. Мені треба робити пересадку?' },
        { sp: 'them', en: 'No, it is a direct train.', uk: 'Ні, це прямий потяг.' }
      ]
    },
    {
      id: 'money', emoji: '💳', label: 'Гроші й оплата', desc: 'Картка чи готівка, рахунок навпіл, борги, знижки',
      phrases: {
        you: [
          { en: 'Do you take contactless?', uk: 'У вас можна безконтактно?', note: 'contactless — оплата дотиком картки чи телефона' },
          { en: 'Do you take cash?', uk: 'Ви приймаєте готівку?', note: 'take = приймати до оплати' },
          { en: 'Can we pay separately?', uk: 'Можна заплатити окремо?', note: 'Кожен платить за своє — на відміну від «split the bill» порівну' },
          { en: 'It is on me.', uk: 'Я пригощаю.', note: 'Дружнє «плачу я». Ще кажуть «my treat»' },
          { en: 'How much do I owe you?', uk: 'Скільки я тобі винен?', note: 'owe = бути винним гроші' },
          { en: 'Can I leave a tip on the card?', uk: 'Можна лишити чайові карткою?', note: 'a tip — чайові; у США очікують 15–20%' },
          { en: 'Is service included?', uk: 'Обслуговування включене?', note: 'Важливо перед тим, як лишати чайові' },
          { en: 'Could I get a receipt, please?', uk: 'Можна чек, будь ласка?', note: 'receipt — вимовляється без «p»' },
          { en: 'I am saving up for a car.', uk: 'Я збираю гроші на авто.', note: 'save up for — відкладати на щось конкретне' },
          { en: 'It is a bit out of my budget.', uk: 'Це трохи понад мій бюджет.', note: 'Ввічлива відмова від дорогої пропозиції' },
          { en: 'I will pay you back tomorrow.', uk: 'Я поверну тобі завтра.', note: 'pay someone back — повернути борг' },
          { en: 'Can you transfer it to my account?', uk: 'Можете переказати на мій рахунок?', note: 'transfer to an account — банківський переказ' }
        ],
        them: [
          { en: 'How would you like to pay?', uk: 'Як бажаєте розрахуватися?', note: 'Ввічливіший варіант за «cash or card?»' },
          { en: 'Please insert your card.', uk: 'Вставте картку, будь ласка.', note: 'Або «tap your card» — приклад безконтактної оплати' },
          { en: 'It has been declined.', uk: 'Оплату відхилено.', note: 'declined — картка не пройшла' },
          { en: 'Would you like the receipt?', uk: 'Чек потрібен?', note: 'Відповідь: «Yes, please» / «No, thanks»' },
          { en: 'There is a minimum spend of five pounds.', uk: 'Мінімальна сума оплати — пʼять фунтів.', note: 'minimum spend — обмеження для картки' }
        ],
        useful: [
          { en: 'It is on sale.', uk: 'Це зі знижкою.', note: 'on sale = за акційною ціною; for sale = продається' },
          { en: 'That is a rip-off.', uk: 'Це грабіж.', note: 'Розмовна оцінка задорогої ціни' },
          { en: 'Do you offer a student discount?', uk: 'У вас є студентська знижка?', note: 'a discount — знижка; питають прямо' },
          { en: 'Let us go halves.', uk: 'Давай навпіл.', note: 'Про рахунок на двох' }
        ],
        warning: [
          { en: '❌ I will pay with card.', uk: '❌ (не той прийменник)', note: '⚠️ Правильно: «pay by card», але «pay in cash» або «pay with a credit card».' },
          { en: '❌ Give me the change.', uk: '❌ Дай мені решту. (грубо)', note: '⚠️ Мʼякше: «Could I have the change, please?» — інакше звучить як вимога.' }
        ]
      },
      dialog: [
        { sp: 'them', en: 'That comes to $36. Cash or card?', uk: 'Разом $36. Готівка чи картка?' },
        { sp: 'you', en: 'Card, please. Actually — can we split the bill?', uk: 'Карткою, будь ласка. До речі, можемо розділити рахунок?' },
        { sp: 'them', en: 'Sure, two payments of $18?', uk: 'Звісно, дві оплати по $18?' },
        { sp: 'you', en: 'Perfect. Is service included?', uk: 'Чудово. Обслуговування включене?' },
        { sp: 'them', en: 'Yes, it is. Would you like the receipt?', uk: 'Так. Чек потрібен?' },
        { sp: 'you', en: 'Yes, please. Keep the change.', uk: 'Так, будь ласка. Решту лишіть собі.' }
      ]
    }
  ];

  const MISSING_BANK = [
    { sit: '🔧 Послуги й ремонт', full: 'I would like to book an appointment.', missing: 'I would like to book an ___.', answer: 'appointment', hint: 'запис на певний час' },
    { sit: '🔧 Послуги й ремонт', full: 'Is it still under warranty?', missing: 'Is it still under ___?', answer: 'warranty', hint: 'гарантія' },
    { sit: '🔧 Послуги й ремонт', full: 'Can I get a refund?', missing: 'Can I get a ___?', answer: 'refund', hint: 'повернення грошей' },
    { sit: '🚆 Потяг і оренда авто', full: 'A one-way ticket to Manchester, please.', missing: 'A ___ ticket to Manchester, please.', answer: 'one-way', hint: 'в один бік (AmE)' },
    { sit: '🚆 Потяг і оренда авто', full: 'Which platform is it?', missing: 'Which ___ is it?', answer: 'platform', hint: 'звідки відходить потяг (BrE)' },
    { sit: '🚆 Потяг і оренда авто', full: 'Is insurance included?', missing: 'Is ___ included?', answer: 'insurance', hint: 'страховка' },
    { sit: '💳 Гроші й оплата', full: 'Can we pay separately?', missing: 'Can we pay ___?', answer: 'separately', hint: 'кожен за своє' },
    { sit: '💳 Гроші й оплата', full: 'Can I leave a tip on the card?', missing: 'Can I leave a ___ on the card?', answer: 'tip', hint: 'чайові' },
    { sit: '💳 Гроші й оплата', full: 'How much do I owe you?', missing: 'How much do I ___ you?', answer: 'owe', hint: 'бути винним гроші' }
  ];

  const ROLE_LABEL = { you: '🙋 Ти кажеш', them: '👤 Тобі кажуть', useful: '💡 Корисне', warning: '⚠️ Обережно' };

  SITUATIONS.forEach(s => {
    D.CATS[s.id] = { emoji: s.emoji, label: s.label, desc: s.desc };
    D.SITUATIONS.push(s);
    Object.keys(s.phrases).forEach(role => {
      s.phrases[role].forEach(p => {
        D.MARKERS.push({
          name: p.en, uk: p.uk, emoji: s.emoji, cat: s.id, reg: 'neutral',
          when: ROLE_LABEL[role] + ' · ' + p.note,
          examples: [{ en: p.en, uk: p.uk }], role: role, tip: p.note
        });
      });
    });
  });
  MISSING_BANK.forEach(q => D.MISSING_BANK.push(q));
})();
