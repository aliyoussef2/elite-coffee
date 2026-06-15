/* ══════════════════════════════════════════
   ELITE COFFEE — Navigation
   js/nav.js
   ══════════════════════════════════════════ */

const Nav = {
  init() {
    const mainNav   = document.getElementById('main-nav');
    const mobMenu   = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');

    // Scroll — add shadow + update active link
    window.addEventListener('scroll', () => {
      mainNav.classList.toggle('scrolled', window.scrollY > 30);
      this._updateActive();
    });

    // Hamburger toggle
    hamburger?.addEventListener('click', () => {
      mobMenu.classList.toggle('open');
    });

    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        Theme.toggle();
      });
    }

    // Basket button
    const basketBtn = document.getElementById('basket-btn');
    if (basketBtn) {
      basketBtn.addEventListener('click', function(e) {
        e.preventDefault();
        Basket.open();
      });
    }
  },

  scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    document.getElementById('mobile-menu')?.classList.remove('open');
  },

  _updateActive() {
    const sections = ['home', 'menu', 'about', 'hours'];
    let current = 'home';

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < 100) current = id;
    });

    document.querySelectorAll('.nav-link').forEach(btn => {
      btn.classList.toggle(
        'active',
        btn.dataset.section === current ||
        (current === 'hours' && btn.dataset.section === 'about')
      );
    });
  },
};