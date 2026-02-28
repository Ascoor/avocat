<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('court_type_id')->constrained('court_types');
            $table->foreignId('court_level_id')->constrained('court_levels');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courts');
    }
};
