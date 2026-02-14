<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('procedures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('procedure_type_id')->constrained('procedure_types')->cascadeOnDelete();
            $table->foreignId('leg_case_id')->constrained('leg_cases')->cascadeOnDelete();
            $table->string('procedure_place_name')->nullable();
            $table->foreignId('procedure_place_type_id')->nullable()->constrained('procedure_place_types')->nullOnDelete();
            $table->foreignId('lawyer_id')->nullable()->constrained('lawyers')->nullOnDelete();
            $table->longText('job');
            $table->longText('result')->nullable();
            $table->longText('note')->nullable();
            $table->enum('status', ['تمت', 'لم ينفذ', 'جاري التنفيذ'])->default('جاري التنفيذ');
            $table->foreignId('event_id')->nullable()->constrained('events')->nullOnDelete();
            $table->date('date_start')->nullable();
            $table->date('date_end')->nullable();
            $table->decimal('cost1', 10, 2)->nullable()->default(0);
            $table->decimal('cost2', 10, 2)->nullable()->default(0);
            $table->decimal('cost3', 10, 2)->nullable()->default(0);
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('procedures');
    }
};
