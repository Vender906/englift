/* EngLift — дані тренажера «choice» (перенесено з choice-clarification-trainer.html). Вантажиться лише у своєму розділі. */
window.PHRASE_DATA = window.PHRASE_DATA || {};
window.PHRASE_DATA["choice"] = (function () {
const CATS = {
  choice:      { emoji:"🎲", label:"Choice — вибір",             desc:"питання «яке з?», «який тип?»" },
  amount:      { emoji:"📊", label:"Amount — кількість",          desc:"how much / how many / how long" },
  preference:  { emoji:"⚖️", label:"Preference — перевага",       desc:"«що волієш?», would you rather" },
  recommend:   { emoji:"💡", label:"Recommendation — порада",     desc:"«що порадиш?», any suggestions" },
  clarify:     { emoji:"🔍", label:"Clarification — уточнення",   desc:"«що маєш на увазі?», like what?" },
  confirm:     { emoji:"✅", label:"Confirmation — підтвердження", desc:"«ти маєш на увазі...?», so you're saying" },
  ans_choice:  { emoji:"🎯", label:"Answer — вибір",              desc:"«цей», «синій», «обидва», «жоден»" },
  ans_hedge:   { emoji:"🌫️", label:"Answer — ухилення",           desc:"«залежить», «важко сказати»" },
};
const PHRASES = [
  // ============= CHOICE (Questions) =============
  { type:"q", cat:"choice", phrase:"Which one?", uk:"який з них / котрий?", emoji:"🎲", lvl:"A1", reg:"neutral",
    when:"Найкоротший спосіб спитати про вибір з кількох предметів, які бачите обидва.",
    examples:[
      { en:"— I got two shirts. — <b>Which one</b> do you like better?", uk:"— Купив дві сорочки. — Яка тобі більше подобається?" },
      { en:"<b>Which one</b> is yours?", uk:"Котра твоя?" },
      { en:"— Pick a card. — <b>Which one</b>?", uk:"— Обери карту. — Яку?" },
    ],
    vs:"⚠️ <b>«Which» vs «What»</b>: WHICH — коли є обмежений вибір (2-5 варіантів перед очима). WHAT — коли можливостей багато («What color?» — з тисяч кольорів).",
    tip:"💡 Ніколи не забувай <b>«one»</b>! «Which do you like?» звучить обірвано. Додай one — і речення стає повним." },

  { type:"q", cat:"choice", phrase:"Which of these ___?", uk:"який з цих ___?", emoji:"👆", lvl:"A2", reg:"neutral",
    when:"Коли вказуєш на групу предметів. Показуєш пальцем — і питаєш.",
    examples:[
      { en:"<b>Which of these</b> is yours?", uk:"Який з цих твій?" },
      { en:"<b>Which of these</b> books have you read?", uk:"Яку з цих книг ти читав?" },
    ] },

  { type:"q", cat:"choice", phrase:"What kind of ___?", uk:"який тип / який саме ___?", emoji:"🎯", lvl:"A2", reg:"neutral",
    when:"Уточнюєш категорію / підтип чогось. «Що за X?»",
    examples:[
      { en:"— I want coffee. — <b>What kind of</b> coffee?", uk:"— Я хочу каву. — Яку саме каву?" },
      { en:"<b>What kind of</b> music do you like?", uk:"Яку музику ти любиш?" },
      { en:"<b>What kind of</b> job are you looking for?", uk:"Яку роботу ти шукаєш?" },
    ],
    vs:"⚠️ Синоніми: <b>What kind of / What sort of / What type of</b> — практично те саме. «Sort» частіше в британському.",
    tip:"⚠️ Не забувай <b>«of»</b>! «What kind coffee?» — груба помилка." },

  { type:"q", cat:"choice", phrase:"Which one is ___ (better/cheaper/yours)?", uk:"який ___ (кращий/дешевший/твій)?", emoji:"⚖️", lvl:"A2", reg:"neutral",
    when:"Питання про порівняння / приналежність в межах групи.",
    examples:[
      { en:"<b>Which one is</b> better?", uk:"Який кращий?" },
      { en:"<b>Which one is</b> cheaper?", uk:"Який дешевший?" },
      { en:"<b>Which one is</b> yours?", uk:"Який твій?" },
    ] },

  { type:"q", cat:"choice", phrase:"What about ___?", uk:"а як щодо ___?", emoji:"💭", lvl:"A2", reg:"casual",
    when:"Пропонуєш альтернативу або запитуєш про новий варіант.",
    examples:[
      { en:"— I don't like sushi. — <b>What about</b> pizza?", uk:"— Не люблю суші. — А піцу?" },
      { en:"<b>What about</b> Friday night?", uk:"А як щодо п'ятниці ввечері?" },
    ] },

  { type:"q", cat:"choice", phrase:"Any preference?", uk:"є переваги? / щось конкретне?", emoji:"🤷", lvl:"B1", reg:"casual",
    when:"Ввічливо запитуєш, чи є в людини конкретний вибір.",
    examples:[
      { en:"— I can pick you up at 6 or 7. <b>Any preference</b>?", uk:"— Заберу тебе о 6 чи 7. Як тобі краще?" },
      { en:"— Let's watch a film. <b>Any preference</b>?", uk:"— Дивимось фільм. Що б хотів?" },
    ] },

  // ============= AMOUNT =============
  { type:"q", cat:"amount", phrase:"How much ___? (uncount)", uk:"скільки ___? (незлічуване)", emoji:"💰", lvl:"A1", reg:"neutral",
    when:"⚠️ HOW MUCH — для НЕзлічуваного (money, sugar, time). Також ціна.",
    examples:[
      { en:"<b>How much</b> is it?", uk:"Скільки коштує?" },
      { en:"<b>How much</b> sugar?", uk:"Скільки цукру?" },
      { en:"<b>How much</b> time do we have?", uk:"Скільки в нас часу?" },
    ],
    vs:"⚠️ <b>How much (uncountable) vs How many (countable)</b>: «How much money», але «How many dollars».",
    tip:"💡 «How much?» без іменника — завжди про ціну." },

  { type:"q", cat:"amount", phrase:"How many ___? (count)", uk:"скільки ___? (злічуване)", emoji:"🔢", lvl:"A1", reg:"neutral",
    when:"HOW MANY — для злічуваного (people, books, times).",
    examples:[
      { en:"<b>How many</b> people are coming?", uk:"Скільки людей прийде?" },
      { en:"<b>How many</b> times have you seen this?", uk:"Скільки разів ти це бачив?" },
      { en:"<b>How many</b> would you like?", uk:"Скільки б ти хотів?" },
    ] },

  { type:"q", cat:"amount", phrase:"How long ___?", uk:"як довго / скільки часу ___?", emoji:"⏳", lvl:"A2", reg:"neutral",
    when:"Про тривалість — часу, дороги, події.",
    examples:[
      { en:"<b>How long</b> does it take?", uk:"Скільки часу це займає?" },
      { en:"<b>How long</b> have you been here?", uk:"Скільки часу ти вже тут?" },
      { en:"<b>How long</b> is the film?", uk:"Скільки триває фільм?" },
    ] },

  { type:"q", cat:"amount", phrase:"How often ___?", uk:"як часто ___?", emoji:"🔁", lvl:"A2", reg:"neutral",
    when:"Частота дії.",
    examples:[
      { en:"<b>How often</b> do you go to the gym?", uk:"Як часто ходиш у зал?" },
      { en:"<b>How often</b> does the bus come?", uk:"Як часто ходить автобус?" },
    ] },

  { type:"q", cat:"amount", phrase:"How far ___?", uk:"як далеко ___?", emoji:"📏", lvl:"A2", reg:"neutral",
    when:"Про відстань.",
    examples:[
      { en:"<b>How far</b> is the station?", uk:"Як далеко станція?" },
      { en:"<b>How far</b> is it from here?", uk:"Як далеко це звідси?" },
    ] },

  // ============= PREFERENCE (Questions) =============
  { type:"q", cat:"preference", phrase:"Would you rather ___ or ___?", uk:"ти б краще ___ чи ___?", emoji:"⚖️", lvl:"B1", reg:"neutral",
    when:"Пропонуєш вибір між двома варіантами. ⚠️ Після «rather» — V1 БЕЗ to!",
    examples:[
      { en:"<b>Would you rather</b> stay in or go out?", uk:"Ти б краще лишився вдома чи пішов кудись?" },
      { en:"<b>Would you rather</b> have tea or coffee?", uk:"Тобі краще чай чи кава?" },
      { en:"<b>Would you rather</b> live in the city or the country?", uk:"Ти б краще жив у місті чи в селі?" },
    ] },

  { type:"q", cat:"preference", phrase:"Do you prefer ___ or ___?", uk:"ти волієш ___ чи ___?", emoji:"💜", lvl:"A2", reg:"neutral",
    when:"Питання про загальну перевагу. Часто про смаки.",
    examples:[
      { en:"<b>Do you prefer</b> tea or coffee?", uk:"Ти волієш чай чи каву?" },
      { en:"<b>Do you prefer</b> cats or dogs?", uk:"Ти любиш котів чи собак?" },
    ],
    vs:"⚠️ <b>«Would you rather» vs «Do you prefer»</b>: «Rather» — про <b>цю ситуацію зараз</b>. «Prefer» — про <b>загальний смак</b>." },

  { type:"q", cat:"preference", phrase:"Are you a ___ person or a ___ person?", uk:"ти більше ___ чи ___?", emoji:"🎭", lvl:"B1", reg:"casual",
    when:"Casual — питання про тип особистості (morning/night, cat/dog).",
    examples:[
      { en:"<b>Are you a</b> morning <b>person or a</b> night <b>person</b>?", uk:"Ти більше жайворонок чи сова?" },
      { en:"<b>Are you a</b> cat <b>person or a</b> dog <b>person</b>?", uk:"Ти любиш більше котів чи собак?" },
    ] },

  { type:"q", cat:"preference", phrase:"What would you go for?", uk:"на що ти б обрав / зупинився?", emoji:"🎯", lvl:"B1", reg:"casual",
    when:"Casual синонім до «What would you choose?». «Go for» = обрати.",
    examples:[
      { en:"— The salad or the pasta? <b>What would you go for</b>?", uk:"— Салат чи паста? На що б ти зупинився?" },
    ] },

  // ============= RECOMMENDATION =============
  { type:"q", cat:"recommend", phrase:"What do you recommend?", uk:"що порадиш / рекомендуєш?", emoji:"💡", lvl:"A2", reg:"neutral",
    when:"Універсальний спосіб попросити пораду. В ресторані, магазині, при виборі.",
    examples:[
      { en:"<b>What do you recommend</b>?", uk:"Що порадиш?" },
      { en:"<b>What do you recommend</b> from the menu?", uk:"Що з меню порадиш?" },
    ] },

  { type:"q", cat:"recommend", phrase:"Any suggestions?", uk:"є ідеї / пропозиції?", emoji:"💭", lvl:"A2", reg:"casual",
    when:"Просто просиш ідеї / варіанти.",
    examples:[
      { en:"— I need a gift for my mom. <b>Any suggestions</b>?", uk:"— Треба подарунок мамі. Є ідеї?" },
      { en:"<b>Any suggestions</b> for a good restaurant?", uk:"Порадиш добрий ресторан?" },
    ] },

  { type:"q", cat:"recommend", phrase:"What's good here?", uk:"що тут смачне / хороше?", emoji:"🍴", lvl:"A2", reg:"casual",
    when:"Класичне в ресторані/кафе — просиш «фішки закладу».",
    examples:[
      { en:"<b>What's good here</b>?", uk:"Що тут смачне?" },
      { en:"— <b>What's good here</b>? — The burger is amazing.", uk:"— Що тут добре? — Бургер супер." },
    ] },

  { type:"q", cat:"recommend", phrase:"Which one would you recommend?", uk:"який з них ти б порадив?", emoji:"🎯", lvl:"B1", reg:"neutral",
    when:"Уточнюєш пораду для вибору з групи.",
    examples:[
      { en:"— These two phones are similar. <b>Which one would you recommend</b>?", uk:"— Ці два телефони схожі. Який ти б порадив?" },
    ] },

  { type:"q", cat:"recommend", phrase:"Have you got any ___ in mind?", uk:"маєш якийсь ___ на думці?", emoji:"🧠", lvl:"B1", reg:"neutral",
    when:"Питаєш, чи є в людини конкретна ідея / варіант.",
    examples:[
      { en:"<b>Have you got any</b> restaurants <b>in mind</b>?", uk:"Маєш якісь ресторани на думці?" },
      { en:"<b>Have you got any</b> ideas <b>in mind</b>?", uk:"Маєш якісь ідеї?" },
    ] },

  // ============= CLARIFICATION =============
  { type:"q", cat:"clarify", phrase:"What do you mean?", uk:"що ти маєш на увазі?", emoji:"🔍", lvl:"A2", reg:"neutral",
    when:"Найчастіше уточнення. ⚠️ Не «What means?» — це помилка.",
    examples:[
      { en:"<b>What do you mean</b>?", uk:"Що ти маєш на увазі?" },
      { en:"<b>What do you mean</b> by that?", uk:"Що ти маєш на увазі під цим?" },
      { en:"<b>What do you mean</b>, «no»?", uk:"Тобто як «ні»?" },
    ],
    tip:"⚠️ Правильна структура: <b>What DO YOU MEAN</b> (не «What means this»). У пасивному: «What does this mean?» = «Що це значить?»" },

  { type:"q", cat:"clarify", phrase:"Like what?", uk:"наприклад?", emoji:"🎯", lvl:"A2", reg:"casual",
    when:"Просиш конкретний приклад. Дуже частий у розмові.",
    examples:[
      { en:"— I bought stuff. — <b>Like what</b>?", uk:"— Купив дещо. — Наприклад?" },
      { en:"— He said weird things. — <b>Like what</b>?", uk:"— Він казав дивні речі. — Такі як?" },
    ] },

  { type:"q", cat:"clarify", phrase:"How so? / In what way?", uk:"як так? / у якому сенсі?", emoji:"💭", lvl:"B1", reg:"neutral",
    when:"Просиш пояснити чому / у якому саме сенсі.",
    examples:[
      { en:"— He's different. — <b>How so</b>?", uk:"— Він інший. — Як саме?" },
      { en:"<b>In what way</b> is it better?", uk:"У якому сенсі це краще?" },
    ] },

  { type:"q", cat:"clarify", phrase:"Could you be more specific?", uk:"можеш конкретніше?", emoji:"🔬", lvl:"B1", reg:"formal",
    when:"Ввічливе прохання уточнити деталі. Часто на роботі.",
    examples:[
      { en:"<b>Could you be more specific</b>?", uk:"Можеш конкретніше?" },
      { en:"<b>Could you be more specific</b> about the timeline?", uk:"Уточни, будь ласка, про терміни." },
    ] },

  { type:"q", cat:"clarify", phrase:"Sorry, what was that?", uk:"вибач, що ти сказав?", emoji:"👂", lvl:"A2", reg:"casual",
    when:"Не почув / прогавив — просиш повторити.",
    examples:[
      { en:"<b>Sorry, what was that</b>?", uk:"Вибач, що ти сказав?" },
      { en:"<b>Sorry, what did you say</b>?", uk:"Пробач, що ти сказав?" },
    ],
    vs:"⚠️ Більш ввічливо: «Sorry, could you say that again?» У casual — «Sorry, what?» або «Come again?»" },

  { type:"q", cat:"clarify", phrase:"What exactly ___?", uk:"що саме ___?", emoji:"🎯", lvl:"B1", reg:"neutral",
    when:"Просиш точнішого пояснення.",
    examples:[
      { en:"<b>What exactly</b> do you want me to do?", uk:"Що саме ти хочеш, щоб я зробив?" },
      { en:"<b>What exactly</b> happened?", uk:"Що саме сталось?" },
    ] },

  // ============= CONFIRMATION =============
  { type:"q", cat:"confirm", phrase:"You mean ___?", uk:"ти маєш на увазі ___?", emoji:"✅", lvl:"A2", reg:"casual",
    when:"Переперевіряєш свою інтерпретацію.",
    examples:[
      { en:"— The meeting is cancelled. — <b>You mean</b> today's?", uk:"— Зустріч скасовано. — Тобто сьогоднішню?" },
      { en:"<b>You mean</b> John, right?", uk:"Тобто Джон, так?" },
    ] },

  { type:"q", cat:"confirm", phrase:"So you're saying ___?", uk:"тобто ти кажеш, що ___?", emoji:"💬", lvl:"B1", reg:"neutral",
    when:"Перед перефразуванням. Часто в дискусіях / спорах.",
    examples:[
      { en:"<b>So you're saying</b> it's my fault?", uk:"Ти хочеш сказати, що це моя вина?" },
      { en:"<b>So you're saying</b> we should wait?", uk:"Тобто нам треба чекати?" },
    ] },

  { type:"q", cat:"confirm", phrase:"Is that right?", uk:"це правильно?", emoji:"✔️", lvl:"A2", reg:"neutral",
    when:"Перевіряєш свою відповідь / розуміння.",
    examples:[
      { en:"So the total is $50. <b>Is that right</b>?", uk:"Отже всього $50. Правильно?" },
      { en:"You want the blue one. <b>Is that right</b>?", uk:"Ти хочеш синій. Правильно?" },
    ] },

  { type:"q", cat:"confirm", phrase:"Let me get this straight ___", uk:"дай я уточню (впорядкую) ___", emoji:"📋", lvl:"B2", reg:"neutral",
    when:"Перед впорядкованим повторенням складної інформації.",
    examples:[
      { en:"<b>Let me get this straight</b> — you quit AND moved in one week?", uk:"Дай уточню — ти звільнився ТА переїхав за один тиждень?" },
    ] },

  // ============= ANSWER - CHOICE =============
  { type:"a", cat:"ans_choice", phrase:"This one", uk:"цей / це", emoji:"👉", lvl:"A1", reg:"neutral",
    when:"⚠️ Найголовніша відповідь для вибору. Показуєш на близький предмет.",
    examples:[
      { en:"— Which one? — <b>This one</b>.", uk:"— Котрий? — Ось цей." },
      { en:"I'll take <b>this one</b>, please.", uk:"Я візьму цей, будь ласка." },
      { en:"<b>This one</b> is my favorite.", uk:"Цей мій улюблений." },
    ],
    tip:"⚠️ ЗАВЖДИ додавай <b>«one»</b>! «I'll take this» — обірвано. «I'll take this one» — правильно." },

  { type:"a", cat:"ans_choice", phrase:"That one", uk:"той / він (далі)", emoji:"👈", lvl:"A1", reg:"neutral",
    when:"Далекий предмет. THAT — фізично / далі в часі.",
    examples:[
      { en:"— Which shirt? — <b>That one</b>, the blue.", uk:"— Яку сорочку? — Ту, синю." },
      { en:"<b>That one</b> over there.", uk:"Той, отам." },
    ] },

  { type:"a", cat:"ans_choice", phrase:"The ___ one (blue/big/first)", uk:"той ___ (синій/великий/перший)", emoji:"🎨", lvl:"A1", reg:"neutral",
    when:"⚠️ Найкорисніший шаблон. Уточнюєш за характеристикою.",
    examples:[
      { en:"<b>The blue one</b>, please.", uk:"Синій, будь ласка." },
      { en:"<b>The big one</b>.", uk:"Великий." },
      { en:"<b>The first one</b>.", uk:"Перший." },
      { en:"<b>The one on the left</b>.", uk:"Той, що зліва." },
      { en:"<b>The one with the stripes</b>.", uk:"Той, що в смужку." },
    ],
    tip:"💡 Формула: <b>«The + adj + one»</b>. Без «one» звучить неповно. Множина: «the blue ones»." },

  { type:"a", cat:"ans_choice", phrase:"These ones / Those ones", uk:"ці / ті (мн.)", emoji:"👥", lvl:"A2", reg:"neutral",
    when:"Множина від this one / that one.",
    examples:[
      { en:"<b>These ones</b> look better.", uk:"Ці виглядають краще." },
      { en:"<b>Those ones</b> are on sale.", uk:"Ті на знижці." },
    ],
    tip:"⚠️ Британці кажуть «these ones / those ones». Американці часто просто «these / those». Обидва варіанти ок." },

  { type:"a", cat:"ans_choice", phrase:"Either (one)", uk:"будь-який (з двох)", emoji:"🔀", lvl:"A2", reg:"neutral",
    when:"Не важливо який — обидва підходять. ⚠️ Тільки з ДВОХ варіантів.",
    examples:[
      { en:"— Tea or coffee? — <b>Either</b>, thanks.", uk:"— Чай чи кава? — Будь-що, дякую." },
      { en:"<b>Either one</b> works for me.", uk:"Будь-який мені підходить." },
      { en:"<b>Either</b> is fine.", uk:"Будь-який годиться." },
    ] },

  { type:"a", cat:"ans_choice", phrase:"Neither", uk:"жоден (з двох)", emoji:"🚫", lvl:"A2", reg:"neutral",
    when:"Ні одного, ні другого. ⚠️ Тільки з ДВОХ.",
    examples:[
      { en:"— Tea or coffee? — <b>Neither</b>, thanks. Just water.", uk:"— Чай чи кава? — Ні того, ні того. Просто воду." },
      { en:"<b>Neither one</b> is what I wanted.", uk:"Жоден з них — не те, що я хотів." },
    ],
    vs:"⚠️ <b>Either = обидва підходять. Neither = жоден не підходить.</b>" },

  { type:"a", cat:"ans_choice", phrase:"Both", uk:"обидва", emoji:"✌️", lvl:"A1", reg:"neutral",
    when:"Обидва відразу.",
    examples:[
      { en:"— Which do you want? — <b>Both</b>, please!", uk:"— Що ти хочеш? — Обидва, будь ласка!" },
      { en:"I'll take <b>both</b>.", uk:"Візьму обидва." },
    ] },

  { type:"a", cat:"ans_choice", phrase:"I'll take / I'll go with ___", uk:"я візьму / зупинюсь на ___", emoji:"🎯", lvl:"A2", reg:"neutral",
    when:"Приймаєш рішення. «Go with» — casual синонім.",
    examples:[
      { en:"<b>I'll take</b> the blue one.", uk:"Я візьму синій." },
      { en:"<b>I'll go with</b> the salad.", uk:"Я візьму салат." },
      { en:"<b>I'll go with</b> your suggestion.", uk:"Прислухаюся до твоєї пропозиції." },
    ] },

  { type:"a", cat:"ans_choice", phrase:"A + noun, please", uk:"один ___, будь ласка", emoji:"☕", lvl:"A1", reg:"neutral",
    when:"Стандартна відповідь у кафе/магазині — називаєш конкретне.",
    examples:[
      { en:"— What can I get you? — <b>A cappuccino, please</b>.", uk:"— Що бажаєте? — Капучино, будь ласка." },
      { en:"<b>A small one, please</b>.", uk:"Маленький, будь ласка." },
    ] },

  { type:"a", cat:"ans_choice", phrase:"Just ___ (nothing else)", uk:"просто ___ (нічого більше)", emoji:"🎯", lvl:"A2", reg:"casual",
    when:"Обмежуєш замовлення / вибір.",
    examples:[
      { en:"<b>Just</b> a coffee, thanks.", uk:"Просто каву, дякую." },
      { en:"<b>Just</b> water for me.", uk:"Мені просто води." },
    ] },

  // ============= ANSWER - HEDGED =============
  { type:"a", cat:"ans_hedge", phrase:"It depends", uk:"залежить", emoji:"⚖️", lvl:"A2", reg:"neutral",
    when:"Універсальна «не однозначна» відповідь. Часто «It depends on ___».",
    examples:[
      { en:"— Will you come? — <b>It depends</b>.", uk:"— Ти прийдеш? — Залежить." },
      { en:"<b>It depends on</b> the price.", uk:"Залежить від ціни." },
      { en:"<b>It depends on</b> how you look at it.", uk:"Залежить, як подивитись." },
    ] },

  { type:"a", cat:"ans_hedge", phrase:"Hard to say", uk:"важко сказати", emoji:"🤔", lvl:"A2", reg:"neutral",
    when:"М'яко уникаєш категоричної відповіді.",
    examples:[
      { en:"<b>Hard to say</b> — I haven't decided yet.", uk:"Важко сказати — ще не вирішив." },
      { en:"— Which is better? — <b>Hard to say</b>, honestly.", uk:"— Що краще? — Чесно, важко сказати." },
    ] },

  { type:"a", cat:"ans_hedge", phrase:"I'm torn between X and Y", uk:"я вагаюсь між X і Y", emoji:"⚖️", lvl:"B1", reg:"neutral",
    when:"Не можеш обрати з двох. Емоційно.",
    examples:[
      { en:"<b>I'm torn between</b> the red and the blue.", uk:"Я вагаюся між червоним і синім." },
      { en:"<b>I'm torn between</b> two job offers.", uk:"Я не можу вибрати між двома пропозиціями." },
    ] },

  { type:"a", cat:"ans_hedge", phrase:"No preference", uk:"без переваг / без різниці", emoji:"🤷", lvl:"B1", reg:"neutral",
    when:"Формальніше за «either».",
    examples:[
      { en:"— Aisle or window? — <b>No preference</b>.", uk:"— Біля проходу чи вікна? — Без різниці." },
      { en:"I have <b>no preference</b> — you choose.", uk:"У мене немає переваг — обирай ти." },
    ] },

  { type:"a", cat:"ans_hedge", phrase:"I'd go with ___", uk:"я б обрав ___", emoji:"💭", lvl:"B1", reg:"casual",
    when:"М'яка порада без нав'язування. Casual.",
    examples:[
      { en:"<b>I'd go with</b> the pasta.", uk:"Я б обрав пасту." },
      { en:"<b>I'd go with</b> the second option.", uk:"Я б взяв другий варіант." },
    ] },

  { type:"a", cat:"ans_hedge", phrase:"Whatever you prefer / Whatever works", uk:"як тобі зручно / як буде", emoji:"🙌", lvl:"B1", reg:"casual",
    when:"Делегуєш вибір іншому — не хочеш вирішувати сам.",
    examples:[
      { en:"— Where to eat? — <b>Whatever you prefer</b>.", uk:"— Де їсти? — Де скажеш." },
      { en:"6 or 7? <b>Whatever works</b>.", uk:"6 чи 7? Як тобі зручно." },
    ] },

  { type:"a", cat:"ans_hedge", phrase:"Your call / Up to you", uk:"на твій розсуд / вирішуй ти", emoji:"👉", lvl:"B1", reg:"casual",
    when:"Casual, дружньо. Передаєш рішення іншому.",
    examples:[
      { en:"— Should we go? — <b>Your call</b>.", uk:"— Йдемо? — Тобі вирішувати." },
      { en:"— Which one? — <b>Up to you</b>.", uk:"— Який? — На твій розсуд." },
    ] },

  { type:"a", cat:"ans_hedge", phrase:"I can't decide", uk:"не можу вирішити", emoji:"😩", lvl:"A2", reg:"casual",
    when:"Чесно визнаєш, що не знаєш що обрати.",
    examples:[
      { en:"<b>I can't decide</b> — help me!", uk:"Не можу вирішити — допоможи!" },
      { en:"<b>I really can't decide</b>. They're both good.", uk:"Реально не можу вирішити. Обидва гарні." },
    ] },
];
const QA_PAIRS = [
  { q:"Which one do you want?", a:"This one, please.", cat:"choice", uk_q:"Який ти хочеш?", uk_a:"Ось цей, будь ласка." },
  { q:"Tea or coffee?", a:"Either works, thanks.", cat:"choice", uk_q:"Чай чи кава?", uk_a:"Будь-що годиться, дякую." },
  { q:"Which shirt do you like better?", a:"The blue one.", cat:"choice", uk_q:"Яка сорочка тобі більше подобається?", uk_a:"Синя." },
  { q:"What kind of music do you like?", a:"Mostly indie rock.", cat:"choice", uk_q:"Яку музику любиш?", uk_a:"Здебільшого інді-рок." },
  { q:"How much is this?", a:"$25.", cat:"amount", uk_q:"Скільки коштує?", uk_a:"25 доларів." },
  { q:"How many people are coming?", a:"About 10.", cat:"amount", uk_q:"Скільки людей прийде?", uk_a:"Близько 10." },
  { q:"How long does it take?", a:"About 2 hours.", cat:"amount", uk_q:"Скільки часу займає?", uk_a:"Близько 2 годин." },
  { q:"Would you rather stay in or go out?", a:"Stay in, definitely.", cat:"preference", uk_q:"Лишишся вдома чи підемо?", uk_a:"Лишусь вдома, точно." },
  { q:"Do you prefer cats or dogs?", a:"I'm a dog person.", cat:"preference", uk_q:"Ти любиш котів чи собак?", uk_a:"Я більше по собаках." },
  { q:"What do you recommend?", a:"The pasta is amazing here.", cat:"recommend", uk_q:"Що порадиш?", uk_a:"Тут паста чудова." },
  { q:"Any suggestions for a good film?", a:"Have you seen «Interstellar»?", cat:"recommend", uk_q:"Порадиш добрий фільм?", uk_a:"Бачив «Інтерстеллар»?" },
  { q:"What do you mean?", a:"Like, I don't want to explain it.", cat:"clarify", uk_q:"Що маєш на увазі?", uk_a:"Ну, я не хочу пояснювати." },
  { q:"Like what, for example?", a:"Like the way he talked to me.", cat:"clarify", uk_q:"Наприклад?", uk_a:"Наприклад, як він зі мною говорив." },
  { q:"So you're saying it's my fault?", a:"No, that's not what I meant.", cat:"confirm", uk_q:"Ти хочеш сказати, це моя вина?", uk_a:"Ні, я не це мав на увазі." },
  { q:"You mean today, right?", a:"Yeah, today at 5.", cat:"confirm", uk_q:"Тобто сьогодні, так?", uk_a:"Так, сьогодні о 5." },
  { q:"Which one, this or that?", a:"Neither, actually.", cat:"choice", uk_q:"Який, цей чи той?", uk_a:"Насправді жоден." },
  { q:"Aisle or window?", a:"No preference.", cat:"choice", uk_q:"Біля проходу чи вікна?", uk_a:"Без різниці." },
  { q:"What's good here?", a:"The burgers are their specialty.", cat:"recommend", uk_q:"Що тут смачне?", uk_a:"Бургери — їхня фішка." },
  { q:"Should we go with plan A or B?", a:"It depends on the budget.", cat:"preference", uk_q:"План А чи Б?", uk_a:"Залежить від бюджету." },
  { q:"Small, medium, or large?", a:"Medium, please.", cat:"choice", uk_q:"Малий, середній чи великий?", uk_a:"Середній, будь ласка." },
];
const SITUATIONS = [
  { ctx:"☕ Ти в кафе. Бариста каже: «What can I get you?»", scenario:"Хочеш замовити середній лате, нічого більше.", correct:"A medium latte, please. That's all.", distractors:["I'll take this one.","What do you recommend?","It depends."], uk:"Середній лате, будь ласка. Це все." },
  { ctx:"🛍️ У магазині одягу. Продавець показує два светри — синій і сірий.", scenario:"Показуєш, що хочеш синій.", correct:"The blue one, please.", distractors:["Either.","Neither.","How much?"], uk:"Синій, будь ласка." },
  { ctx:"💼 Колега пропонує зустріч о 3 або 4.", scenario:"Тобі однаково — обидва часи підходять.", correct:"Either works for me.", distractors:["This one.","No preference for the topic.","What kind of meeting?"], uk:"Мені будь-який час підходить." },
  { ctx:"🍕 Друг питає: «Pizza or sushi tonight?»", scenario:"Не хочеш ні одного, ні другого. Хочеш тайське.", correct:"Neither — how about Thai?", distractors:["Both, please.","That one.","What do you mean?"], uk:"Ні того, ні того — може тайське?" },
  { ctx:"👗 Подруга приміряла дві сукні і питає: «Which one looks better?»", scenario:"Ти справді не можеш обрати — вагаєшся.", correct:"I'm torn between them, honestly.", distractors:["The blue one.","How many do you have?","Like what?"], uk:"Чесно, вагаюся між ними." },
  { ctx:"🎬 Друг каже: «I saw a great movie yesterday.»", scenario:"Хочеш дізнатись, який саме жанр.", correct:"Oh cool, what kind?", distractors:["Which one is better?","How much was it?","Either works."], uk:"О, круто, який жанр?" },
  { ctx:"💼 Колега каже щось незрозуміле про новий процес.", scenario:"Просиш пояснити точніше.", correct:"Could you be more specific?", distractors:["No preference.","I'll take this one.","How often?"], uk:"Можеш конкретніше?" },
  { ctx:"🍽️ У ресторані питаєш офіціанта, що замовити.", scenario:"Хочеш просто пораду.", correct:"What do you recommend?", distractors:["This one, please.","How long does it take?","Neither, thanks."], uk:"Що порадите?" },
  { ctx:"🎁 Друг подарував тобі 2 книги і питає: «Which do you like more?»", scenario:"Обидві однаково подобаються.", correct:"Honestly, I love both!", distractors:["Neither, sorry.","It depends on the price.","What kind?"], uk:"Чесно, я обидві люблю!" },
  { ctx:"📅 Колега пропонує зустрітись у понеділок або вівторок.", scenario:"Тобі краще вівторок.", correct:"I'd go with Tuesday.", distractors:["Either or.","That's fine.","Both, please."], uk:"Я б обрав вівторок." },
  { ctx:"🎧 Друг питає: «Are you more into rock or pop?»", scenario:"Радше рок.", correct:"I'm more of a rock person.", distractors:["Which one?","How many songs?","Just water, thanks."], uk:"Я більше по року." },
  { ctx:"⏰ Хтось питає: «How long is the film?»", scenario:"Приблизно 2 години.", correct:"About 2 hours.", distractors:["This one.","It depends on you.","What kind?"], uk:"Близько 2 годин." },
  { ctx:"💬 Колега сказав: «We should rethink this.»", scenario:"Хочеш перевірити, чи правильно зрозумів.", correct:"So you're saying we should start over?", distractors:["Which one is better?","Both are fine.","How many people?"], uk:"Тобто ти кажеш, що треба почати заново?" },
  { ctx:"🛒 Продавець у магазині: «Which size would you like?»", scenario:"Хочеш маленький.", correct:"The small one, please.", distractors:["Both sizes.","It depends.","What kind of size?"], uk:"Маленький, будь ласка." },
  { ctx:"🍹 Друг питає: «Any preference for drinks?»", scenario:"Не маєш переваг.", correct:"No preference — you pick.", distractors:["That one.","Which one is better?","How much?"], uk:"Без різниці — обирай ти." },
];
const DIALOGUES = [
  {
    title:"☕ У кафе",
    parts:[
      { who:"them", text:"Hi! What can I get you?" },
      { who:"you", text:"Hi, ___ do you recommend?", correct:"what", options:["what","which","how","when"] },
      { who:"them", text:"The lattes are amazing." },
      { who:"you", text:"Sounds good. I'll ___ a large one, please.", correct:"take", options:["take","get","have it","make"] },
      { who:"them", text:"For here or to go?" },
      { who:"you", text:"For here, please. ___ have any cake today?", correct:"do you", options:["do you","have you","are you","you"] },
      { who:"them", text:"Yes, chocolate or lemon?" },
      { who:"you", text:"Hmm, ___ me?", correct:"which would you recommend", options:["which would you recommend","what kind","how much","either"], note:"Просиш рекомендацію з двох варіантів" },
      { who:"them", text:"The chocolate is our bestseller." },
      { who:"you", text:"OK, I'll ___ that.", correct:"go with", options:["go with","take of","have it","make"], note:"«I'll go with X» = я оберу X" },
    ],
    uk:"— Привіт! Що вам? — Привіт, що порадиш? — Латте у нас чудові. — Звучить добре. Візьму великий. — Тут чи з собою? — Тут. У вас є торт сьогодні? — Так, шоколадний чи лимонний? — Хм, який ти б порадив? — Шоколадний — наш бестселер. — Ок, візьму його."
  },
  {
    title:"🛍️ У магазині одягу",
    parts:[
      { who:"them", text:"Can I help you find something?" },
      { who:"you", text:"Yes, I'm looking at these two shirts. ___ one is on sale?", correct:"which", options:["which","what","how","that"] },
      { who:"them", text:"The blue one — 30% off." },
      { who:"you", text:"Nice. ___ do you have in the blue?", correct:"what sizes", options:["what sizes","how sizes","which color","how much"] },
      { who:"them", text:"Small, medium, and large." },
      { who:"you", text:"Do you have this in ___ size?", correct:"a bigger", options:["a bigger","more big","the biggest of","bigger a"] },
      { who:"them", text:"Yes, let me grab it. Anything else?" },
      { who:"you", text:"No, ___ all for now.", correct:"that's", options:["that's","it's","this is","there's"] },
    ],
    uk:"— Допомогти вам щось знайти? — Так, я дивлюся на дві сорочки. Яка на знижці? — Синя — 30%. — Круто. Які розміри в синій? — S, M, L. — А більший розмір є? — Так, зараз принесу. Ще щось? — Ні, це все поки."
  },
  {
    title:"🎬 Обираємо фільм",
    parts:[
      { who:"them", text:"Movie night! What are you in the mood for?" },
      { who:"you", text:"I'm not sure. ___ do you feel like?", correct:"what", options:["what","which","how","when"] },
      { who:"them", text:"Comedy or thriller?" },
      { who:"you", text:"Hmm, would you ___ a comedy or a thriller?", correct:"rather", options:["rather","prefer","like","choose"], note:"«Would you rather X or Y»" },
      { who:"them", text:"Comedy, definitely." },
      { who:"you", text:"OK, then. Any ___ in mind?", correct:"films", options:["films","film","kind","one"] },
      { who:"them", text:"How about the new one with Ryan Reynolds?" },
      { who:"you", text:"Great, ___ that one!", correct:"let's go with", options:["let's go with","take of","let's have","make"] },
    ],
    uk:"— Вечір фільмів! На що маєш настрій? — Не знаю. Тобі як? — Комедія чи трилер? — Що б ти обрав — комедію чи трилер? — Комедія, точно. — Окей. Якісь фільми на думці? — Може той новий з Раяном Рейнольдсом? — Круто, беремо цей!"
  },
  {
    title:"💼 На робочій нараді",
    parts:[
      { who:"them", text:"So, which option makes more sense?" },
      { who:"you", text:"Honestly, ___ — both have pros and cons.", correct:"it depends", options:["it depends","that's it","this one","how many"] },
      { who:"them", text:"OK, but if you had to pick?" },
      { who:"you", text:"I'd ___ option B, mainly because of the timeline.", correct:"go with", options:["go with","take of","have","make"] },
      { who:"them", text:"So you're ___ we should drop A entirely?", correct:"saying", options:["saying","meaning","telling","asking"] },
      { who:"you", text:"Not exactly. ___ way, we should discuss it more.", correct:"either", options:["either","neither","both","any"], note:"«Either way» = «так чи інакше»" },
      { who:"them", text:"Fair enough. Let's meet tomorrow." },
    ],
    uk:"— Отже, який варіант має більше сенсу? — Чесно, залежить — в обох є плюси і мінуси. — Ок, але якби мусив вибрати? — Я б обрав варіант Б, головно через терміни. — Тобто ти кажеш, що А треба взагалі відкинути? — Не зовсім. Так чи інакше, треба ще обговорити. — Справедливо. Зустріньмось завтра."
  },
  {
    title:"👗 Друг радиться перед побаченням",
    parts:[
      { who:"them", text:"Help me pick — this shirt or that one?" },
      { who:"you", text:"Hmm... ___ one is nicer?", correct:"which", options:["which","what","how","that"] },
      { who:"them", text:"The blue one is more casual, the black is fancier." },
      { who:"you", text:"Where are you going, ___?", correct:"exactly", options:["exactly","really","truly","surely"], note:"«What exactly / where exactly» = «що/де саме»" },
      { who:"them", text:"A nice Italian place." },
      { who:"you", text:"Then I'd ___ the black one. More stylish.", correct:"go with", options:["go with","take of","make","have"] },
      { who:"them", text:"You mean the black looks better?" },
      { who:"you", text:"Yeah, ___!", correct:"exactly", options:["exactly","either","neither","depends"] },
    ],
    uk:"— Допоможи вибрати — ця сорочка чи та? — Хм... яка гарніша? — Синя більш кежуал, чорна — офіційніша. — А куди ти йдеш, конкретно? — У гарний італійський ресторан. — Тоді я б обрав чорну. Стильніша. — Тобто чорна виглядає краще? — Так, саме так!"
  },
];
const TR_QS = [
  { uk:"Який ти хочеш?", answers:["Which one do you want","Which one would you like"], hint:"вибір — Which one" },
  { uk:"Синій, будь ласка.", answers:["The blue one please","The blue one, please"], hint:"відповідь з «the ___ one»" },
  { uk:"Що маєш на увазі?", answers:["What do you mean","What do you mean by that"], hint:"уточнення думки" },
  { uk:"Наприклад?", answers:["Like what","Such as what"], hint:"просиш конкретний приклад" },
  { uk:"Що ти порадиш?", answers:["What do you recommend","What would you recommend"], hint:"рекомендація" },
  { uk:"Тут смачно щось?", answers:["What's good here","Is anything good here"], hint:"в кафе — фірмове" },
  { uk:"Залежить.", answers:["It depends","That depends"], hint:"ухильна відповідь" },
  { uk:"Ти б краще чай чи каву?", answers:["Would you rather have tea or coffee","Would you rather tea or coffee","Would you rather drink tea or coffee"], hint:"переваги — would you rather" },
  { uk:"Обидва підходять / будь-який.", answers:["Either works","Either one works","Either is fine","Either one is fine"], hint:"дві опції — обидві ок" },
  { uk:"Жоден.", answers:["Neither","Neither one","Neither, thanks"], hint:"дві опції — жодна не підходить" },
  { uk:"Скільки коштує?", answers:["How much is it","How much does it cost"], hint:"ціна" },
  { uk:"Скільки часу займає?", answers:["How long does it take","How long will it take"], hint:"тривалість" },
  { uk:"Тобто ти кажеш, що це моя вина?", answers:["So you're saying it's my fault","So you are saying it's my fault"], hint:"підтвердження перефразуванням" },
  { uk:"Я візьму цей.", answers:["I'll take this one","I'll get this one","I will take this one"], hint:"вибір — this one" },
  { uk:"Тобі вирішувати.", answers:["Your call","Up to you","It's up to you"], hint:"передаєш вибір іншому" },
];

const MARKERS = PHRASES.map(p => ({ name: p.phrase, uk: p.uk, emoji: p.emoji, cat: p.cat, lvl: p.lvl, reg: p.reg, when: p.when, examples: p.examples, tip: p.tip, vs: p.vs, type: p.type }));
const INTRO = "<div class=\"intro-box pink\">\n      <h3>🎯 Що це за тема і чому вона так важлива?</h3>\n      <p>Кожен день ти <b>щось обираєш або уточнюєш</b> — в кафе, магазині, на роботі, з друзями. Українською ти це робиш автоматично. Англійською — застигаєш, бо не знаєш готових фраз.</p>\n      <p>Цей тренажер — не про граматику. Це про <b>сотні реальних мікро-моментів</b>: «Яку каву?», «Цей чи той?», «Що ти маєш на увазі?», «Може порадиш?».</p>\n\n      <div class=\"qa-demo\">\n        <div class=\"qa-side q\">\n          <h4>❓ Питання (Question)</h4>\n          <div class=\"item\">— <b>Which one</b> do you like?</div>\n          <div class=\"item\">— <b>What kind</b> of coffee?</div>\n          <div class=\"item\">— <b>Would you rather</b> tea or coffee?</div>\n          <div class=\"item\">— <b>What do you mean</b>?</div>\n        </div>\n        <div class=\"qa-side a\">\n          <h4>✅ Відповідь (Answer)</h4>\n          <div class=\"item\">— <b>This one</b>. / <b>The blue one</b>.</div>\n          <div class=\"item\">— <b>A cappuccino</b>, please.</div>\n          <div class=\"item\">— <b>Either</b> works. / <b>Neither</b>, thanks.</div>\n          <div class=\"item\">— <b>Like what</b>? Give an example.</div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"intro-box red\">\n      <h3>🚫 Топ-помилки українців у виборі</h3>\n      <div class=\"compare-grid\">\n        <div class=\"compare-box bad\">\n          <h4>❌ Часті помилки:</h4>\n          <p>«<b>Which you like?</b>» → бракує «do»</p>\n          <p>«<b>What kind coffee?</b>» → бракує «of»</p>\n          <p>«<b>I take this.</b>» → ідіоматично: «I'll take this one»</p>\n          <p>«<b>What means this?</b>» → калька!</p>\n          <p>«<b>Either is good.</b>» без контексту → незрозуміло</p>\n        </div>\n        <div class=\"compare-box good\">\n          <h4>✅ Правильно:</h4>\n          <p>«Which one <b>do</b> you like?»</p>\n          <p>«What kind <b>of</b> coffee?»</p>\n          <p>«I'll take <b>this one</b>.» (з «one»!)</p>\n          <p>«What does <b>this</b> mean?»</p>\n          <p>«<b>Either</b> works for me.» / «<b>Either one</b> is fine.»</p>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"intro-box blue\">\n      <h3>💎 Секрет: маленьке слово <b>«ONE»</b> — король відповідей</h3>\n      <p>Українці постійно забувають «<b>one</b>» в кінці — і звучать не по-англійськи. Це найважливіший habit змінити:</p>\n      <ul>\n        <li>❌ «Which you like?» → ✅ «<b>Which one</b> do you like?»</li>\n        <li>❌ «I want this.» → ✅ «I want <b>this one</b>.»</li>\n        <li>❌ «The blue.» → ✅ «<b>The blue one</b>.»</li>\n        <li>❌ «The big.» → ✅ «<b>The big one</b>.»</li>\n        <li>❌ «Which better?» → ✅ «<b>Which one</b> is better?»</li>\n      </ul>\n      <p><b>Правило:</b> коли обираєш з групи предметів — після this/that/the + adj майже завжди має бути <b>«one»</b>. Мозок англійця це очікує.</p>\n      <p>Множина: <b>«these ones / those ones / the blue ones»</b>.</p>\n    </div>\n\n    <div class=\"intro-box green\">\n      <h3>🧠 8 функцій — карта тренажера</h3>\n      <ul>\n        <li>🎲 <b>Choice</b> — Which one? / What kind of? / Which of these?</li>\n        <li>📊 <b>Amount</b> — How much? / How many? / How long?</li>\n        <li>⚖️ <b>Preference</b> — Would you rather? / Do you prefer?</li>\n        <li>💡 <b>Recommendation</b> — What do you recommend? / Any suggestions?</li>\n        <li>🔍 <b>Clarification</b> — What do you mean? / Like what?</li>\n        <li>✅ <b>Confirmation</b> — You mean...? / So you're saying...?</li>\n        <li>🎯 <b>Answer — Choice</b> — This one / The blue one / Either / Both / I'll take...</li>\n        <li>🌫️ <b>Answer — Hedged</b> — It depends / I'm torn / Hard to say / No preference</li>\n      </ul>\n    </div>\n\n    <div class=\"intro-box\">\n      <h3>📅 План: 1-2 тижні до вільного вибору</h3>\n      <p><b>Дн 1-2:</b> Питання про вибір (Which/What kind) + прості відповіді (This one/Either).</p>\n      <p><b>Дн 3-4:</b> Amount + Preference (would you rather).</p>\n      <p><b>Дн 5-6:</b> Clarification + Confirmation (важливо для розмови на роботі).</p>\n      <p><b>Дн 7:</b> Recommendation + Hedged answers.</p>\n      <p><b>Дн 8-10:</b> Роль-плей 5 діалогів + Mix.</p>\n    </div>\n\n    <h3 style=\"margin-bottom:10px;color:#831843\">🤔 8 категорій — клацай для огляду:</h3>\n    <div class=\"cat-overview\"></div>";
const META = {"title":"🤔 Choice & Clarification — питання вибору й уточнення","lead":"Тренажер питань <b>«Which one? / What kind?»</b> і відповідей <b>«This one / The blue one / Either / Neither»</b>. Плюс уточнення (What do you mean?), рекомендації (What's good here?) і згода/незгода."};
return { CATS, MARKERS, QA_PAIRS, SITUATIONS, DIALOGUES, TR_QS, INTRO: INTRO, META: META };
})();
