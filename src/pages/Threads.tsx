import ThreadCard from "../components/thread/ThreadCard";
import { threadsSorter } from "../helpers/threadsSorter";
import { threads, users } from "../data/dummy";
import ThreadsFilter from "../components/thread/ThreadsFilter";

const Threads = () => {
  const descendedThreads = threadsSorter(threads);
  const usersData = users;

  return (
    <div className="w-full p-4">
      <h1 className="mb-6 text-4xl font-bold">Discussions</h1>
      <ThreadsFilter />
      <div className="flex flex-col gap-4">
        {descendedThreads.map((thread) => {
          const user = usersData.find((user) => user.id === thread.ownerId)!;

          return <ThreadCard key={thread.id} {...thread} name={user?.name} />;
        })}
      </div>
    </div>
  );
};

export default Threads;
