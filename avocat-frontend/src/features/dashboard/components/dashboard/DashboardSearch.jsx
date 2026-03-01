import React, { useState, useEffect } from 'react';
import ServicesModal from './SearchModals/ServicesModal';
import LegCasesModal from './SearchModals/LegCasesModal';
import { AnimatePresence, motion } from 'framer-motion';
import AuthSpinner from '@shared/components/common/Spinners/AuthSpinner';

const DashboardSearch = ({ loading, error, filteredClients, searchTerm }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState('legCases');
  const [expandedClients, setExpandedClients] = useState({});
  const [expandedBranches, setExpandedBranches] = useState({});

  useEffect(() => {
    setSelectedClient(null);
    setActiveTab('legCases');
    setExpandedClients({});
    setExpandedBranches({});
  }, [filteredClients]);

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  const toggleClientBranch = (clientId) => {
    setExpandedClients((prev) => ({
      ...prev,
      [clientId]: !prev[clientId],
    }));
  };

  const toggleNestedBranch = (clientId, branchKey) => {
    const key = `${clientId}-${branchKey}`;
    setExpandedBranches((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const setActiveBranch = (client, tab) => {
    setSelectedClient(client);
    setActiveTab(tab);
  };

  return (
    <div className="w-full max-w-4xl mx-auto app-panel p-4 md:p-6 rounded-2xl shadow-lg space-y-4">
      {loading && <AuthSpinner />}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && filteredClients?.length === 0 && searchTerm.trim() !== '' && (
        <p className="text-center text-muted">لم يتم العثور على نتائج.</p>
      )}

      {filteredClients.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:block w-full overflow-hidden rounded-xl border border-border bg-surface"
          >
            <table className="w-full border-collapse">
              <thead className="bg-primary text-primary-foreground">
                <tr className="text-sm text-center">
                  <th className="px-4 py-3">رقم الموكل</th>
                  <th className="px-4 py-3">الاسم</th>
                  <th className="px-4 py-3">رقم الجوال</th>
                  <th className="px-4 py-3">القضايا / الخدمات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredClients.map((client) => {
                  const isSelected = selectedClient?.id === client.id;
                  return (
                    <tr
                      key={client.id}
                      onClick={() => handleClientClick(client)}
                      className={`cursor-pointer text-center transition-colors ${
                        isSelected
                          ? 'bg-primary/15 text-foreground'
                          : 'hover:bg-muted/30'
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold">{client.slug}</td>
                      <td className="px-4 py-3">{client.name}</td>
                      <td className="px-4 py-3">{client.phone_number || '—'}</td>
                      <td className="px-4 py-3">
                        {client.leg_cases?.length || 0} / {client.services?.length || 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 md:hidden">
            {filteredClients.map((client) => {
              const isSelected = selectedClient?.id === client.id;
              return (
                <motion.button
                  key={client.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleClientClick(client)}
                  className={`text-right rounded-xl border p-4 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-surface hover:bg-muted/30'
                  }`}
                >
                  <p className="font-bold text-foreground">{client.name}</p>
                  <p className="text-sm text-muted">رقم الموكل: {client.slug}</p>
                  <p className="text-sm text-muted">الجوال: {client.phone_number || '—'}</p>
                  <p className="text-xs mt-2 text-foreground/80">
                    القضايا: {client.leg_cases?.length || 0} | الخدمات: {client.services?.length || 0}
                  </p>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-border bg-surface p-3"
          >
            <h3 className="font-semibold text-foreground mb-3">النتائج الشجرية</h3>
            <div className="space-y-2">
              {filteredClients.map((client) => {
                const clientExpanded = Boolean(expandedClients[client.id]);
                const casesKey = `${client.id}-legCases`;
                const servicesKey = `${client.id}-services`;
                const casesExpanded = Boolean(expandedBranches[casesKey]);
                const servicesExpanded = Boolean(expandedBranches[servicesKey]);

                return (
                  <div key={client.id} className="rounded-lg border border-border/80">
                    <button
                      onClick={() => {
                        toggleClientBranch(client.id);
                        handleClientClick(client);
                      }}
                      className="w-full px-3 py-2 flex items-center justify-between hover:bg-muted/30"
                    >
                      <span className="font-semibold">{client.name}</span>
                      <span className="text-xs text-muted">
                        {client.slug} {clientExpanded ? '▾' : '▸'}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {clientExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 space-y-2 border-t border-border/70">
                            <button
                              onClick={() => {
                                toggleNestedBranch(client.id, 'legCases');
                                setActiveBranch(client, 'legCases');
                              }}
                              className={`mt-2 w-full text-right rounded-md px-2 py-2 transition-colors ${
                                selectedClient?.id === client.id && activeTab === 'legCases'
                                  ? 'bg-primary/20'
                                  : 'hover:bg-muted/30'
                              }`}
                            >
                              القضايا ({client.leg_cases?.length || 0}) {casesExpanded ? '▾' : '▸'}
                            </button>
                            <AnimatePresence initial={false}>
                              {casesExpanded && (
                                <motion.ul
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="mr-4 space-y-1 text-sm text-muted"
                                >
                                  {(client.leg_cases || []).map((caseItem) => (
                                    <li key={caseItem.id}>• {caseItem.title || caseItem.slug}</li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>

                            <button
                              onClick={() => {
                                toggleNestedBranch(client.id, 'services');
                                setActiveBranch(client, 'services');
                              }}
                              className={`w-full text-right rounded-md px-2 py-2 transition-colors ${
                                selectedClient?.id === client.id && activeTab === 'services'
                                  ? 'bg-primary/20'
                                  : 'hover:bg-muted/30'
                              }`}
                            >
                              الخدمات ({client.services?.length || 0}) {servicesExpanded ? '▾' : '▸'}
                            </button>
                            <AnimatePresence initial={false}>
                              {servicesExpanded && (
                                <motion.ul
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="mr-4 space-y-1 text-sm text-muted"
                                >
                                  {(client.services || []).map((service) => (
                                    <li key={service.id}>• {service.service_type?.name || service.slug}</li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}

      {selectedClient && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mt-6 rounded-xl border border-border bg-surface p-3 md:p-4"
        >
          <div className="flex justify-center gap-2 mb-4 flex-wrap">
            <button
              onClick={() => setActiveTab('legCases')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'legCases'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/70'
              }`}
            >
              القضايا
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'services'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/70'
              }`}
            >
              الخدمات
            </button>
          </div>

          <LegCasesModal selectedClient={selectedClient} activeTab={activeTab} />
          <ServicesModal selectedClient={selectedClient} activeTab={activeTab} />
        </motion.div>
      )}
    </div>
  );
};

export default DashboardSearch;
