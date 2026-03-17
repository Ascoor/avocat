import React, { useState, lazy, Suspense, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaUserTie, FaUserAltSlash } from "react-icons/fa"; 
import { LexicraftIcon } from "@shared/icons/lexicraft";

import GlobalSpinner from "@shared/components/common/Spinners/GlobalSpinner";
import SectionHeader from "@shared/components/common/SectionHeader"; 
import { useLanguage } from "@shared/contexts/LanguageContext";

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

        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.75)] p-2 shadow-sm backdrop-blur">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
              className={[
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition",
                activeTab === tab.key
                  ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                  : "border-border/70 bg-background text-foreground hover:bg-muted",
              ].join(" ")}
            >
              {tab.icon}
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
          <div className="mt-6 rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.7)] p-4 shadow-sm backdrop-blur sm:p-6">
            {activeTab === "clients" ? <ClientList /> : <UnClientList />}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ClientUnclientList;
