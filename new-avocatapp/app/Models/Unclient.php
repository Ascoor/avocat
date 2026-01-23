<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Unclient extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'email',
        'phone_number',
        'address',
        'work',
        'emergency_number',
        'date_of_birth',
        'gender',
        'religion',
        'identity_number',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'service_unclient');
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class, 'unclients_id');
    }
}
