"use client";


import React from "react";

import { useEffect, useRef } from "react";
import LeaderboardProfile  from "/app/leaderboard/leaderboardProfile";
import { useLeaderboardUsers } from "/app/leaderboard/useLeaderBoard"; 
import BottomBar from "../components/BottomBar";

import { IconLeagueSvg } from "../components/icons/LeaderboardSvg";


const LeaderboardPlayer = () => {
  const leaderboardLeague = "Bronze League";
  const leaderboardUsers = useLeaderboardUsers();

  const userRefs = useRef([]);
  const currentUser = "Alice"; // Remplacez ceci par la requête API pour obtenir l'utilisateur connecté

  useEffect(() => {
    const currentUserIndex = leaderboardUsers.findIndex(user => user.username === currentUser);
    if (currentUserIndex !== -1 && userRefs.current[currentUserIndex]) {
      userRefs.current[currentUserIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [leaderboardUsers, currentUser]);

  return (
    <div>
      <div className="w-full md:ml-1 lg:ml-1 ">
        {leaderboardUsers.map((user, i) => (
          <LeaderboardProfile
            key={user.username} 
            ref={el => (userRefs.current[i] = el)}
            place={i + 1}
            username={user.username} 
            xp={user.score} 
            condition={user.username === currentUser} //Remplacer Alice par la reqûete API de l'utilisateur connecté 
          />
        ))}
      </div>
      <BottomBar selectedTab="leaderboard" />
    </div>
  );
}


function leaderboardLeague(leagueName) {
  switch (leagueName) {
    case "Bronze":
      return (
        <>
          <IconLeagueSvg leagueName="Bronze" plume={true} lock={false} className="h-fit w-20" />
          <IconLeagueSvg leagueName="" plume={false} lock={true} />
          <IconLeagueSvg leagueName="" plume={false} lock={true} />
          <IconLeagueSvg leagueName="" plume={false} lock={true} />
        </>
      );
    case "Silver":
      return (
        <>
          <IconLeagueSvg leagueName="Bronze" plume={false} lock={false} />
          <IconLeagueSvg leagueName="Silver" plume={true} lock={false} className="h-fit w-20" />
          <IconLeagueSvg leagueName="" plume={false} lock={true} />
          <IconLeagueSvg leagueName="" plume={false} lock={true} />
        </>
      );
    case "Gold":
      return (
        <>
          <IconLeagueSvg leagueName="Bronze" plume={false} lock={false} />
          <IconLeagueSvg leagueName="Silver" plume={false} lock={false} />
          <IconLeagueSvg leagueName="Gold" plume={true} lock={false} className="h-fit w-20" />
          <IconLeagueSvg leagueName="" plume={false} lock={true} />
        </>
      );
    case "Diamond":
      return (
        <>
          <IconLeagueSvg leagueName="Bronze" plume={false} lock={false} />
          <IconLeagueSvg leagueName="Silver" plume={false} lock={false} />
          <IconLeagueSvg leagueName="Gold" plume={false} lock={false} />
          <IconLeagueSvg leagueName="Diamond" plume={true} lock={false} className="h-fit w-20" />
        </>
      );
  }
}


export default function LeaderBoard() {
  const league = "Gold"; // TODO : get from API
  const leaderLeague = `${league} League`;

  return (
    <div>
      {/* <LeftBar selectedTab="Leaderboards" /> */}
      <div className="flex justify-center gap-3 pt-14 md:ml-24 md:p-6 md:pt-10 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-xl flex-col items-center gap-5 pb-28 md:px-5">
          {(
            <>
              <div className="sticky top-0 -mt-14 flex w-full flex-col items-center gap-5 bg-white pt-14">
                <div className="flex items-center gap-5">
                  {leaderboardLeague(league)}
                </div>
                <h1 className="text-2xl font-bold">{leaderLeague}</h1>
                <div className="flex w-full flex-col items-center gap-1 pb-5">
                  <p className="text-lg text-gray-500">
                    Top 20 advance to the next league
                  </p>
                  <time className="font-bold text-yellow-400">{"6 days"}</time>
                </div>
                <div className="w-full border-b-2 border-gray-200"></div>
              </div>
                <LeaderboardPlayer />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

