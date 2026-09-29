<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpenseCategories extends Seeder
{
        /**
         * Run the database seeds.
         *
         * @return void
         */
        public function run()
        {
            $defaultCategories = ['جلسة', 'إجراء', 'إعلان'];

            foreach ($defaultCategories as $category) {
                DB::table('expense_categories')->updateOrInsert(
                    ['name' => $category],
                    ['updated_at' => now()]
                );
            }
        }
    }
