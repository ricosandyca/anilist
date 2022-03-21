import { capitalizeText } from '../text';

describe('capitalizeText function testing', () => {
  it('Should return capitalized text', () => {
    const str = capitalizeText('hello world');
    expect(str).toBe('Hello World');
  });

  it('Should capitalize first letter of each word only', () => {
    const str = capitalizeText('hEllO World');
    expect(str).toBe('HEllO World');
  });
});
