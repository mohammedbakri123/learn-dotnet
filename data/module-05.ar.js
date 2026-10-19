/* ============================================================
   Module 05 — Arabic overlay
   Full Arabic counterpart of data/module-05.js. The page script
   merges these values by id (or by English term for the glossary).
   Code identifiers, routes, and HTTP status codes remain unchanged.
   ============================================================ */

window.RAFF_MODULE_05_AR = {
  lessonMeta: {
    "lesson-1": {
      label: "فصل المسؤوليات",
      keywords: "فصل الاهتمامات المتحكم الخدمة المستودع DbContext المسؤوليات HTTP حالة الاستخدام المعمارية Raff تدفق الطلب لماذا لا يجب أن يحتوي المتحكم على كل شيء لماذا لا يجب أن تعيد الخدمة IActionResult DTO الكيان",
      summary: "ما الذي ينتمي إلى المتحكم وما الذي ينتمي إلى الخدمة، وأين تقع الحدود بين الفصل المفيد والتجريد غير الضروري."
    },
    "lesson-2": {
      label: "تصميم الخدمات التطبيقية",
      keywords: "الخدمة التطبيقية عقد الواجهة نتيجة الحذف CancellationToken async DTO التحقق من الوجود التعارض 404 409 204 تسمية الدوال",
      summary: "كيف تصمم خدمة حول حالة استخدام واضحة، وكيف يعبّر نوع الإرجاع عن النجاح والفشل المتوقعين دون تسريب تفاصيل HTTP."
    },
    "lesson-3": {
      label: "أساسيات حقن التبعيات",
      keywords: "حقن التبعيات انعكاس التبعيات المنشئ التسجيل الحلّ IServiceCollection مزوّد الخدمات جذر التركيب محدد الخدمات الواجهة التنفيذ AddScoped",
      summary: "كيف تتلقى الفئات تبعياتها بدل إنشائها، وكيف يبني الحاوية الرسم البياني للكائنات من التسجيلات."
    },
    "lesson-4": {
      label: "أعمار الخدمات",
      keywords: "عابر محدود النطاق مفرد Transient Scoped Singleton العمر النطاق التخلص الذاكرة الحالة المشتركة سلامة الخيوط AddTransient AddScoped AddSingleton",
      summary: "الفروق الدقيقة بين عابر ومحدود النطاق ومفرد، وكيف يؤثر اختيار العمر على الحالة والتخلص والأداء."
    },
    "lesson-5": {
      label: "DbContext والتبعيات الأسيرة والعمل الخلفي",
      keywords: "DbContext التبعية الأسيرة captive dependency IServiceScopeFactory IDbContextFactory BackgroundService العامل الخلفي النطاق CreateAsyncScope CreateDbContextAsync التحقق من النطاقات",
      summary: "لماذا لا يجوز أن يلتقط singleton سياق DbContext محدود النطاق، وكيف تعمل الخدمات الخلفية مع وحدات العمل القصيرة."
    },
    "lesson-6": {
      label: "المستودعات ووحدة العمل",
      keywords: "المستودع Repository وحدة العمل Unit of Work DbContext IQueryable المستودع العام CRUD المعاملة الإسقاط الاستعلام التجريد",
      summary: "متى يفيد المستودع المركّز، ولماذا يضر المستودع العام عادة، ومتى تحتاج وحدة عمل صريحة."
    },
    "lesson-7": {
      label: "تحدي إعادة هيكلة Raff",
      keywords: "إعادة الهيكلة refactor ReadingEntriesController StartReading خدمة القراءة نتيجة الوقت TimeProvider الفهرس الفريد التسابق 201 404 409 401 الاختبارات",
      summary: "تحدي عملي لنقل حالة استخدام من متحكم مزدحم إلى خدمة تطبيقية مع الحفاظ على عقد HTTP وإغلاق ثغرة التسابق."
    },
    "lesson-assessment": {
      label: "التقييم النهائي",
      keywords: "التقييم النهائي أسئلة الوحدة 5 مراجعة الدرجات حد النجاح",
      summary: "أربعة عشر سؤالًا تغطي الوحدة كاملة مع حد نجاح قابل للضبط وروابط مراجعة لكل درس."
    }
  },

  glossary: {
    "Separation of concerns": { t: "فصل المسؤوليات", c: "المعمارية", d: "تنظيم الكود بحيث يكون لكل جزء سبب واحد واضح للتغيير. معالجة HTTP وحالات الاستخدام والاستمرارية مسؤوليات مختلفة، حتى عندما يلمس طلب واحد الثلاثة." },
    "Application service": { t: "الخدمة التطبيقية", c: "المعمارية", d: "فئة تنفّذ حالة استخدام ذات معنى عبر تنسيق قواعد العمل والاستمرارية والتبعيات الأخرى. تعيد بيانات ونتائج على مستوى التطبيق، لا استجابات HTTP." },
    "Dependency injection": { t: "حقن التبعيات", c: "أساسيات حقن التبعيات", d: "أسلوب يتلقى فيه المكوّن التبعيات التي يحتاجها من الخارج بدل إنشائها بنفسه. في ASP.NET Core يوفّر الحاوية المدمجة الخدمات المسجّلة عبر المنشئات." },
    "Dependency inversion": { t: "انعكاس التبعيات", c: "أساسيات حقن التبعيات", d: "مبدأ يقضي بأن لا تعتمد السياسة عالية المستوى مباشرة على تفاصيل التنفيذ منخفضة المستوى. يمكن لكليهما الاعتماد على تجريد، فتتغيّر التفاصيل دون إعادة كتابة السياسة." },
    "Constructor injection": { t: "الحقن عبر المنشئ", c: "أساسيات حقن التبعيات", d: "تزويد الفئة بتبعياتها عبر منشئها. تقرأ الحاوية توقيع المنشئ، وتحلّ كل معامل، وتبني رسم الكائنات." },
    "Service registration": { t: "تسجيل الخدمة", c: "أساسيات حقن التبعيات", d: "إضافة واصف خدمة إلى IServiceCollection — مثل AddScoped<IBookService, BookService>(). التسجيل يصف كيفية إنشاء الخدمة ولا ينشئها فورًا." },
    "Service resolution": { t: "حلّ الخدمة", c: "أساسيات حقن التبعيات", d: "طلب نسخة من خدمة مسجّلة من IServiceProvider. يمكن أن يحدث الحلّ مرة واحدة في جذر التركيب أو ضمنيًا عندما تبني الحاوية خدمة أخرى." },
    "IServiceCollection": { t: "IServiceCollection", c: "أساسيات حقن التبعيات", d: "مجموعة تسجيلات ServiceDescriptor المستخدمة لتهيئة الحاوية المدمجة. builder.Services هو IServiceCollection، ويُنشأ مزوّد الخدمات لاحقًا منه." },
    "Composition root": { t: "جذر التركيب", c: "أساسيات حقن التبعيات", d: "المكان الوحيد في التطبيق الذي يُهيَّأ فيه رسم الكائنات وتُبنى فيه الحاوية. في ASP.NET Core يكون عادة Program.cs." },
    "Service locator": { t: "محدّد الخدمات", c: "أساسيات حقن التبعيات", d: "حلّ التبعيات من الحاوية داخل كود الأعمال بدل حقنها. يخفي التبعيات ويجعل الفئات أصعب في الاختبار والفهم." },
    "Transient": { t: "عابر (Transient)", c: "أعمار الخدمات", d: "عمر تُنشئ فيه الحاوية عمومًا نسخة جديدة كلما حُلّت الخدمة. إذا حلّها المستهلك مرة واستدعى دوالها مرارًا، فسيظل يستخدم النسخة نفسها." },
    "Scoped": { t: "محدود النطاق (Scoped)", c: "أعمار الخدمات", d: "عمر تُعاد فيه نسخة واحدة داخل نطاق حقن تبعيات معيّن. ينشئ ASP.NET Core عادة نطاقًا واحدًا لكل طلب HTTP، لذا تعيش الخدمات المحدودة عادة طوال الطلب." },
    "Singleton": { t: "مفرد (Singleton)", c: "أعمار الخدمات", d: "عمر تُعاد فيه نسخة واحدة طوال عمر مزوّد الخدمات الجذري، أي عمر التطبيق عادة. التسجيل لا يجعل الخدمة آمنة للاستخدام المتزامن." },
    "Captive dependency": { t: "التبعية الأسيرة", c: "أعمار الخدمات", d: "خدمة أطول عمرًا تحتفظ بتبعية أقصر عمرًا فتُبقيها حيّة بعد نطاقها المقصود. المثال الكلاسيكي: singleton يحتفظ بـ DbContext محدود النطاق." },
    "Lifetime mismatch": { t: "عدم توافق الأعمار", c: "أعمار الخدمات", d: "تهيئة يكون فيها العمر الفعلي للخدمة غير متوافق مع عمر إحدى تبعياتها. غالبًا ما يبلغ التحقق من النطاقات عنها كخطأ تبعية أسيرة." },
    "Root service provider": { t: "مزوّد الخدمات الجذري", c: "أعمار الخدمات", d: "IServiceProvider الذي يُنشأ عند بناء التطبيق. تنتمي الخدمات المفردة إليه، وحلّ خدمة محدودة النطاق منه مباشرة خطأ عادة." },
    "DI scope": { t: "نطاق حقن التبعيات", c: "أعمار الخدمات", d: "سياق حلّ محدود يعيد استخدام النسخ المحدودة النطاق ويتخلص من خدمات IDisposable المحدودة عند انتهاء النطاق. يفتح ASP.NET Core نطاقًا لكل طلب." },
    "IServiceScopeFactory": { t: "IServiceScopeFactory", c: "أعمار الخدمات", d: "خدمة مفردة تنشئ نسخ IServiceScope جديدة. يستخدمها الكود المفرد مثل العامل الخلفي لحلّ الخدمات المحدودة النطاق بأمان." },
    "BackgroundService": { t: "BackgroundService", c: "أعمار الخدمات", d: "فئة أساس لخدمات مستضافة طويلة التشغيل. تُسجّل كخدمة مفردة، لذا يجب أن تنشئ نطاقًا صريحًا عندما تحتاج تبعيات محدودة النطاق." },
    "IDbContextFactory": { t: "IDbContextFactory", c: "EF Core والاستمرارية", d: "مصنع ينشئ نسخ DbContext مستقلة عند الطلب. يفيد عندما يحتاج كود مفرد أو خلفي إلى سياق لكل وحدة عمل مع تحرير صريح." },
    "DbContext": { t: "DbContext", c: "EF Core والاستمرارية", d: "بوابة الاستعلام ووحدة العمل في EF Core. يسجّله AddDbContext عادة كمحدود النطاق، وهو غير آمن للاستخدام المتزامن؛ تحتاج العمليات المتزامنة المنفصلة إلى سياقات منفصلة." },
    "Unit of Work": { t: "وحدة العمل", c: "الأنماط", d: "نمط يتتبع التغييرات خلال حالة استخدام ويثبّتها كوحدة منطقية واحدة. يوفّر DbContext هذا السلوك أصلًا عبر تتبع التغييرات وSaveChangesAsync." },
    "Repository pattern": { t: "نمط المستودع", c: "الأنماط", d: "تجريد للوصول إلى البيانات يعرض عمليات موجّهة للنطاق. يمكنه تغليف استعلامات ذات معنى أو عزل الاستمرارية، لكنه ليس إلزاميًا في كل تطبيق." },
    "Generic repository": { t: "المستودع العام", c: "الأنماط", d: "مستودع قابل لإعادة الاستخدام لأي كيان، يعرض عادة عمليات CRUD الأساسية. يقلّل التكرار لكنه قد يخفي قدرات EF Core المفيدة مثل تركيب الاستعلامات والإسقاطات والعمليات الجماعية." },
    "Abstraction": { t: "التجريد", c: "المعمارية", d: "حدّ يخفي تفاصيل التنفيذ خلف عقد. التجريد المفيد له غرض ملموس، وغير الضروري يضيف طبقة وسيطة دون تقليل التعقيد الحقيقي." },
    "Result object": { t: "كائن النتيجة", c: "المعمارية", d: "قيمة إرجاع تمثّل النجاح والفشل المتوقع صراحة. تتيح للمستدعي التعامل مع النتائج ضمن تدفق التحكم العادي بدل التقاط استثناءات لحالات متوقعة." }
  },

  responsibilityLayers: {
    controller: "المتحكم",
    service: "الخدمة التطبيقية",
    data: "الوصول إلى البيانات"
  },

  responsibilityCases: {
    "rc-1": {
      rule: "اختيار 404 مقابل 204 لنتيجة الحذف.",
      why: "اختيار رمز الحالة هو ترجمة HTTP. يحوّل المتحكم نتيجة التطبيق إلى استجابة بروتوكول."
    },
    "rc-2": {
      rule: "التحقق مما إذا كان الكتاب ما زال لديه مدخلات قراءة قبل حذفه.",
      why: "تحتاج هذه القاعدة إلى بيانات حالية وتنتمي إلى حالة استخدام الحذف. ويبقى المفتاح الأجنبي المقيّد شبكة أمان ضد التسابق."
    },
    "rc-3": {
      rule: "تحميل الكتاب وحذفه واستدعاء SaveChangesAsync كوحدة واحدة.",
      why: "تنسيق حالة الاستخدام هو عمل الخدمة التطبيقية. وEF Core ينفّذ عمليات الاستمرارية التي تنسّقها الخدمة."
    },
    "rc-4": {
      rule: "رفض طلب تعذّر إلغاء تسلسل جسم JSON الخاص به.",
      why: "يحدث ربط النموذج والخطأ 400 التلقائي قبل تنفيذ الإجراء. وحدود المتحكم تملك عقد الطلب."
    },
    "rc-5": {
      rule: "فرض الفهرس الفريد على (UserId, BookId).",
      why: "الفهرس الفريد قيد على قاعدة البيانات. يظل ساريًا حتى عند تسابق طلبين أو تغيّر الكود."
    },
    "rc-6": {
      rule: "تسمية العملية DeleteBookAsync وتعريف نوع نتيجتها.",
      why: "عقد الخدمة يسمّي حالة الاستخدام ونتائجها المتوقعة. والمتحكم يستهلك ذلك العقد."
    },
    "rc-7": {
      rule: "تحويل انتهاك المفتاح الأجنبي في PostgreSQL إلى 409 Conflict.",
      why: "قاعدة البيانات تبلّغ عن فشل قيد، وحدود HTTP تحوّله إلى استجابة بروتوكول بعد تسجيله."
    },
    "rc-8": {
      rule: "تمرير CancellationToken الخاص بالطلب إلى استعلامات EF Core.",
      why: "يستقبل المتحكم الرمز، لكن الخدمة تنقله إلى استدعاءات الاستمرارية غير المتزامنة التي تنسّقها. لا حاجة إلى أي نوع خاص بـ HTTP."
    }
  },

  lifetimeModes: {
    transient: {
      label: "عابر (Transient)",
      badge: "AddTransient",
      rule: "تُنشأ نسخة جديدة عمومًا كلما حُلّت الخدمة من الحاوية.",
      note: "حلّ الخدمة مرة واحدة ثم استدعاء ثلاث دوال لا يزال يستخدم النسخة نفسها. العابر يتعلق بعملية الحلّ، لا بعدد استدعاءات الدوال.",
      use: "مناسب للمساعدات الخفيفة بلا حالة حيث يكون عزل كل عملية حلّ مفيدًا. تجنّبه للخدمات المكلفة أو ذات الحالة إلا إذا كانت التكلفة مقصودة."
    },
    scoped: {
      label: "محدود النطاق (Scoped)",
      badge: "AddScoped",
      rule: "تُعاد نسخة واحدة داخل نطاق حقن تبعيات معيّن. وفي طلب ASP.NET Core النموذجي، يقابل النطاق ذلك الطلب.",
      note: "كل نطاق جديد يحصل على نسخته الخاصة. وعمليات الحلّ المتكررة داخل النطاق نفسه تعيد استخدام النسخة نفسها.",
      use: "مناسب للعمل المرتبط بالطلب مثل الخدمات التطبيقية وDbContext. ويُحرَّر الكائن عند انتهاء النطاق."
    },
    singleton: {
      label: "مفرد (Singleton)",
      badge: "AddSingleton",
      rule: "تُعاد نسخة واحدة طوال عمر مزوّد الخدمات الجذري، أي عمر التطبيق عادة.",
      note: "أول عملية حلّ تنشئ النسخة، وعمليات الحلّ اللاحقة تعيد استخدامها عبر كل النطاقات. سلامة الاستخدام المتزامن مسؤوليتك.",
      use: "مناسب للتهيئة والخدمات المشتركة بلا حالة والذاكرات المؤقتة ذات تصميم تزامن مقصود. لا تلتقط أبدًا تبعية محدودة النطاق."
    }
  },

  dependencyGraphs: {
    "graph-1": {
      title: "رسم طلب عادي",
      subtitle: "المتحكم ← الخدمة التطبيقية ← DbContext",
      question: "هل هذا الرسم الآمن لأعمار الخدمات آمن لطلب ويب عادي؟",
      options: [
        "نعم — الخدمات الثلاث تتشارك نطاق الطلب وتُحرَّر معًا.",
        "لا — يجب أن يكون المتحكم مفردًا.",
        "لا — يجب أن يكون DbContext مفردًا لتجنب إنشاء عدد كبير من النسخ.",
        "نعم فقط إذا كانت الخدمة عابرة."
      ],
      explain: "التسجيلات الثلاثة محدودة النطاق. يُحلّ المتحكم والخدمة داخل نطاق الطلب، ويشاركهما DbContext النطاق نفسه. وعند انتهاء النطاق يُحرَّر السياق وأي خدمة أخرى محدودة النطاق تنفّذ IDisposable.",
      nodeRoles: {
        "controller": "متحكم",
        "application service": "خدمة تطبيقية",
        "EF Core DbContext": "سياق DbContext من EF Core"
      },
      edgeLabels: {
        "constructor injection": "حقن عبر المنشئ"
      }
    },
    "graph-2": {
      title: "الذاكرة المؤقتة الأسيرة",
      subtitle: "singleton يحتفظ بـ DbContext محدود النطاق",
      question: "ما الخطأ في هذا الرسم، وما التصحيح الآمن؟",
      options: [
        "اجعل BooksContext مفردًا حتى تستطيع الذاكرة المؤقتة الاحتفاظ به بأمان.",
        "اجعل BookCacheService محدود النطاق إذا كان عمله مرتبطًا بالطلب؛ وإلا فاستخدم IServiceScopeFactory أو IDbContextFactory داخل الكائن المفرد.",
        "سجّل BooksContext كعابر؛ فهذا يزيل مشكلة العمر.",
        "عطّل التحقق من النطاقات حتى يُبنى الرسم."
      ],
      explain: "الكائن المفرد يُبنى من النطاق الجذري فيلتقط السياق المحدود النطاق طوال عمر التطبيق. جعل السياق مفردًا أو عابرًا لا يجعله آمنًا للتزامن، وتعطيل التحقق يخفي خطأ التصميم. استخدم خدمة محدودة النطاق للعمل المرتبط بالطلب، أو أنشئ نطاقًا/سياقًا صريحًا داخل الكائن المفرد.",
      fixTitle: "أشكال آمنة",
      fixNodes: {
        "cache": { label: "BookCacheService (محدود النطاق) ← BooksContext (محدود النطاق)", role: "خيار مرتبط بالطلب" },
        "factory": { label: "ذاكرة مؤقتة مفردة ← IServiceScopeFactory / IDbContextFactory", role: "وحدة عمل مستقلة" }
      },
      nodeRoles: {
        "singleton cache": "ذاكرة مؤقتة مفردة",
        "EF Core DbContext": "سياق DbContext من EF Core",
        "request-bound option": "خيار مرتبط بالطلب",
        "independent unit of work": "وحدة عمل مستقلة"
      },
      edgeLabels: {
        "constructor injection": "حقن عبر المنشئ"
      }
    },
    "graph-3": {
      title: "العامل الخلفي",
      subtitle: "خدمة مستضافة مفردة تحتاج إلى DbContext",
      question: "كيف يجب أن يحصل العامل على BooksContext؟",
      options: [
        "حقن BooksContext مباشرة في الخدمة المستضافة.",
        "حقن IServiceScopeFactory، وإنشاء نطاق لكل وحدة عمل، وحلّ BooksContext داخله، ثم تحرير النطاق.",
        "حلّ BooksContext من app.Services دون نطاق.",
        "تسجيل BooksContext كخدمة مفردة وحقنه."
      ],
      explain: "BackgroundService كائن مفرد. أنشئ نطاقًا لكل وحدة عمل، واحلّ السياق المحدود النطاق داخله، ونفّذ العمليات بالتتابع، ومرّر رمز الإيقاف، وحرّر النطاق عند انتهاء العمل.",
      nodeRoles: {
        "hosted singleton": "كائن مستضاف مفرد",
        "creates scopes": "ينشئ النطاقات",
        "scope boundary": "حدّ النطاق",
        "EF Core DbContext": "سياق DbContext من EF Core"
      },
      edgeLabels: {
        "constructor injection": "حقن عبر المنشئ",
        "CreateScope()": "CreateScope()",
        "resolve inside scope": "الحلّ داخل النطاق"
      }
    },
    "graph-4": {
      title: "خيار المصنع",
      subtitle: "كائن مفرد ينشئ سياقات مستقلة",
      question: "هل هذا الرسم آمن؟ وما مسؤولية المستدعي في التحرير؟",
      options: [
        "لا — لا يمكن استخدام المصنع مع حقن التبعيات.",
        "نعم — المصنع ينشئ سياقات مستقلة، وعلى المستدعي تحرير كل سياق باستخدام await using أو using.",
        "نعم — المصنع يحرّر كل سياق تلقائيًا بعد أول استعلام.",
        "نعم فقط إذا سُجّل المصنع كمحدود النطاق."
      ],
      explain: "ينشئ IDbContextFactory سياقات مستقلة عند الطلب. يفيد عندما يحتاج كود مفرد أو خلفي إلى سياق لكل وحدة عمل. لا يحرّر نطاق المستدعي السياق المنشأ تلقائيًا، لذا غلّفه بـ await using أو using.",
      nodeRoles: {
        "singleton or scoped consumer": "مستهلك مفرد أو محدود النطاق",
        "context factory": "مصنع السياقات",
        "independent context": "سياق مستقل",
        "disposed by caller": "يحرّره المستدعي"
      },
      edgeLabels: {
        "constructor injection": "حقن عبر المنشئ",
        "CreateDbContextAsync()": "CreateDbContextAsync()"
      }
    }
  },

  lessons: {
    "lesson-1": {
      badge: "L1",
      nav: "فصل المسؤوليات",
      content: [
        {
          type: "html",
          html: `<span class="lesson-pill">L1 · الدرس</span><h1 class="lesson-h1">فصل المسؤوليات</h1><p class="lesson-lead">معالجة HTTP وحالات استخدام التطبيق والاستمرارية مهام مختلفة. معرفة أين تنتمي كل منها هي ما يمنع المتحكم من أن يصبح التطبيق كله.</p><div class="lesson-meta-bar"><span>🧠 4 اختبارات معرفية</span><span>🧭 مختبر المسؤوليات</span><span>📐 رسم تدفق الطلب</span></div>`
        },
        {
          type: "h2",
          html: "إجراء واحد، مهام عدة"
        },
        {
          type: "p",
          html: `قد يبدو إجراء المتحكم قصيرًا ومع ذلك يحمل مسؤوليات كثيرة. الإجراء التالي من Raff يتولى التوجيه، وتحميل الكيان، وتطبيق قاعدة عمل، وتعديل السياق، وحفظ التغييرات، واختيار حالة HTTP — كل ذلك في دالة واحدة.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BooksController.cs — قبل</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">مقطع توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">[HttpDelete("{id:int}")]
public async Task&lt;IActionResult&gt; DeleteBook(int id, CancellationToken ct)
{
    var book = await _context.Books.FirstOrDefaultAsync(b =&gt; b.Id == id, ct);
    if (book is null) return NotFound();

    var hasEntries = await _context.ReadingEntries
        .AnyAsync(e =&gt; e.BookId == id, ct);

    if (hasEntries)
        return Conflict(new ProblemDetails { Title = "Book has reading entries." });

    _context.Books.Remove(book);
    await _context.SaveChangesAsync(ct);
    return NoContent();
}</code></pre><div class="code-expl">هذا ليس «خطأ» لأنه طويل. إنه مشكلة تصميم لأن <strong>أربعة أسباب مختلفة للتغيير</strong> أصبحت مقترنة في مكان واحد: عقد HTTP، وقاعدة الحذف، وتدفق الاستمرارية، وتعيين الاستجابة.</div></div>`
        },
        {
          type: "p",
          html: `الطلب يؤدي عملًا كبيرًا، لكن وظيفة واحدة فقط منه تخص HTTP تحديدًا. إذا احتاج عامل تنظيف خلفي أو اختبار تكامل أو نقطة نهاية إدارية مستقبلية إلى حالة استخدام الحذف نفسها، فلن يمكن إعادة استخدام إجراء المتحكم دون جرّ HTTP معه.`
        },
        {
          type: "h2",
          html: "تدفق الطلب"
        },
        {
          type: "p",
          html: `تعطي معمارية ASP.NET Core الشائعة كل طبقة وظيفة ضيقة:`
        },
        {
          type: "html",
          html: `<div class="diagram-container">
  <div class="diagram-title">طلب HTTP → المتحكم → الخدمة التطبيقية → BooksContext → PostgreSQL</div>
  <div class="m4-stages">
    <div class="m4-stage"><div class="m4-stage-name">طلب HTTP</div><div class="m4-stage-desc">Kestrel والتوجيه وربط النموذج والتحقق</div></div>
    <div class="m4-stage"><div class="m4-stage-name">المتحكم</div><div class="m4-stage-desc">يقرأ الطلب، ويستدعي حالة استخدام واحدة، ويعيّن النتيجة إلى HTTP</div></div>
    <div class="m4-stage"><div class="m4-stage-name">الخدمة التطبيقية</div><div class="m4-stage-desc">تنسّق حالة الاستخدام وتطبّق قواعد العمل</div></div>
    <div class="m4-stage"><div class="m4-stage-name">BooksContext</div><div class="m4-stage-desc">يتتبع الكيانات، ويبني SQL، ويثبّت وحدة العمل</div></div>
    <div class="m4-stage"><div class="m4-stage-name">PostgreSQL</div><div class="m4-stage-desc">يخزّن البيانات ويفرض قيود العلاقات</div></div>
  </div>
</div>`
        },
        {
          type: "callout",
          kind: "info",
          title: "ℹ️ هذه معمارية شائعة، لا قانون",
          html: `يمكن لواجهة برمجة صغيرة أن تبقي عمليات CRUD البسيطة داخل المتحكم وتظل جيدة التصميم. الهدف ليس إضافة طبقات لمجرد إضافتها، بل وضع المسؤولية حيث يمكن تسميتها واختبارها وإعادة استخدامها وتغييرها دون جرّ اهتمامات غير ذات صلة.`
        },
        {
          type: "h2",
          html: "من يملك ماذا"
        },
        {
          type: "html",
          html: `<div class="table-wrapper"><table><thead><tr><th>الطبقة</th><th>تملك</th><th>لا ينبغي أن تملك عادة</th></tr></thead><tbody>
<tr><td><strong>المتحكم</strong></td><td>طريقة HTTP والمسار، وتحليل الطلب، ونقاط دخول التخويل، واستدعاء حالة الاستخدام، وتعيين النتائج إلى رموز الحالة وأجسام الاستجابة</td><td>قواعد عمل متعددة الخطوات، والاستعلامات المعقدة، وتنسيق المعاملات</td></tr>
<tr><td><strong>الخدمة التطبيقية</strong></td><td>حالة استخدام مسمّاة: تحميل ما تحتاجه، وتطبيق القواعد، واستدعاء الاستمرارية، وإعادة نتيجة على مستوى التطبيق</td><td><code>IActionResult</code> و<code>HttpContext</code> ورموز الحالة وتسلسل JSON</td></tr>
<tr><td><strong>EF Core / <code>BooksContext</code></strong></td><td>تتبع التغييرات، وترجمة الاستعلامات، وتنفيذ SQL، وتثبيت وحدة العمل</td><td>اهتمامات HTTP، والقرارات التجارية التي تخص حالة الاستخدام</td></tr>
<tr><td><strong>PostgreSQL</strong></td><td>التخزين الدائم، والتفرد، والمفاتيح الأجنبية، وقيود التحقق، والمعاملات</td><td>رسائل المستخدم ودلالات HTTP</td></tr>
</tbody></table></div>`
        },
        {
          type: "p",
          html: `لاحظ أن الخدمة لا تزال تستخدم EF Core. فصل المسؤوليات لا يعني إخفاء EF Core خلف عشرين واجهة. يعني أن المتحكم يتوقف عن تقرير كيفية الحذف، والخدمة تتوقف عن تقرير كيفية تمثيل النتيجة عبر HTTP.`
        },
        {
          type: "h2",
          html: "الحذف نفسه مع حدّ خدمة"
        },
        {
          type: "p",
          html: `تسمّي الخدمة حالة الاستخدام وتعيد نتيجة على مستوى التطبيق. ويبقى للمتحكم بالضبط العمل الذي يجيده: تحويل تلك النتيجة إلى HTTP.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">DeleteBookResult.cs — نتيجة التطبيق</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">مقطع توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public enum DeleteBookOutcome
{
    Deleted,
    NotFound,
    HasReadingEntries
}

public sealed record DeleteBookResult(
    DeleteBookOutcome Outcome,
    int? EntryCount = null);</code></pre><div class="code-expl">نوع النتيجة يقول ما يمكن أن تنتجه حالة الاستخدام. لا يذكر 404 أو 409 أو أي نوع من MVC. يفحص الدرس 2 تصميم هذا العقد بعمق أكبر.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookService.cs — حالة الاستخدام</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">مقطع توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public async Task&lt;DeleteBookResult&gt; DeleteAsync(
    int id,
    CancellationToken ct = default)
{
    var book = await _context.Books
        .FirstOrDefaultAsync(b =&gt; b.Id == id, ct);

    if (book is null)
        return new DeleteBookResult(DeleteBookOutcome.NotFound);

    var entryCount = await _context.ReadingEntries
        .CountAsync(e =&gt; e.BookId == id, ct);

    if (entryCount &gt; 0)
        return new DeleteBookResult(
            DeleteBookOutcome.HasReadingEntries,
            entryCount);

    _context.Books.Remove(book);
    await _context.SaveChangesAsync(ct);

    return new DeleteBookResult(DeleteBookOutcome.Deleted);
}</code></pre><div class="code-expl">الخدمة تملك التتابع والقاعدة. يمكن استدعاؤها من MVC أو عامل خلفي أو اختبار دون التظاهر بأنها نقطة نهاية HTTP.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BooksController.cs — حدّ HTTP</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">مقطع توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">[HttpDelete("{id:int}")]
public async Task&lt;IActionResult&gt; DeleteBook(
    int id,
    CancellationToken ct)
{
    var result = await _books.DeleteAsync(id, ct);

    return result.Outcome switch
    {
        DeleteBookOutcome.Deleted =&gt; NoContent(),
        DeleteBookOutcome.NotFound =&gt; NotFound(),
        DeleteBookOutcome.HasReadingEntries =&gt; Conflict(new ProblemDetails
        {
            Title = "Book has reading entries.",
            Detail = $"Remove the {result.EntryCount} reading entries first."
        }),
        _ =&gt; StatusCode(StatusCodes.Status500InternalServerError)
    };
}</code></pre><div class="code-expl">المتحكم الآن طبقة ترجمة. يعرف عقد HTTP؛ ولا يعرف كيف تُنفَّذ قاعدة الحذف.</div></div>`
        },
        {
          type: "h2",
          html: "DTOs والكيانات والخدمات والمتحكمات"
        },
        {
          type: "html",
          html: `<div class="table-wrapper"><table><thead><tr><th>النوع</th><th>الغرض</th><th>لماذا يوجد منفصلًا</th></tr></thead><tbody>
<tr><td>كيان <code>Book</code></td><td>شكل الاستمرارية الذي يتتبعه EF Core</td><td>يحمل تعيين قاعدة البيانات وحالة تتبع التغييرات التي لا يجب أن تصبح عقد API العام.</td></tr>
<tr><td><code>BookDto</code></td><td>عقد القراءة المعاد للعملاء</td><td>يتحكم في الحقول المعروضة بالضبط ويمكن تشكيله بإسقاط.</td></tr>
<tr><td><code>CreateBookDto</code></td><td>عقد الكتابة المقبول من العملاء</td><td>يحمل سمات التحقق ويمنع الإفراط في التعيين (over-posting).</td></tr>
<tr><td><code>IBookService</code> / <code>BookService</code></td><td>حالات استخدام التطبيق</td><td>تنسّق القواعد والاستمرارية دون معرفة HTTP.</td></tr>
<tr><td><code>BooksController</code></td><td>حدّ HTTP</td><td>يعيّن الطلبات إلى حالات استخدام والنتائج إلى استجابات.</td></tr>
</tbody></table></div>`
        },
        {
          type: "callout",
          kind: "warning",
          title: "⚠️ خطأ الحدود الأكثر شيوعًا",
          html: `إعادة كيان متتبَّع مباشرة من استدعاء خدمة/متحكم تعني عادة أن الكيان هرب من حدّ الاستمرارية. قد يسلسل خصائص التنقل، أو يسرب أعمدة داخلية، أو يعتمد على بقاء السياق حيًا. أعد DTOs أو إسقاطات من حدّ التطبيق بدلًا من ذلك.`
        },
        {
          type: "h2",
          html: "لماذا لا يجب أن تعيد الخدمات أنواع MVC"
        },
        {
          type: "p",
          html: `الخدمة التطبيقية التي تعيد <code>IActionResult</code> يجب أن تعرف <code>NotFound()</code> و<code>Conflict()</code> وأخطاء ربط النموذج وتفاوض المحتوى. هذه المعرفة ليست جزءًا من حذف كتاب. كما أنها تجعل استدعاء الخدمة من خدمة عامل أو معالج رسائل أو اختبار وحدة يهتم بالنتيجة فقط أمرًا غير ملائم.`
        },
        {
          type: "p",
          html: `تنطبق القاعدة نفسها على <code>HttpContext</code> و<code>Request</code> وتنسيق الاستجابة. أما رمز الإلغاء فمختلف: يمثل «هذا العمل لم يعد مطلوبًا» وهو اهتمام طبيعي في البرمجة غير المتزامنة، لا نوع خاص بـ HTTP. تمريره عبر الخدمة مناسب.`
        },
        {
          type: "callout",
          kind: "info",
          title: "ℹ️ يمكن للخدمة أن تستخدم مكتبات ASP.NET Core",
          html: `الحدّ مفهومي لا قاعدة على ملف المشروع. قد تعيش الخدمة في المشروع نفسه وتشير إلى أنواع ASP.NET Core للتسجيل أو الخيارات أو الإلغاء. ما لا يجب أن تفعله هو <em>اختيار استجابات HTTP</em>. ذلك القرار ينتمي إلى الحدّ.`
        },
        {
          type: "h2",
          html: "الفصل المفيد مقابل التجريد غير الضروري"
        },
        {
          type: "p",
          html: `«انقله إلى خدمة» ليس تحسينًا تلقائيًا. قد تجعل خدمة تمرير من سطر واحد قاعدة كود صغيرة أصعب في المتابعة. استخدم هذه الأسئلة قبل إنشاء حدّ:`
        },
        {
          type: "list",
          ordered: false,
          items: [
            `<strong>هل له اسم؟</strong> إذا لم تستطع وصفه كحالة استخدام — «حذف كتاب»، «بدء قراءة كتاب»، «إعادة حساب تقدم القراءة» — فقد لا يستحق خدمة خاصة به بعد.`,
            `<strong>هل لديه قواعد أو تنسيق؟</strong> استدعاء <code>FindAsync</code> واحد ليس حالة استخدام. أما قاعدة مع استمرارية وتعيين نتيجة فهي كذلك عادة.`,
            `<strong>هل سيستخدمه أكثر من مستدعٍ؟</strong> عامل خلفي أو نقطة نهاية ثانية أو اختبار تكامل إشارة قوية.`,
            `<strong>هل يقلل نقله تكلفة التغيير؟</strong> إذا أصبح المتحكم أوضح والقاعدة قابلة للاختبار، فالحدّ يستحق وجوده. وإذا أضفت ثلاثة ملفات ولم يعد أحد يجد المنطق، فهو لا يستحق.`,
            `<strong>هل التجريد حقيقي؟</strong> قد تكون واجهة بتنفيذ واحد وبلا حاجة إلى استبدال مقبولة — لكنها ليست أفضل تلقائيًا من فئة ملموسة.`
          ]
        },
        {
          type: "html",
          html: `<div class="simulator-widget" data-widget="responsibilities" id="w-responsibilities"><div class="simulator-header"><div class="simulator-title">🧭 مختبر المسؤوليات</div><div class="m4-mode-note" style="margin-top:0;">لكل مسؤولية، اختر الطبقة التي يجب أن تملكها. يشرح التغذية الراجعة الحدّ.</div></div><div class="simulator-body"></div></div>`
        },
        {
          type: "h2",
          html: "اختبارات معرفية"
        },
        {
          type: "html",
          html: "<div class=\"kc-mount\" data-kc-group=\"lesson-1\"></div>"
        },
        {
          type: "html",
          html: `<div class="refs-block"><div class="refs-title">المراجع الرسمية</div><ul><li><a href="https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/actions" target="_blank" rel="noopener noreferrer">إجراءات المتحكم في ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection" target="_blank" rel="noopener noreferrer">حقن التبعيات في ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles" target="_blank" rel="noopener noreferrer">المبادئ المعمارية ↗</a></li></ul></div>`
        },
        {
          type: "html",
          html: `<div class="lesson-footer-nav"><button class="btn-complete-lesson" type="button" data-lesson="lesson-1">إكمال الدرس 1 ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-2">التالي: تصميم الخدمات التطبيقية ←</button></div>`
        }
      ]
    },
    "lesson-2": {
      badge: "L2",
      nav: "تصميم الخدمات التطبيقية",
      content: [
        {
          type: "html",
          html: `<span class="lesson-pill">L2 · الدرس</span><h1 class="lesson-h1">تصميم الخدمات التطبيقية</h1><p class="lesson-lead">الخدمة ليست وعاءً لـ«منطق الأعمال». إنها عقد حول حالة استخدام — ونوع إرجاعها يجب أن يقول الحقيقة عن ما يمكن أن يحدث.</p><div class="lesson-meta-bar"><span>🧠 4 اختبارات معرفية</span><span>🧩 مقارنة عقود</span><span>⏱️ الإلغاء وغير المتزامن</span></div>`
        },
        {
          type: "h2",
          html: "ما هي الخدمة التطبيقية"
        },
        {
          type: "p",
          html: `الخدمة التطبيقية تنفّذ حالة استخدام. تنسّق العمل الذي يجب أن يؤديه التطبيق: تحميل البيانات التي تحتاجها القاعدة، وتطبيق القاعدة، وطلب من EF Core تثبيت التغيير، وإعادة نتيجة يفهمها الحدّ المستدعي. وهي <em>خاصة بالتطبيق</em> عن قصد، لا فئة مساعدة عامة.`
        },
        {
          type: "p",
          html: `بالنسبة إلى Raff، دوال الخدمة المفيدة هي أشياء مثل:`
        },
        {
          type: "list",
          ordered: false,
          items: [
            `<code>GetBookByIdAsync(int id, CancellationToken)</code> — حالة استخدام قراءة تعيد DTO أو <code>null</code>.`,
            `<code>CreateBookAsync(CreateBookDto dto, CancellationToken)</code> — تتحقق من قواعد التطبيق وتثبّت كتابًا جديدًا.`,
            `<code>DeleteBookAsync(int id, CancellationToken)</code> — تطبّق قاعدة التبعية، وتحذف، وتبلّغ بالنتيجة.`,
            `<code>PatchReadingEntryAsync(int id, PatchReadingEntryDto dto, CancellationToken)</code> — التحديث الواعي بوجود الحقل من الوحدة 4.`
          ]
        },
        {
          type: "callout",
          kind: "info",
          title: "ℹ️ أسماء الدوال جزء من التصميم",
          html: `استخدم فعلًا يطابق حالة الاستخدام وأبقِ المورد في الاسم: <code>DeleteBookAsync</code> لا <code>ProcessDataAsync</code>. إذا احتاجت الدالة إلى «و» في اسمها فقد تفعل أكثر من اللازم — أو قد تكون حالة استخدام متعددة الخطوات حقًا. يجب أن يجعل الاسم النية واضحة في الحالتين.`
        },
        {
          type: "h2",
          html: "ابنِ الخدمة حول حالة الاستخدام"
        },
        {
          type: "p",
          html: `تعتمد خدمة الكتب النموذجية على <code>BooksContext</code> عبر الحقن في المنشئ. تصف الواجهة ما يمكن للمستدعين طلبه؛ ويملك التنفيذ التتابع.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">IBookService.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">عقد توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public interface IBookService
{
    Task&lt;BookDto?&gt; GetBookByIdAsync(
        int id,
        CancellationToken cancellationToken = default);

    Task&lt;DeleteBookResult&gt; DeleteBookAsync(
        int id,
        CancellationToken cancellationToken = default);
}</code></pre><div class="code-expl">هذا عقد توضيحي وليس التصميم الصحيح الوحيد. قد يعرض تطبيق أصغر فقط الدوال التي يستخدمها فعلًا.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookService.cs — حالة استخدام قراءة</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">تنفيذ توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public sealed class BookService : IBookService
{
    private readonly BooksContext _context;

    public BookService(BooksContext context)
    {
        _context = context;
    }

    public async Task&lt;BookDto?&gt; GetBookByIdAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        return await _context.Books
            .AsNoTracking()
            .Where(b =&gt; b.Id == id)
            .Select(b =&gt; new BookDto(
                b.Id,
                b.Title,
                b.PublishedYear,
                b.Summary))
            .FirstOrDefaultAsync(cancellationToken);
    }
}</code></pre><div class="code-expl">تعيد الخدمة بيانات تطبيقية — DTO — لا كيانًا متتبعًا أو نتيجة HTTP. ويبقي الإسقاط الاستعلام مركزًا على عقد القراءة.</div></div>`
        },
        {
          type: "h2",
          html: "غير المتزامن والإلغاء والتحرير"
        },
        {
          type: "p",
          html: `يجب أن تكون خدمات التطبيق التي تلمس قاعدة البيانات غير متزامنة وأن تقبل <code>CancellationToken</code>. يتلقى الإجراء الرمز بالفعل؛ مرّره لأسفل. لا تنشئ <code>CancellationTokenSource</code> جديدًا داخل كل دالة، ولا تخزّن رمزًا في singleton.`
        },
        {
          type: "list",
          ordered: false,
          items: [
            `أعطِ الرمز قيمة افتراضية <code>default</code> في عقد الخدمة حتى يتمكن المستدعون من حذفه في الاختبارات والكود غير المرتبط بالويب.`,
            `مرّره إلى كل استدعاء غير متزامن في EF Core: <code>FirstOrDefaultAsync(ct)</code> و<code>ToListAsync(ct)</code> و<code>SaveChangesAsync(ct)</code>.`,
            `انتظر العمليات. لا تستدعِ <code>.Result</code> أو <code>.Wait()</code>.`,
            `إذا كان الفشل متوقعًا وقابلًا للاسترداد، فأعد نتيجة؛ وإذا كان غير متوقع، فاتركه ينتشر إلى الحدّ الذي يسجّله ويعيّنه.`
          ]
        },
        {
          type: "callout",
          kind: "warning",
          title: "⚠️ الإلغاء تعاوني",
          html: `تمرير الرمز يطلب من EF Core ومزوّد قاعدة البيانات التوقف عندما يكون ذلك ممكنًا. ليس ضمانًا بأن يتوقف الاستعلام فورًا. لا تلتقط <code>OperationCanceledException</code> وتحوّله إلى نتيجة ناجحة؛ اترك الإلغاء إلغاءً.`
        },
        {
          type: "h2",
          html: "اختيار عقد الإرجاع للحذف"
        },
        {
          type: "p",
          html: `لحالة استخدام الحذف عدة نتائج محتملة، ويجب أن يعرض نوع الإرجاع النتائج التي يجب على المستدعين التعامل معها. فكّر في ثلاثة خيارات شائعة:`
        },
        {
          type: "html",
          html: `<div class="table-wrapper"><table><thead><tr><th>العقد</th><th>ماذا ينقل</th><th>المقايضة</th></tr></thead><tbody>
<tr><td><code>Task&lt;bool&gt;</code></td><td>«نجح شيء أو فشل».</td><td>بسيط، لكنه لا يميّز عدم العثور من تعارض البيانات المرتبطة. ويسهل على المستدعي تجاهله أو إساءة تفسيره.</td></tr>
<tr><td><code>Task</code> مع استثناء موثّق لكتاب غير موجود</td><td>«الغياب استثنائي؛ على المستدعين التقاط هذا الاستثناء المحدد».</td><td>صريح بطريقته، ويمكن لمعالج مركزي تعيينه. لكن الاستثناءات للتدفق المتوقع قد تكون مزعجة وأسهل في الالتقاط بشكل واسع جدًا.</td></tr>
<tr><td>نوع نتيجة مثل <code>DeleteBookResult</code></td><td>«هذه هي النتائج المتوقعة؛ يمكن للمترجم مساعدتك في التعامل معها».</td><td>كود أكثر ونوع للصيانة، لكن العقد صادق وتعيين المتحكم يعبّر عن النية بشكل كامل.</td></tr>
</tbody></table></div>`
        },
        {
          type: "p",
          html: `لا يوجد فائز عالمي. يمكن لاستعلام مركز أن يعيد <code>BookDto?</code> ويستخدم <code>null</code> لـ«غير موجود» بشكل معقول. أما الحذف مع فشلين متوقعين مختلفين فهو مرشح قوي لنوع نتيجة. المفتاح هو الاختيار عن قصد واستخدام السياسة نفسها باتساق.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookService.cs — حالة استخدام الحذف</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">تنفيذ توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public async Task&lt;DeleteBookResult&gt; DeleteBookAsync(
    int id,
    CancellationToken cancellationToken = default)
{
    var book = await _context.Books
        .FirstOrDefaultAsync(b =&gt; b.Id == id, cancellationToken);

    if (book is null)
        return new DeleteBookResult(DeleteBookOutcome.NotFound);

    var entryCount = await _context.ReadingEntries
        .CountAsync(e =&gt; e.BookId == id, cancellationToken);

    if (entryCount &gt; 0)
        return new DeleteBookResult(
            DeleteBookOutcome.HasReadingEntries,
            entryCount);

    _context.Books.Remove(book);
    await _context.SaveChangesAsync(cancellationToken);

    return new DeleteBookResult(DeleteBookOutcome.Deleted);
}</code></pre><div class="code-expl">لا تخفي الخدمة التعارض المتوقع خلف <code>false</code>. تعيد المعلومات التي يحتاجها المتحكم لاختيار 204 أو 404 أو 409.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BooksController.cs — عيّن، لا تقرر</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">متحكم توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">[HttpDelete("{id:int}")]
public async Task&lt;IActionResult&gt; DeleteBook(
    int id,
    CancellationToken cancellationToken)
{
    var result = await _books.DeleteBookAsync(id, cancellationToken);
    return result.Outcome switch
    {
        DeleteBookOutcome.Deleted =&gt; NoContent(),
        DeleteBookOutcome.NotFound =&gt; NotFound(),
        DeleteBookOutcome.HasReadingEntries =&gt; Conflict(new ProblemDetails
        {
            Title = "Book has reading entries.",
            Detail = $"Remove the {result.EntryCount} reading entries first."
        }),
        _ =&gt; StatusCode(StatusCodes.Status500InternalServerError)
    };
}</code></pre><div class="code-expl">يبقى المتحكم المكان الوحيد الذي يعرف رموز حالة HTTP. ويمكن إعادة استخدام الخدمة دون إعادة كتابة تلك المعرفة.</div></div>`
        },
        {
          type: "h2",
          html: "لا تتنكّر للفشل في صورة نجاح"
        },
        {
          type: "p",
          html: `الخدمة التي تعيد <code>BookDto</code> فارغًا لكتاب غير موجود، أو <code>true</code> لحذف لم يحدث، تجبر المستدعي على التخمين. هذا أسوأ من الاستثناء لأن الفشل يصبح غير مرئي في تدفق التحكم العادي. إذا كان في الإمكان أن تفشل العملية، فمثّل الفشل في العقد.`
        },
        {
          type: "callout",
          kind: "success",
          title: "✅ قائمة تحقق العقد",
          html: `<ul style="margin-bottom:0;"><li>هل يستطيع المستدعي تمييز كل نتيجة متوقعة؟</li><li>هل يتجنب نوع الإرجاع أنواع HTTP؟</li><li>هل تُنتظر العمليات غير المتزامنة ويُنقل الإلغاء؟</li><li>هل سُمّيت الدالة على حالة الاستخدام لا على فعل عام؟</li><li>هل يختار المتحكم — لا الخدمة — رمز الحالة؟</li></ul>`
        },
        {
          type: "h2",
          html: "اختبارات معرفية"
        },
        {
          type: "html",
          html: "<div class=\"kc-mount\" data-kc-group=\"lesson-2\"></div>"
        },
        {
          type: "html",
          html: `<div class="refs-block"><div class="refs-title">المراجع الرسمية</div><ul><li><a href="https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios" target="_blank" rel="noopener noreferrer">سيناريوهات البرمجة غير المتزامنة ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection" target="_blank" rel="noopener noreferrer">حقن التبعيات في ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/ef/core/miscellaneous/async" target="_blank" rel="noopener noreferrer">البرمجة غير المتزامنة مع EF Core ↗</a></li></ul></div>`
        },
        {
          type: "html",
          html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-1">← فصل المسؤوليات</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-2">إكمال الدرس 2 ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-3">التالي: أساسيات حقن التبعيات ←</button></div>`
        }
      ]
    },
    "lesson-3": {
      badge: "L3",
      nav: "أساسيات حقن التبعيات",
      content: [
        {
          type: "html",
          html: `<span class="lesson-pill">L3 · الدرس</span><h1 class="lesson-h1">أساسيات حقن التبعيات</h1><p class="lesson-lead">حقن التبعيات ليس حيلة إطار عمل. إنه طريقة لوقف قيام الفئات ببناء المتعاونين معها بنفسها — وحاوية تبني الرسم البياني نيابة عنك.</p><div class="lesson-meta-bar"><span>🧠 4 اختبارات معرفية</span><span>🔗 التسجيل ← الحلّ</span><span>🧱 رسم الكائنات</span></div>`
        },
        {
          type: "h2",
          html: "ما هو حقن التبعيات"
        },
        {
          type: "p",
          html: `تكون لدى الفئة <strong>تبعية</strong> عندما تحتاج كائنًا آخر لأداء عملها. تعتمد <code>BookService</code> على <code>BooksContext</code>، ويعتمد <code>BooksController</code> على <code>IBookService</code>. دون حقن التبعيات، تنشئ كل فئة تبعياتها بنفسها:`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">إنشاء يدوي — اقتران محكم</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-anti-pattern">تجنّبه افتراضيًا</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public sealed class BooksController : ControllerBase
{
    private readonly BookService _books = new BookService(
        new BooksContext(new DbContextOptions&lt;BooksContext&gt;()));
}</code></pre><div class="code-expl">يُثبّت المتحكم الآن إنشاء الخدمة والسياق. تُتجاوز الإعدادات وسلاسل الاتصال والنطاقات والتحرير. هذه هي المشكلة التي يحلّها حقن التبعيات.</div></div>`
        },
        {
          type: "p",
          html: `مع حقن التبعيات، تعلن الفئة ما تحتاجه وتستقبله:`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">الحقن عبر المنشئ — النمط المعتاد</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">نمط مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public sealed class BooksController : ControllerBase
{
    private readonly IBookService _books;

    public BooksController(IBookService books)
    {
        _books = books;
    }
}</code></pre><div class="code-expl">لا يعرف المتحكم كيف تُنشأ <code>IBookService</code> ولا أي تنفيذ يستقبل. يُضبط ذلك مرة واحدة عند جذر التركيب.</div></div>`
        },
        {
          type: "h2",
          html: "قلب الاعتماد في فقرة واحدة"
        },
        {
          type: "p",
          html: `قلب الاعتماد هو مبدأ التصميم وراء النمط: يجب ألا تعتمد السياسة عالية المستوى مباشرة على التفاصيل منخفضة المستوى. يصف <code>BooksController</code> حالة استخدام؛ فلا يجب أن يعتمد على تنفيذ SQL الملموس. يمكن للمتحكم والتنفيذ معًا الاعتماد على تجريد <code>IBookService</code>. هذا لا يعني أن كل فئة تحتاج واجهة — بل يعني ألا يجبر اتجاه التبعية فئة عالية المستوى على معرفة تفاصيل الإنشاء منخفضة المستوى.`
        },
        {
          type: "callout",
          kind: "info",
          title: "ℹ️ حقن التبعيات وقلب الاعتماد مرتبطان، لكنهما ليسا الشيء نفسه",
          html: `حقن التبعيات تقنية لتزويد الكائنات. وقلب الاعتماد مبدأ تصميم يحدد اتجاه التبعيات. يمكنك استخدام حاوية دون تصميم تجريدات جيدة، ويمكنك قلب تبعية دون حاوية. يعملان معًا جيدًا، لكن لا يضمن أحدهما الآخر.`
        },
        {
          type: "h2",
          html: "الخدمة والتنفيذ والتسجيل"
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">IBookService.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">عقد توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public interface IBookService
{
    Task&lt;bool&gt; DeleteBookAsync(
        int id,
        CancellationToken cancellationToken = default);
}</code></pre><div class="code-expl">هذا العقد مبسّط قصدًا لعرض حقن التبعيات. يشرح الدرس 2 لماذا قد تكون القيمة المنطقية ضعيفة جدًا لحذف حقيقي وكيف يحسّنها نوع النتيجة.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookService.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">تنفيذ توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public sealed class BookService : IBookService
{
    private readonly BooksContext _context;

    public BookService(BooksContext context)
    {
        _context = context;
    }

    public async Task&lt;bool&gt; DeleteBookAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        var book = await _context.Books
            .FirstOrDefaultAsync(b =&gt; b.Id == id, cancellationToken);

        if (book is null)
            return false;

        _context.Books.Remove(book);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}</code></pre><div class="code-expl">التنفيذ مكتمل لهذا العقد التوضيحي. في تدفق حذف Raff الحقيقي، ستتحقق الخدمة أيضًا من مدخلات القراءة وتعيد نتيجة أغنى.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Program.cs — التسجيل</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">تسجيل مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">builder.Services.AddDbContext&lt;BooksContext&gt;(options =&gt;
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("Raff")));

builder.Services.AddScoped&lt;IBookService, BookService&gt;();

var app = builder.Build();</code></pre><div class="code-expl">يقول التسجيل للحاوية: «عندما يطلب أحدهم <code>IBookService</code> داخل نطاق، أنشئ <code>BookService</code> وحلّ وسائط منشئه أيضًا».</div></div>`
        },
        {
          type: "h2",
          html: "التسجيل مقابل الحلّ"
        },
        {
          type: "p",
          html: `<code>builder.Services</code> هو <code>IServiceCollection</code>: قائمة بواصفات الخدمات. إضافة واصف لا تنشئ كائنًا. يُنشأ المزوّد بواسطة <code>builder.Build()</code>. ويحدث الحلّ لاحقًا، إما صراحة أو لأن الحاوية تبني خدمة أخرى.`
        },
        {
          type: "html",
          html: `<div class="diagram-container">
  <div class="diagram-title">من التسجيل إلى التنفيذ</div>
  <div class="m4-stages">
    <div class="m4-stage"><div class="m4-stage-name">1 · التسجيل</div><div class="m4-stage-desc">builder.Services.AddScoped&lt;IBookService, BookService&gt;()</div></div>
    <div class="m4-stage"><div class="m4-stage-name">2 · البناء</div><div class="m4-stage-desc">ينشئ builder.Build() مزوّد الخدمات الجذري</div></div>
    <div class="m4-stage"><div class="m4-stage-name">3 · الطلب</div><div class="m4-stage-desc">يفتح طلب HTTP نطاق حقن تبعيات</div></div>
    <div class="m4-stage"><div class="m4-stage-name">4 · الحلّ</div><div class="m4-stage-desc">يطلب المتحكم IBookService؛ فتبني الحاوية الخدمة وتبعياتها</div></div>
    <div class="m4-stage"><div class="m4-stage-name">5 · التنفيذ</div><div class="m4-stage-desc">يستدعي الإجراء دالة الخدمة</div></div>
  </div>
</div>`
        },
        {
          type: "list",
          ordered: false,
          items: [
            `<strong>التسجيل</strong> إعداد. تضيف <code>AddScoped&lt;IBookService, BookService&gt;()</code> واصف <code>ServiceDescriptor</code>.`,
            `<strong>الحلّ</strong> طلب نسخة. تنفّذه <code>provider.GetRequiredService&lt;IBookService&gt;()</code> صراحة، وينفّذه الحقن عبر المنشئ ضمنيًا.`,
            `<strong>المزوّد الجذري</strong> يُنشأ عند البناء ويملك الكائنات المفردة. ونطاق الطلب نطاق فرعي يملك النسخ المحدودة النطاق.`,
            `<strong>الرسوم غير الصالحة</strong> — مثل singleton يتطلب خدمة محدودة النطاق — قد تُبلَّغ عند التحقق من النطاقات أو عند حلّ الخدمة.`
          ]
        },
        {
          type: "h2",
          html: "الواجهات: مفيدة، لكنها ليست إلزامية"
        },
        {
          type: "p",
          html: `تكون الواجهات قيمة عندما تمثّل حدًا حقيقيًا: تنفيذات متعددة، أو حدّ اختبار، أو عقدًا عامًا بين وحدات، أو تبعية تريد استبدالها فعلًا. حقن التبعيات لا يشترطها. ويمكن تسجيل فئة ملموسة مختومة مباشرة:`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">تسجيل فئة ملموسة</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">نمط مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">builder.Services.AddScoped&lt;BookService&gt;();

// يمكن للمتحكم استقبالها عبر الحقن في المنشئ:
public BooksController(BookService books)
{
    _books = books;
}</code></pre><div class="code-expl">إذا كان هناك تنفيذ واحد ولا حاجة إلى استبدال، فقد يكون هذا أبسط. أضف واجهة عندما تستحق وجودها، لا كردّ فعل تلقائي.</div></div>`
        },
        {
          type: "callout",
          kind: "warning",
          title: "⚠️ لا تحوّل الحاوية إلى محدد خدمات",
          html: `حلّ الخدمات بـ<code>serviceProvider.GetRequiredService&lt;T&gt;()</code> داخل كود الأعمال يخفي التبعيات ويصعّب الاختبار. فضّل الحقن عبر المنشئ. الوصول الصريح إلى المزوّد مناسب عند حدود البنية التحتية — عامل خلفي ينشئ نطاقًا، أو مصنع، أو جذر التركيب.`
        },
        {
          type: "h2",
          html: "متى يكون الإنشاء اليدوي مقبولًا"
        },
        {
          type: "list",
          ordered: false,
          items: [
            `<strong>DTOs وكائنات القيم والكيانات</strong> ليس لها عمر تديره الحاوية. إنشاؤها بـ<code>new</code> أمر طبيعي.`,
            `<strong>المساعدات النقية</strong> التي لا تبعيات لها يمكن أن تكون ساكنة أو تُنشأ مباشرة؛ وتغليفها بحقن التبعيات يضيف قليلًا.`,
            `<strong>الاختبارات</strong> غالبًا تبني النظام تحت الاختبار وبدائله مباشرة. هذه ميزة لا مخالفة.`,
            `<strong>جذر التركيب</strong> هو المكان الذي يُجمّع فيه الرسم البياني. وهو المكان الوحيد الذي تنتمي إليه معرفة الإنشاء.`,
            `يصبح الإنشاء اليدوي مشكلة عندما يتجاوز نطاقًا، أو يكرر الإعدادات، أو يمنع الحاوية من تحرير مورد.`
          ]
        },
        {
          type: "callout",
          kind: "success",
          title: "✅ المسار الذي يجب تذكّره",
          html: `<code>AddScoped&lt;IBookService, BookService&gt;()</code> يسجّل واصفًا ← <code>builder.Build()</code> ينشئ المزوّد ← الطلب يفتح نطاقًا ← يُبنى المتحكم ← تحلّ الحاوية <code>IBookService</code> و<code>BooksContext</code> ← يستقبلهما المنشئ ← يستدعي الإجراء الدالة.`
        },
        {
          type: "h2",
          html: "اختبارات معرفية"
        },
        {
          type: "html",
          html: "<div class=\"kc-mount\" data-kc-group=\"lesson-3\"></div>"
        },
        {
          type: "html",
          html: `<div class="refs-block"><div class="refs-title">المراجع الرسمية</div><ul><li><a href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection" target="_blank" rel="noopener noreferrer">حقن التبعيات في ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection" target="_blank" rel="noopener noreferrer">حقن التبعيات في .NET ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles" target="_blank" rel="noopener noreferrer">المبادئ المعمارية ↗</a></li></ul></div>`
        },
        {
          type: "html",
          html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-2">← تصميم الخدمات التطبيقية</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-3">إكمال الدرس 3 ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-4">التالي: أعمار الخدمات ←</button></div>`
        }
      ]
    },
    "lesson-4": {
      badge: "L4",
      nav: "أعمار الخدمات",
      content: [
        {
          type: "html",
          html: `<span class="lesson-pill">L4 · الدرس</span><h1 class="lesson-h1">أعمار الخدمات</h1><p class="lesson-lead">عابر ومحدود النطاق ومفرد تصف عدد المرات التي تنشئ فيها الحاوية نسخة. اختيار العمر الخاطئ قد يسرب الذاكرة، أو يشارك الحالة عرضًا، أو يحتجز تبعية محدودة النطاق داخل مفرد.</p><div class="lesson-meta-bar"><span>🧠 5 اختبارات معرفية</span><span>🔬 محاكي الأعمار</span><span>⚠️ التبعية الأسيرة</span></div>`
        },
        {
          type: "h2",
          html: "لماذا العمر قرار تصميمي"
        },
        {
          type: "p",
          html: `عمر الخدمة يجيب عن سؤالين: <strong>كم نسخة توجد</strong>، و<strong>من يحرّرها</strong>. تملك الحاوية تحرير الخدمات التي تنشئها. تُنشأ الخدمة العابرة عند كل عملية حلّ، والمحدودة النطاق مرة لكل نطاق حقن تبعيات، والمفردة مرة واحدة طوال عمر المزوّد.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">التسجيلات الثلاثة</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">أمثلة مكتملة</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">builder.Services.AddTransient&lt;IReportBuilder, ReportBuilder&gt;();
builder.Services.AddScoped&lt;IBookService, BookService&gt;();
builder.Services.AddSingleton&lt;IBookCache, BookCache&gt;();</code></pre><div class="code-expl">العمر جزء من التسجيل لا من الفئة. يمكن تسجيل التنفيذ نفسه بعمر مختلف، لكن لذلك الاختيار عواقب.</div></div>`
        },
        {
          type: "html",
          html: `<div class="table-wrapper"><table><thead><tr><th>العمر</th><th>إنشاء النسخة</th><th>الاستخدام المعتاد</th><th>احترس من</th></tr></thead><tbody>
<tr><td><code>Transient</code></td><td>نسخة جديدة في كل مرة تُحلّ فيها الخدمة.</td><td>مساعدات خفيفة بلا حالة؛ عمليات قصيرة العمر.</td><td>قد تنشئ عمليات الحلّ الكثيرة كائنات كثيرة؛ لا تحتجز خدمة عابرة في كائن أطول عمرًا إذا كانت تحمل موارد مكلفة أو حالة خاصة بالطلب.</td></tr>
<tr><td><code>Scoped</code></td><td>نسخة واحدة لكل نطاق حقن تبعيات، يتشاركها كل حلّ داخل ذلك النطاق.</td><td>عمل محدود النطاق بالطلب: متعاونو المتحكم، و<code>BooksContext</code>، وخدمة وحدة العمل.</td><td>لا تحلّ خدمة محدودة النطاق من المزوّد الجذري ولا تحتجزها في singleton.</td></tr>
<tr><td><code>Singleton</code></td><td>نسخة واحدة طوال عمر المزوّد الجذري — التطبيق عادة.</td><td>ذاكرات الإعدادات، والخدمات المشتركة بلا حالة، والبنية التحتية المكلفة والآمنة للاستخدام المتزامن.</td><td>يجب أن تكون الحالة المتغيرة المشتركة آمنة للاستخدام المتزامن؛ singleton لا يعني «آمن للاستخدام المتزامن».</td></tr>
</tbody></table></div>`
        },
        {
          type: "p",
          html: `في طلب ASP.NET Core العادي، ينشئ الإطار نطاق حقن تبعيات حول الطلب. لهذا يمكن مشاركة <code>BooksContext</code> المحدود النطاق بين المتحكم والخدمات التي يستدعيها أثناء الطلب، ولهذا يُحرَّر عند انتهاء الطلب.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">معنى «لكل نطاق» في الكود</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">مقطع توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">using var scope = app.Services.CreateScope();

var first = scope.ServiceProvider.GetRequiredService&lt;IBookService&gt;();
var second = scope.ServiceProvider.GetRequiredService&lt;IBookService&gt;();

// first و second هما النسخة نفسها في تسجيل محدود النطاق.
// النطاق الجديد ينتج نسخة مختلفة.</code></pre><div class="code-expl"><code>app.Services</code> هو المزوّد الجذري. إنشاء نطاق صراحة هو طريقة حصول العمال الخلفيين ومضيفات الطرفية على عمر لكل عملية خارج طلب HTTP.</div></div>`
        },
        {
          type: "callout",
          kind: "info",
          title: "ℹ️ محدود النطاق يعني «لكل نطاق»، لا «لكل طلب» سحريًا",
          html: `ينشئ ASP.NET Core نطاقًا واحدًا لكل طلب في نموذج الاستضافة العادي، لذا فإن «محدود النطاق = لكل طلب» اختصار مفيد. القاعدة الدقيقة هي <strong>نسخة واحدة لكل نطاق حقن تبعيات</strong>. العامل الخلفي الذي لا ينشئ نطاقًا ليس لديه نطاق طلب أصلًا — وحلّ خدمة محدودة النطاق من الجذر خطأ.`
        },
        {
          type: "h2",
          html: "محاكي الأعمار"
        },
        {
          type: "p",
          html: `استخدم المحاكي لبناء الحدس. حلّ الخدمة عدة مرات داخل نطاق واحد، ثم أنشئ نطاقًا جديدًا وحلّ مجددًا. راقب تسميات النسخ لا الأعداد فقط.`
        },
        {
          type: "html",
          html: `<div class="simulator-widget" data-widget="lifetimes" id="w-lifetimes"><div class="simulator-header"><div class="simulator-title">🔬 محاكي الأعمار</div><div class="m4-mode-note" style="margin-top:0;">بدّل التسجيل، وحلّ بشكل متكرر، وقارن النسخ بين النطاقات.</div></div><div class="simulator-body"></div></div>`
        },
        {
          type: "callout",
          kind: "info",
          title: "ℹ️ هذه محاكاة تعليمية",
          html: `يحاكي المحاكي هوية النسخة لكل عمر. وهو لا يقيس التخصيص الحقيقي أو جمع البيانات المهملة أو ذاكرات المزوّد الداخلية. التسميات ثابتة لتتمكن من مقارنة عمليات الحلّ؛ وليست هويات كائنات إنتاجية.`
        },
        {
          type: "h2",
          html: "اختيار العمر"
        },
        {
          type: "list",
          ordered: false,
          items: [
            `<strong>Transient</strong> عندما تكون الخدمة خفيفة وبلا حالة ورخيصة الإنشاء؛ ويمكن لكل مستهلك الحصول على نسخته بأمان.`,
            `<strong>Scoped</strong> عندما تحمل الخدمة حالة خاصة بالعملية — وأشهرها <code>DbContext</code> في EF Core وخدمات التطبيق التي تنسّق عمل طلب واحد.`,
            `<strong>Singleton</strong> عندما تكون نسخة مشتركة واحدة مقصودة فعلًا: الإعدادات، أو ذاكرة تتحكم في تزامنها، أو بنية تحتية آمنة للاستخدام المتزامن.`,
            `<strong>لا تختر عمرًا لتختفي أخطاء التبعية.</strong> تحويل خدمة محدودة النطاق إلى مفردة قد يحوّل خطأ تحقق إلى خطأ صحة.`
          ]
        },
        {
          type: "callout",
          kind: "warning",
          title: "⚠️ singleton ليس ضمانًا للسلامة المتزامنة",
          html: `يُبنى singleton مرة واحدة، لكن يمكن أن تستخدمه طلبات كثيرة بالتزامن. إذا احتوى حقولًا متغيرة أو <code>List&lt;T&gt;</code> أو قاموسًا أو <code>DbContext</code>، فهذه الأعضاء مشتركة. إما أن تجعل الحالة آمنة للاستخدام المتزامن، أو تتجنب الحالة المشتركة المتغيرة، أو تختار عمرًا مختلفًا.`
        },
        {
          type: "h2",
          html: "التحرير والملكية"
        },
        {
          type: "p",
          html: `تحرّر الحاوية الخدمات التي تنفّذ <code>IDisposable</code> أو <code>IAsyncDisposable</code> عند انتهاء نطاقها. وهذا سبب آخر لعدم إنشاء خدمة محدودة النطاق يدويًا وتخزينها في مكان ما: قد لا تعرف الحاوية نسختك، وقد لا يحرّرها أحد.`
        },
        {
          type: "p",
          html: `يجمع الدرس 5 هذه القواعد في أصعب حالة شائعة: singleton يحتاج إلى الوصول إلى البيانات.`
        },
        {
          type: "h2",
          html: "اختبارات معرفية"
        },
        {
          type: "html",
          html: "<div class=\"kc-mount\" data-kc-group=\"lesson-4\"></div>"
        },
        {
          type: "html",
          html: `<div class="refs-block"><div class="refs-title">المراجع الرسمية</div><ul><li><a href="https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/service-lifetimes" target="_blank" rel="noopener noreferrer">أعمار الخدمات في حقن تبعيات .NET ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection" target="_blank" rel="noopener noreferrer">حقن التبعيات في ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/guidelines" target="_blank" rel="noopener noreferrer">إرشادات حقن التبعيات ↗</a></li></ul></div>`
        },
        {
          type: "html",
          html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-3">← أساسيات حقن التبعيات</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-4">إكمال الدرس 4 ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-5">التالي: عمر DbContext والعمل الخلفي ←</button></div>`
        }
      ]
    },
    "lesson-5": {
      badge: "L5",
      nav: "عمر DbContext والعمل الخلفي",
      content: [
        {
          type: "html",
          html: `<span class="lesson-pill">L5 · الدرس</span><h1 class="lesson-h1">عمر DbContext والتبعيات الأسيرة والخدمات الخلفية</h1><p class="lesson-lead">خطأ عمر واحد يسبب حصة كبيرة من أخطاء حقن التبعيات في الإنتاج: احتجاز singleton لخدمة محدودة النطاق. ويجعل <code>DbContext</code> في EF Core هذا الخطأ مكلفًا خصوصًا.</p><div class="lesson-meta-bar"><span>🧠 5 اختبارات معرفية</span><span>🕸️ تمرين رسم التبعيات</span><span>🧵 عمال خلفيون</span></div>`
        },
        {
          type: "h2",
          html: "DbContext وحدة عمل محدودة النطاق"
        },
        {
          type: "p",
          html: `يسجّل <code>AddDbContext&lt;BooksContext&gt;()</code> السياق <strong>محدود النطاق</strong> افتراضيًا. وهذا يطابق تصميمه: يتتبع السياق الكيانات لوحدة عمل واحدة، ويترجم الاستعلامات، ويحفظ التغييرات. وهو غير آمن للاستخدام المتزامن، وغير مصمم للعيش طوال عمر التطبيق.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Program.cs — التسجيل المعتاد</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">تسجيل مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">builder.Services.AddDbContext&lt;BooksContext&gt;(options =&gt;
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("Raff")));</code></pre><div class="code-expl">محدود النطاق افتراضيًا: سياق واحد لكل نطاق حقن تبعيات. وفي طلب ويب، يغلّف هذا النطاق الطلب عادة.</div></div>`
        },
        {
          type: "p",
          html: `يعمل السياق المحدود النطاق جيدًا عندما يشارك المتحكم والخدمة والمستودع في نطاق الطلب نفسه. ويصبح خطرًا عندما يحتفظ به كائن أطول عمرًا.`
        },
        {
          type: "h2",
          html: "التبعية الأسيرة"
        },
        {
          type: "p",
          html: `تخيّل ذاكرة كتب مفردة تحمّل بيانات الكتب. الحقن الواضح عبر المنشئ هو الخطأ:`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookCacheService.cs — تبعية أسيرة</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-anti-pattern">نمط مضاد</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public sealed class BookCacheService
{
    private readonly BooksContext _context;

    public BookCacheService(BooksContext context)
    {
        _context = context; // ❌ خدمة محدودة النطاق محتجزة في singleton
    }
}

builder.Services.AddSingleton&lt;BookCacheService&gt;();</code></pre><div class="code-expl">يعيش singleton طوال عمر التطبيق؛ بينما يُفترض أن يعيش السياق لنطاق واحد. يحتفظ singleton الآن بالنسخة المحدودة النطاق بعد انتهاء نطاقها بكثير — وهذه <strong>تبعية أسيرة</strong>.</div></div>`
        },
        {
          type: "callout",
          kind: "warning",
          title: "⚠️ ما قد تبلّغ به الحاوية",
          html: `عند تمكين التحقق من النطاقات — في بيئة التطوير عادة — يرمي المزوّد <code>InvalidOperationException</code> مثل «Cannot consume scoped service 'BooksContext' from singleton 'BookCacheService'». إذا كان التحقق معطلًا، فقد يُبنى الرسم البياني ويظهر الخطأ لاحقًا كأخطاء سياق محرَّر أو كيانات متتبعة قديمة أو إخفاقات تزامن.`
        },
        {
          type: "p",
          html: `الاسم «أسير» حرفي: يحتجز الكائن الأطول عمرًا الكائن الأقصر عمرًا. الحل ليس تحويل السياق إلى singleton، بل جعل الكائن الأطول عمرًا ينشئ أو يستقبل سياقًا بالعمر الصحيح لكل عملية.`
        },
        {
          type: "h2",
          html: "الحل 1: إنشاء نطاق لكل عملية"
        },
        {
          type: "p",
          html: `يمكن لـ singleton الاعتماد على <code>IServiceScopeFactory</code>، وهو نفسه singleton. ولكل عملية ينشئ نطاقًا، ويحلّ الخدمات المحدودة النطاق منه، ويحرّر النطاق عند الانتهاء.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookCacheService.cs — نطاق لكل عملية</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">نمط مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public sealed class BookCacheService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public BookCacheService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public async Task&lt;BookDto?&gt; GetAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        await using var scope = _scopeFactory.CreateAsyncScope();
        var context = scope.ServiceProvider
            .GetRequiredService&lt;BooksContext&gt;();

        return await context.Books
            .AsNoTracking()
            .Where(b =&gt; b.Id == id)
            .Select(b =&gt; new BookDto(b.Id, b.Title, b.PublishedYear, b.Summary))
            .FirstOrDefaultAsync(cancellationToken);
    }
}</code></pre><div class="code-expl">النطاق يملك السياق. أما singleton فلا يملك سياقًا إطلاقًا — بل المصنع القادر على إنشاء سياق محدود النطاق بشكل صحيح. ويدعم <code>CreateAsyncScope()</code> التحرير غير المتزامن.</div></div>`
        },
        {
          type: "h2",
          html: "الحل 2: استخدام IDbContextFactory"
        },
        {
          type: "p",
          html: `عندما تكون الحاجة الأساسية «إنشاء سياق جديد عند الطلب»، فإن <code>IDbContextFactory&lt;TContext&gt;</code> تجريد مركّز. سجّله بـ<code>AddDbContextFactory</code>؛ فالمصنع آمن لاعتماد singleton عليه لأنه ينشئ ويعيد سياقًا جديدًا عند كل استدعاء.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Program.cs — تسجيل المصنع</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">تسجيل مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">builder.Services.AddDbContextFactory&lt;BooksContext&gt;(options =&gt;
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("Raff")));</code></pre><div class="code-expl">يسجّل هذا <code>IDbContextFactory&lt;BooksContext&gt;</code> كـ singleton، ويسجّل <code>BooksContext</code> أيضًا كمحدود النطاق للمستهلكين العاديين. استخدم المصنع عندما تحتاج سياقات صريحة قصيرة العمر.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookCacheService.cs — سياق منشأ من المصنع</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">نمط مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public sealed class BookCacheService
{
    private readonly IDbContextFactory&lt;BooksContext&gt; _factory;

    public BookCacheService(IDbContextFactory&lt;BooksContext&gt; factory)
    {
        _factory = factory;
    }

    public async Task&lt;BookDto?&gt; GetAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        await using var context = await _factory
            .CreateDbContextAsync(cancellationToken);

        return await context.Books
            .AsNoTracking()
            .Where(b =&gt; b.Id == id)
            .Select(b =&gt; new BookDto(b.Id, b.Title, b.PublishedYear, b.Summary))
            .FirstOrDefaultAsync(cancellationToken);
    }
}</code></pre><div class="code-expl">يُنشأ السياق لهذه العملية ويُحرَّر في نهاية الدالة. ولا يحتجزه singleton أبدًا.</div></div>`
        },
        {
          type: "h2",
          html: "الحل 3: نقل العمل إلى عملية محدودة النطاق"
        },
        {
          type: "p",
          html: `أحيانًا لا يكون الخطأ الحقيقي في الحقن، بل في عمر الكائن الذي يؤدّي العمل. إذا كانت الذاكرة تحتاج سياقًا جديدًا عند كل بحث، فربما يجب أن تكون الذاكرة نفسها محدودة النطاق، أو ينتقل الوصول إلى البيانات إلى خدمة محدودة النطاق يستدعيها singleton عبر نطاق. لا تفرض شكل singleton على عمل بطبيعته لكل عملية.`
        },
        {
          type: "h2",
          html: "الخدمات الخلفية كائنات مفردة"
        },
        {
          type: "p",
          html: `يُسجَّل <code>BackgroundService</code> كخدمة مستضافة وهو فعليًا singleton. وحقن <code>BooksContext</code> أو <code>IBookService</code> المحدود النطاق في المنشئ ينشئ التبعية الأسيرة نفسها. أنشئ نطاقًا داخل <code>ExecuteAsync</code> لكل وحدة عمل.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">OverdueReadingWorker.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">عامل توضيحي مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public sealed class OverdueReadingWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger&lt;OverdueReadingWorker&gt; _logger;

    public OverdueReadingWorker(
        IServiceScopeFactory scopeFactory,
        ILogger&lt;OverdueReadingWorker&gt; logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await using var scope = _scopeFactory.CreateAsyncScope();
                var service = scope.ServiceProvider
                    .GetRequiredService&lt;IReadingService&gt;();

                await service.MarkOverdueAsync(stoppingToken);
            }
            catch (OperationCanceledException)
                when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Overdue reading sweep failed.");
            }

            await Task.Delay(TimeSpan.FromHours(6), stoppingToken);
        }
    }
}</code></pre><div class="code-expl">يبقى العامل طوال عمر التطبيق؛ وتحصل كل دورة على نطاق جديد وخدمة/سياق محدود النطاق جديد. هذا هو النمط القياسي لا حلًا بديلًا.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Program.cs — تسجيل العامل</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">تسجيل مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">builder.Services.AddHostedService&lt;OverdueReadingWorker&gt;();</code></pre><div class="code-expl">تبدأ الخدمات المستضافة مع المضيف وتتوقف عند إيقافه. وهي ليست محدودة النطاق بالطلب.</div></div>`
        },
        {
          type: "callout",
          kind: "warning",
          title: "⚠️ التقط الاستثناءات بعناية في عامل طويل العمر",
          html: `قد يؤدي استثناء غير معالَج في <code>ExecuteAsync</code> إلى إيقاف المضيف، بحسب إصدار .NET وإعدادات الاستضافة. التقط الاستثناءات في كل دورة، وسجّل الفشل، واحترم الإلغاء. لا تلتقط <code>OperationCanceledException</code> كخطأ عادي عندما يكون الإيقاف هو من طلب الإلغاء.`
        },
        {
          type: "h2",
          html: "تمرين رسم التبعيات"
        },
        {
          type: "p",
          html: `يعرض كل سيناريو رسمًا لأعمار الخدمات. قرّر ما إذا كان آمنًا، ثم اختر التصحيح إن لم يكن كذلك. اقرأ الحواف بعناية: المشكلة ليست دائمًا في الخدمة المذكورة في الخطأ.`
        },
        {
          type: "html",
          html: `<div class="simulator-widget" data-widget="dependency-graph" id="w-dependency-graph"><div class="simulator-header"><div class="simulator-title">🕸️ تمرين رسم التبعيات</div><div class="m4-mode-note" style="margin-top:0;">أربعة رسوم. اعثر على الحافة الأسيرة أو غير الآمنة واختر أصغر إصلاح آمن.</div></div><div class="simulator-body"></div></div>`
        },
        {
          type: "h2",
          html: "اختبارات معرفية"
        },
        {
          type: "html",
          html: "<div class=\"kc-mount\" data-kc-group=\"lesson-5\"></div>"
        },
        {
          type: "html",
          html: `<div class="refs-block"><div class="refs-title">المراجع الرسمية</div><ul><li><a href="https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/" target="_blank" rel="noopener noreferrer">إعداد DbContext وعمره ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/core/extensions/workers" target="_blank" rel="noopener noreferrer">خدمات العامل في .NET ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/guidelines" target="_blank" rel="noopener noreferrer">إرشادات حقن التبعيات ↗</a></li></ul></div>`
        },
        {
          type: "html",
          html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-4">← أعمار الخدمات</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-5">إكمال الدرس 5 ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-6">التالي: المستودعات ووحدة العمل ←</button></div>`
        }
      ]
    },
    "lesson-6": {
      badge: "L6",
      nav: "المستودعات ووحدة العمل",
      content: [
        {
          type: "html",
          html: `<span class="lesson-pill">L6 · الدرس</span><h1 class="lesson-h1">المستودعات ووحدة العمل</h1><p class="lesson-lead">المستودع حدّ حول الوصول إلى البيانات. وهو مفيد عندما يبسّط التطبيق — لا عندما يخفي قاعدة البيانات خلف واجهة عامة ويجعل كل استعلام أصعب.</p><div class="lesson-meta-bar"><span>🧠 4 اختبارات معرفية</span><span>🧱 مستودع مركّز</span><span>📦 مقايضات وحدة العمل</span></div>`
        },
        {
          type: "h2",
          html: "DbContext مستودع ووحدة عمل أصلًا"
        },
        {
          type: "p",
          html: `يعرض <code>DbContext</code> في EF Core جذور استعلام <code>DbSet&lt;T&gt;</code>، ويتتبع التغييرات، ويثبّتها بـ<code>SaveChangesAsync</code>. بهذا المعنى فهو يجمع أصلًا سطح استعلام شبيهًا بالمستودع مع حدّ وحدة عمل. وإضافة طبقة أخرى قرار تصميمي لا شرط.`
        },
        {
          type: "p",
          html: `في تطبيق صغير، غالبًا يكون حقن <code>BooksContext</code> مباشرة في خدمة تطبيق أوضح خيار. يمكن للخدمة استخدام LINQ والإسقاطات و<code>Include</code> والمعاملات دون أن يعترضها غلاف. الثمن ظهور أنواع EF Core في الخدمة — وهذا مقبول عادة في تطبيق ASP.NET Core مبني قصدًا على EF Core.`
        },
        {
          type: "h2",
          html: "ما يضيفه المستودع المركّز"
        },
        {
          type: "p",
          html: `يسمّي المستودع المركّز عمليات الوصول إلى البيانات التي يحتاجها التطبيق فعلًا. ويمكنه تركيز شكل استعلام، أو جعل تفصيل استمرارية قابلًا للاستبدال، أو إبقاء قاعدة وصول معقدة في مكان واحد.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">IBookRepository.cs — مركّز، لا عام</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">عقد توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public interface IBookRepository
{
    Task&lt;BookDto?&gt; GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default);

    Task&lt;int&gt; CountReadingEntriesAsync(
        int bookId,
        CancellationToken cancellationToken = default);

    void Remove(Book book);
}</code></pre><div class="code-expl">تتحدث الواجهة بمصطلحات التطبيق: قراءة مسقطة، وعدد تحتاجه قاعدة الحذف، وإزالة. وهي لا تحاول عرض كل عملية في EF Core.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookRepository.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">تنفيذ توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public sealed class BookRepository : IBookRepository
{
    private readonly BooksContext _context;

    public BookRepository(BooksContext context)
    {
        _context = context;
    }

    public Task&lt;BookDto?&gt; GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        return _context.Books
            .AsNoTracking()
            .Where(b =&gt; b.Id == id)
            .Select(b =&gt; new BookDto(b.Id, b.Title, b.PublishedYear, b.Summary))
            .FirstOrDefaultAsync(cancellationToken);
    }

    public Task&lt;int&gt; CountReadingEntriesAsync(
        int bookId,
        CancellationToken cancellationToken = default)
    {
        return _context.ReadingEntries
            .CountAsync(e =&gt; e.BookId == bookId, cancellationToken);
    }

    public void Remove(Book book) =&gt; _context.Books.Remove(book);
}</code></pre><div class="code-expl">المستودع محدود النطاق لأنه يعتمد على السياق المحدود النطاق. وهو لا يستدعي <code>SaveChangesAsync</code>؛ فالتثبيت مهمة وحدة العمل.</div></div>`
        },
        {
          type: "p",
          html: `يمكن للخدمة الآن الاعتماد على المستودع للقراءات والإزالة، مع بقاء اعتمادها على السياق — أو على تجريد وحدة عمل — للتثبيت:`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookService.cs — مستودع مع التثبيت</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">مقطع توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public async Task&lt;DeleteBookResult&gt; DeleteBookAsync(
    int id,
    CancellationToken cancellationToken = default)
{
    var book = await _context.Books
        .FirstOrDefaultAsync(b =&gt; b.Id == id, cancellationToken);

    if (book is null)
        return new DeleteBookResult(DeleteBookOutcome.NotFound);

    var entryCount = await _books.CountReadingEntriesAsync(id, cancellationToken);
    if (entryCount &gt; 0)
        return new DeleteBookResult(
            DeleteBookOutcome.HasReadingEntries, entryCount);

    _books.Remove(book);
    await _context.SaveChangesAsync(cancellationToken);
    return new DeleteBookResult(DeleteBookOutcome.Deleted);
}</code></pre><div class="code-expl">خلط المستودع لبعض العمليات مع السياق لأخرى قد يكون انتقالًا معقولًا، لكنه قد يكون غير متسق أيضًا. قرّر أي حدّ تستخدمه الخدمة وأبقه متماسكًا.</div></div>`
        },
        {
          type: "callout",
          kind: "info",
          title: "ℹ️ المستودع المركّز لا يجعل EF Core يختفي",
          html: `لا يزال التنفيذ يستخدم EF Core، ولا تزال الخدمة تعتمد على السياق للكيان المتتبع والتثبيت. هذا طبيعي. إذا كان الهدف إزالة كل نوع EF Core من طبقة التطبيق، فاستخدم تجريد استمرارية كاملًا باتساق — واقبل ما يجلبه من تعيين إضافي وقيود على الاستعلامات.`
        },
        {
          type: "h2",
          html: "لماذا تضر المستودعات العامة غالبًا"
        },
        {
          type: "p",
          html: `يبدو <code>IRepository&lt;T&gt;</code> العام مع <code>GetAll</code> و<code>GetById</code> و<code>Add</code> و<code>Update</code> و<code>Delete</code> مرتبًا، لكنه ينشئ مشكلات جديدة عادة:`
        },
        {
          type: "list",
          ordered: false,
          items: [
            `<strong>استعلامات متسربة.</strong> يحتاج المستدعون إلى التصفية والإسقاط و<code>Include</code> والترتيب والتقسيم. إما أن تغفلها الواجهة العامة أو تسرّب <code>IQueryable&lt;T&gt;</code>، وهذا يلغي التجريد.`,
            `<strong>عقود ضعيفة.</strong> «Update» يخفي ما إذا كان الكيان متتبعًا، وما إذا كان التزامن يُفحص، وأي الحقول قد تتغير.`,
            `<strong>عمر وسلوك موحّدان قسرًا.</strong> استعلام كتاب وكتابة سجل تدقيق نادرًا ما يتشاركان دلالات مفيدة.`,
            `<strong>قابلية استبدال زائفة.</strong> استبدال قاعدة بيانات علائقية بمخزن آخر نادرًا ما يكون تبديلًا مباشرًا لمجرد وجود واجهة عامة.`,
            `<strong>سطح أكبر للاختبار والصيانة.</strong> يصبح الغلاف غالبًا ORM ثانيًا أقل قدرة.`
          ]
        },
        {
          type: "p",
          html: `قد يكون المستودع العام مبررًا في إطار عمل أو نطاق مستقل عن الاستمرارية قصدًا. وفي تطبيق ASP.NET Core + EF Core عادي، يكون المستودع المركّز أو استخدام <code>DbContext</code> مباشرة أبسط وأصدق عادة.`
        },
        {
          type: "h2",
          html: "وحدة العمل: صريحة أم مدمجة؟"
        },
        {
          type: "p",
          html: `تجمع وحدة العمل التغييرات التي يجب تثبيتها معًا. و<code>DbContext.SaveChangesAsync</code> هو حدّ التثبيت هذا أصلًا للكيانات التي يتتبعها. تحتاج إلى تجريد صريح لوحدة العمل عندما يجب أن تشارك عدة مستودعات أو مصادر بيانات في معاملة واحدة، أو عندما يجب ألا ترى طبقة التطبيق <code>DbContext</code> إطلاقًا.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">وحدة عمل صريحة — فقط عندما تستحق</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">عقد توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public interface IUnitOfWork
{
    Task&lt;int&gt; SaveChangesAsync(
        CancellationToken cancellationToken = default);
}

public sealed class EfUnitOfWork : IUnitOfWork
{
    private readonly BooksContext _context;

    public EfUnitOfWork(BooksContext context)
    {
        _context = context;
    }

    public Task&lt;int&gt; SaveChangesAsync(
        CancellationToken cancellationToken = default)
    {
        return _context.SaveChangesAsync(cancellationToken);
    }
}</code></pre><div class="code-expl">هذا التجريد رفيع. وهو مفيد عندما يجب ألا تشير خدمات التطبيق إلى <code>DbContext</code>، أو عندما تنسّق وحدة العمل أكثر من مستودع. وإلا فقد يكون مجرد طقوس.</div></div>`
        },
        {
          type: "html",
          html: `<div class="table-wrapper"><table><thead><tr><th>السيناريو</th><th>الافتراضي المعقول</th><th>السبب</th></tr></thead><tbody>
<tr><td>واجهة Raff صغيرة، وEF Core هو خيار الاستمرارية</td><td>حقن <code>BooksContext</code> في خدمات التطبيق</td><td>أقل طبقات، وتعبيرية استعلام كاملة، ووحدة عمل واحدة واضحة.</td></tr>
<tr><td>شكل استعلام معاد استخدامه ومعقد</td><td>دالة مستودع مركّزة</td><td>تسمّي حاجة البيانات وتبقي الاستعلام في مكان واحد.</td></tr>
<tr><td>عدة مستودعات يجب أن تثبّت معاملة واحدة</td><td>وحدة عمل صريحة أو حدّ معاملة</td><td>يجب أن ينسّق التثبيت أكثر من كائن وصول بيانات.</td></tr>
<tr><td>يجب أن يكون النطاق مستقلًا عن الاستمرارية</td><td>واجهات مستودعات مع تعيين</td><td>للتجريد غرض معماري حقيقي، وله تكاليف حقيقية.</td></tr>
<tr><td>«قد نستبدل قاعدة البيانات يومًا ما»</td><td>EF Core مباشرة عادة</td><td>نادرًا ما تغطي قابلية الاستبدال التخمينية تكلفة التجريد؛ والهجرة الحقيقية ستتطلب تغييرات حقيقية على أي حال.</td></tr>
</tbody></table></div>`
        },
        {
          type: "callout",
          kind: "success",
          title: "✅ قاعدة القرار",
          html: `أضف مستودعًا عندما يجعل كود التطبيق أوضح أو يعزل حدًا حقيقيًا. لا تضفه لمجرد أن درسًا يقول إن كل كيان يحتاج مستودعًا. أفضل تجريد هو الذي يزيل تعقيدًا أكثر مما يضيف.`
        },
        {
          type: "h2",
          html: "اختبارات معرفية"
        },
        {
          type: "html",
          html: "<div class=\"kc-mount\" data-kc-group=\"lesson-6\"></div>"
        },
        {
          type: "html",
          html: `<div class="refs-block"><div class="refs-title">المراجع الرسمية</div><ul><li><a href="https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/" target="_blank" rel="noopener noreferrer">إعداد DbContext وعمره ↗</a></li><li><a href="https://learn.microsoft.com/en-us/ef/core/saving/transactions" target="_blank" rel="noopener noreferrer">المعاملات في EF Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design" target="_blank" rel="noopener noreferrer">تصميم طبقة الاستمرارية التحتية ↗</a></li></ul></div>`
        },
        {
          type: "html",
          html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-5">← عمر DbContext والعمل الخلفي</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-6">إكمال الدرس 6 ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-7">التالي: تحدي إعادة الهيكلة ←</button></div>`
        }
      ]
    },
    "lesson-7": {
      badge: "L7",
      nav: "تحدي إعادة الهيكلة",
      content: [
        {
          type: "html",
          html: `<span class="lesson-pill">L7 · تدريب</span><h1 class="lesson-h1">تحدي إعادة الهيكلة: من فوضى المتحكم إلى خدمة تطبيق</h1><p class="lesson-lead">هذه إعادة الهيكلة العملية في الوحدة. ابدأ بمتحكم يعمل لكنه يملك أكثر مما ينبغي، واستخرج حالة الاستخدام، وأصلح تبعيات العمر والوقت، وتأكد من أن عقد HTTP لم يتغير.</p><div class="lesson-meta-bar"><span>🧠 4 اختبارات معرفية</span><span>🧩 تلميحات تدريجية</span><span>✅ حل مكتمل واختبارات</span></div>`
        },
        {
          type: "h2",
          html: "السيناريو"
        },
        {
          type: "p",
          html: `لدى Raff نقطة نهاية تبدأ مدخل قراءة للمستخدم الحالي. ينجح الإجراء الحالي في اختبار المسار السعيد، لكنه يصل مباشرة إلى <code>BooksContext</code>، ويملك قاعدة التكرار، ويقرأ الساعة مباشرة، ويعيد كيانًا متتبعًا. أعد هيكلته بحيث تعيش حالة الاستخدام في خدمة تطبيق مع بقاء عقد HTTP كما هو.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">ReadingEntriesController.cs — نقطة البداية</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-anti-pattern">أعد هيكلتي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">[HttpPost("{bookId:int}/reading-entries")]
public async Task&lt;IActionResult&gt; StartReading(
    int bookId,
    CancellationToken cancellationToken)
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrWhiteSpace(userId))
        return Unauthorized();

    var book = await _context.Books
        .Include(b =&gt; b.ReadingEntries)
        .FirstOrDefaultAsync(b =&gt; b.Id == bookId, cancellationToken);

    if (book is null)
        return NotFound();

    if (book.ReadingEntries.Any(e =&gt; e.UserId == userId))
        return Conflict(new ProblemDetails
        {
            Title = "Reading entry already exists."
        });

    var entry = new ReadingEntry
    {
        BookId = bookId,
        UserId = userId,
        CurrentPage = 0,
        StartedAt = DateTime.UtcNow
    };

    _context.ReadingEntries.Add(entry);
    await _context.SaveChangesAsync(cancellationToken);

    return CreatedAtAction(
        nameof(GetEntry),
        new { id = entry.Id },
        entry);
}</code></pre><div class="code-expl">يعمل الإجراء لطلب واحد. لكنه يملك شكل الاستمرارية وقاعدة التكرار والوقت وتعيين الاستجابة. يجب أن تنقل إعادة الهيكلة حالة الاستخدام دون تغيير المسار أو رموز الحالة أو شكل جسم الاستجابة الذي يعتمد عليه العملاء.</div></div>`
        },
        {
          type: "callout",
          kind: "info",
          title: "ℹ️ ما يجب ألا يتغير",
          html: `العقد العام: <code>POST /api/books/{bookId}/reading-entries</code>، و401 للطلب غير المصادق، و404 للكتاب المفقود، و409 للمدخل المكرر، و201 مع المدخل المنشأ عند النجاح. البنية الداخلية حرة في التغيير؛ أما السلوك المرصود فليس كذلك.`
        },
        {
          type: "h2",
          html: "تلميحات تدريجية"
        },
        {
          type: "html",
          html: `<details class="hint-details"><summary>تلميح 1 — سمِّ حالة الاستخدام ونتائجها</summary><div class="hint-body"><p>حالة الاستخدام هي «بدء قراءة كتاب لمستخدم». نتائجها المتوقعة هي <strong>بدأ</strong>، و<strong>الكتاب غير موجود</strong>، و<strong>يقرأ بالفعل</strong>. يبقى فشل المصادقة اهتمامًا بحدّ HTTP لأنه يحدث قبل استدعاء حالة الاستخدام.</p><p>أنشئ <code>IReadingService</code> بدالة واحدة:</p><pre><code class="language-cs">Task&lt;StartReadingResult&gt; StartReadingAsync(
    int bookId,
    string userId,
    CancellationToken cancellationToken = default);</code></pre><p>استخدم نوع نتيجة بدلًا من إرجاع <code>bool</code> أو نتيجة MVC.</p></div></details>`
        },
        {
          type: "html",
          html: `<details class="hint-details"><summary>تلميح 2 — انقل الاستعلام والقاعدة</summary><div class="hint-body"><p>يجب أن تتحقق الخدمة من وجود الكتاب، ومن وجود مدخل لهذا المستخدم بالفعل، وتنشئ الكيان، وتحفظه، وتعيد DTO. ويجب أن يستخرج المتحكم معرف المستخدم، ويستدعي الخدمة، ويعيّن النتائج إلى رموز حالة.</p><p>لا تعد <code>ReadingEntry</code> المتتبع من الخدمة. اسقط أو عيّن إلى DTO ليكون عقد الاستجابة صريحًا.</p></div></details>`
        },
        {
          type: "html",
          html: `<details class="hint-details"><summary>تلميح 3 — اجعل الوقت قابلًا للحقن وسجّل الخدمة</summary><div class="hint-body"><p>استبدل <code>DateTime.UtcNow</code> بـ<code>TimeProvider</code> محقون حتى يمكن اختبار سلوك وقت الخدمة بشكل حتمي. سجّل الخدمة كمحدودة النطاق لأنها تعتمد على <code>BooksContext</code> المحدود النطاق.</p><pre><code class="language-cs">builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddScoped&lt;IReadingService, ReadingService&gt;();</code></pre></div></details>`
        },
        {
          type: "html",
          html: `<details class="hint-details"><summary>تلميح 4 — فكّر في التسابق ثم تحقق</summary><div class="hint-body"><p>التحقق ثم الإدراج ليس ضمانًا للتزامن. يمكن لطلبين أن يريا «لا مدخل» ويدرجا كليهما. أضف فهرسًا فريدًا في قاعدة البيانات على <code>(BookId, UserId)</code> وعيّن انتهاك القيد الفريد إلى نتيجة 409 نفسها.</p><p>تحقق من 201 و404 و409 و401 بطلبات HTTP حقيقية. واستخدم قاعدة بيانات علائقية حقيقية لاختبار القيد — فـ EF Core InMemory لا يفرض الفهارس الفريدة أو القيود العلائقية.</p></div></details>`
        },
        {
          type: "h2",
          html: "الحل المكتمل"
        },
        {
          type: "p",
          html: `عرّف عقد النتيجة وDTO أولًا. تسجّل النتيجة نتائج التطبيق المتوقعة؛ ويعرّف DTO ما تعيده نقطة النهاية.`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">StartReadingResult.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">حل مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public enum StartReadingOutcome
{
    Started,
    BookNotFound,
    AlreadyReading
}

public sealed record StartReadingResult(
    StartReadingOutcome Outcome,
    ReadingEntryDto? Entry = null);

public sealed record ReadingEntryDto(
    int Id,
    int BookId,
    string UserId,
    int CurrentPage,
    DateTimeOffset StartedAt);</code></pre><div class="code-expl">لا تذكر النتيجة HTTP. وDTO هو عقد الاستجابة، لذا لا يهرب الكيان وخصائص التنقل الخاصة به إلى خارج حدّ الاستمرارية.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">IReadingService.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">حل مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public interface IReadingService
{
    Task&lt;StartReadingResult&gt; StartReadingAsync(
        int bookId,
        string userId,
        CancellationToken cancellationToken = default);
}</code></pre><div class="code-expl">تصف الواجهة حالة استخدام تطبيقية لا عملية HTTP. المصادقة حُلّت بالفعل في المتحكم قبل استدعاء هذه الدالة.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">ReadingService.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">حل مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public sealed class ReadingService : IReadingService
{
    private readonly BooksContext _context;
    private readonly TimeProvider _clock;

    public ReadingService(BooksContext context, TimeProvider clock)
    {
        _context = context;
        _clock = clock;
    }

    public async Task&lt;StartReadingResult&gt; StartReadingAsync(
        int bookId,
        string userId,
        CancellationToken cancellationToken = default)
    {
        var bookExists = await _context.Books
            .AnyAsync(b =&gt; b.Id == bookId, cancellationToken);

        if (!bookExists)
            return new StartReadingResult(StartReadingOutcome.BookNotFound);

        var alreadyReading = await _context.ReadingEntries
            .AnyAsync(
                e =&gt; e.BookId == bookId &amp;&amp; e.UserId == userId,
                cancellationToken);

        if (alreadyReading)
            return new StartReadingResult(StartReadingOutcome.AlreadyReading);

        var entry = new ReadingEntry
        {
            BookId = bookId,
            UserId = userId,
            CurrentPage = 0,
            StartedAt = _clock.GetUtcNow()
        };

        _context.ReadingEntries.Add(entry);
        await _context.SaveChangesAsync(cancellationToken);

        var dto = new ReadingEntryDto(
            entry.Id,
            entry.BookId,
            entry.UserId,
            entry.CurrentPage,
            entry.StartedAt);

        return new StartReadingResult(StartReadingOutcome.Started, dto);
    }
}</code></pre><div class="code-expl">تملك الخدمة حالة الاستخدام. تستخدم استعلامًا للوجود بدلًا من تحميل كل مدخلات القراءة للكتاب، وتعيد DTO. والساعة المحقونة تجعل الطابع الزمني حتميًا في الاختبارات.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">ReadingEntriesController.cs — بعد</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">حل مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">[HttpPost("{bookId:int}/reading-entries")]
public async Task&lt;IActionResult&gt; StartReading(
    int bookId,
    CancellationToken cancellationToken)
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrWhiteSpace(userId))
        return Unauthorized();

    var result = await _readings.StartReadingAsync(
        bookId, userId, cancellationToken);

    return result.Outcome switch
    {
        StartReadingOutcome.Started when result.Entry is not null =&gt;
            CreatedAtAction(
                nameof(GetEntry),
                new { id = result.Entry.Id },
                result.Entry),

        StartReadingOutcome.BookNotFound =&gt; NotFound(),

        StartReadingOutcome.AlreadyReading =&gt; Conflict(new ProblemDetails
        {
            Title = "Reading entry already exists."
        }),

        _ =&gt; StatusCode(StatusCodes.Status500InternalServerError)
    };
}</code></pre><div class="code-expl">يملك المتحكم الآن استخراج الهوية وتعيين HTTP. وهو لا يعرف كيف تُنفَّذ قاعدة التكرار، ولا يمكنه إعادة كيان متتبع بالخطأ.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Program.cs — التسجيل</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">حل مكتمل</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddScoped&lt;IReadingService, ReadingService&gt;();</code></pre><div class="code-expl">العمران مقصودان. الساعة singleton بلا حالة؛ وخدمة القراءة محدودة النطاق لأنها تستخدم <code>BooksContext</code> المحدود النطاق.</div></div>`
        },
        {
          type: "h2",
          html: "إغلاق فجوة التزامن"
        },
        {
          type: "p",
          html: `لا يزال تحقق الخدمة «تحققًا ثم تصرّفًا». والفهرس الفريد هو ضمان مستوى قاعدة البيانات. أضفه إلى إعداد النموذج وعالج الانتهاك:`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BooksContext.cs — فهرس فريد</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">مقطع توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">modelBuilder.Entity&lt;ReadingEntry&gt;()
    .HasIndex(e =&gt; new { e.BookId, e.UserId })
    .IsUnique();</code></pre><div class="code-expl">يمنع الفهرس مدخلين للمستخدم والكتاب نفسيهما حتى عند تسابق طلبين. ويظل تحقق الخدمة يعطي 409 ودية في الحالة الشائعة؛ أما القيد فيعالج التسابق.</div></div>`
        },
        {
          type: "p",
          html: `لمسار التسابق، التقط <code>DbUpdateException</code> عندما يبلّغ المزوّد عن انتهاك فريد وأعد <code>AlreadyReading</code>. في PostgreSQL رمز SQLSTATE لانتهاك التفرد هو <code>23505</code>؛ افحص تفاصيل استثناء المزوّد بدلًا من التعامل مع كل فشل قاعدة بيانات كتكرار.`
        },
        {
          type: "h2",
          html: "الاختبارات والتحقق"
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BooksControllerTests.cs — اختبار تعيين ببديل</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">اختبار توضيحي</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-cs">public sealed class FakeReadingService : IReadingService
{
    public StartReadingResult Result { get; set; } =
        new(StartReadingOutcome.BookNotFound);

    public Task&lt;StartReadingResult&gt; StartReadingAsync(
        int bookId,
        string userId,
        CancellationToken cancellationToken = default)
    {
        return Task.FromResult(Result);
    }
}

public sealed class ReadingEntriesControllerTests
{
    [Fact]
    public async Task StartReading_ReturnsConflict_WhenAlreadyReading()
    {
        var service = new FakeReadingService
        {
            Result = new StartReadingResult(StartReadingOutcome.AlreadyReading)
        };
        var controller = new ReadingEntriesController(service);

        var result = await controller.StartReading(7, CancellationToken.None);

        var conflict = Assert.IsType&lt;ConflictObjectResult&gt;(result);
        var problem = Assert.IsType&lt;ProblemDetails&gt;(conflict.Value);
        Assert.Equal("Reading entry already exists.", problem.Title);
    }
}</code></pre><div class="code-expl">يفحص هذا الاختبار تعيين HTTP بمعزل عن غيره. وهو لا يثبت قاعدة قاعدة البيانات؛ فذلك يحتاج اختبار تكامل ضد قاعدة بيانات علائقية.</div></div>`
        },
        {
          type: "html",
          html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">raff-module-05.http — فحوص العقد</span><span class="code-badge-group"><span class="code-lang-tag">http</span><span class="code-type-pill pill-complete">طلبات توضيحية</span><button class="btn-copy" type="button" aria-label="نسخ الكود">نسخ</button></span></div><pre><code class="language-http">### بدء القراءة — توقع 201 Created
POST http://localhost:5000/api/books/1/reading-entries
Authorization: Bearer {{token}}

### البدء مجددًا — توقع 409 Conflict
POST http://localhost:5000/api/books/1/reading-entries
Authorization: Bearer {{token}}

### كتاب مفقود — توقع 404 Not Found
POST http://localhost:5000/api/books/999999/reading-entries
Authorization: Bearer {{token}}

### بلا رمز — توقع 401 Unauthorized
POST http://localhost:5000/api/books/1/reading-entries</code></pre><div class="code-expl">استخدم قاعدة PostgreSQL حقيقية لهذه الفحوص. أضف اختبار تكامل يرسل طلبين متزامنين ويؤكد 201 واحدة و409 واحدة فقط؛ فهذا ما يثبت الفهرس الفريد ومعالجة التسابق.</div></div>`
        },
        {
          type: "callout",
          kind: "success",
          title: "✅ قائمة مراجعة إعادة الهيكلة",
          html: `<ul style="margin-bottom:0;"><li>هل يستخرج المتحكم الهوية ويعيّن النتائج فقط؟</li><li>هل تملك الخدمة القاعدة وتسلسل الاستمرارية؟</li><li>هل الوقت محقون بدلًا من قراءته من ساكن؟</li><li>هل الخدمة محدودة النطاق لتطابق السياق؟</li><li>هل الاستجابة DTO بدلًا من كيان متتبع؟</li><li>هل قاعدة التكرار محمية بفهرس فريد لا بفحص فقط؟</li><li>هل لا تزال 401/404/409/201 متطابقة من منظور العميل؟</li></ul>`
        },
        {
          type: "h2",
          html: "اختبارات معرفية"
        },
        {
          type: "html",
          html: "<div class=\"kc-mount\" data-kc-group=\"lesson-7\"></div>"
        },
        {
          type: "html",
          html: `<div class="refs-block"><div class="refs-title">المراجع الرسمية</div><ul><li><a href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection" target="_blank" rel="noopener noreferrer">حقن التبعيات في ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/ef/core/modeling/indexes" target="_blank" rel="noopener noreferrer">الفهارس والقيود الفريدة في EF Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/service-lifetimes" target="_blank" rel="noopener noreferrer">أعمار الخدمات في حقن تبعيات .NET ↗</a></li></ul></div>`
        },
        {
          type: "html",
          html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-6">← المستودعات ووحدة العمل</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-7">إكمال الدرس 7 ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-assessment">التالي: التقييم النهائي ←</button></div>`
        }
      ]
    },
    "lesson-assessment": {
      badge: "🎓",
      nav: "التقييم النهائي",
      content: [
        {
          type: "html",
          html: `<span class="lesson-pill">🎓 التقييم النهائي</span><h1 class="lesson-h1">تقييم الوحدة</h1><p class="lesson-lead">أربعة عشر سؤالًا تغطي الوحدة. حدّ النجاح الافتراضي 80% ويمكن ضبطه إلى 70% أو 90% قبل البدء. كل نتيجة ترتبط بالدرس الذي يملك الموضوع.</p><div class="lesson-meta-bar"><span>🧠 14 سؤالًا</span><span>🎯 حدّ نجاح قابل للضبط</span><span>📊 تفصيل حسب الموضوع</span></div>`
        },
        {
          type: "html",
          html: `<div class="assessment-intro" id="assessment-intro">
  <div class="content-panel">
    <h3 style="margin-top:0;">📋 قبل أن تبدأ</h3>
    <ul>
      <li>تغطي الأسئلة الدروس 1–7. يمكنك إعادة التقييم؛ وتُحتسب أفضل نتيجة في تقدمك.</li>
      <li>حدّ النجاح الافتراضي 80% ويمكن ضبطه إلى 70% / 80% / 90%.</li>
      <li>تربط المراجعة بعد الإرسال كل سؤال فائت بالدرس الذي يملكه.</li>
      <li>تُخزَّن الإجابات والنتائج محليًا مع بقية تقدمك وتنتقل معه عند التصدير.</li>
    </ul>
    <div class="assessment-config-row">
      <label for="assessment-threshold">حدّ النجاح:</label>
      <select id="assessment-threshold" class="assessment-select">
        <option value="70">70%</option>
        <option value="80" selected>80%</option>
        <option value="90">90%</option>
      </select>
      <button class="btn-primary" id="btn-start-assessment" type="button">بدء التقييم ▶</button>
    </div>
  </div>
</div>`
        },
        {
          type: "html",
          html: `<div class="assessment-questions" id="assessment-questions" hidden></div>`
        },
        {
          type: "html",
          html: `<div class="assessment-actions" id="assessment-actions" hidden>
  <button class="btn-primary" id="btn-submit-assessment" type="button">إرسال التقييم</button>
  <button class="btn-secondary" id="btn-retry-assessment" type="button" hidden>إعادة التقييم ↺</button>
</div>`
        },
        {
          type: "html",
          html: `<div class="assessment-results" id="assessment-results"></div>`
        },
        {
          type: "html",
          html: `<div class="lesson-footer-nav">
  <button class="btn-secondary" type="button" data-nav-target="lesson-7">← تحدي إعادة الهيكلة</button>
  <button class="btn-secondary" type="button" data-nav-target="lesson-1">العودة إلى الأعلى ↑</button>
</div>`
        }
      ]
    }
  },
  knowledgeChecks: {
    "kc-1-1": {
      prompt: "أي من هذه المسؤوليات ينتمي إلى المتحكم بدلًا من الخدمة التطبيقية؟",
      options: [
        "التحقق مما إذا كان الكتاب ما زال لديه مدخلات قراءة",
        "تعيين نتيجة `NotFound` إلى استجابة 404",
        "تحميل كتاب وحذفه كحالة استخدام واحدة",
        "فرض فهرس فريد على جدول مدخلات القراءة"
      ],
      explain: "المتحكم مسؤول عن ترجمة HTTP: قراءة الطلب، واستدعاء حالة الاستخدام، وتعيين نتائج التطبيق إلى رموز الحالة. التحقق من الوجود قاعدة عمل، والفهرس الفريد قيد على قاعدة البيانات."
    },
    "kc-1-2": {
      prompt: "لماذا يجب ألا تعيد الخدمة التطبيقية عادة `IActionResult`؟",
      options: [
        "لأن C# لا يسمح بذلك خارج المتحكم",
        "لأنه يربط حالة الاستخدام بتفاصيل HTTP ويجعل إعادة استخدام الخدمة واختبارها أصعب",
        "لأن `IActionResult` لا يمكن انتظاره",
        "لأنه يمنع حقن التبعيات"
      ],
      explain: "الخدمة التي تعيد IActionResult تعرف رموز حالة HTTP وتنسيق الاستجابة. إبعاد HTTP يتيح استدعاء حالة الاستخدام نفسها من متحكم أو عامل خلفي أو اختبار دون محاكاة أنواع الويب."
    },
    "kc-1-3": {
      prompt: "تقول قاعدة إنه لا يمكن حذف كتاب ما دامت مدخلات القراءة موجودة. أين تنتمي هذه القاعدة أساسًا؟",
      options: [
        "في إجراء المتحكم",
        "في خدمة تطبيقية، مع قيد قاعدة بيانات كشبكة أمان",
        "في سمة تحقق على DTO",
        "في البرمجيات الوسيطة"
      ],
      explain: "تحتاج القاعدة إلى بيانات حالية، لذا هي قاعدة تطبيق/عمل. المفتاح الأجنبي المقيّد هو الضمان البنيوي الذي يظل ساريًا إذا تسابق طلبان. والمتحكم يعيّن النتيجة إلى HTTP."
    },
    "kc-1-4": {
      prompt: "ما أفضل سبب لإدخال خدمة تطبيقية؟",
      options: [
        "أن إجراء المتحكم أطول من عشرة أسطر",
        "أن حالة الاستخدام تحتوي تنسيقًا أو قواعد عمل تستحق اسمًا واختبارًا",
        "أن كل إجراء يجب أن يفوض إلى خدمة",
        "لتجنب كتابة الواجهات"
      ],
      explain: "الطول وحده إشارة ضعيفة. تستحق الخدمة مكانها عندما تسمّي حالة استخدام حقيقية، وتملك قواعد أو تنسيقًا، وتمنحك حدًا ذا معنى للاختبار. الأغلفة الصغيرة التي تمرر الاستدعاءات غالبًا تضيف طبقة بلا قيمة."
    },
    "kc-2-1": {
      prompt: "تعيد `Task<bool> DeleteBookAsync` القيمة `false`. ماذا تعني `false`؟",
      options: [
        "لم يُعثر على الكتاب",
        "فشل الحذف لأي سبب",
        "العقد غامض: قد تعني عدم العثور أو فشلًا متوقعًا آخر",
        "قاعدة البيانات غير متصلة"
      ],
      explain: "للقيمة المنطقية حالتان، لكن حالة استخدام الحذف قد يكون لها عدة نتائج متوقعة. إذا احتاج المستدعي إلى إرجاع 404 لكتاب غير موجود و409 لبيانات مرتبطة، فلا تستطيع `false` نقل الفرق. يجب أن يعبّر نوع الإرجاع عن العقد."
    },
    "kc-2-2": {
      prompt: "للبحث عن كتاب واحد، ماذا يعني `Task<BookDto?>` عندما يعيد `null`؟",
      options: [
        "حدث استثناء غير متوقع",
        "لم يُعثر على الكتاب المطلوب، بشرط أن يوثّق العقد هذا المعنى",
        "فشل الطلب في التحقق",
        "قاعدة البيانات غير متصلة"
      ],
      explain: "النتيجة القابلة للعدم عقد معقول لعملية بحث: إما أن يوجد الكتاب أو لا يوجد. ويعيّن المتحكم `null` إلى 404. وهي أقل ملاءمة عندما يكون لحالة الاستخدام عدة نتائج فشل يمكن تمييزها."
    },
    "kc-2-3": {
      prompt: "من أين يجب أن يأتي `CancellationToken` الخاص بالخدمة؟",
      options: [
        "إنشاء CancellationTokenSource جديد داخل كل دالة خدمة",
        "استقباله من المستدعي وتمريره إلى عمليات EF Core مثل FirstOrDefaultAsync وSaveChangesAsync",
        "تجاهله لأن EF Core لا يدعم الإلغاء",
        "تخزينه في singleton حتى تستخدمه كل الطلبات"
      ],
      explain: "يستقبل الإجراء رمز إلغاء من إطار العمل. مرّره عبر الخدمة إلى الإدخال/الإخراج غير المتزامن حتى يتوقف العمل عند انقطاع العميل. لا تنشئ مصدر رمز جديدًا لكل دالة، ولا تشارك رمزًا واحدًا عبر singleton."
    },
    "kc-2-4": {
      prompt: "أي عبارة عن حالات الفشل المتوقعة هي الأدق؟",
      options: [
        "يجب أن تكون استثناءات دائمًا",
        "يمكن أن تكون قيمًا أو استثناءات؛ اختر سياسة واحدة ووثّقها وعيّنها عند حدود HTTP",
        "يجب أن تعيد 200 مع جسم فارغ",
        "يجب ابتلاعها حتى يستطيع المستدعي إعادة المحاولة"
      ],
      explain: "يمكن أن يعمل الأسلوبان. قيم النتائج تجعل النتائج المتوقعة صريحة وقابلة للتحقق من المترجم؛ والاستثناءات قد تكون مناسبة عندما يملك معالج مركزي التعيين. الأهم هو الاتساق وعدم إخفاء الفشل خلف قيم تبدو كنجاح."
    },
    "kc-3-1": {
      prompt: "ماذا يفعل `builder.Services.AddScoped<IBookService, BookService>()`؟",
      options: [
        "ينشئ `BookService` فورًا",
        "يسجّل واصف خدمة؛ وتنشئ الحاوية نسخة عندما تُحلّ الخدمة",
        "يحلّ الخدمة من المزوّد الجذري",
        "يبدأ خيطًا خلفيًا"
      ],
      explain: "التسجيل يضيف واصفًا إلى IServiceCollection فقط. يُبنى المزوّد لاحقًا، وتُنشأ النسخ عندما يطلب شيء الخدمة — مباشرة أو لأن الحاوية تبني خدمة أخرى."
    },
    "kc-3-2": {
      prompt: "كيف يحصل الحقن عبر المنشئ على تبعيات الفئة؟",
      options: [
        "تستدعي الفئة `new` داخل منشئها",
        "تقرأ الحاوية توقيع المنشئ وتوفّر الخدمات المسجّلة عند بناء الكائن",
        "يقرأها المتحكم من HttpContext",
        "تبحث عنها دالة مصنع ساكنة بالاسم"
      ],
      explain: "تفحص الحاوية المنشئ، وتحلّ كل معامل من رسم الخدمات، وتمرّر النسخ. لهذا يكون تسجيل كل تبعية جزءًا من جعل رسم الكائنات يعمل."
    },
    "kc-3-3": {
      prompt: "متى تكون الواجهة غير ضرورية على الأرجح للخدمة؟",
      options: [
        "عندما يوجد تنفيذ واحد ولا حاجة إلى استبدال أو محاكاة أو حدّ اختبار",
        "عندما تكون الفئة sealed دائمًا",
        "عندما تستخدم الخدمة EF Core",
        "عندما تكون الخدمة محدودة النطاق"
      ],
      explain: "تكون الواجهات ذات قيمة عندما توفر حدًا حقيقيًا: تنفيذات متعددة، أو حدّ اختبار، أو عقدًا مستقرًا بين الوحدات. تسجيل فئة sealed ملموسة مباشرة قد يكون أبسط عندما لا توجد هذه الحاجة."
    },
    "kc-3-4": {
      prompt: "أين يكون إنشاء التبعيات يدويًا باستخدام `new` أنسب؟",
      options: [
        "داخل كل إجراء متحكم",
        "في جذر التركيب، أو لكائنات القيمة والكيانات البسيطة",
        "داخل singleton لإنشاء خدمات محدودة النطاق",
        "في أي مساعد ساكن يحتاج قاعدة بيانات"
      ],
      explain: "جذر التركيب يملك بناء الكائنات. و`new` طبيعي أيضًا للكائنات البسيطة التي لا تملك عمرًا تديره الحاوية، مثل DTOs وكائنات القيمة والكيانات. أما بناء الخدمات يدويًا فيتجاوز النطاق والتحرير."
    },
    "kc-4-1": {
      prompt: "خدمة مسجّلة كعابرة. حُلّت مرة واحدة واستُدعيت إحدى دوالها ثلاث مرات. كم نسخة أنشأتها استدعاءات الدوال تلك؟",
      options: [
        "ثلاث نسخ",
        "نسخة واحدة — العابر يتحكم في الحلّ، لا في استدعاءات الدوال الفردية",
        "صفر",
        "يعتمد على رمز حالة HTTP"
      ],
      explain: "العابر يعني إنشاء نسخة جديدة عمومًا كلما حُلّت الخدمة من الحاوية. استدعاء الدوال على نسخة تملكها بالفعل لا يحلّها مجددًا، لذا تستخدم الاستدعاءات الثلاثة الكائن نفسه."
    },
    "kc-4-2": {
      prompt: "حُلّت خدمة محدودة النطاق مرتين في النطاق A ومرتين في النطاق B. كم نسخة مميزة توجد؟",
      options: [
        "نسخة واحدة",
        "نسختان — واحدة لكل نطاق",
        "أربع نسخ",
        "ثلاث نسخ"
      ],
      explain: "إعادة الاستخدام المحدودة تخص نطاق حقن التبعيات، لا التطبيق كله ولا كل عملية حلّ. العمليتان في النطاق A تتشاركان نسخة واحدة، وللنطاق B نسخته. وفي ASP.NET Core يقابل النطاق عادة طلبًا واحدًا."
    },
    "kc-4-3": {
      prompt: "كيف يجب وصف عمر singleton؟",
      options: [
        "نسخة واحدة لكل طلب HTTP",
        "نسخة واحدة لكل نطاق حقن تبعيات",
        "نسخة واحدة لكل مزوّد خدمات جذري، أي عمر التطبيق عادة",
        "نسخة جديدة عند كل عملية حلّ"
      ],
      explain: "تعيش نسخ singleton مع المزوّد الجذري. تنشئ الحاوية النسخة الأولى وتعيد استخدامها. وهذا لا يقول شيئًا عن سلامة استخدام الخدمة تزامنيًا — فسلامة الخيوط مسؤولية الخدمة نفسها."
    },
    "kc-4-4": {
      prompt: "هل تسجيل خدمة كـ singleton يجعلها آمنة للاستخدام المتزامن؟",
      options: [
        "نعم، الحاوية تسلسل كل الاستدعاءات",
        "لا — العمر يتحكم في إعادة استخدام النسخة، لا في الوصول المتزامن أو الحالة الداخلية",
        "فقط في ASP.NET Core",
        "فقط إذا استخدمت BooksContext"
      ],
      explain: "حقن التبعيات يدير الأعمار، لا التزامن. الكائن المفرد الذي تتشاركه طلبات كثيرة يجب أن يُصمم للاستخدام المتزامن: تجنّب الحالة المتغيرة الخاصة بالطلب، واستخدم مجموعات آمنة أو مزامنة عند الحاجة، وأبقه بلا حالة قدر الإمكان."
    },
    "kc-4-5": {
      prompt: "أي عمر هو الافتراضي الطبيعي لخدمة تطبيقية مرتبطة بالطلب وتعتمد على `BooksContext`؟",
      options: [
        "عابر",
        "محدود النطاق",
        "مفرد",
        "أي عمر؛ الاختيار بلا أثر"
      ],
      explain: "الخدمة التي تعتمد على DbContext محدود النطاق يجب أن تتشارك النطاق نفسه عادة. تسجيلها كمحدودة النطاق يجعلها تعيش وتُحرَّر مع نطاق الطلب، بما يطابق عمر السياق وتحريره."
    },
    "kc-5-1": {
      prompt: "بأي عمر يسجّل `AddDbContext<BooksContext>()` السياق عادة؟",
      options: [
        "مفرد",
        "محدود النطاق",
        "عابر",
        "كخدمة مستضافة"
      ],
      explain: "تسجيل DbContext الافتراضي محدود النطاق. يناسب وحدة العمل المعتادة المرتبطة بالطلب: سياق واحد لكل نطاق طلب، يُحرَّر عند انتهاء النطاق. ويُستخدم AddDbContextFactory عندما تكون هناك حاجة إلى سياقات مستقلة."
    },
    "kc-5-2": {
      prompt: "منشئ خدمة مفردة يتطلب `BooksContext` محدود النطاق. ماذا يسمى هذا النمط؟",
      options: [
        "تحسينًا صالحًا",
        "تبعية أسيرة — عدم توافق في الأعمار",
        "تبعية عابرة",
        "وحدة عمل"
      ],
      explain: "يُبنى الكائن المفرد من النطاق الجذري ويُبقي السياق حيًا طوال عمر التطبيق. التبعية أسيرة: تعيش أطول بكثير من نطاقها المقصود، وقد تتسبب في حالة قديمة وغير آمنة تحت الطلبات المتزامنة."
    },
    "kc-5-3": {
      prompt: "ما التصحيح الصحيح لـ `BackgroundService` مفرد يحتاج إلى الاستعلام باستخدام `BooksContext`؟",
      options: [
        "حقن `BooksContext` مباشرة في الخدمة الخلفية",
        "إنشاء نطاق باستخدام `IServiceScopeFactory`، وحلّ السياق داخله، وتحرير النطاق بعد وحدة العمل",
        "تسجيل `BooksContext` كـ singleton",
        "تعطيل التحقق من النطاقات"
      ],
      explain: "الخدمة المستضافة كائن مفرد، لذا تنشئ نطاقًا صريحًا لكل وحدة عمل. تُحلّ الخدمات المحدودة النطاق — بما فيها DbContext — داخل ذلك النطاق وتُحرَّر معه. جعل السياق مفردًا أو تعطيل التحقق يخفي الخطأ بدل إصلاحه."
    },
    "kc-5-4": {
      prompt: "عند إنشاء `BooksContext` باستخدام `IDbContextFactory<BooksContext>`، من يحرّره؟",
      options: [
        "المصنع يحرّره تلقائيًا بعد كل استعلام",
        "أنت — عادة باستخدام `await using` أو `using` حول وحدة العمل",
        "المزوّد الجذري يحرّره عند إيقاف التطبيق",
        "لا أحد؛ DbContext غير قابل للتحرير"
      ],
      explain: "ينشئ المصنع سياقًا خارج إدارة الحاوية لكل نطاق. كودك يملك عمره، لذا غلّفه بـ `await using` (أو `using`) ودعه يُحرَّر عند انتهاء وحدة العمل."
    },
    "kc-5-5": {
      prompt: "لماذا لا يجوز أن ينفّذ `DbContext` واحد استعلامين متزامنين؟",
      options: [
        "لأنه مسجّل كمحدود النطاق",
        "لأنه غير آمن للاستخدام المتزامن ومتتبع التغييرات لديه غير مصمم للعمليات المتزامنة",
        "لأن PostgreSQL يمنع الاستعلامات المتزامنة",
        "لأن حقن التبعيات يمنع ذلك"
      ],
      explain: "نسخة DbContext غير آمنة للاستخدام المتزامن. انتظار عمليتين على النسخة نفسها في الوقت نفسه قد يفسد الحالة أو يرمي استثناءً. إذا وجب تنفيذ العمل بالتوازي، فأعطِ كل عملية سياقًا خاصًا — غالبًا عبر مصنع."
    },
    "kc-6-1": {
      prompt: "أي نوع في EF Core يوفّر سلوك وحدة العمل أصلًا؟",
      options: [
        "DbSet<T>",
        "DbContext",
        "IQueryable<T>",
        "ILogger<T>"
      ],
      explain: "يتتبع DbContext التغييرات ويثبّتها باستخدام SaveChanges/SaveChangesAsync، وهذا دور وحدة العمل. ويوفّر DbSet وصولًا شبيهًا بالمستودع إلى مجموعة كيانات، لكن السياق ينسّق وحدة العمل."
    },
    "kc-6-2": {
      prompt: "متى يكون تجريد المستودع المركّز مبررًا؟",
      options: [
        "دائمًا؛ يجب تغليف كل وصول إلى DbSet",
        "عندما يغلّف استعلامات ذات معنى أو يعزل حدّ الاستمرارية لحاجة ملموسة",
        "في تطبيقات وحدة التحكم فقط",
        "عندما تريد إخفاء كل قدرات EF Core"
      ],
      explain: "يستحق المستودع المركّز مكانه عندما يسمّي استعلامات حقيقية ويركّزها، أو يدعم حاجة استبدال حقيقية، أو يعزل الاستمرارية لحدّ معماري. أما الغلاف الآلي حول كل DbSet فيضيف قليلًا عادة."
    },
    "kc-6-3": {
      prompt: "ما التكلفة الشائعة للمستودع العام؟",
      options: [
        "يجعل SQL ينفّذ أسرع",
        "قد يخفي تركيب الاستعلامات والإسقاطات وقدرات EF الخاصة خلف واجهة ذات قاسم مشترك أدنى",
        "يلغي الحاجة إلى DbContext",
        "يزيل الحاجة إلى حقن التبعيات"
      ],
      explain: "لا تستطيع واجهة CRUD العامة عرض كل ميزة مفيدة في EF Core. عندما تحتاج حالة الاستخدام إلى تركيب أو إسقاطات أو Include أو AsNoTracking أو تحديثات جماعية، فإن التجريد العام إما يسرب هذه المفاهيم أو يفرض مخارج غير ملائمة."
    },
    "kc-6-4": {
      prompt: "ماذا يوفّر عادة إضافة `IUnitOfWork` مخصص يغلّف `DbContext.SaveChangesAsync` فقط؟",
      options: [
        "معاملات موزعة مضمونة",
        "طبقة وسيطة إضافية ما لم يوفر فائدة ملموسة؛ فـ DbContext يثبّت وحدة العمل أصلًا",
        "شرطًا من EF Core",
        "بديلًا عن المستودعات"
      ],
      explain: "وحدة العمل التي تمرر الاستدعاء لا تضيف سلوكًا معاملاتيًا جديدًا. يمكن تبريرها عندما تنسّق آليات استمرارية متعددة أو تحدد حدًا تطبيقيًا مقصودًا، أما تغليف SaveChanges لمجرد التغليف فيضيف طقوسًا غالبًا."
    },
    "kc-7-1": {
      prompt: "ما أفضل خطوة أولى في إعادة هيكلة إجراء متحكم؟",
      options: [
        "إنشاء واجهة مستودع عامة",
        "تحديد حالة الاستخدام وسرد المسؤوليات الموجودة حاليًا في الإجراء",
        "نقل كل الكود إلى مساعد ساكن",
        "إضافة ذاكرة مؤقتة مفردة للكتب"
      ],
      explain: "تبدأ إعادة الهيكلة بالفهم لا بالنمط. اسرد ما يفعله الإجراء — الربط والتخويل وقواعد العمل والاستمرارية وتعيين الاستجابة — ثم قرر أي المسؤوليات يجب أن تنتقل خلف حدّ الخدمة."
    },
    "kc-7-2": {
      prompt: "يعتمد `BookService` على `BooksContext`. أي عمر يجب أن يستخدمه عادة؟",
      options: [
        "مفرد",
        "محدود النطاق، بما يطابق نطاق السياق",
        "عابر مع سياق ساكن",
        "لا حاجة إلى تسجيل"
      ],
      explain: "يجب أن تتشارك الخدمة نطاق الطلب مع تبعيتها المحدودة النطاق. سجّلها باستخدام AddScoped حتى تُبنى وتُحرَّر داخل النطاق نفسه الذي يعيش فيه DbContext."
    },
    "kc-7-3": {
      prompt: "بعد إعادة الهيكلة، أين يجب أن يعيش اختيار حالة HTTP؟",
      options: [
        "في الخدمة، بإرجاع IActionResult",
        "في المتحكم، بتعيين نتائج الخدمة إلى استجابات HTTP",
        "في BooksContext",
        "في سمات التحقق الخاصة بـ DTO"
      ],
      explain: "يجب أن تعبّر الخدمة عن نتائج التطبيق مثل Deleted أو NotFound أو HasReadingEntries. ويملك المتحكم تعيين HTTP: 204 أو 404 أو 409. هذا يبقي حالة الاستخدام مستقلة عن وسيلة النقل."
    },
    "kc-7-4": {
      prompt: "تتحقق الخدمة من مدخلات القراءة وتعيد تعارضًا، لكن طلبًا آخر يُدخل مدخلًا فورًا بعد ذلك. ما الذي يبقى شبكة الأمان؟",
      options: [
        "لا شيء؛ التحقق كافٍ دائمًا",
        "المفتاح الأجنبي المقيّد في قاعدة البيانات، ويجب تعيين فشله دون ابتلاعه",
        "إرجاع 200 مع تحذير",
        "تعطيل القيد أثناء الحذف"
      ],
      explain: "تنتج عمليات التحقق التطبيقية نتائج ودية، بينما تحمي قيود قاعدة البيانات الصحة تحت التزامن. أبقِ الاثنين، والتقط فشل القيد المتوقع عند الحدّ، وسجّله، وعيّنه إلى 409 بدل إخفائه."
    }
  },
  assessmentQuestions: {
    "as-1": {
      prompt: "يتحقق إجراء متحكم مما إذا كان لدى الكتاب مدخلات قراءة قبل حذفه. أي مسؤولية يؤديها هنا ويجب أن تملكها الخدمة عادة؟",
      options: [
        "تنسيق استجابة HTTP",
        "قاعدة تطبيق/عمل تحتاج إلى بيانات حالية",
        "مطابقة المسار",
        "تسلسل JSON"
      ],
      explain: "عمليات التحقق من الوجود والتبعية تحتاج إلى بيانات حالية وتعبّر عن قاعدة حالة استخدام. يجب أن يستدعي المتحكم حالة الاستخدام ويعيّن نتيجتها؛ أما الاستمرارية وتنسيق القواعد فينتميان خلف حدّ الخدمة."
    },
    "as-2": {
      prompt: "لماذا يعد `Task<bool>` عقدًا ضعيفًا لحذف كتاب؟",
      options: [
        "لأن Boolean لا يمكن انتظاره",
        "لأنه لا يميّز بين كتاب غير موجود وبيانات مرتبطة أو فشل متوقع آخر",
        "لأنه يفرض على الخدمة إرجاع IActionResult",
        "لأنه يمنع الإلغاء"
      ],
      explain: "قد يكون لحالة استخدام الحذف عدة نتائج ذات معنى. تجمع القيمة المنطقية بينها في true/false، فلا يستطيع المتحكم الاختيار بين 204 و404 و409 دون تخمين."
    },
    "as-3": {
      prompt: "ما الميزة الرئيسية لكائن النتيجة على الاستثناء المرمي في حالة 'الكتاب غير موجود' المتوقعة؟",
      options: [
        "أنه أسرع دائمًا",
        "أن النتائج المتوقعة جزء من توقيع الدالة ويمكن التعامل معها بتدفق تحكم عادي",
        "أنه يلغي الحاجة إلى التسجيل",
        "أنه يجعل قاعدة البيانات اختيارية"
      ],
      explain: "نوع النتيجة يوثّق أنماط الفشل المتوقعة ويتيح للمترجم مساعدة المستدعي في التعامل معها. يمكن أن تظل الاستثناءات سياسة صالحة، لكن النتائج المتوقعة لا يجب إخفاؤها أو استخدامها في تدفق التحكم دون اصطلاح مقصود."
    },
    "as-4": {
      prompt: "ما الفرق بين تسجيل الخدمة وحلّ الخدمة؟",
      options: [
        "هما العملية نفسها",
        "التسجيل يصف كيفية إنشاء الخدمة؛ والحلّ يطلب نسخة من المزوّد",
        "التسجيل ينشئ الكائن؛ والحلّ يحرّره",
        "الحلّ يحدث في Program.cs فقط"
      ],
      explain: "يضيف `AddScoped<IBookService, BookService>()` واصفًا إلى IServiceCollection. وتنشئ الحاوية النسخ لاحقًا عندما يُبنى مستهلك أو يطلب الكود الخدمة من المزوّد صراحة."
    },
    "as-5": {
      prompt: "أي عبارة عن الواجهات هي الأدق؟",
      options: [
        "يجب أن تملك كل خدمة واجهة",
        "تكون مفيدة عندما توفر عقدًا حقيقيًا أو استبدالًا أو حدّ اختبار؛ وإلا فقد يكون تسجيل فئة ملموسة أبسط",
        "هي شرط للحقن عبر المنشئ",
        "تجعل استعلامات EF Core أسرع"
      ],
      explain: "الحقن عبر المنشئ يعمل مع الأنواع الملموسة أيضًا. الواجهة أداة تصميم لا شرط لحقن التبعيات. أضفها عندما تعبّر عن حدّ ذي معنى أو تتيح الاستبدال، لا كردّ فعل تلقائي."
    },
    "as-6": {
      prompt: "تُحقن خدمة عابرة في متحكم وتُستخدم لثلاثة استدعاءات في طلب واحد. كم نسخة يستقبلها المتحكم عادة؟",
      options: [
        "نسخة واحدة، لأن العابر يتحكم في الحلّ فقط؛ والاستدعاءات الثلاثة تستخدم النسخة المحقونة",
        "ثلاث نسخ، واحدة لكل استدعاء دالة",
        "صفر حتى أول استدعاء",
        "نسخة واحدة لكل نطاق بصرف النظر عن التسجيل"
      ],
      explain: "تنشئ الحاوية الخدمة العابرة عند بناء المتحكم. ويحتفظ المتحكم بتلك النسخة طوال الطلب ويستدعي دوالها. العابر يعني نسخة جديدة لكل عملية حلّ، لا لكل استدعاء دالة."
    },
    "as-7": {
      prompt: "نطاقان يحلّان الخدمة المحدودة النطاق نفسها. ماذا يجب أن تلاحظ؟",
      options: [
        "النسخة نفسها في النطاقين",
        "نسخة مختلفة في كل نطاق، تُعاد استخدامها داخل كل نطاق",
        "نسخة جديدة عند كل عملية حلّ",
        "استثناءً، لأن الخدمات المحدودة لا تعبر النطاقات"
      ],
      explain: "محدود النطاق يعني نسخة واحدة لكل نطاق حقن تبعيات. لكل نطاق ذاكرته الخاصة بالنسخ المحدودة، لذا يرى النطاقان كائنين مختلفين، بينما تعيد عمليات الحلّ المتكررة داخل النطاق الواحد استخدام النسخة نفسها."
    },
    "as-8": {
      prompt: "أي عبارة عن الخدمات المفردة صحيحة؟",
      options: [
        "آمنة للاستخدام المتزامن تلقائيًا",
        "تُعاد استخدامها طوال عمر المزوّد الجذري ويجب تصميمها للاستخدام المتزامن إذا كانت مشتركة",
        "تُنشأ مرة لكل طلب",
        "لا يمكنها الاعتماد على أي خدمة أخرى"
      ],
      explain: "singleton يتحكم في إعادة الاستخدام، لا في المزامنة. الكائن المفرد الذي تتشاركه طلبات متزامنة يحتاج إلى حالة آمنة للاستخدام المتزامن أو إلى غياب الحالة المتغيرة تمامًا. لن تحميه الحاوية تلقائيًا."
    },
    "as-9": {
      prompt: "يُبنى `BookCacheService` مفرد بسياق `BooksContext` محدود النطاق. ما المشكلة الجوهرية؟",
      options: [
        "ستُحرَّر الذاكرة المؤقتة مبكرًا جدًا",
        "يحتفظ الكائن المفرد بالسياق بعد نطاقه، فينشأ تبعية أسيرة ويتشارك كائنًا غير آمن للاستخدام المتزامن",
        "لا يمكن استخدام EF Core داخل singleton",
        "يصبح السياق عابرًا"
      ],
      explain: "يعيش الكائن المفرد في المزوّد الجذري ويحتفظ بالسياق المحدود النطاق طوال عمر التطبيق. يُفقد النطاق المقصود للسياق؛ وقد ترى الطلبات حالة قديمة، ويصبح الاستخدام المتزامن غير آمن."
    },
    "as-10": {
      prompt: "أي نمط يمنح `BackgroundService` وصولًا آمنًا إلى الخدمات المحدودة النطاق؟",
      options: [
        "حقن الخدمات المحدودة مباشرة في الخدمة المستضافة",
        "إنشاء نطاق باستخدام `IServiceScopeFactory` لكل وحدة عمل والحلّ داخله",
        "تسجيل كل تبعية كـ singleton",
        "الحلّ من `app.Services` دون نطاق"
      ],
      explain: "الخدمة المستضافة كائن مفرد بحد ذاتها. تنشئ نطاقًا صريحًا لكل وحدة عمل، وتحلّ التبعيات المحدودة منه، وتحرّر النطاق عند الانتهاء. هذا يمنح DbContext عمرًا واضحًا أيضًا."
    },
    "as-11": {
      prompt: "لماذا لا تصلح نسخة `DbContext` واحدة لعمليتين متزامنتين؟",
      options: [
        "لأنها مسجّلة كمحدودة النطاق",
        "لأنها غير آمنة للاستخدام المتزامن وتحتفظ بحالة تتبع التغييرات لكل نسخة",
        "لأن PostgreSQL يرفض كل الاستعلامات المتوازية",
        "لأنه لا يمكن تحريرها"
      ],
      explain: "DbContext غير مصمم للاستخدام المتزامن. إذا وجب تداخل العمليات، فأنشئ سياقات مستقلة — مثلًا باستخدام IDbContextFactory — حتى تحصل كل وحدة عمل على حالة تتبع خاصة."
    },
    "as-12": {
      prompt: "ما أقوى سبب لإضافة مستودع كتب مركّز؟",
      options: [
        "يجب تغليف كل وصول إلى DbSet بحسب السياسة",
        "عدة حالات استخدام تتشارك استعلامات معقدة ذات معنى للنطاق ويستفيد من تجريد واحد مسمّى",
        "المستودعات تجعل PostgreSQL أسرع",
        "EF Core يشترط مستودعًا لاستخدام حقن التبعيات"
      ],
      explain: "يمكن للمستودع المركّز أن يركّز الاستعلامات المعقدة أو يعزل الاستمرارية لحاجة تصميم حقيقية. وهو ليس طبقة إلزامية، وتغليف كل DbSet آليًا يخفي غالبًا ميزات مفيدة في EF Core."
    },
    "as-13": {
      prompt: "ما الذي يوفره `DbContext` أصلًا ويتقاطع مع نمط وحدة العمل؟",
      options: [
        "توجيه HTTP",
        "تتبع التغييرات وتثبيتها مرة واحدة عبر SaveChangesAsync",
        "تسلسل JSON",
        "المصادقة"
      ],
      explain: "يتتبع السياق تغييرات الكيانات ويثبّتها كوحدة منطقية واحدة عند استدعاء SaveChangesAsync. لا يستحق IUnitOfWork إضافي إلا إذا أضاف تنسيقًا حقيقيًا أو حدًا مقصودًا."
    },
    "as-14": {
      prompt: "في تدفق الحذف بعد إعادة الهيكلة، أي تعيين صحيح؟",
      options: [
        "الخدمة تعيد 404؛ والمتحكم يعيد 409",
        "الخدمة تعيد نتيجة مثل Deleted/NotFound/HasReadingEntries؛ والمتحكم يعيّنها إلى 204/404/409",
        "الخدمة تعيد IActionResult؛ والمتحكم يعيد الكائن نفسه",
        "المتحكم ينفّذ الحذف؛ والخدمة تسجّل فقط"
      ],
      explain: "الخدمة تملك حالة الاستخدام وتعید نتائج التطبيق. والمتحكم يملك ترجمة HTTP. هذا الفصل يبقي حالة الاستخدام قابلة للاستخدام خارج MVC ويجعل قرارات رموز الحالة في مكان واحد."
    }
  }
};
