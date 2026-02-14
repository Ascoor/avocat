<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\Lawyer;

class ExpenseService
{
    public function createExpense(int|string $lawyerId, float|int|string $amount, string $description, int|string $legCaseId): Expense
    {
        $lawyer = Lawyer::find($lawyerId);
        $userId = $lawyer?->user_id;

        $expense = new Expense();
        $expense->user_id = $userId;
        $expense->amount = $amount;
        $expense->description = $description;
        $expense->leg_case_id = $legCaseId;
        $expense->save();

        return $expense;
    }
}
