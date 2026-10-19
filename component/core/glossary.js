/* ============================================================
   Raff Backend Academy — shared glossary component
   Category filters (static or dynamic) + live text filtering.
   Exposes window.RaffGlossary.
   ============================================================ */

(function () {
  'use strict';

  function T(key) { return window.RaffI18n ? RaffI18n.t(key) : key; }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function init(options) {
    var o = options || {};
    var input = typeof o.input === 'string' ? document.getElementById(o.input) : o.input;
    var list = typeof o.list === 'string' ? document.getElementById(o.list) : o.list;
    var filters = typeof o.filters === 'string' ? document.getElementById(o.filters) : o.filters;
    if (!list) return null;

    var getTerm = o.getTerm || function (item) { return item.term; };
    var getCat = o.getCat || function (item) { return item.cat; };
    var getDef = o.getDef || function (item) { return item.def; };
    var renderItem = o.renderItem || function (item) { return esc(getTerm(item)); };
    var allCat = T('common.all');
    var initialCat = o.initialCat || allCat;
    if (initialCat === 'All') initialCat = allCat;
    var cat = initialCat;

    function matches(item, q) {
      var inCat = cat === allCat || cat === 'All' || String(getCat(item)) === cat;
      var text = (String(getTerm(item)) + ' ' + String(getDef(item))).toLowerCase();
      return inCat && (!q || text.indexOf(q) !== -1);
    }

    function render() {
      var q = input ? input.value.trim().toLowerCase() : '';
      var items = (o.items || []).filter(function (item) { return matches(item, q); });
      list.innerHTML = items.length ? items.map(renderItem).join('') : (o.emptyHtml || '');
    }

    function renderFilters() {
      if (!filters) return;
      var cats = [initialCat];
      (o.items || []).forEach(function (item) {
        var c = String(getCat(item));
        if (cats.indexOf(c) === -1) cats.push(c);
      });
      filters.innerHTML = cats.map(function (c) {
        return '<button class="glossary-filter-btn' + (c === cat ? ' active' : '') +
          '" type="button" data-gcat="' + esc(c) + '">' + esc(c) + '</button>';
      }).join('');
    }

    function setCat(next) { cat = next; }

    function syncStaticActive() {
      if (!filters) return;
      $$('.glossary-filter-btn', filters).forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-cat') === cat);
      });
    }

    if (input) input.addEventListener('input', render);

    if (o.filtersMode === 'static' && filters) {
      $$('.glossary-filter-btn', filters).forEach(function (btn) {
        btn.addEventListener('click', function () {
          cat = btn.getAttribute('data-cat');
          syncStaticActive();
          render();
        });
      });
    } else if (o.filtersMode === 'dynamic' && filters && o.bindFilterClicks !== false) {
      filters.addEventListener('click', function (e) {
        var btn = e.target.closest('.glossary-filter-btn');
        if (!btn) return;
        cat = btn.getAttribute('data-gcat');
        renderFilters();
        render();
      });
    }

    renderFilters();
    render();

    function reset(preset) {
      if (input) input.value = preset || '';
      cat = initialCat;
      return { render: render, renderFilters: renderFilters };
    }

    function open(preset) {
      if (input) input.value = preset || '';
      renderFilters();
      render();
    }

    return {
      render: render,
      renderFilters: renderFilters,
      setCat: setCat,
      reset: reset,
      open: open
    };
  }

  window.RaffGlossary = { init: init };
})();
