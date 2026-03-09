<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OfficeCurrencyUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'default_currency_id' => [
                'required',
                'integer',
                Rule::exists('currencies', 'id')->where(fn ($query) => $query->where('is_active', true)),
            ],
        ];
    }
}
