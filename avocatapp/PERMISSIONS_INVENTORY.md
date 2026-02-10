# Permissions Inventory (Legacy - Inferred)

> ملاحظة: لا توجد جداول Permissions أو سياسات/بوابات واضحة. لذلك كل العناصر أدناه **مستنتجة** من المسارات (routes) وأسماء الـ controllers فقط.

## Roles (موجودة صراحة)

| Role Value | Source | Notes |
| --- | --- | --- |
| `1` | `users.role` enum in migration + seeder list | لا يوجد وصف للدور في الكود.【F:avocatapp/database/migrations/2014_10_12_000000_create_users_table.php†L14-L30】【F:avocatapp/database/seeders/UsersTableSeeder.php†L12-L56】 |
| `2` | `users.role` enum in migration + seeder list | لا يوجد وصف للدور في الكود.【F:avocatapp/database/migrations/2014_10_12_000000_create_users_table.php†L14-L30】【F:avocatapp/database/seeders/UsersTableSeeder.php†L12-L56】 |
| `3` | `users.role` enum in migration + seeder list | لا يوجد وصف للدور في الكود.【F:avocatapp/database/migrations/2014_10_12_000000_create_users_table.php†L14-L30】【F:avocatapp/database/seeders/UsersTableSeeder.php†L12-L56】 |

## Permissions (مستنتجة من routes/controllers)

### REST/CRUD modules (inferred)

