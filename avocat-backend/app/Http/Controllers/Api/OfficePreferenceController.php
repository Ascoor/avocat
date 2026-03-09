<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OfficeCurrencyUpdateRequest;
use App\Http\Resources\OfficePreferenceResource;
use App\Models\Office;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OfficePreferenceController extends Controller
{
    public function show(Request $request, int $officeId): JsonResponse
    {
        $this->authorizeScope($request, $officeId);

        $office = Office::query()->with('defaultCurrency')->findOrFail($officeId);

        return response()->json([
            'data' => new OfficePreferenceResource($office),
        ]);
    }

    public function update(OfficeCurrencyUpdateRequest $request, int $officeId): JsonResponse
    {
        $this->authorizeScope($request, $officeId);

        $office = Office::query()->findOrFail($officeId);
        $office->default_currency_id = $request->integer('default_currency_id');
        $office->save();
        $office->load('defaultCurrency');

        return response()->json([
            'message' => 'Office preferences updated successfully.',
            'data' => new OfficePreferenceResource($office),
        ]);
    }

    private function authorizeScope(Request $request, int $officeId): void
    {
        $user = $request->user();
        abort_unless($user, 401, 'Unauthenticated.');

        $canManage = $user->can('officeSettings.manage')
            || $user->can('settings.manage')
            || $user->hasRole('admin')
            || $user->hasRole('super_admin');

        abort_unless($canManage, 403, 'Missing permission officeSettings.manage.');

        abort_unless(
            isset($user->office_id) && (int) $user->office_id === $officeId,
            403,
            'ABAC office scope mismatch.'
        );
    }
}
