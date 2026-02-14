<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AttorneyType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function powerOfAttorneys(): HasMany
    {
        return $this->hasMany(PowerOfAttorney::class);
    }
}
