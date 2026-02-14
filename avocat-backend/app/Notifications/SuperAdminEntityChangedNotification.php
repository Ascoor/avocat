<?php

namespace App\Notifications;

class SuperAdminEntityChangedNotification
{
    /**
     * @param  array<string,mixed>  $payload
     */
    public function __construct(public array $payload)
    {
    }
}
