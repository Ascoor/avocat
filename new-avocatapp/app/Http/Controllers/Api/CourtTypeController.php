<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class CourtTypeController extends BaseApiController
{
    public function index(Request $request)
    {
        return $this->notImplementedResponse('Court type index endpoint not implemented yet.');
    }

    public function store(Request $request)
    {
        return $this->notImplementedResponse('Court type store endpoint not implemented yet.');
    }

    public function show(Request $request, int $id)
    {
        return $this->notImplementedResponse('Court type show endpoint not implemented yet.');
    }

    public function update(Request $request, int $id)
    {
        return $this->notImplementedResponse('Court type update endpoint not implemented yet.');
    }

    public function destroy(Request $request, int $id)
    {
        return $this->notImplementedResponse('Court type destroy endpoint not implemented yet.');
    }

    public function getCourtTypesWithSubTypes(Request $request, int $courtTypeId)
    {
        return $this->notImplementedResponse('Court type sub types endpoint not implemented yet.');
    }
}
