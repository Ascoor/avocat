<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class DashboardController extends BaseApiController
{
    public function getClientByNameOrPhoneNumber(Request $request)
    {
        return $this->notImplementedResponse('Dashboard client search endpoint not implemented yet.');
    }
}
