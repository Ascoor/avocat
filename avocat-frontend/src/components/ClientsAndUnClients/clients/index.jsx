import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

import { fetchClients } from "../../../store/clientsSlice";
import AddEditClient from "./AddEditClient";
import TableComponent from "../../common/TableComponent";
import api from "../../../services/api/axiosConfig";
import { useAlert } from "@/contexts/AlertContext";

const ClientList = () => {
  const dispatch = useDispatch();
  const { triggerAlert } = useAlert();

  const { clients = [], loading, error } = useSelector((state) => state.clients);

  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [busyIds, setBusyIds] = useState(() => new Set()); // for toggle/delete

  const refresh = useCallback(() => dispatch(fetchClients()), [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (error) triggerAlert("error", "حدث خطأ أثناء تحميل العملاء");
  }, [error, triggerAlert]);

  const setBusy = (id, value) => {
    setBusyIds((prev) => {
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const openAddEditModal = (client = null) => {
    setSelectedClient(client);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedClient(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا العميل؟")) return;

    try {
      setBusy(id, true);
      await api.delete(`/clients/${id}`);
      triggerAlert("success", "تم حذف العميل");
      refresh();
    } catch (e) {
      triggerAlert("error", "حدث خطأ أثناء حذف العميل");
      console.error(e);
    } finally {
      setBusy(id, false);
    }
  };

  const handleToggleStatus = async (client) => {
    const id = client.id;
    const nextStatus = client.status === "active" ? "inactive" : "active";

    // Optimistic update in UI (local only, TableComponent reads from clients)
    // If your redux slice supports an action, you can dispatch it here.
    // We'll do minimal approach: call API then refresh (safe).
    try {
      setBusy(id, true);
      await api.patch(`/clients/${id}`, { status: nextStatus });
      triggerAlert("success", "تم تحديث حالة العميل");
      refresh();
    } catch (e) {
      triggerAlert("error", "تعذر تحديث الحالة");
      console.error(e);
    } finally {
      setBusy(id, false);
    }
  };

  const headers = useMemo(
    () => [
      { key: "slug", text: "الرمز" },
      { key: "name", text: "الاسم" },
      { key: "identity_number", text: "رقم الهوية" },
      { key: "address", text: "العنوان" },
      { key: "phone_number", text: "رقم الهاتف" },
      { key: "status", text: "الحالة" },
    ],
    [],
  );

  const StatusChip = ({ active, disabled }) => (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
        active
          ? "border-[hsl(var(--accent)/0.25)] bg-[hsl(var(--accent)/0.10)] text-foreground"
          : "border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-muted-foreground",
        disabled ? "opacity-60 pointer-events-none" : "cursor-pointer hover:opacity-90",
      ].join(" ")}
    >
      {active ? <AiFillCheckCircle className="opacity-80" /> : <AiFillCloseCircle className="opacity-80" />}
      {active ? "نشط" : "غير نشط"}
    </span>
  );

  const customRenderers = useMemo(
    () => ({
      status: (client) => {
        const disabled = busyIds.has(client.id);
        const active = client.status === "active";
        return (
          <button
            type="button"
            onClick={() => handleToggleStatus(client)}
            className="inline-flex"
            disabled={disabled}
            title="تغيير الحالة"
          >
            <StatusChip active={active} disabled={disabled} />
          </button>
        );
      },
    }),
    [busyIds],
  );

  const renderAddButton = () => (
    <button
      onClick={() => openAddEditModal()}
      className="rounded-xl bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow-sm transition hover:opacity-90"
    >
      إضافة عميل
    </button>
  );

  return (
    <div className="w-full p-4 sm:p-6 xl:mx-auto xl:max-w-7xl">
      {/* Modal */}
      {isModalOpen && (
        <AddEditClient
          client={selectedClient}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSaved={refresh}
        />
      )}

      {/* Table container */}
      <div className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.7)] p-4 shadow-sm backdrop-blur sm:p-6">
        <TableComponent
          data={clients}
          headers={headers}
          loading={loading} // لو TableComponent يدعم
          onEdit={(id) => openAddEditModal(clients.find((c) => c.id === id))}
          onDelete={handleDelete}
          sectionName="clients"
          customRenderers={customRenderers}
          renderAddButton={renderAddButton}
        />
      </div>
    </div>
  );
};

export default ClientList;
