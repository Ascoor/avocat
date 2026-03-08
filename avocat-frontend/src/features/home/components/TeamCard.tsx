import { useLanguage } from "@/shared/contexts/LanguageContext";
import { motion } from "framer-motion";
import { User, Mail } from "lucide-react";

interface TeamCardProps {
  name: string;
  nameEn?: string;
  role: string;
  roleEn?: string;
  areas: string[];
  areasEn?: string[];
  bio: string;
  bioEn?: string;
  languages: string[];
  index: number;
}

const TeamCard = ({ name, nameEn, role, roleEn, areas, areasEn, bio, bioEn, languages, index }: TeamCardProps) => {
  const { language, t } = useLanguage();
  const displayName = language === "en" && nameEn ? nameEn : name;
  const displayRole = language === "en" && roleEn ? roleEn : role;
  const displayBio = language === "en" && bioEn ? bioEn : bio;
  const displayAreas = language === "en" && areasEn ? areasEn : areas;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/30"
    >
      <div className="aspect-[3/4] bg-surface-elevated flex items-center justify-center">
        <User className="h-20 w-20 text-muted-foreground/30" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-1">{displayName}</h3>
        <p className="text-primary text-sm font-medium mb-3">{displayRole}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{displayBio}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {displayAreas.map((area) => (
            <span key={area} className="text-xs bg-surface-elevated text-muted-foreground px-3 py-1 rounded-full">
              {area}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          {languages.map((l) => (
            <span key={l} className="border border-border px-2 py-0.5 rounded">{l}</span>
          ))}
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
          <Mail className="h-4 w-4" />
          {t("publicSite.team.viewProfile")}
        </button>
      </div>
    </motion.div>
  );
};

export default TeamCard;