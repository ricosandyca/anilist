/**
 * Create an array with n length
 * eg. n = 5 => [0,1,2,3,4]
 *
 * @param n - array length
 * @returns array with n length
 */
export function createArray(n: number) {
  const arr = [];
  for (let i = 0; i < new Array(n).length; i++) arr.push(i);
  return arr;
}
