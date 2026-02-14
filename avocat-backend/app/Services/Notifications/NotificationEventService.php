<?php

namespace App\Services\Notifications;

use App\DTO\NotificationPayloadBuilder;
use App\Events\AssignmentChanged;
use App\Events\EntityChanged;
use App\Events\UserPermissionsChanged;

class NotificationEventService
{
    /**
     * @param  array<string,mixed>  $payload
     */
    public function entityChanged(array $payload): void
    {
        EntityChanged::dispatch(NotificationPayloadBuilder::make($payload));
    }

    /**
     * @param  array<string,mixed>  $payload
     */
    public function assignmentChanged(array $payload): void
    {
        AssignmentChanged::dispatch(NotificationPayloadBuilder::make($payload));
    }

    /**
     * @param  array<string,mixed>  $payload
     */
    public function permissionsChanged(array $payload): void
    {
        UserPermissionsChanged::dispatch(NotificationPayloadBuilder::make($payload));
    }
}
