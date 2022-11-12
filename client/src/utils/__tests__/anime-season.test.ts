import {
  determineAnimeSeasonByMonth,
  extractSeasonDashYear,
  getSeasonDashYear,
  getSeasonSelections,
  getValidMediaFormats,
  isValidSeason,
} from '../anime-season';
import { MediaFormat, MediaSeason } from '~/types/anilist-graphql';

describe('determineAnimeSeasonByMonth function testing', () => {
  it('Should return winter season', () => {
    const season = determineAnimeSeasonByMonth(2);
    expect(season).toMatch(/winter/gi);
  });

  it('Should return spring season', () => {
    const season = determineAnimeSeasonByMonth(4);
    expect(season).toMatch(/spring/gi);
  });

  it('Should return summer season', () => {
    const season = determineAnimeSeasonByMonth(6);
    expect(season).toMatch(/summer/gi);
  });

  it('Should return fall season', () => {
    const season = determineAnimeSeasonByMonth(11);
    expect(season).toMatch(/fall/gi);
  });

  it('Should return invalid season', () => {
    const season = determineAnimeSeasonByMonth(12);
    expect(season).toBeUndefined();
  });
});

describe('extractSeasonDashYear function testing', () => {
  it('Should return valid winter season and year of string extraction', () => {
    const s = extractSeasonDashYear('WinTer-2022');
    expect(s?.season).toMatch(/winter/gi);
    expect(s?.year).toBe(2022);
  });

  it('Should return invalid season of extraction data', () => {
    const s = extractSeasonDashYear('WinTera-2022');
    expect(s).toBeUndefined();
  });

  it('Should return invalid year of extraction data', () => {
    const s = extractSeasonDashYear('WinTer-2022a');
    expect(s).toBeUndefined();
  });
});

describe('isValidSeason function testing', () => {
  it('Should return true for valid season', () => {
    const isValid = isValidSeason('winTer');
    expect(isValid).toBeTruthy();
  });

  it('Should check the season sensitively', () => {
    const isValid = isValidSeason('Winter', true);
    expect(isValid).toBeTruthy();
  });

  it('Should return false for invalid season', () => {
    const isValid = isValidSeason('wintera');
    expect(isValid).toBeFalsy();
  });

  it('Should return false for invalid season in sensitive comparison', () => {
    const isValid = isValidSeason('WinteR', true);
    expect(isValid).toBeFalsy();
  });
});

describe('getSeasonDashYear function testing', () => {
  it('Should return string in season-year format', () => {
    const seasonDashYear = getSeasonDashYear(new Date(2022, 2, 1));
    expect(seasonDashYear).toMatch(/winter-2022/gi);
  });

  it('Should return string in season-year format with overrided season', () => {
    const seasonDashYear = getSeasonDashYear(
      new Date(2022, 2, 1),
      MediaSeason.Fall,
    );
    expect(seasonDashYear).toMatch(/fall-2022/gi);
  });
});

describe('getSeasonSelections function testing', () => {
  it('Should return valid four season selections', () => {
    const d = new Date(2022, 1, 15);
    const selections = getSeasonSelections(d);

    expect(selections).toHaveLength(4);
  });

  it('Should return valid season selections in the same year', () => {
    const d = new Date(2022, 5, 20);
    const selections = getSeasonSelections(d);

    expect(selections).toMatchObject([
      { season: MediaSeason.Winter, year: 2022 },
      { season: MediaSeason.Spring, year: 2022 },
      { season: MediaSeason.Summer, year: 2022 },
      { season: MediaSeason.Fall, year: 2022 },
    ]);
  });

  it('Should return valid season selections in different years', () => {
    const d = new Date(2022, 1, 15);
    const selections = getSeasonSelections(d);

    expect(selections).toMatchObject([
      { season: MediaSeason.Winter, year: 2022 },
      { season: MediaSeason.Spring, year: 2022 },
      { season: MediaSeason.Summer, year: 2022 },
      { season: MediaSeason.Fall, year: 2021 },
    ]);
  });
});

describe('getValidAnimeFormats function testing', () => {
  it('Should return array of enums of media formats', () => {
    const enumFormats = getValidMediaFormats('movie-tv');
    expect(enumFormats).toHaveLength(2);
    expect(enumFormats).toMatchObject([MediaFormat.Movie, MediaFormat.Tv]);
  });

  it('Should return array of enums of media formats on one of them is invalid', () => {
    const enumFormats = getValidMediaFormats('special-tav-ona');
    expect(enumFormats).toHaveLength(2);
    expect(enumFormats).toMatchObject([MediaFormat.Special, MediaFormat.Ona]);
  });
});
