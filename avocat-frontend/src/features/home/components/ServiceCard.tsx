import { motion } from "framer-motion";
import { LucideIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/shared/contexts/LanguageContext";

interface ServiceCardProps {
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  icon: LucideIcon;
  id: string;
  index: number;
}

const ServiceCard = ({ title, titleEn, summary, summaryEn, icon: Icon, id, index }: ServiceCardProps) => {
    const { language, t } = useLanguage();
    const Arrow = language === "ar" ? ArrowLeft : ArrowRight;
    const displayTitle = language === "en" && titleEn ? titleEn : title;
    const displaySummary = language === "en" && summaryEn ? summaryEn : summary;
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/services/${id}`}
        className="group block h-full rounded-xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:border-primary/40 hover:bg-surface-elevated"
      >
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-3 text-lg font-bold text-foreground">{displayTitle}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground mb-4">{displaySummary}</p>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          {t("publicSite.services.learnMore")}
          <Arrow className="h-4 w-4" />
        </span>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;