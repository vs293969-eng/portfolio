/* Portfolio scripts: theme, menu, active link, reveal, back-to-top, image fallback */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Theme: saved choice, otherwise device preference
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  function setTheme(isDark) {
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
  }
  setTheme(dark);
  document.getElementById('theme').addEventListener('click', function () {
    setTheme(root.getAttribute('data-theme') !== 'dark');
  });

  // Mobile menu: closes after a link is clicked
  var menu = document.getElementById('menu'), burger = document.getElementById('burger');
  burger.addEventListener('click', function () {
    burger.setAttribute('aria-expanded', menu.classList.toggle('open'));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  });

  // Active nav link while scrolling + reveal on scroll
  var links = menu.querySelectorAll('a');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('show');
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('main section').forEach(function (s) { io.observe(s); });

  // Back to top button
  var top = document.getElementById('top');
  window.addEventListener('scroll', function () { top.hidden = window.scrollY < 500; });
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // If an image file is missing, hide it so the fallback shows
  document.querySelectorAll('.photo img, .thumb img').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
