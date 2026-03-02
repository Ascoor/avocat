<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\LegalSession;
use App\Models\LegCase;
use App\Models\Event;
use Illuminate\Support\Facades\Log;
use App\Services\Notifications\NotificationEventService;
use App\Services\SessionSchedulingService;
class LegalSessionController extends Controller
{
    public function __construct(
        private readonly NotificationEventService $notificationEvents,
        private readonly SessionSchedulingService $sessionSchedulingService,
    )
    {
    }
    public function index(Request $request)
    {
        $query = LegalSession::with(['legCase.clients', 'lawyer', 'court', 'legalSessionType', 'createdBy']);

        $query
            ->when($request->filled('client_name'), function ($builder) use ($request) {
                $builder->whereHas('legCase.clients', fn ($q) => $q->where('name', 'like', '%'.$request->string('client_name').'%'));
            })
            ->when($request->filled('lawyer_id'), fn ($builder) => $builder->where('lawyer_id', $request->integer('lawyer_id')))
            ->when($request->filled('session_type_id'), fn ($builder) => $builder->where('legal_session_type_id', $request->integer('session_type_id')))
            ->when($request->filled('session_status'), fn ($builder) => $builder->where('status', $request->string('session_status')))
            ->when($request->filled('from_date'), fn ($builder) => $builder->whereDate('updated_at', '>=', $request->date('from_date')))
            ->when($request->filled('to_date'), fn ($builder) => $builder->whereDate('updated_at', '<=', $request->date('to_date')))
            ->orderByDesc($request->input('sort_by', 'updated_at'))
            ->orderByDesc('id');

        if ($request->filled('limit')) {
            return response()->json(['data' => $query->limit((int) $request->input('limit'))->get()]);
        }

        return response()->json($query->get());
    }

    public function show($id)
    {
        $legalSession = LegalSession::findOrFail($id);
        $this->authorize('view', $legalSession);

        return response()->json($legalSession);
    }

