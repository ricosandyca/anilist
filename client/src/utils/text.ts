/**
 * Capitalize text
 *
 * @param str - text to capitalizeed
 * @returns capitalized text
 */
export function capitalizeText(str: string) {
  const strArr = str.split(' ');
  const capitalizedStrArr: string[] = [];
  for (const text of strArr)
    capitalizedStrArr.push(text.charAt(0).toUpperCase() + text.slice(1));

  return capitalizedStrArr.join(' ');
}
