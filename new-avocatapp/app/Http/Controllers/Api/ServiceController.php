<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class ServiceController extends BaseApiController
{
    public function index(Request $request)
    {
        return $this->notImplementedResponse('Service index endpoint not implemented yet.');
    }

    public function store(Request $request)
    {
        return $this->notImplementedResponse('Service store endpoint not implemented yet.');
    }

    public function show(Request $request, int $id)
    {
        return $this->notImplementedResponse('Service show endpoint not implemented yet.');
    }

    public function update(Request $request, int $id)
    {
        return $this->notImplementedResponse('Service update endpoint not implemented yet.');
    }

    public function destroy(Request $request, int $id)
    {
        return $this->notImplementedResponse('Service destroy endpoint not implemented yet.');
    }

    public function getServiceSearch(Request $request)
    {
        return $this->notImplementedResponse('Service search endpoint not implemented yet.');
    }

    public function getServiceTypes(Request $request)
    {
        return $this->notImplementedResponse('Service types endpoint not implemented yet.');
    }
}
