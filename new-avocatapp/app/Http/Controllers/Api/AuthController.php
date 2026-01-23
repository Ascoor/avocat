<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class AuthController extends BaseApiController
{
    public function register(Request $request)
    {
        return $this->notImplementedResponse('Register endpoint not implemented yet.');
    }

    public function login(Request $request)
    {
        return $this->notImplementedResponse('Login endpoint not implemented yet.');
    }

    public function forgotPassword(Request $request)
    {
        return $this->notImplementedResponse('Forgot password endpoint not implemented yet.');
    }

    public function resetPassword(Request $request)
    {
        return $this->notImplementedResponse('Reset password endpoint not implemented yet.');
    }

    public function logout(Request $request)
    {
        return $this->notImplementedResponse('Logout endpoint not implemented yet.');
    }

    public function verifyEmail(Request $request, int $id, string $hash)
    {
        return $this->notImplementedResponse('Email verification endpoint not implemented yet.');
    }

    public function resendVerificationEmail(Request $request)
    {
        return $this->notImplementedResponse('Resend verification endpoint not implemented yet.');
    }

    public function token(Request $request)
    {
        return $this->notImplementedResponse('Token endpoint not implemented yet.');
    }
}
