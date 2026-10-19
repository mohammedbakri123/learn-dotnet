"use strict";

/* Module 06 page script — state, knowledge checks, assessment, and
   five bespoke widgets (request simulator, JWT explorer, validation
   decision simulator, authorization policy lab, resource-ownership
   simulator).
   Shared shell, navigation, progress, theme, search, glossary,
   export/import/reset, highlighting and copy buttons come from
   component/core/content.js (RaffContent). */

(function () {

  /* ---------------- helpers ---------------- */

  var esc = function (s) { return RaffUI.escapeHtml(s); };
  var fmtInline = function (s) { return RaffUI.fmtInline(s); };
  function toast(msg) { RaffUI.toast(msg); }

  function _q(sel, root) { return (root || document).querySelector(sel); }
  function _qa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------------- Arabic overlay (no-op for EN) ---------------- */
  var OV = (RaffI18n.get() === "ar") ? (window.RAFF_MODULE_06_AR || null) : null;
  var LESSONS = MODULE_LESSONS;
  var CHECKS = KNOWLEDGE_CHECKS;
  var ASSESSMENT = ASSESSMENT_QUESTIONS;
  var TERMS = GLOSSARY;
  var META = LESSON_META;
  var REQUEST_SIM = REQUEST_SIMULATOR;
  var JWT = JWT_SAMPLE;
  var VALIDATION = VALIDATION_SCENARIOS;
  var POLICY_MODES_L = POLICY_MODES;
  var POLICY_ENDPOINTS_L = POLICY_ENDPOINTS;
  var OWNERSHIP = OWNERSHIP_SIMULATOR;

  function mergeLookup(base, overlay) {
    if (!overlay) return base;
    var out = {};
    Object.keys(base).forEach(function (k) {
      var raw = base[k];
      var ov = overlay[k];
      if (ov && typeof raw === "object" && raw !== null) out[k] = Object.assign({}, raw, ov);
      else out[k] = ov !== undefined ? ov : raw;
    });
    Object.keys(overlay).forEach(function (k) { if (!(k in out)) out[k] = overlay[k]; });
    return out;
  }

  if (OV) {
    if (OV.lessons) LESSONS = RaffI18n.mergeById(MODULE_LESSONS, OV.lessons);
    if (OV.knowledgeChecks) CHECKS = KNOWLEDGE_CHECKS.map(function (c) { var o = OV.knowledgeChecks[c.id]; return o ? Object.assign({}, c, o) : c; });
    if (OV.assessmentQuestions) ASSESSMENT = ASSESSMENT_QUESTIONS.map(function (q) { var o = OV.assessmentQuestions[q.id]; return o ? Object.assign({}, q, o) : q; });
    if (OV.glossary) TERMS = GLOSSARY.map(function (t) { var o = OV.glossary[t.t]; return o ? Object.assign({}, t, o) : t; });
    if (OV.lessonMeta) META = LESSON_META.map(function (m) { var o = OV.lessonMeta[m.id]; return o ? Object.assign({}, m, o) : m; });
    if (OV.requestSimulator) {
      REQUEST_SIM = Object.assign({}, REQUEST_SIMULATOR, {
        callers: mergeLookup(REQUEST_SIMULATOR.callers, OV.requestSimulator.callers),
        credentials: mergeLookup(REQUEST_SIMULATOR.credentials, OV.requestSimulator.credentials),
        endpoints: mergeLookup(REQUEST_SIMULATOR.endpoints, OV.requestSimulator.endpoints),
        book: Object.assign({}, REQUEST_SIMULATOR.book, OV.requestSimulator.book || {})
      });
    }
    if (OV.jwtSample) {
      JWT = Object.assign({}, JWT_SAMPLE, {
        segmentInfo: mergeLookup(JWT_SAMPLE.segmentInfo, OV.jwtSample.segmentInfo),
        claimInfo: Object.assign({}, JWT_SAMPLE.claimInfo, OV.jwtSample.claimInfo || {})
      });
    }
    if (OV.validationScenarios) {
      VALIDATION = VALIDATION_SCENARIOS.map(function (s) { var o = OV.validationScenarios[s.id]; return o ? Object.assign({}, s, o) : s; });
    }
    if (OV.policyModes) POLICY_MODES_L = Object.assign({}, POLICY_MODES, OV.policyModes);
    if (OV.policyEndpoints) {
      POLICY_ENDPOINTS_L = POLICY_ENDPOINTS.map(function (e) { var o = OV.policyEndpoints[e.id]; return o ? Object.assign({}, e, o) : e; });
    }
    if (OV.ownershipSimulator) {
      OWNERSHIP = Object.assign({}, OWNERSHIP_SIMULATOR, {
        callers: mergeLookup(OWNERSHIP_SIMULATOR.callers, OV.ownershipSimulator.callers),
        books: mergeLookup(OWNERSHIP_SIMULATOR.books, OV.ownershipSimulator.books),
        operations: mergeLookup(OWNERSHIP_SIMULATOR.operations, OV.ownershipSimulator.operations)
      });
    }
  }

  var S = RaffI18n.pick({
    en: {
      lessonDone: function (n) { return "Lesson " + n + " Completed ✓"; },
      markLesson: function (n) { return "Mark Lesson " + n + " Complete ✓"; },
      correct: "Correct.",
      notQuite: "Not quite.",
      notQuiteHelp: " Re-read the relevant lesson section, then try again — the explanation appears once you find the right answer.",
      kcBadge: "Knowledge Check",
      ofTotal: function (i, total) { return i + " of " + total; },
      answeredChip: "Answered",
      correctChip: "Correct ✓",
      incorrectChip: "Incorrect ✗",
      checkAnswer: "Check Answer",
      selectFirst: "Select an answer first.",
      resultTitle: "Result",
      passChip: "PASS ✓",
      failChip: "FAIL ✗",
      correctTotal: function (s, t, thr) { return s + " / " + t + " correct • pass threshold " + thr + "%"; },
      breakdownTitle: "Per-topic breakdown — click to review",
      lessonsBreakdown: function (n) { return "Lesson " + n + ": "; },
      revisitTitle: "Questions to revisit",
      yourAnswer: "Your answer: ",
      notAnswered: "(not answered)",
      correctAnswer: "Correct: ",
      reviewLabel: function (label) { return "Review " + label + " →"; },
      perfect: "Perfect score — every question correct. 🎓",
      qOf: function (i, t) { return "Question " + i + " of " + t; },
      lessonLabel: function (n) { return "Lesson " + n; },
      answerAll: function (a, t) { return "Answer all questions before submitting (" + a + "/" + t + " answered)."; },
      passedToast: function (pct) { return "Assessment passed — " + pct + "% ✓"; },
      submittedToast: function (pct, thr) { return "Assessment submitted — " + pct + "% (below " + thr + "% threshold)"; },
      retryToast: "Assessment reset — fresh attempt. Best score is kept.",
      groupLessons: "Lessons",
      groupChecks: "Knowledge checks",
      groupGlossary: "Glossary",
      lessonTitlePrefix: function (n) { return "Lesson " + n + " — "; },
      kcTitle: function (n) { return "Knowledge check" + (n ? " — Lesson " + n : ""); },
      units: "Lessons",
      checks: "Checks correct",
      exportToast: "Progress exported.",
      exportErrorToast: "Export failed — storage unavailable.",
      importSuccessToast: "Progress imported successfully.",
      importErrorToast: "Import failed — the file could not be read.",
      resetToast: "All module progress was reset.",
      importedToast: "Progress imported successfully.",
      importInvalidToast: "Import failed — that file is not a valid Module 6 progress export.",
      markedComplete: function (done, total) { return "Lesson marked complete — " + done + "/" + total + " lessons."; },
      copySuccessToast: "Code copied to clipboard.",
      copyFailToast: "Copy failed — select the code manually.",
      searchPlaceholder: "Search lessons, topics, checks, and glossary terms… (e.g. \"JWT\", \"policy\", \"ownership\")",
      searchHintHtml: '<p style="color:var(--text-muted); font-size:0.85rem;">Type at least two characters. Try “JWT”, “claims”, “policy”, “ownership”, or “IDOR”.</p>',
      searchNoMatch: function (q) { return '<p style="color:var(--text-muted); font-size:0.85rem;">No matches for “' + esc(q) + '”.</p>'; },
      glossaryEmpty: "No terms match.",
      goToLabel: function (label) { return "Go to " + label + " →"; },
      checkAnswers: "Check my answers",
      reset: "Reset",
      choose: "— choose —",
      requestTitle: "Request simulator",
      requestCaller: "Caller",
      requestCredential: "Credential presented",
      requestEndpoint: "Endpoint",
      requestSend: "Send request",
      requestReset: "Reset",
      requestAuthHeader: "Authentication",
      requestAuthzHeader: "Authorization",
      requestAuthNone: "No valid credential reached the scheme — the protected request is challenged.",
      requestAuthExpired: "Lifetime validation fails — the token is authentic but expired.",
      requestAuthInvalid: "Signature validation fails — the token bytes do not match the signature.",
      requestAuthValid: "Token validated — a trusted principal is produced.",
      requestAuthAnonymous: "This endpoint is marked AllowAnonymous, so no identity is required.",
      requestDecision: "Decision",
      request401: "401 challenge — no acceptable identity.",
      request200Public: "200 — public catalog returned anonymously.",
      request200User: "200 — authenticated request accepted.",
      request403: "403 Forbidden — authenticated but the role requirement is not satisfied.",
      request204Owner: "204 No Content — owner check passed.",
      request404Owner: "404 by contract — authenticated, but not the owner of Book 42.",
      request401Owner: "401 challenge — ownership cannot even be evaluated without an identity.",
      requestNote: "Authentication produces the principal; authorization then evaluates the endpoint rule and, for owner operations, the resource rule.",
      jwtTitle: "JWT explorer",
      jwtSegmentHeader: "Header",
      jwtSegmentPayload: "Payload",
      jwtSegmentSignature: "Signature",
      jwtDecodedHeader: "Decoded header",
      jwtDecodedPayload: "Decoded payload",
      jwtSegmentPurpose: "Purpose",
      jwtSegmentWarning: "Warning",
      jwtTamper: "Tamper with the payload",
      jwtRestore: "Restore original payload",
      jwtFictional: "Fictional token for teaching only — never paste a real token into an untrusted tool.",
      jwtClaimList: "Claim meanings",
      jwtReadable: "Decoding is not validation. Anyone can read these bytes; only the API's validator can establish that they are trustworthy.",
      jwtCallout: "In this tampered state the payload claims Administrator, but the signature segment no longer matches. A correct validator rejects the token before any role check uses the forged value.",
      jwtSigTampered: "signature no longer matches the modified header/payload",
      jwtSigFictional: "fictional cryptographic signature bytes",
      valTitle: "Validation decision simulator",
      valScenario: "Token condition",
      valToken: "Token",
      valChecksTitle: "Validation pipeline",
      valCheckFormat: "Format / scheme",
      valCheckSignature: "Signature",
      valCheckIssuer: "Issuer",
      valCheckAudience: "Audience",
      valCheckLifetime: "Lifetime",
      valPass: "pass",
      valFail: "fail",
      valSkip: "skipped",
      valReveal: "Reveal decision",
      valReset: "Reset",
      valFirstFail: "First failing check",
      valDecision: "Decision",
      valAuthzNote: "Note: token validation is authentication. Authorization still runs afterward and can reject a valid identity.",
      polTitle: "Authorization policy lab",
      polEndpoint: "Endpoint",
      polRequirement: "Stated requirement",
      polRule: "Selected rule",
      polCheck: "Check rows",
      polReset: "Reset",
      polCorrect: "Correct",
      polIncorrect: "Incorrect",
      polWhy: "Why",
      polScore: function (n, total) { return "Policy lab: " + n + " / " + total + " rows correct."; },
      ownTitle: "Resource-ownership simulator",
      ownCaller: "Caller",
      ownBook: "Target book",
      ownOperation: "Operation",
      ownEvaluate: "Evaluate request",
      ownReset: "Reset",
      ownDecision: "Decision",
      ownGranted: "Allowed",
      ownChallenge: "401 challenge",
      ownForbidden: "403 Forbidden",
      ownNotFound: "404 Not Found (contract hides the resource)",
      ownSuccess: "200 — access granted",
      ownSuccessWrite: "204 No Content — ownership check passed",
      ownDeniedAuth: "No authenticated identity — the endpoint is challenged before ownership is considered.",
      ownDeniedOwnership: "Alice-style mis-match in general terms: the caller is authenticated but is not the stored owner, so the resource-level check fails. Raff's contract returns 404.",
      ownRule: "Rule applied",
      ownSummary: function (caller, book, op) { return caller + " → " + op + " on " + book; },
      widgetError: "This widget could not start. See the browser console for details."
    },
    ar: {
      lessonDone: function (n) { return "اكتمل الدرس " + n + " ✓"; },
      markLesson: function (n) { return "إكمال الدرس " + n + " ✓"; },
      correct: "إجابة صحيحة.",
      notQuite: "ليست الإجابة الصحيحة.",
      notQuiteHelp: " أعد قراءة القسم المتعلق بالسؤال ثم حاول مجددًا — يظهر الشرح بعد اختيار الإجابة الصحيحة.",
      kcBadge: "اختبار معرفي",
      ofTotal: function (i, total) { return i + " من " + total; },
      answeredChip: "تمت الإجابة",
      correctChip: "صحيحة ✓",
      incorrectChip: "خاطئة ✗",
      checkAnswer: "تحقق من الإجابة",
      selectFirst: "اختر إجابة أولًا.",
      resultTitle: "النتيجة",
      passChip: "ناجح ✓",
      failChip: "غير ناجح ✗",
      correctTotal: function (s, t, thr) { return s + " / " + t + " صحيحة • حد النجاح " + thr + "%"; },
      breakdownTitle: "التحليل حسب الموضوع — انقر للمراجعة",
      lessonsBreakdown: function (n) { return "الدرس " + n + ": "; },
      revisitTitle: "أسئلة للمراجعة",
      yourAnswer: "إجابتك: ",
      notAnswered: "(بدون إجابة)",
      correctAnswer: "الصحيحة: ",
      reviewLabel: function (label) { return "راجع " + label + " ←"; },
      perfect: "درجة كاملة — كل الإجابات صحيحة. 🎓",
      qOf: function (i, t) { return "السؤال " + i + " من " + t; },
      lessonLabel: function (n) { return "الدرس " + n; },
      answerAll: function (a, t) { return "أجب عن جميع الأسئلة قبل الإرسال (" + a + "/" + t + " تمت الإجابة)."; },
      passedToast: function (pct) { return "نجحت في التقييم — " + pct + "% ✓"; },
      submittedToast: function (pct, thr) { return "أُرسل التقييم — " + pct + "% (أقل من حد " + thr + "%)"; },
      retryToast: "أُعيد التقييم — محاولة جديدة. تُحفظ أفضل درجة.",
      groupLessons: "الدروس",
      groupChecks: "الاختبارات المعرفية",
      groupGlossary: "المصطلحات",
      lessonTitlePrefix: function (n) { return "الدرس " + n + " — "; },
      kcTitle: function (n) { return "اختبار معرفي" + (n ? " — الدرس " + n : ""); },
      units: "الدروس",
      checks: "اختبارات صحيحة",
      exportToast: "صُدّر التقدّم.",
      exportErrorToast: "تعذّر التصدير — التخزين غير متاح.",
      importSuccessToast: "استُورد التقدّم بنجاح.",
      importErrorToast: "تعذّر الاستيراد — تعذّرت قراءة الملف.",
      resetToast: "أُعيد تعيين كل تقدّم الوحدة.",
      importedToast: "استُورد التقدّم بنجاح.",
      importInvalidToast: "تعذّر الاستيراد — الملف ليس تصديرًا صالحًا لتقدّم الوحدة 6.",
      markedComplete: function (done, total) { return "اكتمل الدرس — " + done + "/" + total + " دروس."; },
      copySuccessToast: "نُسخ الكود إلى الحافظة.",
      copyFailToast: "تعذّر النسخ — حدّد الكود يدويًا.",
      searchPlaceholder: "ابحث في الدروس والمواضيع والاختبارات والمصطلحات… (مثل \"JWT\" أو \"policy\" أو \"ownership\")",
      searchHintHtml: '<p style="color:var(--text-muted); font-size:0.85rem;">اكتب حرفين على الأقل. جرّب “JWT” أو “claims” أو “policy” أو “ownership” أو “IDOR”.</p>',
      searchNoMatch: function (q) { return '<p style="color:var(--text-muted); font-size:0.85rem;">لا توجد نتائج لـ “' + esc(q) + '”.</p>'; },
      glossaryEmpty: "لا توجد مصطلحات مطابقة.",
      goToLabel: function (label) { return "انتقل إلى " + label + " ←"; },
      checkAnswers: "تحقق من الإجابات",
      reset: "إعادة تعيين",
      choose: "— اختر —",
      requestTitle: "محاكي الطلبات",
      requestCaller: "المُستدعي",
      requestCredential: "بيانات الاعتماد المقدَّمة",
      requestEndpoint: "نقطة النهاية",
      requestSend: "أرسل الطلب",
      requestReset: "إعادة تعيين",
      requestAuthHeader: "المصادقة",
      requestAuthzHeader: "التخويل",
      requestAuthNone: "لم تصل بيانات اعتماد صالحة إلى المخطط — يُتحدّى الطلب المحمي.",
      requestAuthExpired: "يفشل التحقق من العمر — الرمز أصلي لكنه منتهي الصلاحية.",
      requestAuthInvalid: "يفشل التحقق من التوقيع — بايتات الرمز لا تطابق التوقيع.",
      requestAuthValid: "تم التحقق من الرمز — يُنتَج أصل موثوق.",
      requestAuthAnonymous: "هذه النهاية معلَّمة AllowAnonymous، فلا حاجة إلى هوية.",
      requestDecision: "القرار",
      request401: "تحدٍّ 401 — لا توجد هوية مقبولة.",
      request200Public: "200 — يُعاد الفهرس العام بلا هوية.",
      request200User: "200 — قُبل الطلب الموثّق.",
      request403: "403 ممنوع — موثّق لكن شرط الدور غير محقق.",
      request204Owner: "204 بلا محتوى — نجح شرط الملكية.",
      request404Owner: "404 وفق العقد — موثّق لكنه ليس مالك الكتاب 42.",
      request401Owner: "تحدٍّ 401 — لا يمكن تقييم الملكية دون هوية.",
      requestNote: "المصادقة تنتج الأصل؛ ثم يقيّم التخويل قاعدة النهاية، ولعمليات المالك يقيّم قاعدة المورد.",
      jwtTitle: "مستكشف JWT",
      jwtSegmentHeader: "الترويسة",
      jwtSegmentPayload: "الحمولة",
      jwtSegmentSignature: "التوقيع",
      jwtDecodedHeader: "الترويسة بعد الفكّ",
      jwtDecodedPayload: "الحمولة بعد الفكّ",
      jwtSegmentPurpose: "الغرض",
      jwtSegmentWarning: "تحذير",
      jwtTamper: "التلاعب بالحمولة",
      jwtRestore: "استعادة الحمولة الأصلية",
      jwtFictional: "رمز خيالي للتعليم فقط — لا تلصق رمزًا حقيقيًا في أداة غير موثوقة.",
      jwtClaimList: "معاني المطالبات",
      jwtReadable: "الفكّ ليس تحققًا. يستطيع أي شخص قراءة هذه البايتات؛ فقط مدقّق الـ API يستطيع إثبات أنها جديرة بالثقة.",
      jwtCallout: "في حالة التلاعب هذه تدّعي الحمولة دور Administrator، لكن قطعة التوقيع لم تعد تطابقها. المدقّق الصحيح يرفض الرمز قبل أن يستخدم أي فحص دور القيمة المزوّرة.",
      jwtSigTampered: "التوقيع لم يعد يطابق الترويسة/الحمولة المعدَّلة",
      jwtSigFictional: "بايتات توقيع تشفيري خيالية",
      valTitle: "محاكي قرار التحقق",
      valScenario: "حالة الرمز",
      valToken: "الرمز",
      valChecksTitle: "مسار التحقق",
      valCheckFormat: "الصيغة / المخطط",
      valCheckSignature: "التوقيع",
      valCheckIssuer: "المُصدِر",
      valCheckAudience: "الجمهور",
      valCheckLifetime: "العمر",
      valPass: "نجاح",
      valFail: "فشل",
      valSkip: "متخطّى",
      valReveal: "اكشف القرار",
      valReset: "إعادة تعيين",
      valFirstFail: "أول فحص فاشل",
      valDecision: "القرار",
      valAuthzNote: "ملاحظة: التحقق من الرمز مصادقة. يبقى التخويل يعمل بعده ويمكن أن يرفض هوية صالحة.",
      polTitle: "مختبر سياسات التخويل",
      polEndpoint: "نقطة النهاية",
      polRequirement: "المتطلب المذكور",
      polRule: "القاعدة المختارة",
      polCheck: "تحقق من الصفوف",
      polReset: "إعادة تعيين",
      polCorrect: "صحيح",
      polIncorrect: "غير صحيح",
      polWhy: "السبب",
      polScore: function (n, total) { return "مختبر السياسات: " + n + " / " + total + " صفوف صحيحة."; },
      ownTitle: "محاكي ملكية الموارد",
      ownCaller: "المُستدعي",
      ownBook: "الكتاب الهدف",
      ownOperation: "العملية",
      ownEvaluate: "قيّم الطلب",
      ownReset: "إعادة تعيين",
      ownDecision: "القرار",
      ownGranted: "مسموح",
      ownChallenge: "تحدٍّ 401",
      ownForbidden: "403 ممنوع",
      ownNotFound: "404 غير موجود (العقد يخفي المورد)",
      ownSuccess: "200 — مُنح الوصول",
      ownSuccessWrite: "204 بلا محتوى — نجح فحص الملكية",
      ownDeniedAuth: "لا توجد هوية موثّقة — تُتحدّى النهاية قبل النظر في الملكية.",
      ownDeniedOwnership: "المُستدعي موثّق لكنه ليس المالك المخزَّن، لذا يفشل فحص مستوى المورد. عقد Raff يعيد 404.",
      ownRule: "القاعدة المطبَّقة",
      ownSummary: function (caller, book, op) { return caller + " ← " + op + " على " + book; },
      widgetError: "تعذّر تشغيل هذه الأداة. راجع وحدة تحكم المتصفح للتفاصيل."
    }
  });

  var REDUCED = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var LESSON_IDS = ["lesson-1", "lesson-2", "lesson-3", "lesson-4", "lesson-5", "lesson-6", "lesson-7"];

  /* ---------------- state ---------------- */

  function defaultState() {
    return {
      marker: APP_MARKER,
      version: 1,
      theme: "dark",
      active: null,
      completedLessons: {},
      checks: {},
      assessment: { started: false, submitted: false, selections: {}, best: null, last: null, threshold: 80 }
    };
  }

  function normalizeState(p) {
    var a = (p.assessment && typeof p.assessment === "object") ? p.assessment : {};
    var threshold = [70, 80, 90].indexOf(a.threshold) !== -1 ? a.threshold : 80;
    return {
      marker: APP_MARKER,
      version: 1,
      theme: p.theme === "light" ? "light" : "dark",
      active: typeof p.active === "string" ? p.active : null,
      completedLessons: (p.completedLessons && typeof p.completedLessons === "object") ? p.completedLessons : {},
      checks: (p.checks && typeof p.checks === "object") ? p.checks : {},
      assessment: {
        started: !!a.started,
        submitted: !!a.submitted,
        selections: (a.selections && typeof a.selections === "object") ? a.selections : {},
        best: a.best || null,
        last: a.last || null,
        threshold: threshold
      }
    };
  }

  var appState = defaultState();
  var state = appState;

  function replaceState(next) {
    Object.keys(appState).forEach(function (k) { delete appState[k]; });
    Object.assign(appState, next);
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var p = JSON.parse(raw);
      if (!p || typeof p !== "object" || p.marker !== APP_MARKER) return;
      replaceState(normalizeState(p));
    } catch (e) { /* keep defaults */ }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(appState)); } catch (e) { /* storage unavailable */ }
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    var icon = document.getElementById("theme-icon");
    if (icon) icon.textContent = state.theme === "dark" ? "☀️" : "🌙";
  }

  var courseCtx = null;
  function notifyChange() { if (courseCtx) courseCtx.refresh(); }

  /* ---------------- progress ---------------- */

  function lessonsDoneCount() {
    return LESSON_IDS.filter(function (id) { return !!state.completedLessons[id]; }).length;
  }
  function checksCorrectCount() {
    return CHECKS.filter(function (c) { return state.checks[c.id] && state.checks[c.id].correct; }).length;
  }
  function assessmentPassed() {
    return !!(state.assessment.best && state.assessment.best.passed);
  }
  function computeProgress() {
    var lessons = lessonsDoneCount();
    var total = LESSON_IDS.length;
    var lessonPct = Math.round(lessons / total * 100);
    var checkPct = checksCorrectCount() / CHECKS.length;
    var pct = Math.round(lessons / total * 60 + checkPct * 30 + (assessmentPassed() ? 10 : 0));
    Array.prototype.forEach.call(document.querySelectorAll(".btn-complete-lesson[data-lesson]"), function (btn) {
      var id = btn.getAttribute("data-lesson");
      if (!id) return;
      var isDone = !!state.completedLessons[id];
      var num = id.replace("lesson-", "");
      btn.textContent = isDone ? S.lessonDone(num) : S.markLesson(num);
    });
    return {
      percent: pct,
      lessonsLabel: lessons + " / " + total + " (" + lessonPct + "%)",
      checksLabel: checksCorrectCount() + " / " + CHECKS.length
    };
  }

  /* ---------------- knowledge checks ---------------- */
  function kcCardHtml(kc, idx, total) {
    var st = state.checks[kc.id] || {};
    var locked = !!st.correct;
    var opts = kc.options.map(function (o, i) {
      var cls = "quiz-option";
      if (st.selected === i) cls += " selected";
      if (locked && i === kc.correct) cls += " correct";
      if (!locked && st.checkedWrong && st.selected === i) cls += " incorrect";
      return '<button class="' + cls + '" type="button" data-check-id="' + kc.id + '" data-opt="' + i + '">' +
        '<span class="option-indicator">' + String.fromCharCode(65 + i) + "</span>" +
        '<span class="option-text">' + fmtInline(o) + "</span></button>";
    }).join("");
    var feedback = "";
    if (locked) {
      feedback = '<div class="quiz-feedback success"><strong>' + S.correct + '</strong> ' + fmtInline(kc.explain) + "</div>";
    } else if (st.checkedWrong) {
      feedback = '<div class="quiz-feedback error"><strong>' + S.notQuite + '</strong>' + S.notQuiteHelp + "</div>";
    }
    var actions = locked
      ? '<button class="btn-complete-lesson done" type="button" disabled>' + S.correctChip + '</button>'
      : '<button class="btn-primary kc-check-btn" type="button" data-check-id="' + kc.id + '">' + S.checkAnswer + '</button>';
    return '<div class="exercise-card" data-kc-card="' + kc.id + '">' +
      '<div class="exercise-header">' +
        '<div><span class="exercise-badge">' + S.kcBadge + '</span><span style="font-size:0.8rem; color:var(--text-muted);">' + S.ofTotal(idx + 1, total) + "</span></div>" +
        (locked ? '<span class="score-chip pass">' + S.answeredChip + '</span>' : "") +
      "</div>" +
      '<div class="exercise-body">' +
        '<div class="exercise-prompt">' + fmtInline(kc.prompt) + "</div>" +
        '<div class="quiz-options">' + opts + "</div>" +
        '<div class="exercise-actions">' + actions + "</div>" +
        feedback +
      "</div></div>";
  }

  function renderChecks() {
    Array.prototype.forEach.call(document.querySelectorAll(".kc-mount"), function (mount) {
      var group = mount.dataset.kcGroup;
      var list = CHECKS.filter(function (c) { return c.group === group; });
      mount.innerHTML = list.map(function (kc, i) { return kcCardHtml(kc, i, list.length); }).join("");
    });
  }

  function handleCheckOptionClick(btn) {
    var id = btn.dataset.checkId;
    var st = state.checks[id] || {};
    if (st.correct) return;
    st.selected = parseInt(btn.dataset.opt, 10);
    delete st.checkedWrong;
    state.checks[id] = st;
    saveState();
    renderChecks();
    notifyChange();
  }

  function handleCheckSubmit(btn) {
    var id = btn.dataset.checkId;
    var kc = null;
    for (var i = 0; i < CHECKS.length; i++) {
      if (CHECKS[i].id === id) { kc = CHECKS[i]; break; }
    }
    if (!kc) return;
    var st = state.checks[id] || {};
    if (st.selected === undefined || st.selected === null) {
      toast(S.selectFirst);
      return;
    }
    if (st.selected === kc.correct) {
      st.correct = true;
      delete st.checkedWrong;
    } else {
      st.checkedWrong = true;
    }
    state.checks[id] = st;
    saveState();
    renderChecks();
    notifyChange();
  }

  /* ---------------- assessment ---------------- */
  function lessonTagLabel(id) {
    var meta = META.filter(function (m) { return m.id === id; })[0];
    return meta ? meta.label : id;
  }
  function lessonNum(id) {
    var i = LESSON_IDS.indexOf(id);
    return i === -1 ? null : (i + 1);
  }

  function assessmentResultsHtml(last) {
    var wrong = ASSESSMENT.map(function (q, i) { return { q: q, i: i, sel: state.assessment.selections[q.id] }; })
      .filter(function (x) { return x.sel !== x.q.correct; });
    var lessons = [];
    ASSESSMENT.forEach(function (q) { if (lessons.indexOf(q.lesson) === -1) lessons.push(q.lesson); });
    var breakdown = lessons.map(function (lid) {
      var qs = ASSESSMENT.filter(function (q) { return q.lesson === lid; });
      var c = qs.filter(function (q) { return state.assessment.selections[q.id] === q.correct; }).length;
      var n = lessonNum(lid);
      return '<button class="glossary-term-link" type="button" data-nav-target="' + lid + '">' +
        (n ? S.lessonsBreakdown(n) : "") + c + "/" + qs.length + "</button>";
    }).join("");
    var html = '<div class="content-panel" style="margin-top:1.5rem;">' +
      '<h3 style="margin-top:0;">' + S.resultTitle + "</h3>" +
      "<p><span class=\"score-chip " + (last.passed ? "pass" : "fail") + '" style="font-size:1rem;">' + last.pct + "% — " + (last.passed ? S.passChip : S.failChip) + "</span> " +
      S.correctTotal(last.score, last.total, last.threshold) + "</p>" +
      '<div class="explorer-control-label" style="margin-bottom:0.5rem;">' + S.breakdownTitle + "</div>" +
      '<div style="display:flex; flex-wrap:wrap; gap:0.5rem;">' + breakdown + "</div>";
    if (wrong.length) {
      html += "<h4>" + S.revisitTitle + "</h4>" + wrong.map(function (x) {
        return '<div class="content-panel" style="margin-bottom:0.75rem;">' +
          '<div style="font-weight:600; margin-bottom:0.4rem;">' + fmtInline(x.q.prompt) + "</div>" +
          '<div style="font-size:0.85rem; color:var(--danger);">' + S.yourAnswer + (x.sel === undefined || x.sel === null ? S.notAnswered : fmtInline(x.q.options[x.sel])) + "</div>" +
          '<div style="font-size:0.85rem; color:var(--success);">' + S.correctAnswer + fmtInline(x.q.options[x.q.correct]) + "</div>" +
          '<div style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.4rem;">' + fmtInline(x.q.explain) + "</div>" +
          '<button class="glossary-term-link" type="button" data-nav-target="' + x.q.lesson + '" style="margin-top:0.5rem;">' + S.reviewLabel(esc(lessonTagLabel(x.q.lesson))) + "</button>" +
          "</div>";
      }).join("");
    } else {
      html += '<p style="color:var(--success); font-weight:600; margin-top:1rem;">' + S.perfect + "</p>";
    }
    html += "</div>";
    return html;
  }

  function renderAssessment() {
    var a = state.assessment;
    var intro = document.getElementById("assessment-intro");
    var qHost = document.getElementById("assessment-questions");
    var actions = document.getElementById("assessment-actions");
    var results = document.getElementById("assessment-results");
    if (!intro || !qHost) return;
    var th = document.getElementById("assessment-threshold");
    if (th) th.value = String(a.threshold);
    intro.hidden = !!a.started;
    qHost.hidden = !a.started;
    if (actions) actions.hidden = !a.started;
    if (a.started) {
      qHost.innerHTML = "";
      ASSESSMENT.forEach(function (q, qi) {
        var sel = a.selections[q.id];
        var isSubmitted = !!a.submitted;
        var correctHere = isSubmitted && sel === q.correct;
        var opts = q.options.map(function (o, i) {
          var cls = "quiz-option";
          if (sel === i) cls += " selected";
          if (isSubmitted && i === q.correct) cls += " correct";
          if (isSubmitted && sel === i && i !== q.correct) cls += " incorrect";
          return '<button class="' + cls + '" type="button" data-asq="' + q.id + '" data-opt="' + i + '">' +
            '<span class="option-indicator">' + String.fromCharCode(65 + i) + "</span>" +
            '<span class="option-text">' + fmtInline(o) + "</span></button>";
        }).join("");
        var num = lessonNum(q.lesson);
        var card = document.createElement("div");
        card.className = "exercise-card";
        card.innerHTML =
          '<div class="exercise-header">' +
            "<div><span class=\"exercise-badge exercise\">" + S.qOf(qi + 1, ASSESSMENT.length) + '</span> <span class="exercise-badge">' + esc(num ? S.lessonLabel(num) : lessonTagLabel(q.lesson)) + "</span></div>" +
            (isSubmitted ? '<span class="score-chip ' + (correctHere ? "pass" : "fail") + '">' + (correctHere ? S.correctChip : S.incorrectChip) + "</span>" : "") +
          "</div>" +
          '<div class="exercise-body">' +
            '<div class="exercise-prompt">' + fmtInline(q.prompt) + "</div>" +
            '<div class="quiz-options">' + opts + "</div>" +
            (isSubmitted ? '<div class="quiz-feedback ' + (correctHere ? "success" : "error") + '">' + fmtInline(q.explain) + "</div>" : "") +
          "</div>";
        qHost.appendChild(card);
      });
    }
    var submit = document.getElementById("btn-submit-assessment");
    if (submit) submit.hidden = !!a.submitted;
    var retry = document.getElementById("btn-retry-assessment");
    if (retry) retry.hidden = !a.submitted;
    if (results) results.innerHTML = (a.submitted && a.last) ? assessmentResultsHtml(a.last) : "";
  }

  function submitAssessment() {
    var a = state.assessment;
    var total = ASSESSMENT.length;
    var answered = ASSESSMENT.filter(function (q) { return a.selections[q.id] !== undefined; }).length;
    if (answered < total) {
      toast(S.answerAll(answered, total));
      return;
    }
    var score = ASSESSMENT.filter(function (q) { return a.selections[q.id] === q.correct; }).length;
    var pct = Math.round(score / total * 100);
    var passed = pct >= a.threshold;
    var last = { score: score, total: total, pct: pct, passed: passed, threshold: a.threshold, at: new Date().toISOString() };
    a.last = last;
    a.submitted = true;
    if (!a.best || pct > a.best.pct) a.best = last;
    saveState();
    renderAssessment();
    notifyChange();
    var r = document.getElementById("assessment-results");
    if (r) r.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
    toast(passed ? S.passedToast(pct) : S.submittedToast(pct, a.threshold));
  }

  /* ---------------- search ---------------- */
  function searchGetResults(q) {
    var items = [];
    META.filter(function (m) {
      return (m.label + " " + m.keywords + " " + m.summary).toLowerCase().indexOf(q) !== -1;
    }).slice(0, 6).forEach(function (m) {
      var num = lessonNum(m.id);
      items.push({ kind: "lesson", ref: m.id, title: (num ? S.lessonTitlePrefix(num) : "") + m.label, snippet: m.summary.slice(0, 150) });
    });
    CHECKS.filter(function (c) { return c.prompt.toLowerCase().indexOf(q) !== -1; }).slice(0, 6).forEach(function (c) {
      var num = lessonNum(c.group);
      items.push({ kind: "kc", ref: c.group, title: S.kcTitle(num), snippet: c.prompt.slice(0, 150) });
    });
    TERMS.filter(function (t) {
      return (t.t + " " + t.d).toLowerCase().indexOf(q) !== -1;
    }).slice(0, 6).forEach(function (t) {
      items.push({ kind: "glossary", ref: t.t, title: t.t, snippet: t.d.slice(0, 150) + "…" });
    });
    return items;
  }

  function searchRenderer(items) {
    var html = "";
    var group = null;
    items.forEach(function (it) {
      var g = it.kind === "lesson" ? S.groupLessons : (it.kind === "kc" ? S.groupChecks : S.groupGlossary);
      if (g !== group) { html += '<div class="search-group-title">' + g + "</div>"; group = g; }
      var attr = it.kind === "glossary"
        ? ' data-search-glossary="' + esc(it.ref) + '"'
        : ' data-target="' + esc(it.ref) + '"';
      html += '<button class="search-result-item" type="button"' + attr + '>' +
        '<div class="search-result-title">' + esc(it.title) + "</div>" +
        '<div class="search-result-snippet">' + esc(it.snippet) + "</div></button>";
    });
    return html;
  }

  /* ---------------- import ---------------- */
  function applyImported(obj) {
    if (!obj || typeof obj !== "object" || obj.marker !== APP_MARKER) {
      throw new Error("Not a Module 6 progress file.");
    }
    replaceState(normalizeState(obj));
    saveState();
  }

  /* ---------------- widget 1 — request simulator ---------------- */
  function buildRequestSim(root) {
    var body = _q(".simulator-body", root);
    var sel = { caller: "alice", credential: "valid", endpoint: "myShelf" };
    var result = null;

    function options(map, selected) {
      return Object.keys(map).map(function (k) {
        return '<option value="' + k + '"' + (k === selected ? " selected" : "") + ">" + esc(map[k].label) + "</option>";
      }).join("");
    }

    body.innerHTML =
      '<div class="m6-request-controls">' +
      '<label class="explorer-control-group"><span class="explorer-control-label">' + S.requestCaller + "</span>" +
      '<select class="sim-select" data-role="caller">' + options(REQUEST_SIM.callers, sel.caller) + "</select></label>" +
      '<label class="explorer-control-group"><span class="explorer-control-label">' + S.requestCredential + "</span>" +
      '<select class="sim-select" data-role="credential">' + options(REQUEST_SIM.credentials, sel.credential) + "</select></label>" +
      '<label class="explorer-control-group"><span class="explorer-control-label">' + S.requestEndpoint + "</span>" +
      '<select class="sim-select" data-role="endpoint">' + options(REQUEST_SIM.endpoints, sel.endpoint) + "</select></label>" +
      '<div class="simulator-controls">' +
      '<button class="btn-sim primary" type="button" data-role="send">' + S.requestSend + "</button>" +
      '<button class="btn-sim btn-sim-reset" type="button" data-role="reset">' + S.requestReset + "</button>" +
      "</div></div>" +
      '<div class="m6-request-note">' + esc(S.requestNote) + "</div>" +
      '<div data-role="result"></div>';

    function evaluate() {
      var caller = REQUEST_SIM.callers[sel.caller];
      var credential = REQUEST_SIM.credentials[sel.credential];
      var endpoint = REQUEST_SIM.endpoints[sel.endpoint];
      var authOk = credential.state === "valid";
      var anonymousEndpoint = endpoint.rule === "anonymous";
      var authText;
      var decision;

      if (anonymousEndpoint) {
        authText = S.requestAuthAnonymous;
        decision = S.request200Public;
      } else if (credential.state === "none") {
        authText = S.requestAuthNone;
        decision = S.request401;
      } else if (credential.state === "expired") {
        authText = S.requestAuthExpired;
        decision = S.request401;
      } else if (credential.state === "invalid") {
        authText = S.requestAuthInvalid;
        decision = S.request401;
      } else {
        authText = S.requestAuthValid;
        if (endpoint.rule === "authenticated") decision = S.request200User;
        else if (endpoint.rule === "admin") decision = caller.role === "Administrator" ? S.request200User : S.request403;
        else if (endpoint.rule === "owner") {
          if (!authOk) decision = S.request401Owner;
          else decision = caller.sub === REQUEST_SIM.book.ownerId ? S.request204Owner : S.request404Owner;
        } else decision = S.request200User;
      }

      result = { authText: authText, decision: decision, endpoint: endpoint, caller: caller };
      render();
    }

    function render() {
      var host = _q('[data-role="result"]', body);
      if (!result) { host.innerHTML = ""; return; }
      var isDenied = result.decision.indexOf("401") === 0 || result.decision.indexOf("403") === 0;
      host.innerHTML =
        '<div class="m6-request-result">' +
        '<div class="m6-request-line"><span class="m6-request-badge">' + S.requestAuthHeader + '</span><span>' + esc(result.authText) + "</span></div>" +
        '<div class="m6-request-line"><span class="m6-request-badge">' + S.requestAuthzHeader + '</span><span>' + esc(result.decision) + "</span></div>" +
        '<div class="m6-request-caller">' + esc(result.caller.label + " — " + (result.caller.note || "")) + "</div>" +
        '<span class="score-chip ' + (isDenied ? "fail" : "pass") + '" style="margin-top:0.5rem;">' + esc(S.requestDecision) + "</span>" +
        "</div>";
    }

    _q('[data-role="caller"]', body).addEventListener("change", function (e) { sel.caller = e.target.value; result = null; render(); });
    _q('[data-role="credential"]', body).addEventListener("change", function (e) { sel.credential = e.target.value; result = null; render(); });
    _q('[data-role="endpoint"]', body).addEventListener("change", function (e) { sel.endpoint = e.target.value; result = null; render(); });
    _q('[data-role="send"]', body).addEventListener("click", evaluate);
    _q('[data-role="reset"]', body).addEventListener("click", function () {
      sel = { caller: "alice", credential: "valid", endpoint: "myShelf" };
      result = null;
      _q('[data-role="caller"]', body).value = sel.caller;
      _q('[data-role="credential"]', body).value = sel.credential;
      _q('[data-role="endpoint"]', body).value = sel.endpoint;
      render();
    });
  }

  /* ---------------- widget 2 — JWT explorer ---------------- */
  function b64url(text) {
    var b64 = window.btoa(unescape(encodeURIComponent(text)));
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function buildJwtExplorer(root) {
    var body = _q(".simulator-body", root);
    var tampered = false;
    var activeSegment = "header";

    var headerEncoded = b64url(JSON.stringify(JWT.header));
    var payloadEncoded = b64url(JSON.stringify(JWT.payload));
    var tamperedEncoded = b64url(JSON.stringify(JWT.tamperedPayload));
    var signatureSegment = "fictional-signature-value";

    function segment(value, cls) {
      return '<span class="m6-jwt-segment ' + (cls || "") + '">' + esc(value) + "</span>";
    }

    function renderToken() {
      return '<div class="m6-jwt-token">' +
        "<button type=\"button\" class=\"m6-jwt-segment-btn " + (activeSegment === "header" ? "active" : "") + '" data-seg="header">' + esc(headerEncoded) + "</button>" +
        '<span class="m6-jwt-dot">.</span>' +
        "<button type=\"button\" class=\"m6-jwt-segment-btn " + (activeSegment === "payload" ? "active" : "") + '" data-seg="payload">' + esc(tampered ? tamperedEncoded : payloadEncoded) + "</button>" +
        '<span class="m6-jwt-dot">.</span>' +
        "<button type=\"button\" class=\"m6-jwt-segment-btn " + (tampered ? "invalid" : "") + " " + (activeSegment === "signature" ? "active" : "") + '" data-seg="signature">' + esc(signatureSegment) + "</button>" +
        "</div>";
    }

    function renderDetail() {
      var info = JWT.segmentInfo[activeSegment];
      var decoded = "";
      if (activeSegment === "header") decoded = JSON.stringify(JWT.header, null, 2);
      else if (activeSegment === "payload") decoded = JSON.stringify(tampered ? JWT.tamperedPayload : JWT.payload, null, 2);
      else decoded = tampered ? S.jwtSigTampered : S.jwtSigFictional;
      return '<div class="m6-jwt-detail">' +
        '<div class="m6-jwt-detail-head">' + esc(info.label) + "</div>" +
        '<pre class="m6-jwt-json"><code>' + esc(decoded) + "</code></pre>" +
        '<div class="m6-jwt-purpose"><strong>' + S.jwtSegmentPurpose + ":</strong> " + esc(info.purpose) + "</div>" +
        '<div class="m6-jwt-warning"><strong>' + S.jwtSegmentWarning + ":</strong> " + esc(info.warning) + "</div>" +
        "</div>";
    }

    function renderClaims() {
      var payload = tampered ? JWT.tamperedPayload : JWT.payload;
      return '<div class="m6-jwt-claims"><div class="m6-jwt-claims-title">' + S.jwtClaimList + "</div>" +
        Object.keys(payload).map(function (k) {
          if (!JWT.claimInfo[k]) return "";
          return '<div class="m6-jwt-claim-row"><code>' + esc(k) + "</code><span>" + esc(JWT.claimInfo[k]) + "</span></div>";
        }).join("") + "</div>";
    }

    function render() {
      body.innerHTML =
        '<div class="m6-jwt-note">' + esc(S.jwtFictional) + "</div>" +
        '<div class="m6-jwt-tamper-row">' +
        '<button class="btn-sim ' + (tampered ? "btn-sim-reset" : "primary") + '" type="button" data-role="tamper">' + (tampered ? S.jwtRestore : S.jwtTamper) + "</button>" +
        "</div>" +
        renderToken() +
        (tampered ? '<div class="callout callout-warning" style="margin-top:1rem;"><div class="callout-title">' + S.jwtSegmentSignature + '</div><p style="margin-bottom:0;">' + esc(S.jwtCallout) + "</p></div>" : "") +
        renderDetail() +
        renderClaims() +
        '<div class="m6-jwt-readability">' + esc(S.jwtReadable) + "</div>";
    }

    body.addEventListener("click", function (e) {
      var seg = e.target.closest("[data-seg]");
      if (seg) { activeSegment = seg.getAttribute("data-seg"); render(); return; }
      var tamper = e.target.closest('[data-role="tamper"]');
      if (tamper) { tampered = !tampered; render(); }
    });
    render();
  }

  /* ---------------- widget 3 — validation decision simulator ---------------- */
  function buildValidationSim(root) {
    var body = _q(".simulator-body", root);
    var index = 0;
    var revealed = false;

    body.innerHTML =
      '<div class="simulator-controls" style="margin-bottom:1rem;">' +
      '<div class="explorer-control-group"><span class="explorer-control-label">' + S.valScenario + "</span>" +
      '<select class="sim-select" data-role="scenario">' +
      VALIDATION.map(function (s, i) { return '<option value="' + i + '">' + esc(s.label) + "</option>"; }).join("") +
      "</select></div>" +
      '<button class="btn-sim primary" type="button" data-role="reveal">' + S.valReveal + "</button>" +
      '<button class="btn-sim btn-sim-reset" type="button" data-role="reset">' + S.valReset + "</button>" +
      "</div>" +
      '<div data-role="host"></div>';

    function checkRow(key, label) {
      var s = VALIDATION[index];
      var state = s.checks[key];
      var chip = state === "pass" ? S.valPass : (state === "fail" ? S.valFail : S.valSkip);
      var cls = state === "pass" ? "pass" : (state === "fail" ? "fail" : "skip");
      return '<div class="m6-val-row"><span class="m6-val-name">' + label + '</span><span class="m6-val-chip ' + cls + '">' + chip + "</span></div>";
    }

    function render() {
      var s = VALIDATION[index];
      var host = _q('[data-role="host"]', body);
      var first = s.rejectAt ? (S["valCheck" + s.rejectAt.charAt(0).toUpperCase() + s.rejectAt.slice(1)] || s.rejectAt) : "—";
      var verdict = revealed
        ? '<div class="m6-val-result"><div class="m6-val-decision"><strong>' + S.valFirstFail + ":</strong> " + esc(s.rejectAt ? first : "—") + "</div>" +
          "<p>" + esc(s.decision) + "</p>" +
          '<div class="m6-val-explain">' + esc(s.explain) + "</div>" +
          (s.id === "vs-role" ? '<div class="m4-mode-note">' + esc(S.valAuthzNote) + "</div>" : "") + "</div>"
        : '<div class="m6-val-result m6-val-hidden">' + S.valDecision + " · …</div>";
      host.innerHTML =
        '<div class="m6-val-token"><span class="explorer-control-label">' + S.valToken + '</span><code>' + esc(s.token) + "</code></div>" +
        '<div class="m6-val-pipeline"><div class="m6-val-title">' + S.valChecksTitle + "</div>" +
        checkRow("format", S.valCheckFormat) + checkRow("signature", S.valCheckSignature) +
        checkRow("issuer", S.valCheckIssuer) + checkRow("audience", S.valCheckAudience) +
        checkRow("lifetime", S.valCheckLifetime) + "</div>" + verdict;
    }

    _q('[data-role="scenario"]', body).addEventListener("change", function (e) {
      index = Number(e.target.value);
      revealed = false;
      render();
    });
    _q('[data-role="reveal"]', body).addEventListener("click", function () { revealed = true; render(); });
    _q('[data-role="reset"]', body).addEventListener("click", function () { index = 0; revealed = false; _q('[data-role="scenario"]', body).value = "0"; render(); });
    render();
  }

  /* ---------------- widget 4 — authorization policy lab ---------------- */
  function buildPolicyLab(root) {
    var body = _q(".simulator-body", root);

    function rowsHtml() {
      return POLICY_ENDPOINTS_L.map(function (e, i) {
        return '<tr data-pol-row="' + i + '"><td class="lab-scenario"><code>' + esc(e.endpoint) + "</code><div class=\"m6-pol-need\">" + esc(e.need) + "</div></td>" +
          '<td><select class="sim-select" data-role="pol-pick" data-row="' + i + '">' +
          '<option value="">' + S.choose + "</option>" +
          Object.keys(POLICY_MODES_L).map(function (k) {
            return '<option value="' + k + '">' + esc(POLICY_MODES_L[k]) + "</option>";
          }).join("") + "</select></td></tr>";
      }).join("");
    }

    body.innerHTML =
      '<table class="lab-table"><thead><tr><th>' + S.polEndpoint + " / " + S.polRequirement + "</th><th>" + S.polRule + "</th></tr></thead><tbody>" +
      rowsHtml() + "</tbody></table>" +
      '<div class="simulator-controls" style="margin-top:1rem;">' +
      '<button class="btn-sim primary" type="button" data-role="pol-check">' + S.polCheck + "</button>" +
      '<button class="btn-sim btn-sim-reset" type="button" data-role="pol-reset">' + S.polReset + "</button>" +
      "</div>";

    function check() {
      var correctCount = 0;
      POLICY_ENDPOINTS_L.forEach(function (e, i) {
        var row = _q('[data-pol-row="' + i + '"]', body);
        var pick = _q('[data-role="pol-pick"][data-row="' + i + '"]', body);
        var ok = pick.value === e.answer;
        pick.disabled = true;
        if (ok) correctCount++;
        row.classList.remove("row-correct", "row-wrong");
        row.classList.add(ok ? "row-correct" : "row-wrong");
        var old = _q('.feedback-row[data-pol-fb="' + i + '"]', body);
        if (old) old.remove();
        var fb = document.createElement("tr");
        fb.className = "feedback-row";
        fb.setAttribute("data-pol-fb", String(i));
        fb.innerHTML = '<td colspan="2"><strong>' + (ok ? S.polCorrect : S.polIncorrect) + "</strong> — " + esc(e.why) + "</td>";
        row.parentElement.insertBefore(fb, row.nextSibling);
      });
      toast(S.polScore(correctCount, POLICY_ENDPOINTS_L.length));
    }

    function reset() {
      POLICY_ENDPOINTS_L.forEach(function (e, i) {
        var row = _q('[data-pol-row="' + i + '"]', body);
        row.classList.remove("row-correct", "row-wrong");
        var pick = _q('[data-role="pol-pick"][data-row="' + i + '"]', body);
        pick.value = "";
        pick.disabled = false;
        var fb = _q('.feedback-row[data-pol-fb="' + i + '"]', body);
        if (fb) fb.remove();
      });
    }

    _q('[data-role="pol-check"]', body).addEventListener("click", check);
    _q('[data-role="pol-reset"]', body).addEventListener("click", reset);
  }

  /* ---------------- widget 5 — resource-ownership simulator ---------------- */
  function buildOwnershipSim(root) {
    var body = _q(".simulator-body", root);
    var sel = { caller: "alice", book: "bookA", operation: "read" };
    var result = null;

    function options(map, selected) {
      return Object.keys(map).map(function (k) {
        return '<option value="' + k + '"' + (k === selected ? " selected" : "") + ">" + esc(map[k].label) + "</option>";
      }).join("");
    }

    body.innerHTML =
      '<div class="m6-request-controls">' +
      '<label class="explorer-control-group"><span class="explorer-control-label">' + S.ownCaller + "</span>" +
      '<select class="sim-select" data-role="own-caller">' + options(OWNERSHIP.callers, sel.caller) + "</select></label>" +
      '<label class="explorer-control-group"><span class="explorer-control-label">' + S.ownBook + "</span>" +
      '<select class="sim-select" data-role="own-book">' + options(OWNERSHIP.books, sel.book) + "</select></label>" +
      '<label class="explorer-control-group"><span class="explorer-control-label">' + S.ownOperation + "</span>" +
      '<select class="sim-select" data-role="own-operation">' + options(OWNERSHIP.operations, sel.operation) + "</select></label>" +
      '<div class="simulator-controls">' +
      '<button class="btn-sim primary" type="button" data-role="own-evaluate">' + S.ownEvaluate + "</button>" +
      '<button class="btn-sim btn-sim-reset" type="button" data-role="own-reset">' + S.ownReset + "</button>" +
      "</div></div>" +
      '<div data-role="own-result"></div>';

    function evaluate() {
      var caller = OWNERSHIP.callers[sel.caller];
      var book = OWNERSHIP.books[sel.book];
      var operation = OWNERSHIP.operations[sel.operation];
      var authenticated = !!caller.sub;
      var owner = authenticated && caller.sub === book.ownerId;
      var decision;
      var detail;

      if (!authenticated) {
        decision = S.ownChallenge;
        detail = S.ownDeniedAuth;
      } else if (operation.kind === "read") {
        decision = S.ownSuccess;
        detail = operation.rule;
      } else if (owner) {
        decision = S.ownSuccessWrite;
        detail = operation.rule + " " + S.ownGranted + ".";
      } else {
        decision = S.ownNotFound;
        detail = S.ownDeniedOwnership;
      }
      result = { caller: caller, book: book, operation: operation, decision: decision, detail: detail, ok: !(!authenticated || (operation.kind === "write" && !owner)) };
      render();
    }

    function render() {
      var host = _q('[data-role="own-result"]', body);
      if (!result) { host.innerHTML = ""; return; }
      host.innerHTML =
        '<div class="m6-request-result">' +
        '<div class="m6-request-line"><span class="m6-request-badge">' + S.ownOperation + '</span><span>' + esc(result.operation.label) + "</span></div>" +
        '<div class="m6-request-line"><span class="m6-request-badge">' + S.ownRule + '</span><span>' + esc(result.operation.rule) + "</span></div>" +
        '<div class="m6-request-line"><span class="m6-request-badge">' + S.ownDecision + '</span><span>' + esc(result.decision) + "</span></div>" +
        '<div class="m6-request-caller">' + esc(result.detail) + "</div>" +
        '<span class="score-chip ' + (result.ok ? "pass" : "fail") + '" style="margin-top:0.5rem;">' + esc(result.ok ? S.ownGranted : S.ownForbidden) + "</span>" +
        "</div>";
    }

    _q('[data-role="own-caller"]', body).addEventListener("change", function (e) { sel.caller = e.target.value; result = null; render(); });
    _q('[data-role="own-book"]', body).addEventListener("change", function (e) { sel.book = e.target.value; result = null; render(); });
    _q('[data-role="own-operation"]', body).addEventListener("change", function (e) { sel.operation = e.target.value; result = null; render(); });
    _q('[data-role="own-evaluate"]', body).addEventListener("click", evaluate);
    _q('[data-role="own-reset"]', body).addEventListener("click", function () {
      sel = { caller: "alice", book: "bookA", operation: "read" };
      result = null;
      _q('[data-role="own-caller"]', body).value = sel.caller;
      _q('[data-role="own-book"]', body).value = sel.book;
      _q('[data-role="own-operation"]', body).value = sel.operation;
      render();
    });
  }

  function initWidgets() {
    var builders = {
      "request-sim": buildRequestSim,
      "jwt-explorer": buildJwtExplorer,
      "validation-sim": buildValidationSim,
      "policy-lab": buildPolicyLab,
      "ownership-sim": buildOwnershipSim
    };
    _qa(".simulator-widget[data-widget]").forEach(function (root) {
      var name = root.getAttribute("data-widget");
      if (builders[name]) {
        try { builders[name](root); }
        catch (err) {
          var body = _q(".simulator-body", root);
          if (body) body.innerHTML = '<p class="m4-empty-note">' + S.widgetError + "</p>";
          if (window.console && window.console.error) window.console.error("Widget failed:", name, err);
        }
      }
    });
  }

  /* ---------------- events ---------------- */
  function attachEvents() {
    document.addEventListener("click", function (e) {
      var t;
      if ((t = e.target.closest(".quiz-option[data-check-id]"))) { handleCheckOptionClick(t); return; }
      if ((t = e.target.closest(".kc-check-btn"))) { handleCheckSubmit(t); return; }
      if ((t = e.target.closest(".quiz-option[data-asq]"))) {
        if (state.assessment.submitted) return;
        var qid = t.dataset.asq;
        state.assessment.selections[qid] = parseInt(t.dataset.opt, 10);
        saveState();
        renderAssessment();
        return;
      }
    });

    document.addEventListener("change", function (e) {
      var th = e.target.closest("#assessment-threshold");
      if (th) {
        var v = parseInt(th.value, 10);
        if ([70, 80, 90].indexOf(v) !== -1) { state.assessment.threshold = v; saveState(); }
      }
    });

    var bind = function (id, ev, fn) { var el = document.getElementById(id); if (el) el.addEventListener(ev, fn); };

    bind("btn-start-assessment", "click", function () {
      state.assessment.started = true;
      saveState();
      renderAssessment();
      var q = document.getElementById("assessment-questions");
      if (q) q.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
    });
    bind("btn-submit-assessment", "click", submitAssessment);
    bind("btn-retry-assessment", "click", function () {
      state.assessment.submitted = false;
      state.assessment.selections = {};
      state.assessment.last = null;
      state.assessment.started = true;
      saveState();
      renderAssessment();
      toast(S.retryToast);
    });
  }

  function renderAll() {
    renderChecks();
    renderAssessment();
  }

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    loadState();

    RaffContent.boot({
      moduleId: "module-06",
      storageKey: STORAGE_KEY,
      lessons: LESSONS,
      startId: "lesson-1",

      state: {
        load: function () { return appState; },
        save: function () { saveState(); },
        activeId: function () { return state.active; },
        setActive: function (s, id) { s.active = id; },
        theme: function (s) { return s.theme; },
        setTheme: function (s, t) { s.theme = t; },
        isDone: function (s, id) { return !!(s.completedLessons && s.completedLessons[id]); },
        toggleDone: function (s, id) {
          s.completedLessons = s.completedLessons || {};
          if (s.completedLessons[id]) { delete s.completedLessons[id]; return false; }
          s.completedLessons[id] = true;
          return true;
        },
        exportPayload: function (s) {
          var payload = JSON.parse(JSON.stringify(s));
          payload.exportedAt = new Date().toISOString();
          return payload;
        },
        restore: function (parsed) {
          if (!parsed || typeof parsed !== "object" || parsed.marker !== APP_MARKER) throw new Error("Invalid progress file");
          replaceState(normalizeState(parsed));
        },
        reset: function (s) {
          var keepTheme = state.theme;
          replaceState(normalizeState({ theme: keepTheme }));
          try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
        }
      },

      progress: { compute: computeProgress },
      exportName: "raff_aspnet_auth_module_06_progress.json",
      exportStyle: "blob",
      labels: { lessons: S.units, checks: S.checks },
      messages: {
        exportToast: S.exportToast,
        exportErrorToast: S.exportErrorToast,
        importMode: "file",
        importSuccessToast: S.importSuccessToast,
        importErrorToast: S.importErrorToast,
        resetToast: S.resetToast,
        onFileText: function (text) {
          try {
            applyImported(JSON.parse(text));
            applyTheme();
            renderAll();
            if (courseCtx) courseCtx.refresh();
            toast(S.importedToast);
          } catch (e) {
            toast(S.importInvalidToast);
          }
        }
      },
      completeToast: function (done) {
        return done ? S.markedComplete(lessonsDoneCount(), LESSON_IDS.length) : null;
      },

      copy: { successToast: S.copySuccessToast, failToast: S.copyFailToast },

      search: {
        minChars: 2,
        placeholder: S.searchPlaceholder,
        hint: S.searchHintHtml,
        noMatch: S.searchNoMatch,
        getResults: searchGetResults,
        renderer: searchRenderer,
        onSelect: function (target, el, ctx) {
          if (el && el.getAttribute("data-search-glossary")) {
            ctx.openGlossary(el.getAttribute("data-search-glossary"));
            return;
          }
          if (target) ctx.showLesson(target);
        }
      },

      glossary: {
        items: TERMS,
        getTerm: function (t) { return t.t; },
        getCat: function (t) { return t.c; },
        getDef: function (t) { return t.d; },
        filtersMode: "dynamic",
        initialCat: "All",
        emptyHtml: '<p style="color:var(--text-muted); font-size:0.85rem;">' + S.glossaryEmpty + '</p>',
        renderItem: function (t) {
          var num = lessonNum(t.l);
          return '<div class="glossary-term-item">' +
            '<div class="glossary-term-name">' + esc(t.t) + '<span class="glossary-term-cat">' + esc(t.c) + "</span></div>" +
            '<div class="glossary-term-def">' + fmtInline(t.d) + "</div>" +
            '<button class="glossary-term-link" type="button" data-nav-target="' + esc(t.l) + '">' + S.goToLabel(esc(num ? S.lessonLabel(num) : lessonTagLabel(t.l))) + "</button></div>";
        }
      },

      onReady: function (ctx) {
        courseCtx = ctx;
        attachEvents();
        renderAll();
        initWidgets();
      },

      afterStateChange: function () {
        applyTheme();
        renderAll();
      }
    });
  });

})();
