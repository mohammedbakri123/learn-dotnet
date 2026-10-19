/* ============================================================
   Raff Backend Academy — shared progress export / import / reset
   Page supplies storage handling and payload validation.
   Exposes window.RaffProgress.
   ============================================================ */

(function () {
  'use strict';

  function $(id) { return typeof id === 'string' ? document.getElementById(id) : id; }

  function toast(msg) {
    if (window.RaffUI) window.RaffUI.toast(msg);
  }

  function init(options) {
    var o = options || {};
    var UI = window.RaffUI;

    function downloadDataUrl(payload) {
      var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
      var a = document.createElement('a');
      a.setAttribute('href', dataStr);
      a.setAttribute('download', o.exportName);
      a.click();
    }

    function downloadBlob(payload) {
      var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = o.exportName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    var exportBtn = $(o.exportBtn);
    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        try {
          var payload = o.getExportPayload ? o.getExportPayload() : null;
          if (o.exportStyle === 'blob') downloadBlob(payload);
          else downloadDataUrl(payload);
          if (o.exportToast) toast(o.exportToast);
        } catch (e) {
          toast(o.exportErrorToast || 'Export failed.');
        }
      });
    }

    function reportImportError(err) {
      if (o.onImportError) o.onImportError(err);
      else toast(o.importErrorToast || 'Import failed — invalid progress file.');
    }

    function finishImport() {
      if (o.afterImport) o.afterImport();
      toast(o.importToast || 'Progress imported.');
      if (o.reloadAfterImport) {
        setTimeout(function () { location.reload(); }, o.reloadAfterImport);
      }
    }

    var importFileInput = $(o.importFileInput);
    var importBtn = $(o.importBtn);
    if (importBtn) {
      importBtn.addEventListener('click', function () {
        if (o.importMode === 'textarea') {
          if (UI) UI.openModal(o.importModalId);
        } else if (importFileInput) {
          importFileInput.click();
        }
      });
    }

    if (importFileInput) {
      importFileInput.addEventListener('change', function (e) {
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (evt) {
          var text = String(evt.target.result);
          if (o.onFileText) {
            o.onFileText(text);
            return;
          }
          try {
            o.applyImportText(text);
            finishImport();
          } catch (err) {
            reportImportError(err);
          }
        };
        reader.onerror = function () {
          reportImportError(new Error('The file could not be read.'));
        };
        reader.readAsText(file);
        e.target.value = '';
      });
    }

    var submitBtn = $(o.submitImportBtn);
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        var textarea = $(o.importTextarea);
        var text = textarea ? textarea.value.trim() : '';
        try {
          o.applyImportText(text);
          if (UI) UI.closeAllModals();
          finishImport();
        } catch (err) {
          reportImportError(err);
        }
      });
    }

    var resetOpenBtn = $(o.resetOpenBtn);
    if (resetOpenBtn) {
      resetOpenBtn.addEventListener('click', function () {
        if (UI) UI.openModal(o.resetModalId);
      });
    }
    var resetCancelBtn = $(o.resetCancelBtn);
    if (resetCancelBtn) {
      resetCancelBtn.addEventListener('click', function () {
        if (UI) UI.closeModal(o.resetModalId);
      });
    }
    var resetConfirmBtn = $(o.resetConfirmBtn);
    if (resetConfirmBtn) {
      resetConfirmBtn.addEventListener('click', function () {
        if (o.onConfirmReset) o.onConfirmReset();
      });
    }

    return {
      exportProgress: function () { if (exportBtn) exportBtn.click(); }
    };
  }

  window.RaffProgress = { init: init };
})();
