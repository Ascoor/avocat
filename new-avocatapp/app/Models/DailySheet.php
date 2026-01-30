<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailySheet extends Model
{
    use HasFactory;

        protected $fillable = [
            'date', 'cost', 'over_cost',
        ];

        public function lawyer()
        {
            return $this->belongsTo(Lawyer::class);
        }

        public function leg_cases()
        {
            return $this->belongsToMany(LegCase::class);
        }

        public function legalSessions()
        {
            return $this->belongsToMany(LegalSession::class, 'daily_sheet_legalSessions');
        }

        public function procedures()
        {
            return $this->belongsToMany(Procedure::class, 'daily_sheet_procedure');
        }
    }
