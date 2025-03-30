import { ThreadsResponse } from '../types/thread';

export const threadsFilter = (threads: ThreadsResponse, keyword: string) => {
  if (keyword === 'all') {
    return threads;
  }

  return threads.filter((thread) => thread.category.toLowerCase() === keyword);
};
