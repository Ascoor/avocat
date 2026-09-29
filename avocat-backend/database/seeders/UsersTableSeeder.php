<?php

namespace Database\Seeders;

use App\Models\Office;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class UsersTableSeeder extends Seeder
{
    public static function validateConfiguration(): void
    {
        if (app()->environment(['local', 'testing'])) {
            return;
        }

        foreach (['name', 'email', 'password'] as $field) {
            if (blank(config("seeding.primary_user.{$field}"))) {
                $variable = 'PRIMARY_USER_'.strtoupper($field);

                throw new RuntimeException("{$variable} must be set before seeding outside local/testing environments.");
            }
        }
    }

    public function run(): void
    {
        self::validateConfiguration();

        $name = config('seeding.primary_user.name');
        $email = config('seeding.primary_user.email');
        $password = config('seeding.primary_user.password');

        // Local/test databases may omit the intended production bootstrap account.
        if (blank($name) || blank($email) || blank($password)) {
            $this->command?->warn('UsersTableSeeder: primary user skipped; bootstrap variables are not configured.');

            return;
        }

        $defaultOffice = Office::firstOrCreate(
            ['slug' => 'default-office'],
            ['name' => 'Default Office']
        );

        User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'role' => '1',
                'office_id' => $defaultOffice->id,
            ]
        );

        $this->command?->info('UsersTableSeeder: primary user account ensured.');
    }
}
