<?php

namespace App\Http\Middleware;

use App\Models\Client;
use App\Models\LegCase;
use App\Models\Procedure;
use App\Models\User;
use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AbacScopeMiddleware
{
    public function handle(Request $request, Closure $next, string $resource, string $action = 'view'): Response
    {
        $user = $request->user();

        if (! $user instanceof User) {
            return response()->json(['status' => 'error', 'message' => 'Unauthenticated.', 'errors' => null], 401);
        }

        if ($user->hasAnyRole(['super_admin', 'admin'])) {
            return $next($request);
        }

        if ($resource === 'cases' && $user->hasRole('assistant') && in_array($action, config('permissions.abac.assistant_restricted_case_actions', []), true)) {
            return response()->json(['status' => 'error', 'message' => 'Forbidden.', 'errors' => ['scope' => 'Assistant role cannot perform this case action.']], 403);
        }

        if ($resource === 'clients' && $action === 'sensitive') {
            $sensitivePermission = (string) config('permissions.abac.sensitive_permission', 'clients.view_sensitive');

            if (! $user->can($sensitivePermission)) {
                return response()->json(['status' => 'error', 'message' => 'Forbidden.', 'errors' => ['scope' => 'Missing sensitive data permission.']], 403);
            }
        }

        $model = $this->resolveModel($request, $resource);

        if (! $model) {
            return $next($request);
        }

        if (! $this->inOfficeScope($user, $model)) {
            return response()->json(['status' => 'error', 'message' => 'Forbidden.', 'errors' => ['scope' => 'Office scope mismatch.']], 403);
        }

        if ($user->hasRole('lawyer') && ! $this->withinLawyerScope($user, $resource, $model)) {
            return response()->json(['status' => 'error', 'message' => 'Forbidden.', 'errors' => ['scope' => 'Lawyer scope mismatch.']], 403);
        }

        return $next($request);
    }

    private function resolveModel(Request $request, string $resource): ?Model
    {
        return match ($resource) {
            'cases' => $request->route('legal_case') ?? $request->route('legCase') ?? $request->route('case_id'),
            'procedures' => $request->route('procedure') ?? $request->route('id'),
            'clients' => $request->route('client') ?? $request->route('clientId'),
            default => null,
        };
    }

    private function inOfficeScope(User $user, Model $model): bool
    {
        if (! isset($user->office_id) || ! isset($model->office_id)) {
            return true;
        }

        return (int) $user->office_id === (int) $model->office_id;
    }

    private function withinLawyerScope(User $user, string $resource, Model $model): bool
    {
        if ($resource === 'cases' && $model instanceof LegCase) {
            return $model->created_by === $user->id
                || $model->lawyers()->where('user_id', $user->id)->exists();
        }

        if ($resource === 'procedures' && $model instanceof Procedure) {
            return $model->created_by === $user->id
                || $model->lawyer()->where('user_id', $user->id)->exists()
                || ($model->legCase && $model->legCase->lawyers()->where('user_id', $user->id)->exists());
        }

        if ($resource === 'clients' && $model instanceof Client) {
            return $model->legCases()->whereHas('lawyers', fn ($query) => $query->where('user_id', $user->id))->exists();
        }

        return true;
    }
}
