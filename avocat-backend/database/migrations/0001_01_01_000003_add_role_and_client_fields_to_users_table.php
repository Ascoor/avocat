<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * This migration is now intentionally a no-op.
     *
     * User role/client columns are part of the base users table schema in:
     * - 0001_01_01_000000_create_users_table
     */
    public function up(): void
    {
        // no-op
    }

    public function down(): void
    {
        // no-op
    }
};
