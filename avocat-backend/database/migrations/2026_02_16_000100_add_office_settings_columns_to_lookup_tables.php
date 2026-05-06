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
        // 1. تحديث جدول المستخدمين
        if (! Schema::hasColumn('users', 'office_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->unsignedBigInteger('office_id')->nullable()->after('id')->index();
            });
        }

        if (Schema::hasTable('offices') && Schema::hasColumn('users', 'office_id') && ! $this->foreignKeyExists('users', 'users_office_id_foreign')) {
            Schema::table('users', function (Blueprint $table) {
                $table->foreign('office_id')->references('id')->on('offices')->nullOnDelete();
            });
        }

        // 2. تحديث الجداول المشتركة والخاصة بالمكاتب
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

            // تحديث القيم الافتراضية
            $this->updateDefaultValues($tableName);

            // تنظيف البيانات المكررة قبل إنشاء الفهارس الفريدة
            $this->cleanDuplicates($tableName);

            // 3. إنشاء الفهارس (Indexes) بطريقة متوافقة مع MySQL
            $this->createIndexes($tableName);
        }
    }

    private function updateDefaultValues(string $tableName): void
    {
        if (in_array($tableName, $this->systemOverrideTables, true)) {
            DB::table($tableName)->whereNull('office_id')->update(['is_system' => true]);
        }

        if (in_array($tableName, $this->officeSpecificTables, true)) {
            DB::table($tableName)->whereNull('office_id')->update(['is_system' => false]);
        }

        DB::table($tableName)->whereNotNull('office_id')->update(['is_system' => false]);
        DB::statement("UPDATE {$tableName} SET sort_order = 0 WHERE sort_order IS NULL");
    }

    private function cleanDuplicates(string $tableName): void
    {
        $nameColumn = 'name';
        if ($tableName === 'case_sub_types') {
            $this->softDeleteDuplicates($tableName, "office_id, case_type_id, lower({$nameColumn})", 'office_id IS NOT NULL AND deleted_at IS NULL');
            $this->softDeleteDuplicates($tableName, "case_type_id, lower({$nameColumn})", 'office_id IS NULL AND deleted_at IS NULL');
        } else {
            $this->softDeleteDuplicates($tableName, "office_id, lower({$nameColumn})", 'office_id IS NOT NULL AND deleted_at IS NULL');
            $this->softDeleteDuplicates($tableName, "lower({$nameColumn})", 'office_id IS NULL AND deleted_at IS NULL');
        }
    }

    private function createIndexes(string $tableName): void
    {
        $nameColumn = 'name';
        $isCaseSubTypes = ($tableName === 'case_sub_types');
        
        $officeUniqIndex = $isCaseSubTypes ? "{$tableName}_ofc_ct_low_name_uniq" : "{$tableName}_ofc_low_name_uniq";
        $systemUniqIndex = $isCaseSubTypes ? "{$tableName}_sys_ct_low_name_uniq" : "{$tableName}_sys_low_name_uniq";

        // استخدام Schema Builder للفهارس العادية (أكثر أماناً)
        Schema::table($tableName, function (Blueprint $table) use ($tableName) {
            $table->index(['office_id', 'is_active'], "{$tableName}_ofc_act_idx");
            $table->index(['office_id', 'sort_order'], "{$tableName}_ofc_sort_idx");
        });

        // الفهارس الفريدة باستخدام Try-Catch لتجنب أخطاء التكرار أو عدم توافق النسخ
        try {
            if ($isCaseSubTypes) {
                DB::statement("CREATE UNIQUE INDEX {$officeUniqIndex} ON {$tableName} (office_id, case_type_id, (lower({$nameColumn})))");
                DB::statement("CREATE UNIQUE INDEX {$systemUniqIndex} ON {$tableName} (case_type_id, (lower({$nameColumn})))");
            } else {
                DB::statement("CREATE UNIQUE INDEX {$officeUniqIndex} ON {$tableName} (office_id, (lower({$nameColumn})))");
                DB::statement("CREATE UNIQUE INDEX {$systemUniqIndex} ON {$tableName} ((lower({$nameColumn})))");
            }
        } catch (\Exception $e) {
            // تجاهل إذا كان الفهرس موجوداً بالفعل
        }
    }

    public function down(): void
    {
        foreach (array_merge($this->systemOverrideTables, $this->officeSpecificTables) as $tableName) {
            if (! Schema::hasTable($tableName)) continue;

            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                // حذف الأعمدة
                $columns = ['office_id', 'is_system', 'parent_id', 'is_active', 'sort_order', 'is_locked', 'deleted_at'];
                foreach ($columns as $column) {
                    if (Schema::hasColumn($tableName, $column)) $table->dropColumn($column);
                }
            });
        }
    }

    private function foreignKeyExists(string $tableName, string $constraintName): bool
    {
        if (DB::getDriverName() === 'sqlite') return false;
        return DB::table('information_schema.table_constraints')
            ->where('table_name', $tableName)
            ->where('constraint_name', $constraintName)
            ->exists();
    }

    private function softDeleteDuplicates(string $tableName, string $partitionBy, string $whereClause): void
    {
        $timestamp = $this->currentTimestampExpression();
        DB::statement("
            UPDATE {$tableName} SET deleted_at = {$timestamp}, is_active = false 
            WHERE id IN (
                SELECT id FROM (
                    SELECT id, ROW_NUMBER() OVER (PARTITION BY {$partitionBy} ORDER BY id) as row_num 
                    FROM {$tableName} WHERE {$whereClause}
                ) t WHERE t.row_num > 1
            )
        ");
    }

    private function currentTimestampExpression(): string
    {
        return DB::getDriverName() === 'sqlite' ? 'CURRENT_TIMESTAMP' : 'NOW()';
    }
};
