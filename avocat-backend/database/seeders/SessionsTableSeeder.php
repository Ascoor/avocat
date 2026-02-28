<?php

namespace Database\Seeders;

use App\Models\LegalSession;
use App\Models\LegCase;
use App\Models\Court;
use App\Models\Lawyer;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class SessionsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('ar_EG');

        $legCases = LegCase::pluck('id');
        $courts = Court::pluck('id');
        $lawyers = Lawyer::pluck('id');
        $users = User::pluck('id');

        for ($i = 0; $i < 100; $i++) {
            LegalSession::create([
                'leg_case_id' => $legCases->random(),
                'court_id' => $courts->random(),
                'date' => $faker->date,
                'roll_number' => $faker->numerify('######'),
                'cost' => $faker->randomFloat(2, 1000, 10000),
                'status' => $faker->randomElement(['منتهي', 'لم ينفذ', 'قيد التنفيذ']),
                'lawyer_id' => $lawyers->random(),
                'orders' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'result' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'created_by' => $users->random(),
            ]);
        }
    }
}
