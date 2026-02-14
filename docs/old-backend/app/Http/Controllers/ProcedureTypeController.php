<?php

namespace App\Http\Controllers;

use App\Models\ProcedureType;
use Illuminate\Http\Request;

class ProcedureTypeController extends Controller
{
    // Get all procedure types
    public function index()
    {
        $procedureTypes = ProcedureType::all();

        return response()->json($procedureTypes);
    }

    // Get a specific procedure type
    public function show($id)
    {
        $procedureType = ProcedureType::find($id);
        if (! $procedureType) {
            return response()->json(['message' => 'Procedure type not found'], 404);
        }

        return response()->json($procedureType);
    }

    // Create a new procedure type
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $procedureType = new ProcedureType();
        $procedureType->name = $request->input('name');
        $procedureType->save();

        return response()->json($procedureType, 201);
    }

    // Update a procedure type
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $procedureType = ProcedureType::find($id);
        if (! $procedureType) {
            return response()->json(['message' => 'Procedure type not found'], 404);
        }

        $procedureType->name = $request->input('name');
        $procedureType->save();

        return response()->json($procedureType);
    }

    // Delete a procedure type
    public function destroy($id)
    {
        $procedureType = procedureType::find($id);
    
        if (!$procedureType) {
            return response()->json(['message' => 'Case Sub Type not found'], 404);
        }
    
        $procedureType->delete();
    
        return response()->json(null, 204);
    }
    
}
