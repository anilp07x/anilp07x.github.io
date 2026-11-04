/* Três confortos, nenhum indispensável: a navegação marca a secção que se
   está a ler, uma luz suave segue o rato e as certificações abrem-se para
   imprimir. Sem JavaScript a página é exatamente a mesma, só mais quieta. */
(function () {
  'use strict';

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  activeNav();
  spotlight();

  /* Em papel um <details> fechado esconderia as certificações. */
  window.addEventListener('beforeprint', function () {
    Array.prototype.forEach.call(document.querySelectorAll('details'), function (d) { d.open = true; });
  });

  /* A secção ativa é a última cujo topo já passou dos 40% do ecrã; no fim da
     página é sempre a última (a secção de contacto é curta e nunca chegaria
     lá sozinha). */
  function activeNav() {
    var links = document.querySelectorAll('.nav a[href^="#"]');
    var items = [];
    Array.prototype.forEach.call(links, function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) items.push({ a: a, el: el });
    });
    if (!items.length) return;

    var frame = 0;

    function update() {
      frame = 0;
      var line = window.innerHeight * .4;
      var atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      var current = atEnd ? items[items.length - 1] : null;
      if (!current) {
        items.forEach(function (it) {
          if (it.el.getBoundingClientRect().top <= line) current = it;
        });
      }
      items.forEach(function (it) {
        var on = it === current;
        it.a.classList.toggle('is-active', on);
        if (on) it.a.setAttribute('aria-current', 'location');
        else it.a.removeAttribute('aria-current');
      });
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
  }

  /* Luz do cursor: só com rato e com movimento normal. Um fotograma por
     movimento, no máximo; parado não gasta nada. */
  function spotlight() {
    var light = document.querySelector('.spotlight');
    if (!light || !window.matchMedia) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var x = 0;
    var y = 0;
    var frame = 0;

    function paint() {
      frame = 0;
      light.style.setProperty('--x', x + 'px');
      light.style.setProperty('--y', y + 'px');
    }

    window.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      light.classList.add('is-on');
      if (!frame) frame = window.requestAnimationFrame(paint);
    }, { passive: true });

    document.documentElement.addEventListener('mouseleave', function () {
      light.classList.remove('is-on');
    });
  }
})();
