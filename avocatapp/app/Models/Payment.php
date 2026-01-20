<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{

    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'payment_date',
        'payment_method',
        'amount'
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    // Called whenever a payment is created or updated
    protected static function booted()
    {
        static::saved(function ($payment) {
            $payment->invoice->updateStatus();
        });
    }
}
