import CalendarView from './components/CalendarView';
import NotificationPanel from './components/NotificationPanel';
import FilterPanel from './components/FilterPanel';

const CalendarPage = () => {
  return (
    <div className="calendar-page p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <FilterPanel />

      <CalendarView />

      <NotificationPanel />
    </div>
  );
};

export default CalendarPage;
