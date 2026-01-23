<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class ProcedureController extends BaseApiController
{
    public function index(Request $request)
    {
        return $this->notImplementedResponse('Procedure index endpoint not implemented yet.');
    }

    public function store(Request $request)
    {
        return $this->notImplementedResponse('Procedure store endpoint not implemented yet.');
    }

    public function show(Request $request, int $id)
    {
        return $this->notImplementedResponse('Procedure show endpoint not implemented yet.');
    }

    public function update(Request $request, int $id)
    {
        return $this->notImplementedResponse('Procedure update endpoint not implemented yet.');
    }

    public function destroy(Request $request, int $id)
    {
        return $this->notImplementedResponse('Procedure destroy endpoint not implemented yet.');
    }

    public function getByProcedureTypeId(Request $request, int $procedureTypeId)
    {
        return $this->notImplementedResponse('Procedures by type endpoint not implemented yet.');
    }

    public function getByLegCaseId(Request $request, int $legCaseId)
    {
        return $this->notImplementedResponse('Procedures by legal case endpoint not implemented yet.');
    }
}
