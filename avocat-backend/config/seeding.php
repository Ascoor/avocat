<?php

return [
    'primary_user' => [
        'name' => env('PRIMARY_USER_NAME'),
        'email' => env('PRIMARY_USER_EMAIL'),
        'password' => env('PRIMARY_USER_PASSWORD'),
    ],

    'super_admin' => [
        'email' => env('SUPER_ADMIN_EMAIL'),
        'password' => env('ADMIN_SEED_PASSWORD'),
    ],
];
