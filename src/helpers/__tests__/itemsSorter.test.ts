import { describe, expect, test } from 'vitest';
import { itemsSorter } from '../itemsSorter';

describe('itemsSorter', () => {
  const mockVotesCounter = (totalUpVote: number, totalDownVote: number) =>
    totalUpVote - totalDownVote;

  const mockData = [
    {
      id: '1',
      title: 'Thread 1',
      body: 'This is the first thread',
      category: 'General',
      createdAt: '2024-01-04T10:00:00Z',
      ownerId: 'user1',
      upVotesBy: ['user1', 'user2'],
      downVotesBy: ['user3'],
      totalComments: 5,
    },
    {
      id: '2',
      title: 'Thread 2',
      body: 'This is the second thread',
      category: 'Programming',
      createdAt: '2024-12-12T10:00:00Z',
      ownerId: 'user2',
      upVotesBy: ['user1'],
      downVotesBy: [],
      totalComments: 3,
    },
    {
      id: '3',
      title: 'Thread 3',
      body: 'This is the third thread',
      category: 'Technology',
      createdAt: '2025-01-03T10:00:00Z',
      ownerId: 'user3',
      upVotesBy: ['user1', 'user2', 'user3'],
      downVotesBy: ['user4'],
      totalComments: 8,
    },
  ];

  test('should sort items by newest', () => {
    const sorted = itemsSorter(mockData, 'newest');
    expect(sorted[0].id).toBe('3');
    expect(sorted[1].id).toBe('2');
    expect(sorted[2].id).toBe('1');
  });

  test('should sort items by highest votes', () => {
    const sorted = itemsSorter(mockData, 'highest_votes', mockVotesCounter);
    expect(sorted[0].id).toBe('3');
    expect(sorted[1].id).toBe('1');
    expect(sorted[2].id).toBe('2');
  });

  test('should be able to reverse the items', () => {
    const sorted = itemsSorter(mockData);
    expect(sorted[0].id).toBe('3');
    expect(sorted[1].id).toBe('2');
    expect(sorted[2].id).toBe('1');
  });
});
