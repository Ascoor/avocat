<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class LegCaseController extends BaseApiController
{
    public function index(Request $request)
    {
        return $this->notImplementedResponse('Legal case index endpoint not implemented yet.');
    }

    public function store(Request $request)
    {
        return $this->notImplementedResponse('Legal case store endpoint not implemented yet.');
    }

    public function show(Request $request, int $id)
    {
        return $this->notImplementedResponse('Legal case show endpoint not implemented yet.');
    }

    public function update(Request $request, int $id)
    {
        return $this->notImplementedResponse('Legal case update endpoint not implemented yet.');
    }

    public function destroy(Request $request, int $id)
    {
        return $this->notImplementedResponse('Legal case destroy endpoint not implemented yet.');
    }

    public function getCaseTypesWithCaseSubTypes(Request $request)
    {
        return $this->notImplementedResponse('Legal case types with sub types endpoint not implemented yet.');
    }

    public function getLegCaseSearch(Request $request)
    {
        return $this->notImplementedResponse('Legal case search endpoint not implemented yet.');
    }

    public function addClients(Request $request, int $legCaseId)
    {
        return $this->notImplementedResponse('Legal case add clients endpoint not implemented yet.');
    }

    public function delete(Request $request, int $legCaseId, int $clientId)
    {
        return $this->notImplementedResponse('Legal case delete client endpoint not implemented yet.');
    }

    public function addLegCaseCourts(Request $request)
    {
        return $this->notImplementedResponse('Legal case add courts endpoint not implemented yet.');
    }

    public function removeCourtFromLegCase(Request $request)
    {
        return $this->notImplementedResponse('Legal case remove court endpoint not implemented yet.');
    }
}
