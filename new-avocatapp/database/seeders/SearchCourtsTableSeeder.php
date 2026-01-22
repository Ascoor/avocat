<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class SearchCourtsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('search_courts')->delete();
        
        \DB::table('search_courts')->insert(array (
            0 => 
            array (
                'id' => 1,
                'degree_value' => '2',
                'court_name' => 'محكمة استئناف القاهرة',
                'court_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'degree_value' => '2',
                'court_name' => 'محكمة إستئناف الاسكندرية',
                'court_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'degree_value' => '2',
                'court_name' => 'محكمة أستئناف المنصورة',
                'court_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'degree_value' => '2',
                'court_name' => 'محكمة أستئناف طنطا',
                'court_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 5,
                'degree_value' => '2',
                'court_name' => 'محكمة استئناف الاسماعيلية',
                'court_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            5 => 
            array (
                'id' => 6,
                'degree_value' => '2',
                'court_name' => 'محكمة استئناف اسيوط',
                'court_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            6 => 
            array (
                'id' => 7,
                'degree_value' => '2',
                'court_name' => 'محكمة إستئناف قنا',
                'court_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            7 => 
            array (
                'id' => 8,
                'degree_value' => '2',
                'court_name' => 'مامورية استئناف مطروح',
                'court_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            8 => 
            array (
                'id' => 9,
                'degree_value' => '2',
                'court_name' => 'مامورية استئناف بورسعيد',
                'court_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            9 => 
            array (
                'id' => 10,
                'degree_value' => '2',
                'court_name' => 'مامورية استئناف السويس',
                'court_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            10 => 
            array (
                'id' => 11,
                'degree_value' => '2',
                'court_name' => 'مامورية استئناف التل الكبير',
                'court_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            11 => 
            array (
                'id' => 12,
                'degree_value' => '2',
                'court_name' => 'مامورية استئناف الطور',
                'court_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            12 => 
            array (
                'id' => 13,
                'degree_value' => '2',
                'court_name' => 'محكمة استئناف اسرة الاسماعليلية',
                'court_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            13 => 
            array (
                'id' => 14,
                'degree_value' => '2',
                'court_name' => 'مامورية استئناف اسرة بورسعيد',
                'court_value' => '17',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            14 => 
            array (
                'id' => 15,
                'degree_value' => '2',
                'court_name' => 'ماموريه استئناف الفيوم',
                'court_value' => '18',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            15 => 
            array (
                'id' => 16,
                'degree_value' => '2',
                'court_name' => 'مامورية استئناف البحر الاحمر',
                'court_value' => '20',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            16 => 
            array (
                'id' => 17,
                'degree_value' => '2',
                'court_name' => 'ماموريه استئناف شمال القاهره',
                'court_value' => '21',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            17 => 
            array (
                'id' => 18,
                'degree_value' => '2',
                'court_name' => 'محكمه استناف اسره القاهره',
                'court_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            18 => 
            array (
                'id' => 19,
                'degree_value' => '2',
                'court_name' => 'ماموريه استئناف التجمع لشئون الاسره',
                'court_value' => '31',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            19 => 
            array (
                'id' => 20,
                'degree_value' => '2',
                'court_name' => 'ماموريه استئناف المحله',
                'court_value' => '32',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            20 => 
            array (
                'id' => 21,
                'degree_value' => '2',
                'court_name' => 'ماموريه استئناف دمياط',
                'court_value' => '43',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            21 => 
            array (
                'id' => 22,
                'degree_value' => '2',
                'court_name' => 'ماموريه استئناف الزقازيق',
                'court_value' => '44',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            22 => 
            array (
                'id' => 23,
                'degree_value' => '2',
                'court_name' => 'مأموريه استئناف دمنهور',
                'court_value' => '45',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            23 => 
            array (
                'id' => 24,
                'degree_value' => '3',
                'court_name' => 'محكمة شمال القاهرة الابتدائية',
                'court_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            24 => 
            array (
                'id' => 25,
                'degree_value' => '3',
                'court_name' => 'محكمة جنوب القاهرة الابتدائية',
                'court_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            25 => 
            array (
                'id' => 26,
                'degree_value' => '3',
                'court_name' => 'محكمة شمال الجيزة الابتدائية',
                'court_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            26 => 
            array (
                'id' => 27,
                'degree_value' => '3',
                'court_name' => 'محكمة شرق اسكندرية الابتدائية',
                'court_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            27 => 
            array (
                'id' => 28,
                'degree_value' => '3',
                'court_name' => 'محكمة شمال دمنهور الابتدائية',
                'court_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            28 => 
            array (
                'id' => 29,
                'degree_value' => '3',
                'court_name' => 'محكمة غرب طنطا الابتدائية',
                'court_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            29 => 
            array (
                'id' => 30,
                'degree_value' => '3',
                'court_name' => 'محكمة الاسماعيلية الابتدائية',
                'court_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            30 => 
            array (
                'id' => 31,
                'degree_value' => '3',
                'court_name' => 'محكمة جنوب الزقازيق الابتدائية',
                'court_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            31 => 
            array (
                'id' => 32,
                'degree_value' => '3',
                'court_name' => 'محكمة جنوب المنصورة الابتدائية',
                'court_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            32 => 
            array (
                'id' => 33,
                'degree_value' => '3',
                'court_name' => 'محكمة السويس الابتدائية',
                'court_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            33 => 
            array (
                'id' => 34,
                'degree_value' => '3',
                'court_name' => 'محكمة كفر الشيخ الابتدائية',
                'court_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            34 => 
            array (
                'id' => 35,
                'degree_value' => '3',
                'court_name' => 'محكمة شمال بنها الأبتدائية',
                'court_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            35 => 
            array (
                'id' => 36,
                'degree_value' => '3',
                'court_name' => 'محكمة شبين الكوم الابتدائية',
                'court_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            36 => 
            array (
                'id' => 37,
                'degree_value' => '3',
                'court_name' => 'محكمة الفيوم الابتدائية',
                'court_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            37 => 
            array (
                'id' => 38,
                'degree_value' => '3',
                'court_name' => 'محكمة بنى سويف الابتدائية',
                'court_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            38 => 
            array (
                'id' => 39,
                'degree_value' => '3',
                'court_name' => 'محكمة المنيا الابتدائية',
                'court_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            39 => 
            array (
                'id' => 40,
                'degree_value' => '3',
                'court_name' => 'محكمة سوهاج الابتدائية',
                'court_value' => '18',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            40 => 
            array (
                'id' => 41,
                'degree_value' => '3',
                'court_name' => 'محكمة شمال سيناء الابتدائية',
                'court_value' => '22',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            41 => 
            array (
                'id' => 42,
                'degree_value' => '3',
                'court_name' => 'محكمة جنوب سيناء الابتدائية',
                'court_value' => '23',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            42 => 
            array (
                'id' => 43,
                'degree_value' => '3',
                'court_name' => 'محكمة حلوان الابتدائية',
                'court_value' => '24',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            43 => 
            array (
                'id' => 44,
                'degree_value' => '3',
                'court_name' => 'محكمة القاهرة الجديدة الابتدائية',
                'court_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            44 => 
            array (
                'id' => 45,
                'degree_value' => '3',
                'court_name' => 'محكمه جنوب الجيزة الابتدائيه',
                'court_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            45 => 
            array (
                'id' => 46,
                'degree_value' => '3',
                'court_name' => 'محكمة جنوب بنها الأبتدائية',
                'court_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            46 => 
            array (
                'id' => 47,
                'degree_value' => '3',
                'court_name' => 'محكمة شمال الزقازيق الابتدائية',
                'court_value' => '29',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            47 => 
            array (
                'id' => 48,
                'degree_value' => '3',
                'court_name' => 'محكمة غرب اسكندرية الابتدائية',
                'court_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            48 => 
            array (
                'id' => 49,
                'degree_value' => '3',
                'court_name' => 'محكمة مرسى مطروح الابتدائية',
                'court_value' => '31',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            49 => 
            array (
                'id' => 50,
                'degree_value' => '3',
                'court_name' => 'محكمة شرق طنطا الأبتدائية',
                'court_value' => '33',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            50 => 
            array (
                'id' => 51,
                'degree_value' => '3',
                'court_name' => 'محكمة بورسعيد الابتدائية',
                'court_value' => '34',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            51 => 
            array (
                'id' => 52,
                'degree_value' => '3',
                'court_name' => 'محكمة البحر الاحمر الابتدائية',
                'court_value' => '36',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            52 => 
            array (
                'id' => 53,
                'degree_value' => '3',
                'court_name' => 'محكمة الوادى الجديد الابتدائية',
                'court_value' => '38',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            53 => 
            array (
                'id' => 54,
                'degree_value' => '4',
                'court_name' => 'محكمة المنتزة الجزئية',
                'court_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            54 => 
            array (
                'id' => 55,
                'degree_value' => '4',
                'court_name' => 'محكمة العطارين الجزئية',
                'court_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            55 => 
            array (
                'id' => 56,
                'degree_value' => '4',
                'court_name' => 'محكمة الرمل الجزئية',
                'court_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            56 => 
            array (
                'id' => 57,
                'degree_value' => '4',
                'court_name' => 'محكمة محرم بك الجزئية',
                'court_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            57 => 
            array (
                'id' => 58,
                'degree_value' => '4',
                'court_name' => 'محكمة الدخيلة الجزئية',
                'court_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            58 => 
            array (
                'id' => 59,
                'degree_value' => '4',
                'court_name' => 'محكمة العامرية الجزئية',
                'court_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            59 => 
            array (
                'id' => 60,
                'degree_value' => '4',
                'court_name' => 'محكمة برج العرب الجزئية',
                'court_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            60 => 
            array (
                'id' => 61,
                'degree_value' => '4',
                'court_name' => 'محكمة المنشية الجزئية',
                'court_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            61 => 
            array (
                'id' => 62,
                'degree_value' => '4',
                'court_name' => 'محكمة سيدى جابر الجزئية',
                'court_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            62 => 
            array (
                'id' => 63,
                'degree_value' => '4',
                'court_name' => 'محكمة كرموز الجزئية',
                'court_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            63 => 
            array (
                'id' => 64,
                'degree_value' => '4',
                'court_name' => 'محكمة مينا البصل الجزئية',
                'court_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            64 => 
            array (
                'id' => 65,
                'degree_value' => '4',
                'court_name' => 'محكمة الجمرك الجزئية',
                'court_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            65 => 
            array (
                'id' => 66,
                'degree_value' => '4',
                'court_name' => 'محكمة باب شرقى الجزئية',
                'court_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            66 => 
            array (
                'id' => 67,
                'degree_value' => '4',
                'court_name' => 'محكمة حوش عيسى الجزئية',
                'court_value' => '21',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            67 => 
            array (
                'id' => 68,
                'degree_value' => '4',
                'court_name' => 'محكمة بندر دمنهور الجزئية',
                'court_value' => '28',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            68 => 
            array (
                'id' => 69,
                'degree_value' => '4',
                'court_name' => 'محكمة الوايلى الجزئية',
                'court_value' => '32',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            69 => 
            array (
                'id' => 70,
                'degree_value' => '4',
                'court_name' => 'محكمة الازبكية الجزئية',
                'court_value' => '33',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            70 => 
            array (
                'id' => 71,
                'degree_value' => '4',
                'court_name' => 'محكمة شبرا الجزئية',
                'court_value' => '34',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            71 => 
            array (
                'id' => 72,
                'degree_value' => '4',
                'court_name' => 'محكمة الزيتون الجزئية',
                'court_value' => '35',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            72 => 
            array (
                'id' => 73,
                'degree_value' => '4',
                'court_name' => 'محكمة مصر الجديدة الجزئية',
                'court_value' => '36',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            73 => 
            array (
                'id' => 74,
                'degree_value' => '4',
                'court_name' => 'محكمة مدينة نصرالجزئية',
                'court_value' => '37',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            74 => 
            array (
                'id' => 75,
                'degree_value' => '4',
                'court_name' => 'محكمة بولاق الجزئية',
                'court_value' => '38',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            75 => 
            array (
                'id' => 76,
                'degree_value' => '4',
                'court_name' => 'محكمة روض الفرج الجزئية',
                'court_value' => '39',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            76 => 
            array (
                'id' => 77,
                'degree_value' => '4',
                'court_name' => 'المحكمة التجارية الجزئية',
                'court_value' => '40',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            77 => 
            array (
                'id' => 78,
                'degree_value' => '4',
                'court_name' => 'محكمة عين شمس الجزئية',
                'court_value' => '42',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            78 => 
            array (
                'id' => 79,
                'degree_value' => '4',
                'court_name' => 'محكمة الشرابية الجزئية',
                'court_value' => '43',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            79 => 
            array (
                'id' => 80,
                'degree_value' => '4',
                'court_name' => 'محكمة القاهرة الجديدة الجزئية',
                'court_value' => '44',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            80 => 
            array (
                'id' => 81,
                'degree_value' => '4',
                'court_name' => 'محكمة المطريةالجزئية',
                'court_value' => '45',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            81 => 
            array (
                'id' => 82,
                'degree_value' => '4',
                'court_name' => 'محكمة المرج الجزئية',
                'court_value' => '46',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            82 => 
            array (
                'id' => 83,
                'degree_value' => '4',
                'court_name' => 'محكمة السلام الجزئية',
                'court_value' => '47',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            83 => 
            array (
                'id' => 84,
                'degree_value' => '4',
                'court_name' => 'محكمة الدرب الاحمر الجزئية',
                'court_value' => '48',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            84 => 
            array (
                'id' => 85,
                'degree_value' => '4',
                'court_name' => 'محكمة الخليفة الجزئية',
                'court_value' => '49',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            85 => 
            array (
                'id' => 86,
                'degree_value' => '4',
                'court_name' => 'محكمة مصر القديمة الجزئية',
                'court_value' => '50',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            86 => 
            array (
                'id' => 87,
                'degree_value' => '4',
                'court_name' => 'محكمة السيدة زينب الجزئية',
                'court_value' => '51',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            87 => 
            array (
                'id' => 88,
                'degree_value' => '4',
                'court_name' => 'محكمة باب الشعريةالجزئية',
                'court_value' => '52',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            88 => 
            array (
                'id' => 89,
                'degree_value' => '4',
                'court_name' => 'محكمة الموسكى الجزئية',
                'court_value' => '53',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            89 => 
            array (
                'id' => 90,
                'degree_value' => '4',
                'court_name' => 'محكمة الامور المستعجلة الجزئية',
                'court_value' => '54',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            90 => 
            array (
                'id' => 91,
                'degree_value' => '4',
                'court_name' => 'محكمة الجمالية الجزئية',
                'court_value' => '55',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            91 => 
            array (
                'id' => 92,
                'degree_value' => '4',
                'court_name' => 'محكمة المعادى الجزئية',
                'court_value' => '56',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            92 => 
            array (
                'id' => 93,
                'degree_value' => '4',
                'court_name' => 'محكمة عابدين الجزئية',
                'court_value' => '57',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            93 => 
            array (
                'id' => 94,
                'degree_value' => '4',
                'court_name' => 'محكمة حلوان الجزئية',
                'court_value' => '58',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            94 => 
            array (
                'id' => 95,
                'degree_value' => '4',
                'court_name' => 'محكمة التبين و15 مايوالجزئية',
                'court_value' => '59',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            95 => 
            array (
                'id' => 96,
                'degree_value' => '4',
                'court_name' => 'محكمة بندر امبابة الجزئية',
                'court_value' => '60',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            96 => 
            array (
                'id' => 97,
                'degree_value' => '4',
                'court_name' => 'محكمة الدقى الجزئية',
                'court_value' => '64',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            97 => 
            array (
                'id' => 98,
                'degree_value' => '4',
                'court_name' => 'محكمة العجوزة الجزئية',
                'court_value' => '65',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            98 => 
            array (
                'id' => 99,
                'degree_value' => '4',
                'court_name' => 'محكمة الوراق الجزئية',
                'court_value' => '66',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            99 => 
            array (
                'id' => 100,
                'degree_value' => '4',
                'court_name' => 'محكمة كرداسة الجزئية',
                'court_value' => '67',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            100 => 
            array (
                'id' => 101,
                'degree_value' => '4',
                'court_name' => 'محكمة اوسيم الجزئية',
                'court_value' => '68',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            101 => 
            array (
                'id' => 102,
                'degree_value' => '4',
                'court_name' => 'محكمة مركز امبابة الجزئية',
                'court_value' => '69',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            102 => 
            array (
                'id' => 103,
                'degree_value' => '4',
                'court_name' => 'محكمة العمرانية الجزئية',
                'court_value' => '71',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            103 => 
            array (
                'id' => 104,
                'degree_value' => '4',
                'court_name' => 'محكمة الهرم الجزئية',
                'court_value' => '74',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            104 => 
            array (
                'id' => 105,
                'degree_value' => '4',
                'court_name' => 'محكمة 6 اكتوبرالجزئية',
                'court_value' => '75',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            105 => 
            array (
                'id' => 106,
                'degree_value' => '4',
                'court_name' => 'محكمة البدرشين الجزئية',
                'court_value' => '76',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            106 => 
            array (
                'id' => 107,
                'degree_value' => '4',
                'court_name' => 'محكمة الصف الجزئية',
                'court_value' => '78',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            107 => 
            array (
                'id' => 108,
                'degree_value' => '4',
                'court_name' => 'مأمورية الصف الكلية',
                'court_value' => '79',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            108 => 
            array (
                'id' => 109,
                'degree_value' => '4',
                'court_name' => 'محكمة بندر الاسماعيلية الجزئية',
                'court_value' => '81',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            109 => 
            array (
                'id' => 110,
                'degree_value' => '4',
                'court_name' => 'محكمة مركزالاسماعيلية الجزئية',
                'court_value' => '82',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            110 => 
            array (
                'id' => 111,
                'degree_value' => '4',
                'court_name' => 'محكمة التل الكبير الجزئية',
                'court_value' => '83',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            111 => 
            array (
                'id' => 112,
                'degree_value' => '4',
                'court_name' => 'محكمة فايد الجزئية',
                'court_value' => '84',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            112 => 
            array (
                'id' => 113,
                'degree_value' => '4',
                'court_name' => 'محكمة القنطرة غرب الجزئية',
                'court_value' => '85',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            113 => 
            array (
                'id' => 114,
                'degree_value' => '4',
                'court_name' => 'محكمة قنطرة شرق الجزئية',
                'court_value' => '86',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            114 => 
            array (
                'id' => 115,
                'degree_value' => '4',
                'court_name' => 'محكمة بندر الزقازيق الجزئية',
                'court_value' => '93',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            115 => 
            array (
                'id' => 116,
                'degree_value' => '4',
                'court_name' => 'محكمة مركزالزقازيق الجزئية',
                'court_value' => '94',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            116 => 
            array (
                'id' => 117,
                'degree_value' => '4',
                'court_name' => 'محكمة ههيا الجزئية',
                'court_value' => '96',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            117 => 
            array (
                'id' => 118,
                'degree_value' => '4',
                'court_name' => 'محكمة الحسينيةالجزئية',
                'court_value' => '106',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            118 => 
            array (
                'id' => 119,
                'degree_value' => '4',
                'court_name' => 'محكمة شرم الشيخ الجزئية',
                'court_value' => '109',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            119 => 
            array (
                'id' => 120,
                'degree_value' => '4',
                'court_name' => 'محكمة بندر الجيزة الجزئية',
                'court_value' => '112',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            120 => 
            array (
                'id' => 121,
                'degree_value' => '4',
                'court_name' => 'مأمورية أبشوى الكلية',
                'court_value' => '113',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            121 => 
            array (
                'id' => 122,
                'degree_value' => '4',
                'court_name' => 'مأمورية طامية الكلية',
                'court_value' => '114',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            122 => 
            array (
                'id' => 123,
                'degree_value' => '4',
                'court_name' => 'محكمة سنورس الجزئية',
                'court_value' => '115',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            123 => 
            array (
                'id' => 124,
                'degree_value' => '4',
                'court_name' => 'محكمة بندر الفيوم الجزئية',
                'court_value' => '116',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            124 => 
            array (
                'id' => 125,
                'degree_value' => '4',
                'court_name' => 'محكمة مركز الفيوم الجزئية',
                'court_value' => '117',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            125 => 
            array (
                'id' => 126,
                'degree_value' => '4',
                'court_name' => 'محكمة اطسا الجزئية',
                'court_value' => '118',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            126 => 
            array (
                'id' => 127,
                'degree_value' => '4',
                'court_name' => 'محكمة ابشواى الجزئية',
                'court_value' => '119',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            127 => 
            array (
                'id' => 128,
                'degree_value' => '4',
                'court_name' => 'محكمة طامية الجزئية',
                'court_value' => '120',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            128 => 
            array (
                'id' => 129,
                'degree_value' => '4',
                'court_name' => 'محكمة الاربعين الجزئية',
                'court_value' => '122',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            129 => 
            array (
                'id' => 130,
                'degree_value' => '4',
                'court_name' => 'محكمة اللبان الجزئية',
                'court_value' => '128',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            130 => 
            array (
                'id' => 131,
                'degree_value' => '4',
                'court_name' => 'محكمة مرسى مطروح الجزئية',
                'court_value' => '132',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            131 => 
            array (
                'id' => 132,
                'degree_value' => '4',
                'court_name' => 'محكمة ابو تيج الجزئية',
                'court_value' => '135',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            132 => 
            array (
                'id' => 133,
                'degree_value' => '4',
                'court_name' => 'محكمة الامور المستعجلة شرق',
                'court_value' => '137',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            133 => 
            array (
                'id' => 134,
                'degree_value' => '4',
                'court_name' => 'محكمة التجارى الجزئى',
                'court_value' => '138',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            134 => 
            array (
                'id' => 135,
                'degree_value' => '4',
                'court_name' => 'محكمة التنفيذ الجزئية',
                'court_value' => '139',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            135 => 
            array (
                'id' => 136,
                'degree_value' => '4',
                'court_name' => 'محكمة مركز دمنهور الجزئية',
                'court_value' => '141',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            136 => 
            array (
                'id' => 137,
                'degree_value' => '4',
                'court_name' => 'محكمة حوش عيسى الكلية',
                'court_value' => '147',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            137 => 
            array (
                'id' => 138,
                'degree_value' => '4',
                'court_name' => 'محكمة بندر شبين الكوم الجزئية',
                'court_value' => '150',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            138 => 
            array (
                'id' => 139,
                'degree_value' => '4',
                'court_name' => 'محكمة زفتى الجزئية',
                'court_value' => '152',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            139 => 
            array (
                'id' => 140,
                'degree_value' => '4',
                'court_name' => 'محكمة الوسطى الجزئية',
                'court_value' => '160',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            140 => 
            array (
                'id' => 141,
                'degree_value' => '4',
                'court_name' => 'محكمة اول طنطا الجزئية',
                'court_value' => '161',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            141 => 
            array (
                'id' => 142,
                'degree_value' => '4',
                'court_name' => 'محكمة التنفيذ غرب الاسكندرية الجزئية',
                'court_value' => '163',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            142 => 
            array (
                'id' => 143,
                'degree_value' => '4',
                'court_name' => 'المحكمة التجارية الجزئية غرب اسكندرية',
                'court_value' => '164',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            143 => 
            array (
                'id' => 144,
                'degree_value' => '4',
                'court_name' => 'محكمة شبين القناطر الجزئية',
                'court_value' => '165',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            144 => 
            array (
                'id' => 145,
                'degree_value' => '4',
                'court_name' => 'محكمة ميناء بورسعيد الجزئية',
                'court_value' => '167',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            145 => 
            array (
                'id' => 146,
                'degree_value' => '4',
                'court_name' => 'محكمة بندر كفر الشيخ الجزئية',
                'court_value' => '170',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            146 => 
            array (
                'id' => 147,
                'degree_value' => '4',
                'court_name' => 'محكمة الضواحى الجزئية',
                'court_value' => '175',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            147 => 
            array (
                'id' => 148,
                'degree_value' => '4',
                'court_name' => 'محكمة طوخ الجزئية',
                'court_value' => '176',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            148 => 
            array (
                'id' => 149,
                'degree_value' => '4',
                'court_name' => 'محكمة مركز كفر الشيخ الجزئية',
                'court_value' => '182',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            149 => 
            array (
                'id' => 150,
                'degree_value' => '4',
                'court_name' => 'محكمة بندر بنها الجزئية',
                'court_value' => '186',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            150 => 
            array (
                'id' => 151,
                'degree_value' => '4',
                'court_name' => 'محكمة مركز بنها الجزئية',
                'court_value' => '187',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            151 => 
            array (
                'id' => 152,
                'degree_value' => '4',
                'court_name' => 'محكمة ثانى طنطا الجزئية',
                'court_value' => '190',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            152 => 
            array (
                'id' => 153,
                'degree_value' => '4',
                'court_name' => 'محكمة مركز طنطا الجزئية',
                'court_value' => '191',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            153 => 
            array (
                'id' => 154,
                'degree_value' => '4',
                'court_name' => 'محكمة السنطة الجزئية',
                'court_value' => '192',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            154 => 
            array (
                'id' => 155,
                'degree_value' => '4',
                'court_name' => 'محكمة السنطة الكلية',
                'court_value' => '193',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            155 => 
            array (
                'id' => 156,
                'degree_value' => '4',
                'court_name' => 'محكمة كفر الزيات الجزئية',
                'court_value' => '194',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            156 => 
            array (
                'id' => 157,
                'degree_value' => '4',
                'court_name' => 'محكمة كفر الزيات الكلية',
                'court_value' => '195',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            157 => 
            array (
                'id' => 158,
                'degree_value' => '4',
                'court_name' => 'محكمة بسيون الجزئية',
                'court_value' => '196',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            158 => 
            array (
                'id' => 159,
                'degree_value' => '4',
                'court_name' => 'محكمة زفتى الكلية',
                'court_value' => '202',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            159 => 
            array (
                'id' => 160,
                'degree_value' => '4',
                'court_name' => 'محكمة الغردقة الجزئية',
                'court_value' => '209',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            160 => 
            array (
                'id' => 161,
                'degree_value' => '4',
                'court_name' => 'محكمة التل الكبير الكلية',
                'court_value' => '215',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            161 => 
            array (
                'id' => 162,
                'degree_value' => '4',
                'court_name' => 'محكمة الطور الجزئية',
                'court_value' => '216',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            162 => 
            array (
                'id' => 163,
                'degree_value' => '4',
                'court_name' => 'محكمة الخانكة الكلية',
                'court_value' => '218',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            163 => 
            array (
                'id' => 164,
                'degree_value' => '4',
                'court_name' => 'محكمة العريش الجزئية',
                'court_value' => '219',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            164 => 
            array (
                'id' => 165,
                'degree_value' => '4',
                'court_name' => 'محكمة السويس الجزئية',
                'court_value' => '220',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            165 => 
            array (
                'id' => 166,
                'degree_value' => '4',
                'court_name' => 'محكمة شرم الشيخ الكلية',
                'court_value' => '222',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            166 => 
            array (
                'id' => 167,
                'degree_value' => '4',
                'court_name' => 'محكمة راس سدر الجزئية',
                'court_value' => '223',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            167 => 
            array (
                'id' => 168,
                'degree_value' => '4',
                'court_name' => 'محكمة بورسعيد الجزئية',
                'court_value' => '224',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            168 => 
            array (
                'id' => 169,
                'degree_value' => '4',
                'court_name' => 'محكمة ناصر الجزئية',
                'court_value' => '225',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            169 => 
            array (
                'id' => 170,
                'degree_value' => '4',
                'court_name' => 'محكمة اهناسيا الجزئية',
                'court_value' => '226',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            170 => 
            array (
                'id' => 171,
                'degree_value' => '4',
                'court_name' => 'محكمة الداخلة الكلية',
                'court_value' => '227',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            171 => 
            array (
                'id' => 172,
                'degree_value' => '4',
                'court_name' => 'محكمة الداخلة الجزئية',
                'court_value' => '228',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            172 => 
            array (
                'id' => 173,
                'degree_value' => '4',
                'court_name' => 'محكمة الخارجة الجزئية',
                'court_value' => '229',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            173 => 
            array (
                'id' => 174,
                'degree_value' => '4',
                'court_name' => 'محكمة نصر النوبة الجزئية',
                'court_value' => '237',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            174 => 
            array (
                'id' => 175,
                'degree_value' => '4',
                'court_name' => 'محكمة دراو الجزئية',
                'court_value' => '240',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            175 => 
            array (
                'id' => 176,
                'degree_value' => '4',
                'court_name' => 'محكمة السلوم الجزئية',
                'court_value' => '259',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            176 => 
            array (
                'id' => 177,
                'degree_value' => '4',
                'court_name' => 'محكمة نويبع الجزئية',
                'court_value' => '261',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            177 => 
            array (
                'id' => 178,
                'degree_value' => '4',
                'court_name' => 'محكمة العلمين الجزئية',
                'court_value' => '262',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            178 => 
            array (
                'id' => 179,
                'degree_value' => '4',
                'court_name' => 'محكمة الفشن الجزئية',
                'court_value' => '264',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            179 => 
            array (
                'id' => 180,
                'degree_value' => '4',
                'court_name' => 'محكمة اخميم الكلية',
                'court_value' => '265',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            180 => 
            array (
                'id' => 181,
                'degree_value' => '4',
                'court_name' => 'محكمة اخميم الجزئية',
                'court_value' => '266',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            181 => 
            array (
                'id' => 182,
                'degree_value' => '4',
                'court_name' => 'محكمة مركز سوهاج الجزئية',
                'court_value' => '280',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            182 => 
            array (
                'id' => 183,
                'degree_value' => '4',
                'court_name' => 'محكمة بندر سوهاج الجزئية',
                'court_value' => '281',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            183 => 
            array (
                'id' => 184,
                'degree_value' => '4',
                'court_name' => 'محكمة بندر بنى سويف الجزئية',
                'court_value' => '291',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            184 => 
            array (
                'id' => 185,
                'degree_value' => '4',
                'court_name' => 'محكمة ابوتيج الكلية',
                'court_value' => '297',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            185 => 
            array (
                'id' => 186,
                'degree_value' => '4',
                'court_name' => 'محكمة سمسطا الجزئية',
                'court_value' => '298',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            186 => 
            array (
                'id' => 187,
                'degree_value' => '4',
                'court_name' => 'محكمة مركز المنيا الجزئية',
                'court_value' => '299',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            187 => 
            array (
                'id' => 188,
                'degree_value' => '4',
                'court_name' => 'محكمة مركز بنى سويف الجزئية',
                'court_value' => '300',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            188 => 
            array (
                'id' => 189,
                'degree_value' => '4',
                'court_name' => 'محكمة سمالوط الجزئية',
                'court_value' => '303',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            189 => 
            array (
                'id' => 190,
                'degree_value' => '4',
                'court_name' => 'محكمة بنى مزار الكلية',
                'court_value' => '305',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            190 => 
            array (
                'id' => 191,
                'degree_value' => '4',
                'court_name' => 'محكمة مغاغة الجزئية',
                'court_value' => '306',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            191 => 
            array (
                'id' => 192,
                'degree_value' => '4',
                'court_name' => 'محكمة مغاغة الكلية',
                'court_value' => '307',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            192 => 
            array (
                'id' => 193,
                'degree_value' => '4',
                'court_name' => 'محكمة ملوى الكلية',
                'court_value' => '311',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            193 => 
            array (
                'id' => 194,
                'degree_value' => '4',
                'court_name' => 'محكمة منوف الجزئية',
                'court_value' => '325',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            194 => 
            array (
                'id' => 195,
                'degree_value' => '4',
                'court_name' => 'محكمة قويسنا الجزئية',
                'court_value' => '328',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            195 => 
            array (
                'id' => 196,
                'degree_value' => '4',
                'court_name' => 'محكمة مركز شبين الكوم الجزئية',
                'court_value' => '330',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            196 => 
            array (
                'id' => 197,
                'degree_value' => '4',
                'court_name' => 'محكمة قسم ثانى المنصورة الجزئية',
                'court_value' => '333',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            197 => 
            array (
                'id' => 198,
                'degree_value' => '4',
                'court_name' => 'محكمة قسم اول المنصورة الجزئية',
                'court_value' => '334',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            198 => 
            array (
                'id' => 199,
                'degree_value' => '4',
                'court_name' => 'محكمة مركز المنصورة الجزئية',
                'court_value' => '339',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            199 => 
            array (
                'id' => 200,
                'degree_value' => '4',
                'court_name' => 'محكمة الخانكة الجزئية',
                'court_value' => '346',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            200 => 
            array (
                'id' => 201,
                'degree_value' => '4',
                'court_name' => 'محكمة شبرا الخيمة الجزئية',
                'court_value' => '349',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            201 => 
            array (
                'id' => 202,
                'degree_value' => '4',
                'court_name' => 'محكمة دسوق الكلية',
                'court_value' => '350',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            202 => 
            array (
                'id' => 203,
                'degree_value' => '4',
                'court_name' => 'محكمة قليوب الجزئية',
                'court_value' => '352',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            203 => 
            array (
                'id' => 204,
                'degree_value' => '4',
                'court_name' => 'محكمة بندر المنيا الجزئية',
                'court_value' => '361',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            204 => 
            array (
                'id' => 205,
                'degree_value' => '4',
                'court_name' => 'محكمه راس غارب الجزئيه',
                'court_value' => '365',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            205 => 
            array (
                'id' => 206,
                'degree_value' => '4',
                'court_name' => 'محكمه القصير الجزئيه',
                'court_value' => '366',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            206 => 
            array (
                'id' => 207,
                'degree_value' => '4',
                'court_name' => 'مامورية سفاجا الكلية',
                'court_value' => '376',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            207 => 
            array (
                'id' => 208,
                'degree_value' => '4',
                'court_name' => 'محكمة دمياط الجديدة الجزئية',
                'court_value' => '407',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            208 => 
            array (
                'id' => 209,
                'degree_value' => '4',
                'court_name' => 'محكمة العبور الجزئية',
                'court_value' => '508',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            209 => 
            array (
                'id' => 210,
                'degree_value' => '4',
                'court_name' => 'جنح مستأنف البحر الاحمر',
                'court_value' => '516',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            210 => 
            array (
                'id' => 211,
                'degree_value' => '4',
                'court_name' => 'جنح الغردقة',
                'court_value' => '518',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));
        
        
    }
}