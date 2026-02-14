<?php

namespace App\Policies;

use App\Models\LegalSession;
use App\Models\User;

class LegalSessionPolicy
{
    public function view(User $user, LegalSession $session): bool
    {
        return $this->hasScopedAccess($user, $session, 'sessions.view');
    }

    public function update(User $user, LegalSession $session): bool
    {
        return $this->hasScopedAccess($user, $session, 'sessions.update');
    }

    public function delete(User $user, LegalSession $session): bool
    {
        return $this->hasScopedAccess($user, $session, 'sessions.delete');
    }

    private function hasScopedAccess(User $user, LegalSession $session, string $permission): bool
    {
        if ($user->hasAnyRole(['super_admin', 'admin'])) {
            return true;
        }

        if (! $user->can($permission)) {
            return false;
        }

        if (isset($user->office_id, $session->office_id) && (int) $user->office_id !== (int) $session->office_id) {
            return false;
        }

        if (! $user->hasRole('lawyer')) {
            return true;
        }

        return optional($session->lawyer)->user_id === $user->id;
    }
}
