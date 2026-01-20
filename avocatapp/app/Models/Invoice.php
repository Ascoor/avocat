<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'leg_case_id',
        'invoice_number',
        'status',
        'issue_date',
        'due_date',
        'total_amount'
    ];

    public function legCase()
    {
        return $this->belongsTo(LegCase::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    // Method to update status based on payment
    public function updateStatus()
    {
        $totalPayments = $this->payments->sum('amount');
        if ($totalPayments >= $this->total_amount) {
            $this->status = 'Paid';
        } elseif ($this->due_date < now()) {
            $this->status = 'Overdue';
        }
        $this->save();
    }
}
