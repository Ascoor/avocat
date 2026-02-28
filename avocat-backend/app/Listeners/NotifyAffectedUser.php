<?php

namespace App\Listeners;

use App\Events\UserPermissionsChanged;
use App\Services\Notifications\NotificationDispatchService;
use App\Services\Notifications\NotificationRecipientResolver;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyAffectedUser implements ShouldQueue
{
    public function __construct(
        private readonly NotificationRecipientResolver $resolver,
        private readonly NotificationDispatchService $dispatch,
    ) {
    }

    public function handle(UserPermissionsChanged $event): void
    {
        $payload = $event->payload;
        $recipients = $this->resolver->affectedUser((int) $payload['meta']['affected_user_id']);
        $this->dispatch->send($recipients, $payload);
    }
}
