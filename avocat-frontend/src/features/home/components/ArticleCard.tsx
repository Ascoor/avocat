import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@shared/contexts/LanguageContext"; 

interface ArticleCardProps {
  id: string;
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  category: string;
  categoryEn?: string;
  date: string;
  dateEn?: string;
  readTime: string;
  readTimeEn?: string;
  index: number;
}

const ArticleCard = ({ id, title, titleEn, summary, summaryEn, category, categoryEn, date, dateEn, readTime, readTimeEn, index }: ArticleCardProps) => {
  const { lang, t } = useLanguage();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const displayTitle = lang === "en" && titleEn ? titleEn : title;
  const displaySummary = lang === "en" && summaryEn ? summaryEn : summary;
  const displayCategory = lang === "en" && categoryEn ? categoryEn : category;
  const displayDate = lang === "en" && dateEn ? dateEn : date;
  const displayReadTime = lang === "en" && readTimeEn ? readTimeEn : readTime;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/insights/${id}`}
        className="group block h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30"
      >
        <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
          {displayCategory}
        </span>
        <h3 className="text-lg font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
          {displayTitle}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{displaySummary}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{displayDate}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {displayReadTime}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard;
