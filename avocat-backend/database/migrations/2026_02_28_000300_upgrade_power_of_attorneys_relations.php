<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * This migration is now intentionally a no-op.
     *
     * The power_of_attorneys/related schema is part of base table definitions in:
     * - 2023_04_12_050522_create_power_of_attorneys_table
     * - 2024_01_09_034804_create_legal_docs_table
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
