<?php

namespace App\Http\Controllers;

use App\Models\DocSubType;
use App\Models\DocType;
use Illuminate\Http\Request;

class LegalDocToolsController extends Controller
{
    // Get DocTypes with DocSubTypes
    public function getDocTypesWithDocSubTypes() {
        $docTypes = DocType::with('docSubTypes')->get();
        return response()->json(['data' => $docTypes]);
    }



    // Add DocType
    public function addDocType(Request $request) {
        $request->validate([
            'name' => 'required|unique:doc_types',
        ]);
        $docType = new DocType;
        $docType->name = $request->name;
        $docType->save();

        return response()->json(['message' => 'DocType added successfully', 'data' => $docType], 201);
    }

    // Edit DocType
    public function editDocType(Request $request, $id) {
        $request->validate([
            'name' => 'required|unique:doc_types,name,'.$id,
        ]);

        $docType = DocType::find($id);
        if (!$docType) {
            return response()->json(['message' => 'DocType not found'], 404);
        }

        $docType->update(['name' => $request->name]);
        return response()->json(['message' => 'DocType updated successfully', 'data' => $docType]);
    }

    // Add DocSubType
    public function addDocSubType(Request $request) {
        $request->validate([
            'name' => 'required|unique:doc_sub_types',
            'docTypeId' => 'required|exists:doc_types,id',
        ]);

        $docSubType = new DocSubType;
        $docSubType->name = $request->name;
        $docSubType->doc_type_id = $request->docTypeId;
        $docSubType->save();

        return response()->json(['message' => 'DocSubType added successfully', 'data' => $docSubType], 201);
    }


    // Edit DocSubType
    public function editDocSubType(Request $request, $id) {
        $request->validate([
            'name' => 'required|unique:doc_sub_types,name,'.$id,
            'docTypeId' => 'required|exists:doc_types,id',
        ]);

        $docSubType = DocSubType::find($id);
        if (!$docSubType) {
            return response()->json(['message' => 'DocSubType not found'], 404);
        }

        $docSubType->update([
            'name' => $request->name,
            'doc_type_id' => $request->docTypeId,
        ]);

        return response()->json(['message' => 'DocSubType updated successfully', 'data' => $docSubType]);
    }
    public function deleteDocTypeAndDocSubType(Request $request, $id) {
            // تحقق مما إذا كان الطلب يحتوي على docTypeId
          $docTypeId = $request->docTypeId;
    
          if ($docTypeId) {
              // البحث عن DocSubType وحذفه إذا تم العثور عليه
              $docSubType = DocSubType::where('id', $id)->where('doc_type_id', $docTypeId)->first();
              if (!$docSubType) {
                  return response()->json(['message' => 'DocSubType not found'], 404);
              }
              $docSubType->delete();
              return response()->json(['message' => 'DocSubType deleted successfully']);
          } else {
              // البحث عن DocType وحذفه إذا لم يكن لديه DocSubTypes مرتبطة
              $docType = DocType::find($id);
              if (!$docType) {
                  return response()->json(['message' => 'DocType not found'], 404);
              }
              if ($docType->docSubTypes()->exists()) {
                  return response()->json(['message' => 'DocType has associated DocSubTypes and cannot be deleted'], 400);
              }
              $docType->delete();
              return response()->json(['message' => 'DocType deleted successfully']);
          }
      }
  }    