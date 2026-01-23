<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class NotificationController extends BaseApiController
{
    public function index(Request $request, int $userId)
    {
        return $this->notImplementedResponse('Notifications index endpoint not implemented yet.');
    }

    public function store(Request $request)
    {
        return $this->notImplementedResponse('Notifications store endpoint not implemented yet.');
    }

    public function markRead(Request $request, int $notificationId)
    {
        return $this->notImplementedResponse('Notifications read endpoint not implemented yet.');
    }
}
