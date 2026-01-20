<?php

namespace App\Services;

use App\Models\Notification;

class NotificationService
{
    public function createNotification($userId, $eventId, $message)
    {
        $notification = new Notification();
        $notification->user_id = $userId;
        $notification->event_id = $eventId;
        $notification->type = 'Legal Ads';
        $notification->message = $message;
        $notification->read = false;
        $notification->save();

        return $notification;
    }
}
