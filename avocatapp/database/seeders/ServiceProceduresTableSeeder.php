<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceProceduresTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        DB::table('service_procedures')->delete();
        
        DB::table('service_procedures')->insert(array (
            0 => 
            array (
                'id' => 1,
                'service_id' => 3,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'الامن العام',
                'procedure_place_type_id' => NULL,
                
                'job' => 'الكشف امنياً وتنقيه الشبكة من الاحكام',
                
                'result' => 'لايوجد قضايا جديده',
                'status' => 'تمت',
                'date_start' => '2018-02-17',
                'date_end' => '2018-02-17',
                'cost1' => '100.00',
                'cost2' => '150.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'service_id' => 3,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'قسم اول المنصوره',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام امني',
                
                'result' => 'الحصرين رقم 3042 لسنه 2011 وحصر رقم 16349 لسنه 2013 مقفولين',
                'status' => 'تمت',
                'date_start' => '2018-11-10',
                'date_end' => '2018-11-10',
                'cost1' => '100.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'service_id' => 3,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'كشف احكام',
                
                'result' => 'تم تسويه جميع القضايا',
                'status' => 'تمت',
                'date_start' => '2018-06-24',
                'date_end' => '2018-06-24',
                'cost1' => '0.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'service_id' => 3,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استكمال اجراءات فيش',
                
                'result' => 'تم عمل فيش جنائي',
                'status' => 'تمت',
                'date_start' => '2018-11-11',
                'date_end' => '2018-11-11',
                'cost1' => '100.00',
                'cost2' => '500.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 5,
                'service_id' => 3,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه استكمال اجراءات الفيش الجنائي',
                
                'result' => 'ماازال يتم استكماله',
                'status' => 'تمت',
                'date_start' => '2018-11-12',
                'date_end' => '2018-11-12',
                'cost1' => '100.00',
                'cost2' => '100.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            5 => 
            array (
                'id' => 6,
                'service_id' => 3,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استكمال  الفيش',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2018-12-25',
                'date_end' => '2018-12-25',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            6 => 
            array (
                'id' => 7,
                'service_id' => 3,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'جنح تان المنصوره',
                'procedure_place_type_id' => NULL,
                
                'job' => 'كشف امني',
                
                'result' => 'القضيه بناء بدون ترخيص حكمها سنه وكفاله 1000 جنيه والازاله والايقتف لعقوبه الحبس والتأييد فيما عدا ذلك',
                'status' => 'تمت',
                'date_start' => '2019-02-11',
                'date_end' => '2019-02-11',
                'cost1' => '100.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            7 => 
            array (
                'id' => 8,
                'service_id' => 3,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'النيابه الكليه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام',
                
            'result' => 'الجنحه رقم 23651لسنه 2007 جنح س تان المتهم فيها مصطفي عمار -عبدالله ابراهيم عبد الله المخالفه اقامه مباني بدون ترخيص من الجهه المختصه بشئون التنظيم وقام بزياده الارتفاع الكلي للمبني عن الحد الاقصي المقرر الحكم غ/سنه مع الشغل وك 1000 جنيه والازاله +م عارض لجلسهخ 26/5/2007 المتهمان بتوكيل الحكم تأييد والايقاف لعقوبه الحبس والتأييد فيما عدا ذلك وبجلسه 19/7/2007 ح/قبول وتعديل القضاء مجددا ببراءه المتهم التاني فيما سند اليه من اتهام ورفض استئناف المتهم الاول موضوعا وتأييد الحكم المستأنف +م(رفع وكيل المتهم الاول نقض برقم 9320 في 11/9/2007 وبجلسه 21/11/2011 قبول وانقض واعاده في الطعن رقم الطعن 41695 لسنه 77 ق وبجلسه 19/6/2012 غ/قبول ورفض وتأييد +المصاريف حصر 7938 لسنه 2012 عارض لجلسه 9/10/2012 ح ت /قبول ورفض وتأييد +المصاريف حصر غرامات 2421 لسنه 2012 مطالبه 368 لسنه 2102 -2013 (تم سداد مبلغ 15 جنيها مصاريف بالقسيمه رقم 956911/18/10/2012)',
                'status' => 'تمت',
                'date_start' => '2019-02-11',
                'date_end' => '2019-02-11',
                'cost1' => '100.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            8 => 
            array (
                'id' => 9,
                'service_id' => 3,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'الجنح المستأنفه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استخراج شهادات',
                
                'result' => 'تم استخراج عدد 4 شهادات من واقع جدول الجنح المستأنفه في الجنحه رقم 23651 لسنه 2007 جنح س تان',
                'status' => 'تمت',
                'date_start' => '2019-02-12',
                'date_end' => '2019-02-12',
                'cost1' => '100.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            9 => 
            array (
                'id' => 10,
                'service_id' => 3,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مديريه امن الدقهليه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'تنزيل حكم',
                
                'result' => 'تم تسليم شهاده جدول للتنفيذ في الجنحه رقم 901 لسنه 2016والمستأنفه برقم 6206لسنه 2017',
                'status' => 'تمت',
                'date_start' => '2019-07-15',
                'date_end' => '2019-07-15',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            10 => 
            array (
                'id' => 11,
                'service_id' => 3,
                'title' => NULL,
                'lawyer_id' => 2,
                
                'procedure_place_name' => 'مستانف اول',
                'procedure_place_type_id' => NULL,
                
                'job' => 'اطلاع',
                
                'result' => 'الجنحه رقم 5149 لسنه 2019 جنح اول المستانفه برقم 51378 لسنه 2019 غرامه 1/ من قيمه الاعمال 51910الف جلسه 8/12/2019 رقم الحصر 13471 لسنه 2019 الجنحه باسم مصطفي عمار وعبد الرحمن',
                'status' => 'تمت',
                'date_start' => '2020-07-19',
                'date_end' => '2020-07-19',
                'cost1' => '0.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            11 => 
            array (
                'id' => 12,
                'service_id' => 3,
                'title' => NULL,
                'lawyer_id' => 1,
                
                'procedure_place_name' => 'جنح اول',
                'procedure_place_type_id' => NULL,
                
            'job' => 'اطلاع (ايه عبد الرازق)',
                
                'result' => 'الجنحه رقم 2672 حصر غرامات 15000 جنيه عن كل يوم من تاريخ 2/4/2018 حتي تاريخه',
                'status' => 'تمت',
                'date_start' => '2020-09-17',
                'date_end' => '2020-09-17',
                'cost1' => '0.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            12 => 
            array (
                'id' => 13,
                'service_id' => 3,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'ميت غمر',
                'procedure_place_type_id' => NULL,
                
                'job' => 'نقل مكن',
                
                'result' => 'تم نقل المكن من المكان الموجود فيه',
                'status' => 'تمت',
                'date_start' => '2020-09-09',
                'date_end' => '2020-09-09',
                'cost1' => '0.00',
                'cost2' => '100.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            13 => 
            array (
                'id' => 14,
                'service_id' => 4,
                'title' => NULL,
                'lawyer_id' => 4,
                
                'procedure_place_name' => 'مجمع البحر',
                'procedure_place_type_id' => NULL,
                
                'job' => 'اطلاع',
                
                'result' => 'توجد دعوي رقم 2185 لسنه2014 ضد ابراهيم ربيع السيد فرج صحه توقيع اول علي غقد بيع ابتدائي مؤرخ في 24/2/2014 ومشطوبه في 8/9/2014',
                'status' => 'تمت',
                'date_start' => '2021-10-23',
                'date_end' => '2021-10-23',
                'cost1' => '0.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            14 => 
            array (
                'id' => 15,
                'service_id' => 4,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'حي شرق',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام',
                
                'result' => 'تم الذهاب لمقابله ا/السعيد واخذ ورق عم علاء واخذ رقمي ويلزم متابعه معه غدا من اجل الغرامه',
                'status' => 'تمت',
                'date_start' => '2022-08-30',
                'date_end' => '2022-08-30',
                'cost1' => '0.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            15 => 
            array (
                'id' => 16,
                'service_id' => 4,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'حي شرق',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'تم عمل طلب وتم تخفيض الغرامه لمبلغ 2500 جنيه',
                'status' => 'تمت',
                'date_start' => '2022-08-31',
                'date_end' => '2022-08-31',
                'cost1' => '0.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            16 => 
            array (
                'id' => 17,
                'service_id' => 4,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'حي شرق',
                'procedure_place_type_id' => NULL,
                
                'job' => 'سداد الغرامه',
                
                'result' => 'يلزم الذهاب يوم الاحد لسداد الغرامه',
                'status' => 'تمت',
                'date_start' => '2022-09-06',
                'date_end' => '2022-09-06',
                'cost1' => '0.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            17 => 
            array (
                'id' => 18,
                'service_id' => 4,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'حي شرق',
                'procedure_place_type_id' => NULL,
                
                'job' => 'سداد غرامه',
                
                'result' => 'تم سداد مبلغ 2500 جنيه وتم استخراج افاده بذلك',
                'status' => 'تمت',
                'date_start' => '2022-09-11',
                'date_end' => '2022-09-11',
                'cost1' => '0.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            18 => 
            array (
                'id' => 19,
                'service_id' => 4,
                'title' => NULL,
                'lawyer_id' => 4,
                
            'procedure_place_name' => 'السجل المدني (الايرادات)',
                'procedure_place_type_id' => NULL,
                
                'job' => 'قيدميلاد',
                
                'result' => 'لم يتم استلام قيد ميلاد فردي لابد من وجود توكيل خاص بالاحوال المدنيه او توكيل عام يذكر في الاحوال المدنيه وصوره من البطاقه الشخصيه ساريه ووجود الشخص نفسه او الوكيل الاصيل لاينفع وكيل وكيل',
                'status' => 'تمت',
                'date_start' => '2022-12-27',
                'date_end' => '2022-12-27',
                'cost1' => '0.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            19 => 
            array (
                'id' => 20,
                'service_id' => 5,
                'title' => NULL,
                'lawyer_id' => 4,
                
                'procedure_place_name' => 'التامينات الاجتماعية',
                'procedure_place_type_id' => NULL,
                
                'job' => 'اخراج العمال من الورشة',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2017-03-17',
                'date_end' => '2017-03-31',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            20 => 
            array (
                'id' => 21,
                'service_id' => 5,
                'title' => NULL,
                'lawyer_id' => 4,
                
                'procedure_place_name' => 'التامينات الاجتماعيه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
            'result' => 'المنشأه رقم 598/86 رقم التسويه الخاص بها 289 المنشأه باسم ورثه الحاج حمدي عبد الحميد محمد ولم تورث حتي تاريخه مبلغ الربط 388 مبلغ الرصيدعلي المنشأه 4246 التقارير قامت بها لجنه تفتيش التامينات بتاريخ 17/3/2011 -22/12/2011 اخر تقرير 8/12/2015 وتم عمل استماره 6لعامل كان مقيد علي المنشأه ولكن تم الغاؤها لان الحاج ماضي لم يكن من حقه التوقيع علي الاستماره اما اسماء المربوطين علي المنشاه في8/12/2015 ماضي ابراهيم عوض-احمد موسي محمد-احمد ابوعليه-اما العمال الخاليين هما احمد موسي احمد(المطلوب ايقا ف ربط العمال الموجوده علي قيد المنشأه -تعديل المدير المسؤل بعد وفاه صاحب العمل (توريث المنشأه وجاري متابعتها بعد 20 يوم)',
                'status' => 'تمت',
                'date_start' => '2018-07-09',
                'date_end' => '2018-07-09',
                'cost1' => '100.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            21 => 
            array (
                'id' => 22,
                'service_id' => 5,
                'title' => NULL,
                'lawyer_id' => 4,
                
                'procedure_place_name' => 'التامينات',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2018-07-30',
                'date_end' => '2018-07-30',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            22 => 
            array (
                'id' => 23,
                'service_id' => 6,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'السنبلاوين',
                'procedure_place_type_id' => NULL,
                
                'job' => 'null',
                
                'result' => 'تم الاستعلام بتحويل الخطاب الي مركز السنبلاوين',
                'status' => 'تمت',
                'date_start' => '2017-06-05',
                'date_end' => '2017-06-05',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            23 => 
            array (
                'id' => 24,
                'service_id' => 6,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'السنبلاوين',
                'procedure_place_type_id' => NULL,
                
                'job' => 'الاستعلام عن ميعاد التنفيذ',
                
                'result' => 'لم يتم تصوير الجواب',
                'status' => 'تمت',
                'date_start' => '2017-06-08',
                'date_end' => '2017-06-12',
                'cost1' => '110.00',
                'cost2' => '16.00',
                'cost3' => '50.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            24 => 
            array (
                'id' => 25,
                'service_id' => 6,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'قسم النبلاوين',
                'procedure_place_type_id' => NULL,
                
                'job' => 'تم الاستعلام',
                
                'result' => 'لم يرد القرار',
                'status' => 'تمت',
                'date_start' => '2017-07-07',
                'date_end' => '2017-07-07',
                'cost1' => '100.00',
                'cost2' => '100.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            25 => 
            array (
                'id' => 26,
                'service_id' => 6,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مركز السنبلاوين',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام',
                
                'result' => 'السؤال بعد اسبوع',
                'status' => 'تمت',
                'date_start' => '2017-07-08',
                'date_end' => '2017-07-08',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            26 => 
            array (
                'id' => 27,
                'service_id' => 6,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2017-07-23',
                'date_end' => '2017-07-23',
                'cost1' => '100.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            27 => 
            array (
                'id' => 28,
                'service_id' => 6,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'السنبلاوين',
                'procedure_place_type_id' => NULL,
                
                'job' => 'تم الاستعلام',
                
                'result' => 'الذهاب يوم الاحد القادم',
                'status' => 'تمت',
                'date_start' => '2017-07-29',
                'date_end' => '2017-07-29',
                'cost1' => '100.00',
                'cost2' => '42.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            28 => 
            array (
                'id' => 29,
                'service_id' => 6,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'السنبلاوين',
                'procedure_place_type_id' => NULL,
                
                'job' => 'السنلاوين',
                
            'result' => 'تصوير مستندات(استاذ حسام)',
                'status' => 'تمت',
                'date_start' => '2017-07-30',
                'date_end' => '2017-07-30',
                'cost1' => '100.00',
                'cost2' => '100.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            29 => 
            array (
                'id' => 30,
                'service_id' => 6,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'السنبلاوين',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام',
                
                'result' => 'السؤال بعد 4ايام',
                'status' => 'تمت',
                'date_start' => '2017-08-07',
                'date_end' => '2017-08-07',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '30.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            30 => 
            array (
                'id' => 31,
                'service_id' => 6,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'السنبلاوين',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام',
                
                'result' => 'السؤال يوم الاتنين القادم',
                'status' => 'تمت',
                'date_start' => '2017-09-05',
                'date_end' => '2017-09-05',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            31 => 
            array (
                'id' => 32,
                'service_id' => 7,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'شهادة برتستو',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2017-05-04',
                'date_end' => '2017-05-05',
                'cost1' => '0.00',
                'cost2' => '30.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            32 => 
            array (
                'id' => 33,
                'service_id' => 7,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'شهادة عدم افلاس',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2017-05-05',
                'date_end' => '2017-05-07',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            33 => 
            array (
                'id' => 34,
                'service_id' => 8,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'جنح السنبلاوين',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استخراج صوره رسميه من الحكم',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2017-06-06',
                'date_end' => '2017-06-07',
                'cost1' => '0.00',
                'cost2' => '30.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            34 => 
            array (
                'id' => 35,
                'service_id' => 9,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'محكمة السنبلاوين',
                'procedure_place_type_id' => NULL,
                
                'job' => 'صورة رسمية من القضية',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2017-06-07',
                'date_end' => '2017-06-13',
                'cost1' => '0.00',
                'cost2' => '30.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            35 => 
            array (
                'id' => 36,
                'service_id' => 10,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'اداري السنبلاوين',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استخراج صوره من المحضر',
                
                'result' => 'تم استخراج صورتين رسمين من المحضر',
                'status' => 'تمت',
                'date_start' => '2017-06-06',
                'date_end' => '2017-06-18',
                'cost1' => '100.00',
                'cost2' => '30.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            36 => 
            array (
                'id' => 37,
                'service_id' => 11,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مركز شرطه طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام',
                
                'result' => 'تم التوجه الي مركز شرطه طلخا للسؤال عن المحضر رقم 54/110 احوال مركز طلخا بتاريخ 13/2/2019 وجد ان الشاكي هو عبد الوهاب علي عبد الوهاب ضد اكرم محمد عبد الفتاح وناريمان احمد فؤاد غنام -محمد حسام احمد فؤاد والنزاع علي قطعه ارض رقم 58 بتقسيم غنام بطلخا وسوف يرسل المحضر الي قسم اول مدينه نصر للتحري عن محل اقامه كلا من ناريمان احمد فؤاد غنام -محمد حسام احمد فؤاد ونظرا لان محل اقامتهم بالقاهره قد قدم الشاكي وكيلا عنه ا/ابراهيم زيدان المحامي بتحرير محضر أخر بتاريخ 16/2/2019 برقم 25/195 احوال مركز طلخا لسماع اقوال الشهود وقد حضر الشهود الي ديوان الي ديوان المركز وادلوا بشهادتهم وهم عبد الله علي عبد الله علي البيومي اخصائي شئون فنيه بشركه وسط جار لكلا من الشاكي والمشكو في حقه بقطعه ارض خاصه به-حسن رمضان حسن ابرهيم دبلوم تجاره وهو يمتلك محل مجاور لكلا من الشاكي والمشكو في حقه والاستعلام عن المحضر بعد اسبوعين لحين وروده من استيفا مدينه نصر',
                'status' => 'تمت',
                'date_start' => '2019-02-20',
                'date_end' => '2019-02-20',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            37 => 
            array (
                'id' => 38,
                'service_id' => 11,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'تصوير',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2019-02-24',
                'date_end' => '2019-02-24',
                'cost1' => '100.00',
                'cost2' => '600.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            38 => 
            array (
                'id' => 39,
                'service_id' => 11,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
            'result' => 'المحضر رقم 110/54 احوال مركز طلخا تم تصديره الي قسم اول مدينه نصر اول في 16/2/2019 وتم ارفاق المحضر رقم 25/195 احوال مركز طلخا (محضر سماع الشهود) وارد علي المحضر سوف يأتي بعد شهر من تاريخ التصدير وسوف يأتي بعد شهر من تاريخ التصدير وجاري متابعته',
                'status' => 'تمت',
                'date_start' => '2019-03-10',
                'date_end' => '2019-03-10',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            39 => 
            array (
                'id' => 40,
                'service_id' => 11,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'قسم شرطه طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'المحضر رقم110/54 احوال مركز طلخا وكذلك المحضر رقم 25/195 احوال مركز طلخا تم تصديرهم برقم 422 في 16/2/2019 الي قسم اول مدينه نصر وحتي الان لم يتم الرد عليهم او ارسالهم رد اخر الي مركز شرطه طلخا وجاري المتابعه الاسبوع القادم',
                'status' => 'تمت',
                'date_start' => '2019-03-28',
                'date_end' => '2019-03-28',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            40 => 
            array (
                'id' => 41,
                'service_id' => 11,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'قسم شرطه طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'المحضر رقم 54/110 احوال والمحضر رقم 25/195 احوال لم يعود حتي تاريخه من قسم اول مدينه نصر وجاري متابعته',
                'status' => 'تمت',
                'date_start' => '2019-03-25',
                'date_end' => '2019-03-25',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            41 => 
            array (
                'id' => 42,
                'service_id' => 11,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مركز شرطه طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'المحضررقم 54/110 احوال طلخا وكذلك المحضر رقم 195/25 احوال مركز طلخا مازال في قسم مدينه نصر ولم يأتي بوارد القسم هذا الاسبوع وجاري متابعته يوم الاحد',
                'status' => 'تمت',
                'date_start' => '2019-04-02',
                'date_end' => '2019-04-02',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            42 => 
            array (
                'id' => 43,
                'service_id' => 11,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مركز شرطه طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'تصوير -متابعه',
                
                'result' => 'تم تصوير المحضر رقم 54/110 احوال طلخا وكذلك محضر سماع الشهود 25/195 احوال طلخاوسوف يتم تصديرالمحضر مره اخري الي قسم اول مدينه نصر حيث انه عادلتحديد عنوان المشكو في حقه ومعرفه الرقم الصادر الجديد الي قسم اول مدينه نصر',
                'status' => 'تمت',
                'date_start' => '2019-07-10',
                'date_end' => '2019-07-10',
                'cost1' => '100.00',
                'cost2' => '150.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            43 => 
            array (
                'id' => 44,
                'service_id' => 11,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مركز شرطه طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'المحضر رقم 54/110 ومحضر سماع اقوال الشهود رقم 25/195 احوال طلخا تم تصديره الي قسم اول مدينه نصر بتاريخ الغد17/7/2019 برقم 1688',
                'status' => 'تمت',
                'date_start' => '2019-07-16',
                'date_end' => '2019-07-16',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            44 => 
            array (
                'id' => 45,
                'service_id' => 11,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'قسم شرطه طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'مطلوب الذهاب الاسبوع القادم للاطلاع',
                'status' => 'تمت',
                'date_start' => '2019-09-02',
                'date_end' => '2019-09-02',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            45 => 
            array (
                'id' => 46,
                'service_id' => 11,
                'title' => NULL,
                'lawyer_id' => 2,
                
                'procedure_place_name' => 'مركز طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => '110/54-195/25 احوال طلخا لم يتم ارساله حتي تاريخه من قسم مدينه نصر',
                'status' => 'تمت',
                'date_start' => '2019-11-20',
                'date_end' => '2019-11-20',
                'cost1' => '100.00',
                'cost2' => '30.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            46 => 
            array (
                'id' => 47,
                'service_id' => 11,
                'title' => NULL,
                'lawyer_id' => 2,
                
                'procedure_place_name' => 'مركز طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه المحضر',
                
                'result' => 'تم البحث في الوارد من مدينه نصر ووجد ان المحضر لم يات في الوارد حيث انه تم ارفاقه من قبل والمتابعه من قسم مدينه نصر',
                'status' => 'تمت',
                'date_start' => '2020-01-29',
                'date_end' => '2020-01-29',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            47 => 
            array (
                'id' => 48,
                'service_id' => 11,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2022-01-05',
                'date_end' => '2022-01-05',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            48 => 
            array (
                'id' => 49,
                'service_id' => 13,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'قسم اول المنصورة',
                'procedure_place_type_id' => NULL,
                
                'job' => 'تم عمل المحضر',
                
                'result' => 'تم تحرير المحضر',
                'status' => 'تمت',
                'date_start' => '2017-03-28',
                'date_end' => '2017-03-28',
                'cost1' => '0.00',
                'cost2' => '500.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            49 => 
            array (
                'id' => 50,
                'service_id' => 13,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'اداري اول',
                'procedure_place_type_id' => NULL,
                
                'job' => 'تصوير المحضر',
                
                'result' => 'تم التصوير',
                'status' => 'تمت',
                'date_start' => '2017-05-03',
                'date_end' => '2017-05-03',
                'cost1' => '0.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            50 => 
            array (
                'id' => 51,
                'service_id' => 14,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'ثان المنصورة',
                'procedure_place_type_id' => NULL,
                
                'job' => 'الاستعلام عن تنفيذ الاحكام كابتن هانى',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2017-07-09',
                'date_end' => '2017-07-10',
                'cost1' => '0.00',
                'cost2' => '70.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            51 => 
            array (
                'id' => 52,
                'service_id' => 14,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'بلقاس',
                'procedure_place_type_id' => NULL,
                
                'job' => 'شهادات جدول من بلقاس برقم 2326-2327',
                
                'result' => 'اسم الموكل غلط لابد من تصحيحه لعمل الشهادات',
                'status' => 'تمت',
                'date_start' => '2018-01-24',
                'date_end' => '2018-01-24',
                'cost1' => '0.00',
                'cost2' => '60.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            52 => 
            array (
                'id' => 53,
                'service_id' => 15,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'تنفيذ الاحكام',
                'procedure_place_type_id' => NULL,
                
                'job' => 'تنزيل احكام',
                
                'result' => 'لم نتمكن من تنفيذ الاجراء لعدم وجود الظابط المختص',
                'status' => 'تمت',
                'date_start' => '2019-08-17',
                'date_end' => '2019-08-17',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            53 => 
            array (
                'id' => 54,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مديرية المساحة بالمجزر',
                'procedure_place_type_id' => NULL,
                
                'job' => 'مطلوب تحديد ميعاد لكشف التحديد',
                
                'result' => 'تم تحديد ميعاد كشف التحديد يوم 27/4/2017',
                'status' => 'تمت',
                'date_start' => '2017-04-04',
                'date_end' => '2017-04-04',
                'cost1' => '0.00',
                'cost2' => '200.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            54 => 
            array (
                'id' => 55,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'كشف تحديد',
                
                'result' => 'تم كشف التحديد',
                'status' => 'تمت',
                'date_start' => '2017-04-27',
                'date_end' => '2017-04-27',
                'cost1' => '0.00',
                'cost2' => '400.00',
                'cost3' => '30.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            55 => 
            array (
                'id' => 56,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'null',
                
                'result' => 'مصاريف كشف تحديد',
                'status' => 'تمت',
                'date_start' => '2017-06-09',
                'date_end' => '2017-06-09',
                'cost1' => '100.00',
                'cost2' => '100.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            56 => 
            array (
                'id' => 57,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'المساحه رقم الصادر',
                
                'result' => '3225في 20/8/2017',
                'status' => 'تمت',
                'date_start' => '2017-07-13',
                'date_end' => '2017-07-11',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            57 => 
            array (
                'id' => 58,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'null',
                
                'result' => '1000 احمد عبدالله',
                'status' => 'تمت',
                'date_start' => '2017-06-22',
                'date_end' => '2017-06-22',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            58 => 
            array (
                'id' => 59,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'null',
                
                'result' => 'معاينه الخدمه الاداريه',
                'status' => 'تمت',
                'date_start' => '2017-07-09',
                'date_end' => '2017-07-09',
                'cost1' => '100.00',
                'cost2' => '200.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            59 => 
            array (
                'id' => 60,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مكتب المساحه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'المساحه',
                
                'result' => 'تم تقديم التماس',
                'status' => 'تمت',
                'date_start' => '2017-07-30',
                'date_end' => '2017-07-30',
                'cost1' => '135.00',
                'cost2' => '42.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            60 => 
            array (
                'id' => 61,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'المساحه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'null',
                
                'result' => 'تم عمل معاينه',
                'status' => 'تمت',
                'date_start' => '2017-08-08',
                'date_end' => '2017-08-08',
                'cost1' => '100.00',
                'cost2' => '42.00',
                'cost3' => '200.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            61 => 
            array (
                'id' => 62,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مكتب المساحه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام عن طلب الالتماس ورقم الصادر',
                
                'result' => 'السؤال بعد اسبوع',
                'status' => 'تمت',
                'date_start' => '2017-08-14',
                'date_end' => '2017-08-14',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            62 => 
            array (
                'id' => 63,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'المساحه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام',
                
                'result' => 'تم تقديم الالتماس والسؤال بعد اسبوع',
                'status' => 'تمت',
                'date_start' => '2017-09-17',
                'date_end' => '2017-09-17',
                'cost1' => '125.00',
                'cost2' => '55.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            63 => 
            array (
                'id' => 64,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مكتب المساحه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'السؤال  بعد 15 يوم',
                'status' => 'تمت',
                'date_start' => '2017-10-02',
                'date_end' => '2017-10-02',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            64 => 
            array (
                'id' => 65,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مكتب المساحه المجزر -مكتب مساحه المحافظه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'السؤال في مكتب مساحه المحافظه بعد اسبوع',
                'status' => 'تمت',
                'date_start' => '2017-10-18',
                'date_end' => '2017-10-18',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            65 => 
            array (
                'id' => 66,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مكتب مساحه المحافظه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'بعديومين',
                'status' => 'تمت',
                'date_start' => '2017-10-28',
                'date_end' => '2017-10-28',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            66 => 
            array (
                'id' => 67,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مكتب المساحه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
            'result' => 'تسليم بالبريد يوم الخميس مكتب المساحه بالمجزر (اسلام)',
                'status' => 'تمت',
                'date_start' => '2017-10-30',
                'date_end' => '2017-10-30',
                'cost1' => '100.00',
                'cost2' => '47.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            67 => 
            array (
                'id' => 68,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مكتب المساحه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام عن الطلب',
                
                'result' => 'الاستلام بعداسبوع 176 في 16/11/2017',
                'status' => 'تمت',
                'date_start' => '2017-11-15',
                'date_end' => '2017-11-15',
                'cost1' => '100.00',
                'cost2' => '46.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            68 => 
            array (
                'id' => 69,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مكتب المساحه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه الطلب',
                
                'result' => 'السؤال بعد اسبوع الطلب رقم 85',
                'status' => 'تمت',
                'date_start' => '2017-12-25',
                'date_end' => '2017-12-25',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            69 => 
            array (
                'id' => 70,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مساحه المجزر',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام',
                
            'result' => 'مطلوب الذهاب محسن دبور (مطلوب استماره 300  )استاذ شحته',
                'status' => 'تمت',
                'date_start' => '2017-12-17',
                'date_end' => '2017-12-17',
                'cost1' => '100.00',
                'cost2' => '55.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            70 => 
            array (
                'id' => 71,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'المساحه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه الطلب رقم 85',
                
                'result' => 'مطلوب طلب امتداد',
                'status' => 'تمت',
                'date_start' => '2018-01-03',
                'date_end' => '2018-01-03',
                'cost1' => '100.00',
                'cost2' => '80.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            71 => 
            array (
                'id' => 72,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'طلب امتداد لطلب رقم 85',
                
                'result' => 'الطلب 85 لسنه 2017 امتداد 42 لسنه 2018 تم الانتهاء منه في الشهر العقاري واخذ رقم652 في 10/2/2018 عند /احمد السعيد ومتابعته يوم الثلاثاء 22/5/2018',
                'status' => 'تمت',
                'date_start' => '2018-05-19',
                'date_end' => '2018-05-19',
                'cost1' => '100.00',
                'cost2' => '100.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            72 => 
            array (
                'id' => 73,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'المساحه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'كشف تحديد',
                
                'result' => 'كشف تحديد',
                'status' => 'تمت',
                'date_start' => '2018-01-16',
                'date_end' => '2018-01-16',
                'cost1' => '100.00',
                'cost2' => '350.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            73 => 
            array (
                'id' => 74,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'الشهر العقاري',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'الطلب رجع الي ا/محسن بالشهر العقاري لوضع رقم القطعه الاصليه علي الطلب وجاري متابعته',
                'status' => 'تمت',
                'date_start' => '2018-05-21',
                'date_end' => '2018-05-21',
                'cost1' => '100.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            74 => 
            array (
                'id' => 75,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'السجل العيني بالمجزر',
                'procedure_place_type_id' => NULL,
                
                'job' => 'تصوير',
                
                'result' => 'استلام صوره من كشف التحديد الخاص بالسيده الطاف نجيب لحين استلام اصل الطلب لرفع دعوي صحه نفاذ بعد كتابه رقم القطعه الاصليه علي الطلب',
                'status' => 'تمت',
                'date_start' => '2018-05-22',
                'date_end' => '2018-05-22',
                'cost1' => '100.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            75 => 
            array (
                'id' => 76,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'المساحه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'الانتهاء من الطلب بكشف التحديد والاستلام يوم الاحد القادم',
                'status' => 'تمت',
                'date_start' => '2018-06-03',
                'date_end' => '2018-06-03',
                'cost1' => '100.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            76 => 
            array (
                'id' => 77,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'السجل العيني -المساحه بالمجزر',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'الطلب 85 لسنه 2017 امتداد 42 لسنه 2018 شهر به جواب ايقاف ويتطلب عمل التماس وا/عبد الحميد هو الذي سوف يوقع عليه بشخصه غدا هام جدا',
                'status' => 'تمت',
                'date_start' => '2018-06-19',
                'date_end' => '2018-06-19',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            77 => 
            array (
                'id' => 78,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'حي شرق',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'م /رشا غير متواجده بالحي',
                'status' => 'تمت',
                'date_start' => '2021-10-27',
                'date_end' => '2021-10-27',
                'cost1' => '0.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            78 => 
            array (
                'id' => 79,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'حي شرق',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'م /رشا غير متواجده اليوم حيث ان لديها مشكله في النيابه',
                'status' => 'تمت',
                'date_start' => '2021-10-31',
                'date_end' => '2021-10-31',
                'cost1' => '0.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            79 => 
            array (
                'id' => 80,
                'service_id' => 17,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'حي شرق',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام',
                
                'result' => 'المهندسه رشا  غير موجوده',
                'status' => 'تمت',
                'date_start' => '2021-11-08',
                'date_end' => '2021-11-08',
                'cost1' => '0.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            80 => 
            array (
                'id' => 81,
                'service_id' => 19,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'شركة الكهرباء',
                'procedure_place_type_id' => NULL,
                
                'job' => 'ممارسة',
                
                'result' => 'تمت',
                'status' => 'تمت',
                'date_start' => '2017-03-13',
                'date_end' => '2017-03-13',
                'cost1' => '2050.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            81 => 
            array (
                'id' => 82,
                'service_id' => 19,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'رسم معاينه',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2017-04-15',
                'date_end' => '2017-04-15',
                'cost1' => '100.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            82 => 
            array (
                'id' => 83,
                'service_id' => 19,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'شركة الكهرباء',
                'procedure_place_type_id' => NULL,
                
                'job' => 'مقايسه',
                
                'result' => 'تمت',
                'status' => 'تمت',
                'date_start' => '2017-04-15',
                'date_end' => '2017-04-15',
                'cost1' => '16215.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            83 => 
            array (
                'id' => 84,
                'service_id' => 19,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'شركة الكهرباء',
                'procedure_place_type_id' => NULL,
                
                'job' => 'عدادات',
                
                'result' => 'تمت',
                'status' => 'تمت',
                'date_start' => '2017-04-15',
                'date_end' => '2017-04-15',
                'cost1' => '6150.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            84 => 
            array (
                'id' => 85,
                'service_id' => 19,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'شركة الكهرباء',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متوسط استهلاك',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2017-04-22',
                'date_end' => '2017-04-15',
                'cost1' => '1000.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            85 => 
            array (
                'id' => 86,
                'service_id' => 19,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'اتعاب المكتب',
                'procedure_place_type_id' => NULL,
                
                'job' => 'اتعاب المكتب',
                
                'result' => 'تمت',
                'status' => 'تمت',
                'date_start' => '2017-04-24',
                'date_end' => '2017-07-19',
                'cost1' => '0.00',
                'cost2' => '2200.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            86 => 
            array (
                'id' => 87,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مجلس مدينة طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'انذار المجلس',
                
                'result' => 'تم تقديم الانذار',
                'status' => 'تمت',
                'date_start' => '2017-07-26',
                'date_end' => '2017-07-26',
                'cost1' => '110.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            87 => 
            array (
                'id' => 88,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'محضرين طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استلام اعلان',
                
                'result' => 'انذار بعدم التعامل علي القطعه 58 تقسيم غنام',
                'status' => 'تمت',
                'date_start' => '2017-10-21',
                'date_end' => '2017-10-21',
                'cost1' => '100.00',
                'cost2' => '10.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            88 => 
            array (
                'id' => 89,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'محكمة طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'عمل الإنذار',
                
                'result' => 'تم عمل الانذار وتسليمه',
                'status' => 'تمت',
                'date_start' => '2017-12-03',
                'date_end' => '2017-12-31',
                'cost1' => '100.00',
                'cost2' => '80.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            89 => 
            array (
                'id' => 90,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'محضرين طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استلام انذار',
                
                'result' => 'تم استلام الانذار',
                'status' => 'تمت',
                'date_start' => '2018-01-13',
                'date_end' => '2018-01-13',
                'cost1' => '100.00',
                'cost2' => '35.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            90 => 
            array (
                'id' => 91,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'عمل انذار جديد',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2018-03-01',
                'date_end' => '2018-03-07',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            91 => 
            array (
                'id' => 92,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'محضرين طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استلام اعلان',
                
            'result' => 'تم استلام الاعلان بعدم التعامل (58)',
                'status' => 'تمت',
                'date_start' => '2018-03-24',
                'date_end' => '2018-03-24',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            92 => 
            array (
                'id' => 93,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'محضرين طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'اعلان',
                
                'result' => 'تم عمل اعلان بعدم التعامل علي القطعه 58',
                'status' => 'تمت',
                'date_start' => '2018-03-24',
                'date_end' => '2018-03-24',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            93 => 
            array (
                'id' => 94,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استلام انذار',
                
                'result' => 'تم استلام الانذار',
                'status' => 'تمت',
                'date_start' => '2018-04-14',
                'date_end' => '2018-04-14',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            94 => 
            array (
                'id' => 95,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'طلخا الجزئيه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'عمل انذار جديد',
                
                'result' => 'تم عدم التعامل علي الارض',
                'status' => 'تمت',
                'date_start' => '2018-04-29',
                'date_end' => '2018-04-29',
                'cost1' => '100.00',
                'cost2' => '45.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            95 => 
            array (
                'id' => 96,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'طلخا الجزئيه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استلام انذار',
                
                'result' => 'تم استلام الانذار',
                'status' => 'تمت',
                'date_start' => '2018-05-05',
                'date_end' => '2018-05-05',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            96 => 
            array (
                'id' => 97,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'محضرين طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'عمل انذار جديد',
                
                'result' => 'تم عمل انذار بعدم التعامل علي القطعه وتسليمه للمحضرين',
                'status' => 'تمت',
                'date_start' => '2018-12-22',
                'date_end' => '2018-12-22',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            97 => 
            array (
                'id' => 98,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'محضرين طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استلام الانذار',
                
                'result' => 'تم استلام الانذار بعدم التعامل علي القطعه 58 تقسيم غنام',
                'status' => 'تمت',
                'date_start' => '2019-01-09',
                'date_end' => '2019-01-09',
                'cost1' => '100.00',
                'cost2' => '16.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            98 => 
            array (
                'id' => 99,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'محضرين طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'عمل انزار',
                
                'result' => 'تم عمل الانزار',
                'status' => 'تمت',
                'date_start' => '2019-05-20',
                'date_end' => '2019-05-20',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            99 => 
            array (
                'id' => 100,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'محضرين طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استلام الانزار',
                
                'result' => 'تم استلام الانذار',
                'status' => 'تمت',
                'date_start' => '2019-05-27',
                'date_end' => '2019-05-27',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            100 => 
            array (
                'id' => 101,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'محضرين طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'عمل انذار',
                
                'result' => 'تم عمل الانذار ومطلوب استلامه',
                'status' => 'تمت',
                'date_start' => '2019-08-19',
                'date_end' => '2019-08-19',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            101 => 
            array (
                'id' => 102,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'محضرين طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استلام الانذار',
                
                'result' => 'تم استلام الانذار',
                'status' => 'تمت',
                'date_start' => '2019-09-02',
                'date_end' => '2019-09-02',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            102 => 
            array (
                'id' => 103,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'رئاسه مركز طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'اطلاع علي استخراج رخصه من عدمه',
                
                'result' => 'مطلوب الذهاب بعد اسبوع',
                'status' => 'تمت',
                'date_start' => '2020-04-14',
                'date_end' => '2020-04-14',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            103 => 
            array (
                'id' => 104,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'رئاسه مركز طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'انذار',
                
                'result' => 'تم عمل انذار وتسليمه',
                'status' => 'تمت',
                'date_start' => '2020-06-27',
                'date_end' => '2020-06-27',
                'cost1' => '100.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            104 => 
            array (
                'id' => 105,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'رئاسه مركز طلخا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'اطلاع علي استخراج رخصه',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2020-10-17',
                'date_end' => '2020-10-31',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            105 => 
            array (
                'id' => 106,
                'service_id' => 1,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استلام انذار',
                
                'result' => 'تم استلام الانذار',
                'status' => 'تمت',
                'date_start' => '2020-07-28',
                'date_end' => '2020-07-28',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            106 => 
            array (
                'id' => 107,
                'service_id' => 21,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'محضر',
                
                'result' => 'تم عمل محضربتاريخ 15/5/2017',
                'status' => 'تمت',
                'date_start' => '2017-05-09',
                'date_end' => '2017-05-09',
                'cost1' => '0.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            107 => 
            array (
                'id' => 108,
                'service_id' => 22,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'محل الزعفران لمواد البناء',
                'procedure_place_type_id' => NULL,
                
                'job' => 'شراء لوازب مياه وصرف',
                
                'result' => 'تم الشراء',
                'status' => 'تمت',
                'date_start' => '2017-06-14',
                'date_end' => '2017-06-14',
                'cost1' => '4930.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            108 => 
            array (
                'id' => 109,
                'service_id' => 22,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'شركة المياة',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استخراج ترخيص صرف',
                
                'result' => 'تم',
                'status' => 'تمت',
                'date_start' => '2017-06-16',
                'date_end' => '2017-06-16',
                'cost1' => '0.00',
                'cost2' => '1500.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            109 => 
            array (
                'id' => 110,
                'service_id' => 22,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'عمارة الزعفران',
                'procedure_place_type_id' => NULL,
                
                'job' => 'مصنعية توصيل الصرف والمياة والحفر والللاودر خارجي',
                
                'result' => 'تم',
                'status' => 'تمت',
                'date_start' => '2017-06-16',
                'date_end' => '2017-06-16',
                'cost1' => '0.00',
                'cost2' => '4500.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            110 => 
            array (
                'id' => 111,
                'service_id' => 22,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'عمارة الزعفران',
                'procedure_place_type_id' => NULL,
                
                'job' => 'شراء صرف ومياه داخلى',
                
                'result' => 'تم الشراء',
                'status' => 'تمت',
                'date_start' => '2017-06-20',
                'date_end' => '2017-06-20',
                'cost1' => '28500.00',
                'cost2' => '1500.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            111 => 
            array (
                'id' => 112,
                'service_id' => 22,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'شيل رتش +مشال',
                
                'result' => 'تم',
                'status' => 'تمت',
                'date_start' => '2017-07-03',
                'date_end' => '2017-07-03',
                'cost1' => '0.00',
                'cost2' => '520.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            112 => 
            array (
                'id' => 113,
                'service_id' => 22,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'شراء لوازم',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2017-07-13',
                'date_end' => '2017-07-13',
                'cost1' => '0.00',
                'cost2' => '5000.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            113 => 
            array (
                'id' => 114,
                'service_id' => 22,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'مصنعيه',
                
                'result' => 'تم',
                'status' => 'تمت',
                'date_start' => '2017-07-13',
                'date_end' => '2017-07-13',
                'cost1' => '0.00',
                'cost2' => '15000.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            114 => 
            array (
                'id' => 115,
                'service_id' => 22,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'شراء مستلزمات صرف ومياه',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2017-07-16',
                'date_end' => '2017-07-16',
                'cost1' => '0.00',
                'cost2' => '12135.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            115 => 
            array (
                'id' => 116,
                'service_id' => 23,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'شركة المياة',
                'procedure_place_type_id' => NULL,
                
                'job' => 'مقايسه مياه ل 7 أدوار',
                
                'result' => 'تم',
                'status' => 'تمت',
                'date_start' => '2017-06-19',
                'date_end' => '2017-06-19',
                'cost1' => '14904.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            116 => 
            array (
                'id' => 117,
                'service_id' => 23,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'شركة المياة',
                'procedure_place_type_id' => NULL,
                
                'job' => 'رسم معاينه',
                
                'result' => 'تم',
                'status' => 'تمت',
                'date_start' => '2017-06-19',
                'date_end' => '2017-06-19',
                'cost1' => '0.00',
                'cost2' => '2000.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            117 => 
            array (
                'id' => 118,
                'service_id' => 23,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'شركة المياة',
                'procedure_place_type_id' => NULL,
                
                'job' => 'مقدم أتعاب أحمد عبدالعال',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2017-06-19',
                'date_end' => '2017-06-19',
                'cost1' => '0.00',
                'cost2' => '1200.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            118 => 
            array (
                'id' => 119,
                'service_id' => 23,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'null',
                'procedure_place_type_id' => NULL,
                
                'job' => 'null',
                
                'result' => 'عدادات مياه',
                'status' => 'تمت',
                'date_start' => '2017-07-18',
                'date_end' => '2017-07-18',
                'cost1' => '100.00',
                'cost2' => '400.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            119 => 
            array (
                'id' => 120,
                'service_id' => 23,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'شركه المياه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'عدادات',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2017-09-18',
                'date_end' => '2017-09-18',
                'cost1' => '100.00',
                'cost2' => '100.00',
                'cost3' => '50.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            120 => 
            array (
                'id' => 121,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'شركه الكهربا-المياه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'التقديم علي 3عدادات مياه-كهربا',
                
            'result' => 'تم عمل طلب لعدادات المياه وجاري متابعه التأشير علي الطلب-جاري تجهيز الاوراق المطلوبه للكهربا(عقد صوري للملاك للعقار وللشقق المذكوره-2وصل كهربا من المكان-توكيل-صور البطايق )',
                'status' => 'تمت',
                'date_start' => '2018-05-12',
                'date_end' => '2018-05-12',
                'cost1' => '100.00',
                'cost2' => '150.00',
                'cost3' => '75.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            121 => 
            array (
                'id' => 122,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
            'procedure_place_name' => 'شركه المياه(السريع)',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه الطلب',
                
                'result' => 'جاري متابعه الطلب',
                'status' => 'تمت',
                'date_start' => '2018-05-13',
                'date_end' => '2018-05-13',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '35.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            122 => 
            array (
                'id' => 123,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 3,
                
                'procedure_place_name' => 'مدني قسم تان',
                'procedure_place_type_id' => NULL,
                
                'job' => 'حكم وعريضه',
                
                'result' => 'تم تصوير الحكم والعريضه',
                'status' => 'تمت',
                'date_start' => '2018-05-21',
                'date_end' => '2018-05-21',
                'cost1' => '100.00',
                'cost2' => '35.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            123 => 
            array (
                'id' => 124,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'محطه السريع',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه الطلب',
                
                'result' => 'تم الذهاب عده مرات حتي تاريخه وتم تحويله الي المفتش لارساله للجهه التابعه له محطه الجلاء ومازال في المتابعه',
                'status' => 'تمت',
                'date_start' => '2018-06-05',
                'date_end' => '2018-06-05',
                'cost1' => '0.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            124 => 
            array (
                'id' => 125,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'شركه الكهربا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'تقديم طلب العدادات',
                
                'result' => 'لم يتم لحين استخراج صحه توقيع',
                'status' => 'تمت',
                'date_start' => '2018-06-02',
                'date_end' => '2018-06-02',
                'cost1' => '0.00',
                'cost2' => '30.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            125 => 
            array (
                'id' => 126,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'السريع',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه الطلب',
                
                'result' => 'تم الموافقه علي الطلب وتم تقديمه لشركه المياه بالجلاء وتصويره 3نسخ لارفاقه بالملفات وجاري استكمال الاوراق المطلوبه',
                'status' => 'تمت',
                'date_start' => '2018-06-09',
                'date_end' => '2018-06-09',
                'cost1' => '0.00',
                'cost2' => '250.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            126 => 
            array (
                'id' => 127,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الجلاء',
                'procedure_place_type_id' => NULL,
                
                'job' => 'مطلوب رسم هندسي للشقق التلاته وتوكيل والعقد اوصحه توقيع',
                
                'result' => 'تم احضار العقد وجاري تحضير الرسم الهندسي',
                'status' => 'تمت',
                'date_start' => '2018-06-09',
                'date_end' => '2018-06-09',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            127 => 
            array (
                'id' => 128,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'حفظ تان صحه توقيع',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استخراج عدد2صوره رسميه نن عريضه الدعوي والحكم',
                
                'result' => 'تم استخراج عدد 2صوره رسميه من عريضه الدعوي والحكم رقم 4082لسنه2015',
                'status' => 'تمت',
                'date_start' => '2018-06-10',
                'date_end' => '2018-06-10',
                'cost1' => '100.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            128 => 
            array (
                'id' => 129,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الكهربا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'مطلوب اصل العقد',
                
                'result' => 'null',
                'status' => 'تمت',
                'date_start' => '2018-06-11',
                'date_end' => '2018-06-11',
                'cost1' => '0.00',
                'cost2' => '40.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            129 => 
            array (
                'id' => 130,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الكهربا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'عدادات الكهربا',
                
                'result' => 'تم التقديم علي 3عدادات وتم عمل حافظه مخالفه شروط تعاقدوتم دفع المعاينه',
                'status' => 'تمت',
                'date_start' => '2018-06-12',
                'date_end' => '2018-06-12',
                'cost1' => '1900.00',
                'cost2' => '200.00',
                'cost3' => '60.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            130 => 
            array (
                'id' => 131,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الزعفران',
                'procedure_place_type_id' => NULL,
                
                'job' => 'معاينه 12ظهرا يوم الخميس 14/6/2018',
                
                'result' => 'تم زياره الموقع المهندس المختص وجاري عمل بعض التعديلات في المدخل وتركيب مفتاح اناره وبعض التوصيلات لاتمام المعاينه الاخيره',
                'status' => 'تمت',
                'date_start' => '2018-06-13',
                'date_end' => '2018-06-13',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            131 => 
            array (
                'id' => 132,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'شركه الكهربا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'تقديم علي باقي العدادات السابع والحادي عشر',
                
                'result' => 'تم التقديم علي العدادات السابع والحادي عشر وتم ارفاقهم بالعدادات السابقه لعمل معاينه خمس ادوار',
                'status' => 'تمت',
                'date_start' => '2018-06-19',
                'date_end' => '2018-06-19',
                'cost1' => '100.00',
                'cost2' => '1210.00',
                'cost3' => '50.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            132 => 
            array (
                'id' => 133,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'المياه',
                'procedure_place_type_id' => NULL,
                
            'job' => 'تركيب العدادات(الارضي والخامس والسادس والسابع)',
                
            'result' => 'تم دفع المتاخرات للعدادات الارضي والخامس والسادس والسابع وتم استخراج جواب للسريع وتم تسليمه بشكل نهائي لتركيب العدادات وتم دفع 200 شحن العدادات وسيتم تركيبها خلال شهر من تاريخه مع المتابعه وتم عمل الطلب للدور الحادي شدعشر علي ان يتم تسليمه للشبكه للتقديم مع باقي العدادات (200 الشبكه -100 موصلات وتصوير واتعاب)',
                'status' => 'تمت',
                'date_start' => '2018-06-27',
                'date_end' => '2018-06-27',
                'cost1' => '0.00',
                'cost2' => '1500.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            133 => 
            array (
                'id' => 134,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'السريع',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه الطلب وتركيب العدادات',
                
                'result' => 'تم دفع متاخرات العدادات التنظيمي وجاري متابعه تركيبهم وكذلك تم عمل الطلب وجاري متابعته الدور الحادي عشر',
                'status' => 'تمت',
                'date_start' => '2018-07-16',
                'date_end' => '2018-06-16',
                'cost1' => '0.00',
                'cost2' => '425.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            134 => 
            array (
                'id' => 135,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'شركه الكهربا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'اجراء المعاينه',
                
                'result' => 'لم تتم حتي تاريخه لاصلاحات بالكهربا',
                'status' => 'تمت',
                'date_start' => '2018-07-05',
                'date_end' => '2018-07-05',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '45.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            135 => 
            array (
                'id' => 136,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الزعفران',
                'procedure_place_type_id' => NULL,
                
                'job' => 'لوازم الكهربا',
                
            'result' => 'تم شراء كل الاسلاك وماتم طلبه لاجراء المعاينه (فاتوره رقم 03024)بمبلغ 16650-200 الكهربائي ماسوره لطرد التيار بالخارج-150 موصلات يومين -20 عامل مشال)',
                'status' => 'تمت',
                'date_start' => '2018-07-09',
                'date_end' => '2018-07-09',
                'cost1' => '0.00',
                'cost2' => '17000.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            136 => 
            array (
                'id' => 137,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'قناه السويس',
                'procedure_place_type_id' => NULL,
                
                'job' => 'الرسم الهندسي',
                
                'result' => 'تم استلام الرسم الهندسي وجاري التقديم علي عدادات المياه التامن والتاسع والعاشر',
                'status' => 'تمت',
                'date_start' => '2018-07-08',
                'date_end' => '2018-07-08',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            137 => 
            array (
                'id' => 138,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الزعفران',
                'procedure_place_type_id' => NULL,
                
                'job' => 'لفه سلك 16ملي',
                
            'result' => 'تم شراء لفه سلك 16 ملي -عدد 4دوايه-عدد11لمبات موفره للتركيب علي السلم (فاتوره رقم 03128 بمبلغ 2000 جنيه)-وتم دفع اول دفعه لعم محمد كهربا 2000جنيه',
                'status' => 'تمت',
                'date_start' => '2018-07-15',
                'date_end' => '2018-07-15',
                'cost1' => '0.00',
                'cost2' => '4000.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            138 => 
            array (
                'id' => 139,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الزعفران',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
            'result' => '100 شحن عداد السلم (كرم)-100 تحت حساب ماسوره عند التابلوه 60موصلات',
                'status' => 'تمت',
                'date_start' => '2018-07-15',
                'date_end' => '2018-07-15',
                'cost1' => '0.00',
                'cost2' => '260.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            139 => 
            array (
                'id' => 140,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الجلاء',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'تم التقديم علي العدادات التامن والتاسع والعاشر ودفع المعاينه 50 لكل ملف وتم ارسالهم الي سوق السمك لعمل المعاينه',
                'status' => 'تمت',
                'date_start' => '2018-07-16',
                'date_end' => '2018-07-16',
                'cost1' => '0.00',
                'cost2' => '200.00',
                'cost3' => '15.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            140 => 
            array (
                'id' => 141,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الزعفران',
                'procedure_place_type_id' => NULL,
                
                'job' => 'شراء اسلاك تكميليه للدور الحادي عشر',
                
                'result' => 'تم شراء 2لفه سلك 16 ملي3670-تم استبلم العدادات 250-75موصلات السكه القديمه السريع-المكتب',
                'status' => 'تمت',
                'date_start' => '2018-07-17',
                'date_end' => '2018-07-17',
                'cost1' => '0.00',
                'cost2' => '4000.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            141 => 
            array (
                'id' => 142,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الزعفران',
                'procedure_place_type_id' => NULL,
                
                'job' => 'السباك',
                
                'result' => 'تم شراء فاتوره بمبلغ 625-325 تركيب العدادات',
                'status' => 'تمت',
                'date_start' => '2018-07-18',
                'date_end' => '2018-07-18',
                'cost1' => '0.00',
                'cost2' => '950.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            142 => 
            array (
                'id' => 143,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الزعفران',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
            'result' => 'تم دفع دفعه تانيه من حساب عم محمد 1500 متبقي 4000(1500 اسانسير 1500 من حساب الشغل 5000-1000 زياده للتابلوه وشغل الدور الحادي عشر )خارج الحساب المتفق عليه',
                'status' => 'تمت',
                'date_start' => '2018-07-19',
                'date_end' => '2018-07-19',
                'cost1' => '0.00',
                'cost2' => '1500.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            143 => 
            array (
                'id' => 144,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'السكه القديمه',
                'procedure_place_type_id' => NULL,
                
                'job' => 'تغيير 2لفه سلك 2ملي',
                
            'result' => 'تم تغييرهم بنفس حسابهم مع عدم وجود فرق(لمبات موفره للمدخل -دوايه نص لفه سلك-اسلاك توصيل(50 موصلات -15 ملف -20 حزام-20 للبنت بالمحل)',
                'status' => 'تمت',
                'date_start' => '2018-07-18',
                'date_end' => '2018-07-18',
                'cost1' => '0.00',
                'cost2' => '100.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            144 => 
            array (
                'id' => 145,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'السريع',
                'procedure_place_type_id' => NULL,
                
                'job' => 'طلب الدور الحادي عش',
                
                'result' => 'تم الموافقه علي الطلب وتم تجهيز الملف للتقديم غدا',
                'status' => 'تمت',
                'date_start' => '2018-07-20',
                'date_end' => '2018-07-20',
                'cost1' => '0.00',
                'cost2' => '150.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            145 => 
            array (
                'id' => 146,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الزعفران',
                'procedure_place_type_id' => NULL,
                
                'job' => 'معاينه الكهربا',
                
                'result' => 'تم عمل المعاينه والذهاب يوم الثلاثاء لانهاء الاجراءات',
                'status' => 'تمت',
                'date_start' => '2018-07-21',
                'date_end' => '2018-07-21',
                'cost1' => '0.00',
                'cost2' => '200.00',
                'cost3' => '30.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            146 => 
            array (
                'id' => 147,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الجلاء',
                'procedure_place_type_id' => NULL,
                
                'job' => 'تقديم الدور 11',
                
                'result' => 'تم التقديم علي الدور 11 وتم عمل معاينه المياه من سوق السمك وتم دفع 50معاينه -30موصلات استاذ ايمن بالتوكيل',
                'status' => 'تمت',
                'date_start' => '2018-07-21',
                'date_end' => '2018-07-21',
                'cost1' => '0.00',
                'cost2' => '250.00',
                'cost3' => '70.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            147 => 
            array (
                'id' => 148,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'قناه السويس',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'تسليم العقد لاحمد طلبه واستلام صوره الرخصه لموافقه الحي علي عداد الاسانسير',
                'status' => 'تمت',
                'date_start' => '2018-07-21',
                'date_end' => '2018-07-21',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '30.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            148 => 
            array (
                'id' => 149,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الزعفران',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'تم تسليم عم محمد دفه تالته 2000 متبقي اخر دفعه 2000',
                'status' => 'تمت',
                'date_start' => '2018-07-22',
                'date_end' => '2018-07-22',
                'cost1' => '0.00',
                'cost2' => '2000.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            149 => 
            array (
                'id' => 150,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الزعفران',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه',
                
                'result' => 'تم دفع مبلغ 300 جنيه لشراء بعض الخامات للمدخل والاسانسير (لفه خرطوم 23 ملي -2متر ماسوره حديد -حزمه فيري -2فيشه ذذكر مسمار صامولا-3مفتاح مجدول 5دوايه قلاوظ',
                    'status' => 'تمت',
                    'date_start' => '2018-07-22',
                    'date_end' => '2018-07-22',
                    'cost1' => '0.00',
                    'cost2' => '170.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                150 => 
                array (
                    'id' => 151,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه',
                    
                    'result' => 'تم تصوير ايصالات المقايسه وارفاق نسخه بكل ملف وتصوير طلبات من المعاينه مرفق بها المعلومات الكافيه للمهندسه الاستشاريه وتم احضار المساحه الكليه وتسليم الملفات للمهندسه مني وجاري المتابعه',
                    'status' => 'تمت',
                    'date_start' => '2018-07-23',
                    'date_end' => '2018-07-23',
                    'cost1' => '0.00',
                    'cost2' => '0.00',
                    'cost3' => '55.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                151 => 
                array (
                    'id' => 152,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الحي',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'تقديم طلب رخصه مصعد',
                    
                    'result' => 'تم التوجه للحي مطلوب اصل الرخصه حيث ان الصوره لم يوضح بها كلمه مصعد وعمل جواب الي شركه المصاعد موجه من الحي لاستكمال الاجراءات',
                    'status' => 'تمت',
                    'date_start' => '2018-07-28',
                    'date_end' => '2018-07-28',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                152 => 
                array (
                    'id' => 153,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه',
                    
                    'result' => 'مطلوب تقرير من مركز استشاري بحاله المبني وصحه بناؤه ومطلوب مبلغ 15800-1600لكل عداد من السابع للحادي عشر',
                    'status' => 'تمت',
                    'date_start' => '2018-07-28',
                    'date_end' => '2018-07-28',
                    'cost1' => '0.00',
                    'cost2' => '0.00',
                    'cost3' => '50.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                153 => 
                array (
                    'id' => 154,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'حي غرب',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه الرخصه',
                    
                    'result' => 'تم التوجه الي م/مصطفي العراقي مدير التنظيم بحي غرب وعليه قام بتوجيهي لاستاذ امير مسئول المصاعد وتم تجهيز المطلوب والتوجه معه غداالساعه9 صباحا لتقديم الملف باسم احمد محمد طلبه مرفقه به صوره الرخصه وصوره الرقم القومي',
                    'status' => 'تمت',
                    'date_start' => '2018-08-05',
                    'date_end' => '2018-08-05',
                    'cost1' => '100.00',
                    'cost2' => '16.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                154 => 
                array (
                    'id' => 155,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'السريع-الجلاء',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه',
                    
                    'result' => 'تم تحريك طلب العدادات العشوائي وسيتم تركيبها خلال 10 ايام',
                    'status' => 'تمت',
                    'date_start' => '2018-08-01',
                    'date_end' => '2018-08-01',
                    'cost1' => '0.00',
                    'cost2' => '0.00',
                    'cost3' => '50.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                155 => 
                array (
                    'id' => 156,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'مركز المنصوره',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه الرخصه',
                    
                    'result' => 'تم عمل طلب التقديم علي المصعد عندا/مصباح الاانه ونظرا لان العقار عددادواره مخالفه للرخصه حيث اذا كانت الادوار المخالفه دور او اتنين علي الاربعه الادوار المرخصه بها فان التنظيم سوف يقوم بالترخيص ولهذا نظرا لعدم الدخول في مشاكل مع الحي من حيث الصرف والتنظيم فقد نصحنا بالتوجه الي شركه الكهربا والتقديم علي عداد عشوائي 3فيس الا ان موظف الكهربا عند التواصل معه بالهاتف طلب مني ايصال كهربا او مايفيد بانه قد تم التقديم علي عداد كهربا او مايفيد بانه قد تم التقديم علي عداد كهربا والتوجه به اليه لزياده السعه والاحمال للعداد فقط دون الحاجه الي ترخيص للاسانسير',
                    'status' => 'تمت',
                    'date_start' => '2018-08-06',
                    'date_end' => '2018-08-06',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                156 => 
                array (
                    'id' => 157,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'نقل عداد الحارس للسادس',
                    
                'result' => 'مطلوب موافقه حي (تم اعطاء الطلب لشخص من طرفنا وجاري المتابعه)',
                    'status' => 'تمت',
                    'date_start' => '2018-08-11',
                    'date_end' => '2018-08-11',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                157 => 
                array (
                    'id' => 158,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                'procedure_place_name' => 'امياه(سوق السمك)',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'دفع مقايسه صرف صحي',
                    
                    'result' => 'تم دفع مبلغ 430 مقايسه صرف صحي-100 محمد جمال-30موصلات البيت -شركه الميه سوق السمك-2000 اخر دفعه للكهربائي-800 مرتب عم كرم-40 موصلات الزعفران قناه السويس -البيت-50شكاره اسمنت',
                    'status' => 'تمت',
                    'date_start' => '2018-08-13',
                    'date_end' => '2018-08-13',
                    'cost1' => '0.00',
                    'cost2' => '3450.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                158 => 
                array (
                    'id' => 159,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'شركه الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه نقل العداد',
                    
                    'result' => 'موظف الحي اجازه جاري المتابعه',
                    'status' => 'تمت',
                    'date_start' => '2018-08-14',
                    'date_end' => '2018-08-14',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                159 => 
                array (
                    'id' => 160,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'المكتب',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'دفع فواتير',
                    
                    'result' => 'تم دفع مبلغ 815 ايصالات الزعفران مياه شهر 8',
                    'status' => 'تمت',
                    'date_start' => '2018-08-30',
                    'date_end' => '2018-08-30',
                    'cost1' => '0.00',
                    'cost2' => '815.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                160 => 
                array (
                    'id' => 161,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الزعفران',
                    'procedure_place_type_id' => NULL,
                    
                'job' => 'تركيب العدادات العشوائي_4عدادات)',
                
            'result' => 'تم تركيب العدادات(8جلبه -2بكره تيفلون340-250التركيب-50 موصلات ) وتم الاتصال بكرم المحصل لتحصيل فاتوره شهر 9 من تركيبهم الي 15 يوم',
                'status' => 'تمت',
                'date_start' => '2018-09-02',
                'date_end' => '2018-09-02',
                'cost1' => '0.00',
                'cost2' => '640.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            161 => 
            array (
                'id' => 162,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الزعفران',
                'procedure_place_type_id' => NULL,
                
                'job' => 'الزعفران',
                
            'result' => 'توصيل المرتب لابوكرم (800)',
                'status' => 'تمت',
                'date_start' => '2018-09-03',
                'date_end' => '2018-09-03',
                'cost1' => '0.00',
                'cost2' => '0.00',
                'cost3' => '40.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            162 => 
            array (
                'id' => 163,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'مركز المنصوره',
                'procedure_place_type_id' => NULL,
                
                'job' => 'شهاده صلاحيه',
                
                'result' => 'تم التوجه لمركز المنصوره للاستعلام عن شهاده الصلاحيه او تقرير امن وسلامه المبني وهذا مايتطلبهعدد الادوار الموجوده بالعقار-حدوده بحري وقبلي وشرقي وغربي-معرفه الشهاده مطلوبه للكهربا ام لشي اخر-العنوان-معرفه الاستشاري من الدور الكام بماانه تجاوز الدور التالت-تكلفه الشهاده من 1500الي 2000جنيها',
                'status' => 'تمت',
                'date_start' => '2018-09-08',
                'date_end' => '2018-09-08',
                'cost1' => '0.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            163 => 
            array (
                'id' => 164,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'محطه سوق السمك-الجلاء',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استلام الملفات',
                
                'result' => 'تم استلام الملفات من محطه سوق السمك من الموظف المسؤل وتسليمها لمحطه الجلاء وجاري تحديد المقايسه لمعرفه المبلغ المطلوب',
                'status' => 'تمت',
                'date_start' => '2018-09-11',
                'date_end' => '2018-09-11',
                'cost1' => '0.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            164 => 
            array (
                'id' => 165,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'محطه الجلاء',
                'procedure_place_type_id' => NULL,
                
            'job' => 'استعلام عن المبلغ (العدادالتامن والتاسع والعاشر والحادي عشر)',
                
                'result' => 'مطلوب مبلغ 38500',
                'status' => 'تمت',
                'date_start' => '2018-09-15',
                'date_end' => '2018-09-15',
                'cost1' => '0.00',
                'cost2' => '50.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            165 => 
            array (
                'id' => 166,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'المكتب الاستشاري',
                'procedure_place_type_id' => NULL,
                
                'job' => 'شهاده الصلاحيه',
                
                'result' => 'تم دفع المبلغ المطلوب وجاري عمل الشهاده',
                'status' => 'تمت',
                'date_start' => '2018-09-12',
                'date_end' => '2018-09-12',
                'cost1' => '0.00',
                'cost2' => '4000.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            166 => 
            array (
                'id' => 167,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'محطه الجلاء',
                'procedure_place_type_id' => NULL,
                
                'job' => 'دفع العدادات الجديده',
                
            'result' => 'تم دفع العدادات التامن والتاسع والعاشر والحادي عشر(6800 تمن العدادات-1000اشراف-13552 استهلاك-12000مخالفه بطاريه-1200 مقابل تصالح-2000 مخالفه شروط تعاقد-1876 تكعيب)',
                'status' => 'تمت',
                'date_start' => '2018-09-17',
                'date_end' => '2018-09-17',
                'cost1' => '1000.00',
                'cost2' => '38500.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            167 => 
            array (
                'id' => 168,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'محطه المياه',
                'procedure_place_type_id' => NULL,
                
            'job' => 'استعلام عن مذكره التنفيذ من السريع(العدادات الجديده)',
                
                'result' => 'الذهاب بعد اسبوع',
                'status' => 'تمت',
                'date_start' => '2018-10-02',
                'date_end' => '2018-10-02',
                'cost1' => '0.00',
                'cost2' => '35.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            168 => 
            array (
                'id' => 169,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الكهربا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'متابعه الشهاده',
                
                'result' => 'تم استلام الشهاده',
                'status' => 'تمت',
                'date_start' => '2018-09-18',
                'date_end' => '2018-09-18',
                'cost1' => '0.00',
                'cost2' => '3000.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            169 => 
            array (
                'id' => 170,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الكهربا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'عمل مقايسه الكهربا',
                
                'result' => 'تم تقديم شهاده الصلاحيه وصور شهادات الجدول وصوره الرخصه وارفاقها بالملفات وتم عمل المقايه الخاصه بالعدادات التي تم التقديم عليها حيث قدرت بمبلغ 16000 مع دفع مبلغ 8500 تمن 5عدادات لكل عداد 1700',
                'status' => 'تمت',
                'date_start' => '2018-09-23',
                'date_end' => '2018-09-23',
                'cost1' => '0.00',
                'cost2' => '100.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            170 => 
            array (
                'id' => 171,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الكهربا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'عمل مقايسه الكهربا',
                
                'result' => 'تم عمل المقايسه وتم دفع مبلغ 26500',
                'status' => 'تمت',
                'date_start' => '2018-09-25',
                'date_end' => '2018-09-25',
                'cost1' => '0.00',
                'cost2' => '26500.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            171 => 
            array (
                'id' => 172,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'الكهربا',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام عن فتح العدادات',
                
                'result' => 'مازال مغلق',
                'status' => 'تمت',
                'date_start' => '2018-10-02',
                'date_end' => '2018-10-02',
                'cost1' => '0.00',
                'cost2' => '20.00',
                'cost3' => '0.00',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            172 => 
            array (
                'id' => 173,
                'service_id' => 25,
                'title' => NULL,
                'lawyer_id' => 5,
                
                'procedure_place_name' => 'السريع',
                'procedure_place_type_id' => NULL,
                
                'job' => 'استعلام عن التنفيذ',
                
                'result' => 'تم الاستعلام عن التنفيذ (مازال مغلقا حتي اليوم وسيتم اجتماع لمجلس الاداره اليوم لتسيير الاعمال وانجاز المهام ومازالت المتابعه مع الموظف المسؤل',
                    'status' => 'تمت',
                    'date_start' => '2018-10-29',
                    'date_end' => '2018-10-29',
                    'cost1' => '0.00',
                    'cost2' => '100.00',
                    'cost3' => '40.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                173 => 
                array (
                    'id' => 174,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'استعلام عن العدادات',
                    
                    'result' => 'تم مقابله المختص وتم ارفاق اسم احمد طلبه في الكشف الاول للتركيب',
                    'status' => 'تمت',
                    'date_start' => '2018-11-06',
                    'date_end' => '2018-11-06',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '50.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                174 => 
                array (
                    'id' => 175,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الزعفران',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه',
                    
                    'result' => 'تم تركيب العدادات السابع والتامن والتاسع والعاشر والحادي عشركهربا',
                    'status' => 'تمت',
                    'date_start' => '2018-11-11',
                    'date_end' => '2018-11-11',
                    'cost1' => '0.00',
                    'cost2' => '300.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                175 => 
                array (
                    'id' => 176,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'عداد اسانسير',
                    
                'result' => 'تم عمل طلب وملف بنقل العداد ال11 قوه اكبر وتم تقديم الملف ودفع المعاينه وتم عمل المعاينه وجاري المتابعه غدا(100 معاينه-100عم يحيي-400 داخل المحطه-45 رسم معاينه-70 موصلات المحطه -الزعفران -البيت-تصوير -ملف)-8-- كرم البواب',
                    'status' => 'تمت',
                    'date_start' => '2018-11-12',
                    'date_end' => '2018-11-12',
                    'cost1' => '0.00',
                    'cost2' => '1515.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                176 => 
                array (
                    'id' => 177,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'رفع العداد الدور 11',
                    
                    'result' => 'تم رفع العداد ورجوعه الي الشركه واستكمال اجراءات الرفع لعداد اسانسير 3فاز',
                    'status' => 'تمت',
                    'date_start' => '2018-11-14',
                    'date_end' => '2018-11-14',
                    'cost1' => '0.00',
                    'cost2' => '80.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                177 => 
                array (
                    'id' => 178,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'استكمال اجراءات الاسانسير',
                    
                    'result' => 'تم عمل كارت وتم تسليمه للموظف المسئول لانهاء الاجراءات وسيتم الذهاب للمحطه يوم الاحد لدفع المبلغ المطلوب',
                    'status' => 'تمت',
                    'date_start' => '2018-11-21',
                    'date_end' => '2018-11-21',
                    'cost1' => '0.00',
                    'cost2' => '130.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                178 => 
                array (
                    'id' => 179,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'عداد اسانسير -عداد الدور السادس',
                    
                'result' => 'تم دفع 3950 متوسط عداد(اسانسير)وتم استكمال الملف وساري متابعته غدا-تم التقديم علي الدور السادس لوجوده في المقايسه الاخيره وتم تقديم الملف ودفع مخالفه شروط التعاقد مبلغ 800 جنيه  وغدا الذهاب للمحطه للمعاينه)',
                    'status' => 'تمت',
                    'date_start' => '2018-11-27',
                    'date_end' => '2018-11-27',
                    'cost1' => '0.00',
                    'cost2' => '4900.00',
                    'cost3' => '80.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                179 => 
                array (
                    'id' => 180,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'استكمال الجراءات الاسانسير',
                    
                    'result' => 'تم عمل معاينه لعداد الاسانسير والدور السادس',
                    'status' => 'تمت',
                    'date_start' => '2018-11-28',
                    'date_end' => '2018-11-28',
                    'cost1' => '0.00',
                    'cost2' => '100.00',
                    'cost3' => '50.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                180 => 
                array (
                    'id' => 181,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'استكمال الجراءات العداد السادس والاسانسير',
                    
                'result' => 'تم دفع مبلغ 5850 بالدور التالت (تاني دفعه من الاسانسير)ثم تم دفع أخر دفعه بمبلغ 2900 ليصل اجمالي الاسانسير 12700 ثم تم دفع مبلف 1580 للعداد السادس',
                    'status' => 'تمت',
                    'date_start' => '2018-11-29',
                    'date_end' => '2018-11-29',
                    'cost1' => '0.00',
                    'cost2' => '10330.00',
                    'cost3' => '30.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                181 => 
                array (
                    'id' => 182,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'تركيب العداد السادس',
                    
                    'result' => 'تم تركيب العداد',
                    'status' => 'تمت',
                    'date_start' => '2018-12-03',
                    'date_end' => '2018-12-03',
                    'cost1' => '0.00',
                    'cost2' => '0.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                182 => 
                array (
                    'id' => 183,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'استعلام',
                    
                    'result' => 'تم انجاز عداد الاسانسير وجاري توصيل الكهربا لتشغيل الاسانسير',
                    'status' => 'تمت',
                    'date_start' => '2018-12-04',
                    'date_end' => '2018-12-04',
                    'cost1' => '0.00',
                    'cost2' => '100.00',
                    'cost3' => '30.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                183 => 
                array (
                    'id' => 184,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 3,
                    
                    'procedure_place_name' => 'الزعفران',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'تركيب عداد',
                    
                    'result' => 'تم تركيب عداد الاسانسير',
                    'status' => 'تمت',
                    'date_start' => '2018-12-08',
                    'date_end' => '2018-12-08',
                    'cost1' => '0.00',
                    'cost2' => '100.00',
                    'cost3' => '30.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                184 => 
                array (
                    'id' => 185,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الجلاء-السريع-محطه الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه',
                    
                    'result' => 'تم الذهاب الي محطه الكهربا مازالت التقديم مغلق وسيتم فتحه علي شهر 4-وتم الذهاب الي استاذ سعد بمحطه المياه للتأكد من معلومه ورود ملفات من السريع وبالبحث تم ايجاد عدد من الملفات ولم يكن احمد طلبه من ضمنهم وجد انه تم دفع التنفيذ فيهم وسيتم التعامل معهم وتم الذهاب الي محطه السريع وجد ان الموضوع مازال محل بحث وقريبا سيتم وجود حل وسيتم المتابعه بعد وقت',
                    'status' => 'تمت',
                    'date_start' => '2019-02-26',
                    'date_end' => '2019-02-26',
                    'cost1' => '0.00',
                    'cost2' => '20.00',
                    'cost3' => '55.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                185 => 
                array (
                    'id' => 186,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'ضبطيه قضائيه',
                    
                    'result' => 'تم عمل ضبطيه قضائيه بإسم محمد هشام لتركيب عداد الدور 11',
                    'status' => 'تمت',
                    'date_start' => '2021-09-22',
                    'date_end' => '2021-09-22',
                    'cost1' => '0.00',
                    'cost2' => '1300.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                186 => 
                array (
                    'id' => 187,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'شركه المياه',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'اطلاع',
                    
                    'result' => 'تم الذهاب الي محطه المياه ووجد انه تم البديء في خط جديد وسيتم امتداده الي الاماكن الجديده كالزعفران وغيها وسيظل العمل بها حتي اواخر 2022 لحين انتهاء العمل بها وتوصيل العدادات مسبوقه الدفع والتنفيذ لها',
                    'status' => 'تمت',
                    'date_start' => '2021-09-26',
                    'date_end' => '2021-09-26',
                    'cost1' => '0.00',
                    'cost2' => '75.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                187 => 
                array (
                    'id' => 188,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 1,
                    
                    'procedure_place_name' => 'شكه الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'سداد الممارسه',
                    
                    'result' => 'تم اعطاء الايصال لاستاذ هشام عسكر لسداده شهريا',
                    'status' => 'تمت',
                    'date_start' => '2021-10-23',
                    'date_end' => '2021-10-23',
                    'cost1' => '0.00',
                    'cost2' => '0.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                188 => 
                array (
                    'id' => 189,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'null',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه المعاينه',
                    
                    'result' => 'يتم الاطلاع اسبوعيا حتي تاريخه وتم اعطاء الاستاذ وليد المسؤل عن المعاينه صوره الضبطيه والتجديد وصوره العقار وتم تنزيل المعاينه علي كمبيوتر المهندس المسؤل وتتم المتابعه مع موظف المعاينه',
                    'status' => 'تمت',
                    'date_start' => '2022-01-29',
                    'date_end' => '2022-05-26',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                189 => 
                array (
                    'id' => 190,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه المعاينه',
                    
                    'result' => 'المعاينه الاحد 5/6/2022',
                    'status' => 'تمت',
                    'date_start' => '2022-06-02',
                    'date_end' => '2022-06-02',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                190 => 
                array (
                    'id' => 191,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الزعفران',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'معاينه',
                    
                    'result' => 'تم عمل المعاينه وتم تصوير لوحه العدادات ووجد انه لابد من تفضيه مكان للعداد الجديد وجاري المتابعه',
                    'status' => 'تمت',
                    'date_start' => '2022-06-05',
                    'date_end' => '2022-06-05',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                191 => 
                array (
                    'id' => 192,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه',
                    
                    'result' => 'تم المتابعه مع استاذ وليد ووجد ان لابد من تصوير لوحه العدادات صوره ظاهر بها ارقام اللوح بالتفصيل',
                    'status' => 'تمت',
                    'date_start' => '2022-08-08',
                    'date_end' => '2022-08-08',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                192 => 
                array (
                    'id' => 193,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه',
                    
                    'result' => 'تم تصوير لوحه العدادات وطبعها وارفاقها بالطلب والذهاب للمهندسه مني لاستكمال الطلب ومرفق طيه جميه الاوراق المطلوبه وتم عمل الازم وتدوين ارقام العدادات مرفق للطلب وذهاب الطلب للطباعه وارسال الرساله',
                    'status' => 'تمت',
                    'date_start' => '2022-08-09',
                    'date_end' => '2022-08-09',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                193 => 
                array (
                    'id' => 194,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'سداد رسم المعاينه',
                    
                    'result' => 'تم السداد',
                    'status' => 'تمت',
                    'date_start' => '2022-08-10',
                    'date_end' => '2022-08-10',
                    'cost1' => '0.00',
                    'cost2' => '100.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                194 => 
                array (
                    'id' => 195,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه التجديد',
                    
                    'result' => 'تم طبع ايصال التجديد وتسليمه بالاستاد وتم اخذ موظف كهربا مشعل ليتم معه المتابعه حيث انه كتي الشقه تحت الانشاء ليتم تقنين المبلغ واوضخ بانه في حدود 2000 جنيه مده 10 شهور',
                    'status' => 'تمت',
                    'date_start' => '2022-08-13',
                    'date_end' => '2022-08-13',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                195 => 
                array (
                    'id' => 196,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'متابعه',
                    
                    'result' => 'تم الاستعلام عن مبلغ التجديد مبلغ 970 جنيه ولابد من قيام المشترك بسداد المبلغ او ماينوب عنه بتوكيل وكذلك مبلغ 1400 تمن العداد',
                    'status' => 'تمت',
                    'date_start' => '2022-08-17',
                    'date_end' => '2022-08-17',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                196 => 
                array (
                    'id' => 197,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'سداد التجديد والعداد',
                    
                    'result' => 'تم سداد مبلغ 1900 مقايسه العداد-1345 تمن العداد-970 تجديد الضبطيه',
                    'status' => 'تمت',
                    'date_start' => '2022-08-28',
                    'date_end' => '2022-08-28',
                    'cost1' => '4220.00',
                    'cost2' => '150.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                197 => 
                array (
                    'id' => 198,
                    'service_id' => 25,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الكهربا',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'الكهربا',
                    
                    'result' => 'تم طبع الايصالات وتم الذهاب للكهربا لتسليمه لقسم التركيبات للمتابعه وتم الرد بان العداد سيتم تركيبه خلال 3 شهور من تاريخ الدفع',
                    'status' => 'تمت',
                    'date_start' => '2022-08-30',
                    'date_end' => '2022-08-30',
                    'cost1' => '0.00',
                    'cost2' => '30.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                198 => 
                array (
                    'id' => 199,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'مجمع التحرير',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'شهاده',
                    
                    'result' => 'تم التقديم علي شهاده تحركات من نقابه المحامين من 2010 حتي تاريخه من مجمع التحرير',
                    'status' => 'تمت',
                    'date_start' => '2018-05-05',
                    'date_end' => '2018-05-05',
                    'cost1' => '0.00',
                    'cost2' => '0.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                199 => 
                array (
                    'id' => 200,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'مجمع التحرير -القاهره',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'استلام الشهاده',
                    
                    'result' => 'استلام شهاده التحركات لاستاذ عبد الحميد تطلب اصل البطاقه الشخصيه',
                    'status' => 'تمت',
                    'date_start' => '2018-05-06',
                    'date_end' => '2018-05-06',
                    'cost1' => '0.00',
                    'cost2' => '0.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                200 => 
                array (
                    'id' => 201,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'السجل المدني',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'شهاده ميلاد',
                    
                    'result' => 'تم استخراج شهاده ميلاد استاذ عبد الحميد',
                    'status' => 'تمت',
                    'date_start' => '2018-05-06',
                    'date_end' => '2018-05-06',
                    'cost1' => '0.00',
                    'cost2' => '0.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                201 => 
                array (
                    'id' => 202,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'تنفيذ جنايات المنصوره',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'تصوير',
                    
                    'result' => 'تم تسليم ارقام الاحكام الي عم سليمان وسيتم الاستلام خلال يومين',
                    'status' => 'تمت',
                    'date_start' => '2018-05-08',
                    'date_end' => '2018-05-08',
                    'cost1' => '0.00',
                    'cost2' => '0.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                202 => 
                array (
                    'id' => 203,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'مصلحه الجوازات والهجره -نقابه المحامين',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'استخراج جواب',
                    
                    'result' => 'تم استخراج جواب من نقابه المحامين بالمنصوره الي مصلحه الجوازات والهجره لاستخراج شهاده تحركات',
                    'status' => 'تمت',
                    'date_start' => '2018-05-09',
                    'date_end' => '2018-05-09',
                    'cost1' => '0.00',
                    'cost2' => '0.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                203 => 
                array (
                    'id' => 204,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'مصلحه الجوازات',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'تسليم الجواب',
                    
                    'result' => 'تم تسليم الجواب الي مصلحه الجوازات شرط تواجد استاذ عبد الحميد يوم السبت للتأكد من تطابق الشخص مع البطاقه',
                    'status' => 'تمت',
                    'date_start' => '2018-05-09',
                    'date_end' => '2018-05-09',
                    'cost1' => '0.00',
                    'cost2' => '0.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                204 => 
                array (
                    'id' => 205,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الجوازات',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'تسليم الجواب',
                    
                    'result' => 'تم تسليم جواب النقابه ودفع الرسوم لاستلام الشهاده بعد اسبوعين',
                    'status' => 'تمت',
                    'date_start' => '2018-05-11',
                    'date_end' => '2018-05-11',
                    'cost1' => '0.00',
                    'cost2' => '0.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                205 => 
                array (
                    'id' => 206,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'الجوازات',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'استلام الشهاده',
                    
                    'result' => 'تم استلام شهاده التحركات',
                    'status' => 'تمت',
                    'date_start' => '2018-05-25',
                    'date_end' => '2018-05-25',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                206 => 
                array (
                    'id' => 207,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'جنايات المنصوره',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'استلام مستندات',
                    
                    'result' => 'الانتهاء من الاحكام بمعرفه ا/سليمان وحكمين بالنقض وسيتم استلامهم غدا',
                    'status' => 'تمت',
                    'date_start' => '2018-05-15',
                    'date_end' => '2018-05-15',
                    'cost1' => '100.00',
                    'cost2' => '20.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                207 => 
                array (
                    'id' => 208,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'محكمه جنايات المنصوره',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'استلام احكام',
                    
                    'result' => 'استخراج عدد 2 حكم جنايات باسم ا/عبد الحميد عسكر وسيتم التقديم علي طلب رسمي لاستخراج صوره رسميه من الحكمين',
                    'status' => 'تمت',
                    'date_start' => '2018-05-17',
                    'date_end' => '2018-05-17',
                    'cost1' => '0.00',
                    'cost2' => '100.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                208 => 
                array (
                    'id' => 209,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'تنفيذ جنايات المنصوره',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'تقديم طلب',
                    
                    'result' => 'تقديم طلب لاستلام عدد 2صوره رسميه من احكام الجنايات الخاصه باسم عبد الحميد عسكر',
                    'status' => 'تمت',
                    'date_start' => '2018-05-19',
                    'date_end' => '2018-05-19',
                    'cost1' => '100.00',
                    'cost2' => '16.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                209 => 
                array (
                    'id' => 210,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 5,
                    
                    'procedure_place_name' => 'تنفيذ جنايات المنصوره',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'استلام مستندات',
                    
                    'result' => 'استلام عدد2 صوره رسميه من عدد 2حكم للجنايات باسم عبدالحميد عسكر',
                    'status' => 'تمت',
                    'date_start' => '2018-05-20',
                    'date_end' => '2018-05-20',
                    'cost1' => '0.00',
                    'cost2' => '50.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                210 => 
                array (
                    'id' => 211,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 3,
                    
                    'procedure_place_name' => 'جنح اول المنصوره',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'تصوير عريضه',
                    
                    'result' => 'تم تصوير العريضه صورتين',
                    'status' => 'تمت',
                    'date_start' => '2018-05-25',
                    'date_end' => '2018-05-25',
                    'cost1' => '100.00',
                    'cost2' => '16.00',
                    'cost3' => '0.00',
                    'created_by' => 1,
                    'updated_by' => NULL,
                    'created_at' => NULL,
                    'updated_at' => NULL,
                ),
                211 => 
                array (
                    'id' => 212,
                    'service_id' => 26,
                    'title' => NULL,
                    'lawyer_id' => 3,
                    
                    'procedure_place_name' => 'الميكروفيلم',
                    'procedure_place_type_id' => NULL,
                    
                    'job' => 'كشف مدني',
                    
                    'result' => 'صحه توقيع اول لسنه 2018 (2310-2315-2320-2324-2323-2322-2313-2327-2318-2319-2325 من اول الرول 2/5/2018 حتي 2310 لسنه 2018',
                        'status' => 'تمت',
                        'date_start' => '2018-06-08',
                        'date_end' => '2018-06-08',
                        'cost1' => '100.00',
                        'cost2' => '25.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    212 => 
                    array (
                        'id' => 213,
                        'service_id' => 26,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'مكتب البريد بشارع البحر',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'شهاده بريد',
                        
                        'result' => 'تم التقديم علي شهاده من البريد واستلامها بعد اسبوع من تاريخه 3/7/2018',
                        'status' => 'تمت',
                        'date_start' => '2018-07-02',
                        'date_end' => '2018-07-02',
                        'cost1' => '0.00',
                        'cost2' => '85.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    213 => 
                    array (
                        'id' => 214,
                        'service_id' => 26,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'مكتب بريد المنصوره',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استلام شهاده',
                        
                        'result' => 'تم استلام شهاده البريد الخاصه باستاذ عبد الحميد',
                        'status' => 'تمت',
                        'date_start' => '2018-07-09',
                        'date_end' => '2018-07-09',
                        'cost1' => '0.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    214 => 
                    array (
                        'id' => 215,
                        'service_id' => 26,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'مكتبب بريد شارع المدير',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استعلام',
                        
                        'result' => 'تم التقديم علي شهاده من البريد لمعرفه مرسل الطرد باسم/عبد الحميد وتم ارسال الخطاب بتاريخ 27/9/2018 وهو مازال مع موظف البريد ولم يتم استلامه وتم دفع رسوم شهاده 80 جنيها والاستلام بعد اسبوع',
                        'status' => 'تمت',
                        'date_start' => '2018-09-30',
                        'date_end' => '2018-09-30',
                        'cost1' => '0.00',
                        'cost2' => '80.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    215 => 
                    array (
                        'id' => 216,
                        'service_id' => 26,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'مكتب بريد شارع المدير',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'شهاده البريد',
                        
                        'result' => 'تم تسليم طلب عمل شهاده بريدالخاصه با/عبد الحميد والاستلام بعد 4أيام',
                        'status' => 'تمت',
                        'date_start' => '2018-10-08',
                        'date_end' => '2018-10-08',
                        'cost1' => '0.00',
                        'cost2' => '25.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    216 => 
                    array (
                        'id' => 217,
                        'service_id' => 26,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'مكتب بريد شارع المدير',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استعلام',
                        
                        'result' => 'سيتم استلام شهاده البريد الخاصه ب أ/عبد الحميد يوم الاحد القادم',
                        'status' => 'تمت',
                        'date_start' => '2018-10-11',
                        'date_end' => '2018-10-11',
                        'cost1' => '0.00',
                        'cost2' => '20.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    217 => 
                    array (
                        'id' => 218,
                        'service_id' => 26,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'مكتب البريد',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استلام شهاده البريد',
                        
                        'result' => 'تم استلام شهاده البريد الخاصه باستاذ عبد الحميد وغدا الاستعلام بالرقم المسجل في محضرين تان المنصوره',
                        'status' => 'تمت',
                        'date_start' => '2018-10-14',
                        'date_end' => '2018-10-14',
                        'cost1' => '0.00',
                        'cost2' => '16.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    218 => 
                    array (
                        'id' => 219,
                        'service_id' => 26,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'مكتب المدير',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استعلام عن الطرد',
                        
                        'result' => 'تم البحث في الدفاتر الخاصه بالسجلات المردوده بالمحضرين ولم يتم العثور علي اسم ا/عبد الحميد وغدا سيتم التوجه الي مكتب البريد لمعرفه صادر المكتب للخبراء',
                        'status' => 'تمت',
                        'date_start' => '2018-10-20',
                        'date_end' => '2018-10-20',
                        'cost1' => '0.00',
                        'cost2' => '16.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    219 => 
                    array (
                        'id' => 220,
                        'service_id' => 26,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'محضرين تان المنصوره',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'تسليم',
                        
                        'result' => 'تم تسليم صوره من شهاده البريد الخاصه ب ا/عبد الحميد لمعرفه الراسل وجهه ارساله',
                        'status' => 'تمت',
                        'date_start' => '2018-10-15',
                        'date_end' => '2018-10-15',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    220 => 
                    array (
                        'id' => 221,
                        'service_id' => 26,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'محضرين تان المنصوره شارع البحر',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استعلام',
                        
                        'result' => 'تم الاستعلام برقم المسجل من واقع دفتر الاخطارات المرتده وقد تم التوصل منه الي ان الخطاب باسم احمد محمد عبد المطلب ومحله المختار مكتب ا/عبد الحميد عسكر المحامي واستلام الخطاب غدا نظرا لعدم وجود الموظفه المسؤله',
                        'status' => 'تمت',
                        'date_start' => '2018-10-24',
                        'date_end' => '2018-10-24',
                        'cost1' => '0.00',
                        'cost2' => '20.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    221 => 
                    array (
                        'id' => 222,
                        'service_id' => 26,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'محضرين تان المنصوره',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استلام',
                        
                        'result' => 'الخطاب موجه الي ا/عبد الحميد عسكر بصفته محامي ا/احمد محمد عبد المطلب وهو عباره عن اعلان اداري من المحكمه لجلسه في قضيه متداوله ويلزم للاستلام توكيل الموكل لاستاذ عبد الحميد',
                        'status' => 'تمت',
                        'date_start' => '2018-10-25',
                        'date_end' => '2018-10-25',
                        'cost1' => '0.00',
                        'cost2' => '20.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    222 => 
                    array (
                        'id' => 223,
                        'service_id' => 26,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'نيابه المرور',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'شهاده مخالفات',
                        
                        'result' => 'تم استخراج شهاده بالمخالفات من نيابه المرور',
                        'status' => 'تمت',
                        'date_start' => '2020-07-25',
                        'date_end' => '2020-07-25',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    223 => 
                    array (
                        'id' => 224,
                        'service_id' => 26,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'السجل التجاري',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استخراج قسيمه زواج',
                        
                        'result' => 'تم استخراج قسيمه زواج لاستاذ عبد الحميد',
                        'status' => 'تمت',
                        'date_start' => '2022-05-07',
                        'date_end' => '2022-05-07',
                        'cost1' => '0.00',
                        'cost2' => '100.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    224 => 
                    array (
                        'id' => 225,
                        'service_id' => 27,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'البنك العقاري',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'صرف شيك من محمد طلبه بمبلغ مليون جنية',
                        
                        'result' => 'تم الصرف واستلام 625.000 وأيداع 375.000 بالحساب الشخصي',
                        'status' => 'تمت',
                        'date_start' => '2018-07-02',
                        'date_end' => '2018-07-02',
                        'cost1' => '0.00',
                        'cost2' => '0.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    225 => 
                    array (
                        'id' => 226,
                        'service_id' => 27,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'حماده البلقاسي',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'تسليم حماده البلقاسي 625.000',
                        
                        'result' => 'تم تسليم حماده البلقاسي 625.000 ستمائة وخمسة وعشرون ألف',
                        'status' => 'تمت',
                        'date_start' => '2018-07-02',
                        'date_end' => '2018-07-02',
                        'cost1' => '0.00',
                        'cost2' => '625000.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    226 => 
                    array (
                        'id' => 227,
                        'service_id' => 27,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'محمود البلقاسي',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'null',
                        
                        'result' => 'تسليم محمود فاروق ابراهيم 375000 الف',
                        'status' => 'تمت',
                        'date_start' => '2018-07-07',
                        'date_end' => '2018-07-07',
                        'cost1' => '0.00',
                        'cost2' => '375000.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    227 => 
                    array (
                        'id' => 228,
                        'service_id' => 28,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'المكتب الامامي',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'عريضه دعوي قضايا',
                        
                    'result' => 'تم استخراج عريضه دعوي (1)1334لسنه 2010 م ك-(2) 2677 لسنه 2017 م ك-(3)79 لسنه 2008م س-764 لسنه 2004 م س',
                        'status' => 'تمت',
                        'date_start' => '2018-07-16',
                        'date_end' => '2018-07-16',
                        'cost1' => '100.00',
                        'cost2' => '16.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    228 => 
                    array (
                        'id' => 229,
                        'service_id' => 28,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'السجل المدني',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استعلام',
                        
                        'result' => 'تم استخراج شهاده ميلاد للمدعو/عبد السلام محمد ابراهيم -اسم الزوجه /زينب محمود عرفات ربه منزل علي قيد الحياه 37 شارع ابو القاسم -عزبه عقل اسم الام/فكيهه السيد منصور مواليد 18/10/1964 اخر اصدار للبطاقه عام 2006 وكان مدون بها ارمله والابناء مدحت 22/8/1965-ناهد 26/7/1987-محمد 8/9/1974-سحر 17/4/1969',
                        'status' => 'تمت',
                        'date_start' => '2018-07-28',
                        'date_end' => '2018-07-28',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    229 => 
                    array (
                        'id' => 230,
                        'service_id' => 29,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'القسم',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'مذكره من القسم',
                        
                    'result' => 'تم عمل مذكره فقد بقسم تان المنصوره ومرفقه طيه صوره منها ثم السؤال عنها بنيابه المرور لاستكمال الاجراءات وجد انه يلزم شراء مذكره فقد من اداره المرور والتأشير عليها من الظابط المختص والتوجه بها الي قسم التصوير لاستكمال بياناتها ثم التوجه بها مره اخري الي نيابه المرور لاستخراج براءه الذمه (الظابط المسؤل عمرو بك في راحه وعوده يوم السبت)',
                        'status' => 'تمت',
                        'date_start' => '2018-07-18',
                        'date_end' => '2018-07-18',
                        'cost1' => '100.00',
                        'cost2' => '25.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    230 => 
                    array (
                        'id' => 231,
                        'service_id' => 29,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'نيابه المرور',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'براءه ذمه',
                        
                        'result' => 'تم استخراج براءه ذمه لصالح /عبد الحميد عسكر من توكيل بيع سياره السيده نيفين مصطفي عبدالله الشافعي',
                        'status' => 'تمت',
                        'date_start' => '2018-07-28',
                        'date_end' => '2018-07-28',
                        'cost1' => '0.00',
                        'cost2' => '40.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    231 => 
                    array (
                        'id' => 232,
                        'service_id' => 29,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'المستشفي',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'شهاده باطنه ونظر',
                        
                        'result' => 'تم دفع رسوم شهادتي الباطنه والنظر80جنيه ومتوقفه علي 2صوره شخصيه وصوره الرقم القومي',
                        'status' => 'تمت',
                        'date_start' => '2018-08-11',
                        'date_end' => '2018-08-11',
                        'cost1' => '0.00',
                        'cost2' => '80.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    232 => 
                    array (
                        'id' => 233,
                        'service_id' => 29,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'اداره المرور',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استكمال اجراءات',
                        
                        'result' => 'التأشيرعلي الطلب باستخراج بدل فاقد للرخصه ويلزم تواجد ا/عبد الحميد امام الظابط المختص لاستكمال باقي الاجراءات',
                        'status' => 'تمت',
                        'date_start' => '2018-07-20',
                        'date_end' => '2018-07-20',
                        'cost1' => '100.00',
                        'cost2' => '16.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    233 => 
                    array (
                        'id' => 234,
                        'service_id' => 29,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'اداره المرور',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استكمال اجراءات',
                        
                        'result' => 'يلزم احضار الرخصه الخاصه لاستاذ عبد الحميد يوم السبت +حضوره شخصيا لتصويره واستلام الرخصه',
                        'status' => 'تمت',
                        'date_start' => '2018-08-29',
                        'date_end' => '2018-08-29',
                        'cost1' => '0.00',
                        'cost2' => '30.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    234 => 
                    array (
                        'id' => 235,
                        'service_id' => 29,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'null',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'سداد غرامه',
                        
                        'result' => 'تم سداد الغرامه وقدرها 150 جنيه وتم الذهاب للمرور وتسليم صوره من ايصال السداد وصوره من المخالفه',
                        'status' => 'تمت',
                        'date_start' => '2019-06-12',
                        'date_end' => '2019-06-12',
                        'cost1' => '0.00',
                        'cost2' => '150.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    235 => 
                    array (
                        'id' => 236,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'الوحده المحليه بمجله الدمنه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تم التأشير علي طلب ترخيص سور علي قطعه الارض من رئيس الوحده المحليه وارسال الطلب الي مجلس المدينه لاستكمال باقي الاجراءات اما بالنسبه للمهندس السيد فوده فسوف يتم تعيين مهندس أخر بدلا منه للتصديق علي الطلب بعد العيد وجاري متابعته مع نائب رئيس الوحده المحليه ا/جمال',
                        'status' => 'تمت',
                        'date_start' => '2018-08-18',
                        'date_end' => '2018-08-18',
                        'cost1' => '100.00',
                        'cost2' => '16.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    236 => 
                    array (
                        'id' => 237,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'الوحده المحليه بمنيه محله الدمنه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تم تعديل الطلب المقدم بترخيص السور علي قطعه الارض من السيده فاتن السيد عبد الحافظ الي السيده عفاف السيد بدوي وقد تم التأشير علي الطلب من قبل رئيس الوحده المحليه بمنيه محله دمنه',
                        'status' => 'تمت',
                        'date_start' => '2018-08-26',
                        'date_end' => '2018-08-26',
                        'cost1' => '100.00',
                        'cost2' => '35.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    237 => 
                    array (
                        'id' => 238,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'الوحده المحليه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تم التوجه الي مديريه الاداره الهندسيه بالوحده المحليه  لمركزمدينه المنصوره م/محمد زاهر واخذنا الطلب ويلزم ان يأتي به الموظف المختص ا/جمال عبد الصمد للتأشير عليه واستعجاله وتعيين مهندس للمعاينه بديلا عن م/السيد فوده الموقوف عن العمل',
                        'status' => 'تمت',
                        'date_start' => '2018-08-26',
                        'date_end' => '2018-08-26',
                        'cost1' => '100.00',
                        'cost2' => '25.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    238 => 
                    array (
                        'id' => 239,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'الوحده المحليه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'تقديم طلب ترخيص',
                        
                        'result' => 'تم التقديم علي طلب ترخيص سور القطعه الارض بحوض السبعه رقم 8 مساحه 763 مترا والطلب مقدم باسم السيده فاتن السيد عبد الحافظ ومرفق بالطلب صوره من العقد الابتدائي وكذلك صوره من حكم الشعب بصحه التوقيع علي العقد برقم 1264 لسنه 2016 صحه توقيع مركز المنصوره والطلب طرف ا/جمال عبد الصمد 01097454737',
                        'status' => 'تمت',
                        'date_start' => '2018-08-15',
                        'date_end' => '2018-08-15',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    239 => 
                    array (
                        'id' => 240,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'الوحده المحليه بمنيه محله دمنه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تم التوجه صباحا الي الوحده المحليه بمنيه محله دمنه ا/جمال عبد الصمد وعلي موعد سابق من الامس بمقابلته واخذ الطلب الخاص بترخيص السور والمعتمد من مجلس المدينه والوحده المحليه للتوجه به الي مجلس مدينه المنصوره لاتخاذ اللازم لعمل المعاينه الاان الموظف تكاسل عن الموعد ولم يحضر',
                        'status' => 'تمت',
                        'date_start' => '2018-08-28',
                        'date_end' => '2018-08-28',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    240 => 
                    array (
                        'id' => 241,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'الوحده المحليه بمنيه محله الدمنه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تم استلام الطلب المقدم باسم السيده عفاف علي السيد بدوي لتسليمه الي مجلس مدينه مركز المنصوره',
                        'status' => 'تمت',
                        'date_start' => '2018-09-01',
                        'date_end' => '2018-09-01',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    241 => 
                    array (
                        'id' => 242,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'مجلس مدينه مركز المنصوره',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تم التوجه الي م/محمد زاهر مدير الاداره الهندسيه بمجلس مدينه مركز المنصوره للاتفاق معم/رضا الموظف المختص غدا لاخذ موعد المعاينه',
                        'status' => 'تمت',
                        'date_start' => '2018-09-01',
                        'date_end' => '2018-09-01',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    242 => 
                    array (
                        'id' => 243,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'مبني ديوان عام المحافظه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استعلام',
                        
                    'result' => 'تم التوجه الي مبني المحافظه (قسم اداره ) التخطيط للقري والعشوائيات م/رمضان حجازي أكد أن المخطط التفصيلي لمركز منيه محله دمنه لم ينتهي من تحضيره حتي تاريخه وانه علي وشك الانتهاء في نهايه هذا العام وان الطلب المقدم من المواطنه التابعه لمنيه محله الدمنه انما هي شكوي من تضررها من شارع مفتوح علي منزلها وانها تقدمت بشكوي الي سكرتير عام المحافظه لعمل معاينه للشارع اما بخصوص طلب السيده /عفاف بدوي فأن المهندس رمضان أكد أنه لايجوز استخراج رخصه بناء سور الابعد عمل المخطط التفصيلي للتقرير تحسبا لأي اضرار قد تقع في المستقبل علي المواطنين المجاورين لهم وحتي اذا قامت بتقديم طلب للمحافظه فإن ردها علي الطلب بتراخيص في انتظار المخطط التفصيلي اما المهندسه المختصه بالمخطط هيا م/نرمين',
                        'status' => 'تمت',
                        'date_start' => '2018-11-29',
                        'date_end' => '2018-11-29',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    243 => 
                    array (
                        'id' => 244,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'تنميه المحليات مركز مدينه المنصوره',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تم عرض الطلب علي الموظف المختص ا/رضا وبعد الاطلاع عليه تبين انه لم يتمكن من المعاينه او اصدار الترخيص لقطعه الارض نظرا لعدم وجود التقسيمات او المخطط التفصيلي للمنطقه وجاري استخراجه من المحافظه في غصون شهر او اتنين وتم الرد علي طلب الوحده المحليه بتوجيه استعجال الي المحافظه لعمل اللازم وسرعه استعجال المخطط التفصيلي',
                        'status' => 'تمت',
                        'date_start' => '2018-09-02',
                        'date_end' => '2018-09-02',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    244 => 
                    array (
                        'id' => 245,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'الوحده المحليه بمنيه محله الدمنه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                    'result' => 'الطلب المقدم  علي ترخيص السور يلزم لاستكماله توصيه للمهندس /محمد زاهر مدير الاداره الهندسيه للتوصيه عليه من مدير التخطيط بالوحده المحليه دون اللجوء الي التخطيط العمراني بالمحافظه نظرا لوجود نزاع بين اصحاب قطعه الارض (م/عفاف )والجيران الاملاصقين لها ونزول مهندس المعاينه مرتين وتعطيله عن القيام بمهامه وجاري متابعته من مركز مدينه المنصوره',
                        'status' => 'تمت',
                        'date_start' => '2018-09-03',
                        'date_end' => '2018-09-03',
                        'cost1' => '100.00',
                        'cost2' => '100.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    245 => 
                    array (
                        'id' => 246,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'محله الدمنه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استعلام',
                        
                        'result' => 'بالنسبه الي استكمال اجراءات الترخيص لسور قطع الارض فأن مجلس مدينه محله دمنه في انتظار المخطط التفصيلي لمركز مدينه محله دمنه أخر الشهر الحالي شهر 10 ورورده من المحافظه وجاري متابعته والاستعلام عنه',
                        'status' => 'تمت',
                        'date_start' => '2018-10-02',
                        'date_end' => '2018-10-02',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    246 => 
                    array (
                        'id' => 247,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'مركز مدينه منيه محله الدمنه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استعلام',
                        
                        'result' => 'لم يصل الي مركز مدينه محله دمنه حتي الان المخطط التفصيلي للمدينه وجاري متابعتها مع الموظف المختص ا/جمال',
                        'status' => 'تمت',
                        'date_start' => '2018-10-28',
                        'date_end' => '2018-10-28',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    247 => 
                    array (
                        'id' => 248,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'ديوان عام المحافظه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استعلام',
                        
                        'result' => 'تم سؤال رمان حجازي رئيس اداره تنظيم وتطوير القري والعشوائيات عن امكانيه تقديم طلب الي سكرتير عام محافظه الدقهليه بخصوص الموافقه علي ترخيص سور لقطعه الارض الخاصه بالمواطنه عفاف علي السيد الاانه وضع انه جاري الانتهاء من المخطط التفصيلي لمركز منيه محله دمنه وانه يمكن تقديم طلب الاانه لم يتم النظر فيه دون وجود مخطط تفصيلي ولامانع من تقديم طلب لكن سيكون دون جدوي والرجوع في ذلك لاستاذ عبد الحميد',
                        'status' => 'تمت',
                        'date_start' => '2018-12-09',
                        'date_end' => '2018-12-09',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    248 => 
                    array (
                        'id' => 249,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'ديوان عام المحافظه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تم السؤال عن الشكوي رقم 1421856 في 12/12/2018 بالرقم القومي للمواطنه وجد أنه مازالت في القاهره ولم يتم توجيهها من هناك للبت فيها وتم عمل استعجال للشكوي والتواصل مع الخط الساخن لارسال الشكوي الي الجهه المنوط بها التعامل معها',
                        'status' => 'تمت',
                        'date_start' => '2019-01-15',
                        'date_end' => '2019-01-15',
                        'cost1' => '100.00',
                        'cost2' => '25.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    249 => 
                    array (
                        'id' => 250,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'ديوان عام المحافظه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'سيتم تقديم طلب بالموافقه علي استخراج ترخيص السور لقطعه الارض الخاصه بالمواطنه يوم الاربعاء 12/12/2018 باسم سكرتير عام المحافظه مرفق طيه صوره من بطاقه الرقم القومي للمواطنه',
                        'status' => 'تمت',
                        'date_start' => '2018-12-10',
                        'date_end' => '2018-12-10',
                        'cost1' => '100.00',
                        'cost2' => '16.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    250 => 
                    array (
                        'id' => 251,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'ديوان المحافظه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'تقديم طلب ترخيص',
                        
                        'result' => 'تم تقديم طلب ترخيص سور قطعه الارض الخاصه بالمواطنه بمكتب خدمه المواطنين  بالمحافظه والذي قيد برقم 1421856 بتاريخ 12/12/2018 وسوف يتم مخاطبه رئاسه مجلس الوزراء بشأن هذا الطلب والذي عليسه يقوم مجلس الوزراء بمخاطبه الوحده المحليه بمنيه محله الدمنه والذي تتولي الرد عليهم ثم تقوم رئاسه مجلس  الوزراءبالرد علي المحافظه وذلك في غصون 21 يوما وقد تم ترك التلفون لموافاتنا بأخر التغييرات',
                        'status' => 'تمت',
                        'date_start' => '2018-12-12',
                        'date_end' => '2018-12-12',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    251 => 
                    array (
                        'id' => 252,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'ديوان عام المحافظه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استعلام',
                        
                        'result' => 'الطلب الخاص بالمواطنه /عفاف السيد بدوي برقم 1421856بتاريخ 12/12/2018 لم يتم الرد عليه من قبل البوابه الالكترونيه لمجلس الوزراء وجاري المتابعه',
                        'status' => 'تمت',
                        'date_start' => '2019-01-01',
                        'date_end' => '2019-01-01',
                        'cost1' => '100.00',
                        'cost2' => '16.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    252 => 
                    array (
                        'id' => 253,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'ديوان عام محافظه الدقهليه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'استلام ومتابعه',
                        
                        'result' => 'بالسؤال في مكتب خدمه المواطنين بديوان عام المحافظه بالطلب رقم 1421856 بتاريخ 12/12/2018 لم نستطع الوصول له عبر الصفحه الخاصه بالمحافظه لعدم وجود الرقم القومي الخاص بالمواطنه لذلك يلزم احضار صوره من الرقم القومي لادخاله علي الصفحه والمتابعه للطلب',
                        'status' => 'تمت',
                        'date_start' => '2019-01-10',
                        'date_end' => '2019-01-10',
                        'cost1' => '100.00',
                        'cost2' => '35.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    253 => 
                    array (
                        'id' => 254,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'ديوان عام المحافظه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه الشكوي',
                        
                        'result' => 'حتي الان لم يصل المخطط التفصيلي لمنيه محله دمنه الاانه هناك قري تابعه لها وصل لها المخطط وهناك قري تحت التجهيز لارسال المخطط التفصيلي لها اخر الشهر ومرفقه طيه ورقه بها القري التي بها المخطط التفصيلي والاخري تحت التجهيز اما بخصوص مخطط منيه محله دمنه فانه مازال قيد الاشهار والمحافظه في انتظار وصوله من القاهره',
                        'status' => 'تمت',
                        'date_start' => '2019-02-07',
                        'date_end' => '2019-02-07',
                        'cost1' => '100.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    254 => 
                    array (
                        'id' => 255,
                        'service_id' => 30,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'المحافظه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'null',
                        'status' => 'تمت',
                        'date_start' => '2019-02-28',
                        'date_end' => '2019-02-28',
                        'cost1' => '0.00',
                        'cost2' => '0.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    255 => 
                    array (
                        'id' => 256,
                        'service_id' => 32,
                        'title' => NULL,
                        'lawyer_id' => 1,
                        
                        'procedure_place_name' => 'شركه الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'عمل ظبطيه',
                        
                        'result' => 'تم ذهاب الاستاذ ايمن المحاسب الي شركه الكهربا وتم التقديم علي عداد كهربا وتم سداد مبلغ 1050 وتم استلام الايصال',
                        'status' => 'تمت',
                        'date_start' => '2023-10-10',
                        'date_end' => '2023-10-10',
                        'cost1' => '0.00',
                        'cost2' => '0.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    256 => 
                    array (
                        'id' => 257,
                        'service_id' => 32,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'شركه الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'عمل الطلب',
                        
                        'result' => 'تم رفع الطلب عالمنصه للتقديم علي العداد',
                        'status' => 'تمت',
                        'date_start' => '2023-10-16',
                        'date_end' => '2023-10-16',
                        'cost1' => '0.00',
                        'cost2' => '25.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    257 => 
                    array (
                        'id' => 258,
                        'service_id' => 32,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'شركه الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تم الذهاب لشركه الكهربا لتحديد معاينه وتم الذهاب للموظف المسؤل عن المعاينه وتم التحدث معه وطلب الاتي صوره كاملا للعقار ملونه-صور التوصيلات-صوره للمكتب مكان العداد وتم الذهاب لاستاذ زكريا لرفعه للمعاينه ولكن استاذ زكريا طلب رفع اصل العقد والايصال علي المنصه حيث ان المرفوع عالسيستم هو صور مش اصول وجاري عمل الطلب لتحديد معاينه',
                        'status' => 'تمت',
                        'date_start' => '2023-10-22',
                        'date_end' => '2023-10-22',
                        'cost1' => '0.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    258 => 
                    array (
                        'id' => 259,
                        'service_id' => 32,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'منصه الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'عمل طلب جديد',
                        
                        'result' => 'تم عمل طلب جديدوتم رفع اصل الايصال والعقد',
                        'status' => 'تمت',
                        'date_start' => '2023-10-24',
                        'date_end' => '2023-10-24',
                        'cost1' => '0.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    259 => 
                    array (
                        'id' => 260,
                        'service_id' => 32,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'شركه الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه مع الموظف',
                        
                        'result' => 'تم الذهاب الي استاذ زكريا وتم طبع الطلب وتسليمه للمعاينه مع استاذ سيد مرفق به صوره المكتب والمبني والتوصيلا وتم تحديد المعاينه يوم السبت',
                        'status' => 'تمت',
                        'date_start' => '2023-10-25',
                        'date_end' => '2023-10-25',
                        'cost1' => '0.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    260 => 
                    array (
                        'id' => 261,
                        'service_id' => 32,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'شركه الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'معاينه',
                        
                        'result' => 'تم التواصل مع المعاين وتم عمل المعاينه الساعه 3 عصرا',
                        'status' => 'تمت',
                        'date_start' => '2023-10-28',
                        'date_end' => '2023-10-28',
                        'cost1' => '0.00',
                        'cost2' => '100.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    261 => 
                    array (
                        'id' => 262,
                        'service_id' => 32,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'المكتب',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'اطلاع',
                        
                        'result' => 'تم التواصل  مع المعاين وتم اعطاءه صوره من اصل عقد العقار وسيتم المتابعه',
                        'status' => 'تمت',
                        'date_start' => '2023-10-31',
                        'date_end' => '2023-10-31',
                        'cost1' => '0.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    262 => 
                    array (
                        'id' => 263,
                        'service_id' => 32,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تم حضور المعاين لتحديد المساحه وقام بقياس السطح بالكامل وجاري المتابعه',
                        'status' => 'تمت',
                        'date_start' => '2023-11-15',
                        'date_end' => '2023-11-16',
                        'cost1' => '0.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    263 => 
                    array (
                        'id' => 264,
                        'service_id' => 32,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الفوري',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'سداد المعاينه',
                        
                        'result' => 'تم سداد المعاينه وجاري المتابعه',
                        'status' => 'تمت',
                        'date_start' => '2023-11-20',
                        'date_end' => '2023-11-20',
                        'cost1' => '0.00',
                        'cost2' => '110.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    264 => 
                    array (
                        'id' => 265,
                        'service_id' => 32,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'المنصه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'اجراء',
                        
                        'result' => 'تم سداد مبلغ 6400 تمن العداد ومبلغ 1800 فرق سكني من اداري بالفوري وتم طبع اوراق البيان ا/ب مرفق بها اصل العقد الازرق واعطائها لاستاذ ايمن المحاسب لاسكتمال المطلوب لاستلام العدادحيث ان العداد تم صرفه من المخزن',
                        'status' => 'تمت',
                        'date_start' => '2023-11-24',
                        'date_end' => '2023-11-24',
                        'cost1' => '0.00',
                        'cost2' => '0.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    265 => 
                    array (
                        'id' => 266,
                        'service_id' => 32,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                    'result' => 'تم الذهاب الي الشركه لاستكمال الاجراءات للعداد وتم التواصل مع قسم التركيبات والتواصل مع المختص واتفقنا معه علي تركيب العداد بعد ساعتين (الساعه 11) وتم التواصل معه بعد ساعتين وتم حضور ا/اسلام وتم توصيل العداد',
                        'status' => 'تمت',
                        'date_start' => '2023-11-28',
                        'date_end' => '2023-11-28',
                        'cost1' => '0.00',
                        'cost2' => '0.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    266 => 
                    array (
                        'id' => 267,
                        'service_id' => 33,
                        'title' => NULL,
                        'lawyer_id' => 3,
                        
                        'procedure_place_name' => 'المرور',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'سداد غرامه',
                        
                        'result' => 'تم الذهاب الي المرور وتم سداد الغرامه بمبلغ 1145 وتم سدادها بالفيزا كارت مبلغ 1245 جنيه',
                        'status' => 'تمت',
                        'date_start' => '2022-07-24',
                        'date_end' => '2022-07-24',
                        'cost1' => '0.00',
                        'cost2' => '1800.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    267 => 
                    array (
                        'id' => 268,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'ضبطيه قضائيه',
                        
                    'result' => 'تم عمل ضبطيه قضائيه لعدادات الدور السحري  في عماره جرين بلازا قناه السويس (متبقي 200 )',
                        'status' => 'تمت',
                        'date_start' => '2021-10-30',
                        'date_end' => '2021-10-30',
                        'cost1' => '0.00',
                        'cost2' => '3100.00',
                        'cost3' => '100.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    268 => 
                    array (
                        'id' => 269,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 2,
                        
                        'procedure_place_name' => 'المنصه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'تقديم علي العدادات علي المنصه الرقميه للكهربا',
                        
                        'result' => 'تم التقديم  بتاريخ 12/1/2022  طلبات برقم 2063487-2063504',
                        'status' => 'تمت',
                        'date_start' => '2022-01-19',
                        'date_end' => '2022-01-19',
                        'cost1' => '0.00',
                        'cost2' => '0.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    269 => 
                    array (
                        'id' => 270,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                    'procedure_place_name' => 'شركه الكهربا (الاستاد)',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'تجديد العداد',
                        
                        'result' => 'تم السداد من شهر 12/12/2022 حتي 30/5/2022 بمبلغ 500 جنيه للشقتين تجديد شهري',
                        'status' => 'تمت',
                        'date_start' => '2022-05-30',
                        'date_end' => '2022-05-30',
                        'cost1' => '0.00',
                        'cost2' => '0.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    270 => 
                    array (
                        'id' => 271,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'سداد مبلغ 4000 جنيه لتحويله من سكني لاداري',
                        
                        'result' => 'تم السداد وتم تقديم طلب جديد بتحويل من سكني لاداري وتم تقديمه لمدام هبه لاضافته عالكمبيوتر وسيتم المتابعه نص الاسبوع',
                        'status' => 'تمت',
                        'date_start' => '2022-05-31',
                        'date_end' => '2022-05-31',
                        'cost1' => '0.00',
                        'cost2' => '30.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    271 => 
                    array (
                        'id' => 272,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تمت المتابعه مع استاذ فؤاد وسيتم ارسال رساله نصيه بسداد المعاينه',
                        'status' => 'تمت',
                        'date_start' => '2022-06-07',
                        'date_end' => '2022-06-07',
                        'cost1' => '0.00',
                        'cost2' => '30.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    272 => 
                    array (
                        'id' => 273,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تم الذهاب للشركه للمتابعه مع استاذ فؤاد وابلغنا بانه تم ارسال الرساله علي ان تنتهي صلاحيتها الخميس 11/8',
                        'status' => 'تمت',
                        'date_start' => '2022-08-08',
                        'date_end' => '2022-08-08',
                        'cost1' => '0.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    273 => 
                    array (
                        'id' => 274,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'المنصه',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تم سداد رسوم معاينه العدادات',
                        'status' => 'تمت',
                        'date_start' => '2022-08-09',
                        'date_end' => '2022-08-09',
                        'cost1' => '0.00',
                        'cost2' => '200.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    274 => 
                    array (
                        'id' => 275,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'متابعه',
                        
                        'result' => 'تم المتابعه مع الموظف المسؤل وابلغنا بدفع تجديد العداد وقدره 700 جنيه للعدادين',
                        'status' => 'تمت',
                        'date_start' => '2022-08-10',
                        'date_end' => '2022-08-10',
                        'cost1' => '0.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    275 => 
                    array (
                        'id' => 276,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'سداد التجديد',
                        
                        'result' => 'تم سداد مبلغ 700 جنيه تجديد شهر 7 و8',
                        'status' => 'تمت',
                        'date_start' => '2022-08-11',
                        'date_end' => '2022-08-11',
                        'cost1' => '0.00',
                        'cost2' => '800.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    276 => 
                    array (
                        'id' => 277,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                    'job' => 'دفع تمن العدادات (7500جنيه)',
                        
                        'result' => 'تم طلب اصل العقد من قبل الموظف ووجد ان الشقق رقم 4/5 بالعقد حيث ان الشقه رقم 4 باسم عبد العزيز سامي وتم تصليح الطالبين الي 5/6 وسيتم تغيير العقد من 4 الي 6 وايصال التجديد علي ان يتم السداد',
                        'status' => 'تمت',
                        'date_start' => '2022-08-14',
                        'date_end' => '2022-08-14',
                        'cost1' => '0.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    277 => 
                    array (
                        'id' => 278,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'اجراء',
                        
                        'result' => 'تم تحويل العداد من سكني الي اداري وتم سداد مبلغ 4000 جنيه رسوم التحويل',
                        'status' => 'تمت',
                        'date_start' => '2022-05-31',
                        'date_end' => '2022-05-31',
                        'cost1' => '0.00',
                        'cost2' => '4000.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    278 => 
                    array (
                        'id' => 279,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'اجراء',
                        
                        'result' => 'تم تسليم اصل العقد للتاكد من خلوه من اي غلط لتسليم صوره طبق الاصل للموظف المسؤل',
                        'status' => 'تمت',
                        'date_start' => '2022-08-16',
                        'date_end' => '2022-08-16',
                        'cost1' => '0.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    279 => 
                    array (
                        'id' => 280,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'اجراء',
                        
                        'result' => 'تم تسليم ايصال الضبطيه للتصحيح من شقه 4 الي شقه 5 وتم ختمه',
                        'status' => 'تمت',
                        'date_start' => '2022-08-16',
                        'date_end' => '2022-08-16',
                        'cost1' => '0.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    280 => 
                    array (
                        'id' => 281,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'تصوير',
                        
                        'result' => 'تم طبع وتصوير كلا من الايصالات المرفقه بالملف واصل العقدين',
                        'status' => 'تمت',
                        'date_start' => '2022-08-17',
                        'date_end' => '2022-08-17',
                        'cost1' => '0.00',
                        'cost2' => '50.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    281 => 
                    array (
                        'id' => 282,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'دفع العداد',
                        
                    'result' => 'تم تسليم صوره من عقدين الشقق وصوره من ايصال الضبطيه وصوره رسوم الدفع وتم سداد العدادات وكذلك التيار الكهربائي (3250 تمن العدادات-4000 توصيل التيار)',
                        'status' => 'تمت',
                        'date_start' => '2022-08-17',
                        'date_end' => '2022-08-17',
                        'cost1' => '0.00',
                        'cost2' => '7500.00',
                        'cost3' => '100.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                    282 => 
                    array (
                        'id' => 283,
                        'service_id' => 34,
                        'title' => NULL,
                        'lawyer_id' => 5,
                        
                        'procedure_place_name' => 'الكهربا',
                        'procedure_place_type_id' => NULL,
                        
                        'job' => 'اطلاع',
                        
                        'result' => 'العداد في التركيبات',
                        'status' => 'تمت',
                        'date_start' => '2022-08-30',
                        'date_end' => '2022-08-30',
                        'cost1' => '0.00',
                        'cost2' => '20.00',
                        'cost3' => '0.00',
                        'created_by' => 1,
                        'updated_by' => NULL,
                        'created_at' => NULL,
                        'updated_at' => NULL,
                    ),
                ));
        
        
    }
}