<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\Lawyer;
use App\Models\LegalAdType;
use App\Models\Court;
use App\Models\User;

class LegalAdsTableSeeder extends Seeder
{
    public function run()
    {
        // Truncate the table to remove any existing records
        DB::table('legal_ads')->truncate();

        $faker = Faker::create('ar_JO'); // Arabic Faker instance

        // Get all distinct leg_case_ids
        $legCases = \App\Models\LegCase::pluck('id')->toArray();

        // Pre-fetch random models for optimization
        $lawyers = Lawyer::inRandomOrder()->take(2)->get(); // Get 2 random lawyers
        $legalAdTypes = LegalAdType::inRandomOrder()->take(2)->get(); // Get 2 random legal ad types
        $courts = Court::inRandomOrder()->take(2)->get(); // Get 2 random courts
        $users = User::inRandomOrder()->take(2)->get(); // Get 2 random users

        foreach ($legCases as $legCaseId) {
            // Generate 2 legal ads for each leg_case_id
            for ($i = 0; $i < 2; $i++) {
                // Generate receive_date only within the last 2 years, or null
                $receiveDate = $faker->optional()->dateTimeBetween('-2 years', 'now');
                
                // Insert the legal ad data
                DB::table('legal_ads')->insert([
                    'description' => $faker->sentence(), // Description of the legal ad
                    'results' => null, // Default case result (empty)
                    'send_date' => $faker->dateTimeBetween('-30 years', 'now')->format('Y-m-d'), // Send date

                    // Format receive_date if available
                    'receive_date' => $receiveDate ? $receiveDate->format('Y-m-d') : null, 

                    'lawyer_send_id' => $lawyers[$i % 2]->id, // Random lawyer to send (alternate between two)
                    'legal_ad_type_id' => $legalAdTypes[$i % 2]->id, // Random ad type (alternate between two)
                    'lawyer_receive_id' => $lawyers[($i + 1) % 2]->id, // Alternate lawyer for receive
                    'status' => 'تم التسليم', // Default status
                    'leg_case_id' => $legCaseId, // LegCase ID
                    'court_id' => $courts[$i % 2]->id, // Random court (alternate between two)
                    'cost1' => $faker->randomFloat(2, 1000, 10000), // Cost 1
                    'cost2' => $faker->randomFloat(2, 1000, 10000), // Cost 2
                    'cost3' => $faker->randomFloat(2, 1000, 10000), // Cost 3
                    'created_by' => $users[$i % 2]->id, // Creator user (alternate)
                    'updated_by' => $users[($i + 1) % 2]->id, // Updater user (alternate)
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
