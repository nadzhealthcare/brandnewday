"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/* Doctor on Call — PPC landing page (Google Ads).

   A self-contained, single-purpose landing page for paid traffic. It renders
   outside the (main) route group so it carries none of the site chrome; every
   action stays on the page (in-page anchors, tel:, WhatsApp) — there are no
   links off to the rest of the site.

   The design is a standalone document with its own type scale and palette, so
   rather than fight it into the app's Tailwind system it ships as its own CSS
   block plus markup, and the three bits of behaviour (lead form → WhatsApp,
   FAQ accordion, team slider) are wired in React. The lead submit still fires
   the same generate_lead event the rest of the site uses, so Google Ads gets a
   conversion signal. Consultation fee is AED 249. */

const WA_NUMBER = "971521597336";

const CSS = `
:root{
  --maroon:#4A1C20; --maroon-dark:#2B1A17; --maroon-soft:#6E2A2F;
  --gold:#C6A15B; --gold-dark:#A9843B; --gold-soft:#EBDBBE;
  --cream:#FBF7F2; --cream-2:#F5ECE1; --card:#FFFFFF;
  --ink:#2B1A17; --muted:#7C6A62; --line:#EBDFD3;
  --wa:#25D366; --wa-dark:#128C7E; --star:#FBBC04;
  --radius:18px; --radius-sm:12px; --shadow:0 18px 50px -20px rgba(43,26,23,.35);
  --shadow-sm:0 8px 24px -12px rgba(43,26,23,.28);
  --maxw:1200px;
}
.ppc *{box-sizing:border-box;margin:0;padding:0}
.ppc{
  font-family:var(--font-inter),system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  color:var(--ink);background:var(--cream);line-height:1.6;-webkit-font-smoothing:antialiased;
  overflow-x:hidden;scroll-behavior:smooth;
}
.ppc h1,.ppc h2,.ppc h3{font-family:var(--font-mona),Georgia,'Times New Roman',serif;line-height:1.12;font-weight:600;letter-spacing:-.01em}
.ppc a:not(.btn){color:inherit}
.ppc a{text-decoration:none}
.ppc img{max-width:100%;display:block;height:auto}
.ppc h1,.ppc h2{text-wrap:balance}
.ppc p{text-wrap:pretty}
.ppc [id]{scroll-margin-top:88px}
.ppc a:focus-visible,.ppc button:focus-visible,.ppc input:focus-visible,.ppc select:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 22px}
.eyebrow{font-family:var(--font-inter),sans-serif;font-weight:700;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold-dark);display:inline-flex;align-items:center;gap:8px}
.eyebrow.light{color:var(--gold-soft)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;font-weight:700;font-size:1rem;padding:15px 26px;border-radius:999px;border:2px solid transparent;cursor:pointer;transition:.2s ease;font-family:inherit;white-space:nowrap;line-height:1.15;max-width:100%;text-align:center}
.btn svg{width:19px;height:19px;flex:none}
.btn-primary{background:var(--maroon);color:#fff;box-shadow:var(--shadow-sm)}
.btn-primary:hover{background:var(--maroon-soft);transform:translateY(-2px)}
.btn-gold{background:linear-gradient(180deg,#D4B06A,#B58A3C);color:#2B1A17;box-shadow:0 12px 26px -12px rgba(169,132,59,.7)}
.btn-gold:hover{filter:brightness(1.05);transform:translateY(-2px)}
.btn-wa{background:var(--wa);color:#fff}
.btn-wa:hover{background:var(--wa-dark);transform:translateY(-2px)}
.btn-ghost{background:transparent;color:var(--maroon);border-color:var(--line)}
.btn-ghost:hover{border-color:var(--maroon);background:#fff}
.btn-outline-light{background:rgba(255,255,255,.08);color:#fff;border-color:rgba(255,255,255,.4)}
.btn-outline-light:hover{background:rgba(255,255,255,.16)}
.btn.block{width:100%}
.topstrip{background:var(--maroon-dark);color:#F3E7D8;font-size:.82rem;font-weight:500;text-align:center;padding:9px 16px}
.topstrip b{color:var(--gold-soft);font-weight:700}
.topstrip .dot{opacity:.5;margin:0 9px}
.ppc header{position:sticky;top:0;z-index:50;background:rgba(251,247,242,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 22px;max-width:var(--maxw);margin:0 auto}
.brand img{height:38px;width:auto}
.nav-actions{display:flex;align-items:center;gap:12px}
.nav-phone{display:inline-flex;align-items:center;gap:9px;font-weight:700;color:var(--maroon)}
.nav-phone small{display:block;font-size:.66rem;font-weight:600;color:var(--muted);letter-spacing:.04em;text-transform:uppercase}
.nav-phone .ph-ic{width:38px;height:38px;border-radius:50%;background:var(--cream-2);display:grid;place-items:center;color:var(--maroon)}
.nav-phone .ph-ic svg{width:18px;height:18px}
.nav .btn{padding:11px 20px;font-size:.92rem}
.hero{position:relative;background:radial-gradient(1100px 520px at 82% -8%,rgba(198,161,91,.22),transparent 60%),radial-gradient(760px 520px at -6% 108%,rgba(110,42,47,.55),transparent 62%),linear-gradient(155deg,#4A1C20 0%,#3A1518 52%,#2B1A17 100%);color:#fff;overflow:hidden}
.hero::after{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:22px 22px;opacity:.5;pointer-events:none}
.hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:1.05fr .95fr;gap:52px;align-items:center;padding:56px 0 64px}
.hero h1{font-size:clamp(2.15rem,4.6vw,3.5rem);color:#fff;margin:16px 0 14px;font-weight:600}
.hero h1 .hl{color:var(--gold-soft);font-style:italic}
.hero .sub{font-size:1.1rem;color:#EBD9CB;max-width:34em;margin-bottom:22px}
.usp{list-style:none;display:grid;gap:11px;margin:0 0 26px}
.usp li{display:flex;align-items:flex-start;gap:11px;font-weight:500;color:#F4E7D9}
.usp .ck{width:24px;height:24px;border-radius:50%;background:rgba(198,161,91,.22);color:var(--gold-soft);display:grid;place-items:center;flex:none;margin-top:2px}
.usp .ck svg{width:14px;height:14px}
.hero-cta{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.hero-mini{display:flex;align-items:center;gap:16px;margin-top:22px;flex-wrap:wrap}
.hero-mini .m{display:flex;align-items:center;gap:9px;font-size:.86rem;color:#E7D6C8;font-weight:600}
.hero-mini .m svg{width:20px;height:20px;color:var(--gold-soft);flex:none}
.hero-mini .m b{color:var(--gold-soft)}
.greviews{display:inline-flex;align-items:center;gap:14px;background:#fff;color:var(--ink);padding:12px 18px;border-radius:14px;box-shadow:var(--shadow);margin-bottom:4px}
.greviews .g-left{display:flex;align-items:center;gap:10px}
.greviews .g-logo{width:26px;height:26px;flex:none}
.greviews .g-num{font-size:1.5rem;font-weight:800;line-height:1;font-family:var(--font-inter),sans-serif}
.greviews .stars{display:flex;gap:2px;margin:3px 0}
.greviews .stars svg{width:15px;height:15px;color:var(--star)}
.greviews .g-sub{font-size:.72rem;color:var(--muted);font-weight:600}
.greviews .g-divider{width:1px;height:40px;background:var(--line)}
.greviews .g-word{font-size:.74rem;font-weight:700;color:#5f6368;letter-spacing:.02em}
.formcard{background:#fff;border-radius:22px;box-shadow:var(--shadow);padding:26px 26px 24px;border:1px solid rgba(255,255,255,.6);position:relative}
.formcard .fc-flag{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(180deg,#D4B06A,#B58A3C);color:#2B1A17;font-size:.74rem;font-weight:800;padding:6px 16px;border-radius:999px;letter-spacing:.03em;box-shadow:0 8px 18px -8px rgba(169,132,59,.8);white-space:nowrap}
.formcard h3{font-size:1.4rem;color:var(--maroon);margin:8px 0 3px;text-align:center}
.formcard .fc-sub{text-align:center;color:var(--muted);font-size:.9rem;margin-bottom:18px}
.formcard .fc-price{text-align:center;margin:-6px 0 16px}
.formcard .fc-price span{display:inline-flex;align-items:center;gap:7px;background:var(--cream-2);color:var(--maroon);font-weight:800;font-size:.9rem;padding:7px 15px;border-radius:999px}
.field{margin-bottom:12px}
.field label{display:block;font-size:.78rem;font-weight:700;color:var(--ink);margin-bottom:5px}
.field input,.field select{width:100%;padding:13px 14px;border:1.5px solid var(--line);border-radius:12px;font-family:inherit;font-size:.98rem;color:var(--ink);background:var(--cream);transition:.15s}
.field input:focus,.field select:focus{outline:none;border-color:var(--gold);background:#fff;box-shadow:0 0 0 4px rgba(198,161,91,.15)}
.field.row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.fc-alt{display:flex;gap:10px;margin-top:12px}
.fc-alt .btn{flex:1;padding:13px 10px;font-size:.9rem}
.fc-note{text-align:center;font-size:.74rem;color:var(--muted);margin-top:13px;display:flex;align-items:center;justify-content:center;gap:6px}
.fc-note svg{width:14px;height:14px;color:var(--wa-dark)}
.form-success{display:none;text-align:center;padding:20px 6px}
.form-success .ok{width:64px;height:64px;border-radius:50%;background:#E7F7EE;color:var(--wa-dark);display:grid;place-items:center;margin:0 auto 14px}
.form-success .ok svg{width:32px;height:32px}
.form-success h3{color:var(--maroon)}
.trustbar{background:var(--maroon-dark);color:#F1E4D6}
.trustbar .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:18px 30px;padding:22px}
.trustbar .ti{display:flex;align-items:center;gap:12px;min-width:150px}
.trustbar .ti .n{font-size:1.55rem;font-weight:800;font-family:var(--font-inter),sans-serif;color:#fff;line-height:1}
.trustbar .ti .l{font-size:.78rem;color:#CDB9A9;font-weight:600}
.trustbar .ti .tic{width:42px;height:42px;border-radius:11px;background:rgba(198,161,91,.16);color:var(--gold-soft);display:grid;place-items:center;flex:none}
.trustbar .ti .tic svg{width:22px;height:22px}
.trustbar .award{display:flex;align-items:center;gap:10px}
.trustbar .award img{height:40px;width:auto;filter:drop-shadow(0 4px 8px rgba(0,0,0,.4))}
section.sec{padding:74px 0}
.sec-head{text-align:center;max-width:720px;margin:0 auto 44px}
.sec-head h2{font-size:clamp(1.8rem,3.4vw,2.6rem);color:var(--maroon);margin:12px 0 12px}
.sec-head p{color:var(--muted);font-size:1.05rem}
.benefits{background:#fff}
.bgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.bcard{background:var(--cream);border:1px solid var(--line);border-radius:var(--radius);padding:26px 22px;transition:.2s}
.bcard:hover{transform:translateY(-4px);box-shadow:var(--shadow-sm);border-color:var(--gold-soft)}
.bcard .ic{width:52px;height:52px;border-radius:14px;background:var(--maroon);color:var(--gold-soft);display:grid;place-items:center;margin-bottom:15px}
.bcard .ic svg{width:26px;height:26px}
.bcard h3{font-size:1.18rem;color:var(--maroon);margin-bottom:7px}
.bcard p{color:var(--muted);font-size:.94rem}
.split{background:var(--cream)}
.split .wrap{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center}
.split-img{position:relative}
.split-img img{width:100%;border-radius:22px;box-shadow:var(--shadow);object-fit:cover;aspect-ratio:5/6}
.split-img .floatstat{position:absolute;right:-16px;bottom:-18px;background:#fff;border-radius:16px;box-shadow:var(--shadow);padding:16px 20px;display:flex;align-items:center;gap:13px;border:1px solid var(--line)}
.split-img .floatstat .n{font-size:1.5rem;font-weight:800;font-family:var(--font-inter),sans-serif;color:var(--maroon);line-height:1}
.split-img .floatstat .l{font-size:.76rem;color:var(--muted);font-weight:600}
.split-img .floatstat .fic{width:44px;height:44px;border-radius:12px;background:var(--cream-2);color:var(--maroon);display:grid;place-items:center;flex:none}
.split-img .floatstat .fic svg{width:23px;height:23px}
.split-list{list-style:none;display:grid;gap:16px;margin-top:8px}
.split-list li{display:flex;gap:13px}
.split-list .ck{width:28px;height:28px;border-radius:50%;background:var(--gold-soft);color:var(--maroon-dark);display:grid;place-items:center;flex:none}
.split-list .ck svg{width:16px;height:16px}
.split-list h4{font-size:1.02rem;color:var(--ink);font-family:var(--font-inter),sans-serif;font-weight:700;margin-bottom:2px}
.split-list p{color:var(--muted);font-size:.92rem}
.services{background:#fff}
.sgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.scard{border:1px solid var(--line);border-radius:var(--radius);padding:24px 20px;background:var(--cream);position:relative;overflow:hidden;transition:.2s}
.scard:hover{transform:translateY(-4px);box-shadow:var(--shadow-sm);background:#fff;border-color:var(--gold)}
.scard .ic{width:50px;height:50px;border-radius:13px;background:linear-gradient(160deg,#6E2A2F,#4A1C20);color:var(--gold-soft);display:grid;place-items:center;margin-bottom:14px}
.scard .ic svg{width:26px;height:26px}
.scard h3{font-size:1.08rem;color:var(--maroon);margin-bottom:6px}
.scard p{color:var(--muted);font-size:.9rem}
.how{background:linear-gradient(160deg,#4A1C20,#2B1A17);color:#fff;position:relative;overflow:hidden}
.how::before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:24px 24px;opacity:.4}
.how .sec-head h2{color:#fff}
.how .sec-head p{color:#D9C6B7}
.steps{position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.step{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:var(--radius);padding:30px 24px;text-align:center;backdrop-filter:blur(4px)}
.step .num{width:54px;height:54px;border-radius:50%;background:linear-gradient(180deg,#D4B06A,#B58A3C);color:#2B1A17;font-family:var(--font-mona),serif;font-weight:700;font-size:1.5rem;display:grid;place-items:center;margin:0 auto 16px}
.step h3{color:#fff;font-size:1.22rem;margin-bottom:8px}
.step p{color:#D9C6B7;font-size:.94rem}
.how-cta{position:relative;z-index:2;text-align:center;margin-top:40px}
.team{background:var(--cream)}
.reviews{background:#fff}
.rev-top{display:flex;align-items:center;justify-content:center;gap:16px;margin:0 auto 8px;flex-wrap:wrap}
.rev-top .g-logo{width:36px;height:36px}
.rev-top .score{font-size:2.2rem;font-weight:800;font-family:var(--font-inter),sans-serif;color:var(--ink);line-height:1}
.rev-top .stars{display:flex;gap:3px}
.rev-top .stars svg{width:22px;height:22px;color:var(--star)}
.rgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:8px}
.rcard{background:var(--cream);border:1px solid var(--line);border-radius:var(--radius);padding:24px 22px;display:flex;flex-direction:column;gap:12px}
.rcard .rstars{display:flex;gap:2px}
.rcard .rstars svg{width:16px;height:16px;color:var(--star)}
.rcard .rtext{color:#4a3d37;font-size:.96rem;flex:1}
.rcard .rfoot{display:flex;align-items:center;gap:12px;padding-top:6px;border-top:1px solid var(--line)}
.rcard .av{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:700;font-size:1rem;flex:none;font-family:var(--font-inter),sans-serif}
.rcard .rname{font-weight:700;font-size:.92rem;color:var(--ink)}
.rcard .rtag{font-size:.74rem;color:var(--muted);display:flex;align-items:center;gap:5px}
.rcard .rtag svg{width:13px;height:13px;color:#4285F4}
.rcard .gmark{margin-left:auto;width:22px;height:22px;opacity:.9}
.rev-cta{text-align:center;margin-top:36px}
.faq{background:var(--cream)}
.faq-list{max-width:820px;margin:0 auto;display:grid;gap:12px}
.faq-item{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden}
.faq-q{width:100%;text-align:left;background:none;border:none;padding:19px 22px;font-family:inherit;font-size:1.02rem;font-weight:700;color:var(--maroon);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px}
.faq-q .chev{width:22px;height:22px;flex:none;transition:.25s;color:var(--gold-dark)}
.faq-item.open .chev{transform:rotate(180deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .3s ease;color:var(--muted);font-size:.96rem}
.faq-a div{padding:0 22px 20px}
.finalcta{background:linear-gradient(150deg,#6E2A2F,#4A1C20 55%,#2B1A17);color:#fff;text-align:center;position:relative;overflow:hidden}
.finalcta::after{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:22px 22px;opacity:.5}
.finalcta .wrap{position:relative;z-index:2}
.finalcta h2{font-size:clamp(1.9rem,3.6vw,2.8rem);color:#fff;margin-bottom:14px}
.finalcta p{color:#E7D6C8;font-size:1.1rem;max-width:36em;margin:0 auto 28px}
.finalcta .btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.ppc footer{background:var(--maroon-dark);color:#CDB9A9;padding:56px 0 30px}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1.3fr;gap:36px;padding-bottom:34px;border-bottom:1px solid rgba(255,255,255,.1)}
.ppc footer .brand img{height:40px;margin-bottom:16px}
.ppc footer p{font-size:.92rem;color:#C3AF9F;max-width:30em}
.ppc footer h4{color:#fff;font-family:var(--font-inter),sans-serif;font-size:.82rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:16px;font-weight:700}
.foot-c{display:flex;flex-direction:column;gap:12px}
.foot-c a,.foot-c div{display:flex;align-items:flex-start;gap:11px;font-size:.92rem;color:#D4C1B2}
.foot-c a:hover{color:#fff}
.foot-c svg{width:18px;height:18px;color:var(--gold);flex:none;margin-top:2px}
.foot-bottom{padding-top:22px;display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;font-size:.8rem;color:#9E8A7B}
.foot-bottom .lic{color:var(--gold-soft)}
.mobile-cta{position:fixed;bottom:0;left:0;right:0;z-index:60;display:none;background:#fff;border-top:1px solid var(--line);box-shadow:0 -8px 24px -12px rgba(43,26,23,.3);padding:9px 10px;gap:8px}
.mobile-cta a{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:8px 4px;border-radius:12px;font-size:.72rem;font-weight:700}
.mobile-cta svg{width:20px;height:20px}
.mobile-cta .m-call{background:var(--cream-2);color:var(--maroon)}
.mobile-cta .m-wa{background:var(--wa);color:#fff}
.mobile-cta .m-book{background:var(--maroon);color:#fff}
.staffgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.gallery figure{margin:0;position:relative;border-radius:18px;overflow:hidden;box-shadow:var(--shadow-sm);aspect-ratio:4/3}
.gallery img{width:100%;height:100%;object-fit:cover;transition:.5s ease}
.gallery figure:hover img{transform:scale(1.06)}
.gallery figcaption{position:absolute;left:0;right:0;bottom:0;padding:30px 16px 15px;color:#fff;font-weight:700;font-size:.95rem;background:linear-gradient(transparent,rgba(43,26,23,.9))}
.team-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:26px}
.team-head-txt{max-width:640px}
.team-head .eyebrow{margin-bottom:12px;display:inline-flex}
.team-head h2{font-size:clamp(1.8rem,3.4vw,2.6rem);color:var(--maroon);margin:0 0 10px}
.team-head p{color:var(--muted);font-size:1.02rem}
.slider-nav{display:flex;gap:10px;flex:none}
.sld-btn{width:50px;height:50px;border-radius:50%;border:1.5px solid var(--line);background:#fff;color:var(--maroon);cursor:pointer;display:grid;place-items:center;transition:.2s}
.sld-btn svg{width:20px;height:20px}
.sld-btn:hover{background:var(--maroon);color:#fff;border-color:var(--maroon)}
.sld-btn:disabled{opacity:.35;cursor:default;background:#fff;color:var(--maroon);border-color:var(--line)}
.slider{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:4px 2px 6px;scrollbar-width:none;-ms-overflow-style:none}
.slider::-webkit-scrollbar{display:none}
.slide{flex:0 0 278px;max-width:278px;scroll-snap-align:start;background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden;box-shadow:var(--shadow-sm);transition:.2s;display:flex;flex-direction:column}
.slide:hover{box-shadow:var(--shadow);transform:translateY(-3px)}
.slide .tphoto{position:relative;aspect-ratio:1/1.12;overflow:hidden;background:linear-gradient(160deg,#F2AF74,#DE7C3C)}
.slide .tphoto img{width:100%;height:100%;object-fit:cover;object-position:top center}
.badge-yrs{position:absolute;top:12px;right:12px;background:#fff;color:var(--ink);font-size:.75rem;font-weight:700;padding:6px 11px;border-radius:999px;display:inline-flex;align-items:center;gap:5px;box-shadow:0 6px 16px -8px rgba(43,26,23,.5)}
.badge-yrs svg{width:13px;height:13px;color:var(--gold-dark)}
.badge-feat{position:absolute;top:12px;left:12px;background:var(--maroon);color:#fff;font-size:.72rem;font-weight:700;padding:6px 12px;border-radius:999px;box-shadow:0 6px 16px -8px rgba(43,26,23,.6)}
.slide .tinfo{padding:16px 18px 18px;flex:1}
.slide .tinfo h4{font-family:var(--font-mona),Georgia,serif;font-size:1.14rem;color:var(--maroon);margin:0 0 5px;font-weight:600;line-height:1.16;min-height:2.3em}
.slide .trole{font-size:.85rem;color:var(--muted);font-weight:600;padding-bottom:12px;border-bottom:1px solid var(--line);margin-bottom:12px}
.slide .tlang{display:flex;align-items:flex-start;gap:8px;font-size:.8rem;color:var(--gold-dark);font-weight:600;line-height:1.35}
.slide .tlang svg{width:15px;height:15px;flex:none;margin-top:1px}
.slider-progress{position:relative;height:4px;background:var(--line);border-radius:999px;margin-top:16px;overflow:hidden}
.slider-bar{position:absolute;top:0;left:0;height:100%;width:24%;background:var(--maroon);border-radius:999px;transition:left .2s ease,width .2s ease}
@media(max-width:1120px){.sgrid{grid-template-columns:repeat(3,1fr)}.hero-grid{gap:38px}}
@media(max-width:960px){.hero-grid{grid-template-columns:1fr;gap:28px;padding:36px 0 44px}.hero h1{font-size:clamp(2rem,6vw,2.9rem)}.bgrid{grid-template-columns:repeat(2,1fr)}.sgrid{grid-template-columns:repeat(2,1fr)}.steps{grid-template-columns:1fr}.rgrid{grid-template-columns:repeat(2,1fr)}.split .wrap{grid-template-columns:1fr;gap:50px}.foot-grid{grid-template-columns:1fr;gap:28px}.nav-phone .txt{display:none}.split-img{max-width:440px;margin:0 auto}.staffgrid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:760px){section.sec{padding:56px 0}.trustbar .wrap{gap:16px 22px}.trustbar .ti{min-width:44%}.rev-top .score{font-size:1.9rem}}
@media(max-width:640px){.wrap{padding:0 16px}section.sec{padding:48px 0}.sec-head{margin-bottom:34px}.btn{white-space:normal}.nav .btn.book-top{display:none}.bgrid,.sgrid,.rgrid{grid-template-columns:1fr}.greviews{width:100%;justify-content:flex-start}.hero-cta{gap:10px}.hero-cta .btn{flex:1 1 auto}.fc-alt{flex-direction:column}.mobile-cta{display:flex}.ppc{padding-bottom:76px}.topstrip .hide-sm{display:none}.foot-bottom{flex-direction:column}.formcard{padding:24px 18px 22px}.split-img{max-width:100%}.trustbar .award{width:100%}.staffgrid{grid-template-columns:repeat(2,1fr)}.gallery{grid-template-columns:1fr}.team-head{flex-direction:column;align-items:flex-start;gap:16px}.slide{flex-basis:80vw;max-width:80vw}}
@media(max-width:400px){.hero h1{font-size:1.72rem}.btn{padding:14px 18px;font-size:.95rem}.sec-head h2{font-size:1.5rem}.mobile-cta a{font-size:.68rem}.step,.bcard,.scard{padding:22px 18px}}

/* ---------- Hero redesign: full-bleed doc.webp + glassmorphism form ---------- */
.hero{position:relative;min-height:100vh;color:#fff;overflow:hidden;display:flex;background:#2B1A17 url('/assets/doc.webp') center/cover no-repeat}
.hero::after{display:none}
.hero-scrim{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(26,9,12,.94) 0%,rgba(26,9,12,.74) 40%,rgba(26,9,12,.40) 100%),linear-gradient(0deg,rgba(18,7,9,.82) 0%,transparent 42%)}
.hero-inner{position:relative;z-index:2;width:100%;max-width:var(--maxw);margin:0 auto;padding:18px 22px 46px;display:flex;flex-direction:column;min-height:100vh}
.hero-nav{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:11px 12px 11px 20px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(12px)}
.hero-nav .brand img{height:32px;width:auto;display:block}
.hero-nav-right{display:flex;align-items:center;gap:14px}
.hero-phone{display:inline-flex;align-items:center;gap:10px;color:#fff;font-weight:700}
.hero-phone small{display:block;font-size:.62rem;font-weight:600;color:rgba(255,255,255,.6);letter-spacing:.05em;text-transform:uppercase}
.hero-phone .ph-ic{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.12);display:grid;place-items:center;color:var(--gold-soft)}
.hero-phone .ph-ic svg{width:17px;height:17px}
.btn-book{background:#fff;color:var(--maroon-dark);padding:11px 22px;font-size:.92rem;border:none}
.btn-book:hover{background:#fff;transform:translateY(-2px);filter:brightness(.97)}
.hero-grid{flex:1;display:grid;grid-template-columns:1.05fr minmax(0,430px);gap:46px;align-items:center;padding:34px 0;position:static}
.hero-copy{max-width:660px}
.hero-rate{display:inline-flex;align-items:center;gap:8px;font-size:.82rem;font-weight:600;color:#F4E7D9;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(8px);padding:7px 15px;border-radius:999px;margin-bottom:20px}
.hero-rate svg{width:17px;height:17px}
/* floating WhatsApp + Call buttons, bottom-right (desktop; mobile uses the sticky bar) */
.fab{position:fixed;right:20px;bottom:24px;z-index:70;display:flex;flex-direction:column;gap:12px}
.fab-btn{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;color:#fff;box-shadow:0 14px 30px -8px rgba(0,0,0,.5);transition:transform .2s ease,filter .2s ease}
.fab-btn svg{width:26px;height:26px}
.fab-btn:hover{transform:translateY(-3px);filter:brightness(1.05)}
.fab-wa{background:var(--wa)}
.fab-call{background:linear-gradient(180deg,#D4B06A,#B58A3C);color:#2B1A17}
@media(max-width:640px){.fab{display:none}}
.hero-rate b{color:#fff;font-weight:800}
.hero-eyebrow{display:block;font-size:.74rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold-soft);margin-bottom:12px}
.hero h1{font-size:clamp(2rem,4.3vw,3.3rem);line-height:1.06;margin:0 0 16px;font-weight:600;color:#fff;text-transform:uppercase;font-stretch:125%;letter-spacing:-.005em}
.hero h1 i{font-style:italic;color:var(--gold-soft)}
.hero .sub{font-size:1.05rem;color:#EAD9CC;max-width:33em;margin-bottom:22px}
.hero .usp{margin:0 0 24px}
.hero-feats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px 24px;max-width:540px;margin:4px 0 4px}
.hero-feats .feat{display:flex;align-items:center;gap:12px}
.hero-feats .fi{width:44px;height:44px;border-radius:12px;background:rgba(198,161,91,.16);border:1px solid rgba(255,255,255,.12);display:grid;place-items:center;color:var(--gold-soft);flex:none}
.hero-feats .fi svg{width:22px;height:22px}
.hero-feats b{display:block;font-size:1rem;color:#fff;font-weight:700;line-height:1.15}
.hero-feats .feat>div>span{font-size:.8rem;color:rgba(255,255,255,.62)}
@media(max-width:640px){
  .hero-feats{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 12px}
  .hero-feats .feat{gap:9px}
  .hero-feats .fi{width:38px;height:38px;border-radius:11px}
  .hero-feats .fi svg{width:19px;height:19px}
  .hero-feats b{font-size:.85rem}
  .hero-feats .feat>div>span{font-size:.72rem}
}
.hero-cta{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:26px}
.hero-cta .btn-gold svg{width:16px;height:16px}
.hero-tags{display:flex;flex-wrap:wrap;align-items:center;gap:10px}
.hero-tags-lbl{font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5)}
.hero-tags .tag{display:inline-flex;align-items:center;gap:8px;font-size:.82rem;font-weight:600;color:#F4E7D9;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(8px);padding:8px 14px;border-radius:999px}
.hero-tags .tag svg{width:15px;height:15px;color:var(--gold-soft);flex:none}
/* glassmorphism form */
.formcard.glass{background:rgba(26,10,13,.5);backdrop-filter:blur(26px) saturate(1.25);border:1px solid rgba(255,255,255,.18);box-shadow:0 30px 80px -28px rgba(0,0,0,.75);color:#fff}
.formcard.glass h3{color:#fff}
.formcard.glass .fc-sub{color:rgba(255,255,255,.72)}
.formcard.glass .fc-price span{background:rgba(198,161,91,.16);color:var(--gold-soft)}
.formcard.glass .field label{color:rgba(255,255,255,.85)}
.formcard.glass .field input,.formcard.glass .field select{background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.2);color:#fff}
.formcard.glass .field input::placeholder{color:rgba(255,255,255,.5)}
.formcard.glass .field select option{color:#1c1c1c}
.formcard.glass .field input:focus,.formcard.glass .field select:focus{border-color:var(--gold);background:rgba(255,255,255,.14);box-shadow:0 0 0 4px rgba(198,161,91,.2)}
.formcard.glass .btn-ghost{color:#fff;border-color:rgba(255,255,255,.4)}
.formcard.glass .btn-ghost:hover{background:rgba(255,255,255,.1);border-color:#fff}
.formcard.glass .fc-note{color:rgba(255,255,255,.6)}
.formcard.glass .fc-note svg{color:var(--wa)}
.formcard.glass .form-success h3{color:#fff}
.formcard.glass .form-success p{color:rgba(255,255,255,.72) !important}
@media(max-width:960px){
  .hero{min-height:auto}
  .hero-inner{min-height:auto;padding-bottom:34px}
  .hero-grid{grid-template-columns:1fr;gap:30px;padding:28px 0}
  .hero-copy{max-width:none}
  .hero h1{font-size:clamp(2rem,7vw,2.8rem)}
  .hero-phone .txt{display:none}
}
@media(max-width:640px){
  .hero{background-image:url('/assets/doc-mob.webp')}
  .hero-scrim{background:linear-gradient(180deg,rgba(22,8,11,.6) 0%,rgba(22,8,11,.36) 38%,rgba(22,8,11,.85) 100%)}
  .hero-nav{padding:8px 10px 8px 14px}
  .hero-nav .brand img{height:27px}
  .btn-book{padding:10px 16px;font-size:.85rem}
  .hero-cta .btn{flex:1 1 auto}
  .hero-rate{font-size:.76rem}
  .hero h1{font-size:clamp(1.7rem,6.2vw,2.45rem)}
}
`;

