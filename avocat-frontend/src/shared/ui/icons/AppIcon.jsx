import React from 'react';
import { LexicraftIcon } from '@shared/icons/lexicraft';
import {
  BarChart3, Briefcase, CalendarClock, FileText, Scale, Search,
  Users, UserCheck, Shield, Bell, Database, BookOpen, Archive
} from 'lucide-react';

/**
 * AppIcon — Unified icon API for the Avocat app.
 *
 * Usage:
 *   <AppIcon name="gavel" size={20} tone="primary" />
 *
 * How to add a new icon:
 *   1. If it exists in LexicraftIcon manifest, just use the name.
 *   2. Otherwise, add a lucide fallback entry to LUCIDE_FALLBACKS below.
 */

const LUCIDE_FALLBACKS = {
  report: BarChart3,
  chart: BarChart3,
  services: FileText,
  workTracking: Briefcase,
  sessions: CalendarClock,
  procedures: FileText,
  lawyers: Scale,
  clients: UserCheck,
  customerService: Users,
  settings: Shield,
  notifications: Bell,
  database: Database,
  knowledge: BookOpen,
  archive: Archive,
  courtsSearch: Search,
};

const TONE_COLORS = {
  primary: 'text-primary',
  muted: 'text-muted-foreground',
  danger: 'text-destructive',
  success: 'text-[hsl(var(--color-success))]',
  warning: 'text-accent',
};

const AppIcon = ({
  name,
  size = 18,
  variant = 'premium',
  tone = 'primary',
  isDirectional = false,
  dir,
  className = '',
}) => {
  const toneClass = TONE_COLORS[tone] || TONE_COLORS.primary;
  const combinedClass = `${toneClass} ${className}`.trim();

  // Try LexicraftIcon first
  const tryLexicraft = (
    <LexicraftIcon
      name={name}
      size={size}
      dir={dir}
      isDirectional={isDirectional}
      className={combinedClass}
    />
  );

  // Check if it's a known Lexicraft name
  const lexicraftNames = [
    'gavel', 'scales', 'shield', 'document', 'briefcase', 'user', 'users',
    'lock', 'court', 'calendar', 'search', 'tool', 'view', 'edit', 'trash',
    'sort-up', 'sort-down', 'arrow-forward', 'client',
  ];

  if (lexicraftNames.includes(name)) {
    return tryLexicraft;
  }

  // Fallback to lucide
  const LucideComponent = LUCIDE_FALLBACKS[name];
  if (LucideComponent) {
    return <LucideComponent size={size} className={combinedClass} />;
  }

  // Ultimate fallback
  return tryLexicraft;
};

export default AppIcon;
