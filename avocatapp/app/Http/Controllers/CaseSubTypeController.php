<?php

namespace App\Http\Controllers;

use App\Models\CaseSubType;
use Illuminate\Http\Request;

class CaseSubTypeController extends Controller
{
    public function index()
    {
        $caseSubTypes = CaseSubType::with('caseType')->get();

        return response()->json($caseSubTypes);
    }

    // Get a specific case sub type
    public function show($id)
    {
        $caseSubType = CaseSubType::find($id);
        if (! $caseSubType) {
            return response()->json(['message' => 'Case sub type not found'], 404);
        }

        return response()->json($caseSubType);
    }

    // Create a new case sub type
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'case_type_id' => 'required',
            // Add any other validation rules for the CaseSubType model
        ]);

        try {
            $caseSubType = new CaseSubType();
            $caseSubType->name = $request->input('name');
            $caseSubType->case_type_id = $request->input('case_type_id');
            $caseSubType->save();

            return response()->json($caseSubType, 201);
        } catch (\Exception $e) {
            // Handle the exception and return an error response
            return response()->json(['error' => 'Failed to store CaseSubType'], 500);
        }
    }

    // Update a case sub type
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $caseSubType = CaseSubType::find($id);
        if (! $caseSubType) {
            return response()->json(['message' => 'Case sub type not found'], 404);
        }

        $caseSubType->name = $request->input('name');
        $caseSubType->save();

        return response()->json($caseSubType, 200);
    }

    public function destroy($id)
    {
        $caseSubType = CaseSubType::find($id);

        if (! $caseSubType) {
            return response()->json(['message' => 'Case Sub Type not found'], 404);
        }

        $caseSubType->delete();

        return response()->json(null, 204);
    }
}
