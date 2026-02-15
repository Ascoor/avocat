<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LegalAd extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'results',
        'send_date',
        'receive_date',
        'lawyer_send_id',
        'legal_ad_type_id',
        'lawyer_receive_id',
        'status',
        'leg_case_id',
        'court_id',
        'cost1',
        'cost2',
        'cost3',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'send_date' => 'date',
        'receive_date' => 'date',
        'cost1' => 'decimal:2',
        'cost2' => 'decimal:2',
        'cost3' => 'decimal:2',
    ];

    public function legalAdType(): BelongsTo
    {
        return $this->belongsTo(LegalAdType::class);
    }

    public function legCase(): BelongsTo
    {
        return $this->belongsTo(LegCase::class); 
    }

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
    }

    public function lawyerSend() {
        return $this->belongsTo(Lawyer::class, 'lawyer_send_id');
    }
    
    public function lawyerReceive() {
        return $this->belongsTo(Lawyer::class, 'lawyer_receive_id');
    }
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
