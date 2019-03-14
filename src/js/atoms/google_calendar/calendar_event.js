import { DateFnsTz } from '@kuro-kuroite/prelude';

/* eslint class-methods-use-this: "warn" */
export default class CalendarEvent {
  constructor({ region = 'US' } = {}) {
    this.dateFns = new DateFnsTz(region);
  }

  getName(event) {
    return event.summary;
  }

  getPlace(event) {
    return event.location || '';
  }

  getStartTime(event) {
    return this.dateFns.zonedTimeToUtc(event.start.dateTime);
  }

  getStartTimeRaw(event) {
    return event.start.dateTime;
  }

  getEndTime(event) {
    return this.dateFns.zonedTimeToUtc(event.end.dateTime);
  }

  getEndTimeRaw(event) {
    return event.end.dateTime;
  }

  getStartTimesOfDay(event) {
    return this.dateFns.format(this.getStartTime(event), 'BBBB p');
  }
}
