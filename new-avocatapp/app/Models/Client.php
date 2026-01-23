<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'email',
        'phone_number',
        'address',
        'nationality',
        'work',
        'emergency_number',
        'date_of_birth',
        'gender',
        'religion',
        'identity_number',
        'status',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function legCases(): BelongsToMany
    {
        return $this->belongsToMany(LegCase::class, 'leg_case_client');
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'service_client');
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    public function powerOfAttorneys(): HasMany
    {
        return $this->hasMany(PowerOfAttorney::class);
    }
}
