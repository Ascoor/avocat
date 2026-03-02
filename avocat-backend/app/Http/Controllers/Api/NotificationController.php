<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Notifications\UserNotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function __construct(private readonly UserNotificationService $notificationService)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $user = $this->authenticatedUser($request);

        $notifications = $this->notificationService->listForUser($user->id, [
            'state' => $request->filled('state') ? $request->string('state')->toString() : null,
            'type' => $request->filled('type') ? $request->string('type')->toString() : null,
            'entity_type' => $request->filled('entity_type') ? $request->string('entity_type')->toString() : null,
        ], (int) $request->integer('per_page', 15));

        return response()->json($notifications);
    }

    public function markRead(Request $request, int $notificationId): JsonResponse
    {
        $user = $this->authenticatedUser($request);
        $this->notificationService->markAsRead($user->id, $notificationId);

        return response()->json(['status' => 'success']);
    }

    public function markReadAll(Request $request): JsonResponse
    {
        $user = $this->authenticatedUser($request);
        $this->notificationService->markAllAsRead($user->id);

        return response()->json(['status' => 'success']);
    }

    public function unreadCount(Request $request): JsonResponse
    {
        $user = $this->authenticatedUser($request);
        $count = $this->notificationService->unreadCount($user->id);

        return response()->json(['unread_count' => $count]);
    }

    private function authenticatedUser(Request $request): User
    {
        $user = $request->user();
        abort_unless($user instanceof User, 401);

        return $user;
    }
}
