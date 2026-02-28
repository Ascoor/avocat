<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SearchCourt extends Model
{
    use HasFactory;



    public function searchCaseTypes()
    {
        return $this->hasMany(SearchCaseType::class);
    }
}
