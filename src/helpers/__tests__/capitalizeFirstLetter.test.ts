import { describe, test, expect } from 'vitest';
import { capitalizedFirstLetter } from '../capitalizeFirstLetter';

describe('capitalizedFirstLetter', () => {
  test('should capitalize the first letter of a single word', () => {
    expect(capitalizedFirstLetter('hello')).toBe('Hello');
  });

  test('should return an empty string if input is empty', () => {
    expect(capitalizedFirstLetter('')).toBe('');
  });

  test('should not modify a word that already starts with an uppercase letter', () => {
    expect(capitalizedFirstLetter('hello World')).toBe('Hello World');
  });
});
