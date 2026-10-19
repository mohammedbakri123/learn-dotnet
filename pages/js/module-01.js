"use strict";

/* Module 01 page script — bespoke widgets only.
   Shared shell, navigation, progress, theme, search, glossary,
   export/import/reset, highlighting and copy buttons come from
   component/core/content.js (RaffContent). */

(function () {

  const showToast = (msg) => RaffUI.toast(msg);

  let appState = {
    theme: 'dark',
    activeLesson: 'lesson-0',
    completedLessons: [],
    answers: {},
    assessment: {
      submitted: false,
      score: 0,
      answers: {}
    }
  };

  let courseCtx = null;
  function notifyChange() { if (courseCtx) courseCtx.refresh(); }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        appState = Object.assign(appState, parsed);
        if (!Array.isArray(appState.completedLessons)) appState.completedLessons = [];
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or restricted. State retained in memory.', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.warn('Unable to persist to LocalStorage.', e);
    }
  }

  function formatLessonName(id) {
    if (id === 'lesson-0') return 'Overview';
    if (id.startsWith('lesson-')) return `Lesson ${id.replace('lesson-', '')}`;
    return id;
  }

  // ---- Progress reporting (rendered by the shared runtime) ----
  const ASSESSMENT_IDS = ['qa-1', 'qa-2', 'qa-3', 'qa-4', 'qa-5', 'qa-6', 'qa-7', 'qa-8', 'qa-9', 'qa-10'];

  function computeProgress() {
    const totalUnits = 8; // 7 lessons + final assessment
    const completedCount = appState.completedLessons.filter(l => l.startsWith('lesson-') && l !== 'lesson-0').length;
    const assessmentPassed = (appState.assessment && appState.assessment.submitted && appState.assessment.score >= 80) ? 1 : 0;
    const progressPercent = Math.round(((completedCount + assessmentPassed) / totalUnits) * 100);

    // Match the original dynamic labels on the complete buttons
    document.querySelectorAll('.btn-complete-lesson').forEach(btn => {
      const lesson = btn.getAttribute('data-lesson');
      const isCompleted = appState.completedLessons.includes(lesson);
      btn.innerHTML = isCompleted
        ? '✓ Lesson Completed'
        : '<span class="complete-checkbox">✓</span> Mark Lesson Complete';
    });

    const totalChecks = Object.keys(QUESTIONS_DB).filter(id => ASSESSMENT_IDS.indexOf(id) === -1).length;
    const answered = Object.keys(appState.answers || {}).length;

    return {
      percent: progressPercent,
      lessonsLabel: `${completedCount + assessmentPassed} / ${totalUnits} units (${progressPercent}%)`,
      checksLabel: `${answered} / ${totalChecks}`
    };
  }

  // ---- Knowledge Check Engine ----
  function quizGroups() {
    return Array.prototype.slice.call(document.querySelectorAll('.quiz-options:not(.assessment-group)'));
  }

  function bindKnowledgeChecks() {
    quizGroups().forEach(group => {
      group.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', () => {
          if (opt.classList.contains('disabled')) return;
          group.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
        });
      });
    });

    document.querySelectorAll('.btn-submit-quiz').forEach(btn => {
      btn.addEventListener('click', () => {
        evaluateQuestion(btn.getAttribute('data-qid'));
      });
    });

    document.querySelectorAll('.btn-retry-quiz').forEach(btn => {
      btn.addEventListener('click', () => {
        retryQuestion(btn.getAttribute('data-qid'));
      });
    });
  }

  function evaluateQuestion(qid) {
    const group = document.querySelector(`.quiz-options[data-qid="${qid}"]`);
    if (!group) return;

    const selected = group.querySelector('.quiz-option.selected');
    if (!selected) {
      showToast('⚠️ Please select an answer before submitting.');
      return;
    }

    const selectedOpt = parseInt(selected.getAttribute('data-opt'), 10);
    const qData = QUESTIONS_DB[qid];
    if (!qData) return;

    const isCorrect = (selectedOpt === qData.correct);

    appState.answers[qid] = { selectedOpt, isCorrect };
    saveState();
    notifyChange();

    displayQuestionFeedback(qid, isCorrect, qData.exp, selectedOpt, qData.correct);
  }

  function displayQuestionFeedback(qid, isCorrect, explanation, selectedOpt, correctOpt) {
    const group = document.querySelector(`.quiz-options[data-qid="${qid}"]`);
    const submitBtn = document.querySelector(`.btn-submit-quiz[data-qid="${qid}"]`);
    const retryBtn = document.querySelector(`.btn-retry-quiz[data-qid="${qid}"]`);
    const feedbackBox = document.getElementById(`feedback-${qid}`);

    if (!group || !feedbackBox) return;

    group.querySelectorAll('.quiz-option').forEach(opt => {
      opt.classList.add('disabled');
      const optNum = parseInt(opt.getAttribute('data-opt'), 10);
      if (optNum === selectedOpt) {
        opt.classList.add(isCorrect ? 'correct' : 'incorrect');
      }
      if (!isCorrect && optNum === correctOpt) {
        opt.classList.add('correct');
      }
    });

    if (submitBtn) submitBtn.style.display = 'none';
    if (retryBtn) retryBtn.style.display = isCorrect ? 'none' : 'inline-flex';

    feedbackBox.className = `quiz-feedback visible ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackBox.innerHTML = `
      <div class="feedback-headline">${isCorrect ? '✅ Excellent! Correct.' : '❌ Not quite correct.'}</div>
      <p style="margin:0; font-size:0.9rem; line-height:1.5;">${explanation}</p>
    `;
  }

  function retryQuestion(qid) {
    const group = document.querySelector(`.quiz-options[data-qid="${qid}"]`);
    const submitBtn = document.querySelector(`.btn-submit-quiz[data-qid="${qid}"]`);
    const retryBtn = document.querySelector(`.btn-retry-quiz[data-qid="${qid}"]`);
    const feedbackBox = document.getElementById(`feedback-${qid}`);

    if (!group) return;

    group.querySelectorAll('.quiz-option').forEach(opt => {
      opt.classList.remove('selected', 'correct', 'incorrect', 'disabled');
    });

    if (submitBtn) submitBtn.style.display = 'inline-flex';
    if (retryBtn) retryBtn.style.display = 'none';
    if (feedbackBox) { feedbackBox.className = 'quiz-feedback'; feedbackBox.innerHTML = ''; }

    delete appState.answers[qid];
    saveState();
    notifyChange();
  }

  function restoreQuestionState(qid, ans) {
    const group = document.querySelector(`.quiz-options[data-qid="${qid}"]`);
    const qData = QUESTIONS_DB[qid];
    if (!group || !qData) return;

    const opt = group.querySelector(`.quiz-option[data-opt="${ans.selectedOpt}"]`);
    if (opt) {
      opt.classList.add('selected');
      displayQuestionFeedback(qid, ans.isCorrect, qData.exp, ans.selectedOpt, qData.correct);
    }
  }

  function renderQuizState() {
    quizGroups().forEach(group => {
      const qid = group.getAttribute('data-qid');
      group.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected', 'correct', 'incorrect', 'disabled'));
      const feedbackBox = document.getElementById(`feedback-${qid}`);
      if (feedbackBox) { feedbackBox.className = 'quiz-feedback'; feedbackBox.innerHTML = ''; }
      const submitBtn = document.querySelector(`.btn-submit-quiz[data-qid="${qid}"]`);
      if (submitBtn) submitBtn.style.display = 'inline-flex';
      const retryBtn = document.querySelector(`.btn-retry-quiz[data-qid="${qid}"]`);
      if (retryBtn) retryBtn.style.display = 'none';
    });

    for (const [qid, ans] of Object.entries(appState.answers || {})) {
      restoreQuestionState(qid, ans);
    }
  }

  // ---- Final Assessment Engine ----
  function renderAssessment() {
    const container = document.getElementById('assessment-container');
    if (!container) return;

    let html = '';
    ASSESSMENT_IDS.forEach((id, idx) => {
      const q = QUESTIONS_DB[id];
      html += `
        <div class="exercise-card" id="${id}">
          <div class="exercise-header">
            <div class="exercise-title-group">
              <span class="exercise-badge">Assessment Q${idx + 1}</span>
              <span>${q.topic}</span>
            </div>
          </div>
          <div class="exercise-body">
            <div class="exercise-prompt">${q.prompt}</div>
            <div class="quiz-options assessment-group" data-qid="${id}">
              ${q.opts.map((opt, i) => `
                <div class="quiz-option" data-opt="${i}">
                  <div class="option-indicator">${String.fromCharCode(65 + i)}</div>
                  <div class="option-text">${opt}</div>
                </div>
              `).join('')}
            </div>
            <div class="quiz-feedback" id="feedback-${id}"></div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', () => {
        if (appState.assessment && appState.assessment.submitted) return;
        const group = opt.closest('.quiz-options');
        group.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });

    const submitAssessmentBtn = document.getElementById('btn-submit-final-assessment');
    if (submitAssessmentBtn && !submitAssessmentBtn.dataset.bound) {
      submitAssessmentBtn.dataset.bound = 'true';
      submitAssessmentBtn.addEventListener('click', gradeFinalAssessment);
    }

    const resultsBox = document.getElementById('assessment-results');
    if (appState.assessment && appState.assessment.submitted) {
      renderAssessmentResults();
    } else {
      if (resultsBox) { resultsBox.style.display = 'none'; resultsBox.innerHTML = ''; }
      if (submitAssessmentBtn) submitAssessmentBtn.style.display = '';
    }
  }

  function gradeFinalAssessment() {
    const answers = {};
    let correctCount = 0;
    let unselectedCount = 0;

    ASSESSMENT_IDS.forEach(id => {
      const group = document.querySelector(`.quiz-options[data-qid="${id}"]`);
      const selected = group.querySelector('.quiz-option.selected');
      if (!selected) {
        unselectedCount++;
      } else {
        const optNum = parseInt(selected.getAttribute('data-opt'), 10);
        const qData = QUESTIONS_DB[id];
        const isCorrect = (optNum === qData.correct);
        if (isCorrect) correctCount++;
        answers[id] = { selected: optNum, isCorrect };
      }
    });

    if (unselectedCount > 0) {
      showToast(`⚠️ Please answer all questions (${unselectedCount} unanswered).`);
      return;
    }

    const score = Math.round((correctCount / ASSESSMENT_IDS.length) * 100);

    appState.assessment = { submitted: true, score, answers };
    saveState();
    notifyChange();

    renderAssessmentResults();
    showToast(`Assessment submitted! Score: ${score}%`);
  }

  function renderAssessmentResults() {
    const resultsBox = document.getElementById('assessment-results');
    const submitBtn = document.getElementById('btn-submit-final-assessment');
    if (!resultsBox) return;

    if (submitBtn) submitBtn.style.display = 'none';

    const score = appState.assessment.score;
    const passed = score >= 80;

    for (const [qid, ans] of Object.entries(appState.assessment.answers)) {
      const qData = QUESTIONS_DB[qid];
      displayQuestionFeedback(qid, ans.isCorrect, qData.exp, ans.selected, qData.correct);
    }

    const topics = {};
    for (const [qid, ans] of Object.entries(appState.assessment.answers)) {
      const q = QUESTIONS_DB[qid];
      if (!topics[q.topic]) topics[q.topic] = { total: 0, correct: 0 };
      topics[q.topic].total++;
      if (ans.isCorrect) topics[q.topic].correct++;
    }

    let topicRows = '';
    for (const [topic, stat] of Object.entries(topics)) {
      const pct = Math.round((stat.correct / stat.total) * 100);
      const isWeak = pct < 80;
      topicRows += `
        <tr>
          <td><strong>${topic}</strong></td>
          <td>${stat.correct} / ${stat.total}</td>
          <td><span class="status-badge ${isWeak ? 'status-4xx' : 'status-2xx'}">${pct}%</span></td>
          <td>${isWeak ? '<span style="color:var(--warning); font-size:0.85rem;">Review Recommended</span>' : '<span style="color:var(--success); font-size:0.85rem;">Mastered ✓</span>'}</td>
        </tr>
      `;
    }

    resultsBox.style.display = 'block';
    resultsBox.innerHTML = `
      <div class="assessment-score-card">
        <div class="score-circle ${passed ? 'passed' : 'failed'}">
          ${score}%
        </div>
        <div class="score-headline">
          ${passed ? '🎉 Congratulations, Mohammed! Module 1 Mastered.' : '📚 Good Effort! Further Review Recommended.'}
        </div>
        <p class="score-subtext">
          ${passed
            ? 'You have demonstrated a comprehensive understanding of ASP.NET Core HTTP architecture, routing, model binding, DTO contracts, and partial update semantics.'
            : 'You scored below the 80% passing threshold. Inspect the topic breakdown below and revisit the recommended lessons before re-taking.'}
        </p>

        <div class="table-wrapper topic-breakdown-table">
          <table>
            <thead>
              <tr>
                <th>Curriculum Topic</th>
                <th>Score</th>
                <th>Accuracy</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${topicRows}
            </tbody>
          </table>
        </div>

        <div style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn-secondary" id="btn-retake-assessment">🔄 Reset &amp; Retake Assessment</button>
        </div>
      </div>
    `;

    document.getElementById('btn-retake-assessment').addEventListener('click', () => {
      appState.assessment = { submitted: false, score: 0, answers: {} };
      saveState();
      renderAssessment();
      notifyChange();
    });

    resultsBox.scrollIntoView({ behavior: 'smooth' });
  }

  // ---- Interactive Simulators (pipeline inspector, route matcher, PATCH sim) ----
  function initSimulators() {
    const nodes = document.querySelectorAll('.pipeline-node');
    const inspectorTitle = document.getElementById('pipeline-inspector');
    const desc = document.getElementById('inspector-desc');
    const input = document.getElementById('inspector-input');
    const duty = document.getElementById('inspector-duty');
    const raff = document.getElementById('inspector-raff');

    const nodeData = {
      client: {
        title: '📱 Client Application (Frontend / Mobile)',
        desc: 'Initiates TCP/TLS connection and transmits the raw HTTP request stream over the wire.',
        input: 'User action (e.g. submitting a new book form)',
        duty: 'Constructing valid JSON and honoring HTTP REST conventions',
        raff: 'Flutter mobile app sends POST /api/books with JSON payload'
      },
      kestrel: {
        title: '⚡ Kestrel Web Server',
        desc: 'ASP.NET Core\'s native high-performance, cross-platform web server. Listens on TCP sockets and parses HTTP wire protocol.',
        input: 'Raw network socket byte packets',
        duty: 'Protocol parsing (HTTP/1.1, HTTP/2, HTTP/3), TLS termination, and constructing the initial HttpContext',
        raff: 'Allocates HttpContext and invokes the first delegate in Program.cs'
      },
      middleware: {
        title: '⚙️ Middleware Pipeline & Routing',
        desc: 'Bi-directional delegate pipeline configured in Program.cs. Handles cross-cutting concerns before dispatching to controllers.',
        input: 'Raw HttpContext created by Kestrel',
        duty: 'Exception handling, TLS redirect, CORS, authentication, authorization, and endpoint routing',
        raff: 'UseRouting matches POST /api/books to BookController.Add'
      },
      controller: {
        title: '🎯 Controller & Action (BookController)',
        desc: 'The HTTP entry point. Model binding deserializes parameters, validates ModelState, and executes action logic.',
        input: 'Routed HttpContext and parsed action parameters',
        duty: 'HTTP transport adaptation, input validation responses, invoking application services, returning status codes',
        raff: 'Calls _bookService.CreateBookAsync(dto) and returns CreatedAtAction (201 Created)'
      },
      service: {
        title: '📦 Application Service (BookService)',
        desc: 'Pure business logic layer completely decoupled from HTTP concepts (zero HttpContext or IActionResult references).',
        input: 'Strongly-typed DTOs (e.g. CreateBookRequest)',
        duty: 'Enforcing domain invariants, transaction boundaries, and entity mapping',
        raff: 'Maps CreateBookRequest to Book entity and calls context.Books.Add'
      },
      database: {
        title: '🗄️ EF Core DbContext & PostgreSQL',
        desc: 'Translates LINQ expressions into SQL queries, executes queries against PostgreSQL, and tracks entity state changes.',
        input: 'LINQ queries and entity instances',
        duty: 'Relational persistence, schema integrity, and database transaction commits',
        raff: 'Executes INSERT INTO books ... and commits the new book record'
      }
    };

    nodes.forEach(node => {
      node.addEventListener('click', () => {
        nodes.forEach(n => n.classList.remove('selected'));
        node.classList.add('selected');
        const key = node.getAttribute('data-node');
        const d = nodeData[key];
        if (d && desc) {
          inspectorTitle.querySelector('.pipeline-inspector-title span').textContent = d.title;
          desc.textContent = d.desc;
          input.textContent = d.input;
          duty.textContent = d.duty;
          raff.textContent = d.raff;
        }
      });
    });

    const routeButtons = document.querySelectorAll('.btn-test-route');
    const traceBox = document.getElementById('route-trace-box');
    const traceResult = document.getElementById('route-trace-result');
    const traceReason = document.getElementById('route-trace-reason');

    const routeScenarios = {
      '/api/books/featured': {
        result: 'Matches: Endpoint A (GetFeatured)',
        reason: 'Literals take absolute precedence over parameter tokens! ASP.NET Core\'s route tree immediately branches to the literal "featured" match without testing parameter constraints.'
      },
      '/api/books/101': {
        result: 'Matches: Endpoint B (GetById - {id:int})',
        reason: 'Constrained parameters ({id:int}) take higher precedence than unconstrained parameters ({slug}). Since "101" successfully satisfies the integer constraint, Endpoint B is selected.'
      },
      '/api/books/arabic-classics': {
        result: 'Matches: Endpoint C (GetBySlug - {slug})',
        reason: '"arabic-classics" fails the :int constraint of Endpoint B, so Endpoint B is rejected. The unconstrained parameter {slug} in Endpoint C catches the string successfully!'
      }
    };

    routeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        const data = routeScenarios[url];
        if (data && traceBox) {
          traceBox.style.display = 'block';
          traceResult.textContent = data.result;
          traceReason.textContent = data.reason;
        }
      });
    });

    const btnRunSim = document.getElementById('btn-run-sim');
    const simResultBox = document.getElementById('sim-result-box');
    const simResultTitle = document.getElementById('sim-result-title');
    const simResultJson = document.getElementById('sim-result-json');
    const simResultAnalysis = document.getElementById('sim-result-analysis');

    if (btnRunSim) {
      btnRunSim.addEventListener('click', () => {
        const payload = document.getElementById('sim-payload-select').value;
        const algo = document.getElementById('sim-algo-select').value;

        const res = runPartialUpdateSimulation(payload, algo);
        simResultBox.style.display = 'block';
        simResultTitle.innerHTML = res.status;
        simResultJson.textContent = JSON.stringify(res.dbRecord, null, 2);
        simResultAnalysis.innerHTML = res.analysis;
      });
    }
  }

  function runPartialUpdateSimulation(payload, algo) {
    let db = {
      id: 42,
      title: "C# Basics",
      summary: "An introduction to C#",
      coverUrl: "cover.jpg",
      publishedYear: 2022
    };

    if (algo === 'naive') {
      if (payload === 'explicit_null') {
        db.title = "Advanced C#";
        return {
          status: '<span style="color:var(--danger);">❌ BUG OCCURRED: Silent Update Failure</span>',
          dbRecord: db,
          analysis: '<strong>Why it failed:</strong> The client explicitly sent <code>"summary": null</code> intending to clear the summary. However, Raff\'s check <code>if (dto.summary is not null)</code> evaluated to false! The summary was <em>never cleared</em> and remained "An introduction to C#".'
        };
      } else if (payload === 'omitted') {
        db.title = "Advanced C#";
        return {
          status: '<span style="color:var(--success);">✅ Worked as Expected</span>',
          dbRecord: db,
          analysis: 'The title was updated and the summary was preserved. However, this only worked by accident because the omitted property deserialized to null.'
        };
      } else {
        db.summary = "A deep dive into C#";
        return {
          status: '<span style="color:var(--success);">✅ Worked as Expected</span>',
          dbRecord: db,
          analysis: 'The new string was not null, so the update completed successfully.'
        };
      }
    } else if (algo === 'ef_update') {
      if (payload === 'explicit_null' || payload === 'omitted') {
        db = { id: 42, title: "Advanced C#", summary: null, coverUrl: null, publishedYear: 0 };
        return {
          status: '<span style="color:var(--danger);">🚨 CATASTROPHIC DATA LOSS: EF Core Update() Trap</span>',
          dbRecord: db,
          analysis: '<strong>What went wrong:</strong> Calling <code>context.Books.Update(book)</code> marked every single property as Modified. Because <code>coverUrl</code> was not in the DTO, it defaulted to null; <code>publishedYear</code> defaulted to 0. Valid existing columns were completely overwritten in PostgreSQL!'
        };
      } else {
        db = { id: 42, title: "C# Basics", summary: "A deep dive into C#", coverUrl: null, publishedYear: 0 };
        return {
          status: '<span style="color:var(--danger);">🚨 CATASTROPHIC DATA LOSS: EF Core Update() Trap</span>',
          dbRecord: db,
          analysis: 'The summary was updated, but omitted fields (coverUrl, publishedYear) were overwritten with null and 0 in the database!'
        };
      }
    } else if (algo === 'presence') {
      if (payload === 'explicit_null') {
        db.title = "Advanced C#";
        db.summary = null;
        return {
          status: '<span style="color:var(--success);">✅ PERFECT EXECUTION: Presence Tracking Succeeded</span>',
          dbRecord: db,
          analysis: '<strong>Why it succeeded:</strong> <code>Optional&lt;T&gt;</code> detected that <code>summary</code> was explicitly present in the JSON payload (<code>IsSpecified == true</code>). The application set <code>book.Summary = null</code>, successfully clearing the field in PostgreSQL!'
        };
      } else if (payload === 'omitted') {
        db.title = "Advanced C#";
        return {
          status: '<span style="color:var(--success);">✅ PERFECT EXECUTION: Omitted Field Preserved</span>',
          dbRecord: db,
          analysis: '<code>summary.IsSpecified</code> was false, so the service did not touch <code>book.Summary</code>. The existing database value was safely preserved.'
        };
      } else {
        db.summary = "A deep dive into C#";
        return {
          status: '<span style="color:var(--success);">✅ PERFECT EXECUTION</span>',
          dbRecord: db,
          analysis: 'The new value was applied cleanly without touching any omitted fields.'
        };
      }
    } else { // full_put
      if (payload === 'explicit_null' || payload === 'omitted') {
        db.title = "Advanced C#";
        db.summary = null;
        db.coverUrl = null;
        db.publishedYear = 0;
        return {
          status: '<span style="color:var(--info);">ℹ️ Standard HTTP PUT (Full Replacement)</span>',
          dbRecord: db,
          analysis: 'Under strict HTTP PUT semantics, the payload is a full replacement. Any fields not provided are expected to be replaced with defaults/null.'
        };
      } else {
        db.title = "C# Basics";
        db.summary = "A deep dive into C#";
        db.coverUrl = null;
        db.publishedYear = 0;
        return {
          status: '<span style="color:var(--info);">ℹ️ Standard HTTP PUT (Full Replacement)</span>',
          dbRecord: db,
          analysis: 'Under strict HTTP PUT semantics, omitted properties are replaced with default values.'
        };
      }
    }
  }

  // ---- Boot: hand data + behavior to the shared runtime ----
  document.addEventListener('DOMContentLoaded', () => {
    loadState();

    RaffContent.boot({
      moduleId: 'module-01',
      storageKey: STORAGE_KEY,
      lessons: MODULE_LESSONS,
      startId: 'lesson-0',

      state: {
        load: () => appState,
        save: () => saveState(),
        activeId: (s) => s.activeLesson,
        setActive: (s, id) => { s.activeLesson = id; },
        theme: (s) => s.theme,
        setTheme: (s, t) => { s.theme = t; },
        isDone: (s, id) => Array.isArray(s.completedLessons) && s.completedLessons.includes(id),
        toggleDone: (s, id) => {
          if (!Array.isArray(s.completedLessons)) s.completedLessons = [];
          const idx = s.completedLessons.indexOf(id);
          if (idx === -1) { s.completedLessons.push(id); return true; }
          s.completedLessons.splice(idx, 1);
          return false;
        },
        exportPayload: (s) => s,
        restore: (parsed, s) => {
          if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.completedLessons)) {
            throw new Error('Invalid progress file');
          }
          Object.keys(s).forEach(k => { delete s[k]; });
          Object.assign(s, {
            theme: 'dark',
            activeLesson: 'lesson-0',
            completedLessons: [],
            answers: {},
            assessment: { submitted: false, score: 0, answers: {} }
          }, parsed);
        },
        reset: (s) => {
          const keepTheme = document.documentElement.getAttribute('data-theme') || 'dark';
          const keepLesson = s.activeLesson || 'lesson-0';
          Object.keys(s).forEach(k => { delete s[k]; });
          Object.assign(s, {
            theme: keepTheme,
            activeLesson: keepLesson,
            completedLessons: [],
            answers: {},
            assessment: { submitted: false, score: 0, answers: {} }
          });
        }
      },

      progress: { compute: computeProgress },
      exportName: 'raff-aspnet-module-01-progress.json',
      exportStyle: 'dataurl',
      labels: { lessons: 'Units', checks: 'Checks answered' },
      messages: {
        exportToast: '💾 Progress exported successfully!',
        exportErrorToast: 'Export failed — progress could not be serialized.',
        importMode: 'file',
        importSuccessToast: '✅ Progress imported successfully!',
        importErrorToast: 'Malformed progress JSON file. Please supply a valid exported file.',
        resetToast: 'Progress has been reset.'
      },
      completeToast: (done, id) => (done
        ? `✓ Marked ${formatLessonName(id)} Complete!`
        : `Unmarked ${formatLessonName(id)}.`),

      copy: { feedback: true, colorFeedback: true, failToast: 'Failed to copy code to clipboard.' },

      search: {
        minChars: 1,
        hint: 'Type a keyword to search lessons and topics…',
        noMatch: 'No matching sections found.',
        items: SEARCH_INDEX.map(it => ({ target: it.id, title: it.title, snippet: it.snippet }))
      },

      glossary: {
        items: GLOSSARY_ITEMS_DATA,
        filtersMode: 'none',
        renderItem: (item) => `
          <div class="search-result-item">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div class="search-result-title">${item.term}</div>
              <span class="code-type-pill">${item.cat}</span>
            </div>
            <div class="search-result-snippet">${item.def}</div>
          </div>`
      },

      onReady: (ctx) => {
        courseCtx = ctx;
        initSimulators();
        bindKnowledgeChecks();
        renderQuizState();
        renderAssessment();
      },

      afterStateChange: () => {
        renderQuizState();
        renderAssessment();
      }
    });
  });

})();
