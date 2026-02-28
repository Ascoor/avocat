<?php

namespace App\Services;

use App\Models\Client;

class ClientService
{
    public function getLast30ClientsWithBirthDate()
    {
        return Client::all();
    }

    public function createClient(array $validatedData): Client
    {
        return Client::create($validatedData);
    }

    public function getClientById(int|string $id): Client
    {
        return Client::findOrFail($id);
    }

    public function updateClient(int|string $id, array $validatedData): Client
    {
        $client = $this->getClientById($id);
        $client->fill($validatedData);
        $client->save();

        return $client;
    }

    public function deleteClient(int|string $id): void
    {
        $client = $this->getClientById($id);
        $client->delete();
    }
}
