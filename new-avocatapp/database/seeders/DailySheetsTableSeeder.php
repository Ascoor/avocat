<?php

namespace Database\Seeders;

use App\Models\DailySheet;
use Illuminate\Database\Seeder;

class DailySheetsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

                $dailySheets = [
                    [
                        'id' => 1,
                        'date' => '2022-03-05',
                        'lawyer_id' => 1,
                        'cost' => 100.50,
                        'over_cost' => 20.00,
                    ],
                    [
                        'id' => 2,
                        'date' => '2022-03-06',
                        'lawyer_id' => 2,
                        'cost' => 150.00,
                        'over_cost' => 25.50,
                    ],

                ];

                foreach ($dailySheets as $sheet) {
                    DailySheet::create($sheet);

                    $dailySheet1 = DailySheet::find(1);
                    $dailySheet1->sessions()->attach([1, 2]);
                    $dailySheet1->procedures()->attach([1, 2]);
                    $dailySheet1->leg_cases()->attach([1, 2]);
                }
            }
        }
