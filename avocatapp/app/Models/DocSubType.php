<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class DocSubType extends Model
{
    protected $fillable = ['name', 'doc_type_id'];

    public function docType()
    {
        return $this->belongsTo(DocType::class,'doc_type_id');
    }

    public function legalDocs()
    {
        return $this->hasMany(LegalDoc::class);
    }
}
