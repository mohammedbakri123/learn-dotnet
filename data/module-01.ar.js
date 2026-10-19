/* ============================================================
   Raff Backend Academy — Module 1 — Arabic content overlay.
   Merged by pages/js/module-01.js when the active language is
   Arabic; every missing entry falls back to the English data.
   ============================================================ */

window.RAFF_MODULE_01_AR = {

  glossary: {
    "HTTP": {
      cat: "البروتوكول",
      def: "بروتوكول نقل النص التشعبي (Hypertext Transfer Protocol)؛ بروتوكول عديم الحالة على طبقة التطبيقات يحكم تبادل الطلبات والردود بين عملاء الويب والخوادم."
    },
    "REST": {
      cat: "المعمارية",
      def: "نقل الحالة التمثيلي (Representational State Transfer)؛ نمط معماري وضعه Roy Fielding يقوم على عناوين URI موجّهة نحو الموارد، وانعدام الحالة، واستخدام أساليب HTTP القياسية كواجهة موحّدة."
    },
    "Resource": {
      cat: "المعمارية",
      def: "أي كيان أو كائن مفهومي يمكن عنونته بمعرّف URI في الواجهة (مثل كتاب أو مؤلف أو مستخدم في Raff)، ويُمثَّل بصيغ مثل JSON."
    },
    "Route": {
      cat: "إطار العمل",
      def: "قالب نمط لعنوان URL يربطه محرّك التوجيه في ASP.NET Core بنقطة نهاية قابلة للتنفيذ (مثل إجراء في متحكّم)."
    },
    "Route Constraint": {
      cat: "إطار العمل",
      def: "قاعدة تُلحق برمز مسار (مثل ‎{id:int}‎) تحدّد ما إذا كان المسار يطابق عنوان URL الوارد، وتُستخدم لتمييز نقاط النهاية لا للتحقق من المدخلات."
    },
    "Controller": {
      cat: "إطار العمل",
      def: "فئة C# ترث من ControllerBase وتعمل نقطة الدخول لطلبات HTTP، إذ تحوّل بيانات الشبكة إلى أوامر في التطبيق."
    },
    "Action": {
      cat: "إطار العمل",
      def: "دالة عمومية في فئة المتحكّم تُنفَّذ عندما يطابق طلب HTTP وارد مسارها وأسلوبها المحددين بسمات."
    },
    "Middleware": {
      cat: "إطار العمل",
      def: "مكوّن برمجي في ASP.NET Core يُجمع في خط أنابيب التطبيق لمعالجة الطلبات والردود في مسار ثنائي الاتجاه."
    },
    "Model Binding": {
      cat: "إطار العمل",
      def: "العملية التي يستخرج بها ASP.NET Core البيانات من طلب HTTP (المسار والاستعلام والجسم والرؤوس) ويحوّلها إلى معاملات إجراء C# قوية الأنواع."
    },
    "DTO": {
      cat: "المعمارية",
      def: "كائن نقل البيانات (Data Transfer Object)؛ كائن مصمم خصيصًا لنقل البيانات عبر حدود الواجهة البرمجية، فيفصل العقد العام عن نماذج قاعدة البيانات الداخلية."
    },
    "Entity": {
      cat: "البيانات",
      def: "فئة C# تمثّل صفًا في جدول قاعدة بيانات وتتتبّعها Entity Framework Core بمفاتيح أساسية وخصائص تنقّل علائقية."
    },
    "Serialization": {
      cat: "البيانات",
      def: "عملية تحويل الكائنات الموجودة في الذاكرة إلى صيغة نصية/سلكية (مثل JSON عبر System.Text.Json) لإرسالها عبر HTTP."
    },
    "Idempotency": {
      cat: "البروتوكول",
      def: "خاصية في أسلوب HTTP يعني فيها تكرار الطلب المتطابق أنه يُحدث الأثر المقصود ذاته على حالة المورد على الخادم كما لو نُفّذ مرة واحدة (مثل GET وPUT وDELETE)."
    },
    "Safety": {
      cat: "البروتوكول",
      def: "خاصية في أسلوب HTTP يعني فيها تنفيذ الطلب دون تغيير حالة المورد على الخادم (قراءة فقط، مثل GET وHEAD)."
    },
    "Status Code": {
      cat: "البروتوكول",
      def: "عدد صحيح قياسي من ثلاثة أرقام يُعاد في رد HTTP لبيان نتيجة الطلب (مثل 200 و201 و400 و404 و500)."
    },
    "PUT": {
      cat: "البروتوكول",
      def: "أسلوب HTTP لا متمايز (idempotent) مخصّص للاستبدال الكامل للمورد المستهدف بالحمولة المرفقة."
    },
    "PATCH": {
      cat: "البروتوكول",
      def: "أسلوب HTTP مخصّص لتطبيق تعديلات جزئية على مورد."
    },
    "Nullable Reference Type": {
      cat: "C#",
      def: "ميزة تحليل سكوني وقت الترجمة في C# 8+ (مثل ‎string?‎) تشير إلى إمكانية كون المرجع null دون إنشاء نوع زمن تنفيذ مستقل."
    },
    "JSON Merge Patch": {
      cat: "البروتوكول",
      def: "معيار RFC 7396 ‏(application/merge-patch+json): تُبقى المفاتيح المُغفَلة، وتمسح قيم null الحقول، وتُحدّث القيم المُقدَّمة الحقول."
    },
    "JSON Patch": {
      cat: "البروتوكول",
      def: "معيار RFC 6902 ‏(application/json-patch+json) يعبّر عن التعديلات كمصفوفة عمليات منفصلة (replace وremove وadd وmove وcopy)."
    },
    "Over-posting": {
      cat: "الأمان",
      def: "ثغرة يرسل فيها العملاء حقول JSON غير متوقعة ترتبط مباشرة بخصائص كيانات قاعدة البيانات بسبب غياب قائمة DTO بيضاء (whitelisting)."
    },
    "ProblemDetails": {
      cat: "البروتوكول",
      def: "مواصفة RFC 7807 قابلة للقراءة آليًا لنقل تفاصيل الأخطاء في أجسام ردود HTTP، وينتجها [ApiController] تلقائيًا."
    },
    "Endpoint Routing": {
      cat: "إطار العمل",
      def: "النظام الفرعي للتوجيه في ASP.NET Core الذي يفصل مطابقة المسار (UseRouting) عن توزيع نقطة النهاية (UseEndpoints / MapControllers)."
    },
    "Kestrel": {
      cat: "إطار العمل",
      def: "خادم الويب متعدد المنصات عالي الأداء في ASP.NET Core، وهو مسؤول عن مقابس TCP وفكّ بروتوكول HTTP الخام."
    }
  },

  /* topics + explanations for the 26 in-lesson knowledge checks;
     the check widgets themselves are translated with lesson content */
  questions: {
    'qc-1-1': {
      topic: 'دورة حياة HTTP',
      exp: 'صحيح! إن HTTP عديم الحالة وفق RFC 9110: يجب أن يحمل كل طلبٍ جميع ترويسات التفويض والمعاملات والسياق اللازمة لتلبيته، ولا يحتفظ الخادم بسياق جلسة العميل افتراضيًا.'
    },
    'qc-1-2': {
      topic: 'دورة حياة HTTP',
      exp: 'صحيح! يدخل الطلب إلى Kestrel عبر مقبس الشبكة، ويمرّ عبر خط أنابيب الوسائط وتفويضات التوجيه، ويحلّل ربط النماذج المعاملات، فيستدعي إجراء المتحكم خدمة التطبيق التي تستعلم قاعدة البيانات عبر EF Core.'
    },
    'qc-1-3': {
      topic: 'دورة حياة HTTP',
      exp: 'صحيح! وجود تجريد IBookService نمط تصميم معماري في التطبيق لإبقاء المتحكمات رفيعة وقابلة للاختبار، ولا يفرضه ASP.NET Core (يمكنك الاستعلام من DbContext داخل الإجراءات أو استخدام Minimal APIs).'
    },
    'qc-2-1': {
      topic: 'REST ورموز الحالة',
      exp: 'صحيح! DELETE /api/books/42 مع الحالة 204 No Content هو النمط القياسي في REST عند حذف مورد دون إرجاع جسم استجابة.'
    },
    'qc-2-2': {
      topic: 'REST ورموز الحالة',
      exp: 'صحيح! أسلوب POST ليس آمنًا ولا لا متمايزًا (idempotent) بحكم تعريف RFC 9110؛ وإعادة إرسال طلب POST لم يُستلم ردّه قد تنشئ موارد مكررة ما لم تُطبَّق مفاتيح تفرّد مخصصة.'
    },
    'qc-2-3': {
      topic: 'REST ورموز الحالة',
      exp: 'صحيح! تُعبّر 409 Conflict عن تعذّر إكمال الطلب بسبب تعارض مع الحالة الراهنة للمورد المستهدف (مثل تكرار قيد فريد على ISBN).'
    },
    'qc-2-4': {
      topic: 'REST ورموز الحالة',
      exp: 'صحيح! يمثّل HTTP PUT استبدالًا كاملًا للمورد المستهدف؛ فأي حقول قائمة أُغفلت في جسم الطلب تُستبدل بقيمها الافتراضية (null أو 0) وفق التمثيل الجديد.'
    },
    'qc-3-1': {
      topic: 'التوجيه والقيود',
      exp: 'صحيح! قيود المسار تحدّد ما إذا كانت نقطة النهاية تطابق عنوان URL، وليست تحققًا من المدخلات. ولأن "al-ayam" يفشل في قيد :int فلن يطابق المسار أصلًا، فتكون النتيجة 404 Not Found.'
    },
    'qc-3-2': {
      topic: 'التوجيه والقيود',
      exp: 'صحيح! يبني توجيه نقاط النهاية شجرة مسارات ويحسب أولوية المرشّحين، وعندما يتساوى مساران في الأسبقية والقيود يُرمى AmbiguousMatchException ويؤدي إلى خطأ 500 غير معالَج.'
    },
    'qc-3-3': {
      topic: 'التوجيه والقيود',
      exp: 'صحيح! ترجمة نتائج الخدمة إلى رموز حالة HTTP (مثل 201 Created مع ترويسة Location) شأن نقل HTTP محض يقع في طبقة المتحكم.'
    },
    'qc-4-1': {
      topic: 'ربط النماذج',
      exp: 'صحيح! سلاسل الاستعلام (?year=2024&category=fiction) معدِّلات اختيارية ومرشِّحات ومعاملات ترقيم صفحات، وتُربط عبر [FromQuery].'
    },
    'qc-4-2': {
      topic: 'ربط النماذج',
      exp: 'صحيح! يسمح ASP.NET Core بمعامل واحد فقط من نوع [FromBody] لكل إجراء، لأن تيار جسم طلب HTTP أحادي الاتجاه افتراضيًا ولا يمكن قراءته مرتين.'
    },
    'qc-4-3': {
      topic: 'ربط النماذج',
      exp: 'صحيح! تهيّئ سمة [ApiController] مرشِّح ModelStateInvalidFilter تلقائيًا؛ وعند فشل ربط النموذج أو تحويل النوع يُقطع التنفيذ فورًا ويُعاد 400 Bad Request بصيغة RFC 7807 ProblemDetails.'
    },
    'qc-5-1': {
      topic: 'كائنات DTO والأمان',
      exp: 'صحيح! يحدث الإسناد الجماعي (Over-posting) عندما يرسل العملاء خصائص JSON غير متوقعة ترتبط مباشرة بحقول كيان قاعدة البيانات؛ وتعمل كائنات DTO كقائمة بيضاء صارمة تمنع تعديل الخصائص غير المصرّح بها.'
    },
    'qc-5-2': {
      topic: 'كائنات DTO والأمان',
      exp: 'صحيح! توفّر كائنات DTO إسقاطات أحادية الاتجاه نظيفة تكسر حلقات التنقل ثنائية الاتجاه في EF Core (Book → Authors → Books)، فتمنع استثناءات الدوران في System.Text.Json.'
    },
    'qc-5-3': {
      topic: 'كائنات DTO والأمان',
      exp: 'صحيح! طلبات الإنشاء لا توفّر معرّفًا (تنشئه قاعدة البيانات)، بينما تحتاج ردود القراءة إلى المعرّف؛ ووجود كائني DTO منفصلين يصون بدقة عقدي العمليتين المختلفين.'
    },
    'qc-6-1': {
      topic: 'التحديثات الجزئية وقيم null',
      exp: 'صحيح! عندما يرسل العميل {"summary": null} تصبح dto.summary فارغة (null)، وتُقيَّم الشرطة if (dto.summary is not null) إلى false، فيُتخطى الإسناد ولا يُمحى الملخص القديم من قاعدة البيانات أبدًا!'
    },
    'qc-6-2': {
      topic: 'التحديثات الجزئية وقيم null',
      exp: 'صحيح! يعيّن فكّ تسلسل JSON القياسي القيمة null عند ضبط الحقل صراحةً على null وعند إغفاله معًا؛ فخصائص DTO العادية لا تتتبّع الحضور لتمييز الحالتين.'
    },
    'qc-6-3': {
      topic: 'التحديثات الجزئية وقيم null',
      exp: 'صحيح! استدعاء context.Update(entity) يضبط EntityState.Modified على كل الخصائص، وأي حقول مُغفَلة تعود إلى null أو 0 فتمحو أعمدة صالحة قائمة في PostgreSQL!'
    },
    'qc-6-4': {
      topic: 'التحديثات الجزئية وقيم null',
      exp: 'صحيح! لا يتضمن ASP.NET Core معالجة تلقائية لمعيار RFC 7396 ‏(application/merge-patch+json) لكائنات DTO العشوائية؛ فعلى المطوّر استخدام تتبّع حضور مخصص (مثل Optional<T> أو JsonElement) أو مكتبات متخصصة.'
    },
    'qc-7-1': {
      topic: 'المعمارية الشاملة',
      exp: 'صحيح! يلبّي CreatedAtAction معايير REST بإرجاع 201 Created وإنشاء ترويسة Location القياسية التي يمكن جلب المورد المنشأ منها.'
    },
    'qc-7-2': {
      topic: 'المعمارية الشاملة',
      exp: 'صحيح! ينبغي أن تبقى الخدمات مستقلة عن تجريدات HTTP (بلا IActionResult أو HttpContext)، ما يتيح إعادة استخدامها في المهام الخلفية وخدمات gRPC واختبارات الوحدة دون محاكاة الويب.'
    },
    'qc-7-3': {
      topic: 'المعمارية الشاملة',
      exp: 'صحيح! يحلّل نظام ربط النماذج في ASP.NET Core ومكوّنات الإدخال في System.Text.Json تيار طلب HTTP إلى كائنات C# قوية الأنواع قبل تشغيل إجراء المتحكم.'
    },
    'qa-1': {
      prompt: 'يُصدر عميل جوّال طلب GET /api/books/42. أي مكوّن في خط أنابيب ASP.NET Core يتولّى تحويل مقبس TCP إلى HttpContext؟',
      opts: [
        'Entity Framework Core DbContext',
        'خادم الويب Kestrel',
        'وسيط توجيه نقاط النهاية',
        'مفكّك System.Text.Json'
      ],
      topic: 'دورة حياة HTTP',
      exp: 'Kestrel هو خادم الويب عالي الأداء المسؤول عن إدارة مقابس الشبكة وبناء HttpContext الأولي.'
    },
    'qa-2': {
      prompt: 'أي أسلوب HTTP ينبغي استخدامه عندما يريد العميل استبدال الحالة الكاملة للكتاب رقم 42 بتمثيل جديد متكامل؟',
      opts: [
        '‏PATCH /api/books/42',
        '‏POST /api/books/42',
        '‏PUT /api/books/42',
        '‏GET /api/books/42?action=replace'
      ],
      topic: 'REST ورموز الحالة',
      exp: 'يعرّف RFC 9110 أسلوب PUT للاستبدال الكامل لتمثيل المورد المستهدف.'
    },
    'qa-3': {
      prompt: 'قالب مسار معرّف بالشكل [HttpGet("{id:int}")]، ويرسل العميل الطلب GET /api/books/latest. إذا لم يطابق أي مسار آخر، فما رمز حالة HTTP الذي يعيده ASP.NET Core، ولماذا؟',
      opts: [
        '‏400 Bad Request، لأن "latest" ليس عددًا صحيحًا صالحًا.',
        '‏404 Not Found، لأن قيود المسار تحكم مطابقة نقاط النهاية لا التحقق؛ وفشل القيد يعني عدم مطابقة أي مسار.',
        '‏500 Internal Server Error، لأنه رُمي استثناء تحويل نوع.',
        '‏200 OK مع المعرّف الافتراضي 0.'
      ],
      topic: 'التوجيه والقيود',
      exp: 'قيود المسار ترشّح مطابقة نقطة النهاية؛ وإذا لم تطابق أي نقطة نهاية عنوان URL يُعاد 404 Not Found.'
    },
    'qa-4': {
      prompt: 'في متحكّم مزوّد بـ [ApiController] تعرّف الإجراء: public IActionResult Get([FromRoute] int id, [FromQuery] bool includeAuthors). إذا أرسل العميل ?includeAuthors=maybe فماذا يحدث؟',
      opts: [
        'يُنفَّذ الإجراء بقيمة includeAuthors = false.',
        'يعيد ASP.NET Core تلقائيًا 400 Bad Request بصيغة RFC 7807 ProblemDetails قبل تنفيذ الإجراء.',
        'يغلق Kestrel اتصال TCP فورًا.',
        'تعيد PostgreSQL خطأ في صياغة SQL.'
      ],
      topic: 'ربط النماذج',
      exp: 'يتحقق [ApiController] تلقائيًا من ModelState.IsValid؛ وفشل تحويل النوع يولّد رد 400 ProblemDetails تلقائيًا.'
    },
    'qa-5': {
      prompt: 'لماذا يُعدّ إرجاع كيانات EF Core مباشرة من إجراءات المتحكم نمطًا خطيرًا أمنيًا ومعماريًا؟',
      opts: [
        'لأنه يسبب ثغرات over-posting (الإسناد الجماعي)، وأعطال الدوران المرجعي في تسلسل JSON، ويسرّب تفاصيل المخطط الداخلي.',
        'لأنه يمنع PostgreSQL من استخدام استعلامات B-tree المفهرسة.',
        'لأنه يعطّل تشفير SSL/TLS لتيار الاستجابة.',
        'لأنه يثير خطأ صياغة غير معالَج في المترجم.'
      ],
      topic: 'كائنات DTO والأمان',
      exp: 'تكشف الكيانات الأعمدة الداخلية، وتتيح تحديثات خبيثة عبر over-posting، وتسبب حلقات دوران في تسلسل التنقل.'
    },
    'qa-6': {
      prompt: 'في BookService ضمن Raff، التحديث بالشكل: if (dto.summary is not null) book.Summary = dto.summary; ما الخطأ الذي يسببه عندما يرسل العميل {"title": "New Title", "summary": null}؟',
      opts: [
        'لا يُحدَّث عنوان الكتاب.',
        'لا يمكن مسح الملخص أو حذفه من قاعدة البيانات لأن الشرط يُقيَّم إلى false فيبقى الملخص القديم سليمًا بصمت.',
        'ترمي PostgreSQL خطأ في المفتاح الأجنبي.',
        'يرمي ASP.NET Core استثناء NullReferenceException.'
      ],
      topic: 'التحديثات الجزئية وقيم null',
      exp: 'لأن dto.summary فارغة (null) يكون الشرط false، فيتجاهل الكود تعليمة العميل الصريحة بمسح الملخص!'
    },
    'qa-7': {
      prompt: 'كيف تختلف أنواع المراجع القابلة للقيم الفارغة في C# 8+ ‏(string?) عن قيم null وقت التشغيل؟',
      opts: [
        'تُترجم string? إلى بنية معبّأة خاصة، بينما string فئة.',
        'أنواع المراجع القابلة للقيم الفارغة تعليقات للمترجم وقت الترجمة تولّد تحذيرات؛ ووقت التشغيل كلاهما مرجع System.String متطابق.',
        'لا يمكن فكّ تسلسل string? عبر System.Text.Json.',
        'تجبر string? أعمدة PostgreSQL على وضع علامة NOT NULL.'
      ],
      topic: 'التحديثات الجزئية وقيم null',
      exp: 'توجد أنواع المراجع القابلة للقيم الفارغة لتحليل تدفق المترجم وقت البناء فقط؛ ووقت التشغيل كلاهما System.String ويمكن أن يكون null.'
    },
    'qa-8': {
      prompt: 'ماذا يحدث إذا أَسند مطوّر كائن DTO للتحديث الجزئي إلى كيان Book جديد واستدعى بلا تفكير _context.Books.Update(book) في EF Core؟',
      opts: [
        'يحدّث EF Core الخصائص غير الافتراضية فقط.',
        'يضع EF Core علامة Modified على كل الخصائص، فيستبدل الحقول غير المُرسلة بـ 0 أو null ويمحو بيانات صالحة من قاعدة البيانات.',
        'يرمي EF Core استثناء InvalidOperationException ما لم تُضبط كل المفاتيح الأجنبية.',
        'تحوّل PostgreSQL العبارة إلى تعليمة INSERT.'
      ],
      topic: 'التحديثات الجزئية وقيم null',
      exp: 'يضع Update() علامة Modified على كل أعمدة الكيان، فيستبدل الأعمدة غير المتغيّرة بقيم افتراضية/فارغة غير معبّأة!'
    },
    'qa-9': {
      prompt: 'عند إنشاء كتاب جديد عبر POST /api/books، ما توليفة رمز الحالة وترويسة الاستجابة المتوافقة مع REST؟',
      opts: [
        '‏200 OK مع ترويسة Content-Location',
        '‏201 Created مع ترويسة Location تشير إلى URI المورد الجديد',
        '‏204 No Content مع ترويسة Set-Cookie',
        '‏302 Found مع ترويسة Redirect'
      ],
      topic: 'REST ورموز الحالة',
      exp: '‏201 Created مع ترويسة Location (مثل ‏Location: /api/books/42) هو العقد القياسي في REST.'
    },
    'qa-10': {
      prompt: 'في دلالات JSON Merge Patch وفق RFC 7396، كيف يميّز الخادم بين الإبقاء على قيمة قائمة وحذف قيمة قائمة؟',
      opts: [
        'تُبقى الخصائص المُغفَلة، وتُزال/تُمحى الخصائص المضبوطة صريحةً على null.',
        'تُحذف الخصائص المُغفَلة، وتُبقى الخصائص الفارغة null.',
        'لا يوجد تمييز؛ null تعني الإبقاء دائمًا.',
        'يتطلب JSON Merge Patch مصفوفة أوامر "op": "remove".'
      ],
      topic: 'التحديثات الجزئية وقيم null',
      exp: 'في RFC 7396 تعني المفاتيح المُغفَلة "أبقِ القيمة القائمة"، بينما القيم null الصريحة تعني "أزل/امسح هذه القيمة".'
    }
  },

  /* aligned by index with SEARCH_INDEX */
  search: [
    { title: 'نظرة عامة ومقدمة', snippet: 'خريطة المقرر والمتطلبات المسبقة ومخرجات التعلّم في Raff.' },
    { title: 'الدرس 1: أساسيات HTTP', snippet: 'نموذج العميل/الخادم في HTTP، وانعدام الحالة، وتشريح الطلب والاستجابة، ورموز الحالة.' },
    { title: 'الدرس 1: دورة حياة الطلب في ASP.NET Core', snippet: 'Kestrel وخط أنابيب الوسائط وتوجيه نقاط النهاية وإجراءات المتحكم ووصولًا إلى EF Core وPostgreSQL.' },
    { title: 'الدرس 2: مبادئ REST والموارد', snippet: 'عناوين URI موجّهة نحو الموارد، والأسماء مقابل الأفعال، والمجموعات، والموارد الفرعية.' },
    { title: 'الدرس 2: الأساليب الآمنة ولا متمايزة', snippet: 'تعريفات RFC 9110، ومصفوفة مقارنة بين GET وPOST وPUT وPATCH وDELETE.' },
    { title: 'الدرس 2: رموز حالة HTTP', snippet: '‏200 OK، و201 Created مع ترويسة Location، و204 No Content، و400 و401 و403 و404 و409 و500.' },
    { title: 'الدرس 3: التوجيه في ASP.NET Core', snippet: 'التوجيه بالسمات، وControllerBase، وميزات [ApiController]، واستبدال الرموز في القوالب.' },
    { title: 'الدرس 3: قيود المسار والالتباس', snippet: 'لماذا لا تكون قيود المسار مدقّقات، والفرق بين 404 و400، وأعطال AmbiguousMatchException.' },
    { title: 'الدرس 3: فصل المتحكم عن الخدمة', snippet: 'إبقاء المتحكمات رفيعة، وقابلية الاختبار، ولماذا لا ينبغي أن تعيد الخدمات IActionResult أبدًا.' },
    { title: 'الدرس 4: ربط النماذج ومصادر البيانات', snippet: '‏[FromRoute] و[FromQuery] و[FromBody] و[FromHeader]، وقاعدة جسم الطلب الواحد.' },
    { title: 'الدرس 4: ردود 400 ProblemDetails التلقائية', snippet: '‏ModelState.IsValid وأخطاء تحويل أنواع JSON وردود RFC 7807.' },
    { title: 'الدرس 5: الكيانات مقابل كائنات DTO', snippet: 'كيانات قاعدة البيانات في EF Core مقابل عقود الواجهة وتعريفات record.' },
    { title: 'الدرس 5: الإسناد الجماعي وحلقات الدوران', snippet: 'منع ثغرات over-posting وكسر حلقات الدوران في تسلسل JSON.' },
    { title: 'الدرس 6: معضلة التحديث الجزئي', snippet: 'الخطأ في if (dto.summary is not null)، ومشكلة الحالات الثلاث، والإغفال مقابل null الصريحة.' },
    { title: 'الدرس 6: مقاربات التحديث الجزئي', snippet: 'تتبّع الحضور عبر Optional<T>، ومعيار RFC 7396 JSON Merge Patch، ومعيار RFC 6902 JSON Patch.' },
    { title: 'الدرس 6: فخ Update() في EF Core', snippet: 'لماذا يستبدل استدعاء Update() على كيانات جزئية أعمدة صالحة في قاعدة البيانات.' },
    { title: 'الدرس 7: معمارية Books من البداية إلى النهاية', snippet: 'جمع كل شيء معًا: المتحكم وDTO والخدمة وEF Core وCreatedAtAction.' },
    { title: 'التقييم الختامي للوحدة', snippet: 'تقييم شامل من 10 أسئلة مع بطاقة نتائج تشخيصية.' }
  ],

  /* lesson content overlays, keyed by lesson id */
  lessons: {

    'lesson-0': {
      nav: 'نظرة عامة وترحيب',
      content: `
  <div class="lesson-header-box">
    <div class="lesson-meta-bar">
      <span class="lesson-pill">خريطة المنهج</span>
      <span class="badge-time">إتقان خلفيات الويب بالوتيرة الذاتية</span>
    </div>
    <h1 class="lesson-h1">ASP.NET Core Web API: الوحدة الأولى</h1>
    <p class="lesson-lead">
      أهلًا بك يا محمد. يأخذك هذا الكتاب التفاعلي في عمق ما تحت سطح ASP.NET Core Web API. انطلاقًا من مشروعك الواقعي <strong>Raff</strong> (واجهة برمجية عربية لتتبّع الكتب مبنية بـ C# وEF Core وPostgreSQL)، تحوّل هذه الوحدة معرفتك العملية بـ CRUD إلى إتقان معماري عميق.
    </p>
  </div>

  <div class="content-body">
    <h2>1. عن هذه الوحدة</h2>
    <p>
      لقد بنيت بالفعل نقاط نهاية فعّالة في <code>BookController.cs</code> وهيأت ترحيلات Entity Framework Core. لكن انتقالك من طالب علوم حاسب إلى مهندس .NET خلفي محترف يقتضي معرفة <em>سبب</em> سلوك إطار العمل على ما هو عليه:
    </p>
    <ul>
      <li>ماذا يحدث للبايتات على الشبكة قبل أن يُنفَّذ كود المتحكم أصلًا؟</li>
      <li>لماذا تنكسر <code>if (dto.summary is not null)</code> بصمت عندما يحاول المستخدمون مسح ملخصات الكتب؟</li>
      <li>لماذا يُعدّ إرجاع كيانات قاعدة البيانات مباشرة ثغرة أمنية خطيرة وفخًّا في التسلسل؟</li>
      <li>كيف يميّز توجيه نقاط النهاية بين النقاط، وما الذي يسبب <code>AmbiguousMatchException</code>؟</li>
    </ul>

    <h2>2. خط سير المنهج</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>الدرس</th>
            <th>المواضيع الأساسية</th>
            <th>المخرَج العملي</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>الدرس 1</strong></td>
            <td>أساسيات HTTP ودورة حياة الطلب</td>
            <td>تتبّع الطلبات من Kestrel عبر الوسائط والتوجيه والمتحكمات والخدمات وEF Core حتى PostgreSQL.</td>
          </tr>
          <tr>
            <td><strong>الدرس 2</strong></td>
            <td>مبادئ REST وأساليب HTTP</td>
            <td>إتقان الموارد ودلالات الأمان والتفرّد (safe/idempotent) ورموز الحالة القياسية (200 و201 و204 و400 و404 و409).</td>
          </tr>
          <tr>
            <td><strong>الدرس 3</strong></td>
            <td>التوجيه والمتحكمات</td>
            <td>فهم التوجيه بالسمات، ولماذا ليست قيود المسار مدقّقات، وكيف ينهار التطبيق عند التباس نقاط النهاية.</td>
          </tr>
          <tr>
            <td><strong>الدرس 4</strong></td>
            <td>ربط النماذج وبيانات الطلب</td>
            <td>إزالة الغموض عن <code>[FromRoute]</code> و<code>[FromQuery]</code> و<code>[FromBody]</code> وردود 400 ProblemDetails التلقائية.</td>
          </tr>
          <tr>
            <td><strong>الدرس 5</strong></td>
            <td>الكيانات وDTO وعقود الواجهة</td>
            <td>منع الإسناد الجماعي وأعطال JSON الدائرية وتسريبات البيانات عبر تصميم عقود DTO نظيفة ومنفصلة.</td>
          </tr>
          <tr>
            <td><strong>الدرس 6</strong></td>
            <td>‏PUT وPATCH والقيم الفارغة والتحديثات الجزئية</td>
            <td>حلّ الخطأ الحقيقي في <code>UpdateBookAsync</code> في Raff وإتقان الفرق بين الخصائص المُغفَلة وقيم null الصريحة.</td>
          </tr>
          <tr>
            <td><strong>الدرس 7</strong></td>
            <td>جمع المفاهيم معًا</td>
            <td>بناء تنفيذ معماري متكامل من البداية إلى النهاية لواجهة Books في Raff.</td>
          </tr>
          <tr>
            <td><strong>التقييم</strong></td>
            <td>التقييم الختامي للوحدة</td>
            <td>اختبر معرفتك بـ 10 أسئلة شاملة (حد النجاح 80%) مع مراجعة تشخيصية.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>3. كيف تستخدم هذا الكتاب التعليمي التفاعلي</h2>
    <div class="callout callout-note">
      <div class="callout-icon">🧭</div>
      <div class="callout-content">
        <div class="callout-title">ميزات في متناول يدك</div>
        <ul>
          <li><strong>صفر اعتماد على الشبكة:</strong> هذا الكتاب بالكامل مستقل تمامًا؛ لا يحتاج خادم Node ولا اتصال إنترنت ولا CDN خارجيًا.</li>
          <li><strong>حفظ التقدّم تلقائيًا:</strong> تُحفظ نتائج الاختبارات القصيرة والدروس المكتملة ونتائج التقييم تلقائيًا في التخزين المحلي لمتصفحك.</li>
          <li><strong>التصدير والاستيراد:</strong> استخدم أدوات الشريط الجانبي لتصدير تقدّمك إلى ملف JSON أو استعادته في أي وقت.</li>
          <li><strong>البحث بلوحة المفاتيح:</strong> اضغط <kbd class="kbd-shortcut">Ctrl+K</kbd> (أو انقر «بحث» في الترويسة) في أي وقت للبحث في الدروس وقاموس المصطلحات.</li>
          <li><strong>ملاعب تفاعلية:</strong> استخدم مستكشف خط أنابيب الطلبات ومحاكي مطابقة المسارات وملعب الحالات الثلاث للتحديث الجزئي على مدار الدروس.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="lesson-nav-footer">
    <div></div>
    <button class="btn-primary btn-next-lesson" data-target="lesson-1">
      ابدأ الدرس 1: أساسيات HTTP ←
    </button>
  </div>
`
    },

    'lesson-1': {
      nav: 'HTTP ودورة حياة الطلب',
      content: `
  <div class="lesson-header-box">
    <div class="lesson-meta-bar">
      <span class="lesson-pill">الدرس 1</span>
      <span class="badge-time">قراءة وتمارين في 30 دقيقة</span>
    </div>
    <h1 class="lesson-h1">أساسيات HTTP ودورة حياة الطلب في ASP.NET Core</h1>
    <p class="lesson-lead">
      قبل كتابة إجراءات المتحكم، عليك فهم بروتوكول الشبكة الذي يعمل أسفلها. تتبّع رحلة طلب HTTP من مقبس العميل عبر Kestrel والوسائط والتوجيه وربط النماذج وEF Core حتى PostgreSQL.
    </p>
  </div>

  <div class="content-body">
    <h2>1. بروتوكول HTTP: معمارية العميل-الخادم</h2>
    <p>
      <strong>بروتوكول نقل النص التشعبي (HTTP)</strong> بروتوكول عديم الحالة على طبقة التطبيقات يعمل فوق TCP أو QUIC (في HTTP/3). في واجهة خلفية RESTful مثل واجهتك <strong>Raff</strong>، يبدأ العميل (واجهة React أو تطبيق Flutter الجوّال أو سكربت cURL) اتصالًا ويرسل رسالة طلب HTTP، ثم ينتظر ردّ الخادم برسالة استجابة HTTP.
    </p>

    <div class="callout callout-important">
      <div class="callout-icon">💡</div>
      <div class="callout-content">
        <div class="callout-title">انعدام الحالة: ماذا يعني لتصميم الواجهة الخلفية؟</div>
        <p>
          إن HTTP <strong>عديم الحالة</strong> بطبيعته؛ فلا يحتفظ الخادم افتراضيًا بأي حالة جلسة عن العميل بين الطلبات. ويجب أن يحتوي كل طلب على جميع بيانات الاعتماد والترويسات والمعاملات اللازمة لفهم العملية والتصريح بها. فإذا جلب العميل صفحة كتب من Raff، وجب على الطلب التالي للصفحة الثانية أن يرسل معاملات ترقيم الصفحات ورمز المصادقة الخاصين به.
        </p>
      </div>
    </div>

    <h3>تشريح طلب HTTP</h3>
    <p>
      يتكوّن كل طلب HTTP على الشبكة من ثلاثة أجزاء أساسية:
    </p>
    <ol>
      <li><strong>سطر الطلب:</strong> أسلوب HTTP (الفعل)، ومسار URI المستهدف وسلسلة الاستعلام، وإصدار HTTP.</li>
      <li><strong>الترويسات:</strong> بيانات وصفية من أزواج مفتاح/قيمة توفر سياقًا عن العميل وصيغة المحتوى والمصادقة والتخزين المؤقت.</li>
      <li><strong>الجسم (اختياري):</strong> بيانات الحمولة (مثل JSON أو بيانات نموذج) المرسلة إلى الخادم.</li>
    </ol>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">HTTP</span>
          <span class="code-filename">Request Wire Format</span>
          <span class="code-type-pill">Wire Protocol</span>
        </div>
        <button class="btn-copy-code" data-code="POST /api/books HTTP/1.1
Host: api.raff.local
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOi...

{
  &quot;title&quot;: &quot;Makan fi Al-Qalb&quot;,
  &quot;publishedYear&quot;: 2023,
  &quot;summary&quot;: &quot;An acclaimed modern Arabic novel.&quot;,
  &quot;coverUrl&quot;: &quot;https://cdn.raff.local/covers/makan.jpg&quot;
}">Copy Wire Request</button>
      </div>
      <pre><code class="language-http">POST /api/books HTTP/1.1
Host: api.raff.local
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOi...

{
  "title": "Makan fi Al-Qalb",
  "publishedYear": 2023,
  "summary": "An acclaimed modern Arabic novel.",
  "coverUrl": "https://cdn.raff.local/covers/makan.jpg"
}</code></pre>
      <div class="code-explanation">
        <strong>أسطر مهمة:</strong> يحدّد السطر الأول الفعل <code>POST</code> ومسار نقطة النهاية <code>/api/books</code>. وتوجّه <code>Content-Type: application/json</code> مكوّنات الإدخال في ASP.NET Core لفكّ الجسم عبر <code>System.Text.Json</code>.
      </div>
    </div>

    <h3>تشريح استجابة HTTP</h3>
    <p>
      تعيد الاستجابة نتيجة تنفيذ الخادم:
    </p>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">HTTP</span>
          <span class="code-filename">Response Wire Format</span>
          <span class="code-type-pill">Wire Protocol</span>
        </div>
        <button class="btn-copy-code" data-code="HTTP/1.1 201 Created
Location: /api/books/42
Content-Type: application/json; charset=utf-8
Date: Mon, 13 Oct 2026 18:30:00 GMT

{
  &quot;id&quot;: 42,
  &quot;title&quot;: &quot;Makan fi Al-Qalb&quot;,
  &quot;publishedYear&quot;: 2023,
  &quot;summary&quot;: &quot;An acclaimed modern Arabic novel.&quot;,
  &quot;coverUrl&quot;: &quot;https://cdn.raff.local/covers/makan.jpg&quot;,
  &quot;authors&quot;: []
}">Copy Wire Response</button>
      </div>
      <pre><code class="language-http">HTTP/1.1 201 Created
Location: /api/books/42
Content-Type: application/json; charset=utf-8
Date: Mon, 13 Oct 2026 18:30:00 GMT

{
  "id": 42,
  "title": "Makan fi Al-Qalb",
  "publishedYear": 2023,
  "summary": "An acclaimed modern Arabic novel.",
  "coverUrl": "https://cdn.raff.local/covers/makan.jpg",
  "authors": []
}</code></pre>
      <div class="code-explanation">
        <strong>سطر الحالة:</strong> تؤكد <code>201 Created</code> إنشاء المورد، وتحدّد ترويسة <code>Location: /api/books/42</code> العنوان القياسي (URI) الذي يمكن جلب الكتاب المنشأ منه.
      </div>
    </div>

    <h2>2. رموز الحالة: دلالات النجاح والفشل</h2>
    <p>
      رموز حالة HTTP أعداد صحيحة قياسية من ثلاثة أرقام مصنّفة في خمس نطاقات وفق RFC 9110:
    </p>
    <ul>
      <li><span class="status-badge status-2xx">1xx (معلوماتي)</span>: استُلم الطلب وتتوالى المعالجة (مثل <code>100 Continue</code> و<code>101 Switching Protocols</code> لـ WebSockets).</li>
      <li><span class="status-badge status-2xx">2xx (نجاح)</span>: استُلم إجراء العميل وفُهم وقُبل.</li>
      <li><span class="status-badge status-4xx">3xx (إعادة توجيه)</span>: يجب على العميل اتخاذ إجراء إضافي لإكمال الطلب (مثل <code>301 Moved Permanently</code> و<code>304 Not Modified</code>).</li>
      <li><span class="status-badge status-4xx">4xx (خطأ عميل)</span>: يبدو أن العميل أخطأ (صياغة غير سليمة، أو غياب تصريح، أو مورد غير موجود).</li>
      <li><span class="status-badge status-5xx">5xx (خطأ خادم)</span>: فشل الخادم في تلبية طلب يبدو صالحًا بسبب عطل غير معالَج أو انقطاع في البنية التحتية.</li>
    </ul>

    <h2>3. دورة حياة الطلب في ASP.NET Core</h2>
    <p>
      كيف تتحول سلسلة بايتات تصل إلى بطاقة الشبكة لديك إلى كائن C# قوي الأنواع داخل <code>BookController</code>؟ يصوّر المخطط أدناه خط الأنابيب هذا؛ انقر أي مكوّن فيه لتفحص ما يحدث خلف الكواليس.
    </p>

    <!-- Interactive Pipeline SVG Explorer -->
    <div class="simulator-widget">
      <div class="simulator-header">
        <span class="simulator-title">🔍 معمارية تفاعلية: خط أنابيب الطلبات في ASP.NET Core</span>
        <span class="code-type-pill">انقر أي مرحلة لتفحصها</span>
      </div>
      <div class="simulator-body">
        <div class="pipeline-svg-wrapper">
          <svg class="pipeline-svg" viewBox="0 0 880 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradKestrel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#3b82f6"/>
                <stop offset="100%" stop-color="#1d4ed8"/>
              </linearGradient>
              <linearGradient id="gradMid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6366f1"/>
                <stop offset="100%" stop-color="#4338ca"/>
              </linearGradient>
              <linearGradient id="gradCtrl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#8b5cf6"/>
                <stop offset="100%" stop-color="#6d28d9"/>
              </linearGradient>
              <linearGradient id="gradSvc" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ec4899"/>
                <stop offset="100%" stop-color="#be185d"/>
              </linearGradient>
              <linearGradient id="gradEf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#10b981"/>
                <stop offset="100%" stop-color="#047857"/>
              </linearGradient>
              <linearGradient id="gradPg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0284c7"/>
                <stop offset="100%" stop-color="#0369a1"/>
              </linearGradient>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b"/>
              </marker>
            </defs>

            <!-- Node 1: Client -->
            <g class="pipeline-node" data-node="client" transform="translate(10, 45)">
              <rect width="105" height="75" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
              <text x="52" y="36" fill="#f8fafc" font-size="12" font-weight="700" text-anchor="middle">تطبيق العميل</text>
              <text x="52" y="54" fill="#94a3b8" font-size="10" text-anchor="middle">(ويب / جوّال)</text>
            </g>
            <line x1="115" y1="82" x2="140" y2="82" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- Node 2: Kestrel -->
            <g class="pipeline-node" data-node="kestrel" transform="translate(145, 45)">
              <rect width="105" height="75" rx="8" fill="url(#gradKestrel)" stroke="#60a5fa" stroke-width="1.5"/>
              <text x="52" y="36" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Kestrel</text>
              <text x="52" y="54" fill="#bfdbfe" font-size="10" text-anchor="middle">خادم الويب</text>
            </g>
            <line x1="250" y1="82" x2="275" y2="82" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- Node 3: Middleware -->
            <g class="pipeline-node selected" data-node="middleware" transform="translate(280, 45)">
              <rect width="120" height="75" rx="8" fill="url(#gradMid)" stroke="#818cf8" stroke-width="2"/>
              <text x="60" y="36" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Middleware</text>
              <text x="60" y="54" fill="#c7d2fe" font-size="10" text-anchor="middle">الوسائط والتوجيه</text>
            </g>
            <line x1="400" y1="82" x2="425" y2="82" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- Node 4: Controller -->
            <g class="pipeline-node" data-node="controller" transform="translate(430, 45)">
              <rect width="120" height="75" rx="8" fill="url(#gradCtrl)" stroke="#c084fc" stroke-width="1.5"/>
              <text x="60" y="36" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Controller</text>
              <text x="60" y="54" fill="#e9d5ff" font-size="10" text-anchor="middle">BookController</text>
            </g>
            <line x1="550" y1="82" x2="575" y2="82" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- Node 5: Service -->
            <g class="pipeline-node" data-node="service" transform="translate(580, 45)">
              <rect width="115" height="75" rx="8" fill="url(#gradSvc)" stroke="#f472b6" stroke-width="1.5"/>
              <text x="57" y="36" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Service Layer</text>
              <text x="57" y="54" fill="#fbcfe8" font-size="10" text-anchor="middle">BookService</text>
            </g>
            <line x1="695" y1="82" x2="720" y2="82" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- Node 6: EF Core & DB -->
            <g class="pipeline-node" data-node="database" transform="translate(725, 45)">
              <rect width="145" height="75" rx="8" fill="url(#gradPg)" stroke="#38bdf8" stroke-width="1.5"/>
              <text x="72" y="36" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">EF Core &amp; Postgres</text>
              <text x="72" y="54" fill="#bae6fd" font-size="10" text-anchor="middle">BooksContext</text>
            </g>
          </svg>
        </div>

        <!-- Inspector Output -->
        <div id="pipeline-inspector" class="pipeline-inspector-card">
          <div class="pipeline-inspector-title">
            <span>⚙️ المكوّن: خط أنابيب الوسائط والتوجيه</span>
          </div>
          <p id="inspector-desc" class="inspector-value">
            سلسلة من التفويضات (delegates) تُجمَّع في <code>Program.cs</code>. تنفّذ كل وسيطة منطقها وتمرّر التحكم إلى التالية عبر <code>next(context)</code>، ويمكنها فحص الاستجابة أو تعديلها في طريق العودة. يطابق <code>UseRouting()</code> عناوين URL الواردة مع نقاط النهاية، بينما يتحقق <code>UseAuthorization()</code> من الصلاحيات.
          </p>
          <div class="pipeline-inspector-grid">
            <div class="inspector-field">
              <div class="inspector-label">المدخلات</div>
              <div id="inspector-input" class="inspector-value"><code>HttpContext</code> خام أنشأه Kestrel</div>
            </div>
            <div class="inspector-field">
              <div class="inspector-label">المسؤولية الأساسية</div>
              <div id="inspector-duty" class="inspector-value">الاهتمامات الشاملة: الاستثناءات وإعادة التوجيه إلى TLS وCORS والمصادقة وتوزيع نقاط النهاية</div>
            </div>
            <div class="inspector-field">
              <div class="inspector-label">السياق في Raff</div>
              <div id="inspector-raff" class="inspector-value">يوزّع <code>POST /api/books</code> إلى <code>BookController.Add</code></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2>4. الطبقات المعمارية مقابل فرائض إطار العمل</h2>
    <p>
      من المفاهيم الخاطئة الشائعة لدى مطوّري الخلفيات الجدد الخلط بين <strong>قواعد HTTP</strong> و<strong>سلوكيات إطار ASP.NET Core</strong> و<strong>خيارات التصميم الخاصة بالتطبيق</strong>:
    </p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>المفهوم</th>
            <th>التصنيف</th>
            <th>مَن يفرضه؟</th>
            <th>مثال في Raff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>الحالة 201 Created</strong></td>
            <td>بروتوكول HTTP ‏(RFC 9110)</td>
            <td>مواصفة IETF</td>
            <td>يشير العقد إلى وجود مورد جديد عند ترويسة <code>Location</code>.</td>
          </tr>
          <tr>
            <td><strong>خط أنابيب الوسائط</strong></td>
            <td>سلوك إطار العمل</td>
            <td>محرّك ASP.NET Core</td>
            <td>تمر الطلبات عبر تفويضات <code>UseRouting</code> و<code>UseAuthorization</code> في <code>Program.cs</code>.</td>
          </tr>
          <tr>
            <td><strong>المتحكم مقابل طبقة الخدمة</strong></td>
            <td>معمارية التطبيق</td>
            <td>أنت (مهندس البرمجيات)</td>
            <td>تفويض <code>BookController</code> العمل إلى <code>IBookService</code> خيار كود نظيف، وليس فرضًا إلزاميًا من إطار العمل.</td>
          </tr>
          <tr>
            <td><strong>Minimal APIs</strong></td>
            <td>خيار في إطار العمل</td>
            <td>بديل في ASP.NET Core</td>
            <td>يمكن كتابة <code>app.MapPost("/api/books", ...)</code> دون متحكمات إطلاقًا.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="callout callout-tip">
      <div class="callout-icon">🎯</div>
      <div class="callout-content">
        <div class="callout-title">لماذا نفصل المتحكمات عن الخدمات في Raff؟</div>
        <p>
          لا يجبرك ASP.NET Core على إنشاء <code>IBookService</code>؛ يمكنك حقن <code>BooksContext</code> مباشرة في <code>BookController</code>. لكن إبقاء المتحكمات رفيعة يعني تركيزها الصارم على <strong>ترجمة HTTP</strong> (رموز الحالة ومعاملات المسار وترويسات الطلب)، بينما يغلّف <code>BookService</code> <strong>منطق النطاق</strong> الخالص الذي يمكن اختباره وحدةً دون محاكاة <code>HttpContext</code>.
        </p>
      </div>
    </div>

    <!-- Knowledge Check 1 -->
    <div class="exercise-card" id="qc-1-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">اختبار المعرفة 1.1</span>
          <span>بروتوكول الشبكة في HTTP</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          يتصل عميل جوّال بـ Raff ويرسل طلبًا. أي عبارة تصف بدقة انعدام الحالة في بروتوكول HTTP؟
        </div>
        <div class="quiz-options" data-qid="qc-1-1">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">يحتفظ الخادم بسجلات قاعدة البيانات في الذاكرة بين الطلبات كي تُنفَّذ الاستعلامات اللاحقة دون قراءة من القرص.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">كل طلب HTTP معزول؛ فلا يحتفظ الخادم افتراضيًا بسياق جلسة العميل، ولهذا يجب أن يوفّر كل طلب كل بيانات الاعتماد والمعاملات اللازمة.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">يُغلق مقبس TCP فورًا قبل إرجاع أي بايتات استجابة، ما يستلزم اللجوء إلى UDP.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">يحفظ ASP.NET Core تلقائيًا جميع متغيرات الطلب في ذاكرة مؤقتة عامة ساكنة بين كل المستخدمين.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-1-1">أرسل الإجابة</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-1-1" style="display:none;">إعادة المحاولة</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-1-1"></div>
      </div>
    </div>

    <!-- Knowledge Check 2 -->
    <div class="exercise-card" id="qc-1-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">اختبار المعرفة 1.2</span>
          <span>تسلسل رحلة الطلب</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          عندما يدخل طلب HTTP إلى تطبيق ASP.NET Core، بأي ترتيب زمني يجتاز مكوّنات الخلفية؟
        </div>
        <div class="quiz-options" data-qid="qc-1-2">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">PostgreSQL → Entity Framework Core → Controller Action → Kestrel → Middleware</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">Kestrel → Middleware Pipeline &amp; Routing → Model Binding &amp; Action Selection → Controller → Service Layer → EF Core &amp; Database</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">Service Layer → Kestrel → Routing Middleware → PostgreSQL → Controller Action</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">Routing Middleware → Kestrel → Controller Action → Model Binding → DbContext</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-1-2">أرسل الإجابة</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-1-2" style="display:none;">إعادة المحاولة</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-1-2"></div>
      </div>
    </div>

    <!-- Knowledge Check 3 -->
    <div class="exercise-card" id="qc-1-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">اختبار المعرفة 1.3</span>
          <span>المعمارية مقابل فرائض إطار العمل</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          أي مما يلي نمط معماري على مستوى التطبيق وليس متطلبًا ثابتًا في ASP.NET Core؟
        </div>
        <div class="quiz-options" data-qid="qc-1-3">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">وجود فئة <code>BookService</code> منفصلة بين المتحكم وEntity Framework Core.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">مرور الطلبات عبر خط أنابيب <code>HttpContext</code>.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">الاستماع لاتصالات TCP الواردة على منفذ الخادم عبر Kestrel أو HTTP.sys.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">تنفيذ الوسائط بالترتيب المسجّل في <code>Program.cs</code>.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-1-3">أرسل الإجابة</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-1-3" style="display:none;">إعادة المحاولة</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-1-3"></div>
      </div>
    </div>

  </div>

  <div class="lesson-nav-footer">
    <button class="btn-complete-lesson" data-lesson="lesson-1">
      <span class="complete-checkbox">✓</span> أكمل الدرس 1
    </button>
    <button class="btn-primary btn-next-lesson" data-target="lesson-2">
      التالي: مبادئ REST وأساليب HTTP ←
    </button>
  </div>
`
    },

    'lesson-2': {
      nav: 'REST وأساليب HTTP',
      content: `
  <div class="lesson-header-box">
    <div class="lesson-meta-bar">
      <span class="lesson-pill">الدرس 2</span>
      <span class="badge-time">قراءة وتمارين في 35 دقيقة</span>
    </div>
    <h1 class="lesson-h1">مبادئ REST وأساليب HTTP</h1>
    <p class="lesson-lead">
      تعلّم كيف تمثّل REST واجهتك الخلفية كموارد تُعرَف بأسماء، وافهم الفرق الجوهري بين الأساليب الآمنة ولا متمايزة، وأتقن رموز حالة HTTP القياسية.
    </p>
  </div>

  <div class="content-body">
    <h2>1. الموارد وعناوين URL الموجّهة نحو الموارد</h2>
    <p>
      في <strong>نقل الحالة التمثيلي (REST)</strong> تعرض واجهتك <em>موارد</em> — أشياء لا أفعال. وفي <strong>Raff</strong> الموارد هي الكتب والمؤلفون والمستخدمون وسجلات تقدّم القراءة.
    </p>
    <p>
      ينبغي أن تكون عناوين URI للموارد <strong>أسماء</strong>، بصيغة الجمع للمجموعات، وهرمية للموارد الفرعية:
    </p>
    <ul>
      <li><code>GET /api/books</code> — مجموعة الكتب.</li>
      <li><code>GET /api/books/42</code> — الكتاب المحدّد ذو المعرّف <code>42</code>.</li>
      <li><code>POST /api/books</code> — إنشاء كتاب جديد في المجموعة.</li>
      <li><code>PUT /api/books/42</code> — استبدال حالة الكتاب <code>42</code> بالكامل.</li>
      <li><code>PATCH /api/books/42</code> — تعديل الكتاب <code>42</code> جزئيًا.</li>
      <li><code>DELETE /api/books/42</code> — حذف الكتاب <code>42</code>.</li>
      <li><code>GET /api/books/42/authors</code> — المورد الفرعي الذي يجمع المؤلفين المرتبطين بالكتاب <code>42</code>.</li>
    </ul>

    <div class="callout callout-warning">
      <div class="callout-icon">⚠️</div>
      <div class="callout-content">
        <div class="callout-title">نمط مضاد: الأفعال في عناوين URL</div>
        <p>
          تجنّب نقاط نهاية مثل <code>/api/books/getall</code> أو <code>/api/books/create</code> أو <code>/api/books/delete/42</code>. في REST يحدّد فعل HTTP ‏(<code>GET</code> و<code>POST</code> و<code>DELETE</code>) العملية، بينما يحدّد URI المورد.
        </p>
      </div>
    </div>

    <h2>2. الأساليب الآمنة ولا متمايزة</h2>
    <p>
      يرسّخ RFC 9110 خاصيتين تقنيتين جوهريتين لأساليب HTTP يجب أن يفهمهما كل مطوّر خلفيات مبتدئ:
    </p>

    <div class="callout callout-note">
      <div class="callout-icon">🛡️</div>
      <div class="callout-content">
        <div class="callout-title">التعريفات الرسمية</div>
        <p>
          <strong>آمن (Safe):</strong> يكون أسلوب HTTP <em>آمنًا</em> إذا كانت دلالاته للقراءة فقط؛ فلا يجوز أن يغيّر استدعاؤه حالة الموارد على الخادم (وتُسمح الآثار الجانبية للتسجيل والتخزين المؤقت). ويمكن للعملاء تنفيذ الطلبات الآمنة مرارًا دون حذر.
        </p>
        <p style="margin-top: 0.5rem;">
          <strong>لا متمايز (Idempotent):</strong> يكون أسلوب HTTP <em>لا متمايزًا</em> إذا كان تكرار الطلب المتطابق يُحدث على الخادم الأثر المقصود ذاته الذي يحدثه طلب واحد. فإذا انقطعت الشبكة دفع العميل إلى إعادة محاولة طلب لا متمايز، لا تفسد حالة الخادم.
        </p>
      </div>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>الأسلوب</th>
            <th>الغرض الأساسي</th>
            <th>آمن؟</th>
            <th>لا متمايز؟</th>
            <th>جسم الطلب؟</th>
            <th>رمز النجاح المعتاد</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>GET</code></td>
            <td>استرجاع تمثيل المورد</td>
            <td><strong style="color:var(--success);">نعم</strong></td>
            <td><strong style="color:var(--success);">نعم</strong></td>
            <td>لا</td>
            <td><span class="status-badge status-2xx">200 OK</span></td>
          </tr>
          <tr>
            <td><code>POST</code></td>
            <td>إنشاء مورد جديد أو تشغيل عملية</td>
            <td><strong style="color:var(--danger);">لا</strong></td>
            <td><strong style="color:var(--danger);">لا</strong></td>
            <td>نعم</td>
            <td><span class="status-badge status-2xx">201 Created</span> / <code>200 OK</code></td>
          </tr>
          <tr>
            <td><code>PUT</code></td>
            <td>استبدال كامل للمورد المستهدف</td>
            <td><strong style="color:var(--danger);">لا</strong></td>
            <td><strong style="color:var(--success);">نعم</strong></td>
            <td>نعم (كامل)</td>
            <td><span class="status-badge status-2xx">200 OK</span> / <code>204 No Content</code></td>
          </tr>
          <tr>
            <td><code>PATCH</code></td>
            <td>تعديل جزئي للمورد المستهدف</td>
            <td><strong style="color:var(--danger);">لا</strong></td>
            <td><strong style="color:var(--warning);">يعتمد*</strong></td>
            <td>نعم (فرق)</td>
            <td><span class="status-badge status-2xx">200 OK</span> / <code>204 No Content</code></td>
          </tr>
          <tr>
            <td><code>DELETE</code></td>
            <td>حذف المورد المستهدف</td>
            <td><strong style="color:var(--danger);">لا</strong></td>
            <td><strong style="color:var(--success);">نعم</strong></td>
            <td>اختياري</td>
            <td><span class="status-badge status-2xx">204 No Content</span> / <code>200 OK</code></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p style="font-size:0.85rem; color:var(--text-muted); margin-top:-0.5rem;">
      * ملاحظة عن تفرّد PATCH: بينما يكون ضبط قيم الحقول عبر JSON Merge Patch ‏(RFC 7396) لا متمايزًا، فإن عمليات المصفوفات في JSON Patch ‏(RFC 6902) ‏(مثل "إلحاق عنصر") ليست كذلك.
    </p>

    <h2>3. الاستبدال الكامل (PUT) مقابل التعديل الجزئي (PATCH)</h2>
    <p>
      التمييز بين <code>PUT</code> و<code>PATCH</code> من أكثر المفاهيم تكرارًا في مقابلات الخلفيات:
    </p>
    <ul>
      <li>
        <strong>‏PUT /api/books/42:</strong> يمثّل <em>استبدالًا كاملًا</em> للمورد؛ يرسل العميل التمثيل الكامل للكتاب، وأي خصائص قائمة أُغفلت في الحمولة تُستبدل بقيمها الافتراضية (أو null).
      </li>
      <li>
        <strong>‏PATCH /api/books/42:</strong> يمثّل <em>تعديلًا جزئيًا</em>؛ يرسل العميل الخصائص التي تحتاج تغييرًا فقط، وتبقى الخصائص غير الممسوسة دون تغيير على الخادم.
      </li>
    </ul>

    <h2>4. رموز حالة HTTP الأساسية لواجهات الويب</h2>
    <p>
      الواجهة الممتازة تستخدم رموز الحالة بدقة للتواصل عن النتيجة:
    </p>
    <ul>
      <li><span class="status-badge status-2xx">200 OK</span> — نجاح قياسي مع جسم استجابة (مثل <code>GET /api/books/42</code>).</li>
      <li><span class="status-badge status-2xx">201 Created</span> — أُنشئ المورد، ويجب أن تتضمن ترويسة <code>Location</code> تشير إلى المورد الجديد.</li>
      <li><span class="status-badge status-2xx">204 No Content</span> — نجح الإجراء لكن لا يوجد جسم لإرجاعه (قياسي في <code>DELETE</code> أو بعض تحديثات <code>PUT</code>).</li>
      <li><span class="status-badge status-4xx">400 Bad Request</span> — JSON مشوّه أو فشل تحقق من النموذج أو أنواع معاملات غير صالحة.</li>
      <li><span class="status-badge status-4xx">401 Unauthorized</span> — غياب بيانات مصادقة صالحة (المستخدم غير مصادَق).</li>
      <li><span class="status-badge status-4xx">403 Forbidden</span> — العميل مصادَق لكنه يفتقر إلى صلاحية الوصول إلى هذا المورد أو تعديله.</li>
      <li><span class="status-badge status-4xx">404 Not Found</span> — عنوان URI المطلوب لا يطابق موردًا موجودًا.</li>
      <li><span class="status-badge status-4xx">409 Conflict</span> — الطلب يتعارض مع حالة الخادم الراهنة (مثل تكرار ISBN فريد أو عدم تطابق نسخة التزامن).</li>
      <li><span class="status-badge status-5xx">500 Internal Server Error</span> — وقع استثناء غير معالَج على الخادم.</li>
    </ul>

    <div class="callout callout-important">
      <div class="callout-icon">🔍</div>
      <div class="callout-content">
        <div class="callout-title">سلوك إطار العمل مقابل أعراف الواجهة في Raff</div>
        <p>
          لننظر إلى ملفك الحالي <code>BookController.cs</code>:
        </p>
        <pre style="margin-top:0.5rem; padding:0.75rem;"><code class="language-csharp">[HttpPost]
public async Task&lt;IActionResult&gt; Add([FromBody] createBookDto dto)
{
    var book = await _bookService.CreateBookAsync(dto);
    return Ok(book); // &lt;-- يعيد 200 OK!
}</code></pre>
        <p style="margin-top:0.5rem;">
          لا يعترض ASP.NET Core عندما تعيد <code>Ok(book)</code> من إجراء <code>HttpPost</code>. لكن أعراف REST تقتضي عند إنشاء مورد إرجاع <span class="status-badge status-2xx">201 Created</span> مع ترويسة <code>Location</code> عبر <code>CreatedAtAction</code>:
        </p>
        <pre style="margin-top:0.5rem; padding:0.75rem;"><code class="language-csharp">return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);</code></pre>
      </div>
    </div>

    <!-- Knowledge Check 2.1 -->
    <div class="exercise-card" id="qc-2-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">تمرين سيناريو 2.1</span>
          <span>اختيار أسلوب HTTP ورمز الحالة</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          <strong>السيناريو:</strong> ينقر مستخدم على «حذف الكتاب رقم 42» في عميل Raff على الويب. الكتاب موجود ويُحذف بنجاح من قاعدة بيانات PostgreSQL. ولا تحتاج الواجهة إلى إرجاع أي بيانات كتاب في جسم الاستجابة. فما أسلوب HTTP ورمز الحالة الأكثر قياسية؟
        </div>
        <div class="quiz-options" data-qid="qc-2-1">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text"><code>POST /api/books/delete/42</code> مع إرجاع <code>200 OK</code></div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text"><code>DELETE /api/books/42</code> مع إرجاع <code>204 No Content</code></div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text"><code>GET /api/books/42?action=remove</code> مع إرجاع <code>200 OK</code></div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text"><code>PUT /api/books/42</code> مع إرجاع <code>201 Created</code></div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-2-1">أرسل الإجابة</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-2-1" style="display:none;">إعادة المحاولة</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-2-1"></div>
      </div>
    </div>

    <!-- Knowledge Check 2.2 -->
    <div class="exercise-card" id="qc-2-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">تمرين سيناريو 2.2</span>
          <span>الدلالات الآمنة مقابل لا متمايزة</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          يرسل عميل جوّال على شبكة متذبذبة طلب <code>POST /api/books</code> لإنشاء كتاب. تنتهي مهلة الشبكة قبل استلام الاستجابة، فيعيد العميل إرسال الطلب <code>POST</code> نفسه حرفيًا. ما الخطر القائم إذا لم تُصمَّم نقطة النهاية مع إزالة تكرار مخصصة؟
        </div>
        <div class="quiz-options" data-qid="qc-2-2">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">لا خطر، لأن POST أسلوب HTTP لا متمايز بحكم تعريفه في RFC 9110.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">قد ينشئ الخادم سجلّي كتاب مكررين متطابقين، لأن POST ليس آمنًا ولا لا متمايزًا.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">يلغي ASP.NET Core الطلب الثاني تلقائيًا ويعيد 304 Not Modified.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">تحوّل PostgreSQL طلب POST الثاني تلقائيًا إلى طلب PUT.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-2-2">أرسل الإجابة</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-2-2" style="display:none;">إعادة المحاولة</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-2-2"></div>
      </div>
    </div>

    <!-- Knowledge Check 2.3 -->
    <div class="exercise-card" id="qc-2-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">تمرين سيناريو 2.3</span>
          <span>دقة رموز الحالة</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          يحاول عميل إنشاء كتاب جديد بالمعرّف الدولي ISBN <code>978-0131101630</code>، لكن كتابًا بهذا الـ ISBN نفسه موجود بالفعل في جدول قاعدة بيانات Raff، ما يخالف قيدًا فريدًا. أي رمز حالة HTTP ينبغي أن تعيده الواجهة؟
        </div>
        <div class="quiz-options" data-qid="qc-2-3">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text"><code>404 Not Found</code></div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text"><code>500 Internal Server Error</code></div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text"><code>409 Conflict</code></div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text"><code>401 Unauthorized</code></div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-2-3">أرسل الإجابة</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-2-3" style="display:none;">إعادة المحاولة</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-2-3"></div>
      </div>
    </div>

    <!-- Knowledge Check 2.4 -->
    <div class="exercise-card" id="qc-2-4">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">تمرين سيناريو 2.4</span>
          <span>دلالات PUT مقابل PATCH</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          لسجل كتاب قائم في Raff عنوان وملخص وسنة نشر ورابط غلاف. يرسل عميل طلب <code>PUT /api/books/42</code> بحمولة JSON تحتوي فقط على <code>{"title": "عنوان محدَّث"}</code>. وفق دلالات <code>PUT</code> الصارمة، ماذا ينبغي أن يحدث للخصائص الأخرى (الملخص وسنة النشر ورابط الغلاف)؟
        </div>
        <div class="quiz-options" data-qid="qc-2-4">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">يجب أن تبقى كما كانت تمامًا قبل الطلب دون أي مساس.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">لأن PUT استبدال كامل، يجب استبدال الحقول المُغفَلة بقيم افتراضية/null وفق التمثيل الجديد.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">يجب على الخادم حذف الكتاب من قاعدة البيانات وإعادة إنشائه بالمعرّف 1.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">يحوّل ASP.NET Core طلبات PUT تلقائيًا إلى طلبات PATCH.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-2-4">أرسل الإجابة</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-2-4" style="display:none;">إعادة المحاولة</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-2-4"></div>
      </div>
    </div>

  </div>

  <div class="lesson-nav-footer">
    <button class="btn-complete-lesson" data-lesson="lesson-2">
      <span class="complete-checkbox">✓</span> أكمل الدرس 2
    </button>
    <button class="btn-primary btn-next-lesson" data-target="lesson-3">
      التالي: التوجيه والمتحكمات ←
    </button>
  </div>
`
    },

    'assessment': {
      nav: 'التقييم الختامي (80%)',
      content: `
  <div class="lesson-header-box">
    <div class="lesson-meta-bar">
      <span class="lesson-pill">التقويم الختامي</span>
      <span class="badge-time">درجة النجاح: 80%</span>
    </div>
    <h1 class="lesson-h1">التقييم الختامي للوحدة الأولى</h1>
    <p class="lesson-lead">
      اختبر فهمك العميق لآليات HTTP وتوجيه ASP.NET Core وربط النماذج وعقود DTO ودلالات التحديث الجزئي. أرسل الأسئلة العشرة كاملة لتحصل على بطاقة نتائجك التشخيصية وتفصيل المواضيع.
    </p>
  </div>

  <div class="content-body">
    <div id="assessment-container">
      <!-- 10 Comprehensive Assessment Questions will render here -->
    </div>

    <div style="margin-top: 2rem; display: flex; justify-content: center;">
      <button class="btn-primary" id="btn-submit-final-assessment" style="font-size: 1.05rem; padding: 0.8rem 2rem;">
        📊 صحّح التقييم وأكمله
      </button>
    </div>

    <!-- Results Display -->
    <div id="assessment-results" style="display:none;"></div>
  </div>
`
    }

  }

};
