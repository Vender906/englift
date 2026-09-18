/* ============================================================
   EngLift — перевірка тексту щоденника (офлайн)
   Набір правил на типові помилки україномовних.
   Кожне правило: регулярний вираз, пояснення, варіант
   виправлення (якщо однозначний) і тема граматики.
   check(text) → [{ start, end, text, msg, fix, topic, id, kind }]
   ============================================================ */
(function () {
  'use strict';

  const A = "['’]";                    // обидва апострофи
  const SUBJ = '(I|you|he|she|it|we|they)';
  const THIRD = '(he|she|it)';
  const UNCOUNT = 'advice|information|news|furniture|luggage|baggage|homework|research|knowledge|equipment|evidence|traffic|weather|money|bread|music';
  const IRR_V3 = 'been|seen|done|gone|made|met|taken|given|written|eaten|drunk|bought|brought|thought|told|said|found|lost|left|read|heard|had|got|known|won|broken|chosen|forgotten|spoken|driven|flown|sent|spent|paid|built|felt|kept|slept|taught|caught|understood|become|come|run|begun|swum|sung';
  /* «I don’t know when he will come» — непряме питання, will там доречне */
  const notIndirect = (m, text) => !/\b(know|knows|knew|wonder|wondering|wondered|ask|asked|asks|sure|tell|told|idea|say|said|guess|remember|forgot|forget|understand|decide|decided|check|find out|see|depends on)\s*$/i.test(text.slice(Math.max(0, m.index - 30), m.index));
  const cap = (src, rep) => (src[0] === src[0].toUpperCase() && src[0] !== src[0].toLowerCase()) ? rep[0].toUpperCase() + rep.slice(1) : rep;

  const RULES = [
    /* ---------- be + дієслово / стан ---------- */
    { id: 'am-agree', re: new RegExp('\\b(I am|I' + A + 'm|we are|they are|you are|he is|she is)\\s+(agree|disagree)\\b', 'gi'),
      msg: '«agree» — вже дієслово, to be не потрібне: «Я згоден» = I agree.',
      fix: m => cap(m[0], m[1].split(/\s|['’]/)[0] + ' ' + (/(he|she) is/i.test(m[1]) ? m[2] + 's' : m[2])), topic: ['stative', 'stative-verbs'] },
    { id: 'be-base-verb', re: new RegExp('\\b(I am|I' + A + 'm|you are|we are|they are|he is|she is|it is)\\s+(want|know|need|live|work|go|come|love|hate|think|have|understand|remember|study|play)\\b(?!\\s*-)', 'gi'),
      msg: 'Після am / is / are не буває початкової форми дієслова. Звичка — Present Simple (I live), процес зараз — Continuous (I am living).',
      fix: null, topic: ['tenses', 'present-simple'] },

    /* ---------- 3-тя особа ---------- */
    { id: 'he-dont', re: new RegExp('\\b' + THIRD + '\\s+(don' + A + 't|do not)\\b', 'gi'),
      msg: 'he / she / it → doesn’t (does not).',
      fix: m => m[1] + ' ' + (/not/i.test(m[2]) ? 'does not' : 'doesn’t'), topic: ['tenses', 'present-simple'] },
    { id: 'he-have', re: new RegExp('(?<!\\b(?:does|did|do|can|could|will|would|should|shall|must|may|might|let|make|made|help|and|or|see|saw|seen|hear|heard|watch|watched|feel|felt|notice|noticed|of|to|for|with|about|that|doesn' + A + 't|didn' + A + 't|won' + A + 't|can' + A + 't)\\s)\\b' + THIRD + '\\s+(have|go|do|want|like|live|work|say|know|think|need|play|watch|make)\\b(?!\\s+(to\\s+)?been)', 'gi'),
      filter: m => !(/^it$/i.test(m[1]) && /^like$/i.test(m[2])),
      msg: 'Present Simple: he / she / it + дієслово з -s (she likes, he has, it goes).',
      fix: m => m[1] + ' ' + ({ have: 'has', go: 'goes', do: 'does', watch: 'watches', say: 'says' }[m[2].toLowerCase()] || m[2] + 's'), topic: ['tenses', 'present-simple'] },
    { id: 'does-verb-s', re: new RegExp('\\b(doesn' + A + 't|does not|didn' + A + 't|did not|don' + A + 't|do not|does|did)\\s+(' + SUBJ + '\\s+)?(likes|wants|goes|works|knows|lives|says|makes|thinks|comes|takes|gets|has|needs|plays|watches|went|liked|wanted|worked|knew|made|thought|came|took|got|had|saw|said|did|bought|ate|wrote)\\b', 'gi'),
      msg: 'Після do / does / did дієслово стоїть у початковій формі — без -s і без минулого часу.',
      fix: m => m[0].replace(new RegExp(m[4] + '$', 'i'), baseForm(m[4])), topic: ['tenses', 'past-simple'] },

    /* ---------- модальні ---------- */
    { id: 'modal-to', re: /\b(can|could|should|must|will|would|might|may)\s+to\s+([a-z]+)\b/gi,
      msg: 'Після модальних дієслів — без to: can swim, must go.',
      fix: m => m[1] + ' ' + m[2], topic: ['modals', 'can-could'] },
    { id: 'wish-i-would', re: /\bI wish I would\b/gi,
      msg: 'Про себе «I wish I would» не кажуть: вміння → I wish I could, жаль про минуле → I wish I had + V3.',
      fix: () => 'I wish I could', topic: ['conditionals', 'regret-reflection'] },
    { id: 'should-of', re: /(?<!\b(his|her|my|your|our|their|the|all|its)\s)\b(should|could|would|must|might)\s+of\b/gi,
      msg: '«should of» — помилка на слух. Правильно should have (should’ve).',
      fix: m => m[2] + ' have', topic: ['modals', 'modal-perfect'] },

    /* ---------- часи ---------- */
    { id: 'when-will', re: new RegExp('\\b(when|as soon as|until|before|after|once|by the time)\\s+' + SUBJ + '\\s+will\\s+', 'gi'),
      filter: notIndirect,
      msg: 'Після when / as soon as / until / before / after про майбутнє — Present Simple, без will: When I get home…',
      fix: null, topic: ['time-clauses', 'time-future'] },
    { id: 'if-will', re: new RegExp('\\bif\\s+(I|he|she|it|we|they)\\s+will\\s+(?!be able)', 'gi'),
      filter: notIndirect,
      msg: 'В умові з if про майбутнє — Present Simple: If it rains, we will stay home (не «if it will rain»).',
      fix: null, topic: ['conditionals', 'zero-first'] },
    { id: 'perfect-past-time', re: new RegExp('\\b(have|has|' + "I've|you've|we've|they've|he's|she's" + ')\\s+(\\w+ed|' + IRR_V3 + ')\\b[^.!?,;\\n]{0,25}?\\b(yesterday|last (night|week|month|year|summer|weekend|monday|tuesday|wednesday|thursday|friday|saturday|sunday)|\\d+ (days?|weeks?|months?|years?) ago|in (19|20)\\d\\d)\\b', 'gi'),
      filter: (m, text) => !/\b(since|for|until|till|from|before|by|about|of|the last|the past)\b/i.test(m[0]) &&
        !/\b(might|could|would|should|must|may|will|to)\s*$/i.test(text.slice(Math.max(0, m.index - 12), m.index)),
      msg: 'Конкретний минулий час (yesterday, last…, ago) → Past Simple, а не Present Perfect.',
      fix: null, topic: ['tenses', 'present-perfect'] },
    { id: 'since-duration', re: /\bsince\s+(\d+|two|three|four|five|six|seven|eight|nine|ten|many|several|a few)\s+(years?|months?|weeks?|days?|hours?|minutes?)\b/gi,
      msg: 'Тривалість (скільки?) → for: for three years. since — з моменту: since 2020.',
      fix: m => 'for ' + m[1] + ' ' + m[2], topic: ['tenses', 'present-perfect'] },
    { id: 'am-born', re: /\bI am born\b|\bI'm born\b|\bI’m born\b/gi,
      msg: '«Я народився» — у минулому часі: I was born.',
      fix: () => 'I was born', topic: ['passive', 'passive-simple'] },
    { id: 'did-past', re: new RegExp('\\bdid\\s+' + SUBJ + '\\s+(went|saw|made|took|came|got|had|knew|thought|said|bought|wrote|ate|drank|liked|wanted|watched|played|worked|visited)\\b', 'gi'),
      msg: 'У питанні з did дієслово — у початковій формі: Did you go? (не went).',
      fix: m => 'did ' + m[1] + ' ' + baseForm(m[2]), topic: ['tenses', 'past-simple'] },

    /* ---------- порівняння ---------- */
    { id: 'more-er', re: /\b(more|less)\s+(better|worse|bigger|smaller|taller|older|younger|faster|easier|harder|happier|cheaper|larger|longer|shorter|higher|lower|nicer|stronger|richer)\b/gi,
      msg: 'Подвійне порівняння: «more better» ✗. Або -er, або more.',
      fix: m => m[2], topic: ['comparison', 'comparison'] },
    { id: 'more-short', re: /(?<!\b(no|any)\s)\bmore\s+(good|bad|big|small|tall|old|young|fast|easy|hard|happy|cheap|hot|cold|nice|long|short|high|low|strong|rich|busy)\b(?=\s*[.,!?;:)]|\s+than\b|\s*$)/gi,
      msg: 'Короткий прикметник → -er: bigger, easier; good → better, bad → worse.',
      fix: m => comparative(m[2]), topic: ['comparison', 'comparison-spelling'] },
    { id: 'most-short', re: /\b(the\s+)most\s+(good|bad|big|small|tall|old|young|fast|easy|happy|cheap|hot|cold|nice|long|short|strong|rich)\b/gi,
      msg: 'Короткий прикметник → the -est: the biggest, the easiest; good → the best.',
      fix: m => 'the ' + superlative(m[2]), topic: ['comparison', 'comparison-spelling'] },
    { id: 'very-er', re: /\bvery\s+(better|worse|bigger|smaller|taller|older|faster|easier|harder|cheaper|more)\b/gi,
      msg: 'very не стоїть перед порівняльною формою: much better / a lot bigger.',
      fix: m => 'much ' + m[1], topic: ['comparison', 'comparison-structures'] },
    { id: 'er-then', re: /\b(better|worse|bigger|smaller|taller|older|younger|faster|cheaper|easier|harder)\s+then\b(?=\s+(me|you|him|her|us|them|I|he|she|we|they|it|my|your|his|our|their|the|a|an|before|ever|last|yesterday)\b)/gi,
      msg: 'У порівнянні — than, не then (then = потім).',
      fix: m => m[1] + ' than', topic: ['comparison', 'comparison'] },

    /* ---------- прийменники ---------- */
    { id: 'married-with', re: /\bmarried\s+with\b/gi, msg: 'одружений з = married to.', fix: () => 'married to', topic: ['adj-prep', 'adj-prep'] },
    { id: 'depend-from', re: /\b(depend|depends|depended|depending|dependent)\s+(from|of)\b/gi, msg: 'залежати від = depend on.', fix: m => m[1] + ' on', topic: ['adj-prep', 'adj-prep-meaning'] },
    { id: 'interested-about', re: /\binterested\s+(about|for|with|by)\b/gi, msg: 'цікавитися чимось = interested in.', fix: () => 'interested in', topic: ['adj-prep', 'adj-prep'] },
    { id: 'afraid-from', re: /\bafraid\s+(from|about|before)\b/gi, msg: 'боятися чогось = afraid of.', fix: () => 'afraid of', topic: ['adj-prep', 'adj-prep'] },
    { id: 'angry-on', re: /\bangry\s+on\b/gi, msg: 'злий на когось = angry with (людина) / about (ситуація).', fix: () => 'angry with', topic: ['adj-prep', 'adj-prep-meaning'] },
    { id: 'good-in', re: /\b(good|bad|better|best)\s+in\s+(math|maths|english|sports?|chess|football|drawing|cooking|languages?)\b/gi, msg: 'добре вмію щось = good at.', fix: m => m[1] + ' at ' + m[2], topic: ['adj-prep', 'adj-prep-meaning'] },
    { id: 'arrive-to', re: /\b(arrive|arrives|arrived|arriving)\s+to\b/gi, msg: 'arrive to ✗ → arrive at (місце: at the station) / in (місто, країна: in Kyiv).', fix: null, topic: ['prepositions', 'prep-movement'] },
    { id: 'discuss-about', re: /\b(discuss|discussed|discussing|discusses)\s+about\b/gi, msg: 'discuss — без about: discuss the plan.', fix: m => m[1], topic: ['prepositions', 'prep-dependent'] },
    { id: 'listen-no-to', re: /\b(listen|listens|listened|listening)\s+(music|the radio|the music|him|her|me|us|them|this|my|your|podcasts?)\b/gi, msg: 'слухати щось = listen TO something.', fix: m => m[1] + ' to ' + m[2], topic: ['prepositions', 'prep-dependent'] },
    { id: 'explain-me', re: /\b(explain|explained|explains)\s+(me|him|us|them)\b/gi, msg: 'пояснити мені = explain TO me (explain sth to sb).', fix: m => m[1] + ' to ' + m[2], topic: ['prepositions', 'prep-dependent'] },
    { id: 'say-me', re: /\b(say|said|says)\s+(me|him)\b(?!\s+(and|or)\b)/gi, msg: 'сказати мені = tell me (або say to me).', fix: m => ({ say: 'tell', said: 'told', says: 'tells' }[m[1].toLowerCase()]) + ' ' + m[2], topic: ['reported', 'reported'] },
    { id: 'in-day', re: /\bin\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|the weekend)\b(?=\s*[.,!?;:)]|\s+(morning|evening|afternoon|night|at|we|I|you|he|she|they|it)\b|\s*$)/gi, msg: 'Дні тижня → on Monday; вихідні → at / on the weekend.', fix: m => (/weekend/i.test(m[1]) ? 'at ' : 'on ') + m[1], topic: ['prepositions', 'prep-time'] },
    { id: 'on-month', re: /\bon\s+(january|february|march|april|may|june|july|august|september|october|november|december|summer|winter|spring|autumn|(19|20)\d\d)\b(?!\s+\d)/gi, msg: 'Місяці, пори року, роки → in: in May, in summer, in 2024.', fix: m => 'in ' + m[1], topic: ['prepositions', 'prep-time'] },
    { id: 'at-morning', re: /\b(at|on)\s+(the\s+)?(morning|evening|afternoon)\b(?!\s+(of|after|before|when|that|in question)\b)/gi, msg: 'in the morning / in the evening / in the afternoon (але at night).', fix: m => 'in the ' + m[3], topic: ['prepositions', 'prep-time'] },
    { id: 'in-night', re: /\bin\s+night\b/gi, msg: 'уночі = at night.', fix: () => 'at night', topic: ['prepositions', 'prep-time'] },
    { id: 'despite-of', re: /\bdespite\s+of\b/gi, msg: 'despite — без of (або in spite of).', fix: () => 'despite', topic: ['linkers', 'link-contrast'] },

    /* ---------- інфінітив / герундій ---------- */
    { id: 'want-that', re: new RegExp('\\b(want|wants|wanted|would like)\\s+that\\s+' + SUBJ + '\\b', 'gi'),
      msg: '«хочу, щоб ти…» = want you to…, а не «want that you».', fix: null, topic: ['gerund-infinitive', 'infinitive'] },
    { id: 'enjoy-to', re: /\b(enjoy|enjoys|enjoyed|avoid|avoids|avoided|mind|minds|finish|finished|finishes|suggest|suggested|suggests|keep|kept|keeps|consider|considered|imagine|miss|missed|practise|practice)\s+to\s+([a-z]+)\b/gi,
      filter: (m, text) => !/^(the|a|an|my|your|his|her|our|their|this|that|it|me|him|them|us|left|right)$/i.test(m[2]) &&
        !(/^minds?$/i.test(m[1]) && /\b(my|your|his|her|our|their|one['’]s|of)\s*$/i.test(text.slice(Math.max(0, m.index - 10), m.index))),
      msg: 'Після enjoy / avoid / mind / finish / suggest / keep — -ing: enjoy reading.', fix: m => m[1] + ' ' + ingForm(m[2]), topic: ['gerund-infinitive', 'gerund'] },
    { id: 'look-forward', re: /\blook(s|ed|ing)?\s+forward\s+to\s+([a-z]+)\b/gi,
      msg: 'look forward to: to тут прийменник → далі -ing: looking forward to seeing you.',
      filter: m => !/ing$|^(the|it|this|that|your|my|our|his|her|their|a|an|next|our|meeting|seeing)$/i.test(m[2]), fix: m => m[0].replace(new RegExp(m[2] + '$'), ingForm(m[2])), topic: ['gerund-infinitive', 'gerund'] },
    { id: 'make-to', re: /\b(make|makes|made|let|lets)\s+(me|you|him|her|us|them)\s+to\s+([a-z]+)\b/gi,
      msg: 'make / let + кого + дієслово БЕЗ to: made me laugh.', fix: m => m[1] + ' ' + m[2] + ' ' + m[3], topic: ['gerund-infinitive', 'infinitive'] },
    { id: 'suggest-me-to', re: /\b(suggest|suggested|suggests)\s+(me|him|her|us|them|you)\s+to\b/gi,
      msg: 'suggest НЕ буває + кого + to: suggested that I go / suggested going.', fix: null, topic: ['reported', 'reported-commands'] },

    /* ---------- лічба, артиклі, займенники ---------- */
    { id: 'a-uncount', re: new RegExp('\\b(a|an)\\s+(' + UNCOUNT + ')\\b(?=\\s*[.,!?;:)]|\\s+(is|was|for|from|about|on|and|with|to)\\b|\\s*$)', 'gi'),
      msg: 'Незлічуване слово — без a / an: some advice, a piece of information.', fix: m => m[2], topic: ['quantifiers', 'quantifiers'] },
    { id: 'plural-uncount', re: /\b(advices|informations|furnitures|luggages|homeworks|knowledges|equipments|newses)\b/gi,
      msg: 'Незлічуване слово не має множини: advice, information, homework.', fix: m => ({ advices: 'advice', informations: 'information', furnitures: 'furniture', luggages: 'luggage', homeworks: 'homework', knowledges: 'knowledge', equipments: 'equipment', researches: 'research', evidences: 'evidence', newses: 'news' }[m[1].toLowerCase()]), topic: ['quantifiers', 'quantifiers'] },
    { id: 'much-count', re: /\bmuch\s+(people|friends|books|things|problems|cars|questions|times|days|years|hours|children|photos|mistakes)\b/gi,
      msg: 'Злічувані іменники у множині → many (much — для незлічуваних).', fix: m => 'many ' + m[1], topic: ['quantifiers', 'quantifiers'] },
    { id: 'a-vowel', re: /\ba\s+(apple|orange|egg|hour|honest|idea|interesting|important|old|umbrella|elephant|island|email|article|answer|example|office|opinion|artist|engineer|actor|amazing|awesome|easy|expensive|interview|ice)\b/gi,
      msg: 'Перед голосним звуком → an: an apple, an hour, an idea.', fix: m => cap(m[0], 'an ' + m[1]), topic: ['articles', 'a-an'] },
    { id: 'an-consonant', re: /\ban\s+(university|uniform|european|useful|user|unique|one|big|good|new|great|nice|small|car|house|book|dog|cat|friend|job|day|year|week|man|woman)\b/gi,
      msg: 'Перед приголосним звуком → a: a university, a useful tip, a car.', fix: m => cap(m[0], 'a ' + m[1]), topic: ['articles', 'a-an'] },
    { id: 'people-is', re: /\bpeople\s+(is|was|has)\b/gi, msg: 'people — множина: people are / were / have.', fix: m => 'people ' + ({ is: 'are', was: 'were', has: 'have' }[m[1].toLowerCase()]), topic: ['quantifiers', 'quantifiers'] },
    { id: 'there-is-plural', re: /\bthere\s+(is|was|'s|’s)\s+(many|several|two|three|four|five|a few|few|lots of people|some people)\b/gi,
      msg: 'Множина → there are / there were.', fix: m => 'there ' + (/was/i.test(m[1]) ? 'were' : 'are') + ' ' + m[2], topic: ['starters', 'starters'] },
    { id: 'double-neg', re: /\b(don['’]t|doesn['’]t|didn['’]t|can['’]t|won['’]t|isn['’]t|aren['’]t|wasn['’]t|never)\s+(\w+\s+){0,3}(nothing|nobody|nowhere|no one|none)\b/gi,
      msg: 'Подвійне заперечення: «don’t … nothing» ✗ → don’t … anything / … nothing без not.', fix: null, topic: ['indefinite', 'indefinite'] },
    { id: 'lowercase-i', re: /(^|[\s(“"«])i(?=[\s,!?;:'’)]|\.(?!e\.)|$)/g,
      filter: (m, text) => !/\b(an|another|the|letter|dot|of)\s*$/i.test(text.slice(Math.max(0, m.index - 10), m.index + m[1].length)),
      msg: 'Займенник «I» завжди з великої літери.', fix: m => m[1] + 'I', topic: ['pronouns', 'pron-personal'] },
    { id: 'every-days', re: /\bevery\s+(days|weeks|months|years|mornings|evenings|nights|times)\b/gi,
      msg: 'every + іменник в одиничному числі: every day.', fix: m => 'every ' + m[1].replace(/s$/, ''), topic: ['indefinite', 'indefinite'] },
    { id: 'make-homework', re: /\b(make|makes|made|making)\s+(my |your |his |her |our |their |the )?(homework|exercises|sport|shopping)\b/gi,
      msg: 'do homework / do exercises / do sport / do the shopping.', fix: m => ({ make: 'do', makes: 'does', made: 'did', making: 'doing' }[m[1].toLowerCase()]) + ' ' + (m[2] || '') + m[3], topic: ['tenses', 'present-simple'] },
    { id: 'do-mistake', re: /\b(do|does|did|doing|done)\s+(a\s+|many\s+|some\s+|lots of\s+|a lot of\s+)?(mistakes?)\b/gi,
      msg: 'помилятися = make a mistake.', fix: m => ({ do: 'make', does: 'makes', did: 'made', doing: 'making', done: 'made' }[m[1].toLowerCase()]) + ' ' + (m[2] || '') + m[3], topic: ['tenses', 'past-simple'] },

    /* ---------- зв’язки ---------- */
    { id: 'although-but', re: /\b(although|though|even though)\b(\s+\w[^.!?;\n]{2,90}?),\s*but\b/gi,
      msg: '«Хоча…, але…» — в англійській одне зі слів: Although it was late, we stayed.', fix: m => m[1] + m[2] + ',', topic: ['linkers', 'link-contrast'] },
    { id: 'because-of-clause', re: new RegExp('\\bbecause of\\s+' + SUBJ + '\\s+(am|is|are|was|were|have|has|had|can|will|do|did|don' + A + 't|didn' + A + 't)\\b', 'gi'),
      msg: 'because of + іменник; якщо далі речення — просто because.', fix: m => 'because ' + m[1] + ' ' + m[2], topic: ['linkers', 'link-cause'] },
    { id: 'how-called', re: /\bhow\s+(is|was)\s+(it|this|that|he|she)\s+called\b/gi,
      msg: '«Як це називається?» = What is it called?', fix: m => 'what ' + m[1] + ' ' + m[2] + ' called', topic: ['questions', 'question-forms'] }
  ];

  /* ---------- helpers ---------- */
  const IRREG_BASE = { went: 'go', saw: 'see', made: 'make', took: 'take', came: 'come', got: 'get', had: 'have', knew: 'know', thought: 'think', said: 'say', bought: 'buy', wrote: 'write', ate: 'eat', drank: 'drink', did: 'do', has: 'have', goes: 'go', does: 'do', watches: 'watch', says: 'say' };
  function baseForm(w) {
    const l = w.toLowerCase();
    if (IRREG_BASE[l]) return IRREG_BASE[l];
    if (/ied$/.test(l)) return l.replace(/ied$/, 'y');
    if (/(liked|lived|loved|hated|used|moved)$/.test(l)) return l.replace(/d$/, '');
    if (/ed$/.test(l)) return l.replace(/ed$/, '');
    if (/ies$/.test(l)) return l.replace(/ies$/, 'y');
    if (/(ches|shes|sses|xes)$/.test(l)) return l.replace(/es$/, '');
    if (/s$/.test(l)) return l.replace(/s$/, '');
    return l;
  }
  function ingForm(w) {
    const l = w.toLowerCase();
    if (/ie$/.test(l)) return l.replace(/ie$/, 'ying');
    if (/[^e]e$/.test(l) && l !== 'be' && l !== 'see') return l.replace(/e$/, 'ing');
    if (/^(run|swim|stop|get|sit|put|shop|plan|travel|begin|win)$/.test(l)) return l + l.slice(-1) + 'ing';
    return l + 'ing';
  }
  const COMP_IRR = { good: 'better', bad: 'worse' };
  const SUP_IRR = { good: 'best', bad: 'worst' };
  function comparative(a) {
    const l = a.toLowerCase();
    if (COMP_IRR[l]) return COMP_IRR[l];
    if (/[^aeiou]y$/.test(l)) return l.replace(/y$/, 'ier');
    if (/e$/.test(l)) return l + 'r';
    if (/^(big|hot|fat|thin|wet|sad)$/.test(l)) return l + l.slice(-1) + 'er';
    return l + 'er';
  }
  function superlative(a) {
    const l = a.toLowerCase();
    if (SUP_IRR[l]) return SUP_IRR[l];
    if (/[^aeiou]y$/.test(l)) return l.replace(/y$/, 'iest');
    if (/e$/.test(l)) return l + 'st';
    if (/^(big|hot|fat|thin|wet|sad)$/.test(l)) return l + l.slice(-1) + 'est';
    return l + 'est';
  }

  function check(text) {
    const out = [];
    if (!text || !text.trim()) return out;
    for (const r of RULES) {
      r.re.lastIndex = 0;
      let m;
      while ((m = r.re.exec(text)) !== null) {
        if (m[0].length === 0) { r.re.lastIndex++; continue; }
        if (r.filter && !r.filter(m, text)) continue;
        let start = m.index, str = m[0];
        if (r.id === 'lowercase-i') { start += m[1].length; str = 'i'; }
        let fix = null;
        try { fix = r.fix ? r.fix(m) : null; } catch (e) { fix = null; }
        if (r.id === 'lowercase-i') fix = 'I';
        else if (fix != null) fix = cap(str, fix);
        if (fix === str) fix = null;
        out.push({ id: r.id, start, end: start + str.length, text: str, msg: r.msg, fix, topic: r.topic, kind: fix ? 'fix' : 'hint' });
      }
    }
    out.sort((a, b) => a.start - b.start || b.end - a.end);
    const clean = [];
    let lastEnd = -1;
    for (const x of out) if (x.start >= lastEnd) { clean.push(x); lastEnd = x.end; }
    return clean;
  }

  window.FLChecker = { check, RULES };
})();
