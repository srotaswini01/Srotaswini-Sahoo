(function () {
  // Home: Design / AI project tabs
  var works = document.getElementById('works');
  if (works) {
    var on = 'background: #FDFCF8; color: #101010; box-shadow: 0 1px 4px rgba(16,16,16,.09);';
    var off = 'background: transparent; color: #6f6959;';
    var base = 'padding: 7px 18px; border-radius: 999px; font: inherit; font-size: 13px; font-weight: 500; border: none; cursor: pointer; transition: background .18s ease, box-shadow .18s ease; ';
    var copy = {
      design: ['My selected works', 'With my keen eye for detail and sharp critical thinking skills, I specialise in crafting captivating websites, products, and experiences.'],
      ai: ['AI projects', 'Exploring how agentic systems can surface signals people miss — and turn them into accountable action.']
    };
    function show(tab) {
      document.getElementById('tab-design').classList.toggle('is-on', tab === 'design');
      document.getElementById('tab-ai').classList.toggle('is-on', tab === 'ai');
      document.getElementById('tab-heading').textContent = copy[tab][0];
      document.getElementById('tab-blurb').textContent = copy[tab][1];
      document.getElementById('design-projects').hidden = tab !== 'design';
      document.getElementById('ai-projects').hidden = tab !== 'ai';
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-tab]'), function (el) {
      el.addEventListener('click', function () { show(el.getAttribute('data-tab')); });
    });
    show('design');
  }

  // Know me: photo carousel (auto-advances every 4.5s; any manual control stops autoplay)
  var track = document.getElementById('gallery-track');
  if (track) {
    var n = track.children.length, cur = 0;
    var dots = Array.prototype.slice.call(document.querySelectorAll('#gallery-dots button'));
    function go(i) {
      cur = (i + n) % n;
      track.style.transform = 'translateX(-' + (cur * 100) + '%)';
      dots.forEach(function (d, k) {
        d.style.width = (k === cur ? 22 : 8) + 'px';
        d.style.background = k === cur ? '#101010' : '#E3DBCC';
      });
    }
    var timer = setInterval(function () { go(cur + 1); }, 4500);
    function manual(i) { clearInterval(timer); go(i); }
    document.getElementById('gallery-prev').addEventListener('click', function () { manual(cur - 1); });
    document.getElementById('gallery-next').addEventListener('click', function () { manual(cur + 1); });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { manual(k); }); });
    go(0);
  }

  // Case study: side nav highlights the section in view
  var side = document.querySelector('aside a[href^="#"]');
  if (side) {
    var links = Array.prototype.slice.call(document.querySelectorAll('aside a[href^="#"]'));
    var ids = links.map(function (a) { return a.getAttribute('href').slice(1); });
    function paint(c) { links.forEach(function (a) { var o = a.getAttribute('href') === '#' + c; a.style.borderLeft = o ? '2px solid #101010' : '2px solid #ECEAE4'; a.style.color = o ? '#101010' : '#8c8577'; a.style.fontWeight = o ? '600' : '500'; }); }
    function onScroll() { var c = ids[0]; for (var i = 0; i < ids.length; i++) { var el = document.getElementById(ids[i]); if (el && el.getBoundingClientRect().top < 160) c = ids[i]; } paint(c); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();

// Project cards with data-href navigate when clicked anywhere on the card
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('[data-href]'), function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return; // real links handle themselves
      window.location.href = card.getAttribute('data-href');
    });
  });
})();


// Home hero: open the airplane window shortly after load
(function () {
  var wrap = document.querySelector('.hero-window-wrap'); if (!wrap) return;
  var pw = wrap.querySelector('.pw');
  var open = function () { pw.classList.add('is-open'); wrap.classList.add('is-open'); };
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { open(); return; }
  window.setTimeout(open, 250);
})();
