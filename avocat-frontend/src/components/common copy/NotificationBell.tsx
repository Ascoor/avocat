import type { ComponentType } from 'react';
import { AlertCircle, AlertTriangle, Bell, CheckCircle2, Info, Loader2, WifiOff, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import useNotifications from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';

const severityConfig = {
  success: {
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    icon: CheckCircle2,
  },
  warning: {
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    icon: AlertTriangle,
  },
  error: {
    badge: 'bg-red-500/10 text-red-600 dark:text-red-400',
    icon: AlertCircle,
  },
  info: {
    badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    icon: Info,
  },
} as const;

const connectionLabel: Record<string, { label: string; tone: string; icon: ComponentType<{ className?: string }> }> = {
  idle: { label: 'Idle', tone: 'text-muted-foreground', icon: Info },
  connecting: { label: 'Connecting…', tone: 'text-muted-foreground', icon: Loader2 },
  open: { label: 'Live', tone: 'text-emerald-600 dark:text-emerald-400', icon: CheckCircle2 },
  error: { label: 'Offline', tone: 'text-red-600 dark:text-red-400', icon: WifiOff },
};

const NotificationBell = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    connectionState,
    isBootstrapping,
  } = useNotifications();

  const visibleNotifications = notifications.slice(0, 8);
  const connection = connectionLabel[connectionState];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} align="end" className="w-80 p-0">
        <DropdownMenuLabel className="flex items-center justify-between gap-2 px-4 py-3 text-sm font-semibold">
          <span>Live notifications</span>
          <span className={cn('inline-flex items-center gap-1 text-xs font-medium', connection.tone)}>
            <connection.icon className={cn('h-3.5 w-3.5', connectionState === 'connecting' && 'animate-spin')} />
            {connection.label}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2">
          {isBootstrapping ? (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Initializing notification center…
            </div>
          ) : visibleNotifications.length === 0 ? (
            <div className="space-y-2 rounded-md border border-dashed border-border/70 bg-muted/40 p-4 text-center text-sm text-muted-foreground">
              <p>No notifications yet.</p>
              <p className="text-xs">Updates will appear here as editors collaborate.</p>
            </div>
          ) : (
            <ScrollArea className="max-h-80 pr-2">
              <div className="space-y-2">
                {visibleNotifications.map((notification) => {
                  const severity = severityConfig[notification.severity] ?? severityConfig.info;
                  const Icon = severity.icon;
                  return (
                    <button
                      key={notification.id}
                      type="button"
                      className="group relative flex w-full items-start gap-3 rounded-lg border border-transparent bg-background/50 p-3 text-left transition hover:border-border hover:bg-muted/70"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <span className={cn('flex h-8 w-8 items-center justify-center rounded-full', severity.badge)}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="absolute right-2 top-2">
                        {!notification.read ? <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" /> : null}
                      </span>
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={cn('text-xs font-medium capitalize', severity.badge)}>
                            {notification.category}
                          </Badge>
                          <time className="text-xs text-muted-foreground">
                            {formatRelativeTime(notification.createdAt)}
                          </time>
                        </div>
                        <p className="text-sm font-medium text-foreground line-clamp-2">
                          {notification.message}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="ml-2 h-7 w-7 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100"
                        onClick={(event) => {
                          event.stopPropagation();
                          dismissNotification(notification.id);
                        }}
                        aria-label="Dismiss notification"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-between px-3 py-2">
          <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark all as read
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard/website/notifications">View all</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const formatRelativeTime = (timestamp: string) => {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return 'just now';
  }

  const diff = Date.now() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return 'just now';
  }
  if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes}m ago`;
  }
  if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours}h ago`;
  }
  const days = Math.floor(diff / day);
  return `${days}d ago`;
};

export default NotificationBell;
