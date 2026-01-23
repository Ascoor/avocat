<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class LegalSessionController extends BaseApiController
{
    public function index(Request $request)
    {
        return $this->notImplementedResponse('Legal session index endpoint not implemented yet.');
    }

    public function store(Request $request)
    {
        return $this->notImplementedResponse('Legal session store endpoint not implemented yet.');
    }

    public function show(Request $request, int $id)
    {
        return $this->notImplementedResponse('Legal session show endpoint not implemented yet.');
    }

    public function update(Request $request, int $id)
    {
        return $this->notImplementedResponse('Legal session update endpoint not implemented yet.');
    }

    public function destroy(Request $request, int $id)
    {
        return $this->notImplementedResponse('Legal session destroy endpoint not implemented yet.');
    }

    public function getSessionsByLegCaseId(Request $request, int $legCaseId)
    {
        return $this->notImplementedResponse('Legal sessions by legal case endpoint not implemented yet.');
    }

    public function getByCourtId(Request $request, int $courtId)
    {
        return $this->notImplementedResponse('Legal sessions by court endpoint not implemented yet.');
    }

    public function getByLawyerId(Request $request, int $lawyerId)
    {
        return $this->notImplementedResponse('Legal sessions by lawyer endpoint not implemented yet.');
    }
}
