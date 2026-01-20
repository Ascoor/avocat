<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class DocType extends Model
{
    protected $fillable = ['name'];

    public function docSubTypes()
    {
        return $this->hasMany(DocSubType::class);
    }

    public function legalDocs()
    {
        return $this->hasMany(LegalDoc::class);
    }
}
