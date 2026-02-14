<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourtLevel extends Model
{
    use HasFactory;

    protected $fillable = ['name'];



    public function courts()
    {
        return $this->hasMany(Court::class);
    }

    // Define the delete method to delete courts associated with this court level and then delete court level
    public function delete()
    {
        // Delete all courts associated with this court level
        $this->courts()->delete();

        // Delete the court level
        return parent::delete();
    }

}
