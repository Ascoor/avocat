<?php

namespace App\Http\Controllers\Api;

use App\Models\Office;
use App\Http\Controllers\Controller;
use App\Http\Requests\OfficeSettingUpsertRequest;
use App\Http\Resources\OfficeSettingResource;
use App\Support\OfficeSettings\OfficeSettingsManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LookupController extends Controller
{
    public function __construct(private readonly OfficeSettingsManager $manager)
    {
    }

    public function index(Request $request, string $entity): JsonResponse
    {
        $officeId = $this->resolveOfficeId($request);
        $includeInactive = $request->boolean('include_inactive', false);
        $filters = $request->except('include_inactive');

        $records = $this->manager->list($officeId, $entity, $includeInactive, $filters);

        return response()->json([
            'data' => OfficeSettingResource::collection($records),
            'meta' => [
                'office_id' => $officeId,
                'entity' => $entity,
                'include_inactive' => $includeInactive,
            ],
        ]);
    }

    public function store(OfficeSettingUpsertRequest $request, string $entity): JsonResponse
    {
        $officeId = $this->resolveOfficeId($request);

        $record = $this->manager->store($officeId, $entity, $request->validated());

        return response()->json([
            'message' => 'Setting created successfully.',
            'data' => new OfficeSettingResource($record),
            'meta' => ['office_id' => $officeId, 'entity' => $entity],
        ], 201);
    }

    public function update(OfficeSettingUpsertRequest $request, string $entity, int $id): JsonResponse
    {
        $officeId = $this->resolveOfficeId($request);

        $record = $this->manager->update($officeId, $entity, $id, $request->validated());

        return response()->json([
            'message' => 'Setting updated successfully.',
            'data' => new OfficeSettingResource($record),
            'meta' => ['office_id' => $officeId, 'entity' => $entity],
        ]);
    }

    public function destroy(Request $request, string $entity, int $id): JsonResponse
    {
        $officeId = $this->resolveOfficeId($request);

        $result = $this->manager->destroy($officeId, $entity, $id);

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

    private function resolveOfficeId(Request $request): int
    {
        $user = $request->user();
        abort_unless($user, 401, 'Unauthenticated.');

        $canManage = $user->can('officeSettings.manage')
            || $user->can('settings.manage')
            || $user->hasRole('admin')
            || $user->hasRole('super_admin');

        abort_unless($canManage, 403, 'Missing permission officeSettings.manage.');

        $officeId = (int) ($user->office_id ?? 0);

        if ($officeId > 0) {
            return $officeId;
        }

        // Backward-compatible fallback for environments with legacy users missing office_id.
        // Only applied when there is exactly one office to avoid cross-office data leakage.
        $singleOffice = Office::query()->select('id')->limit(2)->pluck('id');

        if ($singleOffice->count() === 1) {
            return (int) $singleOffice->first();
        }

        abort(403, 'Missing user office scope.');
    }
}
