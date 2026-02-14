<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpensesSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        // Safe with FK constraints
        DB::table('expenses')->delete();

        $serviceId = DB::table('services')->value('id');
        $caseId = DB::table('leg_cases')->value('id');
        $userId = DB::table('users')->value('id');
        $sessionId = DB::table('legal_sessions')->value('id');
        $categoryId = DB::table('expense_categories')->value('id');
        $clientId = DB::table('clients')->value('id');

        // If any required FK table is empty, stop safely
        if (!$serviceId || !$caseId || !$userId || !$sessionId || !$categoryId || !$clientId) {
            return;
        }

        DB::table('expenses')->insert([
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
        ]);
    }
}
