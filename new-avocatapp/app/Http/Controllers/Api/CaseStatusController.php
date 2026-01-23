<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class CaseStatusController extends BaseApiController
{
    public function index(Request $request)
    {
        return $this->notImplementedResponse('Case status index endpoint not implemented yet.');
    }

    public function fetchCaseStatus(Request $request)
    {
        return $this->notImplementedResponse('Case status fetch endpoint not implemented yet.');
    }

    public function fetchDegrees(Request $request)
    {
        return $this->notImplementedResponse('Case status degrees endpoint not implemented yet.');
    }

    public function getCourtOptions(Request $request)
    {
        return $this->notImplementedResponse('Court options endpoint not implemented yet.');
    }

    public function getCaseTypeOptions(Request $request)
    {
        return $this->notImplementedResponse('Case type options endpoint not implemented yet.');
    }

    public function getCaseYearOptions(Request $request)
    {
        return $this->notImplementedResponse('Case year options endpoint not implemented yet.');
    }

    public function getCaseDetails(Request $request)
    {
        return $this->notImplementedResponse('Case details endpoint not implemented yet.');
    }
}
