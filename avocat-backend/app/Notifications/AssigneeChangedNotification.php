<?php

namespace App\Notifications;

class AssigneeChangedNotification
{
    /**
     * @param  array<string,mixed>  $payload
     */
    public function __construct(public array $payload)
    {
    }
}
