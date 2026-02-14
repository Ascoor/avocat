<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourtSearchController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'search_degrees' => $this->getDegreesData(),
            'search_courts' => $this->getCourtsData(),
            'search_case_types' => $this->getCaseTypesData(),
        ]);
    }

    public function getDegrees(): JsonResponse
    {
        return response()->json(['search_degrees' => $this->getDegreesData()]);
    }

    public function getCourts(Request $request): JsonResponse
    {
        $query = DB::table('search_courts');

        if ($request->filled('degree_id')) {
            $query->where('degree_id', $request->integer('degree_id'));
        }

        return response()->json(['search_courts' => $query->get()]);
    }

    public function getCaseTypes(Request $request): JsonResponse
    {
        $query = DB::table('search_case_types');

        if ($request->filled('court_id')) {
            $query->where('court_id', $request->integer('court_id'));
        }

        return response()->json(['search_case_types' => $query->get()]);
    }

    private function getDegreesData()
    {
        return DB::table('search_degrees')->get();
    }

    private function getCourtsData()
    {
        return DB::table('search_courts')->get();
    }

    private function getCaseTypesData()
    {
        return DB::table('search_case_types')->get();
    }
}
