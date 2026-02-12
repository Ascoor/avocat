<?php

namespace Tests\Feature;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class CaseReportingRoutesTest extends TestCase
{
    public function test_case_reporting_endpoints_are_registered(): void
    {
        $expectations = [
            ['GET', '/api/v1/cases/1', 'App\\Http\\Controllers\\Api\\CaseReportingController@show'],
            ['GET', '/api/v1/cases/1/sessions', 'App\\Http\\Controllers\\Api\\CaseReportingController@sessions'],
            ['GET', '/api/v1/cases/1/procedures', 'App\\Http\\Controllers\\Api\\CaseReportingController@procedures'],
            ['GET', '/api/v1/cases/1/clients', 'App\\Http\\Controllers\\Api\\CaseReportingController@clients'],
            ['GET', '/api/v1/cases/1/services', 'App\\Http\\Controllers\\Api\\CaseReportingController@services'],
            ['GET', '/api/v1/search', 'App\\Http\\Controllers\\Api\\CaseReportingController@search'],
        ];

        foreach ($expectations as [$method, $uri, $action]) {
            $route = Route::getRoutes()->match(Request::create($uri, $method));

            $this->assertSame($action, $route->getActionName());
            $this->assertContains('auth:sanctum', $route->gatherMiddleware());
        }
    }
}
