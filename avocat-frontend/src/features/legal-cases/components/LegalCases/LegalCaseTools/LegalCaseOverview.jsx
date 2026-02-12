import React, { Suspense, useState } from 'react';
import LegalCaseDataCard from './LegalCaseDataCard'; // Import the LegalCaseDataCard component
import TableSkeleton from './TableSkeleton'; // Your skeleton loader for the fallback

const LegalCaseOverview = ({ legCase, sectionsState, legcaseClients }) => {
  const [activeTab, setActiveTab] = useState('overview');

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
                value: sectionsState.sessions.data.length,
                icon: 'calendar',
              },
              {
                key: 'procedures',
                label: 'Procedures',
                value: sectionsState.procedures.data.length,
                icon: 'document',
              },
              {
                key: 'clients',
                label: 'Clients',
                value: legcaseClients.length,
                icon: 'users',
              },
              {
                key: 'ads',
                label: 'Ads',
                value: sectionsState.ads.data.length,
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
