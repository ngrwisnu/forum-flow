import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TopUsers from '../leaderboard/TopUsers';
import Header from '../header/Header.tsx';
import { AppDispatch, RootState } from '../../store/index.ts';
import { asyncGetLeaderboard } from '../../store/leaderboard/action.ts';
import ProgressBar from '../ui/ProgressBar.tsx';

const RootLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { auth, leaderboard } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(asyncGetLeaderboard());
  }, [dispatch]);

  const location = useLocation();
  const isLeaderboardPage = location.pathname === '/leaderboards';

  const sortedLeaderboard = [...leaderboard.leaderboard].sort(
    (a, b) => b.score - a.score,
  );

  return (
    <>
      <ProgressBar />
      <Header isAuthenticated={auth.isAuthenticated} user={auth.user} />
      <main className="grid min-h-svh w-full grid-cols-1 justify-center divide-x-2 divide-slate-200 md:grid-cols-[20%_1fr_20%]">
        <div className="hidden md:block"></div>
        <div>
          <Outlet />
        </div>
        <div className="sticky top-0 hidden max-h-fit min-h-screen flex-col md:flex">
          {isLeaderboardPage ? null : (
            <div className="mt-auto mb-20">
              <TopUsers data={sortedLeaderboard} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default RootLayout;
