<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DocSubType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'doc_type_id',
    ];

    public function docType(): BelongsTo
    {
        return $this->belongsTo(DocType::class);
    }

    public function legalDocs(): HasMany
    {
        return $this->hasMany(LegalDoc::class);
    }
}
