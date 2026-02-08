import React, { useState } from 'react';
import ExpenseIndex from './Expence/index';
import ClientAccounttIndex from './ClientAccount/index';

const FinancialDashboard = () => {
  const [activeTab, setActiveTab] = useState('');

  const renderContent = () => {
    switch (activeTab) {
      case 'revenue':
        return <div>الإيرادات - Add your revenue content here</div>;
      case 'expenses':
        return <ExpenseIndex />;
      case 'client':
        return <ClientAccounttIndex />;
      case 'nonClient':
        return <div>العملاء - Add your client content here</div>;
      default:
        return <div className="text-gray-500">اختر قسمًا لعرض المحتوى</div>;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div
          className={`p-4 bg-white rounded-lg shadow-md text-center cursor-pointer ${
            activeTab === 'revenue' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => setActiveTab('revenue')}
        >
          <p className="text-lg font-semibold text-gray-800">الإيرادات</p>
        </div>
        <div
          className={`p-4 bg-white rounded-lg shadow-md text-center cursor-pointer ${
            activeTab === 'expenses' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => setActiveTab('expenses')}
        >
          <p className="text-lg font-semibold text-gray-800">المصروفات</p>
        </div>
        <div
          className={`p-4 bg-white rounded-lg shadow-md text-center cursor-pointer ${
            activeTab === 'client' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => setActiveTab('client')}
        >
          <p className="text-lg font-semibold text-gray-800">العملاء</p>
        </div>
        <div
          className={`p-4 bg-white rounded-lg shadow-md text-center cursor-pointer ${
            activeTab === 'nonClient' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => setActiveTab('nonClient')}
        >
          <p className="text-lg font-semibold text-gray-800">غير العملاء</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">{renderContent()}</div>
    </div>
  );
};

export default FinancialDashboard;
