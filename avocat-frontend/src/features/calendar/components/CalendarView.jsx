import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import arLocale from '@fullcalendar/core/locales/ar';

const CalendarView = ({
  events,
  locale,
  onEventClick,
  onDateSelect,
  isRtl,
}) => {
  return (
    <div className="calendar-view rounded-xl bg-white p-4 shadow-md dark:bg-gray-800">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        locales={[arLocale]}
        locale={locale}
        direction={isRtl ? 'rtl' : 'ltr'}
        initialView="timeGridWeek"
        selectable
        selectMirror
        dayMaxEvents
        events={events}
        select={onDateSelect}
        eventClick={onEventClick}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        buttonText={{
          today: locale === 'ar' ? 'اليوم' : 'Today',
          month: locale === 'ar' ? 'شهر' : 'Month',
          week: locale === 'ar' ? 'أسبوع' : 'Week',
          day: locale === 'ar' ? 'يوم' : 'Day',
        }}
      />
    </div>
  );
};

export default CalendarView;
