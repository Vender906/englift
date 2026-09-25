/* EngLift — дані тренажера «would» (перенесено з would-all-uses-trainer.html). Вантажиться лише у своєму розділі. */
window.PHRASE_DATA = window.PHRASE_DATA || {};
window.PHRASE_DATA["would"] = (function () {
const USES = {
  conditional: { emoji:"🎲", label:"Hypothetical (умовне)",     desc:"уявна ситуація: «якби... я б...»",      formula:"If + Past, would + V1" },
  polite:      { emoji:"🎩", label:"Politeness (ввічливе)",     desc:"прохання, пропозиції, бажання",          formula:"Would you...? / I would like" },
  pastHabit:   { emoji:"🕰️", label:"Past habit (звичка в минулому)", desc:"повторювана дія в минулому (= used to)", formula:"When I was X, I would..." },
  reported:    { emoji:"📞", label:"Future-in-past (репортована)", desc:"майбутнє з точки зору минулого",      formula:"He said he would..." },
  refusal:     { emoji:"🚫", label:"Refusal (відмова)",          desc:"відмова в минулому (з річчю чи людиною)", formula:"wouldn't + V1" },
  preference:  { emoji:"⚖️", label:"Preference (перевага)",      desc:"«я б краще...»",                          formula:"I would rather / prefer" },
  wish:        { emoji:"🌟", label:"Wish (бажання)",             desc:"хочеш, щоб хтось щось робив (чи не)",     formula:"I wish + sb + would..." },
  character:   { emoji:"😤", label:"Characteristic (типова поведінка)", desc:"типово для людини (іноді з роздратуванням)", formula:"He would (V1)!" },
  pastProb:    { emoji:"🔮", label:"Past probability (припущення)", desc:"припущення про минуле",                  formula:"would + have + V3" },
  softOpinion: { emoji:"💭", label:"Soft opinion (м'яка думка)",  desc:"«я б сказав...», «я б подумав...»",       formula:"I would say / think" },
};
const ITEMS = [
  // ============= CONDITIONAL =============
  { pattern:"If + Past Simple, would + V1", uk:"якби (теперішнє/майбутнє нереальне)", use:"conditional", lvl:"B1", reg:"neutral",
    emoji:"🎲",
    when:"2nd conditional — гіпотеза про теперішнє/майбутнє. Подія НЕРЕАЛЬНА або МАЛОЙМОВІРНА.",
    examples:[
      { en:"If I <b>had</b> more time, I <b>would</b> travel more.", uk:"Якби в мене було більше часу, я б більше подорожував." },
      { en:"If I <b>were</b> you, I <b>would</b> apologize.", uk:"На твоєму місці я б вибачився." },
      { en:"What <b>would</b> you do if you <b>won</b> the lottery?", uk:"Що б ти робив, якби виграв лотерею?" },
    ],
    tip:"⚠️ «If I WERE» (НЕ «if I was» в формальній мові) — це subjunctive. У casual обидва ок." },

  { pattern:"If + Past Perfect, would have + V3", uk:"якби (минуле нереальне)", use:"conditional", lvl:"B2", reg:"neutral",
    emoji:"⏪",
    when:"3rd conditional — гіпотеза про МИНУЛЕ. Чого не сталось — і вже не станеться.",
    examples:[
      { en:"If I <b>had known</b>, I <b>would have</b> come.", uk:"Якби я знав, я б прийшов." },
      { en:"She <b>would have</b> passed if she <b>had studied</b>.", uk:"Вона б склала, якби вчилась." },
      { en:"What <b>would</b> you <b>have</b> done if you <b>had been</b> there?", uk:"Що б ти робив, якби був там?" },
    ],
    tip:"💡 У розмові часто скорочують: «would have» → «would've» (звучить як «would'a/woulda»)." },

  { pattern:"It would be (great/nice/easier) if...", uk:"було б (краще/легше), якби...", use:"conditional", lvl:"B1", reg:"neutral",
    emoji:"🌈",
    when:"М'яка пропозиція або побажання про щось, що ще не сталось.",
    examples:[
      { en:"It <b>would</b> be great if you <b>could</b> help.", uk:"Було б чудово, якби ти зміг допомогти." },
      { en:"It <b>would</b> be easier if we <b>met</b> tomorrow.", uk:"Було б простіше, якби ми зустрілись завтра." },
    ] },

  // ============= POLITENESS =============
  { pattern:"Would you...? / Would you mind...?", uk:"чи не могли б ви...?", use:"polite", lvl:"A2", reg:"neutral",
    emoji:"🎩",
    when:"Ввічливе прохання. Сильніше за «Can you?», м'якше за наказ.",
    examples:[
      { en:"<b>Would</b> you pass me the salt?", uk:"Передасте мені сіль?" },
      { en:"<b>Would</b> you mind opening the window?", uk:"Не могли б відкрити вікно?" },
      { en:"<b>Would</b> you close the door, please?", uk:"Закриєте, будь ласка, двері?" },
    ],
    tip:"⚠️ Після «Would you mind» → V-ing! «Would you mind closing» ✅, не «to close»." },

  { pattern:"I would like (to) / I'd like", uk:"я б хотів", emoji:"💜", use:"polite", lvl:"A2", reg:"neutral",
    when:"Ввічливе бажання. = «I want», але набагато ввічливіше. Не звучить агресивно.",
    examples:[
      { en:"I'<b>d</b> like a coffee, please.", uk:"Я б хотів каву, будь ласка." },
      { en:"I'<b>d</b> like to make a reservation.", uk:"Я б хотів зробити бронь." },
      { en:"<b>Would</b> you like some tea?", uk:"Не хочете чаю?" },
    ],
    tip:"💡 У ресторанах/магазинах ОБОВ'ЯЗКОВО «I would like», не «I want» — інакше звучить грубо." },

  { pattern:"I would love to / I'd love to", uk:"я б із задоволенням", emoji:"❤️", use:"polite", lvl:"A2", reg:"neutral",
    when:"Тепліше, ніж «I would like». Захоплено приймаєш пропозицію.",
    examples:[
      { en:"— Wanna join us? — I'<b>d</b> love to!", uk:"— Приєднаєшся? — Із задоволенням!" },
      { en:"I'<b>d</b> love to visit Japan someday.", uk:"Я б із задоволенням колись поїхав у Японію." },
    ] },

  { pattern:"Would you like to...?", uk:"чи не хочеш...?", emoji:"🤝", use:"polite", lvl:"A2", reg:"neutral",
    when:"Ввічливе запрошення / пропозиція.",
    examples:[
      { en:"<b>Would</b> you like to join us for dinner?", uk:"Не хочеш приєднатись до нас на вечерю?" },
      { en:"<b>Would</b> you like a ride home?", uk:"Може, тебе підвезти додому?" },
    ] },

  // ============= PAST HABIT =============
  { pattern:"When I was X, I would (V1)", uk:"коли я був... я зазвичай...", emoji:"🕰️", use:"pastHabit", lvl:"B1", reg:"neutral",
    when:"Повторювана дія в минулому. = «used to». ⚠️ ТІЛЬКИ для ДІЇ, НЕ для стану!",
    examples:[
      { en:"When I was a kid, we <b>would</b> spend summers at the lake.", uk:"Коли я був малий, ми проводили літо на озері." },
      { en:"My grandpa <b>would</b> tell me stories every night.", uk:"Дідусь розповідав мені казки щовечора." },
      { en:"Every Sunday, mom <b>would</b> make pancakes.", uk:"Щонеділі мама пекла млинці." },
    ],
    tip:"⚠️ <b>«I would live in Kyiv» — ПОМИЛКА!</b> Для СТАНУ кажи «I used to live». «Would» = тільки для повторюваних ДІЙ." },

  { pattern:"Every (day/week), sb would...", uk:"щодня/щотижня... зазвичай...", emoji:"🔁", use:"pastHabit", lvl:"B1", reg:"neutral",
    when:"Підкреслює регулярність звички. Часто з маркером часу.",
    examples:[
      { en:"Every morning he <b>would</b> read the newspaper.", uk:"Щоранку він читав газету." },
      { en:"On weekends, we <b>would</b> go hiking.", uk:"На вихідних ми ходили в походи." },
    ] },

  // ============= REPORTED =============
  { pattern:"He said (that) he would...", uk:"він сказав, що... (зробить)", emoji:"📞", use:"reported", lvl:"B1", reg:"neutral",
    when:"Future-in-past. Він казав про майбутнє з точки зору минулого моменту.",
    examples:[
      { en:"She said she <b>would</b> call me back.", uk:"Вона сказала, що передзвонить." },
      { en:"He promised he <b>wouldn't</b> tell anyone.", uk:"Він пообіцяв, що нікому не скаже." },
      { en:"They thought it <b>would</b> rain.", uk:"Вони думали, що буде дощ." },
    ],
    tip:"💡 «Will» у прямій мові → «would» у непрямій. «I will come» → «He said he would come»." },

  { pattern:"I knew/thought sth would happen", uk:"я знав/думав, що...", emoji:"🔮", use:"reported", lvl:"B1", reg:"neutral",
    when:"Передбачення, зроблене в минулому.",
    examples:[
      { en:"I knew you <b>would</b> say that.", uk:"Я знав, що ти так скажеш." },
      { en:"I had a feeling it <b>wouldn't</b> work.", uk:"У мене було відчуття, що це не спрацює." },
    ] },

  // ============= REFUSAL =============
  { pattern:"sth wouldn't + V1 (machines)", uk:"щось не хотіло (не працювало)", emoji:"🚫", use:"refusal", lvl:"B2", reg:"casual",
    when:"Машина/річ «відмовилась» працювати. Персоніфікація.",
    examples:[
      { en:"The car <b>wouldn't</b> start this morning.", uk:"Машина не хотіла заводитись сьогодні." },
      { en:"The door <b>wouldn't</b> close properly.", uk:"Двері не зачинялись як слід." },
      { en:"My laptop <b>wouldn't</b> turn on.", uk:"Ноутбук не вмикався." },
    ],
    tip:"⚠️ «Didn't start» — просто факт. «Wouldn't start» — з відтінком «я намагався, а воно ні»." },

  { pattern:"sb wouldn't + V1 (people)", uk:"хтось відмовлявся", emoji:"🙅", use:"refusal", lvl:"B1", reg:"neutral",
    when:"Хтось не хотів робити — і не робив. Минулий час до «refuse».",
    examples:[
      { en:"He <b>wouldn't</b> listen to me.", uk:"Він не хотів мене слухати." },
      { en:"She <b>wouldn't</b> tell me what happened.", uk:"Вона не хотіла розказати, що сталось." },
      { en:"They <b>wouldn't</b> let me in.", uk:"Вони не хотіли мене впускати." },
    ] },

  // ============= PREFERENCE =============
  { pattern:"I would rather (V1) than (V1)", uk:"я б краще... ніж...", emoji:"⚖️", use:"preference", lvl:"B1", reg:"neutral",
    when:"Вибір між двох варіантів. ⚠️ Після «rather» — V1 БЕЗ «to»!",
    examples:[
      { en:"I'<b>d</b> rather stay home than go out.", uk:"Я б краще лишився вдома, ніж пішов." },
      { en:"I'<b>d</b> rather die than apologize!", uk:"Краще б помер, ніж вибачився!" },
      { en:"<b>Would</b> you rather have tea or coffee?", uk:"Що б ти волів — чай чи каву?" },
    ],
    tip:"⚠️ «I'd rather to go» — ПОМИЛКА. Тільки «I'd rather GO» (без to)." },

  { pattern:"I would rather sb (Past Simple)", uk:"я б волів, щоб хтось...", emoji:"🔄", use:"preference", lvl:"B2", reg:"neutral",
    when:"Хочеш, щоб ІНША людина зробила чи не робила. ⚠️ Після — Past Simple!",
    examples:[
      { en:"I'<b>d</b> rather you <b>didn't</b> smoke here.", uk:"Я б волів, щоб ти тут не курив." },
      { en:"I'<b>d</b> rather she <b>came</b> earlier.", uk:"Я б волів, щоб вона прийшла раніше." },
    ],
    tip:"⚠️ Дивний граматичний нюанс: після «would rather + sb» іде Past Simple (хоча значення — теперішнє)." },

  { pattern:"I would prefer (to V1 / sth)", uk:"я б волів", emoji:"💎", use:"preference", lvl:"B1", reg:"formal",
    when:"Формальніше за «would rather». = I'd rather + інфінітив з to.",
    examples:[
      { en:"I'<b>d</b> prefer to wait outside.", uk:"Я б волів зачекати на вулиці." },
      { en:"I'<b>d</b> prefer tea, thanks.", uk:"Я б волів чай, дякую." },
    ] },

  // ============= WISH =============
  { pattern:"I wish (sb) would (V1)", uk:"якби ж тільки (хтось) робив / не робив", emoji:"🌟", use:"wish", lvl:"B2", reg:"neutral",
    when:"Хочеш, щоб ХТОСЬ ІНШИЙ змінив свою поведінку. Часто з відтінком роздратування.",
    examples:[
      { en:"I wish you <b>would</b> stop interrupting.", uk:"Якби ж ти перестав мене перебивати." },
      { en:"I wish it <b>would</b> rain — it's so hot.", uk:"Якби ж пішов дощ — так спекотно." },
      { en:"She wishes he <b>would</b> propose already.", uk:"Вона хотіла б, щоб він уже зробив пропозицію." },
    ],
    tip:"⚠️ <b>Не вживай «I wish I would»!</b> Про себе кажи «I wish I could» або «I wish I had». «Would» — тільки про інших." },

  // ============= CHARACTERISTIC =============
  { pattern:"sb would say/do that!", uk:"типово для нього/неї!", emoji:"😤", use:"character", lvl:"B2", reg:"casual",
    when:"Реакція з відтінком «звісно, що це від нього». Часто роздратовано.",
    examples:[
      { en:"He <b>would</b> say that!", uk:"Звісно, він так і скаже!" },
      { en:"She <b>would</b> forget her keys again!", uk:"Звісно, вона знову забуде ключі!" },
      { en:"That's just like him — he <b>would</b> do something like that.", uk:"Це в його стилі — щось таке зробити." },
    ],
    tip:"💡 Тут «would» = «це типово / характерно для нього». Часто з наголосом на «WOULD» в розмові." },

  // ============= PAST PROBABILITY =============
  { pattern:"That would have been...", uk:"це мабуть було... (припущення про минуле)", emoji:"🔮", use:"pastProb", lvl:"B2", reg:"neutral",
    when:"Робиш припущення про щось у минулому — на основі логіки/спогадів.",
    examples:[
      { en:"That <b>would have been</b> in 1990.", uk:"Це, мабуть, було в 1990." },
      { en:"He <b>would have been</b> about 5 at that time.", uk:"Йому, мабуть, було близько 5 тоді." },
    ] },

  { pattern:"It would have cost a fortune", uk:"це б коштувало цілий статок", emoji:"💸", use:"pastProb", lvl:"B2", reg:"neutral",
    when:"Гіпотетична оцінка минулої події (близько до 3rd conditional).",
    examples:[
      { en:"That trip <b>would have cost</b> a fortune.", uk:"Та подорож, мабуть, коштувала статок." },
      { en:"A new laptop <b>would have cost</b> me three months' salary back then.", uk:"Новий ноутбук коштував би мені тримісячну зарплату тоді." },
    ] },

  // ============= SOFT OPINION =============
  { pattern:"I would say (that)...", uk:"я б сказав, що...", emoji:"💭", use:"softOpinion", lvl:"B1", reg:"neutral",
    when:"М'яка / необов'язкова думка. Робить тебе менш категоричним.",
    examples:[
      { en:"I'<b>d</b> say it's overpriced.", uk:"Я б сказав, переоцінено." },
      { en:"I'<b>d</b> say about 50 people came.", uk:"Я б сказав, прийшло близько 50 людей." },
      { en:"I <b>wouldn't</b> say he's rude — just direct.", uk:"Я б не сказав, що він грубий — просто прямий." },
    ] },

  { pattern:"I would think / I would imagine", uk:"я б думав / я б уявляв", emoji:"🤔", use:"softOpinion", lvl:"B2", reg:"formal",
    when:"М'яке припущення без претензії на точність.",
    examples:[
      { en:"I'<b>d</b> think she's around 30.", uk:"Я б думав, їй близько 30." },
      { en:"I'<b>d</b> imagine that's expensive.", uk:"Я б уявляв, що це дорого." },
    ] },

  { pattern:"That would be nice / great", uk:"це було б чудово", emoji:"🌟", use:"softOpinion", lvl:"A2", reg:"neutral",
    when:"М'яка реакція на пропозицію — без жорсткого «yes».",
    examples:[
      { en:"— Coffee? — That <b>would</b> be lovely!", uk:"— Кави? — Це було б чудово!" },
      { en:"That <b>would</b> be great, thanks.", uk:"Це було б круто, дякую." },
    ] },
];
const FILL_QS = [
  { ctx:"Класичне 2nd conditional — гіпотеза про теперішнє.", target:"If I had more time, I ___ travel more.", correct:"would", distractors:["would have","wouldn't","would have been"], use:"conditional", uk:"Якби в мене було більше часу, я б більше подорожував." },
  { ctx:"3rd conditional — жаль про минуле.", target:"If I had known, I ___ called you.", correct:"would have", distractors:["would","wouldn't","wouldn't have"], use:"conditional", uk:"Якби я знав, я б тобі подзвонив." },
  { ctx:"Ввічливе прохання в ресторані.", target:"___ you pass me the salt, please?", correct:"Would", distractors:["Wouldn't","Would have","Did"], use:"polite", uk:"Передасте мені сіль, будь ласка?" },
  { ctx:"Розповідь про дитинство — звичка в минулому.", target:"Every summer, we ___ visit grandma at the lake.", correct:"would", distractors:["wouldn't","would have","'d have"], use:"pastHabit", uk:"Щоліта ми їздили до бабусі на озеро." },
  { ctx:"Машина зранку не хотіла заводитись.", target:"The car ___ start this morning.", correct:"wouldn't", distractors:["would","wouldn't have","didn't would"], use:"refusal", uk:"Машина не хотіла заводитись сьогодні." },
  { ctx:"Висловлюєш чисту перевагу — лишився б удома.", target:"I ___ rather stay home tonight.", correct:"would", distractors:["would have","wouldn't","'d have been"], use:"preference", uk:"Я б краще лишився сьогодні вдома." },
  { ctx:"Колега тебе перебиває — хочеш, щоб він перестав.", target:"I wish you ___ stop interrupting me.", correct:"would", distractors:["wouldn't","would have","did"], use:"wish", uk:"Якби ж ти перестав мене перебивати." },
  { ctx:"Друг сказав щось типове для нього — реакція з усмішкою.", target:"Ha, he ___ say that!", correct:"would", distractors:["wouldn't","would have","'d have been"], use:"character", uk:"Ха, типово для нього таке сказати!" },
  { ctx:"Намагаєшся згадати рік — припущення про минуле.", target:"That ___ been around 2010, I think.", correct:"would have", distractors:["would","wouldn't","'d be"], use:"pastProb", uk:"Це, мабуть, було близько 2010." },
  { ctx:"М'яка оцінка — не категорично.", target:"I ___ say the film is overrated.", correct:"would", distractors:["would have","wouldn't have","won't"], use:"softOpinion", uk:"Я б сказав, фільм переоцінений." },
  { ctx:"Передаєш чужу обіцянку (reported speech).", target:"She said she ___ call me back tomorrow.", correct:"would", distractors:["will","would have","wouldn't"], use:"reported", uk:"Вона сказала, що передзвонить мені завтра." },
  { ctx:"Ввічлива пропозиція другу.", target:"___ you like a cup of tea?", correct:"Would", distractors:["Will","Wouldn't","Would have"], use:"polite", uk:"Не хочеш чашку чаю?" },
  { ctx:"Хочеш, щоб ІНША людина не курила тут.", target:"I'd rather you ___ smoke in here.", correct:"didn't", distractors:["wouldn't","won't","don't"], use:"preference", uk:"Я б волів, щоб ти тут не курив.", tip:"⚠️ Після «I'd rather + sb» — Past Simple, тут didn't!" },
  { ctx:"Реакція на запрошення — тепло, із задоволенням.", target:"— Coffee? — That ___ be lovely!", correct:"would", distractors:["would have","won't","wouldn't"], use:"softOpinion", uk:"— Кави? — Це було б чудово!" },
];
const TR_QS = [
  { uk:"Я б краще лишився вдома.", answers:["I would rather stay home","I'd rather stay home","I would rather stay at home","I'd rather stay at home"], hint:"перевага (would rather + V1)", use:"preference" },
  { uk:"Він сказав, що передзвонить.", answers:["He said he would call back","He said he would call me back","He said he'd call back","He said he'd call me back"], hint:"репортована мова (future-in-past)", use:"reported" },
  { uk:"Машина не заводилась.", answers:["The car wouldn't start","The car would not start"], hint:"відмова (wouldn't)", use:"refusal" },
  { uk:"Я б із задоволенням пішов.", answers:["I would love to go","I'd love to go"], hint:"ввічливе бажання (would love)", use:"polite" },
  { uk:"Якби я знав, я б прийшов.", answers:["If I had known, I would have come","If I'd known, I'd have come","If I had known I would have come","If I'd known I would have come"], hint:"3rd conditional (минуле)", use:"conditional" },
  { uk:"Щоліта ми їздили до бабусі.", answers:["Every summer we would visit grandma","Every summer, we would visit grandma","Every summer we'd visit grandma","Every summer, we'd visit grandma"], hint:"звичка в минулому (would)", use:"pastHabit" },
  { uk:"Я б сказав, це переоцінено.", answers:["I would say it's overrated","I'd say it's overrated","I would say it is overrated","I'd say it is overrated"], hint:"м'яка думка (I would say)", use:"softOpinion" },
  { uk:"Чи не могли б ви передати сіль?", answers:["Would you pass the salt","Would you pass the salt please","Would you pass me the salt","Would you pass me the salt please"], hint:"ввічливе прохання (Would you...?)", use:"polite" },
  { uk:"Якби ж ти перестав кричати.", answers:["I wish you would stop shouting","I wish you'd stop shouting"], hint:"бажання змінити чужу поведінку (wish + would)", use:"wish" },
  { uk:"Це, мабуть, було в 1995.", answers:["That would have been in 1995","It would have been in 1995"], hint:"припущення про минуле (would have been)", use:"pastProb" },
];
const STORIES = [
  {
    title:"📖 My grandfather",
    text:"When I was a kid, every Sunday I {{would}} visit my grandpa. He {{would}} make pancakes and tell me stories. He {{would have been}} about 70 then. He {{would}} say: «If I {{were}} younger, I {{would}} travel the world.» I {{wish I could}} hear those stories one more time. If I {{had known}} how short life is, I {{would have}} visited him more often. To this day, I {{'d say}} he was the wisest man I ever met.",
    breakdown:[
      { phrase:"would visit", use:"🕰️ Past habit (повторювана дія)" },
      { phrase:"would make / tell", use:"🕰️ Past habit (звички дідуся)" },
      { phrase:"would have been", use:"🔮 Past probability (припущення про вік)" },
      { phrase:"would say", use:"🕰️ Past habit (часто казав)" },
      { phrase:"If I were... would travel", use:"🎲 2nd conditional (гіпотеза)" },
      { phrase:"I wish I could", use:"⚠️ Тут не would, бо про СЕБЕ!" },
      { phrase:"If I had known... would have visited", use:"🎲 3rd conditional (минулий жаль)" },
      { phrase:"I'd say", use:"💭 Soft opinion (м'яка думка)" },
    ],
    uk:"Коли я був малий, щонеділі я ходив до дідуся. Він пек млинці й розповідав мені історії. Йому тоді було, мабуть, років 70. Він казав: «Якби я був молодший, я б об'їздив увесь світ.» Якби ж я міг ще раз почути ті історії. Якби я знав, наскільки коротке життя — я б відвідував його частіше. Досі я б сказав, він був наймудрішою людиною, яку я знав."
  },
  {
    title:"📖 The job interview that didn't go well",
    text:"I had a job interview yesterday. The HR manager asked me: «{{Would}} you like coffee?» I said yes. Then she asked tough questions. I {{would say}} I wasn't ready. She wanted to know what I {{would do}} if I {{had}} a difficult client. I froze. I knew I {{wouldn't get}} the job. I {{wish I had}} prepared better. If I {{had practiced}} more, I {{would have answered}} smoothly. That night I told my wife: «I {{would rather}} forget today.» Typical me — I {{would}} mess up something this important!",
    breakdown:[
      { phrase:"Would you like coffee", use:"🎩 Politeness (ввічливе)" },
      { phrase:"I would say", use:"💭 Soft opinion (м'яко)" },
      { phrase:"what I would do if I had", use:"🎲 2nd conditional (гіпотетика)" },
      { phrase:"I wouldn't get the job", use:"📞 Future-in-past (передбачення)" },
      { phrase:"I wish I had prepared", use:"⚠️ Тут had — про себе!" },
      { phrase:"If I had practiced... would have answered", use:"🎲 3rd conditional (минулий жаль)" },
      { phrase:"I would rather forget", use:"⚖️ Preference (краще б)" },
      { phrase:"I would mess up", use:"😤 Characteristic (типова поведінка)" },
    ],
    uk:"Учора в мене була співбесіда. HR-менеджерка спитала: «Хочете кави?» Я сказав так. Потім вона ставила складні питання. Я б сказав, я був не готовий. Вона хотіла знати, що б я робив, якби мав складного клієнта. Я завис. Я знав, що не отримаю роботу. Якби ж я підготувався краще. Якби я більше тренувався, я б відповідав плавно. Тієї ночі я сказав дружині: «Я б краще забув сьогоднішній день.» Типово для мене — обов'язково напартачу там, де важливо!"
  },
  {
    title:"📖 The day my laptop died",
    text:"Yesterday morning my laptop {{wouldn't turn on}}. I tried everything. I knew I {{would lose}} my work if I didn't fix it. I called tech support: «{{Would}} you mind helping me?» They asked: «{{Would}} you have any backup?» Honestly, I {{wish I had}}. They said it {{would cost}} $300 to recover the data. Just my luck — Murphy's law {{would}} strike on the most important day. If I {{had backed up}} the files, I {{wouldn't have}} this problem. I {{'d rather}} pay than lose two weeks of work.",
    breakdown:[
      { phrase:"wouldn't turn on", use:"🚫 Refusal (річ не хотіла)" },
      { phrase:"would lose", use:"📞 Future-in-past (знав, що...)" },
      { phrase:"Would you mind", use:"🎩 Politeness (ввічливе прохання)" },
      { phrase:"Would you have", use:"🎩 Politeness (ввічливе питання)" },
      { phrase:"wish I had", use:"⚠️ wish + had (про себе)" },
      { phrase:"would cost $300", use:"🔮 Past probability / гіпотетика" },
      { phrase:"Murphy's law would strike", use:"😤 Characteristic (типово)" },
      { phrase:"If had backed up... wouldn't have", use:"🎲 Mixed conditional" },
      { phrase:"I'd rather pay", use:"⚖️ Preference" },
    ],
    uk:"Учора зранку мій ноутбук не хотів вмикатись. Я все спробував. Знав, що втрачу всю роботу, якщо не полагоджу. Подзвонив у техпідтримку: «Не могли б ви допомогти?» Вони спитали: «У вас є резервна копія?» Чесно, краще б була. Сказали, що відновити дані коштуватиме $300. Звісно ж — закон Мерфі обов'язково спрацює в найважливіший день. Якби я зробив бекап, у мене б не було цієї проблеми. Я б краще заплатив, ніж втратив два тижні роботи."
  },
  {
    title:"📖 If I won the lottery",
    text:"Sometimes I daydream about winning the lottery. If I {{won}}, I {{would quit}} my job immediately. I {{'d travel}} for a year — Japan, Italy, New Zealand. I {{wouldn't tell}} anyone — people get weird about money. I {{'d buy}} my mom a house — she always {{would say}} «If I {{had money}}, I {{'d retire}} early.» Friends ask me: «{{Would}} you really stop working?» I {{'d say}} yes, but honestly, I {{would probably}} get bored. Money {{would}} solve some problems and create new ones. {{Wouldn't}} that be a nice problem to have!",
    breakdown:[
      { phrase:"If I won, would quit", use:"🎲 2nd conditional" },
      { phrase:"I'd travel", use:"🎲 Conditional (продовження гіпотетики)" },
      { phrase:"wouldn't tell anyone", use:"🎲 Conditional (наслідок)" },
      { phrase:"would say (mom)", use:"🕰️ Past habit (мама часто казала)" },
      { phrase:"If I had... I'd retire", use:"🎲 2nd conditional (всередині цитати)" },
      { phrase:"Would you really stop", use:"🎩 Politeness (питання)" },
      { phrase:"I'd say yes", use:"💭 Soft opinion" },
      { phrase:"would probably get bored", use:"🎲 Conditional (припущення)" },
      { phrase:"Wouldn't that be nice", use:"💭 Soft opinion (риторичне)" },
    ],
    uk:"Іноді я мрію про виграш у лотерею. Якби я виграв, я б одразу звільнився з роботи. Я б подорожував рік — Японія, Італія, Нова Зеландія. Я б нікому не казав — люди стають дивними з грошима. Я б купив мамі дім — вона завжди казала: «Якби в мене були гроші, я б рано пішла на пенсію.» Друзі питають: «Ти б реально перестав працювати?» Я б сказав так, але чесно — мабуть, мені б стало нудно. Гроші вирішують одні проблеми і створюють нові. Хіба ж це не приємна проблема!"
  },
];

const CATS = {};
Object.keys(USES).forEach(k => { CATS[k] = { emoji: USES[k].emoji, label: USES[k].label, desc: USES[k].desc, formula: USES[k].formula }; });
const MARKERS = ITEMS.map(i => ({ name: i.pattern, uk: i.uk, emoji: i.emoji, cat: i.use, lvl: i.lvl, reg: i.reg, when: i.when, formula: i.formula, examples: i.examples, tip: i.tip, vs: i.vs }));
const INTRO = "<div class=\"intro-box red\">\n      <h3>🚫 Чому \"would\" так часто пропускають / неправильно вживають?</h3>\n      <p>Бо вчителі дають його як «б би (умовний спосіб)» — і все. Але насправді у would <b>10 різних значень</b>, які <b>лише виглядають однаково</b>. Послухай, наскільки різні ситуації:</p>\n      <ul style=\"font-style:italic\">\n        <li>«I <b>would</b> love to go.» — Я б із задоволенням пішов. (вічливе бажання)</li>\n        <li>«<b>Would</b> you pass the salt?» — Передайте, будь ласка, сіль. (ввічливе прохання)</li>\n        <li>«Every summer we <b>would</b> visit grandma.» — Щоліта ми їздили до бабусі. (звичка в минулому = used to)</li>\n        <li>«He said he <b>would</b> come.» — Він сказав, що прийде. (репортована мова = future-in-past)</li>\n        <li>«The car <b>wouldn't</b> start.» — Машина не заводилась. (відмова в минулому)</li>\n        <li>«I <b>would</b> rather stay home.» — Я б краще лишився вдома. (перевага)</li>\n        <li>«I wish you <b>wouldn't</b> shout.» — Якби ж ти не кричав. (бажання змінити чужу поведінку)</li>\n        <li>«He <b>would</b> say that!» — Звісно він би так сказав! (типова поведінка / роздратовано)</li>\n        <li>«That <b>would</b> have been in 1990.» — Це мало б бути у 1990. (припущення про минуле)</li>\n        <li>«I <b>would</b> say it's overrated.» — Я б сказав, переоцінено. (м'яка думка)</li>\n      </ul>\n      <p>Бачиш? Це <b>не одне дієслово</b> — це 10 різних. І нейтиви крутять ними щодня.</p>\n    </div>\n\n    <div class=\"intro-box purple\">\n      <h3>🎯 Чому ці 10 значень — це твій секретний рівень?</h3>\n      <p>Більшість українців, навіть з гарною граматикою, використовують would тільки в 2 значеннях: <b>«I would like»</b> та <b>«Would you like»</b>. Це 20% потенціалу.</p>\n      <p>Коли освоїш усі 10 — твоя мова <b>стає на рівень B2-C1 одразу</b>, бо ти:</p>\n      <ul>\n        <li>📞 Можеш переказувати чужі слова (reported speech)</li>\n        <li>🕰️ Розповідаєш про дитинство природно (would as past habit)</li>\n        <li>🎩 Звучиш ввічливо без переборщення (would for politeness)</li>\n        <li>💭 Висловлюєш гіпотези й думки м'яко (would for hypothesis)</li>\n        <li>😤 Робиш живі ремарки про людей («She would say that!»)</li>\n      </ul>\n    </div>\n\n    <div class=\"intro-box\">\n      <h3>📋 Швидкий cheat sheet — форми would</h3>\n      <table class=\"cheat-table\">\n        <tr><th>Форма</th><th>Що виражає</th><th>Приклад</th></tr>\n        <tr><td class=\"form-cell\">would + V1</td><td>теперішнє/майбутнє гіпотетичне</td><td>I would say...</td></tr>\n        <tr><td class=\"form-cell\">would + have + V3</td><td>минуле гіпотетичне (3rd conditional)</td><td>I would have called.</td></tr>\n        <tr><td class=\"form-cell\">wouldn't + V1</td><td>відмова в минулому</td><td>He wouldn't listen.</td></tr>\n        <tr><td class=\"form-cell\">would have been V-ing</td><td>гіпотетичний процес у минулому</td><td>I would have been sleeping.</td></tr>\n        <tr><td class=\"form-cell\">'d (скорочення)</td><td>= would або had</td><td>I'd love to. / He'd seen it.</td></tr>\n      </table>\n      <p>⚠️ <b>'d може бути would АБО had</b>. Контекст вирішує:</p>\n      <ul>\n        <li>«I'd love to» = I <b>would</b> love to (love — V1)</li>\n        <li>«He'd been there» = He <b>had</b> been (been — V3)</li>\n      </ul>\n    </div>\n\n    <div class=\"intro-box green\">\n      <h3>📅 План: 2 тижні до повного володіння would</h3>\n      <p><b>Тиждень 1:</b> Освой 5 базових значень (Conditional / Politeness / Past habit / Reported / Preference). 1 значення на день.</p>\n      <p><b>Тиждень 2:</b> Решта 5 (Refusal / Wish / Characteristic / Past probability / Soft opinion). + Story Method.</p>\n      <p>🎯 <b>Ритуал (15 хв/день):</b> 1 значення в браузері → 1 вправа на нього → 1 раз вголос усі приклади.</p>\n    </div>\n\n    <h3 style=\"margin-bottom:10px;color:#4c1d95\">🌀 10 значень WOULD — клацай для огляду:</h3>\n    <div class=\"use-overview\"></div>";
const META = {"title":"🌀 WOULD — усі 10 значень одного слова","lead":"«Would» — це <b>швейцарський ніж</b> англійської. Одне слово виконує 10 різних функцій: умовне, ввічливе прохання, звичка в минулому, репортована мова, відмова, перевага, бажання, припущення, м'яка думка, характерна поведінка."};
return { CATS, MARKERS, FILL_QS, TR_QS, STORIES, INTRO: INTRO, META: META };
})();