| Permission (proposed) | Module | Action | Scope | Source | Notes |
| --- | --- | --- | --- | --- | --- |
| `clients.view` | clients | index/show | global | `Route::apiResource('clients', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L107】 |
| `clients.create` | clients | store | global | `Route::apiResource('clients', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L107】 |
| `clients.update` | clients | update | global | `Route::apiResource('clients', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L107】 |
| `clients.delete` | clients | destroy | global | `Route::apiResource('clients', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L107】 |

| `unclients.view` | unclients | index/show | global | `Route::apiResource('unclients', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L107】 |
| `unclients.create` | unclients | store | global | `Route::apiResource('unclients', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L107】 |
| `unclients.update` | unclients | update | global | `Route::apiResource('unclients', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L107】 |
| `unclients.delete` | unclients | destroy | global | `Route::apiResource('unclients', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L107】 |

| `lawyers.view` | lawyers | index/show | global | `Route::apiResource('lawyers', ...)` + explicit show/update/delete | مستنتج من apiResource + إضافات lawyer routes.【F:avocatapp/routes/api.php†L96-L124】 |
| `lawyers.create` | lawyers | store | global | `Route::apiResource('lawyers', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L107】 |
| `lawyers.update` | lawyers | update | global | `Route::apiResource('lawyers', ...)` + explicit update | مستنتج.【F:avocatapp/routes/api.php†L96-L124】 |
| `lawyers.delete` | lawyers | destroy | global | `Route::apiResource('lawyers', ...)` + explicit delete | مستنتج.【F:avocatapp/routes/api.php†L96-L124】 |

| `courts.view` | courts | index/show | global | `Route::apiResource('courts', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L107】 |
| `courts.create` | courts | store | global | `Route::apiResource('courts', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L107】 |
| `courts.update` | courts | update | global | `Route::apiResource('courts', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L107】 |
| `courts.delete` | courts | destroy | global | `Route::apiResource('courts', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L107】 |

| `court_types.view` | court_types | index/show | global | `Route::apiResource('court_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L104】 |
| `court_types.create` | court_types | store | global | `Route::apiResource('court_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L104】 |
| `court_types.update` | court_types | update | global | `Route::apiResource('court_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L104】 |
| `court_types.delete` | court_types | destroy | global | `Route::apiResource('court_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L96-L104】 |

| `court_levels.view` | court_levels | index/show | global | `Route::apiResource('court_levels', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L99-L104】 |
| `court_levels.create` | court_levels | store | global | `Route::apiResource('court_levels', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L99-L104】 |
| `court_levels.update` | court_levels | update | global | `Route::apiResource('court_levels', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L99-L104】 |
| `court_levels.delete` | court_levels | destroy | global | `Route::apiResource('court_levels', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L99-L104】 |

| `legal_cases.view` | legal_cases | index/show | global | `Route::apiResource('legal-cases', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L100-L105】 |
| `legal_cases.create` | legal_cases | store | global | `Route::apiResource('legal-cases', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L100-L105】 |
| `legal_cases.update` | legal_cases | update | global | `Route::apiResource('legal-cases', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L100-L105】 |
| `legal_cases.delete` | legal_cases | destroy | global | `Route::apiResource('legal-cases', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L100-L105】 |

| `case_types.view` | case_types | index/show | global | `Route::apiResource('case_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L101-L106】 |
| `case_types.create` | case_types | store | global | `Route::apiResource('case_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L101-L106】 |
| `case_types.update` | case_types | update | global | `Route::apiResource('case_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L101-L106】 |
| `case_types.delete` | case_types | destroy | global | `Route::apiResource('case_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L101-L106】 |

| `case_sub_types.view` | case_sub_types | index/show | global | `Route::apiResource('case_sub_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L101-L106】 |
| `case_sub_types.create` | case_sub_types | store | global | `Route::apiResource('case_sub_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L101-L106】 |
| `case_sub_types.update` | case_sub_types | update | global | `Route::apiResource('case_sub_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L101-L106】 |
| `case_sub_types.delete` | case_sub_types | destroy | global | `Route::apiResource('case_sub_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L101-L106】 |

| `procedure_types.view` | procedure_types | index/show | global | `Route::apiResource('procedure_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L102-L106】 |
| `procedure_types.create` | procedure_types | store | global | `Route::apiResource('procedure_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L102-L106】 |
| `procedure_types.update` | procedure_types | update | global | `Route::apiResource('procedure_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L102-L106】 |
| `procedure_types.delete` | procedure_types | destroy | global | `Route::apiResource('procedure_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L102-L106】 |

| `procedure_place_types.view` | procedure_place_types | index/show | global | `Route::apiResource('procedure_place_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L102-L106】 |
| `procedure_place_types.create` | procedure_place_types | store | global | `Route::apiResource('procedure_place_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L102-L106】 |
| `procedure_place_types.update` | procedure_place_types | update | global | `Route::apiResource('procedure_place_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L102-L106】 |
| `procedure_place_types.delete` | procedure_place_types | destroy | global | `Route::apiResource('procedure_place_types', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L102-L106】 |

| `expense_categories.view` | expense_categories | index/show | global | `Route::apiResource('expense_categories', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L103-L107】 |
| `expense_categories.create` | expense_categories | store | global | `Route::apiResource('expense_categories', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L103-L107】 |
| `expense_categories.update` | expense_categories | update | global | `Route::apiResource('expense_categories', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L103-L107】 |
| `expense_categories.delete` | expense_categories | destroy | global | `Route::apiResource('expense_categories', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L103-L107】 |

| `procedures.view` | procedures | index/show | global | `Route::apiResource('procedures', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L103-L108】 |
| `procedures.create` | procedures | store | global | `Route::apiResource('procedures', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L103-L108】 |
| `procedures.update` | procedures | update | global | `Route::apiResource('procedures', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L103-L108】 |
| `procedures.delete` | procedures | destroy | global | `Route::apiResource('procedures', ...)` | مستنتج من apiResource.【F:avocatapp/routes/api.php†L103-L108】 |

| `services.view` | services | index/show | global | `Route::resource('services', ...)` + grouped routes | مستنتج من resource/routes group.【F:avocatapp/routes/api.php†L104-L176】 |
| `services.create` | services | store | global | `Route::resource('services', ...)` + grouped routes | مستنتج من resource/routes group.【F:avocatapp/routes/api.php†L104-L176】 |
| `services.update` | services | update | global | `Route::resource('services', ...)` + grouped routes | مستنتج من resource/routes group.【F:avocatapp/routes/api.php†L104-L176】 |
| `services.delete` | services | destroy | global | `Route::resource('services', ...)` + grouped routes | مستنتج من resource/routes group.【F:avocatapp/routes/api.php†L104-L176】 |

### Other actions (inferred)

| Permission (proposed) | Module | Action | Scope | Source | Notes |
| --- | --- | --- | --- | --- | --- |
| `legal_documents.view_types` | legal_documents | view | global | `/doc-types` GET route | مستنتج من routes.【F:avocatapp/routes/api.php†L84-L95】 |
| `legal_documents.manage_types` | legal_documents | create/update/delete | global | `/doc-types` POST/PUT/DELETE routes | مستنتج من routes.【F:avocatapp/routes/api.php†L84-L95】 |
| `legal_documents.manage_subtypes` | legal_documents | create/update | global | `/doc-sub-types` POST/PUT routes | مستنتج من routes.【F:avocatapp/routes/api.php†L86-L90】 |
| `legal_documents.upload` | legal_documents | upload | global | `/legal-doc-upload` POST | مستنتج من routes.【F:avocatapp/routes/api.php†L94-L96】 |

| `legal_ads.view` | legal_ads | index/show | global | `/legal-ads` GET + `/legal-ads/{legCaseId}` | مستنتج من routes.【F:avocatapp/routes/api.php†L139-L149】 |
| `legal_ads.create` | legal_ads | store | global | `/legal-ads` POST | مستنتج من routes.【F:avocatapp/routes/api.php†L143-L147】 |
| `legal_ads.update` | legal_ads | update | global | `/legal-ads/{legalAdId}` PUT | مستنتج من routes.【F:avocatapp/routes/api.php†L145-L148】 |
| `legal_ads.delete` | legal_ads | destroy | global | `/legal-ads/{legalAdId}` DELETE | مستنتج من routes.【F:avocatapp/routes/api.php†L147-L148】 |
| `legal_ad_types.view` | legal_ad_types | index | global | `/legal_ad_types` GET | مستنتج من routes.【F:avocatapp/routes/api.php†L140-L144】 |
| `legal_ad_types.create` | legal_ad_types | store | global | `/legal_ad_types` POST | مستنتج من routes.【F:avocatapp/routes/api.php†L140-L144】 |

| `legal_sessions.view` | legal_sessions | index/show | global | `/legal_sessions` GET + filtered endpoints | مستنتج من routes.【F:avocatapp/routes/api.php†L152-L163】 |
| `legal_sessions.create` | legal_sessions | store | global | `/legal_sessions` POST | مستنتج من routes.【F:avocatapp/routes/api.php†L159-L162】 |
| `legal_sessions.update` | legal_sessions | update | global | `/legal_sessions/{id}` PUT | مستنتج من routes.【F:avocatapp/routes/api.php†L160-L162】 |
| `legal_sessions.delete` | legal_sessions | destroy | global | `/legal_sessions/{id}` DELETE | مستنتج من routes.【F:avocatapp/routes/api.php†L161-L162】 |
| `legal_session_types.view` | legal_session_types | index | global | `/legal_session_types` GET | مستنتج من routes.【F:avocatapp/routes/api.php†L153-L156】 |

| `case_status.view` | case_status | fetch/index | global | `/case-status` GET | مستنتج من routes.【F:avocatapp/routes/api.php†L154-L167】 |
| `court_search.view` | court_search | search | global | `/search-court` + `/court-search/*` | مستنتج من routes.【F:avocatapp/routes/api.php†L50-L189】 |
| `procedure_search.view` | procedure_search | search | global | `/procedures-search` | مستنتج من routes.【F:avocatapp/routes/api.php†L190-L191】 |

| `legal_cases.manage_clients` | legal_cases | attach/detach | global | `/legal-cases/{legCaseId}/add_clients` + delete client | مستنتج من routes.【F:avocatapp/routes/api.php†L129-L135】 |
| `legal_cases.manage_courts` | legal_cases | attach/detach | global | `/legal-cases/add_courts` + `/leg-case/remove-court` | مستنتج من routes.【F:avocatapp/routes/api.php†L135-L137】 |

| `service_procedures.view` | service_procedures | index | global | `/service-procedures/{serviceId}` GET | مستنتج من routes.【F:avocatapp/routes/api.php†L177-L181】 |
| `service_procedures.create` | service_procedures | store | global | `/service-procedures` POST | مستنتج من routes.【F:avocatapp/routes/api.php†L177-L181】 |
| `service_procedures.update` | service_procedures | update | global | `/service-procedure/{id}` PUT | مستنتج من routes.【F:avocatapp/routes/api.php†L178-L181】 |
| `service_procedures.delete` | service_procedures | destroy | global | `/service-procedure/{id}` DELETE | مستنتج من routes.【F:avocatapp/routes/api.php†L179-L181】 |

| `notifications.view` | notifications | index | global | `notifications/{userId}` GET | مستنتج من routes.【F:avocatapp/routes/api.php†L199-L200】 |
| `notifications.mark_read` | notifications | update | global | `notifications/{notificationId}/read` POST | مستنتج من routes.【F:avocatapp/routes/api.php†L199-L201】 |
| `notifications.create` | notifications | store | global | `notification` POST | مستنتج من routes.【F:avocatapp/routes/api.php†L201-L203】 |

| `events.view` | events | index | global | `/events` GET | مستنتج من routes.【F:avocatapp/routes/api.php†L202-L204】 |
| `events.create` | events | store | global | `/event` POST | مستنتج من routes.【F:avocatapp/routes/api.php†L201-L203】 |

| `users.update_profile` | users | update | self? | `/user/{user}` PUT | مستنتج من routes/controllers.【F:avocatapp/routes/api.php†L60-L74】【F:avocatapp/app/Http/Controllers/UserController.php†L12-L60】 |
| `users.view_profile` | users | view | self? | `/user/{user}` GET | مستنتج من routes/controllers.【F:avocatapp/routes/api.php†L66-L74】【F:avocatapp/app/Http/Controllers/UserController.php†L62-L74】 |

| `auth.register` | auth | register | public | `/register` POST | مستنتج من routes.【F:avocatapp/routes/api.php†L96-L99】 |
| `auth.login` | auth | login | public | `/login` POST | مستنتج من routes.【F:avocatapp/routes/api.php†L96-L99】 |
| `auth.logout` | auth | logout | auth | `/logout` POST | مستنتج من routes.【F:avocatapp/routes/api.php†L70-L74】 |
| `auth.password_forgot` | auth | forgot | public | `/forgot-password` POST | مستنتج من routes.【F:avocatapp/routes/api.php†L98-L99】 |
| `auth.password_reset` | auth | reset | public | `/reset-password` POST | مستنتج من routes.【F:avocatapp/routes/api.php†L98-L99】 |
