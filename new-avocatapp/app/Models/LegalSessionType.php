<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LegalSessionType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function legalSessions(): HasMany
    {
        return $this->hasMany(LegalSession::class);
    }
}
