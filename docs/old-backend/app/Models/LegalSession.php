<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegalSession extends Model
{
    protected $fillable = [
        'leg_case_id', 'status', 'court_id', 'session_date', 'session_roll',
        'lawyer_id', 'orders', 'result', 'created_by', 'legal_session_type_id',
        'cost1', 'cost2', 'cost3'
    ];

    public function legCase()
    {
        return $this->belongsTo(LegCase::class);
    }

    public function legalSessionType()
    {
        return $this->belongsTo(LegalSessionType::class);
    }
    public function court()
    {
        return $this->belongsTo(Court::class);
    }

    public function lawyer()
    {
        return $this->belongsTo(Lawyer::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}