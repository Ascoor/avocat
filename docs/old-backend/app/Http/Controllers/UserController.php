<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function updateProfile(Request $request, $id)
    {
        // Find the user by ID or return a 404 response
        $user = User::findOrFail($id);

        // Define validation rules
        $rules = [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|in:1,2,3',
        ];

        // Add password validation if provided and confirmed
        if (!empty($request->password) && $request->password === $request->password_confirmation) {
            $rules['password'] = 'nullable|min:6|confirmed';
        }

        // Validate the request data
        $validatedData = $request->validate($rules);

        // Update user data
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];

        // Update password if provided
        if (!empty($validatedData['password'])) {
            $user->password = Hash::make($validatedData['password']);
        }

        $user->role = $validatedData['role'];

        $user->save();

        return response()->json(['message' => 'تم تحديث الملف الشخصي بنجاح.']);
    }

    public function getUserDetails($userId)
    {
        // Find the user by ID or return a 404 response
        $user = User::findOrFail($userId);

        return response()->json($user, 200);
    }
}
