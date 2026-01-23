<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentsSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('payments')->insert([
            [
                'invoice_id' => 1,
                'payment_date' => $now->toDateString(),
                'payment_method' => 'Cash',
                'amount' => 600.00,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
