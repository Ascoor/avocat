import React, { useState, useCallback, useEffect } from 'react';
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
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { BackgroundSvg } from '@assets/images';
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
import { useTheme } from '@/shared/contexts/ThemeContext';
import SectionHeading from '../components/SectionHeading';
import HomeHeader from '../components/HomeHeader';
import { services, industries, teamMembers, articles } from '../content/siteData';

const heroImages = [hero1, hero2, hero3, hero4];

const HomePage = () => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  const nextSlide = useCallback(() => setCurrentSlide((p) => (p + 1) % 4), []);
  const prevSlide = useCallback(() => setCurrentSlide((p) => (p - 1 + 4) % 4), []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const trustItems = [
    { icon: Scale, key: 'consultation' },
    { icon: FileText, key: 'contracts' },
    { icon: Shield, key: 'litigation' },
    { icon: Briefcase, key: 'management' },
    { icon: Eye, key: 'followup' },
  ];

  const whyCards = [
    { icon: Shield, key: '1' },
    { icon: Zap, key: '2' },
    { icon: Clock, key: '3' },
    { icon: Eye, key: '4' },
  ];

  const processSteps = [
    { icon: Target, key: '1' },
    { icon: FileText, key: '2' },
    { icon: Briefcase, key: '3' },
    { icon: CheckCircle2, key: '4' },
    { icon: RefreshCw, key: '5' },
    { icon: Shield, key: '6' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <HomeHeader />
      <main className="flex-1">
        <img
          className={`absolute z-10 top-0 max-w-[877px] ${isRTL ? "-right-20" : "-left-20"}`}
          src={BackgroundSvg}
          alt="background pattern"
        />

        <section className="relative min-h-screen flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
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
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                  {t(`publicSite.hero.slides.${currentSlide + 1}.title`)}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                  {t(`publicSite.hero.slides.${currentSlide + 1}.desc`)}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/book"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-base transition-all hover:brightness-110 glow-red"
                  >
                    {t('publicSite.hero.cta.book')}
                  </Link>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-medium text-base transition-all hover:bg-surface-elevated"
                  >
                    {t('publicSite.hero.cta.services')}
                    <Arrow className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-12 inset-x-0 container flex items-center justify-between">
              <div className="flex items-center gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentSlide ? 'w-10 bg-primary' : 'w-2 bg-foreground/30'
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={prevSlide} className="p-2 rounded-lg border border-border/50 text-foreground/70 hover:text-foreground hover:bg-surface-elevated transition-colors">
                  <PrevIcon className="h-5 w-5" />
                </button>
                <button onClick={nextSlide} className="p-2 rounded-lg border border-border/50 text-foreground/70 hover:text-foreground hover:bg-surface-elevated transition-colors">
                  <NextIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/50">
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

        <section className="section-padding">
          <div className="container">
            <SectionHeading subtitle={t('publicSite.why.subtitle')} title={t('publicSite.why.title')} description={t('publicSite.why.desc')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyCards.map((card, i) => (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:border-primary/30"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{t(`publicSite.why.items.${card.key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`publicSite.why.items.${card.key}.desc`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-surface">
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

        <section className="section-padding">
          <div className="container">
            <SectionHeading subtitle={t('publicSite.industries.subtitle')} title={t('publicSite.industries.title')} description={t('publicSite.industries.desc')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {industries.slice(0, 6).map((ind, i) => (
                <IndustryCard key={ind.id} {...ind} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-surface">
          <div className="container">
            <SectionHeading subtitle={t('publicSite.process.subtitle')} title={t('publicSite.process.title')} description={t('publicSite.process.desc')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30"
                >
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

        <section className="section-padding">
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

        <section className="section-padding bg-surface">
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

        <section className="section-padding">
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

        <CTABlock title={t('publicSite.cta.title')} description={t('publicSite.cta.desc')} />
      </main>
      <HomeFooter />
    </div>
  );
};

export default HomePage;
