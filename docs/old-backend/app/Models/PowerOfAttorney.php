<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PowerOfAttorney extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'client_id',
        'lawyer_insert',
        'attorney_num',
        'attorney_date',
        'attorney_type_id',
        'image',

        'attorney_chart',
        'attorney_place',
        'created_by',
        'updated_by',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function attorneyType()
    {
        return $this->belongsTo(AttorneyType::class, 'attorney_type_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
