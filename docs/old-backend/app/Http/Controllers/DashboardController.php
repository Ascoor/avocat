<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\LegCase;
use App\Models\PowerOfAttorney;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getClients(Request $request)
    {
        // Handle GET request for fetching clients data
        // Implement your logic here to fetch clients data from database or any other source
        $clients = Client::all(); // Assuming you have a "Client" model

        // Return the clients data as JSON
        return response()->json($clients);
    }

    public function getClientDetails(Request $request, $clientId)
    {
        // Handle GET request for fetching individual client data
        // Access the clientId parameter from route params
        // Implement your logic here to fetch individual client data based on clientId
        $client = Client::findOrFail($clientId); // Assuming you have a "Client" model

        // Return the client data as JSON
        return response()->json($client);
    }

    public function getLegalCaseDetails(Request $request, $caseId)
    {
        // Handle GET request for fetching individual legal case data
        // Access the caseId parameter from route params
        // Implement your logic here to fetch individual legal case data based on caseId
        $legalCase = LegCase::findOrFail($caseId); // Assuming you have a "LegalCase" model

        // Return the legal case data as JSON
        return response()->json($legalCase);
    }

    public function getPowerOfAttorneys(Request $request, $clientId)
    {
        // Handle GET request for fetching power of attorneys data for a client
        // Access the clientId parameter from route params
        // Implement your logic here to fetch power of attorneys data based on clientId
        $powerOfAttorneys = PowerOfAttorney::where('client_id', $clientId)->get(); // Assuming you have a "PowerOfAttorney" model

        // Return the power of attorneys data as JSON
        return response()->json($powerOfAttorneys);
    }

    public function getClientByNameOrPhoneNumber(Request $request)
    {
        // Handle GET request for fetching clients data by name or phone number
        // Retrieve the search query from request input
        $searchQuery = $request->query('search_query'); // Use query() instead of input()

        // Implement your logic here to fetch clients data based on name or phone number
        $clients = Client::where('name', 'like', '%'.$searchQuery.'%')
                    ->orWhere('phone_number', 'like', '%'.$searchQuery.'%')
                    ->get(); // Assuming you have a "Client" model

        // Return the clients data as JSON
        return response()->json($clients);
    }
}
