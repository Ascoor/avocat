<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class ApiRouteActionBindingsTest extends TestCase
{
    public function test_v1_non_auth_routes_reference_existing_controller_methods(): void
    {
        $missingActions = [];

        foreach (Route::getRoutes() as $route) {
            $uri = $route->uri();
            if (!str_starts_with($uri, 'api/v1/')) {
                continue;
            }

            $actionName = $route->getActionName();
            if ($actionName === 'Closure' || !str_contains($actionName, '@')) {
                continue;
            }

            [$class, $method] = explode('@', $actionName);

            if ($class === \App\Http\Controllers\Api\AuthController::class) {
                continue;
            }

            if (! class_exists($class) || ! method_exists($class, $method)) {
                $missingActions[] = sprintf('%s -> %s@%s', $uri, $class, $method);
            }
        }

        $this->assertSame([], $missingActions, 'Missing controller methods in route bindings: '.implode('; ', $missingActions));
    }
}
