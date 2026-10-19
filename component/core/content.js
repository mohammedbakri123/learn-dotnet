/* ============================================================
   Raff Backend Academy — shared course runtime
   Renders the full module shell (header, sidebar, lesson
   sections, modals, toast host) from data and wires all shared
   behavior: navigation, completion, progress, theme, search,
   glossary, export/import/reset, highlight, copy, mobile menu.

   A module page supplies only data (data/module-0X.js) plus a
   small page script with its bespoke widgets.

   Block renderers (structured content for future modules):
     {type:'h2'|'h3', text|html}
     {type:'p', html}
     {type:'list', ordered?, items:[html,...]}
     {type:'code', lang, filename?, pill?, code}
     {type:'callout', kind:'info'|'success'|'warning'|'danger', title?, html}
     {type:'table', head:[html,...], rows:[[html,...],...]}
     {type:'html', html}                       // raw passthrough
     {type:'widget', name, config}             // registered widget
   ============================================================ */

(function () {
  'use strict';

  var widgets = {};

  function esc(s) { return window.RaffUI ? RaffUI.escapeHtml(s) : String(s); }

  /* ---------------- block rendering ---------------- */

  function codeBlockHtml(b) {
    var lang = b.lang || 'cs';
    var langTag = b.pill || (lang === 'cs' ? 'C#' : lang === 'sql' ? 'SQL' : lang.toUpperCase());
    var inner = window.RaffHighlight ? RaffHighlight.text(b.code || '', lang) : esc(b.code || '');
    return (
      '<div class="code-wrapper">' +
      '<div class="code-header">' +
      '<span class="code-filename">' + esc(b.filename || langTag + ' snippet') + '</span>' +
      '<div class="code-badge-group">' +
      '<span class="code-lang-tag">' + esc(langTag) + '</span>' +
      '<button class="btn-copy" type="button">📋 Copy</button>' +
      '</div>' +
      '</div>' +
      '<pre><code class="language-' + esc(lang) + '">' + inner + '</code></pre>' +
      '</div>'
    );
  }

  function renderBlock(b) {
    if (typeof b === 'string') return b;
    switch (b.type) {
      case 'h2': return '<h2>' + (b.html || esc(b.text || '')) + '</h2>';
      case 'h3': return '<h3>' + (b.html || esc(b.text || '')) + '</h3>';
      case 'p': return '<p>' + (b.html || '') + '</p>';
      case 'list': {
        var tag = b.ordered ? 'ol' : 'ul';
        var items = (b.items || []).map(function (it) { return '<li>' + it + '</li>'; }).join('');
        return '<' + tag + '>' + items + '</' + tag + '>';
      }
      case 'code': return codeBlockHtml(b);
      case 'callout': {
        var kind = b.kind || 'info';
        return '<div class="callout callout-' + esc(kind) + '">' +
          (b.title ? '<div class="callout-title">' + b.title + '</div>' : '') +
          (b.html || '') + '</div>';
      }
      case 'table': {
        var head = (b.head || []).map(function (h) { return '<th>' + h + '</th>'; }).join('');
        var rows = (b.rows || []).map(function (r) {
          return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
        }).join('');
        return '<table class="concept-table">' + (head ? '<thead><tr>' + head + '</tr></thead>' : '') +
          '<tbody>' + rows + '</tbody></table>';
      }
      case 'widget': return renderWidget(b);
      case 'html':
      default:
        return b.html || '';
    }
  }

  function renderBlocks(blocks) {
    if (!blocks) return '';
    if (typeof blocks === 'string') return blocks;
    return blocks.map(renderBlock).join('\n');
  }

  function registerWidget(name, def) { widgets[name] = def; }

  function renderWidget(b) {
    var def = widgets[b.name];
    if (!def) return '<div class="callout callout-warning"><div class="callout-title">⚠️ Widget unavailable</div><p>No renderer registered for <code>' + esc(b.name) + '</code>.</p></div>';
    return def.render ? def.render(b.config || {}) : '';
  }

  function initWidget(name, root, cfg) {
    var def = widgets[name];
    if (def && def.init) def.init(root, cfg || {});
  }

  /* ---------------- course runtime ---------------- */

  function boot(config) {
    var UI = window.RaffUI;
    var reg = null;
    (window.RAFF_MODULES || []).forEach(function (m) { if (m.id === config.moduleId) reg = m; });
    reg = reg || { title: config.moduleId, number: '', icon: '📘', storageKey: config.storageKey };

    var state = config.state.load(config.storageKey);
    var lessons = config.lessons || [];
    var startId = config.startId || (lessons[0] && lessons[0].id);
    var main, sidebar;

    var ctx = {
      state: state,
      module: reg,
      lessons: lessons,
      save: function () { config.state.save(state); },
      toast: function (m) { UI.toast(m); },
      openModal: function (id) { UI.openModal(id); },
      closeModal: function (id) { UI.closeModal(id); },
      closeAllModals: function () { UI.closeAllModals(); },
      showLesson: showLesson,
      refresh: refresh,
      main: null
    };

    function save() { config.state.save(state); }

    UI.configure(config.ui || {});

    /* ---------- shell markup ---------- */

    var navHtml = lessons.map(function (l) {
      return '<button class="nav-item" data-target="' + esc(l.id) + '" type="button">' +
        '<span class="nav-item-left"><span class="nav-item-badge">' + esc(l.badge || '') + '</span>' +
        '<span>' + (l.nav || l.title || l.id) + '</span></span>' +
        '<span class="nav-check" aria-hidden="true">✓</span>' +
        '</button>';
    }).join('');

    var header =
      '<header class="app-header">' +
      '<div class="header-top">' +
      '<button class="header-title-box" id="header-home" type="button" title="Back to all modules">' +
      '<span class="app-badge">Raff Curriculum</span>' +
      '<span class="app-title">' + esc(reg.icon || '📘') + ' ' + esc(reg.title) + (reg.number ? ' • Module ' + esc(reg.number) : '') + '</span>' +
      '</button>' +
      '<div class="header-actions">' +
      '<button class="btn-icon" id="btn-open-search" title="Search lessons and glossary (Ctrl+K)" type="button"><span aria-hidden="true">🔍</span> <span class="btn-label">Search</span></button>' +
      (config.glossary ? '<button class="btn-icon" id="btn-open-glossary" title="Searchable glossary" type="button"><span aria-hidden="true">📖</span> <span class="btn-label">Glossary</span></button>' : '') +
      '<button class="btn-icon" id="btn-theme-toggle" title="Toggle light/dark theme" type="button"><span id="theme-icon" aria-hidden="true">☀️</span> <span class="sr-only">Toggle theme</span></button>' +
      '<button class="btn-icon" id="btn-mobile-menu" title="Toggle navigation menu" type="button"><span aria-hidden="true">☰</span> <span class="sr-only">Toggle navigation</span></button>' +
      '</div></div>' +
      '<div class="progress-bar-container" role="progressbar" aria-label="Module progress" aria-valuemin="0" aria-valuemax="100" id="global-progress-bar"><div class="progress-bar-fill" id="global-progress-fill"></div></div>' +
      '</header>';

    var labels = config.labels || {};
    var sidebarHtml =
      '<aside class="app-sidebar" id="app-sidebar" aria-label="Curriculum navigation">' +
      '<div class="sidebar-section-title">' + esc(labels.navTitle || 'Curriculum Navigation') + '</div>' +
      navHtml +
      '<div class="sidebar-footer">' +
      '<div class="progress-summary-box">' +
      '<div class="progress-summary-row"><span style="color:var(--text-muted);">' + esc(labels.lessons || 'Lessons') + ':</span> <strong id="sidebar-progress-label">0 / 0</strong></div>' +
      '<div class="progress-summary-row"><span style="color:var(--text-muted);">' + esc(labels.checks || 'Checks answered') + ':</span> <strong id="sidebar-checks-label">0 / 0</strong></div>' +
      '</div>' +
      '<div style="display:flex; gap:0.5rem; margin-top:0.5rem;">' +
      '<button class="btn-icon" style="flex:1; justify-content:center; font-size:0.78rem;" id="btn-export-progress" type="button">💾 Export</button>' +
      '<button class="btn-icon" style="flex:1; justify-content:center; font-size:0.78rem;" id="btn-import-progress" type="button">📂 Import</button>' +
      '<button class="btn-icon" style="color:var(--danger); font-size:0.78rem;" id="btn-reset-progress" title="Reset progress" type="button">🗑️</button>' +
      '</div></div></aside>';

    var startLesson = startId;
    var lessonsHtml = lessons.map(function (l) {
      return '<section class="lesson-section' + (l.id === startLesson ? ' active' : '') + '" id="' + esc(l.id) + '">' +
        renderBlocks(l.content || l.blocks) + '</section>';
    }).join('\n');

    main = document.createElement('main');
    main.className = 'app-main';
    main.innerHTML = lessonsHtml + (config.footerHtml || '');

    var container = document.createElement('div');
    container.className = 'app-container';
    container.innerHTML = sidebarHtml;
    container.appendChild(main);

    var modals =
      (config.search !== false ? (
        '<div class="modal-overlay" id="modal-search" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">' +
        '<div class="modal-dialog"><div class="modal-header">' +
        '<div class="modal-title" id="search-modal-title">🔍 ' + esc((config.search && config.search.title) || 'Search the module') + '</div>' +
        '<button class="btn-secondary" data-close-modal="modal-search" type="button">Close ✕</button>' +
        '</div><div class="modal-body">' +
        '<input type="text" class="search-input" id="search-input" placeholder="' + esc((config.search && config.search.placeholder) || 'Search lessons, topics, exercises, and glossary terms…') + '" autocomplete="off">' +
        '<div id="search-results" aria-live="polite"></div>' +
        '</div></div></div>'
      ) : '') +
      (config.glossary ? (
        '<div class="modal-overlay" id="modal-glossary" role="dialog" aria-modal="true" aria-labelledby="glossary-modal-title">' +
        '<div class="modal-dialog"><div class="modal-header">' +
        '<div class="modal-title" id="glossary-modal-title">📖 Glossary</div>' +
        '<button class="btn-secondary" data-close-modal="modal-glossary" type="button">Close ✕</button>' +
        '</div><div class="modal-body">' +
        '<input type="text" class="search-input" id="glossary-search" placeholder="' + esc((config.glossary && config.glossary.placeholder) || 'Filter terms…') + '" autocomplete="off">' +
        '<div class="glossary-cat-filters" id="glossary-filters"></div>' +
        '<div id="glossary-list"></div>' +
        '</div></div></div>'
      ) : '') +
      '<div class="modal-overlay" id="modal-import" role="dialog" aria-modal="true" aria-labelledby="import-modal-title">' +
      '<div class="modal-dialog" style="max-width:500px;"><div class="modal-header">' +
      '<div class="modal-title" id="import-modal-title">📂 Import Progress JSON</div>' +
      '<button class="btn-secondary" data-close-modal="modal-import" type="button">Close ✕</button>' +
      '</div><div class="modal-body">' +
      '<p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">Upload a previously exported .json file or paste the JSON text below:</p>' +
      '<input type="file" id="import-file-input" accept=".json,application/json" style="margin-bottom:1rem; font-size:0.85rem;">' +
      '<textarea id="import-textarea" rows="6" class="search-input" placeholder="Paste exported JSON here..."></textarea>' +
      '<div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1rem;">' +
      '<button class="btn-secondary" data-close-modal="modal-import" type="button">Cancel</button>' +
      '<button class="btn-primary" id="btn-submit-import" type="button">Import &amp; Restore</button>' +
      '</div></div></div></div>' +
      '<div class="modal-overlay" id="modal-reset" role="dialog" aria-modal="true" aria-labelledby="reset-modal-title">' +
      '<div class="modal-dialog" style="max-width:460px;"><div class="modal-header">' +
      '<div class="modal-title" id="reset-modal-title">🗑️ Reset all progress?</div>' +
      '</div><div class="modal-body">' +
      '<p>This permanently clears your lesson completions, knowledge-check answers, lab selections, and assessment scores for this module. Exported progress files are not affected.</p>' +
      '<p style="margin-bottom:1.25rem; color:var(--danger);"><strong>This cannot be undone.</strong></p>' +
      '<div class="exercise-actions">' +
      '<button class="btn-primary" id="btn-confirm-reset" type="button" style="background:var(--danger);">Yes, reset everything</button>' +
      '<button class="btn-secondary" id="btn-cancel-reset" type="button">Cancel</button>' +
      '</div></div></div></div>' +
      (config.extraModalsHtml || '') +
      '<input type="file" id="legacy-import-file" hidden>' +
      '<div class="toast-container" id="toast-container" aria-live="polite"></div>';

    document.body.insertAdjacentHTML('afterbegin', header + modals);

    sidebar = document.getElementById('app-sidebar');
    document.body.insertBefore(container, document.body.children[1] || null);

    ctx.main = main;

    /* ---------- navigation ---------- */

    function validLesson(id) {
      return lessons.some(function (l) { return l.id === id; });
    }

    function showLesson(id, skipHash) {
      if (!validLesson(id)) id = startId;
      lessons.forEach(function (l) {
        var sec = document.getElementById(l.id);
        if (sec) sec.classList.toggle('active', l.id === id);
      });
      Array.prototype.forEach.call(document.querySelectorAll('.nav-item'), function (n) {
        n.classList.toggle('active', n.getAttribute('data-target') === id);
      });
      if (!skipHash && location.hash !== '#' + id) {
        try { history.replaceState(null, '', '#' + id); } catch (e) { location.hash = id; }
      }
      config.state.setActive(state, id);
      save();
      sidebar.classList.remove('open');
      window.scrollTo(0, 0);
      if (config.onLessonShown) config.onLessonShown(id, ctx);
      refresh();
    }

    document.addEventListener('click', function (e) {
      var nav = e.target.closest && e.target.closest('[data-target]');
      if (nav && (nav.classList.contains('nav-item') || nav.classList.contains('btn-next-lesson'))) { showLesson(nav.getAttribute('data-target')); return; }
      var jump = e.target.closest && e.target.closest('[data-nav-target]');
      if (jump) { showLesson(jump.getAttribute('data-nav-target')); return; }
      var comp = e.target.closest && e.target.closest('.btn-complete-lesson[data-lesson]');
      if (comp) {
        var done = config.state.toggleDone(state, comp.getAttribute('data-lesson'));
        save();
        if (config.completeToast) {
          var cmsg = config.completeToast(done, comp.getAttribute('data-lesson'));
          if (cmsg) UI.toast(cmsg);
        }
        refresh();
        if (config.afterStateChange) config.afterStateChange(ctx);
        return;
      }
      var closeBtn = e.target.closest && e.target.closest('[data-close-modal]');
      if (closeBtn) { UI.closeModal(closeBtn.getAttribute('data-close-modal')); return; }
      var home = e.target.closest && e.target.closest('#header-home');
      if (home) { window.location.href = '../index.html'; }
    });

    document.getElementById('btn-mobile-menu').addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });

    /* ---------- progress ---------- */

    function refresh() {
      var p = config.progress.compute(state, ctx) || {};
      var fill = document.getElementById('global-progress-fill');
      var bar = document.getElementById('global-progress-bar');
      if (fill) fill.style.width = (p.percent || 0) + '%';
      if (bar) bar.setAttribute('aria-valuenow', String(Math.round(p.percent || 0)));
      var l1 = document.getElementById('sidebar-progress-label');
      if (l1) l1.textContent = p.lessonsLabel || '';
      var l2 = document.getElementById('sidebar-checks-label');
      if (l2) l2.textContent = p.checksLabel || '';
      Array.prototype.forEach.call(document.querySelectorAll('.nav-item'), function (n) {
        var id = n.getAttribute('data-target');
        var done = config.state.isDone(state, id);
        n.classList.toggle('done', done);
        n.classList.toggle('completed', done);
      });
      Array.prototype.forEach.call(document.querySelectorAll('.btn-complete-lesson[data-lesson]'), function (b) {
        var done = config.state.isDone(state, b.getAttribute('data-lesson'));
        b.classList.toggle('completed', done);
        b.classList.toggle('done', done);
        b.setAttribute('aria-pressed', done ? 'true' : 'false');
      });
    }

    /* ---------- theme ---------- */

    UI.initTheme({
      button: 'btn-theme-toggle',
      icon: 'theme-icon',
      get: function () { return config.state.theme(state); },
      set: function (t) { config.state.setTheme(state, t); save(); }
    });
    UI.applyTheme(config.state.theme(state), { button: 'btn-theme-toggle', icon: 'theme-icon' });

    /* ---------- chrome (Escape / Ctrl+K / overlay close) ---------- */

    if (config.search !== false) {
      UI.initChrome({
        closeButtons: false,
        overlayClose: 'self',
        mobileMenu: { button: 'btn-mobile-menu', sidebar: sidebar, closeOnOutsideClick: true },
        onSearchShortcut: function () { UI.openModal('modal-search'); if (searchApi) searchApi.focus(60); },
        onEscape: function () { UI.closeAllModals(); sidebar.classList.remove('open'); }
      });
    } else {
      UI.initChrome({
        closeButtons: false,
        overlayClose: 'self',
        mobileMenu: { button: 'btn-mobile-menu', sidebar: sidebar, closeOnOutsideClick: true },
        onEscape: function () { UI.closeAllModals(); sidebar.classList.remove('open'); }
      });
    }
    var openSearchBtn = document.getElementById('btn-open-search');
    if (openSearchBtn) openSearchBtn.addEventListener('click', function () { UI.openModal('modal-search'); if (searchApi) { searchApi.focus(60); searchApi.run(); } });

    /* ---------- search ---------- */

    var searchApi = null;
    if (config.search !== false && config.search) {
      var input = document.getElementById('search-input');
      if (config.search.placeholder) input.placeholder = config.search.placeholder;
      searchApi = window.RaffSearch.init({
        input: 'search-input',
        results: 'search-results',
        minChars: config.search.minChars || 1,
        hint: config.search.hint,
        noMatch: config.search.noMatch,
        renderer: config.search.renderer || null,
        getResults: function (q) {
          if (config.search.getResults) return config.search.getResults(q);
          var items = config.search.items || [];
          return items.filter(function (it) {
            return (it.title + ' ' + (it.snippet || '') + ' ' + (it.keywords || '')).toLowerCase().indexOf(q) !== -1;
          }).slice(0, 30);
        },
        onSelect: function (target, el) {
          UI.closeAllModals();
          if (config.search.onSelect) { config.search.onSelect(target, el, ctx); return; }
          if (target) showLesson(target);
        }
      });
    }
    var gbtn = document.getElementById('btn-open-glossary');
    if (gbtn) gbtn.addEventListener('click', function () {
      if (ctx.openGlossary) ctx.openGlossary('');
      else UI.openModal('modal-glossary');
    });

    /* ---------- glossary ---------- */

    if (config.glossary) {
      var glossaryApi = window.RaffGlossary.init({
        input: 'glossary-search',
        list: 'glossary-list',
        filters: 'glossary-filters',
        items: config.glossary.items || [],
        getTerm: config.glossary.getTerm,
        getCat: config.glossary.getCat,
        getDef: config.glossary.getDef,
        renderItem: config.glossary.renderItem,
        emptyHtml: config.glossary.emptyHtml,
        initialCat: config.glossary.initialCat || 'All',
        filtersMode: config.glossary.filtersMode || 'none'
      });
      ctx.openGlossary = function (preset) {
        if (glossaryApi) glossaryApi.open(preset);
        UI.openModal('modal-glossary');
      };
    }

    /* ---------- export / import / reset ---------- */

    window.RaffProgress.init({
      exportBtn: 'btn-export-progress',
      exportName: config.exportName,
      exportStyle: config.exportStyle || 'dataurl',
      getExportPayload: function () { return config.state.exportPayload(state); },
      exportToast: config.messages.exportToast,
      exportErrorToast: config.messages.exportErrorToast,
      importBtn: 'btn-import-progress',
      importFileInput: 'import-file-input',
      importMode: config.messages.importMode || 'file',
      importModalId: 'modal-import',
      onFileText: config.messages.onFileText,
      submitImportBtn: 'btn-submit-import',
      importTextarea: 'import-textarea',
      applyImportText: function (text) {
        var parsed = JSON.parse(text);
        config.state.restore(parsed, state);
        save();
        refresh();
        if (config.afterStateChange) config.afterStateChange(ctx);
      },
      importToast: config.messages.importSuccessToast,
      importErrorToast: config.messages.importErrorToast,
      onImportError: function (err) {
        UI.toast(config.messages.importParseErrorToast || (config.messages.importErrorToast || '').replace('{error}', (err && err.message) || err));
      },
      afterImport: function () { UI.closeAllModals(); },
      reloadAfterImport: false,
      resetOpenBtn: 'btn-reset-progress',
      resetModalId: 'modal-reset',
      resetConfirmBtn: 'btn-confirm-reset',
      resetCancelBtn: 'btn-cancel-reset',
      onConfirmReset: function () {
        config.state.reset(state);
        save();
        UI.closeModal('modal-reset');
        if (config.messages.resetToast) UI.toast(config.messages.resetToast);
        refresh();
        if (config.afterStateChange) config.afterStateChange(ctx);
      }
    });

    /* ---------- initial render ---------- */

    var initial = (location.hash || '').replace('#', '');
    if (!validLesson(initial)) initial = config.state.activeId(state) || startId;

    window.addEventListener('hashchange', function () {
      var id = location.hash.replace('#', '');
      if (validLesson(id)) showLesson(id, true);
    });

    if (config.onReady) config.onReady(ctx);

    if (window.RaffHighlight) RaffHighlight.apply(main);
    UI.initCopyButtons(config.copy || {});
    showLesson(initial, true);
    refresh();
  }

  window.RaffContent = {
    boot: boot,
    renderBlocks: renderBlocks,
    registerWidget: registerWidget,
    initWidget: initWidget
  };
})();