const G = `<svg class="g-logo" viewBox="0 0 48 48"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>`;
const STAR = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
const STARS5 = STAR.repeat(5);
const WA_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49a9.53 9.53 0 0 0 3.52.81c.54-.05 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z"/></svg>`;
const PHONE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
const CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
const SHIELD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`;
const CLOCK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const HOME = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
const USERS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
const GLOBE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
const RECEIPT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>`;
const WA = `https://wa.me/${WA_NUMBER}?text=Hi%20NADZ%20Healthcare%2C%20I%27d%20like%20to%20request%20a%20home%20doctor%20visit.`;

const CONDITIONS = [
  [`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>`, "Fever, flu & infections", "High temperature, flu, throat, ear and chest infections - assessed and treated on the spot."],
  [`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.6 4.6A2 2 0 1 1 11 8H2M12.6 11.4A2 2 0 1 0 14 15H2M17.7 7.7A2.5 2.5 0 1 1 19.5 12H2"/></svg>`, "Cough, cold & respiratory", "Coughs, sinus, congestion and breathing complaints - assessed and treated at home."],
  [`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 13c1.5 1.6 6.5 1.6 8 0"/></svg>`, "Stomach & digestive issues", "Food poisoning, gastroenteritis, vomiting, diarrhoea and abdominal pain."],
  [`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/></svg>`, "Rehydration & fluids", "Doctor-assessed fluids and rehydration for fever, vomiting and dehydration - given by a licensed clinician at home."],
  [`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/></svg>`, "Minor injuries, cuts & burns", "Wound cleaning and dressing, sprains, minor burns and allergic reactions."],
  [`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 21v-1a6 6 0 0 1 12 0v1"/></svg>`, "Children & family care", "Gentle, expert care for children's fevers, infections and everyday illnesses."],
  [`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`, "Chronic condition care", "Diabetes, blood pressure and thyroid reviews, with ongoing monitoring at home."],
  [`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>`, "Sick notes & home labs", "Medical certificates (sick notes) and home lab tests arranged in a single visit."],
]
  .map(
    ([ic, h, p]) =>
      `<div class="scard"><div class="ic">${ic}</div><h3>${h}</h3><p>${p}</p></div>`,
  )
  .join("");

