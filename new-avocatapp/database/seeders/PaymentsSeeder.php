<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentsSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        // Safe with FK
        DB::table('payments')->delete();

        $invoiceId = DB::table('invoices')->value('id');
        if (!$invoiceId) {
            return;
        }

        DB::table('payments')->insert([
            [
                'invoice_id' => $invoiceId,
                'payment_date' => $now->toDateString(),
                'payment_method' => 'Cash',
                'amount' => 600.00,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
