<?php

namespace App\Services\Notifications;

use App\Models\Event;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Collection;

class NotificationDispatchService
{
    /**
     * @param  Collection<int,User>  $recipients
     * @param  array<string,mixed>  $payload
     */
    public function send(Collection $recipients, array $payload): void
    {
        foreach ($recipients as $recipient) {
            $this->sendToUser($recipient, $payload);
        }
    }

    /**
     * @param  array<string,mixed>  $payload
     */
    public function sendToUser(User $recipient, array $payload): void
    {
        $eventUuid = (string) ($payload['event_uuid'] ?? '');

        if ($eventUuid !== '' && Notification::query()->where('user_id', $recipient->id)->where('event_uuid', $eventUuid)->exists()) {
            return;
        }

        $event = Event::query()->create([
            'user_id' => $recipient->id,
            'date' => now(),
            'title' => $payload['title'],
            'description' => $payload['message'],
        ]);

        Notification::query()->create([
            'user_id' => $recipient->id,
            'event_id' => $event->id,
            'type' => $payload['type'],
            'title' => $payload['title'],
            'message' => $payload['message'],
            'entity_type' => $payload['entity_type'],
            'entity_id' => $payload['entity_id'],
            'action' => $payload['action'],
            'url' => $payload['url'],
            'actor_id' => $payload['actor_id'],
            'event_uuid' => $eventUuid ?: null,
            'meta' => $payload['meta'] ?? [],
            'read' => false,
        ]);
    }
}
