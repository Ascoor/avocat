<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class PowerOfAttorneyControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_creates_power_of_attorney_with_lawyer_and_case_links(): void
    {
        $this->withoutMiddleware();

        $user = User::factory()->create();

        $clientId = DB::table('clients')->insertGetId([
            'slug' => 'c-1',
            'name' => 'عميل 1',
            'address' => 'عنوان',
            'gender' => 'ذكر',
            'religion' => 'مسلم',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $lawyerId = DB::table('lawyers')->insertGetId([
            'name' => 'محامي 1',
            'birthdate' => '1990-01-01',
            'identity_number' => '12345678901234',
            'law_reg_num' => 'LR-1',
            'lawyer_class' => 'إبتدائي',
            'email' => 'lawyer1@example.com',
            'gender' => 'ذكر',
            'religion' => 'مسلم',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $attorneyTypeId = DB::table('attorney_types')->insertGetId([
            'name' => 'توكيل عام',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $caseTypeId = DB::table('case_types')->insertGetId([
            'name' => 'مدني',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $caseSubTypeId = DB::table('case_sub_types')->insertGetId([
            'name' => 'إيجارات',
            'case_type_id' => $caseTypeId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $legCaseId = DB::table('leg_cases')->insertGetId([
            'slug' => 'case-1',
            'title' => 'قضية 1',
            'case_type_id' => $caseTypeId,
            'case_sub_type_id' => $caseSubTypeId,
            'created_by' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->postJson('/api/v1/power-of-attorneys', [
            'attorney_num' => 'POA-001',
            'attorney_date' => '2026-02-28',
            'attorney_chart' => 'A',
            'attorney_place' => 'Cairo',
            'title' => 'توكيل نزاع إيجار',
            'description' => 'اختبار',
            'client_id' => $clientId,
            'lawyer_id' => $lawyerId,
            'lawyer_insert' => 'بيانات المحامي',
            'created_by' => $user->id,
            'attorney_type_id' => $attorneyTypeId,
            'status' => 'active',
            'leg_case_ids' => [$legCaseId],
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.client_id', $clientId)
            ->assertJsonPath('data.lawyer_id', $lawyerId);

        $this->assertDatabaseHas('power_of_attorneys', [
            'attorney_num' => 'POA-001',
            'client_id' => $clientId,
            'lawyer_id' => $lawyerId,
        ]);

        $this->assertDatabaseHas('leg_case_power_of_attorney', [
            'leg_case_id' => $legCaseId,
        ]);
    }

    public function test_index_returns_paginated_payload(): void
    {
        $this->withoutMiddleware();

        $user = User::factory()->create();

        $clientId = DB::table('clients')->insertGetId([
            'slug' => 'c-2',
            'name' => 'عميل 2',
            'address' => 'عنوان',
            'gender' => 'ذكر',
            'religion' => 'مسلم',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $attorneyTypeId = DB::table('attorney_types')->insertGetId([
            'name' => 'توكيل خاص',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('power_of_attorneys')->insert([
            [
                'attorney_num' => 'POA-P1',
                'attorney_date' => now()->toDateString(),
                'attorney_chart' => 'A',
                'attorney_place' => 'Cairo',
                'title' => 'P1',
                'client_id' => $clientId,
                'lawyer_insert' => 'lawyer',
                'created_by' => $user->id,
                'attorney_type_id' => $attorneyTypeId,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'attorney_num' => 'POA-P2',
                'attorney_date' => now()->subDay()->toDateString(),
                'attorney_chart' => 'B',
                'attorney_place' => 'Giza',
                'title' => 'P2',
                'client_id' => $clientId,
                'lawyer_insert' => 'lawyer',
                'created_by' => $user->id,
                'attorney_type_id' => $attorneyTypeId,
                'status' => 'expired',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $this->getJson('/api/v1/power-of-attorneys?per_page=1')
            ->assertOk()
            ->assertJsonPath('per_page', 1)
            ->assertJsonCount(1, 'data')
            ->assertJsonStructure(['data', 'current_page', 'last_page', 'total']);
    }
}
