<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfficeSettingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name ?? $this->appeal_type ?? $this->appeal_sub_type ?? $this->degree_name ?? $this->court_name ?? $this->case_type_name,
            'office_id' => $this->office_id,
            'is_system' => (bool) ($this->is_system ?? false),
            'parent_id' => $this->parent_id,
            'is_active' => (bool) ($this->is_active ?? true),
            'sort_order' => $this->sort_order,
            'is_locked' => (bool) ($this->is_locked ?? false),
            'court_level_id' => $this->court_level_id,
            'court_type_id' => $this->court_type_id,
            'court_id' => $this->court_id,
            'case_type_id' => $this->case_type_id,
            'doc_type_id' => $this->doc_type_id,
            'code' => $this->code,
            'symbol' => $this->symbol,
            'name_ar' => $this->name_ar,
            'name_en' => $this->name_en,
            'resolved_source' => $this->resolved_source,
            'resolved_from_system_id' => $this->resolved_from_system_id,
            'meta' => [
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
            ],
        ];
    }
}
