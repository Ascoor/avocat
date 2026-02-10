# Modules CRUD Matrix (Legacy - Inferred from Routes)

> المصفوفة أدناه مستنتجة من المسارات في `routes/api.php` ولا توجد سياسات/صلاحيات فعلية في الكود.

| Module | View | Create | Update | Delete | Scope | Source |
| --- | --- | --- | --- | --- | --- | --- |
| clients | ✅ | ✅ | ✅ | ✅ | global (unknown) | apiResource clients.【F:avocatapp/routes/api.php†L96-L107】 |
| unclients | ✅ | ✅ | ✅ | ✅ | global (unknown) | apiResource unclients.【F:avocatapp/routes/api.php†L96-L107】 |
| lawyers | ✅ | ✅ | ✅ | ✅ | global (unknown) | apiResource lawyers + explicit routes.【F:avocatapp/routes/api.php†L96-L124】 |
| courts | ✅ | ✅ | ✅ | ✅ | global (unknown) | apiResource courts.【F:avocatapp/routes/api.php†L96-L107】 |
| court_types | ✅ | ✅ | ✅ | ✅ | global (unknown) | apiResource court_types + extra get by id.【F:avocatapp/routes/api.php†L96-L128】 |
| court_levels | ✅ | ✅ | ✅ | ✅ | global (unknown) | apiResource court_levels.【F:avocatapp/routes/api.php†L99-L104】 |
| legal_cases | ✅ | ✅ | ✅ | ✅ | global (unknown) | apiResource legal-cases + extra attach/detach.|【F:avocatapp/routes/api.php†L100-L137】 |
| case_types | ✅ | ✅ | ✅ | ✅ | global (unknown) | apiResource case_types + subtypes routes.【F:avocatapp/routes/api.php†L101-L132】 |
| case_sub_types | ✅ | ✅ | ✅ | ✅ | global (unknown) | apiResource case_sub_types.【F:avocatapp/routes/api.php†L101-L106】 |
| procedure_types | ✅ | ✅ | ✅ | ✅ | global (unknown) | apiResource procedure_types.【F:avocatapp/routes/api.php†L102-L106】 |
| procedure_place_types | ✅ | ✅ | ✅ | ✅ | global (unknown) | apiResource procedure_place_types.【F:avocatapp/routes/api.php†L102-L106】 |
| expense_categories | ✅ | ✅ | ✅ | ✅ | global (unknown) | apiResource expense_categories + list route.【F:avocatapp/routes/api.php†L103-L198】 |
| procedures | ✅ | ✅ | ✅ | ✅ | global (unknown) | apiResource procedures + search filters.【F:avocatapp/routes/api.php†L103-L191】 |
| services | ✅ | ✅ | ✅ | ✅ | global (unknown) | resource + group CRUD routes.【F:avocatapp/routes/api.php†L104-L176】 |
| service_procedures | ✅ | ✅ | ✅ | ✅ | global (unknown) | service-procedures CRUD routes.【F:avocatapp/routes/api.php†L177-L181】 |
| legal_ads | ✅ | ✅ | ✅ | ✅ | global (unknown) | legal-ads routes.【F:avocatapp/routes/api.php†L139-L149】 |
| legal_ad_types | ✅ | ✅ | — | — | global (unknown) | legal_ad_types routes (GET/POST only).【F:avocatapp/routes/api.php†L140-L144】 |
| legal_sessions | ✅ | ✅ | ✅ | ✅ | global (unknown) | legal_sessions routes.【F:avocatapp/routes/api.php†L152-L163】 |
| legal_session_types | ✅ | — | — | — | global (unknown) | legal_session_types index only.【F:avocatapp/routes/api.php†L153-L156】 |
| legal_documents | ✅ | ✅ | ✅ | ✅ | global (unknown) | doc types/subtypes + upload routes.【F:avocatapp/routes/api.php†L84-L96】 |
| notifications | ✅ | ✅ | ✅ (mark read) | — | global (unknown) | notifications routes.【F:avocatapp/routes/api.php†L199-L203】 |
| events | ✅ | ✅ | — | — | global (unknown) | events routes.【F:avocatapp/routes/api.php†L201-L204】 |
| users (profile) | ✅ | — | ✅ | — | self? | user profile routes.【F:avocatapp/routes/api.php†L60-L74】 |
| auth | — | ✅ (register/login) | — | — | public/auth | auth routes (register/login/forgot/reset).【F:avocatapp/routes/api.php†L96-L99】 |
