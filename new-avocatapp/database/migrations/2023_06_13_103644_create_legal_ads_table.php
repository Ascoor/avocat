<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('legal_ads', function (Blueprint $table) {
            $table->id();
            $table->longText('description');
            $table->longText('results')->nullable();
            $table->date('send_date');
            $table->date('receive_date')->nullable();
            $table->string('lawyer_send_id');
            $table->foreignId('legal_ad_type_id')->constrained('legal_ad_types')->cascadeOnDelete();
            $table->string('lawyer_receive_id')->nullable();
            $table->enum('status', ['قيد التجهيز', 'تم التسليم', 'تم الإستلام'])->default('قيد التجهيز');
            $table->foreignId('leg_case_id')->constrained('leg_cases')->cascadeOnDelete();
            $table->foreignId('court_id')->constrained('courts')->cascadeOnDelete();
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
        Schema::dropIfExists('legal_ads');
    }
};
