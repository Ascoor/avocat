<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentsSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $invoiceId = DB::table('invoices')->value('id');
        if (!$invoiceId) {
            return;
        }

        $rows = [
            [
                'invoice_id' => $invoiceId,
                'payment_date' => $now->toDateString(),
                'payment_method' => 'Cash',
                'amount' => 600.00,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        foreach ($rows as $row) {
            $identity = collect($row)->only(['invoice_id', 'payment_method', 'amount'])->all();

            if (! DB::table('payments')->where($identity)->exists()) {
                DB::table('payments')->insert($row);
            }
        }
    }
}
