<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class LegalDocToolsController extends BaseApiController
{
    public function getDocTypesWithDocSubTypes(Request $request)
    {
        return $this->notImplementedResponse('Doc types with sub types endpoint not implemented yet.');
    }

    public function addDocType(Request $request)
    {
        return $this->notImplementedResponse('Doc type store endpoint not implemented yet.');
    }

    public function editDocType(Request $request, int $id)
    {
        return $this->notImplementedResponse('Doc type update endpoint not implemented yet.');
    }

    public function addDocSubType(Request $request)
    {
        return $this->notImplementedResponse('Doc sub type store endpoint not implemented yet.');
    }

    public function editDocSubType(Request $request, int $id)
    {
        return $this->notImplementedResponse('Doc sub type update endpoint not implemented yet.');
    }

    public function deleteDocTypeAndDocSubType(Request $request, int $id)
    {
        return $this->notImplementedResponse('Doc type delete endpoint not implemented yet.');
    }
}
