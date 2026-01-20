<?php
// app/Listeners/SendEventNotification.php

namespace App\Listeners;

use App\Events\EventCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendEventNotification implements ShouldQueue
{
    public function __construct()
    {
        //
    }

    public function handle(EventCreated $event)
    {
        // Implement your logic here to send notifications or perform actions when an event is created.
    }
}
