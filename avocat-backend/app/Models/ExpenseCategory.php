<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ExpenseCategory extends Model
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

    protected $casts = [
        'is_system' => 'boolean',
        'is_active' => 'boolean',
        'is_locked' => 'boolean',
        'deleted_at' => 'datetime',
    ];

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
