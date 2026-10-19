"use strict";

/* Module 02 page script — bespoke widgets only.
   Shared shell, navigation, progress, theme, search, glossary,
   export/import/reset, highlighting and copy buttons come from
   component/core/content.js (RaffContent). */

(function () {

  const showToast = (msg) => RaffUI.toast(msg);
  const escapeHtml = (str) => RaffUI.escapeHtml(str);

  let appState = {
    theme: 'dark',
    completedLessons: {},
    quizzes: {},
    assessment: { submitted: false, score: 0, answers: {} },
    passingThreshold: 80
  };

  let courseCtx = null;
  function notifyChange() { if (courseCtx) courseCtx.refresh(); }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        Object.assign(appState, parsed);
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  // ---- Progress reporting (labels rendered by the shared runtime) ----
  const LESSON_KEYS = ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5', 'lesson-6', 'lesson-7'];
  const ASSESSMENT_IDS = ['qa-1', 'qa-2', 'qa-3', 'qa-4', 'qa-5', 'qa-6', 'qa-7', 'qa-8', 'qa-9', 'qa-10', 'qa-11', 'qa-12'];

  function computeProgress() {
    let completedCount = 0;
    LESSON_KEYS.forEach(k => { if (appState.completedLessons[k]) completedCount++; });
    const pct = Math.round((completedCount / LESSON_KEYS.length) * 100);

    const totalChecks = Object.keys(QUESTIONS_DB).filter(id => ASSESSMENT_IDS.indexOf(id) === -1).length;
    const answered = Object.keys(appState.quizzes || {}).length;

    const threshLabel = document.getElementById('assessment-threshold-label');
    if (threshLabel) threshLabel.textContent = `${appState.passingThreshold || 80}%`;

    return {
      percent: pct,
      lessonsLabel: `${completedCount} / ${LESSON_KEYS.length} Lessons (${pct}%)`,
      checksLabel: `${answered} / ${totalChecks}`
    };
  }

  // ---- Change Tracker Simulator ----
  let simState = {
    step: 'detached',
    book: { id: 42, title: "Muqaddimah", publishedYear: 1377 },
    original: null,
    isModified: false,
    state: 'Detached'
  };

  function updateSimDisplay() {
    const stateBadge = document.getElementById('sim-state-display');
    const sqlDisplay = document.getElementById('sim-sql-display');
    const commentary = document.getElementById('sim-commentary');
    const tbody = document.getElementById('sim-props-tbody');

    stateBadge.textContent = simState.state;
    stateBadge.className = 'sim-state-badge badge-' + simState.state.toLowerCase();

    let origTitle = simState.original ? `"${simState.original.title}"` : '-';
    let origYear = simState.original ? simState.original.publishedYear : '-';

    tbody.innerHTML = `
      <tr><td>Id</td><td>${simState.original ? simState.original.id : '-'}</td><td>${simState.book.id}</td><td>False</td></tr>
      <tr><td>Title</td><td>${origTitle}</td><td>"${simState.book.title}"</td><td>${simState.isModified ? 'True' : 'False'}</td></tr>
      <tr><td>PublishedYear</td><td>${origYear}</td><td>${simState.book.publishedYear}</td><td>False</td></tr>
    `;

    if (simState.state === 'Detached') {
      sqlDisplay.textContent = '-- No pending database operation. Entity is Detached from context.';
    } else if (simState.state === 'Unchanged') {
      sqlDisplay.textContent = '-- No pending database operation. Current values match original snapshot.';
    } else if (simState.state === 'Added') {
      sqlDisplay.textContent = 'INSERT INTO "Books" ("Title", "PublishedYear")\nVALUES (@p0, @p1)\nRETURNING "Id";';
    } else if (simState.state === 'Modified') {
      sqlDisplay.textContent = 'UPDATE "Books" SET "Title" = @p0\nWHERE "Id" = @p1;';
    } else if (simState.state === 'Deleted') {
      sqlDisplay.textContent = 'DELETE FROM "Books"\nWHERE "Id" = @p0;';
    }
  }

  function initSimulator() {
    const commentary = document.getElementById('sim-commentary');

    document.getElementById('sim-btn-new').addEventListener('click', () => {
      simState = { step: 'new', book: { id: 42, title: "Muqaddimah", publishedYear: 1377 }, original: null, isModified: false, state: 'Detached' };
      commentary.innerHTML = '<strong>Action:</strong> <code>var book = new Book Ellipsis;</code> instantiated on the C# heap. EF Core is unaware of this instance.';
      updateSimDisplay();
    });

    document.getElementById('sim-btn-add').addEventListener('click', () => {
      simState.state = 'Added';
      simState.original = null;
      commentary.innerHTML = '<strong>Action:</strong> <code>context.Books.Add(book);</code> invoked. Entity is now tracked as <strong>Added</strong>. SaveChangesAsync() will generate an INSERT.';
      updateSimDisplay();
    });

    document.getElementById('sim-btn-query').addEventListener('click', () => {
      simState.state = 'Unchanged';
      simState.book = { id: 42, title: "Muqaddimah", publishedYear: 1377 };
      simState.original = { id: 42, title: "Muqaddimah", publishedYear: 1377 };
      simState.isModified = false;
      commentary.innerHTML = '<strong>Action:</strong> <code>await context.Books.FindAsync(42);</code> queried row from PostgreSQL. Entity enters ChangeTracker as <strong>Unchanged</strong> with a private snapshot copy.';
      updateSimDisplay();
    });

    document.getElementById('sim-btn-mutate').addEventListener('click', () => {
      simState.book.title = "Muqaddimah (Second Edition)";
      commentary.innerHTML = '<strong>Action:</strong> <code>book.Title = "Muqaddimah (Second Edition)";</code> mutated in C# RAM. Note: The ChangeTracker snapshot still has the old title, but DetectChanges has not run yet.';
      updateSimDisplay();
    });

    document.getElementById('sim-btn-detect').addEventListener('click', () => {
      if (simState.original && simState.book.title !== simState.original.title) {
        simState.isModified = true;
        simState.state = 'Modified';
        commentary.innerHTML = '<strong>Action:</strong> <code>context.ChangeTracker.DetectChanges();</code> compared C# properties with snapshot. Discovered title difference! State updated to <strong>Modified</strong>.';
      } else {
        commentary.innerHTML = '<strong>Action:</strong> <code>DetectChanges();</code> ran, but no differences were found between current properties and original snapshot.';
      }
      updateSimDisplay();
    });

    document.getElementById('sim-btn-remove').addEventListener('click', () => {
      simState.state = 'Deleted';
      commentary.innerHTML = '<strong>Action:</strong> <code>context.Books.Remove(book);</code> marked entity state as <strong>Deleted</strong>. SaveChangesAsync() will generate a DELETE statement targeting primary key 42.';
      updateSimDisplay();
    });

    document.getElementById('sim-btn-save').addEventListener('click', () => {
      if (simState.state === 'Added' || simState.state === 'Modified') {
        simState.original = Object.assign({}, simState.book);
        simState.state = 'Unchanged';
        simState.isModified = false;
        commentary.innerHTML = '<strong>Action:</strong> <code>await context.SaveChangesAsync();</code> committed successfully! Entity state reset to <strong>Unchanged</strong>, and new snapshot was recorded.';
      } else if (simState.state === 'Deleted') {
        simState.state = 'Detached';
        simState.original = null;
        commentary.innerHTML = '<strong>Action:</strong> <code>await context.SaveChangesAsync();</code> executed DELETE. Row removed from database; entity transitioned to <strong>Detached</strong>.';
      } else {
        commentary.innerHTML = '<strong>Action:</strong> <code>await context.SaveChangesAsync();</code> detected 0 changes. 0 SQL commands sent.';
      }
      updateSimDisplay();
    });

    document.getElementById('sim-btn-reset').addEventListener('click', () => {
      simState = { step: 'new', book: { id: 42, title: "Muqaddimah", publishedYear: 1377 }, original: null, isModified: false, state: 'Detached' };
      commentary.innerHTML = 'Simulator reset to initial Detached state.';
      updateSimDisplay();
    });

    updateSimDisplay();
  }

  // ---- Query Pipeline Playground ----
  function runQueryPipeline() {
    const yearFilter = document.getElementById('play-filter-year').value;
    const orderBy = document.getElementById('play-order-by').value;
    const projection = document.getElementById('play-projection').value;
    const clientFilter = document.getElementById('play-client-filter').value;

    let filtered = [...RAFF_SAMPLE_BOOKS];
    let sqlWhere = '';
    let sqlOrder = '';
    let sqlCols = (projection === 'dto') ? '"b"."Id", "b"."Title", "b"."PublishedYear"' : '"b"."Id", "b"."Title", "b"."PublishedYear", "b"."Summary", "b"."CoverUrl"';

    if (yearFilter === 'modern') {
      filtered = filtered.filter(b => b.publishedYear >= 1950);
      sqlWhere = ' WHERE "b"."PublishedYear" >= 1950';
    } else if (yearFilter === 'contemporary') {
      filtered = filtered.filter(b => b.publishedYear >= 2000);
      sqlWhere = ' WHERE "b"."PublishedYear" >= 2000';
    } else if (yearFilter === 'classic') {
      filtered = filtered.filter(b => b.publishedYear < 1950);
      sqlWhere = ' WHERE "b"."PublishedYear" < 1950';
    }

    if (orderBy === 'title_asc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      sqlOrder = ' ORDER BY "b"."Title"';
    } else if (orderBy === 'year_desc') {
      filtered.sort((a, b) => b.publishedYear - a.publishedYear);
      sqlOrder = ' ORDER BY "b"."PublishedYear" DESC';
    }

    const generatedSql = `SELECT ${sqlCols}\nFROM "Books" AS "b"${sqlWhere}${sqlOrder};`;
    document.getElementById('play-sql-box').textContent = generatedSql;

    const badgesContainer = document.getElementById('play-pipeline-badges');
    let badgesHtml = '';
    if (sqlWhere) badgesHtml += '<span class="badge badge-server">Server: IQueryable.Where()</span> ';
    badgesHtml += '<span class="badge badge-server">Server: IQueryable.OrderBy()</span> ';
    if (projection === 'dto') badgesHtml += '<span class="badge badge-server">Server: IQueryable.Select(DTO)</span> ';
    badgesHtml += '<span class="badge badge-execution">Terminal: await ToListAsync()</span> ';

    if (clientFilter === 'client_search') {
      badgesHtml += '<span class="badge badge-client">Client: In-Memory .Where(Title has "a")</span>';
      filtered = filtered.filter(b => b.title.toLowerCase().includes('a'));
    }
    badgesContainer.innerHTML = badgesHtml;

    const tbody = document.getElementById('play-table-body');
    const thead = document.getElementById('play-table-head');
    document.getElementById('play-result-count').textContent = filtered.length;

    if (projection === 'dto') {
      thead.innerHTML = '<th>Id</th><th>Title</th><th>PublishedYear</th>';
      tbody.innerHTML = filtered.map(b => `<tr><td>${b.id}</td><td><strong>${b.title}</strong></td><td>${b.publishedYear}</td></tr>`).join('');
    } else {
      thead.innerHTML = '<th>Id</th><th>Title</th><th>PublishedYear</th><th>Summary</th>';
      tbody.innerHTML = filtered.map(b => `<tr><td>${b.id}</td><td><strong>${b.title}</strong></td><td>${b.publishedYear}</td><td style="color:var(--text-muted); font-size:0.78rem;">${b.summary}</td></tr>`).join('');
    }
  }

  function initQueryPlayground() {
    document.getElementById('play-btn-run').addEventListener('click', runQueryPipeline);
    ['play-filter-year', 'play-order-by', 'play-projection', 'play-client-filter'].forEach(id => {
      document.getElementById(id).addEventListener('change', runQueryPipeline);
    });
    runQueryPipeline();
  }

  // ---- Knowledge Checks ----
  function quizGroups() {
    return Array.prototype.slice.call(document.querySelectorAll('.quiz-options:not(.assessment-group)'));
  }

  function bindKnowledgeChecks() {
    quizGroups().forEach(group => {
      group.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', () => {
          group.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
        });
      });
    });

    document.querySelectorAll('.btn-submit-quiz').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const group = document.querySelector(`.quiz-options[data-qid="${qid}"]`);
        const selected = group.querySelector('.quiz-option.selected');
        const feedback = document.getElementById(`feedback-${qid}`);

        if (!selected) {
          showToast('Please select an option first.');
          return;
        }

        const selectedIdx = parseInt(selected.getAttribute('data-opt'), 10);
        const qData = QUESTIONS_DB[qid];
        const isCorrect = (selectedIdx === qData.correct);

        group.querySelectorAll('.quiz-option').forEach((opt, idx) => {
          if (idx === qData.correct) opt.classList.add('correct');
          else if (idx === selectedIdx && !isCorrect) opt.classList.add('incorrect');
        });

        feedback.className = isCorrect ? 'quiz-feedback success' : 'quiz-feedback error';
        feedback.innerHTML = `<strong>${isCorrect ? '✓ Correct!' : '✗ Not quite.'}</strong> ${qData.exp}`;

        btn.style.display = 'none';
        const retryBtn = document.querySelector(`.btn-retry-quiz[data-qid="${qid}"]`);
        if (retryBtn) retryBtn.style.display = 'inline-block';

        appState.quizzes[qid] = { selected: selectedIdx, correct: isCorrect };
        saveState();
        notifyChange();
      });
    });

    document.querySelectorAll('.btn-retry-quiz').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const group = document.querySelector(`.quiz-options[data-qid="${qid}"]`);
        group.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected', 'correct', 'incorrect'));
        const feedback = document.getElementById(`feedback-${qid}`);
        feedback.style.display = 'none';

        btn.style.display = 'none';
        const submitBtn = document.querySelector(`.btn-submit-quiz[data-qid="${qid}"]`);
        if (submitBtn) submitBtn.style.display = 'inline-block';
      });
    });
  }

  function renderQuizState() {
    quizGroups().forEach(group => {
      group.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected', 'correct', 'incorrect'));
      const qid = group.getAttribute('data-qid');
      const feedback = document.getElementById(`feedback-${qid}`);
      if (feedback) { feedback.style.display = 'none'; feedback.className = 'quiz-feedback'; }
      const submitBtn = document.querySelector(`.btn-submit-quiz[data-qid="${qid}"]`);
      if (submitBtn) submitBtn.style.display = 'inline-block';
      const retryBtn = document.querySelector(`.btn-retry-quiz[data-qid="${qid}"]`);
      if (retryBtn) retryBtn.style.display = 'none';
    });

    for (const [qid, qRes] of Object.entries(appState.quizzes || {})) {
      const group = document.querySelector(`.quiz-options[data-qid="${qid}"]`);
      if (!group) continue;
      const opt = group.querySelector(`.quiz-option[data-opt="${qRes.selected}"]`);
      if (opt) opt.classList.add('selected');
      const qData = QUESTIONS_DB[qid];
      if (qData) {
        group.querySelectorAll('.quiz-option').forEach((o, idx) => {
          if (idx === qData.correct) o.classList.add('correct');
          else if (idx === qRes.selected && !qRes.correct) o.classList.add('incorrect');
        });
        const feedback = document.getElementById(`feedback-${qid}`);
        if (feedback) {
          feedback.className = qRes.correct ? 'quiz-feedback success' : 'quiz-feedback error';
          feedback.innerHTML = `<strong>${qRes.correct ? '✓ Correct!' : '✗ Not quite.'}</strong> ${qData.exp}`;
        }
        const submitBtn = document.querySelector(`.btn-submit-quiz[data-qid="${qid}"]`);
        if (submitBtn) submitBtn.style.display = 'none';
        const retryBtn = document.querySelector(`.btn-retry-quiz[data-qid="${qid}"]`);
        if (retryBtn) retryBtn.style.display = 'inline-block';
      }
    }
  }

  // ---- Final Assessment ----
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
              <span class="exercise-badge">Assessment Scenario #${idx + 1}</span>
              <span style="font-weight:600; font-size:0.9rem;">${q.topic}</span>
            </div>
          </div>
          <div class="exercise-body">
            <div class="exercise-prompt">${q.prompt.replace(/\n/g, '<br>')}</div>
            <div class="quiz-options assessment-group" data-qid="${id}">
              ${q.opts.map((opt, i) => `
                <div class="quiz-option" data-opt="${i}">
                  <div class="option-indicator">${String.fromCharCode(65 + i)}</div>
                  <div class="option-text">${escapeHtml(opt)}</div>
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
        const group = opt.closest('.quiz-options');
        group.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });

    const submitBtn = document.getElementById('btn-submit-final-assessment');
    if (submitBtn && !submitBtn.dataset.bound) {
      submitBtn.dataset.bound = 'true';
      submitBtn.addEventListener('click', gradeAssessment);
    }

    const resBox = document.getElementById('assessment-results');
    if (appState.assessment && appState.assessment.submitted) {
      renderAssessmentResults();
    } else {
      if (resBox) resBox.style.display = 'none';
      if (submitBtn) submitBtn.style.display = '';
    }
  }

  function gradeAssessment() {
    let correct = 0;
    let unanswered = 0;
    const answers = {};

    ASSESSMENT_IDS.forEach(id => {
      const group = document.querySelector(`.quiz-options[data-qid="${id}"]`);
      const sel = group.querySelector('.quiz-option.selected');
      if (!sel) {
        unanswered++;
      } else {
        const optIdx = parseInt(sel.getAttribute('data-opt'), 10);
        const isCorr = (optIdx === QUESTIONS_DB[id].correct);
        if (isCorr) correct++;
        answers[id] = { selected: optIdx, correct: isCorr };
      }
    });

    if (unanswered > 0) {
      showToast(`⚠️ Please answer all questions (${unanswered} remaining).`);
      return;
    }

    const score = Math.round((correct / ASSESSMENT_IDS.length) * 100);
    appState.assessment = { submitted: true, score, answers };
    saveState();
    notifyChange();
    renderAssessmentResults();
  }

  function renderAssessmentResults() {
    const resBox = document.getElementById('assessment-results');
    const submitBtn = document.getElementById('btn-submit-final-assessment');
    if (!resBox) return;

    if (submitBtn) submitBtn.style.display = 'none';
    const score = appState.assessment.score;
    const threshold = appState.passingThreshold || 80;
    const passed = (score >= threshold);

    for (const [qid, ans] of Object.entries(appState.assessment.answers)) {
      const group = document.querySelector(`.quiz-options[data-qid="${qid}"]`);
      const qData = QUESTIONS_DB[qid];
      if (group && qData) {
        group.querySelectorAll('.quiz-option').forEach((opt, idx) => {
          if (idx === qData.correct) opt.classList.add('correct');
          else if (idx === ans.selected && !ans.correct) opt.classList.add('incorrect');
        });
        const fb = document.getElementById(`feedback-${qid}`);
        if (fb) {
          fb.className = ans.correct ? 'quiz-feedback success' : 'quiz-feedback error';
          fb.innerHTML = `<strong>${ans.correct ? '✓ Correct!' : '✗ Review Recommended.'}</strong> ${qData.exp}`;
        }
      }
    }

    const topics = {};
    for (const [qid, ans] of Object.entries(appState.assessment.answers)) {
      const top = QUESTIONS_DB[qid].topic;
      if (!topics[top]) topics[top] = { total: 0, correct: 0 };
      topics[top].total++;
      if (ans.correct) topics[top].correct++;
    }

    let diagnosticRows = '';
    for (const [top, stats] of Object.entries(topics)) {
      const topPct = Math.round((stats.correct / stats.total) * 100);
      diagnosticRows += `
        <tr>
          <td><strong>${top}</strong></td>
          <td>${stats.correct} / ${stats.total}</td>
          <td><span class="badge" style="background:${topPct >= 80 ? 'var(--success-bg)' : 'var(--danger-bg)'}; color:${topPct >= 80 ? 'var(--success)' : 'var(--danger)'}">${topPct}%</span></td>
        </tr>
      `;
    }

    resBox.innerHTML = `
      <div class="content-panel" style="border: 2px solid ${passed ? 'var(--success)' : 'var(--danger)'};">
        <div style="text-align:center; padding:1.5rem 0;">
          <div style="font-size:3rem; font-weight:900; color:${passed ? 'var(--success)' : 'var(--danger)'}">${score}%</div>
          <h2 style="border:none; margin:0.5rem 0;">${passed ? '🎉 Module 2 Mastered!' : '📚 Additional Study Recommended'}</h2>
          <p>${passed ? `Congratulations! You scored above the ${threshold}% passing threshold, demonstrating strong command of EF Core internals.` : `You scored below the configured ${threshold}% threshold. Review the diagnostic breakdown below and revisit recommended lessons.`}</p>
        </div>

        <h3>Diagnostic Skill Breakdown</h3>
        <table class="concept-table">
          <thead>
            <tr><th>Core Competency</th><th>Score</th><th>Mastery</th></tr>
          </thead>
          <tbody>
            ${diagnosticRows}
          </tbody>
        </table>

        <div style="margin-top:1.5rem; display:flex; justify-content:center; gap:1rem;">
          <button class="btn-secondary" id="btn-retake-assessment">↺ Retake Assessment</button>
          <button class="btn-secondary" id="btn-open-threshold-config">⚙️ Change Passing Threshold</button>
        </div>
      </div>
    `;
    resBox.style.display = 'block';

    document.getElementById('btn-retake-assessment').addEventListener('click', () => {
      appState.assessment = { submitted: false, score: 0, answers: {} };
      saveState();
      renderAssessment();
      notifyChange();
    });

    document.getElementById('btn-open-threshold-config').addEventListener('click', () => {
      RaffUI.openModal('config-threshold-modal');
    });

    resBox.scrollIntoView({ behavior: 'smooth' });
  }

  // ---- Threshold Configuration ----
  function initThresholdConfig() {
    const slider = document.getElementById('threshold-slider');
    const valLabel = document.getElementById('threshold-slider-val');
    const saveBtn = document.getElementById('btn-save-threshold');

    if (slider && valLabel && saveBtn) {
      slider.value = appState.passingThreshold || 80;
      valLabel.textContent = `${slider.value}%`;

      slider.addEventListener('input', () => {
        valLabel.textContent = `${slider.value}%`;
      });

      saveBtn.addEventListener('click', () => {
        appState.passingThreshold = parseInt(slider.value, 10);
        saveState();
        RaffUI.closeModal('config-threshold-modal');
        showToast(`Passing threshold updated to ${appState.passingThreshold}%!`);
        notifyChange();
        if (appState.assessment && appState.assessment.submitted) {
          renderAssessmentResults();
        }
      });
    }
  }

  // ---- Module-specific modal(s) ----
  const EXTRA_MODALS = `
  <div class="modal-overlay" id="config-threshold-modal" role="dialog" aria-modal="true" aria-labelledby="config-threshold-title">
    <div class="modal-dialog" style="max-width:440px;">
      <div class="modal-header">
        <div class="modal-title" id="config-threshold-title">⚙️ Assessment Passing Threshold</div>
        <button class="btn-icon" data-close-modal="config-threshold-modal" type="button" aria-label="Close">✕</button>
      </div>
      <div class="modal-body">
        <p style="margin-bottom:1rem; font-size:0.9rem;">Adjust your desired passing score threshold for the final assessment (defaults to 80%):</p>
        <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem;">
          <input type="range" id="threshold-slider" min="50" max="100" step="5" value="80" style="flex:1;">
          <strong id="threshold-slider-val" style="font-size:1.2rem; color:var(--accent-light);">80%</strong>
        </div>
        <div style="display:flex; justify-content:flex-end; gap:0.75rem;">
          <button class="btn-secondary" data-close-modal="config-threshold-modal" type="button">Cancel</button>
          <button class="btn-primary" id="btn-save-threshold" type="button">Save Setting</button>
        </div>
      </div>
    </div>
  </div>`;

  // ---- Boot: hand data + behavior to the shared runtime ----
  document.addEventListener('DOMContentLoaded', () => {
    loadState();

    RaffContent.boot({
      moduleId: 'module-02',
      storageKey: STORAGE_KEY,
      lessons: MODULE_LESSONS,
      startId: 'lesson-0',

      state: {
        load: () => appState,
        save: () => saveState(),
        activeId: () => null,
        setActive: () => {},
        theme: (s) => s.theme,
        setTheme: (s, t) => { s.theme = t; },
        isDone: (s, id) => !!(s.completedLessons && s.completedLessons[id]),
        toggleDone: (s, id) => {
          s.completedLessons = s.completedLessons || {};
          if (s.completedLessons[id]) { delete s.completedLessons[id]; return false; }
          s.completedLessons[id] = true;
          return true;
        },
        exportPayload: (s) => s,
        restore: (parsed, s) => {
          if (!parsed || typeof parsed !== 'object') throw new Error('Invalid progress file');
          Object.keys(s).forEach(k => { delete s[k]; });
          Object.assign(s, {
            theme: 'dark',
            completedLessons: {},
            quizzes: {},
            assessment: { submitted: false, score: 0, answers: {} },
            passingThreshold: 80
          }, parsed);
        },
        reset: (s) => {
          const keepTheme = document.documentElement.getAttribute('data-theme') || 'dark';
          Object.keys(s).forEach(k => { delete s[k]; });
          Object.assign(s, {
            theme: keepTheme,
            completedLessons: {},
            quizzes: {},
            assessment: { submitted: false, score: 0, answers: {} },
            passingThreshold: 80
          });
        }
      },

      progress: { compute: computeProgress },
      exportName: 'raff_efcore_module_02_progress.json',
      exportStyle: 'dataurl',
      labels: { lessons: 'Lessons', checks: 'Checks answered' },
      messages: {
        exportToast: 'Progress exported to JSON!',
        exportErrorToast: 'Export failed — progress could not be serialized.',
        importMode: 'textarea',
        importSuccessToast: 'Progress successfully restored!',
        importErrorToast: '❌ Malformed JSON. Please check the file.',
        resetToast: 'All progress reset.'
      },
      completeToast: (done) => (done ? 'Lesson marked complete! 🎉' : 'Lesson unmarked.'),

      copy: { feedback: true, colorFeedback: false, failToast: 'Failed to copy code to clipboard.' },

      search: {
        minChars: 1,
        hint: '',
        noMatch: 'No matching sections found.',
        items: SEARCH_INDEX.map(it => ({ target: it.id, title: it.title, snippet: it.snippet }))
      },

      glossary: {
        items: GLOSSARY_ITEMS_DATA,
        filtersMode: 'static',
        initialCat: 'all',
        renderItem: (item) => `
          <div class="glossary-term-item">
            <div class="glossary-term-name">
              <span>${escapeHtml(item.term)}</span>
              <span class="glossary-term-cat">${escapeHtml(item.cat)}</span>
            </div>
            <div class="glossary-term-def">${item.def}</div>
          </div>`
      },

      extraModalsHtml: EXTRA_MODALS,

      onReady: (ctx) => {
        courseCtx = ctx;
        window.switchLesson = (id) => courseCtx.showLesson(id);
        initSimulator();
        initQueryPlayground();
        bindKnowledgeChecks();
        renderQuizState();
        renderAssessment();
        initThresholdConfig();
      },

      afterStateChange: () => {
        renderQuizState();
        renderAssessment();
      }
    });
  });

})();
