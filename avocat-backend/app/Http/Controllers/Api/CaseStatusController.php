<?php

namespace App\Http\Controllers\Api;

use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CaseStatusController extends BaseApiController
{
    public function fetchCaseStatus(Request $request): JsonResponse
    {
        return $this->successResponse($this->fetchOptions(), 'Case status options retrieved successfully.');
    }

    public function index(Request $request): JsonResponse
    {
        return $this->fetchCaseStatus($request);
    }

    public function fetchDegrees(): JsonResponse
    {
        return $this->successResponse(['degrees' => $this->fetchOptions()['ddlCourtOptions']], 'Court degrees retrieved successfully.');
    }

    public function getCourtOptions(): JsonResponse
    {
        return $this->successResponse(['court_options' => $this->fetchOptions()['ddlCourtOptions']], 'Court options retrieved successfully.');
    }

    public function getCaseTypeOptions(): JsonResponse
    {
        return $this->successResponse(['case_type_options' => $this->fetchOptions()['caseTypeOptions']], 'Case type options retrieved successfully.');
    }

    public function getCaseYearOptions(): JsonResponse
    {
        return $this->successResponse(['case_year_options' => $this->fetchOptions()['yearOptions']], 'Case year options retrieved successfully.');
    }

    public function getCaseDetails(Request $request): JsonResponse
    {
        return $this->notImplementedResponse('Case details endpoint requires ministry integration payload and is not implemented in legacy code.');
    }

    private function fetchOptions(): array
    {
        return Cache::remember('case_status:options', now()->addHours(6), function (): array {
            $client = new Client();
            $crawler = $client->request('GET', 'https://moj.gov.eg/ar/Pages/Services/CaseCurrentStatus.aspx');

            return [
                'lblDegree' => $crawler->filter('#lblDegree')->text(),
                'ddlCourtOptions' => $crawler->filter('#ddlCourt option')->each(fn ($option) => $option->text()),
                'caseTypeOptions' => $crawler->filter('#CaseType option')->each(fn ($option) => $option->text()),
                'yearOptions' => $crawler->filter('#year option')->each(fn ($option) => $option->text()),
            ];
        });
    }
}
