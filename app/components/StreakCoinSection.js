"use client";

import FireSvg from "./icons/FireSvg";
import CoinSvg from "./icons/CoinSvg";
import CoinStackSvg from "./icons/CoinStackSvg";

import Calendar from "./Calendar";

import { Link } from "@/navigation";
import { useState } from "react";
import useSwr from "swr";
import { useLocale } from "next-intl";

export default function StreakCoinSection() {

  const locale = useLocale();
  
  const { data: currentStreak, error: streakError, isLoading: streakLoading } = useSwr(`/${locale}/api/users/streaks/maxStreaks`, (url) => fetch(url).then((res) => res.json()));
  const { data: currentScore, error: lingotsError, isLoading: lingotsLoading } = useSwr(`/${locale}/api/users/xp`, (url) => fetch(url).then((res) => res.json()));
  const { data: streaks, error: streaksError, isLoading: streaksLoading } = useSwr(`/${locale}/api/users/streaks`, (url) => fetch(url).then((res) => res.json()));
  
  const [streakShown, setStreakShown] = useState(false);
  const [gemsShown, setGemsShown] = useState(false);

  return (
    <>
      {/* Affichage des streaks et du calendier */}
      <span
        className="relative flex items-center gap-2 rounded-xl p-3 font-bold text-orange-500 hover:bg-gray-100"
        onMouseLeave={() => {
          setStreakShown(false);
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          setStreakShown((x) => !x);
        }}
        role="button"
        tabIndex={0}
      >
        <div className="pointer-events-none">
          <FireSvg empty={currentStreak === 0} />
        </div>
        <span className={currentStreak > 0 ? "text-orange-500" : "text-gray-300"}>
          {currentStreak}
        </span>
        <div
          className="absolute top-full z-10 flex flex-col gap-5 rounded-2xl border-2 border-gray-300 bg-white p-5 text-black"
          style={{
            left: "calc(50% - 200px)",
            width: 400,
            display: streakShown ? "flex" : "none",
          }}
        >
          <h2 className="text-center text-lg font-bold">Streak</h2>
          <p className="text-center text-sm font-normal text-gray-400">
            Votre série sera remise à zéro demain si vous ne vous entraînez
            pas. Attention !
          </p>
          {
            streaksLoading && !streaksError ? <div>Loading...</div> : <Calendar streaks={streaks} />
          }
        </div>
      </span>

      {/* Affichage du nombre de lingot et du coffre*/}
      <span
        className="relative flex items-center gap-2 rounded-xl p-3 font-bold text-red-500 hover:bg-gray-100"
        onMouseLeave={() => setGemsShown(false)}
        onClick={() => setGemsShown((x) => !x)}
        role="button"
        tabIndex={0}
      >
        <CoinSvg empty={currentScore === 0} />
        <span className={currentScore > 0 ? "text-orange-500" : "text-gray-300"}>
          {currentScore}
        </span>
        <div
          className="absolute top-full z-10 flex w-72 items-center gap-3 rounded-2xl border-2 border-gray-300 bg-white p-5"
          style={{
            left: "calc(50% - 150px)",
            display: gemsShown ? "flex" : "none",
          }}
        >
          <CoinStackSvg className="h-24 w-24" />
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-black">Expérience</h2>
            <p className="text-sm font-normal text-gray-400">
              Vous avez {currentScore} {currentScore === 1 ? "point" : "points"} d&apos;expérience.
            </p>
            <Link
              className="uppercase text-blue-400 transition hover:brightness-110"
              href="/leaderboard"
            >
              Voir le classement
            </Link>
          </div>
        </div>
      </span>
    </>
  );
}