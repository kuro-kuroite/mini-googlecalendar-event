"use strict";

var _formatLong = _interopRequireDefault(require("date-fns/locale/ja/_lib/formatLong"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NOTE: 'date-fns/esm/locale/_lib/buildFormatLongFn'
function buildFormatLongFn(args) {
  return function (dirtyOptions) {
    var options = dirtyOptions || {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    return args.formats[width] || args.formats[args.defaultWidth];
  };
} // dirty hack
// from H:mm to H時m分


var timeFormats = {
  full: 'H時mm分ss秒 zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H時m分'
};
_formatLong.default.time = buildFormatLongFn({
  formats: timeFormats,
  defaultWidth: 'full'
});