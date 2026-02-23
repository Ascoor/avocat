<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LegCase;
use App\Models\Service;
use App\Services\Finance\FinancialTransactionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function __construct(private readonly FinancialTransactionService $financialTransactionService)
    {
    }

    public function searchExpenses(Request $request): JsonResponse
    {
        $criteria = $request->all();

        if (! empty($criteria['identifier'])) {
            $legCase = LegCase::where('slug', $criteria['identifier'])->first();
            $service = Service::where('service_no', $criteria['identifier'])->first();

            if ($legCase) {
                $criteria['leg_case_id'] = $legCase->id;
            } elseif ($service) {
                $criteria['service_id'] = $service->id;
            } else {
                return response()->json(['message' => 'Identifier not found in leg_cases or services'], 404);
            }
        }

        $criteria['type'] = 'expense';
        $rows = $this->financialTransactionService->list($criteria);

        return response()->json([
            'filtered_expenses' => $rows->items(),
            'meta' => ['total' => $rows->total()],
        ]);
    }
}
