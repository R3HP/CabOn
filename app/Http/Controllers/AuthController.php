<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\LoginNeedsVerification;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function login(Request $request)
    {


        // validate phone
        $request->validate([
            'email' => 'required|email',
        ]);

        // // create user model
        $user = User::firstOrCreate([
            'email' => $request->email
        ]);

        if (!$user) {
            return response()->json(['message' => 'Could Not Proccess A User With That Email'],401);
            
        }

        // // send otp code
        $user->notify(new LoginNeedsVerification());
        return response()->json(['message' => 'Success,Please Check Your Inbox For Verification Code'], 200);

    }



    public function verify(Request $request)
    {
        // return response()->json(['message' => [$request->otp_token,$request->email]]);
        //get code from request
        $request->validate([
            'email' => 'required|email',
            'otp_token' => 'required|numeric|between:1000,9999'
        ]);
        $reqCode = $request->otp_token;
        $reqUserEmail = $request->email;
        // check for equality with user->otp_token
        $user = User::where('email', $reqUserEmail)->where('otp_token', $reqCode)->first();
        // if equal delete user->otp_token and return token
        // else return Error 

        if ($user) {
            $token =  $user->createToken($user->email);
            $user->update([
                'otp_token' => null
            ]);
            return response()->json([
                'message' => 'Verification Completed Successfully',
                'ApiKey' => $token->plainTextToken
            ]);
        } else {
            return response()->json([
                'message' => 'Verification Failed.'
            ], 401);
        }
    }
}
