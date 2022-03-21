import { convertFuzzyDateToDate } from '../date';

describe('convertFuzzyDateToDate function testing', () => {
  it('Should return valid javascript date', () => {
    const d = convertFuzzyDateToDate({ day: 1, month: 2, year: 2022 });
    expect(d instanceof Date).toBeTruthy();
  });

  it('Should return undefined data', () => {
    const d = convertFuzzyDateToDate({ day: 4 });
    expect(d).toBeUndefined();
  });

  it('Should return valid day', () => {
    const d = convertFuzzyDateToDate({ day: 4, month: 2, year: 2022 });
    expect(d?.getDate()).toBe(4);
  });

  it('Should return valid month', () => {
    const d = convertFuzzyDateToDate({ day: 1, month: 8, year: 2024 });
    expect(d?.getMonth()).toBe(8);
  });

  it('Should return valid year', () => {
    const d = convertFuzzyDateToDate({ day: 1, month: 11, year: 2000 });
    expect(d?.getFullYear()).toBe(2000);
  });
});
