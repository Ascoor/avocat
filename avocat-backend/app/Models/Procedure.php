<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Procedure extends Model
{
    use HasFactory;

    protected $fillable = [
        'procedure_type_id',
        'leg_case_id',
        'procedure_place_name',
        'procedure_place_type_id',
        'lawyer_id',
        'job',
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

    public function procedureType(): BelongsTo
    {
        return $this->belongsTo(ProcedureType::class);
    }

    public function procedurePlaceType(): BelongsTo
    {
        return $this->belongsTo(ProcedurePlaceType::class);
    }

    public function legCase(): BelongsTo
    {
        return $this->belongsTo(LegCase::class);
    }

    public function lawyer(): BelongsTo
    {
        return $this->belongsTo(Lawyer::class);
    }

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
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
