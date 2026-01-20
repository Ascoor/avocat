// 🛠️ useEventActions.js
import calendarService from '../services/calendarService';

// Hook to handle creating, updating, and deleting events
const useEventActions = () => {
  // Function to add a new event
  const addEvent = async (event) => {
    try {
      await calendarService.addEvent(event);
      alert('✅ تم إضافة الحدث بنجاح');
    } catch (error) {
      console.error('فشل في إضافة الحدث', error);
    }
  };

  // Function to update an existing event
  const updateEvent = async (eventId, updatedData) => {
    try {
      await calendarService.updateEvent(eventId, updatedData);
      alert('✏️ تم تعديل الحدث بنجاح');
    } catch (error) {
      console.error('فشل في تعديل الحدث', error);
    }
  };

  // Function to delete an event
  const deleteEvent = async (eventId) => {
    try {
      await calendarService.deleteEvent(eventId);
      alert('🗑️ تم حذف الحدث بنجاح');
    } catch (error) {
      console.error('فشل في حذف الحدث', error);
    }
  };

  return { addEvent, updateEvent, deleteEvent };
};

export default useEventActions;
