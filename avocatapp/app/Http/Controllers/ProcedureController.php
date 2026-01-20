<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Expense;
use App\Models\Notification;
use App\Models\Procedure;
use Illuminate\Http\Request;

class ProcedureController extends Controller
{
    public function index()
    {
        $procedures = Procedure::with([
            'procedureType',
            'legCase',
            'procedurePlaceType',
            'lawyer',
            'event',
            'createdBy',
            'updatedBy'
        ])->get();

        return response()->json($procedures);
    }

    // Store a newly created resource in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'procedure_type_id' => 'required|exists:procedure_types,id',
            'leg_case_id' => 'required|exists:leg_cases,id',
            'procedure_place_name' => 'nullable|string',
            'procedure_place_type_id' => 'nullable|exists:procedure_place_types,id',
            'lawyer_id' => 'nullable|exists:lawyers,id',
            'job' => 'required|string',
            'result' => 'nullable|string',
            'note' => 'nullable|string',
            'status' => 'required|in:تمت,لم ينفذ,جاري التنفيذ',
            'event_id' => 'nullable|exists:events,id',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date',
            'cost1' => 'nullable|numeric',
            'cost2' => 'nullable|numeric',
            'cost3' => 'nullable|numeric',
            'created_by' => 'required|exists:users,id',
        ]);

        $procedure = Procedure::create($validatedData);

        return response()->json(['message' => 'Procedure created successfully', 'data' => $procedure]);
    }
 

    // Get procedures by procedure_type_id
    public function getByProcedureTypeId($procedureTypeId)
    {
        $procedures = Procedure::where('procedure_type_id', $procedureTypeId)->get();

        return response()->json($procedures);
    }

    // Get procedures by leg_case_id
    public function getByLegCaseId($legCaseId)
    {
        $procedures = Procedure::with(['procedureType:id,name', 'legCase', 'lawyer', 'procedurePlaceType:id,name', 'createdBy'])
                               ->where('leg_case_id', $legCaseId)
                               ->get();

        return response()->json($procedures);
    }
 


    // Update the specified resource in storage
    public function update(Request $request, $id)
    {
        $procedure = Procedure::findOrFail($id);

        $validatedData = $request->validate([
            'procedure_type_id' => 'required|exists:procedure_types,id',
            'leg_case_id' => 'required|exists:leg_cases,id',
            'procedure_place_name' => 'nullable|string',
            'procedure_place_type_id' => 'nullable|exists:procedure_place_types,id',
            'lawyer_id' => 'nullable|exists:lawyers,id',
            'job' => 'required|string',
            'result' => 'nullable|string',
            'note' => 'nullable|string',
            'status' => 'required|in:تمت,لم ينفذ,جاري التنفيذ',
            'event_id' => 'nullable|exists:events,id',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date',
            'cost1' => 'nullable|numeric',
            'cost2' => 'nullable|numeric',
            'cost3' => 'nullable|numeric',
            'updated_by' => 'required|exists:users,id',
        ]);

        $procedure->update($validatedData);

        return response()->json(['message' => 'Procedure updated successfully', 'data' => $procedure]);
    }

    // Remove the specified resource from storage
    public function destroy($id)
    {
        $procedure = Procedure::findOrFail($id);
        $procedure->delete();

        return response()->json(['message' => 'Procedure deleted successfully']);
    }
}
