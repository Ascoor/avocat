<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        $guardName = (string) config('permissions.guard', 'web');
        $allPermissions = Permission::query()->where('guard_name', $guardName)->pluck('name');
        $roleMap = config('permissions.roles', []);

        if (! is_array($roleMap)) {
            throw new \RuntimeException('Invalid permissions roles configuration.');
        }

        foreach ($roleMap as $roleName => $rules) {
            if (! is_array($rules)) {
                continue;
            }

            $role = Role::findOrCreate((string) $roleName, $guardName);
            $role->syncPermissions($this->resolvePermissions($rules, $allPermissions));
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->command?->info('RolesSeeder: roles and permissions synced.');
    }

    /**
     * @param  array<int, string>  $rules
     */
    private function resolvePermissions(array $rules, Collection $allPermissions): Collection
    {
        $resolved = collect();

        foreach ($rules as $rule) {
            if ($rule === '*') {
                $resolved = $resolved->merge($allPermissions);

                continue;
            }

            if (str_starts_with($rule, '!')) {
                $resolved = $resolved->reject(fn (string $permission): bool => $permission === substr($rule, 1));

                continue;
            }

            $resolved->push($rule);
        }

        return $resolved
            ->intersect($allPermissions)
            ->unique()
            ->values();
    }
}
