<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class CourtSearchController extends BaseApiController
{
    public function index(Request $request)
    {
        return $this->notImplementedResponse('Court search index endpoint not implemented yet.');
    }

    public function getDegrees(Request $request)
    {
        return $this->notImplementedResponse('Court degrees endpoint not implemented yet.');
    }

    public function getCourts(Request $request)
    {
        return $this->notImplementedResponse('Court list endpoint not implemented yet.');
    }

    public function getCaseTypes(Request $request)
    {
        return $this->notImplementedResponse('Court case types endpoint not implemented yet.');
    }
}
