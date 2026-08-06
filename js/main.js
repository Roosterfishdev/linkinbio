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

})();
