<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'payment_date',
        'payment_method',
        'amount',
    ];

    protected $casts = [
        'payment_date' => 'date',
        'amount' => 'decimal:2',
    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    protected static function booted(): void
    {
        static::saved(function (Payment $payment): void {
            $invoice = $payment->invoice;
            $invoice?->updateStatus();

            if (! $invoice) {
                return;
            }

            FinancialTransaction::updateOrCreate(
                [
                    'source_type' => self::class,
                    'source_id' => $payment->id,
                    'type' => 'payment',
                ],
                [
                    'amount' => $payment->amount,
                    'occurred_at' => $payment->payment_date,
                    'description' => 'Payment received',
                    'leg_case_id' => $invoice->leg_case_id,
                    'service_id' => $invoice->service_id,
                ]
            );

            if ($invoice->leg_case_id) {
                app(\App\Services\Finance\FinancialTransactionService::class)->syncCaseTotals((int) $invoice->leg_case_id);
            }
        });

        static::deleted(function (Payment $payment): void {
            FinancialTransaction::where('source_type', self::class)
                ->where('source_id', $payment->id)
                ->where('type', 'payment')
                ->delete();

            $invoice = $payment->invoice;
            $invoice?->updateStatus();

            if ($invoice?->leg_case_id) {
                app(\App\Services\Finance\FinancialTransactionService::class)->syncCaseTotals((int) $invoice->leg_case_id);
            }
        });
    }
}
