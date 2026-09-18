/* EngLift — дані тренажера «intensifiers» (перенесено з intensifiers-trainer.html). Вантажиться лише у своєму розділі. */
window.PHRASE_DATA = window.PHRASE_DATA || {};
window.PHRASE_DATA["intensifiers"] = (function () {
const CATS = {
  standard: { emoji:"⚡", label:"Стандартні",           desc:"basic intensifiers, most versatile" },
  extreme:  { emoji:"💥", label:"Extreme-only",         desc:"only with extreme adjectives" },
  soft:     { emoji:"🌫️", label:"М'які / Weak",         desc:"softeners, зменшують силу" },
  emotive:  { emoji:"😤", label:"Емоційні",              desc:"з емоцією: freaking, damn" },
  quantity: { emoji:"📊", label:"Кількісні",             desc:"way, far, much (для порівнянь)" },
  formal:   { emoji:"🎩", label:"Формальні",             desc:"highly, extremely — для роботи" },
  socr:     { emoji:"⚖️", label:"SO / SUCH",             desc:"особливі структури" },
};
const ITEMS = [
  // ============= LEVEL 1 - WEAK =============
  { word:"a bit", uk:"трохи", emoji:"🌫️", cat:"soft", power:1, lvl:"A2", reg:"casual",
    when:"Легке підсилення. «Трохи», «дещо». Часто перед negative adj (tired, cold, sad) — щоб пом'якшити скаргу.",
    examples:[
      { en:"I'm <b>a bit</b> tired.", uk:"Я трохи втомлений." },
      { en:"It's <b>a bit</b> cold in here.", uk:"Тут дещо холодно." },
      { en:"He's <b>a bit</b> weird.", uk:"Він трохи дивний." },
    ],
    goesWith:["tired","cold","weird","sad","late","expensive","strange"],
    tip:"💡 Casual синонім «a little». «A bit» — більш британське, «a little» — універсальне." },

  { word:"a little", uk:"трохи / небагато", emoji:"🌱", cat:"soft", power:1, lvl:"A2", reg:"neutral",
    when:"= a bit. М'яко пом'якшує. Універсальне.",
    examples:[
      { en:"I'm <b>a little</b> nervous.", uk:"Я трохи нервуюсь." },
      { en:"She's <b>a little</b> shy.", uk:"Вона дещо сором'язлива." },
    ],
    goesWith:["nervous","shy","tired","confused"] },

  { word:"slightly", uk:"злегка / трохи", emoji:"🪶", cat:"soft", power:1, lvl:"B1", reg:"neutral",
    when:"Формальніше за «a bit». Часто в описах, звітах, для точності.",
    examples:[
      { en:"The prices are <b>slightly</b> higher this year.", uk:"Ціни трохи вищі цього року." },
      { en:"I'm <b>slightly</b> confused.", uk:"Я злегка збентежений." },
    ],
    goesWith:["higher","different","confused","better","worse"] },

  { word:"kind of / kinda", uk:"типу / трохи", emoji:"🤏", cat:"soft", power:1, lvl:"A2", reg:"casual",
    when:"Дуже casual. Пом'якшує заяву — «трохи», «типу». В розмовній «kinda».",
    examples:[
      { en:"It's <b>kind of</b> weird.", uk:"Воно якось дивно." },
      { en:"I'm <b>kinda</b> hungry.", uk:"Я типу голодний." },
    ],
    goesWith:["weird","funny","cool","hungry","tired"],
    tip:"💡 Casual — з друзями ок, з босом — краще замінити на «a bit» / «somewhat»." },

  { word:"sort of / sorta", uk:"наче / типу", emoji:"〰️", cat:"soft", power:1, lvl:"B1", reg:"casual",
    when:"= kind of. Casual. Пом'якшує невпевненість.",
    examples:[
      { en:"I <b>sort of</b> like it.", uk:"Мені воно наче подобається." },
      { en:"She's <b>sorta</b> my friend.", uk:"Вона типу моя подруга." },
    ] },

  { word:"fairly", uk:"досить", emoji:"⚖️", cat:"standard", power:1, lvl:"B1", reg:"neutral",
    when:"Легке-середнє підсилення. Часто в описах, оцінках.",
    examples:[
      { en:"It's <b>fairly</b> simple.", uk:"Це досить просто." },
      { en:"He's <b>fairly</b> new here.", uk:"Він тут досить недавно." },
    ],
    goesWith:["simple","easy","obvious","new","common"] },

  { word:"somewhat", uk:"дещо", emoji:"🌗", cat:"soft", power:1, lvl:"B2", reg:"formal",
    when:"Формальне «трохи». Обережне пом'якшення в письмі/бізнесі.",
    examples:[
      { en:"I'm <b>somewhat</b> disappointed.", uk:"Я дещо розчарований." },
      { en:"The results are <b>somewhat</b> better.", uk:"Результати дещо кращі." },
    ] },

  // ============= LEVEL 2 - MEDIUM =============
  { word:"quite", uk:"досить / доволі", emoji:"💧", cat:"standard", power:2, lvl:"A2", reg:"neutral",
    when:"⚠️ Обережно! У BR = «досить, помірно», в AmE = «дуже». Контекст вирішує.",
    examples:[
      { en:"It's <b>quite</b> good.", uk:"Це досить гарно. (BR) / Це дуже гарно. (AmE)" },
      { en:"She's <b>quite</b> tall.", uk:"Вона досить висока." },
      { en:"That's <b>quite</b> a story!", uk:"Оце так історія!" },
    ],
    goesWith:["good","interesting","tall","difficult","nice"],
    warn:"⚠️ Британець скаже «quite good» і мати на увазі «непогано». Американець скаже «quite good» = «дуже добре». Не використовуй з extreme adj." },

  { word:"pretty", uk:"досить / достатньо", emoji:"💜", cat:"standard", power:2, lvl:"A2", reg:"casual",
    when:"⚠️ ОБМАН! «Pretty» тут — це НЕ «гарний»! А «досить, достатньо». Casual, дуже частий.",
    examples:[
      { en:"It's <b>pretty</b> good.", uk:"Це досить непогано." },
      { en:"I'm <b>pretty</b> tired.", uk:"Я досить втомлений." },
      { en:"That's <b>pretty</b> cool.", uk:"Це досить круто." },
    ],
    goesWith:["good","cool","tired","nice","hard","easy","sure"],
    tip:"💡 Слабший за «very», сильніший за «a bit». «Pretty good» = «нічого собі, непогано»." },

  { word:"rather", uk:"доволі", emoji:"🎩", cat:"standard", power:2, lvl:"B1", reg:"formal",
    when:"Британське й формальніше. Часто перед негативним adj — «rather annoying», «rather cold».",
    examples:[
      { en:"It's <b>rather</b> cold today.", uk:"Сьогодні доволі холодно." },
      { en:"She's <b>rather</b> shy.", uk:"Вона доволі сором'язлива." },
    ],
    goesWith:["cold","difficult","expensive","annoying","strange"] },

  // ============= LEVEL 3 - STRONG =============
  { word:"very", uk:"дуже", emoji:"⚡", cat:"standard", power:3, lvl:"A1", reg:"neutral",
    when:"Найбазовіший підсилювач. Універсальний. ⚠️ Не використовуй з extreme adj!",
    examples:[
      { en:"It's <b>very</b> cold.", uk:"Дуже холодно." },
      { en:"She's <b>very</b> tired.", uk:"Вона дуже втомлена." },
      { en:"This is <b>very</b> important.", uk:"Це дуже важливо." },
    ],
    goesWith:["cold","hot","tired","good","bad","important","nice","interesting","difficult","easy"],
    warn:"❌ Не кажи «very amazing», «very freezing», «very perfect». Ці слова вже «дуже»." },

  { word:"really", uk:"дійсно / реально", emoji:"🎯", cat:"standard", power:3, lvl:"A1", reg:"neutral",
    when:"Синонім «very», але більш емоційне. Може використовуватись з БУДЬ-ЯКИМИ прикметниками (навіть extreme).",
    examples:[
      { en:"It's <b>really</b> good.", uk:"Це реально круто." },
      { en:"I'm <b>really</b> tired.", uk:"Я реально втомлений." },
      { en:"That's <b>really</b> amazing!", uk:"Це реально неймовірно!" },
    ],
    goesWith:["good","bad","cool","amazing","tired","fun","cold"],
    tip:"💡 «Really» — королівське рішення. Працює скрізь: really good (gradable) і really amazing (extreme). Коли сумніваєшся — обирай really." },

  { word:"so", uk:"такий / так", emoji:"🌟", cat:"socr", power:3, lvl:"A1", reg:"neutral",
    when:"⚠️ Тільки перед ADJ (без noun)! «So + adj». Емоційне, теплe.",
    examples:[
      { en:"You're <b>so</b> kind!", uk:"Ти такий добрий!" },
      { en:"It's <b>so</b> hot today.", uk:"Сьогодні так спекотно!" },
      { en:"I'm <b>so</b> happy for you.", uk:"Я так рада за тебе." },
    ],
    goesWith:["kind","hot","happy","tired","good","bad","cold"],
    warn:"❌ «So a good film» — ПОМИЛКА! Якщо є noun → SUCH. Якщо тільки adj → SO." },

  { word:"super", uk:"супер / дуже", emoji:"🚀", cat:"standard", power:3, lvl:"A2", reg:"casual",
    when:"Casual. Молодіжне. Дуже частий у розмовній.",
    examples:[
      { en:"It's <b>super</b> easy!", uk:"Це супер легко!" },
      { en:"She's <b>super</b> friendly.", uk:"Вона супер дружелюбна." },
      { en:"That's <b>super</b> cool!", uk:"Це супер круто!" },
    ],
    goesWith:["easy","cool","friendly","cute","fast","hot","cold"] },

  { word:"seriously", uk:"серйозно / реально", emoji:"💪", cat:"emotive", power:3, lvl:"B1", reg:"casual",
    when:"Casual емоційне підсилення. Часто з негативним відтінком.",
    examples:[
      { en:"I'm <b>seriously</b> tired.", uk:"Я реально втомлений." },
      { en:"This is <b>seriously</b> annoying.", uk:"Це серйозно бісить." },
    ] },

  { word:"terribly / awfully", uk:"жахливо / страшенно", emoji:"😱", cat:"standard", power:3, lvl:"B2", reg:"formal",
    when:"Британське, формальне. Використовується з POSITIVE adj (парадокс!): «terribly nice», «awfully kind».",
    examples:[
      { en:"That's <b>terribly</b> kind of you.", uk:"Це страшенно мило з твого боку." },
      { en:"I'm <b>awfully</b> sorry.", uk:"Мені жахливо прикро." },
    ],
    tip:"💡 Парадокс: «terribly» означає «дуже», навіть у позитивному контексті. «Terribly nice» = «дуже мило»." },

  // ============= LEVEL 4 - VERY STRONG =============
  { word:"incredibly", uk:"неймовірно", emoji:"🔥", cat:"standard", power:4, lvl:"B1", reg:"neutral",
    when:"Сильне підсилення. Емоційне. Універсальне.",
    examples:[
      { en:"She's <b>incredibly</b> smart.", uk:"Вона неймовірно розумна." },
      { en:"It's <b>incredibly</b> expensive.", uk:"Це неймовірно дорого." },
    ],
    goesWith:["smart","expensive","difficult","beautiful","fast","impressive"] },

  { word:"extremely", uk:"надзвичайно", emoji:"🎯", cat:"formal", power:4, lvl:"B1", reg:"formal",
    when:"Формальне. Часто в новинах, звітах, роботі.",
    examples:[
      { en:"It's <b>extremely</b> important.", uk:"Це надзвичайно важливо." },
      { en:"She's <b>extremely</b> talented.", uk:"Вона надзвичайно талановита." },
    ],
    goesWith:["important","talented","difficult","dangerous","rare"] },

  { word:"highly", uk:"дуже (формально)", emoji:"🎩", cat:"formal", power:4, lvl:"B2", reg:"formal",
    when:"Тільки з певними adj: recommended, likely, unlikely, unusual, sensitive, respected.",
    examples:[
      { en:"<b>Highly</b> recommended!", uk:"Дуже рекомендую!" },
      { en:"It's <b>highly</b> unlikely.", uk:"Це вкрай малоймовірно." },
      { en:"He's a <b>highly</b> respected doctor.", uk:"Він дуже поважаний лікар." },
    ],
    goesWith:["recommended","likely","unlikely","unusual","sensitive","respected","paid"],
    warn:"⚠️ Обмежене використання! «Highly cold» — не кажуть." },

  { word:"particularly", uk:"особливо", emoji:"🌟", cat:"formal", power:4, lvl:"B1", reg:"formal",
    when:"«Особливо» — виділяє одне з-поміж інших.",
    examples:[
      { en:"I'm <b>particularly</b> proud of this.", uk:"Я особливо пишаюся цим." },
      { en:"It's not <b>particularly</b> difficult.", uk:"Це не особливо складно." },
    ],
    goesWith:["proud","interesting","difficult","good","careful"] },

  { word:"remarkably", uk:"на диво", emoji:"👀", cat:"formal", power:4, lvl:"C1", reg:"formal",
    when:"Формальне «дивовижно / на диво». Часто з несподіваними якостями.",
    examples:[
      { en:"She's <b>remarkably</b> calm.", uk:"Вона на диво спокійна." },
      { en:"The film was <b>remarkably</b> good.", uk:"Фільм був на диво хороший." },
    ] },

  // ============= LEVEL 5 - MAXIMUM =============
  { word:"absolutely", uk:"абсолютно / повністю", emoji:"💥", cat:"extreme", power:5, lvl:"A2", reg:"neutral",
    when:"⚠️ ТІЛЬКИ з EXTREME adj! Універсальний Level 5.",
    examples:[
      { en:"It's <b>absolutely</b> amazing!", uk:"Це абсолютно неймовірно!" },
      { en:"I'm <b>absolutely</b> exhausted.", uk:"Я повністю виснажений." },
      { en:"That's <b>absolutely</b> ridiculous.", uk:"Це абсолютно смішно." },
    ],
    goesWith:["amazing","exhausted","freezing","ridiculous","perfect","impossible","brilliant","stunning"],
    warn:"❌ «Absolutely good» — дивно! Тільки з EXTREME." },

  { word:"totally", uk:"повністю / цілком", emoji:"💯", cat:"extreme", power:5, lvl:"A2", reg:"casual",
    when:"Casual = absolutely. Молодіжне.",
    examples:[
      { en:"That's <b>totally</b> awesome!", uk:"Це повністю круто!" },
      { en:"I'm <b>totally</b> in love with it.", uk:"Я повністю закохалась у це." },
      { en:"You're <b>totally</b> right.", uk:"Ти абсолютно правий." },
    ],
    goesWith:["awesome","amazing","different","wrong","right","crazy","in love"] },

  { word:"completely", uk:"повністю", emoji:"🔴", cat:"extreme", power:5, lvl:"A2", reg:"neutral",
    when:"= totally, absolutely. Універсальний Level 5.",
    examples:[
      { en:"I'm <b>completely</b> lost.", uk:"Я повністю загубився." },
      { en:"She was <b>completely</b> shocked.", uk:"Вона була повністю вражена." },
    ],
    goesWith:["lost","shocked","different","wrong","impossible","full","empty"] },

  { word:"utterly", uk:"вкрай / зовсім", emoji:"🔥", cat:"formal", power:5, lvl:"B2", reg:"formal",
    when:"Формальне, драматичне. Часто з негативними екстремами.",
    examples:[
      { en:"It's <b>utterly</b> ridiculous.", uk:"Це вкрай смішно." },
      { en:"I'm <b>utterly</b> confused.", uk:"Я зовсім спантеличений." },
    ],
    goesWith:["ridiculous","confused","impossible","useless","disgusting"] },

  { word:"entirely", uk:"цілковито", emoji:"⭕", cat:"formal", power:5, lvl:"B2", reg:"formal",
    when:"Формальне. Часто «entirely different», «entirely up to you».",
    examples:[
      { en:"That's <b>entirely</b> up to you.", uk:"Це цілком на твій розсуд." },
      { en:"It's <b>entirely</b> possible.", uk:"Це цілком можливо." },
    ] },

  // ============= EMOTIVE / SLANG =============
  { word:"freaking / frickin'", uk:"чортовськи (пом'якшене)", emoji:"😤", cat:"emotive", power:5, lvl:"B1", reg:"casual",
    when:"Емоційне, casual. Пом'якшена версія «f***ing». З друзями ок, у бізнесі — ні.",
    examples:[
      { en:"That's <b>freaking</b> awesome!", uk:"Це чортовськи круто!" },
      { en:"I'm <b>freaking</b> tired!", uk:"Я жутко втомлений!" },
    ],
    warn:"⚠️ Casual. Не використовуй у формальних контекстах / з незнайомцями." },

  { word:"damn", uk:"чортовськи", emoji:"⚡", cat:"emotive", power:4, lvl:"B1", reg:"casual",
    when:"Casual емоційне. Позитивне («damn good») або негативне («damn expensive»).",
    examples:[
      { en:"That's <b>damn</b> good coffee!", uk:"Це чортовськи гарна кава!" },
      { en:"It's <b>damn</b> cold today.", uk:"Сьогодні чортовськи холодно." },
    ],
    warn:"⚠️ Casual. Легка обсценність — з друзями ок." },

  { word:"bloody (BR)", uk:"чортовськи (брит.)", emoji:"🇬🇧", cat:"emotive", power:4, lvl:"B2", reg:"casual",
    when:"Британське casual. AmE його не використовує так.",
    examples:[
      { en:"It's <b>bloody</b> brilliant!", uk:"Це чортовськи блискуче!" },
      { en:"That's <b>bloody</b> expensive.", uk:"Це чортовськи дорого." },
    ] },

  { word:"dead (BR)", uk:"мертво / надзвичайно (брит.)", emoji:"💀", cat:"emotive", power:4, lvl:"B2", reg:"casual",
    when:"Британське casual. «Dead easy» = «дуже легко». «Dead tired» = «жутко втомлений».",
    examples:[
      { en:"It's <b>dead</b> easy!", uk:"Це проще простого!" },
      { en:"I'm <b>dead</b> tired.", uk:"Я мертвецьки втомлений." },
    ],
    goesWith:["easy","tired","serious","boring","simple"] },

  // ============= QUANTITY / COMPARATIVE =============
  { word:"way", uk:"набагато (AmE)", emoji:"🚀", cat:"quantity", power:4, lvl:"B1", reg:"casual",
    when:"⚠️ Особливе! Використовується з COMPARATIVE (better, cooler) або «too» (way too much). Casual.",
    examples:[
      { en:"This is <b>way</b> better!", uk:"Це набагато краще!" },
      { en:"It's <b>way</b> too expensive.", uk:"Це занадто дорого." },
      { en:"That's <b>way</b> cooler than mine.", uk:"Це набагато крутіше за моє." },
    ],
    goesWith:["better","worse","cooler","hotter","too much","too expensive","too far"],
    tip:"💡 Формула: WAY + comparative adj / WAY + too + adj. Не «way good», а «way better»." },

  { word:"much / a lot", uk:"набагато", emoji:"📊", cat:"quantity", power:3, lvl:"A2", reg:"neutral",
    when:"З comparative — універсальний «набагато». = way (більш нейтральний).",
    examples:[
      { en:"This is <b>much</b> better.", uk:"Це набагато краще." },
      { en:"It's <b>a lot</b> harder than I thought.", uk:"Це набагато складніше, ніж я думав." },
    ],
    goesWith:["better","worse","harder","easier","more","less"] },

  { word:"far", uk:"набагато / далеко", emoji:"🏹", cat:"quantity", power:4, lvl:"B1", reg:"neutral",
    when:"Формальніше за «way». З comparative.",
    examples:[
      { en:"This is <b>far</b> more interesting.", uk:"Це набагато цікавіше." },
      { en:"He's <b>far</b> better than me.", uk:"Він набагато кращий за мене." },
    ] },

  // ============= JUST =============
  { word:"just", uk:"просто / вже", emoji:"🎯", cat:"emotive", power:4, lvl:"A2", reg:"neutral",
    when:"⚠️ Магічне слово. «Just amazing» = «просто неймовірно». Робить фразу емоційнішою.",
    examples:[
      { en:"It's <b>just</b> perfect!", uk:"Це просто ідеально!" },
      { en:"She's <b>just</b> incredible.", uk:"Вона просто неймовірна." },
      { en:"I'm <b>just</b> exhausted.", uk:"Я просто виснажений." },
    ],
    goesWith:["perfect","amazing","incredible","brilliant","exhausted","stunning"],
    tip:"💡 «Just» додає ноту захвату або емоційності. Часто перед extreme adj." },

  { word:"simply", uk:"просто (формальне)", emoji:"💎", cat:"formal", power:4, lvl:"B1", reg:"formal",
    when:"Формальніша версія «just».",
    examples:[
      { en:"It's <b>simply</b> perfect.", uk:"Це просто ідеально." },
      { en:"The view was <b>simply</b> stunning.", uk:"Вид був просто приголомшливим." },
    ] },

  // ============= SUCH =============
  { word:"such", uk:"такий (перед іменником)", emoji:"⚖️", cat:"socr", power:3, lvl:"A2", reg:"neutral",
    when:"⚠️ Тільки перед NOUN! Формула: SUCH + (a) + adj + noun.",
    examples:[
      { en:"It's <b>such</b> a nice day!", uk:"Такий гарний день!" },
      { en:"She's <b>such</b> a talented person.", uk:"Вона така талановита людина." },
      { en:"That's <b>such</b> good news!", uk:"Це така гарна новина! (news — uncountable, немає «a»)" },
    ],
    warn:"❌ «Such cold» без noun — ПОМИЛКА! Використай «so cold» замість цього." },
];
const GRAD_PAIRS = [
  { gradable:"good", extreme:"amazing", extreme_alts:["brilliant","fantastic"], uk:"добрий → неймовірний" },
  { gradable:"bad", extreme:"awful", extreme_alts:["terrible","horrible"], uk:"поганий → жахливий" },
  { gradable:"cold", extreme:"freezing", extreme_alts:["frozen"], uk:"холодний → крижаний" },
  { gradable:"hot", extreme:"boiling", extreme_alts:["roasting","scorching"], uk:"гарячий → пекучий" },
  { gradable:"tired", extreme:"exhausted", extreme_alts:["drained","wiped"], uk:"втомлений → виснажений" },
  { gradable:"hungry", extreme:"starving", extreme_alts:["famished"], uk:"голодний → вмираю з голоду" },
  { gradable:"big", extreme:"huge", extreme_alts:["enormous","massive","gigantic"], uk:"великий → величезний" },
  { gradable:"small", extreme:"tiny", extreme_alts:["minuscule"], uk:"маленький → крихітний" },
  { gradable:"pretty", extreme:"gorgeous", extreme_alts:["stunning","beautiful"], uk:"гарний → приголомшливий" },
  { gradable:"funny", extreme:"hilarious", extreme_alts:["hysterical"], uk:"смішний → до сліз смішний" },
  { gradable:"scary", extreme:"terrifying", extreme_alts:["horrifying"], uk:"страшний → жахаючий" },
  { gradable:"surprised", extreme:"shocked", extreme_alts:["astonished","astounded"], uk:"здивований → вражений" },
  { gradable:"interesting", extreme:"fascinating", extreme_alts:["captivating"], uk:"цікавий → захоплюючий" },
  { gradable:"angry", extreme:"furious", extreme_alts:["livid","enraged"], uk:"злий → розлючений" },
  { gradable:"dirty", extreme:"filthy", extreme_alts:["disgusting"], uk:"брудний → мерзенно брудний" },
  { gradable:"clean", extreme:"spotless", extreme_alts:["immaculate"], uk:"чистий → ідеально чистий" },
  { gradable:"important", extreme:"crucial", extreme_alts:["vital","essential"], uk:"важливий → критично важливий" },
  { gradable:"difficult", extreme:"impossible", extreme_alts:["insurmountable"], uk:"складний → неможливий" },
  { gradable:"easy", extreme:"effortless", extreme_alts:["simple"], uk:"легкий → без зусиль" },
];
const INT_QS = [
  { uk:"Легко втомлений", context:"🌫️ Не сильно, а трохи. Ти можеш продовжувати.", correct:"a bit", distractors:["absolutely","freaking","incredibly"], power:1, adj:"tired" },
  { uk:"Повністю виснажений (максимум!)", context:"💥 Ти на межі. Найсильніше можливе.", correct:"absolutely", distractors:["a bit","fairly","quite"], power:5, adj:"exhausted" },
  { uk:"Досить холодно", context:"💧 Не дуже, але помітно.", correct:"quite", distractors:["absolutely","freaking","utterly"], power:2, adj:"cold" },
  { uk:"Дуже добрий (стандартно)", context:"⚡ Просто «дуже», без екстрему.", correct:"very", distractors:["absolutely","totally","utterly"], power:3, adj:"good" },
  { uk:"Просто неймовірний (з емоцією!)", context:"💥 Extreme adj + emotive.", correct:"absolutely", distractors:["a bit","quite","fairly"], power:5, adj:"amazing" },
  { uk:"Досить розумний (casual)", context:"💜 Обманне слово — не «гарний», а «досить».", correct:"pretty", distractors:["absolutely","utterly","incredibly"], power:2, adj:"smart" },
  { uk:"Супер швидко (casual)", context:"🚀 Молодіжне посилення.", correct:"super", distractors:["utterly","highly","particularly"], power:3, adj:"fast" },
  { uk:"Набагато краще (порівняння)", context:"📊 З comparative adj. AmE casual.", correct:"way", distractors:["absolutely","very","so"], power:4, adj:"better" },
  { uk:"Крижаний холод (з extreme)", context:"💥 «Freezing» — extreme. Треба Level 5.", correct:"absolutely", distractors:["very","really cold","pretty"], power:5, adj:"freezing" },
  { uk:"Дуже добре рекомендую (формально)", context:"🎩 Формальне посилення.", correct:"highly", distractors:["absolutely","freaking","damn"], power:4, adj:"recommended" },
  { uk:"Трохи дивно (пом'якшити)", context:"🌫️ Ти не хочеш скаржитись сильно.", correct:"a bit", distractors:["absolutely","utterly","freaking"], power:1, adj:"weird" },
  { uk:"Реально круто (казуально, емоційно)", context:"🎯 Універсальне, працює з усім.", correct:"really", distractors:["highly","utterly","somewhat"], power:3, adj:"cool" },
  { uk:"Просто ідеально (з захопленням)", context:"🎯 «Just» + extreme adj.", correct:"just", distractors:["very","quite","kind of"], power:4, adj:"perfect" },
  { uk:"Занадто дорого (casual)", context:"🚀 WAY + too + adj.", correct:"way", distractors:["quite","absolutely","freaking"], power:4, adj:"too expensive" },
  { uk:"Надзвичайно важливо (робота)", context:"🎩 Формальне.", correct:"extremely", distractors:["kind of","pretty","damn"], power:4, adj:"important" },
];
const SS_QS = [
  { sentence:"It's ___ cold today!", correct:"so", uk:"Сьогодні так холодно!", explain:"Немає іменника після → SO + adj" },
  { sentence:"It's ___ a cold day!", correct:"such", uk:"Такий холодний день!", explain:"Є іменник (day) → SUCH + a + adj + noun" },
  { sentence:"She's ___ beautiful.", correct:"so", uk:"Вона така красива.", explain:"Немає noun → SO + adj" },
  { sentence:"She's ___ a beautiful girl.", correct:"such", uk:"Вона така красива дівчина.", explain:"Є noun (girl) → SUCH + a + adj + noun" },
  { sentence:"This is ___ good food!", correct:"such", uk:"Це така смачна їжа!", explain:"Є noun (food, uncountable → без «a») → SUCH + adj + noun" },
  { sentence:"You're ___ kind!", correct:"so", uk:"Ти такий добрий!", explain:"Немає noun → SO" },
  { sentence:"You're ___ a kind person.", correct:"such", uk:"Ти така добра людина.", explain:"Є noun (person) → SUCH" },
  { sentence:"I'm ___ tired I could sleep for a week.", correct:"so", uk:"Я так втомлений, що міг би спати тиждень.", explain:"«So ___ that» — конструкція. Немає noun → SO" },
  { sentence:"It was ___ an amazing experience!", correct:"such", uk:"Це був такий неймовірний досвід!", explain:"Є noun (experience) → SUCH + an + adj + noun" },
  { sentence:"The weather is ___ nice today.", correct:"so", uk:"Погода сьогодні така гарна.", explain:"Немає noun у цьому фрагменті → SO + adj" },
  { sentence:"We had ___ a great time!", correct:"such", uk:"Ми так чудово провели час!", explain:"Є noun (time) → SUCH" },
  { sentence:"That movie was ___ funny!", correct:"so", uk:"Той фільм був такий смішний!", explain:"Немає noun → SO" },
  { sentence:"He gave me ___ good advice.", correct:"such", uk:"Він дав мені таку хорошу пораду.", explain:"Advice — uncountable → SUCH + adj + noun (без «a»)" },
  { sentence:"It's ___ hot in here!", correct:"so", uk:"Тут так жарко!", explain:"Немає noun → SO" },
  { sentence:"They are ___ lovely people.", correct:"such", uk:"Вони такі милі люди.", explain:"Є noun (people, plural → без «a») → SUCH" },
];
const DIALOGUES = [
  {
    title:"❄️ Про погоду",
    parts:[
      { who:"them", text:"How's it outside?" },
      { who:"you", text:"It's ___ freezing! I can barely feel my fingers.", correct:"absolutely", options:["absolutely","very","a bit","pretty"], note:"«Freezing» — extreme → Level 5" },
      { who:"them", text:"Wow. I'm not going out then." },
      { who:"you", text:"Yeah, it's ___ a cold day.", correct:"such", options:["such","so","very","really"], note:"Є noun (day) → SUCH" },
      { who:"them", text:"Any plans for later?" },
      { who:"you", text:"I'm ___ tired, honestly. Just gonna watch a film.", correct:"pretty", options:["pretty","absolutely","utterly","freaking"], note:"«Досить» — Level 2, casual" },
    ],
    uk:"— Як там надворі? — Абсолютно крижаний холод! Я пальців не відчуваю. — Ого. Тоді я не виходжу. — Так, такий холодний день. — Плани на пізніше? — Досить втомлений, чесно. Просто подивлюсь фільм."
  },
  {
    title:"🎬 Обговорюємо фільм",
    parts:[
      { who:"them", text:"So, how was the new Nolan film?" },
      { who:"you", text:"Oh my god, it was ___ amazing!", correct:"absolutely", options:["absolutely","very","a bit","fairly"], note:"«Amazing» — extreme → Level 5" },
      { who:"them", text:"Really? I heard it was long." },
      { who:"you", text:"It is ___ long, yeah — almost 3 hours.", correct:"pretty", options:["pretty","absolutely","utterly","freaking"], note:"«Довгий» — досить, Level 2" },
      { who:"them", text:"Hmm, too much for me." },
      { who:"you", text:"But it's ___ a good story! You'll love it.", correct:"such", options:["such","so","very","kind of"], note:"Є noun (story) → SUCH" },
      { who:"them", text:"OK, I'll give it a try." },
      { who:"you", text:"Awesome! It's ___ worth it, trust me.", correct:"totally", options:["totally","a bit","quite","kind of"], note:"«Повністю» — Level 5, casual" },
    ],
    uk:"— Ну як новий Нолан? — Господи, він абсолютно неймовірний! — Правда? Кажуть, він довгий. — Він досить довгий, так — майже 3 години. — Хм, для мене забагато. — Але це така гарна історія! Тобі сподобається. — Ок, спробую. — Круто! Воно повністю того варте, повір."
  },
  {
    title:"💼 Про нову роботу",
    parts:[
      { who:"them", text:"How's the new job?" },
      { who:"you", text:"Honestly, it's ___ good so far.", correct:"pretty", options:["pretty","absolutely","utterly","freaking"], note:"«Досить» — Level 2, casual" },
      { who:"them", text:"Nice! What about the team?" },
      { who:"you", text:"They're ___ friendly. I got lucky.", correct:"super", options:["super","absolutely","utterly","kind of"], note:"«Супер» — Level 3, casual" },
      { who:"them", text:"And the work?" },
      { who:"you", text:"It's ___ interesting, actually. Not boring at all.", correct:"quite", options:["quite","absolutely","utterly","freaking"], note:"«Досить» — Level 2, більш нейтральне" },
      { who:"them", text:"Any downsides?" },
      { who:"you", text:"The commute is ___ too long. That's the only issue.", correct:"way", options:["way","very","so","really"], note:"«Way + too + adj» — американська конструкція" },
    ],
    uk:"— Як нова робота? — Чесно, поки досить непогано. — Круто! А команда? — Вони супер дружелюбні. Мені пощастило. — А сама робота? — Досить цікава, насправді. Зовсім не нудна. — Мінуси? — Дорога занадто довга. Це єдина проблема."
  },
  {
    title:"🍕 У ресторані",
    parts:[
      { who:"them", text:"How's your pasta?" },
      { who:"you", text:"Oh, it's ___ delicious! Try some.", correct:"absolutely", options:["absolutely","a bit","fairly","kind of"], note:"«Delicious» — extreme → Level 5" },
      { who:"them", text:"Wow, you're right. It IS good." },
      { who:"you", text:"And the wine is ___ good too.", correct:"really", options:["really","utterly","kind of","somewhat"], note:"«Реально добре» — Level 3" },
      { who:"them", text:"This place is a find!" },
      { who:"you", text:"Yeah, it's ___ a nice spot for a date.", correct:"such", options:["such","so","very","really"], note:"Є noun (spot) → SUCH" },
    ],
    uk:"— Як твоя паста? — О, вона абсолютно смачна! Спробуй. — Вау, ти правий. Реально смачно. — І вино теж реально гарне. — Це місце — знахідка! — Так, таке гарне місце для побачення."
  },
];

const MARKERS = ITEMS.map(i => ({ name: i.word, uk: i.uk, emoji: i.emoji, cat: i.cat, lvl: i.lvl, reg: i.reg, when: i.when, examples: i.examples, tip: i.tip, vs: i.vs, power: i.power, goes: i.goes }));
const INTRO = "<div class=\"intro-box orange\">\n      <h3>🎯 Що таке intensifiers і чому вони критично важливі?</h3>\n      <p><b>Intensifier</b> — слово, яке підсилює прикметник. «Cold» → «very cold» → «absolutely freezing». Це те, що робить твою мову <b>живою й емоційною</b>, а не рівною й нудною.</p>\n      <p>Без підсилювачів ти говориш як робот: «It is cold. I am tired. The film was good.» З ними: «It's absolutely freezing! I'm super tired. The film was really good.» — <b>жива людина</b>.</p>\n      <p>⚠️ Але тут <b>купа підводних каменів</b>: не всі підсилювачі поєднуються з усіма прикметниками. «Very amazing» = помилка. «Absolutely good» = дивно звучить. У цьому тренажері ти навчишся все робити правильно.</p>\n    </div>\n\n    <div class=\"intro-box\">\n      <h3>🌡️ Шкала сили — 5 рівнів</h3>\n      <div class=\"scale-visual\">\n        <div class=\"scale-bar\">\n          <div class=\"scale-level lv1\">\n            <span class=\"lv-num\">1️⃣</span>\n            <div class=\"lv-name\">WEAK</div>\n            <div class=\"lv-ex\">a bit, slightly, fairly</div>\n          </div>\n          <div class=\"scale-level lv2\">\n            <span class=\"lv-num\">2️⃣</span>\n            <div class=\"lv-name\">MEDIUM</div>\n            <div class=\"lv-ex\">quite, pretty, rather</div>\n          </div>\n          <div class=\"scale-level lv3\">\n            <span class=\"lv-num\">3️⃣</span>\n            <div class=\"lv-name\">STRONG</div>\n            <div class=\"lv-ex\">very, really, so, super</div>\n          </div>\n          <div class=\"scale-level lv4\">\n            <span class=\"lv-num\">4️⃣</span>\n            <div class=\"lv-name\">VERY STRONG</div>\n            <div class=\"lv-ex\">incredibly, extremely</div>\n          </div>\n          <div class=\"scale-level lv5\">\n            <span class=\"lv-num\">5️⃣</span>\n            <div class=\"lv-name\">MAXIMUM</div>\n            <div class=\"lv-ex\">absolutely, totally</div>\n          </div>\n        </div>\n        <p style=\"text-align:center;font-size:12px;color:#64748b;margin-top:8px;font-style:italic\">👆 Клацай на рівень, щоб побачити всі підсилювачі цієї сили</p>\n      </div>\n    </div>\n\n    <div class=\"intro-box red\">\n      <h3>💥 Gradable vs Extreme adjectives — <b>найважливіше правило!</b></h3>\n      <p>Прикметники в англійській діляться на <b>дві групи</b>. Правило залізне: не поєднуй Level 5 підсилювачі з Gradable, і не поєднуй Level 3 підсилювачі з Extreme:</p>\n      <table class=\"grad-table\">\n        <tr><th>🟢 GRADABLE (звичайні)</th><th>🔴 EXTREME (уже містять «дуже»)</th><th>Правило</th></tr>\n        <tr><td class=\"grad\">good</td><td class=\"extr\">amazing / brilliant</td><td class=\"use\">good = «нормально». amazing = «дуже добре». Тому «very amazing» ❌</td></tr>\n        <tr><td class=\"grad\">bad</td><td class=\"extr\">awful / terrible</td><td class=\"use\">bad = «погано». awful = «жахливо».</td></tr>\n        <tr><td class=\"grad\">cold</td><td class=\"extr\">freezing</td><td class=\"use\">freezing вже = «дуже холодно»</td></tr>\n        <tr><td class=\"grad\">hot</td><td class=\"extr\">boiling / roasting</td><td class=\"use\">boiling = «неймовірно спекотно»</td></tr>\n        <tr><td class=\"grad\">tired</td><td class=\"extr\">exhausted</td><td class=\"use\">exhausted = «виснажений»</td></tr>\n        <tr><td class=\"grad\">hungry</td><td class=\"extr\">starving</td><td class=\"use\">starving = «вмираю з голоду»</td></tr>\n        <tr><td class=\"grad\">big</td><td class=\"extr\">huge / enormous</td><td class=\"use\">huge вже = «величезний»</td></tr>\n        <tr><td class=\"grad\">small</td><td class=\"extr\">tiny</td><td class=\"use\">tiny вже = «крихітний»</td></tr>\n        <tr><td class=\"grad\">nice / pretty</td><td class=\"extr\">gorgeous / stunning</td><td class=\"use\">gorgeous = «неймовірно гарний»</td></tr>\n        <tr><td class=\"grad\">funny</td><td class=\"extr\">hilarious</td><td class=\"use\">hilarious = «до сліз смішний»</td></tr>\n        <tr><td class=\"grad\">scary</td><td class=\"extr\">terrifying</td><td class=\"use\">terrifying = «жахливо страшний»</td></tr>\n        <tr><td class=\"grad\">surprised</td><td class=\"extr\">astonished / shocked</td><td class=\"use\">shocked = «вражений до глибини»</td></tr>\n      </table>\n      <div class=\"compare-grid\">\n        <div class=\"compare-box bad\">\n          <h4>❌ Так НЕ можна:</h4>\n          <p>❌ very amazing → уже містить «дуже»</p>\n          <p>❌ very freezing → freezing = «дуже холодно»</p>\n          <p>❌ absolutely good → занадто сильно для «good»</p>\n          <p>❌ really enormous → enormous = «дуже великий»</p>\n          <p>❌ very perfect → perfect = «ідеальний»</p>\n        </div>\n        <div class=\"compare-box good\">\n          <h4>✅ А так — треба:</h4>\n          <p>✅ <b>absolutely</b> amazing / totally amazing</p>\n          <p>✅ <b>absolutely</b> freezing / really freezing</p>\n          <p>✅ <b>very</b> good / really good / pretty good</p>\n          <p>✅ <b>absolutely</b> enormous</p>\n          <p>✅ just perfect / simply perfect</p>\n        </div>\n      </div>\n      <p><b>🔑 Правило-рятівник:</b> Level 5 (absolutely, totally, completely) + Extreme adj. Level 1-3 (very, really, quite) + Gradable adj. Легко!</p>\n    </div>\n\n    <div class=\"intro-box purple\">\n      <h3>⚖️ SO vs SUCH — рятує 90% помилок</h3>\n      <p>Два підсилювачі, які <b>роблять те саме</b>, але за <b>різними формулами</b>:</p>\n      <table class=\"grad-table\">\n        <tr><th>SO</th><th>SUCH</th></tr>\n        <tr><td class=\"grad\">SO + adj</td><td class=\"extr\">SUCH + (a) + adj + noun</td></tr>\n        <tr><td>It's <b>so cold</b>!</td><td>It's <b>such a cold</b> day!</td></tr>\n        <tr><td>She's <b>so beautiful</b>.</td><td>She's <b>such a beautiful</b> girl.</td></tr>\n        <tr><td>This is <b>so good</b>!</td><td>This is <b>such good</b> food! <small>(uncount → no «a»)</small></td></tr>\n      </table>\n      <p><b>Простий тест:</b> Є іменник після? → SUCH. Немає іменника? → SO.</p>\n      <div class=\"compare-grid\">\n        <div class=\"compare-box bad\">\n          <h4>❌ Помилки українців:</h4>\n          <p>❌ It's <b>so a cold day</b></p>\n          <p>❌ It's <b>such cold</b></p>\n          <p>❌ She's <b>such beautiful</b></p>\n        </div>\n        <div class=\"compare-box good\">\n          <h4>✅ Правильно:</h4>\n          <p>✅ It's <b>so cold</b> / It's <b>such a cold day</b></p>\n          <p>✅ It's <b>so cold</b> (немає noun)</p>\n          <p>✅ She's <b>so beautiful</b> / She's <b>such a beautiful girl</b></p>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"intro-box green\">\n      <h3>💪 Особливі підсилювачі</h3>\n      <ul>\n        <li>🇺🇸 <b>WAY</b> — американський: «way too much», «way better», «way cooler». Дуже casual.</li>\n        <li>💥 <b>FREAKING / DAMN / BLOODY (BR)</b> — емоційні («damn good», «bloody amazing»). ⚠️ У formal — уникай.</li>\n        <li>😤 <b>DEAD</b> (BR) — «dead easy», «dead tired». Дуже британське.</li>\n        <li>🎯 <b>JUST</b> — м'яке підсилення: «just perfect», «just amazing» (додає емоції).</li>\n        <li>💜 <b>PRETTY</b> — обманний! Не «гарний», а «досить»: «pretty good» = «нічого собі», «pretty tired» = «досить втомлений».</li>\n      </ul>\n    </div>\n\n    <div class=\"intro-box\">\n      <h3>📅 План: 1-2 тижні до вільного володіння</h3>\n      <p><b>Дн 1-2:</b> 🌡️ Level 3 (really, very, so, super) — базові підсилювачі.</p>\n      <p><b>Дн 3:</b> ⚖️ SO vs SUCH — відразу після базових, поки свіжо.</p>\n      <p><b>Дн 4:</b> 💥 Extreme adjectives + Level 5 (absolutely, totally).</p>\n      <p><b>Дн 5:</b> 🌫️ Level 1-2 (a bit, quite, pretty) — тонкі відтінки.</p>\n      <p><b>Дн 6-7:</b> 💬 Діалоги + Mix.</p>\n    </div>\n\n    <h3 style=\"margin-bottom:10px;color:#7c2d12\">📚 Категорії підсилювачів — клацай для огляду:</h3>\n    <div class=\"cat-overview\"></div>";
const META = {"title":"🔥 Intensifiers — підсилювачі (so / such / very / absolutely / way)","lead":"Слова, які <b>підсилюють</b> прикметники: від легкого «a bit cold» до максимального «absolutely freezing». 🌡️ <b>Шкала 1-5</b> + правила SO vs SUCH + Gradable vs Extreme adjectives."};
return { CATS, MARKERS, GRAD_PAIRS, INT_QS, SS_QS, DIALOGUES, INTRO: INTRO, META: META };
})();
