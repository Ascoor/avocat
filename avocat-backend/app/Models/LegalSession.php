<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LegalSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'court_session',
        'legal_session_type_id',
        'leg_case_id',
        'court_id',
        'session_date',
        'cost1',
        'cost2',
        'cost3',
        'session_roll',
        'Judgment_operative',
        'status',
        'lawyer_id',
        'orders',
        'result',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'session_date' => 'date',
        'cost1' => 'decimal:2',
        'cost2' => 'decimal:2',
        'cost3' => 'decimal:2',
    ];

    public function legalSessionType(): BelongsTo 
    {
        return $this->belongsTo(LegalSessionType::class);
    }

    public function legCase(): BelongsTo
    {
        return $this->belongsTo(LegCase::class);
    }

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
    }

    public function lawyer(): BelongsTo
    {
        return $this->belongsTo(Lawyer::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
