<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class EventController extends BaseApiController
{
    public function index(Request $request)
    {
        return $this->notImplementedResponse('Events index endpoint not implemented yet.');
    }

    public function store(Request $request)
    {
        return $this->notImplementedResponse('Events store endpoint not implemented yet.');
    }
}
