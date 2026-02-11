<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LegCase extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_deleted',
        'slug',
        'title',
        'description',
        'fees',
        'total_expenses',
        'total_payments',
        'expenses',
        'case_type_id',
        'case_sub_type_id',
        'created_by',
        'updated_by',
        'litigants_name',
        'litigants_address',
        'litigants_phone',
        'litigants_lawyer_name',
        'litigants_lawyer_phone',
        'client_capacity',
        'status',
    ];

    protected $casts = [
        'is_deleted' => 'boolean',
        'total_expenses' => 'decimal:2',
        'total_payments' => 'decimal:2',
        'fees' => 'float',
        'expenses' => 'float',
    ];

    public function caseType(): BelongsTo
    {
        return $this->belongsTo(CaseType::class);
    }

    public function caseSubType(): BelongsTo
    {
        return $this->belongsTo(CaseSubType::class);
    }

    public function courts(): BelongsToMany
    {
        return $this->belongsToMany(Court::class, 'leg_case_court')
            ->withPivot(['case_number', 'case_year']);
    }

    public function clients(): BelongsToMany
    {
        return $this->belongsToMany(Client::class, 'leg_case_client');
    }

    public function lawyers(): BelongsToMany
    {
        return $this->belongsToMany(Lawyer::class, 'leg_case_lawyer');
    }

    public function procedures(): HasMany
    {
        return $this->hasMany(Procedure::class);
    }

    public function legalSessions(): HasMany
    {
        return $this->hasMany(LegalSession::class);
    }

    public function legalAds(): HasMany
    {
        return $this->hasMany(LegalAd::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function softDelete(): void
    {
        $this->is_deleted = true;
        $this->save();
    }

    public function restore(): void
    {
        $this->is_deleted = false;
        $this->save();
    }

    public function newQuery($excludeDeleted = true)
    {
        $query = parent::newQuery();

        if ($excludeDeleted) {
            $query->where('is_deleted', false);
        }

        return $query;
    }
}
