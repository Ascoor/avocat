<?php

namespace App\Services\Notifications;

use App\Models\Lawyer;
use App\Models\User;
use Illuminate\Support\Collection;

class NotificationRecipientResolver
{
    public function superAdmins(?int $actorId = null, bool $notifySelf = false): Collection
    {
        return User::role('super_admin')
            ->when(! $notifySelf && $actorId, fn ($query) => $query->where('id', '!=', $actorId))
            ->get();
    }

    public function affectedUser(int $userId): Collection
    {
        return User::query()->where('id', $userId)->get();
    }

    public function lawyerUsers(?int $lawyerId): Collection
    {
        if (! $lawyerId) {
            return collect();
        }

        $lawyer = Lawyer::query()->with('user')->find($lawyerId);

        if (! $lawyer?->user) {
            return collect();
        }

        return collect([$lawyer->user]);
    }
}
