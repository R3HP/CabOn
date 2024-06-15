<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Trip extends Model
{
    use HasFactory;

    protected $fillable = [
        'origin',
        'destination',
        'destination_name',
        'driver_location',
        'started_at',
        'finished_at',
        'driver_id'
    ];

    public function user() : BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function driver() : BelongsTo{
        return $this->belongsTo(Driver::class);
    }

    protected $casts = [
        'origin' => 'array',
        'destination' => 'array',
        'driver_location' => 'array'
    ];

    public $timestamps = false;

}
