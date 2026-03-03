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
        'clients',  // Ensure clients are included
        'services',
        'courts',
        'caseType',
        'caseSubType',
    ];

    /**
     * Defining allowed fields for sorting.
     */
    private const SORT_ALLOWLIST = [
        'created_at' => 'leg_cases.created_at',
        'updated_at' => 'leg_cases.updated_at',
        'case_slug' => 'leg_cases.slug',
        'title' => 'leg_cases.title',
        'file_no' => 'leg_cases.file_no',
    ];

    /**
     * Sorting alias map (optional).
     */
    private const SORT_ALIASES = [
        'createdAt' => 'created_at',
        'updatedAt' => 'updated_at',
        'fileNo' => 'file_no',
        'caseSlug' => 'case_slug',
    ];

    /**
     * Show a case along with related entities based on request parameters.
     */
    public function show(Request $request, int $caseId): JsonResponse
    {
        // Ensure clients are loaded explicitly
        $case = $this->findCaseOrNotFound($caseId, $this->resolveIncludes($request));

        if ($case instanceof JsonResponse) {
            return $case;
        }

        return response()->json(['data' => $case]);
    }

    /**
     * Return the legal sessions linked to a case.
     */
    public function sessions(int $caseId): JsonResponse
    {
        $case = $this->findCaseOrNotFound($caseId, ['legalSessions', 'legalSessions.legalSessionType', 'legalSessions.court', 'legalSessions.lawyer']);

        if ($case instanceof JsonResponse) {
            return $case;
        }

        return response()->json(['data' => $case->legalSessions]);
    }

    /**
     * Return the procedures linked to a case.
     */
    public function procedures(int $caseId): JsonResponse
    {
        $case = $this->findCaseOrNotFound($caseId, ['procedures', 'procedures.procedureType', 'procedures.lawyer']);

        if ($case instanceof JsonResponse) {
            return $case;
        }

        return response()->json(['data' => $case->procedures]);
    }

    /**
     * Return the clients linked to a case.
     */
    public function clients(int $caseId): JsonResponse
    {
        $case = $this->findCaseOrNotFound($caseId, ['clients']);

        if ($case instanceof JsonResponse) {
            return $case;
        }

        return response()->json(['data' => $case->clients]);
    }

    /**
     * Return the services linked to a case.
     */
    public function services(int $caseId): JsonResponse
    {
        $case = $this->findCaseOrNotFound($caseId, ['services']);

        if ($case instanceof JsonResponse) {
            return $case;
        }

        return response()->json(['data' => $case->services]);
    }

    /**
     * Search function to filter cases based on query parameters.
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

        // Apply sorting logic
        $sortBy = $this->resolveSortBy($validated['sort_by'] ?? null);
        $sortDir = $validated['sort_dir'] ?? 'desc';
        $sortColumn = self::SORT_ALLOWLIST[$sortBy] ?? self::SORT_ALLOWLIST['created_at'];
        $query->orderBy($sortColumn, $sortDir);

        // Pagination
        $shouldPaginate = filter_var($validated['paginate'] ?? true, FILTER_VALIDATE_BOOL);
        $perPage = $validated['per_page'] ?? 15;

        // Ensure clients are included in the response
        $query->with('clients');

        if ($shouldPaginate) {
            $result = $query->paginate($perPage)->appends($request->query());
            return response()->json($result);
        }

        return response()->json(['data' => $query->get()]);
    }

    /**
     * Apply search filters to the query dynamically.
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
    }

    /**
     * Resolves the 'include' query for eager loading related entities.
     */
    private function resolveIncludes(Request $request): array
    {
        $rawIncludes = $request->query('include', ''); // Default to empty string

        if (empty($rawIncludes)) {
            return ['legalSessions', 'procedures', 'clients', 'services', 'courts'];  // Ensure clients are included here
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

    /**
     * Resolves sort-by query and returns the correct field.
     */
    private function resolveSortBy(?string $sortBy): string
    {
        if (! is_string($sortBy) || trim($sortBy) === '') {
            return 'created_at'; // Default sort field
        }

        $normalized = self::SORT_ALIASES[$sortBy] ?? $sortBy;

        return array_key_exists($normalized, self::SORT_ALLOWLIST) ? $normalized : 'created_at';
    }

    /**
     * Finds a case and optionally eager loads relations.
     */
    private function findCaseOrNotFound(int $caseId, array $with = []): LegCase|JsonResponse
    {
        $query = LegCase::query();

        if ($with !== []) {
            $query->with($with);
        }

        $case = $query->find($caseId);

        if (!$case) {
            return response()->json(['message' => 'Case not found.'], 404);
        }

        return $case;
    }
}
