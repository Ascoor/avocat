<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class CaseTypeController extends BaseApiController
{
    public function index(Request $request)
    {
        return $this->notImplementedResponse('Case type index endpoint not implemented yet.');
    }

    public function store(Request $request)
    {
        return $this->notImplementedResponse('Case type store endpoint not implemented yet.');
    }

    public function show(Request $request, int $id)
    {
        return $this->notImplementedResponse('Case type show endpoint not implemented yet.');
    }

    public function update(Request $request, int $id)
    {
        return $this->notImplementedResponse('Case type update endpoint not implemented yet.');
    }

    public function destroy(Request $request, int $id)
    {
        return $this->notImplementedResponse('Case type destroy endpoint not implemented yet.');
    }

    public function getCaseTypesWithSubTypes(Request $request, int $caseTypeId)
    {
        return $this->notImplementedResponse('Case type sub types endpoint not implemented yet.');
    }
}
