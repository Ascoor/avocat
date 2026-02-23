<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'leg_case_id',
        'created_by',
        'legal_session_id',
        'legal_ad_id',
        'expense_category_id',
        'client_id',
        'unclients_id',
        'description',
        'note',
        'expense_date',
        'amount',
    ];

    protected $casts = [
        'expense_date' => 'date',
        'amount' => 'array',
    ];

    public function setAmountAttribute($value): void
    {
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $value = $decoded;
            }
        }

        $this->attributes['amount'] = is_array($value) ? json_encode($value) : $value;
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function legCase(): BelongsTo
    {
        return $this->belongsTo(LegCase::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function legalSession(): BelongsTo
    {
        return $this->belongsTo(LegalSession::class);
    }

    public function legalAd(): BelongsTo
    {
        return $this->belongsTo(LegalAd::class);
    }

    public function expenseCategory(): BelongsTo
    {
        return $this->belongsTo(ExpenseCategory::class);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function unclient(): BelongsTo
    {
        return $this->belongsTo(Unclient::class, 'unclients_id');
    }
}
