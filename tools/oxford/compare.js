/* Порівняння Oxford 3000/5000 (American) зі словником EngLift.
   node tools/oxford/compare.js english-app → tools/oxford/report.json
   Тексти списків витягнуто з PDF: pdftotext American_Oxford_*.pdf (без -layout). */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const DIR = __dirname;
const APP = process.argv[2];

const POSW = '(?:n|v|adj|adv|prep|pron|det|conj|exclam)\\.|number|modal v\\.|auxiliary v\\.|indefinite article|definite article|infinitive marker';
const RE = new RegExp('([A-Za-z][A-Za-z\'’\\-\\. ]*?\\d?(?:\\s\\([^)]*\\))?)\\s+((?:' + POSW + ')(?:[\\s,\\/]+(?:' + POSW + '|[ABC][12]))*)', 'g');

function parse(file, levelFromHeadings) {
  const out = [];
  let level = null;
  for (const line of fs.readFileSync(path.join(DIR, file), 'utf8').split('\n')) {
    const t = line.trim();
    if (/^(A1|A2|B1|B2|C1)$/.test(t)) { level = t; continue; }
    if (!t || /Oxford|^\d+ ?\/ ?\d+$|©|�/.test(t) && !/ (n|v|adj)\./.test(t)) continue;
    let m;
    RE.lastIndex = 0;
    while ((m = RE.exec(t))) {
      let head = m[1].trim().replace(/^(?:(?:n|v|adj|adv|prep)\.|number)\s+/, '').replace(/\s*\([^)]*\)/, '').replace(/\d$/, '').trim();
      if (head === 'a, an') head = 'a';
      const tail = m[2];
      /* «acid n. B2, adj. C1» → по кожній частині мови свій рівень */
      const parts = [];
      let cur = [];
      tail.split(/[\s,\/]+/).forEach(tok => {
        if (/^[ABC][12]$/.test(tok)) { cur.forEach(p => parts.push([p, tok])); cur = []; }
        else if (tok === 'modal' || tok === 'auxiliary' || tok === 'indefinite' || tok === 'definite' || tok === 'infinitive') cur.push(tok);
        else if (tok === 'article' || tok === 'marker') { /* частина попереднього */ }
        else cur.push(tok.replace(/\.$/, ''));
      });
      cur.forEach(p => parts.push([p, levelFromHeadings ? level : null]));
      const fixed = [];
      for (let i = 0; i < parts.length; i++) {
        const [p, l] = parts[i];
        if (p === 'v' && i > 0 && (parts[i - 1][0] === 'modal' || parts[i - 1][0] === 'auxiliary')) continue;
        fixed.push([p === 'modal' ? 'modal' : p === 'auxiliary' ? 'aux' : p, l]);
      }
      out.push({ en: head.toLowerCase(), pos: fixed });
    }
  }
  return out;
}

const o3 = parse('oxford3000.txt', true);
const o5 = parse('oxford5000.txt', false);
console.log('Oxford 3000 entries:', o3.length, ' Oxford 5000 (extra) entries:', o5.length);

/* ---------- словник застосунку ---------- */
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
const rd = f => fs.readFileSync(path.join(APP, 'js', 'lexis', f), 'utf8');
vm.runInContext(rd('verbs-data.js') + ';window.LEX_VERBS=LEX_VERBS;', ctx);
vm.runInContext(rd('verbs-phrasal-data.js'), ctx);
vm.runInContext(rd('verbs-merge.js'), ctx);
vm.runInContext(rd('nouns-data.js') + ';window.LEX_NOUNS=LEX_NOUNS;', ctx);
vm.runInContext(rd('adjs-data.js') + ';window.LEX_ADJS=LEX_ADJS;', ctx);
vm.runInContext(rd('adjs-prep-data.js'), ctx);
vm.runInContext(rd('advs-data.js') + ';window.LEX_ADVS=typeof LEX_ADVS!=="undefined"?LEX_ADVS:[];', ctx);
/* нові слова з Oxford (tools/oxford/build.js), якщо вже зібрані */
['verbs', 'nouns', 'adjs', 'advs'].forEach(p => { const f = path.join(APP, 'js', 'lexis', p + '-oxford-data.js'); if (fs.existsSync(f)) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx); });

