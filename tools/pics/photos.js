/* EngLift — пошук фото до слів словника (кандидати для перегляду).
   node tools/pics/photos.js <pos> <cat> [--src wikimedia|pixabay|pexels] [--limit N] [--hint "food"] [--queries q.json]
   Ключі: PIXABAY_KEY / PEXELS_KEY у змінних оточення (лише для цього скрипту, у застосунок не потрапляють).
   → tools/pics/photo-cand/<src>/<pos>-<cat>/<_id>/NN.jpg (прев'ю) + meta.json (автор, ліцензія, сторінка).
   Ліцензії: Pixabay / Pexels — їхні вільні ліцензії; Wikimedia — лише Public domain / CC0 / CC BY / CC BY-SA. */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadPos } = require('./common');

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf('--' + name); return i >= 0 ? args.splice(i, 2)[1] : def; };
const src = opt('src', 'wikimedia');
const limit = +opt('limit', 0);
const hint = opt('hint', '');
const tag = opt('tag', '');   /* свій набір кандидатів: photo-cand/<src>-<tag> */
/* --queries file.json: { "<_id>": "свій запит" } — лише ці слова, набір <src>-q */
const queriesFile = opt('queries', '');
const queries = queriesFile ? JSON.parse(fs.readFileSync(queriesFile, 'utf8')) : null;
const [pos, cat] = args;
if (!pos || !cat) { console.error('usage: node tools/pics/photos.js <pos> <cat> [--src …] [--limit N] [--hint "…"]'); process.exit(1); }

const N = +opt('n', 4);
const UA = 'EngLift-vocab-cards/1.0 (educational offline app)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const strip = s => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const LICENSE_OK = /^(public domain|cc0( 1\.0)?|cc[ -]by( |-)?[\d.]+|cc[ -]by-sa( |-)?[\d.]+)$/i;

async function get(url, headers = {}) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA, ...headers } });
      if (r.ok) return r;
      if (r.status === 429) await sleep(5000);
    } catch (e) { /* ще раз */ }
    await sleep(1500);
  }
  return null;
}

/* кожне джерело повертає [{ thumb, page, author, license, licenseUrl }] */
const SOURCES = {
  async wikimedia(q) {
    const api = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=30' +
      '&gsrsearch=' + encodeURIComponent(q + ' filetype:bitmap') +
      '&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=400&iiextmetadatafilter=LicenseShortName|Artist|LicenseUrl';
    const r = await get(api);
    if (!r) return [];
    const pages = Object.values(((await r.json()).query || {}).pages || {}).sort((a, b) => a.index - b.index);
    return pages.map(p => ({ p, ii: (p.imageinfo || [])[0] || {} })).filter(({ p, ii }) => {
      const md = ii.extmetadata || {};
      return ii.mime === 'image/jpeg' && ii.width >= 500 && LICENSE_OK.test(strip(md.LicenseShortName && md.LicenseShortName.value)) &&
        !/painting|drawing|illustration|map|diagram|logo|stamp|\(\d{4}-\d{4}\)/i.test(p.title);
    }).map(({ ii }) => {
      const md = ii.extmetadata || {};
      return { thumb: ii.thumburl, page: ii.descriptionurl, author: strip(md.Artist && md.Artist.value).slice(0, 120),
        license: strip(md.LicenseShortName.value), licenseUrl: strip(md.LicenseUrl && md.LicenseUrl.value) };
    });
  },
  async pixabay(q) {
    const key = process.env.PIXABAY_KEY;
    if (!key) throw new Error('PIXABAY_KEY не задано');
    const r = await get('https://pixabay.com/api/?key=' + key + '&image_type=photo&safesearch=true&per_page=20&q=' + encodeURIComponent(q));
    if (!r) return [];
    return ((await r.json()).hits || []).map(h => ({ thumb: h.webformatURL, page: h.pageURL, author: h.user, license: 'Pixabay Content License', licenseUrl: 'https://pixabay.com/service/license-summary/' }));
  },
  async pexels(q) {
    const key = process.env.PEXELS_KEY;
    if (!key) throw new Error('PEXELS_KEY не задано');
    const r = await get('https://api.pexels.com/v1/search?per_page=15&query=' + encodeURIComponent(q), { Authorization: key });
    if (!r) return [];
    return ((await r.json()).photos || []).map(p => ({ thumb: p.src.medium, page: p.url, author: p.photographer, license: 'Pexels License', licenseUrl: 'https://www.pexels.com/license/' }));
  }
};

(async () => {
  if (!SOURCES[src]) throw new Error('невідоме джерело: ' + src);
  let words = loadPos(pos).filter(w => (w.cats || []).includes(cat) && !w.adult);
  if (queries) words = words.filter(w => queries[w._id]);
  if (limit) words = words.slice(0, limit);
  const set = src + (tag ? '-' + tag : queries ? '-q' : hint ? '-' + hint.replace(/\W+/g, '_') : '');
  const base = path.join(__dirname, 'photo-cand', set, pos + '-' + cat);
  let found = 0, i = 0;
  for (const w of words) {
    i++;
    const dir = path.join(base, String(w._id));
    if (fs.existsSync(path.join(dir, 'meta.json'))) { found++; continue; }   /* уже шукали — не повторюємо */
    const q = queries ? queries[w._id] : (w.en + ' ' + hint).trim();
    const list = (await SOURCES[src](q)).slice(0, N);
    fs.mkdirSync(dir, { recursive: true });
    const meta = [];
    for (const c of list) {
      const img = await get(c.thumb);
      if (!img) continue;
      const file = String(meta.length + 1).padStart(2, '0') + '.jpg';
      fs.writeFileSync(path.join(dir, file), Buffer.from(await img.arrayBuffer()));
      meta.push({ file, ...c });
      await sleep(src === 'wikimedia' ? 300 : 100);
    }
    fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify({ en: w.en, uk: w.uk, q, cands: meta }, null, 1));
    if (meta.length) found++;
    process.stdout.write('\r' + i + '/' + words.length + ' ');
    await sleep(src === 'wikimedia' ? 800 : 300);
  }
  console.log('\n' + src + ' ' + cat + ': ' + found + ' / ' + words.length + ' слів з кандидатами');
})().catch(e => { console.error(e.message); process.exit(1); });
