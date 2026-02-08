// 🔔 useNotifications.js
import { useState, useEffect } from 'react';

// Hook to manage notifications for upcoming events
const useNotifications = (events) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notifyUpcomingEvents = () => {
      const now = new Date().getTime();
      events.forEach((event) => {
        const eventTime = new Date(event.start).getTime();
        if (eventTime - now < 3600000) {
          // Notify if the event is within the next hour
          setNotifications((prev) => [
            ...prev,
            {
              id: event.id,
              message: `🔔 تذكير بحدث: ${event.title} يبدأ قريبًا!`,
            },
          ]);
        }
      });
    };

    const interval = setInterval(notifyUpcomingEvents, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [events]);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id)); // Remove notification by ID
  };

  return { notifications, removeNotification };
};

export default useNotifications;
