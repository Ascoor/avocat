<?php

namespace App\Policies;

use App\Models\LegCase;
use App\Models\User;

class LegCasePolicy
{
    public function view(User $user, LegCase $legCase): bool
    {
        return $this->hasScopedAccess($user, $legCase, 'cases.view');
    }

    public function update(User $user, LegCase $legCase): bool
    {
        return $this->hasScopedAccess($user, $legCase, 'cases.update');
    }

    public function delete(User $user, LegCase $legCase): bool
    {
        return $this->hasScopedAccess($user, $legCase, 'cases.delete');
    }

    private function hasScopedAccess(User $user, LegCase $legCase, string $permission): bool
    {
        if ($user->hasAnyRole(['super_admin', 'admin'])) {
            return true;
        }

        if (! $user->can($permission)) {
            return false;
        }

        if (isset($user->office_id, $legCase->office_id) && (int) $user->office_id !== (int) $legCase->office_id) {
            return false;
        }

        if (! $user->hasRole('lawyer')) {
            return true;
        }

        return (int) $legCase->created_by === (int) $user->id
            || $legCase->lawyers()->where('user_id', $user->id)->exists();
    }
}
