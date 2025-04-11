/*
* totalVotes
- should return the sum of upVote and downVote
- should throw error when the input is negative value
* totalUpVotes
- should return the difference between upVote and downVote
- should throw error when the input is negative value
*/

import { describe, test, expect } from 'vitest';
import { totalVotes, totalUpVotes } from '../vote';

describe('totalVotes', () => {
  test('should return the sum of upVote and downVote', () => {
    expect(totalVotes(5, 3)).toBe(8);
    expect(totalVotes(0, 0)).toBe(0);
    expect(totalVotes(10, 5)).toBe(15);
  });

  test('should throw error when the input is negative value', () => {
    expect(() => totalVotes(10, -5)).toThrow('Negative value is not allowed.');
    expect(() => totalVotes(-10, 5)).toThrow('Negative value is not allowed.');
  });
});

describe('totalUpVotes', () => {
  test('should return the difference between upVote and downVote', () => {
    expect(totalUpVotes(5, 3)).toBe(2);
    expect(totalUpVotes(0, 0)).toBe(0);
    expect(totalUpVotes(10, 5)).toBe(5);
  });

  test('should throw error when the input is negative value', () => {
    expect(() => totalUpVotes(10, -5)).toThrow(
      'Negative value is not allowed.',
    );
    expect(() => totalUpVotes(-10, 5)).toThrow(
      'Negative value is not allowed.',
    );
  });
});
