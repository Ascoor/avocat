<?php

namespace App\Http\Controllers;

use App\Models\ProcedurePlaceType;
use Illuminate\Http\Request;

class ProcedurePlaceTypeController extends Controller
{
    // Get all procedure types
    public function index()
    {
        $procedurePlaceTypes = ProcedurePlaceType::all();

        return response()->json($procedurePlaceTypes);
    }

    // Get a specific procedure type
    public function show($id)
    {
        $procedurePlaceType = ProcedurePlaceType::find($id);
        if (! $procedurePlaceType) {
            return response()->json(['message' => 'Procedure place type not found'], 404);
        }

        return response()->json($procedurePlaceType);
    }

    // Create a new procedure type
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $procedurePlaceType = new ProcedurePlaceType();
        $procedurePlaceType->name = $request->input('name');
        $procedurePlaceType->save();

        return response()->json($procedurePlaceType, 201);
    }

    // Update a procedure type
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $procedurePlaceType = ProcedurePlaceType::find($id);
        if (! $procedurePlaceType) {
            return response()->json(['message' => 'Procedure place type not found'], 404);
        }

        $procedurePlaceType->name = $request->input('name');
        $procedurePlaceType->save();

        return response()->json($procedurePlaceType);
    }

    // Delete a procedure type
    public function destroy($id)
    {
        $procedurePlaceType = procedurePlaceType::find($id);
    
        if (!$procedurePlaceType) {
            return response()->json(['message' => 'Case Sub Type not found'], 404);
        }
    
        $procedurePlaceType->delete();
    
        return response()->json(null, 204);
    }
    
}
