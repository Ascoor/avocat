<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * This migration is now intentionally a no-op.
     *
     * Notification payload columns/indexes are part of the base table schema in:
     * - 2023_08_25_013015_create_notifications_table
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
