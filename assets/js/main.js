(() => {
  'use strict';

  const header = document.querySelector('[data-site-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.getElementById('site-navigation');

  function closeMenu() {
    if (!header || !menuButton) return;
    header.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }

  if (header && menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const nextOpen = !header.classList.contains('is-open');
      header.classList.toggle('is-open', nextOpen);
      menuButton.setAttribute('aria-expanded', String(nextOpen));
      menuButton.setAttribute('aria-label', nextOpen ? 'Close navigation' : 'Open navigation');
    });
    navigation.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', event => {
      if (!header.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  // Keep the copyright year current.
  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = String(new Date().getFullYear());
  });

  // Compute live open/closed display using the restaurant's time zone, not the visitor's.
  const openStatus = document.querySelector('[data-open-status]');
  if (openStatus) {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());
      const hour = Number(parts.find(part => part.type === 'hour')?.value ?? '0') % 24;
      const minute = Number(parts.find(part => part.type === 'minute')?.value ?? '0');
      const current = hour * 60 + minute;
      const isOpen = current >= 420 && current < 870; // 07:00 - 14:30
      openStatus.textContent = isOpen ? 'Open now - until 2:30 pm Dallas time' : 'Currently closed - opens at 7:00 am Dallas time';
      openStatus.style.color = isOpen ? '#278052' : '#cc4437';
    } catch (error) {
      // The static hours text remains readable if time-zone APIs are unavailable.
    }
  }

  // Menu: filter existing, server-rendered HTML so item text remains indexable.
  const search = document.querySelector('[data-menu-search]');
  const sections = [...document.querySelectorAll('[data-menu-section]')];
  const noResults = document.querySelector('[data-no-results]');
  const count = document.querySelector('[data-menu-count]');
  if (search && sections.length > 0) {
    const originalCount = document.querySelectorAll('[data-menu-item]').length;
    const filter = () => {
      const query = search.value.trim().toLocaleLowerCase();
      let visibleItems = 0;
      for (const section of sections) {
        let visibleInSection = 0;
        const items = section.querySelectorAll('[data-menu-item]');
        for (const item of items) {
          const matches = !query || item.textContent.toLocaleLowerCase().includes(query);
          item.hidden = !matches;
          if (matches) visibleInSection += 1;
        }
        section.hidden = visibleInSection === 0;
        visibleItems += visibleInSection;
      }
      if (noResults) noResults.hidden = visibleItems > 0;
      if (count) {
        count.textContent = !query
          ? `Showing all ${originalCount} menu listings`
          : `Showing ${visibleItems} of ${originalCount} menu listings for "${search.value.trim()}"`;
      }
    };
    search.addEventListener('input', filter);
    search.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        search.value = '';
        filter();
        search.blur();
      }
    });
    filter();
  }
})();
