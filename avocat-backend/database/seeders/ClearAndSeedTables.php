<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ClearAndSeedTables extends Seeder
{
    public function run()
    {
        // Get the database name from the .env file
        $database = env('DB_DATABASE');

        if (!$database) {
            $this->command->error("No database specified in the .env file. Check your .env file.");
            return;
        }

        $this->command->info("Preparing to clear and seed tables in database: $database");

        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // List of tables to clear and reseed
        $tables = [
            'users' => [
                ['name' => 'John Doe', 'email' => 'john@example.com', 'password' => bcrypt('password')],
                ['name' => 'Jane Smith', 'email' => 'jane@example.com', 'password' => bcrypt('password')],
            ],
            'clients' => [
                ['name' => 'Client A', 'email' => 'clientA@example.com'],
                ['name' => 'Client B', 'email' => 'clientB@example.com'],
            ],
            'lawyers' => [
                ['name' => 'Lawyer X', 'email' => 'lawyerX@example.com', 'specialization' => 'Civil'],
                ['name' => 'Lawyer Y', 'email' => 'lawyerY@example.com', 'specialization' => 'Criminal'],
            ],
        ];

        // Iterate over tables, truncate, and reseed
        foreach ($tables as $table => $data) {
            if (Schema::hasTable($table)) {
                DB::table($table)->truncate(); // Clear table
                DB::table($table)->insert($data); // Reseed data
                $this->command->info("Table '$table' cleared and reseeded.");
            } else {
                $this->command->warn("Table '$table' does not exist. Skipping...");
            }
        }

        // Enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Final message
        $this->command->info("All specified tables have been cleared and reseeded successfully!");
    }
}
