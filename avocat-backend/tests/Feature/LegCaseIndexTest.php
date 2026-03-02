<?php

namespace Tests\Feature;

use App\Models\LegCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use App\Http\Middleware\PermissionGuardMiddleware;
use Tests\TestCase;

class LegCaseIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_legcases_endpoint_returns_latest_50_with_success_envelope(): void
    {
        $user = User::factory()->create();
        $this->withoutMiddleware(PermissionGuardMiddleware::class);
        $this->actingAs($user, 'sanctum');

        $caseTypeId = \DB::table('case_types')->insertGetId([
            'name' => 'Type A',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $caseSubTypeId = \DB::table('case_sub_types')->insertGetId([
            'name' => 'Subtype A',
            'case_type_id' => $caseTypeId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        for ($i = 1; $i <= 60; $i++) {
            LegCase::query()->create([
                'slug' => 'LC-'.$i,
                'title' => 'Case '.$i,
                'description' => 'Description '.$i,
                'case_type_id' => $caseTypeId,
                'case_sub_type_id' => $caseSubTypeId,
                'client_capacity' => 'مدعى',
                'created_by' => $user->id,
                'updated_by' => $user->id,
                'updated_at' => now()->subMinutes(60 - $i),
                'created_at' => now()->subMinutes(60 - $i),
            ]);
        }

        $response = $this->getJson('/api/v1/legcases');

        $response->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('message', 'Fetched latest 50 LegCases')
            ->assertJsonCount(50, 'data.data');
    }

    public function test_legcases_endpoint_caches_response(): void
    {
        $user = User::factory()->create();
        $this->withoutMiddleware(PermissionGuardMiddleware::class);
        $this->actingAs($user, 'sanctum');

        Cache::forget('leg_cases:latest:1');

        $this->getJson('/api/v1/legcases')->assertOk();

        $this->assertTrue(Cache::has('leg_cases:latest:1'));
    }
}
