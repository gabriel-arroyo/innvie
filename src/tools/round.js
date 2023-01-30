/* eslint-disable no-param-reassign */
export default function roundTo(n, digits) {
  let negative = false;
  if (digits === undefined) {
    digits = 0;
  }
  if (n < 0) {
    negative = true;
    n *= -1;
  }
  const multiplicator = 10 ** digits;
  n = parseFloat((n * multiplicator).toFixed(11));
  n = (Math.round(n) / multiplicator).toFixed(digits);
  if (negative) {
    n = (n * -1).toFixed(digits);
  }
  return n;
}
