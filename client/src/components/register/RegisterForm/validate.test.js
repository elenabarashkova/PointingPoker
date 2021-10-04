import { validate } from './validate';

describe('validate', () => {
  test('validation to work correctly', () => {
    const result = validate({firstName: 'Lena', lastName: 'NotLena', jobPosition: 'Developer'})
    expect(Object.keys(result)).toHaveLength(0);
  });
  test('validate name correctly', () => {
    const result = validate({firstName: '', lastName: 'NotLena', jobPosition: 'Developer'})
    expect(Object.keys(result)).toHaveLength(1);
    expect(result).toEqual({firstName: 'Fill in the field'});
  });
});
