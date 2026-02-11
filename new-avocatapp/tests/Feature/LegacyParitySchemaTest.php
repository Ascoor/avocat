<?php

namespace Tests\Feature;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

class LegacyParitySchemaTest extends TestCase
{
    public function test_non_auth_legacy_tables_have_new_migration_coverage(): void
    {
        $legacyFiles = glob(base_path('../avocatapp/database/migrations/*.php'));
        $newFiles = $this->migrationFiles(database_path('migrations'));

        $legacyTables = $this->extractCreatedTables($legacyFiles);
        $newTables = $this->extractCreatedTables($newFiles);

        $excludedAuthTables = [
            'users',
            'password_resets',
            'password_reset_tokens',
            'personal_access_tokens',
            'failed_jobs',
            'oauth_auth_codes',
            'oauth_access_tokens',
            'oauth_refresh_tokens',
            'oauth_clients',
            'oauth_personal_access_clients',
        ];

        foreach ($legacyTables as $table) {
            if (in_array($table, $excludedAuthTables, true)) {
                continue;
            }

            $this->assertContains($table, $newTables, "Missing non-auth table in new migrations: {$table}");
        }
    }

    public function test_key_legacy_columns_are_present_in_new_migrations(): void
    {
        $newMigrationText = collect($this->migrationFiles(database_path('migrations')))
            ->map(fn (string $file): string => file_get_contents($file) ?: '')
            ->implode("\n");

        $expectedColumns = [
            'leg_cases' => ['is_deleted', 'slug', 'case_type_id', 'case_sub_type_id', 'created_by'],
            'invoices' => ['invoice_number', 'status', 'issue_date', 'due_date', 'total_amount'],
            'payments' => ['invoice_id', 'payment_date', 'payment_method', 'amount'],
            'legal_docs' => ['doc_type_id', 'doc_sub_type_id', 'subject', 'save_path'],
            'service_documents' => ['service_id', 'description', 'save_path'],
        ];

        foreach ($expectedColumns as $table => $columns) {
            $this->assertStringContainsString("Schema::create('{$table}'", $newMigrationText);

            foreach ($columns as $column) {
                $this->assertStringContainsString("'{$column}'", $newMigrationText, "Expected {$table}.{$column} to exist in new migrations");
            }
        }
    }

    public function test_legacy_model_behaviors_kept_for_invoice_payment_and_leg_case(): void
    {
        $invoice = new \App\Models\Invoice();
        $payment = new \App\Models\Payment();
        $legCase = new \App\Models\LegCase();

        $this->assertTrue(method_exists($invoice, 'updateStatus'));
        $this->assertInstanceOf(HasMany::class, $invoice->payments());

        $this->assertTrue(method_exists($payment, 'booted'));
        $this->assertInstanceOf(BelongsTo::class, $payment->invoice());

        $this->assertTrue(method_exists($legCase, 'softDelete'));
        $this->assertTrue(method_exists($legCase, 'restore'));
    }


    /**
     * @return array<int, string>
     */
    private function migrationFiles(string $path): array
    {
        $files = [];

        $iterator = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($path));

        foreach ($iterator as $file) {
            if (! $file->isFile()) {
                continue;
            }

            if ($file->getExtension() !== 'php') {
                continue;
            }

            $files[] = $file->getPathname();
        }

        return $files;
    }

    /**
     * @param  array<int, string>  $files
     * @return array<int, string>
     */
    private function extractCreatedTables(array $files): array
    {
        $tables = [];

        foreach ($files as $file) {
            $content = file_get_contents($file);

            if ($content === false) {
                continue;
            }

            preg_match_all("/Schema::create\\('([^']+)'/", $content, $matches);

            foreach ($matches[1] as $table) {
                $tables[] = $table;
            }
        }

        return array_values(array_unique($tables));
    }
}
