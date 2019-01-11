"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ja = _interopRequireDefault(require("date-fns/locale/ja"));

var _enUS = _interopRequireDefault(require("date-fns/locale/en-US"));

var _dateFnsTz = require("date-fns-tz");

require("../../atoms/dirty_date_fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint class-methods-use-this: "warn" */
var CalendarEvent =
/*#__PURE__*/
function () {
  function CalendarEvent() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$language = _ref.language,
        language = _ref$language === void 0 ? 'en' : _ref$language;

    _classCallCheck(this, CalendarEvent);

    if (language === 'en') {
      this.language = _enUS.default;
      this.language.code = 'en-US';
      this.language.timeZone = 'America/New_York';
    } else if (language === 'ja') {
      this.language = _ja.default;
      this.language.code = 'ja-JP';
      this.language.timeZone = 'Asia/Tokyo';
    }
  }

  _createClass(CalendarEvent, [{
    key: "getName",
    value: function getName(event) {
      return event.summary;
    }
  }, {
    key: "getPlace",
    value: function getPlace(event) {
      return event.location || '';
    }
  }, {
    key: "getStartTime",
    value: function getStartTime(event) {
      return event.start.dateTime;
    }
  }, {
    key: "getEndTime",
    value: function getEndTime(event) {
      return event.end.dateTime;
    }
  }, {
    key: "parseStartTime",
    value: function parseStartTime(event) {
      // console.log(fetchInitialValues());
      return (0, _dateFnsTz.toDate)(this.getStartTime(event), {
        timeZone: this.language.code
      });
    }
  }, {
    key: "parseEndTime",
    value: function parseEndTime(event) {
      return (0, _dateFnsTz.toDate)(this.getEndTime(event), {
        timeZone: this.language.code
      });
    }
  }, {
    key: "getStartTimesOfDay",
    value: function getStartTimesOfDay(event) {
      // return format(utcToZonedTime(this.parseStartTime(event), this.language.code), 'pppp', {
      //   locale: this.language,
      //   timeZone: this.language.code,
      //   awareOfUnicodeTokens: true,
      // });
      return (0, _dateFnsTz.format)((0, _dateFnsTz.utcToZonedTime)(this.getStartTime(event), this.language.timeZone), 'BBBB p', {
        locale: this.language,
        timeZone: this.language.timeZone,
        awareOfUnicodeTokens: true
      });
    }
  }]);

  return CalendarEvent;
}();

exports.default = CalendarEvent;