<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('offices')) {
            Schema::create('offices', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->timestamps();
            });
        } elseif (! Schema::hasColumn('offices', 'slug')) {
            Schema::table('offices', function (Blueprint $table) {
                $table->string('slug')->nullable()->after('name');
            });

            DB::table('offices')->orderBy('id')->get()->each(function ($office): void {
                $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9]+/', '-', (string) $office->name), '-'));
                $slug = $slug !== '' ? $slug : 'office-'.$office->id;
                DB::table('offices')->where('id', $office->id)->update(['slug' => $slug]);
            });

            Schema::table('offices', function (Blueprint $table) {
                $table->unique('slug');
            });
        }

        if (! Schema::hasColumn('users', 'office_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->unsignedBigInteger('office_id')->nullable()->after('id')->index();
            });
        }

        if (Schema::hasTable('offices')
            && Schema::hasColumn('users', 'office_id')
            && ! $this->foreignKeyExists('users', 'users_office_id_foreign')) {
            Schema::table('users', function (Blueprint $table) {
                $table->foreign('office_id')->references('id')->on('offices')->nullOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('users') && Schema::hasColumn('users', 'office_id')) {
            if ($this->foreignKeyExists('users', 'users_office_id_foreign')) {
                Schema::table('users', function (Blueprint $table) {
                    $table->dropForeign('users_office_id_foreign');
                });
            }

            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('office_id');
            });
        }

        Schema::dropIfExists('offices');
    }

    private function foreignKeyExists(string $tableName, string $constraintName): bool
    {
        return DB::table('information_schema.table_constraints')
            ->where('table_name', $tableName)
            ->where('constraint_name', $constraintName)
            ->where('constraint_type', 'FOREIGN KEY')
            ->exists();
    }
};
