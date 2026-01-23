<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InvoicesSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        // Safe with FK
        DB::table('invoices')->delete();

        $caseId = DB::table('leg_cases')->value('id');
        $serviceId = DB::table('services')->value('id'); // لازم خدمة موجودة لو العمود مش nullable

        if (!$caseId || !$serviceId) {
            return;
        }

        DB::table('invoices')->insert([
            [
                'leg_case_id' => $caseId,
                'service_id' => $serviceId,
                'invoice_number' => 'INV-0001',
                'status' => 'Sent',
                'issue_date' => $now->toDateString(),
                'due_date' => $now->copy()->addDays(14)->toDateString(),
                'total_amount' => 1200.00,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
