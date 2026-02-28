<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'lawyer_insert',
        'image',
        'created_by',
        'updated_by',
        'attorney_type_id',
    ];

    protected $casts = [
        'attorney_date' => 'date',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function attorneyType(): BelongsTo
    {
        return $this->belongsTo(AttorneyType::class);
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
