'use client';

import { useState } from "react";
import useSwr from "swr";
import { Link } from "@/navigation";

import Calendar from "/app/components/Calendar"

import FireSvg from "/app/components/icons/FireSvg";
import CoinSvg from "/app/components/icons/CoinSvg";
import CoinStackSvg from "/app/components/icons/CoinStackSvg";
import MoreOptionsSvg from "./icons/MoreOptionsSvg";
import {ProgressSection} from "./ProgressSection";

import { usePathname } from "next/navigation";
import AccountSvg from "./icons/AccountSvg";
import Strong2Svg from "./icons/Strong2Svg";
import { useLocale, useTranslations } from "next-intl";

export default function NavBar({ backgroundColor = "bg-purple-400", borderColor = "border-purple-500" }) {

    const locale = useLocale();
    const t = useTranslations("NavBar")

    const { data: currentStreak, error: streakError, isLoading: streakLoading } = useSwr(`/${locale}/api/users/streaks/maxStreaks`, (url) => fetch(url).then((res) => res.json()));
    const { data: currentScore, error: lingotsError, isLoading: lingotsLoading } = useSwr(`/${locale}/api/users/xp`, (url) => fetch(url).then((res) => res.json()));
    const { data: streaks, error: streaksError, isLoading: streaksLoading } = useSwr(`/${locale}/api/users/streaks`, (url) => fetch(url).then((res) => res.json()));

    const [menu, setMenu] = useState("HIDDEN");

    const pathname = usePathname();

    return (
      <header className="fixed z-20 h-[58px] w-full">
        <div
          className={`relative flex h-full w-full items-center justify-around border-b-2 px-[10px] transition duration-500 md:hidden ${borderColor} ${backgroundColor}`}
        >

          <button
            className="flex items-center gap-2 font-bold text-white"
            onClick={() =>
              setMenu((x) => (x === "STREAK" ? "HIDDEN" : "STREAK"))
            }
          >
            <FireSvg empty={!currentStreak} />
            <span
              className={currentStreak && currentStreak > 0 ? "text-white" : "text-black opacity-20"}
            >
              {streakLoading ? 0 : currentStreak}
            </span>
          </button>

          <button
            className="flex items-center gap-2 font-bold"
            onClick={() => setMenu((x) => (x === "GEMS" ? "HIDDEN" : "GEMS"))}
          >
            <CoinSvg empty={currentScore === 0} />
            <span
              className={currentScore > 0 ? "text-white" : "text-black opacity-20"}
            >
              {currentScore}
            </span>
          </button>

          {/* Affichage du button d'option que si on est dans /settings/acocunt ou /settings/coach */}
          {pathname.includes("/settings") && (
            <MoreOptionsSvg
              onClick={() => setMenu((x) => (x === "MORE" ? "HIDDEN" : "MORE"))}
              role="button"
            />
          )}

          {/* DROPDOWN MENU */}
          <div
            className={`absolute left-0 right-0 top-full bg-white transition duration-300 ${
              menu === "HIDDEN" ? "opacity-0" : "opacity-100"
            }`}
          >
            {(() => {
              switch (menu) {
                case "STREAK":
                  return (
                    <div className="flex grow flex-col items-center gap-3 p-5 border-b-2 border-gray-300">
                      <h2 className="text-xl font-bold">{t('streakSectionTitle')}</h2>
                      <p className="text-sm text-gray-400">
                        {t('streakSectionMessage')}
                      </p>
                      <div className="self-stretch">
                        {streaksLoading && !streaksError ? (
                          <div>Loading...</div>
                        ) : (
                          <Calendar streaks={streaks} />
                        )}
                      </div>
                    </div>
                  );

                case "GEMS":
                  return (
                    <>
                      <div className="flex grow items-center gap-3 p-5 border-b-2 border-gray-300">
                        <CoinStackSvg className="h-24 w-24" />
                        <div className="flex flex-col gap-3">
                          <h2 className="text-xl font-bold text-black">
                            {t('xpSectionTitle')}
                          </h2>
                          <p className="text-sm font-normal text-gray-400">
                            {t('xpMessage', { currentScore })}
                          </p>
                          <Link
                            className="font-bold uppercase text-blue-400 transition hover:brightness-110"
                            href="/leaderboard"
                          >
                            {t('leaderboardLink')}
                          </Link>
                        </div>
                      </div>

                      <div className="flex grow items-center gap-3 p-5 border-b-2 border-gray-300">
                        <ProgressSection forNavBar={true} />
                      </div>
                    </>
                  );

                case "MORE":
                  return (
                    <div className="flex grow flex-col">
                      <Link
                        className="flex items-center gap-2 p-2 font-bold text-gray-700"
                        href="/settings/account"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = "/settings/account"; // Pour recharger la page même si on est déjà dessus
                        }}
                      >
                        <AccountSvg className="h-10 w-10" />
                        {t('SettingsMenu.accountSectionTitle')}
                      </Link>
                      <Link
                        className="flex items-center gap-2 border-t-2 border-gray-300 p-2 font-bold text-gray-700"
                        href="/settings/coach"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = "/settings/coach"; // Pour recharger la page même si on est déjà dessus
                        }}
                      >
                        <Strong2Svg className="h-10 w-10" />
                        {t('SettingsMenu.dailyGoalSectionTitle')}
                      </Link>
                    </div>
                  );

                case "HIDDEN":
                  return null;
              }
            })()}
            <div
              className={[
                "absolute left-0 top-full h-screen w-screen bg-black opacity-30",
                menu === "HIDDEN" ? "pointer-events-none" : "",
              ].join(" ")}
              onClick={() => setMenu("HIDDEN")}
              aria-label="Hide menu"
              role="button"
            ></div>
          </div>
        </div>
      </header>
    );
};


