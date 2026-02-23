<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourtTypesTableSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            ['id' => 1, 'name' => 'مدنية'],
            ['id' => 2, 'name' => 'أسرة'],
            ['id' => 3, 'name' => 'جنائية'],
            ['id' => 4, 'name' => 'إدارية'],
            ['id' => 5, 'name' => 'إقتصادية'],
        ];

        $rows = array_map(static function (array $row): array {
            return array_merge($row, [
                'office_id' => null,
                'is_system' => true,
                'updated_at' => now(),
            ]);
        }, $defaults);

        DB::table('court_types')->upsert(
            $rows,
            ['id'],
            ['name', 'office_id', 'is_system', 'updated_at']
        );
    }
}
