<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourtsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { // إنشاء جدول أنواع المحاكم
        Schema::create('court_types', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // اسم النوع
            $table->timestamps();
        });

        // إنشاء جدول مستويات المحاكم
        Schema::create('court_levels', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // اسم المستوى
            $table->timestamps();
        });

        // إنشاء جدول المحاكم
        Schema::create('courts', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // اسم المحكمة
            $table->unsignedBigInteger('court_type_id'); // معرف نوع المحكمة
            $table->unsignedBigInteger('court_level_id'); // معرف مستوى المحكمة
            $table->timestamps();

            // العلاقات الخارجية
            $table->foreign('court_type_id')->references('id')->on('court_types');
            $table->foreign('court_level_id')->references('id')->on('court_levels');
        });

        // إنشاء جدول الدوائر
        Schema::create('divisions', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // اسم الدائرة
            $table->unsignedBigInteger('court_id'); // معرف المحكمة
            $table->timestamps();

            // العلاقة الخارجية
            $table->foreign('court_id')->references('id')->on('courts')->onDelete('cascade');
        });



    }

    /**
     * Reverse the migrations.
     */
  
     public function down()
     {
         // العكس عند التراجع عن التهاجرات
         Schema::dropIfExists('divisions');
         Schema::dropIfExists('courts');
         Schema::dropIfExists('court_levels');
         Schema::dropIfExists('court_types');
     
    }
}
