/* EngLift — дані тренажера «work»: робоча англійська — листи, наради, дзвінки, задачі. */
window.PHRASE_DATA = window.PHRASE_DATA || {};
window.PHRASE_DATA["work"] = (function () {

const CATS = {
  open: { emoji: '✉️', label: 'Початок листа', desc: 'I hope this email finds you well, I am writing to' },
  body: { emoji: '📎', label: 'Тіло листа й вкладення', desc: 'Please find attached, as discussed, just a quick note' },
  follow: { emoji: '🔁', label: 'Нагадування й дедлайни', desc: 'Just following up, gentle reminder, by end of day' },
  close: { emoji: '🤝', label: 'Завершення листа', desc: 'Looking forward to, Best regards, feel free to reach out' },
  meet: { emoji: '📅', label: 'Наради й порядок денний', desc: 'Let us get started, moving on, to sum up' },
  call: { emoji: '🎧', label: 'Відеодзвінки й техніка', desc: 'You are on mute, can you see my screen, you are breaking up' },
  task: { emoji: '✅', label: 'Задачі й домовленості', desc: 'I will take that, who is owning this, by when' },
  talk: { emoji: '☕', label: 'Робочий small talk', desc: 'How is your week going, any plans for the weekend' }
};

const MARKERS = [
  /* ---------------- ПОЧАТОК ЛИСТА ---------------- */
  { name: 'I hope this email finds you well', uk: 'Сподіваюся, у вас усе добре', emoji: '✉️', cat: 'open', lvl: 'B1', reg: 'formal', when: 'Стандартний ввічливий вступ до людини, з якою спілкуєшся нечасто. Зі знайомим колегою звучить надто офіційно — там краще «Hope you are doing well».', examples: [{ en: '<b>I hope this email finds you well.</b> I am writing about the invoice.', uk: 'Сподіваюся, у вас усе добре. Пишу щодо рахунку.' }], tip: '💡 Одного вступного рядка достатньо — далі одразу до справи.' },
  { name: 'Hope you are doing well', uk: 'Сподіваюся, у тебе все гаразд', emoji: '🙂', cat: 'open', lvl: 'A2', reg: 'neutral', when: 'Коротший, менш формальний вступ для колег і партнерів, з якими вже є контакт.', examples: [{ en: '<b>Hope you are doing well!</b> Quick question about Friday.', uk: 'Сподіваюся, все гаразд! Коротке питання щодо пʼятниці.' }] },
  { name: 'I am writing to', uk: 'Пишу вам, щоб…', emoji: '🖋️', cat: 'open', lvl: 'B1', reg: 'formal', when: 'Одразу називає мету листа в першому рядку. Далі — інфінітив: to ask, to confirm, to let you know.', examples: [{ en: '<b>I am writing to</b> confirm our meeting on Thursday.', uk: 'Пишу, щоб підтвердити нашу зустріч у четвер.' }] },
  { name: 'Just a quick note to', uk: 'Коротко напишу, щоб…', emoji: '📝', cat: 'open', lvl: 'B1', reg: 'neutral', when: 'Сигналізує, що лист короткий і не потребує довгої відповіді.', examples: [{ en: '<b>Just a quick note to</b> say the files are ready.', uk: 'Коротко: файли готові.' }] },
  { name: 'Following up on our conversation', uk: 'На продовження нашої розмови', emoji: '🔗', cat: 'open', lvl: 'B2', reg: 'formal', when: 'Привʼязує лист до дзвінка чи зустрічі, що вже були.', examples: [{ en: '<b>Following up on our conversation</b> yesterday, here is the proposal.', uk: 'На продовження вчорашньої розмови — ось пропозиція.' }] },
  { name: 'Thanks for getting back to me', uk: 'Дякую, що відповіли', emoji: '🙏', cat: 'open', lvl: 'B1', reg: 'neutral', when: 'Перший рядок у відповідь на чужий лист.', examples: [{ en: '<b>Thanks for getting back to me</b> so quickly.', uk: 'Дякую, що так швидко відповіли.' }] },
  { name: 'Apologies for the delay in replying', uk: 'Перепрошую за затримку з відповіддю', emoji: '⏳', cat: 'open', lvl: 'B2', reg: 'formal', when: 'Коли відповідаєш пізніше, ніж варто було. Без виправдань — просто визнав і перейшов до справи.', examples: [{ en: '<b>Apologies for the delay in replying</b> — last week was hectic.', uk: 'Перепрошую за затримку — минулий тиждень був шалений.' }] },
  { name: 'I am reaching out about', uk: 'Звертаюся до вас щодо…', emoji: '📮', cat: 'open', lvl: 'B2', reg: 'neutral', when: 'Перший контакт із незнайомою людиною: клієнт, рекрутер, партнер.', examples: [{ en: 'I am <b>reaching out about</b> a role on your team.', uk: 'Звертаюся щодо вакансії у вашій команді.' }] },
  { name: 'As per my previous email', uk: 'Як я вже писав у попередньому листі', emoji: '📨', cat: 'open', lvl: 'B2', reg: 'formal', when: 'Обережно: звучить сухо й трохи роздратовано. Мʼякше — «As mentioned earlier».', examples: [{ en: '<b>As per my previous email</b>, the deadline is Friday.', uk: 'Як я вже писав, дедлайн — пʼятниця.' }], tip: '⚠️ У листуванні це читається як докір. Якщо не хочеш конфлікту — «Just to recap…».' },

  /* ---------------- ТІЛО ЛИСТА ---------------- */
  { name: 'Please find attached', uk: 'У вкладенні надсилаю…', emoji: '📎', cat: 'body', lvl: 'B1', reg: 'formal', when: 'Класична формула про вкладений файл. Розмовніше — «I have attached…» або «Attached is…».', examples: [{ en: '<b>Please find attached</b> the updated contract.', uk: 'У вкладенні — оновлений договір.' }] },
  { name: 'I have attached', uk: 'Я додав до листа', emoji: '🗂️', cat: 'body', lvl: 'A2', reg: 'neutral', when: 'Сучасніший і простіший варіант за «please find attached».', examples: [{ en: '<b>I have attached</b> the report for your review.', uk: 'Додаю звіт на ваш розгляд.' }] },
  { name: 'As discussed', uk: 'Як ми й домовлялися', emoji: '💬', cat: 'body', lvl: 'B1', reg: 'neutral', when: 'Посилання на усну домовленість — фіксує її письмово.', examples: [{ en: '<b>As discussed</b>, we will start on Monday.', uk: 'Як домовлялися, починаємо в понеділок.' }] },
  { name: 'Just to recap', uk: 'Коротко підсумую', emoji: '📋', cat: 'body', lvl: 'B2', reg: 'neutral', when: 'Перед переліком домовленостей після зустрічі.', examples: [{ en: '<b>Just to recap</b>: you send the draft, I review it by Friday.', uk: 'Підсумую: ти надсилаєш чернетку, я перевіряю до пʼятниці.' }] },
  { name: 'Could you please', uk: 'Чи не могли б ви…', emoji: '🙏', cat: 'body', lvl: 'A2', reg: 'formal', when: 'Найбезпечніша форма прохання в листі.', examples: [{ en: '<b>Could you please</b> confirm the address?', uk: 'Чи не могли б ви підтвердити адресу?' }] },
  { name: 'Would it be possible to', uk: 'Чи можливо було б…', emoji: '🕊️', cat: 'body', lvl: 'B2', reg: 'formal', when: 'Мʼякше за «Can you» — коли просиш про послугу або виняток.', examples: [{ en: '<b>Would it be possible to</b> move the call to 4 pm?', uk: 'Чи можливо перенести дзвінок на 16:00?' }] },
  { name: 'I wanted to flag', uk: 'Хочу звернути увагу на…', emoji: '🚩', cat: 'body', lvl: 'B2', reg: 'neutral', when: 'Попереджаєш про ризик чи проблему без паніки.', examples: [{ en: '<b>I wanted to flag</b> a possible delay on the design.', uk: 'Хочу звернути увагу: дизайн може затриматися.' }] },
  { name: 'Correct me if I am wrong', uk: 'Виправте мене, якщо я помиляюся', emoji: '✏️', cat: 'body', lvl: 'B1', reg: 'neutral', when: 'Перевіряєш своє розуміння, не звинувачуючи нікого.', examples: [{ en: '<b>Correct me if I am wrong</b>, but the budget was approved?', uk: 'Виправте, якщо я помиляюся: бюджет затвердили?' }] },
  { name: 'For your reference', uk: 'Для довідки', emoji: '📌', cat: 'body', lvl: 'B2', reg: 'formal', when: 'Додаєш інформацію, яка не потребує дії. Ще пишуть FYI — але лише неформально.', examples: [{ en: '<b>For your reference</b>, the old version is in the folder.', uk: 'Для довідки: стара версія лежить у теці.' }] },
  { name: 'Looping in', uk: 'Додаю до листування…', emoji: '➕', cat: 'body', lvl: 'B2', reg: 'neutral', when: 'Коли додаєш колегу в копію: «Looping in Anna, who owns this».', examples: [{ en: '<b>Looping in</b> Anna — she handles invoices.', uk: 'Додаю Анну — рахунки в її зоні.' }] },
  { name: 'Please disregard my last message', uk: 'Не зважайте на попереднє повідомлення', emoji: '🙈', cat: 'body', lvl: 'B2', reg: 'formal', when: 'Коли надіслав не те або проблема вже вирішилася.', examples: [{ en: '<b>Please disregard my last message</b> — I found the file.', uk: 'Не зважайте на попередній лист — я знайшов файл.' }] },

  /* ---------------- НАГАДУВАННЯ Й ДЕДЛАЙНИ ---------------- */
  { name: 'Just following up on', uk: 'Нагадую про…', emoji: '🔁', cat: 'follow', lvl: 'B1', reg: 'neutral', when: 'Найввічливіше нагадування про лист без відповіді.', examples: [{ en: '<b>Just following up on</b> my email from Monday.', uk: 'Нагадую про свій лист від понеділка.' }] },
  { name: 'A gentle reminder', uk: 'Мʼяко нагадую', emoji: '🔔', cat: 'follow', lvl: 'B2', reg: 'formal', when: 'Нагадування про дедлайн чи оплату. Слово gentle знімає тиск.', examples: [{ en: '<b>A gentle reminder</b> that the form is due tomorrow.', uk: 'Мʼяко нагадую: форму треба подати завтра.' }] },
  { name: 'When you get a chance', uk: 'Коли буде хвилинка', emoji: '⏱️', cat: 'follow', lvl: 'B1', reg: 'neutral', when: 'Прохання без дедлайну — не терміново.', examples: [{ en: 'Could you take a look <b>when you get a chance</b>?', uk: 'Глянь, будь ласка, коли буде хвилинка.' }] },
  { name: 'By end of day', uk: 'до кінця дня', emoji: '🌆', cat: 'follow', lvl: 'B1', reg: 'neutral', when: 'Часто скорочують до EOD; так само EOW — до кінця тижня.', examples: [{ en: 'I will send it <b>by end of day</b>.', uk: 'Надішлю до кінця дня.' }] },
  { name: 'No rush', uk: 'Без поспіху', emoji: '🐢', cat: 'follow', lvl: 'A2', reg: 'casual', when: 'Знімає тиск із прохання — дуже цінується в листуванні.', examples: [{ en: 'Have a look when you can — <b>no rush</b>.', uk: 'Глянь, коли зможеш, — без поспіху.' }] },
  { name: 'This is time-sensitive', uk: 'Це терміново, є часові рамки', emoji: '⏰', cat: 'follow', lvl: 'B2', reg: 'formal', when: 'Професійний спосіб сказати «горить», не кричачи URGENT.', examples: [{ en: 'Sorry to push, but <b>this is time-sensitive</b>.', uk: 'Вибачте, що тисну, але це терміново.' }] },
  { name: 'Are we still on track for', uk: 'Ми ще встигаємо до…?', emoji: '🛤️', cat: 'follow', lvl: 'B2', reg: 'neutral', when: 'Перевіряєш статус дедлайну, не звинувачуючи.', examples: [{ en: '<b>Are we still on track for</b> Friday?', uk: 'Ми ще встигаємо до пʼятниці?' }] },
  { name: 'I will need an extension', uk: 'Мені потрібно більше часу', emoji: '📆', cat: 'follow', lvl: 'B2', reg: 'neutral', when: 'Попереджай заздалегідь і одразу пропонуй нову дату.', examples: [{ en: '<b>I will need an extension</b> — can we say Wednesday?', uk: 'Мені потрібно більше часу — можна до середи?' }] },

  /* ---------------- ЗАВЕРШЕННЯ ЛИСТА ---------------- */
  { name: 'Let me know if you have any questions', uk: 'Питайте, якщо щось незрозуміло', emoji: '❓', cat: 'close', lvl: 'A2', reg: 'neutral', when: 'Найуніверсальніший передостанній рядок листа.', examples: [{ en: '<b>Let me know if you have any questions.</b>', uk: 'Питайте, якщо щось незрозуміло.' }] },
  { name: 'Looking forward to hearing from you', uk: 'Чекаю на вашу відповідь', emoji: '📬', cat: 'close', lvl: 'B1', reg: 'formal', when: 'Ввічливо натякає, що відповідь потрібна.', examples: [{ en: '<b>Looking forward to hearing from you.</b>', uk: 'Чекатиму на вашу відповідь.' }], tip: '💡 Після looking forward to завжди йде -ing: looking forward to meeting you.' },
  { name: 'Feel free to reach out', uk: 'Звертайтеся, не соромтеся', emoji: '🤙', cat: 'close', lvl: 'B1', reg: 'neutral', when: 'Дружнє «пишіть, якщо що».', examples: [{ en: '<b>Feel free to reach out</b> any time.', uk: 'Звертайтеся будь-коли.' }] },
  { name: 'Thanks in advance', uk: 'Наперед дякую', emoji: '🙏', cat: 'close', lvl: 'B1', reg: 'neutral', when: 'Дякуєш за дію, яку ще тільки просиш зробити.', examples: [{ en: '<b>Thanks in advance</b> for your help.', uk: 'Наперед дякую за допомогу.' }] },
  { name: 'Best regards', uk: 'З повагою', emoji: '🤝', cat: 'close', lvl: 'A2', reg: 'formal', when: 'Найбезпечніший підпис у діловому листі. Kind regards — трохи тепліше, Best — неформально.', examples: [{ en: '<b>Best regards,</b> Ruslan', uk: 'З повагою, Руслан' }] },
  { name: 'Have a great weekend', uk: 'Гарних вихідних', emoji: '🌞', cat: 'close', lvl: 'A2', reg: 'casual', when: 'Теплий фінал у пʼятничному листі.', examples: [{ en: 'Talk soon — <b>have a great weekend!</b>', uk: 'До звʼязку — гарних вихідних!' }] },
  { name: 'Let me know your thoughts', uk: 'Напишіть, що думаєте', emoji: '💭', cat: 'close', lvl: 'B1', reg: 'neutral', when: 'Просиш думку, а не дію.', examples: [{ en: 'Draft attached — <b>let me know your thoughts</b>.', uk: 'Чернетка у вкладенні — напиши, що думаєш.' }] },

  /* ---------------- НАРАДИ ---------------- */
  { name: 'Shall we get started', uk: 'Може, почнімо?', emoji: '▶️', cat: 'meet', lvl: 'B1', reg: 'neutral', when: 'Відкриває нараду, коли всі вже зібралися.', examples: [{ en: 'Everyone is here — <b>shall we get started?</b>', uk: 'Усі на місці — почнімо?' }] },
  { name: 'Let us go around the room', uk: 'Пройдімося по колу', emoji: '🔄', cat: 'meet', lvl: 'B2', reg: 'neutral', when: 'Коли кожен має коротко висловитися по черзі.', examples: [{ en: '<b>Let us go around the room</b> with quick updates.', uk: 'Пройдімося по колу з короткими апдейтами.' }] },
  { name: 'Moving on to', uk: 'Переходимо до…', emoji: '➡️', cat: 'meet', lvl: 'B1', reg: 'neutral', when: 'Перехід до наступного пункту порядку денного.', examples: [{ en: '<b>Moving on to</b> the budget.', uk: 'Переходимо до бюджету.' }] },
  { name: 'Can we park that for now', uk: 'Може, відкладімо це поки що?', emoji: '🅿️', cat: 'meet', lvl: 'B2', reg: 'neutral', when: 'Ввічливо зупиняє тему, що зʼїдає час наради.', examples: [{ en: 'Good point — <b>can we park that for now?</b>', uk: 'Слушно — але, може, поки відкладімо?' }] },
  { name: 'Let us take this offline', uk: 'Обговорімо це окремо', emoji: '🔕', cat: 'meet', lvl: 'B2', reg: 'neutral', when: 'Тема цікава лише двом учасникам — її виносять за межі наради.', examples: [{ en: 'That is a detail — <b>let us take this offline</b>.', uk: 'Це деталі — обговорімо окремо.' }] },
  { name: 'Can we circle back to that', uk: 'Повернімося до цього пізніше', emoji: '↩️', cat: 'meet', lvl: 'B2', reg: 'neutral', when: 'Обіцяєш повернутися до питання, а не замʼяти його.', examples: [{ en: '<b>Can we circle back to that</b> at the end?', uk: 'Можемо повернутися до цього наприкінці?' }] },
  { name: 'Sorry, go ahead', uk: 'Вибач, кажи ти', emoji: '🙋', cat: 'meet', lvl: 'A2', reg: 'casual', when: 'Коли двоє заговорили одночасно — найчастіша фраза онлайн-наради.', examples: [{ en: 'Oh — <b>sorry, go ahead.</b>', uk: 'Ой — вибач, кажи ти.' }] },
  { name: 'Just to build on that', uk: 'Хочу додати до сказаного', emoji: '🧱', cat: 'meet', lvl: 'B2', reg: 'neutral', when: 'Підтримуєш чужу думку й розвиваєш її — звучить командно.', examples: [{ en: '<b>Just to build on that</b>, we could also test it.', uk: 'Додам до сказаного: це ще можна протестувати.' }] },
  { name: 'I see your point, but', uk: 'Розумію вашу думку, але…', emoji: '⚖️', cat: 'meet', lvl: 'B1', reg: 'neutral', when: 'Незгода без конфлікту: спершу визнай, потім заперечуй.', examples: [{ en: '<b>I see your point, but</b> the timeline worries me.', uk: 'Розумію вас, але мене турбують терміни.' }] },
  { name: 'Where do we stand on', uk: 'Як у нас справи з…?', emoji: '📊', cat: 'meet', lvl: 'B2', reg: 'neutral', when: 'Питаєш про статус задачі чи рішення.', examples: [{ en: '<b>Where do we stand on</b> the contract?', uk: 'Як у нас справи з договором?' }] },
  { name: 'To sum up', uk: 'Підсумовуючи', emoji: '🧾', cat: 'meet', lvl: 'B1', reg: 'neutral', when: 'Фінал наради: три речення про домовленості.', examples: [{ en: '<b>To sum up</b>: design by Tuesday, launch on Friday.', uk: 'Підсумую: дизайн до вівторка, запуск у пʼятницю.' }] },
  { name: 'Any other business', uk: 'Чи є ще питання?', emoji: '🗒️', cat: 'meet', lvl: 'B2', reg: 'formal', when: 'Формальне закриття порядку денного, часто пишуть AOB.', examples: [{ en: '<b>Any other business</b> before we finish?', uk: 'Чи є ще питання, перш ніж завершимо?' }] },
  { name: 'Let us wrap up', uk: 'Давайте завершувати', emoji: '🎁', cat: 'meet', lvl: 'B1', reg: 'casual', when: 'Часу лишилося мало — час закруглятися.', examples: [{ en: 'We are at time — <b>let us wrap up</b>.', uk: 'Час вийшов — завершуймо.' }] },

  /* ---------------- ВІДЕОДЗВІНКИ ---------------- */
  { name: 'You are on mute', uk: 'У тебе вимкнений мікрофон', emoji: '🔇', cat: 'call', lvl: 'A2', reg: 'casual', when: 'Фраза номер один будь-якого відеодзвінка.', examples: [{ en: 'Anna, <b>you are on mute.</b>', uk: 'Анно, у тебе вимкнений мікрофон.' }] },
  { name: 'Can you hear me', uk: 'Мене чути?', emoji: '🎤', cat: 'call', lvl: 'A2', reg: 'casual', when: 'Перевірка звуку на початку дзвінка.', examples: [{ en: '<b>Can you hear me</b> okay?', uk: 'Мене нормально чути?' }] },
  { name: 'You are breaking up', uk: 'Ти пропадаєш, звук рветься', emoji: '📶', cat: 'call', lvl: 'B1', reg: 'casual', when: 'Про поганий звʼязок — саме breaking up, не «broken».', examples: [{ en: 'Sorry, <b>you are breaking up</b> a bit.', uk: 'Вибач, ти трохи пропадаєш.' }] },
  { name: 'We lost you for a second', uk: 'Ти на секунду зник', emoji: '👻', cat: 'call', lvl: 'B1', reg: 'casual', when: 'Після короткого обриву — прохання повторити.', examples: [{ en: '<b>We lost you for a second</b> — could you repeat that?', uk: 'Ти на секунду зник — повториш?' }] },
  { name: 'Let me share my screen', uk: 'Зараз покажу екран', emoji: '🖥️', cat: 'call', lvl: 'B1', reg: 'neutral', when: 'Перед демонстрацією. Далі питають: Can everyone see my screen?', examples: [{ en: '<b>Let me share my screen</b> for a second.', uk: 'Зараз на секунду покажу екран.' }] },
  { name: 'Can everyone see my screen', uk: 'Усім видно мій екран?', emoji: '👀', cat: 'call', lvl: 'B1', reg: 'neutral', when: 'Перевірка після ввімкнення демонстрації.', examples: [{ en: '<b>Can everyone see my screen?</b>', uk: 'Усім видно мій екран?' }] },
  { name: 'I will drop it in the chat', uk: 'Скину посилання в чат', emoji: '💬', cat: 'call', lvl: 'B1', reg: 'casual', when: 'Про посилання чи файл під час дзвінка.', examples: [{ en: '<b>I will drop it in the chat.</b>', uk: 'Скину в чат.' }] },
  { name: 'My connection is unstable', uk: 'У мене нестабільний звʼязок', emoji: '📡', cat: 'call', lvl: 'B2', reg: 'neutral', when: 'Попереджаєш заздалегідь, щоб не думали, що ти зник.', examples: [{ en: '<b>My connection is unstable</b> — I may drop off.', uk: 'У мене нестабільний звʼязок — можу випасти.' }] },
  { name: 'I will keep my camera off', uk: 'Буду без камери', emoji: '📷', cat: 'call', lvl: 'B1', reg: 'casual', when: 'Ввічливо попередити, а не просто зникнути з екрана.', examples: [{ en: '<b>I will keep my camera off</b>, the internet is slow here.', uk: 'Буду без камери — тут повільний інтернет.' }] },
  { name: 'Do you mind if I jump in', uk: 'Можна я вставлю слово?', emoji: '✋', cat: 'call', lvl: 'B2', reg: 'neutral', when: 'Ввічливо перебити, коли інакше не дадуть слова.', examples: [{ en: '<b>Do you mind if I jump in</b> here?', uk: 'Можна я тут вставлю слово?' }] },
  { name: 'I have a hard stop at', uk: 'Мені треба вийти рівно о…', emoji: '⛔', cat: 'call', lvl: 'B2', reg: 'neutral', when: 'Попереджаєш на початку, що маєш жорсткий кінець часу.', examples: [{ en: 'Heads-up: <b>I have a hard stop at</b> 3.', uk: 'Попереджаю: о третій мені треба вийти.' }] },

  /* ---------------- ЗАДАЧІ ---------------- */
  { name: 'I will take that', uk: 'Я це візьму на себе', emoji: '🙋', cat: 'task', lvl: 'A2', reg: 'neutral', when: 'Береш задачу — коротко й чітко.', examples: [{ en: '<b>I will take that</b> and update you tomorrow.', uk: 'Візьму це на себе й завтра відпишу.' }] },
  { name: 'Who is owning this', uk: 'Хто за це відповідає?', emoji: '👤', cat: 'task', lvl: 'B2', reg: 'neutral', when: 'Уточнюєш відповідального, щоб задача не зависла.', examples: [{ en: '<b>Who is owning this</b> after the launch?', uk: 'Хто відповідає за це після запуску?' }] },
  { name: 'What is the deadline on this', uk: 'Який тут дедлайн?', emoji: '📅', cat: 'task', lvl: 'B1', reg: 'neutral', when: 'Друге питання після «хто робить».', examples: [{ en: '<b>What is the deadline on this?</b>', uk: 'Який дедлайн у цієї задачі?' }] },
  { name: 'Can I get back to you on that', uk: 'Можна я відповім згодом?', emoji: '↩️', cat: 'task', lvl: 'B1', reg: 'neutral', when: 'Не знаєш відповіді зараз — і це нормально.', examples: [{ en: '<b>Can I get back to you on that</b> tomorrow?', uk: 'Можна я відповім завтра?' }] },
  { name: 'That is not my call', uk: 'Це не моє рішення', emoji: '🚧', cat: 'task', lvl: 'B2', reg: 'casual', when: 'Питання поза твоєю зоною відповідальності.', examples: [{ en: 'Honestly, <b>that is not my call</b> — ask Maria.', uk: 'Чесно, це не моє рішення — спитай Марію.' }] },
  { name: 'I am at capacity right now', uk: 'Я зараз завантажений під завʼязку', emoji: '📦', cat: 'task', lvl: 'B2', reg: 'formal', when: 'Професійна відмова від нової задачі без слова «ні».', examples: [{ en: '<b>I am at capacity right now</b> — could it wait until Monday?', uk: 'Я зараз повністю завантажений — це може зачекати до понеділка?' }] },
  { name: 'Can we prioritize', uk: 'Давайте розставимо пріоритети', emoji: '🔢', cat: 'task', lvl: 'B2', reg: 'neutral', when: 'Коли задач більше, ніж часу: нехай обирає замовник.', examples: [{ en: '<b>Can we prioritize</b>? I cannot do both by Friday.', uk: 'Розставмо пріоритети: обидві задачі до пʼятниці я не встигну.' }] },
  { name: 'Let us align on', uk: 'Узгодьмо…', emoji: '🧭', cat: 'task', lvl: 'B2', reg: 'neutral', when: 'Про спільне розуміння цілей чи термінів.', examples: [{ en: '<b>Let us align on</b> the scope first.', uk: 'Спершу узгодьмо обсяг робіт.' }] },
  { name: 'I will keep you in the loop', uk: 'Триматиму вас у курсі', emoji: '🔁', cat: 'task', lvl: 'B1', reg: 'neutral', when: 'Обіцяєш регулярні апдейти.', examples: [{ en: '<b>I will keep you in the loop.</b>', uk: 'Триматиму тебе в курсі.' }] },
  { name: 'It is on my radar', uk: 'Я памʼятаю про це', emoji: '📡', cat: 'task', lvl: 'B2', reg: 'casual', when: 'Задача не забута, але ще не в роботі.', examples: [{ en: 'Do not worry, <b>it is on my radar</b>.', uk: 'Не хвилюйся, я про це памʼятаю.' }] },
  { name: 'Let me double-check and confirm', uk: 'Перевірю ще раз і підтверджу', emoji: '✅', cat: 'task', lvl: 'B1', reg: 'neutral', when: 'Безпечна відповідь, коли не впевнений на 100%.', examples: [{ en: '<b>Let me double-check and confirm</b> by email.', uk: 'Перевірю ще раз і підтверджу листом.' }] },
  { name: 'I am blocked on', uk: 'Я застряг через…', emoji: '🚫', cat: 'task', lvl: 'B2', reg: 'neutral', when: 'Ключове слово з робочих статусів: без чого не можеш рухатися далі.', examples: [{ en: '<b>I am blocked on</b> the API keys.', uk: 'Я застряг через ключі до API.' }] },
  { name: 'Nice work on', uk: 'Гарна робота з…', emoji: '👏', cat: 'task', lvl: 'A2', reg: 'casual', when: 'Конкретна похвала колезі — називай, за що саме.', examples: [{ en: '<b>Nice work on</b> the presentation yesterday.', uk: 'Гарна робота з учорашньою презентацією.' }] },

  /* ---------------- SMALL TALK ---------------- */
  { name: 'How is your week going', uk: 'Як твій тиждень?', emoji: '☕', cat: 'talk', lvl: 'A2', reg: 'casual', when: 'Найтиповіший старт розмови перед нарадою.', examples: [{ en: '<b>How is your week going</b> so far?', uk: 'Як тобі тиждень поки що?' }] },
  { name: 'Any plans for the weekend', uk: 'Є плани на вихідні?', emoji: '🗓️', cat: 'talk', lvl: 'A2', reg: 'casual', when: 'Пʼятничний small talk. У понеділок — How was your weekend?', examples: [{ en: '<b>Any plans for the weekend?</b>', uk: 'Є плани на вихідні?' }] },
  { name: 'What do you do', uk: 'Чим ти займаєшся?', emoji: '💼', cat: 'talk', lvl: 'A2', reg: 'casual', when: 'Питання про професію на нетворкінгу — не «What is your work?».', examples: [{ en: 'So, <b>what do you do?</b>', uk: 'То чим ти займаєшся?' }] },
  { name: 'How long have you been with the company', uk: 'Давно ти в компанії?', emoji: '🏢', cat: 'talk', lvl: 'B1', reg: 'neutral', when: 'Безпечне питання новому колезі.', examples: [{ en: '<b>How long have you been with the company?</b>', uk: 'Давно ти в компанії?' }] },
  { name: 'It was great meeting you', uk: 'Було приємно познайомитися', emoji: '🤝', cat: 'talk', lvl: 'B1', reg: 'neutral', when: 'Завершення знайомства — на конференції або після дзвінка.', examples: [{ en: '<b>It was great meeting you</b> — let us stay in touch.', uk: 'Було приємно познайомитися — тримаймо звʼязок.' }] },
  { name: 'Let us stay in touch', uk: 'Тримаймо звʼязок', emoji: '📱', cat: 'talk', lvl: 'B1', reg: 'casual', when: 'Фінал розмови з новим контактом.', examples: [{ en: '<b>Let us stay in touch</b> on LinkedIn.', uk: 'Тримаймо звʼязок у LinkedIn.' }] },
  { name: 'I have heard a lot about you', uk: 'Багато про вас чув', emoji: '👋', cat: 'talk', lvl: 'B1', reg: 'neutral', when: 'Тепле перше враження під час знайомства.', examples: [{ en: 'Nice to finally meet you — <b>I have heard a lot about you</b>.', uk: 'Приємно нарешті познайомитися — багато про вас чув.' }] },
  { name: 'Sorry to keep you', uk: 'Вибач, що затримую', emoji: '⏳', cat: 'talk', lvl: 'B1', reg: 'neutral', when: 'Коли розмова затягнулася, а людині вже час.', examples: [{ en: '<b>Sorry to keep you</b> — one last thing.', uk: 'Вибач, що затримую, — останнє питання.' }] }
];

const FILL_QS = [
  { ctx: 'Перший рядок листа клієнту', target: '___. I am writing about next week workshop.', correct: 'I hope this email finds you well', distractors: ['Best regards', 'Please find attached', 'No rush'], uk: 'Сподіваюся, у вас усе добре. Пишу щодо воркшопу наступного тижня.' },
  { ctx: 'Надсилаєш договір', target: '___ the signed contract.', correct: 'Please find attached', distractors: ['Just following up on', 'Feel free to reach out', 'To sum up'], uk: 'У вкладенні — підписаний договір.' },
  { ctx: 'Лист без відповіді вже три дні', target: '___ my email from Monday.', correct: 'Just following up on', distractors: ['Thanks in advance', 'Please disregard my last message', 'Moving on to'], uk: 'Нагадую про свій лист від понеділка.' },
  { ctx: 'Кінець ділового листа', target: '___.', correct: 'Looking forward to hearing from you', distractors: ['Thanks for getting back to me', 'As discussed', 'I wanted to flag'], uk: 'Чекаю на вашу відповідь.' },
  { ctx: 'Прохання без терміновості', target: 'Could you review it ___?', correct: 'when you get a chance', distractors: ['this is time-sensitive', 'by end of day', 'as per my previous email'], uk: 'Переглянь, коли буде хвилинка.' },
  { ctx: 'Колега говорить, а його не чути', target: 'Anna, ___.', correct: 'you are on mute', distractors: ['you are breaking up', 'we lost you for a second', 'can everyone see my screen'], uk: 'Анно, у тебе вимкнений мікрофон.' },
  { ctx: 'Звук рветься, чути уривками', target: 'Sorry, ___ a bit.', correct: 'you are breaking up', distractors: ['you are on mute', 'I will drop it in the chat', 'let me share my screen'], uk: 'Вибач, ти трохи пропадаєш.' },
  { ctx: 'Тема цікава лише двом учасникам наради', target: 'That is a detail — ___.', correct: 'Let us take this offline', distractors: ['Shall we get started', 'Any other business', 'Nice work on'], uk: 'Це деталі — обговорімо окремо.' },
  { ctx: 'Наступний пункт порядку денного', target: '___ the budget.', correct: 'Moving on to', distractors: ['To sum up', 'Where do we stand on', 'Sorry, go ahead'], uk: 'Переходимо до бюджету.' },
  { ctx: 'Фінал наради, три рядки про домовленості', target: '___: design by Tuesday, launch Friday.', correct: 'To sum up', distractors: ['Shall we get started', 'Just to build on that', 'For your reference'], uk: 'Підсумую: дизайн до вівторка, запуск у пʼятницю.' },
  { ctx: 'Тобі дають ще одну задачу, а ти вже завалений', target: '___ — could it wait until Monday?', correct: 'I am at capacity right now', distractors: ['That is not my call', 'It is on my radar', 'I will take that'], uk: 'Я зараз повністю завантажений — це може зачекати до понеділка?' },
  { ctx: 'Не можеш рухатися далі без ключів доступу', target: '___ the API keys.', correct: 'I am blocked on', distractors: ['I will keep you in the loop', 'Let us align on', 'Who is owning this'], uk: 'Я застряг через ключі до API.' },
  { ctx: 'Не впевнений у цифрі на дзвінку', target: '___ by email.', correct: 'Let me double-check and confirm', distractors: ['Thanks in advance', 'Apologies for the delay in replying', 'Please disregard my last message'], uk: 'Перевірю ще раз і підтверджу листом.' },
  { ctx: 'Незгода на нараді без конфлікту', target: '___ the timeline worries me.', correct: 'I see your point, but', distractors: ['Any other business', 'Correct me if I am wrong', 'Let us wrap up'], uk: 'Розумію вашу думку, але мене турбують терміни.' },
  { ctx: 'Обидва заговорили одночасно', target: 'Oh — ___.', correct: 'Sorry, go ahead', distractors: ['Do you mind if I jump in', 'I have a hard stop at', 'Can we circle back to that'], uk: 'Ой — вибач, кажи ти.' },
  { ctx: 'Пишеш людині, яку не знаєш, про вакансію', target: '___ a role on your team.', correct: 'I am reaching out about', distractors: ['Just following up on', 'Looping in', 'I wanted to flag'], uk: 'Звертаюся щодо вакансії у вашій команді.' }
];

const SITUATIONS = [
  { sit: '🔇 Колега ворушить губами на дзвінку, але звуку немає.', correctEn: 'You are on mute' },
  { sit: '🖥️ Ти хочеш показати команді документ під час дзвінка.', correctEn: 'Let me share my screen' },
  { sit: '📶 Клієнт говорить уривками, половину слів не чути.', correctEn: 'You are breaking up' },
  { sit: '⛔ Зустріч почалася, а о третій у тебе інший дзвінок.', correctEn: 'I have a hard stop at' },
  { sit: '📎 Надсилаєш клієнту оновлений договір листом.', correctEn: 'Please find attached' },
  { sit: '🔁 Минув тиждень, відповіді на твій лист немає.', correctEn: 'Just following up on' },
  { sit: '🐢 Просиш колегу глянути документ, але це зовсім не терміново.', correctEn: 'No rush' },
  { sit: '📬 Завершуєш лист потенційному партнеру й чекаєш відповіді.', correctEn: 'Looking forward to hearing from you' },
  { sit: '📦 Керівник дає нову задачу, а в тебе вже три дедлайни цього тижня.', correctEn: 'I am at capacity right now' },
  { sit: '🚫 Ти не можеш продовжити роботу, доки не дадуть доступи.', correctEn: 'I am blocked on' },
  { sit: '🅿️ Хтось на нараді десять хвилин обговорює дрібницю, а часу мало.', correctEn: 'Can we park that for now' },
  { sit: '🧾 Нарада добігає кінця, треба назвати домовленості.', correctEn: 'To sum up' },
  { sit: '❓ Тебе питають про цифру, якої ти точно не памʼятаєш.', correctEn: 'Let me double-check and confirm' },
  { sit: '👤 Задача обговорена, але незрозуміло, хто за неї відповідає.', correctEn: 'Who is owning this' },
  { sit: '🙏 Просиш колегу зробити щось і дякуєш наперед.', correctEn: 'Thanks in advance' },
  { sit: '⏳ Ти відповідаєш на лист із запізненням на тиждень.', correctEn: 'Apologies for the delay in replying' },
  { sit: '➕ Додаєш до листування колегу, який веде рахунки.', correctEn: 'Looping in' },
  { sit: '🤝 Прощаєшся з новим знайомим після конференції.', correctEn: 'It was great meeting you' }
];

const TR_QS = [
  { uk: 'У вкладенні — оновлений звіт.', answers: ['Please find attached the updated report', 'I have attached the updated report'], hint: 'про вкладення' },
  { uk: 'Нагадую про свій лист від понеділка.', answers: ['Just following up on my email from Monday', 'Following up on my email from Monday'], hint: 'ввічливе нагадування' },
  { uk: 'Чекаю на вашу відповідь.', answers: ['Looking forward to hearing from you', 'I look forward to hearing from you'], hint: 'фінал листа' },
  { uk: 'Питайте, якщо щось незрозуміло.', answers: ['Let me know if you have any questions'], hint: 'фінал листа' },
  { uk: 'У тебе вимкнений мікрофон.', answers: ["You're on mute", 'You are on mute'], hint: 'відеодзвінок' },
  { uk: 'Зараз покажу екран.', answers: ['Let me share my screen', "I'll share my screen"], hint: 'демонстрація' },
  { uk: 'Переходимо до бюджету.', answers: ['Moving on to the budget', "Let's move on to the budget"], hint: 'порядок денний' },
  { uk: 'Підсумовуючи: запуск у пʼятницю.', answers: ['To sum up, the launch is on Friday', 'To sum up the launch is on Friday'], hint: 'кінець наради' },
  { uk: 'Можна я відповім на це завтра?', answers: ['Can I get back to you on that tomorrow'], hint: 'не знаєш зараз' },
  { uk: 'Триматиму вас у курсі.', answers: ["I'll keep you in the loop", 'I will keep you in the loop', "I'll keep you posted"], hint: 'апдейти' },
  { uk: 'Наперед дякую за допомогу.', answers: ['Thanks in advance for your help', 'Thank you in advance for your help'], hint: 'подяка наперед' },
  { uk: 'Який тут дедлайн?', answers: ['What is the deadline on this', "What's the deadline on this"], hint: 'про терміни' }
];

const INTRO = '<div class="intro-box blue"><h3>💼 Дві мови однієї роботи</h3>' +
  '<p>Робоча англійська — це не «складніші слова», а <b>сталі формули</b>. Носій не вигадує, як почати лист: він бере готове <i>I hope this email finds you well</i>. Тому цей блок — не граматика, а набір готових цеглинок для листа, наради й дзвінка.</p></div>' +
  '<div class="intro-box green"><h3>✉️ Анатомія ділового листа</h3>' +
  '<p><b>1.</b> Вітання + рядок ввічливості · <b>2.</b> Мета (<i>I am writing to…</i>) · <b>3.</b> Деталі й вкладення (<i>Please find attached…</i>) · <b>4.</b> Чого ти хочеш від адресата · <b>5.</b> Фінал (<i>Let me know if you have any questions</i>) + <b>Best regards</b>. Пʼять блоків — і лист виглядає професійно.</p></div>' +
  '<div class="intro-box orange"><h3>⚠️ Тон вирішує все</h3>' +
  '<p><i>As per my previous email</i> формально ввічливе, але читається як докір. <i>Send me the file</i> — наказ; <i>Could you send me the file when you get a chance?</i> — прохання. У робочому листуванні мʼякість не слабкість, а норма.</p></div>' +
  '<div class="intro-box pink"><h3>🎧 Онлайн-дзвінок має власний словник</h3>' +
  '<p><i>You are on mute · you are breaking up · let me share my screen · sorry, go ahead · let us take this offline</i> — десяток фраз, які звучать на кожному дзвінку. Вивчи їх — і половина стресу від англомовної наради зникне.</p></div>';

const META = {
  title: '💼 Work English — листи, наради, дзвінки',
  lead: '80 робочих формул: від «I hope this email finds you well» до «you are on mute». Ділове листування, нагадування, наради, відеодзвінки, задачі й офісний small talk.'
};

return { CATS: CATS, MARKERS: MARKERS, FILL_QS: FILL_QS, SITUATIONS: SITUATIONS, TR_QS: TR_QS, INTRO: INTRO, META: META };
})();
