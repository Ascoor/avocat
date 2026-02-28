<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['1', '2', '3'])->default('1')->after('password');
            $table->string('client_id')->nullable()->after('role');
            $table->string('client_secret')->nullable()->after('client_id');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'client_id', 'client_secret']);
        });
    }
};
