<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RevenueSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $userId = DB::table('users')->value('id');
        $caseIds = DB::table('leg_cases')->pluck('id')->all();
        $catIds  = DB::table('revenue_categories')->pluck('id')->all();

        // Stop safely if prerequisites are missing
        if (!$userId || empty($caseIds) || empty($catIds)) {
            return;
        }

        $case1 = $caseIds[0];
        $case2 = $caseIds[min(1, count($caseIds) - 1)];

        $cat1 = $catIds[0];
        $cat2 = $catIds[min(1, count($catIds) - 1)];

        $rows = [
            [
                'leg_case_id' => $case1,
                'revenue_category_id' => $cat1,
                'created_by' => $userId,
                'updated_by' => $userId,
                'related_from' => 'client',
                'amount' => 250.50,
                'description' => 'الدفعة الأولى من الأتعاب',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'leg_case_id' => $case2,
                'revenue_category_id' => $cat2,
                'created_by' => $userId,
                'updated_by' => $userId,
                'related_from' => 'client',
                'amount' => 500.75,
                'description' => 'رسوم المحكمة',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'leg_case_id' => $case2,
                'revenue_category_id' => $cat1,
                'created_by' => $userId,
                'updated_by' => $userId,
                'related_from' => 'unclient',
                'amount' => 1000.00,
                'description' => 'الدفعة الأولى من الأتعاب',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        foreach ($rows as $row) {
            $identity = collect($row)->only([
                'leg_case_id', 'revenue_category_id', 'related_from', 'amount', 'description',
            ])->all();

            if (! DB::table('revenues')->where($identity)->exists()) {
                DB::table('revenues')->insert($row);
            }
        }
    }
}
