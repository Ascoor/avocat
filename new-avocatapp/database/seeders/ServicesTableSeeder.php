<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        DB::table('services')->delete();
        
        DB::table('services')->insert(array (
            0 => 
            array (
                'id' => 1,
                'slug' => '44',
                'description' => 'شهادة',
                'service_place_name' => 'محكمة الاستاد',
                'service_year' => '2017',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 90,
            ),
            1 => 
            array (
                'id' => 2,
                'slug' => '22',
                'description' => 'نينين',
                'service_place_name' => 'مجمع الاستاد',
                'service_year' => '2017',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 90,
            ),
            2 => 
            array (
                'id' => 3,
                'slug' => '146/2018',
                'description' => 'null',
                'service_place_name' => 'خدمات',
                'service_year' => '2017 -2018',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            3 => 
            array (
                'id' => 4,
                'slug' => '160',
                'description' => 'صحه توقيع',
                'service_place_name' => 'مجمع البحر',
                'service_year' => '2014',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            4 => 
            array (
                'id' => 5,
                'slug' => '288',
                'description' => 'null',
                'service_place_name' => 'التأمينات',
                'service_year' => '2017',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            5 => 
            array (
                'id' => 6,
                'slug' => '349',
                'description' => 'تنفيذ قرار إزالة',
                'service_place_name' => 'مركز شرطة السنبلاوين',
                'service_year' => '2016',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            6 => 
            array (
                'id' => 7,
                'slug' => '0034634',
                'description' => 'شهادة برتستو',
                'service_place_name' => 'null',
                'service_year' => 'null',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 91,
            ),
            7 => 
            array (
                'id' => 8,
                'slug' => '385',
                'description' => 'خالد الكيلاني',
                'service_place_name' => 'جنح السنبلاوين',
                'service_year' => '13834لسنه2016',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 92,
            ),
            8 => 
            array (
                'id' => 9,
                'slug' => '386',
                'description' => 'خالد الكيلاني',
                'service_place_name' => 'اداري السنبلاوين',
                'service_year' => '5730لسنه2016',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 92,
            ),
            9 => 
            array (
                'id' => 10,
                'slug' => '387',
                'description' => 'خالد الكيلاني',
                'service_place_name' => 'اداري السنبلاوين',
                'service_year' => '6286لسنه2016',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 92,
            ),
            10 => 
            array (
                'id' => 11,
                'slug' => '34/2019',
                'description' => 'null',
                'service_place_name' => 'طلخا',
                'service_year' => '2019',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            11 => 
            array (
                'id' => 12,
                'slug' => '391',
                'description' => 'تم تحرير عقد ايجار مزرعة دواجن',
                'service_place_name' => 'المكتب',
                'service_year' => '2017',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            12 => 
            array (
                'id' => 13,
                'slug' => '392',
                'description' => 'تحرير محضر اثبات حالة 4525 لسنة 2017',
                'service_place_name' => 'اقسام',
                'service_year' => '2017',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            13 => 
            array (
                'id' => 14,
                'slug' => '395',
                'description' => 'انقضاء بمضي المده جلسة 29/3/2017',
                'service_place_name' => 'null',
                'service_year' => '2017',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 93,
            ),
            14 => 
            array (
                'id' => 15,
                'slug' => '00435425123',
                'description' => 'null',
                'service_place_name' => 'المنصورة الابتدائيه',
                'service_year' => '5321لسنه2016',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 94,
            ),
            15 => 
            array (
                'id' => 16,
                'slug' => '004637683',
                'description' => 'null',
                'service_place_name' => 'المنصورة الابتدائيه',
                'service_year' => '5321لسنه2016',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 94,
            ),
            16 => 
            array (
                'id' => 17,
                'slug' => '247',
                'description' => 'صحه ونفاذ',
                'service_place_name' => 'الشهر العقاري',
                'service_year' => '2017',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            17 => 
            array (
                'id' => 18,
                'slug' => '408',
                'description' => 'استخراج شهادة برتستو وشهادة عدم افلاس',
                'service_place_name' => 'المحكمة الاقتصادية - محكمة قسم ثان المنصورة',
                'service_year' => '2017',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            18 => 
            array (
                'id' => 19,
                'slug' => '411',
                'description' => 'استخراج عدادين كهرباء برج جرين لازا',
                'service_place_name' => 'الكهرباء والمياه',
                'service_year' => '2017',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 95,
            ),
            19 => 
            array (
                'id' => 21,
                'slug' => '427',
                'description' => 'محضر فقد لوحات',
                'service_place_name' => 'اقسام',
                'service_year' => '6157 لسنة 2017',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            20 => 
            array (
                'id' => 22,
                'slug' => '456',
                'description' => 'استخراج رخصة صرف ومقاولات بناء',
                'service_place_name' => 'عمارة الزعفران',
                'service_year' => '2017',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 96,
            ),
            21 => 
            array (
                'id' => 23,
                'slug' => '458',
                'description' => 'null',
                'service_place_name' => 'شركة المياة',
                'service_year' => '2017',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 79,
            ),
            22 => 
            array (
                'id' => 24,
                'slug' => '005464',
                'description' => 'null',
                'service_place_name' => '--',
                'service_year' => '2016',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            23 => 
            array (
                'id' => 25,
                'slug' => '54/2018',
                'description' => 'null',
                'service_place_name' => 'عدادات الزعفران مياه-كهربا',
                'service_year' => '2018',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 95,
            ),
            24 => 
            array (
                'id' => 26,
                'slug' => '0043543',
                'description' => 'null',
                'service_place_name' => 'السجل-الجوازات',
                'service_year' => '2018',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            25 => 
            array (
                'id' => 27,
                'slug' => '541',
                'description' => 'حساب أحمد البلقاسي ومحمد البلقاسي',
            'service_place_name' => 'عمارة مكرم عبيد(البلقاسي)',
                'service_year' => '2018',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 95,
            ),
            26 => 
            array (
                'id' => 28,
                'slug' => '85/2018',
                'description' => 'null',
                'service_place_name' => 'شقه المرور',
                'service_year' => '2018',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            27 => 
            array (
                'id' => 29,
                'slug' => '86/2018',
                'description' => 'null',
                'service_place_name' => 'تراخيص سيارات',
                'service_year' => 'null',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            28 => 
            array (
                'id' => 30,
                'slug' => '92/2018',
                'description' => 'null',
                'service_place_name' => '---',
                'service_year' => '2018',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            29 => 
            array (
                'id' => 31,
                'slug' => '37/2021',
                'description' => '105006450',
                'service_place_name' => 'بنك العقاري العربي',
                'service_year' => '105006450',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 60,
            ),
            30 => 
            array (
                'id' => 32,
                'slug' => '00432',
                'description' => 'null',
                'service_place_name' => 'عداد الدور التاني عشر',
                'service_year' => 'null',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            31 => 
            array (
                'id' => 33,
                'slug' => '98/2022',
                'description' => 'براءه ذمه',
                'service_place_name' => 'براءه ذمه',
                'service_year' => '2022',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 89,
            ),
            32 => 
            array (
                'id' => 34,
                'slug' => '005345435',
                'description' => 'عماره جرين بلازا',
                'service_place_name' => 'عدادات جرين بلازا',
                'service_year' => '2021',
                'created_by' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
                'status' => 'منتهية',
                'service_type_id' => 95,
            ),
        ));
        
        
    }
}