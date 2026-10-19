"use strict";

/* Module 04 page script — state, knowledge checks, assessment, and
   the five bespoke widgets (pipeline simulator, validation
   playground, layer lab, PATCH simulator, error explorer).
   Shared shell, navigation, progress, theme, search, glossary,
   export/import/reset, highlighting and copy buttons come from
   component/core/content.js (RaffContent). */

(function () {

  /* ---------------- helpers ---------------- */

  var esc = function (s) { return RaffUI.escapeHtml(s); };
  var fmtInline = function (s) { return RaffUI.fmtInline(s); };
  function toast(msg) { RaffUI.toast(msg); }
  var highlightText = function (raw, lang) { return RaffHighlight.text(raw, lang); };

  function _q(sel, root) { return (root || document).querySelector(sel); }
  function _qa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------------- Arabic overlay (no-op for EN) ---------------- */
  var OV = (RaffI18n.get() === "ar") ? (window.RAFF_MODULE_04_AR || null) : null;
  var LESSONS = MODULE_LESSONS;
  var CHECKS = KNOWLEDGE_CHECKS;
  var ASSESSMENT = ASSESSMENT_QUESTIONS;
  var TERMS = GLOSSARY;
  var META = LESSON_META;
  var STAGES = PIPELINE_STAGES;
  var STAGE_INFO = PIPELINE_STAGE_INFO;
  var PIPE_SCENARIOS = PIPELINE_SCENARIOS;
  var LAYER_META = LAYER_LABELS;
  var LAYER_CASES = LAYER_SCENARIOS;
  var PATCH_M = PATCH_MODES;
  var PATCH_R = PATCH_REQUESTS;
  var ERRORS = ERROR_SCENARIOS;
  if (OV) {
    if (OV.lessons) LESSONS = RaffI18n.mergeById(MODULE_LESSONS, OV.lessons);
    if (OV.knowledgeChecks) CHECKS = KNOWLEDGE_CHECKS.map(function (c) { var o = OV.knowledgeChecks[c.id]; return o ? Object.assign({}, c, o) : c; });
    if (OV.assessmentQuestions) ASSESSMENT = ASSESSMENT_QUESTIONS.map(function (q) { var o = OV.assessmentQuestions[q.id]; return o ? Object.assign({}, q, o) : q; });
    if (OV.glossary) TERMS = GLOSSARY.map(function (t) { var o = OV.glossary[t.t]; return o ? Object.assign({}, t, o) : t; });
    if (OV.lessonMeta) META = LESSON_META.map(function (m) { var o = OV.lessonMeta[m.id]; return o ? Object.assign({}, m, o) : m; });
  }

  var S = RaffI18n.pick({
    en: {
      lessonDone: function (n) { return "Lesson " + n + " Completed ✓"; },
      markLesson: function (n) { return "Mark Lesson " + n + " Complete ✓"; },
      capstoneDone: "Capstone Completed ✓",
      markCapstone: "Mark Capstone Complete ✓",
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
      importInvalidToast: "Import failed — that file is not a valid Module 4 progress export.",
      markedComplete: function (done, total) { return "Lesson marked complete — " + done + "/" + total + " lessons."; },
      copySuccessToast: "Code copied to clipboard.",
      copyFailToast: "Copy failed — select the code manually.",
      searchPlaceholder: "Search lessons, topics, checks, and glossary terms… (e.g. \"ModelState\", \"PATCH\", \"ProblemDetails\")",
      searchHintHtml: '<p style="color:var(--text-muted); font-size:0.85rem;">Type at least two characters. Try “ModelState”, “PATCH”, “Optional”, “ProblemDetails”, or “409”.</p>',
      searchNoMatch: function (q) { return '<p style="color:var(--text-muted); font-size:0.85rem;">No matches for “' + esc(q) + '”.</p>'; },
      glossaryEmpty: "No terms match.",
      goToLabel: function (label) { return "Go to " + label + " →"; }
    }
  });

  var REDUCED = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var LESSON_IDS = ["lesson-1", "lesson-2", "lesson-3", "lesson-4", "lesson-5", "lesson-6", "lesson-7", "capstone"];

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
      if (id === "capstone") {
        btn.textContent = isDone ? S.capstoneDone : S.markCapstone;
      } else {
        var num = id.replace("lesson-", "");
        btn.textContent = isDone ? S.lessonDone(num) : S.markLesson(num);
      }
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

  /* ---------------- widget 1 — pipeline simulator ---------------- */
  function buildPipeline(root) {
    var body = _q(".simulator-body", root);
    body.innerHTML =
      '<div class="simulator-controls" style="margin-bottom:1rem;">' +
      '<div class="explorer-control-group"><span class="explorer-control-label">Scenario</span>' +
      '<select class="sim-select" data-role="scenario">' +
      PIPE_SCENARIOS.map(function (s, i) { return '<option value="' + i + '">' + esc(s.label) + "</option>"; }).join("") +
      "</select></div>" +
      '<button class="btn-sim primary" type="button" data-role="run">▶ Run request</button>' +
      "</div>" +
      '<div class="m4-stages" data-role="stages"></div>' +
      '<div data-role="verdict" class="sim-verdict" style="display:none;"></div>';

    function renderStages(scenario) {
      var stagesBox = _q('[data-role="stages"]', body);
      var stopIdx = scenario.stop ? STAGES.indexOf(scenario.stop) : -1;
      stagesBox.innerHTML = STAGES.map(function (key, i) {
        var cls = "m4-stage";
        if (stopIdx !== -1 && i > stopIdx) cls += " st-skip";
        else if (stopIdx !== -1 && i === stopIdx) cls += " st-fail";
        else cls += " st-pass";
        var info = STAGE_INFO[key];
        return '<div class="' + cls + '"><div class="m4-stage-name">' + info[0] + "</div>" +
          '<div class="m4-stage-desc">' + info[1] + "</div></div>";
      }).join("");
    }

    function run() {
      var idx = Number(_q('[data-role="scenario"]', body).value);
      var scenario = PIPE_SCENARIOS[idx];
      renderStages(scenario);
      var verdict = _q('[data-role="verdict"]', body);
      verdict.style.display = "block";
      var statusClass = scenario.status < 300 ? "status-2xx" : (scenario.status < 500 ? "status-4xx" : "status-5xx");
      var html = "<strong>" + esc(scenario.request.replace("\n", " — body: ")) + "</strong><br><br>";
      html += '<span class="status-badge ' + statusClass + '">' + esc(scenario.statusText) + "</span>";
      if (scenario.errors && scenario.errors.length) {
        html += '<div class="m4-mode-note">Stopped at the ' + esc(scenario.errorGate) + ":</div>";
        html += '<ul class="m4-err-list">' + scenario.errors.map(function (e) { return "<li>" + esc(e) + "</li>"; }).join("") + "</ul>";
      }
      var bodyObj = scenario.status === 201
        ? scenario.body
        : {
            type: "https://tools.ietf.org/html/rfc9110#section-15.5.1",
            title: "One or more validation errors occurred.",
            status: 400,
            errors: { detail: scenario.errors },
            traceId: "00-demo-session-00"
          };
      html += '<div class="mini-code">' + highlightText(JSON.stringify(bodyObj, null, 2), "json") + "</div>";
      html += '<div class="m4-mode-note">' + scenario.note + "</div>";
      verdict.innerHTML = html;
    }

    _q('[data-role="run"]', body).addEventListener("click", run);
    _q('[data-role="scenario"]', body).addEventListener("change", run);
    run();
  }

  /* ---------------- widget 2 — validation playground ---------------- */
  function buildPlayground(root) {
    var body = _q(".simulator-body", root);
    body.innerHTML =
      '<div class="pg-grid">' +
      "<div>" +
      '<div class="pg-field"><label class="pg-label" for="pg-title">title</label>' +
      '<input class="m4-input" id="pg-title" type="text" value="Dune">' +
      '<label class="m4-check"><input type="checkbox" data-role="omit-title"> Omit "title" from the body</label></div>' +
      '<div class="pg-field"><label class="pg-label" for="pg-year">publishedYear</label>' +
      '<input class="m4-input" id="pg-year" type="text" value="1965">' +
      '<label class="m4-check"><input type="checkbox" data-role="omit-year"> Omit "publishedYear" from the body</label>' +
      '<div class="m4-field-hint">Type anything — digits, words, empty. Conversion failures are part of the demo.</div></div>' +
      '<div class="pg-field"><label class="pg-label" for="pg-summary">summary (optional)</label>' +
      '<textarea class="m4-textarea" id="pg-summary" placeholder="…"></textarea></div>' +
      '<div class="pg-field"><label class="pg-label" for="pg-cover">coverUrl (optional)</label>' +
      '<input class="m4-input" id="pg-cover" type="text" placeholder="https://…"></div>' +
      '<div class="pg-field"><label class="pg-label" for="pg-mode">title rules</label>' +
      '<select class="sim-select" id="pg-mode" style="width:100%;">' +
      '<option value="stringlength">[Required] + [StringLength(200, MinimumLength = 1)]</option>' +
      '<option value="maxlength">[Required] + [MaxLength(200)]</option>' +
      '<option value="implicit">No attributes — non-nullable string (implicit required)</option>' +
      "</select></div>" +
      '<div class="pg-field"><label class="pg-label">Send</label>' +
      '<button class="btn-sim primary" type="button" data-role="send">▶ Send POST /api/books</button></div>' +
      "</div>" +
      '<div class="sim-panel"><div class="sim-panel-title">Request body</div>' +
      '<div class="mini-code" data-role="req"></div>' +
      '<div class="sim-panel-title" style="margin-top:1rem;">Response</div>' +
      '<div data-role="resp"></div>' +
      '<div class="m4-mode-note">Messages mirror captured .NET 10 output. Byte positions vary with the exact payload.</div></div>' +
      "</div>";

    function buildRequest() {
      var obj = {};
      var omitTitle = _q('[data-role="omit-title"]', body).checked;
      var omitYear = _q('[data-role="omit-year"]', body).checked;
      if (!omitTitle) obj.title = _q("#pg-title", body).value;
      var yearRaw = _q("#pg-year", body).value.trim();
      if (!omitYear) {
        obj.publishedYear = (/^-?\d+$/.test(yearRaw) && yearRaw !== "") ? Number(yearRaw) : yearRaw;
      }
      var summary = _q("#pg-summary", body).value;
      if (summary.length) obj.summary = summary;
      var cover = _q("#pg-cover", body).value.trim();
      if (cover.length) obj.coverUrl = cover;
      return obj;
    }

    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }

    function validate() {
      var req = buildRequest();
      var mode = _q("#pg-mode", body).value;
      var errors = [];
      var gate = "validation gate";

      var hasTitle = hasOwn(req, "title");
      var title = hasTitle ? req.title : undefined;

      if (mode === "implicit") {
        if (!hasTitle) {
          gate = "validation gate (implicit)";
          errors.push("The Title field is required.");
        }
      } else {
        if (!hasTitle) {
          errors.push("The Title field is required.");
          if (mode === "stringlength") errors.push("The field Title must be a string with a minimum length of 1 and a maximum length of 200.");
        } else if (title === "") {
          errors.push("The Title field is required.");
          if (mode === "stringlength") errors.push("The field Title must be a string with a minimum length of 1 and a maximum length of 200.");
        } else if (/^\s+$/.test(title)) {
          errors.push("The Title field is required.");
        } else if (title.length > 200) {
          errors.push(mode === "stringlength"
            ? "The field Title must be a string with a minimum length of 1 and a maximum length of 200."
            : "The field Title must be a string with a maximum length of 200.");
        }
      }

      var hasYear = hasOwn(req, "publishedYear");
      if (hasYear && typeof req.publishedYear !== "number") {
        gate = "binding gate";
        errors.unshift("The dto field is required.");
        errors.push("The JSON value could not be converted to System.Int32. Path: $.publishedYear | LineNumber: 0 | BytePositionInLine: 37.");
      } else {
        var year = hasYear ? req.publishedYear : 0;
        if (year < 1 || year > 9999) {
          errors.push("The field PublishedYear must be between 1 and 9999.");
        }
      }

      if (hasOwn(req, "summary") && typeof req.summary === "string" && req.summary.length > 5000) {
        errors.push("The field Summary must be a string with a maximum length of 5000.");
      }
      if (hasOwn(req, "coverUrl") && !/^https:\/\/.+/.test(req.coverUrl)) {
        errors.push("The field CoverUrl must match the regular expression '^https://.+'.");
      }

      return { req: req, errors: errors, gate: gate };
    }

    function render() {
      var result = validate();
      _q('[data-role="req"]', body).innerHTML = highlightText(JSON.stringify(result.req, null, 2), "json");
      var resp = _q('[data-role="resp"]', body);
      if (!result.errors.length) {
        resp.innerHTML = '<div class="m4-ok-banner">201 Created — the action ran and returned the new book.</div>';
        return;
      }
      var bodyObj = {
        type: "https://tools.ietf.org/html/rfc9110#section-15.5.1",
        title: "One or more validation errors occurred.",
        status: 400,
        errors: { detail: result.errors },
        traceId: "00-demo-session-00"
      };
      resp.innerHTML = '<span class="status-badge status-4xx">400 Bad Request</span>' +
        '<div class="m4-mode-note">Stopped at the ' + esc(result.gate) + ".</div>" +
        '<ul class="m4-err-list">' + result.errors.map(function (e) { return "<li>" + esc(e) + "</li>"; }).join("") + "</ul>" +
        '<div class="mini-code">' + highlightText(JSON.stringify(bodyObj, null, 2), "json") + "</div>";
    }

    _q('[data-role="send"]', body).addEventListener("click", render);
    render();
  }

  /* ---------------- widget 3 — layer lab ---------------- */
  function buildLayers(root) {
    var body = _q(".simulator-body", root);
    var rows = LAYER_CASES.map(function (s, i) {
      return '<tr data-row="' + i + '"><td class="lab-scenario">' + esc(s.rule) + "</td>" +
        '<td><select class="sim-select" data-role="pick" data-row="' + i + '">' +
        '<option value="">— choose —</option>' +
        Object.keys(LAYER_META).map(function (k) {
          return '<option value="' + k + '">' + LAYER_META[k] + "</option>";
        }).join("") +
        "</select></td></tr>";
    }).join("");
    body.innerHTML =
      '<table class="lab-table"><thead><tr><th>Rule</th><th>Where does it belong?</th></tr></thead><tbody>' +
      rows + "</tbody></table>" +
      '<div class="simulator-controls" style="margin-top:1rem;">' +
      '<button class="btn-sim primary" type="button" data-role="check">Check my answers</button>' +
      '<button class="btn-sim btn-sim-reset" type="button" data-role="reset">Reset</button></div>';

    function check() {
      var correctCount = 0;
      LAYER_CASES.forEach(function (s, i) {
        var row = _q('[data-row="' + i + '"]', body);
        var pick = _q('[data-role="pick"][data-row="' + i + '"]', body);
        pick.disabled = true;
        var ok = pick.value === s.answer;
        if (ok) correctCount++;
        row.classList.remove("row-correct", "row-wrong");
        row.classList.add(ok ? "row-correct" : "row-wrong");
        var old = _q('.feedback-row[data-fb="' + i + '"]', body);
        if (old) old.remove();
        var fb = document.createElement("tr");
        fb.className = "feedback-row";
        fb.setAttribute("data-fb", String(i));
        var verdict = ok
          ? "✓ " + LAYER_META[s.answer] + " — " + s.why
          : "✕ You chose " + (pick.value ? LAYER_META[pick.value] : "nothing") + ". Right answer: " + LAYER_META[s.answer] + " — " + s.why;
        fb.innerHTML = '<td colspan="2">' + esc(verdict) + "</td>";
        row.parentElement.insertBefore(fb, row.nextSibling);
      });
      toast("Layer lab: " + correctCount + " / " + LAYER_CASES.length + " placed correctly.");
    }

    function reset() {
      LAYER_CASES.forEach(function (s, i) {
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

  /* ---------------- widget 4 — PATCH simulator ---------------- */
  function buildPatch(root) {
    var body = _q(".simulator-body", root);
    var storedNote = "chapter 3";
    body.innerHTML =
      '<div class="simulator-controls" style="margin-bottom:1rem;">' +
      '<div class="explorer-control-group"><span class="explorer-control-label">Approach</span>' +
      '<select class="sim-select" data-role="mode">' +
      Object.keys(PATCH_M).map(function (k) { return '<option value="' + k + '">' + esc(PATCH_M[k].label) + "</option>"; }).join("") +
      "</select></div>" +
      '<div class="explorer-control-group"><span class="explorer-control-label">Request</span>' +
      PATCH_R.map(function (r) { return '<button class="btn-sim" type="button" data-role="req" data-req="' + r.id + '">' + esc(r.label) + "</button>"; }).join("") +
      "</div>" +
      '<button class="btn-sim btn-sim-reset" type="button" data-role="reset">Reset stored note</button>' +
      "</div>" +
      '<div class="sim-grid">' +
      '<div class="sim-panel"><div class="sim-panel-title">What the code sees</div><div data-role="trace"></div></div>' +
      '<div class="sim-panel"><div class="sim-panel-title">Stored note</div>' +
      '<div class="metric-card"><div class="metric-value" data-role="stored"></div>' +
      '<div class="metric-label">reading_entries.note</div></div>' +
      '<div class="m4-mode-note" data-role="mode-note"></div></div>' +
      "</div>";

    function storedHtml() {
      if (storedNote === null) return '<span class="pres-null">NULL — cleared</span>';
      if (storedNote === "") return '<span class="pres-value">"" — empty string</span>';
      return '<span class="pres-value">"' + esc(storedNote) + '"</span>';
    }

    function render(reqId) {
      var modeKey = _q('[data-role="mode"]', body).value;
      var mode = PATCH_M[modeKey];
      if (reqId === "absent") { /* no change */ }
      else if (reqId === "null") { if (mode.canClear) storedNote = null; }
      else if (reqId === "value") { storedNote = "chapter 5"; }
      var req = PATCH_R.filter(function (r) { return r.id === reqId; })[0];
      var trace = _q('[data-role="trace"]', body);
      trace.innerHTML =
        '<p style="color:#cbd5e1;font-size:0.86rem;">' + esc(req.human) + "</p>" +
        '<div class="sim-table" style="margin-top:0.5rem;"><table>' +
        "<tr><th>Bound value</th><td>" + esc(mode.bound[reqId]) + "</td></tr>" +
        "<tr><th>Branch</th><td>" + esc(mode.exec[reqId]) + "</td></tr>" +
        "</table></div>" +
        (reqId === "null" && !mode.canClear
          ? '<div class="m4-mode-note" style="color:var(--warning);">Approach A treats this exactly like omission — the explicit null is lost, and the note survives. Clearing is impossible.</div>'
          : "");
      _q('[data-role="stored"]', body).innerHTML = storedHtml();
      _q('[data-role="mode-note"]', body).textContent = reqId === "null" && !mode.canClear
        ? "Null and absent are indistinguishable at binding time."
        : "The three intents produce three distinct outcomes.";
    }

    _qa('[data-role="req"]', body).forEach(function (btn) {
      btn.addEventListener("click", function () { render(btn.getAttribute("data-req")); });
    });
    _q('[data-role="mode"]', body).addEventListener("change", function () { render("absent"); });
    _q('[data-role="reset"]', body).addEventListener("click", function () {
      storedNote = "chapter 3";
      _q('[data-role="stored"]', body).innerHTML = storedHtml();
      toast('Stored note reset to "chapter 3".');
    });
    _q('[data-role="stored"]', body).innerHTML = storedHtml();
  }

  /* ---------------- widget 5 — error explorer ---------------- */
  function buildErrors(root) {
    var body = _q(".simulator-body", root);
    body.innerHTML =
      '<div class="explorer-controls" style="margin-bottom:1rem;">' +
      ERRORS.map(function (s, i) {
        return '<button class="btn-sim" type="button" data-role="scenario" data-idx="' + i + '">' + esc(s.label) + "</button>";
      }).join("") +
      "</div>" +
      '<div class="explorer-grid">' +
      '<div class="explorer-panel"><div class="explorer-panel-title">Request</div><div data-role="req" class="mini-code"></div>' +
      '<p data-role="produced" style="margin-top:0.75rem;"></p></div>' +
      '<div class="explorer-panel"><div class="explorer-panel-title">Response</div>' +
      '<div data-role="status"></div>' +
      '<div class="mini-code" data-role="resp"></div></div>' +
      "</div>";

    function show(idx) {
      var s = ERRORS[idx];
      _q('[data-role="req"]', body).innerHTML = highlightText(s.request, "http");
      _q('[data-role="produced"]', body).textContent = s.produced;
      var cls = s.status < 300 ? "status-2xx" : (s.status < 500 ? "status-4xx" : "status-5xx");
      _q('[data-role="status"]', body).innerHTML = '<span class="status-badge ' + cls + '" style="margin-bottom:0.5rem;display:inline-block;">' + s.status + "</span>";
      _q('[data-role="resp"]', body).innerHTML = highlightText(JSON.stringify(s.body, null, 2), "json");
      _qa('[data-role="scenario"]', body).forEach(function (b, i) {
        b.classList.toggle("primary", i === idx);
      });
    }

    _qa('[data-role="scenario"]', body).forEach(function (btn) {
      btn.addEventListener("click", function () { show(Number(btn.getAttribute("data-idx"))); });
    });
    show(0);
  }

  function initWidgets() {
    var builders = { pipeline: buildPipeline, playground: buildPlayground, layers: buildLayers, patch: buildPatch, errors: buildErrors };
    _qa(".simulator-widget[data-widget]").forEach(function (root) {
      var name = root.getAttribute("data-widget");
      if (builders[name]) {
        try { builders[name](root); }
        catch (err) {
          var body = _q(".simulator-body", root);
          if (body) body.innerHTML = '<p class="m4-empty-note">This widget could not start. See the browser console for details.</p>';
          if (window.console && window.console.error) window.console.error("Widget failed:", name, err);
        }
      }
    });
  }

  /* ---------------- assessment ---------------- */
  function lessonTagLabel(id) {
    var meta = META.filter(function (m) { return m.id === id; })[0];
    return meta ? meta.label : id;
  }
  function lessonNum(id) {
    if (id === "capstone") return null;
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
      throw new Error("Not a Module 4 progress file.");
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
      moduleId: "module-04",
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
      exportName: "raff_aspnet_module_04_progress.json",
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
