import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import HomeHeader from '../components/HomeHeader';
import HomeFooter from '../components/HomeFooter';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import CTABlock from '../components/CTABlock';
import { useLanguage } from '@/shared/contexts/LanguageContext';

const titleMap = {
  about: 'aboutTitle',
  services: 'servicesTitle',
  serviceDetails: 'serviceDetailsTitle',
  industries: 'industriesTitle',
  team: 'teamTitle',
  insights: 'insightsTitle',
  articleDetails: 'articleDetailsTitle',
  contact: 'contactTitle',
  book: 'bookTitle',
};

const PublicContentPage = ({ pageKey }) => {
  const { t } = useLanguage();
  const params = useParams();

  const pageTitle = t(`publicSite.pagePlaceholders.${titleMap[pageKey]}`);
  const detailSuffix = useMemo(() => {
    if (params.id) return `#${params.id}`;
    return '';
  }, [params.id]);

  return (
    <div className="min-h-screen flex flex-col">
      <HomeHeader />
      <main className="flex-1 section-padding">
        <div className="container">
          <Breadcrumbs items={[{ label: t('publicSite.nav.home'), path: '/' }, { label: pageTitle }]} />
          <SectionHeading align="start" title={`${pageTitle} ${detailSuffix}`.trim()} description={t('publicSite.pagePlaceholders.subtitle')} />
          <div className="rounded-xl border border-border bg-card p-6 text-muted-foreground">
            {t('publicSite.pagePlaceholders.subtitle')}
          </div>
        </div>
      </main>
      <CTABlock title={t('publicSite.cta.title')} description={t('publicSite.cta.desc')} />
      <HomeFooter />
    </div>
  );
};

export default PublicContentPage;
