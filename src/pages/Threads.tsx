import ThreadCard from "../components/thread/ThreadCard";
import ThreadsFilter from "../components/thread/ThreadsFilter";
import { Link, useSearchParams } from "react-router-dom";
import { threadsFilter } from "../helpers/threadsFilter";
import { itemsSorter } from "../helpers/itemsSorter";
import { totalVotes } from "../helpers/vote";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { asyncGetThreads } from "../store/thread/action";
import { asyncGetUsers } from "../store/users/action";

const Threads = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { thread, users } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(asyncGetThreads());
    dispatch(asyncGetUsers());
  }, [dispatch]);

  const [searchParams] = useSearchParams();

  const sortedByQueryParam = searchParams.get("sort") || "newest";
  const categoryQueryParam = searchParams.get("category") || "all";

  const filteredThreads = threadsFilter(thread.threads, categoryQueryParam);
  const sortedThreads = itemsSorter(
    filteredThreads,
    sortedByQueryParam as "newest" | "highest_votes",
    totalVotes,
  );

  return (
    <div className="w-full p-4">
      <div className="mb-6 border-b border-slate-200 pb-3">
        <h1 className="mb-3 text-4xl font-bold">Discussions</h1>
        <Link to="/threads/create" className="btn btn-secondary">
          Create new discussion
        </Link>
      </div>
      <ThreadsFilter categories={thread.threadCategories} />
      <div className="flex flex-col gap-4">
        {!sortedThreads.length && (
          <p className="text-center">No results found</p>
        )}
        {sortedThreads.map((thread) => {
          const user = users.users.find((user) => user.id === thread.ownerId)!;

          return (
            <ThreadCard
              key={thread.id}
              {...thread}
              avatar={user?.avatar}
              name={user?.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Threads;
