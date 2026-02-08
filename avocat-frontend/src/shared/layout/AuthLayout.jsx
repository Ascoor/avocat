import React from "react";
import { motion } from "framer-motion";
import { Scale, Lock } from "lucide-react";
import { cn } from "@shared/lib/utils";
import { useLanguage } from "@shared/contexts/LanguageContext";

const AuthLayout = ({ heroSide = "left", toolbar, hero, card }) => {
  const { direction, isRTL, t } = useLanguage();
  const shouldReverse = isRTL ? heroSide === "right" : heroSide === "left";

  const fadeInUp = {
    hidden: { opacity: 0, y: 12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.3, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-background" dir={direction}>
      {toolbar && (
        <div className="absolute top-4 end-4 z-50 flex items-center gap-2">{toolbar}</div>
      )}

      <div className="flex min-h-screen">
        <div
          className={cn(
            "hidden lg:flex lg:w-1/2 flex-col justify-between relative overflow-hidden",
            shouldReverse && "lg:order-last",
          )}
        >
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -top-16 end-0 h-72 w-72 rounded-full bg-[hsl(var(--gold))] blur-[120px]" />
            <div className="absolute bottom-0 start-0 h-72 w-72 rounded-full bg-[hsl(var(--primary-glow))] blur-[140px]" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-center px-12 py-16 xl:px-16">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={0} className="mb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(var(--gold))] shadow-gold-glow">
                <Scale className="h-8 w-8 text-[hsl(var(--foreground))]" />
              </div>
            </motion.div>

            {hero?.badge && (
              <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={1} className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                  {hero.badge}
                </div>
              </motion.div>
            )}

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={2}
              className={cn(
                "mb-4 text-4xl font-semibold text-white xl:text-5xl",
                isRTL ? "font-arabic leading-tight" : "font-display tracking-tight",
              )}
            >
              {hero?.title}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={3}
              className={cn(
                "mb-8 max-w-lg text-base text-white/80",
                isRTL ? "leading-relaxed" : "text-lg leading-relaxed",
              )}
            >
              {hero?.description}
            </motion.p>

            {hero?.highlights?.length > 0 && (
              <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={4} className="space-y-4 mb-10">
                {hero.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    custom={4 + index}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 text-[hsl(var(--gold))]">{highlight.icon}</div>
                    <p className="text-sm text-white/85">{highlight.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {hero?.stats?.length > 0 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={7}
                className="flex gap-8 border-t border-white/10 pt-8"
              >
                {hero.stats.map((stat, index) => (
                  <div key={index} className="text-center sm:text-start">
                    <div className="text-2xl font-bold text-[hsl(var(--gold))]">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3, ease: "easeOut" }}
            className="relative z-10 px-12 pb-8 xl:px-16"
          >
            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
              <Lock className="h-5 w-5 text-[hsl(var(--gold))]" />
              <div className="text-xs text-white/75">{t("auth.securePortal")}</div>
            </div>
          </motion.div>
        </div>

        <div
          className={cn(
            "flex w-full lg:w-1/2 flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-12",
            "relative overflow-hidden bg-background",
          )}
        >
          <div className="absolute inset-0 lg:hidden">
            <div className="absolute top-0 end-0 h-64 w-64 rounded-full bg-[hsl(var(--primary))]/10 blur-[100px]" />
            <div className="absolute bottom-0 start-0 h-48 w-48 rounded-full bg-[hsl(var(--gold))]/10 blur-[80px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md space-y-6"
          >
            <div className="rounded-[var(--radius-xl)] border border-border bg-[hsl(var(--card))] p-6 shadow-custom-lg sm:p-8">
              {card?.icon && <div className="mb-4 flex justify-center">{card.icon}</div>}

              <div className="mb-6 text-center">
                <h2 className={cn("text-xl font-semibold text-foreground sm:text-2xl", isRTL ? "font-arabic" : "font-display")}>
                  {card?.title}
                </h2>
                {card?.description && <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>}
              </div>

              {card?.content}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
