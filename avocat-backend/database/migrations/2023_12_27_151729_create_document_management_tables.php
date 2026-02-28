<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentManagementTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Create appeal_types table
        Schema::create('appeal_types', function (Blueprint $table) {
            $table->id();
            $table->string('appeal_type');
            $table->timestamps();
        });

        // Create appeal_sub_types table
        Schema::create('appeal_sub_types', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('appeal_type_id');
            $table->string('appeal_sub_type');
            $table->foreign('appeal_type_id')->references('id')->on('appeal_types')->onDelete('cascade');
            $table->timestamps();
        });

        // Create cassation_rule_subjects table
        Schema::create('cassation_rule_subjects', function (Blueprint $table) {
            $table->id();
            $table->string('rule_description');
            $table->timestamps();
        });

        // Create cassation_rules table
        Schema::create('cassation_rules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('appeal_type_id');
            $table->unsignedBigInteger('appeal_sub_type_id');
            $table->string('appeal_number');
            $table->year('appeal_year');
            $table->date('session_date');
            $table->unsignedBigInteger('cassation_rule_subjects_id');
            $table->text('legal_summary')->nullable();
            $table->timestamps();

            $table->foreign('appeal_type_id')->references('id')->on('appeal_types')->onDelete('cascade');
            $table->foreign('appeal_sub_type_id')->references('id')->on('appeal_sub_types')->onDelete('cascade');
            $table->foreign('cassation_rule_subjects_id')->references('id')->on('cassation_rule_subjects')->onDelete('cascade');
     
        });
   
            Schema::create('cassation_judges', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('cassation_rules_id');
                $table->string('judge_name');
                $table->timestamps();
    
                $table->foreign('cassation_rules_id')->references('id')->on('cassation_rules')->onDelete('cascade');
            });
            
        Schema::create('appeal_pdfs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cassation_rule_id');
            $table->string('file_name');
            $table->string('file_path');
            $table->timestamps();

            $table->foreign('cassation_rule_id')->references('id')->on('cassation_rules')->onDelete('cascade');
        });
    
        }
    
    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cassation_rules');
        Schema::dropIfExists('cassation_rule_subjects');
        Schema::dropIfExists('appeal_sub_types');
        Schema::dropIfExists('appeal_types');
        Schema::dropIfExists('cassation_judges');
        Schema::dropIfExists('appeal_pdfs');
    }
}
