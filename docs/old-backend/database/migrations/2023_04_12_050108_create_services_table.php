<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {


        Schema::create('service_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('description')->nullable();
            $table->string('service_place_name')->nullable();
            $table->string('service_year')->nullable();
            $table->unsignedBigInteger('created_by')->default(1);
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();
         

            $table->enum('status', ['قيد التنفيذ', 'جارى التنفيذ', 'منتهية', 'متداولة', 'استيفاء'])->default('جارى التنفيذ');
        
            $table->foreignId('service_type_id')->constrained()->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('updated_by')->references('id')->on('users');
        });
    }


    public function down()
    {
        Schema::dropIfExists('service_types');
        Schema::dropIfExists('services');
    }
}
