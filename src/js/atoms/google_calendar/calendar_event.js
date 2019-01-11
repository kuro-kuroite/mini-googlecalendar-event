import ja from 'date-fns/locale/ja';
import enUS from 'date-fns/locale/en-US';
// import { format } from 'date-fns';
// import toDate from 'date-fns/fp/toDate'
import { format, toDate, utcToZonedTime } from 'date-fns-tz';
import '../dirty_date_fns';

/* eslint class-methods-use-this: "warn" */
export default class CalendarEvent {
  constructor({ language = 'en' } = {}) {
    if (language === 'en') {
      this.language = enUS;
      this.language.code = 'en-US';
      this.language.timeZone = 'America/New_York';
    } else if (language === 'ja') {
      this.language = ja;
      this.language.code = 'ja-JP';
      this.language.timeZone = 'Asia/Tokyo';
    }
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
    return toDate(this.getStartTime(event), { timeZone: this.language.code });
  }

  parseEndTime(event) {
    return toDate(this.getEndTime(event), { timeZone: this.language.code });
  }

  getStartTimesOfDay(event) {
    // return format(utcToZonedTime(this.parseStartTime(event), this.language.code), 'pppp', {
    //   locale: this.language,
    //   timeZone: this.language.code,
    //   awareOfUnicodeTokens: true,
    // });
    return format(
      utcToZonedTime(this.getStartTime(event), this.language.timeZone),
      'BBBB p',
      {
        locale: this.language,
        timeZone: this.language.timeZone,
        awareOfUnicodeTokens: true,
      },
    );
  }
}
