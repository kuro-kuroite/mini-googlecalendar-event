"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _google_calendar = require("../../atoms/google_calendar");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CalendarEventList =
/*#__PURE__*/
function () {
  function CalendarEventList() {
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$region = _ref.region,
        region = _ref$region === void 0 ? 'US' : _ref$region;

    _classCallCheck(this, CalendarEventList);

    this.events = events;
    this.event = new _google_calendar.CalendarEvent({
      region: region
    });
  }

  _createClass(CalendarEventList, [{
    key: "concatEvents",
    value: function concatEvents() {
      var _this = this;

      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.events;
      var createEventStringCallback = arguments.length > 1 ? arguments[1] : undefined;
      return events.reduceRight(function (acc, event) {
        var startTimesOfDay = _this.event.getStartTimesOfDay(event);

        var place = _this.event.getPlace(event);

        var name = _this.event.getName(event);

        return "".concat(createEventStringCallback(name, place, startTimesOfDay)).concat(acc);
      }, '');
    }
  }, {
    key: "filterEventList",
    value: function filterEventList() {
      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.events;
      var filterConditionCallback = arguments.length > 1 ? arguments[1] : undefined;
      return events.filter(function (event) {
        return filterConditionCallback(event);
      });
    }
  }, {
    key: "dropEventList",
    value: function dropEventList() {
      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.events;
      var filterConditionCallback = arguments.length > 1 ? arguments[1] : undefined;
      return events.filter(function (event) {
        return !filterConditionCallback(event);
      });
    }
  }]);

  return CalendarEventList;
}();

exports.default = CalendarEventList;