const REVIEWS = [
  ["VR", "#8E24AA", "VAVA Refurbished", "Amazed by Dr. Jerusalem and her team - they took our baby's illness very seriously and kept us reassured the whole way through. Truly caring doctors."],
  ["PP", "#5E35B1", "Precious Piyoure", "The same-day home visit from NADZ saved my day. Immediate relief and such attentive, professional care from the doctor."],
  ["PD", "#C0392B", "Priya Dhas", "Had a great experience with NADZ - booked a home doctor visit and it was seamless. On time, professional and genuinely caring from start to finish."],
  ["HA", "#6D4C41", "Harriet Adomah", "Their team reached me within 20 minutes for a home visit. Incredibly fast, friendly and professional - exactly what you want when you're unwell."],
  ["RF", "#00897B", "Ruwan Ranjith Fernando", "Overall the service was superb. The contact person was very supportive and the medical staff were very professional and kind. Highly recommend."],
  ["AK", "#1E88E5", "Anastasia K.", "A big thank you to the NADZ team - they came to me at 9pm even after their shift and went above and beyond. Genuinely grateful."],
]
  .map(
    ([av, bg, name, text]) =>
      `<div class="rcard"><div class="rstars">${STARS5}</div><p class="rtext">"${text}"</p><div class="rfoot"><span class="av" style="background:${bg}">${av}</span><div><div class="rname">${name}</div><div class="rtag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Verified patient</div></div>${G.replace("g-logo", "gmark")}</div></div>`,
  )
  .join("");

