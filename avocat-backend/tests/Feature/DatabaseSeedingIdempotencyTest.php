<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\AttorneyTypesTableSeeder;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class DatabaseSeedingIdempotencyTest extends TestCase
{
    use RefreshDatabase;

    public function test_attorney_types_can_be_seeded_twice_without_duplicates(): void
    {
        $this->seed(AttorneyTypesTableSeeder::class);
        $this->seed(AttorneyTypesTableSeeder::class);

        $this->assertSame(3, DB::table('attorney_types')->count());
        $this->assertEqualsCanonicalizing([
            'التفويض العام',
            'التفويض الخاص',
            'التفويض للإجراءات القضائية',
        ], DB::table('attorney_types')->pluck('name')->all());
    }

    public function test_full_database_seed_is_idempotent_and_preserves_passwords(): void
    {
        config([
            'seeding.primary_user.name' => 'Primary User',
            'seeding.primary_user.email' => 'primary@example.test',
            'seeding.primary_user.password' => 'primary-secret',
            'seeding.super_admin.email' => 'admin@example.test',
            'seeding.super_admin.password' => 'admin-secret',
        ]);

        $this->seed(DatabaseSeeder::class);

        $trackedTables = [
            // References and exported business records.
            'attorney_types', 'courts', 'case_types', 'case_sub_types', 'clients',
            'leg_cases', 'procedures', 'legal_sessions', 'legal_ads', 'service_procedures',
            // Relationships.
            'leg_case_client', 'leg_case_court', 'service_client',
            // Financial records.
            'revenues', 'expenses', 'invoices', 'payments',
        ];
        $counts = collect($trackedTables)->mapWithKeys(
            fn (string $table): array => [$table => DB::table($table)->count()]
        )->all();
        $passwords = User::query()->pluck('password', 'email')->all();

        $this->seed(DatabaseSeeder::class);

        foreach ($counts as $table => $count) {
            $this->assertSame($count, DB::table($table)->count(), "{$table} row count changed after reseeding.");
        }

        foreach ($passwords as $email => $password) {
            $this->assertSame($password, User::query()->where('email', $email)->value('password'));
        }

        $this->assertTrue(Hash::check('primary-secret', User::where('email', 'primary@example.test')->value('password')));
        $this->assertTrue(Hash::check('admin-secret', User::where('email', 'admin@example.test')->value('password')));
        $this->assertDatabaseMissing('users', ['email' => 'user2@example.com']);
    }
}
