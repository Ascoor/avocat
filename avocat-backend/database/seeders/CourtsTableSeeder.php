<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourtsTableSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            ['id' => 1, 'name' => 'محكمة استئناف القاهرة', 'court_type_id' => 1, 'court_level_id' => 2],
            ['id' => 2, 'name' => 'محكمة استئناف الإسكندرية', 'court_type_id' => 1, 'court_level_id' => 2],
            ['id' => 3, 'name' => 'محكمة شمال القاهرة الابتدائية', 'court_type_id' => 1, 'court_level_id' => 3],
            ['id' => 4, 'name' => 'محكمة جنوب القاهرة الابتدائية', 'court_type_id' => 1, 'court_level_id' => 3],
        ];

        $rows = array_map(static function (array $row): array {
            return array_merge($row, [
                'office_id' => null,
                'is_system' => true,
                'updated_at' => now(),
            ]);
        }, $defaults);

        DB::table('courts')->upsert(
            $rows,
            ['id'],
            ['name', 'court_type_id', 'court_level_id', 'office_id', 'is_system', 'updated_at']
        );
    }
}
