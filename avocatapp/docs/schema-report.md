# Database Schema and Model Relations Report

This report summarizes the Laravel database tables (from `database/migrations`) and the Eloquent model relations (from `app/Models`) for the `avocatapp` codebase.

## Tables (from migrations)

### users
- Columns: id, name, email (unique), email_verified_at (nullable), password, role (enum: `1`, `2`, `3`), remember_token, client_id (nullable), client_secret (nullable), created_at, updated_at.

### password_resets
- Columns: email, token, created_at.

### failed_jobs
- Columns: id, uuid, connection, queue, payload, exception, failed_at.

### personal_access_tokens
- Columns: id, tokenable_id/tokenable_type (morphs), name, token (64), abilities, last_used_at (nullable), created_at, updated_at.

### events
- Columns: id, user_id (FK users.id), date, title, description, created_at, updated_at.

### unclients
- Columns: id, slug, name, email, phone_number, address, work, emergency_number, date_of_birth, gender (enum: ذكر/أنثى), religion (enum: مسلم/مسيحي), identity_number (14), created_at, updated_at.

### clients
- Columns: id, slug, name, email, phone_number, address, nationality, work, emergency_number, date_of_birth, gender (enum: ذكر/أنثى), religion (enum: مسلم/مسيحي), identity_number (14), status (enum: active/inactive), created_at, updated_at.

### lawyers
- Columns: id, name, birthdate, identity_number, law_reg_num, lawyer_class (enum: نقض/إستئناف/إبتدائي/جدول عام), email, phone_number, gender (enum: ذكر/أنثى), address, religion (enum: مسلم/مسيحى), user_id (FK users.id), created_at, updated_at.

### court_types
- Columns: id, name, created_at, updated_at.

### court_levels
- Columns: id, name, created_at, updated_at.

### courts
- Columns: id, name, court_type_id (FK court_types.id), court_level_id (FK court_levels.id), created_at, updated_at.

### divisions
- Columns: id, name, court_id (FK courts.id), created_at, updated_at.

### case_types
- Columns: id, name, created_at, updated_at.

### case_sub_types
- Columns: id, name, case_type_id (FK case_types.id), created_at, updated_at.

### leg_cases
- Columns: id, is_deleted, slug, title, description, fees, total_expenses (decimal 10,2), total_payments (decimal 10,2), expenses, case_type_id (FK case_types.id), case_sub_type_id (FK case_sub_types.id), created_by (FK users.id), updated_by (FK users.id), litigants_name, litigants_address, litigants_phone, litigants_lawyer_name, litigants_lawyer_phone, client_capacity (enum: مدعى عليه/مجنى عليه/مدعى/متهم), status (enum: قيد التجهيز/متداولة/منتهية/معلقة), created_at, updated_at.

### procedure_types
- Columns: id, name, created_at, updated_at.

### procedure_place_types
- Columns: id, name, created_at, updated_at.

### procedures
- Columns: id, procedure_type_id (FK procedure_types.id), leg_case_id (FK leg_cases.id), procedure_place_name, procedure_place_type_id (FK procedure_place_types.id), lawyer_id (FK lawyers.id), job, result, note, status (enum: تمت/لم ينفذ/جاري التنفيذ), event_id (FK events.id), date_start, date_end, cost1 (decimal 10,2), cost2 (decimal 10,2), cost3 (decimal 10,2), created_by (FK users.id), updated_by (FK users.id), created_at, updated_at.

### legal_session_types
- Columns: id, name.

### legal_sessions
- Columns: id, court_session, legal_session_type_id (FK legal_session_types.id), leg_case_id (FK leg_cases.id), court_id (FK courts.id), session_date, cost1 (decimal 10,2), cost2 (decimal 10,2), cost3 (decimal 10,2), session_roll, Judgment_operative, status (enum: تمت/لم ينفذ/جارى التنفيذ), lawyer_id (FK lawyers.id), orders, result, notes, created_by (FK users.id), created_at, updated_at.

