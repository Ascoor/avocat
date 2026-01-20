<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcedurePlaceType extends Model
{
    protected $fillable = ['name'];
    use HasFactory;
    public function procedures()
    {
        return $this->hasMany(Procedure::class);
    }

}
