/* ============================================================
   Raff Backend Academy — core i18n engine
   Language state (en/ar), persistence ('raff_lang'), the shared
   UI dictionary, and helpers used by every page and component:
     RaffI18n.t(key, vars)        translate a shared string
     RaffI18n.pick({en, ar})      choose a page-local string table
     RaffI18n.localized(obj, f)   read obj[f + '_ar'] with fallback
     RaffI18n.dir()               'rtl' for Arabic, else 'ltr'
     RaffI18n.initToggle({...})   wire the header language button
   Exposes window.RaffI18n. Depends on nothing.
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'raff_lang';
  var DEFAULT_LANG = 'en';
  var SUPPORTED = ['en', 'ar'];

  /* ---------------- shared dictionary ----------------
     Flat keys, `{name}` interpolation, or a function (vars) -> string
     for anything that needs grammar (e.g. Arabic plurals). */

  var dict = {
    en: {
      'brand.kicker': 'Raff Backend Academy',
      'brand.curriculumBadge': 'Raff Curriculum',

      'common.close': 'Close ✕',
      'common.cancel': 'Cancel',
      'common.search': 'Search',
      'common.glossary': 'Glossary',
      'common.export': 'Export',
      'common.import': 'Import',
      'common.all': 'All',
      'common.module': 'Module',
      'common.lessons': 'Lessons',
      'common.units': 'Units',
      'common.checksAnswered': 'Checks answered',

      'hub.docTitle': 'Raff Backend Academy — Curriculum',
      'hub.title': 'Curriculum Modules',
      'hub.lede': 'Pick a module to start learning. Progress is saved locally per module — use each module\'s Export button to back it up or move it between machines.',
      'hub.footer': 'Each module is self-contained: lessons, knowledge checks, interactive labs, and a final assessment with a local progress file.',
      'hub.gridAria': 'Available modules',
      'hub.status.notStarted': 'Not started',
      'hub.status.inProgress': 'In progress',
      'hub.status.lessonsCompleted': function (v) {
        var n = v.count;
        return n + ' lesson' + (n === 1 ? '' : 's') + ' completed';
      },
      'hub.open': 'Open →',
      'hub.moduleLabel': 'Module {number}',

      'header.backHome': 'Back to all modules',
      'header.searchTitle': 'Search lessons and glossary (Ctrl+K)',
      'header.glossaryTitle': 'Searchable glossary',
      'header.themeTitle': 'Toggle light/dark theme',
      'header.menuTitle': 'Toggle navigation menu',
      'header.moduleProgress': 'Module progress',
      'header.moduleSuffix': ' • Module {number}',

      'sidebar.title': 'Curriculum Navigation',
      'sidebar.navAria': 'Curriculum navigation',
      'sidebar.resetTitle': 'Reset progress',

      'search.title': 'Search the module',
      'search.placeholder': 'Search lessons, topics, exercises, and glossary terms…',

      'glossary.title': 'Glossary',
      'glossary.filterPlaceholder': 'Filter terms…',

      'import.title': 'Import Progress JSON',
      'import.desc': 'Upload a previously exported .json file or paste the JSON text below:',
      'import.placeholder': 'Paste exported JSON here...',
      'import.submit': 'Import & Restore',

      'reset.title': 'Reset all progress?',
      'reset.body': 'This permanently clears your lesson completions, knowledge-check answers, lab selections, and assessment scores for this module. Exported progress files are not affected.',
      'reset.warning': 'This cannot be undone.',
      'reset.confirm': 'Yes, reset everything',

      'code.copy': '📋 Copy',
      'code.copied': '✓ Copied!',
      'code.copyFail': 'Could not copy to clipboard.',
      'code.snippet': '{lang} snippet',

      'theme.switchToLight': 'Switch to Light Theme',
      'theme.switchToDark': 'Switch to Dark Theme',

      'widget.unavailable': '⚠️ Widget unavailable',
      'widget.noRenderer': 'No renderer registered for {name}.',

      'lang.toggleLabel': 'AR',
      'lang.toggleTitle': 'Switch to Arabic'
    },

    ar: {
      'brand.kicker': 'أكاديمية Raff للبرمجة الخلفية',
      'brand.curriculumBadge': 'منهج Raff',

      'common.close': 'إغلاق ✕',
      'common.cancel': 'إلغاء',
      'common.search': 'بحث',
      'common.glossary': 'المصطلحات',
      'common.export': 'تصدير',
      'common.import': 'استيراد',
      'common.all': 'الكل',
      'common.module': 'الوحدة',
      'common.lessons': 'الدروس',
      'common.units': 'الوحدات',
      'common.checksAnswered': 'الاختبارات المُجابة',

      'hub.docTitle': 'أكاديمية Raff للبرمجة الخلفية — المنهج',
      'hub.title': 'وحدات المنهج',
      'hub.lede': 'اختر وحدة لبدء التعلّم. يُحفظ تقدّمك محليًا في كل وحدة — استخدم زر التصدير داخل الوحدة للاحتفاظ بنسخة احتياطية منه أو لنقله بين الأجهزة.',
      'hub.footer': 'كل وحدة قائمة بذاتها: دروس واختبارات معرفية ومختبرات تفاعلية وتقييم نهائي، مع ملف تقدّم محفوظ محليًا.',
      'hub.gridAria': 'الوحدات المتاحة',
      'hub.status.notStarted': 'لم يبدأ بعد',
      'hub.status.inProgress': 'قيد التقدّم',
      'hub.status.lessonsCompleted': function (v) {
        var n = v.count;
        if (n === 1) return 'اكتمل درس واحد';
        if (n === 2) return 'اكتمل درسان';
        if (n >= 3 && n <= 10) return 'اكتملت ' + n + ' دروس';
        return 'اكتمل ' + n + ' درسًا';
      },
      'hub.open': 'افتح ←',
      'hub.moduleLabel': 'الوحدة {number}',

      'header.backHome': 'العودة إلى جميع الوحدات',
      'header.searchTitle': 'ابحث في الدروس والمصطلحات (Ctrl+K)',
      'header.glossaryTitle': 'قاموس مصطلحات قابل للبحث',
      'header.themeTitle': 'تبديل السمة الفاتحة/الداكنة',
      'header.menuTitle': 'إظهار/إخفاء قائمة التنقل',
      'header.moduleProgress': 'تقدّم الوحدة',
      'header.moduleSuffix': ' • الوحدة {number}',

      'sidebar.title': 'التنقل في المنهج',
      'sidebar.navAria': 'التنقل في المنهج',
      'sidebar.resetTitle': 'إعادة تعيين التقدّم',

      'search.title': 'ابحث في الوحدة',
      'search.placeholder': 'ابحث في الدروس والمواضيع والتمارين ومصطلحات القاموس…',

      'glossary.title': 'قاموس المصطلحات',
      'glossary.filterPlaceholder': 'تصفية المصطلحات…',

      'import.title': 'استيراد التقدّم بصيغة JSON',
      'import.desc': 'ارفع ملف .json سبق تصديره، أو ألصق نص JSON في الحقل أدناه:',
      'import.placeholder': 'ألصق نص JSON المُصدَّر هنا…',
      'import.submit': 'استيراد واستعادة',

      'reset.title': 'إعادة تعيين كل التقدّم؟',
      'reset.body': 'سيمسح هذا نهائيًا إتمام الدروس، وإجابات الاختبارات المعرفية، واختيارات المختبرات، ودرجات التقييم النهائي لهذه الوحدة. أما ملفات التقدّم المُصدَّرة فلن تتأثر.',
      'reset.warning': 'لا يمكن التراجع عن هذا الإجراء.',
      'reset.confirm': 'نعم، أعد تعيين كل شيء',

      'code.copy': '📋 نسخ',
      'code.copied': '✓ تم النسخ!',
      'code.copyFail': 'تعذّر النسخ إلى الحافظة.',
      'code.snippet': 'مقطع {lang}',

      'theme.switchToLight': 'التبديل إلى السمة الفاتحة',
      'theme.switchToDark': 'التبديل إلى السمة الداكنة',

      'widget.unavailable': '⚠️ الأداة غير متاحة',
      'widget.noRenderer': 'لا يوجد مُصيِّر مسجَّل للأداة {name}.',

      'lang.toggleLabel': 'EN',
      'lang.toggleTitle': 'التبديل إلى الإنجليزية'
    }
  };

  /* ---------------- language state ---------------- */

  function read() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.indexOf(stored) !== -1 ? stored : DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  var current = read();
  var listeners = [];

  function dir(lang) {
    return (lang || current) === 'ar' ? 'rtl' : 'ltr';
  }

  function apply() {
    var root = document.documentElement;
    root.setAttribute('lang', current);
    root.setAttribute('dir', dir());
    root.setAttribute('data-lang', current);
  }

  function set(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    if (lang === current) return current;
    current = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
    apply();
    listeners.forEach(function (cb) {
      try { cb(current); } catch (e) { /* listener errors must not break the page */ }
    });
    return current;
  }

  function other() {
    return current === 'ar' ? 'en' : 'ar';
  }

  function onChange(cb) {
    if (typeof cb === 'function') listeners.push(cb);
  }

  /* ---------------- lookup helpers ---------------- */

  function fill(value, vars) {
    if (typeof value === 'function') return String(value(vars || {}));
    return String(value).replace(/\{(\w+)\}/g, function (m, name) {
      return (vars && vars[name] !== undefined) ? String(vars[name]) : m;
    });
  }

  function t(key, vars) {
    var value = dict[current] && dict[current][key];
    if (value === undefined) value = dict[DEFAULT_LANG][key];
    if (value === undefined) return key;
    return fill(value, vars);
  }

  function pick(map) {
    if (!map) return undefined;
    return map[current] !== undefined ? map[current] : map[DEFAULT_LANG];
  }

  function localized(obj, field) {
    if (!obj) return '';
    var translated = obj[field + '_' + current];
    return translated !== undefined && translated !== '' ? translated : obj[field];
  }

  /* ---------------- language toggle button ---------------- */

  function initToggle(options) {
    var o = options || {};
    var btn = typeof o.button === 'string' ? document.getElementById(o.button) : o.button;
    if (!btn) return;

    var label = btn.querySelector('[data-lang-label]');
    if (label) label.textContent = t('lang.toggleLabel');
    btn.title = t('lang.toggleTitle');
    btn.setAttribute('aria-label', t('lang.toggleTitle'));

    btn.addEventListener('click', function () {
      set(other());
      location.reload();
    });
  }

  /* ---------------- boot ---------------- */

  window.RaffI18n = {
    storageKey: STORAGE_KEY,
    supported: SUPPORTED,
    get: function () { return current; },
    set: set,
    other: other,
    dir: dir,
    apply: apply,
    t: t,
    pick: pick,
    localized: localized,
    onChange: onChange,
    initToggle: initToggle
  };

  apply();
})();
