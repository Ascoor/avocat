<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\HandlesLookupCrud;
use App\Http\Controllers\Controller;
use App\Models\ExpenseCategory;

class ExpenseCategoryController extends Controller
{
    use HandlesLookupCrud;

    protected string $lookupModel = ExpenseCategory::class;
}
