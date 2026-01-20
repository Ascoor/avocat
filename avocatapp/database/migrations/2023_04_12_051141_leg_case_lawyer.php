<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class LegCaseLawyer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('leg_case_lawyer', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('leg_case_id');
            $table->unsignedBigInteger('lawyer_id');
            $table->timestamps();

            $table->foreign('leg_case_id')->references('id')->on('leg_cases')->onDelete('cascade');
            $table->foreign('lawyer_id')->references('id')->on('lawyers')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
          Schema::dropIfExists('leg_case_lawyer');
    }
}
