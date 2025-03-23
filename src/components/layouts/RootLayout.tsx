import TopUsers from "../leaderboard/TopUsers";
import { leaderboards } from "../../data/dummy.ts";
import { Outlet, useLocation } from "react-router-dom";

const RootLayout = () => {
  const location = useLocation();
  const isLeaderboardPage = location.pathname === "/leaderboards";

  const descLeaderboards = leaderboards.sort((a, b) => b.score - a.score);

  return (
    <>
      <main className="grid min-h-svh w-full grid-cols-[20%_minmax(auto,_1280px)_20%] justify-center divide-x-2 divide-slate-200">
        <div className="">1</div>
        <div className="">
          <Outlet />
        </div>
        <div className="flex flex-col">
          {isLeaderboardPage ? null : (
            <div className="mt-auto mb-20">
              <TopUsers data={descLeaderboards} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default RootLayout;
