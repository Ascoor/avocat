import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TableComponent from '@shared/components/common/TableComponent';
import { rbacClient } from '@shared/api/rbac/client';
import { useLanguage } from '@shared/contexts/LanguageContext';
import GlobalModal from '@shared/components/common/GlobalModal';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import { LexicraftIcon } from '@shared/icons/lexicraft';
import { useSecurity } from '@shared/security/SecurityContext';
import { canCrud } from '@shared/security/permissions';
import ForbiddenState from '@shared/security/ForbiddenState';
import RolePermissionsModal from '@features/admin/components/RolePermissionsModal';

const emptyUserForm = { name: '', email: '', status: 'active', roleIds: [] };
const emptyRoleForm = { name: '', permissionNames: [] };
const SUPER_ADMIN_ROLE_NAME = 'super_admin';
const allowedTabs = ['users', 'roles', 'permissions'];

const AdminAccessManagementPage = () => {
  const { t, isRTL } = useLanguage();
  const { permissions, refreshMe } = useSecurity();
  const usersAcl = canCrud(permissions, 'adminUsers');
  const rolesAcl = canCrud(permissions, 'adminRoles');
  const permissionsAcl = canCrud(permissions, 'adminPermissions');

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = allowedTabs.includes(searchParams.get('tab')) ? searchParams.get('tab') : 'users';

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissionRows, setPermissionRows] = useState([]);

  const [userForm, setUserForm] = useState(emptyUserForm);
  const [userEditorOpen, setUserEditorOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const [roleForm, setRoleForm] = useState(emptyRoleForm);
  const [roleEditorOpen, setRoleEditorOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false);
  const [savingPermissions, setSavingPermissions] = useState(false);

  const [permissionsQuery, setPermissionsQuery] = useState('');

  const anyViewAllowed = usersAcl.view || rolesAcl.view || permissionsAcl.view;

  const tabItems = useMemo(() => [
    { key: 'users', label: t('rbac.tabs.users'), enabled: usersAcl.view },
    { key: 'roles', label: t('rbac.tabs.roles'), enabled: rolesAcl.view },
    { key: 'permissions', label: t('rbac.tabs.permissions'), enabled: permissionsAcl.view },
  ], [t, usersAcl.view, rolesAcl.view, permissionsAcl.view]);

  const firstAllowedTab = tabItems.find((tab) => tab.enabled)?.key;

  useEffect(() => {
    if (!firstAllowedTab || !anyViewAllowed) return;
    if (!allowedTabs.includes(searchParams.get('tab')) || !tabItems.find((tab) => tab.key === activeTab)?.enabled) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('tab', firstAllowedTab);
      setSearchParams(nextParams, { replace: true });
    }
  }, [activeTab, anyViewAllowed, firstAllowedTab, searchParams, setSearchParams, tabItems]);

  const reloadUsers = async () => {
    if (!usersAcl.view) {
      setUsers([]);
      return;
    }

    setUsers(await rbacClient.users.list());
  };

  const reloadRoles = async () => {
    if (!rolesAcl.view && !usersAcl.view) {
      setRoles([]);
      return;
    }

    setRoles(await rbacClient.roles.list());
  };

  const reloadPermissions = async () => {
    if (!permissionsAcl.view) {
      setPermissionRows([]);
      return;
    }

    setPermissionRows(await rbacClient.permissions.list());
  };

  useEffect(() => {
    if (usersAcl.view) reloadUsers();
    if (rolesAcl.view || usersAcl.view) reloadRoles();
    if (permissionsAcl.view) reloadPermissions();
  }, [usersAcl.view, rolesAcl.view, permissionsAcl.view]);


  const userHeaders = useMemo(() => [
    { key: 'name', text: t('rbac.users.name') },
    { key: 'email', text: t('rbac.users.email') },
    { key: 'status', text: t('rbac.users.status') },
    { key: 'roles', text: t('rbac.users.roles') },
  ], [t]);

  const roleHeaders = useMemo(() => [
    { key: 'name', text: t('rbac.roles.name') },
    { key: 'count', text: t('rbac.roles.permissionsCount') },
  ], [t]);

  const groupedPermissions = useMemo(() => {
    const q = permissionsQuery.toLowerCase();
    return permissionRows
      .filter((item) => !q || item.name.toLowerCase().includes(q))
      .reduce((acc, item) => {
        acc[item.module] ||= [];
        acc[item.module].push(item);
        return acc;
      }, {});
  }, [permissionRows, permissionsQuery]);

  const submitUser = async (e) => {
    e.preventDefault();
    if (editingUser) await rbacClient.users.update(editingUser.id, userForm);
    else await rbacClient.users.create(userForm);
    await Promise.all([reloadUsers(), reloadRoles()]);
    await refreshMe();
    setUserEditorOpen(false);
  };

  const submitRole = async (e) => {
    e.preventDefault();
    if (editingRole) await rbacClient.roles.update(editingRole.id, roleForm);
    else await rbacClient.roles.create(roleForm);
    await reloadRoles();
    await refreshMe();
    setRoleEditorOpen(false);
  };

  const saveRolePermissions = async (permissionNames) => {
    setRoleForm((prev) => ({ ...prev, permissionNames }));

    if (!editingRole?.id) {
      setPermissionsModalOpen(false);
      return;
    }

    setSavingPermissions(true);
    try {
      await rbacClient.syncRolePermissions(editingRole.id, permissionNames);
      await reloadRoles();
      await refreshMe();
      setEditingRole((prev) => (prev ? { ...prev, permissionNames } : prev));
      setPermissionsModalOpen(false);
    } finally {
      setSavingPermissions(false);
    }
  };

  if (!anyViewAllowed) return <ForbiddenState moduleLabel={t('navigation.usersPermissions')} />;

  return (
    <div className="p-6 mt-12 space-y-5">
      <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
        <h1 className="text-xl font-bold">{t('rbac.management.title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('rbac.management.subtitle')}</p>
        <nav className="mt-4 flex flex-wrap gap-2" dir={isRTL ? 'rtl' : 'ltr'}>
          {tabItems.filter((item) => item.enabled).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                const nextParams = new URLSearchParams(searchParams);
                nextParams.set('tab', tab.key);
                setSearchParams(nextParams);
              }}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                activeTab === tab.key
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] shadow-md shadow-[hsl(var(--primary)/0.1)]'
                  : 'border-border/70 bg-[hsl(var(--card)/0.65)] text-foreground hover:shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </section>

      {activeTab === 'users' && usersAcl.view && (
        <TableComponent
          title={t('rbac.users.title')}
          data={users}
          headers={userHeaders}
          onAdd={() => { setEditingUser(null); setUserForm(emptyUserForm); setUserEditorOpen(true); }}
          onEdit={(id) => {
            const user = users.find((item) => item.id === id);
            if (!user) return;
            setEditingUser(user);
            setUserForm({ name: user.name, email: user.email, status: user.status, roleIds: user.roleIds });
            setUserEditorOpen(true);
          }}
          onDelete={(id) => setUserToDelete(users.find((u) => u.id === id) || null)}
          addLabel={t('rbac.users.add')}
          permissions={usersAcl}
          customRenderers={{
            status: (user) => user.status,
            roles: (user) => roles.filter((role) => user.roleIds.includes(role.id)).map((role) => role.name).join(', '),
          }}
        />
      )}

      {activeTab === 'roles' && rolesAcl.view && (
        <TableComponent
          title={t('rbac.roles.title')}
          data={roles}
          headers={roleHeaders}
          addLabel={t('rbac.roles.add')}
          onAdd={() => { setEditingRole(null); setRoleForm(emptyRoleForm); setRoleEditorOpen(true); }}
          onEdit={(id) => {
            const role = roles.find((item) => item.id === id);
            if (!role) return;
            setEditingRole(role);
            setRoleForm({ name: role.name, permissionNames: role.permissionNames });
            setRoleEditorOpen(true);
          }}
          onDelete={(id) => setRoleToDelete(roles.find((role) => role.id === id) || null)}
          permissions={rolesAcl}
          customRenderers={{ count: (role) => role.permissionNames.length }}
        />
      )}

      {activeTab === 'permissions' && permissionsAcl.view && (
        <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
          <h2 className="text-xl font-bold mb-3">{t('rbac.permissions.title')}</h2>
          <input className="mb-4 w-full rounded border p-2" placeholder={t('common.search')} value={permissionsQuery} onChange={(e) => setPermissionsQuery(e.target.value)} />
          <div className="grid gap-4">
            {Object.entries(groupedPermissions).map(([module, perms]) => (
              <div className="rounded-xl border border-border/70 p-3" key={module}>
                <h3 className="font-semibold mb-2">{module}</h3>
                <div className="grid gap-2">
                  {perms.map((perm) => <div key={perm.name} className="text-sm">{perm.name}</div>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <GlobalModal isOpen={userEditorOpen} onClose={() => setUserEditorOpen(false)} title={editingUser ? t('rbac.users.edit') : t('rbac.users.add')} titleIcon={<LexicraftIcon name="users" size={16} />}>
        <form className="grid gap-3" onSubmit={submitUser}>
          <input className="rounded border p-2" value={userForm.name} onChange={(e) => setUserForm((prev) => ({ ...prev, name: e.target.value }))} placeholder={t('rbac.users.name')} />
          <input className="rounded border p-2" value={userForm.email} onChange={(e) => setUserForm((prev) => ({ ...prev, email: e.target.value }))} placeholder={t('rbac.users.email')} />
          <select className="rounded border p-2" value={userForm.status} onChange={(e) => setUserForm((prev) => ({ ...prev, status: e.target.value }))}>
            <option value="active">{t('rbac.users.active')}</option>
            <option value="inactive">{t('rbac.users.inactive')}</option>
          </select>
          <select multiple className="rounded border p-2 min-h-28" value={userForm.roleIds} onChange={(e) => setUserForm((prev) => ({ ...prev, roleIds: Array.from(e.target.selectedOptions).map((opt) => opt.value) }))}>
            {roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
          </select>
          <button className="rounded bg-primary px-3 py-2 text-primary-foreground">{t('common.save')}</button>
        </form>
      </GlobalModal>

      <GlobalModal isOpen={roleEditorOpen} onClose={() => setRoleEditorOpen(false)} title={editingRole ? t('rbac.roles.edit') : t('rbac.roles.add')} titleIcon={<LexicraftIcon name="shield" size={16} />}>
        <form onSubmit={submitRole} className="grid gap-3">
          <input className="rounded border p-2" value={roleForm.name} onChange={(e) => setRoleForm((prev) => ({ ...prev, name: e.target.value }))} placeholder={t('rbac.roles.name')} />
          <div className="rounded-xl border border-border/70 bg-card p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium">{t('access.permissionsModal.title')}</p>
                <p className="text-xs text-muted-foreground">{t('rbac.roles.permissionsCount')}: {roleForm.permissionNames.length}</p>
              </div>
              <button type="button" className="rounded border px-3 py-2 text-sm" onClick={() => setPermissionsModalOpen(true)}>
                {t('rbac.roles.assignPermissions')}
              </button>
            </div>
          </div>
          <button className="rounded bg-primary px-3 py-2 text-primary-foreground">{t('common.save')}</button>
        </form>
      </GlobalModal>

      <RolePermissionsModal
        isOpen={permissionsModalOpen}
        onClose={() => setPermissionsModalOpen(false)}
        roleName={editingRole?.name || roleForm.name || SUPER_ADMIN_ROLE_NAME}
        defaultPermissions={roleForm.permissionNames}
        onSave={saveRolePermissions}
        isSaving={savingPermissions}
      />

      <GlobalConfirmDeleteModal
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        itemName={userToDelete?.name || ''}
        onConfirm={async () => {
          if (!userToDelete) return;
          await rbacClient.users.delete(userToDelete.id);
          await Promise.all([reloadUsers(), reloadRoles()]);
          await refreshMe();
          setUserToDelete(null);
        }}
      />
      <GlobalConfirmDeleteModal
        isOpen={Boolean(roleToDelete)}
        onClose={() => setRoleToDelete(null)}
        itemName={roleToDelete?.name || ''}
        onConfirm={async () => {
          if (!roleToDelete) return;
          await rbacClient.roles.delete(roleToDelete.id);
          await reloadRoles();
          await refreshMe();
          setRoleToDelete(null);
        }}
      />
    </div>
  );
};

export default AdminAccessManagementPage;
