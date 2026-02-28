<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LegCase;
use App\Models\LegalDoc;
use App\Models\PowerOfAttorney;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class DocumentCenterController extends Controller
{
    public function powerOfAttorneys(): JsonResponse
    {
        $powerOfAttorneys = PowerOfAttorney::with(['client', 'attorneyType'])
            ->latest()
            ->get();

        return response()->json($powerOfAttorneys);
    }

    public function documents(): JsonResponse
    {
        $documents = LegalDoc::with(['docType', 'docSubType'])
            ->latest()
            ->get();

        return response()->json($documents);
    }

    public function cases(): JsonResponse
    {
        $cases = LegCase::with(['clients', 'lawyers', 'caseType'])
            ->latest()
            ->get();

        return response()->json($cases);
    }

    public function services(): JsonResponse
    {
        $services = Service::with(['clients', 'serviceType'])
            ->latest()
            ->get();

        return response()->json($services);
    }
}
