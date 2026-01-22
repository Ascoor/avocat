<?php

namespace Database\Seeders;

use App\Models\IncomeType;
use Illuminate\Database\Seeder;

class IncomeTypeSeeder extends Seeder
{
    public function run()
    {
        IncomeType::create([
            'name' => 'رسوم المحاماة',
            'description' => 'تشمل رسوم استشارية ورسوم التوكيل',
        ]);

        IncomeType::create([
            'name' => 'رسوم التسجيل',
            'description' => 'تشمل رسوم تسجيل العقود والوثائق الرسمية',
        ]);

        // Add more income types here
    }
}
