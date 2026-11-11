/* Пошук фото-кандидатів для тренажера «Що на фото» у Wikimedia Commons (відкриті ліцензії).
   node tools/photo/fetch-candidates.js [id …]   або   node tools/photo/fetch-candidates.js park --query "kids playing grass park"
     → tools/photo/candidates/<id>/NN.jpg (прев'ю 480 px) + meta.json
   Ліцензії: Public domain, CC0, CC BY, CC BY-SA (у застосунку — підпис автора й посилання на ліцензію;
   зменшення розміру — технічна зміна, не переробка). Запити по одному, з паузою — щоб не навантажувати API. */
const fs = require('fs');
const path = require('path');
const SCENES = require('./scenes.json');

/* --query "інший запит" — перезапустити пошук для однієї сцени зі своїм запитом (старі кандидати замінюються) */
const args = process.argv.slice(2);
const qi = args.indexOf('--query');
const customQuery = qi >= 0 ? args.splice(qi, 2)[1] : null;
const only = args;
const N = 8;
const UA = 'EngLift-photo-trainer/1.0 (educational offline app; contact via GitHub)';
const LICENSE_OK = /^(public domain|cc0( 1\.0)?|cc[ -]by( |-)?[\d.]+|cc[ -]by-sa( |-)?[\d.]+)$/i;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const strip = s => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

async function get(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (r.ok) return r;
    } catch (e) { /* ще раз */ }
    await sleep(2000);
  }
  return null;
}

(async () => {
  for (const s of SCENES) {
    if (only.length && !only.includes(s.id)) continue;
    const dir = path.join(__dirname, 'candidates', s.id);
    if (customQuery) fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    const api = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=40' +
      '&gsrsearch=' + encodeURIComponent((customQuery || s.query) + ' filetype:bitmap') +
      '&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=480&iiextmetadatafilter=LicenseShortName|Artist|LicenseUrl|ImageDescription';
    const r = await get(api);
    if (!r) { console.log('✗ ' + s.id + ': search failed'); continue; }
    const js = await r.json();
    const pages = Object.values((js.query || {}).pages || {}).sort((a, b) => a.index - b.index);
    const pick = pages.map(p => ({ p, ii: (p.imageinfo || [])[0] || {} })).filter(({ p, ii }) => {
      const md = ii.extmetadata || {};
      const lic = strip(md.LicenseShortName && md.LicenseShortName.value);
      return ii.mime === 'image/jpeg' && ii.width >= 1000 && ii.height >= 600 && LICENSE_OK.test(lic) &&
        !/painting|drawing|illustration|map|diagram|\(\d{4}-\d{4}\)/i.test(p.title);
    }).slice(0, N);
    const meta = [];
    let k = 0;
    for (const { p, ii } of pick) {
      await sleep(400);
      const img = await get(ii.thumburl);
      if (!img) continue;
      k++;
      const name = String(k).padStart(2, '0') + '.jpg';
      fs.writeFileSync(path.join(dir, name), Buffer.from(await img.arrayBuffer()));
      const md = ii.extmetadata || {};
      meta.push({
        file: name, title: p.title, page: ii.descriptionurl, width: ii.width, height: ii.height,
        author: strip(md.Artist && md.Artist.value).slice(0, 120),
        license: strip(md.LicenseShortName && md.LicenseShortName.value),
        licenseUrl: strip(md.LicenseUrl && md.LicenseUrl.value)
      });
    }
    fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(meta, null, 1));
    console.log((k ? '✓ ' : '✗ ') + s.id + ': ' + k + ' candidates');
    await sleep(1000);
  }
})();
