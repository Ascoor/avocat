<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;

final class SeedData
{
    /**
     * Insert exported records which have a real primary-key ID without changing
     * records already present in the database.
     *
     * @param  array<int, array<string, mixed>>  $rows
     */
    public static function insertMissingById(string $table, array $rows, int $chunkSize = 500): void
    {
        foreach (array_chunk($rows, $chunkSize) as $chunk) {
            if ($chunk === []) {
                continue;
            }

            foreach ($chunk as $row) {
                if (! array_key_exists('id', $row)) {
                    throw new \InvalidArgumentException("{$table} seed row has no id");
                }
            }

            // PostgreSQL's primary key supplies the conflict arbiter. With no
            // update clause, production changes to an exported row are retained.
            DB::table($table)->insertOrIgnore($chunk);
        }
    }

    /**
     * Insert rows for a table which has no database key, treating the complete
     * exported row (including NULL values) as its identity.
     *
     * This deliberately does not use upsert: PostgreSQL cannot use arbitrary
     * columns as an ON CONFLICT target without a matching unique constraint.
     * It is intended only for exports proven not to contain exact duplicates.
     *
     * @param  array<int, array<string, mixed>>  $rows
     */
    public static function insertMissingRows(string $table, array $rows, int $chunkSize = 500): void
    {
        foreach (array_chunk($rows, $chunkSize) as $chunk) {
            foreach ($chunk as $row) {
                $query = DB::table($table);

                foreach ($row as $column => $value) {
                    $value === null
                        ? $query->whereNull($column)
                        : $query->where($column, $value);
                }

                if (! $query->exists()) {
                    DB::table($table)->insert($row);
                }
            }
        }
    }
}
