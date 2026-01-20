<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServiceType;
use App\Models\Unclient;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with(
            'clients',
            'unclients',
            'createdBy',
            'updatedBy',
            'procedures',
            'serviceType'


        
        )
        ->orderBy('created_at', 'desc')  // أولوية لتاريخ الإنشاء
        ->orderBy('updated_at', 'desc')  // ثم تاريخ التحديث
        ->orderByRaw("FIELD(status, 'منتهية', 'استيفاء', 'لم ينفذ', 'متداولة', 'قيد التنفيذ', 'جارى التنفيذ') DESC")
            

    ->get();
    
        return response()->json(['services' => $services]);
    }

    public function show(Service $service)
    {
        return response()->json(['service' => $service]);
    }
    
    public function store(Request $request)
{
    $data = $request->validate([
        'slug' => 'required|unique:services',
        'description' => 'required',
        'service_year' => 'required',
        'service_place_name' => 'required',
        'service_type_id' => 'required',
        'created_by' => 'required|exists:users,id',
        'client_id' => 'nullable|exists:clients,id',
        'unclient_id' => 'nullable|exists:unclients,id',
    ]);

    // ✅ التأكد من عدم وجود كل من client_id و unclient_id معًا
    if (!empty($data['client_id']) && !empty($data['unclient_id'])) {
        return response()->json(['error' => 'لا يمكن تعيين كل من client_id و unclient_id لنفس الخدمة.'], 400);
    }

    // ✅ إنشاء السجل في جدول الخدمات
    $service = Service::create([
        'slug' => $data['slug'],
        'description' => $data['description'],
        'service_year' => $data['service_year'],
        'service_place_name' => $data['service_place_name'],
        'service_type_id' => $data['service_type_id'],
        'created_by' => $data['created_by'],
    ]);

    // ✅ إدراج العلاقة في الجدول المناسب فقط إذا كانت القيمة غير فارغة
    if (!empty($data['client_id'])) {
        DB::table('service_client')->insert([
            'service_id' => $service->id,
            'client_id' => $data['client_id'],
        ]);
    } elseif (!empty($data['unclient_id'])) {
        DB::table('service_unclient')->insert([
            'service_id' => $service->id,
            'unclient_id' => $data['unclient_id'],
        ]);
    }

    return response()->json(['message' => 'تم إنشاء الخدمة بنجاح', 'service' => $service], 201);
}



// update service 
public function update(Request $request, $id)
{
    $data = $request->validate([
        'slug' => 'required|unique:services,slug,' . $id,
        'description' => 'required',
        'service_year' => 'required',
        'service_place_name' => 'required',
        'service_type_id' => 'required', 
        'updated_by' => 'required|exists:users,id',
        'client_id' => 'nullable|exists:clients,id',
        'unclient_id' => 'nullable|exists:unclients,id',
    
        'status' => ['required', Rule::in(['قيد التنفيذ', 'جارى التنفيذ', 'منتهية', 'متداولة', 'استيفاء'    ])],
    ]);


    // ✅ التأكد من أن الخدمة لا تحتوي على عميل مسجل وغير مسجل معًا
    if (!empty($data['client_id']) && !empty($data['unclient_id'])) {
        return response()->json(['error' => 'لا يمكن تعيين كل من client_id و unclient_id لنفس الخدمة.'], 400);
    }

    // ✅ جلب الخدمة
    $service = Service::findOrFail($id);

    // ✅ تحديث بيانات الخدمة
    $service->update([
        'slug' => $data['slug'],
        'description' => $data['description'],
        'service_year' => $data['service_year'],
        'service_place_name' => $data['service_place_name'],
        'service_type_id' => $data['service_type_id'],
        'updated_by' => $data['updated_by'],
        'status' => $data['status'],
    ]);

    // ✅ حذف أي بيانات قديمة من الجداول المرتبطة قبل إدخال الجديد
    DB::table('service_client')->where('service_id', $service->id)->delete();
    DB::table('service_unclient')->where('service_id', $service->id)->delete();

    // ✅ إدراج العميل الجديد بناءً على الطلب
    if (!empty($data['client_id'])) {
        DB::table('service_client')->insert([
            'service_id' => $service->id,
            'client_id' => $data['client_id'],
        ]);
    } elseif (!empty($data['unclient_id'])) {
        DB::table('service_unclient')->insert([
            'service_id' => $service->id,
            'unclient_id' => $data['unclient_id'],
        ]);
    }

    return response()->json(['message' => 'تم تحديث الخدمة بنجاح', 'service' => $service], 200);
}



// get service types
public function getServiceTypes()
{
    $serviceTypes = ServiceType::all();
    return response()->json($serviceTypes);
}  



public function getServiceSearch(Request $request)
{
    try {
        $searchQuery = $request->input('search');
        $perPage = $request->input('per_page', 15); // Default to 15 items per page

        $filteredServices = Service::with([
                'serviceType',
                'clients',
                'unclients',
                

            ])
            ->where('slug', 'like', '%' . $searchQuery . '%')
            ->orWhereHas('serviceType', function ($serviceTypeQuery) use ($searchQuery) {
                $serviceTypeQuery->where('name', 'like', '%' . $searchQuery . '%');
            })
            ->orWhereHas('clients', function ($clientQuery) use ($searchQuery) {
                $clientQuery->where('name', 'like', '%' . $searchQuery . '%');
            })
            ->orWhereHas('unclients', function ($unclientQuery) use ($searchQuery) {
                $unclientQuery->where('name', 'like', '%' . $searchQuery . '%');
            })
        
            ->get();

        return response()->json($filteredServices, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'An error occurred while searching services'], 500);
    }
}
    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(['message' => 'Service deleted successfully']);
    }
}
