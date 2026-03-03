const NotificationPanel = ({ locale, selectedEvent }) => {
  if (!selectedEvent) {
    return (
      <div className="rounded-xl bg-white p-4 shadow-md dark:bg-gray-800">
        <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
          {locale === 'ar' ? 'تفاصيل الحدث' : 'Event Details'}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {locale === 'ar'
            ? 'اختر حدثًا من التقويم لعرض التفاصيل هنا.'
            : 'Select an event in the calendar to view details here.'}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-md dark:bg-gray-800">
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
        {selectedEvent.title}
      </h3>
      <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
        {selectedEvent.details}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {locale === 'ar' ? 'البداية:' : 'Start:'} {selectedEvent.startLabel}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {locale === 'ar' ? 'النهاية:' : 'End:'} {selectedEvent.endLabel}
      </p>
    </div>
  );
};

export default NotificationPanel;
