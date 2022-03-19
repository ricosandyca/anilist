export enum AnimeSeason {
  WINTER = 'winter',
  SPRING = 'spring',
  SUMMER = 'summer',
  FALL = 'fall',
}

// month count starts at 0 = january
export const animeSeasonRangeInMonth = {
  [AnimeSeason.WINTER]: [0, 1, 2],
  [AnimeSeason.SPRING]: [3, 4, 5],
  [AnimeSeason.SUMMER]: [6, 7, 8],
  [AnimeSeason.FALL]: [9, 10, 11],
};

/**
 * Determine which season by the given month
 * month starts at 0 (january)
 *
 * @param month - month in number
 * @returns season
 */
export function determineAnimeSeasonByMonth(
  month: number,
): AnimeSeason | undefined {
  for (const [season, months] of Object.entries(animeSeasonRangeInMonth))
    if (months.includes(month)) return season as AnimeSeason;
  return undefined;
}

/**
 * Check if the given season is valid
 *
 * @param season - string of season to check
 * @param useSensitiveCase - if false, the lower or upper cases will be ignored
 * @returns valid or not
 */
export function isValidSeason(
  season: string,
  useSensitiveCase = false,
): boolean {
  let validSeasons = Object.keys(AnimeSeason);
  if (!useSensitiveCase) {
    validSeasons = validSeasons.map((s) => s.toUpperCase());
    season = season.toUpperCase();
  }
  return validSeasons.includes(season);
}

/**
 * Get season dash year format by the given date
 *
 * @param d - date to conver
 * @returns season dash year (eg. winter-2022)
 */
export function getSeasonDashYear(d = new Date()): string {
  // get month and year
  const month = d.getMonth();
  const year = d.getFullYear();

  // determine season
  const season = determineAnimeSeasonByMonth(month);

  return `${season}-${year}`;
}

/**
 * Extract season dash year format to object
 *
 * @param seasonDashYear - string to extract
 * @returns season and year object
 */
export function extractSeasonDashYear(seasonDashYear: string) {
  const seasonDashYearArr = (seasonDashYear || '').split('-');
  const season = seasonDashYearArr[0];
  const year = +seasonDashYearArr[1];

  if (!season || !year) return undefined;
  return { season, year };
}
