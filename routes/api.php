<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\TripController;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::post('/login/verify', [AuthController::class, 'verify'])->name('login.verify');


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/driver', [DriverController::class, 'show']);
    Route::post('/driver', [DriverController::class, 'update']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/trip', [TripController::class, 'store']);
    Route::get('/trip/{trip}', [TripController::class, 'show']);

    Route::post('/trip/{trip}/accept',[ TripController::class,'accept']);
    Route::post('/trip/{trip}/start',[ TripController::class,'start']);
    Route::post('/trip/{trip}/finish',[ TripController::class,'finish']);
    Route::post('/trip/{trip}/updatelocation',[ TripController::class,'updateLocation']);
});




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
