import { useMemo } from 'react';

import { useNotificationCenterContext } from '@features/notifications/NotificationCenter';

const useNotifications = () => {
  const context = useNotificationCenterContext();

  const sortedNotifications = useMemo(
    () => [...context.notifications].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [context.notifications],
  );

  const sortedActivity = useMemo(
    () => [...context.activity].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
    [context.activity],
  );

  return {
    ...context,
    notifications: sortedNotifications,
    activity: sortedActivity,
  };
};

export default useNotifications;
