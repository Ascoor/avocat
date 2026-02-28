<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'description',
        'service_place_name',
        'service_year',
        'created_by',
        'updated_by',
        'status',
        'service_type_id',
    ];

    public function serviceType(): BelongsTo
    {
        return $this->belongsTo(ServiceType::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function clients(): BelongsToMany
    {
        return $this->belongsToMany(Client::class, 'service_client');
    }

    public function unclients(): BelongsToMany
    {
        return $this->belongsToMany(Unclient::class, 'service_unclient');
    }

    public function serviceProcedures(): HasMany
    {
        return $this->hasMany(ServiceProcedure::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }
}
