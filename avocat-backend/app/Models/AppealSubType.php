<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppealSubType extends Model
{
    protected $fillable = ['appeal_sub_type', 'appeal_type_id'];

    public function appealType()
    {
        return $this->belongsTo(AppealType::class);
    }
} 