<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttorneyTypesTableSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            'التفويض العام',
            'التفويض الخاص',
            'التفويض للإجراءات القضائية',
        ];

        foreach ($types as $name) {
            $existingId = DB::table('attorney_types')
                ->whereRaw('LOWER(name) = LOWER(?)', [$name])
                ->value('id');

            if ($existingId === null) {
                DB::table('attorney_types')->insert(['name' => $name]);
            } else {
                DB::table('attorney_types')->where('id', $existingId)->update(['name' => $name]);
            }
        }
    }
}
