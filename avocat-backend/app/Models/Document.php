<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'file_path',
        'document_tab_id',
        'client_id',
        'leg_case_id',
        'power_of_attorney_id',
        'service_id',
    ];

    public function tab(): BelongsTo
    {
        return $this->belongsTo(DocumentTab::class, 'document_tab_id');
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function legCase(): BelongsTo
    {
        return $this->belongsTo(LegCase::class);
    }

    public function powerOfAttorney(): BelongsTo
    {
        return $this->belongsTo(PowerOfAttorney::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function links(): HasMany
    {
        return $this->hasMany(Documentable::class);
    }
}