const variants = w => {
  const s = new Set([w]);
  const add = x => s.add(x);
  add(w.replace(/our\b/, 'or')); add(w.replace(/or\b/, 'our'));
  add(w.replace(/ise\b/, 'ize')); add(w.replace(/ize\b/, 'ise'));
  add(w.replace(/isation/, 'ization')); add(w.replace(/ization/, 'isation'));
  add(w.replace(/tre\b/, 'ter')); add(w.replace(/ter\b/, 'tre'));
  add(w.replace(/ll(ed|ing|er)\b/, 'l$1')); add(w.replace(/([^l])l(ed|ing|er)\b/, '$1ll$2'));
  add(w.replace(/ogue\b/, 'og')); add(w.replace(/og\b/, 'ogue'));
  add(w.replace(/ence\b/, 'ense')); add(w.replace(/ense\b/, 'ence'));
  add(w.replace(/-/g, ' ')); add(w.replace(/-/g, '')); add(w.replace(/ /g, '-'));
  return [...s];
};
const index = list => {
  const m = new Map();
  list.forEach(w => {
    const k = String(w.en).toLowerCase().replace(/\s*\(.*?\)\s*/g, ' ').trim();
    variants(k).forEach(v => { if (!m.has(v)) m.set(v, []); m.get(v).push(w); });
  });
  return m;
};
const IDX = { v: index(ctx.LEX_VERBS), n: index(ctx.LEX_NOUNS), adj: index(ctx.LEX_ADJS), adv: index(ctx.LEX_ADVS) };
const NAME = { v: 'дієслова', n: 'іменники', adj: 'прикметники', adv: 'прислівники' };
const inAny = w => Object.values(IDX).some(m => m.has(w));
console.log('app:', Object.entries(IDX).map(([k, m]) => NAME[k] + ' ' + ({ v: ctx.LEX_VERBS, n: ctx.LEX_NOUNS, adj: ctx.LEX_ADJS, adv: ctx.LEX_ADVS })[k].length).join(', '));

const report = { missing: [], wrongPos: [], other: [] };
for (const [src, list] of [['3000', o3], ['5000', o5]]) {
  for (const e of list) {
    for (const [p, l] of e.pos) {
      if (!IDX[p]) { report.other.push({ src, en: e.en, p, l }); continue; }
      const has = variants(e.en).some(v => IDX[p].has(v));
      if (has) continue;
      const elsewhere = Object.keys(IDX).filter(k => variants(e.en).some(v => IDX[k].has(v)));
      (elsewhere.length ? report.wrongPos : report.missing).push({ src, en: e.en, p, l, elsewhere });
    }
  }
}
const total = [...o3, ...o5].reduce((s, e) => s + e.pos.filter(([p]) => IDX[p]).length, 0);
const byL = {}; [...o3, ...o5].forEach(e => e.pos.filter(([p]) => IDX[p]).forEach(([, l]) => { byL[l] = byL[l] || [0, 0]; byL[l][0]++; }));
[...report.missing, ...report.wrongPos].forEach(x => byL[x.l][1]++);
console.log('coverage by level:', Object.entries(byL).map(([l, [t, m]]) => l + ' ' + (t - m) + '/' + t + ' (' + Math.round(100 * (t - m) / t) + '%)').join(' · '));
console.log('content-word positions (n/v/adj/adv):', total, ' found:', total - report.missing.length - report.wrongPos.length);
fs.writeFileSync(path.join(DIR, 'report.json'), JSON.stringify(report, null, 1));
const cnt = (arr, f) => { const c = {}; arr.forEach(x => { const k = f(x); c[k] = (c[k] || 0) + 1; }); return c; };
console.log('\nMISSING entirely (by pos):', JSON.stringify(cnt(report.missing, x => x.p)));
console.log('MISSING by level:', JSON.stringify(cnt(report.missing, x => x.l)));
console.log('present only as another part of speech:', report.wrongPos.length, JSON.stringify(cnt(report.wrongPos, x => x.p)));
console.log('function words (prep/pron/det/conj/number/…):', report.other.length);
