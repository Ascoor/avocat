<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LegCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CaseReportingController extends Controller
{
    public function show(int $caseId): JsonResponse
    {
        $case = LegCase::with($this->defaultRelations())
            ->find($caseId);

        if (! $case) {
            return response()->json(['message' => 'Case not found.'], 404);
        }

        return response()->json($case);
    }

    public function sessions(int $caseId): JsonResponse
    {
        return $this->caseRelationResponse($caseId, 'legalSessions');
    }

    public function procedures(int $caseId): JsonResponse
    {
        return $this->caseRelationResponse($caseId, 'procedures');
    }

    public function clients(int $caseId): JsonResponse
    {
        return $this->caseRelationResponse($caseId, 'clients');
    }

    public function services(int $caseId): JsonResponse
    {
        return $this->caseRelationResponse($caseId, 'services');
    }

    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'case_number' => ['nullable', 'string'],
            'from_date' => ['nullable', 'date'],
            'to_date' => ['nullable', 'date', 'after_or_equal:from_date'],
            'procedure_type' => ['nullable'],
            'session_type' => ['nullable'],
            'client_name' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ]);

        $query = LegCase::query();

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

        $cases = $query->with($this->defaultRelations())
            ->orderByDesc('created_at')
            ->get();

        return response()->json($cases);
    }

    private function caseRelationResponse(int $caseId, string $relation): JsonResponse
    {
        $case = LegCase::with($relation)->find($caseId);

        if (! $case) {
            return response()->json(['message' => 'Case not found.'], 404);
        }

        return response()->json($case->{$relation});
    }

    /**
     * @return array<int, string>
     */
    private function defaultRelations(): array
    {
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
}
