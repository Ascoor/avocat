<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Service extends Model
{
    use HasFactory;

    protected $table = 'services';

    protected $fillable = [
        'slug', // Add 'service_no' to the fillable attributes
 
        'service_type_id',
        'description',
        'service_place_name',
        'status',
        'service_year',
        'created_by',
        'updated_by',
    ];
public function serviceType()
{
    return $this->belongsTo(ServiceType::class, 'service_type_id');
}
    public function procedures()
    {
        return $this->hasMany(ServiceProcedure::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function lawyers()
    {
        return $this->belongsToMany(Lawyer::class);
    }

    public function clients()
    {
        return $this->belongsToMany(Client::class, 'service_client', 'service_id', 'client_id')
                    ->withTimestamps();
    }
    public function unclients()
{
    return $this->belongsToMany(Unclient::class, 'service_unclient', 'service_id', 'unclient_id');
}

    
}
