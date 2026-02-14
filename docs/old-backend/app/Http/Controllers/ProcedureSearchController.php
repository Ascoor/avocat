<?php

namespace App\Http\Controllers;

use App\Models\Procedure;
use Illuminate\Http\Request;
use Symfony\Component\Process\Process;

class ProcedureSearchController extends Controller
{
    public function searchFilters(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date|after_or_equal:date_start',
            'lawyer_id' => 'nullable|exists:lawyers,id',
            'court_id' => 'nullable|exists:courts,id',
            'procedure_type_id' => 'nullable|exists:procedure_types,id',
            'procedure_Place_type_id' => 'nullable|exists:procedure_types,id',
            'status' => 'nullable|in:منتهي,لم ينفذ,قيد التنفيذ',
        ]);

        // Retrieve data based on the provided filters
        $query = Procedure::query();

        if ($request->filled('date_start') && $request->filled('date_end')) {
            $query->whereBetween('date_start', [$request->date_start, $request->date_end]);
        }

        if ($request->filled('lawyer_id')) {
            $query->where('lawyer_id', $request->lawyer_id);
        }

        if ($request->filled('court_id')) {
            $query->where('court_id', $request->court_id);
        }

        if ($request->filled('procedure_type_id')) {
            $query->where('procedure_type_id', $request->procedure_type_id);
        }
        if ($request->filled('procedure_Place_type_id')) {
            $query->where('procedure_Place_type_id', $request->procedure_Place_type_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        // Add more filter conditions here based on other filters

        // Execute the query and get the results
        $procedures = $query->with([
            'court',


            'lawyer',


            'createdBy',
            'procedurePlaceType',
            'procedureType'
        ])->get();

        return response()->json($procedures );
    }
}
