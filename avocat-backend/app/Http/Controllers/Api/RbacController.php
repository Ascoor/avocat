<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RbacController extends BaseApiController
{
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            return $this->errorResponse('Unauthenticated.', 401);
        }

        return $this->successResponse($this->serializeMe($user));
    }

    public function users(): JsonResponse
    {
        $users = User::query()->with('roles')->latest()->get();

        return $this->successResponse($users->map(fn (User $user) => $this->serializeUser($user))->all());
    }

    public function storeUser(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'status' => ['nullable', Rule::in(['active', 'inactive'])],
            'roleIds' => ['array'],
            'roleIds.*' => ['string', Rule::exists('roles', 'id')],
        ]);

        $user = User::query()->create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make(str()->random(16)),
        ]);

        $roleIds = $validated['roleIds'] ?? [];
        if ($roleIds !== []) {
            $user->syncRoles(Role::query()->whereIn('id', $roleIds)->pluck('name')->all());
        }

        $user->load('roles');

        return $this->successResponse($this->serializeUser($user), 'User created.', 201);
    }

    public function updateUser(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'status' => ['nullable', Rule::in(['active', 'inactive'])],
            'roleIds' => ['sometimes', 'array'],
            'roleIds.*' => ['string', Rule::exists('roles', 'id')],
        ]);

        $user->fill(array_filter([
            'name' => $validated['name'] ?? null,
            'email' => $validated['email'] ?? null,
        ], fn ($value) => $value !== null));
        $user->save();

        if (array_key_exists('roleIds', $validated)) {
            $roleNames = Role::query()->whereIn('id', $validated['roleIds'])->pluck('name')->all();
            $user->syncRoles($roleNames);
        }

        $user->load('roles');

        return $this->successResponse($this->serializeUser($user), 'User updated.');
    }

    public function deleteUser(User $user): JsonResponse
    {
        $user->delete();

        return $this->successResponse(null, 'User deleted.');
    }

    public function roles(): JsonResponse
    {
        $roles = Role::query()->with('permissions')->latest()->get();

        return $this->successResponse($roles->map(fn (Role $role) => $this->serializeRole($role))->all());
    }

    public function storeRole(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name'],
            'permissionNames' => ['array'],
            'permissionNames.*' => ['string', Rule::exists('permissions', 'name')],
        ]);

        $role = Role::query()->create([
            'name' => $validated['name'],
            'guard_name' => 'web',
        ]);

        $role->syncPermissions($validated['permissionNames'] ?? []);
        $role->load('permissions');

        return $this->successResponse($this->serializeRole($role), 'Role created.', 201);
    }

    public function updateRole(Request $request, Role $role): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255', Rule::unique('roles', 'name')->ignore($role->id)],
            'permissionNames' => ['sometimes', 'array'],
            'permissionNames.*' => ['string', Rule::exists('permissions', 'name')],
        ]);

        if (array_key_exists('name', $validated)) {
            $role->name = $validated['name'];
            $role->save();
        }

        if (array_key_exists('permissionNames', $validated)) {
            $role->syncPermissions($validated['permissionNames']);
        }

        $role->load('permissions');

        return $this->successResponse($this->serializeRole($role), 'Role updated.');
    }

    public function deleteRole(Role $role): JsonResponse
    {
        $role->delete();

        return $this->successResponse(null, 'Role deleted.');
    }

    public function permissions(): JsonResponse
    {
        $permissions = Permission::query()->orderBy('name')->get();

        return $this->successResponse($permissions->map(function (Permission $permission) {
            $module = (string) str($permission->name)->before('.');

            return [
                'name' => $permission->name,
                'module' => $module,
            ];
        })->all());
    }

    private function serializeMe(User $user): array
    {
        $user->loadMissing('roles.permissions');
        $permissions = $user->getAllPermissions()->pluck('name')->values()->all();

        return [
            'user' => $this->serializeUser($user),
            'roles' => $user->roles->map(fn (Role $role) => $this->serializeRole($role))->values()->all(),
            'permissions' => $permissions,
        ];
    }

    private function serializeUser(User $user): array
    {
        $user->loadMissing('roles');

        return [
            'id' => (string) $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'status' => 'active',
            'roleIds' => $user->roles->pluck('id')->map(fn ($id) => (string) $id)->values()->all(),
            'createdAt' => optional($user->created_at)?->toISOString(),
            'updatedAt' => optional($user->updated_at)?->toISOString(),
        ];
    }

    private function serializeRole(Role $role): array
    {
        $role->loadMissing('permissions');

        return [
            'id' => (string) $role->id,
            'name' => $role->name,
            'permissionNames' => $role->permissions->pluck('name')->values()->all(),
            'createdAt' => optional($role->created_at)?->toISOString(),
            'updatedAt' => optional($role->updated_at)?->toISOString(),
        ];
    }
}
