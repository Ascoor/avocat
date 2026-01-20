<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug', // Add 'slug' to the $fillable property
        'name', // Add 'name' to the $fillable property
        'gender',
        'email',
        'phone_number',
        'emergency_number',
        'address',
        'nationality',
        'identity_number',
        'work',
        'date_of_birth',
        'religion',
        'status',
    ];
    public function legCases()
    {
        return $this->belongsToMany(LegCase::class,'leg_case_client')
                    ->using(LegCaseClient::class)
                    ->withPivot([
                        "client_id",

                    ]);
    }


        public function services()
        {
            return $this->belongsToMany(Service::class, 'service_client', 'client_id', 'service_id')
                        ->withTimestamps();
        }
       


        public function invoices()
        {
            return $this->hasMany(Invoice::class);
        }

        public function expenses()
        {
            return $this->hasMany(Expense::class);
        }

}
