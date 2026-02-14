<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class LegalAdsTableSeeder extends Seeder
{
    public function run(): void
    {
        // Safer than truncate when FK exists
        DB::table('legal_ads')->delete();

        $faker = Faker::create('ar_JO');

        $legCaseIds = DB::table('leg_cases')->pluck('id')->all();
        if (empty($legCaseIds)) {
            return;
        }

        $lawyerIds = DB::table('lawyers')->pluck('id')->all();
        $legalAdTypeIds = DB::table('legal_ad_types')->pluck('id')->all();
        $courtIds = DB::table('courts')->pluck('id')->all();
        $userIds = DB::table('users')->pluck('id')->all();

        // لو أي جدول فاضي، نوقف seeder بدل ما يعلّق/يضرب errors
        if (empty($lawyerIds) || empty($legalAdTypeIds) || empty($courtIds) || empty($userIds)) {
            return;
        }

        $rows = [];
        foreach ($legCaseIds as $legCaseId) {
            for ($i = 0; $i < 2; $i++) {
                $receiveDate = $faker->optional()->dateTimeBetween('-2 years', 'now');

                $rows[] = [
                    'description' => $faker->sentence(),
                    'results' => null,
                    'send_date' => $faker->dateTimeBetween('-30 years', 'now')->format('Y-m-d'),
                    'receive_date' => $receiveDate ? $receiveDate->format('Y-m-d') : null,

                    'lawyer_send_id' => $lawyerIds[array_rand($lawyerIds)],
                    'lawyer_receive_id' => $lawyerIds[array_rand($lawyerIds)],
                    'legal_ad_type_id' => $legalAdTypeIds[array_rand($legalAdTypeIds)],
                    'court_id' => $courtIds[array_rand($courtIds)],

                    'status' => 'تم التسليم',
                    'leg_case_id' => $legCaseId,

                    'cost1' => $faker->randomFloat(2, 1000, 10000),
                    'cost2' => $faker->randomFloat(2, 1000, 10000),
                    'cost3' => $faker->randomFloat(2, 1000, 10000),

                    'created_by' => $userIds[array_rand($userIds)],
                    'updated_by' => $userIds[array_rand($userIds)],

                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // إدخال دفعات بدل insert داخل loop (أسرع جدًا)
        $chunkSize = 500;
        foreach (array_chunk($rows, $chunkSize) as $chunk) {
            DB::table('legal_ads')->insert($chunk);
        }
    }
}
