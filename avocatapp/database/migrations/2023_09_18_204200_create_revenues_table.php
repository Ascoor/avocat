<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRevenuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */



    public function up()
{
    Schema::create('revenue_categories', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->timestamps();
    });
    Schema::create('revenues', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('client_id')->nullable();
        $table->unsignedBigInteger('service_id')->nullable();
        $table->unsignedBigInteger('leg_case_id')->nullable();
        $table->float('amount');
        $table->boolean('from_client')->default(true);
        $table->boolean('from_unclients')->default(false);

        $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
        $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        $table->foreign('leg_case_id')->references('id')->on('leg_cases')->onDelete('cascade');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('revenues');
    }
}
