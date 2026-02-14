<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlertNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'financial_receivable_id',
        'leg_case_id',
        'title',
        'description',
        'status',
        'alert_level',
        'date_start',
        'date_end',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function financialReceivable()
    {
        return $this->belongsTo(FinancialReceivable::class);
    }

    public function legCase()
    {
        return $this->belongsTo(LegCase::class);
    }
}
