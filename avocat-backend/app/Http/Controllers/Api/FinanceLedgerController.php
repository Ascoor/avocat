<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Finance\StoreLedgerEntryRequest;
use App\Http\Resources\Finance\LedgerEntryResource;
use App\Services\Finance\FinancialTransactionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FinanceLedgerController extends BaseApiController
{
    public function __construct(private readonly FinancialTransactionService $service)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $rows = $this->service->list($request->all());

        return $this->successResponse([
            'items' => LedgerEntryResource::collection($rows),
            'meta' => [
                'current_page' => $rows->currentPage(),
                'per_page' => $rows->perPage(),
                'total' => $rows->total(),
            ],
        ], 'Ledger entries retrieved successfully.');
    }

    public function store(StoreLedgerEntryRequest $request): JsonResponse
    {
        $entry = $this->service->create($request->validated() + [
            'created_by' => $request->user()?->id,
            'updated_by' => $request->user()?->id,
        ]);

        if ($entry->leg_case_id) {
            $this->service->syncCaseTotals((int) $entry->leg_case_id);
        }

        Log::info('audit.finance.ledger_entry_created', [
            'ledger_entry_id' => $entry->id,
            'type' => $entry->type,
            'actor_id' => $request->user()?->id,
            'leg_case_id' => $entry->leg_case_id,
            'amount' => $entry->amount,
        ]);

        return $this->successResponse(new LedgerEntryResource($entry), 'Ledger entry created successfully.', 201);
    }

    public function caseSummary(int $id): JsonResponse
    {
        return $this->successResponse($this->service->summarizeCase($id), 'Case summary retrieved successfully.');
    }
}
