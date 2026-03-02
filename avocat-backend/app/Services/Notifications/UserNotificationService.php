<?php

namespace App\Services\Notifications;

use App\Models\Notification;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserNotificationService
{
    public function listForUser(int|string $userId, array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        return Notification::query()
            ->where('user_id', $userId)
            ->when(isset($filters['state']), function ($query) use ($filters) {
                return match ($filters['state']) {
                    'read' => $query->where('read', true),
                    'unread' => $query->where('read', false),
                    default => $query,
                };
            })
            ->when(isset($filters['type']), fn ($query) => $query->where('type', $filters['type']))
            ->when(isset($filters['entity_type']), fn ($query) => $query->where('entity_type', $filters['entity_type']))
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }

    public function markAsRead(int|string $userId, int $notificationId): void
    {
        Notification::query()
            ->where('user_id', $userId)
            ->findOrFail($notificationId)
            ->update(['read' => true]);
    }

    public function markAllAsRead(int|string $userId): void
    {
        Notification::query()
            ->where('user_id', $userId)
            ->where('read', false)
            ->update(['read' => true]);
    }

    public function unreadCount(int|string $userId): int
    {
        return Notification::query()
            ->where('user_id', $userId)
            ->where('read', false)
            ->count();
    }
}

