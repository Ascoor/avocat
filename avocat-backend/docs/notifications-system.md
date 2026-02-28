# Notifications System

## Overview
This module introduces a centralized notification pipeline for key CRUD, RBAC, and assignment actions.

## Payload schema
All notifications use a unified payload:
- `type`
- `title`
- `message`
- `entity_type`
- `entity_id`
- `action`
- `url`
- `actor_id`
- `event_uuid`
- `meta`

## Events/Listeners map
- `EntityChanged` -> `NotifySuperAdmins`
- `UserPermissionsChanged` -> `NotifyAffectedUser`
- `AssignmentChanged` -> `NotifyAssigneeLawyer`

## Recipient rules
- super admins: role `super_admin` (with optional self-notify bypass)
- affected user: direct user id in payload meta
- assignee lawyer: resolve from `lawyers.user_id`

## API endpoints
- `GET /api/v1/notifications`
- `POST /api/v1/notifications/{id}/read`
- `POST /api/v1/notifications/read-all`
- `GET /api/v1/notifications/unread-count`

## Queue
Listeners implement `ShouldQueue`; run workers with:
```bash
php artisan queue:work
```

## Add new notification type
1. Build payload via `NotificationPayloadBuilder`.
2. Dispatch `NotificationEventService` event method.
3. Extend listener resolver logic if recipient rules differ.

## Security
Endpoints are restricted to authenticated users and only return/update the authenticated user notifications.

## Testing
Feature tests cover:
- case create/update super admin notifications
- RBAC permission-change notifications
- assignment notifications
- notifications APIs
