<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $guardName = (string) config('permissions.guard', 'web');
        $catalog = config('permissions.permissions', config('permissions.catalog', []));

        if (! is_array($catalog)) {
            throw new \RuntimeException('Invalid permissions catalog configuration.');
        }

        foreach ($catalog as $permissionName) {
            Permission::findOrCreate((string) $permissionName, $guardName);
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->command?->info('PermissionsSeeder: permission catalog synced.');
    }
}
