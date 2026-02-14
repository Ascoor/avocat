<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LegalAd extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'results',
        'send_date',
        'receive_date',
        'lawyer_send_id',
        'lawyer_receive_id',
        'status',
        'leg_case_id',
        'legal_ad_type_id',
        'court_id',
        'cost1',
        'cost2',
        'cost3',
        'created_by',
        'updated_by',
    ];


    public function legalAdType()
    {
        return $this->belongsTo(LegalAdType::class, 'legal_ad_type_id');
    }
    public function legCase()
    {
        return $this->belongsTo(LegCase::class);
    }
    public function court()
    {
        return $this->belongsTo(Court::class, 'court_id');
    }

    public function lawyerSend() {
        return $this->belongsTo(Lawyer::class, 'lawyer_send_id');
    }
    
    public function lawyerReceive() {
        return $this->belongsTo(Lawyer::class, 'lawyer_receive_id');
    }
    
}
