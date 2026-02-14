<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        $guardName = (string) config('permissions.guard', 'web');

        $role = Role::firstOrCreate([
            'name' => 'super_admin',
            'guard_name' => $guardName,
        ]);

        $role->syncPermissions(Permission::query()->where('guard_name', $guardName)->get());

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->command?->info('RolesSeeder: super_admin role synced with all permissions.');
    }
}
