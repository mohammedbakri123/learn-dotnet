/* ============================================================
   Raff Backend Academy — module registry
   The hub page and every module page read this list.
   ============================================================ */

window.RAFF_MODULES = [
  {
    id: 'module-01',
    number: '1',
    icon: '🌐',
    title: 'ASP.NET Core Web APIs',
    title_ar: 'واجهات برمجة تطبيقات الويب في ASP.NET Core',
    subtitle: 'HTTP, routing, controllers, and the request pipeline',
    subtitle_ar: 'بروتوكول HTTP، والتوجيه، والمتحكمات، وخط أنابيب الطلبات',
    file: 'pages/module-01.html',
    storageKey: 'raff_aspnet_module_01_state'
  },
  {
    id: 'module-02',
    number: '2',
    icon: '🗄️',
    title: 'EF Core Internals & Querying',
    title_ar: 'أعماق EF Core والاستعلامات',
    subtitle: 'DbContext, change tracking, LINQ translation, and SQL inspection',
    subtitle_ar: 'سياق DbContext، وتتبع التغييرات، وترجمة LINQ، وفحص SQL',
    file: 'pages/module-02.html',
    storageKey: 'raff_efcore_module_02_state'
  },
  {
    id: 'module-03',
    number: '3',
    icon: '⚡',
    title: 'EF Core Relationships & Query Performance',
    title_ar: 'علاقات EF Core وأداء الاستعلامات',
    subtitle: 'Navigations, loading strategies, N+1, projections, and fix-up',
    subtitle_ar: 'خصائص التنقل، واستراتيجيات التحميل، ومشكلة N+1، والإسقاطات، وربط الكيانات (fix-up)',
    file: 'pages/module-03.html',
    storageKey: 'raff_efcore_module_03_state'
  },
  {
    id: 'module-04',
    number: '4',
    icon: '🛡️',
    title: 'Validation, PATCH & Error Handling',
    subtitle: 'ModelState, validation attributes, rule layers, PATCH, and ProblemDetails',
    file: 'pages/module-04.html',
    storageKey: 'raff_aspnet_module_04_state'
  },
  {
    id: 'module-05',
    number: '5',
    icon: '🧩',
    title: 'Services, Dependency Injection, and Application Architecture',
    title_ar: 'الخدمات وحقن التبعيات ومعمارية التطبيق',
    subtitle: 'From Controllers to Maintainable ASP.NET Core Applications',
    subtitle_ar: 'من المتحكمات إلى تطبيقات ASP.NET Core قابلة للصيانة',
    file: 'pages/module-05.html',
    storageKey: 'raff_aspnet_module_05_state'
  },
  {
    id: 'module-06',
    number: '6',
    icon: '🔐',
    title: 'Authentication and Authorization in ASP.NET Core',
    title_ar: 'المصادقة والتخويل في ASP.NET Core',
    subtitle: 'Identity, JWT bearer tokens, claims, policies, and resource ownership',
    subtitle_ar: 'الهوية، ورموز JWT، والمطالبات، والسياسات، وملكية الموارد',
    file: 'pages/module-06.html',
    storageKey: 'raff_aspnet_module_06_state'
  }
];
