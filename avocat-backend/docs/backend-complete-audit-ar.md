# توثيق شامل للباك-إند (جرد + تحليل تحسينات)

> هذا المستند مولّد من قراءة هيكل المشروع وتحليل الملفات المصدرية في `avocat-backend` بدون تشغيل التطبيق (لعدم توفر الاعتمادات المحلية).

- عدد المتحكمات API: **47**
- عدد المودلات: **55**
- عدد ملفات الهجرات (migrations) ذات تأثير على الجداول: **58**
- عدد أصناف الخدمات/الدعم/السياسات المفحوصة: **15**

## 1) المتحكمات (Controllers) ووظائفها

| المتحكم | المسار | الدوال العامة |
|---|---|---|
| `AuthController` | `app/Http/Controllers/Api/AuthController.php` | `register`, `login`, `forgotPassword`, `resetPassword`, `logout`, `verifyEmail`, `resendVerificationEmail`, `token`, `me` |
| `BaseApiController` | `app/Http/Controllers/Api/BaseApiController.php` | — |
| `CaseReportingController` | `app/Http/Controllers/Api/CaseReportingController.php` | `show`, `search` |
| `CaseStatusController` | `app/Http/Controllers/Api/CaseStatusController.php` | `fetchCaseStatus`, `index`, `fetchDegrees`, `getCourtOptions`, `getCaseTypeOptions`, `getCaseYearOptions`, `getCaseDetails` |
| `CaseSubTypeController` | `app/Http/Controllers/Api/CaseSubTypeController.php` | `index`, `show`, `store`, `update`, `destroy` |
| `CaseTypeController` | `app/Http/Controllers/Api/CaseTypeController.php` | `index`, `store`, `show`, `update`, `destroy`, `getCaseTypesWithSubTypes` |
| `ClientController` | `app/Http/Controllers/Api/ClientController.php` | `__construct`, `index`, `store`, `update`, `show`, `destroy` |
| `CourtController` | `app/Http/Controllers/Api/CourtController.php` | `index`, `store`, `update`, `destroy` |
| `CourtLevelController` | `app/Http/Controllers/Api/CourtLevelController.php` | `index`, `store`, `show`, `update`, `destroy` |
| `CourtSearchController` | `app/Http/Controllers/Api/CourtSearchController.php` | `index`, `getDegrees`, `getCourts`, `getCaseTypes` |
| `CourtTypeController` | `app/Http/Controllers/Api/CourtTypeController.php` | `index`, `show`, `store`, `update`, `destroy`, `getCourtTypesWithSubTypes` |
| `DashboardController` | `app/Http/Controllers/Api/DashboardController.php` | `getClients`, `getClientDetails`, `getLegalCaseDetails`, `getPowerOfAttorneys`, `getClientByNameOrPhoneNumber` |
| `DocumentCenterController` | `app/Http/Controllers/Api/DocumentCenterController.php` | `powerOfAttorneys`, `documents`, `cases`, `services` |
| `DocumentController` | `app/Http/Controllers/Api/DocumentController.php` | `index`, `store`, `show`, `update`, `destroy` |
| `DocumentTabController` | `app/Http/Controllers/Api/DocumentTabController.php` | `index`, `store`, `show`, `update`, `destroy` |
| `EventController` | `app/Http/Controllers/Api/EventController.php` | `index`, `store`, `update`, `delete` |
| `ExpenseCategoryController` | `app/Http/Controllers/Api/ExpenseCategoryController.php` | — |
| `ExpenseController` | `app/Http/Controllers/Api/ExpenseController.php` | `__construct`, `searchExpenses` |
| `FinanceLedgerController` | `app/Http/Controllers/Api/FinanceLedgerController.php` | `__construct`, `index`, `store`, `caseSummary` |
| `HomeController` | `app/Http/Controllers/Api/HomeController.php` | `countOffice`, `searchClient`, `searchLegCase` |
| `InvoiceController` | `app/Http/Controllers/Api/InvoiceController.php` | `index`, `create`, `store`, `show`, `edit`, `update`, `destroy` |
| `LawyerController` | `app/Http/Controllers/Api/LawyerController.php` | `index`, `store`, `show`, `update`, `destroy` |
| `LegCaseController` | `app/Http/Controllers/Api/LegCaseController.php` | `__construct`, `index`, `getCaseTypesWithCaseSubTypes`, `store`, `show`, `update`, `addClients`, `AddLegCaseCourts`, `RemoveCourtFromLegCase`, `getLegCaseSearch`, `delete`, `destroy` |
| `LegalAdController` | `app/Http/Controllers/Api/LegalAdController.php` | `__construct`, `index`, `store`, `update`, `destroy`, `getByLegCaseId` |
| `LegalAdTypeController` | `app/Http/Controllers/Api/LegalAdTypeController.php` | `index`, `store`, `show`, `update`, `destroy` |
| `LegalDocArchiveController` | `app/Http/Controllers/Api/LegalDocArchiveController.php` | `uploadLegalDoc` |
| `LegalDocToolsController` | `app/Http/Controllers/Api/LegalDocToolsController.php` | `getDocTypesWithDocSubTypes`, `addDocType`, `editDocType`, `addDocSubType`, `editDocSubType`, `deleteDocTypeAndDocSubType` |
| `LegalSessionController` | `app/Http/Controllers/Api/LegalSessionController.php` | `__construct`, `index`, `show`, `store`, `update`, `getSessionsByLegCaseId`, `getByCourtId`, `getByLawyerId`, `destroy` |
| `LegalSessionTypeController` | `app/Http/Controllers/Api/LegalSessionTypeController.php` | `index`, `show`, `store`, `update`, `getByLegCaseId`, `destroy` |
| `LegalWriterController` | `app/Http/Controllers/Api/LegalWriterController.php` | `index`, `store` |
| `LookupController` | `app/Http/Controllers/Api/LookupController.php` | `__construct`, `index`, `store`, `update`, `destroy` |
| `NotificationController` | `app/Http/Controllers/Api/NotificationController.php` | `index`, `markRead`, `markReadAll`, `unreadCount` |
| `OfficeSettingsController` | `app/Http/Controllers/Api/OfficeSettingsController.php` | `__construct`, `index`, `store`, `update`, `destroy` |
| `PaymentController` | `app/Http/Controllers/Api/PaymentController.php` | `index`, `create`, `store`, `show`, `edit`, `update`, `destroy` |
| `PowerOfAttorneyController` | `app/Http/Controllers/Api/PowerOfAttorneyController.php` | `index`, `store`, `show`, `update`, `destroy` |
| `ProcedureController` | `app/Http/Controllers/Api/ProcedureController.php` | `__construct`, `index`, `store`, `getByProcedureTypeId`, `getByLegCaseId`, `update`, `destroy` |
| `ProcedurePlaceTypeController` | `app/Http/Controllers/Api/ProcedurePlaceTypeController.php` | `index`, `show`, `store`, `update`, `destroy` |
| `ProcedureSearchController` | `app/Http/Controllers/Api/ProcedureSearchController.php` | `searchFilters` |
| `ProcedureTypeController` | `app/Http/Controllers/Api/ProcedureTypeController.php` | `index`, `show`, `store`, `update`, `destroy` |
| `ProfileController` | `app/Http/Controllers/Api/ProfileController.php` | `edit`, `update`, `destroy` |
| `RbacController` | `app/Http/Controllers/Api/RbacController.php` | `__construct`, `me`, `users`, `storeUser`, `updateUser`, `deleteUser`, `roles`, `storeRole`, `updateRole`, `deleteRole`, `permissions` |
| `RevenueController` | `app/Http/Controllers/Api/RevenueController.php` | — |
| `ServiceController` | `app/Http/Controllers/Api/ServiceController.php` | `index`, `show`, `store`, `update`, `getServiceTypes`, `getServiceSearch`, `destroy` |
| `ServiceProcedureController` | `app/Http/Controllers/Api/ServiceProcedureController.php` | `index`, `store`, `update`, `destroy` |
| `UnclientController` | `app/Http/Controllers/Api/UnclientController.php` | `index`, `store`, `show`, `update`, `getUnclientSearch`, `destroy` |
| `UserController` | `app/Http/Controllers/Api/UserController.php` | `updateProfile`, `getUserDetails` |
| `WebScraperController` | `app/Http/Controllers/Api/WebScraperController.php` | `loginAndRetrieveSessionToken` |

