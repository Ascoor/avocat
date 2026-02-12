import React, { Suspense, useState } from 'react';
import LegalCaseDataCard from './LegalCaseDataCard'; // Import the LegalCaseDataCard component
import TableSkeleton from './TableSkeleton'; // Your skeleton loader for the fallback

const LegalCaseOverview = ({ legCase, sectionsState, legcaseClients }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const sessionsCount = sectionsState?.sessions?.data?.length ?? 0;
  const proceduresCount = sectionsState?.procedures?.data?.length ?? 0;
  const adsCount = sectionsState?.ads?.data?.length ?? 0;
  const clientsCount = legcaseClients?.length ?? 0;

  return (
    <div>
      {/* Suspense for lazy-loaded data */}
      <Suspense fallback={<TableSkeleton />}>
        {activeTab === 'overview' && (
          <LegalCaseDataCard
            legalCase={legCase}
            kpiData={[
              {
                key: 'sessions',
                label: 'Sessions',
                value: sessionsCount,
                icon: 'calendar',
              },
              {
                key: 'procedures',
                label: 'Procedures',
                value: proceduresCount,
                icon: 'document',
              },
              {
                key: 'clients',
                label: 'Clients',
                value: clientsCount,
                icon: 'users',
              },
              {
                key: 'ads',
                label: 'Ads',
                value: adsCount,
                icon: 'megaphone',
              },
            ]}
            onOpenTab={(tab) => setActiveTab(tab)} // For updating the activeTab dynamically
          />
        )}
      </Suspense>
    </div>
  );
};

export default LegalCaseOverview;
