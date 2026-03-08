import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/shared/contexts/LanguageContext';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  const { isRTL } = useLanguage();
  const Separator = isRTL ? ChevronLeft : ChevronRight;

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <Separator className="h-3 w-3" />}
          {item.path ? (
            <Link to={item.path} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
