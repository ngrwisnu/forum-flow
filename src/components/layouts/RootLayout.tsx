import TopUsers from "../leaderboard/TopUsers";
import { leaderboards } from "../../data/dummy.ts";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header.tsx";

const RootLayout = () => {
  const location = useLocation();
  const isLeaderboardPage = location.pathname === "/leaderboards";

  const descLeaderboards = leaderboards.sort((a, b) => b.score - a.score);

  return (
    <>
      <Header />
      <main className="grid min-h-svh w-full grid-cols-[20%_1fr_20%] justify-center divide-x-2 divide-slate-200">
        <div></div>
        <div>
          <Outlet />
        </div>
        <div className="sticky top-0 flex max-h-fit min-h-screen flex-col">
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
