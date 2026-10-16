/* Animações suaves de entrada.
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
  var heroItems = document.querySelectorAll('[data-hero] > *');

  try {
    if (heroItems.length) {
      gsap.from(heroItems, {
        y: 18,
        autoAlpha: 0,
        duration: .7,
        ease: 'power2.out',
        stagger: .07,
      });
    }

    if (revealTargets.length) {
      gsap.set(revealTargets, { y: 16, autoAlpha: 0 });

      var observer = new IntersectionObserver(function (entries, self) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          self.unobserve(entry.target);
          gsap.to(entry.target, {
            y: 0,
            autoAlpha: 1,
            duration: .55,
            ease: 'power2.out',
            delay: Number(entry.target.getAttribute('data-delay') || 0),
          });
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: .05 });

      Array.prototype.forEach.call(revealTargets, function (el) {
        observer.observe(el);
      });
    }
  } catch (err) {
    if (window.gsap) gsap.set(revealTargets, { clearProps: 'all' });
    console.warn('Animação desativada:', err);
  }
})();
