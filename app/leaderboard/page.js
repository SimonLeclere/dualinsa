"use client";

import React from "react";
import useSwr from "swr";
import LeaderboardProfile from "./leaderboardProfile";
import BottomBar from "../components/BottomBar";
import NavBar from "../components/NavBar";

import { IconLeagueSvg } from "../components/icons/LeaderboardSvg";

const LeaderboardList = ({ leaderboardUsers }) => {

  leaderboardUsers = leaderboardUsers.sort((a, b) => b.score - a.score);

  return (
    <>
      <div className="w-full md:ml-1 lg:ml-1 ">
        {leaderboardUsers.map((user, i) => (
          <LeaderboardProfile
            key={user.username}
            place={i + 1}
            username={user.username}
            xp={user.score}
            // condition={user.username === currentUser}
            condition={false}
          />
        ))}
      </div>
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

  const { data, error, isLoading } = useSwr('/api/leaderboard', (url) => fetch(url).then((res) => res.json()));
  const { data: league, error: errorLeague, isLoading: isLoadingLeague } = useSwr('/api/users/league', (url) => fetch(url).then((res) => res.json()));

  // TODO

  return (
    <>
      <NavBar />

      <div className="flex justify-center gap-3 pt-14 md:ml-24 md:p-6 md:pt-10 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-xl flex-col items-center gap-5 pb-28 md:px-5">
          {
            <>
              <div className="sticky top-0 -mt-14 flex w-full flex-col items-center gap-2 sm:gap-5 bg-white pt-20 sm:pt-28">
                { isLoading && <div>Chargement...</div>}
                { error && <div>Erreur: {error.message}</div>}
                {
                  league  && <>
                  <div className="flex items-center gap-5">
                  {leaderboardLeague(league?.league)}
                </div>
                <h1 className="text-2xl font-bold">{league?.league || "x"} League</h1>
                <div className="flex w-full flex-col items-center gap-1">
                  <p className="text-sm sm:text-lg text-gray-500">
                    Vous êtes dans le top 20% des joueurs
                  </p>
                  <time className="font-bold text-yellow-400">
                    Continuez comme ça !
                  </time>
                </div>
                <div className="w-full border-b-2 border-gray-200"></div>
                </>
                }
              </div>
              {
                data && <LeaderboardList leaderboardUsers={data} />
              }
            </>
          }
          <BottomBar selectedTab="leaderboard" />
        </div>
      </div>
    </>
  );
}
