<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CaseStatusController;
use App\Http\Controllers\Api\CaseSubTypeController;
use App\Http\Controllers\Api\CaseTypeController;
use App\Http\Controllers\Api\CaseReportingController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CourtController;
use App\Http\Controllers\Api\CourtLevelController;
use App\Http\Controllers\Api\CourtSearchController;
use App\Http\Controllers\Api\CourtTypeController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\FinanceLedgerController;
use App\Http\Controllers\Api\ExpenseCategoryController;
use App\Http\Controllers\Api\ExpenseController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\LawyerController;
use App\Http\Controllers\Api\LegalAdController;
use App\Http\Controllers\Api\LegalAdTypeController;
use App\Http\Controllers\Api\LegalDocArchiveController;
use App\Http\Controllers\Api\LegalDocToolsController;
use App\Http\Controllers\Api\LegalSessionController;
use App\Http\Controllers\Api\LegalSessionTypeController;
use App\Http\Controllers\Api\LegCaseController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\OfficeSettingsController;
use App\Http\Controllers\Api\ProcedureController;
use App\Http\Controllers\Api\ProcedurePlaceTypeController;
use App\Http\Controllers\Api\ProcedureSearchController;
use App\Http\Controllers\Api\ProcedureTypeController;
use App\Http\Controllers\Api\RbacController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ServiceProcedureController;
use App\Http\Controllers\Api\UnclientController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login'])->middleware('throttle:login');
    Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->name('forgot-password');
    Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('reset-password');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
            ->middleware('signed')
            ->name('verification.verify');
        Route::post('email/verify/resend', [AuthController::class, 'resendVerificationEmail'])->name('verification.resend');
        Route::post('token/refresh', [AuthController::class, 'token']);


        Route::get('rbac/me', [RbacController::class, 'me']);
        Route::get('rbac/users', [RbacController::class, 'users']);
        Route::post('rbac/users', [RbacController::class, 'storeUser']);
        Route::put('rbac/users/{user}', [RbacController::class, 'updateUser']);
        Route::delete('rbac/users/{user}', [RbacController::class, 'deleteUser']);
        Route::get('rbac/roles', [RbacController::class, 'roles']);
        Route::post('rbac/roles', [RbacController::class, 'storeRole']);
        Route::put('rbac/roles/{role}', [RbacController::class, 'updateRole']);
        Route::delete('rbac/roles/{role}', [RbacController::class, 'deleteRole']);
        Route::get('rbac/permissions', [RbacController::class, 'permissions']);

        Route::get('search-court', [CourtSearchController::class, 'index']);
        Route::get('clients/search', [DashboardController::class, 'getClientByNameOrPhoneNumber'])->name('client.search');

        Route::get('doc-types', [LegalDocToolsController::class, 'getDocTypesWithDocSubTypes']);
        Route::post('doc-types', [LegalDocToolsController::class, 'addDocType']);
        Route::put('doc-types/{id}', [LegalDocToolsController::class, 'editDocType']);
        Route::delete('doc-types/{id}', [LegalDocToolsController::class, 'deleteDocTypeAndDocSubType']);

        Route::post('doc-sub-types', [LegalDocToolsController::class, 'addDocSubType']);
        Route::put('doc-sub-types/{id}', [LegalDocToolsController::class, 'editDocSubType']);

        Route::post('legal-doc-upload', [LegalDocArchiveController::class, 'uploadLegalDoc']);

        Route::apiResource('clients', ClientController::class);
        Route::apiResource('unclients', UnclientController::class);
        Route::apiResource('lawyers', LawyerController::class);
        Route::apiResource('courts', CourtController::class);
        Route::apiResource('court_types', CourtTypeController::class);
        Route::apiResource('court_levels', CourtLevelController::class);
        Route::apiResource('legal-cases', LegCaseController::class);
        Route::apiResource('procedures', ProcedureController::class);
        Route::apiResource('services', ServiceController::class);

        Route::get('lawyer/{lawyer}', [LawyerController::class, 'show']);
        Route::put('lawyer/{lawyer}', [LawyerController::class, 'update']);
        Route::delete('lawyer/{lawyer}', [LawyerController::class, 'destroy']);

        Route::get('all_count_office', [HomeController::class, 'countOffice']);
        Route::get('client-search', [HomeController::class, 'searchClient']);
        Route::get('leg-case-search', [HomeController::class, 'searchLegCase']);

        Route::get('unclients-search', [UnclientController::class, 'getUnclientSearch']);
        Route::get('court-types/{courtTypeId}', [CourtTypeController::class, 'getCourtTypesWithSubTypes']);
        Route::get('legal-case/case-types-sub-types', [LegCaseController::class, 'getCaseTypesWithCaseSubTypes']);
        Route::get('case-types/{caseTypeId}/sub-types', [CaseTypeController::class, 'getCaseTypesWithSubTypes'])->name('case-sub-types.index');
        Route::get('legal-case-search', [LegCaseController::class, 'getLegCaseSearch']);
        Route::get('cases/search', [CaseReportingController::class, 'search'])->name('cases.search');
        Route::get('search', [CaseReportingController::class, 'search']); // backward compatibility
        Route::get('cases/{case_id}', [CaseReportingController::class, 'show']);
        Route::get('cases/{case_id}/sessions', [CaseReportingController::class, 'sessions']);
        Route::get('cases/{case_id}/procedures', [CaseReportingController::class, 'procedures']);
        Route::get('cases/{case_id}/clients', [CaseReportingController::class, 'clients']);
        Route::get('cases/{case_id}/services', [CaseReportingController::class, 'services']);
        Route::post('legal-cases/{legCaseId}/add_clients', [LegCaseController::class, 'addClients']);
        Route::delete('legal-cases/{legCaseId}/clients/{clientId}', [LegCaseController::class, 'delete']);
        Route::post('legal-cases/add_courts', [LegCaseController::class, 'AddLegCaseCourts']);
        Route::delete('leg-case/remove-court', [LegCaseController::class, 'RemoveCourtFromLegCase']);

        Route::get('legal-ads', [LegalAdController::class, 'index']);
        Route::get('legal_ads', [LegalAdController::class, 'index']);
        Route::get('legal-ads/{legCaseId}', [LegalAdController::class, 'getByLegCaseId']);
        Route::post('legal-ads', [LegalAdController::class, 'store']);
        Route::put('legal-ads/{legalAdId}', [LegalAdController::class, 'update']);
        Route::delete('legal-ads/{legalAdId}', [LegalAdController::class, 'destroy']);

        Route::get('legal_sessions', [LegalSessionController::class, 'index']);
        Route::get('legal_session_types', [LegalSessionTypeController::class, 'index']);
        Route::get('case-status/fetch', [CaseStatusController::class, 'fetchCaseStatus']);
        Route::get('legal_sessions/leg-case/{legCaseId}', [LegalSessionController::class, 'getSessionsByLegCaseId']);
        Route::get('legal_sessions/court/{courtId}', [LegalSessionController::class, 'getByCourtId']);
        Route::get('legal_sessions/lawyer/{lawyerId}', [LegalSessionController::class, 'getByLawyerId']);
        Route::post('legal_sessions', [LegalSessionController::class, 'store']);
        Route::put('legal_sessions/{id}', [LegalSessionController::class, 'update']);
        Route::delete('legal_sessions/{id}', [LegalSessionController::class, 'destroy']);

        Route::get('procedures/procedure-type/{procedureTypeId}', [ProcedureController::class, 'getByProcedureTypeId']);
        Route::get('procedures/leg-case/{legCaseId}', [ProcedureController::class, 'getByLegCaseId']);

        Route::get('service-search', [ServiceController::class, 'getServiceSearch']);
        Route::get('service-types', [ServiceController::class, 'getServiceTypes']);

        Route::get('service-procedures/{serviceId}', [ServiceProcedureController::class, 'index']);
        Route::post('service-procedures', [ServiceProcedureController::class, 'store']);
        Route::put('service-procedure/{id}', [ServiceProcedureController::class, 'update']);
        Route::delete('service-procedure/{id}', [ServiceProcedureController::class, 'destroy']);

        Route::get('court-search/degrees', [CourtSearchController::class, 'getDegrees']);
        Route::post('court-search/courts', [CourtSearchController::class, 'getCourts']);
        Route::get('court-search/case-types', [CourtSearchController::class, 'getCaseTypes']);

        Route::get('procedures-search', [ProcedureSearchController::class, 'searchFilters']);
        Route::get('case-status', [CaseStatusController::class, 'index']);
        Route::get('fetch-degrees', [CaseStatusController::class, 'fetchDegrees']);
        Route::get('get-court-options', [CaseStatusController::class, 'getCourtOptions']);
        Route::get('get-case-type-options', [CaseStatusController::class, 'getCaseTypeOptions']);
        Route::get('get-case-year-options', [CaseStatusController::class, 'getCaseYearOptions']);
        Route::get('get-case-details', [CaseStatusController::class, 'getCaseDetails']);

        Route::get('expenses/search', [ExpenseController::class, 'searchExpenses']);

        Route::get('finance/ledger', [FinanceLedgerController::class, 'index']);
        Route::post('finance/ledger', [FinanceLedgerController::class, 'store']);
        Route::get('finance/cases/{id}/summary', [FinanceLedgerController::class, 'caseSummary']);
        Route::get('expense_categories', [ExpenseCategoryController::class, 'index']);
        Route::post('expense_categories', [ExpenseCategoryController::class, 'store']);
        Route::put('expense_categories/{id}', [ExpenseCategoryController::class, 'update']);
        Route::delete('expense_categories/{id}', [ExpenseCategoryController::class, 'destroy']);
        Route::get('offices/{officeId}/settings/{entity}', [OfficeSettingsController::class, 'index'])->middleware('permission.guard:settings.manage,officeSettings.manage');
        Route::post('offices/{officeId}/settings/{entity}', [OfficeSettingsController::class, 'store'])->middleware('permission.guard:officeSettings.manage');
        Route::put('offices/{officeId}/settings/{entity}/{id}', [OfficeSettingsController::class, 'update'])->middleware('permission.guard:officeSettings.manage');
        Route::delete('offices/{officeId}/settings/{entity}/{id}', [OfficeSettingsController::class, 'destroy'])->middleware('permission.guard:officeSettings.manage');

        Route::get('notifications', [NotificationController::class, 'index']);
        Route::post('notifications/{notificationId}/read', [NotificationController::class, 'markRead']);
        Route::post('notifications/read-all', [NotificationController::class, 'markReadAll']);
        Route::get('notifications/unread-count', [NotificationController::class, 'unreadCount']);
        Route::post('event', [EventController::class, 'store']);
        Route::get('events', [EventController::class, 'index']);

        Route::put('user/{user}', [UserController::class, 'updateProfile'])->name('user.update');
        Route::get('user/{user}', [UserController::class, 'getUserDetails'])->name('user.details');
    });
});
