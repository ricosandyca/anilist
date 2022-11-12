/**
 * Number formatting
 * eg. 1200 => 1.2K
 *
 * @param num - number to format
 * @param digits - maximum decimal digit
 * @returns
 */
export function formatNumber(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  // find matches lookup
  const item = lookup.reverse().find(function (item) {
    return num >= item.value;
  });

  // format number
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
}
