import React, { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { LogoPatren, LogoBlue } from '@/assets/images';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { sidebarGroups } from '@config/sidebar';
import { AppNavLink } from './AppNavLink';
import { useSecurity } from '@shared/security/SecurityContext';
import { hasAny, hasPermission } from '@shared/security/permissions';
import { sortItemsByTopNavOrder } from './navOrder';

const DesktopSidebar = () => {
  const { t, direction } = useLanguage();
  const { permissions } = useSecurity();
  const { theme } = useTheme();
  const logo = theme === 'dark' ? LogoPatren : LogoBlue;

  const groups = useMemo(() => {
    const isAllowed = (item) => {
      if (!item.requiredPermission) return true;
      return Array.isArray(item.requiredPermission)
        ? hasAny(permissions, item.requiredPermission)
        : hasPermission(permissions, item.requiredPermission);
    };

    return sidebarGroups
      .map((group) => ({
        ...group,
        items: sortItemsByTopNavOrder(
          group.items
            .map((item) => ({ ...item, children: item.children?.filter((child) => isAllowed(child)) }))
            .filter((item) => isAllowed(item) && (!item.children || item.children.length > 0)),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [permissions]);

  return (
    <aside className="hidden xl:flex w-72 shrink-0 border-s border-border/60 bg-card/85 backdrop-blur-md p-4 flex-col gap-4" dir={direction}>
      <div className="rounded-2xl border border-border/60 p-4 bg-background/60">
        <img src={logo} alt="Avocat" className="h-11 w-auto ms-auto" />
      </div>
      <nav className="overflow-y-auto pe-1 space-y-4">
        {groups.map((group) => (
          <div key={group.key} className="space-y-2">
            <p className="text-[11px] font-semibold text-muted-foreground">{t(`sidebar.sections.${group.key}`)}</p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                if (!item.children?.length) {
                  return (
                    <AppNavLink
                      key={item.key}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${isActive ? 'bg-primary/12 text-primary border border-primary/30' : 'text-foreground hover:bg-muted/50 border border-transparent'}`
                      }
                    >
                      <span>{t(item.labelKey)}</span>
                      {Icon && <Icon className="h-4 w-4" />}
                    </AppNavLink>
                  );
                }

                return (
                  <details key={item.key} className="rounded-xl border border-border/60 bg-background/30 p-2" open>
                    <summary className="list-none cursor-pointer flex items-center justify-between text-sm font-medium">
                      <span>{t(item.labelKey)}</span>
                      <ChevronDown className="h-4 w-4" />
                    </summary>
                    <div className="mt-2 space-y-1">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                          <AppNavLink
                            key={child.key}
                            to={child.path}
                            className={({ isActive }) =>
                              `flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`
                            }
                          >
                            <span>{t(child.labelKey)}</span>
                            {ChildIcon && <ChildIcon className="h-3.5 w-3.5" />}
                          </AppNavLink>
                        );
                      })}
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default DesktopSidebar;
