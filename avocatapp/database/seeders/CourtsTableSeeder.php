<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourtsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        DB::table('courts')->delete();
        
        DB::table('courts')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'محكمة استئناف القاهرة',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'محكمة إستئناف الاسكندرية',
                'court_type_id' => 1,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'محكمة أستئناف المنصورة',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'محكمة أستئناف طنطا',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'محكمة استئناف الاسماعيلية',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'محكمة استئناف اسيوط',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            6 => 
            array (
                'id' => 7,
                'name' => 'محكمة إستئناف قنا',
                'court_type_id' => 1,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            7 => 
            array (
                'id' => 8,
                'name' => 'مامورية استئناف مطروح',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            8 => 
            array (
                'id' => 9,
                'name' => 'مامورية استئناف بورسعيد',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            9 => 
            array (
                'id' => 10,
                'name' => 'مامورية استئناف السويس',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            10 => 
            array (
                'id' => 11,
                'name' => 'مامورية استئناف التل الكبير',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            11 => 
            array (
                'id' => 12,
                'name' => 'مامورية استئناف الطور',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            12 => 
            array (
                'id' => 13,
                'name' => 'محكمة استئناف اسرة الاسماعليلية',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            13 => 
            array (
                'id' => 14,
                'name' => 'مامورية استئناف اسرة بورسعيد',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            14 => 
            array (
                'id' => 15,
                'name' => 'ماموريه استئناف الفيوم',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            15 => 
            array (
                'id' => 16,
                'name' => 'مامورية استئناف البحر الاحمر',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            16 => 
            array (
                'id' => 18,
                'name' => 'محكمة إستئناف شمال القاهرة',
                'court_type_id' => 2,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            17 => 
            array (
                'id' => 19,
                'name' => 'ماموريه استئناف التجمع لشئون الاسره',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            18 => 
            array (
                'id' => 20,
                'name' => 'ماموريه استئناف المحله',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            19 => 
            array (
                'id' => 21,
                'name' => 'ماموريه استئناف دمياط',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            20 => 
            array (
                'id' => 22,
                'name' => 'ماموريه استئناف الزقازيق',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            21 => 
            array (
                'id' => 23,
                'name' => 'مأموريه استئناف دمنهور',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            22 => 
            array (
                'id' => 24,
                'name' => 'محكمة شمال القاهرة الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            23 => 
            array (
                'id' => 25,
                'name' => 'محكمة جنوب القاهرة الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            24 => 
            array (
                'id' => 26,
                'name' => 'محكمة شمال الجيزة الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            25 => 
            array (
                'id' => 27,
                'name' => 'محكمة شرق اسكندرية الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            26 => 
            array (
                'id' => 28,
                'name' => 'محكمة شمال دمنهور الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            27 => 
            array (
                'id' => 29,
                'name' => 'محكمة غرب طنطا الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            28 => 
            array (
                'id' => 30,
                'name' => 'محكمة الاسماعيلية الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            29 => 
            array (
                'id' => 31,
                'name' => 'محكمة جنوب الزقازيق الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            30 => 
            array (
                'id' => 32,
                'name' => 'محكمة جنوب المنصورة الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            31 => 
            array (
                'id' => 33,
                'name' => 'محكمة السويس الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            32 => 
            array (
                'id' => 35,
                'name' => 'محكمة شمال بنها الأبتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            33 => 
            array (
                'id' => 36,
                'name' => 'محكمة شبين الكوم الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            34 => 
            array (
                'id' => 37,
                'name' => 'محكمة الفيوم الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            35 => 
            array (
                'id' => 38,
                'name' => 'محكمة بنى سويف الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            36 => 
            array (
                'id' => 39,
                'name' => 'محكمة المنيا الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            37 => 
            array (
                'id' => 40,
                'name' => 'محكمة سوهاج الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            38 => 
            array (
                'id' => 41,
                'name' => 'محكمة شمال سيناء الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            39 => 
            array (
                'id' => 42,
                'name' => 'محكمة جنوب سيناء الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            40 => 
            array (
                'id' => 43,
                'name' => 'محكمة حلوان الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            41 => 
            array (
                'id' => 44,
                'name' => 'محكمة القاهرة الجديدة الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            42 => 
            array (
                'id' => 45,
                'name' => 'محكمة جنوب الجيزة الإبتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            43 => 
            array (
                'id' => 46,
                'name' => 'محكمة جنوب بنها الأبتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            44 => 
            array (
                'id' => 47,
                'name' => 'محكمة شمال الزقازيق الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            45 => 
            array (
                'id' => 48,
                'name' => 'محكمة غرب اسكندرية الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            46 => 
            array (
                'id' => 49,
                'name' => 'محكمة مرسى مطروح الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            47 => 
            array (
                'id' => 50,
                'name' => 'محكمة شرق طنطا الأبتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            48 => 
            array (
                'id' => 51,
                'name' => 'محكمة بورسعيد الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            49 => 
            array (
                'id' => 52,
                'name' => 'محكمة البحر الاحمر الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            50 => 
            array (
                'id' => 53,
                'name' => 'محكمة الوادى الجديد الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            51 => 
            array (
                'id' => 54,
                'name' => 'محكمة المنتزة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            52 => 
            array (
                'id' => 55,
                'name' => 'محكمة العطارين الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            53 => 
            array (
                'id' => 56,
                'name' => 'محكمة الرمل الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            54 => 
            array (
                'id' => 57,
                'name' => 'محكمة محرم بك الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            55 => 
            array (
                'id' => 58,
                'name' => 'محكمة الدخيلة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            56 => 
            array (
                'id' => 59,
                'name' => 'محكمة العامرية الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            57 => 
            array (
                'id' => 60,
                'name' => 'محكمة برج العرب الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            58 => 
            array (
                'id' => 61,
                'name' => 'محكمة المنشية الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            59 => 
            array (
                'id' => 63,
                'name' => 'محكمة كرموز الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            60 => 
            array (
                'id' => 64,
                'name' => 'محكمة مينا البصل الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            61 => 
            array (
                'id' => 65,
                'name' => 'محكمة الجمرك الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            62 => 
            array (
                'id' => 66,
                'name' => 'محكمة باب شرقى الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            63 => 
            array (
                'id' => 67,
                'name' => 'محكمة حوش عيسى الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            64 => 
            array (
                'id' => 68,
                'name' => 'محكمة بندر دمنهور الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            65 => 
            array (
                'id' => 69,
                'name' => 'محكمة الوايلى الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            66 => 
            array (
                'id' => 70,
                'name' => 'محكمة الازبكية الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            67 => 
            array (
                'id' => 71,
                'name' => 'محكمة شبرا الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            68 => 
            array (
                'id' => 72,
                'name' => 'محكمة الزيتون الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            69 => 
            array (
                'id' => 73,
                'name' => 'محكمة مصر الجديدة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            70 => 
            array (
                'id' => 74,
                'name' => 'محكمة مدينة نصرالجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            71 => 
            array (
                'id' => 75,
                'name' => 'محكمة بولاق الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            72 => 
            array (
                'id' => 76,
                'name' => 'محكمة روض الفرج الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            73 => 
            array (
                'id' => 77,
                'name' => 'المحكمة التجارية الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            74 => 
            array (
                'id' => 78,
                'name' => 'محكمة عين شمس الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            75 => 
            array (
                'id' => 79,
                'name' => 'محكمة الشرابية الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            76 => 
            array (
                'id' => 80,
                'name' => 'محكمة القاهرة الجديدة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            77 => 
            array (
                'id' => 81,
                'name' => 'محكمة المطريةالجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            78 => 
            array (
                'id' => 82,
                'name' => 'محكمة المرج الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            79 => 
            array (
                'id' => 83,
                'name' => 'محكمة السلام الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            80 => 
            array (
                'id' => 84,
                'name' => 'محكمة الدرب الاحمر الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            81 => 
            array (
                'id' => 85,
                'name' => 'محكمة الخليفة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            82 => 
            array (
                'id' => 86,
                'name' => 'محكمة مصر القديمة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            83 => 
            array (
                'id' => 87,
                'name' => 'محكمة السيدة زينب الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            84 => 
            array (
                'id' => 88,
                'name' => 'محكمة باب الشعريةالجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            85 => 
            array (
                'id' => 89,
                'name' => 'محكمة الموسكى الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            86 => 
            array (
                'id' => 90,
                'name' => 'محكمة الامور المستعجلة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            87 => 
            array (
                'id' => 91,
                'name' => 'محكمة الجمالية الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            88 => 
            array (
                'id' => 92,
                'name' => 'محكمة المعادى الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            89 => 
            array (
                'id' => 93,
                'name' => 'محكمة عابدين الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            90 => 
            array (
                'id' => 94,
                'name' => 'محكمة حلوان الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            91 => 
            array (
                'id' => 95,
                'name' => 'محكمة التبين و15 مايوالجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            92 => 
            array (
                'id' => 96,
                'name' => 'محكمة بندر امبابة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            93 => 
            array (
                'id' => 97,
                'name' => 'محكمة الدقى الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            94 => 
            array (
                'id' => 98,
                'name' => 'محكمة العجوزة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            95 => 
            array (
                'id' => 99,
                'name' => 'محكمة الوراق الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            96 => 
            array (
                'id' => 100,
                'name' => 'محكمة كرداسة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            97 => 
            array (
                'id' => 101,
                'name' => 'محكمة اوسيم الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            98 => 
            array (
                'id' => 102,
                'name' => 'محكمة مركز امبابة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            99 => 
            array (
                'id' => 103,
                'name' => 'محكمة العمرانية الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            100 => 
            array (
                'id' => 104,
                'name' => 'محكمة الهرم الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            101 => 
            array (
                'id' => 105,
                'name' => 'محكمة 6 اكتوبرالجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            102 => 
            array (
                'id' => 106,
                'name' => 'محكمة البدرشين الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            103 => 
            array (
                'id' => 107,
                'name' => 'محكمة الصف الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            104 => 
            array (
                'id' => 108,
                'name' => 'مأمورية الصف الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            105 => 
            array (
                'id' => 109,
                'name' => 'محكمة بندر الاسماعيلية الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            106 => 
            array (
                'id' => 110,
                'name' => 'محكمة مركزالاسماعيلية الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            107 => 
            array (
                'id' => 111,
                'name' => 'محكمة التل الكبير الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            108 => 
            array (
                'id' => 112,
                'name' => 'محكمة فايد الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            109 => 
            array (
                'id' => 113,
                'name' => 'محكمة القنطرة غرب الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            110 => 
            array (
                'id' => 114,
                'name' => 'محكمة قنطرة شرق الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            111 => 
            array (
                'id' => 115,
                'name' => 'محكمة بندر الزقازيق الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            112 => 
            array (
                'id' => 116,
                'name' => 'محكمة مركزالزقازيق الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            113 => 
            array (
                'id' => 117,
                'name' => 'محكمة ههيا الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            114 => 
            array (
                'id' => 118,
                'name' => 'محكمة الحسينيةالجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            115 => 
            array (
                'id' => 119,
                'name' => 'محكمة شرم الشيخ الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            116 => 
            array (
                'id' => 120,
                'name' => 'محكمة بندر الجيزة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            117 => 
            array (
                'id' => 121,
                'name' => 'مأمورية أبشوى الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            118 => 
            array (
                'id' => 122,
                'name' => 'مأمورية طامية الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            119 => 
            array (
                'id' => 123,
                'name' => 'محكمة سنورس الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            120 => 
            array (
                'id' => 124,
                'name' => 'محكمة بندر الفيوم الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            121 => 
            array (
                'id' => 125,
                'name' => 'محكمة مركز الفيوم الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            122 => 
            array (
                'id' => 126,
                'name' => 'محكمة اطسا الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            123 => 
            array (
                'id' => 127,
                'name' => 'محكمة ابشواى الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            124 => 
            array (
                'id' => 128,
                'name' => 'محكمة طامية الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            125 => 
            array (
                'id' => 129,
                'name' => 'محكمة الاربعين الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            126 => 
            array (
                'id' => 130,
                'name' => 'محكمة اللبان الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            127 => 
            array (
                'id' => 131,
                'name' => 'محكمة مرسى مطروح الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            128 => 
            array (
                'id' => 132,
                'name' => 'محكمة ابو تيج الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            129 => 
            array (
                'id' => 133,
                'name' => 'محكمة التنفيذ الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            130 => 
            array (
                'id' => 134,
                'name' => 'محكمة مركز دمنهور الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            131 => 
            array (
                'id' => 135,
                'name' => 'محكمة حوش عيسى الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            132 => 
            array (
                'id' => 136,
                'name' => 'محكمة بندر شبين الكوم الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            133 => 
            array (
                'id' => 137,
                'name' => 'محكمة زفتى الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            134 => 
            array (
                'id' => 138,
                'name' => 'محكمة الوسطى الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            135 => 
            array (
                'id' => 139,
                'name' => 'محكمة أول طنطا الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            136 => 
            array (
                'id' => 140,
                'name' => 'محكمة التنفيذ غرب الاسكندرية الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            137 => 
            array (
                'id' => 141,
                'name' => 'المحكمة التجارية الجزئية غرب اسكندرية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            138 => 
            array (
                'id' => 142,
                'name' => 'محكمة شبين القناطر الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            139 => 
            array (
                'id' => 143,
                'name' => 'محكمة ميناء بورسعيد الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            140 => 
            array (
                'id' => 144,
                'name' => 'محكمة بندر كفر الشيخ الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            141 => 
            array (
                'id' => 145,
                'name' => 'محكمة جنح الضواحى الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            142 => 
            array (
                'id' => 146,
                'name' => 'محكمة طوخ الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            143 => 
            array (
                'id' => 147,
                'name' => 'محكمة مركز كفر الشيخ الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            144 => 
            array (
                'id' => 148,
                'name' => 'محكمة بندر بنها الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            145 => 
            array (
                'id' => 149,
                'name' => 'محكمة مركز بنها الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            146 => 
            array (
                'id' => 150,
                'name' => 'محكمة ثانى طنطا الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            147 => 
            array (
                'id' => 151,
                'name' => 'محكمة مركز طنطا الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            148 => 
            array (
                'id' => 152,
                'name' => 'محكمة السنطة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            149 => 
            array (
                'id' => 153,
                'name' => 'محكمة السنطة الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            150 => 
            array (
                'id' => 154,
                'name' => 'محكمة كفر الزيات الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            151 => 
            array (
                'id' => 155,
                'name' => 'محكمة كفر الزيات الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            152 => 
            array (
                'id' => 156,
                'name' => 'محكمة بسيون الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            153 => 
            array (
                'id' => 157,
                'name' => 'محكمة زفتى الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            154 => 
            array (
                'id' => 158,
                'name' => 'محكمة الغردقة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            155 => 
            array (
                'id' => 159,
                'name' => 'محكمة التل الكبير الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            156 => 
            array (
                'id' => 160,
                'name' => 'محكمة الطور الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            157 => 
            array (
                'id' => 161,
                'name' => 'محكمة الخانكة الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            158 => 
            array (
                'id' => 162,
                'name' => 'محكمة العريش الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            159 => 
            array (
                'id' => 163,
                'name' => 'محكمة السويس الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            160 => 
            array (
                'id' => 164,
                'name' => 'محكمة شرم الشيخ الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            161 => 
            array (
                'id' => 165,
                'name' => 'محكمة راس سدر الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            162 => 
            array (
                'id' => 166,
                'name' => 'محكمة بورسعيد الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            163 => 
            array (
                'id' => 167,
                'name' => 'محكمة ناصر الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            164 => 
            array (
                'id' => 168,
                'name' => 'محكمة اهناسيا الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            165 => 
            array (
                'id' => 169,
                'name' => 'محكمة الداخلة الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            166 => 
            array (
                'id' => 170,
                'name' => 'محكمة الداخلة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            167 => 
            array (
                'id' => 171,
                'name' => 'محكمة الخارجة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            168 => 
            array (
                'id' => 172,
                'name' => 'محكمة نصر النوبة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            169 => 
            array (
                'id' => 173,
                'name' => 'محكمة دراو الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            170 => 
            array (
                'id' => 174,
                'name' => 'محكمة السلوم الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            171 => 
            array (
                'id' => 175,
                'name' => 'محكمة نويبع الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            172 => 
            array (
                'id' => 176,
                'name' => 'محكمة العلمين الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            173 => 
            array (
                'id' => 177,
                'name' => 'محكمة الفشن الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            174 => 
            array (
                'id' => 178,
                'name' => 'محكمة اخميم الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            175 => 
            array (
                'id' => 179,
                'name' => 'محكمة اخميم الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            176 => 
            array (
                'id' => 180,
                'name' => 'محكمة مركز سوهاج الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            177 => 
            array (
                'id' => 181,
                'name' => 'محكمة بندر سوهاج الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            178 => 
            array (
                'id' => 182,
                'name' => 'محكمة بندر بنى سويف الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            179 => 
            array (
                'id' => 183,
                'name' => 'محكمة ابوتيج الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            180 => 
            array (
                'id' => 184,
                'name' => 'محكمة سمسطا الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            181 => 
            array (
                'id' => 185,
                'name' => 'محكمة مركز المنيا الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            182 => 
            array (
                'id' => 186,
                'name' => 'محكمة مركز بنى سويف الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            183 => 
            array (
                'id' => 187,
                'name' => 'محكمة سمالوط الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            184 => 
            array (
                'id' => 188,
                'name' => 'محكمة بنى مزار الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            185 => 
            array (
                'id' => 189,
                'name' => 'محكمة مغاغة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            186 => 
            array (
                'id' => 190,
                'name' => 'محكمة مغاغة الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            187 => 
            array (
                'id' => 191,
                'name' => 'محكمة ملوى الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            188 => 
            array (
                'id' => 192,
                'name' => 'محكمة منوف الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            189 => 
            array (
                'id' => 193,
                'name' => 'محكمة قويسنا الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            190 => 
            array (
                'id' => 194,
                'name' => 'محكمة مركز شبين الكوم الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            191 => 
            array (
                'id' => 195,
                'name' => 'محكمة قسم ثانى المنصورة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            192 => 
            array (
                'id' => 196,
                'name' => 'محكمة قسم أول المنصورة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            193 => 
            array (
                'id' => 197,
                'name' => 'محكمة مركز المنصورة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            194 => 
            array (
                'id' => 198,
                'name' => 'محكمة الخانكة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            195 => 
            array (
                'id' => 199,
                'name' => 'محكمة شبرا الخيمة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            196 => 
            array (
                'id' => 200,
                'name' => 'محكمة دسوق الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            197 => 
            array (
                'id' => 201,
                'name' => 'محكمة قليوب الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            198 => 
            array (
                'id' => 202,
                'name' => 'محكمة بندر المنيا الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            199 => 
            array (
                'id' => 203,
                'name' => 'محكمة راس غارب الجزئيه',
                'court_type_id' => 3,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            200 => 
            array (
                'id' => 204,
                'name' => 'محكمة القصير الجزئيه',
                'court_type_id' => 3,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            201 => 
            array (
                'id' => 205,
                'name' => 'مامورية سفاجا الكلية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            202 => 
            array (
                'id' => 206,
                'name' => 'محكمة دمياط الجديدة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            203 => 
            array (
                'id' => 207,
                'name' => 'محكمة العبور الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            204 => 
            array (
                'id' => 208,
                'name' => 'جنح مستأنف البحر الاحمر',
                'court_type_id' => 3,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            205 => 
            array (
                'id' => 209,
                'name' => 'محكمة جنح الغردقة الجزئية',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            206 => 
            array (
                'id' => 213,
                'name' => 'محكمة أسرة بورسعيد',
                'court_type_id' => 2,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            207 => 
            array (
                'id' => 225,
                'name' => 'محكمة جنح مستأنف دمياط',
                'court_type_id' => 3,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            208 => 
            array (
                'id' => 226,
                'name' => 'محكمة جنح مستأنف جنوب المنصورة',
                'court_type_id' => 3,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            209 => 
            array (
                'id' => 230,
                'name' => 'محكمة جنح مستانف ثان المنصورة ',
                'court_type_id' => 3,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            210 => 
            array (
                'id' => 232,
                'name' => 'محكمة مدني كلي',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            211 => 
            array (
                'id' => 233,
                'name' => 'محكمة مدني كلي اسكندرية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            212 => 
            array (
                'id' => 234,
                'name' => 'محكمة مدني مستأنف بلقاس',
                'court_type_id' => 1,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            213 => 
            array (
                'id' => 236,
                'name' => 'محكمة جنح السنبلاوين',
                'court_type_id' => 3,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            214 => 
            array (
                'id' => 237,
                'name' => 'محكمة المنصورة الإبتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            215 => 
            array (
                'id' => 238,
                'name' => 'محكمة دكرنس الجزئية المنصورة الإبتدائية',
                'court_type_id' => 1,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            216 => 
            array (
                'id' => 239,
                'name' => 'محكمة المنصورة الإبتدائية د/3 ايجارات',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            217 => 
            array (
                'id' => 240,
                'name' => 'محكمة دكرنس الإبتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            218 => 
            array (
                'id' => 242,
                'name' => 'محكمة حلوان الإبتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            219 => 
            array (
                'id' => 243,
                'name' => 'محكمة جنج مستأنف ثان المنصورة',
                'court_type_id' => 3,
                'court_level_id' => 2,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            220 => 
            array (
                'id' => 244,
            'name' => 'محكمة حلوان محكمة المنصورة الإبتدائية (محكمة المنصورة الإبتدائية) - القاهرة',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            221 => 
            array (
                'id' => 246,
                'name' => 'محكمة جنح ميت غمر',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            222 => 
            array (
                'id' => 248,
                'name' => 'محكمة جنح قسم أول المنصورة الجزئية',
                'court_type_id' => 1,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            223 => 
            array (
                'id' => 253,
                'name' => 'Empty',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            224 => 
            array (
                'id' => 259,
                'name' => 'محكمة أول المنتزة الجزئية',
                'court_type_id' => 1,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            225 => 
            array (
                'id' => 261,
                'name' => 'مدني كلي الاسكندريه',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            226 => 
            array (
                'id' => 263,
                'name' => 'محكمة جنح تان المنصورة الجزئية',
                'court_type_id' => 1,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            227 => 
            array (
                'id' => 264,
                'name' => 'نيابه أول المنصورة',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            228 => 
            array (
                'id' => 265,
                'name' => 'مجلس الدوله -الدقي',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            229 => 
            array (
                'id' => 266,
                'name' => 'ايجارات تان المنصورة',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            230 => 
            array (
                'id' => 267,
                'name' => 'المحكمة الإبتدائية',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            231 => 
            array (
                'id' => 268,
                'name' => 'مركز المنصورة',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            232 => 
            array (
                'id' => 269,
                'name' => 'شرعي دكرنس',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            233 => 
            array (
                'id' => 270,
                'name' => 'مدني مستأنف بلقاس',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            234 => 
            array (
                'id' => 272,
                'name' => 'جنايات أولاد صقر',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            235 => 
            array (
                'id' => 273,
                'name' => 'السويس',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            236 => 
            array (
                'id' => 274,
                'name' => 'محكمة جنح أول وتان المنصورة الجزئية',
                'court_type_id' => 1,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            237 => 
            array (
                'id' => 275,
                'name' => 'محكمة كفر الشيخ الابتدائية',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            238 => 
            array (
                'id' => 277,
                'name' => 'محكمة جنح مستانف تان المنصورة',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            239 => 
            array (
                'id' => 279,
                'name' => 'محكمة جنح ا جا الجزئية',
                'court_type_id' => 1,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            240 => 
            array (
                'id' => 283,
                'name' => 'محكمة جنح المنتزه الجزئية',
                'court_type_id' => 1,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            241 => 
            array (
                'id' => 286,
                'name' => 'امن دوله طوارئ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            242 => 
            array (
                'id' => 287,
                'name' => 'حي غرب',
                'court_type_id' => 1,
                'court_level_id' => 3,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            243 => 
            array (
                'id' => 288,
                'name' => 'صحه توقيع القاهره',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            244 => 
            array (
                'id' => 290,
                'name' => 'محكمة جنايات شمال القاهرة',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            245 => 
            array (
                'id' => 297,
                'name' => 'شركة الكهرباء',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            246 => 
            array (
                'id' => 300,
                'name' => 'سيدي جابر',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            247 => 
            array (
                'id' => 301,
                'name' => 'محكمة سيدى جابر الجزئية',
                'court_type_id' => 1,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            248 => 
            array (
                'id' => 304,
                'name' => 'محكمة جنح الدخيلة الجزئية',
                'court_type_id' => 1,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            249 => 
            array (
                'id' => 306,
                'name' => 'محكمة جنح اجا الجزئية',
                'court_type_id' => 1,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            250 => 
            array (
                'id' => 309,
                'name' => 'محكمة جنح تان الجزئية',
                'court_type_id' => 1,
                'court_level_id' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            251 => 
            array (
                'id' => 310,
                'name' => 'وزارة المالية لجنة تظلمات الضرائب العامة',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            252 => 
            array (
                'id' => 323,
                'name' => 'طلخا',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            253 => 
            array (
                'id' => 324,
                'name' => 'القضاء الاداري',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            254 => 
            array (
                'id' => 325,
                'name' => 'المحكمة الاقتصاديه',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            255 => 
            array (
                'id' => 326,
                'name' => 'المنصورة الاقتصاديه',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            256 => 
            array (
                'id' => 327,
                'name' => 'بلقاس',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            257 => 
            array (
                'id' => 328,
                'name' => 'محكمة طلخا',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            258 => 
            array (
                'id' => 329,
                'name' => 'محكمة البحر',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            259 => 
            array (
                'id' => 330,
            'name' => ' الجزئية) - الدقهلية',
            'court_type_id' => 1,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        260 => 
        array (
            'id' => 331,
            'name' => 'البصراط',
            'court_type_id' => 1,
            'court_level_id' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        261 => 
        array (
            'id' => 333,
            'name' => 'الامحكمة الإبتدائية',
            'court_type_id' => 1,
            'court_level_id' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        262 => 
        array (
            'id' => 338,
            'name' => 'مدني مركز',
            'court_type_id' => 1,
            'court_level_id' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        263 => 
        array (
            'id' => 339,
            'name' => 'مدني سمنود',
            'court_type_id' => 1,
            'court_level_id' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        264 => 
        array (
            'id' => 340,
            'name' => 'اداري مركز',
            'court_type_id' => 1,
            'court_level_id' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        265 => 
        array (
            'id' => 342,
            'name' => 'اسره أول',
            'court_type_id' => 1,
            'court_level_id' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        266 => 
        array (
            'id' => 343,
            'name' => 'شرعي تان',
            'court_type_id' => 1,
            'court_level_id' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        267 => 
        array (
            'id' => 344,
            'name' => 'مدينه نصر',
            'court_type_id' => 1,
            'court_level_id' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        268 => 
        array (
            'id' => 345,
            'name' => 'دنح مدينه نصر',
            'court_type_id' => 1,
            'court_level_id' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        269 => 
        array (
            'id' => 346,
            'name' => 'صحه توقيع',
            'court_type_id' => 1,
            'court_level_id' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        270 => 
        array (
            'id' => 347,
            'name' => 'جنج أول المنصورة',
            'court_type_id' => 1,
            'court_level_id' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        271 => 
        array (
            'id' => 348,
            'name' => 'مجلس اللدوله',
            'court_type_id' => 1,
            'court_level_id' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        272 => 
        array (
            'id' => 349,
            'name' => 'محكمة جنح ميت غمر الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        273 => 
        array (
            'id' => 350,
            'name' => 'محكمة جنح السنبلاوين الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        274 => 
        array (
            'id' => 352,
            'name' => 'محكمة جنح منية النصر الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        275 => 
        array (
            'id' => 354,
            'name' => 'محكمة القضاء الإدارى مجلس الدولة',
            'court_type_id' => 1,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        276 => 
        array (
            'id' => 356,
            'name' => 'محكمة جنح محلة دمنه الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        277 => 
        array (
            'id' => 357,
            'name' => 'محكمة جنح مركز المنصورة الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        278 => 
        array (
            'id' => 359,
            'name' => 'محكمة جنح شربين الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        279 => 
        array (
            'id' => 360,
            'name' => 'محكمة مجلس دوله',
            'court_type_id' => 1,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        280 => 
        array (
            'id' => 361,
            'name' => 'محكمة مدنى جزئى ثان المنصورة',
            'court_type_id' => 1,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        281 => 
        array (
            'id' => 363,
            'name' => 'محكمة جنح كفر سعد الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        282 => 
        array (
            'id' => 364,
            'name' => 'محكمة جنح مستأنف شطا',
            'court_type_id' => 3,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        283 => 
        array (
            'id' => 365,
            'name' => 'محكمة جنح بيلا الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        284 => 
        array (
            'id' => 366,
            'name' => 'محكمة الأسرة شرعى جزئى بلقاس',
            'court_type_id' => 2,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        285 => 
        array (
            'id' => 368,
            'name' => 'محكمة جنح مستانف مركز المنصورة',
            'court_type_id' => 3,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        286 => 
        array (
            'id' => 369,
            'name' => 'محكمة مدنى جزئى طلخا',
            'court_type_id' => 1,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        287 => 
        array (
            'id' => 375,
            'name' => 'محكمة المنصورة الإبتدائية - مدنى كلى مدنى إيجارات',
            'court_type_id' => 1,
            'court_level_id' => 3,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        288 => 
        array (
            'id' => 376,
            'name' => 'محكمة الأسرة شرعى جزئى دكرنس',
            'court_type_id' => 2,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        289 => 
        array (
            'id' => 377,
            'name' => 'محكمة مدنى مستأنف بلقاس',
            'court_type_id' => 1,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        290 => 
        array (
            'id' => 378,
            'name' => 'محكمة جنايات الزقازيق',
            'court_type_id' => 3,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        291 => 
        array (
            'id' => 379,
            'name' => 'محكمة السويس الإبتدائية',
            'court_type_id' => 1,
            'court_level_id' => 3,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        292 => 
        array (
            'id' => 380,
            'name' => 'محكمة جنح كفر الشيخ الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        293 => 
        array (
            'id' => 382,
            'name' => 'محكمة الأسرة شرعى جزئى أول المنصورة',
            'court_type_id' => 2,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        294 => 
        array (
            'id' => 383,
            'name' => 'محكمة جنح أجا الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        295 => 
        array (
            'id' => 385,
            'name' => 'محكمة مدنى صحة توقيع مركز المنصورة',
            'court_type_id' => 1,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        296 => 
        array (
            'id' => 386,
            'name' => 'محكمة جنايات المنصورة',
            'court_type_id' => 3,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        297 => 
        array (
            'id' => 387,
            'name' => 'محكمة جنح أمن دولة طوارئ أول المنصورة الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        298 => 
        array (
            'id' => 388,
            'name' => 'محكمة جنح أمن دولة طوارئ ثان المنصورة الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        299 => 
        array (
            'id' => 389,
            'name' => 'محكمة جنايات مدينه نصر',
            'court_type_id' => 3,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        300 => 
        array (
            'id' => 392,
            'name' => 'جدول إدارى محكمة جنح السنبلاوين الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        301 => 
        array (
            'id' => 393,
            'name' => 'محكمة جنح مستانف أول المنصورة',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        302 => 
        array (
            'id' => 394,
            'name' => 'محكمة جنح النزهةالجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        303 => 
        array (
            'id' => 395,
            'name' => 'محكمة جنح سيدي جابر الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        304 => 
        array (
            'id' => 396,
            'name' => 'محكمة جنح مستانف',
            'court_type_id' => 3,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        305 => 
        array (
            'id' => 397,
            'name' => 'محكمة جنح اقتصاديه الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        306 => 
        array (
            'id' => 398,
            'name' => 'محكمة جنوب المنصورة الكلية دائرة مدنى كلى',
            'court_type_id' => 1,
            'court_level_id' => 3,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        307 => 
        array (
            'id' => 399,
            'name' => 'جدول إدارى محكمة جنح ثان المنصورة الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        308 => 
        array (
            'id' => 400,
            'name' => 'محكمة جنايات شرق القاهره',
            'court_type_id' => 3,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        309 => 
        array (
            'id' => 402,
            'name' => 'محكمة الأسرة شرعى جزئى مركز المنصورة',
            'court_type_id' => 2,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        310 => 
        array (
            'id' => 403,
            'name' => 'محكمة جنح أول المنصورة الإقتصادية الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        311 => 
        array (
            'id' => 404,
            'name' => 'محكمة جنح ميت سلسيل الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        312 => 
        array (
            'id' => 405,
            'name' => 'محكمة الإستئناف العالى المنصورة',
            'court_type_id' => 1,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        313 => 
        array (
            'id' => 406,
            'name' => 'محكمة مدنى جزئى مركز المنصورة',
            'court_type_id' => 1,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        314 => 
        array (
            'id' => 407,
            'name' => 'محكمة مدنى جزئى سمنود',
            'court_type_id' => 1,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        315 => 
        array (
            'id' => 408,
            'name' => 'جدول إدارى محكمة جنح مركز المنصورة الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        316 => 
        array (
            'id' => 409,
            'name' => 'محكمة جنح الاقتصاديه الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        317 => 
        array (
            'id' => 410,
            'name' => 'محكمة جنح مدينه نصر الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        318 => 
        array (
            'id' => 414,
            'name' => 'محكمة جنايات المنصورة الدائرة السادسة',
            'court_type_id' => 3,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        319 => 
        array (
            'id' => 415,
            'name' => 'محكمة مدنى جزئى أول المنصورة',
            'court_type_id' => 1,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        320 => 
        array (
            'id' => 417,
            'name' => 'محكمة جنح أول المنصورة الجزئية',
            'court_type_id' => 1,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        321 => 
        array (
            'id' => 419,
            'name' => 'محكمة جنح بلقاس الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        322 => 
        array (
            'id' => 420,
            'name' => 'محكمة جنايات المنصورة - الدائرة السابعة',
            'court_type_id' => 3,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        323 => 
        array (
            'id' => 421,
            'name' => 'محكمة جنح نبروه الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        324 => 
        array (
            'id' => 422,
            'name' => 'محكمة جنح بلبيس الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        325 => 
        array (
            'id' => 423,
            'name' => 'محكمة جنح السيدة زينب الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        326 => 
        array (
            'id' => 424,
            'name' => 'محكمة جنح مركز ميت غمر الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        327 => 
        array (
            'id' => 426,
            'name' => 'جدول إدارى محكمة جنح طلخا الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        328 => 
        array (
            'id' => 427,
            'name' => 'محكمة جنح التجمع الأول الجزئية',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        329 => 
        array (
            'id' => 429,
            'name' => 'محكمة الأسكندرية الإبتدائية مدنى كلى',
            'court_type_id' => 1,
            'court_level_id' => 3,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        330 => 
        array (
            'id' => 430,
            'name' => 'محكمة الأسرة شرعى مستأنف أول المنصورة',
            'court_type_id' => 2,
            'court_level_id' => 2,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        331 => 
        array (
            'id' => 431,
        'name' => 'محكمة أول6 اكتوبر(دائرة جنح الهرم )',
            'court_type_id' => 3,
            'court_level_id' => 4,
            'created_at' => NULL,
            'updated_at' => NULL,
        ),
        332 => 
        array (
            'id' => 433,
        'name' => ' الإبتدائية مدنى كلى) - القاهرة',
        'court_type_id' => 1,
        'court_level_id' => 3,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    333 => 
    array (
        'id' => 434,
        'name' => 'محكمة جنح مستانف أول مدينه نصر',
        'court_type_id' => 3,
        'court_level_id' => 2,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    334 => 
    array (
        'id' => 435,
        'name' => 'محكمة المنصورة الإبتدائية مدنى كلى الدائرة الخامسة',
        'court_type_id' => 1,
        'court_level_id' => 3,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    335 => 
    array (
        'id' => 437,
        'name' => 'محكمة جنايات الازبكيه',
        'court_type_id' => 3,
        'court_level_id' => 2,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    336 => 
    array (
        'id' => 438,
        'name' => 'محكمة الإستئناف العالى المنصورة الدائرة المدنية',
        'court_type_id' => 1,
        'court_level_id' => 2,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    337 => 
    array (
        'id' => 439,
        'name' => 'محكمة جنح مصر الجديدة الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    338 => 
    array (
        'id' => 440,
        'name' => 'محكمة جنح الهرم الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    339 => 
    array (
        'id' => 441,
        'name' => 'محكمة جنح الموسكي الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    340 => 
    array (
        'id' => 442,
        'name' => 'محكمة جنح مركز المنصورة دائرة مباني الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    341 => 
    array (
        'id' => 443,
        'name' => 'محكمة دكرنس الإبتدائية مدنى كلى',
        'court_type_id' => 1,
        'court_level_id' => 3,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    342 => 
    array (
        'id' => 444,
        'name' => 'محكمة جنح الشرق بورسعيد الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    343 => 
    array (
        'id' => 445,
        'name' => 'محكمة الأسرة شرعى جزئى بورسعيد',
        'court_type_id' => 2,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    344 => 
    array (
        'id' => 446,
        'name' => 'محكمة المنصورة الإبتدائية - مدنى كلى',
        'court_type_id' => 1,
        'court_level_id' => 3,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    345 => 
    array (
        'id' => 447,
        'name' => 'محكمة صحة توقيع مدنى جزئى مركز المنصورة',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    346 => 
    array (
        'id' => 448,
        'name' => 'محكمة الأسرة شرعى جزئى ثان المنصورة',
        'court_type_id' => 2,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    347 => 
    array (
        'id' => 449,
        'name' => 'محكمة جنح تمى الأمديد الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    348 => 
    array (
        'id' => 451,
        'name' => 'محكمة جنح أول المنتزة الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    349 => 
    array (
        'id' => 453,
        'name' => 'محكمة جنح أول دمياط الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    350 => 
    array (
        'id' => 454,
        'name' => 'محكمة جنح دكرنس جزئى - الدقهلية الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    351 => 
    array (
        'id' => 455,
        'name' => 'محكمة جنايات المنصورة د/8',
        'court_type_id' => 3,
        'court_level_id' => 2,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    352 => 
    array (
        'id' => 456,
        'name' => 'محكمة جنح مدينة نصر الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    353 => 
    array (
        'id' => 457,
        'name' => 'محكمة جنح مستأنف أول المنصورة',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    354 => 
    array (
        'id' => 458,
        'name' => 'محكمة جنح المنتزة الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    355 => 
    array (
        'id' => 459,
        'name' => 'جدول إدارى محكمة جنح أول المنصورة الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    356 => 
    array (
        'id' => 461,
        'name' => 'محكمة جنح مركز دمياط الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    357 => 
    array (
        'id' => 462,
        'name' => 'محكمة المنصورة الإبتدائية - مدنى كلى د/3 ايجارات',
        'court_type_id' => 1,
        'court_level_id' => 3,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    358 => 
    array (
        'id' => 463,
        'name' => 'محكمة مجلس الدولة بالمنصورة',
        'court_type_id' => 1,
        'court_level_id' => 2,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    359 => 
    array (
        'id' => 464,
        'name' => 'محكمة جنح السيده زينب الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    360 => 
    array (
        'id' => 465,
        'name' => 'محكمة جنح قصر النيل الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    361 => 
    array (
        'id' => 466,
        'name' => 'محكمة مدنى جزئى كفرالزيات',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    362 => 
    array (
        'id' => 467,
        'name' => 'محكمة جنح كفر الزيات الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    363 => 
    array (
        'id' => 469,
        'name' => 'محكمة جنح مستأنف دكرنس',
        'court_type_id' => 3,
        'court_level_id' => 2,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    364 => 
    array (
        'id' => 470,
        'name' => 'محكمة مدنى جزئى ميت غمر',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    365 => 
    array (
        'id' => 471,
        'name' => 'جدول إدارى محكمة جنح تمى الأمديد الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    366 => 
    array (
        'id' => 472,
        'name' => 'محكمة جنح طلخا الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    367 => 
    array (
        'id' => 473,
        'name' => 'محكمة الإستئناف العالى القاهرة الدائرة الجنائية',
        'court_type_id' => 1,
        'court_level_id' => 2,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    368 => 
    array (
        'id' => 474,
        'name' => 'محكمة جنح قويسنا الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    369 => 
    array (
        'id' => 475,
        'name' => 'محكمة الأسرة شرعى جزئى وراثات أول المنصورة',
        'court_type_id' => 2,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    370 => 
    array (
        'id' => 476,
        'name' => 'محكمة القضاء الإدارى مجلس الدولة -الدقي',
        'court_type_id' => 1,
        'court_level_id' => 2,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    371 => 
    array (
        'id' => 477,
        'name' => 'محكمة مدنى جزئى صحة توقيع طلخا',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    372 => 
    array (
        'id' => 478,
        'name' => 'محكمة جنح دكرنس الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    373 => 
    array (
        'id' => 479,
        'name' => 'محكمة جنح ثان المنصورة الجزئية',
        'court_type_id' => 2,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    374 => 
    array (
        'id' => 480,
        'name' => 'محكمة مدنى جزئى صحة توقيع دكرنس',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    375 => 
    array (
        'id' => 481,
        'name' => 'محكمة جنح طنطا الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    376 => 
    array (
        'id' => 482,
        'name' => 'محكمة جنح التامينات الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    377 => 
    array (
        'id' => 483,
        'name' => 'محكمة مدنى كلى شمال المنصورة',
        'court_type_id' => 1,
        'court_level_id' => 3,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    378 => 
    array (
        'id' => 484,
        'name' => 'محكمة جنح أول مدينه نصر الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    379 => 
    array (
        'id' => 485,
        'name' => 'محكمة جنح مستأنف مركز المنصورة',
        'court_type_id' => 3,
        'court_level_id' => 2,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    380 => 
    array (
        'id' => 487,
        'name' => 'محكمة جنح ثان المحله الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    381 => 
    array (
        'id' => 488,
        'name' => 'محكمة جنح كفر البطيخ الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    382 => 
    array (
        'id' => 489,
        'name' => 'محكمة جنح عسكريه الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    383 => 
    array (
        'id' => 490,
        'name' => 'محكمة مدنى جزئى صحة توقيع أول المنصورة',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    384 => 
    array (
        'id' => 491,
        'name' => 'محكمة مدنى جزئى صحة توقيع ثان المنصورة',
        'court_type_id' => 2,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    385 => 
    array (
        'id' => 492,
        'name' => 'محكمة مدنى جزئى صحة توقيع مركز المنصورة',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    386 => 
    array (
        'id' => 493,
        'name' => 'محكمة جنح القاهرة الجديدة الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    387 => 
    array (
        'id' => 494,
        'name' => 'محكمة جنح سمنود الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    388 => 
    array (
        'id' => 495,
        'name' => 'محكمة الأسرة شرعى جزئى أول مدينة نصر',
        'court_type_id' => 2,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    389 => 
    array (
        'id' => 496,
        'name' => 'محكمة جنح مستأنف ثان المنصورة',
        'court_type_id' => 3,
        'court_level_id' => 2,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    390 => 
    array (
        'id' => 497,
        'name' => 'مكتب خبراء شمال الدقهلية',
        'court_type_id' => 1,
        'court_level_id' => 2,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    391 => 
    array (
        'id' => 498,
        'name' => 'محكمة المنصورة الإبتدائية دائرة مدنى مستعجل دائرة التنفيذ الموضوعي',
        'court_type_id' => 1,
        'court_level_id' => 3,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    392 => 
    array (
        'id' => 499,
        'name' => 'مجمع محاكم الإستاد المنصورة',
        'court_type_id' => 3,
        'court_level_id' => 2,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    393 => 
    array (
        'id' => 500,
        'name' => 'محكمة جنح أبو تشت الجزئية',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    394 => 
    array (
        'id' => 501,
        'name' => 'ديوان عامة محافظة الدقهلية',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    395 => 
    array (
        'id' => 502,
        'name' => 'وزارة المالية لجنة تظلمات الضرائب العامة بالقاهرة',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    396 => 
    array (
        'id' => 504,
        'name' => 'إدارة تنفيذ الأحكام',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    397 => 
    array (
        'id' => 505,
        'name' => 'مصلحة الطب الشرعى - خبراء نفسى',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    398 => 
    array (
        'id' => 506,
        'name' => 'مكتب خبراء محرم بك الإسكندرية',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    399 => 
    array (
        'id' => 507,
        'name' => 'محكمة جنح زهراء المعادى الجزئية',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    400 => 
    array (
        'id' => 508,
        'name' => 'مكتب خبراء دمياط',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    401 => 
    array (
        'id' => 509,
        'name' => 'مكتب خبراء جنوب الدقهلية',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    402 => 
    array (
        'id' => 510,
        'name' => 'نيابة أول المنصورة الجزئية - الإستيفاء',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    403 => 
    array (
        'id' => 511,
        'name' => 'الطب الشرعى قسم أبحاص التزييف والتزوير',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    404 => 
    array (
        'id' => 512,
        'name' => 'مديرية الزراعة الجمعية الزراعية',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    405 => 
    array (
        'id' => 513,
        'name' => 'محكمة أول و ثاني ومركز المنصورة الجزئية',
        'court_type_id' => 3,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    406 => 
    array (
        'id' => 514,
        'name' => 'ﺳﻤﻨﻮﺩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    407 => 
    array (
        'id' => 515,
        'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    408 => 
    array (
        'id' => 516,
        'name' => 'ﺍﻟﺰﻗﺎﺯﻳﻖ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    409 => 
    array (
        'id' => 517,
        'name' => 'ﻣﺼﺮ ﺍﻟﺠﺪﻳﺪﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    410 => 
    array (
        'id' => 518,
        'name' => 'ﻋﻴﻦ ﺷﻤﺲ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    411 => 
    array (
        'id' => 519,
        'name' => 'ﺍﺩﺍﺭﻳﻪ ﻋﻠﻴﺎ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    412 => 
    array (
        'id' => 520,
        'name' => 'ﺧﺒﺮﺍﺀ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    413 => 
    array (
        'id' => 521,
        'name' => 'ﺟﻨﺎﻳﺎﺕ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    414 => 
    array (
        'id' => 522,
        'name' => 'ﺟﻨﻨﺢ ﻣﺴﺘﺎﻧﻒ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    415 => 
    array (
        'id' => 523,
        'name' => 'ﺟﻨﺢ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_i4' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    416 => 
    array (
        'id' => 524,
        'name' => 'ﻣﺪﻧﻲ ﻛﻠﻲ ﺍﻻﺳﺘﺎﺩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    417 => 
    array (
        'id' => 525,
        'name' => 'ﻗﺴﻢ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    418 => 
    array (
        'id' => 526,
        'name' => 'ﻣﺤﻜﻤﻪ ﺑﻠﻘﺎﺱ ﺍﻟﺠﺰﺋﻴﻪ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    419 => 
    array (
        'id' => 527,
        'name' => 'ﻣﺴﺘﺄﻧﻒ ﺩﻣﻴﺎﻁ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    420 => 
    array (
        'id' => 528,
        'name' => 'ﻣﺤﻜﻤﻪ ﺍﻟﺒﺤﺮ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    421 => 
    array (
        'id' => 529,
        'name' => 'ﻣﺪﻧﻲ ﺗﺎﻥ ﺍﻟﺒﺤﺮ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    422 => 
    array (
        'id' => 530,
        'name' => 'ﻣﺴﺘﺎﻧﻒ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    423 => 
    array (
        'id' => 531,
        'name' => 'ﻧﻴﺎﺑﻪ ﺷﻤﺎﻝ ﺍﻟﻜﻠﻴﻪ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    424 => 
    array (
        'id' => 532,
        'name' => 'ﻣﺴﺘﺎﻧﻒ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    425 => 
    array (
        'id' => 533,
    'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﻋﺎﻟﻲ ﻣﺪﻧﻲ ﺩ(8)',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    426 => 
    array (
        'id' => 534,
        'name' => 'ﻣﺤﻜﻤﻪ ﺍﻻﺳﺘﺌﻨﺎﻑ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    427 => 
    array (
        'id' => 535,
        'name' => 'ﻧﻘﺾ ﺍﻟﺠﻨﺢ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    428 => 
    array (
        'id' => 536,
        'name' => 'ﻣﺤﻜﻤﺔ ﻗﺴﻢ ﺍﻭﻝ ﻣﺪﻧﻰ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    429 => 
    array (
        'id' => 537,
        'name' => 'ﺟﺪﻭﻝ ﻧﻴﺎﺑﻪ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    430 => 
    array (
        'id' => 538,
        'name' => 'ﻧﻴﺎﺑﻪ ﺍﻭﻝ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    431 => 
    array (
        'id' => 539,
        'name' => 'ﺍﺳﺮﻩ ﺍﻭﻝ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    432 => 
    array (
        'id' => 540,
        'name' => 'ﻣﺤﻜﻤﻪ ﺑﻠﻘﺎﺱ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    433 => 
    array (
        'id' => 541,
        'name' => 'ﻣﺪﻧﻲ ﻣﻨﻴﻪ ﺍﻟﻨﺼﺮ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    434 => 
    array (
        'id' => 542,
        'name' => 'ﻧﻴﺎﺑﻪ ﺟﻨﻮﺏ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    435 => 
    array (
        'id' => 543,
        'name' => 'ﻣﺴﺘﺎﻧﻒ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    436 => 
    array (
        'id' => 544,
        'name' => 'ﺍﺳﺮﻩ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    437 => 
    array (
        'id' => 545,
        'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ ﺛﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_i4' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    438 => 
    array (
        'id' => 546,
        'name' => 'ﻣﺴﺘﺎﻧﻒ ﺷﺮﻋﻲ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    439 => 
    array (
        'id' => 547,
        'name' => '-ﺟﻨﺢ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    440 => 
    array (
        'id' => 548,
        'name' => 'ﻗﺴﻢ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    441 => 
    array (
        'id' => 549,
        'name' => 'ﻡ ﻙ ﺍﻻﺳﺘﺎﺩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    442 => 
    array (
        'id' => 550,
        'name' => 'ﻣﺠﻠﺲ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    443 => 
    array (
        'id' => 551,
        'name' => 'ﻣﻨﻴﻪ ﺍﻟﻨﺼﺮ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    444 => 
    array (
        'id' => 552,
        'name' => 'ﺑﻠﻘﺎﺱ ﻣﺪﻧﻲ ﻛﻠﻲ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    445 => 
    array (
        'id' => 553,
        'name' => 'ﺟﻨﺎﻳﺎﺕ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    446 => 
    array (
        'id' => 554,
        'name' => 'ﻣﺴﺘﺄﻧﻒ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    447 => 
    array (
        'id' => 555,
        'name' => 'ﻗﺴﻢ ﺍﺑﺤﺎﺙ ﺍﻟﺘﺰﻳﻴﻒ ﻭﺍﻟﺘﺰﻭﻳﺮ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    448 => 
    array (
        'id' => 556,
        'name' => 'ﺍﻟﻤﻨﺘﺰﻩ ﺍﻟﺠﺰﺋﻴﻪ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    449 => 
    array (
        'id' => 557,
        'name' => 'ﺱ ﻉ ﻣﺪﻧﻲ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    450 => 
    array (
        'id' => 558,
        'name' => 'ﺍﻟﻤﻨﺼﻮﺭﻩ ﺍﻻﻗﺘﺼﺎﺩﻳﻪ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    451 => 
    array (
        'id' => 559,
        'name' => 'ﺧﺒﺮﺍﺀ ﺟﻨﻮﺏ ﺍﻟﺪﻗﻬﻠﻴﻪ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    452 => 
    array (
        'id' => 560,
        'name' => 'ﺗﻨﻔﻴﺬ ﻣﺮﻛﺰ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    453 => 
    array (
        'id' => 561,
        'name' => 'ﻣﺴﺘﺎﻧﻒ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    454 => 
    array (
        'id' => 562,
        'name' => 'ﺟﻨﺢ ﺍﻟﻤﻨﺸﻴﻪ',
        'court_type_id' => 1,
        'court_level_i4' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    455 => 
    array (
        'id' => 563,
        'name' => 'ﺍﻟﺠﻨﺎﻳﺎﺕ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    456 => 
    array (
        'id' => 564,
        'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ ﺃﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
        'court_type_id' => 1,
        'court_level_i4' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    457 => 
    array (
        'id' => 565,
        'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_i4' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    458 => 
    array (
        'id' => 566,
        'name' => 'ﻣﺪﻥ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    459 => 
    array (
        'id' => 567,
        'name' => 'ﻣﺪﻧﻲ ﻣﺴﺘﺌﻨﺎﻑ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    460 => 
    array (
        'id' => 568,
        'name' => 'ﻣﺤﻜﻤﺔ ﺟﻨﺢ  ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
        'court_type_id' => 1,
        'court_level_id' => 4,
      'created_at' => NULL,
        'updated_at' => NULL,
    ),
    461 => 
    array (
        'id' => 569,
        'name' => 'ﻣﺴﺘﺄﻧﻒ ﻗﺼﺮ ﺍﻟﻨﻴﻞ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    462 => 
    array (
        'id' => 570,
        'name' => 'ﺍﻟﻄﺐ ﺷﺮﻋﻲ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    463 => 
    array (
        'id' => 571,
        'name' => 'ﺧﺒﺮﺍ ﺷﻤﺎﻝ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    464 => 
    array (
        'id' => 572,
        'name' => 'ﻗﺴﻢ ﺍﻭﻝ ﻣﺪﻳﻨﻪ ﻧﺼﺮ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    465 => 
    array (
        'id' => 573,
        'name' => 'ﺷﺮﺑﻴﻦ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    466 => 
    array (
        'id' => 574,
        'name' => 'ﻣﺮﻛﺰ ﺍﻟﺴﻨﺒﻼﻭﻳﻦ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    467 => 
    array (
        'id' => 575,
        'name' => 'ﻣﺠﻠﺲ ﺍﻟﺪﻭﻟﻪ -ﺍﻟﺠﻴﺰﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    468 => 
    array (
        'id' => 576,
        'name' => 'ﺻﺤﻪ ﺗﻮﻗﻴﻊ ﺗﺎﻥ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    469 => 
    array (
        'id' => 577,
        'name' => 'ﻣﺪﻧﻲ ﺱ ﻉ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    470 => 
    array (
        'id' => 578,
        'name' => 'ﺟﻨﺢ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
        'court_type_id' => 1,
        'court_level_i4' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    471 => 
    array (
        'id' => 579,
        'name' => 'ﻣﺪﻧﻲ ﺍﻳﺠﺎﺭﺍﺕ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    472 => 
    array (
        'id' => 580,
        'name' => 'ﺍﺩﺍﺭﻱ ﺗﺎﻥ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    473 => 
    array (
        'id' => 581,
        'name' => 'ﺍﺩﻟﻪ ﺍﻟﺠﻨﺎﺋﻴﻪ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    474 => 
    array (
        'id' => 582,
        'name' => 'ﺟﻨﺢ ﺍﻭﻝ ﺍﻝ ﻣﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_i4' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    475 => 
    array (
        'id' => 583,
        'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﻋﺎﻟﻲ ﺷﺮﻋﻲ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    476 => 
    array (
        'id' => 584,
        'name' => 'ﻣﺠﻠﻲ ﺍﻟﺪﻭﻟﻪ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    477 => 
    array (
        'id' => 585,
        'name' => 'ﻣﺴﺘﺎﻧﻒ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    478 => 
    array (
        'id' => 586,
        'name' => 'ﻣﺠﻠﺲ ﺍﻟﻮﻟﻪ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    479 => 
    array (
        'id' => 587,
        'name' => 'ﻣﺪﻧﻲ ﺍﻭﻝ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    480 => 
    array (
        'id' => 588,
        'name' => 'ﺧﺒﺮﺍﺀ ﺷﻤﺎﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    481 => 
    array (
        'id' => 589,
        'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﺗﺎﻥ ﺷﺮﻋﻲ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    482 => 
    array (
        'id' => 590,
        'name' => 'ﻣﺪﻧﻲ ﺗﺎﻥ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    483 => 
    array (
        'id' => 591,
        'name' => 'ﺍﻟﺮﻳﺎﺽ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    484 => 
    array (
        'id' => 592,
        'name' => 'ﻗﺴﻢ  ﺗﺎﻥ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    485 => 
    array (
        'id' => 593,
        'name' => 'ﺟﻨﺢ ﺱ ﻣﺮﻛﺰ ﻣﻴﺖ ﻏﻤﺮ',
        'court_type_id' => 1,
        'court_level_i4' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    486 => 
    array (
        'id' => 594,
        'name' => 'ﺍﻳﺠﺎﺭﺍﺕ ﺱ ﻉ ﻣﺤﻜﻤﻪ ﺍﻟﺒﺤﺮ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    487 => 
    array (
        'id' => 595,
        'name' => 'ﻣﺠﻠﻠﺲ ﺍﻟﺪﻭﻟﻪ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    488 => 
    array (
        'id' => 596,
        'name' => 'ﻣﺠﻤﻊ ﻣﺤﺎﻛﻢ ﺍﻻﺳﺘﺎﺩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    489 => 
    array (
        'id' => 597,
        'name' => 'ﻣﺪﻧﻲ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    490 => 
    array (
        'id' => 598,
        'name' => 'ﺩ/9 ﺗﻌﻮﻳﻀﺎﺕ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    491 => 
    array (
        'id' => 599,
        'name' => 'ﺍﺳﺮﻩ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    492 => 
    array (
        'id' => 600,
        'name' => 'ﺟﻨﺢ ﺍﻗﺘﺼﺎﻳﻪ',
        'court_type_id' => 1,
        'court_level_i4' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    493 => 
    array (
        'id' => 601,
    'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ (ﺍﻻﺳﺘﺎﺩ)',
        'court_type_id' => 1,
        'court_lev4l_id'=> 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    494 => 
    array (
        'id' => 602,
        'name' => 'ﻣﺤﻜﻤﻪ ﺍﻟﻤﻨﺼﻮﺭﻩ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    495 => 
    array (
        'id' => 603,
        'name' => 'ﺻﺤﻪ ﺗﻮﻗﻴﻊ ﻣﺪﻳﻨﻪ ﻧﺼﺮ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    496 => 
    array (
        'id' => 604,
    'name' => 'ﻣﺪﻧﻲ ﻛﻠﻲ -ﺣﻜﻮﻣﻪ (ﺍﻻﺑﺘﺪﺍﺋﻴﻪ)',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    497 => 
    array (
        'id' => 605,
        'name' => 'ﻣﺪﻧﻲ ﻃﻠﺨﺎ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    498 => 
    array (
        'id' => 606,
        'name' => 'ﻣﺴﺘﺄﻧﻒ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
        'court_type_id' => 1,
        'court_level_id' => 1,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
    499 => 
    array (
        'id' => 607,
        'name' => 'ﺟﻨﺢ ﺃﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
        'court_type_id' => 1,
        'court_level_i4' => 4,
        'created_at' => NULL,
        'updated_at' => NULL,
    ),
));
        DB::table('courts')->insert(array (
            0 => 
            array (
                'id' => 608,
                'name' => 'ﺣﻲ ﺷﺮﻕ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 609,
                'name' => 'ﻋﻤﺎﻟﻴﻪ ﺱ ﻉ ﺍﻟﻤﺨﺘﻠﻂ ﺭﻭﻝ 8',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 610,
                'name' => 'ﺟﻨﺢ ﺱ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 611,
                'name' => 'ﻣﺠﻠﺲ ﺩﻭﻟﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 612,
                'name' => 'ﺷﺮﻋﻲ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            5 => 
            array (
                'id' => 613,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﻟﺠﻨﺎﻳﺎﺕ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            6 => 
            array (
                'id' => 614,
                'name' => 'ﻣﺠﻠﺲ ﺩﻭﻟﻪ-ﺍﻟﺪﻗﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            7 => 
            array (
                'id' => 615,
                'name' => 'ﺍﻻﺩﺍﺭﻳﻪ ﻋﻠﻴﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            8 => 
            array (
                'id' => 616,
                'name' => 'ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            9 => 
            array (
                'id' => 617,
                'name' => 'ﻣﺮﻛﺰ ﺃﺟﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            10 => 
            array (
                'id' => 618,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ ﻗﺼﺮ ﺍﻟﻨﻴﻞ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            11 => 
            array (
                'id' => 619,
                'name' => 'ﺗﻨﻔﻴﺬ ﻣﻮﺿﻮﻋﻲ ﺍﻟﻮﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            12 => 
            array (
                'id' => 620,
                'name' => 'ﺍﻟﻤﻨﺼﻮﺭﻩ ﺍﻻﺑﺘﺪ ﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            13 => 
            array (
                'id' => 621,
                'name' => 'ﺟﻨﺢ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            14 => 
            array (
                'id' => 622,
                'name' => 'ﻣﺪﻧﻲ ﻛﻠﻲ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            15 => 
            array (
                'id' => 623,
                'name' => 'ﺍﻻﺩﻟﻪ ﺍﻟﺠﻨﺎﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            16 => 
            array (
                'id' => 624,
            'name' => 'ﺧﺒﺮﺍﺀ ﺷﻤﺎﻝ(ﻋﻤﺎﺭﻩ ﺍﻻﻭﻗﺎﻑ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            17 => 
            array (
                'id' => 625,
                'name' => 'ﺟﻨﺢ ﺍﺟﺎ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            18 => 
            array (
                'id' => 626,
                'name' => 'ﻣﺪﻧﻲ ﻛﻠﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            19 => 
            array (
                'id' => 627,
                'name' => 'ﺍﺑﻴﺲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            20 => 
            array (
                'id' => 628,
                'name' => 'ﻣﺪﻧﻰ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            21 => 
            array (
                'id' => 629,
                'name' => 'ﺗﻨﻔﻴﺬ ﺍﻟﻨﻴﺎﺑﻪ ﺍﻟﻜﻠﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            22 => 
            array (
                'id' => 630,
                'name' => 'ﺗﻮﻗﻴﻊ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            23 => 
            array (
                'id' => 631,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ ﺍﺣﺪﺍﺙ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            24 => 
            array (
                'id' => 632,
                'name' => 'ﺩ/3 ﺍﻳﺠﺎﺭﺍﺕ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            25 => 
            array (
                'id' => 633,
                'name' => 'ﻣﺴﺘﺎﻧﻒ ﺑﻠﻘﺎﺱ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            26 => 
            array (
                'id' => 634,
                'name' => 'ﺍﻟﻤﻨﺼﻮﺭﻩ ﻻﺑﺘﺪﺍﺋﻴﻪ-ﻣﺠﻤﻊ ﺍﻟﻤﺤﺎﻛﻢ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            27 => 
            array (
                'id' => 635,
                'name' => 'ﺍﺩﺍﺭﻱ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            28 => 
            array (
                'id' => 636,
                'name' => 'ﺍﻟﻤﺪﻳﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            29 => 
            array (
                'id' => 637,
                'name' => 'ﺟﻨﺢ ﻗﺴﻢ ﺍﻭﻝ ﺍﻟﻤﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            30 => 
            array (
                'id' => 638,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﺟﺎ ﺍﻟﺠﺰﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            31 => 
            array (
                'id' => 639,
                'name' => 'ﻣﻜﺘﺐ ﺧﺒﺮﺍﺀ ﺷﻤﺎﻝ ﺍﻟﺪﻗﻬﻠﻴﻪ-ﻋﻤﺎﺭﻩ ﺍﻻﻭﻗﺎﻑ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            32 => 
            array (
                'id' => 640,
                'name' => 'ﺍﻻﺳﺘﺌﻨﺎﻑ ﺑﺎﻟﻤﺨﺘﻠﻂ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            33 => 
            array (
                'id' => 641,
                'name' => 'ﺍﻟﻜﻬﺮﺑﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            34 => 
            array (
                'id' => 642,
                'name' => 'ﻧﻴﺎﺑﻪ ﺍﻻﺳﺮﻩ -ﺍﻟﻤﺮﻭﺭ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            35 => 
            array (
                'id' => 643,
                'name' => 'ﺟﻨﺢ ﺍﻭﻝ ﺍ ﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            36 => 
            array (
                'id' => 644,
                'name' => 'ﻣﺮﻛﺰﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            37 => 
            array (
                'id' => 645,
                'name' => 'ﺩﺍﺋﺮﻩ ﺍﻻﻣﻮﺭ ﺍﻟﻤﺴﺘﺠﻠﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            38 => 
            array (
                'id' => 646,
                'name' => 'ﻧﻴﺎﺑﻪ  ﺍﻻﺳﺮﻩ ﺍﻟﻤﺮﻭﺭ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            39 => 
            array (
                'id' => 647,
                'name' => 'ﺷﺮﻋﻲ ﻣﺴﺘﺎﻧﻒ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            40 => 
            array (
                'id' => 648,
                'name' => 'ﺧﺒﺮﺍﺀ ﻋﻤﺎﺭﻩ ﺍﻻﻭﻗﺎﻑ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            41 => 
            array (
                'id' => 649,
                'name' => 'ﺟﻨﺢ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            42 => 
            array (
                'id' => 650,
                'name' => 'ﻣﺪﻧﻲ ﺍﻭﻝ -ﺻﺤﻪ ﺗﻮﻗﻴﻊ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            43 => 
            array (
                'id' => 651,
                'name' => 'ﺷﺮﻋﻲ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            44 => 
            array (
                'id' => 652,
                'name' => 'ﺟﻨﺢ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            45 => 
            array (
                'id' => 653,
                'name' => 'ﻣﺪﻧﻲ ﻣﺴﺘﺎﻧﻒ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            46 => 
            array (
                'id' => 654,
                'name' => 'ﺟﺎﻣﻌﻪ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            47 => 
            array (
                'id' => 655,
                'name' => 'ﺷﺮﻋﻲ ﻗﺴﻢ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            48 => 
            array (
                'id' => 656,
                'name' => 'ﻣﻜﺘﺐ ﺧﺒﺮﺍﺀ ﺟﻨﻮﺏ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            49 => 
            array (
                'id' => 657,
                'name' => 'ﺍﻟﺨﺒﺮﺍﺀ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            50 => 
            array (
                'id' => 658,
                'name' => 'ﺟﻨﺢ ﺱ  ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            51 => 
            array (
                'id' => 659,
                'name' => 'ﻣﺴﺘﺎﻧﻒ ﺳﻤﻨﻮﺩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            52 => 
            array (
                'id' => 660,
                'name' => 'ﻣﺴﺘﺎﻧﻒ ﺛﺎﻧﻰ ﺍﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            53 => 
            array (
                'id' => 661,
            'name' => 'ﺍﻟﻤﺤﻜﻤﻪ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ (ﺍﻻﺳﺘﺎﺩ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            54 => 
            array (
                'id' => 662,
                'name' => 'ﻣﺪﻧﻲ ﻛﻠﻲ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            55 => 
            array (
                'id' => 663,
                'name' => 'ﻣﺪﻧﻰ ﺃﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            56 => 
            array (
                'id' => 664,
                'name' => 'ﺟﻨﺢ ﺍﻻﻗﺘﺼﺎﺩﻳﻪ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            57 => 
            array (
                'id' => 665,
                'name' => 'ﺍﻟﻤﻨﺼﻮﺭﺓ ﺍﻹﺑﺘﺪﺍﺋﻴﺔ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            58 => 
            array (
                'id' => 666,
                'name' => 'ﻣﺠﻤﻊ ﺍﻟﺒﺤﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            59 => 
            array (
                'id' => 667,
                'name' => 'ﺟﻨﺢ ﻗﺴﻢ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            60 => 
            array (
                'id' => 668,
                'name' => 'ﺻﺤﺔ ﺗﻮﻗﻴﻊ ﺃﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            61 => 
            array (
                'id' => 669,
                'name' => 'ﺍﻟﺪﻗﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            62 => 
            array (
                'id' => 670,
                'name' => 'ﺍﻟﻘﻀﺎﺀ ﺍﻟﻌﺴﻜﺮﻱ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            63 => 
            array (
                'id' => 671,
                'name' => 'ﺑﻴﻼ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            64 => 
            array (
                'id' => 672,
                'name' => 'ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            65 => 
            array (
                'id' => 673,
                'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            66 => 
            array (
                'id' => 674,
                'name' => 'ﻣﺤﻜﻤﻪ ﺑﻠﻘﺎﺱ ﻣﺴﺘﺄﻧﻒ ﻣﺪﻧﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            67 => 
            array (
                'id' => 675,
                'name' => 'ﻗﺴﻢ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            68 => 
            array (
                'id' => 676,
                'name' => 'ﺷﺮﻋﻲ ﺑﻮﺭﺳﻌﻴﺪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            69 => 
            array (
                'id' => 677,
                'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            70 => 
            array (
                'id' => 678,
            'name' => 'ﺻﺤﻪ ﺗﻮﻗﻴﻊ (ﺍﻟﺒﺤﺮ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            71 => 
            array (
                'id' => 679,
                'name' => 'ﻣﺪﻧﻲ ﻣﺴﺘﺄﻧﻒ ﺩ8',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            72 => 
            array (
                'id' => 680,
                'name' => 'ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            73 => 
            array (
                'id' => 681,
                'name' => 'ﺍﻻﺳﺘﺌﻨﺎﻑ ﺍﻟﻌﺎﻟﻲ ﺑﺎﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            74 => 
            array (
                'id' => 682,
                'name' => 'ﺟﻨﺢ ﺱ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            75 => 
            array (
                'id' => 683,
                'name' => 'ﺟﻨﺢ ﺍﻟﺘﺠﻤﻊ ﺍﻻﻭﻝ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            76 => 
            array (
                'id' => 684,
                'name' => 'ﻣﺠﻠﺲ ﺍﻟﺪﻭﻟﻪ-ﺍﻟﺪﻗﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            77 => 
            array (
                'id' => 685,
                'name' => 'ﺍﻟﺘﻨﻔﻴﺬ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            78 => 
            array (
                'id' => 686,
                'name' => 'ﺟﻨﺢ  ﻣﺴﺘﺄﻧﻒ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            79 => 
            array (
                'id' => 687,
                'name' => 'ﺍﻟﻤﺤﻜﻤﻪ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            80 => 
            array (
                'id' => 688,
                'name' => 'ﻗﻀﺎﺀ ﺍﺩﺍﺭﻱ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            81 => 
            array (
                'id' => 689,
                'name' => 'ﻣﺤﻜﻤﻪ ﺟﻨﺢ ﺩﻣﻴﺎﻁ',
                'court_type_id' => 1,
                'court_level_id' => 4,
     'created_at' => NULL,
                'updated_at' => NULL,
            ),
            82 => 
            array (
                'id' => 690,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            83 => 
            array (
                'id' => 691,
                'name' => 'ﺍﻟﻤﺤﺎﻓﻈﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            84 => 
            array (
                'id' => 692,
                'name' => 'ﻣﺴﺘﺄﻧﻒ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            85 => 
            array (
                'id' => 693,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﻟﻤﻨﺸﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            86 => 
            array (
                'id' => 694,
            'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﻋﺎﻟﻲ (ﺍﻟﻤﺨﺘﻠﻂ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            87 => 
            array (
                'id' => 695,
                'name' => 'ﻡ ﻣﺴﺘﺄﻧﻒ ﺍﻟﻤﺨﺘﻠﻂ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            88 => 
            array (
                'id' => 696,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            89 => 
            array (
                'id' => 697,
                'name' => 'ﺗﻨﻔﻴﺬ ﻣﻮﺿﻮﻋﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            90 => 
            array (
                'id' => 698,
            'name' => 'ﻣﺤﻜﻤﺔ ﻃﻠﺨﺎ ﺍﻟﺠﺰﺋﻴﺔ (ﺍﻟﻤﺤﻜﻤﺔ ﺍﻟﺠﺰﺋﻴﺔ) - ﺍﻟﺪﻗﻬﻠﻴﺔ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            91 => 
            array (
                'id' => 699,
                'name' => 'ﺍﺳﺮﻩ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            92 => 
            array (
                'id' => 700,
                'name' => 'ﻣﺠﻠﺲ ﺍﻟﺪﻭﻟﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            93 => 
            array (
                'id' => 701,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            94 => 
            array (
                'id' => 702,
                'name' => 'ﻣﺴﺘﺎﻧﻒ ﺍﻟﺴﻨﺒﻼﻭﻳﻦ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            95 => 
            array (
                'id' => 703,
                'name' => 'ﺍﻻﻗﺘﺼﺎﺩﻳﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            96 => 
            array (
                'id' => 704,
                'name' => 'ﻣﻴﺖ ﻏﻤﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            97 => 
            array (
                'id' => 705,
                'name' => 'ﻧﻴﺎﺑﻪ ﺍﻭﻝ ﺍﻟﻤﻨﺘﺰﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            98 => 
            array (
                'id' => 706,
                'name' => 'ﺻﺤﻪ ﺗﻮﻗﻴﻊ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            99 => 
            array (
                'id' => 707,
                'name' => 'ﺱ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            100 => 
            array (
                'id' => 708,
                'name' => 'ﺟﻨﺢ ﻗﻮﺳﻨﺎ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            101 => 
            array (
                'id' => 709,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﺟﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            102 => 
            array (
                'id' => 710,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            103 => 
            array (
                'id' => 711,
                'name' => 'ﺟﻨﺢ ﺱ ﺍﻟﺴﻨﺒﻼﻭﻳﻦ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            104 => 
            array (
                'id' => 712,
                'name' => 'ﺍﻟﻤﻨﺼﻮﺭﺓ ﺍﻻﺑﺘﺪﺍﺋﻴﺔ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            105 => 
            array (
                'id' => 713,
                'name' => 'ﺍﻟﻤﺤﻠﻪ ﺍﻟﻜﺒﺮﻱ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            106 => 
            array (
                'id' => 714,
                'name' => 'ﻃﻠﺨﺎ ﺍﺑﻠﺠﺰﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            107 => 
            array (
                'id' => 715,
                'name' => 'ﺱ ﻣﺮﻛﺰ ﺍﻻﺳﺘﺎﺩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            108 => 
            array (
                'id' => 716,
                'name' => 'ﺟﻨﺎﻳﺎﺕ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            109 => 
            array (
                'id' => 717,
                'name' => 'ﻣﺪﻧﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            110 => 
            array (
                'id' => 718,
                'name' => 'ﺍﻟﻤﻨﺸﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            111 => 
            array (
                'id' => 719,
                'name' => 'ﺍﺍﻟﻤﻨﺼﻮﺭﻩ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            112 => 
            array (
                'id' => 720,
                'name' => 'ﺍﻟﺨﺒﻴﺮ ﺍﻟﻨﻔﺴﻲ ﻭﺍﻻﺟﺘﻤﺎﻋﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            113 => 
            array (
                'id' => 721,
                'name' => 'ﻣﻜﺘﺐ ﺍﻟﻨﻘﺾ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            114 => 
            array (
                'id' => 722,
                'name' => 'ﺣﺒﺮﺍﺀ ﺷﻤﺎﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            115 => 
            array (
                'id' => 723,
            'name' => 'ﺍﻣﻮﺭ ﻣﺴﺘﻌﺠﻠﻪ (ﺍﻻﺳﺘﺎﺩ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            116 => 
            array (
                'id' => 724,
                'name' => 'ﺍﻻﺑﺘﺪﺍﺋﻴﻪ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            117 => 
            array (
                'id' => 725,
            'name' => 'ﺍﻻﻣﻮﺭ ﺍﻟﻤﺴﺘﻌﺠﻠﻪ (ﺍﻻﺳﺘﺎﺩ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            118 => 
            array (
                'id' => 726,
                'name' => 'ﻗﺴﻢ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            119 => 
            array (
                'id' => 727,
                'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﻋﺎﻟﻲ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            120 => 
            array (
                'id' => 728,
                'name' => 'ﺟﻨﺎﻳﺎﺕ ﺍﻟﻘﺎﻫﺮﻩ ﺍﻟﺠﺪﻳﺪﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            121 => 
            array (
                'id' => 729,
                'name' => 'ﺍﻟﻤﺨﺘﻠﻂ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            122 => 
            array (
                'id' => 730,
                'name' => 'ﺧﺒﺮﺍﺀ ﺷﻤﺎﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            123 => 
            array (
                'id' => 731,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﺳﺮﻩ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            124 => 
            array (
                'id' => 732,
                'name' => 'ﺟﻨﺢ ﺍﻗﺘﺼﺎﺩﻳﻪ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            125 => 
            array (
                'id' => 733,
                'name' => 'ﻣﺪﻧﻲ ﺍﻭﻝ ﺍﻟﻤﻨﺘﺰﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            126 => 
            array (
                'id' => 734,
                'name' => 'ﺍﺣﻤﺪﻣﺎﻫﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            127 => 
            array (
                'id' => 735,
                'name' => 'ﺍﺳﺘﻴﻔﺎ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            128 => 
            array (
                'id' => 736,
                'name' => 'ﻧﻴﺎﺑﻪ ﺍﻟﻤﺮﻭﺭ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            129 => 
            array (
                'id' => 737,
                'name' => 'ﺱ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            130 => 
            array (
                'id' => 738,
                'name' => 'ﻣﺤﻜﻤﺔ ﺍﻟﺪﻗﻲ - ﺍﻟﺠﻴﺰﺓ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            131 => 
            array (
                'id' => 739,
                'name' => 'ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            132 => 
            array (
                'id' => 740,
                'name' => 'ﻣﺴﺘﺄﻧﻒ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            133 => 
            array (
                'id' => 741,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ ﻗﺴﻢ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            134 => 
            array (
                'id' => 742,
                'name' => 'ﺍﻟﺠﻨﺢ ﺍﻟﻤﺴﺘﺄﻧﻔﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            135 => 
            array (
                'id' => 743,
                'name' => 'ﺍﺟﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            136 => 
            array (
                'id' => 744,
                'name' => 'ﺣﻨﺢ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            137 => 
            array (
                'id' => 745,
                'name' => 'ﺧﺒﺮﺍﺀ ﺗﻮﺭﻳﻞ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            138 => 
            array (
                'id' => 746,
                'name' => 'ﻣﺤﻜﻤﺔ ﺃﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            139 => 
            array (
                'id' => 747,
                'name' => 'ﻣﺴﺘﺎﻧﻒ ﺍﺟﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            140 => 
            array (
                'id' => 748,
                'name' => 'ﻣﺪﻧﻲ ﺗﺎﻟﻦ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            141 => 
            array (
                'id' => 749,
                'name' => 'ﺻﺤﻪ ﺗﻮﻗﻴﻊ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            142 => 
            array (
                'id' => 750,
                'name' => 'ﺍﻟﻌﺒﺎﺳﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            143 => 
            array (
                'id' => 751,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            144 => 
            array (
                'id' => 752,
                'name' => 'ﻣﺴﺘﺄﻧﻒ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            145 => 
            array (
                'id' => 753,
                'name' => 'ﺍﻻﺳﺘﺌﻨﺎﻑ -ﺟﻨﺎﻳﺎﺕ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            146 => 
            array (
                'id' => 754,
                'name' => 'ﺟﻨﺢ ﺍﻟﻤﻨﺘﺰﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            147 => 
            array (
                'id' => 755,
                'name' => 'ﻣﺤﻀﺮﻳﻦ ﺍﻟﺘﻨﻔﻴﺬ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            148 => 
            array (
                'id' => 756,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﻟﻤﻨﺘﺰﻩ ﺍﻟﺠﺰﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            149 => 
            array (
                'id' => 757,
                'name' => 'ﺃﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            150 => 
            array (
                'id' => 758,
            'name' => 'ﺍﻟﻘﺎﻫﺮﻩ (ﺯﻫﺮﺍﺀ ﺍﻟﻤﻌﺎﺩﻱ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            151 => 
            array (
                'id' => 759,
                'name' => 'ﺳﻜﺮﺗﻴﺮ ﺍﺳﺮﻩ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            152 => 
            array (
                'id' => 760,
                'name' => 'ﺻﺤﻪ ﺗﻮﻗﻴﻊ ﺑﻠﻘﺎﺱ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            153 => 
            array (
                'id' => 761,
                'name' => 'ﺛﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            154 => 
            array (
                'id' => 762,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            155 => 
            array (
                'id' => 763,
            'name' => 'ﻣﺤﻜﻤﺔ ﻗﺴﻢ ﺍﻭﻝ ﻭﺛﺎﻧﻲ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﺓ ﺍﻟﺠﺰﺋﻴﺔ (ﺍﻟﻤﺤﻜﻤﺔ ﺍﻟﺠﺰﺋﻴﺔ) - ﺍﻟﺪﻗﻬﻠﻴﺔ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            156 => 
            array (
                'id' => 764,
                'name' => 'ﻣﺪ ﻧﻲ ﻛﻠﻲ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            157 => 
            array (
                'id' => 765,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﺳﺮﻩ ﺑﻮﺭﺳﻌﻴﺪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            158 => 
            array (
                'id' => 766,
                'name' => 'ﺍﻟﻤﺨﺘﻠﻂ-ﻣﺠﻤﻊ ﺍﻟﺒﺤﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            159 => 
            array (
                'id' => 767,
                'name' => 'ﺧﺒﺮﺍﺀ ﺟﻨﻮﺏ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            160 => 
            array (
                'id' => 768,
                'name' => 'ﺟﻨﺎﻳﺎﺕ ﺍﻻﺳﺒﻜﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            161 => 
            array (
                'id' => 769,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            162 => 
            array (
                'id' => 770,
            'name' => 'ﺧﺒﺮﺍﺀ ﺍﻟﻘﺎﻫﺮﻩ (ﺍﻻﻗﺘﺼﺎﺩﻳﻪ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            163 => 
            array (
                'id' => 771,
                'name' => 'ﺟﻨﺢ ﻣﺒﺎﻧﻲ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            164 => 
            array (
                'id' => 772,
                'name' => 'ﺟﻨﺢ ﻗﺴﻢ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            165 => 
            array (
                'id' => 773,
                'name' => 'ﺷﺮﻋﻲ ﻣﺴﺘﺎﻧﻒ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            166 => 
            array (
                'id' => 774,
                'name' => 'ﺟﻨﺢ ﻣﺴﺄﻧﻒ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            167 => 
            array (
                'id' => 775,
                'name' => 'ﺻﺤﻪ ﺗﻮﻗﻴﻪ ﻃﻠﻬﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            168 => 
            array (
                'id' => 776,
                'name' => 'ﺟﻨﺢ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            169 => 
            array (
                'id' => 777,
                'name' => 'ﻧﻴﺎﺑﻪ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            170 => 
            array (
                'id' => 778,
                'name' => 'ﺑﺪﻳﻦ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            171 => 
            array (
                'id' => 779,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﻻﺳﻜﻨﺪﺭﻳﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            172 => 
            array (
                'id' => 780,
                'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﻋﺎﻟﻲ ﺍﻝ ﻣﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            173 => 
            array (
                'id' => 781,
                'name' => 'ﻡ ﻙ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            174 => 
            array (
                'id' => 782,
                'name' => 'ﺟﻨﺢ ﺑﻠﻘﺎﺱ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            175 => 
            array (
                'id' => 783,
                'name' => 'ﺟﻨﺢ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            176 => 
            array (
                'id' => 784,
                'name' => 'ﻗﻀﺎﺀﺍﺩﺍﺭﻱ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            177 => 
            array (
                'id' => 785,
                'name' => 'ﺟﻨﺢ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            178 => 
            array (
                'id' => 786,
                'name' => 'ﻣﺤﻜﻤﻪ ﺟﻨﺢ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_id' => 4,
     'created_at' => NULL,
                'updated_at' => NULL,
            ),
            179 => 
            array (
                'id' => 787,
                'name' => 'ﻣﺠﻠﺲ ﺍﻟﺪﻭﻟﻪ ﺑﺎﻟﺪﻗﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            180 => 
            array (
                'id' => 788,
                'name' => 'ﺟﻨﺢ ﺍﻭﻝ ﺍﻟﻤﻨﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            181 => 
            array (
                'id' => 789,
                'name' => 'ﺟﻨﺢ ﺛﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            182 => 
            array (
                'id' => 790,
                'name' => 'ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            183 => 
            array (
                'id' => 791,
                'name' => 'ﺍﻻﺳﺘﺌﻨﺎﻑ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            184 => 
            array (
                'id' => 792,
                'name' => 'ﻣﺤﻜﻤﺔ ﺍﻻﺳﻜﻨﺪﺭﻳﻪ ﺍﻻﺑﺘﺪﺍﺋﻴﺔ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            185 => 
            array (
                'id' => 793,
                'name' => 'ﻣﺴﺘﺎﻧﻒ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            186 => 
            array (
                'id' => 794,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            187 => 
            array (
                'id' => 795,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            188 => 
            array (
                'id' => 796,
                'name' => 'ﺍﻟﻘﺴﻢ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            189 => 
            array (
                'id' => 797,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            190 => 
            array (
                'id' => 798,
                'name' => 'ﺩﻛﺮﻧﺲ ﺍﻟﺠﺰﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            191 => 
            array (
                'id' => 799,
                'name' => 'ﺟﻨﺢ ﻛﻔﺮ ﺍﻟﺰﻳﺎﺕ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            192 => 
            array (
                'id' => 800,
                'name' => 'ﺗﻨﻔﻴﺬ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            193 => 
            array (
                'id' => 801,
                'name' => 'ﺟﻨﺢ ﻗﺴﻢ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            194 => 
            array (
                'id' => 802,
                'name' => 'ﻣﻔﻮﺿﻴﻴﻦ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            195 => 
            array (
                'id' => 803,
                'name' => 'ﻣﺼﻠﺤﺔ ﺍﻟﻄﺐ ﺍﻟﺸﺮﻋﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            196 => 
            array (
                'id' => 804,
                'name' => 'ﺟﻨﺢ ﻣﺮﻛﺰ ﻣﺴﺘﺎﻧﻒ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            197 => 
            array (
                'id' => 805,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﻟﻤﻮﺳﻜﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            198 => 
            array (
                'id' => 806,
                'name' => 'ﺑﺪﺍﻭﻱ-ﺍﻟﺨﺒﺮﺍ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            199 => 
            array (
                'id' => 807,
                'name' => 'ﻣﺴﺘﺎﻧﻒ ﺷﺮﻋﻲ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            200 => 
            array (
                'id' => 808,
            'name' => 'ﻣﺎﻣﻮﺭﻳﺔ ﺍﺑﻮ ﺗﺸﺖ (ﺍﻟﻤﺎﻣﻮﺭﻳﺔ ﺍﻟﺠﺰﺋﻴﺔ) - ﺳﻮﻫﺎﺝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            201 => 
            array (
                'id' => 809,
                'name' => 'ﻣﺴﺘﺄﻧﻒ ﺑﻠﻘﺎﺱ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            202 => 
            array (
                'id' => 810,
                'name' => 'ﺍﻭﻝ ﺍﻟﻤﻨﺘﺰﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            203 => 
            array (
                'id' => 811,
                'name' => 'ﺟﻨﺢ ﺱ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            204 => 
            array (
                'id' => 812,
                'name' => 'ﺍﻟﻄﺐ ﺍﻟﺸﺮﻋﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            205 => 
            array (
                'id' => 813,
                'name' => 'ﺍﻟﻤﻨﺼﻮﺭﻩ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            206 => 
            array (
                'id' => 814,
                'name' => 'ﻡ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            207 => 
            array (
                'id' => 815,
                'name' => 'ﻣﺪﻧﻲ ﻣﺴﺘﺄﻧﻒ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            208 => 
            array (
                'id' => 816,
                'name' => 'ﺟﻨﺢ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            209 => 
            array (
                'id' => 817,
                'name' => 'ﺍﺳﺮﻩ ﻣﺪﻳﻨﻪ ﻧﺼﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            210 => 
            array (
                'id' => 818,
                'name' => 'ﺟﻨﺢ ﻛﻔﺮ ﺳﻌﺪ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            211 => 
            array (
                'id' => 819,
                'name' => 'ﺧﺒﺮﺍﺀ ﻗﻨﺎﻩ ﺍﻟﺴﻮﻳﺲ-ﺩﻣﻴﺎﻁ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            212 => 
            array (
                'id' => 820,
                'name' => 'ﻛﻔﺮ ﺳﻌﺪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            213 => 
            array (
                'id' => 821,
                'name' => 'ﺟﻨﺢ ﺍﻭﻝ ﻣﺴﺘﺄﻧﻒ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            214 => 
            array (
                'id' => 822,
                'name' => 'ﺍﻻﺳﺘﺌﻨﺎﻑ-ﺟﻨﺎﻳﺎﺕ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            215 => 
            array (
                'id' => 823,
                'name' => 'ﻣﺴﺘﺄﻧﻒ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            216 => 
            array (
                'id' => 824,
                'name' => 'ﺩﻛﺮﻧﺲ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            217 => 
            array (
                'id' => 825,
                'name' => 'ﻣﺪﻧﻰ ﻗﺴﻢ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            218 => 
            array (
                'id' => 826,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            219 => 
            array (
                'id' => 827,
                'name' => 'ﻃﻠﺨﺎ ﺍﻟﺠﺰﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            220 => 
            array (
                'id' => 828,
                'name' => 'ﻣﺪﻧﻲ ﻣﺴﺘﺎﻧﻒ ﺑﻠﻘﺎﺱ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            221 => 
            array (
                'id' => 829,
                'name' => 'ﺍﻟﻤﻨﺼﻮﺭﻩ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ ﺃﺳﺮﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            222 => 
            array (
                'id' => 830,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ ﺩﻛﺮﻧﺲ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            223 => 
            array (
                'id' => 831,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ ﻣﺮﻛﺰ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            224 => 
            array (
                'id' => 832,
                'name' => 'ﻣﺤﻜﻤﻪ ﻣﺪﻧﻲ ﺍﻟﻤﻨﺘﺰﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            225 => 
            array (
                'id' => 833,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            226 => 
            array (
                'id' => 834,
                'name' => 'ﺧﺒﺮﺍﺀ ﺗﻮﺭﻳﻞ-ﺑﺪﺍﻭﺍﻱ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            227 => 
            array (
                'id' => 835,
                'name' => 'ﻣﺪﻧﻲ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            228 => 
            array (
                'id' => 836,
            'name' => 'ﻣﺪﻧﻲ ﻛﻠﻲ (ﺍﻻﺳﺘﺎﺩ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            229 => 
            array (
                'id' => 837,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            230 => 
            array (
                'id' => 838,
                'name' => 'ﻣﺤﻜﻤﻪ ﻃﻠﺨﺎ ﺍﻟﺠﺰﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            231 => 
            array (
                'id' => 839,
                'name' => 'ﻣﺪﻧﻲ ﺍﻟﻤﻨﺘﺰﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            232 => 
            array (
                'id' => 840,
                'name' => 'ﺣﺒﺮﺍ ﺟﻨﻮﺏ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            233 => 
            array (
                'id' => 841,
                'name' => 'ﺧﺒﺮﺍﺀ ﺍﻟﻄﺐ ﺍﻟﺸﺮﻋﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            234 => 
            array (
                'id' => 842,
            'name' => 'ﻣﺤﻜﻤﺔ ﺍﻟﻤﻨﺘﺰﺓ ﺍﻟﺠﺰﺋﻴﺔ (ﺍﻟﻤﺤﻜﻤﺔ ﺍﻟﺠﺰﺋﻴﺔ) - ﺍﻹﺳﻜﻨﺪﺭﻳﺔ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            235 => 
            array (
                'id' => 843,
                'name' => 'ﺍﺳﺮﻩ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            236 => 
            array (
                'id' => 844,
                'name' => 'ﺱ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            237 => 
            array (
                'id' => 845,
                'name' => 'ﺧﺒﺮﺍ ﺷﻤﺎﻝ ﺍﻟﺪﻗﻬﻠﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            238 => 
            array (
                'id' => 846,
                'name' => 'ﺟﻨﺢ ﺱ ﻗﺼﺮ ﺍﻟﻨﻴﻞ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            239 => 
            array (
                'id' => 847,
                'name' => 'ﺟﻨﺢ ﻣﺮﻛﺰ ﺍﻟﺒﺤﺮ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            240 => 
            array (
                'id' => 848,
                'name' => 'ﻣﺴﺘﺄﻧﻒ ﺃﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            241 => 
            array (
                'id' => 849,
                'name' => 'ﺻﺤﻪ ﺗﻮﻗﻴﻊ ﺍﺟﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            242 => 
            array (
                'id' => 850,
                'name' => 'ﻣﺪﻧﻲ ﻗﺴﻢ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            243 => 
            array (
                'id' => 851,
                'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﻋﺎﻟﻲ ﺷﺮﻋﻲ -ﺍﻟﻤﺨﺘﻠﻂ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            244 => 
            array (
                'id' => 852,
                'name' => 'ﺍﻟﺘﺠﻤﻊ ﺍﻟﺨﺎﻣﺲ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            245 => 
            array (
                'id' => 853,
                'name' => 'ﻡ ﺟﺰﺋﻲ ﺩﻛﺮﻧﺲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            246 => 
            array (
                'id' => 854,
                'name' => 'ﻣﺤﻜﻤﻪ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            247 => 
            array (
                'id' => 855,
                'name' => 'ﺟﻨﺢ ﺍﻣﻦ ﺩﻭﻟﻪ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            248 => 
            array (
                'id' => 856,
                'name' => 'ﺍﻟﻤﺨﺘﻠﻂ-ﺍﻻﺳﺘﺎﺩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            249 => 
            array (
                'id' => 857,
                'name' => 'ﺟﻨﺢ ﺱ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            250 => 
            array (
                'id' => 858,
                'name' => 'ﺷﺮﻋﻲ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            251 => 
            array (
                'id' => 859,
                'name' => 'ﺳﻜﺮﺗﻴﺮ ﺩ/6 ﻣﺪﻧﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            252 => 
            array (
                'id' => 860,
                'name' => 'ﻡ ﻙ ﺩ/5',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            253 => 
            array (
                'id' => 861,
                'name' => 'ﻡ ﻙ -ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            254 => 
            array (
                'id' => 862,
                'name' => 'ﺍﻟﻤﺤﻠﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            255 => 
            array (
                'id' => 863,
                'name' => 'ﺧﺒﺮﺍﺀ ﺟﻨﻮﺏ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            256 => 
            array (
                'id' => 864,
                'name' => 'ﺧﺒﺮﺍﺀ ﻣﻴﺖ ﺣﺪﺭ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            257 => 
            array (
                'id' => 865,
                'name' => 'ﺍﻟﻤﻨﺘﺰﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            258 => 
            array (
                'id' => 866,
                'name' => 'ﺍﻟﺴﻨﻼﻭﻳﻦ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            259 => 
            array (
                'id' => 867,
                'name' => 'ﺍﻟﻌﺒﺎﺳﻴﻪ -ﻣﺼﺮ ﺍﻟﺠﺪﻳﺪﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            260 => 
            array (
                'id' => 868,
                'name' => 'ﻣﺪﻧﻲ ﻛﻠﻲ ﺑﻠﻘﺎﺱ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            261 => 
            array (
                'id' => 869,
                'name' => 'ﻧﻴﺎﺑﻪ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            262 => 
            array (
                'id' => 870,
                'name' => 'ﺟﻨﺢ ﺍﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            263 => 
            array (
                'id' => 871,
                'name' => 'ﻣﺴﺘﺎﻧﻒ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            264 => 
            array (
                'id' => 872,
                'name' => 'ﺱ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            265 => 
            array (
                'id' => 873,
                'name' => 'ﻛﻔﺮ ﺍﻟﺒﻄﻴﺦ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            266 => 
            array (
                'id' => 874,
                'name' => 'ﺷﺮﻋﻲ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            267 => 
            array (
                'id' => 875,
                'name' => 'ﻧﻴﺎﺑﻪ ﺗﺎﻥ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            268 => 
            array (
                'id' => 876,
                'name' => 'ﻣﺪﻧﻲ ﻛﻠﻲ ﺩ/5',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            269 => 
            array (
                'id' => 877,
                'name' => 'ﻣﺤﻜﻤﺔ ﺍﻻﺳﺘﺌﻨﺎﻑ ﺍﻟﻤﺨﺘﻠﻂ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            270 => 
            array (
                'id' => 878,
                'name' => 'ﻣﺠﻤﻊ ﻣﺤﺎﻛﻢ ﺍﻟﺒﺤﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            271 => 
            array (
                'id' => 879,
                'name' => 'ﻣﺴﺘﺎﻧﻒ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            272 => 
            array (
                'id' => 880,
                'name' => 'ﺟﻨﺢ ﺍﻟﺴﻴﺪﻩ ﺯﻳﻨﺐ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            273 => 
            array (
                'id' => 881,
                'name' => 'ﺳﻜﺮﺗﻴﺮ ﻣﺪﻧﻲ ﻛﻠﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            274 => 
            array (
                'id' => 882,
                'name' => 'ﻣﺪﻧﻲ ﻛﻠﻲ ﺍﻟﻤﺤﻜﻤﻪ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            275 => 
            array (
                'id' => 883,
                'name' => 'ﻣﺪﻧﻲ ﻣﺴﺘﺄﻧﻒ ﺍﺳﺘﺌﻨﺎﻑ ﻋﺎﻟﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            276 => 
            array (
                'id' => 884,
                'name' => 'ﻣﺤﻜﻤﻪ ﺩﻛﺮﻧﺲ ﺍﻟﺠﺰﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            277 => 
            array (
                'id' => 885,
                'name' => 'ﺷﺮﻋﻲ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            278 => 
            array (
                'id' => 886,
                'name' => 'ﺟﻨﺢ ﺃﻭﻝ ﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            279 => 
            array (
                'id' => 887,
                'name' => 'ﺟﻨﺢ ﺍﻭﻝ ﺩﻣﻴﺎﻁ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            280 => 
            array (
                'id' => 888,
                'name' => 'ﺻﺤﻪ ﺗﻮﻗﻴﻊ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            281 => 
            array (
                'id' => 889,
                'name' => 'ﻣﺤﻜﻤﻪ ﺑﻮﺭﺳﻌﻴﺪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            282 => 
            array (
                'id' => 890,
                'name' => 'ﻣﺠﻠﺲ ﺍﻟﺪﻭﻟﻪ ﺍﻟﺪﻗﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            283 => 
            array (
                'id' => 891,
                'name' => 'ﻣﺪﻧﻲ ﻣﺴﺘﺄﻧﻒ -ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            284 => 
            array (
                'id' => 892,
                'name' => 'ﻡ ﻣﺴﺘﺎﻧﻒ ﺍﻟﻤﺨﺘﻠﻂ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            285 => 
            array (
                'id' => 893,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﻻﺳﺮﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            286 => 
            array (
                'id' => 894,
                'name' => 'ﻣﺪﻧﻲ ﻛﻠﻲ ﺩ/5 ﺍﻻﺣﺪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            287 => 
            array (
                'id' => 895,
                'name' => 'ﺍﻟﻨﻴﺎﺑﻪ ﺍﻟﻜﻠﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            288 => 
            array (
                'id' => 896,
                'name' => 'ﻡ/ﺱ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            289 => 
            array (
                'id' => 897,
                'name' => 'ﻣﺤﻜﻤﻪ ﺩﻛﺮﻧﺲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            290 => 
            array (
                'id' => 898,
                'name' => 'ﺍﺳﺮﻩ ﺩﻛﺮﻧﺲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            291 => 
            array (
                'id' => 899,
                'name' => 'ﻣﺪﻧﻲ ﻗﺴﻢ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            292 => 
            array (
                'id' => 900,
                'name' => 'ﻣﺤﻜﻤﺔ ﺟﻨﺢ  ﺑﻠﻘﺎﺱ',
                'court_type_id' => 1,
                'court_level_id' => 4,
     'created_at' => NULL,
                'updated_at' => NULL,
            ),
            293 => 
            array (
                'id' => 901,
                'name' => 'ﻣﺪﻧﻲ ﺍﻟﺜﻼﺛﺎﺀ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            294 => 
            array (
                'id' => 902,
                'name' => 'ﺟﻨﺤﻤﺴﺘﺎﻧﻒ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            295 => 
            array (
                'id' => 903,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ ﺍﻭﻝ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            296 => 
            array (
                'id' => 904,
                'name' => 'ﺩ/8 ﺱ ﻉ ﺍﻳﺠﺎﺭﺍﺕ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            297 => 
            array (
                'id' => 905,
                'name' => 'ﺧﺒﺮﺍ ﺟﻨﻮﺏ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            298 => 
            array (
                'id' => 906,
                'name' => 'ﻗﻴﺎﺩﻩ ﺍﻟﺠﻴﺶ ﺍﻟﺘﺎﻧﻲ ﺍﻟﻤﻴﺪﺍﻧﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            299 => 
            array (
                'id' => 907,
                'name' => 'ﺧﺒﺮﺍﺀ ﺷﻤﺎﻝ ﺍﻟﺪﻗﻬﻠﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            300 => 
            array (
                'id' => 908,
                'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﻋﺎﻟﻲ ﺍﻟﻤﺨﺘﻠﻂ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            301 => 
            array (
                'id' => 909,
            'name' => 'ﻡ/ﺱ (ﺍﻻﺳﺘﺎﺩ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            302 => 
            array (
                'id' => 910,
                'name' => 'ﻣﺤﻜﻤﻪ ﺟﻨﺢ ﺩﻛﺮﻧﺲ',
                'court_type_id' => 1,
                'court_level_id' => 4,
     'created_at' => NULL,
                'updated_at' => NULL,
            ),
            303 => 
            array (
                'id' => 911,
                'name' => 'ﻗﺴﻢ ﺍﻭﻝ ﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            304 => 
            array (
                'id' => 912,
                'name' => 'ﻣﺤﻀﺮﻳﻦ ﻣﺠﻠﺲ ﺍﻟﺪﻭﻟﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            305 => 
            array (
                'id' => 913,
                'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﻋﺎﻟﻲ ﻣﺪﻧﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            306 => 
            array (
                'id' => 914,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﻟﻤﻨﺘﺰﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            307 => 
            array (
                'id' => 915,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺌﻨﺎﻑ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            308 => 
            array (
                'id' => 916,
                'name' => 'ﺱ ﻉ ﺩ/8',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            309 => 
            array (
                'id' => 917,
                'name' => 'ﺻﺤﻪ ﺗﻮﻗﻴﻊ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            310 => 
            array (
                'id' => 918,
                'name' => 'ﺍﻟﻤﺤﻜﻢ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            311 => 
            array (
                'id' => 919,
                'name' => 'ﻣﺠﻤﻊ ﺍﻟﺤﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            312 => 
            array (
                'id' => 920,
                'name' => 'ﺑﻨﺪﺭ ﺩﻣﻴﺎﻁ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            313 => 
            array (
                'id' => 921,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            314 => 
            array (
                'id' => 922,
                'name' => 'ﺍﻟﺪﻗﻲ-ﺍﻟﺠﻴﺰﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            315 => 
            array (
                'id' => 923,
                'name' => 'ﺷﺮﻋﻲ ﺍﻭﻝ ﻣﺴﺘﺎﻧﻒ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            316 => 
            array (
                'id' => 924,
                'name' => 'ﻣﺪﻳﺮﻳﻪ ﺍﻟﺰﺭﺍﻋﻪ-ﺍﻟﻮﺣﺪﻩ ﺍﻟﻤﺤﻠﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            317 => 
            array (
                'id' => 925,
                'name' => 'ﻣﺪﻧﻲ ﺩﻣﻴﺎﻁ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            318 => 
            array (
                'id' => 926,
                'name' => 'ﻣﺤﻀﺮﻳﻦ ﺷﻤﺎﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            319 => 
            array (
                'id' => 927,
                'name' => 'ﻣﺪﻧﻲ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            320 => 
            array (
                'id' => 928,
                'name' => 'ﻡ ﻙ ﺩ/8',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            321 => 
            array (
                'id' => 929,
                'name' => 'ﺟﻨﺢ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            322 => 
            array (
                'id' => 930,
                'name' => 'ﻣﺴﺘﺄﻧﻒ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            323 => 
            array (
                'id' => 931,
            'name' => 'ﺧﺒﺮﺍﺀ ﺷﻤﺎ(ﻋﻤﺎﺭﻩ ﺍﻻﻭﻗﺎﻑ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            324 => 
            array (
                'id' => 932,
                'name' => 'ﻣﺴﺘﺎﻧﻒ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            325 => 
            array (
                'id' => 933,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﻻﺳﺘﺌﻨﺎﻑ ﺍﻟﻌﺎﻟﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            326 => 
            array (
                'id' => 934,
                'name' => 'ﻣﺪﻧﻲ ﻗﺴﻢ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            327 => 
            array (
                'id' => 935,
                'name' => 'ﺟﻨﺢ ﺱ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            328 => 
            array (
                'id' => 936,
                'name' => 'ﺍﻟﺒﺤﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            329 => 
            array (
                'id' => 937,
                'name' => 'ﻣﺪﻧﻲ ﺩ/5',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            330 => 
            array (
                'id' => 938,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺌﻨﺎﻑ ﺛﺎﻥ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            331 => 
            array (
                'id' => 939,
                'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﻋﺎﻟﻲ ﺷﺮﻋﻲ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            332 => 
            array (
                'id' => 940,
                'name' => 'ﺍﻟﺪﻗﻲ-ﻣﺠﻠﺲ ﺍﻟﺪﻭﻟﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            333 => 
            array (
                'id' => 941,
                'name' => 'ﺍﻟﻀﺮﺍﻳﺐ ﺍﻟﻌﺎﻣﻪ ﺑﺎﻟﻘﺎﻫﺮﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            334 => 
            array (
                'id' => 942,
            'name' => 'ﻣﺤﻜﻤﺔ ﺍﻟﻤﻨﺼﻮﺭﺓ ﺍﻻﺑﺘﺪﺍﺋﻴﺔ (ﺍﻟﻤﺤﻜﻤﺔ ﺍﻻﺑﺘﺪﺍﺋﻴﺔ) - ﺍﻟﺪﻗﻬﻠﻴﺔ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            335 => 
            array (
                'id' => 943,
                'name' => 'ﻣﺴﺘﺄﻧﻒ ﺍﻭﻝ ﺟﺰﺋﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            336 => 
            array (
                'id' => 944,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﻟﻤﺪﻳﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            337 => 
            array (
                'id' => 945,
                'name' => 'ﺟﻨﺢ  ﺍﻭﻝ ﺩﻣﻴﺎﻁ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            338 => 
            array (
                'id' => 946,
                'name' => 'ﻣﺴﺘﺌﺎﻧﻒ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            339 => 
            array (
                'id' => 947,
                'name' => 'ﺧﺒﺮﺍﺀﺷﻤﺎﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            340 => 
            array (
                'id' => 948,
                'name' => 'ﺩ/8 ﺍﺳﺘﺌﻨﺎﻑ ﻣﺪﻧﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            341 => 
            array (
                'id' => 949,
                'name' => 'ﻣﺤﻜﻤﺔ ﺟﻨﺎﻳﺎﺕ ﺛﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            342 => 
            array (
                'id' => 950,
                'name' => 'ﺍﻻﺳﺘﺌﻨﺎﻑ ﺍﻟﻌﺎﻟﻲ ﻭﻣﺤﻀﺮﻳﻦ ﻗﺴﻢ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            343 => 
            array (
                'id' => 951,
            'name' => 'ﻡ ﻙ (ﺩ/8)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            344 => 
            array (
                'id' => 952,
                'name' => 'ﻣﺪﻧﻲ ﻣﺴﺘﺄﻧﻒ ﺍﻟﻤﺨﺘﻠﻂ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            345 => 
            array (
                'id' => 953,
                'name' => 'ﺟﻨﺢ ﻗﺴﻢ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            346 => 
            array (
                'id' => 954,
                'name' => 'ﺗﻮﺭﻳﻞ ﺍﻟﺠﺪﻳﺪﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            347 => 
            array (
                'id' => 955,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ ﺛﺎﻧﻰ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            348 => 
            array (
                'id' => 956,
            'name' => 'ﻣﺤﻜﻤﺔ ﺣﻠﻮﺍﻥ ﺍﻻﺑﺘﺪﺍﺋﻴﺔ (ﺍﻟﻤﺤﻜﻤﺔ ﺍﻻﺑﺘﺪﺍﺋﻴﺔ) - ﺍﻟﻘﺎﻫﺮﺓ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            349 => 
            array (
                'id' => 957,
                'name' => 'ﺍﺳﺮﺓ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            350 => 
            array (
                'id' => 958,
                'name' => 'ﻣﺴﺘﺌﻨﺎﻑ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            351 => 
            array (
                'id' => 959,
                'name' => 'ﺩ/8 ﺍﻳﺠﺎﺭﺍﺕ ﺱ ﻉ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            352 => 
            array (
                'id' => 960,
                'name' => 'ﻡ ﻙ ﺩ/5 ﺍﻟﺴﺒﺖ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            353 => 
            array (
                'id' => 961,
                'name' => 'ﻡ ﻣﺴﺘﺄﻧﻒ ﺑﻠﻘﺎﺱ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            354 => 
            array (
                'id' => 962,
                'name' => 'ﻣﺪﻧﻰ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            355 => 
            array (
                'id' => 963,
                'name' => 'ﺍﻟﻘﺎﻫﺮﻩ ﺍﻟﺠﺪﻳﺪﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            356 => 
            array (
                'id' => 964,
            'name' => 'ﻣﺤﻜﻤﺔ ﺩﻛﺮﻧﺲ ﺍﻟﺠﺰﺋﻴﺔ (ﺍﻟﻤﺤﻜﻤﺔ ﺍﻟﺠﺰﺋﻴﺔ) - ﺍﻟﺪﻗﻬﻠﻴﺔ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            357 => 
            array (
                'id' => 965,
                'name' => 'ﺍﻳﺠﺎﺭﺍﺕ ﺩ/3',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            358 => 
            array (
                'id' => 966,
                'name' => 'ﺍﻟﺴﻨﺒﻼﻭﻳﻦ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            359 => 
            array (
                'id' => 967,
                'name' => 'ﺑﺪﻳﻦ-ﺧﺒﺮﺍﺀ ﺟﻨﻮﺏ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            360 => 
            array (
                'id' => 968,
                'name' => 'ﻣﺪﻧﻲ ﺟﺰﺋﻲ ﺍﻟﻤﻨﺘﺰﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            361 => 
            array (
                'id' => 969,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﺳﺮﻩ ﺍﻭﻝ ﻣﺪﻳﻨﻪ ﻧﺼﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            362 => 
            array (
                'id' => 970,
                'name' => 'ﺟﻨﺢ  ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            363 => 
            array (
                'id' => 971,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﻟﻨﻘﺾ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            364 => 
            array (
                'id' => 972,
                'name' => 'ﻣﺪﻧﻲ ﺍﻭﻝ ﻣﺪﻳﻨﻪ ﻧﺼﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            365 => 
            array (
                'id' => 973,
                'name' => 'ﺍﻟﻤﻨﺘﺰﻩ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            366 => 
            array (
                'id' => 974,
                'name' => 'ﺱ ﺍﻭﻝ ﺍﻻﺳﺘﺎﺩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            367 => 
            array (
                'id' => 975,
                'name' => 'ﻣﻜﺘﺐ ﺧﺒﺮﺍﺀ ﺷﻤﺎﻝ ﺣﻲ ﺍﻟﺠﺎﻣﻌﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            368 => 
            array (
                'id' => 976,
                'name' => 'ﻣﺪﻧﻲ ﻣﺴﺘﺄﻧﻒ ﺑﺎﻟﻤﺤﻜﻤﻪ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            369 => 
            array (
                'id' => 977,
                'name' => 'ﺍﻣﻦ ﺩﻭﻟﻪ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            370 => 
            array (
                'id' => 978,
                'name' => 'ﺷﺮﻋﻲ ﻗﺴﻢ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            371 => 
            array (
                'id' => 979,
                'name' => 'ﺍﻣﻦ ﺩﻭﻟﻪ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            372 => 
            array (
                'id' => 980,
            'name' => 'ﻣﺪﻧﻲ(ﺍﻻﺳﺘﺎﺩ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            373 => 
            array (
                'id' => 981,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            374 => 
            array (
                'id' => 982,
                'name' => 'ﺟﻨﺢ ﺳﻤﻨﻮﺩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            375 => 
            array (
                'id' => 983,
                'name' => 'ﺷﺮﻋﻲ ﺍﺳﺮﻩ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            376 => 
            array (
                'id' => 984,
                'name' => 'ﺟﺪﻭﻝ ﺍﻟﻤﺪﻧﻲ ﻟﻤﺤﻜﻤﻪ ﺍﻻﺳﻜﻨﺪﺭﻳﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            377 => 
            array (
                'id' => 985,
                'name' => 'ﻣﺮﻛﺰ ﺍﺟﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            378 => 
            array (
                'id' => 986,
                'name' => 'ﺍﻻﺻﻼﺡ ﺍﻟﺰﺭﺍﻋﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            379 => 
            array (
                'id' => 987,
                'name' => 'ﻃﺐ ﺷﺮﻋﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            380 => 
            array (
                'id' => 988,
                'name' => 'ﻣﺴﺘﺄﻧﻒ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            381 => 
            array (
                'id' => 989,
                'name' => 'ﺟﻨﺢ ﺍﻣﻦ ﺩﻭﻟﻪ ﺗﺎﻥ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            382 => 
            array (
                'id' => 990,
                'name' => 'ﺍﻻﺳﺘﺌﻨﺎﻑ ﺍﻟﻌﺎﻟﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            383 => 
            array (
                'id' => 991,
                'name' => 'ﺣﻠﻮﺍﻥ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            384 => 
            array (
                'id' => 992,
                'name' => 'ﺗﻨﻔﻴﺬ ﻧﻴﺎﺑﻪ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            385 => 
            array (
                'id' => 993,
                'name' => 'ﺍﻟﻤﺨﺘﻠﻂ-ﺍﻟﺒﺤﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            386 => 
            array (
                'id' => 994,
            'name' => 'ﺍﻻﻣﻮﺭﺍﻟﻤﺴﺘﻌﺠﻠﻪ (ﺍﻻ ﺳﺘﺎﺩ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            387 => 
            array (
                'id' => 995,
                'name' => 'ﺍﻻﺳﺘﻴﻔﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            388 => 
            array (
                'id' => 996,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﻟﺠﻨﺢ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            389 => 
            array (
                'id' => 997,
                'name' => 'ﻣﺪﻧﻲ ﻗﺴﻢ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            390 => 
            array (
                'id' => 998,
                'name' => 'ﻣﺪﻧﻲ ﺩﻛﺮﻧﺲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            391 => 
            array (
                'id' => 999,
                'name' => 'ﻣﻜﺘﺐ ﺧﺒﺮﺍﺀ ﻣﻴﺖ ﺣﺪﺭ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            392 => 
            array (
                'id' => 1000,
                'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﻋﺎﻟﻲ ﺷﺮﻋﻲ ﺩ/11',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            393 => 
            array (
                'id' => 1001,
                'name' => 'ﺍﺳﺮﻩ ﺍﻭﻝ ﻣﺪﻳﻨﻪ ﻧﺼﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            394 => 
            array (
                'id' => 1002,
                'name' => 'ﺍﻻﺳﺘﺎﺩﺝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            395 => 
            array (
                'id' => 1003,
                'name' => 'ﻣﺤﻜﻤﺔ ﺟﻨﺢ ﻣﺘﺎﻧﻒ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_id' => 4,
     'created_at' => NULL,
                'updated_at' => NULL,
            ),
            396 => 
            array (
                'id' => 1004,
                'name' => 'ﺧﺒﺮﺍﺀ ﻣﺠﻠﺲ ﺍﻟﺪﻭﻟﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            397 => 
            array (
                'id' => 1005,
                'name' => 'ﻣﻨﺎﻗﺸﻪ ﺧﺒﺮﺍﺀ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            398 => 
            array (
                'id' => 1006,
                'name' => 'ﺍﺳﺘﺌﻨﺎﻑ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            399 => 
            array (
                'id' => 1007,
                'name' => 'ﻣﺪﻧﻲ ﻣﺴﺘﺄﻧﻒ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            400 => 
            array (
                'id' => 1008,
                'name' => 'ﻣﺪﻧﻲ ﺍﻟﻮﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            401 => 
            array (
                'id' => 1009,
                'name' => 'ﺻﺤﻪ ﺗﻮﻗﻴﻪ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            402 => 
            array (
                'id' => 1010,
                'name' => 'ﺩﻛﺮﻧﺲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            403 => 
            array (
                'id' => 1011,
                'name' => 'ﺍﺳﺮﻩ ﺗﺎﻥ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            404 => 
            array (
                'id' => 1012,
                'name' => 'ﻣﺪﻧﻲ ﺍ ﻳﺠﺎ ﺭﺍﺕ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            405 => 
            array (
                'id' => 1013,
                'name' => 'ﺟﻨﺢ ﺩﻛﺮﻧﺲ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            406 => 
            array (
                'id' => 1014,
                'name' => 'ﻣﺪﻧﻲ ﺑﻠﻘﺎﺱ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            407 => 
            array (
                'id' => 1015,
            'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﻋﺎﻟﻲ ﻣﺪﻧﻲ(ﺍﻟﻤﺨﺘﻠﻂ)',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            408 => 
            array (
                'id' => 1016,
                'name' => 'ﻣﺤﻜﻤﺔ ﻣﺴﺘﺌﺎﻧﻒ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            409 => 
            array (
                'id' => 1017,
                'name' => 'ﺍﺩﺍﺭﻯ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            410 => 
            array (
                'id' => 1018,
                'name' => 'ﺟﻨﺢ ﺍﻭﻝ ﺍﻟﻤﻨﺘﺰﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            411 => 
            array (
                'id' => 1019,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            412 => 
            array (
                'id' => 1020,
                'name' => 'ﺟﻨﺢ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            413 => 
            array (
                'id' => 1021,
                'name' => 'ﺧﺒﺮﺍ ﻣﺤﺮﻡ ﺑﻴﻚ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            414 => 
            array (
                'id' => 1022,
                'name' => 'ﺍﻟﻤﺤﻜﻤﻪ ﺍﻟﺠﺰﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            415 => 
            array (
                'id' => 1023,
                'name' => 'ﻣﺴﺖ؟ﺃﻧﻒ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            416 => 
            array (
                'id' => 1024,
                'name' => 'ﻡ ﻙ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            417 => 
            array (
                'id' => 1025,
                'name' => 'ﺷﺮﻋﻲ  ﻣﺴﺘﺄﻧﻒ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            418 => 
            array (
                'id' => 1026,
                'name' => 'ﺟﻨﺢ ﺱ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            419 => 
            array (
                'id' => 1027,
                'name' => 'ﻣﺤﻜﻤﺔ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﺓ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            420 => 
            array (
                'id' => 1028,
                'name' => 'ﺟﻨﺎﻳﺎﺕ ﺍﻻﺯﺑﻜﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            421 => 
            array (
                'id' => 1029,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺌﻨﺎﻑ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            422 => 
            array (
                'id' => 1030,
                'name' => 'ﻣﺤﻜﻤﻪ ﻣﺪﻳﻨﻪ ﻧﺼﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            423 => 
            array (
                'id' => 1031,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺄﻧﻒ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            424 => 
            array (
                'id' => 1032,
                'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﻋﺎﻟﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            425 => 
            array (
                'id' => 1033,
                'name' => 'ﺍﻻﺳﺘﺌﻨﺎﻑ ﺍﻟﻌﺎﻟﻲ ﺑﺎﻟﻤﺨﺘﻠﻂ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            426 => 
            array (
                'id' => 1034,
                'name' => 'ﺻﺤﻪ ﺗﻮﻗﻴﻊ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            427 => 
            array (
                'id' => 1035,
                'name' => 'ﻣﺪﻧﻲ ﻛﻔﺮ ﺍﻟﺰﻳﺎﺕ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            428 => 
            array (
                'id' => 1036,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺎﻧﻒ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            429 => 
            array (
                'id' => 1037,
                'name' => 'null',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            430 => 
            array (
                'id' => 1038,
                'name' => 'ﺍﻟﻨﻴﺎﺑﻪ ﺍﻟﻌﺎﻣﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            431 => 
            array (
                'id' => 1039,
                'name' => 'ﻣﺪﻧﻲ ﺟﺰﺋﻲ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            432 => 
            array (
                'id' => 1040,
                'name' => 'ﺟﻨﺢ ﻗﺼﺮ ﺍﻟﻨﻴﻞ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            433 => 
            array (
                'id' => 1041,
                'name' => 'ﺍﻻﺩﺍﺭﻳﻪ ﺍﻟﻌﻠﻴﺎ-ﻣﺠﻠﺲ ﺍﻟﺪﻭﻟﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            434 => 
            array (
                'id' => 1042,
                'name' => 'ﺍﻻﺳﺘﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            435 => 
            array (
                'id' => 1043,
                'name' => 'ﺍﺳﺮﻩ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            436 => 
            array (
                'id' => 1044,
                'name' => 'ﻣﺴﺘﺄﻧﻒ ﺗﺎﻟﻦ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            437 => 
            array (
                'id' => 1045,
                'name' => 'ﻣﺪﻧﻲ ﻣﻴﺖ ﻏﻤﺮ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            438 => 
            array (
                'id' => 1046,
                'name' => 'ﻗﺴﻢ ﺍﻭﻝ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            439 => 
            array (
                'id' => 1047,
                'name' => 'ﻡ.ﻙ  ﺍﻟﺴﺒﺖ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            440 => 
            array (
                'id' => 1048,
                'name' => 'ﻣﺪﻧﻲ ﻣﺮﻛﺰ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            441 => 
            array (
                'id' => 1049,
                'name' => 'ﻣﺤﻜﻤﻪ ﺍﻟﻨﻘﺾ ﺑﺎﻟﻘﺎﻫﺮﻩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            442 => 
            array (
                'id' => 1050,
                'name' => 'ﺷﺮﻕ ﺍﻟﻤﺤﻠﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            443 => 
            array (
                'id' => 1051,
                'name' => 'ﺍﻟﺪﺧﻴﻠﻪ-ﺍﻻﺳﻜﻨﺪﺭﻳﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            444 => 
            array (
                'id' => 1052,
                'name' => 'ﻃﺨﺎ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            445 => 
            array (
                'id' => 1053,
                'name' => 'ﺟﻨﺢ ﻃﻨﻄﺎ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            446 => 
            array (
                'id' => 1054,
                'name' => 'ﺱ ﻉ ﺍﻟﻤﺨﺘﻠﻂ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            447 => 
            array (
                'id' => 1055,
                'name' => 'ﺟﻨﺢ ﺍﻟﺴﻨﺒﻼﻭﻳﻦ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            448 => 
            array (
                'id' => 1056,
                'name' => 'ﺍﺳﺘﺌﻨﺎﻑ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            449 => 
            array (
                'id' => 1057,
                'name' => 'ﻣﺪﻧﻲ ﻛﻠﻲ ﺍﻟﻤﻨﺼﻮﺭﻩ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            450 => 
            array (
                'id' => 1058,
                'name' => 'ﻧﻴﺎﺑﻪ ﻣﺮﻛﺰ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            451 => 
            array (
                'id' => 1059,
                'name' => 'ﺟﻨﺢ ﻣﺴﺘﺌﻨﺎﻑ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            452 => 
            array (
                'id' => 1060,
                'name' => 'ﺟﻨﺢ ﺃﻭﻝ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            453 => 
            array (
                'id' => 1061,
                'name' => 'ﻡ ﻙ ﺍﻻﺑﺘﺪﺍﺋﻴﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            454 => 
            array (
                'id' => 1062,
                'name' => 'ﺍﻟﻤﺤﻜﻤﻪ ﺍﻻﻗﺘﺼﺎﺩﻳﻪ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            455 => 
            array (
                'id' => 1063,
                'name' => 'ﺟﻨﺢ ﻃﻠﺨﺎ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            456 => 
            array (
                'id' => 1064,
                'name' => 'ﻣﺴﺘﺎﻧﻒ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            457 => 
            array (
                'id' => 1065,
                'name' => 'ﻣﺪﻧﻰ ﻗﺴﻢ ﺍﻭﻝ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            458 => 
            array (
                'id' => 1066,
                'name' => 'ﺍﻻﺳﺘﺎﺩ',
                'court_type_id' => 1,
                'court_level_id' => 1,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            459 => 
            array (
                'id' => 1067,
                'name' => 'ﺟﻨﺢ ﺱ ﺍﻟﻤﻨﺼﻮﺭﻩ',
                'court_type_id' => 1,
                'court_level_i4' => 4,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));
        
        
    }
}