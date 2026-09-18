/* EngLift — дані тренажера «idioms»: ідіоми та приказки за темами. */
window.PHRASE_DATA = window.PHRASE_DATA || {};
window.PHRASE_DATA["idioms"] = (function () {

const CATS = {
  emotion: { emoji: '😤', label: 'Емоції та настрій', desc: 'over the moon, down in the dumps, fed up' },
  people: { emoji: '👥', label: 'Люди й стосунки', desc: 'see eye to eye, hit it off, get on someone\'s nerves' },
  talk: { emoji: '💬', label: 'Розмова й правда', desc: 'beat around the bush, spill the beans, let the cat out of the bag' },
  work: { emoji: '💼', label: 'Робота й гроші', desc: 'call it a day, cost an arm and a leg, tighten your belt' },
  time: { emoji: '⏳', label: 'Час і поспіх', desc: 'once in a blue moon, in the nick of time, around the clock' },
  problem: { emoji: '🧩', label: 'Проблеми й ризик', desc: 'bite the bullet, in hot water, a blessing in disguise' },
  success: { emoji: '🏆', label: 'Успіх і провал', desc: 'nail it, go down the drain, back to square one' },
  daily: { emoji: '🏠', label: 'Побут і самопочуття', desc: 'hit the sack, under the weather, grab a bite' },
  proverb: { emoji: '📜', label: 'Приказки', desc: 'better late than never, practice makes perfect' }
};

const MARKERS = [
  /* ============ ЕМОЦІЇ ============ */
  { name: 'be fed up with', uk: 'бути ситим по горло чимось', emoji: '😤', cat: 'emotion', lvl: 'B1', reg: 'neutral', when: 'Коли щось набридло остаточно. Найуживаніша ідіома роздратування — частіша за «I am angry».', examples: [{ en: 'I am <b>fed up with</b> these meetings.', uk: 'Мене дістали ці наради.' }, { en: 'She got <b>fed up</b> and quit.', uk: 'Їй набридло, і вона звільнилася.' }] },
  { name: 'drive someone crazy', uk: 'зводити з розуму, дратувати', emoji: '🤯', cat: 'emotion', lvl: 'A2', reg: 'casual', when: 'Про те, що дратує до краю. Ще кажуть drive someone nuts / up the wall.', examples: [{ en: 'That noise <b>drives me crazy</b>.', uk: 'Цей шум зводить мене з розуму.' }] },
  { name: 'on cloud nine', uk: 'на сьомому небі', emoji: '☁️', cat: 'emotion', lvl: 'B1', reg: 'neutral', when: 'Найвища точка радості — після новини, перемоги, весілля.', examples: [{ en: 'She has been <b>on cloud nine</b> since the news.', uk: 'Вона на сьомому небі від тієї новини.' }] },
  { name: 'down in the dumps', uk: 'у зневірі, пригнічений', emoji: '🌧️', cat: 'emotion', lvl: 'B2', reg: 'casual', when: 'Коли сумно без конкретної причини — легша форма за «depressed».', examples: [{ en: 'He is a bit <b>down in the dumps</b> today.', uk: 'Він сьогодні трохи не в гуморі.' }] },
  { name: 'have a blast', uk: 'відірватися, круто провести час', emoji: '🎉', cat: 'emotion', lvl: 'B1', reg: 'casual', when: 'Про вечірку, поїздку, вечір — коли було справді весело.', examples: [{ en: 'We <b>had a blast</b> last night.', uk: 'Ми вчора класно відірвалися.' }] },
  { name: 'get cold feet', uk: 'злякатися в останній момент', emoji: '🥶', cat: 'emotion', lvl: 'B2', reg: 'neutral', when: 'Про сумнів перед важливим кроком: весілля, переїзд, публічний виступ.', examples: [{ en: 'He <b>got cold feet</b> before the wedding.', uk: 'Він злякався перед весіллям.' }] },
  { name: 'freak out', uk: 'панікувати, зриватися', emoji: '😱', cat: 'emotion', lvl: 'B1', reg: 'casual', when: 'Сильна емоційна реакція — від страху або шоку.', examples: [{ en: 'Do not <b>freak out</b>, it is fixable.', uk: 'Не панікуй, це можна виправити.' }] },
  { name: 'blow off steam', uk: 'випустити пару', emoji: '💨', cat: 'emotion', lvl: 'B2', reg: 'casual', when: 'Про спосіб скинути напругу: спорт, прогулянка, розмова.', examples: [{ en: 'I run to <b>blow off steam</b>.', uk: 'Я бігаю, щоб випустити пару.' }] },
  { name: 'lose your temper', uk: 'зірватися, втратити самовладання', emoji: '🌋', cat: 'emotion', lvl: 'B2', reg: 'neutral', when: 'Коли емоції беруть гору й людина кричить.', examples: [{ en: 'Sorry, I <b>lost my temper</b>.', uk: 'Вибач, я зірвався.' }] },
  { name: 'be over the moon', uk: 'бути в захваті', emoji: '🌙', cat: 'emotion', lvl: 'B1', reg: 'neutral', when: 'Синонім до on cloud nine, частіший у британців.', examples: [{ en: 'They were <b>over the moon</b> about the job.', uk: 'Вони були в захваті від тієї роботи.' }] },
  { name: 'a pain in the neck', uk: 'заноза, щось дуже дратівливе', emoji: '😩', cat: 'emotion', lvl: 'B1', reg: 'casual', when: 'Про людину або справу, що виснажує. Є грубіший варіант із іншим словом — його краще не вживати.', examples: [{ en: 'This paperwork is <b>a pain in the neck</b>.', uk: 'Ця паперова тяганина — суцільна морока.' }] },
  { name: 'keep your chin up', uk: 'не вішай носа', emoji: '😊', cat: 'emotion', lvl: 'B1', reg: 'casual', when: 'Підбадьорити того, кому важко.', examples: [{ en: '<b>Keep your chin up</b> — it will get better.', uk: 'Не вішай носа — усе налагодиться.' }] },
  { name: 'have mixed feelings', uk: 'мати змішані почуття', emoji: '🥲', cat: 'emotion', lvl: 'B1', reg: 'neutral', when: 'Коли одночасно і радісно, і сумно.', examples: [{ en: 'I <b>have mixed feelings</b> about moving.', uk: 'У мене змішані почуття щодо переїзду.' }] },
  { name: 'get on someone\'s nerves', uk: 'діяти на нерви', emoji: '😠', cat: 'emotion', lvl: 'B1', reg: 'casual', when: 'Про постійне, повторюване роздратування.', examples: [{ en: 'His humming <b>gets on my nerves</b>.', uk: 'Його мугикання діє мені на нерви.' }] },
  { name: 'take it personally', uk: 'сприймати на свій рахунок', emoji: '🫥', cat: 'emotion', lvl: 'B1', reg: 'neutral', when: 'Часто в заперечній формі: don\'t take it personally.', examples: [{ en: 'Do not <b>take it personally</b>, he is like that with everyone.', uk: 'Не сприймай на свій рахунок, він з усіма такий.' }] },

  /* ============ ЛЮДИ Й СТОСУНКИ ============ */
  { name: 'hit it off', uk: 'одразу порозумітися', emoji: '🤝', cat: 'people', lvl: 'B2', reg: 'casual', when: 'Про знайомство, коли люди сподобалися одне одному з перших хвилин.', examples: [{ en: 'We <b>hit it off</b> right away.', uk: 'Ми одразу знайшли спільну мову.' }] },
  { name: 'see eye to eye', uk: 'сходитися в поглядах', emoji: '👁️', cat: 'people', lvl: 'B2', reg: 'neutral', when: 'Найчастіше в заперечній формі: we don\'t see eye to eye.', examples: [{ en: 'We do not <b>see eye to eye</b> on this.', uk: 'Ми тут дивимось на речі по-різному.' }] },
  { name: 'be on the same page', uk: 'розуміти одне одного однаково', emoji: '📄', cat: 'people', lvl: 'B1', reg: 'neutral', when: 'Робоча класика: переконатися, що всі однаково зрозуміли задачу.', examples: [{ en: 'Let us make sure we are <b>on the same page</b>.', uk: 'Переконаймося, що ми розуміємо це однаково.' }] },
  { name: 'get along with', uk: 'ладнати з кимось', emoji: '🙂', cat: 'people', lvl: 'A2', reg: 'neutral', when: 'Про стабільно добрі стосунки.', examples: [{ en: 'I <b>get along with</b> my neighbours.', uk: 'Я лажу із сусідами.' }] },
  { name: 'have a crush on', uk: 'бути закоханим, «запасти»', emoji: '💘', cat: 'people', lvl: 'B1', reg: 'casual', when: 'Про несерйозну, часто односторонню закоханість.', examples: [{ en: 'She <b>has a crush on</b> him.', uk: 'Вона в нього закохана.' }] },
  { name: 'be seeing someone', uk: 'зустрічатися з кимось', emoji: '💑', cat: 'people', lvl: 'B1', reg: 'casual', when: 'Раннє «ми разом», ще до офіційного «boyfriend / girlfriend».', examples: [{ en: 'They have been <b>seeing each other</b> for a month.', uk: 'Вони зустрічаються вже місяць.' }] },
  { name: 'be into someone', uk: 'запасти на когось', emoji: '😍', cat: 'people', lvl: 'B1', reg: 'casual', when: 'Так само про інтерес до справи: I am into photography.', examples: [{ en: 'I think he is <b>into you</b>.', uk: 'Здається, ти йому подобаєшся.' }] },
  { name: 'take things slow', uk: 'не поспішати у стосунках', emoji: '🐢', cat: 'people', lvl: 'B1', reg: 'casual', when: 'Коли хочеться взаємності, але без поспіху.', examples: [{ en: 'Let us <b>take things slow</b>.', uk: 'Давай не поспішати.' }] },
  { name: 'drift apart', uk: 'віддалитися одне від одного', emoji: '🥀', cat: 'people', lvl: 'B2', reg: 'neutral', when: 'Про друзів чи пару, що поступово втратили звʼязок — без сварки.', examples: [{ en: 'We just <b>drifted apart</b>.', uk: 'Ми просто віддалилися.' }] },
  { name: 'pull someone\'s leg', uk: 'жартувати, розігрувати', emoji: '🦵', cat: 'people', lvl: 'B2', reg: 'casual', when: 'Про безневинний жарт: «та я жартую».', examples: [{ en: 'Relax, I am <b>pulling your leg</b>.', uk: 'Розслабся, я жартую.' }] },
  { name: 'have someone\'s back', uk: 'прикривати, бути на боці когось', emoji: '🛡️', cat: 'people', lvl: 'B2', reg: 'casual', when: 'Обіцянка підтримки в складний момент.', examples: [{ en: 'Do not worry, I <b>have your back</b>.', uk: 'Не хвилюйся, я на твоєму боці.' }] },
  { name: 'break the ice', uk: 'розтопити кригу', emoji: '🧊', cat: 'people', lvl: 'B1', reg: 'neutral', when: 'Перша фраза чи жарт, щоб зняти ніяковість.', examples: [{ en: 'He told a joke to <b>break the ice</b>.', uk: 'Він пожартував, щоб розтопити кригу.' }] },
  { name: 'ghost someone', uk: 'зникнути без пояснень', emoji: '👻', cat: 'people', lvl: 'B2', reg: 'casual', when: 'Сучасне: перестати відповідати й зникнути з поля зору.', examples: [{ en: 'He <b>ghosted</b> me after two dates.', uk: 'Він зник після двох побачень.' }] },
  { name: 'catch up with someone', uk: 'надолужити спілкування', emoji: '☕', cat: 'people', lvl: 'A2', reg: 'casual', when: 'Зустрітися й поговорити про те, що сталося з останньої зустрічі.', examples: [{ en: 'Let us <b>catch up</b> this weekend.', uk: 'Зустріньмося на вихідних, поговоримо.' }] },
  { name: 'give someone the benefit of the doubt', uk: 'повірити на слово, не осуджувати одразу', emoji: '⚖️', cat: 'people', lvl: 'C1', reg: 'neutral', when: 'Коли підозри є, але ти обираєш довіру.', examples: [{ en: 'I will <b>give him the benefit of the doubt</b>.', uk: 'Я повірю йому на слово.' }] },

  /* ============ РОЗМОВА Й ПРАВДА ============ */
  { name: 'beat around the bush', uk: 'ходити околяса, не казати прямо', emoji: '🌳', cat: 'talk', lvl: 'B2', reg: 'neutral', when: 'Коли людина уникає прямої відповіді. Часто: stop beating around the bush.', examples: [{ en: 'Stop <b>beating around the bush</b> and tell me.', uk: 'Годі ходити околяса — кажи.' }] },
  { name: 'spill the beans', uk: 'проговоритися, видати секрет', emoji: '🫘', cat: 'talk', lvl: 'B2', reg: 'casual', when: 'Найчастіше жартівливо: «ну розказуй уже».', examples: [{ en: 'Come on, <b>spill the beans</b>!', uk: 'Ну давай, розказуй!' }] },
  { name: 'let the cat out of the bag', uk: 'розкрити таємницю (випадково)', emoji: '🐱', cat: 'talk', lvl: 'B2', reg: 'casual', when: 'Саме про випадкове розкриття сюрпризу.', examples: [{ en: 'He <b>let the cat out of the bag</b> about the party.', uk: 'Він проговорився про вечірку.' }] },
  { name: 'get to the point', uk: 'переходити до суті', emoji: '🎯', cat: 'talk', lvl: 'B1', reg: 'neutral', when: 'Прохання говорити коротше, без вступів.', examples: [{ en: 'Let me <b>get to the point</b>.', uk: 'Перейду одразу до суті.' }] },
  { name: 'read between the lines', uk: 'читати між рядків', emoji: '📖', cat: 'talk', lvl: 'B2', reg: 'neutral', when: 'Зрозуміти те, що не сказано прямо.', examples: [{ en: 'You have to <b>read between the lines</b>.', uk: 'Тут треба читати між рядків.' }] },
  { name: 'hear someone out', uk: 'вислухати до кінця', emoji: '👂', cat: 'talk', lvl: 'B2', reg: 'neutral', when: 'Прохання не перебивати: hear me out.', examples: [{ en: 'Just <b>hear me out</b> before you say no.', uk: 'Просто вислухай, перш ніж відмовляти.' }] },
  { name: 'put it another way', uk: 'сказати інакше, переформулювати', emoji: '🔄', cat: 'talk', lvl: 'B1', reg: 'neutral', when: 'Коли перше пояснення не зайшло.', examples: [{ en: 'Let me <b>put it another way</b>.', uk: 'Скажу інакше.' }] },
  { name: 'talk someone into something', uk: 'умовити когось', emoji: '🗣️', cat: 'talk', lvl: 'B2', reg: 'neutral', when: 'Протилежне — talk someone out of something.', examples: [{ en: 'She <b>talked me into</b> going.', uk: 'Вона вмовила мене піти.' }] },
  { name: 'have the last word', uk: 'лишити останнє слово за собою', emoji: '🔚', cat: 'talk', lvl: 'B2', reg: 'neutral', when: 'Про людину, яка завжди мусить закрити суперечку.', examples: [{ en: 'He always <b>has the last word</b>.', uk: 'Останнє слово завжди за ним.' }] },
  { name: 'a slip of the tongue', uk: 'обмовка', emoji: '👅', cat: 'talk', lvl: 'B2', reg: 'neutral', when: 'Виправдання після того, як сказав не те.', examples: [{ en: 'It was just <b>a slip of the tongue</b>.', uk: 'Це була просто обмовка.' }] },
  { name: 'keep someone posted', uk: 'тримати в курсі', emoji: '📬', cat: 'talk', lvl: 'B1', reg: 'neutral', when: 'Робоче прощання: «повідомлю, як будуть новини».', examples: [{ en: 'I will <b>keep you posted</b>.', uk: 'Я триматиму тебе в курсі.' }] },
  { name: 'give someone a heads-up', uk: 'попередити заздалегідь', emoji: '⚠️', cat: 'talk', lvl: 'B2', reg: 'casual', when: 'Коротке попередження, щоб людина була готова.', examples: [{ en: 'Just <b>a heads-up</b>: the meeting moved to 3.', uk: 'Попереджаю: нараду перенесли на третю.' }] },
  { name: 'be on the tip of my tongue', uk: 'крутиться на язиці', emoji: '🤔', cat: 'talk', lvl: 'B1', reg: 'casual', when: 'Коли слово ось-ось згадається.', examples: [{ en: 'His name is <b>on the tip of my tongue</b>.', uk: 'Його імʼя крутиться на язиці.' }] },
  { name: 'make a long story short', uk: 'коротше кажучи', emoji: '✂️', cat: 'talk', lvl: 'B1', reg: 'casual', when: 'Перехід до фіналу розповіді.', examples: [{ en: '<b>To make a long story short</b>, we missed the flight.', uk: 'Коротше кажучи, ми не встигли на літак.' }] },
  { name: 'take someone\'s word for it', uk: 'повірити на слово', emoji: '🤞', cat: 'talk', lvl: 'B2', reg: 'neutral', when: 'Коли перевірити неможливо, лишається довіритися.', examples: [{ en: 'I will <b>take your word for it</b>.', uk: 'Повірю тобі на слово.' }] },

  /* ============ РОБОТА Й ГРОШІ ============ */
  { name: 'call it a day', uk: 'на сьогодні досить', emoji: '🌇', cat: 'work', lvl: 'B1', reg: 'casual', when: 'Завершити роботу — на сьогодні або взагалі.', examples: [{ en: 'It is late, let us <b>call it a day</b>.', uk: 'Пізно, на сьогодні досить.' }] },
  { name: 'cost an arm and a leg', uk: 'коштувати шалених грошей', emoji: '💸', cat: 'work', lvl: 'B1', reg: 'casual', when: 'Про надто високу ціну.', examples: [{ en: 'That car <b>cost an arm and a leg</b>.', uk: 'Те авто коштувало шалених грошей.' }] },
  { name: 'make ends meet', uk: 'зводити кінці з кінцями', emoji: '🪙', cat: 'work', lvl: 'B2', reg: 'neutral', when: 'Про життя, коли грошей ледь вистачає.', examples: [{ en: 'It is hard to <b>make ends meet</b> these days.', uk: 'Зараз важко зводити кінці з кінцями.' }] },
  { name: 'tighten your belt', uk: 'затягнути паски', emoji: '🥋', cat: 'work', lvl: 'B2', reg: 'neutral', when: 'Свідомо скоротити витрати.', examples: [{ en: 'We had to <b>tighten our belts</b>.', uk: 'Нам довелося затягнути паски.' }] },
  { name: 'be snowed under', uk: 'бути заваленим роботою', emoji: '❄️', cat: 'work', lvl: 'B2', reg: 'neutral', when: 'Ввічливе пояснення, чому немає часу.', examples: [{ en: 'Sorry, I am <b>snowed under</b> this week.', uk: 'Вибач, цього тижня я завалений роботою.' }] },
  { name: 'go the extra mile', uk: 'зробити більше, ніж треба', emoji: '🏃', cat: 'work', lvl: 'B2', reg: 'neutral', when: 'Комплімент сумлінності — часто на співбесіді.', examples: [{ en: 'She always <b>goes the extra mile</b>.', uk: 'Вона завжди робить більше, ніж потрібно.' }] },
  { name: 'get the ball rolling', uk: 'зрушити справу з місця', emoji: '⚽', cat: 'work', lvl: 'B2', reg: 'neutral', when: 'Почати процес, дати старт.', examples: [{ en: 'Let us <b>get the ball rolling</b>.', uk: 'Зрушмо справу з місця.' }] },
  { name: 'be in the loop', uk: 'бути в курсі справ', emoji: '🔁', cat: 'work', lvl: 'B2', reg: 'neutral', when: 'Просити тримати в курсі: keep me in the loop.', examples: [{ en: 'Please keep me <b>in the loop</b>.', uk: 'Будь ласка, тримай мене в курсі.' }] },
  { name: 'think outside the box', uk: 'мислити нестандартно', emoji: '📦', cat: 'work', lvl: 'B2', reg: 'neutral', when: 'Заклик до нестандартного рішення. Обережно: вже звучить як кліше.', examples: [{ en: 'We need to <b>think outside the box</b>.', uk: 'Нам потрібне нестандартне рішення.' }] },
  { name: 'cut corners', uk: 'робити абияк, економити на якості', emoji: '✂️', cat: 'work', lvl: 'B2', reg: 'neutral', when: 'Про зрізання шляху заради швидкості чи грошей.', examples: [{ en: 'Do not <b>cut corners</b> on safety.', uk: 'Не економ на безпеці.' }] },
  { name: 'learn the ropes', uk: 'освоїтися, увійти в курс справи', emoji: '🪢', cat: 'work', lvl: 'B2', reg: 'neutral', when: 'Про перші тижні на новій роботі.', examples: [{ en: 'Give him time to <b>learn the ropes</b>.', uk: 'Дай йому час освоїтися.' }] },
  { name: 'be up to your ears in', uk: 'бути по вуха в чомусь', emoji: '🙉', cat: 'work', lvl: 'B2', reg: 'casual', when: 'Про роботу, борги, справи.', examples: [{ en: 'I am <b>up to my ears in</b> work.', uk: 'Я по вуха в роботі.' }] },
  { name: 'break even', uk: 'вийти в нуль', emoji: '⚖️', cat: 'work', lvl: 'B2', reg: 'formal', when: 'Бізнес: доходи покрили витрати, прибутку ще немає.', examples: [{ en: 'We finally <b>broke even</b>.', uk: 'Ми нарешті вийшли в нуль.' }] },
  { name: 'a rip-off', uk: 'грабіж, здирництво', emoji: '🏷️', cat: 'work', lvl: 'B1', reg: 'casual', when: 'Про надто високу ціну за дрібницю.', examples: [{ en: 'Ten dollars for a coffee? What <b>a rip-off</b>!', uk: 'Десять доларів за каву? Це грабіж!' }] },
  { name: 'be on the same wavelength', uk: 'бути на одній хвилі', emoji: '📡', cat: 'work', lvl: 'B2', reg: 'casual', when: 'Про людей, які розуміють одне одного з пів слова.', examples: [{ en: 'We are <b>on the same wavelength</b>.', uk: 'Ми на одній хвилі.' }] },

  /* ============ ЧАС І ПОСПІХ ============ */
  { name: 'once in a blue moon', uk: 'дуже рідко, раз на віку', emoji: '🌚', cat: 'time', lvl: 'B2', reg: 'casual', when: 'Про подію, що трапляється майже ніколи.', examples: [{ en: 'We meet <b>once in a blue moon</b>.', uk: 'Ми бачимося дуже рідко.' }] },
  { name: 'in the nick of time', uk: 'в останню мить', emoji: '⏰', cat: 'time', lvl: 'B2', reg: 'neutral', when: 'Встигнути буквально в останню секунду.', examples: [{ en: 'We got there <b>in the nick of time</b>.', uk: 'Ми дісталися в останню мить.' }] },
  { name: 'around the clock', uk: 'цілодобово', emoji: '🕛', cat: 'time', lvl: 'B2', reg: 'neutral', when: 'Про роботу без перерв — сервіс, лікарня, аврал.', examples: [{ en: 'They worked <b>around the clock</b>.', uk: 'Вони працювали цілодобово.' }] },
  { name: 'kill time', uk: 'вбивати час', emoji: '🎮', cat: 'time', lvl: 'B1', reg: 'casual', when: 'Чекати й чимось себе займати.', examples: [{ en: 'I played games to <b>kill time</b>.', uk: 'Я грав, щоб убити час.' }] },
  { name: 'put something off', uk: 'відкладати на потім', emoji: '🗓️', cat: 'time', lvl: 'B1', reg: 'neutral', when: 'Класика прокрастинації.', examples: [{ en: 'Stop <b>putting it off</b>.', uk: 'Годі це відкладати.' }] },
  { name: 'be pressed for time', uk: 'мати обмаль часу', emoji: '⌛', cat: 'time', lvl: 'B2', reg: 'neutral', when: 'Ввічливе пояснення, чому треба коротше.', examples: [{ en: 'I am a bit <b>pressed for time</b>.', uk: 'У мене обмаль часу.' }] },
  { name: 'at the eleventh hour', uk: 'в останній момент', emoji: '🕚', cat: 'time', lvl: 'C1', reg: 'formal', when: 'Урочистіший варіант «in the nick of time».', examples: [{ en: 'The deal was saved <b>at the eleventh hour</b>.', uk: 'Угоду врятували в останній момент.' }] },
  { name: 'time flies', uk: 'час летить', emoji: '🕊️', cat: 'time', lvl: 'A2', reg: 'casual', when: 'Реакція на те, як швидко минув період.', examples: [{ en: 'Wow, <b>time flies</b>!', uk: 'Ого, як час летить!' }] },
  { name: 'in the long run', uk: 'у довгостроковій перспективі', emoji: '📈', cat: 'time', lvl: 'B2', reg: 'neutral', when: 'Аргумент «зараз важко, але потім окупиться».', examples: [{ en: 'It will save money <b>in the long run</b>.', uk: 'У перспективі це заощадить гроші.' }] },
  { name: 'sooner or later', uk: 'рано чи пізно', emoji: '⏭️', cat: 'time', lvl: 'A2', reg: 'neutral', when: 'Про неминуче.', examples: [{ en: '<b>Sooner or later</b> he will find out.', uk: 'Рано чи пізно він дізнається.' }] },
  { name: 'from time to time', uk: 'час від часу', emoji: '🔄', cat: 'time', lvl: 'A2', reg: 'neutral', when: 'Нерегулярно, але буває.', examples: [{ en: 'I still see her <b>from time to time</b>.', uk: 'Я досі час від часу її бачу.' }] },
  { name: 'call it a night', uk: 'закінчити вечір, піти спати', emoji: '🌙', cat: 'time', lvl: 'B1', reg: 'casual', when: 'Вечірній аналог call it a day.', examples: [{ en: 'I think I will <b>call it a night</b>.', uk: 'Здається, на сьогодні мені досить.' }] },

  /* ============ ПРОБЛЕМИ Й РИЗИК ============ */
  { name: 'bite the bullet', uk: 'зціпити зуби й зробити', emoji: '🦷', cat: 'problem', lvl: 'B2', reg: 'neutral', when: 'Коли неприємне рішення все одно доведеться ухвалити.', examples: [{ en: 'I had to <b>bite the bullet</b> and apologize.', uk: 'Довелося зціпити зуби й вибачитися.' }] },
  { name: 'be in hot water', uk: 'мати неприємності', emoji: '♨️', cat: 'problem', lvl: 'B2', reg: 'casual', when: 'Проблеми з керівництвом, законом, батьками.', examples: [{ en: 'He is <b>in hot water</b> with his boss.', uk: 'У нього неприємності з начальником.' }] },
  { name: 'a blessing in disguise', uk: 'не було б щастя, та нещастя допомогло', emoji: '🎁', cat: 'problem', lvl: 'B2', reg: 'neutral', when: 'Коли погана подія обернулася на добро.', examples: [{ en: 'Losing that job was <b>a blessing in disguise</b>.', uk: 'Та втрата роботи виявилася на краще.' }] },
  { name: 'the last straw', uk: 'остання крапля', emoji: '🥤', cat: 'problem', lvl: 'B2', reg: 'neutral', when: 'Дрібниця, після якої терпець урвався.', examples: [{ en: 'That was <b>the last straw</b>.', uk: 'Це була остання крапля.' }] },
  { name: 'play it by ear', uk: 'діяти за обставинами', emoji: '👂', cat: 'problem', lvl: 'B2', reg: 'casual', when: 'Коли плану немає й це нормально.', examples: [{ en: 'Let us <b>play it by ear</b>.', uk: 'Розберемося на місці.' }] },
  { name: 'get out of hand', uk: 'вийти з-під контролю', emoji: '🔥', cat: 'problem', lvl: 'B2', reg: 'neutral', when: 'Про ситуацію, суперечку, витрати.', examples: [{ en: 'The party <b>got out of hand</b>.', uk: 'Вечірка вийшла з-під контролю.' }] },
  { name: 'be in the same boat', uk: 'бути в однаковому становищі', emoji: '🚣', cat: 'problem', lvl: 'B1', reg: 'casual', when: 'Солідарність: нам обом однаково складно.', examples: [{ en: 'We are all <b>in the same boat</b>.', uk: 'Ми всі в однаковому становищі.' }] },
  { name: 'face the music', uk: 'відповідати за наслідки', emoji: '🎼', cat: 'problem', lvl: 'C1', reg: 'neutral', when: 'Прийняти покарання або неприємну правду.', examples: [{ en: 'It is time to <b>face the music</b>.', uk: 'Час відповідати за наслідки.' }] },
  { name: 'a grey area', uk: 'сіра зона, неоднозначне', emoji: '🌫️', cat: 'problem', lvl: 'C1', reg: 'neutral', when: 'Коли правило не дає чіткої відповіді.', examples: [{ en: 'That is a bit of <b>a grey area</b>.', uk: 'Це трохи сіра зона.' }] },
  { name: 'bend over backwards', uk: 'лізти зі шкіри, щоб допомогти', emoji: '🤸', cat: 'problem', lvl: 'C1', reg: 'neutral', when: 'Про надмірні зусилля заради когось.', examples: [{ en: 'They <b>bent over backwards</b> to help us.', uk: 'Вони зі шкіри лізли, щоб нам допомогти.' }] },
  { name: 'take a rain check', uk: 'перенести на інший раз', emoji: '☔', cat: 'problem', lvl: 'B2', reg: 'casual', when: 'Ввічлива відмова від запрошення з натяком «наступного разу».', examples: [{ en: 'Can I <b>take a rain check</b>?', uk: 'Можемо перенести на інший раз?' }] },
  { name: 'burn bridges', uk: 'спалити мости', emoji: '🌉', cat: 'problem', lvl: 'B2', reg: 'neutral', when: 'Порада не сваритися остаточно: don\'t burn bridges.', examples: [{ en: 'Do not <b>burn bridges</b> when you quit.', uk: 'Не спалюй мости, коли звільняєшся.' }] },

  /* ============ УСПІХ І ПРОВАЛ ============ */
  { name: 'nail it', uk: 'зробити бездоганно', emoji: '🔨', cat: 'success', lvl: 'B1', reg: 'casual', when: 'Похвала після виступу, іспиту, презентації.', examples: [{ en: 'You <b>nailed it</b>!', uk: 'Ти впорався бездоганно!' }] },
  { name: 'pay off', uk: 'окупитися, дати результат', emoji: '💰', cat: 'success', lvl: 'B1', reg: 'neutral', when: 'Про зусилля, які нарешті дали плід.', examples: [{ en: 'All that practice <b>paid off</b>.', uk: 'Уся ця практика окупилася.' }] },
  { name: 'go down the drain', uk: 'піти нанівець', emoji: '🚰', cat: 'success', lvl: 'B2', reg: 'casual', when: 'Про змарновані зусилля чи гроші.', examples: [{ en: 'Months of work <b>went down the drain</b>.', uk: 'Місяці роботи пішли нанівець.' }] },
  { name: 'back to square one', uk: 'знову з нуля', emoji: '🔙', cat: 'success', lvl: 'B2', reg: 'neutral', when: 'Коли доводиться починати спочатку.', examples: [{ en: 'The plan failed, so it is <b>back to square one</b>.', uk: 'План провалився — починаємо спочатку.' }] },
  { name: 'get the hang of it', uk: 'набити руку, призвичаїтися', emoji: '🎯', cat: 'success', lvl: 'B1', reg: 'casual', when: 'Про момент, коли нове стає зрозумілим.', examples: [{ en: 'You will <b>get the hang of it</b> soon.', uk: 'Ти скоро набʼєш руку.' }] },
  { name: 'a piece of cake', uk: 'простіше простого', emoji: '🍰', cat: 'success', lvl: 'A2', reg: 'casual', when: 'Про надзвичайно легке завдання.', examples: [{ en: 'The test was <b>a piece of cake</b>.', uk: 'Тест був простіше простого.' }] },
  { name: 'break a leg', uk: 'ні пуху ні пера', emoji: '🎭', cat: 'success', lvl: 'B1', reg: 'casual', when: 'Побажання удачі перед виступом. Буквально перекладати не можна.', examples: [{ en: '<b>Break a leg</b> tonight!', uk: 'Ні пуху сьогодні ввечері!' }] },
  { name: 'hit the jackpot', uk: 'зірвати куш', emoji: '🎰', cat: 'success', lvl: 'B2', reg: 'casual', when: 'Про велике везіння — не лише з грошима.', examples: [{ en: 'With that apartment we <b>hit the jackpot</b>.', uk: 'З тією квартирою ми зірвали куш.' }] },
  { name: 'it is a long shot', uk: 'шансів мало, але спробувати варто', emoji: '🎲', cat: 'success', lvl: 'B2', reg: 'casual', when: 'Про малоймовірний, але можливий варіант.', examples: [{ en: 'It is <b>a long shot</b>, but let us try.', uk: 'Шансів мало, але спробуймо.' }] },
  { name: 'the ball is in your court', uk: 'тепер твій хід', emoji: '🎾', cat: 'success', lvl: 'B2', reg: 'neutral', when: 'Рішення тепер за співрозмовником.', examples: [{ en: 'I have made my offer — <b>the ball is in your court</b>.', uk: 'Я зробив пропозицію — тепер твій хід.' }] },
  { name: 'raise the bar', uk: 'підняти планку', emoji: '📊', cat: 'success', lvl: 'B2', reg: 'neutral', when: 'Про новий, вищий стандарт.', examples: [{ en: 'Their launch <b>raised the bar</b>.', uk: 'Їхній запуск підняв планку.' }] },
  { name: 'be worth a shot', uk: 'варто спробувати', emoji: '🎯', cat: 'success', lvl: 'B1', reg: 'casual', when: 'Коли ризик невеликий, а виграш можливий.', examples: [{ en: 'It is <b>worth a shot</b>.', uk: 'Варто спробувати.' }] },

  /* ============ ПОБУТ І САМОПОЧУТТЯ ============ */
  { name: 'hit the sack', uk: 'завалитися спати', emoji: '🛏️', cat: 'daily', lvl: 'B1', reg: 'casual', when: 'Розмовне «я спати». Ще кажуть hit the hay.', examples: [{ en: 'I am exhausted, I am going to <b>hit the sack</b>.', uk: 'Я виснажений, іду спати.' }] },
  { name: 'be under the weather', uk: 'нездужати, почуватися кепсько', emoji: '🤒', cat: 'daily', lvl: 'B1', reg: 'neutral', when: 'Мʼяко сказати, що захворів — доречно на роботі.', examples: [{ en: 'I am feeling a bit <b>under the weather</b>.', uk: 'Я трохи нездужаю.' }] },
  { name: 'come down with something', uk: 'підхопити щось, захворювати', emoji: '🤧', cat: 'daily', lvl: 'B1', reg: 'neutral', when: 'Про початок хвороби, коли симптоми тільки зʼявляються.', examples: [{ en: 'I think I am <b>coming down with</b> a cold.', uk: 'Здається, я застудився.' }] },
  { name: 'grab a bite', uk: 'перекусити', emoji: '🥪', cat: 'daily', lvl: 'A2', reg: 'casual', when: 'Швидко поїсти, без урочистостей.', examples: [{ en: 'Let us <b>grab a bite</b> after work.', uk: 'Перекусимо після роботи?' }] },
  { name: 'be worn out', uk: 'бути виснаженим', emoji: '🪫', cat: 'daily', lvl: 'B1', reg: 'casual', when: 'Про повну втому — фізичну або емоційну.', examples: [{ en: 'I am completely <b>worn out</b>.', uk: 'Я геть виснажений.' }] },
  { name: 'sleep on it', uk: 'переспати з думкою', emoji: '💤', cat: 'daily', lvl: 'B1', reg: 'casual', when: 'Відкласти рішення до ранку.', examples: [{ en: 'Let me <b>sleep on it</b>.', uk: 'Дай мені переспати з цією думкою.' }] },
  { name: 'be off the hook', uk: 'зіскочити, уникнути обовʼязку', emoji: '🪝', cat: 'daily', lvl: 'B2', reg: 'casual', when: 'Коли обовʼязок раптом зник.', examples: [{ en: 'The meeting was cancelled, so we are <b>off the hook</b>.', uk: 'Нараду скасували — ми зіскочили.' }] },
  { name: 'get a second wind', uk: 'відкрилося друге дихання', emoji: '🌬️', cat: 'daily', lvl: 'B2', reg: 'casual', when: 'Про раптовий приплив сил після втоми.', examples: [{ en: 'I <b>got a second wind</b> after coffee.', uk: 'Після кави відкрилося друге дихання.' }] },
  { name: 'be out of it', uk: 'бути не в собі, туго міркувати', emoji: '😵‍💫', cat: 'daily', lvl: 'B2', reg: 'casual', when: 'Про стан після недосипу чи хвороби.', examples: [{ en: 'Sorry, I am a bit <b>out of it</b> today.', uk: 'Вибач, я сьогодні трохи не в собі.' }] },
  { name: 'take it easy', uk: 'не напружуйся, бережи себе', emoji: '🧘', cat: 'daily', lvl: 'A2', reg: 'casual', when: 'І порада відпочити, і прощання «бувай».', examples: [{ en: '<b>Take it easy</b> this weekend.', uk: 'Відпочинь на вихідних.' }] },
  { name: 'be on the mend', uk: 'одужувати', emoji: '🩹', cat: 'daily', lvl: 'B2', reg: 'neutral', when: 'Про поступове покращення після хвороби.', examples: [{ en: 'She is <b>on the mend</b> now.', uk: 'Вона вже одужує.' }] },
  { name: 'run errands', uk: 'робити дрібні справи (пошта, аптека, банк)', emoji: '🛵', cat: 'daily', lvl: 'B1', reg: 'casual', when: 'Про побутові справи поза домом.', examples: [{ en: 'I have to <b>run some errands</b> today.', uk: 'Мені сьогодні треба залагодити кілька справ.' }] },

  /* ============ ПРИКАЗКИ ============ */
  { name: 'Better late than never', uk: 'Краще пізно, ніж ніколи', emoji: '⏰', cat: 'proverb', lvl: 'A2', reg: 'neutral', when: 'Виправдання запізнення або пізнього початку.', examples: [{ en: 'You finally started running? <b>Better late than never</b>.', uk: 'Ти нарешті почав бігати? Краще пізно, ніж ніколи.' }] },
  { name: 'Practice makes perfect', uk: 'Повторення — мати навчання', emoji: '🔁', cat: 'proverb', lvl: 'A2', reg: 'neutral', when: 'Підбадьорити того, хто вчиться.', examples: [{ en: 'Keep going — <b>practice makes perfect</b>.', uk: 'Не зупиняйся — усе приходить із практикою.' }] },
  { name: 'Actions speak louder than words', uk: 'Не слова, а вчинки', emoji: '🦶', cat: 'proverb', lvl: 'B1', reg: 'neutral', when: 'Коли обіцянок багато, а результату нема.', examples: [{ en: 'He promised a lot, but <b>actions speak louder than words</b>.', uk: 'Він багато обіцяв, але вчинки промовистіші за слова.' }] },
  { name: 'Easier said than done', uk: 'Легше сказати, ніж зробити', emoji: '😅', cat: 'proverb', lvl: 'B1', reg: 'casual', when: 'Відповідь на надто просту пораду.', examples: [{ en: '«Just relax.» — <b>Easier said than done</b>.', uk: '«Просто розслабся». — Легше сказати, ніж зробити.' }] },
  { name: 'The early bird catches the worm', uk: 'Хто рано встає, тому Бог дає', emoji: '🐦', cat: 'proverb', lvl: 'B1', reg: 'neutral', when: 'Про перевагу тих, хто починає раніше.', examples: [{ en: 'Tickets sell out fast — <b>the early bird catches the worm</b>.', uk: 'Квитки швидко розбирають — хто раніше, той і встиг.' }] },
  { name: 'When in Rome, do as the Romans do', uk: 'У чужий монастир зі своїм статутом не ходять', emoji: '🏛️', cat: 'proverb', lvl: 'B2', reg: 'neutral', when: 'Про адаптацію до місцевих звичаїв. Часто скорочують до «When in Rome».', examples: [{ en: 'Everyone eats late here — <b>when in Rome</b>.', uk: 'Тут усі вечеряють пізно — у чужий монастир…' }] },
  { name: 'You cannot judge a book by its cover', uk: 'Не суди книжку за обкладинкою', emoji: '📕', cat: 'proverb', lvl: 'B1', reg: 'neutral', when: 'Про хибне перше враження.', examples: [{ en: 'He seems cold, but <b>you cannot judge a book by its cover</b>.', uk: 'Він здається холодним, але не суди за першим враженням.' }] },
  { name: 'It is not rocket science', uk: 'Це не вища математика', emoji: '🚀', cat: 'proverb', lvl: 'B1', reg: 'casual', when: 'Коли задача насправді проста.', examples: [{ en: 'Come on, <b>it is not rocket science</b>.', uk: 'Та ну, це не вища математика.' }] },
  { name: 'Better safe than sorry', uk: 'Береженого Бог береже', emoji: '🦺', cat: 'proverb', lvl: 'B1', reg: 'neutral', when: 'Виправдання обережності.', examples: [{ en: 'Take an umbrella — <b>better safe than sorry</b>.', uk: 'Візьми парасольку — береженого Бог береже.' }] },
  { name: 'There is no such thing as a free lunch', uk: 'Безкоштовний сир лише в мишоловці', emoji: '🧀', cat: 'proverb', lvl: 'B2', reg: 'neutral', when: 'Про приховану ціну «дармового».', examples: [{ en: 'Free upgrade? <b>There is no such thing as a free lunch</b>.', uk: 'Безкоштовний апгрейд? Безкоштовний сир лише в мишоловці.' }] },
  { name: 'Two heads are better than one', uk: 'Одна голова добре, а дві краще', emoji: '🧠', cat: 'proverb', lvl: 'B1', reg: 'neutral', when: 'Запрошення подумати разом.', examples: [{ en: 'Let us ask her — <b>two heads are better than one</b>.', uk: 'Спитаймо її — одна голова добре, а дві краще.' }] },
  { name: 'You cannot have it both ways', uk: 'Не можна всидіти на двох стільцях', emoji: '🪑', cat: 'proverb', lvl: 'B2', reg: 'neutral', when: 'Коли людина хоче двох взаємовиключних речей одночасно.', examples: [{ en: 'You want freedom and stability — <b>you cannot have it both ways</b>.', uk: 'Хочеш і свободи, і стабільності — не можна всидіти на двох стільцях.' }] },
  { name: 'Do not count your chickens before they hatch', uk: 'Не кажи «гоп», доки не перескочив', emoji: '🐣', cat: 'proverb', lvl: 'B2', reg: 'neutral', when: 'Попередження не радіти завчасно.', examples: [{ en: 'The deal is not signed — <b>do not count your chickens</b>.', uk: 'Угоду ще не підписано — не кажи «гоп».' }] }
];

/* ситуація → яку ідіому сказати */
const SITUATIONS = [
  { sit: '🌙 Друг пропонує ще одну серію, а ти ледь тримаєш очі розплющеними.', correctEn: 'hit the sack' },
  { sit: '🤒 Пишеш колезі, що сьогодні не в формі й попрацюєш з дому.', correctEn: 'be under the weather' },
  { sit: '🕛 На роботі завал, і ти вже не встигаєш ні на що.', correctEn: 'be snowed under' },
  { sit: '🎭 Друг за годину виходить на сцену.', correctEn: 'break a leg' },
  { sit: '💸 Подруга показує сумку, яка коштувала як твоя зарплата.', correctEn: 'cost an arm and a leg' },
  { sit: '🧊 Перша зустріч команди, усі мовчать — треба щось сказати.', correctEn: 'break the ice' },
  { sit: '🌳 Співрозмовник п’ять хвилин ходить навколо теми й не каже головного.', correctEn: 'beat around the bush' },
  { sit: '🎯 Колега бездоганно провів презентацію.', correctEn: 'nail it' },
  { sit: '🔙 План провалився, і все треба починати спочатку.', correctEn: 'back to square one' },
  { sit: '☔ Тебе кличуть у бар, але ти хочеш перенести на інший раз.', correctEn: 'take a rain check' },
  { sit: '🫘 Друг знає новину й мовчить, а ти хочеш почути.', correctEn: 'spill the beans' },
  { sit: '🥤 Він знову запізнився — і це вже понад усе.', correctEn: 'the last straw' },
  { sit: '💤 Тобі пропонують відповісти прямо зараз, а ти хочеш подумати до ранку.', correctEn: 'sleep on it' },
  { sit: '📬 Ти пообіцяв повідомити, щойно будуть новини.', correctEn: 'keep someone posted' },
  { sit: '🥶 Друг хотів стрибнути з парашутом, а на місці передумав.', correctEn: 'get cold feet' },
  { sit: '🎁 Тебе звільнили — і через місяць ти знайшов кращу роботу.', correctEn: 'a blessing in disguise' },
  { sit: '⚽ Проєкт затягнувся на старті, час нарешті починати.', correctEn: 'get the ball rolling' },
  { sit: '🐢 Ви щойно почали зустрічатися, і ти не хочеш поспішати.', correctEn: 'take things slow' },
  { sit: '🍰 Тест виявився елементарним.', correctEn: 'a piece of cake' },
  { sit: '🧠 Тобі важко вирішити самому, і ти кличеш друга подумати разом.', correctEn: 'Two heads are better than one' }
];

/* переклад: українською → англійська ідіома */
const TR_QS = [
  { uk: 'Мене дістали ці наради.', answers: ["I'm fed up with these meetings", 'I am fed up with these meetings'], hint: 'бути ситим по горло' },
  { uk: 'Коротше кажучи, ми запізнилися.', answers: ['To make a long story short, we were late', 'Long story short, we were late'], hint: 'перехід до фіналу' },
  { uk: 'Не вішай носа.', answers: ['Keep your chin up', "Don't lose heart"], hint: 'підбадьорити' },
  { uk: 'Це коштувало шалених грошей.', answers: ['It cost an arm and a leg', 'That cost an arm and a leg'], hint: 'про ціну' },
  { uk: 'Я триматиму тебе в курсі.', answers: ["I'll keep you posted", 'I will keep you posted'], hint: 'новини згодом' },
  { uk: 'Давай розберемося на місці.', answers: ["Let's play it by ear", 'Let us play it by ear'], hint: 'без плану' },
  { uk: 'Ти впорався бездоганно!', answers: ['You nailed it', 'You nailed it!'], hint: 'похвала' },
  { uk: 'Здається, я застудився.', answers: ["I think I'm coming down with a cold", 'I think I am coming down with a cold'], hint: 'початок хвороби' },
  { uk: 'Ми всі в однаковому становищі.', answers: ["We're all in the same boat", 'We are all in the same boat'], hint: 'солідарність' },
  { uk: 'Тепер твій хід.', answers: ['The ball is in your court'], hint: 'рішення за тобою' },
  { uk: 'Краще пізно, ніж ніколи.', answers: ['Better late than never'], hint: 'приказка' },
  { uk: 'Легше сказати, ніж зробити.', answers: ['Easier said than done'], hint: 'приказка' }
];

const INTRO = '<div class="intro-box pink"><h3>🎯 Чому без ідіом не обійтися</h3>' +
  '<p>Ідіома — це фраза, зміст якої <b>не дорівнює сумі слів</b>. «It cost an arm and a leg» не про руки й ноги, а про ціну. Саме тому дослівний переклад не працює: почувши «break a leg» перед виступом, наш мозок чує загрозу, а носій — побажання удачі.</p></div>' +
  '<div class="intro-box blue"><h3>🧠 Як їх учити</h3>' +
  '<p>Не списком, а <b>ситуаціями</b>. Одна ідіома = один момент, у якому ти її скажеш: «завалився спати» — hit the sack, «нездужаю» — under the weather. Тому в цьому тренажері є режим «Ситуації»: читаєш момент — добираєш фразу.</p></div>' +
  '<div class="intro-box orange"><h3>⚠️ Скільки їх вставляти в мову</h3>' +
  '<p>Одна-дві на розмову — і ти звучиш природно. П’ять поспіль — і це звучить як підручник 1990-х. Обережно з дуже «книжними»: <i>it\'s raining cats and dogs</i> сьогодні майже не кажуть, натомість живе <i>it\'s pouring</i>.</p></div>';

const META = {
  title: '🎨 Idioms & Sayings — образні вирази',
  lead: '121 вираз — ідіоми й приказки за темами: емоції, люди, робота, час, проблеми, успіх, побут. З поясненням, коли саме так кажуть, і вправою «що сказати в цій ситуації».'
};

return { CATS: CATS, MARKERS: MARKERS, SITUATIONS: SITUATIONS, TR_QS: TR_QS, INTRO: INTRO, META: META };
})();
