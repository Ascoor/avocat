<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Finance\StoreLedgerEntryRequest;
use App\Http\Resources\Finance\LedgerEntryResource;
use App\Services\Finance\FinancialTransactionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FinanceLedgerController extends Controller
{
    public function __construct(private readonly FinancialTransactionService $service)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $rows = $this->service->list($request->all());

        return response()->json([
            'data' => LedgerEntryResource::collection($rows),
            'meta' => [
                'current_page' => $rows->currentPage(),
                'per_page' => $rows->perPage(),
                'total' => $rows->total(),
            ],
        ]);
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

        return response()->json(['data' => new LedgerEntryResource($entry)], 201);
    }

    public function caseSummary(int $id): JsonResponse
    {
        return response()->json(['data' => $this->service->summarizeCase($id)]);
    }
}
