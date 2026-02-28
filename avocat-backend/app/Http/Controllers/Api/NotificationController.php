<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        abort_unless($user, 401);

        $query = Notification::query()
            ->where('user_id', $user->id)
            ->when($request->filled('state'), function ($q) use ($request) {
                return match ($request->string('state')->toString()) {
                    'read' => $q->where('read', true),
                    'unread' => $q->where('read', false),
                    default => $q,
                };
            })
            ->when($request->filled('type'), fn ($q) => $q->where('type', $request->string('type')->toString()))
            ->when($request->filled('entity_type'), fn ($q) => $q->where('entity_type', $request->string('entity_type')->toString()))
            ->orderByDesc('created_at');

        return response()->json($query->paginate((int) $request->integer('per_page', 15)));
    }

    public function markRead(Request $request, int $notificationId): JsonResponse
    {
        $user = $request->user();
        abort_unless($user, 401);

        $notification = Notification::query()->where('user_id', $user->id)->findOrFail($notificationId);
        $notification->update(['read' => true]);

        return response()->json(['status' => 'success']);
    }

    public function markReadAll(Request $request): JsonResponse
    {
        $user = $request->user();
        abort_unless($user, 401);

        Notification::query()->where('user_id', $user->id)->where('read', false)->update(['read' => true]);

        return response()->json(['status' => 'success']);
    }

    public function unreadCount(Request $request): JsonResponse
    {
        $user = $request->user();
        abort_unless($user, 401);

        $count = Notification::query()->where('user_id', $user->id)->where('read', false)->count();

        return response()->json(['unread_count' => $count]);
    }
}
