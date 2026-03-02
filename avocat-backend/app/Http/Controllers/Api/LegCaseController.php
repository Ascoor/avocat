<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\{LegCase, Court, CaseType };
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Services\Notifications\NotificationEventService;
use App\Services\CaseWorkflowService;
class LegCaseController extends Controller
{
    public function __construct(
        private readonly NotificationEventService $notificationEvents,
        private readonly CaseWorkflowService $caseWorkflowService,
    )
    {
    }

    /**
     * Retrieves active legal cases for list views with lightweight relations.
     *
     * @return JsonResponse The JSON response containing the legal cases.
     */
    
    public function index(Request $request)
    {
        $isReportMode = $request->boolean('report_mode');

        $query = LegCase::query()
            ->select([
                'id', 'slug', 'title', 'client_capacity', 'status', 'case_type_id',
                'case_sub_type_id', 'created_at', 'updated_at',
            ])
            ->with([
                'clients:id,name',
                'caseSubType:id,name',
            ])
            ->withCount(['procedures', 'legalSessions']);

        if (! $isReportMode) {
            $query->whereIn('status', ['قيد التجهيز', 'متداولة']);
        }

        $query
            ->when($request->filled('client_name'), function ($builder) use ($request) {
                $builder->whereHas('clients', function ($clientQuery) use ($request) {
                    $clientQuery->where('name', 'like', '%'.$request->string('client_name').'%');
                });
            })
            ->when($request->filled('file_number'), fn ($builder) => $builder->where('slug', 'like', '%'.$request->string('file_number').'%'))
            ->when($request->filled('case_type_id'), fn ($builder) => $builder->where('case_type_id', $request->integer('case_type_id')))
            ->when($request->filled('case_status'), fn ($builder) => $builder->where('status', $request->string('case_status')))
            ->when($request->filled('from_date'), fn ($builder) => $builder->whereDate('updated_at', '>=', $request->date('from_date')))
            ->when($request->filled('to_date'), fn ($builder) => $builder->whereDate('updated_at', '<=', $request->date('to_date')))
            ->orderByDesc($request->input('sort_by', 'updated_at'))
            ->orderByDesc('id');

        if ($request->filled('limit')) {
            return response()->json(['data' => $query->limit((int) $request->input('limit'))->get()]);
        }

        return response()->json($query->cursorPaginate(30));
    }

    /**
     * Retrieves the case types along with their corresponding case subtypes.   
     *
     * @return \Illuminate\Http\JsonResponse The JSON response containing the case types and their subtypes.
     */
    public function getCaseTypesWithCaseSubTypes()
    {
        $caseTypes = CaseType::with('caseSubTypes')->get();

        $data = [
            'caseTypes' => $caseTypes,
        ];

        return response()->json($data);
    }

    /**
     * Store the data from the request in the database.
     *
     * @param Request $request The request object containing the data to be stored.
     * @return \Illuminate\Http\JsonResponse The JSON response indicating the success of the operation.
     */
    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'unique:leg_cases,slug',
            'title' => 'required',
            'description' => 'required',
            'case_type_id' => 'required',
            'case_sub_type_id' => 'required',

            'litigants_name' => 'nullable',
            'litigants_phone' => 'nullable',

