import React, { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

import { NavLink } from './NavLink';
import { sidebarGroups } from '@config/sidebar';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { cn } from '@shared/lib/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';

const PillLink = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={cn('tab-pill', 'shrink-0')}
    activeClassName="is-active"
  >
    {Icon && <Icon className="tab-pill-icon" />}
    <span className="truncate">{label}</span>
  </NavLink>
);

const HeaderTabs = ({ className }) => {
  const { t, direction, isRTL } = useLanguage();

  const items = useMemo(() => {
    const flat = [];
    for (const group of sidebarGroups) {
      for (const item of group.items) flat.push(item);
    }
    return flat;
  }, []);

  const orderedItems = useMemo(() => {
    const preferredOrder = [
      'dashboard',
      'customer_service',
      'cases',
      'services',
      'work_follow',
      'settings',
    ]; 
    const orderMap = new Map(preferredOrder.map((key, index) => [key, index]));

 
    return [...items].sort((a, b) => {
      const aOrder = orderMap.get(a.key) ?? Number.MAX_SAFE_INTEGER;
      const bOrder = orderMap.get(b.key) ?? Number.MAX_SAFE_INTEGER;
      return aOrder - bOrder;
    });
  }, [items]);
  return (
    <div className={cn('header-tabs-wrap', className)}>
      <div className="header-tabs" dir={direction}>
        {orderedItems.map((item) => {
          const Icon = item.icon; 
          const labelKey = item.key === 'customer_service'
            ? 'navigation.clients'
            : item.labelKey;
          const label = t(labelKey);
          if (!item.children?.length) {
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
                align={isRTL ? 'start' : 'end'}
                className="min-w-56"
              >
                {item.children.map((child) => {
                  const ChildIcon = child.icon;
                  return (
                    <DropdownMenuItem key={child.key} asChild>
                      <NavLink
                        to={child.path}
                        className={cn(
                          'flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm',
                          isRTL && 'flex-row-reverse',
                        )}
                        activeClassName="bg-muted"
                      >
                        {ChildIcon && <ChildIcon className="h-4 w-4" />}
                        <span className="truncate">{t(child.labelKey)}</span>
                      </NavLink>
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
