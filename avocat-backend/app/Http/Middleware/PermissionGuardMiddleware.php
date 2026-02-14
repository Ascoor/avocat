<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionGuardMiddleware
{
    public function handle(Request $request, Closure $next, string ...$permissions): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthenticated.',
                'errors' => null,
            ], 401);
        }

        if ($permissions === []) {
            return $next($request);
        }

        foreach ($permissions as $permission) {
            if ($user->can($permission)) {
                return $next($request);
            }
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Forbidden.',
            'errors' => [
                'permission' => 'Missing required permission.',
            ],
        ], 403);
    }
}
