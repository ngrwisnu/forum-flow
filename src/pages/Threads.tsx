import ThreadCard from "../components/thread/ThreadCard";
import { threads, users } from "../data/dummy";
import ThreadsFilter from "../components/thread/ThreadsFilter";
import { Link, useSearchParams } from "react-router-dom";
import { threadsFilter } from "../helpers/threadsFilter";
import { itemsSorter } from "../helpers/itemsSorter";
import { totalVotes } from "../helpers/vote";

const Threads = () => {
  const [searchParams] = useSearchParams();

  const sortedByQueryParam = searchParams.get("sort") || "newest";
  const categoryQueryParam = searchParams.get("category") || "all";

  const filteredThreads = threadsFilter(threads, categoryQueryParam);
  const sortedThreads = itemsSorter(
    filteredThreads,
    sortedByQueryParam as "newest" | "highest_votes",
    totalVotes,
  );
  const usersData = users;

  return (
    <div className="w-full p-4">
      <div className="mb-6 border-b border-slate-200 pb-3">
        <h1 className="mb-3 text-4xl font-bold">Discussions</h1>
        <Link to="/threads/create" className="btn btn-secondary">
          Create new discussion
        </Link>
      </div>
      <ThreadsFilter />
      <div className="flex flex-col gap-4">
        {!sortedThreads.length && (
          <p className="text-center">No results found</p>
        )}
        {sortedThreads.map((thread) => {
          const user = usersData.find((user) => user.id === thread.ownerId)!;

          return <ThreadCard key={thread.id} {...thread} name={user?.name} />;
        })}
      </div>
    </div>
  );
};

export default Threads;
