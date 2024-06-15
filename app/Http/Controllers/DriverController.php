<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DriverController extends Controller
{
    public function show(Request $request){
        $user = $request->user();
        $user->load('driver');
        return $user;
    }

    public function update(Request $request){
        $request->validate([
            'year' => 'required|numeric',
            'make' => 'required',
            'model' => 'required',
            'color' => 'required',
            'license' => 'required',
            'name' => 'required'
        ]);

        $user = $request->user();

        $user->update(['name' => $request->name]);

        $user->driver()->updateOrCreate($request->only(['year','make','model','color','license']));

        return $user;

    }
    //
}
