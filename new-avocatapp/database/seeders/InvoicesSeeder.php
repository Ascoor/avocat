<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InvoicesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('invoices')->insert([
            [
                'leg_case_id' => 1,
                'service_id' => null,
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
