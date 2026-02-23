<?php

namespace App\Http\Controllers\Api\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

trait HandlesLookupCrud
{
    protected function lookupModelClass(): string
    {
        return $this->lookupModel;
    }

    public function index(Request $request): JsonResponse
    {
        $model = $this->lookupModelClass();
        $query = $model::query()->whereNull('deleted_at');

        if ($term = $request->string('q')->toString()) {
            $query->whereRaw('LOWER(name) LIKE ?', ['%'.mb_strtolower($term).'%']);
        }

        return response()->json(['data' => $query->orderBy('sort_order')->orderBy('name')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate(['name' => 'required|string|max:255', 'office_id' => 'nullable|integer']);

        $model = $this->lookupModelClass();
        $duplicate = $model::query()
            ->whereRaw('LOWER(name) = ?', [mb_strtolower($request->string('name')->toString())])
            ->where('office_id', $request->input('office_id'))
            ->whereNull('deleted_at')
            ->exists();

        if ($duplicate) {
            return response()->json(['message' => 'Lookup name already exists in this scope.'], 422);
        }

        $record = $model::create($request->only(['name', 'office_id']) + [
            'is_system' => ! $request->filled('office_id'),
            'is_active' => true,
        ]);

        return response()->json(['data' => $record], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate(['name' => 'required|string|max:255']);
        $model = $this->lookupModelClass();
        /** @var Model $record */
        $record = $model::findOrFail($id);

        if ((bool) $record->getAttribute('is_locked')) {
            return response()->json(['message' => 'Locked lookup cannot be updated.'], 409);
        }

        $record->update(['name' => $request->string('name')->toString()]);

        return response()->json(['data' => $record]);
    }

    public function destroy(int $id): JsonResponse
    {
        $model = $this->lookupModelClass();
        /** @var Model $record */
        $record = $model::findOrFail($id);

        if ((bool) $record->getAttribute('is_locked')) {
            return response()->json(['message' => 'Locked lookup cannot be deleted.'], 409);
        }

        if (array_key_exists('deleted_at', $record->getAttributes())) {
            $record->update(['deleted_at' => now(), 'is_active' => false]);
        } else {
            $record->delete();
        }

        return response()->json(null, 204);
    }
}
