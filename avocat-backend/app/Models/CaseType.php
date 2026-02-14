<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CaseType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function subTypes(): HasMany
    {
        return $this->hasMany(CaseSubType::class);
    }

    public function legCases(): HasMany
    {
        return $this->hasMany(LegCase::class);
    }
}