const TEAM = [
  ["drnadia.jpg", "Dr. Nadia Choudhry", "GP & Co-Founder", "13 years", "English, Arabic, Urdu, Hindi, Punjabi", true],
  ["dravinash.jpg", "Dr. Avinash Babu", "General Practitioner", "5 years", "English, Tamil, Telugu, Russian", false],
  ["drdianne.jpg", "Dr. Dianne Jokene", "Osteopathic Practitioner", "15 years", "English", false],
  ["drmuhammad.jpg", "Dr. Muhammad Ahsaan Akhtar", "Physiotherapist", "5 years", "English, Urdu, Hindi, Punjabi", false],
  ["drnada.jpg", "Dr. Nada Thakur", "Physiotherapist", "5 years", "English, Hindi", false],
  ["chandra.jpg", "Chandra KC", "Registered Nurse", "3 years", "English, Nepali, Hindi", false],
  ["roja.jpg", "Roja Devi Ningthoujam", "Registered Nurse", "4 years", "English, Hindi", false],
  ["anjana.jpg", "Anjana Ghale", "Registered Nurse", "7 years", "English, Hindi, Nepali", false],
  ["bincy.jpg", "Bincy Eldhose", "Registered Nurse", "3 years", "English, Tamil, Malayalam", false],
  ["kajal.jpg", "Kajal Andriya", "Assistant Nurse", "3 years", "English, Hindi, Malayalam", false],
  ["desire.jpg", "Desire Mendoza", "Caregiver", "8 years", "English, Arabic, Tagalog", false],
  ["zainabu.jpg", "Zainabu Ibrahim", "Caregiver", "9 years", "English, Arabic, TWI", false],
]
  .map(
    ([img, name, role, yrs, langs, feat]) =>
      `<div class="slide"><div class="tphoto">${feat ? '<span class="badge-feat">Featured</span>' : ""}<span class="badge-yrs">${STAR} ${yrs}</span><img src="/assets/${img}" alt="${name}, ${role} at NADZ Healthcare" loading="lazy" /></div><div class="tinfo"><h4>${name}</h4><div class="trole">${role}</div><div class="tlang">${GLOBE}<span>${langs}</span></div></div></div>`,
  )
  .join("");

