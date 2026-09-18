/* EngLift — дані тренажера «constructions» (перенесено з constructions-trainer.html). Вантажиться лише у своєму розділі. */
window.PHRASE_DATA = window.PHRASE_DATA || {};
window.PHRASE_DATA["constructions"] = (function () {
const GRPS = {
  time:    { emoji:"🕰️", label:"Час",                    desc:"used to / going to / by the time / as soon as" },
  logic:   { emoji:"🧠", label:"Думка й логіка",          desc:"it turns out / the reason is / as far as I know" },
  compare: { emoji:"📊", label:"Порівняння і ступені",    desc:"as...as / the more...the more / rather than" },
  cause:   { emoji:"🎯", label:"Причини й результати",    desc:"in order to / due to / lead to / result in" },
  cond:    { emoji:"⚖️", label:"Умови й винятки",         desc:"as long as / regardless of / either...or" },
};
const CS = [
  // ============= TIME =============
  { pattern:"used to + V1", uk:"колись робив (звичка/стан у минулому)", emoji:"🕰️", grp:"time", lvl:"A2",
    formula:"S + used to + V1 (не робить це вже)",
    when:"Регулярна дія або стан у минулому, який більше не відбувається.",
    examples:[
      { en:"I <b>used to</b> smoke, but I quit.", uk:"Я колись курив, але кинув." },
      { en:"She <b>used to</b> live in Paris.", uk:"Вона колись жила в Парижі." },
    ],
    tip:"⚠️ В питаннях/запереченнях: «Did you use to smoke?» / «I didn't use to like it» — БЕЗ 'd' в used." },

  { pattern:"be used to + V-ing / noun", uk:"звик до (щось стало нормою)", emoji:"🔁", grp:"time", lvl:"B1",
    formula:"S + be used to + V-ing / noun",
    when:"Зараз для тебе це нормально, ти адаптований.",
    examples:[
      { en:"I'<b>m used to</b> waking up early.", uk:"Я звик прокидатись рано." },
      { en:"She's not <b>used to</b> the cold weather.", uk:"Вона не звикла до холодної погоди." },
    ],
    vs:"⚠️ «used to V1» (колишня звичка) ≠ «be used to V-ing» (зараз звик). «I used to smoke» — колись курив. «I'm used to smoking» — я звик курити (роблю це)." },

  { pattern:"be going to + V1", uk:"збиратися / буде (план чи прогноз)", emoji:"🚀", grp:"time", lvl:"A2",
    formula:"S + be + going to + V1",
    when:"1) Заздалегідь запланована дія. 2) Прогноз на основі побаченого.",
    examples:[
      { en:"I'<b>m going to</b> call her tonight.", uk:"Я збираюсь подзвонити їй увечері." },
      { en:"Look at those clouds — it'<b>s going to</b> rain.", uk:"Глянь на ті хмари — буде дощ." },
    ],
    tip:"💡 В розмові скорочується до «gonna» (I'm gonna call her)." },

  { pattern:"be about to + V1", uk:"от-от / зараз буде (за секунди)", emoji:"⏳", grp:"time", lvl:"B1",
    formula:"S + be + about to + V1",
    when:"Дія почнеться через секунди/хвилини. Дуже близьке майбутнє.",
    examples:[
      { en:"I'<b>m about to</b> leave.", uk:"Я зараз виходжу." },
      { en:"The film is <b>about to</b> start.", uk:"Фільм зараз почнеться." },
      { en:"I was just <b>about to</b> call you!", uk:"Я якраз збирався тобі дзвонити!" },
    ] },

  { pattern:"It takes me + [time] + to V1", uk:"мені потрібно [час], щоб...", emoji:"⏱️", grp:"time", lvl:"A2",
    formula:"It takes + sb + time + to + V1",
    when:"Скільки часу займає дія.",
    examples:[
      { en:"<b>It takes me</b> 30 minutes <b>to</b> get to work.", uk:"Мені потрібно 30 хв, щоб дістатись до роботи." },
      { en:"<b>It took</b> her a year <b>to</b> learn English.", uk:"Їй знадобився рік, щоб вивчити англійську." },
    ] },

  { pattern:"by the time + Past, Past Perfect", uk:"поки/до того, як... (вже сталось)", emoji:"⏰", grp:"time", lvl:"B2",
    formula:"By the time + Past Simple, S + had + V3",
    when:"Одна подія завершилась ДО іншої в минулому.",
    examples:[
      { en:"<b>By the time</b> I <b>arrived</b>, everyone <b>had left</b>.", uk:"На момент, коли я прийшов, усі вже пішли." },
      { en:"<b>By the time</b> she called, I'd already gone to bed.", uk:"Поки вона подзвонила, я вже спав." },
    ],
    tip:"⚠️ У майбутньому: «by the time + Present, Future Perfect» — «By the time you arrive, I'll have finished»." },

  { pattern:"as soon as + Present / Past", uk:"як тільки", emoji:"⚡", grp:"time", lvl:"A2",
    formula:"As soon as + Present (для майбутнього!), Future / Past + Past",
    when:"Одна дія одразу після іншої. ⚠️ Про майбутнє — Present (не Future!).",
    examples:[
      { en:"I'll call you <b>as soon as</b> I <b>get</b> home.", uk:"Я подзвоню, як тільки прийду додому." },
      { en:"<b>As soon as</b> she <b>saw</b> him, she smiled.", uk:"Щойно вона його побачила, вона усміхнулась." },
    ],
    tip:"⚠️ Не кажи «as soon as I will get home»! Тільки «as soon as I get home»." },

  { pattern:"not... until", uk:"не... поки не / тільки після", emoji:"🚧", grp:"time", lvl:"B2",
    formula:"S + won't/didn't + V + until + event",
    when:"Дія відбудеться / відбулась тільки після певного моменту.",
    examples:[
      { en:"I <b>won't</b> leave <b>until</b> you apologize.", uk:"Я не піду, поки ти не вибачишся." },
      { en:"He <b>didn't</b> arrive <b>until</b> midnight.", uk:"Він прийшов тільки опівночі." },
    ],
    tip:"💡 Формальніше з інверсією: «Not until midnight did he arrive» — «Тільки опівночі він прибув»." },

  { pattern:"since + [момент часу]", uk:"з (моменту)", emoji:"📅", grp:"time", lvl:"A2",
    formula:"S + have/has + V3 + since + point in time",
    when:"⚠️ SINCE = конкретна точка (Monday, 2015, 9am). Часто з Present Perfect.",
    examples:[
      { en:"I've lived here <b>since</b> 2020.", uk:"Я живу тут з 2020." },
      { en:"She hasn't called <b>since</b> Monday.", uk:"Вона не дзвонила з понеділка." },
    ],
    vs:"⚠️ SINCE (точка) vs FOR (тривалість): «since Monday» / «for 3 days»." },

  { pattern:"for + [період часу]", uk:"протягом", emoji:"⏳", grp:"time", lvl:"A2",
    formula:"S + V + for + duration",
    when:"⚠️ FOR = тривалість (3 hours, 5 years). Часто з Present Perfect.",
    examples:[
      { en:"I've worked here <b>for</b> 5 years.", uk:"Я тут працюю 5 років." },
      { en:"We waited <b>for</b> 2 hours.", uk:"Ми чекали 2 години." },
    ] },

  // ============= LOGIC =============
  { pattern:"The reason (why) ___ is (because) ___", uk:"причина, чому... — це тому, що...", emoji:"🎯", grp:"logic", lvl:"B1",
    formula:"The reason (why) + clause + is (because) + clause",
    when:"Дуже поширений спосіб пояснити причину. «Why» і «because» іноді опускають.",
    examples:[
      { en:"<b>The reason</b> I'm late <b>is</b> traffic.", uk:"Причина, чому я запізнився — трафік." },
      { en:"<b>The reason why</b> she left <b>is because</b> she was unhappy.", uk:"Причина, чому вона пішла — бо була нещаслива." },
    ],
    tip:"💡 Формально: «The reason ... is that ...» (з «that» замість «because»). Casual — з «because»." },

  { pattern:"It turns out (that) ___", uk:"виявляється, що...", emoji:"🔦", grp:"logic", lvl:"B1",
    formula:"It turns out (that) + clause",
    when:"Розкриваєш несподіване відкриття або новий факт.",
    examples:[
      { en:"<b>It turns out</b> he was lying the whole time.", uk:"Виявляється, він увесь час брехав." },
      { en:"<b>It turned out</b> to be a great decision.", uk:"Це виявилось чудовим рішенням." },
    ] },

  { pattern:"It seems (that) ___ / It seems + adj", uk:"здається, що...", emoji:"🌫️", grp:"logic", lvl:"B1",
    formula:"It seems (that) + clause / It seems + adj",
    when:"М'яко виражаєш припущення на основі побаченого.",
    examples:[
      { en:"<b>It seems</b> she's not coming.", uk:"Здається, вона не прийде." },
      { en:"<b>It seems</b> strange.", uk:"Це здається дивним." },
    ] },

  { pattern:"I would say (that) ___", uk:"я б сказав, що...", emoji:"💭", grp:"logic", lvl:"B1",
    formula:"I would say (that) + clause",
    when:"М'яка, ввічлива думка. Показує, що це твоя суб'єктивна позиція.",
    examples:[
      { en:"<b>I would say</b> it's overrated.", uk:"Я б сказав, це переоцінено." },
      { en:"<b>I'd say</b> about 50 people came.", uk:"Я б сказав, прийшло близько 50 людей." },
    ] },

  { pattern:"As far as I know", uk:"наскільки я знаю", emoji:"🔍", grp:"logic", lvl:"B1",
    formula:"As far as I know, + clause",
    when:"Обмежуєш свою впевненість — «за моєю інформацією».",
    examples:[
      { en:"<b>As far as I know</b>, the meeting is at 3.", uk:"Наскільки я знаю, зустріч о 3." },
      { en:"<b>As far as I know</b>, they're still together.", uk:"Наскільки я знаю, вони досі разом." },
    ],
    tip:"💡 Синоніми: «to my knowledge», «from what I've heard», «as far as I'm aware»." },

  { pattern:"There is no point in + V-ing", uk:"немає сенсу...", emoji:"🚫", grp:"logic", lvl:"B2",
    formula:"There is no point in + V-ing",
    when:"Виражаєш, що дія марна.",
    examples:[
      { en:"<b>There's no point in</b> arguing with him.", uk:"Немає сенсу з ним сперечатись." },
      { en:"<b>There's no point in</b> going now — it's too late.", uk:"Немає сенсу йти зараз — вже пізно." },
    ],
    tip:"⚠️ Після «in» — V-ing (бо це прийменник)! Не «to argue»." },

  { pattern:"What I mean is (that) ___", uk:"я маю на увазі, що...", emoji:"💬", grp:"logic", lvl:"B1",
    formula:"What I mean is (that) + clause",
    when:"Уточнюєш / переформульовуєш свою думку.",
    examples:[
      { en:"<b>What I mean is</b>, we need more time.", uk:"Я маю на увазі, нам потрібно більше часу." },
      { en:"<b>What I mean is that</b> it's not personal.", uk:"Я маю на увазі, що це не особисте." },
    ] },

  { pattern:"The thing is (that) ___", uk:"справа в тому, що...", emoji:"📌", grp:"logic", lvl:"B1",
    formula:"The thing is (that) + clause",
    when:"Перед поясненням ключового моменту / складності.",
    examples:[
      { en:"<b>The thing is</b>, I don't have the money.", uk:"Справа в тому, що в мене немає грошей." },
      { en:"<b>The thing is that</b> we tried this before.", uk:"Штука в тому, що ми це вже пробували." },
    ] },

  { pattern:"It doesn't matter if / whether ___", uk:"не важливо, чи...", emoji:"🤷", grp:"logic", lvl:"B1",
    formula:"It doesn't matter if/whether + clause",
    when:"Обидва варіанти прийнятні — байдуже.",
    examples:[
      { en:"<b>It doesn't matter if</b> you're late.", uk:"Не важливо, якщо ти запізнишся." },
      { en:"<b>It doesn't matter whether</b> we win or lose.", uk:"Не важливо, виграємо ми чи програємо." },
    ] },

  { pattern:"Provided (that) / Providing (that)", uk:"за умови, що", emoji:"✅", grp:"logic", lvl:"B2",
    formula:"Provided (that) + clause",
    when:"Формальна умова — «якщо тільки виконаєш це».",
    examples:[
      { en:"You can come <b>provided that</b> you behave.", uk:"Можеш прийти за умови, що поводитимешся пристойно." },
      { en:"I'll help, <b>providing</b> you help me back.", uk:"Я допоможу за умови, що ти теж допоможеш мені." },
    ],
    vs:"⚠️ «Provided» — формальніше за «as long as». Значення однакове." },

  // ============= COMPARE =============
  { pattern:"as + adj + as", uk:"такий самий..., як", emoji:"⚖️", grp:"compare", lvl:"A2",
    formula:"S + be + as + adj + as + N/pronoun",
    when:"Порівняння рівних якостей — X і Y мають однакову якість.",
    examples:[
      { en:"She's <b>as tall as</b> her brother.", uk:"Вона така сама висока, як її брат." },
      { en:"This film is <b>as good as</b> the last one.", uk:"Цей фільм такий же гарний, як попередній." },
    ] },

  { pattern:"not as + adj + as", uk:"не такий, як", emoji:"⬇️", grp:"compare", lvl:"A2",
    formula:"S + be + not as + adj + as + N",
    when:"Заперечення рівності — X менш якісний ніж Y.",
    examples:[
      { en:"It's <b>not as cold as</b> yesterday.", uk:"Не так холодно, як учора." },
      { en:"He's <b>not as tall as</b> me.", uk:"Він не такий високий, як я." },
    ] },

  { pattern:"the more ___ , the more ___", uk:"чим більше..., тим більше...", emoji:"📈", grp:"compare", lvl:"B1",
    formula:"The + comparative + clause, the + comparative + clause",
    when:"Показуєш пропорційну залежність.",
    examples:[
      { en:"<b>The more</b> you practice, <b>the better</b> you get.", uk:"Чим більше практикуєш, тим кращий стаєш." },
      { en:"<b>The older</b> I get, <b>the wiser</b> I feel.", uk:"Чим старший, тим мудрішим себе відчуваю." },
      { en:"<b>The more</b> I know, <b>the less</b> I understand.", uk:"Чим більше знаю, тим менше розумію." },
    ],
    tip:"💡 Обидві частини — comparative (more/less/better/worse). Часто «the + adj-er / the more + adj»." },

  { pattern:"twice / three times as much as", uk:"вдвічі / втричі більше ніж", emoji:"✖️", grp:"compare", lvl:"B1",
    formula:"twice/three times + as + much/many + as + N",
    when:"Кількісне порівняння з множником.",
    examples:[
      { en:"It costs <b>twice as much as</b> before.", uk:"Це коштує вдвічі більше, ніж раніше." },
      { en:"He earns <b>three times as much as</b> me.", uk:"Він заробляє втричі більше, ніж я." },
    ] },

  { pattern:"the same as", uk:"такий самий, як / те саме, що", emoji:"🟰", grp:"compare", lvl:"A2",
    formula:"S + be + the same as + N",
    when:"Ідентичність. Часто плутають з «as ... as».",
    examples:[
      { en:"My phone is <b>the same as</b> yours.", uk:"У мене телефон такий же, як у тебе." },
      { en:"Her opinion is <b>the same as</b> mine.", uk:"Її думка така сама, як моя." },
    ],
    vs:"⚠️ «X is the same as Y» — вони однакові. «X is as good as Y» — однаково гарні (може, але різні)." },

  { pattern:"unlike + N", uk:"на відміну від", emoji:"↔️", grp:"compare", lvl:"B1",
    formula:"Unlike + N, + clause",
    when:"Підкреслюєш ВІДМІННІСТЬ між об'єктами.",
    examples:[
      { en:"<b>Unlike</b> his brother, he's quiet.", uk:"На відміну від брата, він тихий." },
      { en:"<b>Unlike</b> most people, I love Mondays.", uk:"На відміну від більшості, я люблю понеділки." },
    ] },

  { pattern:"similar to + N", uk:"схоже на", emoji:"👯", grp:"compare", lvl:"B1",
    formula:"S + be + similar to + N",
    when:"Показуєш подібність — не ідентичні, але схожі.",
    examples:[
      { en:"This taste is <b>similar to</b> ginger.", uk:"На смак схоже на імбир." },
      { en:"My style is <b>similar to</b> hers.", uk:"Мій стиль схожий на її." },
    ] },

  { pattern:"rather than", uk:"замість того, щоб / радше ніж", emoji:"🔀", grp:"compare", lvl:"B2",
    formula:"S + V + rather than + V-ing/N",
    when:"Вказуєш ПЕРЕВАГУ одного варіанту над іншим (більш формально).",
    examples:[
      { en:"I'd walk <b>rather than</b> take the bus.", uk:"Я б краще пройшовся, ніж поїхав автобусом." },
      { en:"She chose to stay <b>rather than</b> leave.", uk:"Вона вирішила лишитись, а не піти." },
    ],
    vs:"⚠️ «rather than» — формальне. «I'd rather ___ than ___» — casual." },

  { pattern:"the closest thing to + N", uk:"найближче до / майже як", emoji:"🎯", grp:"compare", lvl:"B2",
    formula:"S + be + the closest thing to + N",
    when:"Метафоричне порівняння — «найбільше нагадує».",
    examples:[
      { en:"He's <b>the closest thing to</b> a brother I've ever had.", uk:"Він найближче до брата, що я коли-небудь мав." },
      { en:"This is <b>the closest thing to</b> heaven.", uk:"Це найближче до раю." },
    ] },

  { pattern:"nothing like + N", uk:"зовсім не схоже на", emoji:"🚫", grp:"compare", lvl:"B2",
    formula:"S + be + nothing like + N",
    when:"Сильне заперечення схожості.",
    examples:[
      { en:"The film is <b>nothing like</b> the book.", uk:"Фільм зовсім не схожий на книгу." },
      { en:"He's <b>nothing like</b> his father.", uk:"Він зовсім не схожий на батька." },
    ],
    tip:"💡 Також: «There's nothing like a good coffee in the morning» = «Немає нічого кращого за ранкову каву»." },

  // ============= CAUSE =============
  { pattern:"in order to + V1", uk:"з метою / для того, щоб", emoji:"🎯", grp:"cause", lvl:"B1",
    formula:"S + V + in order to + V1",
    when:"Виражаєш мету дії. Формальніше за просте «to + V1».",
    examples:[
      { en:"I studied hard <b>in order to</b> pass the exam.", uk:"Я багато вчився, щоб скласти іспит." },
      { en:"She left early <b>in order to</b> avoid traffic.", uk:"Вона вийшла рано, щоб уникнути пробок." },
    ] },

  { pattern:"so that + S + can/could + V1", uk:"щоб (з метою)", emoji:"🎯", grp:"cause", lvl:"B1",
    formula:"..., so that + S + can/could/will/would + V1",
    when:"Мета з іншим субʼєктом. «Щоб він міг...», «щоб ми могли...».",
    examples:[
      { en:"I'll explain it again <b>so that</b> everyone <b>can</b> understand.", uk:"Я поясню ще раз, щоб усі зрозуміли." },
      { en:"She saved money <b>so that</b> she <b>could</b> travel.", uk:"Вона економила, щоб могти подорожувати." },
    ],
    vs:"⚠️ «in order to» — та сама людина робить обидві дії. «so that» — часто з іншим субʼєктом." },

  { pattern:"because of + N", uk:"через (іменник)", emoji:"🎯", grp:"cause", lvl:"A2",
    formula:"S + V + because of + N",
    when:"⚠️ «because» + clause (I was late because it rained). «because of» + noun (I was late because of the rain).",
    examples:[
      { en:"We cancelled <b>because of</b> the weather.", uk:"Ми скасували через погоду." },
      { en:"He's tired <b>because of</b> the long day.", uk:"Він втомлений через довгий день." },
    ] },

  { pattern:"due to the fact that + clause", uk:"через те, що (формально)", emoji:"📋", grp:"cause", lvl:"B2",
    formula:"..., due to the fact that + clause",
    when:"Формальне пояснення причини. Часто в бізнес-письмі.",
    examples:[
      { en:"The event was postponed <b>due to the fact that</b> the speaker was ill.", uk:"Захід перенесли через те, що доповідач захворів." },
    ],
    tip:"💡 Коротко: «due to + noun» — «due to illness». Розгорнуто: «due to the fact that + clause»." },

  { pattern:"to the extent that ___", uk:"настільки, що...", emoji:"📏", grp:"cause", lvl:"C1",
    formula:"..., to the extent that + clause",
    when:"Показуєш ступінь / наслідок. Формально.",
    examples:[
      { en:"He was tired <b>to the extent that</b> he fell asleep at his desk.", uk:"Він був втомлений настільки, що заснув за столом." },
      { en:"Prices rose <b>to the extent that</b> people stopped buying.", uk:"Ціни зросли настільки, що люди перестали купувати." },
    ] },

  { pattern:"lead to + N/V-ing", uk:"призводити до", emoji:"➡️", grp:"cause", lvl:"B1",
    formula:"S + lead to + N / V-ing",
    when:"Показуєш причинно-наслідковий ланцюг.",
    examples:[
      { en:"Stress can <b>lead to</b> health problems.", uk:"Стрес може призводити до проблем зі здоров'ям." },
      { en:"That decision <b>led to</b> disaster.", uk:"Це рішення призвело до катастрофи." },
    ] },

  { pattern:"result in + N/V-ing", uk:"привести до / мати наслідком", emoji:"🎁", grp:"cause", lvl:"B2",
    formula:"S + result in + N / V-ing",
    when:"Формальний синонім «lead to». Часто в звітах.",
    examples:[
      { en:"The strike <b>resulted in</b> huge losses.", uk:"Страйк призвів до великих збитків." },
      { en:"His hard work <b>resulted in</b> promotion.", uk:"Його важка робота привела до підвищення." },
    ],
    vs:"⚠️ «result FROM» = мати як причину. «result IN» = мати як наслідок. Легко переплутати!" },

  { pattern:"come from + N", uk:"походити з", emoji:"🌱", grp:"cause", lvl:"A2",
    formula:"S + come from + N",
    when:"1) Місце походження людини. 2) Джерело чогось абстрактного.",
    examples:[
      { en:"I <b>come from</b> Ukraine.", uk:"Я з України." },
      { en:"Success <b>comes from</b> hard work.", uk:"Успіх походить з важкої роботи." },
      { en:"His anger <b>comes from</b> insecurity.", uk:"Його злість походить з невпевненості." },
    ] },

  { pattern:"prevent (sb) from + V-ing", uk:"запобігти / не дати зробити", emoji:"🛑", grp:"cause", lvl:"B1",
    formula:"S + prevent + sb + from + V-ing",
    when:"Зупиняєш дію іншого / попереджуєш подію.",
    examples:[
      { en:"The rain <b>prevented</b> us <b>from</b> going out.", uk:"Дощ не дав нам піти кудись." },
      { en:"Exercise <b>prevents</b> you <b>from</b> getting sick.", uk:"Спорт запобігає хворобам." },
    ],
    tip:"⚠️ Після «from» — тільки V-ing! Не «to go»." },

  { pattern:"the purpose of ___ is to ___", uk:"мета... — це...", emoji:"🎯", grp:"cause", lvl:"B2",
    formula:"The purpose of + N + is to + V1",
    when:"Формальне визначення мети. Часто в презентаціях / роботі.",
    examples:[
      { en:"<b>The purpose of</b> this meeting <b>is to</b> discuss the budget.", uk:"Мета цієї зустрічі — обговорити бюджет." },
      { en:"<b>The purpose of</b> exercise <b>is to</b> stay healthy.", uk:"Мета спорту — залишатись здоровим." },
    ] },

  // ============= COND =============
  { pattern:"as long as + clause", uk:"поки / за умови, що", emoji:"⚖️", grp:"cond", lvl:"B1",
    formula:"..., as long as + clause",
    when:"1) Тривалість — «поки». 2) Умова — «якщо тільки».",
    examples:[
      { en:"You can stay <b>as long as</b> you want.", uk:"Можеш залишатись, скільки хочеш." },
      { en:"I'm fine, <b>as long as</b> it doesn't rain.", uk:"Все ок, поки не йде дощ." },
    ] },

  { pattern:"even if / even though", uk:"навіть якщо / хоча (незважаючи)", emoji:"💪", grp:"cond", lvl:"B1",
    formula:"Even if + clause (гіпотетика) / Even though + clause (факт)",
    when:"⚠️ EVEN IF — гіпотетична умова. EVEN THOUGH — вже реальний факт.",
    examples:[
      { en:"I'll go <b>even if</b> it rains.", uk:"Я піду, навіть якщо буде дощ. (можливо буде)" },
      { en:"I went <b>even though</b> it was raining.", uk:"Я пішов, хоча йшов дощ. (факт — йшов)" },
    ],
    vs:"⚠️ «Even if» — можливо станеться. «Even though» — вже відомо, що є/було." },

  { pattern:"in case + Present", uk:"на випадок / раптом", emoji:"☔", grp:"cond", lvl:"B1",
    formula:"..., in case + Present Simple",
    when:"Готуєшся до можливої події ЗАЗДАЛЕГІДЬ. ⚠️ Не плутай з «if»!",
    examples:[
      { en:"Take an umbrella <b>in case</b> it rains.", uk:"Візьми парасолю на випадок дощу." },
      { en:"Save your work <b>in case</b> the computer crashes.", uk:"Збережи роботу, раптом комп'ютер зависне." },
    ],
    vs:"⚠️ «If it rains, take umbrella» — бери, коли вже почалось. «In case it rains, take umbrella» — бери наперед, готуйся." },

  { pattern:"otherwise", uk:"інакше / бо", emoji:"⚠️", grp:"cond", lvl:"B1",
    formula:"..., otherwise + clause",
    when:"Попереджаєш про наслідок, якщо не виконаєш умову.",
    examples:[
      { en:"Hurry up, <b>otherwise</b> we'll be late.", uk:"Поспішай, інакше запізнимось." },
      { en:"Study hard, <b>otherwise</b> you'll fail.", uk:"Багато вчись, інакше провалишся." },
    ] },

  { pattern:"regardless of + N", uk:"незалежно від", emoji:"🚫", grp:"cond", lvl:"B2",
    formula:"..., regardless of + N",
    when:"Дія відбудеться, не зважаючи на щось.",
    examples:[
      { en:"I'll come <b>regardless of</b> the weather.", uk:"Я прийду незалежно від погоди." },
      { en:"Everyone is welcome, <b>regardless of</b> age.", uk:"Усі запрошені, незалежно від віку." },
    ] },

  { pattern:"not to mention + N", uk:"не кажучи вже про", emoji:"➕", grp:"cond", lvl:"B2",
    formula:"..., not to mention + N",
    when:"Додаєш ще один аргумент / приклад як «бонус».",
    examples:[
      { en:"The food was great, <b>not to mention</b> the view.", uk:"Їжа була чудова, не кажучи вже про вид." },
      { en:"He's smart, <b>not to mention</b> handsome.", uk:"Він розумний, не кажучи вже про красивий." },
    ] },

  { pattern:"with the exception of + N", uk:"за винятком", emoji:"❗", grp:"cond", lvl:"B2",
    formula:"..., with the exception of + N",
    when:"Формальне «крім». Синонім «except for».",
    examples:[
      { en:"Everyone came, <b>with the exception of</b> John.", uk:"Прийшли всі, за винятком Джона." },
      { en:"The office is open every day, <b>with the exception of</b> Sunday.", uk:"Офіс відкритий щодня, крім неділі." },
    ] },

  { pattern:"either ___ or ___", uk:"або... або", emoji:"🔀", grp:"cond", lvl:"A2",
    formula:"Either + option A + or + option B",
    when:"Виражаєш два варіанти — один з двох.",
    examples:[
      { en:"You can <b>either</b> call me <b>or</b> text me.", uk:"Можеш або подзвонити, або написати." },
      { en:"<b>Either</b> we leave now <b>or</b> we miss the train.", uk:"Або ми йдемо зараз, або пропустимо поїзд." },
    ] },

  { pattern:"neither ___ nor ___", uk:"ні... ні", emoji:"🚫", grp:"cond", lvl:"B1",
    formula:"Neither + A + nor + B",
    when:"Заперечення обох варіантів. Формальніше за «not... or».",
    examples:[
      { en:"He's <b>neither</b> tall <b>nor</b> handsome.", uk:"Він ні високий, ні красивий." },
      { en:"I like <b>neither</b> coffee <b>nor</b> tea.", uk:"Мені не подобається ні кава, ні чай." },
    ],
    tip:"⚠️ Дієслово узгоджується з БЛИЖЧИМ субʼєктом: «Neither he nor his friends were there»." },

  { pattern:"the more so because ___", uk:"тим більше, що (посилення причини)", emoji:"💪", grp:"cond", lvl:"C1",
    formula:"..., the more so because + clause",
    when:"Формальне посилення причини — «і особливо тому, що».",
    examples:[
      { en:"His success is impressive, <b>the more so because</b> he had no support.", uk:"Його успіх вражає, тим більше що в нього не було підтримки." },
      { en:"The decision was difficult, <b>the more so because</b> time was limited.", uk:"Рішення було складним, тим більше що часу було обмаль." },
    ] },
];
const FILL_QS = [
  { ctx:"🕰️ Ти багато працював, щоб скласти іспит.", target:"I studied hard ___ pass the exam.", correct:"in order to", distractors:["because of","due to","as long as"], grp:"cause", uk:"Я багато вчився, щоб скласти іспит." },
  { ctx:"🕰️ Готуйся на випадок можливого дощу.", target:"Take an umbrella ___ it rains.", correct:"in case", distractors:["if","when","as long as"], grp:"cond", uk:"Візьми парасолю на випадок дощу." },
  { ctx:"🕰️ Ти живеш у місті з 2020.", target:"I've lived here ___ 2020.", correct:"since", distractors:["for","from","by"], grp:"time", uk:"Я живу тут з 2020." },
  { ctx:"🕰️ Ти працюєш вже 5 років.", target:"I've worked here ___ 5 years.", correct:"for", distractors:["since","from","during"], grp:"time", uk:"Я працюю тут 5 років." },
  { ctx:"⚡ Одразу як ти прийдеш додому.", target:"I'll call you ___ I get home.", correct:"as soon as", distractors:["by the time","not until","in case"], grp:"time", uk:"Я подзвоню, як тільки прийду додому." },
  { ctx:"⏳ Ти майже виходиш.", target:"I'm ___ leave — see you soon!", correct:"about to", distractors:["going to","used to","supposed to"], grp:"time", uk:"Я зараз виходжу — до зустрічі!" },
  { ctx:"🕰️ Ти вже давно звик до раннього пробудження.", target:"I'm ___ waking up early.", correct:"used to", distractors:["about to","going to","used"], grp:"time", uk:"Я звик прокидатись рано.", tip:"be used to + V-ing" },
  { ctx:"🕰️ Колись курив, але кинув.", target:"I ___ smoke, but I quit years ago.", correct:"used to", distractors:["am used to","was used to","going to"], grp:"time", uk:"Я колись курив, але кинув.", tip:"used to + V1 — колишня звичка" },
  { ctx:"🎯 Пояснюєш, чому запізнився.", target:"___ I'm late is traffic.", correct:"The reason", distractors:["It seems","As far as I know","In case"], grp:"logic", uk:"Причина, чому я запізнився — трафік." },
  { ctx:"🔦 Розкриваєш несподіване відкриття.", target:"___ he was lying the whole time.", correct:"It turns out", distractors:["It seems","As far as I know","There's no point"], grp:"logic", uk:"Виявляється, він увесь час брехав." },
  { ctx:"🌫️ М'яко висловлюєш припущення.", target:"___ she's not coming today.", correct:"It seems", distractors:["It turns out","In case","As long as"], grp:"logic", uk:"Здається, вона не прийде сьогодні." },
  { ctx:"🔍 Обмежуєш свою впевненість.", target:"___, they moved to Berlin.", correct:"As far as I know", distractors:["The reason is","It turns out","Not to mention"], grp:"logic", uk:"Наскільки я знаю, вони переїхали в Берлін." },
  { ctx:"🚫 Марно сперечатись — він не змінить думку.", target:"There's no point ___ arguing with him.", correct:"in", distractors:["to","of","for"], grp:"logic", uk:"Немає сенсу з ним сперечатись.", tip:"⚠️ Після «no point» — «in + V-ing»" },
  { ctx:"⚖️ Обидва зросту однакового.", target:"She's ___ tall ___ her brother.", correct:"as | as", distractors:["so | as","the same | as","more | than"], grp:"compare", uk:"Вона така сама висока, як її брат." },
  { ctx:"📈 Чим більше практикуєш — тим краще.", target:"___ you practice, ___ you get.", correct:"The more | the better", distractors:["More | better","As much | as good","So more | so good"], grp:"compare", uk:"Чим більше практикуєш, тим кращий стаєш." },
  { ctx:"🔀 Ти б краще пройшовся, ніж їхав автобусом.", target:"I'd walk ___ take the bus.", correct:"rather than", distractors:["instead","because","as long as"], grp:"compare", uk:"Я б краще пройшовся, ніж їхав автобусом." },
  { ctx:"↔️ На відміну від брата, він тихий.", target:"___ his brother, he's very quiet.", correct:"Unlike", distractors:["Similar to","As long as","Instead of"], grp:"compare", uk:"На відміну від брата, він дуже тихий." },
  { ctx:"➡️ Стрес спричиняє проблеми зі здоров'ям.", target:"Stress can ___ health problems.", correct:"lead to", distractors:["come from","prevent from","result from"], grp:"cause", uk:"Стрес може призводити до проблем зі здоров'ям." },
  { ctx:"🛑 Дощ не дав нам вийти.", target:"The rain prevented us ___ going out.", correct:"from", distractors:["to","of","in"], grp:"cause", uk:"Дощ не дав нам піти кудись.", tip:"prevent sb FROM + V-ing" },
  { ctx:"🎯 Мета цієї зустрічі — обговорити бюджет.", target:"The purpose ___ this meeting is to discuss the budget.", correct:"of", distractors:["for","in","to"], grp:"cause", uk:"Мета цієї зустрічі — обговорити бюджет." },
  { ctx:"⚖️ Умова — можеш лишитись скільки хочеш.", target:"You can stay ___ you want.", correct:"as long as", distractors:["in case","even if","otherwise"], grp:"cond", uk:"Можеш лишатись, скільки хочеш." },
  { ctx:"💪 Я піду, навіть якщо буде дощ.", target:"I'll go ___ it rains.", correct:"even if", distractors:["even though","in case","otherwise"], grp:"cond", uk:"Я піду, навіть якщо буде дощ.", tip:"«even if» — гіпотетика, «even though» — вже факт" },
  { ctx:"🔀 Або дзвониш, або пишеш.", target:"You can ___ call ___ text me.", correct:"either | or", distractors:["neither | nor","so | that","as | as"], grp:"cond", uk:"Можеш або подзвонити, або написати." },
  { ctx:"🚫 Ні високий, ні красивий.", target:"He's ___ tall ___ handsome.", correct:"neither | nor", distractors:["either | or","not | but","so | that"], grp:"cond", uk:"Він ні високий, ні красивий." },
  { ctx:"⚠️ Поспішай, інакше запізнимось.", target:"Hurry up, ___ we'll be late.", correct:"otherwise", distractors:["in case","even if","as long as"], grp:"cond", uk:"Поспішай, інакше запізнимось." },
];
const TR_QS = [
  { uk:"Я звик прокидатись рано.", answers:["I'm used to waking up early","I am used to waking up early"], hint:"be used to + V-ing" },
  { uk:"Я колись жив у Парижі.", answers:["I used to live in Paris"], hint:"used to + V1" },
  { uk:"Я зараз виходжу.", answers:["I'm about to leave","I am about to leave"], hint:"be about to" },
  { uk:"Мені потрібно 30 хвилин, щоб дістатись роботи.", answers:["It takes me 30 minutes to get to work","It takes me thirty minutes to get to work"], hint:"It takes me + time + to V1" },
  { uk:"Я подзвоню, як тільки прийду додому.", answers:["I'll call you as soon as I get home","I will call you as soon as I get home"], hint:"as soon as + Present" },
  { uk:"Виявляється, він мав рацію.", answers:["It turns out he was right","It turns out that he was right"], hint:"It turns out (that)" },
  { uk:"Причина, чому я запізнився — трафік.", answers:["The reason I'm late is traffic","The reason why I'm late is traffic","The reason I am late is traffic"], hint:"The reason ___ is ___" },
  { uk:"Наскільки я знаю, вони одружені.", answers:["As far as I know, they're married","As far as I know they're married","As far as I know, they are married"], hint:"As far as I know" },
  { uk:"Немає сенсу з ним сперечатись.", answers:["There's no point in arguing with him","There is no point in arguing with him"], hint:"There's no point in + V-ing" },
  { uk:"Вона така сама висока, як її брат.", answers:["She's as tall as her brother","She is as tall as her brother"], hint:"as ___ as" },
  { uk:"Чим більше вчиш, тим краще знаєш.", answers:["The more you study, the more you know","The more you study the more you know"], hint:"the more ___, the more ___" },
  { uk:"Я б краще пройшовся, ніж їхав.", answers:["I'd walk rather than drive","I would walk rather than drive"], hint:"rather than" },
  { uk:"Стрес призводить до хвороб.", answers:["Stress leads to illness","Stress leads to illnesses","Stress leads to diseases"], hint:"lead to + N" },
  { uk:"Можеш лишатись, поки не куриш.", answers:["You can stay as long as you don't smoke","You can stay as long as you do not smoke"], hint:"as long as" },
  { uk:"Візьми парасолю на випадок дощу.", answers:["Take an umbrella in case it rains"], hint:"in case + Present" },
  { uk:"Поспішай, інакше запізнимось.", answers:["Hurry up, otherwise we'll be late","Hurry up otherwise we'll be late","Hurry up, otherwise we will be late"], hint:"otherwise" },
];

const CATS = GRPS;
const MARKERS = CS.map(c => ({ name: c.pattern, uk: c.uk, emoji: c.emoji, cat: c.grp, lvl: c.lvl, reg: c.reg || 'neutral', when: c.when, formula: c.formula, examples: c.examples, tip: c.tip, vs: c.vs }));
const INTRO = "<div class=\"intro-box blue\">\n      <h3>🎯 Що це за тема і чому вона важлива?</h3>\n      <p><b>Constructions</b> — це «скелет» дорослого речення. Замість простого «I like X because Y», ти вживаєш «The reason I like X is because Y» / «What I like about X is that Y» / «X appeals to me due to the fact that Y».</p>\n      <p>Ці конструкції — <b>маркери рівня B2-C1</b>. Вони показують: ти не просто перекладаєш з української, ти <b>думаєш англійською структурами</b>. Це те, що відрізняє «непогане знання» від «вільного володіння».</p>\n      <p>Плюс: ці конструкції — <b>обов'язкові для IELTS/TOEFL/іспитів</b>, а також для роботи в англомовному середовищі (звіти, презентації, email).</p>\n    </div>\n\n    <div class=\"intro-box\">\n      <h3>🧠 5 груп функцій — стратегічна карта:</h3>\n      <ul>\n        <li>🕰️ <b>ЧАС</b> (10) — коли щось відбулось / буде: used to / going to / by the time / as soon as...</li>\n        <li>🧠 <b>ЛОГІКА / ДУМКА</b> (10) — виражаєш висновок, позицію: it turns out / the reason is / provided that...</li>\n        <li>📊 <b>ПОРІВНЯННЯ</b> (10) — показуєш різницю чи подібність: as...as / the more...the more / rather than...</li>\n        <li>🎯 <b>ПРИЧИНИ / РЕЗУЛЬТАТИ</b> (10) — показуєш «чому/що з цього»: due to / lead to / result in / prevent from...</li>\n        <li>⚖️ <b>УМОВИ</b> (10) — «якщо / незважаючи / за винятком»: as long as / regardless of / either...or / neither...nor...</li>\n      </ul>\n    </div>\n\n    <div class=\"intro-box purple\">\n      <h3>💡 Головна перевага цього тренажера</h3>\n      <p>Замість переліку правил, тут кожна конструкція має:</p>\n      <ul>\n        <li>📖 <b>Формулу</b> — точна структура (напр. «by the time + Past Simple, Past Perfect»)</li>\n        <li>🎯 <b>Коли вживати</b> — реальна ситуація</li>\n        <li>✅ <b>2-3 приклади</b> з підсвіченою конструкцією</li>\n        <li>⚠️ <b>Tip</b> з типовими помилками (напр. «not until» вимагає інверсії)</li>\n        <li>🌡️ <b>Регістр</b> — casual чи formal</li>\n      </ul>\n    </div>\n\n    <div class=\"intro-box green\">\n      <h3>📅 План: 3 тижні до автоматизму</h3>\n      <p><b>Тиждень 1:</b> 🕰️ ЧАС + 🧠 ЛОГІКА — по 2 конструкції на день.</p>\n      <p><b>Тиждень 2:</b> 📊 ПОРІВНЯННЯ + 🎯 ПРИЧИНИ.</p>\n      <p><b>Тиждень 3:</b> ⚖️ УМОВИ + повторення через Mix.</p>\n      <p>🎯 <b>Ритуал (20 хв/день):</b> 2 нові конструкції в браузері → 5 питань Fill Blank → 1 переклад.</p>\n    </div>\n\n    <h3 style=\"margin-bottom:10px;color:#0c4a6e\">🏛️ 5 груп — клацай для огляду:</h3>\n    <div class=\"grp-overview\"></div>";
const META = {"title":"🏛️ Advanced Constructions — конструкції за функціями","lead":"~55 «дорослих» конструкцій, згрупованих за <b>функцією у думці</b>: 🕰️ час, 🧠 логіка, 📊 порівняння, 🎯 причина/наслідок, ⚖️ умова. Це те, що робить мову <b>інтелектуальною</b>."};
return { CATS, MARKERS, FILL_QS, TR_QS, INTRO: INTRO, META: META };
})();
