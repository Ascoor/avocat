<?php

namespace App\Http\Controllers;

use App\Models\DocSubType;
use App\Models\DocType;
use App\Models\LegalDoc;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class LegalWriterController extends Controller
{
    public function index()
    {
     //
    }


    
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file',
            'description' => 'required|string',
            'doc_type_id' => 'required|exists:doc_types,id',
            'doc_sub_type_id' => 'required|exists:doc_sub_types,id',
        ]);

        $file = $request->file('file');
        $description = $request->description;
        $docTypeId = $request->doc_type_id;
        $docSubTypeId = $request->doc_sub_type_id;

        $docType = DocType::find($docTypeId);
        $docSubType = DocSubType::find($docSubTypeId);

        if (!$docType || !$docSubType) {
            return response()->json(['message' => 'Invalid document type or subtype.'], 404);
        }

        // Building the file path
        $directory = 'legal_docs/' . Str::slug($docType->name) . '/' . Str::slug($docSubType->name);
        $fileName = Str::slug($description) . '.' . $file->getClientOriginalExtension();
        $filePath = $directory . '/' . $fileName;

        // Check if directory exists and create if not
        if (!Storage::exists($directory)) {
            Storage::makeDirectory($directory);
        }

        // Store the file
        Storage::putFileAs($directory, $file, $fileName);

        // Store file details in database
        $legalDoc = new LegalDoc();
        $legalDoc->path = $filePath;
        $legalDoc->description = $description;
        $legalDoc->doc_type_id = $docTypeId;
        $legalDoc->doc_sub_type_id = $docSubTypeId;
        $legalDoc->save();

        return response()->json(['message' => 'File uploaded successfully', 'legalDoc' => $legalDoc]);
    }
}