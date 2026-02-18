<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnclientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unclients', function (Blueprint $table) {
            $table->id();

            $table->string('slug')->unique();
            $table->string('name');
            $table->string('email')->unique()->nullable();
            $table->string('phone_number');
            $table->string('address')->nullable();
            $table->string('work')->nullable();
            $table->string('emergency_number')->nullable();
            $table->date('date_of_birth');
            $table->enum('gender', ['ذكر', 'أنثى'])->nullable();
            $table->enum('religion', ['مسلم', 'مسيحي']) ->nullable();
            $table->string('identity_number', 14)->unique();
            
            $table->enum('status', ['active', 'inactive'])->default('active');
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
        Schema::dropIfExists('unclients');
    }
}
