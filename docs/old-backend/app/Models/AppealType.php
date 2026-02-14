<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppealType extends Model
{
    protected $fillable = ['appeal_type'];

    public function subTypes()
    {
        return $this->hasMany(AppealSubType::class);
    }
}

