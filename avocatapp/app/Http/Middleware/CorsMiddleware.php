<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    public function handle($request, Closure $next)
    {
        $allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5000',
            'https://search-api.ask-ar.net',
            'http://search-api.ask-ar.net',
            'http://127.0.0.1:5000',
            'http://127.0.0.1:3000',
            'https://avocat.ask-ar.net',
            'https://www.avocat.ask-ar.net'
        ];

        $origin = $request->header('Origin');

        if (in_array($origin, $allowedOrigins)) {
            $headers = [
                'Access-Control-Allow-Origin' => $origin,
                'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization, x-csrf-token, X-Requested-With',
                'Access-Control-Allow-Credentials' => 'true',
            ];

            if ($request->getMethod() === 'OPTIONS') {
                return response()->json('OK', 200, $headers); // Respond directly to OPTIONS requests
            }

            $response = $next($request);

            foreach ($headers as $key => $value) {
                $response->headers->set($key, $value);
            }

            return $response;
        }

        return $next($request); // Continue if origin is not allowed
    }
}
