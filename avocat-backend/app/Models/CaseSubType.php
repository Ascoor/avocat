<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CaseSubType extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'office_id',
        'is_system',
        'parent_id',
        'is_active',
        'sort_order',
        'case_type_id',
    ];

    public function caseType(): BelongsTo
    {
        return $this->belongsTo(CaseType::class);
    }

    public function legCases(): HasMany
    {
        return $this->hasMany(LegCase::class);
    }
}