const FAQS = [
  ["Which areas do you cover?", "We provide doctor home visits across Dubai and nearby areas - with an average arrival time of around 30 minutes in Dubai. Wherever you are, call or WhatsApp us and we'll confirm availability at your location."],
  ["How much is a consultation?", "A doctor home-visit consultation is AED 249, which covers the visit, a full examination and the doctor's advice. Any medication, lab tests or procedures are quoted transparently before they're carried out."],
  ["How quickly can a doctor reach me?", "We offer same-day visits, 24/7 - including evenings and weekends. In many cases a DHA-licensed doctor can be with you within about 30 minutes."],
  ["Are your doctors licensed?", "Yes. Every doctor is a DHA-licensed GP. NADZ Healthcare is a licensed home-healthcare provider (Ministry of Health License No: P4DWL25W-100725) and was named Best Home Healthcare at the Health Magazine Awards 2025."],
  ["What can a doctor treat at home?", "Fevers and infections, coughs and colds, stomach and digestive issues, rehydration for illness, minor injuries and burns, children's illnesses, chronic condition reviews, plus sick notes and home lab tests - all in one visit."],
  ["Can the doctor treat me and give a sick note?", "Yes. Our DHA-licensed doctors examine and treat you in person at home, issue medical certificates (sick notes) and can coordinate home lab tests when needed."],
  ["Is this for medical emergencies?", "Doctor on Call is for urgent but non-life-threatening care. For emergencies - chest pain, difficulty breathing, signs of a stroke, severe bleeding or loss of consciousness - please call 998 or 999 immediately."],
  ["Do the doctors visit in person, or is this an online service?", "Every NADZ visit is fully in person. A DHA-licensed doctor travels to your home, office or hotel to examine and care for you face to face - this is a home-visit service, not an online or phone consultation."],
]
  .map(
    ([q, a]) =>
      `<div class="faq-item"><button class="faq-q" type="button">${q}<span class="chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span></button><div class="faq-a"><div>${a}</div></div></div>`,
  )
  .join("");

