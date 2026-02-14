<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Court extends Model
    {
    use HasFactory;
    protected $fillable = ['name', 'court_type_id', 'court_level_id'];
    public function court_type()
    {
        return $this->belongsTo(CourtType::class, 'court_type_id');
    }
    public function court_level()
{
    return $this->belongsTo(CourtLevel::class, 'court_level_id');
}


    // علاقة واحد إلى كثير مع الدوائر
    public function divisions()
    {
        return $this->hasMany(Division::class);
    }

    public function legCases()
{
    return $this->belongsToMany(LegCase::class)
                ->using(LegCaseCourt::class)
                ->withPivot([
                    'court_id',
                    'case_number',
                    'case_year'
                ]);
}
public function legalSessions()
{
    return $this->belongsToMany(LegalSession::class);
}

// في موديل Court
public function legalAds()
{
    return $this->hasMany(LegalAd::class, 'court_id');
}

    }
