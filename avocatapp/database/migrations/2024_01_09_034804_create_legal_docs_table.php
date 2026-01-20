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
            $table->timestamps();

            $table->foreign('doc_type_id')->references('id')->on('doc_types');
            $table->foreign('doc_sub_type_id')->references('id')->on('doc_sub_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('doc_sub_types');
        Schema::dropIfExists('doc_types');
        Schema::dropIfExists('legal_docs');
    }
}
