<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $users = [
            [
                'name' => 'عبدالحميد عسكر',
                'email' => 'a@a.com',
                'password' => 'Ask@123456',
                'role' => '1',
            ],
            [
                'name' => 'User 2',
                'email' => 'user2@example.com',
                'password' => 'password',
                'role' => '2',
            ],
        ];

        $validRoles = ['1','2','3'];

        foreach ($users as $u) {
            if (!in_array($u['role'], $validRoles, true)) {
                throw new \InvalidArgumentException("Invalid role value: {$u['role']}");
            }

            // updateOrCreate prevents duplicates when re-seeding
            $user = User::updateOrCreate(
                ['email' => $u['email']],
                [
                    'name' => $u['name'],
                    'password' => Hash::make($u['password']),
                    'role' => $u['role'],
                ]
            );

            // Optional: create a token for testing (comment out if not needed)
            // $token = $user->createToken('seed-token')->accessToken;
            // dump($user->email, $token);
        }
    }
}
