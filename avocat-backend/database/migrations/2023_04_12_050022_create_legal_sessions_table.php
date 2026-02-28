<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('legal_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('court_session')->nullable();
            $table->foreignId('legal_session_type_id')->constrained('legal_session_types')->cascadeOnDelete();
            $table->foreignId('leg_case_id')->constrained('leg_cases')->cascadeOnDelete();
            $table->foreignId('court_id')->constrained('courts')->cascadeOnDelete()->default(222);
            $table->date('session_date');
            $table->decimal('cost1', 10, 2)->nullable()->default(0);
            $table->decimal('cost2', 10, 2)->nullable()->default(0);
            $table->decimal('cost3', 10, 2)->nullable()->default(0);
            $table->string('session_roll')->nullable();
            $table->string('Judgment_operative')->nullable();
            $table->enum('status', ['تمت', 'لم ينفذ', 'جارى التنفيذ'])->default('جارى التنفيذ');
            $table->foreignId('lawyer_id')->constrained('lawyers')->cascadeOnDelete();
            $table->longText('orders')->nullable();
            $table->longText('result')->nullable();
            $table->longText('notes')->nullable();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('legal_sessions');
    }
};
