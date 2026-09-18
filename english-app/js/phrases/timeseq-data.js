/* EngLift — дані тренажера «timeseq» (перенесено без змін з оригінального HTML). Вантажиться лише у своєму розділі. */
window.PHRASE_DATA = window.PHRASE_DATA || {};
window.PHRASE_DATA["timeseq"] = (function () {
const CATS = {
  when:      { emoji:"📅", label:"When — коли саме сталося",       desc:"the other day, back in 2020, ever since, way back when" },
  sequence:  { emoji:"🔢", label:"Sequence — послідовність",       desc:"first of all, then, after that, eventually, in the end" },
  simul:     { emoji:"⏸️", label:"Simultaneous — одночасність",    desc:"meanwhile, while I was ...ing, at the same time" },
  sudden:    { emoji:"💥", label:"Sudden — раптовість",             desc:"all of a sudden, out of nowhere, before I knew it" },
  duration:  { emoji:"⏳", label:"Duration/Gap — тривалість / пауза", desc:"by the time, up until, it wasn't long before, from then on" },
  habit:     { emoji:"🔁", label:"Habit — звичка в минулому",       desc:"used to, would often, every now and then" },
  dramatic:  { emoji:"🎬", label:"Dramatic — драматичний твіст",    desc:"little did I know, no sooner had I ..., only to" },
};

/* =====================================================
   DISCOURSE MARKERS — 80+
   { name, uk, emoji, cat, lvl, reg, when, formula?, examples:[{en,uk}], tip?, vs? }
   ===================================================== */
const MARKERS = [
  // ============= WHEN (Коли саме) =============
  { name:"the other day", uk:"нещодавно / днями", emoji:"📅", cat:"when", lvl:"A2", reg:"neutral",
    formula:"The other day, + past tense clause",
    when:"⭐ Стандартний storytelling-старт. «Днями», «на днях» — про недавнє минуле (кілька днів / до тижня тому). Не про точну дату.",
    examples:[
      { en:"<b>The other day</b>, I ran into my old teacher.", uk:"Днями я випадково зустрів свого старого вчителя." },
      { en:"<b>The other day</b>, I was walking home when it started raining.", uk:"Нещодавно я йшов додому, коли почався дощ." },
      { en:"I saw her <b>the other day</b> at the store.", uk:"Я бачив її днями в магазині." },
    ],
    tip:"💡 Ідеальний зачин для щоденникового запису. Не потребує точної дати — просто «недавно»." },

  { name:"a couple of days ago", uk:"кілька днів тому", emoji:"📅", cat:"when", lvl:"A2", reg:"neutral",
    formula:"A couple of days/weeks/months ago, + past tense",
    when:"Конкретніше за «the other day». Можна варіювати: a couple of weeks/months/years ago.",
    examples:[
      { en:"<b>A couple of days ago</b>, I got an interesting email.", uk:"Кілька днів тому мені прийшов цікавий лист." },
      { en:"<b>A couple of weeks ago</b>, we moved to a new place.", uk:"Кілька тижнів тому ми переїхали." },
    ] },

  { name:"back in", uk:"ще в / давно в", emoji:"📅", cat:"when", lvl:"A2", reg:"neutral",
    formula:"Back in + year/period, + clause",
    when:"⭐ Про далеке минуле — рік, десятиліття, школа, універ. «Ще у 2015...», «Ще в школі...».",
    examples:[
      { en:"<b>Back in 2015</b>, I lived in Kyiv.", uk:"Ще у 2015 я жив у Києві." },
      { en:"<b>Back in school</b>, I hated math.", uk:"Ще в школі я ненавидів математику." },
      { en:"<b>Back in the day</b>, we didn't have smartphones.", uk:"Раніше, за старих часів, у нас не було смартфонів." },
    ],
    tip:"💡 «Back in the day» — ідіома «за старих часів», без конкретного року." },

  { name:"way back when", uk:"дуже давно, коли...", emoji:"📅", cat:"when", lvl:"B2", reg:"casual",
    formula:"..., way back when + clause",
    when:"Ностальгічно, з посмішкою. «Ще тоді, коли...». Casual.",
    examples:[
      { en:"I remember, <b>way back when</b> we were kids, everything felt magical.", uk:"Пам'ятаю, ще давно, коли ми були дітьми — все здавалося чарівним." },
      { en:"That was <b>way back when</b> I first started this job.", uk:"Це було ще давно, коли я тільки почав цю роботу." },
    ] },

  { name:"ever since", uk:"відтоді, як", emoji:"📅", cat:"when", lvl:"B1", reg:"neutral",
    formula:"Ever since + clause/noun, + present perfect",
    when:"⭐ Точка відліку в минулому → результат триває досі. Часто з Present Perfect.",
    examples:[
      { en:"<b>Ever since</b> I moved here, I've felt at home.", uk:"Відтоді, як я переїхав сюди, я почуваюся вдома." },
      { en:"<b>Ever since</b> that day, we haven't spoken.", uk:"Відтоді ми не розмовляли." },
      { en:"I've loved music <b>ever since</b> I was a kid.", uk:"Я люблю музику з самого дитинства." },
    ],
    tip:"💡 Не плутай зі «since». «Ever since» = сильніший акцент на початковій точці." },

  { name:"it's been ... since", uk:"минуло ..., відколи", emoji:"📅", cat:"when", lvl:"B1", reg:"neutral",
    formula:"It's been + [period] + since + past tense",
    when:"Про проміжок часу від події до зараз. Ідеально для щоденника.",
    examples:[
      { en:"<b>It's been three years since</b> we last met.", uk:"Минуло три роки, відколи ми востаннє бачились." },
      { en:"<b>It's been ages since</b> I felt so alive.", uk:"Минула вічність, відколи я почувався таким живим." },
    ] },

  { name:"just the other week", uk:"буквально на минулому тижні", emoji:"📅", cat:"when", lvl:"B1", reg:"casual",
    formula:"Just the other week/day/month, + past tense",
    when:"Показує «щойно, недавно, ще свіже в памʼяті».",
    examples:[
      { en:"<b>Just the other week</b>, she called me out of the blue.", uk:"Буквально на минулому тижні вона мені подзвонила з нізвідки." },
    ] },

  { name:"at the time", uk:"на той час / тоді", emoji:"📅", cat:"when", lvl:"B1", reg:"neutral",
    formula:"At the time, + past tense / clause",
    when:"⭐ Показує стан речей у конкретний минулий момент. Часто після опису події.",
    examples:[
      { en:"I was 16 <b>at the time</b>.", uk:"Мені тоді було 16." },
      { en:"<b>At the time</b>, it seemed like a good idea.", uk:"Тоді це здавалося гарною ідеєю." },
    ] },

  { name:"years ago", uk:"багато років тому", emoji:"📅", cat:"when", lvl:"A2", reg:"neutral",
    formula:"Years/months/days ago, + past tense",
    when:"Розмите минуле. Може бути 3, 5, 10 років — байдуже.",
    examples:[
      { en:"<b>Years ago</b>, I promised myself I'd travel more.", uk:"Багато років тому я пообіцяв собі більше подорожувати." },
    ] },

  { name:"last time I ...", uk:"востаннє коли я ...", emoji:"📅", cat:"when", lvl:"B1", reg:"neutral",
    formula:"(The) last time I + past tense, + past tense",
    when:"⭐ Класний storytelling-хук. Задає інтригу — що сталося тоді.",
    examples:[
      { en:"<b>The last time I</b> saw him, he was completely different.", uk:"Востаннє коли я його бачив, він був зовсім інакший." },
      { en:"<b>Last time I</b> tried sushi, I got sick.", uk:"Востаннє коли я їв суші, я отруївся." },
    ] },

  // ============= SEQUENCE (Послідовність) =============
  { name:"first of all", uk:"перш за все", emoji:"🔢", cat:"sequence", lvl:"A2", reg:"neutral",
    formula:"First of all, + clause",
    when:"⭐ Перший пункт у послідовності. Сильніше за «first».",
    examples:[
      { en:"<b>First of all</b>, I want to say thank you.", uk:"Перш за все, я хочу подякувати." },
      { en:"<b>First of all</b>, I got up late.", uk:"Перш за все, я встав пізно." },
    ] },

  { name:"to begin with", uk:"для початку / по-перше", emoji:"🔢", cat:"sequence", lvl:"B1", reg:"neutral",
    formula:"To begin with, + clause",
    when:"Аналог «first of all». Трохи формальніше.",
    examples:[
      { en:"<b>To begin with</b>, let me set the scene.", uk:"Для початку — дозволь я опишу ситуацію." },
    ] },

  { name:"then", uk:"потім", emoji:"🔢", cat:"sequence", lvl:"A1", reg:"neutral",
    formula:"Then, + clause",
    when:"Найпростіше — «потім». Ok для базового, але не зловживай — робить оповідь монотонною.",
    examples:[
      { en:"I got dressed. <b>Then</b>, I made coffee.", uk:"Я одягнувся. Потім зварив каву." },
    ],
    tip:"💡 Замість повторення «then, then, then» — чергуй з «after that», «next», «later on»." },

  { name:"after that", uk:"після цього", emoji:"🔢", cat:"sequence", lvl:"A2", reg:"neutral",
    formula:"After that, + clause",
    when:"Аналог «then», але звучить менш повторювано.",
    examples:[
      { en:"We had breakfast. <b>After that</b>, we hit the road.", uk:"Ми поснідали. Після цього — вирушили в дорогу." },
    ] },

  { name:"next", uk:"далі / наступне", emoji:"🔢", cat:"sequence", lvl:"A2", reg:"neutral",
    formula:"Next, + clause",
    when:"Легкий перехід між кроками.",
    examples:[
      { en:"<b>Next</b>, we went to a small café.", uk:"Далі — ми пішли в маленьку кав'ярню." },
    ] },

  { name:"the next thing I knew", uk:"не встиг я озирнутися, як...", emoji:"🔢", cat:"sequence", lvl:"B2", reg:"casual",
    formula:"..., the next thing I knew, + past tense",
    when:"⭐ Storytelling-жетон: показує, як швидко все змінилося. Ідеально для несподіваного повороту.",
    examples:[
      { en:"We ordered one drink. <b>The next thing I knew</b>, it was 3 AM.", uk:"Ми замовили один дрінк. Не встиг я озирнутися — була 3 ночі." },
      { en:"I closed my eyes for a second. <b>The next thing I knew</b>, my flight was boarding.", uk:"Я закрив очі на секунду. Не встиг я озирнутися — оголосили посадку." },
    ],
    tip:"💡 Обов'язково після коми і зазвичай + past tense. Дуже нативно." },

  { name:"later on", uk:"пізніше", emoji:"🔢", cat:"sequence", lvl:"A2", reg:"neutral",
    formula:"Later on, + clause",
    when:"«Пізніше того ж дня/вечора». Легкий часовий стрибок вперед.",
    examples:[
      { en:"<b>Later on</b>, I realized I had left my keys.", uk:"Пізніше я зрозумів, що забув ключі." },
    ] },

  { name:"eventually", uk:"врешті-решт", emoji:"🔢", cat:"sequence", lvl:"B1", reg:"neutral",
    formula:"..., eventually, + clause / Eventually, + clause",
    when:"⭐ Після довгого процесу / затримки. НЕ значить «можливо» — це «в кінцевому підсумку».",
    examples:[
      { en:"We waited for two hours, and <b>eventually</b>, the doctor showed up.", uk:"Ми чекали дві години, і врешті-решт лікар з'явився." },
      { en:"<b>Eventually</b>, I gave up.", uk:"Врешті-решт я здався." },
    ],
    tip:"⚠️ False friend: «eventually» ≠ «можливо». Це «зрештою», «через якийсь час»." },

  { name:"in the end", uk:"у підсумку / зрештою", emoji:"🔢", cat:"sequence", lvl:"B1", reg:"neutral",
    formula:"In the end, + clause",
    when:"⭐ Фінальний результат після коливань/спроб. Близько до «eventually».",
    examples:[
      { en:"I thought about it for weeks. <b>In the end</b>, I quit the job.", uk:"Я думав тижнями. У підсумку — звільнився." },
    ],
    tip:"💡 «In the end» = фінальне рішення / результат. «At the end» = у фізичному кінці (of the book, of the street)." },

  { name:"finally", uk:"нарешті / врешті", emoji:"🔢", cat:"sequence", lvl:"A2", reg:"neutral",
    formula:"Finally, + clause",
    when:"Останній пункт у послідовності. Або: «нарешті!» — після довгого очікування.",
    examples:[
      { en:"<b>Finally</b>, we made it home.", uk:"Нарешті ми добралися додому." },
      { en:"And <b>finally</b>, I want to thank my family.", uk:"І нарешті — я хочу подякувати сім'ї." },
    ] },

  { name:"in no time", uk:"миттю / за мить", emoji:"🔢", cat:"sequence", lvl:"B2", reg:"casual",
    formula:"..., in no time / In no time, + clause",
    when:"«Дуже швидко, ти й не помітиш». Позитивний відтінок.",
    examples:[
      { en:"He fixed it <b>in no time</b>.", uk:"Він це полагодив за мить." },
      { en:"You'll pick it up <b>in no time</b>.", uk:"Ти це освоїш дуже швидко." },
    ] },

  // ============= SIMULTANEOUS (Одночасність) =============
  { name:"meanwhile", uk:"тим часом", emoji:"⏸️", cat:"simul", lvl:"B1", reg:"neutral",
    formula:"Meanwhile, + clause",
    when:"⭐ Класика storytelling — переключення на паралельну дію в іншому місці/з іншим героєм.",
    examples:[
      { en:"I was cooking dinner. <b>Meanwhile</b>, the kids were fighting in the living room.", uk:"Я готував вечерю. Тим часом діти билися у вітальні." },
      { en:"<b>Meanwhile</b>, back at the office, chaos was unfolding.", uk:"Тим часом в офісі назрівав хаос." },
    ],
    tip:"💡 Улюблений маркер сценаристів. Показує паралельний сюжет." },

  { name:"at the same time", uk:"у той же час", emoji:"⏸️", cat:"simul", lvl:"A2", reg:"neutral",
    formula:"..., at the same time, + clause / At the same time, + clause",
    when:"Дві дії паралельно. Можна використовувати і буквально, і фігурально («водночас з тим»).",
    examples:[
      { en:"I felt scared and excited <b>at the same time</b>.", uk:"Мені було страшно і радісно водночас." },
      { en:"<b>At the same time</b>, prices kept rising.", uk:"У той же час, ціни продовжували рости." },
    ] },

  { name:"while I was ...ing", uk:"поки я ... , ...", emoji:"⏸️", cat:"simul", lvl:"A2", reg:"neutral",
    formula:"While + subject + was/were + Ving, + past simple",
    when:"⭐ Класична конструкція: тривала дія (past continuous) → раптова коротка дія (past simple).",
    examples:[
      { en:"<b>While I was walking</b> to work, I saw an accident.", uk:"Поки я йшов на роботу, я побачив аварію." },
      { en:"<b>While we were talking</b>, my phone died.", uk:"Поки ми розмовляли, у мене сів телефон." },
    ],
    tip:"💡 Головне правило: WHILE + Continuous, WHEN + Simple. «While I was reading, when the phone rang.»" },

  { name:"as I was ...ing", uk:"саме коли я ...", emoji:"⏸️", cat:"simul", lvl:"B1", reg:"neutral",
    formula:"As + subject + was/were + Ving, + past simple",
    when:"Синонім «while I was ...ing», але з відтінком «саме в той момент».",
    examples:[
      { en:"<b>As I was leaving</b>, the phone rang.", uk:"Саме коли я виходив, задзвонив телефон." },
    ] },

  { name:"in the meantime", uk:"тим часом (поки чекав)", emoji:"⏸️", cat:"simul", lvl:"B1", reg:"neutral",
    formula:"In the meantime, + clause",
    when:"«В очікуванні чогось — зроби те-то». Часто передбачає майбутню дію.",
    examples:[
      { en:"The pizza will be ready in 20 minutes. <b>In the meantime</b>, let's have a drink.", uk:"Піца буде готова за 20 хвилин. Тим часом — вип'ємо." },
      { en:"<b>In the meantime</b>, I'll keep looking.", uk:"Тим часом — я продовжу шукати." },
    ],
    tip:"💡 На відміну від «meanwhile» (нейтральне), «in the meantime» частіше = «поки чекаєш чогось»." },

  { name:"all along", uk:"весь цей час", emoji:"⏸️", cat:"simul", lvl:"B2", reg:"neutral",
    formula:"..., all along / All along, + clause",
    when:"«Це тривало весь час, а я не знав/не помічав». Часто з відкриттям правди.",
    examples:[
      { en:"She had known the truth <b>all along</b>.", uk:"Вона весь цей час знала правду." },
      { en:"The keys were in my pocket <b>all along</b>!", uk:"Ключі весь час були в моїй кишені!" },
    ] },

  { name:"in the middle of ...ing", uk:"саме посеред того, як...", emoji:"⏸️", cat:"simul", lvl:"B1", reg:"neutral",
    formula:"In the middle of + Ving/noun, + clause",
    when:"⭐ Момент, коли тебе перервали. Дуже щоденниковий.",
    examples:[
      { en:"I was <b>in the middle of</b> cooking when the doorbell rang.", uk:"Я саме посеред готування — задзеленчав дзвінок." },
      { en:"Sorry, I'm <b>in the middle of</b> something.", uk:"Вибач, я саме зайнятий." },
    ] },

  // ============= SUDDEN (Раптовість) =============
  { name:"all of a sudden", uk:"раптово / як грім серед ясного неба", emoji:"💥", cat:"sudden", lvl:"B1", reg:"neutral",
    formula:"All of a sudden, + past tense",
    when:"⭐ Найбільш storytelling-ський маркер раптовості. Драматичніше за «suddenly».",
    examples:[
      { en:"We were laughing when <b>all of a sudden</b>, the lights went out.", uk:"Ми сміялися, коли раптово погасло світло." },
      { en:"<b>All of a sudden</b>, she started crying.", uk:"Раптово вона розплакалася." },
    ] },

  { name:"out of nowhere", uk:"ні з того ні з сього", emoji:"💥", cat:"sudden", lvl:"B1", reg:"casual",
    formula:"..., out of nowhere / Out of nowhere, + clause",
    when:"⭐ Щось з'явилося / сталося без попередження. Часто про людей або події.",
    examples:[
      { en:"He called me <b>out of nowhere</b> after five years of silence.", uk:"Він мені подзвонив ні з того ні з сього після п'яти років мовчання." },
      { en:"<b>Out of nowhere</b>, a dog ran across the road.", uk:"Ні з того ні з сього дорогу перебіг пес." },
    ] },

  { name:"out of the blue", uk:"як грім серед ясного неба", emoji:"💥", cat:"sudden", lvl:"B2", reg:"neutral",
    formula:"..., out of the blue / Out of the blue, + clause",
    when:"⭐ Ідіома — щось несподіване, без попередження. Синонім «out of nowhere».",
    examples:[
      { en:"She texted me <b>out of the blue</b>.", uk:"Вона написала мені як грім серед ясного неба." },
      { en:"<b>Out of the blue</b>, he offered me the job.", uk:"Несподівано він запропонував мені роботу." },
    ] },

  { name:"before I knew it", uk:"не встиг я оглянутися, як...", emoji:"💥", cat:"sudden", lvl:"B1", reg:"neutral",
    formula:"..., before I knew it, + past tense",
    when:"⭐ Час пролетів / щось сталося так швидко, що я не встиг усвідомити.",
    examples:[
      { en:"<b>Before I knew it</b>, I was crying too.", uk:"Не встиг я оглянутися, як теж плакав." },
      { en:"<b>Before I knew it</b>, five hours had passed.", uk:"Не встиг я оглянутися — пройшло п'ять годин." },
    ] },

  { name:"suddenly", uk:"раптом", emoji:"💥", cat:"sudden", lvl:"A2", reg:"neutral",
    formula:"Suddenly, + past tense",
    when:"Базовий маркер раптовості. Слабший за «all of a sudden», але коректний.",
    examples:[
      { en:"<b>Suddenly</b>, I remembered where I'd seen him before.", uk:"Раптом я згадав, де я його раніше бачив." },
    ] },

  { name:"just as I ...ed", uk:"саме тоді, коли я ...", emoji:"💥", cat:"sudden", lvl:"B1", reg:"neutral",
    formula:"Just as + subject + past simple, + past tense",
    when:"⭐ Драматичний збіг — одне діло-двоє відбулися майже разом.",
    examples:[
      { en:"<b>Just as I opened</b> the door, the phone rang.", uk:"Саме коли я відчинив двері — задзвонив телефон." },
      { en:"<b>Just as we were leaving</b>, it started to rain.", uk:"Саме коли ми виходили — почався дощ." },
    ] },

  { name:"the next moment", uk:"наступної миті", emoji:"💥", cat:"sudden", lvl:"B2", reg:"neutral",
    formula:"..., the next moment, + past tense",
    when:"«Через частку секунди» — драматизує послідовність.",
    examples:[
      { en:"He was smiling. <b>The next moment</b>, he was on the ground.", uk:"Він усміхався. Наступної миті — лежав на землі." },
    ] },

  // ============= DURATION / GAP (Проміжок часу) =============
  { name:"by the time", uk:"до того часу, як", emoji:"⏳", cat:"duration", lvl:"B1", reg:"neutral",
    formula:"By the time + past simple, + past perfect / past simple",
    when:"⭐ Показує, що одна подія завершилась до іншої. Часто з Past Perfect.",
    examples:[
      { en:"<b>By the time</b> I got there, they had already left.", uk:"До того часу, як я прийшов, вони вже пішли." },
      { en:"<b>By the time</b> we finish, it'll be midnight.", uk:"До того часу, як ми закінчимо, буде опівночі." },
    ],
    tip:"💡 «By the time» = «до того моменту як». Правильна пара часів: past + past perfect (минуле) або present + future (майбутнє)." },

  { name:"it wasn't long before", uk:"пройшло небагато часу, і...", emoji:"⏳", cat:"duration", lvl:"B2", reg:"neutral",
    formula:"It wasn't long before + past simple",
    when:"⭐ Показує коротку затримку між подіями. Storytelling-класика.",
    examples:[
      { en:"<b>It wasn't long before</b> he called back.", uk:"Пройшло небагато часу — і він передзвонив." },
      { en:"<b>It wasn't long before</b> we became close friends.", uk:"Скоро ми стали близькими друзями." },
    ] },

  { name:"up until", uk:"аж до / до самого", emoji:"⏳", cat:"duration", lvl:"B1", reg:"neutral",
    formula:"Up until + noun/clause, + subject + past tense",
    when:"«Аж до цього моменту / події» — стан тривав, потім змінився.",
    examples:[
      { en:"<b>Up until</b> last year, I lived alone.", uk:"Аж до минулого року я жив сам." },
      { en:"<b>Up until</b> that moment, I trusted him.", uk:"До того моменту я йому вірив." },
    ] },

  { name:"from then on", uk:"відтоді", emoji:"⏳", cat:"duration", lvl:"B2", reg:"neutral",
    formula:"From then on, + clause",
    when:"⭐ Позначає точку зміни — «після цього все було по-іншому».",
    examples:[
      { en:"<b>From then on</b>, we were inseparable.", uk:"Відтоді ми були нерозлучні." },
      { en:"<b>From then on</b>, I never trusted anyone easily.", uk:"Відтоді я нікому не довіряв легко." },
    ] },

  { name:"for hours", uk:"годинами", emoji:"⏳", cat:"duration", lvl:"A2", reg:"neutral",
    formula:"..., for hours/days/weeks",
    when:"Підкреслює тривалість дії. Часто з past continuous.",
    examples:[
      { en:"We talked <b>for hours</b>.", uk:"Ми говорили годинами." },
      { en:"I couldn't sleep <b>for days</b>.", uk:"Я не міг спати днями." },
    ] },

  { name:"in the following days", uk:"у наступні дні", emoji:"⏳", cat:"duration", lvl:"B2", reg:"formal",
    formula:"In the following days/weeks/months, + clause",
    when:"Розширює часову рамку. Літературно.",
    examples:[
      { en:"<b>In the following weeks</b>, everything changed.", uk:"У наступні тижні все змінилося." },
    ] },

  { name:"took me ... to", uk:"мені знадобилось ..., щоб", emoji:"⏳", cat:"duration", lvl:"B1", reg:"neutral",
    formula:"It took me + [time] + to + verb",
    when:"⭐ Показує тривалість дії — скільки часу пішло на щось.",
    examples:[
      { en:"It <b>took me three years to</b> learn Spanish.", uk:"Мені знадобилося три роки, щоб вивчити іспанську." },
      { en:"It <b>took me ages to</b> get over it.", uk:"Мені знадобилась вічність, щоб змиритися з цим." },
    ] },

  // ============= HABIT / PAST (Звичка в минулому) =============
  { name:"used to", uk:"колись / раніше (більше ні)", emoji:"🔁", cat:"habit", lvl:"A2", reg:"neutral",
    formula:"Used to + base verb",
    when:"⭐ Минула звичка / стан, який більше не триває. Ключове: «раніше — так, зараз — ні».",
    examples:[
      { en:"I <b>used to</b> smoke, but I quit two years ago.", uk:"Я колись курив, але кинув два роки тому." },
      { en:"There <b>used to be</b> a café here.", uk:"Тут раніше була кав'ярня." },
    ],
    tip:"⚠️ Питання/заперечення: didn't use to / did you use to (без «d» в кінці!)." },

  { name:"would often", uk:"часто, бувало, ...", emoji:"🔁", cat:"habit", lvl:"B1", reg:"neutral",
    formula:"Would (often/always/sometimes) + base verb",
    when:"⭐ Повторювана дія в минулому. Тільки для ДІЙ, не для СТАНІВ. НЕ можна: «I would live in Kyiv» ❌.",
    examples:[
      { en:"On Sundays, we <b>would often</b> go to the park.", uk:"Щонеділі ми часто ходили в парк." },
      { en:"Grandma <b>would always</b> make pancakes for us.", uk:"Бабуся завжди робила нам млинці." },
    ],
    tip:"⚠️ Для СТАНІВ (be, have, know, love) — тільки «used to»: «I used to know him» ✅, «I would know him» ❌." },

  { name:"every now and then", uk:"час від часу", emoji:"🔁", cat:"habit", lvl:"B1", reg:"neutral",
    formula:"Every now and then, + clause",
    when:"Нерегулярна повторюваність. Синонім «occasionally».",
    examples:[
      { en:"<b>Every now and then</b>, I still miss her.", uk:"Час від часу я досі за нею сумую." },
    ] },

  { name:"from time to time", uk:"час від часу", emoji:"🔁", cat:"habit", lvl:"A2", reg:"neutral",
    formula:"From time to time, + clause",
    when:"Аналог «every now and then».",
    examples:[
      { en:"<b>From time to time</b>, I check in on him.", uk:"Час від часу я його провідую." },
    ] },

  { name:"more often than not", uk:"найчастіше / здебільшого", emoji:"🔁", cat:"habit", lvl:"B2", reg:"neutral",
    formula:"More often than not, + clause",
    when:"⭐ = «в більшості випадків». Гарна альтернатива банальному «usually».",
    examples:[
      { en:"<b>More often than not</b>, I end up cooking at home.", uk:"Найчастіше я в підсумку готую вдома." },
    ] },

  { name:"back in the day", uk:"за старих часів", emoji:"🔁", cat:"habit", lvl:"B1", reg:"casual",
    formula:"Back in the day, + past tense",
    when:"Ностальгічно. «Раніше, за старих часів». Casual.",
    examples:[
      { en:"<b>Back in the day</b>, we didn't have internet.", uk:"За старих часів у нас не було інтернету." },
    ] },

  { name:"whenever", uk:"щоразу коли", emoji:"🔁", cat:"habit", lvl:"B1", reg:"neutral",
    formula:"Whenever + subject + past simple, + past simple",
    when:"«Кожного разу коли...». Повторювана ситуація.",
    examples:[
      { en:"<b>Whenever</b> it rained, we stayed inside.", uk:"Щоразу коли йшов дощ, ми лишалися вдома." },
    ] },

  { name:"as a rule", uk:"як правило", emoji:"🔁", cat:"habit", lvl:"B2", reg:"formal",
    formula:"As a rule, + clause",
    when:"«Зазвичай, за правилом». Формальний / нейтральний.",
    examples:[
      { en:"<b>As a rule</b>, I don't drink on weekdays.", uk:"Як правило, я не п'ю в будні." },
    ] },

  // ============= DRAMATIC (Драматичний твіст) =============
  { name:"little did I know", uk:"тоді я ще не знав, що...", emoji:"🎬", cat:"dramatic", lvl:"C1", reg:"neutral",
    formula:"Little did + subject + know + (that) + clause",
    when:"⭐⭐⭐ Класична інверсія storytelling. Створює драматичну іронію: «тоді я ще не знав, що ...». Обов'язково DID!",
    examples:[
      { en:"I said goodbye. <b>Little did I know</b> it would be the last time.", uk:"Я попрощався. Тоді я ще не знав, що це буде востаннє." },
      { en:"<b>Little did she know</b> that her life was about to change.", uk:"Тоді вона ще не знала, що її життя от-от зміниться." },
    ],
    tip:"⚠️ ІНВЕРСІЯ: «Little did I know» ✅, а не «Little I knew» ❌. Класичний storytelling twist." },

  { name:"no sooner had I ... than", uk:"не встиг я ..., як", emoji:"🎬", cat:"dramatic", lvl:"C1", reg:"formal",
    formula:"No sooner had + subject + V3 + than + past simple",
    when:"⭐⭐ Літературна інверсія — миттєва послідовність двох подій. Формально/книжково.",
    examples:[
      { en:"<b>No sooner had I</b> sat down <b>than</b> the phone rang.", uk:"Не встиг я сісти, як задзвонив телефон." },
      { en:"<b>No sooner had she</b> arrived <b>than</b> he left.", uk:"Не встигла вона прийти, як він пішов." },
    ],
    tip:"💡 Пара: no sooner ... THAN (не «when»!). Обов'язково інверсія: «had I», не «I had»." },

  { name:"hardly had I ... when", uk:"ледь я ..., як", emoji:"🎬", cat:"dramatic", lvl:"C1", reg:"formal",
    formula:"Hardly had + subject + V3 + when + past simple",
    when:"Аналог «no sooner had I». Обов'язково WHEN.",
    examples:[
      { en:"<b>Hardly had I</b> closed the door <b>when</b> someone knocked.", uk:"Ледь я зачинив двері, як хтось постукав." },
    ] },

  { name:"the moment I ...ed", uk:"як тільки я ...", emoji:"🎬", cat:"dramatic", lvl:"B2", reg:"neutral",
    formula:"The moment + subject + past simple, + past simple",
    when:"⭐ М'якша версія «no sooner had I». Драматична, але без інверсії. Часто-використовувана.",
    examples:[
      { en:"<b>The moment I saw</b> her, I knew.", uk:"Як тільки я її побачив — я зрозумів." },
      { en:"<b>The moment I stepped inside</b>, something felt off.", uk:"Як тільки я зайшов усередину — щось було не так." },
    ] },

  { name:"only to", uk:"лише щоб (з'ясувати / виявити)", emoji:"🎬", cat:"dramatic", lvl:"B2", reg:"neutral",
    formula:"..., only to + base verb",
    when:"⭐ Гіркий поворот: зробив щось, а результат виявився неочікуваним/розчаровуючим.",
    examples:[
      { en:"I ran to the station, <b>only to</b> miss the train.", uk:"Я побіг на вокзал — лише для того, щоб пропустити потяг." },
      { en:"She opened the box, <b>only to</b> find it empty.", uk:"Вона відкрила коробку — лише щоб виявити, що вона пуста." },
    ] },

  { name:"much to my surprise", uk:"на мій превеликий подив", emoji:"🎬", cat:"dramatic", lvl:"B2", reg:"neutral",
    formula:"Much to my surprise/delight/horror, + clause",
    when:"⭐ Літературний зачин з емоцією. Можна: surprise, delight, horror, dismay, relief.",
    examples:[
      { en:"<b>Much to my surprise</b>, she said yes.", uk:"На мій превеликий подив, вона сказала «так»." },
      { en:"<b>Much to my horror</b>, my passport was gone.", uk:"На мій жах, паспорт зник." },
    ] },

  { name:"who would have thought", uk:"хто б міг подумати", emoji:"🎬", cat:"dramatic", lvl:"B2", reg:"casual",
    formula:"Who would have thought (that) + clause?",
    when:"⭐ Риторична реакція на несподіваний поворот. Часто в кінці історії.",
    examples:[
      { en:"<b>Who would have thought</b> we'd end up together?", uk:"Хто б міг подумати, що ми зрештою будемо разом?" },
    ] },

  { name:"as fate would have it", uk:"як склалося / як завгодно долі", emoji:"🎬", cat:"dramatic", lvl:"C1", reg:"formal",
    formula:"As fate would have it, + clause",
    when:"Літературно-драматично. Підкреслює випадковість / долю.",
    examples:[
      { en:"<b>As fate would have it</b>, we met again ten years later.", uk:"Як склалося, ми зустрілися знову через десять років." },
    ] },
];


const FILL_QS = [
  { ctx:"📅 Storytelling-старт про недавнє", target:"___, I ran into my old teacher.", correct:"The other day", distractors:["Meanwhile","Suddenly","By the time"], uk:"Днями я випадково зустрів свого старого вчителя." },
  { ctx:"📅 Далеке минуле, точка на таймлайні", target:"___ 2015, I lived in Kyiv.", correct:"Back in", distractors:["Ever since","After that","In no time"], uk:"Ще у 2015 я жив у Києві." },
  { ctx:"📅 Точка відліку + Present Perfect", target:"___ I moved here, I've felt at home.", correct:"Ever since", distractors:["By the time","Meanwhile","In the end"], uk:"Відтоді, як я переїхав сюди, я почуваюся вдома." },
  { ctx:"📅 Стан речей у конкретний минулий момент", target:"I was 16 ___.", correct:"at the time", distractors:["by the time","in no time","ever since"], uk:"Мені тоді було 16." },
  { ctx:"🔢 Перший пункт у послідовності", target:"___, I want to say thank you.", correct:"First of all", distractors:["Eventually","Meanwhile","Suddenly"], uk:"Перш за все, я хочу подякувати." },
  { ctx:"🔢 Фінальний результат після процесу", target:"I thought about it for weeks. ___, I quit the job.", correct:"In the end", distractors:["Meanwhile","Suddenly","Back in"], uk:"Я думав тижнями. У підсумку — звільнився." },
  { ctx:"🔢 Раптова швидка зміна часу", target:"We ordered one drink. ___, it was 3 AM.", correct:"The next thing I knew", distractors:["By the time","In the meantime","From then on"], uk:"Ми замовили один дрінк. Не встиг я озирнутися — була 3 ночі." },
  { ctx:"🔢 Після довгого очікування — результат", target:"We waited for two hours, and ___, the doctor showed up.", correct:"eventually", distractors:["suddenly","meanwhile","by the time"], uk:"Ми чекали дві години — і врешті-решт лікар з'явився." },
  { ctx:"⏸️ Паралельна дія в іншому місці", target:"I was cooking dinner. ___, the kids were fighting in the living room.", correct:"Meanwhile", distractors:["Suddenly","Eventually","By the time"], uk:"Я готував вечерю. Тим часом діти билися у вітальні." },
  { ctx:"⏸️ Тривала дія → раптова коротка", target:"___ walking to work, I saw an accident.", correct:"While I was", distractors:["By the time","Ever since","In no time"], uk:"Поки я йшов на роботу, я побачив аварію." },
  { ctx:"⏸️ В очікуванні чогось", target:"The pizza will be ready in 20 minutes. ___, let's have a drink.", correct:"In the meantime", distractors:["Meanwhile","Suddenly","Eventually"], uk:"Піца буде готова за 20 хвилин. Тим часом — вип'ємо." },
  { ctx:"⏸️ Правда тривала весь час", target:"She had known the truth ___.", correct:"all along", distractors:["by the time","in no time","from then on"], uk:"Вона весь цей час знала правду." },
  { ctx:"💥 Раптовість — драматично", target:"We were laughing when ___, the lights went out.", correct:"all of a sudden", distractors:["by the time","from then on","in the end"], uk:"Ми сміялися, коли раптово погасло світло." },
  { ctx:"💥 Без попередження", target:"He called me ___ after five years of silence.", correct:"out of nowhere", distractors:["at the time","in no time","by the time"], uk:"Він мені подзвонив ні з того ні з сього після п'яти років мовчання." },
  { ctx:"💥 Час пролетів так, що не встиг помітити", target:"___, I was crying too.", correct:"Before I knew it", distractors:["By the time","From then on","In no time"], uk:"Не встиг я оглянутися, як теж плакав." },
  { ctx:"💥 Драматичний збіг двох подій", target:"___ opened the door, the phone rang.", correct:"Just as I", distractors:["By the time","Ever since","Whenever"], uk:"Саме коли я відчинив двері — задзвонив телефон." },
  { ctx:"⏳ Одна подія завершилась до іншої", target:"___ I got there, they had already left.", correct:"By the time", distractors:["Ever since","Meanwhile","In no time"], uk:"До того часу, як я прийшов, вони вже пішли." },
  { ctx:"⏳ Коротка затримка між подіями", target:"___ he called back.", correct:"It wasn't long before", distractors:["Ever since","By the time","From then on"], uk:"Пройшло небагато часу — і він передзвонив." },
  { ctx:"⏳ Стан тривав до певної точки", target:"___ last year, I lived alone.", correct:"Up until", distractors:["Ever since","By the time","In no time"], uk:"Аж до минулого року я жив сам." },
  { ctx:"⏳ Точка зміни", target:"___, we were inseparable.", correct:"From then on", distractors:["Meanwhile","Suddenly","By the time"], uk:"Відтоді ми були нерозлучні." },
  { ctx:"🔁 Минула звичка, якої більше нема", target:"I ___ smoke, but I quit two years ago.", correct:"used to", distractors:["would often","every now and then","from time to time"], uk:"Я колись курив, але кинув два роки тому." },
  { ctx:"🔁 Повторювана дія в минулому (не стан)", target:"On Sundays, we ___ go to the park.", correct:"would often", distractors:["used to be","by the time","every now and then"], uk:"Щонеділі ми часто ходили в парк." },
  { ctx:"🔁 Нерегулярна повторюваність", target:"___, I still miss her.", correct:"Every now and then", distractors:["By the time","In no time","From then on"], uk:"Час від часу я досі за нею сумую." },
  { ctx:"🔁 Найчастіше, у більшості випадків", target:"___, I end up cooking at home.", correct:"More often than not", distractors:["By the time","At the same time","In no time"], uk:"Найчастіше я в підсумку готую вдома." },
  { ctx:"🎬 Драматична іронія — інверсія!", target:"I said goodbye. ___ it would be the last time.", correct:"Little did I know", distractors:["By the time I knew","In no time","From then on"], uk:"Я попрощався. Тоді я ще не знав, що це буде востаннє." },
  { ctx:"🎬 Літературна інверсія — миттєвість", target:"___ sat down than the phone rang.", correct:"No sooner had I", distractors:["By the time I","Just as I","Before I"], uk:"Не встиг я сісти, як задзвонив телефон." },
  { ctx:"🎬 Гіркий поворот — розчарування", target:"I ran to the station, ___ miss the train.", correct:"only to", distractors:["by the time","just as","from then on"], uk:"Я побіг на вокзал — лише для того, щоб пропустити потяг." },
  { ctx:"🎬 Емоційний зачин з подивом", target:"___, she said yes.", correct:"Much to my surprise", distractors:["By the time","In no time","From then on"], uk:"На мій превеликий подив, вона сказала «так»." },
  { ctx:"🎬 М'яка драматична пара — час + результат", target:"___ saw her, I knew.", correct:"The moment I", distractors:["By the time I","Ever since I","In no time"], uk:"Як тільки я її побачив — я зрозумів." },
  { ctx:"📅 Точний проміжок від події до тепер", target:"___ three years since we last met.", correct:"It's been", distractors:["At the time","In no time","By the time"], uk:"Минуло три роки, відколи ми востаннє бачились." },
];
const TR_QS = [
  { uk:"Днями я випадково зустрів свого старого вчителя.", answers:["The other day, I ran into my old teacher","The other day I ran into my old teacher","The other day, I bumped into my old teacher"], hint:"when — the other day" },
  { uk:"Ще у 2015 я жив у Києві.", answers:["Back in 2015, I lived in Kyiv","Back in 2015 I lived in Kyiv"], hint:"when — back in + year" },
  { uk:"Відтоді, як я переїхав сюди, я почуваюся вдома.", answers:["Ever since I moved here, I've felt at home","Ever since I moved here I've felt at home","Ever since I moved here, I have felt at home"], hint:"when — ever since + Present Perfect" },
  { uk:"Перш за все, я хочу подякувати.", answers:["First of all, I want to say thank you","First of all I want to say thank you","First of all, I want to say thanks","First of all, I'd like to say thank you"], hint:"sequence — first of all" },
  { uk:"Я думав тижнями. У підсумку — звільнився.", answers:["I thought about it for weeks. In the end, I quit the job","I thought about it for weeks. In the end I quit the job","I thought about it for weeks. In the end, I quit my job"], hint:"sequence — in the end" },
  { uk:"Ми чекали дві години, і врешті-решт лікар з'явився.", answers:["We waited for two hours, and eventually, the doctor showed up","We waited for two hours and eventually the doctor showed up","We waited for two hours and eventually, the doctor showed up"], hint:"sequence — eventually" },
  { uk:"Я готував вечерю. Тим часом діти билися у вітальні.", answers:["I was cooking dinner. Meanwhile, the kids were fighting in the living room","I was cooking dinner. Meanwhile the kids were fighting in the living room"], hint:"simultaneous — meanwhile" },
  { uk:"Поки я йшов на роботу, я побачив аварію.", answers:["While I was walking to work, I saw an accident","While I was walking to work I saw an accident"], hint:"simultaneous — while I was ...ing" },
  { uk:"Піца буде готова за 20 хвилин. Тим часом — вип'ємо.", answers:["The pizza will be ready in 20 minutes. In the meantime, let's have a drink","The pizza will be ready in 20 minutes. In the meantime let's have a drink"], hint:"simultaneous — in the meantime" },
  { uk:"Ми сміялися, коли раптово погасло світло.", answers:["We were laughing when all of a sudden, the lights went out","We were laughing when all of a sudden the lights went out"], hint:"sudden — all of a sudden" },
  { uk:"Він мені подзвонив ні з того ні з сього.", answers:["He called me out of nowhere","He called me out of the blue"], hint:"sudden — out of nowhere / out of the blue" },
  { uk:"Не встиг я оглянутися, як пройшло п'ять годин.", answers:["Before I knew it, five hours had passed","Before I knew it five hours had passed"], hint:"sudden — before I knew it" },
  { uk:"До того часу, як я прийшов, вони вже пішли.", answers:["By the time I got there, they had already left","By the time I got there they had already left","By the time I arrived, they had already left"], hint:"duration — by the time + Past Perfect" },
  { uk:"Аж до минулого року я жив сам.", answers:["Up until last year, I lived alone","Up until last year I lived alone"], hint:"duration — up until" },
  { uk:"Відтоді ми були нерозлучні.", answers:["From then on, we were inseparable","From then on we were inseparable"], hint:"duration — from then on" },
  { uk:"Я колись курив, але кинув два роки тому.", answers:["I used to smoke, but I quit two years ago","I used to smoke but I quit two years ago"], hint:"habit — used to + base verb" },
  { uk:"Щонеділі ми часто ходили в парк.", answers:["On Sundays, we would often go to the park","On Sundays we would often go to the park","On Sundays, we used to go to the park","On Sundays we used to go to the park"], hint:"habit — would often (для дій)" },
  { uk:"Тоді я ще не знав, що це буде востаннє.", answers:["Little did I know it would be the last time","Little did I know that it would be the last time"], hint:"dramatic — Little DID I know (інверсія!)" },
  { uk:"Я побіг на вокзал — лише для того, щоб пропустити потяг.", answers:["I ran to the station, only to miss the train","I ran to the station only to miss the train"], hint:"dramatic — only to + base" },
  { uk:"Як тільки я її побачив — я зрозумів.", answers:["The moment I saw her, I knew","The moment I saw her I knew"], hint:"dramatic — the moment I + past" },
];
const INTRO = "<div class=\"intro-box pink\">\n<h3>🎯 Що таке Time &amp; Sequence маркери?</h3>\n<p><b>Це слова та фрази, які показують ЧАС і ПОРЯДОК</b> подій у розповіді: коли щось сталося (the other day, back in 2020), у якій послідовності (first → then → eventually), одночасність (meanwhile, while I was ...ing), раптовість (all of a sudden, out of the blue).</p>\n<p>Це <b>каркас storytelling</b> — те, що перетворює список фактів на історію, яку хочеться слухати.</p>\n<p><b>Приклад:</b> «<b>The other day</b>, I was walking home. <b>All of a sudden</b>, it started pouring. <b>By the time</b> I got home, I was soaked.» — Три речення, три різних маркери, повноцінна міні-історія.</p>\n</div>\n<div class=\"intro-box red\">\n<h3>🚫 Що станеться без цих маркерів?</h3>\n<p>Твоя оповідь буде <b>як шкільний твір у 5 класі</b>:</p>\n<div class=\"compare-grid\">\n<div class=\"compare-box bad\">\n<h4>❌ Без маркерів (нудно):</h4>\n<p>\"Yesterday I went to the store. I bought bread. I met a friend. We talked. I went home. It started raining.\"</p>\n<p>→ Плоско, схоже на телеграму.</p>\n</div>\n<div class=\"compare-box good\">\n<h4>✅ З маркерами (жива історія):</h4>\n<p>\"<b>The other day</b> I popped into the store. <b>While I was</b> picking up bread, <b>out of nowhere</b> I bumped into an old friend. <b>Next thing I knew</b>, we'd been chatting for an hour. <b>By the time</b> I left, it was pouring.\"</p>\n<p>→ Драматургія, темп, читається на одному диханні.</p>\n</div>\n</div>\n</div>\n<div class=\"intro-box blue\">\n<h3>🧠 7 функцій маркерів у тренажері</h3>\n<ul>\n<li>📅 <b>When (Коли саме)</b> — прив'язка до часу: the other day, back in, ever since, way back when...</li>\n<li>🔢 <b>Sequence (Послідовність)</b> — 1-2-3 порядок: first of all, then, after that, eventually, in the end...</li>\n<li>⏸️ <b>Simultaneous (Одночасність)</b> — паралельні дії: meanwhile, while I was ...ing, at the same time...</li>\n<li>💥 <b>Sudden (Раптовість)</b> — несподіванка: all of a sudden, out of nowhere, before I knew it, out of the blue...</li>\n<li>⏳ <b>Duration/Gap (Проміжок)</b> — тривалість/затримка: by the time, up until, it wasn't long before, from then on...</li>\n<li>🔁 <b>Habit/Past (Звичка)</b> — повторюваність у минулому: used to, would often, every now and then, more often than not...</li>\n<li>🎬 <b>Dramatic (Драматичний)</b> — інтрига: little did I know, no sooner had I ..., the moment I..., only to...</li>\n</ul>\n</div>\n<div class=\"intro-box green\">";
const META = {"title":"📖 Time & Sequence Storytelling — маркери оповіді","lead":"Каркас будь-якої історії в щоденнику: <b>коли</b> сталося, <b>у якому порядку</b>, що було <b>одночасно</b>, як <b>раптово</b>. Без цих маркерів твій текст = «I did X. Then I did Y. Then Z». З ними — <b>жива історія</b>."};
return { CATS: CATS, MARKERS: MARKERS, FILL_QS: FILL_QS, TR_QS: TR_QS, INTRO: INTRO, META: META };
})();
