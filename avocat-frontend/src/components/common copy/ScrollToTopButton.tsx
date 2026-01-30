import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { smoothScrollTo } from "@/utils/smoothScroll";
import { useLanguage } from "@/contexts/LanguageContext";

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { language, direction } = useLanguage();

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollTop = () => {
    smoothScrollTo(0, { duration: 900 });
  };

  const label = language === "ar" ? "العودة للأعلى" : "Back to top";
  const horizontalPosition = direction === "rtl" ? "left-6" : "right-6";

  return (
    <button
      type="button"
      onClick={handleScrollTop}
      aria-label={label}
      className={`fixed bottom-8 ${horizontalPosition} z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default ScrollToTopButton;
