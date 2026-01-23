<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class ExpenseController extends BaseApiController
{
    public function searchExpenses(Request $request)
    {
        return $this->notImplementedResponse('Expense search endpoint not implemented yet.');
    }
}
