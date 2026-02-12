import React, { useState, lazy, Suspense, useMemo } from "react";
import { FaUserTie, FaUserAltSlash } from "react-icons/fa"; 
import { LexicraftIcon } from "@shared/icons/lexicraft";

import GlobalSpinner from "@shared/components/common/Spinners/GlobalSpinner";
import SectionHeader from "@shared/components/common/SectionHeader"; 

const ClientList = lazy(() => import("../components/ClientsAndUnClients/clients/index.jsx"));
const UnClientList = lazy(() => import("../components/ClientsAndUnClients/unclients/index.jsx"));

const ClientUnclientList = () => {
  const [activeTab, setActiveTab] = useState("clients");

  const tabs = useMemo(
    () => [
      { key: "clients", label: "عملاء بوكالة", icon: <FaUserTie /> },
      { key: "unclients", label: "عملاء بدون وكالة", icon: <FaUserAltSlash /> },
    ],
    [],
  );

  return (
    <div className="w-full">
      <div className="p-6">
        <SectionHeader

          listName="العملاء"
          subtitle="إدارة العملاء حسب نوع الوكالة"
          showBack
          icon={<LexicraftIcon name="client" size={20} />}

          sticky={false}
        />
 
        <Suspense
          fallback={
            <div className="mt-8 flex justify-center">
              <GlobalSpinner />
            </div>
          }
        >
          <div className="mt-6 rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.7)] p-4 shadow-sm backdrop-blur sm:p-6">
            {activeTab === "clients" ? <ClientList /> : <UnClientList />}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ClientUnclientList;
