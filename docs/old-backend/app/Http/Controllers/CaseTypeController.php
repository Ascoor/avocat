<?php

namespace App\Http\Controllers;

use App\Models\CaseSubType;
use App\Models\CaseType;
use Illuminate\Http\Request;

class CaseTypeController extends Controller
{
    public function index()
    {
        // Retrieve all case types with their subtypes
        $caseTypes = CaseType::with('caseSubTypes')->get();

        return response()->json($caseTypes);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            // Add any other validation rules for the CaseType model
        ]);

        try {
            $caseType = new CaseType();
            $caseType->name = $request->input('name');
            $caseType->save();

            return response()->json($caseType, 201);
        } catch (\Exception $e) {
            // Handle the exception and return an error response
            return response()->json(['error' => 'Failed to store CaseType'], 500);
        }
    }

    public function show(CaseType $caseType)
    {
        return response()->json(['data' => $caseType], 200);
    }

    public function update(Request $request, CaseType $caseType)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',

        ]);

        $caseType->update($validatedData);

        return response()->json(['data' => $caseType], 200);
    }

    public function destroy($id)
    {
        $caseType = CaseType::find($id);

        if (! $caseType) {
            return response()->json(['message' => 'Case Type not found'], 404);
        }

        $caseType->delete();

        return response()->json(null, 204);
    }

    public function getCaseTypesWithSubTypes($caseTypeId)
    {
        $subTypes = CaseSubType::where('case_type_id', $caseTypeId)->get();

        return response()->json($subTypes);
    }
}
