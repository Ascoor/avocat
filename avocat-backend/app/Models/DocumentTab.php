<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DocumentTab extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_ar',
        'name_en',
        'tab_type',
    ];

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class, 'document_tab_id');
    }
}
