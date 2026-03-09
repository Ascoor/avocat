<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Seeder;

class CurrenciesSeeder extends Seeder
{
    public function run(): void
    {
        $currencies = [
            ['code' => 'EGP', 'symbol' => 'E£', 'name' => 'Egyptian Pound', 'name_ar' => 'جنيه مصري', 'name_en' => 'Egyptian Pound', 'sort_order' => 1],
            ['code' => 'USD', 'symbol' => '$', 'name' => 'US Dollar', 'name_ar' => 'دولار أمريكي', 'name_en' => 'US Dollar', 'sort_order' => 2],
            ['code' => 'SAR', 'symbol' => '﷼', 'name' => 'Saudi Riyal', 'name_ar' => 'ريال سعودي', 'name_en' => 'Saudi Riyal', 'sort_order' => 3],
            ['code' => 'AED', 'symbol' => 'د.إ', 'name' => 'UAE Dirham', 'name_ar' => 'درهم إماراتي', 'name_en' => 'UAE Dirham', 'sort_order' => 4],
            ['code' => 'EUR', 'symbol' => '€', 'name' => 'Euro', 'name_ar' => 'يورو', 'name_en' => 'Euro', 'sort_order' => 5],
        ];

        foreach ($currencies as $currency) {
            Currency::query()->updateOrCreate(
                ['code' => $currency['code']],
                [
                    ...$currency,
                    'is_active' => true,
                ],
            );
        }
    }
}
