import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/shared/contexts/LanguageContext";



interface CTABlockProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

const CTABlock = ({ title, description, buttonText, buttonLink = "/book" }: CTABlockProps) => {
  const { t } = useLanguage();
  const btnText = buttonText || t("publicSite.cta.book");

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-border bg-card p-10 md:p-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 relative z-10">{title}</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto relative z-10">{description}</p>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={buttonLink}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-base transition-all hover:brightness-110 glow-red"
            >
              {btnText}
            </Link>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-green-600/40 text-green-500 font-semibold text-base transition-all hover:bg-green-600/10"
            >
              {t("publicSite.cta.whatsapp")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABlock;