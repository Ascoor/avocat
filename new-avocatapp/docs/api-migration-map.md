# API Migration Map (Legacy `avocatapp` → `new-avocatapp`)

This document maps legacy API routes to the new Laravel 11 API structure.

## Versioning

* All routes are now prefixed with `/api/v1`.

## Auth

| Legacy Route | New Route | Controller | Notes |
| --- | --- | --- | --- |
| `POST /register` | `POST /api/v1/register` | `AuthController@register` | TODO: implement registration logic. |
| `POST /login` | `POST /api/v1/login` | `AuthController@login` | TODO: implement login logic. |
| `POST /forgot-password` | `POST /api/v1/forgot-password` | `AuthController@forgotPassword` | TODO: implement. |
| `POST /reset-password` | `POST /api/v1/reset-password` | `AuthController@resetPassword` | TODO: implement. |
| `POST /logout` | `POST /api/v1/logout` | `AuthController@logout` | Requires auth middleware. |
| `GET /email/verify/{id}/{hash}` | `GET /api/v1/email/verify/{id}/{hash}` | `AuthController@verifyEmail` | Requires auth middleware. |
| `POST /email/verify/resend` | `POST /api/v1/email/verify/resend` | `AuthController@resendVerificationEmail` | Requires auth middleware. |
| `GET /token` | `GET /api/v1/token` | `AuthController@token` | Requires auth middleware. |

## Users

| Legacy Route | New Route | Controller | Notes |
| --- | --- | --- | --- |
| `PUT /user/{user}` | `PUT /api/v1/user/{user}` | `UserController@updateProfile` | Requires auth middleware. |
| `GET /user/{user}` | `GET /api/v1/user/{user}` | `UserController@getUserDetails` | Requires auth middleware. |

## Resources (apiResource)

All legacy resource routes map directly to `Route::apiResource` under `/api/v1`.

| Resource | Legacy | New | Controller |
| --- | --- | --- | --- |
| Clients | `/clients` | `/api/v1/clients` | `ClientController` |
| Unclients | `/unclients` | `/api/v1/unclients` | `UnclientController` |
| Lawyers | `/lawyers` | `/api/v1/lawyers` | `LawyerController` |
| Courts | `/courts` | `/api/v1/courts` | `CourtController` |
| Court Types | `/court_types` | `/api/v1/court_types` | `CourtTypeController` |
| Court Levels | `/court_levels` | `/api/v1/court_levels` | `CourtLevelController` |
| Legal Cases | `/legal-cases` | `/api/v1/legal-cases` | `LegCaseController` |
| Case Types | `/case_types` | `/api/v1/case_types` | `CaseTypeController` |
| Case Sub Types | `/case_sub_types` | `/api/v1/case_sub_types` | `CaseSubTypeController` |
| Procedure Types | `/procedure_types` | `/api/v1/procedure_types` | `ProcedureTypeController` |
| Procedure Place Types | `/procedure_place_types` | `/api/v1/procedure_place_types` | `ProcedurePlaceTypeController` |
| Expense Categories | `/expense_categories` | `/api/v1/expense_categories` | `ExpenseCategoryController` |
| Procedures | `/procedures` | `/api/v1/procedures` | `ProcedureController` |
| Services | `/services` | `/api/v1/services` | `ServiceController` |

## Extra Routes & Searches

| Legacy Route | New Route | Controller |
| --- | --- | --- |
| `GET /search-court` | `GET /api/v1/search-court` | `CourtSearchController@index` |
| `GET /clients/search` | `GET /api/v1/clients/search` | `DashboardController@getClientByNameOrPhoneNumber` |
| `GET /unclients-search` | `GET /api/v1/unclients-search` | `UnclientController@getUnclientSearch` |
| `GET /court-types/{courtTypeId}` | `GET /api/v1/court-types/{courtTypeId}` | `CourtTypeController@getCourtTypesWithSubTypes` |
| `GET /legal-case/case-types-sub-types` | `GET /api/v1/legal-case/case-types-sub-types` | `LegCaseController@getCaseTypesWithCaseSubTypes` |
| `GET /case-types/{caseTypeId}/sub-types` | `GET /api/v1/case-types/{caseTypeId}/sub-types` | `CaseTypeController@getCaseTypesWithSubTypes` |
| `GET /legal-case-search` | `GET /api/v1/legal-case-search` | `LegCaseController@getLegCaseSearch` |
| `POST /legal-cases/{legCaseId}/add_clients` | `POST /api/v1/legal-cases/{legCaseId}/add_clients` | `LegCaseController@addClients` |
| `DELETE /legal-cases/{legCaseId}/clients/{clientId}` | `DELETE /api/v1/legal-cases/{legCaseId}/clients/{clientId}` | `LegCaseController@delete` |
| `POST /legal-cases/add_courts` | `POST /api/v1/legal-cases/add_courts` | `LegCaseController@addLegCaseCourts` |
| `DELETE /leg-case/remove-court` | `DELETE /api/v1/leg-case/remove-court` | `LegCaseController@removeCourtFromLegCase` |
| `GET /procedures/procedure-type/{procedureTypeId}` | `GET /api/v1/procedures/procedure-type/{procedureTypeId}` | `ProcedureController@getByProcedureTypeId` |
| `GET /procedures/leg-case/{legCaseId}` | `GET /api/v1/procedures/leg-case/{legCaseId}` | `ProcedureController@getByLegCaseId` |
| `GET /service-search` | `GET /api/v1/service-search` | `ServiceController@getServiceSearch` |
| `GET /service-types` | `GET /api/v1/service-types` | `ServiceController@getServiceTypes` |
| `GET /service-procedures/{serviceId}` | `GET /api/v1/service-procedures/{serviceId}` | `ServiceProcedureController@index` |
| `POST /service-procedures` | `POST /api/v1/service-procedures` | `ServiceProcedureController@store` |
| `PUT /service-procedure/{id}` | `PUT /api/v1/service-procedure/{id}` | `ServiceProcedureController@update` |
| `DELETE /service-procedure/{id}` | `DELETE /api/v1/service-procedure/{id}` | `ServiceProcedureController@destroy` |
| `GET /procedures-search` | `GET /api/v1/procedures-search` | `ProcedureSearchController@searchFilters` |
| `GET /case-status` | `GET /api/v1/case-status` | `CaseStatusController@index` |
| `GET /case-status` (legacy duplicate) | `GET /api/v1/case-status/fetch` | `CaseStatusController@fetchCaseStatus` |
| `GET /fetch-degrees` | `GET /api/v1/fetch-degrees` | `CaseStatusController@fetchDegrees` |
| `GET /get-court-options` | `GET /api/v1/get-court-options` | `CaseStatusController@getCourtOptions` |
| `GET /get-case-type-options` | `GET /api/v1/get-case-type-options` | `CaseStatusController@getCaseTypeOptions` |
| `GET /get-case-year-options` | `GET /api/v1/get-case-year-options` | `CaseStatusController@getCaseYearOptions` |
| `GET /get-case-details` | `GET /api/v1/get-case-details` | `CaseStatusController@getCaseDetails` |
| `GET /expenses/search` | `GET /api/v1/expenses/search` | `ExpenseController@searchExpenses` |
| `GET /notifications/{userId}` | `GET /api/v1/notifications/{userId}` | `NotificationController@index` |
| `POST /notifications/{notificationId}/read` | `POST /api/v1/notifications/{notificationId}/read` | `NotificationController@markRead` |
| `POST /notification` | `POST /api/v1/notification` | `NotificationController@store` |
| `POST /event` | `POST /api/v1/event` | `EventController@store` |
| `GET /events` | `GET /api/v1/events` | `EventController@index` |

## Legal Ads

| Legacy Route | New Route | Controller |
| --- | --- | --- |
| `GET /legal-ads` | `GET /api/v1/legal-ads` | `LegalAdController@index` |
| `GET /legal-ads/{legCaseId}` | `GET /api/v1/legal-ads/{legCaseId}` | `LegalAdController@getByLegCaseId` |
| `POST /legal-ads` | `POST /api/v1/legal-ads` | `LegalAdController@store` |
| `PUT /legal-ads/{legalAdId}` | `PUT /api/v1/legal-ads/{legalAdId}` | `LegalAdController@update` |
| `DELETE /legal-ads/{legalAdId}` | `DELETE /api/v1/legal-ads/{legalAdId}` | `LegalAdController@destroy` |
| `GET /legal_ad_types` | `GET /api/v1/legal_ad_types` | `LegalAdTypeController@index` |
| `POST /legal_ad_types` | `POST /api/v1/legal_ad_types` | `LegalAdTypeController@store` |

## Legal Sessions

| Legacy Route | New Route | Controller |
| --- | --- | --- |
| `GET /legal_sessions` | `GET /api/v1/legal_sessions` | `LegalSessionController@index` |
| `GET /legal_session_types` | `GET /api/v1/legal_session_types` | `LegalSessionTypeController@index` |
| `GET /legal_sessions/leg-case/{legCaseId}` | `GET /api/v1/legal_sessions/leg-case/{legCaseId}` | `LegalSessionController@getSessionsByLegCaseId` |
| `GET /legal_sessions/court/{courtId}` | `GET /api/v1/legal_sessions/court/{courtId}` | `LegalSessionController@getByCourtId` |
| `GET /legal_sessions/lawyer/{lawyerId}` | `GET /api/v1/legal_sessions/lawyer/{lawyerId}` | `LegalSessionController@getByLawyerId` |
| `POST /legal_sessions` | `POST /api/v1/legal_sessions` | `LegalSessionController@store` |
| `PUT /legal_sessions/{id}` | `PUT /api/v1/legal_sessions/{id}` | `LegalSessionController@update` |
| `DELETE /legal_sessions/{id}` | `DELETE /api/v1/legal_sessions/{id}` | `LegalSessionController@destroy` |

## Document Management

| Legacy Route | New Route | Controller |
| --- | --- | --- |
| `GET /doc-types` | `GET /api/v1/doc-types` | `LegalDocToolsController@getDocTypesWithDocSubTypes` |
| `POST /doc-types` | `POST /api/v1/doc-types` | `LegalDocToolsController@addDocType` |
| `PUT /doc-types/{id}` | `PUT /api/v1/doc-types/{id}` | `LegalDocToolsController@editDocType` |
| `DELETE /doc-types/{id}` | `DELETE /api/v1/doc-types/{id}` | `LegalDocToolsController@deleteDocTypeAndDocSubType` |
| `POST /doc-sub-types` | `POST /api/v1/doc-sub-types` | `LegalDocToolsController@addDocSubType` |
| `PUT /doc-sub-types/{id}` | `PUT /api/v1/doc-sub-types/{id}` | `LegalDocToolsController@editDocSubType` |
| `POST /legal-doc-upload` | `POST /api/v1/legal-doc-upload` | `LegalDocArchiveController@uploadLegalDoc` |

## Court Search Filters

| Legacy Route | New Route | Controller |
| --- | --- | --- |
| `GET /court-search/degrees` | `GET /api/v1/court-search/degrees` | `CourtSearchController@getDegrees` |
| `POST /court-search/courts` | `POST /api/v1/court-search/courts` | `CourtSearchController@getCourts` |
| `GET /court-search/case-types` | `GET /api/v1/court-search/case-types` | `CourtSearchController@getCaseTypes` |

## Notes

* Controllers currently respond with a `501 Not Implemented` payload until logic is ported.
* Authentication middleware is wired to the `auth:sanctum` guard for SPA cookie auth.
