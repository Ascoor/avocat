<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\LegalSession;
use App\Models\LegCase;
use App\Models\Event;
use App\Models\Notification;
class LegalSessionController extends Controller
{
    public function index()
    {
        $legalSessions = LegalSession::with([ 'legCase', 'lawyer', 'court','legalSessionType', 'createdBy'])
        ->get();


        return response()->json($legalSessions);
    }

    public function show($id)
    {
        $legalSession = LegalSession::findOrFail($id);

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

        $legalSession = LegalSession::create($request->all());
 // Step 2: Create Calendar Event
 $event = new Event();
 $event->user_id = $request->created_by;
 $event->title = "legal session";
 $event->date = $request->session_date;
 $event->description = "Legal session with case ID " . $request->leg_case_id;
 $event->save();

    // Create a Notification
    $notification = new Notification();
    $notification->user_id = $request->created_by;
    $notification->event_id = $event->id; // Assuming Event model returns id on save
    $notification->type = 'Legal Session'; // Example type
    $notification->message = 'A new legal session has been created. Please check your agenda.';
    $notification->read = false;
    $notification->save();

 return response()->json(['message' => 'Legal session, event, and notification created successfully']);
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

        $legalSession = LegalSession::findOrFail($id);
        $legalSession->update($request->all());

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
            'sessions.legalSessionType',
            'sessions.court',
            'sessions.lawyer',
            'sessions.createdBy',
        ])->findOrFail($legCaseId);

        // Return the legal case with its sessions
        return response()->json([
            'success' => true,
            'data' => $legalCase->sessions,
            'message' => 'Sessions for the legal case retrieved successfully.',
        ], 200);

    } catch (\Exception $e) {
        // Handle errors gracefully
        return response()->json([
            'success' => false,
            'message' => 'Failed to retrieve sessions for the legal case.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

    public function destroy($id)
    {
        LegalSession::destroy($id);

        return response()->json(null, 204);
    }
}
