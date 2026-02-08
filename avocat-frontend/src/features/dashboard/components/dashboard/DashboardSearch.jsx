import React, { useState, useEffect } from 'react';
import ServicesModal from './SearchModals/ServicesModal';
import LegCasesModal from './SearchModals/LegCasesModal';
import { motion } from 'framer-motion';
import AuthSpinner from '@shared/components/common/Spinners/AuthSpinner';

const DashboardSearch = ({
  loading,
  error,
  filteredClients,
  onSearchChange,
}) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState('legCases');

  useEffect(() => {
    setSelectedClient(null);
    setActiveTab('legCases');
  }, [filteredClients]);

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      {}
      {loading && <AuthSpinner />}
      {error && <p className="text-red-500">{error}</p>}

      {}
      {filteredClients?.length === 0 && (
        <p className="text-center text-gray-500">لم يتم العثور على نتائج.</p>
      )}

      {}
      {filteredClients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <table className="w-full border-collapse overflow-hidden rounded-lg shadow-lg">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <tr className="text-md text-center">
                <th className="px-4 py-3 border-b border-indigo-400">
                  📌 رقم الموكل
                </th>
                <th className="px-4 py-3 border-b border-indigo-400">
                  👤 الاسم
                </th>
                <th className="px-4 py-3 border-b border-indigo-400">
                  📞 رقم الجوال
                </th>
                <th className="px-4 py-3 border-b border-indigo-400">
                  ⚡ الحالة
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => handleClientClick(client)}
                  className={`cursor-pointer text-center transition-all ${
                    selectedClient?.id === client.id
                      ? 'bg-green-100 dark:bg-green-900'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">
                    {client.slug}
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                    {client.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {client.phone_number || '—'}
                  </td>
                  <td className="px-4 py-3 font-bold">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        client.status === 'active'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {client.status === 'active' ? '✅ نشط' : '❌ غير نشط'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {}
      {selectedClient && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('legCases')}
              className={`px-4 py-2 rounded ${
                activeTab === 'legCases'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              القضايا
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded ${
                activeTab === 'services'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 dark:bg-gray-600'
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
