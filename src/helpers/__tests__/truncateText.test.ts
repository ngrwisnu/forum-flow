/*
- should return the original text if its length is less than or equal to maxLength
- should truncate the text and append "..."
- should use the default maxLength of 250 if not provided
- should return an empty string if the input text is empty
*/

import { describe, test, expect } from 'vitest';
import { truncateText } from '../truncateText';

describe('truncateText', () => {
  test('should return the original text if its length is less than or equal to maxLength', () => {
    const text = 'Short text';
    const result = truncateText(text, 20);

    expect(result).toBe(text);
  });

  test('should truncate the text and append "..."', () => {
    const text = 'This is a very long text that needs to be truncated.';
    const result = truncateText(text, 10);

    expect(result).toBe('This is a ...');
  });

  test('should use the default maxLength of 250 if not provided', () => {
    const text = 'A'.repeat(300);
    const result = truncateText(text);

    expect(result).toBe(`${'A'.repeat(250)}...`);
  });

  test('should return an empty string if the input text is empty', () => {
    const text = '';
    const result = truncateText(text, 10);

    expect(result).toBe('');
  });
});
