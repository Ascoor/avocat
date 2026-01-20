<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCaseDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            Schema::create('case_documents', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('leg_case_id');
                $table->unsignedBigInteger('client_id')->nullable();
                $table->unsignedBigInteger('unclient_id')->nullable();
                $table->text('description');
                $table->string('file_path');
                $table->timestamps();


                $table->foreign('leg_case_id')->references('id')->on('leg_cases');
                $table->foreign('client_id')->references('id')->on('clients');
                $table->foreign('unclient_id')->references('id')->on('unclients');
            });
        }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('case_documents');
    }
}
