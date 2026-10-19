/* ============================================================
   Raff Backend Academy — shared search component
   Filters a page-provided index and renders result lists.
   Exposes window.RaffSearch.
   ============================================================ */

(function () {
  'use strict';

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function defaultRenderer(items) {
    return items.map(function (m) {
      return '<div class="search-result-item" data-target="' + esc(m.target) + '">' +
        '<div class="search-result-title">' + esc(m.title) + '</div>' +
        '<div class="search-result-snippet">' + esc(m.snippet) + '</div>' +
      '</div>';
    }).join('');
  }

  function init(options) {
    var o = options || {};
    var input = typeof o.input === 'string' ? document.getElementById(o.input) : o.input;
    var results = typeof o.results === 'string' ? document.getElementById(o.results) : o.results;
    if (!input || !results) return null;

    var minChars = o.minChars || 1;

    function hintHtml() {
      return typeof o.hint === 'function' ? o.hint() : (o.hint || '');
    }

    function run() {
      var q = input.value.trim().toLowerCase();
      if (q.length < minChars) {
        results.innerHTML = hintHtml();
        return;
      }
      var items = o.getResults ? o.getResults(q) : [];
      if (!items || !items.length) {
        results.innerHTML = typeof o.noMatch === 'function' ? o.noMatch(q) : (o.noMatch || '');
        return;
      }
      results.innerHTML = (o.renderer || defaultRenderer)(items, q);
      if (o.bindItems !== false && o.onSelect) {
        $$('.search-result-item', results).forEach(function (item) {
          item.addEventListener('click', function () {
            o.onSelect(item.getAttribute('data-target'), item);
          });
        });
      }
    }

    input.addEventListener('input', run);

    return {
      run: run,
      clearAndRun: function () {
        input.value = '';
        run();
      },
      focus: function (delay) {
        if (delay) setTimeout(function () { input.focus(); }, delay);
        else input.focus();
      }
    };
  }

  window.RaffSearch = { init: init, defaultRenderer: defaultRenderer };
})();
