<?php
// CassationRuleSubject.php Model

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CassationRuleSubject extends Model
{
    use HasFactory;

    protected $fillable = ['rule_description'];
    

}
