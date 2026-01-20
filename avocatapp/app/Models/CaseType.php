<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseType extends Model
{
    use HasFactory;
    protected $fillable = ['name'];
   // CaseType model


public function legCases()
{
    return $this->hasMany(LegCase::class);
}

public function caseSubTypes()
{
    return $this->hasMany(CaseSubType::class, 'case_type_id');
}

}
