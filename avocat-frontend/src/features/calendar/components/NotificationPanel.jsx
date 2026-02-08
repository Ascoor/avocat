import { FaRegTrashAlt } from 'react-icons/fa';
import { useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';

const NotificationPanel = ({ notifications = [], removeNotification }) => {
  const transitions = useTransition(notifications, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(100%)' },
    config: { duration: 300 },
  });

  useEffect(() => {
    const timers = notifications.map((note) =>
      setTimeout(() => removeNotification(note.id), 5000),
    );
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [notifications, removeNotification]);

  return (
    <div className="fixed bottom-4 right-4 w-72 space-y-2">
      {transitions((style, item) => (
        <animated.div
          style={style}
          key={item.id}
          className="flex justify-between items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border-l-4 border-avocat-blue dark:border-avocat-orange"
        >
          <span className="text-gray-800 dark:text-gray-200">
            {item.message}
          </span>
          <button onClick={() => removeNotification(item.id)}>
            <FaRegTrashAlt className="text-red-500 hover:text-red-700" />
          </button>
        </animated.div>
      ))}
    </div>
  );
};

export default NotificationPanel;
