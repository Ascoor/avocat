<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class SearchDegreesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('search_degrees')->delete();
        
        \DB::table('search_degrees')->insert(array (
            0 => 
            array (
                'id' => 1,
                'degree_name' => 'نقض',
                'degree_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'degree_name' => 'استئناف',
                'degree_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'degree_name' => 'ابتدائى',
                'degree_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'degree_name' => 'جزئى',
                'degree_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));
        
        
    }
}