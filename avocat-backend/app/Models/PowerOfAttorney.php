<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PowerOfAttorney extends Model
{
    use HasFactory;

    protected $fillable = [
        'attorney_num',
        'attorney_date',
        'attorney_chart',
        'attorney_place',
        'title',
        'description',
        'client_id',
        'lawyer_id',
        'lawyer_insert',
        'image',
        'created_by',
        'updated_by',
        'attorney_type_id',
        'status',
        'expires_at',
    ];

    protected $casts = [
        'attorney_date' => 'date',
        'expires_at' => 'date',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function attorneyType(): BelongsTo
    {
        return $this->belongsTo(AttorneyType::class);
    }

    public function lawyer(): BelongsTo
    {
        return $this->belongsTo(Lawyer::class);
    }

    public function legCases(): BelongsToMany
    {
        return $this->belongsToMany(LegCase::class, 'leg_case_power_of_attorney');
    }

    public function legalDocs(): HasMany
    {
        return $this->hasMany(LegalDoc::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
