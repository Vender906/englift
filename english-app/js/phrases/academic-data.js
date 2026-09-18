/* EngLift — дані тренажера «academic»: письмо, есе та іспитова англійська. */
window.PHRASE_DATA = window.PHRASE_DATA || {};
window.PHRASE_DATA["academic"] = (function () {

const CATS = {
  intro: { emoji: '🏁', label: 'Вступ і теза', desc: 'This essay argues that, the aim of this paper is' },
  argue: { emoji: '⚖️', label: 'Аргументи й контраргументи', desc: 'On the one hand, it could be argued that, admittedly' },
  source: { emoji: '📚', label: 'Джерела й дані', desc: 'According to, the data suggests, research shows' },
  hedge: { emoji: '🛡️', label: 'Обережні твердження', desc: 'tends to, may indicate, to some extent' },
  link: { emoji: '🔗', label: 'Академічні звʼязки', desc: 'Furthermore, nevertheless, consequently' },
  conclude: { emoji: '🎓', label: 'Висновок', desc: 'In conclusion, overall, this suggests that' },
  exam: { emoji: '🗣️', label: 'Усний іспит і презентація', desc: 'That is a tough one, I would say, to give you an example' }
};

const MARKERS = [
  /* ---------------- ВСТУП ---------------- */
  { name: 'This essay argues that', uk: 'У цьому есе я доводжу, що…', emoji: '🏁', cat: 'intro', lvl: 'C1', reg: 'formal', when: 'Пряма теза у вступі. Показує екзаменатору, що позиція є вже в першому абзаці.', examples: [{ en: '<b>This essay argues that</b> remote work benefits both sides.', uk: 'У цьому есе я доводжу, що віддалена робота вигідна обом сторонам.' }], tip: '💡 В академічному письмі уникають «I think» — замість нього беруть «This essay argues».' },
  { name: 'The aim of this paper is to', uk: 'Мета цієї роботи — …', emoji: '🎯', cat: 'intro', lvl: 'C1', reg: 'formal', when: 'Стандартний вступ до реферату чи статті.', examples: [{ en: '<b>The aim of this paper is to</b> compare two approaches.', uk: 'Мета цієї роботи — порівняти два підходи.' }] },
  { name: 'In recent years', uk: 'Останніми роками', emoji: '📆', cat: 'intro', lvl: 'B2', reg: 'formal', when: 'Класичний перший рядок, що задає контекст теми.', examples: [{ en: '<b>In recent years</b>, online learning has grown rapidly.', uk: 'Останніми роками онлайн-навчання швидко зросло.' }] },
  { name: 'It is widely believed that', uk: 'Прийнято вважати, що…', emoji: '🌍', cat: 'intro', lvl: 'B2', reg: 'formal', when: 'Подаєш поширену думку, яку далі підтвердиш або спростуєш.', examples: [{ en: '<b>It is widely believed that</b> money brings happiness.', uk: 'Прийнято вважати, що гроші приносять щастя.' }] },
  { name: 'This raises the question of', uk: 'Це порушує питання про…', emoji: '❓', cat: 'intro', lvl: 'C1', reg: 'formal', when: 'Місток від контексту до головного питання роботи.', examples: [{ en: '<b>This raises the question of</b> who should pay for it.', uk: 'Це порушує питання про те, хто має за це платити.' }] },
  { name: 'The issue of', uk: 'Питання … (чогось)', emoji: '📌', cat: 'intro', lvl: 'B2', reg: 'formal', when: 'Називає тему: the issue of privacy, the issue of funding.', examples: [{ en: '<b>The issue of</b> data privacy divides experts.', uk: 'Питання приватності даних розділяє експертів.' }] },
  { name: 'This essay will first', uk: 'Спершу в есе буде розглянуто…', emoji: '🗺️', cat: 'intro', lvl: 'C1', reg: 'formal', when: 'Карта тексту наприкінці вступу: first… then… finally.', examples: [{ en: '<b>This essay will first</b> examine the causes, then the effects.', uk: 'Спершу в есе розглянуто причини, потім наслідки.' }] },

  /* ---------------- АРГУМЕНТИ ---------------- */
  { name: 'On the one hand', uk: 'З одного боку', emoji: '🤲', cat: 'argue', lvl: 'B2', reg: 'formal', when: 'Перша половина збалансованого есе. Обовʼязково має продовження on the other hand.', examples: [{ en: '<b>On the one hand</b>, cars save time.', uk: 'З одного боку, авто заощаджує час.' }], tip: '⚠️ Саме on the one hand, а не «from one hand».' },
  { name: 'On the other hand', uk: 'З іншого боку', emoji: '✋', cat: 'argue', lvl: 'B1', reg: 'formal', when: 'Друга частина протиставлення.', examples: [{ en: '<b>On the other hand</b>, they pollute the air.', uk: 'З іншого боку, вони забруднюють повітря.' }] },
  { name: 'It could be argued that', uk: 'Можна стверджувати, що…', emoji: '⚖️', cat: 'argue', lvl: 'C1', reg: 'formal', when: 'Подаєш аргумент, не беручи на себе повну відповідальність за нього.', examples: [{ en: '<b>It could be argued that</b> the policy failed.', uk: 'Можна стверджувати, що ця політика провалилася.' }] },
  { name: 'Admittedly', uk: 'Слід визнати, що…', emoji: '🙌', cat: 'argue', lvl: 'C1', reg: 'formal', when: 'Визнаєш слабке місце власної позиції — це додає роботі зрілості.', examples: [{ en: '<b>Admittedly</b>, the sample was small.', uk: 'Слід визнати, вибірка була невеликою.' }] },
  { name: 'A common counterargument is', uk: 'Поширений контраргумент — …', emoji: '↔️', cat: 'argue', lvl: 'C1', reg: 'formal', when: 'Вводиш заперечення, щоб потім його розібрати.', examples: [{ en: '<b>A common counterargument is</b> that costs are too high.', uk: 'Поширений контраргумент — надто високі витрати.' }] },
  { name: 'The main advantage of', uk: 'Головна перевага … в тому, що', emoji: '➕', cat: 'argue', lvl: 'B2', reg: 'formal', when: 'Каркас есе «за і проти».', examples: [{ en: '<b>The main advantage of</b> this method is speed.', uk: 'Головна перевага цього методу — швидкість.' }] },
  { name: 'The main drawback is', uk: 'Головний недолік у тому, що…', emoji: '➖', cat: 'argue', lvl: 'B2', reg: 'formal', when: 'Пара до advantage — саме drawback, а не «minus».', examples: [{ en: '<b>The main drawback is</b> the cost.', uk: 'Головний недолік — вартість.' }] },
  { name: 'This is largely because', uk: 'Здебільшого це тому, що…', emoji: '🔍', cat: 'argue', lvl: 'C1', reg: 'formal', when: 'Пояснюєш причину після твердження.', examples: [{ en: '<b>This is largely because</b> wages have not risen.', uk: 'Здебільшого це тому, що зарплати не зросли.' }] },
  { name: 'A case in point is', uk: 'Показовий приклад — …', emoji: '📎', cat: 'argue', lvl: 'C1', reg: 'formal', when: 'Академічне «наприклад» для одного розгорнутого прикладу.', examples: [{ en: '<b>A case in point is</b> the 2020 lockdown.', uk: 'Показовий приклад — локдаун 2020 року.' }] },
  { name: 'By contrast', uk: 'Натомість, на противагу цьому', emoji: '🔀', cat: 'argue', lvl: 'B2', reg: 'formal', when: 'Протиставлення двох даних чи груп.', examples: [{ en: '<b>By contrast</b>, only 12% agreed.', uk: 'Натомість погодилися лише 12%.' }] },

  /* ---------------- ДЖЕРЕЛА Й ДАНІ ---------------- */
  { name: 'According to', uk: 'За даними / на думку…', emoji: '📚', cat: 'source', lvl: 'B1', reg: 'formal', when: 'Посилання на джерело чи людину — але не на себе: «according to me» не кажуть.', examples: [{ en: '<b>According to</b> the World Bank, growth slowed.', uk: 'За даними Світового банку, зростання сповільнилося.' }], tip: '⚠️ Про власну думку — in my view, а не according to me.' },
  { name: 'Research shows that', uk: 'Дослідження показують, що…', emoji: '🔬', cat: 'source', lvl: 'B2', reg: 'formal', when: 'Загальне посилання на наукові дані.', examples: [{ en: '<b>Research shows that</b> sleep affects memory.', uk: 'Дослідження показують, що сон впливає на памʼять.' }] },
  { name: 'The data suggests that', uk: 'Дані свідчать, що…', emoji: '📊', cat: 'source', lvl: 'C1', reg: 'formal', when: 'Обережніше за «the data proves» — в науці майже нічого не доводять остаточно.', examples: [{ en: '<b>The data suggests that</b> the effect is small.', uk: 'Дані свідчать, що ефект незначний.' }] },
  { name: 'As shown in the chart', uk: 'Як показано на діаграмі', emoji: '📈', cat: 'source', lvl: 'B2', reg: 'formal', when: 'Опис графіка — база першої частини письмового IELTS.', examples: [{ en: '<b>As shown in the chart</b>, sales peaked in June.', uk: 'Як показано на діаграмі, пік продажів був у червні.' }] },
  { name: 'The figure rose sharply', uk: 'Показник різко зріс', emoji: '⬆️', cat: 'source', lvl: 'B2', reg: 'formal', when: 'Опис динаміки: rose sharply / fell steadily / remained stable.', examples: [{ en: '<b>The figure rose sharply</b> between 2010 and 2015.', uk: 'Показник різко зріс між 2010 і 2015 роками.' }] },
  { name: 'Accounts for', uk: 'становить (частку), припадає на', emoji: '🥧', cat: 'source', lvl: 'C1', reg: 'formal', when: 'Про частку у відсотках: accounts for 40% of the total.', examples: [{ en: 'Transport <b>accounts for</b> a quarter of emissions.', uk: 'На транспорт припадає чверть викидів.' }] },
  { name: 'Studies have found', uk: 'Дослідження виявили…', emoji: '🧪', cat: 'source', lvl: 'B2', reg: 'formal', when: 'Множина досліджень — обережніше й переконливіше за одне.', examples: [{ en: '<b>Studies have found</b> a link between stress and sleep.', uk: 'Дослідження виявили звʼязок між стресом і сном.' }] },
  { name: 'It is worth noting that', uk: 'Варто зазначити, що…', emoji: '📝', cat: 'source', lvl: 'C1', reg: 'formal', when: 'Додаєш важливу деталь, не ламаючи логіки абзацу.', examples: [{ en: '<b>It is worth noting that</b> the study was funded by the industry.', uk: 'Варто зазначити, що дослідження фінансувала галузь.' }] },

  /* ---------------- ОБЕРЕЖНІ ТВЕРДЖЕННЯ ---------------- */
  { name: 'tend to', uk: 'мають тенденцію, зазвичай', emoji: '🛡️', cat: 'hedge', lvl: 'B2', reg: 'formal', when: 'Замість «always»: люди рідко роблять щось завжди.', examples: [{ en: 'Students <b>tend to</b> work better in the morning.', uk: 'Студенти зазвичай працюють краще зранку.' }] },
  { name: 'may indicate', uk: 'може вказувати на', emoji: '🔎', cat: 'hedge', lvl: 'C1', reg: 'formal', when: 'Пропонуєш пояснення, не стверджуючи його як факт.', examples: [{ en: 'The drop <b>may indicate</b> a change in behaviour.', uk: 'Спад може вказувати на зміну поведінки.' }] },
  { name: 'to some extent', uk: 'певною мірою', emoji: '📏', cat: 'hedge', lvl: 'B2', reg: 'formal', when: 'Часткова згода — типовий хід у есе «to what extent do you agree».', examples: [{ en: 'I agree <b>to some extent</b>.', uk: 'Певною мірою я погоджуюся.' }] },
  { name: 'It appears that', uk: 'Схоже, що…', emoji: '👓', cat: 'hedge', lvl: 'C1', reg: 'formal', when: 'Академічний варіант «it seems».', examples: [{ en: '<b>It appears that</b> the trend has reversed.', uk: 'Схоже, тенденція розвернулася.' }] },
  { name: 'is likely to', uk: 'імовірно, буде', emoji: '🎯', cat: 'hedge', lvl: 'B2', reg: 'formal', when: 'Прогноз без категоричності. Сильніше — is bound to.', examples: [{ en: 'Prices <b>are likely to</b> rise next year.', uk: 'Ціни, імовірно, зростуть наступного року.' }] },
  { name: 'arguably', uk: 'можливо, як можна стверджувати', emoji: '💬', cat: 'hedge', lvl: 'C1', reg: 'formal', when: 'Одне слово замість цілої конструкції it could be argued that.', examples: [{ en: 'This is <b>arguably</b> the biggest challenge.', uk: 'Це, можливо, найбільший виклик.' }] },
  { name: 'in most cases', uk: 'здебільшого, у більшості випадків', emoji: '📦', cat: 'hedge', lvl: 'B1', reg: 'formal', when: 'Страхує узагальнення від контрприкладів.', examples: [{ en: '<b>In most cases</b>, the treatment works.', uk: 'У більшості випадків лікування діє.' }] },

  /* ---------------- ЗВʼЯЗКИ ---------------- */
  { name: 'Furthermore', uk: 'Ба більше, крім того', emoji: '➕', cat: 'link', lvl: 'B2', reg: 'formal', when: 'Додає ще один аргумент на ту саму користь. Письмовий відповідник «also».', examples: [{ en: '<b>Furthermore</b>, the method is cheaper.', uk: 'Ба більше, цей метод дешевший.' }] },
  { name: 'Moreover', uk: 'Понад те', emoji: '📚', cat: 'link', lvl: 'B2', reg: 'formal', when: 'Синонім furthermore; не варто ставити обидва поспіль.', examples: [{ en: '<b>Moreover</b>, it saves time.', uk: 'Понад те, це заощаджує час.' }] },
  { name: 'Nevertheless', uk: 'Утім, попри це', emoji: '🔄', cat: 'link', lvl: 'C1', reg: 'formal', when: 'Сильний контраст після визнання чужого аргументу.', examples: [{ en: '<b>Nevertheless</b>, the risks remain.', uk: 'Утім, ризики лишаються.' }] },
  { name: 'Consequently', uk: 'Отже, як наслідок', emoji: '➡️', cat: 'link', lvl: 'C1', reg: 'formal', when: 'Наслідок із попереднього твердження.', examples: [{ en: '<b>Consequently</b>, demand fell.', uk: 'Як наслідок, попит упав.' }] },
  { name: 'In addition to this', uk: 'На додаток до цього', emoji: '📎', cat: 'link', lvl: 'B2', reg: 'formal', when: 'Довший звʼязок на початку абзацу.', examples: [{ en: '<b>In addition to this</b>, staff need training.', uk: 'На додаток до цього, персонал потребує навчання.' }] },
  { name: 'That said', uk: 'Утім, попри сказане', emoji: '🪶', cat: 'link', lvl: 'C1', reg: 'neutral', when: 'Мʼякший контраст — доречний і в письмі, і в усній частині.', examples: [{ en: '<b>That said</b>, the idea is worth testing.', uk: 'Утім, ідею варто перевірити.' }] },
  { name: 'In other words', uk: 'Іншими словами', emoji: '🔁', cat: 'link', lvl: 'B1', reg: 'neutral', when: 'Перефразовуєш складну думку простіше.', examples: [{ en: '<b>In other words</b>, the plan failed.', uk: 'Іншими словами, план провалився.' }] },
  { name: 'Similarly', uk: 'Так само', emoji: '🪞', cat: 'link', lvl: 'B2', reg: 'formal', when: 'Другий приклад тієї самої закономірності.', examples: [{ en: '<b>Similarly</b>, rural schools reported gains.', uk: 'Так само сільські школи повідомили про поліпшення.' }] },

  /* ---------------- ВИСНОВОК ---------------- */
  { name: 'In conclusion', uk: 'На завершення, отже', emoji: '🎓', cat: 'conclude', lvl: 'B1', reg: 'formal', when: 'Найпростіший маркер останнього абзацу.', examples: [{ en: '<b>In conclusion</b>, both factors matter.', uk: 'На завершення: обидва чинники важливі.' }], tip: '💡 У висновку не додають нових аргументів — лише підсумовують.' },
  { name: 'Overall', uk: 'Загалом', emoji: '🌐', cat: 'conclude', lvl: 'B2', reg: 'formal', when: 'Загальний підсумок — добре працює і в описі графіка.', examples: [{ en: '<b>Overall</b>, the trend is positive.', uk: 'Загалом тенденція позитивна.' }] },
  { name: 'To sum up the argument', uk: 'Підсумовуючи аргументацію', emoji: '🧾', cat: 'conclude', lvl: 'B2', reg: 'formal', when: 'Підсумок саме доводів, а не всієї роботи.', examples: [{ en: '<b>To sum up the argument</b>, the costs outweigh the benefits.', uk: 'Підсумовуючи: витрати переважають вигоди.' }] },
  { name: 'This suggests that', uk: 'Це дає підстави вважати, що…', emoji: '💡', cat: 'conclude', lvl: 'C1', reg: 'formal', when: 'Місток від даних до висновку.', examples: [{ en: '<b>This suggests that</b> early support matters most.', uk: 'Це дає підстави вважати, що рання підтримка важливіша за все.' }] },
  { name: 'Further research is needed', uk: 'Потрібні подальші дослідження', emoji: '🔭', cat: 'conclude', lvl: 'C1', reg: 'formal', when: 'Чесний фінал, коли дані неповні.', examples: [{ en: '<b>Further research is needed</b> to confirm this.', uk: 'Потрібні подальші дослідження, щоб це підтвердити.' }] },
  { name: 'In my view', uk: 'На мою думку', emoji: '🙋', cat: 'conclude', lvl: 'B2', reg: 'formal', when: 'Дозволена форма особистої думки в есе — на відміну від «I think so».', examples: [{ en: '<b>In my view</b>, the benefits outweigh the risks.', uk: 'На мою думку, вигоди переважають ризики.' }] },
  { name: 'For these reasons', uk: 'З цих причин', emoji: '📋', cat: 'conclude', lvl: 'B2', reg: 'formal', when: 'Повертає читача до вже наведених доводів.', examples: [{ en: '<b>For these reasons</b>, I support the proposal.', uk: 'З цих причин я підтримую цю пропозицію.' }] },

  /* ---------------- УСНИЙ ІСПИТ ---------------- */
  { name: 'That is a tough one', uk: 'О, складне питання', emoji: '🤔', cat: 'exam', lvl: 'B1', reg: 'casual', when: 'Виграє кілька секунд на роздуми в усній частині — краще за мовчання.', examples: [{ en: '<b>That is a tough one</b>… I suppose it depends.', uk: 'О, складне питання… Мабуть, залежить від обставин.' }] },
  { name: 'I would say', uk: 'Я б сказав, що…', emoji: '🗣️', cat: 'exam', lvl: 'B1', reg: 'neutral', when: 'Мʼякий вступ до думки в усній відповіді.', examples: [{ en: '<b>I would say</b> family comes first.', uk: 'Я б сказав, що родина на першому місці.' }] },
  { name: 'To give you an example', uk: 'Наведу приклад', emoji: '📌', cat: 'exam', lvl: 'B1', reg: 'neutral', when: 'Приклад — найпростіший спосіб подовжити відповідь на іспиті.', examples: [{ en: '<b>To give you an example</b>, my brother works from home.', uk: 'Наведу приклад: мій брат працює з дому.' }] },
  { name: 'It depends on', uk: 'Залежить від…', emoji: '⚖️', cat: 'exam', lvl: 'A2', reg: 'neutral', when: 'Універсальна відповідь, яка вимагає продовження: depends on what?', examples: [{ en: '<b>It depends on</b> the situation.', uk: 'Залежить від ситуації.' }] },
  { name: 'Let me think for a second', uk: 'Дайте секунду подумати', emoji: '⏱️', cat: 'exam', lvl: 'B1', reg: 'casual', when: 'Легальна пауза в усній частині замість «emmm».', examples: [{ en: '<b>Let me think for a second.</b>', uk: 'Дайте секунду подумати.' }] },
  { name: 'What I mean is', uk: 'Я маю на увазі, що…', emoji: '💬', cat: 'exam', lvl: 'B1', reg: 'neutral', when: 'Виправляєш себе, якщо думка вийшла плутаною.', examples: [{ en: '<b>What I mean is</b>, it is not about money.', uk: 'Я маю на увазі, що справа не в грошах.' }] },
  { name: 'Could you rephrase the question', uk: 'Чи можете перефразувати питання?', emoji: '❓', cat: 'exam', lvl: 'B2', reg: 'formal', when: 'Не зрозумів питання — це дозволено й краще, ніж відповісти не по суті.', examples: [{ en: 'Sorry, <b>could you rephrase the question?</b>', uk: 'Вибачте, чи можете перефразувати питання?' }] },
  { name: 'Moving on to my next point', uk: 'Переходжу до наступного пункту', emoji: '➡️', cat: 'exam', lvl: 'B2', reg: 'formal', when: 'Структурує презентацію чи довгу відповідь.', examples: [{ en: '<b>Moving on to my next point</b>, let us look at the cost.', uk: 'Переходжу до наступного пункту — погляньмо на вартість.' }] },
  { name: 'Does that answer your question', uk: 'Чи відповів я на ваше питання?', emoji: '✅', cat: 'exam', lvl: 'B2', reg: 'formal', when: 'Завершує відповідь на захисті або презентації.', examples: [{ en: '<b>Does that answer your question?</b>', uk: 'Чи відповів я на ваше питання?' }] }
];

const FILL_QS = [
  { ctx: 'Вступ есе: одразу називаєш позицію', target: '___ remote work benefits both employers and staff.', correct: 'This essay argues that', distractors: ['In conclusion', 'On the other hand', 'Research shows that'], uk: 'У цьому есе я доводжу, що віддалена робота вигідна і роботодавцям, і працівникам.' },
  { ctx: 'Перша половина збалансованого абзацу', target: '___, cars save a lot of time.', correct: 'On the one hand', distractors: ['Nevertheless', 'Consequently', 'Further research is needed'], uk: 'З одного боку, авто заощаджує багато часу.' },
  { ctx: 'Друга половина того самого абзацу', target: '___, they pollute the air.', correct: 'On the other hand', distractors: ['Similarly', 'In my view', 'Moreover'], uk: 'З іншого боку, вони забруднюють повітря.' },
  { ctx: 'Посилання на звіт організації', target: '___ the World Bank, growth slowed in 2023.', correct: 'According to', distractors: ['In other words', 'Admittedly', 'Overall'], uk: 'За даними Світового банку, у 2023 році зростання сповільнилося.' },
  { ctx: 'Обережний висновок із цифр', target: '___ the effect is smaller than expected.', correct: 'The data suggests that', distractors: ['It is widely believed that', 'For these reasons', 'That said'], uk: 'Дані свідчать, що ефект менший, ніж очікувалося.' },
  { ctx: 'Другий аргумент на ту саму користь', target: '___, the method is significantly cheaper.', correct: 'Furthermore', distractors: ['Nevertheless', 'By contrast', 'In conclusion'], uk: 'Ба більше, цей метод значно дешевший.' },
  { ctx: 'Контраст після визнання чужого аргументу', target: '___, the risks cannot be ignored.', correct: 'Nevertheless', distractors: ['Similarly', 'Moreover', 'According to'], uk: 'Утім, ризики не можна ігнорувати.' },
  { ctx: 'Наслідок попереднього твердження', target: '___, demand fell by 20%.', correct: 'Consequently', distractors: ['Admittedly', 'In addition to this', 'It appears that'], uk: 'Як наслідок, попит упав на 20%.' },
  { ctx: 'Уникаєш категоричного «always»', target: 'Students ___ work better in the morning.', correct: 'tend to', distractors: ['may indicate', 'accounts for', 'is likely to'], uk: 'Студенти зазвичай працюють краще зранку.' },
  { ctx: 'Часткова згода в есе «to what extent»', target: 'I agree with this view ___.', correct: 'to some extent', distractors: ['in conclusion', 'by contrast', 'in most cases'], uk: 'Певною мірою я погоджуюся з цією думкою.' },
  { ctx: 'Останній абзац есе', target: '___, both factors play a role.', correct: 'In conclusion', distractors: ['In recent years', 'A case in point is', 'Furthermore'], uk: 'На завершення: обидва чинники відіграють роль.' },
  { ctx: 'Визнаєш слабке місце свого аргументу', target: '___, the sample was rather small.', correct: 'Admittedly', distractors: ['Moreover', 'Overall', 'This raises the question of'], uk: 'Слід визнати, що вибірка була доволі малою.' },
  { ctx: 'Опис графіка в письмовому іспиті', target: '___, sales peaked in June.', correct: 'As shown in the chart', distractors: ['In my view', 'That said', 'Studies have found'], uk: 'Як показано на діаграмі, пік продажів був у червні.' },
  { ctx: 'Тобі поставили складне питання на іспиті', target: '___… I suppose it depends on the person.', correct: 'That is a tough one', distractors: ['Does that answer your question', 'What I mean is', 'Moving on to my next point'], uk: 'О, складне питання… Мабуть, залежить від людини.' }
];

const TR_QS = [
  { uk: 'З одного боку, це заощаджує час.', answers: ['On the one hand, it saves time', 'On the one hand it saves time'], hint: 'перша половина протиставлення' },
  { uk: 'За даними дослідження, ціни зросли.', answers: ['According to the research, prices rose', 'According to the study, prices rose'], hint: 'посилання на джерело' },
  { uk: 'Дані свідчать, що ефект незначний.', answers: ['The data suggests that the effect is small', 'The data suggests the effect is small'], hint: 'обережний висновок' },
  { uk: 'На завершення: обидва чинники важливі.', answers: ['In conclusion, both factors are important', 'In conclusion, both factors matter'], hint: 'останній абзац' },
  { uk: 'Можна стверджувати, що ця політика провалилася.', answers: ['It could be argued that the policy failed'], hint: 'обережний аргумент' },
  { uk: 'Ба більше, цей метод дешевший.', answers: ['Furthermore, the method is cheaper', 'Moreover, the method is cheaper'], hint: 'додатковий аргумент' },
  { uk: 'Певною мірою я погоджуюся.', answers: ['I agree to some extent', 'To some extent I agree'], hint: 'часткова згода' },
  { uk: 'Студенти зазвичай працюють краще зранку.', answers: ['Students tend to work better in the morning'], hint: 'без категоричності' },
  { uk: 'Це порушує питання про вартість.', answers: ['This raises the question of cost', 'This raises the question of the cost'], hint: 'місток у вступі' },
  { uk: 'На мою думку, вигоди переважають ризики.', answers: ['In my view, the benefits outweigh the risks', 'In my opinion, the benefits outweigh the risks'], hint: 'особиста думка в есе' }
];

const INTRO = '<div class="intro-box blue"><h3>🎓 Академічна англійська — це інший регістр</h3>' +
  '<p>Те саме можна сказати трьома мовами: <i>Loads of people think so</i> (розмовне) → <i>Many people believe this</i> (нейтральне) → <i>It is widely believed that</i> (академічне). Іспит, реферат і робочий звіт очікують третього варіанта.</p></div>' +
  '<div class="intro-box green"><h3>🧱 Каркас есе на 4 абзаци</h3>' +
  '<p><b>1. Вступ:</b> контекст (<i>In recent years…</i>) + теза (<i>This essay argues that…</i>) · <b>2.</b> Аргумент «за» (<i>On the one hand… Furthermore…</i>) · <b>3.</b> Контраргумент (<i>On the other hand… Admittedly…</i>) · <b>4. Висновок:</b> <i>In conclusion… For these reasons…</i>. Ці маркери — половина оцінки за структуру.</p></div>' +
  '<div class="intro-box orange"><h3>🛡️ Обережність = зрілість</h3>' +
  '<p>В академічному письмі цінують не сміливі заяви, а точні. <i>This proves</i> → <i>This suggests</i>; <i>everyone does</i> → <i>people tend to</i>; <i>it will happen</i> → <i>it is likely to happen</i>. Такі помʼякшення (hedging) — ознака високого рівня, а не невпевненості.</p></div>' +
  '<div class="intro-box pink"><h3>🗣️ Усна частина живе за іншими правилами</h3>' +
  '<p>Тут дозволено <i>I would say</i>, <i>that is a tough one</i>, <i>it depends on</i> — вони дають час подумати й звучать природно. Головне — не мовчати: пауза коштує дорожче, ніж проста фраза.</p></div>';

const META = {
  title: '🎓 Academic English — есе, іспити, презентації',
  lead: '56 формул академічного письма й усного іспиту: теза, аргументи, посилання на дані, обережні твердження, звʼязки, висновок і фрази, що рятують на speaking.'
};

return { CATS: CATS, MARKERS: MARKERS, FILL_QS: FILL_QS, TR_QS: TR_QS, INTRO: INTRO, META: META };
})();
