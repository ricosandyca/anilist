import { formatNumber } from '../number';

describe('formatNumber function testing', () => {
  it('Should return K as thousand format number', () => {
    const str = formatNumber(1240, 1);
    expect(str).toMatch(/1.2k/i);
  });

  it('Should return M as million format number', () => {
    const str = formatNumber(6400500, 2);
    expect(str).toMatch(/6.4m/i);
  });

  it('Should return valid equal number', () => {
    const str = formatNumber(112, 2);
    expect(str).toMatch(/112/i);
  });
});
