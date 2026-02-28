# CasesTreeList (RTL)

## الهيكل
- `CasesTreeList`: القائمة الرئيسية للقضايا/الخدمات لموكل محدد.
- `CaseRow`: صف قضية قابل للتوسيع inline.
- `ChildrenList`: يعرض `SessionsSection` + `ActionsSection` بشكل متدرج.
- `useCasesTreeState`: يدير `expandedCaseIds`, `selectedCaseId`, `selectedChildItem`, `loadingByCaseId`, `errorByCaseId`, `childrenCacheByCaseId`.
- `buildCasesTreeApi`: API mock يتضمن:
  - `getCasesByClient(clientId)`
  - `getCaseChildren(caseId)`

## ملاحظات الأداء
- Lazy load عند أول توسعة للقضية فقط.
- Cache محلي للـ children لكل قضية.
- Pagination (`pageSize`) للقوائم الطويلة.

## سيناريوهات الاختبار
1. اختيار موكل => تظهر القضايا والخدمات في نفس القائمة.
2. الضغط على قضية => توسعة inline بدون التنقل من القائمة.
3. أثناء التحميل => يظهر skeleton.
4. حالة فارغة => تظهر رسالة empty state أسفل القضية.
5. حالة خطأ => رسالة خطأ مع زر إعادة المحاولة.
6. اختيار جلسة/إجراء => فتح تفاصيل في panel جانبي.
7. `expansionMode="single"` => قضية واحدة فقط متوسعة.
8. `expansionMode="multi"` => عدة قضايا متوسعة.
