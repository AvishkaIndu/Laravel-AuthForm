<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class UsersController extends Controller
{
   public function register(Request $request)
   {
       $validator = Validator::make($request->all(), [
           'name' => 'required|string|max:255',
           'email' => 'required|string|email|max:255|unique:users',
           'password' => 'required|string|min:6',
       ]);

       if ($validator->fails()) {
           return response()->json($validator->errors(), 422);
       }

       $user = User::create([
           'name' => $request->name,
           'email' => $request->email,
           'password' => Hash::make($request->password),
       ]);

       $token = JWTAuth::fromUser($user);

       return response()->json(['message' => 'User successfully registered','user' => $user, 'token' => $token], 201);
   }  
   
   
   public function login(Request $request)
   {
       $request->validate([
           'email' => 'required|string|email',
           'password' => 'required|string',
       ]);

       $user = User::where('email', $request->email)->first();

       if(!$user)
       {
        return response()->json(['error' => 'Invalid registered'], 401);
       }
       elseif (!Hash::check($request->password, $user->password)) {
           return response()->json(['error' => 'Invalid password'], 401);
       }

       $token = JWTAuth::fromUser($user);

       return response()->json(['message' => 'User successfully logged in','user' => $user->makeHidden(['password']), 'token' => $token], 200);

    }

    public function dashboard(Request $request)
   {
       try {
           $user = JWTAuth::parseToken()->authenticate();
       } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
           return response()->json(['error' => 'Token expired'], 401);
       } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
           return response()->json(['error' => 'Token invalid'], 401);
       } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
           return response()->json(['error' => 'Token absent'], 401);
       }

       return response()->json(['message' => 'Welcome to your dashboard', 'user' => $user ,'message' => 'You have successfully accessed the dashboard'], 200);
    }

    public function logout(Request $request)
   {
       try {
           $token = JWTAuth::getToken();
           if (!$token) {
               return response()->json(['error' => 'Token not provided'], 401);
           }
              JWTAuth::invalidate($token);
              return response()->json(['message' => 'User successfully logged out'], 200);
       } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
           return response()->json(['error' => 'fail to logout'], 401);
       } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
           return response()->json(['error' => 'fail to logout'], 401);
       } 
    }


}
