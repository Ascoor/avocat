import React, { useState, lazy, Suspense, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaUserTie, FaUserAltSlash } from "react-icons/fa"; 
import { LexicraftIcon } from "@shared/icons/lexicraft";

import GlobalSpinner from "@shared/components/common/Spinners/GlobalSpinner";
import SectionHeader from "@shared/components/common/SectionHeader";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { cn } from "@shared/lib/utils";

const ClientList = lazy(() => import("../components/ClientsAndUnClients/clients/index.jsx"));
const UnClientList = lazy(() => import("../components/ClientsAndUnClients/unclients/index.jsx"));

const ClientUnclientList = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = useMemo(
    () => [
      { key: "clients", label: t("customerService.tabs.clients"), icon: <FaUserTie /> },
      { key: "unclients", label: t("customerService.tabs.unclients"), icon: <FaUserAltSlash /> },
    ],
    [t],
  );

  const allowedTabs = useMemo(() => tabs.map((tab) => tab.key), [tabs]);
  const initialTab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    allowedTabs.includes(initialTab) ? initialTab : "clients",
  );

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (!allowedTabs.includes(tab)) {
      setSearchParams({ tab: "clients" }, { replace: true });
      return;
    }
    setActiveTab(tab);
  }, [searchParams, setSearchParams, allowedTabs]);

  const handleTabChange = (tabKey) => {
    setSearchParams({ tab: tabKey }, { replace: true });
  };

  return (
    <div className="w-full">
      <div className="p-6">
        <SectionHeader
          sectionKey="customerService"
          title={t("navigation.customerService")}
          subtitle={t("customerService.subtitle")}
          showBack={false}
          icon={<LexicraftIcon name="client" size={20} />}
        />

        <div className="page-subtabs-strip mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
              className={cn("tab-pill", activeTab === tab.key && "is-active")}
            >
              <span className="inline-flex shrink-0 text-[15px] leading-none opacity-90 [&>svg]:block">
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
 
        <Suspense
          fallback={
            <div className="mt-8 flex justify-center">
              <GlobalSpinner />
            </div>
          }
        >
          <div className="app-panel mt-6 p-4 sm:p-6">
            {activeTab === "clients" ? <ClientList /> : <UnClientList />}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ClientUnclientList;
