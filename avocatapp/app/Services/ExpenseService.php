<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\Lawyer;

class ExpenseService
{
    public function createExpense($lawyerId, $amount, $description, $legCaseId)
    {
        $lawyer = Lawyer::find($lawyerId);
        $userId = $lawyer ? $lawyer->user_id : null;

        $expense = new Expense();
        $expense->user_id = $userId;
        $expense->amount = $amount;
        $expense->description = $description;
        $expense->leg_case_id = $legCaseId;
        $expense->save();

        return $expense;
    }
}
