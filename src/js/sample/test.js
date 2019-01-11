import { CalendarEventList } from '../index';

const events = [
  {
    kind: 'calendar#event',
    etag: '"3063785192938000"',
    id: 'btveawnrsumn',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=eifhiofelf',
    created: '2018-07-18T05:43:16.000Z',
    updated: '2018-07-18T05:43:16.469Z',
    summary: 'test3',
    creator: { email: 'sample.address@gmail.com', self: true },
    organizer: { email: 'sample.address@gmail.com', self: true },
    start: { dateTime: '2018-07-17T01:00:00+09:00' },
    end: { dateTime: '2018-07-17T09:00:00+09:00' },
    iCalUID: 'btveawnrsumn@google.com',
    sequence: 0,
    extendedProperties: { private: [Object] },
    reminders: { useDefault: true },
  },
  {
    kind: 'calendar#event',
    etag: '"3063785167498000"',
    id: 'werthfsgadsfa',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=eifhiofelf',
    created: '2018-07-18T05:43:03.000Z',
    updated: '2018-07-18T05:43:03.749Z',
    summary: 'test1',
    creator: { email: 'sample.address@gmail.com', self: true },
    organizer: { email: 'sample.address@gmail.com', self: true },
    start: { dateTime: '2018-07-18T13:00:00+09:00' },
    end: { dateTime: '2018-07-18T14:00:00+09:00' },
    iCalUID: 'werthfsgadsfa@google.com',
    sequence: 0,
    extendedProperties: { private: [Object] },
    reminders: { useDefault: true },
  },
  {
    kind: 'calendar#event',
    etag: '"3063785179276000"',
    id: 'fewavdsavabt,yu',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=eifhiofelf',
    created: '2018-07-18T05:43:09.000Z',
    updated: '2018-07-18T05:43:09.638Z',
    summary: 'test2',
    creator: { email: 'sample.address@gmail.com', self: true },
    organizer: { email: 'sample.address@gmail.com', self: true },
    start: { dateTime: '2018-07-18T23:00:00+09:00' },
    end: { dateTime: '2018-07-18T16:00:00+09:00' },
    iCalUID: 'fewavdsavabt@google.com',
    sequence: 0,
    extendedProperties: { private: [Object] },
    reminders: { useDefault: true },
  },
];

const eventList = new CalendarEventList(events, { language: 'ja' });

const eventsContent = eventList.concatEvents(
  events,
  (name, place, startTimesOfDay) => {
    const startTimeOfDayPhrase = startTimesOfDay
      ? `${startTimesOfDay}から，`
      : '';
    const placePhrase = place !== '' ? `${place}で` : '';

    return `${startTimeOfDayPhrase}${placePhrase}${name}\n`;
  },
);

console.log(eventsContent);
