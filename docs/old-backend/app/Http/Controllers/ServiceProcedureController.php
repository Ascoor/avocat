<?php

namespace App\Http\Controllers;

use App\Models\ServiceProcedure;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class ServiceProcedureController extends Controller
{
    public function index($serviceId)
    {
        $serviceProcedures = ServiceProcedure::with('lawyer')
        ->where('service_id', $serviceId)
        ->get();

    return response()->json($serviceProcedures);
    }

    /**
     * Store a newly created service procedure in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Define validation rules
        $rules = [
            'service_id' => 'required|exists:services,id',
            'title' => 'required',
            'lawyer_id' => 'nullable|exists:lawyers,id',
            'job' => 'required',
            'place' => 'required',
            'date_start' => 'required|date',
            'date_end' => 'nullable|date',
            'cost' => 'nullable|numeric',
            'cost2' => 'nullable|numeric',
            'created_by' => 'required|exists:users,id',
            'updated_by' => 'nullable|exists:users,id',
        ];
        $validatedData = $request->validate($rules);

        try {
            // Format date fields to exclude time component
            $validatedData['date_start'] = Carbon::parse($validatedData['date_start'])->format('Y-m-d');
            if ($validatedData['date_end']) {
                $validatedData['date_end'] = Carbon::parse($validatedData['date_end'])->format('Y-m-d');
            }

            // Create a new service procedure record
            $serviceProcedure = new ServiceProcedure($validatedData);
            $serviceProcedure->save();

            // Return a success response
            return response()->json(['message' => 'Service procedure created successfully'], 201);
        } catch (\Exception $e) {
            // Handle any errors that occur during the save process
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }
    /**
     * Update the specified service procedure in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */


public function update(Request $request, $id)
{
    // Define validation rules for the update
    $rules = [
        'service_id' => 'required|exists:services,id',
        'title' => 'required|string',
        'lawyer_id' => 'nullable|exists:lawyers,id',
        'job' => 'required|string',
        'place' => 'required|string',
        'date_start' => 'required|date',
        'date_end' => 'nullable|date',
        'cost' => 'required|numeric',
        'cost2' => 'nullable|numeric',
        'status' => 'required',
        'result' => 'required',
        'updated_by' => 'nullable|exists:users,id',
    ];

    // Validate the request data
    $validatedData = $request->validate($rules);
    try {
        // Format date fields to exclude time component
        $validatedData['date_start'] = Carbon::parse($validatedData['date_start'])->format('Y-m-d');
        if ($validatedData['date_end']) {
            $validatedData['date_end'] = Carbon::parse($validatedData['date_end'])->format('Y-m-d');
        }

        // Find the existing service procedure by its ID
        $serviceProcedure = ServiceProcedure::find($id);

        if (!$serviceProcedure) {
            return response()->json(['message' => 'Service procedure not found'], 404);
        }

        // Update the service procedure with the validated data
        $serviceProcedure->update($validatedData);

        // Return a success response
        return response()->json(['message' => 'Service procedure updated successfully']);
    } catch (\Exception $e) {
        // Handle any errors that occur during the update process
        return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
    }
}
    /**
     * Remove the specified service procedure from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Find the service procedure by ID
        $serviceProcedure = ServiceProcedure::findOrFail($id);

        // Delete the service procedure
        $serviceProcedure->delete();

        return response()->json(null, 204);
    }
}
