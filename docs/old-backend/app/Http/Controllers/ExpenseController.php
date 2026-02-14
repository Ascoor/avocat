<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expense;
use App\Models\LegCase;
use App\Models\Service;
use Exception;

class ExpenseController extends Controller
{
    public function searchExpenses(Request $request)
    {
        try {
            // Retrieve the search criteria from the request
            $searchCriteria = $request->all();

            // Initialize a query builder for the Expense model
            $query = Expense::query();

            // Apply filters based on the search criteria

            // Add identifier to the criteria if it has a value
            if (isset($searchCriteria['identifier'])) {
                $identifier = $searchCriteria['identifier'];
                // Fetch the relevant legCase or service based on the identifier
                $legCase = LegCase::where('slug', $identifier)->first();
                $service = Service::where('service_no', $identifier)->first();

                if ($legCase) {
                    // Filter expenses for the leg case
                    $query->where('leg_case_id', $legCase->id);
                } elseif ($service) {
                    // Filter expenses for the service
                    $query->where('service_id', $service->id);
                } else {
                    // Identifier not found in leg_cases or services
                    return response()->json(['message' => 'Identifier not found in leg_cases or services'], 404);
                }
            }

            // Continue adding filters for other search criteria (category, startDate, endDate) as needed

            // Define the relationships to be eager-loaded
            $relationships = [
                'service:id,service_no',
                'leg_case:id,slug',
                'expense_category:id,name',
                'user:id,name' // Assuming 'created_by' corresponds to a 'user' relation
            ];

            // Retrieve expenses based on the applied filters and eager-load relationships
            $expenses = $query->with($relationships)->get();

            // Return the filtered expenses
            return response()->json(['filtered_expenses' => $expenses], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred'], 500);
        }
    }
}
