<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'client_id',
        'client_secret',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'client_secret',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function createdLegCases(): HasMany
    {
        return $this->hasMany(LegCase::class, 'created_by');
    }

    public function updatedLegCases(): HasMany
    {
        return $this->hasMany(LegCase::class, 'updated_by');
    }

    public function createdProcedures(): HasMany
    {
        return $this->hasMany(Procedure::class, 'created_by');
    }

    public function updatedProcedures(): HasMany
    {
        return $this->hasMany(Procedure::class, 'updated_by');
    }

    public function createdLegalSessions(): HasMany
    {
        return $this->hasMany(LegalSession::class, 'created_by');
    }

    public function createdLegalAds(): HasMany
    {
        return $this->hasMany(LegalAd::class, 'created_by');
    }

    public function updatedLegalAds(): HasMany
    {
        return $this->hasMany(LegalAd::class, 'updated_by');
    }

    public function createdServices(): HasMany
    {
        return $this->hasMany(Service::class, 'created_by');
    }

    public function updatedServices(): HasMany
    {
        return $this->hasMany(Service::class, 'updated_by');
    }

    public function createdRevenues(): HasMany
    {
        return $this->hasMany(Revenue::class, 'created_by');
    }

    public function updatedRevenues(): HasMany
    {
        return $this->hasMany(Revenue::class, 'updated_by');
    }

    public function createdExpenses(): HasMany
    {
        return $this->hasMany(Expense::class, 'created_by');
    }
}
