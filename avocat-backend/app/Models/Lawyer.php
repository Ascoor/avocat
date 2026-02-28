<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lawyer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'birthdate',
        'identity_number',
        'law_reg_num',
        'lawyer_class',
        'email',
        'phone_number',
        'gender',
        'address',
        'religion',
        'user_id',
    ];

    protected $casts = [
        'birthdate' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function legCases(): BelongsToMany
    {
        return $this->belongsToMany(LegCase::class, 'leg_case_lawyer');
    }

    public function procedures(): HasMany
    {
        return $this->hasMany(Procedure::class);
    }

    public function legalSessions(): HasMany
    {
        return $this->hasMany(LegalSession::class);
    }

    public function powerOfAttorneys(): HasMany
    {
        return $this->hasMany(PowerOfAttorney::class);
    }

    public function serviceProcedures(): HasMany
    {
        return $this->hasMany(ServiceProcedure::class);
    }
}
