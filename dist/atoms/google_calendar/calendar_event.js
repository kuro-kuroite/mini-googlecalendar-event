"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prelude = require("@kuro-kuroite/prelude");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint class-methods-use-this: "warn" */
var CalendarEvent =
/*#__PURE__*/
function () {
  function CalendarEvent() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$region = _ref.region,
        region = _ref$region === void 0 ? 'US' : _ref$region;

    _classCallCheck(this, CalendarEvent);

    this.dateFns = new _prelude.DateFnsTz(region);
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
      return this.dateFns.zonedTimeToUtc(event.start.dateTime);
    }
  }, {
    key: "getEndTime",
    value: function getEndTime(event) {
      return this.dateFns.zonedTimeToUtc(event.end.dateTime);
    }
  }, {
    key: "parseStartTime",
    value: function parseStartTime(event) {
      // console.log(fetchInitialValues());
      return this.dateFns.toDate(this.getStartTime(event));
    }
  }, {
    key: "parseEndTime",
    value: function parseEndTime(event) {
      return this.dateFns.toDate(this.getEndTime(event));
    }
  }, {
    key: "getStartTimesOfDay",
    value: function getStartTimesOfDay(event) {
      return this.dateFns.format(this.getStartTime(event), 'BBBB p');
    }
  }]);

  return CalendarEvent;
}();

exports.default = CalendarEvent;