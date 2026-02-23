<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Expense;
use App\Models\LegalAd;
use App\Models\Notification;
use App\Services\EventService;
use App\Services\Finance\FinancialTransactionService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LegalAdController extends Controller
{
    public function __construct(
        protected NotificationService $notificationService,
        protected EventService $eventService,
        private readonly FinancialTransactionService $financialTransactionService,
    ) {
    }

    public function index()
    {
        $legalAds = LegalAd::with(['court', 'lawyerSend', 'legCase', 'lawyerReceive', 'legalAdType'])->get();

        return response()->json([
            'message' => 'تم جلب الإعلانات القانونية بنجاح.',
            'data' => $legalAds,
        ]);
    }

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

        $event = new Event();
        $event->user_id = $request->created_by;
        $event->title = 'Legal Ad';
        $event->date = $request->send_date;
        $event->description = 'Legal ad with case ID '.$request->leg_case_id;
        $event->save();

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
            $legalAd = LegalAd::findOrFail($request->legalAdId);
            $legalAd->update($validatedData);

            if (! empty($validatedData['updated_by']) && ! empty($validatedData['receive_date'])) {
                $event = $this->eventService->createEvent(
                    $validatedData['updated_by'],
                    $validatedData['receive_date'],
                    $validatedData['leg_case_id']
                );

                if ($event && isset($event->user_id)) {
                    $this->notificationService->createNotification($event->user_id, $event->id, $validatedData['results']);
                }
            }

            if ($validatedData['status'] === 'تم الإستلام') {
                $amountArray = array_filter([
                    'cost1' => $validatedData['cost1'] ?? 0,
                    'cost2' => $validatedData['cost2'] ?? 0,
                    'cost3' => $validatedData['cost3'] ?? 0,
                ]);

                if (! empty($amountArray)) {
                    $expense = Expense::create([
                        'leg_case_id' => $validatedData['leg_case_id'],
                        'legal_ad_id' => $legalAd->id,
                        'amount' => $amountArray,
                        'description' => $validatedData['results'],
                        'expense_category_id' => 1,
                        'expense_date' => $validatedData['receive_date'],
                        'created_by' => $validatedData['updated_by'],
                    ]);

                    $this->financialTransactionService->create([
                        'type' => 'expense',
                        'amount' => array_sum(array_map('floatval', $amountArray)),
                        'occurred_at' => $validatedData['receive_date'],
                        'description' => $validatedData['results'],
                        'category_type' => 'expense',
                        'category_id' => 1,
                        'leg_case_id' => $validatedData['leg_case_id'],
                        'source_type' => 'App\\Models\\LegalAd',
                        'source_id' => $legalAd->id,
                        'created_by' => $validatedData['updated_by'],
                        'metadata' => ['legacy_expense_id' => $expense->id],
                    ]);

                    $this->financialTransactionService->syncCaseTotals((int) $validatedData['leg_case_id']);
                }
            }

            return response()->json($legalAd);
        });
    }

    public function destroy(Request $request)
    {
        $legalAd = LegalAd::findOrFail($request->legalAdId);
        $legalAd->delete();

        return response()->json(null, 204);
    }

    public function getByLegCaseId($legCaseId)
    {
        $legalAds = LegalAd::where('leg_case_id', $legCaseId)
            ->with(['legalAdType', 'court', 'lawyerSend', 'lawyerReceive'])
            ->get();

        return response()->json($legalAds);
    }
}
