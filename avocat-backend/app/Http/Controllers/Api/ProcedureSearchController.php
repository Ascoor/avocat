<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Procedure;
use Illuminate\Http\Request;

class ProcedureSearchController extends Controller
{
    // Defining allowed fields for sorting
    private const SORT_ALLOWLIST = [
        'created_at' => 'procedures.created_at',
        'date_start' => 'procedures.date_start',
        'date_end' => 'procedures.date_end',
        'status' => 'procedures.status',
        'file_no' => 'leg_cases.slug',
        'case_slug' => 'leg_cases.slug',
    ];


    public function searchFilters(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'q' => 'nullable|string|max:255',
            'filters' => 'nullable|array',
            'filters.case_slug' => 'nullable|string|max:255',
            'filters.file_no' => 'nullable|string|max:255',
            'filters.date_from' => 'nullable|date',
            'filters.date_to' => 'nullable|date|after_or_equal:filters.date_from',
            'filters.court_id' => 'nullable|integer|exists:courts,id',
            'filters.status' => 'nullable|in:تمت,لم ينفذ,جاري التنفيذ',
            'filters.lawyer_id' => 'nullable|integer|exists:lawyers,id',
            'filters.client_id' => 'nullable|integer|exists:clients,id',
            'filters.service_id' => 'nullable|integer',
            'sort_dir' => 'nullable|string|in:asc,desc',
            'page' => 'nullable|integer|min:1',
            'per_page' => 'nullable|integer|min:1|max:100',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date|after_or_equal:date_start',
            'lawyer_id' => 'nullable|integer|exists:lawyers,id',
            'status' => 'nullable|in:تمت,لم ينفذ,جاري التنفيذ',
        ]);

        // Filter applied parameters
        $filters = array_filter(array_merge($validated['filters'] ?? [], [
            'date_from' => $validated['date_start'] ?? null,
            'date_to' => $validated['date_end'] ?? null,
            'lawyer_id' => $validated['lawyer_id'] ?? null,
            'status' => $validated['status'] ?? null,
        ]), fn ($value) => $value !== null && trim((string) $value) !== '');

        $sortDir = $validated['sort_dir'] ?? 'desc';
        $perPage = (int) ($validated['per_page'] ?? 20);
        $search = trim((string) ($validated['q'] ?? ''));

        // Create query for fetching procedures with join and eager loading
        $query = Procedure::query()
            ->select('procedures.*')
            ->leftJoin('leg_cases', 'leg_cases.id', '=', 'procedures.leg_case_id')
            ->with([
                'legCase:id,slug,title',
                'legCase.clients:id,name',
                'lawyer:id,name',
                'createdBy:id,name',
                'procedurePlaceType:id,name',
                'procedureType:id,name',
            ]);

        // Apply search filters
        if (!empty($search)) {
            $query->where(function ($builder) use ($search) {
                $builder->where('procedures.job', 'like', "%{$search}%")
                    ->orWhere('procedures.note', 'like', "%{$search}%")
                    ->orWhere('procedures.result', 'like', "%{$search}%")
                    ->orWhere('leg_cases.slug', 'like', "%{$search}%")
                    ->orWhere('leg_cases.title', 'like', "%{$search}%");
            });
        }

        // Apply additional filters (case_slug, file_no, etc.)
        if (!empty($filters['case_slug']) || !empty($filters['file_no'])) {
            $slug = $filters['case_slug'] ?? $filters['file_no'];
            $query->where('leg_cases.slug', 'like', "%{$slug}%");
        }

        // Apply date filters
        if (!empty($filters['date_from'])) {
            $query->whereDate('procedures.date_start', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->whereDate('procedures.date_start', '<=', $filters['date_to']);
        }

        // Additional filters for court, client, lawyer, and status
        if (!empty($filters['court_id'])) {
            $query->whereExists(function ($subQuery) use ($filters) {
                $subQuery->selectRaw('1')
                    ->from('leg_case_court')
                    ->whereColumn('leg_case_court.leg_case_id', 'procedures.leg_case_id')
                    ->where('leg_case_court.court_id', $filters['court_id']);
            });
        }

        if (!empty($filters['client_id'])) {
            $query->whereExists(function ($subQuery) use ($filters) {
                $subQuery->selectRaw('1')
                    ->from('leg_case_client')
                    ->whereColumn('leg_case_client.leg_case_id', 'procedures.leg_case_id')
                    ->where('leg_case_client.client_id', $filters['client_id']);
            });
        }

        if (!empty($filters['lawyer_id'])) {
            $query->where('procedures.lawyer_id', $filters['lawyer_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('procedures.status', $filters['status']);
        }

        $paginator = $query
            ->orderBy(self::SORT_ALLOWLIST['created_at'], $sortDir)
            ->orderByDesc('procedures.id')
            ->paginate($perPage)
            ->appends($request->query());

        // Fetch distinct statuses for facet data
        $statuses = Procedure::query()->select('status')->distinct()->whereNotNull('status')->pluck('status')->values();

        // Return the response
        return response()->json([
            'data' => $paginator->items(),
            'meta' => [
                'page' => $paginator->currentPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'last_page' => $paginator->lastPage(),
            ],
            'facets' => [
                'statuses' => $statuses,
            ],
        ]);
    }
}