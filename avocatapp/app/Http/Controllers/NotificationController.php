<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    // NotificationController.php
public function index( $userId)
{
    // Fetch notifications for the given user ID
    $notifications = Notification::where('user_id', $userId)
                                 ->orderBy('created_at', 'desc')
                                 ->get();

    // Return as JSON response
    return response()->json($notifications);
}

public function markAsRead($notificationId) {
    $notification = Notification::find($notificationId);

    if ($notification) {
      $notification->read = true; // Assuming `read` is a boolean field in your Notification model
      $notification->save();

      return response()->json(['status' => 'success', 'message' => 'Notification marked as read']);
    } else {
      return response()->json(['status' => 'error', 'message' => 'Notification not found'], 404);
    }
  }

public function store(Request $request) {
    // Logic to create a new notification
}

}
