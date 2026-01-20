<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePowerOfAttorneysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attorney_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('power_of_attorneys', function (Blueprint $table) {
            $table->id();
            $table->string('attorney_num');
            $table->date('attorney_date');

            $table->string('attorney_chart');
            $table->string('attorney_place');
            $table->string('title');
            $table->longText('description')->nullable();
            $table->unsignedBigInteger('client_id');
            $table->longText('lawyer_insert');
            $table->string('image')->nullable();
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            $table->foreign('client_id')->references('id')->on('clients');

            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');

            $table->unsignedBigInteger('attorney_type_id');
            $table->foreign('attorney_type_id')->references('id')->on('attorney_types');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('power_of_attorneys');
    }
}
