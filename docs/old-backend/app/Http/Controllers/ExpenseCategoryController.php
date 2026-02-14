<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;

class ExpenseCategoryController extends Controller
{
    public function index()

        {
            $expense_categories = ExpenseCategory::all();
            return response()->json([$expense_categories], 200);
        }

        public function store(Request $request)
        {
            $request->validate([
                'name' => 'required|unique:expense_categories,name',
            ]);
        
            // التأكد من عدم تكرار نفس الاسم قبل الحفظ
            $existingCategory = ExpenseCategory::where('name', $request->name)->first();
            if ($existingCategory) {
                return response()->json(['message' => 'هذا الاسم موجود بالفعل'], 409);
            }
        
            $expenseCategory = ExpenseCategory::create(['name' => $request->name]);
        
            return response()->json($expenseCategory, 201);
        }


        

        // Create  update expense category
        
        public function update(Request $request, $id)
        {
            $request->validate([
                'name' => 'required|unique:expense_categories,name,' . $id,
            ]);
        
            $expenseCategory = ExpenseCategory::findOrFail($id);
            $expenseCategory->update(['name' => $request->name]);
        
            return response()->json($expenseCategory, 200);
        }

        // destroy expense category
        public function destroy($id)
        {
            $expenseCategory = ExpenseCategory::findOrFail($id);
            $expenseCategory->delete();
        
            return response()->json(null, 204);
        }


}
