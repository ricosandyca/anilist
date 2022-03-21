import { normalizeHTML } from '../html';

describe('normalizeHTML function testing', () => {
  it('Should return normalized html', () => {
    const str = normalizeHTML('hello<br> world </br>&nbsp;123');
    expect(str).toBe('hello world 123');
  });

  it('Should return valid string', () => {
    const str = normalizeHTML('hello<br>world</br>&nbsp;123');
    expect(typeof str).toBe('string');
  });
});
