import { useEffect, useMemo, useState } from 'react';
import TableComponent from '@shared/components/common/TableComponent';
import { rbacClient } from '@shared/api/rbac/client';
import { useLanguage } from '@shared/contexts/LanguageContext';
import GlobalModal from '@shared/components/common/GlobalModal';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import { LexicraftIcon } from '@shared/icons/lexicraft';
import { useSecurity } from '@shared/security/SecurityContext';
import { canCrud } from '@shared/security/permissions';
import ForbiddenState from '@shared/security/ForbiddenState';

const emptyForm = { name: '', email: '', status: 'active', roleIds: [] };

const AdminUsersPage = () => {
  const { t } = useLanguage();
  const { permissions, refreshMe } = useSecurity();
  const acl = canCrud(permissions, 'adminUsers');
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const reload = async () => {
    const [usersRes, rolesRes] = await Promise.all([rbacClient.users.list(), rbacClient.roles.list()]);
    setUsers(usersRes);
    setRoles(rolesRes);
  };

  useEffect(() => { reload(); }, []);

  const headers = useMemo(() => [
    { key: 'name', text: t('rbac.users.name') },
    { key: 'email', text: t('rbac.users.email') },
    { key: 'status', text: t('rbac.users.status') },
    { key: 'roles', text: t('rbac.users.roles') },
  ], [t]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const openEdit = (id) => {
    const user = users.find((item) => item.id === id);
    if (!user) return;
    setEditing(user); setForm({ name: user.name, email: user.email, status: user.status, roleIds: user.roleIds }); setOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (editing) await rbacClient.users.update(editing.id, form);
    else await rbacClient.users.create(form);
    await reload();
    await refreshMe();
    setOpen(false);
  };

  if (!acl.view) return <ForbiddenState moduleLabel={t('rbac.modules.adminUsers')} />;

  return (
    <div className="p-6 mt-12">
      <TableComponent
        title={t('rbac.users.title')}
        data={users}
        headers={headers}
        onAdd={openCreate}
        onEdit={openEdit}
        onDelete={(id) => setToDelete(users.find((u) => u.id === id) || null)}
        addLabel={t('rbac.users.add')}
        permissions={acl}
        customRenderers={{
          status: (user) => user.status,
          roles: (user) => roles.filter((r) => user.roleIds.includes(r.id)).map((r) => r.name).join(', '),
        }}
      />
      <GlobalModal isOpen={open} onClose={() => setOpen(false)} title={editing ? t('rbac.users.edit') : t('rbac.users.add')} titleIcon={<LexicraftIcon name="users" size={16} />}>
        <form className="grid gap-3" onSubmit={submit}>
          <input className="rounded border p-2" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder={t('rbac.users.name')} />
          <input className="rounded border p-2" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder={t('rbac.users.email')} />
          <select className="rounded border p-2" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}>
            <option value="active">{t('rbac.users.active')}</option><option value="inactive">{t('rbac.users.inactive')}</option>
          </select>
          <select multiple className="rounded border p-2 min-h-28" value={form.roleIds} onChange={(e) => setForm((p) => ({ ...p, roleIds: Array.from(e.target.selectedOptions).map((o) => o.value) }))}>
            {roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
          </select>
          <button className="rounded bg-primary px-3 py-2 text-primary-foreground">{t('common.save')}</button>
        </form>
      </GlobalModal>
      <GlobalConfirmDeleteModal isOpen={Boolean(toDelete)} onClose={() => setToDelete(null)} itemName={toDelete?.name || ''} onConfirm={async () => { if (!toDelete) return; await rbacClient.users.delete(toDelete.id); await reload(); await refreshMe(); setToDelete(null); }} />
    </div>
  );
};

export default AdminUsersPage;
