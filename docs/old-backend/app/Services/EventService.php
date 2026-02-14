<?php

namespace App\Services;

use App\Models\Event;
use App\Models\Lawyer;

class EventService
{
    public function createEvent($lawyerId, $sendDate, $legCaseId)
    {
        $lawyer = Lawyer::find($lawyerId);
        $userId = $lawyer ? $lawyer->user_id : null;

        $event = new Event();
        $event->user_id = $userId;
        $event->title = 'Legal Ads';
        $event->date = $sendDate;
        $event->description = 'Legal Ads with case ID ' . $legCaseId;
        $event->save();

        return $event;
    }
}
