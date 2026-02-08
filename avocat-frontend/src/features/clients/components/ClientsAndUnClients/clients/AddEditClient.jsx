import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";

import GlobalModal from "@shared/components/common/GlobalModal";
import api from "@shared/services/api/axiosConfig";
import { useAlert } from "@shared/contexts/AlertContext";

const toInputDate = (d) => {
  if (!d) return null;
  const date = new Date(d);
  return Number.isNaN(date.getTime()) ? null : date;
};

const toYYYYMMDD = (date) => {
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const fields = [
  { name: "name", label: "الاسم الكامل", type: "text", required: true },
  { name: "slug", label: "نوع العميل", type: "text", required: true },
  { name: "identity_number", label: "رقم الهوية", type: "text" },
  { name: "address", label: "العنوان", type: "text" },
  { name: "religion", label: "الديانة", type: "text" },
  { name: "nationality", label: "الجنسية", type: "text" },
  { name: "work", label: "الوظيفة", type: "text" },
  { name: "email", label: "البريد الإلكتروني", type: "email" },
  { name: "phone_number", label: "رقم الهاتف", type: "text" },
  { name: "emergency_number", label: "رقم الطوارئ", type: "text" },
];

const AddEditClient = ({ client = null, isOpen, onClose, onSaved }) => {
  const { triggerAlert } = useAlert();
  const isEdit = Boolean(client?.id);

  const initial = useMemo(
    () => ({
      slug: client?.slug ?? "",
      name: client?.name ?? "",
      gender: client?.gender ?? "",
      identity_number: client?.identity_number ?? "",
      date_of_birth: toInputDate(client?.date_of_birth) ?? new Date(),
      address: client?.address ?? "",
      religion: client?.religion ?? "",
      nationality: client?.nationality ?? "",
      work: client?.work ?? "",
      email: client?.email ?? "",
      phone_number: client?.phone_number ?? "",
      emergency_number: client?.emergency_number ?? "",
    }),
    [client],
  );

  const [formData, setFormData] = useState(initial);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData(initial);
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // minimal client payload
    const payload = {
      ...formData,
      date_of_birth: toYYYYMMDD(formData.date_of_birth),
    };

    try {
      setSaving(true);
      if (isEdit) await api.put(`/clients/${client.id}`, payload);
      else await api.post("/clients", payload);

      triggerAlert("success", "تم حفظ العميل بنجاح");
      onSaved?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      triggerAlert("error", "حدث خطأ أثناء حفظ العميل");
    } finally {
      setSaving(false);
    }
  };

  return (
    <GlobalModal isOpen={isOpen} onClose={onClose} title={isEdit ? "تعديل العميل" : "إضافة عميل"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map(({ name, label, type, required }) => (
            <div key={name} className="space-y-1">
              <label className="text-sm font-semibold text-foreground">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name] ?? ""}
                onChange={handleChange}
                required={required}
                className="w-full rounded-xl border border-border bg-[hsl(var(--background)/0.55)] px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
              />
            </div>
          ))}

          <div className="space-y-1">
            <label className="text-sm font-semibold text-foreground">تاريخ الميلاد</label>
            <DatePicker
              selected={formData.date_of_birth}
              onChange={(date) => setFormData((p) => ({ ...p, date_of_birth: date }))}
              className="w-full rounded-xl border border-border bg-[hsl(var(--background)/0.55)] px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border bg-[hsl(var(--muted))] px-4 py-2 text-sm font-semibold text-foreground transition hover:opacity-90"
          >
            إلغاء
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[hsl(var(--primary))] px-5 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow-sm transition hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "جارٍ الحفظ..." : "حفظ"}
          </button>
        </div>
      </form>
    </GlobalModal>
  );
};

export default AddEditClient;
