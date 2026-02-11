import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Gavel,
  Landmark,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/ui/button';
import ThemeToggle from '@shared/ui/theme-toggle';
import LanguageToggle from '@shared/ui/language-toggle';
import { useLanguage } from '@shared/contexts/LanguageContext';
import useAuth from '@features/auth/components/AuthUser';
import { cn } from '@shared/lib/utils';
import { LandingPageImg, LogoBlue } from '@assets/images';

const HomePage = () => {
  const navigate = useNavigate();
  const { language, isRTL, t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const copy = useMemo(() => {
    const content = {
      en: {
        nav: {
          login: 'Login',
          signup: 'Sign up',
        },
        hero: {
          eyebrow: 'Premium Legal Platform',
          title: 'Royal counsel for your most important matters',
          highlight: 'Avocat',
          description:
            'A refined legal experience built on trust, precision, and a client-first approach. Manage your cases, contracts, and consultations with clarity.',
          primaryCta: 'Access Portal',
          secondaryCta: 'Create Account',
          stats: [
            { value: '500+', label: 'Active Clients' },
            { value: '92%', label: 'Success Rate' },
            { value: '24/7', label: 'Dedicated Support' },
          ],
        },
        trust: {
          title: 'Trusted by leaders and enterprises',
          metrics: [
            { value: '15+', label: 'Years of Practice' },
            { value: '1200+', label: 'Resolved Cases' },
            { value: '98%', label: 'Client Retention' },
          ],
        },
        services: {
          title: 'Signature services',
          subtitle:
            'Strategic legal guidance across every stage of your business and personal matters.',
          items: [
            {
              title: 'Corporate Advisory',
              description:
                'Executive-level counsel for governance, compliance, and transactions.',
              icon: Landmark,
            },
            {
              title: 'Litigation Management',
              description:
                'Precision-driven litigation strategies with transparent reporting.',
              icon: Gavel,
            },
            {
              title: 'Private Wealth',
              description:
                'Estate planning and asset protection with full confidentiality.',
              icon: Scale,
            },
          ],
        },
        why: {
          title: 'Why Avocat',
          subtitle:
            'An elevated legal partnership designed for high-stakes decisions.',
          highlights: [
            {
              title: 'Secure-by-design',
              description:
                'Gold-standard security architecture protects every document and conversation.',
              icon: ShieldCheck,
            },
            {
              title: 'White-glove service',
              description:
                'Dedicated legal concierge ensuring swift responses and strategic clarity.',
              icon: BadgeCheck,
            },
            {
              title: 'Premium insights',
              description:
                'Data-informed reporting keeps you ahead of every legal milestone.',
              icon: Star,
            },
          ],
        },
        cta: {
          title: 'Ready to elevate your legal experience?',
          description:
            'Join the Avocat platform and connect with your legal team in minutes.',
          button: 'Start now',
        },
        footer: {
          title: 'Avocat Legal',
          description: 'Modern legal operations for discerning clients.',
          rights: 'All rights reserved.',
        },
      },
      ar: {
        nav: {
          login: 'تسجيل الدخول',
          signup: 'إنشاء حساب',
        },
        hero: {
          eyebrow: 'منصة قانونية راقية',
          title: 'استشارات ملكية لأهم قضاياك',
          highlight: 'أفوكات',
          description:
            'تجربة قانونية راقية مبنية على الثقة والدقة والتركيز على العميل. أدر قضاياك وعقودك واستشاراتك بوضوح كامل.',
          primaryCta: 'الدخول إلى البوابة',
          secondaryCta: 'إنشاء حساب',
          stats: [
            { value: '+٥٠٠', label: 'عميل نشط' },
            { value: '%٩٢', label: 'نسبة نجاح' },
            { value: '٢٤/٧', label: 'دعم متواصل' },
          ],
        },
        trust: {
          title: 'ثقة النخبة والشركات الرائدة',
          metrics: [
            { value: '+١٥', label: 'عام خبرة' },
            { value: '+١٢٠٠', label: 'قضية منجزة' },
            { value: '%٩٨', label: 'ولاء العملاء' },
          ],
        },
        services: {
          title: 'خدماتنا الأساسية',
          subtitle:
            'إرشاد قانوني استراتيجي في جميع مراحل أعمالك وشؤونك الخاصة.',
          items: [
            {
              title: 'استشارات الشركات',
              description: 'إرشاد تنفيذي للحوكمة والامتثال والصفقات.',
              icon: Landmark,
            },
            {
              title: 'إدارة التقاضي',
              description: 'خطط تقاضٍ دقيقة مع تقارير واضحة ومستمرة.',
              icon: Gavel,
            },
            {
              title: 'الثروات الخاصة',
              description: 'تخطيط الإرث وحماية الأصول بسرية تامة.',
              icon: Scale,
            },
          ],
        },
        why: {
          title: 'لماذا أفوكات',
          subtitle: 'شراكة قانونية راقية للقرارات المصيرية.',
          highlights: [
            {
              title: 'أمان متكامل',
              description: 'بنية أمنية ذهبية تحمي كل ملف وكل محادثة.',
              icon: ShieldCheck,
            },
            {
              title: 'خدمة نخبوية',
              description:
                'مستشار قانوني مخصص يضمن سرعة الاستجابة ووضوح الرؤية.',
              icon: BadgeCheck,
            },
            {
              title: 'رؤى متقدمة',
              description: 'تقارير ذكية تبقيك متقدماً في كل خطوة قانونية.',
              icon: Star,
            },
          ],
        },
        cta: {
          title: 'جاهز للانطلاق بتجربتك القانونية؟',
          description:
            'انضم إلى منصة أفوكات وتواصل مع فريقك القانوني خلال دقائق.',
          button: 'ابدأ الآن',
        },
        footer: {
          title: 'أفوكات للمحاماة',
          description: 'إدارة قانونية عصرية للعملاء المميزين.',
          rights: 'جميع الحقوق محفوظة.',
        },
      },
    };

    return content[language] || content.en;
  }, [language]);

  const motionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute -top-16 right-0 h-72 w-72 rounded-full bg-[hsl(var(--gold))] blur-[140px]" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[hsl(var(--primary-glow))] blur-[140px]" />
        </div>

        <div className="relative z-10">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
            <div
              className={cn(
                'flex items-center gap-3',
                isRTL && 'flex-row-reverse',
              )}
            >
              <img
                src={LogoBlue}
                alt="Avocat"
                className="h-10 w-10 rounded-full bg-white/10 p-1"
              />
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle tone="hero" />
              <LanguageToggle />
              {isAuthenticated ? (
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="hidden sm:inline-flex"
                >
                  {t('common.dashboard')}
                </Button>
              ) : (
                <>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => navigate('/login')}
                    className="hidden sm:inline-flex"
                  >
                    {copy.nav.login}
                  </Button>
                  <Button
                    variant="gold"
                    size="sm"
                    onClick={() => navigate('/signup')}
                    className="hidden sm:inline-flex"
                  >
                    {copy.nav.signup}
                  </Button>
                </>
              )}
            </div>
          </nav>

          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 pb-20 pt-6 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={motionVariants}
              className="space-y-6"
            >
              <div
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em]',
                  isRTL && 'flex-row-reverse',
                )}
              >
                <Sparkles className="h-4 w-4" />
                <span>{copy.hero.eyebrow}</span>
              </div>
              <h1
                className={cn(
                  'text-4xl font-semibold leading-tight md:text-5xl',
                  isRTL ? 'font-arabic' : 'font-display',
                )}
              >
                {copy.hero.title}
              </h1>
              <p className="text-base text-white/80 md:text-lg">
                {copy.hero.description}
              </p>
              <div
                className={cn(
                  'flex flex-col gap-3 sm:flex-row',
                  isRTL && 'sm:flex-row-reverse',
                )}
              >
                {isAuthenticated ? (
                  <Button
                    size="lg"
                    variant="premium"
                    onClick={() => navigate('/dashboard')}
                    className="w-full sm:w-auto"
                  >
                    {t('common.dashboard')}
                    <ArrowRight
                      className={cn(
                        'ml-2 h-4 w-4',
                        isRTL && 'rotate-180 mr-2 ml-0',
                      )}
                    />
                  </Button>
                ) : (
                  <>
                    <Button
                      size="lg"
                      variant="premium"
                      onClick={() => navigate('/login')}
                      className="w-full sm:w-auto"
                    >
                      {copy.hero.primaryCta}
                      <ArrowRight
                        className={cn(
                          'ml-2 h-4 w-4',
                          isRTL && 'rotate-180 mr-2 ml-0',
                        )}
                      />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate('/signup')}
                      className="w-full border-white/40 text-white hover:bg-white/10 sm:w-auto"
                    >
                      {copy.hero.secondaryCta}
                    </Button>
                  </>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 text-center text-sm">
                {copy.hero.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/15 bg-white/5 px-3 py-4"
                  >
                    <p className="text-lg font-semibold text-[hsl(var(--gold))]">
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur" />
              <img
                src={LandingPageImg}
                alt="Avocat"
                className="relative rounded-[28px] border border-white/20 object-cover shadow-custom-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 rounded-[var(--radius-xl)] border border-border bg-[hsl(var(--card))] p-8 shadow-custom-lg md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {copy.trust.title}
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
            {copy.trust.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="text-2xl font-semibold text-foreground">
                  {metric.value}
                </p>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-col gap-3">
          <h2
            className={cn(
              'text-3xl font-semibold',
              isRTL ? 'font-arabic' : 'font-display',
            )}
          >
            {copy.services.title}
          </h2>
          <p className="text-muted-foreground">{copy.services.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {copy.services.items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="card-legal p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-col gap-3">
          <h2
            className={cn(
              'text-3xl font-semibold',
              isRTL ? 'font-arabic' : 'font-display',
            )}
          >
            {copy.why.title}
          </h2>
          <p className="text-muted-foreground">{copy.why.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {copy.why.highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[var(--radius-xl)] border border-border bg-[hsl(var(--surface))] p-6 shadow-custom-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="rounded-[var(--radius-2xl)] bg-gradient-gold p-10 text-[hsl(var(--foreground))] shadow-gold">
          <div
            className={cn(
              'flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between',
              isRTL && 'md:flex-row-reverse',
            )}
          >
            <div>
              <h3
                className={cn(
                  'text-2xl font-semibold',
                  isRTL ? 'font-arabic' : 'font-display',
                )}
              >
                {copy.cta.title}
              </h3>
              <p className="mt-2 text-sm text-[hsl(var(--foreground))]/80">
                {copy.cta.description}
              </p>
            </div>
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-[hsl(var(--foreground))] text-white"
            >
              {copy.cta.button}
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-[hsl(var(--surface))]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold">{copy.footer.title}</p>
            <p className="text-xs text-muted-foreground">
              {copy.footer.description}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">{copy.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
