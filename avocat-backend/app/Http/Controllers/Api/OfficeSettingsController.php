<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OfficeSettingStoreRequest;
use App\Http\Requests\OfficeSettingUpdateRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OfficeSettingsController extends Controller
{
    public function index(Request $request, int $officeId, string $entity): JsonResponse
    {
        $this->authorizeAccess($request, $officeId);
        $modelClass = $this->resolveModel($entity);

        $includeInactive = $request->boolean('include_inactive');

        $system = $modelClass::query()->whereNull('office_id');
        $office = $modelClass::query()->where('office_id', $officeId);

        if (! $includeInactive) {
            $system->where('is_active', true);
            $office->where('is_active', true);
        }

        $systemRecords = $system->orderBy('sort_order')->orderBy('name')->get()->keyBy('id');
        $officeRecords = $office->orderBy('sort_order')->orderBy('name')->get();

        $hiddenSystemIds = $officeRecords
            ->filter(fn (Model $item) => ! $item->is_active && $item->parent_id)
            ->pluck('parent_id')
            ->all();

        foreach ($hiddenSystemIds as $hiddenSystemId) {
            $systemRecords->forget($hiddenSystemId);
        }

        foreach ($officeRecords as $officeRecord) {
            if ($officeRecord->parent_id) {
                $systemRecords->forget($officeRecord->parent_id);
            }
        }

        $merged = $systemRecords->values()->merge($officeRecords)->sortBy([
            ['sort_order', 'asc'],
            ['name', 'asc'],
        ])->values();

        return response()->json([
            'data' => $merged,
            'meta' => [
                'entity' => $entity,
                'office_id' => $officeId,
            ],
        ]);
    }

    public function store(OfficeSettingStoreRequest $request, int $officeId, string $entity): JsonResponse
    {
        $this->authorizeAccess($request, $officeId);
        $modelClass = $this->resolveModel($entity);

        $payload = $request->validated();
        $payload['office_id'] = $officeId;
        $payload['is_system'] = false;

        $setting = $modelClass::create($payload);

        return response()->json(['data' => $setting], 201);
    }

    public function update(OfficeSettingUpdateRequest $request, int $officeId, string $entity, int $id): JsonResponse
    {
        $this->authorizeAccess($request, $officeId);
        $modelClass = $this->resolveModel($entity);

        $setting = $modelClass::query()->where('office_id', $officeId)->findOrFail($id);
        $setting->fill($request->validated());
        $setting->save();

        return response()->json(['data' => $setting]);
    }

    public function destroy(Request $request, int $officeId, string $entity, int $id): JsonResponse
    {
        $this->authorizeAccess($request, $officeId);
        $modelClass = $this->resolveModel($entity);

        $setting = $modelClass::query()->where('office_id', $officeId)->findOrFail($id);

        if ($this->isInUse($entity, $setting)) {
            $setting->is_active = false;
            $setting->save();

            return response()->json([
                'message' => 'لا يمكن حذف القيمة لأنها مستخدمة. تم تعطيلها بدلًا من ذلك.',
                'data' => [
                    'id' => $setting->id,
                    'is_active' => false,
                ],
            ], 409);
        }

        $setting->delete();

        return response()->json([], 204);
    }

    private function resolveModel(string $entity): string
    {
        $model = config("office_settings.entities.{$entity}.model");

        abort_unless(is_string($model), 404, 'Unsupported office settings entity.');

        return $model;
    }

    private function isInUse(string $entity, Model $model): bool
    {
        $check = config("office_settings.entities.{$entity}.in_use");

        if (is_callable($check)) {
            return (bool) $check($model);
        }

        return false;
    }

    private function authorizeAccess(Request $request, int $officeId): void
    {
        $user = $request->user();

        abort_unless($user, 401);

        $hasPermission = $user->can('officeSettings.manage') || $user->can('settings.manage') || $user->hasRole('admin');
        abort_unless($hasPermission, 403, 'Unauthorized office settings action.');
        abort_unless((int) $user->office_id === $officeId, 403, 'You are not allowed to access this office settings scope.');
    }
}
