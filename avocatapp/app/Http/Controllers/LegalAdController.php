<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Expense;
use App\Models\Lawyer;
use App\Models\LegalAd;
use App\Models\Notification;
use App\Services\EventService;
use App\Services\ExpenseService;
use App\Services\NotificationService;
use Illuminate\Http\Request; 
    use Illuminate\Support\Facades\DB;

class LegalAdController extends Controller
{
    protected $expenseService;
    protected $notificationService;
    protected $eventService;

    public function __construct(
        ExpenseService $expenseService,
        NotificationService $notificationService,
        EventService $eventService
    ) {
        $this->expenseService = $expenseService;
        $this->notificationService = $notificationService;
        $this->eventService = $eventService;
    }

    // Fetch all legal ads
    public function index()
    {
        try {
            $legalAds = LegalAd::with(['court', 'lawyerSend', 'legCase', 'lawyerReceive', 'legalAdType'])->get();

            if ($legalAds->isEmpty()) {
                return response()->json([
                    'message' => 'لا توجد إعلانات قانونية مرتبطة بهذه القضية.',
                    'data' => [],
                ], 200);
            }

            return response()->json([
                'message' => 'تم جلب الإعلانات القانونية بنجاح.',
                'data' => $legalAds,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء جلب الإعلانات القانونية.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }  
    // Store a new legal ad
    public function store(Request $request)
    {
        $request->validate([
            'leg_case_id' => 'required',
            'description' => 'required',
            'legal_ad_type_id' => 'required',
            'court_id' => 'required',
            'send_date' => 'required',
            'cost1' => 'numeric|nullable',
            'cost2' => 'numeric|nullable',
            'cost3' => 'numeric|nullable',
            'lawyer_send_id' => 'required',
            'created_by' => 'required',
        ]);

        $legalAd = LegalAd::create($request->all());

        // Create Calendar Event
        $event = new Event();
        $event->user_id = $request->created_by;
        $event->title = "Legal Ad";
        $event->date = $request->send_date;
        $event->description = "Legal ad with case ID " . $request->leg_case_id;
        $event->save();

        // Create a Notification
        $notification = new Notification();
        $notification->user_id = $request->created_by;
        $notification->event_id = $event->id;
        $notification->type = 'Legal Session';
        $notification->message = 'A new legal ad has been created. Please check your agenda.';
        $notification->read = false;
        $notification->save();

        return response()->json(['message' => 'Legal ad, event, and notification created successfully']);
    }



    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'receive_date' => 'required|date',
            'lawyer_receive_id' => 'required',
            'status' => 'required',
            'results' => 'required',
            'leg_case_id' => 'required|exists:leg_cases,id',
            'updated_by' => 'required|exists:users,id',
            'cost1' => 'nullable|numeric',
            'cost2' => 'nullable|numeric',
            'cost3' => 'nullable|numeric',
        ]);
    
        return DB::transaction(function () use ($request, $validatedData) {
            $id = $request->legalAdId;
            $legalAd = LegalAd::findOrFail($id);
            $legalAd->update($validatedData);
    
            // إنشاء حدث
            if (!empty($validatedData['updated_by']) && !empty($validatedData['receive_date'])) {
                $event = $this->eventService->createEvent(
                    $validatedData['updated_by'],
                    $validatedData['receive_date'],
                    $validatedData['leg_case_id']
                );
    
                // إنشاء إشعار إذا كان الحدث ناجحًا
                if ($event && isset($event->user_id)) {
                    $this->notificationService->createNotification($event->user_id, $event->id, $validatedData['results']);
                }
            }
    
            // إذا كانت الحالة "تم الإستلام"، أنشئ سجل مصروف جديد
            if ($validatedData['status'] === 'تم الإستلام') {
                $amountArray = array_filter([
                    'cost1' => $validatedData['cost1'] ?? 0,
                    'cost2' => $validatedData['cost2'] ?? 0,
                    'cost3' => $validatedData['cost3'] ?? 0,
                ]);
    
                if (!empty($amountArray)) {
                    Expense::create([
                        'leg_case_id' => $validatedData['leg_case_id'],
                        'legal_session_id' => $legalAd->id,
                        'amount' => json_encode($amountArray),
                        'description' => $validatedData['results'],
                        'expense_category_id' => 1,
                        'expense_date' => $validatedData['receive_date'],
                        'created_by' => $validatedData['updated_by'],
                    ]);
                }
            }
    
            return response()->json($legalAd);
        });
    }
    

    // Delete a legal ad
    public function destroy(Request $request)
    {
        $id = $request->legalAdId;
        $legalAd = LegalAd::findOrFail($id);
        $legalAd->delete();
        return response()->json(null, 204);
    }

    // Fetch legal ads by case ID
    public function getByLegCaseId($legCaseId)
{
    try {
        $legalAds = LegalAd::where('leg_case_id', $legCaseId)
            ->with(['legalAdType', 'court', 'lawyerSend', 'lawyerReceive'])
            ->get();

        return response()->json($legalAds);
    } catch (\Exception $ex) {
        return response()->json(['error' => 'Failed to fetch legal ads by leg_case_id'], 500);
    }
}

}