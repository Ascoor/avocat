<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PowerType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'office_id',
        'is_system',
        'parent_id',
        'is_active',
        'sort_order',
        'is_locked',
        'deleted_at',
    ];
}
