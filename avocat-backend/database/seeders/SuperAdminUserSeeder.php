<?php

namespace Database\Seeders;

use App\Models\Office;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class SuperAdminUserSeeder extends Seeder
{
    public static function validateConfiguration(): void
    {
        if (app()->environment(['local', 'testing'])) {
            return;
        }

        foreach (['email' => 'SUPER_ADMIN_EMAIL', 'password' => 'ADMIN_SEED_PASSWORD'] as $field => $variable) {
            if (blank(config("seeding.super_admin.{$field}"))) {
                throw new RuntimeException("{$variable} must be set before seeding outside local/testing environments.");
            }
        }
    }

    public function run(): void
    {
        self::validateConfiguration();

        $email = config('seeding.super_admin.email');
        $password = config('seeding.super_admin.password');

        // Local/test databases may omit the production bootstrap administrator.
        if (blank($email) || blank($password)) {
            $this->command?->warn('SuperAdminUserSeeder: super admin skipped; bootstrap variables are not configured.');

            return;
        }

        $defaultOffice = Office::firstOrCreate(
            ['slug' => 'default-office'],
            ['name' => 'Default Office']
        );

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => 'Super Admin',
                'password' => Hash::make($password),
                'office_id' => $defaultOffice->id,
            ]
        );

        if ($user->office_id === null) {
            $user->forceFill(['office_id' => $defaultOffice->id])->save();
        }

        $guardName = (string) config('permissions.guard', 'web');
        $role = Role::findOrCreate('super_admin', $guardName);

        $user->syncRoles([$role]);

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->command?->info('SuperAdminUserSeeder: super admin account synced.');
    }
}
