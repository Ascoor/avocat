<?php

namespace Tests\Feature;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class ApiConsistencyAndRoutesTest extends TestCase
{
    public function test_case_status_endpoint_uses_standard_success_envelope(): void
    {
        Cache::put('case_status:options', [
            'lblDegree' => 'درجة',
            'ddlCourtOptions' => ['محكمة 1'],
            'caseTypeOptions' => ['نوع 1'],
            'yearOptions' => ['2026'],
        ], now()->addMinutes(5));

        $response = $this->getJson('/api/v1/case-status');

        $response->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('message', 'Case status options retrieved successfully.')
            ->assertJsonPath('data.lblDegree', 'درجة');
    }

    public function test_case_and_procedure_type_resource_routes_are_not_duplicated(): void
    {
        $allRoutes = collect(Route::getRoutes()->getRoutes())
            ->map(fn ($route) => [$route->methods(), '/'.$route->uri()]);

        $caseTypesIndexCount = $allRoutes
            ->filter(fn ($route) => in_array('GET', $route[0], true) && $route[1] === '/api/v1/case_types')
            ->count();

        $procedureTypesIndexCount = $allRoutes
            ->filter(fn ($route) => in_array('GET', $route[0], true) && $route[1] === '/api/v1/procedure_types')
            ->count();

        $this->assertSame(1, $caseTypesIndexCount);
        $this->assertSame(1, $procedureTypesIndexCount);

        // smoke check one action binding
        $route = Route::getRoutes()->match(Request::create('/api/v1/case_types', 'GET'));
        $this->assertSame('App\\Http\\Controllers\\Api\\CaseTypeController@index', $route->getActionName());
    }
}
