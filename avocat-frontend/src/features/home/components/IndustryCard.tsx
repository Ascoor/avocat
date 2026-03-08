import { motion } from "framer-motion";

import { useLanguage } from "@/shared/contexts/LanguageContext";

interface IndustryCardProps {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  index: number;
}

const IndustryCard = ({ id, title, titleEn, description, descriptionEn, index }: IndustryCardProps) => {
  const { language } = useLanguage();
  const displayTitle = language === "en" && titleEn ? titleEn : title;
  const displayDesc = language === "en" && descriptionEn ? descriptionEn : description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:bg-surface-elevated"
    >
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{displayTitle}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{displayDesc}</p>
    </motion.div>
  );
};

export default IndustryCard;
