<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Obsolete migration kept for historical ordering.
     *
     * Source of truth moved to:
     * - 2026_02_16_000090_create_offices_table
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
