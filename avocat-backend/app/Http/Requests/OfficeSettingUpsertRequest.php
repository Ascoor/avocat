<?php

namespace App\Http\Requests;

use App\Support\OfficeSettings\OfficeSettingsManager;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class OfficeSettingUpsertRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $entity = (string) $this->route('entity');
        $manager = app(OfficeSettingsManager::class);
        $config = $manager->validateEntity($entity);
        $manager->ensureOperationAllowed($config, $this->isMethod('POST') ? 'store' : 'update');

        $nameColumn = $config['name_column'];
        $table = (new $config['model']())->getTable();
        $officeId = (int) $this->route('officeId');
        $id = $this->route('id') ? (int) $this->route('id') : null;

        $rules = [
            $nameColumn => [
                'required',
                'string',
                'max:255',
                function (string $attribute, mixed $value, \Closure $fail) use ($table, $officeId, $id, $nameColumn) {
                    $query = DB::table($table)
                        ->whereNull('deleted_at')
                        ->where('office_id', $officeId)
                        ->whereRaw("lower({$nameColumn}) = lower(?)", [(string) $value]);

                    if ($id) {
                        $query->where('id', '!=', $id);
                    }

                    if ($query->exists()) {
                        $fail('The name has already been taken in this office scope.');
                    }
                },
            ],
            'is_active' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
            'is_locked' => ['sometimes', 'boolean'],
            'parent_id' => ['nullable', 'integer'],
        ];

        foreach (($config['required_columns'] ?? []) as $column) {
            $rules[$column] = ['required', 'integer'];
        }

        return array_merge($rules, $config['rules'] ?? []);
    }
}
