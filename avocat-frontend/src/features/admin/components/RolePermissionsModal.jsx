import { useEffect, useMemo, useRef, useState } from 'react';
import GlobalModal from '@shared/components/common/GlobalModal';
import { LexicraftIcon } from '@shared/icons/lexicraft';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { ALL_PERMISSION_KEYS, PERMISSIONS_CATALOG } from '@features/admin/constants/permissionsCatalog';

const toLabelKey = (permissionKey) => permissionKey.replace(/[^a-zA-Z0-9]/g, '_');

const fallbackPermissionLabel = (permissionKey) => permissionKey
  .replace(/[._]+/g, ' ')
  .replace(/\b\w/g, (char) => char.toUpperCase());

const SectionCheckbox = ({ checked, indeterminate, ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return <input ref={inputRef} type="checkbox" checked={checked} {...props} />;
};

const RolePermissionsModal = ({
  isOpen,
  onClose,
  roleName,
  defaultPermissions = [],
  onSave,
  isSaving = false,
}) => {
  const { t, isRTL } = useLanguage();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(() => new Set(defaultPermissions));

  useEffect(() => {
    if (isOpen) {
      setSelected(new Set(defaultPermissions));
      setQuery('');
    }
  }, [defaultPermissions, isOpen]);

  const queryValue = query.trim().toLowerCase();

  const filteredSections = useMemo(() => PERMISSIONS_CATALOG
    .map((section) => {
      const permissions = section.permissions.filter((permissionKey) => {
        const localized = t(`access.permissionLabels.${toLabelKey(permissionKey)}`, { fallback: fallbackPermissionLabel(permissionKey) });
        return !queryValue
          || permissionKey.toLowerCase().includes(queryValue)
          || localized.toLowerCase().includes(queryValue);
      });
      return { ...section, permissions };
    })
    .filter((section) => section.permissions.length > 0), [queryValue, t]);

  const visiblePermissionKeys = useMemo(
    () => filteredSections.flatMap((section) => section.permissions),
    [filteredSections],
  );

  const totalSelected = selected.size;

  const allVisibleChecked = visiblePermissionKeys.length > 0
    && visiblePermissionKeys.every((permissionKey) => selected.has(permissionKey));

  const visibleSelectedCount = visiblePermissionKeys.filter((permissionKey) => selected.has(permissionKey)).length;
  const allIndeterminate = visibleSelectedCount > 0 && !allVisibleChecked;

  const togglePermission = (permissionKey) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(permissionKey)) next.delete(permissionKey);
      else next.add(permissionKey);
      return next;
    });
  };

  const toggleSection = (sectionPermissions, checked) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) sectionPermissions.forEach((permissionKey) => next.add(permissionKey));
      else sectionPermissions.forEach((permissionKey) => next.delete(permissionKey));
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(ALL_PERMISSION_KEYS));
  const clearAll = () => setSelected(new Set());

  return (
    <GlobalModal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={`${t('access.permissionsModal.title')} - ${roleName}`}
      subtitle={t('access.permissionsModal.description')}
      titleIcon={<LexicraftIcon name="shield" size={16} />}
    >
      <div className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <input
            className="w-full rounded-lg border border-border p-2"
            placeholder={t('access.permissionsModal.searchPlaceholder')}
            value={query}
            aria-label={t('access.permissionsModal.searchPlaceholder')}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" className="rounded-lg border px-3 py-2 text-sm" onClick={selectAll}>
            {t('access.permissionsModal.selectAll')}
          </button>
          <button type="button" className="rounded-lg border px-3 py-2 text-sm" onClick={clearAll}>
            {t('access.permissionsModal.deselectAll')}
          </button>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm">
          <label className="inline-flex items-center gap-2 font-semibold">
            <SectionCheckbox
              checked={allVisibleChecked}
              indeterminate={allIndeterminate}
              aria-label={t('access.permissionsModal.selectAll')}
              onChange={(e) => toggleSection(visiblePermissionKeys, e.target.checked)}
            />
            {t('access.permissionsModal.selectAll')}
          </label>
          <span>{t('access.permissionsModal.totalSelected', { count: totalSelected })}</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredSections.map((section) => {
            const sectionSelected = section.permissions.filter((permissionKey) => selected.has(permissionKey)).length;
            const sectionAllChecked = section.permissions.length > 0 && sectionSelected === section.permissions.length;
            const sectionIndeterminate = sectionSelected > 0 && sectionSelected < section.permissions.length;

            return (
              <section key={section.section} className="rounded-xl border border-border/80 bg-card p-3">
                <div className="mb-3 flex items-center justify-between gap-2 border-b border-border pb-2">
                  <div>
                    <h4 className="font-semibold">{t(`access.sections.${section.section}`)}</h4>
                    <p className="text-xs text-muted-foreground">
                      {t('access.permissionsModal.selectedCount', {
                        selected: sectionSelected,
                        total: section.permissions.length,
                      })}
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs">
                    <SectionCheckbox
                      checked={sectionAllChecked}
                      indeterminate={sectionIndeterminate}
                      aria-label={`${t('access.permissionsModal.selectSection')} ${t(`access.sections.${section.section}`)}`}
                      onChange={(e) => toggleSection(section.permissions, e.target.checked)}
                    />
                    {t('access.permissionsModal.selectSection')}
                  </label>
                </div>

                <div className="max-h-64 space-y-2 overflow-auto">
                  {section.permissions.map((permissionKey) => (
                    <label key={permissionKey} className="flex items-center gap-2 rounded-lg border border-border/50 px-2 py-1.5 text-sm hover:bg-muted/40">
                      <input
                        type="checkbox"
                        checked={selected.has(permissionKey)}
                        aria-label={permissionKey}
                        onChange={() => togglePermission(permissionKey)}
                      />
                      <span>{t(`access.permissionLabels.${toLabelKey(permissionKey)}`, { fallback: fallbackPermissionLabel(permissionKey) })}</span>
                    </label>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-end gap-2 border-t border-border pt-4">
          <button type="button" className="rounded-lg border px-4 py-2" onClick={onClose} disabled={isSaving}>
            {t('common.cancel')}
          </button>
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-60"
            onClick={() => onSave(Array.from(selected))}
            disabled={isSaving}
          >
            {isSaving ? t('common.loading') : t('common.save')}
          </button>
        </div>
      </div>
    </GlobalModal>
  );
};

export default RolePermissionsModal;
