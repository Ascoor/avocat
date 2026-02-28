<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Client;
use App\Services\ClientService;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    protected $clientService;

    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
    }

    
    public function index(Request $request)
    {
        $query = Client::with([
            'legCases.caseType',
            'legCases.caseSubType',
            'legCases.courts',
            'services',
            'services.serviceType',
        ]);

        $query
            ->when($request->filled('client_name'), fn ($builder) => $builder->where('name', 'like', '%'.$request->string('client_name').'%'))
            ->when($request->filled('client_status'), fn ($builder) => $builder->where('status', $request->string('client_status')))
            ->when($request->filled('from_date'), fn ($builder) => $builder->whereDate('updated_at', '>=', $request->date('from_date')))
            ->when($request->filled('to_date'), fn ($builder) => $builder->whereDate('updated_at', '<=', $request->date('to_date')))
            ->orderByDesc($request->input('sort_by', 'updated_at'))
            ->orderByDesc('id');

        if ($request->filled('limit')) {
            return response()->json(['data' => $query->limit((int) $request->input('limit'))->get()]);
        }

        return response()->json(['clients' => $query->get()]);
    }

    public function store(Request $request)
    {
        $validatedData = $this->validateClientRequest($request);

        $client = $this->clientService->createClient($validatedData);

        return response()->json(['message' => 'Client created successfully!', 'client' => $client], 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $this->validateClientRequest($request, $id);

        $client = $this->clientService->updateClient($id, $validatedData);

        if ($request->has('status') && $client->status !== $request->status) {
            $client->status = $request->status;
            $client->save(); 

            return response()->json(['message' => 'تم تعديل حالة العميل بنجاح']);
        }

        return response()->json(['message' => 'تم تحديث حالة العميل بنجاح']);
    }

    public function show($id)
    {
        $client = $this->clientService->getClientById($id);
        return response()->json(['client' => $client]);
    }

    public function destroy($id)
    {
        $this->clientService->deleteClient($id);
        return response()->json(['message' => 'Client deleted successfully']);
    }

    protected function validateClientRequest(Request $request, $clientId = null)
    {
        return $request->validate([
            'slug' => 'unique:clients,slug,' . $clientId,
            'name' => 'required',
            'email' => 'nullable|unique:clients,email,' . $clientId,
            'phone_number' => 'nullable',
            'address' => 'nullable',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:ذكر,أنثى',
            'religion' => 'required|in:مسلم,مسيحي',
            'identity_number' => 'nullable|unique:clients,identity_number,' . $clientId . '|size:14',
            'work' => 'nullable',
            'emergency_number' => 'nullable',
        ]);
    }
}
