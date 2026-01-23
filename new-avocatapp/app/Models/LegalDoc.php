<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LegalDoc extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'thumbnail_path',
        'word_path',
        'pdf_path',
        'description',
        'doc_type_id',
        'doc_sub_type_id',
    ];

    public function docType(): BelongsTo
    {
        return $this->belongsTo(DocType::class);
    }

    public function docSubType(): BelongsTo
    {
        return $this->belongsTo(DocSubType::class);
    }
}
