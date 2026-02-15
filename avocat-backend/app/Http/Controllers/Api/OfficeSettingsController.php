<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OfficeSettingUpsertRequest;
use App\Http\Resources\OfficeSettingResource;
use App\Support\OfficeSettings\OfficeSettingsManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OfficeSettingsController extends Controller
{
    public function __construct(private readonly OfficeSettingsManager $manager)
    {
    }

    public function index(Request $request, int $officeId, string $entity): JsonResponse
    {
        $this->authorizeScope($request, $officeId);

        $includeInactive = $request->boolean('include_inactive', false);

        $records = $this->manager->list($officeId, $entity, $includeInactive);

        return response()->json([
            'data' => OfficeSettingResource::collection($records),
            'meta' => [
                'office_id' => $officeId,
                'entity' => $entity,
                'include_inactive' => $includeInactive,
            ],
        ]);
    }

    public function store(OfficeSettingUpsertRequest $request, int $officeId, string $entity): JsonResponse
    {
        $this->authorizeScope($request, $officeId);

        $record = $this->manager->store($officeId, $entity, $request->validated());

        return response()->json([
            'message' => 'Setting created successfully.',
            'data' => new OfficeSettingResource($record),
            'meta' => ['office_id' => $officeId, 'entity' => $entity],
        ], 201);
    }

    public function update(OfficeSettingUpsertRequest $request, int $officeId, string $entity, int $id): JsonResponse
    {
        $this->authorizeScope($request, $officeId);

        $record = $this->manager->update($officeId, $entity, $id, $request->validated());

        return response()->json([
            'message' => 'Setting updated successfully.',
            'data' => new OfficeSettingResource($record),
            'meta' => ['office_id' => $officeId, 'entity' => $entity],
        ]);
    }

    public function destroy(Request $request, int $officeId, string $entity, int $id): JsonResponse
    {
        $this->authorizeScope($request, $officeId);

        $result = $this->manager->destroy($officeId, $entity, $id);

        // Always return JSON (front-end friendly)
        // If you prefer true delete to return 204, you can conditionally do so when $result['deleted'] is true.
        return response()->json([
            'message' => $result['deleted']
                ? 'Setting deleted successfully.'
                : 'Setting is in use; deactivated instead of deletion.',
            'deleted' => (bool) $result['deleted'],
            'deactivated' => (bool) $result['deactivated'],
            'data' => new OfficeSettingResource($result['record']),
            'meta' => ['office_id' => $officeId, 'entity' => $entity],
        ], $result['deleted'] ? 200 : 409);
    }

    private function authorizeScope(Request $request, int $officeId): void
    {
        $user = $request->user();
        abort_unless($user, 401, 'Unauthenticated.');

        // Permission gate
        $canManage = $user->can('officeSettings.manage')
            || $user->can('settings.manage') // keep for backward compatibility if you want
            || $user->hasRole('admin')
            || $user->hasRole('super_admin');

        abort_unless($canManage, 403, 'Missing permission officeSettings.manage.');

        // ABAC scope
        abort_unless(
            isset($user->office_id) && (int) $user->office_id === $officeId,
            403,
            'ABAC office scope mismatch.'
        );
    }
}
