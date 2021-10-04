import { calcTime } from './calcTime';

describe('helpers', () => {
  test('calcTime should work correctly', () => {
    const expected = {
      minutes: 2,
      seconds: 10,
    };
    const time = calcTime(130);
    expect(time).toEqual(expect.objectContaining(expected));
  });
});
