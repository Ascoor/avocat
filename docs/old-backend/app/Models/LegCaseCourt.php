<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class LegCaseCourt extends Pivot
{
    protected $table = 'leg_case_court';
    protected $fillable = [
        'leg_case_id',
        'case_number',
        'case_year',
        'court_id'
    ];


    public function legCase()
    {
        return $this->belongsTo(LegCase::class);
    }

    public function court()
    {
        return $this->belongsTo(Court::class);
    }
}