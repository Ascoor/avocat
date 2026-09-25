<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;

final class SeedData
{
    /**
     * Insert the exported rows once, and converge rows with the same stable ID on
     * later runs. Existing rows not represented in the export are never removed.
     *
     * @param  array<int, array<string, mixed>>  $rows
     */
    public static function upsert(string $table, array $rows, int $chunkSize = 500): void
    {
        foreach (array_chunk($rows, $chunkSize) as $chunk) {
            if ($chunk === []) {
                continue;
            }

            $columns = array_values(array_diff(array_keys($chunk[0]), ['id']));
            DB::table($table)->upsert($chunk, ['id'], $columns);
        }
    }
}
