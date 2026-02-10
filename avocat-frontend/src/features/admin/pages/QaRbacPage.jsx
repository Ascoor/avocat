import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { rbacClient } from '@shared/api/rbac/client';
import { useSecurity } from '@shared/security/SecurityContext';
import { permissionMap } from '@shared/security/permission-map';
import { canCrud } from '@shared/security/permissions';
import { Link } from 'react-router-dom';

const QaRbacPage = () => {
  const { t } = useLanguage();
  const { user, roles, permissions, refreshMe } = useSecurity();
  const [users, setUsers] = useState([]);

  useEffect(() => { rbacClient.users.list().then(setUsers); }, []);

  const matrix = useMemo(() => Object.keys(permissionMap).map((module) => ({ module, acl: canCrud(permissions, module) })), [permissions]);

  return (
    <div className="p-6 mt-12 space-y-4">
      <h2 className="text-xl font-bold">{t('rbac.qa.title')}</h2>
      <div className="rounded border p-3">
        <label className="text-sm">{t('rbac.qa.switchUser')}</label>
        <select className="mt-2 w-full rounded border p-2" value={user?.id || ''} onChange={async (e) => { await rbacClient.setCurrentUser(e.target.value); await refreshMe(); }}>
          {users.map((u) => <option key={u.id} value={u.id}>{u.email}</option>)}
        </select>
        <p className="mt-2 text-sm">roles: {roles.map((r) => r.name).join(', ')} | permissions: {permissions.length}</p>
      </div>
      <div className="rounded border p-3 overflow-x-auto">
        <table className="w-full text-sm"><thead><tr><th>Module</th><th>V</th><th>C</th><th>U</th><th>D</th></tr></thead><tbody>{matrix.map((row) => <tr key={row.module}><td>{row.module}</td><td>{row.acl.view ? 'Pass' : 'Fail'}</td><td>{row.acl.create ? 'Pass' : 'Fail'}</td><td>{row.acl.update ? 'Pass' : 'Fail'}</td><td>{row.acl.delete ? 'Pass' : 'Fail'}</td></tr>)}</tbody></table>
      </div>
      <div className="flex flex-wrap gap-2">{[
        ['/dashboard/legcases', 'legal cases'],
        ['/dashboard/clients', 'clients'],
        ['/dashboard/legal-sessions', 'sessions'],
        ['/dashboard/managment-settings/procedures', 'procedures'],
        ['/dashboard/court-search', 'courts'],
      ].map(([path, label]) => <Link key={path} className="rounded border px-3 py-1" to={path}>{label}</Link>)}</div>
    </div>
  );
};

export default QaRbacPage;
