import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { rbacClient } from '@shared/api/rbac/client';
import { useSecurity } from '@shared/security/SecurityContext';
import { canCrud } from '@shared/security/permissions';
import ForbiddenState from '@shared/security/ForbiddenState';

const AdminPermissionsPage = () => {
  const { t } = useLanguage();
  const { permissions } = useSecurity();
  const acl = canCrud(permissions, 'adminPermissions');
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => { rbacClient.permissions.list().then(setRows); }, []);

  const grouped = useMemo(() => {
    const q = query.toLowerCase();
    return rows.filter((item) => !q || item.name.toLowerCase().includes(q)).reduce((acc, item) => {
      acc[item.module] ||= [];
      acc[item.module].push(item);
      return acc;
    }, {});
  }, [rows, query]);

  if (!acl.view) return <ForbiddenState moduleLabel={t('rbac.modules.adminPermissions')} />;

  return (
    <div className="p-6 mt-12">
      <h2 className="text-xl font-bold mb-3">{t('rbac.permissions.title')}</h2>
      <input className="mb-4 w-full rounded border p-2" placeholder={t('common.search')} value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="grid gap-4">
        {Object.entries(grouped).map(([module, perms]) => (
          <div className="rounded border p-3" key={module}>
            <h3 className="font-semibold mb-2">{module}</h3>
            <div className="grid gap-2">
              {perms.map((perm) => <div key={perm.name} className="text-sm">{perm.name}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPermissionsPage;
