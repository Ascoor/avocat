<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private array $systemOverrideTables = [
        'case_types', 'case_sub_types', 'service_types', 'procedure_types', 'procedure_place_types',
        'legal_session_types', 'legal_ad_types', 'revenue_categories', 'expense_categories', 'attorney_types',
        'court_levels', 'court_types', 'courts', 'divisions', 'power_types',
    ];

    private array $officeSpecificTables = ['doc_types', 'doc_sub_types'];

    public function up(): void
    {
        if (! Schema::hasColumn('users', 'office_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->unsignedBigInteger('office_id')->nullable()->after('id')->index();
            });
        }

        if (Schema::hasTable('offices') && Schema::hasColumn('users', 'office_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->foreign('office_id')->references('id')->on('offices')->nullOnDelete();
            });
        }

        foreach (array_merge($this->systemOverrideTables, $this->officeSpecificTables) as $tableName) {
            if (! Schema::hasTable($tableName)) {
                continue;
            }

            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                if (! Schema::hasColumn($tableName, 'office_id')) {
                    $table->unsignedBigInteger('office_id')->nullable()->index()->after('id');
                }
                if (! Schema::hasColumn($tableName, 'is_system')) {
                    $table->boolean('is_system')->default(true)->index()->after('office_id');
                }
                if (! Schema::hasColumn($tableName, 'parent_id')) {
                    $table->unsignedBigInteger('parent_id')->nullable()->index()->after('is_system');
                }
                if (! Schema::hasColumn($tableName, 'is_active')) {
                    $table->boolean('is_active')->default(true)->index()->after('parent_id');
                }
                if (! Schema::hasColumn($tableName, 'sort_order')) {
                    $table->integer('sort_order')->default(0)->after('is_active');
                }
                if (! Schema::hasColumn($tableName, 'is_locked')) {
                    $table->boolean('is_locked')->default(false)->after('sort_order');
                }
                if (! Schema::hasColumn($tableName, 'deleted_at')) {
                    $table->timestamp('deleted_at')->nullable()->index()->after('updated_at');
                }
            });

            if (in_array($tableName, $this->systemOverrideTables, true)) {
                DB::table($tableName)
                    ->whereNull('office_id')
                    ->update(['is_system' => true]);
            }

            if (in_array($tableName, $this->officeSpecificTables, true)) {
                DB::table($tableName)
                    ->whereNull('office_id')
                    ->update(['is_system' => false]);
            }

            DB::statement("UPDATE {$tableName} SET sort_order = 0 WHERE sort_order IS NULL");

            $nameColumn = 'name';

            DB::statement("CREATE INDEX IF NOT EXISTS {$tableName}_office_active_idx ON {$tableName} (office_id, is_active)");
            DB::statement("CREATE INDEX IF NOT EXISTS {$tableName}_office_sort_idx ON {$tableName} (office_id, sort_order)");
            DB::statement("CREATE UNIQUE INDEX IF NOT EXISTS {$tableName}_office_lower_name_uniq ON {$tableName} (office_id, lower({$nameColumn})) WHERE deleted_at IS NULL");
            DB::statement("CREATE UNIQUE INDEX IF NOT EXISTS {$tableName}_system_lower_name_uniq ON {$tableName} (lower({$nameColumn})) WHERE office_id IS NULL AND deleted_at IS NULL");
        }
    }

    public function down(): void
    {
        foreach (array_merge($this->systemOverrideTables, $this->officeSpecificTables) as $tableName) {
            if (! Schema::hasTable($tableName)) {
                continue;
            }

            DB::statement("DROP INDEX IF EXISTS {$tableName}_office_active_idx");
            DB::statement("DROP INDEX IF EXISTS {$tableName}_office_sort_idx");
            DB::statement("DROP INDEX IF EXISTS {$tableName}_office_lower_name_uniq");
            DB::statement("DROP INDEX IF EXISTS {$tableName}_system_lower_name_uniq");

            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                foreach (['office_id', 'is_system', 'parent_id', 'is_active', 'sort_order', 'is_locked', 'deleted_at'] as $column) {
                    if (Schema::hasColumn($tableName, $column)) {
                        $table->dropColumn($column);
                    }
                }
            });
        }

        if (Schema::hasColumn('users', 'office_id')) {
            DB::statement('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_office_id_foreign');
        }
    }
};
