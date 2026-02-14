<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegalSessionType extends Model
{
    protected $fillable = ['name'];


    public function legalSessions()
    {
        return $this->hasMany(LegalSession::class);
    }
}
