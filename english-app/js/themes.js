/* ============================================================
   EngLift — теми оформлення та анімовані фони
   Кожна тема — набір CSS-змінних (виставляються на <html>)
   + необов’язковий ефект: CSS-шари та/або canvas-частинки.
   ============================================================ */
(function () {
  'use strict';

  const DARK_BASE = {
    card: 'rgba(255,255,255,.045)', cardStrong: 'rgba(255,255,255,.075)',
    border: 'rgba(255,255,255,.09)', borderStrong: 'rgba(255,255,255,.17)',
    shadow: '0 18px 50px -18px rgba(0,0,0,.65)', onAccent: '#fff'
  };
  const LIGHT_BASE = {
    card: 'rgba(255,255,255,.72)', cardStrong: '#ffffff',
    border: 'rgba(23,26,43,.09)', borderStrong: 'rgba(23,26,43,.18)',
    shadow: '0 18px 44px -20px rgba(40,40,90,.35)', onAccent: '#fff'
  };

  function theme(id, name, emoji, mode, c, extra) {
    const base = mode === 'dark' ? DARK_BASE : LIGHT_BASE;
    const t = Object.assign({ id, name, emoji, mode, group: 'static' }, base, c, extra || {});
    t.grad = t.grad || 'linear-gradient(135deg, ' + t.a1 + ' 0%, ' + t.a2 + ' 100%)';
    t.gradSoft = t.gradSoft || 'linear-gradient(135deg, color-mix(in srgb, ' + t.a1 + ' 18%, transparent), color-mix(in srgb, ' + t.a2 + ' 14%, transparent))';
    return t;
  }

  const THEMES = [
    /* ---------- статичні: темні ---------- */
    theme('dark', 'Неон', '🌙', 'dark', { bg: '#070812', bgSoft: '#0c0e1d', text: '#eef0ff', muted: '#9aa1c2', muted2: '#6f7699', a1: '#8f7bff', a2: '#38e8ff', a3: '#ff6ac2', grad: 'linear-gradient(135deg, #8f7bff 0%, #6d5cff 45%, #38e8ff 100%)' }),
    theme('ocean', 'Океан', '🌊', 'dark', { bg: '#03111b', bgSoft: '#071d2a', text: '#e4f6fb', muted: '#8db3c3', muted2: '#5d8596', a1: '#22d3ee', a2: '#34d399', a3: '#60a5fa' }),
    theme('forest', 'Ліс', '🌲', 'dark', { bg: '#06120c', bgSoft: '#0c1e15', text: '#e6f4e9', muted: '#93b09c', muted2: '#64806d', a1: '#4ade80', a2: '#a3e635', a3: '#facc15', onAccent: '#06120c' }),
    theme('sunset', 'Захід сонця', '🌇', 'dark', { bg: '#140913', bgSoft: '#1f0f1d', text: '#fff0f3', muted: '#c9a2ad', muted2: '#8f6f7a', a1: '#fb7185', a2: '#fbbf24', a3: '#f472b6' }),
    theme('coffee', 'Кава', '☕', 'dark', { bg: '#110c08', bgSoft: '#1b140f', text: '#f3e9dc', muted: '#b9a58f', muted2: '#857361', a1: '#d4a373', a2: '#e9c46a', a3: '#f4a261', onAccent: '#1b140f' }),
    theme('dracula', 'Дракула', '🧛', 'dark', { bg: '#191a23', bgSoft: '#232531', text: '#f8f8f2', muted: '#a9adc8', muted2: '#6a76a8', a1: '#bd93f9', a2: '#ff79c6', a3: '#50fa7b' }),
    theme('graphite', 'Графіт', '🖤', 'dark', { bg: '#0a0a0b', bgSoft: '#141416', text: '#f4f4f5', muted: '#a1a1aa', muted2: '#71717a', a1: '#e4e4e7', a2: '#a1a1aa', a3: '#fafafa', onAccent: '#0a0a0b' }),
    theme('contrast', 'Висока контрастність', '🔆', 'dark', { bg: '#000000', bgSoft: '#0b0b0b', card: 'rgba(255,255,255,.07)', cardStrong: 'rgba(255,255,255,.12)', border: 'rgba(255,255,255,.4)', borderStrong: 'rgba(255,255,255,.7)', text: '#ffffff', muted: '#e6e6e6', muted2: '#c2c2c2', a1: '#ffd400', a2: '#00e5ff', a3: '#ff4fd8', onAccent: '#000' }),

    /* ---------- статичні: світлі ---------- */
    theme('light', 'Світла', '☀️', 'light', { bg: '#eef1fb', bgSoft: '#ffffff', text: '#171a2b', muted: '#565d7d', muted2: '#8a90ad', a1: '#8f7bff', a2: '#38e8ff', a3: '#ff6ac2', grad: 'linear-gradient(135deg, #8f7bff 0%, #6d5cff 45%, #38e8ff 100%)' }),
    theme('sakura', 'Сакура', '🌸', 'light', { bg: '#fcf0f5', bgSoft: '#fffafc', text: '#3a1f2b', muted: '#86606f', muted2: '#b893a3', border: 'rgba(120,30,70,.1)', borderStrong: 'rgba(120,30,70,.2)', a1: '#db2777', a2: '#c084fc', a3: '#fb7185' }),
    theme('sand', 'Пісок', '🏖️', 'light', { bg: '#f3ead9', bgSoft: '#fffaf0', text: '#2f2416', muted: '#7a6750', muted2: '#a8957c', border: 'rgba(90,60,20,.12)', borderStrong: 'rgba(90,60,20,.24)', a1: '#b45309', a2: '#0f766e', a3: '#c2410c' }),
    theme('mint', 'М’ята', '🌿', 'light', { bg: '#e8f6ef', bgSoft: '#fbfffd', text: '#10261d', muted: '#4f6e5d', muted2: '#88a595', border: 'rgba(16,80,50,.1)', borderStrong: 'rgba(16,80,50,.2)', a1: '#059669', a2: '#0891b2', a3: '#65a30d' }),
    theme('sky', 'Небо', '☁️', 'light', { bg: '#e9f2ff', bgSoft: '#ffffff', text: '#0f1b33', muted: '#52607a', muted2: '#8a97ad', a1: '#2563eb', a2: '#0ea5e9', a3: '#8b5cf6' }),

    /* ---------- динамічні ---------- */
    theme('aurora', 'Північне сяйво', '🌌', 'dark', { bg: '#020a11', bgSoft: '#07131d', text: '#e7fbf6', muted: '#8fb5b0', muted2: '#5d8581', a1: '#34d399', a2: '#22d3ee', a3: '#a78bfa' }, { group: 'dynamic', fx: { css: 'aurora', canvas: 'stars', density: 0.35 }, desc: 'Сяйво, що переливається' }),
    theme('cosmos', 'Космос', '🪐', 'dark', { bg: '#03020b', bgSoft: '#0b0a1c', text: '#efeaff', muted: '#a49cc9', muted2: '#6f6897', a1: '#a78bfa', a2: '#f0abfc', a3: '#60a5fa' }, { group: 'dynamic', fx: { css: 'nebula', canvas: 'stars', density: 1 }, desc: 'Мерехтливі зорі й метеори' }),
    theme('synthwave', 'Синтвейв', '🌆', 'dark', { bg: '#0c0220', bgSoft: '#170a36', text: '#fdf0ff', muted: '#b9a2d6', muted2: '#7d68a0', a1: '#ff2a6d', a2: '#05d9e8', a3: '#f9c80e' }, { group: 'dynamic', fx: { css: 'synth', canvas: 'stars', density: 0.3 }, desc: 'Ретро-сонце і неонова сітка' }),
    theme('matrix', 'Матриця', '💚', 'dark', { bg: '#000700', bgSoft: '#031103', text: '#d7ffe0', muted: '#7fbf8f', muted2: '#4f8a5e', card: 'rgba(0,30,0,.45)', cardStrong: 'rgba(0,40,0,.6)', border: 'rgba(34,255,102,.14)', borderStrong: 'rgba(34,255,102,.3)', a1: '#22ff66', a2: '#16a34a', a3: '#bef264', onAccent: '#001a06' }, { group: 'dynamic', fx: { canvas: 'matrix' }, desc: 'Цифровий дощ із символів' }),
    theme('snow', 'Зимова ніч', '❄️', 'dark', { bg: '#06101d', bgSoft: '#0c192b', text: '#eef6ff', muted: '#9fb4cc', muted2: '#6a8099', a1: '#93c5fd', a2: '#c4b5fd', a3: '#e0f2fe', onAccent: '#06101d' }, { group: 'dynamic', fx: { css: 'moon', canvas: 'snow' }, desc: 'Сніг, що тихо падає' }),
    theme('deepsea', 'Глибина', '🫧', 'dark', { bg: '#01121c', bgSoft: '#051f2d', text: '#e2fbff', muted: '#86b6c2', muted2: '#57828e', a1: '#2dd4bf', a2: '#38bdf8', a3: '#818cf8' }, { group: 'dynamic', fx: { css: 'rays', canvas: 'bubbles' }, desc: 'Бульбашки та промені світла' }),
    theme('fireflies', 'Світлячки', '✨', 'dark', { bg: '#050c08', bgSoft: '#0b1810', text: '#f2f7e8', muted: '#a3b59a', muted2: '#6f8266', a1: '#facc15', a2: '#a3e635', a3: '#fb923c', onAccent: '#1a1400' }, { group: 'dynamic', fx: { css: 'fog', canvas: 'fireflies' }, desc: 'Нічний ліс і теплі вогники' }),
    theme('lava', 'Лава-лампа', '🫠', 'dark', { bg: '#110309', bgSoft: '#1c0913', text: '#fff0f0', muted: '#caa0a8', muted2: '#8f6a72', a1: '#ff5e62', a2: '#ff9966', a3: '#c471ed' }, { group: 'dynamic', fx: { css: 'lava' }, desc: 'Тягучі краплі, що перетікають' }),
    theme('rain', 'Дощ', '🌧️', 'dark', { bg: '#090e15', bgSoft: '#101822', text: '#e8eef6', muted: '#9aa8b9', muted2: '#667487', a1: '#60a5fa', a2: '#94a3b8', a3: '#38bdf8' }, { group: 'dynamic', fx: { css: 'storm', canvas: 'rain' }, desc: 'Злива з блискавками' }),
    theme('chameleon', 'Хамелеон', '🦎', 'dark', { bg: '#08080f', bgSoft: '#10101b', text: '#f1f1fb', muted: '#a2a3bf', muted2: '#6d6e8c', a1: 'hsl(var(--hue) 92% 70%)', a2: 'hsl(calc(var(--hue) + 70) 92% 62%)', a3: 'hsl(calc(var(--hue) + 160) 90% 70%)' }, { group: 'dynamic', fx: { css: 'chameleon' }, desc: 'Кольори плавно змінюються' }),
    theme('petals', 'Весна', '🌷', 'light', { bg: '#fdf1f6', bgSoft: '#fffafd', text: '#3a1f2b', muted: '#86606f', muted2: '#b893a3', border: 'rgba(120,30,70,.1)', borderStrong: 'rgba(120,30,70,.2)', a1: '#ec4899', a2: '#a855f7', a3: '#fb7185' }, { group: 'dynamic', fx: { canvas: 'petals' }, desc: 'Пелюстки кружляють у повітрі' }),
    theme('sunny', 'Сонячні зайчики', '🌤️', 'light', { bg: '#fff8e8', bgSoft: '#fffdf6', text: '#2b2210', muted: '#7d6c48', muted2: '#ab9a75', border: 'rgba(120,90,20,.12)', borderStrong: 'rgba(120,90,20,.24)', a1: '#f59e0b', a2: '#ef4444', a3: '#10b981' }, { group: 'dynamic', fx: { css: 'bokeh' }, desc: 'Теплі відблиски світла' })
  ];

  const VARS = { bg: '--bg', bgSoft: '--bg-soft', card: '--card', cardStrong: '--card-strong', border: '--border', borderStrong: '--border-strong', text: '--text', muted: '--muted', muted2: '--muted-2', a1: '--a1', a2: '--a2', a3: '--a3', grad: '--grad', gradSoft: '--grad-soft', shadow: '--shadow', onAccent: '--on-accent' };

  const byId = id => THEMES.find(t => t.id === id) || THEMES[0];
  const reducedMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = null, motionOn = true;

  function apply(id, motion) {
    const t = byId(id);
    current = t;
    motionOn = motion !== false;
    const root = document.documentElement;
    Object.keys(VARS).forEach(k => root.style.setProperty(VARS[k], t[k]));
    root.dataset.theme = t.id;
    root.dataset.mode = t.mode;
    root.style.colorScheme = t.mode;
    root.classList.toggle('no-motion', !motionOn);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = t.bg;
    buildFx(t);
    return t;
  }

  /* ============================ FX LAYERS ============================ */
  const CSS_LAYERS = {
    aurora: '<i class="fx-aurora a"></i><i class="fx-aurora b"></i><i class="fx-aurora c"></i>',
    nebula: '<i class="fx-nebula a"></i><i class="fx-nebula b"></i>',
    synth: '<i class="fx-sun"></i><i class="fx-grid"></i>',
    moon: '<i class="fx-moon"></i>',
    rays: '<i class="fx-rays"></i><i class="fx-caustics"></i>',
    fog: '<i class="fx-fog a"></i><i class="fx-fog b"></i>',
    lava: '<i class="fx-blob b1"></i><i class="fx-blob b2"></i><i class="fx-blob b3"></i><i class="fx-blob b4"></i><i class="fx-blob b5"></i>',
    storm: '<i class="fx-flash"></i>',
    chameleon: '<i class="fx-cham a"></i><i class="fx-cham b"></i>',
    bokeh: Array.from({ length: 12 }, (_, i) => '<i class="fx-bokeh k' + i + '"></i>').join('')
  };

  function layerEl() { return document.getElementById('bg-fx'); }
  function canvasEl() { return document.getElementById('fx-canvas'); }

  function buildFx(t) {
    const host = layerEl();
    if (!host) return;
    const fx = t.fx || {};
    if (host.dataset.fx !== (fx.css || '') || !host.dataset.built) {
      host.dataset.fx = fx.css || '';
      host.dataset.built = '1';
      host.querySelectorAll('i').forEach(i => i.remove());
      if (fx.css && CSS_LAYERS[fx.css]) host.insertAdjacentHTML('afterbegin', CSS_LAYERS[fx.css]);
    }
    document.body && document.body.classList.toggle('has-fx', !!(fx.css || fx.canvas));
    startCanvas(fx.canvas || null, fx.density || 1);
  }

  /* ============================ CANVAS PARTICLES ============================ */
  let mode = null, density = 1, parts = [], extra = [], raf = 0, last = 0, W = 0, H = 0, ctx = null, colors = [];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const TAU = Math.PI * 2;

  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    colors = ['--a1', '--a2', '--a3', '--text'].map(v => cs.getPropertyValue(v).trim() || '#fff');
  }

  function resize() {
    const cv = canvasEl(); if (!cv) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    try { ctx = cv.getContext('2d'); } catch (e) { ctx = null; }
    if (!ctx) { stopLoop(); mode = null; cv.hidden = true; return; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (mode) { initMode(); if (!motionOn) drawStatic(); }
  }

  const MODES = {
    stars: {
      count: () => Math.round(W * H / 2600 * density),
      make: () => ({ x: rnd(0, W), y: rnd(0, H), r: rnd(.25, 1.35), s: rnd(.4, 1.8), ph: rnd(0, TAU), c: Math.random() < .82 ? 3 : Math.floor(rnd(0, 3)) }),
      draw(dt, now) {
        ctx.clearRect(0, 0, W, H);
        for (const p of parts) {
          ctx.globalAlpha = .25 + .75 * Math.abs(Math.sin(now * .001 * p.s + p.ph));
          ctx.fillStyle = colors[p.c];
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill();
        }
        if (density >= .9 && Math.random() < dt / 2600) extra.push({ x: rnd(W * .1, W), y: rnd(0, H * .45), vx: -rnd(.5, .9), vy: rnd(.22, .4), life: 1 });
        for (const m of extra) {
          const len = 90;
          const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * len, m.y - m.vy * len);
          grad.addColorStop(0, colors[3]); grad.addColorStop(1, 'transparent');
          ctx.globalAlpha = m.life; ctx.strokeStyle = grad; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.vx * len, m.y - m.vy * len); ctx.stroke();
          m.x += m.vx * dt; m.y += m.vy * dt; m.life -= dt / 1400;
        }
        extra = extra.filter(m => m.life > 0);
        ctx.globalAlpha = 1;
      }
    },
    snow: {
      count: () => Math.round(W * H / 9000 * density),
      make: (initial) => ({ x: rnd(0, W), y: initial ? rnd(0, H) : -10, r: rnd(.8, 3.2), vy: rnd(.02, .07), sway: rnd(.4, 1.4), ph: rnd(0, TAU), a: rnd(.25, .7) }),
      draw(dt, now) {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#ffffff';
        for (const p of parts) {
          p.y += p.vy * dt * (p.r / 2 + .4);
          p.x += Math.sin(now * .0006 * p.sway + p.ph) * .25;
          if (p.y > H + 10) Object.assign(p, this.make(false), { x: rnd(0, W) });
          ctx.globalAlpha = p.a;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    },
    matrix: {
      count: () => Math.ceil(W / 18),
      make: (initial, i) => ({ x: (i || 0) * 18, y: rnd(-H * .4, H * .9), v: rnd(.08, .22), acc: 0 }),
      init() { parts = Array.from({ length: this.count() }, (_, i) => this.make(true, i)); ctx.font = '15px monospace'; },
      glyphs: 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ',
      draw(dt) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,' + Math.min(.25, dt / 260) + ')';
        ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'source-over';
        ctx.font = '15px monospace';
        for (const p of parts) {
          p.acc += p.v * dt;
          while (p.acc >= 18) {
            p.acc -= 18; p.y += 18;
            ctx.globalAlpha = .9; ctx.fillStyle = colors[3];
            ctx.fillText(this.glyphs[Math.floor(Math.random() * this.glyphs.length)], p.x, p.y);
            ctx.globalAlpha = .55; ctx.fillStyle = colors[0];
            ctx.fillText(this.glyphs[Math.floor(Math.random() * this.glyphs.length)], p.x, p.y - 18);
            if (p.y > H && Math.random() > .96) { p.y = rnd(-200, 0); p.v = rnd(.08, .22); }
          }
        }
        ctx.globalAlpha = 1;
      }
    },
    bubbles: {
      count: () => Math.round(W * H / 26000 * density),
      make: (initial) => ({ x: rnd(0, W), y: initial ? rnd(0, H) : H + 20, r: rnd(2, 9), vy: rnd(.02, .07), ph: rnd(0, TAU), c: Math.floor(rnd(0, 3)) }),
      draw(dt, now) {
        ctx.clearRect(0, 0, W, H);
        for (const p of parts) {
          p.y -= p.vy * dt * (1 + p.r / 8);
          const x = p.x + Math.sin(now * .0012 + p.ph) * 6;
          if (p.y < -20) Object.assign(p, this.make(false));
          ctx.globalAlpha = .5;
          ctx.strokeStyle = colors[p.c]; ctx.lineWidth = 1.1;
          ctx.beginPath(); ctx.arc(x, p.y, p.r, 0, TAU); ctx.stroke();
          ctx.globalAlpha = .6; ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(x - p.r * .35, p.y - p.r * .35, p.r * .22, 0, TAU); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    },
    fireflies: {
      count: () => Math.round(W * H / 22000 * density),
      make: () => ({ x: rnd(0, W), y: rnd(0, H), a: rnd(0, TAU), v: rnd(.012, .035), ph: rnd(0, TAU), s: rnd(.6, 1.4), r: rnd(1.4, 2.8), c: Math.random() < .7 ? 0 : 1 }),
      draw(dt, now) {
        ctx.clearRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';
        for (const p of parts) {
          p.a += (Math.random() - .5) * .08;
          p.x += Math.cos(p.a) * p.v * dt; p.y += Math.sin(p.a) * p.v * dt;
          if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
          if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
          const glow = Math.max(0, Math.sin(now * .0015 * p.s + p.ph));
          const R = p.r * 7;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R);
          g.addColorStop(0, colors[p.c]); g.addColorStop(.25, colors[p.c]); g.addColorStop(1, 'transparent');
          ctx.globalAlpha = .15 + glow * .75;
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, R, 0, TAU); ctx.fill();
        }
        ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
      }
    },
    rain: {
      count: () => Math.round(W * H / 5200 * density),
      make: (initial) => ({ x: rnd(-100, W + 100), y: initial ? rnd(-H, H) : rnd(-160, -10), l: rnd(10, 26), v: rnd(.7, 1.25), a: rnd(.12, .38) }),
      draw(dt) {
        ctx.clearRect(0, 0, W, H);
        ctx.strokeStyle = colors[3]; ctx.lineWidth = 1;
        ctx.beginPath();
        for (const p of parts) {
          p.y += p.v * dt; p.x -= p.v * dt * .18;
          if (p.y > H + 30) {
            if (Math.random() < .35) extra.push({ x: p.x, y: H - rnd(0, 30), r: 0, life: 1 });
            Object.assign(p, this.make(false));
          }
          ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.l * .18, p.y - p.l);
        }
        ctx.globalAlpha = .28; ctx.stroke();
        for (const s of extra) {
          s.r += dt * .03; s.life -= dt / 500;
          ctx.globalAlpha = Math.max(0, s.life) * .3;
          ctx.beginPath(); ctx.ellipse(s.x, s.y, s.r, s.r * .3, 0, 0, TAU); ctx.stroke();
        }
        extra = extra.filter(s => s.life > 0);
        ctx.globalAlpha = 1;
      }
    },
    petals: {
      count: () => Math.round(W * H / 30000 * density),
      make: (initial) => ({ x: rnd(-40, W), y: initial ? rnd(0, H) : -20, s: rnd(5, 10), vy: rnd(.025, .06), vx: rnd(.01, .04), rot: rnd(0, TAU), vr: rnd(-.002, .002), ph: rnd(0, TAU), c: Math.floor(rnd(0, 3)) }),
      draw(dt, now) {
        ctx.clearRect(0, 0, W, H);
        for (const p of parts) {
          p.y += p.vy * dt; p.x += p.vx * dt + Math.sin(now * .001 + p.ph) * .35; p.rot += p.vr * dt;
          if (p.y > H + 20 || p.x > W + 40) Object.assign(p, this.make(false));
          const flip = Math.abs(Math.sin(now * .0015 + p.ph));
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, .45 + flip * .55);
          ctx.globalAlpha = .55; ctx.fillStyle = colors[p.c];
          ctx.beginPath(); ctx.ellipse(0, 0, p.s, p.s * .62, 0, 0, TAU); ctx.fill();
          ctx.restore();
        }
        ctx.globalAlpha = 1;
      }
    }
  };

  function initMode() {
    const M = MODES[mode];
    parts = []; extra = [];
    if (M.init) M.init();
    else parts = Array.from({ length: Math.max(8, M.count()) }, () => M.make(true));
  }

  function drawStatic() {
    if (!mode || !ctx) return;
    ctx.clearRect(0, 0, W, H);
    MODES[mode].draw.call(MODES[mode], 16, 12000);
  }

  function loop(now) {
    if (!mode) return;
    const dt = Math.min(48, now - (last || now));
    last = now;
    MODES[mode].draw.call(MODES[mode], dt || 16, now);
    raf = requestAnimationFrame(loop);
  }

  function stopLoop() { cancelAnimationFrame(raf); raf = 0; last = 0; }

  function startCanvas(m, d) {
    const cv = canvasEl(); if (!cv) return;
    stopLoop();
    mode = m; density = d || 1;
    if (!mode) { cv.hidden = true; if (ctx) ctx.clearRect(0, 0, W, H); parts = []; extra = []; return; }
    cv.hidden = false;
    readColors();
    resize();
    if (!mode) return;
    if (motionOn && !document.hidden) raf = requestAnimationFrame(loop);
    else drawStatic();
  }

  window.addEventListener('resize', () => { if (mode) resize(); });
  document.addEventListener('visibilitychange', () => {
    if (!mode) return;
    if (document.hidden) stopLoop();
    else if (motionOn && !raf) raf = requestAnimationFrame(loop);
  });

  window.FLThemes = {
    list: THEMES,
    get: byId,
    apply,
    current: () => current,
    prefersReducedMotion: reducedMotion,
    refreshColors() { if (mode) readColors(); }
  };
})();
