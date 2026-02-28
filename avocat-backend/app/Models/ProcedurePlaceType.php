<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProcedurePlaceType extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'office_id',
        'is_system',
        'parent_id',
        'is_active',
        'sort_order',
    ];

    public function procedures(): HasMany
    {
        return $this->hasMany(Procedure::class);
    }

    public function serviceProcedures(): HasMany
    {
        return $this->hasMany(ServiceProcedure::class);
    }
}
