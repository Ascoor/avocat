<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('power_of_attorneys', function (Blueprint $table) {
            $table->id();
            $table->string('attorney_num');
            $table->date('attorney_date');
            $table->string('attorney_chart');
            $table->string('attorney_place');
            $table->string('title');
            $table->longText('description')->nullable();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->foreignId('lawyer_id')->nullable()->constrained('lawyers')->nullOnDelete();
            $table->longText('lawyer_insert');
            $table->string('image')->nullable();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('attorney_type_id')->constrained('attorney_types')->cascadeOnDelete();
            $table->enum('status', ['active', 'expired'])->default('active');
            $table->date('expires_at')->nullable();
            $table->timestamps();
        });

        Schema::create('leg_case_power_of_attorney', function (Blueprint $table) {
            $table->id();
            $table->foreignId('leg_case_id')->constrained('leg_cases')->cascadeOnDelete();
            $table->foreignId('power_of_attorney_id')->constrained('power_of_attorneys')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['leg_case_id', 'power_of_attorney_id'], 'leg_case_poa_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leg_case_power_of_attorney');
        Schema::dropIfExists('power_of_attorneys');
    }
};
