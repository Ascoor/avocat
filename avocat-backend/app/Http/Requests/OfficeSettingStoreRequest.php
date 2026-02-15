<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class OfficeSettingStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $officeId = (int) $this->route('officeId');
        $entity = (string) $this->route('entity');
        $entityRules = config("office_settings.entities.{$entity}.rules", []);

        return array_merge([
            'name' => [
                'required',
                'string',
                'max:255',
                function (string $attribute, mixed $value, \Closure $fail) use ($entity, $officeId): void {
                    $exists = DB::table($entity)
                        ->where('office_id', $officeId)
                        ->whereRaw('LOWER(name) = ?', [mb_strtolower((string) $value)])
                        ->whereNull('deleted_at')
                        ->exists();

                    if ($exists) {
                        $fail('The name has already been taken.');
                    }
                },
            ],
            'is_active' => ['sometimes', 'boolean'],
            'sort_order' => ['sometimes', 'integer'],
            'parent_id' => ['nullable', 'integer'],
        ], $entityRules);
    }
}
