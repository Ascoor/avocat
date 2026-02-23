<?php

namespace App\Http\Resources\Finance;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LedgerEntryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'amount' => $this->amount,
            'occurred_at' => optional($this->occurred_at)?->toISOString(),
            'description' => $this->description,
            'note' => $this->note,
            'category_type' => $this->category_type,
            'category_id' => $this->category_id,
            'leg_case_id' => $this->leg_case_id,
            'service_id' => $this->service_id,
            'source_type' => $this->source_type,
            'source_id' => $this->source_id,
            'status' => $this->status,
            'metadata' => $this->metadata,
        ];
    }
}
