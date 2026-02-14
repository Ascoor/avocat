<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Revenue extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'leg_case_id',
        'amount',
        'description',
        'revenue_category_id',
        'client_id',
        'unclients_id'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function legCase()
    {
        return $this->belongsTo(LegCase::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function unclients()
    {
        return $this->belongsTo(unclients::class);
    }

    public function revenueCategory()
    {
        return $this->belongsTo(RevenueCategory::class);
    }
}
