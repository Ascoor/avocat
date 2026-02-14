<?php

namespace App\Notifications;

class UserPermissionsChangedNotification
{
    /**
     * @param  array<string,mixed>  $payload
     */
    public function __construct(public array $payload)
    {
    }
}
