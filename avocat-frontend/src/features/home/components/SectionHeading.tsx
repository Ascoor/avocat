import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  children?: ReactNode;
}

const SectionHeading = ({ subtitle, title, description, align = "center" }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-start"}`}
    >
      {subtitle && (
        <span className="inline-block text-sm font-semibold text-primary mb-3 tracking-wide">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-foreground font-tharwat leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
      <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-primary" />
    </motion.div>
  );
};

export default SectionHeading;