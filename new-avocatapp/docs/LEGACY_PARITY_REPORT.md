# Legacy → Laravel 11 Parity Report (Non-Auth Domain)

## Scope and exclusions
- Source (legacy): `avocatapp`
- Target (Laravel 11): `new-avocatapp`
- Explicitly excluded from migration/parity scope:
  - `User` model
  - auth-only tables and flows (`users`, password reset/token tables, oauth/passport tables, token/auth flow code)

## 1) Model parity table

| Legacy Model | Table | Key fields | Relations | New Model | Status (✅/⚠️/❌) | Notes |
|---|---|---|---|---|---|---|
| AlertNote | `alert_notes` | `user_id, financial_receivable_id, leg_case_id, title…` | `user, financialReceivable, legCase` | AlertNote | ✅ | Model exists in Laravel 11 backend |
| AppealPdf | `appeal_pdfs` | `-` | `-` | AppealPdf | ✅ | Model exists in Laravel 11 backend |
| AppealSubType | `appeal_sub_types` | `appeal_sub_type, appeal_type_id` | `appealType` | AppealSubType | ✅ | Model exists in Laravel 11 backend |
| AppealType | `appeal_types` | `appeal_type` | `subTypes` | AppealType | ✅ | Model exists in Laravel 11 backend |
| AttorneyType | `attorney_types` | `name` | `powerOfAttorneys` | AttorneyType | ✅ | Model exists in Laravel 11 backend |
| CaseSubType | `case_sub_types` | `name, case_type_id` | `caseType, legCases` | CaseSubType | ✅ | Model exists in Laravel 11 backend |
| CaseType | `case_types` | `name` | `legCases, caseSubTypes` | CaseType | ✅ | Model exists in Laravel 11 backend |
| CassationJudge | `cassation_judges` | `judge_name` | `-` | CassationJudge | ✅ | Model exists in Laravel 11 backend |
| CassationRule | `cassation_rules` | `appeal_type_id, appeal_sub_type_id, appeal_number, appeal_year…` | `appealType, appealSubType, ruleSubject, judges…` | CassationRule | ✅ | Model exists in Laravel 11 backend |
| CassationRuleSubject | `cassation_rule_subjects` | `rule_description` | `-` | CassationRuleSubject | ✅ | Model exists in Laravel 11 backend |
| Client | `clients` | `slug, slug, name, name…` | `legCases, services, invoices, expenses` | Client | ✅ | Model exists in Laravel 11 backend |
| Court | `courts` | `name, court_type_id, court_level_id` | `court_type, court_level, divisions, legCases…` | Court | ✅ | Model exists in Laravel 11 backend |
| CourtLevel | `court_levels` | `name` | `courts` | CourtLevel | ✅ | Model exists in Laravel 11 backend |
| CourtType | `court_types` | `name` | `courts` | CourtType | ✅ | Model exists in Laravel 11 backend |
| DailySheet | `daily_sheets` | `date, cost, over_cost` | `lawyer, leg_cases, legalSessions, procedures` | DailySheet | ✅ | Model exists in Laravel 11 backend |
| Division | `divisions` | `name, court_id` | `courts` | Division | ✅ | Model exists in Laravel 11 backend |
| DocSubType | `doc_sub_types` | `name, doc_type_id` | `docType, legalDocs` | DocSubType | ✅ | Model exists in Laravel 11 backend |
| DocType | `doc_types` | `name` | `docSubTypes, legalDocs` | DocType | ✅ | Model exists in Laravel 11 backend |
| Event | `events` | `title, description, date, user_id` | `user` | Event | ✅ | Model exists in Laravel 11 backend |
| Expense | `expenses` | `service_id, leg_case_id, created_by, legal_session_id…` | `service, leg_case, user, legal_session…` | Expense | ✅ | Model exists in Laravel 11 backend |
| ExpenseCategory | `expense_categories` | `name` | `expenses` | ExpenseCategory | ✅ | Model exists in Laravel 11 backend |
| Invoice | `invoices` | `leg_case_id, invoice_number, status, issue_date…` | `legCase, payments` | Invoice | ✅ | Model exists in Laravel 11 backend |
| Lawyer | `lawyers` | `name, birthdate, identity_number, law_reg_num…` | `user, leg_cases, procedure, legalSessions…` | Lawyer | ✅ | Model exists in Laravel 11 backend |
| LegCase | `leg_cases` | `slug, title, description, case_type_id…` | `legalAds, caseType, caseSubType, sessions…` | LegCase | ✅ | Model exists in Laravel 11 backend |
| LegCaseClient | `leg_case_client` | `client_id` | `legCase` | LegCaseClient | ✅ | Model exists in Laravel 11 backend |
| LegCaseCourt | `leg_case_court` | `leg_case_id, case_number, case_year, court_id` | `legCase, court` | LegCaseCourt | ✅ | Model exists in Laravel 11 backend |
| LegalAd | `legal_ads` | `description, results, send_date, receive_date…` | `legalAdType, legCase, court, lawyerSend…` | LegalAd | ✅ | Model exists in Laravel 11 backend |
| LegalAdType | `legal_ad_types` | `name` | `legalAds` | LegalAdType | ✅ | Model exists in Laravel 11 backend |
| LegalDoc | `legal_docs` | `description, path, doc_type_id, thumbnail_path…` | `docType, docSubType` | LegalDoc | ✅ | Model exists in Laravel 11 backend |
| LegalSession | `legal_sessions` | `leg_case_id, status, court_id, session_date…` | `legCase, legalSessionType, court, lawyer…` | LegalSession | ✅ | Model exists in Laravel 11 backend |
| LegalSessionType | `legal_session_types` | `name` | `legalSessions` | LegalSessionType | ✅ | Model exists in Laravel 11 backend |
| Notification | `notifications` | `user_id, event_id, type, message…` | `user` | Notification | ✅ | Model exists in Laravel 11 backend |
| Payment | `payments` | `invoice_id, payment_date, payment_method, amount` | `invoice` | Payment | ✅ | Model exists in Laravel 11 backend |
| PowerOfAttorney | `power_of_attorneys` | `title, description, client_id, lawyer_insert…` | `client, attorneyType, createdBy, updatedBy` | PowerOfAttorney | ✅ | Model exists in Laravel 11 backend |
| Procedure | `procedures` | `procedure_type_id, leg_case_id, procedure_place_name, procedure_place_type_id…` | `procedureType, procedurePlaceType, legCase, lawyer…` | Procedure | ✅ | Model exists in Laravel 11 backend |
| ProcedurePlaceType | `procedure_place_types` | `name` | `procedures` | ProcedurePlaceType | ✅ | Model exists in Laravel 11 backend |
| ProcedureType | `procedure_types` | `name` | `procedures, event` | ProcedureType | ✅ | Model exists in Laravel 11 backend |
| Revenue | `revenues` | `service_id, leg_case_id, amount, description…` | `service, legCase, client, unclients…` | Revenue | ✅ | Model exists in Laravel 11 backend |
| RevenueCategory | `revenue_categories` | `-` | `-` | RevenueCategory | ✅ | Model exists in Laravel 11 backend |
| SearchCaseType | `search_case_types` | `-` | `-` | SearchCaseType | ✅ | Model exists in Laravel 11 backend |
| SearchCourt | `search_courts` | `-` | `searchCaseTypes` | SearchCourt | ✅ | Model exists in Laravel 11 backend |
| Service | `services` | `slug, service_no, service_type_id, description…` | `serviceType, procedures, createdBy, updatedBy…` | Service | ✅ | Model exists in Laravel 11 backend |
| ServiceClient | `service_client` | `client_id, service_id` | `-` | ServiceClient | ✅ | Model exists in Laravel 11 backend |
| ServiceProcedure | `service_procedures` | `title, job, result, event_id…` | `service, lawyer, event, createdBy` | ServiceProcedure | ✅ | Model exists in Laravel 11 backend |
| ServiceType | `service_types` | `name` | `service` | ServiceType | ✅ | Model exists in Laravel 11 backend |
| Unclient | `unclients` | `slug, name, email, phone_number…` | `services` | Unclient | ✅ | Model exists in Laravel 11 backend |


