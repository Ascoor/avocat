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

    private const SORT_ALIASES = [
        'createdAt' => 'created_at',
        'dateStart' => 'date_start',
        'dateEnd' => 'date_end',
        'fileNo' => 'file_no',
        'caseSlug' => 'case_slug',
        'slug' => 'case_slug',
    ]; 
    /**
     * Show a case along with related entities based on request parameters
     */
    public function show(Request $request, int $caseId): JsonResponse
    {
        $case = LegCase::with($this->resolveIncludes($request))
            ->find($caseId);

        if (!$case) {
            return response()->json(['message' => 'Case not found.'], 404);
        }

        return response()->json(['data' => $case]);
    }

    /**
     * Generalized method to return related entities for the case
     */
    private function caseRelationResponse(Request $request, int $caseId, string $relation): JsonResponse
    {
        $with = [$relation];

        if ($relation === 'legalSessions') {
            $with = array_merge($with, ['legalSessions.legalSessionType', 'legalSessions.court', 'legalSessions.lawyer']);
        }

        if ($relation === 'procedures') {
            $with = array_merge($with, ['procedures.procedureType', 'procedures.lawyer']);
        }

        $case = LegCase::with($with)->find($caseId);

        if (!$case) {
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
     * Search function to filter cases based on query parameters
     */
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
            'sort_by' => 'nullable|string|max:50',
            'sort_dir' => ['nullable', 'string', 'in:asc,desc'],
        ]);

        $query = LegCase::query();

        // Apply search filters dynamically
        $this->applySearchFilters($query, $validated);

        // Apply sorting
        $sortBy = $this->resolveSortBy($validated['sort_by'] ?? null);
        $sortDir = $validated['sort_dir'] ?? 'desc';
        $sortColumn = self::SORT_ALLOWLIST[$sortBy] ?? self::SORT_ALLOWLIST['created_at'];
        $query->orderBy($sortColumn, $sortDir);

        // Pagination
        $shouldPaginate = filter_var($validated['paginate'] ?? true, FILTER_VALIDATE_BOOL);
        $perPage = $validated['per_page'] ?? 15;

        if ($shouldPaginate) {
            $result = $query->paginate($perPage)->appends($request->query());
            return response()->json($result);
        }

        return response()->json(['data' => $query->get()]);
    }

    /**
     * Apply search filters to the query dynamically
     */
    private function applySearchFilters($query, $filters)
    {
        $query->when($filters['q'] ?? null, function ($builder, $q) {
            $builder->where(function ($inner) use ($q) {
                $inner->where('slug', 'like', "%{$q}%")
                    ->orWhere('title', 'like', "%{$q}%")
                    ->orWhere('description', 'like', "%{$q}%")
                    ->orWhereHas('clients', function ($clientQuery) use ($q) {
                        $clientQuery->where('name', 'like', "%{$q}%");
                    });
            });
        });

        // Add more filters dynamically...
        $query->when($filters['case_number'] ?? null, function ($builder, $caseNumber) {
            $builder->whereHas('courts', function ($courtQuery) use ($caseNumber) {
                $courtQuery->where('leg_case_court.case_number', $caseNumber);
            });
        });

        // Add additional filter logic...
    }

    /**
     * Resolves the 'include' query for eager loading related entities
     */
    private function resolveIncludes(Request $request): array
    {
        $rawIncludes = $request->query('include', ''); // Default to empty string

        if (empty($rawIncludes)) {
            return ['legalSessions', 'procedures', 'clients', 'services', 'courts'];
        }

        $requested = collect(explode(',', $rawIncludes))
            ->map(fn ($item) => trim($item))
            ->filter(fn ($item) => $item !== '')
            ->values();

        // Filter allowed includes
        return $requested->filter(fn ($item) => in_array($item, $this->allowedIncludes, true))
                         ->values()
                         ->all() ?: ['legalSessions', 'procedures', 'clients', 'services'];
    }

private function resolveSortBy(?string $sortBy): string
{
    if (! is_string($sortBy) || trim($sortBy) === '') {
        return 'created_at';
    }

    $normalized = self::SORT_ALIASES[$sortBy] ?? $sortBy;

    return array_key_exists($normalized, self::SORT_ALLOWLIST) ? $normalized : 'created_at';
}
}