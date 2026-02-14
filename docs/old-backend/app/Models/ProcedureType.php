<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcedureType extends Model
{
    protected $fillable = ['name'];
    use HasFactory;
    public function procedures()
    {
        return $this->hasMany(Procedure::class);
    }
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
