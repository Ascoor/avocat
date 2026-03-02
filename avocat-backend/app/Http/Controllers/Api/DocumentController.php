<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\Documentable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class DocumentController extends Controller
{
    private const DOCUMENT_RELATIONS = ['tab', 'client', 'legCase', 'powerOfAttorney', 'service', 'links'];

    public function index(Request $request): JsonResponse
    {
        $query = Document::query()->with(self::DOCUMENT_RELATIONS);

        $this->applyIndexFilters($query, $request);

        return response()->json($query->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'file' => ['required', 'file', 'max:10240'],
            'document_tab_id' => ['required', 'exists:document_tabs,id'],
            'client_id' => ['nullable', 'exists:clients,id'],
            'leg_case_id' => ['nullable', 'exists:leg_cases,id'],
            'power_of_attorney_id' => ['nullable', 'exists:power_of_attorneys,id'],
            'service_id' => ['nullable', 'exists:services,id'],
            'documentable_type' => ['nullable', 'string', Rule::in([
                'App\\Models\\Client',
                'App\\Models\\LegCase',
                'App\\Models\\PowerOfAttorney',
                'App\\Models\\Service',
            ])],
            'documentable_id' => ['nullable', 'integer'],
        ]);

        $filePath = $request->file('file')->store('documents', 'public');

        $document = Document::create([
            'name' => $validated['name'],
            'file_path' => $filePath,
            'document_tab_id' => $validated['document_tab_id'],
            'client_id' => $validated['client_id'] ?? null,
            'leg_case_id' => $validated['leg_case_id'] ?? null,
            'power_of_attorney_id' => $validated['power_of_attorney_id'] ?? null,
            'service_id' => $validated['service_id'] ?? null,
        ]);

        if (!empty($validated['documentable_type']) && !empty($validated['documentable_id'])) {
            Documentable::firstOrCreate([
                'document_id' => $document->id,
                'documentable_type' => $validated['documentable_type'],
                'documentable_id' => $validated['documentable_id'],
            ]);
        }

        Log::info('audit.document.created', [
            'document_id' => $document->id,
            'actor_id' => optional($request->user())->id,
            'linked_entities' => [
                'client_id' => $document->client_id,
                'leg_case_id' => $document->leg_case_id,
                'power_of_attorney_id' => $document->power_of_attorney_id,
                'service_id' => $document->service_id,
            ],
        ]);

        return response()->json($document->load(self::DOCUMENT_RELATIONS), 201);
    }

    public function show(Document $document): JsonResponse
    {
        return response()->json($document->load(self::DOCUMENT_RELATIONS));
    }

    public function update(Request $request, Document $document): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'file' => ['sometimes', 'required', 'file', 'max:10240'],
            'document_tab_id' => ['sometimes', 'required', 'exists:document_tabs,id'],
            'client_id' => ['nullable', 'exists:clients,id'],
            'leg_case_id' => ['nullable', 'exists:leg_cases,id'],
            'power_of_attorney_id' => ['nullable', 'exists:power_of_attorneys,id'],
            'service_id' => ['nullable', 'exists:services,id'],
        ]);

        if ($request->hasFile('file')) {
            Storage::disk('public')->delete($document->file_path);
            $validated['file_path'] = $request->file('file')->store('documents', 'public');
        }

        $document->update($validated);

        Log::info('audit.document.updated', [
            'document_id' => $document->id,
            'actor_id' => optional($request->user())->id,
        ]);

        return response()->json($document->load(self::DOCUMENT_RELATIONS));
    }

    public function destroy(Request $request, Document $document): JsonResponse
    {
        Storage::disk('public')->delete($document->file_path);

        Log::info('audit.document.deleted', [
            'document_id' => $document->id,
            'actor_id' => optional($request->user())->id,
        ]);

        $document->delete();

        return response()->json(['message' => 'Document deleted successfully']);
    }

    private function applyIndexFilters($query, Request $request): void
    {
        $query->when($request->filled('document_tab_id'), fn ($builder) => $builder->where('document_tab_id', $request->integer('document_tab_id')))
            ->when($request->filled('client_name'), function ($builder) use ($request) {
                $builder->whereHas('client', function ($subQuery) use ($request) {
                    $subQuery->where('name', 'like', '%'.$request->string('client_name').'%');
                });
            })
            ->when($request->filled('leg_case_id'), fn ($builder) => $builder->where('leg_case_id', $request->integer('leg_case_id')))
            ->when($request->filled('power_of_attorney_id'), fn ($builder) => $builder->where('power_of_attorney_id', $request->integer('power_of_attorney_id')))
            ->when($request->filled('service_id'), fn ($builder) => $builder->where('service_id', $request->integer('service_id')))
            ->latest('id');
    }
}
