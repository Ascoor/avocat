<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CaseStatusController extends Controller
{
    public function fetchCaseStatus(Request $request): JsonResponse
    {
        return response()->json($this->fetchOptions());
    }

    public function index(Request $request): JsonResponse
    {
        return $this->fetchCaseStatus($request);
    }

    public function fetchDegrees(): JsonResponse
    {
        return response()->json(['degrees' => $this->fetchOptions()['ddlCourtOptions']]);
    }

    public function getCourtOptions(): JsonResponse
    {
        return response()->json(['court_options' => $this->fetchOptions()['ddlCourtOptions']]);
    }

    public function getCaseTypeOptions(): JsonResponse
    {
        return response()->json(['case_type_options' => $this->fetchOptions()['caseTypeOptions']]);
    }

    public function getCaseYearOptions(): JsonResponse
    {
        return response()->json(['case_year_options' => $this->fetchOptions()['yearOptions']]);
    }

    public function getCaseDetails(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Case details endpoint requires ministry integration payload and is not implemented in legacy code.',
            'request' => $request->only(['degree', 'court', 'case_type', 'year', 'case_number']),
        ], 501);
    }

    private function fetchOptions(): array
    {
        $client = new Client();
        $crawler = $client->request('GET', 'https://moj.gov.eg/ar/Pages/Services/CaseCurrentStatus.aspx');

        return [
            'lblDegree' => $crawler->filter('#lblDegree')->text(),
            'ddlCourtOptions' => $crawler->filter('#ddlCourt option')->each(fn ($option) => $option->text()),
            'caseTypeOptions' => $crawler->filter('#CaseType option')->each(fn ($option) => $option->text()),
            'yearOptions' => $crawler->filter('#year option')->each(fn ($option) => $option->text()),
        ];
    }
}