    public function store(Request $request)
    {
        $request->validate([
            'leg_case_id' => 'required',
            'court_id' => 'required',
            
            'session_date' => 'required',
            'session_roll' => 'nullable',
            'session_court' => 'nullable',
            'cost1' => 'numeric|nullable',
            'cost2' => 'numeric|nullable',
            'cost3' => 'numeric|nullable',
            'lawyer_id' => 'required',
            'created_by' => 'required',
        ]);

        $this->sessionSchedulingService->ensureNoConflicts(
            $request->input('lawyer_id'),
            $request->input('court_id'),
            $request->input('session_date'),
            $request->input('session_roll'),
        );

        $legalSession = LegalSession::create($request->all());
 // Step 2: Create Calendar Event
 $event = new Event();
 $event->user_id = $request->created_by;
 $event->title = "legal session";
 $event->date = $request->session_date;
 $event->description = "Legal session with case ID " . $request->leg_case_id;
 $event->save();

        $this->notificationEvents->entityChanged([
            'type' => 'super_admin_entity_changed',
            'title' => __('notifications.session_created_title'),
            'message' => __('notifications.session_created_message', ['id' => $legalSession->id]),
            'entity_type' => 'session',
            'entity_id' => $legalSession->id,
            'action' => 'created',
            'url' => '/dashboard/sessions/'.$legalSession->id,
            'actor_id' => (int) $request->input('created_by'),
        ]);

        $this->notificationEvents->assignmentChanged([
            'type' => 'assignee_changed',
            'title' => __('notifications.assignment_created_title'),
            'message' => __('notifications.assignment_created_message', ['entity' => __('notifications.entities.session'), 'id' => $legalSession->id]),
            'entity_type' => 'session',
            'entity_id' => $legalSession->id,
            'action' => 'assigned',
            'url' => '/dashboard/sessions/'.$legalSession->id,
            'actor_id' => (int) $request->input('created_by'),
            'meta' => [
                'new_lawyer_id' => (int) $request->input('lawyer_id'),
                'entity_label' => __('notifications.entities.session'),
            ],
        ]);

 return response()->json(['message' => 'Legal session and event created successfully']);
}
    public function update(Request $request, $id)
    {
        $request->validate([
            'leg_case_id' => 'required',
            'court_id' => 'required',
            'session_date' => 'required',
            'session_roll' => 'required',
            'cost1' => 'required|numeric',
            'cost2' => 'numeric|nullable',
            'cost3' => 'numeric|nullable',
            'status' => 'required',
            'lawyer_id' => 'required',
            'created_by' => 'required',
            'Judgment_operative' => 'required',
            'result' => 'required',
        ]);

        $this->sessionSchedulingService->ensureNoConflicts(
            $request->input('lawyer_id'),
            $request->input('court_id'),
            $request->input('session_date'),
            $request->input('session_roll'),
            (int) $id,
        );

        $legalSession = LegalSession::findOrFail($id);
        $this->authorize('update', $legalSession);
        $previousLawyerId = $legalSession->lawyer_id;
        $legalSession->update($request->all());

        $this->notificationEvents->entityChanged([
            'type' => 'super_admin_entity_changed',
            'title' => __('notifications.session_updated_title'),
            'message' => __('notifications.session_updated_message', ['id' => $legalSession->id]),
            'entity_type' => 'session',
            'entity_id' => $legalSession->id,
            'action' => 'updated',
            'url' => '/dashboard/sessions/'.$legalSession->id,
            'actor_id' => (int) $request->input('created_by'),
        ]);

        if ((int) $previousLawyerId !== (int) $request->input('lawyer_id')) {
            $this->notificationEvents->assignmentChanged([
                'type' => 'assignee_changed',
                'title' => __('notifications.assignment_updated_title'),
                'message' => __('notifications.assignment_updated_message', ['entity' => __('notifications.entities.session'), 'id' => $legalSession->id]),
                'entity_type' => 'session',
                'entity_id' => $legalSession->id,
                'action' => $previousLawyerId ? 'reassigned' : 'assigned',
                'url' => '/dashboard/sessions/'.$legalSession->id,
                'actor_id' => (int) $request->input('created_by'),
                'meta' => [
                    'new_lawyer_id' => (int) $request->input('lawyer_id'),
                    'previous_lawyer_id' => $previousLawyerId,
                    'entity_label' => __('notifications.entities.session'),
                ],
            ]);
        }

        Log::info('audit.session.updated', [
            'session_id' => $legalSession->id,
            'actor_id' => optional($request->user())->id,
        ]);

        // Check if the status is 'منتهي'
        if ($request->status === 'منتهي') {

            $existingExpense = Expense::where('leg_case_id', $request->leg_case_id)
                                      ->where('legal_session_id', $id) // assuming there's a field like this
                                      ->first();

            $amountArray = [
                'cost' => $request->cost,
                'cost2' => $request->cost2,
            ];

            if ($existingExpense) {
                // Update existing record
                $existingExpense->update([
                    'amount' => json_encode($amountArray),
                    'description' =>$request->result,
                ]);
            } else {
                // Create new record
                Expense::create([
                    'leg_case_id' => $request->leg_case_id,
                    'legal_session_id' => $legalSession->id,  // assuming there's a field like this
                    'amount' => json_encode($amountArray),
                    'description' => $request->result,
                    'expense_category_id' => '1',
                    'expense_date'=>$request->session_date,
                    'created_by' =>$request->created_by
                ]);
            }
        }

        return response()->json($legalSession, 200);
    }

    public function getSessionsByLegCaseId($legCaseId)
{
    try {
        // Fetch the legal case with its sessions and related data
        $legalCase = LegCase::with([
            'legalSessions.legalSessionType',
            'legalSessions.court',
            'legalSessions.lawyer',
            'legalSessions.createdBy',
        ])->findOrFail($legCaseId);

        // Return the legal case with its sessions
        return response()->json([
            'success' => true,
            'data' => $legalCase->legalSessions,
            'message' => 'legal sessions for the legal case retrieved successfully.',
        ], 200);

    } catch (\Exception $e) {
        // Handle errors gracefully
        return response()->json([
            'success' => false,
            'message' => 'Failed to retrieve legal sessions for the legal case.',
            'error' => $e->getMessage(),
        ], 500);
    }
}


    public function getByCourtId($courtId)
    {
        $sessions = LegalSession::where('court_id', $courtId)
            ->with(['legalSessionType', 'legCase', 'court', 'lawyer'])
            ->get();

        return response()->json($sessions);
    }

    public function getByLawyerId($lawyerId)
    {
        $sessions = LegalSession::where('lawyer_id', $lawyerId)
            ->with(['legalSessionType', 'legCase', 'court', 'lawyer'])
            ->get();

        return response()->json($sessions);
    }

    public function destroy(Request $request, $id)
    {
        $legalSession = LegalSession::findOrFail($id);
        $this->authorize('delete', $legalSession);
        $legalSession->delete();

        Log::info('audit.session.deleted', [
            'session_id' => $id,
            'actor_id' => optional($request->user())->id,
        ]);

        return response()->json(null, 204);
    }
}
