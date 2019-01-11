import { CalendarEvent } from '../../atoms/google_calendar';

export default class CalendarEventList {
  constructor(events = [], { language = 'en' } = {}) {
    this.events = events;
    this.event = new CalendarEvent({ language });
  }

  concatEvents(events = this.events, createEventStringCallback) {
    return events.reduceRight((acc, event) => {
      const startTimesOfDay = this.event.getStartTimesOfDay(event);
      const place = this.event.getPlace(event);
      const name = this.event.getName(event);

      return `${createEventStringCallback(name, place, startTimesOfDay)}${acc}`;
    }, '');
  }

  filterEventList(events = this.events, filterConditionCallback) {
    return events.filter(event => filterConditionCallback(event));
  }

  dropEventList(events = this.events, filterConditionCallback) {
    return events.filter(event => !filterConditionCallback(event));
  }
}
