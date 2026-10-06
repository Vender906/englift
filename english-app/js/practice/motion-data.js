/* EngLift — «Практика» → «Рух і розташування»: де хто знаходиться, куди й як рухається,
   через що перелазить, як питати дорогу й вибирати маршрут.
   Вантажиться лише при вході в цей пакет. */
(function () {

/* Речення з пропуском: [англійською з ___, відповідь, [3 хибні варіанти], українською, пояснення?, [інші правильні]?] */
const items = rows => rows.map(r => ({ en: r[0], a: r[1], w: r[2], uk: r[3], n: r[4] || '', alt: r[5] || [] }));

/* ============================================================
   1. ДЕ ХТО ЗНАХОДИТЬСЯ
   ============================================================ */
const WHERE = {
  id: 'where', emoji: '📍', title: 'Де хто знаходиться', uk: 'in, on, at, under, behind, between…',
  level: 'A2',
  lead: 'Базові прийменники місця: у чомусь, на чомусь, під, над, за, перед, між, серед, навпроти.',
  intro: '<div class="intro-box blue"><h3>🎯 Три головні: in · on · at</h3>' +
    '<p><b>in</b> — усередині обʼєму: <i>in the box, in the kitchen, in the car</i>.<br>' +
    '<b>on</b> — на поверхні, навіть вертикальній чи згори: <i>on the table, on the wall, on the ceiling</i>.<br>' +
    '<b>at</b> — у точці, біля місця як пункту: <i>at the door, at the bus stop, at work</i>.</p></div>' +
    '<div class="intro-box green"><h3>🧱 Навколо предмета</h3>' +
    '<p><b>under</b> під · <b>above</b> над (не торкаючись) · <b>behind</b> позаду · <b>in front of</b> перед · ' +
    '<b>next to / beside / by</b> поруч · <b>near</b> неподалік · <b>opposite</b> навпроти · <b>against</b> спершись на · <b>around</b> навколо.</p></div>' +
    '<div class="intro-box orange"><h3>⚠️ Пастки українською</h3>' +
    '<ul><li>«на стіні» — <b>on</b> the wall, а «в куті» — <b>in</b> the corner</li>' +
    '<li>«біля» буває і <b>next to</b> (впритул), і <b>near</b> (неподалік), і <b>at</b> (біля дверей)</li>' +
    '<li><b>near of</b> і <b>in front</b> без <b>of</b> — помилки; правильно <b>near</b> the park, <b>in front of</b> the park</li>' +
    '<li><b>before</b> — про час, а не про місце: не <s>before the cinema</s>, а <b>in front of</b> the cinema</li></ul></div>',
  rules: [
    { t: 'in — усередині', d: 'Кімнати, коробки, транспорт-«легковики», міста й країни.', ex: [['The keys are in the drawer.', 'Ключі в шухляді.'], ['I\'ll wait in the car.', 'Чекатиму в машині.']] },
    { t: 'on — на поверхні', d: 'Стіл, підлога, стіна, стеля, поверх будинку.', ex: [['There\'s a spider on the ceiling.', 'На стелі павук.'], ['He lives on the second floor.', 'Він живе на третьому (US: другому) поверсі.']] },
    { t: 'at — точка на мапі', d: 'Коли місце — пункт, а не простір: зупинка, двері, адреса, подія.', ex: [['Someone is at the door.', 'Хтось біля дверей.'], ['I\'m at the bus stop.', 'Я на зупинці.']] },
    { t: 'between vs among', d: 'between — між двома (або названими по одному); among — серед групи, натовпу.', ex: [['The shop is between the bank and the café.', 'Магазин між банком і кафе.'], ['I found it among the old papers.', 'Знайшов серед старих паперів.']] },
    { t: 'next to vs near', d: 'next to — впритул поруч; near — неподалік, у кількох хвилинах.', ex: [['Sit next to me.', 'Сідай поруч зі мною.'], ['We live near the sea.', 'Ми живемо біля моря.']] },
    { t: 'above vs over (у спокої)', d: 'Обидва — «над». above — просто вище; over — прямо над, часто накриваючи.', ex: [['Our flat is above a bakery.', 'Наша квартира над пекарнею.'], ['There\'s a lamp over the table.', 'Над столом висить лампа.']] }
  ],
  items: items([
    ["The keys are ___ the drawer.", 'in', ['on', 'at', 'into'], 'Ключі в шухляді.', 'Усередині — in.'],
    ["Your phone is ___ the table.", 'on', ['in', 'at', 'over'], 'Твій телефон на столі.', 'На поверхні — on.'],
    ["Someone is ___ the door.", 'at', ['in', 'on', 'to'], 'Хтось біля дверей (стукає).', 'at the door — біля дверей як точки.'],
    ["The cat is sleeping ___ the bed.", 'under', ['above', 'over', 'on'], 'Кіт спить під ліжком.', '', ['underneath', 'beneath']],
    ["There's a lamp ___ the table.", 'above', ['on', 'up', 'onto'], 'Над столом висить лампа.', 'above / over — над, не торкаючись.', ['over']],
    ["The bank is ___ the pharmacy.", 'next to', ['near of', 'close', 'along'], 'Банк поруч з аптекою.', 'next to — завжди з to; near — без of.', ['beside', 'by']],
    ["I'm right ___ you — look back!", 'behind', ['after', 'back', 'before'], 'Я прямо за тобою — обернися!', 'after — «після» в часі чи черзі, а позаду в просторі — behind.'],
    ["Let's meet ___ the cinema.", 'in front of', ['before', 'in front', 'opposite of'], 'Зустріньмося перед кінотеатром.', 'before — про час. Перед будівлею — in front of.'],
    ["The café is ___ the bank, across the street.", 'opposite', ['in front', 'against', 'along'], 'Кафе навпроти банку, через дорогу.', 'opposite — навпроти, по інший бік вулиці. В американській також across from.', ['across from']],
    ["The shop is ___ the post office and the bank.", 'between', ['among', 'through', 'beside'], 'Магазин між поштою і банком.', 'Два предмети — between.'],
    ["I found my ring ___ the old papers.", 'among', ['between', 'through', 'inside of'], 'Я знайшов свою каблучку серед старих паперів.', 'Серед багатьох — among.'],
    ["We live ___ the sea — about five minutes' walk.", 'near', ['near of', 'nearby', 'next'], 'Ми живемо біля моря — хвилин пʼять пішки.', 'near без of. nearby — прислівник: a shop nearby.', ['close to', 'by']],
    ["The picture is ___ the wall.", 'on', ['in', 'at', 'onto'], 'Картина на стіні.', 'Стіна — поверхня, тож on.'],
    ["He's waiting ___ the bus stop.", 'at', ['on', 'in', 'to'], 'Він чекає на зупинці.', 'Зупинка — точка, тож at.'],
    ["There's a crack ___ the ceiling.", 'in', ['at', 'under', 'onto'], 'На стелі тріщина.', 'Тріщина — «в» поверхні: a crack in the wall / ceiling.'],
    ["The car is parked ___.", 'outside', ['out', 'out of', 'outer'], 'Машина припаркована надворі (біля будинку).', 'outside — надворі, під будинком.'],
    ["Stay ___ — it's raining.", 'inside', ['into', 'inner', 'internal'], 'Сиди вдома (всередині) — дощ іде.', '', ['in', 'indoors']],
    ["My room is ___ the top of the house.", 'at', ['on', 'in', 'over'], 'Моя кімната на самому верху будинку.', 'at the top of / at the bottom of / at the end of.'],
    ["The answer is ___ the bottom of the page.", 'at', ['in', 'on', 'under'], 'Відповідь унизу сторінки.'],
    ["There's a big tree ___ the middle of the square.", 'in', ['at', 'on', 'among'], 'Посеред площі росте велике дерево.', 'in the middle of — посередині.'],
    ["The ladder is leaning ___ the wall.", 'against', ['on', 'to', 'at'], 'Драбина стоїть, спершись на стіну.', 'against — впираючись, притулившись.'],
    ["The kids sat ___ the fire.", 'around', ['about', 'along', 'among'], 'Діти сиділи навколо вогнища.', '', ['round']],
    ["The bathroom is at the end of the corridor, ___ the left.", 'on', ['at', 'in', 'by'], 'Ванна в кінці коридору, ліворуч.', 'on the left / on the right — ліворуч / праворуч.'],
    ["The TV is ___ the corner of the room.", 'in', ['on', 'at', 'by'], 'Телевізор у кутку кімнати.', 'Кут кімнати (всередині) — in the corner.'],
    ["The shop is ___ the corner of Main Street.", 'on', ['in', 'into', 'by'], 'Магазин на розі Мейн-стріт.', 'Ріг вулиці (ззовні) — on / at the corner.', ['at']],
    ["Our flat is ___ a bakery — it always smells of bread.", 'above', ['on', 'up', 'onto'], 'Наша квартира над пекарнею — завжди пахне хлібом.', '', ['over']],
    ["The parking is ___ the building, underground.", 'under', ['down', 'bottom', 'low'], 'Парковка під будівлею, під землею.', '', ['beneath', 'underneath', 'below']],
    ["I'll wait for you ___ the car.", 'in', ['at', 'on', 'into'], 'Я чекатиму тебе в машині.', 'Легковик, таксі — in. Автобус, потяг — on.'],
    ["He lives ___ the second floor.", 'on', ['in', 'at', 'by'], 'Він живе на другому поверсі.', 'Поверх — on the … floor.'],
    ["She's sitting ___ the window.", 'by', ['near of', 'along', 'in front'], 'Вона сидить біля вікна.', 'by — біля, поруч.', ['at', 'next to', 'near', 'beside']]
  ])
};

/* ============================================================
   2. УТОЧНЮЄМО МІСЦЕ
   ============================================================ */
const PRECISE = {
  id: 'precise', emoji: '🎯', title: 'Уточнюємо місце', uk: 'on the left, at the back, upstairs, two blocks away…',
  level: 'B1',
  lead: 'Коли «десь там» не підходить: з якого боку, на якому поверсі, спереду чи ззаду, скільки ще йти.',
  intro: '<div class="intro-box blue"><h3>↔️ Бік</h3>' +
    '<p><b>on the left / on the right</b> — ліворуч / праворуч. <b>to the left of X</b> — ліворуч <i>від</i> X. ' +
    '<b>on this side / on the other side of the street</b> — на цьому / тому боці вулиці. <b>the second from the left</b> — другий зліва.</p></div>' +
    '<div class="intro-box green"><h3>↕️ Спереду, ззаду, поверхи</h3>' +
    '<p><b>at the front / at the back</b> (залу, літака) · <b>in the back of the car</b> — на задньому сидінні · ' +
    '<b>upstairs / downstairs</b> — нагорі / внизу (без <s>to</s> і без <s>on</s>) · <b>on the ground floor</b> — на першому поверсі (UK).</p></div>' +
    '<div class="intro-box orange"><h3>📏 Відстань</h3>' +
    '<p><b>just around the corner</b> — одразу за рогом · <b>two blocks away</b> — за два квартали · <b>a few doors down</b> — через кілька будинків · ' +
    '<b>just past the bank</b> — одразу за банком · <b>halfway up the hill</b> — на півдорозі вгору · <b>10 km north of the city</b> — за 10 км на північ від міста.</p></div>' +
    '<div class="intro-box pink"><h3>💡 Підсилювачі точності</h3>' +
    '<p><b>right</b> / <b>just</b> перед прийменником — «прямо, якраз»: <i>right behind you, just outside, right next to the lift</i>.</p></div>',
  rules: [
    { t: 'on the left vs to the left of', d: 'on the left — просто ліворуч; to the left of X — ліворуч від чогось.', ex: [['It\'s the second house on the left.', 'Другий будинок ліворуч.'], ['The fridge is to the right of the sink.', 'Холодильник праворуч від раковини.']] },
    { t: 'in the back vs behind', d: 'in the back of the car — всередині, на задньому сидінні. behind the car — позаду машини, надворі.', ex: [['The kids are in the back of the car.', 'Діти на задньому сидінні.']] },
    { t: 'upstairs / downstairs', d: 'Це прислівники: go upstairs, I\'m downstairs — без to та on.', ex: [['Come upstairs!', 'Піднімайся нагору!'], ['The toilets are downstairs.', 'Туалети внизу.']] },
    { t: 'on the back vs behind', d: 'on the back of the photo — на звороті; behind the photo — за фото.', ex: [['The name is written on the back.', 'Імʼя написане на звороті.']] },
    { t: 'right / just', d: 'Роблять місце точнішим: right in front of you, just past the bank.', ex: [['He\'s right in front of you!', 'Він просто перед тобою!']] }
  ],
  items: items([
    ["It's the second house ___ the left.", 'on', ['at', 'from', 'to'], 'Це другий будинок ліворуч.'],
    ["She's the one ___ the red coat.", 'in', ['with', 'on', 'at'], 'Вона — та, що в червоному пальті.', 'Одяг — in: the man in the black hat.'],
    ["I'm the third ___ the left in this photo.", 'from', ['of', 'on', 'at'], 'На цьому фото я третій зліва.', 'the third from the left — третій зліва.'],
    ["Our seats are ___ the back of the plane.", 'at', ['on', 'behind', 'to'], 'Наші місця в хвості літака.', '', ['in']],
    ["The kids are sitting ___ the back of the car.", 'in', ['on', 'at', 'behind'], 'Діти сидять на задньому сидінні.', 'behind the car — це вже позаду машини, надворі.'],
    ["The pharmacy is ___ the other side of the street.", 'on', ['at', 'in', 'across'], 'Аптека на тому боці вулиці.'],
    ["Come ___, I'm in the attic!", 'upstairs', ['up stairs', 'to upstairs', 'on upstairs'], 'Піднімайся нагору, я на горищі!', 'upstairs — одне слово і без to.'],
    ["The toilets are ___, next to the cloakroom.", 'downstairs', ['down stairs', 'on downstairs', 'underground'], 'Туалети внизу, біля гардеробу.'],
    ["It's just ___ the corner — you can walk there.", 'around', ['on', 'at', 'behind'], 'Це одразу за рогом — можна дійти пішки.', 'just around the corner — дуже близько.', ['round']],
    ["The office is ___ the far end of the hall.", 'at', ['in', 'on', 'to'], 'Кабінет у дальньому кінці коридору.'],
    ["He lives a few doors ___ from us.", 'down', ['away', 'far', 'along'], 'Він живе за кілька будинків від нас.', 'a few doors down / up — через кілька будинків по вулиці.', ['up']],
    ["The school is two blocks ___.", 'away', ['far', 'off from', 'ahead of'], 'Школа за два квартали звідси.', 'Число + away: five minutes away, 3 km away.'],
    ["The café is just ___ the bank — you'll see it right after.", 'past', ['through', 'across', 'over'], 'Кафе одразу за банком — побачиш одразу після нього.', 'just past X — трохи далі за X.', ['after', 'beyond']],
    ["Put it ___ the top shelf.", 'on', ['at', 'in', 'over'], 'Постав на верхню полицю.'],
    ["The bus stop is halfway ___ the hill.", 'up', ['on', 'to', 'at'], 'Зупинка на півдорозі вгору пагорбом.'],
    ["We're somewhere ___ the middle of the queue.", 'in', ['at', 'on', 'between'], 'Ми десь посередині черги.'],
    ["I'm ___ the entrance — where are you?", 'at', ['in', 'on', 'into'], 'Я біля входу — а ти де?', '', ['by', 'outside']],
    ["The fridge is ___ the right of the sink.", 'to', ['on', 'at', 'from'], 'Холодильник праворуч від раковини.', 'to the right of X — праворуч від X.'],
    ["The name is written ___ the back of the photo.", 'on', ['at', 'in', 'behind'], 'Імʼя написане на звороті фото.'],
    ["It's ___ the top drawer.", 'in', ['on', 'at', 'into'], 'Це у верхній шухляді.'],
    ["The village is 10 km ___ of the city.", 'north', ['upper', 'above', 'up'], 'Село за 10 км на північ від міста.', 'north / south / east / west of X.'],
    ["He's standing right ___ front of you!", 'in', ['at', 'on', 'the'], 'Він стоїть просто перед тобою!'],
    ["Let's sit ___ the front so we can see better.", 'at', ['on', 'before', 'forward'], 'Сядьмо спереду, щоб краще бачити.', '', ['in']],
    ["My flat is on the fifth floor, ___ the lift.", 'opposite', ['against', 'in front', 'facing to'], 'Моя квартира на пʼятому поверсі, навпроти ліфта.', '', ['across from']],
    ["There's a parking lot ___ the back of the building.", 'at', ['on', 'in', 'behind'], 'Позаду будівлі є парковка.', '', ['round', 'around']],
    ["They live ___ the outskirts of town.", 'on', ['in', 'at', 'by'], 'Вони живуть на околиці міста.'],
    ["Which floor are you ___?", 'on', ['at', 'in', 'of'], 'На якому ти поверсі?', 'Прийменник у кінці питання — нормально для розмовної англійської.'],
    ["The hotel is right ___ the beach.", 'on', ['at', 'in', 'onto'], 'Готель просто на пляжі.', 'on the beach, on the coast, on the river.', ['by', 'near', 'next to']],
    ["Kyiv is ___ the Dnipro.", 'on', ['at', 'in', 'over'], 'Київ стоїть на Дніпрі.', 'Місто на річці — on.']
  ])
};

/* ============================================================
   3. КУДИ І ЗВІДКИ
   ============================================================ */
const DIRECTION = {
  id: 'direction', emoji: '➡️', title: 'Куди і звідки', uk: 'to, into, onto, out of, off, towards…',
  level: 'A2',
  lead: 'Рух до цілі, всередину, на поверхню, назовні, геть. Плюс слова, що не терплять to: home, abroad, upstairs.',
  intro: '<div class="intro-box blue"><h3>🎯 Пари «туди — звідти»</h3>' +
    '<p><b>to</b> ↔ <b>from</b> — до / від пункту<br>' +
    '<b>into</b> ↔ <b>out of</b> — у / з обʼєму (кімната, машина, вода)<br>' +
    '<b>onto</b> ↔ <b>off</b> — на / з поверхні (стіл, автобус, сцена)<br>' +
    '<b>towards</b> ↔ <b>away from</b> — у бік / геть від (не обовʼязково дійти)</p></div>' +
    '<div class="intro-box orange"><h3>🚫 Без to</h3>' +
    '<p><b>go home</b>, <b>go abroad</b>, <b>go upstairs / downstairs</b>, <b>come here / go there</b>, <b>go downtown</b>. ' +
    'Не <s>go to home</s>, <s>come to here</s>.</p></div>' +
    '<div class="intro-box pink"><h3>🛬 arrive — ніколи не to</h3>' +
    '<p><b>arrive at</b> — будівля, пункт (the airport, the hotel)<br><b>arrive in</b> — місто, країна (London, Spain)<br>' +
    'Але <b>get to</b> — з to: <i>How do I get to the station?</i></p></div>' +
    '<div class="intro-box green"><h3>🚪 in / into</h3>' +
    '<p><b>Come in!</b> — без додатка. <b>Come into the room</b> — з місцем. З put, jump, fall часто підходять обидва: <i>put it in / into the box</i>.</p></div>',
  rules: [
    { t: 'into / out of', d: 'Входимо в обʼєм і виходимо з нього: кімната, вода, машина, кишеня.', ex: [['He jumped into the pool.', 'Він стрибнув у басейн.'], ['Get out of the car!', 'Вийди з машини!']] },
    { t: 'onto / off', d: 'На поверхню і з неї: стіл, сцена, автобус, потяг.', ex: [['The cat jumped onto the table.', 'Кіт стрибнув на стіл.'], ['I got off the bus.', 'Я вийшов з автобуса.']] },
    { t: 'to vs towards', d: 'to — до цілі (дійшов). towards — у бік цілі (може й не дійти).', ex: [['He walked towards me.', 'Він пішов у мій бік.']] },
    { t: 'arrive at / in', d: 'at — пункт, будівля; in — місто, країна. Ніколи arrive to.', ex: [['We arrived at the airport.', 'Ми прибули в аеропорт.'], ['They arrived in London.', 'Вони прибули до Лондона.']] },
    { t: 'home, abroad, upstairs', d: 'Це прислівники — вони вже містять «куди», тож to зайве.', ex: [['Let\'s go home.', 'Ходімо додому.'], ['She moved abroad.', 'Вона переїхала за кордон.']] }
  ],
  items: items([
    ["We're going ___ the beach tomorrow.", 'to', ['at', 'in', 'into'], 'Завтра ми йдемо на пляж.'],
    ["She walked ___ the room and sat down.", 'into', ['to', 'at', 'inside of'], 'Вона зайшла в кімнату й сіла.', 'Входимо в простір — into.'],
    ["He jumped ___ the pool.", 'into', ['to', 'onto', 'inside of'], 'Він стрибнув у басейн.', '', ['in']],
    ["The cat jumped ___ the table.", 'onto', ['into', 'to', 'at'], 'Кіт стрибнув на стіл.', '', ['on', 'up onto', 'up on']],
    ["Get ___ the car!", 'out of', ['out', 'off', 'from'], 'Вийди з машини!', 'Легковик — in / out of. Автобус — on / off.'],
    ["I got ___ the bus at the wrong stop.", 'off', ['out', 'out of', 'from'], 'Я вийшов з автобуса не на тій зупинці.'],
    ["Take your feet ___ the table!", 'off', ['out of', 'from', 'down'], 'Прибери ноги зі столу!', 'З поверхні — off.'],
    ["He walked ___ me with a smile.", 'towards', ['to the', 'at', 'forward'], 'Він пішов у мій бік з усмішкою.', 'towards (UK) = toward (US).', ['toward', 'up to']],
    ["Step away ___ the edge!", 'from', ['of', 'off', 'out'], 'Відійди від краю!'],
    ["Let's go ___ — it's getting cold.", 'home', ['to home', 'at home', 'in home'], 'Ходімо додому — холоднішає.', 'go home — без to.'],
    ["I'm flying ___ Lisbon on Friday.", 'to', ['in', 'at', 'into'], 'У пʼятницю я лечу до Лісабона.'],
    ["We arrived ___ the airport at six.", 'at', ['to', 'in', 'into'], 'Ми прибули в аеропорт о шостій.', 'arrive at — пункт; ніколи arrive to.'],
    ["They arrived ___ London late at night.", 'in', ['to', 'at', 'into'], 'Вони прибули до Лондона пізно вночі.', 'Місто, країна — arrive in.'],
    ["Come ___ here, I want to show you something.", 'over', ['to', 'at', 'on'], 'Підійди сюди, хочу дещо показати.', 'come over here — підійди до мене.'],
    ["She ran ___ the stairs to answer the door.", 'down', ['off', 'below', 'under'], 'Вона збігла сходами вниз, щоб відчинити двері.'],
    ["I'm going ___ to get my jacket.", 'upstairs', ['to upstairs', 'up stairs', 'on upstairs'], 'Я піду нагору по куртку.'],
    ["Put the milk back ___ the fridge.", 'in', ['at', 'on', 'to'], 'Поклади молоко назад у холодильник.', '', ['into']],
    ["He took a coin ___ his pocket.", 'out of', ['off', 'out', 'of'], 'Він дістав монету з кишені.', '', ['from']],
    ["The train ___ Kyiv is late.", 'from', ['of', 'out', 'off'], 'Потяг з Києва запізнюється.'],
    ["I'll be ___ in five minutes.", 'back', ['return', 'again', 'behind'], 'Я повернуся за пʼять хвилин.', 'be back — повернутися.'],
    ["She moved ___ last year — to Canada.", 'abroad', ['to abroad', 'at abroad', 'outside'], 'Минулого року вона переїхала за кордон — до Канади.', 'abroad — без to.', ['overseas']],
    ["The dog ran ___ from us.", 'away', ['out', 'back', 'far'], 'Собака втік від нас.'],
    ["Let's head ___ the station.", 'for', ['at', 'on', 'into'], 'Рушаймо до вокзалу.', 'head for / head to / head towards — рушати в напрямку.', ['to', 'towards', 'toward']],
    ["Pull the plug ___ the socket.", 'out of', ['off', 'out', 'of'], 'Висмикни вилку з розетки.', '', ['from']],
    ["He climbed ___ the ladder to the roof.", 'up', ['on', 'onto', 'over'], 'Він виліз драбиною на дах.'],
    ["Come ___! The door's open.", 'in', ['into', 'inside of', 'to'], 'Заходь! Двері відчинені.', 'Без місця — in; з місцем — into the room.', ['inside']],
    ["The ball rolled ___ the table and fell.", 'off', ['out of', 'from', 'down'], 'Мʼяч скотився зі столу й упав.']
  ])
};

/* ============================================================
   4. ЧЕРЕЗ, КРІЗЬ, ПОВЗ, НАВКОЛО
   ============================================================ */
const OBSTACLES = {
  id: 'obstacles', emoji: '🌉', title: 'Через, крізь, повз, навколо', uk: 'across, through, over, under, past, around, along',
  level: 'B1',
  lead: 'Українське «через» — це п’ять різних англійських слів. Вчимося бачити, ЯК саме ти проходиш перешкоду.',
  intro: '<div class="intro-box blue"><h3>🧭 «Через» буває різним</h3>' +
    '<p><b>across</b> — по поверхні з одного боку на інший: дорога, річка, поле, кордон, міст.<br>' +
    '<b>through</b> — крізь щось обʼємне, з входом і виходом: тунель, ліс, натовп, двері, вікно, місто.<br>' +
    '<b>over</b> — згори через перешкоду: паркан, стіна, калюжа, голова; також «через міст».<br>' +
    '<b>under</b> — знизу: під мостом, під парканом, під мотузкою.<br>' +
    '<b>via</b> — через проміжний пункт маршруту: via Warsaw, via the ring road.</p></div>' +
    '<div class="compare-grid"><div class="compare-box good"><h4>✅ across — плоске</h4><p>walk across the road<br>swim across the river<br>run across the field</p></div>' +
    '<div class="compare-box good"><h4>✅ through — обʼємне</h4><p>walk through the forest<br>drive through the tunnel<br>push through the crowd</p></div></div>' +
    '<div class="intro-box green"><h3>🔄 Поруч із перешкодою</h3>' +
    '<p><b>past</b> — повз, не зупиняючись · <b>around</b> — навколо, обійти · <b>along</b> — уздовж (вулиці, річки, берега) · ' +
    '<b>between</b> — між двома · <b>up / down</b> — вгору / вниз (схил, сходи, вулиця).</p></div>' +
    '<div class="intro-box orange"><h3>⚠️ Тонкі місця</h3>' +
    '<ul><li>Міст можна перейти і <b>across</b>, і <b>over</b> — обидва правильні.</li>' +
    '<li><b>over</b> — рух над (flew over the house); <b>above</b> — просто положення вище.</li>' +
    '<li><b>down the street</b> не означає «вниз» — це просто «вулицею, далі по вулиці».</li>' +
    '<li><b>around the city</b> — «по місту», туди-сюди.</li></ul></div>',
  rules: [
    { t: 'across — з боку на бік', d: 'Поверхня чи лінія: дорога, річка, поле, кімната.', ex: [['Be careful when you walk across the road.', 'Обережно переходь дорогу.'], ['He swam across the river.', 'Він переплив річку.']] },
    { t: 'through — крізь', d: 'Є «всередині»: тунель, ліс, натовп, двері, вікно, місто, країна.', ex: [['We walked through the forest.', 'Ми йшли через ліс.'], ['The cat got in through the window.', 'Кіт заліз через вікно.']] },
    { t: 'over — згори через', d: 'Перешкода, яку треба перелізти чи перестрибнути.', ex: [['The thief climbed over the fence.', 'Злодій переліз через паркан.']] },
    { t: 'past — повз', d: 'Проходимо поруч і рухаємось далі.', ex: [['She walked past me.', 'Вона пройшла повз мене.']] },
    { t: 'around — навколо', d: 'Обходимо перешкоду або ходимо туди-сюди по місцю.', ex: [['We walked around the lake.', 'Ми обійшли озеро.'], ['We wandered around the city.', 'Ми блукали містом.']] },
    { t: 'along — уздовж', d: 'Паралельно чомусь довгому: вулиця, річка, берег, коридор.', ex: [['We walked along the river.', 'Ми йшли вздовж річки.']] }
  ],
  items: items([
    ["Be careful when you walk ___ the road.", 'across', ['through', 'over', 'along'], 'Будь обережний, коли переходиш дорогу.', 'Дорога — плоска смуга: across.'],
    ["We walked ___ the forest for two hours.", 'through', ['across', 'over', 'along'], 'Ми дві години йшли через ліс.', 'Ліс оточує з усіх боків — through.'],
    ["The thief climbed ___ the fence and ran away.", 'over', ['through', 'across', 'above'], 'Злодій переліз через паркан і втік.', 'Перелізти згори — over. above — лише положення, не рух.'],
    ["The train goes ___ a long tunnel.", 'through', ['across', 'along', 'over'], 'Потяг проходить через довгий тунель.'],
    ["We walked ___ the river to the old mill.", 'along', ['across', 'through', 'past'], 'Ми йшли вздовж річки до старого млина.', 'Паралельно річці — along; перетнути її — across.'],
    ["He swam ___ the river.", 'across', ['through', 'along', 'over'], 'Він переплив річку.', 'З берега на берег — across.'],
    ["I drive ___ your house every morning.", 'past', ['through', 'across', 'along'], 'Я щоранку проїжджаю повз твій будинок.', '', ['by']],
    ["We had to walk ___ the lake — there was no bridge.", 'around', ['across', 'through', 'over'], 'Нам довелося обійти озеро — мосту не було.', '', ['round']],
    ["The boat went ___ the bridge.", 'under', ['over', 'through', 'across'], 'Човен пройшов під мостом.', '', ['beneath', 'underneath']],
    ["I pushed my way ___ the crowd.", 'through', ['across', 'over', 'between'], 'Я пробився крізь натовп.', 'Натовп — «обʼєм» людей: through.'],
    ["Let's walk ___ the bridge to the old town.", 'across', ['through', 'along', 'past'], 'Ходімо через міст до старого міста.', 'Міст — і across, і over.', ['over']],
    ["The cat got in ___ the open window.", 'through', ['across', 'over', 'by'], 'Кіт заліз через відчинене вікно.', 'Вікно, двері, отвір — through.'],
    ["Don't step ___ the puddle — jump over it!", 'into', ['over', 'across', 'through'], 'Не стань у калюжу — перестрибни її!', '', ['in']],
    ["The kids ran ___ the playground, shouting.", 'around', ['along', 'past', 'over'], 'Діти з криками бігали по майданчику.', 'around — туди-сюди по місцю.', ['round', 'about']],
    ["We flew to Tokyo ___ Dubai.", 'via', ['across', 'over', 'past'], 'Ми летіли до Токіо через Дубай.', 'Проміжний пункт — via; розмовно також through.', ['through']],
    ["A cyclist squeezed ___ two parked cars.", 'between', ['among', 'through', 'across'], 'Велосипедист протиснувся між двома припаркованими машинами.'],
    ["The dog crawled ___ the fence.", 'under', ['over', 'across', 'below'], 'Пес проліз під парканом.', 'below — положення нижче; рух під чимось — under.', ['underneath']],
    ["She walked ___ me without saying hello.", 'past', ['across', 'through', 'along'], 'Вона пройшла повз мене й не привіталася.', '', ['by']],
    ["They're walking ___ the hill.", 'up', ['on', 'above', 'onto'], 'Вони піднімаються на пагорб.'],
    ["The ball flew ___ the goalkeeper's head.", 'over', ['above', 'across', 'through'], 'Мʼяч пролетів над головою воротаря.', 'Рух над чимось — over.'],
    ["Walk ___ this street until you see a church.", 'along', ['across', 'through', 'past'], 'Ідіть цією вулицею, доки не побачите церкву.', 'down / up the street — теж «вулицею», без значення вгору-вниз.', ['down', 'up']],
    ["We drove ___ Poland on the way to Berlin.", 'through', ['over', 'along', 'past'], 'По дорозі до Берліна ми проїхали через Польщу.', 'Країна, місто — through (або across, якщо з краю в край).', ['across']],
    ["The river flows ___ the city centre.", 'through', ['across', 'along', 'over'], 'Річка тече через центр міста.'],
    ["He jumped ___ the stream.", 'across', ['through', 'along', 'past'], 'Він перестрибнув через струмок.', '', ['over']],
    ["The shop is ___ the road from here.", 'across', ['through', 'along', 'past'], 'Магазин через дорогу звідси.', 'across the road — на тому боці. У британській також over the road.', ['over']],
    ["Light came in ___ a gap in the curtains.", 'through', ['across', 'over', 'between'], 'Світло пробивалося крізь щілину у шторах.'],
    ["Go ___ the traffic lights and take the first left.", 'past', ['across', 'over', 'along'], 'Проїдьте світлофор і поверніть на першому ліворуч.', '', ['through']]
  ])
};

/* ============================================================
   5. ДІЄСЛОВА РУХУ
   ============================================================ */
const MOVEVERBS = {
  id: 'moveverbs', emoji: '🧗', title: 'Дієслова руху', uk: 'climb over, crawl under, squeeze through, wade across…',
  level: 'B1',
  lead: 'Англійська любить казати, ЯК ти рухаєшся: переліз, проповз, протиснувся, прослизнув. Дієслово + прийменник = вся картинка.',
  intro: '<div class="intro-box blue"><h3>🧩 Формула: СПОСІБ + НАПРЯМОК</h3>' +
    '<p>Українська часто кладе напрямок у префікс: <i>пере-лізти, про-повзти, ви-скочити</i>. ' +
    'Англійська — у прийменник після дієслова, а саме дієслово показує спосіб:</p>' +
    '<p><b>climb over</b> — перелізти · <b>crawl under</b> — проповзти під · <b>squeeze through</b> — протиснутися · ' +
    '<b>wade across</b> — перейти вбрід · <b>step over</b> — переступити · <b>sneak past</b> — прослизнути повз · ' +
    '<b>cut through / across</b> — зрізати через.</p></div>' +
    '<div class="intro-box green"><h3>🚶 Як саме йдемо</h3>' +
    '<p><b>stroll</b> — прогулюватися · <b>wander</b> — блукати · <b>rush / dash</b> — мчати · <b>storm out</b> — вилетіти в гніві · ' +
    '<b>make your way</b> — пробиратися · <b>head for</b> — рушати в напрямку.</p></div>' +
    '<div class="intro-box orange"><h3>🚌 Транспорт</h3>' +
    '<p><b>get in / out of</b> a car, taxi · <b>get on / off</b> a bus, train, plane, bike · розмовно: <b>hop in</b>, <b>hop on</b>. ' +
    'А літак <b>takes off</b> (злітає) і <b>lands</b> (сідає).</p></div>',
  rules: [
    { t: 'Перешкода', d: 'climb over, jump over, step over, crawl under, squeeze through, wade across.', ex: [['We had to climb over the fence.', 'Нам довелося перелізти через паркан.']] },
    { t: 'Непомітно', d: 'sneak / slip past, sneak in / out, tiptoe — навшпиньки.', ex: [['He tried to sneak past the guard.', 'Він намагався прослизнути повз охоронця.']] },
    { t: 'Шлях', d: 'cut through (зрізати), make your way (пробиратися), take the stairs (піти сходами).', ex: [['Let\'s cut through the park.', 'Зріжмо через парк.']] },
    { t: 'Настрій руху', d: 'stroll — повільно й приємно; wander — без мети; rush — поспіхом; storm — у гніві.', ex: [['We strolled along the beach.', 'Ми прогулювалися пляжем.']] }
  ],
  items: items([
    ["We had to ___ over the fence to get the ball.", 'climb', ['go', 'walk', 'pass'], 'Нам довелося перелізти через паркан, щоб дістати мʼяч.'],
    ["The soldier had to ___ under the barbed wire.", 'crawl', ['climb', 'walk', 'jump'], 'Солдату довелося проповзти під колючим дротом.'],
    ["Can you ___ through that gap? It's really narrow.", 'squeeze', ['pass', 'press', 'climb'], 'Протиснешся в ту щілину? Вона дуже вузька.'],
    ["We had to ___ across the river — the water was up to our knees.", 'wade', ['swim', 'sail', 'float'], 'Нам довелося перейти річку вбрід — вода була по коліна.', 'wade — брести у воді.'],
    ["Be careful! ___ over that cable.", 'Step', ['Pass', 'Cross', 'Go'], 'Обережно! Переступи через той кабель.'],
    ["Let's ___ through the park — it's quicker.", 'cut', ['break', 'slice', 'take'], 'Зріжмо через парк — так швидше.', 'cut through / cut across — зрізати шлях.'],
    ["He tried to ___ past the guard.", 'sneak', ['steal', 'hide', 'fly'], 'Він намагався прослизнути повз охоронця.', '', ['slip', 'creep']],
    ["We ___ along the beach at sunset.", 'strolled', ['raced', 'rushed', 'dashed'], 'На заході сонця ми прогулювалися вздовж пляжу.', 'stroll — повільно, для задоволення.', ['walked', 'wandered']],
    ["It's getting late — let's ___ home.", 'head', ['lead', 'face', 'drive to'], 'Вже пізно — рушаймо додому.', '', ['go']],
    ["The kids love to ___ into the lake from the pier.", 'jump', ['fall', 'drop', 'sink'], 'Діти обожнюють стрибати в озеро з пірсу.', '', ['dive']],
    ["I ___ out of bed and ran to the window.", 'jumped', ['stood', 'rose', 'went'], 'Я вискочив з ліжка й побіг до вікна.', '', ['leapt', 'leaped', 'got', 'hopped', 'sprang']],
    ["___ in, I'll give you a lift.", 'Hop', ['Go', 'Sit', 'Enter'], 'Сідай, підвезу.', 'hop in / get in — сісти в машину.', ['Get', 'Jump']],
    ["She ___ off the bus at the last stop.", 'got', ['went', 'came', 'left'], 'Вона вийшла з автобуса на останній зупинці.', '', ['hopped', 'jumped', 'stepped']],
    ["We ___ around the old town for hours.", 'wandered', ['travelled', 'passed', 'crossed'], 'Ми годинами блукали старим містом.', 'wander — ходити без певної мети.', ['walked', 'strolled']],
    ["The children ___ down the hill on their sledges.", 'slid', ['fell', 'dropped', 'flowed'], 'Діти зʼїжджали з гори на санчатах.', '', ['went', 'raced', 'sped']],
    ["He ___ up the stairs two at a time.", 'ran', ['walked', 'crawled', 'stepped'], 'Він збігав сходами вгору через дві сходинки.', '', ['raced', 'rushed', 'dashed', 'bounded']],
    ["The car ___ into a tree.", 'crashed', ['hit', 'knocked', 'beat'], 'Машина врізалася в дерево.', 'crash into — врізатися. А hit без into: hit a tree.', ['ran', 'smashed', 'slammed', 'drove']],
    ["Somebody ___ into the house while we were away.", 'broke', ['came', 'went', 'stole'], 'Поки нас не було, хтось вломився в будинок.', 'break into — вломитися.'],
    ["___ back! The dog bites.", 'Stand', ['Come', 'Put', 'Look'], 'Відійди! Собака кусається.', '', ['Step', 'Stay', 'Get', 'Keep', 'Move']],
    ["I'll ___ by your place after work.", 'drop', ['fall', 'pass', 'visit'], 'Я заскочу до тебе після роботи.', 'drop by / stop by / swing by — заскочити ненадовго.', ['stop', 'swing', 'pop', 'come']],
    ["Please ___ aside and let them pass.", 'step', ['go', 'walk', 'put'], 'Будь ласка, відійдіть убік і пропустіть їх.', '', ['move', 'stand']],
    ["The plane ___ off an hour late.", 'took', ['went', 'rose', 'lifted'], 'Літак злетів на годину пізніше.', 'take off — злітати; land — сідати.'],
    ["The ship slowly ___ into the harbour.", 'sailed', ['swam', 'drove', 'flew'], 'Корабель повільно зайшов у гавань.', '', ['came', 'moved', 'steamed']],
    ["Let's ___ the stairs — the lift is broken.", 'take', ['go', 'make', 'do'], 'Ходімо сходами — ліфт зламаний.', 'take the stairs / the lift / the bus / the road.', ['use']],
    ["She ___ out of the room in anger.", 'stormed', ['flew', 'broke', 'fell'], 'Вона в гніві вилетіла з кімнати.', 'storm out — вийти, грюкнувши дверима.', ['ran', 'rushed', 'walked', 'stomped']],
    ["We ___ our way through the jungle.", 'made', ['did', 'took', 'got'], 'Ми пробиралися крізь джунглі.', 'make your way — пробиратися, прокладати шлях.', ['fought', 'cut', 'pushed', 'forced']]
  ])
};

/* ============================================================
   6. ПИТАЄМО Й УТОЧНЮЄМО
   ============================================================ */
const ASKING = {
  id: 'asking', emoji: '💬', title: 'Питаємо й уточнюємо', uk: 'Where are you? Which side? How do I get to…?',
  level: 'A2',
  lead: 'Ти де? Де саме? З якого боку? Як дістатися? Питання і відповіді, коли шукаєш людину чи місце.',
  intro: '<div class="intro-box blue"><h3>📞 «Ти де?» по телефону</h3>' +
    '<p><b>Where are you?</b> → <i>I\'m on my way. / I\'m just outside. / I\'m around the corner. / I\'m at the entrance.</i><br>' +
    '<b>Where exactly?</b> — де саме? · <b>Which side?</b> — з якого боку? · <b>Are you inside or outside?</b> · <b>Which floor are you on?</b></p></div>' +
    '<div class="intro-box green"><h3>🗺️ Як дістатися</h3>' +
    '<p><b>How do I get to…?</b> · <b>Is it far?</b> · <b>How far is it from here?</b> · <b>Is it within walking distance?</b> · ' +
    '<b>Is there a … near here?</b> · <b>Where\'s the nearest…?</b></p></div>' +
    '<div class="intro-box orange"><h3>🧭 Пояснюємо дорогу</h3>' +
    '<p><b>Go straight on</b> · <b>Turn left / right at the lights</b> · <b>Take the second turning on the left</b> · ' +
    '<b>Keep going until you reach…</b> · <b>It\'s on your left</b> · <b>You can\'t miss it</b> · <b>It\'s ten minutes on foot</b>.</p></div>' +
    '<div class="intro-box pink"><h3>✅ Уточнюємо, чи правильно зрозуміли</h3>' +
    '<p><b>Do you mean the one opposite the station?</b> · <b>So it\'s past the bank, right?</b> · <b>The big building or the small one?</b> · ' +
    '<b>Sorry, left or right?</b></p></div>',
  dialogs: [
    { title: '📞 Не можу тебе знайти', lines: [
      ['A', 'Hey, where are you? I\'m at the entrance.', 'Привіт, ти де? Я біля входу.'],
      ['B', 'Which entrance? There are two.', 'Якого входу? Їх два.'],
      ['A', 'The main one, opposite the pharmacy.', 'Головного, навпроти аптеки.'],
      ['B', 'Oh, I\'m on the other side of the building. I\'ll come round.', 'А, я з іншого боку будівлі. Зараз обійду.'],
      ['A', 'OK, I\'m the one in the green jacket.', 'Добре, я в зеленій куртці.']
    ] },
    { title: '🗺️ Як пройти до музею', lines: [
      ['A', 'Excuse me, how do I get to the museum?', 'Перепрошую, як дістатися до музею?'],
      ['B', 'Go straight on and turn left at the lights.', 'Ідіть прямо й поверніть ліворуч на світлофорі.'],
      ['A', 'Is it far?', 'Це далеко?'],
      ['B', 'Not really, about ten minutes on foot. It\'s just past the park, on your right.', 'Не дуже, хвилин десять пішки. Одразу за парком, праворуч.'],
      ['A', 'So left at the lights, then past the park?', 'Тобто ліворуч на світлофорі, а тоді повз парк?'],
      ['B', 'Exactly. You can\'t miss it.', 'Саме так. Не пропустите.']
    ] }
  ],
  rules: [
    { t: 'Де ти / де саме', d: 'Where are you? — Where exactly? — Which side? — Inside or outside?', ex: [['Where exactly are you?', 'Де ти саме?']] },
    { t: 'Дорога', d: 'How do I get to…? — not «How to get to…?» у питанні до людини.', ex: [['How do I get to the station?', 'Як мені дістатися до вокзалу?']] },
    { t: 'Відстань', d: 'How far is it? — Is it within walking distance? — ten minutes on foot / by car.', ex: [['It\'s ten minutes on foot.', 'Десять хвилин пішки.']] },
    { t: 'Перепитати', d: 'Do you mean…? / So it\'s…, right? — безпечний спосіб перевірити, що зрозумів.', ex: [['Do you mean the café opposite the station?', 'Маєш на увазі кафе навпроти вокзалу?']] }
  ],
  items: items([
    ["— Where are you? — I'm ___ my way.", 'on', ['in', 'at', 'by'], '— Ти де? — Я вже в дорозі.', 'on my way — в дорозі, вже йду.'],
    ["Where ___ are you? I can't see you.", 'exactly', ['exact', 'right', 'just'], 'Де ти саме? Я тебе не бачу.'],
    ["___ side of the street are you on?", 'Which', ['Where', 'How', 'Whose'], 'На якому боці вулиці ти?', '', ['What']],
    ["How do I get ___ the museum?", 'to', ['at', 'in', 'into'], 'Як мені дістатися до музею?', 'get to — дістатися до.'],
    ["Is it ___ walking distance?", 'within', ['on', 'at', 'under'], 'Туди можна дійти пішки?', '', ['in']],
    ["How ___ is it from here?", 'far', ['much', 'long', 'many'], 'Як далеко це звідси?'],
    ["Go straight ___ and turn left at the lights.", 'on', ['up', 'in', 'over'], 'Ідіть прямо й на світлофорі поверніть ліворуч.', '', ['ahead']],
    ["Take the second turning ___ the right.", 'on', ['to', 'at', 'in'], 'Поверніть на другому повороті праворуч.'],
    ["It's ___ your left, you can't miss it.", 'on', ['at', 'in', 'to'], 'Це буде ліворуч від вас, не пропустите.'],
    ["Excuse me, where's the ___ pharmacy?", 'nearest', ['nearer', 'near', 'nearly'], 'Перепрошую, де найближча аптека?'],
    ["I'm ___ outside — come out!", 'right', ['straight', 'very', 'exact'], 'Я вже прямо під дверима — виходь!', '', ['just']],
    ["Do you mean the café ___ the station?", 'opposite', ['in front', 'against', 'over'], 'Ти маєш на увазі кафе навпроти вокзалу?', '', ['across from']],
    ["— Where did you leave your keys? — I think I left them ___ the kitchen table.", 'on', ['in', 'at', 'over'], '— Де ти лишив ключі? — Здається, на кухонному столі.'],
    ["Is there a bank ___ here?", 'near', ['close', 'next', 'beside'], 'Тут поблизу є банк?', '', ['around']],
    ["Could you show me where we are ___ the map?", 'on', ['in', 'at', 'by'], 'Покажете, де ми на мапі?', 'on the map — на мапі.'],
    ["Are we going the right ___?", 'way', ['road', 'path', 'side'], 'Ми правильно йдемо?', 'the right way / the wrong way — правильною / неправильною дорогою.'],
    ["— Where's Tom? — He's ___ the garden, fixing the fence.", 'in', ['on', 'at', 'by'], '— Де Том? — У саду, лагодить паркан.', '', ['out in']],
    ["Can you see the tall building? The hotel is right ___ it.", 'behind', ['after', 'back of', 'over'], 'Бачиш високу будівлю? Готель одразу за нею.'],
    ["I'm ___ the queue for coffee, I'll be there in a sec.", 'in', ['on', 'at', 'of'], 'Я стою в черзі по каву, зараз буду.', 'in the queue (UK) = in line (US).'],
    ["How long does it take to get ___?", 'there', ['to there', 'in there', 'at there'], 'Скільки часу туди добиратися?', 'here / there / home — без to.'],
    ["Keep going ___ you reach the river.", 'until', ['while', 'when', 'to'], 'Ідіть, доки не дійдете до річки.', '', ['till']],
    ["It's about ten minutes ___ foot.", 'on', ['by', 'with', 'in'], 'Це приблизно десять хвилин пішки.', 'on foot, але by car / by bus.'],
    ["Get ___ the bus at the third stop.", 'off', ['out', 'out of', 'down'], 'Вийдіть з автобуса на третій зупинці.'],
    ["— Is the toilet upstairs? — No, it's down the ___, on the left.", 'hall', ['floor', 'side', 'room'], '— Туалет нагорі? — Ні, далі коридором, ліворуч.', '', ['corridor', 'hallway']],
    ["Can you meet me ___ the main entrance?", 'at', ['on', 'in', 'to'], 'Зустрінеш мене біля головного входу?', '', ['by', 'outside']]
  ])
};

/* ============================================================
   7. ВИБИРАЄМО МАРШРУТ
   ============================================================ */
const ROUTE = {
  id: 'route', emoji: '🗺️', title: 'Вибираємо маршрут', uk: 'take a shortcut, go the long way, via, I\'d rather…',
  level: 'B1',
  lead: 'Через парк чи навколо? Мостом чи тунелем? Як запропонувати дорогу, порівняти варіанти й сказати, як тобі краще.',
  intro: '<div class="intro-box blue"><h3>💡 Запропонувати</h3>' +
    '<p><b>Let\'s go through the park.</b> · <b>Why don\'t we cut across the field?</b> · <b>Shall we take the bridge?</b> · ' +
    '<b>How about going via the old town?</b></p></div>' +
    '<div class="intro-box green"><h3>⚖️ Порівняти</h3>' +
    '<p><b>It\'s quicker to go over the bridge.</b> · <b>It\'s shorter if we cut through the park.</b> · <b>Which way is shorter?</b> · ' +
    '<b>The quickest way is through the underpass.</b></p></div>' +
    '<div class="intro-box orange"><h3>🙋 Сказати, як краще тобі</h3>' +
    '<p><b>I\'d rather walk than take the bus.</b> — <i>rather … than</i> + дієслово без to<br>' +
    '<b>I prefer the stairs to the lift.</b> — <i>prefer X to Y</i> (не <s>than</s>)<br>' +
    '<b>I\'d prefer to go around.</b> · <b>Let\'s avoid going through the centre.</b> — <i>avoid</i> + -ing</p></div>' +
    '<div class="intro-box pink"><h3>🛣️ Словник маршруту</h3>' +
    '<p><b>a shortcut</b> — коротший шлях · <b>the long way (round)</b> — довшою дорогою · <b>the scenic route</b> — мальовничим маршрутом · ' +
    '<b>a detour</b> — обʼїзд · <b>the back roads</b> — другорядні дороги · <b>turn back</b> — повернути назад · <b>via</b> — через (пункт).</p></div>',
  dialogs: [
    { title: '🌳 Парком чи навколо?', lines: [
      ['A', 'Shall we go through the park or around it?', 'Підемо через парк чи обійдемо?'],
      ['B', 'Through the park — it\'s a shortcut.', 'Через парк — так коротше.'],
      ['A', 'It\'s getting dark, though. I\'d rather go around.', 'Але вже темніє. Я б краще обійшов.'],
      ['B', 'Fair enough. We can walk along the river then.', 'Справедливо. Тоді можемо піти вздовж річки.']
    ] },
    { title: '🚗 Обʼїзд', lines: [
      ['A', 'The GPS says there\'s a detour on the main road.', 'Навігатор каже, що на головній дорозі обʼїзд.'],
      ['B', 'Then let\'s take the back roads.', 'Тоді поїхали другорядними.'],
      ['A', 'Or we could go via the ring road — it\'s longer but faster.', 'Або можемо через окружну — довше, але швидше.'],
      ['B', 'OK, the ring road. I\'d rather not get stuck in traffic.', 'Добре, окружною. Не хочу застрягти в заторі.']
    ] }
  ],
  rules: [
    { t: 'Пропозиція', d: 'Let\'s… / Why don\'t we…? / Shall we…? / How about + -ing?', ex: [['Why don\'t we go through the old town?', 'Чому б не піти через старе місто?']] },
    { t: 'I\'d rather … than', d: 'Дієслово без to в обох частинах.', ex: [['I\'d rather walk than take the bus.', 'Я б краще пройшовся, ніж їхати автобусом.']] },
    { t: 'prefer X to Y', d: 'З іменниками та -ing — to, не than.', ex: [['I prefer the stairs to the lift.', 'Я віддаю перевагу сходам, а не ліфту.']] },
    { t: 'avoid + -ing', d: 'Після avoid — тільки -ing.', ex: [['Let\'s avoid going through the centre.', 'Давай не їхати через центр.']] }
  ],
  items: items([
    ["Let's take a ___ through the park.", 'shortcut', ['short way', 'fast way', 'cutway'], 'Зріжмо через парк.', '', ['short cut']],
    ["It's quicker to go ___ the bridge than through the tunnel.", 'over', ['above', 'on', 'along'], 'Мостом швидше, ніж через тунель.', '', ['across']],
    ["I'd rather walk ___ the lake than cross it by boat.", 'around', ['past', 'through', 'across'], 'Я б краще обійшов озеро, ніж перепливати його човном.', '', ['round']],
    ["We went the long ___ to avoid the traffic.", 'way', ['road', 'path', 'trip'], 'Ми поїхали довшою дорогою, щоб обʼїхати затори.', '', ['way round', 'route']],
    ["Why don't we go ___ the old town? It's prettier.", 'through', ['over', 'above', 'along'], 'Чому б не піти через старе місто? Там гарніше.', '', ['via']],
    ["Let's not go ___ the main road — it's too busy.", 'along', ['through', 'over', 'above'], 'Не йдімо головною дорогою — там дуже людно.', '', ['down', 'on', 'by', 'via']],
    ["Which ___ is shorter?", 'way', ['side', 'part', 'point'], 'Яким шляхом коротше?', '', ['route', 'road']],
    ["We took the scenic ___ along the coast.", 'route', ['trip', 'travel', 'map'], 'Ми поїхали мальовничим маршрутом уздовж узбережжя.', '', ['road', 'way']],
    ["There's a ___ because of roadworks.", 'detour', ['turnaround', 'return', 'contour'], 'Там обʼїзд через ремонт дороги.', 'detour (US) = diversion (UK).', ['diversion']],
    ["We got lost and had to turn ___.", 'back', ['behind', 'again', 'return'], 'Ми заблукали й мусили повернути назад.', '', ['around', 'round']],
    ["If we cut ___ the field, we'll save ten minutes.", 'across', ['along', 'past', 'over'], 'Якщо зріжемо через поле, зекономимо десять хвилин.', 'Поле — плоске: across.', ['through']],
    ["You'd better go ___ the ring road — the centre is jammed.", 'via', ['through', 'across', 'into'], 'Краще їдь окружною — у центрі затори.', '', ['along', 'by', 'round', 'around', 'on']],
    ["I prefer the stairs ___ the lift.", 'to', ['than', 'from', 'instead'], 'Я віддаю перевагу сходам, а не ліфту.', 'prefer X to Y — не than.', ['over']],
    ["I'd rather go on foot ___ take the bus.", 'than', ['then', 'to', 'that'], 'Я б краще пішов пішки, ніж їхав автобусом.', 'would rather … than.'],
    ["Is it faster to go ___ Warsaw or via Budapest?", 'via', ['across', 'over', 'along'], 'Швидше їхати через Варшаву чи через Будапешт?', '', ['through']],
    ["Let's avoid ___ through the city centre.", 'going', ['to go', 'go', 'gone'], 'Давай не їхати через центр міста.', 'avoid + -ing.', ['driving']],
    ["This way or ___ way?", 'that', ['this', 'these', 'there'], 'Сюди чи туди?'],
    ["Stay ___ the path — the grass is wet.", 'on', ['in', 'at', 'by'], 'Не сходь зі стежки — трава мокра.'],
    ["We should go the ___ way round — it's one-way.", 'other', ['another', 'others', 'second'], 'Треба обʼїхати з іншого боку — тут одностороння.'],
    ["Follow the signs ___ the city centre.", 'to', ['at', 'into', 'of'], 'Їдьте за знаками на центр міста.', '', ['for']],
    ["It'll be quicker if we take the ___ roads.", 'back', ['behind', 'rear', 'after'], 'Швидше буде другорядними дорогами.', '', ['side']],
    ["Shall we walk ___ or take a taxi?", 'there', ['to there', 'at there', 'to it'], 'Підемо туди пішки чи візьмемо таксі?', '', ['it']],
    ["The quickest way is ___ the underpass.", 'through', ['across', 'over', 'along'], 'Найшвидше — через підземний перехід.', '', ['via']],
    ["Let's go ___ the hill, not around it — it's shorter.", 'over', ['above', 'through', 'onto'], 'Ходімо через пагорб, а не навколо — так коротше.', '', ['across', 'up and over']]
  ])
};

/* ============================================================
   8. ПАСТКИ
   ============================================================ */
const TRAPS = {
  id: 'traps', emoji: '🪤', title: 'Пастки', uk: 'in the car / on the bus, enter the room, go home…',
  level: 'B1',
  lead: 'Місця, де українська логіка підводить: транспорт, «на роботі», «в лікарні», адреси, enter без into.',
  intro: '<div class="intro-box blue"><h3>🚗 Транспорт</h3>' +
    '<p><b>in</b> the car / taxi — сидиш, не встанеш; <b>get in / into, get out of</b>.<br>' +
    '<b>on</b> the bus / train / plane / ship / bike — можна стояти й ходити; <b>get on / off</b>.</p></div>' +
    '<div class="intro-box green"><h3>🏢 Де людина «буває»</h3>' +
    '<p>Без артикля: <b>at work, at school, at home, in bed, in hospital (UK), on holiday</b>. ' +
    '<i>He\'s in bed</i> — спить; <i>on the bed</i> — лежить зверху, на покривалі.</p></div>' +
    '<div class="intro-box orange"><h3>📮 Адреси</h3>' +
    '<p><b>at</b> 25 Park Road — точна адреса з номером<br><b>on</b> Park Road (US) / <b>in</b> Park Road (UK) — вулиця без номера<br><b>in</b> Kyiv — місто.</p></div>' +
    '<div class="intro-box red"><h3>🚫 Зайві прийменники</h3>' +
    '<p><b>enter the room</b> (не <s>enter into</s>) · <b>get home</b> (не <s>to home</s>) · <b>near the park</b> (не <s>near of</s>) · <b>go abroad</b> (не <s>to abroad</s>).</p></div>',
  rules: [
    { t: 'in the car / on the bus', d: 'Маленький транспорт — in; великий, де можна стояти, — on.', ex: [['I left my bag on the bus.', 'Я забув сумку в автобусі.'], ['The kids are in the car.', 'Діти в машині.']] },
    { t: 'enter без into', d: 'enter вже означає «увійти в».', ex: [['He entered the room quietly.', 'Він тихо увійшов у кімнату.']] },
    { t: 'between для названих', d: 'Якщо перелічуєш сторони поіменно — between, навіть коли їх більше двох.', ex: [['Switzerland is between France, Germany, Austria and Italy.', 'Швейцарія між Францією, Німеччиною, Австрією та Італією.']] },
    { t: 'in front of vs opposite', d: 'in front of — перед, з того ж боку; opposite — навпроти, через дорогу.', ex: [['Our house is opposite the park.', 'Наш будинок навпроти парку.']] }
  ],
  items: items([
    ["I left my bag ___ the bus.", 'on', ['in', 'at', 'into'], 'Я забув сумку в автобусі.', 'Автобус, потяг, літак — on.'],
    ["The kids are waiting ___ the car.", 'in', ['on', 'at', 'into'], 'Діти чекають у машині.', 'Легковик — in.'],
    ["Call me when you get ___ the airport.", 'to', ['at', 'in', 'into'], 'Подзвони, коли доберешся до аеропорту.', 'get to — дістатися; arrive at.'],
    ["He ___ the room quietly.", 'entered', ['entered into', 'came in', 'went in to'], 'Він тихо увійшов у кімнату.', 'enter без into; або came into / walked into.', ['came into', 'walked into', 'went into']],
    ["I got ___ late last night.", 'home', ['to home', 'at home', 'in home'], 'Учора я пізно дістався додому.', 'get home — без to.'],
    ["There's a clock ___ the door.", 'above', ['on', 'up', 'onto'], 'Над дверима висить годинник.', '', ['over']],
    ["She put a blanket ___ the sleeping baby.", 'over', ['above', 'on top', 'across'], 'Вона накрила сплячу дитину ковдрою.', 'over — накриваючи.'],
    ["The shop is ___ the bank.", 'next to', ['near of', 'next', 'beside of'], 'Магазин поруч із банком.', 'next to — з to; near — без of; beside — без of.', ['beside', 'by']],
    ["The house is hidden ___ the trees.", 'among', ['between', 'inside of', 'through'], 'Будинок захований серед дерев.'],
    ["Switzerland is ___ France, Germany, Austria, Italy and Liechtenstein.", 'between', ['among', 'amid', 'inside'], 'Швейцарія розташована між Францією, Німеччиною, Австрією, Італією та Ліхтенштейном.', 'Сторони названі поіменно — between.'],
    ["Who's that man ___ the picture?", 'in', ['on', 'at', 'onto'], 'Хто цей чоловік на фото?', 'in the picture / photo — «у» зображенні.'],
    ["He got ___ the taxi and drove off.", 'into', ['on', 'onto', 'at'], 'Він сів у таксі й поїхав.', 'get in / into a car or taxi.', ['in']],
    ["We got ___ the train just in time.", 'on', ['in', 'into', 'at'], 'Ми сіли на потяг якраз вчасно.', 'get on a bus / train / plane.', ['onto']],
    ["Put it ___ your pocket.", 'in', ['on', 'at', 'to'], 'Поклади в кишеню.', '', ['into']],
    ["We live ___ 25 Park Road.", 'at', ['in', 'on', 'by'], 'Ми живемо на Парк-роуд, 25.', 'Точна адреса з номером — at.'],
    ["They live ___ Park Road.", 'on', ['at', 'by', 'along'], 'Вони живуть на Парк-роуд.', 'Вулиця без номера — on (US) / in (UK).', ['in']],
    ["Our house is ___ the park — just cross the road.", 'opposite', ['in front of', 'before', 'front of'], 'Наш будинок навпроти парку — просто перейди дорогу.', 'Через дорогу — opposite; in front of — з того самого боку.', ['across from']],
    ["We climbed ___ the top of the tower.", 'to', ['on', 'at', 'in'], 'Ми вилізли на самий верх вежі.'],
    ["She's ___ holiday in Spain.", 'on', ['in', 'at', 'at the'], 'Вона у відпустці в Іспанії.', 'on holiday, on a trip, on business.'],
    ["He's still ___ bed.", 'in', ['on', 'at', 'into'], 'Він ще в ліжку.', 'in bed — спить чи лежить під ковдрою.'],
    ["Mum's ___ work until six.", 'at', ['on', 'in', 'to'], 'Мама на роботі до шостої.'],
    ["My grandma is ___ hospital.", 'in', ['at', 'on', 'to'], 'Бабуся в лікарні.', 'in hospital (UK) = in the hospital (US) — лікується там.'],
    ["The Danube flows ___ Budapest.", 'through', ['across', 'along', 'over'], 'Дунай тече через Будапешт.'],
    ["Look! There's a spider ___ the ceiling.", 'on', ['in', 'at', 'over'], 'Дивись! На стелі павук.', 'Стеля — поверхня, тож on.']
  ])
};

/* ============================================================
   КАРТИНКИ: де кулька і як вона рухається
   ============================================================ */
const ball = (x, y, r) => '<circle class="sc-ball" cx="' + x + '" cy="' + y + '" r="' + (r || 10) + '"/>';
const grey = (x, y, r) => '<circle class="sc-grey" cx="' + x + '" cy="' + y + '" r="' + (r || 9) + '"/>';
const rect = (x, y, w, h, cls) => '<rect class="' + (cls || 'sc-obj') + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3"/>';
const line = d => '<path class="sc-line" d="' + d + '"/>';
const ground = '<line class="sc-ground" x1="8" y1="128" x2="232" y2="128"/>';
/* пунктирна траєкторія + наконечник: tip — кінець, deg — напрямок руху в кінці */
const path = (d, tx, ty, deg) => {
  const a = deg * Math.PI / 180, L = 12, s = 0.45;
  const p = k => (tx - L * Math.cos(a + k * s)).toFixed(1) + ',' + (ty - L * Math.sin(a + k * s)).toFixed(1);
  return '<path class="sc-path" d="' + d + '"/><polygon class="sc-head" points="' + tx + ',' + ty + ' ' + p(1) + ' ' + p(-1) + '"/>';
};
const house = (x, w) => rect(x, 52, w, 76) + '<polygon class="sc-obj" points="' + (x - 6) + ',54 ' + (x + w / 2) + ',22 ' + (x + w + 6) + ',54"/>';
const svg = body => '<svg viewBox="0 0 240 150" role="img" xmlns="http://www.w3.org/2000/svg">' + body + '</svg>';

const SCENES = [
  /* ---- де ---- */
  { id: 's-in', kind: 'place', a: 'in', w: ['on', 'under', 'behind'], en: 'The ball is in the box.', uk: 'Мʼяч у коробці.',
    svg: svg(ground + rect(85, 68, 70, 60, 'sc-obj soft') + ball(120, 116) + line('M85 66 V128 H155 V66')) },
  { id: 's-on', kind: 'place', a: 'on', w: ['in', 'above', 'next to'], en: 'The ball is on the box.', uk: 'Мʼяч на коробці.',
    svg: svg(ground + rect(90, 78, 60, 50) + ball(120, 67)) },
  { id: 's-under', kind: 'place', a: 'under', w: ['on', 'behind', 'in front of'], en: 'The ball is under the table.', uk: 'Мʼяч під столом.',
    svg: svg(ground + rect(62, 64, 116, 9) + rect(68, 73, 7, 55) + rect(165, 73, 7, 55) + ball(120, 117)) },
  { id: 's-above', kind: 'place', a: 'above', w: ['on', 'under', 'against'], en: 'The ball is above the box.', uk: 'Мʼяч над коробкою.',
    svg: svg(ground + rect(90, 78, 60, 50) + ball(120, 30)) },
  { id: 's-next', kind: 'place', a: 'next to', w: ['between', 'behind', 'on'], en: 'The ball is next to the box.', uk: 'Мʼяч поруч із коробкою.',
    svg: svg(ground + rect(78, 70, 60, 58) + ball(151, 117)) },
  { id: 's-behind', kind: 'place', a: 'behind', w: ['in front of', 'on', 'in'], en: 'The ball is behind the box.', uk: 'Мʼяч за коробкою.',
    svg: svg(ground + ball(140, 66, 11) + rect(90, 66, 60, 62)) },
  { id: 's-front', kind: 'place', a: 'in front of', w: ['behind', 'opposite', 'on'], en: 'The ball is in front of the box.', uk: 'Мʼяч перед коробкою.',
    svg: svg(ground + rect(92, 56, 56, 60) + ball(120, 116, 13)) },
  { id: 's-between', kind: 'place', a: 'between', w: ['among', 'next to', 'around'], en: 'The ball is between the boxes.', uk: 'Мʼяч між коробками.',
    svg: svg(ground + rect(40, 78, 50, 50) + rect(150, 78, 50, 50) + ball(120, 117)) },
  { id: 's-among', kind: 'place', a: 'among', w: ['between', 'around', 'next to'], en: 'The red ball is among the grey ones.', uk: 'Червоний мʼяч серед сірих.',
    svg: svg(grey(62, 44) + grey(100, 30) + grey(150, 38) + grey(186, 60) + grey(70, 96) + grey(108, 112) + grey(160, 108) + grey(196, 104) + grey(44, 72) + ball(124, 72)) },
  { id: 's-around', kind: 'place', a: 'around', w: ['between', 'among', 'in'], en: 'The balls are around the box.', uk: 'Мʼячі навколо коробки.',
    svg: svg(rect(95, 50, 50, 50) + ball(120, 26, 8) + ball(166, 44, 8) + ball(170, 100, 8) + ball(120, 124, 8) + ball(72, 104, 8) + ball(70, 46, 8)) },
  { id: 's-against', kind: 'place', q: 'Як стоїть дошка?', a: 'against', w: ['on', 'under', 'behind'], en: 'The board is leaning against the wall.', uk: 'Дошка стоїть, спершись на стіну.',
    svg: svg(ground + rect(150, 18, 22, 110) + '<line class="sc-plank" x1="92" y1="126" x2="146" y2="36"/>') },
  { id: 's-bottom', kind: 'place', a: 'at the bottom of', w: ['on top of', 'under', 'next to'], en: 'The ball is at the bottom of the jar.', uk: 'Мʼяч на дні банки.',
    svg: svg(ground + rect(95, 24, 50, 104, 'sc-obj soft') + ball(120, 116) + line('M95 22 V128 H145 V22')) },
  { id: 's-corner', kind: 'place', a: 'in the corner of', w: ['in the middle of', 'around', 'next to'], en: 'The ball is in the corner of the room.', uk: 'Мʼяч у кутку кімнати.',
    svg: svg('<rect class="sc-room" x="60" y="12" width="120" height="124"/>' + ball(73, 123, 9)) },
  { id: 's-middle', kind: 'place', a: 'in the middle of', w: ['in the corner of', 'around', 'between'], en: 'The ball is in the middle of the room.', uk: 'Мʼяч посеред кімнати.',
    svg: svg('<rect class="sc-room" x="60" y="12" width="120" height="124"/>' + ball(120, 74, 9)) },
  { id: 's-opposite', kind: 'place', a: 'opposite', w: ['in front of', 'next to', 'behind'], en: 'The ball is opposite the house, across the road.', uk: 'Мʼяч навпроти будинку, через дорогу.',
    svg: svg('<rect class="sc-road" x="8" y="74" width="224" height="34"/><line class="sc-dash" x1="8" y1="91" x2="232" y2="91"/>' +
      rect(98, 30, 44, 40) + '<polygon class="sc-obj" points="92,32 120,10 148,32"/>' + ball(120, 128)) },
  /* ---- рух ---- */
  { id: 'm-across', kind: 'move', a: 'across', w: ['through', 'along', 'under'], en: 'The ball goes across the river.', uk: 'Мʼяч перетинає річку.',
    svg: svg('<rect class="sc-water" x="8" y="52" width="224" height="44"/>' + path('M120 126 V26', 120, 18, -90) + ball(120, 134, 9)) },
  { id: 'm-through', kind: 'move', a: 'through', w: ['across', 'over', 'past'], en: 'The ball goes through the tunnel.', uk: 'Мʼяч проходить крізь тунель.',
    svg: svg(ground + '<path class="sc-hill" d="M26 128 Q120 -6 214 128 Z"/><rect class="sc-dark" x="58" y="94" width="124" height="34" rx="14"/>' +
      path('M24 112 H218', 228, 112, 0) + ball(18, 112, 9)) },
  { id: 'm-over', kind: 'move', a: 'over', w: ['through', 'under', 'across'], en: 'The ball jumps over the fence.', uk: 'Мʼяч перестрибує через паркан.',
    svg: svg(ground + rect(104, 72, 7, 56) + rect(117, 72, 7, 56) + rect(130, 72, 7, 56) + rect(98, 86, 46, 6) + rect(98, 108, 46, 6) +
      path('M44 116 Q120 -4 196 116', 196, 116, 58) + ball(40, 118)) },
  { id: 'm-under', kind: 'move', a: 'under', w: ['over', 'across', 'through'], en: 'The ball rolls under the bridge.', uk: 'Мʼяч котиться під мостом.',
    svg: svg(ground + '<path class="sc-obj" d="M6 40 H234 V128 H206 Q120 36 34 128 H6 Z"/>' + path('M56 116 H178', 188, 116, 0) + ball(48, 116, 9)) },
  { id: 'm-past', kind: 'move', a: 'past', w: ['through', 'around', 'over'], en: 'The ball rolls past the tree.', uk: 'Мʼяч прокочується повз дерево.',
    svg: svg('<circle class="sc-tree" cx="120" cy="48" r="24"/>' + path('M32 104 H210', 220, 104, 0) + ball(22, 104)) },
  { id: 'm-around', kind: 'move', a: 'around', w: ['through', 'over', 'past'], en: 'The ball goes around the tree.', uk: 'Мʼяч обходить дерево.',
    svg: svg('<circle class="sc-tree" cx="120" cy="75" r="26"/>' + path('M120 125 A50 50 0 1 1 170 78', 170, 84, 90) + ball(120, 127, 9)) },
  { id: 'm-along', kind: 'move', a: 'along', w: ['across', 'through', 'over'], en: 'The ball rolls along the river.', uk: 'Мʼяч котиться вздовж річки.',
    svg: svg('<rect class="sc-water" x="8" y="30" width="224" height="40"/>' + path('M34 104 H212', 222, 104, 0) + ball(24, 104)) },
  { id: 'm-into', kind: 'move', a: 'into', w: ['out of', 'past', 'onto'], en: 'The ball goes into the house.', uk: 'Мʼяч закочується в будинок.',
    svg: svg(ground + house(132, 84) + rect(162, 90, 24, 38, 'sc-dark') + path('M38 118 H164', 174, 118, 0) + ball(28, 118)) },
  { id: 'm-outof', kind: 'move', a: 'out of', w: ['into', 'towards', 'off'], en: 'The ball comes out of the house.', uk: 'Мʼяч викочується з будинку.',
    svg: svg(ground + house(24, 84) + rect(54, 90, 24, 38, 'sc-dark') + path('M78 118 H212', 222, 118, 0) + ball(66, 118)) },
  { id: 'm-towards', kind: 'move', a: 'towards', w: ['away from', 'into', 'past'], en: 'The ball rolls towards the box.', uk: 'Мʼяч котиться до коробки.',
    svg: svg(ground + rect(178, 68, 46, 60) + path('M40 118 H118', 128, 118, 0) + ball(30, 118)) },
  { id: 'm-away', kind: 'move', a: 'away from', w: ['towards', 'into', 'onto'], en: 'The ball rolls away from the box.', uk: 'Мʼяч відкочується від коробки.',
    svg: svg(ground + rect(16, 68, 46, 60) + path('M84 118 H210', 220, 118, 0) + ball(74, 118)) },
  { id: 'm-up', kind: 'move', a: 'up', w: ['down', 'over', 'along'], en: 'The ball rolls up the hill.', uk: 'Мʼяч котиться вгору схилом.',
    svg: svg(ground + '<polygon class="sc-hill" points="16,128 214,34 214,128"/>' + path('M52 100 L184 38', 192, 34, -25.4) + ball(42, 104)) },
  { id: 'm-down', kind: 'move', a: 'down', w: ['up', 'across', 'through'], en: 'The ball rolls down the hill.', uk: 'Мʼяч котиться вниз схилом.',
    svg: svg(ground + '<polygon class="sc-hill" points="26,34 224,128 26,128"/>' + path('M48 26 L180 88', 188, 92, 25.4) + ball(38, 22)) },
  { id: 'm-onto', kind: 'move', a: 'onto', w: ['off', 'into', 'under'], en: 'The ball jumps onto the box.', uk: 'Мʼяч застрибує на коробку.',
    svg: svg(ground + rect(140, 72, 80, 56) + path('M46 110 Q108 0 176 58', 176, 58, 40) + ball(40, 118)) },
  { id: 'm-off', kind: 'move', a: 'off', w: ['onto', 'out of', 'over'], en: 'The ball falls off the box.', uk: 'Мʼяч падає з коробки.',
    svg: svg(ground + rect(20, 72, 80, 56) + path('M68 56 Q150 10 196 112', 196, 112, 66) + ball(60, 61)) },
  { id: 'm-between', kind: 'move', a: 'between', w: ['around', 'over', 'along'], en: 'The ball rolls between the trees.', uk: 'Мʼяч котиться між деревами.',
    svg: svg('<circle class="sc-tree" cx="120" cy="30" r="20"/><circle class="sc-tree" cx="120" cy="120" r="20"/>' + path('M32 75 H210', 220, 75, 0) + ball(22, 75)) }
];

window.PRACTICE_DATA = window.PRACTICE_DATA || {};
window.PRACTICE_DATA.motion = {
  META: {
    lead: 'Де хто знаходиться, куди й як рухається, через що перелазить, як питати дорогу й уточнювати місце. ' +
      'Українське «через» — це across, through, over, via і past; тут вчимося їх розрізняти.'
  },
  GROUPS: [
    { id: 'mv-place', emoji: '📍', title: 'Де це', items: ['where', 'precise'] },
    { id: 'mv-move', emoji: '🚶', title: 'Рух', items: ['direction', 'obstacles', 'moveverbs'] },
    { id: 'mv-talk', emoji: '💬', title: 'У розмові', items: ['asking', 'route', 'traps'] }
  ],
  TOPICS: [WHERE, PRECISE, DIRECTION, OBSTACLES, MOVEVERBS, ASKING, ROUTE, TRAPS],
  SCENES: SCENES
};
})();
