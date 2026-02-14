<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourtLevelsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

       DB::table('court_levels')->delete();
        
       DB::table('court_levels')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'نقض',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'إستئناف',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'إبتدائى',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'جزئي',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));
        
        
    }
}