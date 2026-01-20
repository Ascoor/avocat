<?php
// make CassationRule model from CassationRule

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CassationRule extends Model
{
    use HasFactory;
    protected $fillable = ['appeal_type_id', 'appeal_sub_type_id', 'appeal_number', 'appeal_year', 'session_date', 'legal_summary', 'cassation_rule_subjects_id', 'judge_name'];
    

    public function appealType()
    {
        return $this->belongsTo(AppealType::class, 'appeal_type_id');
    }
    public function appealSubType()
    {
        return $this->belongsTo(AppealSubType::class, 'appeal_sub_type_id');
    }
    
    public function ruleSubject()
    {
        return $this->belongsTo(CassationRuleSubject::class, 'cassation_rule_subjects_id');
    }
    
    public function judges()
    {
        return $this->hasMany(CassationJudge::class, 'cassation_rules_id');
    }
    
    public function pdfs()
    {
        return $this->hasMany(AppealPdf::class, 'cassation_rule_id');
    }
}    