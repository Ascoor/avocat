<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseSubType extends Model
{
    use HasFactory;
    protected $fillable = ['name','case_type_id'];
    public function caseType()
    {
        return $this->belongsTo(CaseType::class);
    }


/**
 * Get all of the leg_cases for the CaseSubType
 *
 * @return \Illuminate\Database\Eloquent\Relations\HasMany
 */
public function legCases()
{
    return $this->hasMany(LegCase::class);
}

}