const HTML = `
<section class="hero" id="top">
  <div class="hero-scrim"></div>
  <div class="hero-inner">
    <nav class="hero-nav">
      <a class="brand" href="#top" aria-label="NADZ Healthcare"><img src="/assets/logo-nadz.svg" alt="NADZ Healthcare" /></a>
      <div class="hero-nav-right">
        <a class="hero-phone" href="tel:80046239"><span class="ph-ic">${PHONE_ICON}</span><span class="txt"><small>24/7 Hotline</small><span>800 4 NADZ</span></span></a>
        <a class="btn btn-book" href="#book">Book a Visit</a>
      </div>
    </nav>
    <div class="hero-grid">
      <div class="hero-copy">
        <span class="hero-rate">${G}<b>5.0</b> · Trusted by 10,000+ patients</span>
        <span class="hero-eyebrow">Doctor on Call · Dubai</span>
        <h1>See a Doctor <i>Wherever You Are</i> - Home, Office or Hotel</h1>
        <p class="sub">Real, in-person care across Dubai and nearby areas - no clinic queues, no ER waits.</p>
        <div class="hero-feats">
          <div class="feat"><span class="fi">${SHIELD}</span><div><b>DHA-licensed</b><span>doctors &amp; nurses</span></div></div>
          <div class="feat"><span class="fi">${CLOCK}</span><div><b>30 min · 24/7</b><span>day, night &amp; weekends</span></div></div>
          <div class="feat"><span class="fi">${RECEIPT}</span><div><b>Flat AED 249</b><span>per consultation</span></div></div>
          <div class="feat"><span class="fi">${HOME}</span><div><b>Home · office · hotel</b><span>we come to you</span></div></div>
        </div>
      </div>

      <div class="order-form" id="book">
        <form class="formcard glass" id="leadForm" novalidate>
          <span class="fc-flag">&#9889; A doctor can reach you in 30 min</span>
          <div id="formFields">
            <h3>Request a Doctor Visit</h3>
            <p class="fc-sub">Home, office or hotel - free callback within minutes. No obligation.</p>
            <div class="field"><label for="name">Full name</label><input id="name" name="name" type="text" placeholder="e.g. Sara Ahmed" required autocomplete="name" /></div>
            <div class="field"><label for="phone">Phone / WhatsApp number</label><input id="phone" name="phone" type="tel" placeholder="+971 5X XXX XXXX" required autocomplete="tel" inputmode="tel" /></div>
            <div class="field"><label for="service">What do you need help with?</label>
              <select id="service" name="service" required>
                <option value="" disabled selected>Select a reason</option>
                <option>Fever, flu or infection</option>
                <option>Stomach or digestive issue</option>
                <option>Dehydration / need fluids</option>
                <option>Child or family illness</option>
                <option>Minor injury, cut or burn</option>
                <option>Chronic condition (diabetes / BP / thyroid)</option>
                <option>Sick note or lab test</option>
                <option>General consultation / not sure yet</option>
              </select>
            </div>
            <div class="field"><label for="time">Preferred time</label>
              <select id="time" name="time" required>
                <option value="" disabled selected>Select preferred time</option>
                <option>As soon as possible</option>
                <option>Today</option>
                <option>This evening</option>
                <option>Tomorrow</option>
                <option>This week / weekend</option>
              </select>
            </div>
            <button type="submit" class="btn btn-gold block" style="margin-top:6px">Request a Free Callback</button>
            <div class="fc-alt">
              <a class="btn btn-wa" href="${WA}" target="_blank" rel="noopener">${WA_ICON} WhatsApp</a>
              <a class="btn btn-ghost" href="tel:80046239">${PHONE_ICON} Call</a>
            </div>
            <div class="fc-note">${SHIELD}Your details are private &amp; only used to arrange your visit.</div>
          </div>
          <div class="form-success" id="formSuccess">
            <div class="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
            <h3>Thank you!</h3>
            <p style="color:var(--muted);margin:8px 0 16px">We've opened WhatsApp with your details so our team can confirm your doctor visit right away. Prefer a call?</p>
            <a class="btn btn-primary" href="tel:80046239">Call 800 4 NADZ</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<div class="trustbar">
  <div class="wrap">
    <div class="ti"><span class="tic">${SHIELD}</span><div><div class="n">DHA</div><div class="l">Licensed doctors</div></div></div>
    <div class="ti"><span class="tic">${CLOCK}</span><div><div class="n">30 min</div><div class="l">Average arrival time</div></div></div>
    <div class="ti"><span class="tic">${RECEIPT}</span><div><div class="n">AED 249</div><div class="l">Flat consultation fee</div></div></div>
    <div class="ti"><span class="tic">${USERS}</span><div><div class="n">10,000+</div><div class="l">Patients cared for</div></div></div>
    <div class="award"><img src="/assets/best-award.png" alt="Best Home Healthcare Award 2025" /><div><div class="n" style="font-size:.98rem">Best Home Healthcare</div><div class="l">Health Magazine Awards 2025</div></div></div>
  </div>
</div>

<section class="sec services" id="services">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow">What we treat</span><h2>One doctor visit for the whole family's everyday health</h2><p>From sudden fevers to routine check-ups, our DHA-licensed doctors diagnose and treat it at your home, office or hotel.</p></div>
    <div class="sgrid">${CONDITIONS}</div>
    <div style="text-align:center;margin-top:38px"><a class="btn btn-gold" href="#book">Not sure what you need? Get a free callback</a></div>
  </div>
</section>

<section class="sec split">
  <div class="wrap">
    <div class="split-img">
      <img src="/assets/doc-car.jpg" alt="NADZ Healthcare doctor arriving for a home visit" loading="lazy" />
      <div class="floatstat"><span class="fic">${CLOCK}</span><div><div class="n">24/7</div><div class="l">A doctor whenever<br/>you need one</div></div></div>
    </div>
    <div>
      <span class="eyebrow">Why a doctor at your door</span>
      <h2 style="font-size:clamp(1.7rem,3.2vw,2.4rem);color:var(--maroon);margin:12px 0 16px">Skip the clinic queue and the ER wait</h2>
      <p style="color:var(--muted);margin-bottom:8px">When you're unwell, the last thing you need is traffic and a crowded waiting room. Our doctors bring the clinic to you - with the time to actually listen, examine and treat.</p>
      <ul class="split-list">
        <li><span class="ck">${CHECK}</span><div><h4>A complete consultation, not a rushed house call</h4><p>Real time to examine, diagnose and explain your treatment - never a five-minute rush.</p></div></li>
        <li><span class="ck">${CHECK}</span><div><h4>Care wherever you are</h4><p>At home, at the office or at your hotel - comfortable, private and convenient across the UAE.</p></div></li>
        <li><span class="ck">${CHECK}</span><div><h4>Affordable, transparent care</h4><p>A flat AED 249 consultation with the examination and advice included - real value, no surprises.</p></div></li>
        <li><span class="ck">${CHECK}</span><div><h4>One connected medical team</h4><p>Seamlessly backed by nursing, physiotherapy and home lab tests whenever you need more.</p></div></li>
      </ul>
      <a class="btn btn-primary" href="#book" style="margin-top:26px">Request a Doctor</a>
    </div>
  </div>
</section>

<section class="sec reviews" id="reviews">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Loved by patients</span>
      <div class="rev-top">${G.replace('width:26px', '')}<span class="score">5.0</span><div class="stars">${STARS5}</div></div>
      <p>A 5.0 Google rating - trusted by 10,000+ patients across the UAE.</p>
    </div>
    <div class="rgrid">${REVIEWS}</div>
    <div class="rev-cta"><a class="btn btn-primary" href="#book">Join 10,000+ happy patients - Book now</a></div>
  </div>
</section>

<section style="background:linear-gradient(135deg,#D4B06A 0%,#B58A3C 100%);color:#2B1A17">
  <div class="wrap" style="padding:48px 0;text-align:center">
    <h2 style="color:#2B1A17;font-size:clamp(1.55rem,3.2vw,2.15rem);margin:0 auto 16px;max-width:20em">See a doctor today for AED 249 - often within about 30 minutes</h2>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a class="btn btn-primary" href="#book">Request a Free Callback</a>
      <a class="btn btn-wa" href="${WA}" target="_blank" rel="noopener">${WA_ICON}WhatsApp Us</a>
    </div>
  </div>
</section>

<section class="sec benefits">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow">Why choose NADZ</span><h2>A real clinic visit, brought to your door</h2><p>Everything you'd expect from a trusted doctor - without ever leaving home.</p></div>
    <div class="bgrid">
      <div class="bcard"><div class="ic">${SHIELD}</div><h3>DHA-licensed doctors</h3><p>Experienced GPs licensed by the Dubai Health Authority, caring for adults and children alike.</p></div>
      <div class="bcard"><div class="ic">${CLOCK}</div><h3>Often within 30 minutes</h3><p>Fast dispatch across Dubai and nearby areas - same-day and 24/7.</p></div>
      <div class="bcard"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><h3>A full consultation</h3><p>Time to listen, examine and explain - a real diagnosis and clear treatment plan, not a rushed call.</p></div>
      <div class="bcard"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7z"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/></svg></div><h3>Examination &amp; treatment on the spot</h3><p>A hands-on examination, diagnosis and treatment, with a clear plan for what to do next.</p></div>
      <div class="bcard"><div class="ic">${RECEIPT}</div><h3>Flat AED 249 consultation</h3><p>One clear, upfront price with the consultation and advice included - no surprises.</p></div>
      <div class="bcard"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div><h3>Home, office or hotel</h3><p>Wherever suits you best - private, convenient care that fits around your day.</p></div>
    </div>
  </div>
</section>

<section class="sec how">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow light">Simple &amp; fast</span><h2>From your call to your doctor, in 3 simple steps</h2><p>Booking a doctor takes minutes - care can be at your door the same day.</p></div>
    <div class="steps">
      <div class="step"><div class="num">1</div><h3>Call or WhatsApp, 24/7</h3><p>Describe your symptoms. Our team triages your case and guides you - any time, day or night.</p></div>
      <div class="step"><div class="num">2</div><h3>We dispatch a DHA-licensed doctor</h3><p>A doctor matched to your needs comes to your home, office or hotel with a full medical kit.</p></div>
      <div class="step"><div class="num">3</div><h3>Get examined &amp; treated on the spot</h3><p>Full consultation, examination and treatment for AED 249 - often within about 30 minutes, with follow-up if needed.</p></div>
    </div>
    <div class="how-cta"><a class="btn btn-gold" href="#book">Request a Doctor Now</a></div>
  </div>
</section>

<section class="sec" style="background:#fff">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow">Care in action</span><h2>Bringing the clinic to your doorstep</h2><p>Real NADZ care, delivered across Dubai and nearby areas.</p></div>
    <div class="gallery">
      <figure><img src="/assets/fam.jpg" alt="Trusted by 10,000+ patients &amp; families" loading="lazy" /><figcaption>Trusted by 10,000+ patients &amp; families</figcaption></figure>
      <figure><img src="/assets/doct.jpg" alt="DHA-licensed doctors &amp; clinicians" loading="lazy" /><figcaption>DHA-licensed doctors &amp; clinicians</figcaption></figure>
      <figure><img src="/assets/lab.jpg" alt="Tests &amp; treatment at your home" loading="lazy" /><figcaption>Tests &amp; treatment at your home</figcaption></figure>
    </div>
  </div>
</section>

<section class="sec team" id="team">
  <div class="wrap">
    <div class="team-head">
      <div class="team-head-txt"><span class="eyebrow">Meet the expert team</span><h2>Real, DHA-licensed doctors you can trust</h2><p>DHA-licensed doctors, nurses and specialists behind every NADZ visit.</p></div>
      <div class="slider-nav">
        <button class="sld-btn" type="button" data-dir="-1" aria-label="Previous team members"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
        <button class="sld-btn" type="button" data-dir="1" aria-label="Next team members"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
      </div>
    </div>
    <div class="slider" id="teamSlider">${TEAM}</div>
    <div class="slider-progress"><span class="slider-bar" id="teamBar"></span></div>
  </div>
</section>

<section class="sec faq">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow">Good to know</span><h2>Frequently asked questions</h2></div>
    <div class="faq-list">${FAQS}</div>
  </div>
</section>

<section class="sec finalcta" id="contact">
  <div class="wrap">
    <span class="eyebrow light">Ready when you are</span>
    <h2>See a doctor from the comfort of home</h2>
    <p>DHA-licensed doctors, a flat AED 249 consultation and treatment on the spot - at home, at the office or at your hotel. A doctor can be there in about 30 minutes.</p>
    <div class="btns">
      <a class="btn btn-gold" href="#book">Request a Free Callback</a>
      <a class="btn btn-wa" href="${WA}" target="_blank" rel="noopener">${WA_ICON} Chat on WhatsApp</a>
      <a class="btn btn-outline-light" href="tel:80046239">${PHONE_ICON} Call 800 4 NADZ</a>
    </div>
  </div>
</section>

<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div><div class="brand"><img src="/assets/logo-nadz.svg" alt="NADZ Healthcare" /></div><p>Blending care with innovation. DHA-licensed doctors and home-healthcare delivered to your home, office or hotel across Dubai and nearby areas.</p></div>
      <div><h4>Doctor on Call</h4><div class="foot-c"><a href="#services">Fever &amp; infections</a><a href="#services">Rehydration &amp; fluids</a><a href="#services">Children &amp; family care</a><a href="#services">Chronic condition care</a><a href="#services">Sick notes &amp; certificates</a><a href="#services">Minor injuries &amp; wounds</a></div></div>
      <div><h4>Contact us - 24/7</h4><div class="foot-c">
        <a href="tel:80046239">${PHONE_ICON}800 4 NADZ (800 4 6239)</a>
        <a href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener">${WA_ICON}WhatsApp: +971 52 159 7336</a>
        <a href="mailto:info@nadzhealthcare.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>info@nadzhealthcare.com</a>
        <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Office 809, Armada 2, Cluster P, JLT, Dubai, UAE</div>
      </div></div>
    </div>
    <div class="foot-bottom"><div>&copy; 2026 NADZ Healthcare. All rights reserved.</div><div class="lic">Licensed by Ministry of Health &middot; License No: P4DWL25W-100725</div></div>
  </div>
</footer>

<div class="mobile-cta">
  <a class="m-call" href="tel:80046239">${PHONE_ICON}Call</a>
  <a class="m-wa" href="${WA}" target="_blank" rel="noopener">${WA_ICON}WhatsApp</a>
  <a class="m-book" href="#book"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>Book</a>
</div>

<div class="fab">
  <a class="fab-btn fab-wa" href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp us">${WA_ICON}</a>
  <a class="fab-btn fab-call" href="tel:80046239" aria-label="Call us">${PHONE_ICON}</a>
</div>
`;

