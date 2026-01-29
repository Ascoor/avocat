<?php

namespace App\Http\Controllers\Api;

use App\Models\CaseType;
use App\Models\Court;
use App\Models\LegCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Validation\Rule;

class LegCaseController extends BaseApiController
{
    public function index(Request $request)
    {
        $legCases = LegCase::with([
            'courts',
            'clients',
            'caseType',
            'caseSubType',
            'lawyers',
            'createdBy',
            'updatedBy',
            'procedures',
            'legalAds',
            'legalSessions',
        ])
            ->orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->whereIn('status', ['قيد التجهيز', 'متداولة'])
            ->orderByRaw("FIELD(status, 'قيد التجهيز', 'متداولة') DESC")
            ->get();

        return response()->json($this->attachLegacyRelationsToCollection($legCases));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255', 'unique:leg_cases,slug'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'case_type_id' => ['required', 'integer'],
            'case_sub_type_id' => ['required', 'integer'],
            'client_capacity' => ['required', 'string', 'max:255'],
            'created_by' => ['required', 'integer'],
            'fees' => ['nullable', 'numeric'],
            'total_expenses' => ['nullable', 'numeric'],
            'total_payments' => ['nullable', 'numeric'],
            'expenses' => ['nullable', 'numeric'],
            'litigants_name' => ['nullable', 'string', 'max:255'],
            'litigants_address' => ['nullable', 'string', 'max:255'],
            'litigants_phone' => ['nullable', 'string', 'max:50'],
            'litigants_lawyer_name' => ['nullable', 'string', 'max:255'],
            'litigants_lawyer_phone' => ['nullable', 'string', 'max:50'],
            'status' => ['nullable', 'string', 'max:50'],
        ]);

        LegCase::create($validated);

        return response()->json(['message' => 'Leg case created successfully']);
    }

    public function show(Request $request, int $id)
    {
        $legCase = LegCase::with([
            'courts',
            'clients',
            'legalAds',
            'legalSessions',
            'caseType',
            'caseSubType',
            'lawyers',
            'createdBy',
            'updatedBy',
            'procedures',
            'legalSessions.lawyer',
            'legalSessions.court',
        ])->find($id);

        if (! $legCase) {
            return response()->json(['error' => 'LegCase not found'], 404);
        }

        return response()->json(['leg_case' => $this->attachLegacyRelations($legCase)]);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255', Rule::unique('leg_cases')->ignore($id)],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'case_type_id' => ['required', 'integer'],
            'case_sub_type_id' => ['required', 'integer'],
            'client_capacity' => ['required', 'string', 'max:255'],
            'updated_by' => ['required', 'integer'],
            'fees' => ['nullable', 'numeric'],
            'total_expenses' => ['nullable', 'numeric'],
            'total_payments' => ['nullable', 'numeric'],
            'expenses' => ['nullable', 'numeric'],
            'litigants_name' => ['nullable', 'string', 'max:255'],
            'litigants_address' => ['nullable', 'string', 'max:255'],
            'litigants_phone' => ['nullable', 'string', 'max:50'],
            'litigants_lawyer_name' => ['nullable', 'string', 'max:255'],
            'litigants_lawyer_phone' => ['nullable', 'string', 'max:50'],
            'status' => ['nullable', 'string', 'max:50'],
        ]);

        $legCase = LegCase::find($id);
        if (! $legCase) {
            return response()->json(['error' => 'LegCase not found'], 404);
        }

        $legCase->update($validated);

        return response()->json(['message' => 'Leg case updated successfully', 'data' => $legCase], 200);
    }

    public function destroy(Request $request, int $id)
    {
        $legCase = LegCase::find($id);

        if (! $legCase) {
            return response()->json(['error' => 'LegCase not found'], 404);
        }

        DB::beginTransaction();

        try {
            $legCase->legalSessions()->delete();
            $legCase->procedures()->delete();
            $legCase->legalAds()->delete();
            $legCase->clients()->detach();
            $legCase->courts()->detach();
            $legCase->lawyers()->detach();

            $legCase->delete();

            DB::commit();

            return response()->json(['message' => 'LegCase and associated records deleted successfully']);
        } catch (\Throwable $exception) {
            DB::rollBack();

            return response()->json(['error' => 'An error occurred during deletion'], 500);
        }
    }

    public function getCaseTypesWithCaseSubTypes(Request $request)
    {
        $caseTypes = CaseType::with('subTypes')->get();

        $caseTypes = $caseTypes->map(function (CaseType $caseType) {
            $caseType->setRelation('case_sub_types', $caseType->subTypes);
            $caseType->makeHidden(['sub_types', 'subTypes']);

            return $caseType;
        });

        return response()->json(['caseTypes' => $caseTypes]);
    }

    public function getLegCaseSearch(Request $request)
    {
        $searchQuery = $request->input('query', $request->input('search'));
        $filteredLegCases = LegCase::with([
            'courts',
            'clients',
            'caseType',
            'caseSubType',
            'lawyers',
            'createdBy',
            'updatedBy',
            'procedures',
            'legalAds',
            'legalSessions',
        ])
            ->when($searchQuery, function ($query) use ($searchQuery) {
                $query->where('slug', 'like', '%' . $searchQuery . '%')
                    ->orWhere('title', 'like', '%' . $searchQuery . '%')
                    ->orWhereHas('caseSubType', function ($subTypeQuery) use ($searchQuery) {
                        $subTypeQuery->where('name', 'like', '%' . $searchQuery . '%');
                    })
                    ->orWhereHas('clients', function ($clientQuery) use ($searchQuery) {
                        $clientQuery->where('name', 'like', '%' . $searchQuery . '%');
                    })
                    ->orWhereHas('courts', function ($courtQuery) use ($searchQuery) {
                        $courtQuery->where('name', 'like', '%' . $searchQuery . '%');
                    });
            })
            ->get();

        return response()->json($this->attachLegacyRelationsToCollection($filteredLegCases), 200);
    }

    public function addClients(Request $request, int $legCaseId)
    {
        $request->validate([
            'clients' => ['required', 'array'],
            'clients.*.client_id' => ['required', 'exists:clients,id'],
        ]);

        try {
            $legCase = LegCase::findOrFail($legCaseId);
            $attachedClientIds = $legCase->clients->pluck('id')->toArray();

            foreach ($request->input('clients') as $clientData) {
                $clientId = $clientData['client_id'];

                if (! in_array($clientId, $attachedClientIds, true)) {
                    $legCase->clients()->attach($clientId);
                }
            }

            return response()->json(['message' => 'Clients added successfully.']);
        } catch (\Throwable $exception) {
            return response()->json(['error' => 'Failed to add clients.'], 500);
        }
    }

    public function delete(Request $request, int $legCaseId, int $clientId)
    {
        $legalCase = LegCase::find($legCaseId);

        if (! $legalCase) {
            return response()->json(['message' => 'Legal case not found'], 404);
        }

        $clientExists = $legalCase->clients()->where('client_id', $clientId)->exists();

        if (! $clientExists) {
            return response()->json(['message' => 'Client not found in this legal case'], 404);
        }

        $legalCase->clients()->detach($clientId);

        return response()->json(['message' => 'Client removed from the legal case successfully'], 200);
    }

    public function addLegCaseCourts(Request $request)
    {
        $request->validate([
            'leg_case_id' => ['required', 'exists:leg_cases,id'],
            'courts' => ['required', 'array', 'min:1'],
            'courts.*.case_number' => ['required', 'string', 'max:255'],
            'courts.*.case_year' => ['required', 'integer', 'min:1900', 'max:' . date('Y')],
            'courts.*.court_id' => ['required', 'exists:courts,id'],
        ]);

        $legCase = LegCase::findOrFail($request->input('leg_case_id'));

        foreach ($request->input('courts') as $courtData) {
            $court = Court::findOrFail($courtData['court_id']);
            $legCase->courts()->syncWithoutDetaching([
                $court->id => [
                    'case_number' => $courtData['case_number'],
                    'case_year' => $courtData['case_year'],
                ],
            ]);
        }

        return response()->json(['message' => 'Leg case courts added successfully']);
    }

    public function removeCourtFromLegCase(Request $request)
    {
        $request->validate([
            'leg_case_id' => ['required', 'exists:leg_cases,id'],
            'court_id' => ['required', 'exists:courts,id'],
        ]);

        $legCase = LegCase::findOrFail($request->input('leg_case_id'));
        $court = Court::findOrFail($request->input('court_id'));

        $legCase->courts()->detach($court->id);

        return response()->json(['message' => 'Court removed from the leg case successfully']);
    }

    private function attachLegacyRelationsToCollection(Collection $cases): Collection
    {
        return $cases->map(function (LegCase $legCase) {
            return $this->attachLegacyRelations($legCase);
        });
    }

    private function attachLegacyRelations(LegCase $legCase): LegCase
    {
        if ($legCase->relationLoaded('legalSessions')) {
            $legCase->setAttribute('sessions', $legCase->legalSessions);
        }

        if ($legCase->relationLoaded('legalAds')) {
            $legCase->setAttribute('legalAds', $legCase->legalAds);
        }

        return $legCase;
    }
}
