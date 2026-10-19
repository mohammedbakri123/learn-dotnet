"use strict";

/* Module 05 page script — state, knowledge checks, assessment, and
   three bespoke widgets (responsibility lab, lifetime simulator,
   dependency-graph exercise).
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
  var OV = (RaffI18n.get() === "ar") ? (window.RAFF_MODULE_05_AR || null) : null;
  var LESSONS = MODULE_LESSONS;
  var CHECKS = KNOWLEDGE_CHECKS;
  var ASSESSMENT = ASSESSMENT_QUESTIONS;
  var TERMS = GLOSSARY;
  var META = LESSON_META;
  var RESP_LAYERS = RESPONSIBILITY_LAYERS;
  var RESP_CASES = RESPONSIBILITY_CASES;
  var LIFETIMES = LIFETIME_MODES;
  var GRAPHS = DEPENDENCY_GRAPHS;

  function localizeGraph(graph, ov) {
    if (!ov) return graph;
    var merged = Object.assign({}, graph, ov);
    if (ov.options) {
      merged.options = graph.options.map(function (o, i) {
        return { text: ov.options[i] !== undefined ? ov.options[i] : o.text, correct: o.correct };
      });
    }
    merged.nodes = graph.nodes.map(function (n) {
      var role = (ov.nodeRoles && ov.nodeRoles[n.role]) ? ov.nodeRoles[n.role] : n.role;
      return Object.assign({}, n, { role: role });
    });
    merged.edges = graph.edges.map(function (e) {
      var label = (ov.edgeLabels && ov.edgeLabels[e.label]) ? ov.edgeLabels[e.label] : e.label;
      return Object.assign({}, e, { label: label });
    });
    if (graph.fix) {
      merged.fix = Object.assign({}, graph.fix, { title: ov.fixTitle || graph.fix.title });
      merged.fix.nodes = graph.fix.nodes.map(function (n) {
        var extra = (ov.fixNodes && ov.fixNodes[n.id]) || {};
        return Object.assign({}, n, extra);
      });
    }
    return merged;
  }

  if (OV) {
    if (OV.lessons) LESSONS = RaffI18n.mergeById(MODULE_LESSONS, OV.lessons);
    if (OV.knowledgeChecks) CHECKS = KNOWLEDGE_CHECKS.map(function (c) { var o = OV.knowledgeChecks[c.id]; return o ? Object.assign({}, c, o) : c; });
    if (OV.assessmentQuestions) ASSESSMENT = ASSESSMENT_QUESTIONS.map(function (q) { var o = OV.assessmentQuestions[q.id]; return o ? Object.assign({}, q, o) : q; });
    if (OV.glossary) TERMS = GLOSSARY.map(function (t) { var o = OV.glossary[t.t]; return o ? Object.assign({}, t, o) : t; });
    if (OV.lessonMeta) META = LESSON_META.map(function (m) { var o = OV.lessonMeta[m.id]; return o ? Object.assign({}, m, o) : m; });
    if (OV.responsibilityLayers) RESP_LAYERS = Object.assign({}, RESPONSIBILITY_LAYERS, OV.responsibilityLayers);
    if (OV.responsibilityCases) RESP_CASES = RESPONSIBILITY_CASES.map(function (c) { var o = OV.responsibilityCases[c.id]; return o ? Object.assign({}, c, o) : c; });
    if (OV.lifetimeModes) {
      LIFETIMES = {};
      Object.keys(LIFETIME_MODES).forEach(function (k) {
        LIFETIMES[k] = Object.assign({}, LIFETIME_MODES[k], OV.lifetimeModes[k] || {});
      });
    }
    if (OV.dependencyGraphs) GRAPHS = DEPENDENCY_GRAPHS.map(function (g) { return localizeGraph(g, OV.dependencyGraphs[g.id]); });
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
      importInvalidToast: "Import failed — that file is not a valid Module 5 progress export.",
      markedComplete: function (done, total) { return "Lesson marked complete — " + done + "/" + total + " lessons."; },
      copySuccessToast: "Code copied to clipboard.",
      copyFailToast: "Copy failed — select the code manually.",
      searchPlaceholder: "Search lessons, topics, checks, and glossary terms… (e.g. \"lifetime\", \"captive\", \"DbContext\")",
      searchHintHtml: '<p style="color:var(--text-muted); font-size:0.85rem;">Type at least two characters. Try “lifetime”, “captive”, “DbContext”, or “IServiceScopeFactory”.</p>',
      searchNoMatch: function (q) { return '<p style="color:var(--text-muted); font-size:0.85rem;">No matches for “' + esc(q) + '”.</p>'; },
      glossaryEmpty: "No terms match.",
      goToLabel: function (label) { return "Go to " + label + " →"; },
      checkAnswers: "Check my answers",
      reset: "Reset",
      choose: "— choose —",
      layerToast: function (n, total) { return "Responsibility lab: " + n + " / " + total + " placed correctly."; },
      registration: "Registration",
      resolveA: "Resolve in Scope A",
      resolveB: "Resolve in Scope B",
      newScopeB: "Recreate Scope B",
      resetSim: "Reset simulation",
      scopeA: "Scope A",
      scopeB: "Scope B",
      resolutions: "Resolutions",
      emptyList: "No resolutions yet.",
      singletonShared: "The same singleton is shared by both scopes.",
      graphScenario: "Scenario",
      graphCheck: "Check answer",
      graphCorrect: "Correct.",
      graphWrong: "Not quite.",
      graphFix: "Safe shape",
      graphRisk: "risk",
      graphSafe: "safe",
      graphChecked: "Checked",
      graphReset: "Reset answer",
      responsibilityRule: "Responsibility",
      responsibilityOwner: "Owning layer",
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
      importInvalidToast: "تعذّر الاستيراد — الملف ليس تصديرًا صالحًا لتقدّم الوحدة 5.",
      markedComplete: function (done, total) { return "اكتمل الدرس — " + done + "/" + total + " دروس."; },
      copySuccessToast: "نُسخ الكود إلى الحافظة.",
      copyFailToast: "تعذّر النسخ — حدّد الكود يدويًا.",
      searchPlaceholder: "ابحث في الدروس والمواضيع والاختبارات والمصطلحات… (مثل \"lifetime\" أو \"captive\" أو \"DbContext\")",
      searchHintHtml: '<p style="color:var(--text-muted); font-size:0.85rem;">اكتب حرفين على الأقل. جرّب “lifetime” أو “captive” أو “DbContext” أو “IServiceScopeFactory”.</p>',
      searchNoMatch: function (q) { return '<p style="color:var(--text-muted); font-size:0.85rem;">لا توجد نتائج لـ “' + esc(q) + '”.</p>'; },
      glossaryEmpty: "لا توجد مصطلحات مطابقة.",
      goToLabel: function (label) { return "انتقل إلى " + label + " ←"; },
      checkAnswers: "تحقق من الإجابات",
      reset: "إعادة تعيين",
      choose: "— اختر —",
      layerToast: function (n, total) { return "مختبر المسؤوليات: " + n + " / " + total + " في المكان الصحيح."; },
      registration: "التسجيل",
      resolveA: "حلّ في النطاق A",
      resolveB: "حلّ في النطاق B",
      newScopeB: "إعادة إنشاء النطاق B",
      resetSim: "إعادة تعيين المحاكاة",
      scopeA: "النطاق A",
      scopeB: "النطاق B",
      resolutions: "عمليات الحل",
      emptyList: "لا توجد عمليات حل بعد.",
      singletonShared: "النطاقان يتشاركان الكائن singleton نفسه.",
      graphScenario: "السيناريو",
      graphCheck: "تحقق من الإجابة",
      graphCorrect: "إجابة صحيحة.",
      graphWrong: "ليست الإجابة الصحيحة.",
      graphFix: "الشكل الآمن",
      graphRisk: "خطر",
      graphSafe: "آمن",
      graphChecked: "تم التحقق",
      graphReset: "إعادة الإجابة",
      responsibilityRule: "المسؤولية",
      responsibilityOwner: "الطبقة المسؤولة",
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
      throw new Error("Not a Module 5 progress file.");
    }
    replaceState(normalizeState(obj));
    saveState();
  }

  /* ---------------- widget 1 — responsibility lab ---------------- */
  function buildResponsibilities(root) {
    var body = _q(".simulator-body", root);
    var rows = RESP_CASES.map(function (c, i) {
      return '<tr data-row="' + i + '"><td class="lab-scenario">' + esc(c.rule) + "</td>" +
        '<td><select class="sim-select" data-role="pick" data-row="' + i + '">' +
        '<option value="">' + S.choose + "</option>" +
        Object.keys(RESP_LAYERS).map(function (k) {
          return '<option value="' + k + '">' + esc(RESP_LAYERS[k]) + "</option>";
        }).join("") +
        "</select></td></tr>";
    }).join("");
    body.innerHTML =
      '<table class="lab-table"><thead><tr><th>' + S.responsibilityRule + "</th><th>" + S.responsibilityOwner + "</th></tr></thead><tbody>" +
      rows + "</tbody></table>" +
      '<div class="simulator-controls" style="margin-top:1rem;">' +
      '<button class="btn-sim primary" type="button" data-role="check">' + S.checkAnswers + "</button>" +
      '<button class="btn-sim btn-sim-reset" type="button" data-role="reset">' + S.reset + "</button></div>";

    function check() {
      var correctCount = 0;
      RESP_CASES.forEach(function (c, i) {
        var row = _q('[data-row="' + i + '"]', body);
        var pick = _q('[data-role="pick"][data-row="' + i + '"]', body);
        pick.disabled = true;
        var ok = pick.value === c.answer;
        if (ok) correctCount++;
        row.classList.remove("row-correct", "row-wrong");
        row.classList.add(ok ? "row-correct" : "row-wrong");
        var old = _q('.feedback-row[data-fb="' + i + '"]', body);
        if (old) old.remove();
        var fb = document.createElement("tr");
        fb.className = "feedback-row";
        fb.setAttribute("data-fb", String(i));
        var verdict = ok
          ? "✓ " + RESP_LAYERS[c.answer] + " — " + c.why
          : "✕ " + (pick.value ? RESP_LAYERS[pick.value] : S.choose) + " → " + (RESP_LAYERS[c.answer] || c.answer) + " — " + c.why;
        fb.innerHTML = '<td colspan="2">' + esc(verdict) + "</td>";
        row.parentElement.insertBefore(fb, row.nextSibling);
      });
      toast(S.layerToast(correctCount, RESP_CASES.length));
    }

    function reset() {
      RESP_CASES.forEach(function (c, i) {
        var row = _q('[data-row="' + i + '"]', body);
        row.classList.remove("row-correct", "row-wrong");
        var pick = _q('[data-role="pick"][data-row="' + i + '"]', body);
        pick.value = "";
        pick.disabled = false;
        var fb = _q('.feedback-row[data-fb="' + i + '"]', body);
        if (fb) fb.remove();
      });
    }

    _q('[data-role="check"]', body).addEventListener("click", check);
    _q('[data-role="reset"]', body).addEventListener("click", reset);
  }

  /* ---------------- widget 2 — lifetime simulator ---------------- */
  function buildLifetimes(root) {
    var body = _q(".simulator-body", root);
    var sim = {
      mode: "transient",
      next: 0,
      singleton: null,
      a: { instance: null, items: [] },
      b: { instance: null, items: [] }
    };

    body.innerHTML =
      '<div class="simulator-controls" style="margin-bottom:1rem;">' +
      '<div class="explorer-control-group"><span class="explorer-control-label">' + S.registration + "</span>" +
      '<select class="sim-select" data-role="mode">' +
      Object.keys(LIFETIMES).map(function (k) {
        return '<option value="' + k + '">' + esc(LIFETIMES[k].label) + "</option>";
      }).join("") +
      "</select></div>" +
      '<button class="btn-sim btn-sim-reset" type="button" data-role="reset">' + S.resetSim + "</button>" +
      "</div>" +
      '<div class="m5-lifetime-grid">' +
      '<div class="sim-panel m5-scope-panel">' +
      '<div class="sim-panel-title">' + S.scopeA + "</div>" +
      '<div class="m5-scope-note">' + S.resolutions + "</div>" +
      '<div class="m5-instance-list" data-role="list-a"></div>' +
      '<button class="btn-sim primary" type="button" data-role="resolve-a">' + S.resolveA + "</button>" +
      "</div>" +
      '<div class="sim-panel m5-scope-panel">' +
      '<div class="sim-panel-title">' + S.scopeB + "</div>" +
      '<div class="m5-scope-note">' + S.resolutions + "</div>" +
      '<div class="m5-instance-list" data-role="list-b"></div>' +
      '<div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-top:0.6rem;">' +
      '<button class="btn-sim primary" type="button" data-role="resolve-b">' + S.resolveB + "</button>" +
      '<button class="btn-sim" type="button" data-role="new-b">' + S.newScopeB + "</button>" +
      "</div></div></div>" +
      '<div class="sim-verdict" data-role="note" style="margin-top:1rem;"></div>';

    function listHtml(items) {
      if (!items.length) return '<span class="m5-empty-note">' + S.emptyList + "</span>";
      return items.map(function (x) { return '<span class="m5-instance">' + esc(x) + "</span>"; }).join("");
    }

    function mode() { return LIFETIMES[sim.mode]; }

    function render() {
      var note = _q('[data-role="note"]', body);
      var m = mode();
      note.innerHTML = "<strong>" + esc(m.label) + "</strong> — " + esc(m.rule) +
        '<div class="m4-mode-note" style="margin-top:0.5rem;">' + esc(m.note) + " " + esc(m.use) + "</div>" +
        (sim.mode === "singleton" ? '<div class="m4-mode-note" style="color:var(--warning);">' + S.singletonShared + "</div>" : "");
      _q('[data-role="list-a"]', body).innerHTML = listHtml(sim.a.items);
      _q('[data-role="list-b"]', body).innerHTML = listHtml(sim.b.items);
    }

    function resolve(scopeKey) {
      var bucket = sim[scopeKey];
      var label;
      if (sim.mode === "singleton") {
        if (sim.singleton === null) sim.singleton = ++sim.next;
        label = "S" + sim.singleton;
      } else if (sim.mode === "scoped") {
        if (bucket.instance === null) bucket.instance = ++sim.next;
        label = "S" + bucket.instance;
      } else {
        label = "S" + (++sim.next);
      }
      bucket.items.push(label);
      render();
    }

    _q('[data-role="mode"]', body).addEventListener("change", function (e) {
      sim.mode = e.target.value;
      sim.next = 0;
      sim.singleton = null;
      sim.a = { instance: null, items: [] };
      sim.b = { instance: null, items: [] };
      render();
    });
    _q('[data-role="resolve-a"]', body).addEventListener("click", function () { resolve("a"); });
    _q('[data-role="resolve-b"]', body).addEventListener("click", function () { resolve("b"); });
    _q('[data-role="new-b"]', body).addEventListener("click", function () {
      sim.b = { instance: null, items: [] };
      render();
    });
    _q('[data-role="reset"]', body).addEventListener("click", function () {
      sim.next = 0;
      sim.singleton = null;
      sim.a = { instance: null, items: [] };
      sim.b = { instance: null, items: [] };
      render();
    });
    render();
  }

  /* ---------------- widget 3 — dependency-graph exercise ---------------- */
  function buildGraphs(root) {
    var body = _q(".simulator-body", root);
    var sim = { index: 0, selection: null, checked: false };

    body.innerHTML =
      '<div class="simulator-controls" style="margin-bottom:1rem;">' +
      '<div class="explorer-control-group"><span class="explorer-control-label">' + S.graphScenario + "</span>" +
      '<select class="sim-select" data-role="graph">' +
      GRAPHS.map(function (g, i) { return '<option value="' + i + '">' + esc(g.title) + "</option>"; }).join("") +
      "</select></div>" +
      '<button class="btn-sim btn-sim-reset" type="button" data-role="reset-graph">' + S.graphReset + "</button>" +
      "</div>" +
      '<div data-role="graph-host"></div>';

    function graph() { return GRAPHS[sim.index]; }

    function nodesHtml(nodes, fix) {
      var html = '<div class="m5-graph' + (fix ? " m5-graph-fix" : "") + '">';
      nodes.forEach(function (n, i) {
        var risk = n.risk ? " m5-node-risk" : "";
        html += '<div class="m5-node' + risk + '">' +
          '<div class="m5-node-label">' + esc(n.label) + "</div>" +
          '<div class="m5-node-meta"><span>' + esc(n.role) + '</span><span class="m5-lifetime">' + esc(n.lifetime) + "</span></div>" +
          (n.risk ? '<div class="m5-risk-badge">' + S.graphRisk + "</div>" : "") +
          "</div>";
        if (!fix && i < nodes.length - 1) {
          var edge = graph().edges[i] || { label: "" };
          html += '<div class="m5-edge' + (edge.unsafe ? " m5-edge-risk" : "") + '">↓ ' + esc(edge.label) + "</div>";
        }
      });
      html += "</div>";
      return html;
    }

    function render() {
      var g = graph();
      var host = _q('[data-role="graph-host"]', body);
      var options = g.options.map(function (o, i) {
        var cls = "quiz-option";
        if (sim.selection === i) cls += " selected";
        if (sim.checked && o.correct) cls += " correct";
        if (sim.checked && sim.selection === i && !o.correct) cls += " incorrect";
        return '<button class="' + cls + '" type="button" data-graph-opt="' + i + '">' +
          '<span class="option-indicator">' + String.fromCharCode(65 + i) + "</span>" +
          '<span class="option-text">' + fmtInline(o.text) + "</span></button>";
      }).join("");
      var feedback = "";
      if (sim.checked) {
        var chosen = g.options[sim.selection];
        var ok = chosen && chosen.correct;
        feedback = '<div class="quiz-feedback ' + (ok ? "success" : "error") + '"><strong>' +
          (ok ? S.graphCorrect : S.graphWrong) + "</strong> " + fmtInline(g.explain) + "</div>";
      }
      var fix = (sim.checked && g.fix) ? '<div class="m5-graph-fix-wrap"><div class="m5-fix-title">' + esc(g.fix.title) + "</div>" + nodesHtml(g.fix.nodes, true) + "</div>" : "";
      host.innerHTML =
        '<div class="m5-graph-wrap">' + nodesHtml(g.nodes, false) + "</div>" +
        '<div class="exercise-card" style="margin-top:1rem;"><div class="exercise-body">' +
        '<div class="exercise-prompt">' + fmtInline(g.question) + "</div>" +
        '<div class="quiz-options">' + options + "</div>" +
        '<div class="exercise-actions"><button class="btn-primary" type="button" data-role="check-graph"' + (sim.checked ? " hidden" : "") + ">" + S.graphCheck + "</button>" +
        (sim.checked ? '<span class="score-chip ' + (g.options[sim.selection].correct ? "pass" : "fail") + '">' + (g.options[sim.selection].correct ? S.correctChip : S.incorrectChip) + "</span>" : "") +
        "</div>" + feedback + "</div></div>" + fix;
    }

    _q('[data-role="graph"]', body).addEventListener("change", function (e) {
      sim.index = Number(e.target.value);
      sim.selection = null;
      sim.checked = false;
      render();
    });
    _q('[data-role="reset-graph"]', body).addEventListener("click", function () {
      sim.selection = null;
      sim.checked = false;
      render();
    });
    body.addEventListener("click", function (e) {
      var opt = e.target.closest("[data-graph-opt]");
      if (opt) {
        if (sim.checked) return;
        sim.selection = Number(opt.getAttribute("data-graph-opt"));
        render();
        return;
      }
      var check = e.target.closest('[data-role="check-graph"]');
      if (check) {
        if (sim.selection === null) { toast(S.selectFirst); return; }
        sim.checked = true;
        render();
      }
    });
    render();
  }

  function initWidgets() {
    var builders = { responsibilities: buildResponsibilities, lifetimes: buildLifetimes, "dependency-graph": buildGraphs };
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
      moduleId: "module-05",
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
      exportName: "raff_aspnet_di_module_05_progress.json",
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
