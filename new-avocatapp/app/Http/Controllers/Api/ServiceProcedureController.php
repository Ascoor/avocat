<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class ServiceProcedureController extends BaseApiController
{
    public function index(Request $request, int $serviceId)
    {
        return $this->notImplementedResponse('Service procedures index endpoint not implemented yet.');
    }

    public function store(Request $request)
    {
        return $this->notImplementedResponse('Service procedures store endpoint not implemented yet.');
    }

    public function update(Request $request, int $id)
    {
        return $this->notImplementedResponse('Service procedures update endpoint not implemented yet.');
    }

    public function destroy(Request $request, int $id)
    {
        return $this->notImplementedResponse('Service procedures destroy endpoint not implemented yet.');
    }
}
