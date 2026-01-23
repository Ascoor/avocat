<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RevenueSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        DB::table('revenues')->insert([
            [
                'leg_case_id' => 1,
                'revenue_category_id' => 1,
                'created_by' => 1,
                'updated_by' => null,
                'related_from' => null,
                'amount' => 250.50,
                'description' => 'الدفعة الأولى من الأتعاب',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'leg_case_id' => 2,
                'revenue_category_id' => 2,
                'created_by' => 1,
                'updated_by' => null,
                'related_from' => null,
                'amount' => 500.75,
                'description' => 'رسوم المحكمة',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'leg_case_id' => 2,
                'revenue_category_id' => 1,
                'created_by' => 1,
                'updated_by' => null,
                'related_from' => null,
                'amount' => 1000.00,
                'description' => 'الدفعة الأولى من الأتعاب',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
