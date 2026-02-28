<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $this->backfillExpenses();
        $this->backfillEmbeddedCosts('procedures', 'App\\Models\\Procedure', 'created_at');
        $this->backfillEmbeddedCosts('legal_sessions', 'App\\Models\\LegalSession', 'session_date');
        $this->backfillEmbeddedCosts('legal_ads', 'App\\Models\\LegalAd', 'receive_date');
        $this->backfillRevenues();
        $this->backfillPayments();
    }

    public function down(): void
    {
        DB::table('financial_transactions')
            ->whereIn('source_type', [
                'App\\Models\\Expense',
                'App\\Models\\Procedure',
                'App\\Models\\LegalSession',
                'App\\Models\\LegalAd',
                'App\\Models\\Revenue',
                'App\\Models\\Payment',
            ])
            ->delete();
    }

    private function backfillExpenses(): void
    {
        DB::table('expenses')->orderBy('id')->chunkById(100, function ($rows): void {
            foreach ($rows as $row) {
                $amount = $this->normalizeAmount($row->amount);
                if ($amount <= 0) {
                    continue;
                }

                $this->upsertTransaction([
                    'type' => 'expense',
                    'amount' => $amount,
                    'occurred_at' => $row->expense_date,
                    'description' => $row->description,
                    'note' => $row->note,
                    'category_type' => 'expense',
                    'category_id' => $row->expense_category_id,
                    'leg_case_id' => $row->leg_case_id,
                    'service_id' => $row->service_id,
                    'source_type' => 'App\\Models\\Expense',
                    'source_id' => $row->id,
                    'created_by' => $row->created_by,
                    'metadata' => json_encode(['legacy_expense_id' => $row->id]),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        });
    }

    private function backfillEmbeddedCosts(string $table, string $sourceType, string $occurredColumn): void
    {
        DB::table($table)->orderBy('id')->chunkById(100, function ($rows) use ($sourceType, $occurredColumn): void {
            foreach ($rows as $row) {
                foreach (['cost1', 'cost2', 'cost3'] as $costField) {
                    $amount = (float) ($row->{$costField} ?? 0);
                    if ($amount <= 0) {
                        continue;
                    }

                    $this->upsertTransaction([
                        'type' => 'expense',
                        'amount' => $amount,
                        'occurred_at' => $row->{$occurredColumn} ?? $row->created_at,
                        'description' => sprintf('Backfilled %s from %s', $costField, $table),
                        'category_type' => 'expense',
                        'category_id' => 1,
                        'leg_case_id' => $row->leg_case_id ?? null,
                        'source_type' => $sourceType,
                        'source_id' => $row->id,
                        'created_by' => $row->created_by ?? null,
                        'metadata' => json_encode(['legacy_cost_field' => $costField]),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ], ['source_type', 'source_id', 'type', 'metadata']);
                }
            }
        });
    }

    private function backfillRevenues(): void
    {
        DB::table('revenues')->orderBy('id')->chunkById(100, function ($rows): void {
            foreach ($rows as $row) {
                $this->upsertTransaction([
                    'type' => 'revenue',
                    'amount' => $row->amount,
                    'occurred_at' => $row->created_at,
                    'description' => $row->description,
                    'category_type' => 'revenue',
                    'category_id' => $row->revenue_category_id,
                    'leg_case_id' => $row->leg_case_id,
                    'source_type' => 'App\\Models\\Revenue',
                    'source_id' => $row->id,
                    'created_by' => $row->created_by,
                    'updated_by' => $row->updated_by,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        });
    }

    private function backfillPayments(): void
    {
        DB::table('payments')->join('invoices', 'invoices.id', '=', 'payments.invoice_id')
            ->select('payments.*', 'invoices.leg_case_id', 'invoices.service_id')
            ->orderBy('payments.id')
            ->chunkById(100, function ($rows): void {
                foreach ($rows as $row) {
                    $this->upsertTransaction([
                        'type' => 'payment',
                        'amount' => $row->amount,
                        'occurred_at' => $row->payment_date,
                        'description' => 'Payment received',
                        'leg_case_id' => $row->leg_case_id,
                        'service_id' => $row->service_id,
                        'source_type' => 'App\\Models\\Payment',
                        'source_id' => $row->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }, 'payments.id');
    }

    private function upsertTransaction(array $data, array $identity = ['source_type', 'source_id', 'type']): void
    {
        DB::table('financial_transactions')->updateOrInsert(
            collect($data)->only($identity)->toArray(),
            $data
        );
    }

    private function normalizeAmount(mixed $rawAmount): float
    {
        if (is_numeric($rawAmount)) {
            return (float) $rawAmount;
        }

        if (is_string($rawAmount)) {
            $decoded = json_decode($rawAmount, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $rawAmount = $decoded;
            }
        }

        if (is_array($rawAmount)) {
            return (float) array_sum(array_map('floatval', $rawAmount));
        }

        return 0.0;
    }
};
