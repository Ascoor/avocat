<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Obsolete migration kept for backward compatibility with already-migrated environments.
     *
     * Source of truth moved to:
     * - 2026_02_16_000100_add_office_settings_columns_to_lookup_tables
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
