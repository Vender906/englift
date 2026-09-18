/* EngLift — дані тренажера «discourse» (перенесено без змін з оригінального HTML). Вантажиться лише у своєму розділі. */
window.PHRASE_DATA = window.PHRASE_DATA || {};
window.PHRASE_DATA["discourse"] = (function () {
const CATS = {
  shift:    { emoji:"🎯", label:"Topic Shift — зміна теми",       desc:"as for, when it comes to, as far as X is concerned" },
  return:   { emoji:"🔗", label:"Topic Return — повернення до теми", desc:"anyway, as I was saying, back to what I was saying" },
  personal: { emoji:"💭", label:"Personal Take — твоя позиція",   desc:"personally, if you ask me, in my book" },
  soften:   { emoji:"⚠️", label:"Softening — пом'якшення",        desc:"kind of, sort of, in a way, more or less" },
  emphasis: { emoji:"💥", label:"Emphasis — підсилення",           desc:"actually, in fact, believe it or not" },
  reform:   { emoji:"🔄", label:"Reformulation — переформулювання", desc:"I mean, in other words, or rather" },
  filler:   { emoji:"🤔", label:"Filler — філлери / думаєш",       desc:"well, you know, like, I guess" },
  wrap:     { emoji:"🎁", label:"Closing — закриття",              desc:"anyway, at the end of the day, all things considered" },
};

/* =====================================================
   DISCOURSE MARKERS — 80+
   { name, uk, emoji, cat, lvl, reg, when, formula?, examples:[{en,uk}], tip?, vs? }
   ===================================================== */
const MARKERS = [
  // ============= TOPIC SHIFT =============
  { name:"as for", uk:"що ж стосується / щодо", emoji:"🎯", cat:"shift", lvl:"B2", reg:"neutral",
    formula:"As for + noun/pronoun, + clause",
    when:"⭐ Переключаєш фокус на іншу тему/особу. Часто після того, як говорив про одне — тепер про інше.",
    examples:[
      { en:"John got the promotion. <b>As for</b> me, I'm still waiting.", uk:"Джон отримав підвищення. Що ж до мене — я досі чекаю." },
      { en:"I love pasta. <b>As for</b> pizza, I could take it or leave it.", uk:"Я люблю пасту. Що ж до піци — можу і без неї." },
      { en:"<b>As for</b> the price, it's too high.", uk:"Щодо ціни — вона зависока." },
    ],
    tip:"💡 Найкорисніший маркер для переходу між темами. Часто на початку речення." },

  { name:"when it comes to", uk:"коли йдеться про", emoji:"🎯", cat:"shift", lvl:"B1", reg:"neutral",
    formula:"When it comes to + noun/V-ing, + clause",
    when:"Вводиш конкретну сферу/тему для обговорення. Часто перед експертизою.",
    examples:[
      { en:"<b>When it comes to</b> cooking, my mom is the best.", uk:"Коли йдеться про готування — моя мама найкраща." },
      { en:"<b>When it comes to</b> money, be careful.", uk:"Коли йдеться про гроші — будь обережний." },
      { en:"He's clueless <b>when it comes to</b> tech.", uk:"Він нічого не тямить у техніці." },
    ],
    tip:"💡 Після «when it comes to» — noun або V-ing (не інфінітив!). Дуже поширений у розмові." },

  { name:"as far as X is concerned", uk:"що стосується X", emoji:"🎯", cat:"shift", lvl:"B2", reg:"neutral",
    formula:"As far as + X + is concerned, + clause",
    when:"Формальніше «as for». Підкреслює: «з точки зору X» або «щодо X».",
    examples:[
      { en:"<b>As far as I'm concerned</b>, the issue is closed.", uk:"Як на мене, питання закрите." },
      { en:"<b>As far as money is concerned</b>, we're fine.", uk:"Що стосується грошей — у нас все ок." },
    ],
    tip:"💡 «As far as I'm concerned» — це фактично «моя думка така». Топова конструкція для дискусій." },

  { name:"speaking of / talking about", uk:"до речі про / коли вже зайшла мова", emoji:"🎯", cat:"shift", lvl:"B1", reg:"neutral",
    formula:"Speaking of + noun, + clause",
    when:"⭐ Плавно вводиш пов'язану тему на основі щойно згаданого. Найприродніший перехід.",
    examples:[
      { en:"...I met John yesterday. <b>Speaking of</b> John, did you hear he got engaged?", uk:"...я зустрів Джона учора. До речі про Джона — чув, він заручився?" },
      { en:"<b>Talking about</b> vacations, where are you going this summer?", uk:"Коли вже зайшла мова про відпустки — куди ти цього літа?" },
    ],
    tip:"💡 Використовуй, коли твоя нова тема ПОВ'ЯЗАНА з тим, що щойно сказали. Не для геть інших тем." },

  { name:"regarding / concerning", uk:"стосовно / щодо", emoji:"🎯", cat:"shift", lvl:"B2", reg:"formal",
    formula:"Regarding + noun, + clause",
    when:"Формальні варіанти «about». Часто в email/business.",
    examples:[
      { en:"<b>Regarding</b> your email, I'll reply tomorrow.", uk:"Стосовно твого листа — відповім завтра." },
      { en:"<b>Concerning</b> the budget, we need to talk.", uk:"Щодо бюджету — нам треба поговорити." },
    ],
    tip:"💡 Для роботи, ділового листування. У розмові з друзями — звучить сухо." },

  { name:"with regard to / with respect to", uk:"щодо / стосовно (business)", emoji:"🎯", cat:"shift", lvl:"C1", reg:"formal",
    formula:"With regard to + noun, + clause",
    when:"Дуже формальні, для юридичних/офіційних текстів.",
    examples:[
      { en:"<b>With regard to</b> your proposal, we accept the terms.", uk:"Щодо вашої пропозиції — ми приймаємо умови." },
      { en:"<b>With respect to</b> the deadline, we need extra time.", uk:"Стосовно дедлайну — нам потрібен додатковий час." },
    ],
    tip:"⚠️ Дуже formal. У розмові з друзями — «about» або «as for»." },

  { name:"in terms of", uk:"з точки зору / у плані", emoji:"🎯", cat:"shift", lvl:"B2", reg:"neutral",
    formula:"In terms of + noun/V-ing, + clause",
    when:"Розглядаєш щось з певної точки зору / аспекту.",
    examples:[
      { en:"<b>In terms of</b> quality, this is the best.", uk:"З точки зору якості — це найкраще." },
      { en:"<b>In terms of</b> money, we're doing well.", uk:"У плані грошей — ми маємо все добре." },
    ],
    tip:"💡 Топова фраза для презентацій, дискусій. Універсально." },

  { name:"on the subject of", uk:"на тему / про", emoji:"🎯", cat:"shift", lvl:"B2", reg:"formal",
    formula:"On the subject of + noun, + clause",
    when:"Формальний спосіб ввести тему. Часто на початку доповіді.",
    examples:[
      { en:"<b>On the subject of</b> global warming, we must act now.", uk:"На тему глобального потепління — ми маємо діяти зараз." },
    ] },

  { name:"as regards", uk:"стосовно", emoji:"🎯", cat:"shift", lvl:"C1", reg:"formal",
    formula:"As regards + noun, + clause",
    when:"Формальний = «as far as X is concerned». Business/legal.",
    examples:[
      { en:"<b>As regards</b> the payment, please pay by Friday.", uk:"Стосовно оплати — прошу заплатити до п'ятниці." },
    ] },

  { name:"that reminds me", uk:"це нагадало мені", emoji:"🎯", cat:"shift", lvl:"B1", reg:"casual",
    formula:"That reminds me, + clause",
    when:"⭐ Щось у розмові тригернуло спогад або пов'язану тему. Дуже природний перехід.",
    examples:[
      { en:"My phone died yesterday. <b>That reminds me</b>, I need to charge mine.", uk:"Мій телефон сів учора. О, нагадало — мені теж треба зарядити." },
      { en:"<b>That reminds me</b>, we need milk!", uk:"О, нагадало — нам треба молоко!" },
    ],
    tip:"💡 Casual, дружнє. Показує, що ти уважно слухав." },

  { name:"which reminds me", uk:"що нагадало мені", emoji:"🎯", cat:"shift", lvl:"B1", reg:"neutral",
    formula:"..., which reminds me, + clause",
    when:"= «that reminds me», але вплетено в те саме речення. Плавніший перехід.",
    examples:[
      { en:"He's flying to Paris, <b>which reminds me</b> — did you book your tickets?", uk:"Він летить у Париж, що нагадало — ти квитки бронював?" },
    ] },

  { name:"on a side note", uk:"на побіжну тему / до речі", emoji:"🎯", cat:"shift", lvl:"B2", reg:"neutral",
    formula:"On a side note, + clause",
    when:"Вводиш побіжну ремарку, не пов'язану напряму. Часто на роботі.",
    examples:[
      { en:"<b>On a side note</b>, have you tried the new café?", uk:"На побіжну тему — ти пробував нове кафе?" },
    ] },

  { name:"by the way (BTW)", uk:"до речі", emoji:"🎯", cat:"shift", lvl:"A2", reg:"casual",
    formula:"By the way, + clause",
    when:"⭐ Найуніверсальніший casual перехід. Вводиш неповʼязану побіжну тему.",
    examples:[
      { en:"<b>By the way</b>, did you finish that report?", uk:"До речі, ти закінчив той звіт?" },
      { en:"<b>BTW</b>, thanks for yesterday!", uk:"До речі, дякую за вчора!" },
    ],
    tip:"💡 «BTW» — у чатах / SMS. Не в офіційному письмі." },

  // ============= TOPIC RETURN =============
  { name:"anyway", uk:"у будь-якому разі / коротше", emoji:"🔗", cat:"return", lvl:"A2", reg:"casual",
    formula:"Anyway, + clause (returns to main topic)",
    when:"⭐ Повертаєшся до основної теми після відступу. Або закриваєш побіжну гілку.",
    examples:[
      { en:"...so the dog bit him. <b>Anyway</b>, what were you saying about your trip?", uk:"...так собака його вкусив. Коротше, що ти казав про подорож?" },
      { en:"<b>Anyway</b>, I gotta go.", uk:"У будь-якому разі, мені треба йти." },
    ],
    tip:"💡 Один з найчастіших маркерів у розмові. Сигналізує «годі про це»." },

  { name:"as I was saying", uk:"як я вже казав", emoji:"🔗", cat:"return", lvl:"B1", reg:"neutral",
    formula:"As I was saying, + clause",
    when:"Тебе перебили — повертаєшся до своєї думки.",
    examples:[
      { en:"<b>As I was saying</b>, we need a new strategy.", uk:"Як я казав, нам потрібна нова стратегія." },
    ],
    tip:"⚠️ Може звучати трохи різко — сигналізує «не перебивайте». Використовуй м'яко." },

  { name:"where was I?", uk:"на чому я зупинився?", emoji:"🔗", cat:"return", lvl:"A2", reg:"casual",
    formula:"Where was I? + clause",
    when:"Сам загубив думку — просиш нагадати або продовжуєш.",
    examples:[
      { en:"Sorry, <b>where was I</b>? Oh yes, the meeting!", uk:"Вибач, на чому я зупинився? А, так, зустріч!" },
    ],
    tip:"💡 Casual. Часто говориш сам собі, відновлюючи потік." },

  { name:"back to what I was saying", uk:"повертаючись до того, що я казав", emoji:"🔗", cat:"return", lvl:"B1", reg:"neutral",
    formula:"Back to what I was saying, + clause",
    when:"Явне повернення після довгого відступу.",
    examples:[
      { en:"<b>Back to what I was saying</b> — we need to leave by 6.", uk:"Повертаючись до того — нам треба піти до 6." },
    ] },

  { name:"anyhow", uk:"у будь-якому разі", emoji:"🔗", cat:"return", lvl:"B1", reg:"casual",
    formula:"Anyhow, + clause",
    when:"= anyway. Casual синонім, трохи рідший.",
    examples:[
      { en:"<b>Anyhow</b>, let's move on.", uk:"У будь-якому разі, рухаймось далі." },
    ] },

  { name:"getting back to", uk:"повертаючись до", emoji:"🔗", cat:"return", lvl:"B2", reg:"neutral",
    formula:"Getting back to + noun, + clause",
    when:"Свідомо повертаєшся до конкретної теми. Presentation-friendly.",
    examples:[
      { en:"<b>Getting back to</b> the main point, we need more time.", uk:"Повертаючись до головного — нам потрібно більше часу." },
    ] },

  // ============= PERSONAL TAKE =============
  { name:"personally", uk:"особисто (я)", emoji:"💭", cat:"personal", lvl:"A2", reg:"neutral",
    formula:"Personally, + I + clause",
    when:"⭐ Підкреслюєш, що це твоя суб'єктивна думка.",
    examples:[
      { en:"<b>Personally</b>, I think the film was overrated.", uk:"Особисто я вважаю, що фільм переоцінений." },
      { en:"<b>Personally</b>, I'd prefer to stay home.", uk:"Особисто я б хотів лишитись удома." },
    ] },

  { name:"if you ask me", uk:"якщо тебе цікавить моя думка", emoji:"💭", cat:"personal", lvl:"B1", reg:"casual",
    formula:"If you ask me, + clause",
    when:"⭐ Висловлюєш думку, навіть якщо не питали. Часто з ноткою впевненості.",
    examples:[
      { en:"<b>If you ask me</b>, he doesn't deserve it.", uk:"Якщо тебе цікавить моя думка — він цього не вартий." },
      { en:"<b>If you ask me</b>, that's a bad idea.", uk:"На мій погляд — це погана ідея." },
    ] },

  { name:"in my opinion / IMO", uk:"на мою думку", emoji:"💭", cat:"personal", lvl:"A2", reg:"neutral",
    formula:"In my opinion, + clause",
    when:"Класичне вираження думки. «IMO» — у чатах.",
    examples:[
      { en:"<b>In my opinion</b>, the government is failing.", uk:"На мою думку, уряд провалюється." },
      { en:"<b>IMO</b>, that's not the point.", uk:"На мою думку, не в цьому суть." },
    ] },

  { name:"in my view", uk:"на мій погляд", emoji:"💭", cat:"personal", lvl:"B1", reg:"formal",
    formula:"In my view, + clause",
    when:"Трохи формальніше за «in my opinion». Для дискусій, есе.",
    examples:[
      { en:"<b>In my view</b>, this is the only solution.", uk:"На мій погляд, це єдине рішення." },
    ] },

  { name:"the way I see it", uk:"як я це бачу", emoji:"💭", cat:"personal", lvl:"B1", reg:"neutral",
    formula:"The way I see it, + clause",
    when:"⭐ Більш «характерне» — підкреслює твою інтерпретацію.",
    examples:[
      { en:"<b>The way I see it</b>, we have two options.", uk:"Як я це бачу — у нас два варіанти." },
    ] },

  { name:"to my mind", uk:"на мою думку", emoji:"💭", cat:"personal", lvl:"B2", reg:"formal",
    formula:"To my mind, + clause",
    when:"= in my view. Ще формальніше.",
    examples:[
      { en:"<b>To my mind</b>, the film lacked depth.", uk:"На мою думку, фільму бракувало глибини." },
    ] },

  { name:"as far as I'm concerned", uk:"як на мене / з моєї точки зору", emoji:"💭", cat:"personal", lvl:"B2", reg:"neutral",
    formula:"As far as I'm concerned, + clause",
    when:"⭐ Підкреслює: «моя позиція така». Часто в дискусіях.",
    examples:[
      { en:"<b>As far as I'm concerned</b>, the case is closed.", uk:"Як на мене — питання закрите." },
    ] },

  { name:"if I'm honest", uk:"якщо чесно", emoji:"💭", cat:"personal", lvl:"B1", reg:"casual",
    formula:"If I'm honest, + clause",
    when:"Casual версія «to be honest». Перед чесною/неприємною думкою.",
    examples:[
      { en:"<b>If I'm honest</b>, I didn't enjoy it.", uk:"Якщо чесно, мені не сподобалось." },
    ] },

  { name:"to be honest / TBH", uk:"чесно кажучи", emoji:"💭", cat:"personal", lvl:"A2", reg:"neutral",
    formula:"To be honest, + clause",
    when:"⭐ Перед чесною думкою, часто прямою або різкою.",
    examples:[
      { en:"<b>To be honest</b>, I don't like this film.", uk:"Чесно кажучи, мені не подобається цей фільм." },
      { en:"<b>TBH</b>, I forgot.", uk:"Чесно, я забув." },
    ],
    tip:"💡 «TBH» — у чатах, SMS. У розмові — повне «to be honest»." },

  { name:"in my book", uk:"в моїй книзі / на мій рахунок", emoji:"💭", cat:"personal", lvl:"C1", reg:"casual",
    formula:"In my book, + clause",
    when:"Casual ідіома: «за моїми стандартами». Часто про моральну оцінку.",
    examples:[
      { en:"<b>In my book</b>, that's just cheating.", uk:"На мій погляд — це просто обман." },
    ] },

  // ============= SOFTENING =============
  { name:"kind of / kinda", uk:"якось / трохи / типу", emoji:"⚠️", cat:"soften", lvl:"A2", reg:"casual",
    formula:"kind of + adj/verb",
    when:"⭐ Пом'якшувач. «Якось», «трохи». Робить твердження менш категоричним.",
    examples:[
      { en:"It's <b>kind of</b> weird.", uk:"Воно якось дивно." },
      { en:"I'm <b>kinda</b> tired.", uk:"Я трохи втомлений." },
    ],
    tip:"💡 «Kinda» — casual. Дуже частий у розмові." },

  { name:"sort of / sorta", uk:"наче / типу", emoji:"⚠️", cat:"soften", lvl:"A2", reg:"casual",
    formula:"sort of + adj/verb",
    when:"= kind of. Casual синонім. Casual.",
    examples:[
      { en:"I <b>sort of</b> like it.", uk:"Мені воно наче подобається." },
      { en:"She's <b>sorta</b> my friend.", uk:"Вона типу моя подруга." },
    ] },

  { name:"in a way", uk:"у певному сенсі", emoji:"⚠️", cat:"soften", lvl:"B1", reg:"neutral",
    formula:"In a way, + clause",
    when:"Часткова згода або м'яка позиція. Уникає «так» і «ні».",
    examples:[
      { en:"<b>In a way</b>, you're right.", uk:"У певному сенсі ти правий." },
    ] },

  { name:"more or less", uk:"більш-менш", emoji:"⚠️", cat:"soften", lvl:"B1", reg:"neutral",
    formula:"more or less + adj/noun",
    when:"Приблизна оцінка. «Не точно, але близько».",
    examples:[
      { en:"It's <b>more or less</b> the same.", uk:"Це більш-менш те саме." },
      { en:"I <b>more or less</b> agree.", uk:"Я більш-менш згоден." },
    ] },

  { name:"to some extent", uk:"певною мірою", emoji:"⚠️", cat:"soften", lvl:"B2", reg:"formal",
    formula:"To some extent, + clause",
    when:"Формальне «частково». Для дискусій, есе.",
    examples:[
      { en:"<b>To some extent</b>, that's true.", uk:"Певною мірою це правда." },
    ] },

  { name:"I would say", uk:"я б сказав", emoji:"⚠️", cat:"soften", lvl:"B1", reg:"neutral",
    formula:"I would say + clause",
    when:"⭐ М'яка думка без категоричності.",
    examples:[
      { en:"<b>I'd say</b> it's overrated.", uk:"Я б сказав, переоцінено." },
      { en:"<b>I'd say</b> about 50 people came.", uk:"Я б сказав, прийшло близько 50 людей." },
    ] },

  { name:"I guess", uk:"мабуть / я думаю", emoji:"⚠️", cat:"soften", lvl:"A2", reg:"casual",
    formula:"I guess (+ clause) / + comma at end",
    when:"⭐ Casual пом'якшена думка. Часто в кінці як хвостик.",
    examples:[
      { en:"<b>I guess</b> we could try.", uk:"Мабуть, можемо спробувати." },
      { en:"It's ok, <b>I guess</b>.", uk:"Нормально, мабуть." },
    ] },

  { name:"sort of like", uk:"щось типу як", emoji:"⚠️", cat:"soften", lvl:"B1", reg:"casual",
    formula:"sort of like + noun",
    when:"Casual порівняння. «Щось таке, як...».",
    examples:[
      { en:"It's <b>sort of like</b> chicken.", uk:"Воно щось типу як курка." },
    ] },

  { name:"if you know what I mean", uk:"якщо ти розумієш, про що я", emoji:"⚠️", cat:"soften", lvl:"B2", reg:"casual",
    formula:"...if you know what I mean.",
    when:"Пом'якшує натяк, який ти не хочеш вимовляти прямо.",
    examples:[
      { en:"He's got a lot of energy, <b>if you know what I mean</b>.", uk:"У нього багато енергії, якщо розумієш, про що я." },
    ] },

  // ============= EMPHASIS =============
  { name:"actually", uk:"насправді / власне", emoji:"💥", cat:"emphasis", lvl:"A2", reg:"neutral",
    formula:"Actually, + clause",
    when:"⭐ Виправляєш попереднє припущення. Часто перед несподіваним фактом.",
    examples:[
      { en:"<b>Actually</b>, I disagree.", uk:"Насправді, я не згоден." },
      { en:"He's <b>actually</b> quite nice.", uk:"Він насправді досить милий." },
    ],
    tip:"⚠️ НЕ значить «актуально»! Значить «насправді» або уточнення." },

  { name:"in fact", uk:"власне / насправді", emoji:"💥", cat:"emphasis", lvl:"B1", reg:"neutral",
    formula:"In fact, + clause (often surprising)",
    when:"⭐ Додає сильнішу / несподівану правду.",
    examples:[
      { en:"He's smart. <b>In fact</b>, he's a genius.", uk:"Він розумний. Власне, він геній." },
      { en:"<b>In fact</b>, sales doubled.", uk:"Насправді, продажі подвоїлись." },
    ] },

  { name:"as a matter of fact", uk:"фактично / до речі", emoji:"💥", cat:"emphasis", lvl:"B2", reg:"neutral",
    formula:"As a matter of fact, + clause",
    when:"Формальніше «in fact». Часто вводить додаткову інформацію на підтримку.",
    examples:[
      { en:"<b>As a matter of fact</b>, I was there yesterday.", uk:"Фактично, я був там учора." },
    ] },

  { name:"believe it or not", uk:"віриш чи ні", emoji:"💥", cat:"emphasis", lvl:"B1", reg:"casual",
    formula:"Believe it or not, + clause",
    when:"⭐ Перед дивовижним фактом. Casual, дружньо.",
    examples:[
      { en:"<b>Believe it or not</b>, I've never seen that film.", uk:"Віриш чи ні, я ніколи не бачив того фільму." },
    ] },

  { name:"no kidding / seriously", uk:"без жартів / серйозно", emoji:"💥", cat:"emphasis", lvl:"B1", reg:"casual",
    formula:"No kidding, + clause",
    when:"Підкреслює правдивість. Часто після сумніву.",
    examples:[
      { en:"<b>No kidding</b>, that's a great deal!", uk:"Без жартів, це супер пропозиція!" },
      { en:"<b>Seriously</b>, you should try it.", uk:"Серйозно, ти маєш спробувати." },
    ] },

  { name:"to tell you the truth", uk:"чесно кажучи", emoji:"💥", cat:"emphasis", lvl:"B1", reg:"casual",
    formula:"To tell you the truth, + clause",
    when:"Casual версія «to be honest». Перед відвертою думкою.",
    examples:[
      { en:"<b>To tell you the truth</b>, I forgot.", uk:"Чесно кажучи, я забув." },
    ] },

  { name:"strictly speaking", uk:"строго кажучи", emoji:"💥", cat:"emphasis", lvl:"C1", reg:"formal",
    formula:"Strictly speaking, + clause",
    when:"Уточнюєш точність факту, часто протиставляєш загальному сприйняттю.",
    examples:[
      { en:"<b>Strictly speaking</b>, a tomato is a fruit.", uk:"Строго кажучи, помідор — це фрукт." },
    ] },

  { name:"the truth is", uk:"правда в тому, що", emoji:"💥", cat:"emphasis", lvl:"B1", reg:"neutral",
    formula:"The truth is, + clause",
    when:"⭐ Перед сильним аргументом / неприємною істиною.",
    examples:[
      { en:"<b>The truth is</b>, nobody cares.", uk:"Правда в тому, що нікого це не хвилює." },
    ] },

  { name:"in reality", uk:"насправді / у реальності", emoji:"💥", cat:"emphasis", lvl:"B2", reg:"neutral",
    formula:"In reality, + clause",
    when:"Протиставляєш реальність тому, що вважалось.",
    examples:[
      { en:"He seems friendly, but <b>in reality</b>, he's manipulative.", uk:"Він виглядає доброзичливим, але насправді — маніпулятор." },
    ] },

  { name:"mind you", uk:"хоча / врахуй / до речі", emoji:"💥", cat:"emphasis", lvl:"B2", reg:"casual",
    formula:"..., mind you, + clause / clause + mind you",
    when:"⭐ BRITISH. Додаєш застереження або несподіваний факт до сказаного.",
    examples:[
      { en:"He's really kind. <b>Mind you</b>, he can be stubborn too.", uk:"Він дуже добрий. Хоча буває впертим." },
      { en:"It was expensive, <b>mind you</b>, worth it.", uk:"Було дорого, врахуй, того варте." },
    ],
    tip:"🇬🇧 British casual. Дуже характерне для британців." },

  // ============= REFORMULATION =============
  { name:"I mean", uk:"тобто / я маю на увазі", emoji:"🔄", cat:"reform", lvl:"A2", reg:"casual",
    formula:"I mean, + clause",
    when:"⭐ НАЙЧАСТІШИЙ філлер-переформулювання. Уточнюєш або перефразовуєш свою думку.",
    examples:[
      { en:"I love it. <b>I mean</b>, it's amazing!", uk:"Мені подобається. Тобто, це супер!" },
      { en:"<b>I mean</b>, what's the point?", uk:"Тобто, який сенс?" },
    ],
    tip:"⚠️ Найпопулярніший discourse marker у розмові! Але не зловживай — може звучати як заповнювач." },

  { name:"in other words", uk:"інакше кажучи", emoji:"🔄", cat:"reform", lvl:"A2", reg:"neutral",
    formula:"In other words, + clause",
    when:"⭐ Кажеш те саме інакшими словами. Часто пом'якшує.",
    examples:[
      { en:"He's not the most punctual. <b>In other words</b>, he's always late.", uk:"Він не найпунктуальніший. Інакше кажучи, завжди запізнюється." },
    ] },

  { name:"that is (to say) / i.e.", uk:"тобто / а саме", emoji:"🔄", cat:"reform", lvl:"B2", reg:"formal",
    formula:"..., that is, + clause / i.e.",
    when:"Формальне уточнення. У письмі скорочують до «i.e.».",
    examples:[
      { en:"Meet me next Friday, <b>that is</b>, the 15th.", uk:"Зустрінемось наступної п'ятниці, тобто 15-го." },
      { en:"We work daily, <b>i.e.</b>, every day of the week.", uk:"Ми працюємо щодня, тобто кожен день тижня." },
    ] },

  { name:"or rather", uk:"точніше / або краще сказати", emoji:"🔄", cat:"reform", lvl:"B1", reg:"neutral",
    formula:"..., or rather, + clause",
    when:"⭐ Виправляєш свою попередню фразу.",
    examples:[
      { en:"He's tall, <b>or rather</b>, very tall.", uk:"Він високий, точніше — дуже високий." },
    ] },

  { name:"put another way / to put it another way", uk:"інакше кажучи", emoji:"🔄", cat:"reform", lvl:"B2", reg:"neutral",
    formula:"To put it another way, + clause",
    when:"= in other words. Формальніше.",
    examples:[
      { en:"<b>To put it another way</b>, it's not what we hoped for.", uk:"Інакше кажучи, це не те, на що ми сподівались." },
    ] },

  { name:"what I'm trying to say is", uk:"я намагаюсь сказати, що", emoji:"🔄", cat:"reform", lvl:"B1", reg:"neutral",
    formula:"What I'm trying to say is + clause",
    when:"Ти відчуваєш, що не сформулював чітко — пробуєш ще раз.",
    examples:[
      { en:"<b>What I'm trying to say is</b> I need a break.", uk:"Я намагаюсь сказати, що мені потрібна перерва." },
    ] },

  { name:"what I mean is", uk:"я маю на увазі", emoji:"🔄", cat:"reform", lvl:"A2", reg:"neutral",
    formula:"What I mean is, + clause",
    when:"⭐ Тебе не зрозуміли — пояснюєш по-іншому.",
    examples:[
      { en:"<b>What I mean is</b>, we should leave earlier.", uk:"Я маю на увазі, нам треба виходити раніше." },
    ] },

  { name:"in simpler terms", uk:"простіше кажучи", emoji:"🔄", cat:"reform", lvl:"B2", reg:"formal",
    formula:"In simpler terms, + clause",
    when:"Формальне спрощення. Презентації, лекції.",
    examples:[
      { en:"<b>In simpler terms</b>, we're losing money.", uk:"Простіше кажучи, ми втрачаємо гроші." },
    ] },

  { name:"basically", uk:"по суті", emoji:"🔄", cat:"reform", lvl:"A2", reg:"casual",
    formula:"Basically, + clause",
    when:"⭐ Casual спрощення до суті.",
    examples:[
      { en:"<b>Basically</b>, we lost.", uk:"По суті, ми програли." },
    ] },

  // ============= FILLER =============
  { name:"well", uk:"ну / що ж", emoji:"🤔", cat:"filler", lvl:"A1", reg:"casual",
    formula:"Well, + clause",
    when:"⭐ Найуніверсальніший філлер. Виграєш секунду перед думкою.",
    examples:[
      { en:"<b>Well</b>, I'm not sure.", uk:"Ну, я не впевнений." },
      { en:"<b>Well</b>, that's a good question.", uk:"Що ж, гарне питання." },
    ] },

  { name:"you know", uk:"ну знаєш", emoji:"🤔", cat:"filler", lvl:"A2", reg:"casual",
    formula:"..., you know, ...",
    when:"⭐ Casual філлер. Апелює до розуміння співрозмовника.",
    examples:[
      { en:"It's just, <b>you know</b>, weird.", uk:"Це просто, ну знаєш, дивно." },
      { en:"<b>You know</b> what I mean?", uk:"Ну розумієш, про що я?" },
    ],
    tip:"⚠️ Не зловживай — може звучати як заповнювач без сенсу. Максимум 2-3 рази за розмову." },

  { name:"like", uk:"типу / як", emoji:"🤔", cat:"filler", lvl:"A2", reg:"casual",
    formula:"..., like, ...",
    when:"⚠️ Дуже casual філлер. Не зловживай — звучить як підліток.",
    examples:[
      { en:"It was, <b>like</b>, really weird.", uk:"Воно було, типу, реально дивне." },
      { en:"I was <b>like</b>, «no way!»", uk:"Я такий: «не може бути!»" },
    ],
    tip:"⚠️ У формальному контексті — уникай! Може звучати непрофесійно." },

  { name:"let me think", uk:"дай подумаю", emoji:"🤔", cat:"filler", lvl:"A2", reg:"neutral",
    formula:"Let me think... + clause",
    when:"Даєш собі 2-3 секунди подумати. Соціально прийнятна пауза.",
    examples:[
      { en:"<b>Let me think...</b> I guess Monday works.", uk:"Дай подумаю... мабуть, понеділок підходить." },
    ] },

  { name:"how can I put this", uk:"як би це сказати", emoji:"🤔", cat:"filler", lvl:"B2", reg:"neutral",
    formula:"How can I put this... + clause",
    when:"⭐ Перед делікатною / складною думкою. Натякає, що формулюєш обережно.",
    examples:[
      { en:"<b>How can I put this...</b> he's not the easiest person.", uk:"Як би це сказати... з ним непросто." },
    ] },

  { name:"give me a second", uk:"дай секунду", emoji:"🤔", cat:"filler", lvl:"A2", reg:"casual",
    formula:"Give me a second, + clause",
    when:"Просиш паузу для думки або перевірки.",
    examples:[
      { en:"<b>Give me a second</b> — I need to check.", uk:"Дай секунду — мені треба перевірити." },
    ] },

  { name:"off the top of my head", uk:"так одразу з голови", emoji:"🤔", cat:"filler", lvl:"B2", reg:"casual",
    formula:"Off the top of my head, + clause",
    when:"Швидка відповідь без обмірковування.",
    examples:[
      { en:"<b>Off the top of my head</b>, I'd say 50 people.", uk:"Так одразу з голови — сказав би 50 людей." },
    ] },

  { name:"I'm not sure but", uk:"я не впевнений, але", emoji:"🤔", cat:"filler", lvl:"A2", reg:"neutral",
    formula:"I'm not sure, but + clause",
    when:"Пом'якшує невпевнену відповідь.",
    examples:[
      { en:"<b>I'm not sure, but</b> I think it's Tuesday.", uk:"Я не впевнений, але думаю, це вівторок." },
    ] },

  // ============= CLOSING / WRAP =============
  { name:"at the end of the day", uk:"зрештою", emoji:"🎁", cat:"wrap", lvl:"B1", reg:"neutral",
    formula:"At the end of the day, + clause",
    when:"⭐ Філософське резюме: «що б не було — головне ось це».",
    examples:[
      { en:"<b>At the end of the day</b>, family matters most.", uk:"Зрештою, найважливіше — це сім'я." },
    ],
    tip:"⚠️ НЕ буквально «в кінці дня»! Це філософське «врешті-решт»." },

  { name:"all in all", uk:"загалом", emoji:"🎁", cat:"wrap", lvl:"B1", reg:"neutral",
    formula:"All in all, + clause",
    when:"Балансований висновок після зважування «за» і «проти».",
    examples:[
      { en:"<b>All in all</b>, it was a great trip.", uk:"Загалом, це була чудова подорож." },
    ] },

  { name:"all things considered", uk:"з урахуванням усього", emoji:"🎁", cat:"wrap", lvl:"B2", reg:"neutral",
    formula:"All things considered, + clause",
    when:"Формальніше «all in all». Часто в аналітиці.",
    examples:[
      { en:"<b>All things considered</b>, it went well.", uk:"З урахуванням усього — все пройшло добре." },
    ] },

  { name:"in the end", uk:"врешті-решт", emoji:"🎁", cat:"wrap", lvl:"B1", reg:"neutral",
    formula:"In the end, + clause",
    when:"Розмовний підсумок про фінальний результат.",
    examples:[
      { en:"<b>In the end</b>, we decided to stay.", uk:"Врешті-решт, ми вирішили залишитись." },
    ],
    tip:"⚠️ НЕ плутай з «at the end» (фізичний кінець місця)." },

  { name:"the bottom line is", uk:"суть у тому, що", emoji:"🎁", cat:"wrap", lvl:"B1", reg:"neutral",
    formula:"The bottom line is, + clause",
    when:"⭐ Бізнес-фаворит. Практичний фінальний висновок без води.",
    examples:[
      { en:"<b>The bottom line is</b>, we need more time.", uk:"Суть у тому, що нам потрібно більше часу." },
    ] },

  { name:"long story short", uk:"коротко кажучи", emoji:"🎁", cat:"wrap", lvl:"B1", reg:"casual",
    formula:"Long story short, + clause",
    when:"⭐ Casual — стискаєш довгу історію в одне речення.",
    examples:[
      { en:"<b>Long story short</b>, we missed the flight.", uk:"Коротко кажучи, ми пропустили літак." },
    ] },

  { name:"to cut a long story short", uk:"скорочуючи довгу історію", emoji:"🎁", cat:"wrap", lvl:"B2", reg:"neutral",
    formula:"To cut a long story short, + clause",
    when:"Формальніша версія «long story short». British.",
    examples:[
      { en:"<b>To cut a long story short</b>, we cancelled the trip.", uk:"Скорочуючи довгу історію — ми скасували подорож." },
    ] },

  { name:"in a nutshell", uk:"у двох словах", emoji:"🎁", cat:"wrap", lvl:"B2", reg:"neutral",
    formula:"In a nutshell, + clause",
    when:"⭐ Стискаєш складну тему до 1-2 речень. Дуже частий у бізнесі.",
    examples:[
      { en:"<b>In a nutshell</b>, we need a fresh approach.", uk:"У двох словах: нам потрібен свіжий підхід." },
    ] },

  { name:"to sum up", uk:"підсумовуючи", emoji:"🎁", cat:"wrap", lvl:"B1", reg:"formal",
    formula:"To sum up, + clause",
    when:"Формальне резюме. Презентації, есе.",
    examples:[
      { en:"<b>To sum up</b>, we have three options.", uk:"Підсумовуючи, у нас три варіанти." },
    ] },

  { name:"in conclusion", uk:"на закінчення", emoji:"🎁", cat:"wrap", lvl:"B1", reg:"formal",
    formula:"In conclusion, + clause",
    when:"Академічно. Часто в кінці есе.",
    examples:[
      { en:"<b>In conclusion</b>, the plan works.", uk:"На закінчення, план працює." },
    ],
    tip:"⚠️ У розмові звучить сухо. Використовуй лише в письмі/презентаціях." },

  { name:"either way", uk:"так чи інакше", emoji:"🎁", cat:"wrap", lvl:"B1", reg:"neutral",
    formula:"Either way, + clause",
    when:"«Незалежно від варіанту». Універсальний перехід до висновку.",
    examples:[
      { en:"<b>Either way</b>, I'm happy.", uk:"Так чи інакше, я щасливий." },
    ] },

  { name:"that being said", uk:"з цим сказано / з іншого боку", emoji:"🎁", cat:"wrap", lvl:"B2", reg:"neutral",
    formula:"That being said, + clause",
    when:"⭐ Робиш нюанс на своє попереднє твердження. Ознака зрілого мовця.",
    examples:[
      { en:"I love him. <b>That being said</b>, he drives me crazy.", uk:"Я його люблю. З іншого боку — він мене до сказу доводить." },
    ],
    tip:"💡 Схоже на «having said that». Показує, що ти визнаєш нюанси." },

  { name:"so yeah", uk:"ось як / ну ось", emoji:"🎁", cat:"wrap", lvl:"A2", reg:"casual",
    formula:"So yeah, + clause / stand-alone",
    when:"Casual закриття думки. Часто просто «so yeah» як фінал.",
    examples:[
      { en:"<b>So yeah</b>, that's why I quit.", uk:"Ну ось, тому я звільнився." },
      { en:"<b>So yeah.</b>", uk:"Ну ось.  (закінчення історії)" },
    ] },
];


const FILL_QS = [
  { ctx:"🎯 Хочеш переключити фокус на іншу тему", target:"John got the job. ___ me, I'm still waiting.", correct:"As for", distractors:["Speaking of","Anyway","Personally"], uk:"Джон отримав роботу. Що ж до мене — я досі чекаю." },
  { ctx:"🎯 Плавно вводиш пов'язану тему", target:"I met John. ___ John, did you hear he's engaged?", correct:"Speaking of", distractors:["As for","Anyway","By the way"], uk:"Я зустрів Джона. До речі про Джона — чув, він заручився?" },
  { ctx:"🎯 Коли йдеться про конкретну сферу", target:"___ cooking, my mom is the best.", correct:"When it comes to", distractors:["As for","In fact","Anyway"], uk:"Коли йдеться про готування, моя мама найкраща." },
  { ctx:"🔗 Повертаєшся до основної теми після відступу", target:"...so the dog bit him. ___, what were you saying?", correct:"Anyway", distractors:["Speaking of","In fact","Kind of"], uk:"...так собака його вкусив. Коротше, що ти казав?" },
  { ctx:"💭 Підкреслюєш, що це твоя думка", target:"___, I think the film was overrated.", correct:"Personally", distractors:["Basically","Anyway","Actually"], uk:"Особисто я думаю, що фільм переоцінений." },
  { ctx:"💭 Висловлюєш думку, навіть якщо не питали", target:"___, he doesn't deserve it.", correct:"If you ask me", distractors:["I mean","Believe it or not","Basically"], uk:"Якщо тебе цікавить моя думка — він цього не вартий." },
  { ctx:"⚠️ Пом'якшуєш заяву — 'трохи'", target:"I'm ___ tired today.", correct:"kind of", distractors:["actually","in fact","obviously"], uk:"Я трохи втомлений сьогодні." },
  { ctx:"⚠️ Часткова згода, не категорично", target:"___, you're right.", correct:"In a way", distractors:["Actually","No kidding","Anyway"], uk:"У певному сенсі ти правий." },
  { ctx:"💥 Виправляєш припущення — 'насправді'", target:"___, I disagree with him.", correct:"Actually", distractors:["Kind of","Basically","Speaking of"], uk:"Насправді, я з ним не згоден." },
  { ctx:"💥 Перед несподіваним фактом", target:"___, I've never seen that film!", correct:"Believe it or not", distractors:["Anyway","In my book","Sort of"], uk:"Віриш чи ні, я ніколи не бачив того фільму!" },
  { ctx:"💥 Британське — застереження або додаток", target:"He's really kind. ___, he can be stubborn too.", correct:"Mind you", distractors:["Actually","Anyway","Basically"], uk:"Він дуже добрий. Хоча буває впертим." },
  { ctx:"🔄 Переформульовуєш — 'я маю на увазі'", target:"I love it. ___, it's amazing!", correct:"I mean", distractors:["Anyway","In fact","Actually"], uk:"Мені подобається. Тобто, це супер!" },
  { ctx:"🔄 Кажеш те саме інакшими словами", target:"He's not the most punctual. ___, he's always late.", correct:"In other words", distractors:["Anyway","Speaking of","Well"], uk:"Він не найпунктуальніший. Інакше кажучи, завжди запізнюється." },
  { ctx:"🔄 Виправляєш свою фразу", target:"He's tall, ___, very tall.", correct:"or rather", distractors:["I mean","in fact","by the way"], uk:"Він високий, точніше — дуже високий." },
  { ctx:"🤔 Універсальний філлер перед думкою", target:"___, I'm not sure about that.", correct:"Well", distractors:["Actually","Anyway","Basically"], uk:"Ну, я в цьому не впевнений." },
  { ctx:"🤔 Casual філлер — 'ну знаєш'", target:"It's just, ___, weird.", correct:"you know", distractors:["actually","in fact","after all"], uk:"Це просто, ну знаєш, дивно." },
  { ctx:"🎁 Філософське 'зрештою'", target:"___, family matters most.", correct:"At the end of the day", distractors:["Anyway","Actually","Basically"], uk:"Зрештою, найважливіше — це сім'я." },
  { ctx:"🎁 Загальний висновок після зважування", target:"___, it was a great trip.", correct:"All in all", distractors:["In fact","Actually","Speaking of"], uk:"Загалом, це була чудова подорож." },
  { ctx:"🎁 Casual — стискаєш довгу історію", target:"___, we missed the flight.", correct:"Long story short", distractors:["In fact","As for","Anyway"], uk:"Коротко кажучи, ми пропустили літак." },
  { ctx:"🎯 Формально в бізнес-листі", target:"___ your email, I'll reply tomorrow.", correct:"Regarding", distractors:["Speaking of","Anyway","By the way"], uk:"Стосовно твого листа — відповім завтра." },
];
const TR_QS = [
  { uk:"Що ж до мене — я досі чекаю.", answers:["As for me, I'm still waiting","As for me I'm still waiting","As for me, I am still waiting"], hint:"topic shift — as for" },
  { uk:"Коли йдеться про готування, моя мама найкраща.", answers:["When it comes to cooking, my mom is the best","When it comes to cooking my mom is the best"], hint:"when it comes to + V-ing" },
  { uk:"До речі про Джона — чув, він одружився?", answers:["Speaking of John, did you hear he got married","Speaking of John did you hear he got married"], hint:"speaking of + noun" },
  { uk:"Як на мене, питання закрите.", answers:["As far as I'm concerned, the issue is closed","As far as I am concerned, the issue is closed","As far as I'm concerned the issue is closed"], hint:"as far as I'm concerned" },
  { uk:"У будь-якому разі, мені треба йти.", answers:["Anyway, I gotta go","Anyway I gotta go","Anyway, I have to go","Anyway I have to go"], hint:"topic return — anyway" },
  { uk:"Особисто я думаю, це переоцінено.", answers:["Personally, I think it's overrated","Personally I think it's overrated","Personally, I think it is overrated"], hint:"personal take — personally" },
  { uk:"Насправді, я з ним не згоден.", answers:["Actually, I disagree with him","Actually I disagree with him"], hint:"emphasis — actually" },
  { uk:"Я маю на увазі, нам треба виходити раніше.", answers:["I mean, we should leave earlier","I mean we should leave earlier","What I mean is, we should leave earlier"], hint:"reformulation — I mean" },
  { uk:"Інакше кажучи, він завжди запізнюється.", answers:["In other words, he's always late","In other words he's always late","In other words, he is always late"], hint:"in other words" },
  { uk:"Коротко кажучи, ми пропустили літак.", answers:["Long story short, we missed the flight","Long story short we missed the flight"], hint:"wrap — long story short" },
  { uk:"Зрештою, найважливіше — це сім'я.", answers:["At the end of the day, family matters most","At the end of the day family matters most"], hint:"philosophical wrap" },
  { uk:"У двох словах, нам потрібен свіжий підхід.", answers:["In a nutshell, we need a fresh approach","In a nutshell we need a fresh approach"], hint:"in a nutshell" },
  { uk:"Я трохи втомлений.", answers:["I'm kind of tired","I am kind of tired","I'm kinda tired","I am kinda tired","I'm sort of tired","I'm sorta tired"], hint:"softening — kind of / sort of" },
  { uk:"Ну, я не впевнений.", answers:["Well, I'm not sure","Well I'm not sure","Well, I am not sure"], hint:"filler — well" },
  { uk:"Стосовно твого листа — відповім завтра.", answers:["Regarding your email, I'll reply tomorrow","Regarding your email I'll reply tomorrow","Regarding your email, I will reply tomorrow"], hint:"formal — regarding" },
];
const INTRO = "<div class=\"intro-box pink\">\n<h3>🎯 Що таке Discourse Markers?</h3>\n<p><b>Discourse markers</b> — це слова та фрази, які не додають нової інформації, але <b>структурують мову</b>: вводять тему, змінюють фокус, коментують, пом'якшують, підсумовують. Це те, що робить тебе схожим на нейтива.</p>\n<p>Це <b>не звичайні connectors</b> (although, because) — це тонший інструмент: показує <b>твоє ставлення</b> до сказаного, <b>напрямок думки</b>, <b>перехід між темами</b>.</p>\n<p><b>Приклад:</b> «I love pasta. <b>As for</b> pizza, I could take it or leave it.» — «Я люблю пасту. Що ж до піци — можу і без неї.» Тут «as for» не додає факту, а <b>переключає фокус</b> на іншу тему.</p>\n</div>\n<div class=\"intro-box red\">\n<h3>🚫 Що станеться без цих маркерів?</h3>\n<p>Твоя мова буде звучати <b>відрубано, як з підручника</b>:</p>\n<div class=\"compare-grid\">\n<div class=\"compare-box bad\">\n<h4>❌ Без маркерів (робот):</h4>\n<p>\"I like pizza. Pasta is good. Sushi is okay. I don't like burgers.\"</p>\n<p>→ Сухо, схоже на список.</p>\n</div>\n<div class=\"compare-box good\">\n<h4>✅ З маркерами (нейтив):</h4>\n<p>\"I love pizza. <b>As for</b> pasta, it's alright. <b>Speaking of Italian food</b>, sushi's my weakness. <b>Mind you</b>, I'm not a huge burger fan.\"</p>\n<p>→ Живо, є перехід і особистість.</p>\n</div>\n</div>\n</div>\n<div class=\"intro-box blue\">\n<h3>🧠 8 функцій discourse markers у тренажері</h3>\n<ul>\n<li>🎯 <b>Topic Shift</b> — вводиш нову тему: as for, when it comes to, as far as X is concerned...</li>\n<li>🔗 <b>Topic Return</b> — повертаєшся до теми: anyway, as I was saying, back to what I was saying...</li>\n<li>💭 <b>Personal Take</b> — твоє ставлення: personally, if you ask me, in my book...</li>\n<li>⚠️ <b>Softening / Hedging</b> — пом'якшуєш: kind of, sort of, in a way, more or less...</li>\n<li>💥 <b>Emphasis</b> — підсилюєш: actually, in fact, believe it or not, no kidding...</li>\n<li>🔄 <b>Reformulation</b> — переформульовуєш: I mean, in other words, or rather, that is to say...</li>\n<li>🤔 <b>Hesitation / Filler</b> — граєш час: well, you know, like, sort of, I guess...</li>\n<li>🎁 <b>Closing / Wrap</b> — завершуєш: anyway, at the end of the day, all things considered...</li>\n</ul>\n</div>\n<div class=\"intro-box green\">";
const META = {"title":"🎙️ Discourse Markers — маркери розмовного дискурсу","lead":"Слова, які нейтиви <b>крутять щохвилини</b>: as for, speaking of, when it comes to, mind you, on second thought... Це <b>найтонший рівень володіння</b> — коли твоя мова тече природно."};
/* ===== CONNECTOR MERGE — маркери зміни/повернення теми та пом’якшення,
   яких бракувало, з connectors-in-flow-trainer.html ===== */
const FLOW_EXTRA = [ { "name": "By the way", "uk": "До речі", "emoji": "🎯", "cat": "shift", "lvl": "A2", "reg": "neutral", "when": "<b>Плавно вводиш</b> побіжну тему, яка не пов'язана з попередньою.", "examples": [ { "en": "...and I'll see you tomorrow. <b>By the way</b>, did you call your mom?", "uk": "...побачимось завтра. До речі, ти мамі дзвонив?" } ], "tip": "💡 Найуніверсальніший «зсув теми». Часто скорочується «BTW» у чатах." }, { "name": "Speaking of", "uk": "До речі про / коли вже зайшла мова", "emoji": "🎯", "cat": "shift", "lvl": "B1", "reg": "neutral", "when": "Пов'язуєш нову тему з тим, що щойно згадали.", "examples": [ { "en": "...I was talking to John yesterday. <b>Speaking of John</b>, did you hear he got married?", "uk": "...я говорив з Джоном учора. До речі про Джона — чув, він одружився?" } ], "tip": "💡 Підхоплює щойно згаданого. Природний логічний місток." }, { "name": "To be fair", "uk": "Якщо чесно / справедливо", "emoji": "🌫️", "cat": "soften", "lvl": "B1", "reg": "neutral", "when": "<b>Визнаєш</b> справедливість іншої сторони. Часто в дискусіях.", "examples": [ { "en": "He's annoying. But to be fair, he means well. <b></b>", "uk": "Він дратує. Але якщо чесно, він хоче добра." } ], "tip": "💡 Показує, що ти не упереджений. Робить тебе зрілішим у дискусії." }, { "name": "Admittedly", "uk": "Слід визнати", "emoji": "🌫️", "cat": "soften", "lvl": "B2", "reg": "neutral", "when": "Визнаєш <b>слабкість</b> своєї власної позиції.", "examples": [ { "en": "Admittedly, I haven't read the book. <b>But I've seen the film</b>.", "uk": "Слід визнати, я не читав книжку. Але бачив фільм." } ], "tip": "💡 Чесно. Робить твою позицію сильнішою, бо ти не приховуєш слабкостей." }, { "name": "Granted", "uk": "Допустимо / згоден", "emoji": "🌫️", "cat": "soften", "lvl": "B2", "reg": "neutral", "when": "Визнаєш частину аргументу опонента. «Так, це правда, але...».", "examples": [ { "en": "Granted, it's expensive, but it's worth it. <b></b>", "uk": "Допустимо, це дорого. Але воно того варте." } ], "tip": "💡 У дискусії — ознака зрілого мовця." }, { "name": "Sort of", "uk": "Типу / щось таке", "emoji": "🌫️", "cat": "soften", "lvl": "A2", "reg": "neutral", "when": "= kind of. Зм'якшує заяву. Casual.", "examples": [ { "en": "I sort of agree. <b></b>", "uk": "Я типу згоден." } ], "tip": "💡 Casual. Робить тебе менш категоричним. Дозволяє «передумати»." } ];
MARKERS.push.apply(MARKERS, FLOW_EXTRA);

return { CATS: CATS, MARKERS: MARKERS, FILL_QS: FILL_QS, TR_QS: TR_QS, INTRO: INTRO, META: META };
})();
