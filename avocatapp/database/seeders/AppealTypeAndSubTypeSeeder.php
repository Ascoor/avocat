<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppealTypeAndSubTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // إضافة الأقسام الأساسية
        $appealTypes = [
            'المبادئ الجنائية' => [
                'الطعون الجنائية',
                'الجنح الإقتصادية',
                'الجنح الجنائية',
                'طعون النقابات',
                'الهيئة العامة للمواد الجنائية'
            ],
            'المبادئ المدنية' => [
                'جميع المبادئ المدنية',
                'البحث المتقدم',
                'الطعون المدنية',
                'طعون الإيجارات',
                'الطعون العمالية',
                'الطعون التجارية',
                'الطعون الإقتصادية',
                'طعون الأحوال الشخصية',
                'الهيئة العامة للمواد المدنية'
            ]
        ];

        foreach ($appealTypes as $type => $subTypes) {
            // إدراج نوع الطعن في جدول appeal_types
            DB::table('appeal_types')->insert(['type_name' => $type]);
            $typeId = DB::getPdo()->lastInsertId();

            // إدراج الأقسام الفرعية في جدول appeal_sub_types
            foreach ($subTypes as $subType) {
                DB::table('appeal_sub_types')->insert([
                    'sub_type_name' => $subType,
                    'appeal_type_id' => $typeId
                ]);
            }
        }
    }
    }

