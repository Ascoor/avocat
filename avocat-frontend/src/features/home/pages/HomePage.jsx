import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Scale,
  FileText,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Zap,
  Eye,
  Clock,
  CheckCircle2,
  RefreshCw,
  Target,
  ArrowUp,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@shared/contexts/LanguageContext';
import ServiceCard from '../components/ServiceCard';
import IndustryCard from '../components/IndustryCard';
import TeamCard from '../components/TeamCard';
import ArticleCard from '../components/ArticleCard';
import CTABlock from '../components/CTABlock';
import HomeFooter from '../components/HomeFooter';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import hero1 from '@/assets/images/hero-1.png';
import hero2 from '@/assets/images/hero-2.png';
import hero3 from '@/assets/images/hero-3.png';
import hero4 from '@/assets/images/hero-4.png';
import {OfficeBuild} from '@/assets/images';
import { useTheme } from '@/shared/contexts/ThemeContext';
import SectionHeading from '../components/SectionHeading';
import HomeHeader from '../components/HomeHeader';
import { services, industries, teamMembers, articles } from '../content/siteData';
import { scrollToSection, smoothScrollTo } from '../utils/smoothScroll';
import { usePageMeta } from '../hooks/usePageMeta';
import { pageMetaContent, officeInfo } from '../content/publicPages';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const heroImages = [hero1, hero2, hero3, hero4];

