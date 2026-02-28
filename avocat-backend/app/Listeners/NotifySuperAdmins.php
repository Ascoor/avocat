<?php

namespace App\Listeners;

use App\Events\EntityChanged;
use App\Services\Notifications\NotificationDispatchService;
use App\Services\Notifications\NotificationRecipientResolver;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifySuperAdmins implements ShouldQueue
{
    public function __construct(
        private readonly NotificationRecipientResolver $resolver,
        private readonly NotificationDispatchService $dispatch,
    ) {
    }

    public function handle(EntityChanged $event): void
    {
        $payload = $event->payload;
        $recipients = $this->resolver->superAdmins(
            $payload['actor_id'] ?? null,
            (bool) ($payload['meta']['notify_self'] ?? false),
        );

        $this->dispatch->send($recipients, $payload);
    }
}
