<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->string('title')->nullable()->after('type');
            $table->string('entity_type')->nullable()->after('message');
            $table->string('entity_id')->nullable()->after('entity_type');
            $table->string('action')->nullable()->after('entity_id');
            $table->string('url')->nullable()->after('action');
            $table->unsignedBigInteger('actor_id')->nullable()->after('url');
            $table->uuid('event_uuid')->nullable()->after('actor_id');
            $table->json('meta')->nullable()->after('event_uuid');

            $table->foreign('actor_id')->references('id')->on('users')->nullOnDelete();
            $table->unique(['user_id', 'event_uuid']);
        });
    }

    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'event_uuid']);
            $table->dropForeign(['actor_id']);
            $table->dropColumn(['title', 'entity_type', 'entity_id', 'action', 'url', 'actor_id', 'event_uuid', 'meta']);
        });
    }
};
