<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('financial_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('office_id')->nullable()->constrained('offices')->nullOnDelete();
            $table->enum('type', ['expense', 'revenue', 'payment', 'invoice_adjustment']);
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->nullable();
            $table->dateTime('occurred_at')->nullable();
            $table->string('description')->nullable();
            $table->text('note')->nullable();
            $table->string('category_type')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->foreignId('leg_case_id')->nullable()->constrained('leg_cases')->nullOnDelete();
            $table->foreignId('service_id')->nullable()->constrained('services')->nullOnDelete();
            $table->string('source_type')->nullable();
            $table->unsignedBigInteger('source_id')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index('leg_case_id');
            $table->index('service_id');
            $table->index(['source_type', 'source_id']);
            $table->index(['category_type', 'category_id']);
            $table->index('occurred_at');
        });

        Schema::table('expenses', function (Blueprint $table) {
            if (! Schema::hasColumn('expenses', 'legal_ad_id')) {
                $table->foreignId('legal_ad_id')->nullable()->after('legal_session_id')->constrained('legal_ads')->nullOnDelete();
            }
        });
    }

    public function down(): void
    {
        Schema::table('expenses', function (Blueprint $table) {
            if (Schema::hasColumn('expenses', 'legal_ad_id')) {
                $table->dropConstrainedForeignId('legal_ad_id');
            }
        });

        Schema::dropIfExists('financial_transactions');
    }
};
