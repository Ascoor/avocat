const fakeEventsData = [
  {
    id: 'sample-1',
    title: 'Initial consultation',
    start: new Date().toISOString(),
    end: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    allDay: false,
  },
];

export default fakeEventsData;
