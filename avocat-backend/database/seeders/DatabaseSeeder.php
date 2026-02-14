<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CourtTypesTableSeeder::class,
            CourtLevelsTableSeeder::class,
            CourtsTableSeeder::class,
            CaseTypesTableSeeder::class,
            CaseSubTypesTableSeeder::class,
            ProcedureTypesTableSeeder::class,
            ProcedurePlaceTypesTableSeeder::class,
            ServiceTypesTableSeeder::class,
            ServicesTableSeeder::class,
            AttorneyTypesTableSeeder::class,
            LegalSessionTypesTableSeeder::class,
            LegalAdTypeSeeder::class,
            RevenueCategories::class,
            ExpenseCategories::class,
            ClientsTableSeeder::class,
            LawyerSeeder::class,
            AppealTypesSeeder::class,
            AppealSubTypesSeeder::class,
            LegCasesTableSeeder::class,
            LegCaseClientTableSeeder::class,
            LegCaseCourtTableSeeder::class,
            ProceduresTableSeeder::class,
            LegalSessionsTableSeeder::class,
            LegalAdsTableSeeder::class,
            ServiceProceduresTableSeeder::class,
            RevenueSeeder::class,
            ExpensesSeeder::class,
            InvoicesSeeder::class,
            PaymentsSeeder::class,
            SearchCourtsTableSeeder::class,
            SearchDegreesTableSeeder::class,
            SearchCaseTypesTableSeeder::class,
            ServiceClientTableSeeder::class,
            UsersTableSeeder::class,
            PermissionsSeeder::class,
            RolesSeeder::class,
            SuperAdminUserSeeder::class,
        ]);
    }
}
