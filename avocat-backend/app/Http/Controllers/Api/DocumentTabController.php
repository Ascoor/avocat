<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DocumentTab;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DocumentTabController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(DocumentTab::query()->orderBy('id')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name_ar' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'tab_type' => ['required', 'string', 'max:255'],
        ]);

        return response()->json(DocumentTab::create($validated), 201);
    }

    public function show(DocumentTab $documentTab): JsonResponse
    {
        return response()->json($documentTab->loadCount('documents'));
    }

    public function update(Request $request, DocumentTab $documentTab): JsonResponse
    {
        $validated = $request->validate([
            'name_ar' => ['sometimes', 'required', 'string', 'max:255'],
            'name_en' => ['sometimes', 'required', 'string', 'max:255'],
            'tab_type' => ['sometimes', 'required', 'string', 'max:255'],
        ]);

        $documentTab->update($validated);

        return response()->json($documentTab);
    }

    public function destroy(DocumentTab $documentTab): JsonResponse
    {
        $documentTab->delete();

        return response()->json(['message' => 'Document tab deleted successfully']);
    }
}
