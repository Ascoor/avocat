<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class LegCaseClient extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('leg_case_client', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('leg_case_id');
            $table->unsignedBigInteger('client_id');



            $table->foreign('leg_case_id')->references('id')->on('leg_cases')->onDelete('cascade');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leg_case_client');
    }
}
