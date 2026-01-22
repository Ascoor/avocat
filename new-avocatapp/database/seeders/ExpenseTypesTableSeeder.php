<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpenseTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $expenseTypes = [
            [
                'name' => 'تكاليف المحاماة',
                'description' => 'تكاليف الخدمات القانونية المقدمة من المحامين',
            ],
            [
                'name' => 'تكاليف المحكمة',
                'description' => 'تكاليف الإجراءات القضائية والتحكيمية',
            ],
            // add more expense types as needed
        ];

        DB::table('expense_types')->insert($expenseTypes);
    }
}
