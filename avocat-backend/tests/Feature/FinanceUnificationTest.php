<?php

namespace Tests\Feature;

use App\Models\Invoice;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class FinanceUnificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_legal_ad_receipt_creates_linked_expense_and_ledger_entry(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $caseTypeId = DB::table('case_types')->insertGetId(['name' => 'Type', 'created_at' => now(), 'updated_at' => now()]);
        $caseSubTypeId = DB::table('case_sub_types')->insertGetId(['name' => 'Sub', 'case_type_id' => $caseTypeId, 'created_at' => now(), 'updated_at' => now()]);
        $courtTypeId = DB::table('court_types')->insertGetId(['name' => 'CourtType', 'created_at' => now(), 'updated_at' => now()]);
        $courtLevelId = DB::table('court_levels')->insertGetId(['name' => 'CourtLevel', 'created_at' => now(), 'updated_at' => now()]);
        $courtId = DB::table('courts')->insertGetId(['name' => 'Court', 'court_type_id' => $courtTypeId, 'court_level_id' => $courtLevelId, 'created_at' => now(), 'updated_at' => now()]);
        $legalAdTypeId = DB::table('legal_ad_types')->insertGetId(['name' => 'Ad', 'created_at' => now(), 'updated_at' => now()]);
        DB::table('expense_categories')->insert(['id' => 1, 'name' => 'General', 'created_at' => now(), 'updated_at' => now()]);

        $legCaseId = DB::table('leg_cases')->insertGetId([
            'slug' => 'case-1',
            'title' => 'Case',
            'case_type_id' => $caseTypeId,
            'case_sub_type_id' => $caseSubTypeId,
            'created_by' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $legalAdId = DB::table('legal_ads')->insertGetId([
            'description' => 'desc',
            'send_date' => now()->toDateString(),
            'lawyer_send_id' => '1',
            'legal_ad_type_id' => $legalAdTypeId,
            'leg_case_id' => $legCaseId,
            'court_id' => $courtId,
            'created_by' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->putJson("/api/v1/legal-ads/{$legalAdId}", [
            'legalAdId' => $legalAdId,
            'receive_date' => now()->toDateString(),
            'lawyer_receive_id' => '2',
            'status' => 'تم الإستلام',
            'results' => 'done',
            'leg_case_id' => $legCaseId,
            'updated_by' => $user->id,
            'cost1' => 100,
        ]);

        $response->assertOk();
        $this->assertDatabaseHas('expenses', ['legal_ad_id' => $legalAdId, 'legal_session_id' => null]);
        $this->assertDatabaseHas('financial_transactions', ['source_type' => 'App\\Models\\LegalAd', 'source_id' => $legalAdId, 'type' => 'expense']);
    }

    public function test_invoice_status_and_case_totals_update_when_payments_change(): void
    {
        $user = User::factory()->create();
        $caseTypeId = DB::table('case_types')->insertGetId(['name' => 'Type', 'created_at' => now(), 'updated_at' => now()]);
        $caseSubTypeId = DB::table('case_sub_types')->insertGetId(['name' => 'Sub', 'case_type_id' => $caseTypeId, 'created_at' => now(), 'updated_at' => now()]);
        $legCaseId = DB::table('leg_cases')->insertGetId([
            'slug' => 'case-2',
            'title' => 'Case',
            'fees' => 500,
            'case_type_id' => $caseTypeId,
            'case_sub_type_id' => $caseSubTypeId,
            'created_by' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $invoice = Invoice::create([
            'leg_case_id' => $legCaseId,
            'invoice_number' => 'INV-1',
            'status' => 'Sent',
            'issue_date' => now()->toDateString(),
            'due_date' => now()->subDay()->toDateString(),
            'total_amount' => 500,
        ]);

        $payment = Payment::create([
            'invoice_id' => $invoice->id,
            'payment_date' => now()->toDateString(),
            'payment_method' => 'Cash',
            'amount' => 500,
        ]);

        $invoice->refresh();
        $this->assertEquals('Paid', $invoice->status);
        $this->assertDatabaseHas('financial_transactions', ['source_type' => 'App\\Models\\Payment', 'source_id' => $payment->id, 'type' => 'payment']);
        $this->assertDatabaseHas('leg_cases', ['id' => $legCaseId, 'total_payments' => 500]);
    }

    public function test_lookup_duplicate_name_is_rejected_within_scope(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        DB::table('expense_categories')->insert([
            'name' => 'Travel',
            'office_id' => null,
            'is_system' => true,
            'is_active' => true,
            'sort_order' => 0,
            'is_locked' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->postJson('/api/v1/expense_categories', ['name' => 'travel']);

        $response->assertStatus(422);
    }
}
