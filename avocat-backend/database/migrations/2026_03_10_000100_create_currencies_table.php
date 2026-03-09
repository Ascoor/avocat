<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('currencies')) {
            Schema::create('currencies', function (Blueprint $table) {
                $table->id();
                $table->string('code', 3)->unique();
                $table->string('symbol', 10);
                $table->string('name');
                $table->string('name_ar');
                $table->string('name_en');
                $table->boolean('is_active')->default(true);
                $table->integer('sort_order')->nullable();
                $table->timestamps();
            });
        }

        if (Schema::hasTable('offices') && ! Schema::hasColumn('offices', 'default_currency_id')) {
            Schema::table('offices', function (Blueprint $table) {
                $table->unsignedBigInteger('default_currency_id')->nullable()->after('slug');
                $table->foreign('default_currency_id')->references('id')->on('currencies')->nullOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('offices') && Schema::hasColumn('offices', 'default_currency_id')) {
            Schema::table('offices', function (Blueprint $table) {
                $table->dropForeign(['default_currency_id']);
                $table->dropColumn('default_currency_id');
            });
        }

        Schema::dropIfExists('currencies');
    }
};
