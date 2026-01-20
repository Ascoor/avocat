<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppealSubTypesSeeder extends Seeder
{
    public function run()
    {
        $civilSubTypes = [
            ['appeal_type_id' => 1, 'appeal_sub_type' => 'الطعون المدنية'],
            ['appeal_type_id' => 1, 'appeal_sub_type' => 'الطعون الإيجارات'],
            ['appeal_type_id' => 1, 'appeal_sub_type' => 'الطعون العمالية'],
            ['appeal_type_id' => 1, 'appeal_sub_type' => 'الطعون التجارية'],
            ['appeal_type_id' => 1, 'appeal_sub_type' => 'الطعون الإقتصادية'],
            ['appeal_type_id' => 1, 'appeal_sub_type' => 'الطعون الأحوال الشخصية'],
            ['appeal_type_id' => 1, 'appeal_sub_type' => 'الهيئة العامة للمواد المدنية'],
        ];

          $criminalSubTypes = [
             ['appeal_type_id' => 2, 'appeal_sub_type' => 'الطعون الجنائية'],
              ['appeal_type_id' => 2, 'appeal_sub_type' => 'الجنح الإقتصادية'],
              ['appeal_type_id' => 2, 'appeal_sub_type' => 'الجنح الجنائية'],
              ['appeal_type_id' => 2, 'appeal_sub_type' => 'الطعون النقابات'],
              ['appeal_type_id' => 2, 'appeal_sub_type' => 'الهيئة العامة للمواد الجنائية'],
        ];

        // دمج القوائم وإدخالها في قاعدة البيانات
        DB::table('appeal_sub_types')->insert(array_merge($civilSubTypes, $criminalSubTypes));
    }
}
