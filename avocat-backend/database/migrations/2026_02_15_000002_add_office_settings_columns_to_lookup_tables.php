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
        foreach ($this->tables as $tableName) {
            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                $table->foreignId('office_id')->nullable()->after('id')->constrained('offices')->nullOnDelete();
                $table->boolean('is_system')->default(true)->after('office_id');
                $table->foreignId('parent_id')->nullable()->after('is_system')->constrained($tableName)->nullOnDelete();
                $table->boolean('is_active')->default(true)->after('name');
                $table->integer('sort_order')->default(0)->after('is_active');
                $table->softDeletes();

                $table->index(['office_id', 'sort_order']);
                $table->index(['office_id', 'is_active']);
            });

            DB::table($tableName)->update([
                'is_system' => true,
                'is_active' => true,
                'sort_order' => 0,
            ]);

            $driver = DB::getDriverName();
            if ($driver === 'pgsql') {
                DB::statement("CREATE UNIQUE INDEX {$tableName}_office_name_unique_active ON {$tableName} (office_id, lower(name)) WHERE deleted_at IS NULL");
            }
        }
    }

    public function down(): void
    {
        $driver = DB::getDriverName();

        foreach ($this->tables as $tableName) {
            if ($driver === 'pgsql') {
                DB::statement("DROP INDEX IF EXISTS {$tableName}_office_name_unique_active");
            }

            Schema::table($tableName, function (Blueprint $table) {
                $table->dropIndex(['office_id', 'sort_order']);
                $table->dropIndex(['office_id', 'is_active']);

                $table->dropConstrainedForeignId('parent_id');
                $table->dropConstrainedForeignId('office_id');
                $table->dropColumn(['is_system', 'is_active', 'sort_order']);
                $table->dropSoftDeletes();
            });
        }
    }
};
