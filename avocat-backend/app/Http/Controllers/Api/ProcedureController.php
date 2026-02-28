<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Event;
use App\Models\Expense;
use App\Models\Notification;
use App\Models\Procedure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use App\Services\Notifications\NotificationEventService;

class ProcedureController extends Controller
{
    public function __construct(private readonly NotificationEventService $notificationEvents)
    {
    }
    public function index()
    {
        $with = [];

        if (Schema::hasTable('procedure_types') && Schema::hasColumn('procedures', 'procedure_type_id')) {
            $with[] = 'procedureType';
        }
        if (Schema::hasTable('leg_cases') && Schema::hasColumn('procedures', 'leg_case_id')) {
            $with[] = 'legCase';
        }
        if (Schema::hasTable('procedure_place_types') && Schema::hasColumn('procedures', 'procedure_place_type_id')) {
            $with[] = 'procedurePlaceType';
        }
        if (Schema::hasTable('lawyers') && Schema::hasColumn('procedures', 'lawyer_id')) {
            $with[] = 'lawyer';
        }
        if (Schema::hasTable('users') && Schema::hasColumn('procedures', 'created_by')) {
            $with[] = 'createdBy';
        }
        if (Schema::hasTable('users') && Schema::hasColumn('procedures', 'updated_by')) {
            $with[] = 'updatedBy';
        }
        if (Schema::hasTable('events') && Schema::hasColumn('procedures', 'event_id')) {
            $with[] = 'event';
        }

        $procedures = Procedure::with($with)->get();

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

        $this->notificationEvents->entityChanged([
            'type' => 'super_admin_entity_changed',
            'title' => __('notifications.procedure_created_title'),
            'message' => __('notifications.procedure_created_message', ['id' => $procedure->id]),
            'entity_type' => 'procedure',
            'entity_id' => $procedure->id,
            'action' => 'created',
            'url' => '/dashboard/procedures/'.$procedure->id,
            'actor_id' => (int) $validatedData['created_by'],
        ]);

        if (! empty($validatedData['lawyer_id'])) {
            $this->notificationEvents->assignmentChanged([
                'type' => 'assignee_changed',
                'title' => __('notifications.assignment_created_title'),
                'message' => __('notifications.assignment_created_message', ['entity' => __('notifications.entities.procedure'), 'id' => $procedure->id]),
                'entity_type' => 'procedure',
                'entity_id' => $procedure->id,
                'action' => 'assigned',
                'url' => '/dashboard/procedures/'.$procedure->id,
                'actor_id' => (int) $validatedData['created_by'],
                'meta' => [
                    'new_lawyer_id' => (int) $validatedData['lawyer_id'],
                    'entity_label' => __('notifications.entities.procedure'),
                ],
            ]);
        }

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

        $previousLawyerId = $procedure->lawyer_id;
        $procedure->update($validatedData);

        $this->notificationEvents->entityChanged([
            'type' => 'super_admin_entity_changed',
            'title' => __('notifications.procedure_updated_title'),
            'message' => __('notifications.procedure_updated_message', ['id' => $procedure->id]),
            'entity_type' => 'procedure',
            'entity_id' => $procedure->id,
            'action' => 'updated',
            'url' => '/dashboard/procedures/'.$procedure->id,
            'actor_id' => (int) $validatedData['updated_by'],
        ]);

        if (($validatedData['lawyer_id'] ?? null) && (int) $previousLawyerId !== (int) $validatedData['lawyer_id']) {
            $this->notificationEvents->assignmentChanged([
                'type' => 'assignee_changed',
                'title' => __('notifications.assignment_updated_title'),
                'message' => __('notifications.assignment_updated_message', ['entity' => __('notifications.entities.procedure'), 'id' => $procedure->id]),
                'entity_type' => 'procedure',
                'entity_id' => $procedure->id,
                'action' => $previousLawyerId ? 'reassigned' : 'assigned',
                'url' => '/dashboard/procedures/'.$procedure->id,
                'actor_id' => (int) $validatedData['updated_by'],
                'meta' => [
                    'new_lawyer_id' => (int) $validatedData['lawyer_id'],
                    'previous_lawyer_id' => $previousLawyerId,
                    'entity_label' => __('notifications.entities.procedure'),
                ],
            ]);
        }

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
