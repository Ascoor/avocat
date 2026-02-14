<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceProcedure extends Model
{
    use HasFactory;
    protected $table = 'service_procedures';

    protected $fillable = [
        'title',
        'job',
        'result',
        'event_id',
        'note',
        'status',
        'date_start',
        'date_end',
        'cost1', 
        'cost2',
        'cost3',
        'procedure_place_name',
        'procedure_place_type_id',
        'created_by',
        'updated_by', 
        'lawyer_id'
        
        // Add other fields here
    ];

public function service()
{
    return $this->belongsTo(Service::class);
}

public function lawyer()
{
    return $this->belongsTo(Lawyer::class, 'lawyer_id');
}

public function event()
{
    return $this->belongsTo(Event::class);
}

public function createdBy()
{
    return $this->belongsTo(User::class, 'created_by');
}

}
