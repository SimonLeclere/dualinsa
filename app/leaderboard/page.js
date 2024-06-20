"use client";

import React from "react";

import { useEffect, useRef } from "react";
import LeaderboardProfile from "../leaderboard/leaderboardProfile";
import { useLeaderboardUsers } from "/app/leaderboard/useLeaderBoard";
import BottomBar from "../components/BottomBar";
import NavBar from "../components/NavBar";

import { IconLeagueSvg } from "../components/icons/LeaderboardSvg";

const LeaderboardPlayer = () => {
  const leaderboardUsers = useLeaderboardUsers();

  const userRefs = useRef([]);
  const currentUser = "Alice"; // Remplacez ceci par la requête API pour obtenir l'utilisateur connecté

  useEffect(() => {
    const currentUserIndex = leaderboardUsers.findIndex(
      (user) => user.username === currentUser
    );
    if (currentUserIndex !== -1 && userRefs.current[currentUserIndex]) {
      userRefs.current[currentUserIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [leaderboardUsers, currentUser]);

  return (
    <>
      <div className="w-full md:ml-1 lg:ml-1 ">
        {leaderboardUsers.map((user, i) => (
          <LeaderboardProfile
            key={user.username}
            ref={(el) => (userRefs.current[i] = el)}
            place={i + 1}
            username={user.username}
            xp={user.score}
            condition={user.username === currentUser} //Remplacer Alice par la reqûete API de l'utilisateur connecté
          />
        ))}
      </div>
      <BottomBar selectedTab="leaderboard" />
    </>
  );
};

function leaderboardLeague(leagueName) {
  const leagues = ["Bronze", "Silver", "Gold", "Diamond"];
  return (
    <>
      {leagues.map((league, index) => (
        <IconLeagueSvg
          key={league}
          leagueName={
            league === leagueName
              ? league
              : index < leagues.indexOf(leagueName)
              ? league
              : ""
          }
          plume={league === leagueName}
          lock={index >= leagues.indexOf(leagueName) + 1}
          className={league === leagueName ? "h-fit w-16 sm:w-20" : ""}
        />
      ))}
    </>
  );
}

export default function LeaderBoard() {
  const league = "Gold"; // TODO : get from API
  const leaderLeague = `${league} League`;

  return (
    <>
      <NavBar />

      <div className="flex justify-center gap-3 pt-14 md:ml-24 md:p-6 md:pt-10 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-xl flex-col items-center gap-5 pb-28 md:px-5">
          {
            <>
              <div className="sticky top-0 -mt-14 flex w-full flex-col items-center gap-2 sm:gap-5 bg-white pt-20 sm:pt-28">
                <div className="flex items-center gap-5">
                  {leaderboardLeague(league)}
                </div>
                <h1 className="text-2xl font-bold">{leaderLeague}</h1>
                <div className="flex w-full flex-col items-center gap-1">
                  <p className="text-sm sm:text-lg text-gray-500">
                    Vous êtes dans le top 20% des joueurs
                  </p>
                  <time className="font-bold text-yellow-400">
                    Continuez comme ça !
                  </time>
                </div>
                <div className="w-full border-b-2 border-gray-200"></div>
              </div>
              <LeaderboardPlayer />
            </>
          }
        </div>
      </div>
    </>
  );
}
