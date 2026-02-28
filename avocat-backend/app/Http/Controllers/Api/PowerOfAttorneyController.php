<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PowerOfAttorney;
use Illuminate\Http\Request;

class PowerOfAttorneyController extends Controller
{
    public function index(Request $request)
    {
        $query = PowerOfAttorney::query()->with(['client', 'lawyer', 'attorneyType', 'legCases', 'legalDocs']);

        $query
            ->when($request->filled('client_name'), function ($builder) use ($request) {
                $builder->whereHas('client', function ($subQuery) use ($request) {
                    $subQuery->where('name', 'like', '%'.$request->string('client_name').'%');
                });
            })
            ->when($request->filled('lawyer_name'), function ($builder) use ($request) {
                $builder->whereHas('lawyer', function ($subQuery) use ($request) {
                    $subQuery->where('name', 'like', '%'.$request->string('lawyer_name').'%');
                });
            })
            ->when($request->filled('status'), fn ($builder) => $builder->where('status', $request->string('status')))
            ->orderByDesc('attorney_date')
            ->orderByDesc('id');

        return response()->json(['data' => $query->get()]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateRequest($request);

        $powerOfAttorney = PowerOfAttorney::create($validated);
        $powerOfAttorney->legCases()->sync($request->input('leg_case_ids', []));

        return response()->json([
            'message' => 'Power of attorney created successfully',
            'data' => $powerOfAttorney->load(['client', 'lawyer', 'attorneyType', 'legCases', 'legalDocs']),
        ], 201);
    }

    public function show(string $id)
    {
        $powerOfAttorney = PowerOfAttorney::with(['client', 'lawyer', 'attorneyType', 'legCases', 'legalDocs'])->findOrFail($id);

        return response()->json(['data' => $powerOfAttorney]);
    }

    public function update(Request $request, string $id)
    {
        $powerOfAttorney = PowerOfAttorney::findOrFail($id);
        $validated = $this->validateRequest($request, true);

        $powerOfAttorney->update($validated);

        if ($request->has('leg_case_ids')) {
            $powerOfAttorney->legCases()->sync($request->input('leg_case_ids', []));
        }

        return response()->json([
            'message' => 'Power of attorney updated successfully',
            'data' => $powerOfAttorney->load(['client', 'lawyer', 'attorneyType', 'legCases', 'legalDocs']),
        ]);
    }

    public function destroy(string $id)
    {
        $powerOfAttorney = PowerOfAttorney::findOrFail($id);
        $powerOfAttorney->delete();

        return response()->json(['message' => 'Power of attorney deleted successfully']);
    }

    private function validateRequest(Request $request, bool $isUpdate = false): array
    {
        $required = $isUpdate ? 'sometimes' : 'required';

        return $request->validate([
            'attorney_num' => $required.'|string|max:255',
            'attorney_date' => $required.'|date',
            'attorney_chart' => $required.'|string|max:255',
            'attorney_place' => $required.'|string|max:255',
            'title' => $required.'|string|max:255',
            'description' => 'nullable|string',
            'client_id' => $required.'|exists:clients,id',
            'lawyer_id' => 'nullable|exists:lawyers,id',
            'lawyer_insert' => $required.'|string',
            'image' => 'nullable|string|max:255',
            'created_by' => $required.'|exists:users,id',
            'updated_by' => 'nullable|exists:users,id',
            'attorney_type_id' => $required.'|exists:attorney_types,id',
            'status' => 'nullable|in:active,expired',
            'expires_at' => 'nullable|date',
            'leg_case_ids' => 'nullable|array',
            'leg_case_ids.*' => 'integer|exists:leg_cases,id',
        ]);
    }
}
