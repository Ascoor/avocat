<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourtType extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // علاقة واحد إلى كثير مع المحاكم
    public function courts()
    {
        return $this->hasMany(Court::class);
    }


}
