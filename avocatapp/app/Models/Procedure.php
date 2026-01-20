<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
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

        public function procedureType()
        {
            return $this->belongsTo(ProcedureType::class, 'procedure_type_id')->select('id', 'name');
        }

        public function procedurePlaceType()
        {
            return $this->belongsTo(ProcedurePlaceType::class, 'procedure_place_type_id')->select('id', 'name');
        }





        public function legCase()
        {
            return $this->belongsTo(LegCase::class);
        }

        public function lawyer()
        {
            return $this->belongsTo(Lawyer::class, 'lawyer_id')->select('id', 'name');
        }


        public function createdBy()
        {
            return $this->belongsTo(User::class, 'created_by');
        }
    }
