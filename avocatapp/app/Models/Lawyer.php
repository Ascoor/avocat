<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Lawyer extends Authenticatable
{

    use HasFactory, HasApiTokens;


    protected $fillable = [
        'name',
        'birthdate',
        'identity_number',
        'law_reg_num',
        'lawyer_class',
        'email',
        'phone_number',
        'gender',
        'address',
        'religion',
'user_id',
        'password',
    ];

    protected $casts = [
        'birthdate' => 'date:Y-m-d', // Format the birthdate as 'YYYY-MM-DD'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function leg_cases()
    {
        return $this->belongsToMany(LegCase::class, 'leg_case_lawyer', 'lawyer_id', 'leg_case_id');
    }

    public function procedure()
    {
        return $this->belongsTo(Procedure::class);
    }

    public function legalSessions()
    {
        return $this->belongsToMany(LegalSession::class);
    }
// في موديل Lawyer
public function sentAds()
{
    return $this->hasMany(LegalAd::class, 'lawyer_send_id');
}

public function receivedAds()
{
    return $this->hasMany(LegalAd::class, 'lawyer_receive_id');
}

    public function ServiceProcedure()
    {
        return $this->belongsToMany(LegalSession::class);
    }
}
