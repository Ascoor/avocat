<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfficePreferenceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'office_id' => $this->id,
            'default_currency_id' => $this->default_currency_id,
            'default_currency' => $this->defaultCurrency ? [
                'id' => $this->defaultCurrency->id,
                'code' => $this->defaultCurrency->code,
                'symbol' => $this->defaultCurrency->symbol,
                'name' => $this->defaultCurrency->name,
                'name_ar' => $this->defaultCurrency->name_ar,
                'name_en' => $this->defaultCurrency->name_en,
            ] : null,
        ];
    }
}
