/* ============================================================
   Raff Backend Academy — shared UI core
   Escape helpers, toasts, modals, theme, app chrome, copy buttons.
   Exposes window.RaffUI. Depends on nothing.
   ============================================================ */

(function () {
  'use strict';

  var cfg = {
    toastClass: 'toast-msg',
    toastDuration: 2800,
    toastFade: 300,
    openClosesOthers: false
  };

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function resolve(target) {
    return typeof target === 'string' ? document.getElementById(target) : target;
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function fmtInline(s) {
    return escapeHtml(s)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function toast(msg, opts) {
    var options = opts || {};
    var host = document.getElementById('toast-container');
    if (!host) {
      host = document.createElement('div');
      host.id = 'toast-container';
      host.className = 'toast-container';
      document.body.appendChild(host);
    }
    var el = document.createElement('div');
    el.className = options.className || cfg.toastClass;
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(function () {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.3s ease';
      setTimeout(function () { el.remove(); }, cfg.toastFade);
    }, options.duration || cfg.toastDuration);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return false; });
    }
    return Promise.resolve(false);
  }

  function openModal(target) {
    var el = resolve(target);
    if (!el) return null;
    if (cfg.openClosesOthers) closeAllModals();
    el.classList.add('open');
    return el;
  }

  function closeModal(target) {
    var el = resolve(target);
    if (el) el.classList.remove('open');
  }

  function closeAllModals() {
    $$('.modal-overlay').forEach(function (m) { m.classList.remove('open'); });
  }

  function applyTheme(theme, options) {
    var o = options || {};
    document.documentElement.setAttribute('data-theme', theme);
    var icon = resolve(o.icon);
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    var btn = resolve(o.button);
    if (btn && o.title) {
      btn.title = 'Switch to ' + (theme === 'dark' ? 'Light' : 'Dark') + ' Theme';
    }
    try { localStorage.setItem('raff_learn_theme', theme); } catch (e) { /* storage unavailable */ }
  }

  function initTheme(options) {
    var o = options || {};
    var btn = resolve(o.button);
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = o.get() === 'dark' ? 'light' : 'dark';
      if (o.set) o.set(next);
      applyTheme(next, o);
    });
  }

  function initCopyButtons(options) {
    var o = options || {};
    var fail = o.failToast || 'Could not copy to clipboard.';

    function bind(btn, getText) {
      btn.addEventListener('click', function () {
        var text = getText(btn);
        if (!text) return;
        copyText(text).then(function (ok) {
          if (!ok) { toast(fail); return; }
          if (o.successToast) toast(o.successToast);
          if (!o.feedback) return;
          var original = btn.getAttribute('data-label') || btn.textContent;
          btn.setAttribute('data-label', original);
          btn.textContent = '✓ Copied!';
          if (o.colorFeedback) btn.style.color = 'var(--success)';
          setTimeout(function () {
            btn.textContent = original;
            if (o.colorFeedback) btn.style.color = '';
          }, 2000);
        });
      });
    }

    $$('.btn-copy-code').forEach(function (btn) {
      bind(btn, function (b) { return b.getAttribute('data-code'); });
    });
    $$('.btn-copy').forEach(function (btn) {
      bind(btn, function (b) {
        var wrap = b.closest('.code-wrapper');
        var code = wrap ? wrap.querySelector('pre code') : null;
        return code ? code.textContent : null;
      });
    });
  }

  function initMobileMenu(options) {
    var o = options || {};
    var btn = resolve(o.button);
    var sidebar = resolve(o.sidebar);
    if (!btn || !sidebar) return null;

    function close() { sidebar.classList.remove('open'); }

    btn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
    if (o.closeOnOutsideClick) {
      document.addEventListener('click', function (e) {
        if (sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) && !btn.contains(e.target)) {
          close();
        }
      });
    }
    return { close: close, toggle: function () { sidebar.classList.toggle('open'); } };
  }

  function initChrome(options) {
    var o = options || {};

    if (o.closeButtons) {
      $$('.btn-close-modal').forEach(function (b) {
        b.addEventListener('click', closeAllModals);
      });
    }
    if (o.overlayClose === 'all') {
      $$('.modal-overlay').forEach(function (ov) {
        ov.addEventListener('click', function (e) { if (e.target === ov) closeAllModals(); });
      });
    } else if (o.overlayClose === 'self') {
      $$('.modal-overlay').forEach(function (ov) {
        ov.addEventListener('click', function (e) { if (e.target === ov) closeModal(ov); });
      });
    }

    var mobile = o.mobileMenu ? initMobileMenu(o.mobileMenu) : null;

    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (o.onSearchShortcut) o.onSearchShortcut();
      } else if (e.key === 'Escape') {
        if (o.onEscape) o.onEscape();
        else closeAllModals();
      }
    });

    return { mobile: mobile };
  }

  window.RaffUI = {
    configure: function (options) {
      if (!options) return cfg;
      Object.keys(options).forEach(function (k) { cfg[k] = options[k]; });
      return cfg;
    },
    $: $,
    $$: $$,
    escapeHtml: escapeHtml,
    fmtInline: fmtInline,
    toast: toast,
    showToast: toast,
    copyText: copyText,
    openModal: openModal,
    closeModal: closeModal,
    closeAllModals: closeAllModals,
    applyTheme: applyTheme,
    initTheme: initTheme,
    initCopyButtons: initCopyButtons,
    initMobileMenu: initMobileMenu,
    initChrome: initChrome
  };
})();
