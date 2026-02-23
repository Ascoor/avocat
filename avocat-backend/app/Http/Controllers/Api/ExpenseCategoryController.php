<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\HandlesLookupCrud;
use App\Http\Controllers\Controller;

class ExpenseCategoryController extends Controller
{
    use HandlesLookupCrud;

    protected function lookupModelClass(): string
    {
        return \App\Models\ExpenseCategory::class;
    }
}
