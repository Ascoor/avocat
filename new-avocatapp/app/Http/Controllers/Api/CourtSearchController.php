<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\DB;

class CourtSearchController extends Controller
{public function index()
    {
        $searchDegrees = DB::table('search_degrees')->get();
        $searchCourts = DB::table('search_courts')->get();
        $searchCaseTypes = DB::table('search_case_types')->get();
    
        return response()->json([
            'search_degrees' => $searchDegrees,
            'search_courts' => $searchCourts,
            'search_case_types' => $searchCaseTypes
        ]);
    }
    
}
