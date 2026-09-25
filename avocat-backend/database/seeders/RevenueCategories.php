<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RevenueCategories extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $defaultCategories = ['أتعاب', 'غرامة', 'كفالة','أمانات'];

        foreach ($defaultCategories as $category) {
            DB::table('revenue_categories')->updateOrInsert(
                ['name' => $category],
                ['updated_at' => now()]
            );
        }
    }
}
