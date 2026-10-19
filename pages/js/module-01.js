"use strict";

/* Module 01 page script — bespoke widgets only.
   Shared shell, navigation, progress, theme, search, glossary,
   export/import/reset, highlighting and copy buttons come from
   component/core/content.js (RaffContent). */

(function () {

  const showToast = (msg) => RaffUI.toast(msg);

  const S = RaffI18n.pick({
    en: {
      overview: 'Overview',
      lesson: (n) => `Lesson ${n}`,
      completedBadge: '✓ Lesson Completed',
      markComplete: '<span class="complete-checkbox">✓</span> Mark Lesson Complete',
      unitsLabel: (done, total, pct) => `${done} / ${total} units (${pct}%)`,
      checksLabel: (answered, total) => `${answered} / ${total}`,
      selectAnswer: '⚠️ Please select an answer before submitting.',
      correctHeadline: '✅ Excellent! Correct.',
      incorrectHeadline: '❌ Not quite correct.',
      assessmentBadge: (n) => `Assessment Q${n}`,
      unansweredWarn: (n) => `⚠️ Please answer all questions (${n} unanswered).`,
      submittedToast: (score) => `Assessment submitted! Score: ${score}%`,
      reviewRecommended: 'Review Recommended',
      mastered: 'Mastered ✓',
      passedHeadline: '🎉 Congratulations, Mohammed! Module 1 Mastered.',
      failedHeadline: '📚 Good Effort! Further Review Recommended.',
      passedSubtext: 'You have demonstrated a comprehensive understanding of ASP.NET Core HTTP architecture, routing, model binding, DTO contracts, and partial update semantics.',
      failedSubtext: 'You scored below the 80% passing threshold. Inspect the topic breakdown below and revisit the recommended lessons before re-taking.',
      thTopic: 'Curriculum Topic',
      thScore: 'Score',
      thAccuracy: 'Accuracy',
      thStatus: 'Status',
      retake: '🔄 Reset &amp; Retake Assessment',
      nodes: {
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
      },
      routes: {
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
      },
      sim: {
        bugSilent: '<span style="color:var(--danger);">❌ BUG OCCURRED: Silent Update Failure</span>',
        worked: '<span style="color:var(--success);">✅ Worked as Expected</span>',
        efTrap: '<span style="color:var(--danger);">🚨 CATASTROPHIC DATA LOSS: EF Core Update() Trap</span>',
        presenceOk: '<span style="color:var(--success);">✅ PERFECT EXECUTION: Presence Tracking Succeeded</span>',
        omittedOk: '<span style="color:var(--success);">✅ PERFECT EXECUTION: Omitted Field Preserved</span>',
        perfect: '<span style="color:var(--success);">✅ PERFECT EXECUTION</span>',
        put: '<span style="color:var(--info);">ℹ️ Standard HTTP PUT (Full Replacement)</span>',
        naiveNull: '<strong>Why it failed:</strong> The client explicitly sent <code>"summary": null</code> intending to clear the summary. However, Raff\'s check <code>if (dto.summary is not null)</code> evaluated to false! The summary was <em>never cleared</em> and remained "An introduction to C#".',
        naiveOmitted: 'The title was updated and the summary was preserved. However, this only worked by accident because the omitted property deserialized to null.',
        naiveSummary: 'The new string was not null, so the update completed successfully.',
        efLoss: '<strong>What went wrong:</strong> Calling <code>context.Books.Update(book)</code> marked every single property as Modified. Because <code>coverUrl</code> was not in the DTO, it defaulted to null; <code>publishedYear</code> defaulted to 0. Valid existing columns were completely overwritten in PostgreSQL!',
        efPartial: 'The summary was updated, but omitted fields (coverUrl, publishedYear) were overwritten with null and 0 in the database!',
        presenceNull: '<strong>Why it succeeded:</strong> <code>Optional&lt;T&gt;</code> detected that <code>summary</code> was explicitly present in the JSON payload (<code>IsSpecified == true</code>). The application set <code>book.Summary = null</code>, successfully clearing the field in PostgreSQL!',
        presenceOmitted: '<code>summary.IsSpecified</code> was false, so the service did not touch <code>book.Summary</code>. The existing database value was safely preserved.',
        presenceApplied: 'The new value was applied cleanly without touching any omitted fields.',
        putStrict: 'Under strict HTTP PUT semantics, the payload is a full replacement. Any fields not provided are expected to be replaced with defaults/null.',
        putOmitted: 'Under strict HTTP PUT semantics, omitted properties are replaced with default values.'
      },
      units: 'Units',
      checks: 'Checks answered',
      exportToast: '💾 Progress exported successfully!',
      exportErrorToast: 'Export failed — progress could not be serialized.',
      importSuccessToast: '✅ Progress imported successfully!',
      importErrorToast: 'Malformed progress JSON file. Please supply a valid exported file.',
      resetToast: 'Progress has been reset.',
      markedComplete: (name) => `✓ Marked ${name} Complete!`,
      unmarked: (name) => `Unmarked ${name}.`,
      copyFailToast: 'Failed to copy code to clipboard.',
      searchHint: 'Type a keyword to search lessons and topics…',
      searchNoMatch: 'No matching sections found.'
    },
    ar: {
      overview: 'نظرة عامة',
      lesson: (n) => `الدرس ${n}`,
      completedBadge: '✓ الدرس مكتمل',
      markComplete: '<span class="complete-checkbox">✓</span> تحديد الدرس كمكتمل',
      unitsLabel: (done, total, pct) => `${done} / ${total} وحدات (${pct}%)`,
      checksLabel: (answered, total) => `${answered} / ${total}`,
      selectAnswer: '⚠️ الرجاء اختيار إجابة قبل الإرسال.',
      correctHeadline: '✅ ممتاز! الإجابة صحيحة.',
      incorrectHeadline: '❌ ليست الإجابة الصحيحة.',
      assessmentBadge: (n) => `سؤال التقييم ${n}`,
      unansweredWarn: (n) => {
        const q = n === 1 ? 'سؤال واحد بدون إجابة' : (n === 2 ? 'سؤالان بدون إجابة' : (n <= 10 ? n + ' أسئلة بدون إجابة' : n + ' سؤالًا بدون إجابة'));
        return `⚠️ الرجاء الإجابة عن جميع الأسئلة (${q}).`;
      },
      submittedToast: (score) => `تم إرسال التقييم! النتيجة: ${score}%`,
      reviewRecommended: 'يُنصح بالمراجعة',
      mastered: 'متقَن ✓',
      passedHeadline: '🎉 مبروك يا محمد! أتممت الوحدة الأولى بإتقان.',
      failedHeadline: '📚 محاولة جيدة! يُوصى بمراجعة إضافية.',
      passedSubtext: 'أظهرت فهمًا شاملًا لمعمارية HTTP في ASP.NET Core، والتوجيه، وربط النماذج، وعقود كائنات نقل البيانات (DTO)، ودلالات التحديث الجزئي.',
      failedSubtext: 'نتيجتك أقل من حد النجاح (80%). راجع تفصيل المواضيع أدناه، وأعد زيارة الدروس الموصى بها قبل إعادة المحاولة.',
      thTopic: 'موضوع المنهج',
      thScore: 'النتيجة',
      thAccuracy: 'الدقة',
      thStatus: 'الحالة',
      retake: '🔄 إعادة تعيين التقييم وإجرائه من جديد',
      nodes: {
        client: {
          title: '📱 تطبيق العميل (واجهة أمامية / جوّال)',
          desc: 'يُنشئ اتصال TCP/TLS ويرسل طلب HTTP الخام عبر الشبكة.',
          input: 'إجراء المستخدم (مثل إرسال نموذج كتاب جديد)',
          duty: 'تكوين JSON صالح والالتزام بأعراف REST في HTTP',
          raff: 'تطبيق Flutter الجوّال يرسل POST /api/books بحمولة JSON'
        },
        kestrel: {
          title: '⚡ خادم الويب Kestrel',
          desc: 'خادم الويب الأصلي عالي الأداء ومتعدد المنصات في ASP.NET Core. يستمع على مقابس TCP ويفكّك بروتوكول HTTP.',
          input: 'حزم بايتات خام من المقبس الشبكي',
          duty: 'فكّ بروتوكول HTTP/1.1 وHTTP/2 وHTTP/3، وإنهاء TLS، وبناء HttpContext الأولي',
          raff: 'يُخصّص HttpContext ويستدعي أول تفويض (delegate) في Program.cs'
        },
        middleware: {
          title: '⚙️ خط أنابيب الوسائط والتوجيه',
          desc: 'خط أنابيب ثنائي الاتجاه من التفويضات يُهيأ في Program.cs، ويتولى الاهتمامات الشاملة قبل التوزيع إلى المتحكمات.',
          input: 'HttpContext خام أنشأه Kestrel',
          duty: 'معالجة الاستثناءات، وإعادة التوجيه إلى TLS، وCORS، والمصادقة، والتفويض، وتوجيه نقاط النهاية',
          raff: 'يطابق UseRouting الطلب POST /api/books مع BookController.Add'
        },
        controller: {
          title: '🎯 المتحكم والإجراء (BookController)',
          desc: 'نقطة دخول HTTP. يفكّ ربط النماذج المعاملات، ويتحقق من ModelState، وينفّذ منطق الإجراء.',
          input: 'HttpContext الموجَّه ومعاملات الإجراء المفكوكة',
          duty: 'تكييف نقل HTTP، وردود التحقق من المدخلات، واستدعاء خدمات التطبيق، وإرجاع رموز الحالة',
          raff: 'يستدعي _bookService.CreateBookAsync(dto) ويُرجع CreatedAtAction ‏(201 Created)'
        },
        service: {
          title: '📦 خدمة التطبيق (BookService)',
          desc: 'طبقة منطق أعمال خالصة ومنفصلة تمامًا عن مفاهيم HTTP (لا HttpContext ولا IActionResult).',
          input: 'كائنات DTO قوية الأنواع (مثل CreateBookRequest)',
          duty: 'فرض ثوابت النطاق، وحدود المعاملات، وتحويل الكيانات',
          raff: 'يحوّل CreateBookRequest إلى كيان Book ويستدعي context.Books.Add'
        },
        database: {
          title: '🗄️ سياق EF Core وقاعدة PostgreSQL',
          desc: 'يترجم تعبيرات LINQ إلى استعلامات SQL، وينفّذها على PostgreSQL، ويتتبّع تغيّرات حالة الكيانات.',
          input: 'استعلامات LINQ ونسخ الكيانات',
          duty: 'الحفظ العلائقي، وسلامة المخطط، وتثبيت معاملات قاعدة البيانات',
          raff: 'ينفّذ INSERT INTO books ... ويثبّت سجل الكتاب الجديد'
        }
      },
      routes: {
        '/api/books/featured': {
          result: 'تطابق: نقطة النهاية A ‏(GetFeatured)',
          reason: 'المقاطع الحرفية تسبق رموز المعاملات دائمًا! شجرة توجيه ASP.NET Core تتفرّع فورًا إلى تطابق "featured" الحرفي دون اختبار قيود المعاملات.'
        },
        '/api/books/101': {
          result: 'تطابق: نقطة النهاية B ‏(GetById - {id:int})',
          reason: 'المعاملات المقيَّدة ({id:int}) لها أسبقية أعلى من المعاملات غير المقيَّدة ({slug}). ولأن "101" يفي بقيود العدد الصحيح، تُختار نقطة النهاية B.'
        },
        '/api/books/arabic-classics': {
          result: 'تطابق: نقطة النهاية C ‏(GetBySlug - {slug})',
          reason: 'يفشل "arabic-classics" في اجتياز قيد :int الخاص بنقطة النهاية B فتُرفض، وحينها يلتقط المعامل غير المقيَّد {slug} في نقطة النهاية C القيمة النصية بنجاح!'
        }
      },
      sim: {
        bugSilent: '<span style="color:var(--danger);">❌ حدث خطأ: فشل تحديث صامت</span>',
        worked: '<span style="color:var(--success);">✅ نجح كما هو متوقع</span>',
        efTrap: '<span style="color:var(--danger);">🚨 خسارة بيانات كارثية: فخ Update() في EF Core</span>',
        presenceOk: '<span style="color:var(--success);">✅ تنفيذ مثالي: نجح تتبّع الوجود</span>',
        omittedOk: '<span style="color:var(--success);">✅ تنفيذ مثالي: حُفظ الحقل المُغفَل</span>',
        perfect: '<span style="color:var(--success);">✅ تنفيذ مثالي</span>',
        put: '<span style="color:var(--info);">ℹ️ PUT القياسي في HTTP (استبدال كامل)</span>',
        naiveNull: '<strong>لماذا فشل:</strong> أرسل العميل صراحةً <code>"summary": null</code> بنيّة مسح الملخص، لكن فحص Raff ‏<code>if (dto.summary is not null)</code> قُيِّم إلى false! فلم يُمسح الملخص <em>أبدًا</em> وظل "An introduction to C#".',
        naiveOmitted: 'حُدِّث العنوان وبقي الملخص محفوظًا، لكن هذا نجح بالمصادفة فقط لأن الخاصية المُغفَلة أُسند إليها null عند فك التسلسل.',
        naiveSummary: 'القيمة النصية الجديدة لم تكن null، فاكتمل التحديث بنجاح.',
        efLoss: '<strong>ما الذي حدث:</strong> استدعاء <code>context.Books.Update(book)</code> وسم كل خصائص الكيان كمعدَّلة. ولأن <code>coverUrl</code> لم يكن ضمن DTO أُسند إليه null افتراضيًا، وأصبح <code>publishedYear</code> صفرًا، فطُمست أعمدة قائمة صالحة بالكامل في PostgreSQL!',
        efPartial: 'حُدِّث الملخص، لكن الحقول المُغفَلة (coverUrl وpublishedYear) طُمست إلى null و0 في قاعدة البيانات!',
        presenceNull: '<strong>لماذا نجح:</strong> كشف <code>Optional&lt;T&gt;</code> أن <code>summary</code> موجود صراحةً في حمولة JSON ‏(<code>IsSpecified == true</code>)، فأسند التطبيق <code>book.Summary = null</code> ومسح الحقل بنجاح في PostgreSQL!',
        presenceOmitted: 'كانت <code>summary.IsSpecified</code> بقيمة false، فلم تلمس الخدمة <code>book.Summary</code>، وحُفظت قيمة قاعدة البيانات القائمة بأمان.',
        presenceApplied: 'طُبّقت القيمة الجديدة بسلاسة دون المساس بأي من الحقول المُغفَلة.',
        putStrict: 'بموجب دلالات PUT الصارمة في HTTP تُعدّ الحمولة استبدالًا كاملًا، ويُتوقع استبدال أي حقول غير مقدَّمة بالقيم الافتراضية أو null.',
        putOmitted: 'بموجب دلالات PUT الصارمة تُستبدل الخصائص المُغفَلة بالقيم الافتراضية.'
      },
      units: 'الوحدات',
      checks: 'الاختبارات المُجابة',
      exportToast: '💾 تم تصدير التقدّم بنجاح!',
      exportErrorToast: 'فشل التصدير — تعذّر تسلسل بيانات التقدّم.',
      importSuccessToast: '✅ تم استيراد التقدّم بنجاح!',
      importErrorToast: 'ملف تقدّم JSON غير صالح. الرجاء استخدام ملف تم تصديره من النظام.',
      resetToast: 'تمت إعادة تعيين التقدّم.',
      markedComplete: (name) => `✓ تم تحديد ${name} كمكتمل!`,
      unmarked: (name) => `أُلغي تحديد ${name}.`,
      copyFailToast: 'تعذّر نسخ الكود إلى الحافظة.',
      searchHint: 'اكتب كلمة مفتاحية للبحث في الدروس والمواضيع…',
      searchNoMatch: 'لا توجد أقسام مطابقة.'
    }
  });

  /* Arabic content overlays (data/module-01.ar.js). English fallback when absent. */
  const OV = (RaffI18n.get() === 'ar') ? (window.RAFF_MODULE_01_AR || null) : null;
  let QUESTIONS = QUESTIONS_DB;
  let LESSONS = MODULE_LESSONS;
  let GLOSSARY_ITEMS = GLOSSARY_ITEMS_DATA;
  let SEARCH = SEARCH_INDEX;
  if (OV) {
    if (OV.questions) {
      QUESTIONS = Object.assign({}, QUESTIONS_DB);
      Object.keys(QUESTIONS_DB).forEach((id) => {
        if (OV.questions[id]) QUESTIONS[id] = Object.assign({}, QUESTIONS_DB[id], OV.questions[id]);
      });
    }
    if (OV.lessons) LESSONS = RaffI18n.mergeById(MODULE_LESSONS, OV.lessons);
    if (OV.glossary) GLOSSARY_ITEMS = RaffI18n.mergeById(GLOSSARY_ITEMS_DATA, OV.glossary, 'term');
    if (OV.search) SEARCH = RaffI18n.mergeById(SEARCH_INDEX, OV.search);
  }

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
    if (id === 'lesson-0') return S.overview;
    if (id.startsWith('lesson-')) return S.lesson(id.replace('lesson-', ''));
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
      btn.innerHTML = isCompleted ? S.completedBadge : S.markComplete;
    });

    const totalChecks = Object.keys(QUESTIONS).filter(id => ASSESSMENT_IDS.indexOf(id) === -1).length;
    const answered = Object.keys(appState.answers || {}).length;

    return {
      percent: progressPercent,
      lessonsLabel: S.unitsLabel(completedCount + assessmentPassed, totalUnits, progressPercent),
      checksLabel: S.checksLabel(answered, totalChecks)
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
      showToast(S.selectAnswer);
      return;
    }

    const selectedOpt = parseInt(selected.getAttribute('data-opt'), 10);
    const qData = QUESTIONS[qid];
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
      <div class="feedback-headline">${isCorrect ? S.correctHeadline : S.incorrectHeadline}</div>
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
    const qData = QUESTIONS[qid];
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
      const q = QUESTIONS[id];
      html += `
        <div class="exercise-card" id="${id}">
          <div class="exercise-header">
            <div class="exercise-title-group">
              <span class="exercise-badge">${S.assessmentBadge(idx + 1)}</span>
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
        const qData = QUESTIONS[id];
        const isCorrect = (optNum === qData.correct);
        if (isCorrect) correctCount++;
        answers[id] = { selected: optNum, isCorrect };
      }
    });

    if (unselectedCount > 0) {
      showToast(S.unansweredWarn(unselectedCount));
      return;
    }

    const score = Math.round((correctCount / ASSESSMENT_IDS.length) * 100);

    appState.assessment = { submitted: true, score, answers };
    saveState();
    notifyChange();

    renderAssessmentResults();
    showToast(S.submittedToast(score));
  }

  function renderAssessmentResults() {
    const resultsBox = document.getElementById('assessment-results');
    const submitBtn = document.getElementById('btn-submit-final-assessment');
    if (!resultsBox) return;

    if (submitBtn) submitBtn.style.display = 'none';

    const score = appState.assessment.score;
    const passed = score >= 80;

    for (const [qid, ans] of Object.entries(appState.assessment.answers)) {
      const qData = QUESTIONS[qid];
      displayQuestionFeedback(qid, ans.isCorrect, qData.exp, ans.selected, qData.correct);
    }

    const topics = {};
    for (const [qid, ans] of Object.entries(appState.assessment.answers)) {
      const q = QUESTIONS[qid];
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
          <td>${isWeak ? `<span style="color:var(--warning); font-size:0.85rem;">${S.reviewRecommended}</span>` : `<span style="color:var(--success); font-size:0.85rem;">${S.mastered}</span>`}</td>
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
          ${passed ? S.passedHeadline : S.failedHeadline}
        </div>
        <p class="score-subtext">
          ${passed ? S.passedSubtext : S.failedSubtext}
        </p>

        <div class="table-wrapper topic-breakdown-table">
          <table>
            <thead>
              <tr>
                <th>${S.thTopic}</th>
                <th>${S.thScore}</th>
                <th>${S.thAccuracy}</th>
                <th>${S.thStatus}</th>
              </tr>
            </thead>
            <tbody>
              ${topicRows}
            </tbody>
          </table>
        </div>

        <div style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn-secondary" id="btn-retake-assessment">${S.retake}</button>
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

    const nodeData = S.nodes;

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

    const routeScenarios = S.routes;

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
          status: S.sim.bugSilent,
          dbRecord: db,
          analysis: S.sim.naiveNull
        };
      } else if (payload === 'omitted') {
        db.title = "Advanced C#";
        return {
          status: S.sim.worked,
          dbRecord: db,
          analysis: S.sim.naiveOmitted
        };
      } else {
        db.summary = "A deep dive into C#";
        return {
          status: S.sim.worked,
          dbRecord: db,
          analysis: S.sim.naiveSummary
        };
      }
    } else if (algo === 'ef_update') {
      if (payload === 'explicit_null' || payload === 'omitted') {
        db = { id: 42, title: "Advanced C#", summary: null, coverUrl: null, publishedYear: 0 };
        return {
          status: S.sim.efTrap,
          dbRecord: db,
          analysis: S.sim.efLoss
        };
      } else {
        db = { id: 42, title: "C# Basics", summary: "A deep dive into C#", coverUrl: null, publishedYear: 0 };
        return {
          status: S.sim.efTrap,
          dbRecord: db,
          analysis: S.sim.efPartial
        };
      }
    } else if (algo === 'presence') {
      if (payload === 'explicit_null') {
        db.title = "Advanced C#";
        db.summary = null;
        return {
          status: S.sim.presenceOk,
          dbRecord: db,
          analysis: S.sim.presenceNull
        };
      } else if (payload === 'omitted') {
        db.title = "Advanced C#";
        return {
          status: S.sim.omittedOk,
          dbRecord: db,
          analysis: S.sim.presenceOmitted
        };
      } else {
        db.summary = "A deep dive into C#";
        return {
          status: S.sim.perfect,
          dbRecord: db,
          analysis: S.sim.presenceApplied
        };
      }
    } else { // full_put
      if (payload === 'explicit_null' || payload === 'omitted') {
        db.title = "Advanced C#";
        db.summary = null;
        db.coverUrl = null;
        db.publishedYear = 0;
        return {
          status: S.sim.put,
          dbRecord: db,
          analysis: S.sim.putStrict
        };
      } else {
        db.title = "C# Basics";
        db.summary = "A deep dive into C#";
        db.coverUrl = null;
        db.publishedYear = 0;
        return {
          status: S.sim.put,
          dbRecord: db,
          analysis: S.sim.putOmitted
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
      lessons: LESSONS,
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
      labels: { lessons: S.units, checks: S.checks },
      messages: {
        exportToast: S.exportToast,
        exportErrorToast: S.exportErrorToast,
        importMode: 'file',
        importSuccessToast: S.importSuccessToast,
        importErrorToast: S.importErrorToast,
        resetToast: S.resetToast
      },
      completeToast: (done, id) => (done
        ? S.markedComplete(formatLessonName(id))
        : S.unmarked(formatLessonName(id))),

      copy: { feedback: true, colorFeedback: true, failToast: S.copyFailToast },

      search: {
        minChars: 1,
        hint: S.searchHint,
        noMatch: S.searchNoMatch,
        items: SEARCH.map(it => ({ target: it.id, title: it.title, snippet: it.snippet }))
      },

      glossary: {
        items: GLOSSARY_ITEMS,
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
