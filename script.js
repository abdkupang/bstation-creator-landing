/* ==========================================================
   Bstation Creator landing — script
   1) Konfigurasi  2) Mesin suara  3) Util  4) Gerbang masuk
   5) Transisi halaman  6) Navigasi  7) Hero  8) Section
   ========================================================== */
(() => {
  'use strict';

  /* ---------- 1. KONFIGURASI ----------
     Isi data brand ambassador di sini. Selama kosong, halaman
     menampilkan placeholder kuning dan tombol terkait memberi tahu
     bahwa datanya belum diisi. */
  const CFG = {
    name: '',        // contoh: 'Nama Kamu'
    city: '',        // contoh: 'Makassar'
    bio: '',         // bio singkat
    instagram: '@abdkupang_',
    whatsapp: '082196481822',
    facebook: 'https://www.facebook.com/share/1DQN53G2sT/',
    tiktok: '@abdkupang',
    refCode: '3E7CCE65',     // kode referral pendaftaran
    registerUrl: 'https://rsbcreatormanager.com?ref=3E7CCE65', // link daftar creator (sertakan kode ref di link)
    proofUrl: ''     // link bukti hadiah di Instagram
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const body = document.body;

  /* ---------- 2. MESIN SUARA (Web Audio, tanpa file) ---------- */
  const audio = (() => {
    let ctx = null, master = null, noiseBuf = null;
    let muted = false;
    const SCALE = [261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99, 880, 1046.5];

    function init() {
      if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = .7;
      master.connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 1, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const ok = () => ctx && !muted && ctx.state === 'running';

    function tone({ f = 440, f2, d = .1, type = 'sine', v = .2, at = 0 }) {
      if (!ok()) return;
      const t = ctx.currentTime + at;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f, t);
      if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(Math.max(v, .0002), t + .012);
      g.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(g); g.connect(master);
      o.start(t); o.stop(t + d + .03);
    }
    function noise({ d = .3, v = .15, f0 = 400, f1 = 2400, at = 0 }) {
      if (!ok()) return;
      const t = ctx.currentTime + at;
      const s = ctx.createBufferSource(); s.buffer = noiseBuf;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.2;
      bp.frequency.setValueAtTime(f0, t);
      bp.frequency.exponentialRampToValueAtTime(f1, t + d);
      const g = ctx.createGain();
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(v, t + d * .3);
      g.gain.exponentialRampToValueAtTime(.0001, t + d);
      s.connect(bp); bp.connect(g); g.connect(master);
      s.start(t); s.stop(t + d + .05);
    }
    const note = (i, o = {}) => tone({ f: SCALE[((i % SCALE.length) + SCALE.length) % SCALE.length], d: .38, type: 'triangle', v: .2, ...o });

    const bank = {
      click()  { tone({ f: 380, f2: 780, d: .09, type: 'triangle', v: .24 }); tone({ f: 1250, d: .04, v: .07 }); },
      pop()    { tone({ f: 300, f2: 900, d: .12, type: 'triangle', v: .26 }); },
      hover()  { tone({ f: 900, f2: 1180, d: .04, v: .045 }); },
      tick()   { tone({ f: 1500, d: .03, type: 'triangle', v: .07 }); },
      tap()    { tone({ f: 320, f2: 190, d: .08, v: .12 }); },
      scroll() { tone({ f: 700, d: .02, type: 'triangle', v: .035 }); },
      thud()   { tone({ f: 150, f2: 50, d: .2, v: .34 }); },
      whoosh() { noise({ d: .5, v: .2, f0: 300, f1: 3400 }); tone({ f: 180, f2: 620, d: .4, v: .06 }); },
      swoosh() { noise({ d: .26, v: .13, f0: 900, f1: 2800 }); },
      success(){ [523.25, 659.25, 784, 1046.5].forEach((f, i) => tone({ f, d: .22, type: 'triangle', v: .17, at: i * .07 })); },
      coin()   { tone({ f: 988, d: .07, type: 'square', v: .1 }); tone({ f: 1319, d: .3, type: 'square', v: .1, at: .07 }); },
      error()  { tone({ f: 170, f2: 110, d: .2, type: 'sawtooth', v: .13 }); tone({ f: 170, f2: 100, d: .24, type: 'sawtooth', v: .13, at: .13 }); },
      chime()  { tone({ f: 880, d: .7, v: .15 }); tone({ f: 1760, d: .5, v: .06 }); },
      off()    { tone({ f: 700, f2: 250, d: .18, type: 'triangle', v: .2 }); }
    };

    return {
      init, note, tone, noise,
      play(name) { (bank[name] || bank.click)(); },
      get muted() { return muted; },
      setMuted(v) { muted = !!v; },
      get running() { return !!ctx && ctx.state === 'running'; },
      get ctx() { return ctx; },
      get master() { return master; }
    };
  })();
  window.BSAudio = audio; // dipakai maskot (mascot.js): satu AudioContext, satu tombol mute
  const sfx = n => audio.play(n);

  /* ---------- 3. UTIL ---------- */
  const toastEl = $('#toast');
  let toastT;
  function toast(msg, warn = false) {
    toastEl.textContent = msg;
    toastEl.classList.toggle('is-warn', warn);
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('show'), 2400);
  }

  const COLORS = ['#FF4F81', '#FFD43B', '#2DB4FF', '#8BE5B8', '#15131B', '#fff'];
  function confetti(x, y, n = 18, spread = 1) {
    if (RM) return;
    for (let i = 0; i < n; i++) {
      const el = document.createElement('i');
      el.className = 'confetti';
      el.style.left = x + 'px'; el.style.top = y + 'px';
      el.style.background = COLORS[i % COLORS.length];
      if (i % 3 === 0) el.style.borderRadius = '50%';
      document.body.appendChild(el);
      const a = Math.random() * Math.PI * 2, dist = (60 + Math.random() * 160) * spread;
      const dx = Math.cos(a) * dist, dy = Math.sin(a) * dist - 60 * spread;
      el.animate([
        { transform: 'translate(0,0) rotate(0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random() * 540}deg) scale(1)`, opacity: 1, offset: .6 },
        { transform: `translate(${dx * 1.1}px, ${dy + 120}px) rotate(${Math.random() * 720}deg) scale(.6)`, opacity: 0 }
      ], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.22,1,.36,1)' }).onfinish = () => el.remove();
    }
  }
  const burstAt = (el, n, s) => { const r = el.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2, n, s); };

  /* ---------- Konfigurasi -> DOM ---------- */
  function cfgUrl(key, v) {
    if (!v) return '';
    if (key === 'whatsapp') { const d = v.replace(/\D/g, '').replace(/^0/, '62'); return d ? 'https://wa.me/' + d : ''; }
    if (key === 'instagram') return /^https?:/.test(v) ? v : 'https://instagram.com/' + v.replace(/^@/, '');
    if (key === 'tiktok') return /^https?:/.test(v) ? v : 'https://www.tiktok.com/@' + v.replace(/^@/, '');
    return v;
  }
  $$('[data-cfg]').forEach(el => {
    const k = el.dataset.cfg, v = (CFG[k] || '').trim();
    if (!v) return;
    el.textContent = ((k === 'instagram' || k === 'tiktok') && !/^https?:|^@/.test(v)) ? '@' + v : v;
    el.classList.add('is-filled');
  });
  $$('[data-cfg-link]').forEach(a => {
    const url = cfgUrl(a.dataset.cfgLink, (CFG[a.dataset.cfgLink] || '').trim());
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; return; }
    a.dataset.sfx = 'none';
    a.addEventListener('click', e => {
      e.preventDefault();
      sfx('error');
      toast(a.dataset.placeholderMsg || 'Data ini belum diisi.', true);
    });
  });

  /* ---------- 4. MULAI (tanpa gerbang, suara aktif secara default) ---------- */
  const curtain = $('#curtain');
  const soundBtn = $('#soundToggle');
  try { if (localStorage.getItem('bs-muted') === '1') audio.setMuted(true); } catch (_) {}

  function renderSound() {
    const on = !audio.muted;
    soundBtn.setAttribute('aria-pressed', String(on));
    soundBtn.setAttribute('aria-label', on ? 'Suara aktif, ketuk untuk mematikan' : 'Suara mati, ketuk untuk menyalakan');
  }

  async function wipe(mid) {
    if (RM) { mid && mid(); return; }
    curtain.className = 'curtain in';
    await wait(560);
    mid && mid();
    curtain.className = 'curtain out';
    await wait(700);
    curtain.className = 'curtain';
  }

  // Browser menahan suara sampai ada sentuhan/klik pertama. Setelah itu langsung aktif.
  const unlockEvents = ['pointerdown', 'pointerup', 'touchend', 'keydown', 'click'];
  function unlock() {
    audio.init();
    if (audio.running) unlockEvents.forEach(ev => removeEventListener(ev, unlock, true));
  }
  unlockEvents.forEach(ev => addEventListener(ev, unlock, true));

  let entered = false;
  function scheduleIntroSound() {
    if (RM) return;
    $$('.hero__title .ch').forEach((c, i) => setTimeout(() => audio.note(i % 8, { d: .2, v: .09 }), 250 + i * 55 + 120));
    setTimeout(() => sfx('success'), 1350);
  }
  async function start() {
    if (document.fonts && document.fonts.status !== 'loaded') await Promise.race([document.fonts.ready, wait(1500)]);
    body.classList.remove('is-locked');
    window.scrollTo(0, 0);
    body.classList.add('is-ready');
    if (RM) curtain.className = 'curtain';
    else { curtain.className = 'curtain out'; setTimeout(() => { curtain.className = 'curtain'; }, 900); }
    scheduleIntroSound();
    entered = true;
  }

  soundBtn.addEventListener('click', () => {
    audio.init();
    if (!audio.muted) { sfx('off'); audio.setMuted(true); toast('Suara dimatikan'); }
    else { audio.setMuted(false); sfx('success'); toast('Suara dinyalakan'); }
    try { localStorage.setItem('bs-muted', audio.muted ? '1' : '0'); } catch (_) {}
    renderSound();
  });

  /* ---------- Suara global ---------- */
  const INTERACTIVE = 'a, button, summary, [role="tab"]';
  let lastHover = null, lastHoverT = 0;
  document.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse') return;
    const el = e.target.closest(INTERACTIVE + ', .tip, .cat, .step, .reward');
    if (!el || el === lastHover) { if (!el) lastHover = null; return; }
    lastHover = el;
    const now = performance.now();
    if (now - lastHoverT > 70) { sfx('hover'); lastHoverT = now; }
  });
  document.addEventListener('click', e => {
    const el = e.target.closest(INTERACTIVE);
    if (!el) return;
    if (el.dataset.sfx === 'none' || el.hasAttribute('data-nav')) return;
    sfx(el.dataset.sfx || 'click');
  });
  document.addEventListener('pointerdown', e => {
    audio.init();
    if (!RM) {
      const r = document.createElement('i');
      r.className = 'ripple';
      r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px';
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 650);
    }
    if (!e.target.closest(INTERACTIVE + ', [data-sticker], .ch, .video, .mk, .mk-chat')) sfx('tap');
  }, { passive: true });
  document.addEventListener('focusin', e => {
    if (e.target.matches && e.target.matches(':focus-visible')) sfx('tick');
  });

  /* ---------- 5. TRANSISI HALAMAN (tirai) ---------- */
  let busy = false;
  const menu = $('#menu'), burger = $('#burger');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    body.classList.toggle('is-locked', open);
  }
  async function navTo(hash) {
    if (busy) return;
    const id = hash.replace('#', '');
    const target = id && id !== 'top' ? document.getElementById(id) : null;
    const y = target ? target.getBoundingClientRect().top + scrollY : 0;
    const wasMenu = menu.classList.contains('open');
    if (!wasMenu && Math.abs(scrollY - y) < 40) { sfx('tick'); return; }
    busy = true;
    sfx('whoosh');
    if (wasMenu) setMenu(false);
    await wipe(() => {
      window.scrollTo(0, y);
      history.replaceState(null, '', id && id !== 'top' ? '#' + id : location.pathname);
      onScroll();
    });
    busy = false;
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-nav]');
    if (!a) return;
    e.preventDefault();
    navTo(a.getAttribute('href'));
  });
  $('#toTop').addEventListener('click', () => { navTo('#top'); });

  burger.addEventListener('click', () => {
    const open = !menu.classList.contains('open');
    sfx(open ? 'whoosh' : 'swoosh');
    setMenu(open);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { sfx('swoosh'); setMenu(false); } });

  /* ---------- 6. NAVIGASI, SCROLL, TEMA ---------- */
  const nav = $('#nav'), progress = $('#progress'), pill = $('#navPill');
  const navLinks = $$('#navLinks a');
  const themed = $$('section[data-theme], footer[data-theme]');
  const spyTargets = navLinks.map(a => document.getElementById(a.getAttribute('href').slice(1)));
  let lastY = 0, ticking = false, lastTheme = 'paper', lastActive = -2, lastScrollSfx = 0;
  let pillFirst = true;

  function placePill() {
    const a = navLinks[lastActive];
    if (!a) { pill.style.width = '0px'; return; }
    if (pillFirst) { pill.style.transition = 'none'; }
    pill.style.width = a.offsetWidth + 'px';
    pill.style.transform = `translateX(${a.offsetLeft}px)`;
    if (pillFirst) { pill.offsetWidth; pill.style.transition = ''; pillFirst = false; }
  }

  function onScroll() {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    progress.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`;

    nav.classList.toggle('is-scrolled', y > 24);

    // suara scroll halus tiap ~480px
    if (Math.abs(y - lastScrollSfx) > 480) { lastScrollSfx = y; sfx('scroll'); }
    lastY = y;

    // tema latar per section
    for (const s of themed) {
      const r = s.getBoundingClientRect();
      if (r.top <= vh * .5 && r.bottom > vh * .5) {
        if (s.dataset.theme !== lastTheme) {
          lastTheme = s.dataset.theme;
          body.dataset.theme = lastTheme;
          if (entered) sfx('swoosh');
        }
        break;
      }
    }

    // scrollspy
    let active = -1;
    spyTargets.forEach((t, i) => { if (t && t.getBoundingClientRect().top <= vh * .4) active = i; });
    // tutorial dan ambassador berada di antara: pertahankan induk terdekat
    if (active !== lastActive) {
      lastActive = active;
      navLinks.forEach((a, i) => a.classList.toggle('is-active', i === active));
      placePill();
    }

    scrubWords();
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', () => { placePill(); placeTabInd(); });

  /* ---------- 7. HERO ---------- */
  // pecah huruf
  let ci = 0;
  $$('[data-letters]').forEach(w => {
    const txt = w.textContent.trim();
    w.textContent = '';
    [...txt].forEach(ch => {
      const s = document.createElement('span');
      s.className = 'ch'; s.textContent = ch; s.style.setProperty('--ci', ci);
      s.dataset.i = ci++;
      w.appendChild(s);
    });
  });
  const title = $('#heroTitle');
  let lastCh = null;
  function hitLetter(c) {
    if (!c || c === lastCh) return;
    lastCh = c;
    audio.note(+c.dataset.i % 9, { d: .3, v: .17 });
    if (!RM) c.animate([
      { transform: 'none' },
      { transform: 'translateY(-.16em) scale(1.12,.9) rotate(-6deg)', offset: .35 },
      { transform: 'translateY(.02em) scale(.97,1.04)', offset: .7 },
      { transform: 'none' }
    ], { duration: 650, easing: 'cubic-bezier(.34,1.56,.64,1)' });
  }
  title.addEventListener('pointermove', e => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const c = el && el.classList && el.classList.contains('ch') ? el : null;
    if (c) hitLetter(c); else lastCh = null;
  });
  title.addEventListener('pointerleave', () => { lastCh = null; });
  title.addEventListener('pointerdown', e => { const c = e.target.closest('.ch'); if (c) { lastCh = null; hitLetter(c); } });

  // stiker: parallax, seret, lempar
  const hero = $('#top');
  const stickers = $$('.sticker').map(el => ({
    el, body: el.querySelector('.sticker__body'), depth: +el.dataset.depth || 1,
    x: 0, y: 0, vx: 0, vy: 0, drag: false, moved: 0, ox: 0, oy: 0, lt: 0, lx: 0, ly: 0
  }));
  let tmx = 0, tmy = 0, cmx = 0, cmy = 0;

  hero.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    tmx = (e.clientX / innerWidth - .5) * 2;
    tmy = (e.clientY / innerHeight - .5) * 2;
  });
  hero.addEventListener('pointerleave', () => { tmx = 0; tmy = 0; });

  stickers.forEach((s, idx) => {
    const b = s.body;
    b.addEventListener('pointerdown', e => {
      e.preventDefault();
      s.drag = true; s.moved = 0; s.vx = s.vy = 0;
      s.ox = e.clientX - s.x; s.oy = e.clientY - s.y;
      s.lt = performance.now(); s.lx = e.clientX; s.ly = e.clientY;
      b.setPointerCapture(e.pointerId);
      b.classList.add('is-drag');
      sfx('pop');
    });
    b.addEventListener('pointermove', e => {
      if (!s.drag) return;
      const nx = e.clientX - s.ox, ny = e.clientY - s.oy;
      s.moved += Math.abs(nx - s.x) + Math.abs(ny - s.y);
      const now = performance.now(), dt = Math.max(8, now - s.lt);
      s.vx = (e.clientX - s.lx) / dt * 16;
      s.vy = (e.clientY - s.ly) / dt * 16;
      s.lt = now; s.lx = e.clientX; s.ly = e.clientY;
      s.x = nx; s.y = ny;
    });
    const end = () => {
      if (!s.drag) return;
      s.drag = false;
      b.classList.remove('is-drag');
      if (s.moved < 6) {
        s.vx = s.vy = 0;
        audio.note(idx + 2, { d: .35, v: .22 });
        if (!RM) b.animate([{ scale: '1' }, { scale: '1.3', offset: .4 }, { scale: '1' }], { duration: 480, easing: 'cubic-bezier(.34,1.56,.64,1)' });
        burstAt(b, 10, .7);
      } else {
        const sp = Math.hypot(s.vx, s.vy), cap = 38;
        if (sp > cap) { s.vx *= cap / sp; s.vy *= cap / sp; }
        sfx('thud');
      }
    };
    b.addEventListener('pointerup', end);
    b.addEventListener('pointercancel', end);
  });

  let lastBounce = 0;
  function bounce(speed) {
    const now = performance.now();
    if (speed > 2.5 && now - lastBounce > 90) { lastBounce = now; audio.tone({ f: 260 + Math.random() * 200, f2: 120, d: .1, v: .16 }); }
  }
  function updateStickers() {
    const hr = hero.getBoundingClientRect();
    const sy = Math.min(scrollY, innerHeight);
    cmx += (tmx - cmx) * .07; cmy += (tmy - cmy) * .07;
    for (const s of stickers) {
      const moving = s.drag || Math.abs(s.vx) > .08 || Math.abs(s.vy) > .08;
      if (!s.drag && moving) { s.x += s.vx; s.y += s.vy; s.vx *= .95; s.vy *= .95; }
      const px = cmx * s.depth * 18, py = cmy * s.depth * 14 - sy * .09 * (s.depth - .4);
      const apply = () => { s.el.style.transform = `translate3d(${(s.x + px).toFixed(1)}px, ${(s.y + py).toFixed(1)}px, 0)`; };
      apply();
      if (moving && hr.bottom > 0) {
        const r = s.body.getBoundingClientRect();
        let fix = false;
        if (r.left < hr.left) { s.x += hr.left - r.left; s.vx = Math.abs(s.vx) * .6; bounce(Math.abs(s.vx)); fix = true; }
        else if (r.right > hr.right) { s.x -= r.right - hr.right; s.vx = -Math.abs(s.vx) * .6; bounce(Math.abs(s.vx)); fix = true; }
        const top = Math.max(hr.top, 0), bot = Math.min(hr.bottom, innerHeight);
        if (r.top < top) { s.y += top - r.top; s.vy = Math.abs(s.vy) * .6; bounce(Math.abs(s.vy)); fix = true; }
        else if (r.bottom > bot) { s.y -= r.bottom - bot; s.vy = -Math.abs(s.vy) * .6; bounce(Math.abs(s.vy)); fix = true; }
        if (fix) apply();
      }
    }
    $('.hero__grid').style.backgroundPosition = `${(-cmx * 14).toFixed(1)}px ${(-cmy * 14).toFixed(1)}px`;
  }

  /* kursor kustom (desktop) */
  const cursor = $('#cursor');
  let cx = innerWidth / 2, cy = innerHeight / 2, rx = cx, ry = cy;
  const dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('.cursor__label');
  if (FINE) {
    body.classList.add('has-cursor');
    addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      cx = e.clientX; cy = e.clientY;
      const t = e.target.closest ? e.target : null;
      const lab = t && t.closest('[data-cursor]');
      cursor.classList.toggle('is-label', !!lab);
      cursor.classList.toggle('is-link', !lab && !!(t && t.closest(INTERACTIVE + ', [data-sticker]')));
      if (lab) label.textContent = lab.dataset.cursor;
    }, { passive: true });
    addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    addEventListener('pointerup', () => cursor.classList.remove('is-down'));
  }

  /* loop utama */
  const ribbons = $$('.ribbon').map(r => {
    const track = $('.ribbon__track', r);
    const orig = track.innerHTML;
    track.insertAdjacentHTML('beforeend', orig + orig);
    return { track, dir: +r.dataset.dir || -1, pos: 0, set: 0 };
  });
  let lastScrollForRibbon = scrollY;
  function measureRibbons() { ribbons.forEach(r => { r.set = r.track.scrollWidth / 3 + 14; }); }
  function loop() {
    updateStickers();
    if (FINE) {
      rx += (cx - rx) * .2; ry += (cy - ry) * .2;
      dot.parentNode.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      ring.style.left = (rx - cx - 22) + 'px'; ring.style.top = (ry - cy - 22) + 'px';
    }
    const d = Math.abs(scrollY - lastScrollForRibbon); lastScrollForRibbon = scrollY;
    ribbons.forEach(r => {
      if (!r.set) return;
      r.pos += (-r.dir) * (.9 + Math.min(d, 60) * .35);
      const x = -(((r.pos % r.set) + r.set) % r.set);
      r.track.style.transform = `translate3d(${x}px,0,0)`;
    });
    requestAnimationFrame(loop);
  }

  /* magnet & tilt (desktop) */
  if (FINE && !RM) {
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
    $$('[data-tilt]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-6px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- 8. SECTION ---------- */
  // judul: pecah per kata
  $$('[data-split]').forEach(h => {
    const words = h.textContent.trim().split(/\s+/);
    h.setAttribute('aria-label', words.join(' '));
    h.innerHTML = words.map((w, i) => `<span class="w" aria-hidden="true" style="--wi:${i}"><span>${w}</span></span>`).join(' ');
  });
  // stagger grup
  $$('[data-group]').forEach(g => $$(':scope > [data-reveal]', g).forEach((el, i) => el.style.setProperty('--gi', i)));

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('is-in');
      io.unobserve(el);
      if (el.matches('[data-split]') && entered) audio.tone({ f: 620, f2: 940, d: .08, type: 'triangle', v: .05 });
      if (el.matches('[data-reveal]') && entered) setTimeout(() => sfx('tick'), (+getComputedStyle(el).getPropertyValue('--gi') || 0) * 90);
    });
  }, { threshold: .18, rootMargin: '0px 0px -6% 0px' });
  $$('[data-split], [data-reveal]').forEach(el => io.observe(el));

  // teks yang menyala saat di-scroll
  const scrub = $('[data-scrub]');
  let scrubWordsEls = [], scrubLast = 0;
  if (scrub) {
    const words = scrub.textContent.trim().split(/\s+/);
    scrub.innerHTML = words.map(w => `<span class="sw">${w}</span>`).join(' ');
    scrubWordsEls = $$('.sw', scrub);
  }
  function scrubWords() {
    if (!scrub) return;
    if (RM) { scrubWordsEls.forEach(w => w.classList.add('on')); return; }
    const r = scrub.getBoundingClientRect(), vh = innerHeight;
    const p = clamp((vh * .9 - r.top) / (vh * .38 + r.height));
    const n = Math.round(p * scrubWordsEls.length);
    scrubWordsEls.forEach((w, i) => w.classList.toggle('on', i < n));
    if (Math.floor(n / 6) !== Math.floor(scrubLast / 6) && entered) audio.note(Math.floor(n / 6), { d: .12, v: .06 });
    scrubLast = n;
  }

  // angka hadiah
  const counters = $$('[data-count]');
  const cio = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      cio.unobserve(en.target);
      const el = en.target, end = +el.dataset.count;
      if (RM) return;
      const dur = 1300, t0 = performance.now();
      let lastStep = -1;
      const step = now => {
        const p = clamp((now - t0) / dur), e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(end * e);
        const st = Math.floor(p * 12);
        if (st !== lastStep && p < 1) { lastStep = st; audio.tone({ f: 500 + st * 70, d: .05, type: 'square', v: .05 }); }
        if (p < 1) requestAnimationFrame(step);
        else { el.textContent = end; sfx('coin'); burstAt(el, 14, .8); }
      };
      el.textContent = '0';
      requestAnimationFrame(step);
    });
  }, { threshold: .6 });
  counters.forEach(c => cio.observe(c));

  // tips
  const tips = $$('.tip');
  const bar = $('#tipsBar'), count = $('#tipsCount'), done = $('#tipsDone');
  tips.forEach(tip => {
    const btn = $('.tip__check', tip);
    btn.addEventListener('click', () => {
      const on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on));
      tip.classList.toggle('is-done', on);
      const n = tips.filter(t => t.classList.contains('is-done')).length;
      bar.style.width = (n / tips.length * 100) + '%';
      count.textContent = n === tips.length ? 'Semua tips sudah kamu coba. 5 dari 5.' : `Centang tips yang sudah kamu coba. ${n} dari ${tips.length}.`;
      if (on) { audio.note(n + 1, { d: .4, v: .22 }); burstAt(btn, 10, .7); }
      else sfx('tick');
      const all = n === tips.length;
      done.hidden = !all;
      if (all && on) { setTimeout(() => { sfx('success'); burstAt(bar, 40, 1.8); }, 150); }
    });
  });

  // video
  const video = $('#video');
  $('.video__play', video).addEventListener('click', () => {
    sfx('success');
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${video.dataset.yt}?autoplay=1&rel=0`;
    f.title = 'Cara menjadi creator di Bstation';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    video.innerHTML = '';
    video.appendChild(f);
  });

  // hadiah fisik
  $$('#prizeChips button').forEach(b => b.addEventListener('click', () => {
    audio.note(+b.dataset.note + 2, { d: .35, v: .22 });
    if (!RM) b.animate([{ scale: '1' }, { scale: '1.18', offset: .4 }, { scale: '1' }], { duration: 420, easing: 'cubic-bezier(.34,1.56,.64,1)' });
    burstAt(b, 8, .6);
  }));

  // tab kategori
  const tabs = $$('.tabs__btn'), panels = $$('.panel'), ind = $('#tabsInd');
  function placeTabInd() {
    const a = tabs.find(t => t.classList.contains('is-active'));
    if (!a) return;
    ind.style.width = a.offsetWidth + 'px';
    ind.style.transform = `translateX(${a.offsetLeft - 0}px)`;
  }
  function selectTab(i, focus) {
    tabs.forEach((t, k) => {
      const on = k === i;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p, k) => { p.hidden = k !== i; p.classList.toggle('is-active', k === i); });
    placeTabInd();
    if (focus) tabs[i].focus();
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => {
      if (t.classList.contains('is-active')) { sfx('tick'); return; }
      sfx('swoosh'); audio.note(i * 2 + 3, { d: .25, v: .16 });
      selectTab(i);
    });
    t.addEventListener('keydown', e => {
      let n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = tabs.length - 1;
      if (n === null) return;
      e.preventDefault(); sfx('swoosh'); selectTab(n, true);
    });
  });
  placeTabInd();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { placeTabInd(); placePill(); measureRibbons(); onScroll(); });

  // FAQ: satu jawaban terbuka pada satu waktu
  const faqItems = $$('.faq__item');
  faqItems.forEach(d => d.addEventListener('toggle', () => {
    if (d.open) {
      audio.note(faqItems.indexOf(d) % 8 + 2, { d: .3, v: .18 });
      faqItems.forEach(o => { if (o !== d) o.open = false; });
    }
  }));

  // salin hashtag dan kode ref
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (_) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        const ok = document.execCommand('copy'); ta.remove(); return ok;
      } catch (__) { return false; }
    }
  }
  $$('.tag').forEach(t => t.addEventListener('click', async () => {
    const ok = await copy(t.dataset.tag);
    if (ok) {
      sfx('coin'); toast(`${t.dataset.tag} disalin`);
      t.classList.add('is-copied'); setTimeout(() => t.classList.remove('is-copied'), 1400);
      burstAt(t, 8, .6);
    } else { sfx('error'); toast('Gagal menyalin. Salin manual: ' + t.dataset.tag, true); }
  }));
  $('#refCode').addEventListener('click', async () => {
    if (!CFG.refCode.trim()) { sfx('error'); toast('Kode referral belum diisi.', true); return; }
    const ok = await copy(CFG.refCode.trim());
    if (ok) { sfx('coin'); toast('Kode ref disalin'); burstAt($('#refCode'), 12, .8); }
    else { sfx('error'); toast('Gagal menyalin kode ref.', true); }
  });

  /* ---------- Mulai ---------- */
  renderSound();
  measureRibbons();
  onScroll();
  requestAnimationFrame(loop);
  /* ---------- Gerbang masuk: dengan atau tanpa musik ---------- */
  (function openGate() {
    const g = $('#gate');
    if (!g) { start(); return; }
    body.classList.add('is-gated');
    const btns = $$('[data-gate]', g);
    setTimeout(() => { try { btns[0].focus({ preventScroll: true }); } catch (_) {} }, 350);
    let done = false;
    btns.forEach(b => b.addEventListener('click', () => {
      if (done) return; done = true;
      const music = b.dataset.gate === 'music';
      try { localStorage.setItem('bs-music', music ? '1' : '0'); } catch (_) {}
      audio.init();
      document.dispatchEvent(new CustomEvent('bs:gate', { detail: { music } }));
      g.classList.add('is-out');
      setTimeout(() => { g.hidden = true; body.classList.remove('is-gated'); }, 650);
      start();
    }));
  })();
  addEventListener('load', () => { measureRibbons(); onScroll(); });
})();
