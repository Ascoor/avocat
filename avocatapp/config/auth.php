<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Authentication Guard
    |--------------------------------------------------------------------------
    |
    | This option controls the default authentication "guard" and password
    | reset options for your application. You may change these defaults
    | as required, but they're a perfect start for most applications.
    |
    */

    'defaults' => [
        'guard' => 'web', // The default authentication guard for web authentication.
        'passwords' => 'users', // The default password reset provider.
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Here you may define each authentication guard for your application.
    | Supported: "session", "token"
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session', // The driver for web-based authentication (typically session).
            'provider' => 'users', // The user provider for web authentication.
        ],

        'api' => [
            'driver' => 'passport',
            'provider' => 'users',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | All authentication drivers have a user provider. This defines how the
    | users are actually retrieved out of your database or other storage
    | mechanisms used by this application to persist your user's data.
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent', // The driver for user retrieval (typically Eloquent ORM).
            'model' => App\Models\User::class, // The Eloquent model for user authentication.
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    |
    | Here you may define the settings for password reset, including the
    | view that is your password reset e-mail. You may also set the
    | name of the table that maintains all of the reset tokens for
    | your application.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users', // The user provider for password reset.
            'table' => 'password_resets', // The name of the password reset tokens table.
            'expire' => 60, // The number of minutes before a reset token expires.
        ],
    ],

];
