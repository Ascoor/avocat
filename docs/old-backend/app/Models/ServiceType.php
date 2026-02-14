<?php 


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ServiceType extends Model
{
    use HasFactory;
    protected $table = 'service_types';
    protected $fillable = ['name'];


    public function service()
    {
        return $this->morphMany(Service::class, 'service');
    }

}