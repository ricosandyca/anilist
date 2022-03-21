import { getContrastTextColor } from '../color';

describe('getContrastTextColor function testing', () => {
  it('Should return contrast light color', () => {
    const color = getContrastTextColor('#102221', {
      light: 'white',
      dark: 'black',
    });
    expect(color).toBe('white');
  });

  it('Should return contrast dark color', () => {
    const color = getContrastTextColor('#bce3e1', {
      light: 'white',
      dark: 'black',
    });
    expect(color).toBe('black');
  });
});
