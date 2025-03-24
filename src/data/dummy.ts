import { ThreadsResponse } from "../types/thread";

export const users = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
  },
  {
    id: "user-3",
    name: "Alice Johnson",
    email: "alice@example.com",
  },
  {
    id: "user-4",
    name: "Bob Brown",
    email: "bob@example.com",
  },
  {
    id: "user-5",
    name: "Charlie Davis",
    email: "charlie@example.com",
  },
];

export const threads: ThreadsResponse = [
  {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2024-06-21T07:00:00.000Z",
    ownerId: "user-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: "thread-2",
    title: "Thread Kedua",
    body: "Ini adalah thread kedua",
    category: "Technology",
    createdAt: "2024-12-22T08:30:00.000Z",
    ownerId: "user-2",
    upVotesBy: ["user-3"],
    downVotesBy: [],
    totalComments: 2,
  },
  {
    id: "thread-3",
    title: "Thread Ketiga",
    body: "Ini adalah thread ketiga",
    category: "Health",
    createdAt: "2025-01-23T09:15:00.000Z",
    ownerId: "user-3",
    upVotesBy: ["user-1", "user-2"],
    downVotesBy: ["user-4"],
    totalComments: 5,
  },
  {
    id: "thread-4",
    title: "Thread Keempat",
    body: "Ini adalah thread keempat",
    category: "Education",
    createdAt: "2024-06-24T10:45:00.000Z",
    ownerId: "user-4",
    upVotesBy: ["user-5"],
    downVotesBy: [],
    totalComments: 1,
  },
  {
    id: "thread-5",
    title: "Thread Kelima",
    body: "Ini adalah thread kelima",
    category: "Entertainment",
    createdAt: "2025-03-23T11:20:00.000Z",
    ownerId: "user-5",
    upVotesBy: [],
    downVotesBy: ["user-2", "user-3"],
    totalComments: 3,
  },
];

export const leaderboards = [
  {
    user: {
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
    },
    score: 10,
  },
  {
    user: {
      id: "user-2",
      name: "Jane Smith",
      email: "jane@example.com",
    },
    score: 20,
  },
  {
    user: {
      id: "user-3",
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    score: 15,
  },
  {
    user: {
      id: "user-4",
      name: "Bob Brown",
      email: "bob@example.com",
    },
    score: 25,
  },
  {
    user: {
      id: "user-5",
      name: "Charlie Davis",
      email: "charlie@example.com",
    },
    score: 30,
  },
  {
    user: {
      id: "user-6",
      name: "Diana Evans",
      email: "diana@example.com",
    },
    score: 18,
  },
  {
    user: {
      id: "user-7",
      name: "Ethan Harris",
      email: "ethan@example.com",
    },
    score: 22,
  },
  {
    user: {
      id: "user-8",
      name: "Fiona Green",
      email: "fiona@example.com",
    },
    score: 28,
  },
  {
    user: {
      id: "user-9",
      name: "George Hill",
      email: "george@example.com",
    },
    score: 12,
  },
  {
    user: {
      id: "user-10",
      name: "Hannah Lee",
      email: "hannah@example.com",
    },
    score: 35,
  },
];
