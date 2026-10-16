/* Animações suaves de entrada (GSAP) e scroll suavizado (ScrollSmoother).
   Sem JavaScript, sem GSAP ou com movimento reduzido, o conteúdo fica
   simplesmente visível e a página rola como sempre: tudo isto é progressivo. */
(function () {
  'use strict';

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var gsapReady = typeof window.gsap !== 'undefined';
  var canObserve = 'IntersectionObserver' in window;
  if (!gsapReady || reduced || !canObserve) return;

  /* O scroll suavizado entra primeiro: fixa o wrapper e acerta a altura do
     body. Se falhar, a página fica simplesmente com o scroll nativo. */
  try {
    smoothScroll();
  } catch (err) {
    console.warn('Scroll suavizado desativado:', err);
  }

  try {
    heroIntro();
    scrollReveals();
  } catch (err) {
    if (window.gsap) gsap.set(document.querySelectorAll('[data-reveal], .word'), { clearProps: 'all' });
    console.warn('Animação desativada:', err);
  }

  /* ScrollSmoother: o conteúdo (dentro de um wrapper fixo) é deslocado por
     transform e segue o scroll com um pequeno atraso — é daí que vem a
     suavidade. Em ecrãs táteis mantém-se o scroll nativo, que é a predefinição
     do plugin, e o foco fora do conteúdo (o link de saltar) não o arrasta. */
  function smoothScroll() {
    if (typeof window.ScrollSmoother === 'undefined' || typeof window.ScrollTrigger === 'undefined') return;

    var skip = document.querySelector('.skip');
    var ignoreFocus = false;

    gsap.registerPlugin(window.ScrollTrigger, window.ScrollSmoother);
    var smoother = window.ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1,
      onFocusIn: function (self, e) {
        /* O foco que nós próprios damos aos destinos das âncoras não deve
           mexer no scroll, nem o link de saltar, que vive fora do conteúdo. */
        if (ignoreFocus || (skip && (skip === e.target || skip.contains(e.target)))) return false;
      }
    });

    if (!smoother) return;

    /* Âncoras internas: com o wrapper fixo, o salto nativo do browser tenta
       rolar o próprio wrapper e não acerta no destino. Nesse caso quem rola é
       o ScrollSmoother; com o wrapper normal (ecrã tátil, sem suavização)
       deixamos o browser fazer o que sempre fez. O foco vai para o destino,
       para quem navega por teclado continuar a partir dali. */
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!e.target || !e.target.closest) return;

      var wrapper = smoother.wrapper();
      if (!wrapper || window.getComputedStyle(wrapper).position !== 'fixed') return;

      var link = e.target.closest('a[href^="#"]');
      var hash = link && link.getAttribute('href');
      if (!hash || !/^#[A-Za-z][\w-]*$/.test(hash)) return;

      var target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      if (window.history && history.pushState) history.pushState(null, '', hash);

      ignoreFocus = true;
      if (typeof target.focus === 'function') {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
      ignoreFocus = false;

      smoother.scrollTo(target, true);
    });
  }

  /* Divide o nome em palavras, cada uma dentro da sua máscara, e devolve as
     palavras (o que é animado). O SplitText faz isso e mantém o nome
     acessível através de um aria-label completo, com espaços reais entre as
     palavras; sem o plugin, wrapWords cria exatamente a mesma estrutura. */
  function splitWords(el) {
    if (typeof window.SplitText !== 'undefined') {
      return window.SplitText.create(el, {
        type: 'words',
        mask: 'words',
        wordsClass: 'word',
        tag: 'span'
      }).words;
    }

    return wrapWords(el);
  }

  /* Mesma estrutura de classes que o SplitText: `.word-mask` (máscara) com a
     palavra em `.word`. Os espaços ficam no texto, por isso leitores de ecrã
     e copiar/colar não mudam. */
  function wrapWords(el) {
    var words = el.textContent.trim().split(/\s+/);
    var inners = [];
    el.textContent = '';

    words.forEach(function (word, index) {
      var mask = document.createElement('span');
      mask.className = 'word-mask';

      var inner = document.createElement('span');
      inner.className = 'word';
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
    var words = nameEl ? splitWords(nameEl) : [];
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
    var revealTargets = document.querySelectorAll('[data-reveal]');
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
