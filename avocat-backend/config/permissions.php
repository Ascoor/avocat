<?php

return [
    'guard' => 'web',

    'catalog' => [
        'cases.view',
        'cases.list',
        'cases.search',
        'cases.create',
        'cases.update',
        'cases.delete',
        'cases.assign',
        'cases.change_status',
        'cases.close',
        'cases.reopen',

        'sessions.view',
        'sessions.list',
        'sessions.search',
        'sessions.create',
        'sessions.update',
        'sessions.delete',
        'sessions.change_status',

        'procedures.view',
        'procedures.list',
        'procedures.search',
        'procedures.create',
        'procedures.update',
        'procedures.delete',
        'procedures.change_status',

        'services.view',
        'services.list',
        'services.search',
        'services.create',
        'services.update',
        'services.delete',
        'services.change_status',

        'clients.view',
        'clients.list',
        'clients.search',
        'clients.create',
        'clients.update',
        'clients.delete',
        'clients.change_status',
        'clients.view_sensitive',

        'reports.view',
        'reports.filter',
        'reports.export',
        'reports.print',

        'courts.view',
        'courts.create',
        'courts.update',
        'courts.delete',

        'users.view',
        'users.create',
        'users.update',
        'users.delete',
        'users.assign_roles',

        'roles.view',
        'roles.create',
        'roles.update',
        'roles.delete',
        'roles.assign_permissions',

        'permissions.view',
    ],
];
