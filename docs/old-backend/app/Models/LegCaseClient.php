<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class LegCaseClient extends Pivot
{
    protected $table = 'leg_case_client';
    protected $fillable = [
        'client_id',


    ];
    public function legCase()
    {
        return $this->belongsTo(LegCase::class);
    }

}
