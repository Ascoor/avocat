import { useMemo, useState } from 'react';
import CalendarView from './components/CalendarView';
import NotificationPanel from './components/NotificationPanel';
import FilterPanel from './components/FilterPanel';
import {
  calendarCategoryMeta,
  createDemoLegalEvents,
} from './utils/fakeEventsData';

const formatDateTime = (date, locale) =>
  new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));

const CalendarPage = () => {
  const [locale, setLocale] = useState('ar');
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(
    Object.keys(calendarCategoryMeta),
  );
  const [selectedEvent, setSelectedEvent] = useState(null);

  const demoEvents = useMemo(() => createDemoLegalEvents(), []);

  const categories = useMemo(
    () =>
      Object.entries(calendarCategoryMeta).map(([key, value]) => ({
        key,
        color: value.color,
        label: value.label[locale],
      })),
    [locale],
  );

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return demoEvents
      .filter((event) => selectedCategories.includes(event.category))
      .filter((event) => {
        if (!normalizedSearch) {
          return true;
        }

        return (
          event.title.ar.toLowerCase().includes(normalizedSearch) ||
          event.title.en.toLowerCase().includes(normalizedSearch)
        );
      })
      .map((event) => ({
        ...event,
        title: event.title[locale],
      }));
  }, [demoEvents, selectedCategories, search, locale]);

  const upcomingCount = filteredEvents.length;

  const handleEventClick = ({ event }) => {
    const source = demoEvents.find((item) => item.id === event.id);
    if (!source) {
      return;
    }

    setSelectedEvent({
      title: source.title[locale],
      details: source.details[locale],
      startLabel: formatDateTime(source.start, locale),
      endLabel: formatDateTime(source.end, locale),
    });
  };

  const handleDateSelect = ({ start, end }) => {
    const startLabel = formatDateTime(start, locale);
    const endLabel = formatDateTime(end, locale);

    setSelectedEvent({
      title:
        locale === 'ar'
          ? 'موعد تجريبي جديد (غير محفوظ)'
          : 'New Demo Slot (Not Saved)',
      details:
        locale === 'ar'
          ? 'هذا مثال لميزة اختيار وقت في التقويم باستخدام مكتبة مجانية.'
          : 'This is a sample slot selected using a free calendar package.',
      startLabel,
      endLabel,
    });
  };

  const toggleCategory = (key) => {
    setSelectedCategories((previous) =>
      previous.includes(key)
        ? previous.filter((item) => item !== key)
        : [...previous, key],
    );
  };

  return (
    <div className="calendar-page min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
      <div className="mb-4 rounded-xl bg-white p-4 shadow-md dark:bg-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {locale === 'ar'
            ? 'تقويم المواعيد القانونية (عرض تجريبي)'
            : 'Legal Calendar (Demo View)'}
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {locale === 'ar'
            ? `عدد الأحداث الحالية: ${upcomingCount}`
            : `Current visible events: ${upcomingCount}`}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-1">
          <FilterPanel
            locale={locale}
            search={search}
            onSearchChange={setSearch}
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            onToggleLocale={() => setLocale((prev) => (prev === 'ar' ? 'en' : 'ar'))}
          />
          <NotificationPanel locale={locale} selectedEvent={selectedEvent} />
        </div>

        <div className="lg:col-span-3">
          <CalendarView
            events={filteredEvents}
            locale={locale}
            onEventClick={handleEventClick}
            onDateSelect={handleDateSelect}
            isRtl={locale === 'ar'}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
