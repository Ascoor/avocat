<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CaseSubType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
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
