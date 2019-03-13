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
    return event.start.dateTime;
  }

  getEndTime(event) {
    return event.end.dateTime;
  }

  parseStartTime(event) {
    // console.log(fetchInitialValues());
    return this.dateFns.toDate(this.getStartTime(event));
  }

  parseEndTime(event) {
    return this.dateFns.toDate(this.getEndTime(event));
  }

  getStartTimesOfDay(event) {
    return this.dateFns.format(
      this.dateFns.utcToZonedTime(this.getStartTime(event)),
      'BBBB p',
    );
  }
}
