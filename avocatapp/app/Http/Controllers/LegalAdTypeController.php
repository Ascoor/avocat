<?php

namespace App\Http\Controllers;

use App\Models\LegalAdType;
use Illuminate\Http\Request;

class LegalAdTypeController extends Controller
{
    public function index()
    {
        // Retrieve all legal ads types
        $legalAdTypes = LegalAdType::all();

        return response()->json($legalAdTypes);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required',
        ]);

        // Create a new legal ads type
        $legalAdsType = LegalAdType::create($validatedData);

        return response()->json($legalAdsType, 201);
    }

    public function show($id)
    {
        // Retrieve the specified legal ads type
        $legalAdsType = LegalAdType::findOrFail($id);

        return response()->json($legalAdsType);
    }

    public function update(Request $request, $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required',
        ]);

        // Update the specified legal ads type
        $legalAdsType = LegalAdType::findOrFail($id);
        $legalAdsType->update($validatedData);

        return response()->json($legalAdsType);
    }

    public function destroy($id)
    {
        // Delete the specified legal ads type
        $legalAdsType = LegalAdType::findOrFail($id);
        $legalAdsType->delete();

        return response()->json(null, 204);
    }
}
