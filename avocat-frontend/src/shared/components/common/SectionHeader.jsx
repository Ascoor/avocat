import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { Button } from "@shared/ui/button";
import { cn } from "@shared/lib/utils";

const SectionHeader = ({
  listName,
  subtitle,
  icon,
  showBack = true,
  backLabel, // إذا تم تمرير عنوان مخصص من الخارج
  actions,
  className,
}) => {
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  
  // 1. متغير النص الذكي: يختار الكلمة بناءً على اتجاه اللغة
  const dynamicBackLabel = isRTL ? "رجوع" : "Back";
  
  // 2. اختيار السهم الصحيح برمجياً
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <motion.section
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      // خاصية dir تضمن أن اليمين يبقى يمين واليسار يسار حسب اللغة
      dir={isRTL ? "rtl" : "ltr"}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60",
        "bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--surface-overlay))]",
        "p-4 sm:p-5 shadow-custom-lg backdrop-blur-md",
        className
      )}
    >
      <div className="relative flex flex-row items-center justify-between gap-4">
        
        {/* الطرف الأول: الأيقونة + العنوان (متلاصقان دائماً) */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {icon && (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-background/40 shadow-gold-glow/5 sm:h-12 sm:w-12">
              {typeof icon === "string" ? (
                <img src={icon} alt="" className="h-7 w-7 object-contain" />
              ) : (
                <div className="text-accent">{icon}</div>
              )}
            </div>
          )}

          <div className="flex flex-col min-w-0">
            <h2 className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl leading-tight">
              {listName}
            </h2>
            {subtitle && (
              <p className="mt-1 text-xs font-medium text-muted-foreground/70 line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* الطرف الثاني: الأكشن + زر الرجوع */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {actions && <div className="flex items-center gap-2">{actions}</div>}
          
          {showBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="h-9 rounded-lg border-border/50 bg-background/50 px-3 hover:bg-accent/10 hover:text-accent transition-all"
            >
              {/* عرض المتغير الذكي هنا */}
              <span className="text-xs font-bold">
                {backLabel || dynamicBackLabel}
              </span>
              <BackIcon className={cn("h-4 w-4", isRTL ? "mr-2" : "ml-2")} />
            </Button>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default SectionHeader;