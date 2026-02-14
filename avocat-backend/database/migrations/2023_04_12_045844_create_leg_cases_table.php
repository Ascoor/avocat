<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leg_cases', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_deleted')->default(false);
            $table->string('slug');
            $table->string('title')->nullable();
            $table->longText('description')->nullable();
            $table->float('fees')->nullable();
            $table->decimal('total_expenses', 10, 2)->nullable()->default(0);
            $table->decimal('total_payments', 10, 2)->nullable()->default(0);
            $table->float('expenses')->nullable();
            $table->foreignId('case_type_id')->constrained('case_types')->cascadeOnDelete();
            $table->foreignId('case_sub_type_id')->constrained('case_sub_types')->cascadeOnDelete();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('litigants_name')->nullable();
            $table->string('litigants_address')->nullable();
            $table->string('litigants_phone')->nullable();
            $table->string('litigants_lawyer_name')->nullable();
            $table->string('litigants_lawyer_phone')->nullable();
            $table->enum('client_capacity', ['مدعى عليه', 'مجنى عليه', 'مدعى', 'متهم'])->default('مدعى');
            $table->enum('status', ['قيد التجهيز', 'متداولة', 'منتهية', 'معلقة'])->default('قيد التجهيز');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leg_cases');
    }
};
