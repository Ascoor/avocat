<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppealTypeAndSubTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $appealTypes = [
            'المبادئ الجنائية' => [
                'الطعون الجنائية',
                'الجنح الإقتصادية',
                'الجنح الجنائية',
                'طعون النقابات',
                'الهيئة العامة للمواد الجنائية',
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
                'الهيئة العامة للمواد المدنية',
            ],
        ];

        foreach ($appealTypes as $type => $subTypes) {
            DB::table('appeal_types')->updateOrInsert(
                ['appeal_type' => $type],
                ['updated_at' => now(), 'created_at' => now()]
            );

            $typeId = DB::table('appeal_types')
                ->where('appeal_type', $type)
                ->value('id');

            foreach ($subTypes as $subType) {
                DB::table('appeal_sub_types')->updateOrInsert(
                    ['appeal_type_id' => $typeId, 'appeal_sub_type' => $subType],
                    ['updated_at' => now(), 'created_at' => now()]
                );
            }
        }
    }
}