export default function DoctorOnCallPpc() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanups: Array<() => void> = [];

    // ---- Lead form -> prefilled WhatsApp (fires the site's lead event) ----
    const form = root.querySelector<HTMLFormElement>("#leadForm");
    if (form) {
      const onSubmit = (e: Event) => {
        e.preventDefault();
        const val = (id: string) =>
          (root.querySelector<HTMLInputElement>("#" + id)?.value || "").trim();
        const name = val("name"),
          phone = val("phone"),
          service = val("service"),
          time = val("time");
        if (!name || !phone || !service || !time) {
          form.reportValidity();
          return;
        }
        track("generate_lead", { service: "doctor_on_call", source: "ppc" });
        const msg = [
          "Hi NADZ Healthcare, I'd like to request a home doctor visit.",
          "",
          "• Name: " + name,
          "• Phone: " + phone,
          "• Service: " + service,
          "• Preferred time: " + time,
          "• Consultation: AED 249",
        ].join("\n");
        window.open(
          "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg),
          "_blank",
          "noopener,noreferrer",
        );
        const fields = root.querySelector<HTMLElement>("#formFields");
        const success = root.querySelector<HTMLElement>("#formSuccess");
        if (fields) fields.style.display = "none";
        if (success) success.style.display = "block";
      };
      form.addEventListener("submit", onSubmit);
      cleanups.push(() => form.removeEventListener("submit", onSubmit));
    }

    // ---- FAQ accordion ----
    root.querySelectorAll<HTMLButtonElement>(".faq-q").forEach((btn) => {
      const handler = () => {
        const item = btn.parentElement as HTMLElement;
        const isOpen = item.classList.contains("open");
        root.querySelectorAll<HTMLElement>(".faq-item").forEach((i) => {
          i.classList.remove("open");
          const a = i.querySelector<HTMLElement>(".faq-a");
          if (a) a.style.maxHeight = "";
        });
        if (!isOpen) {
          item.classList.add("open");
          const a = item.querySelector<HTMLElement>(".faq-a");
          if (a) a.style.maxHeight = a.scrollHeight + "px";
        }
      };
      btn.addEventListener("click", handler);
      cleanups.push(() => btn.removeEventListener("click", handler));
    });

    // ---- Team slider ----
    const slider = root.querySelector<HTMLElement>("#teamSlider");
    if (slider) {
      const bar = root.querySelector<HTMLElement>("#teamBar");
      const prev = root.querySelector<HTMLButtonElement>('[data-dir="-1"]');
      const next = root.querySelector<HTMLButtonElement>('[data-dir="1"]');
      const upd = () => {
        const max = slider.scrollWidth - slider.clientWidth;
        const vis = Math.min(1, slider.clientWidth / slider.scrollWidth);
        if (bar) {
          bar.style.width = vis * 100 + "%";
          const p = max > 0 ? slider.scrollLeft / max : 0;
          bar.style.left = p * (100 - vis * 100) + "%";
        }
        if (prev) prev.disabled = slider.scrollLeft <= 4;
        if (next) next.disabled = slider.scrollLeft >= max - 4;
      };
      const go = (d: number) =>
        slider.scrollBy({
          left: d * Math.round(slider.clientWidth * 0.85),
          behavior: "smooth",
        });
      const onPrev = () => go(-1);
      const onNext = () => go(1);
      prev?.addEventListener("click", onPrev);
      next?.addEventListener("click", onNext);
      slider.addEventListener("scroll", upd, { passive: true });
      window.addEventListener("resize", upd);
      upd();
      cleanups.push(() => {
        prev?.removeEventListener("click", onPrev);
        next?.removeEventListener("click", onNext);
        slider.removeEventListener("scroll", upd);
        window.removeEventListener("resize", upd);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      {/* Headings use Mona Sans and body copy uses Inter — both already loaded
          globally by the root layout as --font-mona / --font-inter, so this
          page needs no external font fetch. */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        ref={rootRef}
        className="ppc"
        dangerouslySetInnerHTML={{ __html: HTML }}
      />
    </>
  );
}
