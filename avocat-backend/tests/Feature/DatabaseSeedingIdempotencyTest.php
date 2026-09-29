<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\AttorneyTypesTableSeeder;
use Database\Seeders\DatabaseSeeder;
use Database\Seeders\SeedData;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
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

    public function test_seed_data_supports_id_and_keyless_tables_without_overwriting(): void
    {
        Schema::create('seed_data_keyless_test', function (Blueprint $table): void {
            $table->unsignedBigInteger('left_id');
            $table->unsignedBigInteger('right_id')->nullable();
            $table->string('metadata')->nullable();
        });

        SeedData::insertMissingById('case_types', [['id' => 900001, 'name' => 'original']]);
        DB::table('case_types')->where('id', 900001)->update(['name' => 'production edit']);
        SeedData::insertMissingById('case_types', [['id' => 900001, 'name' => 'stale export']]);

        $rows = [
            ['left_id' => 1, 'right_id' => null, 'metadata' => 'first'],
            ['left_id' => 1, 'right_id' => 2, 'metadata' => 'second'],
        ];
        SeedData::insertMissingRows('seed_data_keyless_test', $rows);
        SeedData::insertMissingRows('seed_data_keyless_test', $rows);

        $this->assertSame('production edit', DB::table('case_types')->where('id', 900001)->value('name'));
        $this->assertSame(2, DB::table('seed_data_keyless_test')->count());
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
        $expense = DB::table('expenses')->where('description', 'مصروفات جلسة')->first();
        $this->assertNotNull($expense);
        DB::table('expenses')->where('id', $expense->id)->update([
            'note' => 'Production-maintained note',
            'amount' => '{"value": 150.000}',
        ]);
        $financialTotals = [
            'revenues' => DB::table('revenues')->sum('amount'),
            'invoices' => DB::table('invoices')->sum('total_amount'),
            'payments' => DB::table('payments')->sum('amount'),
        ];

        $clientId = DB::table('clients')->value('id');
        DB::table('clients')->where('id', $clientId)->update(['name' => 'Production-maintained name']);
        $lawyerId = DB::table('lawyers')->value('id');
        DB::table('lawyers')->where('id', $lawyerId)->update(['name' => 'Production-maintained lawyer']);

        $this->seed(DatabaseSeeder::class);
        $this->seed(DatabaseSeeder::class);

        foreach ($counts as $table => $count) {
            $this->assertSame($count, DB::table($table)->count(), "{$table} row count changed after reseeding.");
        }

        foreach ($passwords as $email => $password) {
            $this->assertSame($password, User::query()->where('email', $email)->value('password'));
        }

        foreach ($financialTotals as $table => $total) {
            $column = $table === 'invoices' ? 'total_amount' : 'amount';
            $this->assertEquals($total, DB::table($table)->sum($column), "{$table} total changed after reseeding.");
        }

        $this->assertSame('Production-maintained name', DB::table('clients')->where('id', $clientId)->value('name'));
        $this->assertSame('Production-maintained lawyer', DB::table('lawyers')->where('id', $lawyerId)->value('name'));
        $this->assertSame(1, DB::table('expenses')->where('description', 'مصروفات جلسة')->count());
        $this->assertSame('Production-maintained note', DB::table('expenses')->where('id', $expense->id)->value('note'));
        $this->assertEquals(
            ['value' => 150.0],
            json_decode(DB::table('expenses')->where('id', $expense->id)->value('amount'), true)
        );
        $this->assertSame(1335, DB::table('leg_case_court')->count());
        $distinctCourtRows = DB::query()->fromSub(
            DB::table('leg_case_court')
                ->select(['leg_case_id', 'court_id', 'case_number', 'case_year'])
                ->distinct(),
            'distinct_leg_case_court'
        )->count();
        $this->assertSame(1335, $distinctCourtRows);
        $this->assertTrue(Hash::check('primary-secret', User::where('email', 'primary@example.test')->value('password')));
        $this->assertTrue(Hash::check('admin-secret', User::where('email', 'admin@example.test')->value('password')));
        $this->assertDatabaseMissing('users', ['email' => 'user2@example.com']);
    }
}