## 2) المودلات (Models) والعلاقات/الدوال

| المودل | الجدول (إن تم تحديده صراحة) | المسار | الدوال العامة |
|---|---|---|---|
| `AlertNote` | `(افتراضي Eloquent)` | `app/Models/AlertNote.php` | `user`, `financialReceivable`, `legCase` |
| `AppealPdf` | `appeal_pdfs` | `app/Models/AppealPdf.php` | — |
| `AppealSubType` | `(افتراضي Eloquent)` | `app/Models/AppealSubType.php` | `appealType` |
| `AppealType` | `(افتراضي Eloquent)` | `app/Models/AppealType.php` | `subTypes` |
| `AttorneyType` | `(افتراضي Eloquent)` | `app/Models/AttorneyType.php` | `powerOfAttorneys` |
| `CaseSubType` | `(افتراضي Eloquent)` | `app/Models/CaseSubType.php` | `caseType`, `legCases` |
| `CaseType` | `(افتراضي Eloquent)` | `app/Models/CaseType.php` | `subTypes`, `legCases` |
| `CassationJudge` | `(افتراضي Eloquent)` | `app/Models/CassationJudge.php` | — |
| `CassationRule` | `(افتراضي Eloquent)` | `app/Models/CassationRule.php` | `appealType`, `appealSubType`, `ruleSubject`, `judges`, `pdfs` |
| `CassationRuleSubject` | `(افتراضي Eloquent)` | `app/Models/CassationRuleSubject.php` | — |
| `Client` | `(افتراضي Eloquent)` | `app/Models/Client.php` | `legCases`, `services`, `invoices`, `expenses`, `powerOfAttorneys` |
| `Court` | `(افتراضي Eloquent)` | `app/Models/Court.php` | `courtType`, `courtLevel`, `divisions`, `legCases` |
| `CourtLevel` | `(افتراضي Eloquent)` | `app/Models/CourtLevel.php` | `courts`, `delete` |
| `CourtType` | `(افتراضي Eloquent)` | `app/Models/CourtType.php` | `courts` |
| `DailySheet` | `(افتراضي Eloquent)` | `app/Models/DailySheet.php` | `lawyer`, `leg_cases`, `legalSessions`, `procedures` |
| `Division` | `(افتراضي Eloquent)` | `app/Models/Division.php` | `court` |
| `DocSubType` | `(افتراضي Eloquent)` | `app/Models/DocSubType.php` | `docType`, `legalDocs` |
| `DocType` | `(افتراضي Eloquent)` | `app/Models/DocType.php` | `docSubTypes`, `legalDocs` |
| `Document` | `(افتراضي Eloquent)` | `app/Models/Document.php` | `tab`, `client`, `legCase`, `powerOfAttorney`, `service`, `links` |
| `DocumentTab` | `(افتراضي Eloquent)` | `app/Models/DocumentTab.php` | `documents` |
| `Documentable` | `documentable` | `app/Models/Documentable.php` | `document`, `documentable` |
| `Event` | `(افتراضي Eloquent)` | `app/Models/Event.php` | `user`, `notifications`, `procedures`, `serviceProcedures` |
| `Expense` | `(افتراضي Eloquent)` | `app/Models/Expense.php` | `setAmountAttribute`, `service`, `legCase`, `createdBy`, `legalSession`, `legalAd`, `expenseCategory`, `client`, `unclient` |
| `ExpenseCategory` | `(افتراضي Eloquent)` | `app/Models/ExpenseCategory.php` | `expenses` |
| `FinancialReceivable` | `(افتراضي Eloquent)` | `app/Models/FinancialReceivable.php` | — |
| `FinancialTransaction` | `(افتراضي Eloquent)` | `app/Models/FinancialTransaction.php` | `legCase`, `service`, `source` |
| `Invoice` | `(افتراضي Eloquent)` | `app/Models/Invoice.php` | `legCase`, `service`, `payments`, `updateStatus` |
| `Lawyer` | `(افتراضي Eloquent)` | `app/Models/Lawyer.php` | `user`, `legCases`, `procedures`, `legalSessions`, `powerOfAttorneys`, `serviceProcedures` |
| `LegCase` | `(افتراضي Eloquent)` | `app/Models/LegCase.php` | `caseType`, `caseSubType`, `courts`, `clients`, `lawyers`, `procedures`, `legalSessions`, `legalAds`, `powerOfAttorneys`, `legalDocs`, `services`, `createdBy`, `updatedBy`, `softDelete`, `restore`, `newQuery` |
| `LegCaseClient` | `leg_case_client` | `app/Models/LegCaseClient.php` | `legCase` |
| `LegCaseCourt` | `leg_case_court` | `app/Models/LegCaseCourt.php` | `legCase`, `court` |
| `LegalAd` | `(افتراضي Eloquent)` | `app/Models/LegalAd.php` | `legalAdType`, `legCase`, `court`, `lawyerSend`, `lawyerReceive`, `createdBy`, `updatedBy` |
| `LegalAdType` | `(افتراضي Eloquent)` | `app/Models/LegalAdType.php` | `legalAds` |
| `LegalDoc` | `(افتراضي Eloquent)` | `app/Models/LegalDoc.php` | `docType`, `docSubType`, `powerOfAttorney`, `legCase` |
| `LegalSession` | `(افتراضي Eloquent)` | `app/Models/LegalSession.php` | `legalSessionType`, `legCase`, `court`, `lawyer`, `createdBy`, `expenses` |
| `LegalSessionType` | `(افتراضي Eloquent)` | `app/Models/LegalSessionType.php` | `legalSessions` |
| `Notification` | `(افتراضي Eloquent)` | `app/Models/Notification.php` | `user`, `event` |
| `Office` | `(افتراضي Eloquent)` | `app/Models/Office.php` | `users` |
| `Payment` | `(افتراضي Eloquent)` | `app/Models/Payment.php` | `invoice` |
| `PowerOfAttorney` | `(افتراضي Eloquent)` | `app/Models/PowerOfAttorney.php` | `client`, `attorneyType`, `lawyer`, `legCases`, `legalDocs`, `createdBy`, `updatedBy` |
| `PowerType` | `(افتراضي Eloquent)` | `app/Models/PowerType.php` | — |
| `Procedure` | `(افتراضي Eloquent)` | `app/Models/Procedure.php` | `procedureType`, `procedurePlaceType`, `legCase`, `lawyer`, `court`, `event`, `createdBy`, `updatedBy` |
| `ProcedurePlaceType` | `(افتراضي Eloquent)` | `app/Models/ProcedurePlaceType.php` | `procedures`, `serviceProcedures` |
| `ProcedureType` | `(افتراضي Eloquent)` | `app/Models/ProcedureType.php` | `procedures` |
| `Revenue` | `(افتراضي Eloquent)` | `app/Models/Revenue.php` | `legCase`, `revenueCategory`, `createdBy`, `updatedBy` |
| `RevenueCategory` | `(افتراضي Eloquent)` | `app/Models/RevenueCategory.php` | `revenues` |
| `SearchCaseType` | `(افتراضي Eloquent)` | `app/Models/SearchCaseType.php` | — |
| `SearchCourt` | `(افتراضي Eloquent)` | `app/Models/SearchCourt.php` | `searchCaseTypes` |
| `SearchDegree` | `search_degrees` | `app/Models/SearchDegree.php` | — |
| `Service` | `(افتراضي Eloquent)` | `app/Models/Service.php` | `serviceType`, `createdBy`, `updatedBy`, `clients`, `unclients`, `serviceProcedures`, `expenses`, `invoices` |
| `ServiceClient` | `service_client` | `app/Models/ServiceClient.php` | — |
| `ServiceProcedure` | `(افتراضي Eloquent)` | `app/Models/ServiceProcedure.php` | `service`, `lawyer`, `procedurePlaceType`, `event`, `createdBy`, `updatedBy` |
| `ServiceType` | `(افتراضي Eloquent)` | `app/Models/ServiceType.php` | `services` |
| `Unclient` | `(افتراضي Eloquent)` | `app/Models/Unclient.php` | `services`, `expenses` |
| `User` | `(افتراضي Eloquent)` | `app/Models/User.php` | `events`, `legacyNotifications`, `createdLegCases`, `updatedLegCases`, `createdProcedures`, `updatedProcedures`, `createdLegalSessions`, `createdLegalAds`, `updatedLegalAds`, `createdServices`, `updatedServices`, `createdRevenues`, `updatedRevenues`, `createdExpenses`, `office`, `lawyerProfile` |