### service_types
- Columns: id, name, created_at, updated_at.

### services
- Columns: id, slug, description, service_place_name, service_year, created_by (FK users.id), updated_by (FK users.id), status (enum: قيد التنفيذ/جارى التنفيذ/منتهية/متداولة/استيفاء), service_type_id (FK service_types.id), created_at, updated_at.

### service_client (pivot)
- Columns: id, service_id (FK services.id), client_id (FK clients.id), created_at, updated_at.

### service_unclient (pivot)
- Columns: id, service_id (FK services.id), unclient_id (FK unclients.id), created_at, updated_at.

### attorney_types
- Columns: id, name, created_at, updated_at.

### power_of_attorneys
- Columns: id, attorney_num, attorney_date, attorney_chart, attorney_place, title, description, client_id (FK clients.id), lawyer_insert, image, created_by (FK users.id), updated_by (FK users.id), attorney_type_id (FK attorney_types.id), created_at, updated_at.

### leg_case_lawyer (pivot)
- Columns: id, leg_case_id (FK leg_cases.id), lawyer_id (FK lawyers.id), created_at, updated_at.

### leg_case_client (pivot)
- Columns: id, leg_case_id (FK leg_cases.id), client_id (FK clients.id).

### leg_case_court (pivot)
- Columns: leg_case_id (FK leg_cases.id), court_id (FK courts.id), case_number, case_year.

### legal_ad_types
- Columns: id, name, created_at, updated_at.

### legal_ads
- Columns: id, description, results, send_date, receive_date, lawyer_send_id, legal_ad_type_id (FK legal_ad_types.id), lawyer_receive_id, status (enum: قيد التجهيز/تم التسليم/تم الإستلام), leg_case_id (FK leg_cases.id), court_id (FK courts.id), cost1 (decimal 10,2), cost2 (decimal 10,2), cost3 (decimal 10,2), created_by (FK users.id), updated_by (FK users.id), created_at, updated_at.

### notifications
- Columns: id, user_id (FK users.id), event_id (FK events.id), type, message, read, created_at, updated_at.

### service_procedures
- Columns: id, service_id (FK services.id), title, lawyer_id (FK lawyers.id), job, procedure_place_name, procedure_place_type_id, result, note, status (enum: تمت/لم ينفذ/جارى التنفيذ), event_id (FK events.id), date_start, date_end, cost1 (decimal 10,2), cost2 (decimal 10,2), cost3 (decimal 10,2), created_by (FK users.id), updated_by (FK users.id), created_at, updated_at.

### public_documents
- Columns: id, title, description, service_id (FK services.id), file_path, leg_case_id (FK leg_cases.id), created_at, updated_at.

### service_documents
- Columns: id, service_id (FK services.id), client_id (FK clients.id), file_path, created_at, updated_at.

### case_documents
- Columns: id, leg_case_id (FK leg_cases.id), client_id (FK clients.id), unclient_id (FK unclients.id), description, file_path, created_at, updated_at.

### power_types
- Columns: id, name, created_at, updated_at.

### revenue_categories
- Columns: id, name, created_at, updated_at.

### revenues
- Columns: id, client_id (FK clients.id), service_id (FK services.id), leg_case_id (FK leg_cases.id), amount, from_client, from_unclients, created_at, updated_at.

### expense_categories
- Columns: id, name, created_at, updated_at.

### expenses
- Columns: id, service_id (FK services.id), leg_case_id (FK leg_cases.id), created_by (FK users.id), legal_session_id (FK legal_sessions.id), expense_category_id (FK expense_categories.id), client_id (FK clients.id), unclients_id (FK unclients.id), description, note, expense_date, amount (json), created_at, updated_at.

