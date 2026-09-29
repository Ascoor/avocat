<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpensesSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $serviceId = DB::table('services')->orderBy('id')->value('id');
        $caseId = DB::table('leg_cases')->orderBy('id')->value('id');
        $userId = DB::table('users')->orderBy('id')->value('id');
        $sessionId = DB::table('legal_sessions')->orderBy('id')->value('id');
        $categoryId = DB::table('expense_categories')->orderBy('id')->value('id');
        $clientId = DB::table('clients')->orderBy('id')->value('id');

        // If any required FK table is empty, stop safely
        if (!$serviceId || !$caseId || !$userId || !$sessionId || !$categoryId || !$clientId) {
            return;
        }

        $rows = [
            [
                'service_id' => $serviceId,
                'leg_case_id' => $caseId,
                'created_by' => $userId,
                'legal_session_id' => $sessionId,
                'expense_category_id' => $categoryId,
                'client_id' => $clientId,
                'unclients_id' => null,

                'description' => 'مصروفات جلسة',
                'note' => null,
                'expense_date' => $now->toDateString(),

                // JSON column: store as JSON string (safe) or array
                'amount' => json_encode(['value' => 150.00]),

                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        foreach ($rows as $row) {
            $identity = collect($row)->only([
                'service_id', 'leg_case_id', 'legal_session_id', 'expense_category_id',
                'client_id', 'description',
            ])->all();

            $query = DB::table('expenses');

            foreach ($identity as $column => $value) {
                $value === null
                    ? $query->whereNull($column)
                    : $query->where($column, $value);
            }

            $amount = json_decode($row['amount'], true, flags: JSON_THROW_ON_ERROR)['value'];
            $driver = DB::connection()->getDriverName();
            match ($driver) {
                'pgsql' => $query->whereRaw("(amount->>'value')::numeric = ?", [$amount]),
                'sqlite' => $query->whereRaw("CAST(json_extract(amount, '$.value') AS NUMERIC) = ?", [$amount]),
                'mysql', 'mariadb' => $query->whereRaw(
                    "CAST(JSON_UNQUOTE(JSON_EXTRACT(amount, '$.value')) AS DECIMAL(65, 10)) = ?",
                    [$amount]
                ),
                default => throw new \RuntimeException("Unsupported database driver [{$driver}] for expense JSON identity."),
            };

            if (! $query->exists()) {
                DB::table('expenses')->insert($row);
            }
        }
    }
}
