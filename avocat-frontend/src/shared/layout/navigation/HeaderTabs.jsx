import React, { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

import { AppNavLink } from './AppNavLink';
import { sidebarGroups } from '@config/sidebar';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { cn } from '@shared/lib/utils';
import { useSecurity } from '@shared/security/SecurityContext';
import { hasAny, hasPermission } from '@shared/security/permissions';
import { sortItemsByTopNavOrder } from './navOrder';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';

const PillLink = ({ to, icon: Icon, label }) => (
  <AppNavLink
    to={to}
    className={cn('tab-pill', 'shrink-0')}
    activeClassName="is-active"
  >
    {Icon && <Icon className="tab-pill-icon" />}
    <span className="truncate">{label}</span>
  </AppNavLink>
);

const HeaderTabs = ({ className, justify = 'start' }) => {
  const { t, direction, isRTL } = useLanguage();
  const { permissions } = useSecurity();

  const items = useMemo(() => {
    const isAllowed = (item) => {
      if (!item.requiredPermission) return true;
      return Array.isArray(item.requiredPermission)
        ? hasAny(permissions, item.requiredPermission)
        : hasPermission(permissions, item.requiredPermission);
    };
    const flat = [];
    for (const group of sidebarGroups) {
      for (const item of group.items) {
        const children = item.children?.filter((child) => isAllowed(child));
        if (isAllowed(item) && (!children || children.length > 0)) {
          flat.push({ ...item, children });
        }
      }
    }
    return flat;
  }, [permissions]);

  const orderedItems = useMemo(() => {
    return sortItemsByTopNavOrder(items);
  }, [items]);

  return (
    <div
      className={cn(
        'header-tabs-wrap w-full',
        justify === 'center' && 'flex justify-center',
        className,
      )}
    >
      <div className="header-tabs" dir={direction}>
        {orderedItems.map((item) => {
          const Icon = item.icon;
          const label = t(item.labelKey);
          if (item.path) {
            return (
              <PillLink
                key={item.key}
                to={item.path}
                icon={Icon}
                label={label}
              />
            );
          }

          return (
            <DropdownMenu key={item.key}>
              <DropdownMenuTrigger asChild>
                <button type="button" className={cn('tab-pill', 'shrink-0')}>
                  {Icon && <Icon className="tab-pill-icon" />}
                  <span className="truncate">{label}</span>
                  <ChevronDown className="ms-1 h-4 w-4 opacity-80" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align={isRTL ? 'end' : 'start'}
                dir={direction}
                className="min-w-56"
              >
                {item.children.map((child) => {
                  const ChildIcon = child.icon;
                  return (
                    <DropdownMenuItem key={child.key} asChild>
                      <AppNavLink
                        to={child.path}
                        className={cn(
                          'flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm',
                        )}
                        activeClassName="bg-muted"
                      >
                        {ChildIcon && <ChildIcon className="h-4 w-4" />}
                        <span className="truncate">{t(child.labelKey)}</span>
                      </AppNavLink>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderTabs;
