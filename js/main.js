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

})();
