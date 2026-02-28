// 📁 services/calendarService.js

import fakeEventsData from '../utils/fakeEventsData';

// Service to handle all calendar-related API operations
const calendarService = {
  // Fetch all events from the server or use fake data for testing
  getEvents: async () => {
    try {
      // Uncomment this for production
      // const response = await axios.get(`${API_BASE_URL}/events`);
      // return response.data;

      // For testing with fake data
      return fakeEventsData;
    } catch (error) {
      console.error('❌ خطأ في جلب الأحداث:', error);
      throw error;
    }
  },
};

export default calendarService;
