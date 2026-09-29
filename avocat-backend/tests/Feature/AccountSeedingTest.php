<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\OfficesTableSeeder;
use Database\Seeders\PermissionsSeeder;
use Database\Seeders\RolesSeeder;
use Database\Seeders\SuperAdminUserSeeder;
use Database\Seeders\UsersTableSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use RuntimeException;
use Tests\TestCase;

class AccountSeedingTest extends TestCase
{
    use RefreshDatabase;

    public function test_production_configuration_rejects_missing_bootstrap_credentials(): void
    {
        $this->app->detectEnvironment(fn (): string => 'production');

        config([
            'seeding.primary_user.name' => null,
            'seeding.primary_user.email' => null,
            'seeding.primary_user.password' => null,
        ]);

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('PRIMARY_USER_NAME must be set');

        UsersTableSeeder::validateConfiguration();
    }

    public function test_production_configuration_rejects_missing_super_admin_credentials(): void
    {
        $this->app->detectEnvironment(fn (): string => 'production');

        config([
            'seeding.super_admin.email' => null,
            'seeding.super_admin.password' => null,
        ]);

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('SUPER_ADMIN_EMAIL must be set');

        SuperAdminUserSeeder::validateConfiguration();
    }

    public function test_reseeding_does_not_reset_bootstrap_account_passwords(): void
    {
        config([
            'seeding.primary_user.name' => 'Primary User',
            'seeding.primary_user.email' => 'primary@example.test',
            'seeding.primary_user.password' => 'initial-primary-secret',
            'seeding.super_admin.email' => 'admin@example.test',
            'seeding.super_admin.password' => 'initial-admin-secret',
        ]);

        $this->seed(OfficesTableSeeder::class);
        $this->seed(UsersTableSeeder::class);
        $this->seed(PermissionsSeeder::class);
        $this->seed(RolesSeeder::class);
        $this->seed(SuperAdminUserSeeder::class);

        config([
            'seeding.primary_user.password' => 'replacement-primary-secret',
            'seeding.super_admin.password' => 'replacement-admin-secret',
        ]);

        $this->seed(UsersTableSeeder::class);
        $this->seed(SuperAdminUserSeeder::class);

        $primary = User::where('email', 'primary@example.test')->firstOrFail();
        $admin = User::where('email', 'admin@example.test')->firstOrFail();

        $this->assertTrue(Hash::check('initial-primary-secret', $primary->password));
        $this->assertFalse(Hash::check('replacement-primary-secret', $primary->password));
        $this->assertTrue(Hash::check('initial-admin-secret', $admin->password));
        $this->assertFalse(Hash::check('replacement-admin-secret', $admin->password));
        $this->assertTrue($admin->hasRole('super_admin'));
        $this->assertNotNull($admin->office_id);
        $this->assertDatabaseMissing('users', ['email' => 'user2@example.com']);
    }
}
