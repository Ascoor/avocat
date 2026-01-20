<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\LegalSessionType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Event;
use App\Models\Notification;
class LegalSessionTypeController extends Controller
{
    public function index()
    {
        $legalSessionTypes = LegalSessionType::all();


        return response()->json($legalSessionTypes);
    }

    public function show($id)
    {
        $legalSessionType = LegalSessionType::findOrFail($id);

        return response()->json($legalSessionType);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $legalSessionType = LegalSessionType::create($request->all());


 return response()->json(['message' => 'Legal session, event, and notification created successfully']);
}
    public function update(Request $request, $id)
    {
        $request->validate([
            'leg_case_id' => 'required',
            'court_id' => 'required',
            'date' => 'required',
            'roll_number' => 'required',
            'cost' => 'required|numeric',
            'cost2' => 'numeric|nullable',
            'status' => 'required',
            'lawyer_id' => 'required',
            'created_by' => 'required',
            'result' => 'required',
        ]);

        $legalSessionType = LegalSessionType::findOrFail($id);
        $legalSessionType->update($request->all());

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
                    'legal_session_id' => $legalSessionType->id,  // assuming there's a field like this
                    'amount' => json_encode($amountArray),
                    'description' => $request->result,
                    'expense_category_id' => '1',
                    'expense_date'=>$request->date,
                    'created_by' =>$request->created_by
                ]);
            }
        }

        return response()->json($legalSessionType, 200);
    }

    public function getByLegCaseId($legCaseId)
    {
        $legalSessionType = LegalSessionType::with([ 'legCase', 'lawyer', 'court', 'createdBy'])
                               ->where('leg_case_id', $legCaseId)
                               ->get();

        return response()->json($legalSessionType);
    }
    public function destroy($id)
    {
        LegalSessionType::destroy($id);

        return response()->json(null, 204);
    }
}
