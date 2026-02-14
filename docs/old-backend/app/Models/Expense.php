<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = [
        'service_id',
        'leg_case_id',
        'created_by',
        'legal_session_id',
        'expense_category_id',
        'description',
        'note',
        'expense_date',
        'client_id',
        'unclients_id',
             'amount'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function leg_case()
    {
        return $this->belongsTo(LegCase::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function legal_session()
    {
        return $this->belongsTo(LegalSession::class);
    }

    public function expense_category()
    {
        return $this->belongsTo(ExpenseCategory::class);
    }
    public function unclients(){

        return $this->belongsTo(unclients::class);
    }
    public function client()
    {
        return $this->belongsTo(Client::class);

    }

}
