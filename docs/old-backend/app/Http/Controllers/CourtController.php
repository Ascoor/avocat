<?php

namespace App\Http\Controllers;

use App\Models\Court;
use Illuminate\Http\Request;

class CourtController extends Controller
{
    public function index()
    {
        $courts = Court::with('court_type', 'court_level')->get();
        return response()->json($courts);
    }
    // إنشاء محكمة جديدة
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',

        ]);

        $court = new Court();
        $court->name = $request->input('name');
        $court->court_type_id = $request->input('courtTypeId');
        $court->court_level_id = $request->input('courtLevelId');
        $court->save();

        return response()->json($court, 201);
    }




    // تحديث بيانات محكمة
    public function update(Request $request, $id)
    {
        $court = Court::find($id);
        // تحديث بيانات المحكمة
        $court->name = $request->input('name');
        $court->address = $request->input('courtTypeId');
        $court->address = $request->input('courtLevelId');
        // ... تعيين البيانات الأخرى ...
        $court->save();

        return response()->json($court);
    }

    // حذف محكمة
    public function destroy($id)
    {
        $court = Court::find($id);
        $court->delete();

        return response()->json(['message' => 'Court deleted successfully']);
    }
}
