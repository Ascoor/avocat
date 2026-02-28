import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { useAlert } from '@shared/contexts/AlertContext';
import {
  createSetting,
  deleteSetting,
  getSettings,
  updateSetting,
} from '@shared/services/api/officeSettings';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@shared/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@shared/ui/alert-dialog';

const defaultFields = [
  { name: 'name_ar', labelKey: 'settings.lookups.fields.nameAr' },
  { name: 'name_en', labelKey: 'settings.lookups.fields.nameEn' },
  {
    name: 'sort_order',
    labelKey: 'settings.lookups.fields.sortOrder',
    type: 'number',
  },
  {
    name: 'is_active',
    labelKey: 'settings.lookups.fields.active',
    type: 'checkbox',
  },
];

const mapInitialForm = (fields, item) =>
  fields.reduce((acc, field) => {
    if (field.type === 'checkbox') {
      acc[field.name] = Boolean(item?.[field.name] ?? true);
      return acc;
    }
    acc[field.name] = item?.[field.name] ?? '';
    return acc;
  }, {});

const LookupManager = ({
  officeId,
  entity,
  titleKey,
  fields = defaultFields,
  allowDeactivateWhenInUse = true,
}) => {
  const { t, language } = useLanguage();
  const { triggerAlert } = useAlert();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [formState, setFormState] = useState(mapInitialForm(fields));

  const loadItems = async () => {
    if (!officeId || !entity) return;
    setLoading(true);
    try {
      const response = await getSettings(officeId, entity, { search });
      const payload = response.data?.data ?? response.data;
      const list = Array.isArray(payload) ? payload : (payload?.items ?? []);
      setItems(list);
    } catch (error) {
      triggerAlert('error', t('settings.lookups.messages.loadError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [officeId, entity]);

  const visibleItems = useMemo(() => {
    const token = search.trim().toLowerCase();
    if (!token) return items;
    return items.filter((item) => {
      const name =
        (language === 'ar' ? item.name_ar : item.name_en) ||
        item.name ||
        item.name_ar ||
        item.name_en ||
        '';
      return String(name).toLowerCase().includes(token);
    });
  }, [items, search, language]);

  const openCreate = () => {
    setEditingItem(null);
    setFormState(mapInitialForm(fields));
    setOpenForm(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormState(mapInitialForm(fields, item));
    setOpenForm(true);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingItem?.id) {
        await updateSetting(officeId, entity, editingItem.id, formState);
        triggerAlert('success', t('settings.lookups.messages.updated'));
      } else {
        await createSetting(officeId, entity, formState);
        triggerAlert('success', t('settings.lookups.messages.created'));
      }
      setOpenForm(false);
      await loadItems();
    } catch (error) {
      triggerAlert('error', t('settings.lookups.messages.saveError'));
    }
  };

  const handleDelete = async () => {
    if (!deleteCandidate?.id) return;
    try {
      await deleteSetting(officeId, entity, deleteCandidate.id);
      triggerAlert('success', t('settings.lookups.messages.deleted'));
      setDeleteCandidate(null);
      await loadItems();
    } catch (error) {
      if (allowDeactivateWhenInUse && error?.response?.status === 409) {
        await updateSetting(officeId, entity, deleteCandidate.id, {
          is_active: false,
        });
        setItems((prev) =>
          prev.map((item) =>
            item.id === deleteCandidate.id
              ? { ...item, is_active: false }
              : item,
          ),
        );
        triggerAlert('info', t('settings.lookups.messages.deactivatedInUse'));
      } else {
        triggerAlert('error', t('settings.lookups.messages.deleteError'));
      }
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">{t(titleKey)}</h2>
        <Button onClick={openCreate}>{t('common.add')}</Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t('common.search')}
          aria-label={t('common.search')}
        />
        <Button variant="outline" onClick={loadItems}>
          {t('common.search')}
        </Button>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-3 py-2 text-start">
                {t('settings.lookups.columns.name')}
              </th>
              <th className="px-3 py-2 text-start">
                {t('settings.lookups.columns.status')}
              </th>
              <th className="px-3 py-2 text-start">
                {t('settings.lookups.columns.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && visibleItems.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-3 py-4 text-center text-muted-foreground"
                >
                  {t('settings.lookups.messages.empty')}
                </td>
              </tr>
            )}
            {visibleItems.map((item) => {
              const localizedName =
                (language === 'ar' ? item.name_ar : item.name_en) ||
                item.name ||
                item.name_ar ||
                item.name_en;
              return (
                <tr key={item.id} className="border-t">
                  <td className="px-3 py-2">{localizedName}</td>
                  <td className="px-3 py-2">
                    {item.is_active === false
                      ? t('settings.lookups.status.inactive')
                      : t('settings.lookups.status.active')}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(item)}
                      >
                        {t('common.edit')}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteCandidate(item)}
                      >
                        {t('common.delete')}
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem
                ? t('settings.lookups.actions.edit')
                : t('settings.lookups.actions.add')}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-3" onSubmit={onSubmit}>
            {fields.map((field) => (
              <label key={field.name} className="block text-sm space-y-1">
                <span>{t(field.labelKey)}</span>
                {field.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    checked={Boolean(formState[field.name])}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        [field.name]: event.target.checked,
                      }))
                    }
                  />
                ) : (
                  <Input
                    type={field.type || 'text'}
                    value={formState[field.name]}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        [field.name]: event.target.value,
                      }))
                    }
                  />
                )}
              </label>
            ))}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenForm(false)}
              >
                {t('common.cancel')}
              </Button>
              <Button type="submit">{t('common.save')}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(deleteCandidate)}
        onOpenChange={() => setDeleteCandidate(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t('settings.lookups.messages.deleteConfirmTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('settings.lookups.messages.deleteConfirmDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LookupManager;
