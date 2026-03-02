<?php

namespace App\Http\Controllers\Api;

use App\Models\LegCase;
use App\Models\LegalDoc;
use App\Models\PowerOfAttorney;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class DocumentCenterController extends BaseApiController
{
    public function powerOfAttorneys(): JsonResponse
    {
        $powerOfAttorneys = Cache::remember('document_center:power_of_attorneys', now()->addMinutes(10), static function () {
            return PowerOfAttorney::with(['client', 'attorneyType'])
                ->latest()
                ->get();
        });

        return $this->successResponse($powerOfAttorneys, 'Power of attorneys retrieved successfully.');
    }

    public function documents(): JsonResponse
    {
        $documents = Cache::remember('document_center:documents', now()->addMinutes(10), static function () {
            return LegalDoc::with(['docType', 'docSubType'])
                ->latest()
                ->get();
        });

        return $this->successResponse($documents, 'Documents retrieved successfully.');
    }

    public function cases(): JsonResponse
    {
        $cases = Cache::remember('document_center:cases', now()->addMinutes(10), static function () {
            return LegCase::with(['clients', 'lawyers', 'caseType'])
                ->latest()
                ->get();
        });

        return $this->successResponse($cases, 'Cases retrieved successfully.');
    }

    public function services(): JsonResponse
    {
        $services = Cache::remember('document_center:services', now()->addMinutes(10), static function () {
            return Service::with(['clients', 'serviceType'])
                ->latest()
                ->get();
        });

        return $this->successResponse($services, 'Services retrieved successfully.');
    }
}
