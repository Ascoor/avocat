import React, { useMemo, useState, useEffect } from 'react';
import ServicesModal from './SearchModals/ServicesModal';
import LegCasesModal from './SearchModals/LegCasesModal';
import { AnimatePresence, motion } from 'framer-motion';
import AuthSpinner from '@shared/components/common/Spinners/AuthSpinner';
import { FaChevronDown, FaChevronLeft, FaFolderOpen } from 'react-icons/fa';

const DashboardSearch = ({ loading, error, filteredClients }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState('legCases');
  const [expandedClientIds, setExpandedClientIds] = useState([]);

  useEffect(() => {
    setSelectedClient(null);
    setActiveTab('legCases');
    setExpandedClientIds([]);
  }, [filteredClients]);

  const treeData = useMemo(
    () =>
      filteredClients.map((client) => ({
        ...client,
        nodes: [
          {
            key: 'legCases',
            title: 'القضايا',
            count: client.leg_cases?.length || 0,
          },
          {
            key: 'services',
            title: 'الخدمات',
            count: client.services?.length || 0,
          },
        ],
      })),
    [filteredClients],
  );

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setActiveTab('legCases');
  };

  const toggleExpandClient = (clientId) => {
    setExpandedClientIds((current) =>
      current.includes(clientId)
        ? current.filter((id) => id !== clientId)
        : [...current, clientId],
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto app-panel p-4 sm:p-6 rounded-2xl space-y-4 animate-fade-in-up">
      {loading && <AuthSpinner />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && filteredClients?.length === 0 && (
        <p className="text-center text-muted">لم يتم العثور على نتائج.</p>
      )}

      {filteredClients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
            <table className="w-full border-collapse bg-surface">
              <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                <tr className="text-sm text-center">
                  <th className="px-4 py-3">📌 رقم الموكل</th>
                  <th className="px-4 py-3">👤 الاسم</th>
                  <th className="px-4 py-3">📞 رقم الجوال</th>
                  <th className="px-4 py-3">⚡ الحالة</th>
                  <th className="px-4 py-3">🌳 النتائج</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {treeData.map((client) => {
                  const isExpanded = expandedClientIds.includes(client.id);
                  return (
                    <React.Fragment key={client.id}>
                      <tr
                        onClick={() => handleClientClick(client)}
                        className={`text-center cursor-pointer transition-all duration-200 ${
                          selectedClient?.id === client.id
                            ? 'bg-primary/10'
                            : 'hover:bg-muted/40'
                        }`}
                      >
                        <td className="px-4 py-3 font-semibold text-foreground">
                          {client.slug}
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          {client.name}
                        </td>
                        <td className="px-4 py-3 text-muted">
                          {client.phone_number || '—'}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              client.status === 'active'
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                            }`}
                          >
                            {client.status === 'active'
                              ? '✅ نشط'
                              : '❌ غير نشط'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleExpandClient(client.id);
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/70 transition"
                          >
                            {isExpanded ? <FaChevronDown /> : <FaChevronLeft />}
                            {isExpanded ? 'إخفاء' : 'عرض'}
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={5} className="p-0">
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden border-t border-border bg-muted/20"
                              >
                                <div className="p-3 flex gap-3">
                                  {client.nodes.map((node) => (
                                    <button
                                      key={node.key}
                                      type="button"
                                      onClick={() => {
                                        setActiveTab(node.key);
                                        setSelectedClient(client);
                                      }}
                                      className={`px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                                        selectedClient?.id === client.id &&
                                        activeTab === node.key
                                          ? 'bg-primary text-white'
                                          : 'bg-white hover:bg-primary/10 text-foreground'
                                      }`}
                                    >
                                      <FaFolderOpen />
                                      {node.title} ({node.count})
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-3 md:hidden">
            {treeData.map((client) => {
              const isExpanded = expandedClientIds.includes(client.id);
              return (
                <div
                  key={client.id}
                  className={`rounded-xl border border-border bg-surface p-4 transition ${
                    selectedClient?.id === client.id
                      ? 'ring-2 ring-primary/40'
                      : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleClientClick(client)}
                    className="w-full text-right"
                  >
                    <p className="font-semibold text-foreground">
                      {client.name}
                    </p>
                    <p className="text-sm text-muted">{client.slug}</p>
                    <p className="text-sm text-muted">
                      {client.phone_number || '—'}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleExpandClient(client.id)}
                    className="mt-3 text-sm px-3 py-1 rounded-lg bg-muted hover:bg-muted/70"
                  >
                    {isExpanded ? 'إخفاء التصنيف' : 'عرض التصنيف'}
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {client.nodes.map((node) => (
                            <button
                              key={node.key}
                              type="button"
                              onClick={() => {
                                setActiveTab(node.key);
                                setSelectedClient(client);
                              }}
                              className={`rounded-lg p-2 text-xs ${
                                selectedClient?.id === client.id &&
                                activeTab === node.key
                                  ? 'bg-primary text-white'
                                  : 'bg-muted text-foreground'
                              }`}
                            >
                              {node.title} ({node.count})
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {selectedClient && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mt-6 bg-muted/30 rounded-2xl border border-border p-3 sm:p-4"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <button
              onClick={() => setActiveTab('legCases')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'legCases'
                  ? 'bg-primary text-white'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              القضايا
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'services'
                  ? 'bg-primary text-white'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              الخدمات
            </button>
          </div>

          <LegCasesModal
            selectedClient={selectedClient}
            activeTab={activeTab}
          />
          <ServicesModal
            selectedClient={selectedClient}
            activeTab={activeTab}
          />
        </motion.div>
      )}
    </div>
  );
};

export default DashboardSearch;
