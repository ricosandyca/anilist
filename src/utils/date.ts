import { FuzzyDate } from '~/types/anilist-graphql';

/**
 * Convert fuzzy date of object to javascript date
 *
 * @param fDate - fuzzy date to convert
 * @returns date or if the given fuzzy date is invalid, return undefined
 */
export function convertFuzzyDateToDate(fDate: FuzzyDate) {
  if (!fDate.day || !fDate.month || !fDate.year) return undefined;
  return new Date(fDate.year, fDate.month, fDate.day);
}
