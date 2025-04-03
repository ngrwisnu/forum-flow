import { describe, expect, test } from 'vitest';
import { formatCreatedTime } from '../formatCreatedTime';

describe('formatCreatedTime', () => {
  test('should return "just now"', () => {
    const now = new Date().toISOString();
    expect(formatCreatedTime(now)).toBe('just now');
  });

  test('should return "a second ago"', () => {
    const oneSecondAgo = new Date(Date.now() - 1000).toISOString();
    expect(formatCreatedTime(oneSecondAgo)).toBe('a second ago');
  });

  test('should return "a minute ago"', () => {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
    expect(formatCreatedTime(oneMinuteAgo)).toBe('a minute ago');
  });

  test('should return "2 hours ago"', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    expect(formatCreatedTime(twoHoursAgo)).toBe('2 hours ago');
  });

  test('should return "2 days ago"', () => {
    const twoDaysAgo = new Date(
      Date.now() - 2 * 24 * 60 * 60 * 1000,
    ).toISOString();
    expect(formatCreatedTime(twoDaysAgo)).toBe('2 days ago');
  });

  test('should return "a month ago"', () => {
    const oneMonthAgo = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000,
    ).toISOString();
    expect(formatCreatedTime(oneMonthAgo)).toBe('a month ago');
  });

  test('should return "a year ago"', () => {
    const oneYearAgo = new Date(
      Date.now() - 365 * 24 * 60 * 60 * 1000,
    ).toISOString();
    expect(formatCreatedTime(oneYearAgo)).toBe('a year ago');
  });
});
