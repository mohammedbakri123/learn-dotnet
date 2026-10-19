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
    subtitle: 'HTTP, routing, controllers, and the request pipeline',
    file: 'pages/module-01.html',
    storageKey: 'raff_aspnet_module_01_state'
  },
  {
    id: 'module-02',
    number: '2',
    icon: '🗄️',
    title: 'EF Core Internals & Querying',
    subtitle: 'DbContext, change tracking, LINQ translation, and SQL inspection',
    file: 'pages/module-02.html',
    storageKey: 'raff_efcore_module_02_state'
  },
  {
    id: 'module-03',
    number: '3',
    icon: '⚡',
    title: 'EF Core Relationships & Query Performance',
    subtitle: 'Navigations, loading strategies, N+1, projections, and fix-up',
    file: 'pages/module-03.html',
    storageKey: 'raff_efcore_module_03_state'
  }
];
