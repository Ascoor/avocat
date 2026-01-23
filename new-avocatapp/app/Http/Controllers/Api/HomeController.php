<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class HomeController extends BaseApiController
{
    public function countOffice(Request $request)
    {
        return $this->notImplementedResponse('Office count endpoint not implemented yet.');
    }

    public function searchClient(Request $request)
    {
        return $this->notImplementedResponse('Client search endpoint not implemented yet.');
    }

    public function searchLegCase(Request $request)
    {
        return $this->notImplementedResponse('Legal case search endpoint not implemented yet.');
    }
}
