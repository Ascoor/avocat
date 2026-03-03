<?php

use Illuminate\Database\Migrations\Migration;

class AddExpiresAtToPersonalAccessTokensTable extends Migration
{
    /**
     * This migration is now intentionally a no-op.
     *
     * The expires_at column is part of the base table schema in:
     * - 2019_12_14_000001_create_personal_access_tokens_table
     *
     * @return void
     */
    public function up()
    {
        // no-op
    }

    /**
     * @return void
     */
    public function down()
    {
        // no-op
    }
}
