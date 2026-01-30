import React, { useState, useEffect } from 'react';
import { NavLink } from './NavLink'; // استخدمنا NavLink المخصص
import { LayoutDashboard, Briefcase, Calendar, FileText, Users, UserX, Archive, Search, FileEdit, UsersRound, Trophy, Settings as SettingsIcon, Building2, Scale, UserCog, ShieldCheck, ChevronLeft, ChevronRight, ChevronDown, Folder, Headphones, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {Button} from '@/components/ui/button'

const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 272;

const Sidebar = () => {
  const { t, direction } = useLanguage();
  const { isCollapsed, toggleCollapsed } = useSidebar();
  const [openGroups, setOpenGroups] = useState(['services', 'system']);

  const isOpen = !isCollapsed;

  const toggleGroup = (groupId) => {
    setOpenGroups(prev => prev.includes(groupId) 
      ? prev.filter(id => id !== groupId)
      : [...prev, groupId]);
  };

  const mainItems = [
    { icon: LayoutDashboard, label: t('navigation.dashboard'), path: '/dashboard' },
    { icon: Briefcase, label: t('navigation.cases'), path: '/cases' },
  ];

  const serviceGroups = [
    { id: 'workFollow', icon: Folder, label: t('navigation.workFollowUp'), items: [
      { icon: Calendar, label: t('navigation.sessions'), path: '/sessions' },
      { icon: FileText, label: t('navigation.procedures'), path: '/procedures' }
    ]},
    { id: 'customerService', icon: Headphones, label: t('navigation.customerService'), items: [
      { icon: Users, label: t('navigation.clients'), path: '/clients' },
      { icon: UserX, label: t('navigation.clientsNoAgency'), path: '/clients-no-agency' },
      { icon: Archive, label: t('navigation.archive'), path: '/archive' },
      { icon: Search, label: t('navigation.courtSearch'), path: '/court-search' }
    ]}
  ];

  const systemItems = [
    { icon: SettingsIcon, label: t('navigation.settings'), path: '/settings' },
    { icon: Building2, label: t('navigation.officeSettings'), path: '/office-settings' },
    { icon: Scale, label: t('navigation.courtSettings'), path: '/court-settings' },
    { icon: UserCog, label: t('navigation.lawyers'), path: '/lawyers' },
    { icon: ShieldCheck, label: t('navigation.usersPermissions'), path: '/users-permissions' }
  ];

  const renderMenuItem = (item, isSubItem = false) => (
    <NavLink key={item.path} to={item.path} className={cn(
      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
      'text-sidebar-foreground hover:bg-sidebar-item-hover-bg',
      isSubItem && 'py-2 text-xs',
      !isOpen && 'justify-center px-2'
    )}>
      <item.icon className={cn('flex-shrink-0', isSubItem ? 'h-4 w-4' : 'h-5 w-5')} />
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="truncate"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </NavLink>
  );

  const renderSubGroup = (group) => (
    <Collapsible key={group.id} open={isOpen && openGroups.includes(group.id)} onOpenChange={() => isOpen && toggleGroup(group.id)}>
      <CollapsibleTrigger asChild>
        <button className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all', 'text-sidebar-text-muted hover:bg-sidebar-subitem-hover-bg hover:text-sidebar-hover-foreground', !isOpen && 'justify-center px-2')}>
          <group.icon className="h-4 w-4 flex-shrink-0" />
          <AnimatePresence mode="wait">
            {isOpen && (
              <>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 truncate text-start">
                  {group.label}
                </motion.span>
                <motion.div initial={{ rotate: 0 }} animate={{ rotate: openGroups.includes(group.id) ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className={cn('space-y-0.5', direction === 'rtl' ? 'pr-4' : 'pl-4')}>
          {group.items.map(item => renderMenuItem(item, true))}
        </motion.div>
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleCollapsed} className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: isOpen ? '17rem' : '4.5rem', x: 0 }}
        className={cn(
          'fixed top-16 z-50 h-[calc(100vh-4rem)] border-border/40 bg-sidebar shadow-custom-lg transition-all duration-300',
          'lg:static lg:translate-x-0',
          !isOpen && 'max-lg:-translate-x-full',
          direction === 'rtl' ? 'right-0 border-l' : 'left-0 border-r'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-end border-b border-sidebar-border p-3">
            <Button variant="ghost" size="icon" onClick={toggleCollapsed} className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent">
              {direction === 'rtl' ? isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" /> : isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            <div className="space-y-1">
              {mainItems.map(item => renderMenuItem(item))}
            </div>

            {serviceGroups.map(group => renderSubGroup(group))}
            {systemItems.map(item => renderMenuItem(item))}
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