## 3) الجداول (من خلال Migrations)

| ملف الهجرة | جداول create | جداول alter |
|---|---|---|
| `0001_01_01_000000_create_users_table.php` | `users`, `password_reset_tokens`, `sessions` | — |
| `0001_01_01_000001_create_cache_table.php` | `cache`, `cache_locks` | — |
| `0001_01_01_000002_create_jobs_table.php` | `jobs`, `job_batches`, `failed_jobs` | — |
| `0001_01_01_000003_add_role_and_client_fields_to_users_table.php` | — | `users`, `users` |
| `2014_10_12_100000_create_password_resets_table.php` | `password_resets` | — |
| `2019_12_14_000001_create_personal_access_tokens_table.php` | `personal_access_tokens` | — |
| `2019_12_14_000002_create_events_table.php` | `events` | — |
| `2023_04_12_045550_create_unclients_table.php` | `unclients` | — |
| `2023_04_12_045551_create_clients_table.php` | `clients` | — |
| `2023_04_12_045656_create_lawyers_table.php` | `lawyers` | — |
| `2023_04_12_045700_create_court_types_table.php` | `court_types` | — |
| `2023_04_12_045701_create_court_levels_table.php` | `court_levels` | — |
| `2023_04_12_045809_create_courts_table.php` | `courts` | — |
| `2023_04_12_045810_create_divisions_table.php` | `divisions` | — |
| `2023_04_12_045820_create_case_types_table.php` | `case_types` | — |
| `2023_04_12_045821_create_case_sub_types_table.php` | `case_sub_types` | — |
| `2023_04_12_045844_create_leg_cases_table.php` | `leg_cases` | — |
| `2023_04_12_045900_create_procedure_types_table.php` | `procedure_types` | — |
| `2023_04_12_045901_create_procedure_place_types_table.php` | `procedure_place_types` | — |
| `2023_04_12_045940_create_procedures_table.php` | `procedures` | — |
| `2023_04_12_050000_create_legal_session_types_table.php` | `legal_session_types` | — |
| `2023_04_12_050022_create_legal_sessions_table.php` | `legal_sessions` | — |
| `2023_04_12_050090_create_service_types_table.php` | `service_types` | — |
| `2023_04_12_050108_create_services_table.php` | `services` | — |
| `2023_04_12_050109_create_service_client_table.php` | `service_client` | — |
| `2023_04_12_050110_create_service_unclient_table.php` | `service_unclient` | — |
| `2023_04_12_050500_create_attorney_types_table.php` | `attorney_types` | — |
| `2023_04_12_050522_create_power_of_attorneys_table.php` | `power_of_attorneys` | — |
| `2023_04_12_051141_leg_case_lawyer.php` | `leg_case_lawyer` | — |
| `2023_04_12_051247_leg_case_client.php` | `leg_case_client` | — |
| `2023_04_23_054123_leg_case_court.php` | `leg_case_court` | — |
| `2023_06_13_103600_create_legal_ad_types_table.php` | `legal_ad_types` | — |
| `2023_06_13_103644_create_legal_ads_table.php` | `legal_ads` | — |
| `2023_08_25_013015_create_notifications_table.php` | `notifications` | — |
| `2023_08_30_001553_create_service_procedures_table.php` | `service_procedures` | — |
| `2023_09_08_021128_create_public_documents_table.php` | `public_documents` | — |
| `2023_09_08_021300_create_service_documents_table.php` | `service_documents` | — |
| `2023_09_08_021409_create_case_documents_table.php` | `case_documents` | — |
| `2023_09_08_021431_create_power_types_table.php` | `power_types` | — |
| `2023_09_18_204150_create_revenue_categories_table.php` | `revenue_categories` | — |
| `2023_09_18_204200_create_revenues_table.php` | `revenues` | — |
| `2023_09_18_204220_create_expense_categories_table.php` | `expense_categories` | — |
| `2023_09_18_204244_create_expenses_table.php` | `expenses` | — |
| `2023_09_22_224959_create_invoices_table.php` | `invoices` | — |
| `2023_09_22_224961_create_payments_table.php` | `payments` | — |
| `2023_12_27_151729_create_document_management_tables.php` | `appeal_types`, `appeal_sub_types`, `cassation_rule_subjects`, `cassation_rules`, `cassation_judges`, `appeal_pdfs` | — |
| `2024_01_02_093223_create_search_courts_table.php` | `search_degrees`, `search_courts`, `search_case_types` | — |
| `2024_01_09_034804_create_legal_docs_table.php` | `doc_types`, `doc_sub_types`, `legal_docs` | — |
| `2026_01_29_052302_add_expires_at_to_personal_access_tokens_table.php` | — | `personal_access_tokens`, `personal_access_tokens` |
| `2026_02_14_000001_create_permission_tables.php` | `permissions`, `roles`, `model_has_permissions`, `model_has_roles`, `role_has_permissions` | — |
| `2026_02_14_120000_upgrade_notifications_payload_schema.php` | — | `notifications`, `notifications` |
| `2026_02_16_000090_create_offices_table.php` | `offices` | `offices`, `offices`, `users`, `users`, `users`, `users` |
| `2026_02_16_000100_add_office_settings_columns_to_lookup_tables.php` | — | `users`, `users` |
| `2026_02_20_000200_create_financial_transactions_table.php` | `financial_transactions` | `expenses`, `expenses` |
| `2026_02_28_000300_upgrade_power_of_attorneys_relations.php` | `leg_case_power_of_attorney` | `power_of_attorneys`, `legal_docs`, `legal_docs`, `power_of_attorneys` |
| `2026_02_28_120000_create_document_tabs_table.php` | `document_tabs` | — |
| `2026_02_28_120100_create_documents_table.php` | `documents` | — |
| `2026_02_28_120200_create_documentable_table.php` | `documentable` | — |

