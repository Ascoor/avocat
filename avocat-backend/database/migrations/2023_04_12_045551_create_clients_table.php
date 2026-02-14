<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('address');
            $table->string('nationality')->nullable();
            $table->string('work')->nullable();
            $table->string('emergency_number')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['ذكر', 'أنثى']);
            $table->enum('religion', ['مسلم', 'مسيحي'])->default('مسلم');
            $table->string('identity_number', 14)->unique()->nullable();
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
        Schema::dropIfExists('clients');
    }
}
