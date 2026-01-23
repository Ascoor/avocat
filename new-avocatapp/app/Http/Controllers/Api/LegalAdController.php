<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class LegalAdController extends BaseApiController
{
    public function index(Request $request)
    {
        return $this->notImplementedResponse('Legal ad index endpoint not implemented yet.');
    }

    public function store(Request $request)
    {
        return $this->notImplementedResponse('Legal ad store endpoint not implemented yet.');
    }

    public function show(Request $request, int $id)
    {
        return $this->notImplementedResponse('Legal ad show endpoint not implemented yet.');
    }

    public function update(Request $request, int $id)
    {
        return $this->notImplementedResponse('Legal ad update endpoint not implemented yet.');
    }

    public function destroy(Request $request, int $id)
    {
        return $this->notImplementedResponse('Legal ad destroy endpoint not implemented yet.');
    }

    public function getByLegCaseId(Request $request, int $legCaseId)
    {
        return $this->notImplementedResponse('Legal ads by legal case endpoint not implemented yet.');
    }
}
