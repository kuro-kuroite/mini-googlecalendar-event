import formatLong from 'date-fns/locale/ja/_lib/formatLong';

// NOTE: 'date-fns/esm/locale/_lib/buildFormatLongFn'
function buildFormatLongFn(args) {
  return function(dirtyOptions) {
    const options = dirtyOptions || {};
    const width = options.width ? String(options.width) : args.defaultWidth;
    return args.formats[width] || args.formats[args.defaultWidth];
  };
}

// dirty hack
// from H:mm to H時m分
const timeFormats = {
  full: 'H時mm分ss秒 zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H時m分',
};

formatLong.time = buildFormatLongFn({
  formats: timeFormats,
  defaultWidth: 'full',
});
