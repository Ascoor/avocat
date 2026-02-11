<?php

namespace App\Services;

use App\Models\Event;
use App\Models\Lawyer;

class EventService
{
    public function createEvent(int|string $lawyerId, string $sendDate, int|string $legCaseId): Event
    {
        $lawyer = Lawyer::find($lawyerId);
        $userId = $lawyer?->user_id;

        $event = new Event();
        $event->user_id = $userId;
        $event->title = 'Legal Ads';
        $event->date = $sendDate;
        $event->description = 'Legal Ads with case ID ' . $legCaseId;
        $event->save();

        return $event;
    }
}
