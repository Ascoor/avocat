<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Unclient extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'email',
        'phone_number',
        'address',
        'work',
        'emergency_number',
        'date_of_birth',
        'gender',
        'religion',
        'identity_number',
    ];

    public function services()
    {
        return $this->belongsToMany(Service::class, 'service_unclient', 'unclient_id', 'service_id');
    }
}