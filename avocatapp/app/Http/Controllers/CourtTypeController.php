<?php

namespace App\Http\Controllers;

use App\Models\CourtSubType;
use App\Models\CourtType;
use Illuminate\Http\Request;

class CourtTypeController extends Controller
{
    // Get all court types
    public function index()
    {
        $courtTypes = CourtType::all();

        return response()->json($courtTypes);
    }

    // Get a specific court type
    public function show($id)
    {
        $courtType = CourtType::find($id);
        if (! $courtType) {
            return response()->json(['message' => 'Court type not found'], 404);
        }

        return response()->json($courtType);
    }

    // Create a new court type
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $courtType = new CourtType();
        $courtType->name = $request->input('name');
        $courtType->save();

        return response()->json($courtType, 201);
    }

    // Update a court type
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $courtType = CourtType::find($id);
        if (! $courtType) {
            return response()->json(['message' => 'Court type not found'], 404);
        }

        $courtType->name = $request->input('name');
        $courtType->save();

        return response()->json($courtType);
    }

    // Delete a court type
    public function destroy($id)
    {

            // Find the Court model by ID
            $court_type = CourtType::findOrFail($id);

            // Delete the Court
            $court_type->delete();

            return response()->json(['message' => 'Court deleted']);
        }
        public function getCourtTypesWithSubTypes(Request $request)
        {
            $courtTypeId = $request->route('courtTypeId');
            
            if ($courtTypeId) {
                $courtSubTypes = CourtSubType::where('court_type_id', $courtTypeId)->get(['id', 'name', 'court_type_id']);
                return response()->json($courtSubTypes);
            }
            
            return response()->json(['error' => 'Invalid court type ID'], 400);
        }
        
}