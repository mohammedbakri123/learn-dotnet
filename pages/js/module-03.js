"use strict";

/* Module 03 page script — bespoke widgets only.
   Shared shell, navigation, progress, theme, search, glossary,
   export/import/reset, highlighting and copy buttons come from
   component/core/content.js (RaffContent). */

(function () {

  /* ---------------- helpers ---------------- */

  var esc = function (s) { return RaffUI.escapeHtml(s); };
  var fmtInline = function (s) { return RaffUI.fmtInline(s); };
  function toast(msg) { RaffUI.toast(msg); }

  var S = RaffI18n.pick({
    en: {
      lessonDone: (n) => "Lesson " + n + " Completed ✓",
      markLesson: (n) => "Mark Lesson " + n + " Complete ✓",
      correct: "Correct.",
      notQuite: "Not quite.",
      notQuiteHelp: " Re-read the relevant lesson section, then try again — the explanation appears once you find the right answer.",
      kcBadge: "Knowledge Check",
      ofTotal: (i, total) => i + " of " + total,
      answeredChip: "Answered",
      correctChip: "Correct ✓",
      incorrectChip: "Incorrect ✗",
      checkAnswer: "Check Answer",
      selectFirst: "Select an answer first.",
      labChipMatches: "✓ Matches",
      labChipDefensible: "≈ Defensible",
      labChipRevisit: "✗ Revisit",
      labAria: (n) => "Strategy for scenario " + n,
      labChoose: "— choose —",
      recPrefix: "<strong>Recommended:</strong> ",
      alsoOkPrefix: "<strong>Also acceptable.</strong> ",
      correctPrefix: "<strong>Correct.</strong> ",
      checkedOf: (c, t) => c + " of " + t + " checked",
      labVerdictEmpty: "Pick a strategy for each scenario, then press \"Check answers\".",
      labVerdictOk: (ok) => "<strong>" + ok + " correct or defensible</strong>",
      labVerdictWrong: (wrong) => ", " + wrong + " to revisit — read the feedback rows above.",
      labVerdictAllOk: " — every scenario covered. Nice work.",
      chooseFirst: "Choose a strategy for at least one scenario first.",
      n1More: (n) => "… and " + n + " more near-identical commands",
      n1LazyTotal: (cmds, rows) => "Total for this access pattern: " + cmds + " commands, " + rows + " rows",
      n1EagerResult: (rows) => "Result set: " + rows + " rows — each book's columns repeat per author row",
      n1EagerTotal: (rows) => "Total: 1 command, " + rows + " rows",
      n1ProjResult: (rows) => "Result set: " + rows + " rows, one per book, count computed by the database",
      n1ProjTotal: (rows) => "Total: 1 command, " + rows + " rows, zero entities materialized",
      dtosOnly: "0 (DTOs only)",
      n1WorkLazy: (b) => "indexed lookups × " + b,
      n1WorkEager: "single join, wide result",
      n1WorkProj: "DB-side COUNT per book",
      n1VerdictLazy: (b, cmds, rows) => "<strong>N+1.</strong> " + b + " books → " + cmds + " commands and " + rows +
        " rows. Property access in a loop looks free, but every unloaded collection triggers a round trip — cost grows with the number of books returned.",
      n1VerdictEager: (rows) => "<strong>One command, " + rows + " rows.</strong> The join repeats each book's columns once per (book, author) pair; EF Core de-duplicates entities in memory. For one collection that is usually a good trade — add a second sibling collection and the rows multiply again (Lesson 7).",
      n1VerdictProj: (b) => "<strong>One command, " + b + " rows, zero entities.</strong> The database computes the count and only the DTO fields cross the wire. When the requirement is a count — not the entities — this is the cheapest correct shape.",
      calcOne: "With one row per collection there is no fan-out: both strategies return the same row count. Fan-out appears the moment collections hold multiple rows.",
      calcSevere: (single, split, ratio) => "<strong>Severe fan-out.</strong> One query carries " + single + " rows where the data itself needs about " +
        split + " — a " + ratio + "× inflation. EF Core de-duplicates entities in memory, but the database computes and the network carries every row. Consider <code>AsSplitQuery()</code> or a projection.",
      calcModerate: (single, split, ratio) => "<strong>Moderate fan-out.</strong> One query returns " + single + " rows vs about " +
        split + " with split queries (" + ratio + "×). A single join is often the right trade at this scale — measure before optimizing further.",
      erdAria: (label) => label + " relationship diagram",
      erdOptional: "optional (nullable FK)",
      erdRequired: "required (non-nullable FK)",
      stepOf: (s, t) => "Step " + s + " of " + t,
      noTracked: "No tracked entities yet.",
      thEntity: "Entity",
      thState: "State",
      thNote: "Note",
      nothingLoaded: "Nothing loaded.",
      pressNext: "Press “Apply next step” to run the next line of code.",
      resultTitle: "Result",
      passChip: "PASS ✓",
      failChip: "FAIL ✗",
      correctTotal: (s, t, thr) => s + " / " + t + " correct • pass threshold " + thr + "%",
      breakdownTitle: "Per-topic breakdown — click to review",
      lessonsBreakdown: (n) => "Lesson " + n + ": ",
      revisitTitle: "Questions to revisit",
      yourAnswer: "Your answer: ",
      notAnswered: "(not answered)",
      correctAnswer: "Correct: ",
      reviewLabel: (label) => "Review " + label + " →",
      perfect: "Perfect score — every question correct. 🎓",
      qOf: (i, t) => "Question " + i + " of " + t,
      lessonLabel: (n) => "Lesson " + n,
      answerAll: (a, t) => "Answer all questions before submitting (" + a + "/" + t + " answered).",
      passedToast: (pct) => "Assessment passed — " + pct + "% ✓",
      submittedToast: (pct, thr) => "Assessment submitted — " + pct + "% (below " + thr + "% threshold)",
      retryToast: "Assessment reset — fresh attempt. Best score is kept.",
      groupLessons: "Lessons",
      groupChecks: "Knowledge checks",
      groupGlossary: "Glossary",
      lessonTitlePrefix: (n) => "Lesson " + n + " — ",
      kcTitle: (n) => "Knowledge check" + (n ? " — Lesson " + n : ""),
      units: "Lessons",
      checks: "Checks answered",
      exportToast: "Progress exported.",
      exportErrorToast: "Export failed — storage unavailable.",
      importSuccessToast: "Progress imported successfully.",
      importErrorToast: "Import failed — the file could not be read.",
      resetToast: "All module progress was reset.",
      importedToast: "Progress imported successfully.",
      importInvalidToast: "Import failed — that file is not a valid Module 3 progress export.",
      markedComplete: (done, total) => "Lesson marked complete — " + done + "/" + total + " lessons.",
      copySuccessToast: "Code copied to clipboard.",
      copyFailToast: "Copy failed — select the code manually.",
      searchPlaceholder: "Search lessons, topics, exercises, and glossary terms… (e.g. \"N+1\", \"shadow\", \"split query\")",
      searchHintHtml: '<p style="color:var(--text-muted); font-size:0.85rem;">Type at least two characters. Try “N+1”, “shadow”, “split query”, “lazy loading”, or “projection”.</p>',
      searchNoMatch: (q) => '<p style="color:var(--text-muted); font-size:0.85rem;">No matches for “' + esc(q) + '”.</p>',
      glossaryEmpty: "No terms match.",
      goToLabel: (label) => "Go to " + label + " →"
    },
    ar: {
      lessonDone: (n) => "اكتمل الدرس " + n + " ✓",
      markLesson: (n) => "تحديد الدرس " + n + " كمكتمل ✓",
      correct: "إجابة صحيحة.",
      notQuite: "ليست صحيحة تمامًا.",
      notQuiteHelp: " أعد قراءة القسم ذي الصلة من الدرس ثم حاول مجددًا — يظهر الشرح بعد الوصول إلى الإجابة الصحيحة.",
      kcBadge: "اختبار معرفي",
      ofTotal: (i, total) => i + " من " + total,
      answeredChip: "تمت الإجابة",
      correctChip: "صحيح ✓",
      incorrectChip: "غير صحيح ✗",
      checkAnswer: "تحقق من الإجابة",
      selectFirst: "الرجاء اختيار إجابة أولًا.",
      labChipMatches: "✓ مطابق",
      labChipDefensible: "≈ مقبول",
      labChipRevisit: "✗ راجعها",
      labAria: (n) => "الاستراتيجية المناسبة للسيناريو " + n,
      labChoose: "— اختر —",
      recPrefix: "<strong>الموصى به:</strong> ",
      alsoOkPrefix: "<strong>مقبول أيضًا.</strong> ",
      correctPrefix: "<strong>إجابة صحيحة.</strong> ",
      checkedOf: (c, t) => "تم فحص " + c + " من " + t,
      labVerdictEmpty: "اختر استراتيجية لكل سيناريو ثم اضغط «تحقق من الإجابات».",
      labVerdictOk: (ok) => "<strong>" + ok + " إجابات صحيحة أو مقبولة</strong>",
      labVerdictWrong: (wrong) => "، و" + wrong + " بحاجة إلى مراجعة — اقرأ صفوف التغذية الراجعة أعلاه.",
      labVerdictAllOk: " — كل السيناريوهات مغطاة. عمل ممتاز.",
      chooseFirst: "اختر استراتيجية لسيناريو واحد على الأقل أولًا.",
      n1More: (n) => "… و" + n + " أوامر أخرى شبه متطابقة",
      n1LazyTotal: (cmds, rows) => "الإجمالي لهذا النمط: " + cmds + " أوامر و" + rows + " صفًا",
      n1EagerResult: (rows) => "مجموعة النتائج: " + rows + " صفًا — تتكرر أعمدة كل كتاب مع كل صف مؤلف",
      n1EagerTotal: (rows) => "الإجمالي: أمر واحد و" + rows + " صفًا",
      n1ProjResult: (rows) => "مجموعة النتائج: " + rows + " صفًا، صف واحد لكل كتاب، والعدّ تحسبه قاعدة البيانات",
      n1ProjTotal: (rows) => "الإجمالي: أمر واحد و" + rows + " صفًا دون تجسيد أي كيان",
      dtosOnly: "0 (كائنات DTO فقط)",
      n1WorkLazy: (b) => "عمليات بحث مفهرسة × " + b,
      n1WorkEager: "ربط واحد بنتيجة عريضة",
      n1WorkProj: "COUNT على جهة قاعدة البيانات لكل كتاب",
      n1VerdictLazy: (b, cmds, rows) => "<strong>مشكلة N+1.</strong> " + b + " كتابًا ← " + cmds + " أمرًا و" + rows +
        " صفًا. يبدو الوصول إلى الخاصية داخل حلقة مجانيًا، لكن كل مجموعة غير محمّلة تُحدث رحلة ذهاب وإياب — وتنمو الكلفة مع عدد الكتب المُعادة.",
      n1VerdictEager: (rows) => "<strong>أمر واحد و" + rows + " صفًا.</strong> يكرر الربط أعمدة كل كتاب مرة لكل زوج (كتاب، مؤلف)، ثم تُلغي EF Core التكرار في الذاكرة. ومع مجموعة واحدة غالبًا ما تكون هذه مقايضة جيدة — أضف مجموعة شقيقة ثانية لتتضاعف الصفوف من جديد (الدرس 7).",
      n1VerdictProj: (b) => "<strong>أمر واحد و" + b + " صفًا دون أي كيان.</strong> تحسب قاعدة البيانات العدد ولا يعبر الشبكة سوى حقول DTO. وعندما يكون المطلوب عدًّا لا كيانات، فهذا أرخص شكل صحيح.",
      calcOne: "مع صف واحد لكل مجموعة لا يوجد تضخم: تعيد الاستراتيجيتان العدد نفسه من الصفوف. ويظهر التضخم بمجرد احتواء المجموعات على عدة صفوف.",
      calcSevere: (single, split, ratio) => "<strong>تضخم حاد.</strong> يحمل استعلام واحد " + single + " صفًا بينما تحتاج البيانات نفسها نحو " +
        split + " — تضخم بمقدار " + ratio + "×. تُلغي EF Core التكرار في الذاكرة، لكن قاعدة البيانات تحسب كل صف والشبكة تنقله. فكّر في <code>AsSplitQuery()</code> أو استخدام الإسقاط.",
      calcModerate: (single, split, ratio) => "<strong>تضخم متوسط.</strong> يعيد الاستعلام الواحد " + single + " صفًا مقابل نحو " +
        split + " مع الاستعلامات المنفصلة (" + ratio + "×). وغالبًا يكون الربط الواحد مقايضة مناسبة عند هذا الحجم — قِس الأداء قبل مواصلة التحسين.",
      erdAria: (label) => "مخطط علاقة " + label,
      erdOptional: "اختياري (FK قابل للقيمة الفارغة)",
      erdRequired: "مطلوب (FK غير قابل للقيمة الفارغة)",
      stepOf: (s, t) => "الخطوة " + s + " من " + t,
      noTracked: "لا كيانات متتبَّعة بعد.",
      thEntity: "الكيان",
      thState: "الحالة",
      thNote: "ملاحظة",
      nothingLoaded: "لا شيء محمّل بعد.",
      pressNext: "اضغط «طبّق الخطوة التالية» لتنفيذ السطر التالي من الكود.",
      resultTitle: "النتيجة",
      passChip: "ناجح ✓",
      failChip: "راسب ✗",
      correctTotal: (s, t, thr) => s + " / " + t + " إجابة صحيحة • حد النجاح " + thr + "%",
      breakdownTitle: "التفصيل حسب الموضوع — اضغط للمراجعة",
      lessonsBreakdown: (n) => "الدرس " + n + ": ",
      revisitTitle: "أسئلة يُستحسن مراجعتها",
      yourAnswer: "إجابتك: ",
      notAnswered: "(بدون إجابة)",
      correctAnswer: "الإجابة الصحيحة: ",
      reviewLabel: (label) => "راجع " + label + " ←",
      perfect: "علامة كاملة — كل الإجابات صحيحة. 🎓",
      qOf: (i, t) => "السؤال " + i + " من " + t,
      lessonLabel: (n) => "الدرس " + n,
      answerAll: (a, t) => "أجب عن جميع الأسئلة قبل الإرسال (" + a + "/" + t + " مجابة).",
      passedToast: (pct) => "نجحت في التقييم — " + pct + "% ✓",
      submittedToast: (pct, thr) => "تم إرسال التقييم — " + pct + "% (أقل من حد النجاح " + thr + "%)",
      retryToast: "أُعيد تعيين التقييم — محاولة جديدة. وستُحفظ أفضل نتيجة.",
      groupLessons: "الدروس",
      groupChecks: "الاختبارات المعرفية",
      groupGlossary: "المصطلحات",
      lessonTitlePrefix: (n) => "الدرس " + n + " — ",
      kcTitle: (n) => "اختبار معرفي" + (n ? " — الدرس " + n : ""),
      units: "الدروس",
      checks: "الاختبارات المُجابة",
      exportToast: "تم تصدير التقدّم.",
      exportErrorToast: "فشل التصدير — وحدة التخزين غير متاحة.",
      importSuccessToast: "تم استيراد التقدّم بنجاح.",
      importErrorToast: "فشل الاستيراد — تعذّرت قراءة الملف.",
      resetToast: "أُعيد تعيين تقدّم الوحدة بالكامل.",
      importedToast: "تم استيراد التقدّم بنجاح.",
      importInvalidToast: "فشل الاستيراد — هذا الملف ليس تصدير تقدّم صالحًا للوحدة 3.",
      markedComplete: (done, total) => "اكتمل الدرس — " + done + "/" + total + " دروس.",
      copySuccessToast: "تم نسخ الكود إلى الحافظة.",
      copyFailToast: "فشل النسخ — حدّد الكود يدويًا.",
      searchPlaceholder: "ابحث في الدروس والمواضيع والتمارين ومصطلحات القاموس… (مثل: \"N+1\"، \"shadow\"، \"split query\")",
      searchHintHtml: '<p style="color:var(--text-muted); font-size:0.85rem;">اكتب حرفين على الأقل. جرّب «N+1» أو «shadow» أو «split query» أو «lazy loading» أو «projection».</p>',
      searchNoMatch: (q) => '<p style="color:var(--text-muted); font-size:0.85rem;">لا نتائج مطابقة لـ«' + esc(q) + '».</p>',
      glossaryEmpty: "لا توجد مصطلحات مطابقة.",
      goToLabel: (label) => "انتقل إلى " + label + " ←"
    }
  });

  var REDUCED = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var LESSON_IDS = ["lesson-1", "lesson-2", "lesson-3", "lesson-4", "lesson-5", "lesson-6", "lesson-7"];

  var highlightText = function (raw, lang) { return RaffHighlight.text(raw, lang); };
  function highlightMini(el) { el.innerHTML = highlightText(el.textContent, "cs"); }

  /* ---------------- state ---------------- */

  function defaultState() {
    return {
      marker: APP_MARKER,
      version: 1,
      theme: "dark",
      completedLessons: {},
      checks: {},
      lab: {},
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
      completedLessons: (p.completedLessons && typeof p.completedLessons === "object") ? p.completedLessons : {},
      checks: (p.checks && typeof p.checks === "object") ? p.checks : {},
      lab: (p.lab && typeof p.lab === "object") ? p.lab : {},
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
    return KNOWLEDGE_CHECKS.filter(function (c) { return state.checks[c.id] && state.checks[c.id].correct; }).length;
  }
  function assessmentPassed() {
    return !!(state.assessment.best && state.assessment.best.passed);
  }
  function computeProgress() {
    var lessons = lessonsDoneCount();
    var total = LESSON_IDS.length;
    var lessonPct = Math.round(lessons / total * 100);
    var checkPct = checksCorrectCount() / KNOWLEDGE_CHECKS.length;
    var pct = Math.round(lessons / total * 60 + checkPct * 30 + (assessmentPassed() ? 10 : 0));
    Array.prototype.forEach.call(document.querySelectorAll(".btn-complete-lesson"), function (btn) {
      var id = btn.getAttribute("data-lesson");
      if (!id) return;
      var isDone = !!state.completedLessons[id];
      var num = id.replace("lesson-", "");
      btn.textContent = isDone ? S.lessonDone(num) : S.markLesson(num);
    });
    return {
      percent: pct,
      lessonsLabel: lessons + " / " + total + " (" + lessonPct + "%)",
      checksLabel: checksCorrectCount() + " / " + KNOWLEDGE_CHECKS.length
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
      var list = KNOWLEDGE_CHECKS.filter(function (c) { return c.group === group; });
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
    for (var i = 0; i < KNOWLEDGE_CHECKS.length; i++) {
      if (KNOWLEDGE_CHECKS[i].id === id) { kc = KNOWLEDGE_CHECKS[i]; break; }
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

  /* ---------------- loading strategy lab ---------------- */
  function labResultChip(result) {
    if (result === "correct") return '<span class="score-chip pass">' + S.labChipMatches + '</span>';
    if (result === "defensible") return '<span class="score-chip" style="background:var(--warning-bg); color:var(--warning);">' + S.labChipDefensible + '</span>';
    if (result === "wrong") return '<span class="score-chip fail">' + S.labChipRevisit + '</span>';
    return "—";
  }

  function renderLab() {
    var tbody = document.getElementById("lab-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    LAB_SCENARIOS.forEach(function (s) {
      var stored = state.lab[s.id] || {};
      var tr = document.createElement("tr");
      tr.dataset.labRow = s.id;
      if (stored.checked && stored.result) tr.classList.add(stored.result === "wrong" ? "row-wrong" : "row-correct");
      var td1 = document.createElement("td");
      td1.className = "lab-scenario";
      td1.innerHTML = fmtInline(s.scenario);
      var td2 = document.createElement("td");
      var sel = document.createElement("select");
      sel.className = "sim-select";
      sel.dataset.labId = s.id;
      sel.setAttribute("aria-label", S.labAria(s.id.replace("lab-", "")));
      sel.innerHTML = '<option value="">' + S.labChoose + '</option>' + LAB_OPTIONS.map(function (o, i) {
        return '<option value="' + i + '"' + (stored.choice === i ? " selected" : "") + ">" + esc(o) + "</option>";
      }).join("");
      td2.appendChild(sel);
      var td3 = document.createElement("td");
      td3.innerHTML = labResultChip(stored.result);
      tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);
      tbody.appendChild(tr);
      if (stored.checked && stored.result) {
        var fb = document.createElement("tr");
        fb.className = "feedback-row";
        var ftd = document.createElement("td");
        ftd.colSpan = 3;
        var prefix = stored.result === "wrong" ? S.recPrefix : (stored.result === "defensible" ? S.alsoOkPrefix : S.correctPrefix);
        ftd.innerHTML = prefix + fmtInline(s.feedback);
        fb.appendChild(ftd);
        tbody.appendChild(fb);
      }
    });
    var checked = LAB_SCENARIOS.filter(function (s) { return state.lab[s.id] && state.lab[s.id].checked; });
    var ok = checked.filter(function (s) { return state.lab[s.id].result === "correct" || state.lab[s.id].result === "defensible"; }).length;
    var label = document.getElementById("lab-score-label");
    if (label) label.textContent = S.checkedOf(checked.length, LAB_SCENARIOS.length);
    var verdict = document.getElementById("lab-verdict");
    if (verdict) {
      if (checked.length === 0) {
        verdict.textContent = S.labVerdictEmpty;
      } else {
        var wrong = checked.length - ok;
        verdict.innerHTML = S.labVerdictOk(ok) +
          (wrong > 0 ? S.labVerdictWrong(wrong) : S.labVerdictAllOk);
      }
    }
  }

  function checkLab() {
    var any = false;
    LAB_SCENARIOS.forEach(function (s) {
      var cur = state.lab[s.id] || {};
      if (cur.choice === undefined || cur.choice === null || cur.choice === "") return;
      any = true;
      var choice = cur.choice;
      var result = "wrong";
      if (choice === s.answer) result = "correct";
      else if (s.alt.indexOf(choice) !== -1) result = "defensible";
      state.lab[s.id] = { choice: choice, checked: true, result: result };
    });
    if (!any) { toast(S.chooseFirst); return; }
    saveState();
    renderLab();
  }

  /* ---------------- N+1 simulator ---------------- */
  var N1_AUTHORS = 3;
  var n1Count = 10;
  var n1Approach = "lazy";

  function renderN1Buttons() {
    Array.prototype.forEach.call(document.querySelectorAll("#n1-count-btns .chip-btn"), function (b) {
      b.classList.toggle("active", parseInt(b.dataset.count, 10) === n1Count);
      b.setAttribute("aria-pressed", parseInt(b.dataset.count, 10) === n1Count ? "true" : "false");
    });
    Array.prototype.forEach.call(document.querySelectorAll("#n1-approach-btns .chip-btn"), function (b) {
      b.classList.toggle("active", b.dataset.approach === n1Approach);
      b.setAttribute("aria-pressed", b.dataset.approach === n1Approach ? "true" : "false");
    });
  }

  function n1TimelineItems(B, approach) {
    var items = [];
    if (approach === "lazy") {
      items.push({ text: "SELECT Id, Title, … FROM books", cls: "" });
      var shown = Math.min(B, 10);
      for (var i = 1; i <= shown; i++) {
        items.push({ text: "SELECT … FROM book_authors JOIN authors WHERE book_id = " + i, cls: "" });
      }
      if (B > shown) items.push({ text: S.n1More(B - shown), cls: "tl-more" });
      items.push({ text: S.n1LazyTotal(B + 1, B * (1 + N1_AUTHORS)), cls: "tl-final" });
    } else if (approach === "eager") {
      items.push({ text: "SELECT books LEFT JOIN book_authors LEFT JOIN authors — one command", cls: "" });
      items.push({ text: S.n1EagerResult(B * N1_AUTHORS), cls: "" });
      items.push({ text: S.n1EagerTotal(B * N1_AUTHORS), cls: "tl-final" });
    } else {
      items.push({ text: "SELECT b.Id, b.Title, (SELECT COUNT(*) FROM book_authors ba WHERE ba.book_id = b.Id) — one command", cls: "" });
      items.push({ text: S.n1ProjResult(B), cls: "" });
      items.push({ text: S.n1ProjTotal(B), cls: "tl-final" });
    }
    return items;
  }

  function runN1() {
    renderN1Buttons();
    var B = n1Count, approach = n1Approach;
    var tl = document.getElementById("n1-timeline");
    if (!tl) return;
    tl.innerHTML = "";
    var items = n1TimelineItems(B, approach);
    items.forEach(function (it, i) {
      var chip = document.createElement("div");
      chip.className = "tl-chip" + (it.cls ? " " + it.cls : "");
      var num = document.createElement("span");
      num.className = "tl-num";
      num.textContent = String(i + 1);
      var txt = document.createElement("span");
      txt.textContent = it.text;
      chip.appendChild(num);
      chip.appendChild(txt);
      tl.appendChild(chip);
      if (REDUCED) chip.classList.add("shown");
      else setTimeout(function () { chip.classList.add("shown"); }, 70 * i);
    });
    var d;
    if (approach === "lazy") d = { commands: B + 1, rows: B * (1 + N1_AUTHORS), entities: B * (1 + N1_AUTHORS) };
    else if (approach === "eager") d = { commands: 1, rows: B * N1_AUTHORS, entities: B + B * N1_AUTHORS };
    else d = { commands: 1, rows: B, entities: 0 };
    document.getElementById("n1-m-commands").textContent = String(d.commands);
    document.getElementById("n1-m-rows").textContent = String(d.rows);
    document.getElementById("n1-m-entities").textContent = d.entities === 0 ? S.dtosOnly : String(d.entities);
    var work = { lazy: S.n1WorkLazy(B), eager: S.n1WorkEager, projection: S.n1WorkProj };
    document.getElementById("n1-m-work").textContent = work[approach];
    var verdict = document.getElementById("n1-verdict");
    if (approach === "lazy") {
      verdict.innerHTML = S.n1VerdictLazy(B, B + 1, B * (1 + N1_AUTHORS));
    } else if (approach === "eager") {
      verdict.innerHTML = S.n1VerdictEager(B * N1_AUTHORS);
    } else {
      verdict.innerHTML = S.n1VerdictProj(B);
    }
  }

  /* ---------------- cartesian calculator ---------------- */
  function computeCalc() {
    var bEl = document.getElementById("calc-books");
    var aEl = document.getElementById("calc-authors");
    var eEl = document.getElementById("calc-entries");
    if (!bEl || !aEl || !eEl) return;
    var b = parseInt(bEl.value, 10);
    var a = parseInt(aEl.value, 10);
    var e = parseInt(eEl.value, 10);
    document.getElementById("calc-books-val").textContent = String(b);
    document.getElementById("calc-authors-val").textContent = String(a);
    document.getElementById("calc-entries-val").textContent = String(e);
    var single = b * a * e;
    var split = b + b * a + b * e;
    var ratio = single / split;
    document.getElementById("calc-single-rows").textContent = single.toLocaleString();
    document.getElementById("calc-split-rows").textContent = split.toLocaleString();
    document.getElementById("calc-ratio").textContent = (Math.round(ratio * 10) / 10) + "×";
    var verdict = document.getElementById("calc-verdict");
    if (a === 1 && e === 1) {
      verdict.textContent = S.calcOne;
    } else if (ratio >= 5) {
      verdict.innerHTML = S.calcSevere(single.toLocaleString(), split.toLocaleString(), Math.round(ratio * 10) / 10);
    } else {
      verdict.innerHTML = S.calcModerate(single.toLocaleString(), split.toLocaleString(), Math.round(ratio * 10) / 10);
    }
  }

  /* ---------------- relationship explorer ---------------- */
  var explorerType = "one-to-many";
  var explorerMode = "optional";

  function explorerKey() {
    return explorerType === "many-to-many" ? "many-to-many" : explorerType + "-" + explorerMode;
  }

  function tickSvg(x, y) {
    return '<line class="erd-line" x1="' + (x - 4) + '" y1="' + (y - 7) + '" x2="' + (x - 4) + '" y2="' + (y + 7) + '"></line>' +
           '<line class="erd-line" x1="' + (x + 3) + '" y1="' + (y - 7) + '" x2="' + (x + 3) + '" y2="' + (y + 7) + '"></line>';
  }
  function crowSvg(x, y, dir) {
    var dx = 11 * dir;
    return '<line class="erd-line" x1="' + x + '" y1="' + y + '" x2="' + (x + dx) + '" y2="' + (y - 9) + '"></line>' +
           '<line class="erd-line" x1="' + x + '" y1="' + y + '" x2="' + (x + dx) + '" y2="' + (y + 9) + '"></line>' +
           '<line class="erd-line" x1="' + x + '" y1="' + y + '" x2="' + (x + dx) + '" y2="' + y + '"></line>';
  }
  function buildBoxSvg(ent, x, y, W, HDR, ROW, PAD) {
    var h = HDR + ent.props.length * ROW + PAD;
    var out = "";
    out += '<rect class="erd-rect" x="' + x + '" y="' + y + '" width="' + W + '" height="' + h + '" rx="10"></rect>';
    out += '<path class="erd-head" d="M ' + x + " " + (y + 10) + " q 0 -10 10 -10 h " + (W - 20) + " q 10 0 10 10 v " + (HDR - 10) + " h -" + W + ' z"></path>';
    out += '<text class="erd-name" x="' + (x + 14) + '" y="' + (y + 23) + '">' + esc(ent.name) + "</text>";
    out += '<text class="erd-role" x="' + (x + W - 14) + '" y="' + (y + 23) + '" text-anchor="end">' + esc(ent.role) + "</text>";
    ent.props.forEach(function (p, i) {
      var ry = y + HDR + i * ROW + 16;
      if (p.k === "fk" || p.k === "shadowfk") {
        out += '<rect class="erd-fk-col" x="' + (x + 1) + '" y="' + (y + HDR + i * ROW + 2) + '" width="' + (W - 2) + '" height="' + (ROW - 2) + '"></rect>';
      }
      out += '<text class="erd-prop" x="' + (x + 14) + '" y="' + ry + '">' + esc(p.t) + "</text>";
      var tag = "", cls = "";
      if (p.k === "pk") { tag = "PK"; cls = "erd-pk"; }
      else if (p.k === "fk") { tag = "FK"; cls = "erd-fk"; }
      else if (p.k === "shadowfk") { tag = "FK (shadow)"; cls = "erd-fk"; }
      else if (p.k === "nav") { tag = "NAV"; cls = "erd-nav"; }
      if (tag) out += '<text class="' + cls + '" x="' + (x + W - 14) + '" y="' + ry + '" text-anchor="end">' + tag + "</text>";
    });
    return out;
  }
  function buildERDSvg(d) {
    var W = 250, HDR = 34, ROW = 24, PAD = 10;
    var leftX = 24, rightX = 396, topY = 34;
    var boxH = Math.max(d.left.props.length, d.right.props.length) * ROW + HDR + PAD;
    var totalW = rightX + W + 24;
    var totalH = topY + boxH + 46;
    var midY = topY + boxH / 2;
    var parts = [];
    parts.push('<svg viewBox="0 0 ' + totalW + " " + totalH + '" role="img" aria-label="' + esc(S.erdAria(d.relationLabel)) + '" xmlns="http://www.w3.org/2000/svg">');
    parts.push('<text class="erd-label" x="' + Math.round(totalW / 2) + '" y="20" text-anchor="middle">' + esc(d.relationLabel) + "</text>");
    parts.push('<line class="erd-line" x1="' + (leftX + W) + '" y1="' + midY + '" x2="' + rightX + '" y2="' + midY + '"></line>');
    parts.push(buildBoxSvg(d.left, leftX, topY, W, HDR, ROW, PAD));
    parts.push(buildBoxSvg(d.right, rightX, topY, W, HDR, ROW, PAD));
    var lc = d.cardinality.left, rc = d.cardinality.right;
    var x1 = leftX + W, x2 = rightX;
    if (lc === "1") parts.push(tickSvg(x1 + 9, midY));
    else parts.push(crowSvg(x1, midY, 1));
    parts.push('<text class="erd-card" x="' + (x1 + 22) + '" y="' + (midY - 12) + '">' + esc(lc) + "</text>");
    if (rc === "1") parts.push(tickSvg(x2 - 9, midY));
    else parts.push(crowSvg(x2, midY, -1));
    parts.push('<text class="erd-card" x="' + (x2 - 24) + '" y="' + (midY - 12) + '" text-anchor="end">' + esc(rc) + "</text>");
    if (d.optionality === "optional") {
      var cx = x2 - (rc === "1" ? 26 : 34);
      parts.push('<circle cx="' + cx + '" cy="' + midY + '" r="5" style="fill:none; stroke:var(--text-muted); stroke-width:2"></circle>');
      parts.push('<text class="erd-label" x="' + (cx - 8) + '" y="' + (midY + 24) + '" text-anchor="end">' + esc(S.erdOptional) + '</text>');
    } else if (d.optionality === "required") {
      var tx = x2 - (rc === "1" ? 26 : 32);
      parts.push(tickSvg(tx, midY));
      parts.push('<text class="erd-label" x="' + (tx - 8) + '" y="' + (midY + 24) + '" text-anchor="end">' + esc(S.erdRequired) + '</text>');
    }
    parts.push("</svg>");
    return parts.join("");
  }

  function renderExplorer() {
    var d = EXPLORER_DATA[explorerKey()];
    if (!d) return;
    Array.prototype.forEach.call(document.querySelectorAll("#explorer-type-btns .chip-btn"), function (b) {
      var on = b.dataset.type === explorerType;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    var isMN = explorerType === "many-to-many";
    Array.prototype.forEach.call(document.querySelectorAll("#explorer-optionality .chip-btn"), function (b) {
      b.disabled = isMN;
      var on = !isMN && b.dataset.mode === explorerMode;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    var host = document.getElementById("explorer-svg-host");
    if (host) host.innerHTML = buildERDSvg(d);
    var rel = document.getElementById("explorer-relational");
    if (rel) rel.innerHTML = "<ul>" + d.relational.map(function (x) { return "<li>" + fmtInline(x) + "</li>"; }).join("") + "</ul>";
    var ef = document.getElementById("explorer-ef");
    if (ef) {
      ef.innerHTML = "";
      var pre = document.createElement("div");
      pre.className = "mini-code";
      pre.textContent = d.ef;
      ef.appendChild(pre);
      highlightMini(pre);
    }
    var note = document.getElementById("explorer-note");
    if (note) note.innerHTML = fmtInline(d.note);
  }

  /* ---------------- fix-up playground ---------------- */
  var FIXUP_INITIAL_STORY = "Initial state: a fresh <code>BooksContext</code>. Nothing is tracked yet. Book #7, Author #3, Category #2, and the pairing (Book #7 — Author #3) all exist in the database, but EF Core has not read any of them.";
  var FIXUP_NAV_LABELS = { bookAuthors: "book.Authors", authorBooks: "author.Books", bookCategory: "book.Category" };
  var fixupStep = 0;

  function stateChip(s) {
    var style = "background:var(--bg-tertiary); color:var(--text-secondary);";
    if (s === "Modified") style = "background:var(--warning-bg); color:var(--warning);";
    if (s === "Added") style = "background:var(--success-bg); color:var(--success);";
    return '<span style="font-size:0.72rem; font-weight:700; padding:0.1rem 0.5rem; border-radius:999px;' + style + '">' + esc(s) + "</span>";
  }

  function renderFixup() {
    var label = document.getElementById("fixup-step-label");
    if (label) label.textContent = S.stepOf(fixupStep, FIXUP_STEPS.length);
    var prog = document.getElementById("fixup-progress");
    if (prog) {
      prog.innerHTML = "";
      FIXUP_STEPS.forEach(function (_, i) {
        var dot = document.createElement("div");
        dot.className = "fixup-dot" + (i < fixupStep ? " done" : "");
        prog.appendChild(dot);
      });
    }
    var step = fixupStep > 0 ? FIXUP_STEPS[fixupStep - 1] : null;
    var story = document.getElementById("fixup-story");
    if (story) {
      story.innerHTML = step
        ? '<div style="font-family:var(--font-mono); font-size:0.8rem; background:var(--bg-code); border:1px solid var(--border-color); border-radius:6px; padding:0.5rem 0.75rem; margin-bottom:0.6rem; overflow-x:auto; color:#e2e8f0;">' + highlightText(step.code, "cs") + "</div>" + step.story
        : FIXUP_INITIAL_STORY;
    }
    var tHost = document.getElementById("fixup-tracked");
    if (tHost) {
      tHost.innerHTML = "";
      if (!step) {
        tHost.innerHTML = '<em style="color:var(--text-muted); font-size:0.82rem;">' + S.noTracked + '</em>';
      } else {
        var table = document.createElement("table");
        table.className = "concept-table";
        table.style.margin = "0";
        table.innerHTML = "<thead><tr><th>" + S.thEntity + "</th><th>" + S.thState + "</th><th>" + S.thNote + "</th></tr></thead><tbody>" +
          step.tracked.map(function (r) {
            return "<tr><td style=\"font-family:var(--font-mono); font-size:0.78rem;\">" + esc(r.name) + "</td><td>" + stateChip(r.state) +
              '</td><td style="font-size:0.78rem;">' + esc(r.note || "") + "</td></tr>";
          }).join("") + "</tbody>";
        tHost.appendChild(table);
        if (step.shadow) {
          var sh = document.createElement("div");
          sh.style.cssText = "font-family:var(--font-mono); font-size:0.78rem; color:var(--text-muted); margin-top:0.6rem;";
          sh.textContent = step.shadow;
          tHost.appendChild(sh);
        }
      }
    }
    var nHost = document.getElementById("fixup-navs");
    if (nHost) {
      if (!step) {
        nHost.innerHTML = '<em style="color:var(--text-muted); font-size:0.82rem;">' + S.nothingLoaded + '</em>';
      } else {
        nHost.innerHTML = Object.keys(step.navs).map(function (k) {
          var lab = FIXUP_NAV_LABELS[k] || k;
          return '<div style="margin-bottom:0.55rem;"><div style="color:var(--text-muted); font-size:0.72rem; text-transform:uppercase; letter-spacing:0.04em; font-weight:700;">' +
            esc(lab) + '</div><div style="font-family:var(--font-mono); font-size:0.8rem; color:#cbd5e1;">' + esc(step.navs[k]) + "</div></div>";
        }).join("");
      }
    }
    var v = document.getElementById("fixup-verdict");
    if (v) v.innerHTML = (step && step.verdict) ? fmtInline(step.verdict) : S.pressNext;
    var next = document.getElementById("fixup-next");
    if (next) next.disabled = fixupStep >= FIXUP_STEPS.length;
  }

  /* ---------------- assessment ---------------- */
  function lessonTagLabel(id) {
    var meta = LESSON_META.filter(function (m) { return m.id === id; })[0];
    return meta ? meta.label : id;
  }
  function lessonNum(id) {
    var i = LESSON_IDS.indexOf(id);
    return i === -1 ? null : (i + 1);
  }

  function assessmentResultsHtml(last) {
    var wrong = ASSESSMENT_QUESTIONS.map(function (q, i) { return { q: q, i: i, sel: state.assessment.selections[q.id] }; })
      .filter(function (x) { return x.sel !== x.q.correct; });
    var lessons = [];
    ASSESSMENT_QUESTIONS.forEach(function (q) { if (lessons.indexOf(q.lesson) === -1) lessons.push(q.lesson); });
    var breakdown = lessons.map(function (lid) {
      var qs = ASSESSMENT_QUESTIONS.filter(function (q) { return q.lesson === lid; });
      var c = qs.filter(function (q) { return state.assessment.selections[q.id] === q.correct; }).length;
      var n = lessonNum(lid);
      return '<button class="glossary-term-link" type="button" data-nav-target="' + lid + '">' +
        (n ? S.lessonsBreakdown(n) : "") + c + "/" + qs.length + "</button>";
    }).join("");
    var html = '<div class="content-panel" style="margin-top:1.5rem;">' +
      '<h3 style="margin-top:0;">' + S.resultTitle + '</h3>' +
      "<p><span class=\"score-chip " + (last.passed ? "pass" : "fail") + '" style="font-size:1rem;">' + last.pct + "% — " + (last.passed ? S.passChip : S.failChip) + "</span> " +
      S.correctTotal(last.score, last.total, last.threshold) + "</p>" +
      '<div class="explorer-control-label" style="margin-bottom:0.5rem;">' + S.breakdownTitle + '</div>' +
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
      html += '<p style="color:var(--success); font-weight:600; margin-top:1rem;">' + S.perfect + '</p>';
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
      ASSESSMENT_QUESTIONS.forEach(function (q, qi) {
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
            "<div><span class=\"exercise-badge exercise\">" + S.qOf(qi + 1, ASSESSMENT_QUESTIONS.length) + '</span> <span class="exercise-badge">' + esc(num ? S.lessonLabel(num) : lessonTagLabel(q.lesson)) + "</span></div>" +
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
    var total = ASSESSMENT_QUESTIONS.length;
    var answered = ASSESSMENT_QUESTIONS.filter(function (q) { return a.selections[q.id] !== undefined; }).length;
    if (answered < total) {
      toast(S.answerAll(answered, total));
      return;
    }
    var score = ASSESSMENT_QUESTIONS.filter(function (q) { return a.selections[q.id] === q.correct; }).length;
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
    LESSON_META.filter(function (m) {
      return (m.label + " " + m.keywords + " " + m.summary).toLowerCase().indexOf(q) !== -1;
    }).slice(0, 6).forEach(function (m) {
      var num = lessonNum(m.id);
      items.push({ kind: "lesson", ref: m.id, title: (num ? S.lessonTitlePrefix(num) : "") + m.label, snippet: m.summary.slice(0, 150) });
    });
    KNOWLEDGE_CHECKS.filter(function (c) { return c.prompt.toLowerCase().indexOf(q) !== -1; }).slice(0, 6).forEach(function (c) {
      var num = lessonNum(c.group);
      items.push({ kind: "kc", ref: c.group, title: S.kcTitle(num), snippet: c.prompt.slice(0, 150) });
    });
    GLOSSARY.filter(function (t) {
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
      throw new Error("Not a Module 3 progress file.");
    }
    replaceState(normalizeState(obj));
    saveState();
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
      if ((t = e.target.closest("#explorer-type-btns .chip-btn"))) {
        if (t.disabled) return;
        explorerType = t.dataset.type;
        renderExplorer();
        return;
      }
      if ((t = e.target.closest("#explorer-optionality .chip-btn"))) {
        if (t.disabled) return;
        explorerMode = t.dataset.mode;
        renderExplorer();
        return;
      }
      if ((t = e.target.closest("#n1-count-btns .chip-btn"))) {
        n1Count = parseInt(t.dataset.count, 10);
        renderN1Buttons();
        return;
      }
      if ((t = e.target.closest("#n1-approach-btns .chip-btn"))) {
        n1Approach = t.dataset.approach;
        renderN1Buttons();
        return;
      }
    });

    document.addEventListener("change", function (e) {
      var sel = e.target.closest("select[data-lab-id]");
      if (sel) {
        var id = sel.dataset.labId;
        if (sel.value === "") { delete state.lab[id]; }
        else { state.lab[id] = { choice: parseInt(sel.value, 10) }; }
        saveState();
        renderLab();
        return;
      }
      var th = e.target.closest("#assessment-threshold");
      if (th) {
        var v = parseInt(th.value, 10);
        if ([70, 80, 90].indexOf(v) !== -1) { state.assessment.threshold = v; saveState(); }
      }
    });

    var bind = function (id, ev, fn) { var el = document.getElementById(id); if (el) el.addEventListener(ev, fn); };

    bind("fixup-next", "click", function () {
      if (fixupStep < FIXUP_STEPS.length) { fixupStep += 1; renderFixup(); }
    });
    bind("fixup-reset", "click", function () { fixupStep = 0; renderFixup(); });
    bind("n1-run", "click", runN1);
    bind("lab-check", "click", checkLab);
    bind("lab-reset", "click", function () {
      state.lab = {};
      saveState();
      renderLab();
    });
    bind("calc-reset", "click", function () {
      document.getElementById("calc-books").value = 50;
      document.getElementById("calc-authors").value = 3;
      document.getElementById("calc-entries").value = 2;
      computeCalc();
    });
    ["calc-books", "calc-authors", "calc-entries"].forEach(function (id) {
      bind(id, "input", computeCalc);
    });
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
    renderLab();
    renderAssessment();
    renderExplorer();
    renderFixup();
    renderN1Buttons();
    computeCalc();
  }

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    loadState();

    RaffContent.boot({
      moduleId: "module-03",
      storageKey: STORAGE_KEY,
      lessons: MODULE_LESSONS,
      startId: "lesson-0",

      state: {
        load: function () { return appState; },
        save: function () { saveState(); },
        activeId: function () { return null; },
        setActive: function () {},
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
      exportName: "raff_efcore_module_03_progress.json",
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
        items: GLOSSARY,
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
      },

      afterStateChange: function () {
        applyTheme();
        renderAll();
      }
    });
  });

})();
