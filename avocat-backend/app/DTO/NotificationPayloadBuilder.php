<?php

namespace App\DTO;

class NotificationPayloadBuilder
{
    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public static function make(array $data): array
    {
        return [
            'type' => (string) ($data['type'] ?? 'generic'),
            'title' => (string) ($data['title'] ?? ''),
            'message' => (string) ($data['message'] ?? ''),
            'entity_type' => (string) ($data['entity_type'] ?? 'unknown'),
            'entity_id' => $data['entity_id'] ?? null,
            'action' => (string) ($data['action'] ?? 'updated'),
            'url' => (string) ($data['url'] ?? ''),
            'actor_id' => $data['actor_id'] ?? null,
            'event_uuid' => (string) ($data['event_uuid'] ?? (string) str()->uuid()),
            'meta' => (array) ($data['meta'] ?? []),
        ];
    }
}
