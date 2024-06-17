
import React from "react";

import LeaderboardProfile  from "/app/leaderboard/leaderboardProfile";
import { useLeaderboardUsers } from "/app/leaderboard/useLeaderBoard"; 
import BottomBar from "../components/BottomBar";

import {
  BronzeLeagueWithSvg,
  BronzeLeagueWithoutSvg,
  SilverLeagueWithSvg,
  SilverLeagueWithoutSvg,
  GoldLeagueWithSvg,
  GoldLeagueWithoutSvg,
  DiamondLeagueWithSvg,
  DiamondLeagueWithoutSvg,
  FirstPlaceSvg,
  LeaderboardBannerSvg,
  LeaderboardExplanationSvg,
  LockedLeaderboardSvg,
  LockedLeagueSvg,
  SecondPlaceSvg,
  ThirdPlaceSvg,
} from "../components/icons/LeaderboardSvg";

import Link from "next/link";
import Image from "next/image";

const LeaderboardPlayer = () => {
  const leaderboardLeague = "Bronze League";
  const leaderboardUsers = useLeaderboardUsers();

  return (
    <div>
      <div className="w-full md:ml-1 lg:ml-1 ">
        {leaderboardUsers.map((user, i) => (
          <LeaderboardProfile
            key={user.username} 
            place={i + 1}
            username={user.username} 
            xp={user.score} 
            condition={user.username == "Alice"} //Remplacer Alice par la reqûete API de l'utilisateur connecté 
          />
        ))}
      </div>
      <BottomBar selectedTab="leaderboard" />
    </div>
  );
}


function leaderboardLeague(league) {
    switch(league) {
        case "Bronze": 
            return (
              <>
                <BronzeLeagueWithSvg className="h-fit w-20" />
                <LockedLeagueSvg />
                <LockedLeagueSvg />
                <LockedLeagueSvg />
              </>
            );
        case "Silver":
            return (
              <>
                <BronzeLeagueWithoutSvg />
                <SilverLeagueWithSvg className="h-fit w-20" />
                <LockedLeagueSvg />
                <LockedLeagueSvg />
              </>
            );
        case "Gold":
            return (
              <>
                <BronzeLeagueWithoutSvg />
                <SilverLeagueWithoutSvg />
                <GoldLeagueWithSvg className="h-fit w-20" />
                <LockedLeagueSvg />
              </>
            );
        case "Diamond":
            return (
              <>
                <BronzeLeagueWithoutSvg />
                <SilverLeagueWithoutSvg />
                <GoldLeagueWithoutSvg />
                <DiamondLeagueWithSvg className="h-fit w-20" />
              </>
            );
    }
}

export default function LeaderBoard() {
  const league = "Bronze"; // TODO : get from API
  const leaderLeague = `${league} League`; // text for the league

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

