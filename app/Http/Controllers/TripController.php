<?php

namespace App\Http\Controllers;

use App\Events\TripAcceptedEvent;
use App\Events\TripCreatedEvent;
use App\Events\TripDriverLocationUpdatedEvent;
use App\Events\TripFinishedEvent;
use App\Events\TripStartedEvent;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TripController extends Controller
{
    public function store(Request $request)
    {
        // validate request has neccessary items
        $request->validate([
            'origin' => 'required',
            'destination' => 'required',
            'destination_name' => 'required',
        ]);

        // create trip based on user
        $user = $request->user();

        $trip =  $user->trips()
            ->create($request->only(['origin', 'destination', 'destination_name']));

        TripCreatedEvent::dispatch($trip, $user);

        return $trip;
    }

    public function show(Request $request, Trip $trip)
    {
        $tripBelongsToUser = $trip->user->id === $request->user()->id;
        if ($tripBelongsToUser) {
            return $trip;
        }

        if ($trip->driver && $request->user()->driver) {
            if ($trip->driver->id === $request->user()->driver->id) {
                return $trip;
            }
        }


        return response()->json([
            'message' => 'Cannot Find This Trip'
        ], 404);
    }

    public function accept(Request $request, Trip $trip)
    {
        $request->validate([
            'driver_location' => 'required',
        ]);


        

        $trip->update(
            [
                'driver_id' => $request->user()->id,
                'driver_location' => $request->driver_location,
                'accepted_at' => now()
            ]
        );


        $trip->load('driver.user');
        
        TripAcceptedEvent::dispatch($trip, $trip->user);


        return $trip;
    }

    public function start(Trip $trip)
    {

        $trip->update([
            'started_at' => now()
        ]);

        $trip->load('driver.user');

        TripStartedEvent::dispatch($trip, $trip->user);

        return $trip;
    }

    public function finish(Trip $trip)
    {
        $trip->update([
            'finished_at' => now()
        ]);

        $trip->load('driver.user');

        TripFinishedEvent::dispatch($trip, $trip->user);

        return $trip;
    }

    public function updateLocation(Request $request, Trip $trip)
    {
        $request->validate([
            'driver_location' => 'required'
        ]);

        $trip->update([
            'driver_location' => $request->driver_location,
        ]);

        $trip->load('driver.user');

        TripDriverLocationUpdatedEvent::dispatch($trip, $trip->user);

        return $trip;
    }
}
