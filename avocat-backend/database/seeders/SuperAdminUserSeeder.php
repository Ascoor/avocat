<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use RuntimeException;
use Spatie\Permission\PermissionRegistrar;

class SuperAdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $password = env('ADMIN_SEED_PASSWORD');

        if (! $password) {
            if (app()->environment('local')) {
                $password = 'ChangeMe!123456';
            } else {
                throw new RuntimeException('ADMIN_SEED_PASSWORD must be set in non-local environments.');
            }
        }

        $user = User::updateOrCreate(
            ['email' => env('SUPER_ADMIN_EMAIL', 'admin@domain.com')],
            [
                'name' => 'Super Admin',
                'password' => Hash::make($password),
            ]
        );

        $guardName = (string) config('permissions.guard', 'api');
        $role = Role::findOrCreate('super_admin', $guardName);

        $user->syncRoles([$role]);

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->command?->info('SuperAdminUserSeeder: super admin account synced.');
    }
}
