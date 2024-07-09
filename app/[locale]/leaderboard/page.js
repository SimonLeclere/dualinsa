"use client";

import { useEffect, useRef } from "react";
import useSwr from "swr";
import LeaderboardProfile from "./leaderboardProfile";
import BottomBar from "../../components/BottomBar";
import NavBar from "../../components/NavBar";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { IconLeagueSvg } from "../../components/icons/LeaderboardSvg";

const LeaderboardList = ({ leaderboardUsers, currentUserId }) => {

  leaderboardUsers = leaderboardUsers.sort((a, b) => b.score - a.score);

  const userRefs = useRef([]);

  useEffect(() => {
    const currentUserIndex = leaderboardUsers.findIndex(user => user.id === currentUserId);
    if (currentUserIndex !== -1 && userRefs.current[currentUserIndex]) {
      userRefs.current[currentUserIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [leaderboardUsers, currentUserId]);

  return (
    <>
      <div className="w-full px-2">
        {leaderboardUsers.map((user, i) => (
          <LeaderboardProfile
            key={user.username}
            ref={el => (userRefs.current[i] = el)}
            place={i + 1}
            username={user.username}
            xp={user.score}
            condition={user.id === currentUserId}
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

export default function LeaderBoard({ params }) {

  const t = useTranslations("Leaderboard");

  const { data, error, isLoading } = useSwr(`/api/leaderboard`, (url) => fetch(url).then((res) => res.json()));
  const { data: league, error: errorLeague, isLoading: isLoadingLeague } = useSwr(`/api/users/league`, (url) => fetch(url).then((res) => res.json()));

  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  // calculer le "vous êtes dans le top xx% des joueurs"
  const sortedLeaderboard = data ? data.sort((a, b) => b.score - a.score) : []
  const rank = sortedLeaderboard.findIndex(obj => obj.id === currentUserId);

  let topPourcentage;
  if (rank !== -1) topPourcentage = (rank + 1) / data.length;
  

  return (
    <>
      <NavBar />

      <div className="flex justify-center gap-3 pt-14 md:ml-24 md:p-6 md:pt-10 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-xl flex-col items-center gap-5 pb-28 md:px-5">
          {
            <>
              <div className="sticky top-0 -mt-14 z-10 flex w-full flex-col items-center gap-2 sm:gap-5 bg-white pt-20 sm:pt-28">
                {isLoading && <div>Chargement...</div>}
                {error && <div>Erreur: {error.message}</div>}
                {
                  league && <>
                    <div className="flex items-center gap-5">
                      {leaderboardLeague(league?.league)}
                    </div>
                    <h1 className="text-2xl font-bold">{t('leagueTitle', { league: league?.league || "x" })}</h1>
                    <div className="flex w-full flex-col items-center gap-1">
                      <p className="text-sm sm:text-lg text-gray-500">
                        {t('topPercentGreeting', { topPourcentage })}
                      </p>
                      <time className="font-bold text-yellow-400">
                        {t('greeting')}
                      </time>
                    </div>
                    <div className="w-full border-b-2 border-gray-200"></div>
                  </>
                }
              </div>
              {
                data && <LeaderboardList leaderboardUsers={data} currentUserId={currentUserId} />
              }
            </>
          }
          <BottomBar selectedTab="leaderboard" />
        </div>
      </div>
    </>
  );
}
