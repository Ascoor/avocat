<?php

namespace App\Http\Requests\Finance;

use Illuminate\Foundation\Http\FormRequest;

class StoreLedgerEntryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'office_id' => ['nullable', 'exists:offices,id'],
            'type' => ['required', 'in:expense,revenue,payment,invoice_adjustment'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'currency' => ['nullable', 'string', 'max:3'],
            'occurred_at' => ['nullable', 'date'],
            'description' => ['nullable', 'string', 'max:255'],
            'note' => ['nullable', 'string'],
            'category_type' => ['nullable', 'in:expense,revenue'],
            'category_id' => ['nullable', 'integer'],
            'leg_case_id' => ['nullable', 'exists:leg_cases,id'],
            'service_id' => ['nullable', 'exists:services,id'],
            'source_type' => ['nullable', 'string', 'max:255'],
            'source_id' => ['nullable', 'integer'],
            'status' => ['nullable', 'string', 'max:50'],
            'metadata' => ['nullable', 'array'],
        ];
    }
}
