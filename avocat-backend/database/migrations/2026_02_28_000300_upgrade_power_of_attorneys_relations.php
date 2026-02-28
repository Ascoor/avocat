<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('power_of_attorneys', function (Blueprint $table) {
            $table->foreignId('lawyer_id')->nullable()->after('client_id')->constrained('lawyers')->nullOnDelete();
            $table->enum('status', ['active', 'expired'])->default('active')->after('attorney_type_id');
            $table->date('expires_at')->nullable()->after('status');
        });

        Schema::create('leg_case_power_of_attorney', function (Blueprint $table) {
            $table->id();
            $table->foreignId('leg_case_id')->constrained('leg_cases')->cascadeOnDelete();
            $table->foreignId('power_of_attorney_id')->constrained('power_of_attorneys')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['leg_case_id', 'power_of_attorney_id'], 'leg_case_poa_unique');
        });

        Schema::table('legal_docs', function (Blueprint $table) {
            $table->foreignId('power_of_attorney_id')->nullable()->after('doc_sub_type_id')->constrained('power_of_attorneys')->nullOnDelete();
            $table->foreignId('leg_case_id')->nullable()->after('power_of_attorney_id')->constrained('leg_cases')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('legal_docs', function (Blueprint $table) {
            $table->dropForeign(['power_of_attorney_id']);
            $table->dropForeign(['leg_case_id']);
            $table->dropColumn(['power_of_attorney_id', 'leg_case_id']);
        });

        Schema::dropIfExists('leg_case_power_of_attorney');

        Schema::table('power_of_attorneys', function (Blueprint $table) {
            $table->dropForeign(['lawyer_id']);
            $table->dropColumn(['lawyer_id', 'status', 'expires_at']);
        });
    }
};
