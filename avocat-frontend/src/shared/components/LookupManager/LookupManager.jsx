import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { useAlert } from '@shared/contexts/AlertContext';
import {
  createLookup,
  deleteLookup,
  getLookups,
  updateLookup,
} from '@shared/services/api/lookups';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';
import { Badge } from '@shared/ui/badge';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { Checkbox } from '@shared/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@shared/ui/dialog';

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
  fields,
  listParams = {},
  preparePayload,
  disabled = false,
  disabledMessageKey,
}) => {
  const { t, language, isRTL } = useLanguage();
  const { triggerAlert } = useAlert();

  const [items, setItems] = useState([]);
  const [relations, setRelations] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formState, setFormState] = useState(mapInitialForm(fields));

  const localizedLabel = (item) => item.name || item.name_ar || item.name_en;

  const loadItems = async () => {
    setLoading(true);
    try {
      const list = await getLookups({ entity, officeId, params: listParams });
      setItems(list);
    } catch {
      triggerAlert('error', t('settings.lookups.messages.loadError'));
    } finally {
      setLoading(false);
    }
  };

  const loadRelations = async () => {
    const relationFields = fields.filter((field) => field.type === 'entity-select');
    if (relationFields.length === 0) {
      setRelations({});
      return;
    }

    try {
      const pairs = await Promise.all(
        relationFields.map(async (field) => {
          const records = await getLookups({ entity: field.optionsEntity, officeId });
          return [field.name, records];
        }),
      );

      setRelations(Object.fromEntries(pairs));
    } catch {
      triggerAlert('error', t('settings.lookups.messages.loadError'));
    }
  };

  useEffect(() => {
    loadItems();
  }, [entity, officeId, JSON.stringify(listParams)]);

  const visibleItems = useMemo(() => {
    const token = search.trim().toLowerCase();
    if (!token) return items;
    return items.filter((item) =>
      String(localizedLabel(item) ?? '')
        .toLowerCase()
        .includes(token),
    );
  }, [items, search]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const payload = fields.reduce((acc, field) => {
      const value = formState[field.name];

      if (field.type === 'number') {
        acc[field.name] = value === '' ? null : Number(value);
      } else if (field.type === 'entity-select') {
        acc[field.name] = value === '' ? null : Number(value);
      } else {
        acc[field.name] = value;
      }

      return acc;
    }, {});

    try {
      const payload = preparePayload ? preparePayload(formState, editingItem) : formState;

      if (editingItem?.id) {
        await updateLookup({
          entity,
          officeId,
          id: editingItem.id,
          payload,
        });
      } else {
        await createLookup({ entity, officeId, payload });
      }
      triggerAlert('success', t('settings.lookups.messages.saved'));
      setOpenForm(false);
      setEditingItem(null);
      setFormState(mapInitialForm(fields));
      loadItems();
    } catch {
      triggerAlert('error', t('settings.lookups.messages.saveError'));
    }
  };

  const handleToggleActive = async (item) => {
    if (item.is_locked) {
      triggerAlert('info', t('settings.lookups.messages.locked'));
      return;
    }

    try {
      await updateLookup({
        entity,
        officeId,
        id: item.id,
        payload: {
          ...fields.reduce((acc, field) => {
            if (field.name in item) acc[field.name] = item[field.name];
            return acc;
          }, {}),
          is_active: !item.is_active,
        },
      });
      triggerAlert('success', t('settings.lookups.messages.saved'));
      loadItems();
    } catch {
      triggerAlert('error', t('settings.lookups.messages.saveError'));
    }
  };

  const handleDelete = async (item) => {
    if (item.is_locked) {
      triggerAlert('info', t('settings.lookups.messages.locked'));
      return;
    }
    try {
      await deleteLookup({ entity, officeId, id: item.id });
      triggerAlert('success', t('settings.lookups.messages.deleted'));
      loadItems();
    } catch {
      triggerAlert('error', t('settings.lookups.messages.deleteError'));
    }
  };

  const openCreate = () => {
    if (disabled) {
      return;
    }

    setEditingItem(null);
    setFormState(mapInitialForm(fields));
    setOpenForm(true);
  };

  const openEdit = (item) => {
    if (disabled) {
      return;
    }

    if (item.is_locked) {
      triggerAlert('info', t('settings.lookups.messages.locked'));
      return;
    }

    setEditingItem(item);
    setFormState(mapInitialForm(fields, item));
    setOpenForm(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle>{t(titleKey)}</CardTitle>
        <Button onClick={openCreate} disabled={disabled}>{t('settings.lookups.actions.add')}</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t('settings.lookups.searchPlaceholder')}
          aria-label={t('settings.lookups.searchPlaceholder')}
        />

        {disabled && (
          <p className="text-sm text-muted-foreground">
            {disabledMessageKey ? t(disabledMessageKey) : t('settings.lookups.messages.empty')}
          </p>
        )}

        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-sm" dir={isRTL ? 'rtl' : 'ltr'}>
            <thead className="bg-muted/40">
              <tr>
                <th className="p-3 text-start">{t('settings.lookups.columns.name')}</th>
                <th className="p-3 text-start">{t('settings.lookups.columns.scope')}</th>
                <th className="p-3 text-start">{t('settings.lookups.columns.sortOrder')}</th>
                <th className="p-3 text-start">{t('settings.lookups.columns.status')}</th>
                <th className="p-3 text-start">{t('settings.lookups.columns.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td className="p-4 text-center text-muted-foreground" colSpan={5}>
                    {t('common.loading')}
                  </td>
                </tr>
              )}
              {!loading && visibleItems.length === 0 && (
                <tr>
                  <td className="p-4 text-center text-muted-foreground" colSpan={5}>
                    {t('settings.lookups.messages.empty')}
                  </td>
                </tr>
              )}
              {visibleItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{localizedLabel(item)}</td>
                  <td className="p-3">
                    <Badge variant={item.is_system ? 'secondary' : 'outline'}>
                      {item.is_system
                        ? t('settings.lookups.scope.system')
                        : t('settings.lookups.scope.office')}
                    </Badge>
                  </td>
                  <td className="p-3">{item.sort_order ?? '-'}</td>
                  <td className="p-3">
                    {item.is_active === false
                      ? t('settings.lookups.status.inactive')
                      : t('settings.lookups.status.active')}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(item)} disabled={disabled}>
                        {t('common.edit')}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleToggleActive(item)} disabled={disabled}>
                        {item.is_active
                          ? t('settings.lookups.actions.disable')
                          : t('settings.lookups.actions.enable')}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item)}
                        disabled={item.is_locked || disabled}
                      >
                        {t('common.delete')}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem
                ? t('settings.lookups.actions.edit')
                : t('settings.lookups.actions.add')}
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-4" onSubmit={onSubmit}>
            {fields.map((field) => (
              <label key={field.name} className="block space-y-2 text-sm">
                <span>{t(field.labelKey)}</span>
                {field.type === 'checkbox' ? (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={Boolean(formState[field.name])}
                      onCheckedChange={(value) =>
                        setFormState((prev) => ({
                          ...prev,
                          [field.name]: Boolean(value),
                        }))
                      }
                    />
                  </div>
                ) : field.type === 'entity-select' ? (
                  <select
                    value={formState[field.name] ?? ''}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        [field.name]: event.target.value,
                      }))
                    }
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="">{t('common.selectOption')}</option>
                    {(relations[field.name] ?? []).map((option) => (
                      <option key={option.id} value={option.id}>
                        {localizedLabel(option)}
                      </option>
                    ))}
                  </select>
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
              <Button type="button" variant="outline" onClick={() => setOpenForm(false)}>
                {t('common.cancel')}
              </Button>
              <Button type="submit" disabled={disabled}>{t('common.save')}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default LookupManager;
