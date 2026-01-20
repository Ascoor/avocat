<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LegalSessionTypesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        DB::table('legal_session_types')->delete();
        
        DB::table('legal_session_types')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'خبراء',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'تحقيق نيابة',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'محاكمة',
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'تجديد حبس',
            ),
        ));
        
        
    }
}