/* =========================================================
   Tá Safo — interações e motion do site
   ========================================================= */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;
  const motionOK = !reduceMotion;
  const PRINTS = 'divulgacao-site/prints-web/';

  const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const escapeHTML = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (id) => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;

  /* ---------- Mascote (SVG inline, animável) ---------- */
  const MASCOT_SVG = `
<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
  <circle cx="100" cy="100" r="100" fill="#F5B700"/>
  <g transform="translate(100 104) scale(.92) translate(-100 -104)">
    <g class="siren-glow-b" stroke="#3D7BFF" stroke-width="3.4" stroke-linecap="round" opacity="0"><path d="M78 36l-3-7"/><path d="M86 34v-8"/><path d="M70 40l-6-5"/></g>
    <g class="siren-glow-r" stroke="#FF3B4E" stroke-width="3.4" stroke-linecap="round" opacity="0"><path d="M122 36l3-7"/><path d="M114 34v-8"/><path d="M130 40l6-5"/></g>
    <ellipse cx="100" cy="167" rx="48" ry="6" fill="#D4A109"/>
    <g stroke="#0B1B2E" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
      <rect x="46" y="134" width="26" height="26" rx="6" fill="#16213A"/>
      <rect x="128" y="134" width="26" height="26" rx="6" fill="#16213A"/>
      <path class="siren-blue" d="M76 44h24v13H76a4 4 0 0 1-4-4v-5a4 4 0 0 1 4-4z" fill="#275193" stroke="none"/>
      <path class="siren-red" d="M100 44h24a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-24z" fill="#8E3446" stroke="none"/>
      <rect x="72" y="44" width="56" height="13" rx="4" fill="none"/>
      <path d="M82 57h36c3 0 5 2 6 4.5l8 30H68l8-30c1-2.5 3-4.5 6-4.5z" fill="#F7B500"/>
      <path d="M85 62h30c2 0 3.2 1.2 3.8 3l5 22H76.2l5-22c.6-1.8 1.8-3 3.8-3z" fill="#1E3A5F"/>
      <ellipse cx="38" cy="98" rx="9" ry="7" fill="#F7B500"/>
      <ellipse cx="162" cy="98" rx="9" ry="7" fill="#F7B500"/>
      <rect x="40" y="90" width="120" height="52" rx="16" fill="#F7B500"/>
      <ellipse cx="55" cy="109" rx="8.5" ry="6.5" fill="#FFF3C4"/>
      <ellipse cx="145" cy="109" rx="8.5" ry="6.5" fill="#FFF3C4"/>
      <path d="M82 117q18 13 36 0" fill="none"/>
      <rect x="85" y="130" width="30" height="12" rx="2.5" fill="#FFFFFF"/>
    </g>
    <rect x="87" y="132" width="26" height="3.2" fill="#1F5FBF"/>
    <circle cx="88.5" cy="76" r="9" fill="#FFFFFF" stroke="#0B1B2E" stroke-width="2.2"/>
    <circle cx="111.5" cy="76" r="9" fill="#FFFFFF" stroke="#0B1B2E" stroke-width="2.2"/>
    <g class="pupils"><circle cx="89" cy="76.5" r="4.4" fill="#0B1B2E"/><circle cx="112" cy="76.5" r="4.4" fill="#0B1B2E"/></g>
    <g class="eyelids" style="transform-box:view-box"><ellipse cx="88.5" cy="76" rx="10.2" ry="10.2" fill="#1E3A5F"/><ellipse cx="111.5" cy="76" rx="10.2" ry="10.2" fill="#1E3A5F"/></g>
  </g>
</svg>`;
  $$('[data-mascot]').forEach((el) => { el.innerHTML = MASCOT_SVG; });

  /* ---------- Estado do ponteiro ---------- */
  const pointer = { x: innerWidth / 2, y: innerHeight / 2, moved: false };
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    pointer.x = e.clientX; pointer.y = e.clientY; pointer.moved = true;
  }, { passive: true });

  /* ---------- Cursor personalizado ---------- */
  const cursor = $('.cursor');
  if (cursor && finePointer && motionOK) {
    document.documentElement.classList.add('has-cursor');
    cursor.classList.add('is-hidden');
    window.addEventListener('pointermove', (e) => { if (e.pointerType !== 'touch') cursor.classList.remove('is-hidden'); }, { passive: true });
    const dot = $('.cursor__dot', cursor), ring = $('.cursor__ring', cursor);
    let rx = pointer.x, ry = pointer.y;
    const interactive = 'a, button, [role="button"], .plate, .shot, .chip, label[for], input[type="range"], summary';
    document.addEventListener('pointerover', (e) => {
      const t = e.target;
      cursor.classList.toggle('is-hover', !!t.closest(interactive));
      cursor.classList.toggle('is-text', !!t.closest('input[type="text"], input[type="search"], textarea'));
      cursor.classList.toggle('is-dark', !!t.closest('.on-navy, .footer, .cta__card, .mobile-menu, .street__card, .chat__head, .lightbox'));
    });
    document.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    document.addEventListener('pointerup', () => cursor.classList.remove('is-down'));
    document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
    const loop = () => {
      rx = lerp(rx, pointer.x, .18); ry = lerp(ry, pointer.y, .18);
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ---------- Olhos do mascote seguem o mouse ---------- */
  const mascots = $$('.mascot');
  const visibleMascots = new Set();
  const mio = new IntersectionObserver((entries) => {
    entries.forEach((en) => en.isIntersecting ? visibleMascots.add(en.target) : visibleMascots.delete(en.target));
  });
  mascots.forEach((m) => mio.observe(m));
  let idleT = 0;
  const eyeLoop = (t) => {
    visibleMascots.forEach((m) => {
      const pupils = m.querySelector('.pupils');
      if (!pupils) return;
      let dx, dy;
      if (pointer.moved) {
        const r = m.getBoundingClientRect();
        const cx = r.left + r.width * .5, cy = r.top + r.height * .39;
        const ax = pointer.x - cx, ay = pointer.y - cy;
        const d = Math.hypot(ax, ay) || 1;
        const k = Math.min(1, d / 160) * 3.4;
        dx = ax / d * k; dy = ay / d * k * .8;
      } else {
        // olhar distraído em telas de toque
        const s = Math.floor((t + idleT) / 2200) % 4;
        const pos = [[0, 0], [2.6, -1], [-2.6, .6], [0, 2]][s];
        dx = pos[0]; dy = pos[1];
      }
      pupils.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
    });
    requestAnimationFrame(eyeLoop);
  };
  if (motionOK) requestAnimationFrame(eyeLoop);

  /* ---------- Botões magnéticos ---------- */
  if (finePointer && motionOK) {
    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * .28;
        const y = (e.clientY - r.top - r.height / 2) * .38;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
        el.style.transform = '';
        setTimeout(() => { el.style.transition = ''; }, 600);
      });
    });
  }

  /* ---------- Spotlight nos cartões ---------- */
  if (canHover) {
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest && e.target.closest('.spot');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  /* ---------- Tilt 3D (celulares e cartões) ---------- */
  if (finePointer && motionOK) {
    const tilt = (el, max) => {
      let raf = 0;
      el.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
      el.addEventListener('pointermove', (e) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - .5;
          const py = (e.clientY - r.top) / r.height - .5;
          el.style.transition = 'transform .15s ease-out';
          el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
        });
      });
      el.addEventListener('pointerleave', () => {
        cancelAnimationFrame(raf);
        el.style.transition = 'transform .8s cubic-bezier(.16,1,.3,1)';
        el.style.transform = '';
      });
    };
    $$('[data-tilt]').forEach((el) => tilt(el, 14));
    $$('[data-tilt-card]').forEach((el) => tilt(el, 8));
  }

  /* ---------- Hero: parallax, tilt e holofote ---------- */
  const hero = $('.hero');
  const heroTilt = $('#heroTilt');
  const heroSpot = $('.hero__spot');
  const parallaxEls = $$('[data-parallax]');
  let heroVisible = true;
  if (hero) new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; }).observe(hero);
  if (hero && motionOK && finePointer) {
    let cx = 0, cy = 0;
    const heroLoop = () => {
      if (heroVisible) {
        const tx = pointer.moved ? pointer.x / innerWidth - .5 : 0;
        const ty = pointer.moved ? pointer.y / innerHeight - .5 : 0;
        cx = lerp(cx, tx, .07); cy = lerp(cy, ty, .07);
        if (heroTilt) heroTilt.style.transform = `rotateY(${(cx * 16).toFixed(2)}deg) rotateX(${(-cy * 12).toFixed(2)}deg)`;
        parallaxEls.forEach((el) => {
          const f = parseFloat(el.dataset.parallax);
          el.style.translate = `${(cx * f).toFixed(1)}px ${(cy * f).toFixed(1)}px`;
        });
        if (heroSpot) {
          const r = hero.getBoundingClientRect();
          heroSpot.style.setProperty('--sx', `${pointer.x - r.left}px`);
          heroSpot.style.setProperty('--sy', `${pointer.y - r.top}px`);
        }
      }
      requestAnimationFrame(heroLoop);
    };
    requestAnimationFrame(heroLoop);
  }

  /* Troca de telas no celular do hero */
  const heroLayers = $$('#heroScreens .screen-layer');
  if (heroLayers.length > 1 && motionOK) {
    let i = 0;
    setInterval(() => {
      if (!heroVisible || document.hidden) return;
      heroLayers[i].classList.remove('is-active');
      i = (i + 1) % heroLayers.length;
      heroLayers[i].classList.add('is-active');
    }, 3400);
  }

  /* ---------- Divisão de títulos em palavras ---------- */
  $$('[data-split]').forEach((el) => {
    let i = 0;
    const wrap = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement('span');
            w.className = 'split-word';
            const inner = document.createElement('span');
            inner.textContent = part;
            inner.style.setProperty('--i', i++);
            w.appendChild(inner);
            frag.appendChild(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && !child.classList.contains('split-word')) {
          wrap(child);
        }
      });
    };
    wrap(el);
    el.setAttribute('data-reveal', el.getAttribute('data-reveal') || 'split');
  });

  /* ---------- Reveal ao rolar ---------- */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        en.target.querySelectorAll('.mark').forEach((m) => m.classList.add('is-in'));
        revealIO.unobserve(en.target);
      }
    });
  }, { threshold: .14, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal]').forEach((el) => revealIO.observe(el));
  // o hero entra imediatamente
  requestAnimationFrame(() => $$('.hero [data-reveal]').forEach((el) => { el.classList.add('is-in'); el.querySelectorAll('.mark').forEach((m) => m.classList.add('is-in')); }));

  /* ---------- Contadores ---------- */
  const fmt = new Intl.NumberFormat('pt-BR');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target; countIO.unobserve(el);
      const end = +el.dataset.count, suffix = el.dataset.suffix ? `<sup>${el.dataset.suffix}</sup>` : '';
      if (!motionOK) { el.innerHTML = fmt.format(end) + suffix; return; }
      const dur = 1600 + Math.min(end, 4000) * .15, t0 = performance.now();
      const step = (t) => {
        const p = clamp((t - t0) / dur, 0, 1);
        const e = 1 - Math.pow(2, -10 * p);
        el.innerHTML = fmt.format(Math.round(end * (p === 1 ? 1 : e))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: .6 });
  $$('[data-count]').forEach((el) => {
    el.innerHTML = '0' + (el.dataset.suffix ? `<sup>${el.dataset.suffix}</sup>` : '');
    countIO.observe(el);
  });

  /* ---------- Navegação, progresso e botão flutuante ---------- */
  const nav = $('#nav');
  const progress = $('.scroll-progress');
  const fab = $('#fab');
  const chatEl = $('#chat');
  const ctaEl = $('#baixar');
  let lastY = scrollY;
  const navLinks = $$('.nav__links a');
  const sections = navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  let ticking = false;
  const onScroll = () => {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle('is-scrolled', y > 16);
    if (!nav.classList.contains('is-open')) nav.classList.toggle('is-hidden', y > 500 && y > lastY + 4);
    if (y < lastY - 4) nav.classList.remove('is-hidden');
    lastY = y;
    // botão do assistente: aparece depois do hero, some sobre o próprio chat
    if (fab) {
      let show = y > innerHeight * .8;
      [chatEl, ctaEl].forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) show = false;
      });
      fab.classList.toggle('is-visible', show);
    }
    // link ativo
    let current = null;
    sections.forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * .4) current = s; });
    navLinks.forEach((a) => a.classList.toggle('is-active', current && a.getAttribute('href') === '#' + current.id));
    updatePipeline();
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', () => requestAnimationFrame(onScroll));

  fab && fab.addEventListener('click', () => {
    chatEl.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto', block: 'center' });
    setTimeout(() => $('#chatInput').focus({ preventScroll: true }), motionOK ? 700 : 0);
  });

  /* Menu mobile */
  const toggle = $('.nav__toggle');
  const mobileMenu = $('#mobileMenu');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    mobileMenu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileMenu.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  $$('a', mobileMenu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) setMenu(false); });

  /* ---------- Toast e copiar ---------- */
  const toast = $('#toast');
  let toastT;
  const showToast = (msg = 'Texto copiado!') => {
    $('span', toast).textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove('is-on'), 1900);
  };
  const copyText = async (text) => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch { /* sem suporte */ }
      ta.remove();
    }
    showToast();
  };
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    let text = btn.dataset.copyText;
    if (!text && btn.dataset.copyTarget) text = $(btn.dataset.copyTarget).textContent.trim();
    if (!text) { const src = btn.parentElement.querySelector('.copy-src'); text = src ? src.textContent.trim() : ''; }
    if (text) copyText(text);
  });

  /* ---------- Acordeões ---------- */
  $$('.acc').forEach((acc) => {
    const btn = $('.acc__btn', acc);
    btn.addEventListener('click', () => {
      const open = !acc.classList.contains('is-open');
      acc.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open);
    });
  });

  /* ---------- Assistente (demonstração) ---------- */
  const CHIP = (code) => `<span class="code-chip">${icon('i-gavel')}${code}</span>`;
  const ANSWERS = {
    video: {
      q: 'motorista vendo vídeo no celular preso no painel com o carro andando',
      a: `<div class="msg__title">Infração ${CHIP('763-32')}</div>
<p>Celular preso no painel (suporte veicular) enquanto o motorista assiste vídeo com o carro andando configura <strong>manuseio de telefone celular</strong> — ele está interagindo com a tela/funções do aparelho para reproduzir e assistir o conteúdo.</p>
<ul><li><strong>Artigo:</strong> 252, parágrafo único</li><li><strong>Gravidade:</strong> Gravíssima</li><li><strong>Pontos:</strong> 7 pontos</li><li><strong>Valor:</strong> R$ 293,47</li><li><strong>Medida administrativa:</strong> Não aplicável</li></ul>
<p><strong>AUTUAR</strong> por este código, e não pelo ${CHIP('736-62')}.</p>
<div class="msg__why"><strong>Por que não é o 736-62</strong> (utilizar telefone celular, sem segurar/manusear)? Essa infração é para quando o celular está sendo usado de forma indireta (apoiado entre cabeça e ombro, encaixado no capacete), sem interação com a tela. Como aqui o motorista está assistindo vídeo — o que pressupõe ter mexido no aparelho —, o enquadramento correto é o 763-32 (manuseando).</div>
<div class="msg__note"><strong>Atenção:</strong> estar “preso no painel” não afasta a autuação. A orientação só afasta a autuação quando o uso é de aplicativo de GPS/navegação — assistir vídeo não se enquadra nessa exceção.</div>`
    },
    segurando: {
      q: 'motorista dirigindo segurando o celular na mão',
      a: `<div class="msg__title">Infração ${CHIP('763-31')}</div>
<p>Dirigir veículo <strong>segurando telefone celular</strong>.</p>
<ul><li><strong>Artigo:</strong> 252, parágrafo único</li><li><strong>Gravidade:</strong> Gravíssima</li><li><strong>Pontos:</strong> 7 pontos</li><li><strong>Valor:</strong> R$ 293,47</li><li><strong>Medida administrativa:</strong> Não aplicável</li></ul>
<div class="msg__note"><strong>Dispensa abordagem:</strong> a infração pode ser constatada sem abordagem, por sistemas de fiscalização eletrônica ou observação direta.</div>
<div class="msg__why">Se o condutor estiver mexendo na tela, o código é o ${CHIP('763-32')} — dirigir veículo <strong>manuseando</strong> telefone celular.</div>`
    },
    cinto: {
      q: 'condutor dirigindo sem cinto de segurança',
      a: `<div class="msg__title">Infração ${CHIP('518-51')}</div>
<p>Deixar o condutor de usar o <strong>cinto de segurança</strong>.</p>
<ul><li><strong>Artigo:</strong> 167</li><li><strong>Gravidade:</strong> Grave</li><li><strong>Pontos:</strong> 5 pontos</li><li><strong>Valor:</strong> R$ 195,23</li><li><strong>Medida administrativa:</strong> retenção do veículo até a colocação do cinto pelo infrator</li></ul>
<div class="msg__note"><strong>Atenção:</strong> ainda que haja mais de um ocupante sem cinto (incluído o condutor), só cabe <strong>uma</strong> autuação pelo art. 167. Se o motivo for falta ou defeito no equipamento, autue apenas pelo art. 230, IX.</div>`
    },
    fallback: {
      a: `<p>Essa eu respondo no app! 📲</p>
<p>Nesta demonstração do site, toque em um dos exemplos. No Tá Safo, o assistente analisa <strong>qualquer situação</strong> com as 414 infrações e as orientações de fiscalização cadastradas.</p>
<p><a href="#baixar" style="color:var(--navy);font-weight:800">Baixar o Tá Safo →</a></p>`
    }
  };
  const chatBody = $('#chatBody');
  const chatForm = $('#chatForm');
  const chatInput = $('#chatInput');
  const chatChips = $$('.chat__chips .chip');
  let busy = false;
  let followMsg = null;
  const scrollChat = () => {
    let target = chatBody.scrollHeight;
    if (followMsg) target = Math.min(target, followMsg.offsetTop - 10);
    chatBody.scrollTop = target;
  };
  const addMsg = (who, html) => {
    const m = document.createElement('div');
    m.className = `msg msg--${who}`;
    m.innerHTML = who === 'bot' ? `<span class="mascot">${MASCOT_SVG}</span><div class="msg__bubble">${html}</div>` : `<div class="msg__bubble">${html}</div>`;
    chatBody.appendChild(m);
    const mm = m.querySelector('.mascot');
    if (mm) { mio.observe(mm); }
    scrollChat();
    return m;
  };
  const stream = (bubble) => new Promise((resolve) => {
    if (!motionOK) { resolve(); return; }
    const walker = document.createTreeWalker(bubble, NodeFilter.SHOW_TEXT);
    const texts = [];
    while (walker.nextNode()) texts.push(walker.currentNode);
    const words = [];
    texts.forEach((tn) => {
      if (!tn.textContent.trim()) return;
      const frag = document.createDocumentFragment();
      tn.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        const s = document.createElement('span');
        s.className = 'stream-w'; s.textContent = part;
        frag.appendChild(s); words.push(s);
      });
      tn.replaceWith(frag);
    });
    const blocks = $$('.code-chip, .msg__why, .msg__note', bubble);
    blocks.forEach((b) => { b.style.opacity = 0; b.style.transition = 'opacity .3s'; });
    let i = 0;
    const tick = () => {
      const n = Math.min(words.length, i + 3);
      for (; i < n; i++) {
        words[i].classList.add('on');
        const blk = words[i].closest('.code-chip, .msg__why, .msg__note');
        if (blk) blk.style.opacity = 1;
      }
      scrollChat();
      if (i < words.length) setTimeout(tick, 34); else { blocks.forEach((b) => { b.style.opacity = 1; }); resolve(); }
    };
    tick();
  });
  const ask = async (key, userText) => {
    if (busy) return;
    busy = true;
    chatChips.forEach((c) => { c.disabled = true; });
    addMsg('user', escapeHTML(userText));
    const typing = addMsg('bot', '<span class="typing" aria-label="Digitando"><i></i><i></i><i></i></span>');
    $('.msg__bubble', typing).style.padding = '0';
    await new Promise((r) => setTimeout(r, motionOK ? 1100 : 0));
    typing.remove();
    const m = addMsg('bot', ANSWERS[key].a);
    followMsg = m; scrollChat();
    await stream($('.msg__bubble', m));
    scrollChat(); followMsg = null;
    busy = false;
    chatChips.forEach((c) => { c.disabled = false; });
  };
  const route = (text) => {
    const t = normalize(text);
    const cel = /(celular|telefone|smartphone|whats|zap|iphone)/.test(t);
    if (/(video|filme|serie|youtube|netflix)/.test(t) || (cel && /(painel|suporte)/.test(t))) return 'video';
    if (cel) return 'segurando';
    if (/cinto/.test(t)) return 'cinto';
    return 'fallback';
  };
  chatChips.forEach((c) => c.addEventListener('click', () => {
    chatChips.forEach((x) => x.classList.remove('is-active'));
    c.classList.add('is-active');
    ask(c.dataset.ask, ANSWERS[c.dataset.ask].q);
  }));
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = chatInput.value.trim();
    if (!v || busy) return;
    chatInput.value = '';
    chatChips.forEach((x) => x.classList.remove('is-active'));
    ask(route(v), v);
  });

  /* ---------- Busca de crimes ---------- */
  const crimeInput = $('#crimeInput');
  const crimeList = $('#crimeList');
  if (crimeInput && crimeList) {
    const crimes = $$('.crime', crimeList);
    const empty = document.createElement('p');
    empty.className = 'crime-empty'; empty.hidden = true;
    empty.textContent = 'Nenhum crime nesta amostra. No app, a busca cobre os arts. 302 a 312.';
    crimeList.appendChild(empty);
    crimeInput.addEventListener('input', () => {
      const q = normalize(crimeInput.value.trim());
      let n = 0;
      crimes.forEach((c) => { const ok = !q || normalize(`${c.textContent} ${c.dataset.kw || ''}`).includes(q); c.hidden = !ok; if (ok) n++; });
      empty.hidden = n > 0;
    });
  }

  /* ---------- Pipeline ("como funciona") ---------- */
  const stepsEl = $('#steps');
  const stepEls = stepsEl ? $$('.step', stepsEl) : [];
  const lineFill = stepsEl ? $('.steps__line i', stepsEl) : null;
  function updatePipeline() {
    if (!stepsEl) return;
    const r = stepsEl.getBoundingClientRect();
    const p = clamp((innerHeight * .62 - r.top) / r.height, 0, 1);
    lineFill.style.setProperty('--p', p.toFixed(3));
    stepEls.forEach((s) => {
      const sr = s.getBoundingClientRect();
      s.classList.toggle('is-lit', sr.top + 28 < innerHeight * .62);
    });
  }

  /* ---------- Ficha (scrollytelling) ---------- */
  const fsteps = $$('.fstep');
  const fLayers = $$('#fichaScreens .screen-layer');
  const fDots = $$('#fichaDots i');
  const setFicha = (idx) => {
    fsteps.forEach((s, i) => s.classList.toggle('is-active', i === idx));
    fLayers.forEach((l, i) => l.classList.toggle('is-active', i === idx));
    fDots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
  };
  const fio = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) setFicha(+en.target.dataset.screen); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  fsteps.forEach((s) => fio.observe(s));
  setFicha(0);

  /* ---------- Busca ---------- */
  const INFRACOES = [
    { code: '518-51', art: 'Art. 167.', sev: 'Grave', desc: 'Deixar o condutor de usar o cinto de segurança.', pts: 5 },
    { code: '518-52', art: 'Art. 167.', sev: 'Grave', desc: 'Deixar o passageiro de usar o cinto de segurança.', pts: 5 },
    { code: '663-72', art: 'Art. 230, IX', sev: 'Grave', desc: 'Conduzir o veículo com equipamento obrigatório ineficiente/inoperante', pts: 5, kw: 'cinto de seguranca com defeito' },
    { code: '664-50', art: 'Art. 230, X', sev: 'Grave', desc: 'Conduzir o veículo com equip obrigatório em desacordo com o estab pelo Contran', pts: 5, kw: 'cinto de seguranca' },
    { code: '763-31', art: 'Art. 252, parágrafo único', sev: 'Gravíssima', desc: 'Dirigir veículo segurando telefone celular', pts: 7 },
    { code: '763-32', art: 'Art. 252, parágrafo único', sev: 'Gravíssima', desc: 'Dirigir veículo manuseando telefone celular', pts: 7 },
    { code: '779-00', art: 'Art. 165-B, caput', sev: 'Gravíssima', desc: 'Dirigir veículo sem realizar o exame toxicológico previsto no caput do art. 148-A', pts: 7 },
    { code: '780-30', art: 'Art. 165-B c/c o parágrafo único', sev: 'Gravíssima', desc: 'Dirigir veículo sem realizar o exame toxicológico previsto no § 2º do art. 148-A', pts: 7 },
    { code: '781-10', art: 'Art. 165-C', sev: 'Gravíssima', desc: 'Dirigir veículo tendo obtido resultado positivo no exame toxicológico previsto no caput do art. 148-A', pts: 7 },
    { code: '782-00', art: 'Art. 165-D', sev: 'Gravíssima', desc: 'Deixar de realizar o exame toxicológico previsto no § 2º do art. 148-A, após 30 (trinta) dias do vencimento', pts: 7 }
  ];
  const favs = new Set(['518-51', '763-31']);
  const searchInput = $('#searchInput');
  const results = $('#results');
  const countEl = $('#searchCount');
  let filter = 'all';
  const hl = (text, q) => {
    const safe = escapeHTML(text);
    if (!q) return safe;
    const nt = normalize(safe);
    const i = nt.indexOf(q);
    if (i < 0) return safe;
    return safe.slice(0, i) + '<mark class="hl">' + safe.slice(i, i + q.length) + '</mark>' + safe.slice(i + q.length);
  };
  const renderSearch = () => {
    const q = normalize(searchInput.value.trim());
    const qDigits = q.replace(/[^0-9]/g, '');
    const list = INFRACOES.filter((it) => {
      if (filter === 'fav' && !favs.has(it.code)) return false;
      if (filter !== 'all' && filter !== 'fav' && it.sev !== filter) return false;
      if (!q) return true;
      const hay = normalize(`${it.code} ${it.art} ${it.desc} ${it.sev} ${it.kw || ''}`);
      if (hay.includes(q)) return true;
      if (qDigits && qDigits.length >= 3 && (it.code.replace('-', '').includes(qDigits) || it.art.replace(/[^0-9]/g, ' ').split(' ').includes(qDigits))) return true;
      return false;
    });
    countEl.textContent = `${list.length} ${list.length === 1 ? 'infração encontrada' : 'infrações encontradas'}`;
    if (!list.length) {
      results.innerHTML = `<div class="empty">Nada nesta amostra do site.<br />No app, a busca percorre as 414 infrações.</div>`;
      return;
    }
    results.innerHTML = list.map((it, i) => `
      <article class="icard" style="--i:${i}">
        <div class="icard__code">${hl(it.code, q)} · ${hl(it.art, q)}</div>
        <div class="icard__right">
          <span class="badge ${it.sev === 'Grave' ? 'badge--grave' : 'badge--gravissima'}">${it.sev}</span>
          <button class="star" type="button" data-fav="${it.code}" aria-pressed="${favs.has(it.code)}" aria-label="Favoritar ${it.code}">${icon('i-star')}</button>
        </div>
        <p class="icard__desc">${hl(it.desc, q)}</p>
        <p class="icard__pts">Pontos: <b>${it.pts}</b></p>
      </article>`).join('');
  };
  searchInput.addEventListener('input', renderSearch);
  $$('.search__filters .chip').forEach((c) => c.addEventListener('click', () => {
    filter = c.dataset.filter;
    $$('.search__filters .chip').forEach((x) => { x.classList.toggle('is-active', x === c); x.setAttribute('aria-pressed', x === c); });
    renderSearch();
  }));
  results.addEventListener('click', (e) => {
    const b = e.target.closest('.star');
    if (!b) return;
    const code = b.dataset.fav;
    favs.has(code) ? favs.delete(code) : favs.add(code);
    b.setAttribute('aria-pressed', favs.has(code));
    if (filter === 'fav') renderSearch();
  });
  // digitação automática de exemplo, uma vez, quando a seção aparece
  let userTyped = false;
  searchInput.addEventListener('focus', () => { userTyped = true; });
  const typeInto = async (text) => {
    searchInput.value = '';
    for (const ch of text) { searchInput.value += ch; renderSearch(); await new Promise((r) => setTimeout(r, motionOK ? 110 : 0)); }
  };
  $$('[data-try]').forEach((b) => b.addEventListener('click', () => { userTyped = true; typeInto(b.dataset.try); }));
  renderSearch();
  new IntersectionObserver(([en], obs) => {
    if (en.isIntersecting) { obs.disconnect(); setTimeout(() => { if (!userTyped && !searchInput.value) typeInto('cinto'); }, 500); }
  }, { threshold: .5 }).observe($('.search__demo'));

  /* ---------- Calculadora do etilômetro ---------- */
  const calcInput = $('#calcInput');
  const calcRange = $('#calcRange');
  const calcResult = $('#calcResult');
  const marker = $('#gaugeMarker');
  const parseVal = (s) => { const t = String(s).trim(); if (!/^\d+([.,]\d+)?$/.test(t)) return null; return parseFloat(t.replace(',', '.')); };
  const fmt2 = (v) => v.toFixed(2).replace('.', ',');
  const gaugePos = (v) => {
    // escala por zona: 0–0,04 | 0,05–0,33 | 0,34–0,60
    if (v <= .045) return (v / .045) * 8.33;
    if (v < .335) return 8.33 + ((v - .045) / .29) * 48.33;
    return 56.66 + clamp((v - .335) / .265, 0, 1) * 43.34;
  };
  let lastState = '';
  const renderCalc = (v) => {
    if (v === null || v < 0) {
      calcResult.className = 'result';
      calcResult.innerHTML = '<p>Digite o valor medido pelo etilômetro, em mg/L (ex.: 0,42).</p>';
      lastState = '';
      return;
    }
    const r = Math.round(v * 100) / 100;
    marker.style.left = `${gaugePos(r)}%`;
    let state, html;
    if (r <= .04) {
      state = 'ok';
      html = `<h4>${icon('i-check')}Dentro da tolerância</h4><p><strong>${fmt2(r)} mg/L</strong> — até 0,04 mg/L: sem providências.</p>`;
    } else if (r <= .33) {
      state = 'inf';
      html = `<h4>${icon('i-alert')}Resultado: Infração de Trânsito</h4><p><strong>${fmt2(r)} mg/L</strong> — de 0,05 a 0,33 mg/L: infração de trânsito (art. 165 do CTB).</p><small>No app, as providências a serem tomadas aparecem junto com o resultado.</small>`;
    } else {
      state = 'crime';
      html = `<h4>${icon('i-alert')}Resultado: Crime de Trânsito</h4><p><strong>${fmt2(r)} mg/L</strong> — a partir de 0,34 mg/L. Providências a serem tomadas:</p><ol><li>Lavrar o Auto de Infração de Trânsito (AIT) pelo art. 165 do CTB</li><li>Conduzir o condutor à Delegacia de Polícia pelo crime do art. 306 do CTB</li><li>Reter o veículo até a apresentação de condutor habilitado</li></ol>`;
    }
    calcResult.className = `result result--${state}`;
    calcResult.innerHTML = html;
    if (state !== lastState && lastState) { calcResult.classList.remove('pulse'); void calcResult.offsetWidth; calcResult.classList.add('pulse'); }
    lastState = state;
  };
  calcInput.addEventListener('input', () => {
    calcInput.value = calcInput.value.replace(/[^0-9.,]/g, '');
    const v = parseVal(calcInput.value);
    if (v !== null) calcRange.value = Math.min(v, .6);
    renderCalc(v);
  });
  calcRange.addEventListener('input', () => { const v = +calcRange.value; calcInput.value = fmt2(v); renderCalc(v); });
  $$('[data-val]').forEach((b) => b.addEventListener('click', () => { calcInput.value = b.dataset.val; const v = parseVal(b.dataset.val); calcRange.value = v; renderCalc(v); }));
  renderCalc(.42);

  /* ---------- Tutorial de abordagem ---------- */
  const VEH = {
    'Carro de passeio': { cat: 'Veículos leves', meta: '2 documentos · 10 passos' },
    'Motocicleta': {
      cat: 'Veículos de duas rodas', meta: '2 documentos · 11 passos',
      docs: ['Certificado de Registro e Licenciamento de Veículo (CRLV)', 'Carteira Nacional de Habilitação (CNH) categoria A'],
      steps: ['Posicione a viatura em local seguro e visível', 'Sinalize com giroflex ou lanterna para que a motocicleta pare', 'Oriente o condutor a desligar o motor e colocar o veículo no descanso lateral', 'Aborde pela lateral, mantendo distância segura', 'Apresente-se e explique o motivo da abordagem', 'Solicite documentos do condutor (CNH) e do veículo (CRLV)']
    },
    'Motocicleta elétrica': { cat: 'Veículos de duas rodas', meta: '3 documentos · 9 passos' },
    'Ônibus': { cat: 'Veículos pesados', meta: '2 documentos · 12 passos' },
    'Caminhão': { cat: 'Veículos pesados', meta: '3 documentos · 15 passos' },
    'Produtos perigosos': { cat: 'Veículos especiais', meta: '5 documentos · 16 passos' },
    'Produtos perecíveis': { cat: 'Veículos especiais' },
    'Trator': {}
  };
  const abordPanel = $('#abordPanel');
  const vehBtns = $$('.veh');
  const renderVeh = (name) => {
    const v = VEH[name] || {};
    let html = `<h4>Abordagem: ${name}</h4>`;
    if (v.cat || v.meta) html += `<p style="font-size:13px;color:var(--muted);font-weight:700;margin-top:2px">${[v.cat, v.meta].filter(Boolean).join(' · ')}</p>`;
    if (v.docs) html += `<h5>Documentos necessários</h5><ul class="abord__docs">${v.docs.map((d) => `<li>${d}</li>`).join('')}</ul>`;
    if (v.steps) html += `<h5>Passos para abordagem</h5><ol class="abord__steps">${v.steps.map((s, i) => `<li style="--i:${i}">${s}</li>`).join('')}</ol><p style="font-size:13px;color:var(--muted);font-weight:700;margin-top:10px">…e os demais passos no app.</p>`;
    else html += `<h5>No app</h5><ol class="abord__steps"><li style="--i:0">Documentos necessários</li><li style="--i:1">Passos da abordagem</li><li style="--i:2">Itens a verificar</li></ol>`;
    html += `<div class="abord__lock">${icon('i-lock')}Há também um conteúdo operacional liberado apenas para profissionais com acesso autorizado.</div>`;
    abordPanel.innerHTML = html;
  };
  vehBtns.forEach((b) => b.addEventListener('click', () => {
    vehBtns.forEach((x) => x.setAttribute('aria-pressed', x === b));
    renderVeh(b.textContent.trim());
  }));
  renderVeh('Motocicleta');

  /* ---------- Placas (SVG) ---------- */
  const RED = '#D71920';
  const ring = (inner, slash) => `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="45" fill="#fff" stroke="${RED}" stroke-width="9"/>${inner}${slash ? `<path d="M19 19 81 81" stroke="${RED}" stroke-width="8.5"/>` : ''}</svg>`;
  const oct = (() => { const pts = []; for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; pts.push(`${(50 + 48 * Math.cos(a)).toFixed(2)},${(50 + 48 * Math.sin(a)).toFixed(2)}`); } return pts.join(' '); })();
  const oct2 = (() => { const pts = []; for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; pts.push(`${(50 + 42 * Math.cos(a)).toFixed(2)},${(50 + 42 * Math.sin(a)).toFixed(2)}`); } return pts.join(' '); })();
  const PLATES = [
    { code: 'R-1', name: 'Parada obrigatória', svg: `<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="${oct}" fill="${RED}"/><polygon points="${oct2}" fill="none" stroke="#fff" stroke-width="3"/><text x="50" y="59" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="800" font-size="25" fill="#fff">PARE</text></svg>` },
    { code: 'R-2', name: 'Dê a preferência', svg: `<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="8,14 92,14 50,90" fill="#fff" stroke="${RED}" stroke-width="10" stroke-linejoin="round"/></svg>` },
    { code: 'R-3', name: 'Sentido proibido', svg: ring('<path d="M50 80V36" stroke="#111" stroke-width="10"/><path d="M50 17 33 40h34z" fill="#111"/>', true) },
    { code: 'R-4a', name: 'Proibido virar à esquerda', svg: ring('<path d="M60 80V52q0-12-12-12H42" fill="none" stroke="#111" stroke-width="10"/><path d="M24 40 44 26v28z" fill="#111"/>', true) },
    { code: 'R-5a', name: 'Proibido retornar à esquerda', svg: ring('<path d="M62 80V44a12 12 0 0 0-24 0v8" fill="none" stroke="#111" stroke-width="9"/><path d="M38 72 25 52h26z" fill="#111"/>', true) },
    { code: 'R-6a', name: 'Proibido estacionar', svg: ring('<text x="50" y="68" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="800" font-size="50" fill="#111">E</text>', true) },
    { code: 'R-6b', name: 'Estacionamento regulamentado', svg: ring('<text x="50" y="68" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="800" font-size="50" fill="#111">E</text>', false) },
    { code: 'R-19', name: 'Velocidade máxima permitida', svg: ring('<text x="50" y="60" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="800" font-size="34" fill="#111">80</text><text x="50" y="74" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="700" font-size="9" fill="#111">km/h</text>', false) }
  ];
  const platesEl = $('#plates');
  platesEl.innerHTML = PLATES.map((p) => `
    <button class="plate" type="button" aria-label="Placa ${p.code}: ${p.name}">
      <span class="plate__inner">
        <span class="plate__face plate__front">${p.svg}<span>${p.code}</span></span>
        <span class="plate__face plate__back"><strong>${p.code}</strong><span>${p.name}</span></span>
      </span>
    </button>`).join('');
  $$('.plate', platesEl).forEach((p) => p.addEventListener('click', () => p.classList.toggle('is-flipped')));

  /* ---------- Diferenciar veículos ---------- */
  const DIF = [
    { n: 'Reboque', ic: 'i-truck', t: 'Os reboques são veículos não automotores destinados a serem engatados e tracionados por outro veículo…', m: '8 pontos principais para verificação' },
    { n: 'Semirreboque', ic: 'i-truck', t: 'Os semirreboques são veículos não automotores projetados para serem tracionados por caminhões…', m: '8 pontos principais para verificação' },
    { n: 'Triciclo', ic: 'i-moto', t: 'Os triciclos são veículos motorizados de três rodas, classificados pelo CTB em diferentes categorias…', m: '8 pontos principais para verificação' },
    { n: 'Caminhonete', ic: 'i-car', t: 'As caminhonetes (picapes) são veículos projetados para transporte de carga…', m: '8 pontos principais para verificação' },
    { n: 'Camioneta', ic: 'i-car', t: 'As camionetas são veículos classificados como “mistos” pelo Código de Trânsito Brasileiro…', m: '8 pontos principais para verificação' },
    { n: 'Moto elétrica', ic: 'i-zap', t: 'Com potência superior a 4 kW e/ou capazes de passar de 50 km/h, exigem CNH categoria A, registro e licenciamento, placa e capacete. Com potência igual ou inferior a 4 kW e velocidade máxima de 50 km/h, podem ser classificadas como bicicletas elétricas ou ciclomotores elétricos.', m: '4 pontos principais para verificação' },
    { n: 'Bicicleta elétrica', ic: 'i-zap' },
    { n: 'Ciclomotor', ic: 'i-moto' },
    { n: 'Autopropelido', ic: 'i-zap' },
    { n: 'Quadriciclo', ic: 'i-car' },
    { n: 'Trator', ic: 'i-tractor' }
  ];
  const difChips = $('#difChips');
  const difCard = $('#difCard');
  difChips.innerHTML = DIF.map((d, i) => `<button class="chip" type="button" data-dif="${i}" aria-pressed="false">${d.n}</button>`).join('');
  const renderDif = (i) => {
    const d = DIF[i];
    $$('.chip', difChips).forEach((c) => { const on = +c.dataset.dif === i; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', on); });
    difCard.innerHTML = `<div class="fade-swap"><h4><span class="tool__icon ic-purple">${icon(d.ic)}</span>${d.n}</h4>
      <p>${d.t || 'No app: descrição, o que a lei exige e os pontos a verificar na fiscalização.'}</p>
      ${d.m ? `<p style="margin-top:14px;font-weight:800;color:var(--navy);font-size:14px">${d.m}</p>` : ''}</div>`;
  };
  difChips.addEventListener('click', (e) => { const c = e.target.closest('[data-dif]'); if (c) renderDif(+c.dataset.dif); });
  renderDif(5);

  /* ---------- Vídeos: carregar e tocar só quando visíveis ---------- */
  const setToggleIcon = (btn, playing) => {
    btn.innerHTML = icon(playing ? 'i-pause' : 'i-play');
    btn.setAttribute('aria-label', playing ? 'Pausar vídeo' : 'Reproduzir vídeo');
  };
  const loadVideo = (v) => {
    if (v.dataset.loaded) return;
    v.dataset.loaded = '1';
    $$('source[data-src]', v).forEach((s) => { s.src = s.dataset.src; });
    v.load();
  };
  $$('.lazy-video').forEach((v) => {
    const btn = v.parentElement.querySelector('.video-toggle');
    let userPaused = false;
    const load = () => loadVideo(v);
    const play = () => { load(); const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { if (!userPaused && motionOK) play(); else load(); }
      else if (!v.paused) v.pause();
    }, { threshold: .35 }).observe(v);
    v.addEventListener('play', () => btn && setToggleIcon(btn, true));
    v.addEventListener('pause', () => btn && setToggleIcon(btn, false));
    if (btn) {
      setToggleIcon(btn, false);
      btn.addEventListener('click', () => {
        if (v.paused) { userPaused = false; play(); } else { userPaused = true; v.pause(); }
      });
    }
  });

  /* ---------- Tour: capítulos ---------- */
  const tourVideo = $('#tourVideo');
  const CHAPTERS = [
    [0, 'Início'], [2, 'Ficha da 518-51'], [8, 'Quando autuar'], [13, 'Orientação aberta'], [19, 'Quando não autuar'],
    [21, 'Outras situações e texto do AIT'], [28.5, 'Menu'], [30, 'Placas de regulamentação'], [41, 'Detalhe da placa R-9'], [48, 'Favoritos']
  ];
  const chaptersEl = $('#chapters');
  const mmss = (s) => `0:${String(Math.floor(s)).padStart(2, '0')}`;
  chaptersEl.innerHTML = CHAPTERS.map(([t, n], i) => `<li><button class="chapter" type="button" data-t="${t}" data-i="${i}" aria-label="${mmss(t)} — ${n}"><span class="chapter__t" aria-hidden="true">${mmss(t)}</span><span>${n}</span>${icon('i-play')}<i class="chapter__bar"></i></button></li>`).join('');
  const chBtns = $$('.chapter', chaptersEl);
  const tourProgress = $('#tourProgress');
  const updateChapters = () => {
    const t = tourVideo.currentTime, dur = tourVideo.duration || 49.4;
    let idx = 0;
    CHAPTERS.forEach(([s], i) => { if (t >= s - .05) idx = i; });
    chBtns.forEach((b, i) => {
      b.classList.toggle('is-active', i === idx);
      const s = CHAPTERS[i][0], e = CHAPTERS[i + 1] ? CHAPTERS[i + 1][0] : dur;
      $('.chapter__bar', b).style.width = i === idx ? `${clamp((t - s) / (e - s), 0, 1) * 100}%` : '0';
    });
    tourProgress.style.transform = `scaleX(${clamp(t / dur, 0, 1)})`;
  };
  tourVideo.addEventListener('timeupdate', updateChapters);
  tourVideo.addEventListener('ended', () => { tourVideo.currentTime = 0; tourVideo.play().catch(() => {}); });
  chBtns.forEach((b) => b.addEventListener('click', () => {
    loadVideo(tourVideo);
    const go = () => { tourVideo.currentTime = +b.dataset.t + .05; tourVideo.play().catch(() => {}); updateChapters(); };
    if (tourVideo.readyState >= 1) go(); else tourVideo.addEventListener('loadedmetadata', go, { once: true });
  }));
  updateChapters();

  /* ---------- Galeria ---------- */
  const SHOTS = [
    ['03-inicio', 'Início', 'Busca, acesso rápido e infrações consultadas recentemente'],
    ['27-assistente-ia', 'Assistente', 'Assistente de infrações com mensagem de boas-vindas'],
    ['28-assistente-resposta', 'Assistente', 'Resposta com a infração 763-32 identificada'],
    ['04-lista-infracoes', 'Infrações', 'Lista com as 414 infrações, filtros por gravidade e favoritos'],
    ['05-busca-infracao', 'Busca', 'Busca por “cinto” encontrando 4 infrações'],
    ['06-ficha-infracao', 'Ficha', '518-51: valor, pontos, infrator, competência e como proceder'],
    ['06b-ficha-infracao-celular', 'Ficha', '763-31: dirigir segurando celular'],
    ['07-quando-autuar-e-nao-autuar', 'Orientações', 'Balões verdes (autuar) e vermelhos (não autuar)'],
    ['08-orientacao-aberta', 'Orientações', 'Não autuar: veículos de coleção sem cinto original'],
    ['09-campo-observacao-ait', 'AIT', 'Texto pronto para o campo de observação, com botão Copiar'],
    ['10-crimes-de-transito', 'Crimes', 'Crimes do CTB com selo de flagrante e pena'],
    ['11-ficha-crime', 'Crimes', 'Ficha do crime do art. 306 (embriaguez ao volante)'],
    ['12-crime-pena-flagrante', 'Crimes', 'Pena de detenção e aviso de prisão em flagrante'],
    ['13-favoritos', 'Favoritos', 'Favoritos com abas Infrações e Crimes'],
    ['14-menu', 'Menu', 'Assistente, consultas e ferramentas de campo'],
    ['15-calculadora-etilometro', 'Etilômetro', '0,42 mg/L = crime de trânsito, com as providências'],
    ['16-modelos-historicos', 'Históricos', 'Modelos por categoria: acidentes, embriaguez, inabilitado, diversas'],
    ['17-historico-pronto', 'Históricos', 'Modelo de embriaguez (infração) pronto para copiar'],
    ['18-tutorial-abordagem', 'Abordagem', 'Tutorial de abordagem por tipo de veículo'],
    ['19-abordagem-motocicleta', 'Abordagem', 'Motocicleta: documentos e passo a passo'],
    ['20-diferenciar-veiculos', 'Veículos', 'Reboque, semirreboque, triciclos, caminhonetes…'],
    ['21-motos-eletricas', 'Veículos', 'Como classificar motocicletas elétricas'],
    ['22-placas-regulamentacao', 'Placas', 'Grade com as placas de regulamentação'],
    ['23-placa-detalhe', 'Placas', 'Detalhe da R-4a — proibido virar à esquerda'],
    ['24-resolucoes-contran', 'CONTRAN', 'Resoluções do CONTRAN, com a 1.031/2026 no topo'],
    ['25-resolucao-resumo', 'CONTRAN', 'Resumo da Resolução 1.031/2026'],
    ['02-tutorial-primeiro-acesso', 'Primeiro acesso', 'Tutorial que apresenta as abas do app']
  ];
  const rail = $('#rail');
  rail.innerHTML = SHOTS.map(([f, k, c], i) => `
    <button class="shot" type="button" data-i="${i}" aria-label="Ampliar tela: ${escapeHTML(c)}">
      <span class="phone"><span class="phone__screen" style="display:block"><img src="${PRINTS}${f}.webp" width="720" height="1564" alt="${escapeHTML(c)}" loading="lazy" decoding="async" draggable="false" /></span></span>
      <span class="shot__cap"><small>${k}</small>${c}</span>
    </button>`).join('');
  const railProg = $('#railProgress');
  const updateRail = () => {
    const max = rail.scrollWidth - rail.clientWidth;
    const vis = rail.clientWidth / rail.scrollWidth;
    railProg.style.width = `${vis * 100}%`;
    railProg.style.transform = `translateX(${max > 0 ? (rail.scrollLeft / max) * ((1 - vis) / vis) * 100 : 0}%)`;
  };
  rail.addEventListener('scroll', () => requestAnimationFrame(updateRail), { passive: true });
  window.addEventListener('resize', updateRail);
  updateRail();
  const railStep = () => Math.max(260, rail.clientWidth * .8);
  $('#railPrev').addEventListener('click', () => rail.scrollBy({ left: -railStep(), behavior: motionOK ? 'smooth' : 'auto' }));
  $('#railNext').addEventListener('click', () => rail.scrollBy({ left: railStep(), behavior: motionOK ? 'smooth' : 'auto' }));
  // arrastar com o mouse (com inércia)
  let drag = null, moved = false;
  rail.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag = { x: e.clientX, left: rail.scrollLeft, v: 0, lastX: e.clientX, t: performance.now() };
    moved = false;
  });
  window.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!moved && Math.abs(dx) > 5) { moved = true; rail.classList.add('is-dragging'); }
    if (!moved) return;
    rail.scrollLeft = drag.left - dx;
    const now = performance.now();
    drag.v = (e.clientX - drag.lastX) / Math.max(1, now - drag.t);
    drag.lastX = e.clientX; drag.t = now;
  });
  window.addEventListener('pointerup', () => {
    if (!drag) return;
    let v = drag.v * 16;
    drag = null;
    const coast = () => {
      if (Math.abs(v) < .5 || !motionOK) { rail.classList.remove('is-dragging'); return; }
      rail.scrollLeft -= v; v *= .94; requestAnimationFrame(coast);
    };
    if (moved) requestAnimationFrame(coast);
  });
  rail.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  rail.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); rail.scrollBy({ left: 254, behavior: motionOK ? 'smooth' : 'auto' }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); rail.scrollBy({ left: -254, behavior: motionOK ? 'smooth' : 'auto' }); }
  });

  /* Lightbox */
  const lb = $('#lightbox');
  const lbImg = $('#lbImg');
  const lbCap = $('#lbCap');
  let lbIndex = 0, lbOpener = null;
  const showLb = (i) => {
    lbIndex = (i + SHOTS.length) % SHOTS.length;
    const [f, , c] = SHOTS[lbIndex];
    lbImg.src = `${PRINTS}${f}.webp`; lbImg.alt = c; lbCap.textContent = c;
    const ph = $('.phone', lb); ph.style.animation = 'none'; void ph.offsetWidth; ph.style.animation = '';
  };
  rail.addEventListener('click', (e) => {
    const b = e.target.closest('.shot');
    if (!b) return;
    lbOpener = b;
    showLb(+b.dataset.i);
    if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  });
  const closeLb = () => { if (lb.open) lb.close(); };
  lb.addEventListener('close', () => { document.body.style.overflow = ''; if (lbOpener) lbOpener.focus(); });
  $('.lb-prev', lb).addEventListener('click', () => showLb(lbIndex - 1));
  $('.lb-next', lb).addEventListener('click', () => showLb(lbIndex + 1));
  $('.lightbox__close', lb).addEventListener('click', closeLb);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') showLb(lbIndex + 1);
    if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
  });
  let touchX = null;
  lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- Diversos ---------- */
  $('#year').textContent = new Date().getFullYear();
  onScroll();
})();
