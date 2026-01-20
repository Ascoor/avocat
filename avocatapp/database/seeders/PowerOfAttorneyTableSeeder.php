<?php

namespace Database\Seeders;

use App\Models\PowerOfAttorney;
use Illuminate\Database\Seeder;

class PowerOfAttorneyTableSeeder extends Seeder
{
    public function run()
    {
        $powerOfAttorneyData = [
            [
                'id' => 1,
                'attorney_num' => 'محاماة ١٢٣٤',
                'attorney_date' => '2022-04-05',
                'attorney_chart' => 'الرياض',
                'attorney_place' => 'جدة',
                'title' => 'تفويض المحامي',
                'description' => 'تفويض المحامي للدفاع عن حقوقي في القضية',
                'client_id' => 1,
                'lawyer_insert' => 'محمد الشمري',
                'image' => 'attorney_image.png',
                'created_by' => 1,
                'updated_by' => null,
                'attorney_type_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'attorney_num' => 'محاماة ٥٦٧٨',
                'attorney_date' => '2022-04-06',
                'attorney_chart' => 'جدة',
                'attorney_place' => 'مكة',
                'title' => 'تفويض المحامي',
                'description' => null,
                'client_id' => 2,
                'lawyer_insert' => 'أحمد العيسى',
                'image' => null,
                'created_by' => 1,
                'updated_by' => null,
                'attorney_type_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($powerOfAttorneyData as $data) {
            PowerOfAttorney::create($data);
        }
    }
}
