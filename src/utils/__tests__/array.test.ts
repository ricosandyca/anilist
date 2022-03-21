import { createArray } from '../array';

describe('createArray function testing', () => {
  it('Should create array with valid length', () => {
    const arr = createArray(5);
    expect(arr).toHaveLength(5);
  });

  it('Should create array that starts with 0', () => {
    const arr = createArray(6);
    expect(arr[0]).toBe(0);
  });

  it('Should create array that ends with n-1', () => {
    const arr = createArray(8);
    expect(arr).toHaveLength(8);
    expect(arr[7]).toBe(7);
  });
});
