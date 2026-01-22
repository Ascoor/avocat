<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Artisan;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
              // Automatically run the Passport install command after seeding
              Artisan::call('passport:install', ['--force' => true]);
              Artisan::call('optimize:clear');
              
              // Optionally, output the results of the Passport install to the console
              echo Artisan::output();
        // الأساسيات والبيانات المشتركة
        $this->call(UsersTableSeeder::class);
        $this->call(ClientsTableSeeder::class);
        $this->call(LawyerSeeder::class);
        $this->call(CourtTypesTableSeeder::class);
        $this->call(CourtLevelsTableSeeder::class);
        $this->call(LegalAdTypeSeeder::class);
        $this->call(LegalAdsTableSeeder::class);

        // الأنواع والفئات
        $this->call(CaseTypesTableSeeder::class);
        $this->call(CaseSubTypesTableSeeder::class);
        $this->call(LegalSessionTypesTableSeeder::class);
        $this->call(ProcedureTypesTableSeeder::class);
        $this->call(ProcedurePlaceTypesTableSeeder::class);
        $this->call(ServiceTypesTableSeeder::class);
         $this->call(AppealTypesSeeder::class);
        $this->call(AppealSubTypesSeeder::class);

        $this->call(LegalAdTypeSeeder::class);
        $this->call(LegalAdsTableSeeder::class);
        // البيانات المرتبطة بالحالات والإجراءات
        $this->call(CourtsTableSeeder::class);
        $this->call(LegCasesTableSeeder::class);
        $this->call(LegCaseClientTableSeeder::class);
        $this->call(LegCaseCourtTableSeeder::class);
        $this->call(ProceduresTableSeeder::class);
        $this->call(LegalSessionsTableSeeder::class);

        // الخدمات والعمليات
        $this->call(ServicesTableSeeder::class);
        $this->call(ServiceProceduresTableSeeder::class);

        // إضافة أي Seeders آخرين هنا
        // ...

        // تنبيه: تأكد من ترتيب الـSeeders بحسب التبعيات الموجودة بين الجداول
        $this->call(SearchCourtsTableSeeder::class);
        $this->call(SearchDegreesTableSeeder::class);
        $this->call(SearchCaseTypesTableSeeder::class);
        $this->call(ServiceClientTableSeeder::class);
    }
}