### invoices
- Columns: id, leg_case_id (FK leg_cases.id), service_id (FK services.id), invoice_number, status (enum: Draft/Sent/Paid/Overdue), issue_date, due_date, total_amount (decimal 10,2), created_at, updated_at.

### payments
- Columns: id, invoice_id (FK invoices.id), payment_date, payment_method (enum: Cash/Card/Bank Transfer), amount (decimal 10,2), created_at, updated_at.

### appeal_types
- Columns: id, appeal_type, created_at, updated_at.

### appeal_sub_types
- Columns: id, appeal_type_id (FK appeal_types.id), appeal_sub_type, created_at, updated_at.

### cassation_rule_subjects
- Columns: id, rule_description, created_at, updated_at.

### cassation_rules
- Columns: id, appeal_type_id (FK appeal_types.id), appeal_sub_type_id (FK appeal_sub_types.id), appeal_number, appeal_year, session_date, cassation_rule_subjects_id (FK cassation_rule_subjects.id), legal_summary, created_at, updated_at.

### cassation_judges
- Columns: id, cassation_rules_id (FK cassation_rules.id), judge_name, created_at, updated_at.

### appeal_pdfs
- Columns: id, cassation_rule_id (FK cassation_rules.id), file_name, file_path, created_at, updated_at.

### search_degrees
- Columns: id, degree_name, degree_value, created_at, updated_at.

### search_courts
- Columns: id, degree_value, court_name, court_value, created_at, updated_at.

### search_case_types
- Columns: id, degree_value, court_value, case_type_name, case_type_value, created_at, updated_at.

### doc_types
- Columns: id, name, created_at, updated_at.

### doc_sub_types
- Columns: id, name, doc_type_id (FK doc_types.id), created_at, updated_at.

### legal_docs
- Columns: id, path, thumbnail_path, word_path, pdf_path, description, doc_type_id (FK doc_types.id), doc_sub_type_id (FK doc_sub_types.id), created_at, updated_at.

## Models and relationships (from app/Models)

### AlertNote
- belongsTo: User
- belongsTo: FinancialReceivable
- belongsTo: LegCase

### AppealPdf
- No explicit relationships defined.

### AppealSubType
- belongsTo: AppealType

### AppealType
- hasMany: AppealSubType

### AttorneyType
- hasMany: PowerOfAttorney

### CaseSubType
- belongsTo: CaseType
- hasMany: LegCase

### CaseType
- hasMany: LegCase
- hasMany: CaseSubType (case_type_id)

### CassationJudge
- No explicit relationships defined.

### CassationRule
- belongsTo: AppealType (appeal_type_id)
- belongsTo: AppealSubType (appeal_sub_type_id)
- belongsTo: CassationRuleSubject (cassation_rule_subjects_id)
- hasMany: CassationJudge (cassation_rules_id)
- hasMany: AppealPdf (cassation_rule_id)

### CassationRuleSubject
- No explicit relationships defined.

### Client
- belongsToMany: LegCase (pivot: leg_case_client, using LegCaseClient, pivot client_id)
- belongsToMany: Service (pivot: service_client, with timestamps)
- hasMany: Invoice
- hasMany: Expense

### Court
- belongsTo: CourtType (court_type_id)
- belongsTo: CourtLevel (court_level_id)
- hasMany: Division
- belongsToMany: LegCase (pivot: leg_case_court, with pivot court_id/case_number/case_year)
- belongsToMany: LegalSession
- hasMany: LegalAd (court_id)

### CourtLevel
- hasMany: Court

### CourtType
- hasMany: Court

### DailySheet
- belongsTo: Lawyer
- belongsToMany: LegCase
- belongsToMany: LegalSession (pivot: daily_sheet_legalSessions)
- belongsToMany: Procedure (pivot: daily_sheet_procedure)

### Division
- belongsTo: Court

### DocSubType
- belongsTo: DocType (doc_type_id)
- hasMany: LegalDoc

### DocType
- hasMany: DocSubType
- hasMany: LegalDoc

