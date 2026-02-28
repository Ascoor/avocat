<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documentable', function (Blueprint $table) {
            $table->id();
            $table->morphs('documentable');
            $table->foreignId('document_id')->constrained('documents')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['document_id', 'documentable_id', 'documentable_type'], 'documentable_unique_link');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documentable');
    }
};
