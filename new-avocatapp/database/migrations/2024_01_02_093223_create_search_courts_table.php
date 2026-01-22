<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSearchCourtsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { 
        Schema::create('search_degrees', function (Blueprint $table) {
            $table->id();
            $table->string('degree_name');
            $table->string('degree_value');
            $table->timestamps();
        });
        
        Schema::create('search_courts', function (Blueprint $table) {
            $table->id();
            $table->string('degree_value');
            $table->string('court_name');
            $table->string('court_value');
            $table->timestamps();
            
        });
        
        Schema::create('search_case_types', function (Blueprint $table) {
            $table->id();
            $table->string('degree_value');
            $table->string('court_value');
            $table->string('case_type_name');
            $table->string('case_type_value');
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
        Schema::dropIfExists('search_degrees');
        Schema::dropIfExists('search_courts');
        Schema::dropIfExists('search_case_types');
    }
}