### Event
- belongsTo: User

### Expense
- belongsTo: Service
- belongsTo: LegCase
- belongsTo: User (created_by)
- belongsTo: LegalSession
- belongsTo: ExpenseCategory
- belongsTo: Unclient
- belongsTo: Client

### ExpenseCategory
- hasMany: Expense

### Invoice
- belongsTo: LegCase
- hasMany: Payment

### Lawyer
- belongsTo: User
- belongsToMany: LegCase (pivot: leg_case_lawyer)
- belongsTo: Procedure
- belongsToMany: LegalSession
- hasMany: LegalAd (lawyer_send_id)
- hasMany: LegalAd (lawyer_receive_id)

### LegCase
- hasMany: LegalAd
- belongsTo: CaseType
- belongsTo: CaseSubType
- hasMany: LegalSession
- belongsToMany: Court (pivot: leg_case_court with case_number/case_year/court_id)
- belongsToMany: Client (pivot: leg_case_client)
- belongsToMany: Lawyer (pivot: leg_case_lawyer)
- hasMany: Procedure
- belongsTo: User (created_by)
- belongsTo: User (updated_by)

### LegCaseClient
- belongsTo: LegCase

### LegCaseCourt
- belongsTo: LegCase
- belongsTo: Court

### LegalAd
- belongsTo: LegalAdType (legal_ad_type_id)
- belongsTo: LegCase
- belongsTo: Court (court_id)
- belongsTo: Lawyer (lawyer_send_id)
- belongsTo: Lawyer (lawyer_receive_id)

### LegalAdType
- hasMany: LegalAd

### LegalDoc
- belongsTo: DocType
- belongsTo: DocSubType

### LegalSession
- belongsTo: LegCase
- belongsTo: LegalSessionType
- belongsTo: Court
- belongsTo: Lawyer
- belongsTo: User (created_by)

### LegalSessionType
- hasMany: LegalSession

### Notification
- belongsTo: User

### Payment
- belongsTo: Invoice

### PowerOfAttorney
- belongsTo: Client
- belongsTo: AttorneyType (attorney_type_id)
- belongsTo: User (created_by)
- belongsTo: User (updated_by)

### Procedure
- belongsTo: ProcedureType (procedure_type_id)
- belongsTo: ProcedurePlaceType (procedure_place_type_id)
- belongsTo: LegCase
- belongsTo: Lawyer (lawyer_id)
- belongsTo: User (created_by)

### ProcedurePlaceType
- hasMany: Procedure

### ProcedureType
- hasMany: Procedure
- belongsTo: Event

### Revenue
- belongsTo: Service
- belongsTo: LegCase
- belongsTo: Client
- belongsTo: Unclient
- belongsTo: RevenueCategory

### RevenueCategory
- No explicit relationships defined.

### SearchCaseType
- No explicit relationships defined.

### SearchCourt
- hasMany: SearchCaseType

### Service
- belongsTo: ServiceType (service_type_id)
- hasMany: ServiceProcedure
- belongsTo: User (created_by)
- belongsTo: User (updated_by)
- belongsToMany: Lawyer
- belongsToMany: Client (pivot: service_client)
- belongsToMany: Unclient (pivot: service_unclient)

### ServiceClient
- No explicit relationships defined.

### ServiceProcedure
- belongsTo: Service
- belongsTo: Lawyer (lawyer_id)
- belongsTo: Event
- belongsTo: User (created_by)

### ServiceType
- morphMany: Service

### Unclient
- belongsToMany: Service (pivot: service_unclient)

### User
- hasMany: Notification

> Notes:
> - Some models (e.g., DailySheet, AlertNote, FinancialReceivable) reference tables not created in the migrations listed above, so their backing tables may be created elsewhere or not included in this repo.
> - The `LegCaseClient`/`LegCaseCourt` pivot models are used for custom pivot relationships.
