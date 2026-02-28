<?php

return [
    'guard' => 'web',

    'permissions' => [
        // Dashboard
        'dashboard.view',
        'dashboard.search',

        // Cases
        'cases.view', 'cases.list', 'cases.search', 'cases.create', 'cases.update', 'cases.delete',
        'cases.assign', 'cases.reassign', 'cases.change_status', 'cases.close', 'cases.reopen',
        'cases.attachments_manage', 'cases.notes_manage', 'cases.audit_view',

        // Sessions
        'sessions.view', 'sessions.list', 'sessions.search', 'sessions.create', 'sessions.update', 'sessions.delete',
        'sessions.assign', 'sessions.change_status', 'sessions.print', 'sessions.audit_view',

        // Procedures
        'procedures.view', 'procedures.list', 'procedures.search', 'procedures.create', 'procedures.update', 'procedures.delete',
        'procedures.assign', 'procedures.change_status', 'procedures.print', 'procedures.audit_view',

        // Services
        'services.view', 'services.list', 'services.search', 'services.create', 'services.update', 'services.delete',
        'services.change_status', 'services.close', 'services.reopen',
        'services.procedures_manage', 'services.attachments_manage',

        // Clients
        'clients.view', 'clients.list', 'clients.search', 'clients.create', 'clients.update', 'clients.delete',
        'clients.assign', 'clients.change_status', 'clients.view_sensitive',

        // Reports
        'reports.view', 'reports.filter', 'reports.export', 'reports.print', 'reports.audit_view',

        // Courts & Taxonomies
        'courts.view', 'courts.list', 'courts.search', 'courts.create', 'courts.update', 'courts.delete',
        'case_types.manage', 'procedure_types.manage', 'service_types.manage', 'session_types.manage',

        // Lawyers
        'lawyers.view', 'lawyers.list', 'lawyers.search', 'lawyers.create', 'lawyers.update', 'lawyers.delete', 'lawyers.assign',

        // Admin
        'users.view', 'users.list', 'users.search', 'users.create', 'users.update', 'users.delete', 'users.assign_roles', 'users.change_status',
        'roles.view', 'roles.list', 'roles.create', 'roles.update', 'roles.delete', 'roles.assign_permissions',
        'permissions.view', 'permissions.list', 'permissions.search',

        // Settings/Profile
        'settings.view', 'settings.manage', 'officeSettings.manage', 'profile.view_own', 'profile.update_own',

        // Finance
        'expenses.view', 'expenses.list', 'expenses.search', 'expenses.create', 'expenses.update', 'expenses.delete',
        'expenses.approve', 'expenses.reject', 'expenses.export',

        // Notifications/Events
        'notifications.view_own', 'notifications.mark_read', 'notifications.send',
        'events.view', 'events.create',
    ],

    'roles' => [
        'super_admin' => ['*'],
        'admin' => ['*', '!cases.delete', '!services.delete', '!expenses.delete', '!roles.delete', '!users.delete'],
        'lawyer' => [
            'dashboard.view', 'dashboard.search',
            'cases.view', 'cases.list', 'cases.search', 'cases.update', 'cases.change_status', 'cases.notes_manage', 'cases.attachments_manage',
            'sessions.view', 'sessions.list', 'sessions.search', 'sessions.create', 'sessions.update', 'sessions.change_status', 'sessions.print',
            'procedures.view', 'procedures.list', 'procedures.search', 'procedures.create', 'procedures.update', 'procedures.change_status', 'procedures.print',
            'clients.view', 'clients.list', 'clients.search',
            'reports.view', 'reports.filter',
            'notifications.view_own', 'notifications.mark_read',
            'events.view',
            'profile.view_own', 'profile.update_own',
        ],
        'assistant' => [
            'dashboard.view', 'dashboard.search',
            'cases.view', 'cases.list', 'cases.search', 'cases.update', 'cases.notes_manage', 'cases.attachments_manage',
            'sessions.view', 'sessions.list', 'sessions.search',
            'procedures.view', 'procedures.list', 'procedures.search',
            'clients.view', 'clients.list', 'clients.search',
            'notifications.view_own', 'notifications.mark_read',
            'profile.view_own', 'profile.update_own',
        ],
        'accountant' => [
            'dashboard.view',
            'expenses.view', 'expenses.list', 'expenses.search', 'expenses.create', 'expenses.update', 'expenses.approve', 'expenses.reject', 'expenses.export',
            'reports.view', 'reports.filter', 'reports.export',
            'profile.view_own', 'profile.update_own',
        ],
        'viewer' => [
            'dashboard.view',
            'cases.view', 'cases.list', 'cases.search',
            'sessions.view', 'sessions.list',
            'procedures.view', 'procedures.list',
            'services.view', 'services.list',
            'clients.view', 'clients.list',
            'reports.view', 'reports.filter',
            'courts.view', 'courts.list', 'courts.search',
            'lawyers.view', 'lawyers.list',
            'notifications.view_own',
            'events.view',
            'profile.view_own',
        ],
    ],

    'abac' => [
        'sensitive_permission' => 'clients.view_sensitive',
        'assistant_restricted_case_actions' => ['delete', 'close'],
    ],
];
