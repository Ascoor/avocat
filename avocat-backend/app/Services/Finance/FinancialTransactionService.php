<?php

namespace App\Services\Finance;

use App\Models\FinancialTransaction;
use App\Models\Invoice;
use App\Models\LegCase;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class FinancialTransactionService
{
    public function list(array $filters): LengthAwarePaginator
    {
        $query = FinancialTransaction::query()->latest('occurred_at');

        foreach (['type', 'leg_case_id', 'service_id', 'category_type', 'category_id'] as $filter) {
            if (! empty($filters[$filter])) {
                $query->where($filter, $filters[$filter]);
            }
        }

        if (! empty($filters['from'])) {
            $query->whereDate('occurred_at', '>=', $filters['from']);
        }

        if (! empty($filters['to'])) {
            $query->whereDate('occurred_at', '<=', $filters['to']);
        }

        return $query->paginate((int) ($filters['per_page'] ?? 25));
    }

    public function create(array $data): FinancialTransaction
    {
        return FinancialTransaction::create($data);
    }

    public function summarizeCase(int $caseId): array
    {
        $transactions = FinancialTransaction::query()->where('leg_case_id', $caseId)->get();
        $invoiceTotal = Invoice::where('leg_case_id', $caseId)->sum('total_amount');
        $case = LegCase::find($caseId);
        $fees = (float) ($case?->fees ?? $invoiceTotal);

        $expenses = (float) $transactions->where('type', 'expense')->sum('amount');
        $revenues = (float) $transactions->where('type', 'revenue')->sum('amount');
        $paid = (float) $transactions->where('type', 'payment')->sum('amount');

        return [
            'leg_case_id' => $caseId,
            'expenses' => round($expenses, 2),
            'revenues' => round($revenues, 2),
            'paid' => round($paid, 2),
            'fees' => round($fees, 2),
            'outstanding' => round($fees - $paid, 2),
            'invoice_balance' => round($invoiceTotal - $paid, 2),
        ];
    }

    public function syncCaseTotals(int $caseId): void
    {
        $summary = $this->summarizeCase($caseId);

        LegCase::whereKey($caseId)->update([
            'total_expenses' => $summary['expenses'],
            'total_payments' => $summary['paid'],
        ]);
    }
}
