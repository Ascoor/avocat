<?php

namespace Database\Seeders;

use App\Models\Office;
use Illuminate\Database\Seeder;

class OfficesTableSeeder extends Seeder
{
    public function run(): void
    {
        Office::firstOrCreate(
            ['slug' => 'default-office'],
            ['name' => 'Default Office']
        );
    }
}
