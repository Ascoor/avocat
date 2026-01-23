<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DocType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function docSubTypes(): HasMany
    {
        return $this->hasMany(DocSubType::class);
    }

    public function legalDocs(): HasMany
    {
        return $this->hasMany(LegalDoc::class);
    }
}
