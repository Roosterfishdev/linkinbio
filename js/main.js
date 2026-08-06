(function () {
  'use strict';

  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.tab-panel');
  function setActiveTab(index) {
    tabs.forEach(function (tab, i) {
      var selected = i === index;
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(function (panel, i) {
      var active = i === index;
      panel.classList.toggle('is-active', active);
      panel.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      setActiveTab(index);
    });
    tab.addEventListener('keydown', function (e) {
      var next;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next = (index + 1) % tabs.length;
        tabs[next].focus();
        setActiveTab(next);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        next = (index - 1 + tabs.length) % tabs.length;
        tabs[next].focus();
        setActiveTab(next);
      } else if (e.key === 'Home') {
        e.preventDefault();
        tabs[0].focus();
        setActiveTab(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        var last = tabs.length - 1;
        tabs[last].focus();
        setActiveTab(last);
      }
    });
  });

  var translations = {
    en: {
      pageTitle: 'Julian C. — Developer Portfolio',
      handle: 'UX / UI / WEB DEV',
      bio: 'Building Zaldo, a personal finance app for Costa Ricans. Founder of Dieresis, where we build websites, web apps, and mobile applications. Creator of EZLaunch, simple static website hosting.',
      comingSoon: 'Coming soon',
      waitlistTitle: 'Join the Zaldo waitlist',
      spotsTaken: ' / 100 spots taken',
      emailLabel: 'Email',
      emailPlaceholder: 'Your email',
      joinWaitlist: 'Join waitlist',
      successTitle: "You're on the list!",
      successSub: "We'll email you when Zaldo opens.",
      joining: 'Joining…',
      tabProjects: 'Projects',
      tabContact: 'Contact',
      tagFintech: 'Fintech',
      tagSaas: 'SaaS',
      tagAgency: 'Web Agency',
      tagHosting: 'Hosting',
      descZaldo: "Turns your bank's email alerts into automatic expense tracking. Smart categories, spending limits, and clear monthly reports — no spreadsheets.",
      descEzlaunch: 'Drop a ZIP or connect GitHub. Your site is live in seconds — with SSL, analytics, and forms included.',
      descDieresis: 'Custom web design and development: from agile landing pages to fully tailored, scalable websites.',
      descJaguar: 'Lightning-fast, secure hosting with dedicated WordPress tools that empower your online presence.',
      live: 'Live',
      footer: 'ALL RIGHTS RESERVED, 2026, JULIAN CABADA',
      verified: 'Verified account',
      socialAria: 'Social links',
      emailAria: 'Email',
      waitlistAria: 'Waitlist capacity',
      tabsAria: 'Profile sections',
      openZaldo: 'Open Zaldo',
      openEzlaunch: 'Open ezlaunch',
      openDieresis: 'Open Dieresis',
      openJaguar: 'Open Jaguar Hosting',
      langAria: 'Language'
    },
    es: {
      pageTitle: 'Julian C. — Portafolio de desarrollador',
      handle: 'UX / UI / WEB DEV',
      bio: 'Construyendo Zaldo, una app de finanzas personales para costarricenses. Fundador de Dieresis, donde construimos sitios web, web apps y aplicaciones móviles. Creador de EZLaunch, hosting simple para sitios estáticos.',
      comingSoon: 'Próximamente',
      waitlistTitle: 'Únete a la lista de espera de Zaldo',
      spotsTaken: ' / 100 cupos ocupados',
      emailLabel: 'Correo',
      emailPlaceholder: 'Tu correo',
      joinWaitlist: 'Unirme',
      successTitle: '¡Estás en la lista!',
      successSub: 'Te avisamos apenas Zaldo esté disponible.',
      joining: 'Uniendo…',
      tabProjects: 'Proyectos',
      tabContact: 'Contacto',
      tagFintech: 'Fintech',
      tagSaas: 'SaaS',
      tagAgency: 'Agencia web',
      tagHosting: 'Hosting',
      descZaldo: 'Convierte los correos de tu banco en control de gastos automático. Categorías inteligentes, límites de gasto y reportes mensuales claros — sin hojas de Excel.',
      descEzlaunch: 'Subí un ZIP o conectá GitHub. Tu sitio está en línea en segundos — con SSL, analytics y formularios incluidos.',
      descDieresis: 'Diseño y desarrollo web a medida: desde landing pages ágiles hasta sitios web escalables y personalizados.',
      descJaguar: 'Hosting rápido y seguro con herramientas dedicadas para WordPress que potencian tu presencia en línea.',
      live: 'En vivo',
      footer: 'TODOS LOS DERECHOS RESERVADOS, 2026, JULIAN CABADA',
      verified: 'Cuenta verificada',
      socialAria: 'Enlaces sociales',
      emailAria: 'Correo',
      waitlistAria: 'Capacidad de la lista de espera',
      tabsAria: 'Secciones del perfil',
      openZaldo: 'Abrir Zaldo',
      openEzlaunch: 'Abrir ezlaunch',
      openDieresis: 'Abrir Dieresis',
      openJaguar: 'Abrir Jaguar Hosting',
      langAria: 'Idioma'
    }
  };

  var langButtons = document.querySelectorAll('.lang-btn');
  var langToggle = document.querySelector('.lang-toggle');
  var storedLang = null;

  try {
    storedLang = localStorage.getItem('lang');
  } catch (e) {}

  var currentLang = storedLang === 'es' || storedLang === 'en'
    ? storedLang
    : 'es';

  function applyLanguage(lang) {
    var dict = translations[lang] || translations.en;
    currentLang = lang;

    document.documentElement.lang = lang;
    document.title = dict.pageTitle;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] != null) el.setAttribute('placeholder', dict[key]);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (dict[key] != null) el.setAttribute('aria-label', dict[key]);
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-alt');
      if (dict[key] != null) el.setAttribute('alt', dict[key]);
    });

    if (langToggle && dict.langAria) {
      langToggle.setAttribute('aria-label', dict.langAria);
    }

    langButtons.forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    try {
      localStorage.setItem('lang', lang);
    } catch (e) {}
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.getAttribute('data-lang'));
    });
  });

  applyLanguage(currentLang);

  /* ── Waitlist form + spots counter ── */
  var waitlist = document.querySelector('.waitlist');
  var waitlistForm = document.querySelector('.waitlist-form');
  var spotsCountEl = document.querySelector('[data-spots-count]');
  var spotsBar = document.querySelector('.waitlist-bar');
  var spotsFill = document.querySelector('.waitlist-bar-fill');
  var successPanel = document.querySelector('.waitlist-success');
  var burstLayer = document.querySelector('.waitlist-burst');
  var SPOTS_BASE = waitlist ? parseInt(waitlist.getAttribute('data-spots-base'), 10) || 51 : 51;
  var SPOTS_MAX = waitlist ? parseInt(waitlist.getAttribute('data-spots-max'), 10) || 100 : 100;
  var JOINED_KEY = 'zaldo-waitlist-joined';
  var COUNT_KEY = 'zaldo-waitlist-count';

  function readJoined() {
    try { return localStorage.getItem(JOINED_KEY) === '1'; } catch (e) { return false; }
  }

  function readCount() {
    try {
      var n = parseInt(localStorage.getItem(COUNT_KEY), 10);
      if (!isNaN(n) && n >= SPOTS_BASE) return Math.min(n, SPOTS_MAX);
    } catch (e) {}
    return SPOTS_BASE;
  }

  function writeCount(n) {
    try { localStorage.setItem(COUNT_KEY, String(n)); } catch (e) {}
  }

  function setSpots(n, animate) {
    n = Math.max(0, Math.min(SPOTS_MAX, n));
    var pct = (n / SPOTS_MAX) * 100;
    if (spotsCountEl) {
      if (animate && spotsCountEl.textContent !== String(n)) {
        spotsCountEl.classList.remove('is-bump');
        void spotsCountEl.offsetWidth;
        spotsCountEl.classList.add('is-bump');
      }
      spotsCountEl.textContent = String(n);
    }
    if (spotsBar) spotsBar.setAttribute('aria-valuenow', String(n));
    if (waitlist) waitlist.style.setProperty('--spots-pct', pct + '%');
    if (spotsFill) spotsFill.style.width = pct + '%';
  }

  function spawnBurst() {
    if (!burstLayer) return;
    burstLayer.innerHTML = '';
    var colors = ['#13e8d3', '#7ef5e8', '#ffffff', '#0bb8a8', '#a7fff4'];
    for (var i = 0; i < 18; i++) {
      var p = document.createElement('span');
      var angle = (Math.PI * 2 * i) / 18;
      var dist = 40 + Math.random() * 70;
      p.style.setProperty('--x', 50 + Math.random() * 20 + '%');
      p.style.setProperty('--y', 55 + Math.random() * 25 + '%');
      p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      p.style.setProperty('--c', colors[i % colors.length]);
      p.style.animationDelay = (Math.random() * 0.12) + 's';
      burstLayer.appendChild(p);
    }
    setTimeout(function () { burstLayer.innerHTML = ''; }, 1000);
  }

  function showSuccess(opts) {
    if (!waitlist) return;
    opts = opts || {};
    var bump = !!opts.bump;
    var celebrate = !!opts.celebrate;
    var count = readCount();
    if (bump && !readJoined()) {
      count = Math.min(SPOTS_MAX, count + 1);
      writeCount(count);
      try { localStorage.setItem(JOINED_KEY, '1'); } catch (e) {}
    }
    setSpots(count, bump);
    waitlist.classList.add('is-success');
    waitlist.classList.remove('is-submitting');
    if (successPanel) successPanel.hidden = false;
    if (waitlistForm) waitlistForm.setAttribute('aria-hidden', 'true');
    if (celebrate) spawnBurst();
  }

  function submitWaitlist(form) {
    function post(action) {
      var body = new FormData(form);
      return fetch(action, {
        method: 'POST',
        body: body,
        mode: 'cors',
        credentials: 'omit',
        headers: { Accept: 'application/json' }
      }).catch(function () {
        return fetch(action, { method: 'POST', body: body, mode: 'no-cors' });
      });
    }

    var action = form.getAttribute('action');
    if (action) return post(action);

    return new Promise(function (resolve) {
      var tries = 0;
      var timer = setInterval(function () {
        tries += 1;
        action = form.getAttribute('action');
        if (action || tries >= 12) {
          clearInterval(timer);
          if (action) post(action).finally(resolve);
          else resolve();
        }
      }, 150);
    });
  }

  setSpots(readCount(), false);
  if (readJoined()) {
    showSuccess({ bump: false, celebrate: false });
  }

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (readJoined() || waitlist.classList.contains('is-submitting')) return;

      var email = waitlistForm.querySelector('input[type="email"]');
      if (email && !email.checkValidity()) {
        email.reportValidity();
        return;
      }

      waitlist.classList.add('is-submitting');
      var btn = waitlistForm.querySelector('button[type="submit"]');
      var prevLabel = btn ? btn.textContent : '';
      if (btn) {
        btn.textContent = (translations[currentLang] || translations.es).joining;
      }

      submitWaitlist(waitlistForm).finally(function () {
        if (btn) btn.textContent = prevLabel;
        showSuccess({ bump: true, celebrate: true });
      });
    });
  }

})();
