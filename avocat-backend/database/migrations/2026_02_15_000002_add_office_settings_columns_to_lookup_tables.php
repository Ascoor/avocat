<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /** @var array<int, string> */
    private array $tables = [
        'case_types',
        'case_sub_types',
        'court_levels',
        'legal_session_types',
        'procedure_types',
        'procedure_place_types',
        'legal_ad_types',
    ];

    public function up(): void
    {
        $driver = DB::getDriverName();

        foreach ($this->tables as $tableName) {
            if (! Schema::hasTable($tableName)) {
                continue;
            }

            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                if (! Schema::hasColumn($tableName, 'office_id')) {
                    $table->unsignedBigInteger('office_id')->nullable()->after('id')->index();
                }

                if (! Schema::hasColumn($tableName, 'is_system')) {
                    $table->boolean('is_system')->default(true)->after('office_id');
                }

                if (! Schema::hasColumn($tableName, 'parent_id')) {
                    $table->unsignedBigInteger('parent_id')->nullable()->after('is_system')->index();
                }

                if (! Schema::hasColumn($tableName, 'is_active')) {
                    $table->boolean('is_active')->default(true)->after('name');
                }

                if (! Schema::hasColumn($tableName, 'sort_order')) {
                    $table->integer('sort_order')->default(0)->after('is_active');
                }

                if (! Schema::hasColumn($tableName, 'deleted_at')) {
                    $table->softDeletes();
                }
            });

            if (Schema::hasTable('offices')
                && Schema::hasColumn($tableName, 'office_id')
                && ! $this->foreignKeyExists($tableName, "{$tableName}_office_id_foreign")) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->foreign('office_id')->references('id')->on('offices')->nullOnDelete();
                });
            }

            if (Schema::hasColumn($tableName, 'parent_id')
                && ! $this->foreignKeyExists($tableName, "{$tableName}_parent_id_foreign")) {
                Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                    $table->foreign('parent_id')->references('id')->on($tableName)->nullOnDelete();
                });
            }

            if (! $this->indexExists($tableName, "{$tableName}_office_id_sort_order_index")) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->index(['office_id', 'sort_order']);
                });
            }

            if (! $this->indexExists($tableName, "{$tableName}_office_id_is_active_index")) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->index(['office_id', 'is_active']);
                });
            }

            DB::table($tableName)->update([
                'is_system' => true,
                'is_active' => true,
                'sort_order' => DB::raw('COALESCE(sort_order, 0)'),
            ]);

            if ($driver === 'pgsql') {
                DB::statement(
                    "CREATE UNIQUE INDEX IF NOT EXISTS {$tableName}_office_name_unique_active ON {$tableName} (office_id, lower(name)) WHERE deleted_at IS NULL"
                );
            }
        }
    }

    public function down(): void
    {
        $driver = DB::getDriverName();

        foreach ($this->tables as $tableName) {
            if (! Schema::hasTable($tableName)) {
                continue;
            }

            if ($driver === 'pgsql') {
                DB::statement("DROP INDEX IF EXISTS {$tableName}_office_name_unique_active");
            }

            if ($this->indexExists($tableName, "{$tableName}_office_id_sort_order_index")) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->dropIndex(['office_id', 'sort_order']);
                });
            }

            if ($this->indexExists($tableName, "{$tableName}_office_id_is_active_index")) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->dropIndex(['office_id', 'is_active']);
                });
            }

            if ($this->foreignKeyExists($tableName, "{$tableName}_parent_id_foreign")) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->dropForeign(['parent_id']);
                });
            }

            if ($this->foreignKeyExists($tableName, "{$tableName}_office_id_foreign")) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->dropForeign(['office_id']);
                });
            }

            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                foreach (['office_id', 'parent_id', 'is_system', 'is_active', 'sort_order', 'deleted_at'] as $column) {
                    if (Schema::hasColumn($tableName, $column)) {
                        $table->dropColumn($column);
                    }
                }
            });
        }
    }

    private function foreignKeyExists(string $tableName, string $constraintName): bool
    {
        return DB::table('information_schema.table_constraints')
            ->where('table_name', $tableName)
            ->where('constraint_name', $constraintName)
            ->where('constraint_type', 'FOREIGN KEY')
            ->exists();
    }

    private function indexExists(string $tableName, string $indexName): bool
    {
        $driver = DB::getDriverName();

        if ($driver === 'pgsql') {
            return DB::table('pg_indexes')
                ->where('tablename', $tableName)
                ->where('indexname', $indexName)
                ->exists();
        }

        if ($driver === 'mysql') {
            return DB::table('information_schema.statistics')
                ->where('table_schema', DB::getDatabaseName())
                ->where('table_name', $tableName)
                ->where('index_name', $indexName)
                ->exists();
        }

        return false;
    }
};