## 4) الخدمات والمكونات الداعمة (Functions خارج Controllers/Models)

| الصنف | المسار | الدوال العامة |
|---|---|---|
| `CaseStatusService` | `app/Services/CaseStatusService.php` | — |
| `ClientService` | `app/Services/ClientService.php` | `getLast30ClientsWithBirthDate`, `createClient`, `getClientById`, `updateClient`, `deleteClient` |
| `CourtSearchService` | `app/Services/CourtSearchService.php` | — |
| `DashboardService` | `app/Services/DashboardService.php` | — |
| `EventService` | `app/Services/EventService.php` | `createEvent` |
| `ExpenseService` | `app/Services/ExpenseService.php` | `createExpense` |
| `FinancialTransactionService` | `app/Services/Finance/FinancialTransactionService.php` | `list`, `create`, `summarizeCase`, `syncCaseTotals` |
| `NotificationService` | `app/Services/NotificationService.php` | `createNotification` |
| `NotificationDispatchService` | `app/Services/Notifications/NotificationDispatchService.php` | `send`, `sendToUser` |
| `NotificationEventService` | `app/Services/Notifications/NotificationEventService.php` | `entityChanged`, `assignmentChanged`, `permissionsChanged` |
| `NotificationRecipientResolver` | `app/Services/Notifications/NotificationRecipientResolver.php` | `superAdmins`, `affectedUser`, `lawyerUsers` |
| `OfficeSettingsManager` | `app/Support/OfficeSettings/OfficeSettingsManager.php` | `entityConfig`, `validateEntity`, `list`, `store`, `update`, `destroy`, `ensureOperationAllowed` |
| `NotificationPayloadBuilder` | `app/DTO/NotificationPayloadBuilder.php` | — |
| `LegCasePolicy` | `app/Policies/LegCasePolicy.php` | `view`, `update`, `delete` |
| `LegalSessionPolicy` | `app/Policies/LegalSessionPolicy.php` | `view`, `update`, `delete` |

