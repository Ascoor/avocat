<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLegalDocsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('doc_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('doc_sub_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('doc_type_id');
            $table->foreign('doc_type_id')->references('id')->on('doc_types');
            $table->timestamps();
        });

        Schema::create('legal_docs', function (Blueprint $table) {
            $table->id();
            $table->string('path');
            $table->string('thumbnail_path')->nullable();
            $table->string('word_path')->nullable();
            $table->string('pdf_path')->nullable();
            $table->text('description')->nullable();
            $table->unsignedBigInteger('doc_type_id');
            $table->unsignedBigInteger('doc_sub_type_id');
            $table->unsignedBigInteger('power_of_attorney_id')->nullable();
            $table->unsignedBigInteger('leg_case_id')->nullable();
            $table->timestamps();

            $table->foreign('doc_type_id')->references('id')->on('doc_types');
            $table->foreign('doc_sub_type_id')->references('id')->on('doc_sub_types');
            $table->foreign('power_of_attorney_id')->references('id')->on('power_of_attorneys')->nullOnDelete();
            $table->foreign('leg_case_id')->references('id')->on('leg_cases')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('legal_docs');
        Schema::dropIfExists('doc_sub_types');
        Schema::dropIfExists('doc_types');
    }
}
