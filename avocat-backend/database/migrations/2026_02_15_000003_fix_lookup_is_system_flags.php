<?php

use Illuminate\Database\Migrations\Migration;
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
            if (! Schema::hasTable($tableName) || ! Schema::hasColumn($tableName, 'is_system')) {
                continue;
            }

            DB::table($tableName)
                ->whereNull('office_id')
                ->update(['is_system' => true]);

            DB::table($tableName)
                ->whereNotNull('office_id')
                ->update(['is_system' => false]);
        }
    }

    public function down(): void
    {
        foreach ($this->tables as $tableName) {
            if (! Schema::hasTable($tableName) || ! Schema::hasColumn($tableName, 'is_system')) {
                continue;
            }

            DB::table($tableName)->update(['is_system' => true]);
        }
    }
};