            'client_capacity' => 'required',
            'created_by' => 'required',
        ]);

        // Create the leg case
        $legCase = new LegCase();
        $legCase->slug = $request->input('slug');
        $legCase->title = $request->input('title');
        $legCase->description = $request->input('description');
        $legCase->case_type_id = $request->input('case_type_id');
        $legCase->case_sub_type_id = $request->input('case_sub_type_id');
        $legCase->client_capacity = $request->input('client_capacity');
        $legCase->litigants_name = $request->input('litigants_name');
        $legCase->litigants_phone = $request->input('litigants_phone');
        $legCase->created_by = $request->input('created_by');
        $legCase->save();

        $this->notificationEvents->entityChanged([
            'type' => 'super_admin_entity_changed',
            'title' => __('notifications.case_created_title'),
            'message' => __('notifications.case_created_message', ['id' => $legCase->id, 'entity' => $legCase->title]),
            'entity_type' => 'case',
            'entity_id' => $legCase->id,
            'action' => 'created',
            'url' => '/dashboard/cases/'.$legCase->id,
            'actor_id' => (int) $request->input('created_by'),
            'meta' => ['notify_self' => (bool) $request->boolean('notify_self', false)],
        ]);

        return response()->json(['message' => 'Leg case created successfully']);
    }
    /**
     * Retrieves and returns a LegCase object based on the provided ID.
     *
     * @param int $id The ID of the LegCase object to retrieve.
     * @throws \Exception If the LegCase object is not found.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the retrieved LegCase object.
     */
    public function show($id)
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
            'procedures'
        ])->find($id);

        if (! $legCase) {
            return response()->json(['error' => 'LegCase not found'], 404);
        }

        $this->authorize('view', $legCase);

        return response()->json(['leg_case' => $legCase]);
    }

    /**
     * Update a Leg Case.
     *
     * @param \Illuminate\Http\Request $request The HTTP request.
     * @param int $id The ID of the Leg Case to update.
     * @return \Illuminate\Http\JsonResponse The JSON response.
     */

     public function update(Request $request, $id): \Illuminate\Http\JsonResponse
     {
         try {
             $validatedData = $request->validate([
                 'slug' => ['required', 'string', 'max:255', Rule::unique('leg_cases')->ignore($id)],
                 'title' => 'required|string|max:255',
                 'description' => 'required|string',
                 'case_type_id' => 'required|integer',
                 'case_sub_type_id' => 'required|integer',
                 'litigants_name' => 'nullable|string',
                 'litigants_phone' => 'nullable|string',
                 'client_capacity' => 'required|string',
                 'status' => ['sometimes', 'string', Rule::in([
                     CaseWorkflowService::STATUS_PREPARING,
                     CaseWorkflowService::STATUS_IN_PROGRESS,
                     CaseWorkflowService::STATUS_COMPLETED,
                     CaseWorkflowService::STATUS_SUSPENDED,
                 ])],
                 'updated_by' => 'required|integer',
             ]);
     
             $legCase = LegCase::findOrFail($id);
             $this->authorize('update', $legCase);

             if (array_key_exists('status', $validatedData)) {
                 $this->caseWorkflowService->validateTransition((string) $legCase->status, (string) $validatedData['status']);
             }

             $legCase->update($validatedData);


             $this->notificationEvents->entityChanged([
                 'type' => 'super_admin_entity_changed',
                 'title' => __('notifications.case_updated_title'),
                 'message' => __('notifications.case_updated_message', ['id' => $legCase->id, 'entity' => $legCase->title]),
                 'entity_type' => 'case',
                 'entity_id' => $legCase->id,
                 'action' => 'updated',
                 'url' => '/dashboard/cases/'.$legCase->id,
                 'actor_id' => (int) ($validatedData['updated_by'] ?? 0),
                 'meta' => ['notify_self' => (bool) $request->boolean('notify_self', false)],
             ]);

             Log::info('audit.case.updated', [
                 'case_id' => $legCase->id,
                 'actor_id' => optional($request->user())->id,
             ]);

             return response()->json(['message' => 'Leg case updated successfully', 'data' => $legCase], 200);
         } catch (ModelNotFoundException $e) {
             return response()->json(['error' => 'LegCase not found'], 404);
         } catch (\Exception $e) {
             return response()->json(['error' => 'An error occurred while updating the leg case'], 500);
         }
     }

    /**
     * Adds clients to a leg case.
     *
     * @param Request $request The request object.
     * @param int $legCaseId The ID of the leg case.
     * @throws \Exception If an error occurs while adding clients.
     * @return \Illuminate\Http\JsonResponse A JSON response indicating the success or failure of adding clients.
     */
    public function addClients(Request $request, $legCaseId)
    {
        $request->validate([
            'clients' => 'required|array',
            'clients.*.client_id' => 'required|exists:clients,id',
        ]);

        try {
            $legCase = LegCase::findOrFail($legCaseId);
            $attachedClientIds = $legCase->clients->pluck('id')->toArray();

            foreach ($request->input('clients') as $clientData) {
                $clientId = $clientData['client_id'];

                // Check if the client is already attached to the leg case
                if (!in_array($clientId, $attachedClientIds)) {
                    $legCase->clients()->attach($clientId);
                }
            }

            return response()->json(['message' => 'Clients added successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to add clients.'], 500);
        }
    }

    /**
     * Add Leg Case Courts.
     *
     * @param Request $request The HTTP request object
     * @throws ModelNotFoundException if the leg case is not found
     * @throws ModelNotFoundException if the court is not found
     * @return JsonResponse A JSON response with a success message
     */public function AddLegCaseCourts(Request $request)
{
    $request->validate([
        'leg_case_id' => 'required|exists:leg_cases,id',
        'courts' => 'required|array|min:1',
        'courts.*.case_number' => 'required|string|max:255',
        'courts.*.case_year' => 'required|integer|min:1900|max:' . date('Y'),
        'courts.*.court_id' => 'required|exists:courts,id',
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
/**
 * Remove a Court from a Leg Case.
 *
 * @param Request $request The HTTP request object
 * @throws ModelNotFoundException if the leg case is not found
 * @throws ModelNotFoundException if the court is not found
 * @return JsonResponse A JSON response with a success message
 */
public function RemoveCourtFromLegCase(Request $request)
{
    $request->validate([
        'leg_case_id' => 'required|exists:leg_cases,id',
        'court_id' => 'required|exists:courts,id',
    ]);

    $legCase = LegCase::findOrFail($request->input('leg_case_id'));
    $court = Court::findOrFail($request->input('court_id'));

    // Detach the court from the leg case
    $legCase->courts()->detach($court->id);

    return response()->json(['message' => 'Court removed from the leg case successfully']);
}

    /**
     * Retrieves leg cases based on a search query.
     *
     * @param Request $request The HTTP request object containing the search query.
     * @throws \Exception An error occurred while searching leg cases.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the filtered leg cases.
     */


public function getLegCaseSearch(Request $request)
{
    try {
        $searchQuery = $request->input('search');
        $perPage = $request->input('per_page', 15); // Default to 15 items per page

        $filteredLegCases = LegCase::with([
                'courts',
                'clients',
                'caseType',
                'caseSubType',
                'lawyers',
                'createdBy',
                'updatedBy',
                'procedures'
            ])
            ->where('slug', 'like', '%' . $searchQuery . '%')
            ->orWhere('title', 'like', '%' . $searchQuery . '%')
            ->orWhereHas('caseSubType', function ($subTypeQuery) use ($searchQuery) {
                $subTypeQuery->where('name', 'like', '%' . $searchQuery . '%');
            })
            ->orWhereHas('clients', function ($clientQuery) use ($searchQuery) {
                $clientQuery->where('name', 'like', '%' . $searchQuery . '%');
            })
            ->orWhereHas('courts', function ($courtQuery) use ($searchQuery) {
                $courtQuery->where('name', 'like', '%' . $searchQuery . '%');
            })
        
            ->get();

        return response()->json($filteredLegCases, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'An error occurred while searching leg cases'], 500);
    }
}


    /**
     * Delete a LegCase and its associated records.
     *
     * @param int $id The ID of the LegCase to be deleted.
     * @return \Illuminate\Http\JsonResponse The JSON response indicating the success or failure of the deletion.
     */public function delete($legCaseId, $clientId)
{
    // Find the legal case by ID
    $legalCase = LegCase::find($legCaseId);

    if (!$legalCase) {
        return response()->json(['message' => 'Legal case not found'], 404);
    }

    // Check if the client exists in the legal case
    $clientExists = $legalCase->clients()->where('client_id', $clientId)->exists();

    if (!$clientExists) {
        return response()->json(['message' => 'Client not found in this legal case'], 404);
    }

    // Detach the client from the legal case
    $legalCase->clients()->detach($clientId);

    return response()->json(['message' => 'Client removed from the legal case successfully'], 200);
}
    /**
     * Deletes a LegCase and its associated records from the database.
     *
     * @param int $id The ID of the LegCase to be deleted.
     * @throws \Exception If an error occurs during deletion.
     * @return \Illuminate\Http\JsonResponse A JSON response indicating the result of the deletion.
     */
    public function destroy(Request $request, $id)
    {
        $legCase = LegCase::find($id);

        if (! $legCase) {
            return response()->json(['error' => 'LegCase not found'], 404);
        }

        $this->authorize('delete', $legCase);

        DB::beginTransaction();

        try {
            if ($legCase->legalSessions()->exists()) {
                $legCase->legalSessions()->delete();
            }

            if ($legCase->procedures()->exists()) {
                $legCase->procedures()->delete();
            }

            if ($legCase->legalAds()->exists()) {
                $legCase->legalAds()->delete();
            }

            $legCase->delete();

            DB::commit();

            Log::info('audit.case.deleted', [
                'case_id' => $id,
                'actor_id' => optional($request->user())->id,
            ]);

            return response()->json(['message' => 'LegCase and associated records deleted successfully']);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'An error occurred during deletion'], 500);
        }

}

    public function workflowTransitions(int $id)
    {
        $legCase = LegCase::find($id);

        if (! $legCase) {
            return response()->json(['error' => 'LegCase not found'], 404);
        }

        $this->authorize('view', $legCase);

        return response()->json([
            'data' => [
                'current_status' => $legCase->status,
                'allowed_next_statuses' => $this->caseWorkflowService->allowedNextStatuses((string) $legCase->status),
            ],
        ]);
    }
}
