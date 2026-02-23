<?php

namespace App\Support\OfficeSettings;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;

class OfficeSettingsManager
{
    public function entityConfig(string $entity): array
    {
        return config("office_settings.entities.{$entity}", []);
    }

    public function validateEntity(string $entity): array
    {
        $config = $this->entityConfig($entity);
        abort_if($config === [], 404, 'Unknown office setting entity.');

        return $config;
    }

    public function list(int $officeId, string $entity, bool $includeInactive = false): Collection
    {
        $config = $this->validateEntity($entity);
        $modelClass = $config['model'];
        $nameColumn = $config['name_column'];
        $mode = $config['mode'] ?? 'system_overrides';

        if ($mode === 'system_only') {
            $query = $modelClass::query();
            if (! $includeInactive && $this->hasColumn($modelClass, 'is_active')) {
                $query->where('is_active', true);
            }

            $records = $query
                ->orderByRaw("{$nameColumn} ASC")
                ->get();

            $records->each(fn (Model $model) => $this->decorate($model, 'system_only', null));

            return $records;
        }

        if ($mode === 'office_specific') {
            $query = $modelClass::query()
                ->where('office_id', $officeId)
                ->whereNull('deleted_at');

            if (! $includeInactive && $this->hasColumn($modelClass, 'is_active')) {
                $query->where('is_active', true);
            }

            $records = $query
                ->orderByRaw('sort_order asc nulls last')
                ->orderBy($nameColumn)
                ->get();

            $records->each(fn (Model $model) => $this->decorate($model, 'office', null));

            return $records;
        }

        $systemRows = $modelClass::query()
            ->where('is_system', true)
            ->whereNull('office_id')
            ->whereNull('deleted_at')
            ->get();

        $officeRows = $modelClass::query()
            ->where('office_id', $officeId)
            ->whereNull('deleted_at')
            ->get();

        $overrides = $officeRows->whereNotNull('parent_id')->keyBy('parent_id');
        $officeAdded = $officeRows->whereNull('parent_id');

        $resolved = new Collection();
        foreach ($systemRows as $systemRow) {
            $override = $overrides->get($systemRow->id);
            if ($override instanceof Model) {
                if (! $includeInactive && ! $override->is_active) {
                    continue;
                }

                $resolved->push($this->decorate($override, 'office_override', $systemRow->id));
                continue;
            }

            if ($includeInactive || ! $this->hasColumn($modelClass, 'is_active') || $systemRow->is_active) {
                $resolved->push($this->decorate($systemRow, 'system', $systemRow->id));
            }
        }

        foreach ($officeAdded as $officeRow) {
            if ($includeInactive || ! $this->hasColumn($modelClass, 'is_active') || $officeRow->is_active) {
                $resolved->push($this->decorate($officeRow, 'office', null));
            }
        }

        $sorted = $resolved
            ->sortBy([
                fn (Model $row) => $row->sort_order ?? PHP_INT_MAX,
                fn (Model $row) => mb_strtolower((string) $row->{$nameColumn}),
            ])
            ->values();

        return new Collection($sorted->all());
    }

    public function store(int $officeId, string $entity, array $payload): Model
    {
        $config = $this->validateEntity($entity);
        $this->ensureOperationAllowed($config, 'store');

        $modelClass = $config['model'];
        $mode = $config['mode'] ?? 'system_overrides';

        /** @var Model $model */
        $model = new $modelClass();
        $this->fillCommon($model, $config, $payload);

        if ($mode === 'office_specific') {
            $model->office_id = $officeId;
            $model->is_system = false;
            $model->parent_id = null;
        } else {
            $model->office_id = $officeId;
            $model->is_system = false;
            $model->parent_id = Arr::get($payload, 'parent_id');
        }

        $model->save();

        return $model;
    }

