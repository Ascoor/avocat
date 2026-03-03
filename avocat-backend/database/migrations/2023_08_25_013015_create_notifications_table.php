<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('event_id');
            $table->string('type');
            $table->string('title')->nullable();
            $table->text('message');
            $table->string('entity_type')->nullable();
            $table->string('entity_id')->nullable();
            $table->string('action')->nullable();
            $table->string('url')->nullable();
            $table->unsignedBigInteger('actor_id')->nullable();
            $table->uuid('event_uuid')->nullable();
            $table->json('meta')->nullable();
            $table->boolean('read')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
            $table->foreign('actor_id')->references('id')->on('users')->nullOnDelete();
            $table->unique(['user_id', 'event_uuid']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notifications');
    }
}
