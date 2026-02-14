<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttorneyType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function powerOfAttorneys()
    {
        return $this->hasMany(PowerOfAttorney::class);
    }
}
