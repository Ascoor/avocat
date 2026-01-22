<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class SearchCaseTypesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('search_case_types')->delete();
        
        \DB::table('search_case_types')->insert(array (
            0 => 
            array (
                'id' => 182,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 185,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'جمعيات اهلية',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 187,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'رد ومخاصمة استئنافية',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 223,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'محكمه اسره حسبى',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 247,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            5 => 
            array (
                'id' => 251,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'مخاصمه',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            6 => 
            array (
                'id' => 271,
                'degree_value' => '3',
                'court_value' => '17',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            7 => 
            array (
                'id' => 272,
                'degree_value' => '3',
                'court_value' => '17',
                'case_type_name' => 'حسبى',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            8 => 
            array (
                'id' => 281,
                'degree_value' => '3',
                'court_value' => '18',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            9 => 
            array (
                'id' => 283,
                'degree_value' => '3',
                'court_value' => '20',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            10 => 
            array (
                'id' => 284,
                'degree_value' => '3',
                'court_value' => '20',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            11 => 
            array (
                'id' => 285,
                'degree_value' => '3',
                'court_value' => '20',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            12 => 
            array (
                'id' => 286,
                'degree_value' => '3',
                'court_value' => '20',
                'case_type_name' => 'احوال شخصية',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            13 => 
            array (
                'id' => 287,
                'degree_value' => '3',
                'court_value' => '20',
                'case_type_name' => 'رد ومخاصمة',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            14 => 
            array (
                'id' => 288,
                'degree_value' => '3',
                'court_value' => '21',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            15 => 
            array (
                'id' => 289,
                'degree_value' => '3',
                'court_value' => '21',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            16 => 
            array (
                'id' => 290,
                'degree_value' => '3',
                'court_value' => '21',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            17 => 
            array (
                'id' => 291,
                'degree_value' => '3',
                'court_value' => '21',
                'case_type_name' => 'احوال شخصية',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            18 => 
            array (
                'id' => 292,
                'degree_value' => '3',
                'court_value' => '21',
                'case_type_name' => 'ومخاصمة',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            19 => 
            array (
                'id' => 293,
                'degree_value' => '3',
                'court_value' => '21',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            20 => 
            array (
                'id' => 294,
                'degree_value' => '3',
                'court_value' => '21',
                'case_type_name' => 'احالة من دار القضاء',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            21 => 
            array (
                'id' => 297,
                'degree_value' => '3',
                'court_value' => '32',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            22 => 
            array (
                'id' => 298,
                'degree_value' => '3',
                'court_value' => '32',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            23 => 
            array (
                'id' => 299,
                'degree_value' => '3',
                'court_value' => '32',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            24 => 
            array (
                'id' => 300,
                'degree_value' => '3',
                'court_value' => '32',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            25 => 
            array (
                'id' => 301,
                'degree_value' => '3',
                'court_value' => '32',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            26 => 
            array (
                'id' => 302,
                'degree_value' => '3',
                'court_value' => '32',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            27 => 
            array (
                'id' => 303,
                'degree_value' => '3',
                'court_value' => '32',
                'case_type_name' => 'اوامر تحكيم',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            28 => 
            array (
                'id' => 304,
                'degree_value' => '3',
                'court_value' => '32',
                'case_type_name' => 'ايداع تحكيم',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            29 => 
            array (
                'id' => 305,
                'degree_value' => '3',
                'court_value' => '43',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            30 => 
            array (
                'id' => 306,
                'degree_value' => '3',
                'court_value' => '43',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            31 => 
            array (
                'id' => 307,
                'degree_value' => '3',
                'court_value' => '43',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            32 => 
            array (
                'id' => 308,
                'degree_value' => '3',
                'court_value' => '43',
                'case_type_name' => 'احوال شخصيه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            33 => 
            array (
                'id' => 309,
                'degree_value' => '3',
                'court_value' => '43',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            34 => 
            array (
                'id' => 310,
                'degree_value' => '3',
                'court_value' => '44',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            35 => 
            array (
                'id' => 311,
                'degree_value' => '3',
                'court_value' => '44',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            36 => 
            array (
                'id' => 312,
                'degree_value' => '3',
                'court_value' => '44',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            37 => 
            array (
                'id' => 313,
                'degree_value' => '3',
                'court_value' => '44',
                'case_type_name' => 'احوال شخصيه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            38 => 
            array (
                'id' => 314,
                'degree_value' => '3',
                'court_value' => '44',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            39 => 
            array (
                'id' => 315,
                'degree_value' => '3',
                'court_value' => '44',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            40 => 
            array (
                'id' => 316,
                'degree_value' => '3',
                'court_value' => '44',
                'case_type_name' => 'اوامر تحكيم',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            41 => 
            array (
                'id' => 317,
                'degree_value' => '3',
                'court_value' => '44',
                'case_type_name' => 'ايداع تحكيم',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            42 => 
            array (
                'id' => 318,
                'degree_value' => '3',
                'court_value' => '44',
                'case_type_name' => 'حسبى',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            43 => 
            array (
                'id' => 319,
                'degree_value' => '3',
                'court_value' => '44',
                'case_type_name' => 'اجانب',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            44 => 
            array (
                'id' => 320,
                'degree_value' => '3',
                'court_value' => '45',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            45 => 
            array (
                'id' => 321,
                'degree_value' => '3',
                'court_value' => '45',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            46 => 
            array (
                'id' => 322,
                'degree_value' => '3',
                'court_value' => '45',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            47 => 
            array (
                'id' => 323,
                'degree_value' => '3',
                'court_value' => '45',
                'case_type_name' => 'احوال شخصيه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            48 => 
            array (
                'id' => 324,
                'degree_value' => '3',
                'court_value' => '45',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            49 => 
            array (
                'id' => 325,
                'degree_value' => '3',
                'court_value' => '45',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            50 => 
            array (
                'id' => 326,
                'degree_value' => '3',
                'court_value' => '45',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            51 => 
            array (
                'id' => 327,
                'degree_value' => '3',
                'court_value' => '45',
                'case_type_name' => 'مساكن',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            52 => 
            array (
                'id' => 328,
                'degree_value' => '3',
                'court_value' => '45',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            53 => 
            array (
                'id' => 330,
                'degree_value' => '4',
                'court_value' => '1',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            54 => 
            array (
                'id' => 331,
                'degree_value' => '4',
                'court_value' => '1',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            55 => 
            array (
                'id' => 332,
                'degree_value' => '4',
                'court_value' => '1',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            56 => 
            array (
                'id' => 334,
                'degree_value' => '4',
                'court_value' => '1',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            57 => 
            array (
                'id' => 336,
                'degree_value' => '4',
                'court_value' => '1',
                'case_type_name' => 'ايداع تحكيم',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            58 => 
            array (
                'id' => 337,
                'degree_value' => '4',
                'court_value' => '1',
                'case_type_name' => 'فض منازعات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            59 => 
            array (
                'id' => 338,
                'degree_value' => '4',
                'court_value' => '1',
                'case_type_name' => 'تحكيم عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            60 => 
            array (
                'id' => 339,
                'degree_value' => '4',
                'court_value' => '1',
                'case_type_name' => 'نقابه عامه',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            61 => 
            array (
                'id' => 341,
                'degree_value' => '4',
                'court_value' => '2',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            62 => 
            array (
                'id' => 342,
                'degree_value' => '4',
                'court_value' => '2',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            63 => 
            array (
                'id' => 343,
                'degree_value' => '4',
                'court_value' => '2',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            64 => 
            array (
                'id' => 344,
                'degree_value' => '4',
                'court_value' => '2',
                'case_type_name' => 'احوال شخصية',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            65 => 
            array (
                'id' => 345,
                'degree_value' => '4',
                'court_value' => '2',
                'case_type_name' => 'رد مخاصمة',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            66 => 
            array (
                'id' => 346,
                'degree_value' => '4',
                'court_value' => '2',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            67 => 
            array (
                'id' => 347,
                'degree_value' => '4',
                'court_value' => '2',
                'case_type_name' => 'بطلان تحكيم',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            68 => 
            array (
                'id' => 348,
                'degree_value' => '4',
                'court_value' => '2',
                'case_type_name' => 'ايداع تحكيم',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            69 => 
            array (
                'id' => 349,
                'degree_value' => '4',
                'court_value' => '2',
                'case_type_name' => 'جمعيات اهلية',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            70 => 
            array (
                'id' => 350,
                'degree_value' => '4',
                'court_value' => '2',
                'case_type_name' => 'تحكيم عمالى',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            71 => 
            array (
                'id' => 351,
                'degree_value' => '4',
                'court_value' => '2',
                'case_type_name' => 'رد ومخاصمة استئنافية',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            72 => 
            array (
                'id' => 353,
                'degree_value' => '4',
                'court_value' => '3',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            73 => 
            array (
                'id' => 354,
                'degree_value' => '4',
                'court_value' => '3',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            74 => 
            array (
                'id' => 355,
                'degree_value' => '4',
                'court_value' => '3',
                'case_type_name' => 'احوال شخصيه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            75 => 
            array (
                'id' => 357,
                'degree_value' => '4',
                'court_value' => '3',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            76 => 
            array (
                'id' => 359,
                'degree_value' => '4',
                'court_value' => '3',
                'case_type_name' => 'ايداع تحكيم',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            77 => 
            array (
                'id' => 360,
                'degree_value' => '4',
                'court_value' => '3',
                'case_type_name' => 'اسره حسبى',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            78 => 
            array (
                'id' => 362,
                'degree_value' => '4',
                'court_value' => '4',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            79 => 
            array (
                'id' => 363,
                'degree_value' => '4',
                'court_value' => '4',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            80 => 
            array (
                'id' => 364,
                'degree_value' => '4',
                'court_value' => '4',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            81 => 
            array (
                'id' => 366,
                'degree_value' => '4',
                'court_value' => '4',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            82 => 
            array (
                'id' => 368,
                'degree_value' => '4',
                'court_value' => '4',
                'case_type_name' => 'افلاس',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            83 => 
            array (
                'id' => 369,
                'degree_value' => '4',
                'court_value' => '4',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            84 => 
            array (
                'id' => 370,
                'degree_value' => '4',
                'court_value' => '4',
                'case_type_name' => 'التماس اعاده نظر نفس',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            85 => 
            array (
                'id' => 371,
                'degree_value' => '4',
                'court_value' => '4',
                'case_type_name' => 'اسره',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            86 => 
            array (
                'id' => 373,
                'degree_value' => '4',
                'court_value' => '5',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            87 => 
            array (
                'id' => 374,
                'degree_value' => '4',
                'court_value' => '5',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            88 => 
            array (
                'id' => 375,
                'degree_value' => '4',
                'court_value' => '5',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            89 => 
            array (
                'id' => 377,
                'degree_value' => '4',
                'court_value' => '5',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            90 => 
            array (
                'id' => 378,
                'degree_value' => '4',
                'court_value' => '5',
                'case_type_name' => 'رد',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            91 => 
            array (
                'id' => 380,
                'degree_value' => '4',
                'court_value' => '7',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            92 => 
            array (
                'id' => 381,
                'degree_value' => '4',
                'court_value' => '7',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            93 => 
            array (
                'id' => 382,
                'degree_value' => '4',
                'court_value' => '7',
                'case_type_name' => 'احوال شخصيه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            94 => 
            array (
                'id' => 384,
                'degree_value' => '4',
                'court_value' => '7',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            95 => 
            array (
                'id' => 385,
                'degree_value' => '4',
                'court_value' => '7',
                'case_type_name' => 'احوال ولايه',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            96 => 
            array (
                'id' => 386,
                'degree_value' => '4',
                'court_value' => '7',
                'case_type_name' => 'محكمه الاسره',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            97 => 
            array (
                'id' => 387,
                'degree_value' => '4',
                'court_value' => '7',
                'case_type_name' => 'محكمه اسره حسبى',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            98 => 
            array (
                'id' => 388,
                'degree_value' => '4',
                'court_value' => '7',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            99 => 
            array (
                'id' => 390,
                'degree_value' => '4',
                'court_value' => '8',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            100 => 
            array (
                'id' => 391,
                'degree_value' => '4',
                'court_value' => '8',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            101 => 
            array (
                'id' => 392,
                'degree_value' => '4',
                'court_value' => '8',
                'case_type_name' => 'احوال شخصيه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            102 => 
            array (
                'id' => 394,
                'degree_value' => '4',
                'court_value' => '8',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            103 => 
            array (
                'id' => 395,
                'degree_value' => '4',
                'court_value' => '8',
                'case_type_name' => 'افلاس',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            104 => 
            array (
                'id' => 396,
                'degree_value' => '4',
                'court_value' => '8',
                'case_type_name' => 'محكمة اسرة احوال',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            105 => 
            array (
                'id' => 397,
                'degree_value' => '4',
                'court_value' => '8',
                'case_type_name' => 'مال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            106 => 
            array (
                'id' => 398,
                'degree_value' => '4',
                'court_value' => '8',
                'case_type_name' => 'اقتصاديه',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            107 => 
            array (
                'id' => 400,
                'degree_value' => '4',
                'court_value' => '10',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            108 => 
            array (
                'id' => 401,
                'degree_value' => '4',
                'court_value' => '10',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            109 => 
            array (
                'id' => 402,
                'degree_value' => '4',
                'court_value' => '10',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            110 => 
            array (
                'id' => 404,
                'degree_value' => '4',
                'court_value' => '10',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            111 => 
            array (
                'id' => 406,
                'degree_value' => '4',
                'court_value' => '10',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            112 => 
            array (
                'id' => 407,
                'degree_value' => '4',
                'court_value' => '10',
                'case_type_name' => 'مخاصمه',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            113 => 
            array (
                'id' => 409,
                'degree_value' => '4',
                'court_value' => '11',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            114 => 
            array (
                'id' => 410,
                'degree_value' => '4',
                'court_value' => '11',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            115 => 
            array (
                'id' => 411,
                'degree_value' => '4',
                'court_value' => '11',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            116 => 
            array (
                'id' => 413,
                'degree_value' => '4',
                'court_value' => '11',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            117 => 
            array (
                'id' => 415,
                'degree_value' => '4',
                'court_value' => '11',
                'case_type_name' => 'مخاصمه',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            118 => 
            array (
                'id' => 417,
                'degree_value' => '4',
                'court_value' => '12',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            119 => 
            array (
                'id' => 418,
                'degree_value' => '4',
                'court_value' => '12',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            120 => 
            array (
                'id' => 419,
                'degree_value' => '4',
                'court_value' => '12',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            121 => 
            array (
                'id' => 421,
                'degree_value' => '4',
                'court_value' => '12',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            122 => 
            array (
                'id' => 422,
                'degree_value' => '4',
                'court_value' => '12',
                'case_type_name' => 'س اسره',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            123 => 
            array (
                'id' => 423,
                'degree_value' => '4',
                'court_value' => '12',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            124 => 
            array (
                'id' => 424,
                'degree_value' => '4',
                'court_value' => '12',
                'case_type_name' => 'مخاصمه',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            125 => 
            array (
                'id' => 426,
                'degree_value' => '4',
                'court_value' => '13',
                'case_type_name' => 'احوال شخصية',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            126 => 
            array (
                'id' => 427,
                'degree_value' => '4',
                'court_value' => '14',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            127 => 
            array (
                'id' => 428,
                'degree_value' => '4',
                'court_value' => '14',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            128 => 
            array (
                'id' => 429,
                'degree_value' => '4',
                'court_value' => '14',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            129 => 
            array (
                'id' => 430,
                'degree_value' => '4',
                'court_value' => '14',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            130 => 
            array (
                'id' => 431,
                'degree_value' => '4',
                'court_value' => '14',
                'case_type_name' => 'رد ومخاصمة',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            131 => 
            array (
                'id' => 432,
                'degree_value' => '4',
                'court_value' => '14',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            132 => 
            array (
                'id' => 433,
                'degree_value' => '4',
                'court_value' => '16',
                'case_type_name' => 'احوال شخصية',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            133 => 
            array (
                'id' => 434,
                'degree_value' => '4',
                'court_value' => '16',
                'case_type_name' => 'حسبى',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            134 => 
            array (
                'id' => 435,
                'degree_value' => '4',
                'court_value' => '17',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            135 => 
            array (
                'id' => 436,
                'degree_value' => '4',
                'court_value' => '17',
                'case_type_name' => 'حسبى',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            136 => 
            array (
                'id' => 437,
                'degree_value' => '4',
                'court_value' => '18',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            137 => 
            array (
                'id' => 438,
                'degree_value' => '4',
                'court_value' => '18',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            138 => 
            array (
                'id' => 439,
                'degree_value' => '4',
                'court_value' => '18',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            139 => 
            array (
                'id' => 440,
                'degree_value' => '4',
                'court_value' => '18',
                'case_type_name' => 'احوال نفس',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            140 => 
            array (
                'id' => 441,
                'degree_value' => '4',
                'court_value' => '18',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            141 => 
            array (
                'id' => 442,
                'degree_value' => '4',
                'court_value' => '18',
                'case_type_name' => 'امر علي عريضه',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            142 => 
            array (
                'id' => 443,
                'degree_value' => '4',
                'court_value' => '18',
                'case_type_name' => 'محكمة أسره نفس',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            143 => 
            array (
                'id' => 444,
                'degree_value' => '4',
                'court_value' => '18',
                'case_type_name' => 'محكمة أسره مال',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            144 => 
            array (
                'id' => 445,
                'degree_value' => '4',
                'court_value' => '18',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            145 => 
            array (
                'id' => 446,
                'degree_value' => '4',
                'court_value' => '18',
                'case_type_name' => 'احوال مال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            146 => 
            array (
                'id' => 447,
                'degree_value' => '4',
                'court_value' => '20',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            147 => 
            array (
                'id' => 448,
                'degree_value' => '4',
                'court_value' => '20',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            148 => 
            array (
                'id' => 449,
                'degree_value' => '4',
                'court_value' => '20',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            149 => 
            array (
                'id' => 450,
                'degree_value' => '4',
                'court_value' => '20',
                'case_type_name' => 'احوال شخصية',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            150 => 
            array (
                'id' => 451,
                'degree_value' => '4',
                'court_value' => '20',
                'case_type_name' => 'رد ومخاصمة',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            151 => 
            array (
                'id' => 453,
                'degree_value' => '4',
                'court_value' => '21',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            152 => 
            array (
                'id' => 457,
                'degree_value' => '4',
                'court_value' => '21',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            153 => 
            array (
                'id' => 458,
                'degree_value' => '4',
                'court_value' => '21',
                'case_type_name' => 'احالة من دار القضاء',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            154 => 
            array (
                'id' => 459,
                'degree_value' => '4',
                'court_value' => '30',
                'case_type_name' => 'اسره',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            155 => 
            array (
                'id' => 460,
                'degree_value' => '4',
                'court_value' => '31',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            156 => 
            array (
                'id' => 462,
                'degree_value' => '4',
                'court_value' => '32',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            157 => 
            array (
                'id' => 463,
                'degree_value' => '4',
                'court_value' => '32',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            158 => 
            array (
                'id' => 464,
                'degree_value' => '4',
                'court_value' => '32',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            159 => 
            array (
                'id' => 466,
                'degree_value' => '4',
                'court_value' => '32',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            160 => 
            array (
                'id' => 467,
                'degree_value' => '4',
                'court_value' => '32',
                'case_type_name' => 'اوامر تحكيم',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            161 => 
            array (
                'id' => 468,
                'degree_value' => '4',
                'court_value' => '32',
                'case_type_name' => 'ايداع تحكيم',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            162 => 
            array (
                'id' => 470,
                'degree_value' => '4',
                'court_value' => '43',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            163 => 
            array (
                'id' => 471,
                'degree_value' => '4',
                'court_value' => '43',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            164 => 
            array (
                'id' => 472,
                'degree_value' => '4',
                'court_value' => '43',
                'case_type_name' => 'احوال شخصيه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            165 => 
            array (
                'id' => 481,
                'degree_value' => '4',
                'court_value' => '44',
                'case_type_name' => 'ايداع تحكيم',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            166 => 
            array (
                'id' => 482,
                'degree_value' => '4',
                'court_value' => '44',
                'case_type_name' => 'حسبى',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            167 => 
            array (
                'id' => 483,
                'degree_value' => '4',
                'court_value' => '44',
                'case_type_name' => 'اجانب',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            168 => 
            array (
                'id' => 489,
                'degree_value' => '4',
                'court_value' => '45',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            169 => 
            array (
                'id' => 490,
                'degree_value' => '4',
                'court_value' => '45',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            170 => 
            array (
                'id' => 491,
                'degree_value' => '4',
                'court_value' => '45',
                'case_type_name' => 'مساكن',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            171 => 
            array (
                'id' => 492,
                'degree_value' => '4',
                'court_value' => '45',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            172 => 
            array (
                'id' => 493,
                'degree_value' => '2',
                'court_value' => '1',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            173 => 
            array (
                'id' => 494,
                'degree_value' => '2',
                'court_value' => '1',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            174 => 
            array (
                'id' => 495,
                'degree_value' => '2',
                'court_value' => '1',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            175 => 
            array (
                'id' => 496,
                'degree_value' => '2',
                'court_value' => '1',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            176 => 
            array (
                'id' => 497,
                'degree_value' => '2',
                'court_value' => '1',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            177 => 
            array (
                'id' => 498,
                'degree_value' => '2',
                'court_value' => '1',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            178 => 
            array (
                'id' => 499,
                'degree_value' => '2',
                'court_value' => '1',
                'case_type_name' => 'اوامر تحكيم',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            179 => 
            array (
                'id' => 500,
                'degree_value' => '2',
                'court_value' => '1',
                'case_type_name' => 'ايداع تحكيم',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            180 => 
            array (
                'id' => 501,
                'degree_value' => '2',
                'court_value' => '1',
                'case_type_name' => 'فض منازعات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            181 => 
            array (
                'id' => 502,
                'degree_value' => '2',
                'court_value' => '1',
                'case_type_name' => 'تحكيم عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            182 => 
            array (
                'id' => 503,
                'degree_value' => '2',
                'court_value' => '1',
                'case_type_name' => 'نقابه عامه',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            183 => 
            array (
                'id' => 504,
                'degree_value' => '2',
                'court_value' => '1',
                'case_type_name' => 'اقتصاد',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            184 => 
            array (
                'id' => 505,
                'degree_value' => '2',
                'court_value' => '2',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            185 => 
            array (
                'id' => 506,
                'degree_value' => '2',
                'court_value' => '2',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            186 => 
            array (
                'id' => 507,
                'degree_value' => '2',
                'court_value' => '2',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            187 => 
            array (
                'id' => 508,
                'degree_value' => '2',
                'court_value' => '2',
                'case_type_name' => 'احوال شخصية',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            188 => 
            array (
                'id' => 509,
                'degree_value' => '2',
                'court_value' => '2',
                'case_type_name' => 'رد مخاصمة',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            189 => 
            array (
                'id' => 510,
                'degree_value' => '2',
                'court_value' => '2',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            190 => 
            array (
                'id' => 511,
                'degree_value' => '2',
                'court_value' => '2',
                'case_type_name' => 'بطلان تحكيم',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            191 => 
            array (
                'id' => 512,
                'degree_value' => '2',
                'court_value' => '2',
                'case_type_name' => 'ايداع تحكيم',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            192 => 
            array (
                'id' => 513,
                'degree_value' => '2',
                'court_value' => '2',
                'case_type_name' => 'جمعيات اهلية',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            193 => 
            array (
                'id' => 514,
                'degree_value' => '2',
                'court_value' => '2',
                'case_type_name' => 'تحكيم عمالى',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            194 => 
            array (
                'id' => 515,
                'degree_value' => '2',
                'court_value' => '2',
                'case_type_name' => 'رد ومخاصمة استئنافية',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            195 => 
            array (
                'id' => 516,
                'degree_value' => '2',
                'court_value' => '3',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            196 => 
            array (
                'id' => 517,
                'degree_value' => '2',
                'court_value' => '3',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            197 => 
            array (
                'id' => 518,
                'degree_value' => '2',
                'court_value' => '3',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            198 => 
            array (
                'id' => 519,
                'degree_value' => '2',
                'court_value' => '3',
                'case_type_name' => 'احوال شخصيه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            199 => 
            array (
                'id' => 520,
                'degree_value' => '2',
                'court_value' => '3',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            200 => 
            array (
                'id' => 521,
                'degree_value' => '2',
                'court_value' => '3',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            201 => 
            array (
                'id' => 522,
                'degree_value' => '2',
                'court_value' => '3',
                'case_type_name' => 'اوامر تحكيم',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            202 => 
            array (
                'id' => 523,
                'degree_value' => '2',
                'court_value' => '3',
                'case_type_name' => 'ايداع تحكيم',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            203 => 
            array (
                'id' => 524,
                'degree_value' => '2',
                'court_value' => '3',
                'case_type_name' => 'اسره حسبى',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            204 => 
            array (
                'id' => 525,
                'degree_value' => '2',
                'court_value' => '4',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            205 => 
            array (
                'id' => 526,
                'degree_value' => '2',
                'court_value' => '4',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            206 => 
            array (
                'id' => 527,
                'degree_value' => '2',
                'court_value' => '4',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            207 => 
            array (
                'id' => 528,
                'degree_value' => '2',
                'court_value' => '4',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            208 => 
            array (
                'id' => 529,
                'degree_value' => '2',
                'court_value' => '4',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            209 => 
            array (
                'id' => 530,
                'degree_value' => '2',
                'court_value' => '4',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            210 => 
            array (
                'id' => 531,
                'degree_value' => '2',
                'court_value' => '4',
                'case_type_name' => 'التماس اعاده نظر',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            211 => 
            array (
                'id' => 532,
                'degree_value' => '2',
                'court_value' => '4',
                'case_type_name' => 'افلاس',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            212 => 
            array (
                'id' => 533,
                'degree_value' => '2',
                'court_value' => '4',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            213 => 
            array (
                'id' => 534,
                'degree_value' => '2',
                'court_value' => '4',
                'case_type_name' => 'التماس اعاده نظر نفس',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            214 => 
            array (
                'id' => 535,
                'degree_value' => '2',
                'court_value' => '4',
                'case_type_name' => 'اسره',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            215 => 
            array (
                'id' => 536,
                'degree_value' => '2',
                'court_value' => '5',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            216 => 
            array (
                'id' => 537,
                'degree_value' => '2',
                'court_value' => '5',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            217 => 
            array (
                'id' => 538,
                'degree_value' => '2',
                'court_value' => '5',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            218 => 
            array (
                'id' => 539,
                'degree_value' => '2',
                'court_value' => '5',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            219 => 
            array (
                'id' => 540,
                'degree_value' => '2',
                'court_value' => '5',
                'case_type_name' => 'مخاصمة',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            220 => 
            array (
                'id' => 541,
                'degree_value' => '2',
                'court_value' => '5',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            221 => 
            array (
                'id' => 542,
                'degree_value' => '2',
                'court_value' => '5',
                'case_type_name' => 'رد',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            222 => 
            array (
                'id' => 543,
                'degree_value' => '2',
                'court_value' => '7',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            223 => 
            array (
                'id' => 544,
                'degree_value' => '2',
                'court_value' => '7',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            224 => 
            array (
                'id' => 545,
                'degree_value' => '2',
                'court_value' => '7',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            225 => 
            array (
                'id' => 546,
                'degree_value' => '2',
                'court_value' => '7',
                'case_type_name' => 'احوال شخصيه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            226 => 
            array (
                'id' => 547,
                'degree_value' => '2',
                'court_value' => '7',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            227 => 
            array (
                'id' => 548,
                'degree_value' => '2',
                'court_value' => '7',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            228 => 
            array (
                'id' => 549,
                'degree_value' => '2',
                'court_value' => '7',
                'case_type_name' => 'احوال ولايه',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            229 => 
            array (
                'id' => 550,
                'degree_value' => '2',
                'court_value' => '7',
                'case_type_name' => 'محكمه الاسره',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            230 => 
            array (
                'id' => 551,
                'degree_value' => '2',
                'court_value' => '7',
                'case_type_name' => 'محكمه اسره حسبى',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            231 => 
            array (
                'id' => 552,
                'degree_value' => '2',
                'court_value' => '7',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            232 => 
            array (
                'id' => 553,
                'degree_value' => '2',
                'court_value' => '8',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            233 => 
            array (
                'id' => 554,
                'degree_value' => '2',
                'court_value' => '8',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            234 => 
            array (
                'id' => 555,
                'degree_value' => '2',
                'court_value' => '8',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            235 => 
            array (
                'id' => 556,
                'degree_value' => '2',
                'court_value' => '8',
                'case_type_name' => 'احوال شخصيه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            236 => 
            array (
                'id' => 557,
                'degree_value' => '2',
                'court_value' => '8',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            237 => 
            array (
                'id' => 558,
                'degree_value' => '2',
                'court_value' => '8',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            238 => 
            array (
                'id' => 559,
                'degree_value' => '2',
                'court_value' => '8',
                'case_type_name' => 'افلاس',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            239 => 
            array (
                'id' => 560,
                'degree_value' => '2',
                'court_value' => '8',
                'case_type_name' => 'محكمة اسرة احوال',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            240 => 
            array (
                'id' => 561,
                'degree_value' => '2',
                'court_value' => '8',
                'case_type_name' => 'مال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            241 => 
            array (
                'id' => 562,
                'degree_value' => '2',
                'court_value' => '8',
                'case_type_name' => 'اقتصاديه',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            242 => 
            array (
                'id' => 563,
                'degree_value' => '2',
                'court_value' => '10',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            243 => 
            array (
                'id' => 564,
                'degree_value' => '2',
                'court_value' => '10',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            244 => 
            array (
                'id' => 565,
                'degree_value' => '2',
                'court_value' => '10',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            245 => 
            array (
                'id' => 566,
                'degree_value' => '2',
                'court_value' => '10',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            246 => 
            array (
                'id' => 567,
                'degree_value' => '2',
                'court_value' => '10',
                'case_type_name' => 'رد',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            247 => 
            array (
                'id' => 568,
                'degree_value' => '2',
                'court_value' => '10',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            248 => 
            array (
                'id' => 569,
                'degree_value' => '2',
                'court_value' => '10',
                'case_type_name' => 'س اسره',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            249 => 
            array (
                'id' => 570,
                'degree_value' => '2',
                'court_value' => '10',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            250 => 
            array (
                'id' => 571,
                'degree_value' => '2',
                'court_value' => '10',
                'case_type_name' => 'مخاصمه',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            251 => 
            array (
                'id' => 572,
                'degree_value' => '2',
                'court_value' => '11',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            252 => 
            array (
                'id' => 573,
                'degree_value' => '2',
                'court_value' => '11',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            253 => 
            array (
                'id' => 574,
                'degree_value' => '2',
                'court_value' => '11',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            254 => 
            array (
                'id' => 575,
                'degree_value' => '2',
                'court_value' => '11',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            255 => 
            array (
                'id' => 576,
                'degree_value' => '2',
                'court_value' => '11',
                'case_type_name' => 'رد',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            256 => 
            array (
                'id' => 577,
                'degree_value' => '2',
                'court_value' => '11',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            257 => 
            array (
                'id' => 578,
                'degree_value' => '2',
                'court_value' => '11',
                'case_type_name' => 'اسره',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            258 => 
            array (
                'id' => 579,
                'degree_value' => '2',
                'court_value' => '11',
                'case_type_name' => 'مخاصمه',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            259 => 
            array (
                'id' => 580,
                'degree_value' => '2',
                'court_value' => '12',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            260 => 
            array (
                'id' => 581,
                'degree_value' => '2',
                'court_value' => '12',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            261 => 
            array (
                'id' => 582,
                'degree_value' => '2',
                'court_value' => '12',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            262 => 
            array (
                'id' => 583,
                'degree_value' => '2',
                'court_value' => '12',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            263 => 
            array (
                'id' => 584,
                'degree_value' => '2',
                'court_value' => '12',
                'case_type_name' => 'رد',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            264 => 
            array (
                'id' => 585,
                'degree_value' => '2',
                'court_value' => '12',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            265 => 
            array (
                'id' => 586,
                'degree_value' => '2',
                'court_value' => '12',
                'case_type_name' => 'س اسره',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            266 => 
            array (
                'id' => 587,
                'degree_value' => '2',
                'court_value' => '12',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            267 => 
            array (
                'id' => 588,
                'degree_value' => '2',
                'court_value' => '12',
                'case_type_name' => 'مخاصمه',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            268 => 
            array (
                'id' => 589,
                'degree_value' => '2',
                'court_value' => '13',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            269 => 
            array (
                'id' => 590,
                'degree_value' => '2',
                'court_value' => '13',
                'case_type_name' => 'احوال شخصية',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            270 => 
            array (
                'id' => 591,
                'degree_value' => '2',
                'court_value' => '14',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            271 => 
            array (
                'id' => 592,
                'degree_value' => '2',
                'court_value' => '14',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            272 => 
            array (
                'id' => 593,
                'degree_value' => '2',
                'court_value' => '14',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            273 => 
            array (
                'id' => 594,
                'degree_value' => '2',
                'court_value' => '14',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            274 => 
            array (
                'id' => 595,
                'degree_value' => '2',
                'court_value' => '14',
                'case_type_name' => 'رد ومخاصمة',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            275 => 
            array (
                'id' => 596,
                'degree_value' => '2',
                'court_value' => '14',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            276 => 
            array (
                'id' => 597,
                'degree_value' => '2',
                'court_value' => '16',
                'case_type_name' => 'احوال شخصية',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            277 => 
            array (
                'id' => 598,
                'degree_value' => '2',
                'court_value' => '16',
                'case_type_name' => 'حسبى',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            278 => 
            array (
                'id' => 599,
                'degree_value' => '2',
                'court_value' => '17',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            279 => 
            array (
                'id' => 600,
                'degree_value' => '2',
                'court_value' => '17',
                'case_type_name' => 'حسبى',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            280 => 
            array (
                'id' => 601,
                'degree_value' => '2',
                'court_value' => '18',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            281 => 
            array (
                'id' => 602,
                'degree_value' => '2',
                'court_value' => '18',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            282 => 
            array (
                'id' => 603,
                'degree_value' => '2',
                'court_value' => '18',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            283 => 
            array (
                'id' => 604,
                'degree_value' => '2',
                'court_value' => '18',
                'case_type_name' => 'احوال نفس',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            284 => 
            array (
                'id' => 605,
                'degree_value' => '2',
                'court_value' => '18',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            285 => 
            array (
                'id' => 606,
                'degree_value' => '2',
                'court_value' => '18',
                'case_type_name' => 'امر علي عريضه',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            286 => 
            array (
                'id' => 607,
                'degree_value' => '2',
                'court_value' => '18',
                'case_type_name' => 'محكمة أسره نفس',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            287 => 
            array (
                'id' => 608,
                'degree_value' => '2',
                'court_value' => '18',
                'case_type_name' => 'محكمة أسره مال',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            288 => 
            array (
                'id' => 609,
                'degree_value' => '2',
                'court_value' => '18',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            289 => 
            array (
                'id' => 610,
                'degree_value' => '2',
                'court_value' => '18',
                'case_type_name' => 'احوال مال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            290 => 
            array (
                'id' => 611,
                'degree_value' => '2',
                'court_value' => '20',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            291 => 
            array (
                'id' => 612,
                'degree_value' => '2',
                'court_value' => '20',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            292 => 
            array (
                'id' => 613,
                'degree_value' => '2',
                'court_value' => '20',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            293 => 
            array (
                'id' => 614,
                'degree_value' => '2',
                'court_value' => '20',
                'case_type_name' => 'احوال شخصية',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            294 => 
            array (
                'id' => 615,
                'degree_value' => '2',
                'court_value' => '20',
                'case_type_name' => 'رد ومخاصمة',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            295 => 
            array (
                'id' => 616,
                'degree_value' => '2',
                'court_value' => '21',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            296 => 
            array (
                'id' => 617,
                'degree_value' => '2',
                'court_value' => '21',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            297 => 
            array (
                'id' => 618,
                'degree_value' => '2',
                'court_value' => '21',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            298 => 
            array (
                'id' => 619,
                'degree_value' => '2',
                'court_value' => '21',
                'case_type_name' => 'احوال شخصية',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            299 => 
            array (
                'id' => 620,
                'degree_value' => '2',
                'court_value' => '21',
                'case_type_name' => 'ومخاصمة',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            300 => 
            array (
                'id' => 621,
                'degree_value' => '2',
                'court_value' => '21',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            301 => 
            array (
                'id' => 622,
                'degree_value' => '2',
                'court_value' => '21',
                'case_type_name' => 'احالة من دار القضاء',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            302 => 
            array (
                'id' => 623,
                'degree_value' => '2',
                'court_value' => '30',
                'case_type_name' => 'اسره',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            303 => 
            array (
                'id' => 624,
                'degree_value' => '2',
                'court_value' => '31',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            304 => 
            array (
                'id' => 625,
                'degree_value' => '2',
                'court_value' => '32',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            305 => 
            array (
                'id' => 626,
                'degree_value' => '2',
                'court_value' => '32',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            306 => 
            array (
                'id' => 627,
                'degree_value' => '2',
                'court_value' => '32',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            307 => 
            array (
                'id' => 628,
                'degree_value' => '2',
                'court_value' => '32',
                'case_type_name' => 'احوال',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            308 => 
            array (
                'id' => 629,
                'degree_value' => '2',
                'court_value' => '32',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            309 => 
            array (
                'id' => 630,
                'degree_value' => '2',
                'court_value' => '32',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            310 => 
            array (
                'id' => 631,
                'degree_value' => '2',
                'court_value' => '32',
                'case_type_name' => 'اوامر تحكيم',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            311 => 
            array (
                'id' => 632,
                'degree_value' => '2',
                'court_value' => '32',
                'case_type_name' => 'ايداع تحكيم',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            312 => 
            array (
                'id' => 633,
                'degree_value' => '2',
                'court_value' => '43',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            313 => 
            array (
                'id' => 634,
                'degree_value' => '2',
                'court_value' => '43',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            314 => 
            array (
                'id' => 635,
                'degree_value' => '2',
                'court_value' => '43',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            315 => 
            array (
                'id' => 636,
                'degree_value' => '2',
                'court_value' => '43',
                'case_type_name' => 'احوال شخصيه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            316 => 
            array (
                'id' => 637,
                'degree_value' => '2',
                'court_value' => '43',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            317 => 
            array (
                'id' => 638,
                'degree_value' => '2',
                'court_value' => '44',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            318 => 
            array (
                'id' => 639,
                'degree_value' => '2',
                'court_value' => '44',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            319 => 
            array (
                'id' => 640,
                'degree_value' => '2',
                'court_value' => '44',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            320 => 
            array (
                'id' => 641,
                'degree_value' => '2',
                'court_value' => '44',
                'case_type_name' => 'احوال شخصيه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            321 => 
            array (
                'id' => 642,
                'degree_value' => '2',
                'court_value' => '44',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            322 => 
            array (
                'id' => 643,
                'degree_value' => '2',
                'court_value' => '44',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            323 => 
            array (
                'id' => 644,
                'degree_value' => '2',
                'court_value' => '44',
                'case_type_name' => 'اوامر تحكيم',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            324 => 
            array (
                'id' => 645,
                'degree_value' => '2',
                'court_value' => '44',
                'case_type_name' => 'ايداع تحكيم',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            325 => 
            array (
                'id' => 646,
                'degree_value' => '2',
                'court_value' => '44',
                'case_type_name' => 'حسبى',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            326 => 
            array (
                'id' => 647,
                'degree_value' => '2',
                'court_value' => '44',
                'case_type_name' => 'اجانب',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            327 => 
            array (
                'id' => 648,
                'degree_value' => '2',
                'court_value' => '45',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            328 => 
            array (
                'id' => 649,
                'degree_value' => '2',
                'court_value' => '45',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            329 => 
            array (
                'id' => 650,
                'degree_value' => '2',
                'court_value' => '45',
                'case_type_name' => 'عمال',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            330 => 
            array (
                'id' => 651,
                'degree_value' => '2',
                'court_value' => '45',
                'case_type_name' => 'احوال شخصيه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            331 => 
            array (
                'id' => 652,
                'degree_value' => '2',
                'court_value' => '45',
                'case_type_name' => 'رد ومخاصمه',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            332 => 
            array (
                'id' => 653,
                'degree_value' => '2',
                'court_value' => '45',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            333 => 
            array (
                'id' => 654,
                'degree_value' => '2',
                'court_value' => '45',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            334 => 
            array (
                'id' => 655,
                'degree_value' => '2',
                'court_value' => '45',
                'case_type_name' => 'مساكن',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            335 => 
            array (
                'id' => 656,
                'degree_value' => '2',
                'court_value' => '45',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            336 => 
            array (
                'id' => 657,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            337 => 
            array (
                'id' => 658,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            338 => 
            array (
                'id' => 659,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            339 => 
            array (
                'id' => 660,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            340 => 
            array (
                'id' => 661,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            341 => 
            array (
                'id' => 662,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            342 => 
            array (
                'id' => 663,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            343 => 
            array (
                'id' => 664,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            344 => 
            array (
                'id' => 665,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            345 => 
            array (
                'id' => 666,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'عمال كلى',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            346 => 
            array (
                'id' => 667,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'بيئة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            347 => 
            array (
                'id' => 668,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            348 => 
            array (
                'id' => 669,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'استثمار',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            349 => 
            array (
                'id' => 670,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            350 => 
            array (
                'id' => 671,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'افلاس',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            351 => 
            array (
                'id' => 672,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'تجاري تحكيم',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            352 => 
            array (
                'id' => 673,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'تجاري مستأنف',
                'case_type_value' => '28',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            353 => 
            array (
                'id' => 674,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'تظلمات رسوم',
                'case_type_value' => '29',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            354 => 
            array (
                'id' => 675,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'عمال مستأنف',
                'case_type_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            355 => 
            array (
                'id' => 676,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'لجنة منازعات عمال',
                'case_type_value' => '41',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            356 => 
            array (
                'id' => 677,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'طعون ايجارات',
                'case_type_value' => '42',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            357 => 
            array (
                'id' => 678,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'لجنة معافاه',
                'case_type_value' => '44',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            358 => 
            array (
                'id' => 679,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'دعاوى وقف',
                'case_type_value' => '45',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            359 => 
            array (
                'id' => 680,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'لجنة تحسين',
                'case_type_value' => '46',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            360 => 
            array (
                'id' => 681,
                'degree_value' => '3',
                'court_value' => '1',
                'case_type_name' => 'قوامة',
                'case_type_value' => '47',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            361 => 
            array (
                'id' => 682,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            362 => 
            array (
                'id' => 683,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'مدنى كلى وحكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            363 => 
            array (
                'id' => 684,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            364 => 
            array (
                'id' => 685,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            365 => 
            array (
                'id' => 686,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            366 => 
            array (
                'id' => 687,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            367 => 
            array (
                'id' => 688,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            368 => 
            array (
                'id' => 689,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            369 => 
            array (
                'id' => 690,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'قيم',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            370 => 
            array (
                'id' => 691,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'معفاه',
                'case_type_value' => '20',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            371 => 
            array (
                'id' => 692,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'طعون مساكن',
                'case_type_value' => '23',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            372 => 
            array (
                'id' => 693,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'لجنة تحسين',
                'case_type_value' => '28',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            373 => 
            array (
                'id' => 694,
                'degree_value' => '3',
                'court_value' => '2',
                'case_type_name' => 'مدنى وقف',
                'case_type_value' => '38',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            374 => 
            array (
                'id' => 695,
                'degree_value' => '3',
                'court_value' => '3',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            375 => 
            array (
                'id' => 696,
                'degree_value' => '3',
                'court_value' => '3',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            376 => 
            array (
                'id' => 697,
                'degree_value' => '3',
                'court_value' => '3',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            377 => 
            array (
                'id' => 698,
                'degree_value' => '3',
                'court_value' => '3',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            378 => 
            array (
                'id' => 699,
                'degree_value' => '3',
                'court_value' => '3',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            379 => 
            array (
                'id' => 700,
                'degree_value' => '3',
                'court_value' => '3',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            380 => 
            array (
                'id' => 701,
                'degree_value' => '3',
                'court_value' => '3',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            381 => 
            array (
                'id' => 702,
                'degree_value' => '3',
                'court_value' => '3',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            382 => 
            array (
                'id' => 703,
                'degree_value' => '3',
                'court_value' => '3',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            383 => 
            array (
                'id' => 704,
                'degree_value' => '3',
                'court_value' => '3',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            384 => 
            array (
                'id' => 705,
                'degree_value' => '3',
                'court_value' => '3',
                'case_type_name' => 'بيئة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            385 => 
            array (
                'id' => 706,
                'degree_value' => '3',
                'court_value' => '3',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            386 => 
            array (
                'id' => 707,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            387 => 
            array (
                'id' => 708,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            388 => 
            array (
                'id' => 709,
                'degree_value' => '3',
                'court_value' => '4',
            'case_type_name' => 'مساكن(ايجارات)',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            389 => 
            array (
                'id' => 710,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            390 => 
            array (
                'id' => 711,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            391 => 
            array (
                'id' => 712,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'مستأنف مستعجل وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            392 => 
            array (
                'id' => 713,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            393 => 
            array (
                'id' => 714,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            394 => 
            array (
                'id' => 715,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'تجارى كلى',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            395 => 
            array (
                'id' => 716,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'عمال كلى',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            396 => 
            array (
                'id' => 717,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'بيئة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            397 => 
            array (
                'id' => 718,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            398 => 
            array (
                'id' => 719,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'قضايا استثمار',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            399 => 
            array (
                'id' => 720,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'تجارى مستأنف',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            400 => 
            array (
                'id' => 721,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'صحة توقيع كلى',
                'case_type_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            401 => 
            array (
                'id' => 722,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'افلاس',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            402 => 
            array (
                'id' => 723,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'لجنة عمالية',
                'case_type_value' => '17',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            403 => 
            array (
                'id' => 724,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'محكمة عمالية',
                'case_type_value' => '18',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            404 => 
            array (
                'id' => 725,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'لجنة اتعاب محاماه',
                'case_type_value' => '19',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            405 => 
            array (
                'id' => 726,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'تظلم من امر رفض مدنى',
                'case_type_value' => '20',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            406 => 
            array (
                'id' => 727,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'تجارى جزئى',
                'case_type_value' => '21',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            407 => 
            array (
                'id' => 728,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'الاحوال الشخصية',
                'case_type_value' => '22',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            408 => 
            array (
                'id' => 729,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'تظلم من امر تقدير رسوم',
                'case_type_value' => '23',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            409 => 
            array (
                'id' => 730,
                'degree_value' => '3',
                'court_value' => '4',
                'case_type_name' => 'تظلم من امر رفض تجارى',
                'case_type_value' => '24',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            410 => 
            array (
                'id' => 731,
                'degree_value' => '3',
                'court_value' => '5',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            411 => 
            array (
                'id' => 732,
                'degree_value' => '3',
                'court_value' => '5',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            412 => 
            array (
                'id' => 733,
                'degree_value' => '3',
                'court_value' => '5',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            413 => 
            array (
                'id' => 734,
                'degree_value' => '3',
                'court_value' => '5',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            414 => 
            array (
                'id' => 735,
                'degree_value' => '3',
                'court_value' => '5',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            415 => 
            array (
                'id' => 736,
                'degree_value' => '3',
                'court_value' => '5',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            416 => 
            array (
                'id' => 737,
                'degree_value' => '3',
                'court_value' => '5',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            417 => 
            array (
                'id' => 738,
                'degree_value' => '3',
                'court_value' => '5',
                'case_type_name' => 'استئناف اشكال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            418 => 
            array (
                'id' => 739,
                'degree_value' => '3',
                'court_value' => '5',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            419 => 
            array (
                'id' => 740,
                'degree_value' => '3',
                'court_value' => '5',
                'case_type_name' => 'مستانف مستعجل',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            420 => 
            array (
                'id' => 741,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            421 => 
            array (
                'id' => 742,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'تعيين قيم',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            422 => 
            array (
                'id' => 743,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'مساكن',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            423 => 
            array (
                'id' => 744,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            424 => 
            array (
                'id' => 745,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            425 => 
            array (
                'id' => 746,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            426 => 
            array (
                'id' => 747,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            427 => 
            array (
                'id' => 748,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'تجارى كلى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            428 => 
            array (
                'id' => 749,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'عمال كلى',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            429 => 
            array (
                'id' => 750,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'عمال مستأنف',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            430 => 
            array (
                'id' => 751,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'تفسير حكم',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            431 => 
            array (
                'id' => 752,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'معارضة',
                'case_type_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            432 => 
            array (
                'id' => 753,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'محكمين',
                'case_type_value' => '20',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            433 => 
            array (
                'id' => 754,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'مستأنف مستعجل وتنفيذ',
                'case_type_value' => '22',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            434 => 
            array (
                'id' => 755,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'الاوقاف',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            435 => 
            array (
                'id' => 756,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'حكومة',
                'case_type_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            436 => 
            array (
                'id' => 757,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'تأمينات',
                'case_type_value' => '29',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            437 => 
            array (
                'id' => 758,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'إعسار',
                'case_type_value' => '31',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            438 => 
            array (
                'id' => 759,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'البيئة',
                'case_type_value' => '32',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            439 => 
            array (
                'id' => 760,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'التماسات',
                'case_type_value' => '35',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            440 => 
            array (
                'id' => 761,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'التماسات تجاري',
                'case_type_value' => '36',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            441 => 
            array (
                'id' => 762,
                'degree_value' => '3',
                'court_value' => '6',
                'case_type_name' => 'التماسات مستعجل',
                'case_type_value' => '37',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            442 => 
            array (
                'id' => 763,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            443 => 
            array (
                'id' => 764,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            444 => 
            array (
                'id' => 765,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            445 => 
            array (
                'id' => 766,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            446 => 
            array (
                'id' => 767,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            447 => 
            array (
                'id' => 768,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            448 => 
            array (
                'id' => 769,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            449 => 
            array (
                'id' => 770,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'تجارى كلى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            450 => 
            array (
                'id' => 771,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'عمال كلى',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            451 => 
            array (
                'id' => 772,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'افلاس',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            452 => 
            array (
                'id' => 773,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'محكمة عمالية',
                'case_type_value' => '18',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            453 => 
            array (
                'id' => 774,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'لجنة تقدير اتعاب',
                'case_type_value' => '19',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            454 => 
            array (
                'id' => 775,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'تعيين قيم',
                'case_type_value' => '22',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            455 => 
            array (
                'id' => 776,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'ايجارات قانون قديم',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            456 => 
            array (
                'id' => 777,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'قانون ايجارات جديد',
                'case_type_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            457 => 
            array (
                'id' => 778,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            458 => 
            array (
                'id' => 779,
                'degree_value' => '3',
                'court_value' => '7',
                'case_type_name' => 'لجنه طعن التعاون الاستهلاكى',
                'case_type_value' => '40',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            459 => 
            array (
                'id' => 780,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            460 => 
            array (
                'id' => 781,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            461 => 
            array (
                'id' => 782,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            462 => 
            array (
                'id' => 783,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            463 => 
            array (
                'id' => 784,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            464 => 
            array (
                'id' => 785,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            465 => 
            array (
                'id' => 786,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            466 => 
            array (
                'id' => 787,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            467 => 
            array (
                'id' => 788,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            468 => 
            array (
                'id' => 789,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            469 => 
            array (
                'id' => 790,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'افلاس',
                'case_type_value' => '19',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            470 => 
            array (
                'id' => 791,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'الاوقاف',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            471 => 
            array (
                'id' => 792,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'طعون ايجارات',
                'case_type_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            472 => 
            array (
                'id' => 793,
                'degree_value' => '3',
                'court_value' => '8',
                'case_type_name' => 'منازعات شركات الافراد والمطالبة القضائية',
                'case_type_value' => '40',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            473 => 
            array (
                'id' => 794,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            474 => 
            array (
                'id' => 795,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            475 => 
            array (
                'id' => 796,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            476 => 
            array (
                'id' => 797,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            477 => 
            array (
                'id' => 798,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            478 => 
            array (
                'id' => 799,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            479 => 
            array (
                'id' => 800,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            480 => 
            array (
                'id' => 801,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'تجارى كلى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            481 => 
            array (
                'id' => 802,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'عمال كلى',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            482 => 
            array (
                'id' => 803,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'استثمار',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            483 => 
            array (
                'id' => 804,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'صحة توقيع كلى',
                'case_type_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            484 => 
            array (
                'id' => 805,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'افلاس',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            485 => 
            array (
                'id' => 806,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'محكمة عمالية',
                'case_type_value' => '18',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            486 => 
            array (
                'id' => 807,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'لجنة تقدير اتعاب',
                'case_type_value' => '19',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            487 => 
            array (
                'id' => 808,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'تعيين قيم',
                'case_type_value' => '22',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            488 => 
            array (
                'id' => 809,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'ايجارات قانون قديم',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            489 => 
            array (
                'id' => 810,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'قانون ايجارات جديد',
                'case_type_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            490 => 
            array (
                'id' => 811,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            491 => 
            array (
                'id' => 812,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'طعون ايجارات',
                'case_type_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            492 => 
            array (
                'id' => 813,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'احوال اجانب',
                'case_type_value' => '31',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            493 => 
            array (
                'id' => 814,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'تظلمات',
                'case_type_value' => '32',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            494 => 
            array (
                'id' => 815,
                'degree_value' => '3',
                'court_value' => '9',
                'case_type_name' => 'رد اعتبار',
                'case_type_value' => '33',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            495 => 
            array (
                'id' => 816,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            496 => 
            array (
                'id' => 817,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            497 => 
            array (
                'id' => 818,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            498 => 
            array (
                'id' => 819,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            499 => 
            array (
                'id' => 820,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));
        \DB::table('search_case_types')->insert(array (
            0 => 
            array (
                'id' => 821,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 822,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 823,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 824,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 825,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            5 => 
            array (
                'id' => 826,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'بيئة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            6 => 
            array (
                'id' => 827,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'قضايا استثمار',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            7 => 
            array (
                'id' => 828,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'صحة توقيع كلى',
                'case_type_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            8 => 
            array (
                'id' => 829,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'افلاس',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            9 => 
            array (
                'id' => 830,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'لجنة عمالية',
                'case_type_value' => '17',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            10 => 
            array (
                'id' => 831,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            11 => 
            array (
                'id' => 832,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'تجارى بحرى',
                'case_type_value' => '40',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            12 => 
            array (
                'id' => 833,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'لجنة منازعات محامين',
                'case_type_value' => '41',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            13 => 
            array (
                'id' => 834,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'طعون ايجارات',
                'case_type_value' => '42',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            14 => 
            array (
                'id' => 835,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'احكام محكمين',
                'case_type_value' => '43',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            15 => 
            array (
                'id' => 836,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'لنجة معافاه',
                'case_type_value' => '44',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            16 => 
            array (
                'id' => 837,
                'degree_value' => '3',
                'court_value' => '10',
                'case_type_name' => 'احوال شخصية',
                'case_type_value' => '45',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            17 => 
            array (
                'id' => 838,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            18 => 
            array (
                'id' => 839,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            19 => 
            array (
                'id' => 840,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'مساكن وايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            20 => 
            array (
                'id' => 841,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'مدنى مستئأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            21 => 
            array (
                'id' => 842,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'مستأنف مستعجل وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            22 => 
            array (
                'id' => 843,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            23 => 
            array (
                'id' => 844,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            24 => 
            array (
                'id' => 845,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            25 => 
            array (
                'id' => 846,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'لجنة اتعاب محاماه',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            26 => 
            array (
                'id' => 847,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'بيئة',
                'case_type_value' => '28',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            27 => 
            array (
                'id' => 848,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '31',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            28 => 
            array (
                'id' => 849,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'اعسار',
                'case_type_value' => '34',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            29 => 
            array (
                'id' => 850,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'قوامة',
                'case_type_value' => '35',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            30 => 
            array (
                'id' => 851,
                'degree_value' => '3',
                'court_value' => '11',
                'case_type_name' => 'اوقاف',
                'case_type_value' => '36',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            31 => 
            array (
                'id' => 852,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            32 => 
            array (
                'id' => 853,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            33 => 
            array (
                'id' => 854,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            34 => 
            array (
                'id' => 855,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            35 => 
            array (
                'id' => 856,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            36 => 
            array (
                'id' => 857,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            37 => 
            array (
                'id' => 858,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            38 => 
            array (
                'id' => 859,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            39 => 
            array (
                'id' => 860,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            40 => 
            array (
                'id' => 861,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            41 => 
            array (
                'id' => 862,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'بيئة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            42 => 
            array (
                'id' => 863,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            43 => 
            array (
                'id' => 864,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'طعون ايجارات',
                'case_type_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            44 => 
            array (
                'id' => 865,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'امور مستعجلة',
                'case_type_value' => '31',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            45 => 
            array (
                'id' => 866,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'اعسار',
                'case_type_value' => '32',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            46 => 
            array (
                'id' => 867,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'مدنى مستأنف شبين القناطر وكفر شكر',
                'case_type_value' => '39',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            47 => 
            array (
                'id' => 868,
                'degree_value' => '3',
                'court_value' => '12',
                'case_type_name' => 'مستأنف مستعجل شبين القناطر وكفر شكر',
                'case_type_value' => '40',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            48 => 
            array (
                'id' => 869,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            49 => 
            array (
                'id' => 870,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            50 => 
            array (
                'id' => 871,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            51 => 
            array (
                'id' => 872,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            52 => 
            array (
                'id' => 873,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            53 => 
            array (
                'id' => 874,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            54 => 
            array (
                'id' => 875,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            55 => 
            array (
                'id' => 876,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            56 => 
            array (
                'id' => 877,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            57 => 
            array (
                'id' => 878,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            58 => 
            array (
                'id' => 879,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'ايجارات مدنى',
                'case_type_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            59 => 
            array (
                'id' => 880,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            60 => 
            array (
                'id' => 881,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'مستأنف حكومة',
                'case_type_value' => '28',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            61 => 
            array (
                'id' => 882,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'مستأنف تنفيذ',
                'case_type_value' => '29',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            62 => 
            array (
                'id' => 883,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'مطالبات قضائية',
                'case_type_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            63 => 
            array (
                'id' => 884,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'مدنى وقف',
                'case_type_value' => '31',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            64 => 
            array (
                'id' => 885,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'اعسار',
                'case_type_value' => '32',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            65 => 
            array (
                'id' => 886,
                'degree_value' => '3',
                'court_value' => '13',
                'case_type_name' => 'معافاه',
                'case_type_value' => '33',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            66 => 
            array (
                'id' => 887,
                'degree_value' => '3',
                'court_value' => '14',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            67 => 
            array (
                'id' => 888,
                'degree_value' => '3',
                'court_value' => '14',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            68 => 
            array (
                'id' => 889,
                'degree_value' => '3',
                'court_value' => '14',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            69 => 
            array (
                'id' => 890,
                'degree_value' => '3',
                'court_value' => '14',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            70 => 
            array (
                'id' => 891,
                'degree_value' => '3',
                'court_value' => '14',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            71 => 
            array (
                'id' => 892,
                'degree_value' => '3',
                'court_value' => '14',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            72 => 
            array (
                'id' => 893,
                'degree_value' => '3',
                'court_value' => '14',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            73 => 
            array (
                'id' => 894,
                'degree_value' => '3',
                'court_value' => '14',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            74 => 
            array (
                'id' => 895,
                'degree_value' => '3',
                'court_value' => '14',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            75 => 
            array (
                'id' => 896,
                'degree_value' => '3',
                'court_value' => '14',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            76 => 
            array (
                'id' => 897,
                'degree_value' => '3',
                'court_value' => '14',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            77 => 
            array (
                'id' => 898,
                'degree_value' => '3',
                'court_value' => '14',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            78 => 
            array (
                'id' => 899,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            79 => 
            array (
                'id' => 900,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            80 => 
            array (
                'id' => 901,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            81 => 
            array (
                'id' => 902,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            82 => 
            array (
                'id' => 903,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            83 => 
            array (
                'id' => 904,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            84 => 
            array (
                'id' => 905,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            85 => 
            array (
                'id' => 906,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            86 => 
            array (
                'id' => 907,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            87 => 
            array (
                'id' => 908,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            88 => 
            array (
                'id' => 909,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            89 => 
            array (
                'id' => 910,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'لجنة عمالية',
                'case_type_value' => '20',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            90 => 
            array (
                'id' => 911,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'طعون ايجارات',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            91 => 
            array (
                'id' => 912,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            92 => 
            array (
                'id' => 913,
                'degree_value' => '3',
                'court_value' => '15',
                'case_type_name' => 'بيئة',
                'case_type_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            93 => 
            array (
                'id' => 914,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            94 => 
            array (
                'id' => 915,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            95 => 
            array (
                'id' => 916,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            96 => 
            array (
                'id' => 917,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            97 => 
            array (
                'id' => 918,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            98 => 
            array (
                'id' => 919,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            99 => 
            array (
                'id' => 920,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            100 => 
            array (
                'id' => 921,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            101 => 
            array (
                'id' => 922,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            102 => 
            array (
                'id' => 923,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'افلاس',
                'case_type_value' => '18',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            103 => 
            array (
                'id' => 924,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'لجنة عمالية',
                'case_type_value' => '21',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            104 => 
            array (
                'id' => 925,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'لجان اتعاب محاماه',
                'case_type_value' => '23',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            105 => 
            array (
                'id' => 926,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'مدنى كلى اوقاف',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            106 => 
            array (
                'id' => 927,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'الامور المستعجلة',
                'case_type_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            107 => 
            array (
                'id' => 928,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            108 => 
            array (
                'id' => 929,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'بيئة',
                'case_type_value' => '31',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            109 => 
            array (
                'id' => 930,
                'degree_value' => '3',
                'court_value' => '16',
                'case_type_name' => 'لجنة الاعفاء من الرسوم القضائية',
                'case_type_value' => '36',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            110 => 
            array (
                'id' => 931,
                'degree_value' => '3',
                'court_value' => '18',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            111 => 
            array (
                'id' => 932,
                'degree_value' => '3',
                'court_value' => '18',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            112 => 
            array (
                'id' => 933,
                'degree_value' => '3',
                'court_value' => '18',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            113 => 
            array (
                'id' => 934,
                'degree_value' => '3',
                'court_value' => '18',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            114 => 
            array (
                'id' => 935,
                'degree_value' => '3',
                'court_value' => '18',
                'case_type_name' => 'مدنى مستانف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            115 => 
            array (
                'id' => 936,
                'degree_value' => '3',
                'court_value' => '18',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            116 => 
            array (
                'id' => 937,
                'degree_value' => '3',
                'court_value' => '18',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            117 => 
            array (
                'id' => 938,
                'degree_value' => '3',
                'court_value' => '18',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            118 => 
            array (
                'id' => 939,
                'degree_value' => '3',
                'court_value' => '18',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            119 => 
            array (
                'id' => 940,
                'degree_value' => '3',
                'court_value' => '18',
                'case_type_name' => 'اوقاف',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            120 => 
            array (
                'id' => 941,
                'degree_value' => '3',
                'court_value' => '18',
                'case_type_name' => 'مدنى مستأنف حكومة',
                'case_type_value' => '19',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            121 => 
            array (
                'id' => 942,
                'degree_value' => '3',
                'court_value' => '18',
                'case_type_name' => 'ايجارات قانون جديد',
                'case_type_value' => '37',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            122 => 
            array (
                'id' => 943,
                'degree_value' => '3',
                'court_value' => '19',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            123 => 
            array (
                'id' => 944,
                'degree_value' => '3',
                'court_value' => '19',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            124 => 
            array (
                'id' => 945,
                'degree_value' => '3',
                'court_value' => '19',
                'case_type_name' => 'مساكن',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            125 => 
            array (
                'id' => 946,
                'degree_value' => '3',
                'court_value' => '19',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            126 => 
            array (
                'id' => 947,
                'degree_value' => '3',
                'court_value' => '19',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            127 => 
            array (
                'id' => 948,
                'degree_value' => '3',
                'court_value' => '19',
                'case_type_name' => 'مستأنف مستعجل وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            128 => 
            array (
                'id' => 949,
                'degree_value' => '3',
                'court_value' => '19',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            129 => 
            array (
                'id' => 950,
                'degree_value' => '3',
                'court_value' => '19',
                'case_type_name' => 'تجارى كلى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            130 => 
            array (
                'id' => 951,
                'degree_value' => '3',
                'court_value' => '19',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            131 => 
            array (
                'id' => 952,
                'degree_value' => '3',
                'court_value' => '19',
                'case_type_name' => 'اوقاف',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            132 => 
            array (
                'id' => 953,
                'degree_value' => '3',
                'court_value' => '19',
                'case_type_name' => 'اعسار',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            133 => 
            array (
                'id' => 954,
                'degree_value' => '3',
                'court_value' => '19',
                'case_type_name' => 'شركات الافراد',
                'case_type_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            134 => 
            array (
                'id' => 955,
                'degree_value' => '3',
                'court_value' => '19',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            135 => 
            array (
                'id' => 956,
                'degree_value' => '3',
                'court_value' => '22',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            136 => 
            array (
                'id' => 957,
                'degree_value' => '3',
                'court_value' => '22',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            137 => 
            array (
                'id' => 958,
                'degree_value' => '3',
                'court_value' => '22',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            138 => 
            array (
                'id' => 959,
                'degree_value' => '3',
                'court_value' => '22',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            139 => 
            array (
                'id' => 960,
                'degree_value' => '3',
                'court_value' => '22',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            140 => 
            array (
                'id' => 961,
                'degree_value' => '3',
                'court_value' => '22',
                'case_type_name' => 'تجارى كلى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            141 => 
            array (
                'id' => 962,
                'degree_value' => '3',
                'court_value' => '22',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            142 => 
            array (
                'id' => 963,
                'degree_value' => '3',
                'court_value' => '22',
                'case_type_name' => 'جدول محكمة عمالية',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            143 => 
            array (
                'id' => 964,
                'degree_value' => '3',
                'court_value' => '22',
                'case_type_name' => 'مستانف مستعجل',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            144 => 
            array (
                'id' => 965,
                'degree_value' => '3',
                'court_value' => '22',
                'case_type_name' => 'منازعات شركات الافراد والمطالبات القضائية',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            145 => 
            array (
                'id' => 966,
                'degree_value' => '3',
                'court_value' => '22',
                'case_type_name' => 'قوامة',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            146 => 
            array (
                'id' => 967,
                'degree_value' => '3',
                'court_value' => '23',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            147 => 
            array (
                'id' => 968,
                'degree_value' => '3',
                'court_value' => '23',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            148 => 
            array (
                'id' => 969,
                'degree_value' => '3',
                'court_value' => '23',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            149 => 
            array (
                'id' => 970,
                'degree_value' => '3',
                'court_value' => '23',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            150 => 
            array (
                'id' => 971,
                'degree_value' => '3',
                'court_value' => '23',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            151 => 
            array (
                'id' => 972,
                'degree_value' => '3',
                'court_value' => '23',
                'case_type_name' => 'تجارى كلى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            152 => 
            array (
                'id' => 973,
                'degree_value' => '3',
                'court_value' => '23',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            153 => 
            array (
                'id' => 974,
                'degree_value' => '3',
                'court_value' => '23',
                'case_type_name' => 'مدنى بيئة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            154 => 
            array (
                'id' => 975,
                'degree_value' => '3',
                'court_value' => '23',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            155 => 
            array (
                'id' => 976,
                'degree_value' => '3',
                'court_value' => '23',
                'case_type_name' => 'اتعاب محاماه',
                'case_type_value' => '19',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            156 => 
            array (
                'id' => 977,
                'degree_value' => '3',
                'court_value' => '23',
                'case_type_name' => 'تجارى بحرى',
                'case_type_value' => '20',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            157 => 
            array (
                'id' => 978,
                'degree_value' => '3',
                'court_value' => '24',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            158 => 
            array (
                'id' => 979,
                'degree_value' => '3',
                'court_value' => '24',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            159 => 
            array (
                'id' => 980,
                'degree_value' => '3',
                'court_value' => '24',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            160 => 
            array (
                'id' => 981,
                'degree_value' => '3',
                'court_value' => '24',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            161 => 
            array (
                'id' => 982,
                'degree_value' => '3',
                'court_value' => '24',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            162 => 
            array (
                'id' => 983,
                'degree_value' => '3',
                'court_value' => '24',
                'case_type_name' => 'مستأنف تنفيذ وقتى',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            163 => 
            array (
                'id' => 984,
                'degree_value' => '3',
                'court_value' => '24',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            164 => 
            array (
                'id' => 985,
                'degree_value' => '3',
                'court_value' => '24',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            165 => 
            array (
                'id' => 986,
                'degree_value' => '3',
                'court_value' => '24',
                'case_type_name' => 'مستأنف تنفيذ موضوعى',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            166 => 
            array (
                'id' => 987,
                'degree_value' => '3',
                'court_value' => '24',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            167 => 
            array (
                'id' => 988,
                'degree_value' => '3',
                'court_value' => '24',
                'case_type_name' => 'وقف',
                'case_type_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            168 => 
            array (
                'id' => 989,
                'degree_value' => '3',
                'court_value' => '24',
                'case_type_name' => 'مدنى كلى جديد',
                'case_type_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            169 => 
            array (
                'id' => 990,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            170 => 
            array (
                'id' => 991,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            171 => 
            array (
                'id' => 992,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            172 => 
            array (
                'id' => 993,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            173 => 
            array (
                'id' => 994,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            174 => 
            array (
                'id' => 995,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'مستأنف متسعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            175 => 
            array (
                'id' => 996,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            176 => 
            array (
                'id' => 997,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            177 => 
            array (
                'id' => 998,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            178 => 
            array (
                'id' => 999,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            179 => 
            array (
                'id' => 1000,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'استئناف اشكالات',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            180 => 
            array (
                'id' => 1001,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'لجنة تحسين',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            181 => 
            array (
                'id' => 1002,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'بيوع',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            182 => 
            array (
                'id' => 1003,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'تظلمات من رسوم',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            183 => 
            array (
                'id' => 1004,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'تحكيم',
                'case_type_value' => '20',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            184 => 
            array (
                'id' => 1005,
                'degree_value' => '3',
                'court_value' => '25',
                'case_type_name' => 'لجنة المعافاه',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            185 => 
            array (
                'id' => 1006,
                'degree_value' => '3',
                'court_value' => '26',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            186 => 
            array (
                'id' => 1007,
                'degree_value' => '3',
                'court_value' => '26',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            187 => 
            array (
                'id' => 1008,
                'degree_value' => '3',
                'court_value' => '26',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            188 => 
            array (
                'id' => 1009,
                'degree_value' => '3',
                'court_value' => '26',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            189 => 
            array (
                'id' => 1010,
                'degree_value' => '3',
                'court_value' => '26',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            190 => 
            array (
                'id' => 1011,
                'degree_value' => '3',
                'court_value' => '26',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            191 => 
            array (
                'id' => 1012,
                'degree_value' => '3',
                'court_value' => '26',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            192 => 
            array (
                'id' => 1013,
                'degree_value' => '3',
                'court_value' => '26',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            193 => 
            array (
                'id' => 1014,
                'degree_value' => '3',
                'court_value' => '26',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            194 => 
            array (
                'id' => 1015,
                'degree_value' => '3',
                'court_value' => '26',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            195 => 
            array (
                'id' => 1016,
                'degree_value' => '3',
                'court_value' => '26',
                'case_type_name' => 'بيئة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            196 => 
            array (
                'id' => 1017,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            197 => 
            array (
                'id' => 1018,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            198 => 
            array (
                'id' => 1019,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            199 => 
            array (
                'id' => 1020,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            200 => 
            array (
                'id' => 1021,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            201 => 
            array (
                'id' => 1022,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            202 => 
            array (
                'id' => 1023,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            203 => 
            array (
                'id' => 1024,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            204 => 
            array (
                'id' => 1025,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            205 => 
            array (
                'id' => 1026,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            206 => 
            array (
                'id' => 1027,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'بيئة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            207 => 
            array (
                'id' => 1028,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'طعون ابجارات',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            208 => 
            array (
                'id' => 1029,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'بيوع',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            209 => 
            array (
                'id' => 1030,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'مدنى مستانف جكومه',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            210 => 
            array (
                'id' => 1031,
                'degree_value' => '3',
                'court_value' => '27',
                'case_type_name' => 'قضايا الاوقاف',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            211 => 
            array (
                'id' => 1032,
                'degree_value' => '3',
                'court_value' => '29',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            212 => 
            array (
                'id' => 1033,
                'degree_value' => '3',
                'court_value' => '29',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            213 => 
            array (
                'id' => 1034,
                'degree_value' => '3',
                'court_value' => '29',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            214 => 
            array (
                'id' => 1035,
                'degree_value' => '3',
                'court_value' => '29',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            215 => 
            array (
                'id' => 1036,
                'degree_value' => '3',
                'court_value' => '29',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            216 => 
            array (
                'id' => 1037,
                'degree_value' => '3',
                'court_value' => '29',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            217 => 
            array (
                'id' => 1038,
                'degree_value' => '3',
                'court_value' => '29',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            218 => 
            array (
                'id' => 1039,
                'degree_value' => '3',
                'court_value' => '29',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            219 => 
            array (
                'id' => 1040,
                'degree_value' => '3',
                'court_value' => '29',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            220 => 
            array (
                'id' => 1041,
                'degree_value' => '3',
                'court_value' => '29',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            221 => 
            array (
                'id' => 1042,
                'degree_value' => '3',
                'court_value' => '29',
                'case_type_name' => 'بيئة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            222 => 
            array (
                'id' => 1043,
                'degree_value' => '3',
                'court_value' => '29',
                'case_type_name' => 'معافاه',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            223 => 
            array (
                'id' => 1044,
                'degree_value' => '3',
                'court_value' => '29',
                'case_type_name' => 'بيوع',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            224 => 
            array (
                'id' => 1045,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            225 => 
            array (
                'id' => 1046,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            226 => 
            array (
                'id' => 1047,
                'degree_value' => '3',
                'court_value' => '30',
            'case_type_name' => 'ايجارات(مساكن)',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            227 => 
            array (
                'id' => 1048,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            228 => 
            array (
                'id' => 1049,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            229 => 
            array (
                'id' => 1050,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'مستأنف متسعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            230 => 
            array (
                'id' => 1051,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            231 => 
            array (
                'id' => 1052,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            232 => 
            array (
                'id' => 1053,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            233 => 
            array (
                'id' => 1054,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            234 => 
            array (
                'id' => 1055,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'مستأنف تنفيذ',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            235 => 
            array (
                'id' => 1056,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            236 => 
            array (
                'id' => 1057,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'قضايا استثمار',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            237 => 
            array (
                'id' => 1058,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'تجارى مستأنف',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            238 => 
            array (
                'id' => 1059,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'لجنة عمالية',
                'case_type_value' => '17',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            239 => 
            array (
                'id' => 1060,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'محكمة عمالية',
                'case_type_value' => '18',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            240 => 
            array (
                'id' => 1061,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'لجنة اتعاب محاماه',
                'case_type_value' => '19',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            241 => 
            array (
                'id' => 1062,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'معافاه',
                'case_type_value' => '20',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            242 => 
            array (
                'id' => 1063,
                'degree_value' => '3',
                'court_value' => '30',
                'case_type_name' => 'تجارى جزئى',
                'case_type_value' => '21',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            243 => 
            array (
                'id' => 1064,
                'degree_value' => '3',
                'court_value' => '31',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            244 => 
            array (
                'id' => 1065,
                'degree_value' => '3',
                'court_value' => '31',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            245 => 
            array (
                'id' => 1066,
                'degree_value' => '3',
                'court_value' => '31',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            246 => 
            array (
                'id' => 1067,
                'degree_value' => '3',
                'court_value' => '31',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            247 => 
            array (
                'id' => 1068,
                'degree_value' => '3',
                'court_value' => '31',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            248 => 
            array (
                'id' => 1069,
                'degree_value' => '3',
                'court_value' => '31',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            249 => 
            array (
                'id' => 1070,
                'degree_value' => '3',
                'court_value' => '31',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            250 => 
            array (
                'id' => 1071,
                'degree_value' => '3',
                'court_value' => '31',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            251 => 
            array (
                'id' => 1072,
                'degree_value' => '3',
                'court_value' => '31',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            252 => 
            array (
                'id' => 1073,
                'degree_value' => '3',
                'court_value' => '31',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            253 => 
            array (
                'id' => 1074,
                'degree_value' => '3',
                'court_value' => '31',
                'case_type_name' => 'بيئة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            254 => 
            array (
                'id' => 1075,
                'degree_value' => '3',
                'court_value' => '31',
                'case_type_name' => 'معافاه',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            255 => 
            array (
                'id' => 1076,
                'degree_value' => '3',
                'court_value' => '31',
                'case_type_name' => 'بيوع',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            256 => 
            array (
                'id' => 1077,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            257 => 
            array (
                'id' => 1078,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            258 => 
            array (
                'id' => 1079,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            259 => 
            array (
                'id' => 1080,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            260 => 
            array (
                'id' => 1081,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            261 => 
            array (
                'id' => 1082,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'مستأنف مستعجل وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            262 => 
            array (
                'id' => 1083,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            263 => 
            array (
                'id' => 1084,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            264 => 
            array (
                'id' => 1085,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            265 => 
            array (
                'id' => 1086,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            266 => 
            array (
                'id' => 1087,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'بيئة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            267 => 
            array (
                'id' => 1088,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'معافاه',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            268 => 
            array (
                'id' => 1089,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'بيوع',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            269 => 
            array (
                'id' => 1090,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'تقدير أتعاب محاماة',
                'case_type_value' => '19',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            270 => 
            array (
                'id' => 1091,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'تامينات',
                'case_type_value' => '29',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            271 => 
            array (
                'id' => 1092,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'مستانف عمال',
                'case_type_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            272 => 
            array (
                'id' => 1093,
                'degree_value' => '3',
                'court_value' => '33',
                'case_type_name' => 'معارضات فى اوامر الرسوم',
                'case_type_value' => '31',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            273 => 
            array (
                'id' => 1094,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            274 => 
            array (
                'id' => 1095,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            275 => 
            array (
                'id' => 1096,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            276 => 
            array (
                'id' => 1097,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            277 => 
            array (
                'id' => 1098,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            278 => 
            array (
                'id' => 1099,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            279 => 
            array (
                'id' => 1100,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            280 => 
            array (
                'id' => 1101,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            281 => 
            array (
                'id' => 1102,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            282 => 
            array (
                'id' => 1103,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            283 => 
            array (
                'id' => 1104,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'استثمار',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            284 => 
            array (
                'id' => 1105,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'صحه توقيع كلى',
                'case_type_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            285 => 
            array (
                'id' => 1106,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'افلاس',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            286 => 
            array (
                'id' => 1107,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'لجنة عمالية',
                'case_type_value' => '17',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            287 => 
            array (
                'id' => 1108,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            288 => 
            array (
                'id' => 1109,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'معفاه كلى',
                'case_type_value' => '28',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            289 => 
            array (
                'id' => 1110,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'لجنة خماسية',
                'case_type_value' => '29',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            290 => 
            array (
                'id' => 1111,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'طعون مساكن',
                'case_type_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            291 => 
            array (
                'id' => 1112,
                'degree_value' => '3',
                'court_value' => '34',
                'case_type_name' => 'طلب تعيين قيم',
                'case_type_value' => '50',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            292 => 
            array (
                'id' => 1113,
                'degree_value' => '3',
                'court_value' => '36',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            293 => 
            array (
                'id' => 1114,
                'degree_value' => '3',
                'court_value' => '36',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            294 => 
            array (
                'id' => 1115,
                'degree_value' => '3',
                'court_value' => '36',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            295 => 
            array (
                'id' => 1116,
                'degree_value' => '3',
                'court_value' => '36',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            296 => 
            array (
                'id' => 1117,
                'degree_value' => '3',
                'court_value' => '36',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            297 => 
            array (
                'id' => 1118,
                'degree_value' => '3',
                'court_value' => '36',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            298 => 
            array (
                'id' => 1119,
                'degree_value' => '3',
                'court_value' => '36',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            299 => 
            array (
                'id' => 1120,
                'degree_value' => '3',
                'court_value' => '36',
                'case_type_name' => 'تجارى كلى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            300 => 
            array (
                'id' => 1121,
                'degree_value' => '3',
                'court_value' => '36',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            301 => 
            array (
                'id' => 1122,
                'degree_value' => '3',
                'court_value' => '38',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            302 => 
            array (
                'id' => 1123,
                'degree_value' => '3',
                'court_value' => '38',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            303 => 
            array (
                'id' => 1124,
                'degree_value' => '3',
                'court_value' => '38',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            304 => 
            array (
                'id' => 1125,
                'degree_value' => '3',
                'court_value' => '38',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            305 => 
            array (
                'id' => 1126,
                'degree_value' => '3',
                'court_value' => '38',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            306 => 
            array (
                'id' => 1127,
                'degree_value' => '3',
                'court_value' => '38',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            307 => 
            array (
                'id' => 1128,
                'degree_value' => '3',
                'court_value' => '38',
                'case_type_name' => 'تجارى كلى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            308 => 
            array (
                'id' => 1129,
                'degree_value' => '3',
                'court_value' => '38',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            309 => 
            array (
                'id' => 1130,
                'degree_value' => '4',
                'court_value' => '1',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            310 => 
            array (
                'id' => 1131,
                'degree_value' => '4',
                'court_value' => '1',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            311 => 
            array (
                'id' => 1132,
                'degree_value' => '4',
                'court_value' => '1',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            312 => 
            array (
                'id' => 1133,
                'degree_value' => '4',
                'court_value' => '1',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            313 => 
            array (
                'id' => 1134,
                'degree_value' => '4',
                'court_value' => '3',
                'case_type_name' => 'جدول مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            314 => 
            array (
                'id' => 1135,
                'degree_value' => '4',
                'court_value' => '3',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            315 => 
            array (
                'id' => 1136,
                'degree_value' => '4',
                'court_value' => '3',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            316 => 
            array (
                'id' => 1137,
                'degree_value' => '4',
                'court_value' => '3',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            317 => 
            array (
                'id' => 1138,
                'degree_value' => '4',
                'court_value' => '4',
                'case_type_name' => 'جدول مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            318 => 
            array (
                'id' => 1139,
                'degree_value' => '4',
                'court_value' => '4',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            319 => 
            array (
                'id' => 1140,
                'degree_value' => '4',
                'court_value' => '4',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            320 => 
            array (
                'id' => 1141,
                'degree_value' => '4',
                'court_value' => '4',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            321 => 
            array (
                'id' => 1142,
                'degree_value' => '4',
                'court_value' => '5',
                'case_type_name' => 'جدول مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            322 => 
            array (
                'id' => 1143,
                'degree_value' => '4',
                'court_value' => '5',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            323 => 
            array (
                'id' => 1144,
                'degree_value' => '4',
                'court_value' => '5',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            324 => 
            array (
                'id' => 1145,
                'degree_value' => '4',
                'court_value' => '5',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            325 => 
            array (
                'id' => 1146,
                'degree_value' => '4',
                'court_value' => '5',
                'case_type_name' => 'بيوع',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            326 => 
            array (
                'id' => 1147,
                'degree_value' => '4',
                'court_value' => '6',
                'case_type_name' => 'جدول مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            327 => 
            array (
                'id' => 1148,
                'degree_value' => '4',
                'court_value' => '6',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            328 => 
            array (
                'id' => 1149,
                'degree_value' => '4',
                'court_value' => '6',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            329 => 
            array (
                'id' => 1150,
                'degree_value' => '4',
                'court_value' => '6',
                'case_type_name' => 'بيوع',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            330 => 
            array (
                'id' => 1151,
                'degree_value' => '4',
                'court_value' => '6',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            331 => 
            array (
                'id' => 1152,
                'degree_value' => '4',
                'court_value' => '7',
                'case_type_name' => 'جدول مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            332 => 
            array (
                'id' => 1153,
                'degree_value' => '4',
                'court_value' => '7',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            333 => 
            array (
                'id' => 1154,
                'degree_value' => '4',
                'court_value' => '8',
                'case_type_name' => 'جدول مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            334 => 
            array (
                'id' => 1155,
                'degree_value' => '4',
                'court_value' => '8',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            335 => 
            array (
                'id' => 1156,
                'degree_value' => '4',
                'court_value' => '9',
                'case_type_name' => 'جدول مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            336 => 
            array (
                'id' => 1157,
                'degree_value' => '4',
                'court_value' => '9',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            337 => 
            array (
                'id' => 1158,
                'degree_value' => '4',
                'court_value' => '9',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            338 => 
            array (
                'id' => 1159,
                'degree_value' => '4',
                'court_value' => '9',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            339 => 
            array (
                'id' => 1160,
                'degree_value' => '4',
                'court_value' => '10',
                'case_type_name' => 'جدول مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            340 => 
            array (
                'id' => 1161,
                'degree_value' => '4',
                'court_value' => '10',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            341 => 
            array (
                'id' => 1162,
                'degree_value' => '4',
                'court_value' => '10',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            342 => 
            array (
                'id' => 1163,
                'degree_value' => '4',
                'court_value' => '10',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            343 => 
            array (
                'id' => 1164,
                'degree_value' => '4',
                'court_value' => '11',
                'case_type_name' => 'جدول مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            344 => 
            array (
                'id' => 1165,
                'degree_value' => '4',
                'court_value' => '11',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            345 => 
            array (
                'id' => 1166,
                'degree_value' => '4',
                'court_value' => '11',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            346 => 
            array (
                'id' => 1167,
                'degree_value' => '4',
                'court_value' => '12',
                'case_type_name' => 'جدول مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            347 => 
            array (
                'id' => 1168,
                'degree_value' => '4',
                'court_value' => '12',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            348 => 
            array (
                'id' => 1169,
                'degree_value' => '4',
                'court_value' => '13',
                'case_type_name' => 'جدول مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            349 => 
            array (
                'id' => 1170,
                'degree_value' => '4',
                'court_value' => '13',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            350 => 
            array (
                'id' => 1171,
                'degree_value' => '4',
                'court_value' => '13',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            351 => 
            array (
                'id' => 1172,
                'degree_value' => '4',
                'court_value' => '15',
                'case_type_name' => 'جدول مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            352 => 
            array (
                'id' => 1173,
                'degree_value' => '4',
                'court_value' => '15',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            353 => 
            array (
                'id' => 1174,
                'degree_value' => '4',
                'court_value' => '15',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            354 => 
            array (
                'id' => 1175,
                'degree_value' => '4',
                'court_value' => '15',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            355 => 
            array (
                'id' => 1176,
                'degree_value' => '4',
                'court_value' => '21',
                'case_type_name' => 'جدول مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            356 => 
            array (
                'id' => 1177,
                'degree_value' => '4',
                'court_value' => '21',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            357 => 
            array (
                'id' => 1178,
                'degree_value' => '4',
                'court_value' => '21',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            358 => 
            array (
                'id' => 1179,
                'degree_value' => '4',
                'court_value' => '21',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            359 => 
            array (
                'id' => 1180,
                'degree_value' => '4',
                'court_value' => '21',
                'case_type_name' => 'اشكالات تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            360 => 
            array (
                'id' => 1181,
                'degree_value' => '4',
                'court_value' => '21',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            361 => 
            array (
                'id' => 1182,
                'degree_value' => '4',
                'court_value' => '21',
                'case_type_name' => 'اوامر',
                'case_type_value' => '20',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            362 => 
            array (
                'id' => 1183,
                'degree_value' => '4',
                'court_value' => '28',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            363 => 
            array (
                'id' => 1184,
                'degree_value' => '4',
                'court_value' => '28',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            364 => 
            array (
                'id' => 1185,
                'degree_value' => '4',
                'court_value' => '28',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            365 => 
            array (
                'id' => 1186,
                'degree_value' => '4',
                'court_value' => '28',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            366 => 
            array (
                'id' => 1187,
                'degree_value' => '4',
                'court_value' => '28',
                'case_type_name' => 'تنفيذ واشكال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            367 => 
            array (
                'id' => 1188,
                'degree_value' => '4',
                'court_value' => '28',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            368 => 
            array (
                'id' => 1189,
                'degree_value' => '4',
                'court_value' => '32',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            369 => 
            array (
                'id' => 1190,
                'degree_value' => '4',
                'court_value' => '32',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            370 => 
            array (
                'id' => 1191,
                'degree_value' => '4',
                'court_value' => '32',
                'case_type_name' => 'تظلمات تقدير رسوم',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            371 => 
            array (
                'id' => 1192,
                'degree_value' => '4',
                'court_value' => '33',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            372 => 
            array (
                'id' => 1193,
                'degree_value' => '4',
                'court_value' => '33',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            373 => 
            array (
                'id' => 1194,
                'degree_value' => '4',
                'court_value' => '33',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            374 => 
            array (
                'id' => 1195,
                'degree_value' => '4',
                'court_value' => '33',
                'case_type_name' => 'تظلمات رسوم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            375 => 
            array (
                'id' => 1196,
                'degree_value' => '4',
                'court_value' => '33',
                'case_type_name' => 'امر اداء',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            376 => 
            array (
                'id' => 1197,
                'degree_value' => '4',
                'court_value' => '33',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            377 => 
            array (
                'id' => 1198,
                'degree_value' => '4',
                'court_value' => '34',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            378 => 
            array (
                'id' => 1199,
                'degree_value' => '4',
                'court_value' => '34',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            379 => 
            array (
                'id' => 1200,
                'degree_value' => '4',
                'court_value' => '34',
                'case_type_name' => 'تظلمات رسوم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            380 => 
            array (
                'id' => 1201,
                'degree_value' => '4',
                'court_value' => '34',
                'case_type_name' => 'امر اداء',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            381 => 
            array (
                'id' => 1202,
                'degree_value' => '4',
                'court_value' => '35',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            382 => 
            array (
                'id' => 1203,
                'degree_value' => '4',
                'court_value' => '35',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            383 => 
            array (
                'id' => 1204,
                'degree_value' => '4',
                'court_value' => '35',
                'case_type_name' => 'تظلمات',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            384 => 
            array (
                'id' => 1205,
                'degree_value' => '4',
                'court_value' => '36',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            385 => 
            array (
                'id' => 1206,
                'degree_value' => '4',
                'court_value' => '36',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            386 => 
            array (
                'id' => 1207,
                'degree_value' => '4',
                'court_value' => '36',
                'case_type_name' => 'تظلمات',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            387 => 
            array (
                'id' => 1208,
                'degree_value' => '4',
                'court_value' => '36',
                'case_type_name' => 'امر اداء',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            388 => 
            array (
                'id' => 1209,
                'degree_value' => '4',
                'court_value' => '36',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            389 => 
            array (
                'id' => 1210,
                'degree_value' => '4',
                'court_value' => '37',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            390 => 
            array (
                'id' => 1211,
                'degree_value' => '4',
                'court_value' => '37',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            391 => 
            array (
                'id' => 1212,
                'degree_value' => '4',
                'court_value' => '37',
                'case_type_name' => 'تجارى',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            392 => 
            array (
                'id' => 1213,
                'degree_value' => '4',
                'court_value' => '37',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            393 => 
            array (
                'id' => 1214,
                'degree_value' => '4',
                'court_value' => '37',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            394 => 
            array (
                'id' => 1215,
                'degree_value' => '4',
                'court_value' => '37',
                'case_type_name' => 'تظلمات رسوم',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            395 => 
            array (
                'id' => 1216,
                'degree_value' => '4',
                'court_value' => '38',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            396 => 
            array (
                'id' => 1217,
                'degree_value' => '4',
                'court_value' => '38',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            397 => 
            array (
                'id' => 1218,
                'degree_value' => '4',
                'court_value' => '38',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            398 => 
            array (
                'id' => 1219,
                'degree_value' => '4',
                'court_value' => '38',
                'case_type_name' => 'تظلمات رسوم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            399 => 
            array (
                'id' => 1220,
                'degree_value' => '4',
                'court_value' => '38',
                'case_type_name' => 'امر اداء',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            400 => 
            array (
                'id' => 1221,
                'degree_value' => '4',
                'court_value' => '38',
                'case_type_name' => 'تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            401 => 
            array (
                'id' => 1222,
                'degree_value' => '4',
                'court_value' => '38',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            402 => 
            array (
                'id' => 1223,
                'degree_value' => '4',
                'court_value' => '39',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            403 => 
            array (
                'id' => 1224,
                'degree_value' => '4',
                'court_value' => '39',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            404 => 
            array (
                'id' => 1225,
                'degree_value' => '4',
                'court_value' => '39',
                'case_type_name' => 'تظلمات رسوم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            405 => 
            array (
                'id' => 1226,
                'degree_value' => '4',
                'court_value' => '39',
                'case_type_name' => 'امر اداء',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            406 => 
            array (
                'id' => 1227,
                'degree_value' => '4',
                'court_value' => '39',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            407 => 
            array (
                'id' => 1228,
                'degree_value' => '4',
                'court_value' => '40',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            408 => 
            array (
                'id' => 1229,
                'degree_value' => '4',
                'court_value' => '42',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            409 => 
            array (
                'id' => 1230,
                'degree_value' => '4',
                'court_value' => '42',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            410 => 
            array (
                'id' => 1231,
                'degree_value' => '4',
                'court_value' => '42',
                'case_type_name' => 'تظلمات رسوم',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            411 => 
            array (
                'id' => 1232,
                'degree_value' => '4',
                'court_value' => '42',
                'case_type_name' => 'امر اداء',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            412 => 
            array (
                'id' => 1233,
                'degree_value' => '4',
                'court_value' => '43',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            413 => 
            array (
                'id' => 1234,
                'degree_value' => '4',
                'court_value' => '43',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            414 => 
            array (
                'id' => 1235,
                'degree_value' => '4',
                'court_value' => '44',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            415 => 
            array (
                'id' => 1236,
                'degree_value' => '4',
                'court_value' => '44',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            416 => 
            array (
                'id' => 1237,
                'degree_value' => '4',
                'court_value' => '44',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            417 => 
            array (
                'id' => 1238,
                'degree_value' => '4',
                'court_value' => '44',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            418 => 
            array (
                'id' => 1239,
                'degree_value' => '4',
                'court_value' => '44',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            419 => 
            array (
                'id' => 1240,
                'degree_value' => '4',
                'court_value' => '44',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            420 => 
            array (
                'id' => 1241,
                'degree_value' => '4',
                'court_value' => '44',
                'case_type_name' => 'تظلمات',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            421 => 
            array (
                'id' => 1242,
                'degree_value' => '4',
                'court_value' => '45',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            422 => 
            array (
                'id' => 1243,
                'degree_value' => '4',
                'court_value' => '45',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            423 => 
            array (
                'id' => 1244,
                'degree_value' => '4',
                'court_value' => '45',
                'case_type_name' => 'مدنى جكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            424 => 
            array (
                'id' => 1245,
                'degree_value' => '4',
                'court_value' => '45',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            425 => 
            array (
                'id' => 1246,
                'degree_value' => '4',
                'court_value' => '45',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            426 => 
            array (
                'id' => 1247,
                'degree_value' => '4',
                'court_value' => '46',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            427 => 
            array (
                'id' => 1248,
                'degree_value' => '4',
                'court_value' => '46',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            428 => 
            array (
                'id' => 1249,
                'degree_value' => '4',
                'court_value' => '46',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            429 => 
            array (
                'id' => 1250,
                'degree_value' => '4',
                'court_value' => '46',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            430 => 
            array (
                'id' => 1251,
                'degree_value' => '4',
                'court_value' => '46',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            431 => 
            array (
                'id' => 1252,
                'degree_value' => '4',
                'court_value' => '46',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            432 => 
            array (
                'id' => 1253,
                'degree_value' => '4',
                'court_value' => '46',
                'case_type_name' => 'تظلمات رسوم',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            433 => 
            array (
                'id' => 1254,
                'degree_value' => '4',
                'court_value' => '47',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            434 => 
            array (
                'id' => 1255,
                'degree_value' => '4',
                'court_value' => '47',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            435 => 
            array (
                'id' => 1256,
                'degree_value' => '4',
                'court_value' => '47',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            436 => 
            array (
                'id' => 1257,
                'degree_value' => '4',
                'court_value' => '47',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            437 => 
            array (
                'id' => 1258,
                'degree_value' => '4',
                'court_value' => '47',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            438 => 
            array (
                'id' => 1259,
                'degree_value' => '4',
                'court_value' => '47',
                'case_type_name' => 'تظلمات',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            439 => 
            array (
                'id' => 1260,
                'degree_value' => '4',
                'court_value' => '48',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            440 => 
            array (
                'id' => 1261,
                'degree_value' => '4',
                'court_value' => '48',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            441 => 
            array (
                'id' => 1262,
                'degree_value' => '4',
                'court_value' => '49',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            442 => 
            array (
                'id' => 1263,
                'degree_value' => '4',
                'court_value' => '49',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            443 => 
            array (
                'id' => 1264,
                'degree_value' => '4',
                'court_value' => '50',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            444 => 
            array (
                'id' => 1265,
                'degree_value' => '4',
                'court_value' => '50',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            445 => 
            array (
                'id' => 1266,
                'degree_value' => '4',
                'court_value' => '51',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            446 => 
            array (
                'id' => 1267,
                'degree_value' => '4',
                'court_value' => '51',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            447 => 
            array (
                'id' => 1268,
                'degree_value' => '4',
                'court_value' => '52',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            448 => 
            array (
                'id' => 1269,
                'degree_value' => '4',
                'court_value' => '52',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            449 => 
            array (
                'id' => 1270,
                'degree_value' => '4',
                'court_value' => '52',
                'case_type_name' => 'بيوع',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            450 => 
            array (
                'id' => 1271,
                'degree_value' => '4',
                'court_value' => '53',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            451 => 
            array (
                'id' => 1272,
                'degree_value' => '4',
                'court_value' => '53',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            452 => 
            array (
                'id' => 1273,
                'degree_value' => '4',
                'court_value' => '54',
                'case_type_name' => 'تنقيذ موضوعى',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            453 => 
            array (
                'id' => 1274,
                'degree_value' => '4',
                'court_value' => '54',
                'case_type_name' => 'تنفيذ وقتى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            454 => 
            array (
                'id' => 1275,
                'degree_value' => '4',
                'court_value' => '54',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            455 => 
            array (
                'id' => 1276,
                'degree_value' => '4',
                'court_value' => '54',
                'case_type_name' => 'تظلمات قرارت تحفظ',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            456 => 
            array (
                'id' => 1277,
                'degree_value' => '4',
                'court_value' => '54',
                'case_type_name' => 'تظلمات شهر عقلرى',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            457 => 
            array (
                'id' => 1278,
                'degree_value' => '4',
                'court_value' => '54',
                'case_type_name' => 'نقل ملكية0',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            458 => 
            array (
                'id' => 1279,
                'degree_value' => '4',
                'court_value' => '54',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '28',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            459 => 
            array (
                'id' => 1280,
                'degree_value' => '4',
                'court_value' => '54',
                'case_type_name' => 'مستأنف موضوعى',
                'case_type_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            460 => 
            array (
                'id' => 1281,
                'degree_value' => '4',
                'court_value' => '54',
                'case_type_name' => 'مستأنف وقتى',
                'case_type_value' => '33',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            461 => 
            array (
                'id' => 1282,
                'degree_value' => '4',
                'court_value' => '54',
                'case_type_name' => 'استئناف قرارات تحفظ',
                'case_type_value' => '34',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            462 => 
            array (
                'id' => 1283,
                'degree_value' => '4',
                'court_value' => '54',
                'case_type_name' => 'استئناف نقل ملكية',
                'case_type_value' => '35',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            463 => 
            array (
                'id' => 1284,
                'degree_value' => '4',
                'court_value' => '55',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            464 => 
            array (
                'id' => 1285,
                'degree_value' => '4',
                'court_value' => '55',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            465 => 
            array (
                'id' => 1286,
                'degree_value' => '4',
                'court_value' => '56',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            466 => 
            array (
                'id' => 1287,
                'degree_value' => '4',
                'court_value' => '56',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            467 => 
            array (
                'id' => 1288,
                'degree_value' => '4',
                'court_value' => '56',
                'case_type_name' => 'اشكال تنفيذ وقتى',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            468 => 
            array (
                'id' => 1289,
                'degree_value' => '4',
                'court_value' => '56',
                'case_type_name' => 'اشكال تنفيذ موضوعى',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            469 => 
            array (
                'id' => 1290,
                'degree_value' => '4',
                'court_value' => '56',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            470 => 
            array (
                'id' => 1291,
                'degree_value' => '4',
                'court_value' => '57',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            471 => 
            array (
                'id' => 1292,
                'degree_value' => '4',
                'court_value' => '57',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            472 => 
            array (
                'id' => 1293,
                'degree_value' => '4',
                'court_value' => '58',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            473 => 
            array (
                'id' => 1294,
                'degree_value' => '4',
                'court_value' => '58',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            474 => 
            array (
                'id' => 1295,
                'degree_value' => '4',
                'court_value' => '58',
                'case_type_name' => 'اشكال تنفيذ وقتى',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            475 => 
            array (
                'id' => 1296,
                'degree_value' => '4',
                'court_value' => '58',
                'case_type_name' => 'اشكال تنفيذ موضوعى',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            476 => 
            array (
                'id' => 1297,
                'degree_value' => '4',
                'court_value' => '58',
                'case_type_name' => 'بيوع',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            477 => 
            array (
                'id' => 1298,
                'degree_value' => '4',
                'court_value' => '59',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            478 => 
            array (
                'id' => 1299,
                'degree_value' => '4',
                'court_value' => '59',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            479 => 
            array (
                'id' => 1300,
                'degree_value' => '4',
                'court_value' => '60',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            480 => 
            array (
                'id' => 1301,
                'degree_value' => '4',
                'court_value' => '60',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            481 => 
            array (
                'id' => 1302,
                'degree_value' => '4',
                'court_value' => '60',
                'case_type_name' => 'بيوع',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            482 => 
            array (
                'id' => 1303,
                'degree_value' => '4',
                'court_value' => '64',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            483 => 
            array (
                'id' => 1304,
                'degree_value' => '4',
                'court_value' => '64',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            484 => 
            array (
                'id' => 1305,
                'degree_value' => '4',
                'court_value' => '64',
                'case_type_name' => 'حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            485 => 
            array (
                'id' => 1306,
                'degree_value' => '4',
                'court_value' => '64',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            486 => 
            array (
                'id' => 1307,
                'degree_value' => '4',
                'court_value' => '64',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            487 => 
            array (
                'id' => 1308,
                'degree_value' => '4',
                'court_value' => '64',
                'case_type_name' => 'بيوع',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            488 => 
            array (
                'id' => 1309,
                'degree_value' => '4',
                'court_value' => '65',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            489 => 
            array (
                'id' => 1310,
                'degree_value' => '4',
                'court_value' => '65',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            490 => 
            array (
                'id' => 1311,
                'degree_value' => '4',
                'court_value' => '65',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            491 => 
            array (
                'id' => 1312,
                'degree_value' => '4',
                'court_value' => '65',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            492 => 
            array (
                'id' => 1313,
                'degree_value' => '4',
                'court_value' => '65',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            493 => 
            array (
                'id' => 1314,
                'degree_value' => '4',
                'court_value' => '65',
                'case_type_name' => 'بيوع',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            494 => 
            array (
                'id' => 1315,
                'degree_value' => '4',
                'court_value' => '66',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            495 => 
            array (
                'id' => 1316,
                'degree_value' => '4',
                'court_value' => '66',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            496 => 
            array (
                'id' => 1317,
                'degree_value' => '4',
                'court_value' => '66',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            497 => 
            array (
                'id' => 1318,
                'degree_value' => '4',
                'court_value' => '66',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            498 => 
            array (
                'id' => 1319,
                'degree_value' => '4',
                'court_value' => '66',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            499 => 
            array (
                'id' => 1320,
                'degree_value' => '4',
                'court_value' => '66',
                'case_type_name' => 'بيوع',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));
        \DB::table('search_case_types')->insert(array (
            0 => 
            array (
                'id' => 1321,
                'degree_value' => '4',
                'court_value' => '67',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 1322,
                'degree_value' => '4',
                'court_value' => '67',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 1323,
                'degree_value' => '4',
                'court_value' => '67',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 1324,
                'degree_value' => '4',
                'court_value' => '67',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 1325,
                'degree_value' => '4',
                'court_value' => '67',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            5 => 
            array (
                'id' => 1326,
                'degree_value' => '4',
                'court_value' => '68',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            6 => 
            array (
                'id' => 1327,
                'degree_value' => '4',
                'court_value' => '68',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            7 => 
            array (
                'id' => 1328,
                'degree_value' => '4',
                'court_value' => '68',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            8 => 
            array (
                'id' => 1329,
                'degree_value' => '4',
                'court_value' => '68',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            9 => 
            array (
                'id' => 1330,
                'degree_value' => '4',
                'court_value' => '68',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            10 => 
            array (
                'id' => 1331,
                'degree_value' => '4',
                'court_value' => '68',
                'case_type_name' => 'بيوع',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            11 => 
            array (
                'id' => 1332,
                'degree_value' => '4',
                'court_value' => '69',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            12 => 
            array (
                'id' => 1333,
                'degree_value' => '4',
                'court_value' => '69',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            13 => 
            array (
                'id' => 1334,
                'degree_value' => '4',
                'court_value' => '69',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            14 => 
            array (
                'id' => 1335,
                'degree_value' => '4',
                'court_value' => '69',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            15 => 
            array (
                'id' => 1336,
                'degree_value' => '4',
                'court_value' => '69',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            16 => 
            array (
                'id' => 1337,
                'degree_value' => '4',
                'court_value' => '71',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            17 => 
            array (
                'id' => 1338,
                'degree_value' => '4',
                'court_value' => '71',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            18 => 
            array (
                'id' => 1339,
                'degree_value' => '4',
                'court_value' => '71',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            19 => 
            array (
                'id' => 1340,
                'degree_value' => '4',
                'court_value' => '71',
                'case_type_name' => 'تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            20 => 
            array (
                'id' => 1341,
                'degree_value' => '4',
                'court_value' => '71',
                'case_type_name' => 'اشكال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            21 => 
            array (
                'id' => 1342,
                'degree_value' => '4',
                'court_value' => '74',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            22 => 
            array (
                'id' => 1343,
                'degree_value' => '4',
                'court_value' => '74',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            23 => 
            array (
                'id' => 1344,
                'degree_value' => '4',
                'court_value' => '74',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            24 => 
            array (
                'id' => 1345,
                'degree_value' => '4',
                'court_value' => '74',
                'case_type_name' => 'تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            25 => 
            array (
                'id' => 1346,
                'degree_value' => '4',
                'court_value' => '75',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            26 => 
            array (
                'id' => 1347,
                'degree_value' => '4',
                'court_value' => '75',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            27 => 
            array (
                'id' => 1348,
                'degree_value' => '4',
                'court_value' => '75',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            28 => 
            array (
                'id' => 1349,
                'degree_value' => '4',
                'court_value' => '75',
                'case_type_name' => 'اشكال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            29 => 
            array (
                'id' => 1350,
                'degree_value' => '4',
                'court_value' => '75',
                'case_type_name' => 'وتنفيذ',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            30 => 
            array (
                'id' => 1351,
                'degree_value' => '4',
                'court_value' => '76',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            31 => 
            array (
                'id' => 1352,
                'degree_value' => '4',
                'court_value' => '76',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            32 => 
            array (
                'id' => 1353,
                'degree_value' => '4',
                'court_value' => '76',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            33 => 
            array (
                'id' => 1354,
                'degree_value' => '4',
                'court_value' => '76',
                'case_type_name' => 'اشكال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            34 => 
            array (
                'id' => 1355,
                'degree_value' => '4',
                'court_value' => '76',
                'case_type_name' => 'بيوع',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            35 => 
            array (
                'id' => 1356,
                'degree_value' => '4',
                'court_value' => '76',
                'case_type_name' => 'تنفيذ',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            36 => 
            array (
                'id' => 1357,
                'degree_value' => '4',
                'court_value' => '78',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            37 => 
            array (
                'id' => 1358,
                'degree_value' => '4',
                'court_value' => '78',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            38 => 
            array (
                'id' => 1359,
                'degree_value' => '4',
                'court_value' => '78',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            39 => 
            array (
                'id' => 1360,
                'degree_value' => '4',
                'court_value' => '78',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            40 => 
            array (
                'id' => 1361,
                'degree_value' => '4',
                'court_value' => '78',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            41 => 
            array (
                'id' => 1362,
                'degree_value' => '4',
                'court_value' => '78',
                'case_type_name' => 'اشكال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            42 => 
            array (
                'id' => 1363,
                'degree_value' => '4',
                'court_value' => '78',
                'case_type_name' => 'تنفيذ',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            43 => 
            array (
                'id' => 1364,
                'degree_value' => '4',
                'court_value' => '78',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            44 => 
            array (
                'id' => 1365,
                'degree_value' => '4',
                'court_value' => '79',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            45 => 
            array (
                'id' => 1366,
                'degree_value' => '4',
                'court_value' => '79',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            46 => 
            array (
                'id' => 1367,
                'degree_value' => '4',
                'court_value' => '79',
                'case_type_name' => 'مستأئف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            47 => 
            array (
                'id' => 1368,
                'degree_value' => '4',
                'court_value' => '79',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            48 => 
            array (
                'id' => 1369,
                'degree_value' => '4',
                'court_value' => '79',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            49 => 
            array (
                'id' => 1370,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            50 => 
            array (
                'id' => 1371,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            51 => 
            array (
                'id' => 1372,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            52 => 
            array (
                'id' => 1373,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'اشكالات وتفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            53 => 
            array (
                'id' => 1374,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'مدنى جزئى بندر اول',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            54 => 
            array (
                'id' => 1375,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'مدنى جزئى بندر ثانى',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            55 => 
            array (
                'id' => 1376,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'مدنى جزئى بندر ثالث',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            56 => 
            array (
                'id' => 1377,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'بيوع',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            57 => 
            array (
                'id' => 1378,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'بيوع بندر ثانى',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            58 => 
            array (
                'id' => 1379,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'بيوع بندر ثالث',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            59 => 
            array (
                'id' => 1380,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'تسليم بندر اول',
                'case_type_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            60 => 
            array (
                'id' => 1381,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'تسليم بندر ثانى',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            61 => 
            array (
                'id' => 1382,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'تسليم بندر ثالث',
                'case_type_value' => '17',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            62 => 
            array (
                'id' => 1383,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'صحة توقيع بندر اول',
                'case_type_value' => '18',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            63 => 
            array (
                'id' => 1384,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'صحة توقيع بندر ثانى',
                'case_type_value' => '19',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            64 => 
            array (
                'id' => 1385,
                'degree_value' => '4',
                'court_value' => '81',
                'case_type_name' => 'صحة توقيع بندر ثالث',
                'case_type_value' => '20',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            65 => 
            array (
                'id' => 1386,
                'degree_value' => '4',
                'court_value' => '82',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            66 => 
            array (
                'id' => 1387,
                'degree_value' => '4',
                'court_value' => '82',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            67 => 
            array (
                'id' => 1388,
                'degree_value' => '4',
                'court_value' => '82',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            68 => 
            array (
                'id' => 1389,
                'degree_value' => '4',
                'court_value' => '82',
                'case_type_name' => 'بيوع',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            69 => 
            array (
                'id' => 1390,
                'degree_value' => '4',
                'court_value' => '82',
                'case_type_name' => 'تسليم',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            70 => 
            array (
                'id' => 1391,
                'degree_value' => '4',
                'court_value' => '83',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            71 => 
            array (
                'id' => 1392,
                'degree_value' => '4',
                'court_value' => '83',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            72 => 
            array (
                'id' => 1393,
                'degree_value' => '4',
                'court_value' => '83',
                'case_type_name' => 'حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            73 => 
            array (
                'id' => 1394,
                'degree_value' => '4',
                'court_value' => '83',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            74 => 
            array (
                'id' => 1395,
                'degree_value' => '4',
                'court_value' => '83',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            75 => 
            array (
                'id' => 1396,
                'degree_value' => '4',
                'court_value' => '83',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            76 => 
            array (
                'id' => 1397,
                'degree_value' => '4',
                'court_value' => '83',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            77 => 
            array (
                'id' => 1398,
                'degree_value' => '4',
                'court_value' => '83',
                'case_type_name' => 'تسليم',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            78 => 
            array (
                'id' => 1399,
                'degree_value' => '4',
                'court_value' => '84',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            79 => 
            array (
                'id' => 1400,
                'degree_value' => '4',
                'court_value' => '84',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            80 => 
            array (
                'id' => 1401,
                'degree_value' => '4',
                'court_value' => '84',
                'case_type_name' => 'حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            81 => 
            array (
                'id' => 1402,
                'degree_value' => '4',
                'court_value' => '84',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            82 => 
            array (
                'id' => 1403,
                'degree_value' => '4',
                'court_value' => '84',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            83 => 
            array (
                'id' => 1404,
                'degree_value' => '4',
                'court_value' => '84',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            84 => 
            array (
                'id' => 1405,
                'degree_value' => '4',
                'court_value' => '84',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            85 => 
            array (
                'id' => 1406,
                'degree_value' => '4',
                'court_value' => '84',
                'case_type_name' => 'تسليم',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            86 => 
            array (
                'id' => 1407,
                'degree_value' => '4',
                'court_value' => '85',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            87 => 
            array (
                'id' => 1408,
                'degree_value' => '4',
                'court_value' => '85',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            88 => 
            array (
                'id' => 1409,
                'degree_value' => '4',
                'court_value' => '85',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            89 => 
            array (
                'id' => 1410,
                'degree_value' => '4',
                'court_value' => '85',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            90 => 
            array (
                'id' => 1411,
                'degree_value' => '4',
                'court_value' => '85',
                'case_type_name' => 'تسليم',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            91 => 
            array (
                'id' => 1412,
                'degree_value' => '4',
                'court_value' => '86',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            92 => 
            array (
                'id' => 1413,
                'degree_value' => '4',
                'court_value' => '86',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            93 => 
            array (
                'id' => 1414,
                'degree_value' => '4',
                'court_value' => '86',
                'case_type_name' => 'حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            94 => 
            array (
                'id' => 1415,
                'degree_value' => '4',
                'court_value' => '86',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            95 => 
            array (
                'id' => 1416,
                'degree_value' => '4',
                'court_value' => '86',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            96 => 
            array (
                'id' => 1417,
                'degree_value' => '4',
                'court_value' => '86',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            97 => 
            array (
                'id' => 1418,
                'degree_value' => '4',
                'court_value' => '86',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            98 => 
            array (
                'id' => 1419,
                'degree_value' => '4',
                'court_value' => '86',
                'case_type_name' => 'تسليم',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            99 => 
            array (
                'id' => 1420,
                'degree_value' => '4',
                'court_value' => '93',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            100 => 
            array (
                'id' => 1421,
                'degree_value' => '4',
                'court_value' => '93',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            101 => 
            array (
                'id' => 1422,
                'degree_value' => '4',
                'court_value' => '93',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            102 => 
            array (
                'id' => 1423,
                'degree_value' => '4',
                'court_value' => '93',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            103 => 
            array (
                'id' => 1424,
                'degree_value' => '4',
                'court_value' => '94',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            104 => 
            array (
                'id' => 1425,
                'degree_value' => '4',
                'court_value' => '94',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            105 => 
            array (
                'id' => 1426,
                'degree_value' => '4',
                'court_value' => '96',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            106 => 
            array (
                'id' => 1427,
                'degree_value' => '4',
                'court_value' => '96',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            107 => 
            array (
                'id' => 1428,
                'degree_value' => '4',
                'court_value' => '96',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            108 => 
            array (
                'id' => 1429,
                'degree_value' => '4',
                'court_value' => '96',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            109 => 
            array (
                'id' => 1430,
                'degree_value' => '4',
                'court_value' => '96',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            110 => 
            array (
                'id' => 1431,
                'degree_value' => '4',
                'court_value' => '96',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            111 => 
            array (
                'id' => 1432,
                'degree_value' => '4',
                'court_value' => '106',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            112 => 
            array (
                'id' => 1433,
                'degree_value' => '4',
                'court_value' => '106',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            113 => 
            array (
                'id' => 1434,
                'degree_value' => '4',
                'court_value' => '106',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            114 => 
            array (
                'id' => 1435,
                'degree_value' => '4',
                'court_value' => '106',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            115 => 
            array (
                'id' => 1436,
                'degree_value' => '4',
                'court_value' => '109',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            116 => 
            array (
                'id' => 1437,
                'degree_value' => '4',
                'court_value' => '109',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            117 => 
            array (
                'id' => 1438,
                'degree_value' => '4',
                'court_value' => '109',
                'case_type_name' => 'تجارى',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            118 => 
            array (
                'id' => 1439,
                'degree_value' => '4',
                'court_value' => '109',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            119 => 
            array (
                'id' => 1440,
                'degree_value' => '4',
                'court_value' => '109',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            120 => 
            array (
                'id' => 1441,
                'degree_value' => '4',
                'court_value' => '109',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            121 => 
            array (
                'id' => 1442,
                'degree_value' => '4',
                'court_value' => '109',
                'case_type_name' => 'اتعاب المحاماه',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            122 => 
            array (
                'id' => 1443,
                'degree_value' => '4',
                'court_value' => '109',
                'case_type_name' => 'بيوع',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            123 => 
            array (
                'id' => 1444,
                'degree_value' => '4',
                'court_value' => '109',
                'case_type_name' => 'الاعفاء من الرسوم',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            124 => 
            array (
                'id' => 1445,
                'degree_value' => '4',
                'court_value' => '112',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            125 => 
            array (
                'id' => 1446,
                'degree_value' => '4',
                'court_value' => '112',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            126 => 
            array (
                'id' => 1447,
                'degree_value' => '4',
                'court_value' => '112',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            127 => 
            array (
                'id' => 1448,
                'degree_value' => '4',
                'court_value' => '112',
                'case_type_name' => 'تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            128 => 
            array (
                'id' => 1449,
                'degree_value' => '4',
                'court_value' => '112',
                'case_type_name' => 'اشكال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            129 => 
            array (
                'id' => 1450,
                'degree_value' => '4',
                'court_value' => '113',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            130 => 
            array (
                'id' => 1451,
                'degree_value' => '4',
                'court_value' => '113',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            131 => 
            array (
                'id' => 1452,
                'degree_value' => '4',
                'court_value' => '113',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            132 => 
            array (
                'id' => 1453,
                'degree_value' => '4',
                'court_value' => '113',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            133 => 
            array (
                'id' => 1454,
                'degree_value' => '4',
                'court_value' => '113',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            134 => 
            array (
                'id' => 1455,
                'degree_value' => '4',
                'court_value' => '113',
                'case_type_name' => 'مستأنف منازعات',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            135 => 
            array (
                'id' => 1456,
                'degree_value' => '4',
                'court_value' => '113',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            136 => 
            array (
                'id' => 1457,
                'degree_value' => '4',
                'court_value' => '113',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            137 => 
            array (
                'id' => 1458,
                'degree_value' => '4',
                'court_value' => '114',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            138 => 
            array (
                'id' => 1459,
                'degree_value' => '4',
                'court_value' => '114',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            139 => 
            array (
                'id' => 1460,
                'degree_value' => '4',
                'court_value' => '114',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            140 => 
            array (
                'id' => 1461,
                'degree_value' => '4',
                'court_value' => '114',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            141 => 
            array (
                'id' => 1462,
                'degree_value' => '4',
                'court_value' => '114',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            142 => 
            array (
                'id' => 1463,
                'degree_value' => '4',
                'court_value' => '114',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            143 => 
            array (
                'id' => 1464,
                'degree_value' => '4',
                'court_value' => '114',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            144 => 
            array (
                'id' => 1465,
                'degree_value' => '4',
                'court_value' => '114',
                'case_type_name' => 'مستأنف منازعات تنفيذ',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            145 => 
            array (
                'id' => 1466,
                'degree_value' => '4',
                'court_value' => '115',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            146 => 
            array (
                'id' => 1467,
                'degree_value' => '4',
                'court_value' => '115',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            147 => 
            array (
                'id' => 1468,
                'degree_value' => '4',
                'court_value' => '115',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            148 => 
            array (
                'id' => 1469,
                'degree_value' => '4',
                'court_value' => '115',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            149 => 
            array (
                'id' => 1470,
                'degree_value' => '4',
                'court_value' => '115',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            150 => 
            array (
                'id' => 1471,
                'degree_value' => '4',
                'court_value' => '115',
                'case_type_name' => 'اشكلات',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            151 => 
            array (
                'id' => 1472,
                'degree_value' => '4',
                'court_value' => '116',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            152 => 
            array (
                'id' => 1473,
                'degree_value' => '4',
                'court_value' => '116',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            153 => 
            array (
                'id' => 1474,
                'degree_value' => '4',
                'court_value' => '116',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            154 => 
            array (
                'id' => 1475,
                'degree_value' => '4',
                'court_value' => '117',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            155 => 
            array (
                'id' => 1476,
                'degree_value' => '4',
                'court_value' => '117',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            156 => 
            array (
                'id' => 1477,
                'degree_value' => '4',
                'court_value' => '117',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            157 => 
            array (
                'id' => 1478,
                'degree_value' => '4',
                'court_value' => '118',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            158 => 
            array (
                'id' => 1479,
                'degree_value' => '4',
                'court_value' => '118',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            159 => 
            array (
                'id' => 1480,
                'degree_value' => '4',
                'court_value' => '118',
                'case_type_name' => 'اشكلات وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            160 => 
            array (
                'id' => 1481,
                'degree_value' => '4',
                'court_value' => '119',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            161 => 
            array (
                'id' => 1482,
                'degree_value' => '4',
                'court_value' => '119',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            162 => 
            array (
                'id' => 1483,
                'degree_value' => '4',
                'court_value' => '119',
                'case_type_name' => 'اشكال',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            163 => 
            array (
                'id' => 1484,
                'degree_value' => '4',
                'court_value' => '120',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            164 => 
            array (
                'id' => 1485,
                'degree_value' => '4',
                'court_value' => '120',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            165 => 
            array (
                'id' => 1486,
                'degree_value' => '4',
                'court_value' => '120',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            166 => 
            array (
                'id' => 1487,
                'degree_value' => '4',
                'court_value' => '120',
                'case_type_name' => 'اشكال',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            167 => 
            array (
                'id' => 1488,
                'degree_value' => '4',
                'court_value' => '122',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            168 => 
            array (
                'id' => 1489,
                'degree_value' => '4',
                'court_value' => '122',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            169 => 
            array (
                'id' => 1490,
                'degree_value' => '4',
                'court_value' => '122',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            170 => 
            array (
                'id' => 1491,
                'degree_value' => '4',
                'court_value' => '122',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            171 => 
            array (
                'id' => 1492,
                'degree_value' => '4',
                'court_value' => '122',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            172 => 
            array (
                'id' => 1493,
                'degree_value' => '4',
                'court_value' => '122',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            173 => 
            array (
                'id' => 1494,
                'degree_value' => '4',
                'court_value' => '122',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            174 => 
            array (
                'id' => 1495,
                'degree_value' => '4',
                'court_value' => '122',
                'case_type_name' => 'تجارى جزئى بحرى',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            175 => 
            array (
                'id' => 1496,
                'degree_value' => '4',
                'court_value' => '122',
                'case_type_name' => 'اشكال وتنفيذ مستعجل',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            176 => 
            array (
                'id' => 1497,
                'degree_value' => '4',
                'court_value' => '128',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            177 => 
            array (
                'id' => 1498,
                'degree_value' => '4',
                'court_value' => '128',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            178 => 
            array (
                'id' => 1499,
                'degree_value' => '4',
                'court_value' => '132',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            179 => 
            array (
                'id' => 1500,
                'degree_value' => '4',
                'court_value' => '132',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            180 => 
            array (
                'id' => 1501,
                'degree_value' => '4',
                'court_value' => '132',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            181 => 
            array (
                'id' => 1502,
                'degree_value' => '4',
                'court_value' => '132',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            182 => 
            array (
                'id' => 1503,
                'degree_value' => '4',
                'court_value' => '132',
                'case_type_name' => 'اشكال تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            183 => 
            array (
                'id' => 1504,
                'degree_value' => '4',
                'court_value' => '135',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            184 => 
            array (
                'id' => 1505,
                'degree_value' => '4',
                'court_value' => '135',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            185 => 
            array (
                'id' => 1506,
                'degree_value' => '4',
                'court_value' => '135',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            186 => 
            array (
                'id' => 1507,
                'degree_value' => '4',
                'court_value' => '135',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            187 => 
            array (
                'id' => 1508,
                'degree_value' => '4',
                'court_value' => '135',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            188 => 
            array (
                'id' => 1509,
                'degree_value' => '4',
                'court_value' => '137',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            189 => 
            array (
                'id' => 1510,
                'degree_value' => '4',
                'court_value' => '138',
                'case_type_name' => 'تجارى جزئى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            190 => 
            array (
                'id' => 1511,
                'degree_value' => '4',
                'court_value' => '139',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            191 => 
            array (
                'id' => 1512,
                'degree_value' => '4',
                'court_value' => '139',
                'case_type_name' => 'تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            192 => 
            array (
                'id' => 1513,
                'degree_value' => '4',
                'court_value' => '139',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            193 => 
            array (
                'id' => 1514,
                'degree_value' => '4',
                'court_value' => '141',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            194 => 
            array (
                'id' => 1515,
                'degree_value' => '4',
                'court_value' => '141',
                'case_type_name' => 'حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            195 => 
            array (
                'id' => 1516,
                'degree_value' => '4',
                'court_value' => '141',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            196 => 
            array (
                'id' => 1517,
                'degree_value' => '4',
                'court_value' => '141',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            197 => 
            array (
                'id' => 1518,
                'degree_value' => '4',
                'court_value' => '141',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            198 => 
            array (
                'id' => 1519,
                'degree_value' => '4',
                'court_value' => '141',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            199 => 
            array (
                'id' => 1520,
                'degree_value' => '4',
                'court_value' => '147',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            200 => 
            array (
                'id' => 1521,
                'degree_value' => '4',
                'court_value' => '147',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            201 => 
            array (
                'id' => 1522,
                'degree_value' => '4',
                'court_value' => '147',
                'case_type_name' => 'مساكن',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            202 => 
            array (
                'id' => 1523,
                'degree_value' => '4',
                'court_value' => '147',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            203 => 
            array (
                'id' => 1524,
                'degree_value' => '4',
                'court_value' => '147',
                'case_type_name' => 'مستأنف اشكالات',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            204 => 
            array (
                'id' => 1525,
                'degree_value' => '4',
                'court_value' => '147',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            205 => 
            array (
                'id' => 1526,
                'degree_value' => '4',
                'court_value' => '147',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            206 => 
            array (
                'id' => 1527,
                'degree_value' => '4',
                'court_value' => '147',
                'case_type_name' => 'اوامر',
                'case_type_value' => '20',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            207 => 
            array (
                'id' => 1528,
                'degree_value' => '4',
                'court_value' => '150',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            208 => 
            array (
                'id' => 1529,
                'degree_value' => '4',
                'court_value' => '150',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            209 => 
            array (
                'id' => 1530,
                'degree_value' => '4',
                'court_value' => '150',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            210 => 
            array (
                'id' => 1531,
                'degree_value' => '4',
                'court_value' => '150',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            211 => 
            array (
                'id' => 1532,
                'degree_value' => '4',
                'court_value' => '150',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            212 => 
            array (
                'id' => 1533,
                'degree_value' => '4',
                'court_value' => '152',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            213 => 
            array (
                'id' => 1534,
                'degree_value' => '4',
                'court_value' => '152',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            214 => 
            array (
                'id' => 1535,
                'degree_value' => '4',
                'court_value' => '152',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            215 => 
            array (
                'id' => 1536,
                'degree_value' => '4',
                'court_value' => '152',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            216 => 
            array (
                'id' => 1537,
                'degree_value' => '4',
                'court_value' => '152',
                'case_type_name' => 'مستعجل-تنفيذ',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            217 => 
            array (
                'id' => 1538,
                'degree_value' => '4',
                'court_value' => '152',
                'case_type_name' => 'تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            218 => 
            array (
                'id' => 1539,
                'degree_value' => '4',
                'court_value' => '160',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            219 => 
            array (
                'id' => 1540,
                'degree_value' => '4',
                'court_value' => '160',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            220 => 
            array (
                'id' => 1541,
                'degree_value' => '4',
                'court_value' => '160',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            221 => 
            array (
                'id' => 1542,
                'degree_value' => '4',
                'court_value' => '160',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            222 => 
            array (
                'id' => 1543,
                'degree_value' => '4',
                'court_value' => '161',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            223 => 
            array (
                'id' => 1544,
                'degree_value' => '4',
                'court_value' => '161',
                'case_type_name' => 'حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            224 => 
            array (
                'id' => 1545,
                'degree_value' => '4',
                'court_value' => '161',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            225 => 
            array (
                'id' => 1546,
                'degree_value' => '4',
                'court_value' => '161',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            226 => 
            array (
                'id' => 1547,
                'degree_value' => '4',
                'court_value' => '161',
                'case_type_name' => 'تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            227 => 
            array (
                'id' => 1548,
                'degree_value' => '4',
                'court_value' => '161',
                'case_type_name' => 'التماس',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            228 => 
            array (
                'id' => 1549,
                'degree_value' => '4',
                'court_value' => '161',
                'case_type_name' => 'تفسير حكم',
                'case_type_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            229 => 
            array (
                'id' => 1550,
                'degree_value' => '4',
                'court_value' => '161',
                'case_type_name' => 'معارضة',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            230 => 
            array (
                'id' => 1551,
                'degree_value' => '4',
                'court_value' => '163',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            231 => 
            array (
                'id' => 1552,
                'degree_value' => '4',
                'court_value' => '164',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            232 => 
            array (
                'id' => 1553,
                'degree_value' => '4',
                'court_value' => '165',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            233 => 
            array (
                'id' => 1554,
                'degree_value' => '4',
                'court_value' => '165',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            234 => 
            array (
                'id' => 1555,
                'degree_value' => '4',
                'court_value' => '165',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            235 => 
            array (
                'id' => 1556,
                'degree_value' => '4',
                'court_value' => '167',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            236 => 
            array (
                'id' => 1557,
                'degree_value' => '4',
                'court_value' => '167',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            237 => 
            array (
                'id' => 1558,
                'degree_value' => '4',
                'court_value' => '167',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            238 => 
            array (
                'id' => 1559,
                'degree_value' => '4',
                'court_value' => '167',
                'case_type_name' => 'توزيع',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            239 => 
            array (
                'id' => 1560,
                'degree_value' => '4',
                'court_value' => '170',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            240 => 
            array (
                'id' => 1561,
                'degree_value' => '4',
                'court_value' => '170',
                'case_type_name' => 'حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            241 => 
            array (
                'id' => 1562,
                'degree_value' => '4',
                'court_value' => '170',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            242 => 
            array (
                'id' => 1563,
                'degree_value' => '4',
                'court_value' => '170',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            243 => 
            array (
                'id' => 1564,
                'degree_value' => '4',
                'court_value' => '170',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            244 => 
            array (
                'id' => 1565,
                'degree_value' => '4',
                'court_value' => '170',
                'case_type_name' => 'بيوع',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            245 => 
            array (
                'id' => 1566,
                'degree_value' => '4',
                'court_value' => '170',
                'case_type_name' => 'بيئة',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            246 => 
            array (
                'id' => 1567,
                'degree_value' => '4',
                'court_value' => '175',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            247 => 
            array (
                'id' => 1568,
                'degree_value' => '4',
                'court_value' => '175',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            248 => 
            array (
                'id' => 1569,
                'degree_value' => '4',
                'court_value' => '175',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            249 => 
            array (
                'id' => 1570,
                'degree_value' => '4',
                'court_value' => '176',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            250 => 
            array (
                'id' => 1571,
                'degree_value' => '4',
                'court_value' => '176',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            251 => 
            array (
                'id' => 1572,
                'degree_value' => '4',
                'court_value' => '176',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            252 => 
            array (
                'id' => 1573,
                'degree_value' => '4',
                'court_value' => '176',
                'case_type_name' => 'اشكال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            253 => 
            array (
                'id' => 1574,
                'degree_value' => '4',
                'court_value' => '176',
                'case_type_name' => 'بيوع',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            254 => 
            array (
                'id' => 1575,
                'degree_value' => '4',
                'court_value' => '182',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            255 => 
            array (
                'id' => 1576,
                'degree_value' => '4',
                'court_value' => '182',
                'case_type_name' => 'حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            256 => 
            array (
                'id' => 1577,
                'degree_value' => '4',
                'court_value' => '182',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            257 => 
            array (
                'id' => 1578,
                'degree_value' => '4',
                'court_value' => '182',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            258 => 
            array (
                'id' => 1579,
                'degree_value' => '4',
                'court_value' => '182',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            259 => 
            array (
                'id' => 1580,
                'degree_value' => '4',
                'court_value' => '182',
                'case_type_name' => 'بيوع',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            260 => 
            array (
                'id' => 1581,
                'degree_value' => '4',
                'court_value' => '182',
                'case_type_name' => 'بيئة',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            261 => 
            array (
                'id' => 1582,
                'degree_value' => '4',
                'court_value' => '186',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            262 => 
            array (
                'id' => 1583,
                'degree_value' => '4',
                'court_value' => '186',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            263 => 
            array (
                'id' => 1584,
                'degree_value' => '4',
                'court_value' => '186',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            264 => 
            array (
                'id' => 1585,
                'degree_value' => '4',
                'court_value' => '186',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            265 => 
            array (
                'id' => 1586,
                'degree_value' => '4',
                'court_value' => '187',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            266 => 
            array (
                'id' => 1587,
                'degree_value' => '4',
                'court_value' => '187',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            267 => 
            array (
                'id' => 1588,
                'degree_value' => '4',
                'court_value' => '187',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            268 => 
            array (
                'id' => 1589,
                'degree_value' => '4',
                'court_value' => '187',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            269 => 
            array (
                'id' => 1590,
                'degree_value' => '4',
                'court_value' => '190',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            270 => 
            array (
                'id' => 1591,
                'degree_value' => '4',
                'court_value' => '190',
                'case_type_name' => 'حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            271 => 
            array (
                'id' => 1592,
                'degree_value' => '4',
                'court_value' => '190',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            272 => 
            array (
                'id' => 1593,
                'degree_value' => '4',
                'court_value' => '190',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            273 => 
            array (
                'id' => 1594,
                'degree_value' => '4',
                'court_value' => '190',
                'case_type_name' => 'تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            274 => 
            array (
                'id' => 1595,
                'degree_value' => '4',
                'court_value' => '190',
                'case_type_name' => 'التماس',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            275 => 
            array (
                'id' => 1596,
                'degree_value' => '4',
                'court_value' => '190',
                'case_type_name' => 'تفسير حكم',
                'case_type_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            276 => 
            array (
                'id' => 1597,
                'degree_value' => '4',
                'court_value' => '190',
                'case_type_name' => 'معارضة',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            277 => 
            array (
                'id' => 1598,
                'degree_value' => '4',
                'court_value' => '191',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            278 => 
            array (
                'id' => 1599,
                'degree_value' => '4',
                'court_value' => '191',
                'case_type_name' => 'حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            279 => 
            array (
                'id' => 1600,
                'degree_value' => '4',
                'court_value' => '191',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            280 => 
            array (
                'id' => 1601,
                'degree_value' => '4',
                'court_value' => '191',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            281 => 
            array (
                'id' => 1602,
                'degree_value' => '4',
                'court_value' => '191',
                'case_type_name' => 'تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            282 => 
            array (
                'id' => 1603,
                'degree_value' => '4',
                'court_value' => '191',
                'case_type_name' => 'التماس',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            283 => 
            array (
                'id' => 1604,
                'degree_value' => '4',
                'court_value' => '191',
                'case_type_name' => 'تفسير حكم',
                'case_type_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            284 => 
            array (
                'id' => 1605,
                'degree_value' => '4',
                'court_value' => '191',
                'case_type_name' => 'معارضة',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            285 => 
            array (
                'id' => 1606,
                'degree_value' => '4',
                'court_value' => '192',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            286 => 
            array (
                'id' => 1607,
                'degree_value' => '4',
                'court_value' => '192',
                'case_type_name' => 'حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            287 => 
            array (
                'id' => 1608,
                'degree_value' => '4',
                'court_value' => '192',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            288 => 
            array (
                'id' => 1609,
                'degree_value' => '4',
                'court_value' => '192',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            289 => 
            array (
                'id' => 1610,
                'degree_value' => '4',
                'court_value' => '192',
                'case_type_name' => 'تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            290 => 
            array (
                'id' => 1611,
                'degree_value' => '4',
                'court_value' => '192',
                'case_type_name' => 'التماس',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            291 => 
            array (
                'id' => 1612,
                'degree_value' => '4',
                'court_value' => '192',
                'case_type_name' => 'تفسير حكم',
                'case_type_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            292 => 
            array (
                'id' => 1613,
                'degree_value' => '4',
                'court_value' => '192',
                'case_type_name' => 'معارضة',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            293 => 
            array (
                'id' => 1614,
                'degree_value' => '4',
                'court_value' => '193',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            294 => 
            array (
                'id' => 1615,
                'degree_value' => '4',
                'court_value' => '193',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            295 => 
            array (
                'id' => 1616,
                'degree_value' => '4',
                'court_value' => '193',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            296 => 
            array (
                'id' => 1617,
                'degree_value' => '4',
                'court_value' => '193',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            297 => 
            array (
                'id' => 1618,
                'degree_value' => '4',
                'court_value' => '193',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            298 => 
            array (
                'id' => 1619,
                'degree_value' => '4',
                'court_value' => '193',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            299 => 
            array (
                'id' => 1620,
                'degree_value' => '4',
                'court_value' => '193',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            300 => 
            array (
                'id' => 1621,
                'degree_value' => '4',
                'court_value' => '193',
                'case_type_name' => 'تجارى كلى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            301 => 
            array (
                'id' => 1622,
                'degree_value' => '4',
                'court_value' => '193',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            302 => 
            array (
                'id' => 1623,
                'degree_value' => '4',
                'court_value' => '193',
                'case_type_name' => 'تفسير حكم',
                'case_type_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            303 => 
            array (
                'id' => 1624,
                'degree_value' => '4',
                'court_value' => '193',
                'case_type_name' => 'معارضة',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            304 => 
            array (
                'id' => 1625,
                'degree_value' => '4',
                'court_value' => '193',
                'case_type_name' => 'التماسات',
                'case_type_value' => '29',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            305 => 
            array (
                'id' => 1626,
                'degree_value' => '4',
                'court_value' => '194',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            306 => 
            array (
                'id' => 1627,
                'degree_value' => '4',
                'court_value' => '194',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            307 => 
            array (
                'id' => 1628,
                'degree_value' => '4',
                'court_value' => '194',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            308 => 
            array (
                'id' => 1629,
                'degree_value' => '4',
                'court_value' => '194',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            309 => 
            array (
                'id' => 1630,
                'degree_value' => '4',
                'court_value' => '194',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            310 => 
            array (
                'id' => 1631,
                'degree_value' => '4',
                'court_value' => '194',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            311 => 
            array (
                'id' => 1632,
                'degree_value' => '4',
                'court_value' => '194',
                'case_type_name' => 'التماس',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            312 => 
            array (
                'id' => 1633,
                'degree_value' => '4',
                'court_value' => '194',
                'case_type_name' => 'تفسير حكم',
                'case_type_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            313 => 
            array (
                'id' => 1634,
                'degree_value' => '4',
                'court_value' => '194',
                'case_type_name' => 'معارضة',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            314 => 
            array (
                'id' => 1635,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            315 => 
            array (
                'id' => 1636,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            316 => 
            array (
                'id' => 1637,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            317 => 
            array (
                'id' => 1638,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            318 => 
            array (
                'id' => 1639,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            319 => 
            array (
                'id' => 1640,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            320 => 
            array (
                'id' => 1641,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            321 => 
            array (
                'id' => 1642,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            322 => 
            array (
                'id' => 1643,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'مستأنف تنفيذ',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            323 => 
            array (
                'id' => 1644,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'تامينات',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            324 => 
            array (
                'id' => 1645,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'مستأنف تنفيذ ومستعجل',
                'case_type_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            325 => 
            array (
                'id' => 1646,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'التماس',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            326 => 
            array (
                'id' => 1647,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'تفسير حكم',
                'case_type_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            327 => 
            array (
                'id' => 1648,
                'degree_value' => '4',
                'court_value' => '195',
                'case_type_name' => 'معارضة',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            328 => 
            array (
                'id' => 1649,
                'degree_value' => '4',
                'court_value' => '196',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            329 => 
            array (
                'id' => 1650,
                'degree_value' => '4',
                'court_value' => '196',
                'case_type_name' => 'حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            330 => 
            array (
                'id' => 1651,
                'degree_value' => '4',
                'court_value' => '196',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            331 => 
            array (
                'id' => 1652,
                'degree_value' => '4',
                'court_value' => '196',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            332 => 
            array (
                'id' => 1653,
                'degree_value' => '4',
                'court_value' => '196',
                'case_type_name' => 'تنفيذ واشكال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            333 => 
            array (
                'id' => 1654,
                'degree_value' => '4',
                'court_value' => '196',
                'case_type_name' => 'التماس',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            334 => 
            array (
                'id' => 1655,
                'degree_value' => '4',
                'court_value' => '196',
                'case_type_name' => 'تفسير حكم',
                'case_type_value' => '26',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            335 => 
            array (
                'id' => 1656,
                'degree_value' => '4',
                'court_value' => '196',
                'case_type_name' => 'معارضة',
                'case_type_value' => '27',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            336 => 
            array (
                'id' => 1657,
                'degree_value' => '4',
                'court_value' => '202',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            337 => 
            array (
                'id' => 1658,
                'degree_value' => '4',
                'court_value' => '202',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            338 => 
            array (
                'id' => 1659,
                'degree_value' => '4',
                'court_value' => '202',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            339 => 
            array (
                'id' => 1660,
                'degree_value' => '4',
                'court_value' => '202',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            340 => 
            array (
                'id' => 1661,
                'degree_value' => '4',
                'court_value' => '202',
                'case_type_name' => 'مستأنف مستعجل وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            341 => 
            array (
                'id' => 1662,
                'degree_value' => '4',
                'court_value' => '202',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            342 => 
            array (
                'id' => 1663,
                'degree_value' => '4',
                'court_value' => '202',
                'case_type_name' => 'تجارى كلى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            343 => 
            array (
                'id' => 1664,
                'degree_value' => '4',
                'court_value' => '202',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            344 => 
            array (
                'id' => 1665,
                'degree_value' => '4',
                'court_value' => '202',
                'case_type_name' => 'تامينات كلى',
                'case_type_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            345 => 
            array (
                'id' => 1666,
                'degree_value' => '4',
                'court_value' => '202',
                'case_type_name' => 'عمال وتامينات',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            346 => 
            array (
                'id' => 1667,
                'degree_value' => '4',
                'court_value' => '209',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            347 => 
            array (
                'id' => 1668,
                'degree_value' => '4',
                'court_value' => '209',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            348 => 
            array (
                'id' => 1669,
                'degree_value' => '4',
                'court_value' => '209',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            349 => 
            array (
                'id' => 1670,
                'degree_value' => '4',
                'court_value' => '209',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            350 => 
            array (
                'id' => 1671,
                'degree_value' => '4',
                'court_value' => '209',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            351 => 
            array (
                'id' => 1672,
                'degree_value' => '4',
                'court_value' => '209',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            352 => 
            array (
                'id' => 1673,
                'degree_value' => '4',
                'court_value' => '209',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            353 => 
            array (
                'id' => 1674,
                'degree_value' => '4',
                'court_value' => '215',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            354 => 
            array (
                'id' => 1675,
                'degree_value' => '4',
                'court_value' => '215',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            355 => 
            array (
                'id' => 1676,
                'degree_value' => '4',
                'court_value' => '215',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            356 => 
            array (
                'id' => 1677,
                'degree_value' => '4',
                'court_value' => '215',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            357 => 
            array (
                'id' => 1678,
                'degree_value' => '4',
                'court_value' => '215',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            358 => 
            array (
                'id' => 1679,
                'degree_value' => '4',
                'court_value' => '215',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            359 => 
            array (
                'id' => 1680,
                'degree_value' => '4',
                'court_value' => '215',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            360 => 
            array (
                'id' => 1681,
                'degree_value' => '4',
                'court_value' => '215',
                'case_type_name' => 'تجارى كلى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            361 => 
            array (
                'id' => 1682,
                'degree_value' => '4',
                'court_value' => '215',
                'case_type_name' => 'عمال كلى',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            362 => 
            array (
                'id' => 1683,
                'degree_value' => '4',
                'court_value' => '216',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            363 => 
            array (
                'id' => 1684,
                'degree_value' => '4',
                'court_value' => '216',
                'case_type_name' => 'تجارى',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            364 => 
            array (
                'id' => 1685,
                'degree_value' => '4',
                'court_value' => '216',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            365 => 
            array (
                'id' => 1686,
                'degree_value' => '4',
                'court_value' => '216',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            366 => 
            array (
                'id' => 1687,
                'degree_value' => '4',
                'court_value' => '216',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            367 => 
            array (
                'id' => 1688,
                'degree_value' => '4',
                'court_value' => '216',
                'case_type_name' => 'اتعاب محاماه',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            368 => 
            array (
                'id' => 1689,
                'degree_value' => '4',
                'court_value' => '216',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            369 => 
            array (
                'id' => 1690,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            370 => 
            array (
                'id' => 1691,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            371 => 
            array (
                'id' => 1692,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            372 => 
            array (
                'id' => 1693,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            373 => 
            array (
                'id' => 1694,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            374 => 
            array (
                'id' => 1695,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            375 => 
            array (
                'id' => 1696,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            376 => 
            array (
                'id' => 1697,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            377 => 
            array (
                'id' => 1698,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            378 => 
            array (
                'id' => 1699,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            379 => 
            array (
                'id' => 1700,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'بيئة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            380 => 
            array (
                'id' => 1701,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            381 => 
            array (
                'id' => 1702,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'مدنى مستأنف حكومه',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            382 => 
            array (
                'id' => 1703,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'مدنى مستأنف مستعجل حكومه',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            383 => 
            array (
                'id' => 1704,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'مستأنف صحه توقيع',
                'case_type_value' => '15',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            384 => 
            array (
                'id' => 1705,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'عمال العبور',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            385 => 
            array (
                'id' => 1706,
                'degree_value' => '4',
                'court_value' => '218',
                'case_type_name' => 'اوقاف',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            386 => 
            array (
                'id' => 1707,
                'degree_value' => '4',
                'court_value' => '219',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            387 => 
            array (
                'id' => 1708,
                'degree_value' => '4',
                'court_value' => '219',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            388 => 
            array (
                'id' => 1709,
                'degree_value' => '4',
                'court_value' => '219',
                'case_type_name' => 'تعويضات البيئة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            389 => 
            array (
                'id' => 1710,
                'degree_value' => '4',
                'court_value' => '219',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            390 => 
            array (
                'id' => 1711,
                'degree_value' => '4',
                'court_value' => '219',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            391 => 
            array (
                'id' => 1712,
                'degree_value' => '4',
                'court_value' => '220',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            392 => 
            array (
                'id' => 1713,
                'degree_value' => '4',
                'court_value' => '220',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            393 => 
            array (
                'id' => 1714,
                'degree_value' => '4',
                'court_value' => '220',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            394 => 
            array (
                'id' => 1715,
                'degree_value' => '4',
                'court_value' => '220',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            395 => 
            array (
                'id' => 1716,
                'degree_value' => '4',
                'court_value' => '220',
                'case_type_name' => 'تجارى بحرى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            396 => 
            array (
                'id' => 1717,
                'degree_value' => '4',
                'court_value' => '222',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            397 => 
            array (
                'id' => 1718,
                'degree_value' => '4',
                'court_value' => '222',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            398 => 
            array (
                'id' => 1719,
                'degree_value' => '4',
                'court_value' => '222',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            399 => 
            array (
                'id' => 1720,
                'degree_value' => '4',
                'court_value' => '222',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            400 => 
            array (
                'id' => 1721,
                'degree_value' => '4',
                'court_value' => '222',
                'case_type_name' => 'مدنى مستانف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            401 => 
            array (
                'id' => 1722,
                'degree_value' => '4',
                'court_value' => '222',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            402 => 
            array (
                'id' => 1723,
                'degree_value' => '4',
                'court_value' => '222',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            403 => 
            array (
                'id' => 1724,
                'degree_value' => '4',
                'court_value' => '222',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            404 => 
            array (
                'id' => 1725,
                'degree_value' => '4',
                'court_value' => '222',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            405 => 
            array (
                'id' => 1726,
                'degree_value' => '4',
                'court_value' => '222',
                'case_type_name' => 'بيئة',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            406 => 
            array (
                'id' => 1727,
                'degree_value' => '4',
                'court_value' => '223',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            407 => 
            array (
                'id' => 1728,
                'degree_value' => '4',
                'court_value' => '223',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            408 => 
            array (
                'id' => 1729,
                'degree_value' => '4',
                'court_value' => '223',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            409 => 
            array (
                'id' => 1730,
                'degree_value' => '4',
                'court_value' => '223',
                'case_type_name' => 'مدنى مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            410 => 
            array (
                'id' => 1731,
                'degree_value' => '4',
                'court_value' => '223',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            411 => 
            array (
                'id' => 1732,
                'degree_value' => '4',
                'court_value' => '223',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            412 => 
            array (
                'id' => 1733,
                'degree_value' => '4',
                'court_value' => '223',
                'case_type_name' => 'تعاب محاماه',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            413 => 
            array (
                'id' => 1734,
                'degree_value' => '4',
                'court_value' => '223',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            414 => 
            array (
                'id' => 1735,
                'degree_value' => '4',
                'court_value' => '224',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            415 => 
            array (
                'id' => 1736,
                'degree_value' => '4',
                'court_value' => '224',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            416 => 
            array (
                'id' => 1737,
                'degree_value' => '4',
                'court_value' => '224',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            417 => 
            array (
                'id' => 1738,
                'degree_value' => '4',
                'court_value' => '225',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            418 => 
            array (
                'id' => 1739,
                'degree_value' => '4',
                'court_value' => '225',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            419 => 
            array (
                'id' => 1740,
                'degree_value' => '4',
                'court_value' => '225',
                'case_type_name' => 'حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            420 => 
            array (
                'id' => 1741,
                'degree_value' => '4',
                'court_value' => '225',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            421 => 
            array (
                'id' => 1742,
                'degree_value' => '4',
                'court_value' => '225',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            422 => 
            array (
                'id' => 1743,
                'degree_value' => '4',
                'court_value' => '225',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            423 => 
            array (
                'id' => 1744,
                'degree_value' => '4',
                'court_value' => '226',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            424 => 
            array (
                'id' => 1745,
                'degree_value' => '4',
                'court_value' => '226',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            425 => 
            array (
                'id' => 1746,
                'degree_value' => '4',
                'court_value' => '226',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            426 => 
            array (
                'id' => 1747,
                'degree_value' => '4',
                'court_value' => '227',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            427 => 
            array (
                'id' => 1748,
                'degree_value' => '4',
                'court_value' => '227',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            428 => 
            array (
                'id' => 1749,
                'degree_value' => '4',
                'court_value' => '227',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            429 => 
            array (
                'id' => 1750,
                'degree_value' => '4',
                'court_value' => '227',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            430 => 
            array (
                'id' => 1751,
                'degree_value' => '4',
                'court_value' => '227',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            431 => 
            array (
                'id' => 1752,
                'degree_value' => '4',
                'court_value' => '227',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            432 => 
            array (
                'id' => 1753,
                'degree_value' => '4',
                'court_value' => '227',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            433 => 
            array (
                'id' => 1754,
                'degree_value' => '4',
                'court_value' => '228',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            434 => 
            array (
                'id' => 1755,
                'degree_value' => '4',
                'court_value' => '228',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            435 => 
            array (
                'id' => 1756,
                'degree_value' => '4',
                'court_value' => '228',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            436 => 
            array (
                'id' => 1757,
                'degree_value' => '4',
                'court_value' => '228',
                'case_type_name' => 'مدنى حكومة واشكال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            437 => 
            array (
                'id' => 1758,
                'degree_value' => '4',
                'court_value' => '229',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            438 => 
            array (
                'id' => 1759,
                'degree_value' => '4',
                'court_value' => '229',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            439 => 
            array (
                'id' => 1760,
                'degree_value' => '4',
                'court_value' => '229',
                'case_type_name' => 'حكومة ومستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            440 => 
            array (
                'id' => 1761,
                'degree_value' => '4',
                'court_value' => '229',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            441 => 
            array (
                'id' => 1762,
                'degree_value' => '4',
                'court_value' => '237',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            442 => 
            array (
                'id' => 1763,
                'degree_value' => '4',
                'court_value' => '237',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            443 => 
            array (
                'id' => 1764,
                'degree_value' => '4',
                'court_value' => '237',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            444 => 
            array (
                'id' => 1765,
                'degree_value' => '4',
                'court_value' => '237',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            445 => 
            array (
                'id' => 1766,
                'degree_value' => '4',
                'court_value' => '237',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            446 => 
            array (
                'id' => 1767,
                'degree_value' => '4',
                'court_value' => '240',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            447 => 
            array (
                'id' => 1768,
                'degree_value' => '4',
                'court_value' => '240',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            448 => 
            array (
                'id' => 1769,
                'degree_value' => '4',
                'court_value' => '240',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            449 => 
            array (
                'id' => 1770,
                'degree_value' => '4',
                'court_value' => '240',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            450 => 
            array (
                'id' => 1771,
                'degree_value' => '4',
                'court_value' => '240',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            451 => 
            array (
                'id' => 1772,
                'degree_value' => '4',
                'court_value' => '240',
                'case_type_name' => 'تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            452 => 
            array (
                'id' => 1773,
                'degree_value' => '4',
                'court_value' => '252',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            453 => 
            array (
                'id' => 1774,
                'degree_value' => '4',
                'court_value' => '252',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            454 => 
            array (
                'id' => 1775,
                'degree_value' => '4',
                'court_value' => '252',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            455 => 
            array (
                'id' => 1776,
                'degree_value' => '4',
                'court_value' => '252',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            456 => 
            array (
                'id' => 1777,
                'degree_value' => '4',
                'court_value' => '252',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            457 => 
            array (
                'id' => 1778,
                'degree_value' => '4',
                'court_value' => '253',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            458 => 
            array (
                'id' => 1779,
                'degree_value' => '4',
                'court_value' => '253',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            459 => 
            array (
                'id' => 1780,
                'degree_value' => '4',
                'court_value' => '253',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            460 => 
            array (
                'id' => 1781,
                'degree_value' => '4',
                'court_value' => '253',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            461 => 
            array (
                'id' => 1782,
                'degree_value' => '4',
                'court_value' => '253',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            462 => 
            array (
                'id' => 1783,
                'degree_value' => '4',
                'court_value' => '259',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            463 => 
            array (
                'id' => 1784,
                'degree_value' => '4',
                'court_value' => '259',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            464 => 
            array (
                'id' => 1785,
                'degree_value' => '4',
                'court_value' => '259',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            465 => 
            array (
                'id' => 1786,
                'degree_value' => '4',
                'court_value' => '259',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            466 => 
            array (
                'id' => 1787,
                'degree_value' => '4',
                'court_value' => '259',
                'case_type_name' => 'اشكال تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            467 => 
            array (
                'id' => 1788,
                'degree_value' => '4',
                'court_value' => '261',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            468 => 
            array (
                'id' => 1789,
                'degree_value' => '4',
                'court_value' => '261',
                'case_type_name' => 'تجارى',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            469 => 
            array (
                'id' => 1790,
                'degree_value' => '4',
                'court_value' => '261',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            470 => 
            array (
                'id' => 1791,
                'degree_value' => '4',
                'court_value' => '261',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            471 => 
            array (
                'id' => 1792,
                'degree_value' => '4',
                'court_value' => '261',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            472 => 
            array (
                'id' => 1793,
                'degree_value' => '4',
                'court_value' => '261',
                'case_type_name' => 'اتعاب محاماه',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            473 => 
            array (
                'id' => 1794,
                'degree_value' => '4',
                'court_value' => '261',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            474 => 
            array (
                'id' => 1795,
                'degree_value' => '4',
                'court_value' => '262',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            475 => 
            array (
                'id' => 1796,
                'degree_value' => '4',
                'court_value' => '262',
                'case_type_name' => 'مدنى حكومه',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            476 => 
            array (
                'id' => 1797,
                'degree_value' => '4',
                'court_value' => '262',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            477 => 
            array (
                'id' => 1798,
                'degree_value' => '4',
                'court_value' => '262',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            478 => 
            array (
                'id' => 1799,
                'degree_value' => '4',
                'court_value' => '262',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            479 => 
            array (
                'id' => 1800,
                'degree_value' => '4',
                'court_value' => '262',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            480 => 
            array (
                'id' => 1801,
                'degree_value' => '4',
                'court_value' => '262',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            481 => 
            array (
                'id' => 1802,
                'degree_value' => '4',
                'court_value' => '262',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            482 => 
            array (
                'id' => 1803,
                'degree_value' => '4',
                'court_value' => '262',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            483 => 
            array (
                'id' => 1804,
                'degree_value' => '4',
                'court_value' => '264',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            484 => 
            array (
                'id' => 1805,
                'degree_value' => '4',
                'court_value' => '264',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            485 => 
            array (
                'id' => 1806,
                'degree_value' => '4',
                'court_value' => '264',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            486 => 
            array (
                'id' => 1807,
                'degree_value' => '4',
                'court_value' => '265',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            487 => 
            array (
                'id' => 1808,
                'degree_value' => '4',
                'court_value' => '265',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            488 => 
            array (
                'id' => 1809,
                'degree_value' => '4',
                'court_value' => '265',
                'case_type_name' => 'مساكن',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            489 => 
            array (
                'id' => 1810,
                'degree_value' => '4',
                'court_value' => '265',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            490 => 
            array (
                'id' => 1811,
                'degree_value' => '4',
                'court_value' => '265',
                'case_type_name' => 'مستأنف مستعجل وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            491 => 
            array (
                'id' => 1812,
                'degree_value' => '4',
                'court_value' => '265',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            492 => 
            array (
                'id' => 1813,
                'degree_value' => '4',
                'court_value' => '265',
                'case_type_name' => 'مدنى مستأنف حكومة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            493 => 
            array (
                'id' => 1814,
                'degree_value' => '4',
                'court_value' => '265',
                'case_type_name' => 'قضايا الاوقاف',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            494 => 
            array (
                'id' => 1815,
                'degree_value' => '4',
                'court_value' => '265',
                'case_type_name' => 'ايجارات ق م',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            495 => 
            array (
                'id' => 1816,
                'degree_value' => '4',
                'court_value' => '266',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            496 => 
            array (
                'id' => 1817,
                'degree_value' => '4',
                'court_value' => '266',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            497 => 
            array (
                'id' => 1818,
                'degree_value' => '4',
                'court_value' => '266',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            498 => 
            array (
                'id' => 1819,
                'degree_value' => '4',
                'court_value' => '266',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            499 => 
            array (
                'id' => 1820,
                'degree_value' => '4',
                'court_value' => '266',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));
        \DB::table('search_case_types')->insert(array (
            0 => 
            array (
                'id' => 1821,
                'degree_value' => '4',
                'court_value' => '266',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 1822,
                'degree_value' => '4',
                'court_value' => '280',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 1823,
                'degree_value' => '4',
                'court_value' => '280',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 1824,
                'degree_value' => '4',
                'court_value' => '280',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 1825,
                'degree_value' => '4',
                'court_value' => '280',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            5 => 
            array (
                'id' => 1826,
                'degree_value' => '4',
                'court_value' => '280',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            6 => 
            array (
                'id' => 1827,
                'degree_value' => '4',
                'court_value' => '280',
                'case_type_name' => 'اشكال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            7 => 
            array (
                'id' => 1828,
                'degree_value' => '4',
                'court_value' => '281',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            8 => 
            array (
                'id' => 1829,
                'degree_value' => '4',
                'court_value' => '281',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            9 => 
            array (
                'id' => 1830,
                'degree_value' => '4',
                'court_value' => '281',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            10 => 
            array (
                'id' => 1831,
                'degree_value' => '4',
                'court_value' => '281',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            11 => 
            array (
                'id' => 1832,
                'degree_value' => '4',
                'court_value' => '281',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            12 => 
            array (
                'id' => 1833,
                'degree_value' => '4',
                'court_value' => '281',
                'case_type_name' => 'اشكال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            13 => 
            array (
                'id' => 1834,
                'degree_value' => '4',
                'court_value' => '291',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            14 => 
            array (
                'id' => 1835,
                'degree_value' => '4',
                'court_value' => '291',
                'case_type_name' => 'حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            15 => 
            array (
                'id' => 1836,
                'degree_value' => '4',
                'court_value' => '291',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            16 => 
            array (
                'id' => 1837,
                'degree_value' => '4',
                'court_value' => '291',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            17 => 
            array (
                'id' => 1838,
                'degree_value' => '4',
                'court_value' => '297',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            18 => 
            array (
                'id' => 1839,
                'degree_value' => '4',
                'court_value' => '297',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            19 => 
            array (
                'id' => 1840,
                'degree_value' => '4',
                'court_value' => '297',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            20 => 
            array (
                'id' => 1841,
                'degree_value' => '4',
                'court_value' => '297',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            21 => 
            array (
                'id' => 1842,
                'degree_value' => '4',
                'court_value' => '297',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            22 => 
            array (
                'id' => 1843,
                'degree_value' => '4',
                'court_value' => '297',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            23 => 
            array (
                'id' => 1844,
                'degree_value' => '4',
                'court_value' => '297',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            24 => 
            array (
                'id' => 1845,
                'degree_value' => '4',
                'court_value' => '297',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            25 => 
            array (
                'id' => 1846,
                'degree_value' => '4',
                'court_value' => '297',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            26 => 
            array (
                'id' => 1847,
                'degree_value' => '4',
                'court_value' => '297',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            27 => 
            array (
                'id' => 1848,
                'degree_value' => '4',
                'court_value' => '297',
                'case_type_name' => 'بيئة',
                'case_type_value' => '11',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            28 => 
            array (
                'id' => 1849,
                'degree_value' => '4',
                'court_value' => '297',
                'case_type_name' => 'بيوع',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            29 => 
            array (
                'id' => 1850,
                'degree_value' => '4',
                'court_value' => '298',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            30 => 
            array (
                'id' => 1851,
                'degree_value' => '4',
                'court_value' => '298',
                'case_type_name' => 'حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            31 => 
            array (
                'id' => 1852,
                'degree_value' => '4',
                'court_value' => '298',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            32 => 
            array (
                'id' => 1853,
                'degree_value' => '4',
                'court_value' => '298',
                'case_type_name' => 'بيوع',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            33 => 
            array (
                'id' => 1854,
                'degree_value' => '4',
                'court_value' => '298',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            34 => 
            array (
                'id' => 1855,
                'degree_value' => '4',
                'court_value' => '299',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            35 => 
            array (
                'id' => 1856,
                'degree_value' => '4',
                'court_value' => '299',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            36 => 
            array (
                'id' => 1857,
                'degree_value' => '4',
                'court_value' => '299',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            37 => 
            array (
                'id' => 1858,
                'degree_value' => '4',
                'court_value' => '299',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            38 => 
            array (
                'id' => 1859,
                'degree_value' => '4',
                'court_value' => '299',
                'case_type_name' => 'اشكال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            39 => 
            array (
                'id' => 1860,
                'degree_value' => '4',
                'court_value' => '299',
                'case_type_name' => 'بيئة',
                'case_type_value' => '19',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            40 => 
            array (
                'id' => 1861,
                'degree_value' => '4',
                'court_value' => '300',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            41 => 
            array (
                'id' => 1862,
                'degree_value' => '4',
                'court_value' => '300',
                'case_type_name' => 'حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            42 => 
            array (
                'id' => 1863,
                'degree_value' => '4',
                'court_value' => '300',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            43 => 
            array (
                'id' => 1864,
                'degree_value' => '4',
                'court_value' => '300',
                'case_type_name' => 'اشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            44 => 
            array (
                'id' => 1865,
                'degree_value' => '4',
                'court_value' => '303',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            45 => 
            array (
                'id' => 1866,
                'degree_value' => '4',
                'court_value' => '303',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            46 => 
            array (
                'id' => 1867,
                'degree_value' => '4',
                'court_value' => '303',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            47 => 
            array (
                'id' => 1868,
                'degree_value' => '4',
                'court_value' => '303',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            48 => 
            array (
                'id' => 1869,
                'degree_value' => '4',
                'court_value' => '303',
                'case_type_name' => 'اشكال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            49 => 
            array (
                'id' => 1870,
                'degree_value' => '4',
                'court_value' => '303',
                'case_type_name' => 'بيئة',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            50 => 
            array (
                'id' => 1871,
                'degree_value' => '4',
                'court_value' => '305',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            51 => 
            array (
                'id' => 1872,
                'degree_value' => '4',
                'court_value' => '305',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            52 => 
            array (
                'id' => 1873,
                'degree_value' => '4',
                'court_value' => '305',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            53 => 
            array (
                'id' => 1874,
                'degree_value' => '4',
                'court_value' => '305',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            54 => 
            array (
                'id' => 1875,
                'degree_value' => '4',
                'court_value' => '305',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            55 => 
            array (
                'id' => 1876,
                'degree_value' => '4',
                'court_value' => '305',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            56 => 
            array (
                'id' => 1877,
                'degree_value' => '4',
                'court_value' => '305',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            57 => 
            array (
                'id' => 1878,
                'degree_value' => '4',
                'court_value' => '305',
                'case_type_name' => 'اوقاف',
                'case_type_value' => '25',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            58 => 
            array (
                'id' => 1879,
                'degree_value' => '4',
                'court_value' => '305',
                'case_type_name' => 'اوامر اداء',
                'case_type_value' => '30',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            59 => 
            array (
                'id' => 1880,
                'degree_value' => '4',
                'court_value' => '305',
                'case_type_name' => 'بيئة',
                'case_type_value' => '34',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            60 => 
            array (
                'id' => 1881,
                'degree_value' => '4',
                'court_value' => '306',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            61 => 
            array (
                'id' => 1882,
                'degree_value' => '4',
                'court_value' => '306',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            62 => 
            array (
                'id' => 1883,
                'degree_value' => '4',
                'court_value' => '306',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            63 => 
            array (
                'id' => 1884,
                'degree_value' => '4',
                'court_value' => '306',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            64 => 
            array (
                'id' => 1885,
                'degree_value' => '4',
                'court_value' => '306',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            65 => 
            array (
                'id' => 1886,
                'degree_value' => '4',
                'court_value' => '307',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            66 => 
            array (
                'id' => 1887,
                'degree_value' => '4',
                'court_value' => '307',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            67 => 
            array (
                'id' => 1888,
                'degree_value' => '4',
                'court_value' => '307',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            68 => 
            array (
                'id' => 1889,
                'degree_value' => '4',
                'court_value' => '307',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            69 => 
            array (
                'id' => 1890,
                'degree_value' => '4',
                'court_value' => '307',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            70 => 
            array (
                'id' => 1891,
                'degree_value' => '4',
                'court_value' => '307',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            71 => 
            array (
                'id' => 1892,
                'degree_value' => '4',
                'court_value' => '307',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            72 => 
            array (
                'id' => 1893,
                'degree_value' => '4',
                'court_value' => '307',
                'case_type_name' => 'طعون ايجارات',
                'case_type_value' => '13',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            73 => 
            array (
                'id' => 1894,
                'degree_value' => '4',
                'court_value' => '307',
                'case_type_name' => 'افلاس',
                'case_type_value' => '16',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            74 => 
            array (
                'id' => 1895,
                'degree_value' => '4',
                'court_value' => '311',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            75 => 
            array (
                'id' => 1896,
                'degree_value' => '4',
                'court_value' => '311',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            76 => 
            array (
                'id' => 1897,
                'degree_value' => '4',
                'court_value' => '311',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            77 => 
            array (
                'id' => 1898,
                'degree_value' => '4',
                'court_value' => '311',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            78 => 
            array (
                'id' => 1899,
                'degree_value' => '4',
                'court_value' => '311',
                'case_type_name' => 'مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            79 => 
            array (
                'id' => 1900,
                'degree_value' => '4',
                'court_value' => '311',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            80 => 
            array (
                'id' => 1901,
                'degree_value' => '4',
                'court_value' => '311',
                'case_type_name' => 'تجارى كلى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            81 => 
            array (
                'id' => 1902,
                'degree_value' => '4',
                'court_value' => '311',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            82 => 
            array (
                'id' => 1903,
                'degree_value' => '4',
                'court_value' => '311',
                'case_type_name' => 'اوقاف',
                'case_type_value' => '20',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            83 => 
            array (
                'id' => 1904,
                'degree_value' => '4',
                'court_value' => '311',
                'case_type_name' => 'افلاس',
                'case_type_value' => '34',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            84 => 
            array (
                'id' => 1905,
                'degree_value' => '4',
                'court_value' => '317',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            85 => 
            array (
                'id' => 1906,
                'degree_value' => '4',
                'court_value' => '317',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            86 => 
            array (
                'id' => 1907,
                'degree_value' => '4',
                'court_value' => '317',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            87 => 
            array (
                'id' => 1908,
                'degree_value' => '4',
                'court_value' => '317',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            88 => 
            array (
                'id' => 1909,
                'degree_value' => '4',
                'court_value' => '317',
                'case_type_name' => 'مدنى مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            89 => 
            array (
                'id' => 1910,
                'degree_value' => '4',
                'court_value' => '325',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            90 => 
            array (
                'id' => 1911,
                'degree_value' => '4',
                'court_value' => '325',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            91 => 
            array (
                'id' => 1912,
                'degree_value' => '4',
                'court_value' => '325',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            92 => 
            array (
                'id' => 1913,
                'degree_value' => '4',
                'court_value' => '325',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            93 => 
            array (
                'id' => 1914,
                'degree_value' => '4',
                'court_value' => '325',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            94 => 
            array (
                'id' => 1915,
                'degree_value' => '4',
                'court_value' => '328',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            95 => 
            array (
                'id' => 1916,
                'degree_value' => '4',
                'court_value' => '328',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            96 => 
            array (
                'id' => 1917,
                'degree_value' => '4',
                'court_value' => '328',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            97 => 
            array (
                'id' => 1918,
                'degree_value' => '4',
                'court_value' => '328',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            98 => 
            array (
                'id' => 1919,
                'degree_value' => '4',
                'court_value' => '328',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            99 => 
            array (
                'id' => 1920,
                'degree_value' => '4',
                'court_value' => '330',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            100 => 
            array (
                'id' => 1921,
                'degree_value' => '4',
                'court_value' => '330',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            101 => 
            array (
                'id' => 1922,
                'degree_value' => '4',
                'court_value' => '330',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            102 => 
            array (
                'id' => 1923,
                'degree_value' => '4',
                'court_value' => '330',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            103 => 
            array (
                'id' => 1924,
                'degree_value' => '4',
                'court_value' => '330',
                'case_type_name' => 'اشكال وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            104 => 
            array (
                'id' => 1925,
                'degree_value' => '4',
                'court_value' => '333',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            105 => 
            array (
                'id' => 1926,
                'degree_value' => '4',
                'court_value' => '333',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            106 => 
            array (
                'id' => 1927,
                'degree_value' => '4',
                'court_value' => '333',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            107 => 
            array (
                'id' => 1928,
                'degree_value' => '4',
                'court_value' => '333',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            108 => 
            array (
                'id' => 1929,
                'degree_value' => '4',
                'court_value' => '333',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            109 => 
            array (
                'id' => 1930,
                'degree_value' => '4',
                'court_value' => '333',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            110 => 
            array (
                'id' => 1931,
                'degree_value' => '4',
                'court_value' => '334',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            111 => 
            array (
                'id' => 1932,
                'degree_value' => '4',
                'court_value' => '334',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            112 => 
            array (
                'id' => 1933,
                'degree_value' => '4',
                'court_value' => '334',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            113 => 
            array (
                'id' => 1934,
                'degree_value' => '4',
                'court_value' => '339',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            114 => 
            array (
                'id' => 1935,
                'degree_value' => '4',
                'court_value' => '339',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            115 => 
            array (
                'id' => 1936,
                'degree_value' => '4',
                'court_value' => '346',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            116 => 
            array (
                'id' => 1937,
                'degree_value' => '4',
                'court_value' => '346',
                'case_type_name' => 'تجارى',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            117 => 
            array (
                'id' => 1938,
                'degree_value' => '4',
                'court_value' => '346',
                'case_type_name' => 'مدنى حكومه',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            118 => 
            array (
                'id' => 1939,
                'degree_value' => '4',
                'court_value' => '346',
                'case_type_name' => 'مستعجل حكومه',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            119 => 
            array (
                'id' => 1940,
                'degree_value' => '4',
                'court_value' => '346',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            120 => 
            array (
                'id' => 1941,
                'degree_value' => '4',
                'court_value' => '346',
                'case_type_name' => 'مستعجل اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            121 => 
            array (
                'id' => 1942,
                'degree_value' => '4',
                'court_value' => '349',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            122 => 
            array (
                'id' => 1943,
                'degree_value' => '4',
                'court_value' => '349',
                'case_type_name' => 'مستعجل حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            123 => 
            array (
                'id' => 1944,
                'degree_value' => '4',
                'court_value' => '349',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            124 => 
            array (
                'id' => 1945,
                'degree_value' => '4',
                'court_value' => '349',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            125 => 
            array (
                'id' => 1946,
                'degree_value' => '4',
                'court_value' => '349',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            126 => 
            array (
                'id' => 1947,
                'degree_value' => '4',
                'court_value' => '349',
                'case_type_name' => 'اشكال تنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            127 => 
            array (
                'id' => 1948,
                'degree_value' => '4',
                'court_value' => '350',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            128 => 
            array (
                'id' => 1949,
                'degree_value' => '4',
                'court_value' => '350',
                'case_type_name' => 'مدنى حكومه',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            129 => 
            array (
                'id' => 1950,
                'degree_value' => '4',
                'court_value' => '350',
                'case_type_name' => 'مساكن',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            130 => 
            array (
                'id' => 1951,
                'degree_value' => '4',
                'court_value' => '350',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            131 => 
            array (
                'id' => 1952,
                'degree_value' => '4',
                'court_value' => '350',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            132 => 
            array (
                'id' => 1953,
                'degree_value' => '4',
                'court_value' => '350',
                'case_type_name' => 'مدنى مستأنف مستعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            133 => 
            array (
                'id' => 1954,
                'degree_value' => '4',
                'court_value' => '350',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            134 => 
            array (
                'id' => 1955,
                'degree_value' => '4',
                'court_value' => '350',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            135 => 
            array (
                'id' => 1956,
                'degree_value' => '4',
                'court_value' => '350',
                'case_type_name' => 'قيم',
                'case_type_value' => '12',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            136 => 
            array (
                'id' => 1957,
                'degree_value' => '4',
                'court_value' => '352',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            137 => 
            array (
                'id' => 1958,
                'degree_value' => '4',
                'court_value' => '352',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            138 => 
            array (
                'id' => 1959,
                'degree_value' => '4',
                'court_value' => '352',
                'case_type_name' => 'مدنى مستعجل حكومة',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            139 => 
            array (
                'id' => 1960,
                'degree_value' => '4',
                'court_value' => '352',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            140 => 
            array (
                'id' => 1961,
                'degree_value' => '4',
                'court_value' => '352',
                'case_type_name' => 'مستعجل واشكالات',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            141 => 
            array (
                'id' => 1962,
                'degree_value' => '4',
                'court_value' => '361',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            142 => 
            array (
                'id' => 1963,
                'degree_value' => '4',
                'court_value' => '361',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            143 => 
            array (
                'id' => 1964,
                'degree_value' => '4',
                'court_value' => '361',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            144 => 
            array (
                'id' => 1965,
                'degree_value' => '4',
                'court_value' => '361',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            145 => 
            array (
                'id' => 1966,
                'degree_value' => '4',
                'court_value' => '361',
                'case_type_name' => 'اشكال',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            146 => 
            array (
                'id' => 1967,
                'degree_value' => '4',
                'court_value' => '361',
                'case_type_name' => 'بيوع',
                'case_type_value' => '14',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            147 => 
            array (
                'id' => 1968,
                'degree_value' => '4',
                'court_value' => '361',
                'case_type_name' => 'بيئة',
                'case_type_value' => '19',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            148 => 
            array (
                'id' => 1969,
                'degree_value' => '4',
                'court_value' => '365',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            149 => 
            array (
                'id' => 1970,
                'degree_value' => '4',
                'court_value' => '365',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            150 => 
            array (
                'id' => 1971,
                'degree_value' => '4',
                'court_value' => '365',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            151 => 
            array (
                'id' => 1972,
                'degree_value' => '4',
                'court_value' => '366',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            152 => 
            array (
                'id' => 1973,
                'degree_value' => '4',
                'court_value' => '366',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            153 => 
            array (
                'id' => 1974,
                'degree_value' => '4',
                'court_value' => '366',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            154 => 
            array (
                'id' => 1975,
                'degree_value' => '4',
                'court_value' => '376',
                'case_type_name' => 'مدنى كلى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            155 => 
            array (
                'id' => 1976,
                'degree_value' => '4',
                'court_value' => '376',
                'case_type_name' => 'مدنى حكومة',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            156 => 
            array (
                'id' => 1977,
                'degree_value' => '4',
                'court_value' => '376',
                'case_type_name' => 'ايجارات',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            157 => 
            array (
                'id' => 1978,
                'degree_value' => '4',
                'court_value' => '376',
                'case_type_name' => 'تعويضات',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            158 => 
            array (
                'id' => 1979,
                'degree_value' => '4',
                'court_value' => '376',
                'case_type_name' => 'مدنى مستأنف',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            159 => 
            array (
                'id' => 1980,
                'degree_value' => '4',
                'court_value' => '376',
                'case_type_name' => 'مستأنف متسعجل',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            160 => 
            array (
                'id' => 1981,
                'degree_value' => '4',
                'court_value' => '376',
                'case_type_name' => 'ضرائب',
                'case_type_value' => '7',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            161 => 
            array (
                'id' => 1982,
                'degree_value' => '4',
                'court_value' => '376',
                'case_type_name' => 'تجارى',
                'case_type_value' => '8',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            162 => 
            array (
                'id' => 1983,
                'degree_value' => '4',
                'court_value' => '376',
                'case_type_name' => 'اشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            163 => 
            array (
                'id' => 1984,
                'degree_value' => '4',
                'court_value' => '376',
                'case_type_name' => 'عمال',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            164 => 
            array (
                'id' => 1985,
                'degree_value' => '4',
                'court_value' => '407',
                'case_type_name' => 'مدنى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            165 => 
            array (
                'id' => 1986,
                'degree_value' => '4',
                'court_value' => '407',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            166 => 
            array (
                'id' => 1987,
                'degree_value' => '4',
                'court_value' => '407',
                'case_type_name' => 'معافاه',
                'case_type_value' => '6',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            167 => 
            array (
                'id' => 1988,
                'degree_value' => '4',
                'court_value' => '508',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            168 => 
            array (
                'id' => 1989,
                'degree_value' => '4',
                'court_value' => '508',
                'case_type_name' => 'مدنى حكومه',
                'case_type_value' => '2',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            169 => 
            array (
                'id' => 1990,
                'degree_value' => '4',
                'court_value' => '508',
                'case_type_name' => 'مستعجل حكومه',
                'case_type_value' => '3',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            170 => 
            array (
                'id' => 1991,
                'degree_value' => '4',
                'court_value' => '508',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            171 => 
            array (
                'id' => 1992,
                'degree_value' => '4',
                'court_value' => '508',
                'case_type_name' => 'مستعجل واشكالات وتنفيذ',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            172 => 
            array (
                'id' => 1993,
                'degree_value' => '4',
                'court_value' => '510',
                'case_type_name' => 'مدنى جزئى',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            173 => 
            array (
                'id' => 1994,
                'degree_value' => '4',
                'court_value' => '510',
                'case_type_name' => 'مستعجل',
                'case_type_value' => '4',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            174 => 
            array (
                'id' => 1995,
                'degree_value' => '4',
                'court_value' => '510',
                'case_type_name' => 'صحة توقيع',
                'case_type_value' => '5',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            175 => 
            array (
                'id' => 1996,
                'degree_value' => '4',
                'court_value' => '510',
                'case_type_name' => 'اشكالات مستعجل',
                'case_type_value' => '9',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            176 => 
            array (
                'id' => 1997,
                'degree_value' => '4',
                'court_value' => '510',
                'case_type_name' => 'طعون وتظلمات',
                'case_type_value' => '10',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            177 => 
            array (
                'id' => 1998,
                'degree_value' => '4',
                'court_value' => '516',
                'case_type_name' => 'جنح مستأنف',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            178 => 
            array (
                'id' => 1999,
                'degree_value' => '4',
                'court_value' => '518',
                'case_type_name' => 'جنح',
                'case_type_value' => '1',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));
        
        
    }
}