## 5) ملاحظات التكرار (Duplication Hotspots)

- يوجد تكرار واضح لنمط CRUD في عدد كبير من المتحكمات (index/store/update/destroy)، ما يشير لإمكانية توحيد عبر طبقة خدمة + `FormRequest` + Resource موحدة.
- المتحكمات المطابقة لنمط CRUD رباعي الدوال: `CaseSubTypeController`, `CaseTypeController`, `ClientController`, `CourtController`, `CourtLevelController`, `CourtTypeController`, `DocumentController`, `DocumentTabController`, `InvoiceController`, `LawyerController`, `LegCaseController`, `LegalAdController`, `LegalAdTypeController`, `LegalSessionController`, `LegalSessionTypeController`, `LookupController`, `OfficeSettingsController`, `PaymentController`, `PowerOfAttorneyController`, `ProcedureController`, `ProcedurePlaceTypeController`, `ProcedureTypeController`, `ServiceController`, `ServiceProcedureController`, `UnclientController`.
- ملف `routes/api.php` يحتوي تكرارات تعريف لمسارات موارد بعينها (مثل تعريفات مكررة لبعض `apiResource`) ووجود صيغ URI متعددة لنفس المورد (hyphen و underscore)؛ يُستحسن توحيد naming convention وإزالة الازدواجية.
- يوجد تداخل في منطق المكاتب/الإعدادات بين `LookupController` و `OfficeSettingsController` ويُفضَّل توحيده عبر Policy + Service واحدة قابلة لإعادة الاستخدام.
- تراكم مسؤوليات كبيرة في بعض المتحكمات (مثل `LegCaseController` و`RbacController`) ويُفضَّل تفكيكها إلى Actions/Services صغيرة أحادية المسؤولية.

