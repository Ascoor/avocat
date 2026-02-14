<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Procedure;
use Illuminate\Http\Request;

class ProcedureSearchController extends Controller
{
    public function searchFilters(Request $request)
    {
        $validated = $request->validate([
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date|after_or_equal:date_start',
            'lawyer_id' => 'nullable|exists:lawyers,id',
            'procedure_type_id' => 'nullable|exists:procedure_types,id',
            'procedure_place_type_id' => 'nullable|exists:procedure_place_types,id',
            'status' => 'nullable|in:تمت,لم ينفذ,جاري التنفيذ',
        ]);

        $query = Procedure::query();

        if (!empty($validated['date_start']) && !empty($validated['date_end'])) {
            $query->whereBetween('date_start', [$validated['date_start'], $validated['date_end']]);
        }

        if (!empty($validated['lawyer_id'])) {
            $query->where('lawyer_id', $validated['lawyer_id']);
        }

        if (!empty($validated['procedure_type_id'])) {
            $query->where('procedure_type_id', $validated['procedure_type_id']);
        }

        if (!empty($validated['procedure_place_type_id'])) {
            $query->where('procedure_place_type_id', $validated['procedure_place_type_id']);
        }

        if (!empty($validated['status'])) {
            $query->where('status', $validated['status']);
        }

        $procedures = $query
            ->with([
                'legCase:id,slug,title',
                'lawyer:id,name',
                'createdBy:id,name',
                'procedurePlaceType:id,name',
                'procedureType:id,name',
            ])
            ->orderByDesc('date_start')
            ->orderByDesc('id')
            ->get();

        return response()->json($procedures);
    }
}
