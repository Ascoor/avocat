<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseApiController
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        $validated = $validator->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->sendEmailVerificationNotification();

        $token = $user->createToken('api')->plainTextToken;

        return $this->successResponse([
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ], 'Registration successful.', 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        $credentials = $validator->validated();

        if (! Auth::attempt($credentials)) {
            return $this->errorResponse('Invalid credentials.', 401);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('api')->plainTextToken;

        return $this->successResponse([
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ], 'Login successful.');
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        $status = Password::sendResetLink($validator->validated());

        if ($status === Password::RESET_LINK_SENT) {
            return $this->successResponse(null, __($status));
        }

        return $this->errorResponse(__($status), 422);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'token' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        $status = Password::reset($validator->validated(), function (User $user, string $password) {
            $user->forceFill([
                'password' => Hash::make($password),
            ])->setRememberToken(Str::random(60));

            $user->save();
        });

        if ($status === Password::PASSWORD_RESET) {
            return $this->successResponse(null, __($status));
        }

        return $this->errorResponse(__($status), 422);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if (! $user) {
            return $this->errorResponse('Unauthenticated.', 401);
        }

        $token = $user->currentAccessToken();

        if ($token) {
            $token->delete();
        } else {
            $user->tokens()->delete();
        }

        return $this->successResponse(null, 'Logout successful.');
    }

    public function verifyEmail(EmailVerificationRequest $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return $this->successResponse($request->user(), 'Email already verified.');
        }

        $request->fulfill();

        return $this->successResponse($request->user(), 'Email verified.');
    }

    public function resendVerificationEmail(Request $request)
    {
        $user = $request->user();

        if (! $user) {
            return $this->errorResponse('Unauthenticated.', 401);
        }

        if ($user->hasVerifiedEmail()) {
            return $this->errorResponse('Email already verified.', 422);
        }

        $user->sendEmailVerificationNotification();

        return $this->successResponse(null, 'Verification link sent.');
    }

    public function token(Request $request)
    {
        $user = $request->user();

        if (! $user) {
            return $this->errorResponse('Unauthenticated.', 401);
        }

        $token = $user->currentAccessToken();

        if ($token) {
            $token->delete();
        }

        $newToken = $user->createToken('api')->plainTextToken;

        return $this->successResponse([
            'token' => $newToken,
            'token_type' => 'Bearer',
        ], 'Token refreshed.');
    }

    public function me(Request $request)
    {
        $user = $request->user();

        if (! $user) {
            return $this->errorResponse('Unauthenticated.', 401);
        }

        return $this->successResponse($user, 'User profile.');
    }
}
