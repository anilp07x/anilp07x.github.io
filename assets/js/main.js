/* Animações suaves de entrada (GSAP).
   Sem JavaScript, sem GSAP ou com movimento reduzido, o conteúdo fica
   simplesmente visível: a animação é sempre progressiva. */
(function () {
  'use strict';

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var gsapReady = typeof window.gsap !== 'undefined';
  var canObserve = 'IntersectionObserver' in window;
  if (!gsapReady || reduced || !canObserve) return;

  var revealTargets = document.querySelectorAll('[data-reveal]');

  try {
    heroIntro();
    scrollReveals();
  } catch (err) {
    if (window.gsap) gsap.set(document.querySelectorAll('[data-reveal], .word__i'), { clearProps: 'all' });
    console.warn('Animação desativada:', err);
  }

  /* Divide o nome em palavras, cada uma dentro da sua máscara.
     Os espaços ficam no texto: leitores de ecrã e copiar/colar não mudam. */
  function wrapWords(el) {
    var words = el.textContent.trim().split(/\s+/);
    var inners = [];
    el.textContent = '';

    words.forEach(function (word, index) {
      var mask = document.createElement('span');
      mask.className = 'word';

      var inner = document.createElement('span');
      inner.className = 'word__i';
      inner.textContent = word;

      mask.appendChild(inner);
      if (index > 0) el.appendChild(document.createTextNode(' '));
      el.appendChild(mask);
      inners.push(inner);
    });

    return inners;
  }

  /* Entrada do herói: régua a ser desenhada, meta, nome palavra a palavra, base. */
  function heroIntro() {
    var hero = document.querySelector('[data-hero]');
    if (!hero) return;

    var rule = hero.querySelector('.hero__rule');
    var metaItems = hero.querySelectorAll('.hero__meta > *');
    var nameEl = hero.querySelector('[data-split-words]');
    var words = nameEl ? wrapWords(nameEl) : [];
    var foot = hero.querySelectorAll('.hero__foot > *');
    var dot = hero.querySelector('.dot');

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (rule) tl.from(rule, { scaleX: 0, duration: .9, ease: 'power2.inOut' });

    if (metaItems.length) {
      tl.from(metaItems, { y: 12, autoAlpha: 0, duration: .5, stagger: .07 }, rule ? '-=.6' : 0);
    }

    if (words.length) {
      tl.from(words, { yPercent: 110, duration: .95, stagger: .075, ease: 'power4.out' }, '-=.35');
    }

    if (foot.length) {
      tl.from(foot, { y: 20, autoAlpha: 0, duration: .6, stagger: .1 }, '-=.55');
    }

    if (dot) tl.from(dot, { scale: 0, duration: .5, ease: 'back.out(2)' }, '-=.6');

    /* Rede de segurança: se o rAF estiver estrangulado (aba em segundo plano,
       por exemplo), o nome nunca pode ficar escondido atrás da máscara. */
    setTimeout(function () { if (tl.progress() < 1) tl.progress(1); }, 3600);
  }

  /* Blocos que aparecem à medida que entram no ecrã.
     O IntersectionObserver é o gatilho principal; um varrimento a cada
     scroll/resize garante que nenhum bloco fica escondido, mesmo se o
     observer perder um (scroll muito rápido, rAF estrangulado). */
  function scrollReveals() {
    if (!revealTargets.length) return;

    var pending = Array.prototype.slice.call(revealTargets);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) reveal(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .05 });

    function reveal(el) {
      var index = pending.indexOf(el);
      if (index === -1) return;
      pending.splice(index, 1);
      observer.unobserve(el);

      var tween = gsap.to(el, {
        y: 0,
        autoAlpha: 1,
        duration: .55,
        ease: 'power2.out',
        delay: Number(el.getAttribute('data-delay') || 0),
      });

      setTimeout(function () { if (tween.progress() < 1) tween.progress(1); }, 2200);

      if (!pending.length) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', sweep);
      }
    }

    var lastSweep = 0;
    function sweep() {
      lastSweep = Date.now();
      var limit = window.innerHeight * .94;
      pending.slice().forEach(function (el) {
        if (el.getBoundingClientRect().top < limit) reveal(el);
      });
    }
    function onScroll() {
      if (Date.now() - lastSweep < 150) return;
      sweep();
    }

    gsap.set(revealTargets, { y: 16, autoAlpha: 0 });

    Array.prototype.forEach.call(revealTargets, function (el) { observer.observe(el); });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', sweep);
    sweep();
  }
})();