const HomePage = () => {
  const { t, isRTL, language } = useLanguage();
  const { theme } = useTheme();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const isEnglish = language === 'en';
  const homeMeta = pageMetaContent.home[isEnglish ? 'en' : 'ar'];
  const contactMeta = officeInfo[isEnglish ? 'en' : 'ar'];
  usePageMeta({ title: homeMeta.title, description: homeMeta.description });

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  const trustItems = useMemo(
    () => [
      { icon: Scale, key: 'consultation' },
      { icon: FileText, key: 'contracts' },
      { icon: Shield, key: 'litigation' },
      { icon: Briefcase, key: 'management' },
      { icon: Eye, key: 'followup' },
    ],
    [],
  );

  const whyCards = useMemo(
    () => [
      { icon: Shield, key: '1' },
      { icon: Zap, key: '2' },
      { icon: Clock, key: '3' },
      { icon: Eye, key: '4' },
    ],
    [],
  );

  const processSteps = useMemo(
    () => [
      { icon: Target, key: '1' },
      { icon: FileText, key: '2' },
      { icon: Briefcase, key: '3' },
      { icon: CheckCircle2, key: '4' },
      { icon: RefreshCw, key: '5' },
      { icon: Shield, key: '6' },
    ],
    [],
  );

  const nextSlide = useCallback(() => setCurrentSlide((p) => (p + 1) % heroImages.length), []);
  const prevSlide = useCallback(() => setCurrentSlide((p) => (p - 1 + heroImages.length) % heroImages.length), []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 460);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const timeout = setTimeout(() => scrollToSection(id), 100);
    return () => clearTimeout(timeout);
  }, [location.hash]);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: isEnglish ? 'Avocat Law Firm' : 'مكتب أفوكات للمحاماة',
    telephone: contactMeta.phone,
    email: contactMeta.email,
    address: contactMeta.address,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SchemaMarkup data={localBusinessSchema} />
      <HomeHeader />
      <main className="flex-1">
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0"
            >
              <img src={heroImages[currentSlide]} alt="" className="w-full h-full object-cover" />
            </motion.div>
          </AnimatePresence>

          <div className={`absolute inset-0 ${theme === 'dark' ? 'hero-overlay-dark' : 'hero-overlay-light'}`} />

          <div className="container relative z-10 py-32 md:py-40">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                  {t(`publicSite.hero.slides.${currentSlide + 1}.title`)}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                  {t(`publicSite.hero.slides.${currentSlide + 1}.desc`)}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/book" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-base transition-all hover:brightness-110 glow-red">
                    {t('publicSite.hero.cta.book')}
                  </Link>
                  <Link to="/services" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-medium text-base transition-all hover:bg-surface-elevated">
                    {t('publicSite.hero.cta.services')}
                    <Arrow className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-12 inset-x-0 container flex items-center justify-between">
              <div className="flex items-center gap-3">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentSlide ? 'w-10 bg-primary' : 'w-2 bg-foreground/30'
                    }`}
                    aria-label={t('publicSite.hero.slideLabel', { values: { number: i + 1 } })}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={prevSlide} aria-label={t('publicSite.hero.prevSlide')} className="p-2 rounded-lg border border-border/50 text-foreground/70 hover:text-foreground hover:bg-surface-elevated transition-colors">
                  <PrevIcon className="h-5 w-5" />
                </button>
                <button onClick={nextSlide} aria-label={t('publicSite.hero.nextSlide')} className="p-2 rounded-lg border border-border/50 text-foreground/70 hover:text-foreground hover:bg-surface-elevated transition-colors">
                  <NextIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="trust" className="border-y border-border bg-card/50">
          <div className="container py-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {trustItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-center gap-3 text-muted-foreground"
                >
                  <item.icon className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{t(`publicSite.trust.${item.key}`)}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <SectionHeading
              subtitle="من نحن"
              title="أفوكات"
              description="مكتب محاماة مصري يجمع بين الخبرة القانونية العميقة والنهج العصري في تقديم الخدمات القانونية للأفراد والشركات."
            />
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-card/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">قصتنا</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  تأسس مكتب أفوكات للمحاماة بهدف تقديم خدمات قانونية متميزة تلبي احتياجات السوق المصري المتطور. نؤمن بأن الخدمة القانونية يجب أن تكون متاحة وواضحة ومبنية على الثقة المتبادلة.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  يجمع فريقنا بين الخبرة القانونية الراسخة والفهم العميق لاحتياجات العملاء في بيئة أعمال سريعة التغير، مما يمكننا من تقديم حلول قانونية عملية وفعالة.
                </p>
              </motion.div>
              <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
  className="aspect-video overflow-hidden rounded-xl bg-secondary"
>
  <img
    src={OfficeBuild}
    alt={isEnglish ? 'Avocat office building' : 'مبنى مكتب أفوكات'}
    className="h-full w-full object-cover"
    loading="lazy"
  />
</motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Eye, title: "رؤيتنا", text: "أن نكون المكتب القانوني الأكثر ثقة وابتكاراً في مصر، مع تقديم تجربة عملاء استثنائية تجمع بين الخبرة القانونية والتكنولوجيا الحديثة." },
                { icon: Target, title: "رسالتنا", text: "تقديم خدمات قانونية متميزة بأعلى معايير الجودة والاحترافية، مع التركيز على بناء علاقات طويلة الأمد مع عملائنا قائمة على الثقة والشفافية." },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="p-8 rounded-xl bg-card border border-border/50"
                >
                  <item.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-card/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> 
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container">
            <SectionHeading subtitle="قيمنا" title="المبادئ التي توجهنا" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "النزاهة", desc: "نلتزم بأعلى معايير الأخلاق المهنية في جميع تعاملاتنا." },
                { title: "التميز", desc: "نسعى دائماً لتقديم أفضل خدمة قانونية ممكنة لعملائنا." },
                { title: "السرية", desc: "نحافظ على سرية جميع المعلومات والبيانات المتعلقة بعملائنا." },
                { title: "الابتكار", desc: "نتبنى أحدث الأساليب والتقنيات في تقديم خدماتنا القانونية." },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">{i + 1}</span>
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{card.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        <section id="services" className="section-padding bg-surface">
          <div className="container">
            <SectionHeading subtitle={t('publicSite.services.subtitle')} title={t('publicSite.services.title')} description={t('publicSite.services.desc')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 6).map((service, i) => (
                <ServiceCard key={service.id} {...service} index={i} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/services" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                {t('publicSite.services.viewAll')}
                <Arrow className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="industries" className="section-padding">
          <div className="container">
            <SectionHeading subtitle={t('publicSite.industries.subtitle')} title={t('publicSite.industries.title')} description={t('publicSite.industries.desc')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {industries.slice(0, 6).map((ind, i) => (
                <IndustryCard key={ind.id} {...ind} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section-padding bg-surface">
          <div className="container">
            <SectionHeading subtitle={t('publicSite.process.subtitle')} title={t('publicSite.process.title')} description={t('publicSite.process.desc')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, i) => (
                <motion.div key={step.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-foreground">{t(`publicSite.process.steps.${step.key}.title`)}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`publicSite.process.steps.${step.key}.desc`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="section-padding">
          <div className="container">
            <SectionHeading subtitle={t('publicSite.team.subtitle')} title={t('publicSite.team.title')} description={t('publicSite.team.desc')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, i) => (
                <TeamCard key={member.id} {...member} index={i} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/team" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                {t('publicSite.team.viewAll')}
                <Arrow className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="insights" className="section-padding bg-surface">
          <div className="container">
            <SectionHeading subtitle={t('publicSite.insights.subtitle')} title={t('publicSite.insights.title')} description={t('publicSite.insights.desc')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {articles.map((article, i) => (
                <ArticleCard key={article.id} {...article} index={i} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/insights" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                {t('publicSite.insights.viewAll')}
                <Arrow className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="section-padding">
          <div className="container max-w-3xl">
            <SectionHeading subtitle={t('publicSite.faq.subtitle')} title={t('publicSite.faq.title')} />
            <Accordion type="single" collapsible className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5">
                  <AccordionTrigger className="text-foreground font-medium text-start hover:no-underline">
                    {t(`publicSite.faq.items.${i}.q`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t(`publicSite.faq.items.${i}.a`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="cta">
          <CTABlock title={t('publicSite.cta.title')} description={t('publicSite.cta.desc')} />
        </section>
      </main>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={() => smoothScrollTo(0)}
            aria-label={t('publicSite.backToTop')}
            className={`fixed bottom-6 z-40 h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg hover:brightness-110 transition-all ${
              isRTL ? 'right-6' : 'left-6'
            }`}
          >
            <ArrowUp className="h-5 w-5 mx-auto" />
          </motion.button>
        )}
      </AnimatePresence>

      <HomeFooter />
    </div>
  );
};

export default HomePage;
