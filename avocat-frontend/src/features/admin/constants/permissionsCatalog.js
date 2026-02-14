export const PERMISSIONS_CATALOG = [
  { section: 'dashboard', permissions: ['dashboard.view', 'dashboard.search'] },
  {
    section: 'legalCases',
    permissions: [
      'cases.view', 'cases.list', 'cases.search', 'cases.create', 'cases.update', 'cases.delete',
      'cases.change_status', 'cases.close', 'cases.reopen', 'cases.assign', 'cases.reassign',
      'cases.attachments_manage', 'cases.notes_manage', 'cases.audit_view',
    ],
  },
  {
    section: 'clients',
    permissions: [
      'clients.view', 'clients.list', 'clients.search', 'clients.create', 'clients.update', 'clients.delete',
      'clients.change_status', 'clients.assign', 'clients.view_sensitive',
    ],
  },
  {
    section: 'sessions',
    permissions: [
      'sessions.view', 'sessions.list', 'sessions.search', 'sessions.create', 'sessions.update', 'sessions.delete',
      'sessions.change_status', 'sessions.assign', 'sessions.print', 'sessions.audit_view',
    ],
  },
  {
    section: 'procedures',
    permissions: [
      'procedures.view', 'procedures.list', 'procedures.search', 'procedures.create', 'procedures.update', 'procedures.delete',
      'procedures.change_status', 'procedures.assign', 'procedures.print', 'procedures.audit_view',
    ],
  },
  {
    section: 'services',
    permissions: [
      'services.view', 'services.list', 'services.search', 'services.create', 'services.update', 'services.delete',
      'services.change_status', 'services.close', 'services.reopen', 'services.procedures_manage', 'services.attachments_manage',
    ],
  },
  { section: 'courts', permissions: ['courts.view', 'courts.list', 'courts.search', 'courts.create', 'courts.update', 'courts.delete'] },
  { section: 'lawyers', permissions: ['lawyers.view', 'lawyers.list', 'lawyers.search', 'lawyers.create', 'lawyers.update', 'lawyers.delete', 'lawyers.assign'] },
  { section: 'reports', permissions: ['reports.view', 'reports.filter', 'reports.export', 'reports.print', 'reports.audit_view'] },
  {
    section: 'adminUsers',
    permissions: ['users.view', 'users.list', 'users.search', 'users.create', 'users.update', 'users.delete', 'users.assign_roles', 'users.change_status'],
  },
  { section: 'adminRoles', permissions: ['roles.view', 'roles.list', 'roles.create', 'roles.update', 'roles.delete', 'roles.assign_permissions'] },
  { section: 'adminPermissions', permissions: ['permissions.view', 'permissions.list', 'permissions.search'] },
  {
    section: 'expenses',
    permissions: ['expenses.view', 'expenses.list', 'expenses.search', 'expenses.create', 'expenses.update', 'expenses.delete', 'expenses.approve', 'expenses.reject', 'expenses.export'],
  },
  { section: 'notifications', permissions: ['notifications.view_own', 'notifications.mark_read', 'notifications.send'] },
  { section: 'events', permissions: ['events.view', 'events.create'] },
  { section: 'settings', permissions: ['settings.view', 'settings.manage'] },
];

export const ALL_PERMISSION_KEYS = PERMISSIONS_CATALOG.flatMap((item) => item.permissions);
