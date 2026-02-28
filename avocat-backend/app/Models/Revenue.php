<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Revenue extends Model
{
    use HasFactory;

    protected $fillable = [
        'leg_case_id',
        'revenue_category_id',
        'created_by',
        'updated_by',
        'related_from',
        'amount',
        'description',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function legCase(): BelongsTo
    {
        return $this->belongsTo(LegCase::class);
    }

    public function revenueCategory(): BelongsTo
    {
        return $this->belongsTo(RevenueCategory::class);
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
