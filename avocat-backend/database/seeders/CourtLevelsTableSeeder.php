<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourtLevelsTableSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            ['id' => 1, 'name' => 'نقض'],
            ['id' => 2, 'name' => 'إستئناف'],
            ['id' => 3, 'name' => 'إبتدائى'],
            ['id' => 4, 'name' => 'جزئي'],
        ];

        $rows = array_map(static function (array $row): array {
            return array_merge($row, [
                'office_id' => null,
                'is_system' => true,
                'updated_at' => now(),
            ]);
        }, $defaults);

        DB::table('court_levels')->upsert(
            $rows,
            ['id'],
            ['name', 'office_id', 'is_system', 'updated_at']
        );
    }
}
