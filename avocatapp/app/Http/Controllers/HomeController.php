<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Lawyer;
use App\Models\LegalSession;
use App\Models\LegCase;
use App\Models\Service;
use App\Models\LegalAd;
use App\Models\Procedure;
use Illuminate\Http\Request;

class HomeController extends Controller
{
   public function countOffice()
   {
    $clients = Client::count();
    $legCases = LegCase::count();
    $procedures = Procedure::count();
    $lawyers = Lawyer::count();
    $legal_sessions = LegalSession::count();
    $legal_ads = LegalAd::count();
    $services = Service::count();

    $data = [
        'client_count' => $clients,
        'leg_case_count' => $legCases,
        'procedure_count' => $procedures,
        'legal_session_count' => $legal_sessions,
        'legal_ad_count' => $legal_ads,
        'lawyer_count' => $lawyers,
        'service_count' => $services,
    ];

    return response()->json($data);
}
public function searchClient(Request $request)
{
    $query = $request->get('query');

    $clients = Client::query()
        ->where('slug', 'like', "%{$query}%")
        ->orWhere('phone_number', 'like', "%{$query}%")
        ->orWhere('name', 'like', "%{$query}%")
        ->orWhere('identity_number', 'like', "%{$query}%")
        ->get();

    return response()->json($clients);
}public function searchLegCase(Request $request)
{
    $searchQuery = $request->get('query');

    $legCases = LegCase::query()
        ->where('slug', 'like', "%{$searchQuery}%")
        ->orWhereHas('courts', function ($courtQuery) use ($searchQuery) {
            $courtQuery->where('name', 'like', "%{$searchQuery}%");
        })
        ->orWhereHas('clients', function ($clientQuery) use ($searchQuery) {
            $clientQuery->where('name', 'like', "%{$searchQuery}%");
        })
        ->get();

    return response()->json($legCases);

}
   }
