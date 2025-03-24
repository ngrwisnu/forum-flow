import ThreadCard from "../components/thread/ThreadCard";
import { threadsSorter } from "../helpers/threadsSorter";
import { threads, users } from "../data/dummy";
import ThreadsFilter from "../components/thread/ThreadsFilter";
import { useSearchParams } from "react-router-dom";
import { threadsFilter } from "../helpers/threadsFilter";

const Threads = () => {
  const [searchParams] = useSearchParams();

  const sortedByQueryParam = searchParams.get("sort");
  const categoryQueryParam = searchParams.get("category");

  const filteredThreads = threadsFilter(threads, categoryQueryParam!);
  const sortedThreads = threadsSorter(filteredThreads, sortedByQueryParam!);
  const usersData = users;

  return (
    <div className="w-full p-4">
      <h1 className="mb-6 text-4xl font-bold">Discussions</h1>
      <ThreadsFilter />
      <div className="flex flex-col gap-4">
        {sortedThreads.length === 0 && (
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
