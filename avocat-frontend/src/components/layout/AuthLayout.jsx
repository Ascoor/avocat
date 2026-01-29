import React from "react";
import { motion } from "framer-motion";
import { Scale, Shield, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const AuthLayout = ({ heroSide = "left", toolbar, hero, card }) => {
  const { direction, isRTL, t } = useLanguage();
  const shouldReverse = isRTL ? heroSide === "right" : heroSide === "left";

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div className="min-h-screen bg-background" dir={direction}>
      {toolbar && (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
          {toolbar}
        </div>
      )}

      <div className="flex min-h-screen">
        <div
          className={cn(
            "hidden lg:flex lg:w-1/2 flex-col justify-between relative overflow-hidden",
            shouldReverse && "lg:order-last"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(225,65%,12%)] via-[hsl(225,65%,18%)] to-[hsl(225,55%,22%)]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/30 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/40 blur-[100px]" />
          </div>

          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative z-10 flex flex-col justify-center h-full px-12 py-16 xl:px-16">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={0} className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-gold-light shadow-gold">
                <Scale className="w-8 h-8 text-[hsl(225,65%,12%)]" />
              </div>
            </motion.div>

            {hero.badge && (
              <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={1} className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold-light text-sm font-medium">
                  {hero.badge}
                </div>
              </motion.div>
            )}

            <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} custom={2} className={cn(
              'font-bold text-white mb-4', isRTL ? 'text-3xl xl:text-4xl font-arabic leading-tight' : 'text-4xl xl:text-5xl leading-tight tracking-tight')}>
              {hero.title}
            </motion.h1>

            <motion.p initial="hidden" animate="visible" variants={fadeInUp} custom={3} className={cn('text-white/80 mb-8 max-w-lg', isRTL ? 'text-base leading-relaxed' : 'text-lg leading-relaxed')}>
              {hero.description}
            </motion.p>

            {hero.highlights && hero.highlights.length > 0 && (
              <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={4} className="space-y-4 mb-10">
                {hero.highlights.map((highlight, index) => (
                  <motion.div key={index} initial="hidden" animate="visible" variants={fadeInUp} custom={4 + index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 text-gold">{highlight.icon}</div>
                    <p className="text-white/85 text-sm leading-relaxed">{highlight.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {hero.stats && hero.stats.length > 0 && (
              <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={7} className="flex gap-8 pt-8 border-t border-white/10">
                {hero.stats.map((stat, index) => (
                  <div key={index} className={cn('text-center', isRTL && 'text-right')}>
                    <div className="text-2xl font-bold text-gold mb-1">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 0.5 }}
  className="relative z-10 px-12 pb-8 xl:px-16"
>
  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
    <Lock className="w-5 h-5 text-gold" />
    <div className="text-xs text-white/70">
      {t('auth.securePortal')}
    </div>
  </div>
</motion.div>

        </div>

        {/* Card Section */}
        <div
          className={cn(
            'flex w-full lg:w-1/2 flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-12',
            'bg-background relative overflow-hidden'
          )}
        >
          {/* Subtle Background Decoration for Mobile */}
          <div className="absolute inset-0 lg:hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gold/5 blur-[60px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 w-full max-w-md space-y-6"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-lg mb-4">
                <Scale className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className={cn(
                'text-xl font-bold text-foreground',
                isRTL ? 'font-arabic' : ''
              )}>
                {t('auth.brandName')}
              </h2>
            </div>

            {/* Card Container */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lg">
              {/* Card Icon */}
              {card.icon && (
                <div className="mb-4 flex justify-center">
                  {card.icon}
                </div>
              )}

              {/* Card Header */}
              <div className="mb-6 text-center">
                <h2 className={cn(
                  'text-xl sm:text-2xl font-bold text-foreground mb-2',
                  isRTL ? 'font-arabic' : ''
                )}>
                  {card.title}
                </h2>
                {card.description && (
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                )}
              </div>

              {/* Card Content */}
              {card.content}
            </div>

            {/* Trust Badges - Mobile Only */}
            <div className="lg:hidden flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-legal-success" />
                <span>{t('auth.trust.secure')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-legal-success" />
                <span>{t('auth.trust.encrypted')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
