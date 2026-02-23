<?php

use App\Models\AttorneyType;
use App\Models\CaseSubType;
use App\Models\CaseType;
use App\Models\Court;
use App\Models\CourtLevel;
use App\Models\CourtType;
use App\Models\Division;
use App\Models\DocSubType;
use App\Models\DocType;
use App\Models\ExpenseCategory;
use App\Models\LegalAdType;
use App\Models\LegalSessionType;
use App\Models\PowerType;
use App\Models\ProcedurePlaceType;
use App\Models\ProcedureType;
use App\Models\RevenueCategory;
use App\Models\SearchCaseType;
use App\Models\SearchCourt;
use App\Models\SearchDegree;
use App\Models\ServiceType;
use Illuminate\Support\Facades\DB;

return [
    'sections' => [
        'case_settings' => ['case_types', 'case_sub_types'],
        'service_settings' => ['service_types'],
        'procedure_settings' => ['procedure_types', 'procedure_place_types'],
        'session_settings' => ['legal_session_types'],
        'announcement_settings' => ['legal_ad_types'],
        'financial_settings' => ['revenue_categories', 'expense_categories'],
        'lawyer_settings' => ['attorney_types'],
        'court_settings' => ['court_levels', 'court_types', 'courts', 'divisions'],
        'document_settings' => ['doc_types', 'doc_sub_types'],
        'external_search_data' => ['search_degrees', 'search_courts', 'search_case_types'],
        'extra_reference' => ['power_types', 'appeal_types', 'appeal_sub_types'],
    ],

    'entities' => [
        'case_types' => [
            'model' => CaseType::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'rules' => ['case_type_id' => ['prohibited']],
            'in_use_checker' => static fn (int $id): bool => DB::table('leg_cases')->where('case_type_id', $id)->exists() || DB::table('case_sub_types')->where('case_type_id', $id)->exists(),
        ],
        'case_sub_types' => [
            'model' => CaseSubType::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'required_columns' => ['case_type_id'],
            'rules' => ['case_type_id' => ['required', 'integer', 'exists:case_types,id']],
            'in_use_checker' => static fn (int $id): bool => DB::table('leg_cases')->where('case_sub_type_id', $id)->exists(),
        ],
        'service_types' => [
            'model' => ServiceType::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'in_use_checker' => static fn (int $id): bool => DB::table('services')->where('service_type_id', $id)->exists(),
        ],
        'procedure_types' => [
            'model' => ProcedureType::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'rules' => ['case_type_id' => ['prohibited']],
            'in_use_checker' => static fn (int $id): bool => DB::table('procedures')->where('procedure_type_id', $id)->exists(),
        ],
        'procedure_place_types' => [
            'model' => ProcedurePlaceType::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'rules' => ['case_type_id' => ['prohibited']],
            'in_use_checker' => static fn (int $id): bool => DB::table('procedures')->where('procedure_place_type_id', $id)->exists(),
        ],
        'legal_session_types' => [
            'model' => LegalSessionType::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'rules' => ['case_type_id' => ['prohibited']],
            'in_use_checker' => static fn (int $id): bool => DB::table('legal_sessions')->where('legal_session_type_id', $id)->exists(),
        ],
        'legal_ad_types' => [
            'model' => LegalAdType::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'rules' => ['case_type_id' => ['prohibited']],
            'in_use_checker' => static fn (int $id): bool => DB::table('legal_ads')->where('legal_ad_type_id', $id)->exists(),
        ],
        'revenue_categories' => [
            'model' => RevenueCategory::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'in_use_checker' => static fn (int $id): bool => DB::table('revenues')->where('revenue_category_id', $id)->exists(),
        ],
        'expense_categories' => [
            'model' => ExpenseCategory::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'in_use_checker' => static fn (int $id): bool => DB::table('expenses')->where('expense_category_id', $id)->exists(),
        ],
        'attorney_types' => [
            'model' => AttorneyType::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'in_use_checker' => static fn (int $id): bool => DB::table('power_of_attorneys')->where('attorney_type_id', $id)->exists(),
        ],
        'court_levels' => [
            'model' => CourtLevel::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'rules' => ['case_type_id' => ['prohibited']],
            'in_use_checker' => static fn (int $id): bool => DB::table('courts')->where('court_level_id', $id)->exists(),
        ],
        'court_types' => [
            'model' => CourtType::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'in_use_checker' => static fn (int $id): bool => DB::table('courts')->where('court_type_id', $id)->exists(),
        ],
        'courts' => [
            'model' => Court::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'required_columns' => ['court_type_id', 'court_level_id'],
            'rules' => [
                'court_type_id' => ['required', 'integer', 'exists:court_types,id'],
                'court_level_id' => ['required', 'integer', 'exists:court_levels,id'],
            ],
            'in_use_checker' => static fn (int $id): bool => DB::table('legal_sessions')->where('court_id', $id)->exists() || DB::table('legal_ads')->where('court_id', $id)->exists() || DB::table('leg_case_court')->where('court_id', $id)->exists() || DB::table('divisions')->where('court_id', $id)->exists(),
        ],
        'divisions' => [
            'model' => Division::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'required_columns' => ['court_id'],
            'rules' => [
                'court_id' => ['required', 'integer', 'exists:courts,id'],
            ],
            'in_use_checker' => static fn (int $id): bool => false,
        ],
        'doc_types' => [
            'model' => DocType::class,
            'name_column' => 'name',
            'mode' => 'office_specific',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'in_use_checker' => static fn (int $id): bool => DB::table('doc_sub_types')->where('doc_type_id', $id)->exists() || DB::table('legal_docs')->where('doc_type_id', $id)->exists(),
        ],
        'doc_sub_types' => [
            'model' => DocSubType::class,
            'name_column' => 'name',
            'mode' => 'office_specific',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'required_columns' => ['doc_type_id'],
            'in_use_checker' => static fn (int $id): bool => DB::table('legal_docs')->where('doc_sub_type_id', $id)->exists(),
        ],
        'power_types' => [
            'model' => PowerType::class,
            'name_column' => 'name',
            'mode' => 'system_overrides',
            'operations' => ['index', 'store', 'update', 'destroy'],
            'in_use_checker' => static fn (int $id): bool => false,
        ],

        'search_degrees' => ['model' => SearchDegree::class, 'name_column' => 'degree_name', 'mode' => 'system_only', 'operations' => ['index']],
        'search_courts' => ['model' => SearchCourt::class, 'name_column' => 'court_name', 'mode' => 'system_only', 'operations' => ['index']],
        'search_case_types' => ['model' => SearchCaseType::class, 'name_column' => 'case_type_name', 'mode' => 'system_only', 'operations' => ['index']],
        'appeal_types' => ['model' => App\Models\AppealType::class, 'name_column' => 'appeal_type', 'mode' => 'system_only', 'operations' => ['index']],
        'appeal_sub_types' => ['model' => App\Models\AppealSubType::class, 'name_column' => 'appeal_sub_type', 'mode' => 'system_only', 'operations' => ['index']],
    ],
];
