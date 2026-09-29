<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppealTypesSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['المبادئ المدنية', 'المبادئ الجنائية'] as $appealType) {
            DB::table('appeal_types')->updateOrInsert(
                ['appeal_type' => $appealType],
                ['appeal_type' => $appealType]
            );
        }
    }
}
