<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class FinancialTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'office_id',
        'type',
        'amount',
        'currency',
        'occurred_at',
        'description',
        'note',
        'category_type',
        'category_id',
        'leg_case_id',
        'service_id',
        'source_type',
        'source_id',
        'created_by',
        'updated_by',
        'status',
        'metadata',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'occurred_at' => 'datetime',
        'metadata' => 'array',
    ];

    public function legCase(): BelongsTo
    {
        return $this->belongsTo(LegCase::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function source(): MorphTo
    {
        return $this->morphTo(__FUNCTION__, 'source_type', 'source_id');
    }
}
