<?php

$defaultAllowedOrigins = [
    'https://avocat-frontend-bhbi-production.up.railway.app',
    'https://ask-ar.net',
    'https://www.ask-ar.net',
    'http://localhost:8080',
    'http://localhost:5173',
    'http://localhost:3000',
];

$configuredAllowedOrigins = explode(',', env('FRONTEND_URLS', implode(',', $defaultAllowedOrigins)));

$allowedOrigins = array_values(array_unique(array_filter(array_map(
    static fn ($origin) => trim($origin),
    array_merge($configuredAllowedOrigins, $defaultAllowedOrigins)
))));

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => $allowedOrigins,

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['Content-Type', 'X-Requested-With', 'Authorization', 'X-CSRF-TOKEN', 'X-XSRF-TOKEN', 'Accept'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
