<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('case_sub_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('case_type_id')->constrained('case_types')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('case_sub_types');
    }
};