## 2) Migration parity table

| Legacy migration/table | Columns | Indexes/FKs | New equivalent | Status | Notes |
|---|---|---|---|---|---|
| `database/migrations/2023_12_27_151729_create_document_management_tables.php` / `appeal_pdfs` | `6 column defs` | `FKs: 1, indexes/unique: 0` | `database/migrations/2023_12_27_151729_create_document_management_tables.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_12_27_151729_create_document_management_tables.php` / `appeal_sub_types` | `5 column defs` | `FKs: 1, indexes/unique: 0` | `database/migrations/2023_12_27_151729_create_document_management_tables.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_12_27_151729_create_document_management_tables.php` / `appeal_types` | `3 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2023_12_27_151729_create_document_management_tables.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_050522_create_power_of_attorneys_table.php` / `attorney_types` | `3 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2023_04_12_050500_create_attorney_types_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_09_08_021409_create_case_documents_table.php` / `case_documents` | `10 column defs` | `FKs: 3, indexes/unique: 0` | `database/migrations/2023_09_08_021409_create_case_documents_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_045844_create_leg_cases_table.php` / `case_sub_types` | `4 column defs` | `FKs: 1, indexes/unique: 0` | `database/migrations/2023_04_12_045821_create_case_sub_types_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_045844_create_leg_cases_table.php` / `case_types` | `3 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2023_04_12_045820_create_case_types_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_12_27_151729_create_document_management_tables.php` / `cassation_judges` | `5 column defs` | `FKs: 1, indexes/unique: 0` | `database/migrations/2023_12_27_151729_create_document_management_tables.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_12_27_151729_create_document_management_tables.php` / `cassation_rule_subjects` | `3 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2023_12_27_151729_create_document_management_tables.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_12_27_151729_create_document_management_tables.php` / `cassation_rules` | `12 column defs` | `FKs: 3, indexes/unique: 0` | `database/migrations/2023_12_27_151729_create_document_management_tables.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_045551_create_clients_table.php` / `clients` | `15 column defs` | `FKs: 0, indexes/unique: 2` | `database/migrations/2023_04_12_045551_create_clients_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_045809_create_courts_table.php` / `court_levels` | `3 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2023_04_12_045701_create_court_levels_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_045809_create_courts_table.php` / `court_types` | `3 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2023_04_12_045700_create_court_types_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_045809_create_courts_table.php` / `courts` | `7 column defs` | `FKs: 2, indexes/unique: 0` | `database/migrations/2023_04_12_045809_create_courts_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_045809_create_courts_table.php` / `divisions` | `5 column defs` | `FKs: 1, indexes/unique: 0` | `database/migrations/2023_04_12_045810_create_divisions_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2024_01_09_034804_create_legal_docs_table.php` / `doc_sub_types` | `5 column defs` | `FKs: 1, indexes/unique: 0` | `database/migrations/2024_01_09_034804_create_legal_docs_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2024_01_09_034804_create_legal_docs_table.php` / `doc_types` | `3 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2024_01_09_034804_create_legal_docs_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2019_12_14_000002_create_events_table.php` / `events` | `7 column defs` | `FKs: 1, indexes/unique: 0` | `database/migrations/2019_12_14_000002_create_events_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_09_18_204244_create_expenses_table.php` / `expense_categories` | `3 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2023_09_18_204220_create_expense_categories_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_09_18_204244_create_expenses_table.php` / `expenses` | `20 column defs` | `FKs: 7, indexes/unique: 0` | `database/migrations/2023_09_18_204244_create_expenses_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_09_22_224959_create_invoices_table.php` / `invoices` | `11 column defs` | `FKs: 2, indexes/unique: 0` | `database/migrations/2023_09_22_224959_create_invoices_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_045656_create_lawyers_table.php` / `lawyers` | `14 column defs` | `FKs: 1, indexes/unique: 3` | `database/migrations/2023_04_12_045656_create_lawyers_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_051247_leg_case_client.php` / `leg_case_client` | `5 column defs` | `FKs: 2, indexes/unique: 0` | `database/migrations/2023_04_12_051247_leg_case_client.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_23_054123_leg_case_court.php` / `leg_case_court` | `6 column defs` | `FKs: 2, indexes/unique: 0` | `database/migrations/2023_04_23_054123_leg_case_court.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_051141_leg_case_lawyer.php` / `leg_case_lawyer` | `6 column defs` | `FKs: 2, indexes/unique: 0` | `database/migrations/2023_04_12_051141_leg_case_lawyer.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_045844_create_leg_cases_table.php` / `leg_cases` | `23 column defs` | `FKs: 4, indexes/unique: 0` | `database/migrations/2023_04_12_045844_create_leg_cases_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_06_13_103644_create_legal_ads_table.php` / `legal_ad_types` | `3 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2023_06_13_103600_create_legal_ad_types_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_06_13_103644_create_legal_ads_table.php` / `legal_ads` | `22 column defs` | `FKs: 5, indexes/unique: 0` | `database/migrations/2023_06_13_103644_create_legal_ads_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2024_01_09_034804_create_legal_docs_table.php` / `legal_docs` | `11 column defs` | `FKs: 2, indexes/unique: 0` | `database/migrations/2024_01_09_034804_create_legal_docs_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_050022_create_legal_sessions_table.php` / `legal_session_types` | `2 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2023_04_12_050000_create_legal_session_types_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_050022_create_legal_sessions_table.php` / `legal_sessions` | `18 column defs` | `FKs: 5, indexes/unique: 0` | `database/migrations/2023_04_12_050022_create_legal_sessions_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_08_25_013015_create_notifications_table.php` / `notifications` | `9 column defs` | `FKs: 2, indexes/unique: 0` | `database/migrations/2023_08_25_013015_create_notifications_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_09_22_224961_create_payments_table.php` / `payments` | `7 column defs` | `FKs: 1, indexes/unique: 0` | `database/migrations/2023_09_22_224961_create_payments_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_050522_create_power_of_attorneys_table.php` / `power_of_attorneys` | `18 column defs` | `FKs: 4, indexes/unique: 0` | `database/migrations/2023_04_12_050522_create_power_of_attorneys_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_09_08_021431_create_power_types_table.php` / `power_types` | `3 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2023_09_08_021431_create_power_types_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_045940_create_procedures_table.php` / `procedure_place_types` | `3 column defs` | `FKs: 0, indexes/unique: 1` | `database/migrations/2023_04_12_045901_create_procedure_place_types_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_045940_create_procedures_table.php` / `procedure_types` | `3 column defs` | `FKs: 0, indexes/unique: 1` | `database/migrations/2023_04_12_045900_create_procedure_types_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_045940_create_procedures_table.php` / `procedures` | `20 column defs` | `FKs: 6, indexes/unique: 0` | `database/migrations/2023_04_12_045940_create_procedures_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_09_08_021128_create_public_documents_table.php` / `public_documents` | `9 column defs` | `FKs: 2, indexes/unique: 0` | `database/migrations/2023_09_08_021128_create_public_documents_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_09_18_204200_create_revenues_table.php` / `revenue_categories` | `3 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2023_09_18_204150_create_revenue_categories_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_09_18_204200_create_revenues_table.php` / `revenues` | `11 column defs` | `FKs: 3, indexes/unique: 0` | `database/migrations/2023_09_18_204200_create_revenues_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2024_01_02_093223_create_search_courts_table.php` / `search_case_types` | `6 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2024_01_02_093223_create_search_courts_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2024_01_02_093223_create_search_courts_table.php` / `search_courts` | `5 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2024_01_02_093223_create_search_courts_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2024_01_02_093223_create_search_courts_table.php` / `search_degrees` | `4 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2024_01_02_093223_create_search_courts_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_050109_create_service_client_table.php` / `service_client` | `4 column defs` | `FKs: 2, indexes/unique: 0` | `database/migrations/2023_04_12_050109_create_service_client_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_09_08_021300_create_service_documents_table.php` / `service_documents` | `7 column defs` | `FKs: 2, indexes/unique: 0` | `database/migrations/2023_09_08_021300_create_service_documents_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_08_30_001553_create_service_procedures_table.php` / `service_procedures` | `23 column defs` | `FKs: 4, indexes/unique: 0` | `database/migrations/2023_08_30_001553_create_service_procedures_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_050108_create_services_table.php` / `service_types` | `3 column defs` | `FKs: 0, indexes/unique: 0` | `database/migrations/2023_04_12_050090_create_service_types_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_050110_create_service_unclient_table.php` / `service_unclient` | `4 column defs` | `FKs: 2, indexes/unique: 0` | `database/migrations/2023_04_12_050110_create_service_unclient_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_050108_create_services_table.php` / `services` | `12 column defs` | `FKs: 3, indexes/unique: 1` | `database/migrations/2023_04_12_050108_create_services_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |
| `database/migrations/2023_04_12_045550_create_unclients_table.php` / `unclients` | `13 column defs` | `FKs: 0, indexes/unique: 3` | `database/migrations/2023_04_12_045550_create_unclients_table.php `| ✅ | Present (some tables split into dedicated Laravel 11 migrations). |


## 3) Schema differences and findings

### Missing tables/columns
- No missing non-auth legacy tables were found in `new-avocatapp` migrations.
- Legacy auth-only tables are intentionally excluded from parity.

### Mismatched type/default/nullability risk review
- `new-avocatapp` uses Laravel 11 migration style and splits several legacy multi-table migration files into single-purpose migrations (e.g., case types/sub types, court levels/types/divisions, procedure types/place types, legal session types, revenue/expense categories).
- Foreign key declarations are modernized in many places (`foreignId()->constrained()->cascadeOnDelete()` style), while keeping legacy relationship intent.

### Index/FK and cascade differences
- Non-auth table coverage is complete.
- FK declarations are present across migrated tables; in Laravel 11 project they are generally expressed with `constrained()/cascadeOnDelete()/nullOnDelete()` instead of older chained `foreign(...)->references(...)->on(...)->onDelete(...)` syntax.

### Behavior parity gaps identified during audit and now fixed
- Restored legacy invoice/payment status automation behavior:
  - `Invoice::updateStatus()`
  - `Payment::booted()` hook calling invoice status refresh on save.
- Restored legacy `LegCase` logical deletion behavior:
  - `softDelete()`
  - `restore()`
  - overridden `newQuery($excludeDeleted = true)` filter behavior.
- Restored `CourtLevel::delete()` cascading model-level delete behavior from legacy.

## 4) Data safety + migration strategy

### Safe strategy for environments with existing data
1. **Use additive migrations only for production rollout**
   - add tables/columns/indexes/FKs without dropping legacy structures in-place.
2. **Backfill data in batches**
   - backfill nullable newly introduced fields first.
3. **Enable constraints after data cleanup**
   - where applicable, make columns stricter only after data quality checks.
4. **Keep destructive cleanups separate**
   - any table/column removals should be shipped as a dedicated cleanup migration after cutover validation.

### Optional cleanup migration plan (post-cutover)
- Remove duplicate/archived migration artifacts only after all environments are aligned and backups verified.
- Drop deprecated auth/passport leftovers only if no longer required by deployment/runtime.

### Dev/Stage/Prod checklist
- [ ] Snapshot/backup DB before migration.
- [ ] Run `php artisan migrate --pretend` in stage and review SQL.
- [ ] Run full migration on fresh DB clone.
- [ ] Validate FK integrity and key indexes.
- [ ] Run parity tests (`LegacyParitySchemaTest`).
- [ ] Smoke-test critical domain flows (cases, services, invoices, payments, documents).
- [ ] Production migration window + rollback plan documented.

## 5) Verification commands / checks

### Artisan / test commands
- `php artisan migrate --pretend`
- `php artisan test --filter=LegacyParitySchemaTest`

### SQL spot-check examples
- `SHOW TABLES LIKE 'leg_cases';`
- `SHOW COLUMNS FROM invoices;`
- `SHOW INDEX FROM service_procedures;`
- `SELECT CONSTRAINT_NAME, TABLE_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = DATABASE() AND REFERENCED_TABLE_NAME IS NOT NULL;`

## 6) Prioritized gap list
1. ✅ Non-auth model file parity reached.
2. ✅ Non-auth migration/table coverage reached.
3. ✅ Restored legacy runtime behaviors (invoice/payment status automation; leg-case logical hide/restore; court-level cascading delete).
4. ⚠️ Runtime execution parity should be validated in CI once PHP dependencies are installed (`vendor/` missing in this workspace).

## 7) Changelog (this task)
- Updated models for behavior parity:
  - `app/Models/Invoice.php`
  - `app/Models/Payment.php`
  - `app/Models/LegCase.php`
  - `app/Models/CourtLevel.php`
- Added parity test:
  - `tests/Feature/LegacyParitySchemaTest.php`
- Added parity report:
  - `docs/LEGACY_PARITY_REPORT.md`
