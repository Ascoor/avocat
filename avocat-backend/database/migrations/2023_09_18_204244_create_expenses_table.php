<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->nullable()->constrained('services')->nullOnDelete();
            $table->foreignId('leg_case_id')->nullable()->constrained('leg_cases')->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('legal_session_id')->nullable()->constrained('legal_sessions')->nullOnDelete();
            $table->foreignId('legal_ad_id')->nullable()->constrained('legal_ads')->nullOnDelete();
            $table->foreignId('expense_category_id')->constrained('expense_categories')->cascadeOnDelete();
            $table->foreignId('client_id')->nullable()->constrained('clients')->nullOnDelete();
            $table->foreignId('unclients_id')->nullable()->constrained('unclients')->nullOnDelete();
            $table->string('description')->nullable();
            $table->string('note')->nullable();
            $table->date('expense_date')->nullable();
            $table->json('amount')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
