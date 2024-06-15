<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Driver extends Model
{
    use HasFactory;

    protected $fillable = [
        'year',
        'model',
        'make',
        'license',
        'color',
    ];

    public function user() : BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function trips() : HasMany{
        return $this->hasMany(Trip::class);
    }

    // public function user() : HasOne{
    //     return $this->hasOne(User::class);
    // }
}
