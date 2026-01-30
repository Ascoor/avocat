<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ServiceClient extends Pivot
{
    protected $table = 'service_client';
    protected $fillable = [
        'client_id',
        'service_id',


    ];
  

}
