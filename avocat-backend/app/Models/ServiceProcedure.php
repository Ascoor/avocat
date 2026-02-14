<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceProcedure extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'title',
        'lawyer_id',
        'job',
        'procedure_place_name',
        'procedure_place_type_id',
        'result',
        'note',
        'status',
        'event_id',
        'date_start',
        'date_end',
        'cost1',
        'cost2',
        'cost3',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'date_start' => 'date',
        'date_end' => 'date',
        'cost1' => 'decimal:2',
        'cost2' => 'decimal:2',
        'cost3' => 'decimal:2',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function lawyer(): BelongsTo
    {
        return $this->belongsTo(Lawyer::class);
    }

    public function procedurePlaceType(): BelongsTo
    {
        return $this->belongsTo(ProcedurePlaceType::class);
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
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
