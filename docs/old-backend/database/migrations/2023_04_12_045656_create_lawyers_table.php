<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLawyersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lawyers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('birthdate');
            $table->string('identity_number')->unique();
            $table->string('law_reg_num')->unique();
            $table->enum('lawyer_class', ['نقض', 'إستئناف','إبتدائي','جدول عام']);
            $table->string('email')->unique();
            $table->string('phone_number')->nullable();
            $table->enum('gender', ['ذكر', 'أنثى']);
            $table->string('address')->nullable();
            $table->enum('religion', ['مسلم', 'مسيحى']);
            $table->unsignedBigInteger('user_id')->nullable(); // Add user_id column
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Add a foreign key constraint
 
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
        Schema::dropIfExists('lawyers');
    }
}
