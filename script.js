/* ==========================================================
   AluVex — script.js
   ========================================================== */
(() => {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const touch = matchMedia('(hover: none)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- zajednički SVG gradijenti ---------- */
  document.body.insertAdjacentHTML('afterbegin', `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <linearGradient id="alu" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1f5fb"/><stop offset=".5" stop-color="#8794aa"/><stop offset="1" stop-color="#d3dbe8"/></linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7dd3fc" stop-opacity=".55"/><stop offset="1" stop-color="#6366f1" stop-opacity=".35"/></linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs></svg>`);

  /* ---------- ilustracije proizvoda (SVG) ---------- */
  const open = '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">';
  const ART = {
    window: () => open + `
      <rect x="80" y="26" width="240" height="248" rx="8" fill="url(#alu)"/>
      <rect x="94" y="40" width="212" height="220" rx="3" fill="#0b1424"/>
      <rect x="100" y="46" width="97" height="208" fill="url(#glass)"/>
      <rect x="203" y="46" width="97" height="208" fill="url(#glass)"/>
      <path d="M100 46h60l-60 104z" fill="url(#shine)"/><path d="M203 46h60l-60 104z" fill="url(#shine)"/>
      <rect x="196" y="44" width="8" height="212" fill="url(#alu)"/>
      <rect x="180" y="140" width="5" height="34" rx="2.5" fill="#eaf0f8"/><rect x="215" y="140" width="5" height="34" rx="2.5" fill="#eaf0f8"/></svg>`,
    door: () => open + `
      <rect x="120" y="14" width="160" height="272" rx="8" fill="url(#alu)"/>
      <rect x="132" y="26" width="136" height="248" rx="3" fill="#0b1424"/>
      <rect x="138" y="32" width="124" height="130" fill="url(#glass)"/>
      <path d="M138 32h70l-70 110z" fill="url(#shine)"/>
      <rect x="138" y="166" width="124" height="6" fill="url(#alu)"/>
      <rect x="138" y="176" width="124" height="92" fill="url(#glass)" opacity=".8"/>
      <rect x="246" y="140" width="6" height="54" rx="3" fill="#eaf0f8"/></svg>`,
    slide: () => open + `
      <rect x="24" y="40" width="352" height="220" rx="8" fill="url(#alu)"/>
      <rect x="38" y="54" width="324" height="192" fill="#0b1424"/>
      <g><rect x="42" y="58" width="112" height="184" fill="url(#glass)" stroke="url(#alu)" stroke-width="5"/><path d="M46 62h50l-50 80z" fill="url(#shine)"/></g>
      <g><rect x="144" y="58" width="112" height="184" fill="url(#glass)" stroke="url(#alu)" stroke-width="5"/><path d="M148 62h50l-50 80z" fill="url(#shine)"/>
        <animateTransform attributeName="transform" type="translate" values="0 0;-98 0;-98 0;0 0" keyTimes="0;.4;.7;1" dur="7s" repeatCount="indefinite"/></g>
      <g><rect x="246" y="58" width="112" height="184" fill="url(#glass)" stroke="url(#alu)" stroke-width="5"/><path d="M250 62h50l-50 80z" fill="url(#shine)"/>
        <animateTransform attributeName="transform" type="translate" values="0 0;-196 0;-196 0;0 0" keyTimes="0;.4;.7;1" dur="7s" repeatCount="indefinite"/></g></svg>`,
    lift: () => open + `
      <rect x="24" y="30" width="352" height="240" rx="8" fill="url(#alu)"/>
      <rect x="38" y="44" width="324" height="212" fill="#0b1424"/>
      <rect x="42" y="48" width="200" height="204" fill="url(#glass)" stroke="url(#alu)" stroke-width="6"/><path d="M46 52h90l-90 130z" fill="url(#shine)"/>
      <g><rect x="160" y="48" width="198" height="204" fill="url(#glass)" stroke="url(#alu)" stroke-width="6"/><path d="M164 52h90l-90 130z" fill="url(#shine)"/>
        <rect x="170" y="130" width="6" height="52" rx="3" fill="#eaf0f8"/>
        <animateTransform attributeName="transform" type="translate" values="0 0;-110 0;-110 0;0 0" keyTimes="0;.45;.75;1" dur="8s" repeatCount="indefinite"/></g>
      <rect x="38" y="250" width="324" height="8" fill="url(#alu)"/></svg>`,
    facade: () => {
      let s = open + '<rect x="30" y="16" width="340" height="268" rx="6" fill="url(#alu)"/>';
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
        const x = 42 + c * 81, y = 28 + r * 85;
        s += `<rect x="${x}" y="${y}" width="73" height="77" fill="url(#glass)"/><path d="M${x} ${y}h38l-38 52z" fill="url(#shine)"/>`;
      }
      return s + '</svg>';
    },
    railing: () => {
      let s = open + '<rect x="14" y="204" width="372" height="16" rx="3" fill="url(#alu)"/><rect x="14" y="84" width="372" height="10" rx="5" fill="url(#alu)"/>';
      for (let i = 0; i < 4; i++) s += `<rect x="${30 + i * 88}" y="98" width="78" height="104" fill="url(#glass)"/><path d="M${30 + i * 88} 98h36l-36 56z" fill="url(#shine)"/>`;
      for (let i = 0; i < 5; i++) s += `<rect x="${22 + i * 88}" y="84" width="8" height="136" fill="url(#alu)"/>`;
      return s + '</svg>';
    },
    winter: () => open + `
      <path d="M36 274V132L200 40l164 92v142z" fill="#0b1424" stroke="url(#alu)" stroke-width="9" stroke-linejoin="round"/>
      <path d="M48 266V138L200 54l152 84v128z" fill="url(#glass)"/>
      <path d="M200 54v212M124 96v170M276 96v170M48 160h304" stroke="url(#alu)" stroke-width="6" fill="none"/>
      <path d="M200 54L48 138M200 54l152 84" stroke="url(#alu)" stroke-width="6" fill="none"/>
      <path d="M52 140L200 58l60 33z" fill="url(#shine)"/></svg>`,
    shutter: () => {
      let s = open + '<rect x="60" y="24" width="280" height="252" rx="8" fill="#0b1424" stroke="url(#alu)" stroke-width="8"/><rect x="60" y="20" width="280" height="22" rx="6" fill="url(#alu)"/>';
      for (let i = 0; i < 9; i++) s += `<rect x="70" y="${48 + i * 24}" width="260" height="20" rx="3" fill="url(#alu)" opacity="${1 - i * .04}"/>`;
      return s + '<rect x="190" y="250" width="20" height="12" rx="3" fill="#38bdf8"/></svg>';
    }
  };
  $$('[data-art]').forEach(el => { const f = ART[el.dataset.art]; if (f) el.innerHTML = f(); });

  /* ---------- loader ---------- */
  const loader = $('.loader');
  const hideLoader = () => loader && loader.classList.add('done');
  window.addEventListener('load', () => setTimeout(hideLoader, 450));
  setTimeout(hideLoader, 2800);
  window.addEventListener('pageshow', e => { if (e.persisted) document.body.classList.remove('leaving'); });

  /* ---------- navbar, progress, scroll-spy (optimizovano) ---------- */
  const nav = $('#nav'), progress = $('#progress'), heroBg = $('#heroBg'), heroEl = $('.hero');
  const spyLinks = $$('.menu a[data-sec]');
  const spySecs = $$('section[id]');
  let heroH = 0, maxScroll = 1, tops = [];
  let lastScrolled = null, lastProg = -1, lastSec = null, ticking = false;
  // Merenja se rade SAMO pri učitavanju/promeni veličine — nikad u scroll događaju.
  const measure = () => {
    heroH = heroEl ? heroEl.offsetHeight : 0;
    maxScroll = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
    tops = spySecs.map(s => s.offsetTop);
  };
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const scrolled = y > 40;
    if (scrolled !== lastScrolled) { nav.classList.toggle('scrolled', scrolled); lastScrolled = scrolled; }
    const p = Math.round((y / maxScroll) * 1000) / 1000;
    if (p !== lastProg) { progress.style.transform = `scaleX(${p})`; lastProg = p; }     // transform = bez layouta
    if (spyLinks.length) {
      let cur = 'home';
      for (let i = 0; i < tops.length; i++) if (tops[i] - 220 <= y) cur = spySecs[i].id;
      if (cur !== lastSec) { spyLinks.forEach(a => a.classList.toggle('active', a.dataset.sec === cur)); lastSec = cur; }
    }
  };
  const rootEl = document.documentElement; let scrollTimer;
  const onScroll = () => {
    // dok traje skrol pauziraj sitne beskonačne animacije (prsten oko loga...), posle 140ms nastavljaju
    rootEl.classList.add('is-scrolling'); clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => rootEl.classList.remove('is-scrolling'), 140);
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { measure(); onScroll(); });
  window.addEventListener('load', () => { measure(); update(); });
  if ('ResizeObserver' in window) new ResizeObserver(() => { measure(); }).observe(document.body);
  measure(); update();

  /* ---------- pauziraj animacije koje nisu na ekranu ---------- */
  if (heroEl) new IntersectionObserver(es => es.forEach(e => heroEl.classList.toggle('off', !e.isIntersecting)), { threshold: 0 }).observe(heroEl);
  $$('svg').forEach(svg => {
    if (!svg.querySelector('animateTransform') || !svg.pauseAnimations) return;
    new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations()), { threshold: 0 }).observe(svg);
  });
  const mq = $('.marquee');
  if (mq) new IntersectionObserver(es => es.forEach(e => mq.classList.toggle('off', !e.isIntersecting)), { threshold: 0 }).observe(mq);

  /* ---------- mobilni meni ---------- */
  const burger = $('#burger'), menu = $('#menu');
  const toggleMenu = (force) => {
    const o = force ?? !menu.classList.contains('open');
    menu.classList.toggle('open', o);
    burger.classList.toggle('open', o);
    document.body.style.overflow = o ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggleMenu());
  $$('a', menu).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- tranzicija između stranica ---------- */
  $$('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target === '_blank') return;
    a.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      const url = new URL(a.href, location.href);
      const same = url.pathname === location.pathname;
      if (same) return; // isti dokument — samo skroluj
      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(() => { location.href = a.href; }, 340);
    });
  });

  /* ---------- reveal na skrol ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- brojači ---------- */
  const countIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    countIO.unobserve(e.target);
    const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), dur = 1800;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1), v = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * v).toLocaleString('sr-RS') + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => countIO.observe(el));


  /* ---------- efekti miša ---------- */
  if (!touch) {
    // glow koji prati kursor (transform, petlja radi samo dok se miš kreće)
    const glow = $('#cursorGlow'); let gx = innerWidth / 2, gy = 300, tx = gx, ty = gy, run = false;
    const gl = () => {
      gx += (tx - gx) * .12; gy += (ty - gy) * .12;
      glow.style.transform = `translate3d(${gx - 260}px,${gy - 260}px,0)`;
      if (Math.abs(tx - gx) > .5 || Math.abs(ty - gy) > .5) requestAnimationFrame(gl); else run = false;
    };
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; if (!run) { run = true; requestAnimationFrame(gl); } }, { passive: true });

    // magnetni dugmići
    $$('.hero-cta .btn, .cta-band .btn, .center-cta .btn').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${(e.clientX - r.left - r.width / 2) * .18}px ${(e.clientY - r.top - r.height / 2) * .28}px`;
      });
      b.addEventListener('pointerleave', () => { b.style.translate = ''; });
    });
  }

  // spotlight na karticama
  $$('.card').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  /* ---------- galerija + lightbox ---------- */
  const items = $$('.g-item');
  if (items.length) {
    const lb = $('#lightbox'), art = $('#lbArt'), ttl = $('#lbTitle'), sub = $('#lbSub');
    let idx = 0;
    const show = i => {
      idx = (i + items.length) % items.length;
      const it = items[idx];
      art.innerHTML = $('.gi-art', it).innerHTML;
      art.style.setProperty('--g1', it.style.getPropertyValue('--g1'));
      art.style.setProperty('--g2', it.style.getPropertyValue('--g2'));
      ttl.textContent = $('b', it).textContent;
      sub.textContent = $('small', it).textContent;
    };
    const openLb = i => { show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; };
    const closeLb = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    items.forEach((it, i) => it.addEventListener('click', () => openLb(i)));
    $('#lbClose').addEventListener('click', closeLb);
    $('#lbPrev').addEventListener('click', () => show(idx - 1));
    $('#lbNext').addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ---------- galerija: slajder na telefonu (swipe + auto) ---------- */
  (function () {
    const grid = $('.g-grid');
    if (!grid || items.length < 2) return;
    const mq = matchMedia('(max-width:600px)');
    const IV = 4500;
    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'g-dots'; dotsWrap.setAttribute('aria-hidden', 'true');
    dotsWrap.style.setProperty('--iv', IV + 'ms');
    const dots = items.map((_, i) => {
      const b = document.createElement('button'); b.type = 'button'; b.tabIndex = -1;
      b.addEventListener('click', () => { goTo(i); userTouched(); });
      dotsWrap.appendChild(b); return b;
    });
    grid.after(dotsWrap);
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
    let cur = -1, timer = 0, resumeT = 0, visible = false, held = false;
    const lbEl = $('#lightbox');

    const posFor = i => { const it = items[i]; return it.offsetLeft - (grid.clientWidth - it.offsetWidth) / 2; };
    const goTo = i => { grid.scrollTo({ left: posFor((i + items.length) % items.length), behavior: reduce ? 'auto' : 'smooth' }); };
    const restartFill = () => {
      dotsWrap.classList.remove('auto'); void dotsWrap.offsetWidth;
      if (!reduce && canRun()) dotsWrap.classList.add('auto');
    };
    const canRun = () => mq.matches && visible && !held && !document.hidden && !(lbEl && lbEl.classList.contains('open'));
    const schedule = () => {
      clearTimeout(timer);
      dotsWrap.classList.toggle('paused', !canRun());
      if (reduce || !canRun()) return;
      timer = setTimeout(() => { if (canRun()) goTo(cur + 1); else schedule(); }, IV);
    };
    const setActive = i => {
      if (i === cur) return;
      cur = i;
      items.forEach((it, k) => it.classList.toggle('on', k === i));
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
      restartFill(); schedule();
    };
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!mq.matches) return;
        const c = grid.scrollLeft + grid.clientWidth / 2;
        let best = 0, bd = 1e9;
        items.forEach((it, k) => { const d = Math.abs(it.offsetLeft + it.offsetWidth / 2 - c); if (d < bd) { bd = d; best = k; } });
        setActive(best);
      });
    };
    grid.addEventListener('scroll', onScroll, { passive: true });

    // pauza dok korisnik drži/prevlači; nastavak nakon kratke pauze
    const userTouched = () => { held = true; clearTimeout(resumeT); schedule(); resumeT = setTimeout(() => { held = false; restartFill(); schedule(); }, 6000); };
    grid.addEventListener('touchstart', userTouched, { passive: true });
    grid.addEventListener('pointerdown', userTouched, { passive: true });
    grid.addEventListener('wheel', userTouched, { passive: true });

    new IntersectionObserver(es => { visible = es[0].isIntersecting; restartFill(); schedule(); }, { threshold: .35 }).observe(grid);
    document.addEventListener('visibilitychange', () => { restartFill(); schedule(); });
    if (lbEl) new MutationObserver(() => { restartFill(); schedule(); }).observe(lbEl, { attributes: true, attributeFilter: ['class'] });
    const onMq = () => { cur = -1; if (mq.matches) { grid.scrollLeft = posFor(0); onScroll(); setActive(0); } else { items.forEach(it => it.classList.remove('on')); clearTimeout(timer); } };
    mq.addEventListener ? mq.addEventListener('change', onMq) : mq.addListener(onMq);
    addEventListener('resize', () => { if (mq.matches && cur >= 0) grid.scrollLeft = posFor(cur); });
    onMq();
  })();

  /* ---------- kontakt forma ---------- */
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#f-name'), contact = $('#f-contact'), msg = $('#f-msg');
      const okContact = /^\S+@\S+\.\S+$/.test(contact.value.trim()) || contact.value.replace(/\D/g, '').length >= 6;
      const checks = [[name, name.value.trim().length > 1], [contact, okContact], [msg, msg.value.trim().length > 3]];
      checks.forEach(([el, ok]) => el.parentElement.classList.toggle('err', !ok));
      if (checks.some(([, ok]) => !ok)) return;
      // TODO: ovde povežite pravo slanje (npr. Formspree, EmailJS ili vaš backend).
      const ok = $('#formOk'); ok.classList.add('show'); form.reset();
      setTimeout(() => ok.classList.remove('show'), 7000);
    });
    $$('input,textarea', form).forEach(el => el.addEventListener('input', () => el.parentElement.classList.remove('err')));
  }

  /* ---------- filter proizvoda ---------- */
  const chips = $$('.chip');
  if (chips.length) {
    const cards = $$('.p-card');
    const apply = f => {
      chips.forEach(c => c.classList.toggle('active', c.dataset.filter === f));
      let n = 0;
      cards.forEach(c => {
        const on = f === 'svi' || c.dataset.cat === f;
        c.classList.toggle('hide', !on);
        c.classList.remove('pop');
        if (on) { void c.offsetWidth; c.style.animationDelay = (n++ * 70) + 'ms'; c.classList.add('pop'); }
      });
    };
    chips.forEach(c => c.addEventListener('click', () => apply(c.dataset.filter)));
    const h = location.hash.slice(1);
    if (h && chips.some(c => c.dataset.filter === h)) {
      apply(h);
      setTimeout(() => $('#katalog').scrollIntoView({ behavior: 'smooth' }), 300);
    }
  }

  /* ---------- demo kliznih vrata ---------- */
  const range = $('#demoRange');
  if (range) {
    const door = $('#demoDoor'), val = $('#demoVal');
    const set = v => {
      door.style.setProperty('--o', v / 100);
      range.style.setProperty('--v', v + '%');
      val.textContent = Math.round(v) + '%';
    };
    range.addEventListener('input', () => set(+range.value));
    set(0);
    // automatska demonstracija pri prvom prikazivanju
    const demoIO = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      demoIO.disconnect();
      door.style.transition = 'none';
      const t0 = performance.now(), end = 60, dur = 1600;
      (function step(t) {
        const p = Math.min((t - t0) / dur, 1), v = end * (1 - Math.pow(1 - p, 3));
        if (+range.value === 0 || p < 1) { range.value = v; set(v); }
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }), { threshold: .5 });
    demoIO.observe(door);
  }

  /* ---------- godina u footeru ---------- */
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();
