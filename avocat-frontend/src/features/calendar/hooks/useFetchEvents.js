import { useState, useEffect } from 'react';
import calendarService from '../services/calendarService';

// ✅ Hook to fetch events from the API
const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await calendarService.getEvents(); // جلب الأحداث من API
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading };
};

export default useFetchEvents;
