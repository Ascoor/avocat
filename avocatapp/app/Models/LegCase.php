<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LegCase extends Model
{

    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'description',
        'case_type_id',
        'fees',
         'case_sub_type_id',
       'client_capacity',
      'litigants_name',
      'litigants_phone',
         'updated_by',
         'created_by',
         'status',
         'total_expenses',
         'total_payments'
    ];
    public function legalAds()
    {
        return $this->hasMany(LegalAd::class);
    }
    
    public function caseType()
    {
        return $this->belongsTo(CaseType::class);
    }
    
    public function caseSubType()
    {
        return $this->belongsTo(CaseSubType::class);
    }
    public function sessions()
    {
        return $this->hasMany(LegalSession::class);
    }
    

    public function courts()
    {
        return $this->belongsToMany(Court::class, 'leg_case_court')
            ->withPivot([
                'case_number',
                'case_year',
                'court_id'
            ]);
    } 



    public function clients()
    {
        return $this->belongsToMany(Client::class, 'leg_case_client')
        ->withPivot([

            "client_id",

        ]);

    }
 
    public function lawyers()
    {
        return $this->belongsToMany(Lawyer::class, 'leg_case_lawyer');
    }
 


            public function procedures()
            {
                return $this->hasMany(Procedure::class);
            }


    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
  // Function to soft delete/hide the record
  public function softDelete() {
    $this->is_deleted = true;
    $this->save();
}

// Function to restore/unhide the record
public function restore() {
    $this->is_deleted = false;
    $this->save();
}

// Modify the query scope to exclude soft deleted records
public function newQuery($excludeDeleted = true) {
    $query = parent::newQuery();

    if ($excludeDeleted) {
        $query->where('is_deleted', '=', false);
    }

    return $query;
}
    }
