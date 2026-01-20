<?php
namespace App\Services;

use App\Models\Client;

class ClientService
{
    public function getLast30ClientsWithBirthDate()
    {
   
        return Client::all();
    
    }
    public function createClient($validatedData)
    {
        return Client::create($validatedData);
    }

    public function getClientById($id)
    {
        return Client::findOrFail($id);
    }

    public function updateClient($id, $validatedData)
    {
        $client = $this->getClientById($id);
        $client->fill($validatedData);
        $client->save();
        return $client;
    }

    public function deleteClient($id)
    {
        $client = $this->getClientById($id);
        $client->delete();
    }
}
