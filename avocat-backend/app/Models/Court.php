<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Court extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'court_type_id',
        'court_level_id',
    ];

    public function courtType(): BelongsTo
    {
        return $this->belongsTo(CourtType::class);
    }

    public function courtLevel(): BelongsTo
    {
        return $this->belongsTo(CourtLevel::class);
    }

    public function divisions(): HasMany
    {
        return $this->hasMany(Division::class);
    }

    public function legCases(): BelongsToMany
    {
        return $this->belongsToMany(LegCase::class, 'leg_case_court')
            ->withPivot(['case_number', 'case_year']);
    }
}
