<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LegCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CaseReportingController extends Controller
{ 
    /**
     * @var array<int, string>
     */
    private array $allowedIncludes = [
        'legalSessions',
        'legalSessions.legalSessionType',
        'legalSessions.court',
        'legalSessions.lawyer',
        'procedures',
        'procedures.procedureType',
        'procedures.lawyer',
        'clients',
        'services',
        'courts',
        'caseType',
        'caseSubType',
    ];

    public function show(Request $request, int $caseId): JsonResponse
    {
        $case = LegCase::with($this->resolveIncludes($request)) 
            ->find($caseId);

        if (! $case) {
            return response()->json(['message' => 'Case not found.'], 404);
        }

        return response()->json(['data' => $case]);
    }

    public function sessions(Request $request, int $caseId): JsonResponse
    {
        return $this->caseRelationResponse($request, $caseId, 'legalSessions');
    }

    public function procedures(Request $request, int $caseId): JsonResponse
    {
        return $this->caseRelationResponse($request, $caseId, 'procedures');
    }

    public function clients(Request $request, int $caseId): JsonResponse
    {
        return $this->caseRelationResponse($request, $caseId, 'clients');
    }

    public function services(Request $request, int $caseId): JsonResponse
    {
        return $this->caseRelationResponse($request, $caseId, 'services');
    }

    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'q' => ['nullable', 'string'],
            'case_number' => ['nullable', 'string'],
            'from_date' => ['nullable', 'date'],
            'to_date' => ['nullable', 'date', 'after_or_equal:from_date'],
            'procedure_type' => ['nullable'],
            'session_type' => ['nullable'],
            'client_name' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            'paginate' => ['nullable', 'boolean'],
            'include' => ['nullable', 'string'],
        ]);

        $query = LegCase::query();

        $query->when($validated['q'] ?? null, function ($builder, $q) {
            $builder->where(function ($inner) use ($q) {
                $inner->where('slug', 'like', "%{$q}%")
                    ->orWhere('title', 'like', "%{$q}%")
                    ->orWhere('description', 'like', "%{$q}%")
                    ->orWhereHas('clients', function ($clientQuery) use ($q) {
                        $clientQuery->where('name', 'like', "%{$q}%");
                    });
            });
        });

        $query->when($validated['case_number'] ?? null, function ($builder, $caseNumber) {
            $builder->whereHas('courts', function ($courtQuery) use ($caseNumber) {
                $courtQuery->where('leg_case_court.case_number', $caseNumber);
            });
        });

        $query->when(($validated['from_date'] ?? null) && ($validated['to_date'] ?? null), function ($builder) use ($validated) {
            $builder->whereBetween('created_at', [$validated['from_date'], $validated['to_date']]);
        });

        $query->when($validated['procedure_type'] ?? null, function ($builder, $procedureType) {
            $builder->whereHas('procedures', function ($procedureQuery) use ($procedureType) {
                $procedureQuery->where('procedure_type_id', $procedureType)
                    ->orWhereHas('procedureType', function ($procedureTypeQuery) use ($procedureType) {
                        $procedureTypeQuery->where('id', $procedureType)
                            ->orWhere('name', 'like', "%{$procedureType}%");
                    });
            });
        });

        $query->when($validated['session_type'] ?? null, function ($builder, $sessionType) {
            $builder->whereHas('legalSessions', function ($sessionQuery) use ($sessionType) {
                $sessionQuery->where('legal_session_type_id', $sessionType)
                    ->orWhereHas('legalSessionType', function ($sessionTypeQuery) use ($sessionType) {
                        $sessionTypeQuery->where('id', $sessionType)
                            ->orWhere('name', 'like', "%{$sessionType}%");
                    });
            });
        });

        $query->when($validated['client_name'] ?? null, function ($builder, $clientName) {
            $builder->whereHas('clients', function ($clientQuery) use ($clientName) {
                $clientQuery->where('name', 'like', "%{$clientName}%");
            });
        });

        $query->when($validated['status'] ?? null, function ($builder, $status) {
            $builder->where('status', $status);
        });

        $query->with($this->resolveIncludes($request))
            ->withCount(['legalSessions', 'procedures', 'clients', 'services'])
            ->orderByDesc('created_at');

        $shouldPaginate = filter_var($validated['paginate'] ?? true, FILTER_VALIDATE_BOOL);
        $perPage = $validated['per_page'] ?? 15;

        if ($shouldPaginate) {
            $result = $query->paginate($perPage)->appends($request->query());

            return response()->json($result);
        }

        return response()->json(['data' => $query->get()]);
    }

    private function caseRelationResponse(Request $request, int $caseId, string $relation): JsonResponse
    {
        $with = [$relation];

        if ($relation === 'legalSessions') {
            $with[] = 'legalSessions.legalSessionType';
            $with[] = 'legalSessions.court';
            $with[] = 'legalSessions.lawyer';
        }

        if ($relation === 'procedures') {
            $with[] = 'procedures.procedureType';
            $with[] = 'procedures.lawyer';
        }

        $case = LegCase::with($with)->find($caseId);

        if (! $case) {
            return response()->json(['message' => 'Case not found.'], 404);
        }

        return response()->json([
            'data' => $case->{$relation},
            'meta' => [
                'case_id' => $caseId,
                'count' => $case->{$relation}->count(),
            ],
        ]);
    }

    /**
     * @return array<int, string>
     */
    private function resolveIncludes(Request $request): array
    {
        $rawIncludes = $request->query('include');

        if (! is_string($rawIncludes) || trim($rawIncludes) === '') {
            return [
                'legalSessions',
                'legalSessions.legalSessionType',
                'procedures',
                'procedures.procedureType',
                'clients',
                'services',
                'courts',
            ];
        }

        $requested = collect(explode(',', $rawIncludes))
            ->map(fn ($item) => trim($item))
            ->filter(fn ($item) => $item !== '')
            ->values();

        $safeIncludes = $requested
            ->filter(fn ($item) => in_array($item, $this->allowedIncludes, true))
            ->values()
            ->all();

        return $safeIncludes === [] ? ['clients', 'courts'] : $safeIncludes;
    }
}
