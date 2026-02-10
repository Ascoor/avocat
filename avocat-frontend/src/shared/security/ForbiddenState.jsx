import { LexicraftIcon } from '@shared/icons/lexicraft';
import { useLanguage } from '@shared/contexts/LanguageContext';

const ForbiddenState = ({ moduleLabel }) => {
  const { t } = useLanguage();

  return (
    <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <LexicraftIcon name="lock" size={20} />
      </div>
      <h3 className="text-lg font-bold">{t('rbac.forbidden.title')}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{t('rbac.forbidden.description', { values: { module: moduleLabel } })}</p>
    </div>
  );
};

export default ForbiddenState;
