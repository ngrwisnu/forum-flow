/*
- should return all threads when keyword is "all"
- should return threads filtered by category
- should return an empty array if no threads match the category
*/

import { describe, expect, test } from 'vitest';
import { threadsFilter } from '../threadsFilter';
import { ThreadsResponse } from '../../types/thread';

describe('threadsFilter', () => {
  const mockThreads: ThreadsResponse = [
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
  ];

  test('should return all threads when keyword is "all"', () => {
    const result = threadsFilter(mockThreads, 'all');

    expect(result).toEqual(mockThreads);
  });

  test('should return threads filtered by category', () => {
    const result = threadsFilter(mockThreads, 'general');

    expect(result).toEqual([
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
    ]);
  });

  test('should return an empty array if no threads match the category', () => {
    const result = threadsFilter(mockThreads, 'notexist');

    expect(result).toEqual([]);
  });
});
