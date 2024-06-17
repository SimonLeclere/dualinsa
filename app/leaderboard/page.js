import React from "react";

import LeaderboardProfile  from "/app/leaderboard/leaderboardProfile";
import { useLeaderboardUsers } from "/app/leaderboard/useLeaderBoard"; 
import BottomBar from "../components/BottomBar";

const Leaderboard = () => {
  const leaderboardLeague = "Bronze League";
  const leaderboardUsers = useLeaderboardUsers();

  return (
    <div>
      {/* <div className="sticky top-0 -mt-14 flex w-full flex-col items-center gap-5 bg-white pt-14">
        <div className="flex items-center gap-5">
          <BronzeLeagueSvg className="h-fit w-20" />
        </div>
        <h1 className="text-2xl font-bold">{leaderboardLeague}</h1>
      
        <div className="w-full border-b-2 border-gray-200"></div>
      </div> */}
      <div className="w-full md:ml-24 lg:ml-64">
        {leaderboardUsers.map((user, i) => (
          <LeaderboardProfile
            key={user.username} 
            place={i + 1}
            username={user.username} 
            xp={user.score} 
          />
        ))}
      </div>
      <BottomBar selectedTab="leaderboard" />
    </div>
  );
};

export default Leaderboard;
