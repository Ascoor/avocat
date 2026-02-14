<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class CaseStatusController extends Controller
{
    public function fetchCaseStatus(Request $request)
    {
        // Create a new Goutte client
        $client = new Client();

        // Send a GET request to the website URL
        $crawler = $client->request('GET', 'https://moj.gov.eg/ar/Pages/Services/CaseCurrentStatus.aspx');

        // Extract the required data from the website
        $lblDegree = $crawler->filter('#lblDegree')->text();
        $ddlCourtOptions = $crawler->filter('#ddlCourt option')->each(function ($option) {
            return $option->text();
        });
        $caseTypeOptions = $crawler->filter('#CaseType option')->each(function ($option) {
            return $option->text();
        });
        $yearOptions = $crawler->filter('#year option')->each(function ($option) {
            return $option->text();
        });

        // Return the extracted data as JSON response
        return response()->json([
            'lblDegree' => $lblDegree,
            'ddlCourtOptions' => $ddlCourtOptions,
            'caseTypeOptions' => $caseTypeOptions,
            'yearOptions' => $yearOptions,
        ]);
    }
}
