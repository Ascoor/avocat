<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class UserController extends BaseApiController
{
    public function updateProfile(Request $request, int $user)
    {
        return $this->notImplementedResponse('Update profile endpoint not implemented yet.');
    }

    public function getUserDetails(Request $request, int $user)
    {
        return $this->notImplementedResponse('User details endpoint not implemented yet.');
    }
}
