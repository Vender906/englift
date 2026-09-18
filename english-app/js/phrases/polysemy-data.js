/* EngLift — дані тренажера «polysemy» (перенесено з polysemy-verbs-trainer.html). Вантажиться лише у своєму розділі. */
window.PHRASE_DATA = window.PHRASE_DATA || {};
window.PHRASE_DATA["polysemy"] = (function () {
const VERBS = {
  get:   { emoji:"🎁", forms:"get / got / gotten (US) / got (UK)",   tag:"найуніверсальніше" },
  take:  { emoji:"🤲", forms:"take / took / taken",                  tag:"приймати / забирати" },
  have:  { emoji:"🤝", forms:"have / had / had",                     tag:"мати / переживати" },
  make:  { emoji:"🔨", forms:"make / made / made",                   tag:"створювати / змушувати" },
  go:    { emoji:"🚶", forms:"go / went / gone",                     tag:"рух / процес" },
  run:   { emoji:"🏃", forms:"run / ran / run",                      tag:"бігти / керувати" },
  break: { emoji:"💥", forms:"break / broke / broken",               tag:"ламати / порушувати" },
  put:   { emoji:"👇", forms:"put / put / put",                      tag:"класти / формулювати" },
};
const CATS = {
  obtain:    { label:"🎁 OBTAIN — отримати"             },
  become:    { label:"🔄 BECOME — стати (зміна стану)"   },
  arrive:    { label:"🎯 ARRIVE — дістатись"            },
  understand:{ label:"💡 UNDERSTAND — зрозуміти"         },
  catch:     { label:"🤒 CATCH — підхопити (хворобу)"   },
  carry:     { label:"📦 CARRY — нести / везти"          },
  consume:   { label:"🍴 CONSUME — споживати"           },
  experience:{ label:"💭 EXPERIENCE — переживати"        },
  operate:   { label:"⚙️ OPERATE — керувати / працювати" },
  cause:     { label:"⚡ CAUSE — змушувати"              },
  fixed:     { label:"💎 FIXED — стійка колокація"      },
  phrasal:   { label:"🔗 PHRASAL — фразове значення"     },
  motion:    { label:"🏃 MOTION — рух / напрям"          },
  break_st:  { label:"💥 BREAK STATE — порушити/зламати" },
  pause:     { label:"⏸️ PAUSE — перерва"                },
  create:    { label:"🔨 CREATE — створити"              },
  earn:      { label:"💰 EARN — заробляти"               },
  reach:     { label:"🎯 REACH — досягти / встигнути"    },
  place:     { label:"📍 PLACE — розмістити"             },
  express:   { label:"💬 EXPRESS — виразити словами"     },
  modal:     { label:"⚖️ MODAL — обов'язок (have to)"   },
  passive:   { label:"🔁 PASSIVE — пасивне зі значенням" },
};
const MEANINGS = [
  // ============= GET =============
  { verb:"get", label:"get sth", uk:"отримати щось", emoji:"🎁", cat:"obtain", lvl:"A1", freq:5,
    examples:[
      { en:"I <b>got</b> a new phone for my birthday.", uk:"Я отримав новий телефон на день народження." },
      { en:"Did you <b>get</b> my email?", uk:"Ти отримав мого мейла?" },
      { en:"She <b>got</b> the job!", uk:"Вона отримала роботу!" },
    ],
    collocations:["get a job","get an email","get a present","get a message","get a haircut"] },

  { en:"get + adj", verb:"get", label:"get + adj", uk:"стати яким (зміна стану)", emoji:"🔄", cat:"become", lvl:"A1", freq:5,
    examples:[
      { en:"It's <b>getting</b> dark.", uk:"Темніє." },
      { en:"I'm <b>getting</b> tired.", uk:"Я втомлююсь." },
      { en:"Don't <b>get</b> angry.", uk:"Не злись." },
      { en:"He <b>got</b> rich quickly.", uk:"Він швидко розбагатів." },
    ],
    collocations:["get tired","get cold","get hungry","get bored","get nervous","get better","get older"],
    tip:"⚠️ Найчастіше значення в розмові. «Become» — формальне; «get» — як кажуть нейтиви." },

  { verb:"get", label:"get + place", uk:"дістатися кудись", emoji:"🎯", cat:"arrive", lvl:"A2", freq:5,
    examples:[
      { en:"What time did you <b>get</b> home?", uk:"О котрій ти дістався додому?" },
      { en:"How do I <b>get</b> to the station?", uk:"Як мені дістатися станції?" },
      { en:"We <b>got</b> there at 9.", uk:"Ми дісталися туди о 9." },
    ],
    collocations:["get home","get to work","get there","get back"] },

  { verb:"get", label:"get it", uk:"зрозуміти (розкусити)", emoji:"💡", cat:"understand", lvl:"A2", freq:5,
    examples:[
      { en:"I don't <b>get</b> it.", uk:"Я не розумію." },
      { en:"Oh, now I <b>get</b> it!", uk:"А, тепер дійшло!" },
      { en:"Did you <b>get</b> the joke?", uk:"Ти зрозумів жарт?" },
    ],
    collocations:["get it","get the point","get the joke","get the idea"],
    tip:"⚠️ «I don't understand» — це чистий підручник. Нейтиви кажуть «I don't get it» у 90% випадків." },

  { verb:"get", label:"get sick / a cold", uk:"захворіти / підхопити", emoji:"🤒", cat:"catch", lvl:"A2", freq:4,
    examples:[
      { en:"I <b>got</b> a cold last week.", uk:"Я підхопив застуду минулого тижня." },
      { en:"Don't <b>get</b> sick before the wedding!", uk:"Не захворій до весілля!" },
      { en:"He <b>got</b> the flu.", uk:"Він захворів на грип." },
    ],
    collocations:["get sick","get a cold","get the flu","get cancer"] },

  { verb:"get", label:"get sb sth", uk:"принести / придбати комусь", emoji:"📦", cat:"carry", lvl:"A2", freq:4,
    examples:[
      { en:"Can you <b>get</b> me a coffee?", uk:"Можеш принести мені каву?" },
      { en:"I'll <b>get</b> you a chair.", uk:"Я тобі стільця принесу." },
      { en:"<b>Get</b> me the file, please.", uk:"Принеси мені файл, будь ласка." },
    ],
    collocations:["get me a drink","get you a chair"] },

  { verb:"get", label:"get sb to do sth", uk:"змусити когось щось зробити", emoji:"⚡", cat:"cause", lvl:"B1", freq:3,
    examples:[
      { en:"I <b>got</b> him to apologize.", uk:"Я змусив його вибачитись." },
      { en:"How did you <b>get</b> her to agree?", uk:"Як ти її змусив погодитись?" },
    ],
    tip:"⚠️ Це <b>causative</b>: get + sb + to + V1. Не плутай з «make sb do» (без to)." },

  { verb:"get", label:"get + V3 (passive)", uk:"бути зробленим (пасивне)", emoji:"🔁", cat:"passive", lvl:"B1", freq:4,
    examples:[
      { en:"He <b>got</b> fired.", uk:"Його звільнили." },
      { en:"I <b>got</b> stuck in traffic.", uk:"Я застряг у пробці." },
      { en:"They <b>got</b> married last year.", uk:"Вони одружились минулого року." },
    ],
    collocations:["get fired","get hired","get married","get divorced","get stuck","get lost","get hurt"],
    tip:"💡 Casual alternative до «be + V3». «He got fired» звучить природніше за «he was fired» в розмові." },

  // ============= TAKE =============
  { verb:"take", label:"take sth", uk:"взяти щось", emoji:"🤲", cat:"obtain", lvl:"A1", freq:5,
    examples:[
      { en:"<b>Take</b> this book.", uk:"Візьми цю книгу." },
      { en:"I'll <b>take</b> the red one.", uk:"Я візьму червоний." },
      { en:"Don't <b>take</b> my phone!", uk:"Не бери мого телефона!" },
    ],
    collocations:["take a book","take a seat"] },

  { verb:"take", label:"take sb/sth somewhere", uk:"відвезти / відвести", emoji:"📦", cat:"carry", lvl:"A1", freq:5,
    examples:[
      { en:"I'll <b>take</b> you to the airport.", uk:"Я відвезу тебе в аеропорт." },
      { en:"<b>Take</b> the kids to school.", uk:"Відведи дітей до школи." },
      { en:"She <b>took</b> me home.", uk:"Вона відвезла мене додому." },
    ],
    collocations:["take sb home","take sb to school","take sth there"] },

  { verb:"take", label:"it takes (time)", uk:"займати (часу/зусиль)", emoji:"⏳", cat:"experience", lvl:"A2", freq:5,
    examples:[
      { en:"It <b>takes</b> 2 hours by car.", uk:"Це займає 2 години на машині." },
      { en:"It <b>takes</b> time to learn.", uk:"Потрібен час, щоб вчитися." },
      { en:"How long does it <b>take</b>?", uk:"Скільки часу це займає?" },
    ],
    collocations:["it takes time","it takes 5 minutes","take patience"] },

  { verb:"take", label:"take a + noun", uk:"зробити (стандартну дію)", emoji:"💎", cat:"fixed", lvl:"A1", freq:5,
    examples:[
      { en:"I need to <b>take</b> a shower.", uk:"Мені треба прийняти душ." },
      { en:"Let's <b>take</b> a break.", uk:"Зробімо перерву." },
      { en:"<b>Take</b> a deep breath.", uk:"Зроби глибокий вдих." },
      { en:"She <b>took</b> a photo.", uk:"Вона зробила фото." },
    ],
    collocations:["take a shower","take a break","take a photo","take a nap","take a walk","take a chance","take a look"],
    tip:"💎 Це light verb — створює дію з іменника. Дуже типова конструкція для розмови." },

  { verb:"take", label:"take medicine / a pill", uk:"приймати ліки", emoji:"💊", cat:"consume", lvl:"A2", freq:4,
    examples:[
      { en:"<b>Take</b> two pills a day.", uk:"Приймай по дві таблетки на день." },
      { en:"Did you <b>take</b> your vitamins?", uk:"Ти прийняв вітаміни?" },
    ],
    collocations:["take medicine","take a pill","take vitamins"] },

  { verb:"take", label:"take it / take this", uk:"сприймати (емоційно/реакція)", emoji:"💭", cat:"understand", lvl:"B1", freq:4,
    examples:[
      { en:"How did she <b>take</b> the news?", uk:"Як вона сприйняла новину?" },
      { en:"He <b>took</b> it badly.", uk:"Він сприйняв це погано." },
      { en:"I'll <b>take</b> that as a yes.", uk:"Сприйму це як «так»." },
    ],
    collocations:["take it well","take it badly","take it as a sign"] },

  { verb:"take", label:"take care of", uk:"піклуватись про", emoji:"💛", cat:"fixed", lvl:"A2", freq:5,
    examples:[
      { en:"I'll <b>take</b> care of it.", uk:"Я цим займусь." },
      { en:"She <b>takes</b> care of her grandma.", uk:"Вона піклується про бабусю." },
      { en:"<b>Take</b> care!", uk:"Бережи себе! (також — «бувай»)" },
    ],
    collocations:["take care of sb","take care of business","take care!"] },

  { verb:"take", label:"take off / take over (phrasal)", uk:"злетіти / захопити", emoji:"🔗", cat:"phrasal", lvl:"B1", freq:4,
    examples:[
      { en:"The plane <b>took off</b>.", uk:"Літак злетів." },
      { en:"Sarah will <b>take over</b> the project.", uk:"Сара візьме проєкт на себе." },
      { en:"His career <b>took off</b> after that role.", uk:"Його кар'єра стрімко пішла вгору." },
    ],
    collocations:["take off","take over","take out","take up","take back"] },

  // ============= HAVE =============
  { verb:"have", label:"have sth", uk:"мати (володіти)", emoji:"🤝", cat:"obtain", lvl:"A1", freq:5,
    examples:[
      { en:"I <b>have</b> two brothers.", uk:"У мене два брати." },
      { en:"She <b>has</b> a new car.", uk:"У неї нова машина." },
      { en:"Do you <b>have</b> a minute?", uk:"Маєш хвилинку?" },
    ],
    collocations:["have a car","have a sister","have money","have time"] },

  { verb:"have", label:"have a + experience", uk:"переживати (досвід)", emoji:"💭", cat:"experience", lvl:"A1", freq:5,
    examples:[
      { en:"<b>Have</b> a nice day!", uk:"Гарного дня!" },
      { en:"I <b>had</b> a great time at the party.", uk:"Я чудово провів час на вечірці." },
      { en:"She <b>had</b> a bad dream.", uk:"Їй наснився поганий сон." },
      { en:"We <b>had</b> a fight.", uk:"Ми посварились." },
    ],
    collocations:["have fun","have a good time","have a fight","have a dream","have an accident"] },

  { verb:"have", label:"have food / drink", uk:"з'їсти / випити", emoji:"🍴", cat:"consume", lvl:"A1", freq:5,
    examples:[
      { en:"I'll <b>have</b> a coffee.", uk:"Я візьму каву." },
      { en:"What did you <b>have</b> for breakfast?", uk:"Що ти їв на сніданок?" },
      { en:"Let's <b>have</b> dinner together.", uk:"Повечеряймо разом." },
    ],
    collocations:["have breakfast","have lunch","have dinner","have a drink","have a beer"],
    tip:"⚠️ Для їжі/напоїв — «have» природніше за «eat»/«drink» у запрошеннях." },

  { verb:"have", label:"have to do sth", uk:"мусити / бути зобов'язаним", emoji:"⚖️", cat:"modal", lvl:"A1", freq:5,
    examples:[
      { en:"I <b>have to</b> go now.", uk:"Я мушу йти зараз." },
      { en:"She <b>has to</b> work tomorrow.", uk:"Вона мусить працювати завтра." },
      { en:"Do I <b>have to</b> answer?", uk:"Я мушу відповідати?" },
    ],
    collocations:["have to go","have to work","have to do"],
    tip:"⚠️ В розмові часто «gotta»: «I gotta go» = «I have to go» / «I've got to go»." },

  { verb:"have", label:"have sth done (causative)", uk:"замовити, щоб щось зробили", emoji:"⚡", cat:"cause", lvl:"B1", freq:3,
    examples:[
      { en:"I <b>had</b> my hair cut.", uk:"Я підстригся (у перукаря)." },
      { en:"She <b>had</b> her car fixed.", uk:"Їй полагодили машину." },
      { en:"We're <b>having</b> the house painted.", uk:"Нам фарбують будинок." },
    ],
    tip:"💡 Структура: have + sth + V3. Хтось РОБИТЬ це за тебе. Не сам — а замовив." },

  { verb:"have", label:"have a baby / party", uk:"народити / влаштувати", emoji:"🎉", cat:"create", lvl:"A2", freq:4,
    examples:[
      { en:"She <b>had</b> a baby last month.", uk:"Вона народила минулого місяця." },
      { en:"We're <b>having</b> a party on Friday.", uk:"Влаштовуємо вечірку в п'ятницю." },
      { en:"They <b>had</b> a wedding in Italy.", uk:"У них було весілля в Італії." },
    ],
    collocations:["have a baby","have a party","have a meeting","have a wedding"] },

  // ============= MAKE =============
  { verb:"make", label:"make sth", uk:"створити / зробити", emoji:"🔨", cat:"create", lvl:"A1", freq:5,
    examples:[
      { en:"I <b>made</b> a cake.", uk:"Я зробив торт." },
      { en:"She <b>makes</b> beautiful jewelry.", uk:"Вона робить гарну біжутерію." },
      { en:"This is <b>made</b> in Italy.", uk:"Це зроблено в Італії." },
    ],
    collocations:["make a cake","make coffee","make a sandwich","make art"],
    tip:"⚠️ MAKE — створювати щось НОВЕ. DO — виконувати дію/задачу. (make a cake / do the dishes)" },

  { verb:"make", label:"make sb do sth", uk:"змусити когось зробити", emoji:"⚡", cat:"cause", lvl:"A2", freq:5,
    examples:[
      { en:"You <b>make</b> me laugh.", uk:"Ти мене смішиш." },
      { en:"This song <b>makes</b> me cry.", uk:"Ця пісня змушує мене плакати." },
      { en:"Don't <b>make</b> me do this.", uk:"Не змушуй мене це робити." },
    ],
    collocations:["make sb laugh","make sb cry","make sb happy","make sb sad"],
    tip:"⚠️ make + sb + V1 (БЕЗ to!). «Make me to laugh» — помилка!" },

  { verb:"make", label:"make money", uk:"заробляти", emoji:"💰", cat:"earn", lvl:"A2", freq:5,
    examples:[
      { en:"He <b>makes</b> a lot of money.", uk:"Він заробляє багато грошей." },
      { en:"How much do you <b>make</b>?", uk:"Скільки ти заробляєш?" },
      { en:"She <b>made</b> a fortune in real estate.", uk:"Вона нажила статок на нерухомості." },
    ],
    collocations:["make money","make a living","make a profit","make a fortune"] },

  { verb:"make", label:"make it", uk:"встигнути / досягти", emoji:"🎯", cat:"reach", lvl:"B1", freq:5,
    examples:[
      { en:"I <b>made</b> it to the meeting!", uk:"Я встиг на зустріч!" },
      { en:"Sorry, I can't <b>make</b> it tonight.", uk:"Вибач, не зможу прийти ввечері." },
      { en:"You'll <b>make</b> it — don't give up!", uk:"Ти впораєшся — не здавайся!" },
    ],
    collocations:["make it","make it on time","make it through"],
    tip:"💡 Дуже частий розмовний phrasal. «Make it» = встигнути, дістатись, ВПОРАТИСЬ." },

  { verb:"make", label:"make a + noun (decision/mistake)", uk:"робити (стандартну дію)", emoji:"💎", cat:"fixed", lvl:"A2", freq:5,
    examples:[
      { en:"I <b>made</b> a mistake.", uk:"Я зробив помилку." },
      { en:"<b>Make</b> a decision.", uk:"Прийми рішення." },
      { en:"Don't <b>make</b> a noise!", uk:"Не шуми!" },
      { en:"She <b>made</b> a promise.", uk:"Вона дала обіцянку." },
    ],
    collocations:["make a mistake","make a decision","make a promise","make a noise","make a mess","make sense","make a difference"] },

  { verb:"make", label:"make sb sth", uk:"зробити когось кимось/якимсь", emoji:"🔄", cat:"become", lvl:"B1", freq:4,
    examples:[
      { en:"That makes me happy.", uk:"Це робить мене щасливим." },
      { en:"They <b>made</b> him CEO.", uk:"Його зробили генеральним директором." },
      { en:"This experience <b>made</b> me stronger.", uk:"Цей досвід зробив мене сильнішим." },
    ] },

  // ============= GO =============
  { verb:"go", label:"go (somewhere)", uk:"йти / їхати", emoji:"🚶", cat:"motion", lvl:"A1", freq:5,
    examples:[
      { en:"I'm <b>going</b> home.", uk:"Я іду додому." },
      { en:"Let's <b>go</b>!", uk:"Ходімо!" },
      { en:"Where are you <b>going</b>?", uk:"Куди ти йдеш?" },
    ],
    collocations:["go home","go to school","go to work","go shopping"] },

  { verb:"go", label:"go + adj (go bad/crazy)", uk:"стати (про погіршення)", emoji:"🔄", cat:"become", lvl:"B1", freq:4,
    examples:[
      { en:"The milk <b>went</b> bad.", uk:"Молоко зіпсувалось." },
      { en:"He <b>went</b> crazy.", uk:"Він збожеволів." },
      { en:"My hair is <b>going</b> grey.", uk:"Моє волосся сивіє." },
    ],
    collocations:["go bad","go crazy","go grey","go bald","go blind","go wrong"],
    tip:"⚠️ «Go + adj» зазвичай негативне (на відміну від «get + adj», яке нейтральне). «Go crazy», «go bad» — щось ламається/змінюється на гірше." },

  { verb:"go", label:"how's it going", uk:"як справи / як іде", emoji:"💬", cat:"experience", lvl:"A2", freq:5,
    examples:[
      { en:"How's it <b>going</b>?", uk:"Як справи?" },
      { en:"How did the meeting <b>go</b>?", uk:"Як пройшла зустріч?" },
      { en:"Things are <b>going</b> well.", uk:"Все іде добре." },
    ],
    collocations:["how's it going","how did it go","go well","go wrong"] },

  { verb:"go", label:"go + V-ing (go shopping)", uk:"піти щось робити", emoji:"🎯", cat:"fixed", lvl:"A1", freq:5,
    examples:[
      { en:"Let's <b>go</b> shopping.", uk:"Ходімо за покупками." },
      { en:"We <b>went</b> hiking last weekend.", uk:"Ми ходили в похід минулих вихідних." },
      { en:"I <b>go</b> swimming every Monday.", uk:"Я ходжу плавати щопонеділка." },
    ],
    collocations:["go shopping","go swimming","go fishing","go hiking","go dancing","go skiing"],
    tip:"💡 Конкретний шаблон: GO + V-ing для активностей/розваг." },

  { verb:"go", label:"colors / styles go (together)", uk:"пасувати / поєднуватись", emoji:"🎨", cat:"experience", lvl:"B1", freq:3,
    examples:[
      { en:"These colors <b>go</b> well together.", uk:"Ці кольори добре поєднуються." },
      { en:"That tie doesn't <b>go</b> with your shirt.", uk:"Та краватка не пасує до твоєї сорочки." },
    ],
    collocations:["go with","go together","go well with"] },

  { verb:"go", label:"go off (phrasal)", uk:"спрацювати (сигналізація)", emoji:"🔗", cat:"phrasal", lvl:"B1", freq:3,
    examples:[
      { en:"My alarm <b>went off</b> at 6.", uk:"Мій будильник продзвонив о 6." },
      { en:"The bomb <b>went off</b> downtown.", uk:"Бомба вибухнула в центрі." },
      { en:"He <b>went off</b> at me for being late.", uk:"Він зірвався на мене за запізнення." },
    ],
    collocations:["alarm goes off","bomb goes off","go off on sb"] },

  // ============= RUN =============
  { verb:"run", label:"run (move)", uk:"бігти", emoji:"🏃", cat:"motion", lvl:"A1", freq:5,
    examples:[
      { en:"I <b>run</b> every morning.", uk:"Я бігаю щоранку." },
      { en:"She <b>ran</b> to the store.", uk:"Вона побігла в магазин." },
      { en:"The kids were <b>running</b> around.", uk:"Діти бігали довкола." },
    ],
    collocations:["run a marathon","run for fun"] },

  { verb:"run", label:"run a business / company", uk:"керувати (бізнесом)", emoji:"⚙️", cat:"operate", lvl:"B1", freq:5,
    examples:[
      { en:"She <b>runs</b> a small bakery.", uk:"Вона керує маленькою пекарнею." },
      { en:"Who <b>runs</b> this place?", uk:"Хто керує цим місцем?" },
      { en:"He's been <b>running</b> the company for 10 years.", uk:"Він керує компанією 10 років." },
    ],
    collocations:["run a business","run a company","run a department","run a country"] },

  { verb:"run", label:"run (machine/tap)", uk:"працювати / текти", emoji:"💧", cat:"operate", lvl:"B1", freq:4,
    examples:[
      { en:"The engine is <b>running</b>.", uk:"Двигун працює." },
      { en:"Don't leave the tap <b>running</b>.", uk:"Не залишай кран відкритим." },
      { en:"My nose is <b>running</b>.", uk:"У мене нежить (з носа тече)." },
    ],
    collocations:["engine runs","water runs","tap runs","nose runs"] },

  { verb:"run", label:"run out (of)", uk:"закінчитись (про запас)", emoji:"🔗", cat:"phrasal", lvl:"A2", freq:5,
    examples:[
      { en:"We've <b>run out</b> of milk.", uk:"У нас закінчилось молоко." },
      { en:"Time is <b>running out</b>.", uk:"Час спливає." },
      { en:"My battery is <b>running out</b>.", uk:"Моя батарея сідає." },
    ],
    collocations:["run out of milk","run out of time","run out of patience","run out of money"] },

  { verb:"run", label:"run late / early", uk:"запізнюватись / випереджати", emoji:"⏰", cat:"experience", lvl:"B1", freq:4,
    examples:[
      { en:"I'm <b>running</b> late.", uk:"Я запізнююсь." },
      { en:"We're <b>running</b> ahead of schedule.", uk:"Ми випереджаємо графік." },
    ],
    collocations:["run late","run early","run on time","run ahead of schedule"] },

  { verb:"run", label:"run for office", uk:"балотуватись", emoji:"🗳️", cat:"fixed", lvl:"B2", freq:3,
    examples:[
      { en:"He's <b>running</b> for president.", uk:"Він балотується в президенти." },
      { en:"She's <b>running</b> for mayor.", uk:"Вона балотується в мери." },
    ],
    collocations:["run for president","run for office","run for mayor"] },

  // ============= BREAK =============
  { verb:"break", label:"break sth (physically)", uk:"зламати / розбити", emoji:"💥", cat:"break_st", lvl:"A1", freq:5,
    examples:[
      { en:"I <b>broke</b> my phone.", uk:"Я розбив телефон." },
      { en:"The cup <b>broke</b> when it fell.", uk:"Чашка розбилась, коли впала." },
      { en:"He <b>broke</b> his leg skiing.", uk:"Він зламав ногу на лижах." },
    ],
    collocations:["break a phone","break a window","break a leg","break a cup"] },

  { verb:"break", label:"take a break", uk:"перерва", emoji:"⏸️", cat:"pause", lvl:"A1", freq:5,
    examples:[
      { en:"Let's <b>take a break</b>.", uk:"Зробімо перерву." },
      { en:"We had a 10-minute <b>break</b>.", uk:"У нас була 10-хвилинна перерва." },
      { en:"I need a <b>break</b> from work.", uk:"Мені потрібна перерва від роботи." },
    ],
    collocations:["take a break","need a break","coffee break","lunch break"],
    tip:"📝 Тут BREAK — іменник, а не дієслово. Але дуже частотне." },

  { verb:"break", label:"break the rules / law", uk:"порушити (правила, закон)", emoji:"⚖️", cat:"break_st", lvl:"B1", freq:4,
    examples:[
      { en:"You can't <b>break</b> the rules.", uk:"Не можна порушувати правила." },
      { en:"He <b>broke</b> the law.", uk:"Він порушив закон." },
      { en:"Don't <b>break</b> your promise.", uk:"Не порушуй обіцянки." },
    ],
    collocations:["break the rules","break the law","break a promise","break a record"] },

  { verb:"break", label:"break the news", uk:"повідомити (зазвичай погану новину)", emoji:"📰", cat:"fixed", lvl:"B2", freq:3,
    examples:[
      { en:"I had to <b>break</b> the news to her.", uk:"Мені довелось повідомити їй новину." },
      { en:"Who <b>broke</b> the news of the divorce?", uk:"Хто оголосив про розлучення?" },
    ],
    collocations:["break the news","break it to sb","break it gently"] },

  { verb:"break", label:"break up", uk:"розійтись (в стосунках)", emoji:"💔", cat:"phrasal", lvl:"A2", freq:5,
    examples:[
      { en:"They <b>broke up</b> after 5 years.", uk:"Вони розійшлись після 5 років." },
      { en:"She <b>broke up</b> with him last week.", uk:"Вона з ним розійшлась минулого тижня." },
    ],
    collocations:["break up","break up with sb"] },

  { verb:"break", label:"break down", uk:"зламатись / розплакатись", emoji:"🔗", cat:"phrasal", lvl:"B1", freq:4,
    examples:[
      { en:"My car <b>broke down</b>.", uk:"Моя машина зламалась." },
      { en:"She <b>broke down</b> in tears.", uk:"Вона розплакалась." },
      { en:"Communication <b>broke down</b> between them.", uk:"Між ними порвалось спілкування." },
    ],
    collocations:["car breaks down","break down in tears"] },

  { verb:"break", label:"break out", uk:"вибухнути (про подію)", emoji:"🔗", cat:"phrasal", lvl:"B2", freq:3,
    examples:[
      { en:"A fight <b>broke out</b> at the bar.", uk:"У барі почалась бійка." },
      { en:"War <b>broke out</b> in 1939.", uk:"Війна почалась у 1939." },
      { en:"He <b>broke out</b> in a sweat.", uk:"Він вкрився потом." },
    ],
    collocations:["fight breaks out","war breaks out","fire breaks out","break out in sweat"] },

  // ============= PUT =============
  { verb:"put", label:"put sth somewhere", uk:"покласти / поставити", emoji:"📍", cat:"place", lvl:"A1", freq:5,
    examples:[
      { en:"<b>Put</b> the book on the table.", uk:"Поклади книгу на стіл." },
      { en:"Where did you <b>put</b> my keys?", uk:"Куди ти поклав мої ключі?" },
      { en:"<b>Put</b> your phone away.", uk:"Прибери телефон." },
    ],
    collocations:["put it here","put it down","put it back","put on the table"] },

  { verb:"put", label:"put on (clothes)", uk:"одягати", emoji:"👕", cat:"phrasal", lvl:"A1", freq:5,
    examples:[
      { en:"<b>Put on</b> a jacket — it's cold.", uk:"Одягни куртку — холодно." },
      { en:"She <b>put on</b> her makeup.", uk:"Вона нанесла макіяж." },
    ],
    collocations:["put on clothes","put on a jacket","put on makeup","put on weight"] },

  { verb:"put", label:"put it that way", uk:"висловити (так сформулювати)", emoji:"💬", cat:"express", lvl:"B1", freq:4,
    examples:[
      { en:"Let me <b>put</b> it this way: it's complicated.", uk:"Скажу так: це складно." },
      { en:"To <b>put</b> it simply: we lost.", uk:"Простіше кажучи: ми програли." },
      { en:"How can I <b>put</b> this?", uk:"Як би це сказати?" },
    ],
    collocations:["put it this way","put it simply","put it bluntly"],
    tip:"💡 PUT тут — про формулювання думки словами. Дуже корисне в дискусіях." },

  { verb:"put", label:"put off", uk:"відкласти", emoji:"⏰", cat:"phrasal", lvl:"B1", freq:4,
    examples:[
      { en:"Don't <b>put off</b> till tomorrow what you can do today.", uk:"Не відкладай на завтра те, що можеш зробити сьогодні." },
      { en:"The meeting was <b>put off</b> until Friday.", uk:"Зустріч перенесли на п'ятницю." },
    ],
    collocations:["put off till tomorrow","put off a meeting"] },

  { verb:"put", label:"put up with", uk:"терпіти / миритись", emoji:"😤", cat:"phrasal", lvl:"B2", freq:4,
    examples:[
      { en:"I can't <b>put up with</b> his behavior anymore.", uk:"Я більше не можу терпіти його поведінку." },
      { en:"How do you <b>put up with</b> the noise?", uk:"Як ти терпиш цей шум?" },
    ],
    collocations:["put up with sb","put up with noise"] },

  { verb:"put", label:"put pressure on", uk:"тиснути на", emoji:"⚡", cat:"cause", lvl:"B2", freq:3,
    examples:[
      { en:"Don't <b>put</b> too much pressure on yourself.", uk:"Не тисни на себе занадто." },
      { en:"They're <b>putting</b> pressure on the team.", uk:"Вони тиснуть на команду." },
    ],
    collocations:["put pressure on","put weight on","put faith in","put trust in"] },
];
const STORIES = [
  {
    title:"📖 The morning I got the job",
    text:"Yesterday I {{got}} a call from the company. They wanted me to come in for a second interview. I almost couldn't {{make}} it because I {{got}} stuck in traffic. When I finally {{got}} there, I {{took}} a deep breath and went in. The manager {{made}} me feel comfortable. He said: «Tell me how you would {{run}} this department.» I tried not to {{put}} too much pressure on myself. Long story short — I {{got}} the job! Now I {{have}} to start on Monday.",
    breakdown:[
      { word:"got a call", meaning:"GET → отримати (obtain)" },
      { word:"make it", meaning:"MAKE → встигнути (reach)" },
      { word:"got stuck", meaning:"GET + V3 (passive — застряг)" },
      { word:"got there", meaning:"GET → дістатись (arrive)" },
      { word:"took a deep breath", meaning:"TAKE → стандартна дія (fixed)" },
      { word:"made me feel", meaning:"MAKE → змусити (cause)" },
      { word:"run this department", meaning:"RUN → керувати (operate)" },
      { word:"put too much pressure", meaning:"PUT → тиснути (fixed)" },
      { word:"got the job", meaning:"GET → отримати (obtain)" },
      { word:"have to start", meaning:"HAVE → мусити (modal)" },
    ],
    uk:"Учора мені подзвонили з компанії. Хотіли, щоб я прийшов на другу співбесіду. Я ледь не запізнився через пробку. Коли нарешті дістався, зробив глибокий вдих і зайшов. Менеджер допоміг мені почуватись зручно. Він сказав: «Розкажи, як би ти керував цим відділом.» Я намагався не тиснути на себе занадто. Коротко кажучи — я отримав роботу! Тепер мушу почати в понеділок."
  },
  {
    title:"📖 The breakup",
    text:"They {{had}} a fight on Saturday. He {{broke}} a promise — again. She {{took}} it badly. «I can't {{put up with}} this anymore,» she said. He tried to {{make}} her change her mind, but it was too late. She {{broke up}} with him that night. He {{got}} angry. Then he {{got}} sad. Eventually he {{got}} it — it was over. The next morning, his car {{broke down}} on the way to work. «Just my luck,» he said.",
    breakdown:[
      { word:"had a fight", meaning:"HAVE → переживати досвід (experience)" },
      { word:"broke a promise", meaning:"BREAK → порушити (break state)" },
      { word:"took it badly", meaning:"TAKE → сприйняти (understand)" },
      { word:"put up with", meaning:"PUT → терпіти (phrasal)" },
      { word:"make her change", meaning:"MAKE → змусити (cause)" },
      { word:"broke up", meaning:"BREAK → розійтись (phrasal)" },
      { word:"got angry / sad", meaning:"GET + adj → стати (become)" },
      { word:"got it", meaning:"GET → зрозуміти (understand)" },
      { word:"broke down", meaning:"BREAK → зламатись (phrasal)" },
    ],
    uk:"У них була сварка в суботу. Він знову порушив обіцянку. Вона сприйняла це погано. «Я більше не можу це терпіти,» — сказала вона. Він намагався змусити її передумати, але було пізно. Вона розійшлась з ним тієї ночі. Він розлютився. Потім засумував. Зрештою зрозумів — кінець. Наступного ранку машина зламалась по дорозі на роботу. «Звісно, моє щастя,» — сказав він."
  },
  {
    title:"📖 Saturday with my niece",
    text:"My niece is 6 years old. On Saturday I {{took}} her to the park. She wanted to {{go}} swimming, but the pool was closed. {{Take}} two — let's {{have}} ice cream! She {{had}} chocolate; I {{had}} vanilla. She {{made}} a mess all over her dress. We {{had}} fun anyway. On the way home, she {{ran}} out of energy and fell asleep in the car. I {{had}} to carry her up the stairs. {{Take}} my advice: kids are exhausting. But you {{get}} used to it.",
    breakdown:[
      { word:"took her to the park", meaning:"TAKE → відвезти/відвести (carry)" },
      { word:"go swimming", meaning:"GO + V-ing → активність (fixed)" },
      { word:"take two", meaning:"TAKE → спроба (slang from film)" },
      { word:"have ice cream", meaning:"HAVE → їсти/пити (consume)" },
      { word:"made a mess", meaning:"MAKE → створити (fixed)" },
      { word:"had fun", meaning:"HAVE → переживати (experience)" },
      { word:"ran out of", meaning:"RUN → закінчитись (phrasal)" },
      { word:"had to carry", meaning:"HAVE → мусити (modal)" },
      { word:"take my advice", meaning:"TAKE → прийняти (fixed)" },
      { word:"get used to", meaning:"GET → стати (become)" },
    ],
    uk:"Моїй племінниці 6 років. У суботу я повів її в парк. Вона хотіла піти плавати, але басейн був закритий. Дубль два — давай мороженого! Вона з'їла шоколадне; я — ванільне. Вона зробила безлад на сукні. Все одно весело провели час. По дорозі додому вона видихалась і заснула в машині. Мені довелось нести її сходами. Прийми пораду: діти — це виснаження. Але звикаєш."
  },
  {
    title:"📖 My boss is a piece of work",
    text:"I {{have}} the worst boss. Every morning he comes in late, then he {{makes}} us stay late. He never {{takes}} responsibility for anything. When something {{goes}} wrong, he {{puts}} the blame on us. He doesn't even {{run}} the meetings well — they {{go}} on for hours with no decisions. Yesterday I tried to {{break}} the news to him about a client problem, and he {{went}} crazy. I'm seriously thinking about {{taking}} a new job. The truth is, I can't {{put up with}} this place much longer.",
    breakdown:[
      { word:"have the worst boss", meaning:"HAVE → мати (obtain)" },
      { word:"makes us stay", meaning:"MAKE → змусити (cause)" },
      { word:"takes responsibility", meaning:"TAKE → прийняти (fixed)" },
      { word:"goes wrong", meaning:"GO + adj → стати поганим (become)" },
      { word:"puts the blame", meaning:"PUT → класти (place — фіг.)" },
      { word:"run the meetings", meaning:"RUN → керувати (operate)" },
      { word:"go on for hours", meaning:"GO → тривати (motion-time)" },
      { word:"break the news", meaning:"BREAK → повідомити (fixed)" },
      { word:"went crazy", meaning:"GO + adj → зірватись (become)" },
      { word:"taking a new job", meaning:"TAKE → прийняти посаду (obtain)" },
      { word:"put up with", meaning:"PUT → терпіти (phrasal)" },
    ],
    uk:"У мене найгірший бос. Щоранку приходить пізно, а тоді змушує нас затримуватись. Він ніколи не бере на себе відповідальність. Коли щось іде не так, він звалює провину на нас. Він навіть зустрічі веде погано — вони тягнуться годинами без жодних рішень. Учора я спробував повідомити йому про проблему з клієнтом, і він зірвався. Я серйозно думаю про нову роботу. Правда в тому, що я не можу довго терпіти це місце."
  },
];

/* CATS у оригіналі: { label: "🎁 OBTAIN — отримати" } → розбираємо на emoji + label */
const CATS2 = {};
Object.keys(CATS).forEach(k => {
  const m = String(CATS[k].label).match(/^(\S+)\s+(.*)$/) || ['', '•', CATS[k].label];
  CATS2[k] = { emoji: m[1], label: m[2], desc: CATS[k].desc || ('значення: ' + m[2]) };
});
const MARKERS = MEANINGS.map(m => ({ name: m.label, uk: m.uk, emoji: m.emoji, cat: m.cat, lvl: m.lvl, reg: 'neutral', when: m.when || ('Одне зі значень дієслова ' + m.verb.toUpperCase() + '.'), examples: m.examples, tip: m.tip, vs: m.vs, verb: m.verb, freq: m.freq, collocations: m.collocations }));
const INTRO = "<div class=\"intro-box red\">\n      <h3>🚫 Чому навчання за словником не працює для цих дієслів?</h3>\n      <p>Уяви, ти відкрив словник: <b>«get = отримати»</b>. Запам'ятав. Йдеш у серіал і чуєш:</p>\n      <ul style=\"font-style:italic\">\n        <li>«I don't <b>get</b> it» — отримую? Ні, «не розумію».</li>\n        <li>«It's <b>getting</b> cold» — отримує холодне? Ні, «стає холодно».</li>\n        <li>«I <b>got</b> sick» — отримав хворобу? Ні, «захворів».</li>\n        <li>«<b>Get</b> out!» — отримай вихід? Ні, «забирайся!».</li>\n        <li>«We <b>got</b> there at 8» — там отримали? Ні, «дістались».</li>\n      </ul>\n      <p>Це <b>не одне дієслово</b>. Це <b>10 різних дієслів, які виглядають однаково</b>. І так для GET, TAKE, RUN, BREAK, MAKE, HAVE, GO, PUT.</p>\n    </div>\n\n    <div class=\"intro-box blue\">\n      <h3>🎯 Як це працює?</h3>\n      <p>У кожного дієслова — <b>«ядро значень»</b> з категоріями:</p>\n      <div class=\"compare-grid\">\n        <div class=\"compare-box bad\">\n          <h4>❌ Списковий підхід:</h4>\n          <p><b>get</b> — отримати, стати, дістатись, зрозуміти, захворіти, дістати, привезти, переконати... (як це запам'ятати?)</p>\n        </div>\n        <div class=\"compare-box good\">\n          <h4>✅ Категоріальний підхід:</h4>\n          <p><b>get</b> має 5 «груп»:</p>\n          <p>🎁 <b>OBTAIN</b> (отримати)</p>\n          <p>🔄 <b>BECOME</b> (стати) — get cold, get tired</p>\n          <p>🎯 <b>ARRIVE</b> (дістатись) — get there, get home</p>\n          <p>💡 <b>UNDERSTAND</b> (зрозуміти) — get it, get the joke</p>\n          <p>🤒 <b>CATCH</b> (підхопити) — get sick, get a cold</p>\n        </div>\n      </div>\n      <p>Знаючи <b>групу</b>, мозок одразу обирає правильне значення з контексту.</p>\n    </div>\n\n    <div class=\"intro-box green\">\n      <h3>💪 Чому це принципово важливо?</h3>\n      <ul>\n        <li>📊 <b>Top-10 дієслів</b> покривають <b>~50% розмовної мови</b> (статистика Oxford Corpus).</li>\n        <li>🎬 У серіалах та фільмах ці 8 дієслів — <b>кожне друге</b>.</li>\n        <li>🗣️ Замість «I have to depart» — кажеш «I gotta go». Замість «I comprehend» — «I get it».</li>\n        <li>⚡ Звучиш як нейтив, бо нейтиви <b>не люблять складні слова</b>. Вони крутять цими 8 цілий день.</li>\n      </ul>\n    </div>\n\n    <div class=\"intro-box\">\n      <h3>📅 План: 4 тижні, 2 дієслова на тиждень</h3>\n      <p><b>Тиждень 1:</b> 🎲 <b>GET + TAKE</b> — найважливіші. ~10 хв/день у браузері + 5 хв на картки.</p>\n      <p><b>Тиждень 2:</b> 🎲 <b>HAVE + MAKE</b> — фундаментальні «робочі» дієслова.</p>\n      <p><b>Тиждень 3:</b> 🎲 <b>GO + RUN</b> — рух + операції.</p>\n      <p><b>Тиждень 4:</b> 🎲 <b>BREAK + PUT</b> + усі вправи разом.</p>\n      <p>🎯 <b>Ритуал:</b> 1 категорія значень у браузері → промов вголос 2 рази → одразу зроби вправу 🎯 Meaning Match. 15 хв/день.</p>\n    </div>\n\n    <h3 style=\"margin-bottom:10px;color:#064e3b\">🎲 8 дієслів — клацай для огляду:</h3>\n    <div class=\"verb-overview\"></div>";
const META = {"title":"🎲 Polysemy Verbs — 8 дієслів-універсалів","lead":"GET / TAKE / RUN / BREAK / MAKE / HAVE / GO / PUT — кожне має <b>8-15 значень</b>. Замість 50 окремих слів, ти володієш 8 як швейцарським ножем. Це <b>~60% повсякденної мови</b>."};
return { CATS: CATS2, MARKERS, VERBS, STORIES, INTRO: INTRO, META: META };
})();
