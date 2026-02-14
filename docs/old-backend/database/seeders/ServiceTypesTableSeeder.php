<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ServiceTypesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('service_types')->delete();
        
        \DB::table('service_types')->insert(array (
            0 => 
            array (
                'id' => 60,
                'name' => 'بنوك',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 62,
                'name' => 'شراء لوازم بناء',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 63,
                'name' => 'مصنعية',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 64,
                'name' => 'عداد كهرباء',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 65,
                'name' => 'عداد مياه',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            5 => 
            array (
                'id' => 66,
                'name' => 'شهادة جدول',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            6 => 
            array (
                'id' => 71,
                'name' => 'إستثنـــــاءات',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            7 => 
            array (
                'id' => 72,
                'name' => 'مكالمة عميل',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            8 => 
            array (
                'id' => 73,
                'name' => 'أعمال أدارية مطلوبة من جهات',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            9 => 
            array (
                'id' => 74,
                'name' => 'أجتماعات',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            10 => 
            array (
                'id' => 75,
                'name' => 'أعمال أدارية مطلوب تجهيزها داخليا',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            11 => 
            array (
                'id' => 76,
                'name' => 'إجراء',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            12 => 
            array (
                'id' => 77,
                'name' => 'تصوير',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            13 => 
            array (
                'id' => 78,
                'name' => 'صورة رسمية',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            14 => 
            array (
                'id' => 79,
                'name' => 'تراخيص',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            15 => 
            array (
                'id' => 80,
                'name' => 'تقديم طلب',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            16 => 
            array (
                'id' => 81,
                'name' => 'طلب كشف تحديد',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            17 => 
            array (
                'id' => 82,
                'name' => 'معاينة',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            18 => 
            array (
                'id' => 83,
                'name' => 'جلسة خبير',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            19 => 
            array (
                'id' => 84,
                'name' => 'أطلاع علي تقرير',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            20 => 
            array (
                'id' => 85,
                'name' => 'استعلام امني',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            21 => 
            array (
                'id' => 86,
                'name' => 'اخلاء سبيل',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            22 => 
            array (
                'id' => 87,
                'name' => 'اقسام',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            23 => 
            array (
                'id' => 88,
                'name' => 'مجالس محلية ومحافظة',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            24 => 
            array (
                'id' => 89,
                'name' => 'خدمة إدارية أخرى',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            25 => 
            array (
                'id' => 90,
                'name' => 'الكشف علي المستندات',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            26 => 
            array (
                'id' => 91,
                'name' => 'إستخراج أوراق',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            27 => 
            array (
                'id' => 92,
                'name' => 'صورة رسمية من حكم',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            28 => 
            array (
                'id' => 93,
                'name' => 'الكشف امنياً',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            29 => 
            array (
                'id' => 94,
                'name' => 'صورة ميكرو فيلم',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            30 => 
            array (
                'id' => 95,
                'name' => 'عقارات',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            31 => 
            array (
                'id' => 96,
                'name' => 'أعمال بناء',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));
        
        
    }
}