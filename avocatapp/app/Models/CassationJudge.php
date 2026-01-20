<?php
// CassationRuleSubject.php Model

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CassationJudge extends Model
{
    use HasFactory;

    protected $fillable = ['judge_name'];

}
