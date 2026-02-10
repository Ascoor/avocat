import { lazy, Suspense } from 'react';
import SectionHeader from '@shared/components/common/SectionHeader';
import { ProcedureIcon } from '@assets/icons';
import { useSecurity } from '@shared/security/SecurityContext';
import { canCrud } from '@shared/security/permissions';
import ForbiddenState from '@shared/security/ForbiddenState';

const ProcedureTypes = lazy(
  () => import('../components/Procedures/ProcedureTypes'),
);
const ProcedurePlaceTypes = lazy(
  () => import('../components/Procedures/ProcedurePlaceTypes'),
);

const Procedures = () => {
  const { permissions } = useSecurity();
  const acl = canCrud(permissions, 'procedures');
  if (!acl.view) return <ForbiddenState moduleLabel="Procedures" />;

  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full">
      <SectionHeader listName="الإجراءات" icon={ProcedureIcon} />

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <Suspense fallback={<div>جار التحميل...</div>}>
            <ProcedureTypes />
          </Suspense>
        </div>
        <div className="col-span-1">
          <Suspense fallback={<div>جار التحميل...</div>}>
            <ProcedurePlaceTypes />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Procedures;
