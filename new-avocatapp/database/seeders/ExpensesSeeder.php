<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpensesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('expenses')->insert([
            [
                'service_id' => 1,
                'leg_case_id' => 1,
                'created_by' => 1,
                'legal_session_id' => 1,
                'expense_category_id' => 1,
                'client_id' => 1,
                'unclients_id' => null,
                'description' => 'مصروفات جلسة',
                'note' => null,
                'expense_date' => $now->toDateString(),
                'amount' => json_encode(['value' => 150.00]),
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
