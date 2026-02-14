<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class LegalDoc extends Model
{
    protected $fillable = ['description','path', 'doc_type_id','thumbnail_path','doc_sub_type_id'];

    public function docType()
    {
        return $this->belongsTo(DocType::class);
    }

    public function docSubType()
    {
        return $this->belongsTo(DocSubType::class);
    }
}
