<?php

namespace App\Listeners;

use App\Events\AssignmentChanged;
use App\Services\Notifications\NotificationDispatchService;
use App\Services\Notifications\NotificationRecipientResolver;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyAssigneeLawyer implements ShouldQueue
{
    public function __construct(
        private readonly NotificationRecipientResolver $resolver,
        private readonly NotificationDispatchService $dispatch,
    ) {
    }

    public function handle(AssignmentChanged $event): void
    {
        $payload = $event->payload;
        $this->dispatch->send($this->resolver->lawyerUsers($payload['meta']['new_lawyer_id'] ?? null), $payload);

        if (! empty($payload['meta']['previous_lawyer_id']) && ($payload['action'] ?? null) === 'reassigned') {
            $previousPayload = $payload;
            $previousPayload['title'] = __('notifications.assignment_removed_title');
            $previousPayload['message'] = __('notifications.assignment_removed_message', [
                'entity' => $payload['meta']['entity_label'] ?? $payload['entity_type'],
                'id' => $payload['entity_id'],
            ]);
            $previousPayload['event_uuid'] = (string) str()->uuid();

            $this->dispatch->send($this->resolver->lawyerUsers($payload['meta']['previous_lawyer_id']), $previousPayload);
        }
    }
}