## 6) فرص التطوير والتحسين (Roadmap مقترح)

1. **توحيد طبقة CRUD**: إنشاء Base CRUD Service + Traits للـ Validation/Filtering/Pagination لتقليل التكرار.
2. **توحيد العقود API**: اعتماد `Resource` classes لكل المخرجات بدل إرجاع مصفوفات/نماذج مباشرة بشكل متباين.
3. **تقوية الـ Validation**: نقل كل التحقق إلى `FormRequest` مستقلة لكل عملية (store/update/search).
4. **تقليل سماكة Controllers**: نقل منطق الأعمال إلى `app/Services` وترك الـ Controllers طبقة orchestration فقط.
5. **تحسين الحوكمة الأمنية**: توسيع استخدام Policies/Permissions على مستوى العمليات الحساسة (مالية/RBAC/الإعدادات).
6. **توحيد التسمية**: اختيار نمط URI واحد (kebab-case مثلاً) والتخلص من المسارات المتوازية لنفس المفهوم.
7. **تحسين التتبع والاختبارات**: إضافة Feature tests لكل endpoint حرج + Contract tests للمخرجات.
8. **توثيق رسمي قابل للتوليد**: توليد OpenAPI/Swagger آلياً من الكود (Attributes أو l5-swagger) لتقليل الانحراف.

## 7) ملاحظات تنفيذية سريعة

- لم يتم تنفيذ `php artisan route:list` بسبب عدم وجود `vendor/autoload.php` محلياً.
- الجرد الحالي يعتمد على التحليل الساكن للملفات (static analysis) وهو كافٍ للتوثيق البنيوي وإبراز نقاط التكرار.