/* ==========================================================
   mascot.js — Kilau, maskot Bstation Creator
   Satu file, tanpa dependensi, tanpa gambar/audio eksternal.
   Pasang: <script src="mascot.js" defer></script> setelah script.js
   ========================================================== */
(() => {
  'use strict';
  if (window.__kilauLoaded) return;
  window.__kilauLoaded = true;

  /* ================= CONFIG (ubah per situs di sini) ================= */
  const CONFIG = {
    name: 'Kilau',
    brand: 'Bstation Creator',
    storeKey: 'bs-music',
    colors: { body: '#FF4F81', deep: '#E63A6E', cheek: '#FFC2D4', gold: '#FFD43B', sky: '#2DB4FF', ink: '#15131B', paper: '#FFFFFF' },
    width: { desktop: 88, mobile: 72 },
    contact: {
      wa: '082196481822', ig: '@abdkupang_', tiktok: '@abdkupang', fb: 'Facebook',
      urls: {
        wa: 'https://wa.me/6282196481822',
        ig: 'https://instagram.com/abdkupang_',
        tiktok: 'https://www.tiktok.com/@abdkupang',
        fb: 'https://www.facebook.com/share/1DQN53G2sT/'
      }
    },
    // Item kecil yang bisa diseret (satu konstanta, ubah sesuai situs)
    DRAG_SEL: '.btn, .tag, .soc, .chips li, .refcode, .badge, .step__i, .tip__icon, .reward__tag, .reward__num, .amb__role, .link, .foot__top, .foot__who, .cat > a',
    // Kartu besar: cangkang jatuh kosong, isinya berhamburan
    CARD_SEL: '.tip, .reward, .cat, .faq__item, .req, .step, .physical, .amb__card',
    // Bagian yang tidak boleh disentuh
    NO_DRAG: '.nav, .menu, .hero__title, .sticker, .video, .mk, .mk-chat, .tabs, .toast, .curtain, .progress, .cursor, .cover, .skip, .tip__check',
    // Section untuk komentar kontekstual (satu kali per section)
    sections: ['top', 'kenapa', 'tips', 'tutorial', 'hadiah', 'kategori', 'faq', 'ambassador', 'daftar'],
    sectionWords: [
      [/atas|beranda|home|awal|top/, 'top'], [/kenapa|why|tentang bstation/, 'kenapa'], [/tips/, 'tips'],
      [/tutorial|video|panduan/, 'tutorial'], [/hadiah|reward|bonus/, 'hadiah'], [/kategori|jalur|konten/, 'kategori'],
      [/faq|tanya|pertanyaan/, 'faq'], [/ambassador|duta|kenalan|pemilik/, 'ambassador'], [/daftar|syarat|join|gabung/, 'daftar']
    ]
  };

  /* ================= Teks maskot (santai, ramah, bahasa Indonesia) ================= */
  const L = {
    greet: ['Hai kak! Aku Kilau, teman jelajahmu di sini.', 'Halo halo! Mau lihat-lihat apa dulu nih?', 'Ehh ada tamu! Selamat datang, kak.'],
    poke: ['Eh, geli!', 'Hihi, jangan colek terus dong.', 'Iya iya, aku di sini kok.', 'Ada yang bisa kubantu?', 'Tuk tuk tuk, siapa di sana?'],
    dizzy: ['Duh, kepalaku muter-muter...', 'Berhenti dong, pusing nih!', 'Bintang-bintangnya banyak banget...'],
    grab: ['Waaa! Aku diangkat!', 'Jangan tinggi-tinggi, kak!', 'Pegangan yang kuat ya!'],
    throwL: ['Aaaa terbaaang!', 'Wuuush!', 'Kak, pelan-pelan!'],
    land: ['Mendarat dengan selamat.', 'Aduh, empuk juga.', 'Hup! Aman.'],
    bounceDizzy: ['Kebanyakan mantul, aku pusing...', 'Dunia berputar, kak...'],
    sleepy: ['Zzz... lima menit lagi...', 'Zzz... upload besok aja...'],
    wake: ['Hoaam... aku bangun!', 'Eh, ada yang datang!'],
    idle: ['Sudah cek hadiah mingguannya, kak?', 'Pakai hashtag wajib di tiap konten ya.', 'Konsisten upload itu kunci.', 'Ketuk aku kalau mau ngobrol.', 'Bingung? Cek FAQ dulu, siapa tahu ada jawabannya.', 'Tips: pilih satu topik niche dulu.', 'Geser-geser tombolnya juga boleh, nanti kubereskan.'],
    drop: ['Waduh, jatuh!', 'Yah, berantakan...', 'Tenang, nanti kuberesin.'],
    tidyStart: ['Siap, kubereskan!', 'Oke, bersih-bersih dimulai.', 'Tunggu ya, kuantar pulang.'],
    tidyDone: ['Beres! Semua sudah pulang.', 'Rapi lagi, nih.', 'Sip, bersih dan rapi.'],
    cheer: ['Pulang dengan selamat!', 'Tepat di tempatnya!', 'Klik! Pas.'],
    carry: ['Hup, kuangkat!', 'Berat juga ya...', 'Ikut aku, ya.'],
    perch: ['Pemandangannya bagus dari sini.', 'Aku nongkrong di sini dulu ya.'],
    scatter: ['Wah, siapa yang bikin kapal pecah?', 'Hujan item! Awas kepala!'],
    cats: ['Kuacak ya kartu kategorinya, hehe.', 'Siapa tahu ketemu jalur favoritmu.'],
    jokes: [
      'Editor itu ajaib: bisa motong video, tapi nggak bisa motong waktu begadang.',
      'Katanya konsisten itu kunci. Tapi kunciku hilang di folder "final_baru_fix_2".',
      'Aku nggak takut ketinggian. Aku cuma takut thumbnail-nya jelek.',
      'Kenapa kreator suka kopi? Biar kuat nunggu proses render.',
      'Video pertamaku 3 detik. Penontonnya 1. Itu aku sendiri, tapi tetap dihitung.'
    ]
  };
  const SAY = {
    '/': {
      top: ['Selamat datang! Yuk scroll pelan-pelan.', 'Mau jadi creator? Kamu datang ke tempat yang tepat.'],
      kenapa: ['Bstation itu rumahnya kreator anime dan game.', 'Tiga langkah aja: upload, tumbuh, raih hadiah.'],
      tips: ['Ini lima tips awal. Centang yang sudah kamu coba!', 'Tips kecil, hasilnya bisa besar.'],
      tutorial: ['Video panduan ini ringkas banget, lho.', 'Mau lihat caranya? Tekan play.'],
      hadiah: ['Hadiahnya ada bulanan dan mingguan. Semangat!', 'Klik angkanya, siapa tahu ada kejutan.'],
      kategori: ['Pilih jalur yang paling kamu suka. Ada jalur AI juga!', 'Coba ganti-ganti tab, banyak pilihan.'],
      faq: ['Bingung? Cek jawaban di sini dulu.', 'Pertanyaan umum ada di sini semua.'],
      ambassador: ['Ini tempat kenalan sama brand ambassador-nya.', 'Mau tanya langsung? Kontaknya ada di sini.'],
      daftar: ['Siap daftar? Hashtag wajibnya jangan lupa.', 'Tinggal satu langkah lagi, kak.'],
      foot: ['Sampai ketemu! Aku di sini kalau butuh teman ngobrol.', 'Terima kasih sudah mampir.']
    },
    '*': { default: ['Selamat datang!', 'Silakan lihat-lihat.'] }
  };

  /* ================= Util ================= */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  const rand = (a, b) => a + Math.random() * (b - a);
  const now = () => performance.now();
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const hist = {};
  function pickLine(arr, key) {
    if (!arr || !arr.length) return '';
    let i = 0;
    if (arr.length > 1) { do { i = Math.floor(Math.random() * arr.length); } while (i === hist[key]); }
    hist[key] = i; return arr[i];
  }
  const line = key => pickLine(L[key], key);

  /* ================= State bersama ================= */
  const S = {
    bottomInset: 0, chatOpen: false, lastInput: now(), tidyTok: 0, tidying: false, tidyT: 0, speedMul: 1,
    ghosts: [], dragMascot: false, helloPending: true, scripting: 0, lastDrop: 0, entered: false, shuffled: new Map()
  };

  /* ================= Ikon (stroke, satu helper icon(nama)) ================= */
  const ICONS = {
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2.5 4 2.5S16 14 16 14M9 9.5h.01M15 9.5h.01"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    pin: '<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    down: '<path d="M12 5v14M5 12l7 7 7-7"/>',
    jump: '<path d="M7 14l5-5 5 5M7 20l5-5 5 5"/>',
    note: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    spin: '<path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"/>',
    plane: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
    cursor: '<path d="M5 3l14 7-6 2-2 6z"/>',
    throw: '<path d="M4 20c3-10 9-13 16-13M16 3l4 4-4 4"/>',
    mess: '<path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 3v4M17 5h4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    hide: '<path d="M3 3l18 18M10.6 6.2A9.7 9.7 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-3.1 3.8M6.5 7.7C3.9 9.5 2.5 12 2.5 12S6 18 12 18c1.5 0 2.8-.4 4-.9"/>',
    laugh: '<circle cx="12" cy="12" r="9"/><path d="M8 13c.8 2.5 2.3 3.5 4 3.5s3.2-1 4-3.5zM9 9.5h.01M15 9.5h.01"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8"/>',
    heart: '<path d="M12 21C5 15.5 3 11.5 3 8.5a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1c0 3-2 7-9 12.5z"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17h.01"/>',
    perch: '<path d="M4 20h16M7 20v-8l5-6 5 6v8"/>',
    send: '<path d="M3 11l18-8-8 18-2-8z"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    chat: '<path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20.5l1.6-5A8.5 8.5 0 1 1 21 11.5z"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9M8 8a2.5 2.5 0 1 1 4-2.5M12 8a2.5 2.5 0 1 0 4-2.5"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    star: '<path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>'
  };
  function icon(n, cls = '') {
    return `<svg class="mk-ico ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[n] || ICONS.star}</svg>`;
  }

  /* ================= CSS (di-inject) ================= */
  function injectCSS() {
    const st = document.createElement('style');
    st.id = 'mk-css';
    st.textContent = `
:root{--mk-w:88px;--mk-ink:#15131B;--mk-pink:#FF4F81}
.mk-ico{width:1.15em;height:1.15em;flex:none;fill:none;stroke:currentColor;stroke-width:2.1;stroke-linecap:round;stroke-linejoin:round;vertical-align:-.2em}
.mk{position:fixed;left:0;top:0;width:var(--mk-w);height:calc(var(--mk-w)*1.34);z-index:200;pointer-events:none;will-change:transform}
.mk-rot{position:absolute;inset:0;pointer-events:auto;cursor:grab;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;transform-origin:50% 75%}
.mk.is-grab .mk-rot{cursor:grabbing}
.mk:focus{outline:none}
.mk:focus-visible .mk-rot{outline:3px solid #2DB4FF;outline-offset:4px;border-radius:32px}
.mk-fx,.mk-spin,.mk-flip{position:absolute;inset:0;transform-origin:50% 88%}
.mk-svg{display:block;width:100%;height:100%;overflow:visible}
.mk-svg *{transform-box:fill-box}
.mk-svg .eyes,.mk-svg .mouth,.mk-svg .m-wing,.mk-svg .m-z,.mk-svg .m-stars{display:none}
.mk[data-face=normal] .eyes-n,.mk[data-face=normal] .mouth-s,.mk[data-face=happy] .eyes-h,.mk[data-face=happy] .mouth-o,
.mk[data-face=sleep] .eyes-s,.mk[data-face=sleep] .mouth-f,.mk[data-face=dizzy] .eyes-d,.mk[data-face=dizzy] .mouth-w,
.mk[data-face=scared] .eyes-f,.mk[data-face=scared] .mouth-p{display:inline}
.mk.talking.open[data-face=normal] .mouth-s{display:none}
.mk.talking.open[data-face=normal] .mouth-o{display:inline}
.mk[data-state=fly] .m-wing{display:inline;animation:mkFlap .16s ease-in-out infinite alternate}
.mk[data-state=fly] .m-wing-r{transform-origin:0 60%}.mk[data-state=fly] .m-wing-l{transform-origin:100% 60%;animation-direction:alternate-reverse}
.mk[data-state=fly] .m-foot{transform:translateY(-3px)}
.mk[data-state=sleep] .m-z,.mk[data-face=sleep] .m-z{display:inline;animation:mkZ 2.4s ease-in-out infinite}
.mk[data-face=dizzy] .m-stars{display:inline;transform-origin:50% 50%;animation:mkSpin 1s linear infinite}
.mk[data-face=dizzy] .m-all{animation:mkWobble .5s ease-in-out infinite;transform-origin:50% 90%}
.mk[data-face=scared] .m-all{animation:mkShake .09s linear infinite}
.mk[data-state=idle] .m-body{animation:mkBreath 3.2s ease-in-out infinite;transform-origin:50% 100%}
.mk[data-state=walk] .m-all{animation:mkBob .34s ease-in-out infinite}
.mk[data-state=walk] .m-foot-l{animation:mkStep .34s ease-in-out infinite}
.mk[data-state=walk] .m-foot-r{animation:mkStep .34s ease-in-out -.17s infinite}
.mk.is-wave .m-arm-r{animation:mkWave .42s ease-in-out infinite;transform-origin:20% 90%}
.mk.is-dance .m-arm-l,.mk.is-dance .m-arm-r{animation:mkArms .3s ease-in-out infinite alternate}
.mk.blink .eye{transform:scaleY(.1);transform-origin:50% 50%}
.m-star{transform-origin:50% 50%;animation:mkTwinkle 2.4s ease-in-out infinite}
@keyframes mkBreath{50%{transform:scale(1.025,.965)}}
@keyframes mkBob{50%{transform:translateY(-4px)}}
@keyframes mkStep{50%{transform:translateY(-7px)}}
@keyframes mkFlap{from{transform:rotate(-14deg) scaleY(.9)}to{transform:rotate(16deg) scaleY(1.08)}}
@keyframes mkWave{50%{transform:rotate(-70deg)}}
@keyframes mkArms{from{transform:translateY(0)}to{transform:translateY(-14px)}}
@keyframes mkShake{0%{transform:translate(-1.4px,0)}50%{transform:translate(1.4px,.6px)}100%{transform:translate(-1px,-.6px)}}
@keyframes mkWobble{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}
@keyframes mkSpin{to{transform:rotate(360deg)}}
@keyframes mkZ{0%{transform:translate(0,6px);opacity:0}30%{opacity:1}100%{transform:translate(8px,-12px);opacity:0}}
@keyframes mkTwinkle{50%{transform:scale(1.18) rotate(12deg)}}
.mk-bubble{position:absolute;left:50%;bottom:100%;margin-bottom:6px;width:max-content;max-width:min(230px,80vw);padding:9px 13px;background:#fff;color:var(--mk-ink);border:3px solid var(--mk-ink);border-radius:18px;box-shadow:0 4px 0 var(--mk-ink);font:600 .86rem/1.35 "Plus Jakarta Sans",system-ui,sans-serif;display:flex;gap:8px;align-items:flex-start;opacity:0;transform:translateX(calc(-50% + var(--sx,0px))) translateY(8px) scale(.85);transform-origin:50% 100%;transition:opacity .2s,transform .35s cubic-bezier(.34,1.56,.64,1);pointer-events:none}
.mk-bubble.show{opacity:1;transform:translateX(calc(-50% + var(--sx,0px))) translateY(0) scale(1)}
.mk-bubble.below{bottom:auto;top:100%;margin:0;margin-top:6px;transform-origin:50% 0}
.mk-bubble::after{content:"";position:absolute;left:calc(50% - var(--sx,0px));bottom:-9px;width:12px;height:12px;background:#fff;border:3px solid var(--mk-ink);border-top:0;border-left:0;transform:translateX(-50%) rotate(45deg)}
.mk-bubble.below::after{bottom:auto;top:-9px;transform:translateX(-50%) rotate(225deg)}
.mk-bi{color:var(--mk-pink);display:grid;place-items:center;margin-top:1px}
.mk-ghost{position:absolute;left:0;top:0;margin:0;pointer-events:none;z-index:180;will-change:transform;transform-origin:50% 50%}
.mk-ghost.is-lift{filter:drop-shadow(0 12px 0 rgba(21,19,27,.28))}
body.mk-dragging,body.mk-dragging *{-webkit-user-select:none!important;user-select:none!important;cursor:grabbing!important}
html.mk-pending,html.mk-pending *{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
.mk-chat{position:fixed;left:16px;bottom:16px;width:min(380px,calc(100vw - 32px));height:152px;padding:10px 12px 10px;display:grid;grid-template-rows:1fr auto auto;gap:6px;background:#fff;color:var(--mk-ink);border:3px solid var(--mk-ink);border-radius:22px;box-shadow:0 6px 0 var(--mk-ink);z-index:210;font:500 .88rem/1.35 "Plus Jakarta Sans",system-ui,sans-serif;transform:translateY(24px) scale(.96);opacity:0;visibility:hidden;transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .2s,visibility 0s .4s}
.mk-chat.open{transform:none;opacity:1;visibility:visible;transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .2s,visibility 0s}
.mk-x{position:absolute;right:8px;top:6px;width:28px;height:28px;border-radius:10px;border:2.5px solid var(--mk-ink);background:#FFD43B;display:grid;place-items:center;padding:0;color:var(--mk-ink);cursor:pointer}
.mk-log{overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;gap:3px;padding-right:34px;min-height:0}
.mk-log p{margin:0;display:flex;gap:6px;align-items:flex-start;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.mk-log .u{color:#6b6677;font-weight:600}
.mk-log .b{font-weight:700}
.mk-log .b .mk-ico{color:var(--mk-pink);margin-right:5px}
.mk-chips{display:flex;gap:6px;overflow-x:auto;overscroll-behavior-x:contain;scrollbar-width:none;padding:1px 1px 3px;margin:0 -2px;touch-action:pan-x}
.mk-chips::-webkit-scrollbar{display:none}
.mk-chip{flex:none;display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border:2.5px solid var(--mk-ink);border-radius:999px;background:#F6F7FB;color:var(--mk-ink);font:700 .78rem "Plus Jakarta Sans",system-ui,sans-serif;cursor:pointer;white-space:nowrap}
.mk-chip:hover{background:#FFD43B}
.mk-form{display:flex;gap:6px}
.mk-form input{flex:1;min-width:0;height:36px;padding:0 12px;border:2.5px solid var(--mk-ink);border-radius:12px;font:600 16px "Plus Jakarta Sans",system-ui,sans-serif;color:var(--mk-ink);background:#fff}
.mk-form input:focus{outline:3px solid #2DB4FF;outline-offset:1px}
.mk-form button{width:40px;height:36px;border:2.5px solid var(--mk-ink);border-radius:12px;background:var(--mk-pink);color:#fff;display:grid;place-items:center;padding:0;cursor:pointer}
@media (max-width:640px){.mk-chat{left:0;right:0;bottom:0;width:100%;border-radius:22px 22px 0 0;border-bottom:0;box-shadow:0 -4px 0 var(--mk-ink);padding-bottom:calc(10px + env(safe-area-inset-bottom));height:calc(152px + env(safe-area-inset-bottom))}}
.mk-music{width:44px;height:44px;border-radius:14px;border:3px solid var(--mk-ink);background:#fff;color:var(--mk-ink);display:grid;place-items:center;position:relative;padding:0;cursor:pointer;transition:transform .3s cubic-bezier(.34,1.56,.64,1),background .2s}
.mk-music:hover{transform:rotate(8deg) scale(1.08)}
.mk-music .mk-ico{width:22px;height:22px}
.mk-music[aria-pressed=false]{background:#e9e9ef}
.mk-music[aria-pressed=false]::after{content:"";position:absolute;width:26px;height:3px;background:var(--mk-ink);border-radius:2px;transform:rotate(-45deg)}
.mk-music.is-playing .mk-ico{animation:mkNote 1.2s ease-in-out infinite;color:var(--mk-pink)}
@keyframes mkNote{50%{transform:translateY(-3px) rotate(-8deg)}}
@media (prefers-reduced-motion:reduce){.mk *,.mk-music .mk-ico,.mk-bubble,.mk-chat{animation:none!important;transition-duration:.01ms!important}}
`;
    document.head.appendChild(st);
  }

  /* ================= Audio: SFX + musik prosedural (Web Audio, tanpa file) ================= */
  const A = (() => {
    const B = () => window.BSAudio;
    let bus = null, musBus = null, rev = null, musicOn = true, timer = 0, nextT = 0, step = 0, active = 0, started = false;
    try { const v = localStorage.getItem(CONFIG.storeKey); if (v !== null) musicOn = v === '1'; } catch (e) {}

    const ctx = () => (B() && B().ctx) || null;
    const ok = () => !!(B() && B().running && !B().muted && ctx());
    function ensure() {
      const c = ctx(); if (!c || bus) return !!bus;
      bus = c.createGain(); bus.gain.value = 0.9; bus.connect(B().master || c.destination);
      musBus = c.createGain(); musBus.gain.value = 0;
      // reverb kecil dari noise yang meluruh
      const len = c.sampleRate * 1.6, buf = c.createBuffer(2, len, c.sampleRate);
      for (let ch = 0; ch < 2; ch++) { const d = buf.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
      rev = c.createConvolver(); rev.buffer = buf;
      const wet = c.createGain(); wet.gain.value = 0.35;
      musBus.connect(bus); musBus.connect(rev); rev.connect(wet); wet.connect(bus);
      return true;
    }
    function osc(type, f, t, dur, vol, to, dest) {
      const c = ctx(); if (!c) return;
      const o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.setValueAtTime(f, t);
      if (to) o.frequency.exponentialRampToValueAtTime(Math.max(20, to), t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.02, dur / 3));
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(dest || bus);
      active++; o.onended = () => { active--; g.disconnect(); };
      o.start(t); o.stop(t + dur + 0.05);
    }
    function nz(t, dur, vol, freq, q, dest) {
      const c = ctx(); if (!c) return;
      const n = Math.max(1, Math.floor(c.sampleRate * dur)), buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
      const s = c.createBufferSource(); s.buffer = buf;
      const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q || 1;
      const g = c.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      s.connect(f); f.connect(g); g.connect(dest || bus);
      active++; s.onended = () => { active--; g.disconnect(); };
      s.start(t);
    }
    const T = () => ctx().currentTime + 0.01;
    const lastAt = {};
    const bank = {
      pop() { const t = T(); osc('sine', 520, t, .12, .16, 900); },
      poke() { const t = T(); osc('triangle', 700, t, .08, .14, 1000); osc('triangle', 1050, t + .07, .1, .12, 1400); },
      giggle() { const t = T(); [0, .09, .18, .27].forEach((d, i) => osc('triangle', 780 + (i % 2) * 180, t + d, .08, .1)); },
      grab() { const t = T(); osc('sine', 330, t, .14, .15, 520); },
      drop() { const t = T(); osc('sine', 440, t, .2, .14, 180); },
      whoosh() { const t = T(); nz(t, .35, .22, 900, .8); osc('sawtooth', 260, t, .3, .04, 700); },
      boing() { const t = T(); osc('sine', 180, t, .32, .2, 420); osc('triangle', 360, t, .3, .06, 760); },
      thud() { const t = T(); osc('sine', 120, t, .16, .26, 45); nz(t, .08, .1, 400, 1); },
      land() { const t = T(); osc('sine', 150, t, .14, .2, 60); },
      dizzy() { const t = T(); for (let i = 0; i < 4; i++) osc('sine', 500 + (i % 2) * 140, t + i * .12, .14, .08, 420 + (i % 2) * 140); },
      ding() { const t = T(); osc('sine', 1046, t, .3, .14); osc('sine', 1568, t + .06, .35, .1); },
      snore() { const t = T(); osc('sine', 110, t, .6, .08, 80); },
      chat() { const t = T(); osc('triangle', 600, t, .08, .12, 800); osc('triangle', 900, t + .07, .1, .1); },
      send() { const t = T(); osc('triangle', 780, t, .07, .12, 1100); },
      spark() { const t = T(); [0, 1, 2, 3].forEach(i => osc('sine', 1200 + i * 260, t + i * .05, .14, .09)); },
      tick() { const t = T(); osc('square', 900, t, .03, .05); },
      wake() { const t = T(); osc('triangle', 400, t, .12, .12, 600); osc('triangle', 600, t + .1, .14, .12, 880); }
    };
    function sfx(name, minGap = 40) {
      if (!ok() || !ensure()) return;
      const n = now(); if (lastAt[name] && n - lastAt[name] < minGap) return; lastAt[name] = n;
      try { (bank[name] || bank.pop)(); } catch (e) {}
    }

    /* musik: C pentatonik, progresi C – Am – F – G, arpeggio lembut + bass + pad */
    const BPM = 92, SPB = 60 / BPM / 2;
    const CH = [[48, 55, 60, 64], [45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 59]];
    const PENT = [72, 74, 76, 79, 81, 84];
    const mf = m => 440 * Math.pow(2, (m - 69) / 12);
    function bar(i, t) {
      const ch = CH[Math.floor(i / 8) % 4], s = i % 8;
      if (s === 0) { osc('triangle', mf(ch[0] - 12), t, SPB * 3.6, .1, 0, musBus); ch.slice(1).forEach(m => osc('sine', mf(m), t, SPB * 7.5, .025, 0, musBus)); }
      if (s === 4) osc('triangle', mf(ch[0] - 12), t, SPB * 1.8, .07, 0, musBus);
      if (s % 2 === 0 || Math.random() < .35) { const m = ch[s % 4] + 12; osc('sine', mf(m), t, SPB * 1.6, .045, 0, musBus); }
      if (s === 3 || s === 7) if (Math.random() < .6) osc('triangle', mf(PENT[Math.floor(Math.random() * PENT.length)]), t, SPB * 1.2, .035, 0, musBus);
    }
    function sched() {
      const c = ctx(); if (!c) return;
      if (!ok() || !musicOn || document.hidden) { return; }
      if (nextT < c.currentTime) nextT = c.currentTime + .05;
      while (nextT < c.currentTime + .4) { bar(step++, nextT); nextT += SPB; }
    }
    function fade(v, d = .5) { if (!musBus) return; const c = ctx(); musBus.gain.cancelScheduledValues(c.currentTime); musBus.gain.setTargetAtTime(v, c.currentTime, d / 3); }
    function startMusic() {
      if (timer || !ok() || !ensure()) return;
      nextT = 0; fade(.8, .8);
      timer = setInterval(sched, 90); sched(); started = true;
    }
    function stopMusic() { if (timer) { clearInterval(timer); timer = 0; } fade(0, .3); }
    function sync() {
      const want = musicOn && ok() && !document.hidden;
      if (want) startMusic(); else if (timer) stopMusic();
      document.querySelectorAll('.mk-music').forEach(b => {
        b.setAttribute('aria-pressed', String(want || (musicOn && !ok())));
        b.classList.toggle('is-playing', !!timer);
      });
      return want;
    }
    function toggle() {
      musicOn = !musicOn;
      try { localStorage.setItem(CONFIG.storeKey, musicOn ? '1' : '0'); } catch (e) {}
      sfx('tick'); sync(); return musicOn;
    }
    document.addEventListener('visibilitychange', sync);
    ['pointerdown', 'keydown', 'touchend'].forEach(e => addEventListener(e, () => setTimeout(sync, 60), { passive: true }));
    setInterval(sync, 1500);
    return { sfx, sync, toggle, get on() { return musicOn; }, get playing() { return !!timer; }, get active() { return active; }, ok };
  })();

  /* ================= Maskot: SVG, DOM, bubble, fisika ================= */
  const INK = CONFIG.colors.ink;
  function starPath(cx, cy, R, r) {
    let d = '';
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; d += (i ? 'L' : 'M') + (cx + Math.cos(a) * rr).toFixed(1) + ' ' + (cy + Math.sin(a) * rr).toFixed(1); }
    return d + 'Z';
  }
  const stk = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
  const SVG = `<svg class="mk-svg" viewBox="0 -8 100 134" aria-hidden="true" focusable="false">
<ellipse cx="50" cy="121" rx="28" ry="4.5" fill="rgba(21,19,27,.2)"/>
<g class="m-all">
<g class="m-wing m-wing-l"><path d="M16 74C-4 58-8 82 10 90 14 84 16 80 16 74z" fill="#fff" ${stk}/></g>
<g class="m-wing m-wing-r"><path d="M84 74C104 58 108 82 90 90 86 84 84 80 84 74z" fill="#fff" ${stk}/></g>
<g class="m-foot m-foot-l"><ellipse cx="35" cy="115" rx="12" ry="6.5" fill="${CONFIG.colors.deep}" ${stk}/></g>
<g class="m-foot m-foot-r"><ellipse cx="65" cy="115" rx="12" ry="6.5" fill="${CONFIG.colors.deep}" ${stk}/></g>
<g class="m-body">
<path d="M50 30C77 30 91 52 91 78 91 104 75 118 50 118 25 118 9 104 9 78 9 52 23 30 50 30z" fill="${CONFIG.colors.body}" ${stk}/>
<path d="M20 60c3-8 8-13 15-15" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="27" cy="82" rx="7" ry="4.5" fill="${CONFIG.colors.cheek}"/><ellipse cx="73" cy="82" rx="7" ry="4.5" fill="${CONFIG.colors.cheek}"/>
<g class="m-arm m-arm-l"><path d="M13 86C5 92 6 100 14 100" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M13 86C5 92 6 100 14 100" fill="none" stroke="${CONFIG.colors.deep}" stroke-width="2.5" stroke-linecap="round"/></g>
<g class="m-arm m-arm-r"><path d="M87 86C95 92 94 100 86 100" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M87 86C95 92 94 100 86 100" fill="none" stroke="${CONFIG.colors.deep}" stroke-width="2.5" stroke-linecap="round"/></g>
<g class="eyes eyes-n"><ellipse class="eye" cx="38" cy="70" rx="5" ry="7" fill="${INK}"/><ellipse class="eye" cx="62" cy="70" rx="5" ry="7" fill="${INK}"/><circle cx="40" cy="67" r="1.8" fill="#fff"/><circle cx="64" cy="67" r="1.8" fill="#fff"/></g>
<g class="eyes eyes-h" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"><path d="M32 73Q38 63 44 73"/><path d="M56 73Q62 63 68 73"/></g>
<g class="eyes eyes-s" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"><path d="M32 69Q38 76 44 69"/><path d="M56 69Q62 76 68 69"/></g>
<g class="eyes eyes-d" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"><path d="M33 64l10 10M43 64L33 74"/><path d="M57 64l10 10M67 64L57 74"/></g>
<g class="eyes eyes-f"><circle cx="38" cy="69" r="8" fill="#fff" ${stk.replace('width="4"', 'width="3"')}/><circle cx="62" cy="69" r="8" fill="#fff" ${stk.replace('width="4"', 'width="3"')}/><circle cx="38" cy="70" r="2.6" fill="${INK}"/><circle cx="62" cy="70" r="2.6" fill="${INK}"/></g>
<path class="mouth mouth-s" d="M43 82Q50 89 57 82" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>
<g class="mouth mouth-o"><path d="M42 80Q50 98 58 80z" fill="${INK}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M45 88Q50 84 55 88Q50 92 45 88z" fill="#FF8FA9"/></g>
<path class="mouth mouth-f" d="M46 85h8" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>
<path class="mouth mouth-w" d="M41 85q4.5-5 9 0t9 0" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>
<ellipse class="mouth mouth-p" cx="50" cy="85" rx="4" ry="5.5" fill="${INK}"/>
<path d="M14 64C10 28 34 16 50 16S90 28 86 64" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
<path d="M14 64C10 28 34 16 50 16S90 28 86 64" fill="none" stroke="${CONFIG.colors.gold}" stroke-width="5" stroke-linecap="round"/>
<rect x="3" y="58" width="17" height="30" rx="8" fill="${CONFIG.colors.sky}" ${stk}/><rect x="80" y="58" width="17" height="30" rx="8" fill="${CONFIG.colors.sky}" ${stk}/>
<path d="M50 17V8" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
<path class="m-star" d="${starPath(50, 0, 10, 4.4)}" fill="${CONFIG.colors.gold}" ${stk.replace('width="4"', 'width="3"')}/>
</g></g>
<g class="m-z" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M72 34h9l-9 11h9"/><path d="M84 18h6l-6 7h6"/></g>
<g class="m-stars"><path d="${starPath(30, 14, 6, 2.6)}" fill="${CONFIG.colors.gold}" stroke="${INK}" stroke-width="2"/><path d="${starPath(70, 14, 6, 2.6)}" fill="${CONFIG.colors.gold}" stroke="${INK}" stroke-width="2"/><path d="${starPath(50, -8, 5, 2.2)}" fill="${CONFIG.colors.gold}" stroke="${INK}" stroke-width="2"/></g>
</svg>`;

  const CSS2 = `
.mk-svg .m-arm{transform-origin:50% 0}
.mk.is-wave .m-arm-r{animation:mkWave .5s ease-in-out infinite}
@keyframes mkWave{0%,100%{transform:rotate(-110deg)}50%{transform:rotate(-150deg)}}
.mk.is-dance .m-all{animation:mkDance .5s ease-in-out infinite alternate;transform-origin:50% 100%}
@keyframes mkDance{from{transform:rotate(-7deg) translateY(0)}to{transform:rotate(7deg) translateY(-6px)}}
.mk[data-state=hidden]{visibility:hidden}
.mk-svg .m-all{will-change:transform}
`;

  const M = { x: -200, y: -200, vx: 0, vy: 0, av: 0, ang: 0, sq: 0, sqv: 0, spin: 0, spinV: 0, dir: -1, state: 'hidden', W: 88, H: 118, bounces: 0, px: 0, tw: null, fl: null, wk: null, perch: null, seen: false, mx: 0, my: 0 };
  const E = {};
  const hooks = { grab: [], tap: [], land: [] };
  const K = { M, E, S, A, hooks, openChat() {}, say: null };

  function build() {
    const el = document.createElement('div');
    el.className = 'mk'; el.dataset.state = 'hidden'; el.dataset.face = 'normal';
    el.tabIndex = 0; el.setAttribute('role', 'button');
    el.setAttribute('aria-label', CONFIG.name + ', maskot situs. Tekan Enter untuk mengobrol');
    el.innerHTML = `<div class="mk-rot"><div class="mk-fx"><div class="mk-spin"><div class="mk-flip">${SVG}</div></div></div></div><div class="mk-bubble" role="status" aria-live="polite"></div>`;
    document.body.appendChild(el);
    E.el = el; E.rot = $('.mk-rot', el); E.fx = $('.mk-fx', el); E.spin = $('.mk-spin', el); E.flip = $('.mk-flip', el); E.bub = $('.mk-bubble', el);
  }
  const setState = s => { M.state = s; E.el.dataset.state = s; };
  let faceT = 0, blinkT = 0;
  function setFace(f, ms) {
    E.el.dataset.face = f; clearTimeout(faceT);
    if (ms) faceT = setTimeout(() => { E.el.dataset.face = M.state === 'sleep' ? 'sleep' : 'normal'; }, ms);
  }
  function flag(c, ms) { E.el.classList.add(c); setTimeout(() => E.el.classList.remove(c), ms); }
  function blink() {
    blinkT = setTimeout(blink, rand(2200, 5200));
    if (E.el.dataset.face !== 'normal') return;
    E.el.classList.add('blink'); setTimeout(() => E.el.classList.remove('blink'), 120);
  }
  function setSize() {
    M.W = innerWidth < 640 ? CONFIG.width.mobile : CONFIG.width.desktop; M.H = M.W * 1.34;
    document.documentElement.style.setProperty('--mk-w', M.W + 'px');
  }
  const minX = () => 4, maxX = () => innerWidth - M.W - 4;
  const floor = () => innerHeight - S.bottomInset - M.H * 0.97 - 6;
  const squash = v => { if (!RM) M.sqv += v; };

  /* ---- bubble ---- */
  const B = { t: 0, talk: 0, w: 0, h: 0, shown: false, below: false, sx: 0 };
  function say(text, ms, ic) {
    if (!text || M.state === 'hidden') return;
    E.bub.innerHTML = `<span class="mk-bi">${icon(ic || 'smile')}</span><span>${esc(text)}</span>`;
    E.bub.classList.add('show'); B.shown = true;
    B.w = E.bub.offsetWidth; B.h = E.bub.offsetHeight;
    clearTimeout(B.t); clearInterval(B.talk);
    B.talk = setInterval(() => E.el.classList.toggle('open'), 130);
    const dur = ms || clamp(1700 + text.length * 48, 2400, 6500);
    B.t = setTimeout(hideBubble, dur);
    setTimeout(() => { clearInterval(B.talk); E.el.classList.remove('open'); }, Math.min(dur, 1500 + text.length * 30));
  }
  function hideBubble() { E.bub.classList.remove('show'); B.shown = false; clearInterval(B.talk); E.el.classList.remove('open'); }
  function placeBubble() {
    if (!B.shown) return;
    const c = M.x + M.W / 2, l = c - B.w / 2, sx = Math.round(clamp(l, 8, innerWidth - B.w - 8) - l);
    const below = M.y < B.h + 18;
    if (sx !== B.sx) { B.sx = sx; E.bub.style.setProperty('--sx', sx + 'px'); }
    if (below !== B.below) { B.below = below; E.bub.classList.toggle('below', below); }
  }
  K.say = say;

  /* ---- gerak ---- */
  function interrupt() {
    if (M.tw) { const r = M.tw.res; M.tw = null; r(false); }
    if (M.fl) { const r = M.fl.res; M.fl = null; r(false); }
    if (M.wk) { const r = M.wk.res; M.wk = null; r(false); }
    M.perch = null;
  }
  function hopTo(gx, gy, dur = 700, arc = 90) {
    interrupt();
    return new Promise(res => { setState('tween'); M.tw = { t0: now(), dur: RM ? 1 : dur, sx: M.x, sy: M.y, gx, gy, arc: RM ? 0 : arc, res }; });
  }
  function flyTo(gx, gy, arrive = 10, timeout = 9000) {
    interrupt();
    return new Promise(res => { setState('fly'); M.fl = { gx, gy, arrive, t0: now(), timeout, res }; });
  }
  function walkTo(x) {
    interrupt();
    return new Promise(res => { setState('walk'); M.wk = { x: clamp(x, minX(), maxX()), res }; M.dir = x > M.x ? 1 : -1; });
  }
  function fall(vx = 0, vy = 0) { interrupt(); M.vx = vx; M.vy = vy; M.bounces = 0; setState('fall'); }
  function land() {
    M.vx = 0; M.vy = 0; M.av = 0; M.spinV = 0; M.spin = 0; M.y = floor();
    squash(5); A.sfx('land'); setState('idle');
    const b = M.bounces; M.bounces = 0;
    hooks.land.forEach(f => f(b));
  }
  function physics(dt) {
    M.vy += 2400 * dt; M.x += M.vx * dt; M.y += M.vy * dt; M.ang += M.av * dt; M.spin += M.spinV * dt;
    if (M.x < minX()) { M.x = minX(); M.vx = Math.abs(M.vx) * .6; M.av *= -.6; A.sfx('pop'); }
    if (M.x > maxX()) { M.x = maxX(); M.vx = -Math.abs(M.vx) * .6; M.av *= -.6; A.sfx('pop'); }
    if (M.y < 4) { M.y = 4; M.vy = Math.abs(M.vy) * .5; }
    const fl = floor();
    if (M.y >= fl) {
      M.y = fl;
      if (Math.abs(M.vy) > 280) {
        M.vy = -M.vy * .52; M.vx *= .82; M.av *= .7; M.bounces++; M.spinV *= .5;
        squash(Math.min(6, Math.abs(M.vy) / 160)); A.sfx(M.bounces > 1 ? 'boing' : 'thud', 90);
      } else if (Math.abs(M.vx) > 60) { M.vy = 0; M.vx *= .9; M.av *= .8; if (Math.abs(M.vx) < 80) land(); } else land();
    }
  }
  function step(dt) {
    M.sqv += (-M.sq * 260 - M.sqv * 18) * dt; M.sq = clamp(M.sq + M.sqv * dt, -.35, .35);
    const st = M.state;
    if (st === 'fall' || st === 'ball') physics(dt);
    else {
      if (st !== 'drag') M.ang += (0 - M.ang) * Math.min(1, dt * 10);
      if (st === 'tween' && M.tw) {
        const T = M.tw, k = clamp((now() - T.t0) / T.dur, 0, 1), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        M.x = lerp(T.sx, T.gx(), e); M.y = lerp(T.sy, T.gy(), e) - Math.sin(Math.PI * k) * T.arc;
        M.spin = T.spinTo ? T.spinTo * e : 0;
        if (k >= 1) { M.tw = null; M.spin = 0; T.res(true); }
      } else if (st === 'fly' && M.fl) {
        const F = M.fl, tx = F.gx(), ty = F.gy(), px = M.x, k = Math.min(1, dt * 5.5);
        M.x = clamp(M.x + (tx - M.x) * k, minX(), maxX()); M.y = clamp(M.y + (ty - M.y) * k, 4, floor());
        const vx = (M.x - px) / Math.max(dt, .001);
        if (Math.abs(tx - M.x) > 8) M.dir = tx > M.x ? 1 : -1;
        M.ang += (clamp(vx * .02, -14, 14) - M.ang) * Math.min(1, dt * 8);
        if (Math.hypot(tx - M.x, ty - M.y) < F.arrive) { M.fl = null; F.res(true); }
        else if (now() - F.t0 > F.timeout) { M.fl = null; F.res(false); }
      } else if (st === 'walk' && M.wk) {
        const sp = M.W * 1.05, d = M.wk.x - M.x;
        M.y = floor();
        if (Math.abs(d) <= sp * dt) { M.x = M.wk.x; const r = M.wk.res; M.wk = null; setState('idle'); r(true); }
        else { M.dir = d > 0 ? 1 : -1; M.x += Math.sign(d) * sp * dt; }
      } else if (st === 'perch' && M.perch) {
        const r = M.perch.el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight - 40 || r.top < 8) { fall(); }
        else { M.y = r.top - M.H * .97 + 5; M.x = clamp(r.left + M.perch.off, minX(), maxX()); }
      } else if (st === 'idle' || st === 'sleep') {
        const fl = floor();
        if (M.y > fl + 1) M.y += (fl - M.y) * Math.min(1, dt * 10);
        else if (M.y < fl - 2) fall();
        M.x = clamp(M.x, minX(), maxX());
      }
    }
  }
  function render() {
    E.el.style.transform = `translate3d(${M.x.toFixed(1)}px,${M.y.toFixed(1)}px,0)`;
    E.rot.style.transform = `rotate(${M.ang.toFixed(1)}deg)`;
    E.fx.style.transform = `scale(${(1 + M.sq).toFixed(3)},${(1 - M.sq).toFixed(3)})`;
    E.flip.style.transform = `scaleX(${M.dir})`;
    E.spin.style.transform = M.spin ? `rotate(${M.spin.toFixed(1)}deg)` : '';
  }
  let lastT = 0;
  function loop(t) {
    requestAnimationFrame(loop);
    if (document.hidden) { lastT = 0; return; }
    if (!lastT) lastT = t;
    const dt = Math.min(.05, (t - lastT) / 1000); lastT = t;
    if (M.state === 'hidden') return;
    step(dt); render(); placeBubble();
  }

  /* ================= Seret maskot, ketuk, perilaku santai ================= */
  let P = null, taps = [];
  const script = async fn => { S.scripting++; try { await fn(); } catch (e) {} finally { S.scripting--; } };
  const idleOK = () => M.state === 'idle' && !S.scripting && !P;

  function dizzy(ms = 2600, key = 'dizzy') {
    interrupt(); if (M.state !== 'drag') setState('idle');
    setFace('dizzy', ms); A.sfx('dizzy'); say(line(key), ms, 'spin');
    S.scripting++; setTimeout(() => S.scripting--, ms);
  }
  function wakeUp() {
    if (M.state !== 'sleep') return;
    setState('idle'); setFace('happy', 900); A.sfx('wake'); say(line('wake'), 2400, 'sun');
  }
  function tap() {
    const t = now(); taps = taps.filter(x => t - x < 1500); taps.push(t);
    hooks.tap.forEach(f => f());
    if (M.state === 'sleep') return wakeUp();
    if (taps.length >= 5) { taps = []; return dizzy(2600); }
    squash(4); A.sfx('poke'); setFace('happy', 900);
    say(line('poke'), 2200, 'smile');
    if (taps.length === 1 && !S.chatOpen && M.state !== 'drag') K.openChat(true);
  }
  function startGrab() {
    interrupt(); S.dragMascot = true;
    hooks.grab.forEach(f => f());
    setState('drag'); E.el.classList.add('is-grab');
    setFace('scared'); A.sfx('grab'); say(line('grab'), 2200, 'jump');
    document.body.classList.add('mk-dragging'); S.lastDrop = now();
  }
  function release(e) {
    E.el.classList.remove('is-grab'); document.body.classList.remove('mk-dragging'); S.dragMascot = false;
    const pts = P.pts, tN = now(); let a = pts[0];
    for (const p of pts) if (tN - p.t < 110) { a = p; break; }
    const b = pts[pts.length - 1], dt = Math.max(.016, (b.t - a.t) / 1000);
    let vx = clamp((b.x - a.x) / dt, -2600, 2600), vy = clamp((b.y - a.y) / dt, -2600, 2600);
    const sp = Math.hypot(vx, vy);
    if (sp > 520) {
      setState('ball'); M.vx = vx; M.vy = vy; M.av = vx * .22; M.spinV = 0; M.bounces = 0;
      A.sfx('whoosh'); say(line('throwL'), 1800, 'throw'); setFace('scared', 1200);
    } else { fall(vx * .4, vy * .4); setFace('happy', 800); }
  }
  function bindDrag() {
    const rot = E.rot;
    rot.addEventListener('pointerdown', e => {
      if (e.button > 0) return;
      e.preventDefault(); try { rot.setPointerCapture(e.pointerId); } catch (x) {}
      S.lastInput = now(); if (M.state === 'sleep') { wakeUp(); }
      P = { id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: e.clientX - M.x, oy: e.clientY - M.y, t0: now(), moved: false, pts: [{ x: e.clientX, y: e.clientY, t: now() }], rev: [], lx: e.clientX, ldir: 0, dz: false };
    });
    rot.addEventListener('pointermove', e => {
      if (!P || e.pointerId !== P.id) return;
      S.lastInput = now();
      if (!P.moved && Math.hypot(e.clientX - P.sx, e.clientY - P.sy) > 6) { P.moved = true; startGrab(); }
      if (!P.moved) return;
      const t = now(), prev = M.x;
      M.x = clamp(e.clientX - P.ox, -M.W * .3, innerWidth - M.W * .7); M.y = clamp(e.clientY - P.oy, -M.H * .2, innerHeight - M.H * .6);
      P.pts.push({ x: e.clientX, y: e.clientY, t }); while (P.pts.length > 2 && t - P.pts[0].t > 240) P.pts.shift();
      const dx = e.clientX - P.lx;
      if (Math.abs(dx) > 10) {
        const dr = Math.sign(dx);
        if (P.ldir && dr !== P.ldir) { P.rev.push(t); P.rev = P.rev.filter(x => t - x < 1300); }
        P.ldir = dr; P.lx = e.clientX;
        if (P.rev.length >= 6 && !P.dz) { P.dz = true; setFace('dizzy', 2400); A.sfx('dizzy'); say(line('dizzy'), 2400, 'spin'); }
      }
      M.ang += (clamp((M.x - prev) * 1.6, -26, 26) - M.ang) * .35;
    });
    const up = e => {
      if (!P || e.pointerId !== P.id) return;
      try { rot.releasePointerCapture(e.pointerId); } catch (x) {}
      const was = P; P = null;
      if (!was.moved) { if (e.type === 'pointerup') tap(); return; }
      P = was; release(e); P = null;
    };
    rot.addEventListener('pointerup', up); rot.addEventListener('pointercancel', up);
    rot.addEventListener('contextmenu', e => e.preventDefault());
    E.el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); K.openChat(true); A.sfx('chat'); }
    });
    addEventListener('pointermove', e => { M.mx = e.clientX; M.my = e.clientY; M.seen = true; if (e.pointerType === 'mouse') S.lastInput = now(); }, { passive: true });
    ['pointerdown', 'keydown', 'wheel', 'scroll', 'touchstart'].forEach(ev => addEventListener(ev, () => { S.lastInput = now(); if (M.state === 'sleep') wakeUp(); }, { passive: true, capture: true }));
  }

  /* ---- perilaku santai ---- */
  function sleepNow() {
    script(async () => {
      setState('sleep'); setFace('sleep'); say(line('sleepy'), 3000, 'moon');
      for (let i = 0; i < 40 && M.state === 'sleep'; i++) { A.sfx('snore'); await wait(3200); }
    });
  }
  async function actWalk() { const x = clamp(M.x + rand(-1, 1) * innerWidth * .6, minX(), maxX()); if (Math.abs(x - M.x) < 60) return; await walkTo(x); }
  async function actWave() { setFace('happy', 1800); flag('is-wave', 1800); A.sfx('giggle'); await wait(1800); }
  async function actJump() {
    if (RM) return;
    fall(0, -800); M.spinV = Math.random() < .5 ? 540 : -540; A.sfx('boing'); setFace('happy', 900);
    await new Promise(r => { const iv = setInterval(() => { if (M.state === 'idle' || M.state === 'drag') { clearInterval(iv); r(); } }, 60); });
  }
  async function actLook() { M.dir *= -1; await wait(900); M.dir *= -1; await wait(500); }
  async function actDance() { if (RM || !A.playing) return; setFace('happy', 3200); flag('is-dance', 3200); await wait(3200); }
  async function actFollow() {
    if (!M.seen || RM) return;
    await walkTo(clamp(M.mx - M.W / 2, minX(), maxX())); setFace('happy', 700);
  }
  async function actPerch() {
    if (RM) return;
    const c = $$('.nav, section h2, .hero__badge, .tag, .eyebrow').filter(el => {
      const r = el.getBoundingClientRect(); return r.width > 60 && r.top > 90 && r.top < innerHeight - M.H - 60 && r.left > -10 && r.right < innerWidth + 10 && !el.closest('.mk, .mk-chat');
    });
    if (!c.length) return;
    const el = pick(c), r = el.getBoundingClientRect(), off = rand(Math.min(8, r.width * .2), Math.max(10, r.width - M.W - 8));
    const tx = () => clamp(el.getBoundingClientRect().left + off, minX(), maxX()), ty = () => el.getBoundingClientRect().top - M.H * .97 + 5;
    A.sfx('whoosh'); M.dir = tx() > M.x ? 1 : -1;
    const ok = await hopTo(tx, ty, 750, 130);
    if (!ok) return;
    M.perch = { el, off }; setState('perch'); squash(3); A.sfx('land'); say(line('perch'), 2600, 'perch');
    const t0 = now();
    while (M.state === 'perch' && now() - t0 < rand(5500, 8500)) await wait(250);
    if (M.state === 'perch') { setFace('happy', 600); fall(M.dir * 120, -200); A.sfx('boing'); await wait(900); }
  }
  async function actSay() { say(line('idle'), 4200, 'info'); await wait(2400); }
  function director() {
    setTimeout(director, rand(3200, 6200));
    if (S.chatOpen || document.hidden) return;
    if (M.state === 'sleep') return;
    if (!idleOK()) return;
    if (now() - S.lastInput > 50000) return sleepNow();
    if (RM) { if (Math.random() < .3) script(actSay); return; }
    const opts = [[actWalk, 3], [actWave, 1.4], [actJump, 1.4], [actLook, 1.4], [actSay, 1.2], [actPerch, 1.5], [actDance, A.playing ? 2 : 0], [actFollow, M.seen ? 1.4 : 0]];
    const sum = opts.reduce((a, o) => a + o[1], 0); let r = Math.random() * sum, fn = actWalk;
    for (const o of opts) { r -= o[1]; if (r <= 0) { fn = o[0]; break; } }
    script(fn);
  }

  /* ---- masuk ---- */
  function entrance() {
    return new Promise(async res => {
      const t0 = now();
      while (!document.body.classList.contains('is-ready') && now() - t0 < 4500) await wait(100);
      await wait(RM ? 100 : 700);
      M.x = innerWidth - M.W - 20; M.dir = -1; M.ang = 0;
      if (RM) { M.y = floor(); setState('idle'); render(); }
      else { M.y = -M.H - 20; setState('fall'); M.vy = 0; M.vx = -60; M.spinV = 0; render(); }
      A.sfx('whoosh');
      const iv = setInterval(() => { if (M.state === 'idle') { clearInterval(iv); res(); } }, 60);
      setTimeout(() => { clearInterval(iv); res(); }, 4000);
    });
  }

  /* ================= Item situs yang bisa diseret (ghost clone) ================= */
  const IT = { cur: null, pend: null, timer: 0, suppress: 0, list: S.ghosts };
  const SX = () => window.scrollX, SY = () => window.scrollY;
  let lastDropSay = 0;

  function inFixed(el) {
    for (let n = el; n && n !== document.body; n = n.parentElement) { const p = getComputedStyle(n).position; if (p === 'fixed' || p === 'sticky') return true; }
    return false;
  }
  function findTarget(t) {
    if (!(t instanceof Element) || t.closest(CONFIG.NO_DRAG)) return null;
    const sizeOK = (el, card) => { const r = el.getBoundingClientRect(); return r.width >= 14 && r.height >= 14 && r.width <= innerWidth * .96 && r.height <= (card ? 640 : 220); };
    let el = t.closest(CONFIG.DRAG_SEL);
    if (el && sizeOK(el, false) && !inFixed(el)) return { el, kind: 'item' };
    el = t.closest(CONFIG.CARD_SEL);
    if (el && sizeOK(el, true) && !inFixed(el)) return { el, kind: 'card' };
    return null;
  }
  function inlineStyles(src, dst) {
    const cs = getComputedStyle(src); let t = '';
    for (let i = 0; i < cs.length; i++) { const p = cs[i]; t += p + ':' + cs.getPropertyValue(p) + ';'; }
    dst.style.cssText = t;
    if (dst.removeAttribute) { dst.removeAttribute('id'); dst.removeAttribute('href'); dst.removeAttribute('name'); dst.removeAttribute('data-reveal'); dst.removeAttribute('data-tilt'); dst.setAttribute('tabindex', '-1'); }
    const a = src.children, b = dst.children;
    for (let i = 0; i < a.length && i < b.length; i++) inlineStyles(a[i], b[i]);
  }
  function makeGhost(el, shell) {
    const r = el.getBoundingClientRect(), g = el.cloneNode(true);
    inlineStyles(el, g);
    const disp = getComputedStyle(el).display;
    g.style.cssText += `;position:absolute;inset:auto;left:0;top:0;margin:0;width:${r.width}px;height:${r.height}px;max-width:none;min-width:0;box-sizing:border-box;transition:none;animation:none;opacity:1;visibility:visible;pointer-events:none;z-index:180;translate:none;scale:none;rotate:none;display:${disp === 'inline' || disp === 'contents' ? 'inline-block' : disp};`;
    if (shell) g.querySelectorAll('*').forEach(n => { n.style.visibility = 'hidden'; });
    g.classList.add('mk-ghost'); g.setAttribute('aria-hidden', 'true');
    document.body.appendChild(g);
    const gr = g.getBoundingClientRect();
    const G = { el, g, w: r.width, h: r.height, x: r.left + SX(), y: r.top + SY(), bx: gr.left + SX(), by: gr.top + SY(), vx: 0, vy: 0, rot: 0, av: 0, st: 'drag', shell: !!shell, offX: 0, offY: 0, prevVis: el.style.visibility, pts: [], t0: 0 };
    g.__G = G; el.style.visibility = 'hidden';
    IT.list.push(G); setPos(G); return G;
  }
  const setPos = G => { G.g.style.transform = `translate(${(G.x - G.bx).toFixed(1)}px,${(G.y - G.by).toFixed(1)}px) rotate(${G.rot.toFixed(1)}deg)`; };
  const homePos = G => { const r = G.el.getBoundingClientRect(); return { x: r.left + SX(), y: r.top + SY(), w: r.width, h: r.height }; };

  function sparkle(cx, cy, n = 7) {
    if (RM) return;
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span'); s.setAttribute('aria-hidden', 'true');
      s.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:14px;height:14px;z-index:190;pointer-events:none;color:${i % 2 ? CONFIG.colors.gold : CONFIG.colors.body}`;
      s.innerHTML = icon('star'); s.firstChild.style.cssText = 'width:100%;height:100%;fill:currentColor;stroke:#15131B;stroke-width:1.6';
      document.body.appendChild(s);
      const a = Math.PI * 2 * i / n + rand(-.3, .3), d = rand(26, 54);
      s.animate([{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px),calc(-50% + ${Math.sin(a) * d}px)) scale(1) rotate(160deg)`, opacity: 0 }], { duration: 650, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => s.remove();
    }
  }
  function removeGhost(G, restored) {
    const i = IT.list.indexOf(G); if (i >= 0) IT.list.splice(i, 1);
    const r = G.g.getBoundingClientRect(); G.g.remove(); G.el.style.visibility = G.prevVis || '';
    if (restored) { sparkle(r.left + r.width / 2, r.top + r.height / 2, 6); A.sfx('ding', 120); }
  }
  function cardPieces(card) {
    const all = $$('h2,h3,h4,p,li,summary,.tag,.badge,svg,img,.step__i,.tip__icon,.reward__num,.reward__tag,a,button', card);
    const out = all.filter(n => !all.some(o => o !== n && o.contains(n)) && !n.closest('details:not([open]) > :not(summary)'));
    return out.filter(n => { const r = n.getBoundingClientRect(); return r.width > 8 && r.height > 8; }).slice(0, 9);
  }

  /* ---- loop ghost ---- */
  let gRaf = 0, gLast = 0;
  function startGhostLoop() { if (!gRaf) { gLast = 0; gRaf = requestAnimationFrame(ghostLoop); } }
  function ghostLoop(t) {
    const dt = Math.min(.05, (t - (gLast || t)) / 1000); gLast = t;
    let busy = false;
    for (const G of IT.list.slice()) {
      if (G.st === 'rest') continue;
      busy = true;
      if (G.st === 'fall') {
        G.vy += 2200 * dt; G.x += G.vx * dt; G.y += G.vy * dt; G.rot += G.av * dt;
        const L = SX() + 4, R = SX() + document.documentElement.clientWidth - G.w - 4, F = SY() + innerHeight - S.bottomInset - 8 - G.h;
        if (G.x < L) { G.x = L; G.vx = Math.abs(G.vx) * .5; G.av *= -.6; } if (G.x > R) { G.x = R; G.vx = -Math.abs(G.vx) * .5; G.av *= -.6; }
        if (G.y >= F) {
          G.y = F;
          if (Math.abs(G.vy) > 260) { G.vy = -G.vy * .4; G.vx *= .7; G.av *= .55; A.sfx('thud', 80); }
          else { G.vy = 0; G.vx = 0; G.av = 0; settle(G); }
        }
      } else if (G.st === 'carried') {
        G.x = M.x + M.W / 2 - G.w / 2 + SX(); G.y = M.y + M.H * .62 - G.h / 2 + SY(); G.rot = M.ang * .6;
      } else if (G.st === 'home') {
        const k = clamp((now() - G.t0) / 220, 0, 1), e = 1 - Math.pow(1 - k, 3), h = homePos(G);
        G.x = lerp(G.fx, h.x, e); G.y = lerp(G.fy, h.y, e); G.rot = lerp(G.fr, 0, e);
        if (k >= 1) { setPos(G); removeGhost(G, true); continue; }
      }
      setPos(G);
    }
    gRaf = busy ? requestAnimationFrame(ghostLoop) : 0;
  }
  function settle(G) {
    G.st = 'rest'; G.rot = ((G.rot % 360) + 540) % 360 - 180; if (Math.abs(G.rot) > 25) G.rot = clamp(G.rot, -25, 25);
    G.g.classList.remove('is-lift'); G.g.style.pointerEvents = 'auto'; G.g.style.cursor = 'grab'; setPos(G);
    A.sfx('drop', 120);
    if (now() - lastDropSay > 9000 && !S.tidying && idleOK() && !S.chatOpen) { lastDropSay = now(); say(line('drop'), 2600, 'mess'); setFace('scared', 700); }
  }
  function goHome(G) {
    G.st = 'home'; G.t0 = now(); G.fx = G.x; G.fy = G.y; G.fr = G.rot; G.g.classList.remove('is-lift'); startGhostLoop();
  }

  /* ---- input ---- */
  function begin(p) {
    let G;
    if (p.G) { G = p.G; G.g.style.pointerEvents = 'none'; }
    else if (p.kind === 'item') G = makeGhost(p.el, false);
    else {
      G = makeGhost(p.el, true);
      const cx = G.x + G.w / 2, cy = G.y + G.h / 2;
      cardPieces(p.el).forEach((n, i) => {
        const q = makeGhost(n, false), qx = q.x + q.w / 2 - cx, dir = qx === 0 ? (i % 2 ? 1 : -1) : Math.sign(qx);
        q.st = 'fall'; q.vx = dir * rand(120, 520); q.vy = -rand(380, 820); q.av = rand(-360, 360); q.g.classList.add('is-lift');
      });
      A.sfx('spark'); say(line('scatter'), 2800, 'mess');
    }
    G.st = 'drag'; G.offX = p.cx + SX() - G.x; G.offY = p.cy + SY() - G.y; G.pts = [{ x: p.cx, y: p.cy, t: now() }];
    G.g.classList.add('is-lift'); IT.cur = G; IT.pend = null; clearTimeout(IT.timer);
    document.documentElement.classList.remove('mk-pending'); document.body.classList.add('mk-dragging');
    A.sfx('grab'); setFace('happy', 800); startGhostLoop(); S.lastInput = now(); wakeUp();
    if (navigator.vibrate) try { navigator.vibrate(10); } catch (e) {}
  }
  function cancelPend() { clearTimeout(IT.timer); IT.pend = null; document.documentElement.classList.remove('mk-pending'); }
  function onDown(e) {
    if (e.button > 0 || IT.cur || IT.pend || S.dragMascot) return;
    const t = e.target; if (!(t instanceof Element) || t.closest('.mk, .mk-chat')) return;
    const gh = t.closest('.mk-ghost'); let found;
    if (gh && gh.__G && gh.__G.st === 'rest') found = { G: gh.__G };
    else if (gh) return; else found = findTarget(t);
    if (!found) return;
    const touch = e.pointerType === 'touch';
    IT.pend = Object.assign(found, { pid: e.pointerId, sx: e.clientX, sy: e.clientY, cx: e.clientX, cy: e.clientY, touch });
    if (touch) {
      document.documentElement.classList.add('mk-pending');
      IT.timer = setTimeout(() => { if (IT.pend) begin(IT.pend); }, 230);
    }
  }
  function onMove(e) {
    const p = IT.pend;
    if (p && e.pointerId === p.pid) {
      p.cx = e.clientX; p.cy = e.clientY;
      const d = Math.hypot(e.clientX - p.sx, e.clientY - p.sy);
      if (p.touch) { if (d > 9) cancelPend(); } else if (d > 5) begin(p);
    }
    const G = IT.cur; if (!G || (e.pointerId !== undefined && G.pid !== undefined && e.pointerId !== G.pid)) return;
    S.lastInput = now();
    G.x = e.clientX + SX() - G.offX; G.y = e.clientY + SY() - G.offY;
    const t = now(); G.pts.push({ x: e.clientX, y: e.clientY, t }); while (G.pts.length > 2 && t - G.pts[0].t > 200) G.pts.shift();
    const a = G.pts[0]; G.rot += (clamp((e.clientX - a.x) * .2, -16, 16) - G.rot) * .3; setPos(G);
  }
  function onUp(e) {
    if (IT.pend && e.pointerId === IT.pend.pid) cancelPend();
    const G = IT.cur; if (!G) return;
    IT.cur = null; document.body.classList.remove('mk-dragging');
    IT.suppress = now() + 350;
    const pts = G.pts, a = pts[0], b = pts[pts.length - 1], dt = Math.max(.016, (b.t - a.t) / 1000);
    const h = homePos(G);
    if (Math.hypot(G.x - h.x, G.y - h.y) < 42) { A.sfx('pop'); goHome(G); return; }
    G.st = 'fall'; G.vx = clamp((b.x - a.x) / dt * .6, -1400, 1400); G.vy = clamp((b.y - a.y) / dt * .6, -1400, 1400); G.av = G.vx * .15;
    if (G.vx || G.vy) A.sfx('whoosh', 200);
    startGhostLoop();
  }
  function bindItems() {
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerup', onUp, true);
    document.addEventListener('pointercancel', e => { if (IT.cur) onUp(e); else cancelPend(); }, true);
    document.addEventListener('touchmove', e => { if (IT.cur) e.preventDefault(); }, { passive: false });
    document.addEventListener('contextmenu', e => { if (IT.pend || IT.cur) e.preventDefault(); });
    document.addEventListener('selectstart', e => { if (IT.pend || IT.cur) e.preventDefault(); });
    document.addEventListener('dragstart', e => { if (e.target instanceof Element && (findTarget(e.target) || e.target.closest('.mk-ghost'))) e.preventDefault(); });
    document.addEventListener('click', e => { if (IT.suppress > now()) { e.preventDefault(); e.stopPropagation(); } }, true);
  }

  /* ---- rapikan: antrean, pelacakan langsung, scroll otomatis ---- */
  function autoScroll(getY, lo, hi) {
    let on = true;
    (function f() {
      if (!on) return;
      const vh = innerHeight - S.bottomInset, vy = getY() - SY();
      if (vy < vh * lo || vy > vh * hi) {
        const d = vy - vh * .42, mx = document.documentElement.scrollHeight - innerHeight;
        const ny = clamp(SY() + Math.sign(d) * Math.min(Math.abs(d) * .12 + 3, 80), 0, mx);
        window.scrollTo({ top: ny, behavior: 'instant' });
      }
      requestAnimationFrame(f);
    })();
    return () => { on = false; };
  }
  const until = (fn, ms) => new Promise(r => { const t0 = now(); const iv = setInterval(() => { if (fn() || now() - t0 > ms) { clearInterval(iv); r(); } }, 40); });
  function cancelTidy() {
    S.tidyTok++; S.tidying = false;
    IT.list.forEach(G => { if (G.st === 'carried') { G.st = 'fall'; G.vx = rand(-80, 80); G.vy = 0; } });
    startGhostLoop();
  }
  hooks.grab.push(cancelTidy);

  async function tidyAll() {
    const todo = IT.list.filter(G => G.st === 'rest' || G.st === 'fall');
    if (S.tidying || !todo.length) return false;
    const tok = ++S.tidyTok; S.tidying = true; S.scripting++;
    try {
      if (M.state === 'sleep') wakeUp();
      say(line('tidyStart'), 2400, 'spark'); A.sfx('pop'); setFace('happy', 900);
      await until(() => IT.list.every(G => G.st !== 'fall'), 2500);
      const queue = IT.list.filter(G => G.st === 'rest').sort((a, b) => (b.shell - a.shell) || (a.y - b.y));
      let n = 0;
      for (const G of queue) {
        if (tok !== S.tidyTok) return false;
        if (!IT.list.includes(G)) continue;
        let stop = autoScroll(() => G.y + G.h / 2, .12, .8);
        await flyTo(() => G.x - SX() + G.w / 2 - M.W / 2, () => G.y - SY() + G.h / 2 - M.H * .62, 14, 6500);
        stop(); if (tok !== S.tidyTok) return false;
        G.st = 'carried'; G.g.style.pointerEvents = 'none'; G.g.classList.add('is-lift'); A.sfx('grab'); squash(3); startGhostLoop();
        if (n === 0 && Math.random() < .6) say(line('carry'), 1800, 'jump');
        const hc = () => homePos(G);
        stop = autoScroll(() => hc().y + hc().h / 2, .2, .64);
        await flyTo(() => hc().x + hc().w / 2 - M.W / 2 - SX(), () => hc().y + hc().h / 2 - SY() - M.H * .62, 16, 9000);
        stop(); if (tok !== S.tidyTok) return false;
        goHome(G); await until(() => !IT.list.includes(G), 1200); n++;
        if (n % 3 === 0 && queue.length > 3) say(line('cheer'), 1500, 'check');
      }
      if (tok === S.tidyTok) {
        fall(); S.tidying = false; setFace('happy', 1800); flag('is-wave', 1400);
        say(line('tidyDone'), 3200, 'check'); A.sfx('spark');
      }
      return true;
    } finally { S.scripting--; if (tok === S.tidyTok) S.tidying = false; }
  }
  // rapikan otomatis jika dibiarkan berantakan
  setInterval(() => {
    if (IT.list.length && !S.tidying && !S.chatOpen && !IT.cur && !S.dragMascot && now() - S.lastInput > 25000 && IT.list.every(G => G.st === 'rest')) tidyAll();
  }, 4000);

  /* ================= Interaksi khas situs: acak kategori, centang tips ================= */
  const smoothTo = el => { try { el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); } catch (e) { el.scrollIntoView(); } };
  async function shuffleCats() {
    const sec = $('#kategori'), panel = $('.panel.is-active', sec || document) || $('.panel');
    if (!panel) return false;
    const cards = $$('.cat', panel); if (cards.length < 2) return false;
    if (sec) { smoothTo(sec); await wait(RM ? 50 : 700); }
    say(line('cats'), 2400, 'spin'); setFace('happy', 1200); A.sfx('spark');
    const before = new Map(cards.map(c => [c, c.getBoundingClientRect()]));
    const order = cards.slice(); for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    order.forEach(c => panel.appendChild(c));
    order.forEach((c, i) => {
      const a = before.get(c), b = c.getBoundingClientRect(); S.shuffled.set(c, true);
      if (!RM) c.animate([{ transform: `translate(${a.left - b.left}px,${a.top - b.top}px) rotate(${rand(-6, 6)}deg)` }, { transform: 'none' }], { duration: 650 + i * 40, easing: 'cubic-bezier(.34,1.3,.5,1)' });
      setTimeout(() => A.sfx('tick', 20), i * 70);
    });
    return true;
  }
  async function tipsAuto(on) {
    const sec = $('#tips'), btns = $$('.tip .tip__check'); if (!btns.length) return false;
    if (sec) { smoothTo(sec); await wait(RM ? 50 : 800); }
    const todo = btns.filter(b => (b.getAttribute('aria-pressed') === 'true') !== on);
    if (!todo.length) { say(on ? 'Semua tips sudah tercentang, kak.' : 'Belum ada centang yang perlu dihapus.', 2600, 'check'); return true; }
    setFace('happy', todo.length * 380 + 600); say(on ? 'Kucentang semua ya, tinggal kamu praktikkan!' : 'Centangnya kubersihkan, mulai dari awal.', 2600, 'check');
    for (const b of todo) { b.click(); A.sfx('ding', 10); squash(2); await wait(RM ? 40 : 380); }
    return true;
  }
  document.addEventListener('click', e => {
    if (!e.target.closest || !e.target.closest('.tip__check')) return;
    setTimeout(() => {
      const t = $$('.tip');
      if (t.length && t.every(x => x.classList.contains('is-done')) && M.state !== 'hidden') { say('Lima dari lima! Kamu keren banget.', 3200, 'star'); setFace('happy', 1800); A.sfx('spark'); flag('is-wave', 1500); }
    }, 80);
  });

  /* ================= Komentar per section (sekali per section) ================= */
  function initSections() {
    const map = SAY['/'], said = new Set(); let lastSay = 0;
    const els = [...CONFIG.sections.map(id => document.getElementById(id)).filter(Boolean), $('.foot')].filter(Boolean);
    const io = new IntersectionObserver(ents => {
      ents.forEach(en => {
        if (!en.isIntersecting) return;
        const key = en.target.id || 'foot'; if (said.has(key) || !map[key]) return;
        if (S.chatOpen || S.tidying || S.dragMascot || IT.cur || M.state === 'hidden' || M.state === 'sleep' || now() - lastSay < 3500) return;
        said.add(key); lastSay = now(); io.unobserve(en.target);
        setTimeout(() => { if (!S.chatOpen && M.state !== 'drag') { say(pickLine(map[key], 'sec-' + key), 3800, 'info'); if (Math.random() < .5) setFace('happy', 900); } }, 500);
      });
    }, { threshold: .4 });
    els.forEach(el => io.observe(el));
    K.sections = { said, els };
  }

  /* ================= Panel obrolan + perintah ================= */
  const CH = {};
  function addMsg(who, html) {
    const p = document.createElement('p'); p.className = who;
    p.innerHTML = who === 'b' ? `<span>${icon('chat')}${html}</span>` : `<span>${html}</span>`;
    CH.log.appendChild(p); while (CH.log.children.length > 3) CH.log.firstChild.remove();
  }
  function talkOnly(ms) { clearInterval(B.talk); B.talk = setInterval(() => E.el.classList.toggle('open'), 130); setTimeout(() => { clearInterval(B.talk); E.el.classList.remove('open'); }, ms); }
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
  const GOTO = { top: 'top', beranda: 'top', atas: 'top', kenapa: 'kenapa', tips: 'tips', tutorial: 'tutorial', video: 'tutorial', hadiah: 'hadiah', reward: 'hadiah', kategori: 'kategori', jalur: 'kategori', faq: 'faq', ambassador: 'ambassador', daftar: 'daftar', syarat: 'daftar' };
  const C = CONFIG.contact;
  const contactHTML = () => `Kontak ${CONFIG.brand}: <a href="${C.urls.wa}" target="_blank" rel="noopener">WhatsApp ${esc(C.wa)}</a>, <a href="${C.urls.ig}" target="_blank" rel="noopener">Instagram ${esc(C.ig)}</a>, <a href="${C.urls.tiktok}" target="_blank" rel="noopener">TikTok ${esc(C.tiktok)}</a>.`;
  const COMMANDS = [
    [/\b(rapi|bereskan|beresin|bersih|kembalikan|balikin)/, async () => { if (!IT.list.length) return 'Belum ada yang berantakan. Coba seret tombol atau kartu dulu, lalu minta aku merapikannya.'; tidyAll(); return 'Siap, kubereskan semuanya satu per satu.'; }],
    [/\b(acak|kocok|shuffle)/, async () => { shuffleCats(); return 'Kuacak kartu kategorinya!'; }],
    [/\b(reset|hapus|bersihkan|batal).*(centang|ceklis|tips)|(centang|ceklis).*(reset|hapus|ulang)/, async () => { tipsAuto(false); return 'Oke, centang tips kuhapus.'; }],
    [/\b(centang|ceklis|tandai)/, async () => { tipsAuto(true); return 'Kucentang semua tips-nya ya.'; }],
    [/\b(musik|lagu|bgm)\b.*\b(mati|stop|off|diam|hentikan)|\b(matikan|stop|hentikan)\b.*\b(musik|lagu)/, async () => { if (A.on) A.toggle(); return 'Musiknya kumatikan.'; }],
    [/\b(musik|lagu|bgm)/, async () => { if (!A.on) A.toggle(); return 'Musik latar menyala. Tombol nada di navigasi untuk mematikannya.'; }],
    [/\b(matikan|mute|senyap).*(suara|sfx|bunyi)|\b(suara|sfx|bunyi).*(mati|off)/, async () => { const b = $('#soundToggle'); if (b && !(window.BSAudio && window.BSAudio.muted)) b.click(); return 'Suara situs kumatikan.'; }],
    [/\b(nyalakan|hidupkan|aktifkan).*(suara|sfx|bunyi)|\b(suara|sfx|bunyi).*(nyala|on)/, async () => { const b = $('#soundToggle'); if (b && window.BSAudio && window.BSAudio.muted) b.click(); return 'Suara situs menyala lagi.'; }],
    [/\b(ke|menuju|buka|antar|lihat|pergi|scroll)\b.*\b(top|beranda|atas|kenapa|tips|tutorial|video|hadiah|reward|kategori|jalur|faq|ambassador|daftar|syarat)\b/, async t => {
      const k = Object.keys(GOTO).find(w => new RegExp('\\b' + w + '\\b').test(t)), el = k && document.getElementById(GOTO[k]);
      if (!el) return 'Bagian itu belum ketemu.'; smoothTo(el); return `Meluncur ke bagian ${k}.`;
    }],
    [/\b(kontak|hubungi|wa|whatsapp|instagram|ig|tiktok|tt|facebook|fb|sosmed|media sosial)\b/, async () => ({ html: contactHTML() })],
    [/\b(lompat|loncat|jump)/, async () => { script(actJump); return 'Hup, lompat!'; }],
    [/\b(joget|dansa|menari|dance)/, async () => { if (RM) return 'Mode gerak dikurangi aktif, jadi aku diam saja ya.'; if (!A.playing) { A.on || A.toggle(); } setFace('happy', 3200); flag('is-dance', 3200); return 'Lihat gayaku!'; }],
    [/\b(tidur|ngantuk|zzz)/, async () => { K.openChat(false); sleepNow(); return 'Zzz...'; }],
    [/\b(lucu|lelucon|jokes?|lawak|candaan|hibur)/, async () => pickLine(L.jokes, 'joke')],
    [/\b(siapa|nama)\b.*\b(kamu|mu)\b|\bkamu siapa/, async () => `Aku ${CONFIG.name}, maskot ${CONFIG.brand}. Tugasku menemani, merapikan, dan sesekali bikin berantakan.`],
    [/\b(terima kasih|makasih|thanks|thx|trims)/, async () => { setFace('happy', 1200); return 'Sama-sama, kak! Senang bisa membantu.'; }],
    [/^(hai|halo|hi|hello|hey|p|oi)\b/, async () => { flag('is-wave', 1400); setFace('happy', 1200); return pickLine(L.greet, 'greetc'); }],
    [/\b(bantu|bantuan|help|menu|perintah|bisa apa)/, async () => 'Coba: rapikan, acak kategori, centang tips, ke hadiah, lompat, musik, kontak, atau lelucon. Kamu juga bisa seret tombol dan kartu di halaman.']
  ];
  async function respond(raw) {
    const t = norm(raw);
    for (const [re, fn] of COMMANDS) if (re.test(t)) return fn(t);
    return 'Hmm, aku belum paham. Ketik "bantuan" untuk melihat daftar perintah.';
  }
  function setInset() {
    S.bottomInset = S.chatOpen ? CH.el.offsetHeight + (innerWidth <= 640 ? 8 : 26) : 0;
  }
  function openChat(open) {
    if (open === S.chatOpen) return;
    S.chatOpen = open; CH.el.classList.toggle('open', open); CH.el.setAttribute('aria-hidden', String(!open));
    if (open) {
      A.sfx('chat'); setInset(); hideBubble();
      if (!CH.log.children.length) addMsg('b', esc(pickLine(L.greet, 'greetc')));
      if (matchMedia('(pointer:fine)').matches) setTimeout(() => CH.input.focus({ preventScroll: true }), 60);
    } else { S.bottomInset = 0; A.sfx('tick'); if (CH.el.contains(document.activeElement)) E.el.focus({ preventScroll: true }); }
  }
  K.openChat = openChat;
  function initChat() {
    const el = document.createElement('div'); el.className = 'mk-chat'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Obrolan dengan ' + CONFIG.name); el.setAttribute('aria-hidden', 'true');
    const chips = [['Rapikan', 'rapikan', 'spark'], ['Acak kategori', 'acak kategori', 'spin'], ['Centang tips', 'centang tips', 'check'], ['Ke hadiah', 'ke hadiah', 'gift'], ['Lompat', 'lompat', 'jump'], ['Musik', 'musik', 'note'], ['Kontak', 'kontak', 'phone'], ['Lelucon', 'lelucon', 'laugh'], ['Bantuan', 'bantuan', 'help']];
    el.innerHTML = `<button type="button" class="mk-x" aria-label="Tutup obrolan">${icon('close')}</button><div class="mk-log" aria-live="polite"></div><div class="mk-chips">${chips.map(c => `<button type="button" class="mk-chip" data-cmd="${c[1]}">${icon(c[2])}${c[0]}</button>`).join('')}</div><form class="mk-form" autocomplete="off"><input type="text" name="q" placeholder="Tulis perintah, misal: rapikan" aria-label="Pesan untuk ${CONFIG.name}" maxlength="80" enterkeyhint="send"><button type="submit" aria-label="Kirim">${icon('send')}</button></form>`;
    document.body.appendChild(el);
    CH.el = el; CH.log = $('.mk-log', el); CH.input = $('input', el);
    const run = async txt => {
      txt = txt.trim(); if (!txt) return;
      addMsg('u', esc(txt)); A.sfx('send'); CH.input.value = '';
      await wait(280);
      let r; try { r = await respond(txt); } catch (e) { r = 'Ups, ada yang error. Coba lagi ya.'; }
      const html = typeof r === 'string' ? esc(r) : r.html;
      addMsg('b', html); A.sfx('chat'); talkOnly(1200);
    };
    $('form', el).addEventListener('submit', e => { e.preventDefault(); run(CH.input.value); });
    el.addEventListener('click', e => {
      const c = e.target.closest('.mk-chip'); if (c) run(c.dataset.cmd);
      if (e.target.closest('.mk-x')) openChat(false);
    });
    el.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); openChat(false); } });
    addEventListener('keydown', e => { if (e.key === 'Escape' && S.chatOpen) openChat(false); });
    document.addEventListener('pointerdown', e => { if (S.chatOpen && !e.target.closest('.mk-chat, .mk') && !IT.cur) { /* biarkan terbuka agar tidak mengganggu */ } }, true);
    if (window.visualViewport) {
      const vv = visualViewport, fit = () => { el.style.bottom = Math.max(0, innerHeight - vv.height - vv.offsetTop) + 'px'; if (S.chatOpen) setInset(); };
      vv.addEventListener('resize', fit); vv.addEventListener('scroll', fit);
    }
    K.chat = CH; K.run = run;
  }

  /* ================= Tombol musik di navigasi ================= */
  function initMusicBtn() {
    const host = $('#soundToggle') ? $('#soundToggle').parentElement : $('.nav__actions');
    if (!host) return;
    const b = document.createElement('button'); b.type = 'button'; b.className = 'mk-music';
    b.setAttribute('aria-label', 'Musik latar'); b.setAttribute('title', 'Musik latar'); b.setAttribute('aria-pressed', String(A.on)); b.innerHTML = icon('note');
    b.addEventListener('click', e => {
      e.stopPropagation(); const on = A.toggle();
      say(on ? 'Musik latar menyala.' : 'Musiknya kumatikan.', 2000, 'note');
    });
    const t = $('#soundToggle'); if (t) host.insertBefore(b, t.nextSibling); else host.appendChild(b);
    A.sync();
  }

  /* ================= Mulai ================= */
  function init() {
    injectCSS(); $('#mk-css').textContent += CSS2;
    setSize(); build(); bindDrag(); bindItems(); initChat(); initMusicBtn(); initSections();
    blink(); requestAnimationFrame(loop);
    addEventListener('resize', () => {
      setSize(); if (S.chatOpen) setInset();
      M.x = clamp(M.x, minX(), maxX());
      if (M.state === 'idle' || M.state === 'sleep') M.y = Math.min(M.y, floor());
    });
    setTimeout(director, 4000);
    entrance().then(() => {
      if (M.state === 'hidden') return;
      setFace('happy', 1200); flag('is-wave', 1800);
      say(line('greet'), 4200, 'smile');
    });
    window.__kilau = {
      CONFIG, M, E, S, IT, A, K, say, tidyAll, shuffleCats, tipsAuto, respond, dizzy, sleepNow, wakeUp, floor, fall, setSize,
      get state() { return M.state; }, get ghosts() { return IT.list.length; }, get oscActive() { return A.active; }
    };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
