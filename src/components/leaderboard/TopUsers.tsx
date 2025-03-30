import { Link } from 'react-router-dom';
import defaultImage from '../../assets/default-image.webp';
import { LeaderboardResponse } from '../../types/leaderboard';

const TopUsers = ({ data }: { data: LeaderboardResponse }) => (
    <div className="w-full max-w-[250px] bg-transparent p-4">
      <h3 className="mb-3 text-xl font-medium">Top Users</h3>
      <div className="flex flex-col gap-2">
        {data.map((item, index) => (
          <div
            key={item.user.id}
            className="grid grid-cols-[10%_auto_max-content] gap-2 text-base font-normal"
          >
            <div className="">{index + 1}</div>
            <div className="flex gap-1">
              <img
                src={item.user.avatar || defaultImage}
                alt="profile"
                className="h-6 rounded-full"
              />
              <span>{item.user.name}</span>
            </div>
            <div className="">{item.score}</div>
          </div>
        ))}
      </div>
      <Link
        to="/leaderboards"
        role="button"
        className="btn btn-neutral btn-outline btn-sm mt-4 w-full"
      >
        See leaderboards
      </Link>
    </div>
);

export default TopUsers;
