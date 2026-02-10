import { useEffect, useMemo, useState } from 'react';
import TableComponent from '@shared/components/common/TableComponent';
import { rbacClient } from '@shared/api/rbac/client';
import { useLanguage } from '@shared/contexts/LanguageContext';
import GlobalModal from '@shared/components/common/GlobalModal';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import { LexicraftIcon } from '@shared/icons/lexicraft';
import { permissionMap } from '@shared/security/permission-map';
import { useSecurity } from '@shared/security/SecurityContext';
import { canCrud } from '@shared/security/permissions';
import ForbiddenState from '@shared/security/ForbiddenState';

const AdminRolesPage = () => {
  const { t } = useLanguage();
  const { permissions, refreshMe } = useSecurity();
  const acl = canCrud(permissions, 'adminRoles');
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({ name: '', permissionNames: [] });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const reload = async () => setRoles(await rbacClient.roles.list());
  useEffect(() => { reload(); }, []);

  const allPermissions = useMemo(() => Object.values(permissionMap).flatMap((crud) => Object.values(crud)), []);
  const headers = [{ key: 'name', text: t('rbac.roles.name') }, { key: 'count', text: t('rbac.roles.permissionsCount') }];

  const openEditor = (id) => {
    const role = roles.find((item) => item.id === id);
    if (!role) return;
    setEditing(role);
    setForm({ name: role.name, permissionNames: role.permissionNames });
    setOpen(true);
  };

  const togglePermission = (permission) => {
    setForm((prev) => ({ ...prev, permissionNames: prev.permissionNames.includes(permission) ? prev.permissionNames.filter((x) => x !== permission) : [...prev.permissionNames, permission] }));
  };

  const save = async (e) => {
    e.preventDefault();
    if (editing) await rbacClient.roles.update(editing.id, form);
    else await rbacClient.roles.create(form);
    await reload();
    await refreshMe();
    setOpen(false);
  };

  if (!acl.view) return <ForbiddenState moduleLabel={t('rbac.modules.adminRoles')} />;

  return (
    <div className="p-6 mt-12">
      <TableComponent title={t('rbac.roles.title')} data={roles} headers={headers} addLabel={t('rbac.roles.add')} onAdd={() => { setEditing(null); setForm({ name: '', permissionNames: [] }); setOpen(true); }} onEdit={openEditor} onDelete={(id) => setToDelete(roles.find((role) => role.id === id))} permissions={acl} customRenderers={{ count: (role) => role.permissionNames.length }} />
      <GlobalModal isOpen={open} onClose={() => setOpen(false)} title={editing ? t('rbac.roles.edit') : t('rbac.roles.add')} titleIcon={<LexicraftIcon name="shield" size={16} />}>
        <form onSubmit={save} className="grid gap-3">
          <input className="rounded border p-2" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} placeholder={t('rbac.roles.name')} />
          <div className="max-h-72 overflow-auto rounded border p-2">
            <div className="mb-2 flex gap-2"><button type="button" className="rounded border px-2 py-1 text-xs" onClick={() => setForm((prev) => ({ ...prev, permissionNames: allPermissions }))}>{t('rbac.roles.selectAll')}</button></div>
            {Object.entries(permissionMap).map(([module, crud]) => {
              const values = Object.values(crud);
              const selectedAll = values.every((perm) => form.permissionNames.includes(perm));
              return <div key={module} className="mb-3 rounded border p-2"><div className="mb-2 flex items-center justify-between"><strong>{module}</strong><button type="button" className="text-xs underline" onClick={() => setForm((prev) => ({ ...prev, permissionNames: selectedAll ? prev.permissionNames.filter((perm) => !values.includes(perm)) : Array.from(new Set([...prev.permissionNames, ...values])) }))}>{t('rbac.roles.selectModule')}</button></div><div className="grid grid-cols-2 gap-2">{values.map((perm) => <label key={perm} className="text-xs"><input type="checkbox" checked={form.permissionNames.includes(perm)} onChange={() => togglePermission(perm)} /> {perm}</label>)}</div></div>;
            })}
          </div>
          <button className="rounded bg-primary px-3 py-2 text-primary-foreground">{t('common.save')}</button>
        </form>
      </GlobalModal>
      <GlobalConfirmDeleteModal isOpen={Boolean(toDelete)} onClose={() => setToDelete(null)} itemName={toDelete?.name || ''} onConfirm={async () => { if (!toDelete) return; await rbacClient.roles.delete(toDelete.id); await reload(); await refreshMe(); setToDelete(null); }} />
    </div>
  );
};

export default AdminRolesPage;
