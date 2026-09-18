/* EngLift — service worker (offline PWA) */
const CACHE = 'englift-v4.4.0';
const APP_SHELL = [
  './',
  './index.html',
  './css/styles.css',
  './css/themes.css',
  './css/reader.css',
  './js/themes.js',
  './js/reader.js',
  './js/reader/books-data.js',
  './css/diary.css',
  './js/diary.js',
  './js/diary/diary-data.js',
  './js/diary/checker.js',
  './css/placement.css',
  './js/placement.js',
  './css/phrases.css',
  './css/effects.css',
  './css/sound.css',
  './js/phrases.js',
  './js/sound.js',
  './js/phrases/transitions-data.js',
  './js/phrases/discourse-data.js',
  './js/phrases/timeseq-data.js',
  './js/phrases/constructions-data.js',
  './js/phrases/intensifiers-data.js',
  './js/phrases/choice-data.js',
  './js/phrases/polysemy-data.js',
  './js/phrases/would-data.js',
  './js/phrases/chunks-data.js',
  './js/phrases/situational-data.js',
  './js/phrases/softeners-data.js',
  './js/phrases/express-data.js',
  './js/phrases/collocations-data.js',
  './js/phrases/confusing-data.js',
  './js/phrases/idioms-data.js',
  './js/phrases/work-data.js',
  './js/phrases/academic-data.js',
  './js/phrases/chunks-extra.js',
  './js/phrases/express-extra.js',
  './js/phrases/situational-extra.js',
  './js/data.js',
  './js/grammar-extra.js',
  './js/lexis/meta.js',
  './js/lexis/verbs-data.js',
  './js/lexis/nouns-data.js',
  './js/lexis/adjs-data.js',
  './js/lexis/advs-data.js',
  './js/lexis/verbs-phrasal-data.js',
  './js/lexis/verbs-merge.js',
  './js/lexis/adjs-prep-data.js',
  './js/core.js',
  './js/lexis.js',
  './js/grammar.js',
  './js/app.js',
  './manifest.json',
  './icons/favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;

  // Навігації: спершу мережа, офлайн — кеш
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Шрифти: спочатку кеш, потім мережа (з збереженням)
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const fetched = fetch(event.request).then(res => {
          if (res && (res.status === 200 || res.type === 'opaque')) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(event.request, copy));
          }
          return res;
        }).catch(() => cached);
        return cached || fetched;
      })
    );
    return;
  }

  // Статика застосунку: кеш першим, з довантаженням у фоні
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const fetched = fetch(event.request).then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(event.request, copy));
          }
          return res;
        }).catch(() => cached);
        return cached || fetched;
      })
    );
  }
});
