import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Card, { CardContent, CardFooter } from '../components/ui/Card';
import defaultImage from '../assets/default-image.webp';
import LeaderboardsTable from '../components/leaderboard/LeaderboardsTable';
import { LeaderboardResponse } from '../types/leaderboard';
import { AppDispatch, RootState } from '../store';
import { asyncGetLeaderboard } from '../store/leaderboard/action';

const Leaderboards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const leaderboard = useSelector((state: RootState) => state.leaderboard);

  useEffect(() => {
    dispatch(asyncGetLeaderboard());
  }, [dispatch]);

  const sortedLeaderboard: LeaderboardResponse = [
    ...leaderboard.leaderboard,
  ].sort((a, b) => b.score - a.score);
  const topThree = sortedLeaderboard.slice(0, 3);
  const restLeaderboards = sortedLeaderboard.slice(3);

  return (
    <div className="w-full p-4">
      <h1 className="mb-6 text-4xl font-bold">Leaderboards</h1>
      <div className="flex flex-col gap-4 md:flex-row">
        {topThree.map((item, index) => (
          <Card key={item.user.id} className="flex-1">
            <CardContent className="flex flex-col items-center justify-center p-4">
              <div className="size-12 overflow-hidden rounded-full">
                <img src={item.user.avatar || defaultImage} alt="profile" />
              </div>
              <div className="text-lg font-bold">{item.user.name}</div>
            </CardContent>
            <CardFooter className="stats">
              <div className="stat place-items-center">
                <div className="stat-title">Position</div>
                <div
                  className={`stat-value ${index === 0 && 'text-[#FFD700]'} ${index === 1 && 'text-[#C0C0C0]'} ${index === 2 && 'text-[#CD7F32]'}`}
                >
                  {index + 1}
                </div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Score</div>
                <div className="stat-value">{item.score}</div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-6 w-full">
        <LeaderboardsTable data={restLeaderboards} />
      </div>
    </div>
  );
};

export default Leaderboards;