    public function update(int $officeId, string $entity, int $id, array $payload): Model
    {
        $config = $this->validateEntity($entity);
        $this->ensureOperationAllowed($config, 'update');

        $modelClass = $config['model'];
        $mode = $config['mode'] ?? 'system_overrides';

        /** @var Model|null $record */
        $record = $modelClass::query()->find($id);
        abort_if(! $record, 404, 'Setting not found.');

        if ($mode === 'system_only') {
            abort(403, 'Entity is read-only.');
        }

        if ($mode === 'system_overrides' && (bool) $record->is_system === true) {
            $override = $modelClass::query()
                ->where('office_id', $officeId)
                ->where('parent_id', $record->id)
                ->whereNull('deleted_at')
                ->first();

            if (! $override) {
                $override = new $modelClass();
                $override->office_id = $officeId;
                $override->is_system = false;
                $override->parent_id = $record->id;
            }

            $this->fillCommon($override, $config, $payload);
            $override->save();

            return $override;
        }

        abort_if((int) $record->office_id !== $officeId, 403, 'Office scope mismatch.');

        $this->fillCommon($record, $config, $payload);
        $record->save();

        return $record;
    }

    public function destroy(int $officeId, string $entity, int $id): array
    {
        $config = $this->validateEntity($entity);
        $this->ensureOperationAllowed($config, 'destroy');

        $modelClass = $config['model'];
        /** @var Model|null $record */
        $record = $modelClass::query()->find($id);
        abort_if(! $record, 404, 'Setting not found.');

        if ((bool) ($record->is_locked ?? false) === true) {
            abort(409, 'Cannot delete locked setting.');
        }

        $inUse = isset($config['in_use_checker']) && is_callable($config['in_use_checker'])
            ? (bool) call_user_func($config['in_use_checker'], (int) $record->id)
            : false;

        if ($inUse) {
            $record->is_active = false;
            $record->save();

            return ['deleted' => false, 'deactivated' => true, 'record' => $record];
        }

        if ((bool) $record->is_system) {
            $disableOverride = $modelClass::query()
                ->where('office_id', $officeId)
                ->where('parent_id', $record->id)
                ->whereNull('deleted_at')
                ->first();

            if (! $disableOverride) {
                $disableOverride = new $modelClass();
                $disableOverride->office_id = $officeId;
                $disableOverride->is_system = false;
                $disableOverride->parent_id = $record->id;
                $disableOverride->{$config['name_column']} = $record->{$config['name_column']};
                $disableOverride->sort_order = $record->sort_order;
                $disableOverride->is_locked = false;
            }

            $disableOverride->is_active = false;
            $disableOverride->save();

            return ['deleted' => false, 'deactivated' => true, 'record' => $disableOverride];
        }

        abort_if((int) $record->office_id !== $officeId, 403, 'Office scope mismatch.');

        $record->deleted_at = Carbon::now();
        $record->save();

        return ['deleted' => true, 'deactivated' => false, 'record' => $record];
    }

    public function ensureOperationAllowed(array $config, string $operation): void
    {
        abort_unless(in_array($operation, $config['operations'] ?? [], true), 403, 'Operation not allowed for this entity.');
    }

    private function fillCommon(Model $model, array $config, array $payload): void
    {
        $nameColumn = $config['name_column'];
        $requiredColumns = $config['required_columns'] ?? [];

        $model->{$nameColumn} = $payload[$nameColumn];
        $model->is_active = (bool) ($payload['is_active'] ?? true);
        $model->sort_order = $payload['sort_order'] ?? null;
        $model->is_locked = (bool) ($payload['is_locked'] ?? false);

        foreach ($requiredColumns as $column) {
            if (array_key_exists($column, $payload)) {
                $model->{$column} = $payload[$column];
            }
        }
    }

    private function decorate(Model $model, string $resolvedSource, ?int $resolvedFrom): Model
    {
        $model->setAttribute('resolved_source', $resolvedSource);
        $model->setAttribute('resolved_from_system_id', $resolvedFrom);

        return $model;
    }

    private function hasColumn(string $modelClass, string $column): bool
    {
        $model = new $modelClass();

        return Schema::connection($model->getConnectionName())->hasColumn($model->getTable(), $column);
    }
}
