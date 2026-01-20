import { lazy, Suspense } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import { ProcedureIcon } from '../assets/icons';

const ProcedureTypes = lazy(
  () => import('../components/Procedures/ProcedureTypes'),
);
const ProcedurePlaceTypes = lazy(
  () => import('../components/Procedures/ProcedurePlaceTypes'),
);

const Procedures = () => {
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
