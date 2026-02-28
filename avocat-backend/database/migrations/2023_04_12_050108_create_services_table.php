<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('description')->nullable();
            $table->string('service_place_name')->nullable();
            $table->string('service_year')->nullable();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete()->default(1);
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->enum('status', ['قيد التنفيذ', 'جارى التنفيذ', 'منتهية', 'متداولة', 'استيفاء'])->default('جارى التنفيذ');
            $table->foreignId('service_type_id')->constrained('service_types')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
