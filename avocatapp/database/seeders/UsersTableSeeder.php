<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\ClientRepository;
use Laravel\Passport\TokenRepository;
use Illuminate\Support\Facades\DB;
use App\Models\User;


class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $users = [
            [
                'name' => 'عبدالحميد عسكر',
                'email' => 'a@a.com',
                'password' => 'Ask@123456', // Store the plain password here
                'role' => 'admin',
            ],
            [
                'name' => 'User 2',
                'email' => 'user2@example.com',
                'password' => 'password', // Store the plain password here
                'role' => 'user',
            ],
            // Add more users here
        ];
        $clientRepository = app(ClientRepository::class);
        $validRoles = ['admin', 'user'];

     
        foreach ($users as $userData) {
            DB::beginTransaction();
            try {
                if (!in_array($userData['role'], $validRoles, true)) {
                    throw new \InvalidArgumentException("Invalid role value: {$userData['role']}");
                }

                $user = new User([
                    'name' => $userData['name'],
                    'email' => $userData['email'],
                    'password' => Hash::make($userData['password']),
                    'role' => $userData['role'],
                ]);
                $user->save();
                
                // Create a Passport client for the user
                $client = $clientRepository->createPersonalAccessClient(
                    $user->id,
                    $user->name,
                    ''
                );

                // Create a new personal access token
                $token = $user->createToken($user->name);

                // Store the client ID and secret in the user model
                $user->client_id = $client->id;
                $user->client_secret = $client->secret;
                $user->save();

                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();
                throw $e;
            }
        }
    }
}
