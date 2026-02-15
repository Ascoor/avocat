<?php

use App\Models\CaseSubType;
use App\Models\CaseType;
use App\Models\CourtLevel;
use App\Models\LegalAd;
use App\Models\LegalAdType;
use App\Models\LegalSession;
use App\Models\LegalSessionType;
use App\Models\LegCase;
use App\Models\Procedure;
use App\Models\ProcedurePlaceType;
use App\Models\ProcedureType;
use Illuminate\Database\Eloquent\Model;

return [
    'entities' => [
        'case_types' => [
            'model' => CaseType::class,
            'rules' => ['case_type_id' => ['prohibited']],
            'in_use' => fn (Model $model): bool => LegCase::where('case_type_id', $model->id)->exists(),
        ],
        'case_sub_types' => [
            'model' => CaseSubType::class,
            'rules' => ['case_type_id' => ['required', 'integer', 'exists:case_types,id']],
            'in_use' => fn (Model $model): bool => LegCase::where('case_sub_type_id', $model->id)->exists(),
        ],
        'court_levels' => [
            'model' => CourtLevel::class,
            'rules' => ['case_type_id' => ['prohibited']],
            'in_use' => fn (Model $model): bool => $model->courts()->exists(),
        ],
        'legal_session_types' => [
            'model' => LegalSessionType::class,
            'rules' => ['case_type_id' => ['prohibited']],
            'in_use' => fn (Model $model): bool => LegalSession::where('legal_session_type_id', $model->id)->exists(),
        ],
        'procedure_types' => [
            'model' => ProcedureType::class,
            'rules' => ['case_type_id' => ['prohibited']],
            'in_use' => fn (Model $model): bool => Procedure::where('procedure_type_id', $model->id)->exists(),
        ],
        'procedure_place_types' => [
            'model' => ProcedurePlaceType::class,
            'rules' => ['case_type_id' => ['prohibited']],
            'in_use' => fn (Model $model): bool => Procedure::where('procedure_place_type_id', $model->id)->exists(),
        ],
        'legal_ad_types' => [
            'model' => LegalAdType::class,
            'rules' => ['case_type_id' => ['prohibited']],
            'in_use' => fn (Model $model): bool => LegalAd::where('legal_ad_type_id', $model->id)->exists(),
        ],
    ],
];
